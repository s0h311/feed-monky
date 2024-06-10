<template>
  <DashboardFeedbackSummaryList />
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'TODOs',
})

definePageMeta({
  layout: 'dashboard-grid',
  middleware: ['auth'],
})
</script>
