<script setup lang="ts">
import { ref, computed, watch, markRaw } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Activity, Wifi, WifiOff, X } from 'lucide-vue-next'
import SystemNode from '../components/SystemNode.vue'
import { useWebSocket } from '../composables/useWebSocket'
import type { SystemEvent } from '../composables/useWebSocket'

// ── Types ─────────────────────────────────────────────────────────────────────

type NodeStatus = 'idle' | 'processing' | 'waiting' | 'completed' | 'failed' | 'rejected'

interface FlowNode {
  id: string
  type: 'custom'
  position: { x: number; y: number }
  data: {
    label: string
    icon: string
    nodeId: string
    status: NodeStatus
    lastEvent: string
  }
}

interface FlowEdge {
  id: string
  source: string
  target: string
  animated: boolean
  style?: Record<string, string>
  class?: string
}

// ── WebSocket ─────────────────────────────────────────────────────────────────

const { events: wsEvents, connected } = useWebSocket()

const localEvents = ref<SystemEvent[]>([])
const sessionEventCount = ref(0)

watch(wsEvents, (newEvents) => {
  const prev = localEvents.value.length
  // wsEvents is newest-first; pick up items that are new at the front
  const added = newEvents.length - prev
  if (added > 0) {
    // newEvents already sliced to MAX_EVENTS; grab the freshly prepended ones
    const fresh = newEvents.slice(0, added)
    localEvents.value = [...fresh, ...localEvents.value].slice(0, 100)
    sessionEventCount.value += added
    // animate each new event
    for (const ev of fresh) {
      handleNewEvent(ev)
    }
  }
}, { deep: false })

function clearEvents() {
  localEvents.value = []
}

// ── Node definitions ──────────────────────────────────────────────────────────

// Positions: logical layout as specified
// Each unit ~160px wide, 100px tall. Columns: 0=left, 1=center-left, 2=center, 3=center-right, 4=right
// Rows spaced 120px apart
const COL = [60, 240, 420, 600, 780]
const ROW = [0, 120, 240, 360, 480, 600, 720]

const initialNodes: FlowNode[] = [
  // Row 0
  { id: 'consumer-app',    type: 'custom', position: { x: COL[0] ?? 60,  y: ROW[0] ?? 0   }, data: { label: 'Consumer App',    icon: '👤', nodeId: 'consumer-app',    status: 'idle', lastEvent: '' } },
  { id: 'widget',          type: 'custom', position: { x: COL[1] ?? 240, y: ROW[0] ?? 0   }, data: { label: 'Widget',          icon: '🧩', nodeId: 'widget',          status: 'idle', lastEvent: '' } },
  { id: 'partner-portal',  type: 'custom', position: { x: COL[4] ?? 780, y: ROW[0] ?? 0   }, data: { label: 'Partner Portal',  icon: '🤝', nodeId: 'partner-portal',  status: 'idle', lastEvent: '' } },
  // Row 1
  { id: 'admin',           type: 'custom', position: { x: COL[0] ?? 60,  y: ROW[1] ?? 120 }, data: { label: 'Admin',           icon: '🛡️', nodeId: 'admin',           status: 'idle', lastEvent: '' } },
  // Row 2
  { id: 'sumsub-simulator',type: 'custom', position: { x: COL[0] ?? 60,  y: ROW[2] ?? 240 }, data: { label: 'Sumsub Sim',      icon: '🪪', nodeId: 'sumsub-simulator',status: 'idle', lastEvent: '' } },
  { id: 'backend',         type: 'custom', position: { x: COL[1] ?? 240, y: ROW[2] ?? 240 }, data: { label: 'Backend :3000',   icon: '⚙️', nodeId: 'backend',         status: 'idle', lastEvent: '' } },
  // Row 3
  { id: 'risk-engine',     type: 'custom', position: { x: COL[2] ?? 420, y: ROW[3] ?? 360 }, data: { label: 'Risk Engine',     icon: '⚙️', nodeId: 'risk-engine',     status: 'idle', lastEvent: '' } },
  // Row 4
  { id: 'market-simulator',type: 'custom', position: { x: COL[1] ?? 240, y: ROW[4] ?? 480 }, data: { label: 'Market Sim',      icon: '📈', nodeId: 'market-simulator', status: 'idle', lastEvent: '' } },
  { id: 'bank-simulator',  type: 'custom', position: { x: COL[3] ?? 600, y: ROW[4] ?? 480 }, data: { label: 'Bank Simulator',  icon: '🏦', nodeId: 'bank-simulator',  status: 'idle', lastEvent: '' } },
  // Row 5
  { id: 'ledger',          type: 'custom', position: { x: COL[2] ?? 420, y: ROW[5] ?? 600 }, data: { label: 'Ledger',          icon: '📒', nodeId: 'ledger',          status: 'idle', lastEvent: '' } },
  // Row 6
  { id: 'database',        type: 'custom', position: { x: COL[2] ?? 420, y: ROW[6] ?? 720 }, data: { label: 'Database',        icon: '🗄️', nodeId: 'database',        status: 'idle', lastEvent: '' } },
]

// ── Edge definitions ──────────────────────────────────────────────────────────

const initialEdges: FlowEdge[] = [
  { id: 'e-consumer-risk',       source: 'consumer-app',     target: 'risk-engine',      animated: false },
  { id: 'e-consumer-db',         source: 'consumer-app',     target: 'database',         animated: false },
  { id: 'e-widget-risk',         source: 'widget',           target: 'risk-engine',      animated: false },
  { id: 'e-widget-db',           source: 'widget',           target: 'database',         animated: false },
  { id: 'e-sumsub-db',           source: 'sumsub-simulator', target: 'database',         animated: false },
  { id: 'e-backend-db',           source: 'backend',          target: 'database',         animated: false },
  { id: 'e-backend-ledger',       source: 'backend',          target: 'ledger',           animated: false },
  { id: 'e-sumsub-backend',       source: 'sumsub-simulator', target: 'backend',          animated: false },
  { id: 'e-risk-admin',          source: 'risk-engine',      target: 'admin',            animated: false },
  { id: 'e-risk-market',         source: 'risk-engine',      target: 'market-simulator', animated: false },
  { id: 'e-risk-consumer',       source: 'risk-engine',      target: 'consumer-app',     animated: false },
  { id: 'e-market-ledger',       source: 'market-simulator', target: 'ledger',           animated: false },
  { id: 'e-market-consumer',     source: 'market-simulator', target: 'consumer-app',     animated: false },
  { id: 'e-bank-db',             source: 'bank-simulator',   target: 'database',         animated: false },
  { id: 'e-bank-consumer',       source: 'bank-simulator',   target: 'consumer-app',     animated: false },
  { id: 'e-ledger-db',           source: 'ledger',           target: 'database',         animated: false },
  { id: 'e-ledger-consumer',     source: 'ledger',           target: 'consumer-app',     animated: false },
  { id: 'e-admin-consumer',      source: 'admin',            target: 'consumer-app',     animated: false },
  { id: 'e-partner-db',          source: 'partner-portal',   target: 'database',         animated: false },
]

// ── Vue Flow state ────────────────────────────────────────────────────────────

const nodes = ref<FlowNode[]>(initialNodes)
const edges = ref<FlowEdge[]>(initialEdges)

// Keep the node type registry stable
const nodeTypes = { custom: markRaw(SystemNode) }

// ── Node status map ───────────────────────────────────────────────────────────

const nodeStatus = ref<Record<string, NodeStatus>>({})

// Timers to reset node status back to idle
const statusResetTimers: Record<string, ReturnType<typeof setTimeout>> = {}

function setNodeStatus(nodeId: string, status: NodeStatus) {
  nodeStatus.value = { ...nodeStatus.value, [nodeId]: status }
  // Update node data reactively
  nodes.value = nodes.value.map((n) =>
    n.id === nodeId ? { ...n, data: { ...n.data, status } } : n,
  )

  // Auto-reset non-idle statuses after 2s (except waiting — keep until resolved)
  if (status !== 'idle' && status !== 'waiting') {
    if (statusResetTimers[nodeId]) clearTimeout(statusResetTimers[nodeId])
    statusResetTimers[nodeId] = setTimeout(() => {
      setNodeStatus(nodeId, 'idle')
    }, 2000)
  }
}

// ── Edge animation helpers ────────────────────────────────────────────────────

// Map status → edge color (covers all real statuses)
function edgeColorStyle(status: string): Record<string, string> {
  switch (status) {
    case 'processing': return { stroke: '#eab308' }   // yellow-500
    case 'completed':  return { stroke: '#22c55e' }   // green-500
    case 'waiting':    return { stroke: '#f59e0b' }   // amber-500
    case 'rejected':   return { stroke: '#ef4444' }   // red-500
    case 'failed':     return { stroke: '#ef4444' }   // red-500
    case 'cancelled':  return { stroke: '#6b7280' }   // gray-500
    case 'created':    return { stroke: '#3b82f6' }   // blue-500
    default:           return { stroke: '#64748b' }   // slate-500
  }
}

// Returns true when the given edge participated in the currently selected correlation chain
function isEdgeInCorrelation(edge: FlowEdge): boolean {
  if (!selectedCorrelationId.value) return false
  return localEvents.value
    .filter((e) => e.correlationId === selectedCorrelationId.value)
    .some((e) => e.source === edge.source && e.target === edge.target)
}

const edgeAnimationTimers: Record<string, ReturnType<typeof setTimeout>> = {}

function animateEdge(source: string, target: string, status: string) {
  const edgeId = edges.value.find(
    (e) => e.source === source && e.target === target,
  )?.id
  if (!edgeId) return

  const styleMap = edgeColorStyle(status)

  edges.value = edges.value.map((e) =>
    e.id === edgeId ? { ...e, animated: true, style: styleMap } : e,
  )

  if (edgeAnimationTimers[edgeId]) clearTimeout(edgeAnimationTimers[edgeId])
  edgeAnimationTimers[edgeId] = setTimeout(() => {
    edges.value = edges.value.map((e) =>
      e.id === edgeId ? { ...e, animated: false, style: {} } : e,
    )
  }, 1500)
}

// ── MAP-002: Event-name → specific edge animation ─────────────────────────────

// These override the default source→target routing for named business events
const EVENT_EDGE_MAP: Record<string, { source: string; target: string }> = {
  MARKET_ORDER_EXECUTED:  { source: 'market-simulator', target: 'ledger' },
  BANK_ACCOUNT_CREATED:   { source: 'bank-simulator',   target: 'database' },
  TRANSACTION_COMPLETED:  { source: 'backend',          target: 'ledger' },
  KYC_APPROVED:           { source: 'sumsub-simulator', target: 'backend' },
}

// ── Handle incoming WS event ──────────────────────────────────────────────────

function handleNewEvent(ev: SystemEvent) {
  const status = ev.status as NodeStatus

  // Named-event edge override (MAP-002) — uses 'completed' color for a bright flash
  const namedEdge = EVENT_EDGE_MAP[ev.eventName]
  if (namedEdge) {
    animateEdge(namedEdge.source, namedEdge.target, 'completed')
  }

  // Always also animate the source→target from the event payload
  animateEdge(ev.source, ev.target, ev.status)

  // Update target node status
  setNodeStatus(ev.target, status)
  // Source gets "processing" while sending
  if (status === 'processing' || status === 'waiting') {
    setNodeStatus(ev.source, 'processing')
  }

  // Demo Mode badge tracking (DEM-004)
  if (ev.eventName === 'DEMO_RESET') {
    demoScenario.value = null
    if (demoScenarioClearTimer) {
      clearTimeout(demoScenarioClearTimer)
      demoScenarioClearTimer = null
    }
  } else if (ev.eventName === 'TRANSACTION_COMPLETED') {
    setDemoScenario('Buy Flow')
  } else if (ev.eventName === 'KYC_APPROVED') {
    setDemoScenario('KYC Approval')
  }
}

// ── Event inspector state ─────────────────────────────────────────────────────

const selectedCorrelationId = ref<string | null>(null)

function toggleCorrelation(correlationId: string) {
  selectedCorrelationId.value =
    selectedCorrelationId.value === correlationId ? null : correlationId
}

function isHighlighted(correlationId: string): boolean {
  return selectedCorrelationId.value === correlationId
}

// ── Display helpers ───────────────────────────────────────────────────────────

function statusDotClass(status: string): string {
  switch (status) {
    case 'processing': return 'bg-yellow-400 animate-pulse'
    case 'waiting':    return 'bg-amber-400 animate-pulse'
    case 'completed':  return 'bg-green-400'
    case 'failed':     return 'bg-red-500'
    case 'rejected':   return 'bg-red-500'
    case 'cancelled':  return 'bg-gray-500'
    case 'created':    return 'bg-blue-500'
    default:           return 'bg-slate-500'
  }
}

function formatTime(iso: string): string {
  try {
    return new Date(iso).toLocaleTimeString('en-GB', { hour12: false })
  } catch {
    return '--:--:--'
  }
}

// ── Demo Mode badge (DEM-004) ─────────────────────────────────────────────────
const demoScenario = ref<string | null>(null)
let demoScenarioClearTimer: ReturnType<typeof setTimeout> | null = null

function setDemoScenario(name: string) {
  demoScenario.value = name
  if (demoScenarioClearTimer) clearTimeout(demoScenarioClearTimer)
  demoScenarioClearTimer = setTimeout(() => { demoScenario.value = null }, 10_000)
}

// ── Inspector event list (last 50, PERF-003) ──────────────────────────────────
const inspectorEvents = computed(() => localEvents.value.slice(0, 50))

// ── Display edges — merges animated state with correlation highlighting ────────
const displayEdges = computed(() =>
  edges.value.map((edge) => ({
    ...edge,
    class: isEdgeInCorrelation(edge) ? 'edge-highlighted' : (edge.class ?? ''),
  })),
)

// Suppress unused warning for useVueFlow — imported for potential future use
void useVueFlow
</script>

<template>
  <div class="flex flex-col h-screen bg-slate-950 text-white overflow-hidden">

    <!-- Demo Mode badge (DEM-004) ────────────────────────────────────────────── -->
    <Transition name="fade">
      <div
        v-if="demoScenario"
        class="fixed top-4 right-4 z-50 bg-brand-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        &#9654; {{ demoScenario }}
      </div>
    </Transition>

    <!-- Header ──────────────────────────────────────────────────────────────── -->
    <header class="flex items-center justify-between px-6 py-3 bg-slate-900 border-b border-slate-800 flex-shrink-0">
      <div class="flex items-center gap-3">
        <Activity class="w-5 h-5 text-sky-400" />
        <span class="text-base font-semibold text-white tracking-tight">Prodigy System Map</span>
        <div class="flex items-center gap-1.5 ml-2">
          <span
            :class="[
              'w-2 h-2 rounded-full',
              connected ? 'bg-green-400 animate-pulse' : 'bg-slate-600',
            ]"
          />
          <span class="text-xs" :class="connected ? 'text-green-400' : 'text-slate-500'">
            {{ connected ? 'Connected' : 'Reconnecting…' }}
          </span>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <span class="text-xs text-slate-500">Events this session</span>
        <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-sky-900 text-sky-300">
          {{ sessionEventCount }}
        </span>
        <component
          :is="connected ? Wifi : WifiOff"
          class="w-3.5 h-3.5"
          :class="connected ? 'text-green-400' : 'text-slate-500'"
        />
        <button
          v-if="localEvents.length > 0"
          class="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors border border-slate-700 rounded px-2 py-0.5"
          @click="clearEvents"
        >
          <X class="w-3 h-3" />
          Clear
        </button>
      </div>
    </header>

    <!-- Main split ───────────────────────────────────────────────────────────── -->
    <div class="flex flex-1 overflow-hidden">

      <!-- Left 70%: Vue Flow canvas -->
      <div class="flex-1 bg-slate-950">
        <VueFlow
          :nodes="nodes"
          :edges="displayEdges"
          :node-types="nodeTypes"
          :fit-view-on-init="true"
          :zoom-on-scroll="true"
          :pan-on-drag="true"
          :nodes-draggable="true"
          class="w-full h-full"
        >
          <Background
            variant="dots"
            :gap="24"
            :size="1"
            :color="'#334155'"
          />
        </VueFlow>
      </div>

      <!-- Right 30%: Event inspector panel -->
      <aside class="w-[30%] flex-shrink-0 flex flex-col bg-white border-l border-slate-200 overflow-hidden">

        <!-- Panel header -->
        <div class="px-4 py-3 border-b border-slate-200 flex items-center justify-between flex-shrink-0">
          <p class="text-sm font-semibold text-slate-700">Event Inspector</p>
          <span class="text-xs text-slate-400">{{ inspectorEvents.length }} / 20</span>
        </div>

        <!-- Correlation filter notice -->
        <div
          v-if="selectedCorrelationId"
          class="px-4 py-2 bg-amber-50 border-b border-amber-200 flex items-center justify-between flex-shrink-0"
        >
          <span class="text-xs text-amber-700">
            Chain: <span class="font-mono">{{ selectedCorrelationId.slice(0, 12) }}…</span>
          </span>
          <button
            class="text-xs text-amber-600 hover:text-amber-900 underline"
            @click="selectedCorrelationId = null"
          >
            clear
          </button>
        </div>

        <!-- Event list -->
        <div class="flex-1 overflow-y-auto">
          <div v-if="inspectorEvents.length === 0" class="flex items-center justify-center h-full">
            <div class="text-center px-6">
              <Activity class="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p class="text-sm text-slate-400">Waiting for events…</p>
              <p class="text-xs text-slate-300 mt-1">Events will appear here in real time</p>
            </div>
          </div>

          <TransitionGroup name="event-list" tag="div" class="divide-y divide-slate-100">
            <button
              v-for="ev in inspectorEvents"
              :key="ev.id"
              type="button"
              :class="[
                'w-full text-left px-4 py-3 transition-all duration-200 cursor-pointer',
                isHighlighted(ev.correlationId)
                  ? 'bg-amber-50 ring-2 ring-amber-300 ring-inset'
                  : 'hover:bg-slate-50',
              ]"
              @click="toggleCorrelation(ev.correlationId)"
            >
              <!-- Row 1: dot + eventName + time -->
              <div class="flex items-center gap-2">
                <span :class="['w-2 h-2 rounded-full flex-shrink-0', statusDotClass(ev.status)]" />
                <span class="font-mono text-xs text-slate-800 flex-1 truncate">{{ ev.eventName }}</span>
                <span class="font-mono text-[10px] text-slate-400 flex-shrink-0">{{ formatTime(ev.createdAt) }}</span>
              </div>
              <!-- Row 2: source → target -->
              <p class="mt-1 text-xs text-slate-500 pl-4 truncate">
                {{ ev.source }} → {{ ev.target }}
              </p>
              <!-- Row 3: correlationId chip -->
              <div class="mt-1 pl-4">
                <span class="inline-block font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">
                  {{ ev.correlationId.slice(0, 10) }}
                </span>
              </div>
            </button>
          </TransitionGroup>
        </div>
      </aside>
    </div>
  </div>
</template>

<style>
/* Vue Flow needs this CSS for the canvas to render correctly */
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';

/* Event list transition */
.event-list-enter-active { transition: all 0.2s ease-out; }
.event-list-enter-from   { opacity: 0; transform: translateY(-8px); }
.event-list-leave-active { position: absolute; transition: none; }

/* Correlation-chain edge highlight */
.edge-highlighted .vue-flow__edge-path {
  stroke: #0ea5e9 !important;
  stroke-width: 4px !important;
}

/* Demo badge fade transition */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
