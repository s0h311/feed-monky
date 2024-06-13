import AccountDataService from '~/server/dataLayer/account/AccountDataService'
import SubscriptionDataService from '~/server/dataLayer/subscription/SubscriptionDataService'
import { Subscription } from '~/server/dataLayer/types'

export default class AccountService {
  constructor(
    private accountDataService = new AccountDataService(),
    private subscriptionDataService = new SubscriptionDataService()
  ) {}

  public async execute({ name, email }: { name: string; email: string }): Promise<void> {
    const site = await this.accountDataService.create({ name, email, stripeCustomerId: null })
    await this.subscriptionDataService.create(site.id, 'lifetime', 'starter')
  }
}
