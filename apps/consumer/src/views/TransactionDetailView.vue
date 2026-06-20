<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import { fetchTransaction } from '@/composables/useApi'
import type { Transaction } from '@/composables/useApi'
import { StatusPill } from '@prodigy/ui'
import { X, CheckCircle, XCircle, Loader2, Clock, AlertTriangle, Check, RotateCcw } from 'lucide-vue-next'

const props = defineProps<{ id: string }>()
const router = useRouter()

const TERMINAL_STATUSES = ['completed', 'failed', 'rejected']

const { data: tx, isLoading, error } = useQuery<Transaction>({
  queryKey: ['transaction', props.id],
  queryFn: () => fetchTransaction(props.id),
  refetchInterval: (query) => {
    const status = query.state.data?.status
    return status && TERMINAL_STATUSES.includes(status) ? false : 2000
  },
})

const statusSteps = [
  { key: 'created', label: 'Order Created', description: 'Transaction initiated' },
  { key: 'risk_checking', label: 'Risk Check', description: 'Reviewing your transaction' },
  { key: 'approved', label: 'Approved', description: 'Transaction approved' },
  { key: 'market_executing', label: 'Executing', description: 'Placing order on market' },
  { key: 'ledger_posting', label: 'Settling', description: 'Posting to your wallet' },
  { key: 'completed', label: 'Completed', description: 'Funds in your wallet' },
]

const currentStepIdx = computed(() => {
  if (!tx.value) return -1
  return statusSteps.findIndex(s => s.key === tx.value!.status)
})

function stepState(idx: number) {
  const status = tx.value?.status
  if (status === 'failed' || status === 'rejected') {
    if (idx < currentStepIdx.value) return 'done'
    if (idx === currentStepIdx.value) return 'failed'
    return 'pending'
  }
  if (idx < currentStepIdx.value) return 'done'
  if (idx === currentStepIdx.value) return status === 'completed' ? 'done' : 'active'
  return 'pending'
}

function formatDate(d: string) {
  return new Date(d).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function formatAmount(n: number, currency: string) {
  if (currency === 'BTC') return n.toFixed(8)
  if (currency === 'ETH') return n.toFixed(6)
  return n.toFixed(2)
}

function repeatTransaction() {
  const transaction = tx.value
  if (!transaction) return
  if (transaction.targetCurrency && !['EUR', 'USD', 'GBP'].includes(transaction.targetCurrency)) {
    router.push(`/buy?currency=${transaction.targetCurrency}&amount=${transaction.sourceAmount}`)
  } else {
    router.push(`/send?amount=${transaction.sourceAmount}&currency=${transaction.sourceCurrency}`)
  }
}

// Simplified 4-step progress tracker
type StepStatus = 'done' | 'active' | 'pending' | 'failed'

const txSteps = computed(() => {
  const transaction = tx.value
  if (!transaction) return []

  const status = transaction.status
  const createdAt = transaction.createdAt
    ? new Date(transaction.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    : ''

  const isFailed = status === 'failed' || status === 'rejected'

  // Map the detailed status keys to our 4 summary stages
  // Stages: created → risk_check → market_executed → completed
  const riskDone = !['created', 'risk_checking'].includes(status)
  const marketDone = ['ledger_posting', 'completed'].includes(status)
  const allDone = status === 'completed'

  const steps: Array<{ label: string; status: StepStatus; time?: string }> = [
    { label: 'Transaction created', status: 'done', time: createdAt },
    {
      label: 'Risk check',
      status: riskDone || isFailed ? 'done' : status === 'risk_checking' ? 'active' : 'pending',
    },
    {
      label: 'Market order executed',
      status: marketDone || isFailed ? 'done'
        : ['approved', 'market_executing'].includes(status) ? 'active'
        : 'pending',
    },
    {
      label: allDone ? 'Completed' : isFailed ? 'Failed' : 'Completing',
      status: allDone ? 'done' : isFailed ? 'failed' : status === 'ledger_posting' ? 'active' : 'pending',
    },
  ]

  return steps
})
</script>

<template>
  <!-- Slide-up overlay -->
  <div class="fixed inset-0 z-50 flex justify-center">
    <div class="w-full max-w-[390px] bg-surface-subtle flex flex-col relative">
      <!-- Handle bar -->
      <div class="flex justify-center pt-3 pb-1">
        <div class="w-12 h-1 bg-slate-200 rounded-full" />
      </div>

      <!-- Header -->
      <div class="flex items-center justify-between px-4 py-3">
        <h2 class="text-lg font-bold text-slate-900">Transaction</h2>
        <button
          @click="router.back()"
          class="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 transition"
        >
          <X :size="18" class="text-slate-600" />
        </button>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto px-4 pb-8">
        <!-- Loading -->
        <div v-if="isLoading" class="pt-8">
          <div class="space-y-4 animate-pulse">
            <div class="h-20 bg-slate-200 rounded-2xl" />
            <div class="h-40 bg-slate-200 rounded-2xl" />
            <div class="h-32 bg-slate-200 rounded-2xl" />
          </div>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="pt-8 text-center text-danger-600 text-sm">
          Failed to load transaction
        </div>

        <template v-else-if="tx">
          <!-- Status -->
          <div class="flex items-center justify-between mb-4">
            <StatusPill :status="tx.status" />
            <span class="text-xs text-slate-400">{{ formatDate(tx.createdAt) }}</span>
          </div>

          <!-- Summary -->
          <div class="bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl p-5 text-white mb-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-brand-200 text-xs">Sent</p>
                <p class="text-2xl font-bold">€{{ tx.sourceAmount.toFixed(2) }}</p>
              </div>
              <div class="text-brand-300 text-2xl">→</div>
              <div class="text-right">
                <p class="text-brand-200 text-xs">Received</p>
                <p class="text-2xl font-bold">{{ formatAmount(tx.targetAmount, tx.targetCurrency) }}</p>
                <p class="text-brand-200 text-sm">{{ tx.targetCurrency }}</p>
              </div>
            </div>
          </div>

          <!-- Manual review alert -->
          <div v-if="tx.status === 'manual_review'" class="bg-warning-50 border border-warning-500 rounded-2xl p-4 mb-4 flex gap-3">
            <AlertTriangle :size="20" class="text-warning-600 shrink-0 mt-0.5" />
            <div>
              <p class="text-warning-800 font-semibold text-sm">Under Review</p>
              <p class="text-warning-700 text-xs mt-1">Our team is reviewing this transaction. Estimated time: 1–2 hours.</p>
            </div>
          </div>

          <!-- Step progress tracker -->
          <div class="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-slate-100">
            <h2 class="text-sm font-semibold text-slate-700 mb-4">Transaction Progress</h2>
            <div class="space-y-3">
              <div
                v-for="(step, i) in txSteps"
                :key="step.label"
                class="flex items-start gap-3"
              >
                <!-- Step icon + connector -->
                <div class="flex flex-col items-center">
                  <div :class="[
                    'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0',
                    step.status === 'done'   ? 'bg-success-500 text-white' :
                    step.status === 'active' ? 'bg-brand-500 text-white' :
                    step.status === 'failed' ? 'bg-danger-500 text-white' :
                    'bg-slate-100 text-slate-400'
                  ]">
                    <Check v-if="step.status === 'done'" class="w-3.5 h-3.5" />
                    <XCircle v-else-if="step.status === 'failed'" class="w-3.5 h-3.5" />
                    <Loader2 v-else-if="step.status === 'active'" class="w-3.5 h-3.5 animate-spin" />
                    <span v-else>{{ i + 1 }}</span>
                  </div>
                  <div v-if="i < txSteps.length - 1" :class="['w-0.5 h-4 mt-1', step.status === 'done' ? 'bg-success-200' : 'bg-slate-100']" />
                </div>
                <!-- Step label -->
                <div class="pt-1">
                  <p :class="['text-sm font-medium', step.status === 'pending' ? 'text-slate-400' : 'text-slate-900']">
                    {{ step.label }}
                  </p>
                  <p v-if="step.time" class="text-xs text-slate-400 mt-0.5">{{ step.time }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Fee breakdown -->
          <div class="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-slate-100">
            <h3 class="text-sm font-semibold text-slate-700 mb-3">Fee Breakdown</h3>
            <div class="space-y-2.5">
              <div class="flex justify-between text-sm">
                <span class="text-slate-500">Exchange rate</span>
                <span class="font-medium text-slate-900">
                  1 EUR = {{ formatAmount(1 / tx.rate, tx.targetCurrency) }} {{ tx.targetCurrency }}
                </span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-slate-500">Platform fee</span>
                <span class="font-medium text-slate-900">€{{ tx.platformFeeAmount.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-slate-500">Network fee</span>
                <span class="font-medium text-slate-900">€{{ tx.networkFeeAmount.toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <!-- Timeline -->
          <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <h3 class="text-sm font-semibold text-slate-700 mb-4">Transaction Timeline</h3>
            <div class="space-y-3">
              <div
                v-for="(s, idx) in statusSteps"
                :key="s.key"
                class="flex items-start gap-3"
              >
                <!-- Icon -->
                <div class="relative flex flex-col items-center">
                  <div class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10"
                    :class="{
                      'bg-success-100': stepState(idx) === 'done',
                      'bg-brand-100': stepState(idx) === 'active',
                      'bg-slate-100': stepState(idx) === 'pending',
                      'bg-danger-100': stepState(idx) === 'failed',
                    }"
                  >
                    <CheckCircle v-if="stepState(idx) === 'done'" :size="16" class="text-success-500" />
                    <XCircle v-else-if="stepState(idx) === 'failed'" :size="16" class="text-danger-500" />
                    <Loader2 v-else-if="stepState(idx) === 'active'" :size="16" class="text-brand-600 animate-spin" />
                    <Clock v-else :size="14" class="text-slate-300" />
                  </div>
                  <!-- Connector line -->
                  <div v-if="idx < statusSteps.length - 1" class="absolute top-7 left-1/2 -translate-x-1/2 w-0.5 h-5 bg-slate-100" />
                </div>

                <!-- Label -->
                <div class="pt-0.5 pb-5">
                  <p
                    class="text-sm font-medium"
                    :class="{
                      'text-slate-900': stepState(idx) !== 'pending',
                      'text-slate-400': stepState(idx) === 'pending',
                    }"
                  >
                    {{ s.label }}
                  </p>
                  <p class="text-xs text-slate-400 mt-0.5">{{ s.description }}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- Repeat button -->
          <button
            v-if="tx"
            @click="repeatTransaction()"
            class="w-full h-12 border border-brand-200 text-brand-600 font-semibold rounded-2xl flex items-center justify-center gap-2 hover:bg-brand-50 active:scale-[0.98] transition mt-4"
          >
            <RotateCcw class="w-4 h-4" />
            Repeat this transfer
          </button>
        </template>
      </div>
    </div>
  </div>
</template>
