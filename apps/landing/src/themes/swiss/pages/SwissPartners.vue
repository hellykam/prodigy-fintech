<template>
  <main>
    <!-- Hero -->
    <section class="page-hero" aria-labelledby="partners-headline">
      <div class="section-inner">
        <div class="section-header">
          <p class="label eyebrow">04 / Partners</p>
          <h1 id="partners-headline" class="page-headline" ref="heroH">
            ONE LINE OF CODE.<br />
            <span class="iris-text">INFINITE CRYPTO.</span>
          </h1>
          <p class="page-sub">Your neobank, your fintech, your platform — with crypto embedded in an afternoon. You set the fees. You earn the share. One partner portal shows you exactly what happened to every euro.</p>
          <div class="hero-ctas">
            <a href="http://localhost:5006" target="_blank" rel="noopener noreferrer" class="cta-primary-sm">Open Partner Portal →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Revenue statement + steps -->
    <section class="partner-section" aria-labelledby="statement-h">
      <div class="section-inner partner-inner">

        <!-- Left: revenue statement -->
        <div class="statement-col" data-reveal="fade-up">
          <p id="statement-h" class="label" style="margin-bottom: 1.5rem">Partner revenue statement</p>
          <div class="statement-card" role="region" aria-label="Partner revenue statement example">
            <div class="statement-header">
              <span class="statement-title font-mono">PARTNER REVENUE STATEMENT</span>
              <span class="statement-period label">STATEMENT PERIOD: DEMO</span>
            </div>
            <hr class="rule-dashed" />
            <div class="statement-rows">
              <div class="statement-row">
                <span class="muted">Gross transaction volume</span>
                <span class="statement-val">€124,800.00</span>
              </div>
              <div class="statement-row">
                <span class="muted">Platform fee collected (0.50%)</span>
                <span class="statement-val">€624.00</span>
              </div>
              <div class="statement-row">
                <span class="muted">Partner share earned (0.20%)</span>
                <span class="statement-val">€249.60</span>
              </div>
              <div class="statement-row">
                <span class="muted">Network fees (simulated)</span>
                <span class="statement-val">€99.84</span>
              </div>
              <div class="statement-row">
                <span class="muted">Transactions processed</span>
                <span class="statement-val">248</span>
              </div>
              <div class="statement-row">
                <span class="muted">KYC approved</span>
                <span class="statement-val">231 / 248</span>
              </div>
            </div>
            <hr class="rule-eq" />
            <div class="statement-row payout">
              <span>Partner payout owed</span>
              <span class="iris-text">€249.60</span>
            </div>
            <p class="statement-note">Configurable per B2B client. Tracked in the partner portal. Visible to admin.</p>
          </div>
        </div>

        <!-- Right: steps -->
        <div class="steps-col">
          <p class="label" style="margin-bottom: 1.5rem">How partners work</p>
          <div class="steps-list" data-animate-stagger>
            <div v-for="step in steps" :key="step.id" class="step-item">
              <div class="step-id iris-text" aria-hidden="true">{{ step.id }}</div>
              <div class="step-body">
                <div class="step-title">{{ step.title }}</div>
                <p class="step-desc">{{ step.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Partner profiles -->
    <section class="profiles-section" aria-labelledby="profiles-h">
      <div class="section-inner">
        <div class="section-header-row">
          <p id="profiles-h" class="label eyebrow">Partners in the wild</p>
          <p class="profiles-note font-mono">Fictional. Illustrative. Entirely plausible.</p>
        </div>
        <div class="profiles-grid">
          <article v-for="profile in partnerProfiles" :key="profile.name" class="profile-card">
            <div class="profile-head">
              <div class="profile-symbol iris-text" aria-hidden="true">{{ profile.symbol }}</div>
              <div class="profile-meta">
                <div class="profile-name">{{ profile.name }}</div>
                <div class="profile-type font-mono">{{ profile.type }}</div>
              </div>
            </div>
            <p class="profile-quote">"{{ profile.quote }}"</p>
            <div class="profile-stats">
              <div v-for="stat in profile.stats" :key="stat.label" class="profile-stat">
                <span class="pstat-val">{{ stat.val }}</span>
                <span class="pstat-label font-mono">{{ stat.label }}</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- FeeCalculator -->
    <section class="fee-calc-section" aria-labelledby="fee-calc-h" data-reveal="fade-up">
      <div class="section-inner fee-calc-inner">
        <div class="fee-calc-left">
          <p class="label" style="margin-bottom:1rem">PARTNER REVENUE</p>
          <h2 id="fee-calc-h" class="section-headline" style="margin-bottom:1.5rem">CALCULATE YOUR SHARE.</h2>
          <ul class="fee-calc-bullets">
            <li>Set your own fee layer on top of platform rates</li>
            <li>Earn 15–25% of all platform fees generated</li>
            <li>Paid monthly via partner portal</li>
            <li>Volume discounts kick in automatically</li>
          </ul>
        </div>
        <div class="fee-calc-right">
          <FeeCalculator theme="swiss" />
        </div>
      </div>
    </section>

    <!-- Embed code -->
    <section class="embed-section" aria-labelledby="embed-h" data-reveal="fade-up">
      <div class="section-inner">
        <p id="embed-h" class="label" style="margin-bottom: 1.5rem">The embed</p>
        <div class="code-block" role="region" aria-label="Widget embed code">
          <div class="code-header">
            <span class="code-lang label">HTML</span>
            <span class="code-note label">One line. Your platform. Running.</span>
          </div>
          <pre class="code-body" aria-label="Embed script tag example"><code>&lt;script src="https://widget.prodigy.demo/embed.js"
        data-client-id="YOUR_ID"&gt;&lt;/script&gt;</code></pre>
        </div>
        <p class="embed-note">That is the entire embed. The KYC flow, fee logic, risk scoring, and ledger sync are already inside it. You configure the fee percentages and your partner share in the admin console. The widget picks them up automatically.</p>
      </div>
    </section>

    <!-- Revenue Calculator -->
    <section class="rc-section" aria-labelledby="rc-heading" data-reveal="fade-right">
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

    <!-- Partner Types -->
    <section class="partner-types-section" aria-labelledby="ptypes-h">
      <div class="section-inner">
        <p class="label eyebrow" data-reveal="fade-up">PARTNERSHIP</p>
        <h2 id="ptypes-h" class="section-headline" ref="ptypesH" data-reveal="fade-up">THREE WAYS TO PARTNER</h2>
        <div class="ptypes-grid" data-animate-stagger ref="ptypesGrid">
          <article class="ptype-card">
            <div class="ptype-icon font-mono">◈</div>
            <h3 class="ptype-title">TECHNOLOGY PARTNER</h3>
            <p class="ptype-body">Embed Prodigy in your product. Earn 20% revenue share on every transaction your users make.</p>
          </article>
          <article class="ptype-card">
            <div class="ptype-icon font-mono">◎</div>
            <h3 class="ptype-title">REFERRAL PARTNER</h3>
            <p class="ptype-body">Send qualified leads. Earn 15% of their first-year transaction revenue.</p>
          </article>
          <article class="ptype-card">
            <div class="ptype-icon font-mono">◉</div>
            <h3 class="ptype-title">WHITE-LABEL RESELLER</h3>
            <p class="ptype-body">Sell Prodigy as your own. Full brand rights. Custom margin structure.</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Commission Table -->
    <section class="commission-section" aria-labelledby="commission-h">
      <div class="section-inner">
        <p class="label eyebrow" data-reveal="fade-up">COMMISSIONS</p>
        <h2 id="commission-h" class="section-headline" data-reveal="fade-up">COMMISSION STRUCTURE</h2>
        <div class="commission-wrap" data-reveal="fade-up">
          <table class="commission-table" aria-label="Partner commission structure">
            <thead>
              <tr>
                <th class="commission-th">Partner Type</th>
                <th class="commission-th">Revenue Share</th>
                <th class="commission-th">Attribution Window</th>
                <th class="commission-th">Payout Cycle</th>
              </tr>
            </thead>
            <tbody>
              <tr class="commission-row">
                <td class="commission-td commission-td--name">Technology Partner</td>
                <td class="commission-td commission-td--share">20%</td>
                <td class="commission-td">12 months</td>
                <td class="commission-td">Monthly</td>
              </tr>
              <tr class="commission-row">
                <td class="commission-td commission-td--name">Referral Partner</td>
                <td class="commission-td commission-td--share">15% (year 1)</td>
                <td class="commission-td">30 days</td>
                <td class="commission-td">Monthly</td>
              </tr>
              <tr class="commission-row">
                <td class="commission-td commission-td--name">White-label Reseller</td>
                <td class="commission-td commission-td--share">Custom</td>
                <td class="commission-td">N/A</td>
                <td class="commission-td">Negotiated</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Social Proof Quote -->
    <section class="quote-section" aria-label="Partner quote" data-reveal="fade-up">
      <div class="section-inner">
        <figure class="quote-card">
          <blockquote class="quote-text">"The revenue share transparency is exceptional. We know exactly what we earned and why, down to the cent."</blockquote>
          <figcaption class="quote-attr">
            <span class="quote-company">Meridian Wealth</span>
            <span class="quote-role font-mono">· Zurich · Technology Partner</span>
          </figcaption>
        </figure>
      </div>
    </section>

    <!-- Application CTA -->
    <section class="apply-section" aria-labelledby="apply-h">
      <div class="section-inner apply-inner">
        <div class="apply-content">
          <p class="label apply-label" data-reveal="fade-up">PARTNER PROGRAMME</p>
          <h2 id="apply-h" class="apply-headline" data-reveal="fade-up">APPLY FOR PARTNERSHIP.</h2>
          <p class="apply-sub">Send us your platform details. We review every application within three business days. No minimum volume requirement.</p>
        </div>
        <div class="apply-actions">
          <a href="#" class="apply-btn" ref="applyBtn">Apply now →</a>
          <a href="#" class="apply-link font-mono">Download partner brief</a>
          <p class="apply-note font-mono">(Demo — contact partners@prodigy.example to apply)</p>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="cta-strip" aria-label="Open live demos">
      <div class="iris-bar iris-stripe" aria-hidden="true" />
      <div class="section-inner cta-inner">
        <div class="cta-left">
          <p class="label" style="margin-bottom: 0.75rem; color: rgba(255,255,255,0.65)">See it for yourself</p>
          <p class="cta-copy">The partner portal is live. The admin console is live. The numbers in the statement above come from the same logic running in the demo.</p>
        </div>
        <div class="cta-actions">
          <a href="http://localhost:5006" target="_blank" rel="noopener noreferrer" class="cta-btn cta-btn--primary">Open Partner Portal →</a>
          <a href="http://localhost:5002" target="_blank" rel="noopener noreferrer" class="cta-btn cta-btn--secondary">Open Admin Console →</a>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useClipReveal } from '@/composables/useSplitReveal'
import { useMagneticButton } from '@/composables/useMagneticButton'
import { useCardTiltAll } from '@/composables/useCardTilt'
import FeeCalculator from '@/components/shared/FeeCalculator.vue'

const rcVolume = ref(100000)
const rcMarkup = ref(0.5)
const rcMonthlyEarn = computed(() => rcVolume.value * rcMarkup.value / 100)

// ── WOW Animations ───────────────────────────────────────────────
const heroH = ref<HTMLElement | null>(null)
const ptypesH = ref<HTMLElement | null>(null)
const applyBtn = ref<HTMLElement | null>(null)
const ptypesGrid = ref<HTMLElement | null>(null)

useClipReveal(heroH, { direction: 'up', duration: 1.0, delay: 0.2 })
useClipReveal(ptypesH, { direction: 'up', duration: 0.85 })
useMagneticButton(applyBtn, { strength: 0.25, returnDuration: 600 })
useCardTiltAll(ptypesGrid, '.ptype-card', { maxTilt: 4, scale: 1.02, glowColor: '#34d399', glowIntensity: 0.12 })

const partnerProfiles = [
  {
    symbol: '◈',
    name: 'Acme Corp',
    type: 'Challenger bank · 220,000 customers',
    quote: 'We went live on a Tuesday afternoon. By Wednesday we had 47 transactions and a compliance team that had stopped emailing us.',
    stats: [
      { val: '€2.1M', label: 'monthly volume' },
      { val: '0.20%', label: 'partner share' },
      { val: '2 hrs', label: 'to go live' },
    ],
  },
  {
    symbol: '◉',
    name: 'Beta Inc',
    type: 'Payments fintech · B2B',
    quote: 'The fee receipt was the thing. Our enterprise clients could see exactly what they were paying, which meant they stopped asking us to explain it.',
    stats: [
      { val: '€890K', label: 'monthly volume' },
      { val: '0.15%', label: 'partner share' },
      { val: '1 line', label: 'of code to embed' },
    ],
  },
  {
    symbol: '◎',
    name: 'Gamma Exchange',
    type: 'Crypto exchange · 85,000 users',
    quote: 'We already had crypto. We embedded the widget for the fiat on-ramp. KYC was already solved, the partner dashboard was better than our own.',
    stats: [
      { val: '€5.4M', label: 'monthly volume' },
      { val: '0.50%', label: 'partner share' },
      { val: '94%', label: 'KYC approval rate' },
    ],
  },
]

const steps = [
  {
    id: '01',
    title: 'EMBED ONCE',
    desc: 'One widget. Your platform. Your fees. A motivated developer has it running before lunch. A less motivated developer has it running before dinner.',
  },
  {
    id: '02',
    title: 'CONFIGURE FEES',
    desc: 'Set your platform fee and partner share in the admin console. These are the numbers that appear to the user before they confirm. There are no other numbers.',
  },
  {
    id: '03',
    title: 'TRACK REVENUE',
    desc: 'The partner portal shows every transaction, every commission, every KYC status. It does not require a pivot table.',
  },
  {
    id: '04',
    title: 'ADMIN VISIBILITY',
    desc: 'Your operations team sees all partner activity. No separate system. No "can you export that?" No CSV archaeology.',
  },
]
</script>

<style scoped>
/* ── Layout ── */
.section-inner { max-width: 1440px; margin: 0 auto; padding: 5rem 1.5rem; }

/* ── Hero ── */
.page-hero { border-bottom: 1px solid var(--ink); background: var(--paper); }
.section-header { display: flex; flex-direction: column; gap: 1rem; }
.eyebrow { margin: 0; }
.page-headline {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(2.5rem, 7vw, 6.5rem);
  font-weight: 900; line-height: 0.92;
  letter-spacing: -0.02em; text-transform: uppercase;
  margin: 0;
}
.page-sub {
  font-size: 1.125rem; line-height: 1.6;
  color: var(--ink-mid); max-width: 46ch; margin: 0;
}
.hero-ctas { margin-top: 0.5rem; }
.cta-primary-sm {
  display: inline-block;
  font-family: 'Space Mono', monospace; font-size: 0.8125rem;
  font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
  color: var(--paper); background: var(--ink);
  text-decoration: none; padding: 0.875rem 1.75rem;
  border: 1.5px solid var(--ink); transition: background 0.15s, color 0.15s;
}
.cta-primary-sm:hover { background: var(--paper); color: var(--ink); }

/* ── Partner profiles ── */
.profiles-section { border-bottom: 1px solid var(--ink); background: #fafafa; }
.section-header-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2.5rem; flex-wrap: wrap; gap: 0.5rem; }
.profiles-note { font-size: 0.75rem; color: var(--ink-muted); margin: 0; letter-spacing: 0.04em; }
.profiles-grid { display: grid; grid-template-columns: repeat(3, 1fr); border: 1px solid var(--ink); }
.profile-card {
  padding: 2rem 1.75rem; border-right: 1px solid var(--line);
  display: flex; flex-direction: column; gap: 1.25rem;
  transition: background 0.18s;
}
.profile-card:hover { background: #f0f0f0; }
.profile-card:last-child { border-right: none; }
.profile-head { display: flex; align-items: center; gap: 0.875rem; }
.profile-symbol {
  font-family: 'Space Mono', monospace; font-size: 1.75rem;
  line-height: 1; flex-shrink: 0;
}
.profile-meta { display: flex; flex-direction: column; gap: 0.2rem; }
.profile-name { font-family: 'Barlow Condensed', sans-serif; font-size: 1.25rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.02em; }
.profile-type { font-size: 0.6875rem; letter-spacing: 0.08em; color: var(--ink-muted); }
.profile-quote { font-size: 0.9375rem; line-height: 1.65; color: var(--ink-mid); margin: 0; font-style: italic; }
.profile-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; border-top: 1px solid var(--line); padding-top: 1rem; }
.profile-stat { display: flex; flex-direction: column; gap: 0.2rem; }
.pstat-val { font-family: 'Barlow Condensed', sans-serif; font-size: 1.375rem; font-weight: 900; line-height: 1; letter-spacing: -0.01em; }
.pstat-label { font-size: 0.625rem; letter-spacing: 0.1em; color: var(--ink-muted); text-transform: uppercase; }

/* ── Partner section ── */
.partner-section { border-bottom: 1px solid var(--ink); background: #fafafa; }
.partner-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem; align-items: start;
}

/* Statement card */
.statement-card {
  background: var(--paper); border: 1.5px solid var(--ink);
  padding: 1.5rem; font-family: 'Space Mono', monospace; font-size: 0.8125rem;
}
.statement-header { display: flex; flex-direction: column; gap: 0.25rem; margin-bottom: 0.75rem; }
.statement-title { font-weight: 700; letter-spacing: 0.06em; font-size: 0.8125rem; }
.statement-period { font-size: 0.75rem; color: var(--ink-muted); }
.rule-dashed { border: none; border-top: 1px dashed var(--line); margin: 0.75rem 0; }
.rule-eq { border: none; border-top: 2px solid var(--ink); margin: 0.875rem 0; }
.statement-rows { display: flex; flex-direction: column; gap: 0.35rem; }
.statement-row {
  display: flex; justify-content: space-between; align-items: baseline;
  gap: 1rem; font-size: 0.8125rem;
}
.statement-row.payout { font-weight: 700; font-size: 0.9375rem; }
.statement-val { font-weight: 700; flex-shrink: 0; }
.muted { color: var(--ink-muted); }
.statement-note {
  margin-top: 1rem; font-size: 0.75rem;
  color: var(--ink-muted); line-height: 1.6;
  border-top: 1px solid var(--line); padding-top: 0.75rem;
}

/* Steps list */
.steps-list { display: flex; flex-direction: column; border: 1px solid var(--ink); }
.step-item {
  display: flex; gap: 1.25rem; align-items: flex-start;
  padding: 1.5rem; border-bottom: 1px solid var(--line);
  transition: background 0.15s;
}
.step-item:hover { background: #f0f0f0; }
.step-item:last-child { border-bottom: none; }
.step-id {
  font-family: 'Space Mono', monospace;
  font-size: 1.25rem; font-weight: 700;
  line-height: 1; flex-shrink: 0;
  width: 2rem; text-align: center;
}
.step-body { display: flex; flex-direction: column; gap: 0.5rem; }
.step-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.375rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.01em; line-height: 1.1;
}
.step-desc {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem; color: var(--ink-mid);
  line-height: 1.65; margin: 0;
}

/* ── Embed section ── */
.embed-section { border-bottom: 1px solid var(--ink); background: var(--paper); }
.code-block { border: 1.5px solid var(--ink); }
.code-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 0.625rem 1.25rem;
  background: var(--ink); color: var(--paper);
}
.code-header .label { color: rgba(255,255,255,0.65); }
.code-lang { color: rgba(255,255,255,0.9) !important; }
.code-body {
  font-family: 'Space Mono', monospace;
  font-size: 0.875rem; line-height: 1.7;
  padding: 1.5rem 1.25rem; margin: 0;
  background: #fafafa; color: var(--ink);
  overflow-x: auto; white-space: pre-wrap; word-break: break-all;
}
.code-body code { font-family: inherit; font-size: inherit; }
.embed-note {
  margin-top: 1.5rem;
  font-family: 'Space Mono', monospace;
  font-size: 0.8125rem; line-height: 1.7;
  color: var(--ink-mid); max-width: 72ch;
}

/* ── CTA strip ── */
.cta-strip { background: var(--ink); color: var(--paper); }
.iris-bar { height: 4px; background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe, #667eea); background-size: 200% auto; }
.cta-inner {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem; align-items: center;
}
.cta-left { display: flex; flex-direction: column; }
.cta-copy {
  font-size: 1rem; line-height: 1.6;
  color: rgba(255,255,255,0.75); margin: 0;
}
.cta-actions { display: flex; flex-direction: column; gap: 0.875rem; }
.cta-btn {
  display: block; font-family: 'Space Mono', monospace;
  font-size: 0.8125rem; font-weight: 700;
  letter-spacing: 0.08em; text-transform: uppercase;
  text-decoration: none; padding: 0.875rem 1.5rem;
  text-align: center; border: 1.5px solid var(--paper);
  transition: background 0.15s, color 0.15s;
}
.cta-btn--primary { background: var(--paper); color: var(--ink); }
.cta-btn--primary:hover { background: transparent; color: var(--paper); }
.cta-btn--secondary { background: transparent; color: rgba(255,255,255,0.85); border-color: rgba(255,255,255,0.4); }
.cta-btn--secondary:hover { border-color: var(--paper); color: var(--paper); }

/* ── Utilities ── */
.font-mono { font-family: 'Space Mono', monospace; }
.label { font-family: 'Space Mono', monospace; font-size: 0.8125rem; font-weight: 400; letter-spacing: 0.15em; text-transform: uppercase; color: var(--ink-mid); }
.iris-text {
  background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe, #667eea);
  background-size: 200% auto;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: iris-shift 5s linear infinite;
  will-change: background-position;
}
.iris-stripe { animation: iris-shift 5s linear infinite; will-change: background-position; }
@keyframes iris-shift { 0% { background-position: 0% center; } 100% { background-position: -200% center; } }

/* ── Responsive ── */
@media (max-width: 900px) {
  .partner-inner { grid-template-columns: 1fr; gap: 3rem; }
  .profiles-grid { grid-template-columns: 1fr; }
  .profile-card { border-right: none; border-bottom: 1px solid var(--line); }
  .profile-card:last-child { border-bottom: none; }
  .cta-inner { grid-template-columns: 1fr; gap: 2.5rem; }
}
@media (max-width: 600px) {
  .step-item { padding: 1.25rem; }
  .statement-row { flex-direction: column; gap: 0.1rem; }
  .statement-row .statement-val { font-size: 0.875rem; }
  .profile-stats { grid-template-columns: repeat(3, 1fr); gap: 0.25rem; }
}
@media (prefers-reduced-motion: reduce) {
  .iris-text, .iris-stripe { animation: none; }
}

/* ── New: Partner Types ── */
.partner-types-section { border-bottom: 1px solid var(--ink); background: var(--paper); }
.section-headline {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(2rem, 4.5vw, 3.75rem);
  font-weight: 900; line-height: 1;
  letter-spacing: -0.02em; text-transform: uppercase;
  max-width: 28ch; margin: 0.75rem 0 0;
}
.ptypes-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  border: 1px solid #e5e7eb; margin-top: 2.5rem;
}
.ptype-card {
  padding: 2.25rem 1.75rem; border-right: 1px solid #e5e7eb;
  display: flex; flex-direction: column; gap: 1rem;
  background: var(--paper);
  transition: background 0.15s;
}
.ptype-card:hover { background: #fafafa; }
.ptype-card:last-child { border-right: none; }
.ptype-icon {
  font-size: 1.5rem; color: #34d399; line-height: 1;
}
.ptype-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.25rem; font-weight: 900; text-transform: uppercase;
  letter-spacing: 0.02em; line-height: 1.1; margin: 0;
}
.ptype-body {
  font-family: 'Space Mono', monospace;
  font-size: 0.8125rem; line-height: 1.65; color: var(--ink-mid); margin: 0;
}

/* ── New: Commission Table ── */
.commission-section { border-bottom: 1px solid var(--ink); background: #fafafa; }
.commission-wrap { overflow-x: auto; margin-top: 2.5rem; }
.commission-table { width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb; }
.commission-th {
  font-family: 'Space Mono', monospace; font-size: 0.75rem;
  letter-spacing: 0.1em; text-transform: uppercase;
  padding: 0.875rem 1.25rem; text-align: left;
  border: 1px solid #e5e7eb; background: #0a0a0a; color: #fff;
}
.commission-row { border: 1px solid #e5e7eb; }
.commission-td {
  padding: 0.875rem 1.25rem; border: 1px solid #e5e7eb;
  font-family: 'Space Mono', monospace; font-size: 0.8125rem; line-height: 1.5;
  color: var(--ink-mid);
}
.commission-td--name {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1rem; font-weight: 700; text-transform: uppercase;
  color: var(--ink);
}
.commission-td--share { color: #34d399; font-weight: 700; }

/* ── New: Apply section ── */
.apply-section { background: #0a0a0a; border-bottom: 1px solid #222; }
.apply-inner {
  display: grid; grid-template-columns: 2fr 1fr;
  gap: 4rem; align-items: center;
}
.apply-label { color: rgba(255,255,255,0.55) !important; }
.apply-headline {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(2rem, 4vw, 3.25rem); font-weight: 900;
  text-transform: uppercase; letter-spacing: -0.02em; line-height: 1;
  margin: 0.75rem 0 0; color: #fff;
}
.apply-sub {
  font-family: 'Space Mono', monospace;
  font-size: 0.8125rem; line-height: 1.7; color: rgba(255,255,255,0.65);
  margin: 1rem 0 0; max-width: 50ch;
}
.apply-actions { display: flex; flex-direction: column; gap: 1rem; align-items: flex-start; }
.apply-btn {
  display: inline-block;
  font-family: 'Space Mono', monospace; font-size: 0.8125rem;
  font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
  color: #0a0a0a; background: #34d399;
  text-decoration: none; padding: 0.875rem 1.75rem;
  border: 1.5px solid #34d399;
  transition: background 0.15s, color 0.15s;
}
.apply-btn:hover { background: transparent; color: #34d399; }
.apply-note {
  font-size: 0.6875rem; color: rgba(255,255,255,0.4); margin: 0;
  letter-spacing: 0.04em;
}

@media (max-width: 900px) {
  .ptypes-grid { grid-template-columns: 1fr; }
  .ptype-card { border-right: none; border-bottom: 1px solid #e5e7eb; }
  .ptype-card:last-child { border-bottom: none; }
  .apply-inner { grid-template-columns: 1fr; gap: 2.5rem; }
}

/* ── Fee Calculator section ── */
.fee-calc-section { border-bottom: 1px solid var(--ink); background: var(--paper); }
.fee-calc-inner { display: grid; grid-template-columns: 1fr 1.4fr; gap: 4rem; align-items: start; }
.fee-calc-left { display: flex; flex-direction: column; }
.fee-calc-bullets { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.75rem; }
.fee-calc-bullets li { font-family: 'Space Mono', monospace; font-size: 0.8125rem; line-height: 1.6; color: var(--ink-mid); padding-left: 1.25rem; position: relative; }
.fee-calc-bullets li::before { content: '—'; position: absolute; left: 0; color: #34d399; }
.fee-calc-right { min-width: 0; }
@media (max-width: 900px) { .fee-calc-inner { grid-template-columns: 1fr; gap: 2.5rem; } }

/* ── Quote section ── */
.quote-section { background: #fafafa; border-bottom: 1px solid var(--ink); }
.quote-card { margin: 0; border: 1.5px solid var(--ink); padding: 2rem 2.5rem; max-width: 680px; }
.quote-text { font-family: 'Space Mono', monospace; font-size: 0.9375rem; font-style: italic; line-height: 1.7; color: var(--ink); margin: 0 0 1rem; }
.quote-attr { display: flex; gap: 0.5rem; align-items: baseline; }
.quote-company { font-family: 'Barlow Condensed', sans-serif; font-size: 1rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--ink); }
.quote-role { font-size: 0.75rem; color: var(--ink-muted); }

/* ── Apply link ── */
.apply-link { font-size: 0.8125rem; color: rgba(255,255,255,0.6); text-decoration: underline; text-underline-offset: 2px; }
.apply-link:hover { color: #34d399; }

/* ── Revenue Calculator ── */
.rc-section { background: #fff; border-top: 1px solid rgba(0,0,0,0.1); }
.rc-inner { max-width: 1440px; margin: 0 auto; padding: 5rem 1.5rem; }
.rc-headline { font-family: 'Barlow Condensed', sans-serif; font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 900; letter-spacing: -0.02em; margin: 0 0 0.5rem; }
.rc-sub { font-family: 'Space Grotesk', sans-serif; font-size: 1rem; color: rgba(0,0,0,0.6); margin: 0 0 3rem; }
.rc-controls { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 3rem; }
.rc-field { display: flex; flex-direction: column; gap: 0.5rem; }
.rc-label { font-family: 'Space Grotesk', sans-serif; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(0,0,0,0.5); }
.rc-slider { width: 100%; accent-color: #0a0a0a; }
.rc-val { font-family: 'Space Grotesk', sans-serif; font-size: 0.875rem; font-weight: 600; }
.rc-result { border: 2px solid #0a0a0a; padding: 2rem; display: flex; flex-direction: column; gap: 0.5rem; }
.rc-result-label { font-family: 'Space Grotesk', sans-serif; font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(0,0,0,0.5); }
.rc-result-num { font-family: 'Barlow Condensed', sans-serif; font-size: clamp(3rem, 7vw, 6rem); font-weight: 900; line-height: 1; }
@media (max-width: 768px) { .rc-controls { grid-template-columns: 1fr; } }
</style>
