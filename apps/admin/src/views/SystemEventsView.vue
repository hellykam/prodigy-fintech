<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { ArrowRight, AlertCircle } from 'lucide-vue-next'
import AppLayout from '../layouts/AppLayout.vue'
import { apiFetch } from '../composables/useApi'
import { useWebSocket } from '../composables/useWebSocket'
import type { SystemEvent } from '@prodigy/types'

interface SystemEventsResponse {
  events: SystemEvent[]
}

const { events: wsEvents, connected } = useWebSocket()
const realtimeEvents = ref<SystemEvent[]>([])
const searchQuery = ref('')
const statusFilter = ref('')

// Load initial events
const { data, isLoading, isError, error, refetch } = useQuery({
  queryKey: ['system-events-all'],
  queryFn: () => apiFetch<SystemEventsResponse>('/api/system-events'),
})

const initialEvents = computed(() => data.value?.events ?? [])

// Merge WS events (prepend) with initial load
const allEvents = computed(() => {
  const ids = new Set(initialEvents.value.map((e) => e.id))
  const newOnes = realtimeEvents.value.filter((e) => !ids.has(e.id))
  return [...newOnes, ...initialEvents.value]
})

// Filtered events
const filteredEvents = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  const s = statusFilter.value
  return allEvents.value.filter((evt) => {
    const matchesStatus = s ? evt.status === s : true
    const matchesSearch = q
      ? evt.eventName.toLowerCase().includes(q) ||
        evt.source.toLowerCase().includes(q) ||
        evt.target.toLowerCase().includes(q) ||
        (evt.correlationId ?? '').toLowerCase().includes(q) ||
        (evt.entityId ?? '').toLowerCase().includes(q)
      : true
    return matchesStatus && matchesSearch
  })
})

// Watch ws events and prepend new ones
watch(
  wsEvents,
  (newEvents) => {
    if (newEvents.length > 0) {
      realtimeEvents.value = newEvents.slice(0, 100)
    }
  },
  { immediate: true },
)

function eventStatusDotClass(status: string) {
  if (status === 'completed') return 'bg-success-500'
  if (status === 'failed' || status === 'rejected') return 'bg-danger-500'
  if (status === 'processing') return 'bg-brand-500 animate-pulse'
  if (status === 'waiting') return 'bg-warning-500'
  return 'bg-slate-400'
}

function formatDateTime(ts: string) {
  return new Date(ts).toLocaleString()
}
</script>

<template>
  <AppLayout :ws-connected="connected">
    <div class="p-6">
      <div class="flex items-center gap-3 mb-4">
        <div>
          <h1 class="text-xl font-semibold text-slate-900">System Events</h1>
          <p class="text-sm text-slate-500 mt-0.5">Real-time event stream · {{ filteredEvents.length }} events</p>
        </div>
        <span v-if="connected" class="relative flex h-2.5 w-2.5">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-500 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-success-500"></span>
        </span>
      </div>

      <!-- Filter bar -->
      <div class="flex items-center gap-3 mb-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by event name, source, target, or correlation ID…"
          class="h-9 w-80 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <select
          v-model="statusFilter"
          class="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="">All Statuses</option>
          <option value="processing">Processing</option>
          <option value="waiting">Waiting</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div class="bg-white rounded-lg border border-slate-200 shadow-panel overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-slate-200 bg-slate-50">
              <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide align-top w-6"></th>
              <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide align-top">Event</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide align-top">Flow</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide align-top">Correlation ID</th>
              <th class="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wide align-top">Time</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="isLoading">
              <tr v-for="i in 8" :key="i" class="border-b border-slate-50">
                <td v-for="j in 5" :key="j" class="px-4 py-3">
                  <div class="h-4 bg-slate-100 rounded animate-pulse" :style="`width: ${55 + ((i * j * 13) % 40)}%`" />
                </td>
              </tr>
            </template>
            <tr v-else-if="isError">
              <td colspan="5">
                <div class="flex flex-col items-center py-16 text-center">
                  <div class="w-12 h-12 rounded-full bg-danger-50 flex items-center justify-center mb-4">
                    <AlertCircle class="w-6 h-6 text-danger-500" />
                  </div>
                  <p class="text-slate-700 font-medium mb-1">Couldn't load data</p>
                  <p class="text-slate-400 text-sm mb-4">{{ (error as Error)?.message || 'Something went wrong' }}</p>
                  <button @click="refetch()" class="text-sm text-brand-600 font-medium hover:underline">Try again</button>
                </div>
              </td>
            </tr>
            <tr v-else-if="filteredEvents.length === 0">
              <td colspan="5" class="px-4 py-8 text-center text-sm text-slate-400">
                <span v-if="searchQuery || statusFilter">No events match your filters</span>
                <span v-else class="inline-flex items-center gap-2">
                  No events yet — waiting for activity…
                  <span class="inline-block w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                </span>
              </td>
            </tr>
            <tr
              v-else
              v-for="evt in filteredEvents"
              :key="evt.id"
              class="border-b border-slate-100 even:bg-slate-50"
            >
              <td class="px-4 py-3 align-top">
                <span class="inline-flex w-2 h-2 rounded-full mt-1" :class="eventStatusDotClass(evt.status)"></span>
              </td>
              <td class="px-4 py-3 align-top font-mono text-xs text-slate-700">{{ evt.eventName }}</td>
              <td class="px-4 py-3 align-top">
                <span class="inline-flex items-center gap-1.5 text-xs text-slate-600">
                  {{ evt.source }}
                  <ArrowRight class="inline-flex w-3 h-3 text-slate-400" />
                  {{ evt.target }}
                </span>
              </td>
              <td class="px-4 py-3 align-top">
                <span class="font-mono text-xs text-slate-500">{{ (evt.correlationId ?? '').slice(0, 12) }}...</span>
              </td>
              <td class="px-4 py-3 align-top text-right text-xs text-slate-500">{{ formatDateTime(evt.createdAt) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </AppLayout>
</template>
