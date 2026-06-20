<template>
  <main class="sp-pricing">

    <!-- ═══ Section 1: Hero ════════════════════════════════════════ -->
    <section class="sp-hero" aria-labelledby="sp-hero-heading">
      <div class="sp-hero-inner">
        <div class="sp-hero-eyebrow">Transparent Pricing</div>
        <h1 id="sp-hero-heading" class="sp-h1">
          Pricing that <span class="sp-accent">makes sense.</span>
        </h1>
        <p class="sp-hero-sub">
          No hidden fees. No surprise invoices. Everything visible before anyone presses anything. Every number below is exactly what your users will see before they confirm.
        </p>
      </div>
    </section>

    <!-- ═══ Section 1b: Fee Calculator ════════════════════════════════ -->
    <section class="sp-calc-section" aria-labelledby="sp-calc-heading">
      <div class="sp-section-inner">
        <h2 id="sp-calc-heading" class="sp-section-heading" data-reveal="fade-up">Fee Calculator</h2>
        <p class="sp-section-sub" data-reveal="fade-up">Adjust the sliders to see your exact fee breakdown.</p>

        <!-- Annual / Monthly toggle -->
        <div class="sp-billing-toggle" role="group" aria-label="Billing period" data-reveal="fade-up">
          <button class="sp-billing-btn" :class="{ active: !annual }" @click="annual = false" :aria-pressed="!annual">Monthly</button>
          <button class="sp-billing-btn sp-billing-btn--annual" :class="{ active: annual }" @click="annual = true" :aria-pressed="annual">
            Annual <span class="sp-save-badge">−20%</span>
          </button>
        </div>
        <p v-if="annual" class="sp-billing-note">Platform fee billed annually · 20% discount applied</p>

        <div class="sp-calc-card" data-reveal="fade-up">
          <div class="sp-calc-controls">
            <div class="sp-calc-field">
              <label class="sp-calc-label" for="calc-amount">Transaction Amount</label>
              <div class="sp-calc-amount-display">{{ formatEuro(calcAmount) }}</div>
              <input
                id="calc-amount"
                v-model.number="calcAmount"
                type="range"
                min="100"
                max="50000"
                step="100"
                class="sp-calc-slider"
                aria-label="Transaction amount"
              />
              <div class="sp-calc-range-labels">
                <span>€100</span><span>€50,000</span>
              </div>
            </div>

            <div class="sp-calc-field">
              <label class="sp-calc-label" for="calc-share">Partner Share</label>
              <div class="sp-calc-amount-display">{{ calcPartnerShare.toFixed(2) }}%</div>
              <input
                id="calc-share"
                v-model.number="calcPartnerShare"
                type="range"
                min="0.10"
                max="0.50"
                step="0.01"
                class="sp-calc-slider"
                aria-label="Partner share percentage"
              />
              <div class="sp-calc-range-labels">
                <span>0.10%</span><span>0.50%</span>
              </div>
            </div>
          </div>

          <div class="sp-calc-breakdown" aria-live="polite">
            <div class="sp-calc-row">
              <span class="sp-calc-row-label">Platform fee (0.5%)</span>
              <span class="sp-calc-row-value">{{ formatEuro(platformFee) }}</span>
            </div>
            <div class="sp-calc-row">
              <span class="sp-calc-row-label">Network fee (~0.2%)</span>
              <span class="sp-calc-row-value">{{ formatEuro(networkFee) }}</span>
            </div>
            <div class="sp-calc-row sp-calc-row--highlight">
              <span class="sp-calc-row-label">Partner earns</span>
              <span class="sp-calc-row-value sp-calc-row-value--accent">{{ formatEuro(partnerEarns) }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Section 2: Fee Table ═══════════════════════════════════ -->
    <section class="sp-fees-section" aria-labelledby="sp-fees-heading" ref="feeCardContainerRef">
      <div class="sp-section-inner">

        <!-- Trial banner -->
        <div class="sp-trial-banner" data-reveal="scale-in" role="note" aria-label="Free trial offer">
          Start free. Upgrade anytime. No credit card required.
        </div>

        <h2 id="sp-fees-heading" class="sp-section-heading">The Full Fee Breakdown</h2>
        <p class="sp-section-sub">Shown to your end users before every confirmation. Always.</p>

        <div class="sp-fee-card" role="table" aria-label="Fee schedule">
          <div class="sp-fee-header" role="row">
            <span role="columnheader">Fee Type</span>
            <span role="columnheader">Amount</span>
          </div>

          <div class="sp-fee-row" role="row">
            <div role="cell">
              <div class="sp-fee-name">Platform fee</div>
              <div class="sp-fee-note">Charged by Prodigy per transaction</div>
            </div>
            <div class="sp-fee-value sp-fee-value--accent" role="cell">0.50%</div>
          </div>

          <div class="sp-fee-row" role="row">
            <div role="cell">
              <div class="sp-fee-name">Network fee</div>
              <div class="sp-fee-note">Actual blockchain gas cost, passed through at cost</div>
            </div>
            <div class="sp-fee-value" role="cell">~0.20%</div>
          </div>

          <div class="sp-fee-row" role="row">
            <div role="cell">
              <div class="sp-fee-name">KYC verification</div>
              <div class="sp-fee-note">Identity verification powered by Sumsub</div>
            </div>
            <div class="sp-fee-value sp-fee-value--green" role="cell">Included</div>
          </div>

          <div class="sp-fee-row" role="row">
            <div role="cell">
              <div class="sp-fee-name">Partner revenue share</div>
              <div class="sp-fee-note">Configurable per partner in the admin console</div>
            </div>
            <div class="sp-fee-value sp-fee-value--accent" role="cell">0.10% – 0.50%</div>
          </div>

          <div class="sp-fee-footer">
            <div class="sp-fee-disclosure">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="7" fill="#dcfce7"/>
                <path d="M5 8l2 2 4-4" stroke="#15803d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Fees shown to end user before confirmation — always.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Section 3: Comparison Table ═══════════════════════════ -->
    <section class="sp-compare-section" aria-labelledby="sp-compare-heading">
      <div class="sp-section-inner">
        <h2 id="sp-compare-heading" class="sp-section-heading" data-reveal="fade-up">
          How Prodigy Compares
        </h2>
        <p class="sp-section-sub" data-reveal="fade-up">Measured against common industry patterns, not competitors by name.</p>

        <div class="sp-compare-wrapper" data-reveal="fade-up">
          <table class="sp-compare-table" aria-label="Feature comparison">
            <thead>
              <tr>
                <th scope="col" class="sp-compare-feature-col">Feature</th>
                <th scope="col" class="sp-compare-prodigy-col">
                  <span class="sp-compare-prodigy-badge">Prodigy</span>
                </th>
                <th scope="col" class="sp-compare-industry-col">Industry Standard</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in comparisonRows" :key="row.feature">
                <td class="sp-compare-feature">{{ row.feature }}</td>
                <td class="sp-compare-prodigy">
                  <span class="sp-badge sp-badge--green" aria-label="Prodigy: Yes">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2.5 6l2.5 2.5 4.5-5" stroke="#15803d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Yes
                  </span>
                </td>
                <td class="sp-compare-industry">
                  <span
                    :class="row.industry ? 'sp-badge sp-badge--green' : 'sp-badge sp-badge--red'"
                    :aria-label="`Industry: ${row.industry ? 'Yes' : 'No'}`"
                  >
                    <svg v-if="row.industry" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2.5 6l2.5 2.5 4.5-5" stroke="#15803d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg v-else width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M3 3l6 6M9 3l-6 6" stroke="#dc2626" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                    {{ row.industry ? 'Yes' : 'No' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ═══ CTA ════════════════════════════════════════════════════ -->
    <section class="sp-cta-section" aria-labelledby="sp-cta-heading">
      <div class="sp-cta-inner">
        <div class="sp-cta-card">
          <h2 id="sp-cta-heading" class="sp-cta-heading">Ready to embed?</h2>
          <p class="sp-cta-sub">Start with the free sandbox. Every fee shown above is exactly what your users will see.</p>
          <div class="sp-cta-actions">
            <a
              href="http://localhost:5001"
              target="_blank"
              rel="noopener noreferrer"
              class="sp-btn sp-btn--primary"
            >Get Started Free →</a>
            <RouterLink to="/saas/partners" class="sp-btn sp-btn--ghost">Partner Program</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ A: ROI SECTION ════════════════════════════════════════ -->
    <section class="sp-roi-section" aria-labelledby="sp-roi-heading" data-reveal="fade-up">
      <div class="sp-section-inner">
        <h2 id="sp-roi-heading" class="sp-section-heading" data-reveal="fade-up">
          The math is <span class="sp-accent">simple.</span>
        </h2>
        <div class="sp-roi-box" data-reveal="fade-up">
          <p class="sp-roi-scenario">If you onboard 1,000 users/month:</p>
          <div class="sp-roi-compare">
            <div class="sp-roi-row sp-roi-row--bad">
              <span class="sp-roi-label">At industry avg KYC (67%)</span>
              <span class="sp-roi-value">= 670 users activate</span>
            </div>
            <div class="sp-roi-row sp-roi-row--good">
              <span class="sp-roi-label">With Prodigy (94%)</span>
              <span class="sp-roi-value">= 940 users activate</span>
            </div>
          </div>
          <p class="sp-roi-result">That's <strong>270 more paying users each month</strong> — from the same traffic.</p>
        </div>
      </div>
    </section>

    <!-- ═══ B: FAQ ACCORDION ═══════════════════════════════════════ -->
    <section class="sp-faq-section" aria-labelledby="sp-faq-heading">
      <div class="sp-section-inner">
        <h2 id="sp-faq-heading" class="sp-section-heading" data-reveal="fade-up">
          Frequently asked <span class="sp-accent">questions</span>
        </h2>
        <div class="sp-faq-list" data-animate-stagger>
          <details class="sp-faq-item">
            <summary class="sp-faq-q">Are there setup fees?</summary>
            <p class="sp-faq-a">No. Pay per successful transaction only. There are no monthly minimums, setup charges, or hidden costs on Starter and Growth tiers.</p>
          </details>
          <details class="sp-faq-item">
            <summary class="sp-faq-q">What if I exceed my volume tier?</summary>
            <p class="sp-faq-a">Automatically moves to the next tier rate; no interruption. Your fee simply adjusts from the moment you cross the threshold — no manual upgrade required.</p>
          </details>
          <details class="sp-faq-item">
            <summary class="sp-faq-q">Is KYC included?</summary>
            <p class="sp-faq-a">Yes. Always bundled, never separately billed. Identity verification is part of the platform — it ships with every plan, on every transaction.</p>
          </details>
          <details class="sp-faq-item">
            <summary class="sp-faq-q">What contract terms apply?</summary>
            <p class="sp-faq-a">Monthly on Starter and Growth; annual on Enterprise. Cancel Starter or Growth at any time with 30 days notice. Enterprise terms are negotiated.</p>
          </details>
          <details class="sp-faq-item">
            <summary class="sp-faq-q">Can I test before buying?</summary>
            <p class="sp-faq-a">Full sandbox available, no credit card required. Pre-loaded KYC identities, webhook inspector, and live price feeds — everything you need to build and test your integration before going live.</p>
          </details>
        </div>
      </div>
    </section>

    <!-- ═══ Volume Graph ═══════════════════════════════════════════ -->
    <section class="sp-volgraph-section" aria-labelledby="sp-volgraph-h" data-reveal="fade-up">
      <div class="sp-section-inner">
        <div class="sp-hero-eyebrow">Partner Revenue at Scale</div>
        <h2 id="sp-volgraph-h" class="sp-section-heading">The more you process, the more you earn.</h2>
        <p class="sp-section-sub" style="margin-bottom:2rem;">Estimated monthly partner revenue by volume tier</p>
        <div class="sp-volgraph-wrap">
          <svg ref="volGraphRef" viewBox="0 0 280 120" fill="none" xmlns="http://www.w3.org/2000/svg"
               width="100%" preserveAspectRatio="xMidYMid meet"
               aria-hidden="true" role="img" class="volgraph-svg">
            <text x="21" y="12" text-anchor="middle" font-size="8" fill="#6366f1" font-family="Space Mono, monospace">€10</text>
            <text x="77" y="12" text-anchor="middle" font-size="8" fill="#6366f1" font-family="Space Mono, monospace">€37</text>
            <text x="133" y="12" text-anchor="middle" font-size="8" fill="#6366f1" font-family="Space Mono, monospace">€125</text>
            <text x="189" y="12" text-anchor="middle" font-size="8" fill="#6366f1" font-family="Space Mono, monospace">€312</text>
            <text x="245" y="12" text-anchor="middle" font-size="8" fill="#6366f1" font-family="Space Mono, monospace">€625</text>
            <rect class="vol-bar" x="6" y="87" width="30" height="18" ry="3" fill="rgba(99,102,241,0.7)" />
            <rect class="vol-bar" x="62" y="73.5" width="30" height="31.5" ry="3" fill="rgba(99,102,241,0.7)" />
            <rect class="vol-bar" x="118" y="55.5" width="30" height="49.5" ry="3" fill="rgba(99,102,241,0.7)" />
            <rect class="vol-bar" x="174" y="37.5" width="30" height="67.5" ry="3" fill="rgba(99,102,241,0.7)" />
            <rect class="vol-bar" x="230" y="15" width="30" height="90" ry="3" fill="rgba(99,102,241,0.7)" />
            <line x1="0" y1="106" x2="280" y2="106" stroke="#e2e0f0" stroke-width="1" />
            <text x="21" y="116" text-anchor="middle" font-size="8" fill="#6b7280" font-family="Space Mono, monospace">€10k</text>
            <text x="77" y="116" text-anchor="middle" font-size="8" fill="#6b7280" font-family="Space Mono, monospace">€50k</text>
            <text x="133" y="116" text-anchor="middle" font-size="8" fill="#6b7280" font-family="Space Mono, monospace">€200k</text>
            <text x="189" y="116" text-anchor="middle" font-size="8" fill="#6b7280" font-family="Space Mono, monospace">€500k</text>
            <text x="245" y="116" text-anchor="middle" font-size="8" fill="#6b7280" font-family="Space Mono, monospace">€1M+</text>
          </svg>
        </div>
      </div>
    </section>

    <!-- ═══ C: COMPLIANCE ADD-ONS BOX ═════════════════════════════ -->
    <section class="sp-addons-section" aria-labelledby="sp-addons-heading" data-reveal="fade-up">
      <div class="sp-section-inner">
        <div class="sp-addons-box">
          <h2 id="sp-addons-heading" class="sp-addons-heading">Need more?</h2>
          <p class="sp-addons-intro">Enterprise customers can add:</p>
          <ul class="sp-addons-list">
            <li>Enhanced KYC screening (PEP/adverse media)</li>
            <li>Dedicated compliance manager</li>
            <li>Custom data residency</li>
            <li>Audit report exports</li>
          </ul>
          <a href="#" class="sp-addons-cta">Talk to Sales →</a>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const volGraphRef = ref<SVGSVGElement | null>(null)

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
import { useCardTiltAll } from '@/composables/useCardTilt'

// ── Annual / Monthly toggle ──────────────────────────────────────
const annual = ref(false)
const multiplier = computed(() => annual.value ? 0.8 : 1)

// ── Card tilt on fee cards ────────────────────────────────────
const feeCardContainerRef = ref<HTMLElement | null>(null)
useCardTiltAll(feeCardContainerRef, '.sp-fee-card', { maxTilt: 5, scale: 1.025, glowColor: '#6366f1', glowIntensity: 0.18 })

const calcAmount = ref(5000)
const calcPartnerShare = ref(0.25)
const platformFee = computed(() => calcAmount.value * 0.005)
const networkFee = computed(() => calcAmount.value * 0.002)
const partnerEarns = computed(() => calcAmount.value * calcPartnerShare.value / 100)

function formatEuro(n: number): string {
  return '€' + n.toFixed(2)
}

const comparisonRows = [
  { feature: 'Fee transparency', industry: false },
  { feature: 'Pre-confirm fee disclosure', industry: false },
  { feature: 'KYC built-in', industry: false },
  { feature: 'Partner dashboard', industry: false },
  { feature: 'Real-time ledger', industry: true },
  { feature: 'API access', industry: true },
]
</script>

<style scoped>
.sp-pricing {
  --bg: #ffffff;
  --surface: #f8f7ff;
  --ink: #0f0f23;
  --ink-mid: #4a4a6a;
  --ink-muted: #8888a8;
  --accent: #4f46e5;
  --accent-light: #ede9fe;
  --green: #22c55e;
  --green-light: #dcfce7;
  --border: #e2e0f0;
  --radius: 12px;

  background: var(--bg);
  color: var(--ink);
  font-family: 'Inter', sans-serif;
}

.sp-accent { color: var(--accent); }

/* Shared */
.sp-section-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.sp-section-heading {
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 700;
  line-height: 1.15;
  color: var(--ink);
  text-align: center;
  margin: 0 0 0.75rem;
}

.sp-section-sub {
  text-align: center;
  font-size: 1rem;
  color: var(--ink-mid);
  margin: 0 0 2.5rem;
}

.sp-btn {
  display: inline-flex;
  align-items: center;
  font-family: 'Inter', sans-serif;
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
  padding: 0.75rem 1.75rem;
  border-radius: 100px;
  transition: transform 0.15s, box-shadow 0.15s;
  border: 2px solid transparent;
}

.sp-btn--primary {
  background: var(--accent);
  color: #ffffff;
  border-color: var(--accent);
}

.sp-btn--primary:hover {
  background: #4338ca;
  border-color: #4338ca;
  transform: translateY(-1px);
}

.sp-btn--ghost {
  background: transparent;
  color: var(--accent);
  border-color: var(--accent);
}

.sp-btn--ghost:hover {
  background: var(--accent-light);
  transform: translateY(-1px);
}

/* ═══ Hero ════════════════════════════════════════════════════ */
.sp-hero {
  background: var(--surface);
  padding: 5rem 0;
}

.sp-hero-inner {
  max-width: 700px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
}

.sp-hero-eyebrow {
  display: inline-block;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--accent);
  background: var(--accent-light);
  padding: 0.3rem 0.875rem;
  border-radius: 100px;
  margin-bottom: 1.25rem;
}

.sp-h1 {
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(2.25rem, 4.5vw, 3.25rem);
  font-weight: 700;
  line-height: 1.15;
  color: var(--ink);
  letter-spacing: -0.02em;
  margin: 0 0 1.25rem;
}

.sp-hero-sub {
  font-size: 1rem;
  line-height: 1.65;
  color: var(--ink-mid);
  max-width: 56ch;
  margin: 0 auto;
}

/* ═══ Calculator ══════════════════════════════════════════════ */
.sp-calc-section {
  padding: 5rem 0 0;
}

.sp-calc-card {
  max-width: 600px;
  margin: 0 auto;
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: 0 2px 16px rgba(79, 70, 229, 0.10);
  overflow: hidden;
}

.sp-calc-controls {
  padding: 2rem;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sp-calc-field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.sp-calc-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--ink-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.sp-calc-amount-display {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--accent);
  line-height: 1;
  margin-bottom: 0.375rem;
}

.sp-calc-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  border-radius: 100px;
  background: var(--border);
  outline: none;
  cursor: pointer;
}

.sp-calc-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--accent);
  cursor: pointer;
  box-shadow: 0 0 0 3px var(--accent-light);
}

.sp-calc-slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--accent);
  cursor: pointer;
  border: none;
  box-shadow: 0 0 0 3px var(--accent-light);
}

.sp-calc-range-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--ink-muted);
}

.sp-calc-breakdown {
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.sp-calc-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--border);
  font-family: 'Inter', sans-serif;
  font-size: 0.9375rem;
}

.sp-calc-row:last-child {
  border-bottom: none;
}

.sp-calc-row--highlight {
  background: var(--accent-light);
  margin: 0 -2rem;
  padding: 0.75rem 2rem;
  border-radius: 0 0 var(--radius) var(--radius);
}

.sp-calc-row-label {
  color: var(--ink-mid);
}

.sp-calc-row-value {
  font-family: 'DM Sans', sans-serif;
  font-weight: 700;
  color: var(--ink);
}

.sp-calc-row-value--accent {
  color: var(--accent);
  font-size: 1.125rem;
}

/* ═══ Fee Table ═══════════════════════════════════════════════ */
.sp-fees-section {
  padding: 5rem 0;
}

.sp-fee-card {
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: 0 2px 16px rgba(79, 70, 229, 0.10);
  overflow: hidden;
  background: #ffffff;
}

.sp-fee-header {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  padding: 0.875rem 1.5rem;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
}

.sp-fee-header span {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--ink-muted);
  letter-spacing: 0.04em;
}

.sp-fee-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  align-items: center;
  padding: 1.125rem 1.5rem;
  border-bottom: 1px solid var(--border);
  transition: background 0.15s;
}

.sp-fee-row:hover {
  background: #fafafe;
}

.sp-fee-name {
  font-family: 'Inter', sans-serif;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--ink);
  margin-bottom: 0.2rem;
}

.sp-fee-note {
  font-size: 0.8125rem;
  color: var(--ink-muted);
  line-height: 1.4;
}

.sp-fee-value {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--ink);
  white-space: nowrap;
}

.sp-fee-value--accent {
  color: var(--accent);
}

.sp-fee-value--green {
  color: #16a34a;
}

.sp-fee-footer {
  padding: 1rem 1.5rem;
  background: var(--green-light);
}

.sp-fee-disclosure {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #15803d;
}

/* ═══ Comparison Table ════════════════════════════════════════ */
.sp-compare-section {
  background: var(--surface);
  padding: 5rem 0;
}

.sp-compare-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: var(--radius);
  box-shadow: 0 2px 16px rgba(79, 70, 229, 0.10);
}

.sp-compare-table {
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
  font-family: 'Inter', sans-serif;
  min-width: 500px;
}

.sp-compare-table thead tr {
  border-bottom: 2px solid var(--border);
}

.sp-compare-table th {
  padding: 1rem 1.5rem;
  text-align: left;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--ink);
}

.sp-compare-feature-col {
  width: 50%;
}

.sp-compare-prodigy-col,
.sp-compare-industry-col {
  width: 25%;
  text-align: center;
}

.sp-compare-prodigy-badge {
  display: inline-block;
  background: var(--accent);
  color: #ffffff;
  padding: 0.25rem 0.875rem;
  border-radius: 100px;
  font-size: 0.875rem;
  font-weight: 700;
}

.sp-compare-table tbody tr {
  border-bottom: 1px solid var(--border);
  transition: background 0.15s;
}

.sp-compare-table tbody tr:hover {
  background: #fafafe;
}

.sp-compare-table tbody tr:last-child {
  border-bottom: none;
}

.sp-compare-table td {
  padding: 0.875rem 1.5rem;
  vertical-align: middle;
}

.sp-compare-feature {
  font-size: 0.9375rem;
  color: var(--ink);
  font-weight: 500;
}

.sp-compare-prodigy,
.sp-compare-industry {
  text-align: center;
}

.sp-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8125rem;
  font-weight: 600;
  padding: 0.25rem 0.625rem;
  border-radius: 100px;
}

.sp-badge--green {
  background: var(--green-light);
  color: #15803d;
}

.sp-badge--red {
  background: #fee2e2;
  color: #dc2626;
}

/* ═══ CTA ════════════════════════════════════════════════════ */
.sp-cta-section {
  padding: 5rem 0;
}

.sp-cta-inner {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 2rem;
}

.sp-cta-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 3rem 2.5rem;
  text-align: center;
  box-shadow: 0 2px 16px rgba(79, 70, 229, 0.08);
}

.sp-cta-heading {
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: var(--ink);
  margin: 0 0 0.75rem;
}

.sp-cta-sub {
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--ink-mid);
  margin: 0 0 1.75rem;
}

.sp-cta-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

/* ─── Responsive ────────────────────────────────────────── */
@media (max-width: 600px) {
  .sp-hero {
    padding: 3.5rem 0;
  }

  .sp-fees-section {
    padding: 3.5rem 0;
  }

  .sp-fee-row {
    padding: 0.875rem 1rem;
  }

  .sp-cta-card {
    padding: 2rem 1.25rem;
  }

  .sp-cta-actions {
    flex-direction: column;
    align-items: center;
  }
}

/* ═══ ROI Section ════════════════════════════════════════ */
.sp-roi-section {
  padding: 5rem 0;
  background: var(--surface);
}

.sp-roi-box {
  max-width: 640px;
  margin: 0 auto;
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 2rem 2.5rem;
  box-shadow: 0 2px 16px rgba(79, 70, 229, 0.10);
}

.sp-roi-scenario {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: var(--ink-mid);
  margin: 0 0 1.25rem;
}

.sp-roi-compare {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.sp-roi-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 0.9375rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.sp-roi-row--bad {
  background: #fee2e2;
  color: #991b1b;
}

.sp-roi-row--good {
  background: #dcfce7;
  color: #15803d;
}

.sp-roi-label {
  font-weight: 500;
}

.sp-roi-value {
  font-weight: 700;
}

.sp-roi-result {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  line-height: 1.65;
  color: var(--ink);
  margin: 0;
  border-top: 1px solid var(--border);
  padding-top: 1.25rem;
}

/* ═══ FAQ Accordion ══════════════════════════════════════ */
.sp-faq-section {
  padding: 5rem 0;
}

.sp-faq-list {
  max-width: 680px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sp-faq-item {
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}

.sp-faq-q {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.125rem 1.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--ink);
  cursor: pointer;
  list-style: none;
  user-select: none;
  transition: background 0.15s;
}

.sp-faq-q::-webkit-details-marker {
  display: none;
}

.sp-faq-q::after {
  content: '+';
  font-size: 1.25rem;
  font-weight: 300;
  color: var(--accent);
  flex-shrink: 0;
  margin-left: 1rem;
}

.sp-faq-item[open] .sp-faq-q::after {
  content: '−';
}

.sp-faq-item[open] .sp-faq-q {
  background: var(--accent-light);
}

.sp-faq-a {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  line-height: 1.7;
  color: var(--ink-mid);
  margin: 0;
  padding: 0 1.5rem 1.25rem;
}

/* ═══ Compliance Add-ons ═════════════════════════════════ */
.sp-addons-section {
  padding: 3rem 0 5rem;
}

.sp-addons-box {
  max-width: 640px;
  margin: 0 auto;
  background: var(--accent-light);
  border: 1px solid #c4b5fd;
  border-radius: var(--radius);
  padding: 2rem 2.5rem;
}

.sp-addons-heading {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--ink);
  margin: 0 0 0.375rem;
}

.sp-addons-intro {
  font-family: 'Inter', sans-serif;
  font-size: 0.9375rem;
  color: var(--ink-mid);
  margin: 0 0 0.875rem;
}

.sp-addons-list {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  line-height: 1.8;
  color: var(--ink);
  margin: 0 0 1.5rem;
  padding-left: 1.25rem;
}

.sp-addons-cta {
  font-family: 'Inter', sans-serif;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--accent);
  text-decoration: none;
}

.sp-addons-cta:hover {
  text-decoration: underline;
}

/* ── Trial banner ── */
.sp-trial-banner {
  background: var(--accent);
  color: #ffffff;
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  padding: 0.875rem 2rem;
  border-radius: var(--radius);
  margin-bottom: 2.5rem;
  box-shadow: 0 4px 16px rgba(79, 70, 229, 0.25);
}

/* ── Annual / Monthly billing toggle ───────────────────────── */
.sp-billing-toggle {
  display: inline-flex;
  gap: 0;
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.sp-billing-btn {
  background: transparent;
  border: none;
  color: rgba(30, 27, 75, 0.5);
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.65rem 1.25rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
}

.sp-billing-btn.active {
  background: #6366f1;
  color: #fff;
}

.sp-billing-btn:hover:not(.active) {
  background: rgba(99, 102, 241, 0.08);
  color: #6366f1;
}

.sp-save-badge {
  background: rgba(255, 255, 255, 0.25);
  color: inherit;
  font-size: 0.75rem;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
}

.sp-billing-btn.active .sp-save-badge {
  background: rgba(255, 255, 255, 0.25);
  color: #fff;
}

.sp-billing-note {
  font-size: 0.8rem;
  color: #6366f1;
  margin-bottom: 1.5rem;
  margin-top: -1rem;
}

/* ── Volume Graph SVG ── */
.sp-volgraph-section { background: #f8f7ff; border-top: 1px solid rgba(99,102,241,0.12); border-bottom: 1px solid rgba(99,102,241,0.12); }
.sp-volgraph-wrap { max-width: 600px; }
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
