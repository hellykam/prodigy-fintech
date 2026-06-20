<template>
  <main>

    <!-- ── Hero ─────────────────────────────────────────────────── -->
    <section class="hero" aria-labelledby="sec-headline">
      <div class="section-inner hero-inner">
        <p class="label eyebrow">COMPLIANCE &amp; SECURITY</p>
        <h1 id="sec-headline" class="hero-headline" ref="heroH">
          <span class="line">THE</span>
          <span class="line">SECURITY</span>
          <span class="line">PAGE.</span>
          <span class="line iris-text">YES, WE HAVE ONE.</span>
        </h1>
        <p class="hero-sub" ref="heroSubEl">
          Most crypto infrastructure hides its security posture behind NDAs and marketing language. We put ours on a page. You're reading it now.
        </p>
        <div class="kyc-flow-vis" aria-hidden="true">
          <div class="kf-step">
            <div class="kf-icon">◉</div>
            <span class="kf-label">ID SCAN</span>
          </div>
          <div class="kf-connector"><div class="kf-line"></div></div>
          <div class="kf-step">
            <div class="kf-icon">◎</div>
            <span class="kf-label">LIVENESS</span>
          </div>
          <div class="kf-connector"><div class="kf-line kf-line--2"></div></div>
          <div class="kf-step">
            <div class="kf-icon">◈</div>
            <span class="kf-label">SANCTIONS</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── KYC Architecture ──────────────────────────────────────── -->
    <section class="kyc-section" aria-labelledby="kyc-h">
      <div class="section-inner">
        <div class="section-header">
          <p class="label eyebrow">02 / KYC Architecture</p>
          <h2 id="kyc-h" class="section-headline" ref="kycH">IDENTITY VERIFICATION IN THREE STEPS</h2>
        </div>
        <p class="section-intro">Every first-time user passes through the same three-step flow inside the widget. Nothing is deferred to a back-office team. Nothing is optional.</p>
        <ol class="kyc-steps" role="list" data-animate-stagger>
          <li v-for="(step, i) in kycSteps" :key="i" class="kyc-step">
            <div class="step-num font-mono">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="step-body">
              <h3 class="step-title">{{ step.title }}</h3>
              <p class="step-detail">{{ step.detail }}</p>
              <div class="step-meta">
                <span class="meta-chip">{{ step.duration }}</span>
                <span class="meta-chip">{{ step.logged }}</span>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- ── Audit Trail ──────────────────────────────────────────── -->
    <section class="audit-section" aria-labelledby="audit-h">
      <div class="section-inner">
        <div class="section-header">
          <p class="label eyebrow">03 / Audit Trail</p>
          <h2 id="audit-h" class="section-headline">EVERY TRANSACTION. FULLY LOGGED.</h2>
        </div>
        <p class="section-intro">Your regulator will find everything they're looking for. The audit trail is not an export from a spreadsheet — it is the primary record.</p>
        <div class="audit-table" role="table" aria-label="Audit trail fields" data-reveal="fade-left">
          <div class="audit-head" role="row">
            <span role="columnheader">Field</span>
            <span role="columnheader">Description</span>
            <span role="columnheader">Retained</span>
          </div>
          <div v-for="row in auditRows" :key="row.field" class="audit-row" role="row">
            <span class="font-mono audit-field" role="cell">{{ row.field }}</span>
            <span class="audit-desc" role="cell">{{ row.desc }}</span>
            <span class="audit-ret font-mono" role="cell">{{ row.ret }}</span>
          </div>
        </div>
        <p class="audit-note font-mono">All events are immutable. No record can be amended post-settlement.</p>
      </div>
    </section>

    <!-- ── Data Handling ─────────────────────────────────────────── -->
    <section class="data-section" aria-labelledby="data-h">
      <div class="section-inner">
        <div class="section-header">
          <p class="label eyebrow">04 / Data Handling</p>
          <h2 id="data-h" class="section-headline">WHAT WE COLLECT, AND WHY.</h2>
        </div>
        <div class="data-grid" data-animate-stagger>
          <div v-for="item in dataItems" :key="item.label" class="data-card">
            <p class="data-label">{{ item.label }}</p>
            <p class="data-value">{{ item.value }}</p>
            <p class="data-detail">{{ item.detail }}</p>
          </div>
        </div>
        <p class="gdpr-note">GDPR-aligned. Data subjects may request access or deletion at any time. KYC records are subject to AML retention requirements (5 years from last transaction).</p>
      </div>
    </section>

    <!-- ── Shield Illustration ──────────────────────────────────── -->
    <section class="shield-section" aria-labelledby="shield-h" data-reveal="fade-up">
      <div class="section-inner shield-inner">
        <div class="shield-copy">
          <p class="label eyebrow">OUR APPROACH</p>
          <h2 id="shield-h" class="section-headline">LAYERED DEFENCE.<br />AT EVERY LEVEL.</h2>
          <p class="section-intro">Three concentric security layers: infrastructure, compliance, and transaction-level controls. Each monitors the others. None relies on a single point of trust.</p>
        </div>
        <div class="shield-vis" aria-hidden="true">
          <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg"
               width="220" height="257" preserveAspectRatio="xMidYMid meet"
               aria-hidden="true" role="img" class="shield-svg">
            <!-- Outer shield -->
            <path class="shield-outer" d="M60,8 L108,28 L108,72 C108,100 60,128 60,128 C60,128 12,100 12,72 L12,28 Z"
                  fill="rgba(52,211,153,0.04)" stroke="#34d399" stroke-width="1.5" />
            <!-- Middle shield -->
            <path class="shield-mid" d="M60,19.8 L97.8,36.8 L97.8,73.2 C97.8,97.5 60,121.7 60,121.7 C60,121.7 22.2,97.5 22.2,73.2 L22.2,36.8 Z"
                  fill="rgba(52,211,153,0.07)" stroke="#34d399" stroke-width="1.5" />
            <!-- Inner shield -->
            <path class="shield-inner-path" d="M60,31.6 L87.6,45.6 L87.6,74.4 C87.6,94.8 60,115.4 60,115.4 C60,115.4 32.4,94.8 32.4,74.4 L32.4,45.6 Z"
                  fill="rgba(52,211,153,0.12)" stroke="#34d399" stroke-width="1.5" />
            <!-- Lock icon -->
            <text x="60" y="84" text-anchor="middle" font-size="22" fill="#34d399">🔒</text>
          </svg>
        </div>
      </div>
    </section>

    <!-- ── Risk Engine ───────────────────────────────────────────── -->
    <section class="risk-section" aria-labelledby="risk-h">
      <div class="section-inner">
        <div class="section-header">
          <p class="label eyebrow">05 / Risk Engine</p>
          <h2 id="risk-h" class="section-headline">12 AUTOMATED CHECKS. EVERY TRANSACTION.</h2>
        </div>
        <p class="section-intro">Before any transaction settles, the risk engine runs twelve checks in parallel. The whole process takes under 400ms. Anything that does not pass automatically enters the manual review queue.</p>
        <ul class="risk-grid" role="list" data-reveal="fade-up">
          <li v-for="check in riskChecks" :key="check" class="risk-chip">
            <span class="risk-bullet" aria-hidden="true">◈</span>
            {{ check }}
          </li>
        </ul>
        <div class="risk-footer font-mono">
          <span>Manual review queue → <a href="http://localhost:5002" target="_blank" rel="noopener noreferrer" class="inline-link">Admin console</a></span>
          <span class="risk-stat">Avg review time: 4.2 minutes</span>
        </div>
      </div>
    </section>

    <!-- ── Jurisdiction Coverage ────────────────────────────────── -->
    <section class="jurisdiction-section" aria-labelledby="jurisdiction-h">
      <div class="section-inner">
        <p class="label eyebrow" data-reveal="fade-up">REGULATORY COVERAGE</p>
        <h2 id="jurisdiction-h" class="section-headline" ref="jurisdictionH" data-grad-sweep data-reveal="fade-up">REGULATORY COVERAGE: 40+ JURISDICTIONS</h2>
        <div class="jurisdiction-grid" data-animate-stagger>
          <span class="jurisdiction-chip">European Union</span>
          <span class="jurisdiction-chip">United Kingdom</span>
          <span class="jurisdiction-chip">United States</span>
          <span class="jurisdiction-chip">Singapore</span>
          <span class="jurisdiction-chip">Australia</span>
          <span class="jurisdiction-chip">Canada</span>
          <span class="jurisdiction-chip">Switzerland</span>
          <span class="jurisdiction-chip">UAE</span>
          <span class="jurisdiction-chip jurisdiction-chip--more">+ 32 more</span>
        </div>
        <p class="jurisdiction-note font-mono">Prodigy maintains registrations and active compliance obligations in each jurisdiction. Your users transact without triggering new compliance work on your side.</p>
      </div>
    </section>

    <!-- ── Sub-processor Table ───────────────────────────────────── -->
    <section class="subprocessor-section" aria-labelledby="subprocessor-h">
      <div class="section-inner">
        <p class="label eyebrow" data-reveal="fade-up">DATA</p>
        <h2 id="subprocessor-h" class="section-headline" data-reveal="fade-up">DATA SUB-PROCESSORS</h2>
        <div class="subprocessor-wrap" data-reveal="fade-up">
          <table class="subprocessor-table" aria-label="Data sub-processors">
            <thead>
              <tr>
                <th class="sp-th">Sub-processor</th>
                <th class="sp-th">Service</th>
                <th class="sp-th">Data Region</th>
                <th class="sp-th">Certification</th>
              </tr>
            </thead>
            <tbody>
              <tr class="sp-row">
                <td class="sp-td sp-td--name">Stripe</td>
                <td class="sp-td">Payment processing</td>
                <td class="sp-td">EU-West</td>
                <td class="sp-td sp-td--cert">PCI DSS L1</td>
              </tr>
              <tr class="sp-row">
                <td class="sp-td sp-td--name">Amazon Web Services</td>
                <td class="sp-td">Cloud infrastructure</td>
                <td class="sp-td">EU-West-1</td>
                <td class="sp-td sp-td--cert">ISO 27001</td>
              </tr>
              <tr class="sp-row">
                <td class="sp-td sp-td--name">Onfido</td>
                <td class="sp-td">Identity verification</td>
                <td class="sp-td">EU</td>
                <td class="sp-td sp-td--cert">SOC 2 Type II</td>
              </tr>
              <tr class="sp-row">
                <td class="sp-td sp-td--name">Chainalysis</td>
                <td class="sp-td">Blockchain analytics</td>
                <td class="sp-td">US-East</td>
                <td class="sp-td sp-td--cert">SOC 2 Type II</td>
              </tr>
              <tr class="sp-row">
                <td class="sp-td sp-td--name">Cloudflare</td>
                <td class="sp-td">CDN &amp; DDoS protection</td>
                <td class="sp-td">Global</td>
                <td class="sp-td sp-td--cert">ISO 27001</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ── World Map ─────────────────────────────────────────────── -->
    <section class="worldmap-section" aria-labelledby="worldmap-h" data-reveal="fade-up">
      <div class="section-inner">
        <p class="label eyebrow">GEOGRAPHIC COVERAGE</p>
        <h2 id="worldmap-h" class="section-headline">OPERATING IN 50+ COUNTRIES.</h2>
        <p class="section-intro">Live operations across the EU, UK, and North America. Country clusters activate as our network grows.</p>
        <div class="worldmap-wrap" role="img" aria-label="Dot map showing coverage across Europe and North America">
          <svg class="worldmap-svg" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <!-- EU cluster -->
            <circle cx="102" cy="42" r="3.5" class="map-dot map-dot--eu" /><circle cx="110" cy="38" r="2.5" class="map-dot map-dot--eu" /><circle cx="106" cy="50" r="2" class="map-dot map-dot--eu" /><circle cx="98" cy="48" r="2" class="map-dot map-dot--eu" /><circle cx="114" cy="46" r="2.5" class="map-dot map-dot--eu" /><circle cx="118" cy="38" r="2" class="map-dot map-dot--eu" /><circle cx="108" cy="55" r="2" class="map-dot map-dot--eu" /><circle cx="95" cy="54" r="2" class="map-dot map-dot--eu" />
            <!-- UK cluster -->
            <circle cx="90" cy="36" r="3" class="map-dot map-dot--uk" /><circle cx="86" cy="32" r="2" class="map-dot map-dot--uk" /><circle cx="94" cy="30" r="2" class="map-dot map-dot--uk" />
            <!-- US cluster -->
            <circle cx="42" cy="44" r="3.5" class="map-dot map-dot--us" /><circle cx="52" cy="40" r="2.5" class="map-dot map-dot--us" /><circle cx="34" cy="48" r="2" class="map-dot map-dot--us" /><circle cx="48" cy="54" r="2" class="map-dot map-dot--us" /><circle cx="58" cy="50" r="2.5" class="map-dot map-dot--us" /><circle cx="30" cy="40" r="2" class="map-dot map-dot--us" />
            <!-- Labels -->
            <text x="102" y="70" class="map-label">EU</text>
            <text x="86" y="26" class="map-label">UK</text>
            <text x="36" y="66" class="map-label">US</text>
          </svg>
        </div>
        <p class="worldmap-note font-mono">Coverage includes EU regulatory framework (AMLD5/6), FCA registration (UK), and US state-by-state MSB licences. New jurisdictions onboard quarterly.</p>
      </div>
    </section>

    <!-- ── Incident SLA ───────────────────────────────────────────── -->
    <section class="sla-section" aria-labelledby="sla-h">
      <div class="section-inner">
        <p class="label eyebrow" data-reveal="fade-up">SLA</p>
        <h2 id="sla-h" class="section-headline" data-reveal="fade-up">SERVICE LEVEL COMMITMENTS</h2>
        <div class="sla-list" data-reveal="fade-up">
          <div class="sla-row">
            <span class="sla-label font-mono">UPTIME GUARANTEE</span>
            <span class="sla-value">99.99% <span class="sla-note">(contractual on Enterprise)</span></span>
          </div>
          <div class="sla-row">
            <span class="sla-label font-mono">P1 INCIDENT RESPONSE</span>
            <span class="sla-value sla-value--green">&lt; 15 minutes</span>
          </div>
          <div class="sla-row">
            <span class="sla-label font-mono">P2 INCIDENT RESPONSE</span>
            <span class="sla-value sla-value--green">&lt; 2 hours</span>
          </div>
          <div class="sla-row">
            <span class="sla-label font-mono">P3 INCIDENT RESPONSE</span>
            <span class="sla-value">&lt; 24 hours</span>
          </div>
          <div class="sla-row">
            <span class="sla-label font-mono">TRAILING 12-MONTH INCIDENTS</span>
            <span class="sla-value sla-value--green">0 <span class="sla-note">(demo data)</span></span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CTA ──────────────────────────────────────────────────── -->
    <section class="cta-dark" aria-labelledby="cta-h">
      <div class="cta-iris-bar iris-stripe" aria-hidden="true" />
      <div class="section-inner cta-inner">
        <div class="cta-content">
          <p class="label" style="color:rgba(255,255,255,0.65)">Open the demo</p>
          <h2 id="cta-h" class="cta-headline">SEE THE AUDIT TRAIL LIVE.</h2>
          <p class="cta-micro">Every log entry. Every KYC event. Every risk score. All visible in the admin console.</p>
        </div>
        <div class="cta-actions">
          <a href="http://localhost:5001" target="_blank" rel="noopener noreferrer" class="cta-btn cta-btn--primary">Open consumer demo →</a>
          <a href="http://localhost:5002" target="_blank" rel="noopener noreferrer" class="cta-btn cta-btn--secondary">Admin console →</a>
          <RouterLink to="/swiss/developers" class="cta-btn cta-btn--secondary">Integration docs</RouterLink>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { animate, stagger } from 'animejs'
import { useClipReveal, useGradientSweep } from '@/composables/useSplitReveal'

// ── WOW Animations ───────────────────────────────────────────────
const heroH = ref<HTMLElement | null>(null)
const heroSubEl = ref<HTMLElement | null>(null)
const kycH = ref<HTMLElement | null>(null)
const jurisdictionH = ref<HTMLElement | null>(null)

useClipReveal(heroH, { direction: 'up', duration: 1.0, delay: 0.2 })
useClipReveal(heroSubEl, { direction: 'up', duration: 1.0, delay: 0.5 })
useClipReveal(kycH, { direction: 'up', duration: 0.85 })
useGradientSweep(jurisdictionH, { color: '#34d399', duration: 1000 })

onMounted(() => {
  const el = document.querySelector('.kyc-flow-vis')
  if (!el) return
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate('.kyc-flow-vis .kf-line', {
          scaleX: [0, 1],
          transformOrigin: 'left center',
          duration: 800,
          delay: stagger(300),
          ease: 'inOutSine',
        })
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.3 })
  observer.observe(el)
})

const kycSteps = [
  {
    title: 'Document Scan',
    detail: 'The user photographs their government-issued ID using the device camera. The document is OCR-parsed and cross-referenced against the issuing authority\'s format database. Expired documents are rejected at this stage. The image is never stored on the client device.',
    duration: '~18 seconds',
    logged: 'Document type + result logged',
  },
  {
    title: 'Liveness Check',
    detail: 'A passive liveness detection step confirms the user is physically present and not submitting a photograph of a photograph. The model runs entirely in-browser via WebAssembly. No video is transmitted to our servers — only a signed liveness token.',
    duration: '~12 seconds',
    logged: 'Liveness score logged',
  },
  {
    title: 'Sanctions Screening',
    detail: 'The parsed name, date of birth, and nationality are submitted against four sanctions lists (OFAC, UN, EU, HMT) and one PEP database. Results are returned in real time. Matches enter the manual review queue. Non-matches proceed to settlement immediately.',
    duration: '~17 seconds',
    logged: 'Screening result + list versions logged',
  },
]

const auditRows = [
  { field: 'transaction_id', desc: 'Unique UUID generated at widget initialisation', ret: '7 years' },
  { field: 'timestamp_utc', desc: 'ISO 8601 timestamp at each state transition', ret: '7 years' },
  { field: 'amount_eur', desc: 'Fiat amount at initiation and at settlement', ret: '7 years' },
  { field: 'kyc_status', desc: 'Pass / Fail / Manual review, with reason code', ret: '5 years' },
  { field: 'risk_score', desc: 'Composite score from 12 risk checks (0–100)', ret: '5 years' },
  { field: 'partner_id', desc: 'Identifier of the embedding partner', ret: '7 years' },
  { field: 'fee_breakdown', desc: 'Platform fee, partner share, network fee — itemised', ret: '7 years' },
  { field: 'outcome', desc: 'Settled / Rejected / Refunded', ret: '7 years' },
]

const dataItems = [
  { label: 'What we collect', value: 'Name, DOB, nationality, document number, liveness token', detail: 'Required for KYC compliance under AMLD5 and local equivalents.' },
  { label: 'Why we collect it', value: 'AML & KYC obligations', detail: 'We are legally required to verify identity before processing crypto transactions above threshold.' },
  { label: 'How long we keep it', value: '5 years post-last transaction', detail: 'AML retention requirement in most jurisdictions. Shorter periods may apply on request where permitted.' },
  { label: 'Who can see it', value: 'KYC team, admin users, regulators on request', detail: 'Partners never see raw KYC data — only pass/fail status. No third-party marketing access.' },
  { label: 'Data location', value: 'EU-hosted infrastructure (Frankfurt)', detail: 'All personal data remains within the European Economic Area. No US data transfers without SCCs.' },
  { label: 'Your rights', value: 'Access, rectification, erasure (where permitted)', detail: 'Submit requests via the admin console. AML retention obligations may limit erasure.' },
]

const riskChecks = [
  'Counterparty wallet screening',
  'Sanctions list cross-reference',
  'Velocity monitoring (24h)',
  'Velocity monitoring (7-day)',
  'Unusual amount pattern detection',
  'Geographic risk scoring',
  'PEP database check',
  'Structuring pattern analysis',
  'First-transaction risk flag',
  'Blacklisted wallet detection',
  'Device fingerprint consistency',
  'KYC document re-verification (30-day expiry)',
]
</script>

<style scoped>
.section-inner { max-width: 1440px; margin: 0 auto; padding: 5rem 1.5rem; }

.hero { border-bottom: 1px solid var(--ink); }
.hero-inner { display: flex; flex-direction: column; gap: 2rem; padding-top: 6rem; padding-bottom: 6rem; }
.hero-headline { display: flex; flex-direction: column; margin: 0; }
.line {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(4rem, 10vw, 8.5rem);
  font-weight: 900; line-height: 0.92;
  letter-spacing: -0.02em; text-transform: uppercase;
}
.hero-sub { font-size: 1.125rem; line-height: 1.6; color: var(--ink-mid); max-width: 48ch; margin: 0; }

.section-header { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2.5rem; }
.section-headline {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 900; line-height: 1; letter-spacing: -0.02em; text-transform: uppercase; margin: 0;
}
.section-intro { font-size: 1rem; line-height: 1.7; color: var(--ink-mid); max-width: 60ch; margin: 0 0 2.5rem; }

/* KYC */
.kyc-section { border-bottom: 1px solid var(--ink); background: #fafafa; }
.kyc-steps { list-style: none; margin: 0; padding: 0; }
.kyc-step {
  display: grid; grid-template-columns: 4rem 1fr; gap: 2rem;
  padding: 2rem 0; border-top: 1px solid var(--line); align-items: start;
}
.kyc-step:last-child { border-bottom: 1px solid var(--line); }
.step-num { font-family: 'Space Mono', monospace; font-size: 0.8125rem; color: var(--ink-muted); padding-top: 0.25rem; }
.step-title {
  font-family: 'Barlow Condensed', sans-serif; font-size: 1.5rem;
  font-weight: 700; text-transform: uppercase; letter-spacing: -0.01em; margin: 0 0 0.75rem;
}
.step-detail { font-family: 'Space Mono', monospace; font-size: 0.8125rem; line-height: 1.7; color: var(--ink-mid); margin: 0 0 1rem; max-width: 56ch; }
.step-meta { display: flex; gap: 0.75rem; flex-wrap: wrap; }
.meta-chip {
  font-family: 'Space Mono', monospace; font-size: 0.75rem; letter-spacing: 0.06em;
  border: 1px solid var(--line); padding: 0.2rem 0.625rem; color: var(--ink-mid);
}

/* Audit */
.audit-section { border-bottom: 1px solid var(--ink); }
.audit-table { border: 1px solid var(--line); margin-bottom: 1.5rem; }
.audit-head {
  display: grid; grid-template-columns: 14rem 1fr 8rem;
  background: var(--ink); color: var(--paper);
  font-family: 'Space Mono', monospace; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;
  padding: 0.75rem 1rem; gap: 1rem;
}
.audit-row {
  display: grid; grid-template-columns: 14rem 1fr 8rem;
  padding: 0.75rem 1rem; gap: 1rem; border-top: 1px solid var(--line);
  font-family: 'Space Mono', monospace; font-size: 0.8125rem;
  transition: background 0.15s;
}
.audit-row:hover { background: #f5f5f5; }
.audit-field { color: var(--ink); font-weight: 700; font-size: 0.75rem; }
.audit-desc { color: var(--ink-mid); line-height: 1.5; }
.audit-ret { color: var(--ink-muted); font-size: 0.75rem; }
.audit-note { font-size: 0.75rem; color: var(--ink-muted); margin: 0; letter-spacing: 0.04em; border-left: 2px solid var(--ink); padding-left: 1rem; }

/* Data */
.data-section { border-bottom: 1px solid var(--ink); background: #fafafa; }
.data-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border: 1px solid var(--line); margin-bottom: 2rem; }
.data-card {
  padding: 1.5rem; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line);
  display: flex; flex-direction: column; gap: 0.5rem;
}
.data-card:nth-child(3n) { border-right: none; }
.data-card:nth-last-child(-n+3) { border-bottom: none; }
.data-label { font-family: 'Space Mono', monospace; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-muted); margin: 0; }
.data-value { font-family: 'Barlow Condensed', sans-serif; font-size: 1rem; font-weight: 700; text-transform: uppercase; margin: 0; color: var(--ink); }
.data-detail { font-family: 'Space Mono', monospace; font-size: 0.75rem; line-height: 1.6; color: var(--ink-mid); margin: 0; }
.gdpr-note { font-family: 'Space Mono', monospace; font-size: 0.75rem; line-height: 1.7; color: var(--ink-mid); max-width: 60ch; border-left: 2px solid var(--line); padding-left: 1rem; }

/* Risk */
.risk-section { border-bottom: 1px solid var(--ink); }
.risk-grid { list-style: none; margin: 0 0 2rem; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border: 1px solid var(--line); }
.risk-chip {
  display: flex; align-items: flex-start; gap: 0.75rem;
  font-family: 'Space Mono', monospace; font-size: 0.8125rem; line-height: 1.5;
  padding: 1rem 1.25rem; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line);
}
.risk-chip:nth-child(3n) { border-right: none; }
.risk-chip:nth-last-child(-n+3) { border-bottom: none; }
.risk-bullet { color: var(--ink-muted); flex-shrink: 0; font-size: 0.75rem; margin-top: 2px; }
.risk-footer { display: flex; justify-content: space-between; align-items: center; font-family: 'Space Mono', monospace; font-size: 0.8125rem; color: var(--ink-mid); flex-wrap: wrap; gap: 1rem; }
.risk-stat { color: var(--ink-muted); font-size: 0.75rem; }
.inline-link { color: var(--ink); font-weight: 700; }

/* CTA */
.cta-dark { background: var(--ink); color: var(--paper); position: relative; }
.cta-iris-bar { height: 4px; background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe, #667eea); background-size: 200% auto; animation: iris-shift 5s linear infinite; will-change: background-position; }
@keyframes iris-shift { 0% { background-position: 0% center; } 100% { background-position: -200% center; } }
.cta-inner { display: grid; grid-template-columns: 2fr 1fr; gap: 4rem; align-items: center; }
.cta-content { display: flex; flex-direction: column; gap: 1.25rem; }
.cta-headline { font-family: 'Barlow Condensed', sans-serif; font-size: clamp(2.5rem, 5vw, 4.5rem); font-weight: 900; line-height: 0.95; letter-spacing: -0.02em; text-transform: uppercase; margin: 0; }
.cta-micro { font-family: 'Space Mono', monospace; font-size: 0.75rem; letter-spacing: 0.06em; color: rgba(255,255,255,0.7); margin: 0; }
.cta-actions { display: flex; flex-direction: column; gap: 0.875rem; }
.cta-btn { display: block; font-family: 'Space Mono', monospace; font-size: 0.8125rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none; padding: 0.875rem 1.5rem; text-align: center; border: 1.5px solid var(--paper); transition: background 0.15s, color 0.15s; }
.cta-btn--primary { background: var(--paper); color: var(--ink); }
.cta-btn--primary:hover { background: transparent; color: var(--paper); }
.cta-btn--secondary { background: transparent; color: rgba(255,255,255,0.85); border-color: rgba(255,255,255,0.4); }
.cta-btn--secondary:hover { border-color: var(--paper); color: var(--paper); }

/* KYC flow visualisation */
.kyc-flow-vis {
  display: flex; align-items: center; gap: 0;
  margin-top: 2.5rem; flex-wrap: wrap; gap: 0;
}
.kf-step {
  display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
}
.kf-icon {
  font-family: 'Space Mono', monospace; font-size: 1.5rem;
  color: #34d399; line-height: 1;
  animation: kf-pop 0.4s ease forwards;
  opacity: 0;
}
.kf-step:nth-child(1) .kf-icon { animation-delay: 0.3s; }
.kf-step:nth-child(3) .kf-icon { animation-delay: 0.9s; }
.kf-step:nth-child(5) .kf-icon { animation-delay: 1.5s; }
.kf-label {
  font-family: 'Space Mono', monospace; font-size: 0.625rem;
  letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-mid);
}
.kf-connector { display: flex; align-items: center; padding: 0 0.75rem; flex: 0 0 auto; }
.kf-line {
  height: 1px; width: 0; background: #34d399;
  animation: kf-grow 0.4s ease forwards 0.6s;
  min-width: 4rem;
}
.kf-line--2 { animation-delay: 1.2s; }
@keyframes kf-pop { from { opacity: 0; transform: scale(0.6); } to { opacity: 1; transform: scale(1); } }
@keyframes kf-grow { from { width: 0; } to { width: 4rem; } }

/* Utilities */
.font-mono { font-family: 'Space Mono', monospace; }
.label { font-family: 'Space Mono', monospace; font-size: 0.8125rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--ink-mid); }
.eyebrow { margin: 0; }
.iris-text { background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe, #667eea); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: iris-shift 5s linear infinite; }
.iris-stripe { animation: iris-shift 5s linear infinite; }

@media (max-width: 900px) {
  .audit-head, .audit-row { grid-template-columns: 10rem 1fr; }
  .audit-head span:last-child, .audit-row span:last-child { display: none; }
  .data-grid { grid-template-columns: repeat(2, 1fr); }
  .data-card:nth-child(3n) { border-right: 1px solid var(--line); }
  .data-card:nth-child(2n) { border-right: none; }
  .data-card:nth-last-child(-n+3) { border-bottom: 1px solid var(--line); }
  .data-card:nth-last-child(-n+2) { border-bottom: none; }
  .risk-grid { grid-template-columns: repeat(2, 1fr); }
  .risk-chip:nth-child(3n) { border-right: 1px solid var(--line); }
  .risk-chip:nth-child(2n) { border-right: none; }
  .risk-chip:nth-last-child(-n+3) { border-bottom: 1px solid var(--line); }
  .risk-chip:nth-last-child(-n+2) { border-bottom: none; }
  .cta-inner { grid-template-columns: 1fr; gap: 2.5rem; }
  .kyc-step { grid-template-columns: 3rem 1fr; gap: 1rem; }
}

@media (max-width: 600px) {
  .data-grid, .risk-grid { grid-template-columns: 1fr; }
  .data-card, .risk-chip { border-right: none; border-bottom: 1px solid var(--line); }
  .data-card:last-child, .risk-chip:last-child { border-bottom: none; }
}

@media (prefers-reduced-motion: reduce) {
  .cta-iris-bar, .iris-text { animation: none; }
  .kf-icon { animation: none; opacity: 1; }
  .kf-line { animation: none; width: 4rem; }
}

/* ── New: Jurisdiction ── */
.jurisdiction-section { border-bottom: 1px solid var(--ink); background: var(--paper); }
.jurisdiction-grid {
  display: flex; flex-wrap: wrap; gap: 0.625rem;
  margin: 2rem 0;
}
.jurisdiction-chip {
  font-family: 'Space Mono', monospace; font-size: 0.75rem;
  letter-spacing: 0.08em; text-transform: uppercase;
  border: 1px solid #e5e7eb; padding: 0.375rem 0.875rem;
  color: var(--ink); background: #fafafa;
}
.jurisdiction-chip--more {
  background: #0a0a0a; color: #34d399;
  border-color: #0a0a0a;
}
.jurisdiction-note {
  font-size: 0.8125rem; line-height: 1.7; color: var(--ink-mid);
  max-width: 60ch; margin: 0;
  border-left: 2px solid var(--line); padding-left: 1rem;
}

/* ── New: Sub-processor Table ── */
.subprocessor-section { border-bottom: 1px solid var(--ink); background: #fafafa; }
.subprocessor-wrap { overflow-x: auto; margin-top: 2.5rem; }
.subprocessor-table { width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb; }
.sp-th {
  font-family: 'Space Mono', monospace; font-size: 0.75rem;
  letter-spacing: 0.1em; text-transform: uppercase;
  padding: 0.875rem 1.25rem; text-align: left;
  border: 1px solid #e5e7eb; background: #0a0a0a; color: #fff;
}
.sp-row { border: 1px solid #e5e7eb; }
.sp-row:hover { background: #f5f5f5; }
.sp-td {
  padding: 0.875rem 1.25rem; border: 1px solid #e5e7eb;
  font-family: 'Space Mono', monospace; font-size: 0.8125rem; line-height: 1.5;
  color: var(--ink-mid);
}
.sp-td--name {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1rem; font-weight: 700; text-transform: uppercase;
  color: var(--ink);
}
.sp-td--cert { color: #34d399; font-weight: 700; }

/* ── New: SLA ── */
.sla-section { border-bottom: 1px solid var(--ink); background: var(--paper); }
.sla-list {
  margin-top: 2.5rem;
  border: 1px solid #e5e7eb; display: flex; flex-direction: column;
}
.sla-row {
  display: flex; justify-content: space-between; align-items: baseline;
  gap: 2rem; flex-wrap: wrap;
  padding: 1rem 1.5rem; border-bottom: 1px solid #e5e7eb;
}
.sla-row:last-child { border-bottom: none; }
.sla-label {
  font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--ink-muted); flex-shrink: 0;
}
.sla-value {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.375rem; font-weight: 900; color: var(--ink);
}
.sla-value--green { color: #34d399; }
.sla-note {
  font-family: 'Space Mono', monospace; font-size: 0.75rem;
  color: var(--ink-muted); font-weight: 400;
}

@media (max-width: 700px) {
  .subprocessor-table { font-size: 0.75rem; }
  .sp-th, .sp-td { padding: 0.625rem 0.75rem; }
}

/* ── World Map Section ── */
.worldmap-section { border-bottom: 1px solid var(--ink); background: #0a0a0a; }
.worldmap-section .section-headline { color: #fff; }
.worldmap-section .label { color: rgba(255,255,255,0.5); }
.worldmap-section .section-intro { color: rgba(255,255,255,0.6); }
.worldmap-wrap { display: flex; justify-content: center; padding: 2rem 0; }
.worldmap-svg {
  width: clamp(260px, 60vw, 560px);
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 4px;
  padding: 1.5rem;
  box-sizing: border-box;
}
.map-dot { fill: rgba(52,211,153,0.2); }
.map-dot--eu { animation: dot-light-eu 6s ease-in-out infinite; }
.map-dot--uk { animation: dot-light-uk 6s ease-in-out infinite 1.5s; }
.map-dot--us { animation: dot-light-us 6s ease-in-out infinite 3s; }
@keyframes dot-light-eu {
  0%, 60%, 100% { fill: rgba(52,211,153,0.15); }
  10%, 30% { fill: #34d399; filter: drop-shadow(0 0 4px #34d399); transform: scale(1.3); }
}
@keyframes dot-light-uk {
  0%, 60%, 100% { fill: rgba(52,211,153,0.15); }
  10%, 30% { fill: #34d399; filter: drop-shadow(0 0 4px #34d399); transform: scale(1.3); }
}
@keyframes dot-light-us {
  0%, 60%, 100% { fill: rgba(52,211,153,0.15); }
  10%, 30% { fill: #34d399; filter: drop-shadow(0 0 4px #34d399); transform: scale(1.3); }
}
.map-label {
  font-family: 'Space Mono', monospace;
  font-size: 6px; fill: rgba(255,255,255,0.4);
  letter-spacing: 0.08em; text-anchor: middle;
}
.worldmap-note {
  font-size: 0.75rem; line-height: 1.7; color: rgba(255,255,255,0.5);
  max-width: 60ch; border-left: 2px solid rgba(52,211,153,0.5); padding-left: 1rem; margin: 0;
}

/* ── Shield SVG ── */
.shield-section { border-bottom: 1px solid var(--ink); background: #0a0a0a; }
.shield-inner { display: grid; grid-template-columns: 1fr auto; gap: 4rem; align-items: center; }
.shield-inner .section-headline { color: #fff; }
.shield-inner .section-intro { color: rgba(255,255,255,0.65); margin: 0; }
.shield-inner .eyebrow { color: rgba(255,255,255,0.5); }
.shield-vis { display: flex; justify-content: center; align-items: center; }
.shield-outer { animation: shield-outer-anim 4s ease-in-out infinite; }
.shield-mid { animation: shield-mid-anim 3s ease-in-out 0.5s infinite; }
.shield-inner-path { animation: shield-inner-anim 2.5s ease-in-out 1s infinite; }
@keyframes shield-outer-anim { 0%,100%{opacity:0.3} 50%{opacity:0.7} }
@keyframes shield-mid-anim { 0%,100%{opacity:0.5} 50%{opacity:0.9} }
@keyframes shield-inner-anim { 0%,100%{opacity:0.7} 50%{opacity:1} }
@media (max-width: 700px) {
  .shield-inner { grid-template-columns: 1fr; }
  .shield-vis { padding-top: 1.5rem; }
}

@media (prefers-reduced-motion: reduce) {
  .map-dot--eu, .map-dot--uk, .map-dot--us { animation: none; fill: rgba(52,211,153,0.6); }
  .shield-outer, .shield-mid, .shield-inner-path { animation: none; opacity: 1; }
}
</style>
