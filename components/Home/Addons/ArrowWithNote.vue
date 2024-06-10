<template>
  <div
    ref="arrowWithNoteDiv"
    class="absolute -z-10 flex items-center gap-5"
  >
    <p class="self-end">No credit card needed</p>

    <NuxtImg
      class="rotate-12"
      src="arrow.png"
      width="100"
      height="auto"
    />
  </div>
</template>

<script setup lang="ts">
onMounted(initPosition)

const arrowWithNoteDiv = ref<HTMLDivElement>()

function initPosition(): void {
  console.log('INIT')
  const arrowWithNote = arrowWithNoteDiv.value

  if (!arrowWithNote) {
    console.log('HIT1')
    return
  }

  const target = document.getElementById('hero-cta')

  if (!target) {
    console.log('HIT2')
    return
  }

  const targetLeft = target.offsetLeft
  const targetBottom = target.offsetTop

  console.log('targetLeft', targetLeft)

  arrowWithNote.style.left = targetLeft + 'px'
  arrowWithNote.style.bottom = targetBottom + 'px'
}
</script>
