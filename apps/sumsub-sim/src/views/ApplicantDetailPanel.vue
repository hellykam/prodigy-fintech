<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { X, Lock, CheckCircle, XCircle, Flag, ChevronRight, AlertCircle } from 'lucide-vue-next'
import { Button, Badge, StatusPill } from '@prodigy/ui'
import { apiFetch } from '../composables/useApi'
import { useWebSocket, type SystemEvent } from '../composables/useWebSocket'

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
  requiredSteps: string
  completedSteps: string
  countryRisk: string | null
  pepDeclaration: boolean
  user?: { email: string; kycStatus: string }
}

const route = useRoute()
const router = useRouter()
const queryClient = useQueryClient()
const { events } = useWebSocket()

const id = computed(() => route.params.id as string)

const { data: applicant, isLoading, isError, error, refetch } = useQuery({
  queryKey: computed(() => ['kyc-applicant', id.value]),
  queryFn: () => apiFetch<KycApplicant>(`/kyc/applicants/${id.value}`),
  enabled: computed(() => !!id.value),
})

const rejectMode = ref(false)
const rejectReason = ref('')
const actionError = ref<string | null>(null)
const toast = ref<string | null>(null)

watch(id, () => {
  rejectMode.value = false
  rejectReason.value = ''
  actionError.value = null
})

function showToast(msg: string) {
  toast.value = msg
  setTimeout(() => { toast.value = null }, 3000)
}

function invalidateAll() {
  queryClient.invalidateQueries({ queryKey: ['kyc-applicants'] })
  queryClient.invalidateQueries({ queryKey: ['kyc-applicant', id.value] })
}

const approveMutation = useMutation({
  mutationFn: () =>
    apiFetch(`/kyc/applicants/${id.value}/approve`, {
      method: 'POST',
      body: JSON.stringify({ reviewedBy: 'sumsub-sim@prodigy.com' }),
    }),
  onSuccess: invalidateAll,
  onError: (err: Error) => { actionError.value = err.message },
})

const rejectMutation = useMutation({
  mutationFn: () =>
    apiFetch(`/kyc/applicants/${id.value}/reject`, {
      method: 'POST',
      body: JSON.stringify({ reviewedBy: 'sumsub-sim@prodigy.com', reason: rejectReason.value }),
    }),
  onSuccess: () => { invalidateAll(); rejectMode.value = false; rejectReason.value = '' },
  onError: (err: Error) => { actionError.value = err.message },
})

const manualReviewMutation = useMutation({
  mutationFn: () =>
    apiFetch(`/kyc/applicants/${id.value}/manual-review`, {
      method: 'POST',
    }),
  onSuccess: invalidateAll,
  onError: (err: Error) => { actionError.value = err.message },
})

const upgradeMutation = useMutation({
  mutationFn: () =>
    apiFetch(`/kyc/applicants/${id.value}/upgrade-level`, {
      method: 'POST',
      body: JSON.stringify({ levelId: 'enhanced-kyc-level' }),
    }),
  onSuccess: () => { invalidateAll(); showToast('Upgraded to Enhanced verification') },
  onError: (err: Error) => { actionError.value = err.message },
})

const pepMutation = useMutation({
  mutationFn: () =>
    apiFetch(`/kyc/applicants/${id.value}`, {
      method: 'PATCH',
      body: JSON.stringify({ pepDeclaration: true, status: 'manual_review' }),
    }),
  onSuccess: () => { invalidateAll(); showToast('Applicant flagged as PEP — sent to manual review') },
  onError: (err: Error) => { actionError.value = err.message },
})

function close() {
  router.push('/applicants')
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

const panelEvents = computed<SystemEvent[]>(() =>
  events.value.filter((e) => e.entityId === id.value).slice(0, 20),
)

const canAct = computed(() =>
  applicant.value?.status === 'pending' || applicant.value?.status === 'manual_review',
)
const canFlag = computed(() => applicant.value?.status !== 'manual_review')

// KYC Level badge
const levelBadge = computed(() => {
  const level = applicant.value?.levelName
  if (level === 'basic-kyc-level') return { label: 'Basic', cls: 'level-badge--green' }
  if (level === 'standard-kyc-level') return { label: 'Standard', cls: 'level-badge--blue' }
  if (level === 'enhanced-kyc-level') return { label: 'Enhanced', cls: 'level-badge--orange' }
  return { label: 'Unknown', cls: 'level-badge--gray' }
})

// Country risk indicator
const countryRiskIcon = computed(() => {
  const risk = applicant.value?.countryRisk
  if (risk === 'low') return '🟢'
  if (risk === 'medium') return '🟡'
  if (risk === 'high') return '🔴'
  if (risk === 'blocked') return '🚫'
  return '⚪'
})

// Step completion checklist
const stepChecklist = computed(() => {
  if (!applicant.value) return []
  let required: string[] = []
  let completed: string[] = []
  try { required = JSON.parse(applicant.value.requiredSteps || '[]') } catch { required = [] }
  try { completed = JSON.parse(applicant.value.completedSteps || '[]') } catch { completed = [] }
  return required.map((step) => ({
    name: step,
    done: completed.includes(step),
  }))
})

const isAtEnhanced = computed(() => applicant.value?.levelName === 'enhanced-kyc-level')

// Timeline steps derived from applicant status
interface TimelineStep {
  label: string
  description: string
  done: boolean
  active: boolean
}

const timelineSteps = computed<TimelineStep[]>(() => {
  if (!applicant.value) return []
  const status = applicant.value.status
  const isDone = (s: string) => ['approved', 'rejected'].includes(status) || s === 'created'
  return [
    {
      label: 'Created',
      description: formatDate(applicant.value.createdAt),
      done: true,
      active: status === 'pending',
    },
    {
      label: 'Submitted',
      description: 'Documents provided',
      done: isDone('submitted') || ['manual_review', 'approved', 'rejected'].includes(status),
      active: status === 'manual_review',
    },
    {
      label: 'Reviewed',
      description: status === 'approved' ? 'Approved' : status === 'rejected' ? 'Rejected' : 'Awaiting review',
      done: ['approved', 'rejected'].includes(status),
      active: false,
    },
  ]
})
</script>

<template>
  <Transition name="panel-slide">
    <aside class="flex flex-col w-[480px] shrink-0 bg-white border-l border-slate-200 shadow-side-panel overflow-y-auto">
      <!-- Toast -->
      <Transition name="toast-fade">
        <div
          v-if="toast"
          class="fixed top-4 right-4 z-50 px-4 py-2.5 bg-slate-800 text-white text-xs font-medium rounded-lg shadow-lg"
        >
          {{ toast }}
        </div>
      </Transition>

      <!-- Loading skeleton -->
      <div v-if="isLoading" class="p-6 space-y-3">
        <div v-for="i in 6" :key="i" class="h-12 bg-slate-100 rounded-xl animate-pulse" />
      </div>

      <!-- Error -->
      <div v-else-if="isError" class="flex flex-col items-center py-10 px-6 text-center">
        <AlertCircle class="w-8 h-8 text-danger-400 mb-2" />
        <p class="text-slate-600 text-sm">{{ (error as Error)?.message || 'Failed to load applicant' }}</p>
        <button class="mt-2 text-xs text-brand-600 hover:underline" @click="() => refetch()">Retry</button>
      </div>

      <template v-else-if="applicant">
        <!-- Header -->
        <div class="flex items-start justify-between px-6 py-4 border-b border-slate-200 shrink-0">
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <h2 class="text-base font-semibold text-slate-900">
                {{ applicant.firstName }} {{ applicant.lastName }}
              </h2>
              <!-- KYC Level Badge -->
              <span :class="['level-badge', levelBadge.cls]">{{ levelBadge.label }}</span>
              <!-- Country Risk Indicator -->
              <span v-if="applicant.country" class="country-risk-pill">
                {{ countryRiskIcon }} {{ applicant.country }}
              </span>
            </div>
            <div class="flex items-center gap-2 mt-1 flex-wrap">
              <StatusPill :status="applicant.status" />
              <span class="text-xs text-slate-400 font-mono">{{ applicant.id }}</span>
            </div>
          </div>
          <button
            class="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            @click="close"
          >
            <X class="w-4 h-4" />
          </button>
        </div>

        <!-- PEP Warning Banner -->
        <div
          v-if="applicant.pepDeclaration"
          class="pep-banner"
        >
          ⚠ PEP Declared — requires manual review
        </div>

        <!-- Step Completion Checklist -->
        <div v-if="stepChecklist.length > 0" class="px-6 py-3 border-b border-slate-100">
          <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Verification Steps</h3>
          <div class="flex flex-wrap gap-x-4 gap-y-1">
            <span
              v-for="step in stepChecklist"
              :key="step.name"
              :class="['step-item', step.done ? 'step-item--done' : 'step-item--pending']"
            >
              <span>{{ step.done ? '✓' : '○' }}</span>
              {{ step.name.replace(/_/g, ' ') }}
            </span>
          </div>
        </div>

        <div class="flex-1 flex flex-col gap-5 px-6 py-5">

          <!-- Identity section -->
          <section>
            <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Identity</h3>
            <div class="grid grid-cols-2 gap-x-6 gap-y-3">
              <div>
                <dt class="text-xs text-slate-400">First Name</dt>
                <dd class="text-sm font-medium text-slate-900 mt-0.5">{{ applicant.firstName }}</dd>
              </div>
              <div>
                <dt class="text-xs text-slate-400">Last Name</dt>
                <dd class="text-sm font-medium text-slate-900 mt-0.5">{{ applicant.lastName }}</dd>
              </div>
              <div>
                <dt class="text-xs text-slate-400">Date of Birth</dt>
                <dd class="text-sm font-medium text-slate-900 mt-0.5">{{ applicant.dateOfBirth }}</dd>
              </div>
              <div>
                <dt class="text-xs text-slate-400">Country</dt>
                <dd class="text-sm font-medium text-slate-900 mt-0.5">{{ applicant.country }}</dd>
              </div>
              <div v-if="applicant.user?.email">
                <dt class="text-xs text-slate-400">Email</dt>
                <dd class="text-sm font-medium text-slate-900 mt-0.5">{{ applicant.user.email }}</dd>
              </div>
            </div>
          </section>

          <!-- Document section -->
          <section>
            <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Document</h3>
            <div class="grid grid-cols-2 gap-x-6 gap-y-3 mb-4">
              <div>
                <dt class="text-xs text-slate-400">Type</dt>
                <dd class="text-sm font-medium text-slate-900 mt-0.5 capitalize">
                  {{ applicant.documentType.replace(/_/g, ' ') }}
                </dd>
              </div>
              <div>
                <dt class="text-xs text-slate-400">Status</dt>
                <dd class="mt-0.5">
                  <StatusPill :status="applicant.documentStatus" />
                </dd>
              </div>
            </div>
            <!-- Mocked document preview -->
            <div class="flex flex-col items-center justify-center gap-3 bg-slate-100 rounded-xl border border-dashed border-slate-300 h-36">
              <Lock class="w-6 h-6 text-slate-400" />
              <span class="text-xs text-slate-500 font-medium">Document scan — Preview not available</span>
            </div>
          </section>

          <!-- Verification section -->
          <section>
            <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Verification</h3>
            <div class="grid grid-cols-2 gap-x-6 gap-y-3">
              <div>
                <dt class="text-xs text-slate-400">KYC Level</dt>
                <dd class="mt-0.5">
                  <Badge variant="default">{{ applicant.levelName }}</Badge>
                </dd>
              </div>
              <div>
                <dt class="text-xs text-slate-400">KYC Status</dt>
                <dd class="mt-0.5">
                  <StatusPill :status="applicant.user?.kycStatus ?? applicant.status" />
                </dd>
              </div>
              <div>
                <dt class="text-xs text-slate-400">Created</dt>
                <dd class="text-sm font-medium text-slate-900 mt-0.5">{{ formatDate(applicant.createdAt) }}</dd>
              </div>
            </div>
          </section>

          <!-- Actions section -->
          <section v-if="canAct">
            <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Actions</h3>

            <div v-if="actionError" class="mb-3 px-3 py-2 bg-danger-50 border border-danger-200 rounded-lg text-xs text-danger-600">
              {{ actionError }}
            </div>

            <div v-if="!rejectMode" class="flex flex-col gap-2">
              <Button
                variant="primary"
                class="w-full justify-center !bg-emerald-600 hover:!bg-emerald-700"
                :loading="approveMutation.isPending.value"
                @click="approveMutation.mutate()"
              >
                <CheckCircle class="w-4 h-4" />
                Approve
              </Button>
              <Button
                variant="destructive"
                class="w-full justify-center"
                @click="rejectMode = true"
              >
                <XCircle class="w-4 h-4" />
                Reject
              </Button>
              <Button
                v-if="canFlag"
                variant="outline"
                class="w-full justify-center"
                :loading="manualReviewMutation.isPending.value"
                @click="manualReviewMutation.mutate()"
              >
                <Flag class="w-4 h-4" />
                Flag for Manual Review
              </Button>

              <!-- Divider -->
              <div class="border-t border-slate-100 my-1" />

              <!-- Upgrade to Enhanced -->
              <button
                :disabled="isAtEnhanced || upgradeMutation.isPending.value"
                class="sim-btn sim-btn--amber"
                @click="upgradeMutation.mutate()"
              >
                <span v-if="upgradeMutation.isPending.value">Upgrading…</span>
                <span v-else-if="isAtEnhanced">Already Enhanced</span>
                <span v-else>Upgrade to Enhanced</span>
              </button>

              <!-- Flag as PEP -->
              <button
                :disabled="applicant.pepDeclaration || pepMutation.isPending.value"
                class="sim-btn sim-btn--red"
                @click="pepMutation.mutate()"
              >
                <span v-if="pepMutation.isPending.value">Flagging…</span>
                <span v-else-if="applicant.pepDeclaration">PEP Already Flagged</span>
                <span v-else>Flag as PEP</span>
              </button>
            </div>

            <div v-else class="flex flex-col gap-3">
              <label class="text-xs font-medium text-slate-700">Rejection reason</label>
              <textarea
                v-model="rejectReason"
                rows="3"
                placeholder="Describe why this applicant is being rejected…"
                class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-danger-500 focus:border-transparent resize-none"
              />
              <div class="flex gap-2">
                <Button
                  variant="destructive"
                  class="flex-1 justify-center"
                  :disabled="!rejectReason.trim()"
                  :loading="rejectMutation.isPending.value"
                  @click="rejectMutation.mutate()"
                >
                  Confirm Reject
                </Button>
                <Button
                  variant="outline"
                  class="flex-1 justify-center"
                  @click="rejectMode = false; rejectReason = ''"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </section>

          <!-- Approval status timeline -->
          <section>
            <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">Review Timeline</h3>
            <div class="flex flex-col gap-0">
              <div
                v-for="(step, i) in timelineSteps"
                :key="step.label"
                class="flex items-start gap-3"
              >
                <!-- Dot + line -->
                <div class="flex flex-col items-center">
                  <div
                    :class="[
                      'w-3 h-3 rounded-full border-2 flex-shrink-0 mt-0.5',
                      step.done
                        ? 'bg-emerald-500 border-emerald-500'
                        : step.active
                          ? 'bg-white border-emerald-500 animate-pulse'
                          : 'bg-white border-slate-300',
                    ]"
                  />
                  <div
                    v-if="i < timelineSteps.length - 1"
                    class="w-px flex-1 min-h-[24px] mt-1"
                    :class="step.done ? 'bg-emerald-300' : 'bg-slate-200'"
                  />
                </div>
                <!-- Content -->
                <div class="pb-5">
                  <p
                    class="text-xs font-semibold"
                    :class="step.done ? 'text-slate-800' : step.active ? 'text-emerald-700' : 'text-slate-400'"
                  >
                    {{ step.label }}
                  </p>
                  <p class="text-xs text-slate-400 mt-0.5">{{ step.description }}</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Activity log -->
          <section>
            <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Activity Log</h3>
            <div v-if="panelEvents.length === 0" class="text-xs text-slate-400 italic">
              No events yet for this applicant.
            </div>
            <ul v-else class="flex flex-col gap-2">
              <li
                v-for="event in panelEvents"
                :key="event.id"
                class="flex items-start gap-2 text-xs"
              >
                <ChevronRight class="w-3 h-3 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <span class="font-medium text-slate-700">{{ event.eventName }}</span>
                  <span class="text-slate-400 ml-2">{{ formatTime(event.createdAt) }}</span>
                  <div class="text-slate-400 font-mono">{{ event.source }} → {{ event.target }}</div>
                </div>
              </li>
            </ul>
          </section>

        </div>
      </template>
    </aside>
  </Transition>
</template>

<style scoped>
/* Panel slide transition */
.panel-slide-enter-active { transition: transform 0.2s ease-out; }
.panel-slide-enter-from { transform: translateX(100%); }
.panel-slide-leave-active { transition: transform 0.15s ease-in; }
.panel-slide-leave-to { transform: translateX(100%); }

/* Toast fade */
.toast-fade-enter-active { transition: opacity 0.2s ease-out, transform 0.2s ease-out; }
.toast-fade-enter-from { opacity: 0; transform: translateY(-6px); }
.toast-fade-leave-active { transition: opacity 0.15s ease-in; }
.toast-fade-leave-to { opacity: 0; }

/* KYC Level badge */
.level-badge {
  display: inline-flex;
  align-items: center;
  padding: 1px 8px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 600;
  line-height: 18px;
}
.level-badge--green  { background: #dcfce7; color: #16a34a; }
.level-badge--blue   { background: #dbeafe; color: #1d4ed8; }
.level-badge--orange { background: #ffedd5; color: #c2410c; }
.level-badge--gray   { background: #f1f5f9; color: #64748b; }

/* Country risk pill */
.country-risk-pill {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 1px 7px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 500;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #475569;
}

/* PEP warning banner */
.pep-banner {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 24px;
  background: #fef2f2;
  border-bottom: 1px solid #fecaca;
  font-size: 12px;
  font-weight: 600;
  color: #dc2626;
}

/* Step checklist items */
.step-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 500;
  white-space: nowrap;
}
.step-item--done    { color: #16a34a; }
.step-item--pending { color: #94a3b8; }

/* Sim action buttons */
.sim-btn {
  width: 100%;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.15s, opacity 0.15s;
  border: 1.5px solid;
}
.sim-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
.sim-btn--amber {
  background: transparent;
  border-color: #d97706;
  color: #b45309;
}
.sim-btn--amber:not(:disabled):hover {
  background: #fffbeb;
}
.sim-btn--red {
  background: transparent;
  border-color: #dc2626;
  color: #dc2626;
}
.sim-btn--red:not(:disabled):hover {
  background: #fef2f2;
}
</style>
