<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import AppLayout from '../layouts/AppLayout.vue'
import { PageHeader, DataTable, StatusPill, SidePanel, DefinitionList, Badge } from '@prodigy/ui'
import { AlertCircle } from 'lucide-vue-next'
import { apiFetch } from '../composables/useApi'
import { useWebSocket } from '../composables/useWebSocket'

interface WidgetConfig {
  id: string
  name: string
  status: string
  primaryColorToken: string
  themeMode: string
  defaultFiatCurrency: string
  defaultCryptoCurrency: string
  b2bClientId: string
  createdAt: string
  updatedAt?: string
}

interface WidgetConfigsResponse {
  items: WidgetConfig[]
}

const router = useRouter()
const route = useRoute()
const { connected } = useWebSocket()

const { data, isLoading, isError, error, refetch } = useQuery({
  queryKey: ['widget-configs'],
  queryFn: () => apiFetch<WidgetConfigsResponse>('/api/widget-configs'),
})

const configs = computed(() => data.value?.items ?? [])

const tableColumns = [
  { key: 'name', header: 'Config Name' },
  { key: 'b2bClientId', header: 'B2B Client ID' },
  { key: 'themeMode', header: 'Theme Mode' },
  { key: 'status', header: 'Status' },
  { key: 'currencies', header: 'Default Currencies' },
  { key: 'createdAt', header: 'Created At' },
]

const tableData = computed(() =>
  configs.value.map((c) => ({
    ...c,
    currencies: `${c.defaultFiatCurrency} / ${c.defaultCryptoCurrency}`,
    _raw: c,
  })),
)

// Side panel
const selectedConfig = ref<WidgetConfig | null>(null)
const panelOpen = computed(() => selectedConfig.value !== null)

function openConfig(row: Record<string, unknown>) {
  selectedConfig.value = row['_raw'] as WidgetConfig
  router.replace({ query: { ...route.query, panel: row['id'] as string } })
}

function closePanel() {
  selectedConfig.value = null
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
  const c = selectedConfig.value
  if (!c) return []
  return [
    { label: 'Config ID', value: c.id },
    { label: 'Name', value: c.name },
    { label: 'Status', value: c.status, type: 'status' as const },
    { label: 'B2B Client ID', value: c.b2bClientId },
    { label: 'Theme Mode', value: c.themeMode },
    { label: 'Primary Color Token', value: c.primaryColorToken },
    { label: 'Default Fiat Currency', value: c.defaultFiatCurrency },
    { label: 'Default Crypto Currency', value: c.defaultCryptoCurrency },
    { label: 'Created At', value: formatDate(c.createdAt) },
    { label: 'Updated At', value: formatDate(c.updatedAt) },
    {
      label: 'Widget Demo',
      value: `http://localhost:5005?b2bClientId=${c.b2bClientId}`,
      type: 'link' as const,
      href: `http://localhost:5005?b2bClientId=${c.b2bClientId}`,
    },
  ]
})
</script>

<template>
  <AppLayout :ws-connected="connected">
    <PageHeader
      :breadcrumbs="[{ label: 'Admin', href: '/' }, { label: 'Widget Configs' }]"
      admin-email="admin@prodigy.com"
    />

    <div class="flex h-[calc(100vh-3.5rem)] overflow-hidden">
      <div class="flex-1 overflow-y-auto p-6">
        <div class="mb-4 flex items-center justify-between">
          <div>
            <h1 class="text-xl font-semibold text-slate-900">Widget Configs</h1>
            <p class="mt-0.5 text-sm text-slate-500">{{ configs.length }} configurations</p>
          </div>
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
            :on-row-click="openConfig"
            empty-title="No widget configs yet"
            empty-description="No widget configurations found."
          >
            <template #b2bClientId="{ value }">
              <span class="font-mono text-xs text-slate-600">{{ truncateId(String(value ?? '')) }}</span>
            </template>
            <template #themeMode="{ value }">
              <Badge :variant="value === 'dark' ? 'default' : 'info'">{{ value }}</Badge>
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
        :title="selectedConfig?.name ?? 'Widget Config Detail'"
        @close="closePanel"
      >
        <DefinitionList :items="detailItems" :columns="2" />
      </SidePanel>
    </div>
  </AppLayout>
</template>
