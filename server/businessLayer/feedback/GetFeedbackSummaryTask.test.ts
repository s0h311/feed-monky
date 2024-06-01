import { describe, it, expect, vi } from 'vitest'
import {
  groupedFeedbacksAndFeedbackSummaries,
  mockAssignFeedbacksResponse,
  mockFeedbackSummaries,
  mockFeedbacksWithoutSummary,
} from './mockData'
import GetFeedbackSummaryTask from './GetFeedbackSummaryTask'
import FeedbackSummaryDataService from '../../dataLayer/feedbackSummary/FeedbackSummaryDataService'
import OpenAIService from '../openai/OpenAIService'

// MOCKS //

vi.mock('~/dataLayer/feedback/FeedbackDataService', () => {
  const FeedbackDataService = vi.fn()
  FeedbackDataService.prototype.getOnesWithoutSummary = vi.fn(() => mockFeedbacksWithoutSummary)
  FeedbackDataService.prototype.setFeedbackSummary = vi.fn()
  return { default: FeedbackDataService }
})

vi.mock('~/dataLayer/feedbackSummary/FeedbackSummaryDataService', () => {
  const FeedbackSummaryDataService = vi.fn()
  FeedbackSummaryDataService.prototype.getBySiteId = vi.fn((siteId: string) =>
    mockFeedbackSummaries.filter((fs) => fs.siteId === siteId)
  )
  FeedbackSummaryDataService.prototype.add = vi.fn((siteId: string, summary: string) => ({
    id: new Date().getTime(),
    siteId,
    summary,
    createdAt: new Date().toISOString(),
  }))

  return { default: FeedbackSummaryDataService }
})

vi.mock('../openai/OpenAIService', () => {
  const OpenAIService = vi.fn()
  OpenAIService.prototype.makeAssignFeedbackRequest = vi.fn(() => mockAssignFeedbacksResponse)

  return { default: OpenAIService }
})

// TEST //

describe.shuffle('GetFeedbackSummaryTask', () => {
  const getFeedbackSummaryTask = new GetFeedbackSummaryTask()

  it('should only get summaries of sites that are affected', async () => {
    const getBySiteId = vi.spyOn(FeedbackSummaryDataService.prototype, 'getBySiteId')

    await getFeedbackSummaryTask.execute()

    expect(getBySiteId).toBeCalledTimes(4)
  })

  it('should group the feedbacks and feedbacksummaries correctly', async () => {
    const mockMakeAssignFeedbackRequest = vi.spyOn(OpenAIService.prototype, 'makeAssignFeedbackRequest')
    await getFeedbackSummaryTask.execute()

    expect(mockMakeAssignFeedbackRequest).toHaveBeenCalledWith(groupedFeedbacksAndFeedbackSummaries)
  })

  it('should add only missing summaries', async () => {
    const mockAdd = vi.spyOn(FeedbackSummaryDataService.prototype, 'add')

    await getFeedbackSummaryTask.execute()

    expect(mockAdd).toHaveBeenCalledTimes(3)

    expect(mockAdd).toHaveBeenCalledWith({ siteId: 'site-1', summary: 'summary 113 new' })
    expect(mockAdd).toHaveBeenCalledWith({ siteId: 'site-2', summary: 'summary 211 new' })
    expect(mockAdd).toHaveBeenCalledWith({ siteId: 'site-2', summary: 'summary 212 new' })
  })

  it('should not make open ai requests if no new feedback is available', async () => {
    const mockMakeAssignFeedbackRequest = vi.spyOn(OpenAIService.prototype, 'makeAssignFeedbackRequest')
    await getFeedbackSummaryTask.execute()

    // TODO fix this
    expect(mockMakeAssignFeedbackRequest).toHaveBeenCalledTimes(0)
  })
})
