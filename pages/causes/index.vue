<template>
  <CausesLayout :tags="tags" :categories="categories" :initialCauses="causes" :initialPaginationData="pagination" />
</template>

<script setup lang="ts">
import qs from 'qs'

const route = useRoute()
const STRAPI_API = process.env.NODE_ENV === 'production' ? process.env.STRAPI_API : 'http://localhost:5000/api'

onMounted(() => {
  // this.$segment.page('Causes')
})

useHead({
  title: 'Campaigns | An-Nadaa educational foundation',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content:
        'Donate to change the lives of millions of underprivilged muslims in Nigeria, by supporting educational and welfare projects of An-Nadaa',
    },
  ],
})

const tags = ref<any[]>([])
const categories = ref<any[]>([])
const causes = ref<any[]>([])
const pagination = ref<any>({})
const PAGINATION_SIZE = 12

const _ = await useAsyncData('', async () => {
  fetch(`${STRAPI_API}/tags?locale=${useI18n().locale}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
    },
  })
    .then(async (res) => {
      if (res.ok) {
        tags.value = (await res.json()).data
      }
    })
    .catch((err) => {
      console.error({
        statusCode: 404,
        message: 'Error fetching Tags',
      })
    })

  fetch(`${STRAPI_API}/natures?locale=${useI18n().locale}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
    },
  }).then(async (res) => {
    if (res.ok) {
      categories.value = (await res.json()).data
    }
  })

  let causesQuery = ''
  switch (route.query.s) {
    case 'c':
      // query campaigns
      causesQuery = qs.stringify(
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
            environment: {
              $eq: process.env.NODE_ENV,
            },
            private: {
              $eq: false,
            },
            // dynamicZone: {
            //   __component: {
            //     $eq: 'causes.campaign',
            //   },
            // },
          },
          sort: ['featured:desc', 'createdAt:desc'],
          pagination: {
            page: 1,
            pageSize: PAGINATION_SIZE,
            withCount: true,
          },
        },
        {
          encodeValuesOnly: true,
        }
      )
      break
    case 'p':
      // query projects
      causesQuery = qs.stringify(
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
            environment: {
              $eq: process.env.NODE_ENV,
            },
            private: {
              $eq: false,
            },
            // dynamicZone: {
            //   __component: {
            //     $eq: 'causes.project',
            //   },
            // },
          },
          sort: ['featured:desc', 'createdAt:desc'],
          pagination: {
            page: 1,
            pageSize: PAGINATION_SIZE,
            withCount: true,
          },
        },
        {
          encodeValuesOnly: true,
        }
      )
      break
    default:
      // query all
      causesQuery = qs.stringify(
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
            environment: {
              $eq: process.env.NODE_ENV,
            },
            private: {
              $eq: false,
            },
          },
          sort: ['featured:desc', 'createdAt:desc'],
          pagination: {
            page: 1,
            pageSize: PAGINATION_SIZE,
            withCount: true,
          },
        },
        {
          encodeValuesOnly: true,
        }
      )
      break
  }

  fetch(`${STRAPI_API}/causes?locale=${useI18n().locale}&${causesQuery}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
    },
  })
    .then(async (res) => {
      const { data, meta } = await res.json()

      causes.value = data
      pagination.value = meta.pagination
      // causes = data
      // pagination = meta.pagination
    })
    .catch((err) => {
      console.error({
        statusCode: 404,
        message: 'No causes found',
      })
    })
})

// export default {
//   layout: "cause",
//   async asyncData({ $axios, error, app, query }) {
//     const STRAPI_API =
//       process.env.NODE_ENV === "production"
//         ? process.env.STRAPI_API
//         : "http://localhost:5000/api"
//     const PAGINATION_SIZE = 12

//     const tags = await $axios
//       .$get(`${STRAPI_API}/tags?locale=${app.i18n.locale}`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
//         },
//       })
//       .then(({ data }) => data)
//       .catch((err) => {
//         error({
//           statusCode: 404,
//           message: "Error fetching Tags",
//         })
//       })

//     const categories = await $axios
//       .$get(`${STRAPI_API}/natures?locale=${app.i18n.locale}`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
//         },
//       })
//       .then(({ data }) => data)
//       .catch((err) => {
//         error({
//           statusCode: 404,
//           message: "Error fetching Categories",
//         })
//       })
//     let causesQuery = ""
//     switch (query.s) {
//       case "c":
//         // query campaigns
//         causesQuery = qs.stringify(
//           {
//             populate: {
//               dynamicZone: {
//                 populate: "*",
//               },
//               cover: {
//                 fields: ["url"],
//               },
//               tags: {
//                 fields: ["value"],
//               },
//               category: {
//                 fields: ["value"],
//               },
//             },
//             filters: {
//               environment: {
//                 $eq: process.env.NODE_ENV,
//               },
//               private: {
//                 $eq: false,
//               },
//               // dynamicZone: {
//               //   __component: {
//               //     $eq: 'causes.campaign',
//               //   },
//               // },
//             },
//             sort: ["featured:desc", "createdAt:desc"],
//             pagination: {
//               page: 1,
//               pageSize: PAGINATION_SIZE,
//               withCount: true,
//             },
//           },
//           {
//             encodeValuesOnly: true,
//           }
//         )
//         break
//       case "p":
//         // query projects
//         causesQuery = qs.stringify(
//           {
//             populate: {
//               dynamicZone: {
//                 populate: "*",
//               },
//               cover: {
//                 fields: ["url"],
//               },
//               tags: {
//                 fields: ["value"],
//               },
//               category: {
//                 fields: ["value"],
//               },
//             },
//             filters: {
//               environment: {
//                 $eq: process.env.NODE_ENV,
//               },
//               private: {
//                 $eq: false,
//               },
//               // dynamicZone: {
//               //   __component: {
//               //     $eq: 'causes.project',
//               //   },
//               // },
//             },
//             sort: ["featured:desc", "createdAt:desc"],
//             pagination: {
//               page: 1,
//               pageSize: PAGINATION_SIZE,
//               withCount: true,
//             },
//           },
//           {
//             encodeValuesOnly: true,
//           }
//         )
//         break
//       default:
//         // query all
//         causesQuery = qs.stringify(
//           {
//             populate: {
//               dynamicZone: {
//                 populate: "*",
//               },
//               cover: {
//                 fields: ["url"],
//               },
//               tags: {
//                 fields: ["value"],
//               },
//               category: {
//                 fields: ["value"],
//               },
//             },
//             filters: {
//               environment: {
//                 $eq: process.env.NODE_ENV,
//               },
//               private: {
//                 $eq: false,
//               },
//             },
//             sort: ["featured:desc", "createdAt:desc"],
//             pagination: {
//               page: 1,
//               pageSize: PAGINATION_SIZE,
//               withCount: true,
//             },
//           },
//           {
//             encodeValuesOnly: true,
//           }
//         )
//         break
//     }
//     let causes = []
//     let pagination = {}
//     await $axios
//       .$get(`${STRAPI_API}/causes?locale=${app.i18n.locale}&${causesQuery}`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
//         },
//       })
//       .then(({ data, meta }) => {
//         causes = data
//         pagination = meta.pagination
//       })
//       .catch((err) => {
//         error({
//           statusCode: 404,
//           message: "No causes found",
//         })
//       })
//     return { tags, categories, causes, pagination }
//   },
//   mounted() {
//     this.$segment.page("Causes")
//   },
//   // addresses the most common questions
//   head() {
//     return {
//       title: "Campaigns | An-nadaa educational foundation",
//       meta: [
//         {
//           hid: "description",
//           name: "description",
//           content:
//             "Donate to change the lives of millions of underprivilged muslims in Nigeria, by supporting educational and welfare projects of An-Nadaa",
//         },
//       ],
//     }
//   },
// }
</script>
