<template>
  <div class="space-y-10">
    <h2 class="text-center">{{ title }}</h2>

    <div class="grid gap-20 tablet:grid-cols-2 tablet:gap-10 desktop:gap-20">
      <div
        v-for="(option, indexPricing) in pricingOptions"
        :key="'option' + indexPricing"
        class="flex min-w-[17dvw] flex-col gap-10 rounded-xl border-2 p-8 shadow-md"
        :class="option.isPremium ? 'border-primary' : 'border-neutral'"
      >
        <h3
          class="text-xl font-semibold"
          v-html="option.title"
        />

        <div class="space-y-2">
          <p
            v-if="option.oldPrice"
            class="text-sm line-through"
          >
            {{ option.oldPrice }}€
          </p>

          <div class="flex items-center gap-2">
            <p class="text-3xl font-semibold">{{ option.newPrice }}€</p>
            <p class="text-sm">/ {{ option.paymentPeriodText }}</p>
          </div>
        </div>

        <ul>
          <li
            v-for="(benefit, indexBenetifs) in option.benefits"
            :key="'benefit' + indexBenetifs"
            class="flex items-center gap-2 text-sm"
          >
            <IconCheck stroke-color="stroke-primary" /> {{ benefit }}
          </li>
        </ul>

        <p
          v-if="option.description"
          class="mt-auto max-w-xs text-xs text-gray-400"
        >
          {{ option.description }}
        </p>

        <UICta
          class="w-full"
          :primary="option.isPremium"
          :is-loading="isLoading === indexPricing"
          @handle-click="handleSubmit(indexPricing)"
        >
          {{ ctaTitle }}
        </UICta>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export type PricingOption = {
  title: string
  oldPrice?: number
  newPrice: number
  paymentPeriod: 'monthly' | 'yearly' | 'lifetime'
  paymentPeriodText: string
  benefits: string[]
  isPremium: boolean
  description?: string
}

type Props = {
  title: string
  pricingOptions: PricingOption[]
  ctaTitle: string
  handleFn: (pricingOptionIndex: number) => Promise<void>
}

const props = defineProps<Props>()

const isLoading = ref<number | null>(null)

async function handleSubmit(pricingOptionIndex: number): Promise<void> {
  isLoading.value = pricingOptionIndex

  props.handleFn(pricingOptionIndex).then(() => {
    isLoading.value = null
  })
}
</script>
