import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../../infrastructure/supabase/types'
import type { Subscription } from '../types'
import logger from '~/utils/logger'
import supabase from '../../infrastructure/supabase/supabaseClient'

export default class SubscriptionService {
  private supabase: SupabaseClient<Database>

  constructor() {
    this.supabase = supabase
  }

  public async create(siteId: string, subscriptionType: Subscription['type']): Promise<void> {
    const { error } = await this.supabase.from('subscription').insert({
      site_id: siteId,
      type: subscriptionType,
    })

    if (error) {
      throw logger.error(error.message, 'SubscriptionService - create', true, { siteId })
    }
  }

  public async updateLastPayment(siteId: string, lastPaymentDate: Date): Promise<void> {
    const { error } = await this.supabase
      .from('subscription')
      .update({
        last_payment: lastPaymentDate.toDateString(),
      })
      .eq('site_id', siteId)

    if (error) {
      throw logger.error(error.message, 'SubscriptionService - updateLastPayment', true, { siteId })
    }
  }

  public async delete(siteId: string): Promise<void> {
    const { error } = await this.supabase.from('subscription').delete().eq('site_id', siteId)

    if (error) {
      throw logger.error(error.message, 'SubscriptionService - delete', true, { siteId })
    }
  }
}
