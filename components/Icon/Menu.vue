<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
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
      d="M3 5h18M3 12h18M3 19h18"
    />
  </svg>
</template>

<script setup lang="ts">
import { getIconSize, type StrokeIconProps } from './utils'

defineProps<StrokeIconProps>()
</script>
