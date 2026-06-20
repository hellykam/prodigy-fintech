<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import { useAuthStore } from '@/stores/auth'
import { fetchUser } from '@/composables/useApi'
import AppLayout from '@/components/AppLayout.vue'
import { AlertCircle, Plus } from 'lucide-vue-next'

const auth = useAuthStore()
const router = useRouter()

const { data, isLoading, isError, error, refetch } = useQuery({
  queryKey: ['user', auth.user?.id],
  queryFn: () => fetchUser(auth.user!.id),
  enabled: computed(() => !!auth.user?.id),
})

const wallets = computed(() => data.value?.wallets ?? [])

function formatBalance(balance: number, currency: string) {
  if (currency === 'BTC') return `${balance.toFixed(8)} BTC`
  if (currency === 'ETH') return `${balance.toFixed(6)} ETH`
  return `€${balance.toFixed(2)}`
}

const cryptoIcon: Record<string, string> = { BTC: '₿', ETH: 'Ξ', USDT: '₮' }
</script>

<template>
  <AppLayout>
    <div class="px-4 pt-12 pb-6">
      <h1 class="text-2xl font-bold text-slate-900 mb-6">My Wallets</h1>

      <div v-if="isLoading" class="space-y-3">
        <div v-for="i in 4" :key="i" class="h-20 bg-slate-100 rounded-2xl animate-pulse" />
      </div>

      <div v-else-if="isError" class="flex flex-col items-center py-10 text-center">
        <AlertCircle class="w-8 h-8 text-danger-400 mb-2" />
        <p class="text-slate-500 text-sm">{{ (error as Error)?.message }}</p>
        <button @click="refetch()" class="mt-2 text-xs text-brand-600 hover:underline">Retry</button>
      </div>

      <div v-else class="space-y-3">
        <button
          v-for="wallet in wallets"
          :key="wallet.currency"
          @click="router.push(`/wallets/${wallet.currency}`)"
          class="w-full bg-white rounded-2xl p-4 flex items-center gap-4 text-left hover:shadow-md active:scale-[0.98] transition"
        >
          <!-- Currency icon -->
          <div class="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center text-lg font-bold text-brand-600 shrink-0">
            {{ cryptoIcon[wallet.currency] ?? wallet.currency.charAt(0) }}
          </div>
          <div class="flex-1">
            <p class="font-semibold text-slate-900">{{ wallet.currency }}</p>
            <p class="text-slate-400 text-xs mt-0.5">{{ wallet.currency === 'EUR' ? 'Fiat account' : 'Crypto wallet' }}</p>
          </div>
          <div class="text-right">
            <p class="font-semibold text-slate-900">{{ formatBalance(wallet.balance, wallet.currency) }}</p>
          </div>
        </button>

        <!-- Open New Wallet — Coming Soon -->
        <div class="flex items-center gap-4 bg-white rounded-2xl p-4 opacity-40 pointer-events-none">
          <div class="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
            <Plus class="w-5 h-5 text-slate-400" />
          </div>
          <div class="flex-1">
            <p class="font-semibold text-slate-500">Open new wallet</p>
          </div>
          <span class="text-[10px] font-semibold bg-warning-400 text-slate-900 px-2 py-0.5 rounded-full">Soon</span>
        </div>
      </div>
    </div>
  </AppLayout>
</template>
