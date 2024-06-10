<template>
  <ContentDoc
    class="w-fit"
    path="embedding"
  />
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Embedding',
})

definePageMeta({
  layout: 'dashboard-grid',
  middleware: ['auth'],
})
</script>
