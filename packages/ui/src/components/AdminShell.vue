<script setup lang="ts">
import { provide, computed } from 'vue'

interface Props {
  collapsed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  collapsed: false,
})

const emit = defineEmits<{
  'update:collapsed': [value: boolean]
}>()

const sidebarCollapsed = computed(() => props.collapsed)
provide('sidebarCollapsed', sidebarCollapsed)

function toggleCollapsed() {
  emit('update:collapsed', !props.collapsed)
}
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <aside
      class="relative flex flex-col shrink-0 bg-white border-r border-slate-200 transition-all duration-200 overflow-hidden"
      :style="{ width: collapsed ? '64px' : '240px' }"
      :aria-expanded="!collapsed"
      aria-label="Sidebar navigation"
    >
      <!-- Sidebar slot content -->
      <div class="flex-1 overflow-y-auto overflow-x-hidden min-w-0">
        <slot name="sidebar" />
      </div>

      <!-- Collapse toggle button -->
      <button
        type="button"
        class="absolute bottom-4 right-0 translate-x-1/2 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white shadow-panel text-slate-500 hover:text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1 transition-colors z-10"
        :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        @click="toggleCollapsed"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          class="transition-transform duration-200"
          :class="{ 'rotate-180': collapsed }"
        >
          <path
            d="M7.5 2.5L4.5 6l3 3.5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </aside>

    <!-- Main content -->
    <main class="flex-1 min-w-0 overflow-auto">
      <slot />
    </main>
  </div>
</template>
