<template>
  <UIFooter
    :links-column1="otherProdcutsLinks"
    :links-column2="contactLinks"
    :links-column3="legalLinks"
    :attributions="attributions"
  >
    <HomeLogo light />
  </UIFooter>
</template>

<script setup lang="ts">
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
      path: '/help',
    },
    {
      title: 'Feedback',
      path: '/feedback',
    },
  ],
}

const legalLinks = {
  title: 'Legal',
  links: [
    {
      title: 'Imprint',
      path: '/imprint',
    },
    {
      title: 'Privacy policy',
      path: '/privacyPolicy',
    },
    {
      title: 'Terms',
      path: '/terms',
    },
  ],
}

const attributions = [
  {
    title: 'Mammal icons created by Buandesign - Flaticon',
    path: 'https://www.flaticon.com/free-icons/mammal',
  },
]
</script>
