<template>
  <div class="w-full relative mx-auto">
    <ClientOnly>
      <XIcon
        v-if="props.collapsible"
        @click="closePlayer"
        class="absolute left-0 z-50 w-10 h-10 m-3 text-gray-400 cursor-pointer hover:text-gray-500" />

      <!-- todo: Figure out why it has to be imported as child component or else it doesnt work-->
      <Video
        :provider="provider"
        :show-player="showPlayer"
        :video-location="props.videoLocation"
        :video-cover="props.videoCover"
        :video-id="videoID"
        :autoplay="autoplay"></Video>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { XIcon } from 'vue-tabler-icons'
import { onBeforeMount } from 'vue'

const emitter = useEmitter()

const props = defineProps({
  showPlayer: {
    required: false,
  },
  videoLocation: {
    type: String,
    required: true,
  },
  videoCover: {
    type: String,
    required: false,
  },
  collapsible: {
    type: Boolean,
    required: false,
    default: false,
  },
  autoplay: {
    type: Boolean,
    required: false,
    default: true,
  },
})

const showPlayer = toRef(props, 'showPlayer')
const player = useVideoPlayer()
const videoID = ref('')
const provider = ref('Video')

function closePlayer() {
  player.value?.pause()
  emitter.emit('player:close')
}

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
