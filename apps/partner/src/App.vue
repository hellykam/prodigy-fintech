<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useToast } from './composables/useToast'
import { CheckCircle, XCircle, Info, X } from 'lucide-vue-next'

const { toasts, dismiss } = useToast()
</script>

<template>
  <RouterView />

  <!-- Toast outlet -->
  <Teleport to="body">
    <div class="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 pointer-events-none">
      <TransitionGroup name="toast" tag="div" class="flex flex-col gap-2">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="pointer-events-auto flex items-center gap-3 min-w-[280px] max-w-sm bg-white border border-slate-200 rounded-xl shadow-lg px-4 py-3"
        >
          <CheckCircle v-if="toast.type === 'success'" class="w-5 h-5 text-emerald-500 flex-shrink-0" />
          <XCircle v-else-if="toast.type === 'error'" class="w-5 h-5 text-red-500 flex-shrink-0" />
          <Info v-else class="w-5 h-5 text-indigo-500 flex-shrink-0" />
          <span class="flex-1 text-sm text-slate-700 font-medium">{{ toast.message }}</span>
          <button
            class="text-slate-400 hover:text-slate-600 transition-colors"
            @click="dismiss(toast.id)"
          >
            <X class="w-4 h-4" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
.toast-move {
  transition: transform 0.3s ease;
}
</style>
