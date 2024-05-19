<template>
  <footer class="bg-gray-900 text-sm text-base-300">
    <div class="flex flex-col justify-evenly gap-10 p-7 tablet:flex-row tablet:gap-0 desktop:py-20">
      <slot />

      <div class="flex flex-row flex-wrap gap-x-20 gap-y-10 desktop:gap-32">
        <ul class="flex flex-col gap-3">
          <p class="text-base-100">{{ linksColumn1.title }}</p>

          <NuxtLink
            v-for="{ title, path, isExtern } in linksColumn1.links"
            :key="path"
            :to="path"
            :target="isExtern ? '_blank' : '_self'"
          >
            {{ title }}
          </NuxtLink>
        </ul>

        <ul class="flex flex-col gap-3">
          <p class="text-base-100">{{ linksColumn2.title }}</p>

          <NuxtLink
            v-for="{ title, path, isExtern } in linksColumn2.links"
            :key="path"
            :to="path"
            :target="isExtern ? '_blank' : '_self'"
          >
            {{ title }}
          </NuxtLink>
        </ul>

        <ul class="flex flex-col gap-3">
          <p class="text-base-100">{{ linksColumn3.title }}</p>

          <NuxtLink
            v-for="{ title, path, isExtern } in linksColumn3.links"
            :key="path"
            :to="path"
            :target="isExtern ? '_blank' : '_self'"
          >
            {{ title }}
          </NuxtLink>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
type Link = {
  title: string
  path: string
  isExtern?: boolean
}

type LinkColumn = {
  title: string
  links: Link[]
}

type Props = {
  linksColumn1: LinkColumn
  linksColumn2: LinkColumn
  linksColumn3: LinkColumn
}

defineProps<Props>()
</script>
