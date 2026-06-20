<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import AppLayout from '../layouts/AppLayout.vue'
import { PageHeader, DataTable, StatusPill, SidePanel, DefinitionList } from '@prodigy/ui'
import { apiFetch } from '../composables/useApi'
import { useWebSocket } from '../composables/useWebSocket'

interface BankAccount {
  id: string
  iban: string
  currency: string
  status: string
}

interface Transaction {
  id: string
  sourceCurrency: string
  sourceAmount: number
  targetCurrency: string
  targetAmount: number
  status: string
  createdAt: string
}

interface User {
  id: string
  email: string
  status: string
  kycStatus: string
  riskLevel: string
  createdAt: string
  updatedAt?: string
  bankAccounts?: BankAccount[]
  transactions?: Transaction[]
}

interface UsersResponse {
  items: User[]
  total: number
}

const router = useRouter()
const route = useRoute()
const queryClient = useQueryClient()
const { events: wsEvents, connected } = useWebSocket()

// Invalidate customer list on USER_* events
watch(wsEvents, (newEvents) => {
  const latest = newEvents[0]
  if (
    latest &&
    ['USER_CREATED', 'USER_UPDATED', 'USER_KYC_STATUS_CHANGED', 'KYC_APPROVED', 'KYC_REJECTED'].includes(latest.eventName)
  ) {
    queryClient.invalidateQueries({ queryKey: ['users'] })
  }
})

const kycStatusFilter = ref((route.query['kycStatus'] as string) ?? '')
const search = ref((route.query['search'] as string) ?? '')

watch([kycStatusFilter, search], () => {
  const q: Record<string, string> = {}
  if (kycStatusFilter.value) q['kycStatus'] = kycStatusFilter.value
  if (search.value) q['search'] = search.value
  router.replace({ query: q })
})

const queryParams = computed(() => {
  const params = new URLSearchParams()
  params.set('limit', '50')
  params.set('offset', '0')
  if (kycStatusFilter.value) params.set('kycStatus', kycStatusFilter.value)
  return params.toString()
})

const { data, isLoading } = useQuery({
  queryKey: computed(() => ['users', kycStatusFilter.value]),
  queryFn: () => apiFetch<UsersResponse>(`/api/users?${queryParams.value}`),
})

const allUsers = computed(() => data.value?.items ?? [])
const total = computed(() => data.value?.total ?? 0)

const filteredUsers = computed(() => {
  if (!search.value) return allUsers.value
  const q = search.value.toLowerCase()
  return allUsers.value.filter(
    (u) => u.email.toLowerCase().includes(q) || u.id.toLowerCase().includes(q),
  )
})

const tableColumns = [
  { key: 'id', header: 'User ID' },
  { key: 'email', header: 'Email' },
  { key: 'kycStatus', header: 'KYC Status' },
  { key: 'riskLevel', header: 'Risk Level' },
  { key: 'status', header: 'Status' },
  { key: 'createdAt', header: 'Created At' },
]

const tableData = computed(() =>
  filteredUsers.value.map((u) => ({
    ...u,
    _raw: u,
  })),
)

// Side panel
const selectedUser = ref<User | null>(null)
const panelOpen = computed(() => selectedUser.value !== null)

const { data: userDetail, isLoading: detailLoading } = useQuery({
  queryKey: computed(() => ['user-detail', selectedUser.value?.id]),
  queryFn: () =>
    selectedUser.value
      ? apiFetch<User>(`/api/users/${selectedUser.value.id}`)
      : Promise.resolve(null),
  enabled: computed(() => !!selectedUser.value?.id),
})

function openUser(row: Record<string, unknown>) {
  const id = row['id']
  if (typeof id === 'string') {
    selectedUser.value = row['_raw'] as User
    router.replace({ query: { ...route.query, panel: id } })
  }
}

function closePanel() {
  selectedUser.value = null
  const q = { ...route.query }
  delete q['panel']
  router.replace({ query: q })
}

function formatDate(ts: string) {
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
  const u = userDetail.value ?? selectedUser.value
  if (!u) return []
  return [
    { label: 'Email', value: u.email },
    { label: 'Status', value: u.status, type: 'status' as const },
    { label: 'KYC Status', value: u.kycStatus, type: 'status' as const },
    { label: 'Risk Level', value: u.riskLevel },
    { label: 'Created At', value: u.createdAt ? formatDate(u.createdAt) : null },
    { label: 'Updated At', value: u.updatedAt ? formatDate(u.updatedAt) : null },
  ]
})

const bankAccounts = computed(() => userDetail.value?.bankAccounts ?? [])
const lastTransactions = computed(() => (userDetail.value?.transactions ?? []).slice(0, 3))
</script>

<template>
  <AppLayout :ws-connected="connected">
    <PageHeader
      :breadcrumbs="[{ label: 'Admin', href: '/' }, { label: 'Customers' }]"
      admin-email="admin@prodigy.com"
    />

    <div class="flex h-[calc(100vh-3.5rem)] overflow-hidden">
      <!-- Main table area -->
      <div class="flex-1 overflow-y-auto p-6">
        <!-- Title row -->
        <div class="mb-4 flex items-center justify-between">
          <div>
            <h1 class="text-xl font-semibold text-slate-900">Customers</h1>
            <p class="mt-0.5 text-sm text-slate-500">{{ total.toLocaleString() }} total</p>
          </div>
        </div>

        <!-- FilterBar (inline) -->
        <div class="mb-4 flex flex-wrap items-center gap-3">
          <input
            v-model="search"
            type="search"
            placeholder="Search by email or ID…"
            class="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <select
            v-model="kycStatusFilter"
            class="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="">All KYC Statuses</option>
            <option value="not_started">Not Started</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="manual_review">Manual Review</option>
          </select>
        </div>

        <!-- DataTable -->
        <div class="rounded-lg border border-slate-200 bg-white shadow-sm overflow-x-auto">
          <DataTable
            :columns="tableColumns"
            :data="tableData"
            :loading="isLoading"
            row-key="id"
            :on-row-click="openUser"
            empty-title="No customers found"
            empty-description="No records match your current filters."
          >
            <template #id="{ value }">
              <span class="font-mono text-xs text-slate-600">{{ truncateId(String(value ?? '')) }}</span>
            </template>
            <template #kycStatus="{ value }">
              <StatusPill :status="String(value ?? '')" />
            </template>
            <template #status="{ value }">
              <StatusPill :status="String(value ?? '')" />
            </template>
            <template #riskLevel="{ value }">
              <span
                class="text-sm font-medium"
                :class="{
                  'text-success-600': value === 'low',
                  'text-warning-600': value === 'medium',
                  'text-danger-600': value === 'high',
                  'text-slate-500': value !== 'low' && value !== 'medium' && value !== 'high',
                }"
              >
                {{ value ?? '—' }}
              </span>
            </template>
            <template #createdAt="{ value }">
              <span class="text-xs text-slate-500">{{ value ? formatDate(String(value)) : '—' }}</span>
            </template>
          </DataTable>
        </div>
      </div>

      <!-- Side Panel -->
      <SidePanel
        :open="panelOpen"
        :title="selectedUser ? selectedUser.email : 'Customer Detail'"
        :loading="detailLoading"
        @close="closePanel"
      >
        <div class="space-y-6">
          <DefinitionList :items="detailItems" :columns="2" />

          <!-- Bank Accounts -->
          <div v-if="bankAccounts.length > 0">
            <h3 class="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Bank Accounts
            </h3>
            <div class="space-y-2">
              <div
                v-for="acct in bankAccounts"
                :key="acct.id"
                class="rounded-md border border-slate-200 p-3 text-sm"
              >
                <p class="font-mono text-xs text-slate-700">{{ acct.iban }}</p>
                <p class="text-xs text-slate-500">{{ acct.currency }} · {{ acct.status }}</p>
              </div>
            </div>
          </div>

          <!-- Last 3 transactions -->
          <div v-if="lastTransactions.length > 0">
            <h3 class="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Last Transactions
            </h3>
            <div class="space-y-2">
              <div
                v-for="tx in lastTransactions"
                :key="tx.id"
                class="flex items-center justify-between rounded-md border border-slate-200 p-3"
              >
                <div>
                  <p class="font-mono text-xs text-slate-700">{{ truncateId(tx.id) }}</p>
                  <p class="text-xs text-slate-500">
                    {{ tx.sourceCurrency }} → {{ tx.targetCurrency }}
                  </p>
                </div>
                <StatusPill :status="tx.status" />
              </div>
            </div>
          </div>

          <!-- View Activity link -->
          <div class="border-t border-slate-100 pt-4">
            <button
              class="inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-brand-300 px-4 py-2 text-sm font-medium text-brand-700 transition-colors hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1"
              @click="selectedUser && router.push(`/customers/${selectedUser.id}/activity`)"
            >
              View Activity →
            </button>
          </div>
        </div>
      </SidePanel>
    </div>
  </AppLayout>
</template>
