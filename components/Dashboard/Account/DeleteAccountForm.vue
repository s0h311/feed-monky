<template>
  <UICta
    class="w-fit"
    error
    outline
    small
    @handle-click="showConfirmationDialog"
  >
    Delete account
  </UICta>

  <UIConfirmationDialog
    ref="deleteAccountConfirmationDialog"
    title="Do you really want to delete you account"
    text="You will not be able to undo the deletion."
    continue-button-text="Delete permanently"
    @continue-click="handleDeleteAccount"
  />
</template>

<script setup lang="ts">
import type { UIConfirmationDialog } from '#build/components'

const site = await useSite()
const config = useRuntimeConfig()

const deleteAccountConfirmationDialog = ref<InstanceType<typeof UIConfirmationDialog>>()

function showConfirmationDialog(): void {
  deleteAccountConfirmationDialog.value?.showModal()
}

async function handleDeleteAccount(): Promise<void> {
  await $fetch(`${config.public.feedxApiUrl}/api/account`, {
    method: 'delete',
  })

  deleteAccountConfirmationDialog.value?.closeModal()

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)

    if (key?.includes('auth-token')) {
      localStorage.removeItem(key)
      break
    }
  }

  site.value = null
  await navigateTo('/')
}
</script>
