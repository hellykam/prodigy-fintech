<template>
  <main>

    <!-- ── Hero ─────────────────────────────────────────────────── -->
    <section class="hero" aria-labelledby="pricing-headline">
      <div class="hero-inner">
        <div class="hero-left">
          <p class="label eyebrow">03 / Pricing</p>
          <h1 id="pricing-headline" class="headline">
            <span class="line">WHAT</span>
            <span class="line">YOU SEE</span>
            <span class="line">IS WHAT</span>
            <span class="line iris-text">YOU PAY.</span>
          </h1>
          <p class="sub">
            The receipt you see before confirming is exactly the receipt you get after.
            Three fees. All itemised. All shown before the button is pressed.
            This is considered a radical idea in our industry.
          </p>
          <div class="ctas">
            <a href="http://localhost:5005" target="_blank" rel="noopener noreferrer" class="cta-primary">See the live receipt →</a>
            <RouterLink to="/swiss/partners" class="cta-secondary">Partner pricing</RouterLink>
          </div>
          <div class="stat-chips" aria-label="Key pricing stats">
            <div class="stat-chip"><span class="stat-val">0.50%</span><span class="stat-lbl">Platform fee</span></div>
            <div class="stat-chip"><span class="stat-val">3</span><span class="stat-lbl">Fee components</span></div>
            <div class="stat-chip"><span class="stat-val">0%</span><span class="stat-lbl">Network markup</span></div>
            <div class="stat-chip"><span class="stat-val">100%</span><span class="stat-lbl">Pre-confirm shown</span></div>
          </div>
        </div>

        <div class="hero-right" aria-label="Fee receipt preview">
          <div class="grid-dots" aria-hidden="true" />
          <div class="receipt-card" aria-live="polite">
            <div class="receipt-head">
              <span class="receipt-brand font-mono">◈ PRODIGY RECEIPT</span>
              <span class="label">DEMO</span>
            </div>
            <hr class="rule-dashed" />
            <div class="receipt-rows">
              <div class="receipt-row">
                <span class="muted">Customer sends</span><span>€500.00</span>
              </div>
              <div class="receipt-row">
                <span class="muted">Exchange rate</span><span class="font-mono">1 BTC = €58,234</span>
              </div>
            </div>
            <hr class="rule-dashed" />
            <div class="receipt-rows">
              <div class="receipt-row fee">
                <span class="muted">Platform fee (0.50%)</span><span>−€2.50</span>
              </div>
              <div class="receipt-row fee">
                <span class="muted">Partner share (0.20%)</span><span>−€1.00</span>
              </div>
              <div class="receipt-row fee">
                <span class="muted">Network fee</span><span>−€0.80</span>
              </div>
            </div>
            <hr class="rule-eq" />
            <div class="receipt-row total">
              <span>Customer receives</span>
              <span class="iris-text">0.00852 BTC</span>
            </div>
            <div class="receipt-stamp-row">
              <span class="stamp-approved font-mono">✓ APPROVED</span>
              <span class="timestamp font-mono">{{ timestamp }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Animated receipt section ─────────────────────────────── -->
    <section class="receipt-section" aria-labelledby="receipt-h" ref="receiptSectionRef">
      <div class="section-inner">
        <div class="section-header">
          <p class="label eyebrow">01 / The receipt model</p>
          <h2 id="receipt-h" class="section-headline">EVERY FEE. ON THE RECEIPT.<br />BEFORE ANYTHING MOVES.</h2>
        </div>
        <div class="receipt-demo-wrap">
          <div class="receipt-animated" :class="{ 'receipt-animated--in': receiptVisible }" data-reveal="scale-in">
            <div class="ra-head">
              <div class="ra-brand font-mono">◈ PRODIGY</div>
              <div class="ra-stamp" :class="{ 'ra-stamp--show': receiptVisible }" aria-hidden="true">VERIFIED</div>
            </div>
            <div class="ra-section-label font-mono">TRANSACTION SUMMARY</div>
            <hr class="rule-dashed" style="margin: 0.625rem 0" />
            <div class="ra-rows">
              <div class="ra-row"><span class="muted">Transaction</span><span class="font-mono">TXN-F4A9-2B1C</span></div>
              <div class="ra-row"><span class="muted">You send</span><span>€1,000.00 EUR</span></div>
              <div class="ra-row"><span class="muted">Exchange rate</span><span class="font-mono">1 EUR = 0.000017 BTC</span></div>
            </div>
            <hr class="rule-dashed" style="margin: 0.75rem 0" />
            <div class="ra-section-label font-mono">FEE BREAKDOWN</div>
            <div class="ra-rows">
              <div
                class="ra-row ra-fee"
                :style="{ opacity: receiptVisible ? 1 : 0, transform: receiptVisible ? 'translateX(0)' : 'translateX(-8px)', transitionDelay: '0.25s' }"
              >
                <span class="muted">Platform fee (0.50%)</span><span>−€5.00</span>
              </div>
              <div
                class="ra-row ra-fee"
                :style="{ opacity: receiptVisible ? 1 : 0, transform: receiptVisible ? 'translateX(0)' : 'translateX(-8px)', transitionDelay: '0.45s' }"
              >
                <span class="muted">Partner share (0.20%)</span><span>−€2.00</span>
              </div>
              <div
                class="ra-row ra-fee"
                :style="{ opacity: receiptVisible ? 1 : 0, transform: receiptVisible ? 'translateX(0)' : 'translateX(-8px)', transitionDelay: '0.65s' }"
              >
                <span class="muted">Network fee (variable)</span><span>−€2.40</span>
              </div>
            </div>
            <hr class="rule-eq" style="margin: 0.75rem 0" />
            <div
              class="ra-row ra-total"
              :style="{ opacity: receiptVisible ? 1 : 0, transitionDelay: '0.85s' }"
            >
              <span>You receive</span><span class="iris-text">0.01706 BTC</span>
            </div>
            <hr class="rule-dashed" style="margin: 0.75rem 0" />
            <p class="ra-note font-mono">Fees shown before confirmation. Always. No exceptions.</p>
          </div>

          <div class="receipt-explainer">
            <p class="explainer-intro">
              Most financial products reveal the fee at the precise moment you would most like to not know about it.
              Usually after you have mentally committed to the transaction. We considered that approach and decided
              it was, on balance, worse for everyone involved.
            </p>
            <ul class="explainer-list">
              <li v-for="(point, i) in receiptPoints" :key="i" class="explainer-item">
                <span class="point-n font-mono">{{ String(i + 1).padStart(2, '0') }}</span>
                <span>{{ point }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Fee table ─────────────────────────────────────────────── -->
    <section class="fees-section" aria-labelledby="fees-h">
      <div class="section-inner">
        <div class="section-header">
          <p class="label eyebrow">02 / Fee structure</p>
          <h2 id="fees-h" class="section-headline">THREE COMPONENTS.<br />ALL VISIBLE. NONE HIDDEN.</h2>
        </div>

        <!-- Annual / Monthly toggle -->
        <div class="billing-toggle" role="group" aria-label="Billing period">
          <button
            class="billing-btn"
            :class="{ active: !annual }"
            @click="annual = false"
            :aria-pressed="!annual"
          >Monthly</button>
          <button
            class="billing-btn billing-btn--annual"
            :class="{ active: annual }"
            @click="annual = true"
            :aria-pressed="annual"
          >Annual <span class="save-badge">−20%</span></button>
        </div>
        <p v-if="annual" class="billing-note font-mono">Platform fee billed annually · 20% discount applied</p>
        <div class="fee-grid" data-animate-stagger ref="feeGridRef">
          <article v-for="fee in feeComponents" :key="fee.name" class="fee-card">
            <div class="fee-n font-mono">{{ fee.n }}</div>
            <div class="fee-rate iris-text">{{ fee.rate }}</div>
            <h3 class="fee-name" :data-grad-sweep="fee.n === '01' || undefined">{{ fee.name }}</h3>
            <p class="fee-desc">{{ fee.desc }}</p>
            <div class="fee-detail font-mono">{{ fee.detail }}</div>
          </article>
        </div>
        <div class="fee-footnote">
          <p class="font-mono">
            Total typical fee: <strong>0.70–0.90%</strong> of transaction value.
            Network fees vary with blockchain congestion and are passed through at cost with zero markup.
          </p>
        </div>
      </div>
    </section>

    <!-- ── Comparison vs named competitors ──────────────────────── -->
    <section class="compare-section" aria-labelledby="compare-h">
      <div class="iris-bar iris-stripe" aria-hidden="true" />
      <div class="section-inner">
        <div class="section-header">
          <p class="label eyebrow">03 / Comparison</p>
          <h2 id="compare-h" class="section-headline">PRODIGY VS. THE OTHERS.</h2>
        </div>
        <p class="compare-intro">
          MoonPay and Ramp are good products. They have large teams and real customers.
          They also made specific choices about when to show fees and how to structure them.
          We made different choices. Here is the comparison.
        </p>
        <div class="table-wrap" role="region" aria-label="Fee comparison table" data-reveal="fade-up">
          <table class="compare-table">
            <thead>
              <tr>
                <th scope="col">What you care about</th>
                <th scope="col" class="col-prodigy">◈ Prodigy</th>
                <th scope="col">MoonPay</th>
                <th scope="col">Ramp</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in comparison" :key="row.feature">
                <td class="td-feature">{{ row.feature }}</td>
                <td class="td-prodigy">{{ row.prodigy }}</td>
                <td :class="row.moonpayBad ? 'td-bad' : 'td-ok'">{{ row.moonpay }}</td>
                <td :class="row.rampBad ? 'td-bad' : 'td-ok'">{{ row.ramp }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="compare-note font-mono">
          * Fee percentages are approximate based on public rate cards Q1 2026.
          Actual rates depend on volume tier, payment method, and country.
        </p>
      </div>
    </section>

    <!-- ── Every fee on the receipt ──────────────────────────────── -->
    <section class="model-section" aria-labelledby="model-h">
      <div class="section-inner">
        <div class="section-header">
          <p class="label eyebrow">04 / How it works</p>
          <h2 id="model-h" class="section-headline">THE RECEIPT MODEL,<br />IN PLAIN ENGLISH.</h2>
        </div>
        <div class="model-grid">
          <div v-for="step in modelSteps" :key="step.n" class="model-step">
            <div class="step-n font-mono">{{ step.n }}</div>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-body">{{ step.body }}</p>
          </div>
        </div>
        <div class="model-conclusion">
          <p>
            The receipt is not a compliance feature. It is the product. It is the reason
            users do not abandon the flow at the last step.
          </p>
        </div>
      </div>
    </section>

    <!-- ── Interactive Fee Calculator ──────────────────────────── -->
    <section class="calculator-section" aria-labelledby="calc-new-h" data-reveal="fade-up">
      <div class="section-inner">
        <div class="section-header">
          <p class="label eyebrow">05 / Cost calculator</p>
          <h2 id="calc-new-h" class="section-headline">Calculate your costs</h2>
        </div>
        <div class="calc-inputs">
          <label class="calc-field-label" for="calc-tx-amount">Transaction amount
            <input
              id="calc-tx-amount"
              type="number"
              v-model.number="calcAmount"
              min="0"
              placeholder="1000"
              class="calc-field-input"
              aria-label="Transaction amount"
            />
          </label>
          <label class="calc-field-label" for="calc-pair">Currency pair
            <select id="calc-pair" v-model="calcPair" class="calc-field-input" aria-label="Currency pair">
              <option>EUR → BTC</option>
              <option>EUR → ETH</option>
              <option>EUR → USDT</option>
              <option>USD → BTC</option>
              <option>GBP → BTC</option>
            </select>
          </label>
        </div>
        <div class="calc-output" aria-label="Cost breakdown">
          <div class="calc-row"><span>Platform fee (0.03%)</span><span>€{{ platformFee.toFixed(2) }}</span></div>
          <div class="calc-row"><span>Network fee (est.)</span><span>€1.20</span></div>
          <div class="calc-row calc-total"><span>You receive</span><span>€{{ youReceive.toFixed(2) }}</span></div>
        </div>
      </div>
    </section>

    <!-- ── Revenue Calculator ──────────────────────────────────── -->
    <section class="revenue-section" aria-labelledby="revenue-h">
      <div class="section-inner">
        <div class="section-header">
          <p class="label eyebrow">06 / Revenue sharing</p>
          <h2 id="revenue-h" class="section-headline">Revenue sharing</h2>
        </div>
        <label class="calc-field-label revenue-field-label" for="partner-volume">Your monthly volume
          <input
            id="partner-volume"
            type="number"
            v-model.number="partnerVolume"
            min="0"
            placeholder="100000"
            class="calc-field-input"
            aria-label="Monthly volume in euros"
          />
        </label>
        <div class="revenue-output" aria-label="Revenue projection">
          <div class="revenue-row">Your commission rate: <strong>10%</strong></div>
          <div class="revenue-row">Monthly revenue: <strong>€{{ (partnerVolume * 0.10).toLocaleString() }}</strong></div>
          <div class="revenue-row">Annual revenue: <strong>€{{ (partnerVolume * 0.10 * 12).toLocaleString() }}</strong></div>
        </div>
      </div>
    </section>

    <!-- ── Volume Graph ──────────────────────────────────────────── -->
    <section class="volgraph-section" aria-labelledby="volgraph-h" data-reveal="fade-up">
      <div class="section-inner">
        <p class="label eyebrow">PARTNER REVENUE AT SCALE</p>
        <h2 id="volgraph-h" class="section-headline">THE MORE YOU PROCESS,<br />THE MORE YOU EARN.</h2>
        <p class="section-sub" style="color:var(--ink-mid);font-size:1rem;line-height:1.6;margin:0.5rem 0 2.5rem;">Estimated monthly partner revenue by volume tier</p>
        <div class="volgraph-wrap">
          <svg ref="volGraphRef" viewBox="0 0 280 120" fill="none" xmlns="http://www.w3.org/2000/svg"
               width="100%" preserveAspectRatio="xMidYMid meet"
               aria-hidden="true" role="img" class="volgraph-svg">
            <!-- Revenue labels above bars -->
            <text x="21" y="12" text-anchor="middle" font-size="8" fill="#34d399" font-family="Space Mono, monospace">€10</text>
            <text x="77" y="12" text-anchor="middle" font-size="8" fill="#34d399" font-family="Space Mono, monospace">€37</text>
            <text x="133" y="12" text-anchor="middle" font-size="8" fill="#34d399" font-family="Space Mono, monospace">€125</text>
            <text x="189" y="12" text-anchor="middle" font-size="8" fill="#34d399" font-family="Space Mono, monospace">€312</text>
            <text x="245" y="12" text-anchor="middle" font-size="8" fill="#34d399" font-family="Space Mono, monospace">€625</text>
            <!-- Bars (heights: 20%→18, 35%→31.5, 55%→49.5, 75%→67.5, 100%→90, axis at y=105) -->
            <rect class="vol-bar" x="6" y="87" width="30" height="18" ry="3" fill="rgba(52,211,153,0.7)" />
            <rect class="vol-bar" x="62" y="73.5" width="30" height="31.5" ry="3" fill="rgba(52,211,153,0.7)" />
            <rect class="vol-bar" x="118" y="55.5" width="30" height="49.5" ry="3" fill="rgba(52,211,153,0.7)" />
            <rect class="vol-bar" x="174" y="37.5" width="30" height="67.5" ry="3" fill="rgba(52,211,153,0.7)" />
            <rect class="vol-bar" x="230" y="15" width="30" height="90" ry="3" fill="rgba(52,211,153,0.7)" />
            <!-- X-axis line -->
            <line x1="0" y1="106" x2="280" y2="106" stroke="#e5e7eb" stroke-width="1" />
            <!-- X-axis labels -->
            <text x="21" y="116" text-anchor="middle" font-size="8" fill="#6b7280" font-family="Space Mono, monospace">€10k</text>
            <text x="77" y="116" text-anchor="middle" font-size="8" fill="#6b7280" font-family="Space Mono, monospace">€50k</text>
            <text x="133" y="116" text-anchor="middle" font-size="8" fill="#6b7280" font-family="Space Mono, monospace">€200k</text>
            <text x="189" y="116" text-anchor="middle" font-size="8" fill="#6b7280" font-family="Space Mono, monospace">€500k</text>
            <text x="245" y="116" text-anchor="middle" font-size="8" fill="#6b7280" font-family="Space Mono, monospace">€1M+</text>
          </svg>
        </div>
      </div>
    </section>

    <!-- ── Build vs Buy ──────────────────────────────────────────── -->
    <section class="bvb-section" aria-labelledby="bvb-pricing-h">
      <div class="section-inner">
        <p class="label eyebrow" data-reveal="fade-up">BUILD VS BUY</p>
        <h2 id="bvb-pricing-h" class="section-headline" data-reveal="fade-up">THE REAL COST OF BUILDING YOUR OWN ON-RAMP.</h2>
        <div class="bvb-wrap" data-reveal="fade-up">
          <table class="bvb-table" aria-label="Build vs buy: real cost comparison">
            <thead>
              <tr>
                <th class="bvb-th bvb-th--feature"></th>
                <th class="bvb-th bvb-th--inhouse">In-house</th>
                <th class="bvb-th bvb-th--prodigy">Prodigy</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="bvb-td bvb-td--feature">Time to deploy</td>
                <td class="bvb-td bvb-td--inhouse">6–18 months</td>
                <td class="bvb-td bvb-td--prodigy">1 afternoon</td>
              </tr>
              <tr>
                <td class="bvb-td bvb-td--feature">Compliance overhead</td>
                <td class="bvb-td bvb-td--inhouse">Ongoing, high</td>
                <td class="bvb-td bvb-td--prodigy">Zero</td>
              </tr>
              <tr>
                <td class="bvb-td bvb-td--feature">Maintenance</td>
                <td class="bvb-td bvb-td--inhouse">Dedicated team</td>
                <td class="bvb-td bvb-td--prodigy">Included</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ── FAQ ──────────────────────────────────────────────────── -->
    <section class="faq-section" aria-labelledby="faq-h">
      <div class="section-inner">
        <p class="label eyebrow" data-reveal="fade-up">FAQ</p>
        <h2 id="faq-h" class="section-headline" data-reveal="fade-up">FREQUENTLY ASKED QUESTIONS</h2>
        <div class="faq-list">
          <details class="faq-item">
            <summary class="faq-q">Are there setup fees?</summary>
            <p class="faq-a">No. You pay per successful transaction only.</p>
          </details>
          <details class="faq-item">
            <summary class="faq-q">What if my volume exceeds my tier?</summary>
            <p class="faq-a">Automatically rates to the next tier; no service interruption.</p>
          </details>
          <details class="faq-item">
            <summary class="faq-q">Is KYC included?</summary>
            <p class="faq-a">Yes. KYC checks are bundled — never billed separately.</p>
          </details>
          <details class="faq-item">
            <summary class="faq-q">What contract terms are available?</summary>
            <p class="faq-a">Monthly on Starter and Growth. Annual on Enterprise.</p>
          </details>
          <details class="faq-item">
            <summary class="faq-q">Can I test before committing?</summary>
            <p class="faq-a">Yes. Full sandbox, no payment required.</p>
          </details>
        </div>
      </div>
    </section>

    <!-- ── Compliance Add-ons ─────────────────────────────────── -->
    <section class="addons-section" aria-labelledby="addons-h">
      <div class="section-inner">
        <p class="label eyebrow" data-reveal="fade-up">ENTERPRISE</p>
        <h2 id="addons-h" class="section-headline" data-reveal="fade-up">ENTERPRISE ADD-ONS</h2>
        <div class="addons-callout" data-reveal="fade-up">
          <p class="addons-body">
            <strong>ENTERPRISE ADD-ONS:</strong> Enhanced KYC (PEP/adverse media) · Dedicated compliance manager · Custom data residency (EU/US/APAC) · Audit report access.
          </p>
        </div>
      </div>
    </section>

    <!-- ── CTA ───────────────────────────────────────────────────── -->
    <section class="cta-dark" aria-labelledby="cta-h">
      <div class="cta-iris-bar iris-stripe" aria-hidden="true" />
      <div class="section-inner cta-inner">
        <div class="cta-content">
          <p class="label" style="color:rgba(255,255,255,0.65)">See it in action</p>
          <h2 id="cta-h" class="cta-headline">SEE THE LIVE RECEIPT.</h2>
          <p class="cta-micro">Real transaction. Real fee breakdown. No surprises. No wallet required.</p>
        </div>
        <div class="cta-actions">
          <a href="http://localhost:5005" target="_blank" rel="noopener noreferrer" class="cta-btn cta-btn--primary">Open the widget →</a>
          <RouterLink to="/swiss/partners" class="cta-btn cta-btn--secondary">Partner pricing</RouterLink>
          <RouterLink to="/swiss/product" class="cta-btn cta-btn--secondary">All features</RouterLink>
        </div>
        <div class="cta-stub font-mono" aria-hidden="true">
          <div class="stub-row"><span class="muted">Platform fee</span><span>0.50–1.50%</span></div>
          <div class="stub-row"><span class="muted">Partner share</span><span>10–20% configurable</span></div>
          <div class="stub-row"><span class="muted">Network fee</span><span>at cost, no markup</span></div>
          <div class="stub-row"><span class="muted">Hidden fees</span><span>No</span></div>
          <div class="stub-row"><span class="muted">Shown when</span><span>Before confirmation</span></div>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useCardTiltAll } from '@/composables/useCardTilt'

// ── Volume bar chart IntersectionObserver ─────────────────────
const volGraphRef = ref<SVGSVGElement | null>(null)

// ── Annual / Monthly toggle ───────────────────────────────────
const annual = ref(false)
const multiplier = computed(() => annual.value ? 0.8 : 1)

// ── Live clock ─────────────────────────────────────────────────
const timestamp = ref('')
let timer: ReturnType<typeof setInterval>

function updateTimestamp() {
  const now = new Date()
  timestamp.value = now.toISOString().replace('T', ' ').slice(0, 19) + ' UTC'
}

// ── Card tilt on fee cards ────────────────────────────────────
const feeGridRef = ref<HTMLElement | null>(null)
useCardTiltAll(feeGridRef, '.fee-card', { maxTilt: 4, scale: 1.02, glowColor: '#34d399', glowIntensity: 0.12 })

// ── Scroll reveal for receipt animation ───────────────────────
const receiptSectionRef = ref<HTMLElement | null>(null)
const receiptVisible = ref(false)

onMounted(() => {
  updateTimestamp()
  timer = setInterval(updateTimestamp, 1000)

  // Volume bar chart animation
  if (volGraphRef.value) {
    const barObs = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        volGraphRef.value?.classList.add('bar-animate')
        barObs.disconnect()
      }
    }, { threshold: 0.3 })
    barObs.observe(volGraphRef.value)
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (entry?.isIntersecting) {
        receiptVisible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.25 }
  )
  if (receiptSectionRef.value) observer.observe(receiptSectionRef.value)
})

onUnmounted(() => clearInterval(timer))

// ── Interactive fee calculator ────────────────────────────────
const calcAmount = ref(1000)
const calcPair = ref('EUR → BTC')
const platformFee = computed(() => calcAmount.value * 0.0003)
const youReceive = computed(() => Math.max(0, calcAmount.value - platformFee.value - 1.20))

// ── Revenue calculator ────────────────────────────────────────
const partnerVolume = ref(100000)

const receiptPoints = [
  'The receipt appears the moment you enter an amount. No button press required.',
  'All three fee components are shown separately — platform, partner, and network.',
  'Network fees are passed through at cost with no markup and no rounding.',
  'The breakdown is the same data your admin team sees in the back office.',
  'If the fee changes due to network congestion, the receipt updates in real time.',
]

const feeComponents = [
  {
    n: '01',
    rate: '0.50–1.50%',
    name: 'Platform fee',
    desc: 'Covers KYC processing, risk scoring, ledger operations, fraud monitoring, and the infrastructure that keeps it running at 3 a.m. on a Sunday.',
    detail: 'Fixed rate per volume tier. No surprises at month-end.',
  },
  {
    n: '02',
    rate: '10–20% of platform fee',
    name: 'Partner commission',
    desc: 'Your share, posted to your revenue account in real time. Configurable per product line. You set the rate in the admin console. No spreadsheets. No monthly statements to argue about.',
    detail: 'Accrues per transaction. Settled T+1.',
  },
  {
    n: '03',
    rate: 'Variable (at cost)',
    name: 'Network fee',
    desc: 'The actual blockchain fee, passed through at exactly what the network charges. We do not mark it up, round it, or average across transactions. You pay what the network charges. Full stop.',
    detail: 'Varies with blockchain congestion. Displayed live.',
  },
]

const comparison = [
  {
    feature: 'Fee shown before confirmation',
    prodigy: '✓ Always, upfront',
    moonpay: '✗ Final step only',
    ramp: '~ Sometimes',
    moonpayBad: true,
    rampBad: false,
  },
  {
    feature: 'Fee components itemised',
    prodigy: '✓ All three, always',
    moonpay: '✗ Blended rate',
    ramp: '✗ Blended rate',
    moonpayBad: true,
    rampBad: true,
  },
  {
    feature: 'Network fee markup',
    prodigy: '✓ Zero markup',
    moonpay: '✗ Marked up',
    ramp: '✗ Marked up',
    moonpayBad: true,
    rampBad: true,
  },
  {
    feature: 'Partner revenue share',
    prodigy: '✓ Configurable %',
    moonpay: '~ Fixed tiers',
    ramp: '~ Fixed tiers',
    moonpayBad: false,
    rampBad: false,
  },
  {
    feature: 'Platform fee range',
    prodigy: '0.50–1.50%',
    moonpay: '1.00–4.50%*',
    ramp: '0.99–2.90%*',
    moonpayBad: false,
    rampBad: false,
  },
  {
    feature: 'KYC included in widget',
    prodigy: '✓ Built in',
    moonpay: '✓ Built in',
    ramp: '✓ Built in',
    moonpayBad: false,
    rampBad: false,
  },
  {
    feature: 'Admin fee visibility',
    prodigy: '✓ Full ledger access',
    moonpay: '✗ Reports only',
    ramp: '✗ Reports only',
    moonpayBad: true,
    rampBad: true,
  },
  {
    feature: 'Sandbox / public demo',
    prodigy: '✓ No signup needed',
    moonpay: '✗ Sales call required',
    ramp: '✗ Sales call required',
    moonpayBad: true,
    rampBad: true,
  },
]

const modelSteps = [
  {
    n: '01',
    title: 'User enters an amount',
    body: 'The widget immediately calculates the full fee breakdown — platform, partner, network — and displays it as a receipt. Not an estimate. The actual fee.',
  },
  {
    n: '02',
    title: 'Receipt appears before any action',
    body: 'The user sees three numbers: what they are sending, what the fees are (broken down), and what they will receive. This happens before they press anything. Like a restaurant that tells you the price before you sit down.',
  },
  {
    n: '03',
    title: 'User confirms',
    body: 'If the user confirms, the receipt is locked. The fee that was shown is the fee that is charged. No last-minute adjustments. No "rate has changed, please try again." The receipt is a contract.',
  },
  {
    n: '04',
    title: 'Receipt posted to ledger',
    body: 'The admin team, the compliance team, and the partner dashboard all show the same receipt. One version of what happened. No reconciliation. The ledger is always correct.',
  },
]
</script>

<style scoped>
/* ── Layout ── */
.section-inner { max-width: 1440px; margin: 0 auto; padding: 5rem 1.5rem; }

/* ── Hero ── */
.hero { border-bottom: 1px solid var(--ink); }
.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1440px;
  margin: 0 auto;
  min-height: calc(100vh - 3.25rem);
}
.hero-left {
  padding: 3.5rem 3rem 3.5rem 1.5rem;
  border-right: 1px solid var(--ink);
  display: flex; flex-direction: column;
  justify-content: center; gap: 1.5rem;
}
.eyebrow { margin: 0; }
.headline { display: flex; flex-direction: column; margin: 0; }
.line {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(4.5rem, 10vw, 9rem);
  font-weight: 900; line-height: 0.92;
  letter-spacing: -0.02em; text-transform: uppercase;
}
.sub { font-size: 1.0625rem; line-height: 1.65; color: var(--ink-mid); max-width: 36ch; margin: 0; }
.ctas { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }
.cta-primary {
  font-family: 'Space Mono', monospace; font-size: 0.8125rem;
  font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
  color: var(--paper); background: var(--ink);
  text-decoration: none; padding: 0.875rem 1.75rem;
  border: 1.5px solid var(--ink); transition: background 0.15s, color 0.15s;
}
.cta-primary:hover { background: var(--paper); color: var(--ink); }
.cta-secondary {
  font-family: 'Space Mono', monospace; font-size: 0.75rem;
  letter-spacing: 0.06em; text-transform: uppercase;
  color: var(--ink-mid); text-decoration: none;
  border-bottom: 1px solid var(--ink-mid); padding-bottom: 1px;
}
.cta-secondary:hover { color: var(--ink); border-color: var(--ink); }

.hero-right {
  padding: 3rem 1.5rem 3rem 3rem;
  display: flex; flex-direction: column;
  justify-content: center; gap: 1rem;
  background: #fafafa; position: relative; overflow: hidden;
}
.grid-dots {
  position: absolute; inset: 0;
  background-image: radial-gradient(circle, var(--line) 1px, transparent 1px);
  background-size: 24px 24px; opacity: 0.3; pointer-events: none;
}
.receipt-card {
  background: var(--paper); border: 1.5px solid var(--ink);
  padding: 1.375rem; max-width: 380px; position: relative; z-index: 1;
  font-family: 'Space Mono', monospace; font-size: 0.8125rem;
}
.receipt-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
.receipt-brand { font-weight: 700; letter-spacing: 0.04em; font-size: 0.8125rem; }
.rule-dashed { border: none; border-top: 1px dashed var(--line); margin: 0.625rem 0; }
.rule-eq { border: none; border-top: 2px solid var(--ink); margin: 0.625rem 0; }
.receipt-rows { display: flex; flex-direction: column; gap: 0.3rem; }
.receipt-row { display: flex; justify-content: space-between; }
.receipt-row.fee { font-size: 0.75rem; }
.receipt-row.total { font-weight: 700; margin: 0.25rem 0; font-size: 0.875rem; }
.muted { color: var(--ink-muted); }
.receipt-stamp-row { display: flex; justify-content: space-between; align-items: center; margin-top: 0.875rem; padding-top: 0.75rem; border-top: 1px solid var(--line); }
.stamp-approved { font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.1em; color: #1a7a3c; border: 2px solid #1a7a3c; padding: 0.1em 0.35em; }
.timestamp { font-size: 0.6875rem; color: var(--ink-muted); }

/* ── Receipt section ── */
.receipt-section { border-bottom: 1px solid var(--ink); background: var(--paper); }
.section-header { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 3rem; }
.section-headline {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(2rem, 4.5vw, 3.75rem); font-weight: 900;
  line-height: 1; letter-spacing: -0.02em; text-transform: uppercase;
  max-width: 28ch; margin: 0;
}
.receipt-demo-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }

/* Animated receipt mockup */
.receipt-animated {
  background: #fafafa; border: 1px solid var(--line);
  padding: 1.5rem; font-family: 'Space Mono', monospace; font-size: 0.8125rem;
  opacity: 0; transform: translateY(14px);
  transition: opacity 0.55s ease, transform 0.55s ease;
}
.receipt-animated--in { opacity: 1; transform: translateY(0); }
.ra-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
.ra-brand { font-weight: 700; letter-spacing: 0.08em; font-size: 0.875rem; }
.ra-section-label { font-size: 0.6875rem; letter-spacing: 0.14em; color: var(--ink-muted); text-transform: uppercase; margin-bottom: 0.5rem; }
.ra-rows { display: flex; flex-direction: column; gap: 0.25rem; }
.ra-row { display: flex; justify-content: space-between; padding: 0.25rem 0; border-bottom: 1px solid var(--ink-faint); font-size: 0.75rem; }
.ra-fee { transition: opacity 0.4s ease, transform 0.4s ease; }
.ra-total { display: flex; justify-content: space-between; font-weight: 700; font-size: 0.875rem; transition: opacity 0.4s ease; }
.ra-stamp {
  font-family: 'Barlow Condensed', sans-serif; font-size: 1rem; font-weight: 900;
  letter-spacing: 0.15em; border: 2px solid var(--ink); padding: 0.15em 0.5em;
  transform: rotate(-12deg) scale(0); opacity: 0;
  transition: transform 0.4s cubic-bezier(0.36,0.07,0.19,0.97) 1.1s, opacity 0.25s ease 1.1s;
}
.ra-stamp--show { transform: rotate(-12deg) scale(1); opacity: 1; }
.ra-note { font-size: 0.6875rem; letter-spacing: 0.04em; color: var(--ink-muted); margin: 0.75rem 0 0; }

.receipt-explainer { display: flex; flex-direction: column; gap: 1.5rem; }
.explainer-intro { font-size: 1.0625rem; line-height: 1.65; color: var(--ink-mid); margin: 0; }
.explainer-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
.explainer-item { display: flex; align-items: baseline; gap: 1rem; padding: 0.875rem 0; border-bottom: 1px solid var(--line); font-size: 0.9375rem; line-height: 1.5; }
.explainer-item:first-child { border-top: 1px solid var(--line); }
.point-n { font-size: 0.8125rem; color: var(--ink-muted); flex-shrink: 0; width: 1.5rem; }

/* ── Fee grid ── */
.fees-section { border-bottom: 1px solid var(--ink); background: #fafafa; }
.fee-grid { display: grid; grid-template-columns: repeat(3, 1fr); border: 1px solid var(--ink); }
.fee-card {
  padding: 2rem 1.75rem; border-right: 1px solid var(--line);
  display: flex; flex-direction: column; gap: 0.75rem;
  transition: background 0.18s;
}
.fee-card:hover { background: #f0f0f0; }
.fee-card:last-child { border-right: none; }
.fee-n { font-size: 0.75rem; letter-spacing: 0.12em; color: var(--ink-muted); }
.fee-rate {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(1.5rem, 3vw, 2.5rem); font-weight: 900;
  line-height: 1; letter-spacing: -0.01em;
}
.fee-name {
  font-family: 'Barlow Condensed', sans-serif; font-size: 1.125rem;
  font-weight: 700; text-transform: uppercase; letter-spacing: -0.01em; margin: 0;
}
.fee-desc { font-size: 0.875rem; line-height: 1.6; color: var(--ink-mid); margin: 0; }
.fee-detail { font-size: 0.6875rem; letter-spacing: 0.08em; color: var(--ink-muted); }
.fee-footnote { border-top: 1px solid var(--line); padding-top: 1.5rem; margin-top: 2.5rem; }
.fee-footnote p { font-size: 0.875rem; color: var(--ink-mid); margin: 0; line-height: 1.6; }

/* ── Comparison ── */
.compare-section { border-bottom: 1px solid var(--ink); background: var(--paper); }
.iris-bar { height: 4px; background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe, #667eea); background-size: 200% auto; }
.compare-intro { font-size: 1.0625rem; line-height: 1.65; color: var(--ink-mid); max-width: 52ch; margin: 0 0 2.5rem; }
.table-wrap { overflow-x: auto; border: 1px solid var(--ink); }
.compare-table { width: 100%; border-collapse: collapse; font-family: 'Space Mono', monospace; font-size: 0.8125rem; }
.compare-table th {
  padding: 0.875rem 1.25rem; text-align: left;
  font-size: 0.6875rem; letter-spacing: 0.12em; text-transform: uppercase;
  border-bottom: 2px solid var(--ink); background: #fafafa; font-weight: 700;
}
.col-prodigy { background: var(--ink) !important; color: var(--paper) !important; }
.compare-table td { padding: 0.75rem 1.25rem; border-bottom: 1px solid var(--line); font-size: 0.75rem; }
.compare-table tr:last-child td { border-bottom: none; }
.compare-table tr:hover td { background: #fafafa; }
.td-feature { color: var(--ink-mid); }
.td-prodigy { color: var(--ink); font-weight: 700; background: rgba(0,0,0,0.02); }
.td-bad { color: #c44; }
.td-ok { color: var(--ink-mid); }
.compare-note { font-size: 0.6875rem; letter-spacing: 0.04em; color: var(--ink-muted); margin: 1.25rem 0 0; }

/* ── Model section ── */
.model-section { border-bottom: 1px solid var(--ink); background: #fafafa; }
.model-grid { display: grid; grid-template-columns: repeat(4, 1fr); border: 1px solid var(--line); margin-bottom: 2.5rem; }
.model-step {
  padding: 1.75rem 1.5rem; border-right: 1px solid var(--line);
  display: flex; flex-direction: column; gap: 0.75rem;
}
.model-step:last-child { border-right: none; }
.step-n { font-family: 'Space Mono', monospace; font-size: 0.75rem; letter-spacing: 0.12em; color: var(--ink-muted); }
.step-title { font-family: 'Barlow Condensed', sans-serif; font-size: 1.0625rem; font-weight: 700; text-transform: uppercase; letter-spacing: -0.01em; margin: 0; }
.step-body { font-size: 0.875rem; line-height: 1.6; color: var(--ink-mid); margin: 0; }
.model-conclusion { border-top: 2px solid var(--ink); padding-top: 1.5rem; }
.model-conclusion p { font-family: 'Barlow Condensed', sans-serif; font-size: clamp(1.5rem, 3vw, 2.5rem); font-weight: 900; text-transform: uppercase; letter-spacing: -0.02em; line-height: 1; margin: 0; }

/* ── CTA dark ── */
.cta-dark { background: var(--ink); color: var(--paper); }
.cta-iris-bar { height: 4px; background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe, #667eea); background-size: 200% auto; animation: iris-shift 5s linear infinite; will-change: background-position; }
@keyframes iris-shift { 0% { background-position: 0% center; } 100% { background-position: -200% center; } }
.cta-inner { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 4rem; align-items: center; }
.cta-content { display: flex; flex-direction: column; gap: 1.25rem; }
.cta-headline { font-family: 'Barlow Condensed', sans-serif; font-size: clamp(2.5rem, 5vw, 4.5rem); font-weight: 900; line-height: 0.95; letter-spacing: -0.02em; text-transform: uppercase; margin: 0; }
.cta-micro { font-family: 'Space Mono', monospace; font-size: 0.75rem; letter-spacing: 0.06em; color: rgba(255,255,255,0.7); margin: 0; }
.cta-actions { display: flex; flex-direction: column; gap: 0.875rem; }
.cta-btn { display: block; font-family: 'Space Mono', monospace; font-size: 0.8125rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none; padding: 0.875rem 1.5rem; text-align: center; border: 1.5px solid var(--paper); transition: background 0.15s, color 0.15s; }
.cta-btn--primary { background: var(--paper); color: var(--ink); }
.cta-btn--primary:hover { background: transparent; color: var(--paper); }
.cta-btn--secondary { background: transparent; color: rgba(255,255,255,0.85); border-color: rgba(255,255,255,0.4); }
.cta-btn--secondary:hover { border-color: var(--paper); color: var(--paper); }
.cta-stub { border: 1px solid rgba(255,255,255,0.15); padding: 1rem; font-size: 0.75rem; display: flex; flex-direction: column; }
.stub-row { display: flex; justify-content: space-between; padding: 0.4rem 0; border-bottom: 1px solid rgba(255,255,255,0.08); }
.stub-row:last-child { border-bottom: none; }
.stub-row .muted { color: rgba(255,255,255,0.62); }

/* ── Stat chips ── */
.stat-chips { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 0.5rem; }
.stat-chip {
  display: flex; flex-direction: column; gap: 0.2rem;
  border: 1px solid var(--line); padding: 0.625rem 1rem;
  background: var(--paper);
  opacity: 0;
  animation: pop-in 0.4s ease forwards;
}
.stat-chip:nth-child(1) { animation-delay: 0.1s; }
.stat-chip:nth-child(2) { animation-delay: 0.2s; }
.stat-chip:nth-child(3) { animation-delay: 0.3s; }
.stat-chip:nth-child(4) { animation-delay: 0.4s; }
.stat-val {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.5rem; font-weight: 900;
  line-height: 1; letter-spacing: -0.01em;
}
.stat-lbl {
  font-family: 'Space Mono', monospace;
  font-size: 0.625rem; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--ink-muted);
}
@keyframes pop-in { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }

/* ── Utilities ── */
.font-mono { font-family: 'Space Mono', monospace; }
.label { font-family: 'Space Mono', monospace; font-size: 0.8125rem; font-weight: 400; letter-spacing: 0.15em; text-transform: uppercase; color: var(--ink-mid); }
.iris-text {
  background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe, #667eea);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: iris-shift 5s linear infinite;
}
.iris-stripe { animation: iris-shift 5s linear infinite; }

/* ── Interactive Fee Calculator ── */
.calculator-section { border-bottom: 1px solid var(--ink); background: var(--paper); }
.calc-inputs {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}
.calc-field-label {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-mid);
  flex: 1;
  min-width: 200px;
}
.calc-field-input {
  font-family: 'Space Mono', monospace;
  font-size: 0.875rem;
  color: var(--ink);
  background: var(--paper);
  border: 1px solid var(--line);
  padding: 0.5rem 0.75rem;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.15s;
}
.calc-field-input:focus { border-color: var(--ink); }
.calc-output {
  max-width: 520px;
  border: 1px solid var(--line);
  background: #fafafa;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0;
  font-family: 'Space Mono', monospace;
  font-size: 0.8125rem;
}
.calc-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--line);
  color: var(--ink-mid);
}
.calc-row:last-child { border-bottom: none; }
.calc-total {
  font-weight: 700;
  color: var(--ink);
  padding-top: 0.75rem;
  margin-top: 0.25rem;
  border-top: 2px solid var(--ink);
  border-bottom: none;
}

/* ── Revenue Calculator ── */
.revenue-section { border-bottom: 1px solid var(--ink); background: #fafafa; }
.revenue-field-label {
  max-width: 360px;
  margin-bottom: 2rem;
}
.revenue-output {
  max-width: 400px;
  border: 1px solid var(--line);
  background: var(--paper);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0;
  font-family: 'Space Mono', monospace;
  font-size: 0.875rem;
}
.revenue-row {
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--line);
  color: var(--ink-mid);
}
.revenue-row:last-child { border-bottom: none; }
.revenue-row strong { color: var(--ink); }

/* ── Responsive ── */
@media (max-width: 1024px) {
  .model-grid { grid-template-columns: repeat(2, 1fr); }
  .model-step:nth-child(2n) { border-right: none; }
  .model-step { border-bottom: 1px solid var(--line); }
  .model-step:last-child { border-bottom: none; }
}
@media (max-width: 900px) {
  .hero-inner { grid-template-columns: 1fr; min-height: auto; }
  .hero-left { border-right: none; border-bottom: 1px solid var(--ink); padding: 3rem 1.5rem; }
  .hero-right { padding: 2.5rem 1.5rem; align-items: center; }
  .receipt-demo-wrap { grid-template-columns: 1fr; }
  .fee-grid { grid-template-columns: 1fr; }
  .fee-card { border-right: none; border-bottom: 1px solid var(--line); }
  .fee-card:last-child { border-bottom: none; }
  .cta-inner { grid-template-columns: 1fr; gap: 2.5rem; }
}

@media (prefers-reduced-motion: reduce) {
  .cta-iris-bar, .iris-stripe { animation: none; }
  .receipt-animated { transition: none; }
  .ra-fee, .ra-total, .ra-stamp { transition: none; }
  .stat-chip { animation: none; opacity: 1; }
}

/* ── New: Build vs Buy ── */
.bvb-section { border-bottom: 1px solid var(--ink); background: #fafafa; }
.bvb-wrap { overflow-x: auto; margin-top: 2.5rem; }
.bvb-table { width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb; }
.bvb-th {
  font-family: 'Space Mono', monospace; font-size: 0.75rem;
  letter-spacing: 0.1em; text-transform: uppercase;
  padding: 0.875rem 1.25rem; text-align: left;
  border: 1px solid #e5e7eb; background: #fff;
}
.bvb-th--inhouse { color: #ef4444; }
.bvb-th--prodigy { color: #34d399; }
.bvb-td {
  padding: 0.875rem 1.25rem; border: 1px solid #e5e7eb;
  font-family: 'Space Mono', monospace; font-size: 0.8125rem; line-height: 1.5;
}
.bvb-td--feature {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.01em; color: var(--ink);
}
.bvb-td--inhouse { color: #ef4444; }
.bvb-td--prodigy { color: #34d399; font-weight: 700; }

/* ── New: FAQ ── */
.faq-section { border-bottom: 1px solid var(--ink); background: var(--paper); }
.faq-list { margin-top: 2.5rem; display: flex; flex-direction: column; }
.faq-item {
  border: 1px solid #e5e7eb;
  border-bottom: none;
  font-family: 'Space Mono', monospace;
}
.faq-item:last-child { border-bottom: 1px solid #e5e7eb; }
.faq-item[open] { background: #fafafa; }
.faq-q {
  list-style: none;
  padding: 1.125rem 1.5rem;
  font-size: 0.875rem; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;
  cursor: pointer; display: flex; align-items: center; gap: 1rem;
  color: var(--ink); user-select: none;
}
.faq-q::-webkit-details-marker { display: none; }
.faq-q::before {
  content: '+';
  font-family: 'Space Mono', monospace; font-size: 1rem; font-weight: 400;
  color: var(--ink-muted); flex-shrink: 0; width: 1rem; text-align: center;
  transition: transform 0.15s;
}
.faq-item[open] .faq-q::before { content: '−'; }
.faq-a {
  padding: 0 1.5rem 1.125rem 3rem;
  font-size: 0.8125rem; line-height: 1.7; color: var(--ink-mid); margin: 0;
}

/* ── New: Compliance Add-ons ── */
.addons-section { border-bottom: 1px solid var(--ink); background: #fafafa; }
.addons-callout {
  margin-top: 2.5rem;
  border: 1px solid #e5e7eb;
  border-left: 4px solid #f59e0b;
  padding: 1.5rem 2rem;
  background: #fff;
}
.addons-body {
  font-family: 'Space Mono', monospace;
  font-size: 0.875rem; line-height: 1.75; color: var(--ink-mid); margin: 0;
}
.addons-body strong { color: var(--ink); letter-spacing: 0.06em; }

/* ── Volume Graph SVG ── */
.volgraph-section { border-bottom: 1px solid var(--ink); background: #fafafa; }
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

/* ── Billing toggle ── */
.billing-toggle {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  align-items: center;
}
.billing-btn {
  font-family: 'Space Mono', monospace;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  padding: 0.5rem 1.25rem;
  border: 1.5px solid var(--ink);
  background: transparent;
  color: var(--ink-mid);
  cursor: pointer;
  border-radius: 99px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.15s, color 0.15s;
}
.billing-btn.active {
  background: var(--ink);
  color: var(--paper);
}
.billing-btn:hover:not(.active) { background: rgba(0,0,0,0.05); }
.save-badge {
  background: #22c55e;
  color: #fff;
  font-size: 0.75rem;
  padding: 0.1rem 0.45rem;
  border-radius: 99px;
}
.billing-note {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: #22c55e;
  letter-spacing: 0.04em;
  margin: -0.75rem 0 1.25rem;
}
</style>
