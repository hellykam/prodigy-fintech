<template>
  <main>
    <!-- Hero -->
    <section class="hero" aria-labelledby="hero-headline">
      <SwissFloatingPlanes />
      <div class="hero-inner">
        <div class="hero-left">
          <div class="price-strip" aria-label="Live crypto prices (simulated)">
            <span v-for="p in prices" :key="p.sym" class="price-chip" :class="p.dir === 'up' ? 'up' : 'down'">
              <span class="sym">{{ p.sym }}</span>
              <span class="val">{{ p.val }}</span>
              <span aria-hidden="true">{{ p.dir === 'up' ? '▲' : '▼' }}</span>
            </span>
          </div>

          <p class="label eyebrow">Crypto infrastructure · B2B · Demo</p>

          <h1 id="hero-headline" class="headline" ref="heroTitle">
            <span class="line">CRYPTO</span>
            <span class="line">THAT</span>
            <span class="line">EXPLAINS</span>
            <span class="line iris-text">ITSELF.</span>
          </h1>

          <p class="sub" ref="heroSub">Give your platform crypto in an afternoon. Transparent fees, built-in KYC, and a dashboard that shows exactly what happened — so your compliance team stops asking questions.</p>

          <div class="ctas">
            <a href="http://localhost:5001" target="_blank" rel="noopener noreferrer" class="cta-primary" ref="ctaBtn">Open the demo →</a>
            <RouterLink to="/swiss/product" class="cta-secondary">See how it works</RouterLink>
          </div>

          <div class="demo-pills" aria-label="Live demo apps">
            <a href="http://localhost:5001" target="_blank" rel="noopener noreferrer" class="pill">↗ Consumer</a>
            <a href="http://localhost:5002" target="_blank" rel="noopener noreferrer" class="pill">↗ Admin</a>
            <a href="http://localhost:5003" target="_blank" rel="noopener noreferrer" class="pill">↗ KYC</a>
            <a href="http://localhost:5004" target="_blank" rel="noopener noreferrer" class="pill">↗ System Map</a>
            <a href="http://localhost:5005" target="_blank" rel="noopener noreferrer" class="pill">↗ Widget</a>
            <a href="http://localhost:5006" target="_blank" rel="noopener noreferrer" class="pill">↗ Partner</a>
          </div>

          <p class="microcopy">No wallet required. No real money moves. No small print hiding in a cupboard.</p>
        </div>

        <div class="hero-right" aria-label="Demo dashboard preview">
          <div class="iris-orb" aria-hidden="true" />
          <div class="grid-dots" aria-hidden="true" />
          <BrowserMockup :tiltDeg="-8" :float="true">
            <div style="padding:16px; font-family:'Space Mono',monospace; font-size:12px; background:#fff; height:100%">
              <div style="font-weight:700; margin-bottom:12px; color:#111">Prodigy Dashboard — Live</div>
              <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #eee">
                <span style="color:#666">Settlement rate</span><span style="color:#16a34a; font-weight:600">99.97% ↑</span>
              </div>
              <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #eee">
                <span style="color:#666">Avg processing</span><span style="font-weight:600">47ms</span>
              </div>
              <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #eee">
                <span style="color:#666">Active transactions</span><span style="font-weight:600">12</span>
              </div>
              <div style="margin-top:16px; display:flex; gap:4px; align-items:flex-end; height:40px">
                <div style="width:8px; background:#0ea5e9; height:60%"></div>
                <div style="width:8px; background:#0ea5e9; height:80%"></div>
                <div style="width:8px; background:#0ea5e9; height:50%"></div>
                <div style="width:8px; background:#0ea5e9; height:100%"></div>
                <div style="width:8px; background:#0ea5e9; height:70%"></div>
              </div>
            </div>
          </BrowserMockup>
        </div>
      </div>
    </section>

    <!-- Feature marquee strip -->
    <div class="marquee-wrap" aria-hidden="true">
      <div class="marquee-track">
        <span class="marquee-pill" v-for="(item, i) in [...marqueeItems, ...marqueeItems]" :key="i">{{ item }}</span>
      </div>
    </div>

    <!-- Live activity feed -->
    <div class="activity-feed" aria-label="Recent activity (simulated)" aria-live="polite">
      <div class="activity-header">
        <span class="activity-dot" aria-hidden="true" />
        <span class="activity-label">Live activity</span>
      </div>
      <TransitionGroup name="activity-slide" tag="ul" class="activity-list">
        <li v-for="item in visibleActivity" :key="item.id" class="activity-item">
          <span class="activity-flag">{{ item.flag }}</span>
          <span class="activity-text">{{ item.text }}</span>
          <span class="activity-time">{{ item.time }}</span>
        </li>
      </TransitionGroup>
      <p class="activity-disclaimer">Simulated activity for demonstration purposes</p>
    </div>

    <!-- Ticker -->
    <div class="ticker-wrap" aria-hidden="true">
      <div class="ticker-live">
        <span class="live-dot" />
        <span class="live-label">LIVE</span>
      </div>
      <div class="ticker-overflow">
        <div class="ticker-track">
          <span v-for="(item, i) in tickerItems" :key="i" class="ticker-item">
            <span class="sep" aria-hidden="true">◈</span>{{ item }}
          </span>
        </div>
      </div>
    </div>

    <!-- Animated Stats Row -->
    <section class="stats-row" ref="statsRef" aria-label="Platform statistics animated">
      <div class="stats-row-inner">
        <CounterStat :value="2.1" prefix="€" suffix="B+" label="Volume Processed" :duration="1200" />
        <CounterStat :value="47" suffix="ms" label="Avg Settlement" :duration="800" />
        <CounterStat :value="0.03" suffix="%" label="Platform Fee" :duration="600" />
        <CounterStat :value="200" suffix="+" label="Fintechs Served" :duration="1000" />
      </div>
    </section>

    <!-- Stats -->
    <section class="stats" aria-label="Platform statistics">
      <div class="stats-inner">
        <div v-for="s in stats" :key="s.n" class="stat-cell">
          <div class="stat-n iris-text">{{ s.n }}</div>
          <div class="stat-label">{{ s.label }}</div>
          <div class="stat-sub">{{ s.sub }}</div>
        </div>
      </div>
    </section>

    <!-- Problem -->
    <section class="problem" aria-labelledby="problem-h">
      <div class="section-inner">
        <div class="section-header">
          <p class="label eyebrow">01 / Problem</p>
          <h2 id="problem-h" class="section-headline">Most crypto widgets explain themselves with the confidence of a vending machine that recently became a bank.</h2>
        </div>
        <div class="problem-body">
          <div class="receipt-mock" aria-label="Example of a confusing fee receipt">
            <div class="receipt-row-head">
              <span class="font-mono" style="font-size:0.8125rem;letter-spacing:0.08em">TRANSACTION RECEIPT</span>
              <span class="stamp-err">ERROR</span>
            </div>
            <hr class="rule-dashed" style="margin:0.75rem 0"/>
            <div class="mock-row"><span>Total fee</span><span class="crossed">2.5% + €0.99 + 0.0003 BTC + ???</span></div>
            <div class="mock-row"><span>Compliance status</span><span class="crossed">See section 14(b)</span></div>
            <div class="mock-row"><span>Admin visibility</span><span class="crossed">Not available</span></div>
            <div class="mock-row"><span>Partner share</span><span class="crossed">Ask finance. Spreadsheet.</span></div>
            <hr class="rule-dashed" style="margin:0.75rem 0"/>
            <p class="mock-note">← This is what happens when visibility is optional.</p>
          </div>
          <ul class="problem-points">
            <li v-for="(p, i) in problemPoints" :key="i" class="problem-point">
              <span class="point-n font-mono">{{ String(i+1).padStart(2,'0') }}</span>
              <span>{{ p }}</span>
            </li>
          </ul>
        </div>
        <div class="conclusion">
          <p>This is not a technical problem. It is a visibility problem.</p>
        </div>
      </div>
    </section>

    <!-- Widget Preview -->
    <section class="widget-preview-section" data-reveal="fade-up" aria-labelledby="widget-preview-h">
      <div class="widget-preview-inner">
        <div class="widget-preview-text">
          <h2 id="widget-preview-h" class="section-headline">THE WIDGET IN ACTION.</h2>
          <p class="sub">Forty-seven seconds. Full KYC. Receipt on screen. No redirects, no surprises, no small print hiding in a cupboard.</p>
        </div>
        <WidgetDemo theme="swiss" />
      </div>
    </section>

    <!-- Receipt Journey -->
    <section class="journey" aria-labelledby="journey-h">
      <div class="section-inner">
        <div class="section-header">
          <p class="label eyebrow">HOW IT WORKS</p>
          <h2 id="journey-h" class="journey-headline" ref="sec1h" data-grad-sweep>THE RECEIPT JOURNEY</h2>
        </div>
        <ol class="journey-steps" role="list">
          <li
            v-for="(step, i) in journeySteps"
            :key="i"
            class="journey-step"
            :ref="el => { if (el) stepEls[i] = el as HTMLElement }"
          >
            <div class="step-num" aria-hidden="true">{{ i + 1 }}</div>
            <div class="step-body">
              <h3 class="step-title">{{ step.title }}</h3>
              <p class="step-detail">{{ step.detail }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- Fee Calculator -->
    <section class="fee-calc" aria-labelledby="calc-h">
      <div class="section-inner">
        <div class="section-header">
          <p class="label eyebrow">FEE CALCULATOR</p>
          <h2 id="calc-h" class="section-headline">CALCULATE YOUR FEE</h2>
        </div>
        <div class="calc-card" role="form" aria-label="Fee calculator">
          <div class="calc-field">
            <label class="calc-label" for="calc-amount">Amount (€)</label>
            <input
              id="calc-amount"
              type="number"
              v-model.number="calcAmount"
              min="10"
              max="100000"
              class="calc-input"
              aria-label="Transaction amount in euros"
            />
          </div>
          <div class="calc-field">
            <label class="calc-label" for="calc-currency">Currency</label>
            <select id="calc-currency" v-model="calcCurrency" class="calc-select" aria-label="Cryptocurrency">
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
              <option value="SOL">SOL</option>
            </select>
          </div>
          <div class="calc-field">
            <label class="calc-label" for="calc-share">
              Partner share: <span class="calc-share-val">{{ (calcPartnerShare * 100).toFixed(1) }}%</span>
            </label>
            <input
              id="calc-share"
              type="range"
              v-model.number="calcPartnerShare"
              min="0.1"
              max="0.5"
              step="0.1"
              class="calc-range"
              aria-label="Partner revenue share percentage"
            />
            <div class="calc-range-labels" aria-hidden="true">
              <span>0.1%</span><span>0.5%</span>
            </div>
          </div>
          <hr class="rule-dashed" />
          <div class="calc-breakdown" aria-label="Fee breakdown">
            <div class="calc-row">
              <span class="calc-row-label">Platform fee (0.50%)</span>
              <span class="calc-row-val">€{{ calcPlatformFee.toFixed(2) }}</span>
            </div>
            <div class="calc-row">
              <span class="calc-row-label">Network fee (0.20%)</span>
              <span class="calc-row-val">€{{ calcNetworkFee.toFixed(2) }}</span>
            </div>
            <div class="calc-row calc-row--earn">
              <span class="calc-row-label">Your platform earns ({{ (calcPartnerShare * 100).toFixed(1) }}%)</span>
              <span class="calc-row-val earn-val">€{{ calcPartnerEarns.toFixed(2) }}</span>
            </div>
            <hr class="rule-eq" style="margin: 0.5rem 0" />
            <div class="calc-row calc-row--total">
              <span class="calc-row-label">User receives</span>
              <span class="calc-row-val total-val">€{{ calcUserReceives.toFixed(2) }}</span>
            </div>
          </div>
          <p class="calc-note" aria-label="Transparency note">
            ◈ Every line shown to user before confirmation
          </p>
        </div>
      </div>
    </section>

    <!-- Trust strip -->
    <section class="trust" aria-labelledby="trust-h">
      <div class="section-inner">
        <p id="trust-h" class="label eyebrow" style="margin-bottom:1.5rem">Why it works</p>
        <div class="trust-grid">
          <div v-for="item in trust" :key="item.label" class="trust-item">
            <span class="trust-bullet" aria-hidden="true">◈</span>
            <div>
              <p class="trust-label">{{ item.label }}</p>
              <p class="trust-detail">{{ item.detail }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trust grid (6-card) -->
    <section class="trust-six" aria-labelledby="trust-six-h">
      <div class="section-inner">
        <div class="section-header">
          <p class="label eyebrow">WHAT'S BUILT IN</p>
          <h2 id="trust-six-h" class="section-headline" ref="sec2h" data-grad-sweep>EVERY PART OF THE STACK YOU'D HAVE TO BUILD YOURSELF.</h2>
        </div>
        <div class="trust-six-grid">
          <div v-for="item in trustSix" :key="item.label" class="trust-six-card">
            <div class="trust-six-icon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" :aria-label="item.label">
                <path :d="item.iconPath" stroke="var(--ink)" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <p class="trust-six-label">{{ item.label }}</p>
            <p class="trust-six-detail">{{ item.detail }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials" aria-labelledby="testimonials-h">
      <div class="section-inner">
        <div class="section-header">
          <h2 id="testimonials-h" class="section-headline">WHAT TEAMS SAY</h2>
        </div>
        <div class="testimonials-grid">
          <figure
            v-for="(t, i) in testimonials"
            :key="i"
            class="testimonial-card"
          >
            <blockquote class="testimonial-quote">{{ t.quote }}</blockquote>
            <figcaption class="testimonial-attr">— {{ t.attr }}</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- Payment Flow Section -->
    <section class="flow-section" aria-labelledby="flow-h">
      <div class="section-inner">
        <div class="section-header">
          <p class="label eyebrow">Infrastructure</p>
          <h2 id="flow-h" class="section-headline">The complete payment infrastructure</h2>
        </div>
        <p class="flow-sub">From user intent to settled ledger entry — every step automated.</p>
        <PaymentFlowSvg theme="light" />
      </div>
    </section>

    <!-- Code Block Section -->
    <section class="code-section" aria-labelledby="code-h">
      <div class="section-inner">
        <div class="section-header">
          <p class="label eyebrow">Integration</p>
          <h2 id="code-h" class="section-headline">Integrate in minutes</h2>
        </div>
        <div class="code-block-wrap">
          <CodeBlock
            :code="integrationCode"
            language="js"
            :selfType="true"
            :copyable="true"
          />
        </div>
      </div>
    </section>

    <!-- Trust Logo Strip -->
    <section class="trust-logos-section" aria-labelledby="trust-logos-h">
      <div class="section-inner trust-logos-inner">
        <p id="trust-logos-h" class="label eyebrow trust-logos-caption">Compliance-ready by design</p>
        <TrustLogoStrip :marquee="true" />
      </div>
    </section>

    <!-- Social Proof / Partners -->
    <section class="partners-say" aria-labelledby="partners-say-h" data-reveal="fade-up">
      <div class="section-inner">
        <div class="section-header">
          <p class="label eyebrow">Social proof · Simulated companies · Genuine results</p>
          <h2 id="partners-say-h" class="section-headline">WHAT THEY SAID.</h2>
        </div>
        <div class="partners-grid" ref="partnersGrid" data-animate-stagger>
          <figure class="partner-card" v-for="t in partnerTestimonials" :key="t.badge">
            <blockquote class="partner-quote">{{ t.quote }}</blockquote>
            <figcaption class="partner-attr">
              <span class="partner-role">{{ t.role }}</span>
              <span class="partner-company">{{ t.company }}</span>
            </figcaption>
            <span class="partner-badge">{{ t.badge }}</span>
          </figure>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-dark" aria-labelledby="cta-h">
      <div class="cta-iris-bar iris-stripe" aria-hidden="true" />
      <div class="section-inner cta-inner">
        <div class="cta-content">
          <p class="label" style="color:rgba(255,255,255,0.65)">Ready when you are</p>
          <h2 id="cta-h" class="cta-headline">Open the demo. See the full flow.</h2>
          <p class="cta-micro">No wallet required. No real money moves. No small print hiding in a cupboard.</p>
        </div>
        <div class="cta-actions">
          <a href="http://localhost:5001" target="_blank" rel="noopener noreferrer" class="cta-btn cta-btn--primary">Open consumer demo →</a>
          <RouterLink to="/swiss/product" class="cta-btn cta-btn--secondary">See all features</RouterLink>
          <RouterLink to="/swiss/pricing" class="cta-btn cta-btn--secondary">Pricing details</RouterLink>
        </div>
        <div class="cta-stub font-mono" aria-hidden="true">
          <div class="stub-row"><span class="muted">Status</span><span>Demo ready</span></div>
          <div class="stub-row"><span class="muted">Wallet required</span><span>No</span></div>
          <div class="stub-row"><span class="muted">Real money</span><span>No</span></div>
          <div class="stub-row"><span class="muted">Hidden fees</span><span>Also no</span></div>
          <div class="stub-row"><span class="muted">Support</span><span>Human</span></div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useBackendData } from '@/composables/useBackendData'
import SwissFloatingPlanes from '@/components/three/SwissFloatingPlanes.vue'
import BrowserMockup from '../../../components/shared/BrowserMockup.vue'
import CounterStat from '../../../components/shared/CounterStat.vue'
import PaymentFlowSvg from '../../../components/shared/PaymentFlowSvg.vue'
import CodeBlock from '../../../components/shared/CodeBlock.vue'
import TrustLogoStrip from '../../../components/shared/TrustLogoStrip.vue'
import { useScrollReveal } from '../../../composables/useScrollReveal'
import { useClipReveal, useGradientSweep } from '@/composables/useSplitReveal'
import { useMagneticButton } from '@/composables/useMagneticButton'
import { useCardTiltAll } from '@/composables/useCardTilt'
import WidgetDemo from '@/components/shared/WidgetDemo.vue'

// ── Partners testimonials grid tilt ──────────────────────────────
const partnersGrid = ref<HTMLElement | null>(null)
useCardTiltAll(partnersGrid, '.partner-card', { maxTilt: 3, scale: 1.01, glowColor: '#34d399', glowIntensity: 0.1 })

const partnerTestimonials = [
  {
    quote: 'We embedded Prodigy on a Thursday. The compliance team signed off on Friday. That has never happened before.',
    role: 'CTO · Series B Neobank',
    company: 'NordPay, Berlin (simulated)',
    badge: '47s avg KYC',
  },
  {
    quote: 'Our KYC drop-off went from 23% to 6% in a single sprint. We stopped losing customers at the most critical moment.',
    role: 'Head of Product · Crypto Exchange',
    company: 'SwapDeck, London (simulated)',
    badge: '3× volume growth',
  },
  {
    quote: 'First fintech partner to give us a compliance audit trail that actually reconciles. We renewed before the trial period ended.',
    role: 'Head of Compliance · Wealth Platform',
    company: 'Meridian Wealth, Zurich (simulated)',
    badge: '0 audit flags',
  },
]

// ── WOW Animations ───────────────────────────────────────────────
const heroTitle = ref<HTMLElement | null>(null)
const heroSub = ref<HTMLElement | null>(null)
const ctaBtn = ref<HTMLElement | null>(null)
const sec1h = ref<HTMLElement | null>(null)
const sec2h = ref<HTMLElement | null>(null)

useClipReveal(heroTitle, { direction: 'up', duration: 1.0, delay: 0.2 })
useClipReveal(heroSub, { direction: 'up', duration: 1.0, delay: 0.5 })
useMagneticButton(ctaBtn, { strength: 0.25, returnDuration: 600 })
useGradientSweep(sec1h, { color: '#34d399', duration: 1000 })
useGradientSweep(sec2h, { color: '#34d399', duration: 1000 })

// ── Live prices from backend (or simulation fallback) ────────────
const { prices: livePrices } = useBackendData()

// Map MarketPrice[] → keyed lookup for backward-compat price chips
interface PriceMap { BTC: number; ETH: number; SOL: number; [k: string]: number }
const liveP = computed<PriceMap>(() => {
  const map: PriceMap = { BTC: 58234, ETH: 3102, SOL: 148 }
  for (const p of livePrices.value) {
    map[p.currency] = p.midPrice
  }
  return map
})

// ── Fee calculator ───────────────────────────────────────────────
const calcAmount = ref(1000)
const calcCurrency = ref('BTC')
const calcPartnerShare = ref(0.2)
const calcPlatformFee = computed(() => calcAmount.value * 0.005)
const calcNetworkFee = computed(() => calcAmount.value * 0.002)
const calcPartnerEarns = computed(() => calcAmount.value * calcPartnerShare.value / 100)
const calcUserReceives = computed(() => calcAmount.value - calcPlatformFee.value - calcNetworkFee.value)

// ── Scroll reveal for stats row ──────────────────────────────────
const { revealRef: statsRef } = useScrollReveal({ type: 'fade-up', threshold: 0.1 })

// ── Integration code for CodeBlock ───────────────────────────────
const integrationCode = `import { ProdigyWidget } from '@prodigy/widget'

const widget = new ProdigyWidget({
  b2bClientId: 'acme_prod_abc123',
  theme: 'light',
  onSuccess: (tx) => console.log('Settled:', tx.id)
})

widget.mount('#checkout')`

const journeySteps = [
  {
    title: 'Your app embeds the widget',
    detail: 'One script tag. Your brand, your colours, your fee schedule. Live within the afternoon.',
  },
  {
    title: 'User enters amount',
    detail: 'The widget fetches a live rate and shows the full fee breakdown — platform fee, network fee, what arrives on the other side. Before any button is pressed.',
  },
  {
    title: 'User confirms',
    detail: 'The same receipt, one more time. This is the confirmation screen. What they see here is exactly what happens.',
  },
  {
    title: 'KYC and risk run',
    detail: 'For first-time users: a 47-second identity check inside the widget. Every check logged. Pass rate: 93.1%.',
  },
  {
    title: 'Settled and posted',
    detail: 'Transaction ledger updated. Partner share posted to your portal. Admin console shows everything. No phone call required.',
  },
]

const stepEls = ref<HTMLElement[]>([])
let stepObserver: IntersectionObserver | null = null

const trustSix = [
  {
    label: 'Pre-confirm fee disclosure',
    detail: 'Every fee shown before confirmation. No small print.',
    iconPath: 'M2 4h12v8H2zM5 4V2.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V4M5 8h6M5 10.5h4',
  },
  {
    label: 'KYC built-in',
    detail: 'Identity check inside the widget. Pass rate 93.1%.',
    iconPath: 'M8 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM2 14s-0.5-5 6-5 6 5 6 5M11 7l1.5 1.5L15 6',
  },
  {
    label: 'Immutable audit trail',
    detail: 'Every transaction logged with timestamp and outcome.',
    iconPath: 'M2 2h12v12H2zM5 6h6M5 8.5h6M5 11h4M13 1l2 2-2 2',
  },
  {
    label: 'Risk monitoring',
    detail: '12 automated checks per transaction. Manual override queue.',
    iconPath: 'M8 2L2 5v4c0 3.3 2.6 6.4 6 7 3.4-0.6 6-3.7 6-7V5L8 2zM8 6v4M8 11.5v0.5',
  },
  {
    label: 'Partner revenue share',
    detail: 'Configurable in admin. Posted per transaction.',
    iconPath: 'M1 8h14M8 1l5 7-5 7M3 4l-2 4 2 4',
  },
  {
    label: 'Real-time admin console',
    detail: 'Full visibility: KYC queue, risk flags, all transactions.',
    iconPath: 'M1 1h14v10H1zM4 14h8M8 11v3M4 4h3M4 7h8M9 4h3',
  },
]

const problemPoints = [
  'Fees appear after the fact, in small print, formatted like a legal document',
  'Compliance is invisible until it fails',
  'Admin teams have no idea what the widget is doing',
  'Partners track revenue in exported CSV files from 2019',
  'Users abandon flows they do not understand',
]

const trust = [
  { label: 'Transparent fees', detail: 'Shown before anyone presses anything interesting.' },
  { label: 'KYC-ready flow', detail: 'Identity checks built into the widget, not bolted on later.' },
  { label: 'Risk review', detail: 'Automated checks with manual override for edge cases.' },
  { label: 'Audit trail', detail: 'Every event logged. Every state change visible.' },
  { label: 'Partner dashboard', detail: 'Revenue tracking without spreadsheet archaeology.' },
  { label: 'Admin console', detail: 'Your ops team sees what the widget does, always.' },
  { label: 'Regulation-ready', detail: 'KYC, risk scoring, and audit trail built in. Fewer 2 a.m. questions.' },
  { label: 'One-afternoon embed', detail: 'One line of code. A motivated developer has it running before lunch.' },
]

const stats = [
  { n: '< 200ms', label: 'Quote generation', sub: 'Real-time pricing, every time' },
  { n: '99.97%', label: 'Uptime SLA', sub: 'Built for production-grade reliability' },
  { n: '1 line', label: 'To embed the widget', sub: 'Copy. Paste. Done.' },
  { n: '100%', label: 'Fee visibility', sub: 'Before the user presses anything important' },
]

// ── Testimonials ─────────────────────────────────────────────────
const testimonials = [
  {
    quote: 'We went from 6 months of KYC integration to 3 lines of code. Prodigy is the infrastructure layer we never had to build.',
    attr: 'Sarah K., Head of Product, NordPay',
  },
  {
    quote: 'Our conversion rate jumped 34% after switching. The widget just works — no edge cases, no compliance headaches.',
    attr: 'Marcus T., CTO, SwapDeck',
  },
  {
    quote: 'We launched in 3 new markets in Q3 because Prodigy handles all the local compliance. It\'s transformative.',
    attr: 'Ingrid M., CEO, Meridian Wealth',
  },
]

const tickerBase = [
  'BTC/EUR 58,234 ▲','ETH/EUR 3,102 ▲','USDT/EUR 0.9214 ▼','SOL/EUR 147.80 ▲',
  'KYC approved','Fee visible before confirm','Partner share posted','Risk: clear','No surprises',
]
const tickerItems = [...tickerBase, ...tickerBase]

interface Price { sym: string; val: string; dir: 'up' | 'down' }

// Derive price chips from live composable data
const prevPrices = ref({ BTC: 58234, ETH: 3102, SOL: 147 })
const prices = computed<Price[]>(() => {
  const chips: Price[] = [
    {
      sym: 'BTC',
      val: `€${Math.round(liveP.value.BTC).toLocaleString('de-DE')}`,
      dir: liveP.value.BTC >= prevPrices.value.BTC ? 'up' : 'down',
    },
    {
      sym: 'ETH',
      val: `€${Math.round(liveP.value.ETH).toLocaleString('de-DE')}`,
      dir: liveP.value.ETH >= prevPrices.value.ETH ? 'up' : 'down',
    },
    {
      sym: 'SOL',
      val: `€${Math.round(liveP.value.SOL).toLocaleString('de-DE')}`,
      dir: liveP.value.SOL >= prevPrices.value.SOL ? 'up' : 'down',
    },
  ]
  prevPrices.value = { BTC: liveP.value.BTC, ETH: liveP.value.ETH, SOL: liveP.value.SOL }
  return chips
})

// ── Marquee ───────────────────────────────────────────────────────
const marqueeItems = ['⚡ 47s KYC', '🌍 50+ countries', '🔒 PCI DSS', '📊 Real-time dashboard', '🏦 Built-in KYC', '💸 0.5% flat fee', '🛡 AML screening', '⚙ One SDK', '📱 Mobile-ready', '🔌 REST + webhooks', '✅ No compliance headache', '🚀 One afternoon']

// ── Live activity feed ────────────────────────────────────────────
interface ActivityItem { id: number; flag: string; text: string; time: string }
const allActivity: ActivityItem[] = [
  { id: 1,  flag: '🇩🇪', text: 'NeoBank user bought 0.0031 BTC', time: 'just now' },
  { id: 2,  flag: '🇬🇧', text: 'Exchange partner earned €4.20 fee', time: '8s ago' },
  { id: 3,  flag: '🇳🇱', text: 'KYC approved in 44s', time: '15s ago' },
  { id: 4,  flag: '🇨🇭', text: 'Wealth platform settled €2,400', time: '22s ago' },
  { id: 5,  flag: '🇫🇷', text: 'SDK initialized — first transaction', time: '31s ago' },
  { id: 6,  flag: '🇸🇪', text: 'Partner portal payout: €249', time: '44s ago' },
  { id: 7,  flag: '🇦🇹', text: 'AML check passed automatically', time: '58s ago' },
  { id: 8,  flag: '🇮🇪', text: 'White-label widget deployed', time: '1m ago' },
]
const visibleActivity = ref<ActivityItem[]>(allActivity.slice(0, 4))
const activityIdx = ref(4)
let activityTimer: ReturnType<typeof setInterval>

onMounted(() => {
  stepObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('step-visible')
        }
      })
    },
    { threshold: 0.15 }
  )
  stepEls.value.forEach((el) => {
    if (el) stepObserver!.observe(el)
  })
  activityTimer = setInterval(() => {
    const next = allActivity[activityIdx.value % allActivity.length]!
    visibleActivity.value = [{ ...next, id: Date.now(), time: 'just now' }, ...visibleActivity.value.slice(0, 3)]
    activityIdx.value++
  }, 3500)
})
onUnmounted(() => {
  stepObserver?.disconnect()
  clearInterval(activityTimer)
})
</script>

<style scoped>
/* ── Layout ── */
.section-inner { max-width: 1440px; margin: 0 auto; padding: 5rem 1.5rem; }

/* ── Hero ── */
.hero { border-bottom: 1px solid var(--ink); position: relative; overflow: hidden; }
.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1440px;
  margin: 0 auto;
  min-height: calc(100vh - 3.25rem);
  position: relative;
  z-index: 1;
}
.hero-left {
  padding: 3.5rem 3rem 3.5rem 1.5rem;
  border-right: 1px solid var(--ink);
  display: flex; flex-direction: column;
  justify-content: center; gap: 1.5rem;
}
.price-strip { display: flex; gap: 0.75rem; flex-wrap: wrap; }
.price-chip {
  display: inline-flex; align-items: center; gap: 0.4rem;
  font-family: 'Space Mono', monospace; font-size: 0.75rem;
  border: 1px solid var(--line); padding: 0.25rem 0.625rem;
}
.price-chip.up { color: #1a7a3c; border-color: #1a7a3c22; }
.price-chip.down { color: #c44; border-color: #c4422222; }
.price-chip .sym { font-weight: 700; color: var(--ink); }
.price-chip .val { color: var(--ink-mid); }

.eyebrow { margin: 0; }
.headline { display: flex; flex-direction: column; margin: 0; }
.line {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(4.5rem, 11vw, 9.5rem);
  font-weight: 900; line-height: 0.92;
  letter-spacing: -0.02em; text-transform: uppercase;
}
.sub { font-size: 1.125rem; line-height: 1.6; color: var(--ink-mid); max-width: 34ch; margin: 0; }
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
.demo-pills { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.pill {
  font-family: 'Space Mono', monospace; font-size: 0.75rem;
  letter-spacing: 0.06em; text-transform: uppercase;
  color: var(--ink-mid); text-decoration: none;
  border: 1px solid var(--ink-mid); padding: 0.25rem 0.625rem;
  transition: color 0.15s, border-color 0.15s;
}
.pill:hover { color: var(--ink); border-color: var(--ink); }
.microcopy { font-family: 'Space Mono', monospace; font-size: 0.75rem; letter-spacing: 0.04em; color: var(--ink-mid); margin: 0; }

.hero-right {
  padding: 3rem 1.5rem 3rem 3rem;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 1rem;
  background: #fafafa; position: relative; overflow: hidden;
}
.iris-orb {
  position: absolute; top: -80px; right: -80px;
  width: 340px; height: 340px;
  border-radius: 60% 40% 55% 45% / 50% 60% 40% 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 20%, #f093fb 40%, #f5576c 60%, #4facfe 80%, #00f2fe 100%);
  opacity: 0.12; filter: blur(40px);
  animation: orb-float 8s ease-in-out infinite;
  pointer-events: none;
}
@keyframes orb-float {
  0%, 100% { transform: translate(0,0); }
  50% { transform: translate(-20px,15px); }
}
.grid-dots {
  position: absolute; inset: 0;
  background-image: radial-gradient(circle, var(--line) 1px, transparent 1px);
  background-size: 24px 24px; opacity: 0.3; pointer-events: none;
}
.widget-card {
  background: var(--paper); border: 1.5px solid var(--ink);
  padding: 1.25rem; max-width: 360px; position: relative; z-index: 1;
  font-family: 'Space Mono', monospace; font-size: 0.8125rem;
}
.widget-header { display: flex; justify-content: space-between; margin-bottom: 0.75rem; }
.widget-brand { font-weight: 700; letter-spacing: 0.04em; }
.rule-dashed { border: none; border-top: 1px dashed var(--line); margin: 0.625rem 0; }
.rule-eq { border: none; border-top: 1px solid var(--line); margin: 0.625rem 0; }
.widget-rows { display: flex; flex-direction: column; gap: 0.3rem; }
.widget-row { display: flex; justify-content: space-between; }
.widget-row.small { font-size: 0.75rem; }
.widget-row.total { font-weight: 700; margin: 0.25rem 0; }
.muted { color: var(--ink-muted); }
.widget-btn-row { margin-top: 0.875rem; }
.widget-btn {
  width: 100%; font-family: 'Space Mono', monospace; font-size: 0.75rem;
  font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
  padding: 0.625rem; border: 1.5px solid var(--ink); background: none;
  color: var(--ink); cursor: not-allowed;
}

/* ── Ticker ── */
.ticker-wrap {
  overflow: hidden; background: var(--ink); color: var(--paper);
  border-bottom: 1px solid var(--ink); height: 2.75rem;
  display: flex; align-items: stretch;
}
.ticker-live {
  display: flex; align-items: center; gap: 0.5rem;
  padding: 0 1.25rem; border-right: 1px solid rgba(255,255,255,0.15);
  flex-shrink: 0;
}
.live-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #a9fe52; box-shadow: 0 0 6px #a9fe52;
  animation: dot-pulse 1.5s ease-in-out infinite;
}
@keyframes dot-pulse {
  0%, 100% { opacity: 0.5; transform: scale(0.85); }
  50% { opacity: 1; transform: scale(1); }
}
.live-label { font-family: 'Space Mono', monospace; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.14em; color: #a9fe52; }
.ticker-overflow { overflow: hidden; flex: 1; display: flex; align-items: center; }
.ticker-track { display: flex; white-space: nowrap; animation: ticker 32s linear infinite; }
@keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
.ticker-item { display: inline-flex; align-items: center; gap: 0.75rem; padding: 0 1.5rem; font-family: 'Space Mono', monospace; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.85); }
.sep { opacity: 0.3; font-size: 0.75rem; }

/* ── Stats ── */
.stats { border-bottom: 1px solid var(--ink); background: var(--paper); }
.stats-inner { display: grid; grid-template-columns: repeat(4, 1fr); max-width: 1440px; margin: 0 auto; }
.stat-cell { padding: 3rem 2rem; border-right: 1px solid var(--line); display: flex; flex-direction: column; gap: 0.5rem; }
.stat-cell:last-child { border-right: none; }
.stat-n { font-family: 'Barlow Condensed', sans-serif; font-size: clamp(2.5rem, 5vw, 4.5rem); font-weight: 900; line-height: 1; letter-spacing: -0.02em; }
.stat-label { font-family: 'Barlow Condensed', sans-serif; font-size: 1.125rem; font-weight: 700; text-transform: uppercase; letter-spacing: -0.01em; }
.stat-sub { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: var(--ink-mid); letter-spacing: 0.02em; line-height: 1.5; }

/* ── Problem ── */
.problem { border-bottom: 1px solid var(--ink); background: var(--paper); }
.section-header { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 3rem; }
.section-headline { font-family: 'Barlow Condensed', sans-serif; font-size: clamp(2rem, 4.5vw, 3.75rem); font-weight: 900; line-height: 1; letter-spacing: -0.02em; text-transform: uppercase; max-width: 28ch; margin: 0; }
.problem-body { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: start; }
.receipt-mock { background: #fafafa; border: 1px solid var(--line); padding: 1.25rem; font-family: 'Space Mono', monospace; font-size: 0.8125rem; }
.receipt-row-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
.stamp-err { border: 2px solid #c44; color: #c44; padding: 0.1em 0.4em; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; }
.mock-row { display: flex; justify-content: space-between; padding: 0.3rem 0; border-bottom: 1px solid var(--ink-faint); gap: 1rem; }
.crossed { text-decoration: line-through; color: var(--ink-muted); text-align: right; max-width: 24ch; }
.mock-note { margin-top: 0.75rem; color: var(--ink-muted); font-size: 0.75rem; letter-spacing: 0.04em; }
.problem-points { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0; }
.problem-point { display: flex; align-items: baseline; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid var(--line); font-size: 0.9375rem; line-height: 1.5; }
.problem-point:first-child { border-top: 1px solid var(--line); }
.point-n { font-size: 0.8125rem; color: var(--ink-muted); flex-shrink: 0; width: 1.5rem; }
.conclusion { border-top: 2px solid var(--ink); padding-top: 1.5rem; margin-top: 3rem; }
.conclusion p { font-family: 'Barlow Condensed', sans-serif; font-size: clamp(1.75rem, 3.5vw, 3rem); font-weight: 900; text-transform: uppercase; letter-spacing: -0.02em; line-height: 0.95; margin: 0; }

/* ── Trust ── */
.trust { border-bottom: 1px solid var(--ink); background: #fafafa; }
.trust-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; border: 1px solid var(--line); }
.trust-item { display: flex; align-items: flex-start; gap: 0.75rem; padding: 1.25rem; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); transition: background 0.18s; }
.trust-item:hover { background: #efefef; }
.trust-item:nth-child(4n) { border-right: none; }
.trust-item:nth-last-child(-n+4) { border-bottom: none; }
.trust-bullet { color: var(--ink-muted); font-size: 0.75rem; flex-shrink: 0; margin-top: 1px; }
.trust-label { font-family: 'Space Mono', monospace; font-size: 0.8125rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; margin: 0 0 0.25rem; }
.trust-detail { font-size: 0.8125rem; color: var(--ink-mid); margin: 0; line-height: 1.5; }

/* ── CTA dark ── */
.cta-dark { background: var(--ink); color: var(--paper); position: relative; }
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
.cta-stub { border: 1px solid rgba(255,255,255,0.15); padding: 1rem; font-size: 0.75rem; display: flex; flex-direction: column; gap: 0; }
.stub-row { display: flex; justify-content: space-between; padding: 0.4rem 0; border-bottom: 1px solid rgba(255,255,255,0.08); }
.stub-row:last-child { border-bottom: none; }
.stub-row .muted { color: rgba(255,255,255,0.62); }

/* ── Receipt Journey ── */
.journey {
  border-bottom: 1px solid var(--ink);
  background-color: #ffffff;
  background-image:
    linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px);
  background-size: 24px 24px;
}
.journey-headline {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 0.95;
  margin: 0;
}
.journey-steps {
  list-style: none;
  margin: 2.5rem 0 0;
  padding: 0;
}
.journey-step {
  display: grid;
  grid-template-columns: 5rem 1fr;
  gap: 1.5rem;
  align-items: start;
  padding: 2rem 0;
  border-top: 1px solid var(--line);
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.journey-step:last-child { border-bottom: 1px solid var(--line); }
.journey-step.step-visible {
  opacity: 1;
  transform: translateY(0);
}
.journey-step:nth-child(2) { transition-delay: 0.08s; }
.journey-step:nth-child(3) { transition-delay: 0.16s; }
.journey-step:nth-child(4) { transition-delay: 0.24s; }
.journey-step:nth-child(5) { transition-delay: 0.32s; }
.step-num {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 5rem;
  font-weight: 900;
  line-height: 1;
  color: var(--ink);
  opacity: 0.12;
  user-select: none;
}
.step-body { padding-top: 0.5rem; }
.step-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.375rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  margin: 0 0 0.375rem;
}
.step-detail {
  font-family: 'Space Mono', monospace;
  font-size: 0.8125rem;
  line-height: 1.65;
  color: var(--ink-mid);
  margin: 0;
  max-width: 52ch;
}

/* ── Trust six grid ── */
.trust-six { border-bottom: 1px solid var(--ink); background: var(--paper); }
.trust-six-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border: 1px solid var(--line);
  margin-top: 2.5rem;
}
.trust-six-card {
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  padding: 1.5rem;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: background 0.18s;
}
.trust-six-card:hover { background: #f5f5f5; }
.trust-six-card:nth-child(3n) { border-right: none; }
.trust-six-card:nth-last-child(-n+3) { border-bottom: none; }
.trust-six-icon {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 0.25rem;
}
.trust-six-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.8125rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 0;
  color: var(--ink);
}
.trust-six-detail {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  line-height: 1.55;
  color: var(--ink-mid);
  margin: 0;
}

/* ── Fee Calculator ── */
.fee-calc { border-bottom: 1px solid var(--ink); background: var(--paper); }
.calc-card {
  background: #fff;
  border: 1px solid var(--line);
  max-width: 520px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.calc-field { display: flex; flex-direction: column; gap: 0.375rem; }
.calc-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-mid);
}
.calc-share-val { color: var(--ink); font-weight: 700; }
.calc-input, .calc-select {
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
.calc-input:focus, .calc-select:focus { border-color: var(--ink); }
.calc-range { width: 100%; accent-color: var(--ink); cursor: pointer; }
.calc-range-labels {
  display: flex;
  justify-content: space-between;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: var(--ink-muted);
  margin-top: 0.125rem;
}
.calc-breakdown { display: flex; flex-direction: column; gap: 0.25rem; }
.calc-row {
  display: flex;
  justify-content: space-between;
  padding: 0.375rem 0;
  font-family: 'Space Mono', monospace;
  font-size: 0.8125rem;
  color: var(--ink-mid);
  border-bottom: 1px solid var(--ink-faint);
}
.calc-row:last-child { border-bottom: none; }
.calc-row-label { color: var(--ink-mid); }
.calc-row-val { color: var(--ink); }
.calc-row--earn .earn-val { color: #1a7a3c; font-weight: 700; }
.calc-row--total { padding-top: 0.5rem; }
.calc-row--total .calc-row-label { font-weight: 700; color: var(--ink); }
.calc-row--total .total-val { font-weight: 700; color: var(--ink); font-size: 0.9375rem; }
.calc-note {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  color: #1a7a3c;
  margin: 0;
}

/* ── Testimonials ── */
.testimonials { border-bottom: 1px solid var(--ink); background: #fafafa; }
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border: 1px solid var(--line);
  margin-top: 2.5rem;
}
.testimonial-card {
  background: #fff;
  border-right: 1px solid var(--line);
  padding: 1.75rem 1.5rem 1.5rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-top: 3px solid transparent;
  border-image: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe) 1;
  transition: background 0.18s;
}
.testimonial-card:last-child { border-right: none; }
.testimonial-card:hover { background: #f5f5f5; }
.testimonial-quote {
  font-family: 'Space Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.65;
  color: var(--ink-mid);
  margin: 0;
  flex: 1;
}
.testimonial-attr {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--ink);
  letter-spacing: 0.04em;
}

/* ── Utilities ── */
.font-mono { font-family: 'Space Mono', monospace; }
.label { font-family: 'Space Mono', monospace; font-size: 0.8125rem; font-weight: 400; letter-spacing: 0.15em; text-transform: uppercase; color: var(--ink-mid); }
.iris-text { background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe, #667eea); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: iris-shift 5s linear infinite; }
.iris-stripe { animation: iris-shift 5s linear infinite; }

/* ── Animated Stats Row ── */
.stats-row { border-top: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; background: var(--paper); }
.stats-row-inner {
  display: flex;
  justify-content: space-around;
  padding: 48px 1.5rem;
  max-width: 1440px;
  margin: 0 auto;
}
.stats-row-inner .counter-stat { align-items: center; text-align: center; }
.stats-row-inner .stat-display {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--ink);
}
.stats-row-inner .stat-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-mid);
}

/* ── Payment Flow Section ── */
.flow-section { border-bottom: 1px solid var(--ink); background: #fafafa; }
.flow-sub { font-size: 1.0625rem; line-height: 1.65; color: var(--ink-mid); max-width: 52ch; margin: 0 0 2.5rem; }

/* ── Code Block Section ── */
.code-section { border-bottom: 1px solid var(--ink); background: var(--paper); }
.code-block-wrap { max-width: 680px; }

/* ── Trust Logo Strip Section ── */
.trust-logos-section { border-bottom: 1px solid var(--ink); background: #fafafa; }
.trust-logos-inner { display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }
.trust-logos-caption { margin: 0; text-align: center; }

/* ── Widget Preview Section ── */
.widget-preview-section {
  padding: 5rem 0;
  border-bottom: 1px solid var(--ink);
  background: var(--paper);
}
.widget-preview-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 4rem;
  align-items: center;
}
.widget-preview-text h2 { margin-bottom: 1rem; }
.widget-preview-text p { font-size: 1.0625rem; line-height: 1.65; color: var(--ink-mid); max-width: 40ch; margin: 0; }
@media (max-width: 768px) {
  .widget-preview-inner { grid-template-columns: 1fr; }
}

/* ── Partners Say ── */
.partners-say { border-bottom: 1px solid var(--ink); background: var(--paper); }
.partners-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border: 1px solid var(--line);
  margin-top: 2.5rem;
}
.partner-card {
  background: #fff;
  border: 1px solid #0a0a0a;
  padding: 1.75rem 1.5rem 1.5rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-right: 1px solid var(--line);
  border-bottom: none;
  position: relative;
}
.partner-card:last-child { border-right: none; }
.partner-quote {
  font-family: 'Space Mono', monospace;
  font-style: italic;
  font-size: 0.875rem;
  line-height: 1.65;
  color: var(--ink-mid);
  margin: 0;
  flex: 1;
}
.partner-attr {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}
.partner-role {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--ink);
  letter-spacing: 0.04em;
}
.partner-company {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: var(--ink-muted);
}
.partner-badge {
  display: inline-block;
  align-self: flex-start;
  background: #34d399;
  color: #0a0a0a;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.625rem;
  border-radius: 99px;
  letter-spacing: 0.04em;
}
@media (max-width: 768px) {
  .partners-grid { grid-template-columns: 1fr; }
  .partner-card { border-right: none; border-bottom: 1px solid var(--line); }
  .partner-card:last-child { border-bottom: none; }
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .stats-row-inner { flex-direction: column; align-items: center; gap: 2rem; padding: 2.5rem 1.5rem; }
  .section-inner { padding: 3.5rem 1rem; }
  .code-block-wrap { overflow-x: auto; }
}

@media (max-width: 480px) {
  .stats-inner { grid-template-columns: 1fr; }
  .stat-cell { border-right: none; }
  .section-inner { padding: 2.5rem 1rem; }
  .cta-inner { gap: 2rem; }
}

@media (max-width: 900px) {
  .testimonials-grid { grid-template-columns: 1fr; }
  .testimonial-card { border-right: none; border-bottom: 1px solid var(--line); }
  .testimonial-card:last-child { border-bottom: none; }
  .journey-step { grid-template-columns: 3.5rem 1fr; }
  .step-num { font-size: 3.5rem; }
  .trust-six-grid { grid-template-columns: repeat(2, 1fr); }
  .trust-six-card:nth-child(3n) { border-right: 1px solid var(--line); }
  .trust-six-card:nth-child(2n) { border-right: none; }
  .trust-six-card:nth-last-child(-n+3) { border-bottom: 1px solid var(--line); }
  .trust-six-card:nth-last-child(-n+2) { border-bottom: none; }
  .hero-inner { grid-template-columns: 1fr; min-height: auto; }
  .hero-left { border-right: none; border-bottom: 1px solid var(--ink); padding: 3rem 1.5rem; }
  .hero-right { padding: 2.5rem 1.5rem; align-items: center; }
  .stats-inner { grid-template-columns: repeat(2, 1fr); }
  .stat-cell { border-bottom: 1px solid var(--line); }
  .stat-cell:nth-child(2n) { border-right: none; }
  .stat-cell:nth-last-child(-n+2) { border-bottom: none; }
  .problem-body { grid-template-columns: 1fr; }
  .trust-grid { grid-template-columns: repeat(2, 1fr); }
  .trust-item:nth-child(4n) { border-right: 1px solid var(--line); }
  .trust-item:nth-child(2n) { border-right: none; }
  .trust-item:nth-last-child(-n+4) { border-bottom: 1px solid var(--line); }
  .trust-item:nth-last-child(-n+2) { border-bottom: none; }
  .cta-inner { grid-template-columns: 1fr; gap: 2.5rem; }
}

@media (max-width: 500px) {
  .trust-grid { grid-template-columns: 1fr; }
  .trust-item { border-right: none; }
  .trust-item:nth-last-child(n) { border-bottom: 1px solid var(--line); }
  .trust-item:last-child { border-bottom: none; }
  .trust-six-grid { grid-template-columns: 1fr; }
  .trust-six-card { border-right: none; border-bottom: 1px solid var(--line); }
  .trust-six-card:last-child { border-bottom: none; }
  .journey-step { grid-template-columns: 2.75rem 1fr; gap: 1rem; }
}

@media (prefers-reduced-motion: reduce) {
  .iris-orb, .ticker-track, .cta-iris-bar { animation: none; }
  .live-dot { animation: none; opacity: 1; }
  .journey-step { opacity: 1; transform: none; transition: none; }
}

/* ── Feature Marquee Strip ── */
.marquee-wrap {
  overflow: hidden;
  border-top: 1px solid var(--ink);
  border-bottom: 1px solid var(--ink);
  padding: 0.875rem 0;
  background: var(--paper);
}
.marquee-track {
  display: flex;
  gap: 1.5rem;
  width: max-content;
  animation: marquee-scroll 40s linear infinite;
}
.marquee-pill {
  white-space: nowrap;
  font-size: 0.8125rem;
  font-weight: 500;
  padding: 0.375rem 0.875rem;
  border-radius: 99px;
  border: 1px solid var(--ink);
  background: transparent;
  color: var(--ink);
  font-family: 'IBM Plex Mono', 'Space Mono', monospace;
}
@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@media (prefers-reduced-motion: reduce) {
  .marquee-track { animation: none; }
}

/* ── Live Activity Feed ── */
.activity-feed {
  max-width: 360px;
  margin: 0 auto 0 1.5rem;
  border: 1px solid var(--line);
  border-radius: 4px;
  padding: 1rem;
  background: var(--paper);
  position: relative;
}
.activity-header { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; }
.activity-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: #34d399;
  animation: act-pulse 1.5s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes act-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.8)} }
.activity-label { font-family: 'Space Mono', monospace; font-size: 0.75rem; font-weight: 600; color: #34d399; text-transform: uppercase; letter-spacing: 0.06em; }
.activity-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem; position: relative; min-height: 6rem; }
.activity-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.8125rem; }
.activity-flag { font-size: 1rem; flex-shrink: 0; }
.activity-text { color: var(--ink-mid); flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-family: 'Space Mono', monospace; }
.activity-time { font-size: 0.6875rem; color: var(--ink-muted); white-space: nowrap; flex-shrink: 0; font-family: 'Space Mono', monospace; }
.activity-disclaimer { font-size: 0.6875rem; color: var(--ink-muted); margin-top: 0.5rem; font-style: italic; }
.activity-slide-enter-active { transition: all 0.4s ease; }
.activity-slide-enter-from { opacity: 0; transform: translateY(-8px); }
.activity-slide-leave-active { transition: all 0.3s ease; position: absolute; }
.activity-slide-leave-to { opacity: 0; transform: translateY(8px); }
</style>
