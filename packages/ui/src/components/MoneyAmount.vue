<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  amount: string | number
  currency: string
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

const CRYPTO_CURRENCIES = ['BTC', 'ETH', 'USDT'] as const
const FIAT_CURRENCIES = ['EUR', 'USD', 'GBP'] as const

type CryptoCurrency = (typeof CRYPTO_CURRENCIES)[number]
type FiatCurrency = (typeof FIAT_CURRENCIES)[number]

const cryptoDecimals: Record<CryptoCurrency, number> = {
  BTC: 8,
  ETH: 6,
  USDT: 2,
}

function isCrypto(c: string): c is CryptoCurrency {
  return (CRYPTO_CURRENCIES as readonly string[]).includes(c)
}

function isFiat(c: string): c is FiatCurrency {
  return (FIAT_CURRENCIES as readonly string[]).includes(c)
}

const formattedAmount = computed(() => {
  const num = typeof props.amount === 'string' ? parseFloat(props.amount) : props.amount
  if (isNaN(num)) return '—'

  const cur = props.currency.toUpperCase()

  if (isCrypto(cur)) {
    const decimals = cryptoDecimals[cur]
    return num.toFixed(decimals)
  }

  if (isFiat(cur)) {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num)
  }

  // Generic fallback: 2 decimals
  return num.toFixed(2)
})

const sizeClasses = computed(() => {
  if (props.size === 'sm') return { amount: 'text-xs', currency: 'text-xs' }
  if (props.size === 'lg') return { amount: 'text-lg', currency: 'text-sm' }
  return { amount: 'text-sm', currency: 'text-xs' }
})
</script>

<template>
  <span class="inline-flex flex-col items-end text-right">
    <span class="font-mono font-medium text-slate-900" :class="sizeClasses.amount">
      {{ formattedAmount }}
    </span>
    <span class="font-sans text-slate-400" :class="sizeClasses.currency">
      {{ currency.toUpperCase() }}
    </span>
  </span>
</template>
