<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'

interface Props {
  open: boolean
  title: string
  description?: string
  entityLabel?: string
  actionLabel: string
  actionVariant?: 'primary' | 'destructive'
  requiresReason?: boolean
  reasonPlaceholder?: string
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  actionVariant: 'primary',
  requiresReason: false,
  reasonPlaceholder: 'Add a note (required)',
  loading: false,
})

const emit = defineEmits<{
  confirm: [payload: { reason: string }]
  cancel: []
}>()

const reason = ref('')
const panelRef = ref<HTMLElement | null>(null)
const closeButtonRef = ref<HTMLButtonElement | null>(null)

const canSubmit = computed(() => {
  if (props.requiresReason) return reason.value.trim().length > 0
  return true
})

const actionButtonClasses = computed(() => {
  const base =
    'inline-flex items-center justify-center gap-2 h-9 px-4 text-sm font-medium rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
  if (props.actionVariant === 'destructive') {
    return `${base} bg-danger-600 text-white hover:bg-danger-700 focus-visible:ring-danger-500`
  }
  return `${base} bg-brand-600 text-white hover:bg-brand-700 focus-visible:ring-brand-500`
})

function handleConfirm() {
  if (!canSubmit.value || props.loading) return
  emit('confirm', { reason: reason.value })
}

function handleCancel() {
  emit('cancel')
}

function onKeydown(e: KeyboardEvent) {
  if (!props.open) return

  if (e.key === 'Escape') {
    emit('cancel')
    return
  }

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
      reason.value = ''
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
      style="width: 480px"
      role="complementary"
      :aria-label="title"
    >
      <!-- Header -->
      <div class="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 px-5">
        <h2 class="text-sm font-semibold text-slate-900">{{ title }}</h2>
        <button
          ref="closeButtonRef"
          type="button"
          class="flex h-8 w-8 items-center justify-center rounded text-slate-400 hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1"
          aria-label="Close panel"
          @click="handleCancel"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
      <div class="flex-1 overflow-y-auto px-5 py-5 space-y-4">
        <!-- Description -->
        <p v-if="description" class="text-sm text-slate-600">{{ description }}</p>

        <!-- Entity label -->
        <div
          v-if="entityLabel"
          class="rounded-md border border-slate-200 bg-surface-subtle px-4 py-3"
        >
          <p class="text-sm text-slate-700">{{ entityLabel }}</p>
        </div>

        <!-- Reason textarea -->
        <div v-if="requiresReason" class="space-y-1.5">
          <label for="confirm-panel-reason" class="block text-xs font-medium text-slate-700">
            Reason
            <span class="text-danger-600 ml-0.5" aria-hidden="true">*</span>
          </label>
          <textarea
            id="confirm-panel-reason"
            v-model="reason"
            :placeholder="reasonPlaceholder"
            rows="4"
            class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 resize-none"
            :disabled="loading"
            aria-required="true"
          />
        </div>
      </div>

      <!-- Footer -->
      <div class="shrink-0 border-t border-slate-200 px-5 py-4 flex items-center justify-end gap-3">
        <button
          type="button"
          class="inline-flex items-center justify-center h-9 px-4 text-sm font-medium rounded transition-colors bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          :disabled="loading"
          @click="handleCancel"
        >
          Cancel
        </button>
        <button
          type="button"
          :class="actionButtonClasses"
          :disabled="loading || !canSubmit"
          @click="handleConfirm"
        >
          <!-- Spinner -->
          <svg
            v-if="loading"
            class="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          {{ actionLabel }}
        </button>
      </div>
    </aside>
  </Transition>
</template>
