---
title: 'Embedding for vanilla'
---

::code-group

```html
<iframe
  id="feed-monky-iframe"
  src="http://localhost:3000/api/template?siteId=4dabc61f-4c0f-4c29-88ed-052731fcd0ed"
  style="position: fixed; top: 0; left: 0; width: 100dvw; height: 100dvh; z-index: -10000;"
></iframe>

<button
  id="feed-monky-button"
  onclick="showIframe()"
>
  Feedback
</button>
```

```JavaScript
addEventListener('message', (event) => {
  if (event.origin === 'https://feedmonky.com') {
    hideIframe()
  }
})

function showIframe() {
  /**
   * @type {HTMLIFrameElement}
   */
  const iframe = document.getElementById('feed-monky-iframe')

  iframe.style.zIndex = '10000'

  iframe.contentWindow.postMessage('dialog.open', 'https://feedmonky.com')
}

function hideIframe() {
  /**
   * @type {HTMLIFrameElement}
   */
  const iframe = document.getElementById('feed-monky-iframe')

  iframe.style.zIndex = '-10000'
}
```

```css
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
```

::
