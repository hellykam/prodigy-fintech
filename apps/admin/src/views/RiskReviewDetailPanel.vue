<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { X, Loader2 } from 'lucide-vue-next'
import { StatusPill, Badge, Button } from '@prodigy/ui'
import { apiFetch } from '../composables/useApi'

interface RiskReview {
  id: string
  status: string
  riskScore: number
  riskReasons: string  // stored as JSON array string or comma-separated string in DB
  decision: string | null
  decisionReason: string | null
  assignedTo: string | null
  transactionId: string
  createdAt: string
  transaction?: {
    id: string
    type: string
    status: string
    sourceCurrency: string
    sourceAmount: number
    targetCurrency: string
    targetAmount: number
    createdAt: string
    user?: { email: string; kycStatus: string; riskLevel: string }
  }
}

function parseRiskReasons(raw: string): string[] {
  if (!raw) return []
  const trimmed = raw.trim()
  if (trimmed.startsWith('[')) {
    try { return JSON.parse(trimmed) as string[] } catch { /* fall through */ }
  }
  return trimmed.split(',').map(s => s.trim()).filter(Boolean)
}

const router = useRouter()
const route = useRoute()
const queryClient = useQueryClient()

const reviewId = computed(() => route.params.id as string)
const decisionReason = ref('')
const pendingDecision = ref<'approved' | 'rejected' | null>(null)
const errorBanner = ref('')

// Optimistic local state
const localReview = ref<RiskReview | null>(null)
const originalStatus = ref('')

const { data: review, isLoading } = useQuery({
  queryKey: computed(() => ['risk-review', reviewId.value]),
  queryFn: () => apiFetch<RiskReview>(`/api/risk-reviews/${reviewId.value}`),
  enabled: computed(() => !!reviewId.value),
})

const displayReview = computed(() => localReview.value ?? review.value ?? null)

const decideMutation = useMutation({
  mutationFn: (payload: { decision: 'approved' | 'rejected'; decisionReason?: string }) =>
    apiFetch(`/api/risk-reviews/${reviewId.value}/decide`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  onMutate: (payload) => {
    errorBanner.value = ''
    if (review.value) {
      originalStatus.value = review.value.status
      // For 'approved' decision, optimistically set status to 'resolved'
      if (payload.decision === 'approved') {
        localReview.value = { ...review.value, status: 'resolved', decision: 'approved' }
      }
    }
  },
  onError: () => {
    // Revert optimistic update
    if (localReview.value) {
      localReview.value = { ...localReview.value, status: originalStatus.value, decision: null }
    }
    errorBanner.value = 'Action failed. Please try again.'
  },
  onSuccess: () => {
    localReview.value = null
    errorBanner.value = ''
    queryClient.invalidateQueries({ queryKey: ['risk-reviews'] })
    queryClient.invalidateQueries({ queryKey: ['risk-review', reviewId.value] })
    pendingDecision.value = null
    decisionReason.value = ''
  },
})

function close() {
  router.push('/risk-reviews')
}

function formatDate(ts: string) {
  return new Date(ts).toLocaleDateString()
}

function riskScoreColor(score: number) {
  if (score < 40) return 'text-success-600'
  if (score < 70) return 'text-warning-600'
  return 'text-danger-600'
}

function submitDecision() {
  if (!pendingDecision.value) return
  decideMutation.mutate({
    decision: pendingDecision.value,
    decisionReason: decisionReason.value || undefined,
  })
}

const isOpen = computed(() => displayReview.value?.status === 'open')
</script>

<template>
  <aside
    class="w-[480px] flex-shrink-0 bg-white border-l border-slate-200 shadow-side-panel flex flex-col overflow-hidden transition-transform duration-200 ease-in-out"
  >
    <div class="flex items-center justify-between px-5 py-4 border-b border-slate-200 flex-shrink-0">
      <h2 class="text-base font-semibold text-slate-900">Risk Review</h2>
      <button
        class="inline-flex items-center justify-center w-8 h-8 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        @click="close"
      >
        <X class="inline-flex w-4 h-4" />
      </button>
    </div>

    <div v-if="isLoading" class="flex-1 flex items-center justify-center text-sm text-slate-400">
      Loading...
    </div>

    <div v-else-if="displayReview" class="flex-1 overflow-y-auto">
      <!-- Error banner -->
      <div
        v-if="errorBanner"
        class="mx-5 mt-4 text-sm text-danger-700 bg-danger-50 border border-danger-200 rounded-lg px-4 py-3"
      >
        {{ errorBanner }}
      </div>

      <!-- Risk Score -->
      <div class="px-5 py-5 border-b border-slate-100 flex items-center gap-5">
        <div class="text-6xl font-bold" :class="riskScoreColor(displayReview.riskScore)">
          {{ displayReview.riskScore }}
        </div>
        <div>
          <div class="text-sm text-slate-500">Risk Score</div>
          <div class="mt-1.5 flex flex-wrap gap-1.5">
            <StatusPill :status="displayReview.status" />
          </div>
        </div>
      </div>

      <!-- Risk Reasons -->
      <div class="px-5 py-4 border-b border-slate-100">
        <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Risk Reasons</h3>
        <div v-if="displayReview.riskReasons" class="flex flex-wrap gap-1.5">
          <Badge
            v-for="reason in parseRiskReasons(displayReview.riskReasons)"
            :key="reason"
            variant="warning"
          >
            {{ reason.replace(/_/g, ' ') }}
          </Badge>
        </div>
        <div v-else class="text-sm text-slate-400">No specific reasons</div>
      </div>

      <!-- Transaction Info -->
      <div v-if="displayReview.transaction" class="px-5 py-4 border-b border-slate-100">
        <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Transaction</h3>
        <div class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div class="text-slate-500">ID</div>
          <div class="font-mono text-xs text-slate-600">{{ displayReview.transaction.id.slice(0, 12) }}...</div>
          <div class="text-slate-500">User</div>
          <div class="text-slate-700">{{ displayReview.transaction.user?.email ?? '—' }}</div>
          <div class="text-slate-500">Amount</div>
          <div class="text-slate-700">
            {{ displayReview.transaction.sourceAmount }} {{ displayReview.transaction.sourceCurrency }}
            → {{ displayReview.transaction.targetAmount }} {{ displayReview.transaction.targetCurrency }}
          </div>
          <div class="text-slate-500">KYC Status</div>
          <div><StatusPill :status="displayReview.transaction.user?.kycStatus ?? 'unknown'" /></div>
          <div class="text-slate-500">User Risk Level</div>
          <div class="text-slate-700">{{ displayReview.transaction.user?.riskLevel ?? '—' }}</div>
          <div class="text-slate-500">Created</div>
          <div class="text-slate-700">{{ formatDate(displayReview.transaction.createdAt) }}</div>
        </div>
      </div>

      <!-- Decision -->
      <div class="px-5 py-4">
        <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Decision</h3>

        <!-- Open — show buttons -->
        <div v-if="isOpen && !pendingDecision">
          <div class="flex gap-2">
            <Button
              variant="primary"
              size="sm"
              :disabled="decideMutation.isPending.value"
              @click="pendingDecision = 'approved'"
              class="inline-flex items-center gap-1.5"
            >
              <Loader2 v-if="decideMutation.isPending.value && pendingDecision === 'approved'" class="w-3.5 h-3.5 animate-spin" />
              Approve Transaction
            </Button>
            <Button
              variant="destructive"
              size="sm"
              :disabled="decideMutation.isPending.value"
              @click="pendingDecision = 'rejected'"
            >
              Reject Transaction
            </Button>
          </div>
        </div>

        <!-- Confirm form -->
        <div v-else-if="pendingDecision" class="space-y-3">
          <div class="text-sm font-medium text-slate-700">
            Confirm
            <span :class="pendingDecision === 'approved' ? 'text-success-600' : 'text-danger-600'">
              {{ pendingDecision }}
            </span>
            decision
          </div>
          <textarea
            v-model="decisionReason"
            :placeholder="pendingDecision === 'rejected' ? 'Reason for rejection...' : 'Optional note...'"
            rows="3"
            class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
          ></textarea>
          <div class="flex gap-2">
            <Button
              :variant="pendingDecision === 'approved' ? 'primary' : 'destructive'"
              size="sm"
              :disabled="decideMutation.isPending.value"
              @click="submitDecision"
              class="inline-flex items-center gap-1.5"
            >
              <Loader2 v-if="decideMutation.isPending.value" class="w-3.5 h-3.5 animate-spin" />
              Confirm {{ pendingDecision === 'approved' ? 'Approval' : 'Rejection' }}
            </Button>
            <Button variant="ghost" size="sm" @click="pendingDecision = null; decisionReason = ''">
              Cancel
            </Button>
          </div>
          <div v-if="decideMutation.isError.value" class="text-xs text-danger-600">
            Action failed. Please try again.
          </div>
        </div>

        <!-- Already decided -->
        <div v-else class="space-y-2">
          <div class="flex items-center gap-2">
            <StatusPill :status="displayReview.status" />
            <span class="text-sm text-slate-600 capitalize">{{ displayReview.decision }}</span>
          </div>
          <div v-if="displayReview.decisionReason" class="text-sm text-slate-500">
            {{ displayReview.decisionReason }}
          </div>
          <div v-if="displayReview.assignedTo" class="text-xs text-slate-400">
            Reviewed by {{ displayReview.assignedTo }}
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>
