<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { ChevronDown, DollarSign, CheckCircle, Clock, Check, Loader2, AlertCircle } from 'lucide-vue-next'
import AppLayout from '../layouts/AppLayout.vue'
import { apiFetch } from '../composables/useApi'
import { useAuthStore } from '../stores/auth'
import { Card, EmptyState } from '@prodigy/ui'
import { useToast } from '../composables/useToast'

interface PartnerCommission {
  id: string
  amount: number
  currency: string
  status: string
  transactionId: string
  createdAt: string
}

const authStore = useAuthStore()
const statusFilter = ref<string>('')
const { show: showToast } = useToast()

const b2bClientId = computed(() => authStore.user?.attributedToB2BClientId ?? null)

const { data: commData, isPending, isError, error } = useQuery({
  queryKey: ['partner-commissions', b2bClientId],
  queryFn: () => {
    if (!b2bClientId.value) throw new Error('No B2B client ID associated with your account')
    return apiFetch<{ items: PartnerCommission[] }>(`/partner-commissions?b2bClientId=${b2bClientId.value}`)
  },
  enabled: computed(() => !!b2bClientId.value),
})

const commissions = computed(() => commData.value?.items ?? [])

// After payout, settled commissions are zeroed out in the UI
const settledZeroed = ref(false)

const statusOptions = computed(() => {
  const statuses = [...new Set(commissions.value.map((c) => c.status))]
  return statuses.sort()
})

const filtered = computed(() => {
  if (!statusFilter.value) return commissions.value
  return commissions.value.filter((c) => c.status === statusFilter.value)
})

const sorted = computed(() =>
  [...filtered.value].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
)

const totalEarned = computed(() => commissions.value.reduce((s, c) => s + c.amount, 0))
const totalPending = computed(() =>
  commissions.value.filter((c) => c.status === 'pending').reduce((s, c) => s + c.amount, 0),
)
const totalPaid = computed(() => {
  if (settledZeroed.value) return 0
  return commissions.value.filter((c) => ['settled', 'paid'].includes(c.status)).reduce((s, c) => s + c.amount, 0)
})

// Settled commissions eligible for payout
const settledAmount = computed(() => {
  if (settledZeroed.value) return 0
  return commissions.value
    .filter((c) => ['settled', 'paid'].includes(c.status))
    .reduce((s, c) => s + c.amount, 0)
})

// Donut chart: settled% vs pending%
const settledPct = computed(() => {
  if (totalEarned.value === 0) return 0
  return Math.round((totalPaid.value / totalEarned.value) * 100)
})
const pendingPct = computed(() => 100 - settledPct.value)
const donutStyle = computed(() => ({
  background: `conic-gradient(#4f46e5 0% ${settledPct.value}%, #f59e0b ${settledPct.value}% 100%)`,
}))

function formatCurrency(amount: number, currency = 'EUR') {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency }).format(amount)
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

function statusClass(status: string) {
  if (['settled', 'paid'].includes(status)) return 'bg-success-50 text-success-600'
  if (status === 'pending') return 'bg-warning-50 text-warning-600'
  return 'bg-slate-100 text-slate-600'
}

// ── Payout modal state ──────────────────────────────────────────────────────
// Steps: 0 = not started, 1 = initiating (pending→processing), 2 = processing, 3 = settled/done
type PayoutStep = 0 | 1 | 2 | 3

const showPayoutModal = ref(false)
const payoutStep = ref<PayoutStep>(0)
const payoutInProgress = ref(false)
const payoutAmount = ref(0)

const STEP_LABELS = ['Initiating', 'Processing', 'Settled'] as const

// stepState: 'idle' | 'active' | 'done'
function stepState(step: 1 | 2 | 3): 'idle' | 'active' | 'done' {
  if (payoutStep.value > step) return 'done'
  if (payoutStep.value === step) return 'active'
  return 'idle'
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

async function openPayoutModal() {
  payoutAmount.value = settledAmount.value
  payoutStep.value = 0
  payoutInProgress.value = false
  showPayoutModal.value = true
}

function closePayoutModal() {
  if (payoutInProgress.value) return
  showPayoutModal.value = false
  payoutStep.value = 0
}

async function runPayout() {
  if (payoutInProgress.value) return
  payoutInProgress.value = true

  // Step 1: Initiating
  payoutStep.value = 1
  await sleep(1500)

  // Step 2: Processing
  payoutStep.value = 2
  await sleep(1500)

  // Step 3: Settled
  payoutStep.value = 3
  await sleep(800)

  // Done — close modal, show toast, reset state
  showPayoutModal.value = false
  payoutInProgress.value = false
  settledZeroed.value = true

  const amount = payoutAmount.value
  showToast(`Payout of ${formatCurrency(amount)} initiated successfully`, 'success')
}
</script>

<template>
  <AppLayout>
    <div class="p-8">
      <!-- Header -->
      <div class="mb-6 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-slate-900">Commissions</h1>
          <p class="text-slate-500 text-sm mt-0.5">Revenue earned through the Prodigy platform</p>
        </div>
        <!-- Request Payout CTA -->
        <button
          :disabled="settledAmount <= 0 || payoutInProgress"
          class="inline-flex items-center gap-2 h-9 px-4 text-sm font-semibold rounded-lg transition-colors
                 bg-brand-600 text-white hover:bg-brand-700 focus-visible:outline-none
                 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2
                 disabled:opacity-50 disabled:pointer-events-none"
          @click="openPayoutModal"
        >
          <Loader2 v-if="payoutInProgress" class="w-4 h-4 animate-spin" />
          <DollarSign v-else class="w-4 h-4" />
          Request Payout
        </button>
      </div>

      <!-- No b2bClientId warning -->
      <div
        v-if="!b2bClientId && !isPending"
        class="rounded-lg border border-warning-200 bg-warning-50 px-5 py-4 text-sm text-warning-700"
      >
        No B2B client associated with your account. Please contact support.
      </div>

      <!-- Loading -->
      <div v-else-if="isPending" class="bg-white rounded-xl border border-slate-100 overflow-hidden">
        <div class="h-12 bg-slate-50 border-b border-slate-100" />
        <div v-for="i in 8" :key="i" class="flex gap-4 px-5 py-3 border-b border-slate-50">
          <div class="h-4 bg-slate-100 rounded animate-pulse w-24" />
          <div class="h-4 bg-slate-100 rounded animate-pulse w-28" />
          <div class="h-4 bg-slate-100 rounded animate-pulse w-20" />
          <div class="h-4 bg-slate-100 rounded animate-pulse w-16 ml-auto" />
        </div>
      </div>

      <!-- Error state -->
      <div
        v-else-if="isError"
        class="rounded-lg border border-danger-200 bg-danger-50 px-5 py-5 flex items-start gap-3"
      >
        <AlertCircle class="w-5 h-5 text-danger-500 flex-shrink-0 mt-0.5" />
        <div>
          <p class="text-sm font-semibold text-danger-900">Failed to load commissions</p>
          <p class="text-xs text-danger-700 mt-0.5">{{ (error as Error)?.message ?? 'An unexpected error occurred.' }}</p>
        </div>
      </div>

      <template v-else>
        <!-- Summary stats + donut -->
        <div class="grid grid-cols-4 gap-4 mb-8">
          <Card class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
              <DollarSign class="w-5 h-5 text-brand-600" />
            </div>
            <div>
              <p class="text-xs text-slate-500 font-medium uppercase tracking-wide">Total Earned</p>
              <p class="text-xl font-bold text-slate-900 mt-0.5">{{ formatCurrency(totalEarned) }}</p>
            </div>
          </Card>

          <Card class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-lg bg-warning-50 flex items-center justify-center flex-shrink-0">
              <Clock class="w-5 h-5 text-warning-600" />
            </div>
            <div>
              <p class="text-xs text-slate-500 font-medium uppercase tracking-wide">Pending</p>
              <p class="text-xl font-bold text-slate-900 mt-0.5">{{ formatCurrency(totalPending) }}</p>
            </div>
          </Card>

          <Card class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-lg bg-success-50 flex items-center justify-center flex-shrink-0">
              <CheckCircle class="w-5 h-5 text-success-600" />
            </div>
            <div>
              <p class="text-xs text-slate-500 font-medium uppercase tracking-wide">Paid / Settled</p>
              <p class="text-xl font-bold text-slate-900 mt-0.5">{{ formatCurrency(totalPaid) }}</p>
            </div>
          </Card>

          <!-- Donut progress visualization -->
          <Card class="flex items-center gap-5 px-5 py-4">
            <div
              class="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center"
              :style="donutStyle"
            >
              <div class="w-9 h-9 rounded-full bg-white flex items-center justify-center">
                <span class="text-xs font-bold text-brand-700">{{ settledPct }}%</span>
              </div>
            </div>
            <div class="flex flex-col gap-1 text-xs">
              <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-sm bg-brand-500 flex-shrink-0" />
                <span class="text-slate-600">Settled {{ settledPct }}%</span>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-sm bg-warning-400 flex-shrink-0" />
                <span class="text-slate-600">Pending {{ pendingPct }}%</span>
              </div>
            </div>
          </Card>
        </div>

        <!-- Filter -->
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm text-slate-600 font-medium">{{ sorted.length }} commission{{ sorted.length !== 1 ? 's' : '' }}</p>
          <div class="relative">
            <select
              v-model="statusFilter"
              class="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-sm text-slate-700 shadow-panel focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All statuses</option>
              <option v-for="s in statusOptions" :key="s" :value="s">{{ s }}</option>
            </select>
            <ChevronDown class="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <!-- Table -->
        <Card class="p-0 overflow-hidden">
          <EmptyState
            v-if="sorted.length === 0"
            title="No commissions found"
            description="No commissions match the current filter."
          />

          <table v-else class="w-full text-sm">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-100">
                <th class="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-3">ID</th>
                <th class="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">Transaction</th>
                <th class="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">Amount</th>
                <th class="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">Status</th>
                <th class="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="comm in sorted"
                :key="comm.id"
                class="border-b border-slate-50 hover:bg-slate-50 transition-colors"
              >
                <td class="px-5 py-3">
                  <span class="font-mono text-xs text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                    {{ comm.id }}
                  </span>
                </td>
                <td class="px-4 py-3">
                  <span class="font-mono text-xs text-slate-500">{{ comm.transactionId }}</span>
                </td>
                <td class="px-4 py-3 font-semibold text-slate-900">
                  {{ formatCurrency(comm.amount, comm.currency) }}
                </td>
                <td class="px-4 py-3">
                  <span
                    class="text-xs font-medium px-2 py-0.5 rounded-full"
                    :class="statusClass(comm.status)"
                  >
                    {{ comm.status }}
                  </span>
                </td>
                <td class="px-4 py-3 text-slate-500 text-xs">{{ formatDate(comm.createdAt) }}</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </template>
    </div>
  </AppLayout>

  <!-- ── Payout Modal ── -->
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="showPayoutModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
        @click.self="closePayoutModal"
      >
        <Transition name="modal-pop" appear>
          <div
            v-if="showPayoutModal"
            class="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full mx-auto"
          >
            <!-- Modal header -->
            <div class="mb-5">
              <h2 class="text-lg font-semibold text-slate-900">Request Payout</h2>
              <p class="text-sm text-slate-500 mt-0.5">Initiating payout for your settled commissions</p>
            </div>

            <!-- Amount display -->
            <div class="bg-brand-50 rounded-xl px-5 py-4 mb-6 text-center">
              <p class="text-xs text-brand-500 font-medium uppercase tracking-wide mb-1">Payout Amount</p>
              <p class="text-3xl font-bold text-brand-700">{{ formatCurrency(payoutAmount) }}</p>
            </div>

            <!-- Step progress -->
            <div class="space-y-3 mb-6">
              <div
                v-for="(label, i) in STEP_LABELS"
                :key="label"
                class="flex items-center gap-3"
              >
                <!-- Step dot indicator -->
                <div class="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                  :class="{
                    'bg-success-100': stepState((i + 1) as 1 | 2 | 3) === 'done',
                    'bg-brand-100': stepState((i + 1) as 1 | 2 | 3) === 'active',
                    'bg-slate-100': stepState((i + 1) as 1 | 2 | 3) === 'idle',
                  }"
                >
                  <!-- Done: checkmark -->
                  <Check
                    v-if="stepState((i + 1) as 1 | 2 | 3) === 'done'"
                    class="w-4 h-4 text-success-600"
                  />
                  <!-- Active: spinner -->
                  <Loader2
                    v-else-if="stepState((i + 1) as 1 | 2 | 3) === 'active'"
                    class="w-4 h-4 text-brand-600 animate-spin"
                  />
                  <!-- Idle: number dot -->
                  <span v-else class="text-xs font-semibold text-slate-400">{{ i + 1 }}</span>
                </div>

                <!-- Step label + status -->
                <div class="flex-1">
                  <p class="text-sm font-medium"
                    :class="{
                      'text-success-700': stepState((i + 1) as 1 | 2 | 3) === 'done',
                      'text-brand-700': stepState((i + 1) as 1 | 2 | 3) === 'active',
                      'text-slate-400': stepState((i + 1) as 1 | 2 | 3) === 'idle',
                    }"
                  >
                    {{ label }}
                  </p>
                </div>

                <!-- Inline badge -->
                <Transition name="fade">
                  <span
                    v-if="stepState((i + 1) as 1 | 2 | 3) === 'done'"
                    class="text-xs font-medium text-success-600 bg-success-50 px-2 py-0.5 rounded-full"
                  >
                    Done
                  </span>
                  <span
                    v-else-if="stepState((i + 1) as 1 | 2 | 3) === 'active'"
                    class="text-xs font-medium text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full"
                  >
                    In progress
                  </span>
                </Transition>
              </div>
            </div>

            <!-- Action row -->
            <div class="flex gap-3">
              <button
                :disabled="payoutInProgress"
                class="flex-1 h-9 px-4 text-sm font-medium rounded-lg border border-slate-200
                       text-slate-700 hover:bg-slate-50 transition-colors
                       disabled:opacity-40 disabled:pointer-events-none"
                @click="closePayoutModal"
              >
                Cancel
              </button>
              <button
                :disabled="payoutInProgress || payoutStep > 0"
                class="flex-1 h-9 px-4 text-sm font-semibold rounded-lg transition-colors
                       bg-brand-600 text-white hover:bg-brand-700
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2
                       disabled:opacity-50 disabled:pointer-events-none
                       inline-flex items-center justify-center gap-2"
                @click="runPayout"
              >
                <Loader2 v-if="payoutInProgress" class="w-4 h-4 animate-spin" />
                <span>{{ payoutInProgress ? 'Processing…' : 'Confirm Payout' }}</span>
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Backdrop fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Modal pop-in */
.modal-pop-enter-active {
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.modal-pop-leave-active {
  transition: all 0.18s ease-in;
}
.modal-pop-enter-from {
  opacity: 0;
  transform: scale(0.92) translateY(8px);
}
.modal-pop-leave-to {
  opacity: 0;
  transform: scale(0.96) translateY(4px);
}
</style>
