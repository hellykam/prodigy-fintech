<template>
  <main class="scs-page">

    <!-- ── Hero ───────────────────────────────────────────────────── -->
    <section class="scs-hero" aria-labelledby="scs-h">
      <div class="scs-inner">
        <p class="scs-eyebrow">Case Studies</p>
        <h1 id="scs-h" class="scs-title">How teams ship crypto features without the usual drama.</h1>
        <p class="scs-sub">Three real-world integrations. Different industries, same outcome: live in days.</p>
        <div class="scs-live-badge" aria-hidden="true">
          <span class="scs-badge-dot"></span>
          <span class="scs-badge-text">2,847 active integrations</span>
        </div>
      </div>
    </section>

    <!-- ── Aggregate Results Strip ────────────────────────────────── -->
    <section class="scs-agg-strip" aria-labelledby="scs-agg-heading" data-reveal="fade-up">
      <div class="scs-inner">
        <h2 id="scs-agg-heading" class="sr-only">Aggregate results</h2>
        <div class="scs-agg-pills" data-animate-stagger>
          <div class="scs-agg-pill">
            <span class="scs-agg-num" ref="saasAgg1">2847</span>
            <span class="scs-agg-lbl">active integrations</span>
          </div>
          <div class="scs-agg-pill">
            <span class="scs-agg-num"><span ref="saasAgg2">4.2</span>h</span>
            <span class="scs-agg-lbl">average time to production</span>
          </div>
          <div class="scs-agg-pill">
            <span class="scs-agg-num">0</span>
            <span class="scs-agg-lbl">compliance incidents in trailing 12 months</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── NordPay ─────────────────────────────────────────────────── -->
    <section class="scs-study" aria-labelledby="scs-nord-h">
      <div class="scs-inner">
        <div class="scs-card" data-reveal="fade-up">
          <div class="scs-card-top">
            <div class="scs-avatar scs-av-a">N</div>
            <div class="scs-card-title-group">
              <h2 id="scs-nord-h" class="scs-company">NordPay</h2>
              <p class="scs-meta">Neobank · Berlin, Germany</p>
            </div>
            <span class="scs-tag">Financial Services</span>
          </div>

          <div class="scs-metrics" aria-label="NordPay metrics" data-animate-stagger>
            <div class="scs-metric">
              <span class="scs-mnum">65K</span>
              <span class="scs-mlbl">Active users</span>
            </div>
            <div class="scs-metric">
              <span class="scs-mnum">€2.1M</span>
              <span class="scs-mlbl">Volume processed</span>
            </div>
            <div class="scs-metric">
              <span class="scs-mnum">0</span>
              <span class="scs-mlbl">Regulatory incidents</span>
            </div>
          </div>

          <!-- Before / After -->
          <div class="scs-ba" aria-label="Before and after comparison" data-reveal="fade-up">
            <div class="scs-ba-col scs-ba-col--before">
              <p class="scs-ba-heading">Before Prodigy</p>
              <ul class="scs-ba-list">
                <li>6-month integration estimate</li>
                <li>4 vendor evaluations</li>
                <li>Compliance team said "not this quarter"</li>
                <li>Engineering backlog bloated</li>
              </ul>
            </div>
            <div class="scs-ba-col scs-ba-col--after">
              <p class="scs-ba-heading scs-ba-heading--after">After Prodigy</p>
              <ul class="scs-ba-list">
                <li>Live on Thursday</li>
                <li>Compliance approved Friday</li>
                <li>Engineering freed up</li>
                <li>First crypto transaction Monday</li>
              </ul>
            </div>
          </div>

          <!-- Results at a glance -->
          <div class="scs-results-strip" aria-label="Results at a glance" data-animate-stagger data-reveal="fade-up">
            <p class="scs-results-label">Results at a glance</p>
            <div class="scs-results-cells">
              <div class="scs-rs-cell">
                <span class="scs-rs-num">1 afternoon</span>
                <span class="scs-rs-desc">time to integration</span>
              </div>
              <div class="scs-rs-cell">
                <span class="scs-rs-num"><span ref="s1Res1">94</span>%</span>
                <span class="scs-rs-desc">KYC pass rate</span>
              </div>
              <div class="scs-rs-cell">
                <span class="scs-rs-num">0</span>
                <span class="scs-rs-desc">compliance incidents</span>
              </div>
              <div class="scs-rs-cell">
                <span class="scs-rs-num">↑<span ref="s1Res2">28</span>%</span>
                <span class="scs-rs-desc">user engagement lift</span>
              </div>
            </div>
          </div>

          <!-- Visual story timeline -->
          <div class="scs-timeline" aria-label="Implementation story" data-reveal="fade-up">
            <p class="scs-timeline-label">Implementation story</p>
            <div class="scs-tl-steps">
              <div class="scs-tl-step" data-reveal="fade-up">
                <div class="scs-tl-dot"></div>
                <div class="scs-tl-content">
                  <p class="scs-tl-marker">Day 1</p>
                  <p class="scs-tl-title">The SDK installs in 11 minutes.</p>
                  <p class="scs-tl-body">The team spends the rest of Thursday building the configuration UI. No calls to support.</p>
                </div>
              </div>
              <div class="scs-tl-step" data-reveal="fade-up">
                <div class="scs-tl-dot"></div>
                <div class="scs-tl-content">
                  <p class="scs-tl-marker">Week 1</p>
                  <p class="scs-tl-title">Go-live happens on schedule.</p>
                  <p class="scs-tl-body">First real transaction processes at 09:12 on Monday. The ops team sends a screenshot.</p>
                </div>
              </div>
              <div class="scs-tl-step" data-reveal="fade-up">
                <div class="scs-tl-dot"></div>
                <div class="scs-tl-content">
                  <p class="scs-tl-marker">Month 1</p>
                  <p class="scs-tl-title">2,847 transactions processed.</p>
                  <p class="scs-tl-body">Compliance team reviews the audit trail and describes it as "the cleanest vendor report we've ever seen."</p>
                </div>
              </div>
            </div>
          </div>

          <div class="scs-quote-wrap">
            <blockquote class="scs-quote">
              "The fee receipt closed the deal with our compliance director. She'd never seen anything like it."
            </blockquote>
            <p class="scs-attr">— Sarah K., CFO at NordPay</p>
          </div>

          <div class="scs-story">
            <p>NordPay launched as a mobile-first neobank targeting EU freelancers. When 40% of users asked for crypto in a survey, the product team started scoping a fiat on-ramp. The compliance director immediately flagged three requirements: KYC documentation, fee disclosure, and AML audit trails for every transaction.</p>
            <p>The Prodigy widget addressed all three in one afternoon. The compliance director's sign-off came the same day she saw the fee receipt UI — a transparent breakdown shown to the user before confirmation. The integration went to staging that night and production three days later.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── SwapDeck ────────────────────────────────────────────────── -->
    <section class="scs-study scs-study--alt" aria-labelledby="scs-swap-h">
      <div class="scs-inner">
        <div class="scs-card" data-reveal="fade-up">
          <div class="scs-card-top">
            <div class="scs-avatar scs-av-b">S</div>
            <div class="scs-card-title-group">
              <h2 id="scs-swap-h" class="scs-company">SwapDeck</h2>
              <p class="scs-meta">Crypto Exchange · London, UK</p>
            </div>
            <span class="scs-tag scs-tag--violet">Exchange</span>
          </div>

          <div class="scs-metrics" data-animate-stagger>
            <div class="scs-metric">
              <span class="scs-mnum">3 days</span>
              <span class="scs-mlbl">Time to production</span>
            </div>
            <div class="scs-metric">
              <span class="scs-mnum"><span ref="s2Res1">98.3</span>%</span>
              <span class="scs-mlbl">Fee satisfaction</span>
            </div>
            <div class="scs-metric">
              <span class="scs-mnum">1 dev</span>
              <span class="scs-mlbl">Engineering effort</span>
            </div>
          </div>

          <!-- Before / After -->
          <div class="scs-ba" aria-label="Before and after comparison" data-reveal="fade-up">
            <div class="scs-ba-col scs-ba-col--before">
              <p class="scs-ba-heading">Before Prodigy</p>
              <ul class="scs-ba-list">
                <li>KYC flow built in-house</li>
                <li>23% drop-off at document upload</li>
                <li>Manual fraud review</li>
                <li>3 FTE dedicated to compliance</li>
              </ul>
            </div>
            <div class="scs-ba-col scs-ba-col--after">
              <p class="scs-ba-heading scs-ba-heading--after">After Prodigy</p>
              <ul class="scs-ba-list">
                <li>Prodigy KYC embedded</li>
                <li>94% pass rate</li>
                <li>Automated fraud scoring</li>
                <li>0 extra headcount</li>
              </ul>
            </div>
          </div>

          <!-- Results at a glance -->
          <div class="scs-results-strip" aria-label="Results at a glance" data-animate-stagger data-reveal="fade-up">
            <p class="scs-results-label">Results at a glance</p>
            <div class="scs-results-cells">
              <div class="scs-rs-cell">
                <span class="scs-rs-num"><span ref="s2Res2">44</span>s</span>
                <span class="scs-rs-desc">avg KYC time</span>
              </div>
              <div class="scs-rs-cell">
                <span class="scs-rs-num">23→6%</span>
                <span class="scs-rs-desc">drop-off reduction</span>
              </div>
              <div class="scs-rs-cell">
                <span class="scs-rs-num"><span ref="s2Res3">3</span>x</span>
                <span class="scs-rs-desc">volume growth in 90 days</span>
              </div>
              <div class="scs-rs-cell">
                <span class="scs-rs-num"><span ref="s2Res4">99.1</span>%</span>
                <span class="scs-rs-desc">fraud block rate</span>
              </div>
            </div>
          </div>

          <!-- Visual story timeline -->
          <div class="scs-timeline" aria-label="Implementation story" data-reveal="fade-up">
            <p class="scs-timeline-label">Implementation story</p>
            <div class="scs-tl-steps">
              <div class="scs-tl-step" data-reveal="fade-up">
                <div class="scs-tl-dot"></div>
                <div class="scs-tl-content">
                  <p class="scs-tl-marker">Day 1</p>
                  <p class="scs-tl-title">KYC integration replaces a six-month homegrown build in a single afternoon.</p>
                  <p class="scs-tl-body">Drop-off metrics improve immediately.</p>
                </div>
              </div>
              <div class="scs-tl-step" data-reveal="fade-up">
                <div class="scs-tl-dot"></div>
                <div class="scs-tl-content">
                  <p class="scs-tl-marker">Week 1</p>
                  <p class="scs-tl-title">Volume increases 40% as users complete KYC without abandoning.</p>
                  <p class="scs-tl-body">Support tickets about "identity verification issues" stop.</p>
                </div>
              </div>
              <div class="scs-tl-step" data-reveal="fade-up">
                <div class="scs-tl-dot"></div>
                <div class="scs-tl-content">
                  <p class="scs-tl-marker">Month 1</p>
                  <p class="scs-tl-title">Three compliance audits pass without a single manual document review.</p>
                  <p class="scs-tl-body">The compliance team asks if they can use Prodigy internally.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="scs-quote-wrap">
            <blockquote class="scs-quote">
              "Our devs were done before lunch. Three lines of HTML, no SDK, no headaches."
            </blockquote>
            <p class="scs-attr">— Marcus T., CTO at SwapDeck</p>
          </div>

          <div class="scs-story">
            <p>SwapDeck is a crypto-to-crypto exchange that wanted to add a fiat on-ramp for users who preferred to fund from their bank account. The engineering team had one developer available and a strict two-week window before a competing feature was scheduled to ship.</p>
            <p>The HTML embed took 20 minutes. Testing and compliance sign-off took the rest of day one. The widget was in staging by Thursday and live on Friday — well inside the window. 98.3% of users rated the fee explanation "clear or very clear" in post-transaction surveys.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Meridian Wealth ─────────────────────────────────────────── -->
    <section class="scs-study" aria-labelledby="scs-mer-h">
      <div class="scs-inner">
        <div class="scs-card" data-reveal="fade-up">
          <div class="scs-card-top">
            <div class="scs-avatar scs-av-c">M</div>
            <div class="scs-card-title-group">
              <h2 id="scs-mer-h" class="scs-company">Meridian Wealth</h2>
              <p class="scs-meta">Wealth Manager · Zurich, Switzerland</p>
            </div>
            <span class="scs-tag scs-tag--teal">Institutional</span>
          </div>

          <div class="scs-metrics" data-animate-stagger>
            <div class="scs-metric">
              <span class="scs-mnum">100%</span>
              <span class="scs-mlbl">KYC audit completeness</span>
            </div>
            <div class="scs-metric">
              <span class="scs-mnum">ISO 27001</span>
              <span class="scs-mlbl">Aligned</span>
            </div>
            <div class="scs-metric">
              <span class="scs-mnum">6 months</span>
              <span class="scs-mlbl">Zero incidents</span>
            </div>
          </div>

          <!-- Before / After -->
          <div class="scs-ba" aria-label="Before and after comparison" data-reveal="fade-up">
            <div class="scs-ba-col scs-ba-col--before">
              <p class="scs-ba-heading">Before Prodigy</p>
              <ul class="scs-ba-list">
                <li>"Crypto is too risky for our client profile"</li>
                <li>No regulatory clarity</li>
                <li>12-month evaluation cycle</li>
                <li>Board said no</li>
              </ul>
            </div>
            <div class="scs-ba-col scs-ba-col--after">
              <p class="scs-ba-heading scs-ba-heading--after">After Prodigy</p>
              <ul class="scs-ba-list">
                <li>MiCA-ready framework</li>
                <li>Client demand validated</li>
                <li>Pilot in 6 weeks</li>
                <li>Board approved retrospectively</li>
              </ul>
            </div>
          </div>

          <!-- Results at a glance -->
          <div class="scs-results-strip" aria-label="Results at a glance" data-animate-stagger data-reveal="fade-up">
            <p class="scs-results-label">Results at a glance</p>
            <div class="scs-results-cells">
              <div class="scs-rs-cell">
                <span class="scs-rs-num">6 weeks</span>
                <span class="scs-rs-desc">pilot to live</span>
              </div>
              <div class="scs-rs-cell">
                <span class="scs-rs-num">€<span ref="s3Res1">8.4</span>M</span>
                <span class="scs-rs-desc">AUM moved on-chain</span>
              </div>
              <div class="scs-rs-cell">
                <span class="scs-rs-num"><span ref="s3Res2">4.8</span>/5</span>
                <span class="scs-rs-desc">advisor satisfaction</span>
              </div>
              <div class="scs-rs-cell">
                <span class="scs-rs-num">0</span>
                <span class="scs-rs-desc">regulatory flags</span>
              </div>
            </div>
          </div>

          <!-- Visual story timeline -->
          <div class="scs-timeline" aria-label="Implementation story" data-reveal="fade-up">
            <p class="scs-timeline-label">Implementation story</p>
            <div class="scs-tl-steps">
              <div class="scs-tl-step" data-reveal="fade-up">
                <div class="scs-tl-dot"></div>
                <div class="scs-tl-content">
                  <p class="scs-tl-marker">Day 1</p>
                  <p class="scs-tl-title">Pilot launches with 12 high-net-worth clients.</p>
                  <p class="scs-tl-body">Each onboards in under 4 minutes. Zero support escalations.</p>
                </div>
              </div>
              <div class="scs-tl-step" data-reveal="fade-up">
                <div class="scs-tl-dot"></div>
                <div class="scs-tl-content">
                  <p class="scs-tl-marker">Week 1</p>
                  <p class="scs-tl-title">Client satisfaction scores arrive: 4.8 out of 5.</p>
                  <p class="scs-tl-body">One client says: "I didn't think crypto could be this straightforward."</p>
                </div>
              </div>
              <div class="scs-tl-step" data-reveal="fade-up">
                <div class="scs-tl-dot"></div>
                <div class="scs-tl-content">
                  <p class="scs-tl-marker">Month 1</p>
                  <p class="scs-tl-title">Board reviews the pilot.</p>
                  <p class="scs-tl-body">€8.4M in assets moved on-chain. They ask why they waited.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="scs-quote-wrap">
            <blockquote class="scs-quote">
              "Every transaction has an audit trail. That's the only thing our legal team cared about."
            </blockquote>
            <p class="scs-attr">— Ingrid M., Head of Compliance at Meridian Wealth</p>
          </div>

          <div class="scs-story">
            <p>Meridian Wealth manages portfolios for institutional and high-net-worth clients under strict Swiss and EU regulatory frameworks. When they decided to offer crypto exposure, their legal team had a single question before anything else: where is the audit trail?</p>
            <p>Prodigy logs every transaction event — KYC outcome, risk score, fee breakdown, settlement confirmation — immutably from widget initialisation. The compliance team now accesses the admin panel directly, running their own audit queries without engineering involvement. Six months after go-live, zero compliance incidents.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CTA ────────────────────────────────────────────────────── -->
    <section class="scs-cta" aria-labelledby="scs-cta-h" data-reveal="scale-in">
      <div class="scs-inner scs-cta-inner">
        <h2 id="scs-cta-h" class="scs-cta-title">Start your integration today.</h2>
        <p class="scs-cta-sub">Same afternoon. Different team name on the next case study.</p>
        <RouterLink to="/saas/developers" class="scs-btn-fill">Read the integration guide →</RouterLink>
        <p class="scs-disclaimer">NordPay, SwapDeck, and Meridian Wealth are fictional companies used for illustration purposes only.</p>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useCountUp } from '@/composables/useGSAP'

// Aggregate refs
const saasAgg1 = ref<HTMLElement | null>(null)
const saasAgg2 = ref<HTMLElement | null>(null)
useCountUp(saasAgg1, 2847, { duration: 3 })
useCountUp(saasAgg2, 4.2, { decimals: 1, duration: 2 })

// CS1 (NordPay) refs
const s1Res1 = ref<HTMLElement | null>(null)
const s1Res2 = ref<HTMLElement | null>(null)
useCountUp(s1Res1, 94, { duration: 2 })
useCountUp(s1Res2, 28, { duration: 2 })

// CS2 (SwapDeck) refs
const s2Res1 = ref<HTMLElement | null>(null)
const s2Res2 = ref<HTMLElement | null>(null)
const s2Res3 = ref<HTMLElement | null>(null)
const s2Res4 = ref<HTMLElement | null>(null)
useCountUp(s2Res1, 98.3, { decimals: 1, duration: 2 })
useCountUp(s2Res2, 44, { duration: 2 })
useCountUp(s2Res3, 3, { duration: 2 })
useCountUp(s2Res4, 99.1, { decimals: 1, duration: 2 })

// CS3 (Meridian) refs
const s3Res1 = ref<HTMLElement | null>(null)
const s3Res2 = ref<HTMLElement | null>(null)
useCountUp(s3Res1, 8.4, { decimals: 1, duration: 2 })
useCountUp(s3Res2, 4.8, { decimals: 1, duration: 2 })

// IntersectionObserver for timeline dots
onMounted(() => {
  const dots = document.querySelectorAll('.scs-tl-dot')
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        ;(e.target as HTMLElement).classList.add('scs-tl-dot--active')
      }
    })
  }, { threshold: 0.6 })
  dots.forEach((d) => obs.observe(d))
})
</script>

<style scoped>
.scs-page { background: #fff; color: #0f172a; }
.scs-inner { max-width: 860px; margin: 0 auto; padding: 0 1.5rem; }

/* Hero */
.scs-hero { padding: 5rem 0 4rem; border-bottom: 1px solid #e2e8f0; }
.scs-eyebrow { font-family: 'Inter', sans-serif; font-size: 0.8125rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #4f46e5; margin: 0 0 1rem; }
.scs-title { font-family: 'Space Grotesk', sans-serif; font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 700; line-height: 1.15; margin: 0 0 1rem; }
.scs-sub { font-family: 'Inter', sans-serif; font-size: 1.0625rem; color: #64748b; line-height: 1.7; max-width: 56ch; margin: 0; }

/* Studies */
.scs-study { padding: 3rem 0; }
.scs-study--alt { background: #f8fafc; }
.scs-card { border: 1px solid #e2e8f0; border-radius: 16px; padding: 2.5rem; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
.scs-card-top { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap; }
.scs-avatar { width: 3rem; height: 3rem; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 1.25rem; color: #fff; flex-shrink: 0; }
.scs-av-a { background: linear-gradient(135deg, #4f46e5, #6366f1); }
.scs-av-b { background: linear-gradient(135deg, #7c3aed, #a855f7); }
.scs-av-c { background: linear-gradient(135deg, #0891b2, #06b6d4); }
.scs-company { font-family: 'Space Grotesk', sans-serif; font-size: 1.25rem; font-weight: 700; margin: 0; }
.scs-meta { font-family: 'Inter', sans-serif; font-size: 0.8125rem; color: #64748b; margin: 0; }
.scs-tag { margin-left: auto; padding: 0.25rem 0.875rem; border-radius: 100px; background: #eef2ff; font-family: 'Inter', sans-serif; font-size: 0.75rem; font-weight: 600; color: #4f46e5; }
.scs-tag--violet { background: #f5f3ff; color: #7c3aed; }
.scs-tag--teal { background: #ecfeff; color: #0891b2; }

.scs-metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: #e2e8f0; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; margin-bottom: 2rem; }
.scs-metric { background: #f8fafc; padding: 1.25rem; display: flex; flex-direction: column; gap: 0.25rem; }
.scs-mnum { font-family: 'Space Grotesk', sans-serif; font-size: clamp(1.25rem, 2.5vw, 1.75rem); font-weight: 700; color: #4f46e5; }
.scs-mlbl { font-family: 'Inter', sans-serif; font-size: 0.75rem; color: #64748b; }

/* Before / After */
.scs-ba { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; margin-bottom: 2rem; }
.scs-ba-col { padding: 1.5rem; }
.scs-ba-col--before { background: #f8fafc; border-right: 1px solid #e2e8f0; }
.scs-ba-col--after { background: #f0fdf4; }
.scs-ba-heading { font-family: 'Inter', sans-serif; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #64748b; margin: 0 0 0.875rem; }
.scs-ba-heading--after { color: #15803d; }
.scs-ba-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem; }
.scs-ba-list li { font-family: 'Inter', sans-serif; font-size: 0.875rem; line-height: 1.5; color: #475569; padding-left: 1.25rem; position: relative; }
.scs-ba-list li::before { content: '—'; position: absolute; left: 0; color: #94a3b8; }
.scs-ba-col--after .scs-ba-list li { color: #166534; }
.scs-ba-col--after .scs-ba-list li::before { content: '✓'; color: #15803d; }

/* Results strip */
.scs-results-strip { border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 2rem; padding: 1.25rem; background: #f8fafc; }
.scs-results-label { font-family: 'Inter', sans-serif; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #64748b; margin: 0 0 1rem; }
.scs-results-cells { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; }
.scs-rs-cell { display: flex; flex-direction: column; gap: 0.25rem; padding: 0.875rem 1rem; border-right: 1px solid #e2e8f0; }
.scs-rs-cell:last-child { border-right: none; }
.scs-rs-num { font-family: 'Space Grotesk', sans-serif; font-size: clamp(1rem, 2vw, 1.375rem); font-weight: 700; color: #4f46e5; line-height: 1.2; }
.scs-rs-desc { font-family: 'Inter', sans-serif; font-size: 0.75rem; color: #64748b; line-height: 1.4; }

/* Story timeline */
.scs-timeline { margin-bottom: 2rem; }
.scs-timeline-label { font-family: 'Inter', sans-serif; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #64748b; margin: 0 0 1rem; }
.scs-tl-steps { display: flex; flex-direction: column; gap: 0; border-left: 2px solid #e2e8f0; margin-left: 0.75rem; }
.scs-tl-step { display: flex; gap: 1.25rem; padding: 1.25rem 0 1.25rem 1.25rem; position: relative; }
.scs-tl-dot {
  position: absolute; left: -0.875rem; top: 1.5rem;
  width: 14px; height: 14px; border-radius: 50%;
  background: #fff; border: 2px solid #e2e8f0;
  transition: background 0.3s, border-color 0.3s; flex-shrink: 0;
}
.scs-tl-dot--active { background: #4f46e5; border-color: #4f46e5; }
.scs-tl-content { display: flex; flex-direction: column; gap: 0.25rem; }
.scs-tl-marker { font-family: 'Inter', sans-serif; font-size: 0.75rem; font-weight: 600; color: #4f46e5; margin: 0; }
.scs-tl-title { font-family: 'Space Grotesk', sans-serif; font-size: 0.9375rem; font-weight: 600; line-height: 1.3; color: #0f172a; margin: 0; }
.scs-tl-body { font-family: 'Inter', sans-serif; font-size: 0.875rem; line-height: 1.65; color: #475569; margin: 0; }

.scs-quote-wrap { border-left: 4px solid #4f46e5; padding-left: 1.5rem; margin-bottom: 1.75rem; }
.scs-quote { font-family: 'Space Grotesk', sans-serif; font-size: clamp(1rem, 2vw, 1.2rem); font-style: italic; line-height: 1.6; color: #0f172a; margin: 0 0 0.5rem; }
.scs-attr { font-family: 'Inter', sans-serif; font-size: 0.875rem; color: #64748b; margin: 0; }

.scs-story p { font-family: 'Inter', sans-serif; font-size: 0.9375rem; line-height: 1.75; color: #475569; margin: 0 0 1rem; }
.scs-story p:last-child { margin-bottom: 0; }

/* CTA */
.scs-cta { background: #0f172a; color: #fff; padding: 5rem 0; text-align: center; }
.scs-cta-inner { position: relative; }
.scs-cta-title { font-family: 'Space Grotesk', sans-serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; margin: 0 0 0.75rem; }
.scs-cta-sub { font-family: 'Inter', sans-serif; font-size: 1rem; color: rgba(255,255,255,0.65); margin: 0 0 2.5rem; line-height: 1.65; }
.scs-btn-fill { display: inline-block; padding: 0.9rem 2rem; border-radius: 8px; background: #4f46e5; color: #fff; font-family: 'Space Grotesk', sans-serif; font-size: 0.9375rem; font-weight: 600; text-decoration: none; transition: background 0.2s; margin-bottom: 2rem; }
.scs-btn-fill:hover { background: #4338ca; }
.scs-disclaimer { font-family: 'Inter', sans-serif; font-size: 0.8125rem; color: rgba(255,255,255,0.35); font-style: italic; }

/* Aggregate Results Strip */
.scs-agg-strip { background: #eef2ff; border-bottom: 1px solid #c7d2fe; padding: 1.5rem 0; }
.scs-agg-pills { display: flex; align-items: center; justify-content: center; gap: 1.5rem; flex-wrap: wrap; }
.scs-agg-pill { display: flex; align-items: baseline; gap: 0.5rem; }
.scs-agg-num { font-family: 'Space Grotesk', sans-serif; font-size: 1.375rem; font-weight: 700; color: #4f46e5; }
.scs-agg-lbl { font-family: 'Inter', sans-serif; font-size: 0.875rem; color: #4338ca; }
.scs-agg-pill + .scs-agg-pill { padding-left: 1.5rem; border-left: 1px solid #c7d2fe; }

.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }

@media (max-width: 640px) {
  .scs-agg-pills { flex-direction: column; gap: 0.75rem; }
  .scs-agg-pill + .scs-agg-pill { padding-left: 0; border-left: none; border-top: 1px solid #c7d2fe; padding-top: 0.75rem; }
}

/* Live badge */
.scs-live-badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.375rem 0.875rem; border-radius: 100px; background: #eef2ff; border: 1px solid #c7d2fe; margin-top: 1.25rem; }
.scs-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #4f46e5; animation: badge-pulse 2s ease-in-out infinite; }
.scs-badge-text { font-family: 'Inter', sans-serif; font-size: 0.8125rem; font-weight: 600; color: #4f46e5; }
@keyframes badge-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.85)} }

@media (max-width: 768px) {
  .scs-hero { padding: 3rem 0 2rem; }
  .scs-card { padding: 1.5rem; }
  .scs-metrics { grid-template-columns: 1fr; }
  .scs-tag { margin-left: 0; }
  .scs-card-title-group { min-width: 0; }
  .scs-ba { grid-template-columns: 1fr; }
  .scs-ba-col--before { border-right: none; border-bottom: 1px solid #e2e8f0; }
  .scs-results-cells { grid-template-columns: repeat(2, 1fr); }
  .scs-rs-cell:nth-child(2) { border-right: none; }
  .scs-rs-cell:nth-child(n+3) { border-top: 1px solid #e2e8f0; }
  .scs-rs-cell:nth-child(4) { border-right: none; }
}

@media (max-width: 480px) {
  .scs-results-cells { grid-template-columns: 1fr; }
  .scs-rs-cell { border-right: none; border-bottom: 1px solid #e2e8f0; }
  .scs-rs-cell:last-child { border-bottom: none; }
}

@media (prefers-reduced-motion: reduce) {
  .scs-badge-dot { animation: none; }
  .scs-tl-dot { transition: none; }
}
</style>
