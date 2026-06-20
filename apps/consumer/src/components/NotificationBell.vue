<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { Bell, X } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const qc = useQueryClient()
const open = ref(false)

interface Notification {
  id: string
  type: string
  title: string
  body: string
  urgency: string
  isRead: boolean
  actionUrl?: string
  createdAt: string
}

const { data } = useQuery({
  queryKey: ['notifications', auth.user?.id],
  queryFn: async () => {
    const res = await fetch(`/api/notifications?userId=${auth.user!.id}`)
    if (!res.ok) return { items: [] as Notification[] }
    return res.json() as Promise<{ items: Notification[] }>
  },
  enabled: computed(() => !!auth.user?.id),
  refetchInterval: 30000,
})

const notifications = computed(() => data.value?.items ?? [])
const unreadCount = computed(() => notifications.value.filter((n) => !n.isRead).length)
const badgeLabel = computed(() => (unreadCount.value > 9 ? '9+' : String(unreadCount.value)))

const markRead = useMutation({
  mutationFn: (id: string) => fetch(`/api/notifications/${id}/read`, { method: 'POST' }),
  onSuccess: () => qc.invalidateQueries({ queryKey: ['notifications'] }),
})

const markAllRead = useMutation({
  mutationFn: () =>
    fetch('/api/notifications/read-all', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: auth.user!.id }),
    }),
  onSuccess: () => qc.invalidateQueries({ queryKey: ['notifications'] }),
})

function formatTime(dateStr: string) {
  const d = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  if (diff < 60000) return 'Just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}
</script>

<template>
  <div class="relative">
    <button
      @click="open = !open"
      class="relative p-2 text-slate-600 hover:text-slate-900 transition"
      aria-label="Notifications"
    >
      <Bell :size="20" />
      <span
        v-if="unreadCount > 0"
        class="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-danger-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1"
      >
        {{ badgeLabel }}
      </span>
    </button>

    <!-- Panel -->
    <Transition name="slide-in">
      <div
        v-if="open"
        class="fixed inset-y-0 right-0 w-80 bg-white shadow-2xl z-50 flex flex-col border-l border-slate-100"
      >
        <div class="flex items-center justify-between px-4 py-4 border-b border-slate-100">
          <h2 class="font-semibold text-slate-900">Notifications</h2>
          <div class="flex items-center gap-2">
            <button
              v-if="unreadCount > 0"
              @click="markAllRead.mutate()"
              class="text-xs text-brand-600 hover:underline"
            >
              Mark all read
            </button>
            <button @click="open = false" class="p-1 text-slate-400 hover:text-slate-700">
              <X :size="18" />
            </button>
          </div>
        </div>
        <div class="flex-1 overflow-y-auto">
          <div v-if="notifications.length === 0" class="p-8 text-center text-slate-400 text-sm">
            No notifications
          </div>
          <button
            v-for="n in notifications"
            :key="n.id"
            @click="() => { markRead.mutate(n.id) }"
            class="w-full text-left px-4 py-3 border-b border-slate-50 hover:bg-slate-50 transition"
            :class="{ 'bg-brand-50/50': !n.isRead }"
          >
            <div class="flex items-start gap-2.5">
              <div
                :class="[
                  'w-2 h-2 rounded-full mt-1.5 shrink-0',
                  n.isRead ? 'bg-slate-200' : 'bg-brand-500',
                ]"
              />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-slate-900">{{ n.title }}</p>
                <p class="text-xs text-slate-500 mt-0.5 line-clamp-2">{{ n.body }}</p>
                <p class="text-[10px] text-slate-400 mt-1">{{ formatTime(n.createdAt) }}</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </Transition>
    <!-- Backdrop -->
    <div v-if="open" @click="open = false" class="fixed inset-0 z-40 bg-black/20" />
  </div>
</template>

<style scoped>
.slide-in-enter-active,
.slide-in-leave-active {
  transition: transform 0.25s ease;
}
.slide-in-enter-from,
.slide-in-leave-to {
  transform: translateX(100%);
}
</style>
