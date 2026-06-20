<template>
  <div class="product">

    <!-- ── Section 1: Hero ──────────────────────────────────────── -->
    <section class="product-hero" aria-label="Product overview">
      <div class="grid-dots" aria-hidden="true"></div>
      <div class="hero-inner">
        <p class="eyebrow">SYSTEM_MODULES.list</p>
        <h1 class="headline">WHAT SHIPS<br />WITH THE TAG.</h1>
        <p class="hero-sub">
          You add one line to your HTML. Prodigy adds a KYC engine, a risk layer,
          a fee ledger, a partner API, and an admin console. This is what's inside.
        </p>
      </div>
    </section>

    <!-- ── Section 2: Architecture diagram ──────────────────────── -->
    <section class="arch-section" aria-label="System architecture">
      <div class="section-inner">
        <h2 ref="sec1h" class="section-heading">ARCHITECTURE.svg</h2>
        <p class="arch-sub">CSS-rendered. No canvas. No images. Just boxes and arrows.</p>
        <div class="arch-diagram" role="img" aria-label="System architecture diagram">
          <!-- Row 1 -->
          <div class="arch-row">
            <div class="arch-box arch-box--entry">
              <span class="arch-status">● ONLINE</span>
              <span class="arch-label">YOUR APP</span>
            </div>
            <div class="arch-arrow arch-arrow--right" aria-hidden="true">→</div>
            <div class="arch-box arch-box--primary">
              <span class="arch-status">● ONLINE</span>
              <span class="arch-label">WIDGET EMBED</span>
            </div>
            <div class="arch-arrow arch-arrow--right" aria-hidden="true">→</div>
            <div class="arch-box arch-box--module">
              <span class="arch-status">● ONLINE</span>
              <span class="arch-label">KYC ENGINE</span>
            </div>
          </div>
          <!-- Vertical connectors row -->
          <div class="arch-row arch-row--connectors">
            <div class="arch-spacer"></div>
            <div class="arch-spacer"></div>
            <div class="arch-vline" aria-hidden="true"></div>
            <div class="arch-spacer"></div>
            <div class="arch-vline" aria-hidden="true"></div>
          </div>
          <!-- Row 2 -->
          <div class="arch-row">
            <div class="arch-box arch-box--module">
              <span class="arch-status">● ONLINE</span>
              <span class="arch-label">PARTNER API</span>
            </div>
            <div class="arch-arrow arch-arrow--left" aria-hidden="true">←</div>
            <div class="arch-box arch-box--module">
              <span class="arch-status">● ONLINE</span>
              <span class="arch-label">FEE LEDGER</span>
            </div>
            <div class="arch-arrow arch-arrow--right" aria-hidden="true">→</div>
            <div class="arch-box arch-box--module">
              <span class="arch-status">● ONLINE</span>
              <span class="arch-label">RISK LAYER</span>
            </div>
          </div>
          <!-- Vertical connectors row 2 -->
          <div class="arch-row arch-row--connectors">
            <div class="arch-spacer"></div>
            <div class="arch-spacer"></div>
            <div class="arch-vline" aria-hidden="true"></div>
            <div class="arch-spacer"></div>
            <div class="arch-spacer"></div>
          </div>
          <!-- Row 3 -->
          <div class="arch-row arch-row--centered">
            <div class="arch-box arch-box--module">
              <span class="arch-status">● ONLINE</span>
              <span class="arch-label">ADMIN CONSOLE</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Transaction Pipeline SVG ──────────────────────────────── -->
    <section class="pipeline-section" aria-labelledby="pipeline-h" data-reveal="fade-up">
      <div class="section-inner">
        <p class="eyebrow">// TRANSACTION_PIPELINE</p>
        <h2 id="pipeline-h" class="section-heading">HOW A TRANSACTION FLOWS</h2>
        <div class="pipeline-wrap">
          <svg viewBox="0 0 500 80" fill="none" xmlns="http://www.w3.org/2000/svg"
               width="100%" preserveAspectRatio="xMidYMid meet"
               aria-hidden="true" role="img" class="pipeline-svg">
            <defs>
              <marker id="cp-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#00ffb2" />
              </marker>
            </defs>
            <rect class="pipeline-box" x="0" y="22" width="80" height="36" ry="4" fill="rgba(0,255,178,0.04)" stroke="rgba(0,255,178,0.25)" stroke-width="1" />
            <rect class="pipeline-box" x="100" y="22" width="80" height="36" ry="4" fill="rgba(0,255,178,0.12)" stroke="#00ffb2" stroke-width="1.5" />
            <rect class="pipeline-box" x="200" y="22" width="80" height="36" ry="4" fill="rgba(0,255,178,0.12)" stroke="#00ffb2" stroke-width="1.5" />
            <rect class="pipeline-box" x="300" y="22" width="80" height="36" ry="4" fill="rgba(0,255,178,0.12)" stroke="#00ffb2" stroke-width="1.5" />
            <rect class="pipeline-box" x="400" y="22" width="80" height="36" ry="4" fill="rgba(0,255,178,0.04)" stroke="rgba(0,255,178,0.25)" stroke-width="1" />
            <text x="40" y="44" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.45)" font-family="Space Mono, monospace">Your App</text>
            <text x="140" y="44" text-anchor="middle" font-size="9" fill="#00ffb2" font-family="Space Mono, monospace">Prodigy SDK</text>
            <text x="240" y="44" text-anchor="middle" font-size="9" fill="#00ffb2" font-family="Space Mono, monospace">KYC Check</text>
            <text x="340" y="44" text-anchor="middle" font-size="9" fill="#00ffb2" font-family="Space Mono, monospace">Settlement</text>
            <text x="440" y="44" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.45)" font-family="Space Mono, monospace">Receipt</text>
            <line class="pipeline-arrow" x1="82" y1="40" x2="97" y2="40" stroke="#00ffb2" stroke-width="1.5" marker-end="url(#cp-arrow)" stroke-dasharray="60" stroke-dashoffset="60" />
            <line class="pipeline-arrow" x1="182" y1="40" x2="197" y2="40" stroke="#00ffb2" stroke-width="1.5" marker-end="url(#cp-arrow)" stroke-dasharray="60" stroke-dashoffset="60" />
            <line class="pipeline-arrow" x1="282" y1="40" x2="297" y2="40" stroke="#00ffb2" stroke-width="1.5" marker-end="url(#cp-arrow)" stroke-dasharray="60" stroke-dashoffset="60" />
            <line class="pipeline-arrow" x1="382" y1="40" x2="397" y2="40" stroke="#00ffb2" stroke-width="1.5" marker-end="url(#cp-arrow)" stroke-dasharray="60" stroke-dashoffset="60" />
          </svg>
        </div>
      </div>
    </section>

    <!-- ── Live Widget Demo ──────────────────────────────────────── -->
    <section class="widget-demo-section" aria-label="Live widget demo" data-reveal="fade-up">
      <div class="section-inner widget-demo-inner">
        <div class="widget-demo-copy">
          <p class="eyebrow">// LIVE DEMO</p>
          <h2 class="widget-demo-headline">// WHAT YOUR USERS SEE</h2>
          <p class="widget-demo-sub">The complete KYC-to-receipt flow. No redirects, no popups, no user abandonment.</p>
          <ul class="widget-demo-list">
            <li><span class="wd-bullet" aria-hidden="true">◈</span>KYC runs inside the widget. Users never leave your product.</li>
            <li><span class="wd-bullet" aria-hidden="true">◈</span>Full fee breakdown shown before any confirmation.</li>
            <li><span class="wd-bullet" aria-hidden="true">◈</span>Receipt issued on settlement. Immutable. Auditable.</li>
          </ul>
        </div>
        <div class="widget-demo-frame">
          <WidgetDemo theme="crypto" />
        </div>
      </div>
    </section>

    <!-- ── Section 3: Module detail grid ────────────────────────── -->
    <section class="modules-section" aria-label="Platform modules">
      <div class="section-inner">
        <h2 ref="sec2h" class="section-heading">THE MODULES</h2>
        <div class="module-grid" ref="moduleGridRef" role="list">
          <article
            v-for="mod in modules"
            :key="mod.id"
            class="module-card"
            role="listitem"
            tabindex="0"
          >
            <div class="module-card-top">
              <div class="module-header">
                <span class="module-name">{{ mod.name }}</span>
                <span class="module-badge" aria-label="Status: Active">● ACTIVE</span>
              </div>
              <div class="module-icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" v-html="mod.iconPaths"></svg>
              </div>
            </div>
            <p class="module-desc">{{ mod.desc }}</p>
            <table class="module-specs" aria-label="Module specifications">
              <tbody>
                <tr v-for="spec in mod.specs" :key="spec.key">
                  <td class="spec-key">{{ spec.key }}</td>
                  <td class="spec-val">{{ spec.val }}</td>
                </tr>
              </tbody>
            </table>
            <div class="module-learn" aria-hidden="true">→ learn more</div>
          </article>
        </div>
      </div>
    </section>

    <!-- ── Section 4: Transaction lifecycle ─────────────────────── -->
    <section class="lifecycle-section" ref="lifecycleSectionRef" aria-label="Transaction lifecycle">
      <div class="section-inner">
        <h2 class="section-heading">TRANSACTION LIFECYCLE</h2>
        <p class="lifecycle-sub">
          Five steps. From widget open to partner revenue posted.
          All auditable. None of them your problem.
        </p>
        <!-- Animated vertical connector line -->
        <svg class="lifecycle-connector-svg" viewBox="0 0 2 400" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="none">
          <line x1="1" y1="0" x2="1" y2="400" stroke="#00ffb2" stroke-width="1.5" class="lifecycle-connector-line" />
        </svg>
        <div class="lifecycle-steps" role="list">
          <div
            v-for="(step, i) in lifecycleSteps"
            :key="step.title"
            class="lifecycle-item"
            :class="{ 'lifecycle-item--visible': visibleSteps[i] }"
            role="listitem"
            :ref="(el) => setStepRef(el as HTMLElement | null, i)"
          >
            <div class="lifecycle-left">
              <div class="step-circle" aria-hidden="true">{{ i + 1 }}</div>
              <div class="step-vline" v-if="i < lifecycleSteps.length - 1" aria-hidden="true"></div>
            </div>
            <div class="lifecycle-right">
              <h3 class="lifecycle-title">{{ step.title }}</h3>
              <p class="lifecycle-detail">{{ step.detail }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Section A: Asset & Chain Coverage ──────────────────── -->
    <section class="asset-section" aria-label="Asset and chain coverage">
      <div class="section-inner">
        <h2 ref="mainStat" class="section-heading" data-reveal="fade-up" data-grad-sweep>136 ASSETS. 45 CHAINS. ZERO LOCK-IN.</h2>
        <div class="asset-stats" aria-label="Coverage stats">
          <div class="asset-stat">
            <span class="asset-stat-n" ref="cryptoStat1">136</span>
            <span class="asset-stat-label">CRYPTO ASSETS</span>
          </div>
          <div class="asset-stat-divider" aria-hidden="true"></div>
          <div class="asset-stat">
            <span class="asset-stat-n" ref="cryptoStat2">45</span>
            <span class="asset-stat-label">BLOCKCHAINS</span>
          </div>
        </div>
        <div class="ticker-chips" role="list" aria-label="Supported assets" data-animate-stagger>
          <span v-for="ticker in topTickers" :key="ticker" class="ticker-chip" role="listitem">{{ ticker }}</span>
        </div>
        <p class="ticker-more">+ 124 more assets supported</p>
      </div>
    </section>

    <!-- ── Section B: How the On-Ramp Works ────────────────────── -->
    <section class="flow-section" aria-label="How the on-ramp works">
      <div class="section-inner">
        <h2 class="section-heading" data-reveal="fade-up">THE FLOW</h2>
        <div class="flow-diagram" role="img" aria-label="On-ramp flow: User to Payment Method to Prodigy Engine to Crypto Delivered">
          <div class="flow-box">
            <span class="flow-box-label">USER</span>
            <span class="flow-box-sub"></span>
          </div>
          <span class="flow-arrow" aria-hidden="true">──→</span>
          <div class="flow-box">
            <span class="flow-box-label">PAYMENT METHOD</span>
            <span class="flow-box-sub">Card / Bank / SEPA</span>
          </div>
          <span class="flow-arrow" aria-hidden="true">──→</span>
          <div class="flow-box flow-box--highlight">
            <span class="flow-box-label">PRODIGY ENGINE</span>
            <span class="flow-box-sub">KYC + AML + FX</span>
          </div>
          <span class="flow-arrow" aria-hidden="true">──→</span>
          <div class="flow-box">
            <span class="flow-box-label">CRYPTO DELIVERED</span>
            <span class="flow-box-sub">to user wallet</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Section C: Social Proof ─────────────────────────────── -->
    <section class="social-proof-section" aria-label="Customer quotes">
      <div class="section-inner">
        <div class="quotes-row" data-animate-stagger>
          <blockquote class="quote-card">
            <p class="quote-text">"Our devs were done before lunch. Three lines of HTML."</p>
            <footer class="quote-attr">— Marcus T., CTO at SwapDeck</footer>
          </blockquote>
          <blockquote class="quote-card">
            <p class="quote-text">"94% KYC pass rate, first week."</p>
            <footer class="quote-attr">— Anna L., Head of Product at CryptoFlow Exchange</footer>
          </blockquote>
        </div>
      </div>
    </section>

    <!-- ── Section D: Integration Snippet ──────────────────────── -->
    <section class="snippet-section" aria-label="Integration code snippet">
      <div class="section-inner">
        <h2 class="section-heading" data-reveal="fade-up">THE FULL INTEGRATION IS 3 LINES OF HTML.</h2>
        <div class="snippet-card" role="region" aria-label="3-line integration code">
          <pre class="snippet-block"><code><span class="snip-tag">&lt;script</span> <span class="snip-attr">src</span>=<span class="snip-str">"https://cdn.prodigy.example/widget.js"</span><span class="snip-tag">&gt;&lt;/script&gt;</span>
<span class="snip-tag">&lt;div</span> <span class="snip-attr">id</span>=<span class="snip-str">"prodigy-widget"</span> <span class="snip-attr">data-theme</span>=<span class="snip-str">"crypto"</span> <span class="snip-attr">data-api-key</span>=<span class="snip-str">"YOUR_KEY"</span><span class="snip-tag">&gt;&lt;/div&gt;</span>
<span class="snip-tag">&lt;script&gt;</span><span class="snip-fn">Prodigy</span>.init({ container: <span class="snip-str">'#prodigy-widget'</span> })<span class="snip-tag">&lt;/script&gt;</span></code></pre>
        </div>
        <p class="snippet-note">That's it. KYC, AML, fee receipt, payment processing — all included.</p>
      </div>
    </section>

    <!-- ── Section 5: CTA ───────────────────────────────────────── -->
    <section ref="ctaSection" class="cta-section" aria-label="Call to action">
      <div class="section-inner cta-inner">
        <h2 class="cta-heading">THE MODULES ARE LIVE.<br />GO SEE THEM.</h2>
        <div class="cta-actions">
          <a
            href="http://localhost:5001"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary"
          >
            OPEN DEMO →
          </a>
          <router-link to="/crypto/pricing" class="btn-ghost">
            SEE PRICING
          </router-link>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { animate, stagger } from 'animejs'
import { useCountUp } from '@/composables/useGSAP'
import { useClipReveal, useGradientSweep } from '@/composables/useSplitReveal'
import { useMagneticAll } from '@/composables/useMagneticButton'
import { useCardTiltAll } from '@/composables/useCardTilt'
import WidgetDemo from '@/components/shared/WidgetDemo.vue'

// ── Animation refs ────────────────────────────────────────────────
const sec1h = ref<HTMLElement | null>(null)
const sec2h = ref<HTMLElement | null>(null)
const mainStat = ref<HTMLElement | null>(null)
const ctaSection = ref<HTMLElement | null>(null)
const moduleGridRef = ref<HTMLElement | null>(null)
const lifecycleSectionRef = ref<HTMLElement | null>(null)

useClipReveal(sec1h, { direction: 'up', duration: 0.9, delay: 0.1 })
useClipReveal(sec2h, { direction: 'up', duration: 0.9, delay: 0.1 })
useGradientSweep(mainStat, { color: '#00ffb2', duration: 1000 })
useMagneticAll(ctaSection, 'a, button', { strength: 0.4, returnDuration: 500 })
useCardTiltAll(moduleGridRef, '.module-card', { maxTilt: 6, scale: 1.025, glowColor: '#00ffb2', glowIntensity: 0.2 })

// ── Module data ────────────────────────────────────────────────
interface ModuleSpec {
  key: string
  val: string
}

interface Module {
  id: string
  name: string
  iconPaths: string
  desc: string
  specs: ModuleSpec[]
}

const modules: Module[] = [
  {
    id: '01',
    name: 'Widget Core',
    iconPaths: '<rect x="3" y="3" width="18" height="18" rx="2"/><polyline points="9 3 9 21"/><polyline points="3 9 21 9"/>',
    desc: 'The embed that started it all. Configurable, branded, and opinionated about showing you exactly what it costs.',
    specs: [
      { key: 'Latency', val: '<50ms' },
      { key: 'Currencies', val: '15+' },
    ],
  },
  {
    id: '02',
    name: 'KYC Engine',
    iconPaths: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><polyline points="9 11 12 14 15 11"/>',
    desc: 'Identity checks that happen inside the widget. Your users never notice — unless they fail, in which case they definitely notice.',
    specs: [
      { key: 'Avg time', val: '47s' },
      { key: 'Pass rate', val: '93.1%' },
    ],
  },
  {
    id: '03',
    name: 'Risk Layer',
    iconPaths: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
    desc: 'Automated counterparty screening, velocity monitoring, and pattern detection. With a manual override queue for when the algorithm has opinions.',
    specs: [
      { key: 'Checks', val: '12/tx' },
      { key: 'Override', val: 'manual' },
    ],
  },
  {
    id: '04',
    name: 'Fee Ledger',
    iconPaths: '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
    desc: 'Every fee shown before anyone presses anything. Stored immutably. The compliance team\'s favourite part.',
    specs: [
      { key: 'Visibility', val: 'pre-confirm' },
      { key: 'Audit', val: 'immutable' },
    ],
  },
  {
    id: '05',
    name: 'Partner API',
    iconPaths: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="12" y1="2" x2="12" y2="22"/>',
    desc: 'You set the partner share in the admin console. It posts per transaction. No month-end batch. No spreadsheet. No ambiguity.',
    specs: [
      { key: 'Rate', val: 'configurable' },
      { key: 'Payout', val: 'per-tx' },
    ],
  },
  {
    id: '06',
    name: 'Admin Console',
    iconPaths: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
    desc: 'The dashboard that shows KYC queue, risk flags, all transactions, all partner commissions. In real time. Not tomorrow morning.',
    specs: [
      { key: 'Access', val: 'role-based' },
      { key: 'Latency', val: 'real-time' },
    ],
  },
]

// ── Lifecycle steps ────────────────────────────────────────────
interface LifecycleStep {
  title: string
  detail: string
}

const lifecycleSteps: LifecycleStep[] = [
  {
    title: 'User opens widget',
    detail: 'Rate displayed immediately. Amount entered. Fee breakdown shown pre-confirm — platform fee, network fee, total received. No checkout-time surprises.',
  },
  {
    title: 'User confirms → KYC check runs',
    detail: 'If not previously verified: document capture, liveness check, automatic AML screening. Average 47 seconds. Happens inside the widget.',
  },
  {
    title: 'KYC passes → Risk layer screens',
    detail: 'Counterparty check, velocity limits, pattern analysis. Twelve checks per transaction. Milliseconds, not minutes. Manual override queue if needed.',
  },
  {
    title: 'Risk clear → Transaction executes, ledger updated',
    detail: 'Transaction settles. Every line item written to the immutable ledger immediately. Compliance log stamped. Nothing left unrecorded.',
  },
  {
    title: 'Partner share allocated → Admin console updates',
    detail: 'Your configured partner fee posts to the partner account. Admin console reflects the new transaction in real time. No batch. No delay.',
  },
]

// ── Top tickers ───────────────────────────────────────────────
const topTickers = ['BTC', 'ETH', 'USDT', 'SOL', 'BNB', 'XRP', 'DOT', 'ADA', 'AVAX', 'MATIC', 'LTC', 'LINK']

// ── CountUp refs ──────────────────────────────────────────────
const cryptoStat1 = ref<HTMLElement | null>(null)
const cryptoStat2 = ref<HTMLElement | null>(null)
useCountUp(cryptoStat1, 136, { duration: 2.5 })
useCountUp(cryptoStat2, 45, { duration: 2 })

// ── Intersection observer for lifecycle steps ──────────────────
const visibleSteps = ref<boolean[]>(lifecycleSteps.map(() => false))
const stepRefs = ref<(HTMLElement | null)[]>(lifecycleSteps.map(() => null))
let stepObservers: IntersectionObserver[] = []

function setStepRef(el: HTMLElement | null, index: number) {
  stepRefs.value[index] = el
}

onMounted(() => {
  // Animate lifecycle connector line on scroll
  if (lifecycleSectionRef.value) {
    const connector = lifecycleSectionRef.value.querySelector('.lifecycle-connector-line') as SVGElement | null
    if (connector) {
      const length = (connector as SVGGeometryElement).getTotalLength?.() ?? 400
      connector.style.strokeDasharray = `${length}`
      connector.style.strokeDashoffset = `${length}`
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            connector.style.transition = 'stroke-dashoffset 1.4s ease'
            connector.style.strokeDashoffset = '0'
            obs.disconnect()
          }
        })
      }, { threshold: 0.2 })
      obs.observe(lifecycleSectionRef.value)
    }
  }

  const flowEl = document.querySelector('.flow-diagram')
  if (flowEl) {
    const flowObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate('.flow-diagram .flow-box', {
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 600,
            delay: stagger(150),
            ease: 'outQuad',
          })
          flowObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.3 })
    flowObserver.observe(flowEl)
  }

  stepRefs.value.forEach((el, i) => {
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          // Stagger each step by 150ms
          setTimeout(() => {
            visibleSteps.value[i] = true
          }, i * 150)
          obs.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    obs.observe(el)
    stepObservers.push(obs)
  })
})

onUnmounted(() => {
  stepObservers.forEach((obs) => obs.disconnect())
  stepObservers = []
})
</script>

<style scoped>
/* ── Tokens ──────────────────────────────────────────────────── */
.product {
  --bg: #050510;
  --cyan: #00f5ff;
  --purple: #a855f7;
  --text: #e8eaff;
  --white: #ffffff;
  --card-bg: rgba(255, 255, 255, 0.03);
  --card-border: rgba(0, 245, 255, 0.15);
  --glow-cyan: 0 0 20px rgba(0, 245, 255, 0.3);

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

/* ── Hero ────────────────────────────────────────────────────── */
.product-hero {
  position: relative;
  padding: clamp(4rem, 10vw, 8rem) 0 clamp(3rem, 7vw, 6rem);
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
  max-width: 800px;
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
  font-size: clamp(2.5rem, 7vw, 5.5rem);
  font-weight: 800;
  line-height: 1.0;
  letter-spacing: -0.01em;
  color: var(--white);
  margin: 0 0 clamp(1rem, 2.5vw, 1.5rem);
}

.hero-sub {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  line-height: 1.6;
  color: rgba(232, 234, 255, 0.65);
  max-width: 55ch;
  margin: 0 auto;
}

/* ── Architecture diagram ────────────────────────────────────── */
.arch-section {
  padding: clamp(4rem, 8vw, 7rem) 0;
  border-top: 1px solid rgba(0, 245, 255, 0.08);
}

.arch-sub {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: rgba(232, 234, 255, 0.35);
  text-align: center;
  margin: 0 0 clamp(2rem, 4vw, 3.5rem);
}

.arch-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  max-width: 900px;
  margin: 0 auto;
}

.arch-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(0.5rem, 2vw, 1.25rem);
  width: 100%;
}

.arch-row--connectors {
  height: clamp(1.5rem, 3vw, 2.5rem);
  align-items: stretch;
}

.arch-row--centered {
  justify-content: center;
}

.arch-spacer {
  flex: 1;
  max-width: 200px;
}

.arch-vline {
  width: 1px;
  background: linear-gradient(to bottom, rgba(0, 245, 255, 0.5), rgba(168, 85, 247, 0.3));
  flex: 0 0 1px;
  margin: 0 calc(100px + clamp(0.5rem, 2vw, 1.25rem));
}

.arch-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  padding: clamp(0.75rem, 2vw, 1.25rem) clamp(1rem, 2.5vw, 1.75rem);
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 4px;
  min-width: clamp(100px, 18vw, 180px);
  transition: border-color 0.25s, box-shadow 0.25s;
  cursor: default;
}

.arch-box:hover {
  border-color: rgba(0, 245, 255, 0.5);
  box-shadow: var(--glow-cyan);
}

.arch-box--entry {
  border-color: rgba(168, 85, 247, 0.4);
}

.arch-box--primary {
  border-color: rgba(0, 245, 255, 0.4);
  box-shadow: 0 0 12px rgba(0, 245, 255, 0.12);
  animation: arch-pulse 3s ease-in-out infinite;
}

@keyframes arch-pulse {
  0%, 100% { box-shadow: 0 0 12px rgba(0, 245, 255, 0.12); }
  50% { box-shadow: 0 0 24px rgba(0, 245, 255, 0.28); }
}

.arch-status {
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  color: #22c55e;
  letter-spacing: 0.08em;
}

.arch-label {
  font-family: 'Space Mono', monospace;
  font-size: clamp(0.6rem, 1vw, 0.75rem);
  letter-spacing: 0.12em;
  color: var(--text);
  text-align: center;
}

.arch-arrow {
  font-family: 'Space Mono', monospace;
  font-size: clamp(1rem, 2vw, 1.5rem);
  color: var(--cyan);
  flex-shrink: 0;
  text-shadow: 0 0 8px rgba(0, 245, 255, 0.6);
}

/* ── Module grid ─────────────────────────────────────────────── */
.modules-section {
  padding: clamp(4rem, 8vw, 7rem) 0;
  border-top: 1px solid rgba(0, 245, 255, 0.08);
}

.module-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(0.75rem, 2vw, 1.25rem);
}

.module-card {
  position: relative;
  padding: clamp(1.25rem, 2.5vw, 1.75rem);
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 6px;
  overflow: hidden;
  cursor: default;
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.2s;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.module-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--cyan), var(--purple));
  opacity: 0;
  transition: opacity 0.25s;
}

.module-card:hover,
.module-card:focus-visible {
  border-color: rgba(0, 245, 255, 0.4);
  box-shadow: var(--glow-cyan);
  transform: translateY(-4px);
  outline: none;
}

.module-card:hover::before,
.module-card:focus-visible::before {
  opacity: 1;
}

.module-card:hover .module-learn {
  opacity: 1;
  transform: translateX(0);
}

.module-card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.module-header {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.module-name {
  font-family: 'Space Mono', monospace;
  font-size: clamp(0.7rem, 1.1vw, 0.85rem);
  letter-spacing: 0.12em;
  color: var(--cyan);
  text-transform: uppercase;
}

.module-badge {
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  color: #22c55e;
  letter-spacing: 0.08em;
}

.module-icon {
  color: rgba(0, 245, 255, 0.4);
  flex-shrink: 0;
}

.module-desc {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(0.85rem, 1.3vw, 0.95rem);
  line-height: 1.55;
  color: rgba(232, 234, 255, 0.65);
  margin: 0;
  flex: 1;
}

.module-specs {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
}

.module-specs td {
  padding: 0.25rem 0;
  border-bottom: 1px solid rgba(0, 245, 255, 0.06);
}

.module-specs tr:last-child td {
  border-bottom: none;
}

.spec-key {
  color: rgba(232, 234, 255, 0.35);
  width: 45%;
}

.spec-val {
  color: rgba(0, 245, 255, 0.7);
  text-align: right;
}

.module-learn {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: var(--cyan);
  letter-spacing: 0.08em;
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.2s, transform 0.2s;
}

/* ── Transaction lifecycle ───────────────────────────────────── */
.lifecycle-section {
  padding: clamp(4rem, 8vw, 7rem) 0;
  border-top: 1px solid rgba(0, 245, 255, 0.08);
}

.lifecycle-sub {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(0.95rem, 1.5vw, 1.1rem);
  line-height: 1.55;
  color: rgba(232, 234, 255, 0.55);
  text-align: center;
  margin: 0 0 clamp(2.5rem, 5vw, 4rem);
}

.lifecycle-steps {
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.lifecycle-item {
  display: flex;
  gap: clamp(1rem, 2.5vw, 1.75rem);
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.lifecycle-item--visible {
  opacity: 1;
  transform: translateY(0);
}

.lifecycle-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.step-circle {
  width: clamp(2rem, 4vw, 2.5rem);
  height: clamp(2rem, 4vw, 2.5rem);
  border: 1px solid var(--cyan);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  color: var(--cyan);
  flex-shrink: 0;
  text-shadow: 0 0 8px rgba(0, 245, 255, 0.4);
  box-shadow: 0 0 8px rgba(0, 245, 255, 0.15);
}

.step-vline {
  flex: 1;
  width: 1px;
  background: none;
  border-left: 1px dashed rgba(0, 245, 255, 0.2);
  margin: 0.4rem 0;
  min-height: clamp(2rem, 4vw, 3rem);
}

.lifecycle-right {
  padding-bottom: clamp(1.5rem, 3vw, 2.5rem);
}

.lifecycle-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--white);
  text-transform: uppercase;
  margin: 0 0 0.4rem;
  padding-top: 0.25rem;
}

.lifecycle-detail {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(0.85rem, 1.3vw, 0.95rem);
  line-height: 1.6;
  color: rgba(232, 234, 255, 0.6);
  margin: 0;
}

/* ── CTA ─────────────────────────────────────────────────────── */
.cta-section {
  padding: clamp(4rem, 8vw, 7rem) 0;
  border-top: 1px solid rgba(0, 245, 255, 0.08);
}

.cta-inner {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(1rem, 2.5vw, 1.75rem);
}

.cta-heading {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(1.75rem, 5vw, 3.5rem);
  font-weight: 800;
  letter-spacing: 0.04em;
  color: var(--white);
  margin: 0;
  line-height: 1.05;
}

.cta-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
}

/* ── Widget demo section ─────────────────────────────────────── */
.widget-demo-section {
  padding: clamp(4rem, 8vw, 7rem) 0;
  border-top: 1px solid rgba(0, 255, 178, 0.08);
}
.widget-demo-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2rem, 5vw, 5rem);
  align-items: center;
}
.widget-demo-copy { display: flex; flex-direction: column; gap: 1.25rem; }
.widget-demo-headline {
  font-family: 'Space Mono', monospace;
  font-size: clamp(1.25rem, 2.5vw, 2rem);
  font-weight: 700;
  color: #00ffb2;
  text-shadow: 0 0 20px rgba(0,255,178,0.4);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: -0.01em;
}
.widget-demo-sub {
  font-family: 'Space Mono', monospace;
  font-size: 0.875rem; line-height: 1.75;
  color: rgba(232,234,255,0.7);
  max-width: 44ch; margin: 0;
}
.widget-demo-list {
  list-style: none; margin: 0; padding: 0;
  display: flex; flex-direction: column; gap: 0.75rem;
  border-left: 2px solid rgba(0,255,178,0.4);
  padding-left: 1.25rem;
}
.widget-demo-list li {
  font-family: 'Space Mono', monospace;
  font-size: 0.8125rem; line-height: 1.6;
  color: rgba(232,234,255,0.65);
  display: flex; gap: 0.625rem; align-items: flex-start;
}
.wd-bullet { color: #00ffb2; flex-shrink: 0; font-size: 0.75rem; margin-top: 2px; }
.widget-demo-frame { display: flex; justify-content: center; align-items: center; }

@media (max-width: 900px) {
  .widget-demo-inner { grid-template-columns: 1fr; gap: 2.5rem; }
}

/* ── Lifecycle connector ─────────────────────────────────────── */
.lifecycle-connector-svg {
  position: absolute;
  left: calc(clamp(2rem, 4vw, 2.5rem) / 2);
  top: 0; bottom: 0;
  width: 2px;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  opacity: 0.35;
}
.lifecycle-section { position: relative; }

/* ── Responsive ──────────────────────────────────────────────── */
@media (max-width: 1024px) {
  .module-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 700px) {
  .module-grid {
    grid-template-columns: 1fr;
  }

  .arch-row {
    flex-direction: column;
    gap: 0.5rem;
  }

  .arch-arrow--right,
  .arch-arrow--left {
    transform: rotate(90deg);
  }

  .arch-row--connectors {
    display: none;
  }

  .cta-actions {
    flex-direction: column;
    align-items: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .arch-box--primary {
    animation: none;
  }
}

/* ── Animation helpers ─────────────────────────────────────────── */
.section-heading { will-change: clip-path; }
[data-grad-sweep] { position: relative; display: inline-block; }

/* ── Asset & Chain Coverage ──────────────────────────────────── */
.asset-section {
  padding: clamp(4rem, 8vw, 7rem) 0;
  border-top: 1px solid rgba(0, 245, 255, 0.08);
  text-align: center;
}

.asset-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(1.5rem, 4vw, 3rem);
  margin: 0 0 clamp(2rem, 4vw, 3rem);
  flex-wrap: wrap;
}

.asset-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
}

.asset-stat-n {
  font-family: 'Space Mono', monospace;
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 700;
  color: var(--cyan);
  text-shadow: 0 0 24px rgba(0, 245, 255, 0.4);
  line-height: 1;
  letter-spacing: -0.03em;
}

.asset-stat-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: rgba(232, 234, 255, 0.4);
}

.asset-stat-divider {
  width: 1px;
  height: clamp(4rem, 8vw, 6rem);
  background: rgba(0, 245, 255, 0.12);
}

.ticker-chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin: 0 0 1rem;
}

.ticker-chip {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  color: var(--cyan);
  background: rgba(0, 245, 255, 0.04);
  border: 1px solid rgba(0, 245, 255, 0.3);
  padding: 0.3rem 0.75rem;
  border-radius: 2px;
  transition: border-color 0.2s, background 0.2s;
}

.ticker-chip:hover {
  border-color: var(--cyan);
  background: rgba(0, 245, 255, 0.08);
}

.ticker-more {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: rgba(232, 234, 255, 0.35);
  letter-spacing: 0.08em;
  margin: 0;
}

/* ── Flow diagram ────────────────────────────────────────────── */
.flow-section {
  padding: clamp(4rem, 8vw, 7rem) 0;
  border-top: 1px solid rgba(0, 245, 255, 0.08);
}

.flow-diagram {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: clamp(0.5rem, 1.5vw, 1rem);
  margin-top: clamp(2rem, 4vw, 3rem);
}

.flow-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  padding: clamp(0.75rem, 1.5vw, 1.1rem) clamp(1rem, 2.5vw, 1.75rem);
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(0, 245, 255, 0.3);
  border-radius: 3px;
  min-width: clamp(90px, 14vw, 160px);
  text-align: center;
}

.flow-box--highlight {
  border-color: var(--cyan);
  box-shadow: 0 0 14px rgba(0, 245, 255, 0.2);
}

.flow-box-label {
  font-family: 'Space Mono', monospace;
  font-size: clamp(0.6rem, 0.9vw, 0.75rem);
  letter-spacing: 0.1em;
  color: var(--text);
  font-weight: 700;
}

.flow-box-sub {
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  color: rgba(232, 234, 255, 0.4);
  letter-spacing: 0.05em;
  min-height: 1em;
}

.flow-arrow {
  font-family: 'Space Mono', monospace;
  font-size: clamp(0.85rem, 1.5vw, 1rem);
  color: var(--cyan);
  letter-spacing: -0.05em;
  flex-shrink: 0;
  text-shadow: 0 0 8px rgba(0, 245, 255, 0.5);
}

/* ── Social proof ────────────────────────────────────────────── */
.social-proof-section {
  padding: clamp(4rem, 8vw, 7rem) 0;
  border-top: 1px solid rgba(0, 245, 255, 0.08);
}

.quotes-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(1rem, 2.5vw, 1.75rem);
  max-width: 900px;
  margin: 0 auto;
}

.quote-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-left: 3px solid var(--cyan);
  border-radius: 4px;
  padding: clamp(1.25rem, 2.5vw, 1.75rem);
  margin: 0;
  backdrop-filter: blur(16px);
}

.quote-text {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(0.95rem, 1.5vw, 1.1rem);
  font-style: italic;
  line-height: 1.6;
  color: var(--text);
  margin: 0 0 0.75rem;
}

.quote-attr {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: rgba(232, 234, 255, 0.4);
  letter-spacing: 0.06em;
}

/* ── Integration snippet ─────────────────────────────────────── */
.snippet-section {
  padding: clamp(4rem, 8vw, 7rem) 0;
  border-top: 1px solid rgba(0, 245, 255, 0.08);
  text-align: center;
}

.snippet-card {
  max-width: 700px;
  margin: clamp(1.5rem, 3vw, 2.5rem) auto 1.5rem;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 245, 255, 0.2);
  border-radius: 6px;
  overflow: hidden;
  box-shadow: var(--glow-cyan);
  text-align: left;
}

.snippet-block {
  margin: 0;
  padding: clamp(1.25rem, 3vw, 2rem);
  font-family: 'Space Mono', monospace;
  font-size: clamp(0.7rem, 1.1vw, 0.8rem);
  line-height: 1.8;
  overflow-x: auto;
  white-space: pre;
}

.snip-tag  { color: rgba(0, 245, 255, 0.85); }
.snip-attr { color: rgba(168, 85, 247, 0.9); }
.snip-str  { color: rgba(0, 245, 255, 0.6); }
.snip-fn   { color: rgba(232, 234, 255, 0.9); }

.snippet-note {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(0.85rem, 1.3vw, 1rem);
  color: rgba(232, 234, 255, 0.5);
  margin: 0;
}

@media (max-width: 700px) {
  .quotes-row {
    grid-template-columns: 1fr;
  }
  .flow-diagram {
    flex-direction: column;
  }
  .flow-arrow {
    transform: rotate(90deg);
  }
  .asset-stat-divider {
    width: clamp(4rem, 8vw, 6rem);
    height: 1px;
  }
}

/* ── Transaction Pipeline SVG ── */
.pipeline-section { background: #0c1117; border-bottom: 1px solid #1a2332; }
.pipeline-section .section-heading { color: #00ffb2; }
.pipeline-section .eyebrow { color: rgba(0,255,178,0.6); }
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
