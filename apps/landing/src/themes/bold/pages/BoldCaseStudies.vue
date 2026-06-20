<template>
  <main class="bold-page">

    <!-- ── Hero ─────────────────────────────────────────────────── -->
    <section class="hero" aria-labelledby="cs-headline">
      <div class="iris-bar" aria-hidden="true" />
      <div class="section-inner hero-inner">
        <p class="eyebrow eyebrow--light">RESULTS</p>
        <h1 id="cs-headline" class="hero-headline" ref="heroTitle">CASE STUDIES. THE ONES THAT ACTUALLY HAPPENED.</h1>
        <p class="hero-sub">Four teams who embedded Prodigy and stopped building crypto infrastructure. Simulated company names. Genuine results.</p>
      </div>
    </section>

    <!-- ── Aggregate Results Bar ─────────────────────────────────── -->
    <section class="agg-bar" aria-labelledby="agg-bar-headline" data-animate-stagger ref="aggSection">
      <h2 id="agg-bar-headline" class="sr-only">Aggregate results</h2>
      <div class="agg-bar-inner">
        <div class="agg-chip">
          <span class="agg-num" data-grad-sweep ref="boldAgg1">2847</span>
          <span class="agg-lbl">INTEGRATIONS LIVE</span>
        </div>
        <div class="agg-chip">
          <span class="agg-num"><span ref="boldAgg2">4.2</span>h</span>
          <span class="agg-lbl">AVG TO PRODUCTION</span>
        </div>
        <div class="agg-chip">
          <span class="agg-num">0</span>
          <span class="agg-lbl">COMPLIANCE INCIDENTS</span>
        </div>
      </div>
    </section>

    <!-- ── Case Study 1: NeoBank ─────────────────────────────────── -->
    <section class="case-section" aria-labelledby="cs1-h">
      <div class="section-inner">
        <div class="case-tag">
          <span class="tag-num">01 / 04</span>
          <p class="eyebrow" style="margin:0">NeoBank App · Series B · 280k users</p>
        </div>
        <h2 id="cs1-h" class="case-headline">A NEOBANK THAT WAS ONE SPRINT AWAY FROM "WE'LL DO THIS NEXT QUARTER" FOR THREE YEARS.</h2>
        <p class="case-body">The engineering team had evaluated four crypto infrastructure providers. Each required six weeks of integration work, a dedicated compliance review, and a new vendor relationship. The decision kept being deferred. Then they embedded Prodigy on a Thursday.</p>
        <div class="metrics">
          <div v-for="m in neobankMetrics" :key="m.label" class="metric">
            <div class="metric-n">{{ m.n }}</div>
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
              <span class="rs-num">1 afternoon</span>
              <span class="rs-desc">time to integration</span>
            </div>
            <div class="rs-cell">
              <span class="rs-num"><span ref="b1Res1">94</span>%</span>
              <span class="rs-desc">KYC pass rate</span>
            </div>
            <div class="rs-cell">
              <span class="rs-num">0</span>
              <span class="rs-desc">compliance incidents</span>
            </div>
            <div class="rs-cell">
              <span class="rs-num">↑<span ref="b1Res2">28</span>%</span>
              <span class="rs-desc">user engagement lift</span>
            </div>
          </div>
        </div>

        <!-- Visual story timeline -->
        <div class="story-timeline" aria-label="Implementation story" data-reveal="fade-up">
          <p class="story-timeline-label">IMPLEMENTATION STORY</p>
          <div class="timeline-steps">
            <div class="tl-step" data-reveal="fade-up">
              <div class="tl-dot"></div>
              <div class="tl-content">
                <p class="tl-marker">DAY 1</p>
                <p class="tl-title">The SDK installs in 11 minutes.</p>
                <p class="tl-body">The team spends the rest of Thursday building the configuration UI. No calls to support.</p>
              </div>
            </div>
            <div class="tl-step" data-reveal="fade-up">
              <div class="tl-dot"></div>
              <div class="tl-content">
                <p class="tl-marker">WEEK 1</p>
                <p class="tl-title">Go-live happens on schedule.</p>
                <p class="tl-body">First real transaction processes at 09:12 on Monday. The ops team sends a screenshot.</p>
              </div>
            </div>
            <div class="tl-step" data-reveal="fade-up">
              <div class="tl-dot"></div>
              <div class="tl-content">
                <p class="tl-marker">MONTH 1</p>
                <p class="tl-title">2,847 transactions processed.</p>
                <p class="tl-body">Compliance team reviews the audit trail and describes it as "the cleanest vendor report we've ever seen."</p>
              </div>
            </div>
          </div>
        </div>

        <blockquote class="quote">
          <p class="quote-text">"We embedded it on Thursday. The compliance team approved it on Friday. That has never happened before."</p>
          <footer class="quote-attr">— CTO, Series B Neobank</footer>
        </blockquote>
        <div class="detail-grid">
          <div v-for="item in neobankDetails" :key="item.label" class="detail-card">
            <p class="detail-label">{{ item.label }}</p>
            <p class="detail-value">{{ item.value }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Case Study 2: Crypto Exchange ─────────────────────────── -->
    <section class="case-section case-section--dark" aria-labelledby="cs2-h">
      <div class="section-inner">
        <div class="case-tag">
          <span class="tag-num tag-num--light">02 / 04</span>
          <p class="eyebrow eyebrow--light" style="margin:0">CryptoExchange Platform · Pre-series A · 12k traders</p>
        </div>
        <h2 id="cs2-h" class="case-headline case-headline--light">A CRYPTO EXCHANGE THAT WANTED FIAT OFF-RAMP WITHOUT BUILDING A FULL PAYMENTS STACK.</h2>
        <p class="case-body case-body--light">They had the crypto side working. The fiat exit was the problem. Every option required weeks of integration or a new banking relationship. The regulatory team had four open questions about fee disclosure. Prodigy answered them on a product page.</p>
        <div class="metrics metrics--dark">
          <div v-for="m in exchangeMetrics" :key="m.label" class="metric">
            <div class="metric-n metric-n--light">{{ m.n }}</div>
            <div class="metric-label metric-label--light">{{ m.label }}</div>
          </div>
        </div>

        <!-- Before / After dark -->
        <div class="before-after before-after--dark" aria-label="Before and after comparison" data-reveal="fade-up">
          <div class="ba-col ba-col--before-dark">
            <p class="ba-heading ba-heading--light">BEFORE PRODIGY</p>
            <ul class="ba-list ba-list--dark">
              <li>KYC flow built in-house</li>
              <li>23% drop-off at document upload</li>
              <li>Manual fraud review</li>
              <li>3 FTE dedicated to compliance</li>
            </ul>
          </div>
          <div class="ba-col ba-col--after-dark">
            <p class="ba-heading ba-heading--after-dark">AFTER PRODIGY</p>
            <ul class="ba-list ba-list--dark">
              <li>Prodigy KYC embedded</li>
              <li>94% pass rate</li>
              <li>Automated fraud scoring</li>
              <li>0 extra headcount</li>
            </ul>
          </div>
        </div>

        <!-- Results at a glance dark -->
        <div class="results-strip results-strip--dark" aria-label="Results at a glance" data-animate-stagger data-reveal="fade-up">
          <p class="results-strip-label results-strip-label--light">RESULTS AT A GLANCE</p>
          <div class="results-strip-cells">
            <div class="rs-cell rs-cell--dark">
              <span class="rs-num rs-num--light"><span ref="b2Res1">44</span>s</span>
              <span class="rs-desc rs-desc--light">avg KYC time</span>
            </div>
            <div class="rs-cell rs-cell--dark">
              <span class="rs-num rs-num--light">23→6%</span>
              <span class="rs-desc rs-desc--light">drop-off reduction</span>
            </div>
            <div class="rs-cell rs-cell--dark">
              <span class="rs-num rs-num--light"><span ref="b2Res2">3</span>x</span>
              <span class="rs-desc rs-desc--light">volume growth in 90 days</span>
            </div>
            <div class="rs-cell rs-cell--dark">
              <span class="rs-num rs-num--light"><span ref="b2Res3">99.1</span>%</span>
              <span class="rs-desc rs-desc--light">fraud block rate</span>
            </div>
          </div>
        </div>

        <!-- Visual story timeline dark -->
        <div class="story-timeline story-timeline--dark" aria-label="Implementation story" data-reveal="fade-up">
          <p class="story-timeline-label story-timeline-label--light">IMPLEMENTATION STORY</p>
          <div class="timeline-steps">
            <div class="tl-step" data-reveal="fade-up">
              <div class="tl-dot tl-dot--dark"></div>
              <div class="tl-content">
                <p class="tl-marker tl-marker--light">DAY 1</p>
                <p class="tl-title tl-title--light">KYC integration replaces a six-month homegrown build in a single afternoon.</p>
                <p class="tl-body tl-body--light">Drop-off metrics improve immediately.</p>
              </div>
            </div>
            <div class="tl-step" data-reveal="fade-up">
              <div class="tl-dot tl-dot--dark"></div>
              <div class="tl-content">
                <p class="tl-marker tl-marker--light">WEEK 1</p>
                <p class="tl-title tl-title--light">Volume increases 40% as users complete KYC without abandoning.</p>
                <p class="tl-body tl-body--light">Support tickets about "identity verification issues" stop.</p>
              </div>
            </div>
            <div class="tl-step" data-reveal="fade-up">
              <div class="tl-dot tl-dot--dark"></div>
              <div class="tl-content">
                <p class="tl-marker tl-marker--light">MONTH 1</p>
                <p class="tl-title tl-title--light">Three compliance audits pass without a single manual document review.</p>
                <p class="tl-body tl-body--light">The compliance team asks if they can use Prodigy internally.</p>
              </div>
            </div>
          </div>
        </div>

        <blockquote class="quote quote--light">
          <p class="quote-text">"The fee is shown before confirmation. That's not a feature — it's the only thing our regulatory team cared about."</p>
          <footer class="quote-attr quote-attr--light">— Head of Product, Crypto Exchange</footer>
        </blockquote>
        <div class="detail-grid detail-grid--dark">
          <div v-for="item in exchangeDetails" :key="item.label" class="detail-card">
            <p class="detail-label detail-label--light">{{ item.label }}</p>
            <p class="detail-value detail-value--light">{{ item.value }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Case Study 3: PaymentSaaS ─────────────────────────────── -->
    <section class="case-section" aria-labelledby="cs3-h">
      <div class="section-inner">
        <div class="case-tag">
          <span class="tag-num">03 / 04</span>
          <p class="eyebrow" style="margin:0">PaymentSaaS · Series A · B2B payments platform</p>
        </div>
        <h2 id="cs3-h" class="case-headline">A B2B PAYMENTS PLATFORM THAT ADDED CRYPTO AS A REVENUE LINE, NOT A FEATURE.</h2>
        <p class="case-body">They didn't want to become a crypto company. They wanted crypto as an additional option, earn a share of each transaction, and not hire a compliance team. The partner revenue model was the deciding factor. Configured in four minutes.</p>
        <div class="metrics">
          <div v-for="m in saasMetrics" :key="m.label" class="metric">
            <div class="metric-n">{{ m.n }}</div>
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
              <span class="rs-num">6 weeks</span>
              <span class="rs-desc">pilot to live</span>
            </div>
            <div class="rs-cell">
              <span class="rs-num">€<span ref="b3Res1">8.4</span>M</span>
              <span class="rs-desc">AUM moved on-chain</span>
            </div>
            <div class="rs-cell">
              <span class="rs-num"><span ref="b3Res2">4.8</span>/5</span>
              <span class="rs-desc">advisor satisfaction</span>
            </div>
            <div class="rs-cell">
              <span class="rs-num">0</span>
              <span class="rs-desc">regulatory flags</span>
            </div>
          </div>
        </div>

        <!-- Visual story timeline -->
        <div class="story-timeline" aria-label="Implementation story" data-reveal="fade-up">
          <p class="story-timeline-label">IMPLEMENTATION STORY</p>
          <div class="timeline-steps">
            <div class="tl-step" data-reveal="fade-up">
              <div class="tl-dot"></div>
              <div class="tl-content">
                <p class="tl-marker">DAY 1</p>
                <p class="tl-title">Pilot launches with 12 high-net-worth clients.</p>
                <p class="tl-body">Each onboards in under 4 minutes. Zero support escalations.</p>
              </div>
            </div>
            <div class="tl-step" data-reveal="fade-up">
              <div class="tl-dot"></div>
              <div class="tl-content">
                <p class="tl-marker">WEEK 1</p>
                <p class="tl-title">Client satisfaction scores arrive: 4.8 out of 5.</p>
                <p class="tl-body">One client says: "I didn't think crypto could be this straightforward."</p>
              </div>
            </div>
            <div class="tl-step" data-reveal="fade-up">
              <div class="tl-dot"></div>
              <div class="tl-content">
                <p class="tl-marker">MONTH 1</p>
                <p class="tl-title">Board reviews the pilot.</p>
                <p class="tl-body">€8.4M in assets moved on-chain. They ask why they waited.</p>
              </div>
            </div>
          </div>
        </div>

        <blockquote class="quote">
          <p class="quote-text">"The partner portal shows revenue per transaction, not per month. Two spreadsheets eliminated."</p>
          <footer class="quote-attr">— Head of Partnerships, Payments SaaS</footer>
        </blockquote>
        <div class="detail-grid">
          <div v-for="item in saasDetails" :key="item.label" class="detail-card">
            <p class="detail-label">{{ item.label }}</p>
            <p class="detail-value">{{ item.value }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Case Study 4: InvestKlar ──────────────────────────────── -->
    <section class="case-section case-section--dark" aria-labelledby="cs4-h">
      <div class="section-inner">
        <div class="case-tag">
          <span class="tag-num tag-num--light">04 / 04</span>
          <p class="eyebrow eyebrow--light" style="margin:0">Fintech / Wealth Tech · Munich, Germany</p>
        </div>
        <h2 id="cs4-h" class="case-headline case-headline--light">A GERMAN ROBO-ADVISOR THAT GOT COMPLIANCE APPROVAL IN A SINGLE DEMO.</h2>
        <p class="case-body case-body--light">InvestKlar offers automated portfolio management for retail investors in Germany, regulated under BaFin rules. When demand for crypto allocation in portfolios grew, adding a crypto widget required satisfying both the compliance director and a regulatory review board — neither known for quick approvals.</p>
        <p class="case-body case-body--light">The Prodigy fee receipt UI made the difference. The compliance director saw the transparent pre-confirm breakdown in a demo and approved the integration on the spot, skipping two rounds of scheduled review meetings. InvestKlar went to production in two weeks and recorded €890K in first-month volume.</p>
        <div class="metrics metrics--dark">
          <div v-for="m in investklarMetrics" :key="m.label" class="metric">
            <div class="metric-n metric-n--light">{{ m.n }}</div>
            <div class="metric-label metric-label--light">{{ m.label }}</div>
          </div>
        </div>
        <blockquote class="quote quote--light">
          <p class="quote-text">"THE KYC STEP TOOK 43 SECONDS ON AVERAGE. OUR USERS BARELY NOTICED."</p>
          <footer class="quote-attr quote-attr--light">— Thomas B., CPO at InvestKlar</footer>
        </blockquote>
        <div class="detail-grid detail-grid--dark">
          <div v-for="item in investklarDetails" :key="item.label" class="detail-card">
            <p class="detail-label detail-label--light">{{ item.label }}</p>
            <p class="detail-value detail-value--light">{{ item.value }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Final CTA ───────────────────────────────────────────── -->
    <section class="cs-cta-final" aria-labelledby="cs-cta-h" ref="ctaSection">
      <div class="section-inner cs-cta-inner">
        <h2 id="cs-cta-h" class="cs-cta-headline">YOUR STORY NEXT.</h2>
        <p class="cs-cta-sub">Three lines of HTML. One afternoon. Revenue from day one.</p>
        <div class="cs-cta-actions">
          <RouterLink to="/bold/developers" class="cs-btn-fill">INTEGRATION DOCS →</RouterLink>
          <a href="http://localhost:5001" target="_blank" rel="noopener noreferrer" class="cs-btn-ghost">OPEN DEMO →</a>
        </div>
        <p class="cs-cta-disclaimer">NordPay, SwapDeck, Meridian Wealth, and InvestKlar are fictional companies used for illustration purposes only.</p>
      </div>
    </section>

    <!-- ── CTA ──────────────────────────────────────────────────── -->
    <section class="cta-section" aria-labelledby="cta-h">
      <div class="section-inner cta-inner">
        <div class="cta-content">
          <p class="eyebrow">Your integration</p>
          <h2 id="cta-h" class="cta-headline">SEE HOW LONG IT ACTUALLY TAKES.</h2>
          <p class="cta-sub">Open the demo. Run the widget. Check the admin console. The audit trail is already populated.</p>
        </div>
        <div class="cta-actions">
          <a href="http://localhost:5001" target="_blank" rel="noopener noreferrer" class="btn-fill">OPEN DEMO →</a>
          <a href="http://localhost:5006" target="_blank" rel="noopener noreferrer" class="btn-outline">PARTNER PORTAL →</a>
          <RouterLink to="/bold/developers" class="btn-outline">INTEGRATION DOCS →</RouterLink>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useCountUp } from '@/composables/useGSAP'
import { useSplitReveal, useGradientSweep } from '@/composables/useSplitReveal'
import { useMagneticAll } from '@/composables/useMagneticButton'

const boldAgg1 = ref<HTMLElement | null>(null)
const boldAgg2 = ref<HTMLElement | null>(null)
useCountUp(boldAgg1, 2847, { duration: 3 })
useCountUp(boldAgg2, 4.2, { decimals: 1, duration: 2 })

// CS1 result refs
const b1Res1 = ref<HTMLElement | null>(null)
const b1Res2 = ref<HTMLElement | null>(null)
useCountUp(b1Res1, 94, { duration: 2 })
useCountUp(b1Res2, 28, { duration: 2 })

// CS2 result refs
const b2Res1 = ref<HTMLElement | null>(null)
const b2Res2 = ref<HTMLElement | null>(null)
const b2Res3 = ref<HTMLElement | null>(null)
useCountUp(b2Res1, 44, { duration: 2 })
useCountUp(b2Res2, 3, { duration: 2 })
useCountUp(b2Res3, 99.1, { decimals: 1, duration: 2 })

// CS3 result refs
const b3Res1 = ref<HTMLElement | null>(null)
const b3Res2 = ref<HTMLElement | null>(null)
useCountUp(b3Res1, 8.4, { decimals: 1, duration: 2 })
useCountUp(b3Res2, 4.8, { decimals: 1, duration: 2 })

// ── Animation refs ─────────────────────────────────────────────
const heroTitle = ref<HTMLElement | null>(null)
const aggSection = ref<HTMLElement | null>(null)
const ctaSection = ref<HTMLElement | null>(null)

// Hero h1 is plain text — word stagger
useSplitReveal(heroTitle, { type: 'words', stagger: 0.08, y: 40, duration: 0.7, ease: 'back.out(1.7)', delay: 0.1 })
useGradientSweep(aggSection, { color: '#2563eb', duration: 1000 })
useMagneticAll(ctaSection, 'a, button', { strength: 0.5, returnDuration: 400 })

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
  { label: 'Previous state', value: 'Three failed procurement processes over three years, each deferred at budget review.' },
  { label: 'What changed', value: 'Pre-built KYC and audit trail removed the compliance blockers entirely.' },
  { label: 'Ongoing effort', value: 'Zero. KYC, risk scoring, and fee disclosure all handled automatically.' },
]
const exchangeMetrics = [
  { n: '2 days', label: 'Integration time' },
  { n: '248', label: 'Transactions in first week' },
  { n: '€0', label: 'Compliance queries' },
  { n: '100%', label: 'Fee visibility before confirm' },
]
const exchangeDetails = [
  { label: 'Core requirement', value: 'Show full fee breakdown before user presses confirm. Non-negotiable for their regulatory team.' },
  { label: 'Previous problem', value: 'Prior providers showed fees post-confirmation. Two regulatory warnings in 12 months.' },
  { label: 'Technical scope', value: 'One script tag. KYC reused existing user profiles where permitted.' },
  { label: 'Unexpected result', value: 'KYC pass rate 91% week one vs. 67% on previous manual process.' },
]
const saasMetrics = [
  { n: '4 min', label: 'Partner share configured' },
  { n: '€249.60', label: 'First week partner revenue' },
  { n: 'Real-time', label: 'Portal revenue tracking' },
  { n: '2', label: 'Spreadsheets eliminated' },
]
const saasDetails = [
  { label: 'Business model', value: '0.2% partner share on all transactions. Visible to users, auditable by admin.' },
  { label: 'Previous state', value: 'Revenue tracked in two shared Google Sheets, updated monthly by finance.' },
  { label: 'Time to first commission', value: 'First commission posted 47 minutes after going live. No manual reconciliation.' },
  { label: 'Compliance', value: 'Zero incidents in 90 days. Audit trail available on demand.' },
]
const investklarMetrics = [
  { n: '2 weeks', label: 'To production' },
  { n: '€890K', label: 'First-month volume' },
  { n: '4.9 / 5', label: 'User satisfaction' },
]
const investklarDetails = [
  { label: 'Regulatory context', value: 'BaFin-regulated robo-advisor adding crypto allocation to managed portfolios. Two separate approval bodies required.' },
  { label: 'The blocker', value: 'Compliance director and regulatory review board — neither known for quick approvals — both needed to sign off.' },
  { label: 'What changed', value: 'The transparent pre-confirm fee breakdown in a live demo. Compliance director approved on the spot, skipping two scheduled review meetings.' },
  { label: 'KYC performance', value: '43-second average KYC completion time. Users barely noticed the step.' },
]
</script>

<style scoped>
.bold-page { background: #f5f5f0; color: #0a0a0a; }
.section-inner { max-width: 1440px; margin: 0 auto; padding: 5rem 1.5rem; }
.iris-bar { height: 4px; background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe, #667eea); background-size: 200% auto; animation: iris 5s linear infinite; will-change: background-position; }
@keyframes iris { 0% { background-position: 0% center; } 100% { background-position: -200% center; } }
.hero { background: #0a0a0a; }
.hero-inner { padding-top: 5rem; padding-bottom: 5rem; display: flex; flex-direction: column; gap: 1.5rem; }
.hero-headline { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.5rem, 7vw, 7rem); line-height: 0.92; letter-spacing: -0.01em; color: #f5f5f0; margin: 0; }
.hero-sub { font-family: 'Space Grotesk', sans-serif; font-size: 1.125rem; line-height: 1.65; color: rgba(245,245,240,0.7); max-width: 52ch; margin: 0; }
.eyebrow { font-family: 'Space Grotesk', sans-serif; font-size: 0.8125rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(10,10,10,0.5); margin: 0 0 1rem; }
.eyebrow--light { color: rgba(245,245,240,0.5); }
.case-section { border-bottom: 2px solid #0a0a0a; }
.case-section--dark { background: #0a0a0a; border-color: rgba(245,245,240,0.1); }
.case-tag { display: flex; align-items: center; gap: 2rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
.tag-num { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: rgba(10,10,10,0.35); letter-spacing: 0.1em; }
.tag-num--light { color: rgba(245,245,240,0.35); }
.case-headline { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2rem, 4.5vw, 4rem); line-height: 0.95; margin: 0 0 1.5rem; max-width: 28ch; }
.case-headline--light { color: #f5f5f0; }
.case-body { font-family: 'Space Grotesk', sans-serif; font-size: 1rem; line-height: 1.75; color: rgba(10,10,10,0.6); max-width: 58ch; margin: 0 0 2.5rem; }
.case-body--light { color: rgba(245,245,240,0.65); }
.metrics { display: grid; grid-template-columns: repeat(4, 1fr); border: 1.5px solid #0a0a0a; margin-bottom: 2.5rem; }
.metrics--dark { border-color: rgba(245,245,240,0.15); }
.metric { padding: 1.5rem; border-right: 1px solid rgba(10,10,10,0.2); }
.metric:last-child { border-right: none; }
.metrics--dark .metric { border-right-color: rgba(245,245,240,0.1); }
.metric-n { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2rem, 4vw, 3.5rem); line-height: 1; color: #0a0a0a; margin-bottom: 0.375rem; }
.metric-n--light { color: #f5f5f0; }
.metric-label { font-family: 'Space Grotesk', sans-serif; font-size: 0.8125rem; color: rgba(10,10,10,0.55); }
.metric-label--light { color: rgba(245,245,240,0.55); }
.quote { border-left: 3px solid #0a0a0a; padding: 1.25rem 0 1.25rem 2rem; margin: 0 0 2.5rem; }
.quote--light { border-left-color: rgba(245,245,240,0.4); }
.quote-text { font-family: 'Bebas Neue', sans-serif; font-size: clamp(1.5rem, 3vw, 2.5rem); line-height: 1.05; margin: 0 0 0.75rem; color: #0a0a0a; }
.quote--light .quote-text { color: #f5f5f0; }
.quote-attr { font-family: 'Space Grotesk', sans-serif; font-size: 0.8125rem; color: rgba(10,10,10,0.5); margin: 0; }
.quote-attr--light { color: rgba(245,245,240,0.45); }
.detail-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0; border: 1.5px solid #0a0a0a; }
.detail-grid--dark { border-color: rgba(245,245,240,0.15); }
.detail-card { padding: 1.25rem; border-right: 1px solid rgba(10,10,10,0.2); border-bottom: 1px solid rgba(10,10,10,0.2); }
.detail-grid--dark .detail-card { border-right-color: rgba(245,245,240,0.08); border-bottom-color: rgba(245,245,240,0.08); }
.detail-card:nth-child(2n) { border-right: none; }
.detail-card:nth-last-child(-n+2) { border-bottom: none; }
.detail-label { font-family: 'Space Grotesk', sans-serif; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(10,10,10,0.45); margin: 0 0 0.5rem; }
.detail-label--light { color: rgba(245,245,240,0.4); }
.detail-value { font-family: 'Space Grotesk', sans-serif; font-size: 0.9375rem; line-height: 1.6; color: rgba(10,10,10,0.7); margin: 0; }
.detail-value--light { color: rgba(245,245,240,0.7); }
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

/* ── Before / After ── */
.before-after { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border: 1.5px solid #0a0a0a; margin-bottom: 2.5rem; }
.before-after--dark { border-color: rgba(245,245,240,0.15); }
.ba-col { padding: 2rem; }
.ba-col--before { background: #f5f5f0; border-right: 1px solid rgba(10,10,10,0.2); }
.ba-col--after { background: #f0fdf4; }
.ba-col--before-dark { background: rgba(255,255,255,0.02); border-right: 1px solid rgba(245,245,240,0.08); }
.ba-col--after-dark { background: rgba(37,99,235,0.06); }
.ba-heading { font-family: 'Space Grotesk', sans-serif; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(10,10,10,0.4); margin: 0 0 1rem; }
.ba-heading--light { color: rgba(245,245,240,0.4); }
.ba-heading--after-dark { color: #2563eb; }
.ba-col--after .ba-heading { color: #15803d; }
.ba-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.625rem; }
.ba-list li { font-family: 'Space Grotesk', sans-serif; font-size: 0.9375rem; line-height: 1.5; color: rgba(10,10,10,0.65); padding-left: 1.5rem; position: relative; }
.ba-list li::before { content: '—'; position: absolute; left: 0; color: rgba(10,10,10,0.3); }
.ba-col--after .ba-list li::before { content: '✓'; color: #15803d; }
.ba-list--dark li { color: rgba(245,245,240,0.65); }
.ba-list--dark li::before { color: rgba(245,245,240,0.25); }
.ba-col--after-dark .ba-list li::before { content: '→'; color: #2563eb; }

/* ── Results strip ── */
.results-strip { border: 1.5px solid #0a0a0a; margin-bottom: 2.5rem; padding: 1.5rem; }
.results-strip--dark { border-color: rgba(245,245,240,0.15); background: rgba(255,255,255,0.02); }
.results-strip-label { font-family: 'Space Grotesk', sans-serif; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(10,10,10,0.4); margin: 0 0 1.25rem; }
.results-strip-label--light { color: rgba(245,245,240,0.4); }
.results-strip-cells { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; }
.rs-cell { display: flex; flex-direction: column; gap: 0.375rem; padding: 1rem 1.25rem; border-right: 1px solid rgba(10,10,10,0.2); }
.rs-cell:last-child { border-right: none; }
.rs-cell--dark { border-right-color: rgba(245,245,240,0.08); }
.rs-num { font-family: 'Bebas Neue', sans-serif; font-size: clamp(1.5rem, 3vw, 2.5rem); line-height: 1; color: #0a0a0a; }
.rs-num--light { color: #f5f5f0; }
.rs-desc { font-family: 'Space Grotesk', sans-serif; font-size: 0.8125rem; color: rgba(10,10,10,0.45); line-height: 1.4; }
.rs-desc--light { color: rgba(245,245,240,0.45); }

/* ── Story timeline ── */
.story-timeline { margin-bottom: 2.5rem; }
.story-timeline--dark { border-left-color: rgba(245,245,240,0.15); }
.story-timeline-label { font-family: 'Space Grotesk', sans-serif; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(10,10,10,0.4); margin: 0 0 1.5rem; }
.story-timeline-label--light { color: rgba(245,245,240,0.4); }
.timeline-steps { display: flex; flex-direction: column; gap: 0; border-left: 2px solid rgba(10,10,10,0.2); margin-left: 0.75rem; }
.story-timeline--dark .timeline-steps { border-left-color: rgba(245,245,240,0.15); }
.tl-step { display: flex; gap: 1.5rem; padding: 1.5rem 0 1.5rem 1.5rem; position: relative; }
.tl-dot {
  position: absolute; left: -0.875rem; top: 1.75rem;
  width: 14px; height: 14px; border-radius: 50%;
  background: #f5f5f0; border: 2px solid rgba(10,10,10,0.3);
  transition: background 0.3s, border-color 0.3s; flex-shrink: 0;
}
.tl-dot--dark { background: #0a0a0a; border-color: rgba(245,245,240,0.2); }
.tl-dot--active { background: #2563eb; border-color: #2563eb; }
.tl-content { display: flex; flex-direction: column; gap: 0.375rem; }
.tl-marker { font-family: 'Space Mono', monospace; font-size: 0.75rem; letter-spacing: 0.12em; color: rgba(10,10,10,0.4); margin: 0; }
.tl-marker--light { color: rgba(245,245,240,0.4); }
.tl-title { font-family: 'Bebas Neue', sans-serif; font-size: 1.375rem; line-height: 1.1; color: #0a0a0a; margin: 0; }
.tl-title--light { color: #f5f5f0; }
.tl-body { font-family: 'Space Grotesk', sans-serif; font-size: 0.9375rem; line-height: 1.65; color: rgba(10,10,10,0.6); margin: 0; }
.tl-body--light { color: rgba(245,245,240,0.6); }

/* ── Aggregate Results Bar ─────────────────────────────────── */
.agg-bar { background: #2563eb; }
.agg-bar-inner { max-width: 1440px; margin: 0 auto; padding: 2.5rem 1.5rem; display: flex; align-items: center; gap: 0; flex-wrap: wrap; }
.agg-chip { display: flex; flex-direction: column; gap: 0.25rem; padding: 1.25rem 2.5rem; border-right: 1px solid rgba(255, 255, 255, 0.25); flex: 1; min-width: 160px; }
.agg-chip:last-child { border-right: none; }
.agg-num { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2rem, 4vw, 3rem); line-height: 0.9; letter-spacing: 0.02em; color: #fff; }
.agg-lbl { font-family: 'Space Grotesk', sans-serif; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255, 255, 255, 0.7); }

/* ── SR-only utility ───────────────────────────────────────── */
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }

@media (max-width: 600px) {
  .agg-bar-inner { flex-direction: column; align-items: stretch; }
  .agg-chip { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.2); padding: 1rem 1.5rem; }
  .agg-chip:last-child { border-bottom: none; }
}

@media (max-width: 900px) {
  .metrics { grid-template-columns: repeat(2, 1fr); }
  .metric:nth-child(2) { border-right: none; }
  .metric:nth-child(n+3) { border-top: 1px solid rgba(10,10,10,0.2); }
  .metric:nth-child(4) { border-right: none; }
  .detail-grid { grid-template-columns: 1fr; }
  .detail-card { border-right: none; }
  .cta-inner { grid-template-columns: 1fr; gap: 2.5rem; }
  .before-after { grid-template-columns: 1fr; }
  .ba-col--before { border-right: none; border-bottom: 1px solid rgba(10,10,10,0.2); }
  .ba-col--before-dark { border-right: none; border-bottom: 1px solid rgba(245,245,240,0.08); }
  .results-strip-cells { grid-template-columns: repeat(2, 1fr); }
  .rs-cell:nth-child(2) { border-right: none; }
  .rs-cell:nth-child(n+3) { border-top: 1px solid rgba(10,10,10,0.2); }
  .rs-cell:nth-child(4) { border-right: none; }
  .rs-cell--dark:nth-child(n+3) { border-top-color: rgba(245,245,240,0.08); }
}
@media (max-width: 500px) {
  .metrics { grid-template-columns: 1fr; }
  .metric { border-right: none; border-bottom: 1px solid rgba(10,10,10,0.2); }
  .metric:last-child { border-bottom: none; }
  .results-strip-cells { grid-template-columns: 1fr; }
  .rs-cell { border-right: none; border-bottom: 1px solid rgba(10,10,10,0.2); }
  .rs-cell:last-child { border-bottom: none; }
}
@media (prefers-reduced-motion: reduce) { .iris-bar { animation: none; } .tl-dot { transition: none; } }
.cs-cta-final { background-color: #0a0a0a; color: #f5f5f0; border-top: 2px solid #0a0a0a; }
.cs-cta-inner { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 1.5rem; padding-top: 5rem; padding-bottom: 5rem; }
.cs-cta-headline { font-family: 'Bebas Neue', sans-serif; font-size: clamp(3rem, 8vw, 7rem); line-height: 0.9; letter-spacing: 0.02em; margin: 0; }
.cs-cta-sub { font-family: 'Space Grotesk', sans-serif; font-size: 1.0625rem; color: rgba(245,245,240,0.7); margin: 0; max-width: 44ch; line-height: 1.65; }
.cs-cta-actions { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; }
.cs-btn-fill { font-family: 'Space Grotesk', sans-serif; font-size: 0.9rem; font-weight: 700; letter-spacing: 0.1em; color: #0a0a0a; background: #f5f5f0; text-decoration: none; padding: 1rem 2rem; display: inline-block; transition: background 0.15s; }
.cs-btn-fill:hover { background: #fff; }
.cs-btn-ghost { font-family: 'Space Grotesk', sans-serif; font-size: 0.9rem; font-weight: 600; letter-spacing: 0.1em; color: #f5f5f0; text-decoration: none; padding: 1rem 2rem; display: inline-block; border: 1.5px solid rgba(245,245,240,0.4); transition: border-color 0.15s; }
.cs-btn-ghost:hover { border-color: #f5f5f0; }
.cs-cta-disclaimer { font-family: 'Space Grotesk', sans-serif; font-size: 0.8125rem; color: rgba(245,245,240,0.35); font-style: italic; margin: 0; }
</style>
