import FeedbackDataService from '../../dataLayer/feedback/FeedbackDataService'
import { Feedback } from '../../dataLayer/types'

export default class FeedbackService {
  private feedbackDataService: FeedbackDataService

  constructor() {
    this.feedbackDataService = new FeedbackDataService()
  }

  public async execute(feedback: Feedback): Promise<void> {
    await this.feedbackDataService.add(feedback)
  }
}
