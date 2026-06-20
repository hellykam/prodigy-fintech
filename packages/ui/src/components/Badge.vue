<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../lib/utils'

interface Props {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
}

const props = withDefaults(defineProps<Props>(), { variant: 'default' })

const variantClasses = {
  default: 'bg-brand-100 text-brand-700',
  success: 'bg-success-50 text-success-600',
  warning: 'bg-warning-50 text-warning-600',
  danger: 'bg-danger-50 text-danger-600',
  info: 'bg-info-50 text-info-600',
  neutral: 'bg-slate-100 text-slate-600',
}

const classes = computed(() =>
  cn('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium', variantClasses[props.variant]),
)
</script>

<template>
  <span :class="classes"><slot /></span>
</template>
