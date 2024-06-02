<template>
  <NuxtLink
    class="flex items-center"
    to="/"
  >
    <NuxtImg
      src="/monkey.png"
      :width="small ? 60 : 80"
      :height="small ? 60 : 80"
      alt="Monkey logo"
    />

    <p
      class="size-fit justify-self-start rounded-sm px-2 py-1 tracking-wider"
      :class="[
        light ? 'bg-neutral-content text-neutral' : ' bg-base-content text-base-100',
        small ? 'text-sm' : 'text-lg ',
      ]"
    >
      Feed Monky
    </p>
  </NuxtLink>
</template>

<script setup lang="ts">
type Props = {
  light?: boolean
  small?: boolean
}

defineProps<Props>()
</script>
