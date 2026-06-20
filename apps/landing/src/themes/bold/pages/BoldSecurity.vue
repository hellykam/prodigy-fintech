<template>
  <main class="bold-page">

    <!-- ── Hero ─────────────────────────────────────────────────── -->
    <section class="hero" aria-labelledby="sec-headline">
      <div class="iris-bar" aria-hidden="true" />
      <div class="section-inner hero-inner">
        <p class="eyebrow eyebrow--light">COMPLIANCE &amp; SECURITY</p>
        <h1 id="sec-headline" class="hero-headline">THE SECURITY PAGE. YES, WE HAVE ONE.</h1>
        <p class="hero-sub">Most crypto infrastructure hides its security posture behind NDAs and marketing language. We put ours on a page.</p>
      </div>
    </section>

    <!-- ── Shield Illustration ──────────────────────────────────── -->
    <section class="shield-section" aria-labelledby="bd-shield-h" data-reveal="fade-up">
      <div class="section-inner shield-inner">
        <div class="shield-copy">
          <p class="eyebrow">OUR APPROACH</p>
          <h2 id="bd-shield-h" class="section-headline">LAYERED DEFENCE.<br />AT EVERY LEVEL.</h2>
          <p class="section-intro">Three concentric security layers: infrastructure, compliance, and transaction-level controls. Each monitors the others.</p>
        </div>
        <div class="shield-vis" aria-hidden="true">
          <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg"
               width="220" height="257" preserveAspectRatio="xMidYMid meet"
               aria-hidden="true" role="img" class="shield-svg">
            <path class="shield-outer" d="M60,8 L108,28 L108,72 C108,100 60,128 60,128 C60,128 12,100 12,72 L12,28 Z"
                  fill="rgba(37,99,235,0.05)" stroke="#2563eb" stroke-width="1.5" />
            <path class="shield-mid" d="M60,19.8 L97.8,36.8 L97.8,73.2 C97.8,97.5 60,121.7 60,121.7 C60,121.7 22.2,97.5 22.2,73.2 L22.2,36.8 Z"
                  fill="rgba(37,99,235,0.08)" stroke="#2563eb" stroke-width="1.5" />
            <path class="shield-inner-path" d="M60,31.6 L87.6,45.6 L87.6,74.4 C87.6,94.8 60,115.4 60,115.4 C60,115.4 32.4,94.8 32.4,74.4 L32.4,45.6 Z"
                  fill="rgba(37,99,235,0.14)" stroke="#2563eb" stroke-width="1.5" />
            <text x="60" y="84" text-anchor="middle" font-size="22" fill="#2563eb">🔒</text>
          </svg>
        </div>
      </div>
    </section>

    <!-- ── Chain of Custody Diagram ────────────────────────────── -->
    <section class="section chain-section" aria-labelledby="chain-h">
      <div class="section-inner">
        <p class="eyebrow">SECURITY ARCHITECTURE</p>
        <h2 id="chain-h" class="section-headline">END-TO-END CHAIN OF CUSTODY</h2>
        <div class="chain-diagram" ref="chainRef" aria-label="Security chain diagram">
          <div class="chain-node">
            <div class="chain-box">YOUR APP</div>
          </div>
          <svg class="chain-arrow" viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <line class="chain-line chain-line-1" x1="0" y1="12" x2="72" y2="12" stroke="#2563eb" stroke-width="2"/>
            <polygon points="64,6 80,12 64,18" fill="#2563eb" />
          </svg>
          <div class="chain-node">
            <div class="chain-box">PRODIGY SDK</div>
          </div>
          <svg class="chain-arrow" viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <line class="chain-line chain-line-2" x1="0" y1="12" x2="72" y2="12" stroke="#2563eb" stroke-width="2"/>
            <polygon points="64,6 80,12 64,18" fill="#2563eb" />
          </svg>
          <div class="chain-node">
            <div class="chain-box">KYC ENGINE</div>
          </div>
          <svg class="chain-arrow" viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <line class="chain-line chain-line-3" x1="0" y1="12" x2="72" y2="12" stroke="#2563eb" stroke-width="2"/>
            <polygon points="64,6 80,12 64,18" fill="#2563eb" />
          </svg>
          <div class="chain-node">
            <div class="chain-box chain-box--final">SETTLEMENT RAIL</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Threat Model Grid ─────────────────────────────────────── -->
    <section class="section section--dark threat-section" aria-labelledby="threat-h">
      <div class="section-inner">
        <p class="eyebrow eyebrow--light">THREAT MODEL</p>
        <h2 id="threat-h" class="section-headline section-headline--light">6 ATTACK VECTORS. ALL MITIGATED.</h2>
        <div class="threat-grid" data-animate-stagger>
          <div class="threat-tile">
            <div class="threat-icon" aria-hidden="true">🛡</div>
            <div class="threat-label">DDoS Protection</div>
          </div>
          <div class="threat-tile">
            <div class="threat-icon" aria-hidden="true">🔒</div>
            <div class="threat-label">SQL Injection Prevention</div>
          </div>
          <div class="threat-tile">
            <div class="threat-icon" aria-hidden="true">🔐</div>
            <div class="threat-label">PII Encryption</div>
          </div>
          <div class="threat-tile">
            <div class="threat-icon" aria-hidden="true">📊</div>
            <div class="threat-label">Fraud Scoring</div>
          </div>
          <div class="threat-tile">
            <div class="threat-icon" aria-hidden="true">🔍</div>
            <div class="threat-label">AML Screening</div>
          </div>
          <div class="threat-tile">
            <div class="threat-icon" aria-hidden="true">⚙</div>
            <div class="threat-label">Session Hardening</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── KYC Architecture ──────────────────────────────────────── -->
    <section class="section" aria-labelledby="kyc-h">
      <div class="section-inner">
        <p class="eyebrow">KYC ARCHITECTURE</p>
        <h2 id="kyc-h" class="section-headline">IDENTITY VERIFICATION IN THREE STEPS</h2>
        <p class="section-sub">Every first-time user passes through the same flow inside the widget. 47 seconds average. Nothing deferred. Nothing optional.</p>
        <div class="steps-grid">
          <div v-for="(step, i) in kycSteps" :key="i" class="step-card">
            <div class="step-num">{{ String(i + 1).padStart(2, '0') }}</div>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-detail">{{ step.detail }}</p>
            <div class="step-chips">
              <span class="chip">{{ step.duration }}</span>
              <span class="chip chip--accent">{{ step.result }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Audit Trail ──────────────────────────────────────────── -->
    <section class="section section--dark" aria-labelledby="audit-h">
      <div class="section-inner">
        <p class="eyebrow eyebrow--light">AUDIT TRAIL</p>
        <h2 id="audit-h" class="section-headline section-headline--light">EVERY TRANSACTION. FULLY LOGGED.</h2>
        <p class="section-sub section-sub--light">Your regulator will find everything they're looking for. The audit trail is immutable from the moment the widget initialises.</p>
        <div class="audit-table" role="table" aria-label="Audit trail fields">
          <div class="audit-head" role="row">
            <span role="columnheader">Field</span>
            <span role="columnheader">Description</span>
            <span role="columnheader">Retained</span>
          </div>
          <div v-for="row in auditRows" :key="row.field" class="audit-row" role="row">
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
        <p class="eyebrow">DATA HANDLING</p>
        <h2 id="data-h" class="section-headline">WHAT WE COLLECT. AND WHY.</h2>
        <div class="data-grid">
          <div v-for="item in dataItems" :key="item.label" class="data-card">
            <p class="data-label">{{ item.label }}</p>
            <p class="data-value">{{ item.value }}</p>
            <p class="data-detail">{{ item.detail }}</p>
          </div>
        </div>
        <p class="gdpr-note">GDPR-aligned. EU-hosted infrastructure (Frankfurt). AML retention: 5 years post-last transaction.</p>
      </div>
    </section>

    <!-- ── Risk Engine ───────────────────────────────────────────── -->
    <section class="section section--dark" aria-labelledby="risk-h">
      <div class="section-inner">
        <p class="eyebrow eyebrow--light">RISK ENGINE</p>
        <h2 id="risk-h" class="section-headline section-headline--light">12 AUTOMATED CHECKS. EVERY TRANSACTION.</h2>
        <p class="section-sub section-sub--light">Under 400ms. Anything that fails enters the manual review queue. Average review time: 4.2 minutes.</p>
        <ul class="risk-grid" role="list">
          <li v-for="check in riskChecks" :key="check" class="risk-item">
            <span class="risk-bullet" aria-hidden="true">◈</span>{{ check }}
          </li>
        </ul>
        <a href="http://localhost:5002" target="_blank" rel="noopener noreferrer" class="btn-ghost">View manual review queue →</a>
      </div>
    </section>

    <!-- ── Proof Block ───────────────────────────────────────────── -->
    <section class="proof-section" aria-labelledby="proof-headline">
      <div class="section-inner">
        <h2 id="proof-headline" class="proof-headline" data-reveal="fade-up">THE NUMBERS DON'T LIE.</h2>
        <div class="proof-grid" data-animate-stagger>
          <div class="proof-cell">
            <div class="proof-num">0</div>
            <div class="proof-lbl">COMPLIANCE INCIDENTS IN TRAILING 12 MONTHS</div>
          </div>
          <div class="proof-cell">
            <div class="proof-num">100%</div>
            <div class="proof-lbl">KYC AUDIT COMPLETENESS</div>
          </div>
          <div class="proof-cell">
            <div class="proof-num">7</div>
            <div class="proof-lbl">COMPLIANCE CERTIFICATIONS</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Security FAQ ───────────────────────────────────────────── -->
    <section class="sec-faq-section" aria-labelledby="sec-faq-headline">
      <div class="section-inner">
        <p class="eyebrow">SECURITY FAQ</p>
        <h2 id="sec-faq-headline" class="section-headline" data-reveal="fade-up">COMMON QUESTIONS.</h2>
        <div class="sec-faq-list" data-animate-stagger>
          <details class="sec-faq-item">
            <summary class="sec-faq-summary">Where does user data live?</summary>
            <div class="sec-faq-answer">EU primary (Frankfurt), US secondary. Enterprise customers can negotiate custom data residency.</div>
          </details>
          <details class="sec-faq-item">
            <summary class="sec-faq-summary">Are card numbers stored?</summary>
            <div class="sec-faq-answer">No. We use full PCI DSS tokenization. Card numbers are never stored on our systems at any point.</div>
          </details>
          <details class="sec-faq-item">
            <summary class="sec-faq-summary">Can I bring my own KYC provider?</summary>
            <div class="sec-faq-answer">Available as an Enterprise option. Full API support for custom KYC integrations.</div>
          </details>
        </div>
      </div>
    </section>

    <!-- ── CTA ──────────────────────────────────────────────────── -->
    <section class="cta-section" aria-labelledby="cta-h">
      <div class="section-inner cta-inner">
        <div class="cta-content">
          <p class="eyebrow">Open the demo</p>
          <h2 id="cta-h" class="cta-headline">SEE THE AUDIT TRAIL LIVE.</h2>
          <p class="cta-sub">Every log entry. Every KYC event. Every risk score. Visible in the admin console right now.</p>
        </div>
        <div class="cta-actions">
          <a href="http://localhost:5001" target="_blank" rel="noopener noreferrer" class="btn-fill">OPEN DEMO →</a>
          <a href="http://localhost:5002" target="_blank" rel="noopener noreferrer" class="btn-outline">ADMIN CONSOLE →</a>
          <RouterLink to="/bold/developers" class="btn-outline">INTEGRATION DOCS →</RouterLink>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const chainRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const lines = document.querySelectorAll<SVGLineElement>('.chain-line')
  lines.forEach((line) => {
    const length = (line as SVGLineElement).getTotalLength?.() ?? 80
    line.style.strokeDasharray = String(length)
    line.style.strokeDashoffset = String(length)
  })

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const allLines = document.querySelectorAll<SVGLineElement>('.chain-line')
        allLines.forEach((line, i) => {
          const length = (line as SVGLineElement).getTotalLength?.() ?? 80
          setTimeout(() => {
            line.style.transition = 'stroke-dashoffset 0.5s ease'
            line.style.strokeDashoffset = '0'
          }, i * 350)
        })
        observer.disconnect()
      }
    })
  }, { threshold: 0.3 })

  if (chainRef.value) observer.observe(chainRef.value)
})

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
.bold-page { background: #f5f5f0; color: #0a0a0a; }
.section-inner { max-width: 1440px; margin: 0 auto; padding: 5rem 1.5rem; }
.iris-bar { height: 4px; background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe, #667eea); background-size: 200% auto; animation: iris 5s linear infinite; will-change: background-position; }
@keyframes iris { 0% { background-position: 0% center; } 100% { background-position: -200% center; } }
.hero { background: #0a0a0a; border-bottom: 2px solid #0a0a0a; }
.hero-inner { padding-top: 5rem; padding-bottom: 5rem; display: flex; flex-direction: column; gap: 1.5rem; }
.hero-headline { font-family: 'Bebas Neue', sans-serif; font-size: clamp(3rem, 8vw, 7.5rem); line-height: 0.92; letter-spacing: -0.01em; color: #f5f5f0; margin: 0; }
.hero-sub { font-family: 'Space Grotesk', sans-serif; font-size: 1.125rem; line-height: 1.65; color: rgba(245,245,240,0.7); max-width: 52ch; margin: 0; }
.eyebrow { font-family: 'Space Grotesk', sans-serif; font-size: 0.8125rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(10,10,10,0.5); margin: 0 0 1rem; }
.eyebrow--light { color: rgba(245,245,240,0.5); }
.section { border-bottom: 1px solid rgba(10,10,10,0.12); }
.section--dark { background: #0a0a0a; border-color: rgba(245,245,240,0.08); }
.section-headline { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.5rem, 5vw, 4.5rem); line-height: 0.95; letter-spacing: -0.01em; margin: 0 0 1.5rem; }
.section-headline--light { color: #f5f5f0; }
.section-sub { font-family: 'Space Grotesk', sans-serif; font-size: 1rem; line-height: 1.7; color: rgba(10,10,10,0.6); max-width: 58ch; margin: 0 0 2.5rem; }
.section-sub--light { color: rgba(245,245,240,0.65); }
.steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border: 1.5px solid #0a0a0a; }
.step-card { padding: 2rem; border-right: 1px solid rgba(10,10,10,0.2); display: flex; flex-direction: column; gap: 0.75rem; }
.step-card:last-child { border-right: none; }
.step-num { font-family: 'Bebas Neue', sans-serif; font-size: 3.5rem; line-height: 1; color: rgba(10,10,10,0.1); }
.step-title { font-family: 'Bebas Neue', sans-serif; font-size: 1.75rem; line-height: 1; margin: 0; color: #0a0a0a; }
.step-detail { font-family: 'Space Grotesk', sans-serif; font-size: 0.875rem; line-height: 1.7; color: rgba(10,10,10,0.65); margin: 0; }
.step-chips { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: auto; }
.chip { font-family: 'Space Grotesk', sans-serif; font-size: 0.75rem; font-weight: 500; padding: 0.2rem 0.625rem; border: 1px solid rgba(10,10,10,0.3); color: rgba(10,10,10,0.65); }
.chip--accent { border-color: rgba(102,126,234,0.3); background: linear-gradient(90deg,#667eea,#764ba2,#f093fb); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.audit-table { border: 1px solid rgba(245,245,240,0.15); }
.audit-head { display: grid; grid-template-columns: 12rem 1fr 6rem; background: rgba(245,245,240,0.06); font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(245,245,240,0.5); padding: 0.75rem 1rem; gap: 1rem; }
.audit-row { display: grid; grid-template-columns: 12rem 1fr 6rem; padding: 0.875rem 1rem; gap: 1rem; border-top: 1px solid rgba(245,245,240,0.08); font-family: 'Space Grotesk', sans-serif; font-size: 0.875rem; align-items: start; transition: background 0.15s; }
.audit-row:hover { background: rgba(245,245,240,0.04); }
.field-name { font-family: 'Space Mono', monospace; font-size: 0.75rem; font-weight: 700; color: #f5f5f0; word-break: break-all; }
.field-desc { color: rgba(245,245,240,0.65); line-height: 1.5; }
.field-ret { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: rgba(245,245,240,0.4); }
.data-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0; border: 1.5px solid #0a0a0a; margin-bottom: 2rem; }
.data-card { padding: 1.5rem; border-right: 1px solid rgba(10,10,10,0.2); border-bottom: 1px solid rgba(10,10,10,0.2); display: flex; flex-direction: column; gap: 0.5rem; }
.data-card:nth-child(2n) { border-right: none; }
.data-card:nth-last-child(-n+2) { border-bottom: none; }
.data-label { font-family: 'Space Grotesk', sans-serif; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(10,10,10,0.45); margin: 0; }
.data-value { font-family: 'Bebas Neue', sans-serif; font-size: 1.25rem; margin: 0; }
.data-detail { font-family: 'Space Grotesk', sans-serif; font-size: 0.875rem; line-height: 1.6; color: rgba(10,10,10,0.6); margin: 0; }
.gdpr-note { font-family: 'Space Grotesk', sans-serif; font-size: 0.8125rem; line-height: 1.7; color: rgba(10,10,10,0.55); border-left: 2px solid rgba(10,10,10,0.2); padding-left: 1rem; }
.risk-grid { list-style: none; margin: 0 0 2rem; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border: 1px solid rgba(245,245,240,0.1); }
.risk-item { display: flex; align-items: flex-start; gap: 0.625rem; font-family: 'Space Grotesk', sans-serif; font-size: 0.875rem; color: rgba(245,245,240,0.8); line-height: 1.5; padding: 1rem 1.25rem; border-right: 1px solid rgba(245,245,240,0.08); border-bottom: 1px solid rgba(245,245,240,0.08); }
.risk-item:nth-child(3n) { border-right: none; }
.risk-item:nth-last-child(-n+3) { border-bottom: none; }
.risk-bullet { color: rgba(245,245,240,0.3); flex-shrink: 0; font-size: 0.75rem; margin-top: 2px; }
.cta-section { border-top: 2px solid #0a0a0a; }
.cta-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
.cta-content { display: flex; flex-direction: column; gap: 1.25rem; }
.cta-headline { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.5rem, 5vw, 5rem); line-height: 0.92; margin: 0; }
.cta-sub { font-family: 'Space Grotesk', sans-serif; font-size: 1rem; line-height: 1.65; color: rgba(10,10,10,0.6); margin: 0; }
.cta-actions { display: flex; flex-direction: column; gap: 0.875rem; }
.btn-fill { font-family: 'Space Grotesk', sans-serif; font-size: 0.875rem; font-weight: 700; letter-spacing: 0.1em; color: #f5f5f0; background: #0a0a0a; text-decoration: none; padding: 1rem 2rem; display: block; text-align: center; transition: background 0.15s; }
.btn-fill:hover { background: #333; }
.btn-outline { font-family: 'Space Grotesk', sans-serif; font-size: 0.875rem; font-weight: 600; letter-spacing: 0.1em; color: #0a0a0a; text-decoration: none; padding: 1rem 2rem; display: block; text-align: center; border: 1.5px solid #0a0a0a; transition: background 0.15s, color 0.15s; }
.btn-outline:hover { background: #0a0a0a; color: #f5f5f0; }
.btn-ghost { font-family: 'Space Grotesk', sans-serif; font-size: 0.875rem; font-weight: 600; letter-spacing: 0.08em; color: rgba(245,245,240,0.7); text-decoration: none; padding: 0.75rem 1.25rem; border: 1px solid rgba(245,245,240,0.25); transition: border-color 0.15s, color 0.15s; display: inline-block; }
.btn-ghost:hover { border-color: rgba(245,245,240,0.6); color: #f5f5f0; }
/* ── Proof Block ───────────────────────────────────────────── */
.proof-section {
  background: #0a0a0a;
  border-bottom: 2px solid #0a0a0a;
}

.proof-headline {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  line-height: 0.95;
  letter-spacing: -0.01em;
  color: #f5f5f0;
  margin: 0 0 3rem;
}

.proof-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border: 1px solid rgba(245, 245, 240, 0.12);
}

.proof-cell {
  padding: 3rem 2.5rem;
  border-right: 1px solid rgba(245, 245, 240, 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.proof-cell:last-child { border-right: none; }

.proof-num {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(3rem, 8vw, 6rem);
  line-height: 0.9;
  letter-spacing: 0.02em;
  background: linear-gradient(135deg, #2563eb, #a78bfa, #38bdf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.proof-lbl {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(245, 245, 240, 0.5);
}

/* ── Security FAQ ──────────────────────────────────────────── */
.sec-faq-section {
  border-bottom: 1px solid rgba(10, 10, 10, 0.12);
}

.sec-faq-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1.5px solid #0a0a0a;
}

.sec-faq-item {
  border-bottom: 1px solid rgba(10, 10, 10, 0.15);
}

.sec-faq-item:last-child { border-bottom: none; }

.sec-faq-summary {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(1.125rem, 2.5vw, 1.625rem);
  letter-spacing: 0.02em;
  color: #0a0a0a;
  padding: 1.375rem 1.75rem;
  cursor: pointer;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.15s;
}

.sec-faq-summary::-webkit-details-marker { display: none; }

.sec-faq-summary::after {
  content: '+';
  font-size: 1.375rem;
  line-height: 1;
  transition: transform 0.2s;
  flex-shrink: 0;
  margin-left: 1rem;
}

.sec-faq-item[open] .sec-faq-summary::after {
  transform: rotate(45deg);
}

.sec-faq-summary:hover { background: rgba(10, 10, 10, 0.03); }

.sec-faq-answer {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: rgba(10, 10, 10, 0.65);
  padding: 0 1.75rem 1.5rem;
  border-top: 1px solid rgba(10, 10, 10, 0.1);
}

@media (max-width: 900px) {
  .proof-grid { grid-template-columns: 1fr; }
  .proof-cell { border-right: none; border-bottom: 1px solid rgba(245, 245, 240, 0.08); }
  .proof-cell:last-child { border-bottom: none; }
}

@media (max-width: 900px) {
  .steps-grid { grid-template-columns: 1fr; }
  .step-card { border-right: none; border-bottom: 1px solid rgba(10,10,10,0.2); }
  .step-card:last-child { border-bottom: none; }
  .audit-head, .audit-row { grid-template-columns: 10rem 1fr; }
  .audit-head span:last-child, .audit-row span:last-child { display: none; }
  .risk-grid { grid-template-columns: 1fr; }
  .risk-item { border-right: none; border-bottom: 1px solid rgba(245,245,240,0.08); }
  .risk-item:last-child { border-bottom: none; }
  .data-grid { grid-template-columns: 1fr; }
  .data-card { border-right: none; border-bottom: 1px solid rgba(10,10,10,0.2); }
  .data-card:last-child { border-bottom: none; }
  .cta-inner { grid-template-columns: 1fr; gap: 2.5rem; }
}
@media (prefers-reduced-motion: reduce) { .iris-bar { animation: none; } }

/* ── Chain of Custody ───────────────────────────────────────── */
.chain-section {
  background-color: #f5f5f0;
}

.chain-diagram {
  display: flex;
  align-items: center;
  gap: 0;
  flex-wrap: wrap;
  margin-top: 2.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.chain-node {
  flex-shrink: 0;
}

.chain-box {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.25rem;
  letter-spacing: 0.08em;
  color: #0a0a0a;
  border: 3px solid #0a0a0a;
  padding: 1.25rem 1.75rem;
  background: #f5f5f0;
  white-space: nowrap;
  position: relative;
}

.chain-box--final {
  border-color: #2563eb;
  color: #2563eb;
  background: rgba(37, 99, 235, 0.05);
}

.chain-arrow {
  width: 80px;
  height: 24px;
  flex-shrink: 0;
}

/* ── Threat Model ───────────────────────────────────────────── */
.threat-section {
  background: #0a0a0a;
}

.threat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border: 1px solid rgba(255, 255, 255, 0.12);
  margin-top: 2rem;
}

.threat-tile {
  padding: 2.5rem 2rem;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  transition: background 0.15s;
}

.threat-tile:hover {
  background: rgba(37, 99, 235, 0.07);
}

.threat-tile:nth-child(3n) { border-right: none; }
.threat-tile:nth-last-child(-n+3) { border-bottom: none; }

.threat-icon {
  font-size: 2.5rem;
  line-height: 1;
}

.threat-label {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(245, 245, 240, 0.85);
}

@media (max-width: 900px) {
  .threat-grid { grid-template-columns: repeat(2, 1fr); }
  .threat-tile:nth-child(3n) { border-right: 1px solid rgba(255,255,255,0.08); }
  .threat-tile:nth-child(2n) { border-right: none; }
  .threat-tile:nth-last-child(-n+3) { border-bottom: 1px solid rgba(255,255,255,0.08); }
  .threat-tile:nth-last-child(-n+2) { border-bottom: none; }
  .chain-diagram { flex-direction: column; align-items: flex-start; }
  .chain-arrow { transform: rotate(90deg); }
}

@media (max-width: 580px) {
  .threat-grid { grid-template-columns: 1fr; }
  .threat-tile { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.08) !important; }
  .threat-tile:last-child { border-bottom: none !important; }
}

/* ── Shield SVG ── */
.shield-section { background: #111; border-bottom: 1px solid #222; }
.shield-inner { display: grid; grid-template-columns: 1fr auto; gap: 4rem; align-items: center; }
.shield-inner .section-headline { color: #fff; }
.shield-inner .section-intro { color: rgba(255,255,255,0.65); margin: 0; }
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
