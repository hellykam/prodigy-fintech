<template>
  <main class="saas-page">

    <!-- ── Hero ─────────────────────────────────────────────────── -->
    <section class="hero" aria-labelledby="sec-headline">
      <div class="section-inner hero-inner">
        <div class="eyebrow-badge">Compliance &amp; Security</div>
        <h1 id="sec-headline" class="hero-h1">The Security Page. <span class="accent">Yes, We Have One.</span></h1>
        <p class="hero-sub">Most crypto infrastructure hides its security posture behind NDAs and marketing language. We put ours on a page.</p>
        <div class="hero-actions">
          <a href="http://localhost:5002" target="_blank" rel="noopener noreferrer" class="btn-primary">View Admin Console →</a>
          <RouterLink to="/saas/developers" class="btn-ghost">Integration Docs</RouterLink>
        </div>
      </div>
    </section>

    <!-- ── Shield Illustration ──────────────────────────────────── -->
    <section class="shield-section" aria-labelledby="saas-shield-h" data-reveal="fade-up">
      <div class="section-inner shield-inner">
        <div class="shield-copy">
          <div class="section-eyebrow">Our Approach</div>
          <h2 id="saas-shield-h" class="section-h2">Layered defence, <span class="accent">at every level.</span></h2>
          <p class="section-sub" style="margin:0;">Three concentric security layers: infrastructure, compliance, and transaction-level controls. Each monitors the others.</p>
        </div>
        <div class="shield-vis" aria-hidden="true">
          <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg"
               width="220" height="257" preserveAspectRatio="xMidYMid meet"
               aria-hidden="true" role="img" class="shield-svg">
            <path class="shield-outer" d="M60,8 L108,28 L108,72 C108,100 60,128 60,128 C60,128 12,100 12,72 L12,28 Z"
                  fill="rgba(99,102,241,0.04)" stroke="#6366f1" stroke-width="1.5" />
            <path class="shield-mid" d="M60,19.8 L97.8,36.8 L97.8,73.2 C97.8,97.5 60,121.7 60,121.7 C60,121.7 22.2,97.5 22.2,73.2 L22.2,36.8 Z"
                  fill="rgba(99,102,241,0.07)" stroke="#6366f1" stroke-width="1.5" />
            <path class="shield-inner-path" d="M60,31.6 L87.6,45.6 L87.6,74.4 C87.6,94.8 60,115.4 60,115.4 C60,115.4 32.4,94.8 32.4,74.4 L32.4,45.6 Z"
                  fill="rgba(99,102,241,0.12)" stroke="#6366f1" stroke-width="1.5" />
            <text x="60" y="84" text-anchor="middle" font-size="22" fill="#6366f1">🔒</text>
          </svg>
        </div>
      </div>
    </section>

    <!-- ── KYC Architecture ──────────────────────────────────────── -->
    <section class="section" aria-labelledby="kyc-h">
      <div class="section-inner">
        <div class="section-eyebrow">KYC Architecture</div>
        <h2 id="kyc-h" class="section-h2">Identity Verification in <span class="accent">Three Steps</span></h2>
        <p class="section-sub">Every first-time user passes through the same flow inside the widget. 47 seconds average. Nothing deferred. Nothing optional.</p>
        <div class="steps-grid" data-animate-stagger>
          <div v-for="(step, i) in kycSteps" :key="i" class="step-card">
            <div class="step-num" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</div>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-detail">{{ step.detail }}</p>
            <div class="step-chips">
              <span class="chip">{{ step.duration }}</span>
              <span class="chip chip--green">{{ step.result }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Audit Trail ──────────────────────────────────────────── -->
    <section class="section section--gray" aria-labelledby="audit-h">
      <div class="section-inner">
        <div class="section-eyebrow">Audit Trail</div>
        <h2 id="audit-h" class="section-h2">Every Transaction. <span class="accent">Fully Logged.</span></h2>
        <p class="section-sub">Your regulator will find everything they're looking for. The audit trail is immutable from the moment the widget initialises.</p>
        <div class="table-card" role="table" aria-label="Audit trail fields" data-reveal="fade-left">
          <div class="table-head" role="row">
            <span role="columnheader">Field</span>
            <span role="columnheader">Description</span>
            <span role="columnheader">Retained</span>
          </div>
          <div v-for="row in auditRows" :key="row.field" class="table-row" role="row">
            <span class="field-name" role="cell">{{ row.field }}</span>
            <span class="field-desc" role="cell">{{ row.desc }}</span>
            <span class="field-ret" role="cell">{{ row.ret }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Data Handling ─────────────────────────────────────────── -->
    <section class="section" aria-labelledby="data-h">
      <div class="section-inner">
        <div class="section-eyebrow">Data Handling</div>
        <h2 id="data-h" class="section-h2">What We Collect. <span class="accent">And Why.</span></h2>
        <div class="data-grid">
          <div v-for="item in dataItems" :key="item.label" class="data-card">
            <div class="data-icon" aria-hidden="true">◈</div>
            <p class="data-label">{{ item.label }}</p>
            <p class="data-value">{{ item.value }}</p>
            <p class="data-detail">{{ item.detail }}</p>
          </div>
        </div>
        <div class="gdpr-banner">
          <span class="gdpr-badge">GDPR</span>
          <p class="gdpr-text">EU-hosted infrastructure (Frankfurt). AML retention: 5 years post-last transaction. Data subjects may request access or erasure at any time.</p>
        </div>
      </div>
    </section>

    <!-- ── Security Layers Diagram ────────────────────────────────── -->
    <section class="section section--gray" aria-labelledby="layers-h">
      <div class="section-inner">
        <div class="section-eyebrow">Defense in Depth</div>
        <h2 id="layers-h" class="section-h2">Five Security <span class="accent">Layers.</span></h2>
        <p class="section-sub">Every request passes through every layer. Every layer is independently monitored.</p>
        <div class="sec-layers-wrap" data-reveal="fade-up">
          <svg
            class="sec-rings-svg"
            viewBox="0 0 400 400"
            width="400"
            height="400"
            aria-hidden="true"
            role="img"
          >
            <!-- Outer ring: Network -->
            <circle class="ring ring-outer" cx="200" cy="200" r="180" />
            <text class="ring-label ring-label-outer" x="200" y="32" text-anchor="middle">NETWORK · DDoS · TLS</text>
            <!-- Middle ring: Application -->
            <circle class="ring ring-mid" cx="200" cy="200" r="130" />
            <text class="ring-label ring-label-mid" x="200" y="82" text-anchor="middle">APPLICATION · Auth · Rate Limiting</text>
            <!-- Inner ring: Data -->
            <circle class="ring ring-inner" cx="200" cy="200" r="80" />
            <text class="ring-label ring-label-inner" x="200" y="132" text-anchor="middle">DATA · Encryption</text>
            <!-- Core -->
            <circle class="ring-core" cx="200" cy="200" r="44" />
            <text class="ring-core-text" x="200" y="196" text-anchor="middle" dominant-baseline="middle" dy="4">Prodigy</text>
          </svg>
        </div>
      </div>
    </section>

    <!-- ── Certifications Grid ──────────────────────────────────── -->
    <section class="section" aria-labelledby="certs-h">
      <div class="section-inner">
        <div class="section-eyebrow">Compliance Targets</div>
        <h2 id="certs-h" class="section-h2">Certifications &amp; <span class="accent">Frameworks.</span></h2>
        <p class="section-sub">Prodigy is built to meet the following compliance standards. All badges below represent Prodigy's compliance targets for production readiness.</p>
        <div class="certs-grid" role="list" aria-label="Compliance certifications" data-animate-stagger>
          <div v-for="cert in certifications" :key="cert.name" class="cert-badge" role="listitem">
            <div class="cert-icon-wrap" aria-hidden="true">{{ cert.icon }}</div>
            <span class="cert-name">{{ cert.name }}</span>
            <span class="cert-status-badge">ACTIVE (Demo)</span>
          </div>
        </div>
        <div class="cert-disclaimer" role="note">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="7" stroke="#4f46e5" stroke-width="1.5"/><path d="M8 7v4M8 5.5v.5" stroke="#4f46e5" stroke-width="1.5" stroke-linecap="round"/></svg>
          Compliance statuses reflect demo architecture. These certifications represent Prodigy's compliance targets.
        </div>
      </div>
    </section>

    <!-- ── Risk Engine ───────────────────────────────────────────── -->
    <section class="section section--gray" aria-labelledby="risk-h">
      <div class="section-inner">
        <div class="section-eyebrow">Risk Engine</div>
        <h2 id="risk-h" class="section-h2"><span class="accent">12 Automated Checks.</span> Every Transaction.</h2>
        <p class="section-sub">Under 400ms. Anything that doesn't pass automatically enters the manual review queue in the admin console. Average review time: 4.2 minutes.</p>
        <ul class="risk-grid" role="list">
          <li v-for="check in riskChecks" :key="check" class="risk-item">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8l3 3 7-7" stroke="#4f46e5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            {{ check }}
          </li>
        </ul>
        <a href="http://localhost:5002" target="_blank" rel="noopener noreferrer" class="btn-link">View manual review queue in admin console →</a>
      </div>
    </section>

    <!-- ── Sub-processor Table ────────────────────────────────── -->
    <section class="section" aria-labelledby="sub-h" data-reveal="fade-up">
      <div class="section-inner">
        <div class="section-eyebrow">Data Sub-processors</div>
        <h2 id="sub-h" class="section-h2">Data <span class="accent">sub-processors</span></h2>
        <p class="section-sub">We use a small number of carefully vetted sub-processors. All are contractually bound under GDPR Article 28.</p>
        <div class="table-card" role="table" aria-label="Data sub-processors" data-reveal="fade-up">
          <div class="sub-table-head" role="row">
            <span role="columnheader">Sub-processor</span>
            <span role="columnheader">Service</span>
            <span role="columnheader">Data Region</span>
            <span role="columnheader">Certification</span>
          </div>
          <div class="sub-table-row" role="row">
            <span class="sub-proc-name" role="cell">Stripe</span>
            <span role="cell">Payment processing</span>
            <span class="sub-region" role="cell">EU-West</span>
            <span class="sub-cert" role="cell">PCI DSS L1</span>
          </div>
          <div class="sub-table-row" role="row">
            <span class="sub-proc-name" role="cell">Amazon Web Services</span>
            <span role="cell">Cloud infrastructure</span>
            <span class="sub-region" role="cell">EU-West-1</span>
            <span class="sub-cert" role="cell">ISO 27001</span>
          </div>
          <div class="sub-table-row" role="row">
            <span class="sub-proc-name" role="cell">Onfido</span>
            <span role="cell">Identity verification</span>
            <span class="sub-region" role="cell">EU</span>
            <span class="sub-cert" role="cell">SOC 2 Type II</span>
          </div>
          <div class="sub-table-row" role="row">
            <span class="sub-proc-name" role="cell">Chainalysis</span>
            <span role="cell">Blockchain analytics</span>
            <span class="sub-region" role="cell">US-East</span>
            <span class="sub-cert" role="cell">SOC 2 Type II</span>
          </div>
          <div class="sub-table-row" role="row">
            <span class="sub-proc-name" role="cell">Cloudflare</span>
            <span role="cell">CDN &amp; DDoS</span>
            <span class="sub-region" role="cell">Global</span>
            <span class="sub-cert" role="cell">ISO 27001</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Security FAQ ────────────────────────────────────────── -->
    <section class="section section--gray" aria-labelledby="secfaq-h">
      <div class="section-inner">
        <div class="section-eyebrow">Security FAQ</div>
        <h2 id="secfaq-h" class="section-h2">Common <span class="accent">security questions</span></h2>
        <div class="sec-faq-list" data-animate-stagger>
          <details class="sec-faq-item">
            <summary class="sec-faq-q">Where is data stored?</summary>
            <p class="sec-faq-a">EU-West primary (Frankfurt). Enterprise customers can request custom data residency to meet local regulatory requirements.</p>
          </details>
          <details class="sec-faq-item">
            <summary class="sec-faq-q">Are card numbers stored?</summary>
            <p class="sec-faq-a">No. PCI DSS tokenization is enforced throughout; raw PANs are never stored on Prodigy infrastructure. All payment data is tokenized at the point of capture.</p>
          </details>
          <details class="sec-faq-item">
            <summary class="sec-faq-q">Can I bring my own KYC provider?</summary>
            <p class="sec-faq-a">Enterprise plan: yes. Full BYO identity provider support via the API. Prodigy's KYC engine can be bypassed in favour of your own verified identity tokens.</p>
          </details>
          <details class="sec-faq-item">
            <summary class="sec-faq-q">Is there a bug bounty programme?</summary>
            <p class="sec-faq-a">Yes. We operate a responsible disclosure programme. Report vulnerabilities to security.prodigy.example. Triaged within 72 hours.</p>
          </details>
        </div>
      </div>
    </section>

    <!-- ── CTA ──────────────────────────────────────────────────── -->
    <section class="cta-section" aria-labelledby="cta-h">
      <div class="section-inner cta-inner">
        <div class="cta-content">
          <div class="section-eyebrow">Open the demo</div>
          <h2 id="cta-h" class="cta-h2">See the Audit Trail <span class="accent">Live.</span></h2>
          <p class="cta-sub">Every log entry. Every KYC event. Every risk score. All visible in the admin console right now.</p>
        </div>
        <div class="cta-actions">
          <a href="http://localhost:5001" target="_blank" rel="noopener noreferrer" class="btn-primary">Open Demo →</a>
          <a href="http://localhost:5002" target="_blank" rel="noopener noreferrer" class="btn-secondary">Admin Console</a>
          <RouterLink to="/saas/developers" class="btn-ghost-sm">Integration Docs →</RouterLink>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
const kycSteps = [
  {
    title: 'Document Scan',
    detail: 'Government-issued ID captured via device camera. OCR-parsed and cross-referenced against issuing authority format database. Expired documents rejected instantly. No image stored on client device.',
    duration: '~18 seconds',
    result: 'Document type + result logged',
  },
  {
    title: 'Liveness Check',
    detail: 'Passive liveness detection confirms the user is physically present. Runs in-browser via WebAssembly. No video transmitted — only a signed liveness token. Cannot be spoofed with a photograph.',
    duration: '~12 seconds',
    result: 'Liveness score logged',
  },
  {
    title: 'Sanctions Screening',
    detail: 'Name, DOB, and nationality cross-referenced against OFAC, UN, EU, HMT sanctions lists and one PEP database. Results real-time. Matches enter manual review. Non-matches proceed to settlement immediately.',
    duration: '~17 seconds',
    result: 'Screening result + list versions logged',
  },
]

const auditRows = [
  { field: 'transaction_id', desc: 'Unique UUID at widget initialisation', ret: '7 years' },
  { field: 'timestamp_utc', desc: 'ISO 8601 at each state transition', ret: '7 years' },
  { field: 'amount_eur', desc: 'Fiat amount at initiation and settlement', ret: '7 years' },
  { field: 'kyc_status', desc: 'Pass / Fail / Manual review with reason code', ret: '5 years' },
  { field: 'risk_score', desc: 'Composite score from 12 checks (0–100)', ret: '5 years' },
  { field: 'partner_id', desc: 'Identifier of the embedding partner', ret: '7 years' },
  { field: 'fee_breakdown', desc: 'Platform fee, partner share, network fee — itemised', ret: '7 years' },
  { field: 'outcome', desc: 'Settled / Rejected / Refunded', ret: '7 years' },
]

const dataItems = [
  { label: 'What we collect', value: 'Name, DOB, nationality, document number, liveness token', detail: 'Required for KYC compliance under AMLD5 and local equivalents.' },
  { label: 'Retention period', value: '5 years post-last transaction', detail: 'AML requirement. Shorter periods where legally permitted on request.' },
  { label: 'Data location', value: 'EU-hosted (Frankfurt)', detail: 'All personal data within EEA. No US transfers without SCCs.' },
  { label: 'Who sees it', value: 'KYC team, admin users, regulators on request', detail: 'Partners see pass/fail only. No marketing access ever.' },
]

const certifications = [
  { name: 'MiCA', icon: '🇪🇺' },
  { name: 'FCA Regulated', icon: '🇬🇧' },
  { name: 'PCI DSS Level 1', icon: '💳' },
  { name: 'ISO 27001', icon: '🔒' },
  { name: 'SOC 2 Type II', icon: '☁️' },
  { name: 'GDPR', icon: '🛡️' },
]

const riskChecks = [
  'Counterparty wallet screening', 'Sanctions list cross-reference',
  'Velocity monitoring (24h)', 'Velocity monitoring (7-day)',
  'Unusual amount pattern detection', 'Geographic risk scoring',
  'PEP database check', 'Structuring pattern analysis',
  'First-transaction risk flag', 'Blacklisted wallet detection',
  'Device fingerprint consistency', 'KYC document re-verification (30-day expiry)',
]
</script>

<style scoped>
.saas-page { background: #fff; color: #0f0f23; }
.section-inner { max-width: 1200px; margin: 0 auto; padding: 5rem 2rem; }

.hero { background: linear-gradient(135deg, #f8f7ff 0%, #ede9fe 50%, #fdf4ff 100%); border-bottom: 1px solid #e2e0f0; }
.hero-inner { display: flex; flex-direction: column; gap: 1.5rem; padding-top: 6rem; padding-bottom: 6rem; max-width: 680px; }
.eyebrow-badge { display: inline-flex; align-items: center; gap: 0.5rem; font-family: 'Inter', sans-serif; font-size: 0.875rem; font-weight: 500; color: #4f46e5; background: rgba(79,70,229,0.08); padding: 0.375rem 0.875rem; border-radius: 100px; width: fit-content; }
.hero-h1 { font-family: 'DM Sans', sans-serif; font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 800; line-height: 1.1; letter-spacing: -0.02em; margin: 0; color: #0f0f23; }
.hero-sub { font-family: 'Inter', sans-serif; font-size: 1.125rem; line-height: 1.7; color: #4a4a6a; max-width: 48ch; margin: 0; }
.hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
.accent { color: #4f46e5; }

.section { border-bottom: 1px solid #e2e0f0; }
.section--gray { background: #f8f7ff; }
.section-eyebrow { font-family: 'DM Sans', sans-serif; font-size: 0.875rem; font-weight: 600; color: #4f46e5; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 0.75rem; }
.section-h2 { font-family: 'DM Sans', sans-serif; font-size: clamp(1.75rem, 3.5vw, 2.75rem); font-weight: 800; line-height: 1.15; letter-spacing: -0.01em; margin: 0 0 1rem; }
.section-sub { font-family: 'Inter', sans-serif; font-size: 1rem; line-height: 1.75; color: #4a4a6a; max-width: 58ch; margin: 0 0 2.5rem; }

.steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
.step-card { background: #fff; border: 1px solid #e2e0f0; border-radius: 12px; padding: 1.75rem; display: flex; flex-direction: column; gap: 0.75rem; transition: box-shadow 0.2s, border-color 0.2s; }
.step-card:hover { border-color: #c4b5fd; box-shadow: 0 8px 24px rgba(79,70,229,0.08); }
.step-num { font-family: 'DM Sans', sans-serif; font-size: 2rem; font-weight: 800; color: rgba(79,70,229,0.15); line-height: 1; }
.step-title { font-family: 'DM Sans', sans-serif; font-size: 1.125rem; font-weight: 700; margin: 0; }
.step-detail { font-family: 'Inter', sans-serif; font-size: 0.875rem; line-height: 1.7; color: #4a4a6a; margin: 0; }
.step-chips { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: auto; }
.chip { font-family: 'Inter', sans-serif; font-size: 0.75rem; font-weight: 500; padding: 0.2rem 0.625rem; border-radius: 6px; border: 1px solid #e2e0f0; color: #4a4a6a; background: #f8f7ff; }
.chip--green { border-color: #bbf7d0; color: #166534; background: #f0fdf4; }

.table-card { background: #fff; border: 1px solid #e2e0f0; border-radius: 12px; overflow: hidden; }
.table-head { display: grid; grid-template-columns: 12rem 1fr 6rem; background: #f8f7ff; font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 0.8125rem; color: #4a4a6a; padding: 0.875rem 1.25rem; gap: 1rem; border-bottom: 1px solid #e2e0f0; }
.table-row { display: grid; grid-template-columns: 12rem 1fr 6rem; padding: 0.875rem 1.25rem; gap: 1rem; border-top: 1px solid #f0eef8; font-family: 'Inter', sans-serif; font-size: 0.875rem; align-items: start; transition: background 0.15s; }
.table-row:hover { background: #f8f7ff; }
.field-name { font-family: 'DM Sans', monospace; font-size: 0.8125rem; font-weight: 700; color: #4f46e5; word-break: break-all; }
.field-desc { color: #4a4a6a; line-height: 1.5; }
.field-ret { font-size: 0.8125rem; color: #9494b8; font-weight: 500; }

.data-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 2rem; }
.data-card { background: #fff; border: 1px solid #e2e0f0; border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; transition: box-shadow 0.2s; }
.data-card:hover { box-shadow: 0 4px 16px rgba(79,70,229,0.06); }
.data-icon { font-size: 1.25rem; color: #4f46e5; }
.data-label { font-family: 'DM Sans', sans-serif; font-size: 0.8125rem; font-weight: 600; color: #9494b8; text-transform: uppercase; letter-spacing: 0.06em; margin: 0; }
.data-value { font-family: 'DM Sans', sans-serif; font-size: 1rem; font-weight: 700; color: #0f0f23; margin: 0; }
.data-detail { font-family: 'Inter', sans-serif; font-size: 0.875rem; line-height: 1.65; color: #4a4a6a; margin: 0; }
.gdpr-banner { display: flex; align-items: flex-start; gap: 1rem; background: #ede9fe; border: 1px solid #c4b5fd; border-radius: 12px; padding: 1.25rem; }
.gdpr-badge { font-family: 'DM Sans', sans-serif; font-size: 0.75rem; font-weight: 700; color: #4f46e5; background: rgba(79,70,229,0.12); padding: 0.25rem 0.625rem; border-radius: 6px; white-space: nowrap; }
.gdpr-text { font-family: 'Inter', sans-serif; font-size: 0.875rem; line-height: 1.65; color: #4a4a6a; margin: 0; }

.certs-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.25rem; }
.cert-badge { background: #eef2ff; border: 1px solid #c7d2fe; border-radius: 10px; padding: 1.25rem 1.5rem; display: flex; flex-direction: column; gap: 0.25rem; align-items: flex-start; }
.cert-name { font-family: 'DM Sans', sans-serif; font-size: 1rem; font-weight: 700; color: #3730a3; }
.cert-demo { font-family: 'Inter', sans-serif; font-size: 0.75rem; color: #6366f1; }
.cert-disclaimer { display: flex; align-items: center; gap: 0.5rem; font-family: 'Inter', sans-serif; font-size: 0.875rem; color: #4a4a6a; background: #f8f7ff; border: 1px solid #e2e0f0; border-radius: 8px; padding: 0.75rem 1rem; }

.risk-grid { list-style: none; margin: 0 0 2rem; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.625rem; }
.risk-item { display: flex; align-items: flex-start; gap: 0.625rem; font-family: 'Inter', sans-serif; font-size: 0.875rem; color: #0f0f23; line-height: 1.5; background: #fff; border: 1px solid #e2e0f0; border-radius: 8px; padding: 0.75rem 1rem; }
.btn-link { font-family: 'Inter', sans-serif; font-size: 0.875rem; font-weight: 600; color: #4f46e5; text-decoration: none; display: inline-flex; align-items: center; gap: 0.25rem; }
.btn-link:hover { text-decoration: underline; }

.cta-section { background: linear-gradient(135deg, #4f46e5, #7c3aed); color: #fff; }
.cta-inner { display: grid; grid-template-columns: 1fr auto; gap: 4rem; align-items: center; }
.cta-content { display: flex; flex-direction: column; gap: 1rem; }
.cta-h2 { font-family: 'DM Sans', sans-serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; line-height: 1.1; margin: 0; color: #fff; }
.cta-h2 .accent { color: #c4b5fd; }
.cta-sub { font-family: 'Inter', sans-serif; font-size: 1rem; line-height: 1.7; color: rgba(255,255,255,0.8); margin: 0; max-width: 44ch; }
.cta-actions { display: flex; flex-direction: column; gap: 0.75rem; align-items: flex-start; }
.cta-section .section-eyebrow { color: rgba(255,255,255,0.7); }

.btn-primary { font-family: 'Inter', sans-serif; font-size: 0.9375rem; font-weight: 700; color: #4f46e5; background: #fff; text-decoration: none; padding: 0.75rem 1.75rem; border-radius: 100px; display: inline-block; transition: background 0.15s, transform 0.1s; white-space: nowrap; }
.btn-primary:hover { background: #f8f7ff; transform: translateY(-1px); }
.btn-secondary { font-family: 'Inter', sans-serif; font-size: 0.9375rem; font-weight: 600; color: rgba(255,255,255,0.9); text-decoration: none; padding: 0.75rem 1.75rem; border-radius: 100px; border: 1.5px solid rgba(255,255,255,0.4); display: inline-block; transition: border-color 0.15s; white-space: nowrap; }
.btn-secondary:hover { border-color: rgba(255,255,255,0.8); }
.btn-ghost { font-family: 'Inter', sans-serif; font-size: 0.9375rem; font-weight: 600; color: #4f46e5; text-decoration: none; padding: 0.75rem 1.75rem; border-radius: 100px; border: 1.5px solid #c4b5fd; display: inline-block; transition: border-color 0.15s, background 0.15s; white-space: nowrap; }
.btn-ghost:hover { border-color: #4f46e5; background: #ede9fe; }
.btn-ghost-sm { font-family: 'Inter', sans-serif; font-size: 0.875rem; font-weight: 600; color: rgba(255,255,255,0.8); text-decoration: none; display: inline-block; padding: 0.375rem 0; border-bottom: 1px solid rgba(255,255,255,0.3); }
.btn-ghost-sm:hover { color: #fff; border-color: rgba(255,255,255,0.6); }

@media (max-width: 900px) {
  .steps-grid { grid-template-columns: 1fr; }
  .data-grid { grid-template-columns: 1fr; }
  .risk-grid { grid-template-columns: repeat(2, 1fr); }
  .certs-grid { grid-template-columns: repeat(2, 1fr); }
  .table-head, .table-row { grid-template-columns: 10rem 1fr; }
  .table-head span:last-child, .table-row span:last-child { display: none; }
  .cta-inner { grid-template-columns: 1fr; gap: 2.5rem; }
  .cta-actions { flex-direction: row; flex-wrap: wrap; }
}
@media (max-width: 600px) { .risk-grid { grid-template-columns: 1fr; } }
@media (prefers-reduced-motion: reduce) { .step-card, .data-card { transition: none; } }

/* ═══ Sub-processor Table ════════════════════════════════ */
.sub-table-head {
  display: grid;
  grid-template-columns: 12rem 1fr 8rem 10rem;
  gap: 1rem;
  background: #f8f7ff;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  font-size: 0.8125rem;
  color: #4a4a6a;
  padding: 0.875rem 1.25rem;
  border-bottom: 1px solid #e2e0f0;
}

.sub-table-row {
  display: grid;
  grid-template-columns: 12rem 1fr 8rem 10rem;
  gap: 1rem;
  padding: 0.875rem 1.25rem;
  border-top: 1px solid #f0eef8;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  align-items: center;
  transition: background 0.15s;
  color: #4a4a6a;
}

.sub-table-row:hover { background: #f8f7ff; }

.sub-proc-name {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  color: #0f0f23;
  font-size: 0.9rem;
}

.sub-region {
  color: #4a4a6a;
  font-size: 0.8125rem;
}

.sub-cert {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #4f46e5;
  background: #ede9fe;
  padding: 0.2rem 0.625rem;
  border-radius: 6px;
  display: inline-block;
  white-space: nowrap;
}

/* ═══ Security FAQ ═══════════════════════════════════════ */
.sec-faq-list {
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sec-faq-item {
  background: #ffffff;
  border: 1px solid #e2e0f0;
  border-radius: 12px;
  overflow: hidden;
}

.sec-faq-q {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.125rem 1.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #0f0f23;
  cursor: pointer;
  list-style: none;
  user-select: none;
  transition: background 0.15s;
}

.sec-faq-q::-webkit-details-marker { display: none; }

.sec-faq-q::after {
  content: '+';
  font-size: 1.25rem;
  font-weight: 300;
  color: #4f46e5;
  flex-shrink: 0;
  margin-left: 1rem;
}

.sec-faq-item[open] .sec-faq-q::after { content: '−'; }
.sec-faq-item[open] .sec-faq-q { background: #ede9fe; }

.sec-faq-a {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  line-height: 1.7;
  color: #4a4a6a;
  margin: 0;
  padding: 0 1.5rem 1.25rem;
}

@media (max-width: 900px) {
  .sub-table-head,
  .sub-table-row {
    grid-template-columns: 10rem 1fr;
  }
  .sub-table-head span:nth-child(3),
  .sub-table-head span:nth-child(4),
  .sub-table-row span:nth-child(3),
  .sub-table-row span:nth-child(4) {
    display: none;
  }
}

/* ═══ Security Layers SVG ════════════════════════════════ */
.sec-layers-wrap {
  display: flex;
  justify-content: center;
  padding: 2rem 0;
}

.sec-rings-svg {
  max-width: 400px;
  width: 100%;
  overflow: visible;
}

.ring {
  fill: none;
  stroke-width: 2;
}

.ring-outer {
  stroke: rgba(79, 70, 229, 0.25);
  fill: rgba(99, 102, 241, 0.03);
  animation: ring-spin-slow 60s linear infinite;
  transform-origin: 200px 200px;
}

.ring-mid {
  stroke: rgba(79, 70, 229, 0.35);
  fill: rgba(99, 102, 241, 0.05);
  animation: ring-spin-mid 40s linear infinite;
  transform-origin: 200px 200px;
}

.ring-inner {
  stroke: rgba(79, 70, 229, 0.5);
  fill: rgba(99, 102, 241, 0.08);
  animation: ring-spin-inner 25s linear infinite;
  transform-origin: 200px 200px;
}

.ring-core {
  fill: #4f46e5;
}

.ring-core-text {
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  font-weight: 700;
  fill: #ffffff;
  letter-spacing: 0.01em;
}

.ring-label {
  font-family: 'Inter', sans-serif;
  font-size: 9.5px;
  font-weight: 600;
  fill: #4a4a6a;
  letter-spacing: 0.03em;
}

.ring-label-outer { font-size: 10px; }
.ring-label-mid { font-size: 9.5px; }
.ring-label-inner { font-size: 9px; }

@keyframes ring-spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes ring-spin-mid  { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
@keyframes ring-spin-inner{ from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

@media (prefers-reduced-motion: reduce) {
  .ring-outer, .ring-mid, .ring-inner { animation: none; }
}

/* ═══ Updated Cert Badge (with status) ════════════════════ */
.cert-icon-wrap {
  font-size: 1.75rem;
  line-height: 1;
  margin-bottom: 0.25rem;
}

.cert-status-badge {
  display: inline-flex;
  align-items: center;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  color: #15803d;
  background: #dcfce7;
  border: 1px solid #bbf7d0;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  white-space: nowrap;
}

/* ── Shield SVG ── */
.shield-section { background: #f8f7ff; border-bottom: 1px solid #e2e0f0; }
.shield-inner { display: grid; grid-template-columns: 1fr auto; gap: 4rem; align-items: center; }
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
  .shield-outer, .shield-mid, .shield-inner-path { animation: none; opacity: 1; }
}
</style>

