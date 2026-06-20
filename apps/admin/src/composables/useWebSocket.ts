import { ref, onMounted, onUnmounted } from 'vue'
import type { SystemEvent } from '@prodigy/types'

// ── Module-level singleton ────────────────────────────────────────────────────

let sharedWs: WebSocket | null = null
let reconnectTimer: ReturnType<typeof setTimeout> | null = null
let destroyed = false

// All per-component subscriptions receive every event
type Handler = (event: SystemEvent) => void
const handlers = new Set<Handler>()

// Shared event log (capped at 200)
const sharedEvents = ref<SystemEvent[]>([])

// Shared connected state
const sharedConnected = ref(false)

// Listeners that want to be notified when connected state changes
// (not needed externally — sharedConnected is reactive)

export function connect() {
  if (destroyed) return
  if (
    sharedWs &&
    (sharedWs.readyState === WebSocket.OPEN ||
      sharedWs.readyState === WebSocket.CONNECTING)
  ) {
    return
  }

  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
  sharedWs = new WebSocket(`${protocol}//${window.location.host}/ws`)

  sharedWs.onopen = () => {
    sharedConnected.value = true
  }

  sharedWs.onmessage = (e) => {
    try {
      const event = JSON.parse(e.data) as SystemEvent
      sharedEvents.value = [event, ...sharedEvents.value].slice(0, 200)
      handlers.forEach((h) => h(event))
    } catch {
      // ignore parse errors
    }
  }

  sharedWs.onclose = () => {
    sharedConnected.value = false
    sharedWs = null
    if (reconnectTimer) clearTimeout(reconnectTimer)
    if (!destroyed) {
      reconnectTimer = setTimeout(connect, 2000)
    }
  }

  sharedWs.onerror = () => {
    sharedWs?.close()
  }
}

// ── Composable ────────────────────────────────────────────────────────────────

export function useWebSocket(handler?: Handler) {
  if (handler) {
    handlers.add(handler)
  }

  // Ensure the singleton is running
  onMounted(() => {
    connect()
  })

  onUnmounted(() => {
    if (handler) {
      handlers.delete(handler)
    }
    // Do NOT close the shared WS — other components may still be using it
  })

  return {
    events: sharedEvents,
    connected: sharedConnected,
  }
}
