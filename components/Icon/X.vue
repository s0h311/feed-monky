<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="min-w-[24px]"
    :width="getIconSize($props)"
    :height="getIconSize($props)"
    viewBox="0 0 24 24"
  >
    <path
      fill="none"
      :class="strokeColor ?? 'stroke-current'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
    />
  </svg>
</template>

<script setup lang="ts">
import { getIconSize, type StrokeIconProps } from './utils'

defineProps<StrokeIconProps>()
</script>
