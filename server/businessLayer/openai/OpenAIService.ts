import { ChatCompletionSystemMessageParam } from 'openai/resources/index.mjs'
import { ChatCompletionUserMessageParam } from 'openai/src/resources/index.js'
import { Feedback, FeedbackSummary, Site } from '../../dataLayer/types'
import OpenAIClient from '../../infrastructure/openai/OpenAIClient'

export type AssignFeedbacksForSiteRequest = Record<
  Site['id'],
  {
    feedbacks: Pick<Feedback, 'id' | 'feedbackText'>[]
    feedbackSummaries: string[]
  }
>

export type AssignFeedbacksForSiteResponse = Record<Site['id'], Record<FeedbackSummary['summary'], Feedback['id'][]>>

export default class OpenAIService {
  private openaiClient: OpenAIClient
  private systemMessage: ChatCompletionSystemMessageParam

  constructor() {
    this.openaiClient = new OpenAIClient()
    this.systemMessage = {
      role: 'system',
      content:
        'match the feedbacks with the feedbackSummaries, if there is no matching feedbackSummary, then create a new one',
    }
  }

  public async makeAssignFeedbackRequest(
    request: AssignFeedbacksForSiteRequest
  ): Promise<AssignFeedbacksForSiteResponse> {
    const userMessage = this.createUserMessageFromObject(request)

    const messages = [this.systemMessage, userMessage]

    const completionResponse = await this.openaiClient.makeCompletionRequest(messages)

    const firstChoice = completionResponse.choices[0]

    if (firstChoice.message.content === null) {
      return {}
    }

    const response = JSON.parse(firstChoice.message.content)

    return response
  }

  private createUserMessageFromObject(obj: object): ChatCompletionUserMessageParam {
    const content = JSON.stringify(obj)

    return {
      role: 'user',
      content,
    }
  }
}
