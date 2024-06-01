import { expect, it, describe } from 'vitest'
import StripeCheckoutService from './checkoutService'

describe('StripeCheckoutService', () => {
  it('should initialize', () => {
    const stripeCheckoutService = new StripeCheckoutService()

    expect(stripeCheckoutService).toBeDefined()
  })
})
