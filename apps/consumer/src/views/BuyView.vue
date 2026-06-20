<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { createQuote, acceptQuote, createTransaction, fetchTransaction } from '@/composables/useApi'
import type { Quote, Transaction } from '@/composables/useApi'
import { useWebSocket, type WsSystemEvent } from '@/composables/useWebSocket'
import { useToast } from '@/composables/useToast'
import { fetchTransactions } from '@/composables/useApi'
import AppLayout from '@/components/AppLayout.vue'
import { Button } from '@prodigy/ui'
import { ChevronLeft, ChevronDown, ChevronUp, CheckCircle, XCircle, Clock, Loader2, ArrowRight } from 'lucide-vue-next'

const router = useRouter()
const auth = useAuthStore()
const toast = useToast()

// Steps: 1 = enter amount, 2 = confirm, 3 = processing, 4 = result
const step = ref<1 | 2 | 3 | 4>(1)

// Step 1 state
const amount = ref('')
const selectedCrypto = ref<'BTC' | 'ETH' | 'USDT'>('BTC')
const cryptoOptions = ['BTC', 'ETH', 'USDT'] as const
const quote = ref<Quote | null>(null)
const quoteLoading = ref(false)
const quoteError = ref('')
const showFeeBreakdown = ref(false)

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

// Debounce
let debounceTimer: ReturnType<typeof setTimeout> | null = null

const TERMINAL_STATUSES = ['completed', 'failed', 'rejected']

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

async function fetchQuote() {
  const amt = parseFloat(amount.value)
  if (!amt || amt <= 0) { quote.value = null; quoteError.value = ''; return }
  quoteLoading.value = true
  quoteError.value = ''
  try {
    const q = await createQuote({
      sourceCurrency: 'EUR',
      targetCurrency: selectedCrypto.value,
      sourceAmount: amt,
      userId: auth.user?.id,
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

function debouncedFetchQuote() {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(fetchQuote, 500)
}

watch([amount, selectedCrypto], debouncedFetchQuote)

// Step 2: Confirm
async function confirmPurchase() {
  if (!quote.value) return
  step.value = 2
}

// Step 3: Execute
async function executePurchase() {
  if (!quote.value || isConfirming.value) return
  isConfirming.value = true
  step.value = 3
  txLoading.value = true
  txError.value = ''
  try {
    // Accept quote
    await acceptQuote(quote.value.id)
    // Create transaction
    const tx = await createTransaction({
      userId: auth.user!.id,
      quoteId: quote.value.id,
    })
    transaction.value = tx
    startPolling(tx.id)
    // isConfirming stays true — we've navigated to step 3/4
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
        step.value = 4
      }
    } catch {}
  }, 1500)
}

function stopPolling() {
  if (pollTimer) { clearInterval(pollTimer); pollTimer = null }
}

// WebSocket for live transaction status updates
useWebSocket((event: WsSystemEvent) => {
  const isOurTxn = event.entityId === transaction.value?.id
  const isTerminal = ['TRANSACTION_COMPLETED', 'TRANSACTION_FAILED', 'TRANSACTION_RISK_REJECTED'].includes(event.eventName)
  if (isOurTxn && isTerminal) {
    fetchTransaction(transaction.value!.id).then((tx) => {
      transaction.value = tx
      if (TERMINAL_STATUSES.includes(tx.status)) {
        stopPolling()
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
  quote.value = null
  transaction.value = null
  txError.value = ''
  quoteError.value = ''
}

// Computed
const timerColor = computed(() => {
  if (quoteSecondsLeft.value > 15) return 'text-success-600'
  if (quoteSecondsLeft.value > 5) return 'text-warning-500'
  return 'text-danger-500'
})

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
  const currentIdx = allSteps.findIndex(s => s.key === current)
  return allSteps.map((s, i) => ({
    ...s,
    done: i < currentIdx || current === 'completed',
    active: s.key === current && current !== 'completed',
    failed: (current === 'failed' || current === 'rejected') && i === currentIdx,
  }))
})

function formatAmount(n: number, currency: string) {
  if (currency === 'BTC') return n.toFixed(8)
  if (currency === 'ETH') return n.toFixed(6)
  return n.toFixed(2)
}

// First-transaction confetti
const txCountOnLoad = ref(0)
const isFirstTx = computed(() => txCountOnLoad.value <= 0)

onMounted(async () => {
  try {
    if (auth.user?.id) {
      const result = await fetchTransactions({ userId: auth.user.id })
      txCountOnLoad.value = result?.items?.length ?? 0
    }
  } catch {}
})

watch(step, (newStep) => {
  if (newStep === 4 && transaction.value?.status === 'completed' && isFirstTx.value) {
    import('canvas-confetti').then(({ default: confetti }) => {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.5 } })
    })
  }
})
</script>

<template>
  <AppLayout>
    <div class="px-4 pt-10 pb-6 max-w-5xl mx-auto">

      <!-- ===== STEP 1: Enter Amount — two-column on desktop ===== -->
      <template v-if="step === 1">
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
                    ? 'bg-brand-600 text-white'
                    : step === i + 1
                      ? 'bg-brand-600 text-white ring-4 ring-brand-100'
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
                :class="step === i + 1 ? 'text-brand-600' : 'text-slate-400'"
              >{{ label }}</span>
            </div>
            <div
              v-if="i < 2"
              class="flex-1 h-0.5 rounded transition-all duration-500"
              :class="step > i + 1 ? 'bg-brand-600' : 'bg-slate-200'"
            />
          </template>
        </div>

        <h1 class="text-2xl font-bold text-slate-900 mb-6">Buy Crypto</h1>

        <!-- Desktop two-column / mobile single column -->
        <div class="lg:grid lg:grid-cols-2 lg:gap-8">
          <!-- LEFT: currency selector + amount input -->
          <div>
            <!-- Amount input -->
            <div class="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-slate-100">
              <div class="relative">
                <label class="absolute top-0 left-0 text-xs text-slate-400">Amount (EUR)</label>
                <div class="flex items-center gap-3 pt-5">
                  <span class="text-2xl font-medium text-slate-400">€</span>
                  <input
                    v-model="amount"
                    type="number"
                    min="1"
                    step="any"
                    placeholder="0.00"
                    class="flex-1 text-4xl font-bold text-slate-900 bg-transparent outline-none placeholder-slate-200 min-w-0"
                  />
                  <span class="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">EUR</span>
                </div>
              </div>
            </div>

            <!-- Crypto selector -->
            <div class="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-slate-100">
              <p class="text-sm text-slate-500 mb-3">I want to buy</p>
              <div class="flex gap-2">
                <button
                  v-for="c in cryptoOptions"
                  :key="c"
                  @click="selectedCrypto = c"
                  :class="[
                    'flex-1 h-11 rounded-xl font-semibold text-sm transition',
                    selectedCrypto === c
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  ]"
                >
                  {{ c }}
                </button>
              </div>
            </div>

            <!-- CTA (mobile only — on desktop it's below the right column) -->
            <button
              @click="confirmPurchase"
              :disabled="!quote || quoteLoading || !amount"
              class="lg:hidden w-full h-14 bg-brand-600 hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition text-base active:scale-95"
            >
              Confirm &amp; Buy
            </button>
          </div>

          <!-- RIGHT: live quote card -->
          <div>
            <div class="bg-white rounded-2xl p-5 mb-5 shadow-sm border border-slate-100 min-h-[80px]">
              <p class="text-sm font-semibold text-slate-700 mb-3">Live Quote</p>
              <!-- Loading -->
              <div v-if="quoteLoading" class="flex items-center gap-3">
                <Loader2 :size="18" class="text-brand-500 animate-spin shrink-0" />
                <p class="text-slate-500 text-sm">Getting best price...</p>
              </div>

              <!-- Error -->
              <p v-else-if="quoteError" class="text-danger-600 text-sm">{{ quoteError }}</p>

              <!-- No amount -->
              <p v-else-if="!amount || parseFloat(amount) <= 0" class="text-slate-400 text-sm">
                Enter an amount to see your quote
              </p>

              <!-- Quote -->
              <template v-else-if="quote">
                <div class="flex items-center justify-between mb-3">
                  <div>
                    <p class="text-slate-500 text-xs">You'll receive</p>
                    <p class="text-2xl font-bold text-slate-900">
                      {{ formatAmount(quote.targetAmount, selectedCrypto) }} <span class="text-brand-600">{{ selectedCrypto }}</span>
                    </p>
                  </div>
                  <!-- Timer -->
                  <div :class="['text-sm font-mono font-bold', timerColor]">
                    <Clock :size="12" class="inline mr-1" />
                    {{ quoteSecondsLeft }}s
                  </div>
                </div>

                <!-- Rate -->
                <p class="text-xs text-slate-400 mb-2">
                  1 EUR = {{ formatAmount(1 / quote.rate, selectedCrypto) }} {{ selectedCrypto }}
                </p>

                <!-- Fee breakdown toggle -->
                <button
                  @click="showFeeBreakdown = !showFeeBreakdown"
                  class="flex items-center gap-1 text-xs text-brand-600 font-medium"
                >
                  Fee breakdown
                  <component :is="showFeeBreakdown ? ChevronUp : ChevronDown" :size="14" />
                </button>

                <div v-if="showFeeBreakdown" class="mt-3 space-y-1.5 pt-3 border-t border-slate-100">
                  <div class="flex justify-between text-xs">
                    <span class="text-slate-500">Platform fee</span>
                    <span class="text-slate-700 font-medium">€{{ quote.platformFeeAmount.toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between text-xs">
                    <span class="text-slate-500">Network fee</span>
                    <span class="text-slate-700 font-medium">€{{ quote.networkFeeAmount.toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between text-xs">
                    <span class="text-slate-500">Spread</span>
                    <span class="text-slate-700 font-medium">{{ (quote.spread * 100).toFixed(2) }}%</span>
                  </div>
                  <div class="flex justify-between text-xs font-semibold pt-1.5 border-t border-slate-100">
                    <span class="text-slate-600">Total fees</span>
                    <span class="text-slate-900">€{{ (quote.platformFeeAmount + quote.networkFeeAmount).toFixed(2) }}</span>
                  </div>
                </div>
              </template>
            </div>

            <!-- CTA desktop -->
            <button
              @click="confirmPurchase"
              :disabled="!quote || quoteLoading || !amount"
              class="hidden lg:block w-full h-14 bg-brand-600 hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition text-base active:scale-95"
            >
              Confirm &amp; Buy
            </button>
          </div>
        </div>
      </template>

      <!-- ===== STEP 2: Confirm — two-column on desktop ===== -->
      <template v-if="step === 2 && quote">
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
                    ? 'bg-brand-600 text-white'
                    : step === i + 1
                      ? 'bg-brand-600 text-white ring-4 ring-brand-100'
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
                :class="step === i + 1 ? 'text-brand-600' : 'text-slate-400'"
              >{{ label }}</span>
            </div>
            <div
              v-if="i < 2"
              class="flex-1 h-0.5 rounded transition-all duration-500"
              :class="step > i + 1 ? 'bg-brand-600' : 'bg-slate-200'"
            />
          </template>
        </div>

        <h1 class="text-2xl font-bold text-slate-900 mb-6">Confirm Purchase</h1>

        <!-- Desktop two-column / mobile single column -->
        <div class="lg:grid lg:grid-cols-2 lg:gap-8">
          <!-- LEFT: back/edit hint -->
          <div class="hidden lg:flex flex-col justify-center items-center bg-slate-50 rounded-2xl p-8 text-center">
            <div class="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mb-4">
              <ArrowRight :size="28" class="text-brand-600" />
            </div>
            <p class="text-slate-700 font-semibold mb-1">Almost there!</p>
            <p class="text-slate-400 text-sm">Review the details on the right and confirm your purchase.</p>
            <button @click="step = 1" class="mt-4 text-sm text-brand-600 font-medium hover:underline">
              ← Edit order
            </button>
          </div>

          <!-- RIGHT: confirmation summary card -->
          <div>
            <!-- Summary card -->
            <div class="bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl p-5 mb-4 text-white">
              <div class="flex items-center justify-between mb-4">
                <div>
                  <p class="text-brand-200 text-xs mb-0.5">Sending</p>
                  <p class="text-2xl font-bold">€{{ parseFloat(amount).toFixed(2) }}</p>
                </div>
                <ArrowRight :size="24" class="text-brand-300" />
                <div class="text-right">
                  <p class="text-brand-200 text-xs mb-0.5">Receiving</p>
                  <p class="text-2xl font-bold">{{ formatAmount(quote.targetAmount, selectedCrypto) }}</p>
                  <p class="text-brand-200 text-sm">{{ selectedCrypto }}</p>
                </div>
              </div>
            </div>

            <!-- Fee breakdown (always visible on confirm) -->
            <div class="bg-white rounded-2xl p-5 mb-5 shadow-sm border border-slate-100">
              <h3 class="text-sm font-semibold text-slate-700 mb-4">Fee Breakdown</h3>
              <div class="space-y-3">
                <div class="flex justify-between text-sm">
                  <span class="text-slate-500">Exchange rate</span>
                  <span class="font-medium text-slate-900">1 EUR = {{ formatAmount(1 / quote.rate, selectedCrypto) }} {{ selectedCrypto }}</span>
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
                  <span class="text-slate-700">Total paid</span>
                  <span class="text-slate-900">€{{ parseFloat(amount).toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <button
              @click="executePurchase"
              :disabled="isConfirming"
              class="w-full h-14 bg-brand-600 hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition text-base active:scale-95 mb-3 flex items-center justify-center gap-2"
            >
              <Loader2 v-if="isConfirming" class="w-4 h-4 animate-spin" />
              {{ isConfirming ? 'Processing...' : 'Confirm Purchase' }}
            </button>
            <button @click="step = 1" class="w-full h-11 text-slate-500 text-sm font-medium">
              Cancel
            </button>
          </div>
        </div>
      </template>

      <!-- ===== STEP 3: Processing — centered max-w-lg ===== -->
      <template v-if="step === 3">
        <div class="max-w-lg mx-auto">
          <div class="flex flex-col items-center pt-12">
            <div class="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mb-6">
              <Loader2 :size="36" class="text-brand-600 animate-spin" />
            </div>
            <h2 class="text-xl font-bold text-slate-900 mb-2">Processing...</h2>
            <p class="text-slate-500 text-sm mb-8">Please wait while we execute your order</p>

            <!-- Progress steps -->
            <div class="w-full space-y-3">
              <div
                v-for="s in statusSteps"
                :key="s.key"
                class="flex items-center gap-3 p-3 rounded-xl"
                :class="{
                  'bg-success-50': s.done,
                  'bg-brand-50': s.active,
                  'bg-slate-50': !s.done && !s.active && !s.failed,
                  'bg-danger-50': s.failed,
                }"
              >
                <div class="w-7 h-7 rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle v-if="s.done" :size="20" class="text-success-500" />
                  <XCircle v-else-if="s.failed" :size="20" class="text-danger-500" />
                  <Loader2 v-else-if="s.active" :size="20" class="text-brand-600 animate-spin" />
                  <div v-else class="w-5 h-5 rounded-full border-2 border-slate-300" />
                </div>
                <span
                  class="text-sm font-medium"
                  :class="{
                    'text-success-700': s.done,
                    'text-brand-700': s.active,
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
              <h2 class="text-2xl font-bold text-slate-900 mb-2">Purchase Complete!</h2>
              <p class="text-slate-500 mb-2">
                {{ formatAmount(quote?.targetAmount ?? 0, selectedCrypto) }} {{ selectedCrypto }} added to your wallet
              </p>
              <div class="bg-success-50 rounded-2xl p-4 mb-8 w-full">
                <p class="text-success-700 font-semibold text-lg">
                  +{{ formatAmount(quote?.targetAmount ?? 0, selectedCrypto) }} {{ selectedCrypto }}
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
                class="block w-full h-12 bg-brand-600 text-white font-semibold rounded-2xl flex items-center justify-center hover:bg-brand-700 transition"
              >
                View Transaction
              </RouterLink>
              <button
                @click="resetFlow"
                class="w-full h-12 bg-slate-100 text-slate-700 font-semibold rounded-2xl hover:bg-slate-200 transition"
              >
                {{ transaction?.status === 'completed' ? 'Buy More' : 'Try Again' }}
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
