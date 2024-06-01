import { SupabaseClient, User } from '@supabase/supabase-js'
import supabaseClient from '../../infrastructure/supabase/supabaseClient'
import { Database } from '../../infrastructure/supabase/types'
import logger from '~/utils/logger'

type SignupData = {
  email: string
  password: string
}

export default class UserDataService {
  private supabase: SupabaseClient<Database>

  constructor() {
    this.supabase = supabaseClient
  }

  public async create({ email, password }: SignupData): Promise<User> {
    const { data: userCreateData, error: userCreateError } = await this.supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })

    if (userCreateError) {
      throw logger.error(userCreateError.message, 'UserDataService - createUser', true)
    }

    return userCreateData.user
  }
}
