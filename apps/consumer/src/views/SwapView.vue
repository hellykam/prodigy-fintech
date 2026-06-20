<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { createQuote, acceptQuote, createTransaction } from '@/composables/useApi'
import type { Quote } from '@/composables/useApi'
import AppLayout from '@/components/AppLayout.vue'
import BottomDrawer from '@/components/BottomDrawer.vue'
import { ArrowDownUp, ChevronDown, AlertCircle, Loader2 } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

// ── Step ───────────────────────────────────────────────────────
// 1 = select currencies + amount, 2 = review, 3 = success
const step = ref<1 | 2 | 3>(1)

// ── Selections ─────────────────────────────────────────────────
const fromCurrency = ref((route.query.from as string) ?? '')
const toCurrency = ref('')
const amount = ref('')
const showFromDrawer = ref(false)
const showToDrawer = ref(false)

// ── Quote ──────────────────────────────────────────────────────
const quote = ref<Quote | null>(null)
const quoteLoading = ref(false)
const quoteError = ref('')
const amountTouched = ref(false)

// ── Execution ──────────────────────────────────────────────────
const isConfirming = ref(false)
const execError = ref('')

// ── User wallets (fetched once) ─────────────────────────────────
const wallets = ref<Array<{ currency: string; balance: number }>>([])
const walletsLoading = ref(false)

async function loadWallets() {
  if (!auth.user?.id) return
  walletsLoading.value = true
  try {
    const res = await fetch(`/api/users/${auth.user.id}`)
    if (!res.ok) return
    const data = await res.json()
    const user = data.user ?? data
    wallets.value = (user.wallets ?? []).filter(
      (w: any) => w.balance > 0 && !['EUR', 'USD', 'GBP'].includes(w.currency),
    )
  } catch {
    // silent — non-critical
  } finally {
    walletsLoading.value = false
  }
}

loadWallets()

const fromWallet = computed(() => wallets.value.find((w) => w.currency === fromCurrency.value))
const cryptoOptions = ['BTC', 'ETH', 'USDT'] as const

// ── Validation ──────────────────────────────────────────────────
const amountNum = computed(() => parseFloat(amount.value) || 0)
const amountError = computed(() => {
  if (!amountTouched.value) return ''
  if (!amount.value || amountNum.value <= 0) return 'Enter an amount greater than 0'
  if (fromWallet.value && amountNum.value > fromWallet.value.balance)
    return `Insufficient ${fromCurrency.value} balance`
  return ''
})

// ── Quote fetching (debounced) ──────────────────────────────────
let quoteTimer: ReturnType<typeof setTimeout>

watch(amount, () => {
  clearTimeout(quoteTimer)
  quote.value = null
  quoteError.value = ''
  if (!amount.value || amountNum.value <= 0 || !fromCurrency.value || !toCurrency.value) return
  quoteTimer = setTimeout(fetchQuote, 500)
})

async function fetchQuote() {
  if (!fromCurrency.value || !toCurrency.value || amountNum.value <= 0) return
  quoteLoading.value = true
  quoteError.value = ''
  try {
    const q = await createQuote({
      sourceCurrency: fromCurrency.value,
      targetCurrency: toCurrency.value,
      sourceAmount: amountNum.value,
      userId: auth.user?.id,
    })
    quote.value = q
  } catch (e: any) {
    quoteError.value = e.message || 'Could not fetch quote'
    quote.value = null
  } finally {
    quoteLoading.value = false
  }
}

// ── Swap execution ──────────────────────────────────────────────
async function executeSwap() {
  if (!quote.value || isConfirming.value) return
  isConfirming.value = true
  execError.value = ''
  try {
    await acceptQuote(quote.value.id)
    await createTransaction({
      userId: auth.user!.id,
      quoteId: quote.value.id,
    })
    step.value = 3
  } catch (e: any) {
    execError.value = e.message || 'Swap failed. Please try again.'
  } finally {
    isConfirming.value = false
  }
}

// ── Navigation helpers ──────────────────────────────────────────
function selectFrom(currency: string) {
  fromCurrency.value = currency
  toCurrency.value = ''
  quote.value = null
  showFromDrawer.value = false
}

function selectTo(currency: string) {
  toCurrency.value = currency
  showToDrawer.value = false
  if (fromCurrency.value && currency && amountNum.value > 0) fetchQuote()
}

function goToReview() {
  amountTouched.value = true
  if (amountError.value || !quote.value) return
  step.value = 2
}

function resetFlow() {
  step.value = 1
  fromCurrency.value = ''
  toCurrency.value = ''
  amount.value = ''
  quote.value = null
  quoteError.value = ''
  execError.value = ''
  amountTouched.value = false
}

onUnmounted(() => clearTimeout(quoteTimer))

// ── Display helpers ─────────────────────────────────────────────
const cryptoIcon: Record<string, string> = { BTC: '₿', ETH: 'Ξ', USDT: '₮' }

function formatBalance(b: number, c: string) {
  if (c === 'BTC') return `${b.toFixed(8)} BTC`
  if (c === 'ETH') return `${b.toFixed(6)} ETH`
  return `${b.toFixed(2)} ${c}`
}
</script>

<template>
  <AppLayout>
    <div class="px-4 pt-10 pb-6 max-w-md mx-auto">

      <!-- ===== STEP 1: Select currencies + enter amount ===== -->
      <template v-if="step === 1">
        <button
          @click="router.back()"
          class="flex items-center gap-1 text-slate-500 hover:text-slate-700 mb-5 -ml-1"
        >
          <span class="text-sm">← Back</span>
        </button>

        <h1 class="text-2xl font-bold text-slate-900 mb-6">Swap Crypto</h1>

        <!-- FROM selector -->
        <div class="mb-3">
          <label class="block text-xs font-medium text-slate-500 mb-1.5">From</label>
          <button
            @click="showFromDrawer = true"
            class="w-full bg-white rounded-2xl p-4 flex items-center gap-3 active:scale-[0.98] transition border border-slate-100 hover:border-brand-200"
          >
            <div
              class="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center font-bold text-brand-600"
            >
              {{ fromCurrency ? (cryptoIcon[fromCurrency] ?? fromCurrency.charAt(0)) : '?' }}
            </div>
            <div class="flex-1 text-left">
              <p class="font-semibold text-slate-900">{{ fromCurrency || 'Select wallet' }}</p>
              <p v-if="fromWallet" class="text-xs text-slate-400 mt-0.5">
                {{ formatBalance(fromWallet.balance, fromCurrency) }}
              </p>
            </div>
            <ChevronDown class="w-4 h-4 text-slate-400" />
          </button>
        </div>

        <!-- Swap arrow divider -->
        <div class="flex justify-center my-2">
          <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
            <ArrowDownUp class="w-4 h-4 text-slate-400" />
          </div>
        </div>

        <!-- TO selector -->
        <div class="mb-6">
          <label class="block text-xs font-medium text-slate-500 mb-1.5">To</label>
          <button
            @click="showToDrawer = true"
            :disabled="!fromCurrency"
            class="w-full bg-white rounded-2xl p-4 flex items-center gap-3 active:scale-[0.98] transition border border-slate-100 hover:border-brand-200 disabled:opacity-50"
          >
            <div
              class="w-10 h-10 rounded-full bg-success-50 flex items-center justify-center font-bold text-success-600"
            >
              {{ toCurrency ? (cryptoIcon[toCurrency] ?? toCurrency.charAt(0)) : '?' }}
            </div>
            <div class="flex-1 text-left">
              <p class="font-semibold text-slate-900">{{ toCurrency || 'Select currency' }}</p>
            </div>
            <ChevronDown class="w-4 h-4 text-slate-400" />
          </button>
        </div>

        <!-- Amount input (show only when both selected) -->
        <div v-if="fromCurrency && toCurrency" class="mb-6">
          <label class="block text-xs font-medium text-slate-500 mb-1.5">
            Amount ({{ fromCurrency }})
          </label>
          <div class="relative">
            <input
              v-model="amount"
              type="number"
              inputmode="decimal"
              placeholder="0.00"
              min="0"
              @blur="amountTouched = true"
              :class="[
                'w-full bg-white rounded-2xl px-4 py-4 text-2xl font-bold text-slate-900 border focus:outline-none focus:ring-2 transition',
                amountError
                  ? 'border-danger-400 ring-1 ring-danger-400'
                  : 'border-slate-100 focus:border-brand-400 focus:ring-brand-400',
              ]"
            />
            <button
              v-if="fromWallet"
              @click="amount = fromWallet.balance.toString()"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-brand-600 font-semibold hover:underline"
            >
              MAX
            </button>
          </div>
          <p v-if="amountError" class="mt-1.5 text-xs text-danger-600">{{ amountError }}</p>

          <!-- Live quote display -->
          <div v-if="quoteLoading" class="mt-3 flex items-center gap-2 text-slate-400 text-sm">
            <Loader2 class="w-4 h-4 animate-spin" />
            Getting best rate…
          </div>
          <div
            v-else-if="quoteError"
            class="mt-3 flex items-center gap-2 text-danger-600 text-sm"
          >
            <AlertCircle class="w-4 h-4" />
            {{ quoteError }}
          </div>
          <div v-else-if="quote" class="mt-3 bg-slate-50 rounded-xl p-3 space-y-1">
            <div class="flex justify-between text-sm">
              <span class="text-slate-500">You receive</span>
              <span class="font-semibold text-slate-900">
                {{ formatBalance(quote.targetAmount, toCurrency) }}
              </span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="text-slate-400">Rate</span>
              <span class="text-slate-600">
                1 {{ fromCurrency }} = {{ quote.rate.toFixed(6) }} {{ toCurrency }}
              </span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="text-slate-400">Platform fee</span>
              <span class="text-slate-600">
                {{ quote.platformFeeAmount ? `€${quote.platformFeeAmount.toFixed(2)}` : 'Free' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Continue CTA -->
        <button
          v-if="fromCurrency && toCurrency"
          @click="goToReview"
          :disabled="!quote || !!amountError || quoteLoading"
          class="w-full h-14 bg-brand-600 text-white font-bold rounded-2xl text-base hover:bg-brand-700 active:scale-[0.98] transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Review Swap
        </button>
      </template>

      <!-- ===== STEP 2: Review & confirm ===== -->
      <template v-else-if="step === 2">
        <button
          @click="step = 1"
          class="flex items-center gap-1 text-slate-500 hover:text-slate-700 mb-5 -ml-1"
        >
          <span class="text-sm">← Edit</span>
        </button>

        <h1 class="text-2xl font-bold text-slate-900 mb-6">Review Swap</h1>

        <!-- Summary card -->
        <div
          class="bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl p-5 mb-4 text-white"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-brand-200 text-xs mb-0.5">You send</p>
              <p class="text-2xl font-bold">{{ amount }} {{ fromCurrency }}</p>
            </div>
            <ArrowDownUp class="w-5 h-5 text-brand-300" />
            <div class="text-right">
              <p class="text-brand-200 text-xs mb-0.5">You receive</p>
              <p class="text-2xl font-bold">{{ formatBalance(quote!.targetAmount, toCurrency) }}</p>
            </div>
          </div>
        </div>

        <!-- Fee breakdown -->
        <div class="bg-white rounded-2xl p-5 mb-5 border border-slate-100">
          <h3 class="text-sm font-semibold text-slate-700 mb-4">Details</h3>
          <div class="space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-slate-500">Exchange rate</span>
              <span class="font-medium text-slate-900">
                1 {{ fromCurrency }} = {{ quote!.rate.toFixed(6) }} {{ toCurrency }}
              </span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-slate-500">Platform fee</span>
              <span class="font-medium text-slate-900">
                {{ quote!.platformFeeAmount ? `€${quote!.platformFeeAmount.toFixed(2)}` : '—' }}
              </span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-slate-500">Network fee</span>
              <span class="font-medium text-slate-900">
                {{ quote!.networkFeeAmount ? `€${quote!.networkFeeAmount.toFixed(2)}` : '—' }}
              </span>
            </div>
            <div class="h-px bg-slate-100" />
            <div class="flex justify-between text-sm font-bold">
              <span class="text-slate-700">Total sent</span>
              <span class="text-slate-900">{{ amount }} {{ fromCurrency }}</span>
            </div>
          </div>
        </div>

        <p class="text-xs text-slate-400 text-center mb-4">Rate valid for ~30 seconds</p>

        <button
          @click="executeSwap"
          :disabled="isConfirming"
          class="w-full h-14 bg-brand-600 text-white font-bold rounded-2xl text-base hover:bg-brand-700 active:scale-[0.98] transition flex items-center justify-center gap-2 disabled:opacity-70"
        >
          <Loader2 v-if="isConfirming" class="w-5 h-5 animate-spin" />
          {{ isConfirming ? 'Processing…' : 'Confirm Swap' }}
        </button>

        <p v-if="execError" class="mt-3 text-xs text-danger-600 text-center">{{ execError }}</p>

        <button
          @click="step = 1"
          class="w-full h-11 text-slate-500 text-sm font-medium mt-2"
        >
          Cancel
        </button>
      </template>

      <!-- ===== STEP 3: Success ===== -->
      <template v-else-if="step === 3">
        <div class="flex flex-col items-center justify-center min-h-[70vh] text-center">
          <!-- Animated checkmark -->
          <div class="w-24 h-24 mb-6">
            <svg viewBox="0 0 100 100" class="w-24 h-24" fill="none">
              <circle
                cx="50"
                cy="50"
                r="46"
                stroke="currentColor"
                stroke-width="6"
                class="text-success-500"
                style="stroke-dasharray: 289; stroke-dashoffset: 289; animation: circle-draw 0.5s ease-out 0.1s forwards;"
              />
              <path
                d="M28 52 L44 68 L72 36"
                stroke="currentColor"
                stroke-width="6"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="text-success-500"
                style="stroke-dasharray: 60; stroke-dashoffset: 60; animation: check-draw 0.35s ease-out 0.5s forwards;"
              />
            </svg>
          </div>

          <h1 class="text-2xl font-bold text-slate-900 mb-2">Swap Complete!</h1>
          <p class="text-slate-500 text-sm mb-1">You received</p>
          <p class="text-3xl font-bold text-success-600 mb-6">
            {{ formatBalance(quote!.targetAmount, toCurrency) }}
          </p>

          <div class="bg-slate-50 rounded-2xl p-4 w-full mb-8 space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-slate-500">Sent</span>
              <span class="font-medium">{{ amount }} {{ fromCurrency }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">Rate</span>
              <span class="font-medium">
                {{ quote!.rate.toFixed(6) }} {{ toCurrency }}/{{ fromCurrency }}
              </span>
            </div>
          </div>

          <button
            @click="router.push('/transactions')"
            class="w-full h-12 bg-brand-600 text-white font-semibold rounded-2xl mb-3 hover:bg-brand-700 active:scale-[0.98] transition"
          >
            View Transaction
          </button>
          <button
            @click="resetFlow"
            class="w-full h-12 bg-slate-100 text-slate-700 font-semibold rounded-2xl mb-3 hover:bg-slate-200 active:scale-[0.98] transition"
          >
            Swap Again
          </button>
          <button
            @click="router.push('/home')"
            class="w-full h-12 border border-slate-200 text-slate-600 font-medium rounded-2xl hover:bg-slate-50 active:scale-[0.98] transition text-sm"
          >
            Back to Home
          </button>
        </div>
      </template>

      <!-- ===== FROM wallet drawer ===== -->
      <BottomDrawer :open="showFromDrawer" title="Select wallet" @close="showFromDrawer = false">
        <div class="space-y-2 py-2">
          <p
            v-if="!walletsLoading && wallets.length === 0"
            class="text-slate-400 text-sm text-center py-4"
          >
            No crypto wallets with balance
          </p>
          <div v-if="walletsLoading" class="flex justify-center py-4">
            <Loader2 class="w-5 h-5 animate-spin text-slate-400" />
          </div>
          <button
            v-for="w in wallets"
            :key="w.currency"
            @click="selectFrom(w.currency)"
            class="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 active:scale-[0.98] transition"
          >
            <div
              class="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center font-bold text-brand-600"
            >
              {{ cryptoIcon[w.currency] ?? w.currency.charAt(0) }}
            </div>
            <div class="flex-1 text-left">
              <p class="font-semibold text-slate-900">{{ w.currency }}</p>
              <p class="text-xs text-slate-400">{{ formatBalance(w.balance, w.currency) }}</p>
            </div>
            <span v-if="w.currency === fromCurrency" class="text-brand-600 text-xs font-medium">
              Selected
            </span>
          </button>
        </div>
      </BottomDrawer>

      <!-- ===== TO currency drawer ===== -->
      <BottomDrawer :open="showToDrawer" title="Select currency" @close="showToDrawer = false">
        <div class="space-y-2 py-2">
          <button
            v-for="currency in cryptoOptions.filter((c) => c !== fromCurrency)"
            :key="currency"
            @click="selectTo(currency)"
            class="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 active:scale-[0.98] transition"
          >
            <div
              class="w-10 h-10 rounded-full bg-success-50 flex items-center justify-center font-bold text-success-600"
            >
              {{ cryptoIcon[currency] }}
            </div>
            <div class="flex-1 text-left">
              <p class="font-semibold text-slate-900">{{ currency }}</p>
            </div>
            <span v-if="currency === toCurrency" class="text-brand-600 text-xs font-medium">
              Selected
            </span>
          </button>
        </div>
      </BottomDrawer>

    </div>
  </AppLayout>
</template>

<style>
@keyframes circle-draw {
  from { stroke-dashoffset: 289; }
  to   { stroke-dashoffset: 0; }
}
@keyframes check-draw {
  from { stroke-dashoffset: 60; }
  to   { stroke-dashoffset: 0; }
}
</style>
