<template>
  <div v-if="causes[0]" class="mx-6 mb-3 lg:mx-24">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <CauseCard v-for="(cause, i) in props.causes" :cause="cause" :key="i"></CauseCard>
    </div>
  </div>
  <div v-else class="flex justify-center p-6 mx-auto my-6 font-mono text-xl text-center">
    No campaigns. Create campaigns from the control panel
  </div>
</template>

<script setup lang="ts">
// const props = defineProps({
//   causes: {
//     type: Array<Object>,
//     required: true,
//   },
// })

// const props = withDefaults(defineProps(), {
//   causes: [],
// })

const props = defineProps(['causes'])
</script>
