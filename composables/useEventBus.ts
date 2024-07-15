export const useEventBus = () => {
  const eventBus = useState('bus', () => '')

  const emit = (event: string) => {
    eventBus.value = event
  }

  const on = (event: string, callback: Function) => {
    return watch(eventBus, (newEvent) => {
      if (newEvent === event) {
        callback()
        eventBus.value = ''
        console.log('Event bus reset')
      }
    })
  }

  return {
    // eventBus,
    emit,
    on,
  }
}
