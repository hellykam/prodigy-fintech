<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import {
  TrendingUp,
  ArrowLeftRight,
  ShieldCheck,
  AlertTriangle,
  Activity,
  AlertCircle,
} from 'lucide-vue-next'
import AppLayout from '../layouts/AppLayout.vue'
import { apiFetch } from '../composables/useApi'
import { useWebSocket } from '../composables/useWebSocket'
import { StatusPill } from '@prodigy/ui'

// ── Types ────────────────────────────────────────────────────────────────────

interface Transaction {
  id: string
  status: string
  sourceAmount: number
  sourceCurrency: string
  targetAmount: number
  targetCurrency: string
  createdAt: string
  userId: string
}

interface RiskReview {
  id: string
  status: string
  riskScore: number
  transactionId?: string
  createdAt: string
  transaction?: { sourceAmount: number }
}

interface KycApplicant {
  id: string
  status: string
  createdAt: string
}

interface PriceSnapshot {
  currency: string
  midPrice: number
  bid: number
  ask: number
  spreadPct: number
  updatedAt: string
}

interface TransactionsResponse { items: Transaction[] }
interface RiskReviewsResponse { reviews: RiskReview[] }
interface KycResponse { applicants: KycApplicant[] }
interface PricesResponse { prices: PriceSnapshot[] }

// ── Composables ───────────────────────────────────────────────────────────────

const queryClient = useQueryClient()
const { events, connected } = useWebSocket()
const lastPriceUpdate = ref(new Date())

// Invalidate dashboard data on key WS events
watch(events, (newEvents) => {
  const latest = newEvents[0]
  if (!latest) return

  // Transaction events → refresh transaction stats and risk reviews
  if (['TRANSACTION_CREATED', 'TRANSACTION_COMPLETED', 'TRANSACTION_FAILED'].includes(latest.eventName)) {
    queryClient.invalidateQueries({ queryKey: ['transactions-all'] })
    queryClient.invalidateQueries({ queryKey: ['risk-reviews-all'] })
  }

  // KYC events → refresh KYC queue
  if (['KYC_SUBMITTED', 'KYC_APPROVED', 'KYC_REJECTED', 'KYC_MANUAL_REVIEW_REQUIRED'].includes(latest.eventName)) {
    queryClient.invalidateQueries({ queryKey: ['kyc-applicants-all'] })
  }

  // Risk review events → refresh risk panel
  if (['RISK_REVIEW_CREATED', 'RISK_REVIEW_RESOLVED'].includes(latest.eventName)) {
    queryClient.invalidateQueries({ queryKey: ['risk-reviews-all'] })
  }

  // Demo reset → flush all cached data so dashboard shows clean state
  if (latest.eventName === 'DEMO_RESET') {
    queryClient.invalidateQueries()
  }
})

// ── Queries ───────────────────────────────────────────────────────────────────

const { data: txData, isLoading: txLoading } = useQuery({
  queryKey: ['transactions-all'],
  queryFn: () => apiFetch<TransactionsResponse>('/api/transactions'),
  refetchInterval: 30000,
})

const { data: riskData, isLoading: riskLoading } = useQuery({
  queryKey: ['risk-reviews-all'],
  queryFn: () => apiFetch<RiskReviewsResponse>('/api/risk-reviews'),
  refetchInterval: 30000,
})

const { data: kycData, isLoading: kycLoading } = useQuery({
  queryKey: ['kyc-applicants-all'],
  queryFn: () => apiFetch<KycResponse>('/api/kyc/applicants'),
  refetchInterval: 30000,
})

const { data: pricesData } = useQuery({
  queryKey: ['market-prices'],
  queryFn: async () => {
    const result = await apiFetch<PricesResponse>('/api/market/prices')
    lastPriceUpdate.value = new Date()
    return result
  },
  refetchInterval: 5000,
})

// ── Computed metrics ──────────────────────────────────────────────────────────

const allTransactions = computed(() => txData.value?.items ?? [])
const allReviews = computed(() => riskData.value?.reviews ?? [])
const allApplicants = computed(() => kycData.value?.items ?? [])
const marketPrices = computed(() => pricesData.value?.prices ?? [])

const totalVolume = computed(() => {
  const sum = allTransactions.value
    .filter(tx => tx.status === 'completed')
    .reduce((acc, tx) => acc + tx.sourceAmount, 0)
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(sum)
})

const totalTransactions = computed(() => allTransactions.value.length)

const openReviewCount = computed(() =>
  allReviews.value.filter(r => r.status === 'open').length
)

const kycPendingCount = computed(() =>
  allApplicants.value.filter(a => a.status === 'pending' || a.status === 'manual_review').length
)

const isLoading = computed(() => txLoading.value || riskLoading.value || kycLoading.value)

// ── KPI Cards ─────────────────────────────────────────────────────────────────

const kpiCards = computed(() => [
  {
    label: 'Total Volume',
    value: isLoading.value ? '—' : totalVolume.value,
    trend: isLoading.value ? 'Loading…' : `${allTransactions.value.filter(t => t.status === 'completed').length} completed`,
    icon: TrendingUp,
    colorClass: 'text-brand-600',
    bgClass: 'bg-brand-50',
    highlight: false,
  },
  {
    label: 'Total Transactions',
    value: isLoading.value ? '—' : totalTransactions.value.toLocaleString(),
    trend: isLoading.value ? 'Loading…' : `${allTransactions.value.filter(t => t.status === 'processing').length} processing`,
    icon: ArrowLeftRight,
    colorClass: 'text-info-600',
    bgClass: 'bg-info-50',
    highlight: false,
  },
  {
    label: 'Open Reviews',
    value: isLoading.value ? '—' : openReviewCount.value.toLocaleString(),
    trend: isLoading.value ? 'Loading…' : openReviewCount.value > 0 ? 'Needs attention' : 'All clear',
    icon: AlertTriangle,
    colorClass: openReviewCount.value > 0 ? 'text-danger-600' : 'text-success-600',
    bgClass: openReviewCount.value > 0 ? 'bg-danger-50' : 'bg-success-50',
    highlight: openReviewCount.value > 0,
  },
  {
    label: 'KYC Pending',
    value: isLoading.value ? '—' : kycPendingCount.value.toLocaleString(),
    trend: isLoading.value ? 'Loading…' : kycPendingCount.value > 0 ? 'Awaiting review' : 'Queue empty',
    icon: ShieldCheck,
    colorClass: kycPendingCount.value > 0 ? 'text-warning-600' : 'text-success-600',
    bgClass: kycPendingCount.value > 0 ? 'bg-warning-50' : 'bg-success-50',
    highlight: false,
  },
])

// ── Volume bar chart ──────────────────────────────────────────────────────────

const last10 = computed(() =>
  [...allTransactions.value]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10)
    .reverse()
)

const maxAmount = computed(() =>
  Math.max(...last10.value.map(tx => tx.sourceAmount), 1)
)

function barColorClass(status: string): string {
  if (status === 'completed') return 'bg-success-500'
  if (status === 'processing') return 'bg-brand-500'
  if (status === 'failed') return 'bg-danger-500'
  return 'bg-slate-400'
}

// ── Live event feed ───────────────────────────────────────────────────────────

const liveEvents = computed(() => events.value.slice(0, 8))

function eventDotClass(status: string): string {
  if (status === 'completed') return 'bg-success-500'
  if (status === 'processing' || status === 'waiting') return 'bg-brand-500'
  if (status === 'failed' || status === 'rejected') return 'bg-danger-500'
  return 'bg-slate-400'
}

// ── Recent transactions (bottom table) ───────────────────────────────────────

const recentTxs = computed(() =>
  [...allTransactions.value]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)
)

function formatAmount(tx: Transaction): string {
  return `${tx.sourceAmount.toLocaleString()} ${tx.sourceCurrency} → ${tx.targetAmount.toLocaleString()} ${tx.targetCurrency}`
}

function formatTime(ts: string): string {
  return new Date(ts).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatPriceUpdateTime(): string {
  return lastPriceUpdate.value.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

// ── Risk Heatmap ──────────────────────────────────────────────────────────────

const reviews = computed(() => allReviews.value)

const heatmapMaxAmount = computed(() => {
  const amounts = reviews.value
    .map(r => r.transaction?.sourceAmount ?? 0)
    .filter(a => a > 0)
  return Math.max(...amounts, 1)
})

interface HeatmapDot {
  id: string
  x: number   // percentage 0-100 (risk score mapped to chart width)
  y: number   // percentage 0-100 (amount relative to max)
  colorClass: string
  title: string
}

const heatmapDots = computed<HeatmapDot[]>(() =>
  reviews.value.map(r => {
    const amount = r.transaction?.sourceAmount ?? 0
    const x = Math.min(Math.max(r.riskScore, 0), 100)
    const y = heatmapMaxAmount.value > 0
      ? Math.round((amount / heatmapMaxAmount.value) * 90)
      : 5
    const colorClass = r.status === 'approved'
      ? 'bg-success-500'
      : r.status === 'manual_review' || r.status === 'open'
        ? 'bg-warning-500'
        : 'bg-danger-500'
    const amountStr = amount > 0
      ? new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount)
      : 'N/A'
    return {
      id: r.id,
      x,
      y,
      colorClass,
      title: `Score: ${r.riskScore} | Amount: ${amountStr} | Status: ${r.status}`,
    }
  })
)

// ── Market prices ─────────────────────────────────────────────────────────────

const featuredCurrencies = ['BTC', 'ETH', 'USDT']

const displayPrices = computed(() => {
  const all = marketPrices.value
  return featuredCurrencies.map(cur => {
    const found = all.find(p => p.currency === cur)
    return {
      currency: cur,
      bid: found?.bid ?? null,
      ask: found?.ask ?? null,
    }
  })
})
</script>

<template>
  <AppLayout :ws-connected="connected">
    <div class="p-6 space-y-6">

      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-semibold text-slate-900">Operations Dashboard</h1>
          <p class="text-sm text-slate-500 mt-0.5">Real-time overview of system activity</p>
        </div>
        <div class="flex items-center gap-2 text-xs text-slate-500">
          <Activity class="inline-flex w-3.5 h-3.5" />
          <span>Refreshes every 30s</span>
        </div>
      </div>

      <!-- KPI Cards (top row) -->
      <div class="grid grid-cols-4 gap-4">
        <div
          v-for="card in kpiCards"
          :key="card.label"
          class="bg-white rounded-lg border shadow-panel p-5 transition-shadow hover:shadow-card"
          :class="card.highlight ? 'border-danger-200 ring-1 ring-danger-100' : 'border-slate-200'"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <p class="text-xs font-medium text-slate-500 uppercase tracking-wide">{{ card.label }}</p>
              <div v-if="isLoading" class="mt-1.5 h-8 w-20 bg-slate-100 rounded animate-pulse" />
          <p v-else class="mt-1.5 text-2xl font-bold text-slate-900 tabular-nums">{{ card.value }}</p>
              <p class="mt-1 text-xs" :class="card.colorClass">{{ card.trend }}</p>
            </div>
            <div class="rounded-lg p-2 flex-shrink-0" :class="card.bgClass">
              <component :is="card.icon" class="inline-flex w-4 h-4" :class="card.colorClass" />
            </div>
          </div>
        </div>
      </div>

      <!-- Middle row: Volume chart + Live event feed -->
      <div class="grid grid-cols-2 gap-6">

        <!-- Volume Bar Chart -->
        <div class="bg-white rounded-lg border border-slate-200 shadow-panel overflow-hidden">
          <div class="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
            <h2 class="text-sm font-semibold text-slate-700">Transaction Volume</h2>
            <span class="text-xs text-slate-400">Last {{ last10.length }} transactions</span>
          </div>
          <div class="p-4">
            <div v-if="last10.length > 0" class="flex items-end gap-1 h-24">
              <div
                v-for="tx in last10"
                :key="tx.id"
                class="flex-1 rounded-t-sm transition-all duration-300"
                :class="barColorClass(tx.status)"
                :style="{ height: `${Math.max((tx.sourceAmount / maxAmount) * 100, 4)}%` }"
                :title="`${tx.sourceAmount} ${tx.sourceCurrency} — ${tx.status}`"
              />
            </div>
            <div v-else class="flex items-center justify-center h-24 text-sm text-slate-400">
              No transactions to chart
            </div>
            <!-- Legend -->
            <div class="mt-3 flex items-center gap-4 text-xs text-slate-500">
              <span class="flex items-center gap-1.5">
                <span class="inline-block w-2.5 h-2.5 rounded-sm bg-success-500"></span> Completed
              </span>
              <span class="flex items-center gap-1.5">
                <span class="inline-block w-2.5 h-2.5 rounded-sm bg-brand-500"></span> Processing
              </span>
              <span class="flex items-center gap-1.5">
                <span class="inline-block w-2.5 h-2.5 rounded-sm bg-danger-500"></span> Failed
              </span>
            </div>
          </div>
        </div>

        <!-- Live Event Feed -->
        <div class="bg-white rounded-lg border border-slate-200 shadow-panel overflow-hidden">
          <div class="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <h2 class="text-sm font-semibold text-slate-700">Live Events</h2>
              <span v-if="connected" class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-500 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-success-500"></span>
              </span>
            </div>
            <span class="text-xs text-slate-400">{{ liveEvents.length }} recent</span>
          </div>
          <div class="overflow-y-auto max-h-40 divide-y divide-slate-50">
            <TransitionGroup name="event-list" tag="div">
              <div
                v-for="evt in liveEvents"
                :key="evt.id"
                class="px-4 py-2.5 flex items-start gap-3 hover:bg-slate-50 transition-colors"
              >
                <span class="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full" :class="eventDotClass(evt.status)"></span>
                <div class="min-w-0 flex-1">
                  <div class="text-xs font-medium font-mono text-slate-800">{{ evt.eventName }}</div>
                  <div class="text-xs text-slate-400 mt-0.5">
                    {{ evt.source }} <span class="text-slate-300">→</span> {{ evt.target }}
                  </div>
                </div>
                <div class="text-xs text-slate-400 flex-shrink-0 font-mono">{{ formatTime(evt.createdAt) }}</div>
              </div>
            </TransitionGroup>
            <div v-if="liveEvents.length === 0" class="px-4 py-8 text-center text-sm text-slate-400">
              Waiting for events…
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom row: Recent Transactions + Market Prices -->
      <div class="grid grid-cols-2 gap-6">

        <!-- Recent Transactions -->
        <div class="bg-white rounded-lg border border-slate-200 shadow-panel overflow-hidden">
          <div class="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
            <h2 class="text-sm font-semibold text-slate-700">Recent Transactions</h2>
            <span class="text-xs text-slate-400">Latest 5</span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-slate-100 bg-slate-50">
                  <th class="px-4 py-2.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wide align-top">ID</th>
                  <th class="px-4 py-2.5 text-right text-xs font-medium text-slate-500 uppercase tracking-wide align-top">Amount</th>
                  <th class="px-4 py-2.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wide align-top">Status</th>
                  <th class="px-4 py-2.5 text-right text-xs font-medium text-slate-500 uppercase tracking-wide align-top">Time</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="txLoading">
                  <tr v-for="i in 5" :key="i" class="border-b border-slate-50">
                    <td v-for="j in 4" :key="j" class="px-4 py-3">
                      <div class="h-4 bg-slate-100 rounded animate-pulse" :style="`width: ${55 + ((i * j * 13) % 40)}%`" />
                    </td>
                  </tr>
                </template>
                <tr
                  v-for="tx in recentTxs"
                  v-else
                  :key="tx.id"
                  class="border-b border-slate-50 even:bg-slate-50 hover:bg-brand-50 transition-colors"
                >
                  <td class="px-4 py-2.5 align-top">
                    <span class="font-mono text-xs text-slate-600">{{ tx.id.slice(0, 8) }}</span>
                  </td>
                  <td class="px-4 py-2.5 align-top text-right text-xs text-slate-700 font-mono whitespace-nowrap">{{ formatAmount(tx) }}</td>
                  <td class="px-4 py-2.5 align-top"><StatusPill :status="tx.status" /></td>
                  <td class="px-4 py-2.5 align-top text-right text-xs text-slate-500 whitespace-nowrap">{{ formatTime(tx.createdAt) }}</td>
                </tr>
                <tr v-if="recentTxs.length === 0">
                  <td colspan="4" class="px-4 py-8 text-center text-sm text-slate-400">No transactions yet</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Market Prices -->
        <div class="bg-white rounded-lg border border-slate-200 shadow-panel overflow-hidden">
          <div class="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
            <h2 class="text-sm font-semibold text-slate-700">Market Prices</h2>
            <span class="text-xs text-slate-400">Updated {{ formatPriceUpdateTime() }}</span>
          </div>
          <div class="divide-y divide-slate-50">
            <div
              v-for="price in displayPrices"
              :key="price.currency"
              class="px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-700">
                  {{ price.currency.slice(0, 2) }}
                </div>
                <span class="text-sm font-medium text-slate-800">{{ price.currency }}</span>
              </div>
              <div class="text-right">
                <div v-if="price.bid !== null" class="flex items-center gap-4">
                  <div>
                    <div class="text-xs text-slate-400">Bid</div>
                    <div class="text-sm font-mono font-semibold text-slate-800">
                      €{{ price.bid!.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
                    </div>
                  </div>
                  <div>
                    <div class="text-xs text-slate-400">Ask</div>
                    <div class="text-sm font-mono font-semibold text-slate-800">
                      €{{ price.ask !== null ? price.ask!.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—' }}
                    </div>
                  </div>
                </div>
                <div v-else class="text-xs text-slate-400">No data</div>
              </div>
            </div>
            <div v-if="displayPrices.length === 0" class="px-4 py-8 text-center text-sm text-slate-400">
              Loading prices…
            </div>
          </div>
        </div>

      </div>

      <!-- Risk Heatmap (full width) -->
      <div class="bg-white rounded-lg border border-slate-200 shadow-panel overflow-hidden">
        <div class="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
          <h2 class="text-sm font-semibold text-slate-700">Risk Heatmap</h2>
          <span class="text-xs text-slate-400">{{ reviews.length }} reviews plotted · score vs. amount</span>
        </div>
        <div class="p-4">
          <!-- Chart area -->
          <div class="flex gap-3">
            <!-- Y-axis label -->
            <div class="flex items-center justify-center" style="writing-mode: vertical-lr; transform: rotate(180deg); width: 1rem;">
              <span class="text-xs text-slate-400 tracking-wide uppercase" style="letter-spacing: 0.08em;">Amount</span>
            </div>

            <!-- Plot -->
            <div class="flex-1">
              <div
                v-if="reviews.length > 0"
                class="relative w-full h-40 rounded-lg overflow-hidden border border-slate-200"
              >
                <!-- Zone backgrounds -->
                <div class="absolute inset-y-0 left-0 bg-success-50/30" style="width: 40%;"></div>
                <div class="absolute inset-y-0 bg-warning-50/30" style="left: 40%; width: 30%;"></div>
                <div class="absolute inset-y-0 right-0 bg-danger-50/30" style="width: 30%;"></div>

                <!-- Dots -->
                <div
                  v-for="dot in heatmapDots"
                  :key="dot.id"
                  class="absolute w-3 h-3 rounded-full opacity-80 hover:opacity-100 hover:scale-125 transition-all duration-150 -translate-x-1/2"
                  :class="dot.colorClass"
                  :style="`left: ${dot.x}%; bottom: ${dot.y}%;`"
                  :title="dot.title"
                />
              </div>
              <div
                v-else
                class="flex items-center justify-center w-full h-40 rounded-lg border border-slate-200 text-sm text-slate-400"
              >
                No risk reviews to display
              </div>

              <!-- X-axis labels -->
              <div class="mt-1.5 flex text-xs text-slate-400" style="padding-left: 0;">
                <span class="text-success-600 font-medium" style="width: 40%;">Low (0–39)</span>
                <span class="text-warning-600 font-medium text-center" style="width: 30%;">Medium (40–69)</span>
                <span class="text-danger-600 font-medium text-right" style="width: 30%;">High (70+)</span>
              </div>
            </div>
          </div>

          <!-- Legend -->
          <div class="mt-3 flex items-center gap-5 text-xs text-slate-500">
            <span class="flex items-center gap-1.5">
              <span class="inline-block w-2.5 h-2.5 rounded-full bg-success-500"></span> Approved
            </span>
            <span class="flex items-center gap-1.5">
              <span class="inline-block w-2.5 h-2.5 rounded-full bg-warning-500"></span> Manual review
            </span>
            <span class="flex items-center gap-1.5">
              <span class="inline-block w-2.5 h-2.5 rounded-full bg-danger-500"></span> Rejected / High risk
            </span>
          </div>
        </div>
      </div>

    </div>
  </AppLayout>
</template>

<style scoped>
.event-list-enter-active {
  transition: all 0.3s ease;
}
.event-list-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}
.event-list-leave-active {
  transition: all 0.2s ease;
}
.event-list-leave-to {
  opacity: 0;
}
</style>
