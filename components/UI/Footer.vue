<template>
  <footer class="bg-neutral p-7 text-sm text-base-300 desktop:pb-10 desktop:pt-20">
    <div class="flex flex-col justify-evenly gap-10 tablet:flex-row tablet:gap-0">
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

    <ul
      v-if="attributions"
      class="flex flex-col gap-1 text-xs"
    >
      <p class="text-base-100">Attributions</p>

      <NuxtLink
        v-for="{ title, path, isExtern } in attributions"
        :key="path"
        :to="path"
        :target="isExtern ? '_blank' : '_self'"
      >
        {{ title }}
      </NuxtLink>
    </ul>
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
  attributions?: Link[]
}

defineProps<Props>()
</script>
