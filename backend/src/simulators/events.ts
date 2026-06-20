import type { SystemEvent } from '@prodigy/types'

type Subscriber = (event: SystemEvent) => void

export function makeEvent(partial: Omit<SystemEvent, 'createdAt'>): SystemEvent {
  return { ...partial, createdAt: new Date().toISOString() }
}

// In-process event bus. WebSocket server subscribes here.
// Simulators publish here.
class EventBus {
  private subscribers: Set<Subscriber> = new Set()

  subscribe(fn: Subscriber): () => void {
    this.subscribers.add(fn)
    return () => this.subscribers.delete(fn)
  }

  emit(event: SystemEvent): void {
    for (const fn of this.subscribers) {
      fn(event)
    }
  }
}

export const eventBus = new EventBus()
