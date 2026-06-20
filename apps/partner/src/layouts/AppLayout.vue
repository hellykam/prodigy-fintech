<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import {
  LayoutDashboard,
  ArrowLeftRight,
  DollarSign,
  Key,
  Settings,
  Users,
  Sliders,
} from 'lucide-vue-next'
import { connected as wsConnected } from '../composables/useWebSocket'

const route = useRoute()

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

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Transactions', to: '/transactions', icon: ArrowLeftRight },
  { label: 'Commissions', to: '/commissions', icon: DollarSign },
  { label: 'API Keys', to: '/api-keys', icon: Key },
  { label: 'End Users', to: '/end-users', icon: Users },
  { label: 'Widget Config', to: '/widget-config', icon: Sliders },
]

function isActive(path: string) {
  return route.path === path || route.path.startsWith(path + '/')
}
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-surface-subtle">
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

    <!-- Sidebar -->
    <aside class="w-56 bg-indigo-950 text-white h-screen flex flex-col flex-shrink-0">
      <!-- Logo -->
      <div class="px-4 py-5 border-b border-indigo-800">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center flex-shrink-0">
            <span class="text-white font-bold text-sm">P</span>
          </div>
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-1.5">
              <p class="text-white font-semibold text-sm leading-tight">Prodigy Partner</p>
              <span class="inline-flex items-center px-1.5 py-0.5 rounded text-2xs font-bold bg-indigo-400 text-indigo-950 animate-pulse flex-shrink-0">
                BETA
              </span>
            </div>
            <p class="text-indigo-300 text-xs leading-tight truncate">for Neobank AG</p>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors group"
          :class="
            isActive(item.to)
              ? 'bg-indigo-800 border-l-2 border-indigo-300 pl-[10px] text-white'
              : 'text-indigo-300 hover:text-white hover:bg-indigo-800'
          "
        >
          <component
            :is="item.icon"
            class="w-4 h-4 flex-shrink-0"
            :class="isActive(item.to) ? 'text-indigo-300' : 'text-indigo-500 group-hover:text-indigo-300'"
          />
          {{ item.label }}
        </RouterLink>
      </nav>

      <!-- User area -->
      <div class="px-3 py-4 border-t border-indigo-800">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
            <span class="text-white text-xs font-semibold">AN</span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-white text-xs font-medium truncate">admin@neobank.ag</p>
            <p class="text-indigo-400 text-xs">Admin</p>
          </div>
          <button class="text-indigo-400 hover:text-indigo-200 transition-colors p-1 rounded">
            <Settings class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>

    <!-- Main content -->
    <main class="flex-1 overflow-y-auto bg-surface-subtle">
      <Transition name="page" mode="out-in">
        <div :key="$route.path" class="h-full">
          <slot />
        </div>
      </Transition>
    </main>
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
