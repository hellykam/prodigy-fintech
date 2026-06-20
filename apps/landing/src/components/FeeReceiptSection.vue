<template>
  <section ref="el" id="fees" class="fees" aria-labelledby="fees-headline">
    <div class="fees-inner reveal" :class="{ 'is-visible': revealed }">

      <!-- Header col -->
      <div class="fees-header">
        <p class="label">{{ copy.eyebrow }}</p>
        <h2 id="fees-headline" class="fees-headline">{{ copy.headline }}</h2>
        <p class="fees-sub">{{ copy.subheadline }}</p>
      </div>

      <!-- Receipt col -->
      <div class="fees-receipt-wrap">
        <div class="fees-receipt" role="region" aria-label="Example fee breakdown">
          <!-- Receipt top edge -->
          <div class="receipt-teeth" aria-hidden="true" />

          <div class="receipt-inner">
            <div class="receipt-top-row">
              <span class="font-mono" style="font-size: 0.8125rem; letter-spacing: 0.08em;">TRANSACTION RECEIPT</span>
              <span class="font-mono muted" style="font-size: 0.75rem;">TXN-8841</span>
            </div>

            <div class="receipt-dashes" aria-hidden="true">- - - - - - - - - - - - - - - - - - - - - - -</div>

            <!-- Main rows -->
            <dl class="receipt-rows">
              <div class="receipt-pair">
                <dt>{{ copy.example.customerSends.label }}</dt>
                <dd>{{ copy.example.customerSends.value }}</dd>
              </div>
              <div class="receipt-pair muted">
                <dt>{{ copy.example.rate.label }}</dt>
                <dd>{{ copy.example.rate.value }}</dd>
              </div>

              <div class="receipt-dashes" aria-hidden="true">- - - - - - - - - - - - - - - - - - - - - - -</div>

              <div class="receipt-pair muted small">
                <dt>{{ copy.example.platformFee.label }}</dt>
                <dd>{{ copy.example.platformFee.value }}</dd>
              </div>
              <div class="receipt-pair muted small">
                <dt>{{ copy.example.partnerShare.label }}</dt>
                <dd>{{ copy.example.partnerShare.value }}</dd>
              </div>
              <div class="receipt-pair muted small">
                <dt>{{ copy.example.networkFee.label }}</dt>
                <dd>{{ copy.example.networkFee.value }}</dd>
              </div>

              <div class="receipt-dashes" aria-hidden="true">= = = = = = = = = = = = = = = = = = = = = = =</div>

              <div class="receipt-pair total">
                <dt>{{ copy.example.customerReceives.label }}</dt>
                <dd class="iris-text">{{ copy.example.customerReceives.value }}</dd>
              </div>
            </dl>

            <div class="receipt-dashes" aria-hidden="true">- - - - - - - - - - - - - - - - - - - - - - -</div>

            <!-- Stamp -->
            <div class="receipt-stamp-row">
              <span class="stamp stamp-approved">APPROVED</span>
              <span class="receipt-meta muted">2026-06-17 · 14:32:08 UTC</span>
            </div>
          </div>

          <!-- Receipt bottom edge -->
          <div class="receipt-teeth receipt-teeth--bottom" aria-hidden="true" />
        </div>

        <p class="fees-note">{{ copy.note }}</p>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { fees as copy } from '@/content/landingCopy'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { el, revealed } = useScrollReveal()
</script>

<style scoped>
.fees {
  border-bottom: 1px solid var(--ink);
  background: var(--paper);
}

.fees-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 5rem 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
}

.fees-header {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.fees-headline {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(2rem, 4.5vw, 4rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  margin: 0;
}

.fees-sub {
  font-size: 0.9375rem;
  color: var(--ink-mid);
  line-height: 1.6;
  margin: 0;
  max-width: 38ch;
}

/* Receipt */
.fees-receipt-wrap {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
}

.fees-receipt {
  width: 100%;
  max-width: 380px;
  font-family: 'Space Mono', monospace;
  font-size: 0.8125rem;
  background: var(--paper);
  box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.08);
}

/* Torn receipt edges */
.receipt-teeth {
  height: 10px;
  background: repeating-linear-gradient(
    90deg,
    var(--paper) 0px,
    var(--paper) 8px,
    var(--ink-faint) 8px,
    var(--ink-faint) 10px
  );
  border-left: 1px solid var(--line);
  border-right: 1px solid var(--line);
  border-top: 1px solid var(--line);
}

.receipt-teeth--bottom {
  border-top: none;
  border-bottom: 1px solid var(--line);
  transform: scaleY(-1);
}

.receipt-inner {
  border-left: 1px solid var(--line);
  border-right: 1px solid var(--line);
  padding: 1.25rem 1.25rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.receipt-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.receipt-dashes {
  color: var(--line);
  font-size: 0.75rem;
  letter-spacing: 0;
  overflow: hidden;
  white-space: nowrap;
}

.receipt-rows {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.receipt-pair {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.5rem;
}

.receipt-pair dt {
  font-weight: 400;
  color: var(--ink);
}

.receipt-pair dd {
  margin: 0;
  font-weight: 700;
  text-align: right;
}

.receipt-pair.muted dt,
.receipt-pair.muted dd {
  color: var(--ink-mid);
  font-weight: 400;
}

.receipt-pair.small {
  font-size: 0.75rem;
}

.receipt-pair.total dt {
  font-weight: 700;
  font-size: 0.75rem;
}

.receipt-pair.total dd {
  font-size: 0.875rem;
  font-weight: 700;
}

.receipt-stamp-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.25rem;
}

.receipt-meta {
  font-size: 0.75rem;
  letter-spacing: 0.04em;
}

/* Stamp */
.stamp {
  display: inline-block;
  border: 1.5px solid currentColor;
  padding: 0.125em 0.4em;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.stamp-approved {
  color: var(--ink);
  border-color: var(--ink);
}

.fees-note {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: var(--ink-mid);
  letter-spacing: 0.04em;
  line-height: 1.6;
  max-width: 38ch;
  margin: 0;
}

.muted {
  color: var(--ink-muted);
}

@media (max-width: 900px) {
  .fees-inner {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}
</style>
