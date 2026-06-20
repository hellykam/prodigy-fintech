<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { Users, AlertCircle } from 'lucide-vue-next'
// EmptyState icon is a string (emoji), not a component
import AppLayout from '../layouts/AppLayout.vue'
import { apiFetch } from '../composables/useApi'
import { useAuthStore } from '../stores/auth'
import { StatusPill, Card, SidePanel, DefinitionList, EmptyState } from '@prodigy/ui'

interface EndUser {
  id: string
  email: string
  status: string
  kycStatus: string
  attributedToB2BClientId: string | null
  createdAt: string
}

interface UsersResponse {
  items: EndUser[]
  total: number
}

const authStore = useAuthStore()
const selectedUser = ref<EndUser | null>(null)
const panelOpen = ref(false)

const b2bClientId = computed(() => authStore.user?.attributedToB2BClientId ?? null)

const { data, isPending, isError, error, refetch } = useQuery({
  queryKey: ['partner-users', b2bClientId],
  queryFn: () => apiFetch<UsersResponse>(`/users?b2bClientId=${b2bClientId.value}&limit=50`),
  enabled: computed(() => !!b2bClientId.value),
})

const endUsers = computed(() => data.value?.items ?? [])

function openPanel(user: EndUser) {
  selectedUser.value = user
  panelOpen.value = true
}

function closePanel() {
  panelOpen.value = false
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

const selectedUserItems = computed(() => {
  const u = selectedUser.value
  if (!u) return []
  return [
    { label: 'User ID', value: u.id },
    { label: 'Email', value: u.email },
    { label: 'KYC Status', value: u.kycStatus, type: 'status' as const },
    { label: 'Account Status', value: u.status, type: 'status' as const },
    { label: 'Created At', value: formatDate(u.createdAt) },
    {
      label: 'Admin link',
      value: 'View in Admin →',
      type: 'link' as const,
      href: 'http://localhost:5002/customers',
    },
  ]
})
</script>

<template>
  <AppLayout>
    <div class="flex h-full overflow-hidden">
      <!-- Main area -->
      <div class="flex-1 overflow-y-auto p-8">
        <!-- Header -->
        <div class="mb-6 flex items-center gap-3">
          <div class="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
            <Users class="w-5 h-5 text-brand-600" />
          </div>
          <div>
            <h1 class="text-xl font-semibold text-slate-900">End Users</h1>
            <p class="text-slate-500 text-sm mt-0.5">
              Users attributed to your partner account
            </p>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="isPending" class="bg-white rounded-xl border border-slate-100 overflow-hidden">
          <div class="h-12 bg-slate-50 border-b border-slate-100" />
          <div v-for="i in 8" :key="i" class="flex gap-4 px-5 py-3 border-b border-slate-50">
            <div class="h-4 bg-slate-100 rounded animate-pulse w-20" />
            <div class="h-4 bg-slate-100 rounded animate-pulse w-40" />
            <div class="h-4 bg-slate-100 rounded animate-pulse w-20" />
            <div class="h-4 bg-slate-100 rounded animate-pulse w-24 ml-auto" />
          </div>
        </div>

        <!-- No b2bClientId warning -->
        <div
          v-else-if="!b2bClientId"
          class="rounded-lg border border-warning-200 bg-warning-50 px-5 py-4 text-sm text-warning-700"
        >
          No B2B client associated with your account. Please contact support.
        </div>

        <!-- Error state -->
        <div v-else-if="isError" class="flex flex-col items-center py-20 text-center">
          <div class="w-12 h-12 rounded-full bg-danger-50 flex items-center justify-center mb-4">
            <AlertCircle class="w-6 h-6 text-danger-500" />
          </div>
          <p class="text-slate-700 font-medium mb-1">Couldn't load data</p>
          <p class="text-slate-400 text-sm mb-4">{{ (error as Error)?.message || 'Something went wrong' }}</p>
          <button @click="refetch()" class="text-sm text-brand-600 font-medium hover:underline">Try again</button>
        </div>

        <!-- Empty state -->
        <EmptyState
          v-else-if="endUsers.length === 0"
          title="No users attributed to your account"
          description="Users who register via your widget will appear here"
          icon="👥"
        />

        <!-- Table -->
        <Card v-else class="p-0 overflow-hidden">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-100">
                <th class="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-2.5">ID</th>
                <th class="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-2.5">Email</th>
                <th class="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-2.5">KYC Status</th>
                <th class="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-2.5">Created At</th>
                <th class="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-2.5">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="user in endUsers"
                :key="user.id"
                class="border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer"
                tabindex="0"
                role="button"
                :aria-label="`View user ${user.email}`"
                @click="openPanel(user)"
                @keydown.enter="openPanel(user)"
                @keydown.space.prevent="openPanel(user)"
              >
                <td class="px-5 py-3">
                  <span class="font-mono text-xs text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                    {{ user.id.slice(0, 8) }}
                  </span>
                </td>
                <td class="px-4 py-3 text-slate-900 text-sm">{{ user.email }}</td>
                <td class="px-4 py-3">
                  <StatusPill :status="user.kycStatus" />
                </td>
                <td class="px-4 py-3 text-slate-500 text-xs">{{ formatDate(user.createdAt) }}</td>
                <td class="px-4 py-3">
                  <StatusPill :status="user.status" />
                </td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>

      <!-- Side panel -->
      <SidePanel
        :open="panelOpen"
        :title="selectedUser?.email ?? 'User Detail'"
        @close="closePanel"
      >
        <DefinitionList :items="selectedUserItems" />
      </SidePanel>
    </div>
  </AppLayout>
</template>
