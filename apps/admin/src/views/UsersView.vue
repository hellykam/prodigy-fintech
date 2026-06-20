<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import AppLayout from '../layouts/AppLayout.vue'
import { StatusPill, Badge } from '@prodigy/ui'
import { apiFetch } from '../composables/useApi'
import { useWebSocket } from '../composables/useWebSocket'

interface User {
  id: string
  email: string
  status: string
  kycStatus: string
  riskLevel: string
  createdAt: string
}

interface UsersResponse {
  items: User[]
  total: number
}

const router = useRouter()
const route = useRoute()
const { connected } = useWebSocket()

const kycStatusFilter = ref('')
const statusFilter = ref('')

const queryParams = computed(() => {
  const params = new URLSearchParams()
  params.set('limit', '50')
  params.set('offset', '0')
  if (kycStatusFilter.value) params.set('kycStatus', kycStatusFilter.value)
  if (statusFilter.value) params.set('status', statusFilter.value)
  return params.toString()
})

const { data, isLoading } = useQuery({
  queryKey: computed(() => ['users', kycStatusFilter.value, statusFilter.value]),
  queryFn: () => apiFetch<UsersResponse>(`/api/users?${queryParams.value}`),
})

const users = computed(() => data.value?.items ?? [])
const total = computed(() => data.value?.total ?? 0)

const hasPanelOpen = computed(() => !!route.params.id)

function riskVariant(level: string): 'success' | 'warning' | 'danger' | 'neutral' {
  if (level === 'low') return 'success'
  if (level === 'medium') return 'warning'
  if (level === 'high') return 'danger'
  return 'neutral'
}

function formatDate(ts: string) {
  return new Date(ts).toLocaleDateString()
}

function openUser(id: string) {
  router.push(`/users/${id}`)
}
</script>

<template>
  <AppLayout :ws-connected="connected">
    <div class="flex h-full">
      <!-- Main table area -->
      <div class="flex-1 overflow-y-auto p-6">
        <!-- Header -->
        <div class="flex items-center justify-between mb-4">
          <div>
            <h1 class="text-xl font-semibold text-slate-900">Users</h1>
            <p class="text-sm text-slate-500 mt-0.5">{{ total.toLocaleString() }} total users</p>
          </div>
        </div>

        <!-- Filter bar -->
        <div class="flex items-center gap-3 mb-4">
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
          <select
            v-model="statusFilter"
            class="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="banned">Banned</option>
          </select>
        </div>

        <!-- Table -->
        <div class="bg-white rounded-lg border border-slate-200 shadow-panel overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-slate-200 bg-slate-50">
                <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide align-top">Email</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide align-top">KYC Status</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide align-top">Risk Level</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide align-top">Status</th>
                <th class="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wide align-top">Created</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isLoading">
                <td colspan="5" class="px-4 py-8 text-center text-sm text-slate-400">Loading...</td>
              </tr>
              <tr
                v-for="user in users"
                :key="user.id"
                class="border-b border-slate-100 even:bg-slate-50 hover:bg-brand-50 cursor-pointer transition-colors"
                :class="route.params.id === user.id ? 'bg-brand-50' : ''"
                @click="openUser(user.id)"
              >
                <td class="px-4 py-3 align-top text-slate-800">{{ user.email }}</td>
                <td class="px-4 py-3 align-top"><StatusPill :status="user.kycStatus" /></td>
                <td class="px-4 py-3 align-top">
                  <Badge :variant="riskVariant(user.riskLevel)">{{ user.riskLevel }}</Badge>
                </td>
                <td class="px-4 py-3 align-top"><StatusPill :status="user.status" /></td>
                <td class="px-4 py-3 align-top text-right text-slate-500 text-xs">{{ formatDate(user.createdAt) }}</td>
              </tr>
              <tr v-if="!isLoading && users.length === 0">
                <td colspan="5" class="px-4 py-8 text-center text-sm text-slate-400">No users found</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Side panel -->
      <RouterView v-if="hasPanelOpen" />
    </div>
  </AppLayout>
</template>
