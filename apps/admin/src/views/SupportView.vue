<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import { apiFetch } from '@/composables/useApi'
import AppLayout from '../layouts/AppLayout.vue'
import { PageHeader, Card, StatusPill } from '@prodigy/ui'
import { Search, ExternalLink, AlertCircle } from 'lucide-vue-next'

const router = useRouter()
const search = ref('')

const { data, isLoading, isError, refetch } = useQuery({
  queryKey: ['support-customers'],
  queryFn: () => apiFetch('/users?limit=100&supportView=true'),
  staleTime: 30_000,
})

const customers = computed(() => {
  const items = (data.value as any)?.items ?? []
  if (!search.value) return items
  const q = search.value.toLowerCase()
  return items.filter((c: any) =>
    c.email?.toLowerCase().includes(q) ||
    c.name?.toLowerCase().includes(q) ||
    c.id?.toLowerCase().includes(q)
  )
})

function maskDob(dob?: string) {
  if (!dob) return '—'
  const age = Math.floor((Date.now() - new Date(dob).getTime()) / (1000 * 60 * 60 * 24 * 365))
  return `${age} years old`
}

function maskAddress(address?: string) {
  if (!address) return '—'
  const parts = address.split(',')
  return parts[parts.length - 1]?.trim() ?? '—'
}
</script>

<template>
  <AppLayout>
    <PageHeader
      :breadcrumbs="[{ label: 'Admin', href: '/' }, { label: 'Support' }]"
      admin-email="admin@prodigy.com"
    />

    <div class="p-6">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Client Support</h1>
          <p class="text-slate-500 text-sm mt-0.5">Search and view customer accounts</p>
        </div>
      </div>

      <!-- Search -->
      <div class="relative mb-6 max-w-md">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          v-model="search"
          type="text"
          placeholder="Search by email, name or ID..."
          class="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="space-y-3">
        <div v-for="i in 8" :key="i" class="h-12 bg-slate-100 rounded-lg animate-pulse" />
      </div>

      <!-- Error -->
      <div v-else-if="isError" class="flex flex-col items-center py-10">
        <AlertCircle class="w-8 h-8 text-danger-400 mb-2" />
        <button @click="refetch()" class="text-sm text-brand-600 hover:underline">Retry</button>
      </div>

      <!-- Table -->
      <Card v-else class="p-0 overflow-hidden">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-100">
              <th class="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-5 py-3">Customer</th>
              <th class="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">KYC Status</th>
              <th class="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Risk</th>
              <th class="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Country</th>
              <th class="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Age</th>
              <th class="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="c in customers"
              :key="c.id"
              class="border-b border-slate-50 hover:bg-slate-50 transition-colors"
            >
              <td class="px-5 py-3">
                <div>
                  <p class="font-medium text-slate-900">{{ c.name ?? c.email }}</p>
                  <p class="text-xs text-slate-400">{{ c.email }}</p>
                </div>
              </td>
              <td class="px-4 py-3"><StatusPill :status="c.kycStatus" /></td>
              <td class="px-4 py-3"><StatusPill :status="c.riskLevel ?? 'low'" /></td>
              <td class="px-4 py-3 text-slate-600 text-xs">{{ maskAddress(c.address) }}</td>
              <td class="px-4 py-3 text-slate-600 text-xs">{{ maskDob(c.dateOfBirth) }}</td>
              <td class="px-4 py-3">
                <button
                  @click="router.push(`/customers/${c.id}`)"
                  class="flex items-center gap-1.5 text-xs text-brand-600 hover:text-brand-700 font-medium transition-colors"
                >
                  <ExternalLink class="w-3.5 h-3.5" /> View
                </button>
              </td>
            </tr>
            <tr v-if="customers.length === 0">
              <td colspan="6" class="px-5 py-10 text-center text-slate-400 text-sm">No customers found</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  </AppLayout>
</template>
