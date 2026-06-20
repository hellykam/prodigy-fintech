<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { AlertCircle } from 'lucide-vue-next'
import AppLayout from '../layouts/AppLayout.vue'
import { EmptyState } from '@prodigy/ui'
import { apiFetch } from '../composables/useApi'
import { useWebSocket } from '../composables/useWebSocket'

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
}

interface TxResponse {
  items: TxItem[]
  total: number
}

interface LedgerRow {
  txId: string
  date: string
  entryType: 'DEBIT' | 'CREDIT'
  account: string
  amount: number
  currency: string
  status: string
  user: string
}

const { connected } = useWebSocket()
const searchQuery = ref('')

const { data, isLoading, isError, error, refetch } = useQuery({
  queryKey: ['ledger-transactions'],
  queryFn: () => apiFetch<TxResponse>('/api/transactions?limit=100&offset=0'),
  refetchInterval: 30_000,
})

const rows = computed<LedgerRow[]>(() => {
  const items = data.value?.items ?? []
  const result: LedgerRow[] = []
  for (const tx of items) {
    // Source side → DEBIT (money leaving source account)
    result.push({
      txId: tx.id,
      date: tx.createdAt,
      entryType: 'DEBIT',
      account: tx.sourceCurrency,
      amount: tx.sourceAmount,
      currency: tx.sourceCurrency,
      status: tx.status,
      user: tx.user?.email ?? '—',
    })
    // Target side → CREDIT (money arriving at target account)
    result.push({
      txId: tx.id,
      date: tx.createdAt,
      entryType: 'CREDIT',
      account: tx.targetCurrency,
      amount: tx.targetAmount,
      currency: tx.targetCurrency,
      status: tx.status,
      user: tx.user?.email ?? '—',
    })
  }
  return result
})

const filteredRows = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return rows.value
  return rows.value.filter(
    (r) =>
      r.txId.toLowerCase().includes(q) ||
      r.user.toLowerCase().includes(q) ||
      r.account.toLowerCase().includes(q) ||
      r.currency.toLowerCase().includes(q),
  )
})

function formatDateTime(ts: string) {
  return new Date(ts).toLocaleString()
}

function entryTypeClass(type: 'DEBIT' | 'CREDIT') {
  return type === 'DEBIT'
    ? 'bg-info-50 text-info-700 border border-info-200'
    : 'bg-success-50 text-success-600 border border-success-500'
}

function statusDot(status: string) {
  if (status === 'completed') return 'bg-success-500'
  if (status === 'failed' || status === 'rejected') return 'bg-danger-500'
  return 'bg-slate-400'
}
</script>

<template>
  <AppLayout :ws-connected="connected">
    <div class="p-6">
      <!-- Header -->
      <div class="flex items-center justify-between mb-4">
        <div>
          <h1 class="text-xl font-semibold text-slate-900">Ledger</h1>
          <p class="text-sm text-slate-500 mt-0.5">
            Double-entry view — {{ (data?.total ?? 0).toLocaleString() }} transactions
            &nbsp;·&nbsp; {{ filteredRows.length.toLocaleString() }} entries
          </p>
        </div>
      </div>

      <!-- Search -->
      <div class="flex items-center gap-3 mb-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by transaction ID, user, or currency…"
          class="h-9 w-72 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>

      <!-- Table -->
      <div class="bg-white rounded-lg border border-slate-200 shadow-panel overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-slate-200 bg-slate-50">
              <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide align-top">Date</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide align-top">Entry Type</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide align-top">Account</th>
              <th class="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wide align-top">Amount</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide align-top">Currency</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide align-top">User</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide align-top">Status</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide align-top">Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="isLoading">
              <tr v-for="i in 8" :key="i" class="border-b border-slate-50">
                <td v-for="j in 8" :key="j" class="px-4 py-3">
                  <div class="h-4 bg-slate-100 rounded animate-pulse" :style="`width: ${55 + ((i * j * 13) % 40)}%`" />
                </td>
              </tr>
            </template>
            <tr v-else-if="isError">
              <td colspan="8">
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
            <template v-for="(row, i) in filteredRows" v-else :key="`${row.txId}-${row.entryType}`">
              <!-- Thin divider between transaction pairs -->
              <tr
                v-if="i > 0 && i % 2 === 0"
                class="h-px bg-slate-100"
              >
                <td colspan="8" class="p-0"></td>
              </tr>
              <tr
                class="border-b border-slate-100 hover:bg-brand-50 transition-colors"
                :class="row.entryType === 'CREDIT' ? 'bg-slate-50/60' : ''"
              >
                <td class="px-4 py-2.5 align-top text-xs text-slate-500 whitespace-nowrap">
                  {{ formatDateTime(row.date) }}
                </td>
                <td class="px-4 py-2.5 align-top">
                  <span
                    class="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold"
                    :class="entryTypeClass(row.entryType)"
                  >
                    {{ row.entryType }}
                  </span>
                </td>
                <td class="px-4 py-2.5 align-top text-slate-700 font-medium text-xs">{{ row.account }}</td>
                <td class="px-4 py-2.5 align-top text-right font-mono text-slate-800 text-xs">
                  {{ row.amount.toLocaleString() }}
                </td>
                <td class="px-4 py-2.5 align-top text-slate-600 text-xs">{{ row.currency }}</td>
                <td class="px-4 py-2.5 align-top text-slate-600 text-xs">{{ row.user }}</td>
                <td class="px-4 py-2.5 align-top">
                  <span class="inline-flex items-center gap-1.5 text-xs text-slate-500">
                    <span class="w-2 h-2 rounded-full flex-shrink-0" :class="statusDot(row.status)"></span>
                    {{ row.status.replace(/_/g, ' ') }}
                  </span>
                </td>
                <td class="px-4 py-2.5 align-top">
                  <span class="font-mono text-xs text-slate-500">{{ row.txId.slice(0, 8) }}</span>
                </td>
              </tr>
            </template>
            <tr v-if="!isLoading && !isError && filteredRows.length === 0">
              <td colspan="8" class="px-4 py-8 text-center text-sm text-slate-400">
                {{ searchQuery ? 'No entries match your search' : 'No ledger entries' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </AppLayout>
</template>
