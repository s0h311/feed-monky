import Stripe from 'stripe'
import logger from '~/utils/logger'

type StripeCheckoutQuery = {
  requestOrigin: string
  checkoutOptions: {
    priceId: string
    paymentPeriod: 'monthly' | 'yearly' | 'lifetime'
    isMetered?: boolean
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

  constructor() {
    this.stripe = new Stripe(this.getStripeSecret())
  }

  public async execute(query: StripeCheckoutQuery): Promise<string> {
    const { priceId, paymentPeriod, isMetered = false, isAddressRequired = false } = query.checkoutOptions

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
