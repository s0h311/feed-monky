<template>
  <UISideBySideHero
    title="Simple <mark>&nbsp;actions&nbsp;</mark> from long customer feedbacks"
    text="Try it for free. <u>No credit card</u> needed"
    :gains="[
      'Feedbacks get automatically turned into actions 📋',
      'See what your users value in matter of seconds 🤩',
      'Start shipping features faster 🚀',
      'Save time and money 💸',
    ]"
    :cta="{
      title: 'Try it for free',
      path: '/signup',
    }"
    :customContent="[HomeProductHuntBadge]"
  />
</template>

<script setup lang="ts">
import HomeProductHuntBadge from './ProductHuntBadge.vue'
</script>
