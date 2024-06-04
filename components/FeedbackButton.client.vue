<template>
  <iframe
    class="fixed left-0 top-0 -z-50 h-screen w-screen"
    ref="feedMonkyIframe"
    :src
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

const protocol = window.location.protocol
const host = window.location.host

const src = computed(() => `${protocol}//${host}/api/template?siteId=4dabc61f-4c0f-4c29-88ed-052731fcd0ed`)

function openDialog(): void {
  const iframe = feedMonkyIframe.value

  if (!iframe || !iframe.contentDocument) {
    return
  }

  iframe.style.zIndex = '10000'

  // @ts-expect-error
  iframe.contentWindow?.openDialog()

  const dialog = iframe.contentDocument.getElementById('feed-monky-dialog') as HTMLDialogElement

  const interval = setInterval(() => {
    if (!dialog.open) {
      iframe.style.zIndex = '-10000'

      clearInterval(interval)
    }
  }, 300)
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
