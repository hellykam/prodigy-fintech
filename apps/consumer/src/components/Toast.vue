<script setup lang="ts">
import { Check, AlertCircle, AlertTriangle, Info, X } from 'lucide-vue-next'
import { useToast } from '@/composables/useToast'

const { toasts, dismiss } = useToast()

const iconMap = {
  success: Check,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}

const colorMap = {
  success: 'bg-success-500',
  error: 'bg-danger-500',
  warning: 'bg-warning-400',
  info: 'bg-slate-800',
}
</script>

<template>
  <!-- Toast container — fixed top, centered -->
  <div class="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 items-center w-full max-w-xs px-4 pointer-events-none">
    <TransitionGroup name="toast" tag="div" class="flex flex-col gap-2 w-full">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="['flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg pointer-events-auto min-w-0', colorMap[toast.type]]"
      >
        <component :is="iconMap[toast.type]" class="w-4 h-4 text-white shrink-0" />
        <p class="text-white text-sm font-medium flex-1">{{ toast.message }}</p>
        <button @click="dismiss(toast.id)" class="text-white/70 hover:text-white transition shrink-0">
          <X class="w-3.5 h-3.5" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.97);
}
</style>
