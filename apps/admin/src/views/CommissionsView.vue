<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import AppLayout from '../layouts/AppLayout.vue'
import {
  PageHeader,
  DataTable,
  StatusPill,
  SidePanel,
  DefinitionList,
  MoneyAmount,
} from '@prodigy/ui'
import { AlertCircle } from 'lucide-vue-next'
import { apiFetch } from '../composables/useApi'
import { useWebSocket } from '../composables/useWebSocket'

interface PartnerCommission {
  id: string
  b2bClientId: string
  transactionId: string
  // API may return either shape; support both
  amount?: number
  currency?: string
  grossAmount?: number
  commissionRate?: number
  commissionAmount?: number
  status: string
  createdAt: string
  transaction?: {
    id: string
    sourceCurrency: string
  }
}

interface CommissionsResponse {
  items: PartnerCommission[]
  total?: number
}

const router = useRouter()
const route = useRoute()
const { connected } = useWebSocket()

const statusFilter = ref((route.query['status'] as string) ?? '')
const partnerFilter = ref((route.query['b2bClientId'] as string) ?? '')

watch([statusFilter, partnerFilter], ([status, partner]) => {
  const q: Record<string, string> = {}
  if (status) q['status'] = status
  if (partner) q['b2bClientId'] = partner
  router.replace({ query: q })
})

const queryParams = computed(() => {
  const params = new URLSearchParams()
  if (statusFilter.value) params.set('status', statusFilter.value)
  return params.toString()
})

const { data, isLoading, isError, error, refetch } = useQuery({
  queryKey: computed(() => ['partner-commissions', statusFilter.value]),
  queryFn: () => apiFetch<CommissionsResponse>(`/api/partner-commissions?${queryParams.value}`),
})

const allCommissions = computed(() => data.value?.items ?? [])
const total = computed(() => data.value?.total ?? allCommissions.value.length)

// Unique b2bClientIds for the partner filter dropdown
const uniquePartners = computed(() => {
  const ids = new Set(allCommissions.value.map((c) => c.b2bClientId))
  return Array.from(ids).sort()
})

// Client-side filter by b2bClientId
const commissions = computed(() => {
  if (!partnerFilter.value) return allCommissions.value
  return allCommissions.value.filter((c) => c.b2bClientId === partnerFilter.value)
})

const tableColumns = [
  { key: 'id', header: 'Commission ID' },
  { key: 'b2bClientId', header: 'B2B Client' },
  { key: 'transactionId', header: 'Transaction ID' },
  { key: '_amount', header: 'Amount', align: 'right' as const },
  { key: 'status', header: 'Status' },
  { key: 'createdAt', header: 'Date' },
]

const tableData = computed(() =>
  commissions.value.map((c) => ({
    ...c,
    // Normalise amount: use `amount` if present, fall back to commissionAmount
    _amount: c.amount ?? c.commissionAmount ?? 0,
    _currency: c.currency ?? 'EUR',
    _raw: c,
  })),
)

// Side panel
const selectedCommission = ref<PartnerCommission | null>(null)
const panelOpen = computed(() => selectedCommission.value !== null)

function openCommission(row: Record<string, unknown>) {
  selectedCommission.value = row['_raw'] as PartnerCommission
  router.replace({ query: { ...route.query, panel: row['id'] as string } })
}

function closePanel() {
  selectedCommission.value = null
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

function formatRate(rate: number) {
  return `${(rate * 100).toFixed(2)}%`
}

const detailItems = computed(() => {
  const c = selectedCommission.value
  if (!c) return []
  const currency = c.currency ?? 'EUR'
  const amount = c.amount ?? c.commissionAmount ?? 0
  const items: Array<{ label: string; value: string | number | null | undefined; type?: 'money' | 'status'; currency?: string }> = [
    { label: 'Commission ID', value: c.id },
    { label: 'B2B Client ID', value: c.b2bClientId },
    { label: 'Transaction ID', value: c.transactionId },
    { label: 'Amount', value: amount, type: 'money', currency },
    { label: 'Status', value: c.status, type: 'status' },
    { label: 'Date', value: formatDate(c.createdAt) },
  ]
  if (c.grossAmount !== undefined) {
    items.splice(3, 0, { label: 'Gross Amount', value: c.grossAmount, type: 'money', currency })
  }
  if (c.commissionRate !== undefined) {
    items.splice(4, 0, { label: 'Commission Rate', value: formatRate(c.commissionRate) })
  }
  return items
})
</script>

<template>
  <AppLayout :ws-connected="connected">
    <PageHeader
      :breadcrumbs="[{ label: 'Admin', href: '/' }, { label: 'Commissions' }]"
      admin-email="admin@prodigy.com"
    />

    <div class="flex h-[calc(100vh-3.5rem)] overflow-hidden">
      <div class="flex-1 overflow-y-auto p-6">
        <div class="mb-4 flex items-center justify-between">
          <div>
            <h1 class="text-xl font-semibold text-slate-900">Partner Commissions</h1>
            <p class="mt-0.5 text-sm text-slate-500">{{ total.toLocaleString() }} total</p>
          </div>
        </div>

        <!-- Filters -->
        <div class="mb-4 flex flex-wrap items-center gap-3">
          <!-- Partner filter (client-side) -->
          <select
            v-model="partnerFilter"
            class="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="">All Partners</option>
            <option v-for="pid in uniquePartners" :key="pid" :value="pid">
              {{ pid }}
            </option>
          </select>
          <!-- Status filter -->
          <select
            v-model="statusFilter"
            class="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="settled">Settled</option>
            <option value="accrued">Accrued</option>
            <option value="payable">Payable</option>
            <option value="paid">Paid</option>
            <option value="cancelled">Cancelled</option>
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
            :on-row-click="openCommission"
            empty-title="No commissions yet"
            empty-description="No partner commissions found."
          >
            <template #id="{ value }">
              <span class="font-mono text-xs text-slate-600">{{ truncateId(String(value ?? '')) }}</span>
            </template>
            <template #b2bClientId="{ value }">
              <span class="font-mono text-xs text-slate-600">{{ truncateId(String(value ?? '')) }}</span>
            </template>
            <template #transactionId="{ value }">
              <span class="font-mono text-xs text-slate-600">{{ truncateId(String(value ?? '')) }}</span>
            </template>
            <template #_amount="{ row }">
              <MoneyAmount :amount="Number(row['_amount'] ?? 0)" :currency="String(row['_currency'] ?? 'EUR')" size="sm" />
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
        :title="selectedCommission ? `Commission ${truncateId(selectedCommission.id)}` : 'Commission Detail'"
        @close="closePanel"
      >
        <DefinitionList :items="detailItems" :columns="2" />
      </SidePanel>
    </div>
  </AppLayout>
</template>
