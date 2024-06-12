<template>
  <div>
    <h1 class="mb-10 text-xl">Embedding</h1>

    <ContentDoc
      class="w-fit"
      path="embedding"
    />
  </div>
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
