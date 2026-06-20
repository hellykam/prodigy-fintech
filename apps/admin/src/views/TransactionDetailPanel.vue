<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import { X, ArrowRight } from 'lucide-vue-next'
import { StatusPill, Badge } from '@prodigy/ui'
import { apiFetch } from '../composables/useApi'

interface LedgerEntry {
  id: string
  direction: 'debit' | 'credit'
  amount: number
  currency: string
  description: string
  ledgerAccount?: { name: string }
  createdAt: string
}

interface RiskReview {
  id: string
  riskScore: number
  decision: string | null
  decisionReason: string | null
  riskReasons: string  // JSON array string or comma-separated string from DB
}

function parseRiskReasons(raw: string): string[] {
  if (!raw) return []
  const trimmed = raw.trim()
  if (trimmed.startsWith('[')) {
    try { return JSON.parse(trimmed) as string[] } catch { /* fall through */ }
  }
  return trimmed.split(',').map(s => s.trim()).filter(Boolean)
}

interface SystemEvent {
  id: string
  eventName: string
  source: string
  target: string
  status: string
  createdAt: string
}

interface TxDetail {
  id: string
  type: string
  status: string
  sourceCurrency: string
  sourceAmount: number
  targetCurrency: string
  targetAmount: number
  createdAt: string
  user?: { email: string; kycStatus: string }
  quote?: {
    rate: number
    platformFeeAmount: number
    networkFeeAmount: number
    partnerFeeAmount: number
    spread: number
  }
  riskReviews: RiskReview[]
  ledgerEntries: LedgerEntry[]
}

interface SystemEventsResponse {
  events: SystemEvent[]
}

const router = useRouter()
const route = useRoute()

const txId = computed(() => route.params.id as string)

const { data: tx, isLoading } = useQuery({
  queryKey: computed(() => ['transaction', txId.value]),
  queryFn: () => apiFetch<TxDetail>(`/api/transactions/${txId.value}`),
  enabled: computed(() => !!txId.value),
})

const { data: eventsData } = useQuery({
  queryKey: computed(() => ['system-events', txId.value]),
  queryFn: () => apiFetch<SystemEventsResponse>(`/api/system-events?correlationId=${txId.value}`),
  enabled: computed(() => !!txId.value),
})

const systemEvents = computed(() => eventsData.value?.events ?? [])

function close() {
  router.push('/transactions')
}

function formatDateTime(ts: string) {
  return new Date(ts).toLocaleString()
}

function riskScoreClass(score: number) {
  if (score < 40) return 'text-success-600'
  if (score < 70) return 'text-warning-600'
  return 'text-danger-600'
}

const topRisk = computed(() => tx.value?.riskReviews?.[0] ?? null)

function directionVariant(dir: string): 'info' | 'success' {
  return dir.toLowerCase() === 'debit' ? 'info' : 'success'
}

function eventStatusDot(status: string) {
  if (status === 'completed') return 'bg-success-500'
  if (status === 'failed' || status === 'rejected') return 'bg-danger-500'
  if (status === 'processing') return 'bg-brand-500'
  return 'bg-slate-400'
}
</script>

<template>
  <aside
    class="w-[480px] flex-shrink-0 bg-white border-l border-slate-200 shadow-side-panel flex flex-col overflow-hidden transition-transform duration-200 ease-in-out"
  >
    <!-- Header -->
    <div class="flex items-center justify-between px-5 py-4 border-b border-slate-200 flex-shrink-0">
      <h2 class="text-base font-semibold text-slate-900">Transaction Detail</h2>
      <button
        class="inline-flex items-center justify-center w-8 h-8 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        @click="close"
      >
        <X class="inline-flex w-4 h-4" />
      </button>
    </div>

    <div v-if="isLoading" class="flex-1 flex items-center justify-center text-sm text-slate-400">
      Loading...
    </div>

    <div v-else-if="tx" class="flex-1 overflow-y-auto">
      <!-- Header info -->
      <div class="px-5 py-4 border-b border-slate-100">
        <div class="flex items-start justify-between">
          <div>
            <span class="font-mono text-xs text-slate-500">{{ tx.id }}</span>
            <div class="mt-1 flex items-center gap-2 flex-wrap">
              <StatusPill :status="tx.status" />
              <Badge variant="neutral">{{ tx.type.replace(/_/g, ' ') }}</Badge>
            </div>
          </div>
          <span class="text-xs text-slate-400">{{ formatDateTime(tx.createdAt) }}</span>
        </div>
        <div v-if="tx.user" class="mt-2 text-sm text-slate-600">
          {{ tx.user.email }}
        </div>
      </div>

      <!-- Amounts -->
      <div class="px-5 py-4 border-b border-slate-100">
        <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Amounts</h3>
        <div class="flex items-center gap-3 text-lg font-semibold text-slate-900">
          <span>{{ tx.sourceAmount }} {{ tx.sourceCurrency }}</span>
          <ArrowRight class="inline-flex w-5 h-5 text-slate-400" />
          <span>{{ tx.targetAmount }} {{ tx.targetCurrency }}</span>
        </div>
        <div v-if="tx.quote" class="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
          <div class="text-slate-500">Rate</div>
          <div class="text-right text-slate-700">{{ tx.quote.rate.toFixed(6) }}</div>
          <div class="text-slate-500">Spread</div>
          <div class="text-right text-slate-700">{{ tx.quote.spread }}%</div>
          <div class="text-slate-500">Platform Fee</div>
          <div class="text-right text-slate-700">€{{ tx.quote.platformFeeAmount.toFixed(2) }}</div>
          <div class="text-slate-500">Network Fee</div>
          <div class="text-right text-slate-700">€{{ tx.quote.networkFeeAmount.toFixed(2) }}</div>
          <div v-if="tx.quote.partnerFeeAmount > 0" class="text-slate-500">Partner Fee</div>
          <div v-if="tx.quote.partnerFeeAmount > 0" class="text-right text-slate-700">€{{ tx.quote.partnerFeeAmount.toFixed(2) }}</div>
        </div>
      </div>

      <!-- Risk Decision -->
      <div v-if="topRisk" class="px-5 py-4 border-b border-slate-100">
        <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Risk</h3>
        <div class="flex items-center gap-4">
          <div class="text-4xl font-bold" :class="riskScoreClass(topRisk.riskScore)">
            {{ topRisk.riskScore }}
          </div>
          <div>
            <div v-if="topRisk.decision" class="text-sm font-medium text-slate-700 capitalize">
              {{ topRisk.decision }}
            </div>
            <div v-if="topRisk.decisionReason" class="text-xs text-slate-500 mt-0.5">
              {{ topRisk.decisionReason }}
            </div>
          </div>
        </div>
        <div v-if="topRisk.riskReasons" class="flex flex-wrap gap-1.5 mt-3">
          <Badge
            v-for="reason in parseRiskReasons(topRisk.riskReasons)"
            :key="reason"
            variant="warning"
          >
            {{ reason.replace(/_/g, ' ') }}
          </Badge>
        </div>
      </div>

      <!-- Ledger Entries -->
      <div class="px-5 py-4 border-b border-slate-100">
        <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Ledger Entries</h3>
        <div v-if="tx.ledgerEntries.length > 0" class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-slate-100">
                <th class="py-1.5 text-left text-xs font-medium text-slate-400 align-top">Account</th>
                <th class="py-1.5 text-left text-xs font-medium text-slate-400 align-top">Dir</th>
                <th class="py-1.5 text-right text-xs font-medium text-slate-400 align-top">Amount</th>
                <th class="py-1.5 text-left text-xs font-medium text-slate-400 align-top">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="entry in tx.ledgerEntries"
                :key="entry.id"
                class="border-b border-slate-50"
              >
                <td class="py-2 align-top text-xs text-slate-600">{{ entry.ledgerAccount?.name ?? '—' }}</td>
                <td class="py-2 align-top">
                  <Badge :variant="directionVariant(entry.direction)">{{ entry.direction.toUpperCase() }}</Badge>
                </td>
                <td class="py-2 align-top text-right text-slate-700">{{ entry.amount }} {{ entry.currency }}</td>
                <td class="py-2 align-top text-xs text-slate-500">{{ entry.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="text-sm text-slate-400">No ledger entries</div>
      </div>

      <!-- Event Timeline -->
      <div class="px-5 py-4">
        <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Event Timeline</h3>
        <div v-if="systemEvents.length > 0" class="space-y-2">
          <div
            v-for="evt in systemEvents"
            :key="evt.id"
            class="flex items-start gap-3"
          >
            <div class="flex-shrink-0 mt-1.5 w-2 h-2 rounded-full" :class="eventStatusDot(evt.status)"></div>
            <div class="flex-1 min-w-0">
              <div class="text-xs font-medium text-slate-700 font-mono">{{ evt.eventName }}</div>
              <div class="text-xs text-slate-500">{{ evt.source }} → {{ evt.target }}</div>
            </div>
            <div class="text-xs text-slate-400 flex-shrink-0">{{ formatDateTime(evt.createdAt) }}</div>
          </div>
        </div>
        <div v-else class="text-sm text-slate-400">No events</div>
      </div>
    </div>
  </aside>
</template>
