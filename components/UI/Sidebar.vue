<template>
  <aside class="flex h-screen w-fit flex-col gap-5 border-r p-10">
    <div class="mb-5">
      <slot />
    </div>

    <NuxtLink
      v-for="{ title, path } in links"
      :key="path"
      class="rounded-lg px-3 py-2"
      :class="route.path === path ? 'bg-neutral text-base-200' : 'hover:bg-base-200'"
      :to="path"
    >
      {{ title }}
    </NuxtLink>

    <div
      v-if="(bottomLinks && bottomLinks.length > 0) || (bottomBtns && bottomBtns.length > 0)"
      class="mt-auto grid justify-items-start gap-2 text-sm"
    >
      <NuxtLink
        v-for="{ title, path } in bottomLinks"
        :key="path"
        class="rounded-lg px-3 py-2"
        :class="route.path === path ? 'bg-neutral text-base-200' : 'hover:bg-base-200'"
        :to="path"
      >
        {{ title }}
      </NuxtLink>

      <button
        v-for="(btn, btnIndex) in bottomBtns"
        :key="'btn' + btnIndex"
        class="rounded-lg px-3 py-2 hover:bg-base-200"
        @click="btn.handleFn"
      >
        {{ btn.title }}
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
type Link = {
  title: string
  path: string
}

type Btn = {
  title: string
  handleFn: () => void
}

type Props = {
  links: Link[]
  bottomLinks?: Link[]
  bottomBtns?: Btn[]
}

defineProps<Props>()

const route = useRoute()
</script>
