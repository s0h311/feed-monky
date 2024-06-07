<template>
  <section class="grid items-center gap-20 text-center tablet:grid-cols-2">
    <div>
      <h2 class="mb-14 max-w-md text-5xl">{{ title }}</h2>

      <p class="max-w-md text-xl">
        Embed it into your website <br />
        in under 5 minutes.
      </p>
    </div>

    <div class="w-full rounded-lg bg-neutral py-12 text-neutral-content">
      <ul class="mx-auto grid w-fit grid-cols-2 gap-14">
        <li
          class="grid place-items-center gap-2"
          v-for="({ icon, name }, index) in items"
          :key="'supported-item-' + index"
        >
          <NuxtImg
            class="object-contain"
            :src="icon"
            :alt="name"
            width="auto"
            height="60"
          />

          {{ name }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
type SupportedItem = {
  icon: string
  name: string
}

type Props = {
  title: string
  items: SupportedItem[]
}

defineProps<Props>()
</script>
