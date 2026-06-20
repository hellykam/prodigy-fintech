<template>
  <main>

    <!-- ── Hero ──────────────────────────────────────────────────── -->
    <section class="hero" aria-labelledby="product-headline" ref="heroSection">
      <div class="hero-inner">
        <div class="iris-bar" aria-hidden="true" />
        <div class="hero-body">
          <div class="hero-content">
            <p class="eyebrow">Product</p>
            <h1 id="product-headline" class="hero-headline" ref="heroTitle">
              WHAT'S INSIDE THE BOX
            </h1>
            <p class="hero-sub" ref="heroSub">
              Six modules. One integration. Every piece visible in the admin console while it runs.
            </p>
          </div>
          <!-- Dashboard preview mockup -->
          <div class="hero-mockup" aria-label="Dashboard preview" role="img">
            <BrowserMockup url="app.prodigy.demo/dashboard">
              <div class="dash-shell">
                <!-- Sidebar -->
                <nav class="dash-sidebar" aria-label="Dashboard navigation">
                  <div class="dash-logo" aria-hidden="true">◈ PRODIGY</div>
                  <ul class="dash-nav">
                    <li class="dash-nav-item dash-nav-item--active">Dashboard</li>
                    <li class="dash-nav-item">Transactions</li>
                    <li class="dash-nav-item">KYC</li>
                    <li class="dash-nav-item">Revenue</li>
                  </ul>
                </nav>
                <!-- Main area -->
                <div class="dash-main">
                  <!-- Stat tiles -->
                  <div class="dash-tiles">
                    <div class="dash-tile">
                      <div class="dash-tile-label">VOLUME</div>
                      <div class="dash-tile-val">€124,800</div>
                    </div>
                    <div class="dash-tile">
                      <div class="dash-tile-label">ACTIVE CLIENTS</div>
                      <div class="dash-tile-val">248</div>
                    </div>
                    <div class="dash-tile">
                      <div class="dash-tile-label">SETTLEMENTS</div>
                      <div class="dash-tile-val">€249.60</div>
                    </div>
                  </div>
                  <!-- Transaction table -->
                  <div class="dash-table" role="table" aria-label="Recent transactions">
                    <div class="dash-table-head" role="row">
                      <span role="columnheader">ID</span>
                      <span role="columnheader">AMOUNT</span>
                      <span role="columnheader">STATUS</span>
                    </div>
                    <div class="dash-table-row" role="row">
                      <span role="cell" class="dash-id">TX-0041</span>
                      <span role="cell">€500.00</span>
                      <span role="cell" class="dash-status dash-status--ok">SETTLED</span>
                    </div>
                    <div class="dash-table-row" role="row">
                      <span role="cell" class="dash-id">TX-0040</span>
                      <span role="cell">€1,200.00</span>
                      <span role="cell" class="dash-status dash-status--ok">SETTLED</span>
                    </div>
                    <div class="dash-table-row" role="row">
                      <span role="cell" class="dash-id">TX-0039</span>
                      <span role="cell">€350.00</span>
                      <span role="cell" class="dash-status dash-status--pending">KYC</span>
                    </div>
                  </div>
                </div>
              </div>
            </BrowserMockup>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Feature Grid ───────────────────────────────────────────── -->
    <section class="features" aria-labelledby="features-headline">
      <div class="section-inner">
        <div class="section-header">
          <h2 id="features-headline" class="section-title" ref="feat1">THE MODULES</h2>
        </div>
        <div class="feature-grid" ref="featureGridRef">
          <div
            v-for="feature in features"
            :key="feature.name"
            class="feature-card"
          >
            <div class="feature-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-svg">
                <component :is="'path'" v-bind="feature.iconPath" />
              </svg>
            </div>
            <h3 class="feature-name">{{ feature.name }}</h3>
            <p class="feature-desc">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── How It Works: Vertical Timeline ───────────────────────── -->
    <section class="timeline-section" aria-labelledby="timeline-headline">
      <div class="section-inner">
        <div class="section-header">
          <h2 id="timeline-headline" class="section-title" ref="feat2">FROM INSTALL TO REVENUE</h2>
        </div>
        <div class="timeline">
          <div
            v-for="(step, i) in timeline"
            :key="step.n"
            class="timeline-step"
            :class="i % 2 === 0 ? 'step-left' : 'step-right'"
          >
            <div class="step-track" aria-hidden="true">
              <div class="track-dot" />
              <div v-if="i < timeline.length - 1" class="track-line" />
            </div>
            <div class="step-content">
              <div class="step-n" aria-hidden="true">{{ step.n }}</div>
              <h3 class="step-title">{{ step.title }}</h3>
              <p class="step-detail">{{ step.detail }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Transaction Pipeline SVG ──────────────────────────────── -->
    <section class="pipeline-section" data-reveal="fade-up">
      <div class="section-inner">
        <div class="section-header">
          <p class="eyebrow" style="color:rgba(255,255,255,0.5);font-family:'Space Mono',monospace;font-size:0.75rem;letter-spacing:0.15em;text-transform:uppercase;">TRANSACTION PIPELINE</p>
          <h2 class="section-title">HOW A TRANSACTION MOVES.</h2>
        </div>
        <div class="pipeline-wrap">
          <svg viewBox="0 0 500 80" fill="none" xmlns="http://www.w3.org/2000/svg"
               width="100%" preserveAspectRatio="xMidYMid meet"
               aria-hidden="true" role="img" class="pipeline-svg">
            <defs>
              <marker id="bd-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#2563eb" />
              </marker>
            </defs>
            <rect class="pipeline-box" x="0" y="22" width="80" height="36" ry="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
            <rect class="pipeline-box" x="100" y="22" width="80" height="36" ry="4" fill="rgba(37,99,235,0.15)" stroke="#2563eb" stroke-width="1.5" />
            <rect class="pipeline-box" x="200" y="22" width="80" height="36" ry="4" fill="rgba(37,99,235,0.15)" stroke="#2563eb" stroke-width="1.5" />
            <rect class="pipeline-box" x="300" y="22" width="80" height="36" ry="4" fill="rgba(37,99,235,0.15)" stroke="#2563eb" stroke-width="1.5" />
            <rect class="pipeline-box" x="400" y="22" width="80" height="36" ry="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
            <text x="40" y="44" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.45)" font-family="Space Mono, monospace">Your App</text>
            <text x="140" y="44" text-anchor="middle" font-size="9" fill="#2563eb" font-family="Space Mono, monospace">Prodigy SDK</text>
            <text x="240" y="44" text-anchor="middle" font-size="9" fill="#2563eb" font-family="Space Mono, monospace">KYC Check</text>
            <text x="340" y="44" text-anchor="middle" font-size="9" fill="#2563eb" font-family="Space Mono, monospace">Settlement</text>
            <text x="440" y="44" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.45)" font-family="Space Mono, monospace">Receipt</text>
            <line class="pipeline-arrow" x1="82" y1="40" x2="97" y2="40" stroke="#2563eb" stroke-width="1.5" marker-end="url(#bd-arrow)" stroke-dasharray="60" stroke-dashoffset="60" />
            <line class="pipeline-arrow" x1="182" y1="40" x2="197" y2="40" stroke="#2563eb" stroke-width="1.5" marker-end="url(#bd-arrow)" stroke-dasharray="60" stroke-dashoffset="60" />
            <line class="pipeline-arrow" x1="282" y1="40" x2="297" y2="40" stroke="#2563eb" stroke-width="1.5" marker-end="url(#bd-arrow)" stroke-dasharray="60" stroke-dashoffset="60" />
            <line class="pipeline-arrow" x1="382" y1="40" x2="397" y2="40" stroke="#2563eb" stroke-width="1.5" marker-end="url(#bd-arrow)" stroke-dasharray="60" stroke-dashoffset="60" />
          </svg>
        </div>
      </div>
    </section>

    <!-- ── Counter Metrics ──────────────────────────────────────────── -->
    <section class="metrics-section" aria-labelledby="metrics-headline">
      <div class="metrics-inner">
        <h2 id="metrics-headline" class="sr-only" data-reveal="fade-up">Platform metrics</h2>
        <div class="metrics-grid" data-animate-stagger>
          <div class="metric-cell">
            <div class="metric-num"><span ref="boldStat1">94</span>%</div>
            <div class="metric-lbl">KYC PASS RATE</div>
          </div>
          <div class="metric-cell">
            <div class="metric-num">&lt;1 DAY</div>
            <div class="metric-lbl">AVERAGE INTEGRATION</div>
          </div>
          <div class="metric-cell">
            <div class="metric-num"><span ref="boldStat2">50</span>+</div>
            <div class="metric-lbl">COUNTRIES SUPPORTED</div>
          </div>
          <div class="metric-cell">
            <div class="metric-num">$<span ref="boldStat3">2</span>B+</div>
            <div class="metric-lbl">PROCESSED TO DATE</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Use Cases ─────────────────────────────────────────────── -->
    <section class="usecases-section" aria-labelledby="usecases-headline">
      <div class="section-inner">
        <div class="section-header">
          <h2 id="usecases-headline" class="section-title" data-reveal="fade-up" ref="feat3">WHO SHIPS WITH PRODIGY.</h2>
        </div>
        <div class="usecases-grid" data-animate-stagger>
          <div class="usecase-card">
            <div class="usecase-type">NEOBANKS</div>
            <p class="usecase-desc">Add crypto without adding a compliance team.</p>
          </div>
          <div class="usecase-card">
            <div class="usecase-type">EXCHANGES</div>
            <p class="usecase-desc">A fiat on-ramp live before your next sprint ends.</p>
          </div>
          <div class="usecase-card">
            <div class="usecase-type">WALLETS</div>
            <p class="usecase-desc">Let users buy in-app without leaving your product.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Build vs Buy ──────────────────────────────────────────── -->
    <section class="bvb-section" aria-labelledby="bvb-headline">
      <div class="bvb-inner">
        <h2 id="bvb-headline" class="bvb-headline" data-reveal="fade-up">BUILDING YOUR OWN TAKES 6–18 MONTHS.</h2>
        <p class="bvb-sub">Prodigy takes an afternoon.</p>
        <div class="bvb-cols" data-animate-stagger>
          <div class="bvb-col bvb-col--bad">
            <div class="bvb-col-title">BUILD IN-HOUSE</div>
            <ul class="bvb-list">
              <li class="bvb-item bvb-item--bad">Hire a compliance team</li>
              <li class="bvb-item bvb-item--bad">Obtain licences (9–18 months)</li>
              <li class="bvb-item bvb-item--bad">Build KYC + audit trail from scratch</li>
              <li class="bvb-item bvb-item--bad">Ongoing maintenance &amp; incidents</li>
            </ul>
          </div>
          <div class="bvb-col bvb-col--good">
            <div class="bvb-col-title">PRODIGY</div>
            <ul class="bvb-list">
              <li class="bvb-item bvb-item--good">Live the same day</li>
              <li class="bvb-item bvb-item--good">KYC &amp; compliance included</li>
              <li class="bvb-item bvb-item--good">Zero compliance overhead</li>
              <li class="bvb-item bvb-item--good">Maintained and updated for you</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Live Widget Demo ─────────────────────────────────────── -->
    <section class="widget-demo-section" aria-labelledby="widget-demo-headline" data-reveal="fade-up">
      <div class="section-inner widget-demo-inner">
        <div class="widget-demo-copy">
          <h2 id="widget-demo-headline" class="widget-demo-title">THE WIDGET. IT WORKS.</h2>
          <p class="widget-demo-sub">Three steps. Forty-seven seconds. No form. No redirect. No excuses.</p>
        </div>
        <div class="widget-demo-frame">
          <WidgetDemo theme="bold" />
        </div>
      </div>
    </section>

    <!-- ── Before / After Strip ────────────────────────────────── -->
    <section class="ba-section" aria-labelledby="ba-headline">
      <div class="section-inner">
        <h2 id="ba-headline" class="section-title" data-reveal="fade-up">BEFORE VS. AFTER.</h2>
        <div class="ba-cols">
          <div class="ba-col ba-col--bad" data-reveal="fade-left">
            <div class="ba-col-title">WITHOUT PRODIGY</div>
            <ul class="ba-list">
              <li class="ba-item ba-item--bad">6-month integration</li>
              <li class="ba-item ba-item--bad">PCI DSS nightmare</li>
              <li class="ba-item ba-item--bad">3 compliance vendors</li>
              <li class="ba-item ba-item--bad">User drops off at KYC</li>
            </ul>
          </div>
          <div class="ba-col ba-col--good" data-reveal="fade-right">
            <div class="ba-col-title">WITH PRODIGY</div>
            <ul class="ba-list">
              <li class="ba-item ba-item--good">1 afternoon</li>
              <li class="ba-item ba-item--good">We handle PCI</li>
              <li class="ba-item ba-item--good">One SDK</li>
              <li class="ba-item ba-item--good">94% KYC pass rate</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Social Proof ──────────────────────────────────────────── -->
    <section class="quotes-section" aria-labelledby="quotes-headline">
      <div class="section-inner">
        <div class="section-header">
          <h2 id="quotes-headline" class="section-title" data-reveal="fade-up">WHAT TEAMS ARE SAYING.</h2>
        </div>
        <div class="quotes-grid" data-animate-stagger>
          <blockquote class="quote-card">
            <p class="quote-text">"Our devs were done before lunch."</p>
            <footer class="quote-attr">Marcus T., CTO — SwapDeck</footer>
          </blockquote>
          <blockquote class="quote-card">
            <p class="quote-text">"Zero compliance incidents, six months running."</p>
            <footer class="quote-attr">Ingrid M., Compliance — Meridian Wealth</footer>
          </blockquote>
        </div>
      </div>
    </section>

    <!-- ── CTA Strip ──────────────────────────────────────────────── -->
    <section class="cta-strip" aria-labelledby="product-cta-h">
      <div class="cta-inner">
        <h2 id="product-cta-h" class="cta-headline">SEE IT RUNNING.</h2>
        <div class="cta-actions">
          <a
            href="http://localhost:5001"
            target="_blank"
            rel="noopener noreferrer"
            class="cta-btn cta-btn--fill"
          >
            OPEN DEMO
          </a>
          <RouterLink to="/bold/pricing" class="cta-btn cta-btn--ghost">
            SEE PRICING
          </RouterLink>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BrowserMockup from '@/components/shared/BrowserMockup.vue'
import WidgetDemo from '@/components/shared/WidgetDemo.vue'
import { useCountUp } from '@/composables/useGSAP'
import { useClipReveal } from '@/composables/useSplitReveal'
import { useMagneticAll } from '@/composables/useMagneticButton'
import { useHoverScramble } from '@/composables/useTextScramble'
import { useCardTiltAll } from '@/composables/useCardTilt'

const boldStat1 = ref<HTMLElement | null>(null)
const boldStat2 = ref<HTMLElement | null>(null)
const boldStat3 = ref<HTMLElement | null>(null)

const featureGridRef = ref<HTMLElement | null>(null)
useCardTiltAll(featureGridRef, '.feature-card', { maxTilt: 7, scale: 1.03, glowColor: '#2563eb', glowIntensity: 0.25 })

useCountUp(boldStat1, 94, { duration: 2.5 })
useCountUp(boldStat2, 50, { duration: 2 })
useCountUp(boldStat3, 2, { duration: 2 })

// ── Animation refs ─────────────────────────────────────────────
const heroTitle = ref<HTMLElement | null>(null)
const heroSub = ref<HTMLElement | null>(null)
const heroSection = ref<HTMLElement | null>(null)
const feat1 = ref<HTMLElement | null>(null)
const feat2 = ref<HTMLElement | null>(null)
const feat3 = ref<HTMLElement | null>(null)

// Hero h1 is plain text — use chars split reveal
useClipReveal(heroTitle, { direction: 'up', duration: 0.7 })
useClipReveal(heroSub, { direction: 'left', duration: 0.8, delay: 0.5 })
useClipReveal(feat1, { direction: 'up', duration: 0.7 })
useClipReveal(feat2, { direction: 'up', duration: 0.7, delay: 0.1 })
useClipReveal(feat3, { direction: 'up', duration: 0.7, delay: 0.1 })
useMagneticAll(heroSection, 'a, button', { strength: 0.5, returnDuration: 400 })
useHoverScramble(feat1, 'tech')
useHoverScramble(feat2, 'tech')

const features = [
  {
    name: 'WIDGET ENGINE',
    desc: 'Drop-in conversion UI. One script tag. Fully branded.',
    iconPath: { d: 'M8 8h32v32H8z M16 16h16v16H16z', stroke: '#0a0a0a', 'stroke-width': '1.5', fill: 'none' },
  },
  {
    name: 'KYC FLOW',
    desc: 'Identity verification built in. No external redirects.',
    iconPath: { d: 'M24 8 L40 16 L40 32 L24 40 L8 32 L8 16 Z M24 16 L24 32 M16 24 L32 24', stroke: '#0a0a0a', 'stroke-width': '1.5', fill: 'none' },
  },
  {
    name: 'RISK LAYER',
    desc: 'Automated scoring with manual override for edge cases.',
    iconPath: { d: 'M24 8 L40 40 L8 40 Z M24 20 L24 28 M24 32 L24 34', stroke: '#0a0a0a', 'stroke-width': '1.5', fill: 'none' },
  },
  {
    name: 'FEE LEDGER',
    desc: 'Every fee itemised. Platform, network, partner share.',
    iconPath: { d: 'M8 12h32 M8 20h32 M8 28h32 M8 36h20 M32 32h8v8h-8z', stroke: '#0a0a0a', 'stroke-width': '1.5', fill: 'none' },
  },
  {
    name: 'PARTNER API',
    desc: 'Webhooks, revenue tracking, and config endpoints.',
    iconPath: { d: 'M8 24 L18 14 L18 34 Z M40 24 L30 14 L30 34 Z M18 24 L30 24', stroke: '#0a0a0a', 'stroke-width': '1.5', fill: 'none' },
  },
  {
    name: 'ADMIN CONSOLE',
    desc: 'Real-time dashboard. All transactions, all states.',
    iconPath: { d: 'M8 8h32v32H8z M8 16h32 M16 16v24 M24 24h8 M24 30h12', stroke: '#0a0a0a', 'stroke-width': '1.5', fill: 'none' },
  },
]

const timeline = [
  {
    n: '01',
    title: 'ADD ONE SCRIPT TAG',
    detail: 'Copy the embed snippet into your app. Configure your brand colours and fee split. Done in under an hour.',
  },
  {
    n: '02',
    title: 'KYC RUNS INLINE',
    detail: 'Users complete identity verification inside your product. No redirects. No broken journeys.',
  },
  {
    n: '03',
    title: 'FEES SHOW BEFORE CONFIRM',
    detail: 'Every charge — platform, network, partner — is itemised on the receipt before the button is pressed.',
  },
  {
    n: '04',
    title: 'REVENUE POSTS TO YOUR PORTAL',
    detail: 'Partner share is calculated, posted, and visible in your dashboard after every completed transaction.',
  },
]
</script>

<style scoped>
/* ── Custom properties ─────────────────────────────────────── */
.hero, .features, .timeline-section, .cta-strip {
  --ink: #0a0a0a;
  --paper: #f5f5f0;
  --grid: rgba(0, 0, 0, 0.07);
}

/* ── Grid paper mixin ──────────────────────────────────────── */
.hero,
.features,
.timeline-section {
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
  flex-shrink: 0;
  will-change: background-position;
}

@keyframes iris-flow {
  0%   { background-position: 0% center; }
  100% { background-position: -200% center; }
}

.hero-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  padding: 3rem 1.5rem 3.5rem;
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 540px;
}

.hero-mockup {
  width: 100%;
}

/* Dashboard shell */
.dash-shell {
  display: grid;
  grid-template-columns: 7rem 1fr;
  background: #0a0a0a;
  min-height: 220px;
  font-family: 'Space Grotesk', sans-serif;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.dash-sidebar {
  background: #111;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.75rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.dash-logo {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 0.625rem;
  letter-spacing: 0.08em;
  color: rgba(245, 245, 240, 0.4);
  padding: 0 0.25rem 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.dash-nav {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.dash-nav-item {
  font-size: 0.6875rem;
  color: rgba(245, 245, 240, 0.45);
  padding: 0.25rem 0.375rem;
  letter-spacing: 0.02em;
  cursor: default;
}

.dash-nav-item--active {
  color: #f5f5f0;
  background: rgba(255, 255, 255, 0.07);
  border-left: 2px solid #a78bfa;
}

.dash-main {
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.dash-tiles {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.dash-tile {
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.5rem 0.625rem;
  background: #111;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.dash-tile-label {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 0.5625rem;
  letter-spacing: 0.06em;
  color: rgba(245, 245, 240, 0.4);
}

.dash-tile-val {
  font-size: 0.8125rem;
  font-weight: 700;
  color: #f5f5f0;
  font-variant-numeric: tabular-nums;
}

.dash-table {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: #111;
  display: flex;
  flex-direction: column;
}

.dash-table-head {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 0.375rem 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-family: 'Bebas Neue', sans-serif;
  font-size: 0.5625rem;
  letter-spacing: 0.08em;
  color: rgba(245, 245, 240, 0.35);
}

.dash-table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 0.3125rem 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.625rem;
  color: rgba(245, 245, 240, 0.7);
}

.dash-table-row:last-child {
  border-bottom: none;
}

.dash-id {
  color: rgba(245, 245, 240, 0.4);
  font-variant-numeric: tabular-nums;
}

.dash-status {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 0.5625rem;
  letter-spacing: 0.06em;
}

.dash-status--ok {
  color: #34d399;
}

.dash-status--pending {
  color: #fbbf24;
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
  font-size: clamp(4rem, 9vw, 8rem);
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
  max-width: 44ch;
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

/* ── Features ──────────────────────────────────────────────── */
.features {
  border-bottom: 3px solid var(--ink);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border: 1px solid var(--ink);
}

.feature-card {
  border-right: 1px solid var(--ink);
  border-bottom: 1px solid var(--ink);
  padding: 2rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  background-color: var(--paper);
  background-image:
    linear-gradient(var(--grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: 24px 24px;
  transition: background-color 0.15s;
}

.feature-card:hover {
  background-color: rgba(167, 139, 250, 0.05);
}

.feature-card:nth-child(3n) {
  border-right: none;
}

.feature-card:nth-last-child(-n+3) {
  border-bottom: none;
}

.feature-icon {
  width: 2.5rem;
  height: 2.5rem;
}

.icon-svg {
  width: 100%;
  height: 100%;
}

.feature-name {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.5rem;
  letter-spacing: 0.02em;
  line-height: 0.9;
  color: var(--ink);
  margin: 0;
}

.feature-desc {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8125rem;
  line-height: 1.5;
  color: rgba(10, 10, 10, 0.6);
  margin: 0;
}

/* ── Timeline ──────────────────────────────────────────────── */
.timeline-section {
  border-bottom: 3px solid var(--ink);
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
}

.timeline-step {
  display: grid;
  grid-template-columns: 3rem 1fr;
  gap: 1.5rem;
  align-items: start;
  padding: 2.5rem 0;
  border-bottom: 1px solid rgba(10, 10, 10, 0.15);
}

.timeline-step:last-child {
  border-bottom: none;
}

.step-left .step-content {
  padding-right: 40%;
}

.step-right .step-content {
  padding-left: 10%;
}

.step-track {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0.5rem;
}

.track-dot {
  width: 12px;
  height: 12px;
  background: var(--ink);
  border-radius: 0;
  flex-shrink: 0;
}

.track-line {
  width: 2px;
  flex: 1;
  background: rgba(10, 10, 10, 0.15);
  min-height: 3rem;
  margin-top: 0.5rem;
}

.step-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.step-n {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 4rem;
  color: var(--ink);
  opacity: 0.12;
  line-height: 1;
  letter-spacing: 0.02em;
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
  font-size: 0.9375rem;
  line-height: 1.6;
  color: rgba(10, 10, 10, 0.65);
  margin: 0;
  max-width: 48ch;
}

/* ── CTA Strip ─────────────────────────────────────────────── */
.cta-strip {
  background: var(--ink);
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
  font-size: clamp(3rem, 6vw, 5rem);
  letter-spacing: 0.02em;
  line-height: 0.9;
  color: #f5f5f0;
  margin: 0;
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
  color: var(--ink);
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

/* ── Counter Metrics ───────────────────────────────────────── */
.metrics-section {
  background: #0a0a0a;
  border-bottom: 3px solid #0a0a0a;
}

.metrics-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 5rem 1.5rem;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
  border: 1px solid rgba(245, 245, 240, 0.12);
}

.metric-cell {
  padding: 3rem 2.5rem;
  border-right: 1px solid rgba(245, 245, 240, 0.08);
  border-bottom: 1px solid rgba(245, 245, 240, 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.metric-cell:nth-child(2n) { border-right: none; }
.metric-cell:nth-last-child(-n+2) { border-bottom: none; }

.metric-num {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(3rem, 8vw, 6rem);
  line-height: 0.9;
  letter-spacing: 0.02em;
  background: linear-gradient(135deg, #2563eb, #a78bfa, #38bdf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.metric-lbl {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(245, 245, 240, 0.5);
}

/* ── Use Cases ─────────────────────────────────────────────── */
.usecases-section {
  background-color: var(--paper);
  background-image:
    linear-gradient(var(--grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: 24px 24px;
  border-bottom: 3px solid var(--ink);
}

.usecases-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.usecase-card {
  border-left: 4px solid #2563eb;
  background: #0a0a0a;
  padding: 2rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.usecase-type {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.375rem;
  letter-spacing: 0.06em;
  color: #f5f5f0;
}

.usecase-desc {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: rgba(245, 245, 240, 0.65);
  margin: 0;
}

/* ── Build vs Buy ──────────────────────────────────────────── */
.bvb-section {
  background: #2563eb;
}

.bvb-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 5rem 1.5rem;
}

.bvb-headline {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(2.5rem, 5vw, 5rem);
  letter-spacing: 0.02em;
  line-height: 0.92;
  color: #fff;
  margin: 0 0 0.75rem;
}

.bvb-sub {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.75);
  margin: 0 0 3rem;
}

.bvb-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.bvb-col {
  background: rgba(0, 0, 0, 0.25);
  padding: 2rem;
}

.bvb-col-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.375rem;
  letter-spacing: 0.08em;
  color: #fff;
  margin-bottom: 1.25rem;
}

.bvb-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.bvb-item {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9375rem;
  line-height: 1.5;
  padding-left: 1.5rem;
  position: relative;
}

.bvb-item::before {
  content: '×';
  position: absolute;
  left: 0;
  font-weight: 700;
}

.bvb-item--bad {
  color: rgba(255, 255, 255, 0.8);
}

.bvb-item--bad::before {
  color: #ff6b6b;
}

.bvb-item--good {
  color: rgba(255, 255, 255, 0.9);
}

.bvb-item--good::before {
  content: '✓';
  color: #4ade80;
}

/* ── Social Proof ──────────────────────────────────────────── */
.quotes-section {
  background-color: var(--paper);
  background-image:
    linear-gradient(var(--grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: 24px 24px;
  border-bottom: 3px solid var(--ink);
}

.quotes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.quote-card {
  border: 3px solid #2563eb;
  padding: 2.5rem 2rem;
  background: #0a0a0a;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.quote-text {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  line-height: 1.05;
  color: #f5f5f0;
  font-style: italic;
  margin: 0;
}

.quote-attr {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  color: rgba(245, 245, 240, 0.55);
  letter-spacing: 0.04em;
}

/* ── Responsive ────────────────────────────────────────────── */
@media (max-width: 900px) {
  .hero-body {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .feature-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .feature-card:nth-child(3n) {
    border-right: 1px solid var(--ink);
  }

  .feature-card:nth-child(2n) {
    border-right: none;
  }

  .feature-card:nth-last-child(-n+3) {
    border-bottom: 1px solid var(--ink);
  }

  .feature-card:nth-last-child(-n+2) {
    border-bottom: none;
  }

  .step-left .step-content,
  .step-right .step-content {
    padding-left: 0;
    padding-right: 0;
  }

  .cta-inner {
    flex-direction: column;
    align-items: flex-start;
  }

  .usecases-grid {
    grid-template-columns: 1fr;
  }

  .bvb-cols {
    grid-template-columns: 1fr;
  }

  .quotes-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 580px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }

  .feature-card {
    border-right: none !important;
    border-bottom: 1px solid var(--ink) !important;
  }

  .feature-card:last-child {
    border-bottom: none !important;
  }
}

@media (prefers-reduced-motion: reduce) {
  .iris-bar { animation: none; background: #a78bfa; }
}

/* ── Live Widget Demo ──────────────────────────────────────── */
.widget-demo-section {
  background: #111111;
  border-bottom: 3px solid #111111;
}

.widget-demo-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.widget-demo-copy {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.widget-demo-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(2.5rem, 5vw, 5rem);
  letter-spacing: 0.02em;
  line-height: 0.9;
  color: #f5f5f0;
  margin: 0;
}

.widget-demo-sub {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.125rem;
  line-height: 1.65;
  color: rgba(245, 245, 240, 0.7);
  margin: 0;
  max-width: 38ch;
}

.widget-demo-frame {
  display: flex;
  justify-content: center;
}

/* ── Before / After Strip ──────────────────────────────────── */
.ba-section {
  background-color: var(--paper);
  background-image:
    linear-gradient(var(--grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: 24px 24px;
  border-bottom: 3px solid var(--ink);
}

.ba-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 2rem;
}

.ba-col {
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.ba-col--bad {
  background: #0a0a0a;
  border-left: 6px solid #e11d48;
}

.ba-col--good {
  background: #0a0a0a;
  border-left: 6px solid #2563eb;
}

.ba-col-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.5rem;
  letter-spacing: 0.08em;
  color: #f5f5f0;
}

.ba-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.ba-item {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  line-height: 1.5;
  padding-left: 1.75rem;
  position: relative;
  color: rgba(245, 245, 240, 0.85);
}

.ba-item::before {
  position: absolute;
  left: 0;
  font-weight: 700;
  font-size: 1.1rem;
}

.ba-item--bad::before {
  content: '❌';
  font-size: 0.9rem;
}

.ba-item--good::before {
  content: '✓';
  color: #2563eb;
  font-size: 1.1rem;
}

@media (max-width: 900px) {
  .widget-demo-inner {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .ba-cols {
    grid-template-columns: 1fr;
  }
}

/* ── Transaction Pipeline SVG ── */
.pipeline-section { background: #111; border-bottom: 1px solid #222; }
.pipeline-section .section-title { color: #fff; }
.pipeline-wrap { margin-top: 2rem; }
.pipeline-box:nth-child(1) { animation: box-pulse 3s ease-in-out 0s infinite; }
.pipeline-box:nth-child(2) { animation: box-pulse 3s ease-in-out 0.6s infinite; }
.pipeline-box:nth-child(3) { animation: box-pulse 3s ease-in-out 1.2s infinite; }
.pipeline-box:nth-child(4) { animation: box-pulse 3s ease-in-out 1.8s infinite; }
.pipeline-box:nth-child(5) { animation: box-pulse 3s ease-in-out 2.4s infinite; }
@keyframes box-pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
.pipeline-arrow:nth-child(1) { animation: arrow-draw 1s ease 0.3s forwards; }
.pipeline-arrow:nth-child(2) { animation: arrow-draw 1s ease 0.6s forwards; }
.pipeline-arrow:nth-child(3) { animation: arrow-draw 1s ease 0.9s forwards; }
.pipeline-arrow:nth-child(4) { animation: arrow-draw 1s ease 1.2s forwards; }
@keyframes arrow-draw { to { stroke-dashoffset: 0; } }
@media (prefers-reduced-motion: reduce) {
  .pipeline-box { animation: none; opacity: 1; }
  .pipeline-arrow { animation: none; stroke-dashoffset: 0; }
}
</style>
