<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import { useAuthStore } from '@/stores/auth'
import { fetchTransactions } from '@/composables/useApi'
import type { Transaction } from '@/composables/useApi'
import AppLayout from '@/components/AppLayout.vue'
import { StatusPill, EmptyState } from '@prodigy/ui'
import { AlertCircle } from 'lucide-vue-next'

const auth = useAuthStore()
const router = useRouter()

const { data, isLoading, isError, error, refetch } = useQuery({
  queryKey: ['transactions', auth.user?.id],
  queryFn: () => fetchTransactions({ userId: auth.user!.id }),
  enabled: computed(() => !!auth.user?.id),
  refetchInterval: 5000,
})

const transactions = computed(() => data.value?.items ?? [])

// Group transactions by month
const groupedTransactions = computed(() => {
  const groups: Record<string, Transaction[]> = {}
  for (const tx of transactions.value) {
    const key = new Date(tx.createdAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
    if (!groups[key]) groups[key] = []
    groups[key].push(tx)
  }
  return Object.entries(groups).map(([month, items]) => ({ month, items }))
})

const currencyColors: Record<string, string> = {
  BTC: 'bg-warning-100 text-warning-600',
  ETH: 'bg-info-100 text-info-600',
  USDT: 'bg-success-100 text-success-600',
}

function getCurrencyColor(c: string) {
  return currencyColors[c] ?? 'bg-brand-100 text-brand-600'
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
}

function formatAmount(n: number, currency: string) {
  if (currency === 'BTC') return n.toFixed(8)
  if (currency === 'ETH') return n.toFixed(6)
  return n.toFixed(2)
}

function getTxLabel(tx: Transaction) {
  if (tx.sourceCurrency === 'EUR') return `Bought ${tx.targetCurrency}`
  if (tx.targetCurrency === 'EUR') return `Sold ${tx.sourceCurrency}`
  return `${tx.sourceCurrency} → ${tx.targetCurrency}`
}
</script>

<template>
  <AppLayout>
    <div class="px-4 pt-12 pb-6">
      <h1 class="text-2xl font-bold text-slate-900 mb-6">Activity</h1>

      <!-- Loading -->
      <div v-if="isLoading" class="space-y-3">
        <div v-for="i in 4" :key="i" class="bg-white rounded-2xl p-4">
          <div class="flex items-center gap-3">
            <div class="skeleton w-10 h-10 rounded-full shrink-0" />
            <div class="flex-1 space-y-2">
              <div class="skeleton h-3 w-20" />
              <div class="skeleton h-3 w-32" />
            </div>
            <div class="space-y-2 text-right">
              <div class="skeleton h-3 w-16" />
              <div class="skeleton h-3 w-12" />
            </div>
          </div>
        </div>
      </div>

      <!-- Error -->
      <div v-else-if="isError" class="flex flex-col items-center py-16 text-center">
        <div class="w-12 h-12 rounded-full bg-danger-50 flex items-center justify-center mb-4">
          <AlertCircle class="w-6 h-6 text-danger-500" />
        </div>
        <p class="text-slate-700 font-medium mb-1">Couldn't load data</p>
        <p class="text-slate-400 text-sm mb-4">{{ (error as Error)?.message || 'Something went wrong' }}</p>
        <button @click="refetch()" class="text-sm text-brand-600 font-medium hover:underline">Try again</button>
      </div>

      <!-- Empty -->
      <div v-else-if="transactions.length === 0">
        <EmptyState
          title="No transactions yet"
          description="Your purchase history will appear here"
          icon="📊"
        >
          <template #action>
            <RouterLink to="/buy" class="h-10 px-5 bg-brand-600 text-white font-semibold rounded-xl flex items-center justify-center text-sm hover:bg-brand-700 transition">
              Buy Crypto
            </RouterLink>
          </template>
        </EmptyState>
      </div>

      <!-- Grouped list -->
      <div v-else>
        <template v-for="group in groupedTransactions" :key="group.month">
          <!-- Month header -->
          <div class="px-1 pt-4 pb-2">
            <p class="text-xs font-medium text-slate-400 uppercase tracking-wide">{{ group.month }}</p>
          </div>
          <!-- Transactions in this month -->
          <div class="space-y-2">
            <button
              v-for="tx in group.items"
              :key="tx.id"
              @click="router.push(`/transactions/${tx.id}`)"
              class="w-full bg-white rounded-2xl p-4 flex items-center gap-3 text-left hover:shadow-md active:scale-[0.98] transition"
            >
              <!-- Currency icon -->
              <div :class="['w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0', getCurrencyColor(tx.targetCurrency)]">
                {{ tx.targetCurrency.charAt(0) }}
              </div>

              <!-- Details -->
              <div class="flex-1 min-w-0">
                <p class="font-semibold text-slate-900 text-sm">{{ getTxLabel(tx) }}</p>
                <p class="text-slate-400 text-xs mt-0.5">{{ formatDate(tx.createdAt) }}</p>
              </div>

              <!-- Amounts + status -->
              <div class="text-right shrink-0">
                <!-- Outgoing fiat (buy) -->
                <p v-if="tx.sourceCurrency === 'EUR'" class="font-semibold text-slate-700 text-sm">
                  -€{{ tx.sourceAmount.toFixed(2) }}
                </p>
                <!-- Incoming fiat (sell) -->
                <p v-else-if="tx.targetCurrency === 'EUR'" class="font-semibold text-success-600 text-sm">
                  +€{{ tx.targetAmount.toFixed(2) }}
                </p>
                <!-- Crypto-to-crypto or send -->
                <p v-else class="font-semibold text-slate-700 text-sm">
                  -{{ formatAmount(tx.sourceAmount, tx.sourceCurrency) }} {{ tx.sourceCurrency }}
                </p>

                <!-- Crypto received (buy/sell) -->
                <p v-if="tx.sourceCurrency === 'EUR'" class="text-success-600 text-xs font-medium">
                  +{{ formatAmount(tx.targetAmount, tx.targetCurrency) }} {{ tx.targetCurrency }}
                </p>

                <StatusPill :status="tx.status" class="mt-1" />
              </div>
            </button>
          </div>
        </template>
      </div>
    </div>
  </AppLayout>
</template>
