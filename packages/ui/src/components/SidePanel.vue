<script setup lang="ts">
import { onMounted, onUnmounted, watch, nextTick, ref } from 'vue'

interface Props {
  open: boolean
  title: string
  width?: '480' | '560'
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  width: '480',
  loading: false,
})

const emit = defineEmits<{
  close: []
}>()

const panelRef = ref<HTMLElement | null>(null)
const closeButtonRef = ref<HTMLButtonElement | null>(null)

function onKeydown(e: KeyboardEvent) {
  if (!props.open) return

  if (e.key === 'Escape') {
    emit('close')
    return
  }

  // Focus trap
  if (e.key === 'Tab' && panelRef.value) {
    const focusable = panelRef.value.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )
    const focusableArr = Array.from(focusable)
    if (focusableArr.length === 0) return

    const first = focusableArr[0]
    const last = focusableArr[focusableArr.length - 1]

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault()
        last?.focus()
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault()
        first?.focus()
      }
    }
  }
}

watch(
  () => props.open,
  async (val) => {
    if (val) {
      await nextTick()
      closeButtonRef.value?.focus()
    }
  },
)

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Transition
    enter-active-class="transition-transform duration-250 ease-out"
    enter-from-class="translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="transition-transform duration-250 ease-in"
    leave-from-class="translate-x-0"
    leave-to-class="translate-x-full"
  >
    <aside
      v-if="open"
      ref="panelRef"
      class="flex flex-shrink-0 flex-col bg-white shadow-side-panel"
      :style="{ width: `${width}px` }"
      role="complementary"
      :aria-label="title"
    >
      <!-- Header -->
      <div
        class="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 px-5"
      >
        <h2 class="text-sm font-semibold text-slate-900">{{ title }}</h2>
        <button
          ref="closeButtonRef"
          type="button"
          class="flex h-8 w-8 items-center justify-center rounded text-slate-400 hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1"
          aria-label="Close panel"
          @click="emit('close')"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 4L4 12M4 4l8 8"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>

      <!-- Body -->
      <div class="flex-1 overflow-y-auto px-5 py-4">
        <!-- Loading skeleton -->
        <template v-if="loading">
          <div class="space-y-3">
            <div
              v-for="i in 6"
              :key="i"
              class="h-4 animate-pulse rounded bg-slate-200"
              :style="{ width: `${60 + (i % 3) * 15}%` }"
            />
          </div>
        </template>

        <!-- Content -->
        <template v-else>
          <slot />
        </template>
      </div>

      <!-- Footer -->
      <div
        v-if="$slots.footer"
        class="shrink-0 border-t border-slate-200 px-5 py-4"
      >
        <slot name="footer" />
      </div>
    </aside>
  </Transition>
</template>
