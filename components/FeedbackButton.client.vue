<template>
  <iframe
    style="position: absolute; right: 10%; bottom: 0"
    :src
  ></iframe>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()

const src = computed(() => `${config.public.feedxApiUrl}/api/template?siteId=a52f1d88-3bd3-420a-8e40-a8f0c371ec56`)
</script>
