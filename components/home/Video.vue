<template>
  <div>
    <Player playsinline ref="player" @vm-buffered-change="play" @vm-playback-ended="closePlayer" :style="styles">
      <Video :poster="props.videoCover">
        <source :data-src="props.videoLocation" type="video/mp4" />
      </Video>

      <DefaultUi />
    </Player>
  </div>
</template>
<script setup lang="ts">
import { Player, Video, DefaultUi } from '@vime/vue-next'
// import video from '~/assets/media/video/What-Is-An-Nadaa.mp4'
// import videoCover from '~/assets/media/img/VideoCover.png'
import '@vime/core/themes/default.css'

// const props = defineProps(['player'])
const props = defineProps({
  autoplay: {
    type: Boolean,
    required: false,
    default: true,
  },
  videoCover: {
    type: String,
    required: false,
    default: null,
  },
  videoLocation: {
    type: String,
    required: true,
  },
  showPlayer: {
    type: Object,
    required: true,
  },
})

const showPlayer = toRef(props, 'showPlayer')
const player = useVideoPlayer()
const emitter = useEmitter()
const { primaryColor } = useAppConfig()
const firstLoad = ref(true)

const styles = computed(() => {
  return {
    '--vm-player-theme': primaryColor[500],
  }
})

function closePlayer() {
  // hide when event is fired
  emitter.emit('player:close')
}

function play() {
  if (!props.autoplay) return
  if (props.autoplay && firstLoad.value) {
    setTimeout(() => {
      player.value?.play()
      firstLoad.value = false
    }, 500)
  }
}

watch(showPlayer, (val) => {
  if (!props.autoplay) return

  if (!val) {
    player.value?.pause()
    return
  }
  if (firstLoad.value) {
    return
  } else player.value?.play()
})
</script>
<style></style>
