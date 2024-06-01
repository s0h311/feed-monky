import { serverSupabaseUser } from '#supabase/server'
import logger from '~/utils/logger'
import AccountDataService from '../../dataLayer/account/AccountDataService'

export default defineEventHandler(async (event): Promise<void> => {
  const user = await serverSupabaseUser(event)

  if (!user) {
    throw logger.error('Unable to delete user, no user found', 'Account Delete API', true)
  }

  const accountDataService = new AccountDataService()
  await accountDataService.delete(user.id)
})
