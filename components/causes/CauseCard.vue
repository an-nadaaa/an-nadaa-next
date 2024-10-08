<template>
  <!-- <h1>{{ localePath.name }}</h1> -->
  <NuxtLink
    :id="`cause-link-${cause.id}`"
    class="flex flex-col overflow-hidden rounded-lg shadow-lg cursor-pointer cause-link hover:shadow-xl"
    :to="localePath(`/causes/${cause.id}`)">
    <div class="flex-shrink-0">
      <img
        class="object-cover w-full h-64"
        v-if="cause.attributes.cover.data.attributes.url"
        :src="cause.attributes.cover.data.attributes.url"
        alt="Cover image" />
    </div>

    <div class="bottom-0 flex-col justify-between flex-1 w-full p-6 bg-white bg-center bg-cover">
      <div class="flex-1">
        <span
          v-for="(tag, i) in cause.attributes.tags.data"
          :key="i"
          :class="`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-primary-100 text-primary-800  ${
            i === 0 ? '' : 'ltr:mr-4 rtl:ml-4 mx-2'
          }`">
          {{ tag.attributes.value }}
        </span>

        <div class="block mt-2">
          <p class="text-xl font-semibold text-gray-900">
            {{ cause.attributes.title }}
          </p>
          <p class="mt-3 text-base text-gray-500 line-clamp-3">
            {{ cause.attributes.description }}
          </p>
        </div>
      </div>

      <div
        v-if="cause.attributes.dynamicZone[0].goal && cause.attributes.dynamicZone[0].goal !== 0"
        class="h-2 my-3 overflow-hidden bg-gray-200 rounded-full">
        <div class="h-2 bg-yellow-400 rounded-full" :style="`width: ${percentage}%`"></div>
      </div>
      <div v-else class="inline-flex items-center my-3 text-green-800 bg-green-100 px-2.5 py-0.5 rounded-md">
        <span class="">Project </span>
        <!-- <InfoCircleIcon
          class="w-5 h-5 mx-1"
          content="Projects can either have an
        indefinite duration (always open for donations) or an indefinite cost eg: Zakat"
          v-tippy="{ placement: 'right' }" /> -->
        <InfoCircleIcon
          class="w-5 h-5 mx-1"
          content="Projects can either have an
        indefinite duration (always open for donations) or an indefinite cost eg: Zakat" />
      </div>

      <div class="flex items-center mt-6">
        <div>
          <div
            v-if="cause.attributes.dynamicZone[0].goal && cause.attributes.dynamicZone[0].goal !== 0"
            class="flex space-x-1 text-base text-gray-500">
            <span class="font-semibold">
              {{ formateAmount(cause.attributes.dynamicZone[0].raised) }}
            </span>
            <span> of </span>
            <span> {{ formateAmount(cause.attributes.dynamicZone[0].goal) }} Raised </span>
          </div>
          <div v-else-if="cause.attributes.dynamicZone[0].donation" class="flex space-x-1 text-base text-gray-500">
            <span
              >Cost of {{ cause.attributes.dynamicZone[0].donation.action }}
              {{ cause.attributes.dynamicZone[0].donation.value }}
              {{ cause.attributes.dynamicZone[0].donation.subject }}:
              {{ formateAmount(cause.attributes.dynamicZone[0].donation.cost) }}
            </span>
            <!-- <InfoCircleIcon
              class="w-5 h-5 mx-1"
              content="Some costs are to our best estimates and additional variable costs might need to be covered"
              v-tippy="{ placement: 'right' }" 
              /> -->
            <InfoCircleIcon
              class="w-5 h-5 mx-1"
              content="Some costs are to our best estimates and additional variable costs might need to be covered" />
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { InfoCircleIcon } from 'vue-tabler-icons'
import { onMounted } from 'vue'
import 'tippy.js/themes/light.css'
import 'tippy.js/themes/light-border.css'
// import "tippy.js/themes/google.css"
import 'tippy.js/themes/translucent.css'
import { computed } from 'vue'

const CURRENCY_NAME = useAppConfig().currencyName
const localePath = useLocalePath()

const props = defineProps({
  cause: {
    required: true,
    type: Object,
  },
})

onMounted(() => {
  // const link = document.getElementById(`cause-link-${this.cause.id}`)
  // this.$segment.trackLink(link, 'Cause Clicked', {
  //   title: this.cause.attributes.title,
  //   causeID: this.cause.id,
  // })
})

function formateAmount(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: CURRENCY_NAME,
  }).format(amount)
}

const percentage = computed(() => {
  return props?.cause?.attributes.dynamicZone[0].goal
    ? (props?.cause.attributes.dynamicZone[0].raised * 100) / props.cause.attributes.dynamicZone[0].goal
    : 0
})
</script>
