<template>
  <div class="bg-white">
    <div>
      <!--
      Mobile filter dialog

      Off-canvas filters for mobile, show/hide based on off-canvas filters state.
    -->
      <div v-show="showMenu" class="fixed inset-0 z-40 flex lg:hidden" role="dialog" aria-modal="true">
        <!--
        Off-canvas menu overlay, show/hide based on off-canvas menu state.

        Entering: "transition-opacity ease-linear duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "transition-opacity ease-linear duration-300"
          From: "opacity-100"
          To: "opacity-0"
      -->
        <transition
          enter-class="transition duration-300 ease-linear"
          enter-active-class="opacity-0"
          enter-to-class="opacity-100"
          leave-class="transition-opacity duration-300 ease-linear"
          leave-active-class="opacity-100"
          leave-to-class="opacity-0">
          <div v-show="showMenu" class="fixed inset-0 bg-black bg-opacity-25" aria-hidden="true"></div>
        </transition>
        <!--
        Off-canvas menu, show/hide based on off-canvas menu state.

        Entering: "transition ease-in-out duration-300 transform"
          From: "translate-x-full"
          To: "translate-x-0"
        Leaving: "transition ease-in-out duration-300 transform"
          From: "translate-x-0"
          To: "translate-x-full"
      -->
        <transition
          enter-class="transition duration-300 ease-in-out transform"
          enter-active-class="translate-x-full"
          enter-to-class="translate-x-0"
          leave-class="transition duration-300 ease-in-out transform"
          leave-active-class="translate-x-0"
          leave-to-class="translate-x-full">
          <div
            v-show="showMenu"
            class="relative flex flex-col w-full h-full max-w-xs py-4 pb-12 ml-auto overflow-y-auto bg-white shadow-xl">
            <div class="flex items-center justify-between px-4">
              <h1 class="text-lg font-medium text-gray-900">Filters</h1>
              <button
                @click="showMenu = false"
                type="button"
                class="flex items-center justify-center w-10 h-10 p-2 -mr-2 text-gray-400 bg-white rounded-md">
                <span class="sr-only">Close menu</span>
                <!-- Heroicon name: outline/x -->
                <XIcon class="w-6 h-6" />
              </button>
            </div>

            <!-- Filters -->
            <div class="mt-4 border-t border-gray-200">
              <h2 class="sr-only">Categories</h2>
              <ul v-for="(tab, i) in tabs" :key="i" role="list" class="px-2 py-3 font-medium text-gray-900">
                <li
                  :class="`rounded-md ${
                    selectedTab(tab) ? 'text-primary-700 bg-primary-100 hover:bg-primary-200' : ''
                  }`">
                  <button @click="selectTab(tab)" class="block px-2 py-3">
                    {{ tab }}
                  </button>
                </li>
              </ul>

              <div class="px-4 py-6 border-t border-gray-200">
                <h2 @click="expandTags = !expandTags" class="flow-root -mx-2 -my-3">
                  <!-- Expand/collapse section button -->
                  <button
                    type="button"
                    class="flex items-center justify-between w-full px-2 py-3 text-gray-400 bg-white hover:text-gray-500"
                    aria-controls="filter-section-mobile-0"
                    aria-expanded="false">
                    <span class="font-medium text-gray-900"> Tags </span>
                    <span class="flex items-center ml-6">
                      <!--
                      Expand icon, show/hide based on section open state.

                      Heroicon name: solid/plus-sm
                    -->
                      <PlusIcon v-show="!expandTags" class="w-5 h-5" />
                      <!--
                      Collapse icon, show/hide based on section open state.

                      Heroicon name: solid/minus-sm
                    -->
                      <MinusIcon v-show="expandTags" class="w-5 h-5" />
                    </span>
                  </button>
                </h2>
                <!-- Filter section, show/hide based on section state. -->
                <template v-for="(tag, i) in tags">
                  <div v-if="expandTags" :key="i" class="pt-6" id="filter-section-mobile-0">
                    <div class="space-y-6">
                      <div class="flex items-center">
                        <input
                          :id="`filter-tag-${tag}`"
                          :value="tag"
                          type="checkbox"
                          v-model="tagsSelected"
                          class="w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500" />
                        <label for="filter-mobile-color-0" class="flex-1 min-w-0 ml-3 text-gray-500">
                          {{ tag.attributes.value }}
                        </label>
                      </div>
                    </div>
                  </div>
                </template>
              </div>

              <div class="px-4 py-6 border-t border-gray-200">
                <h2 @click="expandCategories = !expandCategories" class="flow-root -mx-2 -my-3">
                  <!-- Expand/collapse section button -->
                  <button
                    type="button"
                    class="flex items-center justify-between w-full px-2 py-3 text-gray-400 bg-white hover:text-gray-500"
                    aria-controls="filter-section-mobile-1"
                    aria-expanded="false">
                    <span class="font-medium text-gray-900"> Category </span>
                    <span class="flex items-center ml-6">
                      <!--
                      Expand icon, show/hide based on section open state.

                      Heroicon name: solid/plus-sm
                    -->
                      <PlusIcon v-show="!expandCategories" class="w-5 h-5" />
                      <!--
                      Collapse icon, show/hide based on section open state.

                      Heroicon name: solid/minus-sm
                    -->
                      <MinusIcon v-show="expandCategories" class="w-5 h-5" />
                    </span>
                  </button>
                </h2>
                <!-- Filter section, show/hide based on section state. -->
                <template v-for="(category, i) in categories">
                  <div v-if="expandCategories" :key="i" class="pt-6" id="filter-section-mobile-1">
                    <div class="space-y-6">
                      <div class="flex items-center">
                        <input
                          :id="`filter-category-${category.id}`"
                          :value="category"
                          type="checkbox"
                          v-model="categoriesSelected"
                          class="w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500" />
                        <label for="filter-mobile-category-0" class="flex-1 min-w-0 ml-3 text-gray-500">
                          {{ category.attributes.value }}
                        </label>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <main class="px-4 mx-auto lg:mx-24 sm:px-6 lg:px-8">
        <div class="relative flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
          <h1 class="text-4xl font-extrabold tracking-tight text-gray-900">Our Causes</h1>

          <div class="flex items-center">
            <div class="relative inline-block text-left">
              <div>
                <button
                  @click="showSortMenu = !showSortMenu"
                  type="button"
                  class="inline-flex justify-center text-sm font-medium text-gray-700 group hover:text-gray-900"
                  id="menu-button"
                  aria-expanded="false"
                  aria-haspopup="true">
                  <span>Sort</span>
                  <!-- Heroicon name: solid/chevron-down -->
                  <ChevronDownIcon class="flex-shrink-0 w-5 h-5 ml-1 -mr-1 text-gray-400 group-hover:text-gray-500" />
                </button>
              </div>

              <!--
              Dropdown menu, show/hide based on menu state.

              Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            -->
              <transition
                enter-class="transition duration-100 ease-out"
                enter-active-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-class="transition duration-75 ease-in"
                leave-active-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0">
                <div
                  v-if="showSortMenu"
                  class="absolute right-0 w-40 mt-2 origin-top-right bg-white rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabindex="-1">
                  <div v-for="(filter, i) in sortFilters" class="py-1" role="none" :key="i">
                    <!--
                  Active: "bg-gray-100", Not Active: ""

                  Selected: "font-medium text-gray-900", Not Selected: "text-gray-500"
                -->
                    <button
                      @click="sortFilterSelected = i"
                      :class="`block px-4 py-2 text-sm font-medium ${
                        i === sortFilterSelected ? 'text-gray-900' : 'text-gray-500'
                      }`"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-0">
                      {{ filter.text }}
                    </button>
                  </div>
                </div>
              </transition>
            </div>

            <button type="button" class="p-2 ml-5 -m-2 text-gray-400 sm:ml-7 hover:text-gray-500">
              <span class="sr-only">View grid</span>
              <!-- Heroicon name: solid/view-grid -->
              <LayoutGridIcon class="w-5 h-5" />
            </button>
            <button
              @click="showMenu = true"
              type="button"
              class="p-2 ml-4 -m-2 text-gray-400 sm:ml-6 hover:text-gray-500 lg:hidden">
              <span class="sr-only">Filters</span>
              <!-- Heroicon name: solid/filter -->
              <FilterIcon class="w-5 h-5" />
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" class="pt-6 pb-24">
          <h2 id="products-heading" class="sr-only">Causes types</h2>

          <div class="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
            <!-- Filters -->
            <div class="hidden lg:block">
              <!-- <h2 class="sr-only">Types</h2>
              <ul role="list" class="pb-6 text-sm font-medium text-gray-900 border-b border-gray-200">
                <li
                  :class="`rounded-md p-4 text-lg ${
                    selectedTab(tab)
                      ? 'text-primary-700 bg-primary-100 hover:bg-primary-100 hover:text-primary-900'
                      : 'hover:bg-primary-50 hover:text-primary-600'
                  }`"
                  v-for="(tab, i) in tabs"
                  :key="i">
                  <button @click="selectTab(tab)">{{ tab }}</button>
                </li>
              </ul> -->

              <div class="py-6 border-b border-gray-200">
                <h2 @click="expandTags = !expandTags" class="flow-root -my-3">
                  <!-- Expand/collapse section button -->
                  <button
                    type="button"
                    class="flex items-center justify-between w-full py-3 text-sm text-gray-400 bg-white hover:text-gray-500"
                    aria-controls="filter-section-0"
                    aria-expanded="false">
                    <span class="font-medium text-gray-900"> Tag </span>
                    <span class="flex items-center ml-6">
                      <!--
                      Expand icon, show/hide based on section open state.

                      Heroicon name: solid/plus-sm
                    -->
                      <PlusIcon v-show="!expandTags" class="w-5 h-5" />
                      <!--
                      Collapse icon, show/hide based on section open state.

                      Heroicon name: solid/minus-sm
                    -->
                      <MinusIcon v-show="expandTags" class="w-5 h-5" />
                    </span>
                  </button>
                </h2>
                <!-- Filter section, show/hide based on section state. -->
                <template v-for="tag in tags">
                  <div v-if="expandTags" :key="tag.id" class="pt-6" id="filter-section-0">
                    <div class="space-y-4">
                      <div class="flex items-center">
                        <input
                          :id="`filter-tag-${tag.id}`"
                          :value="tag"
                          type="checkbox"
                          v-model="tagsSelected"
                          class="w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500" />
                        <label :for="`filter-tag-${tag.id}`" class="ml-3 text-sm text-gray-600">
                          {{ tag.attributes.value }}
                        </label>
                      </div>
                    </div>
                  </div>
                </template>
              </div>

              <div class="py-6 border-b border-gray-200">
                <h2 @click="expandCategories = !expandCategories" class="flow-root -my-3">
                  <!-- Expand/collapse section button -->
                  <button
                    type="button"
                    class="flex items-center justify-between w-full py-3 text-sm text-gray-400 bg-white hover:text-gray-500"
                    aria-controls="filter-section-1"
                    aria-expanded="false">
                    <span class="font-medium text-gray-900"> Category </span>
                    <span class="flex items-center ml-6">
                      <!--
                      Expand icon, show/hide based on section open state.

                      Heroicon name: solid/plus-sm
                    -->
                      <PlusIcon v-show="!expandCategories" class="w-5 h-5" />
                      <!--
                      Collapse icon, show/hide based on section open state.

                      Heroicon name: solid/minus-sm
                    -->
                      <MinusIcon v-show="expandCategories" class="w-5 h-5" />
                    </span>
                  </button>
                </h2>
                <!-- Filter section, show/hide based on section state. -->
                <template v-for="category in categories">
                  <div v-if="expandCategories" :key="category.id" class="pt-6" id="filter-section-1">
                    <div class="space-y-4">
                      <div class="flex items-center">
                        <input
                          :id="`filter-category-${category.id}`"
                          :value="category"
                          type="checkbox"
                          v-model="categoriesSelected"
                          class="w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500" />
                        <label :for="`filter-category-${category.id}`" class="ml-3 text-sm text-gray-600">
                          {{ category.attributes.value }}
                        </label>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>

            <!-- Product grid -->
            <div
              :class="`lg:col-span-3 ${
                loading
                  ? 'flex justify-center items-center'
                  : 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-min'
              }`">
              <!-- Replace with your content -->
              <BounceLoader class="mx-auto" v-if="loading" :loading="loading" color="#06b6d4" size="60px" />

              <CauseCard v-else v-for="card in cards" :key="card.id" :cause="card" />

              <!-- /End replace -->
            </div>
          </div>
        </section>

        <!-- Pagination -->
        <!-- This example requires Tailwind CSS v2.0+ -->
        <nav
          class="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6"
          aria-label="Pagination">
          <div class="hidden sm:block">
            <p class="text-sm text-gray-700">
              Showing
              {{ ' ' }}
              <span class="font-medium">{{ (paginationData.page - 1) * QUERY_SIZE + 1 }}</span>
              {{ ' ' }}
              to
              {{ ' ' }}
              <span class="font-medium"
                >{{
                  paginationData.page === paginationData.pageCount
                    ? paginationData.total % QUERY_SIZE === 0
                      ? paginationData.page * QUERY_SIZE
                      : paginationData.total % QUERY_SIZE
                    : paginationData.page * QUERY_SIZE
                }}
              </span>
              {{ ' ' }}
              of
              {{ ' ' }}
              <span class="font-medium">{{ paginationData.total }}</span>
              {{ ' ' }}
              results
            </p>
          </div>
          <div class="flex justify-between flex-1 sm:justify-end">
            <button
              :disabled="!hasPrev"
              @click="prevPage"
              :class="`mx-2 relative inline-flex items-center border-gray-300 px-4 py-2 text-sm font-medium bg-white border rounded-md ${
                hasPrev ? 'text-gray-700  hover:bg-gray-50' : 'text-gray-300 cursor-not-allowed'
              }`">
              Previous
            </button>
            <button
              :disabled="!hasNext"
              @click="nextPage"
              :class="`mx-2 relative inline-flex items-center border-gray-300 px-4 py-2 text-sm font-medium bg-white border rounded-md ${
                hasNext ? 'text-gray-700  hover:bg-gray-50' : 'text-gray-300 cursor-not-allowed'
              }`">
              Next
            </button>
          </div>
        </nav>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { XIcon, ChevronDownIcon, PlusIcon, MinusIcon, LayoutGridIcon, FilterIcon } from 'vue-tabler-icons'
import BounceLoader from 'vue-spinner/src/BounceLoader.vue'
import qs from 'qs'

const { locale, defaultLocale } = useI18n()
const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const router = useRouter()
// const = useLocaleLocation()

const PAGINATION_SIZE = 12

// todo: make sure to change back to production
const STRAPI_API = runtimeConfig.public.STRAPI_API
const STRAPI_API_KEY = runtimeConfig.public.STRAPI_API_KEY

type Tag = {
  attributes: {
    value: string
  }
  id: string
}

type Category = {
  attributes: {
    value: string
  }
  id: string
}

const props = defineProps({
  tags: {
    required: true,
    type: Array<Tag>,
  },
  categories: {
    required: true,
    type: Array<Category>,
  },
  initialCauses: {
    required: false,
    type: Array,
    default: () => [],
  },
  initialPaginationData: {
    required: false,
    type: Object,
    default: () => ({
      page: 1,
      pageSize: PAGINATION_SIZE,
      pageCount: 1,
      total: 0,
    }),
  },
})

const tabs = ['All', 'Campaigns', 'Projects']
// const currentTab = 'All'
const currentTab = ref('All')
const sortFilters = ref([
  {
    text: 'Featured',
    filter: 'featured:desc',
  },
  {
    text: 'Newest',
    filter: 'createdAt:desc',
  },
])
const sortFilterSelected = ref(0)
const tagsSelected = ref<Array<any>>([])
const categoriesSelected = ref([])
const expandTags = ref(true)
const expandCategories = ref(true)
const showMenu = ref(false)
const showSortMenu = ref(false)
const loading = ref(true)
const cards = ref<Array<any>>([])
const paginationData = ref<Record<string, any>>({})
const paginationQuery = ref({
  page: 1,
  pageSize: PAGINATION_SIZE,
  withCount: true,
})
const QUERY_SIZE = ref(PAGINATION_SIZE)

onMounted(() => {
  loading.value = true
  cards.value = props.initialCauses
  paginationData.value = props.initialPaginationData.pagination
  switch (route.query.s) {
    case 'c':
      currentTab.value = 'Campaigns'
      break
    case 'p':
      currentTab.value = 'Projects'
      break
    default:
      currentTab.value = 'All'
      break
  }
  loading.value = false
})

function selectedTab(tab: string) {
  return currentTab.value === tab
}

function localeLocation(location: { path: string; query: Record<string, any> }) {
  const currentLocale = locale.value // Get the current locale
  // Assume locale is a prefix in the path like '/en/causes'
  return {
    ...location,
    path: `${currentLocale === defaultLocale ? '' : `/${currentLocale}`}${location.path}`,
  }
}

function selectTab(tab: string) {
  currentTab.value = tab

  // router.push(
  //   localeLocation({
  //     path: '/causes',
  //     query: {
  //       s: tab === 'All' ? '' : tab.toLowerCase()[0],
  //     },
  //   }),
  // )
  router.replace(
    localeLocation({
      path: '/causes',
      query: {
        s: tab === 'All' ? '' : tab.toLowerCase()[0],
      },
    }),
  )
}

async function populateCards() {
  loading.value = true

  await fetch(`${STRAPI_API}/causes?locale=${locale.value}&${query.value}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_API_KEY}`,
    },
  }).then(async (res) => {
    if (res.ok) {
      let { data, meta } = await res.json()

      if (currentTab.value !== 'All') {
        data = data.filter((item: any) => item.__component === `causes.${currentTab.value.toLowerCase()}`)
      }

      cards.value = data as Array<any>
      paginationData.value = meta.pagination
    }
  })

  loading.value = false
}

async function nextPage() {
  paginationQuery.value.page = paginationData.value.page + 1
  await populateCards()
}

async function prevPage() {
  paginationQuery.value.page = paginationData.value.page - 1
  await populateCards()
}

const hasPrev = computed(() => {
  return paginationData.value.page > 1
})

const hasNext = computed(() => {
  return paginationData.value.page < paginationData.value.pageCount
})

const query = computed(() => {
  return qs.stringify(
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
        // conditionally add campaign or project filter based on query params
        // ...(currentTab.value === 'Campaigns'
        //   ? {
        //       dynamicZone: {
        //         __component: {
        //           $eq: 'causes.campaign',
        //         },
        //       },
        //     }
        //   : route.query.s === 'Projects'
        //     ? {
        //         dynamicZone: {
        //           __component: {
        //             $eq: 'causes.project',
        //           },
        //         },
        //       }
        //     : {}),
        // conditionally add tags filter if there are any selected
        ...(tagsSelected.value.length > 0
          ? {
              tags: {
                value: {
                  $in: tagsSelected.value.map((tag) => tag.attributes.value),
                },
              },
            }
          : {}),
        // conditionally add categories filter if there are any selected
        ...(categoriesSelected.value.length > 0
          ? {
              category: {
                value: {
                  $in: categoriesSelected.value.map((category: any) => category.attributes.value),
                },
              },
            }
          : {}),
      },
      sort: [sortFilters.value[sortFilterSelected.value].filter, 'createdAt:desc'],
      pagination: paginationQuery.value,
    },
    {
      encodeValuesOnly: true,
    },
  )
})

watch(currentTab, async () => {
  populateCards()
})

watch(sortFilterSelected, async () => {
  populateCards()
})

watch(tagsSelected, async () => {
  populateCards()
})

watch(categoriesSelected, async () => {
  populateCards()
})

// export default {
//   watch: {
//     $route: {
//       handler() {
//         switch (this.$route.query.s) {
//           case 'c':
//             this.currentTab = 'Campaigns'
//             break
//           case 'p':
//             this.currentTab = 'Projects'
//             break
//           default:
//             this.currentTab = 'All'
//             break
//         }
//       },
//       immediate: true,
//     },
//   },
// }
</script>
