<script setup lang="ts">
import { useToast } from '@/composables/useToast'
import { CheckCircle, XCircle, Info } from 'lucide-vue-next'

const { toasts } = useToast()
</script>

<template>
  <Teleport to="body">
    <div class="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-[calc(100%-2rem)] max-w-sm pointer-events-none">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium pointer-events-auto"
          :class="{
            'bg-success-500 text-white': toast.type === 'success',
            'bg-danger-500 text-white': toast.type === 'error',
            'bg-slate-800 text-white': toast.type === 'info',
          }"
        >
          <CheckCircle v-if="toast.type === 'success'" :size="18" class="shrink-0" />
          <XCircle v-else-if="toast.type === 'error'" :size="18" class="shrink-0" />
          <Info v-else :size="18" class="shrink-0" />
          <span>{{ toast.message }}</span>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(-12px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
