<template>
  <UISidebar
    :links="links"
    :bottom-links="bottomLinks"
    :bottom-btns="bottomBtns"
  >
    <HomeLogo />
  </UISidebar>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const site = await useSite()

const links = [
  { title: 'Overview', path: '/dashboard' },
  { title: 'Feedbacks', path: '/dashboard/feedback' },
  { title: 'Summaries', path: '/dashboard/feedback/summary' },
  { title: 'Embedding', path: '/dashboard/embedding' },
]

const bottomLinks = [{ title: 'Account', path: '/dashboard/account' }]

const bottomBtns = [{ title: 'Sign out', handleFn: handleSignout }]

async function handleSignout(): Promise<void> {
  await supabase.auth.signOut()
  site.value = null
  navigateTo('/')
}
</script>
