<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="getIconSize($props)"
    :height="getIconSize($props)"
    viewBox="0 0 24 24"
  >
    <path
      :class="fillColor ?? 'fill-current'"
      d="m12 2.5l8.84 3.15l-1.34 11.7L12 21.5l-7.5-4.15l-1.34-11.7zm0 2.1L6.47 17h2.06l1.11-2.78h4.7L15.45 17h2.05zm1.62 7.9h-3.23L12 8.63z"
    ></path>
  </svg>
</template>

<script setup lang="ts">
import { getIconSize, type FillIconProps } from './utils'

defineProps<FillIconProps>()
</script>
