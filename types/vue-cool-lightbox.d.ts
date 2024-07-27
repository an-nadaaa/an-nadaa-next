// vue-cool-lightbox.d.ts

declare module 'vue-cool-lightbox' {
  import { PluginFunction } from 'vue'

  interface LightboxItem {
    src: string
    title?: string
    description?: string
  }

  interface LightboxOptions {
    overlayColor?: string
    iconColor?: string
    iconSize?: number
    hideOnOverlayClick?: boolean
    loop?: boolean
    effect?: string
    thumbnail?: boolean
    thumbnailWidth?: number
    thumbnailHeight?: number
  }

  const VueCoolLightbox: {
    install: PluginFunction<LightboxOptions>
  }

  export default VueCoolLightbox
}
