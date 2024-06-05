---
title: 'Embeddings'
---

::code-group

```html
<iframe
  id="feed-monky-iframe"
  src="https://feedmonky.com/api/template?siteId=--SITEID--"
  style="position: fixed; top: 0; left: 0; width: 100dvw; height: 100dvh; z-index: -10000;"
></iframe>

<!-- You can customize this button, see the css -->
<button
  id="feed-monky-button"
  onclick="showIframe()"
>
  Feedback
</button>

<script>
  addEventListener('message', (event) => {
    if (event.origin === 'https://feedmonky.com') {
      hideIframe()
    }
  })

  function showIframe() {
    const iframe = document.getElementById('feed-monky-iframe')

    iframe.style.zIndex = '10000'

    iframe.contentWindow.postMessage('dialog.open', 'https://feedmonky.com')
  }

  function hideIframe() {
    const iframe = document.getElementById('feed-monky-iframe')

    iframe.style.zIndex = '-10000'
  }
</script>

<style>
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
```

```vue
<template>
  <iframe
    ref="feedMonkyIframe"
    style="position: fixed; top: 0; left: 0; width: 100dvw; height: 100dvh; z-index: -10000;"
    src="https://feedmonky.com/api/template?siteId=--SITEID--"
  />

  <button
    id="feed-monky-button"
    @click="openDialog"
  >
    Feedback
  </button>
</template>

<script setup>
const feedMonkyIframe = ref()

onMounted(() => {
  addEventListener('message', (event) => {
    if (event.origin === 'https://feedmonky.com') {
      hideIframe()
    }
  })
})

function openDialog() {
  const iframe = feedMonkyIframe.value

  if (!iframe || !iframe.contentWindow) {
    return
  }

  iframe.style.zIndex = '10000'
  iframe.contentWindow.postMessage('dialog.open', 'https://feedmonky.com')
}

function hideIframe() {
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
```

```jsx
'use client'

import { useEffect, useRef } from 'react'

export default function FeedbackButton() {
  useEffect(() => {
    addEventListener('message', (event) => {
      if (event.origin === 'http://localhost:3000') {
        hideIframe()
      }
    })
  }, [hideIframe])

  const feedMonkyIframe = useRef(null)

  function openDialog() {
    const iframe = feedMonkyIframe.current

    if (!iframe || !iframe.contentWindow) {
      return
    }

    iframe.style.zIndex = '10000'
    iframe.contentWindow.postMessage('dialog.open', 'http://localhost:3000')
  }

  function hideIframe() {
    const iframe = feedMonkyIframe.current

    if (iframe) {
      iframe.style.zIndex = '-10000'
    }
  }
  return (
    <>
      <iframe
        ref={feedMonkyIframe}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100dvw',
          height: '100dvh',
          zIndex: -10000,
        }}
        src="https://feedmonky.com/api/template?siteId=--SITEID--"
      />
      <button
        style={
          {
            // TODO style this however you want, see plan JS or vue for a reference
          }
        }
        onClick={openDialog}
      >
        Feedback
      </button>
    </>
  )
}
```

::
