<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import AppLayout from '../layouts/AppLayout.vue'
import {
  PageHeader,
  FilterTabs,
  DataTable,
  StatusPill,
  SidePanel,
  DefinitionList,
  MoneyAmount,
  Button,
  Breadcrumb,
} from '@prodigy/ui'
import { AlertCircle } from 'lucide-vue-next'
import { apiFetch } from '../composables/useApi'
import { useWebSocket } from '../composables/useWebSocket'

interface FeeProfile {
  id: string
  type: string
  name: string
  rate: number
  flatFee: number
  minFee: number
  maxFee: number
  currency: string
  status: string
}

interface FeesResponse {
  items: FeeProfile[]
}

interface Limit {
  id: string
  name: string
  type: string
  currency: string
  perTransactionMax: number
  dailyMax: number
  monthlyMax: number
  status: string
}

interface LimitsResponse {
  items: Limit[]
}

const router = useRouter()
const route = useRoute()
const queryClient = useQueryClient()
const { connected } = useWebSocket()

const activeTab = ref((route.query['type'] as string) ?? 'fiat-send')

watch(activeTab, (val) => {
  router.replace({ query: { ...route.query, type: val } })
})

watch(
  () => route.query['type'],
  (val) => {
    if (val && val !== activeTab.value) activeTab.value = val as string
  },
)

const feeTabs = [
  { value: 'fiat-send', label: 'Fiat Send' },
  { value: 'crypto-send', label: 'Crypto Send' },
  { value: 'swap', label: 'Swap' },
]

const { data: feesData, isLoading: feesLoading, isError: feesError, error: feesErrorObj, refetch: refetchFees } = useQuery({
  queryKey: computed(() => ['settings-fees', activeTab.value]),
  queryFn: () => apiFetch<FeesResponse>(`/api/settings/fees?type=${activeTab.value}`),
})

const { data: limitsData, isLoading: limitsLoading, isError: limitsError, error: limitsErrorObj, refetch: refetchLimits } = useQuery({
  queryKey: ['settings-limits'],
  queryFn: () => apiFetch<LimitsResponse>('/api/settings/limits'),
})

const fees = computed(() => feesData.value?.items ?? [])
const limits = computed(() => limitsData.value?.items ?? [])

// Fee columns
const feeColumns = [
  { key: 'name', header: 'Name' },
  { key: 'currency', header: 'Currency' },
  { key: 'rate', header: 'Rate', align: 'right' as const },
  { key: 'flatFee', header: 'Flat Fee', align: 'right' as const },
  { key: 'minFee', header: 'Min Fee', align: 'right' as const },
  { key: 'maxFee', header: 'Max Fee', align: 'right' as const },
  { key: 'status', header: 'Status' },
]

const feeTableData = computed(() =>
  fees.value.map((f) => ({ ...f, _raw: f })),
)

// Limit columns
const limitColumns = [
  { key: 'name', header: 'Name' },
  { key: 'type', header: 'Type' },
  { key: 'currency', header: 'Currency' },
  { key: 'perTransactionMax', header: 'Per-Transaction Max', align: 'right' as const },
  { key: 'dailyMax', header: 'Daily Max', align: 'right' as const },
  { key: 'monthlyMax', header: 'Monthly Max', align: 'right' as const },
  { key: 'status', header: 'Status' },
]

const limitTableData = computed(() =>
  limits.value.map((l) => ({ ...l, _raw: l })),
)

// --- Fee side panel ---
const selectedFee = ref<FeeProfile | null>(null)
const feePanelOpen = computed(() => selectedFee.value !== null)
const editRate = ref('')
const editFlatFee = ref('')
const feeErrors = ref<{ rate?: string; flatFee?: string }>({})
const feeError = ref('')
const feeSuccessMsg = ref(false)
let feeSuccessTimer: ReturnType<typeof setTimeout> | null = null

function validateFeeRate(): boolean {
  const raw = editRate.value.trim()
  if (raw === '') { feeErrors.value = { ...feeErrors.value, rate: 'Enter a valid number' }; return false }
  const val = parseFloat(raw)
  if (isNaN(val)) { feeErrors.value = { ...feeErrors.value, rate: 'Enter a valid number' }; return false }
  if (val < 0 || val > 100) { feeErrors.value = { ...feeErrors.value, rate: 'Rate must be between 0% and 100%' }; return false }
  const decimalPart = raw.includes('.') ? raw.split('.')[1] ?? '' : ''
  if (decimalPart.length > 2) { feeErrors.value = { ...feeErrors.value, rate: 'Rate must be between 0% and 100%' }; return false }
  const { rate: _r, ...rest } = feeErrors.value
  feeErrors.value = rest
  return true
}

function validateFlatFee(): boolean {
  const raw = editFlatFee.value.trim()
  if (raw === '') { feeErrors.value = { ...feeErrors.value, flatFee: 'Must be a positive number' }; return false }
  const val = parseFloat(raw)
  if (isNaN(val) || val < 0) { feeErrors.value = { ...feeErrors.value, flatFee: 'Must be a positive number' }; return false }
  const { flatFee: _f, ...rest } = feeErrors.value
  feeErrors.value = rest
  return true
}

const feeFormValid = computed(
  () => Object.keys(feeErrors.value).length === 0 && editRate.value.trim() !== '' && editFlatFee.value.trim() !== '',
)

function openFeePanel(row: Record<string, unknown>) {
  selectedFee.value = row['_raw'] as FeeProfile
  editRate.value = String(selectedFee.value.rate)
  editFlatFee.value = String(selectedFee.value.flatFee)
  feeErrors.value = {}
  feeError.value = ''
  router.replace({ query: { ...route.query, panel: `edit-fee-${selectedFee.value.id}` } })
}

function closeFeepanel() {
  selectedFee.value = null
  const q = { ...route.query }
  delete q['panel']
  router.replace({ query: q })
}

const feeMutation = useMutation({
  mutationFn: ({ id, body }: { id: string; body: { rate?: number; flatFee?: number } }) =>
    apiFetch<FeeProfile>(`/api/settings/fees/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['settings-fees', activeTab.value] })
    closeFeepanel()
    feeSuccessMsg.value = true
    if (feeSuccessTimer) clearTimeout(feeSuccessTimer)
    feeSuccessTimer = setTimeout(() => { feeSuccessMsg.value = false }, 2000)
  },
  onError: (err: Error) => {
    feeError.value = err.message
  },
})

function saveFee() {
  const fee = selectedFee.value
  if (!fee) return
  const rateValid = validateFeeRate()
  const flatFeeValid = validateFlatFee()
  if (!rateValid || !flatFeeValid) return
  feeError.value = ''
  const rate = parseFloat(editRate.value)
  const flatFee = parseFloat(editFlatFee.value)
  feeMutation.mutate({ id: fee.id, body: { rate, flatFee } })
}

const feeDetailItems = computed(() => {
  const f = selectedFee.value
  if (!f) return []
  return [
    { label: 'ID', value: f.id },
    { label: 'Name', value: f.name },
    { label: 'Type', value: f.type },
    { label: 'Currency', value: f.currency },
    { label: 'Rate', value: `${(f.rate * 100).toFixed(4)}%` },
    { label: 'Flat Fee', value: f.flatFee, type: 'money' as const, currency: f.currency },
    { label: 'Min Fee', value: f.minFee, type: 'money' as const, currency: f.currency },
    { label: 'Max Fee', value: f.maxFee, type: 'money' as const, currency: f.currency },
    { label: 'Status', value: f.status, type: 'status' as const },
  ]
})

// --- Limit side panel ---
const selectedLimit = ref<Limit | null>(null)
const limitPanelOpen = computed(() => selectedLimit.value !== null)
const editDailyMax = ref('')
const editMonthlyMax = ref('')
const limitErrors = ref<{ dailyMax?: string; monthlyMax?: string }>({})
const limitError = ref('')
const limitSuccessMsg = ref(false)
let limitSuccessTimer: ReturnType<typeof setTimeout> | null = null

function validateDailyMax(): boolean {
  const val = parseFloat(editDailyMax.value)
  if (isNaN(val) || val <= 0) { limitErrors.value = { ...limitErrors.value, dailyMax: 'Must be greater than 0' }; return false }
  const { dailyMax: _d, ...rest } = limitErrors.value
  limitErrors.value = rest
  return true
}

function validateMonthlyMax(): boolean {
  const monthly = parseFloat(editMonthlyMax.value)
  if (isNaN(monthly) || monthly <= 0) { limitErrors.value = { ...limitErrors.value, monthlyMax: 'Must be greater than 0' }; return false }
  const daily = parseFloat(editDailyMax.value)
  if (!isNaN(daily) && daily > 0 && monthly < daily * 28) {
    limitErrors.value = { ...limitErrors.value, monthlyMax: 'Monthly max must be at least 28× the daily limit' }
    return false
  }
  const { monthlyMax: _m, ...rest } = limitErrors.value
  limitErrors.value = rest
  return true
}

const limitFormValid = computed(
  () => Object.keys(limitErrors.value).length === 0 && editDailyMax.value.trim() !== '' && editMonthlyMax.value.trim() !== '',
)

function openLimitPanel(row: Record<string, unknown>) {
  selectedLimit.value = row['_raw'] as Limit
  editDailyMax.value = String(selectedLimit.value.dailyMax)
  editMonthlyMax.value = String(selectedLimit.value.monthlyMax)
  limitErrors.value = {}
  limitError.value = ''
  router.replace({ query: { ...route.query, panel: `edit-limit-${selectedLimit.value.id}` } })
}

function closeLimitPanel() {
  selectedLimit.value = null
  const q = { ...route.query }
  delete q['panel']
  router.replace({ query: q })
}

const limitMutation = useMutation({
  mutationFn: ({ id, body }: { id: string; body: { dailyMax?: number; monthlyMax?: number } }) =>
    apiFetch<Limit>(`/api/settings/limits/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['settings-limits'] })
    closeLimitPanel()
    limitSuccessMsg.value = true
    if (limitSuccessTimer) clearTimeout(limitSuccessTimer)
    limitSuccessTimer = setTimeout(() => { limitSuccessMsg.value = false }, 2000)
  },
  onError: (err: Error) => {
    limitError.value = err.message
  },
})

function saveLimit() {
  const limit = selectedLimit.value
  if (!limit) return
  const dailyValid = validateDailyMax()
  const monthlyValid = validateMonthlyMax()
  if (!dailyValid || !monthlyValid) return
  limitError.value = ''
  const dailyMax = parseFloat(editDailyMax.value)
  const monthlyMax = parseFloat(editMonthlyMax.value)
  limitMutation.mutate({ id: limit.id, body: { dailyMax, monthlyMax } })
}

const limitDetailItems = computed(() => {
  const l = selectedLimit.value
  if (!l) return []
  return [
    { label: 'ID', value: l.id },
    { label: 'Name', value: l.name },
    { label: 'Type', value: l.type },
    { label: 'Currency', value: l.currency },
    { label: 'Per-Transaction Max', value: l.perTransactionMax, type: 'money' as const, currency: l.currency },
    { label: 'Daily Max', value: l.dailyMax, type: 'money' as const, currency: l.currency },
    { label: 'Monthly Max', value: l.monthlyMax, type: 'money' as const, currency: l.currency },
    { label: 'Status', value: l.status, type: 'status' as const },
  ]
})

function formatRate(rate: number) {
  return `${(rate * 100).toFixed(2)}%`
}

function formatMoney(amount: number, currency: string) {
  return `${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })} ${currency}`
}
</script>

<template>
  <AppLayout :ws-connected="connected">
    <PageHeader
      :breadcrumbs="[
        { label: 'Admin', href: '/' },
        { label: 'Settings', href: '/settings' },
        { label: 'Fees' },
      ]"
      admin-email="admin@prodigy.com"
    />

    <div class="flex h-[calc(100vh-3.5rem)] overflow-hidden">
      <div class="flex-1 overflow-y-auto p-6">
        <Breadcrumb :items="[{ label: 'Settings', href: '/settings' }, { label: 'Fees' }]" class="mb-4" />

        <!-- Fees section -->
        <div class="mb-6">
          <div class="flex items-center gap-3 mb-4">
            <h1 class="text-2xl font-bold text-slate-900">Fee Profiles</h1>
            <span v-if="feeSuccessMsg" class="text-sm text-success-600 font-medium">Fee updated ✓</span>
          </div>

          <div class="mb-4">
            <FilterTabs
              v-model="activeTab"
              :tabs="feeTabs"
              query-key="type"
            />
          </div>

          <div v-if="feesError" class="flex flex-col items-center py-16 text-center">
            <div class="w-12 h-12 rounded-full bg-danger-50 flex items-center justify-center mb-4">
              <AlertCircle class="w-6 h-6 text-danger-500" />
            </div>
            <p class="text-slate-700 font-medium mb-1">Couldn't load data</p>
            <p class="text-slate-400 text-sm mb-4">{{ (feesErrorObj as Error)?.message || 'Something went wrong' }}</p>
            <button @click="refetchFees()" class="text-sm text-brand-600 font-medium hover:underline">Try again</button>
          </div>

          <div v-else class="rounded-lg border border-slate-200 bg-white shadow-sm overflow-x-auto">
            <DataTable
              :columns="feeColumns"
              :data="feeTableData"
              :loading="feesLoading"
              row-key="id"
              :on-row-click="openFeePanel"
              empty-title="No fee profiles"
              empty-description="No fee profiles found for this type."
            >
              <template #rate="{ value }">
                <span class="font-mono text-xs text-slate-700">{{ formatRate(Number(value ?? 0)) }}</span>
              </template>
              <template #flatFee="{ row }">
                <MoneyAmount :amount="Number(row['flatFee'] ?? 0)" :currency="String(row['currency'] ?? 'EUR')" size="sm" />
              </template>
              <template #minFee="{ row }">
                <MoneyAmount :amount="Number(row['minFee'] ?? 0)" :currency="String(row['currency'] ?? 'EUR')" size="sm" />
              </template>
              <template #maxFee="{ row }">
                <MoneyAmount :amount="Number(row['maxFee'] ?? 0)" :currency="String(row['currency'] ?? 'EUR')" size="sm" />
              </template>
              <template #status="{ value }">
                <StatusPill :status="String(value ?? '')" />
              </template>
            </DataTable>
          </div>
        </div>

        <!-- Daily Limits section -->
        <div>
          <h2 class="text-base font-semibold text-slate-800 mb-4">Daily Limits</h2>

          <div v-if="limitsError" class="flex flex-col items-center py-16 text-center">
            <div class="w-12 h-12 rounded-full bg-danger-50 flex items-center justify-center mb-4">
              <AlertCircle class="w-6 h-6 text-danger-500" />
            </div>
            <p class="text-slate-700 font-medium mb-1">Couldn't load data</p>
            <p class="text-slate-400 text-sm mb-4">{{ (limitsErrorObj as Error)?.message || 'Something went wrong' }}</p>
            <button @click="refetchLimits()" class="text-sm text-brand-600 font-medium hover:underline">Try again</button>
          </div>

          <div v-else class="rounded-lg border border-slate-200 bg-white shadow-sm overflow-x-auto">
            <DataTable
              :columns="limitColumns"
              :data="limitTableData"
              :loading="limitsLoading"
              row-key="id"
              :on-row-click="openLimitPanel"
              empty-title="No limits"
              empty-description="No transaction limits found."
            >
              <template #perTransactionMax="{ row }">
                <MoneyAmount :amount="Number(row['perTransactionMax'] ?? 0)" :currency="String(row['currency'] ?? 'EUR')" size="sm" />
              </template>
              <template #dailyMax="{ row }">
                <MoneyAmount :amount="Number(row['dailyMax'] ?? 0)" :currency="String(row['currency'] ?? 'EUR')" size="sm" />
              </template>
              <template #monthlyMax="{ row }">
                <MoneyAmount :amount="Number(row['monthlyMax'] ?? 0)" :currency="String(row['currency'] ?? 'EUR')" size="sm" />
              </template>
              <template #status="{ value }">
                <StatusPill :status="String(value ?? '')" />
              </template>
            </DataTable>
          </div>
        </div>
      </div>

      <!-- Fee edit side panel -->
      <SidePanel
        :open="feePanelOpen"
        :title="selectedFee ? `Edit Fee — ${selectedFee.name}` : 'Fee Details'"
        width="480"
        @close="closeFeepanel"
      >
        <div class="space-y-5">
          <DefinitionList :items="feeDetailItems" :columns="2" />

          <div class="border-t border-slate-200 pt-4 space-y-4">
            <h3 class="text-sm font-semibold text-slate-900">Edit Fee</h3>

            <div class="space-y-3">
              <div>
                <label class="block text-xs font-medium text-slate-700 mb-1">Rate (0–100, max 2 decimal places)</label>
                <input
                  v-model="editRate"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  :class="['h-9 w-full rounded-md border px-3 text-sm text-slate-900 focus:outline-none focus:ring-2',
                    feeErrors.rate ? 'border-danger-500 ring-1 ring-danger-500 focus:ring-danger-500' : 'border-slate-300 focus:ring-brand-500']"
                  @blur="validateFeeRate"
                />
                <p v-if="feeErrors.rate" class="mt-1 text-xs text-danger-600">{{ feeErrors.rate }}</p>
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-700 mb-1">
                  Flat Fee ({{ selectedFee?.currency ?? 'EUR' }})
                </label>
                <input
                  v-model="editFlatFee"
                  type="number"
                  step="0.01"
                  min="0"
                  :class="['h-9 w-full rounded-md border px-3 text-sm text-slate-900 focus:outline-none focus:ring-2',
                    feeErrors.flatFee ? 'border-danger-500 ring-1 ring-danger-500 focus:ring-danger-500' : 'border-slate-300 focus:ring-brand-500']"
                  @blur="validateFlatFee"
                />
                <p v-if="feeErrors.flatFee" class="mt-1 text-xs text-danger-600">{{ feeErrors.flatFee }}</p>
              </div>
            </div>

            <p v-if="feeError" class="text-xs text-danger-600">{{ feeError }}</p>
          </div>
        </div>

        <template #footer>
          <div class="flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              :disabled="!feeFormValid"
              :loading="feeMutation.isPending.value"
              @click="saveFee"
            >
              Save
            </Button>
            <Button variant="ghost" size="sm" @click="closeFeepanel">Cancel</Button>
          </div>
        </template>
      </SidePanel>

      <!-- Limit edit side panel -->
      <SidePanel
        :open="limitPanelOpen"
        :title="selectedLimit ? `Edit Limit — ${selectedLimit.name}` : 'Limit Details'"
        width="480"
        @close="closeLimitPanel"
      >
        <div class="space-y-5">
          <DefinitionList :items="limitDetailItems" :columns="2" />

          <div class="border-t border-slate-200 pt-4 space-y-4">
            <h3 class="text-sm font-semibold text-slate-900">Edit Limits</h3>

            <div class="space-y-3">
              <div>
                <label class="block text-xs font-medium text-slate-700 mb-1">
                  Daily Max ({{ selectedLimit?.currency ?? 'EUR' }})
                </label>
                <input
                  v-model="editDailyMax"
                  type="number"
                  step="0.01"
                  min="0"
                  :class="['h-9 w-full rounded-md border px-3 text-sm text-slate-900 focus:outline-none focus:ring-2',
                    limitErrors.dailyMax ? 'border-danger-500 ring-1 ring-danger-500 focus:ring-danger-500' : 'border-slate-300 focus:ring-brand-500']"
                  @blur="validateDailyMax"
                />
                <p v-if="limitErrors.dailyMax" class="mt-1 text-xs text-danger-600">{{ limitErrors.dailyMax }}</p>
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-700 mb-1">
                  Monthly Max ({{ selectedLimit?.currency ?? 'EUR' }})
                </label>
                <input
                  v-model="editMonthlyMax"
                  type="number"
                  step="0.01"
                  min="0"
                  :class="['h-9 w-full rounded-md border px-3 text-sm text-slate-900 focus:outline-none focus:ring-2',
                    limitErrors.monthlyMax ? 'border-danger-500 ring-1 ring-danger-500 focus:ring-danger-500' : 'border-slate-300 focus:ring-brand-500']"
                  @blur="validateMonthlyMax"
                />
                <p v-if="limitErrors.monthlyMax" class="mt-1 text-xs text-danger-600">{{ limitErrors.monthlyMax }}</p>
              </div>
            </div>

            <p v-if="limitError" class="text-xs text-danger-600">{{ limitError }}</p>
          </div>
        </div>

        <template #footer>
          <div class="flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              :disabled="!limitFormValid"
              :loading="limitMutation.isPending.value"
              @click="saveLimit"
            >
              Save
            </Button>
            <Button variant="ghost" size="sm" @click="closeLimitPanel">Cancel</Button>
          </div>
        </template>
      </SidePanel>
    </div>
  </AppLayout>
</template>
