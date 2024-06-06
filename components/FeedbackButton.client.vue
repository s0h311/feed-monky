<template>
  <iframe
    ref="feedMonkyIframe"
    class="fixed left-0 top-0 -z-50 h-screen w-screen"
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
const site = (await useSite()).value!
const src = computed(() => `http://localhost:3000/api/template?siteId=${site.id}`)

const feedMonkyIframe = ref<HTMLIFrameElement>()

function openDialog(): void {
  const iframe = feedMonkyIframe.value

  if (!iframe || !iframe.contentWindow || !iframe.contentDocument) {
    return
  }

  iframe.style.zIndex = '10000'
  // @ts-expect-error
  iframe.contentWindow.openDialog()

  const interval = setInterval(() => {
    const dialog = iframe.contentDocument?.getElementsByTagName('dialog')[0]
    if (!dialog?.open) {
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
