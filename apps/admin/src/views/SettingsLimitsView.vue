<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import AppLayout from '../layouts/AppLayout.vue'
import {
  PageHeader,
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

const { data, isLoading, isError, error, refetch } = useQuery({
  queryKey: ['settings-limits'],
  queryFn: () => apiFetch<LimitsResponse>('/api/settings/limits'),
})

const limits = computed(() => data.value?.items ?? [])

const tableColumns = [
  { key: 'name', header: 'Name' },
  { key: 'type', header: 'Type' },
  { key: 'currency', header: 'Currency' },
  { key: 'perTransactionMax', header: 'Per-Transaction Max', align: 'right' as const },
  { key: 'dailyMax', header: 'Daily Max', align: 'right' as const },
  { key: 'monthlyMax', header: 'Monthly Max', align: 'right' as const },
  { key: 'status', header: 'Status' },
]

const tableData = computed(() =>
  limits.value.map((l) => ({ ...l, _raw: l })),
)

const selectedLimit = ref<Limit | null>(null)
const panelOpen = computed(() => selectedLimit.value !== null)
const editDailyMax = ref('')
const editMonthlyMax = ref('')
const fieldErrors = ref<{ dailyMax?: string; monthlyMax?: string }>({})
const saveError = ref('')
const saveSuccessMsg = ref(false)
let saveSuccessTimer: ReturnType<typeof setTimeout> | null = null

function validateDailyMax(): boolean {
  const val = parseFloat(editDailyMax.value)
  if (isNaN(val) || val <= 0) {
    fieldErrors.value = { ...fieldErrors.value, dailyMax: 'Must be greater than 0' }
    return false
  }
  const { dailyMax: _d, ...rest } = fieldErrors.value
  fieldErrors.value = rest
  return true
}

function validateMonthlyMax(): boolean {
  const monthly = parseFloat(editMonthlyMax.value)
  if (isNaN(monthly) || monthly <= 0) {
    fieldErrors.value = { ...fieldErrors.value, monthlyMax: 'Must be greater than 0' }
    return false
  }
  const daily = parseFloat(editDailyMax.value)
  if (!isNaN(daily) && daily > 0 && monthly < daily * 28) {
    fieldErrors.value = { ...fieldErrors.value, monthlyMax: 'Monthly max must be at least 28× the daily limit' }
    return false
  }
  const { monthlyMax: _m, ...rest } = fieldErrors.value
  fieldErrors.value = rest
  return true
}

const formValid = computed(
  () => Object.keys(fieldErrors.value).length === 0 && editDailyMax.value.trim() !== '' && editMonthlyMax.value.trim() !== '',
)

function openPanel(row: Record<string, unknown>) {
  selectedLimit.value = row['_raw'] as Limit
  editDailyMax.value = String(selectedLimit.value.dailyMax)
  editMonthlyMax.value = String(selectedLimit.value.monthlyMax)
  fieldErrors.value = {}
  saveError.value = ''
  router.replace({ query: { ...route.query, panel: `edit-limit-${selectedLimit.value.id}` } })
}

function closePanel() {
  selectedLimit.value = null
  const q = { ...route.query }
  delete q['panel']
  router.replace({ query: q })
}

const mutation = useMutation({
  mutationFn: ({ id, body }: { id: string; body: { dailyMax?: number; monthlyMax?: number } }) =>
    apiFetch<Limit>(`/api/settings/limits/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['settings-limits'] })
    closePanel()
    saveSuccessMsg.value = true
    if (saveSuccessTimer) clearTimeout(saveSuccessTimer)
    saveSuccessTimer = setTimeout(() => { saveSuccessMsg.value = false }, 2000)
  },
  onError: (err: Error) => {
    saveError.value = err.message
  },
})

function save() {
  const limit = selectedLimit.value
  if (!limit) return
  const dailyValid = validateDailyMax()
  const monthlyValid = validateMonthlyMax()
  if (!dailyValid || !monthlyValid) return
  saveError.value = ''
  const dailyMax = parseFloat(editDailyMax.value)
  const monthlyMax = parseFloat(editMonthlyMax.value)
  mutation.mutate({ id: limit.id, body: { dailyMax, monthlyMax } })
}

const detailItems = computed(() => {
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
</script>

<template>
  <AppLayout :ws-connected="connected">
    <PageHeader
      :breadcrumbs="[
        { label: 'Admin', href: '/' },
        { label: 'Settings', href: '/settings' },
        { label: 'Limits' },
      ]"
      admin-email="admin@prodigy.com"
    />

    <div class="flex h-[calc(100vh-3.5rem)] overflow-hidden">
      <div class="flex-1 overflow-y-auto p-6">
        <Breadcrumb :items="[{ label: 'Settings', href: '/settings' }, { label: 'Limits' }]" class="mb-4" />

        <div class="mb-4 flex items-center gap-3">
          <div>
            <h1 class="text-2xl font-bold text-slate-900">Transaction Limits</h1>
            <p class="mt-0.5 text-sm text-slate-500">{{ limits.length }} limits configured</p>
          </div>
          <span v-if="saveSuccessMsg" class="text-sm text-success-600 font-medium">Limit updated ✓</span>
        </div>

        <div v-if="isError" class="flex flex-col items-center py-16 text-center">
          <div class="w-12 h-12 rounded-full bg-danger-50 flex items-center justify-center mb-4">
            <AlertCircle class="w-6 h-6 text-danger-500" />
          </div>
          <p class="text-slate-700 font-medium mb-1">Couldn't load data</p>
          <p class="text-slate-400 text-sm mb-4">{{ (error as Error)?.message || 'Something went wrong' }}</p>
          <button @click="refetch()" class="text-sm text-brand-600 font-medium hover:underline">Try again</button>
        </div>

        <div v-else class="rounded-lg border border-slate-200 bg-white shadow-sm overflow-x-auto">
          <DataTable
            :columns="tableColumns"
            :data="tableData"
            :loading="isLoading"
            row-key="id"
            :on-row-click="openPanel"
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

      <!-- Side Panel -->
      <SidePanel
        :open="panelOpen"
        :title="selectedLimit ? `Edit Limit — ${selectedLimit.name}` : 'Limit Details'"
        width="480"
        @close="closePanel"
      >
        <div class="space-y-5">
          <DefinitionList :items="detailItems" :columns="2" />

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
                    fieldErrors.dailyMax ? 'border-danger-500 ring-1 ring-danger-500 focus:ring-danger-500' : 'border-slate-300 focus:ring-brand-500']"
                  @blur="validateDailyMax"
                />
                <p v-if="fieldErrors.dailyMax" class="mt-1 text-xs text-danger-600">{{ fieldErrors.dailyMax }}</p>
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
                    fieldErrors.monthlyMax ? 'border-danger-500 ring-1 ring-danger-500 focus:ring-danger-500' : 'border-slate-300 focus:ring-brand-500']"
                  @blur="validateMonthlyMax"
                />
                <p v-if="fieldErrors.monthlyMax" class="mt-1 text-xs text-danger-600">{{ fieldErrors.monthlyMax }}</p>
              </div>
            </div>

            <p v-if="saveError" class="text-xs text-danger-600">{{ saveError }}</p>
          </div>
        </div>

        <template #footer>
          <div class="flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              :disabled="!formValid"
              :loading="mutation.isPending.value"
              @click="save"
            >
              Save
            </Button>
            <Button variant="ghost" size="sm" @click="closePanel">Cancel</Button>
          </div>
        </template>
      </SidePanel>
    </div>
  </AppLayout>
</template>
