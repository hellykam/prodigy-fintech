<template>
  <section ref="el" id="use-cases" class="use-cases" aria-labelledby="use-cases-label">
    <div class="uc-inner reveal" :class="{ 'is-visible': revealed }">

      <!-- Section header row -->
      <div class="uc-header">
        <p id="use-cases-label" class="label uc-eyebrow">{{ copy.eyebrow }}</p>
        <h2 class="uc-headline">{{ copy.headline }}</h2>
      </div>

      <!-- Column labels -->
      <div class="uc-col-labels" aria-hidden="true">
        <span class="uc-col-label">Platform</span>
        <span class="uc-col-label uc-col-benefit">What it gives them</span>
        <span class="uc-col-label uc-col-tag">Type</span>
      </div>

      <!-- Ledger rows -->
      <div class="uc-table" role="list">
        <div
          v-for="(row, i) in rows"
          :key="row.id"
          class="uc-row"
          :class="{ 'uc-row--visible': revealed }"
          :style="{ transitionDelay: revealed ? `${i * 60}ms` : '0ms' }"
          role="listitem"
        >
          <span class="uc-index font-mono">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="uc-category font-mono">{{ row.label }}</span>
          <span class="uc-benefit">{{ row.benefit }}</span>
          <span class="uc-tag font-mono">{{ row.type }}</span>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { useCases } from '@/content/landingCopy'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { el, revealed } = useScrollReveal()
const copy = useCases

// Map the content rows and attach a type tag
const rows = copy.rows.map((row) => {
  const typeMap: Record<string, string> = {
    wallets: 'B2C',
    neobanks: 'B2B',
    marketplaces: 'B2B/C',
    'gaming-nft': 'B2C',
    'creator-platforms': 'B2B',
    'payroll-remittance': 'B2B',
  }
  return {
    ...row,
    type: typeMap[row.id] ?? 'B2B',
  }
})
</script>

<style scoped>
.use-cases {
  border-bottom: 1px solid var(--ink);
  background: var(--paper);
}

.uc-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Header band */
.uc-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: baseline;
  padding: 2.5rem 0 1.5rem;
  border-bottom: 1px solid var(--ink);
}

.uc-eyebrow {
  margin: 0;
}

.uc-headline {
  font-family: 'Barlow Condensed', Impact, 'Arial Narrow', sans-serif;
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  margin: 0;
  color: var(--ink);
}

/* Column label strip */
.uc-col-labels {
  display: grid;
  grid-template-columns: 2.5rem 10rem 1fr 4.5rem;
  gap: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--line);
}

.uc-col-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-muted);
}

.uc-col-benefit {
  grid-column: 3;
}

.uc-col-tag {
  grid-column: 4;
  text-align: right;
}

/* Ledger rows */
.uc-table {
  display: flex;
  flex-direction: column;
}

.uc-row {
  display: grid;
  grid-template-columns: 2.5rem 10rem 1fr 4.5rem;
  gap: 1rem;
  align-items: baseline;
  padding: 0.875rem 0;
  border-bottom: 1px solid var(--line);
  opacity: 0;
  transform: translateX(-8px);
  transition: background 0.15s, opacity 0.4s ease, transform 0.4s ease;
}

.uc-row--visible {
  opacity: 1;
  transform: translateX(0);
}

.uc-row:last-child {
  border-bottom: none;
}

.uc-row:hover {
  background: #f7f7f7;
}

.uc-index {
  font-size: 0.75rem;
  color: var(--ink-muted);
  letter-spacing: 0.04em;
  align-self: center;
}

.uc-category {
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink);
}

.uc-benefit {
  font-size: 0.9375rem;
  color: var(--ink-mid);
  line-height: 1.4;
}

.uc-tag {
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-mid);
  text-align: right;
  align-self: center;
  border: 1px solid var(--ink-mid);
  padding: 0.125rem 0.375rem;
  white-space: nowrap;
  justify-self: end;
}

@media (prefers-reduced-motion: reduce) {
  .uc-row {
    opacity: 1;
    transform: none;
    transition: background 0.15s;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .uc-header {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .uc-col-labels {
    display: none;
  }

  .uc-row {
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto;
    gap: 0.25rem 1rem;
    padding: 1rem 0;
  }

  .uc-index {
    display: none;
  }

  .uc-category {
    grid-column: 1;
    grid-row: 1;
  }

  .uc-tag {
    grid-column: 2;
    grid-row: 1;
  }

  .uc-benefit {
    grid-column: 1 / -1;
    grid-row: 2;
    font-size: 0.875rem;
  }
}
</style>
