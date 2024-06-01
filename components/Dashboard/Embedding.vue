<template>
  <h1 class="mb-10 text-xl">Embedding</h1>

  <div class="relative max-w-2xl rounded-lg bg-[#2d2d2d] px-5 py-4">
    <button
      class="absolute right-3 top-3 rounded-full p-0.5 hover:animate-pulse"
      @click="copyCode"
    >
      <IconCopy stroke-color="stroke-white" />
    </button>

    <code
      class="language-html m-0 !border-none p-0 !shadow-none"
      v-html="prism.highlight(code, prism.languages.html, 'html')"
    />
  </div>
</template>

<script setup lang="ts">
import prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.min.css'

const site = (await useSite()).value!
const toast = useToaster()

const iframeSrc = computed(() => {
  if (typeof window === 'undefined') return ''

  const protocol = window.location.protocol
  const host = window.location.host

  return `${protocol}//${host}/api/template?siteId=${site.id}`
})
const code = computed(() => {
  return (
    '<iframe' +
    ' src="' +
    iframeSrc.value +
    '" ' +
    'style="position: absolute; right: 0; bottom: 0; width: 100dvw; height: 100dvh">' +
    '</iframe>'
  )
})

function copyCode(): void {
  navigator.clipboard.writeText(code.value)
  toast.success('Copied successfully')
}
</script>
