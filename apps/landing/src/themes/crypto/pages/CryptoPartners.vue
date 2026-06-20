<template>
  <div class="partners">

    <!-- ── Section 1: Hero ──────────────────────────────────────── -->
    <section class="partners-hero" aria-label="Partner program overview">
      <div class="grid-dots" aria-hidden="true"></div>
      <div class="hero-inner">
        <p class="eyebrow">THE PARTNER PROGRAMME</p>
        <h1 class="headline glitch" data-text="EMBED IT. SET YOUR FEE. EARN WHILE YOU SLEEP.">
          EMBED IT. SET YOUR FEE.<br />EARN WHILE YOU SLEEP.
        </h1>
        <p class="hero-sub">
          Your platform serves the widget. You configure the partner share.
          Every transaction posts revenue to your portal. No CSV exports required.
        </p>
      </div>
    </section>

    <!-- ── Section A: Partner Types ─────────────────────────────── -->
    <section class="partner-types-section" aria-label="Partner types">
      <div class="section-inner">
        <h2 class="section-heading" data-reveal="fade-up">THREE WAYS TO BUILD WITH PRODIGY</h2>
        <div class="partner-types-grid" data-animate-stagger ref="ptypesGridRef">
          <article class="ptype-card" v-for="pt in partnerTypes" :key="pt.icon">
            <span class="ptype-icon" aria-hidden="true">{{ pt.icon }}</span>
            <h3 class="ptype-name">{{ pt.name }}</h3>
            <p class="ptype-desc">{{ pt.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- ── FeeCalculator ─────────────────────────────────────────── -->
    <section class="cp-fee-calc-section" aria-labelledby="cp-fee-calc-h" data-reveal="fade-up">
      <div class="section-inner cp-fee-calc-inner">
        <div class="cp-fee-calc-left">
          <p class="eyebrow">// REVENUE_CALCULATOR</p>
          <h2 id="cp-fee-calc-h" class="section-heading" style="margin-bottom:1.5rem">// REVENUE_CALCULATOR</h2>
          <ul class="cp-fee-bullets">
            <li>Set your own fee layer on top of platform rates</li>
            <li>Earn 15–25% of all platform fees generated</li>
            <li>Paid monthly via partner portal</li>
            <li>Volume discounts kick in automatically</li>
          </ul>
        </div>
        <div class="cp-fee-calc-right">
          <FeeCalculator theme="crypto" />
        </div>
      </div>
    </section>

    <!-- ── Section 2: Revenue counter animation ──────────────────── -->
    <section class="revenue-section" aria-label="Revenue stats" ref="revenueEl">
      <div class="section-inner">
        <div class="counters-card">
          <div class="counters-row">
            <div class="counter-block">
              <div class="counter-number" aria-live="polite" :aria-label="`${displayTxCount} transactions`">
                {{ displayTxCount }}
              </div>
              <div class="counter-label">TRANSACTIONS</div>
            </div>
            <div class="counter-divider" aria-hidden="true"></div>
            <div class="counter-block">
              <div class="counter-number counter-number--currency" aria-live="polite" :aria-label="`€${displayPayout.toFixed(2)} partner payout`">
                €{{ displayPayout.toFixed(2) }}
              </div>
              <div class="counter-label">PARTNER PAYOUT</div>
            </div>
            <div class="counter-divider" aria-hidden="true"></div>
            <div class="counter-block">
              <div class="counter-number counter-number--volume" aria-live="polite" :aria-label="`€${displayVolume.toLocaleString()} volume`">
                €{{ displayVolume.toLocaleString('en-GB') }}
              </div>
              <div class="counter-label">VOLUME</div>
            </div>
          </div>
          <p class="counters-note">
            Configurable per client. Tracked in the partner portal. Visible to admin.
          </p>
        </div>
      </div>
    </section>

    <!-- ── Section 3: Partner dashboard mockup ──────────────────── -->
    <section class="dashboard-section" aria-label="Partner portal preview">
      <div class="section-inner">
        <h2 class="section-heading">PORTAL PREVIEW</h2>
        <p class="dashboard-sub">CSS-only illustration. Not a real app. Clearly labelled.</p>
        <div class="dashboard-mockup" role="img" aria-label="Partner portal dashboard mockup">
          <!-- Demo stamp -->
          <div class="demo-stamp" aria-hidden="true">DEMO</div>
          <!-- Preview label -->
          <div class="preview-label" aria-hidden="true">PORTAL PREVIEW</div>

          <div class="mockup-inner">
            <!-- Sidebar -->
            <nav class="mockup-sidebar" aria-label="Portal navigation (mock)">
              <div class="sidebar-logo">◈ PRODIGY</div>
              <ul class="sidebar-nav" role="list">
                <li class="nav-item nav-item--active">Dashboard</li>
                <li class="nav-item">Transactions</li>
                <li class="nav-item">KYC</li>
                <li class="nav-item">Revenue</li>
                <li class="nav-item">Settings</li>
              </ul>
            </nav>

            <!-- Main area -->
            <div class="mockup-main">
              <!-- Header bar -->
              <div class="mockup-header">
                <span class="mockup-title">PARTNER PORTAL · DEMO VIEW</span>
                <span class="mockup-status">All systems operational <span class="status-dot">●</span></span>
              </div>

              <!-- Stat cards -->
              <div class="mockup-stats">
                <div class="stat-card">
                  <div class="stat-label">Volume</div>
                  <div class="stat-value">€124.8K</div>
                </div>
                <div class="stat-card">
                  <div class="stat-label">Transactions</div>
                  <div class="stat-value">248</div>
                </div>
                <div class="stat-card">
                  <div class="stat-label">Revenue</div>
                  <div class="stat-value stat-value--highlight">€249.60</div>
                </div>
              </div>

              <!-- Transaction table -->
              <div class="mockup-table-wrap">
                <table class="mockup-table">
                  <thead>
                    <tr>
                      <th>TX REF</th>
                      <th>AMOUNT</th>
                      <th>STATUS</th>
                      <th>COMMISSION</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="tx in mockTransactions" :key="tx.ref">
                      <td class="tx-ref">{{ tx.ref }}</td>
                      <td>{{ tx.amount }}</td>
                      <td><span class="tx-settled">{{ tx.status }}</span></td>
                      <td class="tx-commission">{{ tx.commission }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Section 4: Embed code + 4-step row ───────────────────── -->
    <section class="embed-section" aria-label="Integration code">
      <div class="section-inner">
        <div class="embed-card">
          <div class="embed-header">
            <span class="embed-title">THE ENTIRE INTEGRATION</span>
            <span class="embed-badge">COPY &amp; SHIP</span>
          </div>
          <pre class="code-block" role="region" aria-label="Embed code example"><code><span class="c-comment">&lt;!-- Step 1: Drop this in your &lt;head&gt; --&gt;</span>
<span class="c-tag">&lt;script</span> <span class="c-attr">src</span><span class="c-eq">=</span><span class="c-str">"https://cdn.prodigy.finance/widget.js"</span><span class="c-tag">&gt;&lt;/script&gt;</span>

<span class="c-comment">&lt;!-- Step 2: Put this where you want the widget --&gt;</span>
<span class="c-tag">&lt;div</span>
  <span class="c-attr">id</span><span class="c-eq">=</span><span class="c-str">"prodigy-widget"</span>
  <span class="c-attr">data-partner-id</span><span class="c-eq">=</span><span class="c-str">"your-partner-id"</span>
  <span class="c-attr">data-fee</span><span class="c-eq">=</span><span class="c-str">"0.20"</span>
<span class="c-tag">&gt;&lt;/div&gt;</span>

<span class="c-comment">&lt;!-- That's it. You're done. --&gt;</span></code></pre>
          <p class="embed-caption">
            Your partner ID is available in the dashboard the moment you sign up.
            The fee is yours to set. We recommend 0.10–0.50%.
          </p>
        </div>

        <!-- 4-step horizontal row -->
        <div class="steps-row" role="list" aria-label="Partner setup steps">
          <div
            v-for="(step, i) in partnerSteps"
            :key="step.label"
            class="step-tile"
            role="listitem"
          >
            <div class="step-num" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="step-label">{{ step.label }}</div>
            <p class="step-desc">{{ step.desc }}</p>
            <div class="step-connector" v-if="i < partnerSteps.length - 1" aria-hidden="true">→</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Embed in 3 lines ────────────────────────────────────── -->
    <section class="embed3-section" aria-label="Embed code examples">
      <div class="section-inner">
        <p class="embed3-eyebrow">INTEGRATION</p>
        <h2 class="embed3-heading">Embed in 3 lines</h2>

        <!-- Tab switcher -->
        <div class="embed3-tabs" role="tablist" aria-label="Code language tabs">
          <button
            v-for="tab in embed3Tabs"
            :key="tab.id"
            class="embed3-tab"
            :class="{ 'embed3-tab--active': activeTab === tab.id }"
            role="tab"
            :aria-selected="activeTab === tab.id"
            :aria-controls="`tabpanel-${tab.id}`"
            :id="`tab-${tab.id}`"
            type="button"
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Tab panels (only active rendered) -->
        <div
          v-if="activeTab === 'html'"
          :id="`tabpanel-html`"
          role="tabpanel"
          aria-labelledby="tab-html"
          class="embed3-panel"
        >
          <CodeBlock :code="htmlCode" language="html" :copyable="true" />
        </div>
        <div
          v-if="activeTab === 'js'"
          :id="`tabpanel-js`"
          role="tabpanel"
          aria-labelledby="tab-js"
          class="embed3-panel"
        >
          <CodeBlock :code="jsCode" language="js" :copyable="true" />
        </div>
        <div
          v-if="activeTab === 'bash'"
          :id="`tabpanel-bash`"
          role="tabpanel"
          aria-labelledby="tab-bash"
          class="embed3-panel"
        >
          <CodeBlock :code="bashCode" language="bash" :copyable="true" />
        </div>
      </div>
    </section>

    <!-- ── Revenue Calculator ───────────────────────────────── -->
    <section class="rc-section" aria-labelledby="rc-heading">
      <div class="rc-inner">
        <h2 id="rc-heading" class="rc-headline">CALCULATE YOUR REVENUE</h2>
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

    <!-- ── Section B: Commission Table ──────────────────────────── -->
    <section class="commission-section" aria-label="Partner economics">
      <div class="section-inner">
        <h2 class="section-heading" data-reveal="fade-up">PARTNER ECONOMICS</h2>
        <div class="comm-table-wrap" role="region" aria-label="Commission table">
          <table class="comm-table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Technology</th>
                <th scope="col">Referral</th>
                <th scope="col">White-label</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in commissionRows" :key="row.label">
                <td class="comm-label">{{ row.label }}</td>
                <td class="comm-val">{{ row.tech }}</td>
                <td class="comm-val">{{ row.ref }}</td>
                <td class="comm-val">{{ row.wl }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ── Section C: Revenue Flow ───────────────────────────────── -->
    <section class="rev-flow-section" aria-label="Revenue flow diagram">
      <div class="section-inner">
        <h2 class="section-heading" data-reveal="fade-up">YOUR CUT, EVERY TRANSACTION</h2>
        <div class="rev-flow-diagram" role="img" aria-label="Revenue flow: User transaction leads to Prodigy fee which leads to your revenue share">
          <div class="rev-box">
            <span class="rev-box-label">USER TRANSACTION</span>
            <span class="rev-box-amount">€100</span>
          </div>
          <span class="rev-arrow" aria-hidden="true">↓</span>
          <div class="rev-box">
            <span class="rev-box-label">PRODIGY FEE</span>
            <span class="rev-box-amount">0.5% = €0.50</span>
          </div>
          <span class="rev-arrow" aria-hidden="true">↓</span>
          <div class="rev-box rev-box--highlight">
            <span class="rev-box-label">YOUR REVENUE SHARE</span>
            <span class="rev-box-amount">20% = €0.10</span>
          </div>
        </div>
        <p class="rev-flow-note">Every transaction. Real-time. No batch. No spreadsheet.</p>
      </div>
    </section>

    <!-- ── Social Proof Quote ────────────────────────────────────── -->
    <section class="cp-quote-section" aria-label="Partner quote" data-reveal="fade-up">
      <div class="section-inner">
        <figure class="cp-quote-card">
          <blockquote class="cp-quote-text">"Integration was done over a weekend. Revenue started the following Monday. That's the deal."</blockquote>
          <figcaption class="cp-quote-attr">
            <span class="cp-quote-company">CryptoFlow Exchange</span>
            <span class="cp-quote-role">· Berlin · Technology Partner</span>
          </figcaption>
        </figure>
      </div>
    </section>

    <!-- ── Section E: Application Section ───────────────────────── -->
    <section class="partner-apply-section" aria-label="Partner application">
      <div class="section-inner">
        <div class="apply-inner">
          <h2 class="apply-heading" data-reveal="fade-up">// APPLY_NOW</h2>
          <p class="apply-sub">Open partnership. No gatekeeping. Reviewed in 72h.</p>
          <div class="cp-apply-actions">
            <button class="apply-btn" type="button" aria-label="Apply to partner programme (demo)">Start application →</button>
            <a href="#" class="cp-apply-ghost">Read the docs</a>
          </div>
          <p class="apply-note">(Demo — contact partners@prodigy.example)</p>
        </div>
      </div>
    </section>

    <!-- ── CTA ───────────────────────────────────────────────── -->
    <section class="cta-section" aria-label="Partner sign-up call to action">
      <div class="section-inner cta-inner">
        <h2 class="cta-heading">OPEN THE DEMO.<br />IT'S ALREADY RUNNING.</h2>
        <p class="cta-sub">
          The partner dashboard, the fee configuration, the revenue view —
          all live at localhost:5001. No account. No form. No call.
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
          <router-link to="/crypto/pricing" class="btn-ghost">
            SEE THE FEE STRUCTURE
          </router-link>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useCardTiltAll } from '@/composables/useCardTilt'
import FeeCalculator from '@/components/shared/FeeCalculator.vue'

const rcVolume = ref(100000)
const rcMarkup = ref(0.5)
const rcMonthlyEarn = computed(() => rcVolume.value * rcMarkup.value / 100)
import CodeBlock from '../../../components/shared/CodeBlock.vue'

const ptypesGridRef = ref<HTMLElement | null>(null)
useCardTiltAll(ptypesGridRef, '.ptype-card', { maxTilt: 6, scale: 1.025, glowColor: '#00ffb2', glowIntensity: 0.2 })

// ── Partner types ──────────────────────────────────────────────
const partnerTypes = [
  {
    icon: '◈',
    name: 'TECHNOLOGY PARTNER',
    desc: 'Embed the widget in your product. Earn 20% revenue share on every transaction your users make. Full API access, co-marketing budget, dedicated partner manager.',
  },
  {
    icon: '◎',
    name: 'REFERRAL PARTNER',
    desc: 'Refer fintech or exchange teams to Prodigy. Earn 15% of their first-year transaction revenue. Zero integration work required.',
  },
  {
    icon: '◉',
    name: 'WHITE-LABEL RESELLER',
    desc: 'Sell Prodigy under your own brand. Full brand rights. Custom pricing. Dedicated support. Enterprise-only.',
  },
]

// ── Commission rows ────────────────────────────────────────────
const commissionRows = [
  { label: 'Revenue share',   tech: '20%',         ref: '15% (yr 1)',  wl: 'Custom' },
  { label: 'Attribution',     tech: '12 months',   ref: '30 days',     wl: 'N/A' },
  { label: 'Payout',          tech: 'Monthly',     ref: 'Monthly',     wl: 'Negotiated' },
  { label: 'API access',      tech: 'Full',        ref: 'Read-only',   wl: 'Full' },
  { label: 'Co-marketing',    tech: 'Yes',         ref: 'Co-branded',  wl: 'Custom' },
  { label: 'Partner manager', tech: 'Dedicated',   ref: 'Shared',      wl: 'Dedicated' },
]

// ── Revenue counters ───────────────────────────────────────────
const displayTxCount = ref(0)
const displayPayout = ref(0)
const displayVolume = ref(0)

const TARGET_TX = 248
const TARGET_PAYOUT = 249.60
const TARGET_VOLUME = 124800

const revenueEl = ref<HTMLElement | null>(null)
let revenueObserver: IntersectionObserver | null = null
let rafHandles: number[] = []

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 4)
}

function animateCounters() {
  const start = performance.now()
  const duration = 2000

  function tick(now: number) {
    const t = Math.min((now - start) / duration, 1)
    const e = easeOut(t)
    displayTxCount.value = Math.round(TARGET_TX * e)
    displayPayout.value = TARGET_PAYOUT * e
    displayVolume.value = Math.round(TARGET_VOLUME * e)

    if (t < 1) {
      const h = requestAnimationFrame(tick)
      rafHandles.push(h)
    } else {
      displayTxCount.value = TARGET_TX
      displayPayout.value = TARGET_PAYOUT
      displayVolume.value = TARGET_VOLUME
    }
  }

  const h = requestAnimationFrame(tick)
  rafHandles.push(h)
}

// ── Mock transactions ──────────────────────────────────────────
const mockTransactions = [
  { ref: 'PTX-001', amount: '€503.00', status: 'SETTLED', commission: '€1.01' },
  { ref: 'PTX-002', amount: '€1,200.00', status: 'SETTLED', commission: '€2.40' },
  { ref: 'PTX-003', amount: '€750.00', status: 'SETTLED', commission: '€1.50' },
  { ref: 'PTX-004', amount: '€89.50', status: 'SETTLED', commission: '€0.18' },
  { ref: 'PTX-005', amount: '€2,450.00', status: 'SETTLED', commission: '€4.90' },
]

// ── Partner steps ──────────────────────────────────────────────
const partnerSteps = [
  {
    label: 'EMBED',
    desc: 'Add the script tag. Widget renders wherever you put the div.',
  },
  {
    label: 'CONFIGURE',
    desc: 'Set partner share in admin. 0.10%–0.50% is the sweet spot.',
  },
  {
    label: 'TRACK',
    desc: 'Every transaction visible in the portal the moment it settles.',
  },
  {
    label: 'EARN',
    desc: 'Revenue posts per transaction. No batch. No CSV. No wait.',
  },
]

// ── Embed 3-tab code block ────────────────────────────────────
type TabId = 'html' | 'js' | 'bash'
const activeTab = ref<TabId>('html')

const embed3Tabs: { id: TabId; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'js', label: 'JS' },
  { id: 'bash', label: 'Bash' },
]

const htmlCode = `<script src="https://cdn.prodigy.app/widget.js"><\/script>
<prodigy-widget client-id="YOUR_CLIENT_ID"></prodigy-widget>`

const jsCode = `import { ProdigyWidget } from '@prodigy/widget'
new ProdigyWidget({ b2bClientId: 'YOUR_ID' }).mount('#app')`

const bashCode = `npm install @prodigy/widget
# or
pnpm add @prodigy/widget`

onMounted(() => {
  revenueObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (entry?.isIntersecting) {
        animateCounters()
        revenueObserver?.disconnect()
        revenueObserver = null
      }
    },
    { threshold: 0.4 }
  )
  if (revenueEl.value) revenueObserver.observe(revenueEl.value)
})

onUnmounted(() => {
  revenueObserver?.disconnect()
  revenueObserver = null
  rafHandles.forEach((h) => cancelAnimationFrame(h))
  rafHandles = []
})
</script>

<style scoped>
/* ── Tokens ──────────────────────────────────────────────────── */
.partners {
  --bg: #050510;
  --cyan: #00f5ff;
  --purple: #a855f7;
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

/* ── Hero ────────────────────────────────────────────────────── */
.partners-hero {
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
  max-width: 820px;
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
  font-size: clamp(2.25rem, 6.5vw, 5rem);
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
  color: rgba(232, 234, 255, 0.55);
  margin: 0;
}

/* ── Glitch effect ───────────────────────────────────────────── */
@keyframes glitch {
  0%, 85%, 100% { text-shadow: none; clip-path: none; transform: translate(0); }
  20% { text-shadow: -2px 0 #00f5ff, 2px 0 #a855f7; clip-path: inset(20% 0 60% 0); transform: translate(-2px); }
  40% { text-shadow: 2px 0 #a855f7; clip-path: inset(60% 0 20% 0); transform: translate(2px); }
  60% { text-shadow: none; transform: translate(0); clip-path: none; }
}

.glitch {
  animation: glitch 4s infinite;
}

/* ── Revenue counters ────────────────────────────────────────── */
.revenue-section {
  padding: clamp(4rem, 8vw, 6rem) 0;
  border-top: 1px solid rgba(0, 245, 255, 0.08);
}

.counters-card {
  max-width: 900px;
  margin: 0 auto;
  padding: clamp(2rem, 5vw, 3.5rem);
  background: var(--card-bg);
  border: 1px solid rgba(0, 245, 255, 0.2);
  border-radius: 8px;
  box-shadow: var(--glow-cyan);
  text-align: center;
}

.counters-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(1rem, 4vw, 3rem);
  flex-wrap: wrap;
  margin-bottom: clamp(1.5rem, 3vw, 2rem);
}

.counter-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
}

.counter-divider {
  width: 1px;
  height: clamp(3rem, 6vw, 5rem);
  background: rgba(0, 245, 255, 0.12);
  flex-shrink: 0;
}

.counter-number {
  font-family: 'Space Mono', monospace;
  font-size: clamp(2.5rem, 7vw, 5rem);
  font-weight: 700;
  color: var(--cyan);
  text-shadow: 0 0 24px rgba(0, 245, 255, 0.4);
  line-height: 1;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
}

.counter-number--currency {
  color: #22c55e;
  text-shadow: 0 0 24px rgba(34, 197, 94, 0.35);
}

.counter-number--volume {
  color: rgba(168, 85, 247, 0.9);
  text-shadow: 0 0 24px rgba(168, 85, 247, 0.35);
}

.counter-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: rgba(232, 234, 255, 0.4);
  text-transform: uppercase;
}

.counters-note {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(0.85rem, 1.3vw, 0.95rem);
  line-height: 1.55;
  color: rgba(232, 234, 255, 0.4);
  margin: 0;
}

/* ── Dashboard mockup ────────────────────────────────────────── */
.dashboard-section {
  padding: clamp(4rem, 8vw, 7rem) 0;
  border-top: 1px solid rgba(0, 245, 255, 0.08);
}

.dashboard-sub {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: rgba(232, 234, 255, 0.35);
  text-align: center;
  margin: 0 0 clamp(2rem, 4vw, 3rem);
}

.dashboard-mockup {
  position: relative;
  border: 1px solid rgba(0, 245, 255, 0.2);
  border-radius: 8px;
  overflow: hidden;
  background: rgba(3, 3, 12, 0.95);
  box-shadow: 0 0 40px rgba(0, 245, 255, 0.08);
  max-width: 1100px;
  margin: 0 auto;
}

.demo-stamp {
  position: absolute;
  top: clamp(0.75rem, 2vw, 1.25rem);
  right: clamp(0.75rem, 2vw, 1.25rem);
  z-index: 10;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(0.8rem, 1.5vw, 1.1rem);
  font-weight: 800;
  letter-spacing: 0.2em;
  color: rgba(168, 85, 247, 0.7);
  border: 2px solid rgba(168, 85, 247, 0.4);
  padding: 0.2rem 0.6rem;
  border-radius: 3px;
  transform: rotate(-8deg);
}

.preview-label {
  position: absolute;
  bottom: clamp(0.5rem, 1.5vw, 0.75rem);
  left: clamp(0.75rem, 2vw, 1.25rem);
  z-index: 10;
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  color: rgba(232, 234, 255, 0.2);
}

.mockup-inner {
  display: flex;
  min-height: clamp(280px, 40vw, 460px);
}

/* Sidebar */
.mockup-sidebar {
  width: clamp(100px, 14vw, 160px);
  background: rgba(0, 0, 0, 0.4);
  border-right: 1px solid rgba(0, 245, 255, 0.08);
  flex-shrink: 0;
  padding: clamp(0.75rem, 2vw, 1.5rem) 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sidebar-logo {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(0.7rem, 1.2vw, 0.9rem);
  font-weight: 700;
  letter-spacing: 0.15em;
  color: var(--cyan);
  padding: 0 clamp(0.75rem, 1.5vw, 1rem);
}

.sidebar-nav {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.nav-item {
  padding: clamp(0.4rem, 1vw, 0.6rem) clamp(0.75rem, 1.5vw, 1rem);
  font-family: 'Space Mono', monospace;
  font-size: clamp(0.6rem, 0.9vw, 0.7rem);
  color: rgba(232, 234, 255, 0.35);
  letter-spacing: 0.05em;
  cursor: default;
  transition: color 0.2s, background 0.2s;
}

.nav-item--active {
  color: var(--cyan);
  background: rgba(0, 245, 255, 0.06);
  border-left: 2px solid var(--cyan);
}

/* Main area */
.mockup-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.mockup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: clamp(0.5rem, 1.5vw, 0.75rem) clamp(1rem, 2.5vw, 1.5rem);
  background: rgba(0, 245, 255, 0.03);
  border-bottom: 1px solid rgba(0, 245, 255, 0.08);
  gap: 1rem;
}

.mockup-title {
  font-family: 'Space Mono', monospace;
  font-size: clamp(0.6rem, 0.9vw, 0.75rem);
  letter-spacing: 0.12em;
  color: rgba(232, 234, 255, 0.5);
}

.mockup-status {
  font-family: 'Space Mono', monospace;
  font-size: clamp(0.6rem, 0.9vw, 0.7rem);
  color: rgba(232, 234, 255, 0.3);
  display: flex;
  align-items: center;
  gap: 0.35rem;
  white-space: nowrap;
}

.status-dot {
  color: #22c55e;
}

.mockup-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(0.5rem, 1.5vw, 1rem);
  padding: clamp(0.75rem, 2vw, 1.25rem) clamp(1rem, 2.5vw, 1.5rem);
}

.stat-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(0, 245, 255, 0.08);
  border-radius: 4px;
  padding: clamp(0.5rem, 1.5vw, 0.875rem);
}

.stat-label {
  font-family: 'Space Mono', monospace;
  font-size: clamp(0.55rem, 0.8vw, 0.65rem);
  letter-spacing: 0.1em;
  color: rgba(232, 234, 255, 0.35);
  margin-bottom: 0.3rem;
}

.stat-value {
  font-family: 'Space Mono', monospace;
  font-size: clamp(0.85rem, 1.5vw, 1.1rem);
  font-weight: 700;
  color: var(--text);
}

.stat-value--highlight {
  color: #22c55e;
}

.mockup-table-wrap {
  flex: 1;
  overflow-x: auto;
  padding: 0 clamp(1rem, 2.5vw, 1.5rem) clamp(1rem, 2vw, 1.5rem);
}

.mockup-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Space Mono', monospace;
  font-size: clamp(0.55rem, 0.85vw, 0.7rem);
}

.mockup-table th {
  padding: 0.4rem 0.75rem;
  text-align: left;
  color: rgba(0, 245, 255, 0.6);
  letter-spacing: 0.1em;
  font-weight: 400;
  border-bottom: 1px solid rgba(0, 245, 255, 0.08);
}

.mockup-table td {
  padding: 0.4rem 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  color: rgba(232, 234, 255, 0.55);
}

.tx-ref {
  color: rgba(232, 234, 255, 0.75) !important;
}

.tx-settled {
  color: #22c55e;
  font-size: clamp(0.5rem, 0.75vw, 0.65rem);
  letter-spacing: 0.08em;
}

.tx-commission {
  color: rgba(0, 245, 255, 0.6) !important;
}

/* ── Embed code ──────────────────────────────────────────────── */
.embed-section {
  padding: clamp(4rem, 8vw, 6rem) 0;
  border-top: 1px solid rgba(0, 245, 255, 0.08);
}

.embed-card {
  max-width: 720px;
  margin: 0 auto clamp(3rem, 6vw, 5rem);
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 245, 255, 0.2);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--glow-cyan);
}

.embed-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.25rem;
  background: rgba(0, 245, 255, 0.05);
  border-bottom: 1px solid rgba(0, 245, 255, 0.12);
}

.embed-title {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: rgba(232, 234, 255, 0.4);
}

.embed-badge {
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  color: var(--cyan);
  border: 1px solid rgba(0, 245, 255, 0.35);
  padding: 0.15rem 0.5rem;
  border-radius: 2px;
}

.code-block {
  margin: 0;
  padding: clamp(1.25rem, 3vw, 2rem);
  font-family: 'Space Mono', monospace;
  font-size: clamp(0.7rem, 1.2vw, 0.8rem);
  line-height: 1.7;
  overflow-x: auto;
  white-space: pre;
}

.c-comment { color: rgba(232, 234, 255, 0.25); }
.c-tag     { color: rgba(0, 245, 255, 0.85); }
.c-attr    { color: rgba(168, 85, 247, 0.9); }
.c-eq      { color: rgba(232, 234, 255, 0.4); }
.c-str     { color: rgba(0, 245, 255, 0.6); }

.embed-caption {
  padding: 0.75rem 1.25rem;
  border-top: 1px solid rgba(0, 245, 255, 0.08);
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(0.8rem, 1.3vw, 0.9rem);
  color: rgba(232, 234, 255, 0.35);
  margin: 0;
}

/* ── 4-step row ──────────────────────────────────────────────── */
.steps-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(0.5rem, 1.5vw, 1rem);
  position: relative;
}

.step-tile {
  position: relative;
  padding: clamp(1rem, 2.5vw, 1.5rem);
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 6px;
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.2s;
}

.step-tile:hover {
  border-color: rgba(0, 245, 255, 0.4);
  box-shadow: var(--glow-cyan);
  transform: translateY(-3px);
}

.step-num {
  font-family: 'Space Mono', monospace;
  font-size: clamp(1.25rem, 2.5vw, 2rem);
  font-weight: 700;
  color: rgba(0, 245, 255, 0.1);
  line-height: 1;
  margin-bottom: 0.5rem;
}

.step-label {
  font-family: 'Space Mono', monospace;
  font-size: clamp(0.75rem, 1.2vw, 0.9rem);
  letter-spacing: 0.12em;
  color: var(--cyan);
  margin-bottom: 0.5rem;
}

.step-desc {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(0.8rem, 1.3vw, 0.9rem);
  line-height: 1.5;
  color: rgba(232, 234, 255, 0.55);
  margin: 0;
}

.step-connector {
  position: absolute;
  top: 50%;
  right: calc(-1 * clamp(0.5rem, 1.5vw, 1rem) / 2 - 0.65rem);
  transform: translateY(-50%);
  font-family: 'Space Mono', monospace;
  font-size: 1rem;
  color: rgba(0, 245, 255, 0.3);
  z-index: 1;
  pointer-events: none;
}

/* ── Embed in 3 lines section ────────────────────────────────── */
.embed3-section {
  padding: clamp(4rem, 8vw, 6rem) 0;
  border-top: 1px solid rgba(0, 245, 255, 0.08);
}

.embed3-eyebrow {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.25em;
  color: var(--cyan);
  margin: 0 0 0.75rem;
  text-align: center;
}

.embed3-heading {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--white);
  text-align: center;
  margin: 0 0 clamp(1.5rem, 3vw, 2.5rem);
}

.embed3-tabs {
  display: flex;
  gap: 0;
  justify-content: center;
  margin-bottom: 0;
  border-bottom: 1px solid rgba(0, 245, 255, 0.12);
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
}

.embed3-tab {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  color: rgba(232, 234, 255, 0.45);
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  padding: 0.65rem 1.5rem;
  cursor: pointer;
  transition: color 0.2s, border-bottom-color 0.2s;
  margin-bottom: -1px;
}

.embed3-tab:hover {
  color: rgba(232, 234, 255, 0.75);
}

.embed3-tab--active {
  color: var(--cyan);
  border-bottom-color: var(--cyan);
}

.embed3-tab:focus-visible {
  outline: 2px solid var(--cyan);
  outline-offset: 2px;
  border-radius: 2px;
}

.embed3-panel {
  max-width: 640px;
  margin: 0 auto;
  border: 1px solid rgba(0, 245, 255, 0.12);
  border-top: none;
  border-radius: 0 0 8px 8px;
  overflow: hidden;
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
  gap: clamp(0.75rem, 2vw, 1.25rem);
}

.cta-heading {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(1.75rem, 4vw, 3.25rem);
  font-weight: 800;
  letter-spacing: 0.03em;
  line-height: 1.1;
  color: var(--white);
  margin: 0;
}

.cta-sub {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(0.95rem, 1.5vw, 1.1rem);
  line-height: 1.6;
  color: rgba(232, 234, 255, 0.5);
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

/* ── Responsive ──────────────────────────────────────────────── */
@media (max-width: 900px) {
  .steps-row {
    grid-template-columns: repeat(2, 1fr);
  }

  .step-connector {
    display: none;
  }

  .counter-divider {
    display: none;
  }

  .counters-row {
    gap: clamp(1.5rem, 3vw, 2rem);
  }
}

@media (max-width: 600px) {
  .steps-row {
    grid-template-columns: 1fr;
  }

  .mockup-stats {
    grid-template-columns: 1fr;
  }

  .cta-actions {
    flex-direction: column;
    align-items: center;
  }

  .mockup-sidebar {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .glitch {
    animation: none;
  }
}

/* ── Partner Types ───────────────────────────────────────────── */
.partner-types-section {
  padding: clamp(4rem, 8vw, 7rem) 0;
  border-top: 1px solid rgba(0, 245, 255, 0.08);
}

.partner-types-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(1rem, 2vw, 1.5rem);
  margin-top: clamp(1.5rem, 3vw, 2.5rem);
}

.ptype-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 6px;
  padding: clamp(1.25rem, 2.5vw, 2rem);
  backdrop-filter: blur(16px);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.2s;
}

.ptype-card:hover {
  border-color: rgba(0, 245, 255, 0.4);
  box-shadow: var(--glow-cyan);
  transform: translateY(-3px);
}

.ptype-icon {
  font-size: 1.5rem;
  color: var(--cyan);
  text-shadow: 0 0 10px rgba(0, 245, 255, 0.5);
  line-height: 1;
}

.ptype-name {
  font-family: 'Space Mono', monospace;
  font-size: clamp(0.75rem, 1.2vw, 0.875rem);
  letter-spacing: 0.1em;
  color: var(--cyan);
  margin: 0;
}

.ptype-desc {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(0.875rem, 1.4vw, 1rem);
  line-height: 1.6;
  color: rgba(232, 234, 255, 0.65);
  margin: 0;
}

/* ── Commission Table ────────────────────────────────────────── */
.commission-section {
  padding: clamp(4rem, 8vw, 7rem) 0;
  border-top: 1px solid rgba(0, 245, 255, 0.08);
}

.comm-table-wrap {
  overflow-x: auto;
  border-radius: 6px;
  border: 1px solid rgba(0, 245, 255, 0.15);
  margin-top: clamp(1.5rem, 3vw, 2.5rem);
}

.comm-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
}

.comm-table thead { background: rgba(0, 245, 255, 0.05); }

.comm-table th {
  padding: clamp(0.75rem, 1.5vw, 1rem) clamp(0.75rem, 2vw, 1.25rem);
  text-align: left;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--cyan);
  border-bottom: 1px solid rgba(0, 245, 255, 0.15);
  white-space: nowrap;
}

.comm-table td {
  padding: clamp(0.6rem, 1.2vw, 0.875rem) clamp(0.75rem, 2vw, 1.25rem);
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  white-space: nowrap;
}

.comm-table tr:last-child td { border-bottom: none; }
.comm-table tr:hover td { background: rgba(0, 245, 255, 0.02); }

.comm-label { color: rgba(232, 234, 255, 0.5); font-size: 0.75rem; letter-spacing: 0.08em; text-transform: uppercase; }
.comm-val { color: rgba(232, 234, 255, 0.8); }

/* ── Revenue Flow ────────────────────────────────────────────── */
.rev-flow-section {
  padding: clamp(4rem, 8vw, 7rem) 0;
  border-top: 1px solid rgba(0, 245, 255, 0.08);
  text-align: center;
}

.rev-flow-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  max-width: 380px;
  margin: clamp(1.5rem, 3vw, 2.5rem) auto 1.5rem;
}

.rev-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  padding: clamp(0.875rem, 2vw, 1.25rem) clamp(1rem, 2.5vw, 1.75rem);
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(0, 245, 255, 0.25);
}

.rev-box--highlight {
  border-color: var(--cyan);
  background: rgba(0, 245, 255, 0.06);
  box-shadow: 0 0 16px rgba(0, 245, 255, 0.15);
}

.rev-box-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: rgba(232, 234, 255, 0.5);
  text-transform: uppercase;
}

.rev-box-amount {
  font-family: 'Space Mono', monospace;
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  font-weight: 700;
  color: var(--cyan);
}

.rev-arrow {
  font-family: 'Space Mono', monospace;
  font-size: 1.25rem;
  color: rgba(0, 245, 255, 0.4);
  line-height: 1.5;
}

.rev-flow-note {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: rgba(232, 234, 255, 0.3);
  letter-spacing: 0.08em;
  margin: 0;
}

/* ── Partner Testimonial ─────────────────────────────────────── */
.partner-testimonial-section {
  padding: clamp(4rem, 8vw, 7rem) 0;
  border-top: 1px solid rgba(0, 245, 255, 0.08);
}

.ptestimonial-card {
  max-width: 720px;
  margin: 0 auto;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-left: 3px solid var(--cyan);
  border-radius: 4px;
  padding: clamp(1.5rem, 3vw, 2.5rem);
  backdrop-filter: blur(16px);
  box-shadow: var(--glow-cyan);
}

.ptestimonial-text {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(1.1rem, 2vw, 1.35rem);
  font-style: italic;
  line-height: 1.6;
  color: var(--text);
  margin: 0 0 1rem;
}

.ptestimonial-attr {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: rgba(232, 234, 255, 0.4);
  letter-spacing: 0.06em;
}

/* ── Apply Section ───────────────────────────────────────────── */
.partner-apply-section {
  padding: clamp(4rem, 8vw, 7rem) 0;
  border-top: 1px solid rgba(0, 245, 255, 0.08);
  background: rgba(0, 245, 255, 0.02);
}

.apply-inner {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(0.75rem, 1.5vw, 1.25rem);
}

.apply-heading {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(1.75rem, 5vw, 3.5rem);
  font-weight: 800;
  letter-spacing: 0.05em;
  color: var(--white);
  margin: 0;
}

.apply-sub {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(0.95rem, 1.5vw, 1.1rem);
  line-height: 1.6;
  color: rgba(232, 234, 255, 0.55);
  max-width: 48ch;
  margin: 0;
}

.apply-btn {
  font-family: 'Space Mono', monospace;
  font-size: clamp(0.8rem, 1.4vw, 0.9rem);
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #050510;
  background: var(--cyan);
  padding: 0.875rem 2.25rem;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
}

.apply-btn:hover {
  background: var(--white);
  box-shadow: var(--glow-cyan);
  transform: translateY(-1px);
}

.apply-note {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: rgba(232, 234, 255, 0.3);
  margin: 0;
  letter-spacing: 0.04em;
}

@media (max-width: 900px) {
  .partner-types-grid { grid-template-columns: 1fr; }
}

/* ── Fee Calculator section ── */
.cp-fee-calc-section { padding: clamp(4rem, 8vw, 6rem) 0; border-top: 1px solid rgba(0,245,255,0.08); }
.cp-fee-calc-inner { display: grid; grid-template-columns: 1fr 1.4fr; gap: 3rem; align-items: start; }
.cp-fee-calc-left { display: flex; flex-direction: column; gap: 1rem; }
.cp-fee-bullets { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.625rem; }
.cp-fee-bullets li { font-family: 'Space Mono', monospace; font-size: 0.8125rem; line-height: 1.6; color: rgba(232,234,255,0.65); padding-left: 1.5rem; position: relative; }
.cp-fee-bullets li::before { content: '>'; position: absolute; left: 0; color: #00f5ff; font-weight: 700; }
.cp-fee-calc-right { min-width: 0; }
@media (max-width: 900px) { .cp-fee-calc-inner { grid-template-columns: 1fr; } }

/* ── Quote section ── */
.cp-quote-section { padding: clamp(3rem, 6vw, 5rem) 0; border-top: 1px solid rgba(0,245,255,0.08); }
.cp-quote-card { margin: 0; background: var(--card-bg); border: 1px solid rgba(0,245,255,0.2); border-left: 3px solid #00f5ff; border-radius: 4px; padding: 2rem 2.5rem; max-width: 720px; backdrop-filter: blur(16px); }
.cp-quote-text { font-family: 'Barlow Condensed', sans-serif; font-size: clamp(1rem,1.8vw,1.25rem); font-style: italic; line-height: 1.6; color: var(--text); margin: 0 0 1rem; }
.cp-quote-attr { display: flex; gap: 0.5rem; align-items: baseline; font-family: 'Space Mono', monospace; font-size: 0.75rem; }
.cp-quote-company { color: #00f5ff; font-weight: 700; }
.cp-quote-role { color: rgba(232,234,255,0.4); }

/* ── Apply actions ── */
.cp-apply-actions { display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; justify-content: center; }
.cp-apply-ghost { font-family: 'Space Mono', monospace; font-size: clamp(0.8rem,1.4vw,0.9rem); font-weight: 700; letter-spacing: 0.1em; color: rgba(0,245,255,0.7); text-decoration: underline; text-underline-offset: 3px; }
.cp-apply-ghost:hover { color: #00f5ff; }

/* ── Revenue Calculator ── */
.rc-section { background: #050510; border-top: 1px solid rgba(0,245,255,0.1); }
.rc-inner { max-width: 1440px; margin: 0 auto; padding: 5rem 1.5rem; }
.rc-headline { font-family: 'Space Mono', monospace; font-size: clamp(1.5rem, 3vw, 2.5rem); color: #00f5ff; margin: 0 0 0.5rem; letter-spacing: -0.02em; text-transform: uppercase; }
.rc-sub { font-family: 'Space Mono', monospace; font-size: 0.875rem; color: rgba(0,245,255,0.5); margin: 0 0 3rem; }
.rc-controls { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 3rem; }
.rc-field { display: flex; flex-direction: column; gap: 0.5rem; }
.rc-label { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: rgba(0,245,255,0.5); letter-spacing: 0.05em; }
.rc-slider { width: 100%; accent-color: #00f5ff; }
.rc-val { font-family: 'Space Mono', monospace; font-size: 0.875rem; color: #00f5ff; }
.rc-result { border: 1px solid rgba(0,245,255,0.3); background: rgba(0,245,255,0.03); padding: 2rem; display: flex; flex-direction: column; gap: 0.5rem; }
.rc-result-label { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: rgba(0,245,255,0.4); text-transform: uppercase; letter-spacing: 0.1em; }
.rc-result-num { font-family: 'Space Mono', monospace; font-size: clamp(2rem, 5vw, 4rem); color: #00f5ff; text-shadow: 0 0 20px rgba(0,245,255,0.4); }
@media (max-width: 768px) { .rc-controls { grid-template-columns: 1fr; } }
</style>
