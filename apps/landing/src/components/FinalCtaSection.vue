<template>
  <section id="final-cta" class="final-cta" aria-labelledby="cta-headline">
    <!-- Iridescent stripe accent at top -->
    <div class="cta-iris-bar iris-stripe" aria-hidden="true" />

    <div class="cta-inner">

      <div class="cta-content">
        <p class="label">{{ copy.eyebrow }}</p>
        <h2 id="cta-headline" class="cta-headline">{{ copy.headline }}</h2>
        <p class="cta-micro">{{ copy.microcopy }}</p>
      </div>

      <div class="cta-actions">
        <a :href="copy.demoUrls.consumer" target="_blank" rel="noopener noreferrer" class="cta-btn cta-btn--primary">{{ copy.cta }} →</a>
        <a :href="copy.demoUrls.admin" target="_blank" rel="noopener noreferrer" class="cta-btn cta-btn--secondary">{{ copy.ctaSecondary }}</a>
        <a :href="copy.demoUrls.partner" target="_blank" rel="noopener noreferrer" class="cta-btn cta-btn--secondary">{{ copy.ctaTertiary }}</a>
        <a :href="copy.demoUrls.sumsub" target="_blank" rel="noopener noreferrer" class="cta-btn cta-btn--secondary">KYC / Sumsub ↗</a>
        <a :href="copy.demoUrls.systemMap" target="_blank" rel="noopener noreferrer" class="cta-btn cta-btn--secondary">System Map ↗</a>
        <a :href="copy.demoUrls.widget" target="_blank" rel="noopener noreferrer" class="cta-btn cta-btn--secondary">Embed Widget ↗</a>
      </div>

      <!-- Mini receipt stub -->
      <div class="cta-stub font-mono" aria-hidden="true">
        <div class="stub-row">
          <span class="muted">Status</span>
          <span>Demo ready</span>
        </div>
        <div class="stub-row">
          <span class="muted">Wallet required</span>
          <span>No</span>
        </div>
        <div class="stub-row">
          <span class="muted">Real money</span>
          <span>No</span>
        </div>
        <div class="stub-row">
          <span class="muted">Hidden fees</span>
          <span>Also no</span>
        </div>
        <div class="stub-row">
          <span class="muted">Support</span>
          <span>Human</span>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { finalCta as copy } from '@/content/landingCopy'
</script>

<style scoped>
.final-cta {
  background: var(--ink);
  color: var(--paper);
  border-bottom: 1px solid var(--ink);
  position: relative;
}

.cta-iris-bar {
  height: 4px;
  background: linear-gradient(
    90deg,
    #667eea 0%,
    #764ba2 15%,
    #f093fb 30%,
    #f5576c 45%,
    #4facfe 65%,
    #00f2fe 80%,
    #667eea 100%
  );
  background-size: 200% auto;
  animation: iris-shift 5s linear infinite;
}

@keyframes iris-shift {
  0%   { background-position: 0% center; }
  100% { background-position: -200% center; }
}

.cta-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 5rem 1.5rem;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.cta-content {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.cta-content .label {
  color: rgba(255, 255, 255, 0.65);
}

.cta-headline {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  margin: 0;
  color: var(--paper);
}

.cta-micro {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  max-width: 44ch;
}

.cta-actions {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.cta-btn {
  display: block;
  font-family: 'Space Mono', monospace;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 0.875rem 1.5rem;
  text-align: center;
  border: 1.5px solid var(--paper);
  transition: background 0.15s, color 0.15s;
}

.cta-btn--primary {
  background: var(--paper);
  color: var(--ink);
}

.cta-btn--primary:hover {
  background: transparent;
  color: var(--paper);
}

.cta-btn--secondary {
  background: transparent;
  color: rgba(255, 255, 255, 0.85);
  border-color: rgba(255, 255, 255, 0.4);
}

.cta-btn--secondary:hover {
  border-color: var(--paper);
  color: var(--paper);
}

/* Mini receipt stub */
.cta-stub {
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 1rem;
  font-size: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.stub-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0.4rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.stub-row:last-child {
  border-bottom: none;
}

.muted {
  color: rgba(255, 255, 255, 0.62);
}

@media (max-width: 900px) {
  .cta-inner {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cta-iris-bar {
    animation: none;
    background: linear-gradient(90deg, #667eea, #4facfe);
    background-size: auto;
  }
}
</style>
