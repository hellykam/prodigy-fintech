<template>
  <main>
    <!-- ── Section 1: Hero ──────────────────────────────────────────── -->
    <section class="hero" aria-labelledby="partners-heading">
      <div class="mesh-blob mesh-blob-1" aria-hidden="true" />
      <div class="mesh-blob mesh-blob-2" aria-hidden="true" />

      <div class="hero-inner">
        <div class="eyebrow-badge" role="note">
          <span aria-hidden="true">✦</span> Partner programme
        </div>
        <h1 id="partners-heading" class="hero-h1">
          Partner With Us.<br />
          <em>Actually</em> Make Money.
        </h1>
        <p class="hero-sub">
          Every transaction through your platform earns you a configurable share. The portal tracks it live. The maths is not hidden in a spreadsheet from 2019.
        </p>
        <div class="hero-actions">
          <a
            href="http://localhost:5006"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary-white"
          >Open Partner Portal →</a>
          <a
            href="http://localhost:5002"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-ghost"
          >Open Admin Console</a>
        </div>

        <!-- Revenue card floating -->
        <div class="hero-card" aria-hidden="true">
          <p class="card-eyebrow">PARTNER REVENUE STATEMENT</p>
          <div class="card-rows">
            <div class="card-row">
              <span class="row-label">Transaction volume</span>
              <span class="row-val">€124,800</span>
            </div>
            <div class="card-row">
              <span class="row-label">Platform fee (0.5%)</span>
              <span class="row-val">€624.00</span>
            </div>
            <div class="card-row">
              <span class="row-label">Partner share (0.2%)</span>
              <span class="row-val accent">€249.60</span>
            </div>
            <div class="card-row">
              <span class="row-label">Transactions</span>
              <span class="row-val">248</span>
            </div>
          </div>
          <div class="card-payout">
            <span>Partner payout</span>
            <span class="payout-val">€249.60</span>
          </div>
          <p class="card-note">Updates with every transaction. No month-end wait.</p>
        </div>
      </div>
    </section>

    <!-- ── Section 2: Integration ───────────────────────────────────── -->
    <section class="integration-section" aria-labelledby="integration-heading">
      <div class="section-inner">
        <p class="section-eyebrow">The integration</p>
        <h2 id="integration-heading" class="section-h2">
          One Script Tag.<br />
          <em>Unlimited</em> Revenue Sharing.
        </h2>
        <p class="section-sub">
          Your platform embeds the widget. You configure the partner share. The portal tracks every commission. A motivated developer has it live before lunch.
        </p>

        <div class="code-card">
          <div class="code-header">
            <div class="code-dots" aria-hidden="true">
              <span class="dot red" /><span class="dot yellow" /><span class="dot green" />
            </div>
            <span class="code-title">embed.html</span>
          </div>
          <pre class="code-block"><code>&lt;script
  src="https://widget.prodigy.demo/embed.js"
  data-client-id="YOUR_CLIENT_ID"
  data-currency="EUR"
  data-partner-share="0.002"
&gt;&lt;/script&gt;</code></pre>
          <p class="code-caption">That is the entire integration. The widget brings its own KYC, risk engine, fee disclosure, and ledger. You bring a <code class="inline-code">&lt;div&gt;</code>.</p>
        </div>
      </div>
    </section>

    <!-- ── FeeCalculator ────────────────────────────────────────────── -->
    <section class="grd-fee-section" aria-labelledby="grd-fee-h" data-reveal="fade-up">
      <div class="grd-fee-inner">
        <div class="grd-fee-left">
          <h2 id="grd-fee-h" class="grd-fee-headline">How much could you earn?</h2>
          <ul class="grd-fee-bullets">
            <li>Set your own fee layer on top of platform rates</li>
            <li>Earn 15–25% of all platform fees generated</li>
            <li>Paid monthly via partner portal</li>
            <li>Volume discounts kick in automatically</li>
          </ul>
        </div>
        <div class="grd-fee-right">
          <FeeCalculator theme="gradient" />
        </div>
      </div>
    </section>

    <!-- ── Section 3: Steps ─────────────────────────────────────────── -->
    <section class="steps-section" aria-labelledby="steps-heading">
      <div class="section-inner">
        <p class="section-eyebrow">How it works</p>
        <h2 id="steps-heading" class="section-h2">Up and running <em>today</em>.</h2>

        <div class="steps-grid" data-animate-stagger>
          <div v-for="step in steps" :key="step.n" class="step-card">
            <div class="step-icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="step-icon">
                <path :d="step.iconPath" />
              </svg>
            </div>
            <p class="step-n">{{ step.n }}</p>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-detail">{{ step.detail }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Section 3b: Revenue Stats ─────────────────────────────────── -->
    <section class="gp-stats-section" aria-labelledby="gp-stats-heading">
      <div class="gp-section-inner">
        <p class="gp-section-eyebrow">REVENUE METRICS</p>
        <h2 id="gp-stats-heading" class="gp-section-h2">
          Numbers that <em>move</em>.
        </h2>
        <div class="gp-stats-grid">
          <div
            v-for="stat in partnerStats"
            :key="stat.label"
            class="gp-stat-card"
          >
            <CounterStat
              :value="stat.value"
              :prefix="stat.prefix"
              :suffix="stat.suffix"
              :label="stat.label"
              accent-color="#a855f7"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ── Section 3c: Partner Code ────────────────────────────────── -->
    <section class="gp-code-section" aria-labelledby="gp-code-heading">
      <div class="gp-section-inner">
        <p class="gp-section-eyebrow">DEVELOPER INTEGRATION</p>
        <h2 id="gp-code-heading" class="gp-section-h2">
          Built for <em>Web3</em> platforms.
        </h2>
        <p class="gp-code-sub">
          Accept BTC, ETH, SOL, and USDC out of the box. On-ramp and off-ramp in one widget.
        </p>
        <CodeBlock :code="partnerCode" language="js" />
      </div>
    </section>

    <!-- ── Revenue Calculator ──────────────────────────────────────── -->
    <section class="rc-section" aria-labelledby="rc-heading" data-reveal="fade-up">
      <div class="rc-inner">
        <h2 id="rc-heading" class="rc-headline">Revenue Calculator</h2>
        <p class="rc-sub">Drag the sliders. See what Prodigy pays you every month.</p>
        <div class="rc-controls">
          <div class="rc-field">
            <label for="rc-vol" class="rc-label">Monthly Volume</label>
            <input id="rc-vol" v-model.number="rcVolume" type="range" min="10000" max="5000000" step="10000" class="rc-slider" />
            <span class="rc-val">€{{ rcVolume.toLocaleString('de-DE') }}</span>
          </div>
          <div class="rc-field">
            <label for="rc-markup" class="rc-label">Your Markup</label>
            <input id="rc-markup" v-model.number="rcMarkup" type="range" min="0.1" max="2" step="0.1" class="rc-slider" />
            <span class="rc-val">{{ rcMarkup.toFixed(1) }}%</span>
          </div>
        </div>
        <div class="rc-result" aria-live="polite" aria-label="Revenue estimate">
          <span class="rc-result-label">Your estimated monthly earn</span>
          <span class="rc-result-num">€{{ rcMonthlyEarn.toLocaleString('de-DE', {minimumFractionDigits:2,maximumFractionDigits:2}) }}</span>
        </div>
      </div>
    </section>

    <!-- ── Partner Types ─────────────────────────────────────────────── -->
    <section class="gpp-types-section" aria-labelledby="gpp-types-heading">
      <div class="gpp-types-inner">
        <h2 id="gpp-types-heading" class="gpp-types-h2" data-reveal="fade-up" ref="typesH">
          <span class="gpp-grad">Three ways to grow with Prodigy.</span>
        </h2>
        <div class="gpp-types-grid" data-animate-stagger ref="gradTypesGrid">
          <article class="gpp-glass gpp-type-card">
            <span class="gpp-type-icon" aria-hidden="true">◈</span>
            <h3 class="gpp-type-title">Technology Partner</h3>
            <p class="gpp-type-body">Embed and earn. 20% revenue share on every user transaction.</p>
          </article>
          <article class="gpp-glass gpp-type-card">
            <span class="gpp-type-icon" aria-hidden="true">◎</span>
            <h3 class="gpp-type-title">Referral Partner</h3>
            <p class="gpp-type-body">Refer and earn. 15% of their first-year revenue. No integration needed.</p>
          </article>
          <article class="gpp-glass gpp-type-card">
            <span class="gpp-type-icon" aria-hidden="true">◉</span>
            <h3 class="gpp-type-title">White-label Reseller</h3>
            <p class="gpp-type-body">Own the brand. Custom margin, full brand rights.</p>
          </article>
        </div>
      </div>
    </section>

    <!-- ── Partner Economics ─────────────────────────────────────────── -->
    <section class="gpp-economics-section" aria-labelledby="gpp-economics-heading">
      <div class="gpp-economics-inner">
        <h2 id="gpp-economics-heading" class="gpp-economics-h2" data-reveal="fade-up">Partner economics at a glance.</h2>
        <div class="gpp-glass gpp-table-wrap" role="region" aria-label="Partner economics table" tabindex="0">
          <table class="gpp-table">
            <thead>
              <tr class="gpp-table-head">
                <th scope="col">Type</th>
                <th scope="col">Revenue Share</th>
                <th scope="col">Attribution</th>
                <th scope="col">Payout</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="gpp-td-bold">Technology</td>
                <td>20%</td>
                <td>12 months</td>
                <td>Monthly</td>
              </tr>
              <tr>
                <td class="gpp-td-bold">Referral</td>
                <td>15% (yr 1)</td>
                <td>30 days</td>
                <td>Monthly</td>
              </tr>
              <tr>
                <td class="gpp-td-bold">White-label</td>
                <td>Custom</td>
                <td>N/A</td>
                <td>Negotiated</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ── Partner Quote ─────────────────────────────────────────────── -->
    <section class="gpp-pquote-section" aria-label="Partner testimonial">
      <div class="gpp-pquote-inner">
        <figure class="gpp-glass gpp-pquote-card" data-reveal="fade-up">
          <blockquote class="gpp-pquote-text">"We tell every fintech we work with: just use Prodigy. We've been a partner since month one."</blockquote>
          <figcaption class="gpp-pquote-attr">
            <span class="gpp-pquote-company">CryptoFlow Exchange</span>
            <span class="gpp-pquote-role">· Berlin · Technology Partner</span>
          </figcaption>
        </figure>
      </div>
    </section>

    <!-- ── Apply CTA ──────────────────────────────────────────────────── -->
    <section class="gpp-apply-section" aria-labelledby="gpp-apply-heading" ref="applySection">
      <div class="gpp-apply-inner">
        <h2 id="gpp-apply-heading" class="gpp-apply-h2" data-reveal="fade-up">Let's grow together.</h2>
        <p class="gpp-apply-sub">Beautiful products deserve beautiful partnerships. Apply in 3 minutes.</p>
        <div class="gpp-apply-actions">
          <a href="mailto:partners@prodigy.example" class="gpp-apply-btn">Apply now →</a>
          <a href="#" class="gpp-apply-secondary">See partner success stories</a>
        </div>
        <p class="gpp-apply-note">(Demo — partners@prodigy.example)</p>
      </div>
    </section>

    <!-- ── Section 4: CTA ───────────────────────────────────────────── -->
    <section class="cta-section" aria-label="Call to action">
      <div class="mesh-blob cta-blob-1" aria-hidden="true" />
      <div class="mesh-blob cta-blob-2" aria-hidden="true" />
      <div class="cta-inner">
        <div class="cta-badge" aria-hidden="true">✦</div>
        <h2 class="cta-h2">
          The demo is free.<br />The integration is one tag.<br /><em>The rest is your revenue.</em>
        </h2>
        <p class="cta-sub">Open the partner portal and the admin console — everything visible, nothing hidden.</p>
        <div class="cta-actions">
          <a
            href="http://localhost:5006"
            target="_blank"
            rel="noopener noreferrer"
            class="cta-btn-primary"
          >Open Partner Portal →</a>
          <a
            href="http://localhost:5002"
            target="_blank"
            rel="noopener noreferrer"
            class="cta-btn-ghost"
          >Admin Console</a>
        </div>
        <p class="cta-footnote">→ <a href="http://localhost:5001" target="_blank" rel="noopener noreferrer">localhost:5001</a> for the full consumer flow</p>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { CounterStat, CodeBlock } from '@/components/shared'
import { useClipReveal } from '@/composables/useSplitReveal'
import { useMagneticAll } from '@/composables/useMagneticButton'
import { useCardTiltAll } from '@/composables/useCardTilt'
import FeeCalculator from '@/components/shared/FeeCalculator.vue'

// ── Animation refs ─────────────────────────────────────────────
const typesH = ref<HTMLElement | null>(null)
const applySection = ref<HTMLElement | null>(null)
const gradTypesGrid = ref<HTMLElement | null>(null)

// The types heading has a <span> child — use clip reveal per critical rules
useClipReveal(typesH, { direction: 'up', duration: 0.8 })
useMagneticAll(applySection, 'a, button', { strength: 0.4, returnDuration: 500 })
useCardTiltAll(gradTypesGrid, '.gpp-type-card', { maxTilt: 8, scale: 1.03, glowColor: '#a855f7', glowIntensity: 0.3 })

const rcVolume = ref(100000)
const rcMarkup = ref(0.5)
const rcMonthlyEarn = computed(() => rcVolume.value * rcMarkup.value / 100)

const partnerCode = `// Add Prodigy to your Web3 dApp
import { ProdigyWidget } from '@prodigy/widget'

// Configure for crypto-native users
const widget = new ProdigyWidget({
  partnerId: process.env.PARTNER_ID,
  acceptedCurrencies: ['BTC', 'ETH', 'SOL', 'USDC'],
  rampType: 'both',  // on-ramp and off-ramp
  onComplete: ({ txId, amount, currency }) => {
    updateUserBalance(amount, currency)
  }
})`

const partnerStats = [
  { value: 247,   prefix: '',  suffix: '',  label: 'Partner integrations', trend: '↑ growing' },
  { value: 2.4,   prefix: '€', suffix: 'B', label: 'Volume processed',     trend: '↑ 12.4%' },
  { value: 99.97, prefix: '',  suffix: '%', label: 'Uptime SLA',            trend: '↑ live' },
  { value: 47,    prefix: '',  suffix: 's', label: 'Avg KYC completion',    trend: '↓ improving' },
]

interface Step {
  n: string
  title: string
  detail: string
  iconPath: string
}

const steps: Step[] = [
  {
    n: '01',
    title: 'Embed',
    detail: 'One script tag. Your brand, your currencies, your fee. A motivated developer has it live before lunch. An unmotivated one, before dinner.',
    iconPath: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  },
  {
    n: '02',
    title: 'Configure',
    detail: 'Set your platform fee and partner share in the admin console. These numbers appear to the user before they confirm. There are no other numbers.',
    iconPath: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4',
  },
  {
    n: '03',
    title: 'Track',
    detail: 'The partner portal shows every transaction, every commission, every KYC status. No pivot tables. No "can you export that?" on a Friday afternoon.',
    iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  },
  {
    n: '04',
    title: 'Earn',
    detail: 'Revenue posts per transaction. Your operations team sees everything in real time. No separate system. No mysterious delay between transaction and commission.',
    iconPath: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
]
</script>

<style scoped>
/* ── Variables ── */
main {
  --violet: #7c3aed;
  --purple: #9333ea;
  --pink: #ec4899;
  --lavender: #a78bfa;
  --green: #22c55e;
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
  --grad-accent: linear-gradient(135deg, var(--violet), var(--pink));
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: var(--ink);
  background: var(--bg);
}

/* ── Hero ── */
.hero {
  position: relative;
  overflow: hidden;
  background: var(--grad-hero);
  padding: 6rem 1.5rem 5rem;
  display: flex;
  justify-content: center;
}
.mesh-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.35;
  pointer-events: none;
}
.mesh-blob-1 { width: 500px; height: 500px; background: #7c3aed; top: -150px; left: -100px; }
.mesh-blob-2 { width: 350px; height: 350px; background: #ec4899; bottom: -50px; right: -50px; }
.hero-inner {
  max-width: 700px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
  position: relative;
}
.eyebrow-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  background: rgba(255,255,255,0.18);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: var(--radius-pill);
  padding: 0.375rem 1rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.04em;
}
.hero-h1 {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: clamp(2.5rem, 6vw, 4.25rem);
  line-height: 1.05;
  color: #fff;
  margin: 0;
}
.hero-h1 em { font-style: italic; opacity: 0.9; }
.hero-sub {
  font-size: 1rem;
  color: rgba(255,255,255,0.82);
  line-height: 1.65;
  max-width: 44ch;
  margin: 0;
}
.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}
.btn-primary-white {
  display: inline-flex;
  align-items: center;
  font-weight: 700;
  font-size: 0.9375rem;
  color: var(--violet);
  background: #fff;
  border-radius: var(--radius-pill);
  padding: 0.875rem 2rem;
  text-decoration: none;
  transition: opacity 0.15s, transform 0.15s;
}
.btn-primary-white:hover { opacity: 0.9; transform: translateY(-2px); }
.btn-ghost {
  display: inline-flex;
  align-items: center;
  font-weight: 600;
  font-size: 0.9375rem;
  color: #fff;
  background: transparent;
  border: 2px solid rgba(255,255,255,0.45);
  border-radius: var(--radius-pill);
  padding: 0.875rem 2rem;
  text-decoration: none;
  transition: border-color 0.15s, background 0.15s;
}
.btn-ghost:hover { border-color: rgba(255,255,255,0.8); background: rgba(255,255,255,0.08); }

/* Hero revenue card */
.hero-card {
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.5);
  border-radius: var(--radius-card);
  box-shadow: 0 16px 48px rgba(0,0,0,0.18);
  padding: 1.5rem;
  width: 100%;
  max-width: 380px;
  text-align: left;
}
.card-eyebrow { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-muted); margin: 0 0 1rem; }
.card-rows { display: flex; flex-direction: column; gap: 0; margin-bottom: 0.75rem; }
.card-row { display: flex; justify-content: space-between; padding: 0.625rem 0; border-bottom: 1px solid var(--border); font-size: 0.875rem; }
.row-label { color: var(--ink-mid); }
.row-val { font-weight: 600; color: var(--ink); }
.row-val.accent { color: var(--violet); font-weight: 700; }
.card-payout { display: flex; justify-content: space-between; align-items: center; padding: 0.875rem 0 0.5rem; font-weight: 700; font-size: 0.9375rem; }
.payout-val { font-family: 'Syne', sans-serif; font-size: 1.5rem; font-weight: 800; background: var(--grad-accent); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.card-note { font-size: 0.75rem; color: var(--ink-muted); margin: 0; }

/* ── Integration section ── */
.integration-section {
  padding: 5rem 1.5rem;
  background: var(--bg);
}
.section-inner { max-width: 760px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.25rem; }
.section-eyebrow { font-size: 0.8125rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--violet); margin: 0; }
.section-h2 {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: clamp(2rem, 4.5vw, 3rem);
  line-height: 1.1;
  color: var(--ink);
  margin: 0;
}
.section-h2 em { font-style: italic; background: var(--grad-accent); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.section-sub { font-size: 1rem; color: var(--ink-mid); line-height: 1.65; max-width: 52ch; margin: 0; }

.code-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  box-shadow: 0 4px 24px rgba(124,58,237,0.08);
  overflow: hidden;
}
.code-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.25rem;
  background: #f5f4fe;
  border-bottom: 1px solid var(--border);
}
.code-dots { display: flex; gap: 6px; }
.dot { width: 12px; height: 12px; border-radius: 50%; }
.dot.red { background: #ef4444; }
.dot.yellow { background: #f59e0b; }
.dot.green { background: #22c55e; }
.code-title { font-size: 0.8125rem; color: var(--ink-muted); font-family: 'Space Mono', monospace; }
.code-block { margin: 0; padding: 1.5rem 1.25rem; overflow-x: auto; background: #0f0e1a; }
.code-block code { font-family: 'Space Mono', monospace; font-size: 0.875rem; color: #a78bfa; line-height: 1.7; }
.code-caption { padding: 1rem 1.25rem; margin: 0; font-size: 0.875rem; color: var(--ink-mid); line-height: 1.6; border-top: 1px solid var(--border); }
.inline-code { font-family: 'Space Mono', monospace; font-size: 0.8125rem; background: var(--surface); padding: 0.1em 0.3em; border-radius: 4px; }

/* ── Steps section ── */
.steps-section { padding: 5rem 1.5rem; background: var(--grad-soft); }
.steps-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  margin-top: 2rem;
}
.step-card {
  background: var(--white);
  border-radius: var(--radius-card);
  box-shadow: 0 2px 16px rgba(124,58,237,0.08);
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border-top: 3px solid;
  border-image: linear-gradient(90deg, #7c3aed, #ec4899) 1;
  transition: transform 0.2s, box-shadow 0.2s;
}
.step-card:hover { transform: translateY(-3px); box-shadow: 0 8px 32px rgba(124,58,237,0.14); }
.step-icon-wrap {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, rgba(124,58,237,0.1), rgba(236,72,153,0.1));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--violet);
}
.step-icon { flex-shrink: 0; }
.step-n { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--lavender); margin: 0; }
.step-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1.25rem; color: var(--ink); margin: 0; }
.step-detail { font-size: 0.875rem; color: var(--ink-mid); line-height: 1.65; margin: 0; }

/* ── Stats section ── */
.gp-stats-section {
  padding: 5rem 1.5rem;
  background: #0f0a1e;
}

.gp-section-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.gp-section-eyebrow {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #a855f7;
  margin: 0 0 0.75rem;
  text-align: center;
}

.gp-section-h2 {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.1;
  color: #ffffff;
  margin: 0 0 2.5rem;
  text-align: center;
}

.gp-section-h2 em {
  font-style: italic;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gp-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

.gp-stat-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
}

.gp-stat-card :deep(.stat-value) {
  font-family: 'Syne', sans-serif;
  font-size: clamp(2rem, 3vw, 2.5rem);
}

.gp-stat-card :deep(.stat-label) {
  color: rgba(255, 255, 255, 0.6);
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.875rem;
}

/* ── Code section ── */
.gp-code-section {
  padding: 5rem 1.5rem;
  background: #13082b;
  border-top: 1px solid rgba(168, 85, 247, 0.15);
}

.gp-code-sub {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.65;
  text-align: center;
  max-width: 52ch;
  margin: 0 auto 2rem;
}

@media (max-width: 900px) {
  .gp-stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 540px) {
  .gp-stats-grid {
    grid-template-columns: 1fr;
  }
}

/* ── CTA section ── */
.cta-section {
  position: relative;
  overflow: hidden;
  background: var(--grad-hero);
  padding: 6rem 1.5rem;
  text-align: center;
  display: flex;
  justify-content: center;
}
.cta-blob-1 { width: 400px; height: 400px; background: #7c3aed; top: -100px; right: 0; }
.cta-blob-2 { width: 300px; height: 300px; background: #ec4899; bottom: -80px; left: 0; }
.cta-inner { position: relative; max-width: 600px; display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }
.cta-badge { font-size: 2rem; color: rgba(255,255,255,0.6); }
.cta-h2 { font-family: 'Syne', sans-serif; font-weight: 800; font-size: clamp(2rem, 5vw, 3.5rem); line-height: 1.1; color: #fff; margin: 0; }
.cta-h2 em { font-style: italic; opacity: 0.9; }
.cta-sub { font-size: 1rem; color: rgba(255,255,255,0.8); line-height: 1.65; max-width: 44ch; margin: 0; }
.cta-actions { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; }
.cta-btn-primary {
  display: inline-flex; align-items: center;
  font-weight: 700; font-size: 0.9375rem; color: var(--violet);
  background: #fff; border-radius: var(--radius-pill);
  padding: 0.875rem 2rem; text-decoration: none;
  transition: opacity 0.15s, transform 0.15s;
}
.cta-btn-primary:hover { opacity: 0.9; transform: translateY(-2px); }
.cta-btn-ghost {
  display: inline-flex; align-items: center;
  font-weight: 600; font-size: 0.9375rem; color: #fff;
  background: transparent; border: 2px solid rgba(255,255,255,0.4);
  border-radius: var(--radius-pill);
  padding: 0.875rem 2rem; text-decoration: none;
  transition: border-color 0.15s;
}
.cta-btn-ghost:hover { border-color: rgba(255,255,255,0.8); }
.cta-footnote { font-size: 0.8125rem; color: rgba(255,255,255,0.6); margin: 0; }
.cta-footnote a { color: rgba(255,255,255,0.85); }

/* ── Responsive ── */
@media (max-width: 640px) {
  .steps-grid { grid-template-columns: 1fr; }
  .hero-actions { flex-direction: column; align-items: stretch; }
  .cta-actions { flex-direction: column; align-items: stretch; }
}

/* ── Partner Types ── */
.gpp-grad {
  background: linear-gradient(135deg, #a855f7, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.gpp-glass {
  backdrop-filter: blur(16px);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
}
.gpp-types-section {
  background: #0f0a1e;
  padding: 5rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}
.gpp-types-inner {
  max-width: 1100px;
  margin: 0 auto;
}
.gpp-types-h2 {
  font-family: 'Syne', sans-serif;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800;
  text-align: center;
  margin: 0 0 2.5rem;
}
.gpp-types-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}
.gpp-type-card {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  transition: border-color 0.2s;
}
.gpp-type-card:hover {
  border-color: rgba(168, 85, 247, 0.4);
}
.gpp-type-icon {
  font-size: 1.75rem;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}
.gpp-type-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.0625rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
}
.gpp-type-body {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.65;
  margin: 0;
  flex: 1;
}

/* ── Partner Economics ── */
.gpp-economics-section {
  background: #0f0a1e;
  padding: 5rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}
.gpp-economics-inner {
  max-width: 860px;
  margin: 0 auto;
}
.gpp-economics-h2 {
  font-family: 'Syne', sans-serif;
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 700;
  color: #fff;
  text-align: center;
  margin: 0 0 2rem;
}
.gpp-table-wrap {
  overflow-x: auto;
}
.gpp-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.9375rem;
}
.gpp-table-head th {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2));
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  padding: 0.875rem 1.25rem;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.gpp-table tbody tr {
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
.gpp-table tbody tr:last-child {
  border-bottom: none;
}
.gpp-table tbody td {
  padding: 0.875rem 1.25rem;
  color: rgba(255, 255, 255, 0.75);
}
.gpp-td-bold {
  font-weight: 700;
  color: #fff !important;
}

/* ── Partner Quote ── */
.gpp-pquote-section {
  background: #0f0a1e;
  padding: 5rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}
.gpp-pquote-inner {
  max-width: 760px;
  margin: 0 auto;
}
.gpp-pquote-card {
  padding: 2.5rem;
  border-left: 3px solid #a855f7;
  border-radius: 0 16px 16px 0;
  margin: 0;
}
.gpp-pquote-text {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.125rem;
  font-style: italic;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.65;
  margin: 0 0 1rem;
}
.gpp-pquote-attr {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}

/* ── Apply CTA ── */
.gpp-apply-section {
  background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
  padding: 5rem 1.5rem;
  text-align: center;
}
.gpp-apply-inner {
  max-width: 640px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}
.gpp-apply-h2 {
  font-family: 'Syne', sans-serif;
  font-size: clamp(1.75rem, 3vw, 2.75rem);
  font-weight: 800;
  color: #fff;
  margin: 0;
}
.gpp-apply-btn {
  display: inline-flex;
  align-items: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 0.9375rem;
  color: #a855f7;
  background: #fff;
  border-radius: 100px;
  padding: 0.875rem 2rem;
  text-decoration: none;
  transition: opacity 0.15s, transform 0.15s;
}
.gpp-apply-btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}
.gpp-apply-note {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.65);
  margin: 0;
}
@media (max-width: 768px) {
  .gpp-types-grid { grid-template-columns: 1fr; }
}

/* ── Fee Calculator section ── */
.grd-fee-section { background: #13082b; padding: 5rem 1.5rem; border-top: 1px solid rgba(168,85,247,0.15); }
.grd-fee-inner { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1.4fr; gap: 4rem; align-items: start; }
.grd-fee-left { display: flex; flex-direction: column; gap: 1.5rem; }
.grd-fee-headline { font-family: 'Syne', sans-serif; font-weight: 800; font-size: clamp(1.75rem, 3vw, 2.5rem); line-height: 1.15; background: linear-gradient(135deg, #a855f7, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin: 0; }
.grd-fee-bullets { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.75rem; }
.grd-fee-bullets li { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.9375rem; line-height: 1.6; color: rgba(255,255,255,0.65); padding-left: 1.5rem; position: relative; }
.grd-fee-bullets li::before { content: '✦'; position: absolute; left: 0; font-size: 0.625rem; color: #a855f7; top: 0.3em; }
.grd-fee-right { min-width: 0; }
@media (max-width: 900px) { .grd-fee-inner { grid-template-columns: 1fr; gap: 2.5rem; } }

/* ── Quote updates ── */
.gpp-pquote-company { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.9375rem; font-weight: 700; color: #a855f7; }
.gpp-pquote-role { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.8125rem; color: rgba(255,255,255,0.45); }
.gpp-pquote-attr { display: flex; flex-direction: column; gap: 0.2rem; }

/* ── Apply CTA updates ── */
.gpp-apply-sub { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1rem; color: rgba(255,255,255,0.8); line-height: 1.6; margin: 0; max-width: 44ch; text-align: center; }
.gpp-apply-actions { display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; justify-content: center; }
.gpp-apply-secondary { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.9375rem; font-weight: 600; color: rgba(255,255,255,0.8); text-decoration: underline; text-underline-offset: 3px; }
.gpp-apply-secondary:hover { color: #fff; }

/* ── Revenue Calculator ── */
.rc-section { background: #0f0a1e; padding: 5rem 1.5rem; }
.rc-inner { max-width: 1200px; margin: 0 auto; }
.rc-headline { font-family: 'Plus Jakarta Sans', sans-serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; background: linear-gradient(135deg,#a855f7,#ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin: 0 0 0.5rem; }
.rc-sub { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1rem; color: rgba(255,255,255,0.6); margin: 0 0 3rem; }
.rc-controls { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 3rem; }
.rc-field { display: flex; flex-direction: column; gap: 0.5rem; }
.rc-label { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.8125rem; color: rgba(255,255,255,0.5); }
.rc-slider { width: 100%; accent-color: #a855f7; }
.rc-val { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.875rem; font-weight: 600; color: rgba(255,255,255,0.8); }
.rc-result { backdrop-filter: blur(16px); background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 2rem; display: flex; flex-direction: column; gap: 0.5rem; }
.rc-result-label { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.8125rem; color: rgba(255,255,255,0.5); }
.rc-result-num { font-family: 'Plus Jakarta Sans', sans-serif; font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; background: linear-gradient(135deg,#a855f7,#ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1.1; }
@media (max-width: 768px) { .rc-controls { grid-template-columns: 1fr; } }
</style>
