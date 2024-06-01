import GetFeedbackSummaryTask from '../../../businessLayer/feedback/GetFeedbackSummaryTask'

export default defineEventHandler(async (event) => {
  const authHeader = getRequestHeader(event, 'authorization')

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    setResponseStatus(event, 401)
    return
  }

  const getFeedbackSummaryTask = new GetFeedbackSummaryTask()
  await getFeedbackSummaryTask.execute()
})
