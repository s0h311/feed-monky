import OpenAI from 'openai'
import logger from '~/utils/logger'

type CompletionResponse = {
  choices: OpenAI.Chat.Completions.ChatCompletion['choices']
  usage: OpenAI.Chat.Completions.ChatCompletion['usage']
}

export default class OpenAIClient {
  private openai: OpenAI

  constructor() {
    this.openai = new OpenAI({
      // TODO use real key
      apiKey: process.env.OPENAI_API_FAKE_KEY,
    })
  }

  public async makeCompletionRequest(
    messages: OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming['messages']
  ): Promise<CompletionResponse> {
    let result: OpenAI.Chat.Completions.ChatCompletion

    try {
      const completionResult = await this.openai.chat.completions.create({
        model: 'ft:gpt-3.5-turbo-1106:reffect-ug:feedx-1-02:9NfCjvog',
        messages,
      })

      result = completionResult
    } catch (e) {
      throw logger.error(e.message, 'OpenAIClient - makeCompletionRequest', true)
    }

    const { choices, usage } = result

    return {
      choices,
      usage,
    }
  }
}
