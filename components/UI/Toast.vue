<template>
  <div
    ref="toast"
    class="absolute right-5 top-[-100%] z-10 flex h-[70px] w-[340px] items-center gap-2 rounded-lg border bg-opacity-5 p-5 text-sm shadow-lg duration-500 ease-in-out"
    :class="`border-${type} bg-${type} text-${type}`"
  >
    <IconCheck v-if="type === 'success'" />
    {{ message }}
  </div>
</template>

<script setup lang="ts">
const toast = ref<HTMLDivElement>()

type Props = {
  type: 'warning' | 'error' | 'info' | 'success'
  message: string
}

defineProps<Props>()

onMounted(() => {
  setTimeout(() => {
    if (toast.value) {
      toast.value.style.top = '20px'
    }
  }, 1000)

  setTimeout(() => {
    if (toast.value) {
      toast.value.style.top = '-100%'
    }
  }, 3000)

  setTimeout(() => {
    if (toast.value) {
      toast.value.remove()
    }
  }, 5000)
})
</script>
