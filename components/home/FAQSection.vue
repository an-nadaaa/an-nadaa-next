<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div>
    <div class="px-4 py-12 mx-auto max-w-7xl sm:py-16 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto divide-y-2 divide-gray-200">
        <h2 class="text-3xl text-center text-gray-900 sm:text-4xl">
          Frequently asked questions
        </h2>
        <dl class="mt-16 space-y-6 divide-y divide-gray-200">
          <div class="pt-6" v-for="(question, i) in faqs" :key="i">
            <dt class="text-lg">
              <!-- Expand/collapse question button -->
              <button
                type="button"
                class="flex items-start justify-between w-full text-left text-gray-400"
                :aria-controls="`faq-${i}`"
                aria-expanded="false"
                @click="switchIndex(i)"
              >
                <span class="font-medium text-gray-900">
                  {{ question.question }}
                </span>
                <span class="flex items-center ml-6 h-7">
                  <Component
                    :is="currentIndex(i) ? 'CircleMinusIcon' : 'CirclePlusIcon'"
                    class="w-6 h-6 text-primary-600"
                  />
                </span>
              </button>
            </dt>
            <dd v-show="currentIndex(i)" class="pr-12 mt-2" id="faq-0">
              <div
                class="text-base prose text-gray-500"
                v-html="answer(i)"
              ></div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { marked } from "marked"
import sanitizeHtml from "sanitize-html"

type FAQ = {
  question: string
  answer: string
}

const props = defineProps({
  faqs: {
    type: Array<FAQ>,
    required: true,
  },
})

const current = ref(0)

const switchIndex = (i: number) => {
  current.value = i
  // this.$segment.track('FAQ clicked', { q: this.faqs[i].question })
}

const currentIndex = (i: number) => {
  return i === current.value
}

const answer = async (i: number) => {
  return sanitizeHtml(await marked.parse(props.faqs[i].answer))
}
</script>
