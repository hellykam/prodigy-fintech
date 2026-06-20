<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import { useAuthStore } from '@/stores/auth'
import type { Wallet } from '@/stores/auth'
import { sendCrypto, apiFetch } from '@/composables/useApi'
import AppLayout from '@/components/AppLayout.vue'
import {
  ChevronLeft,
  ChevronRight,
  Clipboard,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Loader2,
  ExternalLink,
} from 'lucide-vue-next'

// Step 2 field-level validation errors
const fieldErrors = ref({ address: '', amount: '' })
const fieldTouched = ref({ address: false, amount: false })

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

// Steps: 1 = select asset, 2 = enter amount + address, 3 = review, 4 = confirmation
const step = ref<1 | 2 | 3 | 4>(1)

const selectedWallet = ref<Wallet | null>(null)
const amount = ref('')
const recipientAddress = ref('')
const isSending = ref(false)
const sendError = ref<string | null>(null)
const confirmedTxId = ref<string | null>(null)
const confirmedTxStatus = ref<string | null>(null)

const NETWORK_FEES: Record<string, number> = {
  BTC: 0.001,
  ETH: 0.002,
  USDT: 1.0,
}

const wallets = computed<Wallet[]>(() => auth.user?.wallets ?? [])

// Beneficiaries for quick-select
const { data: bData } = useQuery({
  queryKey: ['beneficiaries', auth.user?.id],
  queryFn: () => apiFetch(`/beneficiaries?userId=${auth.user!.id}`),
  enabled: computed(() => !!auth.user?.id),
})
const beneficiaries = computed(() => bData.value?.items ?? [])

function selectBeneficiary(b: any) {
  recipientAddress.value = b.walletAddress ?? b.iban ?? b.email ?? ''
  if (recipientAddress.value && selectedWallet.value) step.value = 2
}

onMounted(() => {
  if (route.query.toAddress) recipientAddress.value = route.query.toAddress as string
  else if (route.query.toIban) recipientAddress.value = route.query.toIban as string
  else if (route.query.toEmail) recipientAddress.value = route.query.toEmail as string
})

const networkFee = computed(() => {
  const currency = selectedWallet.value?.currency ?? ''
  return NETWORK_FEES[currency] ?? 0
})

const amountNum = computed(() => parseFloat(amount.value) || 0)

const currencyColors: Record<string, string> = {
  BTC: 'bg-warning-100 text-warning-600',
  ETH: 'bg-info-100 text-info-600',
  USDT: 'bg-success-100 text-success-600',
}

function getCurrencyColor(c: string) {
  return currencyColors[c] ?? 'bg-brand-100 text-brand-600'
}

function formatCrypto(amount: number, currency: string) {
  if (currency === 'BTC') return amount.toFixed(8)
  if (currency === 'ETH') return amount.toFixed(6)
  return amount.toFixed(2)
}

function validateAddress() {
  if (!recipientAddress.value.trim()) {
    fieldErrors.value.address = 'Enter a valid wallet address or IBAN'
  } else if (recipientAddress.value.trim().length < 10) {
    fieldErrors.value.address = 'Enter a valid wallet address or IBAN'
  } else {
    fieldErrors.value.address = ''
  }
}

function validateAmount() {
  if (!amount.value) {
    fieldErrors.value.amount = 'Amount is required'
  } else if (amountNum.value <= 0) {
    fieldErrors.value.amount = 'Amount must be greater than 0'
  } else if (amountNum.value > (selectedWallet.value?.balance ?? 0)) {
    fieldErrors.value.amount = 'Insufficient balance'
  } else {
    fieldErrors.value.amount = ''
  }
}

const hasStep2Errors = computed(
  () => !!fieldErrors.value.address || !!fieldErrors.value.amount
)

function selectWallet(w: Wallet) {
  selectedWallet.value = w
  amount.value = ''
  recipientAddress.value = ''
  fieldErrors.value = { address: '', amount: '' }
  fieldTouched.value = { address: false, amount: false }
  step.value = 2
}

async function pasteAddress() {
  try {
    const text = await navigator.clipboard.readText()
    recipientAddress.value = text
  } catch {
    // clipboard not available
  }
}

function canProceedToReview() {
  return (
    amountNum.value > 0 &&
    amountNum.value <= (selectedWallet.value?.balance ?? 0) &&
    recipientAddress.value.trim().length > 10
  )
}

function goToReview() {
  fieldTouched.value = { address: true, amount: true }
  validateAddress()
  validateAmount()
  if (!hasStep2Errors.value && canProceedToReview()) step.value = 3
}

async function confirmSend() {
  if (!selectedWallet.value || !auth.user) return
  isSending.value = true
  sendError.value = null
  try {
    const txn = await sendCrypto({
      userId: auth.user.id,
      currency: selectedWallet.value.currency,
      amount: amountNum.value,
      recipientAddress: recipientAddress.value.trim(),
    })
    confirmedTxId.value = txn.id
    confirmedTxStatus.value = txn.status
    step.value = 4
  } catch (e) {
    sendError.value = e instanceof Error ? e.message : 'Send failed. Please try again.'
    step.value = 4
  } finally {
    isSending.value = false
  }
}

function goBack() {
  if (step.value === 1) {
    router.back()
  } else if (step.value === 2) {
    step.value = 1
  } else if (step.value === 3) {
    step.value = 2
  } else {
    step.value = 1
  }
}

function reset() {
  step.value = 1
  selectedWallet.value = null
  amount.value = ''
  recipientAddress.value = ''
}

const stepLabels = ['Asset', 'Amount', 'Review']
</script>

<template>
  <AppLayout>
    <div class="px-4 pt-10 pb-6">
      <!-- Back button (hidden after completion) -->
      <button
        v-if="step !== 4"
        @click="goBack"
        class="flex items-center gap-1 text-slate-500 hover:text-slate-700 mb-5 -ml-1"
      >
        <ChevronLeft :size="20" />
        <span class="text-sm">{{ step === 1 ? 'Back' : 'Back' }}</span>
      </button>

      <!-- Step indicator (steps 1–3) -->
      <div v-if="step <= 3" class="flex items-center gap-2 mb-6">
        <template v-for="(label, i) in stepLabels" :key="label">
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
              <svg
                v-if="step > i + 1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                class="w-3.5 h-3.5"
              >
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
            v-if="i < stepLabels.length - 1"
            class="flex-1 h-0.5 rounded transition-all duration-500"
            :class="step > i + 1 ? 'bg-brand-600' : 'bg-slate-200'"
          />
        </template>
      </div>

      <!-- Steps container with slide transition -->
      <Transition name="slide" mode="out-in">

        <!-- ===== STEP 1: Select Asset ===== -->
        <div v-if="step === 1" key="step1">
          <h1 class="text-2xl font-bold text-slate-900 mb-2">Send Crypto</h1>
          <p class="text-slate-500 text-sm mb-6">Select the asset you want to send</p>

          <!-- Saved beneficiaries quick-select -->
          <div v-if="beneficiaries.length > 0" class="mb-5">
            <div class="flex items-center justify-between mb-2">
              <p class="text-xs font-medium text-slate-500 uppercase tracking-wide">Saved</p>
              <RouterLink to="/beneficiaries" class="text-xs text-brand-600 hover:underline">Manage</RouterLink>
            </div>
            <div class="flex gap-2 overflow-x-auto pb-1">
              <button
                v-for="b in beneficiaries.slice(0, 5)"
                :key="b.id"
                @click="selectBeneficiary(b)"
                class="flex flex-col items-center gap-1.5 min-w-[60px] active:scale-95 transition"
              >
                <div class="w-11 h-11 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-sm shrink-0">
                  {{ b.name.charAt(0) }}
                </div>
                <span class="text-[10px] text-slate-600 truncate max-w-[60px]">{{ b.name.split(' ')[0] }}</span>
              </button>
            </div>
          </div>

          <!-- No wallets -->
          <div v-if="wallets.length === 0" class="bg-white rounded-2xl p-8 text-center border border-slate-100 shadow-sm">
            <AlertTriangle :size="32" class="text-slate-300 mx-auto mb-3" />
            <p class="text-slate-500 text-sm">No wallets found</p>
            <p class="text-slate-400 text-xs mt-1">Buy some crypto first to send it</p>
          </div>

          <!-- Wallet list -->
          <div v-else class="space-y-3">
            <button
              v-for="w in wallets"
              :key="w.id"
              @click="selectWallet(w)"
              class="w-full bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-slate-100 active:scale-[0.98] transition hover:shadow-md text-left"
            >
              <div :class="['w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shrink-0', getCurrencyColor(w.currency)]">
                {{ w.currency.charAt(0) }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-semibold text-slate-900">{{ w.currency }}</p>
                <p class="text-slate-400 text-xs mt-0.5">{{ formatCrypto(w.balance, w.currency) }} {{ w.currency }}</p>
              </div>
              <ChevronRight :size="18" class="text-slate-300 shrink-0" />
            </button>
          </div>
        </div>

        <!-- ===== STEP 2: Amount + Address ===== -->
        <div v-else-if="step === 2" key="step2">
          <h1 class="text-2xl font-bold text-slate-900 mb-6">Send {{ selectedWallet?.currency }}</h1>

          <!-- Amount -->
          <div :class="['bg-white rounded-2xl p-5 mb-4 shadow-sm border', fieldTouched.amount && fieldErrors.amount ? 'border-danger-300' : 'border-slate-100']">
            <div class="flex items-center justify-between mb-3">
              <p class="text-sm text-slate-500">Amount</p>
              <p class="text-xs text-slate-400">
                Available: <span class="font-medium text-slate-600">{{ formatCrypto(selectedWallet?.balance ?? 0, selectedWallet?.currency ?? '') }} {{ selectedWallet?.currency }}</span>
              </p>
            </div>
            <div class="flex items-center gap-3">
              <input
                v-model="amount"
                type="number"
                min="0"
                step="any"
                placeholder="0.00"
                class="flex-1 text-4xl font-bold text-slate-900 bg-transparent outline-none placeholder-slate-200 min-w-0"
                @blur="() => { fieldTouched.value.amount = true; validateAmount() }"
                @input="() => { if (fieldTouched.value.amount) validateAmount() }"
              />
              <span class="text-sm font-semibold text-brand-600 bg-brand-50 px-3 py-1.5 rounded-lg shrink-0">
                {{ selectedWallet?.currency }}
              </span>
            </div>
            <p v-if="fieldTouched.amount && fieldErrors.amount" class="mt-1 text-xs text-danger-600">{{ fieldErrors.amount }}</p>
          </div>

          <!-- Recipient address -->
          <div :class="['bg-white rounded-2xl p-5 mb-5 shadow-sm border', fieldTouched.address && fieldErrors.address ? 'border-danger-300' : 'border-slate-100']">
            <p class="text-sm text-slate-500 mb-3">Recipient Address</p>
            <div class="flex items-start gap-3">
              <textarea
                v-model="recipientAddress"
                placeholder="Enter wallet address…"
                rows="2"
                class="flex-1 font-mono text-sm text-slate-800 bg-transparent outline-none placeholder-slate-300 resize-none leading-relaxed"
                @blur="() => { fieldTouched.value.address = true; validateAddress() }"
                @input="() => { if (fieldTouched.value.address) validateAddress() }"
              />
              <button
                @click="pasteAddress"
                class="shrink-0 w-9 h-9 rounded-xl bg-brand-50 text-brand-600 hover:bg-brand-100 flex items-center justify-center transition active:scale-90"
                title="Paste from clipboard"
              >
                <Clipboard :size="16" />
              </button>
            </div>
            <p v-if="fieldTouched.address && fieldErrors.address" class="mt-1 text-xs text-danger-600">{{ fieldErrors.address }}</p>
          </div>

          <button
            @click="goToReview"
            :disabled="hasStep2Errors && (fieldTouched.address || fieldTouched.amount)"
            class="w-full h-14 bg-brand-600 hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition text-base active:scale-95"
          >
            Review Send
          </button>
        </div>

        <!-- ===== STEP 3: Review ===== -->
        <div v-else-if="step === 3" key="step3">
          <h1 class="text-2xl font-bold text-slate-900 mb-6">Review</h1>

          <!-- Summary card -->
          <div class="bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl p-5 mb-4 text-white">
            <div class="text-center mb-4">
              <p class="text-brand-200 text-xs mb-1">You're sending</p>
              <p class="text-4xl font-bold">{{ formatCrypto(amountNum, selectedWallet?.currency ?? '') }}</p>
              <p class="text-brand-300 text-lg">{{ selectedWallet?.currency }}</p>
            </div>
          </div>

          <!-- Details card -->
          <div class="bg-white rounded-2xl p-5 mb-5 shadow-sm border border-slate-100 space-y-4">
            <div>
              <p class="text-xs text-slate-400 mb-1">To address</p>
              <p class="font-mono text-xs text-slate-700 break-all leading-relaxed">{{ recipientAddress }}</p>
            </div>
            <div class="h-px bg-slate-100" />
            <div class="flex justify-between text-sm">
              <span class="text-slate-500">Asset</span>
              <span class="font-semibold text-slate-900">{{ selectedWallet?.currency }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-slate-500">Amount</span>
              <span class="font-semibold text-slate-900">{{ formatCrypto(amountNum, selectedWallet?.currency ?? '') }} {{ selectedWallet?.currency }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-slate-500">Est. network fee</span>
              <span class="font-semibold text-slate-900">{{ formatCrypto(networkFee, selectedWallet?.currency ?? '') }} {{ selectedWallet?.currency }}</span>
            </div>
            <div class="h-px bg-slate-100" />
            <div class="flex justify-between text-sm font-bold">
              <span class="text-slate-700">Total deducted</span>
              <span class="text-slate-900">{{ formatCrypto(amountNum + networkFee, selectedWallet?.currency ?? '') }} {{ selectedWallet?.currency }}</span>
            </div>
          </div>

          <p v-if="sendError" class="text-xs text-danger-600 bg-danger-50 rounded-xl px-3 py-2 mb-3">{{ sendError }}</p>
          <button
            @click="confirmSend"
            :disabled="isSending"
            class="w-full h-14 bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-bold rounded-2xl transition text-base active:scale-95 mb-3 flex items-center justify-center gap-2"
          >
            <Loader2 v-if="isSending" :size="20" class="animate-spin" />
            {{ isSending ? 'Sending…' : 'Confirm Send' }}
          </button>
          <button @click="step = 2" :disabled="isSending" class="w-full h-11 text-slate-500 text-sm font-medium disabled:opacity-40">
            Cancel
          </button>
        </div>

        <!-- ===== STEP 4: Success ===== -->
        <div v-else-if="step === 4 && !sendError" key="step4-success" class="flex flex-col items-center pt-6 text-center">
          <Transition name="success" appear>
            <div class="flex flex-col items-center">
              <!-- Animated checkmark -->
              <div class="relative w-24 h-24 mb-5">
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

          <h2 class="text-2xl font-bold text-slate-900 mb-1">Transfer Initiated</h2>
          <p class="text-slate-500 text-sm mb-1">
            Your {{ selectedWallet?.currency }} is on its way to the recipient.
          </p>
          <p class="text-slate-400 text-xs mb-6">Est. arrival: 10–30 minutes</p>

          <!-- Receipt card -->
          <div class="w-full bg-white rounded-2xl p-5 border border-slate-100 shadow-sm text-left space-y-3 mb-6">
            <div class="flex justify-between text-sm">
              <span class="text-slate-500">Amount sent</span>
              <span class="font-semibold text-slate-900 font-mono">{{ formatCrypto(amountNum, selectedWallet?.currency ?? '') }} {{ selectedWallet?.currency }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-slate-500">Network fee</span>
              <span class="font-semibold text-slate-900 font-mono">{{ formatCrypto(networkFee, selectedWallet?.currency ?? '') }} {{ selectedWallet?.currency }}</span>
            </div>
            <div class="h-px bg-slate-100" />
            <div class="flex justify-between text-sm">
              <span class="text-slate-500">To address</span>
              <span class="font-mono text-xs text-slate-700 text-right max-w-[160px] break-all">{{ recipientAddress }}</span>
            </div>
            <div class="h-px bg-slate-100" />
            <div class="flex justify-between text-sm">
              <span class="text-slate-500">Transaction ID</span>
              <code class="font-mono text-xs text-slate-700">{{ (confirmedTxId ?? '').slice(0, 14) }}…</code>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-slate-500">Status</span>
              <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-warning-50 text-warning-600">{{ confirmedTxStatus ?? 'processing' }}</span>
            </div>
          </div>

          <div class="w-full space-y-3">
            <button
              @click="router.push(`/transactions/${confirmedTxId}`)"
              class="w-full h-12 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-2xl transition flex items-center justify-center gap-2"
            >
              <ExternalLink :size="16" />
              View Transaction
            </button>
            <button
              @click="router.push('/home')"
              class="w-full h-11 bg-slate-100 text-slate-700 font-semibold rounded-2xl hover:bg-slate-200 transition"
            >
              Back to Home
            </button>
          </div>
        </div>

        <!-- ===== STEP 4: Error ===== -->
        <div v-else key="step4-error" class="flex flex-col items-center pt-6 text-center">
          <div class="w-20 h-20 bg-danger-50 rounded-full flex items-center justify-center mb-5">
            <XCircle :size="40" class="text-danger-500" />
          </div>

          <h2 class="text-2xl font-bold text-slate-900 mb-2">Transfer Failed</h2>
          <p class="text-slate-500 text-sm mb-6 max-w-xs">{{ sendError }}</p>

          <div class="w-full space-y-3">
            <button
              @click="() => { sendError = null; step = 3 }"
              class="w-full h-12 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-2xl transition"
            >
              Try Again
            </button>
            <button
              @click="reset"
              class="w-full h-11 bg-slate-100 text-slate-700 font-semibold rounded-2xl hover:bg-slate-200 transition"
            >
              Start Over
            </button>
          </div>
        </div>

      </Transition>
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
  transform: translateX(24px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-24px);
}
</style>
