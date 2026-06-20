<template>
  <div class="pricing">

    <!-- ── Section 1: Hero ──────────────────────────────────────── -->
    <section class="pricing-hero" aria-label="Pricing overview">
      <div class="grid-dots" aria-hidden="true"></div>
      <div class="hero-inner">
        <p class="eyebrow">TRANSPARENT BY DEFAULT</p>
        <h1 class="headline">TRANSPARENT FEES.<br />WHAT A CONCEPT.</h1>
        <p class="hero-sub">
          Every number visible before anyone presses anything.
          That's not a feature. That's basic respect.
        </p>
        <div class="cp-ticker-wrap" aria-hidden="true">
          <div class="cp-ticker-track">
            <span class="cp-tick">BTC/EUR <em>€58,234</em></span>
            <span class="cp-tick cp-tick--up">ETH/EUR <em>€3,102</em> ▲</span>
            <span class="cp-tick">BTC/GBP <em>£49,801</em></span>
            <span class="cp-tick cp-tick--down">SOL/EUR <em>€142.50</em> ▼</span>
            <span class="cp-tick">LTC/EUR <em>€72.40</em></span>
            <span class="cp-tick cp-tick--up">XRP/EUR <em>€0.52</em> ▲</span>
            <!-- duplicate for seamless loop -->
            <span class="cp-tick">BTC/EUR <em>€58,234</em></span>
            <span class="cp-tick cp-tick--up">ETH/EUR <em>€3,102</em> ▲</span>
            <span class="cp-tick">BTC/GBP <em>£49,801</em></span>
            <span class="cp-tick cp-tick--down">SOL/EUR <em>€142.50</em> ▼</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Section 2: Animated receipt + fee simulator ──────────── -->
    <section class="receipt-section" aria-label="Live fee receipt">
      <div class="section-inner">
        <div class="receipt-layout">
          <!-- Receipt card -->
          <div class="receipt-wrap">
            <div class="receipt-paper" :class="{ revealed: receiptRevealed }" ref="receiptEl">
              <div class="receipt-top">
                <div class="receipt-brand">
                  <span class="brand-mark" aria-hidden="true">◈</span>
                  <span class="brand-name">PRODIGY</span>
                </div>
                <div class="receipt-title">FEE RECEIPT</div>
                <div class="receipt-timestamp">
                  <span class="ts-label">Transaction</span>
                  <span class="ts-val font-mono">TXN-{{ txnId }}</span>
                </div>
              </div>

              <div class="receipt-body">
                <div class="receipt-line">
                  <span class="line-label">You send</span>
                  <span class="line-val">{{ displaySend.toFixed(2) }}&nbsp;EUR</span>
                </div>
                <div class="receipt-line">
                  <span class="line-label">Exchange rate</span>
                  <span class="line-val font-mono">1 EUR = 0.000023 BTC</span>
                </div>
                <div class="receipt-separator" aria-hidden="true"></div>
                <div class="receipt-line fee-line">
                  <span class="line-label">
                    Platform fee
                    <span class="fee-pct">0.50%</span>
                  </span>
                  <span class="line-val fee-amount">−{{ displayPlatformFee.toFixed(2) }} EUR</span>
                </div>
                <div class="receipt-line fee-line">
                  <span class="line-label">
                    Partner share
                    <span class="fee-pct">0.20%</span>
                  </span>
                  <span class="line-val fee-amount">−{{ displayPartnerFee.toFixed(2) }} EUR</span>
                </div>
                <div class="receipt-line fee-line">
                  <span class="line-label">Network fee</span>
                  <span class="line-val fee-amount">−{{ displayNetworkFee.toFixed(2) }} EUR</span>
                </div>
                <div class="receipt-separator" aria-hidden="true"></div>
                <div class="receipt-line total-line">
                  <span class="line-label">They receive</span>
                  <span class="line-val total-val">{{ displayReceive.toFixed(2) }} EUR</span>
                </div>
                <div class="receipt-breakdown">
                  <span class="breakdown-label">Total fees</span>
                  <span class="breakdown-val">{{ displayTotalFees.toFixed(2) }} EUR (0.74%)</span>
                </div>
              </div>

              <div class="receipt-stamp" :class="{ visible: receiptRevealed }" aria-hidden="true">VERIFIED</div>
              <div class="receipt-footer">No hidden fees. This is what you pay.</div>
            </div>
          </div>

          <!-- Fee simulator -->
          <div class="simulator-wrap">
            <div class="simulator-card">
              <div class="sim-header">
                <span class="sim-title">FEE SIMULATOR</span>
                <span class="sim-badge">LIVE CALC</span>
              </div>
              <div class="sim-body">
                <label class="sim-label" for="sim-amount">Amount to send (EUR)</label>
                <input
                  id="sim-amount"
                  type="number"
                  class="sim-input"
                  v-model.number="simAmount"
                  min="1"
                  max="100000"
                  step="10"
                  aria-describedby="sim-output"
                />
                <div class="sim-output" id="sim-output" aria-live="polite">
                  <div class="sim-row">
                    <span class="sim-key">Platform fee (0.50%)</span>
                    <span class="sim-val sim-val--fee">−{{ simPlatformFee.toFixed(2) }} EUR</span>
                  </div>
                  <div class="sim-row">
                    <span class="sim-key">Network fee (0.20%)</span>
                    <span class="sim-val sim-val--fee">−{{ simNetworkFee.toFixed(2) }} EUR</span>
                  </div>
                  <div class="sim-divider" aria-hidden="true"></div>
                  <div class="sim-row sim-row--total">
                    <span class="sim-key">Total received</span>
                    <span class="sim-val sim-val--total">{{ simReceived.toFixed(2) }} EUR</span>
                  </div>
                </div>
                <p class="sim-note">Fees shown are illustrative. No real money moves in this demo.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── Section 2b: Interactive Fee Calculator ───────────────── -->
    <section class="cp-calc-section" aria-labelledby="cp-calc-h">
      <div class="section-inner">
        <h2 ref="sec1h" id="cp-calc-h" class="section-heading">TRY THE CALCULATOR</h2>
        <p class="cp-calc-intro">See exactly what your users pay — before they press anything.</p>

        <!-- Annual / Monthly toggle -->
        <div class="cp-billing-toggle" role="group" aria-label="Billing period">
          <button class="cp-billing-btn" :class="{ active: !annual }" @click="annual = false" :aria-pressed="!annual">Monthly</button>
          <button class="cp-billing-btn cp-billing-btn--annual" :class="{ active: annual }" @click="annual = true" :aria-pressed="annual">
            Annual <span class="cp-save-badge">−20%</span>
          </button>
        </div>
        <p v-if="annual" class="cp-billing-note">// Platform fee billed annually · 20% discount applied</p>
        <div class="cp-calc-grid">
          <!-- Controls -->
          <div class="cp-calc-controls">
            <div class="cp-calc-field">
              <label class="cp-calc-label" for="cp-amount">Amount (€{{ cpAmount.toLocaleString('de-DE') }})</label>
              <input id="cp-amount" type="range" v-model.number="cpAmount" min="50" max="10000" step="50" class="cp-calc-range" aria-label="Transaction amount" />
              <div class="cp-calc-range-ends"><span>€50</span><span>€10,000</span></div>
            </div>
            <div class="cp-calc-field">
              <label class="cp-calc-label" for="cp-pair">Currency Pair</label>
              <select id="cp-pair" v-model="cpPair" class="cp-calc-select" aria-label="Currency pair">
                <option>EUR→BTC</option>
                <option>EUR→ETH</option>
                <option>EUR→USDT</option>
              </select>
            </div>
            <div class="cp-calc-field">
              <label class="cp-calc-label" for="cp-markup">Your markup ({{ cpMarkup.toFixed(1) }}%)</label>
              <input id="cp-markup" type="range" v-model.number="cpMarkup" min="0" max="2" step="0.1" class="cp-calc-range" aria-label="Partner markup percentage" />
              <div class="cp-calc-range-ends"><span>0%</span><span>2%</span></div>
            </div>
          </div>
          <!-- Receipt card -->
          <div class="cp-calc-receipt" aria-label="Live fee receipt" aria-live="polite">
            <div class="cp-receipt-head">
              <span class="cp-receipt-brand">◈ PRODIGY RECEIPT</span>
              <span class="cp-receipt-badge">LIVE</span>
            </div>
            <div class="cp-receipt-rows">
              <div class="cp-receipt-row">
                <span>Send amount</span>
                <span>€{{ cpAmount.toFixed(2) }}</span>
              </div>
              <div class="cp-receipt-row cp-receipt-row--fee">
                <span>Platform fee (2.5%)</span>
                <span>−€{{ cpPlatformFee.toFixed(2) }}</span>
              </div>
              <div class="cp-receipt-row cp-receipt-row--fee" v-if="cpMarkup > 0">
                <span>Your markup ({{ cpMarkup.toFixed(1) }}%)</span>
                <span>−€{{ cpMarkupFee.toFixed(2) }}</span>
              </div>
              <div class="cp-receipt-row cp-receipt-row--fee">
                <span>Network fee</span>
                <span>−€{{ cpNetworkFee.toFixed(2) }}</span>
              </div>
            </div>
            <div class="cp-receipt-divider" aria-hidden="true" />
            <div class="cp-receipt-total">
              <span>User receives</span>
              <span class="cp-receipt-amount">{{ cpCryptoAmount.toFixed(cpPair.includes('BTC') ? 8 : cpPair.includes('ETH') ? 6 : 2) }} {{ cpPair.split('→')[1] }}</span>
            </div>
            <div class="cp-receipt-note">≈ €{{ cpYouReceive.toFixed(2) }} at current rates</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Section 3: Full fee schedule table ────────────────────── -->
    <section class="schedule-section" aria-label="Full fee schedule">
      <div class="section-inner">
        <h2 ref="sec2h" class="section-heading" data-reveal="fade-up">FULL FEE SCHEDULE</h2>
        <p class="schedule-intro">
          Terminal-style. Every row. No footnotes with the real numbers.
        </p>
        <div class="schedule-table-wrap" role="region" aria-label="Fee schedule table">
          <table class="schedule-table">
            <thead>
              <tr>
                <th scope="col">TYPE</th>
                <th scope="col">RATE</th>
                <th scope="col">WHEN CHARGED</th>
                <th scope="col">SHOWN TO USER</th>
                <th scope="col">WHO PAYS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in feeSchedule" :key="row.type">
                <td class="sched-type">{{ row.type }}</td>
                <td class="sched-rate">{{ row.rate }}</td>
                <td>{{ row.when }}</td>
                <td :class="row.shown.startsWith('✓') ? 'sched-shown--yes' : 'sched-shown--no'">{{ row.shown }}</td>
                <td class="sched-who">{{ row.who }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ── Section 4: Three-column comparison ───────────────────── -->
    <section class="comparison-section" aria-label="Comparison">
      <div class="section-inner">
        <h2 class="section-heading">PRODIGY VS. THE ALTERNATIVES</h2>
        <p class="comparison-sub">
          No names. Just the facts. You've seen these behaviours before.
        </p>

        <!-- Three-column table -->
        <div class="three-col-wrap" role="region" aria-label="Three-way feature comparison" data-reveal="fade-up">
          <table class="three-col-table">
            <thead>
              <tr>
                <th scope="col" class="feat-col">Feature</th>
                <th scope="col" class="col-prodigy">◈ Prodigy</th>
                <th scope="col" class="col-others">Others</th>
                <th scope="col" class="col-diy">Build it yourself</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in threeWay" :key="row.feature">
                <td class="feature-cell">{{ row.feature }}</td>
                <td class="cell-prodigy"><span class="badge badge--cyan">{{ row.prodigy }}</span></td>
                <td class="cell-others"><span class="badge badge--amber">{{ row.others }}</span></td>
                <td class="cell-diy"><span class="badge badge--red">{{ row.diy }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- CTA strip -->
        <div ref="ctaSection" class="cta-strip">
          <h2 ref="mainStat" class="cta-heading" data-grad-sweep>NO SPREADSHEETS REQUIRED.</h2>
          <p class="cta-sub">
            See the fee receipt in action. Real numbers. Real transaction flow.
            No signup, no sales call, no enterprise form to fill in at midnight.
          </p>
          <div class="cta-actions">
            <a
              href="http://localhost:5001"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary"
            >
              OPEN DEMO →
            </a>
            <router-link to="/crypto/product" class="btn-ghost">
              SEE THE MODULES
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Volume Graph ──────────────────────────────────────────── -->
    <section class="volgraph-section" aria-labelledby="cp-volgraph-h" data-reveal="fade-up">
      <div class="section-inner">
        <p class="eyebrow">// PARTNER_REVENUE_AT_SCALE</p>
        <h2 id="cp-volgraph-h" class="section-heading">THE MORE YOU PROCESS,<br /><span class="cyan">THE MORE YOU EARN.</span></h2>
        <p class="section-sub-sm">Estimated monthly partner revenue by volume tier</p>
        <div class="volgraph-wrap">
          <svg ref="volGraphRef" viewBox="0 0 280 120" fill="none" xmlns="http://www.w3.org/2000/svg"
               width="100%" preserveAspectRatio="xMidYMid meet"
               aria-hidden="true" role="img" class="volgraph-svg">
            <text x="21" y="12" text-anchor="middle" font-size="8" fill="#00ffb2" font-family="Space Mono, monospace">€10</text>
            <text x="77" y="12" text-anchor="middle" font-size="8" fill="#00ffb2" font-family="Space Mono, monospace">€37</text>
            <text x="133" y="12" text-anchor="middle" font-size="8" fill="#00ffb2" font-family="Space Mono, monospace">€125</text>
            <text x="189" y="12" text-anchor="middle" font-size="8" fill="#00ffb2" font-family="Space Mono, monospace">€312</text>
            <text x="245" y="12" text-anchor="middle" font-size="8" fill="#00ffb2" font-family="Space Mono, monospace">€625</text>
            <rect class="vol-bar" x="6" y="87" width="30" height="18" ry="3" fill="rgba(0,255,178,0.7)" />
            <rect class="vol-bar" x="62" y="73.5" width="30" height="31.5" ry="3" fill="rgba(0,255,178,0.7)" />
            <rect class="vol-bar" x="118" y="55.5" width="30" height="49.5" ry="3" fill="rgba(0,255,178,0.7)" />
            <rect class="vol-bar" x="174" y="37.5" width="30" height="67.5" ry="3" fill="rgba(0,255,178,0.7)" />
            <rect class="vol-bar" x="230" y="15" width="30" height="90" ry="3" fill="rgba(0,255,178,0.7)" />
            <line x1="0" y1="106" x2="280" y2="106" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
            <text x="21" y="116" text-anchor="middle" font-size="8" fill="rgba(255,255,255,0.45)" font-family="Space Mono, monospace">€10k</text>
            <text x="77" y="116" text-anchor="middle" font-size="8" fill="rgba(255,255,255,0.45)" font-family="Space Mono, monospace">€50k</text>
            <text x="133" y="116" text-anchor="middle" font-size="8" fill="rgba(255,255,255,0.45)" font-family="Space Mono, monospace">€200k</text>
            <text x="189" y="116" text-anchor="middle" font-size="8" fill="rgba(255,255,255,0.45)" font-family="Space Mono, monospace">€500k</text>
            <text x="245" y="116" text-anchor="middle" font-size="8" fill="rgba(255,255,255,0.45)" font-family="Space Mono, monospace">€1M+</text>
          </svg>
        </div>
      </div>
    </section>

    <!-- ── Section A: Build vs Buy ──────────────────────────────── -->
    <section class="buildvbuy-section" aria-label="Build vs buy comparison">
      <div class="section-inner">
        <h2 class="section-heading" data-reveal="fade-up">WHY NOT BUILD YOUR OWN?</h2>
        <div class="bvb-table-wrap" role="region" aria-label="Build vs buy comparison table">
          <table class="bvb-table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col" class="bvb-th--alt">Building in-house</th>
                <th scope="col" class="bvb-th--prodigy">◈ Prodigy</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in buildVsBuy" :key="row.feature">
                <td class="bvb-feature">{{ row.feature }}</td>
                <td class="bvb-alt">{{ row.alt }}</td>
                <td class="bvb-pro">{{ row.pro }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ── Section B: FAQ ─────────────────────────────────────────── -->
    <section class="faq-section" aria-label="Frequently asked questions">
      <div class="section-inner">
        <h2 class="section-heading" data-reveal="fade-up">QUESTIONS WE GET.</h2>
        <div class="faq-list" role="list">
          <details v-for="faq in faqs" :key="faq.q" class="faq-item" role="listitem">
            <summary class="faq-q">{{ faq.q }}</summary>
            <p class="faq-a">{{ faq.a }}</p>
          </details>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const volGraphRef = ref<SVGSVGElement | null>(null)
import { useClipReveal, useGradientSweep } from '@/composables/useSplitReveal'
import { useMagneticAll } from '@/composables/useMagneticButton'

// ── Annual / Monthly toggle ──────────────────────────────────────
const annual = ref(false)
const multiplier = computed(() => annual.value ? 0.8 : 1)

// ── Animation refs ────────────────────────────────────────────────
const sec1h = ref<HTMLElement | null>(null)
const sec2h = ref<HTMLElement | null>(null)
const mainStat = ref<HTMLElement | null>(null)
const ctaSection = ref<HTMLElement | null>(null)

useClipReveal(sec1h, { direction: 'up', duration: 0.9, delay: 0.1 })
useClipReveal(sec2h, { direction: 'up', duration: 0.9, delay: 0.1 })
useGradientSweep(mainStat, { color: '#00ffb2', duration: 1000 })
useMagneticAll(ctaSection, 'a, button', { strength: 0.4, returnDuration: 500 })

// ── Receipt animation ──────────────────────────────────────────
const receiptRevealed = ref(false)
const animProgress = ref(0)
const txnId = ref('A4F2-8B1C')
const receiptEl = ref<HTMLElement | null>(null)
let receiptObserver: IntersectionObserver | null = null
let rafHandle: number | null = null

const SEND = 1000
const PLATFORM_FEE_RATE = 0.005
const PARTNER_FEE_RATE = 0.002
const NETWORK_FEE = 2.40

const displaySend = computed(() => SEND * animProgress.value)
const displayPlatformFee = computed(() => SEND * PLATFORM_FEE_RATE * animProgress.value)
const displayPartnerFee = computed(() => SEND * PARTNER_FEE_RATE * animProgress.value)
const displayNetworkFee = computed(() => NETWORK_FEE * animProgress.value)
const displayTotalFees = computed(
  () => displayPlatformFee.value + displayPartnerFee.value + displayNetworkFee.value
)
const displayReceive = computed(() => displaySend.value - displayTotalFees.value)

function animateReceipt() {
  const start = performance.now()
  const duration = 1200

  function tick(now: number) {
    const t = Math.min((now - start) / duration, 1)
    animProgress.value = 1 - Math.pow(1 - t, 3)
    if (t < 1) {
      rafHandle = requestAnimationFrame(tick)
    } else {
      animProgress.value = 1
      receiptRevealed.value = true
      rafHandle = null
    }
  }

  rafHandle = requestAnimationFrame(tick)
}

// ── Fee simulator ──────────────────────────────────────────────
const simAmount = ref<number>(1000)
const simPlatformFee = computed(() => Math.max(0, simAmount.value) * 0.005)
const simNetworkFee = computed(() => Math.max(0, simAmount.value) * 0.002)
const simReceived = computed(() => Math.max(0, simAmount.value) - simPlatformFee.value - simNetworkFee.value)

// ── Fee schedule ───────────────────────────────────────────────
const feeSchedule = [
  { type: 'Platform fee', rate: '0.50%', when: 'Per transaction', shown: '✓ Pre-confirm', who: 'User' },
  { type: 'Network fee', rate: '~0.20%', when: 'Per transaction', shown: '✓ Pre-confirm', who: 'User' },
  { type: 'KYC check', rate: 'Included', when: 'First transaction', shown: '✓ Status shown', who: 'Platform' },
  { type: 'Partner share', rate: '0.10%–0.50%', when: 'Per transaction', shown: '✗ Partner only', who: 'Platform' },
  { type: 'Admin access', rate: 'Included', when: 'N/A', shown: 'N/A', who: 'Platform' },
]

// ── Interactive fee calculator ─────────────────────────────────
const cpAmount = ref(500)
const cpPair = ref('EUR→BTC')
const cpMarkup = ref(0.5)
const cpPlatformFeeRate = 0.025
const cpPlatformFee = computed(() => cpAmount.value * cpPlatformFeeRate)
const cpMarkupFee = computed(() => cpAmount.value * (cpMarkup.value / 100))
const cpNetworkFee = computed(() => cpPair.value.includes('BTC') ? 2.5 : 0.8)
const cpYouReceive = computed(() => cpAmount.value - cpPlatformFee.value - cpMarkupFee.value - cpNetworkFee.value)
const cpRate = computed(() => {
  if (cpPair.value === 'EUR→BTC') return 0.0000098
  if (cpPair.value === 'EUR→ETH') return 0.00038
  return 1.0
})
const cpCryptoAmount = computed(() => cpYouReceive.value * cpRate.value)

// ── Build vs Buy ──────────────────────────────────────────────
const buildVsBuy = [
  { feature: 'Time to deploy',     alt: '6–18 months',        pro: '< 1 afternoon' },
  { feature: 'KYC / AML compliance', alt: 'Hire a team',      pro: 'Included' },
  { feature: '136 assets',         alt: 'Per asset work',     pro: 'All included' },
  { feature: 'Ongoing maintenance', alt: 'Ongoing headcount', pro: 'Included' },
]

// ── FAQ ───────────────────────────────────────────────────────
const faqs = [
  { q: 'Are there setup fees?',             a: 'None. You pay per successful transaction only.' },
  { q: 'Are there volume limits?',          a: 'No hard limits. Your account auto-scales to the next tier with zero interruption when you hit thresholds.' },
  { q: 'How is KYC priced?',               a: 'Bundled into the platform fee. You are never charged separately for identity checks.' },
  { q: 'What are the contract terms?',      a: 'Starter and Growth are month-to-month. Enterprise is annual by default, but custom terms are available.' },
  { q: 'Is there a sandbox environment?',  a: 'Yes. Full sandbox with pre-loaded test identities (pass / fail / pending). No real money moves.' },
]

// ── Three-way comparison ───────────────────────────────────────
const threeWay = [
  { feature: 'Fee transparency', prodigy: '✓ Always', others: '≈ Partial', diy: '✗ Your problem' },
  { feature: 'KYC built-in', prodigy: '✓ Included', others: '≈ Add-on cost', diy: '✗ Months of work' },
  { feature: 'Real-time dashboard', prodigy: '✓ Included', others: '≈ Delayed reports', diy: '✗ Build it yourself' },
  { feature: 'Partner revenue share', prodigy: '✓ Configurable', others: '≈ Fixed tiers', diy: '✗ N/A' },
  { feature: 'Integration time', prodigy: '✓ 1 afternoon', others: '≈ 2–4 weeks', diy: '✗ 6–18 months' },
  { feature: 'Compliance audit trail', prodigy: '✓ Immutable', others: '≈ Exportable only', diy: '✗ Manual logs' },
]

onMounted(() => {
  receiptObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (entry?.isIntersecting) {
        animateReceipt()
        receiptObserver?.disconnect()
        receiptObserver = null
      }
    },
    { threshold: 0.3 }
  )
  if (receiptEl.value) receiptObserver.observe(receiptEl.value)

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
})

onUnmounted(() => {
  receiptObserver?.disconnect()
  receiptObserver = null
  if (rafHandle !== null) {
    cancelAnimationFrame(rafHandle)
    rafHandle = null
  }
})
</script>

<style scoped>
/* ── Tokens ──────────────────────────────────────────────────── */
.pricing {
  --bg: #050510;
  --cyan: #00f5ff;
  --purple: #a855f7;
  --amber: #f59e0b;
  --red: #ef4444;
  --text: #e8eaff;
  --white: #ffffff;
  --card-bg: rgba(255, 255, 255, 0.03);
  --card-border: rgba(0, 245, 255, 0.15);
  --glow-cyan: 0 0 20px rgba(0, 245, 255, 0.3);
  --glow-purple: 0 0 20px rgba(168, 85, 247, 0.3);

  background: var(--bg);
  color: var(--text);
}

.section-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 2rem);
}

.section-heading {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--white);
  text-align: center;
  margin: 0 0 clamp(0.75rem, 1.5vw, 1rem);
}

.btn-primary {
  display: inline-block;
  font-family: 'Space Mono', monospace;
  font-size: clamp(0.8rem, 1.4vw, 0.9rem);
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #050510;
  background: var(--cyan);
  padding: 0.85rem 2rem;
  border-radius: 3px;
  text-decoration: none;
  transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
}

.btn-primary:hover {
  background: var(--white);
  box-shadow: var(--glow-cyan);
  transform: translateY(-1px);
}

.btn-ghost {
  display: inline-block;
  font-family: 'Space Mono', monospace;
  font-size: clamp(0.8rem, 1.4vw, 0.9rem);
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--cyan);
  padding: 0.85rem 2rem;
  border: 1px solid rgba(0, 245, 255, 0.4);
  border-radius: 3px;
  text-decoration: none;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
}

.btn-ghost:hover {
  border-color: var(--cyan);
  box-shadow: var(--glow-cyan);
  transform: translateY(-1px);
}

.font-mono {
  font-family: 'Space Mono', monospace;
}

/* ── Hero ────────────────────────────────────────────────────── */
.pricing-hero {
  position: relative;
  padding: clamp(4rem, 10vw, 8rem) 0 clamp(3rem, 7vw, 5rem);
  text-align: center;
  overflow: hidden;
}

.grid-dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(0, 245, 255, 0.06) 1px, transparent 1px);
  background-size: 32px 32px;
  pointer-events: none;
}

.hero-inner {
  position: relative;
  z-index: 1;
  max-width: 760px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 2rem);
}

.eyebrow {
  font-family: 'Space Mono', monospace;
  font-size: clamp(0.65rem, 1.2vw, 0.8rem);
  letter-spacing: 0.25em;
  color: var(--cyan);
  margin: 0 0 1rem;
}

.headline {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(2.25rem, 6vw, 5rem);
  font-weight: 800;
  line-height: 1.0;
  letter-spacing: -0.01em;
  color: var(--white);
  margin: 0 0 clamp(1rem, 2.5vw, 1.5rem);
}

.hero-sub {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(1rem, 2vw, 1.3rem);
  font-style: italic;
  color: rgba(232, 234, 255, 0.6);
  margin: 0;
}

/* ── Receipt section ─────────────────────────────────────────── */
.receipt-section {
  padding: clamp(4rem, 8vw, 6rem) 0;
}

.receipt-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(1.5rem, 4vw, 3rem);
  align-items: start;
  max-width: 1000px;
  margin: 0 auto;
}

.receipt-wrap {
  display: flex;
  justify-content: center;
}

.receipt-paper {
  position: relative;
  width: 100%;
  max-width: 480px;
  background: rgba(5, 5, 16, 0.9);
  border: 1px solid rgba(0, 245, 255, 0.25);
  border-radius: 8px;
  box-shadow: var(--glow-cyan), 0 0 80px rgba(0, 245, 255, 0.06);
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.receipt-paper.revealed {
  opacity: 1;
  transform: translateY(0);
}

.receipt-top {
  padding: clamp(1.25rem, 3vw, 2rem) clamp(1.25rem, 3vw, 2rem) 1rem;
  border-bottom: 1px solid rgba(0, 245, 255, 0.1);
}

.receipt-brand {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.75rem;
}

.brand-mark {
  font-size: 1.1rem;
  color: var(--cyan);
  text-shadow: 0 0 10px rgba(0, 245, 255, 0.6);
}

.brand-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: var(--cyan);
}

.receipt-title {
  font-family: 'Space Mono', monospace;
  font-size: clamp(0.9rem, 1.5vw, 1.1rem);
  font-weight: 700;
  letter-spacing: 0.15em;
  color: var(--white);
  margin-bottom: 0.5rem;
}

.receipt-timestamp {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.ts-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  color: rgba(232, 234, 255, 0.35);
}

.ts-val {
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  color: rgba(232, 234, 255, 0.5);
}

.receipt-body {
  padding: clamp(1rem, 2.5vw, 1.5rem) clamp(1.25rem, 3vw, 2rem);
}

.receipt-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.45rem 0;
}

.line-label {
  font-family: 'Space Mono', monospace;
  font-size: clamp(0.7rem, 1.2vw, 0.8rem);
  color: rgba(232, 234, 255, 0.6);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.fee-pct {
  font-size: 0.65rem;
  color: var(--purple);
  border: 1px solid rgba(168, 85, 247, 0.3);
  padding: 0.1rem 0.35rem;
  border-radius: 2px;
}

.line-val {
  font-family: 'Space Mono', monospace;
  font-size: clamp(0.7rem, 1.2vw, 0.8rem);
  color: var(--text);
}

.fee-line .line-val.fee-amount {
  color: rgba(168, 85, 247, 0.85);
}

.total-line {
  padding: 0.65rem 0;
}

.total-line .line-label {
  font-size: clamp(0.8rem, 1.4vw, 0.9rem);
  color: var(--text);
  font-weight: 700;
}

.total-line .total-val {
  font-size: clamp(0.9rem, 1.6vw, 1.05rem);
  color: var(--cyan);
  text-shadow: 0 0 8px rgba(0, 245, 255, 0.5);
}

.receipt-separator {
  height: 1px;
  background: rgba(0, 245, 255, 0.12);
  margin: 0.5rem 0;
}

.receipt-breakdown {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  padding: 0.4rem 0.75rem;
  background: rgba(0, 245, 255, 0.04);
  border-radius: 3px;
  border: 1px solid rgba(0, 245, 255, 0.08);
}

.breakdown-label,
.breakdown-val {
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  color: rgba(232, 234, 255, 0.4);
}

.receipt-stamp {
  position: absolute;
  top: 50%;
  right: clamp(1rem, 3vw, 1.5rem);
  transform: translateY(-50%) rotate(-15deg) scale(0);
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  font-weight: 800;
  letter-spacing: 0.15em;
  color: var(--cyan);
  border: 2px solid var(--cyan);
  padding: 0.3rem 0.75rem;
  border-radius: 3px;
  opacity: 0;
  transition: transform 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) 0.8s,
              opacity 0.2s ease 0.8s;
  text-shadow: 0 0 10px rgba(0, 245, 255, 0.5);
  box-shadow: 0 0 10px rgba(0, 245, 255, 0.2);
}

.receipt-stamp.visible {
  transform: translateY(-50%) rotate(-15deg) scale(1);
  opacity: 0.7;
}

.receipt-footer {
  padding: 0.75rem clamp(1.25rem, 3vw, 2rem);
  border-top: 1px solid rgba(0, 245, 255, 0.1);
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  color: rgba(232, 234, 255, 0.3);
  text-align: center;
}

/* ── Fee simulator ───────────────────────────────────────────── */
.simulator-wrap {
  display: flex;
  align-items: flex-start;
}

.simulator-card {
  width: 100%;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 8px;
  overflow: hidden;
}

.sim-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.25rem;
  background: rgba(0, 245, 255, 0.04);
  border-bottom: 1px solid rgba(0, 245, 255, 0.1);
}

.sim-title {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: rgba(232, 234, 255, 0.5);
}

.sim-badge {
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.35);
  padding: 0.15rem 0.5rem;
  border-radius: 2px;
}

.sim-body {
  padding: clamp(1.25rem, 3vw, 2rem);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sim-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: rgba(232, 234, 255, 0.5);
  letter-spacing: 0.08em;
}

.sim-input {
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(0, 245, 255, 0.2);
  border-radius: 4px;
  padding: 0.75rem 1rem;
  font-family: 'Space Mono', monospace;
  font-size: 1rem;
  color: var(--cyan);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

.sim-input:focus {
  border-color: var(--cyan);
  box-shadow: 0 0 0 2px rgba(0, 245, 255, 0.12);
}

.sim-input::-webkit-inner-spin-button,
.sim-input::-webkit-outer-spin-button {
  opacity: 0.3;
}

.sim-output {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 245, 255, 0.08);
  border-radius: 4px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sim-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sim-row--total {
  padding-top: 0.5rem;
}

.sim-key {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: rgba(232, 234, 255, 0.5);
}

.sim-val {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
}

.sim-val--fee {
  color: rgba(168, 85, 247, 0.8);
}

.sim-val--total {
  color: var(--cyan);
  font-size: 0.9rem;
  text-shadow: 0 0 6px rgba(0, 245, 255, 0.4);
}

.sim-divider {
  height: 1px;
  background: rgba(0, 245, 255, 0.1);
}

.sim-note {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.75rem;
  color: rgba(232, 234, 255, 0.3);
  margin: 0;
  line-height: 1.5;
}

/* ── Fee schedule table ──────────────────────────────────────── */
.schedule-section {
  padding: clamp(4rem, 8vw, 7rem) 0;
  border-top: 1px solid rgba(0, 245, 255, 0.08);
}

.schedule-intro {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(0.95rem, 1.5vw, 1.1rem);
  color: rgba(232, 234, 255, 0.5);
  text-align: center;
  margin: 0 0 clamp(2rem, 4vw, 3rem);
}

.schedule-table-wrap {
  overflow-x: auto;
  border-radius: 6px;
  border: 1px solid rgba(0, 245, 255, 0.15);
}

.schedule-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
}

.schedule-table thead {
  background: rgba(0, 245, 255, 0.05);
}

.schedule-table th {
  padding: clamp(0.75rem, 1.5vw, 1rem) clamp(0.75rem, 1.5vw, 1.25rem);
  text-align: left;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--cyan);
  border-bottom: 1px solid rgba(0, 245, 255, 0.15);
  white-space: nowrap;
}

.schedule-table td {
  padding: clamp(0.6rem, 1.2vw, 0.85rem) clamp(0.75rem, 1.5vw, 1.25rem);
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  color: rgba(232, 234, 255, 0.7);
  white-space: nowrap;
}

.schedule-table tr:last-child td {
  border-bottom: none;
}

.schedule-table tr:hover td {
  background: rgba(0, 245, 255, 0.03);
}

.sched-type {
  color: var(--white) !important;
  font-weight: 700;
}

.sched-rate {
  color: var(--cyan) !important;
}

.sched-shown--yes {
  color: #22c55e !important;
}

.sched-shown--no {
  color: rgba(232, 234, 255, 0.35) !important;
}

.sched-who {
  color: rgba(168, 85, 247, 0.8) !important;
}

/* ── Three-column comparison ─────────────────────────────────── */
.comparison-section {
  padding: clamp(4rem, 8vw, 7rem) 0;
  border-top: 1px solid rgba(0, 245, 255, 0.08);
}

.comparison-sub {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(0.95rem, 1.5vw, 1.1rem);
  color: rgba(232, 234, 255, 0.5);
  text-align: center;
  margin: 0 0 clamp(2rem, 4vw, 3rem);
}

.three-col-wrap {
  overflow-x: auto;
  border-radius: 6px;
  border: 1px solid rgba(0, 245, 255, 0.15);
  margin-bottom: clamp(3rem, 6vw, 5rem);
}

.three-col-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Barlow Condensed', sans-serif;
}

.three-col-table th {
  padding: clamp(0.75rem, 1.5vw, 1rem) clamp(1rem, 2vw, 1.5rem);
  text-align: left;
  font-size: clamp(0.8rem, 1.2vw, 0.9rem);
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(0, 245, 255, 0.15);
  background: rgba(0, 245, 255, 0.03);
  white-space: nowrap;
}

.feat-col {
  color: rgba(232, 234, 255, 0.5);
}

.col-prodigy {
  color: var(--cyan) !important;
  text-shadow: 0 0 8px rgba(0, 245, 255, 0.3);
}

.col-others {
  color: var(--amber) !important;
}

.col-diy {
  color: rgba(239, 68, 68, 0.8) !important;
}

.three-col-table td {
  padding: clamp(0.6rem, 1.2vw, 0.85rem) clamp(1rem, 2vw, 1.5rem);
  font-size: clamp(0.8rem, 1.3vw, 0.9rem);
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.three-col-table tr:last-child td {
  border-bottom: none;
}

.three-col-table tr:hover td {
  background: rgba(0, 245, 255, 0.02);
}

.feature-cell {
  color: rgba(232, 234, 255, 0.7);
}

.badge {
  display: inline-block;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
  white-space: nowrap;
}

.badge--cyan {
  color: var(--cyan);
  background: rgba(0, 245, 255, 0.08);
  border: 1px solid rgba(0, 245, 255, 0.2);
}

.badge--amber {
  color: var(--amber);
  background: rgba(245, 158, 11, 0.08);
  border: 1px solid rgba(245, 158, 11, 0.2);
}

.badge--red {
  color: rgba(239, 68, 68, 0.9);
  background: rgba(239, 68, 68, 0.06);
  border: 1px solid rgba(239, 68, 68, 0.2);
}

/* ── CTA strip ───────────────────────────────────────────────── */
.cta-strip {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(0.75rem, 2vw, 1.25rem);
  padding: clamp(3rem, 6vw, 5rem) 0 0;
  border-top: 1px solid rgba(0, 245, 255, 0.08);
}

.cta-heading {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(1.75rem, 4vw, 3rem);
  font-weight: 800;
  letter-spacing: 0.05em;
  color: var(--white);
  margin: 0;
}

.cta-sub {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(0.95rem, 1.5vw, 1.1rem);
  line-height: 1.6;
  color: rgba(232, 234, 255, 0.55);
  max-width: 50ch;
  margin: 0;
}

.cta-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 0.25rem;
}

/* ── Live ticker ─────────────────────────────────────────────── */
.cp-ticker-wrap { overflow: hidden; border-top: 1px solid rgba(0,255,178,0.12); border-bottom: 1px solid rgba(0,255,178,0.12); padding: 0.5rem 0; margin: 1.5rem 0 0; }
.cp-ticker-track { display: flex; gap: 2.5rem; width: max-content; animation: ticker-scroll 22s linear infinite; }
.cp-tick { font-family: 'IBM Plex Mono', monospace; font-size: 0.8125rem; color: rgba(0,255,178,0.6); white-space: nowrap; }
.cp-tick em { font-style: normal; color: #00ffb2; }
.cp-tick--up em { color: #4ade80; }
.cp-tick--down em { color: #f87171; }
@keyframes ticker-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) { .cp-ticker-track { animation: none; } }

/* ── Responsive ──────────────────────────────────────────────── */
@media (max-width: 900px) {
  .receipt-layout {
    grid-template-columns: 1fr;
  }

  .receipt-wrap {
    justify-content: stretch;
  }

  .receipt-paper {
    max-width: 100%;
  }
}

@media (max-width: 600px) {
  .cta-actions {
    flex-direction: column;
    align-items: center;
  }
}

/* ── Animation helpers ─────────────────────────────────────────── */
.section-heading, .cta-heading { will-change: clip-path; }
[data-grad-sweep] { position: relative; display: inline-block; }

/* ── Interactive Fee Calculator ── */
.cp-calc-section {
  padding: clamp(3rem, 6vw, 5rem) 0;
  border-top: 1px solid rgba(0, 245, 255, 0.1);
}
.cp-calc-intro {
  font-family: 'Space Mono', monospace;
  font-size: clamp(0.75rem, 1.3vw, 0.875rem);
  color: rgba(232, 234, 255, 0.5);
  text-align: center;
  margin: 0 0 2.5rem;
  letter-spacing: 0.05em;
}
.cp-calc-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(1.5rem, 3vw, 2.5rem);
  max-width: 900px;
  margin: 0 auto;
  align-items: start;
}
.cp-calc-controls {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.cp-calc-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.cp-calc-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--cyan);
}
.cp-calc-range {
  width: 100%;
  accent-color: var(--cyan);
  cursor: pointer;
  height: 4px;
}
.cp-calc-range-ends {
  display: flex;
  justify-content: space-between;
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  color: rgba(232, 234, 255, 0.3);
}
.cp-calc-select {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  background: rgba(255,255,255,0.04);
  color: var(--text);
  border: 1px solid rgba(0, 245, 255, 0.2);
  padding: 0.5rem 0.75rem;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
}
.cp-calc-select:focus { border-color: var(--cyan); box-shadow: 0 0 8px rgba(0,245,255,0.2); }
.cp-calc-receipt {
  background: rgba(5, 5, 16, 0.9);
  border: 1px solid rgba(0, 245, 255, 0.2);
  border-radius: 6px;
  padding: 1.5rem;
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  box-shadow: 0 0 24px rgba(0,245,255,0.08);
}
.cp-receipt-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.cp-receipt-brand {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--cyan);
}
.cp-receipt-badge {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: #050510;
  background: var(--cyan);
  padding: 0.15em 0.5em;
  border-radius: 2px;
}
.cp-receipt-rows {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.cp-receipt-row {
  display: flex;
  justify-content: space-between;
  padding: 0.4rem 0;
  border-bottom: 1px solid rgba(0,245,255,0.08);
  font-size: 0.75rem;
  color: rgba(232, 234, 255, 0.7);
}
.cp-receipt-row--fee { color: rgba(232, 234, 255, 0.45); font-size: 0.7rem; }
.cp-receipt-divider {
  height: 1px;
  background: rgba(0, 245, 255, 0.3);
  margin: 0.75rem 0;
}
.cp-receipt-total {
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 0.875rem;
  color: var(--white);
  margin-bottom: 0.5rem;
}
.cp-receipt-amount {
  color: var(--cyan);
  text-shadow: 0 0 10px rgba(0,245,255,0.4);
}
.cp-receipt-note {
  font-size: 0.65rem;
  color: rgba(232, 234, 255, 0.35);
  letter-spacing: 0.04em;
  text-align: right;
}

@media (max-width: 640px) {
  .cp-calc-grid { grid-template-columns: 1fr; }
}

/* ── Build vs Buy ────────────────────────────────────────────── */
.buildvbuy-section {
  padding: clamp(4rem, 8vw, 7rem) 0;
  border-top: 1px solid rgba(0, 245, 255, 0.08);
}

.bvb-table-wrap {
  overflow-x: auto;
  border-radius: 6px;
  border: 1px solid rgba(0, 245, 255, 0.15);
  margin-top: clamp(1.5rem, 3vw, 2.5rem);
}

.bvb-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
}

.bvb-table thead {
  background: rgba(0, 245, 255, 0.05);
}

.bvb-table th {
  padding: clamp(0.75rem, 1.5vw, 1rem) clamp(0.75rem, 2vw, 1.25rem);
  text-align: left;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  border-bottom: 1px solid rgba(0, 245, 255, 0.15);
}

.bvb-th--alt { color: rgba(232, 234, 255, 0.5); }
.bvb-th--prodigy { color: var(--cyan); }

.bvb-table td {
  padding: clamp(0.6rem, 1.2vw, 0.875rem) clamp(0.75rem, 2vw, 1.25rem);
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  vertical-align: middle;
}

.bvb-table tr:last-child td { border-bottom: none; }
.bvb-table tr:hover td { background: rgba(0, 245, 255, 0.02); }

.bvb-feature { color: rgba(232, 234, 255, 0.7); font-size: 0.8rem; }
.bvb-alt { color: rgba(232, 234, 255, 0.4); font-size: 0.8rem; }
.bvb-pro { color: var(--cyan); font-size: 0.8rem; font-weight: 700; }

/* ── FAQ ─────────────────────────────────────────────────────── */
.faq-section {
  padding: clamp(4rem, 8vw, 7rem) 0;
  border-top: 1px solid rgba(0, 245, 255, 0.08);
}

.faq-list {
  max-width: 740px;
  margin: clamp(1.5rem, 3vw, 2.5rem) auto 0;
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid rgba(0, 245, 255, 0.15);
  border-radius: 4px;
  overflow: hidden;
}

.faq-item {
  border-bottom: 1px solid rgba(0, 245, 255, 0.1);
}

.faq-item:last-child { border-bottom: none; }

.faq-q {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  color: var(--cyan);
  padding: clamp(0.875rem, 1.5vw, 1.1rem) clamp(1rem, 2vw, 1.5rem);
  cursor: pointer;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.2s;
}

.faq-q::-webkit-details-marker { display: none; }

.faq-q::after {
  content: '+';
  font-size: 1rem;
  color: var(--cyan);
  transition: transform 0.2s;
  flex-shrink: 0;
}

details[open] .faq-q::after { transform: rotate(45deg); }

.faq-q:hover { background: rgba(0, 245, 255, 0.04); }

.faq-a {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  line-height: 1.75;
  color: rgba(232, 234, 255, 0.65);
  padding: 0 clamp(1rem, 2vw, 1.5rem) clamp(0.875rem, 1.5vw, 1.1rem);
  margin: 0;
  border-top: 1px solid rgba(0, 245, 255, 0.08);
}

/* ── Annual / Monthly billing toggle ───────────────────────── */
.cp-billing-toggle {
  display: inline-flex;
  gap: 0;
  border: 1px solid rgba(0, 255, 178, 0.25);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.cp-billing-btn {
  background: transparent;
  border: none;
  color: rgba(232, 234, 255, 0.55);
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  padding: 0.6rem 1.25rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
}

.cp-billing-btn.active {
  background: rgba(0, 255, 178, 0.12);
  color: #00ffb2;
}

.cp-billing-btn:hover:not(.active) {
  background: rgba(0, 255, 178, 0.05);
  color: rgba(232, 234, 255, 0.8);
}

.cp-save-badge {
  background: rgba(0, 255, 178, 0.2);
  color: #00ffb2;
  font-size: 0.75rem;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  font-family: 'Space Mono', monospace;
}

.cp-billing-note {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: rgba(0, 255, 178, 0.7);
  margin-bottom: 1.5rem;
  margin-top: -1rem;
}

/* ── Volume Graph SVG ── */
.volgraph-section { background: #0c1117; border-bottom: 1px solid #1a2332; }
.volgraph-section .section-heading { color: #fff; }
.volgraph-section .eyebrow { color: rgba(0,255,178,0.6); }
.section-sub-sm { font-family: 'Space Mono', monospace; font-size: 0.8125rem; color: rgba(255,255,255,0.5); margin: 0.5rem 0 2rem; }
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