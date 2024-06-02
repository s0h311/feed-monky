import logger from '~/utils/logger'
import StripeCheckoutService from '../../../businessLayer/stripe/checkoutService'
export default defineEventHandler(async (event): Promise<string> => {
  const requestOrigin = getRequestHeader(event, 'origin')

  if (!requestOrigin) {
    throw logger.error('No origin found', 'StripeCheckout API', true, { event })
  }

  const checkoutOptions = await readBody(event)

  const stripeCheckoutService = new StripeCheckoutService()
  return await stripeCheckoutService.execute({ requestOrigin, checkoutOptions })
})
