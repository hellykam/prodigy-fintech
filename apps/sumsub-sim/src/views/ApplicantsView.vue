<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute, RouterView } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import { Users, RefreshCw } from 'lucide-vue-next'
import { StatusPill, EmptyState } from '@prodigy/ui'
import { apiFetch } from '../composables/useApi'
import { useWebSocket } from '../composables/useWebSocket'

interface KycApplicant {
  id: string
  status: string
  levelName: string
  firstName: string
  lastName: string
  dateOfBirth: string
  country: string
  documentType: string
  documentStatus: string
  createdAt: string
  user?: { email: string; kycStatus: string }
}

const router = useRouter()
const route = useRoute()
const { connected } = useWebSocket()

const statusFilter = ref<string>('all')

const statusOptions = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'manual_review', label: 'Manual Review' },
]

const { data, isLoading, isError, refetch } = useQuery({
  queryKey: ['kyc-applicants'],
  queryFn: () => apiFetch<{ applicants: KycApplicant[] }>('/kyc/applicants'),
  refetchInterval: 10000,
})

const applicants = computed(() => data.value?.applicants ?? [])

const filtered = computed(() => {
  if (statusFilter.value === 'all') return applicants.value
  return applicants.value.filter((a) => a.status === statusFilter.value)
})

const activeId = computed(() => route.params.id as string | undefined)

// Stats
const totalCount = computed(() => applicants.value.length)
const pendingCount = computed(() => applicants.value.filter((a) => a.status === 'pending' || a.status === 'manual_review').length)
const approvedCount = computed(() => applicants.value.filter((a) => a.status === 'approved').length)
const rejectedCount = computed(() => applicants.value.filter((a) => a.status === 'rejected').length)

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function openDetail(id: string) {
  router.push(`/applicants/${id}`)
}
</script>

<template>
  <div class="flex h-screen w-screen overflow-hidden bg-slate-100">
    <!-- Sidebar -->
    <aside class="flex flex-col w-56 shrink-0 bg-emerald-900 text-white">
      <div class="px-5 py-5 border-b border-emerald-800">
        <span class="text-xl font-bold text-emerald-400 tracking-tight">Sumsub</span>
        <p class="text-xs text-emerald-500 mt-0.5">KYC Review Portal</p>
      </div>
      <nav class="flex-1 py-4 px-2">
        <router-link
          to="/applicants"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-emerald-100 bg-emerald-800 transition-colors"
        >
          <Users class="w-4 h-4 shrink-0" />
          Applicants
        </router-link>
      </nav>
      <div class="px-4 py-4 border-t border-emerald-800">
        <div class="flex items-center gap-2 text-xs text-emerald-400">
          <span
            :class="[
              'w-2 h-2 rounded-full shrink-0',
              connected ? 'bg-emerald-400' : 'bg-slate-500',
            ]"
          />
          {{ connected ? 'Live' : 'Reconnecting…' }}
        </div>
      </div>
    </aside>

    <!-- Main -->
    <div class="flex flex-1 overflow-hidden">
      <div class="flex flex-col flex-1 overflow-hidden">
        <!-- Top bar -->
        <header class="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shrink-0">
          <div>
            <h1 class="text-base font-semibold text-slate-900">Applicant Queue</h1>
            <p class="text-xs text-slate-500 mt-0.5">
              {{ filtered.length }} applicant{{ filtered.length !== 1 ? 's' : '' }}
            </p>
          </div>
          <button
            class="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 transition-colors"
            @click="() => refetch()"
          >
            <RefreshCw class="w-3.5 h-3.5" />
            Refresh
          </button>
        </header>

        <!-- Stats bar -->
        <div class="bg-white border-b border-slate-100 px-6 py-2 flex items-center gap-3 shrink-0">
          <span class="text-xs text-slate-500 font-medium mr-1">Stats:</span>
          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
            Total <span class="font-bold">{{ totalCount }}</span>
          </span>
          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-warning-50 text-warning-700">
            Pending <span class="font-bold">{{ pendingCount }}</span>
          </span>
          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-success-50 text-success-700">
            Approved <span class="font-bold">{{ approvedCount }}</span>
          </span>
          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-danger-50 text-danger-700">
            Rejected <span class="font-bold">{{ rejectedCount }}</span>
          </span>
        </div>

        <!-- Filter bar -->
        <div class="bg-white border-b border-slate-200 px-6 py-2.5 flex items-center gap-2 shrink-0">
          <span class="text-xs font-medium text-slate-500 mr-1">Status:</span>
          <button
            v-for="opt in statusOptions"
            :key="opt.value"
            :class="[
              'px-3 py-1 rounded-full text-xs font-medium transition-colors',
              statusFilter === opt.value
                ? 'bg-emerald-700 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
            ]"
            @click="statusFilter = opt.value"
          >
            {{ opt.label }}
          </button>
        </div>

        <!-- Table area -->
        <div class="flex-1 overflow-auto">
          <!-- Skeleton loading -->
          <div v-if="isLoading" class="p-4 space-y-3">
            <div v-for="i in 5" :key="i" class="flex items-center gap-4 px-4 py-3 bg-white rounded-lg">
              <div class="flex flex-col gap-1.5 flex-1">
                <div class="skeleton w-32 h-3.5" />
                <div class="skeleton w-20 h-2.5" />
              </div>
              <div class="skeleton w-40 h-3.5" />
              <div class="skeleton w-16 h-3.5" />
              <div class="skeleton w-20 h-3.5" />
              <div class="skeleton w-16 h-5 rounded-full" />
              <div class="skeleton w-16 h-5 rounded-full" />
              <div class="skeleton w-20 h-3.5" />
            </div>
          </div>

          <div v-else-if="isError" class="p-6">
            <EmptyState
              title="Failed to load applicants"
              description="Could not reach the backend. Make sure the API is running on port 3000."
              icon="⚠️"
            />
          </div>

          <div v-else-if="filtered.length === 0" class="p-6">
            <EmptyState
              title="No applicants found"
              description="There are no applicants matching the current filter."
              icon="🔍"
            />
          </div>

          <table v-else class="w-full text-sm border-collapse">
            <thead class="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Name</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Email</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Country</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">KYC Level</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Document</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Created</th>
              </tr>
            </thead>
            <TransitionGroup name="table-row" tag="tbody" class="divide-y divide-slate-100">
              <tr
                v-for="applicant in filtered"
                :key="applicant.id"
                :class="[
                  'cursor-pointer transition-colors',
                  activeId === applicant.id
                    ? 'bg-emerald-50 border-l-2 border-l-emerald-500'
                    : 'bg-white hover:bg-slate-50',
                ]"
                @click="openDetail(applicant.id)"
              >
                <td class="px-4 py-3 align-top">
                  <div class="font-medium text-slate-900">
                    {{ applicant.firstName }} {{ applicant.lastName }}
                  </div>
                  <div class="text-xs text-slate-400 font-mono mt-0.5">{{ applicant.id }}</div>
                </td>
                <td class="px-4 py-3 align-top text-slate-600">
                  {{ applicant.user?.email ?? '—' }}
                </td>
                <td class="px-4 py-3 align-top text-slate-600">
                  {{ applicant.country }}
                </td>
                <td class="px-4 py-3 align-top">
                  <span class="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                    {{ applicant.levelName }}
                  </span>
                </td>
                <td class="px-4 py-3 align-top">
                  <StatusPill :status="applicant.status" />
                </td>
                <td class="px-4 py-3 align-top">
                  <StatusPill :status="applicant.documentStatus" />
                </td>
                <td class="px-4 py-3 align-top text-slate-500 text-xs whitespace-nowrap">
                  {{ formatDate(applicant.createdAt) }}
                </td>
              </tr>
            </TransitionGroup>
          </table>
        </div>
      </div>

      <!-- Detail panel slot -->
      <RouterView />
    </div>
  </div>
</template>

<style>
@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
.skeleton { background: linear-gradient(90deg, #ecfdf5 25%, #d1fae5 50%, #ecfdf5 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; border-radius: 4px; height: 14px; }

.table-row-enter-active { transition: all 0.3s ease-out; }
.table-row-enter-from { opacity: 0; transform: translateY(-8px); }
.table-row-leave-active { transition: none; position: absolute; }
</style>
