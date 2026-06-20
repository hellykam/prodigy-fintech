<script setup lang="ts">
import { watch, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  open: boolean
  title?: string
}>()
const emit = defineEmits<{
  close: []
}>()

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}
onMounted(() => document.addEventListener('keydown', onKey))
onUnmounted(() => document.removeEventListener('keydown', onKey))

watch(
  () => props.open,
  (val) => {
    document.body.style.overflow = val ? 'hidden' : ''
  },
  { immediate: true },
)
</script>

<template>
  <Teleport to="body">
    <Transition name="drawer-backdrop">
      <div
        v-if="open"
        class="fixed inset-0 bg-black/40 z-40 backdrop-blur-[2px]"
        @click="emit('close')"
      />
    </Transition>
    <Transition name="drawer">
      <div
        v-if="open"
        class="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-[20px] shadow-[0px_-4px_34px_rgba(0,0,0,0.1)] max-h-[80vh] flex flex-col"
      >
        <!-- Handle -->
        <div class="flex justify-center pt-3 pb-2 shrink-0">
          <div class="w-10 h-1 bg-slate-200 rounded-full" />
        </div>
        <!-- Title -->
        <div v-if="title" class="px-5 pb-3 shrink-0">
          <h2 class="text-base font-semibold text-slate-900">{{ title }}</h2>
        </div>
        <!-- Content -->
        <div class="overflow-y-auto flex-1 px-5 pb-6">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.drawer-backdrop-enter-active,
.drawer-backdrop-leave-active {
  transition: opacity 0.2s ease;
}
.drawer-backdrop-enter-from,
.drawer-backdrop-leave-to {
  opacity: 0;
}

.drawer-enter-active,
.drawer-leave-active {
  transition: transform 0.25s ease;
}
.drawer-enter-from,
.drawer-leave-to {
  transform: translateY(100%);
}
</style>
