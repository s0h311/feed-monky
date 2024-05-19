<template>
  <section class="flex flex-col items-center gap-20 desktop:flex-row">
    <div class="lg:max-w-lg 2xl:max-w-xl">
      <h2 class="mb-3 text-3xl tablet:text-5xl">{{ title }}</h2>

      <p class="leading-7 tracking-wide">
        {{ text }}
      </p>
    </div>

    <div
      v-if="images.length >= 5"
      class="flex gap-8"
    >
      <div class="hidden pt-[40%] tablet:block">
        <NuxtImg
          :src="images[0]"
          width="176"
          height="264"
          alt=""
        />
      </div>

      <div class="pt-[20%]">
        <NuxtImg
          class="mb-10"
          :src="images[1]"
          width="176"
          height="264"
          alt=""
        />

        <NuxtImg
          :src="images[2]"
          width="176"
          height="264"
          alt=""
        />
      </div>

      <div>
        <NuxtImg
          class="mb-8"
          :src="images[3]"
          width="176"
          height="264"
          alt=""
        />

        <NuxtImg
          :src="images[4]"
          width="176"
          height="264"
          alt=""
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type Props = {
  title: string
  text: string
  images: string[]
}

defineProps<Props>()
</script>

<style scoped>
img {
  @apply rounded-xl;
}
</style>
