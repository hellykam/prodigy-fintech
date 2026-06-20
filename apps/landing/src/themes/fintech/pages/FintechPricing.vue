<template>
  <main class="ft-pricing">

    <!-- Sysbar -->
    <div class="ft-pricing__sysbar">
      <span>REF: PRD-020</span>
      <span>·</span>
      <span>FEE SCHEDULE</span>
      <span>·</span>
      <span>EFFECTIVE DATE: 2026-01-01</span>
      <span>·</span>
      <span>VERSION: 3.1</span>
    </div>

    <hr class="ft-rule" />

    <!-- Headline -->
    <section class="ft-pricing__hero">
      <div class="ft-pricing__label">DOCUMENT CLASS: FEE DISCLOSURE</div>
      <h1 class="ft-pricing__headline">FEE SCHEDULE</h1>
      <p class="ft-pricing__intro">
        All fees are disclosed before the user confirms. This is not a novelty.
        This should be the standard. The following schedule constitutes the complete
        fee structure. There are no fees not listed here.
      </p>
      <div class="fp-fee-ticker" aria-hidden="true">
        <div class="fp-fee-label">RECENT_TRANSACTIONS</div>
        <div class="fp-fee-scroll">
          <div class="fp-fee-row"><span class="fp-fee-id">TX_8821F</span><span class="fp-fee-pair">BTC/EUR</span><span class="fp-fee-amt">€2,340.00</span><span class="fp-fee-fee">FEE: €11.70</span></div>
          <div class="fp-fee-row"><span class="fp-fee-id">TX_4A30C</span><span class="fp-fee-pair">ETH/EUR</span><span class="fp-fee-amt">€890.50</span><span class="fp-fee-fee">FEE: €4.45</span></div>
          <div class="fp-fee-row fp-fee-row--hi"><span class="fp-fee-id">TX_9D12E</span><span class="fp-fee-pair">BTC/GBP</span><span class="fp-fee-amt">€5,100.00</span><span class="fp-fee-fee">FEE: €25.50</span></div>
          <div class="fp-fee-row"><span class="fp-fee-id">TX_2B07A</span><span class="fp-fee-pair">SOL/EUR</span><span class="fp-fee-amt">€410.00</span><span class="fp-fee-fee">FEE: €2.05</span></div>
          <div class="fp-fee-row"><span class="fp-fee-id">TX_6C55D</span><span class="fp-fee-pair">LTC/EUR</span><span class="fp-fee-amt">€180.00</span><span class="fp-fee-fee">FEE: €0.90</span></div>
        </div>
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- Fee calculator -->
    <section class="fc-section" aria-labelledby="fc-heading" data-reveal="fade-up">
      <div class="fc-inner">
        <div class="fc-header">
          <span id="fc-heading" class="fc-label">FEE_CALCULATOR.exe</span>
          <span class="fc-status">● READY</span>
        </div>
        <!-- Annual / Monthly toggle -->
        <div class="ft-billing-toggle" role="group" aria-label="Billing period">
          <button class="ft-billing-btn" :class="{ active: !annual }" @click="annual = false" :aria-pressed="!annual">Monthly</button>
          <button class="ft-billing-btn ft-billing-btn--annual" :class="{ active: annual }" @click="annual = true" :aria-pressed="annual">
            Annual <span class="ft-save-badge">−20%</span>
          </button>
        </div>
        <p v-if="annual" class="ft-billing-note">// Platform fee billed annually · 20% discount applied</p>

        <div class="fc-grid">
          <div class="fc-inputs">
            <div class="fc-field">
              <label for="fc-amount" class="fc-field-label">SEND_AMOUNT (EUR)</label>
              <input id="fc-amount" v-model.number="fcAmount" type="range" min="100" max="10000" step="50" class="fc-range" />
              <div class="fc-range-val">€{{ fcAmount.toLocaleString('de-DE') }}</div>
            </div>
            <div class="fc-field">
              <label for="fc-pair" class="fc-field-label">CURRENCY_PAIR</label>
              <select id="fc-pair" v-model="fcCurrency" class="fc-select">
                <option>EUR→BTC</option>
                <option>EUR→ETH</option>
                <option>EUR→USDT</option>
                <option>EUR→USD</option>
              </select>
            </div>
            <div class="fc-field">
              <label for="fc-partner" class="fc-field-label">PARTNER_MARKUP (%)</label>
              <input id="fc-partner" v-model.number="fcPartnerShare" type="range" min="0" max="2" step="0.1" class="fc-range" />
              <div class="fc-range-val">{{ fcPartnerShare.toFixed(1) }}%</div>
            </div>
          </div>
          <div class="fc-output" role="region" aria-label="Fee breakdown">
            <div class="fc-row">
              <span class="fc-row-key">SEND_AMOUNT</span>
              <span class="fc-row-val">€{{ fcAmount.toLocaleString('de-DE', {minimumFractionDigits:2,maximumFractionDigits:2}) }}</span>
            </div>
            <div class="fc-row">
              <span class="fc-row-key">PLATFORM_FEE (0.5%)</span>
              <span class="fc-row-val fc-row-val--muted">−€{{ fcPlatformFee.toLocaleString('de-DE', {minimumFractionDigits:2,maximumFractionDigits:2}) }}</span>
            </div>
            <div class="fc-row">
              <span class="fc-row-key">NETWORK_FEE (flat)</span>
              <span class="fc-row-val fc-row-val--muted">−€{{ fcNetworkFee.toFixed(2) }}</span>
            </div>
            <div class="fc-row">
              <span class="fc-row-key">PARTNER_EARN</span>
              <span class="fc-row-val fc-row-val--earn">+€{{ fcPartnerEarn.toLocaleString('de-DE', {minimumFractionDigits:2,maximumFractionDigits:2}) }}</span>
            </div>
            <div class="fc-row fc-row--total">
              <span class="fc-row-key">USER_RECEIVES</span>
              <span class="fc-row-val fc-row-val--amber">€{{ fcUserReceives.toLocaleString('de-DE', {minimumFractionDigits:2,maximumFractionDigits:2}) }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- Fee schedule table -->
    <section class="ft-pricing__section">
      <div class="ft-pricing__section-label">SECTION 1 · TRANSACTION FEE SCHEDULE</div>
      <table class="ft-table">
        <thead>
          <tr>
            <th>FEE TYPE</th>
            <th>RATE</th>
            <th>WHEN CHARGED</th>
            <th>WHO PAYS</th>
            <th>DISCLOSED PRE-CONFIRM</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="ft-fee-name">Platform Fee</td>
            <td class="ft-accent">0.50% of transaction value</td>
            <td>At transaction execution</td>
            <td>End user</td>
            <td class="ft-ok">YES</td>
          </tr>
          <tr>
            <td class="ft-fee-name">Partner Revenue Share</td>
            <td class="ft-accent">0–2.00% (partner-configured)</td>
            <td>At transaction execution, simultaneously with platform fee</td>
            <td>End user</td>
            <td class="ft-ok">YES</td>
          </tr>
          <tr>
            <td class="ft-fee-name">Network Fee</td>
            <td class="ft-accent">Market rate + 0bps markup</td>
            <td>At transaction execution, passed through at cost</td>
            <td>End user</td>
            <td class="ft-ok">YES</td>
          </tr>
          <tr>
            <td class="ft-fee-name">KYC Verification</td>
            <td class="ft-accent">Included in platform fee</td>
            <td>First verification only. No charge for re-verification.</td>
            <td>Prodigy (absorbed)</td>
            <td class="ft-ok">N/A</td>
          </tr>
          <tr>
            <td class="ft-fee-name">API Access</td>
            <td class="ft-accent">Included</td>
            <td>No separate charge for API calls within rate limits</td>
            <td>Partner (absorbed)</td>
            <td class="ft-ok">N/A</td>
          </tr>
          <tr>
            <td class="ft-fee-name">Admin Console</td>
            <td class="ft-accent">Included</td>
            <td>No charge for console access, users, or roles</td>
            <td>Partner (absorbed)</td>
            <td class="ft-ok">N/A</td>
          </tr>
        </tbody>
      </table>
    </section>

    <hr class="ft-rule" />

    <!-- Fee formula -->
    <section class="ft-pricing__formula">
      <div class="ft-pricing__section-label">SECTION 2 · FEE CALCULATION METHOD</div>
      <div class="ft-pricing__formula-block">
        <div class="ft-pricing__formula-row">
          <span class="ft-pricing__formula-label">Total fee shown to user</span>
          <span class="ft-pricing__formula-eq">=</span>
          <span class="ft-pricing__formula-val">Platform Fee + Partner Fee + Network Fee</span>
        </div>
        <div class="ft-pricing__formula-row">
          <span class="ft-pricing__formula-label">Platform Fee</span>
          <span class="ft-pricing__formula-eq">=</span>
          <span class="ft-pricing__formula-val">Transaction Amount × 0.0050</span>
        </div>
        <div class="ft-pricing__formula-row">
          <span class="ft-pricing__formula-label">Partner Fee</span>
          <span class="ft-pricing__formula-eq">=</span>
          <span class="ft-pricing__formula-val">Transaction Amount × Partner Rate (0.00 – 0.0200)</span>
        </div>
        <div class="ft-pricing__formula-row">
          <span class="ft-pricing__formula-label">Network Fee</span>
          <span class="ft-pricing__formula-eq">=</span>
          <span class="ft-pricing__formula-val">Live market gas/spread at time of quote. Locked at quote. No markup.</span>
        </div>
      </div>
      <p class="ft-pricing__formula-note">
        All amounts are quoted and locked at the time the user receives the fee summary.
        The user confirms the exact amounts they will pay before execution begins.
        No post-confirmation fee adjustments occur.
      </p>
    </section>

    <hr class="ft-rule" />

    <!-- Comparison table -->
    <section class="ft-pricing__section" data-reveal="fade-up">
      <div class="ft-pricing__section-label">SECTION 3 · INDUSTRY COMPARISON</div>
      <table class="ft-table">
        <thead>
          <tr>
            <th>CRITERION</th>
            <th>PRODIGY</th>
            <th>INDUSTRY STANDARD</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="ft-param">Fee disclosure timing</td>
            <td class="ft-ok">Before confirmation</td>
            <td class="ft-warn">After confirmation / estimated only</td>
          </tr>
          <tr>
            <td class="ft-param">Network fee markup</td>
            <td class="ft-ok">0bps (pass-through)</td>
            <td class="ft-warn">10–100bps (often undisclosed)</td>
          </tr>
          <tr>
            <td class="ft-param">Partner revenue setup</td>
            <td class="ft-ok">Self-serve, real-time dashboard</td>
            <td class="ft-warn">Manual invoicing, 30–90 day cycles</td>
          </tr>
          <tr>
            <td class="ft-param">Fee locked at quote</td>
            <td class="ft-ok">Yes</td>
            <td class="ft-warn">Rarely</td>
          </tr>
          <tr>
            <td class="ft-param">Hidden fees</td>
            <td class="ft-ok">None</td>
            <td class="ft-warn">FX spread, conversion margin, processing fee</td>
          </tr>
          <tr>
            <td class="ft-param">Integration requirement</td>
            <td class="ft-ok">1 line of code</td>
            <td class="ft-warn">SDK install, API keys, documentation review, testing</td>
          </tr>
          <tr>
            <td class="ft-param">Compliance included</td>
            <td class="ft-ok">KYC, AML, risk engine — all included</td>
            <td class="ft-warn">Separate vendors, separate contracts, separate fees</td>
          </tr>
          <tr>
            <td class="ft-param">Audit trail</td>
            <td class="ft-ok">Immutable, real-time, exportable</td>
            <td class="ft-warn">Periodic reports, manual request</td>
          </tr>
        </tbody>
      </table>
    </section>

    <hr class="ft-rule" />

    <!-- Disclosure note -->
    <section class="ft-pricing__disclosure">
      <div class="ft-pricing__section-label">SECTION 4 · REGULATORY DISCLOSURE</div>
      <div class="ft-pricing__disclosure-body">
        <p>
          This fee schedule is provided for informational purposes. Actual fees may vary based on
          transaction size, partner configuration, and live network conditions at time of execution.
          Network fees are quoted in real time and locked for 30 seconds from the time of quote
          presentation.
        </p>
        <p>
          Partner revenue share rates are configured by the partner and are not set by Prodigy.
          Partners are responsible for ensuring their configured rates comply with applicable law
          and their own disclosures to end users.
        </p>
        <p>
          Prodigy does not charge monthly fees, setup fees, minimum transaction fees, or any fee
          not listed in Section 1 of this document.
        </p>
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- VOLUME_GRAPH -->
    <section class="ft-volgraph-section" aria-labelledby="ft-volgraph-h" data-reveal="fade-up">
      <div class="ft-pricing__section-label" id="ft-volgraph-h">SECTION 4b · PARTNER_REVENUE_AT_SCALE</div>
      <p class="ft-subhead" style="margin-top:0.5rem;">Estimated monthly partner revenue by volume tier</p>
      <div class="ft-volgraph-wrap">
        <svg ref="volGraphRef" viewBox="0 0 280 120" fill="none" xmlns="http://www.w3.org/2000/svg"
             width="100%" preserveAspectRatio="xMidYMid meet"
             aria-hidden="true" role="img" class="volgraph-svg">
          <text x="21" y="12" text-anchor="middle" font-size="8" fill="#f59e0b" font-family="Space Mono, monospace">€10</text>
          <text x="77" y="12" text-anchor="middle" font-size="8" fill="#f59e0b" font-family="Space Mono, monospace">€37</text>
          <text x="133" y="12" text-anchor="middle" font-size="8" fill="#f59e0b" font-family="Space Mono, monospace">€125</text>
          <text x="189" y="12" text-anchor="middle" font-size="8" fill="#f59e0b" font-family="Space Mono, monospace">€312</text>
          <text x="245" y="12" text-anchor="middle" font-size="8" fill="#f59e0b" font-family="Space Mono, monospace">€625</text>
          <rect class="vol-bar" x="6" y="87" width="30" height="18" ry="3" fill="rgba(245,158,11,0.7)" />
          <rect class="vol-bar" x="62" y="73.5" width="30" height="31.5" ry="3" fill="rgba(245,158,11,0.7)" />
          <rect class="vol-bar" x="118" y="55.5" width="30" height="49.5" ry="3" fill="rgba(245,158,11,0.7)" />
          <rect class="vol-bar" x="174" y="37.5" width="30" height="67.5" ry="3" fill="rgba(245,158,11,0.7)" />
          <rect class="vol-bar" x="230" y="15" width="30" height="90" ry="3" fill="rgba(245,158,11,0.7)" />
          <line x1="0" y1="106" x2="280" y2="106" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
          <text x="21" y="116" text-anchor="middle" font-size="8" fill="rgba(255,255,255,0.4)" font-family="Space Mono, monospace">€10k</text>
          <text x="77" y="116" text-anchor="middle" font-size="8" fill="rgba(255,255,255,0.4)" font-family="Space Mono, monospace">€50k</text>
          <text x="133" y="116" text-anchor="middle" font-size="8" fill="rgba(255,255,255,0.4)" font-family="Space Mono, monospace">€200k</text>
          <text x="189" y="116" text-anchor="middle" font-size="8" fill="rgba(255,255,255,0.4)" font-family="Space Mono, monospace">€500k</text>
          <text x="245" y="116" text-anchor="middle" font-size="8" fill="rgba(255,255,255,0.4)" font-family="Space Mono, monospace">€1M+</text>
        </svg>
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- FAQ_SECTION -->
    <section class="ft-pricing__section ftp-faq" aria-labelledby="faq-h" data-reveal="fade-up">
      <div class="ft-pricing__section-label" id="faq-h">SECTION 5 · FREQUENTLY_ASKED_QUESTIONS</div>
      <div class="ftp-faq__list">
        <details class="ftp-faq__item">
          <summary class="ftp-faq__q">Are there setup fees?</summary>
          <p class="ftp-faq__a">None. Per successful transaction only. No monthly minimums, no onboarding fees, no hidden charges.</p>
        </details>
        <details class="ftp-faq__item">
          <summary class="ftp-faq__q">What happens if I exceed my volume tier?</summary>
          <p class="ftp-faq__a">Auto-scales to the next tier. No manual intervention. No surprise invoices. You are notified by email when a threshold is crossed.</p>
        </details>
        <details class="ftp-faq__item">
          <summary class="ftp-faq__q">Is KYC verification billed separately?</summary>
          <p class="ftp-faq__a">Bundled. Never separate. KYC is included in the platform fee. There is no per-verification charge to you or your users.</p>
        </details>
        <details class="ftp-faq__item">
          <summary class="ftp-faq__q">What are the contract terms?</summary>
          <p class="ftp-faq__a">Monthly on Starter and Growth tiers — cancel any time. Enterprise terms are annual, negotiated, and include SLA credits.</p>
        </details>
        <details class="ftp-faq__item">
          <summary class="ftp-faq__q">Is there a sandbox environment?</summary>
          <p class="ftp-faq__a">Full sandbox. Free. No credit card required. Test identities include pass / fail / review / pending. No real money processed.</p>
        </details>
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- SUB-PROCESSOR NOTE -->
    <section class="ft-pricing__section ftp-subproc" aria-labelledby="subproc-h" data-reveal="fade-up">
      <div class="ft-pricing__section-label" id="subproc-h">SECTION 6 · PAYMENT_PROCESSING_NOTE</div>
      <div class="ftp-subproc__callout">
        <p class="ftp-subproc__text">
          All payment processing sub-processors are PCI DSS L1 certified. Data residency: EU-West primary.
          See <RouterLink to="/fintech/security" class="ftp-subproc__link">security page</RouterLink> for full sub-processor list.
        </p>
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- CTA -->
    <div class="ft-pricing__footer">
      <RouterLink to="/partners" class="ft-btn ft-btn--ghost">PARTNER TERMS →</RouterLink>
      <a href="http://localhost:5001" target="_blank" rel="noopener noreferrer" class="ft-btn ft-btn--primary">REQUEST DEMO ACCESS →</a>
    </div>

    <hr class="ft-rule" />

  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const volGraphRef = ref<SVGSVGElement | null>(null)

onMounted(() => {
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

// ── Annual / Monthly toggle ──────────────────────────────────────
const annual = ref(false)
const multiplier = computed(() => annual.value ? 0.8 : 1)

const fcAmount = ref(1000)
const fcCurrency = ref('EUR→BTC')
const fcPartnerShare = ref(0.20)
const fcPlatformFee = computed(() => fcAmount.value * 0.005)
const fcNetworkFee = computed(() => 2.40)
const fcPartnerEarn = computed(() => fcAmount.value * fcPartnerShare.value / 100)
const fcTotalFees = computed(() => fcPlatformFee.value + fcPartnerEarn.value + fcNetworkFee.value)
const fcUserReceives = computed(() => Math.max(0, fcAmount.value - fcTotalFees.value))
</script>

<style scoped>
.ft-pricing {
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
.ft-pricing__sysbar {
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
.ft-pricing__hero {
  padding: 2.5rem 2rem 2rem;
  max-width: 860px;
}

.ft-pricing__label {
  font-size: 0.68rem;
  color: var(--muted);
  letter-spacing: 0.09em;
  margin-bottom: 0.75rem;
}

.ft-pricing__headline {
  font-family: var(--font);
  font-size: clamp(1.4rem, 3vw, 2.2rem);
  font-weight: 700;
  letter-spacing: 0.04em;
  margin: 0 0 1rem;
}

.ft-pricing__intro {
  font-size: 0.82rem;
  line-height: 1.8;
  margin: 0;
  opacity: 0.72;
  max-width: 660px;
}

/* ─── Sections ─── */
.ft-pricing__section {
  padding: 1.5rem 2rem;
}

.ft-pricing__section-label {
  font-size: 0.66rem;
  color: var(--muted);
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
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

.ft-fee-name {
  font-weight: 700;
  white-space: nowrap;
}

.ft-param {
  font-weight: 700;
  white-space: nowrap;
  font-size: 0.74rem;
}

.ft-accent {
  color: var(--accent);
  font-weight: 700;
}

.ft-ok {
  color: #1a7a1a;
  font-weight: 700;
}

.ft-warn {
  color: #8b1a1a;
  opacity: 0.85;
}

/* ─── Formula block ─── */
.ft-pricing__formula {
  padding: 1.5rem 2rem;
}

.ft-pricing__formula-block {
  border: 1px solid var(--ink);
  padding: 1rem 1.25rem;
  margin-bottom: 1rem;
}

.ft-pricing__formula-row {
  display: grid;
  grid-template-columns: 220px 24px 1fr;
  align-items: baseline;
  gap: 0.5rem;
  padding: 0.35rem 0;
  border-bottom: 1px solid rgba(10, 10, 10, 0.08);
  font-size: 0.78rem;
  line-height: 1.5;
}

.ft-pricing__formula-row:last-child {
  border-bottom: none;
}

.ft-pricing__formula-label {
  color: var(--muted);
  font-size: 0.72rem;
}

.ft-pricing__formula-eq {
  color: var(--accent);
  font-weight: 700;
  text-align: center;
}

.ft-pricing__formula-val {
  font-weight: 700;
}

.ft-pricing__formula-note {
  font-size: 0.75rem;
  line-height: 1.75;
  opacity: 0.65;
  margin: 0;
}

/* ─── Disclosure ─── */
.ft-pricing__disclosure {
  padding: 1.5rem 2rem;
}

.ft-pricing__disclosure-body {
  max-width: 720px;
}

.ft-pricing__disclosure-body p {
  font-size: 0.75rem;
  line-height: 1.8;
  opacity: 0.65;
  margin: 0 0 0.85rem;
}

.ft-pricing__disclosure-body p:last-child {
  margin-bottom: 0;
}

/* ─── Footer ─── */
.ft-pricing__footer {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1.5rem 2rem;
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

/* ─── Fee Calculator ─── */
.fc-section { background: #0a0e1a; border-top: 1px solid rgba(245,158,11,0.3); }
.fc-inner { max-width: 1440px; margin: 0 auto; padding: 4rem 1.5rem; }
.fc-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; border-bottom: 1px solid rgba(245,158,11,0.2); padding-bottom: 1rem; }
.fc-label { font-family: 'Space Mono', monospace; font-size: 0.875rem; color: #f59e0b; font-weight: 700; }
.fc-status { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: #34d399; }
.fc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }
.fc-field { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; }
.fc-field-label { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: rgba(245,158,11,0.6); letter-spacing: 0.05em; }
.fc-range { width: 100%; accent-color: #f59e0b; }
.fc-range-val { font-family: 'Space Mono', monospace; font-size: 0.875rem; color: #f59e0b; }
.fc-select { background: #0a0e1a; border: 1px solid rgba(245,158,11,0.3); color: #f59e0b; font-family: 'Space Mono', monospace; font-size: 0.875rem; padding: 0.5rem; width: 100%; }
.fc-output { border: 1px solid rgba(245,158,11,0.2); }
.fc-row { display: flex; justify-content: space-between; padding: 0.75rem 1rem; border-bottom: 1px solid rgba(245,158,11,0.08); font-family: 'Space Mono', monospace; font-size: 0.8125rem; }
.fc-row:last-child { border-bottom: none; }
.fc-row--total { background: rgba(245,158,11,0.05); }
.fc-row-key { color: rgba(245,158,11,0.5); }
.fc-row-val { color: #f5f5f0; }
.fc-row-val--muted { color: rgba(245,158,11,0.5); }
.fc-row-val--earn { color: #34d399; }
.fc-row-val--amber { color: #f59e0b; font-weight: 700; }
@media (max-width: 768px) { .fc-grid { grid-template-columns: 1fr; gap: 2rem; } .fc-inner { padding: 2.5rem 1rem; } }

/* ─── Responsive ─── */
@media (max-width: 768px) {
  .ft-pricing__sysbar,
  .ft-pricing__hero,
  .ft-pricing__section,
  .ft-pricing__formula,
  .ft-pricing__disclosure,
  .ft-pricing__footer {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .ft-table th,
  .ft-table td {
    padding: 0.4rem 0.5rem;
    font-size: 0.71rem;
  }

  .ft-pricing__formula-row {
    grid-template-columns: 160px 20px 1fr;
    font-size: 0.72rem;
  }
}

@media (max-width: 480px) {
  .ft-table th:nth-child(4),
  .ft-table td:nth-child(4) {
    display: none;
  }

  .ft-pricing__formula-row {
    grid-template-columns: 1fr;
    gap: 0.2rem;
  }

  .ft-pricing__formula-eq {
    display: none;
  }

  .ft-pricing__formula-label::after {
    content: ':';
  }
}

/* ─── FAQ Section ─── */
.ftp-faq__list {
  border: 1px solid rgba(10,10,10,0.15);
  margin-top: 0.75rem;
}

.ftp-faq__item {
  border-bottom: 1px solid rgba(10,10,10,0.1);
  font-family: var(--font);
}

.ftp-faq__item:last-child {
  border-bottom: none;
}

.ftp-faq__q {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  padding: 0.85rem 1rem;
  cursor: pointer;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--accent);
  transition: background 0.12s;
}

.ftp-faq__q::after {
  content: '+';
  font-size: 1rem;
  color: var(--accent);
  flex-shrink: 0;
  margin-left: 1rem;
}

details[open] .ftp-faq__q::after {
  content: '−';
}

.ftp-faq__q:hover {
  background: rgba(10,10,10,0.03);
}

.ftp-faq__q::-webkit-details-marker {
  display: none;
}

.ftp-faq__a {
  font-size: 0.76rem;
  line-height: 1.75;
  padding: 0 1rem 0.85rem;
  margin: 0;
  color: var(--ink);
  opacity: 0.72;
}

/* ─── Sub-processor Note ─── */
.ftp-subproc__callout {
  border: 1px solid rgba(184, 92, 0, 0.3);
  border-left: 3px solid var(--accent);
  padding: 0.85rem 1.25rem;
  background: rgba(184, 92, 0, 0.04);
  margin-top: 0.5rem;
  max-width: 720px;
}

.ftp-subproc__text {
  font-size: 0.75rem;
  line-height: 1.75;
  margin: 0;
  opacity: 0.8;
}

.ftp-subproc__link {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.ftp-subproc__link:hover {
  color: var(--ink);
}

/* ─── Fee Ticker ─── */
.fp-fee-ticker { font-family: 'IBM Plex Mono', monospace; border: 1px solid rgba(245,158,11,0.2); border-radius: 4px; overflow: hidden; max-width: 560px; margin: 1.5rem 0 0; }
.fp-fee-label { background: rgba(245,158,11,0.08); padding: 0.375rem 0.75rem; font-size: 0.75rem; color: rgba(245,158,11,0.5); letter-spacing: 0.08em; border-bottom: 1px solid rgba(245,158,11,0.1); }
.fp-fee-scroll { overflow: hidden; height: 140px; position: relative; }
.fp-fee-scroll::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 40px; background: linear-gradient(to bottom, transparent, #0a0d12); pointer-events: none; }
.fp-fee-row { display: flex; align-items: center; gap: 1.5rem; padding: 0.5rem 0.75rem; border-bottom: 1px solid rgba(245,158,11,0.06); font-size: 0.8125rem; animation: fee-scroll-up 8s linear infinite; }
.fp-fee-row:nth-child(1) { animation-delay: 0s; }
.fp-fee-row:nth-child(2) { animation-delay: 1.6s; }
.fp-fee-row:nth-child(3) { animation-delay: 3.2s; }
.fp-fee-row:nth-child(4) { animation-delay: 4.8s; }
.fp-fee-row:nth-child(5) { animation-delay: 6.4s; }
.fp-fee-row--hi .fp-fee-amt { color: #fbbf24; }
.fp-fee-id { color: rgba(245,158,11,0.4); font-size: 0.75rem; }
.fp-fee-pair { color: rgba(255,255,255,0.5); }
.fp-fee-amt { color: rgba(255,255,255,0.8); margin-left: auto; }
.fp-fee-fee { color: #f59e0b; font-weight: 600; }
@keyframes fee-scroll-up { 0%{opacity:0;transform:translateY(8px)} 8%{opacity:1;transform:translateY(0)} 90%{opacity:1} 100%{opacity:0} }
@media (prefers-reduced-motion: reduce) { .fp-fee-row { animation: none; opacity: 1; } }

/* ── Annual / Monthly billing toggle ───────────────────────── */
.ft-billing-toggle {
  display: inline-flex;
  gap: 0;
  border: 1px solid rgba(245, 158, 11, 0.3);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 2rem;
  font-family: 'Space Mono', monospace;
}

.ft-billing-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.45);
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

.ft-billing-btn.active {
  background: rgba(245, 158, 11, 0.15);
  color: #f59e0b;
}

.ft-billing-btn:hover:not(.active) {
  background: rgba(245, 158, 11, 0.06);
  color: rgba(255, 255, 255, 0.7);
}

.ft-save-badge {
  background: rgba(245, 158, 11, 0.2);
  color: #f59e0b;
  font-size: 0.75rem;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
}

.ft-billing-note {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: rgba(245, 158, 11, 0.7);
  margin-bottom: 1.5rem;
  margin-top: -1rem;
}

/* ── Volume Graph SVG ── */
.ft-volgraph-section { padding: 2.5rem 2rem; }
.ft-volgraph-wrap { max-width: 600px; margin-top: 1.5rem; }
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
