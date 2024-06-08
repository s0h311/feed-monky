import AccountTrialService from '~/server/businessLayer/account/TrialService'

export default defineEventHandler(async (event): Promise<void> => {
  const body = await readBody(event)

  const accountTrialService = new AccountTrialService()
  await accountTrialService.execute(body)

  setResponseStatus(event, 201)
})
