<template>
  <nav v-if="deviceType === 'mobile'">
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
      class="h-screen w-3/4 bg-neutral ease-out duration-300 absolute top-0 text-base-200 rounded-r p-4"
      :class="showSideMenu ? 'left-0' : 'left-[-100%]'"
    >
      SIDEBAR

      <button @click="showSideMenu = false">CLOSE</button>
    </aside>
  </nav>

  <nav
    v-else
    class="navbar px-10 grid grid-cols-3 place-items-center"
  >
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

    <div class="space-x-3 justify-self-end">
      <NuxtLink
        v-if="!user"
        to="/login"
      >
        Anmelden
      </NuxtLink>

      <NuxtLink
        v-if="user"
        to="/dashboard"
      >
        Dashboard
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
const user = ref<boolean>(false)
const showSideMenu = ref<boolean>(false)

const deviceType = useDeviceType()

const links = [
  {
    title: 'Preise',
    path: '/#pricing',
  },
  {
    title: "Wie funktioniert's",
    path: '/#demo',
  },
  {
    title: 'Wer sind wir',
    path: '/#about',
  },
]
</script>
