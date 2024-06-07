<template>
  <UISupports
    title="Use your favorite framework"
    :items="frameworks"
  />
</template>

<script setup lang="ts">
const frameworks = [
  { icon: 'js-logo.png', name: 'Vanilla JS' },
  { icon: 'vue-logo.png', name: 'Vue' },
  { icon: 'react-logo.png', name: 'React' },
  { icon: 'angular-logo.png', name: 'Angular' },
]
</script>
