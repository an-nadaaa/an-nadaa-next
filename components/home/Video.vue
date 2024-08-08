<template>
  <div>
    <Player autoplay playsinline ref="player" @vm-playback-ended="closePlayer" :style="styles">
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
})

const player = useVideoPlayer()
const emitter = useEmitter()
const { primaryColor } = useAppConfig()

const styles = computed(() => {
  return {
    '--vm-player-theme': primaryColor[500],
  }
})

function closePlayer() {
  // hide when event is fired
  emitter.emit('player:close')
}
</script>
<style></style>
