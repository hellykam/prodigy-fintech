<template>
  <div class="ticker-wrap" aria-hidden="true">
    <!-- Live signal dot -->
    <div class="ticker-live">
      <span class="live-dot" />
      <span class="live-label">LIVE</span>
    </div>
    <div class="ticker-overflow">
      <div class="ticker-track">
        <span v-for="item in doubledItems" :key="item.key" class="ticker-item">
          <span class="ticker-sep" aria-hidden="true">◈</span>
          {{ item.text }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ticker } from '@/content/landingCopy'

const doubledItems = computed(() =>
  [...ticker.items, ...ticker.items].map((text, i) => ({ text, key: i }))
)
</script>

<style scoped>
.ticker-wrap {
  overflow: hidden;
  background: var(--ink);
  color: var(--paper);
  border-bottom: 1px solid var(--ink);
  height: 2.75rem;
  display: flex;
  align-items: stretch;
}

/* Live badge — pinned left */
.ticker-live {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1.25rem;
  border-right: 1px solid rgba(255, 255, 255, 0.15);
  flex-shrink: 0;
  background: var(--ink);
  position: relative;
  z-index: 2;
}

.live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #a9fe52;
  box-shadow: 0 0 6px #a9fe52;
  animation: dot-pulse 1.5s ease-in-out infinite;
  flex-shrink: 0;
}

@keyframes dot-pulse {
  0%, 100% { opacity: 0.5; transform: scale(0.85); }
  50%       { opacity: 1;   transform: scale(1); }
}

.live-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: #a9fe52;
}

/* Scrolling track */
.ticker-overflow {
  overflow: hidden;
  flex: 1;
  display: flex;
  align-items: center;
}

.ticker-track {
  display: flex;
  white-space: nowrap;
  animation: ticker 32s linear infinite;
  will-change: transform;
}

@keyframes ticker {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.ticker-item {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 1.5rem;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.85);
}

.ticker-sep {
  opacity: 0.3;
  font-size: 0.75rem;
}

@media (prefers-reduced-motion: reduce) {
  .ticker-track { animation: none; }
  .live-dot { animation: none; opacity: 1; }
}
</style>
