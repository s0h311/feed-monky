<template>
  <ContentDoc
    class="w-fit"
    path="embedding"
  />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard-grid',
  middleware: ['auth'],
})
</script>
