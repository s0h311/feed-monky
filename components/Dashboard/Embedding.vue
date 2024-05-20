<template>
  <h1 class="mb-10 text-xl">Embedding</h1>

  <div class="w-fit rounded bg-neutral p-10">
    <p class="text-base-100">
      &lt;iframe src="{{ iframeSrc }}" <br />
      style="position: absolute; right: 0; bottom: 0; width: 100dvw; height: 100dvh"&gt;&lt;/iframe&gt;
    </p>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const site = (await useSite()).value!

const iframeSrc = computed(() => `${config.public.feedxApiUrl}/api/template?siteId=${site.id}`)
</script>
