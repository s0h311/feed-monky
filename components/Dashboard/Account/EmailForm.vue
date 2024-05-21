<template>
  <div>
    <form
      class="grid w-fit gap-7"
      @submit.prevent="submit(handleSubmit)"
    >
      <h1 class="text-xl">E-Mail</h1>

      <input
        v-model="fields.email"
        class="input input-bordered"
        type="text"
        :placeholder="user.email"
      />

      <p
        v-if="errors.email"
        class="-mt-6 text-red-400"
      >
        {{ errors.email }}
      </p>

      <UICta
        primary
        wide
        type="submit"
        :is-loading="isLoading"
      >
        Update
      </UICta>
    </form>

    <p class="max-w-md text-xs text-gray-500">You have to confirm the change. Check out your E-Mail.</p>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod'
import logger from '~/utils/logger'

const user = useSupabaseUser().value!
const supabase = useSupabaseClient()
const isLoading = ref<boolean>(false)

const { fields, errors, submit } = useForm({
  initialValue: {
    email: user.email as string,
  },
  resolver: z.object({
    email: z.string().email(),
  }),
})

async function handleSubmit({ email }: { email: string }): Promise<void> {
  isLoading.value = true
  const { error } = await supabase.auth.updateUser({
    email,
  })

  if (error) {
    logger.error(error.message, 'AccountEmailForm - handleSubmit')
    return
  }

  isLoading.value = false
}
</script>
