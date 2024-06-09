<template>
  <h1 class="mb-10 text-xl">Overview</h1>

  <div class="grid grid-cols-2 gap-10">
    <div>
      <DashboardOverviewChartFeedbacksInLast30Days />
    </div>

    <div v-if="subscription.type !== 'starter'">
      <DashboardOverviewChartMostPopularFeedbackSummaries />
    </div>

    <div>
      <DashboardOverviewChartSingleFeedbackSummaryInLast30Days />
    </div>
  </div>
</template>

<script setup lang="ts">
const subscription = (await useSubscription()).value!
</script>

<style>
canvas {
  border-radius: 0.5rem;
  border-width: 1px;
  padding: 1rem;
}
</style>
