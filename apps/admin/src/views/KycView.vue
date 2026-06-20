<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import AppLayout from '../layouts/AppLayout.vue'
import { StatusPill, Badge, Button } from '@prodigy/ui'
import { apiFetch } from '../composables/useApi'
import { useWebSocket } from '../composables/useWebSocket'

interface KycApplicant {
  id: string
  status: string
  levelName: string
  firstName: string
  lastName: string
  country: string
  createdAt: string
  user?: { email: string }
}

interface KycResponse {
  applicants: KycApplicant[]
}

const router = useRouter()
const route = useRoute()
const { connected } = useWebSocket()
const queryClient = useQueryClient()

const statusFilter = ref('')

const { data, isLoading } = useQuery({
  queryKey: computed(() => ['kyc-applicants', statusFilter.value]),
  queryFn: () => {
    const params = new URLSearchParams()
    if (statusFilter.value) params.set('status', statusFilter.value)
    return apiFetch<KycResponse>(`/api/kyc/applicants?${params.toString()}`)
  },
})

const applicants = computed(() => data.value?.items ?? [])
const hasPanelOpen = computed(() => !!route.params.id)

const approveMutation = useMutation({
  mutationFn: (id: string) =>
    apiFetch(`/api/kyc/applicants/${id}/approve`, {
      method: 'POST',
      body: JSON.stringify({ reviewedBy: 'admin@prodigy.com' }),
    }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['kyc-applicants'] })
  },
})

const rejectMutation = useMutation({
  mutationFn: (id: string) =>
    apiFetch(`/api/kyc/applicants/${id}/reject`, {
      method: 'POST',
      body: JSON.stringify({ reviewedBy: 'admin@prodigy.com', reason: 'document_rejected' }),
    }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['kyc-applicants'] })
  },
})

function levelVariant(level: string): 'default' | 'info' | 'warning' {
  if (level === 'enhanced') return 'warning'
  if (level === 'standard') return 'info'
  return 'default'
}

function formatDate(ts: string) {
  return new Date(ts).toLocaleDateString()
}
</script>

<template>
  <AppLayout :ws-connected="connected">
    <div class="flex h-full">
      <div class="flex-1 overflow-y-auto p-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h1 class="text-xl font-semibold text-slate-900">KYC Queue</h1>
            <p class="text-sm text-slate-500 mt-0.5">{{ applicants.length }} applicants</p>
          </div>
        </div>

        <!-- Filter bar -->
        <div class="flex items-center gap-3 mb-4">
          <select
            v-model="statusFilter"
            class="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="manual_review">Manual Review</option>
          </select>
        </div>

        <!-- Table -->
        <div class="bg-white rounded-lg border border-slate-200 shadow-panel overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-slate-200 bg-slate-50">
                <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide align-top">Email</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide align-top">Name</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide align-top">Status</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide align-top">Country</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide align-top">Level</th>
                <th class="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wide align-top">Submitted</th>
                <th class="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wide align-top">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isLoading">
                <td colspan="7" class="px-4 py-8 text-center text-sm text-slate-400">Loading...</td>
              </tr>
              <tr
                v-for="applicant in applicants"
                :key="applicant.id"
                class="border-b border-slate-100 even:bg-slate-50 hover:bg-brand-50 cursor-pointer transition-colors"
                :class="route.params.id === applicant.id ? 'bg-brand-50' : ''"
                @click="router.push(`/kyc/${applicant.id}`)"
              >
                <td class="px-4 py-3 align-top text-slate-700">{{ applicant.user?.email ?? '—' }}</td>
                <td class="px-4 py-3 align-top text-slate-700">{{ applicant.firstName }} {{ applicant.lastName }}</td>
                <td class="px-4 py-3 align-top"><StatusPill :status="applicant.status" /></td>
                <td class="px-4 py-3 align-top text-slate-600">{{ applicant.country }}</td>
                <td class="px-4 py-3 align-top">
                  <Badge :variant="levelVariant(applicant.levelName)">{{ applicant.levelName }}</Badge>
                </td>
                <td class="px-4 py-3 align-top text-right text-xs text-slate-500">{{ formatDate(applicant.createdAt) }}</td>
                <td class="px-4 py-3 align-top text-right" @click.stop>
                  <div
                    v-if="applicant.status === 'pending' || applicant.status === 'manual_review'"
                    class="inline-flex items-center gap-1.5"
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      :disabled="approveMutation.isPending.value"
                      @click="approveMutation.mutate(applicant.id)"
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      :disabled="rejectMutation.isPending.value"
                      @click="rejectMutation.mutate(applicant.id)"
                    >
                      Reject
                    </Button>
                  </div>
                </td>
              </tr>
              <tr v-if="!isLoading && applicants.length === 0">
                <td colspan="7" class="px-4 py-8 text-center text-sm text-slate-400">No applicants found</td>
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
