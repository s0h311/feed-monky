<template>
  <NuxtLink
    class="flex items-center gap-2 self-start"
    to="/"
  >
    <NuxtImg
      class="size-[40px] desktop:size-[60px]"
      src="/monkey.png"
      :height="60"
      :width="60"
      alt="Monkey logo"
    />

    <p
      class="size-fit justify-self-start rounded-sm px-2 py-1 text-sm tracking-wider desktop:text-lg"
      :class="[light ? 'bg-neutral-content text-neutral' : ' bg-base-content text-base-100']"
    >
      Feed Monky
    </p>
  </NuxtLink>
</template>

<script setup lang="ts">
type Props = {
  light?: boolean
}

defineProps<Props>()
</script>
