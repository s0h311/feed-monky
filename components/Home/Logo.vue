<template>
  <div class="flex items-center">
    <NuxtImg
      src="/monkey.png"
      width="80"
      height="80"
      alt="Monkey logo"
    />

    <NuxtLink
      class="size-fit justify-self-start rounded-sm px-2 py-1 text-lg tracking-wider"
      :class="light ? 'bg-neutral-content text-neutral' : ' bg-base-content text-base-100'"
      to="/"
    >
      Feed Monky
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
type Props = {
  light?: boolean
}

defineProps<Props>()
</script>
