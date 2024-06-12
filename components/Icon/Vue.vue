<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="getIconSize($props)"
    :height="getIconSize($props)"
    viewBox="0 0 24 24"
  >
    <path
      :class="fillColor ?? 'fill-current'"
      d="M2 3h3.5L12 15l6.5-12H22L12 21zm4.5 0h3L12 7.58L14.5 3h3L12 13.08z"
    ></path>
  </svg>
</template>

<script setup lang="ts">
import { getIconSize, type FillIconProps } from './utils'

defineProps<FillIconProps>()
</script>
