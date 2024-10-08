<template>
  <div class="min-h-full mx-auto lg:mx-24">
    <section class="py-10">
      <!-- Page header -->
      <div class="px-4 mx-auto sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:px-8">
        <div class="flex items-center space-x-5">
          <div>
            <h1 class="mb-2 text-4xl font-bold text-gray-900">{{ cause?.attributes.title }}</h1>
            <p class="text-sm font-medium text-gray-500">
              Created on
              <time datetime="2020-08-25">{{ formatDate(cause?.attributes.createdAt) }}</time>
            </p>
          </div>
        </div>
        <div
          class="flex flex-col-reverse mt-6 space-y-4 space-y-reverse justify-stretch sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
          <div
            v-if="cause?.attributes.dynamicZone[0].goal"
            class="p-4 text-xl font-semibold rounded-md bg-primary-100 text-primary-700">
            Raising: {{ formateAmount(cause?.attributes.dynamicZone[0].goal) }}
          </div>
          <div
            class="inline-flex items-center p-4 text-xl font-semibold rounded-md bg-primary-100 text-primary-700"
            v-if="
              cause?.attributes.dynamicZone[0].__component === 'causes.project' &&
              cause?.attributes.dynamicZone[0].donation
            ">
            <span
              >Cost of {{ cause?.attributes.dynamicZone[0].donation.action }}
              {{ cause?.attributes.dynamicZone[0].donation.value }}
              {{ cause?.attributes.dynamicZone[0].donation.subject }}:
              {{ formateAmount(cause?.attributes.dynamicZone[0].donation.cost) }}</span
            >
            <!-- <InfoCircleIcon
              class="w-5 h-5 mx-1"
              content="Some costs are to our best estimates and additional variable costs might need to be covered"
              v-tippy="{ placement: 'top' }" 
              /> -->
            <InfoCircleIcon
              class="w-5 h-5 mx-1"
              content="Some costs are to our best estimates and additional variable costs might need to be covered" />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-6 mx-auto mt-8 sm:px-6 lg:grid-flow-col-dense lg:grid-cols-3">
        <aside aria-labelledby="donation-section" class="lg:col-start-3 lg:col-span-1">
          <div class="px-4 py-5 bg-white shadow-md sm:rounded-lg sm:px-6 lg:sticky lg:top-0">
            <h2 id="donation-section" class="mb-3 text-2xl font-semibold text-gray-900">Donations</h2>
            <span
              :class="`inline-flex items-center px-2.5 py-0.5 rounded-md text-md mb-3 font-medium ${
                cause?.attributes.closed ? 'bg-gary-100 text-gray-800' : 'bg-green-100 text-green-800'
              }`">
              <Component class="-ml-0.5 mr-1.5 w-5 h-5" :is="cause?.attributes.closed ? 'LockIcon' : 'LockOpenIcon'" />

              {{ cause?.attributes.closed ? 'Closed' : 'Open' }}
            </span>
            <div
              v-if="cause?.attributes.dynamicZone[0].goal && cause?.attributes.dynamicZone[0].goal !== 0"
              class="h-2 my-3 overflow-hidden bg-gray-200 rounded-full">
              <div class="h-2 bg-yellow-400 rounded-full" :style="`width: ${percentage}%`"></div>
            </div>
            <ul class="my-6 space-y-6">
              <div v-if="cause?.attributes.dynamicZone[0].goal && cause?.attributes.dynamicZone[0].goal !== 0">
                <h2 class="text-lg font-medium text-gray-500">Raised</h2>
                <ul role="list" class="mt-3 space-y-3">
                  <li class="flex justify-start">
                    <div class="flex items-center space-x-3">
                      <div class="text-lg font-medium text-gray-900">
                        {{ formateAmount(cause?.attributes.dynamicZone[0].raised) }}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h2 class="text-lg font-medium text-gray-500">Impact</h2>
                <ul role="list" class="mt-3 space-y-3">
                  <li
                    v-for="(impact, i) in cause?.attributes.dynamicZone[0].impact"
                    :key="i"
                    class="flex justify-start">
                    <div class="flex items-center space-x-3">
                      <div class="text-lg font-medium text-gray-900">{{ impact.value }} {{ impact.of }}</div>
                    </div>
                  </li>
                </ul>
              </div>
              <!-- <li>Raised: {{ formateAmount(cause?.attributes.raised) }}</li> -->
              <!-- <li>Impact: {{ cause?.attributes.impact }}</li> -->
            </ul>
            <ClientOnly placeholder="Loading...">
              <form action="#" class="flex-col hidden mt-12 lg:flex sm:mx-auto sm:max-w-lg" @submit.prevent="donate">
                <div class="flex-1 min-w-0">
                  <label for="amount" class="sr-only">Amount</label>
                  <div class="relative mt-1 rounded-md shadow-sm">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span class="text-gray-500 sm:text-sm"> $ </span>
                    </div>
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      class="block w-full px-5 py-3 mb-3 text-base text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
                      placeholder="0.00"
                      aria-describedby="amount-currency"
                      v-model="amount" />
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span class="text-gray-500 sm:text-sm" id="amount-currency"> USD </span>
                    </div>
                  </div>
                </div>
                <div class="mt-4 sm:mt-1">
                  <StripeCheckout ref="checkoutRef" :pk="pk" :session-id="sessionId" />
                  <button
                    :disabled="cause?.attributes.closed"
                    type="submit"
                    :class="`relative flex items-center w-full px-5 py-3 text-base font-medium  border border-transparent rounded-md shadow sm:px-10 ${
                      cause?.attributes.closed
                        ? 'bg-gray-300 text-gray-600'
                        : 'text-white bg-primary-600 hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-700'
                    }`">
                    <MoonLoader class="absolute left-0 ml-4" :loading="loading" color="#fff" size="30px"></MoonLoader>
                    <div class="mx-auto">Donate</div>
                  </button>
                </div>
              </form>
              <div v-if="!cause?.attributes.closed" class="justify-center hidden w-full lg:flex">
                <button
                  class="inline-flex px-3 py-1 my-4 rounded-lg bg-primary-100 text-primary-700 hover:bg-primary-700 hover:text-primary-100"
                  @click="goTo('/direct')">
                  <span>Direct Transfer</span>
                  <ArrowNarrowRightIcon />
                </button>
              </div>
            </ClientOnly>
          </div>
        </aside>

        <div class="space-y-6 lg:col-start-1 lg:col-span-2">
          <!-- Cover -->
          <section aria-labelledby="cause-cover">
            <div class="overflow-hidden bg-white shadow sm:rounded-lg">
              <div id="cause-cover">
                <img
                  class="object-cover w-full aspect-video"
                  v-if="cause?.attributes.cover.data.attributes.url && !cause?.attributes.video"
                  :src="cause?.attributes.cover.data.attributes.url"
                  alt="An-nadaa Descriptive Video" />
                <VideoPlayer v-else :videoLocation="cause?.attributes.video" />
              </div>
              <div class="px-4 py-5 border-t border-gray-200 sm:px-6">
                <h3 class="text-2xl font-semibold">Overview</h3>
                <div class="prose lg:prose-lg" v-html="cause?.attributes.description"></div>
              </div>
              <div class="p-6">
                <span
                  v-for="(tag, i) in cause?.attributes.tags.data"
                  :key="i"
                  :class="`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-primary-100 text-primary-800  ${
                    i === 0 ? '' : 'ltr:mr-4 rtl:ml-4 mx-2'
                  }`">
                  {{ tag.attributes.value }}
                </span>
              </div>
            </div>
          </section>

          <!-- Body -->
          <section aria-labelledby="cause-information">
            <div class="bg-white shadow sm:rounded-lg sm:overflow-hidden">
              <div class="divide-y divide-gray-200">
                <div class="px-4 py-5 sm:px-6">
                  <h2 id="cause-information" class="text-2xl font-semibold text-gray-900">Campaign Details</h2>
                </div>
                <!-- Gallery -->
                <div>
                  <VueEasyLightbox :visible="lightboxVisible" :imgs="images" :index="index" @hide="onHide" />
                  <div class="flex px-6 py-1 overflow-y-scroll">
                    <div
                      class="h-40 mx-[2px] aspect-square cursor-pointer bg-cover bg-center"
                      v-for="(image, imageIndex) in images"
                      :key="imageIndex"
                      @click="
                        () => {
                          index = imageIndex
                          lightboxVisible = true
                        }
                      "
                      :style="{ backgroundImage: 'url(' + image.thumb + ')' }"></div>
                  </div>
                </div>
                <div class="px-4 py-6 prose max-w-none sm:px-6 lg:prose-xl" v-html="body"></div>
              </div>
              <!-- Other sections should be added here -->
            </div>
          </section>
        </div>
      </div>
    </section>

    <!-- Donation form for mobiles -->
    <ClientOnly placeholder="Loading...">
      <form
        action="#"
        class="sticky z-50 flex flex-col w-full px-6 py-3 bg-white border-t border-gray-200 bottom-14 lg:hidden"
        @submit.prevent="donate">
        <div class="flex-1 min-w-0">
          <label for="amount" class="sr-only">Amount</label>
          <div class="relative mt-1 rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span class="text-gray-500 sm:text-sm"> $ </span>
            </div>
            <input
              type="number"
              name="amount"
              id="amount"
              class="block w-full px-5 py-3 mb-3 text-base text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
              placeholder="0.00"
              aria-describedby="amount-currency"
              v-model="amount" />
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span class="text-gray-500 sm:text-sm" id="amount-currency"> USD </span>
            </div>
          </div>
        </div>
        <div class="mt-4 sm:mt-1">
          <StripeCheckout ref="checkoutRef" :pk="pk" :session-id="sessionId" />
          <button
            :disabled="cause?.attributes.closed"
            type="submit"
            :class="`relative flex items-center w-full px-5 py-3 text-base font-medium  border border-transparent rounded-md shadow sm:px-10 ${
              cause?.attributes.closed
                ? 'bg-gray-300 text-gray-600'
                : 'text-white bg-primary-600 hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-700'
            }`">
            <MoonLoader class="absolute left-0 ml-4" :loading="loading" color="#fff" size="30px"></MoonLoader>
            <div class="mx-auto">Donate</div>
          </button>
        </div>
      </form>
      <div v-if="!cause?.attributes.closed" class="sticky bottom-0 z-50 flex justify-center w-full bg-white lg:hidden">
        <button
          class="inline-flex px-3 py-1 my-4 rounded-lg bg-primary-100 text-primary-700 hover:bg-primary-700 hover:text-primary-100"
          @click="goTo('/direct')">
          <span>Direct Transfer</span>
          <ArrowNarrowRightIcon />
        </button>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import qs from 'qs'
import MoonLoader from 'vue-spinner/src/MoonLoader.vue'
import { LockIcon, LockOpenIcon } from 'vue-tabler-icons'
import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'
import { ArrowNarrowRightIcon, InfoCircleIcon } from 'vue-tabler-icons'
import VueEasyLightbox from 'vue-easy-lightbox'
import 'vue-easy-lightbox/external-css/vue-easy-lightbox.css'
import 'tippy.js/themes/light.css'
import 'tippy.js/themes/light-border.css'
// import 'tippy.js/themes/google.css'
import 'tippy.js/themes/translucent.css'

const CURRENCY_NAME = useAppConfig().currencyName
const localePath = useLocalePath()
const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const router = useRouter()
const { locale } = useI18n()
// todo: change to production
const STRAPI_API = runtimeConfig.public.STRAPI_API
const STRAPI_API_KEY = runtimeConfig.public.STRAPI_API_KEY
// todo: change to production
const pk =
  process.env.NODE_ENV === 'production' ? runtimeConfig.public.STRIPE_PK_PROD : runtimeConfig.public.STRIPE_PK_DEV
const sessionId = ref('session_id')
const amount = ref(0)
const loading = ref(false)
const index = ref<any>(null)
const checkoutRef = ref<any>(null)
const lightboxVisible = ref(false)
const onHide = () => {
  lightboxVisible.value = false
}

const causeQuery = qs.stringify(
  {
    populate: {
      dynamicZone: {
        populate: '*',
      },
      gallery: {
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
  },
  {
    encodeValuesOnly: true,
  },
)

const cause = ref<any>(null)
const { error } = await useFetch(`${STRAPI_API}/causes/${route.params.id}?locale=${locale.value}&${causeQuery}`, {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${STRAPI_API_KEY}`,
  },
  onResponse: (res) => {
    if (!res.error) {
      cause.value = res.response._data.data
    }
  },
})

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Campaign not found',
    fatal: true,
  })
}

// const { data: cause } = await useAsyncData('cause', () =>
//   fetch(`${STRAPI_API}/causes/${route.params.id}?locale=${locale.value}&${causeQuery}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${STRAPI_API_KEY}`,
//     },
//   })
//     .then(async (res) => {
//       if (res.ok) {
//         const response = await res.json()
//         console.log(response)

//         return response.data
//       } else {
//         throw new Error('Failed to fetch')
//       }
//     })
//     .catch((err) => {
//       console.log('NOT FOUND')

//       throw createError({
//         statusCode: 404,
//         statusMessage: 'Campaign not found',
//         fatal: true,
//       })
//     }),
// )

async function donate() {
  if (this.amount >= 1) {
    this.loading = true

    await fetch(
      `${runtimeConfig.functionBaseUrl}/create-checkout-session?locale=${locale}&amount=${
        this.amount * 100
      }&product=${cause.value.attributes.product}`,
      {
        method: 'POST',
      },
    ).then(async (res) => {
      if (res.ok) {
        this.loading = false
        const session = await res.json()
        sessionId.value = session.id
        // this.$segment.track('Donation Started', {
        //   amount: this.amount,
        //   sessionId: session.id,
        //   cause: cause.value.attributes.title,
        //   causeID: cause.value.id,
        // })

        return checkoutRef.value?.redirectToCheckout()
      }
    })
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(locale.value, { dateStyle: 'full' }).format(date) || ''
}

function formateAmount(amount: number) {
  return new Intl.NumberFormat(locale.value, {
    style: 'currency',
    currency: CURRENCY_NAME,
  }).format(amount)
}

function goTo(path: string) {
  router.push(localePath(path))
  // this.$segment.track('Direct Transfer Clicked', {
  //   cause: cause.value.attributes.title,
  //   causeID: cause.value.id,
  // })
}

const percentage = computed(() => {
  return cause.value.attributes.dynamicZone[0].goal
    ? (cause.value.attributes.dynamicZone[0].raised * 100) / cause.value.attributes.dynamicZone[0].goal
    : 0
})
const body = sanitizeHtml(await marked.parse(cause.value?.attributes.body || ''))
const images = computed(() =>
  cause.value.attributes.gallery.data
    ? cause.value.attributes.gallery.data.map((image: any) => ({
        src: image.attributes.url,
        thumb: image.attributes.url.replace('photo', 'thumbnail_photo'),
      }))
    : [
        {
          src: cause.value.attributes.cover.data.attributes.url,
          thumb: cause.value.attributes.cover.data.attributes.url.replace('photo', 'thumbnail_photo'),
        },
      ],
)

onMounted(() => {
  // $segment.page('Cause', `${cause.attributes.title}`)
  if (!cause.value) {
    return
  }
  useHead(() => {
    return {
      title: `${cause.value.attributes.title} | ${cause.value.attributes.dynamicZone[0].goal}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${cause.value.attributes.title} campaign was launched to ${cause.value.attributes.dynamicZone[0].goal}, and their state is : ${
            cause.value.attributes.closed ? 'Closed' : 'Opened'
          } now.${cause.value.attributes.closed ? '' : 'Build your hereafter today by contributing to this campaign'} `,
        },
      ],
    }
  })
})

// export default {
//   components: {
//     MoonLoader,
//     LockIcon,
//     LockOpenIcon,
//     CoolLightBox,
//     ArrowNarrowRightIcon,
//     InfoCircleIcon,
//   },
//   layout: 'cause',
//   async asyncData({ $axios, app, params, error }) {
//     const STRAPI_API = process.env.NODE_ENV === 'production' ? process.env.STRAPI_API : 'http://localhost:5000/api'
//     const causeQuery = qs.stringify(
//       {
//         populate: {
//           dynamicZone: {
//             populate: '*',
//           },
//           gallery: {
//             populate: '*',
//           },
//           cover: {
//             fields: ['url'],
//           },
//           tags: {
//             fields: ['value'],
//           },
//           category: {
//             fields: ['value'],
//           },
//         },
//       },
//       {
//         encodeValuesOnly: true,
//       },
//     )
//     // get the last two characters
//     const cause = await $axios
//       .$get(`${STRAPI_API}/causes/${params.id}?locale=${app.i18n.locale}&${causeQuery}`, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
//         },
//       })
//       .then(({ data }) => data)
//       .catch((err) => {
//         error({
//           statusCode: 404,
//           message: 'Campaign not found',
//         })
//       })
//     return { cause }
//   },
//   data() {
//     return {
//       pk: process.env.NODE_ENV === 'production' ? process.env.STRIPE_PK_PROD : process.env.STRIPE_PK_DEV,
//       sessionId: 'session_id',
//       amount: 0,
//       loading: false,
//       index: null,
//     }
//   },
//   mounted() {
//     this.$segment.page('Cause', `${this.cause.attributes.title}`)
//   },
//   methods: {
//     async donate() {
//       if (this.amount >= 1) {
//         this.loading = true
//         await this.$axios
//           .$post(
//             `${process.env.functionBaseUrl}/create-checkout-session?locale=${this.$i18n.locale}&amount=${
//               this.amount * 100
//             }&product=${this.cause.attributes.product}`,
//           )
//           .then((session) => {
//             this.loading = false
//             this.sessionId = session.id
//             this.$segment.track('Donation Started', {
//               amount: this.amount,
//               sessionId: session.id,
//               cause: this.cause.attributes.title,
//               causeID: this.cause.id,
//             })
//             // You will be redirected to Stripe's secure checkout page
//             return this.$refs.checkoutRef.redirectToCheckout()
//           })
//       }
//     },
//     formatDate(dateString) {
//       const date = new Date(dateString)
//       return new Intl.DateTimeFormat(this.$i18n.locale, { dateStyle: 'full' }).format(date) || ''
//     },
//     formateAmount(amount) {
//       return new Intl.NumberFormat(this.$i18n.locale, {
//         style: 'currency',
//         currency: CURRENCY_NAME,
//       }).format(amount)
//     },
//     goTo(path) {
//       this.$router.push(this.localePath(path))
//       this.$segment.track('Direct Transfer Clicked', {
//         cause: this.cause.attributes.title,
//         causeID: this.cause.id,
//       })
//     },
//   },
//   computed: {
//     percentage() {
//       return this.cause.attributes.dynamicZone[0].goal
//         ? (this.cause.attributes.dynamicZone[0].raised * 100) / this.cause.attributes.dynamicZone[0].goal
//         : 0
//     },
//     body() {
//       return sanitizeHtml(marked.parse(this.cause.attributes.body))
//     },
//     images() {
//       return this.cause.attributes.gallery.data
//         ? this.cause.attributes.gallery.data.map((image) => ({
//             src: image.attributes.url,
//             thumb: image.attributes.url.replace('photo', 'thumbnail_photo'),
//           }))
//         : [
//             {
//               src: this.cause.attributes.cover.data.attributes.url,
//               thumb: this.cause.attributes.cover.data.attributes.url.replace('photo', 'thumbnail_photo'),
//             },
//           ]
//     },
//   },
//   head() {
//     let cause = {
//       title: this.cause.attributes.title,
//       goal: this.cause.attributes.dynamicZone[0].goal,
//       closed: this.cause.attributes.closed,
//     }

//     return {
//       title: `${cause.title} | ${cause.goal}`,
//       meta: [
//         {
//           hid: 'description',
//           name: 'description',
//           content: `${cause.title} campaign was launched to ${cause.goal}, and their state is : ${
//             cause.closed ? 'Closed' : 'Opened'
//           } now.${cause.closed ? '' : 'Build your hereafter today by contributing to this campaign'} `,
//         },
//       ],
//     }
//   },
// }
</script>
