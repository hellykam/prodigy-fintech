<script setup lang="ts">
import { ref, computed } from 'vue'
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
  Badge,
  FilterBar,
  EmptyState,
} from '@prodigy/ui'
import { AlertCircle } from 'lucide-vue-next'
import { apiFetch } from '../composables/useApi'
import { useWebSocket } from '../composables/useWebSocket'

interface RewardHistoryEntry {
  id: string
  type: string
  amount: number
  currency: string
  description: string
  createdAt: string
}

interface RewardRecord {
  userId: string
  referralCode: string
  verifiedReferrals: number
  rewardBalance: number
  createdAt: string
  currency?: string
  status?: string
  history?: RewardHistoryEntry[]
}

interface RewardsResponse {
  items: RewardRecord[]
}

const router = useRouter()
const route = useRoute()
const { connected } = useWebSocket()

const { data, isLoading, isError, error, refetch } = useQuery({
  queryKey: ['rewards'],
  queryFn: () => apiFetch<RewardsResponse>('/api/rewards'),
})

const rewards = computed(() => data.value?.items ?? [])

const tableColumns = [
  { key: 'userId', header: 'User ID' },
  { key: 'referralCode', header: 'Referral Code' },
  { key: 'verifiedReferrals', header: 'Verified Referrals', align: 'right' as const },
  { key: 'rewardBalance', header: 'Reward Balance', align: 'right' as const },
  { key: 'createdAt', header: 'Created At' },
]

// ── Filter state ─────────────────────────────────────────────────────────────
const filterValues = ref<Record<string, string>>({})

const rewardsFilters = [
  {
    key: 'search',
    label: 'Search',
    type: 'text' as const,
    placeholder: 'Search by referral code or user ID…',
  },
]

const filteredRewards = computed(() => {
  const q = (filterValues.value['search'] ?? '').toLowerCase().trim()
  if (!q) return rewards.value
  return rewards.value.filter(
    (r) =>
      r.referralCode.toLowerCase().includes(q) ||
      r.userId.toLowerCase().includes(q),
  )
})

const tableData = computed(() =>
  filteredRewards.value.map((r) => ({ ...r, _raw: r })),
)

const selectedReward = ref<RewardRecord | null>(null)
const panelOpen = computed(() => selectedReward.value !== null)

function openPanel(row: Record<string, unknown>) {
  selectedReward.value = row['_raw'] as RewardRecord
  router.replace({ query: { ...route.query, panel: `reward-${selectedReward.value.userId}` } })
}

function closePanel() {
  selectedReward.value = null
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
  if (id.length <= 12) return id
  return id.slice(0, 8) + '…'
}

const detailItems = computed(() => {
  const r = selectedReward.value
  if (!r) return []
  return [
    { label: 'User ID', value: r.userId },
    { label: 'Referral Code', value: r.referralCode },
    { label: 'Verified Referrals', value: r.verifiedReferrals },
    { label: 'Reward Balance', value: r.rewardBalance, type: 'money' as const, currency: r.currency ?? 'EUR' },
    { label: 'Created At', value: r.createdAt ? formatDate(r.createdAt) : '—' },
    ...(r.status ? [{ label: 'Status', value: r.status, type: 'status' as const }] : []),
  ]
})
</script>

<template>
  <AppLayout :ws-connected="connected">
    <PageHeader
      :breadcrumbs="[{ label: 'Admin', href: '/' }, { label: 'Rewards' }]"
      admin-email="admin@prodigy.com"
    />

    <div class="flex h-[calc(100vh-3.5rem)] overflow-hidden">
      <div class="flex-1 overflow-y-auto p-6">
        <div class="mb-4">
          <h1 class="text-xl font-semibold text-slate-900">Rewards</h1>
          <p class="mt-0.5 text-sm text-slate-500">{{ rewards.length }} reward records</p>
        </div>

        <!-- FilterBar -->
        <div class="mb-4">
          <FilterBar
            v-model="filterValues"
            :filters="rewardsFilters"
          />
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
            row-key="userId"
            :on-row-click="openPanel"
            empty-title="No rewards data yet"
            empty-description="No reward records found."
          >
            <template #userId="{ value }">
              <a
                :href="`/customers/${String(value ?? '')}`"
                class="font-mono text-xs text-brand-600 hover:underline"
                @click.stop
              >
                {{ truncateId(String(value ?? '')) }}
              </a>
            </template>
            <template #referralCode="{ value }">
              <span class="font-mono text-xs text-slate-700">{{ String(value ?? '') }}</span>
            </template>
            <template #verifiedReferrals="{ value }">
              <span class="font-mono text-xs text-slate-700 tabular-nums">{{ value }}</span>
            </template>
            <template #rewardBalance="{ row }">
              <MoneyAmount
                :amount="Number(row['rewardBalance'] ?? 0)"
                :currency="String(row['currency'] ?? 'EUR')"
                size="sm"
              />
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
        :title="selectedReward ? `Reward — ${selectedReward.referralCode}` : 'Reward Details'"
        width="480"
        @close="closePanel"
      >
        <div class="space-y-5">
          <DefinitionList :items="detailItems" :columns="2" />

          <div class="border-t border-slate-200 pt-4">
            <h3 class="text-sm font-semibold text-slate-900 mb-3">History</h3>

            <div
              v-if="selectedReward && selectedReward.history && selectedReward.history.length > 0"
              class="space-y-3"
            >
              <div
                v-for="entry in selectedReward.history"
                :key="entry.id"
                class="flex items-start justify-between gap-3 rounded-md border border-slate-100 bg-slate-50 p-3"
              >
                <div class="flex flex-col gap-1 min-w-0">
                  <div class="flex items-center gap-2">
                    <Badge variant="info">{{ entry.type }}</Badge>
                    <span class="text-xs text-slate-500">{{ formatDate(entry.createdAt) }}</span>
                  </div>
                  <p class="text-xs text-slate-700">{{ entry.description }}</p>
                </div>
                <MoneyAmount
                  :amount="entry.amount"
                  :currency="entry.currency"
                  size="sm"
                />
              </div>
            </div>

            <p v-else class="text-sm text-slate-400">No reward history</p>
          </div>
        </div>
      </SidePanel>
    </div>
  </AppLayout>
</template>
