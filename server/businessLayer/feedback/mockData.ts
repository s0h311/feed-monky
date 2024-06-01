import { Feedback, FeedbackSummary } from '../../dataLayer/types'
import { FeedbacksAndFeedbackSummariesBySiteId } from './GetFeedbackSummaryTask'

export const mockFeedback11: Feedback = {
  id: 11,
  siteId: 'site-1',
  createdAt: '2024-05-01T10:00:00',
  customerEmail: 'customer11@gmail.com',
  feedbackSummaryId: 111,
  feedbackText: 'text 11',
}

export const mockFeedback12WithoutSummary: Feedback = {
  id: 12,
  siteId: 'site-1',
  createdAt: '2024-05-01T10:10:00',
  customerEmail: 'customer12@gmail.com',
  feedbackSummaryId: null,
  feedbackText: 'text 12',
}

export const mockFeedback13WithoutSummary: Feedback = {
  id: 13,
  siteId: 'site-1',
  createdAt: '2024-05-01T10:20:00',
  customerEmail: 'customer13@gmail.com',
  feedbackSummaryId: null,
  feedbackText: 'text 13',
}

export const mockFeedback14: Feedback = {
  id: 14,
  siteId: 'site-1',
  createdAt: '2024-05-01T10:30:00',
  customerEmail: 'customer14@gmail.com',
  feedbackSummaryId: 112,
  feedbackText: 'text 14',
}

export const mockFeedbackSummary111: FeedbackSummary = {
  id: 111,
  siteId: 'site-1',
  createdAt: '2024-05-02T00:00:00',
  summary: 'summary 111',
}

export const mockFeedbackSummary112: FeedbackSummary = {
  id: 112,
  siteId: 'site-1',
  createdAt: '2024-05-02T00:01:00',
  summary: 'summary 112',
}

// SITE 2

export const mockFeedback21WithoutSummary: Feedback = {
  id: 21,
  siteId: 'site-2',
  createdAt: '2024-05-01T10:10:00',
  customerEmail: 'customer21@gmail.com',
  feedbackSummaryId: null,
  feedbackText: 'text 21',
}

export const mockFeedback22WithoutSummary: Feedback = {
  id: 22,
  siteId: 'site-2',
  createdAt: '2024-05-01T10:10:00',
  customerEmail: 'customer22@gmail.com',
  feedbackSummaryId: null,
  feedbackText: 'text 22',
}

// SITE 3

export const mockFeedback31: Feedback = {
  id: 31,
  siteId: 'site-3',
  createdAt: '2024-04-15T15:30:00',
  customerEmail: 'customer31@gmail.com',
  feedbackSummaryId: 311,
  feedbackText: 'text 31',
}

export const mockFeedback32: Feedback = {
  id: 32,
  siteId: 'site-3',
  createdAt: '2024-04-15T16:30:00',
  customerEmail: 'customer32@gmail.com',
  feedbackSummaryId: 311,
  feedbackText: 'text 32',
}

export const mockFeedbackSummary311: FeedbackSummary = {
  id: 311,
  siteId: 'site-3',
  createdAt: '2024-04-16T00:00:00',
  summary: 'summary 311',
}

export const mockFeedbacksWithoutSummary = [
  mockFeedback12WithoutSummary,
  mockFeedback13WithoutSummary,
  mockFeedback21WithoutSummary,
  mockFeedback22WithoutSummary,
]

export const mockFeedbackSummaries = [mockFeedbackSummary111, mockFeedbackSummary112, mockFeedbackSummary311]

export const groupedFeedbacksAndFeedbackSummaries: FeedbacksAndFeedbackSummariesBySiteId = {
  'site-1': {
    feedbacks: [
      {
        id: 12,
        siteId: 'site-1',
        createdAt: '2024-05-01T10:10:00',
        customerEmail: 'customer12@gmail.com',
        feedbackSummaryId: null,
        feedbackText: 'text 12',
      },
      {
        id: 13,
        siteId: 'site-1',
        createdAt: '2024-05-01T10:20:00',
        customerEmail: 'customer13@gmail.com',
        feedbackSummaryId: null,
        feedbackText: 'text 13',
      },
    ],
    feedbackSummaries: ['summary 111', 'summary 112'],
  },
  'site-2': {
    feedbacks: [
      {
        id: 21,
        siteId: 'site-2',
        createdAt: '2024-05-01T10:10:00',
        customerEmail: 'customer21@gmail.com',
        feedbackSummaryId: null,
        feedbackText: 'text 21',
      },
      {
        id: 22,
        siteId: 'site-2',
        createdAt: '2024-05-01T10:10:00',
        customerEmail: 'customer22@gmail.com',
        feedbackSummaryId: null,
        feedbackText: 'text 22',
      },
    ],
    feedbackSummaries: [],
  },
}

export const mockAssignFeedbacksResponse = {
  'site-1': {
    'summary 111': [12],
    'summary 113 new': [13],
  },
  'site-2': {
    'summary 211 new': [21],
    'summary 212 new': [22],
  },
}
