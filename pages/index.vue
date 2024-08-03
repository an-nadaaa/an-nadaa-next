<template>
  <main>
    <!-- <HeroSection /> -->
    <LogoCloud />
    <HomeStorySection />
    <MetricsSection :metrics="metrics" />
    <ClientOnly>
      <FeaturedCampaigns :featured-causes="featuredCauses" />
      <CampaignsSection :causes="causes" />
    </ClientOnly>
    <DonateSection />
    <TestimonialsSection :testimonials="testimonials" />
    <FAQSection :faqs="faqs" />
  </main>
</template>

<script setup lang="ts">
import qs from 'qs'

const STRAPI_API =
  process.env.NODE_ENV === 'production' ? useRuntimeConfig().public.STRAPI_API : 'http://localhost:5000/api'
// const STRAPI_API = 'https://api.an-nadaa.com/api'
const sortBy = {
  key: 'date',
  direction: 'dec',
}
const { locale } = useI18n()

const FEATURED_COUNT = 3
const CAMPAIGN_COUNT = 6

const causeQuery = qs.stringify(
  {
    populate: {
      dynamicZone: {
        populate: '*',
      },
      cover: {
        fields: ['url'],
      },
      tags: {
        fields: ['value'],
      },
      category: {
        fields: ['value'],
      },
    },
    filters: {
      featured: {
        $eq: false,
      },
      private: {
        $eq: false,
      },
      environment: {
        $eq: process.env.NODE_ENV,
      },
    },
    sort: ['createdAt:desc'],
    pagination: {
      start: 0,
      limit: CAMPAIGN_COUNT,
    },
  },
  {
    encodeValuesOnly: true,
  },
)

const featuredQuery = qs.stringify(
  {
    populate: {
      dynamicZone: {
        populate: '*',
      },
      cover: {
        fields: ['url'],
      },
      tags: {
        fields: ['value'],
      },
      category: {
        fields: ['value'],
      },
    },
    filters: {
      featured: {
        $eq: true,
      },
      private: {
        $eq: false,
      },
      environment: {
        $eq: process.env.NODE_ENV,
      },
    },
    sort: ['createdAt:desc'],
    pagination: {
      start: 0,
      limit: FEATURED_COUNT,
    },
  },
  {
    encodeValuesOnly: true,
  },
)
const { data: causes } = await useAsyncData('causes', async () =>
  fetch(`${STRAPI_API}/causes?locale=${locale.value}&${causeQuery}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${useRuntimeConfig().public.STRAPI_API_KEY}`,
    },
  }).then(async (res) => {
    if (res.ok) {
      const response = await res.json()

      console.log('Featured Causes: ', response)

      return response.data
    }
  }),
)

const { data: featuredCauses } = await useAsyncData('featured-causes', () =>
  fetch(`${STRAPI_API}/causes?locale=${locale.value}&${featuredQuery}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${useRuntimeConfig().public.STRAPI_API_KEY}`,
    },
  }).then(async (res) => {
    if (res.ok) {
      const response = await res.json()

      console.log('Featured Causes: ', response)

      return response.data
    }
  }),
)

//   queryContent('faq', useI18n().locale as unknown as string)
//     .sort({ [sortBy.key]: sortBy.direction })
//     .find()
//     .then((data) => {
//       faqs.value = data
//     })

// function capitalizeFirstLetter(string: string) {
//   if (typeof string !== 'string' || string.length === 0) {
//     return string
//   }
//   return string.charAt(0).toUpperCase() + string.slice(1)
// }

// await useAsyncData('metrics', async () =>
//   queryContent('metrics', `En`)
//     .sort({ [sortBy.key]: sortBy.direction })
//     .find()
//     .then((data) => {
//       // console.log('Content data: ', data)

//       // datum.value = data
//       // datum.value = data.toString()

//       metrics.value = data
//       // metrics.value = [...metrics.value, 'hello']
//     }),
// )

// const { data: metrics } = await useAsyncData('metrics', async () =>
//   queryContent('metrics', useI18n().locale as unknown as string)
//     .sort({ [sortBy.key]: sortBy.direction })
//     .find()
//     .then((data) => {
//       // metrics.value = data

//       console.log('Content data: ', data)
//       return data
//     }),
// )

const { data: metrics } = await useAsyncData('metrics', async () => {
  try {
    return await queryContent('metrics', locale.value)
      .sort({ [sortBy.key]: sortBy.direction })
      .find()
  } catch (err) {
    throw createError({ statusCode: 404, message: 'No Metrics to display' })
  }
})

const { data: testimonials } = await useAsyncData('testimonials', async () => {
  try {
    return await queryContent('testimonials', locale.value)
      .sort({ [sortBy.key]: sortBy.direction })
      .find()
  } catch (err) {
    throw createError({ statusCode: 404, message: 'No Testimonials to display' })
  }
})

const { data: faqs } = await useAsyncData('faqs', async () => {
  try {
    return await queryContent('faq', locale.value)
      .sort({ [sortBy.key]: sortBy.direction })
      .find()
  } catch (err) {
    throw createError({ statusCode: 404, message: 'No FAQs to display' })
  }
})

// const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())

//   queryContent('testimonials', useI18n().locale as unknown as string)
//     .sort({ [sortBy.key]: sortBy.direction })
//     .find()
//     .then((data) => {
//       testimonials.value = data
//     })
// })

// export default
// onMounted(() => {
//   // this.$segment.page('Home')
// })
</script>

<style></style>
<!-- 
// export {

  // async asyncData({ $axios, $content, error, app }) {

    // causes = await $axios
    //   .$get(`${STRAPI_API}/causes?locale=${app.i18n.locale}&${causeQuery}`, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
    //     },
    //   })
    //   .then(({ data }) => data)
    //   .catch((err) => {
    //     error({
    //       statusCode: 404,
    //       message: FEATURED_COUNT > 1 ? 'No Featured Campaigns to display' : 'Campaign not found',
    //     })
    //   })
    // featuredCauses = await $axios
    //   .$get(`${STRAPI_API}/causes?locale=${app.i18n.locale}&${featuredQuery}`, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
    //     },
    //   })
    //   .then(({ data }) => data)
    //   .catch((err) => {
    //     error({
    //       statusCode: 404,
    //       message: FEATURED_COUNT > 1 ? 'No Campaigns to display' : 'Campaign not found',
    //     })
    //   })
    // faqs = await $content('faq', app.i18n.locale)
    //   .sortBy(sortBy.key, sortBy.direction)
    //   .fetch()
    //   .catch((err) => {
    //     error({ statusCode: 404, message: 'No FAQs to display' })
    //   })
    // metrics = await $content('metrics', app.i18n.locale)
    //   .sortBy(sortBy.key, sortBy.direction)
    //   .fetch()
    //   .catch((err) => {
    //     error({ statusCode: 404, message: 'No Metrics to display' })
    //   })
  //   testimonials = await $content('testimonials', app.i18n.locale)
  //     .sortBy(sortBy.key, sortBy.direction)
  //     .fetch()
  //     .catch((err) => {
  //       error({ statusCode: 404, message: 'No Testimonials to display' })
  //     })
  //   return { causes, featuredCauses, faqs, metrics, testimonials }
  // },
// }
// </script> -->
