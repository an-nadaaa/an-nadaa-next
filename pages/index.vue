<template>
  <!-- <main>
    <HeroSection />
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
  </main> -->
</template>

<script setup lang="ts">
// import qs from 'qs'

// const STRAPI_API = process.env.NODE_ENV === 'production' ? process.env.STRAPI_API : 'http://localhost:5000/api'
// const sortBy = {
//   key: 'date',
//   direction: 'dec',
// }

// const FEATURED_COUNT = 3
// const CAMPAIGN_COUNT = 6
// const causes = ref<any[]>([])
// const featuredCauses = ref<any[]>([])
// const faqs = ref<any[]>([])
// const metrics = ref<any[]>([])
// const testimonials = ref<any[]>([])

// const causeQuery = qs.stringify(
//   {
//     populate: {
//       dynamicZone: {
//         populate: '*',
//       },
//       cover: {
//         fields: ['url'],
//       },
//       tags: {
//         fields: ['value'],
//       },
//       category: {
//         fields: ['value'],
//       },
//     },
//     filters: {
//       featured: {
//         $eq: false,
//       },
//       private: {
//         $eq: false,
//       },
//       environment: {
//         $eq: process.env.NODE_ENV,
//       },
//     },
//     sort: ['createdAt:desc'],
//     pagination: {
//       start: 0,
//       limit: CAMPAIGN_COUNT,
//     },
//   },
//   {
//     encodeValuesOnly: true,
//   }
// )

// const featuredQuery = qs.stringify(
//   {
//     populate: {
//       dynamicZone: {
//         populate: '*',
//       },
//       cover: {
//         fields: ['url'],
//       },
//       tags: {
//         fields: ['value'],
//       },
//       category: {
//         fields: ['value'],
//       },
//     },
//     filters: {
//       featured: {
//         $eq: true,
//       },
//       private: {
//         $eq: false,
//       },
//       environment: {
//         $eq: process.env.NODE_ENV,
//       },
//     },
//     sort: ['createdAt:desc'],
//     pagination: {
//       start: 0,
//       limit: FEATURED_COUNT,
//     },
//   },
//   {
//     encodeValuesOnly: true,
//   }
// )
// const _ = await useAsyncData('mountains', async () => {
//   fetch(`${STRAPI_API}/causes?locale=${useI18n().locale}&${causeQuery}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
//     },
//   }).then(async (res) => {
//     if (res.ok) {
//       causes.value = (await res.json()).data
//     }
//   })

//   fetch(`${STRAPI_API}/causes?locale=${useI18n().locale}&${featuredQuery}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
//     },
//   }).then(async (res) => {
//     if (res.ok) {
//       featuredCauses.value = (await res.json()).data
//     }
//   })

//   queryContent('faq', useI18n().locale as unknown as string)
//     .sort({ [sortBy.key]: sortBy.direction })
//     .find()
//     .then((data) => {
//       faqs.value = data
//     })

//   queryContent('metrics', useI18n().locale as unknown as string)
//     .sort({ [sortBy.key]: sortBy.direction })
//     .find()
//     .then((data) => {
//       metrics.value = data
//     })

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
