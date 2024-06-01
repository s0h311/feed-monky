import { describe, expect, it, vi } from 'vitest'
import OpenAIService from './OpenAIService'
import {
  mockAssignFeedbacksRequest1,
  mockAssignFeedbacksRequest2,
  mockAssignFeedbacksRequestWithNoContent,
  mockAssignFeedbacksRequestWithNoFeedbacks,
  mockSystemMessage,
  mockUserMessage1,
  mockUserMessage2,
  mockUserMessageWithNoContent,
  mockUserMessageWithNoFeedbacks,
} from './mockData'
import OpenAIClient from '../../infrastructure/openai/OpenAIClient'

vi.mock('~/infrastructure/openai/OpenAIClient', () => {
  const OpenAIClient = vi.fn()
  OpenAIClient.prototype.makeCompletionRequest = vi.fn(() => ({
    choices: [],
  }))

  return { default: OpenAIClient }
})

describe.shuffle('OpenAIService', () => {
  const openAIService = new OpenAIService()

  it.each([
    {
      obj: mockAssignFeedbacksRequestWithNoContent,
      expected: mockUserMessageWithNoContent,
    },
    {
      obj: mockAssignFeedbacksRequestWithNoFeedbacks,
      expected: mockUserMessageWithNoFeedbacks,
    },
    {
      obj: mockAssignFeedbacksRequest1,
      expected: mockUserMessage1,
    },
    {
      obj: mockAssignFeedbacksRequest2,
      expected: mockUserMessage2,
    },
  ])('should build the correct user message', ({ obj, expected }) => {
    // createUserMessageFromObject is a private method, so we use a litte trick here
    const actual = (
      openAIService as unknown as { createUserMessageFromObject: (request: unknown) => void }
    ).createUserMessageFromObject(obj)

    expect(actual).toStrictEqual(expected)
  })

  it.each([
    {
      request: mockAssignFeedbacksRequestWithNoContent,
      expected: [mockSystemMessage, mockUserMessageWithNoContent],
    },
    {
      request: mockAssignFeedbacksRequestWithNoFeedbacks,
      expected: [mockSystemMessage, mockUserMessageWithNoFeedbacks],
    },
    {
      request: mockAssignFeedbacksRequest1,
      expected: [mockSystemMessage, mockUserMessage1],
    },
    {
      request: mockAssignFeedbacksRequest2,
      expected: [mockSystemMessage, mockUserMessage2],
    },
  ])('should make the completion request with correct params', ({ request, expected }) => {
    const mockMakeCompletionRequest = vi.spyOn(OpenAIClient.prototype, 'makeCompletionRequest')

    openAIService.makeAssignFeedbackRequest(request)

    expect(mockMakeCompletionRequest).toBeCalledWith(expected)
  })
})
