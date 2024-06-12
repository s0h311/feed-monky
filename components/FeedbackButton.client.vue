<template>
  <button
    class="feed-monky-button"
    @click="openDialog"
  >
    Feedback
  </button>

  <dialog
    ref="feedMonkyDialog"
    class="feed-monky-dialog"
  >
    <div class="feed-monky-dialog-head">
      <h2 class="text-2xl">We value your feedback</h2>

      <button @click="closeDialog">
        <IconX />
      </button>
    </div>

    <form
      ref="feedMonkyForm"
      class="feed-monky-form"
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

<script setup lang="ts">
const feedMonkyDialog = ref<HTMLDialogElement>()
const feedMonkyForm = ref<HTMLFormElement>()

const site = (await useSite()).value!

function openDialog() {
  feedMonkyDialog.value?.showModal()
}

function closeDialog() {
  feedMonkyForm.value?.reset()
  feedMonkyDialog.value?.close()
}

async function onSubmit() {
  const formData = new FormData(feedMonkyForm.value)
  const customerEmail = formData.get('customerEmail')
  const feedbackText = formData.get('feedbackText')

  const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://feedmonky.com'

  const url = `${baseUrl}/api/feedback`

  const data = {
    siteId: site.id,
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
.feed-monky-dialog {
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
  }

  .feed-monky-form {
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

.feed-monky-button {
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

.feed-monky-button:hover {
  background-color: white;
  color: rgb(249 115 22);
  outline: 2px solid rgb(249 115 22);
}
</style>
