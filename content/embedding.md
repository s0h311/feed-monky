---
title: 'Embeddings'
---

::code-group

```html
<style>
  #feed-monky-dialog {
    position: relative;
    border: none;
    border-radius: 8px;
    padding: 40px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;

    button {
      border: none;
      background: none;
      cursor: pointer;
    }

    .feed-monky-dialog-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 40px;

      h2 {
        margin-block: 0;
      }
    }

    form {
      display: grid;
      gap: 20px;
      font-size: 14px;
      margin-bottom: 20px;

      label {
        margin-bottom: -15px;
      }

      input {
        border-radius: 8px;
        border: 1.5px solid black;
        outline: none;
        padding: 12px 16px;
        width: fit-content;
        color: #3f3f46;
      }

      textarea {
        border-radius: 8px;
        border: 1.5px solid black;
        outline: none;
        padding: 12px 16px;
        min-width: 400px;
        color: #3f3f46;
      }

      @media (max-width: 500px) {
        textarea {
          min-width: unset;
        }
      }

      button {
        justify-self: center;
        border-radius: 8px;
        padding: 8px 12px;
        width: 40%;
        background-color: #22c55e;
      }

      button:hover {
        background-color: white;
        color: #22c55e;
        outline: 2px solid #22c55e;
      }
    }

    .feedmonky-link {
      font-size: 10px;
      position: absolute;
      right: 40px;
    }
  }

  @media (max-width: 500px) {
    #feed-monky-dialog {
      margin-inline: 20px;
    }
  }

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

<script>
  function openDialog() {
    const dialog = document.getElementById('feed-monky-dialog')

    dialog.showModal()
  }

  function closeDialog() {
    const dialog = document.getElementById('feed-monky-dialog')
    const form = document.getElementById('feed-monky-form')

    form.reset()
    dialog.close()
  }

  async function onSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const customerEmail = formData.get('customerEmail')
    const feedbackText = formData.get('feedbackText')

    const url = 'https://feedmonky.com/api/feedback'

    const data = {
      siteId: '--SITEID--',
      feedbackText,
    }

    if (customerEmail) {
      data.customerEmail = customerEmail
    }

    await fetch(url, {
      method: 'post',
      body: JSON.stringify(data),
    })

    closeDialog()
  }
</script>

<button
  id="feed-monky-button"
  onclick="openDialog()"
>
  Feedback
</button>

<dialog id="feed-monky-dialog">
  <div class="feed-monky-dialog-head">
    <h2>We value your feedback</h2>

    <button onclick="closeDialog()">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
        />
      </svg>
    </button>
  </div>

  <form
    id="feed-monky-form"
    onsubmit="return onSubmit(event)"
  >
    <label for="customerEmail">
      E-Mail
      <small>(optional, only if you want to hear back from us)</small>
    </label>

    <input
      id="customerEmail"
      name="customerEmail"
      type="email"
      placeholder="john@doe.com"
      autofocus
    />

    <label for="feedbackText"> What should we improve? <small>(max 200 characters)</small> </label>

    <textarea
      id="feedbackText"
      name="feedbackText"
      placeholder="Please tell us what you think"
      rows="5"
      minlength="10"
      maxlength="200"
    ></textarea>

    <button>Submit</button>
  </form>

  <a
    class="feedmonky-link"
    href="http://feedmonky.com"
    target="_blank"
  >
    Powered by FeedMonky
  </a>
</dialog>
```

```vue
<template>
  <button
    id="feed-monky-button"
    @click="openDialog"
  >
    Feedback
  </button>

  <dialog
    ref="feedMonkyDialog"
    id="feed-monky-dialog"
  >
    <div class="feed-monky-dialog-head">
      <h2>We value your feedback</h2>

      <button @click="closeDialog">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
          />
        </svg>
      </button>
    </div>

    <form
      ref="feedMonkyForm"
      id="feed-monky-form"
      @submit.prevent="onSubmit"
    >
      <label for="customerEmail">
        E-Mail
        <small>(optional, only if you want to hear back from us)</small>
      </label>

      <input
        id="customerEmail"
        name="customerEmail"
        type="email"
        placeholder="john@doe.com"
        autofocus
      />

      <label for="feedbackText"> What should we improve? <small>(max 200 characters)</small> </label>

      <textarea
        id="feedbackText"
        name="feedbackText"
        placeholder="Please tell us what you think"
        rows="5"
        minlength="10"
        maxlength="200"
      ></textarea>

      <button>Submit</button>
    </form>

    <a
      class="feedmonky-link"
      href="http://feedmonky.com"
      target="_blank"
    >
      Powered by FeedMonky
    </a>
  </dialog>
</template>

<script setup>
import { ref } from 'vue'

const feedMonkyDialog = ref()
const feedMonkyForm = ref()

function openDialog() {
  feedMonkyDialog.value.showModal()
}

function closeDialog() {
  feedMonkyForm.value.reset()
  feedMonkyDialog.value.close()
}

async function onSubmit(event) {
  const formData = new FormData(event.target)
  const customerEmail = formData.get('customerEmail')
  const feedbackText = formData.get('feedbackText')

  const url = 'https://feedmonky.com/api/feedback'

  const data = {
    siteId: '--SITEID--',
    feedbackText,
  }

  if (customerEmail) {
    data.customerEmail = customerEmail
  }

  await fetch(url, {
    method: 'post',
    body: JSON.stringify(data),
  })

  closeDialog()
}
</script>

<style scoped>
#feed-monky-dialog {
  position: relative;
  border: none;
  border-radius: 8px;
  padding: 40px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;

  button {
    border: none;
    background: none;
    cursor: pointer;
  }

  .feed-monky-dialog-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;

    h2 {
      margin-block: 0;
    }
  }

  form {
    display: grid;
    gap: 20px;
    font-size: 14px;
    margin-bottom: 20px;

    label {
      margin-bottom: -15px;
    }

    input {
      border-radius: 8px;
      border: 1.5px solid black;
      outline: none;
      padding: 12px 16px;
      width: fit-content;
      color: #3f3f46;
    }

    textarea {
      border-radius: 8px;
      border: 1.5px solid black;
      outline: none;
      padding: 12px 16px;
      min-width: 400px;
      color: #3f3f46;
    }

    @media (max-width: 500px) {
      textarea {
        min-width: unset;
      }
    }

    button {
      justify-self: center;
      border-radius: 8px;
      padding: 8px 12px;
      width: 40%;
      background-color: #22c55e;
    }

    button:hover {
      background-color: white;
      color: #22c55e;
      outline: 2px solid #22c55e;
    }
  }

  .feedmonky-link {
    font-size: 10px;
    position: absolute;
    right: 40px;
  }
}

@media (max-width: 500px) {
  #feed-monky-dialog {
    margin-inline: 20px;
  }
}

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

import { useRef } from 'react'
import React from 'react'
import './FeedMonky.css' // TODO use the styles from vanilla code or use own

export default function FeedMonky() {
  const feedMonkyDialog = useRef(null)
  const feedMonkyForm = useRef(null)

  function openDialog() {
    feedMonkyDialog.current.showModal()
  }

  function closeDialog() {
    feedMonkyForm.current.reset()
    feedMonkyDialog.current.close()
  }

  async function onSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const customerEmail = formData.get('customerEmail')
    const feedbackText = formData.get('feedbackText')

    const url = 'https://feedmonky.com/api/feedback'

    const data = {
      siteId: '--SITEID--',
      feedbackText,
    }

    if (customerEmail) {
      data.customerEmail = customerEmail
    }

    await fetch(url, {
      method: 'post',
      body: JSON.stringify(data),
    })

    closeDialog()
  }

  return (
    <>
      <button
        id="feed-monky-button"
        onClick={openDialog}
      >
        Feedback
      </button>

      <dialog
        id="feed-monky-dialog"
        ref={feedMonkyDialog}
      >
        <div className="feed-monky-dialog-head">
          <h2>We value your feedback</h2>

          <button onClick={closeDialog}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
              />
            </svg>
          </button>
        </div>

        <form
          id="feed-monky-form"
          ref={feedMonkyForm}
          onSubmit={onSubmit}
        >
          <label htmlFor="customerEmail">
            E-Mail
            <small>(optional, only if you want to hear back from us)</small>
          </label>

          <input
            id="customerEmail"
            name="customerEmail"
            type="email"
            placeholder="john@doe.com"
            autoFocus
          />

          <label htmlFor="feedbackText">
            What should we improve? <small>(max 200 characters)</small>
          </label>

          <textarea
            id="feedbackText"
            name="feedbackText"
            placeholder="Please tell us what you think"
            rows={5}
            minLength={10}
            maxLength={200}
          ></textarea>

          <button>Submit</button>
        </form>

        <a
          className="feedmonky-link"
          href="http://feedmonky.com"
          target="_blank"
        >
          Powered by FeedMonky
        </a>
      </dialog>
    </>
  )
}
```

::
