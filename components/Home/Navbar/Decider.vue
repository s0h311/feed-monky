<template>
  <HomeNavbarMobile
    class="tablet:hidden"
    :links
    :additional-links
  />

  <HomeNavbarDesktop
    class="max-[767px]:hidden desktop:px-[10%]"
    :links
    :additional-links
  />
</template>

<script setup lang="ts">
const user = useSupabaseUser()

const links = [
  {
    title: 'Pricing',
    path: '/#pricing',
  },
  {
    title: 'How it works',
    path: '/#demo',
  },
  {
    title: 'About us',
    path: '/#about',
  },
]

const additionalLinks = computed(() => {
  const additionalLink = {
    title: 'Login',
    path: '/login',
  }

  if (user.value) {
    additionalLink.title = 'Dashboard'
    additionalLink.path = '/dashboard'
  }

  return [additionalLink]
})
</script>
