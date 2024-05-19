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
      class="absolute top-0 h-screen w-3/4 rounded-r bg-neutral p-4 text-base-200 duration-300 ease-out"
      :class="showSideMenu ? 'left-0' : 'left-[-100%]'"
    >
      SIDEBAR

      <button @click="showSideMenu = false">CLOSE</button>
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
