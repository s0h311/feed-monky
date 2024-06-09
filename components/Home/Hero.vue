<template>
  <UIHero
    title="Simple <mark>&nbsp;actions&nbsp;</mark> from long customer feedbacks"
    text="Start shipping what matters most"
    :gains="[
      'Feedbacks get automatically turned into actions 📋',
      'See what your users value in matter of seconds 🤩',
      'Start shipping features faster 🚀',
      'Save time and money 💸',
    ]"
    :cta="{
      title: 'How it works',
      path: '/#demo',
    }"
    :customContent="HomeProductHuntBadge"
  />
</template>

<script setup lang="ts">
import HomeProductHuntBadge from './ProductHuntBadge.vue'
</script>
