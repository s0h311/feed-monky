import Stripe from 'stripe'
import logger from '~/utils/logger'

export default class StripeUsageService {
  private stripe: Stripe

  constructor() {
    this.stripe = new Stripe(this.getStripeSecret())
  }

  public async execute(meterName: string, customerId: string, newUsage: number): Promise<void> {
    await this.stripe.billing.meterEvents.create({
      event_name: meterName,
      payload: {
        stripe_customer_id: customerId,
        value: String(newUsage),
      },
    })
  }

  private getStripeSecret(): string {
    if (process.env.STRIPE_SECRET_KEY === undefined) {
      throw logger.error('Stripe secret key is missing', 'StripeUsageService - getStripeSecret', true)
    }

    return process.env.STRIPE_SECRET_KEY
  }
}
