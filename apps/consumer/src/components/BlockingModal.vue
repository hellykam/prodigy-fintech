<script setup lang="ts">
defineProps<{
  open: boolean
  title: string
  body: string
  primaryLabel?: string
  secondaryLabel?: string
}>()

const emit = defineEmits<{
  primary: []
  secondary: []
}>()
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
        <!-- Backdrop — NOT clickable (blocking) -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <!-- Panel -->
        <div class="relative bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
          <h2 class="text-xl font-bold text-slate-900 mb-2">{{ title }}</h2>
          <p class="text-slate-500 text-sm leading-relaxed mb-6">{{ body }}</p>
          <div class="space-y-2">
            <button
              v-if="primaryLabel"
              @click="emit('primary')"
              class="w-full h-12 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 active:scale-[0.98] transition"
            >
              {{ primaryLabel }}
            </button>
            <button
              v-if="secondaryLabel"
              @click="emit('secondary')"
              class="w-full h-12 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 active:scale-[0.98] transition"
            >
              {{ secondaryLabel }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active { transition: all 0.2s ease; }
.modal-enter-from,
.modal-leave-to { opacity: 0; }
.modal-enter-from .relative,
.modal-leave-to .relative { transform: scale(0.95) translateY(10px); }
</style>
