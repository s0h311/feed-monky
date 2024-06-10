export default defineNuxtConfig({
  modules: [
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
    '@nuxtjs/supabase',
    '@nuxt/content',
    '@nuxtjs/sitemap',
  ],
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
  content: {
    highlight: {
      theme: 'github-dark-default',
    },
  },
  site: {
    url: 'https://feedmonky.com',
  },
})
