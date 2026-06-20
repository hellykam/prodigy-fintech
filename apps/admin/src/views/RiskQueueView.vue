<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import AppLayout from '../layouts/AppLayout.vue'
import {
  PageHeader,
  DataTable,
  StatusPill,
  SidePanel,
  DefinitionList,
  RiskScore,
  Button,
} from '@prodigy/ui'
import { AlertCircle } from 'lucide-vue-next'
import { apiFetch } from '../composables/useApi'
import { useWebSocket } from '../composables/useWebSocket'

interface RiskReview {
  id: string
  userId: string
  transactionId?: string | null
  riskScore: number
  riskLevel: string
  status: string
  reviewedBy?: string | null
  reviewedAt?: string | null
  notes?: string | null
  createdAt: string
}

interface RiskResponse {
  reviews: RiskReview[]
}

const router = useRouter()
const route = useRoute()
const { events: wsEvents, connected } = useWebSocket()
const queryClient = useQueryClient()

const statusFilter = ref((route.query['status'] as string) ?? '')

// Invalidate risk queue on relevant WS events
watch(wsEvents, (newEvents) => {
  const latest = newEvents[0]
  if (latest && ['RISK_REVIEW_CREATED', 'RISK_REVIEW_RESOLVED'].includes(latest.eventName)) {
    queryClient.invalidateQueries({ queryKey: ['risk-reviews'] })
  }
})

watch(statusFilter, (val) => {
  const q: Record<string, string> = {}
  if (val) q['status'] = val
  router.replace({ query: q })
})

const { data, isLoading, isError, error, refetch } = useQuery({
  queryKey: computed(() => ['risk-reviews', statusFilter.value]),
  queryFn: () => {
    const params = new URLSearchParams()
    if (statusFilter.value) params.set('status', statusFilter.value)
    return apiFetch<RiskResponse>(`/api/risk-reviews?${params.toString()}`)
  },
})

const reviews = computed(() => data.value?.reviews ?? [])

const tableColumns = [
  { key: 'id', header: 'Review ID' },
  { key: 'userId', header: 'User ID' },
  { key: 'riskScore', header: 'Risk Score' },
  { key: 'riskLevel', header: 'Risk Level' },
  { key: 'status', header: 'Status' },
  { key: 'createdAt', header: 'Created At' },
]

const tableData = computed(() =>
  reviews.value.map((r) => ({
    ...r,
    _raw: r,
  })),
)

// Side panel
const selectedReview = ref<RiskReview | null>(null)
const panelOpen = computed(() => selectedReview.value !== null)

function openReview(row: Record<string, unknown>) {
  selectedReview.value = row['_raw'] as RiskReview
  router.replace({ query: { ...route.query, panel: row['id'] as string } })
}

function closePanel() {
  selectedReview.value = null
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

function truncateId(id: string) {
  return id.slice(0, 8) + '…'
}

const detailItems = computed(() => {
  const r = selectedReview.value
  if (!r) return []
  return [
    { label: 'Review ID', value: r.id },
    { label: 'User ID', value: r.userId },
    { label: 'Transaction ID', value: r.transactionId ?? null },
    { label: 'Risk Level', value: r.riskLevel },
    { label: 'Status', value: r.status, type: 'status' as const },
    { label: 'Reviewed By', value: r.reviewedBy ?? null },
    { label: 'Reviewed At', value: formatDate(r.reviewedAt) },
    { label: 'Notes', value: r.notes ?? null },
    { label: 'Created At', value: formatDate(r.createdAt) },
  ]
})

const approveMutation = useMutation({
  mutationFn: (id: string) =>
    apiFetch(`/api/risk-reviews/${id}/approve`, {
      method: 'POST',
      body: JSON.stringify({ reviewedBy: 'admin@prodigy.io' }),
    }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['risk-reviews'] })
    closePanel()
  },
})

const flagMutation = useMutation({
  mutationFn: (id: string) =>
    apiFetch(`/api/risk-reviews/${id}/flag`, {
      method: 'POST',
      body: JSON.stringify({ reviewedBy: 'admin@prodigy.io', notes: 'Flagged for review' }),
    }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['risk-reviews'] })
    closePanel()
  },
})

const canAct = computed(() => {
  const s = selectedReview.value?.status
  return s === 'pending' || s === 'open'
})
</script>

<template>
  <AppLayout :ws-connected="connected">
    <PageHeader
      :breadcrumbs="[{ label: 'Admin', href: '/' }, { label: 'Risk Queue' }]"
      admin-email="admin@prodigy.com"
    />

    <div class="flex h-[calc(100vh-3.5rem)] overflow-hidden">
      <div class="flex-1 overflow-y-auto p-6">
        <div class="mb-4 flex items-center justify-between">
          <div>
            <h1 class="text-xl font-semibold text-slate-900">Risk Queue</h1>
            <p class="mt-0.5 text-sm text-slate-500">{{ reviews.length }} reviews</p>
          </div>
        </div>

        <!-- Filter -->
        <div class="mb-4 flex items-center gap-3">
          <select
            v-model="statusFilter"
            class="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="open">Open</option>
            <option value="approved">Approved</option>
            <option value="flagged">Flagged</option>
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
            :on-row-click="openReview"
            empty-title="No open risk reviews. All clear."
            empty-description="No open risk reviews — queue is clear."
          >
            <template #id="{ value }">
              <span class="font-mono text-xs text-slate-600">{{ truncateId(String(value ?? '')) }}</span>
            </template>
            <template #userId="{ value }">
              <span class="font-mono text-xs text-slate-600">{{ truncateId(String(value ?? '')) }}</span>
            </template>
            <template #riskScore="{ value }">
              <RiskScore :score="Number(value ?? 0)" />
            </template>
            <template #status="{ value }">
              <StatusPill :status="String(value ?? '')" />
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
        :title="selectedReview ? `Review ${truncateId(selectedReview.id)}` : 'Risk Review'"
        @close="closePanel"
      >
        <div class="space-y-6">
          <div v-if="selectedReview" class="mb-4">
            <RiskScore :score="selectedReview.riskScore" />
          </div>
          <DefinitionList :items="detailItems" :columns="2" />
        </div>

        <template #footer>
          <div v-if="canAct" class="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              :disabled="approveMutation.isPending.value"
              @click="selectedReview && approveMutation.mutate(selectedReview.id)"
            >
              Approve
            </Button>
            <Button
              variant="destructive"
              size="sm"
              :disabled="flagMutation.isPending.value"
              @click="selectedReview && flagMutation.mutate(selectedReview.id)"
            >
              Flag
            </Button>
          </div>
        </template>
      </SidePanel>
    </div>
  </AppLayout>
</template>
