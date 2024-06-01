import { SupabaseClient } from '@supabase/supabase-js'
import supabaseClient from '../../infrastructure/supabase/supabaseClient'
import { Database } from '../../infrastructure/supabase/types'
import logger from '~/utils/logger'
import { Site } from '../types'
import { objectToCamel } from 'ts-case-convert'

export default class SiteDataService {
  private supabase: SupabaseClient<Database>

  constructor() {
    this.supabase = supabaseClient
  }
  public async create({ userId, name }: { userId: string; name: string }): Promise<Site> {
    const { data: siteCreateData, error: siteCreateError } = await this.supabase
      .from('site')
      .insert({
        user_id: userId,
        name,
      })
      .select()
      .single()

    if (siteCreateError) {
      throw logger.error(siteCreateError.message, 'UserDataService - createSite', true)
    }

    return objectToCamel(siteCreateData)
  }

  public async get(): Promise<Site[]> {
    const { data: siteGetData, error: siteGetError } = await this.supabase.from('site').select()

    if (siteGetError) {
      throw logger.error(siteGetError.message, 'UserDataService - get', true)
    }

    return objectToCamel(siteGetData)
  }
}
