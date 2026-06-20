<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import { useAuthStore } from '@/stores/auth'
import { fetchUser, fetchMarketPrices, createQuote, acceptQuote, createTransaction, fetchTransaction } from '@/composables/useApi'
import type { Quote, Transaction } from '@/composables/useApi'
import { useWebSocket, type WsSystemEvent } from '@/composables/useWebSocket'
import { useToast } from '@/composables/useToast'
import AppLayout from '@/components/AppLayout.vue'
import { ChevronLeft, CheckCircle, XCircle, Clock, Loader2, ArrowRight, Lock } from 'lucide-vue-next'

const router = useRouter()
const auth = useAuthStore()
const toast = useToast()

// Steps: 1 = select holding, 2 = confirm quote, 3 = processing, 4 = result
const step = ref<1 | 2 | 3 | 4>(1)

// Step 1 state
const selectedCurrency = ref<string>('')
const amount = ref('')
const quote = ref<Quote | null>(null)
const quoteLoading = ref(false)
const quoteError = ref('')

// Quote timer
const quoteSecondsLeft = ref(0)
let quoteTimer: ReturnType<typeof setInterval> | null = null

// Step 3/4 state
const transaction = ref<Transaction | null>(null)
const txLoading = ref(false)
const txError = ref('')
let pollTimer: ReturnType<typeof setInterval> | null = null

// Optimistic UI — prevent double-submit on confirm button
const isConfirming = ref(false)

const TERMINAL_STATUSES = ['completed', 'failed', 'rejected']

// Fetch user wallets
const { data: fullUser, isLoading: userLoading } = useQuery({
  queryKey: ['user', auth.user?.id],
  queryFn: () => fetchUser(auth.user!.id),
  enabled: computed(() => !!auth.user?.id),
})

// Fetch market prices
const { data: prices, isLoading: pricesLoading } = useQuery({
  queryKey: ['market-prices'],
  queryFn: fetchMarketPrices,
  refetchInterval: 5_000,
})

const isLoading = computed(() => userLoading.value || pricesLoading.value)

const priceMap = computed(() => {
  const map: Record<string, number> = {}
  if (prices.value) {
    for (const p of prices.value) {
      map[p.currency] = p.midPrice
    }
  }
  return map
})

const SUPPORTED = ['BTC', 'ETH', 'USDT']

// Crypto symbols map
const cryptoSymbols: Record<string, string> = {
  BTC: '₿',
  ETH: 'Ξ',
  USDT: '₮',
}

function getCryptoSymbol(currency: string): string {
  return cryptoSymbols[currency] ?? currency.charAt(0)
}

// All wallets including zero-balance ones (for KYC/empty checks)
const allWallets = computed(() => {
  return (fullUser.value?.wallets ?? auth.user?.wallets ?? []) as Array<{ currency: string; balance: number }>
})

const holdings = computed(() => {
  return allWallets.value
    .filter((w) => SUPPORTED.includes(w.currency) && w.balance > 0)
    .map((w) => ({
      ...w,
      eurValue: w.balance * (priceMap.value[w.currency] ?? 0),
    }))
})

// True if all supported wallets have zero balance
const hasNoBalance = computed(() => {
  if (isLoading.value) return false
  const supported = allWallets.value.filter((w) => SUPPORTED.includes(w.currency))
  return supported.length === 0 || supported.every((w) => w.balance <= 0)
})

// KYC gate
const isKycApproved = computed(() => auth.user?.kycStatus === 'approved')

const selectedHolding = computed(() => holdings.value.find((h) => h.currency === selectedCurrency.value))

const amountNum = computed(() => parseFloat(amount.value) || 0)

const amountError = computed(() => {
  if (!amount.value) return ''
  if (amountNum.value <= 0) return 'Amount must be greater than 0'
  if (selectedHolding.value && amountNum.value > selectedHolding.value.balance) return 'Exceeds available balance'
  return ''
})

// Warning: selling >80% of balance
const showHighBalanceWarning = computed(() => {
  if (!selectedHolding.value || !amount.value || amountNum.value <= 0) return false
  return amountNum.value > selectedHolding.value.balance * 0.8
})

const currencyColors: Record<string, string> = {
  BTC: 'bg-warning-100 text-warning-600',
  ETH: 'bg-info-100 text-info-600',
  USDT: 'bg-success-100 text-success-600',
}

function getCurrencyColor(c: string) {
  return currencyColors[c] ?? 'bg-brand-100 text-brand-600'
}

function formatCrypto(n: number, currency: string) {
  if (currency === 'BTC') return n.toFixed(8)
  if (currency === 'ETH') return n.toFixed(6)
  return n.toFixed(2)
}

function formatEur(n: number) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function setMax() {
  if (selectedHolding.value) {
    amount.value = selectedHolding.value.balance.toString()
  }
}

// Quote timer
function clearQuoteTimer() {
  if (quoteTimer) { clearInterval(quoteTimer); quoteTimer = null }
}

function startQuoteTimer(expiresAt: string) {
  clearQuoteTimer()
  const expires = new Date(expiresAt).getTime()
  function tick() {
    const left = Math.max(0, Math.floor((expires - Date.now()) / 1000))
    quoteSecondsLeft.value = left
    if (left === 0) { clearQuoteTimer(); quote.value = null }
  }
  tick()
  quoteTimer = setInterval(tick, 1000)
}

const timerColor = computed(() => {
  if (quoteSecondsLeft.value > 15) return 'text-success-600'
  if (quoteSecondsLeft.value > 5) return 'text-warning-500'
  return 'text-danger-500'
})

async function fetchQuote() {
  if (!selectedCurrency.value || amountNum.value <= 0 || !!amountError.value) {
    quote.value = null
    quoteError.value = ''
    return
  }
  quoteLoading.value = true
  quoteError.value = ''
  try {
    const q = await createQuote({
      userId: auth.user!.id,
      sourceCurrency: selectedCurrency.value,
      targetCurrency: 'EUR',
      sourceAmount: amountNum.value,
    })
    quote.value = q
    startQuoteTimer(q.expiresAt)
  } catch (e: any) {
    quoteError.value = e.message ?? 'Failed to get quote'
    quote.value = null
  } finally {
    quoteLoading.value = false
  }
}

let debounceTimer: ReturnType<typeof setTimeout> | null = null

function debouncedFetchQuote() {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(fetchQuote, 500)
}

watch([amount, selectedCurrency], debouncedFetchQuote)

// Step 2: go to confirm
function confirmSell() {
  if (!quote.value) return
  step.value = 2
}

// Step 3: Execute sell
async function executeSell() {
  if (!quote.value || isConfirming.value) return
  isConfirming.value = true
  step.value = 3
  txLoading.value = true
  txError.value = ''
  try {
    await acceptQuote(quote.value.id)
    const tx = await createTransaction({
      userId: auth.user!.id,
      quoteId: quote.value.id,
    })
    transaction.value = tx
    startPolling(tx.id)
    // isConfirming stays true — navigated to step 3/4
  } catch (e: any) {
    txError.value = e.message ?? 'Transaction failed'
    step.value = 4
    isConfirming.value = false
  } finally {
    txLoading.value = false
  }
}

function startPolling(txId: string) {
  pollTimer = setInterval(async () => {
    try {
      const tx = await fetchTransaction(txId)
      transaction.value = tx
      if (TERMINAL_STATUSES.includes(tx.status)) {
        stopPolling()
        if (tx.status === 'completed') {
          fetchUser(auth.user!.id).then((u) => auth.updateUser(u)).catch(() => {})
        }
        step.value = 4
      }
    } catch {}
  }, 1500)
}

function stopPolling() {
  if (pollTimer) { clearInterval(pollTimer); pollTimer = null }
}

useWebSocket((event: WsSystemEvent) => {
  if (event.eventName === 'TRANSACTION_COMPLETED' && event.entityId === transaction.value?.id) {
    fetchTransaction(transaction.value!.id).then((tx) => {
      transaction.value = tx
      if (TERMINAL_STATUSES.includes(tx.status)) {
        stopPolling()
        if (tx.status === 'completed') {
          fetchUser(auth.user!.id).then((u) => auth.updateUser(u)).catch(() => {})
        }
        step.value = 4
      }
    })
  }
})

onUnmounted(() => {
  clearQuoteTimer()
  stopPolling()
  if (debounceTimer) clearTimeout(debounceTimer)
})

function resetFlow() {
  step.value = 1
  amount.value = ''
  selectedCurrency.value = ''
  quote.value = null
  transaction.value = null
  txError.value = ''
  quoteError.value = ''
}

const statusSteps = computed(() => {
  const allSteps = [
    { key: 'created', label: 'Order created' },
    { key: 'risk_checking', label: 'Risk check' },
    { key: 'approved', label: 'Approved' },
    { key: 'market_executing', label: 'Executing order' },
    { key: 'ledger_posting', label: 'Settling funds' },
    { key: 'completed', label: 'Completed' },
  ]
  const current = transaction.value?.status ?? 'created'
  const currentIdx = allSteps.findIndex((s) => s.key === current)
  return allSteps.map((s, i) => ({
    ...s,
    done: i < currentIdx || current === 'completed',
    active: s.key === current && current !== 'completed',
    failed: (current === 'failed' || current === 'rejected') && i === currentIdx,
  }))
})
</script>

<template>
  <AppLayout>
    <div class="px-4 pt-10 pb-6 max-w-5xl mx-auto">

      <!-- ===== STEP 1: Select holding & amount ===== -->
      <Transition name="slide">
        <div v-if="step === 1" key="step1">
          <!-- Back button -->
          <button
            @click="router.back()"
            class="flex items-center gap-1 text-slate-500 hover:text-slate-700 mb-5 -ml-1"
          >
            <ChevronLeft :size="20" />
            <span class="text-sm">Back</span>
          </button>

          <!-- Step indicator -->
          <div class="flex items-center gap-2 mb-6">
            <template v-for="(label, i) in ['Select', 'Quote', 'Confirm']" :key="label">
              <div class="flex items-center gap-2">
                <div
                  :class="[
                    'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300',
                    step > i + 1
                      ? 'bg-success-600 text-white'
                      : step === i + 1
                        ? 'bg-success-600 text-white ring-4 ring-success-100'
                        : 'bg-slate-100 text-slate-400',
                  ]"
                >
                  <svg v-if="step > i + 1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="w-3.5 h-3.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span v-else>{{ i + 1 }}</span>
                </div>
                <span
                  class="text-xs font-medium transition-colors duration-300"
                  :class="step === i + 1 ? 'text-success-600' : 'text-slate-400'"
                >{{ label }}</span>
              </div>
              <div
                v-if="i < 2"
                class="flex-1 h-0.5 rounded transition-all duration-500"
                :class="step > i + 1 ? 'bg-success-600' : 'bg-slate-200'"
              />
            </template>
          </div>

          <h1 class="text-2xl font-bold text-slate-900 mb-6">Sell Crypto</h1>

          <!-- KYC gate -->
          <div v-if="!isKycApproved" class="bg-warning-50 border border-warning-200 rounded-2xl p-6 text-center mb-4">
            <div class="w-12 h-12 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Lock :size="22" class="text-warning-600" />
            </div>
            <h2 class="text-base font-semibold text-slate-900 mb-1">Identity verification required</h2>
            <p class="text-sm text-slate-500 mb-4">Complete identity verification to sell crypto</p>
            <RouterLink
              to="/kyc"
              class="inline-flex items-center justify-center h-10 px-6 bg-warning-600 text-white text-sm font-semibold rounded-xl hover:bg-warning-700 transition"
            >
              Verify identity
            </RouterLink>
          </div>

          <!-- Content only shown when KYC approved -->
          <template v-else>
            <!-- Loading skeletons -->
            <div v-if="isLoading" class="space-y-3 mb-4">
              <div v-for="i in 3" :key="i" class="skeleton h-20 rounded-2xl" />
            </div>

            <!-- Empty state: no crypto balance -->
            <div v-else-if="hasNoBalance" class="bg-white rounded-2xl p-8 text-center mb-4 shadow-sm border border-slate-100">
              <div class="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl">₿</span>
              </div>
              <h2 class="text-base font-semibold text-slate-900 mb-1">Nothing to sell yet</h2>
              <p class="text-sm text-slate-400 mb-4">You need to buy crypto before you can sell it.</p>
              <RouterLink
                to="/buy"
                class="inline-flex items-center justify-center h-10 px-6 bg-brand-600 text-white text-sm font-semibold rounded-xl hover:bg-brand-700 transition"
              >
                Buy crypto
              </RouterLink>
            </div>

            <!-- Desktop two-column layout -->
            <div v-else class="lg:grid lg:grid-cols-2 lg:gap-8">
              <!-- LEFT: holdings list -->
              <div>
                <!-- Holdings list -->
                <div class="space-y-2 mb-4">
                  <button
                    v-for="h in holdings"
                    :key="h.currency"
                    @click="selectedCurrency = h.currency; amount = ''"
                    :class="[
                      'w-full flex items-center gap-3 p-4 rounded-2xl border-2 transition text-left',
                      selectedCurrency === h.currency
                        ? 'border-success-500 bg-success-50'
                        : 'border-slate-100 bg-white hover:border-slate-200',
                    ]"
                  >
                    <div :class="['w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0', getCurrencyColor(h.currency)]">
                      {{ getCryptoSymbol(h.currency) }}
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="font-semibold text-slate-900 text-sm">{{ h.currency }}</p>
                      <p class="text-slate-400 text-xs">{{ formatCrypto(h.balance, h.currency) }} {{ h.currency }}</p>
                    </div>
                    <div class="text-right shrink-0">
                      <p class="font-semibold text-slate-900 text-sm">≈ €{{ formatEur(h.eurValue) }}</p>
                    </div>
                  </button>
                </div>

                <!-- Amount input (shown once a holding is selected) -->
                <Transition name="slide">
                  <div v-if="selectedCurrency" key="amount-input">
                    <div class="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-slate-100">
                      <div class="flex items-center justify-between mb-3">
                        <p class="text-sm text-slate-500">Amount to sell</p>
                        <button
                          @click="setMax"
                          class="text-xs font-semibold text-success-600 bg-success-50 px-2.5 py-1 rounded-lg hover:bg-success-100 transition"
                        >
                          MAX
                        </button>
                      </div>
                      <div class="flex items-center gap-3">
                        <div class="relative flex-1 min-w-0">
                          <label class="absolute top-2 left-3 text-[10px] text-slate-400 font-medium pointer-events-none">
                            Amount ({{ selectedCurrency }})
                          </label>
                          <input
                            v-model="amount"
                            type="number"
                            min="0"
                            step="any"
                            :placeholder="`0.${'0'.repeat(selectedCurrency === 'BTC' ? 8 : selectedCurrency === 'ETH' ? 6 : 2)}`"
                            class="w-full pt-6 pb-3 px-3 rounded-xl border border-slate-200 text-2xl font-bold text-slate-900 bg-transparent outline-none placeholder-slate-200 focus:border-brand-400 transition min-w-0"
                          />
                        </div>
                        <span class="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg shrink-0">{{ selectedCurrency }}</span>
                      </div>
                      <p v-if="amountError" class="text-danger-500 text-xs mt-2">{{ amountError }}</p>
                    </div>

                    <!-- High balance warning -->
                    <div
                      v-if="showHighBalanceWarning"
                      class="bg-warning-50 text-warning-700 rounded-lg p-3 mb-4 text-sm"
                    >
                      You're selling more than 80% of your balance
                    </div>

                    <!-- Mobile CTA -->
                    <button
                      @click="confirmSell"
                      :disabled="!quote || quoteLoading || !amount || !!amountError"
                      class="lg:hidden w-full h-14 bg-danger-500 hover:bg-danger-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition text-base active:scale-95"
                    >
                      Sell {{ selectedCurrency }}
                    </button>
                  </div>
                </Transition>
              </div>

              <!-- RIGHT: live quote panel -->
              <div>
                <Transition name="slide">
                  <div v-if="selectedCurrency" key="quote-panel">
                    <!-- Quote result -->
                    <div class="bg-warning-50 rounded-2xl p-5 mb-5 shadow-sm border border-warning-100 min-h-[80px]">
                      <p class="text-sm font-semibold text-slate-700 mb-3">Live Quote</p>
                      <div v-if="quoteLoading" class="flex items-center gap-3">
                        <Loader2 :size="18" class="text-warning-500 animate-spin shrink-0" />
                        <p class="text-slate-500 text-sm">Getting best price...</p>
                      </div>

                      <p v-else-if="quoteError" class="text-danger-600 text-sm">{{ quoteError }}</p>

                      <p v-else-if="!amount || amountNum <= 0" class="text-slate-400 text-sm">
                        Enter an amount to see your quote
                      </p>

                      <template v-else-if="quote">
                        <div class="flex items-center justify-between mb-3">
                          <div>
                            <p class="text-slate-500 text-xs">You'll receive</p>
                            <p class="text-2xl font-bold text-slate-900">
                              €<span class="text-success-600">{{ formatEur(quote.targetAmount) }}</span>
                            </p>
                          </div>
                          <div :class="['text-sm font-mono font-bold', timerColor]">
                            <Clock :size="12" class="inline mr-1" />
                            {{ quoteSecondsLeft }}s
                          </div>
                        </div>
                        <p class="text-xs text-slate-400 mb-2">
                          1 {{ selectedCurrency }} = €{{ formatEur(quote.rate) }}
                        </p>
                        <div class="mt-3 space-y-1.5 pt-3 border-t border-slate-200">
                          <div class="flex justify-between text-xs">
                            <span class="text-slate-500">Platform fee</span>
                            <span class="text-slate-700 font-medium">€{{ quote.platformFeeAmount.toFixed(2) }}</span>
                          </div>
                          <div class="flex justify-between text-xs">
                            <span class="text-slate-500">Network fee</span>
                            <span class="text-slate-700 font-medium">€{{ quote.networkFeeAmount.toFixed(2) }}</span>
                          </div>
                          <div class="flex justify-between text-xs font-semibold pt-1.5 border-t border-slate-200">
                            <span class="text-slate-600">Total EUR received</span>
                            <span class="text-slate-900">€{{ formatEur(quote.targetAmount) }}</span>
                          </div>
                        </div>
                      </template>

                      <!-- Quote expired -->
                      <div v-else-if="amount && amountNum > 0 && !quoteLoading && !quoteError" class="flex items-center justify-between">
                        <p class="text-slate-400 text-sm">Quote expired</p>
                        <button
                          @click="fetchQuote"
                          class="text-xs font-semibold text-success-600 bg-success-50 px-3 py-1.5 rounded-lg hover:bg-success-100 transition"
                        >
                          Refresh Quote
                        </button>
                      </div>
                    </div>

                    <!-- Desktop CTA -->
                    <button
                      @click="confirmSell"
                      :disabled="!quote || quoteLoading || !amount || !!amountError"
                      class="hidden lg:block w-full h-14 bg-danger-500 hover:bg-danger-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition text-base active:scale-95"
                    >
                      Sell {{ selectedCurrency }}
                    </button>
                  </div>
                </Transition>

                <!-- Placeholder when no currency selected (desktop) -->
                <div v-if="!selectedCurrency" class="hidden lg:flex flex-col items-center justify-center bg-slate-50 rounded-2xl p-10 text-center min-h-[200px]">
                  <p class="text-slate-400 text-sm">Select a crypto asset on the left to see your live quote</p>
                </div>
              </div>
            </div>
          </template>
        </div>
      </Transition>

      <!-- ===== STEP 2: Confirm — two-column on desktop ===== -->
      <Transition name="slide">
        <div v-if="step === 2 && quote" key="step2">
          <!-- Back button -->
          <button
            @click="step = 1"
            class="flex items-center gap-1 text-slate-500 hover:text-slate-700 mb-5 -ml-1"
          >
            <ChevronLeft :size="20" />
            <span class="text-sm">Edit</span>
          </button>

          <!-- Step indicator -->
          <div class="flex items-center gap-2 mb-6">
            <template v-for="(label, i) in ['Select', 'Quote', 'Confirm']" :key="label">
              <div class="flex items-center gap-2">
                <div
                  :class="[
                    'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300',
                    step > i + 1
                      ? 'bg-success-600 text-white'
                      : step === i + 1
                        ? 'bg-success-600 text-white ring-4 ring-success-100'
                        : 'bg-slate-100 text-slate-400',
                  ]"
                >
                  <svg v-if="step > i + 1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="w-3.5 h-3.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span v-else>{{ i + 1 }}</span>
                </div>
                <span
                  class="text-xs font-medium transition-colors duration-300"
                  :class="step === i + 1 ? 'text-success-600' : 'text-slate-400'"
                >{{ label }}</span>
              </div>
              <div
                v-if="i < 2"
                class="flex-1 h-0.5 rounded transition-all duration-500"
                :class="step > i + 1 ? 'bg-success-600' : 'bg-slate-200'"
              />
            </template>
          </div>

          <h1 class="text-2xl font-bold text-slate-900 mb-6">Confirm Sale</h1>

          <!-- Desktop two-column -->
          <div class="lg:grid lg:grid-cols-2 lg:gap-8">
            <!-- LEFT: back/edit hint (desktop only) -->
            <div class="hidden lg:flex flex-col justify-center items-center bg-slate-50 rounded-2xl p-8 text-center">
              <div class="w-16 h-16 bg-danger-50 rounded-full flex items-center justify-center mb-4">
                <ArrowRight :size="28" class="text-danger-500" />
              </div>
              <p class="text-slate-700 font-semibold mb-1">Almost there!</p>
              <p class="text-slate-400 text-sm">Review the details on the right and confirm your sale.</p>
              <button @click="step = 1" class="mt-4 text-sm text-brand-600 font-medium hover:underline">
                ← Edit order
              </button>
            </div>

            <!-- RIGHT: confirmation summary -->
            <div>
              <!-- Summary card -->
              <div class="bg-gradient-to-br from-danger-600 to-danger-800 rounded-2xl p-5 mb-4 text-white">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <p class="text-danger-200 text-xs mb-0.5">Selling</p>
                    <p class="text-2xl font-bold">{{ formatCrypto(amountNum, selectedCurrency) }}</p>
                    <p class="text-danger-200 text-sm">{{ selectedCurrency }}</p>
                  </div>
                  <ArrowRight :size="24" class="text-danger-300" />
                  <div class="text-right">
                    <p class="text-danger-200 text-xs mb-0.5">Receiving</p>
                    <p class="text-2xl font-bold">€{{ formatEur(quote.targetAmount) }}</p>
                  </div>
                </div>
              </div>

              <!-- Fee breakdown -->
              <div class="bg-white rounded-2xl p-5 mb-5 shadow-sm border border-slate-100">
                <h3 class="text-sm font-semibold text-slate-700 mb-4">Fee Breakdown</h3>
                <div class="space-y-3">
                  <div class="flex justify-between text-sm">
                    <span class="text-slate-500">Exchange rate</span>
                    <span class="font-medium text-slate-900">1 {{ selectedCurrency }} = €{{ formatEur(quote.rate) }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-slate-500">Platform fee</span>
                    <span class="font-medium text-slate-900">€{{ quote.platformFeeAmount.toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-slate-500">Network fee</span>
                    <span class="font-medium text-slate-900">€{{ quote.networkFeeAmount.toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-slate-500">Spread</span>
                    <span class="font-medium text-slate-900">{{ (quote.spread * 100).toFixed(2) }}%</span>
                  </div>
                  <div class="h-px bg-slate-100" />
                  <div class="flex justify-between text-sm font-bold">
                    <span class="text-slate-700">EUR received</span>
                    <span class="text-slate-900">€{{ formatEur(quote.targetAmount) }}</span>
                  </div>
                </div>
              </div>

              <!-- Timer warning -->
              <div v-if="quoteSecondsLeft > 0" class="flex items-center gap-2 mb-4 px-4 py-3 bg-warning-50 rounded-xl border border-warning-200">
                <Clock :size="14" class="text-warning-500 shrink-0" />
                <p class="text-xs text-warning-700 font-medium">
                  Quote expires in <span :class="timerColor" class="font-bold">{{ quoteSecondsLeft }}s</span>
                </p>
              </div>

              <div v-else class="flex items-center justify-between mb-4 px-4 py-3 bg-danger-50 rounded-xl border border-danger-200">
                <p class="text-xs text-danger-700 font-medium">Quote expired — please go back to refresh</p>
                <button @click="step = 1" class="text-xs text-danger-600 font-semibold underline">Go back</button>
              </div>

              <button
                @click="executeSell"
                :disabled="quoteSecondsLeft === 0 || isConfirming"
                class="w-full h-14 bg-danger-500 hover:bg-danger-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition text-base active:scale-95 mb-3 flex items-center justify-center gap-2"
              >
                <Loader2 v-if="isConfirming" class="w-4 h-4 animate-spin" />
                {{ isConfirming ? 'Processing...' : 'Confirm Sale' }}
              </button>
              <button @click="step = 1" class="w-full h-11 text-slate-500 text-sm font-medium">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Transition>

      <!-- ===== STEP 3: Processing — centered max-w-lg ===== -->
      <template v-if="step === 3">
        <div class="max-w-lg mx-auto">
          <div class="flex flex-col items-center pt-12">
            <div class="w-20 h-20 bg-danger-50 rounded-full flex items-center justify-center mb-6">
              <Loader2 :size="36" class="text-danger-500 animate-spin" />
            </div>
            <h2 class="text-xl font-bold text-slate-900 mb-2">Processing...</h2>
            <p class="text-slate-500 text-sm mb-8">Please wait while we execute your sale</p>

            <!-- Progress steps -->
            <div class="w-full space-y-3">
              <div
                v-for="s in statusSteps"
                :key="s.key"
                class="flex items-center gap-3 p-3 rounded-xl"
                :class="{
                  'bg-success-50': s.done,
                  'bg-danger-50': s.active || s.failed,
                  'bg-slate-50': !s.done && !s.active && !s.failed,
                }"
              >
                <div class="w-7 h-7 rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle v-if="s.done" :size="20" class="text-success-500" />
                  <XCircle v-else-if="s.failed" :size="20" class="text-danger-500" />
                  <Loader2 v-else-if="s.active" :size="20" class="text-danger-500 animate-spin" />
                  <div v-else class="w-5 h-5 rounded-full border-2 border-slate-300" />
                </div>
                <span
                  class="text-sm font-medium"
                  :class="{
                    'text-success-700': s.done,
                    'text-danger-600': s.active,
                    'text-slate-400': !s.done && !s.active && !s.failed,
                    'text-danger-700': s.failed,
                  }"
                >
                  {{ s.label }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- ===== STEP 4: Result — centered max-w-lg ===== -->
      <template v-if="step === 4">
        <div class="max-w-lg mx-auto">
          <div class="flex flex-col items-center pt-12 text-center">
            <!-- Success -->
            <template v-if="transaction?.status === 'completed'">
              <Transition name="success" appear>
                <div class="flex flex-col items-center">
                  <!-- Animated checkmark -->
                  <div class="relative w-24 h-24 mb-6">
                    <svg viewBox="0 0 100 100" class="w-24 h-24" fill="none">
                      <circle
                        cx="50" cy="50" r="46"
                        stroke="currentColor"
                        stroke-width="6"
                        class="text-success-500 animate-[circle-draw_0.5s_ease-out_forwards]"
                        style="stroke-dasharray: 289; stroke-dashoffset: 289;"
                      />
                      <path
                        d="M28 52 L44 68 L72 36"
                        stroke="currentColor"
                        stroke-width="6"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="text-success-500 animate-[check-draw_0.35s_ease-out_0.4s_forwards]"
                        style="stroke-dasharray: 60; stroke-dashoffset: 60;"
                      />
                    </svg>
                  </div>
                </div>
              </Transition>
              <h2 class="text-2xl font-bold text-slate-900 mb-2">Sale Complete!</h2>
              <p class="text-slate-500 mb-2">
                {{ formatCrypto(amountNum, selectedCurrency) }} {{ selectedCurrency }} sold successfully
              </p>
              <div class="bg-success-50 rounded-2xl p-4 mb-8 w-full">
                <p class="text-success-700 font-semibold text-lg">
                  +€{{ formatEur(quote?.targetAmount ?? 0) }} received
                </p>
              </div>
            </template>

            <!-- Failed -->
            <template v-else>
              <div class="w-24 h-24 bg-danger-50 rounded-full flex items-center justify-center mb-6">
                <XCircle :size="48" class="text-danger-500" />
              </div>
              <h2 class="text-2xl font-bold text-slate-900 mb-2">Transaction Failed</h2>
              <p class="text-slate-500 mb-2">{{ txError || transaction?.failureReason || 'Your transaction could not be completed.' }}</p>
              <div class="bg-danger-50 rounded-2xl p-4 mb-8 w-full">
                <p class="text-danger-700 text-sm">{{ transaction?.status ?? 'failed' }}</p>
              </div>
            </template>

            <!-- Actions -->
            <div class="w-full space-y-3">
              <RouterLink
                v-if="transaction?.id"
                :to="`/transactions/${transaction.id}`"
                class="block w-full h-12 bg-danger-500 text-white font-semibold rounded-2xl flex items-center justify-center hover:bg-danger-600 transition"
              >
                View Transaction
              </RouterLink>
              <button
                @click="resetFlow"
                class="w-full h-12 bg-slate-100 text-slate-700 font-semibold rounded-2xl hover:bg-slate-200 transition"
              >
                {{ transaction?.status === 'completed' ? 'Sell More' : 'Try Again' }}
              </button>
              <RouterLink
                to="/"
                class="block w-full h-12 text-slate-500 text-sm font-medium flex items-center justify-center"
              >
                Back to Home
              </RouterLink>
            </div>
          </div>
        </div>
      </template>
    </div>
  </AppLayout>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* CSS confetti animation */
.confetti-dot {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: confetti-fall 1.2s ease-out forwards;
  opacity: 0;
}

@keyframes confetti-fall {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-80px) scale(0.5);
  }
}

.confetti-1 {
  top: 10px; left: 5px;
  background-color: #22c55e; /* success green */
  animation-delay: 0s;
  animation-duration: 1s;
}
.confetti-2 {
  top: 0; left: 40px;
  background-color: #f59e0b; /* warning amber */
  animation-delay: 0.1s;
  animation-duration: 1.1s;
  width: 6px; height: 6px;
}
.confetti-3 {
  top: 15px; right: 5px;
  background-color: #3b82f6; /* info blue */
  animation-delay: 0.15s;
  animation-duration: 0.9s;
}
.confetti-4 {
  top: 0; right: 30px;
  background-color: #ec4899; /* pink */
  animation-delay: 0.05s;
  animation-duration: 1.2s;
  width: 7px; height: 7px;
}
.confetti-5 {
  top: 20px; left: 50%;
  background-color: #8b5cf6; /* purple */
  animation-delay: 0.2s;
  animation-duration: 1s;
  width: 5px; height: 5px;
}
.confetti-6 {
  top: 5px; left: 20px;
  background-color: #f97316; /* orange */
  animation-delay: 0.3s;
  animation-duration: 1.1s;
  width: 9px; height: 9px;
}
.confetti-7 {
  top: 5px; right: 15px;
  background-color: #06b6d4; /* cyan */
  animation-delay: 0.25s;
  animation-duration: 0.95s;
  width: 6px; height: 6px;
}
.confetti-8 {
  top: 12px; left: 30px;
  background-color: #84cc16; /* lime */
  animation-delay: 0.08s;
  animation-duration: 1.15s;
  width: 7px; height: 7px;
}
</style>
