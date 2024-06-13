import Stripe from 'stripe'
import AccountDataService from '../../dataLayer/account/AccountDataService'
import logger from '~/utils/logger'
import SubscriptionDataService from '../../dataLayer/subscription/SubscriptionDataService'
import type { Site, Subscription } from '../../dataLayer/types'
import type { Storage } from 'unstorage'
import { useCache } from '../../infrastructure/storage/cache'

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
    this.cache = useCache()
  }

  public async execute({
    rawEvent,
    stripeSignatureHeader,
  }: StripeWebhookServiceQuery): Promise<StripeWebhookServiceResponse> {
    const event = this.getVerifiedEvent(rawEvent, stripeSignatureHeader)

    if (event.type === 'checkout.session.completed') {
      if (event.data.object.customer_details === null) {
        throw logger.error('Unable to update last payment, no customer details found', 'StripeWebhookService', true, {
          event,
        })
      }

      if (event.data.object.customer === null) {
        throw logger.error('Unable to update last payment, no customer found', 'StripeWebhookService', true, {
          event,
        })
      }

      const site = await this.createUser(event.data.object.customer_details, event.data.object.customer.toString())

      const metadata = event.data.object.metadata

      if (metadata === null) {
        throw logger.error('Unable to update last payment, no metadata found', 'StripeWebhookService', true, { event })
      }

      const { paymentPeriod, subscriptionType } = metadata

      await this.subscriptionDataService.create(
        site.id,
        paymentPeriod as Subscription['paymentPeriod'],
        subscriptionType as Subscription['type']
      )

      const email = event.data.object.customer_details.email

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

  private async createUser(
    customerDetails: Stripe.Checkout.Session.CustomerDetails,
    customerId: string
  ): Promise<Site> {
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
      stripeCustomerId: customerId,
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
