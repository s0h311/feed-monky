import { z } from 'zod'
import FeedbackService from '../../businessLayer/feedback/FeedbackService'
import { Feedback } from '../../dataLayer/types'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const data = validateData(JSON.parse(body))

  const feedbackService = new FeedbackService()
  await feedbackService.execute(data as Feedback)
})

function validateData<T>(data: T): T {
  return z
    .object({
      siteId: z.string().uuid(),
      customerEmail: z.string().email().optional(),
      feedbackText: z.string().min(10).max(200),
    })
    .parse(data) as T
}
