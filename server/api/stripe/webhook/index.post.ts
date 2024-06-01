import { z } from 'zod'
import type { StripeWebhookServiceResponse } from '../../../businessLayer/stripe/webhookService'
import StripeWebhookService from '../../../businessLayer/stripe/webhookService'

export default defineEventHandler(async (event): Promise<StripeWebhookServiceResponse> => {
  const rawEvent = parseRawBody(await readRawBody(event))
  const stripeSignatureHeader = parseStripeSignatureHeader(getRequestHeader(event, 'stripe-signature'))

  const stripeWebhookService = new StripeWebhookService()
  return await stripeWebhookService.execute({ rawEvent, stripeSignatureHeader })
})

function parseStripeSignatureHeader(stripeSignatureHeader: unknown): string {
  return z.string().min(1).parse(stripeSignatureHeader)
}

function parseRawBody(rawBody: unknown): string {
  return z.string().min(1).parse(rawBody)
}
