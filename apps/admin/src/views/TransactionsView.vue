<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import AppLayout from '../layouts/AppLayout.vue'
import { StatusPill, Badge, EmptyState } from '@prodigy/ui'
import { AlertCircle } from 'lucide-vue-next'
import { apiFetch } from '../composables/useApi'
import { useWebSocket } from '../composables/useWebSocket'

interface RiskReview {
  riskScore: number
  decision: string | null
}

interface TxItem {
  id: string
  type: string
  sourceCurrency: string
  sourceAmount: number
  targetCurrency: string
  targetAmount: number
  status: string
  createdAt: string
  user?: { email: string }
  riskReviews: RiskReview[]
}

interface TxResponse {
  items: TxItem[]
  total: number
}

const router = useRouter()
const route = useRoute()
const queryClient = useQueryClient()
const { events: wsEvents, connected } = useWebSocket()

const statusFilter = ref('')

// Invalidate transactions table on relevant WS events
watch(wsEvents, (newEvents) => {
  const latest = newEvents[0]
  if (latest && ['TRANSACTION_CREATED', 'TRANSACTION_COMPLETED'].includes(latest.eventName)) {
    queryClient.invalidateQueries({ queryKey: ['transactions'] })
  }
})

const { data, isLoading, isError, error, refetch } = useQuery({
  queryKey: computed(() => ['transactions', statusFilter.value]),
  queryFn: () => {
    const params = new URLSearchParams({ limit: '50', offset: '0' })
    if (statusFilter.value) params.set('status', statusFilter.value)
    return apiFetch<TxResponse>(`/api/transactions?${params.toString()}`)
  },
})

const transactions = computed(() => data.value?.items ?? [])
const total = computed(() => data.value?.total ?? 0)
const hasPanelOpen = computed(() => !!route.params.id)

function formatDate(ts: string) {
  return new Date(ts).toLocaleDateString()
}

function riskScoreClass(score: number | undefined) {
  if (score === undefined || score === null) return 'bg-slate-100 text-slate-500'
  if (score < 40) return 'bg-success-50 text-success-700'
  if (score < 70) return 'bg-warning-50 text-warning-700'
  return 'bg-danger-50 text-danger-700'
}

function getTopRiskScore(reviews: RiskReview[]): number | undefined {
  if (!reviews || reviews.length === 0) return undefined
  return reviews[0]?.riskScore
}

function typeVariant(type: string): 'default' | 'info' | 'neutral' {
  if (type === 'fiat_to_crypto') return 'info'
  if (type === 'crypto_to_fiat') return 'default'
  return 'neutral'
}
</script>

<template>
  <AppLayout :ws-connected="connected">
    <div class="flex h-full">
      <!-- Main table area -->
      <div class="flex-1 overflow-y-auto p-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h1 class="text-xl font-semibold text-slate-900">Transactions</h1>
            <p class="text-sm text-slate-500 mt-0.5">{{ total.toLocaleString() }} total</p>
          </div>
        </div>

        <!-- Filter bar -->
        <div class="flex items-center gap-3 mb-4">
          <select
            v-model="statusFilter"
            class="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="">All Statuses</option>
            <option value="created">Created</option>
            <option value="risk_checking">Risk Checking</option>
            <option value="market_executing">Market Executing</option>
            <option value="ledger_posting">Ledger Posting</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <!-- Table -->
        <div class="bg-white rounded-lg border border-slate-200 shadow-panel overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-slate-200 bg-slate-50">
                <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide align-top">ID</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide align-top">User</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide align-top">Type</th>
                <th class="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wide align-top">Amount</th>
                <th class="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wide align-top">Risk</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide align-top">Status</th>
                <th class="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wide align-top">Created</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="isLoading">
                <tr v-for="i in 8" :key="i" class="border-b border-slate-50">
                  <td v-for="j in 7" :key="j" class="px-4 py-3">
                    <div class="h-4 bg-slate-100 rounded animate-pulse" :style="`width: ${55 + ((i * j * 13) % 40)}%`" />
                  </td>
                </tr>
              </template>
              <tr v-else-if="isError">
                <td colspan="7">
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
              <tr v-else-if="transactions.length === 0">
                <td colspan="7" class="px-4 py-8 text-center text-sm text-slate-400">No transactions yet</td>
              </tr>
              <tr
                v-for="tx in transactions"
                :key="tx.id"
                class="border-b border-slate-100 even:bg-slate-50 hover:bg-brand-50 cursor-pointer transition-colors"
                :class="route.params.id === tx.id ? 'bg-brand-50' : ''"
                @click="router.push(`/transactions/${tx.id}`)"
              >
                <td class="px-4 py-3 align-top">
                  <span class="font-mono text-xs text-slate-600">{{ tx.id.slice(0, 8) }}</span>
                </td>
                <td class="px-4 py-3 align-top text-slate-700">{{ tx.user?.email ?? '—' }}</td>
                <td class="px-4 py-3 align-top">
                  <Badge :variant="typeVariant(tx.type)">{{ tx.type.replace(/_/g, ' ') }}</Badge>
                </td>
                <td class="px-4 py-3 align-top text-right text-slate-700 text-xs">
                  {{ tx.sourceAmount }} {{ tx.sourceCurrency }} → {{ tx.targetAmount }} {{ tx.targetCurrency }}
                </td>
                <td class="px-4 py-3 align-top text-right">
                  <span
                    v-if="getTopRiskScore(tx.riskReviews) !== undefined"
                    class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                    :class="riskScoreClass(getTopRiskScore(tx.riskReviews)!)"
                  >
                    {{ getTopRiskScore(tx.riskReviews) }}
                  </span>
                  <span v-else class="text-xs text-slate-400">—</span>
                </td>
                <td class="px-4 py-3 align-top"><StatusPill :status="tx.status" /></td>
                <td class="px-4 py-3 align-top text-right text-xs text-slate-500">{{ formatDate(tx.createdAt) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Side panel -->
      <RouterView v-if="hasPanelOpen" />
    </div>
  </AppLayout>
</template>
