<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import {
  LayoutDashboard,
  Users,
  ArrowLeftRight,
  ShieldCheck,
  AlertTriangle,
  BookOpen,
  Activity,
  Building2,
  WifiOff,
  Settings,
  Sliders,
  Coins,
  Gift,
  Droplets,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  Headset,
  ClipboardList,
} from 'lucide-vue-next'
import { apiFetch } from '../composables/useApi'
import DemoController from '../components/DemoController.vue'
import AdminNotificationBell from '../components/AdminNotificationBell.vue'

interface RiskReviewsResponse {
  reviews: Array<{ status: string }>
}

const props = defineProps<{ wsConnected?: boolean }>()

// Reconnect banner state
const justReconnected = ref(false)
watch(
  () => props.wsConnected,
  (newVal, oldVal) => {
    if (newVal && !oldVal) {
      justReconnected.value = true
      setTimeout(() => {
        justReconnected.value = false
      }, 2000)
    }
  },
)

const route = useRoute()

// ── Collapsible sidebar ───────────────────────────────────────────────────────
const collapsed = ref(localStorage.getItem('admin_sidebar') === 'collapsed')

watch(collapsed, (v) => {
  localStorage.setItem('admin_sidebar', v ? 'collapsed' : 'expanded')
})

function toggleSidebar() {
  collapsed.value = !collapsed.value
}

// ── Risk badge ────────────────────────────────────────────────────────────────
const { data: riskData } = useQuery({
  queryKey: ['risk-reviews', 'open'],
  queryFn: () => apiFetch<RiskReviewsResponse>('/api/risk-reviews?status=open'),
  refetchInterval: 30000,
})

const openReviewCount = computed(() => riskData.value?.reviews?.length ?? 0)

const isOnSettings = computed(() => route.path.startsWith('/settings'))

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { path: '/customers', label: 'Customers', icon: Users },
  { path: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { path: '/kyc-queue', label: 'KYC Queue', icon: ShieldCheck },
  { path: '/risk-queue', label: 'Risk Queue', icon: AlertTriangle, badge: true },
  { path: '/b2b-clients', label: 'B2B Clients', icon: Building2 },
  { path: '/widget-configs', label: 'Widget Configs', icon: Sliders },
  { path: '/commissions', label: 'Commissions', icon: Coins },
  { path: '/ledger', label: 'Ledger', icon: BookOpen },
  { path: '/rewards', label: 'Rewards', icon: Gift },
  { path: '/liquidity', label: 'Liquidity', icon: Droplets },
  { path: '/system-events', label: 'System Events', icon: Activity },
  { path: '/support', label: 'Support', icon: Headset },
  { path: '/audit-log', label: 'Audit Log', icon: ClipboardList },
  { path: '/settings', label: 'Settings', icon: Settings },
]

const settingsSubNav = [
  { path: '/settings/fees', label: 'Fees' },
  { path: '/settings/limits', label: 'Limits' },
  { path: '/settings/kyc-config', label: 'KYC Config' },
]

function isActive(item: { path: string; exact?: boolean }) {
  if (item.exact) return route.path === item.path
  if (item.path === '/settings') return route.path.startsWith('/settings')
  return route.path.startsWith(item.path)
}

function isSubNavActive(path: string) {
  return route.path === path || route.path.startsWith(path + '?')
}
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-surface-subtle">
    <!-- Reconnect banner -->
    <Transition name="reconnect-fade">
      <div
        v-if="!props.wsConnected"
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
    <nav
      class="flex flex-col flex-shrink-0 bg-slate-900 border-r border-slate-800 transition-all duration-200 overflow-hidden"
      :class="collapsed ? 'w-16' : 'w-60'"
    >
      <!-- Logo + toggle -->
      <div class="flex items-center h-14 px-3 border-b border-slate-800 flex-shrink-0">
        <div class="flex items-center min-w-0 flex-1 overflow-hidden">
          <span
            v-if="!collapsed"
            class="text-lg font-bold text-brand-400 tracking-tight whitespace-nowrap"
          >Prodigy</span>
          <span v-if="!collapsed" class="ml-1.5 text-xs text-slate-500 font-medium whitespace-nowrap">Admin</span>
          <span v-else class="text-lg font-bold text-brand-400 tracking-tight">P</span>
        </div>
        <div class="flex items-center gap-1 flex-shrink-0">
          <AdminNotificationBell />
          <button
            class="flex items-center justify-center w-8 h-8 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            :title="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
            @click="toggleSidebar"
          >
            <component
              :is="collapsed ? PanelLeftOpen : PanelLeftClose"
              class="inline-flex w-4 h-4"
            />
          </button>
        </div>
      </div>

      <!-- Nav links -->
      <div class="flex-1 overflow-y-auto py-3">
        <template v-for="item in navItems" :key="item.path">
          <RouterLink
            :to="item.path"
            class="relative flex items-center py-2.5 mx-2 rounded-md text-sm transition-all duration-150"
            :class="[
              collapsed ? 'justify-center px-2' : 'gap-3 px-4',
              isActive(item)
                ? 'bg-slate-800 text-white border-l-2 border-brand-400 shadow-sm'
                : 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-100',
              isActive(item) && !collapsed ? 'pl-[14px]' : '',
            ]"
          >
            <!-- Icon + optional tooltip when collapsed -->
            <span
              v-if="collapsed"
              class="group relative inline-flex"
            >
              <component :is="item.icon" class="inline-flex flex-shrink-0 w-4 h-4" />
              <!-- Tooltip -->
              <span
                class="pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 z-50 whitespace-nowrap rounded-md bg-slate-700 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-150 shadow-lg"
              >
                {{ item.label }}
              </span>
            </span>
            <component v-else :is="item.icon" class="inline-flex flex-shrink-0 w-4 h-4" />

            <span v-if="!collapsed" class="flex-1 whitespace-nowrap overflow-hidden">{{ item.label }}</span>

            <!-- Badge (risk count) -->
            <span
              v-if="item.badge && openReviewCount > 0"
              class="inline-flex items-center justify-center rounded-full text-xs font-bold bg-danger-500 text-white"
              :class="collapsed ? 'absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px]' : 'w-5 h-5'"
            >
              {{ openReviewCount }}
            </span>
          </RouterLink>

          <!-- Settings sub-nav (visible when expanded AND on /settings/* paths) -->
          <template v-if="item.path === '/settings' && isOnSettings && !collapsed">
            <RouterLink
              v-for="sub in settingsSubNav"
              :key="sub.path"
              :to="sub.path"
              class="flex items-center gap-2 pl-10 pr-4 py-2 mx-2 rounded-md text-xs transition-all duration-150"
              :class="isSubNavActive(sub.path)
                ? 'text-brand-300 bg-slate-800/50'
                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/40'"
            >
              <ChevronRight class="inline-flex flex-shrink-0 w-3 h-3" />
              {{ sub.label }}
            </RouterLink>
          </template>
        </template>
      </div>

      <!-- Bottom: WS indicator + admin info -->
      <div class="border-t border-slate-800 p-3 space-y-3 flex-shrink-0">
        <!-- WS status -->
        <div v-if="!collapsed" class="flex items-center gap-2 text-xs">
          <span v-if="wsConnected" class="inline-flex items-center gap-1.5 text-success-400 font-medium">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-500 opacity-75"></span>
              <span class="animate-pulse relative inline-flex rounded-full h-2 w-2 bg-success-400"></span>
            </span>
            Live feed connected
          </span>
          <span v-else class="inline-flex items-center gap-1.5 text-slate-500">
            <WifiOff class="inline-flex w-3 h-3" />
            Reconnecting…
          </span>
        </div>
        <!-- Collapsed: just the WS dot -->
        <div v-else class="flex justify-center">
          <span
            v-if="wsConnected"
            class="relative flex h-2 w-2"
            title="Live feed connected"
          >
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-500 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-success-400"></span>
          </span>
          <WifiOff v-else class="inline-flex w-3 h-3 text-slate-500" title="Reconnecting…" />
        </div>

        <!-- Admin avatar -->
        <div class="flex items-center" :class="collapsed ? 'justify-center' : 'gap-2'">
          <div class="w-7 h-7 rounded-full bg-brand-700 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
            A
          </div>
          <div v-if="!collapsed">
            <div class="text-xs font-medium text-slate-300">Admin</div>
            <div class="text-xs text-slate-500">admin@prodigy.com</div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Page content area -->
      <main class="flex-1 overflow-y-auto">
        <Transition name="page" mode="out-in">
          <div :key="$route.path" class="h-full">
            <slot />
          </div>
        </Transition>
      </main>

      <!-- Side panel slot (pushes main content) -->
      <slot name="panel" />
    </div>

    <DemoController />
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
