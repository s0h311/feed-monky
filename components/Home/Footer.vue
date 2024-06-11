<template>
  <UIFooter
    :links-column1="otherProdcutsLinks"
    :links-column2="contactLinks"
    :links-column3="legalLinks"
    :attributions="attributions"
    :logo="HomeLogo"
    :logoProps="{ light: true }"
  >
    <div class="grid gap-10 tablet:flex">
      <ul
        v-if="attributions"
        class="flex flex-col gap-1 text-xs"
      >
        <p class="text-base-100">Attributions</p>

        <NuxtLink
          v-for="{ title, path } in attributions"
          :key="path"
          :to="path"
          target="_blank"
        >
          {{ title }}
        </NuxtLink>
      </ul>

      <a
        href="https://theresanaiforthat.com/ai/feed-monky/?ref=featured&v=1643174"
        target="_blank"
        rel="nofollow"
      >
        <NuxtImg
          class="w-2/3 max-w-[300px] tablet:w-[300px]"
          src="https://media.theresanaiforthat.com/featured-on-taaft.png?width=300"
          width="300"
          height="auto"
        />
      </a>
    </div>
  </UIFooter>
</template>

<script setup lang="ts">
import HomeLogo from './Logo.vue'

const otherProdcutsLinks = {
  title: 'Other products',
  links: [
    {
      title: 'DeineRechnung.com',
      path: 'https://deinerechnung.com',
    },
  ],
}

const contactLinks = {
  title: 'Contact',
  links: [
    {
      title: 'Help',
      path: '/contact',
    },
    {
      title: 'Feedback',
      path: '/contact',
    },
  ],
}

const legalLinks = {
  title: 'Legal',
  links: [
    {
      title: 'Imprint',
      path: '/legal/imprint',
    },
    {
      title: 'Privacy',
      path: '/legal/privacy',
    },
    {
      title: 'Terms',
      path: '/legal/terms',
    },
  ],
}

const attributions = [
  {
    title: 'Mammal icons created by Buandesign - Flaticon',
    path: 'https://www.flaticon.com/free-icons/mammal',
  },
  {
    title: 'User icons created by POD Gladiator - Flaticon',
    path: 'https://www.flaticon.com/free-icons/user',
  },
]
</script>
