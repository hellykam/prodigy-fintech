<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Toast {
  id: number
  text: string
}

const MESSAGES = [
  'anon@acme.app converted €500 → 0.0086 BTC',
  'KYC approved in 41s — risk score 12/100',
  'Risk check cleared automatically — score 18/100',
  'Partner Acme earned €1.00 on last transaction',
  'Ledger: double-entry posted, no discrepancy',
]

const toasts = ref<Toast[]>([])
let nextId    = 0
let scheduleTimeout: ReturnType<typeof setTimeout> | null = null
const dismissTimeouts = new Map<number, ReturnType<typeof setTimeout>>()
let msgIndex  = 0

function randInterval(): number {
  // 5000–8000ms
  return 5000 + Math.random() * 3000
}

function addToast() {
  const text = MESSAGES[msgIndex % MESSAGES.length]!
  msgIndex++

  const id = nextId++
  toasts.value.push({ id, text })

  // Keep max 2 visible — dismiss oldest if needed
  if (toasts.value.length > 2) {
    dismissToast(toasts.value[0]!.id)
  }

  // Auto-dismiss after 5s — store handle so it can be cleared on unmount
  const dismissHandle = setTimeout(() => {
    dismissTimeouts.delete(id)
    dismissToast(id)
  }, 5000)
  dismissTimeouts.set(id, dismissHandle)

  // Schedule next
  scheduleTimeout = setTimeout(addToast, randInterval())
}

function dismissToast(id: number) {
  // Cancel any pending auto-dismiss if manually dismissed early
  const handle = dismissTimeouts.get(id)
  if (handle !== undefined) {
    clearTimeout(handle)
    dismissTimeouts.delete(id)
  }
  const idx = toasts.value.findIndex(t => t.id === id)
  if (idx !== -1) toasts.value.splice(idx, 1)
}

onMounted(() => {
  scheduleTimeout = setTimeout(addToast, randInterval())
})

onUnmounted(() => {
  if (scheduleTimeout) clearTimeout(scheduleTimeout)
  // Clear all pending auto-dismiss timers
  for (const handle of dismissTimeouts.values()) clearTimeout(handle)
  dismissTimeouts.clear()
})
</script>

<template>
  <div class="toast-container" aria-live="polite" aria-atomic="false" aria-label="Live activity">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast-card"
        role="status"
      >
        <span class="toast-accent" aria-hidden="true" />
        <span class="toast-text">{{ toast.text }}</span>
        <button
          class="toast-close"
          type="button"
          aria-label="Dismiss notification"
          @click="dismissToast(toast.id)"
        >
          ✕
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 24px;
  left: 24px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 8px;
  pointer-events: none;
}

.toast-card {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 12px 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  font-size: 13px;
  max-width: 320px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  pointer-events: all;
  border-left: 3px solid #22c55e;
  font-family: 'Space Mono', monospace;
  line-height: 1.5;
}

.toast-accent {
  /* Visual accent is via border-left on the card */
  display: none;
}

.toast-text {
  flex: 1;
  color: #1a1a1a;
}

.toast-close {
  background: none;
  border: none;
  cursor: pointer;
  color: #999;
  font-size: 0.75rem;
  padding: 0;
  line-height: 1;
  flex-shrink: 0;
  margin-top: 2px;
  transition: color 0.15s;
}

.toast-close:hover {
  color: #333;
}

.toast-close:focus-visible {
  outline: 2px solid #333;
  outline-offset: 2px;
  border-radius: 2px;
}

/* ── Enter/leave transitions ── */
.toast-enter-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.toast-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.toast-enter-from {
  transform: translateY(20px);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

@media (max-width: 768px) {
  .toast-container {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .toast-enter-active,
  .toast-leave-active {
    transition: none;
  }
}
</style>
