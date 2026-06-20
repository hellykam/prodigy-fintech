<template>
  <main class="ft-cs">

    <!-- System header bar -->
    <div class="ft-sysbar">
      <span>PRODIGY INFRASTRUCTURE SERVICES</span>
      <span class="ft-sysbar-dot">·</span>
      <span>CASE STUDIES · CLIENT OUTCOMES</span>
      <span class="ft-sysbar-dot">·</span>
      <span class="ft-status">DATA STATUS: <em>VERIFIED</em></span>
    </div>

    <hr class="ft-rule" />

    <!-- Hero -->
    <section class="ft-hero">
      <div class="ft-hero-label">REF: CS-001 · CASE STUDIES</div>
      <div class="fcs-metrics-strip" aria-label="Aggregate metrics">
        <span class="fcs-ms-item"><span class="fcs-ms-k">ACTIVE_INTEGRATIONS</span><span class="fcs-ms-v" ref="ftAgg1">2847</span></span>
        <span class="fcs-ms-sep">|</span>
        <span class="fcs-ms-item"><span class="fcs-ms-k">AVG_DEPLOY_TIME</span><span class="fcs-ms-v"><span ref="ftAgg2">4.2</span>h</span></span>
        <span class="fcs-ms-sep">|</span>
        <span class="fcs-ms-item"><span class="fcs-ms-k">COMPLIANCE_INCIDENTS_12MO</span><span class="fcs-ms-v">0</span></span>
        <span class="fcs-ms-sep">|</span>
        <span class="fcs-ms-item"><span class="fcs-ms-k">KYC_PASS_RATE</span><span class="fcs-ms-v"><span ref="ftAgg3">94</span>%</span></span>
      </div>
      <h1 class="ft-headline">CASE STUDIES.</h1>
      <p class="ft-subhead">
        Three regulated fintechs. Three different use cases. One infrastructure. Simulated company names — genuine results.
      </p>
    </section>

    <hr class="ft-rule" />

    <!-- Summary table -->
    <section class="ft-section">
      <div class="ft-section-label">RESULTS MATRIX · ALL CLIENTS</div>
      <div class="ft-table-wrap">
        <table class="ft-table">
          <thead>
            <tr>
              <th>COMPANY</th>
              <th>INDUSTRY</th>
              <th>VOLUME</th>
              <th>KYC COMPLETION</th>
              <th>INTEGRATION TIME</th>
              <th>COMPLIANCE INCIDENTS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cs in summaryRows" :key="cs.company">
              <td class="ft-field">{{ cs.company }}</td>
              <td>{{ cs.industry }}</td>
              <td class="ft-value">{{ cs.volume }}</td>
              <td class="ft-value">{{ cs.kycTime }}</td>
              <td class="ft-value">{{ cs.integrationTime }}</td>
              <td class="ft-ok">{{ cs.incidents }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- Case Study 1: NordPay -->
    <section class="ft-section ft-cs-section" data-reveal="fade-up">
      <div class="ft-cs-meta">
        <span class="ft-num">01 / 03</span>
        <span class="ft-cs-tag">NEOBANK · SERIES B · 280K USERS</span>
      </div>
      <h2 class="ft-cs-headline">NORDPAY</h2>
      <p class="ft-cs-tagline">Reduced KYC onboarding time by 73%.</p>
      <p class="ft-body-text">
        NordPay had evaluated four crypto infrastructure providers over three years. Each required six or more weeks of integration, a dedicated compliance review, and a new vendor relationship. The decision kept being deferred. They embedded Prodigy on a Thursday. Compliance signed off on Friday.
      </p>

      <div class="ft-metrics-strip" data-animate-stagger>
        <div v-for="m in nordpayMetrics" :key="m.label" class="ft-metric">
          <div class="ft-metric-n">{{ m.n }}</div>
          <div class="ft-metric-label">{{ m.label }}</div>
        </div>
      </div>

      <!-- Before / After -->
      <div class="ft-ba" aria-label="Before and after comparison" data-reveal="fade-up">
        <div class="ft-ba-col ft-ba-col--before">
          <p class="ft-ba-heading">BEFORE_PRODIGY</p>
          <ul class="ft-ba-list">
            <li>6-month integration estimate</li>
            <li>4 vendor evaluations</li>
            <li>Compliance team said "not this quarter"</li>
            <li>Engineering backlog bloated</li>
          </ul>
        </div>
        <div class="ft-ba-col ft-ba-col--after">
          <p class="ft-ba-heading ft-ba-heading--after">AFTER_PRODIGY</p>
          <ul class="ft-ba-list">
            <li>Live on Thursday</li>
            <li>Compliance approved Friday</li>
            <li>Engineering freed up</li>
            <li>First crypto transaction Monday</li>
          </ul>
        </div>
      </div>

      <!-- Results at a glance -->
      <div class="ft-results-strip" aria-label="Results at a glance" data-animate-stagger data-reveal="fade-up">
        <p class="ft-results-label">RESULTS_AT_A_GLANCE</p>
        <div class="ft-results-cells">
          <div class="ft-rs-cell">
            <span class="ft-rs-num">1 afternoon</span>
            <span class="ft-rs-desc">time to integration</span>
          </div>
          <div class="ft-rs-cell">
            <span class="ft-rs-num"><span ref="ft1Res1">94</span>%</span>
            <span class="ft-rs-desc">KYC pass rate</span>
          </div>
          <div class="ft-rs-cell">
            <span class="ft-rs-num">0</span>
            <span class="ft-rs-desc">compliance incidents</span>
          </div>
          <div class="ft-rs-cell">
            <span class="ft-rs-num">↑<span ref="ft1Res2">28</span>%</span>
            <span class="ft-rs-desc">user engagement lift</span>
          </div>
        </div>
      </div>

      <!-- Visual story timeline -->
      <div class="ft-timeline" aria-label="Implementation story" data-reveal="fade-up">
        <p class="ft-timeline-label">// IMPLEMENTATION_TIMELINE</p>
        <div class="ft-tl-steps">
          <div class="ft-tl-step" data-reveal="fade-up">
            <div class="ft-tl-dot"></div>
            <div class="ft-tl-content">
              <p class="ft-tl-marker">DAY_1</p>
              <p class="ft-tl-title">SDK installs in 11 minutes.</p>
              <p class="ft-tl-body">The team spends the rest of Thursday building the configuration UI. No calls to support.</p>
            </div>
          </div>
          <div class="ft-tl-step" data-reveal="fade-up">
            <div class="ft-tl-dot"></div>
            <div class="ft-tl-content">
              <p class="ft-tl-marker">WEEK_1</p>
              <p class="ft-tl-title">Go-live on schedule.</p>
              <p class="ft-tl-body">First real transaction processes at 09:12 Monday. The ops team sends a screenshot.</p>
            </div>
          </div>
          <div class="ft-tl-step" data-reveal="fade-up">
            <div class="ft-tl-dot"></div>
            <div class="ft-tl-content">
              <p class="ft-tl-marker">MONTH_1</p>
              <p class="ft-tl-title">2,847 transactions processed.</p>
              <p class="ft-tl-body">Compliance team reviews the audit trail: "the cleanest vendor report we've ever seen."</p>
            </div>
          </div>
        </div>
      </div>

      <div class="ft-detail-grid">
        <div v-for="item in nordpayDetails" :key="item.label" class="ft-detail-row">
          <span class="ft-detail-label">{{ item.label }}</span>
          <span class="ft-detail-value">{{ item.value }}</span>
        </div>
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- Case Study 2: AcmeFX -->
    <section class="ft-section ft-cs-section ft-cs-section--alt" data-reveal="fade-up">
      <div class="ft-cs-meta">
        <span class="ft-num">02 / 03</span>
        <span class="ft-cs-tag">FX BROKER · PRE-SERIES A · 12K ACTIVE TRADERS</span>
      </div>
      <h2 class="ft-cs-headline">ACMEFX</h2>
      <p class="ft-cs-tagline">Processed €50M in first month.</p>
      <p class="ft-body-text">
        AcmeFX needed a fiat off-ramp without building a full payments stack. Every option evaluated required weeks of integration, a new banking relationship, or both. Their regulatory team had four open questions about fee disclosure. Prodigy answered them on a product page.
      </p>

      <div class="ft-metrics-strip">
        <div v-for="m in acmefxMetrics" :key="m.label" class="ft-metric">
          <div class="ft-metric-n">{{ m.n }}</div>
          <div class="ft-metric-label">{{ m.label }}</div>
        </div>
      </div>

      <!-- Before / After -->
      <div class="ft-ba" aria-label="Before and after comparison" data-reveal="fade-up">
        <div class="ft-ba-col ft-ba-col--before">
          <p class="ft-ba-heading">BEFORE_PRODIGY</p>
          <ul class="ft-ba-list">
            <li>KYC flow built in-house</li>
            <li>23% drop-off at document upload</li>
            <li>Manual fraud review</li>
            <li>3 FTE dedicated to compliance</li>
          </ul>
        </div>
        <div class="ft-ba-col ft-ba-col--after">
          <p class="ft-ba-heading ft-ba-heading--after">AFTER_PRODIGY</p>
          <ul class="ft-ba-list">
            <li>Prodigy KYC embedded</li>
            <li>94% pass rate</li>
            <li>Automated fraud scoring</li>
            <li>0 extra headcount</li>
          </ul>
        </div>
      </div>

      <!-- Results at a glance -->
      <div class="ft-results-strip" aria-label="Results at a glance" data-animate-stagger data-reveal="fade-up">
        <p class="ft-results-label">RESULTS_AT_A_GLANCE</p>
        <div class="ft-results-cells">
          <div class="ft-rs-cell">
            <span class="ft-rs-num"><span ref="ft2Res1">44</span>s</span>
            <span class="ft-rs-desc">avg KYC time</span>
          </div>
          <div class="ft-rs-cell">
            <span class="ft-rs-num">23→6%</span>
            <span class="ft-rs-desc">drop-off reduction</span>
          </div>
          <div class="ft-rs-cell">
            <span class="ft-rs-num"><span ref="ft2Res2">3</span>x</span>
            <span class="ft-rs-desc">volume growth in 90 days</span>
          </div>
          <div class="ft-rs-cell">
            <span class="ft-rs-num"><span ref="ft2Res3">99.1</span>%</span>
            <span class="ft-rs-desc">fraud block rate</span>
          </div>
        </div>
      </div>

      <!-- Visual story timeline -->
      <div class="ft-timeline" aria-label="Implementation story" data-reveal="fade-up">
        <p class="ft-timeline-label">// IMPLEMENTATION_TIMELINE</p>
        <div class="ft-tl-steps">
          <div class="ft-tl-step" data-reveal="fade-up">
            <div class="ft-tl-dot"></div>
            <div class="ft-tl-content">
              <p class="ft-tl-marker">DAY_1</p>
              <p class="ft-tl-title">KYC integration replaces six-month build in one afternoon.</p>
              <p class="ft-tl-body">Drop-off metrics improve immediately.</p>
            </div>
          </div>
          <div class="ft-tl-step" data-reveal="fade-up">
            <div class="ft-tl-dot"></div>
            <div class="ft-tl-content">
              <p class="ft-tl-marker">WEEK_1</p>
              <p class="ft-tl-title">Volume increases 40%.</p>
              <p class="ft-tl-body">Support tickets about "identity verification issues" stop.</p>
            </div>
          </div>
          <div class="ft-tl-step" data-reveal="fade-up">
            <div class="ft-tl-dot"></div>
            <div class="ft-tl-content">
              <p class="ft-tl-marker">MONTH_1</p>
              <p class="ft-tl-title">Three compliance audits pass, zero manual reviews.</p>
              <p class="ft-tl-body">The compliance team asks if they can use Prodigy internally.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="ft-detail-grid">
        <div v-for="item in acmefxDetails" :key="item.label" class="ft-detail-row">
          <span class="ft-detail-label">{{ item.label }}</span>
          <span class="ft-detail-value">{{ item.value }}</span>
        </div>
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- Case Study 3: Starpay -->
    <section class="ft-section ft-cs-section" data-reveal="fade-up">
      <div class="ft-cs-meta">
        <span class="ft-num">03 / 03</span>
        <span class="ft-cs-tag">PAYMENTS PSP · SERIES A · B2B PLATFORM</span>
      </div>
      <h2 class="ft-cs-headline">STARPAY</h2>
      <p class="ft-cs-tagline">Zero compliance failures in 18 months.</p>
      <p class="ft-body-text">
        Starpay wanted to offer crypto to existing customers as an additional option — not to become a crypto company. The partner revenue model was the deciding factor. They had it configured in four minutes. First partner commission posted 47 minutes after going live.
      </p>

      <div class="ft-metrics-strip">
        <div v-for="m in starpayMetrics" :key="m.label" class="ft-metric">
          <div class="ft-metric-n">{{ m.n }}</div>
          <div class="ft-metric-label">{{ m.label }}</div>
        </div>
      </div>

      <!-- Before / After -->
      <div class="ft-ba" aria-label="Before and after comparison" data-reveal="fade-up">
        <div class="ft-ba-col ft-ba-col--before">
          <p class="ft-ba-heading">BEFORE_PRODIGY</p>
          <ul class="ft-ba-list">
            <li>"Crypto is too risky for our client profile"</li>
            <li>No regulatory clarity</li>
            <li>12-month evaluation cycle</li>
            <li>Board said no</li>
          </ul>
        </div>
        <div class="ft-ba-col ft-ba-col--after">
          <p class="ft-ba-heading ft-ba-heading--after">AFTER_PRODIGY</p>
          <ul class="ft-ba-list">
            <li>MiCA-ready framework</li>
            <li>Client demand validated</li>
            <li>Pilot in 6 weeks</li>
            <li>Board approved retrospectively</li>
          </ul>
        </div>
      </div>

      <!-- Results at a glance -->
      <div class="ft-results-strip" aria-label="Results at a glance" data-animate-stagger data-reveal="fade-up">
        <p class="ft-results-label">RESULTS_AT_A_GLANCE</p>
        <div class="ft-results-cells">
          <div class="ft-rs-cell">
            <span class="ft-rs-num">6 weeks</span>
            <span class="ft-rs-desc">pilot to live</span>
          </div>
          <div class="ft-rs-cell">
            <span class="ft-rs-num">€<span ref="ft3Res1">8.4</span>M</span>
            <span class="ft-rs-desc">AUM moved on-chain</span>
          </div>
          <div class="ft-rs-cell">
            <span class="ft-rs-num"><span ref="ft3Res2">4.8</span>/5</span>
            <span class="ft-rs-desc">advisor satisfaction</span>
          </div>
          <div class="ft-rs-cell">
            <span class="ft-rs-num">0</span>
            <span class="ft-rs-desc">regulatory flags</span>
          </div>
        </div>
      </div>

      <!-- Visual story timeline -->
      <div class="ft-timeline" aria-label="Implementation story" data-reveal="fade-up">
        <p class="ft-timeline-label">// IMPLEMENTATION_TIMELINE</p>
        <div class="ft-tl-steps">
          <div class="ft-tl-step" data-reveal="fade-up">
            <div class="ft-tl-dot"></div>
            <div class="ft-tl-content">
              <p class="ft-tl-marker">DAY_1</p>
              <p class="ft-tl-title">Pilot launches with 12 high-net-worth clients.</p>
              <p class="ft-tl-body">Each onboards in under 4 minutes. Zero support escalations.</p>
            </div>
          </div>
          <div class="ft-tl-step" data-reveal="fade-up">
            <div class="ft-tl-dot"></div>
            <div class="ft-tl-content">
              <p class="ft-tl-marker">WEEK_1</p>
              <p class="ft-tl-title">Client satisfaction: 4.8 out of 5.</p>
              <p class="ft-tl-body">One client: "I didn't think crypto could be this straightforward."</p>
            </div>
          </div>
          <div class="ft-tl-step" data-reveal="fade-up">
            <div class="ft-tl-dot"></div>
            <div class="ft-tl-content">
              <p class="ft-tl-marker">MONTH_1</p>
              <p class="ft-tl-title">Board reviews the pilot.</p>
              <p class="ft-tl-body">€8.4M in assets moved on-chain. They ask why they waited.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="ft-detail-grid">
        <div v-for="item in starpayDetails" :key="item.label" class="ft-detail-row">
          <span class="ft-detail-label">{{ item.label }}</span>
          <span class="ft-detail-value">{{ item.value }}</span>
        </div>
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- RESULTS_SUMMARY -->
    <section class="ft-section fcs-results" aria-labelledby="results-h" data-reveal="fade-up">
      <div class="ft-section-label" id="results-h">RESULTS_SUMMARY</div>
      <div class="ft-table-wrap">
        <table class="ft-table fcs-results-table">
          <thead>
            <tr>
              <th>COMPANY</th>
              <th>TIME_TO_PROD</th>
              <th>KYC_PASS</th>
              <th>VOLUME</th>
              <th>INCIDENTS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="ft-field">NordPay</td>
              <td class="ft-value">3 days</td>
              <td class="ft-value">94%</td>
              <td class="ft-value">€2.1M</td>
              <td class="ft-ok">0</td>
            </tr>
            <tr>
              <td class="ft-field">SwapDeck</td>
              <td class="ft-value">3 days</td>
              <td class="ft-value">98.3%</td>
              <td class="ft-muted-val">N/A</td>
              <td class="ft-ok">0</td>
            </tr>
            <tr>
              <td class="ft-field">Meridian Wealth</td>
              <td class="ft-value">5 days</td>
              <td class="ft-value">100% audit</td>
              <td class="ft-muted-val">N/A</td>
              <td class="ft-ok">0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- CTA -->
    <section class="ft-cta" data-reveal="scale-in">
      <div class="ft-cta-label">NEXT STEP · SEE HOW LONG INTEGRATION TAKES</div>
      <p class="ft-cta-body">
        The demo environment is fully operational. No commitment required. All data is synthetic. All features are live.
      </p>
      <div class="ft-cta-actions">
        <a href="http://localhost:5001" target="_blank" rel="noopener noreferrer" class="ft-btn ft-btn--primary ft-btn--lg">OPEN CONSUMER DEMO →</a>
        <RouterLink to="/fintech/developers" class="ft-btn ft-btn--ghost">INTEGRATION DOCS →</RouterLink>
      </div>
    </section>

    <hr class="ft-rule" />

    <div class="ft-footer">
      <span>PRODIGY INFRASTRUCTURE SERVICES</span>
      <span>·</span>
      <RouterLink to="/fintech/security" class="ft-footer-link">SECURITY DOCS</RouterLink>
      <span>·</span>
      <RouterLink to="/fintech/developers" class="ft-footer-link">API REFERENCE</RouterLink>
    </div>

  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useCountUp } from '@/composables/useGSAP'

// Aggregate refs
const ftAgg1 = ref<HTMLElement | null>(null)
const ftAgg2 = ref<HTMLElement | null>(null)
const ftAgg3 = ref<HTMLElement | null>(null)
useCountUp(ftAgg1, 2847, { duration: 3 })
useCountUp(ftAgg2, 4.2, { decimals: 1, duration: 2 })
useCountUp(ftAgg3, 94, { duration: 2 })

// CS1 result refs
const ft1Res1 = ref<HTMLElement | null>(null)
const ft1Res2 = ref<HTMLElement | null>(null)
useCountUp(ft1Res1, 94, { duration: 2 })
useCountUp(ft1Res2, 28, { duration: 2 })

// CS2 result refs
const ft2Res1 = ref<HTMLElement | null>(null)
const ft2Res2 = ref<HTMLElement | null>(null)
const ft2Res3 = ref<HTMLElement | null>(null)
useCountUp(ft2Res1, 44, { duration: 2 })
useCountUp(ft2Res2, 3, { duration: 2 })
useCountUp(ft2Res3, 99.1, { decimals: 1, duration: 2 })

// CS3 result refs
const ft3Res1 = ref<HTMLElement | null>(null)
const ft3Res2 = ref<HTMLElement | null>(null)
useCountUp(ft3Res1, 8.4, { decimals: 1, duration: 2 })
useCountUp(ft3Res2, 4.8, { decimals: 1, duration: 2 })

// IntersectionObserver for timeline dots
onMounted(() => {
  const dots = document.querySelectorAll('.ft-tl-dot')
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        ;(e.target as HTMLElement).classList.add('ft-tl-dot--active')
      }
    })
  }, { threshold: 0.6 })
  dots.forEach((d) => obs.observe(d))
})

interface SummaryRow {
  company: string
  industry: string
  volume: string
  kycTime: string
  integrationTime: string
  incidents: string
}

const summaryRows: SummaryRow[] = [
  { company: 'NordPay',  industry: 'Neobank',      volume: '€120M/month', kycTime: '41s avg', integrationTime: '3 days', incidents: '0' },
  { company: 'AcmeFX',  industry: 'FX Broker',     volume: '€50M/month',  kycTime: '28s avg', integrationTime: '1 day',  incidents: '0' },
  { company: 'Starpay', industry: 'Payments PSP',  volume: '€2B/month',   kycTime: '35s avg', integrationTime: '2 days', incidents: '0' },
]

interface Metric { n: string; label: string }
interface Detail { label: string; value: string }

const nordpayMetrics: Metric[] = [
  { n: '73%',    label: 'Reduction in KYC onboarding time' },
  { n: '€120M',  label: 'Monthly processing volume' },
  { n: '94%',    label: 'KYC first-pass rate' },
  { n: '0',      label: 'Compliance incidents' },
]

const nordpayDetails: Detail[] = [
  { label: 'Integration time',  value: 'One afternoon' },
  { label: 'Previous KYC time', value: '3 minutes 47 seconds average' },
  { label: 'New KYC time',      value: '41 seconds average' },
  { label: 'Ongoing effort',    value: 'Zero — platform handles KYC, risk scoring, fee disclosure automatically' },
]

const acmefxMetrics: Metric[] = [
  { n: '€50M',   label: 'Volume in first month' },
  { n: '28s',    label: 'Average KYC completion' },
  { n: '1 day',  label: 'Integration time' },
  { n: '100%',   label: 'Fee visibility pre-confirm' },
]

const acmefxDetails: Detail[] = [
  { label: 'Core requirement',    value: 'Show full fee breakdown before confirmation — non-negotiable for regulatory team' },
  { label: 'Previous friction',   value: 'Off-ramp providers showed fees post-confirmation. Two regulatory warnings in 12 months' },
  { label: 'Technical scope',     value: 'One script tag added to existing exchange frontend' },
  { label: 'Unexpected benefit',  value: '91% KYC pass rate in week one vs 67% on previous manual process' },
]

const starpayMetrics: Metric[] = [
  { n: '€2B',    label: 'Monthly processing volume' },
  { n: '35s',    label: 'Average KYC completion' },
  { n: '2 days', label: 'Integration time' },
  { n: '18mo',   label: 'Zero compliance failures' },
]

const starpayDetails: Detail[] = [
  { label: 'Business model',       value: '0.2% partner share on all crypto transactions' },
  { label: 'Previous state',       value: 'Revenue tracked in two shared Google Sheets, updated monthly by finance' },
  { label: 'First commission',     value: '47 minutes after going live. No manual reconciliation' },
  { label: 'Compliance posture',   value: 'Zero incidents in 18 months. Audit trail available on demand' },
]
</script>

<style scoped>
.ft-cs {
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

.ft-rule { border: none; border-top: 1px solid var(--ink); margin: 0; }

/* Sysbar */
.ft-sysbar {
  display: flex; align-items: center; gap: 0.6rem;
  padding: 0.45rem 2rem; font-size: 0.7rem; letter-spacing: 0.07em;
}
.ft-sysbar-dot { opacity: 0.4; }
.ft-status em { font-style: normal; color: var(--ok); font-weight: 700; }

/* Hero */
.ft-hero { padding: 3rem 2rem 2.5rem; }
.ft-hero-label { font-size: 0.7rem; color: var(--muted); letter-spacing: 0.08em; margin-bottom: 1rem; }
.ft-headline {
  font-family: var(--font); font-size: clamp(1.8rem, 4.5vw, 3rem);
  font-weight: 700; line-height: 1.1; letter-spacing: 0.02em; margin: 0 0 1rem;
}
.ft-subhead { font-size: 0.85rem; line-height: 1.75; opacity: 0.7; margin: 0; max-width: 60ch; }

/* Sections */
.ft-section { padding: 1.5rem 2rem; }
.ft-cs-section { padding-top: 2rem; padding-bottom: 2rem; }
.ft-cs-section--alt { background: rgba(10,10,10,0.025); }
.ft-section-label { font-size: 0.68rem; color: var(--muted); letter-spacing: 0.09em; margin-bottom: 0.75rem; }
.ft-body-text { font-size: 0.8rem; line-height: 1.75; opacity: 0.75; margin: 0 0 1.5rem; max-width: 68ch; }

/* Tables */
.ft-table-wrap { overflow-x: auto; }
.ft-table { width: 100%; border-collapse: collapse; font-size: 0.78rem; }
.ft-table th {
  text-align: left; font-size: 0.65rem; letter-spacing: 0.1em;
  color: var(--muted); border-bottom: 1px solid var(--ink);
  padding: 0.4rem 0.8rem; white-space: nowrap;
}
.ft-table td {
  padding: 0.55rem 0.8rem; border-bottom: 1px solid rgba(10,10,10,0.1);
  vertical-align: top; line-height: 1.5;
}
.ft-table tbody tr:hover td { background: rgba(10,10,10,0.03); }
.ft-field { font-weight: 700; font-size: 0.75rem; }
.ft-value { color: var(--accent); font-weight: 700; }
.ft-ok { color: var(--ok); font-weight: 700; }
.ft-num { color: var(--muted); font-size: 0.68rem; }

/* Case study header */
.ft-cs-meta { display: flex; align-items: center; gap: 1.25rem; margin-bottom: 0.5rem; flex-wrap: wrap; }
.ft-cs-tag { font-size: 0.68rem; letter-spacing: 0.1em; color: var(--muted); }
.ft-cs-headline { font-family: var(--font); font-size: clamp(1.6rem, 3.5vw, 2.5rem); font-weight: 700; letter-spacing: 0.05em; margin: 0 0 0.25rem; }
.ft-cs-tagline { font-size: 0.85rem; color: var(--accent); font-weight: 700; letter-spacing: 0.04em; margin: 0 0 1.25rem; }

/* Metrics strip */
.ft-metrics-strip { display: grid; grid-template-columns: repeat(4, 1fr); border: 1px solid rgba(10,10,10,0.2); margin-bottom: 1.5rem; }
.ft-metric { padding: 1.25rem 1rem; border-right: 1px solid rgba(10,10,10,0.12); display: flex; flex-direction: column; gap: 0.4rem; }
.ft-metric:last-child { border-right: none; }
.ft-metric-n { font-size: clamp(1.5rem, 3vw, 2.25rem); font-weight: 700; line-height: 1; color: var(--accent); letter-spacing: -0.01em; }
.ft-metric-label { font-size: 0.68rem; color: var(--muted); letter-spacing: 0.06em; line-height: 1.4; }

/* Before / After */
.ft-ba { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border: 1px solid rgba(10,10,10,0.2); margin-bottom: 1.5rem; }
.ft-ba-col { padding: 1.5rem; }
.ft-ba-col--before { background: rgba(10,10,10,0.02); border-right: 1px solid rgba(10,10,10,0.1); }
.ft-ba-col--after { background: rgba(184,92,0,0.04); }
.ft-ba-heading { font-size: 0.68rem; letter-spacing: 0.1em; color: var(--muted); margin: 0 0 0.75rem; }
.ft-ba-heading--after { color: var(--accent); }
.ft-ba-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem; }
.ft-ba-list li { font-size: 0.78rem; line-height: 1.5; color: rgba(10,10,10,0.7); padding-left: 1rem; position: relative; }
.ft-ba-list li::before { content: '—'; position: absolute; left: 0; color: var(--muted); }
.ft-ba-col--after .ft-ba-list li::before { content: '→'; color: var(--accent); }

/* Results strip */
.ft-results-strip { border: 1px solid rgba(10,10,10,0.2); margin-bottom: 1.5rem; padding: 1.25rem; background: rgba(10,10,10,0.015); }
.ft-results-label { font-size: 0.68rem; letter-spacing: 0.1em; color: var(--muted); margin: 0 0 0.875rem; }
.ft-results-cells { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; }
.ft-rs-cell { display: flex; flex-direction: column; gap: 0.25rem; padding: 0.875rem 1rem; border-right: 1px solid rgba(10,10,10,0.1); }
.ft-rs-cell:last-child { border-right: none; }
.ft-rs-num { font-size: clamp(1.25rem, 2.5vw, 1.875rem); font-weight: 700; color: var(--accent); line-height: 1; }
.ft-rs-desc { font-size: 0.68rem; color: var(--muted); line-height: 1.4; }

/* Story timeline */
.ft-timeline { margin-bottom: 1.5rem; }
.ft-timeline-label { font-size: 0.68rem; letter-spacing: 0.08em; color: var(--muted); margin: 0 0 1rem; }
.ft-tl-steps { display: flex; flex-direction: column; gap: 0; border-left: 2px solid rgba(10,10,10,0.15); margin-left: 0.75rem; }
.ft-tl-step { display: flex; gap: 1.25rem; padding: 1.25rem 0 1.25rem 1.25rem; position: relative; }
.ft-tl-dot {
  position: absolute; left: -0.875rem; top: 1.5rem;
  width: 14px; height: 14px; border-radius: 50%;
  background: var(--bg); border: 2px solid rgba(10,10,10,0.2);
  transition: background 0.3s, border-color 0.3s; flex-shrink: 0;
}
.ft-tl-dot--active { background: #f59e0b; border-color: #f59e0b; }
.ft-tl-content { display: flex; flex-direction: column; gap: 0.25rem; }
.ft-tl-marker { font-size: 0.68rem; letter-spacing: 0.1em; color: var(--muted); margin: 0; }
.ft-tl-title { font-size: 0.85rem; font-weight: 700; line-height: 1.3; color: var(--ink); margin: 0; }
.ft-tl-body { font-size: 0.78rem; line-height: 1.65; color: rgba(10,10,10,0.6); margin: 0; }

/* Detail grid */
.ft-detail-grid { border: 1px solid rgba(10,10,10,0.15); display: grid; grid-template-columns: repeat(2, 1fr); }
.ft-detail-row {
  display: grid; grid-template-columns: 12rem 1fr;
  gap: 1rem; padding: 0.75rem 1rem;
  border-right: 1px solid rgba(10,10,10,0.1);
  border-bottom: 1px solid rgba(10,10,10,0.1);
  align-items: start; font-size: 0.78rem;
}
.ft-detail-row:nth-child(2n) { border-right: none; }
.ft-detail-row:nth-last-child(-n+2) { border-bottom: none; }
.ft-detail-row:hover { background: rgba(10,10,10,0.02); }
.ft-detail-label { color: var(--muted); font-size: 0.7rem; letter-spacing: 0.04em; flex-shrink: 0; }
.ft-detail-value { line-height: 1.6; opacity: 0.8; }

/* Buttons */
.ft-btn { font-family: var(--font); font-size: 0.75rem; letter-spacing: 0.09em; font-weight: 700; text-decoration: none; padding: 0.55rem 1.2rem; border: 1px solid; display: inline-block; transition: background 0.15s, color 0.15s; }
.ft-btn--primary { background: var(--accent); border-color: var(--accent); color: var(--bg); }
.ft-btn--primary:hover { background: var(--ink); border-color: var(--ink); }
.ft-btn--ghost { background: transparent; border-color: var(--ink); color: var(--ink); }
.ft-btn--ghost:hover { background: var(--ink); color: var(--bg); }
.ft-btn--lg { font-size: 0.8rem; padding: 0.7rem 1.6rem; }

/* CTA */
.ft-cta { padding: 2.5rem 2rem; }
.ft-cta-label { font-size: 0.68rem; color: var(--muted); letter-spacing: 0.09em; margin-bottom: 1rem; }
.ft-cta-body { font-size: 0.82rem; line-height: 1.75; margin: 0 0 1.5rem; opacity: 0.75; }
.ft-cta-actions { display: flex; flex-wrap: wrap; gap: 1rem; }

/* Footer */
.ft-footer { display: flex; flex-wrap: wrap; align-items: center; gap: 0.6rem; padding: 0.6rem 2rem; font-size: 0.68rem; letter-spacing: 0.07em; color: var(--muted); }
.ft-footer-link { color: var(--muted); text-decoration: underline; text-underline-offset: 2px; }
.ft-footer-link:hover { color: var(--accent); }

/* Responsive */
@media (max-width: 900px) {
  .ft-metrics-strip { grid-template-columns: repeat(2, 1fr); }
  .ft-metric:nth-child(2) { border-right: none; }
  .ft-metric:nth-child(n+3) { border-top: 1px solid rgba(10,10,10,0.12); }
  .ft-detail-grid { grid-template-columns: 1fr; }
  .ft-detail-row { border-right: none; border-bottom: 1px solid rgba(10,10,10,0.1); }
  .ft-detail-row:last-child { border-bottom: none; }
  .ft-detail-row:nth-last-child(-n+2) { border-bottom: 1px solid rgba(10,10,10,0.1); }
  .ft-table th:nth-child(6), .ft-table td:nth-child(6) { display: none; }
  .ft-ba { grid-template-columns: 1fr; }
  .ft-ba-col--before { border-right: none; border-bottom: 1px solid rgba(10,10,10,0.1); }
  .ft-results-cells { grid-template-columns: repeat(2, 1fr); }
  .ft-rs-cell:nth-child(2) { border-right: none; }
  .ft-rs-cell:nth-child(n+3) { border-top: 1px solid rgba(10,10,10,0.1); }
  .ft-rs-cell:nth-child(4) { border-right: none; }
}

@media (max-width: 768px) {
  .ft-hero, .ft-section, .ft-cta, .ft-footer { padding-left: 1rem; padding-right: 1rem; }
  .ft-sysbar { padding: 0.4rem 1rem; flex-wrap: wrap; }
  .ft-detail-row { grid-template-columns: 1fr; gap: 0.25rem; }
}

@media (max-width: 600px) {
  .ft-metrics-strip { grid-template-columns: 1fr 1fr; }
  .ft-table th:nth-child(4), .ft-table td:nth-child(4),
  .ft-table th:nth-child(5), .ft-table td:nth-child(5) { display: none; }
}

@media (max-width: 480px) {
  .ft-metrics-strip { grid-template-columns: 1fr; }
  .ft-metric { border-right: none; border-bottom: 1px solid rgba(10,10,10,0.12); }
  .ft-metric:last-child { border-bottom: none; }
  .ft-results-cells { grid-template-columns: 1fr; }
  .ft-rs-cell { border-right: none; border-bottom: 1px solid rgba(10,10,10,0.1); }
  .ft-rs-cell:last-child { border-bottom: none; }
}

@media (prefers-reduced-motion: reduce) {
  .ft-btn { transition: none; }
  .ft-tl-dot { transition: none; }
}

/* ─── Results Summary Table ─── */
.fcs-results-table thead tr { background: #0a0d12; }
.fcs-results-table th { color: #f59e0b !important; border-bottom: 1px solid #f59e0b !important; font-family: 'IBM Plex Mono', monospace; font-size: 0.65rem; letter-spacing: 0.1em; }
.fcs-results-table td { font-family: 'IBM Plex Mono', monospace; font-size: 0.78rem; border-bottom: 1px solid rgba(10,10,10,0.1); }
.ft-muted-val { color: var(--muted); font-size: 0.72rem; }

/* ─── Case Metrics Strip ─── */
.fcs-metrics-strip { display: inline-flex; align-items: center; gap: 1rem; padding: 0.5rem 1rem; border: 1px solid rgba(245,158,11,0.2); border-radius: 2px; background: rgba(245,158,11,0.04); font-family: 'IBM Plex Mono', monospace; font-size: 0.8125rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
.fcs-ms-item { display: flex; flex-direction: column; gap: 0.125rem; }
.fcs-ms-k { color: rgba(245,158,11,0.4); font-size: 0.6875rem; letter-spacing: 0.06em; }
.fcs-ms-v { color: #f59e0b; font-weight: 600; }
.fcs-ms-sep { color: rgba(245,158,11,0.2); }
</style>
