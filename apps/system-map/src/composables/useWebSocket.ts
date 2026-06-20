import { ref, readonly } from 'vue'

export interface SystemEvent {
  id: string
  eventName: string
  entityType: string
  entityId: string
  source: string
  target: string
  status: string
  correlationId: string
  createdAt: string
  payload: Record<string, unknown>
}

const MAX_EVENTS = 100
const RECONNECT_DELAY = 2000

const events = ref<SystemEvent[]>([])
const connected = ref(false)

let ws: WebSocket | null = null
let reconnectTimer: ReturnType<typeof setTimeout> | null = null
let initialized = false

function connect() {
  if (ws && (ws.readyState === WebSocket.CONNECTING || ws.readyState === WebSocket.OPEN)) {
    return
  }

  const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws'
  const host = window.location.host
  ws = new WebSocket(`${protocol}://${host}/ws`)

  ws.onopen = () => {
    connected.value = true
    if (reconnectTimer) {
      clearTimeout(reconnectTimer)
      reconnectTimer = null
    }
  }

  ws.onmessage = (event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data as string) as SystemEvent
      events.value = [data, ...events.value].slice(0, MAX_EVENTS)
    } catch {
      // ignore malformed messages
    }
  }

  ws.onclose = () => {
    connected.value = false
    scheduleReconnect()
  }

  ws.onerror = () => {
    connected.value = false
    ws?.close()
  }
}

function scheduleReconnect() {
  if (reconnectTimer) return
  reconnectTimer = setTimeout(() => {
    reconnectTimer = null
    connect()
  }, RECONNECT_DELAY)
}

export function useWebSocket() {
  if (!initialized) {
    initialized = true
    connect()
  }

  return {
    events: readonly(events),
    connected: readonly(connected),
  }
}
