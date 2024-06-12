<template>
  <form
    class="mx-auto grid w-fit place-items-center gap-7"
    @submit.prevent="submit(handleLogin)"
  >
    <h1 class="mb-7 text-2xl font-semibold">Login</h1>

    <label class="input input-bordered flex items-center gap-2">
      <IconEmail />

      <input
        v-model="fields.email"
        type="text"
        placeholder="john@doe.com"
      />
    </label>

    <p
      v-if="errors.email"
      class="-mt-6 ml-9 place-self-start text-error"
    >
      {{ errors.email }}
    </p>

    <label class="input input-bordered flex items-center gap-2">
      <IconPassword />

      <input
        v-model="fields.password"
        type="password"
        placeholder="••••••••"
      />
    </label>

    <p
      v-if="errors.password"
      class="-mt-6 ml-9 place-self-start text-error"
    >
      {{ errors.password }}
    </p>

    <UICta
      wide
      :is-loading="isLoading"
      type="submit"
    >
      Login
    </UICta>
  </form>
</template>

<script setup lang="ts">
import { z } from 'zod'
import logger from '~/utils/logger'

useSeoMeta({
  title: 'Login',
})

definePageMeta({
  middleware: ['not-auth'],
})

const isLoading = ref<boolean>(false)

const supabase = useSupabaseClient()

const { fields, errors, reset, submit, setError } = useForm({
  initialValue: {
    email: '',
    password: '',
  },
  resolver: z.object({
    email: z.string().email(),
    password: z.string().min(8).max(50),
  }),
})

async function handleLogin({ email, password }: { email: string; password: string }): Promise<void> {
  isLoading.value = true

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    setError({
      password: error.message,
    })

    logger.error(error.message, 'Login - handleLogin')
  }

  isLoading.value = false
  reset()
  navigateTo('/dashboard')
}
</script>
