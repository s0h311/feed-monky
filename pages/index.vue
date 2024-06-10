<template>
  <div class="grid place-items-center gap-20 tablet:mt-20 tablet:gap-36 desktop:mt-52 desktop:gap-52">
    <HomeHero />
    <HomeSupportedFrameworks />
    <HomePainsAndGains />
    <HomeDemo />
    <HomePricing />
    <HomeAbout />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Simple TODOs from customer feedback',
  description:
    'FeedMonky.com generates simple TODOs from long customer feedback. It is powered by cutting edge LLM, which is fine-tuned.',
})
</script>
