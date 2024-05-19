<template>
  <section>
    <h2 class="mb-3">{{ title }}</h2>

    <p class="mb-10 max-w-lg leading-7 tracking-wide desktop:mb-20">
      {{ text }}
    </p>

    <ul class="mx-auto grid w-fit gap-10 text-center tablet:grid-cols-3 tablet:gap-20">
      <li
        v-for="({ name, role, image, link }, index) in people"
        :key="'person' + index"
      >
        <NuxtLink
          :to="link ? link : ''"
          target="_blank"
        >
          <NuxtImg
            class="mx-auto mb-5 size-28 rounded-full object-cover p-2 tablet:hover:ring-4"
            :src="image"
            width="96"
            height="96"
            :alt="name"
          />
        </NuxtLink>

        <p class="font-semibold">{{ name }}</p>

        <p
          v-if="role"
          class="text-sm"
        >
          {{ role }}
        </p>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
type Props = {
  title: string
  text: string
  people: {
    name: string
    role?: string
    image: string
    link?: string
  }[]
}

defineProps<Props>()
</script>

<style scoped>
img:hover {
  @apply md:-translate-y-5 md:duration-500;
}
</style>
