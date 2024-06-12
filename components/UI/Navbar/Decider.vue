<template>
  <UINavbarMobile
    class="tablet:hidden"
    :links
    :additional-links
  />

  <UINavbarDesktop
    class="max-[767px]:hidden desktop:px-[10%]"
    :links
    :additional-links
  />
</template>

<script setup lang="ts">
type Link = {
  title: string
  path: string
  icon?: unknown
}

defineProps<{
  links: Link[]
  additionalLinks?: Link[]
}>()
</script>
