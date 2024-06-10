<template>
  <DashboardOverviewChartGrid />
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Overview',
})

definePageMeta({
  layout: 'dashboard-grid',
  middleware: ['auth'],
})
</script>
