<template>
  <DashboardFeedbackList />
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Feedbacks',
})

definePageMeta({
  layout: 'dashboard-grid',
  middleware: ['auth'],
})
</script>
