import { ref, onUnmounted } from 'vue'

// The server broadcasts SystemEvent objects — match the shape from @prodigy/types
export interface WsSystemEvent {
  id: string
  correlationId: string
  eventName: string
  entityType: string
  entityId: string
  source: string
  target: string
  status: string
  payload: Record<string, unknown>
  createdAt: string
}

type Handler = (event: WsSystemEvent) => void

// Singleton shared across all composable instances
let sharedWs: WebSocket | null = null
const handlers = new Set<Handler>()
let reconnectTimer: ReturnType<typeof setTimeout> | null = null

// Shared reactive connected state — exported so layouts can watch it
export const connected = ref(false)

function connect() {
  if (sharedWs && (sharedWs.readyState === WebSocket.OPEN || sharedWs.readyState === WebSocket.CONNECTING)) return

  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
  sharedWs = new WebSocket(`${protocol}//${window.location.host}/ws`)

  sharedWs.onopen = () => {
    connected.value = true
  }

  sharedWs.onmessage = (e) => {
    try {
      const event = JSON.parse(e.data) as WsSystemEvent
      handlers.forEach((h) => h(event))
    } catch {
      // ignore parse errors
    }
  }

  sharedWs.onclose = () => {
    connected.value = false
    sharedWs = null
    if (reconnectTimer) clearTimeout(reconnectTimer)
    reconnectTimer = setTimeout(connect, 3000)
  }

  sharedWs.onerror = () => {
    sharedWs?.close()
  }
}

export function useWebSocket(handler?: Handler) {
  if (handler) {
    handlers.add(handler)
  }
  connect()

  onUnmounted(() => {
    if (handler) {
      handlers.delete(handler)
    }
    // Do NOT close the shared WS — other components may still be using it
  })
}
