<template>
  <section class="sysmap" aria-labelledby="sysmap-headline">
    <div class="sysmap-inner">

      <div class="sysmap-header">
        <p class="label">Live system · end to end</p>
        <h2 id="sysmap-headline" class="sysmap-headline">Every signal. Visible.</h2>
        <p class="sysmap-sub">This is the full flow. The widget talks to the backend. The backend talks to KYC, risk, and the market. The ledger records everything. Admin and partner see it all. Nothing is hidden.</p>
      </div>

      <!-- Animated flow diagram -->
      <div class="diagram-wrap" aria-label="System flow diagram: Widget to Admin" role="img">
        <!-- Scan line: pure CSS sweep, non-distracting -->
        <div class="scan-line" aria-hidden="true" />
        <div class="diagram">

          <!-- Row 1: main flow -->
          <div class="flow-row">
            <div
              v-for="(node, i) in mainFlow"
              :key="node.id"
              class="flow-node-wrap"
            >
              <div
                class="flow-node"
                :class="{ 'flow-node--active': activeNode === node.id, 'flow-node--done': doneNodes.has(node.id) }"
              >
                <span class="node-icon" aria-hidden="true">{{ node.icon }}</span>
                <span class="node-label">{{ node.label }}</span>
                <span v-if="doneNodes.has(node.id)" class="node-tick" aria-hidden="true">✓</span>
              </div>
              <!-- Connector -->
              <div v-if="i < mainFlow.length - 1" class="flow-connector">
                <div class="connector-line" />
                <div
                  class="connector-dot"
                  :class="{ 'connector-dot--active': activeConnector === i }"
                  aria-hidden="true"
                />
                <svg class="connector-arrow" viewBox="0 0 10 10" aria-hidden="true">
                  <polyline points="3,2 7,5 3,8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- Row 2: side services -->
          <div class="side-row">
            <div class="side-spacer" />
            <div class="side-branch">
              <div class="branch-line-up" aria-hidden="true" />
              <div class="side-node" :class="{ 'side-node--active': doneNodes.has('kyc') }">
                <span class="node-icon" aria-hidden="true">🪪</span>
                <span class="node-label">Sumsub KYC</span>
              </div>
            </div>
            <div class="side-spacer" />
            <div class="side-branch">
              <div class="branch-line-up" aria-hidden="true" />
              <div class="side-node" :class="{ 'side-node--active': doneNodes.has('ledger') }">
                <span class="node-icon" aria-hidden="true">📈</span>
                <span class="node-label">Market sim</span>
              </div>
            </div>
            <div class="side-spacer" />
          </div>

          <!-- Event log -->
          <div class="event-log" aria-live="polite" aria-label="Live event log">
            <div class="event-log-header">
              <span class="label">Event log</span>
              <span class="signal-dot" aria-hidden="true" />
            </div>
            <TransitionGroup name="event-list" tag="ul" class="event-list">
              <li
                v-for="evt in events"
                :key="evt.id"
                class="event-item"
              >
                <span class="evt-id font-mono">{{ evt.txn }}</span>
                <span class="evt-msg">{{ evt.msg }}</span>
                <span class="evt-time font-mono">{{ evt.time }}</span>
              </li>
            </TransitionGroup>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const mainFlow = [
  { id: 'widget', icon: '⬡', label: 'Widget' },
  { id: 'backend', icon: '⚙', label: 'Backend' },
  { id: 'kyc', icon: '✦', label: 'KYC / Risk' },
  { id: 'ledger', icon: '▦', label: 'Ledger' },
  { id: 'admin', icon: '◧', label: 'Admin' },
]

const activeNode = ref<string | null>(null)
const activeConnector = ref<number>(-1)
const doneNodes = ref<Set<string>>(new Set())

interface LogEvent { id: number; txn: string; msg: string; time: string }
const events = ref<LogEvent[]>([])
let evtId = 0

const eventMessages = [
  { node: 'widget',  msg: 'Quote requested · EUR → BTC · €500' },
  { node: 'backend', msg: 'Session opened · KYC dispatched' },
  { node: 'kyc',     msg: 'Identity verified · Risk: clear' },
  { node: 'ledger',  msg: 'Ledger posted · 0.00852 BTC credited' },
  { node: 'admin',   msg: 'Transaction complete · Partner notified' },
]

function timeStr() {
  return new Date().toLocaleTimeString('en-GB', { hour12: false })
}

function pushEvent(nodeId: string, msg: string) {
  const txnNum = String(Math.floor(8800 + Math.random() * 200))
  events.value.unshift({ id: evtId++, txn: `TXN-${txnNum}`, msg, time: timeStr() })
  if (events.value.length > 5) events.value.pop()
}

const timers: ReturnType<typeof setTimeout>[] = []

function runCycle() {
  doneNodes.value = new Set()
  activeNode.value = null
  activeConnector.value = -1

  eventMessages.forEach(({ node, msg }, i) => {
    // Activate node
    timers.push(setTimeout(() => {
      activeNode.value = node
      if (i > 0) activeConnector.value = i - 1
      pushEvent(node, msg)
    }, i * 900))

    // Mark done
    timers.push(setTimeout(() => {
      doneNodes.value = new Set([...doneNodes.value, node])
    }, i * 900 + 600))
  })

  // Restart
  timers.push(setTimeout(runCycle, eventMessages.length * 900 + 1800))
}

onMounted(() => { runCycle() })
onUnmounted(() => { timers.forEach(clearTimeout); timers.length = 0 })
</script>

<style scoped>
.sysmap {
  border-bottom: 1px solid var(--ink);
  background: #fafafa;
}

.sysmap-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.sysmap-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 52ch;
}

.sysmap-headline {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  margin: 0;
}

.sysmap-sub {
  font-size: 0.9375rem;
  color: var(--ink-mid);
  line-height: 1.65;
  margin: 0;
}

/* Diagram */
.diagram-wrap {
  border: 1.5px solid var(--ink);
  background: var(--paper);
  padding: 2.5rem 2rem;
  position: relative;
  overflow: hidden;
}

/* Horizontal scan line — sweeps left→right every 4s */
@keyframes scan-sweep {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(100vw); }
}

.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: rgba(0, 0, 0, 0.06);
  animation: scan-sweep 4s linear infinite;
  pointer-events: none;
  will-change: transform;
}

@media (prefers-reduced-motion: reduce) {
  .scan-line {
    animation: none;
    display: none;
  }
}

.diagram {
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* Main flow row */
.flow-row {
  display: flex;
  align-items: center;
  gap: 0;
}

.flow-node-wrap {
  display: flex;
  align-items: center;
  flex: 1;
}

.flow-node-wrap:last-child {
  flex: none;
}

.flow-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border: 1.5px solid var(--line);
  background: var(--paper);
  min-width: 90px;
  position: relative;
  transition: border-color 0.3s, background 0.3s;
}

.flow-node--active {
  border-color: var(--ink);
  background: #f5f5f5;
}

.flow-node--done {
  border-color: var(--ink);
}

.node-icon {
  font-size: 1.25rem;
  line-height: 1;
}

.node-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  text-align: center;
  color: var(--ink-mid);
}

.node-tick {
  position: absolute;
  top: 4px;
  right: 6px;
  font-size: 0.75rem;
  color: var(--ink);
}

/* Connector */
.flow-connector {
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
  height: 2px;
  margin: 0 -1px;
}

.connector-line {
  flex: 1;
  height: 1px;
  background: var(--line);
}

.connector-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--ink-faint);
  border: 1.5px solid var(--line);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  transition: background 0.3s, border-color 0.3s;
}

.connector-dot--active {
  background: var(--ink);
  border-color: var(--ink);
  animation: dot-travel 0.9s ease forwards;
}

@keyframes dot-travel {
  0%   { left: 10%;  opacity: 0; }
  20%  { opacity: 1; }
  80%  { opacity: 1; }
  100% { left: 90%;  opacity: 0; }
}

.connector-arrow {
  width: 10px;
  height: 10px;
  color: var(--line);
  flex-shrink: 0;
}

/* Side services row */
.side-row {
  display: flex;
  align-items: flex-start;
  padding-top: 0;
  margin-top: 0;
}

.side-spacer {
  flex: 1;
}

.side-branch {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  flex: 1;
  max-width: 120px;
}

.branch-line-up {
  width: 1px;
  height: 1.5rem;
  background: var(--line);
}

.side-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
  padding: 0.75rem;
  border: 1px dashed var(--line);
  background: #fafafa;
  min-width: 80px;
  transition: border-color 0.3s, background 0.3s;
}

.side-node--active {
  border-color: var(--ink);
  border-style: solid;
  background: var(--paper);
}

.side-node .node-label {
  font-size: 0.75rem;
}

/* Event log */
.event-log {
  margin-top: 2rem;
  border-top: 1px solid var(--line);
  padding-top: 1rem;
}

.event-log-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.signal-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #a9fe52;
  flex-shrink: 0;
  box-shadow: 0 0 4px #a9fe52;
  animation: dot-pulse 1.5s ease-in-out infinite;
}

@keyframes dot-pulse {
  0%, 100% { opacity: 0.4; transform: scale(0.8); }
  50%       { opacity: 1;   transform: scale(1);   }
}

.event-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.event-item {
  display: grid;
  grid-template-columns: 6rem 1fr 4rem;
  gap: 1rem;
  align-items: baseline;
  padding: 0.4rem 0;
  border-bottom: 1px solid var(--ink-faint);
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
}

.evt-id {
  color: var(--ink-muted);
}

.evt-msg {
  color: var(--ink);
}

.evt-time {
  color: var(--ink-muted);
  text-align: right;
}

/* TransitionGroup */
.event-list-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.event-list-enter-from {
  opacity: 0;
  transform: translateY(-6px);
}

.event-list-leave-active {
  transition: opacity 0.2s ease;
}

.event-list-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .flow-row {
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }

  .flow-node {
    min-width: 70px;
  }

  .side-row {
    display: none;
  }

  .event-item {
    grid-template-columns: 5rem 1fr;
  }

  .evt-time {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .connector-dot--active,
  .signal-dot {
    animation: none;
  }
}
</style>
