import Stripe from 'stripe'
import AccountDataService from '../../dataLayer/account/AccountDataService'
import logger from '~/utils/logger'
import SubscriptionDataService from '../../dataLayer/subscription/SubscriptionDataService'
import type { Site } from '../../dataLayer/types'
import type { Storage } from 'unstorage'

type StripeWebhookServiceQuery = {
  rawEvent: string
  stripeSignatureHeader: string
}

export type StripeWebhookServiceResponse = {
  received: boolean
}

export default class StripeWebhookService {
  private stripe: Stripe
  private accountDataService: AccountDataService
  private subscriptionDataService: SubscriptionDataService
  private cache: Storage

  constructor() {
    this.stripe = new Stripe(this.getStripeSecret())
    this.accountDataService = new AccountDataService()
    this.subscriptionDataService = new SubscriptionDataService()
    this.cache = useStorage('cache')
  }

  public async execute({
    rawEvent,
    stripeSignatureHeader,
  }: StripeWebhookServiceQuery): Promise<StripeWebhookServiceResponse> {
    const event = this.getVerifiedEvent(rawEvent, stripeSignatureHeader)

    if (event.type === 'checkout.session.completed') {
      const site = await this.createUser(event.data.object.customer_details)

      const subscriptionType = event.data.object.mode === 'subscription' ? 'monthly' : 'lifetime'

      await this.subscriptionDataService.create(site.id, subscriptionType)

      const email = event.data.object.customer_details?.email

      if (!email) {
        throw logger.error('Unable to update last payment, email is null', 'StripeWebhookService', true, { email })
      }

      const hasEmail = await this.cache.hasItem(email)
      if (hasEmail) {
        await this.subscriptionDataService.updateLastPayment(site.id, new Date())
        await this.cache.removeItem(email)
      }
    } else if (event.type === 'charge.succeeded') {
      const email = event.data.object.billing_details.email

      if (!email) {
        throw logger.error('Unable to update last payment, email is null', 'StripeWebhookService', true, { email })
      }

      await this.cache.setItem(email, 'charge.succeeded')
    }

    return { received: true }
  }

  private async createUser(customerDetails: Stripe.Checkout.Session.CustomerDetails): Promise<Site> {
    if (!customerDetails) {
      throw logger.error('Unable to create user, customerDetails is null', 'StripeWebhookService', true)
    }

    if (!customerDetails.name) {
      throw logger.error('Unable to create user, name is null', 'StripeWebhookService', true)
    }

    if (!customerDetails.email) {
      throw logger.error('Unable to create user, email is null', 'StripeWebhookService', true)
    }

    const site = await this.accountDataService.create({
      name: customerDetails.name,
      email: customerDetails.email,
    })

    return site
  }

  private getVerifiedEvent(rawEvent: string, stripeSignatureHeader: string): Stripe.Event {
    const whsec = this.getStripeWebhookSecret()

    try {
      return this.stripe.webhooks.constructEvent(rawEvent, stripeSignatureHeader, whsec)
    } catch (err) {
      throw logger.error('Stripe event could not be verified', 'StripeWebhookService - getVerifiedEvent', true, {
        error: err,
      })
    }
  }

  private getStripeSecret(): string {
    if (process.env.STRIPE_SECRET_KEY === undefined) {
      throw logger.error('Stripe secret key is missing', 'StripeWebhookService - getStripeSecret', true)
    }

    return process.env.STRIPE_SECRET_KEY
  }

  private getStripeWebhookSecret(): string {
    if (process.env.STRIPE_WHSEC === undefined) {
      throw logger.error('Stripe webhook secret key is missing', 'StripeWebhookService - getStripeWebhookSecret', true)
    }

    return process.env.STRIPE_WHSEC
  }
}