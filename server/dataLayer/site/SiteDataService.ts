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
  public async create({
    userId,
    name,
    stripeCustomerId,
  }: {
    userId: string
    name: string
    stripeCustomerId: string | null
  }): Promise<Site> {
    const insertData: Database['public']['Tables']['site']['Insert'] = {
      user_id: userId,
      name,
    }

    if (stripeCustomerId !== null) {
      insertData['stripe_customer_id'] = stripeCustomerId
    }

    const { data: siteCreateData, error: siteCreateError } = await this.supabase
      .from('site')
      .insert(insertData)
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

  public async getStripeCustomerIdBySiteIds(
    siteIds: Site['id'][]
  ): Promise<Record<Site['id'], Site['stripeCustomerId']>> {
    const { data, error } = await this.supabase.from('site').select('id, stripe_customer_id').in('id', siteIds)

    if (error) {
      throw logger.error(error.message, 'UserDataService - getStripeCustomerIdBySiteIds', true, { siteIds })
    }

    const result: Record<Site['id'], Site['stripeCustomerId']> = {}

    data.forEach((site) => (result[site.id] = site.stripe_customer_id))

    return result
  }
}
