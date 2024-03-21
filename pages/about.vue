<template>
  <div>
    <StatementSection />
    <StorySection />
    <ValuesSection />
    <ShaykhSection />
    <TeamSection />
    <CTASection />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

useHead({
  title: 'Our story | An-nadaa educational foundation',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content:
        'An-nadaa project, build for your hereafter today,You can change the lives of millions by supporting educational and welfare projects of An-Nadaa',
    },
  ],
});

onMounted(()=>{
  // this.$segment.page('About')
})
</script>
