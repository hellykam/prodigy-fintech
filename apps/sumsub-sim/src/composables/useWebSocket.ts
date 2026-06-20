import { ref, onUnmounted } from 'vue'

export interface SystemEvent {
  id: string
  eventName: string
  entityType: string
  entityId: string
  source: string
  target: string
  status: string
  payload: Record<string, unknown>
  createdAt: string
  correlationId: string
}

export function useWebSocket() {
  const connected = ref(false)
  const events = ref<SystemEvent[]>([])

  let ws: WebSocket | null = null
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null

  function connect() {
    ws = new WebSocket('ws://' + location.host + '/ws')

    ws.onopen = () => {
      connected.value = true
    }

    ws.onmessage = (ev: MessageEvent) => {
      try {
        const event = JSON.parse(ev.data) as SystemEvent
        events.value = [event, ...events.value].slice(0, 50)
      } catch {
        // ignore non-JSON frames
      }
    }

    ws.onclose = () => {
      connected.value = false
      reconnectTimer = setTimeout(connect, 2000)
    }

    ws.onerror = () => {
      ws?.close()
    }
  }

  connect()

  onUnmounted(() => {
    if (reconnectTimer) clearTimeout(reconnectTimer)
    ws?.close()
  })

  return { connected, events }
}
