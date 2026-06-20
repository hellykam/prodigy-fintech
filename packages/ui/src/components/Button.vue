<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../lib/utils'

interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
})

const variantClasses = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 focus-visible:ring-brand-500',
  secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:ring-slate-400',
  ghost: 'text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-400',
  destructive: 'bg-danger-600 text-white hover:bg-danger-700 focus-visible:ring-danger-500',
  outline: 'border border-slate-300 text-slate-700 hover:bg-slate-50 focus-visible:ring-slate-400',
}

const sizeClasses = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-9 px-4 text-sm gap-2',
  lg: 'h-11 px-6 text-base gap-2',
}

const classes = computed(() =>
  cn(
    'inline-flex items-center justify-center font-medium rounded transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    variantClasses[props.variant],
    sizeClasses[props.size],
  ),
)
</script>

<template>
  <button :type="type" :disabled="disabled || loading" :class="classes">
    <slot />
  </button>
</template>
