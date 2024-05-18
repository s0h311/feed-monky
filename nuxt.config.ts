// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/image', '@nuxt/eslint', '@nuxt/test-utils/module', '@nuxtjs/supabase'],
  app: {
    head: {
      title: 'FeedX.ai',
    },
  },
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ['~/app.css'],
  image: {
    format: ['webp', 'avif'],
  },
  supabase: {
    redirect: false,
  },
})
