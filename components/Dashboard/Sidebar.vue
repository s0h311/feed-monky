<template>
  <UISidebar
    :links="links"
    :bottom-links="bottomLinks"
    :bottom-btns="bottomBtns"
  />
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const site = await useSite()

const links = [{ title: 'Overview', path: '/dashboard' }]

const bottomLinks = [{ title: 'Account', path: '/dashboard/account' }]

const bottomBtns = [{ title: 'Sign out', handleFn: handleSignout }]

async function handleSignout(): Promise<void> {
  await supabase.auth.signOut()
  site.value = null
  navigateTo('/')
}
</script>
