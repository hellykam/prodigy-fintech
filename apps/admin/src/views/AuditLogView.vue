<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { apiFetch } from '@/composables/useApi'
import AppLayout from '../layouts/AppLayout.vue'
import { PageHeader, Card, StatusPill } from '@prodigy/ui'
import { AlertCircle } from 'lucide-vue-next'

const filterAdmin = ref('')
const filterAction = ref('')

const { data, isLoading, isError, refetch } = useQuery({
  queryKey: ['audit-log', filterAdmin, filterAction],
  queryFn: () => {
    const params = new URLSearchParams({ limit: '50' })
    if (filterAdmin.value) params.set('adminEmail', filterAdmin.value)
    if (filterAction.value) params.set('action', filterAction.value)
    return apiFetch(`/audit-log?${params}`)
  },
  staleTime: 30_000,
})

const logs = computed(() => (data.value as any)?.items ?? [])

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const actionLabels: Record<string, string> = {
  kyc_approve: 'KYC Approved',
  kyc_reject: 'KYC Rejected',
  fee_update: 'Fee Updated',
  limit_update: 'Limit Updated',
  user_suspend: 'User Suspended',
  risk_resolve: 'Risk Resolved',
}
</script>

<template>
  <AppLayout>
    <PageHeader
      :breadcrumbs="[{ label: 'Admin', href: '/' }, { label: 'Settings', href: '/settings' }, { label: 'Audit Log' }]"
      admin-email="admin@prodigy.com"
    />

    <div class="p-6">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-slate-900">Audit Log</h1>
        <p class="text-slate-500 text-sm mt-0.5">All admin actions tracked for compliance</p>
      </div>

      <!-- Filters -->
      <div class="flex gap-3 mb-6">
        <input
          v-model="filterAdmin"
          placeholder="Filter by admin email..."
          class="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 w-64"
        />
        <select
          v-model="filterAction"
          class="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="">All actions</option>
          <option v-for="(label, key) in actionLabels" :key="key" :value="key">{{ label }}</option>
        </select>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="space-y-3">
        <div v-for="i in 8" :key="i" class="h-12 bg-slate-100 rounded-lg animate-pulse" />
      </div>

      <!-- Error -->
      <div v-else-if="isError" class="flex flex-col items-center py-10">
        <AlertCircle class="w-8 h-8 text-danger-400 mb-2" />
        <button @click="refetch()" class="text-sm text-brand-600">Retry</button>
      </div>

      <!-- Table -->
      <Card v-else class="p-0 overflow-hidden">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-100">
              <th class="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-5 py-3">Date</th>
              <th class="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Admin</th>
              <th class="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Action</th>
              <th class="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Entity</th>
              <th class="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="log in logs"
              :key="log.id"
              class="border-b border-slate-50 hover:bg-slate-50 transition-colors"
            >
              <td class="px-5 py-3 text-xs text-slate-500">{{ formatDate(log.createdAt) }}</td>
              <td class="px-4 py-3 text-xs font-medium text-slate-700">{{ log.adminEmail }}</td>
              <td class="px-4 py-3">
                <span class="text-xs font-medium bg-info-50 text-info-700 px-2 py-0.5 rounded-full">
                  {{ actionLabels[log.action] ?? log.action }}
                </span>
              </td>
              <td class="px-4 py-3 text-xs text-slate-500">{{ log.entityType }} · {{ log.entityId.slice(-8) }}</td>
              <td class="px-4 py-3 text-xs text-slate-400 max-w-xs truncate">
                <span v-if="log.after">{{ log.after }}</span>
              </td>
            </tr>
            <tr v-if="logs.length === 0">
              <td colspan="5" class="px-5 py-10 text-center text-slate-400 text-sm">No audit entries yet</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  </AppLayout>
</template>
