<template>
  <nav>
    <div class="flex items-center justify-between">
      <button
        aria-label="Menu"
        @click="showSideMenu = true"
      >
        <IconMenu />
      </button>

      <HomeLogo />
    </div>

    <aside
      class="fixed top-0 z-10 h-screen w-3/5 rounded-r bg-neutral p-5 text-base-200 duration-300 ease-out"
      :class="showSideMenu ? 'left-0' : 'left-[-100%]'"
    >
      <div class="flex flex-col gap-5">
        <button
          class="mb-5"
          @click="showSideMenu = false"
        >
          <IconX class="ml-auto" />
        </button>

        <NuxtLink
          v-if="additionalLinks"
          v-for="{ path, title } in additionalLinks"
          :key="path"
          :to="path"
        >
          {{ title }}
        </NuxtLink>

        <hr />

        <a
          v-for="{ path, title } in links"
          class="cursor-pointer"
          :key="path"
          @click="
            () => {
              showSideMenu = false
              navigateTo(path)
            }
          "
        >
          {{ title }}
        </a>
      </div>
    </aside>
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

const showSideMenu = ref<boolean>(false)
</script>
