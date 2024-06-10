<template>
  <div class="grid place-items-center gap-10 desktop:mt-10 desktop:grid-cols-2">
    <div class="space-y-5">
      <h1 class="text-5xl">Thank you for trusting us</h1>

      <p>Check your inbox. We've sent you your password</p>

      <span class="flex items-center gap-5">
        You will be redirected to the login page shortly
        <div class="loading loading-spinner" />
      </span>
    </div>

    <NuxtImg
      class="w-2/3 -scale-x-100 rounded-lg"
      src="alvan-nee-brFsZ7qszSY.jpg"
      :width="500"
      :height="700"
      alt="Dog"
    />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Checkout successful',
})

onMounted(() => {
  setTimeout(() => navigateTo('/login'), 1000 * 5)
})
</script>
