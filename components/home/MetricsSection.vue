<template>
  <div class="relative bg-gray-800">
    <div class="absolute bottom-0 w-full h-80 xl:inset-0 xl:h-full">
      <div class="w-full h-full xl:grid xl:grid-cols-2">
        <div class="h-full xl:relative xl:col-start-2">
          <img
            class="object-cover w-full h-full opacity-25 xl:absolute xl:inset-0"
            :src="metricsUrl"
            alt="People working on laptops"
          />
          <div
            aria-hidden="true"
            class="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-800 xl:inset-y-0 xl:left-0 xl:h-full xl:w-32 xl:bg-gradient-to-r"
          />
        </div>
      </div>
    </div>
    <div
      class="max-w-4xl px-4 mx-auto lg:mx-24 sm:px-6 lg:max-w-7xl lg:px-8 xl:grid xl:grid-cols-2 xl:grid-flow-col-dense xl:gap-x-8"
    >
      <div
        class="relative pt-12 pb-64 sm:pt-24 sm:pb-64 xl:col-start-1 xl:pb-24"
      >
        <h2
          class="text-sm font-semibold tracking-wide uppercase text-primary-300"
        >
          Our Achievements
        </h2>
        <h3 class="mt-3 text-5xl text-white">
          Since 2014 we have come a long way
        </h3>
        <p class="mt-5 text-lg text-gray-300">
          We are committed to making a lasting difference in the lives of
          people.
        </p>
        <div
          class="grid grid-cols-1 mt-12 justify-items-center lg:justify-items-start gap-y-12 gap-x-6 sm:grid-cols-2"
        >
          <p
            class="text-center lg:text-left"
            v-for="item in metrics"
            :key="item.id"
          >
            <span class="block font-semibold text-white text-7xl">{{
              formatNumber(item.value)
            }}</span>
            <span class="block mt-1 text-base text-gray-300"
              ><span class="font-medium text-white">{{ item.name }}</span>
              {{ item.action }}</span
            >
          </p>
        </div>
        <div class="absolute right-0 text-sm italic text-gray-300">
          *As of Sept 2021
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps(["metrics"])

const metricsUrl = ref(
  "https://images.unsplash.com/photo-1489573280374-2e193c63726c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2340&q=80"
)

function formatNumber(value: number) {
  return new Intl.NumberFormat(useI18n().locale.value, {
    notation: "compact",
  }).format(value)
}
</script>
