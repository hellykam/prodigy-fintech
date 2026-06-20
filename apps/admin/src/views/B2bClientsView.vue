<script setup lang="ts">
import { computed, ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import AppLayout from '../layouts/AppLayout.vue'
import { apiFetch } from '../composables/useApi'
import { useWebSocket } from '../composables/useWebSocket'
import { StatusPill, Card, EmptyState } from '@prodigy/ui'
import { Building2, ChevronRight, AlertCircle } from 'lucide-vue-next'

interface B2BClient {
  id: string
  name: string
  status: string
  commissionSharePercent: number
  platformFeePercent: number
  createdAt: string
  _count?: { widgetConfigs: number }
}

const { connected } = useWebSocket()
const search = ref('')

const { data, isLoading, isError, error, refetch } = useQuery({
  queryKey: ['b2b-clients'],
  queryFn: () => apiFetch<{ items: B2BClient[] }>('/api/b2b-clients'),
  refetchInterval: 30_000,
})

const clients = computed(() =>
  (data.value?.items ?? []).filter(c =>
    !search.value || c.name.toLowerCase().includes(search.value.toLowerCase()),
  ),
)

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}
</script>

<template>
  <AppLayout :ws-connected="connected">
    <div class="p-6">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-xl font-semibold text-slate-900">B2B Clients</h1>
          <p class="text-sm text-slate-500 mt-0.5">Partner companies using the Prodigy widget</p>
        </div>
        <div class="flex items-center gap-3">
          <input
            v-model="search"
            type="search"
            placeholder="Search clients…"
            class="h-9 px-3 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 w-52"
            aria-label="Search B2B clients"
          />
        </div>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="grid grid-cols-3 gap-4">
        <div v-for="i in 4" :key="i" class="h-36 bg-slate-100 rounded-lg animate-pulse" />
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

      <!-- Empty -->
      <EmptyState
        v-else-if="clients.length === 0"
        title="No B2B clients yet"
        description="No partner clients match the current search."
      />

      <!-- Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card
          v-for="client in clients"
          :key="client.id"
          class="p-5 hover:shadow-card transition-shadow cursor-pointer group"
        >
          <!-- Client header -->
          <div class="flex items-start justify-between gap-3 mb-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                <Building2 class="w-5 h-5 text-brand-600" />
              </div>
              <div>
                <p class="font-semibold text-slate-900 text-sm">{{ client.name }}</p>
                <p class="text-xs text-slate-400 mt-0.5 font-mono">{{ client.id.slice(0, 12) }}…</p>
              </div>
            </div>
            <StatusPill :status="client.status" />
          </div>

          <!-- Metrics -->
          <div class="grid grid-cols-3 gap-3 text-center py-3 border-y border-slate-100 mb-4">
            <div>
              <p class="text-lg font-bold text-slate-900">{{ client.commissionSharePercent }}%</p>
              <p class="text-xs text-slate-400">Commission</p>
            </div>
            <div>
              <p class="text-lg font-bold text-slate-900">{{ client.platformFeePercent }}%</p>
              <p class="text-xs text-slate-400">Platform fee</p>
            </div>
            <div>
              <p class="text-lg font-bold text-slate-900">{{ client._count?.widgetConfigs ?? 0 }}</p>
              <p class="text-xs text-slate-400">Widgets</p>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-between">
            <p class="text-xs text-slate-400">Created {{ formatDate(client.createdAt) }}</p>
            <ChevronRight class="w-4 h-4 text-slate-300 group-hover:text-brand-500 transition-colors" />
          </div>
        </Card>
      </div>
    </div>
  </AppLayout>
</template>
