<template>
  <UINavbarDecider
    :links
    :additional-links
  />
</template>

<script setup lang="ts">
import IconLogin from '../Icon/Login.vue'

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
    icon: IconLogin,
  }

  if (user.value) {
    additionalLink.title = 'Dashboard'
    additionalLink.path = '/dashboard'
  }

  return [additionalLink]
})
</script>
