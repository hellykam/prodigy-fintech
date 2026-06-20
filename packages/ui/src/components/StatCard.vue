<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  label: string
  value: string | number
  subvalue?: string
  delta?: string
  deltaDirection?: 'up' | 'down' | 'neutral'
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  deltaDirection: 'neutral',
  loading: false,
})

const deltaClasses = computed(() => {
  if (props.deltaDirection === 'up') return 'text-success-600'
  if (props.deltaDirection === 'down') return 'text-danger-600'
  return 'text-slate-500'
})

const deltaIcon = computed(() => {
  if (props.deltaDirection === 'up') return '▲'
  if (props.deltaDirection === 'down') return '▼'
  return ''
})
</script>

<template>
  <div class="rounded-lg border border-slate-200 bg-surface p-5 shadow-panel">
    <p class="text-xs font-medium uppercase tracking-wide text-slate-500">{{ label }}</p>

    <!-- Loading skeleton -->
    <template v-if="loading">
      <div class="mt-2 h-8 w-24 animate-pulse rounded bg-slate-200" />
      <div class="mt-2 h-4 w-32 animate-pulse rounded bg-slate-200" />
    </template>

    <!-- Populated -->
    <template v-else>
      <p class="mt-2 text-2xl font-bold text-slate-900">{{ value }}</p>
      <p v-if="subvalue" class="mt-0.5 text-sm text-slate-500">{{ subvalue }}</p>
      <p v-if="delta" class="mt-1 flex items-center gap-1 text-xs" :class="deltaClasses">
        <span v-if="deltaIcon" aria-hidden="true">{{ deltaIcon }}</span>
        {{ delta }}
      </p>
    </template>
  </div>
</template>
