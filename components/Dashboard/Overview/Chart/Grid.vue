<template>
  <h1 class="mb-10 text-xl">Overview</h1>

  <div class="grid grid-cols-2 gap-10 *:rounded-lg *:border *:p-4">
    <div>
      <DashboardOverviewChartFeedbacksInLast30Days />
    </div>
    <div v-if="subscription.type !== 'starter'">
      <DashboardOverviewChartMostPopularFeedbackSummaries />
    </div>
  </div>
</template>

<script setup lang="ts">
const subscription = (await useSubscription()).value!
</script>
