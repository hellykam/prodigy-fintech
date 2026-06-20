<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Zap, Home, ArrowUpDown, ArrowDownUp, Send, ArrowDownLeft, LayoutList, Gift, Mail, Users } from 'lucide-vue-next'
import BottomTabNav from './BottomTabNav.vue'
import ToastContainer from './ToastContainer.vue'
import NotificationBell from './NotificationBell.vue'
import { useAuthStore } from '@/stores/auth'
import { connected as wsConnected } from '@/composables/useWebSocket'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

// Reconnect banner: show green flash for 2s after WS reconnects
const justReconnected = ref(false)
watch(wsConnected, (newVal, oldVal) => {
  if (newVal && !oldVal) {
    justReconnected.value = true
    setTimeout(() => {
      justReconnected.value = false
    }, 2000)
  }
})

const navLinks = [
  { label: 'Home', to: '/home', icon: Home },
  { label: 'Buy', to: '/buy', icon: ArrowUpDown },
  { label: 'Sell', to: '/sell', icon: ArrowUpDown },
  { label: 'Swap', to: '/swap', icon: ArrowDownUp },
  { label: 'Send', to: '/send', icon: Send },
  { label: 'Receive', to: '/receive', icon: ArrowDownLeft },
  { label: 'Activity', to: '/transactions', icon: LayoutList },
  { label: 'Beneficiaries', to: '/beneficiaries', icon: Users },
  { label: 'Rewards', to: '/rewards', icon: Gift },
  { label: 'Inbox', to: '/inbox', icon: Mail },
]
</script>

<template>
  <div class="min-h-screen bg-surface-subtle flex">
    <!-- Reconnect banner -->
    <Transition name="reconnect-fade">
      <div
        v-if="!wsConnected"
        class="fixed top-0 left-0 right-0 z-[100] h-8 bg-warning-500 text-white text-xs font-medium flex items-center justify-center gap-2"
      >
        <svg class="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        Reconnecting to server…
      </div>
    </Transition>

    <!-- Connected flash -->
    <Transition name="reconnect-fade">
      <div
        v-if="justReconnected"
        class="fixed top-0 left-0 right-0 z-[100] h-8 bg-success-500 text-white text-xs font-medium flex items-center justify-center gap-1.5"
      >
        ✓ Connected
      </div>
    </Transition>

    <!-- Desktop sidebar (lg+) -->
    <aside class="hidden lg:flex flex-col w-60 min-h-screen bg-white border-r border-slate-100 shrink-0">
      <!-- Logo -->
      <div class="flex items-center gap-2.5 px-5 py-5 border-b border-slate-100">
        <div class="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
          <Zap :size="16" class="text-white" />
        </div>
        <span class="font-bold text-slate-900">Prodigy</span>
        <div class="ml-auto">
          <NotificationBell />
        </div>
      </div>
      <!-- Nav links -->
      <nav class="flex-1 px-3 py-4 space-y-1">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition"
          :class="route.path.startsWith(link.to) ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50'"
        >
          <component :is="link.icon" :size="18" />
          {{ link.label }}
        </RouterLink>
      </nav>
      <!-- User + logout -->
      <div class="px-4 py-4 border-t border-slate-100">
        <div class="flex items-center gap-2.5 mb-3">
          <div class="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-semibold text-sm">
            {{ auth.user?.email?.[0]?.toUpperCase() ?? '?' }}
          </div>
          <span class="text-sm text-slate-700 truncate flex-1">{{ auth.user?.email }}</span>
        </div>
        <button
          @click="auth.logout(); router.push('/login')"
          class="w-full text-xs text-slate-500 hover:text-danger-600 transition text-left py-1"
        >
          Sign out
        </button>
      </div>
    </aside>

    <!-- Main content -->
    <div class="flex-1 flex justify-center lg:justify-start">
      <div class="w-full max-w-[390px] lg:max-w-none min-h-screen bg-surface-subtle flex flex-col">
        <main class="flex-1 overflow-y-auto pb-[72px] lg:pb-0">
          <Transition name="page" mode="out-in">
            <div :key="$route.path" class="h-full">
              <slot />
            </div>
          </Transition>
        </main>
        <!-- Mobile bottom nav only -->
        <BottomTabNav class="lg:hidden" />
      </div>
    </div>
    <ToastContainer />
  </div>
</template>

<style scoped>
.reconnect-fade-enter-active,
.reconnect-fade-leave-active {
  transition: opacity 0.3s ease;
}
.reconnect-fade-enter-from,
.reconnect-fade-leave-to {
  opacity: 0;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.12s ease, transform 0.12s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
