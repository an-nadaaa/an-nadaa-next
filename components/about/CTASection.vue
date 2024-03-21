<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div>
    <div class="max-w-2xl px-4 py-16 mx-auto text-center sm:py-20 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-extrabold sm:text-4xl">
        <span class="block">{{ ctaSection.title }} </span>
      </h2>
      <p class="mt-4 text-lg leading-6 text-gray-700">{{ ctaSection.subtitle }}</p>
      <NuxtLink
        :to="localePath(ctaSection.btnUrl)"
        id="about-cta-link"
        class="inline-flex items-center justify-center w-full px-5 py-3 mt-8 text-base font-medium text-white border border-transparent rounded-md bg-primary-600 hover:bg-primary-700 sm:w-auto">
        {{ ctaSection.btnText }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useLocalePath } from '#imports';

  let localePath = useLocalePath()
  onMounted(()=>{
    // const link = document.getElementById('about-cta-link')
    // this.$segment.trackLink(link, 'About CTA Clicked')
  })

  const ctaSection = {
    "title": "Start changing lives Today. Make a lasting impact.",
    "subtitle": "We have many causes that are always open for contributions.",
    "btnText": "Explore more",
    "btnUrl": "/causes"
  };
</script>
