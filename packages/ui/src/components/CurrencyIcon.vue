<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  currency: string
  size?: 'xs' | 'sm' | 'md'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'sm',
})

interface CurrencyConfig {
  bgClass: string
  textClass: string
  symbol: string
}

const currencyMap: Record<string, CurrencyConfig> = {
  EUR: { bgClass: 'bg-info-50', textClass: 'text-info-600', symbol: '€' },
  USD: { bgClass: 'bg-success-50', textClass: 'text-success-600', symbol: '$' },
  GBP: { bgClass: 'bg-brand-50', textClass: 'text-brand-600', symbol: '£' },
  BTC: { bgClass: 'bg-warning-50', textClass: 'text-warning-600', symbol: '₿' },
  ETH: { bgClass: 'bg-info-50', textClass: 'text-info-600', symbol: 'Ξ' },
  USDT: { bgClass: 'bg-success-50', textClass: 'text-success-600', symbol: '₮' },
}

const config = computed<CurrencyConfig>(() => {
  const upper = props.currency.toUpperCase()
  return (
    currencyMap[upper] ?? {
      bgClass: 'bg-surface-muted',
      textClass: 'text-slate-600',
      symbol: upper.charAt(0),
    }
  )
})

const sizeClasses = computed(() => {
  if (props.size === 'xs') return 'w-5 h-5 text-xs'
  if (props.size === 'md') return 'w-9 h-9 text-sm'
  return 'w-7 h-7 text-xs'
})
</script>

<template>
  <span
    class="inline-flex items-center justify-center rounded-full font-bold"
    :class="[sizeClasses, config.bgClass, config.textClass]"
    :aria-label="currency.toUpperCase()"
  >
    {{ config.symbol }}
  </span>
</template>
