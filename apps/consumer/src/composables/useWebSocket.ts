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

export function useWebSocket(handler?: Handler, userId?: string) {
  const wrappedHandler: Handler | undefined = handler && userId
    ? (event: WsSystemEvent) => {
        // Pass through broadcast events (no userId) OR events matching our userId
        const eventUserId = event.payload?.userId as string | undefined
        if (!eventUserId || eventUserId === userId) {
          handler(event)
        }
      }
    : handler

  if (wrappedHandler) {
    handlers.add(wrappedHandler)
  }
  connect()

  onUnmounted(() => {
    if (wrappedHandler) {
      handlers.delete(wrappedHandler)
    }
  })
}
