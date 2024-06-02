import { SupabaseClient } from '@supabase/supabase-js'
import MailClient from '../../infrastructure/mail/mailClient'
import supabase from '../../infrastructure/supabase/supabaseClient'
import { Database } from '../../infrastructure/supabase/types'
import SiteDataService from '../site/SiteDataService'
import UserDataService from '../user/UserDataService'
import { Site } from '../types'
import logger from '~/utils/logger'

export default class AccountDataService {
  private supabase: SupabaseClient<Database>
  private mailClient: MailClient
  private siteDataService: SiteDataService
  private userDataService: UserDataService

  constructor() {
    this.supabase = supabase
    this.mailClient = new MailClient()
    this.siteDataService = new SiteDataService()
    this.userDataService = new UserDataService()
  }

  public async create({
    name,
    email,
    stripeCustomerId,
  }: {
    name: string
    email: string
    stripeCustomerId: string
  }): Promise<Site> {
    const randomPassword = this.generateRandomPassword()

    const user = await this.userDataService.create({ email, password: randomPassword })
    const site = await this.siteDataService.create({ userId: user.id, name, stripeCustomerId })

    await this.sendPasswordViaEmail(name, email, randomPassword)

    return site
  }

  public async delete(userId: string): Promise<void> {
    const { data: fetchSiteData, error: fetchSiteError } = await this.supabase
      .from('site')
      .select('name, id')
      .eq('user_id', userId)
      .single()

    if (fetchSiteError) {
      throw logger.error(fetchSiteError.message, 'AccountDataService - delete', true, { userId })
    }

    const siteId = fetchSiteData.id

    const { error: deleteFeedbacksError } = await this.supabase.from('feedback').delete().eq('site_id', siteId)

    if (deleteFeedbacksError) {
      throw logger.error(deleteFeedbacksError.message, 'AccountDataService - delete', true, { siteId })
    }

    const { error: deleteFeedbackSummaryError } = await this.supabase
      .from('feedback_summary')
      .delete()
      .eq('site_id', siteId)

    if (deleteFeedbackSummaryError) {
      throw logger.error(deleteFeedbackSummaryError.message, 'AccountDataService - delete', true, { siteId })
    }

    const { error: deleteSiteError } = await this.supabase.from('site').delete().eq('id', siteId)

    if (deleteSiteError) {
      throw logger.error(deleteSiteError.message, 'AccountDataService - delete', true, { siteId })
    }

    const { data: deleteUserData, error: deleteUserError } = await this.supabase.auth.admin.deleteUser(userId)

    if (deleteUserError) {
      throw logger.error(deleteUserError.message, 'AccountDataService - delete', true, { userId })
    }

    await this.mailClient.send({
      recipient: {
        name: fetchSiteData.name,
        email: deleteUserData.user.email!,
      },
      templateId: 9,
    })
  }

  public async getSiteIdFromEmail(email: string): Promise<string> {
    const { data, error } = await this.supabase.rpc('get_site_id_from_user_email', { email })

    if (error) {
      throw logger.error('Unable to get site id from user email', 'AccountDataService - getSiteIdFromEmail', true, {
        email,
      })
    }

    return data
  }

  private async sendPasswordViaEmail(name: string, email: string, password: string): Promise<void> {
    await this.mailClient.send({
      recipient: {
        name,
        email,
      },
      params: {
        PASSWORD: password,
      },
      templateId: 7,
    })
  }

  private generateRandomPassword(): string {
    return Math.random().toString(36).slice(2)
  }
}
