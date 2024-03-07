interface EventBusData {
  [eventName: string]: any;
}

export const eventBus: EventBusData = {};

export function useEventBus() {
  const emit = (eventName: string, data?: any) => {
    eventBus[eventName] = data;
  };

  const on = <TEventData>(eventName: string, callback: (data: TEventData) => void) => {
    if (!eventBus[eventName]) {
      eventBus[eventName] = [];
    }
    eventBus[eventName].push(callback);
  };

  const off = (eventName: string, callback?: (data: any) => void) => {
    if (!eventBus[eventName]) return;
    if (!callback) {
      // Remove all listeners for the event
      delete eventBus[eventName];
    } else {
      // Remove specific callback
      eventBus[eventName] = eventBus[eventName].filter((fn: Function) => fn !== callback);
    }
  };

  return {
    emit,
    on,
    off,
  };
}
