<template>
  <main class="gcs-page">
    <div class="mesh-blob gcs-blob-1" aria-hidden="true" />
    <div class="mesh-blob gcs-blob-2" aria-hidden="true" />

    <!-- ── Aggregate Strip ───────────────────────────────────────────── -->
    <section class="gcs-agg-strip" aria-label="Aggregate platform metrics">
      <div class="gcs-agg-inner">
        <div class="gcs-agg-row" data-animate-stagger>
          <div class="gcs-agg-pill" role="figure" aria-label="active integrations">
            <span class="gcs-agg-num" ref="gradAgg1">2847</span>
            <span class="gcs-agg-lbl">active integrations</span>
          </div>
          <div class="gcs-agg-pill" role="figure" aria-label="average time to production">
            <span class="gcs-agg-num"><span ref="gradAgg2">4.2</span>h</span>
            <span class="gcs-agg-lbl">average time to production</span>
          </div>
          <div class="gcs-agg-pill" role="figure" aria-label="zero compliance incidents in 12 months">
            <span class="gcs-agg-num">0</span>
            <span class="gcs-agg-lbl">compliance incidents (12 months)</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Hero ───────────────────────────────────────────────────── -->
    <section class="gcs-hero" aria-labelledby="gcs-h">
      <div class="gcs-inner">
        <p class="gcs-eyebrow">CASE STUDIES</p>
        <h1 id="gcs-h" class="gcs-title" ref="heroTitle">
          Three companies.<br />
          <span class="gcs-grad">Zero boring widgets.</span>
        </h1>
        <p class="gcs-sub">Each team had different constraints. Same 47-second KYC. Same fee receipt. Same audit trail.</p>
      </div>
      <div class="gcs-particles" aria-hidden="true">
        <span class="gcs-particle gcs-p1"></span>
        <span class="gcs-particle gcs-p2"></span>
        <span class="gcs-particle gcs-p3"></span>
        <span class="gcs-particle gcs-p4"></span>
        <span class="gcs-particle gcs-p5"></span>
      </div>
    </section>

    <!-- ── NordPay ────────────────────────────────────────────────── -->
    <section class="gcs-study" aria-labelledby="gcs-nord-h">
      <div class="gcs-inner">
        <div class="gcs-card" data-reveal="fade-up">
          <div class="gcs-card-header">
            <div class="gcs-avatar gcs-av-a">N</div>
            <div>
              <p class="gcs-company">NordPay</p>
              <p class="gcs-meta">Neobank · Berlin, Germany</p>
            </div>
            <span class="gcs-tag">Financial Services</span>
          </div>
          <div class="gcs-metrics" data-animate-stagger>
            <div class="gcs-metric"><span class="gcs-mnum">65K</span><span class="gcs-mlbl">Active users</span></div>
            <div class="gcs-metric"><span class="gcs-mnum">€2.1M</span><span class="gcs-mlbl">Volume processed</span></div>
            <div class="gcs-metric"><span class="gcs-mnum">0</span><span class="gcs-mlbl">Regulatory incidents</span></div>
          </div>

          <!-- Before / After -->
          <div class="gcs-ba" aria-label="Before and after comparison" data-reveal="fade-up">
            <div class="gcs-ba-col gcs-ba-col--before">
              <p class="gcs-ba-heading">Before Prodigy</p>
              <ul class="gcs-ba-list">
                <li>6-month integration estimate</li>
                <li>4 vendor evaluations</li>
                <li>Compliance team said "not this quarter"</li>
                <li>Engineering backlog bloated</li>
              </ul>
            </div>
            <div class="gcs-ba-col gcs-ba-col--after">
              <p class="gcs-ba-heading gcs-ba-heading--after">After Prodigy</p>
              <ul class="gcs-ba-list">
                <li>Live on Thursday</li>
                <li>Compliance approved Friday</li>
                <li>Engineering freed up</li>
                <li>First crypto transaction Monday</li>
              </ul>
            </div>
          </div>

          <!-- Results at a glance -->
          <div class="gcs-results-strip" aria-label="Results at a glance" data-animate-stagger data-reveal="fade-up">
            <p class="gcs-results-label">Results at a glance</p>
            <div class="gcs-results-cells">
              <div class="gcs-rs-cell">
                <span class="gcs-rs-num">1 afternoon</span>
                <span class="gcs-rs-desc">time to integration</span>
              </div>
              <div class="gcs-rs-cell">
                <span class="gcs-rs-num"><span ref="g1Res1">94</span>%</span>
                <span class="gcs-rs-desc">KYC pass rate</span>
              </div>
              <div class="gcs-rs-cell">
                <span class="gcs-rs-num">0</span>
                <span class="gcs-rs-desc">compliance incidents</span>
              </div>
              <div class="gcs-rs-cell">
                <span class="gcs-rs-num">↑<span ref="g1Res2">28</span>%</span>
                <span class="gcs-rs-desc">user engagement lift</span>
              </div>
            </div>
          </div>

          <!-- Visual story timeline -->
          <div class="gcs-timeline" aria-label="Implementation story" data-reveal="fade-up">
            <p class="gcs-timeline-label">Implementation story</p>
            <div class="gcs-tl-steps">
              <div class="gcs-tl-step" data-reveal="fade-up">
                <div class="gcs-tl-dot"></div>
                <div class="gcs-tl-content">
                  <p class="gcs-tl-marker">Day 1</p>
                  <p class="gcs-tl-title">The SDK installs in 11 minutes.</p>
                  <p class="gcs-tl-body">The team spends the rest of Thursday building the configuration UI. No calls to support.</p>
                </div>
              </div>
              <div class="gcs-tl-step" data-reveal="fade-up">
                <div class="gcs-tl-dot"></div>
                <div class="gcs-tl-content">
                  <p class="gcs-tl-marker">Week 1</p>
                  <p class="gcs-tl-title">Go-live happens on schedule.</p>
                  <p class="gcs-tl-body">First real transaction processes at 09:12 on Monday. The ops team sends a screenshot.</p>
                </div>
              </div>
              <div class="gcs-tl-step" data-reveal="fade-up">
                <div class="gcs-tl-dot"></div>
                <div class="gcs-tl-content">
                  <p class="gcs-tl-marker">Month 1</p>
                  <p class="gcs-tl-title">2,847 transactions processed.</p>
                  <p class="gcs-tl-body">Compliance team reviews the audit trail and describes it as "the cleanest vendor report we've ever seen."</p>
                </div>
              </div>
            </div>
          </div>

          <blockquote class="gcs-quote">"The fee receipt closed the deal with our compliance director. She'd never seen anything like it."</blockquote>
          <p class="gcs-attr">— Sarah K., CFO at NordPay</p>
          <div class="gcs-story">
            <p>NordPay launched as a mobile-first neobank targeting EU freelancers. When 40% of users asked for crypto in a survey, the product team started scoping a fiat on-ramp. The compliance director immediately flagged three requirements: KYC documentation, fee disclosure, and AML audit trails.</p>
            <p>The Prodigy widget addressed all three in one afternoon. The compliance director's sign-off came the same day she saw the fee receipt UI — a transparent breakdown shown to the user before confirmation. Prodigy went live three days later.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── SwapDeck ───────────────────────────────────────────────── -->
    <section class="gcs-study gcs-study--alt" aria-labelledby="gcs-swap-h">
      <div class="gcs-inner">
        <div class="gcs-card" data-reveal="fade-up">
          <div class="gcs-card-header">
            <div class="gcs-avatar gcs-av-b">S</div>
            <div>
              <p class="gcs-company">SwapDeck</p>
              <p class="gcs-meta">Crypto Exchange · London, UK</p>
            </div>
            <span class="gcs-tag gcs-tag--pink">Exchange</span>
          </div>
          <div class="gcs-metrics" data-animate-stagger>
            <div class="gcs-metric"><span class="gcs-mnum">3 days</span><span class="gcs-mlbl">To production</span></div>
            <div class="gcs-metric"><span class="gcs-mnum"><span ref="g2Res1">98.3</span>%</span><span class="gcs-mlbl">Fee satisfaction</span></div>
            <div class="gcs-metric"><span class="gcs-mnum">1 dev</span><span class="gcs-mlbl">Engineering effort</span></div>
          </div>

          <!-- Before / After -->
          <div class="gcs-ba" aria-label="Before and after comparison" data-reveal="fade-up">
            <div class="gcs-ba-col gcs-ba-col--before">
              <p class="gcs-ba-heading">Before Prodigy</p>
              <ul class="gcs-ba-list">
                <li>KYC flow built in-house</li>
                <li>23% drop-off at document upload</li>
                <li>Manual fraud review</li>
                <li>3 FTE dedicated to compliance</li>
              </ul>
            </div>
            <div class="gcs-ba-col gcs-ba-col--after">
              <p class="gcs-ba-heading gcs-ba-heading--after">After Prodigy</p>
              <ul class="gcs-ba-list">
                <li>Prodigy KYC embedded</li>
                <li>94% pass rate</li>
                <li>Automated fraud scoring</li>
                <li>0 extra headcount</li>
              </ul>
            </div>
          </div>

          <!-- Results at a glance -->
          <div class="gcs-results-strip" aria-label="Results at a glance" data-animate-stagger data-reveal="fade-up">
            <p class="gcs-results-label">Results at a glance</p>
            <div class="gcs-results-cells">
              <div class="gcs-rs-cell">
                <span class="gcs-rs-num"><span ref="g2Res2">44</span>s</span>
                <span class="gcs-rs-desc">avg KYC time</span>
              </div>
              <div class="gcs-rs-cell">
                <span class="gcs-rs-num">23→6%</span>
                <span class="gcs-rs-desc">drop-off reduction</span>
              </div>
              <div class="gcs-rs-cell">
                <span class="gcs-rs-num"><span ref="g2Res3">3</span>x</span>
                <span class="gcs-rs-desc">volume growth in 90 days</span>
              </div>
              <div class="gcs-rs-cell">
                <span class="gcs-rs-num"><span ref="g2Res4">99.1</span>%</span>
                <span class="gcs-rs-desc">fraud block rate</span>
              </div>
            </div>
          </div>

          <!-- Visual story timeline -->
          <div class="gcs-timeline" aria-label="Implementation story" data-reveal="fade-up">
            <p class="gcs-timeline-label">Implementation story</p>
            <div class="gcs-tl-steps">
              <div class="gcs-tl-step" data-reveal="fade-up">
                <div class="gcs-tl-dot"></div>
                <div class="gcs-tl-content">
                  <p class="gcs-tl-marker">Day 1</p>
                  <p class="gcs-tl-title">KYC integration replaces a six-month homegrown build in a single afternoon.</p>
                  <p class="gcs-tl-body">Drop-off metrics improve immediately.</p>
                </div>
              </div>
              <div class="gcs-tl-step" data-reveal="fade-up">
                <div class="gcs-tl-dot"></div>
                <div class="gcs-tl-content">
                  <p class="gcs-tl-marker">Week 1</p>
                  <p class="gcs-tl-title">Volume increases 40% as users complete KYC without abandoning.</p>
                  <p class="gcs-tl-body">Support tickets about "identity verification issues" stop.</p>
                </div>
              </div>
              <div class="gcs-tl-step" data-reveal="fade-up">
                <div class="gcs-tl-dot"></div>
                <div class="gcs-tl-content">
                  <p class="gcs-tl-marker">Month 1</p>
                  <p class="gcs-tl-title">Three compliance audits pass without a single manual document review.</p>
                  <p class="gcs-tl-body">The compliance team asks if they can use Prodigy internally.</p>
                </div>
              </div>
            </div>
          </div>

          <blockquote class="gcs-quote">"Three lines of HTML. That's it."</blockquote>
          <p class="gcs-attr">— Marcus T., CTO at SwapDeck</p>
          <div class="gcs-story">
            <p>SwapDeck is a crypto-to-crypto exchange. When users asked for a fiat on-ramp, the engineering team had one developer available and a two-week window before a competing feature was due to ship.</p>
            <p>The HTML embed took 20 minutes. Testing and compliance sign-off took the rest of day one. The widget was in staging by Thursday and live on Friday. 98.3% of users rated the fee explanation "clear or very clear" in the first two weeks.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Meridian Wealth ────────────────────────────────────────── -->
    <section class="gcs-study" aria-labelledby="gcs-mer-h">
      <div class="gcs-inner">
        <div class="gcs-card" data-reveal="fade-up">
          <div class="gcs-card-header">
            <div class="gcs-avatar gcs-av-c">M</div>
            <div>
              <p class="gcs-company">Meridian Wealth</p>
              <p class="gcs-meta">Wealth Manager · Zurich, Switzerland</p>
            </div>
            <span class="gcs-tag gcs-tag--teal">Institutional</span>
          </div>
          <div class="gcs-metrics" data-animate-stagger>
            <div class="gcs-metric"><span class="gcs-mnum">100%</span><span class="gcs-mlbl">KYC audit completeness</span></div>
            <div class="gcs-metric"><span class="gcs-mnum">ISO 27001</span><span class="gcs-mlbl">Aligned</span></div>
            <div class="gcs-metric"><span class="gcs-mnum">6 mo</span><span class="gcs-mlbl">Zero incidents</span></div>
          </div>

          <!-- Before / After -->
          <div class="gcs-ba" aria-label="Before and after comparison" data-reveal="fade-up">
            <div class="gcs-ba-col gcs-ba-col--before">
              <p class="gcs-ba-heading">Before Prodigy</p>
              <ul class="gcs-ba-list">
                <li>"Crypto is too risky for our client profile"</li>
                <li>No regulatory clarity</li>
                <li>12-month evaluation cycle</li>
                <li>Board said no</li>
              </ul>
            </div>
            <div class="gcs-ba-col gcs-ba-col--after">
              <p class="gcs-ba-heading gcs-ba-heading--after">After Prodigy</p>
              <ul class="gcs-ba-list">
                <li>MiCA-ready framework</li>
                <li>Client demand validated</li>
                <li>Pilot in 6 weeks</li>
                <li>Board approved retrospectively</li>
              </ul>
            </div>
          </div>

          <!-- Results at a glance -->
          <div class="gcs-results-strip" aria-label="Results at a glance" data-animate-stagger data-reveal="fade-up">
            <p class="gcs-results-label">Results at a glance</p>
            <div class="gcs-results-cells">
              <div class="gcs-rs-cell">
                <span class="gcs-rs-num">6 weeks</span>
                <span class="gcs-rs-desc">pilot to live</span>
              </div>
              <div class="gcs-rs-cell">
                <span class="gcs-rs-num">€<span ref="g3Res1">8.4</span>M</span>
                <span class="gcs-rs-desc">AUM moved on-chain</span>
              </div>
              <div class="gcs-rs-cell">
                <span class="gcs-rs-num"><span ref="g3Res2">4.8</span>/5</span>
                <span class="gcs-rs-desc">advisor satisfaction</span>
              </div>
              <div class="gcs-rs-cell">
                <span class="gcs-rs-num">0</span>
                <span class="gcs-rs-desc">regulatory flags</span>
              </div>
            </div>
          </div>

          <!-- Visual story timeline -->
          <div class="gcs-timeline" aria-label="Implementation story" data-reveal="fade-up">
            <p class="gcs-timeline-label">Implementation story</p>
            <div class="gcs-tl-steps">
              <div class="gcs-tl-step" data-reveal="fade-up">
                <div class="gcs-tl-dot"></div>
                <div class="gcs-tl-content">
                  <p class="gcs-tl-marker">Day 1</p>
                  <p class="gcs-tl-title">Pilot launches with 12 high-net-worth clients.</p>
                  <p class="gcs-tl-body">Each onboards in under 4 minutes. Zero support escalations.</p>
                </div>
              </div>
              <div class="gcs-tl-step" data-reveal="fade-up">
                <div class="gcs-tl-dot"></div>
                <div class="gcs-tl-content">
                  <p class="gcs-tl-marker">Week 1</p>
                  <p class="gcs-tl-title">Client satisfaction scores arrive: 4.8 out of 5.</p>
                  <p class="gcs-tl-body">One client says: "I didn't think crypto could be this straightforward."</p>
                </div>
              </div>
              <div class="gcs-tl-step" data-reveal="fade-up">
                <div class="gcs-tl-dot"></div>
                <div class="gcs-tl-content">
                  <p class="gcs-tl-marker">Month 1</p>
                  <p class="gcs-tl-title">Board reviews the pilot.</p>
                  <p class="gcs-tl-body">€8.4M in assets moved on-chain. They ask why they waited.</p>
                </div>
              </div>
            </div>
          </div>

          <blockquote class="gcs-quote">"Every transaction has an audit trail. That's the only thing our legal team cared about."</blockquote>
          <p class="gcs-attr">— Ingrid M., Head of Compliance at Meridian Wealth</p>
          <div class="gcs-story">
            <p>Meridian Wealth manages portfolios for institutional and high-net-worth clients under strict Swiss and EU regulatory frameworks. When they decided to offer crypto exposure, their legal team's first question was: where is the audit trail?</p>
            <p>Prodigy logs every event — KYC outcome, risk score, fee breakdown, settlement — immutably from widget initialisation. The compliance team now accesses the admin panel directly, running their own queries without engineering support. Six months in, zero compliance incidents.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CTA ────────────────────────────────────────────────────── -->
    <section class="gcs-cta" aria-labelledby="gcs-cta-h" data-reveal="scale-in">
      <div class="mesh-blob gcs-cta-blob" aria-hidden="true" />
      <div class="gcs-inner gcs-cta-inner">
        <h2 id="gcs-cta-h" class="gcs-cta-title" ref="ctaTitle" data-grad-sweep>Start your <span class="gcs-grad">story.</span></h2>
        <p class="gcs-cta-sub">Same product. Same afternoon integration. Your compliance team's name in the next case study.</p>
        <div class="gcs-cta-btns" ref="ctaSection">
          <RouterLink to="/gradient/developers" class="gcs-btn-fill">Read the integration guide →</RouterLink>
          <a href="http://localhost:5001" target="_blank" rel="noopener noreferrer" class="gcs-btn-ghost">Open live demo →</a>
        </div>
        <p class="gcs-disclaimer">NordPay, SwapDeck, and Meridian Wealth are fictional companies used for illustration purposes only.</p>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useCountUp } from '@/composables/useGSAP'
import { useClipReveal, useGradientSweep } from '@/composables/useSplitReveal'
import { useMagneticAll } from '@/composables/useMagneticButton'

// ── Animation refs ─────────────────────────────────────────────
const heroTitle = ref<HTMLElement | null>(null)
const ctaTitle = ref<HTMLElement | null>(null)
const ctaSection = ref<HTMLElement | null>(null)

// Hero h1 has <span> child — use clip reveal (not split) per critical rules
useClipReveal(heroTitle, { direction: 'up', duration: 0.9, delay: 0.2 })
useGradientSweep(ctaTitle, { color: '#a855f7', duration: 1200 })
useMagneticAll(ctaSection, 'a, button', { strength: 0.4, returnDuration: 500 })

// Aggregate refs
const gradAgg1 = ref<HTMLElement | null>(null)
const gradAgg2 = ref<HTMLElement | null>(null)
useCountUp(gradAgg1, 2847, { duration: 3 })
useCountUp(gradAgg2, 4.2, { decimals: 1, duration: 2 })

// CS1 (NordPay) refs
const g1Res1 = ref<HTMLElement | null>(null)
const g1Res2 = ref<HTMLElement | null>(null)
useCountUp(g1Res1, 94, { duration: 2 })
useCountUp(g1Res2, 28, { duration: 2 })

// CS2 (SwapDeck) refs
const g2Res1 = ref<HTMLElement | null>(null)
const g2Res2 = ref<HTMLElement | null>(null)
const g2Res3 = ref<HTMLElement | null>(null)
const g2Res4 = ref<HTMLElement | null>(null)
useCountUp(g2Res1, 98.3, { decimals: 1, duration: 2 })
useCountUp(g2Res2, 44, { duration: 2 })
useCountUp(g2Res3, 3, { duration: 2 })
useCountUp(g2Res4, 99.1, { decimals: 1, duration: 2 })

// CS3 (Meridian) refs
const g3Res1 = ref<HTMLElement | null>(null)
const g3Res2 = ref<HTMLElement | null>(null)
useCountUp(g3Res1, 8.4, { decimals: 1, duration: 2 })
useCountUp(g3Res2, 4.8, { decimals: 1, duration: 2 })

// IntersectionObserver for timeline dots
onMounted(() => {
  const dots = document.querySelectorAll('.gcs-tl-dot')
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        ;(e.target as HTMLElement).classList.add('gcs-tl-dot--active')
      }
    })
  }, { threshold: 0.6 })
  dots.forEach((d) => obs.observe(d))
})
</script>

<style scoped>
/* ── Aggregate Strip ────────────────────────────────────────────── */
.gcs-agg-strip { background: #0f0a1e; padding: 2.5rem 1.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.06); }
.gcs-agg-inner { max-width: 860px; margin: 0 auto; }
.gcs-agg-row { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; }
.gcs-agg-pill { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; backdrop-filter: blur(16px); background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 100px; padding: 0.875rem 2.25rem; min-width: 180px; }
.gcs-agg-num { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.625rem; font-weight: 800; line-height: 1.1; background: linear-gradient(135deg, #a855f7, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.gcs-agg-lbl { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.75rem; color: rgba(255, 255, 255, 0.6); font-weight: 500; text-align: center; }
@media (max-width: 600px) {
  .gcs-agg-row { flex-direction: column; align-items: center; }
  .gcs-agg-pill { min-width: 240px; }
}

.gcs-page { background: #0f0a1e; color: #fff; position: relative; overflow: hidden; }
.mesh-blob { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.12; pointer-events: none; }
.gcs-blob-1 { width: 500px; height: 500px; background: #a855f7; top: -100px; right: -100px; }
.gcs-blob-2 { width: 400px; height: 400px; background: #ec4899; bottom: 200px; left: -100px; }
.gcs-cta-blob { width: 600px; height: 600px; background: #a855f7; top: -50%; left: 50%; transform: translateX(-50%); opacity: 0.15; }
.gcs-inner { max-width: 860px; margin: 0 auto; padding: 0 1.5rem; position: relative; }
.gcs-grad { background: linear-gradient(135deg, #a855f7, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.gcs-hero { padding: 7rem 0 4rem; text-align: center; position: relative; overflow: hidden; }
.gcs-eyebrow { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.8125rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(168,85,247,0.8); margin: 0 0 1.5rem; }
.gcs-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: 800; line-height: 1.1; margin: 0 0 1.5rem; }
.gcs-sub { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.125rem; line-height: 1.7; color: rgba(255,255,255,0.6); max-width: 52ch; margin: 0 auto; }
.gcs-study { padding: 3rem 0; }
.gcs-study--alt { background: rgba(255,255,255,0.015); }
.gcs-card { backdrop-filter: blur(16px); background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 2.5rem; }
.gcs-card-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap; }
.gcs-avatar { width: 3rem; height: 3rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 1.25rem; flex-shrink: 0; }
.gcs-av-a { background: linear-gradient(135deg, #a855f7, #6366f1); }
.gcs-av-b { background: linear-gradient(135deg, #ec4899, #f97316); }
.gcs-av-c { background: linear-gradient(135deg, #14b8a6, #06b6d4); }
.gcs-company { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.125rem; font-weight: 700; margin: 0; }
.gcs-meta { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.8125rem; color: rgba(255,255,255,0.5); margin: 0; }
.gcs-tag { margin-left: auto; padding: 0.25rem 0.875rem; border-radius: 100px; background: rgba(168,85,247,0.15); border: 1px solid rgba(168,85,247,0.3); font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.75rem; font-weight: 600; color: #a855f7; }
.gcs-tag--pink { background: rgba(236,72,153,0.15); border-color: rgba(236,72,153,0.3); color: #ec4899; }
.gcs-tag--teal { background: rgba(20,184,166,0.15); border-color: rgba(20,184,166,0.3); color: #14b8a6; }
.gcs-metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; overflow: hidden; margin-bottom: 2rem; }
.gcs-metric { background: rgba(255,255,255,0.03); padding: 1.25rem; display: flex; flex-direction: column; gap: 0.25rem; }
.gcs-mnum { font-family: 'Plus Jakarta Sans', sans-serif; font-size: clamp(1.25rem, 2.5vw, 1.75rem); font-weight: 800; background: linear-gradient(135deg, #a855f7, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.gcs-mlbl { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.75rem; color: rgba(255,255,255,0.5); }

/* Before / After */
.gcs-ba { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; overflow: hidden; margin-bottom: 2rem; }
.gcs-ba-col { padding: 1.5rem; }
.gcs-ba-col--before { background: rgba(255,255,255,0.02); border-right: 1px solid rgba(255,255,255,0.06); }
.gcs-ba-col--after { background: rgba(168,85,247,0.06); }
.gcs-ba-heading { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin: 0 0 0.875rem; }
.gcs-ba-heading--after { color: #a855f7; }
.gcs-ba-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem; }
.gcs-ba-list li { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.875rem; line-height: 1.5; color: rgba(255,255,255,0.6); padding-left: 1.25rem; position: relative; }
.gcs-ba-list li::before { content: '—'; position: absolute; left: 0; color: rgba(255,255,255,0.25); }
.gcs-ba-col--after .gcs-ba-list li { color: rgba(255,255,255,0.85); }
.gcs-ba-col--after .gcs-ba-list li::before { content: '→'; color: #a855f7; }

/* Results strip */
.gcs-results-strip { border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; margin-bottom: 2rem; padding: 1.25rem; background: rgba(255,255,255,0.03); }
.gcs-results-label { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin: 0 0 1rem; }
.gcs-results-cells { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; }
.gcs-rs-cell { display: flex; flex-direction: column; gap: 0.25rem; padding: 0.875rem 1rem; border-right: 1px solid rgba(255,255,255,0.06); }
.gcs-rs-cell:last-child { border-right: none; }
.gcs-rs-num { font-family: 'Plus Jakarta Sans', sans-serif; font-size: clamp(1rem, 2vw, 1.375rem); font-weight: 800; background: linear-gradient(135deg, #a855f7, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1.2; }
.gcs-rs-desc { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.75rem; color: rgba(255,255,255,0.45); line-height: 1.4; }

/* Story timeline */
.gcs-timeline { margin-bottom: 2rem; }
.gcs-timeline-label { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin: 0 0 1rem; }
.gcs-tl-steps { display: flex; flex-direction: column; gap: 0; border-left: 2px solid rgba(168,85,247,0.25); margin-left: 0.75rem; }
.gcs-tl-step { display: flex; gap: 1.25rem; padding: 1.25rem 0 1.25rem 1.25rem; position: relative; }
.gcs-tl-dot {
  position: absolute; left: -0.875rem; top: 1.5rem;
  width: 14px; height: 14px; border-radius: 50%;
  background: #0f0a1e; border: 2px solid rgba(168,85,247,0.3);
  transition: background 0.3s, border-color 0.3s; flex-shrink: 0;
}
.gcs-tl-dot--active { background: #a855f7; border-color: #a855f7; box-shadow: 0 0 8px rgba(168,85,247,0.5); }
.gcs-tl-content { display: flex; flex-direction: column; gap: 0.25rem; }
.gcs-tl-marker { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.75rem; font-weight: 700; color: #a855f7; margin: 0; }
.gcs-tl-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.9375rem; font-weight: 700; line-height: 1.3; color: rgba(255,255,255,0.9); margin: 0; }
.gcs-tl-body { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.875rem; line-height: 1.65; color: rgba(255,255,255,0.55); margin: 0; }

.gcs-quote { font-family: 'Plus Jakarta Sans', sans-serif; font-size: clamp(1rem, 2vw, 1.3rem); font-style: italic; font-weight: 600; line-height: 1.6; color: rgba(255,255,255,0.9); border-left: 3px solid #a855f7; padding-left: 1.5rem; margin: 0 0 0.75rem; }
.gcs-attr { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.875rem; color: rgba(255,255,255,0.5); padding-left: 1.5rem; margin: 0 0 2rem; }
.gcs-story p { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.9375rem; line-height: 1.75; color: rgba(255,255,255,0.7); margin: 0 0 1rem; }
.gcs-story p:last-child { margin-bottom: 0; }
.gcs-cta { padding: 6rem 0 5rem; text-align: center; position: relative; border-top: 1px solid rgba(255,255,255,0.08); margin-top: 3rem; overflow: hidden; }
.gcs-cta-inner { position: relative; }
.gcs-cta-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; margin: 0 0 1rem; }
.gcs-cta-sub { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.0625rem; color: rgba(255,255,255,0.6); max-width: 48ch; margin: 0 auto 2.5rem; line-height: 1.7; }
.gcs-cta-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-bottom: 2rem; }
.gcs-btn-fill { padding: 0.875rem 2rem; border-radius: 100px; background: linear-gradient(135deg, #a855f7, #ec4899); color: #fff; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.9375rem; font-weight: 700; text-decoration: none; transition: opacity 0.2s; }
.gcs-btn-fill:hover { opacity: 0.9; }
.gcs-btn-ghost { padding: 0.875rem 2rem; border-radius: 100px; border: 1px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.8); font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.9375rem; font-weight: 600; text-decoration: none; transition: border-color 0.2s; }
.gcs-btn-ghost:hover { border-color: rgba(255,255,255,0.5); }
.gcs-disclaimer { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.8125rem; color: rgba(255,255,255,0.3); font-style: italic; }
/* Floating particles */
.gcs-particles { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.gcs-particle { position: absolute; width: 4px; height: 4px; border-radius: 50%; background: rgba(168,85,247,0.5); animation: particle-float 8s ease-in-out infinite; }
.gcs-p1 { left: 15%; top: 20%; animation-delay: 0s; }
.gcs-p2 { left: 75%; top: 35%; animation-delay: 1.5s; background: rgba(236,72,153,0.5); }
.gcs-p3 { left: 40%; top: 60%; animation-delay: 3s; }
.gcs-p4 { left: 85%; top: 70%; animation-delay: 4.5s; background: rgba(99,102,241,0.5); }
.gcs-p5 { left: 25%; top: 80%; animation-delay: 6s; background: rgba(236,72,153,0.4); }
@keyframes particle-float { 0%,100%{transform:translateY(0) scale(1);opacity:0.5} 50%{transform:translateY(-20px) scale(1.5);opacity:1} }

@media (max-width: 768px) {
  .gcs-hero { padding: 4rem 0 3rem; }
  .gcs-card { padding: 1.5rem; }
  .gcs-metrics { grid-template-columns: 1fr; }
  .gcs-tag { margin-left: 0; }
  .gcs-ba { grid-template-columns: 1fr; }
  .gcs-ba-col--before { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); }
  .gcs-results-cells { grid-template-columns: repeat(2, 1fr); }
  .gcs-rs-cell:nth-child(2) { border-right: none; }
  .gcs-rs-cell:nth-child(n+3) { border-top: 1px solid rgba(255,255,255,0.06); }
  .gcs-rs-cell:nth-child(4) { border-right: none; }
}

@media (max-width: 480px) {
  .gcs-results-cells { grid-template-columns: 1fr; }
  .gcs-rs-cell { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); }
  .gcs-rs-cell:last-child { border-bottom: none; }
}

@media (prefers-reduced-motion: reduce) {
  .mesh-blob { animation: none; }
  .gcs-particle { animation: none; }
  .gcs-tl-dot { transition: none; }
}
</style>
