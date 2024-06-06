<template>
  <UIPricing
    id="pricing"
    title="Pricing"
    :pricing-options="pricingOptions"
    cta-title="Get it"
    :handle-fn="handleGoToCheckout"
  />
</template>

<script setup lang="ts">
import type { PricingOption } from '../UI/Pricing.vue'

const pricingOptions: (PricingOption & { priceId: string })[] = [
  {
    title: 'Starter',
    newPrice: 9.99,
    paymentPeriod: 'monthly',
    paymentPeriodText: 'monthly',
    benefits: ['Continual improvements', '24/7 Customer service', 'Best for small businesses'],
    isPremium: false,
    description: `With this plan feedbacks don't get summarized.You can switch to Pro plan anytime.`,
    priceId: 'price_1POgtqBzByKpK824CECRC3aM',
  },
  {
    title: 'Pro <small> - pay as you go</small>',
    newPrice: 14.99,
    paymentPeriod: 'monthly',
    paymentPeriodText: 'monthly',
    benefits: [
      'Continual improvements',
      '24/7 Customer service',
      'Best for growing businesses',
      'Powered by cutting edge AI',
    ],
    isPremium: true,
    description: `First 20 feedbacks get summarized for free.
    Starting from the 21st each feedback gets summarized for 0.05$.
    You can switch to Starter plan anytime.
    `,
    priceId: 'price_1POgtuBzByKpK824CSOmHeUz',
  },
]

async function handleGoToCheckout(pricingOptionIndex: number): Promise<void> {
  const pricingOption = pricingOptions[pricingOptionIndex]

  const stripeCheckoutUrl: string = await $fetch('/api/stripe/checkout', {
    method: 'post',
    body: {
      priceId: pricingOption.priceId,
      paymentPeriod: pricingOption.paymentPeriod,
    },
  })

  await navigateTo(stripeCheckoutUrl, { external: true })
}
</script>
