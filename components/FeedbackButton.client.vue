<template>
  <iframe
    style="position: absolute; right: 0; bottom: 0; width: 100dvw; height: 100dvh"
    :src
  ></iframe>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()

const src = computed(() => `${config.public.feedxApiUrl}/api/template?siteId=4dabc61f-4c0f-4c29-88ed-052731fcd0ed`)
</script>
