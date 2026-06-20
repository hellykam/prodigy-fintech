<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Home, TrendingUp, ArrowDownUp, Clock, User, Gift, Mail } from 'lucide-vue-next'
import { useQuery } from '@tanstack/vue-query'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const auth = useAuthStore()

const tabs = [
  { label: 'Home', icon: Home, to: '/home' },
  { label: 'Buy', icon: TrendingUp, to: '/buy' },
  { label: 'Swap', icon: ArrowDownUp, to: '/swap' },
  { label: 'Activity', icon: Clock, to: '/transactions' },
  { label: 'Rewards', icon: Gift, to: '/rewards' },
  { label: 'Inbox', icon: Mail, to: '/inbox' },
  { label: 'Profile', icon: User, to: '/profile' },
]

const { data: notifData } = useQuery({
  queryKey: ['notifications', auth.user?.id],
  queryFn: async () => {
    const res = await fetch(`/api/notifications?userId=${auth.user!.id}`)
    if (!res.ok) return { items: [] }
    return res.json()
  },
  enabled: computed(() => !!auth.user?.id),
  refetchInterval: 30000,
})

const unreadCount = computed(() => {
  const items: any[] = notifData.value?.items ?? []
  return items.filter((n) => !n.isRead).length
})

function isActive(path: string) {
  return route.path === path || route.path.startsWith(path + '/')
}
</script>

<template>
  <nav class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-slate-200 z-40">
    <div class="flex items-center justify-around">
      <RouterLink
        v-for="tab in tabs"
        :key="tab.to"
        :to="tab.to"
        class="flex flex-col items-center gap-0.5 py-2 px-3 min-w-[50px] transition-colors relative"
        :class="isActive(tab.to) ? 'text-brand-600' : 'text-slate-400'"
      >
        <div class="relative">
          <component :is="tab.icon" :size="22" :stroke-width="isActive(tab.to) ? 2.5 : 1.8" />
          <!-- Unread badge for Inbox -->
          <span
            v-if="tab.to === '/inbox' && unreadCount > 0"
            class="absolute -top-1 -right-1 min-w-[14px] h-[14px] bg-danger-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5"
          >
            {{ unreadCount > 9 ? '9+' : unreadCount }}
          </span>
        </div>
        <span class="text-[10px] font-medium">{{ tab.label }}</span>
      </RouterLink>
    </div>
    <!-- iOS safe area spacer -->
    <div class="h-safe-area-inset-bottom" style="height: env(safe-area-inset-bottom, 0px)" />
  </nav>
</template>
