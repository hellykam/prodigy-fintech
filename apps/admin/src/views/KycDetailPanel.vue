<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { X, Loader2 } from 'lucide-vue-next'
import { StatusPill, Badge, Button } from '@prodigy/ui'
import { apiFetch } from '../composables/useApi'

interface KycApplicant {
  id: string
  status: string
  levelName: string
  firstName: string
  lastName: string
  dateOfBirth: string
  country: string
  documentType: string
  documentStatus: string
  createdAt: string
  user?: { email: string; kycStatus: string }
}

const router = useRouter()
const route = useRoute()
const queryClient = useQueryClient()

const applicantId = computed(() => route.params.id as string)
const rejectReason = ref('')
const showRejectForm = ref(false)
const rejectReasonTouched = ref(false)
const rejectReasonError = computed(() => {
  if (rejectReasonTouched.value && !rejectReason.value.trim()) {
    return 'Rejection reason is required'
  }
  return ''
})

const originalStatus = ref('')
const errorBanner = ref('')

const { data: applicant, isLoading } = useQuery({
  queryKey: computed(() => ['kyc-applicant', applicantId.value]),
  queryFn: () => apiFetch<KycApplicant>(`/api/kyc/applicants/${applicantId.value}`),
  enabled: computed(() => !!applicantId.value),
})

// Writable local copy for optimistic updates
const localApplicant = ref<KycApplicant | null>(null)
const displayApplicant = computed(() => localApplicant.value ?? applicant.value ?? null)

const approveMutation = useMutation({
  mutationFn: () =>
    apiFetch(`/api/kyc/applicants/${applicantId.value}/approve`, {
      method: 'POST',
      body: JSON.stringify({ reviewedBy: 'admin@prodigy.com' }),
    }),
  onMutate: () => {
    errorBanner.value = ''
    if (applicant.value) {
      originalStatus.value = applicant.value.status
      localApplicant.value = { ...applicant.value, status: 'approved' }
    }
  },
  onError: () => {
    if (localApplicant.value) {
      localApplicant.value = { ...localApplicant.value, status: originalStatus.value }
    }
    errorBanner.value = 'Failed to approve applicant. Please try again.'
  },
  onSuccess: () => {
    localApplicant.value = null
    errorBanner.value = ''
    queryClient.invalidateQueries({ queryKey: ['kyc-applicants'] })
    queryClient.invalidateQueries({ queryKey: ['kyc-applicant', applicantId.value] })
  },
})

const rejectMutation = useMutation({
  mutationFn: () =>
    apiFetch(`/api/kyc/applicants/${applicantId.value}/reject`, {
      method: 'POST',
      body: JSON.stringify({ reviewedBy: 'admin@prodigy.com', reason: rejectReason.value || 'document_rejected' }),
    }),
  onMutate: () => {
    errorBanner.value = ''
  },
  onError: () => {
    errorBanner.value = 'Failed to reject applicant. Please try again.'
  },
  onSuccess: () => {
    errorBanner.value = ''
    queryClient.invalidateQueries({ queryKey: ['kyc-applicants'] })
    queryClient.invalidateQueries({ queryKey: ['kyc-applicant', applicantId.value] })
    showRejectForm.value = false
    rejectReason.value = ''
    rejectReasonTouched.value = false
  },
})

const manualReviewMutation = useMutation({
  mutationFn: () =>
    apiFetch(`/api/kyc/applicants/${applicantId.value}/manual-review`, {
      method: 'POST',
      body: JSON.stringify({ reviewedBy: 'admin@prodigy.com' }),
    }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['kyc-applicants'] })
    queryClient.invalidateQueries({ queryKey: ['kyc-applicant', applicantId.value] })
  },
})

function handleRejectSubmit() {
  rejectReasonTouched.value = true
  if (!rejectReason.value.trim()) return
  rejectMutation.mutate()
}

function close() {
  router.push('/kyc')
}

function formatDate(ts: string) {
  return new Date(ts).toLocaleDateString()
}

const canAct = computed(() => {
  const s = displayApplicant.value?.status
  return s === 'pending' || s === 'manual_review'
})
</script>

<template>
  <aside
    class="w-[480px] flex-shrink-0 bg-white border-l border-slate-200 shadow-side-panel flex flex-col overflow-hidden transition-transform duration-200 ease-in-out"
  >
    <div class="flex items-center justify-between px-5 py-4 border-b border-slate-200 flex-shrink-0">
      <h2 class="text-base font-semibold text-slate-900">KYC Applicant</h2>
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

    <div v-else-if="displayApplicant" class="flex-1 overflow-y-auto">
      <!-- Error banner -->
      <div
        v-if="errorBanner"
        class="mx-5 mt-4 text-sm text-danger-700 bg-danger-50 border border-danger-200 rounded-lg px-4 py-3"
      >
        {{ errorBanner }}
      </div>

      <!-- Header -->
      <div class="px-5 py-4 border-b border-slate-100">
        <div class="text-sm font-semibold text-slate-900">{{ displayApplicant.user?.email ?? '—' }}</div>
        <div class="mt-2 flex flex-wrap gap-2">
          <StatusPill :status="displayApplicant.status" />
          <Badge variant="neutral">{{ displayApplicant.levelName }}</Badge>
        </div>
        <div class="text-xs text-slate-400 mt-1.5">Submitted {{ formatDate(displayApplicant.createdAt) }}</div>
      </div>

      <!-- Details -->
      <div class="px-5 py-4 border-b border-slate-100">
        <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Applicant Info</h3>
        <div class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div class="text-slate-500">First Name</div>
          <div class="text-slate-800">{{ displayApplicant.firstName }}</div>
          <div class="text-slate-500">Last Name</div>
          <div class="text-slate-800">{{ displayApplicant.lastName }}</div>
          <div class="text-slate-500">Date of Birth</div>
          <div class="text-slate-800">{{ displayApplicant.dateOfBirth }}</div>
          <div class="text-slate-500">Country</div>
          <div class="text-slate-800">{{ displayApplicant.country }}</div>
          <div class="text-slate-500">Document Type</div>
          <div class="text-slate-800">{{ displayApplicant.documentType }}</div>
          <div class="text-slate-500">Document Status</div>
          <div><StatusPill :status="displayApplicant.documentStatus" /></div>
        </div>
      </div>

      <!-- Action buttons -->
      <div v-if="canAct" class="px-5 py-4 border-b border-slate-100">
        <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Actions</h3>

        <div v-if="!showRejectForm" class="flex flex-wrap gap-2">
          <Button
            variant="primary"
            size="sm"
            :disabled="approveMutation.isPending.value || manualReviewMutation.isPending.value"
            @click="approveMutation.mutate()"
            class="inline-flex items-center gap-1.5"
          >
            <Loader2 v-if="approveMutation.isPending.value" class="w-3.5 h-3.5 animate-spin" />
            Approve
          </Button>
          <Button
            variant="outline"
            size="sm"
            :disabled="approveMutation.isPending.value || rejectMutation.isPending.value"
            @click="showRejectForm = true"
          >
            Reject
          </Button>
          <Button
            v-if="displayApplicant.status !== 'manual_review'"
            variant="secondary"
            size="sm"
            :disabled="manualReviewMutation.isPending.value"
            @click="manualReviewMutation.mutate()"
          >
            Request Manual Review
          </Button>
        </div>

        <div v-else class="space-y-3">
          <label class="block text-sm font-medium text-slate-700">Rejection reason</label>
          <textarea
            v-model="rejectReason"
            placeholder="Describe why this applicant is being rejected..."
            rows="3"
            :class="['w-full rounded-md border px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none',
              rejectReasonError ? 'border-danger-500 ring-1 ring-danger-500' : 'border-slate-300']"
            @blur="rejectReasonTouched = true"
          ></textarea>
          <p v-if="rejectReasonError" class="text-xs text-danger-600">{{ rejectReasonError }}</p>
          <div class="flex gap-2">
            <Button
              variant="destructive"
              size="sm"
              :disabled="rejectMutation.isPending.value"
              @click="handleRejectSubmit"
              class="inline-flex items-center gap-1.5"
            >
              <Loader2 v-if="rejectMutation.isPending.value" class="w-3.5 h-3.5 animate-spin" />
              Confirm Reject
            </Button>
            <Button variant="ghost" size="sm" @click="showRejectForm = false; rejectReason = ''; rejectReasonTouched = false">
              Cancel
            </Button>
          </div>
        </div>
      </div>

      <!-- Decided state -->
      <div v-else class="px-5 py-4 border-b border-slate-100">
        <div class="flex items-center gap-2">
          <StatusPill :status="displayApplicant.status" />
          <span class="text-sm text-slate-500">No further actions available</span>
        </div>
      </div>
    </div>
  </aside>
</template>
