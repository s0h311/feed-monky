import supabaseClient from '../../infrastructure/supabase/supabaseClient'
import { FeedbackSummary } from '../types'
import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '../../infrastructure/supabase/types'
import logger from '~~/utils/logger'
import { objectToCamel } from 'ts-case-convert'

export default class FeedbackSummaryDataService {
  private supabase: SupabaseClient<Database>

  constructor() {
    this.supabase = supabaseClient
  }

  public async add(feebackSummary: Pick<FeedbackSummary, 'siteId' | 'summary'>): Promise<FeedbackSummary> {
    const { data, error } = await this.supabase
      .from('feedback_summary')
      .insert({
        site_id: feebackSummary.siteId,
        summary: feebackSummary.summary,
      })
      .select()
      .single()

    if (error) {
      throw logger.error(error.message, 'FeedbackSummaryDataService - add', true)
    }

    return objectToCamel(data)
  }

  public async getBySiteId(siteId: string): Promise<FeedbackSummary[]> {
    const { data, error } = await this.supabase.from('feedback_summary').select().eq('site_id', siteId)

    if (error) {
      throw logger.error(error.message, 'FeedbackSummaryDataService - getBySiteId', true)
    }

    return objectToCamel(data)
  }
}
