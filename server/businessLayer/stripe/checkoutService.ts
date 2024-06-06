import Stripe from 'stripe'
import { Subscription } from '~/server/dataLayer/types'
import logger from '~/utils/logger'

type StripeCheckoutQuery = {
  requestOrigin: string
  checkoutOptions: {
    priceId: string
    paymentPeriod: 'monthly' | 'yearly' | 'lifetime'
    isAddressRequired?: boolean
  }
}

export default class StripeCheckoutService {
  private stripe: Stripe

  private modes: Record<string, Stripe.Checkout.Session.Mode> = {
    monthly: 'subscription',
    yearly: 'subscription',
    lifetime: 'payment',
  }

  private subscriptionDetails: Record<string, { isMetered: boolean; subscriptionType: Subscription['type'] }> = {
    price_1POgtqBzByKpK824CECRC3aM: {
      isMetered: false,
      subscriptionType: 'starter',
    },
    price_1POgtuBzByKpK824CSOmHeUz: {
      isMetered: true,
      subscriptionType: 'pro',
    },
  }

  constructor() {
    this.stripe = new Stripe(this.getStripeSecret())
  }

  public async execute(query: StripeCheckoutQuery): Promise<string> {
    const { priceId, paymentPeriod, isAddressRequired = false } = query.checkoutOptions
    const { isMetered, subscriptionType } = this.subscriptionDetails[priceId]

    const mode = this.modes[paymentPeriod]

    const successUrl = query.requestOrigin + '/checkout/success'
    const cancelUrl = query.requestOrigin

    try {
      const item: Stripe.Checkout.SessionCreateParams.LineItem = {
        price: priceId,
      }

      if (!isMetered) {
        item.quantity = 1
      }

      const sessionOptions: Stripe.Checkout.SessionCreateParams = {
        line_items: [item],
        mode,
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          paymentPeriod,
          subscriptionType,
        },
        payment_method_types: ['paypal', 'card', 'sepa_debit', 'giropay', 'mobilepay'],
      }

      if (isAddressRequired) {
        sessionOptions.billing_address_collection = 'required'
      }

      const session = await this.stripe.checkout.sessions.create(sessionOptions)

      if (!session.url) {
        throw logger.error('Unable to find stripe session url', 'StripeCheckoutService', true)
      }

      return session.url
    } catch (e) {
      logger.error(JSON.stringify(e), 'StripeCheckoutService')
      return '/checkout/error'
    }
  }

  private getStripeSecret(): string {
    if (process.env.STRIPE_SECRET_KEY === undefined) {
      throw logger.error('Stripe secret key is missing', 'StripeCheckoutService - getStripeSecret', true)
    }

    return process.env.STRIPE_SECRET_KEY
  }
}
