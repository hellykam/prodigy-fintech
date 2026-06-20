<template>
  <div class="crypto-page">

    <!-- ── Hero ─────────────────────────────────────────────────── -->
    <section class="hero" aria-labelledby="sec-headline">
      <div class="grid-dots" aria-hidden="true" />
      <div class="section-inner">
        <p class="eyebrow">COMPLIANCE &amp; SECURITY</p>
        <h1 id="sec-headline" class="hero-headline glitch" data-text="THE SECURITY PAGE. YES, WE HAVE ONE.">
          THE SECURITY PAGE.<br /><span class="cyan">YES, WE HAVE ONE.</span>
        </h1>
        <p class="hero-sub">Most crypto infrastructure hides its security posture behind NDAs and marketing language. We put ours on a page.</p>
        <div class="cs-shield-vis" aria-hidden="true">
          <div class="cs-shield">
            <svg viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg" class="cs-shield-svg">
              <path d="M40 4 L72 16 L72 44 C72 62 57 77 40 84 C23 77 8 62 8 44 L8 16 Z" stroke="#00ffb2" stroke-width="1.5" fill="none" stroke-dasharray="220" stroke-dashoffset="220" class="cs-shield-path"/>
              <polyline points="24,46 34,56 56,34" stroke="#00ffb2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="50" stroke-dashoffset="50" class="cs-check-path"/>
            </svg>
            <div class="cs-ring cs-ring-1"></div>
            <div class="cs-ring cs-ring-2"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── KYC Architecture ──────────────────────────────────────── -->
    <section class="section-dark" aria-labelledby="kyc-h">
      <div class="section-inner">
        <p class="eyebrow">KYC ARCHITECTURE</p>
        <h2 id="kyc-h" class="section-headline">IDENTITY VERIFICATION IN <span class="cyan">THREE STEPS</span></h2>
        <p class="section-sub">Every first-time user passes through this flow inside the widget. 47 seconds average. Nothing deferred. Nothing optional.</p>
        <div class="kyc-steps" data-animate-stagger>
          <div v-for="(step, i) in kycSteps" :key="i" class="kyc-step">
            <div class="step-num">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="step-connector" aria-hidden="true" v-if="i < kycSteps.length - 1" />
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-detail">{{ step.detail }}</p>
            <div class="step-tags">
              <span class="tag">{{ step.duration }}</span>
              <span class="tag tag--cyan">{{ step.result }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Shield Illustration ──────────────────────────────────── -->
    <section class="shield-section" aria-labelledby="cp-shield-h" data-reveal="fade-up">
      <div class="section-inner shield-inner">
        <div class="shield-copy">
          <p class="eyebrow">// SECURITY_LAYERS</p>
          <h2 id="cp-shield-h" class="section-headline">LAYERED DEFENCE.<br /><span class="cyan">AT EVERY LEVEL.</span></h2>
          <p class="section-sub">Three concentric security layers: infrastructure, compliance, and transaction-level controls. Each monitors the others.</p>
        </div>
        <div class="shield-vis" aria-hidden="true">
          <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg"
               width="220" height="257" preserveAspectRatio="xMidYMid meet"
               aria-hidden="true" role="img" class="shield-svg">
            <path class="shield-outer" d="M60,8 L108,28 L108,72 C108,100 60,128 60,128 C60,128 12,100 12,72 L12,28 Z"
                  fill="rgba(0,255,178,0.04)" stroke="#00ffb2" stroke-width="1.5" />
            <path class="shield-mid" d="M60,19.8 L97.8,36.8 L97.8,73.2 C97.8,97.5 60,121.7 60,121.7 C60,121.7 22.2,97.5 22.2,73.2 L22.2,36.8 Z"
                  fill="rgba(0,255,178,0.07)" stroke="#00ffb2" stroke-width="1.5" />
            <path class="shield-inner-path" d="M60,31.6 L87.6,45.6 L87.6,74.4 C87.6,94.8 60,115.4 60,115.4 C60,115.4 32.4,94.8 32.4,74.4 L32.4,45.6 Z"
                  fill="rgba(0,255,178,0.12)" stroke="#00ffb2" stroke-width="1.5" />
            <text x="60" y="84" text-anchor="middle" font-size="22" fill="#00ffb2">🔒</text>
          </svg>
        </div>
      </div>
    </section>

    <!-- ── Audit Trail ──────────────────────────────────────────── -->
    <section class="section-mid" aria-labelledby="audit-h">
      <div class="section-inner">
        <p class="eyebrow">AUDIT TRAIL</p>
        <h2 id="audit-h" class="section-headline">EVERY TRANSACTION. <span class="cyan">FULLY LOGGED.</span></h2>
        <p class="section-sub">Your regulator will find everything they're looking for. The audit trail is immutable from the moment the widget initialises.</p>
        <div class="audit-table" role="table" aria-label="Audit trail fields" data-reveal="fade-left">
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
    <section class="section-dark" aria-labelledby="data-h">
      <div class="section-inner">
        <p class="eyebrow">DATA HANDLING</p>
        <h2 id="data-h" class="section-headline">WHAT WE COLLECT. <span class="purple">AND WHY.</span></h2>
        <div class="data-grid" data-animate-stagger>
          <div v-for="item in dataItems" :key="item.label" class="data-card">
            <p class="data-label">{{ item.label }}</p>
            <p class="data-value">{{ item.value }}</p>
            <p class="data-detail">{{ item.detail }}</p>
          </div>
        </div>
        <p class="gdpr-note">GDPR-aligned. EU-hosted infrastructure. AML retention: 5 years post-last transaction.</p>
      </div>
    </section>

    <!-- ── Risk Engine ───────────────────────────────────────────── -->
    <section class="section-mid" aria-labelledby="risk-h">
      <div class="section-inner">
        <p class="eyebrow">RISK ENGINE</p>
        <h2 id="risk-h" class="section-headline"><span class="cyan">12 AUTOMATED CHECKS.</span> EVERY TRANSACTION.</h2>
        <p class="section-sub">Under 400ms. Anything that doesn't pass automatically enters the manual review queue in the admin console.</p>
        <ul class="risk-grid" role="list" data-animate-stagger>
          <li v-for="check in riskChecks" :key="check" class="risk-chip">
            <span class="chip-bullet" aria-hidden="true">◈</span>{{ check }}
          </li>
        </ul>
        <div class="risk-cta-row">
          <a href="http://localhost:5002" target="_blank" rel="noopener noreferrer" class="btn-secondary">View manual review queue →</a>
        </div>
      </div>
    </section>

    <!-- ── Security FAQ ──────────────────────────────────────────── -->
    <section class="section-dark" aria-labelledby="sec-faq-h">
      <div class="section-inner">
        <p class="eyebrow">SECURITY FAQ</p>
        <h2 id="sec-faq-h" class="section-headline">QUESTIONS WE <span class="cyan">ACTUALLY GET</span></h2>
        <div class="sec-faq-list" role="list">
          <details v-for="faq in securityFaqs" :key="faq.q" class="sec-faq-item" role="listitem">
            <summary class="sec-faq-q">{{ faq.q }}</summary>
            <p class="sec-faq-a">{{ faq.a }}</p>
          </details>
        </div>
      </div>
    </section>

    <!-- ── Compliance Grid ───────────────────────────────────────── -->
    <section class="section-mid compliance-grid-section" aria-labelledby="compliance-grid-h" data-reveal="fade-up">
      <div class="section-inner">
        <p class="eyebrow">COUNTRY COVERAGE</p>
        <h2 id="compliance-grid-h" class="section-headline">ACTIVE IN <span class="cyan">24 MARKETS.</span></h2>
        <p class="section-sub">Each cell represents an active compliance registration. New markets onboard quarterly.</p>
        <div class="compliance-cells" data-animate-stagger aria-label="Country compliance grid">
          <div v-for="code in countryCodes" :key="code" class="compliance-cell">{{ code }}</div>
        </div>
      </div>
    </section>

    <!-- ── Chain of Trust ───────────────────────────────────────── -->
    <section class="section-dark chain-section" aria-labelledby="chain-h" data-reveal="fade-up">
      <div class="section-inner">
        <p class="eyebrow">TRUST ARCHITECTURE</p>
        <h2 id="chain-h" class="section-headline">THE <span class="cyan">CHAIN OF TRUST.</span></h2>
        <p class="section-sub">Every transaction flows through three verified layers before settlement occurs.</p>
        <div class="chain-wrap" ref="chainWrapRef" role="img" aria-label="Chain of trust: API to KYC Engine to Settlement">
          <svg class="chain-svg" viewBox="0 0 500 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <!-- Boxes -->
            <rect x="10" y="20" width="120" height="40" rx="3" stroke="#00ffb2" stroke-width="1.5" fill="rgba(0,255,178,0.04)" />
            <text x="70" y="44" class="chain-label">API LAYER</text>
            <rect x="190" y="20" width="120" height="40" rx="3" stroke="#00ffb2" stroke-width="1.5" fill="rgba(0,255,178,0.04)" />
            <text x="250" y="44" class="chain-label">KYC ENGINE</text>
            <rect x="370" y="20" width="120" height="40" rx="3" stroke="#00ffb2" stroke-width="1.5" fill="rgba(0,255,178,0.04)" />
            <text x="430" y="44" class="chain-label">SETTLEMENT</text>
            <!-- Arrows -->
            <line x1="130" y1="40" x2="188" y2="40" stroke="#00ffb2" stroke-width="1.5" class="chain-arrow chain-arrow--1" />
            <polyline points="182,34 190,40 182,46" stroke="#00ffb2" stroke-width="1.5" fill="none" class="chain-arrowhead chain-arrowhead--1"/>
            <line x1="310" y1="40" x2="368" y2="40" stroke="#00ffb2" stroke-width="1.5" class="chain-arrow chain-arrow--2" />
            <polyline points="362,34 370,40 362,46" stroke="#00ffb2" stroke-width="1.5" fill="none" class="chain-arrowhead chain-arrowhead--2"/>
          </svg>
        </div>
      </div>
    </section>

    <!-- ── CTA ──────────────────────────────────────────────────── -->
    <section class="cta-section" aria-labelledby="cta-h">
      <div class="section-inner cta-inner">
        <h2 id="cta-h" class="cta-headline">SEE THE <span class="cyan">AUDIT TRAIL</span> LIVE.</h2>
        <p class="cta-sub">Every log entry. Every KYC event. Every risk score. All visible in the admin console.</p>
        <div class="cta-btns">
          <a href="http://localhost:5001" target="_blank" rel="noopener noreferrer" class="btn-primary">Open Demo →</a>
          <a href="http://localhost:5002" target="_blank" rel="noopener noreferrer" class="btn-ghost">Admin Console →</a>
          <RouterLink to="/crypto/developers" class="btn-ghost">Integration Docs</RouterLink>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// ── Compliance Grid ──────────────────────────────────────────────
const countryCodes = ['DE', 'UK', 'US', 'NL', 'FR', 'SG', 'CH', 'AT', 'IE', 'CA', 'AU', 'HK', 'ES', 'IT', 'BR', 'MX', 'AE', 'JP', 'IN', 'KR', 'PL', 'SE', 'DK', 'NO']

// ── Chain of trust ────────────────────────────────────────────────
const chainWrapRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!chainWrapRef.value) return
  const arrows = chainWrapRef.value.querySelectorAll<SVGLineElement>('.chain-arrow')
  const arrowheads = chainWrapRef.value.querySelectorAll<SVGPolylineElement>('.chain-arrowhead')

  arrows.forEach(a => {
    const len = (a as SVGGeometryElement).getTotalLength?.() ?? 60
    a.style.strokeDasharray = `${len}`
    a.style.strokeDashoffset = `${len}`
  })
  arrowheads.forEach(a => {
    a.style.opacity = '0'
  })

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        arrows.forEach((a, i) => {
          setTimeout(() => {
            a.style.transition = 'stroke-dashoffset 0.6s ease'
            a.style.strokeDashoffset = '0'
          }, i * 400)
        })
        arrowheads.forEach((a, i) => {
          setTimeout(() => {
            a.style.transition = 'opacity 0.3s ease'
            a.style.opacity = '1'
          }, i * 400 + 500)
        })
        obs.disconnect()
      }
    })
  }, { threshold: 0.3 })
  obs.observe(chainWrapRef.value)
})

const securityFaqs = [
  {
    q: 'Where is user data stored?',
    a: 'EU primary (Frankfurt), US-East secondary. Enterprise plans support custom data residency to meet local regulatory requirements.',
  },
  {
    q: 'Do you store card numbers?',
    a: 'No. We are PCI DSS Level 1 scoped. Raw PANs never touch our infrastructure — tokenisation happens at the payment gateway before data reaches us.',
  },
  {
    q: 'Can I bring my own KYC provider?',
    a: 'Yes on Enterprise. The API supports a BYO identity provider. Your existing KYC vendor can be integrated via our identity provider interface.',
  },
  {
    q: 'Do you have a bug bounty programme?',
    a: 'Yes. Our responsible disclosure policy is published at security.prodigy.example. We pay researchers for valid reports on a tiered severity scale.',
  },
]

const kycSteps = [
  {
    title: 'Document Scan',
    detail: 'Government-issued ID captured via device camera. OCR-parsed and cross-referenced against issuing authority format database. Expired documents rejected instantly. No image stored on client device.',
    duration: '~18 seconds',
    result: 'Document type + result logged',
  },
  {
    title: 'Liveness Check',
    detail: 'Passive liveness detection confirms the user is physically present. Model runs in-browser via WebAssembly. No video transmitted to servers — only a signed liveness token. Cannot be spoofed with a photograph.',
    duration: '~12 seconds',
    result: 'Liveness score logged',
  },
  {
    title: 'Sanctions Screening',
    detail: 'Name, date of birth, and nationality cross-referenced against OFAC, UN, EU, HMT sanctions lists and one PEP database. Results returned in real time. Matches enter manual review. Non-matches proceed immediately.',
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
  { label: 'Retention period', value: '5 years post-last transaction', detail: 'AML retention requirement. Shorter where legally permitted.' },
  { label: 'Data location', value: 'EU-hosted (Frankfurt)', detail: 'All personal data remains within the EEA. No US transfers without SCCs.' },
  { label: 'Access control', value: 'KYC team, admin users, regulators on request', detail: 'Partners see pass/fail only. No third-party marketing access ever.' },
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
.crypto-page {
  background: #050510;
  color: #e8eaff;
  min-height: 100vh;
}

.section-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 5rem clamp(1rem, 4vw, 2rem);
}

.grid-dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(0,245,255,0.06) 1px, transparent 1px);
  background-size: 28px 28px;
  pointer-events: none;
}

/* Hero */
.hero {
  position: relative;
  border-bottom: 1px solid rgba(0,245,255,0.12);
  overflow: hidden;
  padding: 2rem 0;
}
.eyebrow {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  color: #00f5ff;
  text-transform: uppercase;
  margin: 0 0 1.5rem;
}
.hero-headline {
  font-family: 'Space Mono', monospace;
  font-size: clamp(1.75rem, 4vw, 3.25rem);
  font-weight: 700;
  line-height: 1.1;
  margin: 0 0 1.5rem;
  text-transform: uppercase;
  letter-spacing: -0.01em;
}
.hero-sub {
  font-family: 'Space Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.75;
  color: rgba(232,234,255,0.7);
  max-width: 52ch;
  margin: 0;
}
.cyan { color: #00f5ff; text-shadow: 0 0 16px rgba(0,245,255,0.4); }
.purple { color: #a855f7; text-shadow: 0 0 16px rgba(168,85,247,0.4); }

/* Sections */
.section-dark { border-bottom: 1px solid rgba(0,245,255,0.08); }
.section-mid { background: rgba(255,255,255,0.02); border-bottom: 1px solid rgba(0,245,255,0.08); }
.section-headline {
  font-family: 'Space Mono', monospace;
  font-size: clamp(1.25rem, 3vw, 2.25rem);
  font-weight: 700;
  line-height: 1.15;
  text-transform: uppercase;
  margin: 0 0 1.5rem;
  letter-spacing: -0.01em;
}
.section-sub {
  font-family: 'Space Mono', monospace;
  font-size: 0.8125rem;
  line-height: 1.75;
  color: rgba(232,234,255,0.65);
  max-width: 56ch;
  margin: 0 0 2.5rem;
}

/* KYC steps */
.kyc-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
.kyc-step {
  background: rgba(0,245,255,0.03);
  border: 1px solid rgba(0,245,255,0.15);
  padding: 1.75rem;
  display: flex; flex-direction: column; gap: 0.75rem;
  position: relative;
}
.step-num {
  font-family: 'Space Mono', monospace;
  font-size: 2rem;
  font-weight: 700;
  color: rgba(0,245,255,0.3);
  line-height: 1;
}
.step-title {
  font-family: 'Space Mono', monospace;
  font-size: 0.9375rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
  color: #e8eaff;
}
.step-detail {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  line-height: 1.75;
  color: rgba(232,234,255,0.65);
  margin: 0;
}
.step-tags { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: auto; }
.tag {
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border: 1px solid rgba(232,234,255,0.2);
  color: rgba(232,234,255,0.6);
  letter-spacing: 0.05em;
}
.tag--cyan { border-color: rgba(0,245,255,0.3); color: #00f5ff; }

/* Audit table */
.audit-table { border: 1px solid rgba(0,245,255,0.15); }
.audit-head {
  display: grid; grid-template-columns: 12rem 1fr 6rem;
  background: rgba(0,245,255,0.08);
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #00f5ff;
  padding: 0.75rem 1rem;
  gap: 1rem;
}
.audit-row {
  display: grid; grid-template-columns: 12rem 1fr 6rem;
  padding: 0.875rem 1rem;
  gap: 1rem;
  border-top: 1px solid rgba(0,245,255,0.08);
  font-family: 'Space Mono', monospace;
  font-size: 0.8125rem;
  transition: background 0.15s;
  align-items: start;
}
.audit-row:hover { background: rgba(0,245,255,0.04); }
.field-name { font-size: 0.75rem; font-weight: 700; color: #00f5ff; word-break: break-all; }
.field-desc { font-size: 0.8125rem; color: rgba(232,234,255,0.7); line-height: 1.5; }
.field-ret { font-size: 0.75rem; color: rgba(232,234,255,0.45); }

/* Data grid */
.data-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}
.data-card {
  border: 1px solid rgba(0,245,255,0.12);
  padding: 1.5rem;
  background: rgba(0,245,255,0.02);
  display: flex; flex-direction: column; gap: 0.5rem;
}
.data-label { font-family: 'Space Mono', monospace; font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(232,234,255,0.5); margin: 0; }
.data-value { font-family: 'Space Mono', monospace; font-size: 0.875rem; font-weight: 700; color: #e8eaff; margin: 0; }
.data-detail { font-family: 'Space Mono', monospace; font-size: 0.75rem; line-height: 1.65; color: rgba(232,234,255,0.55); margin: 0; }
.gdpr-note { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: rgba(232,234,255,0.45); border-left: 2px solid rgba(0,245,255,0.3); padding-left: 1rem; line-height: 1.7; }

/* Risk grid */
.risk-grid { list-style: none; margin: 0 0 2rem; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
.risk-chip {
  display: flex; align-items: flex-start; gap: 0.625rem;
  font-family: 'Space Mono', monospace; font-size: 0.8125rem;
  color: rgba(232,234,255,0.8); line-height: 1.5;
  padding: 0.875rem 1rem;
  border: 1px solid rgba(0,245,255,0.1);
  background: rgba(0,245,255,0.02);
}
.chip-bullet { color: #00f5ff; flex-shrink: 0; font-size: 0.75rem; margin-top: 2px; }
.risk-cta-row { display: flex; }

/* CTA */
.cta-section {
  background: linear-gradient(135deg, rgba(0,245,255,0.05), rgba(168,85,247,0.05));
  border-top: 1px solid rgba(0,245,255,0.12);
}
.cta-inner { display: flex; flex-direction: column; align-items: flex-start; gap: 1.5rem; }
.cta-headline { font-family: 'Space Mono', monospace; font-size: clamp(1.5rem, 3.5vw, 2.75rem); font-weight: 700; text-transform: uppercase; margin: 0; line-height: 1.1; }
.cta-sub { font-family: 'Space Mono', monospace; font-size: 0.8125rem; color: rgba(232,234,255,0.65); line-height: 1.75; margin: 0; max-width: 52ch; }
.cta-btns { display: flex; gap: 1rem; flex-wrap: wrap; }

.btn-primary {
  font-family: 'Space Mono', monospace; font-size: 0.8125rem; font-weight: 700;
  letter-spacing: 0.06em; color: #050510; background: #00f5ff;
  text-decoration: none; padding: 0.875rem 1.75rem;
  border: none; transition: background 0.2s, box-shadow 0.2s;
  display: inline-block;
}
.btn-primary:hover { background: #ffffff; box-shadow: 0 0 24px rgba(0,245,255,0.4); }
.btn-ghost {
  font-family: 'Space Mono', monospace; font-size: 0.8125rem; font-weight: 700;
  letter-spacing: 0.06em; color: #00f5ff;
  text-decoration: none; padding: 0.875rem 1.75rem;
  border: 1px solid rgba(0,245,255,0.4); transition: border-color 0.2s, color 0.2s;
  display: inline-block;
}
.btn-ghost:hover { border-color: #00f5ff; color: #ffffff; }
.btn-secondary {
  font-family: 'Space Mono', monospace; font-size: 0.8125rem;
  letter-spacing: 0.06em; color: rgba(232,234,255,0.7);
  text-decoration: none; padding: 0.625rem 1rem;
  border: 1px solid rgba(232,234,255,0.2); transition: border-color 0.2s, color 0.2s;
  display: inline-block;
}
.btn-secondary:hover { border-color: rgba(232,234,255,0.5); color: #e8eaff; }

@media (max-width: 900px) {
  .kyc-steps { grid-template-columns: 1fr; }
  .data-grid { grid-template-columns: 1fr; }
  .risk-grid { grid-template-columns: repeat(2, 1fr); }
  .audit-head, .audit-row { grid-template-columns: 10rem 1fr; }
  .audit-head span:last-child, .audit-row span:last-child { display: none; }
}

@media (max-width: 600px) {
  .risk-grid { grid-template-columns: 1fr; }
}

/* ── Shield illustration ──────────────────────────────────────── */
.cs-shield-vis { display: flex; justify-content: center; padding: 2rem 0; }
.cs-shield { position: relative; width: 120px; height: 120px; display: flex; align-items: center; justify-content: center; }
.cs-shield-svg { width: 80px; position: relative; z-index: 1; }
.cs-shield-path { animation: draw-shield 1.2s ease forwards 0.2s; }
.cs-check-path { animation: draw-shield 0.5s ease forwards 1.4s; }
@keyframes draw-shield { to { stroke-dashoffset: 0; } }
.cs-ring { position: absolute; border-radius: 50%; border: 1px solid rgba(0,255,178,0.15); animation: ring-pulse 3s ease-in-out infinite; }
.cs-ring-1 { width: 100px; height: 100px; animation-delay: 0s; }
.cs-ring-2 { width: 140px; height: 140px; animation-delay: 1.5s; }
@keyframes ring-pulse { 0%,100%{opacity:0.4;transform:scale(1)} 50%{opacity:0.8;transform:scale(1.05)} }

/* ── Security FAQ ────────────────────────────────────────────── */
.sec-faq-list {
  max-width: 740px;
  border: 1px solid rgba(0, 245, 255, 0.15);
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.sec-faq-item {
  border-bottom: 1px solid rgba(0, 245, 255, 0.1);
}

.sec-faq-item:last-child { border-bottom: none; }

.sec-faq-q {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  color: #00f5ff;
  padding: clamp(0.875rem, 1.5vw, 1.1rem) clamp(1rem, 2vw, 1.5rem);
  cursor: pointer;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.2s;
}

.sec-faq-q::-webkit-details-marker { display: none; }

.sec-faq-q::after {
  content: '+';
  font-size: 1rem;
  color: #00f5ff;
  flex-shrink: 0;
  transition: transform 0.2s;
}

details[open] .sec-faq-q::after { transform: rotate(45deg); }
.sec-faq-q:hover { background: rgba(0, 245, 255, 0.04); }

.sec-faq-a {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  line-height: 1.75;
  color: rgba(232, 234, 255, 0.65);
  padding: 0 clamp(1rem, 2vw, 1.5rem) clamp(0.875rem, 1.5vw, 1.1rem);
  margin: 0;
  border-top: 1px solid rgba(0, 245, 255, 0.08);
}

/* ── Compliance Grid ─────────────────────────────────────────── */
.compliance-grid-section { border-bottom: 1px solid rgba(0,245,255,0.08); }
.compliance-cells {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.5rem;
  margin-top: 2rem;
}
.compliance-cell {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-align: center;
  padding: 0.75rem 0.5rem;
  border: 1px solid rgba(0,245,255,0.12);
  background: rgba(0,245,255,0.02);
  color: rgba(232,234,255,0.6);
  transition: background 0.25s, color 0.25s, border-color 0.25s, box-shadow 0.25s;
  cursor: default;
}
/* Staggered flash animation */
.compliance-cell:nth-child(1)  { animation: cell-flash 3s ease-in-out 0.1s infinite; }
.compliance-cell:nth-child(2)  { animation: cell-flash 3s ease-in-out 0.2s infinite; }
.compliance-cell:nth-child(3)  { animation: cell-flash 3s ease-in-out 0.3s infinite; }
.compliance-cell:nth-child(4)  { animation: cell-flash 3s ease-in-out 0.4s infinite; }
.compliance-cell:nth-child(5)  { animation: cell-flash 3s ease-in-out 0.5s infinite; }
.compliance-cell:nth-child(6)  { animation: cell-flash 3s ease-in-out 0.6s infinite; }
.compliance-cell:nth-child(7)  { animation: cell-flash 3s ease-in-out 0.7s infinite; }
.compliance-cell:nth-child(8)  { animation: cell-flash 3s ease-in-out 0.8s infinite; }
.compliance-cell:nth-child(9)  { animation: cell-flash 3s ease-in-out 0.9s infinite; }
.compliance-cell:nth-child(10) { animation: cell-flash 3s ease-in-out 1.0s infinite; }
.compliance-cell:nth-child(11) { animation: cell-flash 3s ease-in-out 1.1s infinite; }
.compliance-cell:nth-child(12) { animation: cell-flash 3s ease-in-out 1.2s infinite; }
.compliance-cell:nth-child(13) { animation: cell-flash 3s ease-in-out 1.4s infinite; }
.compliance-cell:nth-child(14) { animation: cell-flash 3s ease-in-out 1.6s infinite; }
.compliance-cell:nth-child(15) { animation: cell-flash 3s ease-in-out 1.8s infinite; }
.compliance-cell:nth-child(16) { animation: cell-flash 3s ease-in-out 2.0s infinite; }
.compliance-cell:nth-child(17) { animation: cell-flash 3s ease-in-out 2.2s infinite; }
.compliance-cell:nth-child(18) { animation: cell-flash 3s ease-in-out 2.4s infinite; }
.compliance-cell:nth-child(19) { animation: cell-flash 3s ease-in-out 2.6s infinite; }
.compliance-cell:nth-child(20) { animation: cell-flash 3s ease-in-out 2.8s infinite; }
.compliance-cell:nth-child(21) { animation: cell-flash 3s ease-in-out 3.0s infinite; }
.compliance-cell:nth-child(22) { animation: cell-flash 3s ease-in-out 3.2s infinite; }
.compliance-cell:nth-child(23) { animation: cell-flash 3s ease-in-out 3.4s infinite; }
.compliance-cell:nth-child(24) { animation: cell-flash 3s ease-in-out 3.6s infinite; }
@keyframes cell-flash {
  0%, 70%, 100% { background: rgba(0,245,255,0.02); color: rgba(232,234,255,0.6); border-color: rgba(0,245,255,0.12); box-shadow: none; }
  20%, 40% { background: rgba(0,255,178,0.12); color: #00ffb2; border-color: rgba(0,255,178,0.5); box-shadow: 0 0 8px rgba(0,255,178,0.2); }
}

@media (max-width: 900px) {
  .compliance-cells { grid-template-columns: repeat(4, 1fr); }
}
@media (max-width: 600px) {
  .compliance-cells { grid-template-columns: repeat(3, 1fr); }
}

/* ── Chain of Trust ──────────────────────────────────────────── */
.chain-section { border-bottom: 1px solid rgba(0,245,255,0.08); }
.chain-wrap {
  margin-top: 2.5rem;
  background: rgba(0,255,178,0.02);
  border: 1px solid rgba(0,255,178,0.15);
  border-radius: 6px;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
}
.chain-svg { width: 100%; max-width: 560px; }
.chain-label {
  font-family: 'Space Mono', monospace;
  font-size: 9px;
  fill: #00ffb2;
  letter-spacing: 0.08em;
  text-anchor: middle;
  dominant-baseline: middle;
}

@media (prefers-reduced-motion: reduce) {
  .btn-primary, .btn-ghost { transition: none; }
  .cs-shield-path, .cs-check-path { stroke-dashoffset: 0; animation: none; }
  .cs-ring { animation: none; }
  .compliance-cell { animation: none; background: rgba(0,255,178,0.06); color: #00ffb2; border-color: rgba(0,255,178,0.3); }
  .chain-arrow, .chain-arrowhead { stroke-dashoffset: 0 !important; opacity: 1 !important; }
  .shield-outer, .shield-mid, .shield-inner-path { animation: none; opacity: 1; }
}

/* ── Shield SVG ── */
.shield-section { background: #0c1117; border-bottom: 1px solid #1a2332; }
.shield-inner { display: grid; grid-template-columns: 1fr auto; gap: 4rem; align-items: center; }
.shield-inner .section-headline { color: #fff; }
.shield-inner .section-sub { color: rgba(255,255,255,0.6); margin: 0; }
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
</style>
