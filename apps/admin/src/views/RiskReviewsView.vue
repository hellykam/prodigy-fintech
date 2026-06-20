<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import AppLayout from '../layouts/AppLayout.vue'
import { StatusPill, Badge } from '@prodigy/ui'
import { apiFetch } from '../composables/useApi'
import { useWebSocket } from '../composables/useWebSocket'

interface RiskReview {
  id: string
  status: string
  riskScore: number
  riskReasons: string  // comma-separated string
  transactionId: string
  decision: string | null
  createdAt: string
  transaction?: {
    id: string
    sourceCurrency: string
    sourceAmount: number
    targetCurrency: string
    targetAmount: number
    user?: { email: string }
  }
}

interface RiskResponse {
  reviews: RiskReview[]
}

const router = useRouter()
const route = useRoute()
const { connected } = useWebSocket()

const statusFilter = ref('')

const { data, isLoading } = useQuery({
  queryKey: computed(() => ['risk-reviews', statusFilter.value]),
  queryFn: () => {
    const params = new URLSearchParams()
    if (statusFilter.value) params.set('status', statusFilter.value)
    return apiFetch<RiskResponse>(`/api/risk-reviews?${params.toString()}`)
  },
})

const reviews = computed(() => data.value?.reviews ?? [])
const hasPanelOpen = computed(() => !!route.params.id)

function riskScoreClass(score: number) {
  if (score < 40) return 'bg-success-50 text-success-700'
  if (score < 70) return 'bg-warning-50 text-warning-700'
  return 'bg-danger-50 text-danger-700'
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
            <h1 class="text-xl font-semibold text-slate-900">Manual Reviews</h1>
            <p class="text-sm text-slate-500 mt-0.5">{{ reviews.length }} reviews</p>
          </div>
        </div>

        <!-- Filter -->
        <div class="flex items-center gap-3 mb-4">
          <select
            v-model="statusFilter"
            class="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="">All Statuses</option>
            <option value="open">Open</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <!-- Table -->
        <div class="bg-white rounded-lg border border-slate-200 shadow-panel overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-slate-200 bg-slate-50">
                <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide align-top">Transaction ID</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide align-top">User</th>
                <th class="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wide align-top">Risk Score</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide align-top">Reasons</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide align-top">Status</th>
                <th class="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wide align-top">Created</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isLoading">
                <td colspan="6" class="px-4 py-8 text-center text-sm text-slate-400">Loading...</td>
              </tr>
              <tr
                v-for="review in reviews"
                :key="review.id"
                class="border-b border-slate-100 even:bg-slate-50 hover:bg-brand-50 cursor-pointer transition-colors"
                :class="route.params.id === review.id ? 'bg-brand-50' : ''"
                @click="router.push(`/risk-reviews/${review.id}`)"
              >
                <td class="px-4 py-3 align-top">
                  <span class="font-mono text-xs text-slate-600">{{ review.transactionId.slice(0, 8) }}</span>
                </td>
                <td class="px-4 py-3 align-top text-slate-700">{{ review.transaction?.user?.email ?? '—' }}</td>
                <td class="px-4 py-3 align-top text-right">
                  <span
                    class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                    :class="riskScoreClass(review.riskScore)"
                  >
                    {{ review.riskScore }}
                  </span>
                </td>
                <td class="px-4 py-3 align-top">
                  <div class="flex flex-wrap gap-1">
                    <Badge
                      v-for="reason in (review.riskReasons ?? '').split(',').filter(Boolean).slice(0, 3)"
                      :key="reason"
                      variant="warning"
                    >
                      {{ reason.replace(/_/g, ' ') }}
                    </Badge>
                  </div>
                </td>
                <td class="px-4 py-3 align-top"><StatusPill :status="review.status" /></td>
                <td class="px-4 py-3 align-top text-right text-xs text-slate-500">{{ formatDate(review.createdAt) }}</td>
              </tr>
              <tr v-if="!isLoading && reviews.length === 0">
                <td colspan="6" class="px-4 py-8 text-center text-sm text-slate-400">No reviews found</td>
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
