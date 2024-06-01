import { expect, it, describe, vi, afterEach, beforeEach } from 'vitest'
import StripeWebhookService from './webhookService'
import {
  getChargeSucceededEventWithDifferentEmail,
  getCheckoutSessionCompletedEventWithDifferentEmail,
  getMockStripeSigntarueHeader,
  mockChargeSucceededEvent,
  mockCheckoutSessionCompletedEvent,
  mockCustomerDetails,
  mockPaymentIntentEvent,
  mockSender,
} from './mockData/mockStripeEvents'
import AccountDataService from '../../dataLayer/account/AccountDataService'
import SubscriptionDataService from '../../dataLayer/subscription/SubscriptionDataService'

vi.mock('../../dataDomain/account/accountDataService', () => {
  const AccountDataService = vi.fn()
  AccountDataService.prototype.create = vi.fn(() => mockSender)

  return { default: AccountDataService }
})

vi.mock('../../server/dataDomain/services/subscriptionService', () => {
  const SubscriptionService = vi.fn()
  SubscriptionService.prototype.create = vi.fn()
  SubscriptionService.prototype.updateLastPayment = vi.fn()
  return { default: SubscriptionDataService }
})

describe.shuffle('StripeWebhookService', () => {
  let stripeWebhookService: StripeWebhookService

  beforeEach(() => {
    stripeWebhookService = new StripeWebhookService()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should initialize', () => {
    expect(stripeWebhookService).toBeDefined()
  })

  it('should return received:true if everything is correct', () => {
    const mockEvent = JSON.stringify(mockChargeSucceededEvent)
    const mockStripeSignatureHeader = getMockStripeSigntarueHeader(mockChargeSucceededEvent)

    stripeWebhookService
      .execute({
        rawEvent: mockEvent,
        stripeSignatureHeader: mockStripeSignatureHeader,
      })
      .then((result) => {
        expect(result).toMatchObject({ received: true })
      })
  })

  it.each([
    {
      event: mockCheckoutSessionCompletedEvent,
      expected: 1,
    },
    {
      event: mockChargeSucceededEvent,
      expected: 0,
    },
    { event: mockPaymentIntentEvent, expected: 0 },
  ])('should call UserService.create only if event type is checkout.session.completed', ({ event, expected }) => {
    const mockCreate = vi.spyOn(AccountDataService.prototype, 'create')

    const mockEvent = JSON.stringify(event)
    const mockStripeSignatureHeader = getMockStripeSigntarueHeader(event)

    stripeWebhookService.execute({
      rawEvent: mockEvent,
      stripeSignatureHeader: mockStripeSignatureHeader,
    })

    expect(mockCreate).toBeCalledTimes(expected)

    if (expected >= 1) {
      expect(mockCreate).toBeCalledWith(mockCustomerDetails)
    }
  })

  it.each([
    {
      events: [mockChargeSucceededEvent, mockCheckoutSessionCompletedEvent],
      expected: 1,
    },
    {
      events: [mockCheckoutSessionCompletedEvent, mockChargeSucceededEvent],
      expected: 0,
    },
    {
      events: [
        mockChargeSucceededEvent,
        getCheckoutSessionCompletedEventWithDifferentEmail(mockCheckoutSessionCompletedEvent, 0),
      ],
      expected: 0,
    },
    {
      events: [
        getChargeSucceededEventWithDifferentEmail(mockChargeSucceededEvent, 0),
        getChargeSucceededEventWithDifferentEmail(mockChargeSucceededEvent, 1),
        getChargeSucceededEventWithDifferentEmail(mockChargeSucceededEvent, 3),
        getCheckoutSessionCompletedEventWithDifferentEmail(mockCheckoutSessionCompletedEvent, 0),
      ],
      expected: 1,
    },
    {
      events: [
        getCheckoutSessionCompletedEventWithDifferentEmail(mockCheckoutSessionCompletedEvent, 0),
        getChargeSucceededEventWithDifferentEmail(mockChargeSucceededEvent, 0),
        getChargeSucceededEventWithDifferentEmail(mockChargeSucceededEvent, 1),
        getChargeSucceededEventWithDifferentEmail(mockChargeSucceededEvent, 3),
        getCheckoutSessionCompletedEventWithDifferentEmail(mockCheckoutSessionCompletedEvent, 0),
      ],
      expected: 1,
    },
    {
      events: [
        getCheckoutSessionCompletedEventWithDifferentEmail(mockCheckoutSessionCompletedEvent, 0),
        getCheckoutSessionCompletedEventWithDifferentEmail(mockCheckoutSessionCompletedEvent, 1),
        getCheckoutSessionCompletedEventWithDifferentEmail(mockCheckoutSessionCompletedEvent, 2),
        getCheckoutSessionCompletedEventWithDifferentEmail(mockCheckoutSessionCompletedEvent, 3),
        getChargeSucceededEventWithDifferentEmail(mockChargeSucceededEvent, 0),
        getChargeSucceededEventWithDifferentEmail(mockChargeSucceededEvent, 1),
        getChargeSucceededEventWithDifferentEmail(mockChargeSucceededEvent, 2),
        getChargeSucceededEventWithDifferentEmail(mockChargeSucceededEvent, 3),
      ],
      expected: 0,
    },
    {
      events: [
        getChargeSucceededEventWithDifferentEmail(mockChargeSucceededEvent, 0),
        getChargeSucceededEventWithDifferentEmail(mockChargeSucceededEvent, 1),
        getChargeSucceededEventWithDifferentEmail(mockChargeSucceededEvent, 2),
        getChargeSucceededEventWithDifferentEmail(mockChargeSucceededEvent, 3),
        getCheckoutSessionCompletedEventWithDifferentEmail(mockCheckoutSessionCompletedEvent, 0),
        getCheckoutSessionCompletedEventWithDifferentEmail(mockCheckoutSessionCompletedEvent, 1),
        getCheckoutSessionCompletedEventWithDifferentEmail(mockCheckoutSessionCompletedEvent, 2),
        getCheckoutSessionCompletedEventWithDifferentEmail(mockCheckoutSessionCompletedEvent, 3),
      ],
      expected: 4,
    },
  ])(
    'should call updateLastPayment only when first charge.succeeded then checkout.session.completed events are triggered for same email',
    async ({ events, expected }) => {
      const mockupdateLastPayment = vi.spyOn(SubscriptionDataService.prototype, 'updateLastPayment')

      for (const event of events) {
        const mockEvent = JSON.stringify(event)
        const mockStripeSignatureHeader = getMockStripeSigntarueHeader(event)

        await stripeWebhookService.execute({
          rawEvent: mockEvent,
          stripeSignatureHeader: mockStripeSignatureHeader,
        })
      }

      expect(mockupdateLastPayment).toHaveBeenCalledTimes(expected)
    }
  )
})
