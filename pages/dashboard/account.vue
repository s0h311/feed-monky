<template>
  <section class="flex w-fit gap-10">
    <div>
      <DashboardAccountEmailForm />
      <DashboardAccountPasswordForm />
    </div>

    <div>
      <DashboardAccountSubscriptionOverview />
      <DashboardAccountDeleteAccountForm />
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard-grid',
  middleware: ['auth'],
})

useSeoMeta({
  title: 'Account Settings',
})
</script>

<style scoped>
section div div {
  @apply space-y-7 rounded-lg bg-base-200 px-4 py-3 first:mb-10;
}
</style>
