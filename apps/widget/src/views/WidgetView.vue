<script setup lang="ts">
import { ref, computed, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import { TrendingUp, TrendingDown, CheckCircle, Loader2, Bitcoin, Zap, DollarSign } from 'lucide-vue-next'
import { Button, Badge } from '@prodigy/ui'
import { apiFetch } from '../composables/useApi'

const route = useRoute()

// ── Types ──────────────────────────────────────────────────────────────────
interface PriceSnapshot {
  currency: string
  midPrice: number
  bid: number
  ask: number
  spreadPct: number
  updatedAt: string
}

interface Quote {
  id: string
  sourceCurrency: string
  targetCurrency: string
  sourceAmount: number
  targetAmount: number
  rate: number
  platformFeeAmount: number
  partnerFeeAmount: number
  networkFeeAmount: number
  expiresAt: string
  status: string
}

interface Transaction {
  id: string
  type: string
  status: string
  createdAt: string
}

// ── Widget Config (branding) ───────────────────────────────────────────────
interface WidgetConfig {
  id: string
  b2bClientId: string
  name: string
  primaryColorToken: string
  themeMode: string
  allowedFiatCurrencies: string[]
  allowedCryptoCurrencies: string[]
  defaultFiatCurrency: string
  defaultCryptoCurrency: string
}

interface WidgetConfigResponse { items: WidgetConfig[] }

const b2bClientId = computed(() => route.query['b2bClientId'] as string | undefined)

const { data: widgetConfigData } = useQuery({
  queryKey: computed(() => ['widget-config', b2bClientId.value]),
  queryFn: () => apiFetch<WidgetConfigResponse>(`/widget-configs?b2bClientId=${b2bClientId.value}`),
  enabled: computed(() => !!b2bClientId.value),
})

const widgetConfig = computed(() => widgetConfigData.value?.items[0] ?? null)
const partnerLabel = computed(() => widgetConfig.value?.name ?? 'Prodigy')
const isDark = computed(() => widgetConfig.value?.themeMode === 'dark')

// ── Currency list from config (with fallback) ──────────────────────────────
const DEFAULT_CRYPTOS = ['BTC', 'ETH', 'USDT']

const availableCryptos = computed<string[]>(() => {
  const cfg = widgetConfig.value
  if (cfg && Array.isArray(cfg.allowedCryptoCurrencies) && cfg.allowedCryptoCurrencies.length) {
    return cfg.allowedCryptoCurrencies
  }
  return DEFAULT_CRYPTOS
})

// ── State ──────────────────────────────────────────────────────────────────
const selectedCurrency = ref<string>('BTC')
const eurAmount = ref<number>(100)
const quote = ref<Quote | null>(null)
const transaction = ref<Transaction | null>(null)
const isGettingQuote = ref(false)
const isBuying = ref(false)
const quoteError = ref<string | null>(null)
const buyError = ref<string | null>(null)
const ttlSeconds = ref(0)
const showConfetti = ref(false)
let ttlTimer: ReturnType<typeof setInterval> | null = null

const previousPrices = ref<Record<string, number>>({})

// Reset selectedCurrency when available currencies change (e.g. config loads)
watch(availableCryptos, (list) => {
  if (!list.includes(selectedCurrency.value)) {
    selectedCurrency.value = list[0] ?? 'BTC'
  }
})

// ── Price fetch ────────────────────────────────────────────────────────────
const { data: priceData, isLoading: pricesLoading } = useQuery({
  queryKey: ['market-prices'],
  queryFn: () => apiFetch<{ prices: PriceSnapshot[] }>('/market/prices'),
  refetchInterval: 5000,
})

// Track price movements
watch(
  () => priceData.value?.prices,
  (newPrices, oldPrices) => {
    if (!oldPrices) return
    const prev: Record<string, number> = {}
    for (const p of oldPrices as PriceSnapshot[]) prev[p.currency] = p.ask
    previousPrices.value = prev
  },
)

const prices = computed(() => priceData.value?.prices ?? [])

function getPrice(currency: string): PriceSnapshot | undefined {
  return prices.value.find((p) => p.currency === currency)
}

function priceDirection(currency: string): 'up' | 'down' | 'neutral' {
  const prev = previousPrices.value[currency]
  const current = getPrice(currency)?.ask
  if (prev == null || current == null) return 'neutral'
  return current >= prev ? 'up' : 'down'
}

// ── Currency icons ─────────────────────────────────────────────────────────
const CURRENCY_ICON: Record<string, typeof Bitcoin> = {
  BTC: Bitcoin,
  ETH: Zap,
  USDT: DollarSign,
}

function getCurrencyIcon(sym: string) {
  return CURRENCY_ICON[sym] ?? DollarSign
}

// ── Quote TTL countdown ────────────────────────────────────────────────────
const TTL_MAX = 30

function startTtlTimer() {
  if (ttlTimer) clearInterval(ttlTimer)
  ttlTimer = setInterval(() => {
    if (ttlSeconds.value > 0) {
      ttlSeconds.value--
    } else {
      clearInterval(ttlTimer!)
      quote.value = null
    }
  }, 1000)
}

onUnmounted(() => {
  if (ttlTimer) clearInterval(ttlTimer)
})

// ── Reset when currency or amount changes ──────────────────────────────────
watch([selectedCurrency, eurAmount], () => {
  quote.value = null
  quoteError.value = null
  buyError.value = null
  if (ttlTimer) clearInterval(ttlTimer)
})

// ── Confetti pieces ────────────────────────────────────────────────────────
interface ConfettiPiece {
  left: string
  delay: string
  color: string
}

const confettiPieces: ConfettiPiece[] = [
  { left: '20%', delay: '0s', color: 'bg-brand-400' },
  { left: '35%', delay: '0.1s', color: 'bg-success-400' },
  { left: '50%', delay: '0.2s', color: 'bg-warning-400' },
  { left: '65%', delay: '0.15s', color: 'bg-danger-400' },
  { left: '80%', delay: '0.05s', color: 'bg-violet-400' },
]

// ── Actions ────────────────────────────────────────────────────────────────
async function getQuote() {
  isGettingQuote.value = true
  quoteError.value = null
  quote.value = null
  try {
    const result = await apiFetch<Quote>('/quotes', {
      method: 'POST',
      body: JSON.stringify({
        userId: 'demo-user',
        sourceCurrency: 'EUR',
        targetCurrency: selectedCurrency.value,
        sourceAmount: eurAmount.value,
        ...(b2bClientId.value ? { b2bClientId: b2bClientId.value } : {}),
      }),
    })
    quote.value = result
    const expiresAt = new Date(result.expiresAt).getTime()
    ttlSeconds.value = Math.max(0, Math.min(TTL_MAX, Math.floor((expiresAt - Date.now()) / 1000)))
    startTtlTimer()
  } catch (e) {
    quoteError.value = e instanceof Error ? e.message : 'Failed to get quote'
  } finally {
    isGettingQuote.value = false
  }
}

async function buyNow() {
  if (!quote.value) return
  isBuying.value = true
  buyError.value = null
  try {
    const tx = await apiFetch<Transaction>('/transactions', {
      method: 'POST',
      body: JSON.stringify({
        userId: 'demo-user',
        quoteId: quote.value.id,
      }),
    })
    transaction.value = tx
    if (ttlTimer) clearInterval(ttlTimer)
    showConfetti.value = true
    setTimeout(() => { showConfetti.value = false }, 1200)
  } catch (e) {
    buyError.value = e instanceof Error ? e.message : 'Transaction failed'
  } finally {
    isBuying.value = false
  }
}

function reset() {
  quote.value = null
  transaction.value = null
  quoteError.value = null
  buyError.value = null
  eurAmount.value = 100
  selectedCurrency.value = availableCryptos.value[0] ?? 'BTC'
  showConfetti.value = false
  amountTouched.value = false
}

// ── Formatting ─────────────────────────────────────────────────────────────
function formatEur(value: number): string {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)
}

function formatCrypto(value: number, currency: string): string {
  if (currency === 'USDT') return value.toFixed(2)
  if (currency === 'BTC') return value.toFixed(8)
  return value.toFixed(6)
}

function formatPrice(value: number): string {
  return formatEur(value)
}

// TTL progress bar width as percentage
const ttlBarWidth = computed(() => `${Math.round((ttlSeconds.value / TTL_MAX) * 100)}%`)

// ── Amount validation ──────────────────────────────────────────────────────
const amountTouched = ref(false)
const amountError = computed(() => {
  if (!amountTouched.value) return null
  if (!eurAmount.value || eurAmount.value <= 0) return 'Please enter an amount greater than 0'
  return null
})

// ── Estimated crypto (pre-quote, live price) ───────────────────────────────
const estimatedCrypto = computed(() => {
  const p = getPrice(selectedCurrency.value)
  if (!p || p.ask === 0 || eurAmount.value <= 0) return 0
  return eurAmount.value / p.ask
})
</script>

<template>
  <div class="w-full max-w-[390px] mx-auto">
    <div
      class="rounded-2xl shadow-card border overflow-hidden transition-all duration-300"
      :data-theme="isDark ? 'dark' : 'light'"
      :class="[
        isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-100',
        quote && !transaction ? 'ring-2 ring-brand-400 ring-opacity-50' : ''
      ]"
    >

      <!-- Success State -->
      <div v-if="transaction" class="p-6 flex flex-col items-center text-center gap-4 relative overflow-hidden">
        <!-- Confetti -->
        <div v-if="showConfetti" class="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            v-for="piece in confettiPieces"
            :key="piece.left"
            class="confetti-piece absolute bottom-1/2"
            :class="piece.color"
            :style="{ left: piece.left, animationDelay: piece.delay }"
          />
        </div>

        <div class="w-16 h-16 rounded-full bg-success-50 flex items-center justify-center animate-bounce-once">
          <CheckCircle class="w-8 h-8 text-success-600" />
        </div>
        <div>
          <p class="text-lg font-semibold" :class="isDark ? 'text-white' : 'text-slate-900'">Purchase complete!</p>
          <p class="text-sm text-slate-500 mt-1">Your crypto is on its way</p>
        </div>
        <div class="w-full bg-surface-subtle rounded-xl p-4 text-left space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-slate-500">You sent</span>
            <span class="font-medium" :class="isDark ? 'text-slate-200' : 'text-slate-900'">{{ formatEur(eurAmount) }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-slate-500">You received</span>
            <span class="font-medium" :class="isDark ? 'text-slate-200' : 'text-slate-900'">
              {{ formatCrypto(quote?.targetAmount ?? 0, selectedCurrency) }} {{ selectedCurrency }}
            </span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-slate-500">Transaction ID</span>
            <span class="font-mono text-xs text-slate-700">{{ transaction.id.slice(0, 12) }}…</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-slate-500">Status</span>
            <Badge variant="success">{{ transaction.status || 'Created' }}</Badge>
          </div>
        </div>
        <Button variant="secondary" size="sm" class="w-full" @click="reset">Buy more crypto</Button>
        <!-- Footer -->
        <p class="text-2xs text-slate-400 mt-2">
          <template v-if="widgetConfig">{{ partnerLabel }} · </template>Powered by Prodigy
        </p>
      </div>

      <!-- Main Widget -->
      <template v-else>
        <!-- Header -->
        <div
          class="flex items-center justify-between px-5 py-4 border-b"
          :class="isDark ? 'border-slate-700' : 'border-slate-100'"
        >
          <h2
            class="text-base font-semibold"
            :class="isDark ? 'text-white' : 'text-slate-900'"
          >Buy Crypto</h2>
          <Badge variant="default" class="text-2xs">{{ partnerLabel }}</Badge>
        </div>

        <!-- Price Ticker -->
        <div class="px-5 py-3 border-b border-slate-100 bg-surface-subtle">
          <!-- Skeleton loading -->
          <div v-if="pricesLoading" class="grid grid-cols-3 gap-2">
            <div v-for="i in 3" :key="i" class="flex flex-col gap-1">
              <div class="h-2.5 w-8 bg-slate-200 rounded animate-pulse" />
              <div class="h-3.5 w-16 bg-slate-200 rounded animate-pulse" />
            </div>
          </div>
          <div v-else class="grid grid-cols-3 gap-2">
            <div
              v-for="sym in availableCryptos.slice(0, 3)"
              :key="sym"
              class="flex flex-col gap-0.5"
            >
              <span class="text-2xs font-medium text-slate-400 uppercase tracking-wide">{{ sym }}</span>
              <div class="flex items-center gap-1">
                <span class="text-xs font-semibold text-slate-800">
                  {{ getPrice(sym) ? formatPrice(getPrice(sym)!.ask) : '—' }}
                </span>
                <TrendingUp
                  v-if="priceDirection(sym) === 'up'"
                  class="w-3 h-3 text-success-500 shrink-0"
                />
                <TrendingDown
                  v-else-if="priceDirection(sym) === 'down'"
                  class="w-3 h-3 text-danger-500 shrink-0"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Buy Form -->
        <div class="p-5 space-y-4">
          <!-- Currency Selector -->
          <div>
            <label class="text-xs font-medium text-slate-500 mb-2 block">Select asset</label>
            <div class="flex gap-1.5 p-1 bg-surface-muted rounded-xl">
              <button
                v-for="sym in availableCryptos"
                :key="sym"
                class="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium transition-all"
                :class="selectedCurrency === sym
                  ? 'bg-white text-brand-700 shadow-panel'
                  : 'text-slate-500 hover:text-slate-700'"
                @click="selectedCurrency = sym"
              >
                <component :is="getCurrencyIcon(sym)" class="w-3.5 h-3.5 shrink-0" />
                {{ sym }}
              </button>
            </div>
          </div>

          <!-- You Send -->
          <div>
            <label class="text-xs font-medium text-slate-500 mb-1.5 block">You send</label>
            <div
              class="flex items-center border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-brand-500 focus-within:border-brand-500 transition-all"
              :class="amountError ? 'border-danger-400' : 'border-slate-200'"
            >
              <input
                v-model.number="eurAmount"
                type="number"
                min="1"
                step="10"
                class="flex-1 px-4 py-3 text-base font-semibold text-slate-900 bg-white outline-none placeholder-slate-300"
                placeholder="0"
                @blur="amountTouched = true"
              />
              <div class="px-4 py-3 bg-surface-subtle border-l border-slate-100">
                <span class="text-sm font-semibold text-slate-500">EUR</span>
              </div>
            </div>
            <p v-if="amountError" class="text-xs text-danger-600 mt-1">{{ amountError }}</p>
          </div>

          <!-- You Get (pre-quote estimate from live price) -->
          <div v-if="!quote">
            <label class="text-xs font-medium text-slate-500 mb-1.5 block">You get (estimated)</label>
            <div class="flex items-center border border-slate-100 rounded-xl bg-surface-subtle overflow-hidden">
              <div class="flex-1 px-4 py-3">
                <span class="text-base font-semibold text-slate-900">
                  {{ eurAmount > 0 ? formatCrypto(estimatedCrypto, selectedCurrency) : '0' }}
                </span>
              </div>
              <div class="px-4 py-3 border-l border-slate-100">
                <span class="text-sm font-semibold text-brand-600">{{ selectedCurrency }}</span>
              </div>
            </div>
          </div>

          <!-- Error messages -->
          <p v-if="quoteError" class="text-xs text-danger-600 bg-danger-50 rounded-lg px-3 py-2">
            {{ quoteError }}
          </p>
          <p v-if="buyError" class="text-xs text-danger-600 bg-danger-50 rounded-lg px-3 py-2">
            {{ buyError }}
          </p>

          <!-- Quote Display (replaces estimate, shows real fee breakdown) -->
          <div v-if="quote" class="bg-brand-50 border border-brand-100 rounded-xl px-4 py-3 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-brand-700">Quote locked</span>
              <!-- TTL countdown with progress bar -->
              <div class="flex items-center gap-2">
                <span
                  class="text-xs font-mono font-bold px-2 py-0.5 rounded-full min-w-[36px] text-center"
                  :class="ttlSeconds > 10 ? 'bg-success-100 text-success-700' : 'bg-warning-100 text-warning-700'"
                >
                  {{ ttlSeconds }}s
                </span>
              </div>
            </div>
            <!-- Shrinking progress bar -->
            <div class="w-full h-1.5 bg-brand-100 rounded-full overflow-hidden">
              <div
                class="h-full rounded-full transition-all duration-1000 ease-linear"
                :class="ttlSeconds > 10 ? 'bg-success-500' : 'bg-warning-500'"
                :style="{ width: ttlBarWidth }"
              />
            </div>
            <div class="flex justify-between text-xs">
              <span class="text-slate-500">Rate</span>
              <span class="font-medium text-slate-800">1 {{ selectedCurrency }} = {{ formatEur(quote.rate) }}</span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="text-slate-500">You receive</span>
              <span class="font-semibold text-brand-700">{{ formatCrypto(quote.targetAmount, selectedCurrency) }} {{ selectedCurrency }}</span>
            </div>
            <!-- Real fee breakdown from API response -->
            <div class="border-t border-brand-100 pt-2 mt-1 space-y-1">
              <div class="flex justify-between text-xs">
                <span class="text-slate-500">Platform fee</span>
                <span class="text-slate-700 font-medium">{{ formatEur(quote.platformFeeAmount) }}</span>
              </div>
              <div class="flex justify-between text-xs">
                <span class="text-slate-500">Partner fee</span>
                <span class="text-slate-700 font-medium">{{ formatEur(quote.partnerFeeAmount) }}</span>
              </div>
              <div class="flex justify-between text-xs">
                <span class="text-slate-500">Network fee</span>
                <span class="text-slate-700 font-medium">{{ formatEur(quote.networkFeeAmount) }}</span>
              </div>
              <div class="flex justify-between text-xs font-semibold border-t border-brand-100 pt-1 mt-1">
                <span class="text-slate-700">Total fees</span>
                <span class="text-slate-900">{{ formatEur(quote.platformFeeAmount + quote.partnerFeeAmount + quote.networkFeeAmount) }}</span>
              </div>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="space-y-2 pt-1">
            <Button
              v-if="!quote"
              variant="primary"
              size="lg"
              class="w-full"
              :disabled="eurAmount <= 0 || isGettingQuote"
              @click="() => { amountTouched = true; if (eurAmount > 0) getQuote() }"
            >
              <Loader2 v-if="isGettingQuote" class="w-4 h-4 animate-spin" />
              <span>{{ isGettingQuote ? 'Getting quote…' : 'Get Quote' }}</span>
            </Button>
            <Button
              v-else
              variant="primary"
              size="lg"
              class="w-full"
              :disabled="isBuying || ttlSeconds === 0"
              @click="buyNow"
            >
              <Loader2 v-if="isBuying" class="w-4 h-4 animate-spin" />
              <span>{{ isBuying ? 'Processing…' : ttlSeconds === 0 ? 'Quote expired' : 'Confirm' }}</span>
            </Button>
            <Button
              v-if="quote"
              variant="ghost"
              size="sm"
              class="w-full text-slate-400"
              @click="quote = null"
            >
              Cancel
            </Button>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-5 pb-4 flex items-center justify-center">
          <p class="text-2xs text-slate-400">Powered by Prodigy</p>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
[data-theme="dark"] {
  background: #1a1a2e;
  color: #e2e8f0;
}

[data-theme="light"] {
  background: #fff;
  color: #111827;
}
</style>

<style>
@keyframes confetti-fall { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(-80px) rotate(360deg); opacity: 0; } }
.confetti-piece { position: absolute; width: 8px; height: 8px; border-radius: 2px; animation: confetti-fall 0.8s ease-out forwards; }
</style>
