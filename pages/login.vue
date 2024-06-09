<template>
  <div class="grid place-items-center gap-7">
    <h1 class="mb-7 text-2xl font-semibold">Login</h1>

    <label class="input input-bordered flex items-center gap-2">
      <IconEmail />
      <input
        v-model="credentials.email"
        type="text"
        class="grow"
        placeholder="john@doe.com"
      />
    </label>

    <label class="input input-bordered flex items-center gap-2">
      <IconPassword />
      <input
        v-model="credentials.password"
        type="password"
        class="grow"
        placeholder="••••••••"
      />
    </label>

    <UICta
      wide
      :is-loading="isLoading"
      @handle-click="handleLogin"
    >
      Login
    </UICta>
  </div>
</template>

<script setup lang="ts">
import logger from '~/utils/logger'

definePageMeta({
  middleware: ['not-auth'],
})

useSeoMeta({
  title: 'Einloggen',
})

const supabase = useSupabaseClient()

const credentials = reactive({
  email: '',
  password: '',
})

const isLoading = ref<boolean>(false)

async function handleLogin(): Promise<void> {
  if (!credentials.email || !credentials.password) {
    return
  }

  isLoading.value = true

  const { error } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  })

  if (error) {
    logger.error(error.message, 'Login - handleLogin')
  }

  isLoading.value = false
  navigateTo('/dashboard')
}
</script>
