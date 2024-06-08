import AccountDataService from '~/server/dataLayer/account/AccountDataService'
import SubscriptionDataService from '~/server/dataLayer/subscription/SubscriptionDataService'

export default class AccountTrialService {
  constructor(
    private accountDataService = new AccountDataService(),
    private subscriptionDataService = new SubscriptionDataService()
  ) {}

  public async execute({ name, email }: { name: string; email: string }): Promise<void> {
    const site = await this.accountDataService.create({ name, email, stripeCustomerId: null })

    await this.subscriptionDataService.create(site.id, 'monthly', 'trial')
  }
}
