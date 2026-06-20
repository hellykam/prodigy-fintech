<template>
  <section ref="el" class="problem" aria-labelledby="problem-headline">
    <div class="problem-inner reveal" :class="{ 'is-visible': revealed }">
      <div class="problem-header">
        <p class="label">{{ copy.eyebrow }}</p>
        <h2 id="problem-headline" class="problem-headline">
          {{ copy.headline }}
        </h2>
      </div>

      <div class="problem-body">
        <!-- Failed receipt motif -->
        <div class="failed-receipt" aria-label="Example of a confusing crypto fee receipt">
          <div class="receipt-header-row">
            <span class="font-mono text-xs" style="letter-spacing: 0.08em;">TRANSACTION RECEIPT</span>
            <span class="stamp stamp-review">ERROR</span>
          </div>
          <hr class="dashed-rule" />
          <div class="failed-row">
            <span>Total fee</span>
            <span class="crossed">2.5% + €0.99 + 0.0003 BTC + ???</span>
          </div>
          <div class="failed-row">
            <span>Compliance status</span>
            <span class="crossed">See section 14(b) of terms</span>
          </div>
          <div class="failed-row">
            <span>Admin visibility</span>
            <span class="crossed">Not available</span>
          </div>
          <div class="failed-row">
            <span>Partner share</span>
            <span class="crossed">Ask finance. They have a spreadsheet.</span>
          </div>
          <hr class="dashed-rule" />
          <div class="failed-note">
            ← This is what happens when visibility is optional.
          </div>
        </div>

        <!-- Point list -->
        <ul class="problem-points">
          <li v-for="(point, i) in copy.points" :key="i" class="problem-point">
            <span class="point-n font-mono">{{ String(i + 1).padStart(2, '0') }}</span>
            <span>{{ point }}</span>
          </li>
        </ul>
      </div>

      <div class="problem-conclusion">
        <p>{{ copy.conclusion }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { problem as copy } from '@/content/landingCopy'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { el, revealed } = useScrollReveal()
</script>

<style scoped>
.problem {
  border-bottom: 1px solid var(--ink);
  background: var(--paper);
}

.problem-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.problem-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.problem-headline {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(2rem, 4.5vw, 3.75rem);
  font-weight: 900;
  line-height: 1.0;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  max-width: 28ch;
  margin: 0;
}

.problem-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

/* Failed receipt */
.failed-receipt {
  background: #fafafa;
  border: 1px solid var(--line);
  padding: 1.25rem;
  font-family: 'Space Mono', monospace;
  font-size: 0.8125rem;
}

.receipt-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.dashed-rule {
  border: none;
  border-top: 1px dashed var(--line);
  margin: 0.75rem 0;
}

.failed-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0.3rem 0;
  gap: 1rem;
  border-bottom: 1px solid var(--ink-faint);
}

.failed-row:last-of-type {
  border-bottom: none;
}

.crossed {
  text-decoration: line-through;
  color: var(--ink-muted);
  text-align: right;
  max-width: 24ch;
}

.failed-note {
  margin-top: 0.75rem;
  color: var(--ink-muted);
  font-size: 0.75rem;
  letter-spacing: 0.04em;
}

/* Problem points */
.problem-points {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.problem-point {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--line);
  font-size: 0.9375rem;
  line-height: 1.5;
}

.problem-point:first-child {
  border-top: 1px solid var(--line);
}

.point-n {
  font-size: 0.8125rem;
  color: var(--ink-muted);
  flex-shrink: 0;
  width: 1.5rem;
}

/* Conclusion bar */
.problem-conclusion {
  border-top: 2px solid var(--ink);
  padding-top: 1.5rem;
}

.problem-conclusion p {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(1.75rem, 3.5vw, 3rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 0.95;
  margin: 0;
}

/* Stamp */
.stamp {
  display: inline-block;
  border: 2px solid currentColor;
  padding: 0.1em 0.4em;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.stamp-review {
  color: #c44;
  border-color: #c44;
}

@media (max-width: 768px) {
  .problem-body {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
