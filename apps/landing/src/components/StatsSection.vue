<template>
  <section ref="el" class="stats" aria-label="Platform statistics">
    <div class="stats-inner reveal" :class="{ 'is-visible': revealed }">
      <div
        v-for="stat in stats"
        :key="stat.n"
        class="stat-cell"
      >
        <div class="stat-n iris-text" :aria-label="stat.label">{{ stat.n }}</div>
        <div class="stat-label">{{ stat.label }}</div>
        <div class="stat-sub">{{ stat.sub }}</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'

const { el, revealed } = useScrollReveal()

const stats = [
  { n: '< 200ms', label: 'Quote generation', sub: 'Real-time pricing, every time' },
  { n: '99.97%', label: 'Uptime SLA', sub: 'Built for production-grade reliability' },
  { n: '1 line', label: 'To embed the widget', sub: 'Copy. Paste. Done.' },
  { n: '100%', label: 'Fee visibility', sub: 'Before the user presses anything important' },
]
</script>

<style scoped>
.stats {
  border-bottom: 1px solid var(--ink);
  background: var(--paper);
}

.stats-inner {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  max-width: 1440px;
  margin: 0 auto;
}

.stat-cell {
  padding: 3rem 2rem;
  border-right: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-cell:last-child {
  border-right: none;
}

.stat-n {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.02em;
}

.stat-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.01em;
}

.stat-sub {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: var(--ink-mid);
  letter-spacing: 0.02em;
  line-height: 1.5;
}

@media (max-width: 900px) {
  .stats-inner {
    grid-template-columns: repeat(2, 1fr);
  }

  .stat-cell {
    border-bottom: 1px solid var(--line);
  }

  .stat-cell:nth-child(2n) {
    border-right: none;
  }

  .stat-cell:nth-last-child(-n+2) {
    border-bottom: none;
  }
}

@media (max-width: 500px) {
  .stats-inner {
    grid-template-columns: 1fr;
  }

  .stat-cell {
    border-right: none;
  }

  .stat-cell:last-child {
    border-bottom: none;
  }
}
</style>
