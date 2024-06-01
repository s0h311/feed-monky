import FeedbackDataService from '../../dataLayer/feedback/FeedbackDataService'
import FeedbackSummaryDataService from '../../dataLayer/feedbackSummary/FeedbackSummaryDataService'
import { Feedback, FeedbackSummary, Site } from '../../dataLayer/types'
import { groupBy } from '~/utils/objectFns'
import OpenAIService, { AssignFeedbacksForSiteRequest, AssignFeedbacksForSiteResponse } from '../openai/OpenAIService'

type FeedbacksBySiteId = Record<Site['id'], Feedback[]>

export type FeedbacksAndFeedbackSummariesBySiteId = Record<
  Site['id'],
  {
    feedbacks: Feedback[]
    feedbackSummaries: FeedbackSummary['summary'][]
  }
>

// TODO schedule this Task

export default class GetFeedbackSummaryTask {
  private feedbackDataService: FeedbackDataService
  private feedbackSummaryDataService: FeedbackSummaryDataService
  private openaiService: OpenAIService

  constructor() {
    this.feedbackDataService = new FeedbackDataService()
    this.feedbackSummaryDataService = new FeedbackSummaryDataService()
    this.openaiService = new OpenAIService()
  }

  public async execute(): Promise<void> {
    const groupedFeedbacksAndFeedbackSummaries = await this.groupFeedbacksAndFeedbackSummaries()

    if (Object.keys(groupedFeedbacksAndFeedbackSummaries).length === 0) {
      return
    }

    const response = await this.createOpenAIRequest(groupedFeedbacksAndFeedbackSummaries)
    await this.assignFeedbackSummariesToFeedbacks(response)
  }

  private async groupFeedbacksAndFeedbackSummaries(): Promise<AssignFeedbacksForSiteRequest> {
    const newFeedbacks = await this.feedbackDataService.getOnesWithoutSummary()

    const feedbacksBySiteId: FeedbacksBySiteId = groupBy(newFeedbacks, 'siteId')

    const groupedFeedbacksAndFeedbackSummaries: AssignFeedbacksForSiteRequest = {}

    for (const siteId in feedbacksBySiteId) {
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
