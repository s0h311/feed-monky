<template>
  <nav class="navbar grid place-items-center desktop:grid-cols-3">
    <HomeLogo />

    <div class="space-x-3 desktop:space-x-7">
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

<style scoped>
.navbar {
  grid-template-columns: 1fr 2fr 1fr;
}
</style>
