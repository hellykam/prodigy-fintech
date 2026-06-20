<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import { useAuthStore } from '@/stores/auth'
import { fetchUser, fetchTransactions } from '@/composables/useApi'
import AppLayout from '@/components/AppLayout.vue'
import { StatusPill } from '@prodigy/ui'
import { ArrowUpRight, ArrowDownLeft, RefreshCw, Copy } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const currency = computed(() => route.params.currency as string)

const { data: userData } = useQuery({
  queryKey: ['user', auth.user?.id],
  queryFn: () => fetchUser(auth.user!.id),
  enabled: computed(() => !!auth.user?.id),
})

const wallet = computed(() => {
  return userData.value?.wallets?.find((w: any) => w.currency === currency.value)
})

const { data: txData, isLoading: txLoading } = useQuery({
  queryKey: ['transactions', auth.user?.id],
  queryFn: () => fetchTransactions({ userId: auth.user!.id }),
  enabled: computed(() => !!auth.user?.id),
})

// Filter to only transactions involving this currency
const transactions = computed(() => {
  const all = txData.value?.items ?? []
  return all
    .filter((tx: any) => tx.sourceCurrency === currency.value || tx.targetCurrency === currency.value)
    .slice(0, 10)
})

const isCrypto = computed(() => !['EUR', 'USD', 'GBP'].includes(currency.value))

function formatBalance(balance: number) {
  if (currency.value === 'BTC') return `${balance.toFixed(8)} ${currency.value}`
  if (currency.value === 'ETH') return `${balance.toFixed(6)} ${currency.value}`
  return `€${balance.toFixed(2)}`
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
}

async function copyToClipboard(text: string) {
  await navigator.clipboard.writeText(text)
}

const walletAddress = computed(() => wallet.value?.address ?? `${currency.value.toLowerCase()}_demo_address`)

function getTxLabel(tx: any) {
  if (tx.sourceCurrency === 'EUR') return `Bought ${tx.targetCurrency}`
  if (tx.targetCurrency === 'EUR') return `Sold ${tx.sourceCurrency}`
  return `${tx.sourceCurrency} → ${tx.targetCurrency}`
}
</script>

<template>
  <AppLayout>
    <div class="px-4 pt-12 pb-6">
      <!-- Back -->
      <button
        @click="router.push('/wallets')"
        class="flex items-center gap-1.5 text-brand-600 text-sm font-medium mb-4 active:opacity-70 transition"
      >
        ← Back to Wallets
      </button>

      <!-- Balance card -->
      <div class="bg-brand-600 rounded-2xl p-6 mb-6 text-white">
        <p class="text-brand-200 text-sm mb-1">{{ currency }} Wallet</p>
        <p class="text-3xl font-bold mb-4">{{ wallet ? formatBalance(wallet.balance) : '—' }}</p>

        <!-- Action buttons -->
        <div class="grid grid-cols-3 gap-2">
          <RouterLink
            :to="isCrypto ? `/send?currency=${currency}` : '/deposit'"
            class="flex flex-col items-center gap-1.5 bg-white/20 rounded-xl py-3 hover:bg-white/30 active:scale-[0.97] transition"
          >
            <ArrowUpRight class="w-5 h-5" />
            <span class="text-xs font-medium">{{ isCrypto ? 'Send' : 'Transfer Out' }}</span>
          </RouterLink>
          <RouterLink
            :to="`/receive?currency=${currency}`"
            class="flex flex-col items-center gap-1.5 bg-white/20 rounded-xl py-3 hover:bg-white/30 active:scale-[0.97] transition"
          >
            <ArrowDownLeft class="w-5 h-5" />
            <span class="text-xs font-medium">Receive</span>
          </RouterLink>
          <RouterLink
            v-if="isCrypto"
            :to="`/sell?currency=${currency}`"
            class="flex flex-col items-center gap-1.5 bg-white/20 rounded-xl py-3 hover:bg-white/30 active:scale-[0.97] transition"
          >
            <RefreshCw class="w-5 h-5" />
            <span class="text-xs font-medium">Sell</span>
          </RouterLink>
          <RouterLink
            v-else
            to="/buy"
            class="flex flex-col items-center gap-1.5 bg-white/20 rounded-xl py-3 hover:bg-white/30 active:scale-[0.97] transition"
          >
            <ArrowDownLeft class="w-5 h-5" />
            <span class="text-xs font-medium">Buy</span>
          </RouterLink>
        </div>
      </div>

      <!-- Wallet address (crypto) -->
      <div v-if="isCrypto" class="bg-white rounded-2xl p-4 mb-4 space-y-3">
        <h2 class="text-sm font-semibold text-slate-700">Wallet address</h2>
        <div class="flex items-center justify-between">
          <p class="font-mono text-xs text-slate-600 truncate flex-1 mr-2">{{ walletAddress }}</p>
          <button
            @click="copyToClipboard(walletAddress)"
            class="text-brand-600 text-xs font-medium flex items-center gap-1 shrink-0 active:opacity-70 transition"
          >
            <Copy class="w-3.5 h-3.5" /> Copy
          </button>
        </div>
      </div>

      <!-- Recent transactions -->
      <h2 class="text-base font-semibold text-slate-900 mb-3">Recent transactions</h2>

      <div v-if="txLoading" class="space-y-2">
        <div v-for="i in 3" :key="i" class="h-14 bg-slate-100 rounded-2xl animate-pulse" />
      </div>

      <div v-else-if="transactions.length === 0" class="text-center py-8">
        <p class="text-slate-400 text-sm">No transactions yet</p>
      </div>

      <div v-else class="space-y-2">
        <button
          v-for="tx in transactions"
          :key="tx.id"
          @click="router.push(`/transactions/${tx.id}`)"
          class="w-full bg-white rounded-2xl p-4 flex items-center gap-3 text-left hover:shadow-md active:scale-[0.98] transition"
        >
          <div class="flex-1">
            <p class="text-sm font-semibold text-slate-900">{{ getTxLabel(tx) }}</p>
            <p class="text-xs text-slate-400 mt-0.5">{{ formatDate(tx.createdAt) }}</p>
          </div>
          <div class="text-right">
            <p
              class="text-sm font-semibold"
              :class="tx.targetCurrency === currency ? 'text-success-600' : 'text-slate-700'"
            >
              {{ tx.targetCurrency === currency ? '+' : '-' }}
              {{ tx.targetCurrency === currency
                ? `${tx.targetAmount.toFixed(currency === 'BTC' ? 8 : currency === 'ETH' ? 6 : 2)} ${currency}`
                : `€${tx.sourceAmount.toFixed(2)}`
              }}
            </p>
            <StatusPill :status="tx.status" class="mt-1" />
          </div>
        </button>
      </div>

      <RouterLink
        to="/transactions"
        class="block text-center text-brand-600 text-sm font-medium mt-4 hover:underline"
      >
        View all transactions →
      </RouterLink>
    </div>
  </AppLayout>
</template>
