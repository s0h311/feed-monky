<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="getIconSize($props)"
    :height="getIconSize($props)"
    viewBox="0 0 24 24"
  >
    <g
      fill="none"
      :class="strokeColor ?? 'stroke-current'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
    >
      <path d="M19.4 20H9.6a.6.6 0 0 1-.6-.6V9.6a.6.6 0 0 1 .6-.6h9.8a.6.6 0 0 1 .6.6v9.8a.6.6 0 0 1-.6.6"></path>
      <path d="M15 9V4.6a.6.6 0 0 0-.6-.6H4.6a.6.6 0 0 0-.6.6v9.8a.6.6 0 0 0 .6.6H9"></path>
    </g>
  </svg>
</template>

<script setup lang="ts">
import { getIconSize, type StrokeIconProps } from './utils'

defineProps<StrokeIconProps>()
</script>
