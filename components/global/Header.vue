<template>
  <div class="relative z-10 mx-auto lg:mx-24">
    <div class="flex items-center justify-between px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
      <div class="cursor-pointer">
        <NuxtLink :to="localePath('/')" class="flex cursor-pointer">
          <span class="sr-only">An-Nadaa</span>
          <img class="w-auto sm:w-full" src="~/assets/media/img/logo.svg" alt="logo" />
        </NuxtLink>
      </div>
      <div class="-my-2 -mr-2 md:hidden">
        <button
          @click="mobileToggle = true"
          type="button"
          class="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
          aria-expanded="false">
          <span class="sr-only">Open menu</span>
          <!-- Heroicon name: outline/menu -->
          <Menu2Icon class="w-6 h-6" />
        </button>
      </div>
      <div class="hidden md:flex-1 md:flex md:items-center md:justify-between">
        <nav class="flex space-x-10">
          <NuxtLink
            :to="localePath('/about')"
            class="text-base font-medium text-gray-500 cursor-pointer hover:text-gray-900">
            About
          </NuxtLink>

          <NuxtLink
            :to="localePath('/causes')"
            class="text-base font-medium text-gray-500 cursor-pointer hover:text-gray-900">
            Causes
          </NuxtLink>

          <div class="relative" v-on-click-outside="clickOutsideLearn">
            <!-- Item active: "text-gray-900", Item inactive: "text-gray-500" -->
            <button
              type="button"
              class="inline-flex items-center text-base font-medium text-gray-500 bg-white rounded-md group hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              aria-expanded="false"
              @click="showLearn = !showLearn">
              <span>Learn</span>
              <!--
                Heroicon name: solid/chevron-down
  
                Item active: "text-gray-600", Item inactive: "text-gray-400"
              -->
              <ChevronDownIcon
                :class="`w-5 h-5 ml-2 group-hover:text-gray-500 ${showLearn ? 'text-gray-600' : 'text-gray-400'}`" />
            </button>

            <!--
              'More' flyout menu, show/hide based on flyout menu state.
  
              Entering: "transition ease-out duration-200"
                From: "opacity-0 translate-y-1"
                To: "opacity-100 translate-y-0"
              Leaving: "transition ease-in duration-150"
                From: "opacity-100 translate-y-0"
                To: "opacity-0 translate-y-1"
            -->
            <transition
              enter-class="transition duration-200 ease-out"
              enter-active-class="translate-y-1 opacity-0"
              enter-to-class="translate-y-0 opacity-100"
              leave-class="transition duration-150 ease-in"
              leave-active-class="translate-y-0 opacity-100"
              leave-to-class="translate-y-1 opacity-0">
              <div
                v-show="showLearn"
                class="absolute z-10 w-screen max-w-xs px-2 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0">
                <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div class="relative grid gap-6 px-5 py-6 bg-white sm:gap-8 sm:p-8">
                    <a href="#" class="block p-3 -m-3 rounded-md hover:bg-gray-50">
                      <p class="text-base font-medium text-gray-900">
                        <span>Blog</span>
                        <span
                          class="ml-3 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium leading-5 bg-primary-100 text-primary-800">
                          Coming Soon
                        </span>
                      </p>
                      <p class="mt-1 text-sm text-gray-500">See the most recent educative posts.</p>
                    </a>

                    <a href="#" class="block p-3 -m-3 rounded-md hover:bg-gray-50">
                      <p class="text-base font-medium text-gray-900">
                        <span>Lectures</span>
                        <span
                          class="ml-3 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium leading-5 bg-primary-100 text-primary-800">
                          Coming Soon
                        </span>
                      </p>
                      <p class="mt-1 text-sm text-gray-500">Brows through the lectures and videos of Shaykh Ibrahim.</p>
                    </a>
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <NuxtLink :to="localePath('/faq')" class="text-base font-medium text-gray-500 hover:text-gray-900">
            FAQ
          </NuxtLink>

          <NuxtLink :to="localePath('/contact')" class="text-base font-medium text-gray-500 hover:text-gray-900">
            Contact
          </NuxtLink>
        </nav>
        <div class="flex items-center md:ml-12">
          <!-- Use these buttons when we have authentication -->
          <!-- <a href="#" class="text-base font-medium text-gray-500 hover:text-gray-900"> Log in </a>
            <a
              href="#"
              class="inline-flex items-center justify-center px-4 py-2 ml-8 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700"
            >
              Sign up
            </a> -->
          <a
            id="nav-donate-link"
            href="/#donate"
            class="items-center justify-center hidden w-full px-24 py-3 text-base font-medium text-center text-white border border-transparent rounded-md cursor-pointer lg:flex bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            Donate Now
          </a>
        </div>
      </div>
    </div>

    <!--
      Mobile menu, show/hide based on mobile menu state.
  
      Entering: "duration-200 ease-out"
        From: "opacity-0 scale-95"
        To: "opacity-100 scale-100"
      Leaving: "duration-100 ease-in"
        From: "opacity-100 scale-100"
        To: "opacity-0 scale-95"
    -->
    <div v-if="mobileToggle" class="absolute inset-x-0 top-0 p-2 transition origin-top-right transform md:hidden">
      <div class="bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
        <div class="px-5 pt-5 pb-6">
          <div class="flex items-center justify-between">
            <div class="cursor-pointer">
              <NuxtLink :to="localePath('/')" class="flex">
                <span class="sr-only">An-Nadaa</span>
                <img class="w-auto h-8 sm:h-10" src="~/assets/media/img/logo.svg" alt="logo" />
              </NuxtLink>
            </div>
            <div class="-mr-2">
              <button
                @click="mobileToggle = false"
                type="button"
                class="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
                <span class="sr-only">Close menu</span>
                <!-- Heroicon name: outline/x -->
                <svg
                  class="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div class="mt-6">
            <nav class="grid gap-6">
              <NuxtLink :to="localePath('/causes')" class="flex items-center p-3 -m-3 rounded-lg hover:bg-gray-50">
                <div
                  class="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white rounded-md bg-primary-500">
                  <!-- Heroicon name: outline/chart-bar -->
                  <svg
                    class="px-1"
                    width="800px"
                    height="800px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M16 6.27975C16 6.88118 15.7625 7.45883 15.3383 7.88611C14.3619 8.87007 13.415 9.89605 12.4021 10.8443C12.17 11.0585 11.8017 11.0507 11.5795 10.8268L8.6615 7.88611C7.7795 6.99725 7.7795 5.56225 8.6615 4.67339C9.55218 3.77579 11.0032 3.77579 11.8938 4.67339L11.9999 4.78027L12.1059 4.67345C12.533 4.24286 13.1146 4 13.7221 4C14.3297 4 14.9113 4.24284 15.3383 4.67339C15.7625 5.10073 16 5.67835 16 6.27975Z"
                      stroke="#fff"
                      stroke-width="1.5"
                      stroke-linejoin="round" />
                    <path
                      d="M18 20L21.8243 16.1757C21.9368 16.0632 22 15.9106 22 15.7515V10.5C22 9.67157 21.3284 9 20.5 9V9C19.6716 9 19 9.67157 19 10.5V15"
                      stroke="#fff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round" />
                    <path
                      d="M18 16L18.8581 15.1419C18.949 15.051 19 14.9278 19 14.7994V14.7994C19 14.6159 18.8963 14.4482 18.7322 14.3661L18.2893 14.1447C17.5194 13.7597 16.5894 13.9106 15.9807 14.5193L15.0858 15.4142C14.7107 15.7893 14.5 16.298 14.5 16.8284V20"
                      stroke="#fff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round" />
                    <path
                      d="M6 20L2.17574 16.1757C2.06321 16.0632 2 15.9106 2 15.7515V10.5C2 9.67157 2.67157 9 3.5 9V9C4.32843 9 5 9.67157 5 10.5V15"
                      stroke="#fff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round" />
                    <path
                      d="M6 16L5.14187 15.1419C5.05103 15.051 5 14.9278 5 14.7994V14.7994C5 14.6159 5.10366 14.4482 5.26776 14.3661L5.71067 14.1447C6.48064 13.7597 7.41059 13.9106 8.01931 14.5193L8.91421 15.4142C9.28929 15.7893 9.5 16.298 9.5 16.8284V20"
                      stroke="#fff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                </div>
                <div class="ml-4 text-base font-medium text-gray-900">Causes</div>
              </NuxtLink>
            </nav>
          </div>
        </div>
        <div class="px-5 py-6 pt-2">
          <div class="grid grid-cols-2 gap-4">
            <NuxtLink :to="localePath('/')" class="text-base font-medium text-gray-900 hover:text-gray-700">
              Home
            </NuxtLink>

            <NuxtLink :to="localePath('/about')" class="text-base font-medium text-gray-900 hover:text-gray-700">
              About
            </NuxtLink>

            <NuxtLink :to="localePath('/blog')" class="text-base font-medium text-gray-900 hover:text-gray-700">
              <span>Blogs</span>
              <span
                class="ml-3 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium leading-5 bg-primary-100 text-primary-800">
                Soon
              </span>
            </NuxtLink>

            <NuxtLink :to="localePath('/lectures')" class="text-base font-medium text-gray-900 hover:text-gray-700">
              <span>Lectures</span>
              <span
                class="ml-3 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium leading-5 bg-primary-100 text-primary-800">
                Soon
              </span>
            </NuxtLink>

            <NuxtLink :to="localePath('/faq')" class="text-base font-medium text-gray-900 hover:text-gray-700">
              FAQ
            </NuxtLink>

            <NuxtLink :to="localePath('/contact')" class="text-base font-medium text-gray-900 hover:text-gray-700">
              Contact
            </NuxtLink>

            <!-- <a href="#" class="text-base font-medium text-gray-900 hover:text-gray-700"> Events </a> -->

            <!-- <a href="#" class="text-base font-medium text-gray-900 hover:text-gray-700"> Security </a> -->
          </div>
          <div class="mt-6">
            <!-- We will use this when we have authentication -->
            <!-- <a
                href="#"
                class="flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700"
              >
                Sign up
              </a>
              <p class="mt-6 text-base font-medium text-center text-gray-500">
                Have an account?
                <a href="#" class="text-primary-600 hover:text-primary-500"> Sign in </a>
              </p> -->
            <a
              href="/#donate"
              class="flex items-center justify-center w-full px-24 py-3 text-base font-medium text-white border border-transparent rounded-md cursor-pointer bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              Donate
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronDownIcon, Menu2Icon } from 'vue-tabler-icons' // verify that this can work with vue 3 otherwise find alternatives
import { vOnClickOutside } from '@vueuse/components'
// import vClickOutside from "v-click-outside"; // replace this with vue use

const localePath = useLocalePath()

const showCauses = ref(false)
const showLearn = ref(false)
const showLanguages = ref(false)
const mobileToggle = ref(false)

const links = ref([
  { path: '/', name: 'home' },
  { path: '/about', name: 'about' },
  { path: '/campaigns', name: 'campaigns' },
  { path: '/blog', name: 'blog' },
  { path: '/contact', name: 'contact' },
])

onMounted(() => {
  //   const link = document.getElementById("nav-donate-link");
  //   $segment.trackLink(link, "Navbar Donate Button Clicked");
})

function clickOutsideLearn(e: any) {
  showLearn.value = false
}

function clickOutsideCauses(e: any) {
  showCauses.value = false
}

// const availableLocales = computed(() => {
//   return $i18n.locales.filter((i) => i.code !== $i18n.locale);
// });

// const currentLocaleName = computed(() => {
//   return $i18n.locales.filter((l) => l.code === $i18n.locale)[0].name;
// });
</script>

<style scoped>
.nuxt-link-exact-active {
  @apply cursor-default;
}
</style>
