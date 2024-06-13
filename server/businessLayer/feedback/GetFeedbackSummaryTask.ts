import FeedbackDataService from '../../dataLayer/feedback/FeedbackDataService'
import FeedbackSummaryDataService from '../../dataLayer/feedbackSummary/FeedbackSummaryDataService'
import { Feedback, FeedbackSummary, Site } from '../../dataLayer/types'
import { groupBy } from '~/utils/objectFns'
import OpenAIService, { AssignFeedbacksForSiteRequest, AssignFeedbacksForSiteResponse } from '../openai/OpenAIService'
import StripeUsageService from '../stripe/usageService'
import SiteDataService from '~/server/dataLayer/site/SiteDataService'
import logger from '~/utils/logger'
import SubscriptionDataService from '~/server/dataLayer/subscription/SubscriptionDataService'

type FeedbacksBySiteId = Record<Site['id'], Feedback[]>

export type FeedbacksAndFeedbackSummariesBySiteId = Record<
  Site['id'],
  {
    feedbacks: Feedback[]
    feedbackSummaries: FeedbackSummary['summary'][]
  }
>

export default class GetFeedbackSummaryTask {
  constructor(
    private feedbackDataService = new FeedbackDataService(),
    private feedbackSummaryDataService = new FeedbackSummaryDataService(),
    private openaiService = new OpenAIService(),
    private stripeUsageService = new StripeUsageService(),
    private siteDateService = new SiteDataService(),
    private subscriptionDataService = new SubscriptionDataService()
  ) {}

  public async execute(): Promise<void> {
    const groupedFeedbacksAndFeedbackSummaries = await this.groupFeedbacksAndFeedbackSummaries()

    if (Object.keys(groupedFeedbacksAndFeedbackSummaries).length === 0) {
      return
    }

    const response = await this.createOpenAIRequest(groupedFeedbacksAndFeedbackSummaries)

    await this.assignFeedbackSummariesToFeedbacks(response)

    const siteIds = Object.keys(groupedFeedbacksAndFeedbackSummaries)
    const stripeCustomerIdBySiteId = await this.siteDateService.getStripeCustomerIdBySiteIds(siteIds)

    for (let siteId of siteIds) {
      const numberOfFeedbacksAssigned = groupedFeedbacksAndFeedbackSummaries[siteId].feedbacks.length

      const stripeCustomerId = stripeCustomerIdBySiteId[siteId]
      if (stripeCustomerId === null) {
        logger.error('Cannot register usage, stripeCustomerId is null', 'GetFeedbackSummaryTask - execute', false, {
          siteId,
        })
        return
      }

      await this.subscriptionDataService.updateMonthlyUsageBySiteId(siteId, numberOfFeedbacksAssigned)
      await this.stripeUsageService.execute('feedx_monthly_meter', stripeCustomerId, numberOfFeedbacksAssigned)
    }
  }

  private async groupFeedbacksAndFeedbackSummaries(): Promise<AssignFeedbacksForSiteRequest> {
    const newFeedbacks = await this.feedbackDataService.getOnesWithoutSummary()

    const feedbacksBySiteId: FeedbacksBySiteId = groupBy(newFeedbacks, 'siteId')

    const groupedFeedbacksAndFeedbackSummaries: AssignFeedbacksForSiteRequest = {}

    const subscriptions = await this.subscriptionDataService.getBySiteIds(Object.keys(feedbacksBySiteId))

    for (const siteId in feedbacksBySiteId) {
      const subscription = subscriptions.find((s) => s.siteId === siteId)

      if (!subscription) {
        throw logger.error(
          'Could not find subscription',
          'GetFeedbackSummaryTask - groupFeedbacksAndFeedbackSummaries',
          true,
          { siteId }
        )
      }

      if (subscription.type === 'starter' && subscription.monthlyUsage >= 10) {
        continue
      }

      const feedbackSummaries = await this.feedbackSummaryDataService.getBySiteId(siteId)
      const feedbackSummaryTexts = feedbackSummaries.map(({ summary }) => summary)

      groupedFeedbacksAndFeedbackSummaries[siteId] = {
        feedbacks: feedbacksBySiteId[siteId],
        feedbackSummaries: feedbackSummaryTexts,
      }
    }

    return groupedFeedbacksAndFeedbackSummaries
  }

  private async createOpenAIRequest(
    assignFeedbacksForSiteRequest: AssignFeedbacksForSiteRequest
  ): Promise<AssignFeedbacksForSiteResponse> {
    return await this.openaiService.makeAssignFeedbackRequest(assignFeedbacksForSiteRequest)
  }

  private async assignFeedbackSummariesToFeedbacks(
    assignFeedbacksForSiteResponse: AssignFeedbacksForSiteResponse
  ): Promise<void> {
    for (const siteId in assignFeedbacksForSiteResponse) {
      const currentFeedbackSummaries = await this.feedbackSummaryDataService.getBySiteId(siteId)
      const assigedFeedbackSummaries = Object.keys(assignFeedbacksForSiteResponse[siteId])

      for (const summary of assigedFeedbackSummaries) {
        let currentFeedbackSummary = currentFeedbackSummaries.find((fs) => fs.summary === summary)
        const feedbacks = assignFeedbacksForSiteResponse[siteId][summary]

        if (!currentFeedbackSummary) {
          currentFeedbackSummary = await this.feedbackSummaryDataService.add({
            siteId,
            summary,
          })
        }

        feedbacks.forEach(
          async (feedbackId) => await this.feedbackDataService.setFeedbackSummary(feedbackId, currentFeedbackSummary.id)
        )
      }
    }
  }
}
