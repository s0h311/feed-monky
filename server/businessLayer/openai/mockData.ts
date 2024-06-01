import { AssignFeedbacksForSiteRequest } from './OpenAIService'

export const mockSystemMessage = {
  role: 'system',
  content:
    'match the feedbacks with the feedbackSummaries, if there is no matching feedbackSummary, then create a new one',
}

export const mockAssignFeedbacksRequestWithNoContent: AssignFeedbacksForSiteRequest = {}

export const mockUserMessageWithNoContent = {
  role: 'user',
  content: '{}',
}

export const mockAssignFeedbacksRequestWithNoFeedbacks: AssignFeedbacksForSiteRequest = {
  'site-1': {
    feedbacks: [],
    feedbackSummaries: [],
  },
}

export const mockUserMessageWithNoFeedbacks = {
  role: 'user',
  content: `{"site-1":{"feedbacks":[],"feedbackSummaries":[]}}`,
}

export const mockAssignFeedbacksRequest1: AssignFeedbacksForSiteRequest = {
  'site-2': {
    feedbacks: [
      {
        id: 1,
        feedbackText: 'This is a feedback',
      },
    ],
    feedbackSummaries: ['This is a feedback summary'],
  },
}

export const mockUserMessage1 = {
  role: 'user',
  content: `{"site-2":{"feedbacks":[{"id":1,"feedbackText":"This is a feedback"}],"feedbackSummaries":["This is a feedback summary"]}}`,
}

export const mockAssignFeedbacksRequest2: AssignFeedbacksForSiteRequest = {
  'site-2': {
    feedbacks: [
      {
        id: 1,
        feedbackText: 'This is a feedback',
      },
      {
        id: 2,
        feedbackText: 'This is a second feedback',
      },
    ],
    feedbackSummaries: ['This is a feedback summary', 'This is a second feedback summary'],
  },
}

export const mockUserMessage2 = {
  role: 'user',
  content: `{"site-2":{"feedbacks":[{"id":1,"feedbackText":"This is a feedback"},{"id":2,"feedbackText":"This is a second feedback"}],"feedbackSummaries":["This is a feedback summary","This is a second feedback summary"]}}`,
}
