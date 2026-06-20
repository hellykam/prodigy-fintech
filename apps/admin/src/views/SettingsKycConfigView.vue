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
  Button,
  Breadcrumb,
} from '@prodigy/ui'
import { apiFetch } from '../composables/useApi'
import { useWebSocket } from '../composables/useWebSocket'

interface KYCStep {
  id: string
  label: string
}

interface KYCLevel {
  id: string
  name: string
  description: string
  dailyLimitEur: number
  monthlyLimitEur: number
  steps: string | KYCStep[]
  active: boolean
}

interface KYCLevelsResponse {
  levels: KYCLevel[]
}

interface CountryRisk {
  code: string
  name: string
  riskLevel: string
  requiredLevel: string
  updatedAt?: string | null
  updatedBy?: string | null
}

interface CountryRiskResponse {
  countries: CountryRisk[]
}

const router = useRouter()
const route = useRoute()
const queryClient = useQueryClient()
const { connected } = useWebSocket()

// ---------------------------------------------------------------------------
// KYC Levels
// ---------------------------------------------------------------------------
const { data: levelsData, isLoading: levelsLoading } = useQuery({
  queryKey: ['kyc-levels'],
  queryFn: () => apiFetch<KYCLevelsResponse>('/api/kyc/levels'),
})

const levels = computed(() => levelsData.value?.levels ?? [])

function parseSteps(raw: string | KYCStep[]): KYCStep[] {
  if (Array.isArray(raw)) return raw
  try { return JSON.parse(raw) as KYCStep[] } catch { return [] }
}

function formatLimit(val: number): string {
  if (val === -1) return 'No limit'
  return `€${val.toLocaleString('en-US')}`
}

const levelColumns = [
  { key: 'name', header: 'Level' },
  { key: 'description', header: 'Description' },
  { key: 'dailyLimitEur', header: 'Daily Limit', align: 'right' as const },
  { key: 'monthlyLimitEur', header: 'Monthly Limit', align: 'right' as const },
  { key: 'stepCount', header: 'Steps' },
  { key: 'active', header: 'Active' },
]

const levelTableData = computed(() =>
  levels.value.map((l) => ({
    ...l,
    stepCount: `${parseSteps(l.steps).length} steps`,
    _raw: l,
  })),
)

// Level detail side panel
const selectedLevel = ref<KYCLevel | null>(null)
const levelPanelOpen = computed(() => selectedLevel.value !== null)

function openLevelPanel(row: Record<string, unknown>) {
  selectedLevel.value = row['_raw'] as KYCLevel
  router.replace({ query: { ...route.query, panel: `level-${selectedLevel.value.id}` } })
}

function closeLevelPanel() {
  selectedLevel.value = null
  const q = { ...route.query }
  delete q['panel']
  router.replace({ query: q })
}

const selectedLevelSteps = computed(() =>
  selectedLevel.value ? parseSteps(selectedLevel.value.steps) : [],
)

// ---------------------------------------------------------------------------
// Country Risk
// ---------------------------------------------------------------------------
const riskTabs = [
  { value: 'low', label: 'Low Risk' },
  { value: 'medium', label: 'Medium Risk' },
  { value: 'high', label: 'High Risk' },
  { value: 'blocked', label: 'Blocked' },
]

const activeRiskTab = ref((route.query['risk'] as string) ?? 'low')

watch(activeRiskTab, (val) => {
  router.replace({ query: { ...route.query, risk: val } })
})

const { data: countryData, isLoading: countryLoading } = useQuery({
  queryKey: computed(() => ['kyc-country-risk', activeRiskTab.value]),
  queryFn: () =>
    apiFetch<CountryRiskResponse>(`/api/kyc/country-risk?riskLevel=${activeRiskTab.value}`),
})

const countries = computed(() => countryData.value?.countries ?? [])

const countryColumns = [
  { key: 'name', header: 'Country' },
  { key: 'code', header: 'Code' },
  { key: 'requiredLevel', header: 'Required Level' },
  { key: 'updatedAt', header: 'Last Updated' },
]

const countryTableData = computed(() =>
  countries.value.map((c) => ({
    ...c,
    updatedAt: c.updatedAt ? formatDate(c.updatedAt) : '—',
    _raw: c,
  })),
)

// Country edit side panel
const selectedCountry = ref<CountryRisk | null>(null)
const countryPanelOpen = computed(() => selectedCountry.value !== null)
const editRiskLevel = ref('')
const countryError = ref('')

function openCountryPanel(row: Record<string, unknown>) {
  selectedCountry.value = row['_raw'] as CountryRisk
  editRiskLevel.value = selectedCountry.value.riskLevel
  countryError.value = ''
  router.replace({
    query: { ...route.query, panel: `country-${selectedCountry.value.code}` },
  })
}

function closeCountryPanel() {
  selectedCountry.value = null
  const q = { ...route.query }
  delete q['panel']
  router.replace({ query: q })
}

const countryMutation = useMutation({
  mutationFn: ({ code, riskLevel }: { code: string; riskLevel: string }) =>
    apiFetch<CountryRisk>(`/api/kyc/country-risk/${code}`, {
      method: 'PATCH',
      body: JSON.stringify({ riskLevel }),
    }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['kyc-country-risk'] })
    closeCountryPanel()
  },
  onError: (err: Error) => {
    countryError.value = err.message
  },
})

function saveCountry() {
  const c = selectedCountry.value
  if (!c) return
  if (!editRiskLevel.value) { countryError.value = 'Please select a risk level'; return }
  countryError.value = ''
  countryMutation.mutate({ code: c.code, riskLevel: editRiskLevel.value })
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function formatDate(ts: string | null | undefined) {
  if (!ts) return '—'
  return new Date(ts).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

// Static flow rules
const flowRules = [
  { trigger: 'Transaction > €1,000', action: 'Prompt Level 2 upgrade' },
  { trigger: 'Transaction > €10,000', action: 'Require Level 3 before proceeding' },
  { trigger: 'PEP declared', action: 'Always manual review' },
  { trigger: 'Blocked country', action: 'Reject at form entry' },
]
</script>

<template>
  <AppLayout :ws-connected="connected">
    <PageHeader
      :breadcrumbs="[
        { label: 'Admin', href: '/' },
        { label: 'Settings', href: '/settings' },
        { label: 'KYC Config' },
      ]"
      admin-email="admin@prodigy.com"
    />

    <div class="flex h-[calc(100vh-3.5rem)] overflow-hidden">
      <div class="flex-1 overflow-y-auto p-6 space-y-10">
        <Breadcrumb :items="[{ label: 'Settings', href: '/settings' }, { label: 'KYC Config' }]" class="mb-4" />

        <!-- ---------------------------------------------------------------- -->
        <!-- Section 1: KYC Levels -->
        <!-- ---------------------------------------------------------------- -->
        <section>
          <h2 class="text-base font-semibold text-slate-800 mb-4">KYC Levels</h2>

          <div class="rounded-lg border border-slate-200 bg-white shadow-sm overflow-x-auto">
            <DataTable
              :columns="levelColumns"
              :data="levelTableData"
              :loading="levelsLoading"
              row-key="id"
              :on-row-click="openLevelPanel"
              empty-title="No KYC levels"
              empty-description="No KYC levels configured."
            >
              <template #name="{ value }">
                <span class="font-medium text-slate-900">{{ value }}</span>
              </template>
              <template #dailyLimitEur="{ value }">
                <span class="font-mono text-sm text-slate-700">{{ formatLimit(Number(value ?? 0)) }}</span>
              </template>
              <template #monthlyLimitEur="{ value }">
                <span class="font-mono text-sm text-slate-700">{{ formatLimit(Number(value ?? 0)) }}</span>
              </template>
              <template #active="{ value }">
                <span v-if="value" class="text-success-600 font-semibold text-sm">✓</span>
                <span v-else class="text-slate-400 text-sm">—</span>
              </template>
            </DataTable>
          </div>
        </section>

        <!-- ---------------------------------------------------------------- -->
        <!-- Section 2: Country Risk Rules -->
        <!-- ---------------------------------------------------------------- -->
        <section>
          <h2 class="text-base font-semibold text-slate-800 mb-4">Country Risk Rules</h2>

          <div class="mb-4">
            <FilterTabs v-model="activeRiskTab" :tabs="riskTabs" query-key="risk" />
          </div>

          <div class="rounded-lg border border-slate-200 bg-white shadow-sm overflow-x-auto">
            <DataTable
              :columns="countryColumns"
              :data="countryTableData"
              :loading="countryLoading"
              row-key="code"
              :on-row-click="openCountryPanel"
              empty-title="No countries"
              empty-description="No countries in this risk category."
            >
              <template #name="{ row }">
                <span class="text-slate-900">{{ row['name'] }}</span>
              </template>
              <template #requiredLevel="{ value }">
                <StatusPill :status="String(value ?? '')" />
              </template>
            </DataTable>
          </div>
        </section>

        <!-- ---------------------------------------------------------------- -->
        <!-- Section 3: Flow Rules -->
        <!-- ---------------------------------------------------------------- -->
        <section>
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-base font-semibold text-slate-800">Flow Rules</h2>
          </div>

          <div class="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-slate-100 bg-slate-50">
                  <th class="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-1/2">
                    Trigger
                  </th>
                  <th class="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-1/2">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr v-for="rule in flowRules" :key="rule.trigger" class="hover:bg-slate-50">
                  <td class="px-4 py-3 font-medium text-slate-800">{{ rule.trigger }}</td>
                  <td class="px-4 py-3 text-slate-600">{{ rule.action }}</td>
                </tr>
              </tbody>
            </table>
            <div class="px-4 py-3 border-t border-slate-100 bg-slate-50">
              <p class="text-xs text-slate-500 italic">These rules are enforced automatically by the KYC engine.</p>
            </div>
          </div>
        </section>
      </div>

      <!-- ------------------------------------------------------------------ -->
      <!-- Level detail side panel -->
      <!-- ------------------------------------------------------------------ -->
      <SidePanel
        :open="levelPanelOpen"
        :title="selectedLevel ? `${selectedLevel.name} — Steps` : 'KYC Level'"
        @close="closeLevelPanel"
      >
        <div class="space-y-6">
          <!-- Level overview -->
          <div class="space-y-3">
            <div>
              <p class="text-xs font-medium text-slate-500">Description</p>
              <p class="mt-0.5 text-sm text-slate-900">{{ selectedLevel?.description }}</p>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-xs font-medium text-slate-500">Daily Limit</p>
                <p class="mt-0.5 text-sm font-mono text-slate-900">
                  {{ selectedLevel ? formatLimit(selectedLevel.dailyLimitEur) : '—' }}
                </p>
              </div>
              <div>
                <p class="text-xs font-medium text-slate-500">Monthly Limit</p>
                <p class="mt-0.5 text-sm font-mono text-slate-900">
                  {{ selectedLevel ? formatLimit(selectedLevel.monthlyLimitEur) : '—' }}
                </p>
              </div>
            </div>
            <div>
              <p class="text-xs font-medium text-slate-500">Status</p>
              <p class="mt-0.5">
                <span
                  class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                  :class="selectedLevel?.active ? 'bg-success-100 text-success-700' : 'bg-slate-100 text-slate-500'"
                >
                  {{ selectedLevel?.active ? 'Active' : 'Inactive' }}
                </span>
              </p>
            </div>
          </div>

          <!-- Steps checklist -->
          <div>
            <h3 class="text-sm font-semibold text-slate-900 mb-3">Required Steps</h3>
            <ul class="space-y-2">
              <li
                v-for="step in selectedLevelSteps"
                :key="step.id"
                class="flex items-center gap-2 text-sm text-slate-700"
              >
                <span class="flex-shrink-0 w-5 h-5 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-semibold">
                  ✓
                </span>
                {{ step.label }}
              </li>
              <li v-if="selectedLevelSteps.length === 0" class="text-sm text-slate-400 italic">
                No steps defined.
              </li>
            </ul>
          </div>
        </div>
      </SidePanel>

      <!-- ------------------------------------------------------------------ -->
      <!-- Country risk edit side panel -->
      <!-- ------------------------------------------------------------------ -->
      <SidePanel
        :open="countryPanelOpen"
        :title="selectedCountry ? `${selectedCountry.name} (${selectedCountry.code})` : 'Country Risk'"
        @close="closeCountryPanel"
      >
        <div class="space-y-5">
          <div class="space-y-3">
            <div>
              <p class="text-xs font-medium text-slate-500">Country</p>
              <p class="mt-0.5 text-sm text-slate-900">{{ selectedCountry?.name }}</p>
            </div>
            <div>
              <p class="text-xs font-medium text-slate-500">Code</p>
              <p class="mt-0.5 text-sm font-mono text-slate-900">{{ selectedCountry?.code }}</p>
            </div>
            <div>
              <p class="text-xs font-medium text-slate-500">Current Risk Level</p>
              <p class="mt-0.5">
                <StatusPill :status="selectedCountry?.riskLevel ?? ''" />
              </p>
            </div>
          </div>

          <div class="border-t border-slate-200 pt-4 space-y-3">
            <h3 class="text-sm font-semibold text-slate-900">Change Risk Level</h3>
            <div>
              <label class="block text-xs font-medium text-slate-700 mb-1">Risk Level</label>
              <select
                v-model="editRiskLevel"
                class="h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
            <p v-if="countryError" class="text-xs text-danger-600">{{ countryError }}</p>
          </div>
        </div>

        <template #footer>
          <div class="flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              :loading="countryMutation.isPending.value"
              @click="saveCountry"
            >
              Save
            </Button>
            <Button variant="ghost" size="sm" @click="closeCountryPanel">Cancel</Button>
          </div>
        </template>
      </SidePanel>
    </div>
  </AppLayout>
</template>
