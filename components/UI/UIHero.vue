<template>
  <div class="hero">
    <div class="hero-content text-center">
      <div class="space-y-3">
        <h1 class="text-5xl font-bold">{{ title }}</h1>

        <h2 class="text-3xl">{{ text }}</h2>

        <ul
          v-if="gains"
          class="py-6 w-fit mx-auto"
        >
          <li
            v-for="(gain, index) in gains"
            :key="'gain' + index"
            class="flex items-center gap-2"
          >
            <IconCheck stroke-color="stroke-primary" /> {{ gain }}
          </li>
        </ul>

        <NuxtLink
          v-if="cta"
          class="btn btn-primary"
          :to="cta.path"
        >
          {{ cta.title }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  title: string
  text: string
  gains?: string[]
  cta?: {
    title: string
    path: string
  }
}

defineProps<Props>()
</script>
