<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import AppLayout from '../layouts/AppLayout.vue'
import {
  PageHeader,
  Card,
  StatusPill,
  MoneyAmount,
  LiveIndicator,
  Button,
} from '@prodigy/ui'
import { AlertCircle, ChevronRight } from 'lucide-vue-next'
import { apiFetch } from '../composables/useApi'
import { useWebSocket } from '../composables/useWebSocket'

interface ProviderBalance {
  currency: string
  available: number
  pending: number
  actual: number
}

interface LiquidityProvider {
  id: string
  name: string
  type: string
  status: string
  balances: ProviderBalance[]
  lastUpdated: string
}

interface LiquidityResponse {
  providers: LiquidityProvider[]
}

interface SimulateResponse {
  ok: boolean
  providers: LiquidityProvider[]
}

type SimulateEvent = 'low_balance' | 'offline' | 'recovery' | 'high_volume' | 'reset'

const queryClient = useQueryClient()
const { events: wsEvents, connected } = useWebSocket()

const { data, isLoading, isError, error, refetch } = useQuery({
  queryKey: ['liquidity'],
  queryFn: () => apiFetch<LiquidityResponse>('/api/liquidity'),
})

const providers = computed(() => data.value?.providers ?? [])

// Re-fetch on LIQUIDITY_STATE_CHANGED WS event
watch(wsEvents, (newEvents) => {
  const latest = newEvents[0]
  if (latest?.eventName === 'LIQUIDITY_STATE_CHANGED') {
    queryClient.invalidateQueries({ queryKey: ['liquidity'] })
  }
})

// Track which (providerId, event) pair is in-flight
const simulatingKey = ref<string | null>(null)
const simulateMessage = ref('')
const simulateError = ref('')

async function simulate(providerId: string, event: SimulateEvent) {
  const key = `${providerId}:${event}`
  simulatingKey.value = key
  simulateMessage.value = ''
  simulateError.value = ''
  try {
    const result = await apiFetch<SimulateResponse>('/api/liquidity/simulate', {
      method: 'POST',
      body: JSON.stringify({ providerId, event }),
    })
    if (result.ok) {
      queryClient.setQueryData(['liquidity'], { providers: result.providers })
      simulateMessage.value = `Simulation "${event}" applied to provider.`
    } else {
      // Fallback: invalidate so cards refetch
      queryClient.invalidateQueries({ queryKey: ['liquidity'] })
    }
  } catch (err) {
    simulateError.value = err instanceof Error ? err.message : 'Simulation failed'
  } finally {
    simulatingKey.value = null
  }
}

// Global simulate (no provider scope) for the demo panel
async function simulateGlobal(event: SimulateEvent) {
  simulatingKey.value = `global:${event}`
  simulateMessage.value = ''
  simulateError.value = ''
  try {
    const result = await apiFetch<SimulateResponse>('/api/liquidity/simulate', {
      method: 'POST',
      body: JSON.stringify({ event }),
    })
    if (result.ok) {
      queryClient.setQueryData(['liquidity'], { providers: result.providers })
      simulateMessage.value = `Simulation "${event}" applied successfully.`
    } else {
      queryClient.invalidateQueries({ queryKey: ['liquidity'] })
    }
  } catch (err) {
    simulateError.value = err instanceof Error ? err.message : 'Simulation failed'
  } finally {
    simulatingKey.value = null
  }
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

function cardBorderClass(status: string) {
  if (status === 'offline') return 'border-danger-400'
  if (status === 'degraded') return 'border-warning-400'
  return 'border-slate-200'
}

const simulateButtons: { label: string; event: SimulateEvent; variant: 'primary' | 'secondary' | 'destructive' | 'outline' }[] = [
  { label: 'Low Balance', event: 'low_balance', variant: 'outline' },
  { label: 'Offline', event: 'offline', variant: 'destructive' },
  { label: 'Recovery', event: 'recovery', variant: 'primary' },
  { label: 'High Volume', event: 'high_volume', variant: 'secondary' },
  { label: 'Reset', event: 'reset', variant: 'secondary' },
]

// Expand/collapse state for provider rows
const expanded = ref<Record<string, boolean>>({})
function toggle(id: string) { expanded.value[id] = !expanded.value[id] }

function totalValue(provider: LiquidityProvider): number {
  return provider.balances.reduce((sum, b) => sum + b.available, 0)
}

function pendingCount(provider: LiquidityProvider): number {
  return provider.balances.reduce((sum, b) => sum + (b.pending > 0 ? 1 : 0), 0)
}
</script>

<template>
  <AppLayout :ws-connected="connected">
    <PageHeader
      :breadcrumbs="[{ label: 'Admin', href: '/' }, { label: 'Liquidity' }]"
      admin-email="admin@prodigy.com"
    >
      <template #actions>
        <LiveIndicator :active="connected" label="Live" />
      </template>
    </PageHeader>

    <div class="p-6 space-y-6">
      <!-- Loading -->
      <div v-if="isLoading" class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div
          v-for="i in 2"
          :key="i"
          class="h-48 animate-pulse rounded-lg bg-slate-100"
        />
      </div>

      <!-- Error -->
      <div v-else-if="isError" class="flex flex-col items-center py-16 text-center">
        <div class="w-12 h-12 rounded-full bg-danger-50 flex items-center justify-center mb-4">
          <AlertCircle class="w-6 h-6 text-danger-500" />
        </div>
        <p class="text-slate-700 font-medium mb-1">Couldn't load data</p>
        <p class="text-slate-400 text-sm mb-4">{{ (error as Error)?.message || 'Something went wrong' }}</p>
        <button @click="refetch()" class="text-sm text-brand-600 font-medium hover:underline">Try again</button>
      </div>

      <!-- Provider expandable rows -->
      <div v-else class="space-y-0">
        <div
          v-for="provider in providers"
          :key="provider.id"
          class="border rounded-lg overflow-hidden mb-3 bg-white"
          :class="cardBorderClass(provider.status)"
        >
          <!-- Header row — clickable to expand -->
          <button
            @click="toggle(provider.id)"
            class="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-slate-50 transition"
          >
            <div class="flex items-center gap-3">
              <ChevronRight
                class="w-4 h-4 text-slate-400 transition-transform"
                :class="expanded[provider.id] ? 'rotate-90' : ''"
              />
              <div class="text-left">
                <p class="font-semibold text-slate-900 text-sm">{{ provider.name }}</p>
                <p class="text-xs text-slate-400">{{ provider.type }} · {{ provider.balances.length }} currencies</p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div class="text-right">
                <p class="font-semibold text-slate-900 text-sm">
                  <MoneyAmount :amount="totalValue(provider)" currency="EUR" size="sm" />
                </p>
                <p v-if="pendingCount(provider) > 0" class="text-xs text-warning-600">
                  {{ pendingCount(provider) }} with pending
                </p>
              </div>
              <StatusPill :status="provider.status" />
            </div>
          </button>

          <!-- Expanded detail -->
          <div v-if="expanded[provider.id]" class="border-t border-slate-100">
            <!-- Balance table -->
            <div class="overflow-x-auto bg-slate-50/50">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-slate-100">
                    <th class="pb-2 pt-3 pl-12 text-left text-xs font-medium text-slate-500 uppercase tracking-wide">Currency</th>
                    <th class="pb-2 pt-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wide pr-8">Available</th>
                    <th class="pb-2 pt-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wide pr-8">Pending</th>
                    <th class="pb-2 pt-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wide pr-5">Actual</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="balance in provider.balances"
                    :key="balance.currency"
                    class="border-b border-slate-50 last:border-0"
                  >
                    <td class="py-2.5 pl-12 text-xs font-medium text-slate-700">{{ balance.currency }}</td>
                    <td class="py-2.5 text-right pr-8">
                      <MoneyAmount :amount="balance.available" :currency="balance.currency" size="sm" />
                    </td>
                    <td class="py-2.5 text-right pr-8">
                      <MoneyAmount :amount="balance.pending" :currency="balance.currency" size="sm" />
                    </td>
                    <td class="py-2.5 text-right pr-5">
                      <MoneyAmount :amount="balance.actual" :currency="balance.currency" size="sm" />
                    </td>
                  </tr>
                  <tr v-if="provider.balances.length === 0">
                    <td colspan="4" class="py-4 pl-12 text-xs text-slate-400">No balances</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Footer with simulate actions -->
            <div class="px-5 py-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap bg-white">
              <p class="text-xs text-slate-400">
                Last updated: {{ formatDate(provider.lastUpdated) }}
              </p>
              <div class="flex gap-1.5 flex-wrap">
                <Button
                  size="sm"
                  variant="outline"
                  :loading="simulatingKey === `${provider.id}:low_balance`"
                  :disabled="simulatingKey !== null && simulatingKey !== `${provider.id}:low_balance`"
                  @click="simulate(provider.id, 'low_balance')"
                >
                  Simulate Low Balance
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  :loading="simulatingKey === `${provider.id}:recovery`"
                  :disabled="simulatingKey !== null && simulatingKey !== `${provider.id}:recovery`"
                  @click="simulate(provider.id, 'recovery')"
                >
                  Simulate Recovery
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="providers.length === 0" class="py-12 text-center text-sm text-slate-400">
          No liquidity providers found.
        </div>
      </div>

      <!-- Simulation controls -->
      <div class="rounded-lg border border-slate-200 bg-white shadow-panel p-5">
        <h2 class="text-sm font-semibold text-slate-900 mb-3">Simulate Scenarios</h2>
        <p class="text-xs text-slate-500 mb-4">
          Trigger simulated state changes to demonstrate different liquidity scenarios during a demo.
        </p>

        <div class="flex flex-wrap gap-2">
          <Button
            v-for="btn in simulateButtons"
            :key="btn.event"
            :variant="btn.variant"
            size="sm"
            :loading="simulatingKey === `global:${btn.event}`"
            :disabled="simulatingKey !== null && simulatingKey !== `global:${btn.event}`"
            @click="simulateGlobal(btn.event)"
          >
            {{ btn.label }}
          </Button>
        </div>

        <p v-if="simulateMessage" class="mt-3 text-xs text-success-600">{{ simulateMessage }}</p>
        <p v-if="simulateError" class="mt-3 text-xs text-danger-600">{{ simulateError }}</p>
      </div>
    </div>
  </AppLayout>
</template>
