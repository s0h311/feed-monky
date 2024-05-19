<template>
  <div>
    <h2 class="mb-14 text-center">{{ title }}</h2>

    <div class="grid gap-10 tablet:grid-cols-2">
      <ul class="rounded-lg bg-red-100 p-5 shadow-md">
        <li
          v-for="(pain, index) in pains"
          :key="'pain' + index"
          class="flex gap-2"
        >
          <IconX stroke-color="stroke-error" /> {{ pain }}
        </li>
      </ul>

      <ul class="rounded-lg bg-green-100 p-5 shadow-md">
        <li
          v-for="(gain, index) in gains"
          :key="'gain' + index"
          class="flex gap-2"
        >
          <IconCheck stroke-color="stroke-primary" /> {{ gain }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  title: string
  pains: string[]
  gains: string[]
}

defineProps<Props>()
</script>
