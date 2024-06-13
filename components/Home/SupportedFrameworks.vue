<template>
  <UISupports
    title="Use your favorite language or framework"
    text="Embed it into your website <br /> in under 5 minutes."
    :items="frameworks"
  />
</template>

<script setup lang="ts">
const frameworks = [
  { icon: 'js-logo.png', name: 'Vanilla JS' },
  { icon: 'vue-logo.png', name: 'Vue' },
  { icon: 'react-logo.png', name: 'React' },
  { icon: 'angular-logo.png', name: 'Angular' },
  { icon: 'php-logo.png', name: 'PHP' },
]
</script>
