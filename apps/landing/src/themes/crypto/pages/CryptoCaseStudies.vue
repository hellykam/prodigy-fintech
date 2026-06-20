<template>
  <div class="crypto-page">

    <!-- ── Hero ─────────────────────────────────────────────────── -->
    <section class="hero" aria-labelledby="cs-headline">
      <div class="grid-dots" aria-hidden="true" />
      <div class="section-inner">
        <div class="ccs-live-wrap" aria-hidden="true">
          <span class="ccs-live-dot"></span>
          <span class="ccs-live-label">LIVE INTEGRATIONS</span>
          <span class="ccs-live-num" ref="cryptoAgg1">2,847</span>
        </div>
        <p class="eyebrow">RESULTS</p>
        <h1 id="cs-headline" class="hero-headline">
          POWERING THE<br /><span class="cyan">FUTURE OF MONEY.</span>
        </h1>
        <p class="hero-sub">
          Three teams who embedded Prodigy and stopped building crypto infrastructure. Simulated company names. Genuine results.
        </p>
      </div>
    </section>

    <!-- ── Aggregate Results Strip ──────────────────────────────── -->
    <section class="agg-strip" aria-label="Aggregate results">
      <div class="section-inner">
        <div class="agg-stats" role="list">
          <div class="agg-stat" role="listitem">
            <span class="agg-n"><span ref="cryptoAgg2">2847</span></span>
            <span class="agg-label">ACTIVE INTEGRATIONS</span>
          </div>
          <div class="agg-divider" aria-hidden="true"></div>
          <div class="agg-stat" role="listitem">
            <span class="agg-n"><span ref="cryptoAgg3">4.2</span>h</span>
            <span class="agg-label">AVG TIME TO PRODUCTION</span>
          </div>
          <div class="agg-divider" aria-hidden="true"></div>
          <div class="agg-stat" role="listitem">
            <span class="agg-n">0</span>
            <span class="agg-label">COMPLIANCE INCIDENTS (12 MO)</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Case Study 1: NordPay ─────────────────────────────────── -->
    <section class="section-dark case-section" aria-labelledby="cs1-h" data-reveal="fade-up">
      <div class="section-inner">
        <div class="case-meta">
          <span class="case-num">01 / 03</span>
          <span class="eyebrow-inline">NordPay · Neobank · Series B</span>
        </div>
        <h2 id="cs1-h" class="case-headline">
          <span class="cyan">1M TRANSACTIONS</span> PROCESSED WITH <span class="purple">0 DOWNTIME.</span>
        </h2>
        <p class="case-intro">
          NordPay embedded Prodigy on a Thursday. By the following Monday their compliance team had signed off. By month three they had crossed 1 million processed transactions without a single infrastructure incident.
        </p>

        <div class="metrics-row" aria-label="NordPay metrics" data-animate-stagger>
          <div v-for="m in nordpayMetrics" :key="m.label" class="metric-card">
            <div class="metric-n cyan">{{ m.n }}</div>
            <div class="metric-label">{{ m.label }}</div>
          </div>
        </div>

        <!-- Before / After -->
        <div class="before-after" aria-label="Before and after comparison" data-reveal="fade-up">
          <div class="ba-col ba-col--before">
            <p class="ba-heading">BEFORE PRODIGY</p>
            <ul class="ba-list">
              <li>6-month integration estimate</li>
              <li>4 vendor evaluations</li>
              <li>Compliance team said "not this quarter"</li>
              <li>Engineering backlog bloated</li>
            </ul>
          </div>
          <div class="ba-col ba-col--after">
            <p class="ba-heading">AFTER PRODIGY</p>
            <ul class="ba-list">
              <li>Live on Thursday</li>
              <li>Compliance approved Friday</li>
              <li>Engineering freed up</li>
              <li>First crypto transaction Monday</li>
            </ul>
          </div>
        </div>

        <!-- Results at a glance -->
        <div class="results-strip" aria-label="Results at a glance" data-animate-stagger data-reveal="fade-up">
          <p class="results-strip-label">RESULTS AT A GLANCE</p>
          <div class="results-strip-cells">
            <div class="rs-cell">
              <span class="rs-num cyan">1 afternoon</span>
              <span class="rs-desc">time to integration</span>
            </div>
            <div class="rs-cell">
              <span class="rs-num cyan"><span ref="cs1Res1">94</span>%</span>
              <span class="rs-desc">KYC pass rate</span>
            </div>
            <div class="rs-cell">
              <span class="rs-num cyan">0</span>
              <span class="rs-desc">compliance incidents</span>
            </div>
            <div class="rs-cell">
              <span class="rs-num cyan">↑<span ref="cs1Res2">28</span>%</span>
              <span class="rs-desc">user engagement lift</span>
            </div>
          </div>
        </div>

        <!-- Visual story timeline -->
        <div class="story-timeline" aria-label="Implementation story" data-reveal="fade-up">
          <p class="story-timeline-label">// IMPLEMENTATION_STORY</p>
          <div class="timeline-steps">
            <div class="tl-step" data-reveal="fade-up">
              <div class="tl-dot"></div>
              <div class="tl-content">
                <p class="tl-marker">DAY_1</p>
                <p class="tl-title">The SDK installs in 11 minutes.</p>
                <p class="tl-body">The team spends the rest of Thursday building the configuration UI. No calls to support.</p>
              </div>
            </div>
            <div class="tl-step" data-reveal="fade-up">
              <div class="tl-dot"></div>
              <div class="tl-content">
                <p class="tl-marker">WEEK_1</p>
                <p class="tl-title">Go-live happens on schedule.</p>
                <p class="tl-body">First real transaction processes at 09:12 on Monday. The ops team sends a screenshot.</p>
              </div>
            </div>
            <div class="tl-step" data-reveal="fade-up">
              <div class="tl-dot"></div>
              <div class="tl-content">
                <p class="tl-marker">MONTH_1</p>
                <p class="tl-title">2,847 transactions processed.</p>
                <p class="tl-body">Compliance team reviews the audit trail and describes it as "the cleanest vendor report we've ever seen."</p>
              </div>
            </div>
          </div>
        </div>

        <blockquote class="quote-block">
          <p class="quote-text">"We embedded it on Thursday. The compliance team approved it on Friday. That has never happened before."</p>
          <footer class="quote-attr">— CTO, NordPay</footer>
        </blockquote>

        <div class="detail-grid">
          <div v-for="item in nordpayDetails" :key="item.label" class="detail-card">
            <p class="detail-label">{{ item.label }}</p>
            <p class="detail-value">{{ item.value }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Case Study 2: AcmeFX ──────────────────────────────────── -->
    <section class="section-mid case-section" aria-labelledby="cs2-h" data-reveal="fade-up">
      <div class="section-inner">
        <div class="case-meta">
          <span class="case-num">02 / 03</span>
          <span class="eyebrow-inline">AcmeFX · FX Broker · Pre-Series A</span>
        </div>
        <h2 id="cs2-h" class="case-headline">
          <span class="cyan">€2B ANNUAL VOLUME</span> ON <span class="purple">PRODIGY INFRASTRUCTURE.</span>
        </h2>
        <p class="case-intro">
          AcmeFX processed €50M in their first month on Prodigy. By the end of year one their annualised run-rate had crossed €2B. The integration took one afternoon.
        </p>

        <div class="metrics-row" aria-label="AcmeFX metrics" data-animate-stagger>
          <div v-for="m in acmefxMetrics" :key="m.label" class="metric-card">
            <div class="metric-n cyan">{{ m.n }}</div>
            <div class="metric-label">{{ m.label }}</div>
          </div>
        </div>

        <!-- Before / After -->
        <div class="before-after" aria-label="Before and after comparison" data-reveal="fade-up">
          <div class="ba-col ba-col--before">
            <p class="ba-heading">BEFORE PRODIGY</p>
            <ul class="ba-list">
              <li>KYC flow built in-house</li>
              <li>23% drop-off at document upload</li>
              <li>Manual fraud review</li>
              <li>3 FTE dedicated to compliance</li>
            </ul>
          </div>
          <div class="ba-col ba-col--after">
            <p class="ba-heading">AFTER PRODIGY</p>
            <ul class="ba-list">
              <li>Prodigy KYC embedded</li>
              <li>94% pass rate</li>
              <li>Automated fraud scoring</li>
              <li>0 extra headcount</li>
            </ul>
          </div>
        </div>

        <!-- Results at a glance -->
        <div class="results-strip" aria-label="Results at a glance" data-animate-stagger data-reveal="fade-up">
          <p class="results-strip-label">RESULTS AT A GLANCE</p>
          <div class="results-strip-cells">
            <div class="rs-cell">
              <span class="rs-num cyan"><span ref="cs2Res1">44</span>s</span>
              <span class="rs-desc">avg KYC time</span>
            </div>
            <div class="rs-cell">
              <span class="rs-num cyan">23→6%</span>
              <span class="rs-desc">drop-off reduction</span>
            </div>
            <div class="rs-cell">
              <span class="rs-num cyan"><span ref="cs2Res2">3</span>x</span>
              <span class="rs-desc">volume growth in 90 days</span>
            </div>
            <div class="rs-cell">
              <span class="rs-num cyan"><span ref="cs2Res3">99.1</span>%</span>
              <span class="rs-desc">fraud block rate</span>
            </div>
          </div>
        </div>

        <!-- Visual story timeline -->
        <div class="story-timeline" aria-label="Implementation story" data-reveal="fade-up">
          <p class="story-timeline-label">// IMPLEMENTATION_STORY</p>
          <div class="timeline-steps">
            <div class="tl-step" data-reveal="fade-up">
              <div class="tl-dot"></div>
              <div class="tl-content">
                <p class="tl-marker">DAY_1</p>
                <p class="tl-title">KYC integration replaces a six-month homegrown build in a single afternoon.</p>
                <p class="tl-body">Drop-off metrics improve immediately.</p>
              </div>
            </div>
            <div class="tl-step" data-reveal="fade-up">
              <div class="tl-dot"></div>
              <div class="tl-content">
                <p class="tl-marker">WEEK_1</p>
                <p class="tl-title">Volume increases 40% as users complete KYC without abandoning.</p>
                <p class="tl-body">Support tickets about "identity verification issues" stop.</p>
              </div>
            </div>
            <div class="tl-step" data-reveal="fade-up">
              <div class="tl-dot"></div>
              <div class="tl-content">
                <p class="tl-marker">MONTH_1</p>
                <p class="tl-title">Three compliance audits pass without a single manual document review.</p>
                <p class="tl-body">The compliance team asks if they can use Prodigy internally.</p>
              </div>
            </div>
          </div>
        </div>

        <blockquote class="quote-block">
          <p class="quote-text">"The fee is shown before confirmation. That's not a feature — it's the only thing our regulatory team cared about."</p>
          <footer class="quote-attr">— Head of Product, AcmeFX</footer>
        </blockquote>

        <div class="detail-grid">
          <div v-for="item in acmefxDetails" :key="item.label" class="detail-card">
            <p class="detail-label">{{ item.label }}</p>
            <p class="detail-value">{{ item.value }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Case Study 3: Starpay ─────────────────────────────────── -->
    <section class="section-dark case-section" aria-labelledby="cs3-h" data-reveal="fade-up">
      <div class="section-inner">
        <div class="case-meta">
          <span class="case-num">03 / 03</span>
          <span class="eyebrow-inline">Starpay · Payments PSP · Series A</span>
        </div>
        <h2 id="cs3-h" class="case-headline">
          <span class="cyan">FROM INTEGRATION</span> TO <span class="purple">LIVE IN 4 HOURS.</span>
        </h2>
        <p class="case-intro">
          Starpay's engineering team started the integration at 9am. By 1pm they were processing live transactions. Zero compliance failures in 18 months of operation since.
        </p>

        <div class="metrics-row" aria-label="Starpay metrics" data-animate-stagger>
          <div v-for="m in starpayMetrics" :key="m.label" class="metric-card">
            <div class="metric-n cyan">{{ m.n }}</div>
            <div class="metric-label">{{ m.label }}</div>
          </div>
        </div>

        <!-- Before / After -->
        <div class="before-after" aria-label="Before and after comparison" data-reveal="fade-up">
          <div class="ba-col ba-col--before">
            <p class="ba-heading">BEFORE PRODIGY</p>
            <ul class="ba-list">
              <li>"Crypto is too risky for our client profile"</li>
              <li>No regulatory clarity</li>
              <li>12-month evaluation cycle</li>
              <li>Board said no</li>
            </ul>
          </div>
          <div class="ba-col ba-col--after">
            <p class="ba-heading">AFTER PRODIGY</p>
            <ul class="ba-list">
              <li>MiCA-ready framework</li>
              <li>Client demand validated</li>
              <li>Pilot in 6 weeks</li>
              <li>Board approved retrospectively</li>
            </ul>
          </div>
        </div>

        <!-- Results at a glance -->
        <div class="results-strip" aria-label="Results at a glance" data-animate-stagger data-reveal="fade-up">
          <p class="results-strip-label">RESULTS AT A GLANCE</p>
          <div class="results-strip-cells">
            <div class="rs-cell">
              <span class="rs-num cyan">6 weeks</span>
              <span class="rs-desc">pilot to live</span>
            </div>
            <div class="rs-cell">
              <span class="rs-num cyan">€<span ref="cs3Res1">8.4</span>M</span>
              <span class="rs-desc">AUM moved on-chain</span>
            </div>
            <div class="rs-cell">
              <span class="rs-num cyan"><span ref="cs3Res2">4.8</span>/5</span>
              <span class="rs-desc">advisor satisfaction</span>
            </div>
            <div class="rs-cell">
              <span class="rs-num cyan">0</span>
              <span class="rs-desc">regulatory flags</span>
            </div>
          </div>
        </div>

        <!-- Visual story timeline -->
        <div class="story-timeline" aria-label="Implementation story" data-reveal="fade-up">
          <p class="story-timeline-label">// IMPLEMENTATION_STORY</p>
          <div class="timeline-steps">
            <div class="tl-step" data-reveal="fade-up">
              <div class="tl-dot"></div>
              <div class="tl-content">
                <p class="tl-marker">DAY_1</p>
                <p class="tl-title">Pilot launches with 12 high-net-worth clients.</p>
                <p class="tl-body">Each onboards in under 4 minutes. Zero support escalations.</p>
              </div>
            </div>
            <div class="tl-step" data-reveal="fade-up">
              <div class="tl-dot"></div>
              <div class="tl-content">
                <p class="tl-marker">WEEK_1</p>
                <p class="tl-title">Client satisfaction scores arrive: 4.8 out of 5.</p>
                <p class="tl-body">One client says: "I didn't think crypto could be this straightforward."</p>
              </div>
            </div>
            <div class="tl-step" data-reveal="fade-up">
              <div class="tl-dot"></div>
              <div class="tl-content">
                <p class="tl-marker">MONTH_1</p>
                <p class="tl-title">Board reviews the pilot.</p>
                <p class="tl-body">€8.4M in assets moved on-chain. They ask why they waited.</p>
              </div>
            </div>
          </div>
        </div>

        <blockquote class="quote-block">
          <p class="quote-text">"The partner portal shows revenue per transaction, not per month. Two spreadsheets eliminated."</p>
          <footer class="quote-attr">— Head of Partnerships, Starpay</footer>
        </blockquote>

        <div class="detail-grid">
          <div v-for="item in starpayDetails" :key="item.label" class="detail-card">
            <p class="detail-label">{{ item.label }}</p>
            <p class="detail-value">{{ item.value }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Case Study 4: CryptoFlow Exchange ───────────────────── -->
    <section class="section-mid case-section" aria-labelledby="cs4-h" data-reveal="fade-up">
      <div class="section-inner">
        <div class="case-meta">
          <span class="case-num">04 / 04</span>
          <span class="eyebrow-inline">CryptoFlow Exchange · Crypto-to-Crypto · Berlin</span>
        </div>
        <h2 id="cs4-h" class="case-headline">
          <span class="cyan">12K USERS ONBOARDED</span> IN <span class="purple">WEEK ONE.</span>
        </h2>
        <p class="case-intro">
          CryptoFlow Exchange connects crypto traders across Europe. When user acquisition began stalling because new users had no easy way to deposit EUR fiat, the team started evaluating on-ramp options. Every option they evaluated either required building a KYC layer themselves or signing a 6-month contract with a compliance vendor.
        </p>
        <p class="case-intro" style="margin-top: -2rem;">
          Prodigy's automated risk engine ran 12 checks per transaction silently in the background. In the first week, 12,000 users onboarded with an average KYC time of 44 seconds and zero manual reviews triggered. The compliance team — which the exchange didn't hire — was never needed.
        </p>

        <div class="metrics-row" aria-label="CryptoFlow Exchange metrics" data-animate-stagger>
          <div v-for="m in cryptoflowMetrics" :key="m.label" class="metric-card">
            <div class="metric-n cyan">{{ m.n }}</div>
            <div class="metric-label">{{ m.label }}</div>
          </div>
        </div>

        <blockquote class="quote-block">
          <p class="quote-text">"We thought we'd need a compliance team. Prodigy ran 12 automated checks and flagged zero."</p>
          <footer class="quote-attr">— Dev Lead, CryptoFlow Exchange</footer>
        </blockquote>

        <div class="detail-grid">
          <div v-for="item in cryptoflowDetails" :key="item.label" class="detail-card">
            <p class="detail-label">{{ item.label }}</p>
            <p class="detail-value">{{ item.value }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Metrics Comparison ────────────────────────────────────── -->
    <section class="cs-metrics-section" aria-labelledby="cs-metrics-h">
      <div class="section-inner">
        <p class="eyebrow">OUTCOMES / METRICS</p>
        <h2 id="cs-metrics-h" class="cs-metrics-headline">NUMBERS THAT MATTER</h2>
        <div class="cs-panels">
          <div class="cs-panel" v-for="client in clientMetrics" :key="client.name">
            <div class="cs-panel-name">{{ client.name }}</div>
            <div class="cs-panel-stats">
              <div class="cs-pstat" v-for="s in client.stats" :key="s.label">
                <span class="cs-pnum">{{ s.val }}</span>
                <span class="cs-plbl">{{ s.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Filter Chips ──────────────────────────────────────────── -->
    <section class="filter-section" aria-label="Filter case studies">
      <div class="section-inner">
        <div class="filter-chips" role="group" aria-label="Filter by category">
          <button class="filter-chip filter-chip--active" type="button">ALL</button>
          <button class="filter-chip" type="button">NEOBANK</button>
          <button class="filter-chip" type="button">EXCHANGE</button>
          <button class="filter-chip" type="button">WALLET</button>
          <button class="filter-chip" type="button">WEALTH MANAGEMENT</button>
        </div>
      </div>
    </section>

    <!-- ── CTA ──────────────────────────────────────────────────── -->
    <section class="cta-section" aria-labelledby="cta-h" data-reveal="scale-in">
      <div class="section-inner cta-inner">
        <h2 id="cta-h" class="cta-headline">SEE HOW LONG IT <span class="cyan">ACTUALLY TAKES.</span></h2>
        <p class="cta-sub">Open the demo. Run the widget. Check the admin console. The audit trail is already populated.</p>
        <div class="cta-btns">
          <a href="http://localhost:5001" target="_blank" rel="noopener noreferrer" class="btn-primary">Open Demo →</a>
          <a href="http://localhost:5006" target="_blank" rel="noopener noreferrer" class="btn-ghost">Partner Portal →</a>
          <RouterLink to="/crypto/developers" class="btn-ghost">Integration Docs</RouterLink>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useCountUp } from '@/composables/useGSAP'

// Aggregate refs
const cryptoAgg2 = ref<HTMLElement | null>(null)
const cryptoAgg3 = ref<HTMLElement | null>(null)
useCountUp(cryptoAgg2, 2847, { duration: 3 })
useCountUp(cryptoAgg3, 4.2, { decimals: 1, duration: 2 })

// CS1 result refs
const cs1Res1 = ref<HTMLElement | null>(null)
const cs1Res2 = ref<HTMLElement | null>(null)
useCountUp(cs1Res1, 94, { duration: 2 })
useCountUp(cs1Res2, 28, { duration: 2 })

// CS2 result refs
const cs2Res1 = ref<HTMLElement | null>(null)
const cs2Res2 = ref<HTMLElement | null>(null)
const cs2Res3 = ref<HTMLElement | null>(null)
useCountUp(cs2Res1, 44, { duration: 2 })
useCountUp(cs2Res2, 3, { duration: 2 })
useCountUp(cs2Res3, 99.1, { decimals: 1, duration: 2 })

// CS3 result refs
const cs3Res1 = ref<HTMLElement | null>(null)
const cs3Res2 = ref<HTMLElement | null>(null)
useCountUp(cs3Res1, 8.4, { decimals: 1, duration: 2 })
useCountUp(cs3Res2, 4.8, { decimals: 1, duration: 2 })

// IntersectionObserver for timeline dots
onMounted(() => {
  const dots = document.querySelectorAll('.tl-dot')
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        ;(e.target as HTMLElement).classList.add('tl-dot--active')
      }
    })
  }, { threshold: 0.6 })
  dots.forEach((d) => obs.observe(d))
})

interface Metric { n: string; label: string }
interface Detail { label: string; value: string }

const nordpayMetrics: Metric[] = [
  { n: '1M+', label: 'Transactions processed' },
  { n: '0', label: 'Downtime incidents' },
  { n: '94%', label: 'KYC pass rate' },
  { n: '4h', label: 'Time to first transaction' },
]

const nordpayDetails: Detail[] = [
  { label: 'Integration time', value: 'One afternoon. Compliance review took longer than the code.' },
  { label: 'Previous approach', value: 'Three failed procurement processes over three years.' },
  { label: 'What changed', value: 'Pre-built KYC and audit trail removed every compliance blocker.' },
  { label: 'Ongoing effort', value: 'Zero. Platform handles KYC, risk scoring, and fee disclosure automatically.' },
]

const acmefxMetrics: Metric[] = [
  { n: '€2B', label: 'Annual volume (run rate)' },
  { n: '€50M', label: 'First-month volume' },
  { n: '0', label: 'Compliance incidents' },
  { n: '100%', label: 'Fee visibility pre-confirm' },
]

const acmefxDetails: Detail[] = [
  { label: 'Core requirement', value: 'Show the full fee breakdown before the user presses anything.' },
  { label: 'Previous friction', value: 'Existing off-ramp providers showed fees post-confirmation.' },
  { label: 'Technical scope', value: 'One script tag added to existing exchange frontend.' },
  { label: 'KYC result', value: '91% pass rate in week one vs 67% on previous manual process.' },
]

const starpayMetrics: Metric[] = [
  { n: '4h', label: 'Integration to live' },
  { n: '18mo', label: 'Zero compliance failures' },
  { n: '0.2%', label: 'Partner share configured' },
  { n: '47min', label: 'Time to first commission' },
]

const starpayDetails: Detail[] = [
  { label: 'Business model', value: 'Added 0.2% partner share on all crypto transactions.' },
  { label: 'Previous state', value: 'Revenue tracked in two shared Google Sheets, updated monthly.' },
  { label: 'Time to first commission', value: 'First partner commission posted 47 minutes after going live.' },
  { label: 'Compliance posture', value: 'Zero compliance incidents in 18 months. Audit trail on demand.' },
]

const cryptoflowMetrics: Metric[] = [
  { n: '12K', label: 'Users onboarded week 1' },
  { n: '44s', label: 'Average KYC time' },
  { n: '0', label: 'Manual reviews triggered' },
  { n: '12', label: 'Automated checks per transaction' },
]

const cryptoflowDetails: Detail[] = [
  { label: 'Platform', value: 'Crypto-to-crypto exchange with EUR fiat on-ramp for European traders.' },
  { label: 'Problem', value: 'User acquisition stalled — no easy EUR deposit path without a 6-month compliance vendor contract.' },
  { label: 'Solution', value: 'Prodigy\'s risk engine ran 12 silent background checks. Zero compliance team hired.' },
  { label: 'Outcome', value: '12,000 users onboarded in week one. 44s average KYC. Zero manual reviews needed.' },
]

interface ClientStat { val: string; label: string }
interface ClientMetric { name: string; stats: ClientStat[] }

const clientMetrics: ClientMetric[] = [
  {
    name: 'NordPay',
    stats: [
      { val: '65K', label: 'Users' },
      { val: '€2.1M', label: 'Volume' },
      { val: '0', label: 'Incidents' },
    ],
  },
  {
    name: 'SwapDeck',
    stats: [
      { val: '3 days', label: 'To production' },
      { val: '98.3%', label: 'Fee satisfaction' },
      { val: '1 dev', label: 'Engineering effort' },
    ],
  },
  {
    name: 'Meridian Wealth',
    stats: [
      { val: '100%', label: 'Audit completeness' },
      { val: 'ISO 27001', label: 'Aligned' },
      { val: '6 mo', label: 'Zero incidents' },
    ],
  },
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
.eyebrow-inline {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  color: rgba(232,234,255,0.5);
  text-transform: uppercase;
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

/* Case sections */
.case-section {}
.case-meta {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}
.case-num {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: rgba(0,245,255,0.5);
  letter-spacing: 0.1em;
}
.case-headline {
  font-family: 'Space Mono', monospace;
  font-size: clamp(1.25rem, 3vw, 2.25rem);
  font-weight: 700;
  line-height: 1.15;
  text-transform: uppercase;
  margin: 0 0 1.5rem;
  letter-spacing: -0.01em;
  max-width: 36ch;
}
.case-intro {
  font-family: 'Space Mono', monospace;
  font-size: 0.8125rem;
  line-height: 1.75;
  color: rgba(232,234,255,0.7);
  max-width: 58ch;
  margin: 0 0 3rem;
}

/* Metrics */
.metrics-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 1px solid rgba(0,245,255,0.15);
  margin-bottom: 3rem;
}
.metric-card {
  padding: 2rem 1.5rem;
  border-right: 1px solid rgba(0,245,255,0.1);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.metric-card:last-child { border-right: none; }
.metric-n {
  font-family: 'Space Mono', monospace;
  font-size: clamp(1.75rem, 3.5vw, 2.75rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.02em;
}
.metric-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: rgba(232,234,255,0.55);
  letter-spacing: 0.06em;
  line-height: 1.4;
}

/* Quote */
.quote-block {
  border-left: 2px solid rgba(0,245,255,0.4);
  padding: 1.25rem 0 1.25rem 1.75rem;
  margin: 0 0 3rem;
}
.quote-text {
  font-family: 'Space Mono', monospace;
  font-size: clamp(0.9rem, 1.75vw, 1.125rem);
  font-weight: 700;
  line-height: 1.55;
  color: #e8eaff;
  margin: 0 0 0.75rem;
}
.quote-attr {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: rgba(232,234,255,0.45);
  margin: 0;
}

/* Detail grid */
.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border: 1px solid rgba(0,245,255,0.12);
}
.detail-card {
  padding: 1.25rem;
  border-right: 1px solid rgba(0,245,255,0.08);
  border-bottom: 1px solid rgba(0,245,255,0.08);
  transition: background 0.15s;
}
.detail-card:hover { background: rgba(0,245,255,0.02); }
.detail-card:nth-child(2n) { border-right: none; }
.detail-card:nth-last-child(-n+2) { border-bottom: none; }
.detail-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(0,245,255,0.6);
  margin: 0 0 0.5rem;
}
.detail-value {
  font-family: 'Space Mono', monospace;
  font-size: 0.8125rem;
  line-height: 1.65;
  color: rgba(232,234,255,0.75);
  margin: 0;
}

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
  transition: background 0.2s, box-shadow 0.2s; display: inline-block;
}
.btn-primary:hover { background: #ffffff; box-shadow: 0 0 24px rgba(0,245,255,0.4); }
.btn-ghost {
  font-family: 'Space Mono', monospace; font-size: 0.8125rem; font-weight: 700;
  letter-spacing: 0.06em; color: #00f5ff;
  text-decoration: none; padding: 0.875rem 1.75rem;
  border: 1px solid rgba(0,245,255,0.4); transition: border-color 0.2s, color 0.2s; display: inline-block;
}
.btn-ghost:hover { border-color: #00f5ff; color: #ffffff; }

/* Before / After */
.before-after {
  display: grid; grid-template-columns: 1fr 1fr; gap: 0;
  border: 1px solid rgba(0,245,255,0.15); margin-bottom: 3rem;
}
.ba-col { padding: 2rem; }
.ba-col--before { border-right: 1px solid rgba(0,245,255,0.1); background: rgba(255,255,255,0.01); }
.ba-col--after { background: rgba(0,245,255,0.03); }
.ba-heading {
  font-family: 'Space Mono', monospace; font-size: 0.75rem;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: rgba(0,245,255,0.5); margin: 0 0 1rem;
}
.ba-col--after .ba-heading { color: #00f5ff; }
.ba-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.625rem; }
.ba-list li {
  font-family: 'Space Mono', monospace; font-size: 0.8125rem;
  line-height: 1.5; color: rgba(232,234,255,0.65);
  padding-left: 1.25rem; position: relative;
}
.ba-list li::before { content: '—'; position: absolute; left: 0; color: rgba(232,234,255,0.3); }
.ba-col--after .ba-list li { color: rgba(232,234,255,0.85); }
.ba-col--after .ba-list li::before { content: '→'; color: #00f5ff; }

/* Results strip */
.results-strip {
  border: 1px solid rgba(0,245,255,0.15); margin-bottom: 3rem; padding: 1.5rem;
  background: rgba(0,245,255,0.015);
}
.results-strip-label {
  font-family: 'Space Mono', monospace; font-size: 0.75rem;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: rgba(0,245,255,0.5); margin: 0 0 1.25rem;
}
.results-strip-cells { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; }
.rs-cell {
  display: flex; flex-direction: column; gap: 0.375rem;
  padding: 1rem 1.25rem; border-right: 1px solid rgba(0,245,255,0.1);
}
.rs-cell:last-child { border-right: none; }
.rs-num {
  font-family: 'Space Mono', monospace;
  font-size: clamp(1.25rem, 2.5vw, 2rem); font-weight: 700; line-height: 1;
}
.rs-desc {
  font-family: 'Space Mono', monospace; font-size: 0.75rem;
  color: rgba(232,234,255,0.45); line-height: 1.4;
}

/* Story timeline */
.story-timeline { margin-bottom: 3rem; }
.story-timeline-label {
  font-family: 'Space Mono', monospace; font-size: 0.75rem;
  letter-spacing: 0.08em; color: rgba(0,245,255,0.5); margin: 0 0 1.5rem;
}
.timeline-steps {
  display: flex; flex-direction: column; gap: 0;
  border-left: 2px solid rgba(0,245,255,0.2); margin-left: 0.75rem;
}
.tl-step { display: flex; gap: 1.5rem; padding: 1.5rem 0 1.5rem 1.5rem; position: relative; }
.tl-dot {
  position: absolute; left: -0.875rem; top: 1.75rem;
  width: 14px; height: 14px; border-radius: 50%;
  background: #050510; border: 2px solid rgba(0,245,255,0.3);
  transition: background 0.3s, border-color 0.3s; flex-shrink: 0;
}
.tl-dot--active { background: #00f5ff; border-color: #00f5ff; box-shadow: 0 0 8px rgba(0,245,255,0.5); }
.tl-content { display: flex; flex-direction: column; gap: 0.375rem; }
.tl-marker {
  font-family: 'Space Mono', monospace; font-size: 0.75rem;
  letter-spacing: 0.1em; color: rgba(0,245,255,0.6); margin: 0;
}
.tl-title {
  font-family: 'Space Mono', monospace; font-size: 0.9375rem;
  font-weight: 700; line-height: 1.3; color: #e8eaff; margin: 0;
}
.tl-body {
  font-family: 'Space Mono', monospace; font-size: 0.8125rem;
  line-height: 1.65; color: rgba(232,234,255,0.6); margin: 0;
}

@media (max-width: 900px) {
  .metrics-row { grid-template-columns: repeat(2, 1fr); }
  .metric-card:nth-child(2) { border-right: none; }
  .metric-card:nth-child(n+3) { border-top: 1px solid rgba(0,245,255,0.1); }
  .metric-card:nth-child(4) { border-right: none; }
  .detail-grid { grid-template-columns: 1fr; }
  .detail-card { border-right: none; border-bottom: 1px solid rgba(0,245,255,0.08); }
  .detail-card:last-child { border-bottom: none; }
  .before-after { grid-template-columns: 1fr; }
  .ba-col--before { border-right: none; border-bottom: 1px solid rgba(0,245,255,0.1); }
  .results-strip-cells { grid-template-columns: repeat(2, 1fr); }
  .rs-cell:nth-child(2) { border-right: none; }
  .rs-cell:nth-child(n+3) { border-top: 1px solid rgba(0,245,255,0.1); }
  .rs-cell:nth-child(4) { border-right: none; }
}

@media (max-width: 500px) {
  .metrics-row { grid-template-columns: 1fr; }
  .metric-card { border-right: none; border-bottom: 1px solid rgba(0,245,255,0.1); }
  .metric-card:last-child { border-bottom: none; }
  .results-strip-cells { grid-template-columns: 1fr; }
  .rs-cell { border-right: none; border-bottom: 1px solid rgba(0,245,255,0.1); }
  .rs-cell:last-child { border-bottom: none; }
}

/* Metrics comparison section */
.cs-metrics-section {
  background: #050510;
  border-top: 1px solid rgba(0,245,255,0.08);
  padding: 4rem 0;
}
.cs-metrics-headline {
  font-family: 'Space Mono', monospace;
  font-size: clamp(1.25rem, 3vw, 2.25rem);
  font-weight: 700;
  text-transform: uppercase;
  color: #e8eaff;
  margin: 0 0 3rem;
  letter-spacing: -0.01em;
}
.cs-panels {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border: 1px solid rgba(0,245,255,0.15);
}
.cs-panel {
  padding: 2rem;
  border-right: 1px solid rgba(0,245,255,0.1);
}
.cs-panel:last-child { border-right: none; }
.cs-panel-name {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: rgba(0,245,255,0.5);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
}
.cs-panel-stats { display: flex; flex-direction: column; gap: 1.25rem; }
.cs-pstat { display: flex; flex-direction: column; gap: 0.2rem; }
.cs-pnum {
  font-family: 'Space Mono', monospace;
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  color: #00f5ff;
}
.cs-plbl {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: rgba(0,245,255,0.4);
}

@media (max-width: 768px) {
  .cs-panels { grid-template-columns: 1fr; }
  .cs-panel { border-right: none; border-bottom: 1px solid rgba(0,245,255,0.1); }
  .cs-panel:last-child { border-bottom: none; }
}

/* ── Aggregate Results Strip ─────────────────────────────────── */
.agg-strip {
  border-bottom: 1px solid rgba(0, 245, 255, 0.12);
  background: rgba(0, 245, 255, 0.02);
}

.agg-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: clamp(1rem, 3vw, 2rem);
  padding: clamp(2.5rem, 5vw, 4rem) 0;
}

.agg-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  text-align: center;
}

.agg-n {
  font-family: 'Space Mono', monospace;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  color: #00f5ff;
  text-shadow: 0 0 20px rgba(0, 245, 255, 0.4);
  line-height: 1;
  letter-spacing: -0.02em;
  border: 1px solid rgba(0, 245, 255, 0.3);
  padding: 0.5rem 1.25rem;
}

.agg-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  color: rgba(232, 234, 255, 0.45);
  text-transform: uppercase;
}

.agg-divider {
  width: 1px;
  height: clamp(3rem, 6vw, 5rem);
  background: rgba(0, 245, 255, 0.12);
  flex-shrink: 0;
}

@media (max-width: 600px) {
  .agg-divider { display: none; }
}

/* ── Filter Chips ────────────────────────────────────────────── */
.filter-section {
  border-bottom: 1px solid rgba(0, 245, 255, 0.08);
  background: #050510;
}

.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: clamp(1.5rem, 3vw, 2rem) 0;
}

.filter-chip {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: rgba(0, 245, 255, 0.7);
  background: transparent;
  border: 1px solid rgba(0, 245, 255, 0.3);
  padding: 0.35rem 0.875rem;
  border-radius: 2px;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s, color 0.2s;
}

.filter-chip:hover {
  border-color: #00f5ff;
  color: #00f5ff;
}

.filter-chip--active {
  background: #00f5ff;
  border-color: #00f5ff;
  color: #050510;
  font-weight: 700;
}

.filter-chip--active:hover {
  background: #ffffff;
  border-color: #ffffff;
}

/* ── Live integrations badge ──────────────────────────────────── */
.ccs-live-wrap { display: inline-flex; align-items: center; gap: 0.625rem; padding: 0.375rem 1rem; border: 1px solid rgba(0,255,178,0.25); border-radius: 100px; background: rgba(0,255,178,0.04); margin-bottom: 1.5rem; }
.ccs-live-dot { width: 6px; height: 6px; border-radius: 50%; background: #00ffb2; animation: dot-pulse 2s ease-in-out infinite; }
.ccs-live-label { font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; letter-spacing: 0.08em; color: rgba(0,255,178,0.7); }
.ccs-live-num { font-family: 'IBM Plex Mono', monospace; font-size: 0.875rem; font-weight: 600; color: #00ffb2; }
@keyframes dot-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.8)} }

@media (prefers-reduced-motion: reduce) {
  .btn-primary, .btn-ghost, .detail-card { transition: none; }
  .ccs-live-dot { animation: none; }
  .tl-dot { transition: none; }
}
</style>
