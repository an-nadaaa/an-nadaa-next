// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  components: {
    dirs: [
      {
        path: "~/components",
        pathPrefix: false,
      },
    ],
  },
  modules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
    functionBaseUrl:
      process.env.NODE_ENV === "production"
        ? `${process.env.BASE_URL}/.netlify/functions`
        : "http://localhost:8888/.netlify/functions",
    STRIPE_PK_DEV: process.env.STRIPE_PK_DEV,
    STRIPE_PK_PROD: process.env.STRIPE_PK_PROD,
    public: {
      lang: "en-US",
      STRAPI_API: process.env.STRAPI_API,
      STRAPI_API_KEY: process.env.STRAPI_API_KEY,
    },
  },
});
