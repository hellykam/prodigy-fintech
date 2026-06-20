<template>
  <main class="sp-product">

    <!-- ═══ Section 1: Hero ════════════════════════════════════════ -->
    <section class="sp-hero" aria-labelledby="sp-hero-heading">
      <div class="sp-hero-inner">
        <div class="sp-hero-eyebrow">Product Overview</div>
        <h1 id="sp-hero-heading" class="sp-h1" ref="heroH">
          The Infrastructure <span class="sp-accent">Inside the Widget</span>
        </h1>
        <p class="sp-hero-sub">
          Six production-grade modules. One embed. Every piece documented, audited, and battle-tested — so you ship with confidence on day one.
        </p>
        <div class="sp-hero-actions">
          <a
            href="http://localhost:5001"
            target="_blank"
            rel="noopener noreferrer"
            class="sp-btn sp-btn--primary"
          >Start Free Demo →</a>
          <RouterLink to="/saas/pricing" class="sp-btn sp-btn--ghost">View Pricing</RouterLink>
        </div>

        <!-- Integration progress illustration -->
        <div class="sp-progress-vis" aria-hidden="true">
          <div class="sp-prog-step sp-ps-done">
            <div class="sp-prog-dot"></div>
            <div class="sp-prog-label">API KEY</div>
          </div>
          <div class="sp-prog-line sp-pl-1"></div>
          <div class="sp-prog-step sp-ps-done">
            <div class="sp-prog-dot"></div>
            <div class="sp-prog-label">EMBED</div>
          </div>
          <div class="sp-prog-line sp-pl-2"></div>
          <div class="sp-prog-step sp-ps-active">
            <div class="sp-prog-dot sp-prog-dot--pulse"></div>
            <div class="sp-prog-label">LIVE</div>
          </div>
        </div>

        <!-- Dashboard preview in browser mockup -->
        <div class="sp-hero-mockup" aria-hidden="true">
          <BrowserMockup url="app.prodigy.demo/dashboard" max-width="100%">
            <div class="sp-dash-preview">
              <!-- Stat tiles -->
              <div class="sp-dash-stats">
                <div class="sp-dash-stat">
                  <div class="sp-dash-stat-label">Volume</div>
                  <div class="sp-dash-stat-value">€124,800</div>
                </div>
                <div class="sp-dash-stat">
                  <div class="sp-dash-stat-label">Transactions</div>
                  <div class="sp-dash-stat-value">248</div>
                </div>
                <div class="sp-dash-stat sp-dash-stat--green">
                  <div class="sp-dash-stat-label">Uptime</div>
                  <div class="sp-dash-stat-value">99.97%</div>
                </div>
              </div>
              <!-- Transaction table -->
              <div class="sp-dash-table">
                <div class="sp-dash-thead">
                  <span>Date</span><span>Amount</span><span>Status</span>
                </div>
                <div class="sp-dash-trow">
                  <span>2026-06-17</span><span>€12,400</span>
                  <span class="sp-dash-badge sp-dash-badge--green">Settled</span>
                </div>
                <div class="sp-dash-trow">
                  <span>2026-06-17</span><span>€8,750</span>
                  <span class="sp-dash-badge sp-dash-badge--green">Settled</span>
                </div>
                <div class="sp-dash-trow">
                  <span>2026-06-16</span><span>€31,200</span>
                  <span class="sp-dash-badge sp-dash-badge--blue">Processing</span>
                </div>
              </div>
            </div>
          </BrowserMockup>
        </div>
      </div>
    </section>

    <!-- ═══ Section 2: Module Grid ════════════════════════════════ -->
    <section class="sp-modules-section" aria-labelledby="sp-modules-heading">
      <div class="sp-section-inner">
        <h2 id="sp-modules-heading" class="sp-section-heading" ref="modulesH" data-reveal="fade-up">
          Six Modules. <span class="sp-accent">One Platform.</span>
        </h2>
        <p class="sp-section-sub" data-reveal="fade-up">Every module ships with its own API surface, webhook events, and admin controls.</p>

        <div class="sp-module-grid" role="list" data-animate-stagger ref="moduleGrid">

          <article class="sp-module-card" role="listitem">
            <div class="sp-module-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="3"/>
                <path d="M3 9h18M9 3v18"/>
              </svg>
            </div>
            <h3 class="sp-module-name">Widget Core</h3>
            <p class="sp-module-desc">The embeddable UI engine. Handles state, locale, theme, and lifecycle in one script tag.</p>
            <a href="#" class="sp-module-link">Learn more →</a>
          </article>

          <article class="sp-module-card" role="listitem">
            <div class="sp-module-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
            </div>
            <h3 class="sp-module-name">KYC Engine</h3>
            <p class="sp-module-desc">Sumsub-powered identity verification built directly into the widget flow. No extra redirects.</p>
            <a href="#" class="sp-module-link">Learn more →</a>
          </article>

          <article class="sp-module-card" role="listitem">
            <div class="sp-module-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12,2 22,20 2,20"/>
                <path d="M12 9v5M12 17v1"/>
              </svg>
            </div>
            <h3 class="sp-module-name">Risk Assessment</h3>
            <p class="sp-module-desc">Real-time AML and transaction risk scoring. Every transaction is assessed before funds move.</p>
            <a href="#" class="sp-module-link">Learn more →</a>
          </article>

          <article class="sp-module-card" role="listitem">
            <div class="sp-module-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="M3 9h18M3 15h18M9 9v9"/>
              </svg>
            </div>
            <h3 class="sp-module-name">Fee Ledger</h3>
            <p class="sp-module-desc">Double-entry ledger for every movement. Platform fees, network fees, and partner shares — all on record.</p>
            <a href="#" class="sp-module-link">Learn more →</a>
          </article>

          <article class="sp-module-card" role="listitem">
            <div class="sp-module-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
            <h3 class="sp-module-name">Partner API</h3>
            <p class="sp-module-desc">REST + webhooks with OpenAPI 3.1 spec. Auto-generated SDKs for Node, Python, and Go.</p>
            <a href="#" class="sp-module-link">Learn more →</a>
          </article>

          <article class="sp-module-card" role="listitem">
            <div class="sp-module-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2l3.5 3.5L12 9l-3.5-3.5L12 2z"/>
                <path d="M12 15l3.5 3.5L12 22l-3.5-3.5L12 15z"/>
                <path d="M2 8.5L5.5 12 2 15.5M22 8.5L18.5 12 22 15.5"/>
              </svg>
            </div>
            <h3 class="sp-module-name">Admin Console</h3>
            <p class="sp-module-desc">Real-time visibility into all transactions, KYC statuses, and partner earnings — for your team.</p>
            <a href="#" class="sp-module-link">Learn more →</a>
          </article>

        </div>
      </div>
    </section>

    <!-- ═══ Section 3: How It Works ═══════════════════════════════ -->
    <section class="sp-how-section" aria-labelledby="sp-how-heading">
      <div class="sp-section-inner">
        <h2 id="sp-how-heading" class="sp-section-heading" ref="howH" data-reveal="fade-up">
          From Zero to <span class="sp-accent">Live in One Day</span>
        </h2>
        <p class="sp-section-sub" data-reveal="fade-up">Three steps. No DevOps team required.</p>

        <div class="sp-how-steps">

          <div class="sp-how-card" data-reveal="fade-left">
            <div class="sp-how-number" aria-label="Step 1">01</div>
            <div class="sp-how-top-border" aria-hidden="true" />
            <h3 class="sp-how-title">Sign Up in Minutes</h3>
            <p class="sp-how-desc">Create your account, verify your organization, and access the developer sandbox. No sales call required. Your API keys are ready immediately.</p>
          </div>

          <div class="sp-how-connector" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="1.5" stroke-linecap="round">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </div>

          <div class="sp-how-card" data-reveal="fade-up">
            <div class="sp-how-number" aria-label="Step 2">02</div>
            <div class="sp-how-top-border" aria-hidden="true" />
            <h3 class="sp-how-title">Integrate the API</h3>
            <p class="sp-how-desc">Drop the widget script into your platform. Configure your partner fees and branding in the admin console. One tag, full crypto stack — ready to test in your sandbox.</p>
          </div>

          <div class="sp-how-connector" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="1.5" stroke-linecap="round">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </div>

          <div class="sp-how-card" data-reveal="fade-right">
            <div class="sp-how-number" aria-label="Step 3">03</div>
            <div class="sp-how-top-border" aria-hidden="true" />
            <h3 class="sp-how-title">Scale with Confidence</h3>
            <p class="sp-how-desc">Go live with one click. Monitor every transaction in real time. Your partner revenue accumulates automatically. Compliance questions answer themselves.</p>
          </div>

        </div>
      </div>
    </section>

    <!-- ═══ Transaction Pipeline SVG ═══════════════════════════════ -->
    <section class="sp-pipeline-section" aria-labelledby="sp-pipeline-h" data-reveal="fade-up">
      <div class="sp-section-inner">
        <div class="sp-hero-eyebrow">Transaction Pipeline</div>
        <h2 id="sp-pipeline-h" class="sp-section-heading">How a transaction flows through Prodigy.</h2>
        <div class="sp-pipeline-wrap">
          <svg viewBox="0 0 500 80" fill="none" xmlns="http://www.w3.org/2000/svg"
               width="100%" preserveAspectRatio="xMidYMid meet"
               aria-hidden="true" role="img" class="pipeline-svg">
            <defs>
              <marker id="sp-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#6366f1" />
              </marker>
            </defs>
            <rect class="pipeline-box" x="0" y="22" width="80" height="36" ry="4" fill="rgba(99,102,241,0.04)" stroke="rgba(99,102,241,0.25)" stroke-width="1" />
            <rect class="pipeline-box" x="100" y="22" width="80" height="36" ry="4" fill="rgba(99,102,241,0.12)" stroke="#6366f1" stroke-width="1.5" />
            <rect class="pipeline-box" x="200" y="22" width="80" height="36" ry="4" fill="rgba(99,102,241,0.12)" stroke="#6366f1" stroke-width="1.5" />
            <rect class="pipeline-box" x="300" y="22" width="80" height="36" ry="4" fill="rgba(99,102,241,0.12)" stroke="#6366f1" stroke-width="1.5" />
            <rect class="pipeline-box" x="400" y="22" width="80" height="36" ry="4" fill="rgba(99,102,241,0.04)" stroke="rgba(99,102,241,0.25)" stroke-width="1" />
            <text x="40" y="44" text-anchor="middle" font-size="9" fill="#6b7280" font-family="Space Mono, monospace">Your App</text>
            <text x="140" y="44" text-anchor="middle" font-size="9" fill="#6366f1" font-family="Space Mono, monospace">Prodigy SDK</text>
            <text x="240" y="44" text-anchor="middle" font-size="9" fill="#6366f1" font-family="Space Mono, monospace">KYC Check</text>
            <text x="340" y="44" text-anchor="middle" font-size="9" fill="#6366f1" font-family="Space Mono, monospace">Settlement</text>
            <text x="440" y="44" text-anchor="middle" font-size="9" fill="#6b7280" font-family="Space Mono, monospace">Receipt</text>
            <line class="pipeline-arrow" x1="82" y1="40" x2="97" y2="40" stroke="#6366f1" stroke-width="1.5" marker-end="url(#sp-arrow)" stroke-dasharray="60" stroke-dashoffset="60" />
            <line class="pipeline-arrow" x1="182" y1="40" x2="197" y2="40" stroke="#6366f1" stroke-width="1.5" marker-end="url(#sp-arrow)" stroke-dasharray="60" stroke-dashoffset="60" />
            <line class="pipeline-arrow" x1="282" y1="40" x2="297" y2="40" stroke="#6366f1" stroke-width="1.5" marker-end="url(#sp-arrow)" stroke-dasharray="60" stroke-dashoffset="60" />
            <line class="pipeline-arrow" x1="382" y1="40" x2="397" y2="40" stroke="#6366f1" stroke-width="1.5" marker-end="url(#sp-arrow)" stroke-dasharray="60" stroke-dashoffset="60" />
          </svg>
        </div>
      </div>
    </section>

    <!-- ═══ CTA ════════════════════════════════════════════════════ -->
    <section class="sp-cta-section" aria-labelledby="sp-cta-heading">
      <div class="sp-cta-inner">
        <h2 id="sp-cta-heading" class="sp-cta-heading">Ready to explore the full API?</h2>
        <p class="sp-cta-sub">The developer sandbox is free. No credit card, no commitment.</p>
        <div class="sp-cta-actions" ref="ctaContainer">
          <a
            href="http://localhost:5001"
            target="_blank"
            rel="noopener noreferrer"
            class="sp-btn sp-btn--primary"
          >Open Sandbox →</a>
          <RouterLink to="/saas/pricing" class="sp-btn sp-btn--ghost">View Pricing</RouterLink>
        </div>
      </div>
    </section>

    <!-- ═══ A: METRICS STRIP ══════════════════════════════════════ -->
    <section class="sp-metrics-strip" aria-labelledby="sp-metrics-heading" data-reveal="fade-up">
      <div class="sp-section-inner">
        <h2 id="sp-metrics-heading" class="sr-only">Platform metrics</h2>
        <div class="sp-metrics-grid" data-animate-stagger>
          <div class="sp-metric-card">
            <div class="sp-metric-num"><span ref="saasStat1">50</span>+</div>
            <div class="sp-metric-label">Countries supported</div>
          </div>
          <div class="sp-metric-card">
            <div class="sp-metric-num">&lt;1 afternoon</div>
            <div class="sp-metric-label">Integration time</div>
          </div>
          <div class="sp-metric-card">
            <div class="sp-metric-num"><span ref="saasStat2">94</span>%</div>
            <div class="sp-metric-label">KYC pass rate</div>
          </div>
          <div class="sp-metric-card">
            <div class="sp-metric-num">$<span ref="saasStat3">2</span>B+</div>
            <div class="sp-metric-label">Processed to date</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ B: INTEGRATION PATHS ══════════════════════════════════ -->
    <section class="sp-int-section" aria-labelledby="sp-int-heading">
      <div class="sp-section-inner">
        <h2 id="sp-int-heading" class="sp-section-heading" data-reveal="fade-up">
          Three Ways to <span class="sp-accent">Integrate</span>
        </h2>
        <p class="sp-section-sub" data-reveal="fade-up">Pick the path that fits your team. All three share the same API, compliance stack, and partner economics.</p>
        <div class="sp-int-grid" data-animate-stagger>
          <div class="sp-int-card">
            <div class="sp-int-icon" aria-hidden="true">🔲</div>
            <div class="sp-int-tag">No-code</div>
            <h3 class="sp-int-name">Hosted Widget</h3>
            <p class="sp-int-desc">Paste 3 lines of HTML. Zero backend work. Live in minutes.</p>
          </div>
          <div class="sp-int-card">
            <div class="sp-int-icon" aria-hidden="true">⚙️</div>
            <div class="sp-int-tag">Low-code</div>
            <h3 class="sp-int-name">White-label API</h3>
            <p class="sp-int-desc">Full control of the UI. Use our API, build your own screens.</p>
          </div>
          <div class="sp-int-card">
            <div class="sp-int-icon" aria-hidden="true">🔧</div>
            <div class="sp-int-tag">Custom</div>
            <h3 class="sp-int-name">Headless</h3>
            <p class="sp-int-desc">Complete flexibility. BYO UI, BYO flows. Maximum customization.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ C: BUILD VS BUY TABLE ══════════════════════════════════ -->
    <section class="sp-bvb-section" aria-labelledby="sp-bvb-heading">
      <div class="sp-section-inner">
        <h2 id="sp-bvb-heading" class="sp-section-heading" ref="bvbH" data-grad-sweep data-reveal="fade-up">
          Why not build it <span class="sp-accent">yourself?</span>
        </h2>
        <div class="sp-bvb-wrapper" data-reveal="fade-up">
          <table class="sp-bvb-table" aria-label="Build vs buy comparison">
            <thead>
              <tr>
                <th scope="col" class="sp-bvb-th sp-bvb-th--feature"></th>
                <th scope="col" class="sp-bvb-th sp-bvb-th--inhouse">Build in-house</th>
                <th scope="col" class="sp-bvb-th sp-bvb-th--prodigy">
                  <span class="sp-bvb-badge">Prodigy</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="sp-bvb-feature">Time to launch</td>
                <td class="sp-bvb-inhouse">
                  <span class="sp-bvb-no" aria-label="No">✗</span> 6–18 months
                </td>
                <td class="sp-bvb-prodigy">
                  <span class="sp-bvb-yes" aria-label="Yes">✓</span> This afternoon
                </td>
              </tr>
              <tr>
                <td class="sp-bvb-feature">Compliance burden</td>
                <td class="sp-bvb-inhouse">
                  <span class="sp-bvb-no" aria-label="No">✗</span> Your team's problem
                </td>
                <td class="sp-bvb-prodigy">
                  <span class="sp-bvb-yes" aria-label="Yes">✓</span> Fully handled
                </td>
              </tr>
              <tr>
                <td class="sp-bvb-feature">Ongoing maintenance</td>
                <td class="sp-bvb-inhouse">
                  <span class="sp-bvb-no" aria-label="No">✗</span> Ongoing headcount
                </td>
                <td class="sp-bvb-prodigy">
                  <span class="sp-bvb-yes" aria-label="Yes">✓</span> Included
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ═══ E: LIVE WIDGET DEMO ════════════════════════════════════ -->
    <section class="sp-demo-section" aria-labelledby="sp-demo-heading">
      <div class="sp-section-inner">
        <div class="sp-demo-layout">
          <div class="sp-demo-copy" data-reveal="fade-left">
            <div class="sp-hero-eyebrow">Live Demo</div>
            <h2 id="sp-demo-heading" class="sp-section-heading sp-demo-h2">
              See it working, <span class="sp-accent">right now.</span>
            </h2>
            <p class="sp-demo-sub">
              The complete on-ramp flow — amount, identity, receipt — in one embedded component. No redirect. No new tab. No lost conversions.
            </p>
            <ul class="sp-demo-bullets" role="list">
              <li class="sp-demo-bullet">
                <span class="sp-bullet-check" aria-hidden="true">✓</span>
                KYC completes inside the widget — zero redirects
              </li>
              <li class="sp-demo-bullet">
                <span class="sp-bullet-check" aria-hidden="true">✓</span>
                Fee shown before confirm — full transparency
              </li>
              <li class="sp-demo-bullet">
                <span class="sp-bullet-check" aria-hidden="true">✓</span>
                Receipt posted instantly to admin console
              </li>
            </ul>
          </div>
          <div class="sp-demo-widget" data-reveal="fade-right">
            <WidgetDemo theme="saas" />
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ F: TIME TO VALUE TIMELINE ═══════════════════════════════ -->
    <section class="sp-timeline-section" aria-labelledby="sp-timeline-heading">
      <div class="sp-section-inner">
        <h2 id="sp-timeline-heading" class="sp-section-heading" data-reveal="fade-up">
          Time to <span class="sp-accent">Value</span>
        </h2>
        <p class="sp-section-sub" data-reveal="fade-up">From zero to revenue in one week. No exaggeration.</p>
        <div class="sp-timeline-strip" ref="timelineRef" aria-label="Integration milestones">
          <div class="sp-timeline-track" aria-hidden="true">
            <div class="sp-timeline-line-bg"></div>
            <div class="sp-timeline-line-fill" ref="timelineLine"></div>
          </div>
          <div class="sp-timeline-milestones">
            <div class="sp-milestone" v-for="(m, i) in milestones" :key="i">
              <div class="sp-milestone-dot" :class="{ 'sp-milestone-dot--active': i < activeMilestone }" aria-hidden="true"></div>
              <div class="sp-milestone-label">
                <span class="sp-milestone-time">{{ m.time }}</span>
                <span class="sp-milestone-action">{{ m.action }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ D: SOCIAL PROOF ════════════════════════════════════════ -->
    <section class="sp-social-section" aria-labelledby="sp-social-heading">
      <div class="sp-section-inner">
        <h2 id="sp-social-heading" class="sp-section-heading" data-reveal="fade-up">
          What teams <span class="sp-accent">are saying</span>
        </h2>
        <div class="sp-quotes-grid" data-animate-stagger>
          <figure class="sp-quote-card">
            <div class="sp-quote-avatar" aria-hidden="true">M</div>
            <blockquote class="sp-quote-text">"Our devs were live before 3pm."</blockquote>
            <figcaption class="sp-quote-attr">
              <span class="sp-quote-name">Marcus T.</span>
              <span class="sp-quote-role">CTO · SwapDeck</span>
            </figcaption>
          </figure>
          <figure class="sp-quote-card">
            <div class="sp-quote-avatar" aria-hidden="true">S</div>
            <blockquote class="sp-quote-text">"The compliance director signed off the same day she saw the demo."</blockquote>
            <figcaption class="sp-quote-attr">
              <span class="sp-quote-name">Sarah K.</span>
              <span class="sp-quote-role">CFO · NordPay</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BrowserMockup from '@/components/shared/BrowserMockup.vue'
import WidgetDemo from '@/components/shared/WidgetDemo.vue'
import { useCountUp } from '@/composables/useGSAP'
import { useClipReveal, useGradientSweep } from '@/composables/useSplitReveal'
import { useMagneticAll } from '@/composables/useMagneticButton'
import { useCardTiltAll } from '@/composables/useCardTilt'

const saasStat1 = ref<HTMLElement | null>(null)
const saasStat2 = ref<HTMLElement | null>(null)
const saasStat3 = ref<HTMLElement | null>(null)

useCountUp(saasStat1, 50, { duration: 2 })
useCountUp(saasStat2, 94, { duration: 2.5 })
useCountUp(saasStat3, 2, { duration: 2 })

// ── WOW Animations ───────────────────────────────────────────────
const heroH = ref<HTMLElement | null>(null)
const modulesH = ref<HTMLElement | null>(null)
const howH = ref<HTMLElement | null>(null)
const bvbH = ref<HTMLElement | null>(null)
const ctaContainer = ref<HTMLElement | null>(null)
const moduleGrid = ref<HTMLElement | null>(null)

useClipReveal(heroH, { direction: 'up', duration: 0.85 })
useClipReveal(modulesH, { direction: 'up', duration: 0.85, delay: 0.1 })
useClipReveal(howH, { direction: 'up', duration: 0.85, delay: 0.1 })
useGradientSweep(bvbH, { color: '#6366f1', duration: 1100 })
useMagneticAll(ctaContainer, '.sp-btn', { strength: 0.3, returnDuration: 500 })
useCardTiltAll(moduleGrid, '.sp-module-card', { maxTilt: 5, scale: 1.02, glowColor: '#6366f1', glowIntensity: 0.15 })

// ── Timeline ─────────────────────────────────────────────────────
const timelineRef = ref<HTMLElement | null>(null)
const timelineLine = ref<HTMLElement | null>(null)
const activeMilestone = ref(0)

const milestones = [
  { time: 'Day 0', action: 'Install SDK' },
  { time: 'Hour 1', action: 'First test transaction' },
  { time: 'Day 1', action: 'Go live' },
  { time: 'Week 1', action: 'First revenue' },
]

onMounted(() => {
  const el = timelineRef.value
  if (!el) return
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        let step = 0
        const interval = setInterval(() => {
          step++
          activeMilestone.value = step
          if (timelineLine.value) {
            timelineLine.value.style.width = `${(step / (milestones.length - 1)) * 100}%`
          }
          if (step >= milestones.length) clearInterval(interval)
        }, 400)
        observer.disconnect()
      }
    },
    { threshold: 0.4 }
  )
  observer.observe(el)
})
</script>

<style scoped>
.sp-product {
  --bg: #ffffff;
  --surface: #f8f7ff;
  --ink: #0f0f23;
  --ink-mid: #4a4a6a;
  --ink-muted: #8888a8;
  --accent: #4f46e5;
  --accent-light: #ede9fe;
  --accent-mid: #818cf8;
  --border: #e2e0f0;
  --radius: 12px;

  background: var(--bg);
  color: var(--ink);
  font-family: 'Inter', sans-serif;
}

.sp-accent {
  color: var(--accent);
}

/* Shared section shell */
.sp-section-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.sp-section-heading {
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 700;
  line-height: 1.15;
  color: var(--ink);
  text-align: center;
  margin: 0 0 0.75rem;
}

.sp-section-sub {
  text-align: center;
  font-size: 1rem;
  color: var(--ink-mid);
  margin: 0 0 2.5rem;
}

/* Buttons */
.sp-btn {
  display: inline-flex;
  align-items: center;
  font-family: 'Inter', sans-serif;
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
  padding: 0.75rem 1.75rem;
  border-radius: 100px;
  transition: transform 0.15s, box-shadow 0.15s;
  border: 2px solid transparent;
}

.sp-btn--primary {
  background: var(--accent);
  color: #ffffff;
  border-color: var(--accent);
}

.sp-btn--primary:hover {
  background: #4338ca;
  border-color: #4338ca;
  transform: translateY(-1px);
}

.sp-btn--ghost {
  background: transparent;
  color: var(--accent);
  border-color: var(--accent);
}

.sp-btn--ghost:hover {
  background: var(--accent-light);
  transform: translateY(-1px);
}

/* ═══ Hero ════════════════════════════════════════════════════ */
.sp-hero {
  background: var(--surface);
  padding: 5rem 0;
}

.sp-hero-inner {
  max-width: 700px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
}

.sp-hero-eyebrow {
  display: inline-block;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--accent);
  background: var(--accent-light);
  padding: 0.3rem 0.875rem;
  border-radius: 100px;
  margin-bottom: 1.25rem;
  letter-spacing: 0.02em;
}

.sp-h1 {
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(2.25rem, 4.5vw, 3.25rem);
  font-weight: 700;
  line-height: 1.15;
  color: var(--ink);
  letter-spacing: -0.02em;
  margin: 0 0 1.25rem;
}

.sp-hero-sub {
  font-size: 1rem;
  line-height: 1.65;
  color: var(--ink-mid);
  max-width: 52ch;
  margin: 0 auto 2rem;
}

.sp-hero-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

/* ═══ Module Grid ═════════════════════════════════════════════ */
.sp-modules-section {
  padding: 5rem 0;
}

.sp-module-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.sp-module-card {
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.75rem;
  box-shadow: 0 2px 16px rgba(79, 70, 229, 0.10);
  transition: box-shadow 0.2s, border-color 0.2s, transform 0.2s;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sp-module-card:hover {
  border-color: var(--accent-mid);
  box-shadow: 0 6px 28px rgba(79, 70, 229, 0.15);
  transform: translateY(-2px);
}

.sp-module-icon {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-light);
  border-radius: 10px;
  margin-bottom: 0.5rem;
}

.sp-module-name {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--ink);
  margin: 0;
}

.sp-module-desc {
  font-size: 0.875rem;
  line-height: 1.65;
  color: var(--ink-mid);
  margin: 0;
  flex: 1;
}

.sp-module-link {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--accent);
  text-decoration: none;
  margin-top: 0.25rem;
}

.sp-module-link:hover {
  text-decoration: underline;
}

/* ═══ How It Works ════════════════════════════════════════════ */
.sp-how-section {
  background: var(--surface);
  padding: 5rem 0;
}

.sp-how-steps {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  gap: 1.5rem;
  align-items: start;
}

.sp-how-card {
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.75rem;
  position: relative;
  box-shadow: 0 2px 16px rgba(79, 70, 229, 0.08);
}

.sp-how-top-border {
  position: absolute;
  top: 0;
  left: 1.5rem;
  right: 1.5rem;
  height: 3px;
  background: var(--accent);
  border-radius: 0 0 3px 3px;
}

.sp-how-number {
  font-family: 'DM Sans', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent-light);
  line-height: 1;
  margin-bottom: 0.875rem;
}

.sp-how-title {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--ink);
  margin: 0 0 0.625rem;
}

.sp-how-desc {
  font-size: 0.875rem;
  line-height: 1.65;
  color: var(--ink-mid);
  margin: 0;
}

.sp-how-connector {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 2rem;
}

/* ═══ CTA ════════════════════════════════════════════════════ */
.sp-cta-section {
  background: var(--bg);
  padding: 5rem 0;
  border-top: 1px solid var(--border);
}

.sp-cta-inner {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
}

.sp-cta-heading {
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: var(--ink);
  margin: 0 0 0.75rem;
}

.sp-cta-sub {
  font-size: 0.9375rem;
  color: var(--ink-mid);
  margin: 0 0 1.75rem;
  line-height: 1.65;
}

.sp-cta-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

/* ═══ Hero Mockup ═════════════════════════════════════════════ */
.sp-hero-mockup {
  width: 100%;
  max-width: 780px;
  margin: 2rem auto 0;
  box-shadow: 0 8px 40px rgba(79, 70, 229, 0.15);
  border-radius: 12px;
}

.sp-dash-preview {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  background: #f8f7ff;
}

.sp-dash-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.625rem;
}

.sp-dash-stat {
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.75rem;
}

.sp-dash-stat--green .sp-dash-stat-value {
  color: #16a34a;
}

.sp-dash-stat-label {
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--ink-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

.sp-dash-stat-value {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--accent);
}

.sp-dash-table {
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  font-size: 0.8rem;
}

.sp-dash-thead {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 0.5rem;
  padding: 0.5rem 0.875rem;
  background: #f8f7ff;
  font-weight: 600;
  color: var(--ink-muted);
  font-size: 0.75rem;
  border-bottom: 1px solid var(--border);
}

.sp-dash-trow {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 0.5rem;
  padding: 0.5rem 0.875rem;
  color: var(--ink);
  border-bottom: 1px solid var(--border);
  align-items: center;
}

.sp-dash-trow:last-child {
  border-bottom: none;
}

.sp-dash-badge {
  padding: 0.125rem 0.5rem;
  border-radius: 100px;
  font-size: 0.6875rem;
  font-weight: 600;
  white-space: nowrap;
}

.sp-dash-badge--green {
  background: #dcfce7;
  color: #15803d;
}

.sp-dash-badge--blue {
  background: var(--accent-light);
  color: var(--accent);
}

/* ═══ Integration Progress Illustration ══════════════════════ */
.sp-progress-vis { display: flex; align-items: center; gap: 0; margin: 1.5rem 0 0; justify-content: center; }
.sp-prog-step { display: flex; flex-direction: column; align-items: center; gap: 0.375rem; }
.sp-prog-dot { width: 12px; height: 12px; border-radius: 50%; background: #4f46e5; animation: dot-pop 0.4s ease forwards; opacity: 0; transform: scale(0); }
.sp-prog-dot--pulse { background: #4f46e5; animation: dot-pop 0.4s ease forwards 0.9s, dot-pulse 2s ease-in-out 1.3s infinite; }
.sp-ps-done .sp-prog-dot { animation-delay: 0.1s; }
.sp-ps-done:nth-child(3) .sp-prog-dot { animation-delay: 0.5s; }
@keyframes dot-pop { to { opacity: 1; transform: scale(1); } }
@keyframes dot-pulse { 0%,100%{box-shadow:0 0 0 0 rgba(79,70,229,0.4)} 50%{box-shadow:0 0 0 6px rgba(79,70,229,0)} }
.sp-prog-label { font-family: 'Inter', sans-serif; font-size: 0.6875rem; font-weight: 600; color: #64748b; letter-spacing: 0.06em; }
.sp-prog-line { flex: 1; height: 2px; background: #e2e8f0; min-width: 40px; max-width: 80px; position: relative; overflow: hidden; }
.sp-prog-line::after { content: ''; position: absolute; inset: 0; background: #4f46e5; transform: scaleX(0); transform-origin: left; animation: line-fill 0.4s ease forwards; }
.sp-pl-1::after { animation-delay: 0.3s; }
.sp-pl-2::after { animation-delay: 0.7s; }
@keyframes line-fill { to { transform: scaleX(1); } }
@media (prefers-reduced-motion: reduce) { .sp-prog-dot,.sp-prog-dot--pulse{animation:none;opacity:1;transform:scale(1)} .sp-prog-line::after{animation:none;transform:scaleX(1)} }

/* ─── Responsive ────────────────────────────────────────── */
@media (max-width: 900px) {
  .sp-module-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .sp-how-steps {
    grid-template-columns: 1fr;
  }

  .sp-how-connector {
    transform: rotate(90deg);
    padding-top: 0;
  }
}

@media (max-width: 600px) {
  .sp-module-grid {
    grid-template-columns: 1fr;
  }

  .sp-hero-actions {
    flex-direction: column;
    align-items: center;
  }
}

/* ═══ Metrics Strip ═══════════════════════════════════════ */
.sp-metrics-strip {
  background: var(--accent);
  padding: 3rem 0;
}

.sp-metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  text-align: center;
}

.sp-metric-card {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.sp-metric-num {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 700;
  color: #ffffff;
  line-height: 1;
}

.sp-metric-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.75);
}

/* ═══ Integration Paths ═══════════════════════════════════ */
.sp-int-section {
  padding: 5rem 0;
  background: var(--surface);
}

.sp-int-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.sp-int-card {
  background: #ffffff;
  border: 1px solid var(--border);
  border-left: 4px solid var(--accent);
  border-radius: var(--radius);
  padding: 1.75rem;
  box-shadow: 0 2px 16px rgba(79, 70, 229, 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.sp-int-icon {
  font-size: 1.5rem;
  line-height: 1;
}

.sp-int-tag {
  display: inline-block;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--accent);
  background: var(--accent-light);
  padding: 0.2rem 0.625rem;
  border-radius: 100px;
  align-self: flex-start;
}

.sp-int-name {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--ink);
  margin: 0;
}

.sp-int-desc {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  line-height: 1.65;
  color: var(--ink-mid);
  margin: 0;
}

/* ═══ Build vs Buy Table ══════════════════════════════════ */
.sp-bvb-section {
  padding: 5rem 0;
}

.sp-bvb-wrapper {
  overflow-x: auto;
  border-radius: var(--radius);
  box-shadow: 0 2px 16px rgba(79, 70, 229, 0.10);
  max-width: 800px;
  margin: 0 auto;
}

.sp-bvb-table {
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
  font-family: 'Inter', sans-serif;
  min-width: 480px;
}

.sp-bvb-th {
  padding: 1rem 1.5rem;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--ink);
  text-align: center;
  border-bottom: 2px solid var(--border);
}

.sp-bvb-th--feature {
  text-align: left;
  width: 35%;
}

.sp-bvb-badge {
  display: inline-block;
  background: var(--accent);
  color: #ffffff;
  padding: 0.25rem 0.875rem;
  border-radius: 100px;
  font-size: 0.875rem;
  font-weight: 700;
}

.sp-bvb-feature {
  padding: 1rem 1.5rem;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--ink);
  border-bottom: 1px solid var(--border);
}

.sp-bvb-inhouse,
.sp-bvb-prodigy {
  padding: 1rem 1.5rem;
  text-align: center;
  font-size: 0.9375rem;
  color: var(--ink-mid);
  border-bottom: 1px solid var(--border);
  vertical-align: middle;
}

.sp-bvb-table tbody tr:last-child td {
  border-bottom: none;
}

.sp-bvb-yes {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  background: #dcfce7;
  color: #15803d;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 700;
  margin-right: 0.375rem;
}

.sp-bvb-no {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  background: #fee2e2;
  color: #dc2626;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 700;
  margin-right: 0.375rem;
}

/* ═══ Social Proof ════════════════════════════════════════ */
.sp-social-section {
  background: var(--surface);
  padding: 5rem 0;
}

.sp-quotes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  max-width: 900px;
  margin: 0 auto;
}

.sp-quote-card {
  background: #ffffff;
  border: 1px solid var(--border);
  border-left: 4px solid var(--accent);
  border-radius: var(--radius);
  padding: 1.75rem;
  box-shadow: 0 2px 16px rgba(79, 70, 229, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0;
}

.sp-quote-avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: var(--accent);
  color: #ffffff;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sp-quote-text {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  line-height: 1.65;
  color: var(--ink);
  font-style: italic;
  margin: 0;
  flex: 1;
}

.sp-quote-attr {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.sp-quote-name {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--ink);
}

.sp-quote-role {
  font-family: 'Inter', sans-serif;
  font-size: 0.8125rem;
  color: var(--ink-muted);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 900px) {
  .sp-metrics-grid { grid-template-columns: repeat(2, 1fr); }
  .sp-int-grid { grid-template-columns: 1fr; }
  .sp-quotes-grid { grid-template-columns: 1fr; }
}

@media (max-width: 600px) {
  .sp-metrics-grid { grid-template-columns: repeat(2, 1fr); }
}

/* ═══ Live Widget Demo ════════════════════════════════════ */
.sp-demo-section {
  background: var(--bg);
  padding: 5rem 0;
  border-top: 1px solid var(--border);
}

.sp-demo-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.sp-demo-copy {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.sp-demo-h2 {
  text-align: left;
}

.sp-demo-sub {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--ink-mid);
  margin: 0;
}

.sp-demo-bullets {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sp-demo-bullet {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  font-size: 0.9375rem;
  color: var(--ink-mid);
  line-height: 1.5;
}

.sp-bullet-check {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  background: #dcfce7;
  color: #15803d;
  border-radius: 50%;
  font-size: 0.625rem;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.sp-demo-widget {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 900px) {
  .sp-demo-layout {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  .sp-demo-h2 {
    text-align: center;
  }
}

/* ═══ Time-to-Value Timeline ══════════════════════════════ */
.sp-timeline-section {
  background: var(--surface);
  padding: 5rem 0;
  border-top: 1px solid var(--border);
}

.sp-timeline-strip {
  position: relative;
  padding-top: 2rem;
}

.sp-timeline-track {
  position: absolute;
  top: 22px;
  left: 12.5%;
  right: 12.5%;
  height: 3px;
}

.sp-timeline-line-bg {
  position: absolute;
  inset: 0;
  background: var(--border);
  border-radius: 100px;
}

.sp-timeline-line-fill {
  position: absolute;
  inset: 0;
  background: var(--accent);
  border-radius: 100px;
  width: 0%;
  transition: width 0.5s ease;
}

.sp-timeline-milestones {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  position: relative;
  z-index: 1;
}

.sp-milestone {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.875rem;
}

.sp-milestone-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 3px solid var(--border);
  background: var(--bg);
  transition: background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
  flex-shrink: 0;
}

.sp-milestone-dot--active {
  background: var(--accent);
  border-color: var(--accent);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.2);
}

.sp-milestone-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  text-align: center;
}

.sp-milestone-time {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.sp-milestone-action {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: var(--ink-mid);
  line-height: 1.4;
}

@media (max-width: 640px) {
  .sp-timeline-milestones {
    grid-template-columns: repeat(2, 1fr);
  }
  .sp-timeline-track {
    display: none;
  }
}

/* ── Transaction Pipeline SVG ── */
.sp-pipeline-section { background: #f8f9ff; border-top: 1px solid rgba(99,102,241,0.12); border-bottom: 1px solid rgba(99,102,241,0.12); }
.sp-pipeline-wrap { margin-top: 2rem; }
.pipeline-box:nth-child(1) { animation: box-pulse 3s ease-in-out 0s infinite; }
.pipeline-box:nth-child(2) { animation: box-pulse 3s ease-in-out 0.6s infinite; }
.pipeline-box:nth-child(3) { animation: box-pulse 3s ease-in-out 1.2s infinite; }
.pipeline-box:nth-child(4) { animation: box-pulse 3s ease-in-out 1.8s infinite; }
.pipeline-box:nth-child(5) { animation: box-pulse 3s ease-in-out 2.4s infinite; }
@keyframes box-pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
.pipeline-arrow:nth-child(1) { animation: arrow-draw 1s ease 0.3s forwards; }
.pipeline-arrow:nth-child(2) { animation: arrow-draw 1s ease 0.6s forwards; }
.pipeline-arrow:nth-child(3) { animation: arrow-draw 1s ease 0.9s forwards; }
.pipeline-arrow:nth-child(4) { animation: arrow-draw 1s ease 1.2s forwards; }
@keyframes arrow-draw { to { stroke-dashoffset: 0; } }
@media (prefers-reduced-motion: reduce) {
  .pipeline-box { animation: none; opacity: 1; }
  .pipeline-arrow { animation: none; stroke-dashoffset: 0; }
}
</style>
