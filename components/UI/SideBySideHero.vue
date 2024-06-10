<template>
  <div class="grid place-items-center gap-16 tablet:grid-cols-2 tablet:gap-0 desktop:px-[5%]">
    <div class="text-center">
      <h1
        class="mb-3"
        v-html="title"
      />

      <h3 v-html="text" />
    </div>

    <div class="grid place-items-center gap-6">
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

      <ul v-if="gains">
        <li
          v-for="(gain, index) in gains"
          :key="'gain' + index"
          class="flex gap-2 text-start tablet:items-center"
        >
          <IconCheck stroke-color="stroke-green-500" /> {{ gain }}
        </li>
      </ul>

      <a
        id="hero-cta"
        v-if="cta"
        class="btn btn-primary"
        @click="trackAndNavigate(cta.title, cta.path)"
      >
        {{ cta.title }}
      </a>
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
