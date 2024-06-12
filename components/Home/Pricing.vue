<template>
  <UIPricing
    id="pricing"
    title="Pricing"
    :pricing-options="pricingOptions"
    cta-title="Start 14 days trial"
    :handle-fn="handleGoToCheckout"
  />
</template>

<script setup lang="ts">
import type { PricingOption } from '../UI/Pricing.vue'

const pricingOptions: (PricingOption & { priceId: string })[] = [
  {
    title: 'Starter',
    oldPrice: 9.99,
    newPrice: 'free',
    paymentPeriod: 'lifetime',
    paymentPeriodText: 'forever',
    benefits: ['Continual improvements', '24/7 Customer service', 'Best for small businesses'],
    isPremium: false,
    description: `Every month 10 feedbacks get turned into TODOs. You can switch to Pro plan anytime.`,
    priceId: 'price_1PQNqGBzByKpK824WA1OuCOV',
  },
  {
    title: 'Pro <small> - pay as you go</small>',
    oldPrice: 14.99,
    newPrice: 13,
    paymentPeriod: 'monthly',
    paymentPeriodText: 'monthly',
    benefits: [
      'Continual improvements',
      '24/7 Customer service',
      'Best for growing businesses',
      'Powered by cutting edge AI',
    ],
    isPremium: true,
    description: `Every month first 20 feedbacks get turned into TODOs for free.
    Starting from the 21st each feedback gets turned into TODOs for 0.009$.
    You can switch to Starter plan anytime.
    `,
    priceId: 'price_1PQNk3BzByKpK8248oDvzkGT',
  },
]

async function handleGoToCheckout(pricingOptionIndex: number): Promise<void> {
  navigateTo('/signup')
  return

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
