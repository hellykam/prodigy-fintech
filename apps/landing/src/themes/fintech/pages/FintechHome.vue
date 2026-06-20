<template>
  <main class="ft-home">

    <!-- System header bar -->
    <div class="ft-home__sysbar">
      <span>PRODIGY INFRASTRUCTURE SERVICES</span>
      <span class="ft-home__sysbar-dot">·</span>
      <span class="ft-home__status">SYSTEM STATUS: <em>OPERATIONAL</em></span>
      <span class="ft-home__sysbar-dot">·</span>
      <span>2026-06-18</span>
    </div>

    <hr class="ft-rule" />

    <!-- Hero — split layout -->
    <section class="ft-home__hero">
      <FintechDataRain />
      <div ref="heroSection" class="ft-home__hero-left">
        <div class="ft-home__hero-label">REF: PRD-001 · PRODUCT OVERVIEW</div>
        <h1 class="ft-home__headline">
          <span class="ft-home__typed">{{ displayText }}</span><span class="ft-home__cursor" :class="{ hidden: cursorHidden }">_</span>
        </h1>
        <p class="ft-home__subhead">
          One script tag. Full compliance. Complete fee transparency.<br />
          Everything your users need to know, before they confirm.
        </p>
        <div class="ft-home__hero-actions">
          <a
            href="http://localhost:5001"
            target="_blank"
            rel="noopener noreferrer"
            class="ft-btn ft-btn--primary"
          >REQUEST DEMO ACCESS →</a>
          <RouterLink to="/fintech/product" class="ft-btn ft-btn--ghost">VIEW SPECIFICATIONS</RouterLink>
        </div>
      </div>

      <div class="ft-home__hero-right">
        <BrowserMockup :tiltDeg="-5">
          <div class="ft-dash">
            <div class="ft-dash__header">
              <span class="ft-dash__title">Prodigy Analytics — Live</span>
              <span class="ft-dash__dot ft-dash__dot--live">● LIVE</span>
            </div>
            <div class="ft-dash__rows">
              <div class="ft-dash__row">
                <span class="ft-dash__key">Settlement rate</span>
                <span class="ft-dash__val ft-dash__val--up">99.97% ↑</span>
              </div>
              <div class="ft-dash__row">
                <span class="ft-dash__key">Avg processing time</span>
                <span class="ft-dash__val">47ms</span>
              </div>
              <div class="ft-dash__row">
                <span class="ft-dash__key">Active transactions</span>
                <span class="ft-dash__val">12</span>
              </div>
            </div>
            <div class="ft-dash__sparkline" aria-hidden="true">
              <div class="ft-dash__bar" style="height: 28px; background: #1a7a1a;" />
              <div class="ft-dash__bar" style="height: 44px; background: #1a7a1a;" />
              <div class="ft-dash__bar" style="height: 36px; background: #b85c00;" />
              <div class="ft-dash__bar" style="height: 56px; background: #1a7a1a;" />
              <div class="ft-dash__bar" style="height: 48px; background: #1a7a1a;" />
            </div>
          </div>
        </BrowserMockup>
      </div>
    </section>

    <hr class="ft-rule" />

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

    <hr class="ft-rule" />

    <!-- Bloomberg-style ticker bar -->
    <div class="ft-ticker" aria-label="Live market data">
      <div class="ft-ticker__inner">
        <span
          v-for="item in tickerItems"
          :key="item.label"
          class="ft-ticker__item"
        >
          <span class="ft-ticker__label">{{ item.label }}</span>
          <span class="ft-ticker__price">{{ item.price }}</span>
          <span
            class="ft-ticker__change"
            :class="item.positive ? 'ft-ticker__change--up' : 'ft-ticker__change--down'"
          >{{ item.change }}</span>
          <span class="ft-ticker__sep" aria-hidden="true">|</span>
        </span>
        <span class="ft-ticker__item">
          <span class="ft-ticker__label">Spread</span>
          <span class="ft-ticker__price">0.03%</span>
        </span>
      </div>
    </div>

    <hr class="ft-rule" />

    <!-- CounterStat row -->
    <section class="ft-home__counters" ref="countersRef">
      <div ref="sec1Label" class="ft-home__counters-label">PERFORMANCE METRICS · CURRENT PERIOD</div>
      <div class="ft-home__counters-grid">
        <CounterStat :value="3"     suffix=" BPS"  label="Platform Fee"     :duration="600" />
        <CounterStat :value="2"     prefix="< "    suffix="s" label="Settlement"  :duration="500" />
        <CounterStat :value="9997"  suffix="%"     label="Uptime"           :duration="900" />
        <CounterStat :value="47"    suffix="ms"    label="Avg Processing"   :duration="700" />
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- Stats: dense 4-column data table -->
    <section class="ft-home__stats">
      <div class="ft-home__stats-label">PERFORMANCE METRICS · CURRENT PERIOD</div>
      <div class="ft-home__stats-wrap">
      <table class="ft-table ft-table--stats">
        <thead>
          <tr>
            <th>METRIC</th>
            <th>VALUE</th>
            <th>VERIFIED</th>
            <th>SLA</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>QUOTE LATENCY</td>
            <td class="ft-value">&lt; 200ms</td>
            <td class="ft-ok">✓</td>
            <td>P99</td>
          </tr>
          <tr>
            <td>UPTIME SLA</td>
            <td class="ft-value">99.97%</td>
            <td class="ft-ok">✓</td>
            <td>MONTHLY</td>
          </tr>
          <tr>
            <td>INTEGRATION</td>
            <td class="ft-value">1 LINE OF CODE</td>
            <td class="ft-ok">✓</td>
            <td>IMMUTABLE</td>
          </tr>
          <tr>
            <td>FEE VISIBILITY</td>
            <td class="ft-value">100% PRE-CONFIRMATION</td>
            <td class="ft-ok">✓</td>
            <td>BY DESIGN</td>
          </tr>
        </tbody>
      </table>
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- Comparison table -->
    <section class="ft-home__compare">
      <div class="ft-home__compare-label">COMPETITIVE ANALYSIS · WHY PRODIGY WINS ON COMPLIANCE</div>
      <div class="ft-home__compare-wrap">
        <table class="ft-table ft-table--compare">
          <thead>
            <tr>
              <th>FEATURE</th>
              <th class="ft-th--prodigy">PRODIGY</th>
              <th>COMPETITOR A</th>
              <th>COMPETITOR B</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Settlement time</td>
              <td class="ft-cell--prodigy ft-ok">✓ &lt; 2s</td>
              <td class="ft-cell--comp">24–48h</td>
              <td class="ft-cell--comp">Same day</td>
            </tr>
            <tr>
              <td>KYC integration</td>
              <td class="ft-cell--prodigy ft-ok">✓ Built-in</td>
              <td class="ft-cell--comp">3rd party</td>
              <td class="ft-cell--comp">3rd party</td>
            </tr>
            <tr>
              <td>Fee structure</td>
              <td class="ft-cell--prodigy ft-ok">✓ 3 BPS<sup>*</sup></td>
              <td class="ft-cell--comp">25 BPS<sup>*</sup></td>
              <td class="ft-cell--comp">30 BPS<sup>*</sup></td>
            </tr>
            <tr>
              <td>Ledger audit</td>
              <td class="ft-cell--prodigy ft-ok">✓ Real-time</td>
              <td class="ft-cell--comp">Daily batch</td>
              <td class="ft-cell--comp">Daily batch</td>
            </tr>
            <tr>
              <td>Multi-currency</td>
              <td class="ft-cell--prodigy ft-ok">✓ EUR/GBP/USD + crypto</td>
              <td class="ft-cell--comp">EUR only</td>
              <td class="ft-cell--comp">EUR/USD</td>
            </tr>
            <tr>
              <td>Country risk engine</td>
              <td class="ft-cell--prodigy ft-ok">✓ Built-in</td>
              <td class="ft-cell--comp">Manual</td>
              <td class="ft-cell--comp">Manual</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="ft-home__footnote"><sup>*</sup> BPS = basis points (1/100th of a percent). 3 BPS = 0.03%.</p>
    </section>

    <hr class="ft-rule" />

    <!-- Problem statement -->
    <section class="ft-home__problem">
      <div class="ft-home__problem-label">PROBLEM STATEMENT · REF: PRD-002</div>
      <blockquote class="ft-home__quote">
        "The problem with most crypto infrastructure is not technical. It is epistemic. No one knows
        what is happening, least of all the user."
      </blockquote>
      <p class="ft-home__problem-body">
        Existing rails obscure fees until confirmation. Risk decisions are opaque. Compliance is
        bolted on after launch. Partner revenue requires spreadsheets. Prodigy resolves all four
        problems in a single embed.
      </p>
    </section>

    <hr class="ft-rule" />

    <!-- Feature list -->
    <section class="ft-home__features">
      <div ref="sec2Label" class="ft-home__features-label">FEATURE REGISTRY · STATUS: ALL ACTIVE</div>
      <table class="ft-table ft-table--features">
        <thead>
          <tr>
            <th>#</th>
            <th>FEATURE</th>
            <th>DESCRIPTION</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="ft-num">01</td>
            <td>1-LINE EMBED</td>
            <td>Single script tag. No SDK, no build step, no configuration files required.</td>
            <td class="ft-ok">ACTIVE</td>
          </tr>
          <tr>
            <td class="ft-num">02</td>
            <td>BUILT-IN KYC</td>
            <td>Sumsub-powered identity verification. Passes automatically with the widget.</td>
            <td class="ft-ok">ACTIVE</td>
          </tr>
          <tr>
            <td class="ft-num">03</td>
            <td>RISK ENGINE</td>
            <td>Real-time transaction risk scoring. Every transaction assessed before execution.</td>
            <td class="ft-ok">ACTIVE</td>
          </tr>
          <tr>
            <td class="ft-num">04</td>
            <td>LEDGER SYSTEM</td>
            <td>Full double-entry ledger. Every movement recorded with audit trail.</td>
            <td class="ft-ok">ACTIVE</td>
          </tr>
          <tr>
            <td class="ft-num">05</td>
            <td>ADMIN CONSOLE</td>
            <td>Real-time system visibility. You see what the user sees, plus everything they cannot.</td>
            <td class="ft-ok">ACTIVE</td>
          </tr>
          <tr>
            <td class="ft-num">06</td>
            <td>FEE TRANSPARENCY</td>
            <td>All fees — platform, partner, network — disclosed before user confirms.</td>
            <td class="ft-ok">ACTIVE</td>
          </tr>
          <tr>
            <td class="ft-num">07</td>
            <td>PARTNER REVENUE</td>
            <td>Configurable revenue share. Dashboard shows earnings in real time.</td>
            <td class="ft-ok">ACTIVE</td>
          </tr>
          <tr>
            <td class="ft-num">08</td>
            <td>PARTNER API</td>
            <td>Programmatic access to all data. Webhooks, REST, documented to specification.</td>
            <td class="ft-ok">ACTIVE</td>
          </tr>
        </tbody>
      </table>
    </section>

    <hr class="ft-rule" />

    <!-- Widget Preview -->
    <section class="ft-home__widget-preview" data-reveal="fade-up" aria-labelledby="ft-widget-preview-h">
      <div class="ft-home__widget-preview-inner">
        <div class="ft-home__widget-preview-text">
          <div class="ft-home__features-label">> WIDGET_PREVIEW · LIVE DEMONSTRATION</div>
          <h2 id="ft-widget-preview-h" class="ft-home__embed-heading">> WIDGET_PREVIEW</h2>
          <p class="ft-home__widget-preview-sub">Complete KYC flow. &lt;200ms API. 94.2% pass rate. Running now.</p>
        </div>
        <WidgetDemo theme="fintech" />
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- Technical spec sheet -->
    <section class="ft-home__spec">
      <div class="ft-home__spec-label">TECHNICAL SPECIFICATIONS · API REFERENCE</div>
      <div class="ft-home__spec-grid">
        <div
          v-for="(spec, i) in specRows"
          :key="spec.key"
          class="ft-home__spec-row"
          :class="{ 'ft-home__spec-row--alt': i % 2 === 1 }"
        >
          <span class="ft-home__spec-key">{{ spec.key }}</span>
          <span class="ft-home__spec-val">{{ spec.val }}</span>
        </div>
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- Trust logo strip -->
    <section class="ft-home__trust">
      <div class="ft-home__trust-label">COMPLIANCE-READY BY DESIGN</div>
      <TrustLogoStrip :marquee="false" />
    </section>

    <hr class="ft-rule" />

    <!-- Testimonials -->
    <section class="ft-home__testimonials" aria-label="Customer testimonials">
      <div class="ft-home__testimonials-label">USER_TESTIMONIALS.log · VERIFIED SOURCES</div>
      <div class="ft-home__testimonials-row">
        <div class="t-card">
          <p class="t-quote">"We went from 6 months of KYC integration to 3 lines of code. Prodigy is the infrastructure layer we never had to build."</p>
          <div class="t-author">
            <div class="t-avatar" aria-hidden="true">SK</div>
            <span class="t-name">Sarah K., Head of Product, NordPay</span>
          </div>
        </div>
        <div class="t-card">
          <p class="t-quote">"Our conversion rate jumped 34% after switching. The widget just works — no edge cases, no compliance headaches."</p>
          <div class="t-author">
            <div class="t-avatar" aria-hidden="true">MT</div>
            <span class="t-name">Marcus T., CTO, SwapDeck</span>
          </div>
        </div>
        <div class="t-card">
          <p class="t-quote">"We launched in 3 new markets in Q3 because Prodigy handles all the local compliance. It's transformative."</p>
          <div class="t-author">
            <div class="t-avatar" aria-hidden="true">IM</div>
            <span class="t-name">Ingrid M., CEO, Meridian Wealth</span>
          </div>
        </div>
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- Embed section -->
    <section class="ft-home__embed" aria-label="Integration code">
      <div class="ft-home__embed-label">INTEGRATION: THREE LINES</div>
      <div class="ft-home__embed-grid">
        <div class="ft-home__embed-left">
          <h2 ref="sec3Heading" class="ft-home__embed-heading">Integrate in an afternoon. Not a sprint.</h2>
          <p class="ft-home__embed-sub">
            One script tag. Your brand, your currencies, your fees. Everything ships with it — KYC, risk engine, ledger, fee receipts.
          </p>
          <RouterLink to="./developers" class="ft-btn ft-btn--ghost">DEVELOPER DOCS →</RouterLink>
        </div>
        <div class="ft-home__embed-right">
          <CodeBlock :code="ftEmbedCode" language="html" />
        </div>
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- Social Proof / Partners -->
    <section class="ft-partners-say" aria-label="What partners say" data-reveal="fade-up">
      <div class="ft-partners-say__label">> PARTNER_TESTIMONY.log</div>
      <p class="ft-partners-say__eyebrow">Social proof · Simulated companies · Genuine results</p>
      <div class="ft-partners-grid" ref="partnersGrid" data-animate-stagger>
        <figure class="ft-partner-card" v-for="t in partnerTestimonials" :key="t.badge">
          <blockquote class="ft-partner-quote">{{ t.quote }}</blockquote>
          <figcaption class="ft-partner-attr">
            <span class="ft-partner-role">{{ t.role }}</span>
            <span class="ft-partner-company">{{ t.company }}</span>
          </figcaption>
          <span class="ft-partner-badge">{{ t.badge }}</span>
        </figure>
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- Final CTA -->
    <section class="ft-home__cta">
      <div class="ft-home__cta-label">NEXT STEP · ACCESS REQUEST</div>
      <p class="ft-home__cta-body">
        The demo environment is fully operational. No commitment required.<br />
        All data is synthetic. All features are live.
      </p>
      <a
        href="http://localhost:5001"
        target="_blank"
        rel="noopener noreferrer"
        class="ft-btn ft-btn--primary ft-btn--lg"
      >REQUEST DEMO ACCESS →</a>
    </section>

    <hr class="ft-rule" />

    <!-- Footer strip -->
    <div class="ft-home__footer">
      <span>PRODIGY INFRASTRUCTURE SERVICES</span>
      <span>·</span>
      <span>ALL SYSTEMS OPERATIONAL</span>
      <span>·</span>
      <RouterLink to="/fintech/pricing" class="ft-home__footer-link">FEE SCHEDULE</RouterLink>
      <span>·</span>
      <RouterLink to="/fintech/partners" class="ft-home__footer-link">PARTNER TERMS</RouterLink>
    </div>

  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import BrowserMockup from '../../../components/shared/BrowserMockup.vue'
import CounterStat from '../../../components/shared/CounterStat.vue'
import TrustLogoStrip from '../../../components/shared/TrustLogoStrip.vue'
import CodeBlock from '@/components/shared/CodeBlock.vue'
import FintechDataRain from '@/components/three/FintechDataRain.vue'
import { useTextScramble } from '@/composables/useTextScramble'
import { useMagneticAll } from '@/composables/useMagneticButton'
import { useCardTiltAll } from '@/composables/useCardTilt'
import WidgetDemo from '@/components/shared/WidgetDemo.vue'

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

// ── Partners testimonials ─────────────────────────────────────────
const partnersGrid = ref<HTMLElement | null>(null)
useCardTiltAll(partnersGrid, '.ft-partner-card', { maxTilt: 4, scale: 1.015, glowColor: '#f59e0b', glowIntensity: 0.12 })

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

// ── Animation refs ────────────────────────────────────────────────
const heroSection = ref<HTMLElement | null>(null)
const sec1Label = ref<HTMLElement | null>(null)
const sec2Label = ref<HTMLElement | null>(null)
const sec3Heading = ref<HTMLElement | null>(null)

// Section headings scramble on scroll (visible trigger)
useTextScramble(sec1Label, { trigger: 'visible', style: 'mono', duration: 700 })
useTextScramble(sec2Label, { trigger: 'visible', style: 'mono', duration: 700 })
useTextScramble(sec3Heading, { trigger: 'visible', style: 'mono', duration: 700 })

// Magnetic CTAs on hero buttons
useMagneticAll(heroSection, 'a, button', { strength: 0.4, returnDuration: 500 })

const ftEmbedCode = `<script src="https://widget.prodigy.demo/embed.js"><\/script>
<div
  id="prodigy-widget"
  data-b2b-client="acme_001"
></div>`

// ── Typing animation ──────────────────────────────────────────────
const displayText = ref('')
const cursorHidden = ref(false)
const fullText = 'THE WIDGET THAT EXPLAINS ITSELF.'

let typingTimer: ReturnType<typeof setInterval>
let cursorTimer: ReturnType<typeof setInterval>

onMounted(() => {
  let i = 0
  typingTimer = setInterval(() => {
    displayText.value = fullText.slice(0, i++)
    if (i > fullText.length) {
      clearInterval(typingTimer)
      cursorTimer = setInterval(() => {
        cursorHidden.value = !cursorHidden.value
      }, 530)
    }
  }, 60)

  activityTimer = setInterval(() => {
    const next = allActivity[activityIdx.value % allActivity.length]!
    visibleActivity.value = [{ ...next, id: Date.now(), time: 'just now' }, ...visibleActivity.value.slice(0, 3)]
    activityIdx.value++
  }, 3500)
})

onUnmounted(() => {
  clearInterval(typingTimer)
  clearInterval(cursorTimer)
  clearInterval(activityTimer)
})

// ── Bloomberg ticker data (static) ────────────────────────────────
interface TickerItem {
  label: string
  price: string
  change: string
  positive: boolean
}

const tickerItems: TickerItem[] = [
  { label: 'BTC/EUR',  price: '€41,250.00', change: '▲ +1.2%',  positive: true  },
  { label: 'ETH/EUR',  price: '€2,180.00',  change: '▲ +0.8%',  positive: true  },
  { label: 'USDT/EUR', price: '€0.9998',    change: '▼ -0.01%', positive: false },
]

// ── Spec sheet rows ───────────────────────────────────────────────
interface SpecRow {
  key: string
  val: string
}

const specRows: SpecRow[] = [
  { key: 'API protocol',  val: 'REST + WebSocket' },
  { key: 'Auth',          val: 'API key + HMAC' },
  { key: 'Rate limit',    val: '1,000 req/min' },
  { key: 'Settlement',    val: 'T+0 (same second)' },
  { key: 'KYC provider',  val: 'Sumsub' },
  { key: 'Ledger type',   val: 'Double-entry' },
  { key: 'Currencies',    val: 'EUR, GBP, USD, BTC, ETH, USDT' },
  { key: 'Uptime SLA',    val: '99.99%' },
  { key: 'Audit logs',    val: 'Real-time, immutable' },
  { key: 'Data residency',val: 'EU (Amsterdam)' },
]
</script>

<style scoped>
.ft-home {
  --bg: #fafaf8;
  --ink: #0a0a0a;
  --accent: #b85c00;
  --blue: #1a4480;
  --muted: rgba(10, 10, 10, 0.45);
  --ok: #1a7a1a;
  --font: 'Space Mono', monospace;

  background: var(--bg);
  color: var(--ink);
  font-family: var(--font);
  padding: 0;
}

/* ─── Rules ─── */
.ft-rule {
  border: none;
  border-top: 1px solid var(--ink);
  margin: 0;
}

/* ─── System bar ─── */
.ft-home__sysbar {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.45rem 2rem;
  font-size: 0.7rem;
  letter-spacing: 0.07em;
  color: var(--ink);
}

.ft-home__sysbar-dot {
  opacity: 0.4;
}

.ft-home__status em {
  font-style: normal;
  color: var(--ok);
  font-weight: 700;
}

/* ─── Hero ─── */
.ft-home__hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  padding: 3rem 2rem 2.5rem;
  position: relative;
  overflow: hidden;
}

.ft-home__hero-left {
  min-width: 0;
  position: relative;
  z-index: 1;
}

.ft-home__hero-right {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 0;
  position: relative;
  z-index: 1;
}

.ft-home__hero-label {
  font-size: 0.7rem;
  color: var(--muted);
  letter-spacing: 0.08em;
  margin-bottom: 1rem;
}

.ft-home__headline {
  font-family: var(--font);
  font-size: clamp(1.6rem, 4vw, 2.8rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: 0.03em;
  margin: 0 0 1.25rem;
  color: var(--ink);
  min-height: 3.5rem;
}

.ft-home__cursor {
  display: inline-block;
  color: var(--accent);
  font-weight: 400;
  transition: opacity 0.1s;
}

.ft-home__cursor.hidden {
  opacity: 0;
}

.ft-home__subhead {
  font-size: 0.85rem;
  line-height: 1.7;
  color: var(--ink);
  margin: 0 0 2rem;
  opacity: 0.75;
}

.ft-home__hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

/* ─── Dashboard inside browser mockup ─── */
.ft-dash {
  font-family: 'Space Mono', monospace;
  padding: 1rem 1.25rem;
  background: #fafaf8;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.ft-dash__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 0.5rem;
}

.ft-dash__title {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #0a0a0a;
}

.ft-dash__dot--live {
  font-size: 0.65rem;
  color: #1a7a1a;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.ft-dash__rows {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
}

.ft-dash__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.72rem;
  padding: 0.35rem 0;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}

.ft-dash__key {
  color: rgba(10,10,10,0.55);
}

.ft-dash__val {
  font-weight: 700;
  color: #0a0a0a;
}

.ft-dash__val--up {
  color: #1a7a1a;
}

.ft-dash__sparkline {
  display: flex;
  align-items: flex-end;
  gap: 4px;
  height: 60px;
  padding-top: 0.5rem;
  border-top: 1px solid #e0e0e0;
}

.ft-dash__bar {
  flex: 1;
  border-radius: 2px 2px 0 0;
  min-height: 4px;
  opacity: 0.75;
}

/* ─── Bloomberg ticker ─── */
.ft-ticker {
  background: #1a1a2e;
  color: #d0d0e0;
  padding: 0.55rem 2rem;
  overflow: hidden;
  white-space: nowrap;
}

.ft-ticker__inner {
  display: flex;
  align-items: center;
  gap: 0;
  font-family: 'Space Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.04em;
}

.ft-ticker__item {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

.ft-ticker__label {
  color: rgba(208, 208, 224, 0.55);
  font-size: 0.68rem;
  letter-spacing: 0.07em;
}

.ft-ticker__price {
  color: #d0d0e0;
  font-weight: 700;
}

.ft-ticker__change--up {
  color: #3ddc84;
  font-weight: 700;
}

.ft-ticker__change--down {
  color: #ff6b6b;
  font-weight: 700;
}

.ft-ticker__sep {
  color: rgba(208, 208, 224, 0.2);
  margin: 0 1.25rem;
}

/* ─── CounterStat row ─── */
.ft-home__counters {
  padding: 2rem 2rem;
}

.ft-home__counters-label {
  font-size: 0.68rem;
  color: var(--muted);
  letter-spacing: 0.09em;
  margin-bottom: 1.25rem;
}

.ft-home__counters-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.ft-home__counters-grid :deep(.stat-display) {
  font-family: 'Space Mono', monospace;
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 700;
  color: var(--ink);
  letter-spacing: -0.01em;
}

.ft-home__counters-grid :deep(.stat-label) {
  font-family: 'Space Mono', monospace;
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  color: var(--muted);
  text-transform: uppercase;
}

/* ─── Buttons ─── */
.ft-btn {
  font-family: var(--font);
  font-size: 0.75rem;
  letter-spacing: 0.09em;
  font-weight: 700;
  text-decoration: none;
  padding: 0.55rem 1.2rem;
  border: 1px solid;
  border-radius: 0;
  display: inline-block;
  transition: background 0.15s, color 0.15s;
  cursor: pointer;
}

.ft-btn--primary {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--bg);
}

.ft-btn--primary:hover {
  background: var(--ink);
  border-color: var(--ink);
}

.ft-btn--ghost {
  background: transparent;
  border-color: var(--ink);
  color: var(--ink);
}

.ft-btn--ghost:hover {
  background: var(--ink);
  color: var(--bg);
}

.ft-btn--lg {
  font-size: 0.8rem;
  padding: 0.7rem 1.6rem;
}

/* ─── Tables ─── */
.ft-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font);
  font-size: 0.78rem;
}

.ft-table th {
  text-align: left;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  color: var(--muted);
  border-bottom: 1px solid var(--ink);
  padding: 0.4rem 0.8rem;
  white-space: nowrap;
}

.ft-table td {
  padding: 0.55rem 0.8rem;
  border-bottom: 1px solid rgba(10, 10, 10, 0.12);
  vertical-align: top;
  line-height: 1.5;
}

.ft-table tbody tr:hover td {
  background: rgba(10, 10, 10, 0.03);
}

.ft-value {
  color: var(--accent);
  font-weight: 700;
}

.ft-ok {
  color: var(--ok);
  font-weight: 700;
}

.ft-num {
  color: var(--muted);
  font-size: 0.68rem;
  white-space: nowrap;
}

/* ─── Comparison table ─── */
.ft-home__compare {
  padding: 1.5rem 2rem;
}

.ft-home__compare-label {
  font-size: 0.68rem;
  color: var(--muted);
  letter-spacing: 0.09em;
  margin-bottom: 0.75rem;
}

.ft-home__compare-wrap {
  overflow-x: auto;
}

.ft-th--prodigy {
  color: var(--ok) !important;
}

.ft-cell--prodigy {
  background: rgba(26, 122, 26, 0.04);
}

.ft-cell--comp {
  color: var(--muted);
}

.ft-home__footnote {
  margin-top: 0.75rem;
  font-size: 0.68rem;
  color: var(--muted);
  letter-spacing: 0.03em;
}

/* ─── Stats section ─── */
.ft-home__stats {
  padding: 1.5rem 2rem;
}

.ft-home__stats-label {
  font-size: 0.68rem;
  color: var(--muted);
  letter-spacing: 0.09em;
  margin-bottom: 0.75rem;
}

.ft-home__stats-wrap {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.ft-home__stats-wrap .ft-table--stats {
  min-width: 480px;
}

/* ─── Problem section ─── */
.ft-home__problem {
  padding: 2rem 2rem;
  max-width: 820px;
}

.ft-home__problem-label {
  font-size: 0.68rem;
  color: var(--muted);
  letter-spacing: 0.09em;
  margin-bottom: 1rem;
}

.ft-home__quote {
  font-family: var(--font);
  font-size: 1rem;
  line-height: 1.7;
  margin: 0 0 1.25rem;
  padding-left: 1.2rem;
  border-left: 2px solid var(--accent);
  font-style: normal;
  color: var(--ink);
}

.ft-home__problem-body {
  font-size: 0.8rem;
  line-height: 1.8;
  color: var(--ink);
  opacity: 0.7;
  margin: 0;
}

/* ─── Features section ─── */
.ft-home__features {
  padding: 1.5rem 2rem;
}

.ft-home__features-label {
  font-size: 0.68rem;
  color: var(--muted);
  letter-spacing: 0.09em;
  margin-bottom: 0.75rem;
}

/* ─── Spec sheet ─── */
.ft-home__spec {
  padding: 1.5rem 2rem;
}

.ft-home__spec-label {
  font-size: 0.68rem;
  color: var(--muted);
  letter-spacing: 0.09em;
  margin-bottom: 0.75rem;
}

.ft-home__spec-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  font-family: 'Space Mono', monospace;
  font-size: 0.76rem;
  border: 1px solid rgba(10,10,10,0.15);
}

.ft-home__spec-row {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding: 0.45rem 0.8rem;
  background: var(--bg);
  border-bottom: 1px solid rgba(10,10,10,0.08);
}

.ft-home__spec-row--alt {
  background: rgba(10,10,10,0.03);
}

.ft-home__spec-key {
  color: var(--muted);
  min-width: 130px;
  flex-shrink: 0;
  font-size: 0.7rem;
  letter-spacing: 0.04em;
}

.ft-home__spec-val {
  color: var(--ink);
  font-weight: 700;
}

/* ─── Trust strip ─── */
.ft-home__trust {
  padding: 2rem 2rem;
  text-align: center;
}

.ft-home__trust-label {
  font-size: 0.68rem;
  color: var(--muted);
  letter-spacing: 0.09em;
  margin-bottom: 1.25rem;
}

/* ─── Testimonials ─── */
.ft-home__testimonials {
  padding: 2rem 2rem;
  border-top: 1px solid rgba(245,158,11,0.3);
  background: #0a0e1a;
}

.ft-home__testimonials-label {
  font-size: 0.68rem;
  color: rgba(245,158,11,0.6);
  letter-spacing: 0.09em;
  margin-bottom: 1.5rem;
  font-family: 'Space Mono', monospace;
}

.ft-home__testimonials-row {
  display: flex;
  gap: 1.25rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 0.5rem;
}

.ft-home__testimonials .t-card {
  border: 1px solid rgba(245,158,11,0.2);
  padding: 1.5rem;
  font-family: 'Space Mono', monospace;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: clamp(240px, 28vw, 340px);
  flex: 1;
  scroll-snap-align: start;
  background: rgba(245,158,11,0.02);
}

.ft-home__testimonials .t-quote {
  font-size: 0.875rem;
  color: rgba(245,158,11,0.9);
  font-style: italic;
  line-height: 1.7;
  margin: 0;
  flex: 1;
}

.ft-home__testimonials .t-author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.ft-home__testimonials .t-avatar {
  width: 2rem;
  height: 2rem;
  border: 1px solid rgba(245,158,11,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  color: #f59e0b;
  flex-shrink: 0;
  background: transparent;
}

.ft-home__testimonials .t-name {
  font-size: 0.75rem;
  color: rgba(245,158,11,0.6);
  line-height: 1.4;
}

/* ─── Embed section ─── */
.ft-home__embed {
  padding: 2rem 2rem;
}

.ft-home__embed-label {
  font-size: 0.68rem;
  color: rgba(10, 10, 10, 0.45);
  letter-spacing: 0.09em;
  margin-bottom: 1.25rem;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.ft-home__embed-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.ft-home__embed-left {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.ft-home__embed-heading {
  font-family: 'Space Mono', monospace;
  font-size: clamp(1rem, 2vw, 1.35rem);
  font-weight: 700;
  color: var(--ink);
  margin: 0;
  line-height: 1.3;
}

.ft-home__embed-sub {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  line-height: 1.75;
  color: var(--ink);
  opacity: 0.65;
  margin: 0;
  max-width: 36ch;
}

@media (max-width: 768px) {
  .ft-home__embed-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .ft-home__testimonials,
  .ft-home__embed {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* ─── CTA section ─── */
.ft-home__cta {
  padding: 2.5rem 2rem;
}

.ft-home__cta-label {
  font-size: 0.68rem;
  color: var(--muted);
  letter-spacing: 0.09em;
  margin-bottom: 1rem;
}

.ft-home__cta-body {
  font-size: 0.82rem;
  line-height: 1.75;
  margin: 0 0 1.5rem;
  opacity: 0.75;
}

/* ─── Footer strip ─── */
.ft-home__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 2rem;
  font-size: 0.68rem;
  letter-spacing: 0.07em;
  color: var(--muted);
}

.ft-home__footer-link {
  color: var(--muted);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.ft-home__footer-link:hover {
  color: var(--accent);
}

/* ─── Responsive ─── */
@media (max-width: 900px) {
  .ft-home__hero {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .ft-home__hero-right {
    order: -1;
  }

  .ft-home__counters-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .ft-home__spec-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .ft-home__sysbar {
    padding: 0.4rem 1rem;
    font-size: 0.65rem;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .ft-home__hero {
    padding: 2rem 1rem 1.5rem;
  }

  .ft-home__stats,
  .ft-home__compare,
  .ft-home__problem,
  .ft-home__features,
  .ft-home__spec,
  .ft-home__trust,
  .ft-home__counters,
  .ft-home__cta {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .ft-ticker {
    padding: 0.45rem 1rem;
    font-size: 0.65rem;
  }

  .ft-table th,
  .ft-table td {
    padding: 0.4rem 0.5rem;
    font-size: 0.72rem;
  }

  .ft-home__footer {
    padding: 0.5rem 1rem;
  }
}

@media (max-width: 600px) {
  .ft-home__counters-grid {
    grid-template-columns: 1fr 1fr;
  }

  .ft-ticker__inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.2rem;
    white-space: normal;
  }

  .ft-ticker__sep {
    display: none;
  }
}

@media (max-width: 480px) {
  .ft-home__headline {
    font-size: 1.4rem;
  }

  .ft-home__hero-right {
    display: none;
  }

  .ft-home__hero-actions {
    flex-direction: column;
    align-items: flex-start;
  }

  .ft-table--stats th:nth-child(3),
  .ft-table--stats th:nth-child(4),
  .ft-table--stats td:nth-child(3),
  .ft-table--stats td:nth-child(4) {
    display: none;
  }

  .ft-table--features th:nth-child(1),
  .ft-table--features td:nth-child(1) {
    display: none;
  }

  .ft-table--compare th:nth-child(3),
  .ft-table--compare th:nth-child(4),
  .ft-table--compare td:nth-child(3),
  .ft-table--compare td:nth-child(4) {
    display: none;
  }
}

@media (max-width: 375px) {
  .ft-home__sysbar {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.2rem;
  }

  .ft-home__sysbar-dot {
    display: none;
  }

  .ft-home__footer {
    flex-direction: column;
    gap: 0.3rem;
  }
}

/* ── Widget Preview Section ── */
.ft-home__widget-preview {
  padding: 3rem 0;
}
.ft-home__widget-preview-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 4rem;
  align-items: center;
}
.ft-home__widget-preview-text h2 { margin-bottom: 1rem; }
.ft-home__widget-preview-sub {
  font-family: 'Space Mono', monospace;
  font-size: 0.8125rem;
  line-height: 1.7;
  color: var(--ft-ink-mid, rgba(10, 20, 10, 0.65));
  margin: 0.5rem 0 0;
  max-width: 42ch;
}
@media (max-width: 768px) {
  .ft-home__widget-preview-inner { grid-template-columns: 1fr; }
}

/* ── Fintech Partners Say ── */
.ft-partners-say {
  padding: 2.5rem 1.5rem;
  background: #0e1318;
  max-width: 100%;
}
.ft-partners-say__label {
  font-family: 'Space Mono', monospace;
  font-size: 0.875rem;
  font-weight: 700;
  color: #f59e0b;
  letter-spacing: 0.08em;
  margin-bottom: 0.25rem;
}
.ft-partners-say__eyebrow {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: rgba(180, 200, 180, 0.45);
  letter-spacing: 0.06em;
  margin: 0 0 1.5rem;
}
.ft-partners-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
.ft-partner-card {
  background: #0e1318;
  border: 1px solid rgba(245, 158, 11, 0.2);
  padding: 1.5rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.ft-partner-quote {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  line-height: 1.65;
  color: rgba(180, 210, 180, 0.75);
  margin: 0;
  flex: 1;
}
.ft-partner-attr {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}
.ft-partner-role {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  color: rgba(180, 210, 180, 0.9);
}
.ft-partner-company {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: rgba(180, 210, 180, 0.45);
}
.ft-partner-badge {
  display: inline-block;
  align-self: flex-start;
  background: rgba(245, 158, 11, 0.15);
  border: 1px solid rgba(245, 158, 11, 0.35);
  color: #f59e0b;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.625rem;
  border-radius: 99px;
  letter-spacing: 0.04em;
}
@media (max-width: 768px) {
  .ft-partners-grid { grid-template-columns: 1fr; }
}

/* ── Feature Marquee Strip ── */
.marquee-wrap {
  overflow: hidden;
  border-top: 1px solid var(--ink);
  border-bottom: 1px solid var(--ink);
  padding: 0.875rem 0;
  background: var(--bg);
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
  border: 1px solid rgba(245,158,11,0.2);
  background: rgba(245,158,11,0.06);
  color: var(--accent);
  font-family: 'IBM Plex Mono', 'Courier New', monospace;
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
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid var(--ink);
  border-radius: 0;
  background: var(--bg);
}
.activity-header { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; }
.activity-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--accent);
  animation: act-pulse 1.5s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes act-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.8)} }
.activity-label { font-family: 'IBM Plex Mono', 'Courier New', monospace; font-size: 0.75rem; font-weight: 600; color: var(--accent); text-transform: uppercase; letter-spacing: 0.06em; }
.activity-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem; position: relative; min-height: 6rem; }
.activity-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.8125rem; }
.activity-flag { font-size: 1rem; flex-shrink: 0; }
.activity-text { color: var(--ink); flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-family: 'IBM Plex Mono', 'Courier New', monospace; font-size: 0.75rem; }
.activity-time { font-size: 0.6875rem; color: rgba(10,10,10,0.45); white-space: nowrap; flex-shrink: 0; font-family: 'IBM Plex Mono', monospace; }
.activity-disclaimer { font-size: 0.6875rem; color: rgba(10,10,10,0.4); margin-top: 0.5rem; font-style: italic; }
.activity-slide-enter-active { transition: all 0.4s ease; }
.activity-slide-enter-from { opacity: 0; transform: translateY(-8px); }
.activity-slide-leave-active { transition: all 0.3s ease; position: absolute; }
.activity-slide-leave-to { opacity: 0; transform: translateY(8px); }
</style>
