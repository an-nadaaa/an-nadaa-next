<template>
  <div class="mt-24 sm:mt-12">
    <div class="bg-gray-800 sm:bg-white sm:overflow-hidden sm:pt-60 pt-14">
      <div class="bg-gray-800 sm:mx-0 sm:px-6">
        <div class="max-w-7xl sm:px-6 lg:px-8">
          <div class="relative pt-16 pb-16 sm:pb-24">
            <div class="sm:w-1/2">
              <div class="mx-auto">
                <Flicking class="" :options="{ circular: true }" :plugins="plugins">
                  <div class="slide" v-for="testimonial in testimonials" :key="testimonial.testimony">
                    <svg
                      class="w-12 h-12 text-white opacity-25"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                      aria-hidden="true">
                      <path
                        d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p class="mt-6 text-2xl font-medium text-white">
                      {{ testimonial.testimony }}
                    </p>
                    <footer class="mt-6">
                      <p class="text-base font-medium text-primary-500">
                        {{ testimonial.title }}
                      </p>
                      <p class="text-base font-medium text-indigo-100">
                        {{ testimonial.name }}
                      </p>
                    </footer>
                  </div>
                  <template #viewport>
                    <div class="flicking-pagination text-white">Testing</div>
                  </template>
                </Flicking>
              </div>
            </div>

            <div
              class="absolute hidden transform -translate-x-1/2 sm:block sm:-top-40 left-1/2 -top-40 sm:translate-x-0">
              <div class="flex ml-24 space-x-6 min-w-max sm:ml-3 lg:space-x-8">
                <div class="flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                  <div class="flex-shrink-0">
                    <img
                      class="object-cover w-64 h-64 rounded-lg md:h-72 md:w-72"
                      :src="images[0].url"
                      :alt="images[0].alt" />
                  </div>

                  <div class="flex-shrink-0 mt-6 sm:mt-0">
                    <img
                      class="object-cover w-64 h-64 rounded-lg md:h-72 md:w-72"
                      :src="images[1].url"
                      :alt="images[1].alt" />
                  </div>
                </div>
                <div class="flex space-x-6 sm:-mt-20 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                  <div class="flex-shrink-0">
                    <img
                      class="object-cover w-64 h-64 rounded-lg md:h-72 md:w-72"
                      :src="images[2].url"
                      :alt="images[2].alt" />
                  </div>

                  <div class="flex-shrink-0 mt-6 sm:mt-0">
                    <img
                      class="object-cover w-64 h-64 rounded-lg md:h-72 md:w-72"
                      :src="images[3].url"
                      :alt="images[3].alt" />
                  </div>
                </div>
                <div class="flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                  <div class="flex-shrink-0">
                    <img
                      class="object-cover w-64 h-64 rounded-lg md:h-72 md:w-72"
                      :src="images[4].url"
                      :alt="images[4].alt" />
                  </div>

                  <div class="flex-shrink-0 mt-6 sm:mt-0">
                    <img
                      class="object-cover w-64 h-64 rounded-lg md:h-72 md:w-72"
                      :src="images[5].url"
                      :alt="images[5].alt" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Flicking from '@egjs/vue3-flicking'
import img1 from 'assets/media/img/1.png'
import img2 from 'assets/media/img/2.png'
import img3 from 'assets/media/img/3.png'
import img4 from 'assets/media/img/4.png'
import img5 from 'assets/media/img/5.png'
import img6 from 'assets/media/img/6.png'
import { Pagination } from '@egjs/flicking-plugins'

const plugins = [new Pagination({ type: 'bullet' })]

const props = defineProps(['testimonials'])
const testimonials = ref(props.testimonials)

const images = [
  {
    url: img1,
    alt: '',
  },
  {
    url: img2,
    alt: '',
  },
  {
    url: img3,
    alt: '',
  },
  {
    url: img4,
    alt: '',
  },
  {
    url: img5,
    alt: '',
  },
  {
    url: img6,
    alt: '',
  },
  {
    url: img1,
    alt: '',
  },
]
</script>

<style>
@import url('~/node_modules/@egjs/vue3-flicking/dist/flicking.css');
@import url('~/node_modules/@egjs/flicking-plugins/dist/flicking-plugins.css');

.flicking-pagination-bullet {
  @apply bg-white hover:bg-primary-300;
}

.flicking-pagination-bullet-active {
  @apply bg-primary-500;
}

.slide {
  /* font-size: 100px; */
  @apply w-full mr-8 py-8  px-4 sm:px-0 text-4xl;
}

.hooper-pagination {
  @apply top-56;
}
</style>
