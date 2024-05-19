<template>
  <HomeNavbarMobile
    class="tablet:hidden"
    :links
    :additional-links
  />

  <HomeNavbarDesktop
    class="max-[767px]:hidden"
    :links
    :additional-links
  />
</template>

<script setup lang="ts">
const user = ref<boolean>(false)

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
