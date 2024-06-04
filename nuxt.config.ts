export default defineNuxtConfig({
  modules: ['@nuxt/image', '@nuxt/eslint', '@nuxt/test-utils/module', '@nuxtjs/supabase', '@nuxt/content'],
  app: {
    head: {
      title: 'Feed Monky',
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
  nitro: {
    storage: {
      templates: {
        driver: 'fs',
        base: 'templates/',
      },
    },
  },
})
