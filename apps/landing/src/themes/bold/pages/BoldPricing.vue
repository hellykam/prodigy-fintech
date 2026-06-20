<template>
  <main>

    <!-- ── Hero ──────────────────────────────────────────────────── -->
    <section class="hero" aria-labelledby="pricing-headline" ref="heroSection">
      <div class="hero-inner">
        <div class="iris-bar" aria-hidden="true" />
        <div class="hero-content">
          <p class="eyebrow">Pricing</p>
          <h1 id="pricing-headline" class="hero-headline" ref="heroTitle">
            THE NUMBERS ARE EMBARRASSINGLY GOOD.
          </h1>
          <p class="hero-sub" ref="heroSub">
            Three fees. All itemised. All visible before the button is pressed.
            No surcharges discovered at 2&thinsp;a.m. No footnotes requiring legal interpretation.
          </p>
        </div>
      </div>
    </section>

    <!-- ── Fee Breakdown ─────────────────────────────────────────── -->
    <section class="fees" aria-labelledby="fees-headline">
      <div class="section-inner">
        <div class="section-header">
          <h2 id="fees-headline" class="section-title" ref="feat1">THE RECEIPT</h2>
        </div>

        <!-- Annual / Monthly toggle -->
        <div class="billing-toggle" role="group" aria-label="Billing period">
          <button class="billing-btn" :class="{ active: !annual }" @click="annual = false" :aria-pressed="!annual">Monthly</button>
          <button class="billing-btn billing-btn--annual" :class="{ active: annual }" @click="annual = true" :aria-pressed="annual">
            Annual <span class="save-badge">−20%</span>
          </button>
        </div>
        <p v-if="annual" class="billing-note">Platform fee billed annually · 20% discount applied</p>

        <div class="receipt-wrap">
          <div class="receipt-card" role="table" aria-label="Fee breakdown">
            <!-- Stamp -->
            <div class="stamp" aria-label="Approved">
              <span class="stamp-text">APPROVED ✓</span>
            </div>

            <div class="receipt-head">
              <span class="receipt-brand">◈ PRODIGY RECEIPT</span>
              <span class="receipt-label">DEMO</span>
            </div>

            <hr class="receipt-rule" />

            <div class="receipt-rows" role="rowgroup">
              <div
                v-for="row in feeRows"
                :key="row.label"
                class="receipt-row"
                role="row"
              >
                <span class="row-label" role="cell">{{ row.label }}</span>
                <span class="row-value" :class="{ 'row-value--highlight': row.highlight }" role="cell">{{ row.value }}</span>
              </div>
            </div>

            <hr class="receipt-rule receipt-rule--bold" />

            <div class="receipt-total" role="row">
              <span class="total-label" role="cell">Customer receives</span>
              <span class="total-value" role="cell">0.00852 BTC</span>
            </div>

            <p class="receipt-note">
              Every fee shown here appears in the live widget before the user confirms.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Comparison Table ──────────────────────────────────────── -->
    <section class="comparison" aria-labelledby="comparison-headline">
      <div class="section-inner">
        <div class="section-header">
          <h2 id="comparison-headline" class="section-title" ref="feat2">PRODIGY VS INDUSTRY STANDARD</h2>
        </div>

        <div class="comparison-table" role="table" aria-label="Feature comparison">
          <div class="table-head" role="rowgroup">
            <div class="table-row table-row--head" role="row">
              <div class="col-feature" role="columnheader">Feature</div>
              <div class="col-prodigy" role="columnheader">PRODIGY</div>
              <div class="col-industry" role="columnheader">INDUSTRY STANDARD</div>
            </div>
          </div>
          <div class="table-body" role="rowgroup">
            <div
              v-for="row in comparisonRows"
              :key="row.feature"
              class="table-row"
              role="row"
            >
              <div class="col-feature" role="cell">{{ row.feature }}</div>
              <div class="col-prodigy" role="cell">
                <span class="check check--yes" aria-label="Yes">✓</span>
              </div>
              <div class="col-industry" role="cell">
                <span class="check" :class="row.industryYes ? 'check--yes' : 'check--no'" :aria-label="row.industryYes ? 'Yes' : 'No'">
                  {{ row.industryYes ? '✓' : '×' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Tier Table ──────────────────────────────────────────────── -->
    <section class="tiers" aria-labelledby="tiers-headline">
      <div class="section-inner">
        <div class="section-header">
          <h2 id="tiers-headline" class="section-title" ref="feat3">VOLUME TIERS</h2>
        </div>
        <div class="tier-table" role="table" aria-label="Volume tiers and fees">
          <div class="tier-head" role="row">
            <span role="columnheader">TIER</span>
            <span role="columnheader">MONTHLY VOLUME</span>
            <span role="columnheader">FEE</span>
          </div>
          <div v-for="tier in tiers" :key="tier.name" class="tier-row" :class="{ 'tier-row--highlight': tier.highlight }" role="row">
            <span class="tier-name" role="cell">{{ tier.name }}</span>
            <span class="tier-volume" role="cell">{{ tier.volume }}</span>
            <span class="tier-fee" :class="{ 'tier-fee--iris': tier.highlight }" role="cell">{{ tier.fee }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Fee Calculator ──────────────────────────────────────────── -->
    <section class="calc-section" aria-labelledby="calc-headline">
      <div class="section-inner">
        <div class="section-header">
          <h2 id="calc-headline" class="section-title">CALCULATE YOUR COSTS</h2>
        </div>
        <div class="calc-body">
          <div class="calc-inputs">
            <label class="calc-field">
              <span class="calc-field-label">TRANSACTION AMOUNT (€)</span>
              <input
                v-model.number="calcAmount"
                type="number"
                min="1"
                max="10000000"
                class="calc-input"
                aria-label="Transaction amount in euros"
              />
            </label>
            <label class="calc-field">
              <span class="calc-field-label">CURRENCY PAIR</span>
              <select v-model="calcPair" class="calc-input" aria-label="Currency pair">
                <option>EUR → BTC</option>
                <option>EUR → ETH</option>
                <option>EUR → USDT</option>
                <option>USD → BTC</option>
                <option>GBP → BTC</option>
              </select>
            </label>
          </div>
          <div class="calc-output" aria-label="Cost breakdown">
            <div class="calc-row">
              <span class="calc-row-label">Platform fee ({{ currentTierFee }})</span>
              <span class="calc-row-val calc-row-val--muted">−€{{ calcPlatformFee.toFixed(2) }}</span>
            </div>
            <div class="calc-row">
              <span class="calc-row-label">Network fee (est.)</span>
              <span class="calc-row-val calc-row-val--muted">−€1.20</span>
            </div>
            <div class="calc-row calc-row--divider" aria-hidden="true" />
            <div class="calc-row">
              <span class="calc-row-label calc-row-label--earn">YOU RECEIVE</span>
              <span class="calc-row-val calc-row-val--earn">€{{ calcYouReceive.toFixed(2) }}</span>
            </div>
            <p class="calc-tier-note">Tier: <strong>{{ currentTierName }}</strong></p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Partner Revenue Calculator ─────────────────────────────── -->
    <section class="revenue-section" aria-labelledby="revenue-headline">
      <div class="section-inner">
        <div class="section-header">
          <h2 id="revenue-headline" class="section-title section-title--light">PARTNER REVENUE CALCULATOR</h2>
        </div>
        <div class="revenue-body">
          <label class="calc-field">
            <span class="calc-field-label calc-field-label--light">YOUR MONTHLY VOLUME (€)</span>
            <input
              v-model.number="partnerVolume"
              type="number"
              min="0"
              placeholder="100000"
              class="calc-input calc-input--dark"
              aria-label="Monthly volume in euros"
            />
          </label>
          <div class="revenue-output" aria-label="Revenue projection">
            <div class="revenue-row">
              <span class="revenue-label">Commission rate</span>
              <span class="revenue-val">10%</span>
            </div>
            <div class="revenue-row">
              <span class="revenue-label">Monthly revenue</span>
              <span class="revenue-val revenue-val--earn">€{{ (partnerVolume * 0.10).toLocaleString() }}</span>
            </div>
            <div class="revenue-row">
              <span class="revenue-label">Annual revenue</span>
              <span class="revenue-val revenue-val--earn">€{{ (partnerVolume * 0.10 * 12).toLocaleString() }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Volume Graph ──────────────────────────────────────────── -->
    <section class="volgraph-section" aria-labelledby="bd-volgraph-h" data-reveal="fade-up">
      <div class="section-inner">
        <p class="eyebrow" style="color:rgba(255,255,255,0.5);font-family:'Space Mono',monospace;font-size:0.75rem;letter-spacing:0.15em;text-transform:uppercase;">PARTNER REVENUE AT SCALE</p>
        <h2 id="bd-volgraph-h" class="section-title" style="color:#fff;">THE MORE YOU PROCESS,<br />THE MORE YOU EARN.</h2>
        <p style="font-family:'Space Mono',monospace;font-size:0.8125rem;color:rgba(255,255,255,0.5);margin:0.5rem 0 2rem;">Estimated monthly partner revenue by volume tier</p>
        <div class="volgraph-wrap">
          <svg ref="volGraphRef" viewBox="0 0 280 120" fill="none" xmlns="http://www.w3.org/2000/svg"
               width="100%" preserveAspectRatio="xMidYMid meet"
               aria-hidden="true" role="img" class="volgraph-svg">
            <text x="21" y="12" text-anchor="middle" font-size="8" fill="#2563eb" font-family="Space Mono, monospace">€10</text>
            <text x="77" y="12" text-anchor="middle" font-size="8" fill="#2563eb" font-family="Space Mono, monospace">€37</text>
            <text x="133" y="12" text-anchor="middle" font-size="8" fill="#2563eb" font-family="Space Mono, monospace">€125</text>
            <text x="189" y="12" text-anchor="middle" font-size="8" fill="#2563eb" font-family="Space Mono, monospace">€312</text>
            <text x="245" y="12" text-anchor="middle" font-size="8" fill="#2563eb" font-family="Space Mono, monospace">€625</text>
            <rect class="vol-bar" x="6" y="87" width="30" height="18" ry="3" fill="rgba(37,99,235,0.7)" />
            <rect class="vol-bar" x="62" y="73.5" width="30" height="31.5" ry="3" fill="rgba(37,99,235,0.7)" />
            <rect class="vol-bar" x="118" y="55.5" width="30" height="49.5" ry="3" fill="rgba(37,99,235,0.7)" />
            <rect class="vol-bar" x="174" y="37.5" width="30" height="67.5" ry="3" fill="rgba(37,99,235,0.7)" />
            <rect class="vol-bar" x="230" y="15" width="30" height="90" ry="3" fill="rgba(37,99,235,0.7)" />
            <line x1="0" y1="106" x2="280" y2="106" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
            <text x="21" y="116" text-anchor="middle" font-size="8" fill="rgba(255,255,255,0.4)" font-family="Space Mono, monospace">€10k</text>
            <text x="77" y="116" text-anchor="middle" font-size="8" fill="rgba(255,255,255,0.4)" font-family="Space Mono, monospace">€50k</text>
            <text x="133" y="116" text-anchor="middle" font-size="8" fill="rgba(255,255,255,0.4)" font-family="Space Mono, monospace">€200k</text>
            <text x="189" y="116" text-anchor="middle" font-size="8" fill="rgba(255,255,255,0.4)" font-family="Space Mono, monospace">€500k</text>
            <text x="245" y="116" text-anchor="middle" font-size="8" fill="rgba(255,255,255,0.4)" font-family="Space Mono, monospace">€1M+</text>
          </svg>
        </div>
      </div>
    </section>

    <!-- ── FAQ Accordion ─────────────────────────────────────────── -->
    <section class="faq-section" aria-labelledby="faq-headline">
      <div class="section-inner">
        <div class="section-header">
          <h2 id="faq-headline" class="section-title" data-reveal="fade-up">COMMON QUESTIONS.</h2>
        </div>
        <div class="faq-list" data-animate-stagger>
          <details class="faq-item">
            <summary class="faq-summary">Any setup fees?</summary>
            <div class="faq-answer">None. Zero. You pay per transaction, not for the privilege of starting.</div>
          </details>
          <details class="faq-item">
            <summary class="faq-summary">What happens if I exceed my volume tier?</summary>
            <div class="faq-answer">Auto-scales to the next tier. No manual intervention, no invoice surprises, no service interruption.</div>
          </details>
          <details class="faq-item">
            <summary class="faq-summary">Is KYC included?</summary>
            <div class="faq-answer">Yes, always bundled. Document scan, liveness check, sanctions screening — all included at every tier.</div>
          </details>
          <details class="faq-item">
            <summary class="faq-summary">Am I locked into a contract?</summary>
            <div class="faq-answer">Monthly on Starter and Growth. Annual on Enterprise (with SLA). Cancel anytime on monthly plans.</div>
          </details>
          <details class="faq-item">
            <summary class="faq-summary">Can I test before committing?</summary>
            <div class="faq-answer">Full sandbox environment, real flows, fake money. No card required to start.</div>
          </details>
        </div>
      </div>
    </section>

    <!-- ── ROI Callout ────────────────────────────────────────────── -->
    <section class="roi-section" aria-labelledby="roi-headline">
      <div class="section-inner">
        <h2 id="roi-headline" class="roi-headline" data-reveal="fade-up">EVERY FAILED KYC CHECK IS A LOST USER. PRODIGY'S 94% PASS RATE MEANS MORE REVENUE FOR YOU.</h2>
        <div class="roi-math">
          <p class="roi-scenario">If your app onboards <strong>1,000 users/month</strong>:</p>
          <div class="roi-compare" data-animate-stagger>
            <div class="roi-row roi-row--bad">
              <span class="roi-label">At industry average (67% pass rate)</span>
              <span class="roi-value">= <strong>670</strong> activate</span>
            </div>
            <div class="roi-row roi-row--good">
              <span class="roi-label">With Prodigy (94% pass rate)</span>
              <span class="roi-value">= <strong>940</strong> activate</span>
            </div>
            <div class="roi-row roi-row--result">
              <span class="roi-label">That's <strong>270 more paying users</strong></span>
              <span class="roi-value roi-value--em">Every month.</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Dark CTA ───────────────────────────────────────────────── -->
    <section class="cta-strip" aria-labelledby="pricing-cta-h" ref="ctaSection">
      <div class="cta-inner">
        <h2 id="pricing-cta-h" class="cta-headline">SEE THE RECEIPT IN THE LIVE WIDGET.</h2>
        <div class="cta-actions">
          <a
            href="http://localhost:5001"
            target="_blank"
            rel="noopener noreferrer"
            class="cta-btn cta-btn--fill"
          >
            OPEN DEMO
          </a>
          <RouterLink to="/bold/partners" class="cta-btn cta-btn--ghost">
            PARTNER PRICING
          </RouterLink>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useClipReveal } from '@/composables/useSplitReveal'
import { useMagneticAll } from '@/composables/useMagneticButton'
import { useHoverScramble } from '@/composables/useTextScramble'

const volGraphRef = ref<SVGSVGElement | null>(null)

// ── Annual / Monthly toggle ──────────────────────────────────────
const annual = ref(false)
const multiplier = computed(() => annual.value ? 0.8 : 1)

// ── Animation refs ─────────────────────────────────────────────
const heroTitle = ref<HTMLElement | null>(null)
const heroSub = ref<HTMLElement | null>(null)
const heroSection = ref<HTMLElement | null>(null)
const feat1 = ref<HTMLElement | null>(null)
const feat2 = ref<HTMLElement | null>(null)
const feat3 = ref<HTMLElement | null>(null)
const ctaSection = ref<HTMLElement | null>(null)

useClipReveal(heroTitle, { direction: 'up', duration: 0.7 })
useClipReveal(heroSub, { direction: 'left', duration: 0.8, delay: 0.5 })
useClipReveal(feat1, { direction: 'up', duration: 0.7 })
useClipReveal(feat2, { direction: 'up', duration: 0.7, delay: 0.1 })
useClipReveal(feat3, { direction: 'up', duration: 0.7, delay: 0.1 })
useMagneticAll(heroSection, 'a, button', { strength: 0.5, returnDuration: 400 })
useMagneticAll(ctaSection, 'a, button', { strength: 0.5, returnDuration: 400 })
useHoverScramble(feat1, 'tech')
useHoverScramble(feat2, 'tech')

// ── Tier table ────────────────────────────────────────────────
const tiers = [
  { name: 'Starter',    volume: '<€1M',       fee: '0.05%', highlight: false },
  { name: 'Growth',     volume: '€1M–€10M',   fee: '0.03%', highlight: true  },
  { name: 'Enterprise', volume: '€10M+',       fee: 'Custom', highlight: false },
]

// ── Fee calculator ────────────────────────────────────────────
const calcAmount = ref(1000)
const calcPair   = ref('EUR → BTC')

const currentTierName = computed(() => {
  if (calcAmount.value * 12 >= 10_000_000) return 'Enterprise'
  if (calcAmount.value * 12 >= 1_000_000)  return 'Growth'
  return 'Starter'
})

const currentTierFee = computed(() => {
  if (currentTierName.value === 'Enterprise') return 'custom'
  if (currentTierName.value === 'Growth')     return '0.03%'
  return '0.05%'
})

const calcPlatformFee = computed(() => {
  const rate = currentTierName.value === 'Growth' ? 0.0003 : 0.0005
  return calcAmount.value * rate
})

const calcYouReceive = computed(() =>
  Math.max(0, calcAmount.value - calcPlatformFee.value - 1.20)
)

// ── Revenue calculator ────────────────────────────────────────
const partnerVolume = ref(100000)

const feeRows = [
  { label: 'You send', value: '€500.00', highlight: false },
  { label: 'Exchange rate', value: '1 BTC = €58,234', highlight: false },
  { label: 'Platform fee (0.5%)', value: '−€2.50', highlight: false },
  { label: 'Network fee (0.2%)', value: '−€1.00', highlight: false },
  { label: 'KYC check', value: 'Included', highlight: false },
  { label: 'Partner share', value: 'Configurable', highlight: false },
]

const comparisonRows = [
  { feature: 'Fees shown before confirm', industryYes: false },
  { feature: 'Itemised fee receipt', industryYes: false },
  { feature: 'Built-in KYC flow', industryYes: false },
  { feature: 'Partner revenue portal', industryYes: false },
  { feature: 'Real-time admin dashboard', industryYes: false },
  { feature: 'Configurable partner split', industryYes: false },
  { feature: 'Embeds in one script tag', industryYes: true },
  { feature: 'Supports crypto conversion', industryYes: true },
]

onMounted(() => {
  if (volGraphRef.value) {
    const barObs = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        volGraphRef.value?.classList.add('bar-animate')
        barObs.disconnect()
      }
    }, { threshold: 0.3 })
    barObs.observe(volGraphRef.value)
  }
})
</script>

<style scoped>
/* ── Custom properties ─────────────────────────────────────── */
.hero, .fees, .comparison, .cta-strip {
  --ink: #0a0a0a;
  --paper: #f5f5f0;
  --grid: rgba(0, 0, 0, 0.07);
}

/* ── Grid paper ────────────────────────────────────────────── */
.hero,
.fees,
.comparison {
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
  gap: 1.5rem;
  max-width: 900px;
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

/* ── Fees ──────────────────────────────────────────────────── */
.fees {
  border-bottom: 3px solid var(--ink);
}

.receipt-wrap {
  display: flex;
  justify-content: flex-start;
}

.receipt-card {
  border: 2px solid var(--ink);
  padding: 2.5rem 2rem;
  max-width: 520px;
  width: 100%;
  position: relative;
  background-color: #f5f5f0;
  font-family: 'Space Grotesk', sans-serif;
}

.stamp {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  transform: rotate(12deg);
  border: 2px solid;
  padding: 0.25em 0.625em;
}

.stamp-text {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  background: linear-gradient(135deg, #ff6bcb, #a78bfa, #38bdf8, #34d399, #fbbf24);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stamp {
  border-color: #a78bfa;
}

.receipt-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.receipt-brand {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1rem;
  letter-spacing: 0.1em;
  color: var(--ink);
}

.receipt-label {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: rgba(10, 10, 10, 0.4);
}

.receipt-rule {
  border: none;
  border-top: 1px dashed rgba(10, 10, 10, 0.25);
  margin: 1rem 0;
}

.receipt-rule--bold {
  border-top: 2px solid var(--ink);
}

.receipt-rows {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.receipt-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0.625rem 0;
  border-bottom: 1px solid rgba(10, 10, 10, 0.08);
}

.receipt-row:last-child {
  border-bottom: none;
}

.row-label {
  font-size: 0.875rem;
  color: rgba(10, 10, 10, 0.65);
}

.row-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--ink);
  text-align: right;
}

.row-value--highlight {
  background: linear-gradient(135deg, #ff6bcb, #a78bfa, #38bdf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.receipt-total {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 1rem 0 0;
}

.total-label {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: var(--ink);
}

.total-value {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.75rem;
  letter-spacing: 0.02em;
  background: linear-gradient(135deg, #ff6bcb, #a78bfa, #38bdf8, #34d399);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.receipt-note {
  font-size: 0.75rem;
  color: rgba(10, 10, 10, 0.45);
  margin: 1rem 0 0;
  line-height: 1.5;
}

/* ── Comparison ────────────────────────────────────────────── */
.comparison {
  border-bottom: 3px solid var(--ink);
}

.comparison-table {
  border: 1px solid var(--ink);
  width: 100%;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 180px 220px;
  border-bottom: 1px solid rgba(10, 10, 10, 0.12);
}

.table-row:last-child {
  border-bottom: none;
}

.table-row--head {
  background: var(--ink);
  border-bottom: 2px solid var(--ink);
}

.col-feature,
.col-prodigy,
.col-industry {
  padding: 1rem 1.25rem;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.875rem;
}

.table-row--head .col-feature,
.table-row--head .col-prodigy,
.table-row--head .col-industry {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1rem;
  letter-spacing: 0.06em;
  color: #f5f5f0;
}

.col-prodigy,
.col-industry {
  border-left: 1px solid rgba(10, 10, 10, 0.12);
  text-align: center;
}

.table-row--head .col-prodigy,
.table-row--head .col-industry {
  border-left: 1px solid rgba(255, 255, 255, 0.15);
}

.col-feature {
  color: rgba(10, 10, 10, 0.75);
}

.check {
  font-size: 0.9375rem;
  font-weight: 700;
}

.check--yes { color: #166534; }
.check--no  { color: #991b1b; }

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

.cta-headline {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  letter-spacing: 0.02em;
  line-height: 0.9;
  color: #f5f5f0;
  margin: 0;
  max-width: 22ch;
}

.cta-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.cta-btn {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.25rem;
  letter-spacing: 0.1em;
  text-decoration: none;
  padding: 0.875rem 2.5rem;
  display: inline-block;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
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

/* ── Tier Table ────────────────────────────────────────────── */
.tiers {
  background-color: var(--paper);
  background-image:
    linear-gradient(var(--grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: 24px 24px;
  border-bottom: 3px solid var(--ink);
}

.tier-table {
  border: 1px solid var(--ink);
  width: 100%;
}

.tier-head {
  display: grid;
  grid-template-columns: 1fr 1fr 180px;
  background: var(--ink);
  padding: 0.875rem 1.25rem;
  gap: 1rem;
}

.tier-head span {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1rem;
  letter-spacing: 0.06em;
  color: #f5f5f0;
}

.tier-row {
  display: grid;
  grid-template-columns: 1fr 1fr 180px;
  padding: 1.125rem 1.25rem;
  gap: 1rem;
  border-bottom: 1px solid rgba(10, 10, 10, 0.12);
  transition: background 0.15s;
}

.tier-row:last-child {
  border-bottom: none;
}

.tier-row:hover {
  background: rgba(10, 10, 10, 0.03);
}

.tier-row--highlight {
  background: rgba(167, 139, 250, 0.05);
}

.tier-name {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.25rem;
  letter-spacing: 0.04em;
  color: var(--ink);
}

.tier-volume {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9375rem;
  color: rgba(10, 10, 10, 0.65);
  align-self: center;
}

.tier-fee {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.5rem;
  letter-spacing: 0.04em;
  color: var(--ink);
  align-self: center;
}

.tier-fee--iris {
  background: linear-gradient(135deg, #ff6bcb, #a78bfa, #38bdf8, #34d399);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Fee Calculator ────────────────────────────────────────── */
.calc-section {
  background-color: var(--paper);
  background-image:
    linear-gradient(var(--grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: 24px 24px;
  border-bottom: 3px solid var(--ink);
}

.calc-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.calc-inputs {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.calc-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.calc-field-label {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: rgba(10, 10, 10, 0.5);
}

.calc-field-label--light {
  color: rgba(245, 245, 240, 0.5);
}

.calc-input {
  font-family: 'Space Grotesk', monospace;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--ink);
  background: transparent;
  border: 1px solid rgba(10, 10, 10, 0.25);
  padding: 0.75rem 1rem;
  width: 100%;
  outline: none;
  appearance: none;
  -moz-appearance: textfield;
  box-sizing: border-box;
}

.calc-input::-webkit-inner-spin-button,
.calc-input::-webkit-outer-spin-button {
  appearance: none;
}

.calc-input:focus {
  border-color: rgba(10, 10, 10, 0.6);
}

.calc-input--dark {
  color: #f5f5f0;
  background: #111;
  border-color: rgba(245, 245, 240, 0.2);
  max-width: 360px;
}

.calc-input--dark:focus {
  border-color: rgba(245, 245, 240, 0.6);
}

.calc-output {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid rgba(10, 10, 10, 0.2);
  background: rgba(10, 10, 10, 0.03);
  padding: 1.5rem;
}

.calc-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0.625rem 0;
  border-bottom: 1px solid rgba(10, 10, 10, 0.07);
}

.calc-row:last-of-type {
  border-bottom: none;
}

.calc-row--divider {
  border-bottom: 1px solid rgba(10, 10, 10, 0.25) !important;
  padding: 0;
  height: 0;
}

.calc-row-label {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8125rem;
  color: rgba(10, 10, 10, 0.65);
  letter-spacing: 0.02em;
}

.calc-row-label--earn {
  font-weight: 700;
  color: #166534;
  letter-spacing: 0.06em;
}

.calc-row-val {
  font-family: 'Space Grotesk', monospace;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--ink);
}

.calc-row-val--muted {
  color: rgba(10, 10, 10, 0.4);
  font-weight: 400;
}

.calc-row-val--earn {
  color: #166534;
  font-weight: 700;
  font-size: 1.125rem;
}

.calc-tier-note {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  color: rgba(10, 10, 10, 0.45);
  margin: 0.75rem 0 0;
  letter-spacing: 0.04em;
}

.calc-tier-note strong {
  color: var(--ink);
}

/* ── Partner Revenue Calculator ────────────────────────────── */
.revenue-section {
  background: var(--ink);
  border-bottom: 3px solid var(--ink);
}

.section-title--light {
  color: #f5f5f0;
}

.revenue-body {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 480px;
}

.revenue-output {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid rgba(245, 245, 240, 0.15);
  background: #0d0d0d;
  padding: 1.5rem;
}

.revenue-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0.625rem 0;
  border-bottom: 1px solid rgba(245, 245, 240, 0.07);
}

.revenue-row:last-child {
  border-bottom: none;
}

.revenue-label {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8125rem;
  color: rgba(245, 245, 240, 0.55);
  letter-spacing: 0.02em;
}

.revenue-val {
  font-family: 'Space Grotesk', monospace;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #f5f5f0;
}

.revenue-val--earn {
  color: #34d399;
}

/* ── Section header override for dark section ──────────────── */
.revenue-section .section-header {
  border-bottom: 3px solid rgba(245, 245, 240, 0.2);
}

/* ── FAQ Accordion ─────────────────────────────────────────── */
.faq-section {
  background-color: var(--paper);
  background-image:
    linear-gradient(var(--grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: 24px 24px;
  border-bottom: 3px solid var(--ink);
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 2px solid var(--ink);
}

.faq-item {
  border-bottom: 1px solid rgba(10, 10, 10, 0.15);
  background: var(--paper);
}

.faq-item:last-child {
  border-bottom: none;
}

.faq-summary {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  letter-spacing: 0.02em;
  color: var(--ink);
  padding: 1.5rem 2rem;
  cursor: pointer;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  background: transparent;
  transition: background 0.15s;
}

.faq-summary::-webkit-details-marker { display: none; }

.faq-summary::after {
  content: '+';
  font-size: 1.5rem;
  line-height: 1;
  transition: transform 0.2s;
  flex-shrink: 0;
  margin-left: 1rem;
}

.faq-item[open] .faq-summary::after {
  transform: rotate(45deg);
}

.faq-summary:hover {
  background: rgba(10, 10, 10, 0.04);
}

.faq-answer {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(10, 10, 10, 0.65);
  padding: 0 2rem 1.75rem;
  border-top: 1px solid rgba(10, 10, 10, 0.1);
  margin-top: 0;
}

/* ── ROI Callout ───────────────────────────────────────────── */
.roi-section {
  background: #0a0a0a;
  border-bottom: 3px solid #0a0a0a;
}

.roi-headline {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(2rem, 4vw, 3.5rem);
  letter-spacing: 0.02em;
  line-height: 0.95;
  color: #f5f5f0;
  margin: 0 0 3rem;
  max-width: 32ch;
}

.roi-math {
  max-width: 680px;
}

.roi-scenario {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  color: rgba(245, 245, 240, 0.65);
  margin: 0 0 1.5rem;
}

.roi-scenario strong { color: #f5f5f0; }

.roi-compare {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid rgba(245, 245, 240, 0.12);
}

.roi-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 1.125rem 1.5rem;
  border-bottom: 1px solid rgba(245, 245, 240, 0.07);
  flex-wrap: wrap;
  gap: 1rem;
}

.roi-row:last-child { border-bottom: none; }

.roi-label {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9375rem;
  color: rgba(245, 245, 240, 0.65);
}

.roi-label strong { color: #f5f5f0; }

.roi-value {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #f5f5f0;
}

.roi-value strong {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.5rem;
}

.roi-row--bad .roi-value strong { color: #ff6b6b; }
.roi-row--good .roi-value strong { color: #4ade80; }

.roi-row--result {
  background: rgba(37, 99, 235, 0.15);
}

.roi-value--em {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.5rem;
  color: #2563eb;
  background: linear-gradient(135deg, #2563eb, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Responsive ────────────────────────────────────────────── */
@media (max-width: 900px) {
  .table-row {
    grid-template-columns: 1fr 120px 140px;
  }

  .cta-inner {
    flex-direction: column;
    align-items: flex-start;
  }

  .tier-head,
  .tier-row {
    grid-template-columns: 1fr 1fr;
  }

  .tier-head span:nth-child(3),
  .tier-row .tier-fee {
    display: none;
  }

  .calc-body {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .table-row {
    grid-template-columns: 1fr 80px 80px;
  }

  .col-feature,
  .col-prodigy,
  .col-industry {
    padding: 0.75rem 0.75rem;
    font-size: 0.8125rem;
  }

  .tier-head,
  .tier-row {
    grid-template-columns: 1fr 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .iris-bar { animation: none; background: #a78bfa; }
}

/* ── Annual / Monthly billing toggle ───────────────────────── */
.billing-toggle {
  display: inline-flex;
  gap: 0;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.billing-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  padding: 0.65rem 1.25rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
}

.billing-btn.active {
  background: #2563eb;
  color: #fff;
}

.billing-btn:hover:not(.active) {
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.8);
}

.save-badge {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 0.75rem;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
}

.billing-note {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 1.5rem;
  margin-top: -1rem;
}

/* ── Volume Graph SVG ── */
.volgraph-section { background: #111; border-bottom: 1px solid #222; }
.volgraph-wrap { max-width: 600px; }
.vol-bar {
  transform-origin: bottom;
  transform-box: fill-box;
  transform: scaleY(0);
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.volgraph-svg.bar-animate .vol-bar:nth-child(1) { transform: scaleY(1); transition-delay: 0.1s; }
.volgraph-svg.bar-animate .vol-bar:nth-child(2) { transform: scaleY(1); transition-delay: 0.2s; }
.volgraph-svg.bar-animate .vol-bar:nth-child(3) { transform: scaleY(1); transition-delay: 0.3s; }
.volgraph-svg.bar-animate .vol-bar:nth-child(4) { transform: scaleY(1); transition-delay: 0.4s; }
.volgraph-svg.bar-animate .vol-bar:nth-child(5) { transform: scaleY(1); transition-delay: 0.5s; }
@media (prefers-reduced-motion: reduce) {
  .vol-bar { transform: scaleY(1); transition: none; }
}
</style>
