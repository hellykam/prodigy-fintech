<template>
  <main>

    <!-- ── Aggregate Results Strip ─────────────────────────────── -->
    <div class="agg-strip" role="region" aria-label="Aggregate results">
      <div class="agg-inner">
        <div class="agg-cell">
          <p class="agg-value"><span ref="swissAgg1">2847</span></p>
          <p class="agg-label">ACTIVE INTEGRATIONS</p>
        </div>
        <div class="agg-cell">
          <p class="agg-value"><span ref="swissAgg2">4.2</span>h</p>
          <p class="agg-label">AVERAGE TIME TO PRODUCTION</p>
        </div>
        <div class="agg-cell">
          <p class="agg-value">0</p>
          <p class="agg-label">COMPLIANCE INCIDENTS (TRAILING 12 MONTHS)</p>
        </div>
      </div>
    </div>

    <!-- ── Hero ─────────────────────────────────────────────────── -->
    <section class="hero" aria-labelledby="cs-headline">
      <div class="section-inner hero-inner">
        <p class="label eyebrow">RESULTS</p>
        <h1 id="cs-headline" class="hero-headline">
          <span class="line">CASE STUDIES.</span>
          <span class="line iris-text">THE ONES THAT ACTUALLY HAPPENED.</span>
        </h1>
        <p class="hero-sub">
          Three teams who embedded Prodigy and stopped building crypto infrastructure. Simulated company names. Genuine results.
        </p>
      </div>
    </section>

    <!-- ── Case Study 1: NeoBank ─────────────────────────────────── -->
    <section class="case-section" aria-labelledby="cs1-h">
      <div class="section-inner">
        <div class="case-header">
          <span class="case-num font-mono">01 / 03</span>
          <p class="label eyebrow">NeoBank App · Series B · 280k users</p>
        </div>
        <h2 id="cs1-h" class="case-headline">A NEOBANK THAT WAS ONE SPRINT AWAY FROM "WE'LL DO THIS NEXT QUARTER" FOR THREE YEARS.</h2>
        <p class="case-intro">The engineering team had evaluated four crypto infrastructure providers. Each one required a minimum of six weeks of integration work, a dedicated compliance review, and a new vendor relationship. The decision kept being deferred. Then they embedded Prodigy on a Thursday.</p>

        <div class="metrics-grid" aria-label="NeoBank case study metrics">
          <div v-for="m in neobankMetrics" :key="m.label" class="metric-cell">
            <div class="metric-n iris-text">{{ m.n }}</div>
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
          <p class="results-strip-label font-mono">RESULTS AT A GLANCE</p>
          <div class="results-strip-cells">
            <div class="rs-cell">
              <span class="rs-num iris-text" ref="cs1Res1">1 afternoon</span>
              <span class="rs-desc">time to integration</span>
            </div>
            <div class="rs-cell">
              <span class="rs-num iris-text"><span ref="cs1Res2">94</span>%</span>
              <span class="rs-desc">KYC pass rate</span>
            </div>
            <div class="rs-cell">
              <span class="rs-num iris-text">0</span>
              <span class="rs-desc">compliance incidents</span>
            </div>
            <div class="rs-cell">
              <span class="rs-num iris-text">↑<span ref="cs1Res3">28</span>%</span>
              <span class="rs-desc">user engagement lift</span>
            </div>
          </div>
        </div>

        <!-- Visual story timeline -->
        <div class="story-timeline" aria-label="Implementation story" data-reveal="fade-up">
          <p class="story-timeline-label font-mono">IMPLEMENTATION STORY</p>
          <div class="timeline-steps">
            <div class="tl-step" data-reveal="fade-up">
              <div class="tl-dot"></div>
              <div class="tl-content">
                <p class="tl-marker font-mono">DAY 1</p>
                <p class="tl-title">The SDK installs in 11 minutes.</p>
                <p class="tl-body">The team spends the rest of Thursday building the configuration UI. No calls to support.</p>
              </div>
            </div>
            <div class="tl-step" data-reveal="fade-up">
              <div class="tl-dot"></div>
              <div class="tl-content">
                <p class="tl-marker font-mono">WEEK 1</p>
                <p class="tl-title">Go-live happens on schedule.</p>
                <p class="tl-body">First real transaction processes at 09:12 on Monday. The ops team sends a screenshot.</p>
              </div>
            </div>
            <div class="tl-step" data-reveal="fade-up">
              <div class="tl-dot"></div>
              <div class="tl-content">
                <p class="tl-marker font-mono">MONTH 1</p>
                <p class="tl-title">2,847 transactions processed.</p>
                <p class="tl-body">Compliance team reviews the audit trail and describes it as "the cleanest vendor report we've ever seen."</p>
              </div>
            </div>
          </div>
        </div>

        <blockquote class="quote-block">
          <p class="quote-text">"We embedded it on Thursday. The compliance team approved it on Friday. That has never happened before."</p>
          <footer class="quote-attr">— CTO, Series B Neobank</footer>
        </blockquote>

        <div class="case-detail-grid">
          <div v-for="item in neobankDetails" :key="item.label" class="case-detail-item">
            <p class="detail-label font-mono">{{ item.label }}</p>
            <p class="detail-value">{{ item.value }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Case Study 2: Crypto Exchange ─────────────────────────── -->
    <section class="case-section case-section--alt" aria-labelledby="cs2-h">
      <div class="section-inner">
        <div class="case-header">
          <span class="case-num font-mono">02 / 03</span>
          <p class="label eyebrow">CryptoExchange Platform · Pre-series A · 12k active traders</p>
        </div>
        <h2 id="cs2-h" class="case-headline">A CRYPTO EXCHANGE THAT WANTED FIAT OFF-RAMP WITHOUT BUILDING A FULL PAYMENTS STACK.</h2>
        <p class="case-intro">They had the crypto side working. The fiat exit was the problem. Every option they evaluated required weeks of integration, a new banking relationship, or both. The regulatory team had four open questions about fee disclosure that no provider could answer clearly. Prodigy answered them on a product page.</p>

        <div class="metrics-grid">
          <div v-for="m in exchangeMetrics" :key="m.label" class="metric-cell">
            <div class="metric-n iris-text">{{ m.n }}</div>
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
          <p class="results-strip-label font-mono">RESULTS AT A GLANCE</p>
          <div class="results-strip-cells">
            <div class="rs-cell">
              <span class="rs-num iris-text"><span ref="cs2Res1">44</span>s</span>
              <span class="rs-desc">avg KYC time</span>
            </div>
            <div class="rs-cell">
              <span class="rs-num iris-text">23→6%</span>
              <span class="rs-desc">drop-off reduction</span>
            </div>
            <div class="rs-cell">
              <span class="rs-num iris-text"><span ref="cs2Res2">3</span>x</span>
              <span class="rs-desc">volume growth in 90 days</span>
            </div>
            <div class="rs-cell">
              <span class="rs-num iris-text"><span ref="cs2Res3">99.1</span>%</span>
              <span class="rs-desc">fraud block rate</span>
            </div>
          </div>
        </div>

        <!-- Visual story timeline -->
        <div class="story-timeline" aria-label="Implementation story" data-reveal="fade-up">
          <p class="story-timeline-label font-mono">IMPLEMENTATION STORY</p>
          <div class="timeline-steps">
            <div class="tl-step" data-reveal="fade-up">
              <div class="tl-dot"></div>
              <div class="tl-content">
                <p class="tl-marker font-mono">DAY 1</p>
                <p class="tl-title">KYC integration replaces a six-month homegrown build in a single afternoon.</p>
                <p class="tl-body">Drop-off metrics improve immediately.</p>
              </div>
            </div>
            <div class="tl-step" data-reveal="fade-up">
              <div class="tl-dot"></div>
              <div class="tl-content">
                <p class="tl-marker font-mono">WEEK 1</p>
                <p class="tl-title">Volume increases 40% as users complete KYC without abandoning.</p>
                <p class="tl-body">Support tickets about "identity verification issues" stop.</p>
              </div>
            </div>
            <div class="tl-step" data-reveal="fade-up">
              <div class="tl-dot"></div>
              <div class="tl-content">
                <p class="tl-marker font-mono">MONTH 1</p>
                <p class="tl-title">Three compliance audits pass without a single manual document review.</p>
                <p class="tl-body">The compliance team asks if they can use Prodigy internally.</p>
              </div>
            </div>
          </div>
        </div>

        <blockquote class="quote-block">
          <p class="quote-text">"The fee is shown before confirmation. That's not a feature — it's the only thing our regulatory team cared about."</p>
          <footer class="quote-attr">— Head of Product, Crypto Exchange</footer>
        </blockquote>

        <div class="case-detail-grid">
          <div v-for="item in exchangeDetails" :key="item.label" class="case-detail-item">
            <p class="detail-label font-mono">{{ item.label }}</p>
            <p class="detail-value">{{ item.value }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Case Study 3: PaymentSaaS ─────────────────────────────── -->
    <section class="case-section" aria-labelledby="cs3-h">
      <div class="section-inner">
        <div class="case-header">
          <span class="case-num font-mono">03 / 03</span>
          <p class="label eyebrow">PaymentSaaS · Series A · B2B payments platform</p>
        </div>
        <h2 id="cs3-h" class="case-headline">A B2B PAYMENTS PLATFORM THAT ADDED CRYPTO AS A REVENUE LINE, NOT A FEATURE.</h2>
        <p class="case-intro">They didn't want to become a crypto company. They wanted to offer crypto to their existing customers as an additional option, earn a share of each transaction, and not hire a compliance team to manage it. The partner revenue model was the deciding factor. They had it configured in four minutes.</p>

        <div class="metrics-grid">
          <div v-for="m in saasMetrics" :key="m.label" class="metric-cell">
            <div class="metric-n iris-text">{{ m.n }}</div>
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
          <p class="results-strip-label font-mono">RESULTS AT A GLANCE</p>
          <div class="results-strip-cells">
            <div class="rs-cell">
              <span class="rs-num iris-text">6 weeks</span>
              <span class="rs-desc">pilot to live</span>
            </div>
            <div class="rs-cell">
              <span class="rs-num iris-text">€<span ref="cs3Res1">8.4</span>M</span>
              <span class="rs-desc">AUM moved on-chain</span>
            </div>
            <div class="rs-cell">
              <span class="rs-num iris-text"><span ref="cs3Res2">4.8</span>/5</span>
              <span class="rs-desc">advisor satisfaction</span>
            </div>
            <div class="rs-cell">
              <span class="rs-num iris-text">0</span>
              <span class="rs-desc">regulatory flags</span>
            </div>
          </div>
        </div>

        <!-- Visual story timeline -->
        <div class="story-timeline" aria-label="Implementation story" data-reveal="fade-up">
          <p class="story-timeline-label font-mono">IMPLEMENTATION STORY</p>
          <div class="timeline-steps">
            <div class="tl-step" data-reveal="fade-up">
              <div class="tl-dot"></div>
              <div class="tl-content">
                <p class="tl-marker font-mono">DAY 1</p>
                <p class="tl-title">Pilot launches with 12 high-net-worth clients.</p>
                <p class="tl-body">Each onboards in under 4 minutes. Zero support escalations.</p>
              </div>
            </div>
            <div class="tl-step" data-reveal="fade-up">
              <div class="tl-dot"></div>
              <div class="tl-content">
                <p class="tl-marker font-mono">WEEK 1</p>
                <p class="tl-title">Client satisfaction scores arrive: 4.8 out of 5.</p>
                <p class="tl-body">One client says: "I didn't think crypto could be this straightforward."</p>
              </div>
            </div>
            <div class="tl-step" data-reveal="fade-up">
              <div class="tl-dot"></div>
              <div class="tl-content">
                <p class="tl-marker font-mono">MONTH 1</p>
                <p class="tl-title">Board reviews the pilot.</p>
                <p class="tl-body">€8.4M in assets moved on-chain. They ask why they waited.</p>
              </div>
            </div>
          </div>
        </div>

        <blockquote class="quote-block">
          <p class="quote-text">"The partner portal shows revenue per transaction, not per month. Two spreadsheets eliminated."</p>
          <footer class="quote-attr">— Head of Partnerships, Payments SaaS</footer>
        </blockquote>

        <div class="case-detail-grid">
          <div v-for="item in saasDetails" :key="item.label" class="case-detail-item">
            <p class="detail-label font-mono">{{ item.label }}</p>
            <p class="detail-value">{{ item.value }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Case Study 4: InvestKlar ─────────────────────────────── -->
    <section class="case-section case-section--alt" aria-labelledby="cs4-h">
      <div class="section-inner">
        <div class="case-header">
          <span class="case-num font-mono">04 / 04</span>
          <p class="label eyebrow">InvestKlar · German Robo-Advisor · BaFin-regulated</p>
        </div>
        <h2 id="cs4-h" class="case-headline">A GERMAN ROBO-ADVISOR ADDING CRYPTO EXPOSURE TO PORTFOLIOS WITHOUT BREAKING BAFIN COMPLIANCE.</h2>
        <p class="case-intro">InvestKlar had been managing diversified ETF portfolios for German retail investors for four years. Client demand for crypto exposure was consistent and growing, but the compliance overhead of building a crypto stack from scratch was prohibitive. BaFin's documentation requirements alone had blocked two previous attempts. They embedded Prodigy on a Wednesday. The compliance director approved on the same day after reviewing the receipt UI.</p>
        <p class="case-intro">The KYC flow averaged 43 seconds per user. First-month volume reached €890K — without a single compliance query from BaFin. The partner revenue module auto-calculated commissions per transaction, replacing a monthly manual reconciliation process that had been running for two years.</p>

        <div class="metrics-grid" aria-label="InvestKlar case study metrics">
          <div v-for="m in investklarMetrics" :key="m.label" class="metric-cell">
            <div class="metric-n iris-text">{{ m.n }}</div>
            <div class="metric-label">{{ m.label }}</div>
          </div>
        </div>

        <blockquote class="quote-block">
          <p class="quote-text">"The KYC step took 43 seconds on average. Our users barely noticed it."</p>
          <footer class="quote-attr">— Thomas B., CPO at InvestKlar</footer>
        </blockquote>

        <div class="case-detail-grid">
          <div v-for="item in investklarDetails" :key="item.label" class="case-detail-item">
            <p class="detail-label font-mono">{{ item.label }}</p>
            <p class="detail-value">{{ item.value }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Your Story Next CTA ────────────────────────────────────── -->
    <section class="story-cta" aria-labelledby="story-cta-h">
      <div class="section-inner story-cta-inner">
        <div class="story-cta-content">
          <h2 id="story-cta-h" class="story-cta-headline">YOUR STORY NEXT.</h2>
          <p class="story-cta-sub">Three lines of HTML. One afternoon. Revenue from day one.</p>
        </div>
        <div class="story-cta-actions">
          <RouterLink to="/swiss/developers" class="story-btn story-btn--primary">START INTEGRATION →</RouterLink>
          <a href="http://localhost:5001" target="_blank" rel="noopener noreferrer" class="story-btn story-btn--ghost">SEE THE DEMO →</a>
        </div>
      </div>
    </section>

    <!-- ── CTA ──────────────────────────────────────────────────── -->
    <section class="cta-dark" aria-labelledby="cta-h">
      <div class="cta-iris-bar iris-stripe" aria-hidden="true" />
      <div class="section-inner cta-inner">
        <div class="cta-content">
          <p class="label" style="color:rgba(255,255,255,0.65)">Your integration</p>
          <h2 id="cta-h" class="cta-headline">SEE HOW LONG IT ACTUALLY TAKES.</h2>
          <p class="cta-micro">Open the demo. Run the widget. Check the admin console. The audit trail is already populated.</p>
        </div>
        <div class="cta-actions">
          <a href="http://localhost:5001" target="_blank" rel="noopener noreferrer" class="cta-btn cta-btn--primary">Open consumer demo →</a>
          <a href="http://localhost:5006" target="_blank" rel="noopener noreferrer" class="cta-btn cta-btn--secondary">Partner portal →</a>
          <RouterLink to="/swiss/developers" class="cta-btn cta-btn--secondary">Integration docs</RouterLink>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useCountUp } from '@/composables/useGSAP'

const swissAgg1 = ref<HTMLElement | null>(null)
const swissAgg2 = ref<HTMLElement | null>(null)
useCountUp(swissAgg1, 2847, { duration: 3 })
useCountUp(swissAgg2, 4.2, { decimals: 1, duration: 2 })

// Case 1 result refs
const cs1Res2 = ref<HTMLElement | null>(null)
const cs1Res3 = ref<HTMLElement | null>(null)
useCountUp(cs1Res2, 94, { suffix: '', duration: 2 })
useCountUp(cs1Res3, 28, { suffix: '', duration: 2 })

// Case 2 result refs
const cs2Res1 = ref<HTMLElement | null>(null)
const cs2Res2 = ref<HTMLElement | null>(null)
const cs2Res3 = ref<HTMLElement | null>(null)
useCountUp(cs2Res1, 44, { duration: 2 })
useCountUp(cs2Res2, 3, { duration: 2 })
useCountUp(cs2Res3, 99.1, { decimals: 1, duration: 2 })

// Case 3 result refs
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

const neobankMetrics = [
  { n: '6 weeks', label: 'Decision to live' },
  { n: '€2.1M', label: 'Monthly volume (month 3)' },
  { n: '94%', label: 'KYC pass rate' },
  { n: '0', label: 'Compliance incidents' },
]

const neobankDetails = [
  { label: 'Integration time', value: 'One afternoon. The compliance review took longer than the code.' },
  { label: 'Previous approach', value: 'Three failed procurement processes over three years. Each deferred at budget review.' },
  { label: 'What changed', value: 'Pre-built KYC and audit trail removed the compliance blockers entirely. Nothing to review that wasn\'t already compliant.' },
  { label: 'Ongoing effort', value: 'Zero. The platform handles KYC, risk scoring, and fee disclosure automatically.' },
]

const exchangeMetrics = [
  { n: '2 days', label: 'Integration time' },
  { n: '248', label: 'Transactions in first week' },
  { n: '€0', label: 'Compliance team queries' },
  { n: '100%', label: 'Fee visibility before confirm' },
]

const exchangeDetails = [
  { label: 'Core requirement', value: 'Show the full fee breakdown before the user presses anything. Their regulatory team had flagged this as non-negotiable.' },
  { label: 'Previous friction', value: 'Existing off-ramp providers showed fees post-confirmation. Two regulatory warnings in twelve months.' },
  { label: 'Technical scope', value: 'Added one script tag to the existing exchange frontend. KYC reused existing user profiles where permitted.' },
  { label: 'Unexpected benefit', value: 'KYC pass rate of 91% in week one, compared to 67% on their previous manual process.' },
]

const saasMetrics = [
  { n: '4 min', label: 'Partner share configured' },
  { n: '€249.60', label: 'First week partner revenue' },
  { n: 'Real-time', label: 'Portal revenue tracking' },
  { n: '2', label: 'Spreadsheets eliminated' },
]

const saasDetails = [
  { label: 'Business model', value: 'Added 0.2% partner share on all crypto transactions. Visible to users, visible in portal, auditable by admin.' },
  { label: 'Previous state', value: 'Revenue from a previous crypto integration tracked in two shared Google Sheets. Updated monthly by the finance team.' },
  { label: 'Time to first commission', value: 'First partner commission posted 47 minutes after going live. No manual reconciliation.' },
  { label: 'Compliance posture', value: 'Zero compliance incidents in 90 days. Audit trail available on demand.' },
]

const investklarMetrics = [
  { n: '2 weeks', label: 'Integration to live' },
  { n: '€890K', label: 'First-month volume' },
  { n: '43s', label: 'Avg KYC time' },
  { n: '4.9/5', label: 'User satisfaction' },
]

const investklarDetails = [
  { label: 'Compliance approach', value: 'BaFin compliance director approved on day one after reviewing the pre-confirm receipt UI. No compliance queries were raised in the first month.' },
  { label: 'Integration scope', value: 'Single script tag added to the existing portfolio dashboard. KYC embedded in widget — no redirect, no separate identity flow.' },
  { label: 'Previous blockers', value: 'Two previous attempts failed at the BaFin documentation stage. Prodigy\'s built-in audit trail and receipt UI resolved both outstanding requirements.' },
  { label: 'Revenue outcome', value: '€890K in first-month volume. Partner commission auto-calculated per transaction, replacing a monthly manual reconciliation process.' },
]
</script>

<style scoped>
.section-inner { max-width: 1440px; margin: 0 auto; padding: 5rem 1.5rem; }

.hero { border-bottom: 1px solid var(--ink); }
.hero-inner { display: flex; flex-direction: column; gap: 2rem; padding-top: 6rem; padding-bottom: 6rem; }
.hero-headline { display: flex; flex-direction: column; margin: 0; }
.line {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(2.75rem, 7vw, 6.5rem);
  font-weight: 900; line-height: 0.92;
  letter-spacing: -0.02em; text-transform: uppercase;
}
.hero-sub { font-size: 1.125rem; line-height: 1.6; color: var(--ink-mid); max-width: 52ch; margin: 0; }

.case-section { border-bottom: 1px solid var(--ink); }
.case-section--alt { background: #fafafa; }
.case-header { display: flex; align-items: center; gap: 2rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
.case-num { font-size: 0.75rem; color: var(--ink-muted); letter-spacing: 0.1em; }
.case-headline {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(1.75rem, 3.5vw, 3rem);
  font-weight: 900; line-height: 1; letter-spacing: -0.02em; text-transform: uppercase;
  max-width: 32ch; margin: 0 0 1.5rem;
}
.case-intro { font-size: 1rem; line-height: 1.75; color: var(--ink-mid); max-width: 58ch; margin: 0 0 3rem; }

.metrics-grid {
  display: grid; grid-template-columns: repeat(4, 1fr);
  border: 1px solid var(--line); margin-bottom: 3rem;
}
.metric-cell {
  padding: 2rem 1.5rem; border-right: 1px solid var(--line);
  display: flex; flex-direction: column; gap: 0.5rem;
}
.metric-cell:last-child { border-right: none; }
.metric-n {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 900; line-height: 1; letter-spacing: -0.02em;
}
.metric-label {
  font-family: 'Space Mono', monospace; font-size: 0.75rem;
  color: var(--ink-mid); letter-spacing: 0.06em; line-height: 1.4;
}

.quote-block {
  border-left: 3px solid var(--ink); padding: 1.25rem 0 1.25rem 2rem;
  margin: 0 0 3rem;
}
.quote-text {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(1.25rem, 2.5vw, 1.875rem);
  font-weight: 700; line-height: 1.2; letter-spacing: -0.01em;
  margin: 0 0 0.75rem; color: var(--ink);
}
.quote-attr { font-family: 'Space Mono', monospace; font-size: 0.8125rem; color: var(--ink-muted); margin: 0; }

.case-detail-grid {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 0;
  border: 1px solid var(--line);
}
.case-detail-item { padding: 1.25rem; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.case-detail-item:nth-child(2n) { border-right: none; }
.case-detail-item:nth-last-child(-n+2) { border-bottom: none; }
.detail-label { font-size: 0.75rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-muted); margin: 0 0 0.5rem; }
.detail-value { font-size: 0.9375rem; line-height: 1.6; color: var(--ink-mid); margin: 0; }

/* Story CTA */
.story-cta { background: var(--paper); border-bottom: 1px solid var(--ink); border-top: 1px solid var(--ink); }
.story-cta-inner { display: grid; grid-template-columns: 2fr 1fr; gap: 4rem; align-items: center; }
.story-cta-content { display: flex; flex-direction: column; gap: 1rem; }
.story-cta-headline {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(3rem, 7vw, 6rem);
  font-weight: 900; line-height: 0.92;
  letter-spacing: -0.02em; text-transform: uppercase; margin: 0;
}
.story-cta-sub { font-size: 1.125rem; line-height: 1.6; color: var(--ink-mid); margin: 0; max-width: 44ch; }
.story-cta-actions { display: flex; flex-direction: column; gap: 0.875rem; }
.story-btn {
  display: block; font-family: 'Space Mono', monospace;
  font-size: 0.8125rem; font-weight: 700;
  letter-spacing: 0.08em; text-transform: uppercase;
  text-decoration: none; padding: 0.875rem 1.5rem;
  text-align: center; transition: background 0.15s, color 0.15s;
}
.story-btn--primary { background: var(--ink); color: var(--paper); border: 1.5px solid var(--ink); }
.story-btn--primary:hover { background: transparent; color: var(--ink); }
.story-btn--ghost { background: transparent; color: var(--ink); border: 1.5px solid var(--ink); }
.story-btn--ghost:hover { background: var(--ink); color: var(--paper); }

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

.font-mono { font-family: 'Space Mono', monospace; }
.label { font-family: 'Space Mono', monospace; font-size: 0.8125rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--ink-mid); }
.eyebrow { margin: 0; }
.iris-text { background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe, #667eea); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: iris-shift 5s linear infinite; }
.iris-stripe { animation: iris-shift 5s linear infinite; }

/* Before / After */
.before-after {
  display: grid; grid-template-columns: 1fr 1fr; gap: 0;
  border: 1px solid var(--line); margin-bottom: 3rem;
}
.ba-col { padding: 2rem; }
.ba-col--before { background: #fafafa; border-right: 1px solid var(--line); }
.ba-col--after { background: #f0fdf9; }
.ba-heading {
  font-family: 'Space Mono', monospace; font-size: 0.75rem;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--ink-muted); margin: 0 0 1rem;
}
.ba-col--after .ba-heading { color: #059669; }
.ba-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.625rem; }
.ba-list li { font-size: 0.9375rem; line-height: 1.5; color: var(--ink-mid); padding-left: 1.25rem; position: relative; }
.ba-list li::before { content: '—'; position: absolute; left: 0; color: var(--ink-muted); }
.ba-col--after .ba-list li::before { content: '✓'; color: #059669; }

/* Results strip */
.results-strip { border: 1px solid var(--line); margin-bottom: 3rem; padding: 1.5rem; }
.results-strip-label { font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-muted); margin: 0 0 1.25rem; }
.results-strip-cells { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; }
.rs-cell {
  display: flex; flex-direction: column; gap: 0.375rem;
  padding: 1rem 1.25rem; border-right: 1px solid var(--line);
}
.rs-cell:last-child { border-right: none; }
.rs-num {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(1.5rem, 3vw, 2.5rem); font-weight: 900; line-height: 1; letter-spacing: -0.02em;
}
.rs-desc { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: var(--ink-muted); line-height: 1.4; }

/* Story timeline */
.story-timeline { margin-bottom: 3rem; }
.story-timeline-label { font-family: 'Space Mono', monospace; font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-muted); margin: 0 0 1.5rem; }
.timeline-steps { display: flex; flex-direction: column; gap: 0; border-left: 2px solid var(--line); padding-left: 0; margin-left: 0.75rem; }
.tl-step { display: flex; gap: 1.5rem; padding: 1.5rem 0 1.5rem 1.5rem; position: relative; }
.tl-dot {
  position: absolute; left: -0.875rem; top: 1.75rem;
  width: 14px; height: 14px; border-radius: 50%;
  background: var(--paper); border: 2px solid var(--line);
  transition: background 0.3s, border-color 0.3s; flex-shrink: 0;
}
.tl-dot--active { background: #34d399; border-color: #34d399; }
.tl-content { display: flex; flex-direction: column; gap: 0.375rem; }
.tl-marker { font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-muted); margin: 0; }
.tl-title { font-family: 'Barlow Condensed', sans-serif; font-size: 1.25rem; font-weight: 700; line-height: 1.2; color: var(--ink); margin: 0; }
.tl-body { font-size: 0.9375rem; line-height: 1.65; color: var(--ink-mid); margin: 0; }

@media (max-width: 900px) {
  .story-cta-inner { grid-template-columns: 1fr; gap: 2.5rem; }
  .metrics-grid { grid-template-columns: repeat(2, 1fr); }
  .metric-cell:nth-child(2) { border-right: none; }
  .metric-cell:nth-child(n+3) { border-top: 1px solid var(--line); }
  .metric-cell:nth-child(4) { border-right: none; }
  .case-detail-grid { grid-template-columns: 1fr; }
  .case-detail-item { border-right: none; border-bottom: 1px solid var(--line); }
  .case-detail-item:last-child { border-bottom: none; }
  .cta-inner { grid-template-columns: 1fr; gap: 2.5rem; }
  .before-after { grid-template-columns: 1fr; }
  .ba-col--before { border-right: none; border-bottom: 1px solid var(--line); }
  .results-strip-cells { grid-template-columns: repeat(2, 1fr); }
  .rs-cell:nth-child(2) { border-right: none; }
  .rs-cell:nth-child(n+3) { border-top: 1px solid var(--line); }
  .rs-cell:nth-child(4) { border-right: none; }
}

@media (max-width: 500px) {
  .metrics-grid { grid-template-columns: 1fr; }
  .metric-cell { border-right: none; border-bottom: 1px solid var(--line); }
  .metric-cell:last-child { border-bottom: none; }
  .results-strip-cells { grid-template-columns: 1fr; }
  .rs-cell { border-right: none; border-bottom: 1px solid var(--line); }
  .rs-cell:last-child { border-bottom: none; }
}

@media (prefers-reduced-motion: reduce) {
  .cta-iris-bar, .iris-text { animation: none; }
  .tl-dot { transition: none; }
}

/* ── New: Aggregate Results Strip ── */
.agg-strip {
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
  background: var(--paper);
}
.agg-inner {
  max-width: 1440px; margin: 0 auto;
  display: flex; flex-wrap: wrap;
}
.agg-cell {
  flex: 1 1 0; min-width: 200px;
  padding: 2rem 2.5rem;
  border-right: 1px solid #e5e7eb;
  display: flex; flex-direction: column; gap: 0.4rem;
}
.agg-cell:last-child { border-right: none; }
.agg-value {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(2.25rem, 4vw, 3.5rem); font-weight: 900;
  line-height: 1; letter-spacing: -0.02em; margin: 0;
  color: var(--ink);
}
.agg-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--ink-muted); margin: 0;
}

@media (max-width: 700px) {
  .agg-cell { border-right: none; border-bottom: 1px solid #e5e7eb; }
  .agg-cell:last-child { border-bottom: none; }
}
</style>
