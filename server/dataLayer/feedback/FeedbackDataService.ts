import supabaseClient from '../../infrastructure/supabase/supabaseClient'
import { Feedback, FeedbackSummary } from '../types'
import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '../../infrastructure/supabase/types'
import logger from '~/utils/logger'
import { objectToCamel } from 'ts-case-convert'

export default class FeedbackDataService {
  private supabase: SupabaseClient<Database>

  constructor() {
    this.supabase = supabaseClient
  }

  public async add(feeback: Feedback): Promise<void> {
    const { error } = await this.supabase.from('feedback').insert({
      site_id: feeback.siteId,
      customer_email: feeback.customerEmail,
      feedback_text: feeback.feedbackText,
    })

    if (error) {
      throw logger.error(error.message, 'FeedbackDataService - add', true)
    }
  }

  public async getOnesWithoutSummary(): Promise<Feedback[]> {
    const { data, error } = await this.supabase.from('feedback').select().is('feedback_summary_id', null)

    if (error) {
      throw logger.error(error.message, 'FeedbackDataService - getOnesWithoutSummary', true)
    }

    return objectToCamel(data)
  }

  public async setFeedbackSummary(feedbackId: Feedback['id'], feedbackSummarId: FeedbackSummary['id']): Promise<void> {
    const { error } = await this.supabase
      .from('feedback')
      .update({
        feedback_summary_id: feedbackSummarId,
      })
      .eq('id', feedbackId)

    if (error) {
      throw logger.error(error.message, 'FeedbackDataService - updateFeedbackSummary', true)
    }
  }
}
