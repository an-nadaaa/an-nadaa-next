<template>
  <div class="w-full mx-auto">
    <ClientOnly>
      <XIcon
        v-if="showPlayer"
        @click="closePlayer"
        class="absolute right-0 z-50 w-10 h-10 m-3 text-gray-400 cursor-pointer hover:text-gray-500" />
      <Player playsinline ref="player" @vmPlaybackEnded="closePlayer" controls autoplay :style="styles">
        <!-- Provider component is placed here. -->
        <Component :is="provider" :videoId="videoID">
          <source v-if="provider === 'Video'" :data-src="videoLocation" type="video/mp4" />
        </Component>
        <DefaultUi />
      </Player>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { PRIMARY_COLOR } from '~/config/config'
import { XIcon } from 'vue-tabler-icons'
import { Player, DefaultUi } from '@vime/vue'
import { computed, onBeforeMount } from 'vue'

const eventBus = useEventBus()

// const app = getCurrentInstance()

const props = defineProps({
  showPlayer: {
    type: Boolean,
    required: true,
  },
  videoLocation: {
    type: String,
    required: true,
  },
})

const videoID = ref('')
const provider = ref('Video')
const player = ref<any | null>()
const iframeSrc = ref('')

function closePlayer() {
  // hide when event is fired
  player.value.pause()
  eventBus.emit('player:close')
}

watch(
  () => props.showPlayer,
  async (val) => {
    if (val) {
      const canAutoplay = await player.value.canAutoplay()
      if (!canAutoplay) {
        player.value.play()
      }
    }
  },
  { immediate: true }
)

// const player = computed(() => {
//   return app?.refs.player
// })

const styles = computed(() => {
  return {
    '--vm-player-theme': PRIMARY_COLOR[500],
  }
})

onBeforeMount(() => {
  // detect what provider to use
  const videoRegex = /\/media\/video\/.+\.mp4/
  // regex to detect youtube urls
  const youtubeRegex =
    /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
  // regex to detect vimeo urls
  const vimeoRegex =
    /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/

  if (videoRegex.test(props.videoLocation)) {
    provider.value = 'Video'
  } else if (youtubeRegex.test(props.videoLocation)) {
    provider.value = 'Youtube'
    // capture the video id from the regex
    if (props.videoLocation.match(youtubeRegex)) {
      videoID.value = (props.videoLocation.match(youtubeRegex) as RegExpMatchArray)[6]
    }
  } else if (vimeoRegex.test(props.videoLocation)) {
    provider.value = 'Vimeo'
    // capture the video id from the regex
    if (props.videoLocation.match(vimeoRegex)) {
      videoID.value = (props.videoLocation.match(vimeoRegex) as RegExpMatchArray)[3]
    }
  }
})

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/@vime/core@^5/themes/default.css',
    },
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/@vime/core@^5/themes/light.css',
    },
  ],
})
</script>
