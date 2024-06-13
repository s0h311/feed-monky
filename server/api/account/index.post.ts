import AccountService from '~/server/businessLayer/account/AccountService'

export default defineEventHandler(async (event): Promise<void> => {
  const body = await readBody(event)

  const accountService = new AccountService()
  await accountService.execute(body)

  setResponseStatus(event, 201)
})
