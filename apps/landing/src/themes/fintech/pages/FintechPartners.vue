<template>
  <main class="ft-partners">

    <!-- Sysbar -->
    <div class="ft-partners__sysbar">
      <span>REF: PRD-030</span>
      <span>·</span>
      <span>PARTNER INTEGRATION TERMS</span>
      <span>·</span>
      <span>REV 2026.06</span>
    </div>

    <hr class="ft-rule" />

    <!-- Headline -->
    <section class="ft-partners__hero">
      <div class="ft-partners__label">DOCUMENT CLASS: PARTNER TERMS</div>
      <h1 class="ft-partners__headline">PARTNER INTEGRATION TERMS</h1>
      <p class="ft-partners__intro">
        You embed it. You configure the fee. You watch the money arrive. No spreadsheet required.
        The following documents what you get, what you agree to, and what to expect.
      </p>
      <div class="fpa-bar-chart" aria-hidden="true">
        <div class="fpa-bar-label">MONTHLY_REVENUE</div>
        <div class="fpa-bars">
          <div class="fpa-bar fpa-b1" style="--h:40%"><span class="fpa-b-v">€1.2K</span></div>
          <div class="fpa-bar fpa-b2" style="--h:55%"><span class="fpa-b-v">€1.8K</span></div>
          <div class="fpa-bar fpa-b3" style="--h:65%"><span class="fpa-b-v">€2.1K</span></div>
          <div class="fpa-bar fpa-b4" style="--h:80%"><span class="fpa-b-v">€2.6K</span></div>
          <div class="fpa-bar fpa-b5" style="--h:100%"><span class="fpa-b-v">€3.2K</span></div>
        </div>
      </div>
    </section>

    <!-- PARTNER_REVENUE_CALC -->
    <section class="ft-fee-calc-section" aria-labelledby="ft-fee-calc-h" data-reveal="fade-up">
      <div class="ft-fee-calc-inner">
        <div class="ft-fee-calc-left">
          <div class="ft-partners__label">PARTNER_REVENUE_CALC.exe</div>
          <h2 id="ft-fee-calc-h" class="ft-fee-calc-headline">&gt; PARTNER_REVENUE_CALC.exe</h2>
          <ul class="ft-fee-bullets">
            <li>Set your own fee layer on top of platform rates</li>
            <li>Earn 15–25% of all platform fees generated</li>
            <li>Paid monthly via partner portal</li>
            <li>Volume discounts kick in automatically</li>
          </ul>
        </div>
        <div class="ft-fee-calc-right">
          <FeeCalculator theme="fintech" />
        </div>
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- PARTNERSHIP_MODELS -->
    <section class="fpa-models" aria-labelledby="models-h" data-reveal="fade-up">
      <div class="fpa-models__label" id="models-h">PARTNERSHIP_MODELS</div>
      <div class="fpa-models__grid" data-animate-stagger ref="ftModelsGrid">
        <div class="fpa-model-card">
          <div class="fpa-model-type">TYPE: TECHNOLOGY_PARTNER</div>
          <div class="fpa-model-stats">
            <span class="fpa-model-stat"><span class="fpa-stat-k">REVENUE_SHARE</span><span class="fpa-stat-v">20%</span></span>
            <span class="fpa-model-sep">|</span>
            <span class="fpa-model-stat"><span class="fpa-stat-k">ATTRIBUTION</span><span class="fpa-stat-v">12_MONTHS</span></span>
            <span class="fpa-model-sep">|</span>
            <span class="fpa-model-stat"><span class="fpa-stat-k">PAYOUT</span><span class="fpa-stat-v">MONTHLY</span></span>
          </div>
          <p class="fpa-model-body">Embed Prodigy in your product. Earn on every transaction your users execute.</p>
        </div>
        <div class="fpa-model-card">
          <div class="fpa-model-type">TYPE: REFERRAL_PARTNER</div>
          <div class="fpa-model-stats">
            <span class="fpa-model-stat"><span class="fpa-stat-k">REVENUE_SHARE</span><span class="fpa-stat-v">15% (YR_1)</span></span>
            <span class="fpa-model-sep">|</span>
            <span class="fpa-model-stat"><span class="fpa-stat-k">ATTRIBUTION</span><span class="fpa-stat-v">30_DAYS</span></span>
            <span class="fpa-model-sep">|</span>
            <span class="fpa-model-stat"><span class="fpa-stat-k">PAYOUT</span><span class="fpa-stat-v">MONTHLY</span></span>
          </div>
          <p class="fpa-model-body">Refer qualified teams. No integration required.</p>
        </div>
        <div class="fpa-model-card">
          <div class="fpa-model-type">TYPE: WHITE_LABEL_RESELLER</div>
          <div class="fpa-model-stats">
            <span class="fpa-model-stat"><span class="fpa-stat-k">REVENUE_SHARE</span><span class="fpa-stat-v">CUSTOM</span></span>
            <span class="fpa-model-sep">|</span>
            <span class="fpa-model-stat"><span class="fpa-stat-k">ATTRIBUTION</span><span class="fpa-stat-v">N/A</span></span>
            <span class="fpa-model-sep">|</span>
            <span class="fpa-model-stat"><span class="fpa-stat-k">PAYOUT</span><span class="fpa-stat-v">NEGOTIATED</span></span>
          </div>
          <p class="fpa-model-body">Full brand rights. Your product, our engine.</p>
        </div>
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- PARTNER_ECONOMICS_TABLE -->
    <section class="fpa-economics" aria-labelledby="econ-h" data-reveal="fade-up">
      <div class="fpa-economics__label" id="econ-h">PARTNER_ECONOMICS</div>
      <pre class="fpa-economics__pre"><code><span class="fpa-ec-hdr">PARTNER_TYPE         REV_SHARE  ATTRIBUTION  PAYOUT     NOTES</span>
<span class="fpa-ec-rule">────────────────────────────────────────────────────────────────────────</span>
<span class="fpa-ec-key">TECHNOLOGY_PARTNER</span>   <span class="fpa-ec-val">20%</span>        <span class="fpa-ec-muted">12 months</span>    <span class="fpa-ec-muted">Monthly</span>    <span class="fpa-ec-note">Full API access</span>
<span class="fpa-ec-key">REFERRAL_PARTNER</span>     <span class="fpa-ec-val">15% yr1</span>    <span class="fpa-ec-muted">30 days</span>      <span class="fpa-ec-muted">Monthly</span>    <span class="fpa-ec-note">Deal registration</span>
<span class="fpa-ec-key">WHITE_LABEL</span>          <span class="fpa-ec-val">Custom</span>     <span class="fpa-ec-muted">N/A</span>          <span class="fpa-ec-muted">Negotiated</span> <span class="fpa-ec-note">Brand rights incl.</span></code></pre>
    </section>

    <hr class="ft-rule" />

    <!-- REVENUE_PROJECTION -->
    <section class="fpa-projection" aria-labelledby="proj-h" data-reveal="fade-up">
      <div class="fpa-projection__label" id="proj-h">EXAMPLE_REVENUE_PROJECTION</div>
      <pre class="fpa-projection__pre"><code><span class="fpa-proj-k">SCENARIO:</span>       <span class="fpa-proj-v">500 users/mo × €200 avg transaction = €100,000/mo volume</span>
<span class="fpa-proj-k">PRODIGY_FEE:</span>    <span class="fpa-proj-v">0.5% = €500/mo</span>
<span class="fpa-proj-k">YOUR_20%_SHARE:</span> <span class="fpa-proj-v">€100/mo</span>
<span class="fpa-proj-k">YOUR_ANNUAL:</span>    <span class="fpa-proj-amber">€1,200 (from one product integration)</span>
<span class="fpa-proj-k">NOTE:</span>           <span class="fpa-proj-muted">Scales linearly with user volume.</span></code></pre>
    </section>

    <hr class="ft-rule" />

    <!-- Integration method -->
    <section class="ft-partners__section" data-animate-stagger>
      <div class="ft-partners__section-label">SECTION 1 · INTEGRATION METHOD</div>
      <div class="ft-partners__embed-block">
        <div class="ft-partners__embed-label">INTEGRATION REQUIREMENT · COMPLETE SPECIFICATION</div>
        <code class="ft-partners__embed-code">&lt;script src="https://widget.prodigy.io/v1/embed.js" data-partner-id="YOUR_ID"&gt;&lt;/script&gt;</code>
        <div class="ft-partners__embed-note">One line. That is the entire integration.</div>
      </div>
      <table class="ft-table">
        <thead>
          <tr>
            <th>STEP</th>
            <th>ACTION</th>
            <th>TIME REQUIRED</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="ft-num">01</td>
            <td>Request partner access via demo. Receive Partner ID.</td>
            <td class="ft-accent">&lt; 24 hours</td>
          </tr>
          <tr>
            <td class="ft-num">02</td>
            <td>Add script tag to your HTML. Replace YOUR_ID with Partner ID.</td>
            <td class="ft-accent">2 minutes</td>
          </tr>
          <tr>
            <td class="ft-num">03</td>
            <td>Configure revenue share rate in admin console.</td>
            <td class="ft-accent">5 minutes</td>
          </tr>
          <tr>
            <td class="ft-num">04</td>
            <td>Widget is live. KYC, risk, fees — all operational.</td>
            <td class="ft-accent">0 minutes (automatic)</td>
          </tr>
        </tbody>
      </table>
    </section>

    <hr class="ft-rule" />

    <!-- Revenue formula -->
    <section class="ft-partners__section">
      <div class="ft-partners__section-label">SECTION 2 · REVENUE CALCULATION</div>
      <div class="ft-partners__formula-block">
        <div class="ft-partners__formula-main">
          Partner Revenue = Transaction Volume × Partner Rate
        </div>
        <div class="ft-partners__formula-sub">
          <div class="ft-partners__formula-row">
            <span>Transaction Volume</span>
            <span>=</span>
            <span>Sum of executed transaction values in period (USD equivalent)</span>
          </div>
          <div class="ft-partners__formula-row">
            <span>Partner Rate</span>
            <span>=</span>
            <span>Rate configured in admin console. Range: 0.00% – 2.00%</span>
          </div>
          <div class="ft-partners__formula-row">
            <span>Settlement</span>
            <span>=</span>
            <span>Real-time accrual. Settled T+1 to partner wallet or bank account.</span>
          </div>
        </div>
      </div>
      <p class="ft-partners__formula-note">
        Revenue is visible in the partner dashboard in real time. No waiting for statements.
        No reconciliation required. The ledger is always correct.
      </p>
    </section>

    <hr class="ft-rule" />

    <!-- SLA table -->
    <section class="ft-partners__section">
      <div class="ft-partners__section-label">SECTION 3 · SERVICE LEVEL AGREEMENT</div>
      <table class="ft-table">
        <thead>
          <tr>
            <th>METRIC</th>
            <th>COMMITMENT</th>
            <th>MEASUREMENT PERIOD</th>
            <th>REMEDY IF BREACHED</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="ft-param">Uptime</td>
            <td class="ft-ok">99.97%</td>
            <td>Calendar month</td>
            <td>Pro-rata service credit</td>
          </tr>
          <tr>
            <td class="ft-param">Widget response time</td>
            <td class="ft-ok">&lt; 200ms P99</td>
            <td>Rolling 24 hours</td>
            <td>Incident report + credit</td>
          </tr>
          <tr>
            <td class="ft-param">API response time</td>
            <td class="ft-ok">&lt; 100ms P95</td>
            <td>Rolling 24 hours</td>
            <td>Incident report</td>
          </tr>
          <tr>
            <td class="ft-param">Incident response</td>
            <td class="ft-ok">&lt; 1 hour (P1), &lt; 4 hours (P2)</td>
            <td>Per incident</td>
            <td>Escalation path</td>
          </tr>
          <tr>
            <td class="ft-param">Support channel</td>
            <td class="ft-ok">Human</td>
            <td>Business hours + on-call</td>
            <td>N/A</td>
          </tr>
          <tr>
            <td class="ft-param">Data retention</td>
            <td class="ft-ok">7 years minimum</td>
            <td>Perpetual</td>
            <td>N/A (regulatory floor)</td>
          </tr>
        </tbody>
      </table>
    </section>

    <hr class="ft-rule" />

    <!-- What you get table -->
    <section class="ft-partners__section">
      <div class="ft-partners__section-label">SECTION 4 · PARTNER ACCESS INVENTORY</div>
      <table class="ft-table">
        <thead>
          <tr>
            <th>CAPABILITY</th>
            <th>DESCRIPTION</th>
            <th>ACCESS METHOD</th>
            <th>INCLUDED</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="ft-param">Admin Visibility</td>
            <td>Full transaction history, user states, risk decisions, ledger entries.</td>
            <td>Admin console (web)</td>
            <td class="ft-ok">YES</td>
          </tr>
          <tr>
            <td class="ft-param">Real-time Ledger</td>
            <td>Live view of all credits and debits. Reconciliation-ready export.</td>
            <td>Console + API</td>
            <td class="ft-ok">YES</td>
          </tr>
          <tr>
            <td class="ft-param">KYC Status</td>
            <td>Per-user verification state, submission history, decision audit.</td>
            <td>Console + API</td>
            <td class="ft-ok">YES</td>
          </tr>
          <tr>
            <td class="ft-param">Risk Score</td>
            <td>Per-transaction risk score with reason codes. Configurable thresholds.</td>
            <td>Console + API</td>
            <td class="ft-ok">YES</td>
          </tr>
          <tr>
            <td class="ft-param">Partner Portal</td>
            <td>Revenue dashboard. Rate configuration. Settlement history. User stats.</td>
            <td>Admin console (web)</td>
            <td class="ft-ok">YES</td>
          </tr>
          <tr>
            <td class="ft-param">Webhook Events</td>
            <td>Real-time push events: transaction.completed, kyc.updated, risk.flagged.</td>
            <td>API (webhook subscription)</td>
            <td class="ft-ok">YES</td>
          </tr>
          <tr>
            <td class="ft-param">Compliance Reports</td>
            <td>AML summary, SAR workflow support, export for regulatory submission.</td>
            <td>Console + API</td>
            <td class="ft-ok">YES</td>
          </tr>
          <tr>
            <td class="ft-param">Fee Configuration</td>
            <td>Set your revenue share rate. Change it any time. Takes effect immediately.</td>
            <td>Admin console (web)</td>
            <td class="ft-ok">YES</td>
          </tr>
        </tbody>
      </table>
    </section>

    <hr class="ft-rule" />

    <!-- Partner obligations -->
    <section class="ft-partners__section">
      <div class="ft-partners__section-label">SECTION 5 · PARTNER OBLIGATIONS</div>
      <table class="ft-table">
        <thead>
          <tr>
            <th>#</th>
            <th>OBLIGATION</th>
            <th>RATIONALE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="ft-num">01</td>
            <td>Disclose use of Prodigy infrastructure to end users.</td>
            <td>Transparency requirement. Standard practice for embedded finance.</td>
          </tr>
          <tr>
            <td class="ft-num">02</td>
            <td>Configure revenue rates in compliance with local law.</td>
            <td>Partners are responsible for rate legality in their jurisdiction.</td>
          </tr>
          <tr>
            <td class="ft-num">03</td>
            <td>Do not modify or interfere with the KYC or risk engine output.</td>
            <td>Compliance integrity. These systems must operate as designed.</td>
          </tr>
          <tr>
            <td class="ft-num">04</td>
            <td>Maintain API key confidentiality.</td>
            <td>Security. Compromised keys must be rotated immediately.</td>
          </tr>
        </tbody>
      </table>
    </section>

    <hr class="ft-rule" />

    <!-- Revenue Calculator -->
    <section class="rc-section" aria-labelledby="rc-heading" data-reveal="fade-up">
      <div class="rc-inner">
        <h2 id="rc-heading" class="rc-headline">REVENUE_PROJECTION.calc</h2>
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
          <span class="rc-result-label">MONTHLY EARN</span>
          <span class="rc-result-num">€{{ rcMonthlyEarn.toLocaleString('de-DE', {minimumFractionDigits:2,maximumFractionDigits:2}) }}</span>
        </div>
      </div>
    </section>

    <!-- QUOTE -->
    <section class="ft-quote-section" aria-label="Partner quote" data-reveal="fade-up">
      <div class="ft-quote-inner">
        <figure class="ft-quote-card">
          <blockquote class="ft-quote-text">"The partner revenue statement reconciles perfectly with our finance system. First time that's ever happened with a vendor."</blockquote>
          <figcaption class="ft-quote-attr">
            <span class="ft-quote-company">InvestKlar</span>
            <span class="ft-quote-role">· Munich · Technology Partner</span>
          </figcaption>
        </figure>
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- APPLICATION_CTA -->
    <section class="fpa-apply" aria-labelledby="apply-h" data-reveal="fade-up">
      <div class="fpa-apply__inner">
        <div class="fpa-apply__label" id="apply-h">&gt; INITIATE_PARTNERSHIP</div>
        <p class="fpa-apply__note">Structured review process. 72-hour SLA on applications. Compliance-first onboarding.</p>
        <div class="fpa-apply__actions">
          <a href="mailto:partners@prodigy.example" class="ft-btn ft-btn--primary">Apply</a>
          <a href="#" class="ft-btn ft-btn--ghost">Download term sheet</a>
        </div>
        <p class="fpa-apply__demo-note">(Demo — partners@prodigy.example)</p>
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- Closing -->
    <div class="ft-partners__closing">
      <p>
        The complete partner agreement is provided on onboarding. The above constitutes the
        material terms. Nothing material is withheld from this summary.
      </p>
      <div class="ft-partners__closing-actions">
        <RouterLink to="/pricing" class="ft-btn ft-btn--ghost">VIEW FEE SCHEDULE →</RouterLink>
        <a href="http://localhost:5001" target="_blank" rel="noopener noreferrer" class="ft-btn ft-btn--primary">REQUEST PARTNER ACCESS →</a>
      </div>
    </div>

    <hr class="ft-rule" />

  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCardTiltAll } from '@/composables/useCardTilt'
import FeeCalculator from '@/components/shared/FeeCalculator.vue'

const rcVolume = ref(100000)
const rcMarkup = ref(0.5)
const rcMonthlyEarn = computed(() => rcVolume.value * rcMarkup.value / 100)

const ftModelsGrid = ref<HTMLElement | null>(null)
useCardTiltAll(ftModelsGrid, '.fpa-model-card', { maxTilt: 4, scale: 1.02, glowColor: '#f59e0b', glowIntensity: 0.15 })
</script>

<style scoped>
.ft-partners {
  --bg: #fafaf8;
  --ink: #0a0a0a;
  --accent: #b85c00;
  --blue: #1a4480;
  --muted: rgba(10, 10, 10, 0.45);
  --font: 'Space Mono', monospace;

  background: var(--bg);
  color: var(--ink);
  font-family: var(--font);
}

.ft-rule {
  border: none;
  border-top: 1px solid var(--ink);
  margin: 0;
}

/* ─── Sysbar ─── */
.ft-partners__sysbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
  padding: 0.45rem 2rem;
  font-size: 0.68rem;
  letter-spacing: 0.07em;
  color: var(--muted);
}

/* ─── Hero ─── */
.ft-partners__hero {
  padding: 2.5rem 2rem 2rem;
  max-width: 860px;
}

.ft-partners__label {
  font-size: 0.68rem;
  color: var(--muted);
  letter-spacing: 0.09em;
  margin-bottom: 0.75rem;
}

.ft-partners__headline {
  font-family: var(--font);
  font-size: clamp(1.4rem, 3vw, 2.2rem);
  font-weight: 700;
  letter-spacing: 0.04em;
  margin: 0 0 1rem;
}

.ft-partners__intro {
  font-size: 0.82rem;
  line-height: 1.8;
  margin: 0;
  opacity: 0.72;
  max-width: 660px;
}

/* ─── Sections ─── */
.ft-partners__section {
  padding: 1.5rem 2rem;
}

.ft-partners__section-label {
  font-size: 0.66rem;
  color: var(--muted);
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
}

/* ─── Embed block ─── */
.ft-partners__embed-block {
  border: 1px solid var(--ink);
  padding: 1rem 1.25rem;
  margin-bottom: 1rem;
}

.ft-partners__embed-label {
  font-size: 0.63rem;
  color: var(--muted);
  letter-spacing: 0.09em;
  margin-bottom: 0.6rem;
}

.ft-partners__embed-code {
  display: block;
  font-family: var(--font);
  font-size: 0.78rem;
  background: rgba(10, 10, 10, 0.05);
  border: 1px solid rgba(10, 10, 10, 0.15);
  padding: 0.6rem 0.9rem;
  word-break: break-all;
  line-height: 1.5;
  margin-bottom: 0.6rem;
  color: var(--accent);
}

.ft-partners__embed-note {
  font-size: 0.72rem;
  color: var(--muted);
  font-style: italic;
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
  font-size: 0.63rem;
  letter-spacing: 0.1em;
  color: var(--muted);
  border-bottom: 1px solid var(--ink);
  padding: 0.35rem 0.8rem;
  white-space: nowrap;
}

.ft-table td {
  padding: 0.5rem 0.8rem;
  border-bottom: 1px solid rgba(10, 10, 10, 0.1);
  vertical-align: top;
  line-height: 1.6;
}

.ft-table tbody tr:hover td {
  background: rgba(10, 10, 10, 0.025);
}

.ft-param {
  font-weight: 700;
  white-space: nowrap;
  font-size: 0.74rem;
}

.ft-num {
  color: var(--muted);
  font-size: 0.68rem;
  white-space: nowrap;
}

.ft-ok {
  color: #1a7a1a;
  font-weight: 700;
}

.ft-accent {
  color: var(--accent);
  font-weight: 700;
}

/* ─── Revenue formula ─── */
.ft-partners__formula-block {
  border: 1px solid var(--ink);
  padding: 1.25rem;
  margin-bottom: 1rem;
}

.ft-partners__formula-main {
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  padding-bottom: 0.75rem;
  margin-bottom: 0.75rem;
  border-bottom: 1px solid rgba(10, 10, 10, 0.15);
  color: var(--accent);
}

.ft-partners__formula-sub {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.ft-partners__formula-row {
  display: grid;
  grid-template-columns: 180px 16px 1fr;
  align-items: baseline;
  gap: 0.5rem;
  font-size: 0.76rem;
  line-height: 1.5;
}

.ft-partners__formula-row span:first-child {
  color: var(--muted);
  font-size: 0.72rem;
}

.ft-partners__formula-row span:nth-child(2) {
  color: var(--accent);
  font-weight: 700;
  text-align: center;
}

.ft-partners__formula-note {
  font-size: 0.75rem;
  line-height: 1.75;
  opacity: 0.65;
  margin: 0;
}

/* ─── Closing ─── */
.ft-partners__closing {
  padding: 2rem 2rem;
}

.ft-partners__closing p {
  font-size: 0.78rem;
  line-height: 1.75;
  opacity: 0.65;
  margin: 0 0 1.5rem;
  max-width: 640px;
}

.ft-partners__closing-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
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

/* ─── Partnership Models ─── */
.fpa-models {
  padding: 1.5rem 2rem;
  background: #0a0d12;
}

.fpa-models__label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.68rem;
  color: rgba(245, 158, 11, 0.5);
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
}

.fpa-models__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.fpa-model-card {
  padding: 1.25rem;
  border-right: 1px solid rgba(245, 158, 11, 0.2);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.fpa-model-card:last-child { border-right: none; }

.fpa-model-type {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.68rem;
  font-weight: 700;
  color: #f59e0b;
  letter-spacing: 0.08em;
}

.fpa-model-stats {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.68rem;
}

.fpa-model-stat {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.fpa-stat-k {
  font-size: 0.6rem;
  color: rgba(245, 158, 11, 0.4);
  letter-spacing: 0.06em;
}

.fpa-stat-v {
  font-size: 0.75rem;
  color: #f59e0b;
  font-weight: 700;
}

.fpa-model-sep {
  color: rgba(245, 158, 11, 0.25);
  font-size: 0.75rem;
}

.fpa-model-body {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.76rem;
  line-height: 1.6;
  color: rgba(245, 158, 11, 0.6);
  margin: 0;
}

/* ─── Partner Economics ─── */
.fpa-economics {
  padding: 1.5rem 2rem;
  background: #0a0d12;
}

.fpa-economics__label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.68rem;
  color: rgba(245, 158, 11, 0.5);
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
}

.fpa-economics__pre {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.78rem;
  line-height: 1.75;
  background: rgba(14, 19, 24, 0.8);
  border: 1px solid rgba(245, 158, 11, 0.25);
  padding: 1rem 1.25rem;
  overflow-x: auto;
  margin: 0;
  color: rgba(245, 158, 11, 0.6);
}

.fpa-ec-hdr { color: #f59e0b; font-weight: 700; }
.fpa-ec-rule { color: rgba(245, 158, 11, 0.2); }
.fpa-ec-key { color: #f59e0b; font-weight: 700; }
.fpa-ec-val { color: #4ade80; font-weight: 700; }
.fpa-ec-muted { color: rgba(245, 158, 11, 0.5); }
.fpa-ec-note { color: rgba(245, 158, 11, 0.4); }

/* ─── Revenue Projection ─── */
.fpa-projection {
  padding: 1.5rem 2rem;
  background: #0a0d12;
}

.fpa-projection__label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.68rem;
  color: rgba(245, 158, 11, 0.5);
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
}

.fpa-projection__pre {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.8rem;
  line-height: 1.8;
  background: rgba(14, 19, 24, 0.8);
  border: 1px solid rgba(245, 158, 11, 0.25);
  padding: 1rem 1.25rem;
  overflow-x: auto;
  margin: 0;
}

.fpa-proj-k { color: rgba(245, 158, 11, 0.55); font-weight: 700; }
.fpa-proj-v { color: rgba(245, 158, 11, 0.75); }
.fpa-proj-amber { color: #f59e0b; font-weight: 700; }
.fpa-proj-muted { color: rgba(245, 158, 11, 0.4); }

/* ─── Apply CTA ─── */
.fpa-apply {
  padding: 2rem;
  background: #0a0d12;
}

.fpa-apply__inner {
  border: 1px solid rgba(245, 158, 11, 0.35);
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 600px;
}

.fpa-apply__label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.78rem;
  font-weight: 700;
  color: #f59e0b;
  letter-spacing: 0.1em;
}

.fpa-apply__note {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.76rem;
  color: rgba(245, 158, 11, 0.55);
  margin: 0;
  line-height: 1.5;
}

.fpa-apply__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.fpa-apply .ft-btn--primary {
  background: #f59e0b;
  border-color: #f59e0b;
  color: #0a0d12;
  font-family: 'IBM Plex Mono', monospace;
}

.fpa-apply .ft-btn--primary:hover {
  background: #fbbf24;
  border-color: #fbbf24;
}

.fpa-apply__demo-note {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.68rem;
  color: rgba(245, 158, 11, 0.3);
  margin: 0;
}

/* ─── Responsive ─── */
@media (max-width: 768px) {
  .ft-partners__sysbar,
  .ft-partners__hero,
  .ft-partners__section,
  .ft-partners__closing {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .ft-table th,
  .ft-table td {
    padding: 0.4rem 0.5rem;
    font-size: 0.71rem;
  }

  .ft-partners__formula-row {
    grid-template-columns: 140px 16px 1fr;
    font-size: 0.72rem;
  }
}

@media (max-width: 768px) {
  .fpa-models, .fpa-economics, .fpa-projection, .fpa-apply { padding-left: 1rem; padding-right: 1rem; }
  .fpa-models__grid { grid-template-columns: 1fr; }
  .fpa-model-card { border-right: none; border-bottom: 1px solid rgba(245,158,11,0.2); }
  .fpa-model-card:last-child { border-bottom: none; }
}

@media (max-width: 480px) {
  .ft-partners__embed-code {
    font-size: 0.65rem;
  }

  .ft-partners__formula-main {
    font-size: 0.85rem;
  }

  .ft-partners__formula-row {
    grid-template-columns: 1fr;
    gap: 0.2rem;
  }

  .ft-partners__formula-row span:nth-child(2) {
    display: none;
  }

  .ft-table th:nth-child(3),
  .ft-table td:nth-child(3) {
    display: none;
  }
}

/* ─── Bar Chart ─── */
.fpa-bar-chart { font-family: 'IBM Plex Mono', monospace; border: 1px solid rgba(245,158,11,0.15); border-radius: 4px; padding: 1rem; max-width: 320px; background: rgba(245,158,11,0.02); margin: 1.5rem 0 0; }
.fpa-bar-label { font-size: 0.75rem; color: rgba(245,158,11,0.4); letter-spacing: 0.08em; margin-bottom: 0.75rem; }
.fpa-bars { display: flex; align-items: flex-end; gap: 0.5rem; height: 80px; }
.fpa-bar { flex: 1; background: rgba(245,158,11,0.15); border: 1px solid rgba(245,158,11,0.3); border-radius: 2px 2px 0 0; height: 0; animation: bar-grow 0.6s ease forwards; display: flex; align-items: flex-start; justify-content: center; position: relative; overflow: visible; }
.fpa-b1 { animation-delay: 0.1s; } .fpa-b2 { animation-delay: 0.2s; } .fpa-b3 { animation-delay: 0.3s; } .fpa-b4 { animation-delay: 0.4s; } .fpa-b5 { animation-delay: 0.5s; background: rgba(245,158,11,0.3); border-color: #f59e0b; }
@keyframes bar-grow { to { height: var(--h); } }
.fpa-b-v { font-size: 0.6875rem; color: rgba(245,158,11,0.6); position: absolute; bottom: calc(100% + 4px); white-space: nowrap; opacity: 0; animation: fade-in-lbl 0.3s ease forwards 0.7s; }
@keyframes fade-in-lbl { to { opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .fpa-bar { animation: none; height: var(--h); } .fpa-b-v { animation: none; opacity: 1; } }

/* ── Fee Calculator section ── */
.ft-fee-calc-section { background: #0a0d12; padding: 2rem 2rem; }
.ft-fee-calc-inner { display: grid; grid-template-columns: 1fr 1.4fr; gap: 3rem; align-items: start; }
.ft-fee-calc-left { display: flex; flex-direction: column; gap: 0.75rem; }
.ft-fee-calc-headline { font-family: 'Space Mono', monospace; font-size: clamp(0.85rem,1.5vw,1rem); font-weight: 700; color: #f59e0b; margin: 0; letter-spacing: 0.04em; }
.ft-fee-bullets { list-style: none; margin: 0.5rem 0 0; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; }
.ft-fee-bullets li { font-family: 'IBM Plex Mono', monospace; font-size: 0.76rem; line-height: 1.6; color: rgba(245,158,11,0.6); padding-left: 1.25rem; position: relative; }
.ft-fee-bullets li::before { content: '//'; position: absolute; left: 0; color: rgba(245,158,11,0.35); font-size: 0.7rem; }
.ft-fee-calc-right { min-width: 0; }
@media (max-width: 768px) { .ft-fee-calc-inner { grid-template-columns: 1fr; gap: 1.5rem; } }

/* ── Quote section ── */
.ft-quote-section { background: #0a0d12; padding: 1.5rem 2rem; }
.ft-quote-inner { max-width: 680px; }
.ft-quote-card { margin: 0; border: 1px solid rgba(245,158,11,0.3); border-left: 3px solid #f59e0b; padding: 1.25rem 1.5rem; background: rgba(245,158,11,0.03); }
.ft-quote-text { font-family: 'IBM Plex Mono', monospace; font-size: 0.82rem; font-style: italic; line-height: 1.7; color: rgba(245,158,11,0.75); margin: 0 0 0.75rem; }
.ft-quote-attr { display: flex; gap: 0.5rem; align-items: baseline; font-family: 'IBM Plex Mono', monospace; font-size: 0.68rem; }
.ft-quote-company { color: #f59e0b; font-weight: 700; }
.ft-quote-role { color: rgba(245,158,11,0.4); }

/* ── Revenue Calculator ── */
.rc-section { background: #0a0e1a; border-top: 1px solid rgba(245,158,11,0.3); }
.rc-inner { max-width: 1440px; margin: 0 auto; padding: 4rem 1.5rem; }
.rc-headline { font-family: 'Space Mono', monospace; font-size: clamp(1rem, 2.5vw, 1.5rem); color: #f59e0b; font-weight: 700; margin: 0 0 0.5rem; }
.rc-sub { font-family: 'Space Mono', monospace; font-size: 0.8125rem; color: rgba(245,158,11,0.5); margin: 0 0 2.5rem; }
.rc-controls { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2.5rem; }
.rc-field { display: flex; flex-direction: column; gap: 0.5rem; }
.rc-label { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: rgba(245,158,11,0.5); }
.rc-slider { width: 100%; accent-color: #f59e0b; }
.rc-val { font-family: 'Space Mono', monospace; font-size: 0.875rem; color: #f59e0b; }
.rc-result { border: 1px solid rgba(245,158,11,0.3); padding: 1.5rem; display: flex; justify-content: space-between; align-items: center; }
.rc-result-label { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: rgba(245,158,11,0.5); text-transform: uppercase; }
.rc-result-num { font-family: 'Space Mono', monospace; font-size: clamp(1.5rem, 4vw, 3rem); color: #f59e0b; font-weight: 700; }
@media (max-width: 768px) { .rc-controls { grid-template-columns: 1fr; } .rc-result { flex-direction: column; gap: 0.5rem; align-items: flex-start; } }
</style>
