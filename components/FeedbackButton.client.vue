<template>
  <iframe
    ref="feedMonkyIframe"
    class="fixed left-0 top-0 -z-50 h-screen w-screen"
    src="http://localhost:3000/api/template?siteId=53e38ede-1ade-48c0-b364-746308355bf5"
  />

  <button
    id="feed-monky-button"
    @click="openDialog"
  >
    Feedback
  </button>
</template>

<script setup lang="ts">
const feedMonkyIframe = ref<HTMLIFrameElement>()

onMounted(() => {
  addEventListener('message', (event) => {
    if (event.origin === 'http://localhost:3000') {
      // hideIframe()
    }
  })
})

function openDialog(): void {
  const iframe = feedMonkyIframe.value

  if (!iframe || !iframe.contentWindow) {
    return
  }

  iframe.style.zIndex = '10000'
  iframe.contentWindow.postMessage('dialog.open', 'http://localhost:3000')
}

function hideIframe(): void {
  const iframe = feedMonkyIframe.value

  if (iframe) {
    iframe.style.zIndex = '-10000'
  }
}
</script>

<style scoped>
#feed-monky-button {
  position: fixed;
  right: 10%;
  bottom: 0;

  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  padding: 6px;
  background-color: rgb(249 115 22);
  color: white;
  font-weight: 600;
  border: none;
  cursor: pointer;
}

#feed-monky-button:hover {
  background-color: white;
  color: rgb(249 115 22);
  outline: 2px solid rgb(249 115 22);
}
</style>
