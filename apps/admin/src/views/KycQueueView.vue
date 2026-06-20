<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import AppLayout from '../layouts/AppLayout.vue'
import { PageHeader, FilterTabs, DataTable, StatusPill, SidePanel, DefinitionList, Button, EmptyState } from '@prodigy/ui'
import { AlertCircle } from 'lucide-vue-next'
import { apiFetch } from '../composables/useApi'
import { useWebSocket } from '../composables/useWebSocket'

interface KycApplicant {
  id: string
  userId: string
  status: string
  firstName: string
  lastName: string
  country: string
  documentType: string
  createdAt: string
  reviewedAt?: string | null
  reviewedBy?: string | null
  rejectionReason?: string | null
  levelName?: string
  requiredSteps?: string | KycStep[]
  completedSteps?: string | KycStep[]
  countryRisk?: string
  pepDeclaration?: boolean
  sourceOfFunds?: string
  sourceOfFundsRange?: string
  user?: { email: string }
}

interface KycStep {
  id: string
  label: string
}

interface KycResponse {
  applicants: KycApplicant[]
}

const router = useRouter()
const route = useRoute()
const { events: wsEvents, connected } = useWebSocket()
const queryClient = useQueryClient()

const statusFilter = ref((route.query['status'] as string) ?? '')

// Invalidate KYC queue on relevant WS events
watch(wsEvents, (newEvents) => {
  const latest = newEvents[0]
  if (
    latest &&
    ['KYC_SUBMITTED', 'KYC_APPROVED', 'KYC_REJECTED', 'KYC_MANUAL_REVIEW_REQUIRED'].includes(latest.eventName)
  ) {
    queryClient.invalidateQueries({ queryKey: ['kyc-applicants'] })
  }
})
const levelFilter = ref((route.query['level'] as string) ?? 'all')

watch(statusFilter, (val) => {
  const q: Record<string, string> = {}
  if (val) q['status'] = val
  if (levelFilter.value && levelFilter.value !== 'all') q['level'] = levelFilter.value
  router.replace({ query: q })
})

watch(levelFilter, (val) => {
  const q: Record<string, string> = {}
  if (statusFilter.value) q['status'] = statusFilter.value
  if (val && val !== 'all') q['level'] = val
  router.replace({ query: q })
})

const { data, isLoading, isError, error, refetch } = useQuery({
  queryKey: computed(() => ['kyc-applicants', statusFilter.value]),
  queryFn: () => {
    const params = new URLSearchParams()
    if (statusFilter.value) params.set('status', statusFilter.value)
    return apiFetch<KycResponse>(`/api/kyc/applicants?${params.toString()}`)
  },
})

const applicants = computed(() => data.value?.items ?? [])

const levelTabs = [
  { value: 'all', label: 'All' },
  { value: 'Basic', label: 'Basic' },
  { value: 'Standard', label: 'Standard' },
  { value: 'Enhanced', label: 'Enhanced' },
  { value: 'pep', label: 'PEP Flagged' },
]

const filteredApplicants = computed(() => {
  const tab = levelFilter.value
  if (tab === 'all') return applicants.value
  if (tab === 'pep') return applicants.value.filter((a) => a.pepDeclaration === true)
  return applicants.value.filter((a) => a.levelName === tab)
})

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function parseSteps(raw: string | KycStep[] | undefined): KycStep[] {
  if (!raw) return []
  if (Array.isArray(raw)) return raw
  try { return JSON.parse(raw) as KycStep[] } catch { return [] }
}

function stepCount(a: KycApplicant): string {
  const required = parseSteps(a.requiredSteps)
  const completed = parseSteps(a.completedSteps)
  if (required.length === 0) return '—'
  return `${completed.length}/${required.length}`
}

function riskEmoji(risk: string | undefined): string {
  if (!risk) return ''
  if (risk === 'low') return '🟢'
  if (risk === 'medium') return '🟡'
  if (risk === 'high') return '🔴'
  if (risk === 'blocked') return '⛔'
  return ''
}

function levelBadgeClass(levelName: string | undefined): string {
  if (levelName === 'Basic') return 'bg-success-100 text-success-700'
  if (levelName === 'Standard') return 'bg-info-100 text-info-700'
  if (levelName === 'Enhanced') return 'bg-warning-100 text-warning-700'
  return 'bg-slate-100 text-slate-500'
}

const tableColumns = [
  { key: 'name', header: 'Applicant Name' },
  { key: 'country', header: 'Country' },
  { key: 'documentType', header: 'Document Type' },
  { key: 'status', header: 'Status' },
  { key: 'kycLevel', header: 'KYC Level' },
  { key: 'countryRiskDisplay', header: 'Country Risk' },
  { key: 'stepsDisplay', header: 'Steps' },
  { key: 'pepDisplay', header: 'PEP' },
  { key: 'createdAt', header: 'Submitted At' },
]

const tableData = computed(() =>
  filteredApplicants.value.map((a) => ({
    ...a,
    name: `${a.firstName} ${a.lastName}`,
    kycLevel: a.levelName ?? '—',
    countryRiskDisplay: `${riskEmoji(a.countryRisk)} ${a.country}`.trim(),
    stepsDisplay: stepCount(a),
    pepDisplay: a.pepDeclaration === true ? '⚠' : '',
    _raw: a,
  })),
)

// ---------------------------------------------------------------------------
// Side panel
// ---------------------------------------------------------------------------
const selectedApplicant = ref<KycApplicant | null>(null)
const panelOpen = computed(() => selectedApplicant.value !== null)

function openApplicant(row: Record<string, unknown>) {
  selectedApplicant.value = row['_raw'] as KycApplicant
  router.replace({ query: { ...route.query, panel: row['id'] as string } })
}

function closePanel() {
  selectedApplicant.value = null
  const q = { ...route.query }
  delete q['panel']
  router.replace({ query: q })
}

function formatDate(ts: string | null | undefined) {
  if (!ts) return '—'
  return new Date(ts).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
    timeZoneName: 'short',
  })
}

const detailItems = computed(() => {
  const a = selectedApplicant.value
  if (!a) return []
  return [
    { label: 'Applicant ID', value: a.id },
    { label: 'User ID', value: a.userId },
    { label: 'Status', value: a.status, type: 'status' as const },
    { label: 'First Name', value: a.firstName },
    { label: 'Last Name', value: a.lastName },
    { label: 'Country', value: a.country },
    { label: 'Document Type', value: a.documentType },
    { label: 'Submitted At', value: formatDate(a.createdAt) },
    { label: 'Reviewed At', value: formatDate(a.reviewedAt) },
    { label: 'Reviewed By', value: a.reviewedBy ?? null },
    { label: 'Rejection Reason', value: a.rejectionReason ?? null },
  ]
})

// Derived panel data
const requiredStepsList = computed(() =>
  selectedApplicant.value ? parseSteps(selectedApplicant.value.requiredSteps) : [],
)

const completedStepIds = computed(() => {
  const steps = parseSteps(selectedApplicant.value?.completedSteps)
  return new Set(steps.map((s) => s.id))
})

const isEnhanced = computed(() => selectedApplicant.value?.levelName === 'Enhanced')

// ---------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------
const approveMutation = useMutation({
  mutationFn: (id: string) =>
    apiFetch(`/api/kyc/applicants/${id}/approve`, {
      method: 'POST',
      body: JSON.stringify({ reviewedBy: 'admin@prodigy.io' }),
    }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['kyc-applicants'] })
    closePanel()
  },
})

const rejectMutation = useMutation({
  mutationFn: (id: string) =>
    apiFetch(`/api/kyc/applicants/${id}/reject`, {
      method: 'POST',
      body: JSON.stringify({ reason: 'Document unclear', reviewedBy: 'admin@prodigy.io' }),
    }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['kyc-applicants'] })
    closePanel()
  },
})

const canAct = computed(() => {
  const s = selectedApplicant.value?.status
  return s === 'pending' || s === 'manual_review'
})
</script>

<template>
  <AppLayout :ws-connected="connected">
    <PageHeader
      :breadcrumbs="[{ label: 'Admin', href: '/' }, { label: 'KYC Queue' }]"
      admin-email="admin@prodigy.com"
    />

    <div class="flex h-[calc(100vh-3.5rem)] overflow-hidden">
      <div class="flex-1 overflow-y-auto p-6">
        <div class="mb-4 flex items-center justify-between">
          <div>
            <h1 class="text-xl font-semibold text-slate-900">KYC Queue</h1>
            <p class="mt-0.5 text-sm text-slate-500">{{ filteredApplicants.length }} applicants</p>
          </div>
        </div>

        <!-- Level filter tabs -->
        <div class="mb-4">
          <FilterTabs v-model="levelFilter" :tabs="levelTabs" query-key="level" />
        </div>

        <!-- Status filter -->
        <div class="mb-4 flex items-center gap-3">
          <select
            v-model="statusFilter"
            class="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="manual_review">Manual Review</option>
          </select>
        </div>

        <!-- Error -->
        <div v-if="isError" class="flex flex-col items-center py-16 text-center">
          <div class="w-12 h-12 rounded-full bg-danger-50 flex items-center justify-center mb-4">
            <AlertCircle class="w-6 h-6 text-danger-500" />
          </div>
          <p class="text-slate-700 font-medium mb-1">Couldn't load data</p>
          <p class="text-slate-400 text-sm mb-4">{{ (error as Error)?.message || 'Something went wrong' }}</p>
          <button @click="refetch()" class="text-sm text-brand-600 font-medium hover:underline">Try again</button>
        </div>

        <!-- Table -->
        <div v-else class="rounded-lg border border-slate-200 bg-white shadow-sm overflow-x-auto">
          <DataTable
            :columns="tableColumns"
            :data="tableData"
            :loading="isLoading"
            row-key="id"
            :on-row-click="openApplicant"
            empty-title="No pending KYC applications"
            empty-description="All clear — no pending KYC reviews."
          >
            <template #status="{ value }">
              <StatusPill :status="String(value ?? '')" />
            </template>
            <template #kycLevel="{ value }">
              <span
                v-if="value && value !== '—'"
                class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                :class="levelBadgeClass(String(value))"
              >
                {{ value }}
              </span>
              <span v-else class="text-slate-400 text-xs">—</span>
            </template>
            <template #stepsDisplay="{ value }">
              <span class="font-mono text-xs text-slate-600">{{ value }}</span>
            </template>
            <template #pepDisplay="{ value }">
              <span v-if="value" class="text-warning-500 text-base" title="PEP declared">⚠</span>
            </template>
            <template #createdAt="{ value }">
              <span class="text-xs text-slate-500">{{ formatDate(String(value ?? '')) }}</span>
            </template>
          </DataTable>
        </div>
      </div>

      <!-- Side Panel -->
      <SidePanel
        :open="panelOpen"
        :title="selectedApplicant ? `${selectedApplicant.firstName} ${selectedApplicant.lastName}` : 'Applicant Detail'"
        @close="closePanel"
      >
        <div class="space-y-6">
          <!-- Core definition list -->
          <DefinitionList :items="detailItems" :columns="2" />

          <!-- KYC Level + Country Risk summary -->
          <div class="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div>
              <p class="text-xs font-medium text-slate-500 mb-1">KYC Level</p>
              <span
                v-if="selectedApplicant?.levelName"
                class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                :class="levelBadgeClass(selectedApplicant.levelName)"
              >
                {{ selectedApplicant.levelName }}
              </span>
              <span v-else class="text-slate-400 text-xs">—</span>
            </div>
            <div>
              <p class="text-xs font-medium text-slate-500 mb-1">Country Risk</p>
              <p class="text-sm text-slate-700">
                {{ riskEmoji(selectedApplicant?.countryRisk) }}
                <span class="capitalize ml-1">{{ selectedApplicant?.countryRisk ?? '—' }}</span>
              </p>
            </div>
          </div>

          <!-- PEP status -->
          <div class="pt-2 border-t border-slate-100">
            <p class="text-xs font-medium text-slate-500 mb-1">PEP Declaration</p>
            <span
              class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
              :class="selectedApplicant?.pepDeclaration
                ? 'bg-danger-100 text-danger-700'
                : 'bg-slate-100 text-slate-500'"
            >
              {{ selectedApplicant?.pepDeclaration ? 'Declared' : 'Not declared' }}
            </span>
          </div>

          <!-- Steps checklist -->
          <div v-if="requiredStepsList.length > 0" class="pt-2 border-t border-slate-100">
            <h3 class="text-sm font-semibold text-slate-900 mb-3">Steps</h3>
            <ul class="space-y-2">
              <li
                v-for="step in requiredStepsList"
                :key="step.id"
                class="flex items-center gap-2 text-sm"
              >
                <span
                  class="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  :class="completedStepIds.has(step.id)
                    ? 'bg-success-100 text-success-700'
                    : 'bg-slate-100 text-slate-400'"
                >
                  {{ completedStepIds.has(step.id) ? '✓' : '○' }}
                </span>
                <span :class="completedStepIds.has(step.id) ? 'text-slate-800' : 'text-slate-400'">
                  {{ step.label }}
                </span>
              </li>
            </ul>
          </div>

          <!-- Source of funds (Enhanced only) -->
          <div v-if="isEnhanced && (selectedApplicant?.sourceOfFunds || selectedApplicant?.sourceOfFundsRange)" class="pt-2 border-t border-slate-100">
            <h3 class="text-sm font-semibold text-slate-900 mb-3">Source of Funds</h3>
            <div class="space-y-2">
              <div v-if="selectedApplicant?.sourceOfFunds">
                <p class="text-xs font-medium text-slate-500">Source</p>
                <p class="text-sm text-slate-800">{{ selectedApplicant.sourceOfFunds }}</p>
              </div>
              <div v-if="selectedApplicant?.sourceOfFundsRange">
                <p class="text-xs font-medium text-slate-500">Range</p>
                <p class="text-sm text-slate-800">{{ selectedApplicant.sourceOfFundsRange }}</p>
              </div>
            </div>
          </div>
        </div>

        <template #footer>
          <div v-if="canAct" class="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              :disabled="approveMutation.isPending.value"
              @click="selectedApplicant && approveMutation.mutate(selectedApplicant.id)"
            >
              Approve
            </Button>
            <Button
              variant="destructive"
              size="sm"
              :disabled="rejectMutation.isPending.value"
              @click="selectedApplicant && rejectMutation.mutate(selectedApplicant.id)"
            >
              Reject
            </Button>
          </div>
        </template>
      </SidePanel>
    </div>
  </AppLayout>
</template>
