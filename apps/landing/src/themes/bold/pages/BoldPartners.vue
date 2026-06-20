<template>
  <main>

    <!-- ── Hero ──────────────────────────────────────────────────── -->
    <section class="hero" aria-labelledby="partners-headline">
      <div class="hero-inner">
        <div class="iris-bar" aria-hidden="true" />
        <div class="hero-content">
          <p class="eyebrow">Partners</p>
          <h1 id="partners-headline" class="hero-headline">
            SET YOUR FEE. EARN WHILE YOU SLEEP.
          </h1>
          <p class="hero-sub">
            Configure your partner share once. Every transaction that passes through your embed posts revenue to your portal automatically. No CSV archaeology required.
          </p>
          <div class="hero-ctas">
            <a
              href="http://localhost:5006"
              target="_blank"
              rel="noopener noreferrer"
              class="hero-cta hero-cta--fill"
            >
              PARTNER PORTAL →
            </a>
            <a
              href="http://localhost:5002"
              target="_blank"
              rel="noopener noreferrer"
              class="hero-cta hero-cta--ghost"
            >
              ADMIN CONSOLE →
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ── FeeCalculator ─────────────────────────────────────────── -->
    <section class="bold-fee-section" aria-labelledby="bold-fee-h" data-reveal="fade-up">
      <div class="bold-fee-inner">
        <div class="bold-fee-left">
          <h2 id="bold-fee-h" class="bold-fee-headline">YOUR CUT. LIVE.</h2>
          <ul class="bold-fee-bullets">
            <li>Set your own fee layer on top of platform rates</li>
            <li>Earn 15–25% of all platform fees generated</li>
            <li>Paid monthly via partner portal</li>
            <li>Volume discounts kick in automatically</li>
          </ul>
        </div>
        <div class="bold-fee-right">
          <FeeCalculator theme="bold" />
        </div>
      </div>
    </section>

    <!-- ── Revenue Statement ─────────────────────────────────────── -->
    <section class="revenue" aria-labelledby="revenue-headline">
      <div class="section-inner">
        <div class="section-header">
          <h2 id="revenue-headline" class="section-title">YOUR REVENUE, ITEMISED</h2>
        </div>

        <div class="invoice-card" role="table" aria-label="Revenue statement example">
          <div class="invoice-head">
            <span class="invoice-brand">◈ PRODIGY PARTNER STATEMENT</span>
            <span class="invoice-date">June 2026 · Demo</span>
          </div>

          <hr class="invoice-rule" />

          <div class="invoice-rows" role="rowgroup">
            <div class="invoice-row invoice-row--section" role="row">
              <span class="inv-label" role="cell">Total transaction volume</span>
              <span class="inv-value" role="cell">€125,000</span>
            </div>
            <div class="invoice-row" role="row">
              <span class="inv-label inv-label--muted" role="cell">Platform fee (0.5%) — retained</span>
              <span class="inv-value inv-value--muted" role="cell">−€625.00</span>
            </div>
            <div class="invoice-row" role="row">
              <span class="inv-label inv-label--muted" role="cell">Network fees — passed through</span>
              <span class="inv-value inv-value--muted" role="cell">−€250.00</span>
            </div>
            <div class="invoice-row" role="row">
              <span class="inv-label inv-label--muted" role="cell">KYC checks</span>
              <span class="inv-value inv-value--muted" role="cell">Included</span>
            </div>
          </div>

          <hr class="invoice-rule invoice-rule--bold" />

          <div class="invoice-row invoice-row--total" role="row">
            <span class="inv-label" role="cell">Your partner share (0.2%)</span>
            <span class="inv-value inv-value--big" role="cell">€250.00</span>
          </div>

          <div class="invoice-row invoice-row--total" role="row">
            <span class="inv-label" role="cell">Payout (auto, monthly)</span>
            <span class="inv-value inv-value--iris" role="cell">€250.00</span>
          </div>

          <p class="invoice-note">
            Partner share is configurable per integration. This example uses 0.2%.
            Higher volume, higher payout — the math does not change.
          </p>
        </div>
      </div>
    </section>

    <!-- ── Revenue Animation Counters ──────────────────────────────── -->
    <section class="rev-counters" aria-labelledby="rev-counters-headline">
      <h2 id="rev-counters-headline" class="sr-only">Revenue statistics</h2>
      <div class="rev-counters-inner">
        <div class="rev-counter-cell">
          <CounterStat :value="248" label="TRANSACTIONS" accent-color="#f5f5f0" />
        </div>
        <div class="rev-counter-cell">
          <CounterStat :value="249.60" prefix="€" label="PARTNER PAYOUT" accent-color="#34d399" />
        </div>
        <div class="rev-counter-cell">
          <CounterStat :value="124800" prefix="€" label="VOLUME" accent-color="#f5f5f0" />
        </div>
      </div>
    </section>

    <!-- ── Step Cards ────────────────────────────────────────────── -->
    <section class="steps" aria-labelledby="steps-headline">
      <div class="section-inner">
        <div class="section-header">
          <h2 id="steps-headline" class="section-title">FOUR STEPS TO REVENUE</h2>
        </div>

        <div class="step-grid">
          <div
            v-for="step in steps"
            :key="step.n"
            class="step-card"
          >
            <div class="step-iris" aria-hidden="true" />
            <div class="step-n" aria-hidden="true">{{ step.n }}</div>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-detail">{{ step.detail }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Revenue Calculator ────────────────────────────────────── -->
    <section class="rc-section" aria-labelledby="rc-heading">
      <div class="rc-inner">
        <h2 id="rc-heading" class="rc-headline">YOUR REVENUE POTENTIAL</h2>
        <p class="rc-sub">Drag the sliders. See what Prodigy pays you every month.</p>
        <div class="rc-controls">
          <div class="rc-field">
            <label for="rc-vol" class="rc-label">MONTHLY VOLUME</label>
            <input id="rc-vol" v-model.number="rcVolume" type="range" min="10000" max="5000000" step="10000" class="rc-slider" />
            <span class="rc-val">€{{ rcVolume.toLocaleString('de-DE') }}</span>
          </div>
          <div class="rc-field">
            <label for="rc-markup" class="rc-label">YOUR MARKUP</label>
            <input id="rc-markup" v-model.number="rcMarkup" type="range" min="0.1" max="2" step="0.1" class="rc-slider" />
            <span class="rc-val">{{ rcMarkup.toFixed(1) }}%</span>
          </div>
        </div>
        <div class="rc-result" aria-live="polite" aria-label="Revenue estimate">
          <span class="rc-result-label">YOUR MONTHLY EARN</span>
          <span class="rc-result-num">€{{ rcMonthlyEarn.toLocaleString('de-DE', {minimumFractionDigits:2,maximumFractionDigits:2}) }}</span>
        </div>
      </div>
    </section>

    <!-- ── Partner Types ─────────────────────────────────────────── -->
    <section class="partner-types-section" aria-labelledby="partner-types-headline">
      <div class="section-inner">
        <div class="section-header">
          <h2 id="partner-types-headline" class="section-title" data-reveal="fade-up">THREE WAYS TO EARN.</h2>
        </div>
        <div class="partner-types-list" data-animate-stagger ref="boldTypesGrid">
          <div class="ptype-card ptype-card--blue">
            <div class="ptype-name">TECHNOLOGY PARTNER</div>
            <p class="ptype-desc">Embed. Earn. Keep 20% of every transaction your users make.</p>
          </div>
          <div class="ptype-card ptype-card--magenta">
            <div class="ptype-name">REFERRAL PARTNER</div>
            <p class="ptype-desc">Send leads. Earn 15% of their first-year revenue. No integration needed.</p>
          </div>
          <div class="ptype-card ptype-card--lime">
            <div class="ptype-name">WHITE-LABEL RESELLER</div>
            <p class="ptype-desc">Your brand. Our engine. Custom margins.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Partner Economics Table ───────────────────────────────── -->
    <section class="partner-econ-section" aria-labelledby="partner-econ-headline">
      <div class="section-inner">
        <div class="section-header">
          <h2 id="partner-econ-headline" class="section-title" data-reveal="fade-up">PARTNER ECONOMICS.</h2>
        </div>
        <div class="pecon-table" role="table" aria-label="Partner economics">
          <div class="pecon-head" role="row">
            <span role="columnheader">TYPE</span>
            <span role="columnheader">REVENUE SHARE</span>
            <span role="columnheader">ATTRIBUTION</span>
            <span role="columnheader">PAYOUT</span>
          </div>
          <div class="pecon-row" role="row">
            <span class="pecon-type" role="cell">Technology</span>
            <span class="pecon-share pecon-share--blue" role="cell">20%</span>
            <span role="cell">12 months</span>
            <span role="cell">Monthly</span>
          </div>
          <div class="pecon-row" role="row">
            <span class="pecon-type" role="cell">Referral</span>
            <span class="pecon-share pecon-share--magenta" role="cell">15% (year 1)</span>
            <span role="cell">30 days</span>
            <span role="cell">Monthly</span>
          </div>
          <div class="pecon-row" role="row">
            <span class="pecon-type" role="cell">White-label</span>
            <span class="pecon-share pecon-share--lime" role="cell">Custom</span>
            <span role="cell">N/A</span>
            <span role="cell">Negotiated</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Social Proof Quote ────────────────────────────────────── -->
    <section class="bold-quote-section" aria-label="Partner quote" data-reveal="fade-up">
      <div class="section-inner">
        <figure class="bold-quote-card">
          <blockquote class="bold-quote-text">"Partner portal is the only dashboard we open first thing every morning. The numbers make us smile."</blockquote>
          <figcaption class="bold-quote-attr">
            <span class="bold-quote-company">SwapDeck</span>
            <span class="bold-quote-role">· London · Technology Partner</span>
          </figcaption>
        </figure>
      </div>
    </section>

    <!-- ── Partner CTA ────────────────────────────────────────────── -->
    <section class="partner-cta-section" aria-labelledby="partner-cta-headline">
      <div class="partner-cta-inner">
        <h2 id="partner-cta-headline" class="partner-cta-headline" data-reveal="fade-up">DON'T WAIT.</h2>
        <p class="partner-cta-sub">Partnership slots are open. We review fast. You start earning faster.</p>
        <div class="partner-cta-actions">
          <a href="http://localhost:5006" target="_blank" rel="noopener noreferrer" class="partner-cta-btn partner-cta-btn--fill">Apply now →</a>
          <a href="#" class="partner-cta-btn partner-cta-btn--outline">Book a call</a>
        </div>
        <p class="partner-cta-note">(Demo form)</p>
      </div>
    </section>

    <!-- ── CTA Strip ──────────────────────────────────────────────── -->
    <section class="cta-strip" aria-labelledby="partners-cta-h">
      <div class="cta-inner">
        <div class="cta-text">
          <h2 id="partners-cta-h" class="cta-headline">START EARNING TODAY.</h2>
          <p class="cta-sub">Open the partner portal or check the admin console to see the full flow.</p>
        </div>
        <div class="cta-actions">
          <a
            href="http://localhost:5006"
            target="_blank"
            rel="noopener noreferrer"
            class="cta-btn cta-btn--fill"
          >
            PARTNER PORTAL →
          </a>
          <a
            href="http://localhost:5002"
            target="_blank"
            rel="noopener noreferrer"
            class="cta-btn cta-btn--ghost"
          >
            ADMIN CONSOLE →
          </a>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CounterStat from '@/components/shared/CounterStat.vue'
import { useCardTiltAll } from '@/composables/useCardTilt'
import FeeCalculator from '@/components/shared/FeeCalculator.vue'

const boldTypesGrid = ref<HTMLElement | null>(null)
useCardTiltAll(boldTypesGrid, '.ptype-card', { maxTilt: 7, scale: 1.03, glowColor: '#2563eb', glowIntensity: 0.25 })

const rcVolume = ref(100000)
const rcMarkup = ref(0.5)
const rcMonthlyEarn = computed(() => rcVolume.value * rcMarkup.value / 100)

const steps = [
  {
    n: '01',
    title: 'EMBED',
    detail: 'Add the Prodigy script tag to your app. Configure your brand and fee split in the partner portal.',
  },
  {
    n: '02',
    title: 'CONFIGURE',
    detail: 'Set your partner share percentage. Choose which currencies to support. Set KYC thresholds.',
  },
  {
    n: '03',
    title: 'TRACK',
    detail: 'Every transaction appears in your partner portal in real time. Volume, revenue, commissions — all visible.',
  },
  {
    n: '04',
    title: 'EARN',
    detail: 'Partner share is calculated and posted automatically after each transaction. Monthly payouts.',
  },
]
</script>

<style scoped>
/* ── Custom properties ─────────────────────────────────────── */
.hero, .revenue, .steps, .cta-strip, .rev-counters {
  --ink: #0a0a0a;
  --paper: #f5f5f0;
  --grid: rgba(0, 0, 0, 0.07);
}

/* ── Grid paper ────────────────────────────────────────────── */
.hero,
.revenue,
.steps {
  background-color: var(--paper);
  background-image:
    linear-gradient(var(--grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: 24px 24px;
}

/* ── Hero ──────────────────────────────────────────────────── */
.hero {
  border-bottom: 3px solid var(--ink);
}

.hero-inner {
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.iris-bar {
  height: 3px;
  background: linear-gradient(90deg, #ff6bcb, #a78bfa, #38bdf8, #34d399, #fbbf24, #ff6bcb);
  background-size: 200% auto;
  animation: iris-flow 5s linear infinite;
  will-change: background-position;
}

@keyframes iris-flow {
  0%   { background-position: 0% center; }
  100% { background-position: -200% center; }
}

.hero-content {
  padding: 5rem 1.5rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1000px;
}

.eyebrow {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(10, 10, 10, 0.5);
  margin: 0;
}

.hero-headline {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(3.5rem, 8vw, 7rem);
  letter-spacing: 0.02em;
  line-height: 0.9;
  color: var(--ink);
  margin: 0;
}

.hero-sub {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(10, 10, 10, 0.65);
  max-width: 48ch;
  margin: 0;
}

.hero-ctas {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-cta {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.125rem;
  letter-spacing: 0.08em;
  text-decoration: none;
  padding: 0.75rem 2rem;
  display: inline-block;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}

.hero-cta--fill {
  background: var(--ink);
  color: #f5f5f0;
  border: 2px solid var(--ink);
}

.hero-cta--fill:hover {
  background: transparent;
  color: var(--ink);
}

.hero-cta--ghost {
  background: transparent;
  color: rgba(10, 10, 10, 0.75);
  border: 2px solid rgba(10, 10, 10, 0.35);
}

.hero-cta--ghost:hover {
  border-color: var(--ink);
  color: var(--ink);
}

/* ── Section shared ────────────────────────────────────────── */
.section-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 5rem 1.5rem;
}

.section-header {
  border-bottom: 3px solid var(--ink);
  padding-bottom: 1.5rem;
  margin-bottom: 3rem;
}

.section-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(2rem, 4vw, 3.5rem);
  letter-spacing: 0.02em;
  line-height: 0.9;
  color: var(--ink);
  margin: 0;
}

/* ── Revenue Invoice ───────────────────────────────────────── */
.revenue {
  border-bottom: 3px solid var(--ink);
}

.invoice-card {
  border: 2px solid var(--ink);
  padding: 2.5rem 2rem;
  max-width: 580px;
  background-color: #f5f5f0;
  font-family: 'Space Grotesk', sans-serif;
}

.invoice-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
}

.invoice-brand {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1rem;
  letter-spacing: 0.1em;
  color: var(--ink);
}

.invoice-date {
  font-size: 0.75rem;
  color: rgba(10, 10, 10, 0.45);
  letter-spacing: 0.06em;
  font-weight: 500;
}

.invoice-rule {
  border: none;
  border-top: 1px dashed rgba(10, 10, 10, 0.2);
  margin: 1.25rem 0;
}

.invoice-rule--bold {
  border-top: 2px solid var(--ink);
  margin: 1.5rem 0;
}

.invoice-rows {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.invoice-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0.625rem 0;
  border-bottom: 1px solid rgba(10, 10, 10, 0.06);
}

.invoice-row:last-child {
  border-bottom: none;
}

.invoice-row--section .inv-label {
  font-weight: 700;
}

.invoice-row--total {
  padding: 0.75rem 0;
  border-bottom: none;
}

.inv-label {
  font-size: 0.875rem;
  color: var(--ink);
}

.inv-label--muted {
  color: rgba(10, 10, 10, 0.55);
}

.inv-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--ink);
  text-align: right;
}

.inv-value--muted {
  color: rgba(10, 10, 10, 0.45);
  font-weight: 400;
}

.inv-value--big {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.5rem;
  letter-spacing: 0.02em;
  color: var(--ink);
}

.inv-value--iris {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.5rem;
  letter-spacing: 0.02em;
  background: linear-gradient(135deg, #ff6bcb, #a78bfa, #38bdf8, #34d399, #fbbf24);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.invoice-note {
  font-size: 0.75rem;
  color: rgba(10, 10, 10, 0.45);
  line-height: 1.6;
  margin: 1rem 0 0;
}

/* ── SR-only utility ───────────────────────────────────────── */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* ── Revenue Counters ──────────────────────────────────────── */
.rev-counters {
  background: var(--ink);
  border-bottom: 3px solid var(--ink);
}

.rev-counters-inner {
  max-width: 1440px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.rev-counter-cell {
  padding: 4rem 2.5rem;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.rev-counter-cell:last-child {
  border-right: none;
}

/* Override CounterStat to use Bold Editorial aesthetics */
.rev-counter-cell :deep(.counter-stat) {
  gap: 0.5rem;
}

.rev-counter-cell :deep(.stat-value) {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(3rem, 6vw, 5rem);
  letter-spacing: 0.02em;
  font-weight: 400;
}

.rev-counter-cell :deep(.stat-label) {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: rgba(245, 245, 240, 0.45);
  opacity: 1;
}

/* ── Steps ─────────────────────────────────────────────────── */
.steps {
  border-bottom: 3px solid var(--ink);
  border-top: 3px solid var(--ink);
}

.step-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 1px solid var(--ink);
}

.step-card {
  border-right: 1px solid var(--ink);
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  position: relative;
  background-color: var(--paper);
  background-image:
    linear-gradient(var(--grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: 24px 24px;
}

.step-card:last-child {
  border-right: none;
}

.step-iris {
  height: 3px;
  background: linear-gradient(90deg, #ff6bcb, #a78bfa, #38bdf8, #34d399, #fbbf24);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.step-n {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 4rem;
  color: var(--ink);
  opacity: 0.12;
  line-height: 1;
  letter-spacing: 0.02em;
  margin-top: 0.75rem;
  user-select: none;
}

.step-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2rem;
  letter-spacing: 0.02em;
  line-height: 0.9;
  color: var(--ink);
  margin: 0;
}

.step-detail {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.875rem;
  line-height: 1.6;
  color: rgba(10, 10, 10, 0.65);
  margin: 0;
}

/* ── CTA Strip ─────────────────────────────────────────────── */
.cta-strip {
  background: #0a0a0a;
}

.cta-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 5rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  flex-wrap: wrap;
}

.cta-text {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.cta-headline {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  letter-spacing: 0.02em;
  line-height: 0.9;
  color: #f5f5f0;
  margin: 0;
}

.cta-sub {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9375rem;
  color: rgba(245, 245, 240, 0.55);
  margin: 0;
  max-width: 44ch;
}

.cta-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  flex-shrink: 0;
}

.cta-btn {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.125rem;
  letter-spacing: 0.08em;
  text-decoration: none;
  padding: 0.875rem 2rem;
  display: inline-block;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
  white-space: nowrap;
}

.cta-btn--fill {
  background: #f5f5f0;
  color: #0a0a0a;
  border: 2px solid #f5f5f0;
}

.cta-btn--fill:hover {
  background: transparent;
  color: #f5f5f0;
}

.cta-btn--ghost {
  background: transparent;
  color: rgba(245, 245, 240, 0.8);
  border: 2px solid rgba(245, 245, 240, 0.4);
}

.cta-btn--ghost:hover {
  color: #f5f5f0;
  border-color: #f5f5f0;
}

/* ── Partner Types ─────────────────────────────────────────── */
.partner-types-section {
  background-color: var(--paper);
  background-image:
    linear-gradient(var(--grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: 24px 24px;
  border-bottom: 3px solid var(--ink);
}

.partner-types-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.ptype-card {
  padding: 2.5rem 2rem;
  background: #0a0a0a;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.ptype-card--blue  { border-top: 5px solid #2563eb; }
.ptype-card--magenta { border-top: 5px solid #e879f9; }
.ptype-card--lime  { border-top: 5px solid #a3e635; }

.ptype-name {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.75rem;
  letter-spacing: 0.04em;
  color: #f5f5f0;
}

.ptype-desc {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(245, 245, 240, 0.65);
  max-width: 52ch;
  margin: 0;
}

/* ── Partner Economics ─────────────────────────────────────── */
.partner-econ-section {
  background-color: var(--paper);
  background-image:
    linear-gradient(var(--grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: 24px 24px;
  border-bottom: 3px solid var(--ink);
}

.pecon-table {
  border: 2px solid var(--ink);
  width: 100%;
}

.pecon-head {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  background: var(--ink);
  padding: 0.875rem 1.25rem;
  gap: 1rem;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1rem;
  letter-spacing: 0.06em;
  color: #f5f5f0;
}

.pecon-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 1.25rem 1.25rem;
  gap: 1rem;
  border-bottom: 1px solid rgba(10, 10, 10, 0.12);
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9375rem;
  color: rgba(10, 10, 10, 0.7);
  align-items: center;
}

.pecon-row:last-child { border-bottom: none; }

.pecon-type {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.25rem;
  letter-spacing: 0.04em;
  color: var(--ink);
}

.pecon-share {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.5rem;
  letter-spacing: 0.02em;
}

.pecon-share--blue    { color: #2563eb; }
.pecon-share--magenta { color: #e879f9; }
.pecon-share--lime    { color: #65a30d; }

/* ── Partner CTA ───────────────────────────────────────────── */
.partner-cta-section {
  background: #0a0a0a;
}

.partner-cta-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 5rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 2rem;
}

.partner-cta-headline {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(2.5rem, 5vw, 5rem);
  letter-spacing: 0.02em;
  line-height: 0.92;
  color: #f5f5f0;
  margin: 0;
  max-width: 22ch;
}

.partner-cta-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.partner-cta-btn {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.25rem;
  letter-spacing: 0.1em;
  text-decoration: none;
  padding: 0.875rem 2.5rem;
  display: inline-block;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}

.partner-cta-btn--fill {
  background: #f5f5f0;
  color: #0a0a0a;
  border: 2px solid #f5f5f0;
}

.partner-cta-btn--fill:hover {
  background: transparent;
  color: #f5f5f0;
}

.partner-cta-btn--outline {
  background: transparent;
  color: rgba(245, 245, 240, 0.8);
  border: 2px solid rgba(245, 245, 240, 0.4);
}

.partner-cta-btn--outline:hover {
  color: #f5f5f0;
  border-color: #f5f5f0;
}

.partner-cta-note {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8125rem;
  color: rgba(245, 245, 240, 0.35);
  margin: 0;
}

/* ── Responsive ────────────────────────────────────────────── */
@media (max-width: 768px) {
  .rev-counters-inner {
    grid-template-columns: 1fr;
  }
  .rev-counter-cell {
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding: 2.5rem 1.5rem;
  }
  .rev-counter-cell:last-child {
    border-bottom: none;
  }
}

@media (max-width: 1024px) {
  .step-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .step-card:nth-child(2n) {
    border-right: none;
  }

  .step-card:nth-child(2) {
    border-bottom: 1px solid var(--ink);
  }

  .step-card:nth-child(3) {
    border-bottom: none;
    border-right: 1px solid var(--ink);
  }
}

@media (max-width: 768px) {
  .cta-inner {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 580px) {
  .step-grid {
    grid-template-columns: 1fr;
  }

  .step-card {
    border-right: none !important;
    border-bottom: 1px solid var(--ink) !important;
  }

  .step-card:last-child {
    border-bottom: none !important;
  }
}

@media (prefers-reduced-motion: reduce) {
  .iris-bar { animation: none; background: #a78bfa; }
}

/* ── Fee Calculator section ── */
.bold-fee-section { background: #0a0a0a; border-bottom: 3px solid var(--ink); }
.bold-fee-inner { max-width: 1440px; margin: 0 auto; padding: 5rem 1.5rem; display: grid; grid-template-columns: 1fr 1.4fr; gap: 4rem; align-items: start; }
.bold-fee-left { display: flex; flex-direction: column; gap: 2rem; }
.bold-fee-headline { font-family: 'Bebas Neue', sans-serif; font-size: clamp(3rem, 6vw, 5rem); letter-spacing: 0.02em; line-height: 0.9; color: #f5f5f0; margin: 0; }
.bold-fee-bullets { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.75rem; }
.bold-fee-bullets li { font-family: 'Space Grotesk', sans-serif; font-size: 0.9375rem; line-height: 1.6; color: rgba(245,245,240,0.7); padding-left: 1.5rem; position: relative; }
.bold-fee-bullets li::before { content: '→'; position: absolute; left: 0; color: #2563eb; font-weight: 700; }
.bold-fee-right { min-width: 0; }
@media (max-width: 900px) { .bold-fee-inner { grid-template-columns: 1fr; gap: 2.5rem; } }

/* ── Quote section ── */
.bold-quote-section { background-color: var(--paper); background-image: linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px); background-size: 24px 24px; border-bottom: 3px solid var(--ink); }
.bold-quote-card { margin: 0; border: 2px solid var(--ink); border-left: 5px solid #2563eb; padding: 2rem 2.5rem; max-width: 720px; }
.bold-quote-text { font-family: 'Space Grotesk', sans-serif; font-size: 1.0625rem; font-style: italic; line-height: 1.65; color: var(--ink); margin: 0 0 1rem; }
.bold-quote-attr { display: flex; gap: 0.5rem; align-items: baseline; }
.bold-quote-company { font-family: 'Bebas Neue', sans-serif; font-size: 1.25rem; letter-spacing: 0.04em; color: #2563eb; }
.bold-quote-role { font-family: 'Space Grotesk', sans-serif; font-size: 0.8125rem; color: rgba(10,10,10,0.5); }

/* ── CTA sub ── */
.partner-cta-sub { font-family: 'Space Grotesk', sans-serif; font-size: 1rem; color: rgba(245,245,240,0.65); max-width: 44ch; text-align: center; margin: 0; }

/* ── Revenue Calculator ── */
.rc-section { background: #0a0a0a; border-top: 2px solid rgba(245,245,240,0.1); }
.rc-inner { max-width: 1440px; margin: 0 auto; padding: 5rem 1.5rem; }
.rc-headline { font-family: 'Bebas Neue', sans-serif; font-size: clamp(3rem, 6vw, 6rem); letter-spacing: 0.02em; color: #f5f5f0; margin: 0 0 0.5rem; line-height: 0.9; }
.rc-sub { font-family: 'Space Grotesk', sans-serif; font-size: 1rem; color: rgba(245,245,240,0.6); margin: 0 0 3rem; }
.rc-controls { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 3rem; }
.rc-field { display: flex; flex-direction: column; gap: 0.5rem; }
.rc-label { font-family: 'Space Grotesk', sans-serif; font-size: 0.75rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(245,245,240,0.4); }
.rc-slider { width: 100%; accent-color: #a78bfa; }
.rc-val { font-family: 'Space Grotesk', sans-serif; font-size: 0.875rem; color: #f5f5f0; }
.rc-result { border: 1px solid rgba(245,245,240,0.15); padding: 2.5rem; display: flex; flex-direction: column; gap: 0.5rem; }
.rc-result-label { font-family: 'Space Grotesk', sans-serif; font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(245,245,240,0.4); }
.rc-result-num { font-family: 'Bebas Neue', sans-serif; font-size: clamp(3rem, 8vw, 7rem); line-height: 0.9; background: linear-gradient(135deg,#ff6bcb,#a78bfa,#38bdf8,#34d399); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
@media (max-width: 768px) { .rc-controls { grid-template-columns: 1fr; } }
</style>
