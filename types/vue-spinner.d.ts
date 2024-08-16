declare module 'vue-spinner/src/*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{
    loading?: boolean
    color?: string
    size?: string
    margin?: string
    radius?: string
  }>
  export default component
}
