<template>
  <main class="ft-security">

    <!-- System header bar -->
    <div class="ft-sysbar">
      <span>PRODIGY INFRASTRUCTURE SERVICES</span>
      <span class="ft-sysbar-dot">·</span>
      <span>SECURITY &amp; COMPLIANCE OVERVIEW</span>
      <span class="ft-sysbar-dot">·</span>
      <span class="ft-status">ALL CONTROLS: <em>ACTIVE</em></span>
    </div>

    <hr class="ft-rule" />

    <!-- Hero -->
    <section class="ft-hero">
      <div class="ft-hero-label">REF: SEC-001 · SECURITY ARCHITECTURE</div>
      <h1 class="ft-headline">ENTERPRISE-GRADE SECURITY<br />BUILT FOR REGULATED INSTITUTIONS.</h1>
      <p class="ft-subhead">
        Every layer of Prodigy is designed to satisfy the compliance requirements of the most heavily regulated financial institutions. No exceptions. No optional controls.
      </p>
      <div class="ft-hero-actions">
        <a href="#whitepaper" class="ft-btn ft-btn--primary">REQUEST SECURITY WHITEPAPER →</a>
        <RouterLink to="/fintech/developers" class="ft-btn ft-btn--ghost">VIEW API DOCS</RouterLink>
      </div>
      <div class="fse-kyc-pipeline" aria-hidden="true">
        <div class="fse-pipe-step fse-ps-1">
          <div class="fse-pipe-icon">⬡</div>
          <div class="fse-pipe-lbl">ID_SCAN</div>
        </div>
        <div class="fse-pipe-arrow fse-pa-1">——▶</div>
        <div class="fse-pipe-step fse-ps-2">
          <div class="fse-pipe-icon">◎</div>
          <div class="fse-pipe-lbl">LIVENESS</div>
        </div>
        <div class="fse-pipe-arrow fse-pa-2">——▶</div>
        <div class="fse-pipe-step fse-ps-3">
          <div class="fse-pipe-icon">⬡</div>
          <div class="fse-pipe-lbl">SANCTIONS</div>
        </div>
        <div class="fse-pipe-arrow fse-pa-3">——▶</div>
        <div class="fse-pipe-step fse-ps-4 fse-ps--approved">
          <div class="fse-pipe-icon">✓</div>
          <div class="fse-pipe-lbl">APPROVED</div>
        </div>
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- Shield Illustration -->
    <section class="ft-shield-section" aria-labelledby="ft-shield-h" data-reveal="fade-up">
      <div class="ft-shield-inner">
        <div class="ft-shield-copy">
          <div class="ft-section-label" id="ft-shield-h">LAYERED_SECURITY_ARCHITECTURE</div>
          <p class="ft-subhead" style="margin-top:0.75rem;">Three concentric security layers. Each monitors the others. No single point of trust.</p>
        </div>
        <div class="ft-shield-vis" aria-hidden="true">
          <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg"
               width="220" height="257" preserveAspectRatio="xMidYMid meet"
               aria-hidden="true" role="img" class="shield-svg">
            <path class="shield-outer" d="M60,8 L108,28 L108,72 C108,100 60,128 60,128 C60,128 12,100 12,72 L12,28 Z"
                  fill="rgba(245,158,11,0.04)" stroke="#f59e0b" stroke-width="1.5" />
            <path class="shield-mid" d="M60,19.8 L97.8,36.8 L97.8,73.2 C97.8,97.5 60,121.7 60,121.7 C60,121.7 22.2,97.5 22.2,73.2 L22.2,36.8 Z"
                  fill="rgba(245,158,11,0.07)" stroke="#f59e0b" stroke-width="1.5" />
            <path class="shield-inner-path" d="M60,31.6 L87.6,45.6 L87.6,74.4 C87.6,94.8 60,115.4 60,115.4 C60,115.4 32.4,94.8 32.4,74.4 L32.4,45.6 Z"
                  fill="rgba(245,158,11,0.12)" stroke="#f59e0b" stroke-width="1.5" />
            <text x="60" y="84" text-anchor="middle" font-size="22" fill="#f59e0b">🔒</text>
          </svg>
        </div>
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- Compliance matrix -->
    <section class="ft-section">
      <div class="ft-section-label">COMPLIANCE MATRIX · CURRENT CERTIFICATIONS</div>
      <div class="ft-table-wrap" data-animate-stagger>
        <table class="ft-table">
          <thead>
            <tr>
              <th>STANDARD</th>
              <th>SCOPE</th>
              <th>STATUS</th>
              <th>AUDITOR</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in complianceRows" :key="row.standard">
              <td class="ft-field">{{ row.standard }}</td>
              <td>{{ row.scope }}</td>
              <td :class="row.certified ? 'ft-ok' : 'ft-compliant'">{{ row.status }}</td>
              <td class="ft-muted">{{ row.auditor }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="ft-footnote">All certifications reflect demo environment status. Production certifications available on request under NDA.</p>
    </section>

    <hr class="ft-rule" />

    <!-- Encryption & transport -->
    <section class="ft-section">
      <div class="ft-section-label">ENCRYPTION STANDARDS · DATA AT REST AND IN TRANSIT</div>
      <div class="ft-spec-grid">
        <div v-for="(item, i) in encryptionItems" :key="item.label" class="ft-spec-row" :class="{ 'ft-spec-row--alt': i % 2 === 1 }">
          <span class="ft-spec-key">{{ item.label }}</span>
          <span class="ft-spec-val">{{ item.value }}</span>
          <span class="ft-ok ft-spec-status">✓ ACTIVE</span>
        </div>
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- KYC / AML -->
    <section class="ft-section">
      <div class="ft-section-label">KYC / AML ARCHITECTURE · SUMSUB-POWERED</div>
      <p class="ft-body-text">
        Sumsub-powered identity verification covers 200+ countries and jurisdictions. Every first-time user passes through a three-step flow: document scan, passive liveness detection, and sanctions screening against OFAC, UN, EU, and HMT lists.
      </p>
      <div class="ft-table-wrap">
        <table class="ft-table">
          <thead>
            <tr>
              <th>#</th>
              <th>STEP</th>
              <th>DURATION</th>
              <th>OUTPUT</th>
              <th>LOGGED</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="step in kycSteps" :key="step.num">
              <td class="ft-num">{{ step.num }}</td>
              <td class="ft-field">{{ step.step }}</td>
              <td class="ft-value">{{ step.duration }}</td>
              <td>{{ step.output }}</td>
              <td class="ft-ok">✓</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- Audit log -->
    <section class="ft-section" data-reveal="fade-left">
      <div class="ft-section-label">AUDIT LOG · IMMUTABLE LEDGER</div>
      <p class="ft-body-text">
        Every event is logged to an immutable ledger from the moment the widget initialises. No record can be amended post-settlement. All entries are retained in line with AML requirements.
      </p>
      <div class="ft-table-wrap">
        <table class="ft-table">
          <thead>
            <tr>
              <th>FIELD</th>
              <th>DESCRIPTION</th>
              <th>RETENTION</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in auditRows" :key="row.field">
              <td class="ft-field">{{ row.field }}</td>
              <td>{{ row.desc }}</td>
              <td class="ft-value">{{ row.ret }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- Architecture diagram -->
    <section class="ft-section">
      <div class="ft-section-label">PAYMENT FLOW ARCHITECTURE · SECURITY LAYER DIAGRAM</div>
      <div class="ft-flow-wrap">
        <PaymentFlowSvg theme="light" />
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- DATA PIPELINE DIAGRAM -->
    <section class="ft-section fse-pipeline-section" aria-labelledby="pipeline-h" data-reveal="fade-up">
      <div class="ft-section-label" id="pipeline-h">DATA_PIPELINE · ENCRYPTION FLOW</div>
      <div class="fse-pipeline" ref="pipelineRef" aria-label="Encrypted data pipeline diagram">
        <div class="fse-pnode">
          <div class="fse-pnode__box">CLIENT</div>
        </div>
        <div class="fse-pipe-seg">
          <svg class="fse-pipe-svg" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <line class="fse-pipe-line fse-pipe-line--1" x1="0" y1="20" x2="100" y2="20" stroke="#f59e0b" stroke-width="1.5"/>
            <polygon points="92,14 108,20 92,26" fill="#f59e0b"/>
          </svg>
          <span class="fse-pipe-label">encrypted</span>
        </div>
        <div class="fse-pnode">
          <div class="fse-pnode__box">PRODIGY API</div>
        </div>
        <div class="fse-pipe-seg">
          <svg class="fse-pipe-svg" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <line class="fse-pipe-line fse-pipe-line--2" x1="0" y1="20" x2="100" y2="20" stroke="#f59e0b" stroke-width="1.5"/>
            <polygon points="92,14 108,20 92,26" fill="#f59e0b"/>
          </svg>
          <span class="fse-pipe-label">tokenized</span>
        </div>
        <div class="fse-pnode">
          <div class="fse-pnode__box">KYC ENGINE</div>
        </div>
        <div class="fse-pipe-seg">
          <svg class="fse-pipe-svg" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <line class="fse-pipe-line fse-pipe-line--3" x1="0" y1="20" x2="100" y2="20" stroke="#f59e0b" stroke-width="1.5"/>
            <polygon points="92,14 108,20 92,26" fill="#f59e0b"/>
          </svg>
          <span class="fse-pipe-label">cleared</span>
        </div>
        <div class="fse-pnode">
          <div class="fse-pnode__box fse-pnode__box--final">SETTLEMENT</div>
        </div>
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- COMPLIANCE STATUS PANEL -->
    <section class="ft-section fse-compliance-section" aria-labelledby="compliance-badges-h" data-reveal="fade-up">
      <div class="ft-section-label" id="compliance-badges-h">COMPLIANCE_STATUS · ALL CONTROLS</div>
      <div class="fse-compliance-grid" data-animate-stagger>
        <div class="fse-compliance-card">
          <div class="fse-compliance-check">✓</div>
          <div class="fse-compliance-name">SOC 2 Type II</div>
          <div class="fse-compliance-status">ACTIVE</div>
        </div>
        <div class="fse-compliance-card">
          <div class="fse-compliance-check">✓</div>
          <div class="fse-compliance-name">PCI DSS Level 1</div>
          <div class="fse-compliance-status">ACTIVE</div>
        </div>
        <div class="fse-compliance-card">
          <div class="fse-compliance-check">✓</div>
          <div class="fse-compliance-name">GDPR Article 25</div>
          <div class="fse-compliance-status">ACTIVE</div>
        </div>
        <div class="fse-compliance-card">
          <div class="fse-compliance-check">✓</div>
          <div class="fse-compliance-name">AML 6th Directive</div>
          <div class="fse-compliance-status">ACTIVE</div>
        </div>
        <div class="fse-compliance-card">
          <div class="fse-compliance-check">✓</div>
          <div class="fse-compliance-name">ISO 27001</div>
          <div class="fse-compliance-status">ACTIVE</div>
        </div>
        <div class="fse-compliance-card">
          <div class="fse-compliance-check">✓</div>
          <div class="fse-compliance-name">eIDAS Compliant</div>
          <div class="fse-compliance-status">ACTIVE</div>
        </div>
      </div>
      <p class="fse-compliance-disclaimer">Compliance statuses reflect demo architecture. Engage your legal team for production deployment.</p>
    </section>

    <hr class="ft-rule" />

    <!-- Risk engine -->
    <section class="ft-section" data-reveal="fade-up">
      <div class="ft-section-label">RISK ENGINE · 12 AUTOMATED CHECKS PER TRANSACTION</div>
      <p class="ft-body-text">
        Before any transaction settles, the risk engine runs twelve parallel checks in under 400ms. Failed checks route automatically to the manual review queue in the admin console.
      </p>
      <div class="ft-risk-grid" data-animate-stagger>
        <div v-for="check in riskChecks" :key="check" class="ft-risk-item">
          <span class="ft-ok ft-risk-bullet">✓</span>
          <span>{{ check }}</span>
        </div>
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- SUB_PROCESSOR_TABLE -->
    <section class="ft-section fse-subproc" aria-labelledby="subproc-h" data-reveal="fade-up">
      <div class="ft-section-label" id="subproc-h">DATA_SUB_PROCESSORS</div>
      <div class="ft-table-wrap">
        <table class="ft-table">
          <thead>
            <tr>
              <th>SUB_PROCESSOR</th>
              <th>SERVICE</th>
              <th>DATA_REGION</th>
              <th>CERTIFICATION</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="ft-field">Stripe</td>
              <td>Payment processing</td>
              <td class="ft-value">EU-West</td>
              <td class="ft-ok">PCI DSS L1</td>
            </tr>
            <tr>
              <td class="ft-field">Amazon Web Services</td>
              <td>Cloud infrastructure</td>
              <td class="ft-value">EU-West-1</td>
              <td class="ft-ok">ISO 27001</td>
            </tr>
            <tr>
              <td class="ft-field">Onfido</td>
              <td>Identity verification</td>
              <td class="ft-value">EU</td>
              <td class="ft-ok">SOC 2 Type II</td>
            </tr>
            <tr>
              <td class="ft-field">Chainalysis</td>
              <td>Blockchain analytics</td>
              <td class="ft-value">US-East</td>
              <td class="ft-ok">SOC 2 Type II</td>
            </tr>
            <tr>
              <td class="ft-field">Cloudflare</td>
              <td>CDN &amp; DDoS</td>
              <td class="ft-value">Global</td>
              <td class="ft-ok">ISO 27001</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- INCIDENT_SLA_DATA -->
    <section class="ft-section fse-sla" aria-labelledby="sla-h" data-reveal="fade-up">
      <div class="ft-section-label" id="sla-h">INCIDENT_SLA &amp; RESPONSE_TIMES</div>
      <pre class="fse-sla__pre"><code><span class="fse-sla-k">SLA_UPTIME</span><span class="fse-sla-sep">:</span>              <span class="fse-sla-v">99.99%</span>
<span class="fse-sla-k">P1_RESPONSE</span><span class="fse-sla-sep">:</span>            <span class="fse-sla-v">&lt;15 min</span>
<span class="fse-sla-k">P2_RESPONSE</span><span class="fse-sla-sep">:</span>            <span class="fse-sla-v">&lt;2 hours</span>
<span class="fse-sla-k">P3_RESPONSE</span><span class="fse-sla-sep">:</span>            <span class="fse-sla-v">&lt;24 hours</span>
<span class="fse-sla-k">TRAILING_12MO_INCIDENTS</span><span class="fse-sla-sep">:</span> <span class="fse-sla-ok">0</span></code></pre>
    </section>

    <hr class="ft-rule" />

    <!-- CTA -->
    <section id="whitepaper" class="ft-cta">
      <div class="ft-cta-label">NEXT STEP · SECURITY DOCUMENTATION</div>
      <p class="ft-cta-body">
        Request the full security whitepaper. Includes architecture diagrams, penetration test summary, and compliance attestation letters.
      </p>
      <div class="ft-cta-actions">
        <a href="http://localhost:5002" target="_blank" rel="noopener noreferrer" class="ft-btn ft-btn--primary ft-btn--lg">REQUEST SECURITY WHITEPAPER →</a>
        <a href="http://localhost:5001" target="_blank" rel="noopener noreferrer" class="ft-btn ft-btn--ghost">VIEW DEMO AUDIT TRAIL →</a>
      </div>
    </section>

    <hr class="ft-rule" />

    <div class="ft-footer">
      <span>PRODIGY INFRASTRUCTURE SERVICES</span>
      <span>·</span>
      <span>ALL SECURITY CONTROLS ACTIVE</span>
      <span>·</span>
      <RouterLink to="/fintech/developers" class="ft-footer-link">API REFERENCE</RouterLink>
      <span>·</span>
      <RouterLink to="/fintech/case-studies" class="ft-footer-link">CASE STUDIES</RouterLink>
    </div>

  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { animate, stagger } from 'animejs'
import PaymentFlowSvg from '../../../components/shared/PaymentFlowSvg.vue'

const pipelineRef = ref<HTMLElement | null>(null)

onMounted(() => {
  // Existing KYC pipeline animation
  const el = document.querySelector('.fse-kyc-pipeline')
  if (el) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate('.fse-pipe-arrow', {
            opacity: [0, 1],
            translateX: [-10, 0],
            duration: 400,
            delay: stagger(400, { start: 600 }),
            ease: 'outQuad',
          })
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.3 })
    observer.observe(el)
  }

  // Data pipeline stroke-dashoffset animation
  const pipeLines = document.querySelectorAll<SVGLineElement>('.fse-pipe-line')
  pipeLines.forEach((line) => {
    const length = 100
    line.style.strokeDasharray = String(length)
    line.style.strokeDashoffset = String(length)
  })

  if (pipelineRef.value) {
    const pipeObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const allLines = document.querySelectorAll<SVGLineElement>('.fse-pipe-line')
          allLines.forEach((line, i) => {
            setTimeout(() => {
              line.style.transition = 'stroke-dashoffset 0.6s ease'
              line.style.strokeDashoffset = '0'
            }, i * 400)
          })
          pipeObs.disconnect()
        }
      })
    }, { threshold: 0.3 })
    pipeObs.observe(pipelineRef.value)
  }
})

interface ComplianceRow {
  standard: string
  scope: string
  status: string
  auditor: string
  certified: boolean
}

const complianceRows: ComplianceRow[] = [
  { standard: 'PCI DSS Level 1', scope: 'Payment processing', status: 'Certified (demo)', auditor: 'QSA Assessor', certified: true },
  { standard: 'ISO 27001',       scope: 'Information security', status: 'Certified (demo)', auditor: 'BSI Group', certified: true },
  { standard: 'SOC 2 Type II',   scope: 'Data handling', status: 'Certified (demo)', auditor: 'KPMG', certified: true },
  { standard: 'MiCA',            scope: 'Crypto assets', status: 'Compliant (demo)', auditor: 'Internal + Legal', certified: false },
  { standard: 'GDPR',            scope: 'Data privacy', status: 'Compliant', auditor: 'DPO reviewed', certified: false },
]

interface EncryptionItem {
  label: string
  value: string
}

const encryptionItems: EncryptionItem[] = [
  { label: 'Data at rest', value: 'AES-256-GCM · AWS KMS key management' },
  { label: 'Data in transit', value: 'TLS 1.3 minimum · HSTS enforced · certificate pinning' },
  { label: 'API authentication', value: 'HMAC-SHA256 request signing · API key rotation every 90 days' },
  { label: 'Webhook signatures', value: 'HMAC-SHA256 in X-Prodigy-Signature header · replay protection (5 min window)' },
  { label: 'Database encryption', value: 'Field-level encryption for PII · transparent disk encryption' },
  { label: 'Key management', value: 'AWS KMS + HSM · no plaintext key material on disk' },
]

interface KycStep {
  num: string
  step: string
  duration: string
  output: string
}

const kycSteps: KycStep[] = [
  { num: '01', step: 'Document Scan', duration: '~18s', output: 'Document type + validity' },
  { num: '02', step: 'Liveness Detection', duration: '~12s', output: 'Signed liveness token' },
  { num: '03', step: 'Sanctions Screening', duration: '~17s', output: 'OFAC / UN / EU / HMT result' },
]

interface AuditRow {
  field: string
  desc: string
  ret: string
}

const auditRows: AuditRow[] = [
  { field: 'transaction_id', desc: 'Unique UUID generated at widget initialisation', ret: '7 years' },
  { field: 'timestamp_utc',  desc: 'ISO 8601 at each state transition', ret: '7 years' },
  { field: 'amount_eur',     desc: 'Fiat amount at initiation and settlement', ret: '7 years' },
  { field: 'kyc_status',     desc: 'Pass / Fail / Manual review with reason code', ret: '5 years' },
  { field: 'risk_score',     desc: 'Composite score from 12 checks (0–100)', ret: '5 years' },
  { field: 'partner_id',     desc: 'Identifier of the embedding partner', ret: '7 years' },
  { field: 'fee_breakdown',  desc: 'Platform fee, partner share, network fee — itemised', ret: '7 years' },
  { field: 'outcome',        desc: 'Settled / Rejected / Refunded', ret: '7 years' },
]

const riskChecks: string[] = [
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
.ft-security {
  --bg: #fafaf8;
  --ink: #0a0a0a;
  --accent: #b85c00;
  --ok: #1a7a1a;
  --muted: rgba(10,10,10,0.45);
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

/* Sysbar */
.ft-sysbar {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.45rem 2rem;
  font-size: 0.7rem;
  letter-spacing: 0.07em;
}
.ft-sysbar-dot { opacity: 0.4; }
.ft-status em { font-style: normal; color: var(--ok); font-weight: 700; }

/* Hero */
.ft-hero {
  padding: 3rem 2rem 2.5rem;
  max-width: 860px;
}
.ft-hero-label {
  font-size: 0.7rem;
  color: var(--muted);
  letter-spacing: 0.08em;
  margin-bottom: 1rem;
}
.ft-headline {
  font-family: var(--font);
  font-size: clamp(1.4rem, 3.5vw, 2.25rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0.02em;
  margin: 0 0 1.25rem;
}
.ft-subhead {
  font-size: 0.85rem;
  line-height: 1.75;
  color: var(--ink);
  opacity: 0.7;
  margin: 0 0 2rem;
  max-width: 60ch;
}
.ft-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

/* Sections */
.ft-section {
  padding: 1.5rem 2rem;
}
.ft-section-label {
  font-size: 0.68rem;
  color: var(--muted);
  letter-spacing: 0.09em;
  margin-bottom: 0.75rem;
}
.ft-body-text {
  font-size: 0.8rem;
  line-height: 1.75;
  opacity: 0.75;
  margin: 0 0 1.25rem;
  max-width: 72ch;
}

/* Tables */
.ft-table-wrap { overflow-x: auto; }
.ft-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.78rem;
}
.ft-table th {
  text-align: left;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  color: var(--muted);
  border-bottom: 1px solid var(--ink);
  padding: 0.4rem 0.8rem;
  white-space: nowrap;
}
.ft-table td {
  padding: 0.55rem 0.8rem;
  border-bottom: 1px solid rgba(10,10,10,0.1);
  vertical-align: top;
  line-height: 1.5;
}
.ft-table tbody tr:hover td { background: rgba(10,10,10,0.03); }
.ft-field { font-weight: 700; font-size: 0.75rem; }
.ft-value { color: var(--accent); font-weight: 700; }
.ft-ok { color: var(--ok); font-weight: 700; }
.ft-compliant { color: #1a4480; font-weight: 700; }
.ft-muted { color: var(--muted); }
.ft-num { color: var(--muted); font-size: 0.68rem; }
.ft-footnote { margin-top: 0.75rem; font-size: 0.68rem; color: var(--muted); }

/* Spec grid */
.ft-spec-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-size: 0.76rem;
  border: 1px solid rgba(10,10,10,0.15);
}
.ft-spec-row {
  display: grid;
  grid-template-columns: 14rem 1fr 7rem;
  gap: 1rem;
  align-items: baseline;
  padding: 0.5rem 0.8rem;
  border-bottom: 1px solid rgba(10,10,10,0.08);
  background: var(--bg);
}
.ft-spec-row--alt { background: rgba(10,10,10,0.03); }
.ft-spec-key { color: var(--muted); font-size: 0.7rem; letter-spacing: 0.04em; flex-shrink: 0; }
.ft-spec-val { font-weight: 700; }
.ft-spec-status { font-size: 0.68rem; text-align: right; }

/* Risk grid */
.ft-risk-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border: 1px solid rgba(10,10,10,0.15);
}
.ft-risk-item {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  padding: 0.875rem 1rem;
  font-size: 0.78rem;
  border-right: 1px solid rgba(10,10,10,0.1);
  border-bottom: 1px solid rgba(10,10,10,0.1);
  line-height: 1.5;
}
.ft-risk-item:nth-child(3n) { border-right: none; }
.ft-risk-item:nth-last-child(-n+3) { border-bottom: none; }
.ft-risk-bullet { flex-shrink: 0; font-size: 0.7rem; margin-top: 1px; }

/* Flow */
.ft-flow-wrap {
  max-width: 860px;
  padding: 1rem 0;
}

/* Buttons */
.ft-btn {
  font-family: var(--font);
  font-size: 0.75rem;
  letter-spacing: 0.09em;
  font-weight: 700;
  text-decoration: none;
  padding: 0.55rem 1.2rem;
  border: 1px solid;
  display: inline-block;
  transition: background 0.15s, color 0.15s;
}
.ft-btn--primary { background: var(--accent); border-color: var(--accent); color: var(--bg); }
.ft-btn--primary:hover { background: var(--ink); border-color: var(--ink); }
.ft-btn--ghost { background: transparent; border-color: var(--ink); color: var(--ink); }
.ft-btn--ghost:hover { background: var(--ink); color: var(--bg); }
.ft-btn--lg { font-size: 0.8rem; padding: 0.7rem 1.6rem; }

/* CTA */
.ft-cta { padding: 2.5rem 2rem; }
.ft-cta-label { font-size: 0.68rem; color: var(--muted); letter-spacing: 0.09em; margin-bottom: 1rem; }
.ft-cta-body { font-size: 0.82rem; line-height: 1.75; margin: 0 0 1.5rem; opacity: 0.75; max-width: 60ch; }
.ft-cta-actions { display: flex; flex-wrap: wrap; gap: 1rem; }

/* Footer */
.ft-footer {
  display: flex; flex-wrap: wrap; align-items: center; gap: 0.6rem;
  padding: 0.6rem 2rem; font-size: 0.68rem; letter-spacing: 0.07em; color: var(--muted);
}
.ft-footer-link { color: var(--muted); text-decoration: underline; text-underline-offset: 2px; }
.ft-footer-link:hover { color: var(--accent); }

/* Responsive */
@media (max-width: 900px) {
  .ft-spec-grid { grid-template-columns: 1fr; }
  .ft-spec-row { grid-template-columns: 12rem 1fr; }
  .ft-spec-status { display: none; }
  .ft-risk-grid { grid-template-columns: repeat(2, 1fr); }
  .ft-risk-item:nth-child(3n) { border-right: 1px solid rgba(10,10,10,0.1); }
  .ft-risk-item:nth-child(2n) { border-right: none; }
  .ft-risk-item:nth-last-child(-n+3) { border-bottom: 1px solid rgba(10,10,10,0.1); }
  .ft-risk-item:nth-last-child(-n+2) { border-bottom: none; }
}

@media (max-width: 768px) {
  .ft-hero, .ft-section, .ft-cta, .ft-footer { padding-left: 1rem; padding-right: 1rem; }
  .ft-sysbar { padding: 0.4rem 1rem; flex-wrap: wrap; }
}

@media (max-width: 600px) {
  .ft-risk-grid { grid-template-columns: 1fr; }
  .ft-risk-item { border-right: none; border-bottom: 1px solid rgba(10,10,10,0.1); }
  .ft-risk-item:last-child { border-bottom: none; }
  .ft-spec-row { grid-template-columns: 1fr; gap: 0.25rem; }
}

@media (prefers-reduced-motion: reduce) {
  .ft-btn { transition: none; }
}

/* ─── Sub-Processor & SLA ─── */
.fse-sla__pre {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.82rem;
  line-height: 1.85;
  background: #0a0d12;
  border: 1px solid rgba(245, 158, 11, 0.25);
  padding: 1.25rem 1.5rem;
  overflow-x: auto;
  margin: 0.75rem 0 0;
  color: rgba(245, 158, 11, 0.6);
}

.fse-sla-k { color: rgba(245, 158, 11, 0.55); font-weight: 700; }
.fse-sla-sep { color: rgba(245, 158, 11, 0.3); }
.fse-sla-v { color: #f59e0b; font-weight: 700; }
.fse-sla-ok { color: #4ade80; font-weight: 700; }

/* ─── Data Pipeline Diagram ─── */
.fse-pipeline-section {
  background: #080b0f;
}

.fse-pipeline {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0;
  margin-top: 1.25rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.fse-pnode {
  flex-shrink: 0;
}

.fse-pnode__box {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #f59e0b;
  border: 1px solid rgba(245, 158, 11, 0.5);
  padding: 0.875rem 1.25rem;
  background: rgba(245, 158, 11, 0.04);
  white-space: nowrap;
}

.fse-pnode__box--final {
  border-color: #4ade80;
  color: #4ade80;
  background: rgba(74, 222, 128, 0.04);
}

.fse-pipe-seg {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.fse-pipe-svg {
  width: 120px;
  height: 40px;
}

.fse-pipe-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.08em;
  color: rgba(245, 158, 11, 0.4);
  margin-top: -8px;
}

/* ─── Compliance Status Panel ─── */
.fse-compliance-section {
  background: #0e1318;
}

.fse-compliance-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border: 1px solid rgba(245, 158, 11, 0.3);
  margin-top: 1rem;
}

.fse-compliance-card {
  padding: 1.75rem 1.5rem;
  border-right: 1px solid rgba(245, 158, 11, 0.2);
  border-bottom: 1px solid rgba(245, 158, 11, 0.2);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: rgba(245, 158, 11, 0.02);
  transition: background 0.15s;
}

.fse-compliance-card:hover {
  background: rgba(245, 158, 11, 0.05);
}

.fse-compliance-card:nth-child(3n) { border-right: none; }
.fse-compliance-card:nth-last-child(-n+3) { border-bottom: none; }

.fse-compliance-check {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 1.5rem;
  font-weight: 700;
  color: #4ade80;
  line-height: 1;
}

.fse-compliance-name {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #f59e0b;
}

.fse-compliance-status {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  color: rgba(74, 222, 128, 0.7);
  font-weight: 700;
}

.fse-compliance-disclaimer {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.68rem;
  line-height: 1.7;
  color: rgba(245, 158, 11, 0.35);
  margin: 1rem 0 0;
  border-left: 2px solid rgba(245, 158, 11, 0.2);
  padding-left: 0.75rem;
}

@media (max-width: 900px) {
  .fse-compliance-grid { grid-template-columns: repeat(2, 1fr); }
  .fse-compliance-card:nth-child(3n) { border-right: 1px solid rgba(245,158,11,0.2); }
  .fse-compliance-card:nth-child(2n) { border-right: none; }
  .fse-compliance-card:nth-last-child(-n+3) { border-bottom: 1px solid rgba(245,158,11,0.2); }
  .fse-compliance-card:nth-last-child(-n+2) { border-bottom: none; }
  .fse-pipeline { flex-direction: column; align-items: flex-start; }
  .fse-pipe-svg { transform: rotate(90deg); }
}

@media (max-width: 580px) {
  .fse-compliance-grid { grid-template-columns: 1fr; }
  .fse-compliance-card { border-right: none !important; border-bottom: 1px solid rgba(245,158,11,0.2) !important; }
  .fse-compliance-card:last-child { border-bottom: none !important; }
}

/* ─── KYC Pipeline ─── */
.fse-kyc-pipeline { display: flex; align-items: center; gap: 0.5rem; font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; flex-wrap: wrap; margin: 1.5rem 0 0; }
.fse-pipe-step { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; opacity: 0; animation: pipe-appear 0.3s ease forwards; }
.fse-ps-1 { animation-delay: 0.3s; }
.fse-ps-2 { animation-delay: 0.8s; }
.fse-ps-3 { animation-delay: 1.3s; }
.fse-ps-4 { animation-delay: 1.8s; }
.fse-pipe-icon { width: 40px; height: 40px; border: 1px solid rgba(245,158,11,0.4); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 1rem; color: rgba(245,158,11,0.6); background: rgba(245,158,11,0.04); }
.fse-ps--approved .fse-pipe-icon { border-color: rgba(74,222,128,0.5); color: #4ade80; background: rgba(74,222,128,0.06); }
.fse-pipe-lbl { color: rgba(245,158,11,0.5); letter-spacing: 0.05em; font-size: 0.6875rem; }
.fse-ps--approved .fse-pipe-lbl { color: rgba(74,222,128,0.7); }
.fse-pipe-arrow { color: rgba(245,158,11,0.3); font-size: 0.75rem; opacity: 0; animation: pipe-appear 0.2s ease forwards; }
.fse-pa-1 { animation-delay: 0.55s; }
.fse-pa-2 { animation-delay: 1.05s; }
.fse-pa-3 { animation-delay: 1.55s; }
@keyframes pipe-appear { to { opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .fse-pipe-step, .fse-pipe-arrow { animation: none; opacity: 1; } }

/* ── Shield SVG ── */
.ft-shield-section { padding: 2.5rem 2rem; }
.ft-shield-inner { display: grid; grid-template-columns: 1fr auto; gap: 4rem; align-items: center; max-width: 1200px; margin: 0 auto; }
.ft-shield-copy { display: flex; flex-direction: column; gap: 0.5rem; }
.ft-shield-vis { display: flex; justify-content: center; align-items: center; }
.shield-outer { animation: shield-outer-anim 4s ease-in-out infinite; }
.shield-mid { animation: shield-mid-anim 3s ease-in-out 0.5s infinite; }
.shield-inner-path { animation: shield-inner-anim 2.5s ease-in-out 1s infinite; }
@keyframes shield-outer-anim { 0%,100%{opacity:0.3} 50%{opacity:0.7} }
@keyframes shield-mid-anim { 0%,100%{opacity:0.5} 50%{opacity:0.9} }
@keyframes shield-inner-anim { 0%,100%{opacity:0.7} 50%{opacity:1} }
@media (max-width: 700px) {
  .ft-shield-inner { grid-template-columns: 1fr; }
  .ft-shield-vis { padding-top: 1.5rem; }
}
@media (prefers-reduced-motion: reduce) {
  .shield-outer, .shield-mid, .shield-inner-path { animation: none; opacity: 1; }
}
</style>
