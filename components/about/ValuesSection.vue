<template>
  <div class="relative py-16 bg-white sm:py-24 lg:py-32">
    <div class="max-w-md px-4 mx-auto text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 class="text-base font-semibold tracking-wider uppercase text-primary-600">
        {{ valueSection.title }}
      </h2>
      <h3 class="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        {{ valueSection.subtitle }}
      </h3>
      <p class="mx-auto mt-5 text-xl text-gray-500 max-w-prose">
        <!-- {{ valueSection.description }} -->
        We are committed to improving the lives of others. We believe that education is the key to a brighter future.
      </p>
      <div class="mt-12">
        <div v-if="features.length > 0" class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="feature in features" :key="feature.title" class="pt-6">
            <div class="flow-root px-6 pb-8 rounded-lg bg-gray-50">
              <div class="-mt-6">
                <div>
                  <span
                    class="inline-flex items-center justify-center p-3 rounded-md shadow-lg text-primary-500 bg-primary-100">
                    <component :is="feature.icon" class="w-6 h-6" aria-hidden="true" />
                  </span>
                </div>
                <h3 class="mt-8 text-lg font-medium tracking-tight text-gray-900">
                  {{ feature.title }}
                </h3>
                <p class="mt-5 text-base text-gray-500">
                  {{ feature.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as VALUE_SECTION from '~/content/site/about/value_section.json'
import { BookIcon, LockAccessIcon, UserPlusIcon } from 'vue-tabler-icons'

const valueSection = VALUE_SECTION.en
const features = [
  {
    icon: LockAccessIcon,
    title: 'Amanah',
    description: 'Amanah (trustworthiness) in every step of what we do',
  },
  {
    icon: BookIcon,
    title: 'Tarbiyyah',
    description: 'Tarbiyyah of the community through the pure teachings of Quran & Sunnah',
  },
  {
    icon: UserPlusIcon,
    title: 'Community',
    description: 'Community empowerment through self sufficiency.',
  },
]
</script>
