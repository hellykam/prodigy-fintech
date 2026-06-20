<template>
  <section ref="el" id="partner" class="partner" aria-labelledby="partner-headline">
    <div class="partner-inner reveal" :class="{ 'is-visible': revealed }">

      <!-- Header -->
      <div class="partner-header">
        <p class="label">{{ copy.eyebrow }}</p>
        <h2 id="partner-headline" class="partner-headline">{{ copy.headline }}</h2>
      </div>

      <!-- Statement card -->
      <div class="statement-wrap">
        <div class="statement-card" role="region" aria-label="Example partner revenue statement">
          <div class="statement-head">
            <div>
              <p class="statement-title">PARTNER REVENUE STATEMENT</p>
              <p class="statement-period label">{{ copy.statement.period }}</p>
            </div>
            <span class="iris-stripe statement-stripe" aria-hidden="true" />
          </div>

          <div class="statement-rows">
            <div
              v-for="row in copy.statement.rows"
              :key="row.label"
              class="statement-row"
            >
              <span class="row-label">{{ row.label }}</span>
              <span class="row-value">{{ row.value }}</span>
            </div>
          </div>

          <div class="statement-total">
            <span class="total-label">{{ copy.statement.total.label }}</span>
            <span class="total-value iris-text">{{ copy.statement.total.value }}</span>
          </div>

          <p class="statement-note">{{ copy.note }}</p>
        </div>

        <!-- Side callouts -->
        <div class="partner-callouts">
          <div class="callout">
            <span class="callout-n font-mono label">01</span>
            <div>
              <p class="callout-title">Embed once</p>
              <p class="callout-detail">One widget. Your platform. Your fees.</p>
            </div>
          </div>
          <div class="callout">
            <span class="callout-n font-mono label">02</span>
            <div>
              <p class="callout-title">Configure fees</p>
              <p class="callout-detail">Platform fee and partner share set in admin console.</p>
            </div>
          </div>
          <div class="callout">
            <span class="callout-n font-mono label">03</span>
            <div>
              <p class="callout-title">Track revenue</p>
              <p class="callout-detail">Partner portal shows every transaction and commission.</p>
            </div>
          </div>
          <div class="callout">
            <span class="callout-n font-mono label">04</span>
            <div>
              <p class="callout-title">Admin visibility</p>
              <p class="callout-detail">Your operations team sees all partner activity.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { partner as copy } from '@/content/landingCopy'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { el, revealed } = useScrollReveal()
</script>

<style scoped>
.partner {
  border-bottom: 1px solid var(--ink);
  background: var(--paper);
}

.partner-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.partner-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.partner-headline {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(1.75rem, 4vw, 3.5rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  max-width: 36ch;
  margin: 0;
}

.statement-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

/* Statement card */
.statement-card {
  border: 1.5px solid var(--ink);
  font-family: 'Space Mono', monospace;
  font-size: 0.8125rem;
  overflow: hidden;
}

.statement-head {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  padding: 1.25rem;
  border-bottom: 1px solid var(--line);
  background: #fafafa;
}

.statement-title {
  font-weight: 700;
  letter-spacing: 0.06em;
  margin: 0 0 0.3rem;
  font-size: 0.75rem;
}

.statement-period {
  margin: 0;
}

/* Iridescent stripe accent */
.statement-stripe {
  width: 6px;
  flex-shrink: 0;
  background: linear-gradient(
    180deg,
    #667eea 0%,
    #764ba2 20%,
    #f093fb 40%,
    #f5576c 60%,
    #4facfe 80%,
    #00f2fe 100%
  );
  background-size: auto 300%;
  animation: iris-vert 5s linear infinite;
}

@keyframes iris-vert {
  0%   { background-position: 0 0; }
  100% { background-position: 0 -300%; }
}

.statement-rows {
  padding: 0 1.25rem;
}

.statement-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0.625rem 0;
  border-bottom: 1px solid var(--ink-faint);
}

.statement-row:last-child {
  border-bottom: none;
}

.row-label {
  color: var(--ink-mid);
}

.row-value {
  font-weight: 700;
}

.statement-total {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 1rem 1.25rem;
  border-top: 2px solid var(--ink);
  background: #fafafa;
}

.total-label {
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.04em;
}

.total-value {
  font-size: 1rem;
  font-weight: 700;
}

.statement-note {
  padding: 0.75rem 1.25rem;
  border-top: 1px solid var(--ink-faint);
  color: var(--ink-muted);
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  line-height: 1.6;
  margin: 0;
  background: var(--paper);
}

/* Callouts */
.partner-callouts {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.callout {
  display: flex;
  align-items: baseline;
  gap: 1.25rem;
  padding: 1.25rem 0;
  border-bottom: 1px solid var(--line);
}

.callout:first-child {
  border-top: 1px solid var(--line);
}

.callout-n {
  color: var(--ink-muted);
  flex-shrink: 0;
  width: 1.5rem;
}

.callout-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  margin: 0 0 0.2rem;
}

.callout-detail {
  font-size: 0.8125rem;
  color: var(--ink-mid);
  margin: 0;
  line-height: 1.5;
}

@media (max-width: 900px) {
  .statement-wrap {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .statement-stripe {
    animation: none;
    background: linear-gradient(180deg, #667eea, #4facfe);
    background-size: auto;
  }
}
</style>
