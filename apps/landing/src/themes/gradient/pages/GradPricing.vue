<template>
  <main>
    <!-- ── Hero ─────────────────────────────────────────────────────── -->
    <section class="hero" aria-labelledby="pricing-heading">
      <div class="hero-inner">
        <div class="eyebrow-badge" role="note">
          <span aria-hidden="true">✦</span> Transparent by design
        </div>
        <h1 id="pricing-heading" class="hero-h1">
          Simple Fees. <em>Remarkable</em> Clarity.
        </h1>
        <p class="hero-sub">
          The only pricing page that is also a value proposition. Every fee is visible to your users before they confirm. Including this one.
        </p>
      </div>
    </section>

    <!-- ── Pricing card ──────────────────────────────────────────── -->
    <section class="pricing-section" aria-labelledby="fee-structure-heading">
      <div class="pricing-inner" ref="pricingInnerRef">
        <div class="pricing-card" role="table" aria-label="Fee structure" data-animate-stagger>
          <div class="card-gradient-strip" aria-hidden="true" />

          <div class="pricing-header">
            <div class="pricing-header-left">
              <h2 id="fee-structure-heading" class="pricing-card-title">Fee Structure</h2>
              <p class="pricing-card-sub">Per transaction. No monthly fees. No setup costs.</p>
            </div>
            <div class="pricing-badge">Per Transaction</div>
          </div>

          <!-- Annual / Monthly toggle -->
          <div class="gp-billing-toggle" role="group" aria-label="Billing period">
            <button class="gp-billing-btn" :class="{ active: !annual }" @click="annual = false" :aria-pressed="!annual">Monthly</button>
            <button class="gp-billing-btn gp-billing-btn--annual" :class="{ active: annual }" @click="annual = true" :aria-pressed="annual">
              Annual <span class="gp-save-badge">−20%</span>
            </button>
          </div>
          <p v-if="annual" class="gp-billing-note">Platform fee billed annually · 20% discount applied</p>

          <div class="fee-table" role="rowgroup">
            <div class="fee-row fee-row--head" role="row">
              <span role="columnheader">Fee Type</span>
              <span role="columnheader">Amount</span>
              <span role="columnheader">Shown to user</span>
            </div>

            <div class="fee-row" role="row">
              <span class="fee-name" role="cell">Platform fee</span>
              <span class="fee-value fee-value--violet" role="cell">0.50%</span>
              <span class="fee-note" role="cell">Stated before user confirms</span>
            </div>

            <div class="fee-row" role="row">
              <span class="fee-name" role="cell">Network fee</span>
              <span class="fee-value" role="cell">~0.20%</span>
              <span class="fee-note" role="cell">Actual cost, not estimate</span>
            </div>

            <div class="fee-row" role="row">
              <span class="fee-name" role="cell">KYC verification</span>
              <span class="fee-value fee-value--green" role="cell">Included</span>
              <span class="fee-note" role="cell">No surprise charges</span>
            </div>

            <div class="fee-row" role="row">
              <span class="fee-name" role="cell">Partner revenue share</span>
              <span class="fee-value fee-value--amber" role="cell">
                0.10% – 0.50%
                <span class="most-popular-badge" aria-label="Most popular tier">Most Popular</span>
              </span>
              <span class="fee-note" role="cell">You configure it</span>
            </div>
          </div>

          <div class="success-bar" role="note" aria-label="Fee transparency promise">
            <svg class="success-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
              <path d="M9 11l3 3L22 4"/>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
            </svg>
            <span>Every fee is visible before confirmation. No hidden charges. No post-transaction adjustments.</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Comparison grid ───────────────────────────────────────── -->
    <section class="compare-section" aria-labelledby="compare-heading">
      <div class="compare-inner">
        <h2 id="compare-heading" class="section-h2">How we compare.</h2>
        <p class="section-sub">Six things that matter to fintech builders.</p>

        <div class="compare-grid" data-reveal="fade-up">
          <!-- Headers -->
          <div class="compare-col compare-col--prodigy">
            <div class="compare-header-pill">
              <span class="compare-logo-mark" aria-hidden="true">◈</span> Prodigy
            </div>
          </div>
          <div class="compare-col compare-col--others">
            <div class="compare-header-muted">Others</div>
          </div>

          <!-- Row 1 -->
          <div class="compare-cell compare-cell--prodigy" role="row">
            <span class="check-icon" aria-label="Yes">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" aria-hidden="true">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </span>
            <span class="compare-item">Fees visible before confirmation</span>
          </div>
          <div class="compare-cell compare-cell--others" role="row">
            <span class="cross-icon" aria-label="No">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </span>
            <span class="compare-item compare-item--muted">Often hidden or approximated</span>
          </div>

          <!-- Row 2 -->
          <div class="compare-cell compare-cell--prodigy">
            <span class="check-icon" aria-label="Yes">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" aria-hidden="true">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </span>
            <span class="compare-item">KYC built into widget</span>
          </div>
          <div class="compare-cell compare-cell--others">
            <span class="cross-icon" aria-label="No">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </span>
            <span class="compare-item compare-item--muted">Separate vendor, separate contract</span>
          </div>

          <!-- Row 3 -->
          <div class="compare-cell compare-cell--prodigy">
            <span class="check-icon" aria-label="Yes">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" aria-hidden="true">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </span>
            <span class="compare-item">Real-time partner revenue portal</span>
          </div>
          <div class="compare-cell compare-cell--others">
            <span class="cross-icon" aria-label="No">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </span>
            <span class="compare-item compare-item--muted">Monthly CSV if you're lucky</span>
          </div>

          <!-- Row 4 -->
          <div class="compare-cell compare-cell--prodigy">
            <span class="check-icon" aria-label="Yes">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" aria-hidden="true">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </span>
            <span class="compare-item">No monthly fees or minimums</span>
          </div>
          <div class="compare-cell compare-cell--others">
            <span class="cross-icon" aria-label="No">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </span>
            <span class="compare-item compare-item--muted">Tiered plans with locked features</span>
          </div>

          <!-- Row 5 -->
          <div class="compare-cell compare-cell--prodigy">
            <span class="check-icon" aria-label="Yes">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" aria-hidden="true">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </span>
            <span class="compare-item">One script tag integration</span>
          </div>
          <div class="compare-cell compare-cell--others">
            <span class="cross-icon" aria-label="No">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </span>
            <span class="compare-item compare-item--muted">API integration + backend setup</span>
          </div>

          <!-- Row 6 -->
          <div class="compare-cell compare-cell--prodigy">
            <span class="check-icon" aria-label="Yes">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" aria-hidden="true">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </span>
            <span class="compare-item">Risk scoring included</span>
          </div>
          <div class="compare-cell compare-cell--others">
            <span class="cross-icon" aria-label="No">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </span>
            <span class="compare-item compare-item--muted">Third-party tool, extra cost</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Fee calculator ──────────────────────────────────────────── -->
    <section class="calc-section" aria-labelledby="calc-heading">
      <div class="calc-inner">
        <p class="calc-eyebrow" aria-hidden="true">FEE CALCULATOR</p>
        <h2 id="calc-heading" class="calc-h2">See your numbers.</h2>
        <p class="calc-sub">Enter a transaction volume and see what the fee breakdown looks like.</p>

        <div class="calc-card" data-reveal="fade-up">
          <div class="calc-field">
            <label class="calc-label" for="calc-amount">Transaction amount (€)</label>
            <input
              id="calc-amount"
              class="calc-input"
              type="number"
              v-model.number="calcAmount"
              min="10"
              max="1000000"
              aria-describedby="calc-amount-hint"
            />
            <span id="calc-amount-hint" class="calc-input-hint">Min €10 — Max €1,000,000</span>
          </div>

          <div class="calc-field">
            <label class="calc-label" for="calc-share">
              Partner share: <strong class="calc-share-val">{{ (calcPartnerShare * 100).toFixed(2) }}%</strong>
            </label>
            <input
              id="calc-share"
              class="calc-range"
              type="range"
              v-model.number="calcPartnerShare"
              min="0.001"
              max="0.005"
              step="0.001"
              aria-valuemin="0.001"
              aria-valuemax="0.005"
              :aria-valuenow="calcPartnerShare"
              :aria-valuetext="(calcPartnerShare * 100).toFixed(2) + ' percent'"
            />
            <div class="calc-range-labels" aria-hidden="true">
              <span>0.10%</span>
              <span>0.50%</span>
            </div>
          </div>

          <div class="calc-breakdown" aria-label="Fee breakdown">
            <div class="calc-breakdown-row">
              <span class="calc-breakdown-key">Platform fee</span>
              <span class="calc-breakdown-val">€{{ platformFee.toFixed(2) }}</span>
            </div>
            <div class="calc-breakdown-row">
              <span class="calc-breakdown-key">Network fee</span>
              <span class="calc-breakdown-val">€{{ networkFee.toFixed(2) }}</span>
            </div>
            <div class="calc-breakdown-row calc-breakdown-row--highlight">
              <span class="calc-breakdown-key">Your partner share</span>
              <span class="calc-breakdown-val calc-breakdown-val--violet">€{{ partnerFee.toFixed(2) }}</span>
            </div>
            <div class="calc-divider" aria-hidden="true" />
            <div class="calc-breakdown-row calc-breakdown-row--total">
              <span class="calc-breakdown-key">User receives</span>
              <span class="calc-breakdown-val">€{{ userReceives.toFixed(2) }}</span>
            </div>
          </div>

          <p class="calc-green-note" role="note">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            Every fee shown to user before confirmation
          </p>

          <a
            href="http://localhost:5006"
            target="_blank"
            rel="noopener noreferrer"
            class="calc-btn"
          >
            Open Partner Portal →
          </a>
        </div>
      </div>
    </section>

    <!-- ── ROI Callout ──────────────────────────────────────────── -->
    <section class="gpr-roi-section" aria-labelledby="gpr-roi-heading">
      <div class="gpr-roi-inner">
        <div class="gpr-roi-card">
          <h2 id="gpr-roi-heading" class="gpr-roi-h2" data-reveal="fade-up">More users. Same traffic.</h2>
          <p class="gpr-roi-body">94% KYC pass rate vs 67% industry average means 270 more activating users per 1,000 sign-ups. That's revenue you're leaving on the table without Prodigy.</p>
        </div>
      </div>
    </section>

    <!-- ── Volume Graph ──────────────────────────────────────────── -->
    <section class="gpr-volgraph-section" aria-labelledby="gpr-volgraph-h" data-reveal="fade-up">
      <div class="gpr-volgraph-inner">
        <div class="eyebrow-badge" role="note" style="margin-bottom:1rem;">
          <span aria-hidden="true">✦</span> Partner Revenue at Scale
        </div>
        <h2 id="gpr-volgraph-h" class="gpr-faq-h2">The more you process, the more you earn.</h2>
        <p class="gpr-faq-body" style="margin-bottom:2rem;">Estimated monthly partner revenue by volume tier</p>
        <div class="gpr-volgraph-wrap">
          <svg ref="volGraphRef" viewBox="0 0 280 120" fill="none" xmlns="http://www.w3.org/2000/svg"
               width="100%" preserveAspectRatio="xMidYMid meet"
               aria-hidden="true" role="img" class="volgraph-svg">
            <text x="21" y="12" text-anchor="middle" font-size="8" fill="#a855f7" font-family="Space Mono, monospace">€10</text>
            <text x="77" y="12" text-anchor="middle" font-size="8" fill="#a855f7" font-family="Space Mono, monospace">€37</text>
            <text x="133" y="12" text-anchor="middle" font-size="8" fill="#a855f7" font-family="Space Mono, monospace">€125</text>
            <text x="189" y="12" text-anchor="middle" font-size="8" fill="#a855f7" font-family="Space Mono, monospace">€312</text>
            <text x="245" y="12" text-anchor="middle" font-size="8" fill="#a855f7" font-family="Space Mono, monospace">€625</text>
            <rect class="vol-bar" x="6" y="87" width="30" height="18" ry="3" fill="rgba(168,85,247,0.7)" />
            <rect class="vol-bar" x="62" y="73.5" width="30" height="31.5" ry="3" fill="rgba(168,85,247,0.7)" />
            <rect class="vol-bar" x="118" y="55.5" width="30" height="49.5" ry="3" fill="rgba(168,85,247,0.7)" />
            <rect class="vol-bar" x="174" y="37.5" width="30" height="67.5" ry="3" fill="rgba(168,85,247,0.7)" />
            <rect class="vol-bar" x="230" y="15" width="30" height="90" ry="3" fill="rgba(168,85,247,0.7)" />
            <line x1="0" y1="106" x2="280" y2="106" stroke="rgba(168,85,247,0.2)" stroke-width="1" />
            <text x="21" y="116" text-anchor="middle" font-size="8" fill="rgba(255,255,255,0.45)" font-family="Space Mono, monospace">€10k</text>
            <text x="77" y="116" text-anchor="middle" font-size="8" fill="rgba(255,255,255,0.45)" font-family="Space Mono, monospace">€50k</text>
            <text x="133" y="116" text-anchor="middle" font-size="8" fill="rgba(255,255,255,0.45)" font-family="Space Mono, monospace">€200k</text>
            <text x="189" y="116" text-anchor="middle" font-size="8" fill="rgba(255,255,255,0.45)" font-family="Space Mono, monospace">€500k</text>
            <text x="245" y="116" text-anchor="middle" font-size="8" fill="rgba(255,255,255,0.45)" font-family="Space Mono, monospace">€1M+</text>
          </svg>
        </div>
      </div>
    </section>

    <!-- ── FAQ ──────────────────────────────────────────────────── -->
    <section class="gpr-faq-section" aria-labelledby="gpr-faq-heading">
      <div class="gpr-faq-inner">
        <h2 id="gpr-faq-heading" class="gpr-faq-h2" data-reveal="fade-up">Common questions.</h2>
        <div class="gpr-faq-list">
          <details class="gpr-faq-item">
            <summary class="gpr-faq-summary">Are there setup fees?</summary>
            <p class="gpr-faq-answer">None. Prodigy is priced per successful transaction. You pay nothing to get started.</p>
          </details>
          <details class="gpr-faq-item">
            <summary class="gpr-faq-summary">What happens when I exceed my volume tier?</summary>
            <p class="gpr-faq-answer">The platform auto-scales. There's no interruption to service and no manual intervention required.</p>
          </details>
          <details class="gpr-faq-item">
            <summary class="gpr-faq-summary">Is KYC charged separately?</summary>
            <p class="gpr-faq-answer">No. KYC is bundled into the platform fee. Always. No surprise charges per verification.</p>
          </details>
          <details class="gpr-faq-item">
            <summary class="gpr-faq-summary">Is there a minimum contract length?</summary>
            <p class="gpr-faq-answer">Monthly or annual on Enterprise. Starter and Growth plans have no lock-in.</p>
          </details>
          <details class="gpr-faq-item">
            <summary class="gpr-faq-summary">Can I test before committing?</summary>
            <p class="gpr-faq-answer">Yes. Full sandbox environment, free. No credit card required to explore.</p>
          </details>
        </div>
      </div>
    </section>

    <!-- ── White-label Callout ───────────────────────────────────── -->
    <section class="gpr-wl-section" aria-labelledby="gpr-wl-heading">
      <div class="gpr-wl-inner">
        <div class="gpr-wl-card g-grad-border" data-reveal="fade-up">
          <h2 id="gpr-wl-heading" class="gpr-wl-h2">Growth and above: full white-label.</h2>
          <p class="gpr-wl-body">Your brand, your widget, your UX. Prodigy is invisible to your users.</p>
          <RouterLink to="/gradient/pricing" class="gpr-wl-cta">View Growth plan →</RouterLink>
        </div>
      </div>
    </section>

    <!-- ── CTA ───────────────────────────────────────────────────── -->
    <section class="cta-section" aria-labelledby="pricing-cta-heading">
      <div class="mesh-blob cta-blob-1" aria-hidden="true" />
      <div class="mesh-blob cta-blob-2" aria-hidden="true" />
      <div class="cta-inner">
        <h2 id="pricing-cta-heading" class="cta-h2">Start for free. Scale without renegotiating.</h2>
        <p class="cta-sub">Everything else on the partner page.</p>
        <div class="cta-actions">
          <a
            href="http://localhost:5001"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-white"
          >
            Open Live Demo →
          </a>
          <RouterLink to="/gradient/partners" class="btn-ghost">
            View Partners
          </RouterLink>
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

/* ── Annual / Monthly toggle ──────────────────────────────────────── */
const annual = ref(false)
const multiplier = computed(() => annual.value ? 0.8 : 1)

/* ── Card tilt ───────────────────────────────────────────────────── */
const pricingInnerRef = ref<HTMLElement | null>(null)
useCardTiltAll(pricingInnerRef, '.pricing-card', { maxTilt: 8, scale: 1.03, glowColor: '#a855f7', glowIntensity: 0.3 })

/* ── Fee calculator state ───────────────────────────────────────── */
const calcAmount = ref<number>(1000)
const calcPartnerShare = ref<number>(0.002) // stored as decimal: 0.002 = 0.20%

const platformFee = computed(() => calcAmount.value * 0.005)
const networkFee = computed(() => calcAmount.value * 0.002)
const partnerFee = computed(() => calcAmount.value * calcPartnerShare.value)
const userReceives = computed(() => calcAmount.value - platformFee.value - networkFee.value)
</script>

<style scoped>
/* ── CSS variables ──────────────────────────────────────────────── */
.hero,
.pricing-section,
.compare-section,
.calc-section,
.cta-section {
  --violet: #7c3aed;
  --purple: #9333ea;
  --pink: #ec4899;
  --lavender: #a78bfa;
  --teal: #14b8a6;
  --green: #22c55e;
  --amber: #f59e0b;
  --bg: #fafafa;
  --surface: #f3f0ff;
  --white: #ffffff;
  --ink: #0f0e1a;
  --ink-mid: #4b4a6e;
  --ink-muted: #8b89b0;
  --border: rgba(124, 58, 237, 0.12);
  --radius-card: 20px;
  --radius-pill: 100px;
  --grad-hero: linear-gradient(135deg, #7c3aed 0%, #9333ea 35%, #ec4899 70%, #f59e0b 100%);
  --grad-soft: linear-gradient(160deg, #f3f0ff 0%, #fce7f3 50%, #ecfdf5 100%);
}

/* ── Hero ───────────────────────────────────────────────────────── */
.hero {
  background: var(--grad-soft);
  padding: 5rem 1.5rem;
  text-align: center;
}

.hero-inner {
  max-width: 680px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.eyebrow-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  background: rgba(124, 58, 237, 0.1);
  color: #7c3aed;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.8125rem;
  font-weight: 600;
  border-radius: 100px;
  padding: 0.375rem 1rem;
}

.hero-h1 {
  font-family: 'Syne', sans-serif;
  font-size: clamp(2.5rem, 5vw, 3.75rem);
  font-weight: 800;
  color: #0f0e1a;
  line-height: 1.1;
  margin: 0;
}

.hero-h1 em {
  font-style: italic;
  color: #7c3aed;
}

.hero-sub {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  color: #4b4a6e;
  max-width: 52ch;
  line-height: 1.7;
  margin: 0;
}

/* ── Pricing card ───────────────────────────────────────────────── */
.pricing-section {
  background: #fafafa;
  padding: 5rem 1.5rem;
}

.pricing-inner {
  max-width: 580px;
  margin: 0 auto;
}

.pricing-card {
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 8px 48px rgba(124, 58, 237, 0.12), 0 2px 8px rgba(0,0,0,0.05);
  overflow: hidden;
  border: 1px solid rgba(124, 58, 237, 0.1);
}

.card-gradient-strip {
  height: 4px;
  background: linear-gradient(135deg, #7c3aed, #9333ea, #ec4899, #f59e0b);
}

.pricing-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.75rem 1.75rem 1.25rem;
  gap: 1rem;
}

.pricing-card-title {
  font-family: 'Syne', sans-serif;
  font-size: 1.375rem;
  font-weight: 700;
  color: #0f0e1a;
  margin: 0 0 0.25rem;
}

.pricing-card-sub {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.875rem;
  color: #8b89b0;
  margin: 0;
}

.pricing-badge {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: #7c3aed;
  background: rgba(124, 58, 237, 0.1);
  padding: 0.375rem 0.875rem;
  border-radius: 100px;
  white-space: nowrap;
  flex-shrink: 0;
}

.fee-table {
  border-top: 1px solid rgba(124, 58, 237, 0.08);
}

.fee-row {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1.5fr;
  padding: 0.875rem 1.75rem;
  border-bottom: 1px solid rgba(124, 58, 237, 0.07);
  align-items: center;
  gap: 0.5rem;
}

.fee-row:last-child {
  border-bottom: none;
}

.fee-row--head {
  background: rgba(124, 58, 237, 0.04);
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #8b89b0;
}

.fee-name {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #0f0e1a;
}

.fee-value {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  font-weight: 800;
  color: #0f0e1a;
}

.fee-value--violet { color: #7c3aed; }
.fee-value--green { color: #22c55e; }
.fee-value--amber { color: #f59e0b; }

.fee-note {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.8125rem;
  color: #8b89b0;
}

.success-bar {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  background: rgba(34, 197, 94, 0.08);
  border-top: 1px solid rgba(34, 197, 94, 0.15);
  padding: 1rem 1.75rem;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: #22c55e;
}

.success-icon {
  flex-shrink: 0;
}

/* ── Compare grid ───────────────────────────────────────────────── */
.compare-section {
  background: var(--grad-soft);
  padding: 5rem 1.5rem;
}

.compare-inner {
  max-width: 860px;
  margin: 0 auto;
}

.section-h2 {
  font-family: 'Syne', sans-serif;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 700;
  color: #0f0e1a;
  text-align: center;
  margin: 0 0 0.5rem;
}

.section-sub {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  color: #8b89b0;
  text-align: center;
  margin: 0 0 2.5rem;
}

.compare-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.compare-col {
  border-radius: 14px;
  padding: 0.75rem 1rem;
}

.compare-col--prodigy {
  background: linear-gradient(135deg, #7c3aed, #ec4899);
}

.compare-col--others {
  background: rgba(139, 137, 176, 0.12);
}

.compare-header-pill {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.9375rem;
  font-weight: 700;
  color: white;
}

.compare-logo-mark {
  font-size: 1rem;
}

.compare-header-muted {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #8b89b0;
}

.compare-cell {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  border-radius: 10px;
  padding: 0.75rem 1rem;
}

.compare-cell--prodigy {
  background: rgba(124, 58, 237, 0.06);
  border: 1px solid rgba(124, 58, 237, 0.1);
}

.compare-cell--others {
  background: rgba(139, 137, 176, 0.06);
  border: 1px solid rgba(139, 137, 176, 0.12);
}

.check-icon,
.cross-icon {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.compare-item {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: #0f0e1a;
}

.compare-item--muted {
  color: #8b89b0;
}

/* ── Fee calculator ─────────────────────────────────────────────── */
.calc-section {
  background: #ffffff;
  padding: 5rem 1.5rem;
}

.calc-inner {
  max-width: 540px;
  margin: 0 auto;
  text-align: center;
}

.calc-eyebrow {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #7c3aed;
  margin: 0 0 0.75rem;
}

.calc-h2 {
  font-family: 'Syne', sans-serif;
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 700;
  color: #0f0e1a;
  margin: 0 0 0.75rem;
}

.calc-sub {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  color: #4b4a6e;
  line-height: 1.65;
  margin: 0 0 2.5rem;
}

.calc-card {
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 8px 48px rgba(124, 58, 237, 0.12), 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(124, 58, 237, 0.1);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: left;
}

.calc-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.calc-label {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: #0f0e1a;
}

.calc-share-val {
  color: #7c3aed;
  font-weight: 700;
}

.calc-input {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.125rem;
  font-weight: 600;
  color: #0f0e1a;
  background: #fafafa;
  border: 1.5px solid rgba(124, 58, 237, 0.2);
  border-radius: 12px;
  padding: 0.75rem 1rem;
  outline: none;
  transition: border-color 0.15s;
  width: 100%;
  box-sizing: border-box;
}

.calc-input:focus {
  border-color: #7c3aed;
}

.calc-input-hint {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.75rem;
  color: #8b89b0;
}

.calc-range {
  width: 100%;
  accent-color: #7c3aed;
  cursor: pointer;
  height: 4px;
}

.calc-range-labels {
  display: flex;
  justify-content: space-between;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.75rem;
  color: #8b89b0;
  margin-top: 0.25rem;
}

.calc-breakdown {
  display: flex;
  flex-direction: column;
  gap: 0;
  background: #fafafa;
  border-radius: 14px;
  border: 1px solid rgba(124, 58, 237, 0.1);
  overflow: hidden;
}

.calc-breakdown-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(124, 58, 237, 0.07);
}

.calc-breakdown-row:last-child {
  border-bottom: none;
}

.calc-breakdown-row--highlight {
  background: rgba(124, 58, 237, 0.04);
}

.calc-breakdown-row--total {
  background: rgba(124, 58, 237, 0.06);
  font-weight: 700;
}

.calc-breakdown-key {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.875rem;
  color: #4b4a6e;
  font-weight: 500;
}

.calc-breakdown-row--total .calc-breakdown-key {
  color: #0f0e1a;
  font-weight: 700;
}

.calc-breakdown-val {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #0f0e1a;
}

.calc-breakdown-val--violet {
  color: #7c3aed;
  font-size: 1.0625rem;
}

.calc-divider {
  height: 1px;
  background: rgba(124, 58, 237, 0.15);
}

.calc-green-note {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: #22c55e;
  background: rgba(34, 197, 94, 0.08);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 10px;
  padding: 0.625rem 0.875rem;
  margin: 0;
}

.calc-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 0.9375rem;
  color: #ffffff;
  background: linear-gradient(135deg, #7c3aed, #ec4899);
  border-radius: 100px;
  padding: 0.875rem 2rem;
  border: none;
  text-decoration: none;
  transition: opacity 0.15s, transform 0.15s;
}

.calc-btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

/* ── CTA ────────────────────────────────────────────────────────── */
.cta-section {
  position: relative;
  background: var(--grad-hero);
  overflow: hidden;
  padding: 5rem 1.5rem;
  text-align: center;
}

.mesh-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  pointer-events: none;
}

.cta-blob-1 {
  width: 400px;
  height: 400px;
  background: #7c3aed;
  top: -150px;
  left: -100px;
}

.cta-blob-2 {
  width: 300px;
  height: 300px;
  background: #ec4899;
  bottom: -100px;
  right: -80px;
}

.cta-inner {
  position: relative;
  z-index: 1;
  max-width: 640px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.cta-h2 {
  font-family: 'Syne', sans-serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: #ffffff;
  line-height: 1.15;
  margin: 0;
}

.cta-sub {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

.cta-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.btn-white {
  display: inline-flex;
  align-items: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 0.9375rem;
  color: #7c3aed;
  background: #ffffff;
  border-radius: 100px;
  padding: 0.875rem 2rem;
  border: none;
  text-decoration: none;
  transition: opacity 0.15s, transform 0.15s;
}

.btn-white:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 600;
  font-size: 0.9375rem;
  color: #ffffff;
  background: transparent;
  border-radius: 100px;
  padding: 0.875rem 2rem;
  border: 2px solid rgba(255, 255, 255, 0.5);
  text-decoration: none;
  transition: border-color 0.15s;
}

.btn-ghost:hover {
  border-color: rgba(255, 255, 255, 0.9);
}

/* ── CSS helpers ────────────────────────────────────────────────── */
.g-grad-border {
  border: 1px solid transparent;
  background: linear-gradient(#fafafa, #fafafa) padding-box, linear-gradient(135deg, #7c3aed, #ec4899) border-box;
}

/* ── ROI Callout ────────────────────────────────────────────────── */
.gpr-roi-section {
  background: #fafafa;
  padding: 5rem 1.5rem;
}
.gpr-roi-inner {
  max-width: 760px;
  margin: 0 auto;
}
.gpr-roi-card {
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.06), rgba(236, 72, 153, 0.06));
  border: 1px solid rgba(124, 58, 237, 0.15);
  border-radius: 20px;
  padding: 2.5rem;
}
.gpr-roi-h2 {
  font-family: 'Syne', sans-serif;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800;
  background: linear-gradient(135deg, #7c3aed, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 1rem;
}
.gpr-roi-body {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  color: #4b4a6e;
  line-height: 1.7;
  margin: 0;
}

/* ── FAQ ────────────────────────────────────────────────────────── */
.gpr-faq-section {
  background: var(--grad-soft);
  padding: 5rem 1.5rem;
}
.gpr-faq-inner {
  max-width: 760px;
  margin: 0 auto;
}
.gpr-faq-h2 {
  font-family: 'Syne', sans-serif;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 700;
  color: #0f0e1a;
  margin: 0 0 2rem;
}
.gpr-faq-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid rgba(124, 58, 237, 0.1);
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
}
.gpr-faq-item {
  border-bottom: 1px solid rgba(124, 58, 237, 0.08);
}
.gpr-faq-item:last-child {
  border-bottom: none;
}
.gpr-faq-summary {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #0f0e1a;
  padding: 1.25rem 1.5rem;
  cursor: pointer;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.15s;
}
.gpr-faq-summary::-webkit-details-marker { display: none; }
.gpr-faq-summary::after {
  content: '+';
  font-size: 1.25rem;
  color: #7c3aed;
  flex-shrink: 0;
  transition: transform 0.15s;
}
.gpr-faq-item[open] .gpr-faq-summary::after {
  transform: rotate(45deg);
}
.gpr-faq-summary:hover {
  background: rgba(124, 58, 237, 0.04);
}
.gpr-faq-answer {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.9375rem;
  color: #4b4a6e;
  line-height: 1.7;
  padding: 0 1.5rem 1.25rem;
  margin: 0;
  border-top: 1px solid rgba(124, 58, 237, 0.07);
}

/* ── White-label Callout ────────────────────────────────────────── */
.gpr-wl-section {
  background: #fafafa;
  padding: 5rem 1.5rem;
}
.gpr-wl-inner {
  max-width: 760px;
  margin: 0 auto;
}
.gpr-wl-card {
  border-radius: 20px;
  padding: 2.5rem;
  background: #ffffff;
}
.gpr-wl-h2 {
  font-family: 'Syne', sans-serif;
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 700;
  color: #0f0e1a;
  margin: 0 0 0.75rem;
}
.gpr-wl-body {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  color: #4b4a6e;
  line-height: 1.7;
  margin: 0 0 1.5rem;
}
.gpr-wl-cta {
  display: inline-flex;
  align-items: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 0.9375rem;
  color: #7c3aed;
  text-decoration: none;
  transition: opacity 0.15s;
}
.gpr-wl-cta:hover {
  opacity: 0.75;
}

/* ── Pricing card shimmer ───────────────────────────────────────── */
.pricing-card { position: relative; overflow: hidden; }
.pricing-card::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 2px; background: linear-gradient(90deg, transparent, rgba(168,85,247,0.8), transparent); animation: shimmer-pass 3s ease-in-out infinite; }
@keyframes shimmer-pass { 0%{left:-100%} 50%,100%{left:100%} }
@media (prefers-reduced-motion: reduce) { .pricing-card::before { animation: none; } }

/* ── Responsive ─────────────────────────────────────────────────── */
@media (max-width: 640px) {
  .fee-row {
    grid-template-columns: 1fr;
    gap: 0.25rem;
    padding: 0.875rem 1.25rem;
  }

  .fee-row--head {
    display: none;
  }

  .compare-grid {
    grid-template-columns: 1fr;
  }

  .cta-actions {
    flex-direction: column;
    width: 100%;
  }

  .btn-white,
  .btn-ghost {
    width: 100%;
    justify-content: center;
  }

  .calc-card {
    padding: 1.5rem 1.25rem;
  }

  .calc-btn {
    width: 100%;
  }
}

/* ── Most Popular badge ── */
.most-popular-badge {
  display: inline-block;
  margin-left: 0.5rem;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  padding: 0.2em 0.6em;
  border-radius: 100px;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  color: #ffffff;
  white-space: nowrap;
  animation: badge-pulse 2s ease-in-out infinite;
  vertical-align: middle;
}
@keyframes badge-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* ── Annual / Monthly billing toggle ───────────────────────── */
.gp-billing-toggle {
  display: inline-flex;
  gap: 0;
  border: 1px solid rgba(168, 85, 247, 0.3);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.gp-billing-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
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

.gp-billing-btn.active {
  background: linear-gradient(135deg, #a855f7, #ec4899);
  color: #fff;
}

.gp-billing-btn:hover:not(.active) {
  background: rgba(168, 85, 247, 0.1);
  color: rgba(255, 255, 255, 0.8);
}

.gp-save-badge {
  background: rgba(255, 255, 255, 0.2);
  color: inherit;
  font-size: 0.75rem;
  padding: 0.1rem 0.4rem;
  border-radius: 5px;
}

.gp-billing-note {
  font-size: 0.8rem;
  color: rgba(168, 85, 247, 0.85);
  margin-bottom: 1.5rem;
  margin-top: -1rem;
}

/* ── Volume Graph SVG ── */
.gpr-volgraph-section { background: rgba(168,85,247,0.04); border-top: 1px solid rgba(168,85,247,0.15); border-bottom: 1px solid rgba(168,85,247,0.15); padding: 5rem 0; }
.gpr-volgraph-inner { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
.gpr-volgraph-wrap { max-width: 600px; margin-top: 1.5rem; }
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
