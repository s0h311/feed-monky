<template>
  <div class="hero-content text-center">
    <div class="space-y-3">
      <h1 v-html="title" />

      <h3>{{ text }}</h3>

      <ul
        v-if="gains"
        class="mx-auto w-fit py-6"
      >
        <li
          v-for="(gain, index) in gains"
          :key="'gain' + index"
          class="flex gap-2 text-start tablet:items-center"
        >
          <IconCheck stroke-color="stroke-green-500" /> {{ gain }}
        </li>
      </ul>

      <div class="grid place-items-center gap-5">
        <a
          v-if="cta"
          class="btn btn-primary"
          @click="trackAndNavigate(cta.title, cta.path)"
        >
          {{ cta.title }}
        </a>

        <component
          v-if="customContent"
          :is="customContent"
        />
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
  customContent?: unknown
}

defineProps<Props>()

const { trackAndNavigate } = useTracking('Hero')
</script>
