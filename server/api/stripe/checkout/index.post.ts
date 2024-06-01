import StripeCheckoutService from '../../../businessLayer/stripe/checkoutService'
export default defineEventHandler(async (event): Promise<string> => {
  const requestOrigin = getRequestHeader(event, 'origin')

  const checkoutOptions = await readBody(event)

  const stripeCheckoutService = new StripeCheckoutService()
  return await stripeCheckoutService.execute({ requestOrigin, checkoutOptions })
})
