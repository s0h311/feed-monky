<template>
  <form
    class="mx-auto grid max-w-[275px] place-items-center gap-7"
    @submit.prevent="submit(signup)"
  >
    <h1 class="mb-7 text-2xl font-semibold">Signup</h1>

    <div>
      <label class="input input-bordered flex items-center gap-2">
        <IconUser />

        <input
          v-model="fields.name"
          type="text"
          placeholder="John"
        />
      </label>

      <p
        v-if="errors.name"
        class="text-error"
      >
        {{ errors.name }}
      </p>
    </div>

    <div>
      <label class="input input-bordered flex items-center gap-2">
        <IconEmail />

        <input
          v-model="fields.email"
          type="email"
          placeholder="john@doe.com"
        />
      </label>

      <p
        v-if="errors.email"
        class="text-error"
      >
        {{ errors.email }}
      </p>
    </div>

    <UICta
      wide
      :is-loading="isLoading"
      type="submit"
    >
      Start 14 days trial
    </UICta>
  </form>
</template>

<script setup lang="ts">
import { z } from 'zod'

const isLoading = ref<boolean>(false)

const { fields, errors, reset, submit } = useForm({
  initialValue: {
    name: '',
    email: '',
  },
  resolver: z.object({
    name: z.string().min(1).max(50),
    email: z.string().email(),
  }),
})

async function signup(data: { name: string; email: string }): Promise<void> {
  isLoading.value = true

  await $fetch('/api/account', {
    method: 'POST',
    body: JSON.stringify(data),
  })

  navigateTo('/checkout/success')
}
</script>
