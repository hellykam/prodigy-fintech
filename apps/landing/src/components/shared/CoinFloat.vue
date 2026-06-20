<script setup lang="ts">
import { computed } from 'vue'

type Currency = 'BTC' | 'ETH' | 'EUR' | 'USDT'
type Size = 'sm' | 'md' | 'lg'

const props = withDefaults(defineProps<{
  currency: Currency
  size?: Size
  color?: string
}>(), {
  size: 'md',
  color: undefined,
})

const SYMBOLS: Record<Currency, string> = {
  BTC:  '₿',
  ETH:  'Ξ',
  EUR:  '€',
  USDT: '₮',
}

const COLORS: Record<Currency, string> = {
  BTC:  '#f7931a',
  ETH:  '#627eea',
  EUR:  '#2775ca',
  USDT: '#26a17b',
}

const SIZES: Record<Size, number> = {
  sm: 32,
  md: 48,
  lg: 64,
}

const px   = computed(() => SIZES[props.size])
const bg   = computed(() => props.color ?? COLORS[props.currency])
const sym  = computed(() => SYMBOLS[props.currency])
const fs   = computed(() => `${Math.round(px.value * 0.42)}px`)
</script>

<template>
  <div
    class="coin-outer"
    :style="{ width: px + 'px', height: px + 'px' }"
    :aria-label="currency + ' coin'"
  >
    <div
      class="coin-rotator"
      :style="{ width: px + 'px', height: px + 'px' }"
    >
      <div
        class="coin-face face-front"
        :style="{ width: px + 'px', height: px + 'px', background: bg, fontSize: fs }"
        aria-hidden="true"
      >
        {{ sym }}
      </div>
      <div
        class="coin-face face-back"
        :style="{ width: px + 'px', height: px + 'px', background: bg, fontSize: fs }"
        aria-hidden="true"
      >
        {{ sym }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.coin-outer {
  position: relative;
  display: inline-block;
}

.coin-rotator {
  animation: coinSpin 8s linear infinite;
  transform-style: preserve-3d;
  will-change: transform;
  position: relative;
}

.coin-rotator:hover {
  animation-play-state: paused;
}

.coin-face {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  color: #fff;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  user-select: none;
}

.face-back {
  transform: rotateY(180deg);
}

@keyframes coinSpin {
  0%   { transform: rotateY(0deg); }
  100% { transform: rotateY(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .coin-rotator {
    animation: none;
  }
}
</style>
