<template>
  <dialog
    ref="confirmationDialogRef"
    class="w-[30%] space-y-5 rounded-lg p-4"
  >
    <h2>{{ title }}</h2>

    <p
      v-if="text"
      class="text-sm"
    >
      {{ text }}
    </p>

    <div class="flex justify-end gap-5">
      <UICta
        primary
        @handle-click="closeModal"
      >
        {{ cancelButtonText ?? 'Cancel' }}
      </UICta>

      <UICta
        error
        outline
        :is-loading="isLoading"
        @handle-click="handleContinueClick"
      >
        {{ continueButtonText }}
      </UICta>
    </div>
  </dialog>
</template>

<script setup lang="ts">
type Props = {
  title: string
  text?: string
  cancelButtonText?: string
  continueButtonText: string
}

type Emits = {
  continueClick: []
}

defineProps<Props>()
const emits = defineEmits<Emits>()
defineExpose({
  closeModal,
  showModal,
})

const confirmationDialogRef = ref<HTMLDialogElement>()
const isLoading = ref<boolean>(false)

function handleContinueClick(): void {
  isLoading.value = true
  emits('continueClick')
}

function closeModal(): void {
  isLoading.value = false
  confirmationDialogRef.value?.close()
}

function showModal(): void {
  confirmationDialogRef.value?.showModal()
}
</script>
