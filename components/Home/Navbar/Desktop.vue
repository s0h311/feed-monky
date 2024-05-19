<template>
  <nav class="navbar grid grid-cols-3 place-items-center px-10">
    <HomeLogo />

    <div class="space-x-7">
      <NuxtLink
        v-for="link in links"
        :key="link.path"
        :to="link.path"
      >
        {{ link.title }}
      </NuxtLink>
    </div>

    <div
      v-if="additionalLinks"
      class="space-x-3 justify-self-end"
    >
      <NuxtLink
        v-for="additionalLink in additionalLinks"
        :key="additionalLink.path"
        :to="additionalLink.path"
      >
        {{ additionalLink.title }}
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
type Link = {
  title: string
  path: string
}

type Props = {
  links: Link[]
  additionalLinks?: Link[]
}

defineProps<Props>()
</script>
