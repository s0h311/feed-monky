<template>
  <div class="hero-content text-center">
    <div class="space-y-3">
      <h1 v-html="title" />

      <h3 v-html="text" />

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
          id="hero-cta"
          v-if="cta"
          class="btn btn-primary"
          @click="trackAndNavigate(cta.title, cta.path)"
        >
          {{ cta.title }}
        </a>

        <div
          v-if="customContent && customContent.length > 0"
          class="flex flex-col items-center gap-5 tablet:flex-row"
        >
          <component
            v-for="(content, index) in customContent"
            :key="'custome-content-' + index"
            :is="content"
          />
        </div>
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
  customContent?: unknown[]
}

defineProps<Props>()

const { trackAndNavigate } = useTracking('Hero')
</script>
