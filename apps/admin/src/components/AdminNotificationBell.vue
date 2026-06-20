<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { Bell, X } from 'lucide-vue-next'
import { Button, StatusPill } from '@prodigy/ui'
import { apiFetch } from '../composables/useApi'

interface Notification {
  id: string
  title: string
  body: string
  urgency: 'info' | 'warning' | 'error' | 'success'
  isRead: boolean
  createdAt: string
}

interface NotificationsResponse {
  items: Notification[]
}

const queryClient = useQueryClient()
const panelOpen = ref(false)
const panelRef = ref<HTMLDivElement | null>(null)

const { data } = useQuery({
  queryKey: ['notifications'],
  queryFn: () => apiFetch<NotificationsResponse>('/api/notifications'),
  refetchInterval: 30000,
})

// Only admin-relevant: error and warning urgency
const adminNotifications = computed(() =>
  (data.value?.items ?? []).filter(
    (n) => n.urgency === 'error' || n.urgency === 'warning',
  ),
)

const unreadCount = computed(() =>
  adminNotifications.value.filter((n) => !n.isRead).length,
)

const unreadBadge = computed(() => {
  const c = unreadCount.value
  return c > 9 ? '9+' : c > 0 ? String(c) : ''
})

function togglePanel() {
  panelOpen.value = !panelOpen.value
}

function closePanel() {
  panelOpen.value = false
}

// Close on outside click
function onClickOutside(e: MouseEvent) {
  if (!panelRef.value) return
  if (!panelRef.value.contains(e.target as Node)) {
    panelOpen.value = false
  }
}

onMounted(() => document.addEventListener('mousedown', onClickOutside))
onUnmounted(() => document.removeEventListener('mousedown', onClickOutside))

const markAllMutation = useMutation({
  mutationFn: () =>
    apiFetch<{ ok: boolean }>('/api/notifications/read-all', { method: 'POST' }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['notifications'] })
  },
})

const markOneMutation = useMutation({
  mutationFn: (id: string) =>
    apiFetch<{ ok: boolean }>(`/api/notifications/${id}/read`, { method: 'POST' }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['notifications'] })
  },
})

function urgencyToStatus(urgency: string): string {
  if (urgency === 'error') return 'rejected'
  if (urgency === 'warning') return 'pending'
  return urgency
}

function formatDate(ts: string) {
  return new Date(ts).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  })
}
</script>

<template>
  <div ref="panelRef" class="relative">
    <!-- Bell button -->
    <button
      type="button"
      class="relative flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      :aria-label="`Notifications${unreadCount > 0 ? ` (${unreadBadge} unread)` : ''}`"
      :aria-expanded="panelOpen"
      @click="togglePanel"
    >
      <Bell class="h-4 w-4" />
      <!-- Unread badge -->
      <span
        v-if="unreadBadge"
        class="absolute -right-0.5 -top-0.5 flex min-w-[1rem] items-center justify-center rounded-full bg-danger-500 px-0.5 text-[10px] font-bold leading-4 text-white"
        aria-hidden="true"
      >
        {{ unreadBadge }}
      </span>
    </button>

    <!-- Slide-in panel -->
    <Transition
      enter-active-class="transition-transform duration-200 ease-out"
      enter-from-class="translate-x-4 opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transition-transform duration-150 ease-in"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="translate-x-4 opacity-0"
    >
      <div
        v-if="panelOpen"
        class="fixed right-4 top-14 z-50 w-80 rounded-lg border border-slate-200 bg-white shadow-xl flex flex-col overflow-hidden"
        role="dialog"
        aria-label="Notifications"
      >
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <h2 class="text-sm font-semibold text-slate-900">Notifications</h2>
          <div class="flex items-center gap-2">
            <button
              v-if="unreadCount > 0"
              type="button"
              class="text-xs font-medium text-brand-600 hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
              :disabled="markAllMutation.isPending.value"
              @click="markAllMutation.mutate()"
            >
              Mark all read
            </button>
            <button
              type="button"
              class="flex h-6 w-6 items-center justify-center rounded text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              aria-label="Close notifications"
              @click="closePanel"
            >
              <X class="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <!-- Notifications list -->
        <div class="max-h-[70vh] overflow-y-auto divide-y divide-slate-50">
          <div
            v-if="adminNotifications.length === 0"
            class="px-4 py-8 text-center text-sm text-slate-400"
          >
            No alerts to show.
          </div>

          <div
            v-for="item in adminNotifications"
            :key="item.id"
            class="flex gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
            :class="{ 'bg-slate-50/50': !item.isRead }"
          >
            <!-- Unread dot -->
            <div class="mt-1 flex-shrink-0">
              <span
                v-if="!item.isRead"
                class="inline-block h-2 w-2 rounded-full bg-brand-500"
                aria-label="Unread"
              />
              <span v-else class="inline-block h-2 w-2 rounded-full bg-slate-200" />
            </div>

            <!-- Content -->
            <div class="min-w-0 flex-1">
              <div class="flex items-start justify-between gap-2">
                <p class="text-xs font-semibold text-slate-900 leading-snug">{{ item.title }}</p>
                <StatusPill :status="urgencyToStatus(item.urgency)" />
              </div>
              <p class="mt-0.5 text-xs text-slate-600 leading-relaxed">{{ item.body }}</p>
              <div class="mt-1.5 flex items-center justify-between gap-2">
                <span class="text-[11px] text-slate-400">{{ formatDate(item.createdAt) }}</span>
                <button
                  v-if="!item.isRead"
                  type="button"
                  class="text-[11px] font-medium text-brand-600 hover:text-brand-800 focus-visible:outline-none rounded"
                  :disabled="markOneMutation.isPending.value"
                  @click="markOneMutation.mutate(item.id)"
                >
                  Mark read
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
