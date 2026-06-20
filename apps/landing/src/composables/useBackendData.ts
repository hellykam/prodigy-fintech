import { ref, onMounted, onUnmounted } from 'vue'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface MarketPrice {
  currency: string
  midPrice: number
  bid: number
  ask: number
  spreadPct: number
  updatedAt: string
}

export interface LiveToast {
  id: string
  text: string
  at: string
}

interface WsMessage {
  id?: string
  correlationId?: string
  eventName?: string
  entityType?: string
  entityId?: string
  source?: string
  target?: string
  status?: string
  payload?: Record<string, unknown>
  createdAt?: string
}

// ── Constants ──────────────────────────────────────────────────────────────────

const BACKEND_HTTP = 'http://localhost:3000'
const BACKEND_WS   = 'ws://localhost:3000/ws'
const PRICES_POLL_MS  = 8_000
const TX_POLL_MS      = 15_000
const WS_RECONNECT_MS = 5_000
const WS_MAX_RETRIES  = 3
const MAX_TOASTS      = 5

// ── Composable ────────────────────────────────────────────────────────────────

export function useBackendData() {
  const prices             = ref<MarketPrice[]>([])
  const txCount            = ref<number>(0)
  const liveToasts         = ref<LiveToast[]>([])
  const isConnected        = ref<boolean>(false)
  const isBackendReachable = ref<boolean>(false)

  // ── Internal state ──────────────────────────────────────────────────────────

  let priceTimer: ReturnType<typeof setInterval> | null = null
  let txTimer:    ReturnType<typeof setInterval> | null = null
  let ws:         WebSocket | null = null
  let retryCount  = 0
  let retryTimer: ReturnType<typeof setTimeout> | null = null
  let destroyed   = false

  // ── HTTP helpers ────────────────────────────────────────────────────────────

  async function fetchPrices(): Promise<void> {
    try {
      const res = await fetch(`${BACKEND_HTTP}/api/market/prices`, {
        signal: AbortSignal.timeout(3_000),
      })
      if (!res.ok) return
      const data = await res.json() as { prices: MarketPrice[] }
      if (Array.isArray(data.prices)) {
        prices.value = data.prices
        isBackendReachable.value = true
      }
    } catch {
      // Keep last known prices — graceful degradation
    }
  }

  async function fetchTxCount(): Promise<void> {
    try {
      const res = await fetch(`${BACKEND_HTTP}/api/transactions?limit=1&offset=0`, {
        signal: AbortSignal.timeout(3_000),
      })
      if (!res.ok) return
      const data = await res.json() as { items: unknown[]; total: number }
      if (typeof data.total === 'number') {
        txCount.value = data.total
        isBackendReachable.value = true
      }
    } catch {
      // Keep last known count — graceful degradation
    }
  }

  // ── Toast helpers ───────────────────────────────────────────────────────────

  function addToast(text: string, id: string, at: string): void {
    const toast: LiveToast = { id, text, at }
    liveToasts.value = [toast, ...liveToasts.value].slice(0, MAX_TOASTS)
  }

  function handleWsMessage(msg: WsMessage): void {
    const id  = msg.id ?? crypto.randomUUID()
    const at  = msg.createdAt ?? new Date().toISOString()
    const pay = msg.payload ?? {}

    switch (msg.eventName) {
      case 'TRANSACTION_COMPLETED': {
        const src = typeof pay.sourceCurrency === 'string' ? pay.sourceCurrency : '?'
        const tgt = typeof pay.targetCurrency === 'string' ? pay.targetCurrency : '?'
        addToast(`Transaction settled: ${src} → ${tgt}`, id, at)
        break
      }
      case 'KYC_APPROVED': {
        const secs  = typeof pay.durationSeconds === 'number' ? pay.durationSeconds : null
        const score = typeof pay.riskScore       === 'number' ? pay.riskScore       : null
        const text  = secs !== null && score !== null
          ? `KYC approved in ${secs}s — risk score: ${score}/100`
          : 'KYC approved'
        addToast(text, id, at)
        break
      }
      case 'RISK_REVIEW_PASSED':
        addToast('Risk check cleared automatically', id, at)
        break
      case 'IBAN_ASSIGNED':
        addToast('Bank account created — IBAN assigned', id, at)
        break
      default:
        break
    }
  }

  // ── WebSocket ───────────────────────────────────────────────────────────────

  function connectWs(): void {
    if (destroyed) return

    try {
      ws = new WebSocket(BACKEND_WS)
    } catch {
      scheduleReconnect()
      return
    }

    ws.addEventListener('open', () => {
      isConnected.value = true
      retryCount = 0
    })

    ws.addEventListener('message', (evt: MessageEvent<string>) => {
      try {
        const msg = JSON.parse(evt.data) as WsMessage
        handleWsMessage(msg)
      } catch {
        // Ignore malformed frames
      }
    })

    ws.addEventListener('close', () => {
      isConnected.value = false
      if (!destroyed) scheduleReconnect()
    })

    ws.addEventListener('error', () => {
      // close event follows; let it handle reconnect
    })
  }

  function scheduleReconnect(): void {
    if (destroyed || retryCount >= WS_MAX_RETRIES) {
      isConnected.value = false
      return
    }
    retryCount++
    retryTimer = setTimeout(() => {
      if (!destroyed) connectWs()
    }, WS_RECONNECT_MS)
  }

  // ── Lifecycle ───────────────────────────────────────────────────────────────

  onMounted(() => {
    // Initial fetches
    fetchPrices()
    fetchTxCount()

    // Polling intervals
    priceTimer = setInterval(fetchPrices, PRICES_POLL_MS)
    txTimer    = setInterval(fetchTxCount, TX_POLL_MS)

    // WebSocket
    connectWs()
  })

  onUnmounted(() => {
    destroyed = true

    if (priceTimer) { clearInterval(priceTimer); priceTimer = null }
    if (txTimer)    { clearInterval(txTimer);    txTimer    = null }
    if (retryTimer) { clearTimeout(retryTimer);  retryTimer = null }

    if (ws) {
      ws.close()
      ws = null
    }
  })

  return { prices, txCount, liveToasts, isConnected, isBackendReachable }
}
