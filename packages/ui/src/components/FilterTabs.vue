<script setup lang="ts">
import { computed } from 'vue'

interface Tab {
  value: string
  label: string
  count?: number
}

interface Props {
  tabs: Tab[]
  queryKey?: string
  modelValue?: string
}

const props = withDefaults(defineProps<Props>(), {
  queryKey: 'type',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

/**
 * Read the current value of queryKey from the browser URL.
 * Falls back to the first tab's value when the param is absent.
 */
function getUrlParam(key: string): string {
  if (typeof window === 'undefined') return props.tabs[0]?.value ?? ''
  const params = new URLSearchParams(window.location.search)
  return params.get(key) ?? props.tabs[0]?.value ?? ''
}

/**
 * Push queryKey=value to the URL using replaceState (so browser back still works).
 */
function setUrlParam(key: string, value: string): void {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  url.searchParams.set(key, value)
  window.history.replaceState(null, '', url.toString())
}

const activeValue = computed<string>(() => {
  if (props.modelValue !== undefined) return props.modelValue
  return getUrlParam(props.queryKey)
})

function selectTab(tab: Tab): void {
  if (props.modelValue !== undefined) {
    emit('update:modelValue', tab.value)
    return
  }
  setUrlParam(props.queryKey, tab.value)
  // Re-render: emit with the new value so parent can react if wired up
  emit('update:modelValue', tab.value)
}

function isActive(tab: Tab): boolean {
  return activeValue.value === tab.value
}
</script>

<template>
  <div class="flex w-full gap-1 rounded-lg bg-surface-subtle p-1" role="tablist">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      type="button"
      role="tab"
      :aria-selected="isActive(tab)"
      :tabindex="isActive(tab) ? 0 : -1"
      class="flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1"
      :class="
        isActive(tab)
          ? 'bg-white text-brand-600 shadow-sm border border-slate-200'
          : 'text-slate-500 hover:text-slate-700'
      "
      @click="selectTab(tab)"
    >
      {{ tab.label }}
      <span
        v-if="tab.count !== undefined"
        class="inline-flex items-center justify-center rounded-full px-1.5 text-xs"
        :class="isActive(tab) ? 'bg-brand-50 text-brand-700' : 'bg-slate-100 text-slate-600'"
      >
        {{ tab.count }}
      </span>
    </button>
  </div>
</template>
