<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { useAuthStore } from '@/stores/auth'
import { fetchMarketPrices, fetchTransactions, fetchUser, fetchSafetyStatus } from '@/composables/useApi'
import { useWebSocket } from '@/composables/useWebSocket'
import { useToast } from '@/composables/useToast'
import AppLayout from '@/components/AppLayout.vue'
import { TrendingUp, TrendingDown, ArrowDownLeft, Send, ShoppingCart, ChevronRight, Building2, Copy, Share2, AlertCircle, Check } from 'lucide-vue-next'

const auth = useAuthStore()
const router = useRouter()
const queryClient = useQueryClient()
const toast = useToast()

const { data: prices, isLoading: pricesLoading, isError: pricesError, error: pricesErrorObj, refetch: refetchPrices } = useQuery({
  queryKey: ['market-prices'],
  queryFn: fetchMarketPrices,
  refetchInterval: 5_000,
})

const { data: fullUser, isLoading: userLoading, isError: userError, error: userErrorObj, refetch: refetchUser } = useQuery({
  queryKey: ['user', auth.user?.id],
  queryFn: () => fetchUser(auth.user!.id),
  enabled: computed(() => !!auth.user?.id),
})

const { data: txData } = useQuery({
  queryKey: ['transactions', auth.user?.id],
  queryFn: () => fetchTransactions({ userId: auth.user!.id }),
  enabled: computed(() => !!auth.user?.id),
  refetchInterval: 15_000,
})

// Safety status for the pending-tasks chip
const { data: safetyData } = useQuery({
  queryKey: ['safety-status', auth.user?.id],
  queryFn: () => fetchSafetyStatus(auth.user!.id),
  enabled: computed(() => !!auth.user?.id),
})

const completedSafetyCount = computed(() => {
  const s = safetyData.value?.status
  if (!s) return 4 // don't show chip while loading
  return [s.emailVerified, s.phoneVerified, s.mpinSet, s.biometrics].filter(Boolean).length
})

const wallets = computed(() => {
  return fullUser.value?.wallets ?? auth.user?.wallets ?? []
})

const greeting = computed(() => {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
})

const firstName = computed(() => {
  const email = auth.user?.email ?? ''
  const localPart = email.split('@')[0] ?? ''
  return fullUser.value?.firstName ?? (localPart.charAt(0).toUpperCase() + localPart.slice(1))
})

const priceMap = computed(() => {
  const map: Record<string, number> = {}
  if (prices.value) {
    for (const p of prices.value) {
      map[p.currency] = p.midPrice
    }
  }
  return map
})

const holdings = computed(() => {
  return wallets.value.map((w: any) => {
    const price = priceMap.value[w.currency] ?? 0
    const eurValue = w.balance * price
    const seed = w.currency.charCodeAt(0) + w.currency.charCodeAt(1)
    const change = (((seed * 17) % 400) - 200) / 100
    return { ...w, price, eurValue, change24h: change }
  })
})

const totalPortfolioEur = computed(() => {
  return holdings.value.reduce((sum: number, h: any) => sum + h.eurValue, 0)
})

const totalDayChange = computed(() => {
  return holdings.value.reduce((sum: number, h: any) => sum + (h.eurValue * h.change24h / 100), 0)
})

const spotlightPrices = computed(() => {
  const targets = ['BTC', 'ETH', 'USDT']
  return targets.map((c) => {
    const p = prices.value?.find((x) => x.currency === c)
    return { currency: c, price: p?.midPrice ?? 0, bid: p?.bid ?? 0, ask: p?.ask ?? 0 }
  })
})

const recentTransactions = computed(() => {
  return (txData.value?.items ?? []).slice(0, 3)
})

// Zero balance empty state variants
const isFirstTimeEmpty = computed(() =>
  auth.user?.kycStatus === 'approved' &&
  (txData.value?.items?.length ?? 0) === 0
)
const isSpentEmpty = computed(() =>
  auth.user?.kycStatus === 'approved' &&
  (txData.value?.items?.length ?? 0) > 0 &&
  totalPortfolioEur.value === 0
)

const currencyColors: Record<string, string> = {
  BTC: 'bg-warning-100 text-warning-600',
  ETH: 'bg-info-100 text-info-600',
  USDT: 'bg-success-100 text-success-600',
}

function getCurrencyColor(c: string) {
  return currencyColors[c] ?? 'bg-brand-100 text-brand-600'
}

function formatCurrency(amount: number, decimals = 2) {
  if (amount === undefined || amount === null) return '0.00'
  return amount.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

function formatCrypto(amount: number, currency: string) {
  const decimals = currency === 'BTC' ? 8 : currency === 'ETH' ? 6 : 2
  return amount.toFixed(decimals)
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
}

const quickActions = [
  { label: 'Buy', icon: ShoppingCart, action: () => router.push('/buy'), color: 'bg-brand-600 text-white' },
  { label: 'Sell', icon: TrendingDown, action: () => router.push('/sell'), color: 'bg-slate-100 text-slate-700' },
  { label: 'Receive', icon: ArrowDownLeft, action: () => router.push('/receive'), color: 'bg-slate-100 text-slate-700' },
  { label: 'Send', icon: Send, action: () => router.push('/send'), color: 'bg-slate-100 text-slate-700' },
]

const bankAccounts = computed(() => fullUser.value?.bankAccounts ?? [])
const primaryBankAccount = computed(() => bankAccounts.value[0] ?? null)

const isLoading = computed(() => pricesLoading.value || userLoading.value)
const isError = computed(() => pricesError.value || userError.value)
const errorMessage = computed(() => (userErrorObj.value as Error)?.message || (pricesErrorObj.value as Error)?.message || 'Something went wrong')

function refetchAll() {
  refetchPrices()
  refetchUser()
}

// Refresh user data on KYC approval, account creation, and completed transactions
// userId filter ensures we only react to events for the signed-in user
useWebSocket((event) => {
  if (
    [
      'KYC_APPROVED',
      'BANK_ACCOUNT_CREATED',
      'IBAN_ASSIGNED',
      'BANK_BALANCE_UPDATED',
    ].includes(event.eventName)
  ) {
    queryClient.invalidateQueries({ queryKey: ['user', auth.user?.id] })
  }
  if (event.eventName === 'TRANSACTION_COMPLETED') {
    // Refresh both user (wallet balances) and the transaction list
    queryClient.invalidateQueries({ queryKey: ['user', auth.user?.id] })
    queryClient.invalidateQueries({ queryKey: ['transactions', auth.user?.id] })
    toast.success('Transaction complete ✓')
  }
  if (event.eventName === 'KYC_APPROVED') {
    toast.success('Your KYC has been approved! ✓', 5000)
  }
}, auth.user?.id)

// Onboarding checklist
const onboardingDismissed = ref(localStorage.getItem('onboarding_dismissed') === 'true')

const onboardingTasks = computed(() => {
  const txDone = (txData.value?.items?.length ?? 0) > 0
  return [
    { id: 'signup', label: 'Create your account', done: true, href: '/' },
    { id: 'kyc', label: 'Complete identity verification', done: auth.user?.kycStatus === 'approved', href: '/kyc' },
    { id: 'deposit', label: 'Make your first deposit', done: txDone, href: '/deposit' },
    { id: 'buy', label: 'Buy your first crypto', done: txDone, href: '/buy' },
    { id: 'security', label: 'Set up security features', done: localStorage.getItem('biometrics_enabled') === 'true', href: '/profile' },
  ]
})

const doneCount = computed(() => onboardingTasks.value.filter(t => t.done).length)
const allDone = computed(() => doneCount.value === 5)

const showOnboarding = computed(() =>
  !onboardingDismissed.value &&
  !allDone.value &&
  auth.user?.kycStatus === 'approved'
)

function dismissOnboarding() {
  onboardingDismissed.value = true
  localStorage.setItem('onboarding_dismissed', 'true')
}

// Sparkline: last 7 days of EUR spent on completed buys
const sparklinePoints = computed(() => {
  const items = txData.value?.items ?? []
  const now = new Date()
  const days: number[] = []
  for (let d = 6; d >= 0; d--) {
    const dayStart = new Date(now)
    dayStart.setDate(now.getDate() - d)
    dayStart.setHours(0, 0, 0, 0)
    const dayEnd = new Date(dayStart)
    dayEnd.setHours(23, 59, 59, 999)
    const sum = items
      .filter((tx: any) => {
        if (tx.status !== 'completed') return false
        const txDate = new Date(tx.createdAt)
        return txDate >= dayStart && txDate <= dayEnd
      })
      .reduce((acc: number, tx: any) => acc + (tx.sourceAmount ?? 0), 0)
    days.push(sum)
  }
  return days
})

const sparklineLinePoints = computed(() => {
  const data = sparklinePoints.value
  const max = Math.max(...data, 1)
  return data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * 120
      const y = 30 - (v / max) * 26
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
})

const sparklineFillPoints = computed(() => {
  const data = sparklinePoints.value
  const max = Math.max(...data, 1)
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 120
    const y = 30 - (v / max) * 26
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })
  const first = `0,30`
  const last = `120,30`
  return `${first} ${pts.join(' ')} ${last}`
})

// Bank account helpers
const ibanCopied = ref(false)
const shareDetailsCopied = ref(false)

function formatIBAN(iban: string): string {
  return iban.replace(/(.{4})/g, '$1 ').trim()
}

function formatDailyLimit(amount: number): string {
  return amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

async function copyIBAN() {
  const acct = primaryBankAccount.value
  if (!acct) return
  try {
    await navigator.clipboard.writeText(acct.iban)
    ibanCopied.value = true
    setTimeout(() => { ibanCopied.value = false }, 2000)
  } catch {
    // clipboard not available
  }
}

async function shareDetails() {
  const acct = primaryBankAccount.value
  if (!acct) return
  const bic = acct.bic ?? 'PRODDE77XXX'
  const text = `Prodigy Bank Simulator\nIBAN: ${acct.iban}\nBIC: ${bic}\nCurrency: ${acct.currency}`
  try {
    await navigator.clipboard.writeText(text)
    shareDetailsCopied.value = true
    setTimeout(() => { shareDetailsCopied.value = false }, 2000)
  } catch {
    // clipboard not available
  }
}
</script>

<template>
  <AppLayout>
    <div class="px-4 pt-12 pb-4">
      <!-- Header -->
      <div class="mb-5">
        <p class="text-slate-500 text-sm">{{ greeting }},</p>
        <h1 class="text-2xl font-bold text-slate-900">{{ firstName }}</h1>
      </div>

      <!-- Safety tasks pending chip -->
      <RouterLink
        v-if="completedSafetyCount < 4"
        to="/profile"
        class="inline-flex items-center gap-1.5 bg-warning-50 border border-warning-200 text-warning-700 text-xs font-medium px-3 py-1.5 rounded-full mb-4 active:opacity-70 transition"
      >
        ⚠ {{ 4 - completedSafetyCount }} safety {{ 4 - completedSafetyCount === 1 ? 'task' : 'tasks' }} pending
      </RouterLink>

      <!-- Onboarding checklist — show for new users -->
      <div v-if="showOnboarding" class="bg-white rounded-2xl p-5 mb-4">
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-sm font-semibold text-slate-900">Get started with Prodigy</h2>
          <span class="text-xs text-slate-400">{{ doneCount }}/5</span>
        </div>

        <!-- Progress bar -->
        <div class="h-1.5 bg-slate-100 rounded-full mb-4">
          <div
            class="h-1.5 bg-brand-500 rounded-full transition-all duration-500"
            :style="{ width: `${(doneCount / 5) * 100}%` }"
          />
        </div>

        <div class="space-y-2">
          <div v-for="task in onboardingTasks" :key="task.id"
               :class="['flex items-center gap-3 py-2', task.done ? 'opacity-60' : '']">
            <div :class="['w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0',
              task.done ? 'bg-success-500 border-success-500' : 'border-slate-300']">
              <Check v-if="task.done" class="w-3 h-3 text-white" />
            </div>
            <RouterLink
              v-if="!task.done"
              :to="task.href"
              class="text-sm text-slate-900 hover:text-brand-600 transition"
            >
              {{ task.label }}
            </RouterLink>
            <span v-else class="text-sm text-slate-500 line-through">{{ task.label }}</span>
          </div>
        </div>

        <button @click="dismissOnboarding()" class="mt-3 text-xs text-slate-400 hover:text-slate-600 transition">
          Dismiss
        </button>
      </div>

      <!-- Error state -->
      <div v-if="isError && !isLoading" class="flex flex-col items-center py-16 text-center">
        <div class="w-12 h-12 rounded-full bg-danger-50 flex items-center justify-center mb-4">
          <AlertCircle class="w-6 h-6 text-danger-500" />
        </div>
        <p class="text-slate-700 font-medium mb-1">Couldn't load account</p>
        <p class="text-slate-400 text-sm mb-4">{{ errorMessage }}</p>
        <button @click="refetchAll()" class="text-sm text-brand-600 font-medium hover:underline">Try again</button>
      </div>

      <template v-else>

      <!-- Balance Card -->
      <div class="relative rounded-2xl overflow-hidden mb-5 bg-gradient-to-br from-brand-600 to-brand-800 p-5 shadow-lg">
        <div class="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
        <div class="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/10" />

        <div class="relative">
          <p class="text-brand-200 text-sm mb-1">Total Balance</p>
          <div v-if="isLoading" class="skeleton h-10 w-48 mb-1" />
          <h2 v-else class="text-4xl font-bold text-white tracking-tight">
            €{{ formatCurrency(totalPortfolioEur) }}
          </h2>
          <p
            v-if="!isLoading"
            class="text-xs mt-1 font-medium"
            :class="totalDayChange >= 0 ? 'text-success-300' : 'text-danger-300'"
          >
            {{ totalDayChange >= 0 ? '↑' : '↓' }} €{{ formatCurrency(Math.abs(totalDayChange)) }} today
          </p>
          <div v-else class="skeleton h-3 w-28 mt-1" />

          <!-- Sparkline -->
          <svg
            v-if="!isLoading"
            viewBox="0 0 120 30"
            class="w-full h-8 mt-2"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="white" stop-opacity="0.3" />
                <stop offset="100%" stop-color="white" stop-opacity="0" />
              </linearGradient>
            </defs>
            <polygon :points="sparklineFillPoints" fill="url(#sparkGrad)" />
            <polyline
              :points="sparklineLinePoints"
              fill="none"
              stroke="white"
              stroke-width="1.5"
              stroke-opacity="0.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <div class="flex gap-3 mt-5">
            <RouterLink
              to="/buy"
              class="flex-1 h-11 bg-white text-brand-700 font-semibold rounded-xl flex items-center justify-center gap-1.5 text-sm hover:bg-brand-50 active:scale-95 transition"
            >
              <ShoppingCart :size="16" />
              Buy
            </RouterLink>
            <RouterLink
              to="/sell"
              class="flex-1 h-11 bg-white/20 text-white font-semibold rounded-xl flex items-center justify-center gap-1.5 text-sm hover:bg-white/30 active:scale-95 transition"
            >
              <TrendingDown :size="16" />
              Sell
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Quick actions -->
      <div class="grid grid-cols-4 gap-3 mb-6">
        <button
          v-for="action in quickActions"
          :key="action.label"
          @click="action.action()"
          class="flex flex-col items-center gap-1.5 active:scale-95 transition"
        >
          <div :class="['w-12 h-12 rounded-2xl flex items-center justify-center', action.color]">
            <component :is="action.icon" :size="20" />
          </div>
          <span class="text-xs text-slate-600 font-medium">{{ action.label }}</span>
        </button>
      </div>

      <!-- Bank Account (shown once KYC-approved) -->
      <div v-if="primaryBankAccount" class="mb-6">
        <h3 class="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Bank Account</h3>
        <div class="bg-gradient-to-br from-brand-600 to-brand-800 text-white rounded-2xl p-6 shadow-lg">
          <!-- Header row -->
          <div class="flex items-center justify-between mb-5">
            <div>
              <p class="text-brand-200 text-xs font-medium">Prodigy Bank</p>
              <p class="text-white font-semibold">{{ primaryBankAccount.currency }} Account</p>
            </div>
            <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Building2 :size="20" class="text-white" />
            </div>
          </div>

          <!-- IBAN -->
          <div class="mb-4">
            <p class="text-brand-200 text-xs mb-1">IBAN</p>
            <p class="text-white font-semibold font-mono tracking-wider text-sm">{{ formatIBAN(primaryBankAccount.iban) }}</p>
          </div>

          <!-- BIC + Daily limit row -->
          <div class="flex gap-6 mb-5">
            <div>
              <p class="text-brand-200 text-xs mb-0.5">BIC</p>
              <p class="text-white font-mono text-sm">{{ (primaryBankAccount as any).bic ?? 'PRODDE77' }}</p>
            </div>
            <div>
              <p class="text-brand-200 text-xs mb-0.5">Daily limit</p>
              <p class="text-white text-sm">€{{ formatDailyLimit((primaryBankAccount as any).dailyLimitEur ?? 1000) }}</p>
            </div>
            <div class="ml-auto text-right">
              <p class="text-brand-200 text-xs mb-0.5">Balance</p>
              <p class="text-white font-bold text-sm">{{ primaryBankAccount.currency }} {{ primaryBankAccount.balance.toFixed(2) }}</p>
            </div>
          </div>

          <!-- Action buttons -->
          <div class="flex gap-2">
            <button
              @click="copyIBAN"
              class="flex-1 h-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center gap-1.5 text-sm font-medium text-white active:scale-95 transition"
            >
              <Copy :size="14" />
              {{ ibanCopied ? 'Copied!' : 'Copy IBAN' }}
            </button>
            <button
              @click="shareDetails"
              class="flex-1 h-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center gap-1.5 text-sm font-medium text-white active:scale-95 transition"
            >
              <Share2 :size="14" />
              {{ shareDetailsCopied ? 'Copied!' : 'Share details' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Live Prices -->
      <div class="mb-6">
        <h3 class="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Live Prices</h3>
        <div class="grid grid-cols-3 gap-2">
          <template v-if="pricesLoading">
            <div v-for="i in 3" :key="i" class="skeleton h-20 rounded-2xl" />
          </template>
          <template v-else>
            <div
              v-for="p in spotlightPrices"
              :key="p.currency"
              class="bg-white rounded-2xl p-3 shadow-sm border border-slate-100"
            >
              <div :class="['w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-2', getCurrencyColor(p.currency)]">
                {{ p.currency.charAt(0) }}
              </div>
              <p class="text-xs font-semibold text-slate-900">{{ p.currency }}</p>
              <p class="text-xs text-slate-500 font-mono mt-0.5">
                €{{ p.price >= 1000 ? formatCurrency(p.price, 0) : formatCurrency(p.price) }}
              </p>
            </div>
          </template>
        </div>
      </div>

      <!-- Holdings -->
      <div class="mb-6">
        <h3 class="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Holdings</h3>

        <div v-if="isLoading" class="space-y-3">
          <div v-for="i in 2" :key="i" class="bg-white rounded-2xl p-4">
            <div class="flex items-center gap-3">
              <div class="skeleton w-10 h-10 rounded-full" />
              <div class="flex-1 space-y-2">
                <div class="skeleton h-3 w-16" />
                <div class="skeleton h-3 w-24" />
              </div>
              <div class="space-y-2 text-right">
                <div class="skeleton h-3 w-20" />
                <div class="skeleton h-3 w-14" />
              </div>
            </div>
          </div>
        </div>

        <!-- First-time empty: KYC done, zero transactions -->
        <div v-else-if="isFirstTimeEmpty">
          <RouterLink to="/deposit" class="block w-full bg-warning-400 rounded-2xl p-5 mb-4 active:scale-[0.98] transition">
            <p class="font-bold text-slate-900 text-base mb-1">Make your first deposit →</p>
            <p class="text-slate-700 text-xs">Transfer EUR via SEPA or SWIFT to start trading</p>
          </RouterLink>
        </div>

        <!-- Spent-to-zero: has past transactions but zero balance -->
        <div v-else-if="isSpentEmpty" class="bg-white rounded-2xl p-8 text-center border border-slate-100">
          <p class="text-slate-700 font-semibold mb-1">Your balance is 0</p>
          <p class="text-slate-400 text-sm mb-4">Transfer in to continue trading.</p>
          <RouterLink
            to="/buy"
            class="inline-flex items-center justify-center h-10 px-6 bg-brand-600 text-white text-sm font-semibold rounded-xl hover:bg-brand-700 transition"
          >
            Transfer In
          </RouterLink>
        </div>

        <!-- Generic no-holdings fallback -->
        <div v-else-if="holdings.length === 0" class="bg-white rounded-2xl p-8 text-center">
          <p class="text-slate-400 text-sm">No holdings yet</p>
          <RouterLink to="/buy" class="text-brand-600 text-sm font-medium mt-2 block">Buy your first crypto →</RouterLink>
        </div>

        <div v-else class="space-y-2">
          <div
            v-for="h in holdings"
            :key="h.currency"
            class="bg-white rounded-2xl p-4 flex items-center gap-3"
          >
            <div :class="['w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0', getCurrencyColor(h.currency)]">
              {{ h.currency.charAt(0) }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-semibold text-slate-900 text-sm">{{ h.currency }}</p>
              <p class="text-slate-400 text-xs">{{ formatCrypto(h.balance, h.currency) }} {{ h.currency }}</p>
            </div>
            <div class="text-right shrink-0">
              <p class="font-semibold text-slate-900 text-sm">€{{ formatCurrency(h.eurValue) }}</p>
              <p
                class="text-xs font-medium"
                :class="h.change24h >= 0 ? 'text-success-600' : 'text-danger-500'"
              >
                <component :is="h.change24h >= 0 ? TrendingUp : TrendingDown" :size="10" class="inline mr-0.5" />
                {{ h.change24h >= 0 ? '+' : '' }}{{ h.change24h.toFixed(2) }}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div v-if="recentTransactions.length > 0">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-sm font-semibold text-slate-500 uppercase tracking-wider">Recent</h3>
          <RouterLink to="/transactions" class="text-xs text-brand-600 font-medium flex items-center gap-0.5">
            See all <ChevronRight :size="14" />
          </RouterLink>
        </div>
        <div class="space-y-2">
          <button
            v-for="tx in recentTransactions"
            :key="tx.id"
            @click="router.push(`/transactions/${tx.id}`)"
            class="w-full bg-white rounded-2xl p-4 flex items-center gap-3 text-left active:scale-[0.98] transition hover:shadow-md"
          >
            <div :class="['w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0', getCurrencyColor(tx.targetCurrency)]">
              {{ tx.targetCurrency.charAt(0) }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-semibold text-slate-900 text-sm">Bought {{ tx.targetCurrency }}</p>
              <p class="text-slate-400 text-xs mt-0.5">{{ formatDate(tx.createdAt) }}</p>
            </div>
            <div class="text-right shrink-0">
              <p class="font-semibold text-slate-700 text-sm">-€{{ tx.sourceAmount.toFixed(2) }}</p>
              <p class="text-brand-600 text-xs font-medium">+{{ formatCrypto(tx.targetAmount, tx.targetCurrency) }}</p>
            </div>
          </button>
        </div>
      </div>

      </template>
    </div>
  </AppLayout>
</template>
