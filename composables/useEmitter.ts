import mitt from 'mitt'

export type Events = {
  // use to send errors
  error: string
  'player:close': void
  'player:open': void
}

const emitter = mitt<Events>()

export const useEmitter = () => {
  return emitter
}
