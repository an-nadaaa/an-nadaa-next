// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: ['@nuxtjs/i18n', '@nuxtjs/tailwindcss', '@nuxtjs/strapi', '@nuxt/content'],
  components: {
    dirs: [
      {
        path: '~/components',
        pathPrefix: false,
      },
    ],
  },
  runtimeConfig: {
    functionBaseUrl:
      process.env.NODE_ENV === 'production'
        ? `${process.env.BASE_URL}/.netlify/functions`
        : 'http://localhost:8888/.netlify/functions',
    STRIPE_PK_DEV: process.env.STRIPE_PK_DEV,
    STRIPE_PK_PROD: process.env.STRIPE_PK_PROD,
    public: {
      lang: 'en-US',
      STRAPI_API: process.env.STRAPI_API,
      STRAPI_API_KEY: process.env.STRAPI_API_KEY,
    },
  },
  // https://strapi.nuxtjs.org/setup#options
  // strapi: {
  //   // Options
  // }
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.js', dir: 'ltr', name: 'English' },
      { code: 'ar', iso: 'ar-SA', file: 'ar.js', dir: 'rtl', name: 'العربية' },
      {
        code: 'ms',
        iso: 'ms-MY',
        file: 'ms.js',
        dir: 'ltr',
        name: 'Bahasa Malayu',
      },
      // we use the NG postfix because sw is ignored in git ignore for being a convention for service workers
      { code: 'sw', iso: 'sw', file: 'sw-NG.js', dir: 'ltr', name: 'Swahili' },
    ],
    defaultLocale: 'en',
    defaultDirection: 'ltr',
    lazy: true,
    strategy: 'prefix_except_default',
    langDir: 'translations/',
    baseUrl: process.env.NODE_ENV === 'production' ? process.env.BASE_URL : 'http://localhost:8888',
  },
})
