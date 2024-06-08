import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../../infrastructure/supabase/types'
import type { Subscription } from '../types'
import logger from '~/utils/logger'
import supabase from '../../infrastructure/supabase/supabaseClient'

export default class SubscriptionDataService {
  private supabase: SupabaseClient<Database>

  constructor() {
    this.supabase = supabase
  }

  public async create(
    siteId: string,
    paymentPeriod: Subscription['paymentPeriod'],
    subscriptionType: Subscription['type']
  ): Promise<void> {
    const { error } = await this.supabase.from('subscription').insert({
      site_id: siteId,
      payment_period: paymentPeriod,
      type: subscriptionType,
    })

    if (error) {
      throw logger.error(error.message, 'SubscriptionDataService - create', true, { siteId })
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
      throw logger.error(error.message, 'SubscriptionDataService - updateLastPayment', true, { siteId })
    }
  }

  public async delete(siteId: string): Promise<void> {
    const { error } = await this.supabase.from('subscription').delete().eq('site_id', siteId)

    if (error) {
      throw logger.error(error.message, 'SubscriptionDataService - delete', true, { siteId })
    }
  }
}
