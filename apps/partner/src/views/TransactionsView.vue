<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { ChevronDown, ChevronRight, X, AlertCircle } from 'lucide-vue-next'
import AppLayout from '../layouts/AppLayout.vue'
import { apiFetch } from '../composables/useApi'
import { useAuthStore } from '../stores/auth'
import { StatusPill, Card, Button, EmptyState } from '@prodigy/ui'

interface Transaction {
  id: string
  status: string
  sourceAmount: number
  sourceCurrency: string
  targetAmount: number
  targetCurrency: string
  createdAt: string
  user?: { email: string }
}

interface SystemEvent {
  id: string
  eventName: string
  createdAt: string
  payload?: Record<string, unknown>
}

const authStore = useAuthStore()
const b2bClientId = computed(() => authStore.user?.attributedToB2BClientId ?? null)
const statusFilter = ref<string>('')
const expandedTxId = ref<string | null>(null)

const { data: txData, isPending, isError, error, refetch } = useQuery({
  queryKey: ['partner-tx', b2bClientId],
  queryFn: () => apiFetch<{ items: Transaction[] }>(`/transactions?b2bClientId=${b2bClientId.value}&limit=50`),
  enabled: computed(() => !!b2bClientId.value),
})

const transactions = computed(() => txData.value?.items ?? [])

const statusOptions = computed(() => {
  const statuses = [...new Set(transactions.value.map((t) => t.status))]
  return statuses.sort()
})

const filtered = computed(() => {
  if (!statusFilter.value) return transactions.value
  return transactions.value.filter((t) => t.status === statusFilter.value)
})

const sorted = computed(() =>
  [...filtered.value].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
)

// System events for expanded row
const { data: eventsData, isPending: eventsPending } = useQuery({
  queryKey: ['system-events', expandedTxId],
  queryFn: () =>
    expandedTxId.value
      ? apiFetch<{ events: SystemEvent[] }>(`/system-events?correlationId=${expandedTxId.value}`)
      : Promise.resolve({ events: [] }),
  enabled: computed(() => !!expandedTxId.value),
})

const expandedEvents = computed(() => eventsData.value?.events ?? [])

const expandedTx = computed(() =>
  expandedTxId.value ? transactions.value.find((t) => t.id === expandedTxId.value) ?? null : null,
)

function toggleExpand(id: string) {
  expandedTxId.value = expandedTxId.value === id ? null : id
}

function formatCurrency(amount: number, currency = 'EUR') {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency }).format(amount)
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<template>
  <AppLayout>
    <div class="p-8">
      <!-- Header -->
      <div class="mb-6 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-slate-900">Transactions</h1>
          <p class="text-slate-500 text-sm mt-0.5">All payment transactions through your integration</p>
        </div>
        <div class="flex items-center gap-3">
          <div class="relative">
            <select
              v-model="statusFilter"
              class="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-sm text-slate-700 shadow-panel focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">All statuses</option>
              <option v-for="s in statusOptions" :key="s" :value="s">{{ s }}</option>
            </select>
            <ChevronDown class="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="isPending" class="bg-white rounded-xl border border-slate-100 overflow-hidden">
        <div class="h-12 bg-slate-50 border-b border-slate-100" />
        <div v-for="i in 8" :key="i" class="flex gap-4 px-5 py-3 border-b border-slate-50">
          <div class="h-4 bg-slate-100 rounded animate-pulse w-4" />
          <div class="h-4 bg-slate-100 rounded animate-pulse w-20" />
          <div class="h-4 bg-slate-100 rounded animate-pulse w-32" />
          <div class="h-4 bg-slate-100 rounded animate-pulse w-24" />
          <div class="h-4 bg-slate-100 rounded animate-pulse w-16" />
          <div class="h-4 bg-slate-100 rounded animate-pulse w-20 ml-auto" />
        </div>
      </div>

      <!-- Error state -->
      <div v-else-if="isError" class="flex flex-col items-center py-20 text-center">
        <div class="w-12 h-12 rounded-full bg-danger-50 flex items-center justify-center mb-4">
          <AlertCircle class="w-6 h-6 text-danger-500" />
        </div>
        <p class="text-slate-700 font-medium mb-1">Couldn't load data</p>
        <p class="text-slate-400 text-sm mb-4">{{ (error as Error)?.message || 'Something went wrong' }}</p>
        <button @click="refetch()" class="text-sm text-brand-600 font-medium hover:underline">Try again</button>
      </div>

      <template v-else>
        <Card class="p-0 overflow-hidden">
          <EmptyState
            v-if="sorted.length === 0"
            title="No transactions from your users yet"
            description="Transactions will appear here once your end users start trading"
            icon="📊"
          />

          <table v-else class="w-full text-sm">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-100">
                <th class="w-6 px-4 py-3" />
                <th class="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">ID</th>
                <th class="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">User</th>
                <th class="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">Amount</th>
                <th class="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">Crypto</th>
                <th class="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">Status</th>
                <th class="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="tx in sorted" :key="tx.id">
                <!-- Main row -->
                <tr
                  class="border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer"
                  @click="toggleExpand(tx.id)"
                >
                  <td class="px-4 py-3">
                    <component
                      :is="expandedTxId === tx.id ? ChevronDown : ChevronRight"
                      class="w-4 h-4 text-slate-400"
                    />
                  </td>
                  <td class="px-4 py-3">
                    <span class="font-mono text-xs text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                      {{ tx.id.slice(0, 8) }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-slate-600 text-xs">{{ tx.user?.email ?? '—' }}</td>
                  <td class="px-4 py-3 font-medium text-slate-900">
                    {{ formatCurrency(tx.sourceAmount, tx.sourceCurrency) }}
                  </td>
                  <td class="px-4 py-3">
                    <span class="text-xs font-mono font-medium text-slate-600">
                      {{ tx.targetAmount.toFixed(6) }} {{ tx.targetCurrency }}
                    </span>
                  </td>
                  <td class="px-4 py-3">
                    <StatusPill :status="tx.status" />
                  </td>
                  <td class="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">{{ formatDate(tx.createdAt) }}</td>
                </tr>

                <!-- Expanded detail row -->
                <tr v-if="expandedTxId === tx.id" class="bg-slate-50 border-b border-slate-100">
                  <td colspan="7" class="px-6 py-5">
                    <div class="grid grid-cols-2 gap-6">
                      <!-- Transaction details -->
                      <div>
                        <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Transaction Details</h3>
                        <dl class="space-y-2">
                          <div class="flex gap-2">
                            <dt class="text-xs text-slate-500 w-32 flex-shrink-0">Full ID</dt>
                            <dd class="text-xs font-mono text-slate-900 break-all">{{ tx.id }}</dd>
                          </div>
                          <div class="flex gap-2">
                            <dt class="text-xs text-slate-500 w-32 flex-shrink-0">Status</dt>
                            <dd><StatusPill :status="tx.status" /></dd>
                          </div>
                          <div class="flex gap-2">
                            <dt class="text-xs text-slate-500 w-32 flex-shrink-0">Source</dt>
                            <dd class="text-xs font-semibold text-slate-900">{{ formatCurrency(tx.sourceAmount, tx.sourceCurrency) }}</dd>
                          </div>
                          <div class="flex gap-2">
                            <dt class="text-xs text-slate-500 w-32 flex-shrink-0">Target</dt>
                            <dd class="text-xs font-mono text-slate-900">{{ tx.targetAmount }} {{ tx.targetCurrency }}</dd>
                          </div>
                          <div class="flex gap-2">
                            <dt class="text-xs text-slate-500 w-32 flex-shrink-0">User</dt>
                            <dd class="text-xs text-slate-900">{{ tx.user?.email ?? '—' }}</dd>
                          </div>
                          <div class="flex gap-2">
                            <dt class="text-xs text-slate-500 w-32 flex-shrink-0">Created</dt>
                            <dd class="text-xs text-slate-900">{{ formatDate(tx.createdAt) }}</dd>
                          </div>
                        </dl>
                      </div>

                      <!-- Event timeline -->
                      <div>
                        <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Event Timeline</h3>
                        <div v-if="eventsPending" class="flex items-center gap-2 text-slate-400 text-xs">
                          <div class="w-3 h-3 border border-slate-400 border-t-transparent rounded-full animate-spin" />
                          Loading events…
                        </div>
                        <div v-else-if="expandedEvents.length === 0" class="text-xs text-slate-400">
                          No events found for this transaction.
                        </div>
                        <ol v-else class="relative border-l border-slate-200 pl-4 space-y-3">
                          <li v-for="evt in expandedEvents" :key="evt.id">
                            <div class="absolute w-2 h-2 bg-brand-400 rounded-full -left-1 top-1" />
                            <p class="text-xs font-medium text-slate-900">{{ evt.eventName }}</p>
                            <p class="text-xs text-slate-400">{{ formatDate(evt.createdAt) }}</p>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </Card>

        <p class="text-xs text-slate-400 mt-3">
          Showing {{ sorted.length }} of {{ transactions.length }} transactions
        </p>
      </template>
    </div>
  </AppLayout>
</template>
