<template>
  <main>
    <!-- ── Hero ─────────────────────────────────────────────────────── -->
    <section class="hero" aria-labelledby="product-heading" ref="heroSection">
      <div class="hero-inner">
        <div class="eyebrow-badge" role="note">
          <span aria-hidden="true">✦</span> The Widget Layer
        </div>
        <h1 id="product-heading" class="hero-h1" ref="heroTitle">
          The Widget <em>That Knows</em> When To Stop.
        </h1>
        <p class="hero-sub" ref="heroSub">
          Most crypto widgets are dumb pipelines — they move money and call it done. Prodigy surfaces fees before confirmation, runs KYC inline, flags risk automatically, and posts partner revenue in the same transaction. One embed. Every layer.
        </p>
        <div class="hero-actions">
          <a
            href="http://localhost:5001"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary"
          >
            See it Live →
          </a>
          <RouterLink to="/gradient/pricing" class="btn-outline">
            View Pricing
          </RouterLink>
        </div>

        <!-- Gradient orb illustration -->
        <div class="gp-orb-wrap" aria-hidden="true">
          <div class="gp-orb gp-orb-1"></div>
          <div class="gp-orb gp-orb-2"></div>
          <div class="gp-orb gp-orb-3"></div>
        </div>
      </div>
    </section>

    <!-- ── Feature bento grid ────────────────────────────────────── -->
    <section class="bento-section" aria-labelledby="features-heading">
      <div class="bento-inner">
        <h2 id="features-heading" class="section-h2" data-reveal="fade-up" ref="sec1h">Everything in one embed.</h2>

        <div class="bento-grid" data-animate-stagger ref="bentoGrid">
          <!-- Large card: Widget Engine -->
          <article class="bento-card bento-card--large" aria-label="Widget Engine" data-reveal="fade-left">
            <div class="bento-card-content">
              <div class="bento-label">Widget Engine</div>
              <h3 class="bento-title">One script tag. All the complexity hidden.</h3>
              <p class="bento-desc">Drop the embed in your app. Configure currencies, fees, and branding. The widget handles the rest — including the edge cases you haven't thought of yet.</p>
            </div>
            <div class="widget-demo" aria-hidden="true">
              <div class="code-block">
                <div class="code-header">
                  <span class="code-dot" style="background:#ef4444" />
                  <span class="code-dot" style="background:#f59e0b" />
                  <span class="code-dot" style="background:#22c55e" />
                  <span class="code-filename">embed.html</span>
                </div>
                <pre class="code-body"><span class="code-tag">&lt;script</span>
  <span class="code-attr">src</span>=<span class="code-str">"https://widget.prodigy.demo/embed.js"</span>
  <span class="code-attr">data-client-id</span>=<span class="code-str">"YOUR_ID"</span>
<span class="code-tag">&gt;&lt;/script&gt;</span></pre>
              </div>
              <div class="widget-preview">
                <div class="preview-header">
                  <span class="preview-title">Buy USDC</span>
                  <span class="preview-live">● Live</span>
                </div>
                <div class="preview-amount">
                  <span class="preview-label">You send</span>
                  <span class="preview-value">€ 500.00</span>
                </div>
                <div class="preview-fee-row">
                  <span class="preview-fee-label">Platform fee (0.5%)</span>
                  <span class="preview-fee-val">€ 2.50</span>
                </div>
                <div class="preview-fee-row">
                  <span class="preview-fee-label">Network fee</span>
                  <span class="preview-fee-val">€ 1.00</span>
                </div>
                <div class="preview-divider" />
                <div class="preview-receive">
                  <span class="preview-receive-label">You receive</span>
                  <span class="preview-receive-val">496.44 USDC</span>
                </div>
                <div class="preview-confirm">Confirm →</div>
              </div>
            </div>
          </article>

          <!-- Small card: KYC Engine -->
          <article class="bento-card bento-card--small" aria-label="KYC Engine">
            <div class="bento-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div class="bento-label">KYC Engine</div>
            <h3 class="bento-title">Inline verification. No redirects. Average 47 seconds.</h3>
            <p class="bento-desc">Identity checks happen within the widget flow. Pass rate above 92%. Failed checks tell users exactly what to fix.</p>
          </article>

          <!-- Small card: Risk Layer -->
          <article class="bento-card bento-card--small" aria-label="Risk Layer">
            <div class="bento-icon bento-icon--amber" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div class="bento-label">Risk Layer</div>
            <h3 class="bento-title">Automatic risk scoring on every transaction.</h3>
            <p class="bento-desc">Flagged transactions held for human review with full context. Low, medium, high — you set the thresholds.</p>
          </article>

          <!-- Medium card: Fee Ledger -->
          <article class="bento-card bento-card--medium" aria-label="Fee Ledger" data-reveal="fade-right">
            <div class="bento-card-content">
              <div class="bento-icon bento-icon--teal" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
              </div>
              <div class="bento-label">Fee Ledger</div>
              <h3 class="bento-title">Every fee posted in real time.</h3>
              <p class="bento-desc">The admin console shows a receipt for every transaction — what was charged, who got what, and when.</p>
            </div>
            <div class="receipt-mockup" aria-hidden="true">
              <div class="receipt-row receipt-row--header">
                <span>TXN-8841</span><span>2026-06-18</span>
              </div>
              <div class="receipt-row">
                <span>User amount</span><span>€ 500.00</span>
              </div>
              <div class="receipt-row">
                <span>Platform fee</span><span class="receipt-purple">€ 2.50</span>
              </div>
              <div class="receipt-row">
                <span>Network fee</span><span>€ 1.00</span>
              </div>
              <div class="receipt-row">
                <span>Partner share</span><span class="receipt-green">€ 1.00</span>
              </div>
              <div class="receipt-row receipt-row--total">
                <span>USDC sent</span><span>496.44 USDC</span>
              </div>
            </div>
          </article>

          <!-- Small card: Partner API -->
          <article class="bento-card bento-card--small" aria-label="Partner API">
            <div class="bento-icon bento-icon--green" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="8" cy="12" r="4"/>
                <circle cx="16" cy="12" r="4"/>
              </svg>
            </div>
            <div class="bento-label">Partner API</div>
            <h3 class="bento-title">Revenue data via API or portal. Your choice.</h3>
            <p class="bento-desc">Webhook events for every transaction. Pull reports from the portal. Or query the API directly. All three work.</p>
          </article>
        </div>
      </div>
    </section>

    <!-- ── Live Widget Demo ─────────────────────────────────────────── -->
    <section class="gp-widget-demo-section" aria-labelledby="gp-widget-demo-heading">
      <div class="gp-widget-demo-inner">
        <div class="gp-widget-demo-glow" aria-hidden="true"></div>
        <h2 id="gp-widget-demo-heading" class="gp-widget-demo-h2" data-reveal="fade-up">
          Crypto that feels this good.
        </h2>
        <p class="gp-widget-demo-sub" data-reveal="fade-up">
          Every touchpoint designed. Every transition smooth. Every user impressed.
        </p>
        <div class="gp-widget-demo-widget" data-reveal="fade-up">
          <WidgetDemo theme="gradient" />
        </div>
      </div>
    </section>

    <!-- ── Feature Spotlight ────────────────────────────────────────── -->
    <section class="gp-spotlight-section" aria-labelledby="gp-spotlight-heading">
      <div class="gp-spotlight-inner">
        <h2 id="gp-spotlight-heading" class="section-h2" data-reveal="fade-up">What makes it different.</h2>
        <div class="gp-spotlight-grid">
          <div class="gp-spotlight-item" data-reveal="fade-up" style="transition-delay: 0ms">
            <div class="gp-spotlight-icon" aria-hidden="true">⚡</div>
            <h3 class="gp-spotlight-title">47-second KYC</h3>
            <p class="gp-spotlight-desc">Full identity verification. Nobody waits longer than it takes to get a coffee.</p>
          </div>
          <div class="gp-spotlight-item" data-reveal="fade-up" style="transition-delay: 160ms">
            <div class="gp-spotlight-icon" aria-hidden="true">🎨</div>
            <h3 class="gp-spotlight-title">Fully brandable</h3>
            <p class="gp-spotlight-desc">Your colors, your fonts, your widget. We disappear. You shine.</p>
          </div>
          <div class="gp-spotlight-item" data-reveal="fade-up" style="transition-delay: 320ms">
            <div class="gp-spotlight-icon" aria-hidden="true">📊</div>
            <h3 class="gp-spotlight-title">Real-time dashboard</h3>
            <p class="gp-spotlight-desc">Every transaction. Every user. Every fee. Yours.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Comparison table ─────────────────────────────────────────── -->
    <section class="compare-table-section" aria-labelledby="compare-table-heading">
      <div class="compare-table-inner">
        <p class="section-eyebrow" aria-hidden="true">VS THE ALTERNATIVES</p>
        <h2 id="compare-table-heading" class="section-h2" data-reveal="fade-up" ref="sec2h">Compare. Then decide.</h2>

        <div class="comp-table" role="table" aria-label="Product comparison table" data-reveal="fade-up">
          <!-- Header row -->
          <div class="comp-row comp-row--head" role="row">
            <div class="comp-cell comp-cell--feature" role="columnheader">Feature</div>
            <div class="comp-cell comp-cell--prodigy" role="columnheader">
              <span class="comp-col-badge">◈ Prodigy</span>
            </div>
            <div class="comp-cell comp-cell--alt" role="columnheader">Build it yourself</div>
            <div class="comp-cell comp-cell--alt" role="columnheader">Third-party SDK</div>
          </div>

          <!-- Data rows -->
          <div v-for="row in comparisonRows" :key="row.feature" class="comp-row" role="row">
            <div class="comp-cell comp-cell--feature" role="cell">{{ row.feature }}</div>
            <div class="comp-cell comp-cell--prodigy" role="cell">
              <span :class="['comp-badge', row.prodigy === '✓' ? 'badge--yes' : row.prodigy === '—' ? 'badge--na' : 'badge--custom']">
                {{ row.prodigy }}
              </span>
            </div>
            <div class="comp-cell comp-cell--alt" role="cell">
              <span :class="['comp-badge', row.diy === '✗' ? 'badge--no' : row.diy === '—' ? 'badge--na' : 'badge--custom']">
                {{ row.diy }}
              </span>
            </div>
            <div class="comp-cell comp-cell--alt" role="cell">
              <span :class="['comp-badge', row.sdk === '✓' ? 'badge--yes' : row.sdk === '✗' ? 'badge--no' : row.sdk === '—' ? 'badge--na' : 'badge--custom']">
                {{ row.sdk }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── How-it-works timeline ──────────────────────────────────── -->
    <section class="timeline-section" aria-labelledby="timeline-heading">
      <div class="timeline-inner">
        <h2 id="timeline-heading" class="section-h2" data-reveal="fade-up" ref="sec3h">From embed to earning in four steps.</h2>

        <div class="timeline-strip">
          <div class="timeline-line" aria-hidden="true" />

          <div class="timeline-steps">
            <div class="timeline-step">
              <div class="timeline-circle">
                <span>1</span>
              </div>
              <h3 class="timeline-title">Embed the script</h3>
              <p class="timeline-desc">One tag in your app's HTML. Hosted widget loads from our CDN.</p>
            </div>

            <div class="timeline-step">
              <div class="timeline-circle">
                <span>2</span>
              </div>
              <h3 class="timeline-title">Configure in admin</h3>
              <p class="timeline-desc">Set currencies, fees, partner share, and branding in the console.</p>
            </div>

            <div class="timeline-step">
              <div class="timeline-circle">
                <span>3</span>
              </div>
              <h3 class="timeline-title">User transacts</h3>
              <p class="timeline-desc">KYC runs inline. Fee shown before confirm. Risk checked automatically.</p>
            </div>

            <div class="timeline-step">
              <div class="timeline-circle">
                <span>4</span>
              </div>
              <h3 class="timeline-title">Revenue posted</h3>
              <p class="timeline-desc">Partner share posted instantly to the portal. No delay, no CSV.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ── Transaction Pipeline SVG ──────────────────────────────── -->
    <section class="gp-pipeline-section" aria-labelledby="gp-pipeline-h" data-reveal="fade-up">
      <div class="gp-pipeline-inner">
        <div class="eyebrow-badge" role="note" style="margin-bottom:1rem;">
          <span aria-hidden="true">✦</span> Transaction Pipeline
        </div>
        <h2 id="gp-pipeline-h" class="section-h2" style="margin-bottom:2rem;">How every transaction flows through Prodigy.</h2>
        <svg viewBox="0 0 500 80" fill="none" xmlns="http://www.w3.org/2000/svg"
             width="100%" preserveAspectRatio="xMidYMid meet"
             aria-hidden="true" role="img" class="pipeline-svg">
          <defs>
            <marker id="gp-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#a855f7" />
            </marker>
          </defs>
          <rect class="pipeline-box" x="0" y="22" width="80" height="36" ry="4" fill="rgba(168,85,247,0.05)" stroke="rgba(168,85,247,0.25)" stroke-width="1" />
          <rect class="pipeline-box" x="100" y="22" width="80" height="36" ry="4" fill="rgba(168,85,247,0.14)" stroke="#a855f7" stroke-width="1.5" />
          <rect class="pipeline-box" x="200" y="22" width="80" height="36" ry="4" fill="rgba(168,85,247,0.14)" stroke="#a855f7" stroke-width="1.5" />
          <rect class="pipeline-box" x="300" y="22" width="80" height="36" ry="4" fill="rgba(168,85,247,0.14)" stroke="#a855f7" stroke-width="1.5" />
          <rect class="pipeline-box" x="400" y="22" width="80" height="36" ry="4" fill="rgba(168,85,247,0.05)" stroke="rgba(168,85,247,0.25)" stroke-width="1" />
          <text x="40" y="44" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.4)" font-family="Space Mono, monospace">Your App</text>
          <text x="140" y="44" text-anchor="middle" font-size="9" fill="#a855f7" font-family="Space Mono, monospace">Prodigy SDK</text>
          <text x="240" y="44" text-anchor="middle" font-size="9" fill="#a855f7" font-family="Space Mono, monospace">KYC Check</text>
          <text x="340" y="44" text-anchor="middle" font-size="9" fill="#a855f7" font-family="Space Mono, monospace">Settlement</text>
          <text x="440" y="44" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.4)" font-family="Space Mono, monospace">Receipt</text>
          <line class="pipeline-arrow" x1="82" y1="40" x2="97" y2="40" stroke="#a855f7" stroke-width="1.5" marker-end="url(#gp-arrow)" stroke-dasharray="60" stroke-dashoffset="60" />
          <line class="pipeline-arrow" x1="182" y1="40" x2="197" y2="40" stroke="#a855f7" stroke-width="1.5" marker-end="url(#gp-arrow)" stroke-dasharray="60" stroke-dashoffset="60" />
          <line class="pipeline-arrow" x1="282" y1="40" x2="297" y2="40" stroke="#a855f7" stroke-width="1.5" marker-end="url(#gp-arrow)" stroke-dasharray="60" stroke-dashoffset="60" />
          <line class="pipeline-arrow" x1="382" y1="40" x2="397" y2="40" stroke="#a855f7" stroke-width="1.5" marker-end="url(#gp-arrow)" stroke-dasharray="60" stroke-dashoffset="60" />
        </svg>
      </div>
    </section>

    <!-- ── Metrics Strip ────────────────────────────────────────────── -->
    <section class="gp-metrics-strip" aria-label="Key metrics">
      <div class="gp-metrics-inner">
        <div class="gp-metrics-row" data-animate-stagger>
          <div class="gp-metric-chip" role="figure" aria-label="50 plus countries">
            <span class="gp-metric-num g-grad"><span ref="gradStat1">50</span>+</span>
            <span class="gp-metric-lbl">countries</span>
          </div>
          <div class="gp-metric-chip" role="figure" aria-label="Less than 1 afternoon integration">
            <span class="gp-metric-num g-grad">&lt;1 afternoon</span>
            <span class="gp-metric-lbl">integration</span>
          </div>
          <div class="gp-metric-chip" role="figure" aria-label="94% KYC pass rate">
            <span class="gp-metric-num g-grad"><span ref="gradStat2">94</span>%</span>
            <span class="gp-metric-lbl">KYC pass rate</span>
          </div>
          <div class="gp-metric-chip" role="figure" aria-label="2 billion dollars processed">
            <span class="gp-metric-num g-grad">$<span ref="gradStat3">2</span>B+</span>
            <span class="gp-metric-lbl">processed</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Widget Customization ──────────────────────────────────────── -->
    <section class="gp-custom-section" aria-labelledby="gp-custom-heading">
      <div class="gp-custom-inner">
        <div class="g-glass gp-custom-card">
          <h2 id="gp-custom-heading" class="gp-custom-h2 g-grad" data-reveal="fade-up" ref="brandH" data-grad-sweep>Your brand. Not ours.</h2>
          <p class="gp-custom-body">Prodigy's widget inherits your design system. Colors, typography, border radius — everything matches your product. Your users never know it's a third-party integration.</p>
          <ul class="gp-custom-list" role="list">
            <li class="gp-custom-item">
              <span class="gp-custom-bullet" aria-hidden="true">◈</span>
              6 pre-built visual themes
            </li>
            <li class="gp-custom-item">
              <span class="gp-custom-bullet" aria-hidden="true">◈</span>
              CSS custom properties override
            </li>
            <li class="gp-custom-item">
              <span class="gp-custom-bullet" aria-hidden="true">◈</span>
              White-label on Growth and above
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ── Use Cases ─────────────────────────────────────────────────── -->
    <section class="gp-usecases-section" aria-labelledby="gp-usecases-heading">
      <div class="gp-usecases-inner">
        <h2 id="gp-usecases-heading" class="gp-usecases-h2" data-reveal="fade-up">Built for every app type.</h2>
        <div class="gp-usecases-grid" data-animate-stagger>
          <article class="g-glass gp-usecase-card">
            <div class="gp-uc-icon-circle" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18"/></svg>
            </div>
            <span class="gp-uc-tag">Consumer Apps</span>
            <p class="gp-uc-body">Add crypto for your mobile-first users. Smooth UX, no janky redirects.</p>
          </article>
          <article class="g-glass gp-usecase-card">
            <div class="gp-uc-icon-circle" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
            </div>
            <span class="gp-uc-tag">Wallets</span>
            <p class="gp-uc-body">In-app on-ramp that feels native. KYC in 47 seconds.</p>
          </article>
          <article class="g-glass gp-usecase-card">
            <div class="gp-uc-icon-circle" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </div>
            <span class="gp-uc-tag">Gen-Z Fintech</span>
            <p class="gp-uc-body">The on-ramp your users actually complete. 94% KYC pass rate.</p>
          </article>
        </div>
      </div>
    </section>

    <!-- ── Social Proof ──────────────────────────────────────────────── -->
    <section class="gp-social-section" aria-labelledby="gp-social-heading">
      <div class="gp-social-inner">
        <h2 id="gp-social-heading" class="gp-social-h2" data-reveal="fade-up">What builders say.</h2>
        <div class="gp-social-grid" data-animate-stagger>
          <figure class="g-glass gp-quote-card">
            <blockquote class="gp-quote-text">"Our users never leave the app. That was the whole point."</blockquote>
            <figcaption class="gp-quote-attr">— Marcus T., CTO SwapDeck</figcaption>
          </figure>
          <figure class="g-glass gp-quote-card">
            <blockquote class="gp-quote-text">"47-second KYC. Our completion rate went from 61% to 94%."</blockquote>
            <figcaption class="gp-quote-attr">— Sarah K., CFO NordPay</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- ── Technical specifications ────────────────────────────────── -->
    <section class="specs-section" aria-labelledby="specs-heading">
      <div class="specs-inner">
        <p class="section-eyebrow" aria-hidden="true">ENGINEERING DETAIL</p>
        <h2 id="specs-heading" class="section-h2">Technical specifications</h2>
        <p class="section-sub-text">For the person who will actually be doing the integration.</p>

        <div class="specs-grid">
          <article v-for="card in specCards" :key="card.title" class="spec-card">
            <h3 class="spec-card-title">{{ card.title }}</h3>
            <dl class="spec-rows">
              <div v-for="item in card.rows" :key="item.key" class="spec-row">
                <dt class="spec-key">{{ item.key }}</dt>
                <dd class="spec-val">{{ item.val }}</dd>
              </div>
            </dl>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCountUp } from '@/composables/useGSAP'
import { useClipReveal, useGradientSweep } from '@/composables/useSplitReveal'
import { useMagneticAll } from '@/composables/useMagneticButton'
import { useCardTiltAll } from '@/composables/useCardTilt'
import WidgetDemo from '@/components/shared/WidgetDemo.vue'

const gradStat1 = ref<HTMLElement | null>(null)
const gradStat2 = ref<HTMLElement | null>(null)
const gradStat3 = ref<HTMLElement | null>(null)

useCountUp(gradStat1, 50, { duration: 2 })
useCountUp(gradStat2, 94, { duration: 2.5 })
useCountUp(gradStat3, 2, { duration: 2 })

// ── Animation refs ─────────────────────────────────────────────
const heroTitle = ref<HTMLElement | null>(null)
const heroSub = ref<HTMLElement | null>(null)
const heroSection = ref<HTMLElement | null>(null)
const sec1h = ref<HTMLElement | null>(null)
const sec2h = ref<HTMLElement | null>(null)
const sec3h = ref<HTMLElement | null>(null)
const brandH = ref<HTMLElement | null>(null)
const bentoGrid = ref<HTMLElement | null>(null)

// Hero h1 has <em> child — use clip reveal
useClipReveal(heroTitle, { direction: 'up', duration: 0.7 })
useClipReveal(heroSub, { direction: 'up', duration: 0.9, delay: 0.3 })
useClipReveal(sec1h, { direction: 'up', duration: 0.7 })
useClipReveal(sec2h, { direction: 'up', duration: 0.7, delay: 0.1 })
useClipReveal(sec3h, { direction: 'up', duration: 0.7, delay: 0.1 })
useGradientSweep(brandH, { color: '#a855f7', duration: 1200 })
useMagneticAll(heroSection, 'a, button', { strength: 0.4, returnDuration: 500 })
useCardTiltAll(bentoGrid, '.bento-card', { maxTilt: 8, scale: 1.03, glowColor: '#a855f7', glowIntensity: 0.3 })

/* ── Comparison table data ────────────────────────────────────── */
interface CompRow {
  feature: string
  prodigy: string
  diy: string
  sdk: string
}

const comparisonRows: CompRow[] = [
  { feature: 'Fee transparency pre-confirm', prodigy: '✓', diy: '—', sdk: '✓' },
  { feature: 'KYC built-in', prodigy: '✓', diy: '✗', sdk: 'Sometimes' },
  { feature: 'Partner revenue sharing', prodigy: '✓', diy: '✗', sdk: '✗' },
  { feature: 'Real-time admin dashboard', prodigy: '✓', diy: 'Custom', sdk: 'Limited' },
  { feature: 'Risk engine included', prodigy: '✓', diy: 'Custom', sdk: '✗' },
  { feature: 'Integration time', prodigy: '1 day', diy: '3–12 months', sdk: '1–2 weeks' },
  { feature: 'Compliance audit trail', prodigy: '✓', diy: 'Maybe', sdk: 'Limited' },
  { feature: 'Support for manual review', prodigy: '✓', diy: 'Maybe', sdk: '✗' },
]

/* ── Spec cards data ─────────────────────────────────────────── */
interface SpecRow { key: string; val: string }
interface SpecCard { title: string; rows: SpecRow[] }

const specCards: SpecCard[] = [
  {
    title: 'Widget Performance',
    rows: [
      { key: 'Quote latency', val: '< 50ms (p95)' },
      { key: 'Widget load time', val: '< 200ms' },
      { key: 'Supported currencies', val: 'BTC, ETH, USDT, SOL, XRP, USDC, LTC, BCH' },
      { key: 'Mobile responsive', val: 'Yes, all viewports' },
    ],
  },
  {
    title: 'KYC Engine',
    rows: [
      { key: 'Average completion', val: '47 seconds' },
      { key: 'First-time pass rate', val: '93.1%' },
      { key: 'Supported ID types', val: 'Passport, National ID, Driving licence' },
      { key: 'Data retention', val: 'Configurable (30–365 days)' },
    ],
  },
  {
    title: 'Risk & Compliance',
    rows: [
      { key: 'Checks per transaction', val: '12' },
      { key: 'Counterparty screening', val: 'Automated' },
      { key: 'Velocity monitoring', val: 'Configurable thresholds' },
      { key: 'Manual override', val: 'Admin console queue' },
    ],
  },
  {
    title: 'Integration',
    rows: [
      { key: 'SDK type', val: 'JavaScript embed (1 script tag)' },
      { key: 'Auth', val: 'Client ID + secret' },
      { key: 'Webhooks', val: 'Transaction, KYC, risk events' },
      { key: 'API', val: 'REST, JSON, documented' },
    ],
  },
]
</script>

<style scoped>
/* ── CSS variables ──────────────────────────────────────────────── */
.hero,
.bento-section,
.compare-table-section,
.timeline-section,
.specs-section {
  --violet: #7c3aed;
  --purple: #9333ea;
  --pink: #ec4899;
  --lavender: #a78bfa;
  --teal: #14b8a6;
  --green: #22c55e;
  --amber: #f59e0b;
  --bg: #fafafa;
  --surface: #f3f0ff;
  --white: #ffffff;
  --ink: #0f0e1a;
  --ink-mid: #4b4a6e;
  --ink-muted: #8b89b0;
  --border: rgba(124, 58, 237, 0.12);
  --radius-card: 20px;
  --radius-pill: 100px;
  --grad-soft: linear-gradient(160deg, #f3f0ff 0%, #fce7f3 50%, #ecfdf5 100%);
}

/* ── Hero ───────────────────────────────────────────────────────── */
.hero {
  background: var(--grad-soft);
  padding: 5rem 1.5rem;
}

.hero-inner {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.eyebrow-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  background: rgba(124, 58, 237, 0.1);
  color: #7c3aed;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.8125rem;
  font-weight: 600;
  border-radius: 100px;
  padding: 0.375rem 1rem;
}

.hero-h1 {
  font-family: 'Syne', sans-serif;
  font-size: clamp(2.5rem, 5vw, 3.75rem);
  font-weight: 800;
  color: #0f0e1a;
  line-height: 1.1;
  margin: 0;
}

.hero-h1 em {
  font-style: italic;
  color: #7c3aed;
}

.hero-sub {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  color: #4b4a6e;
  max-width: 56ch;
  line-height: 1.7;
  margin: 0;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 0.9375rem;
  color: #ffffff;
  background: linear-gradient(135deg, #7c3aed, #ec4899);
  border-radius: 100px;
  padding: 0.875rem 2rem;
  border: none;
  text-decoration: none;
  transition: opacity 0.15s, transform 0.15s;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.btn-outline {
  display: inline-flex;
  align-items: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 600;
  font-size: 0.9375rem;
  color: #7c3aed;
  background: transparent;
  border-radius: 100px;
  padding: 0.875rem 2rem;
  border: 2px solid rgba(124, 58, 237, 0.3);
  text-decoration: none;
  transition: border-color 0.15s;
}

.btn-outline:hover {
  border-color: #7c3aed;
}

/* ── Bento grid ─────────────────────────────────────────────────── */
.bento-section {
  background: #fafafa;
  padding: 5rem 1.5rem;
}

.bento-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.section-h2 {
  font-family: 'Syne', sans-serif;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 700;
  color: #0f0e1a;
  text-align: center;
  margin: 0 0 2.5rem;
}

.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 1.25rem;
}

.bento-card {
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 16px rgba(124, 58, 237, 0.07);
  border: 1px solid rgba(124, 58, 237, 0.08);
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.bento-card--large {
  grid-column: span 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  align-items: start;
}

.bento-card--medium {
  grid-column: span 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  align-items: start;
}

.bento-card--small {
  grid-column: span 1;
}

.bento-card-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.bento-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: linear-gradient(135deg, #7c3aed, #ec4899);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.bento-icon--amber {
  background: linear-gradient(135deg, #f59e0b, #ef4444);
}

.bento-icon--teal {
  background: linear-gradient(135deg, #14b8a6, #22c55e);
}

.bento-icon--green {
  background: linear-gradient(135deg, #22c55e, #14b8a6);
}

.bento-label {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #8b89b0;
}

.bento-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.0625rem;
  font-weight: 700;
  color: #0f0e1a;
  margin: 0;
  line-height: 1.3;
}

.bento-desc {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.875rem;
  color: #4b4a6e;
  line-height: 1.6;
  margin: 0;
}

/* Widget demo mockup */
.widget-demo {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.code-block {
  background: #0f0e1a;
  border-radius: 12px;
  overflow: hidden;
}

.code-header {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.625rem 0.875rem;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.code-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.code-filename {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.4);
  margin-left: 0.25rem;
}

.code-body {
  font-family: 'Space Mono', 'Courier New', monospace;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.8);
  padding: 0.875rem;
  margin: 0;
  overflow: hidden;
  white-space: pre;
  line-height: 1.7;
}

.code-tag { color: #a78bfa; }
.code-attr { color: #7dd3fc; }
.code-str { color: #86efac; }

.widget-preview {
  background: #ffffff;
  border: 1px solid rgba(124, 58, 237, 0.15);
  border-radius: 14px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}

.preview-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  color: #0f0e1a;
}

.preview-live {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.75rem;
  color: #22c55e;
  font-weight: 600;
}

.preview-amount {
  display: flex;
  justify-content: space-between;
  background: #f3f0ff;
  border-radius: 10px;
  padding: 0.625rem 0.75rem;
}

.preview-label {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.75rem;
  color: #8b89b0;
}

.preview-value {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  color: #0f0e1a;
}

.preview-fee-row {
  display: flex;
  justify-content: space-between;
}

.preview-fee-label {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.75rem;
  color: #8b89b0;
}

.preview-fee-val {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.75rem;
  color: #4b4a6e;
  font-weight: 500;
}

.preview-divider {
  height: 1px;
  background: rgba(124, 58, 237, 0.1);
}

.preview-receive {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.preview-receive-label {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.75rem;
  color: #8b89b0;
}

.preview-receive-val {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  font-weight: 800;
  color: #7c3aed;
}

.preview-confirm {
  background: linear-gradient(135deg, #7c3aed, #ec4899);
  color: white;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.8125rem;
  font-weight: 700;
  border-radius: 100px;
  padding: 0.5rem;
  text-align: center;
  cursor: default;
}

/* Receipt mockup */
.receipt-mockup {
  border: 1px solid rgba(124, 58, 237, 0.12);
  border-radius: 14px;
  overflow: hidden;
}

.receipt-row {
  display: flex;
  justify-content: space-between;
  padding: 0.625rem 0.875rem;
  border-bottom: 1px solid rgba(124, 58, 237, 0.07);
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.8125rem;
  color: #4b4a6e;
}

.receipt-row:last-child {
  border-bottom: none;
}

.receipt-row--header {
  background: rgba(124, 58, 237, 0.05);
  font-weight: 700;
  font-size: 0.75rem;
  color: #8b89b0;
  letter-spacing: 0.04em;
}

.receipt-row--total {
  font-weight: 700;
  color: #0f0e1a;
  background: rgba(124, 58, 237, 0.04);
}

.receipt-purple {
  color: #7c3aed;
  font-weight: 600;
}

.receipt-green {
  color: #22c55e;
  font-weight: 600;
}

/* ── Timeline ───────────────────────────────────────────────────── */
.timeline-section {
  background: var(--grad-soft);
  padding: 5rem 1.5rem;
}

.timeline-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.timeline-strip {
  position: relative;
}

.timeline-line {
  position: absolute;
  top: 22px;
  left: calc(12.5% + 1.5rem);
  right: calc(12.5% + 1.5rem);
  height: 2px;
  border-top: 2px dashed rgba(124, 58, 237, 0.25);
  z-index: 0;
}

.timeline-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  position: relative;
  z-index: 1;
}

.timeline-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.875rem;
}

.timeline-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #a78bfa, #7c3aed);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 800;
  font-size: 1rem;
  flex-shrink: 0;
  box-shadow: 0 4px 16px rgba(124, 58, 237, 0.25);
}

.timeline-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #0f0e1a;
  margin: 0;
}

.timeline-desc {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.875rem;
  color: #4b4a6e;
  line-height: 1.6;
  margin: 0;
}

/* ── Comparison table section ───────────────────────────────────── */
.compare-table-section {
  background: #ffffff;
  padding: 5rem 1.5rem;
}

.compare-table-inner {
  max-width: 1100px;
  margin: 0 auto;
}

.section-eyebrow {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #7c3aed;
  text-align: center;
  margin: 0 0 0.75rem;
}

.comp-table {
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 32px rgba(124, 58, 237, 0.09);
  border: 1px solid rgba(124, 58, 237, 0.09);
  overflow: hidden;
}

.comp-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  align-items: center;
  border-bottom: 1px solid rgba(124, 58, 237, 0.07);
}

.comp-row:last-child {
  border-bottom: none;
}

.comp-row--head {
  background: rgba(124, 58, 237, 0.04);
}

.comp-cell {
  padding: 0.875rem 1.25rem;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.875rem;
}

.comp-cell--feature {
  font-weight: 500;
  color: #0f0e1a;
  border-right: 1px solid rgba(124, 58, 237, 0.07);
}

.comp-row--head .comp-cell--feature {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #8b89b0;
}

.comp-cell--prodigy {
  background: rgba(124, 58, 237, 0.04);
  border-right: 1px solid rgba(124, 58, 237, 0.07);
  text-align: center;
}

.comp-cell--alt {
  color: #4b4a6e;
  text-align: center;
  border-right: 1px solid rgba(124, 58, 237, 0.07);
}

.comp-cell--alt:last-child {
  border-right: none;
}

.comp-col-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(135deg, #7c3aed, #ec4899);
  padding: 0.375rem 0.875rem;
  border-radius: 100px;
}

.comp-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.8125rem;
  font-weight: 600;
  padding: 0.25rem 0.625rem;
  border-radius: 100px;
}

.badge--yes {
  color: #22c55e;
  background: rgba(34, 197, 94, 0.12);
}

.badge--no {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.badge--na {
  color: #8b89b0;
  background: rgba(139, 137, 176, 0.12);
}

.badge--custom {
  color: #f59e0b;
  background: rgba(245, 158, 11, 0.1);
}

/* ── Specs section ──────────────────────────────────────────────── */
.specs-section {
  background: #fafafa;
  padding: 5rem 1.5rem;
}

.specs-inner {
  max-width: 1100px;
  margin: 0 auto;
}

.section-sub-text {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  color: #8b89b0;
  text-align: center;
  margin: 0 0 2.5rem;
}

.specs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

.spec-card {
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid rgba(124, 58, 237, 0.12);
  box-shadow: 0 2px 16px rgba(124, 58, 237, 0.06);
  padding: 1.75rem;
}

.spec-card-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #0f0e1a;
  margin: 0 0 1.25rem;
  padding-bottom: 0.875rem;
  border-bottom: 1px solid rgba(124, 58, 237, 0.1);
}

.spec-rows {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin: 0;
  padding: 0;
}

.spec-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  padding: 0.625rem 0;
  border-bottom: 1px solid rgba(124, 58, 237, 0.06);
}

.spec-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.spec-key {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.875rem;
  color: #8b89b0;
  font-weight: 500;
  flex-shrink: 0;
}

.spec-val {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.875rem;
  color: #7c3aed;
  font-weight: 600;
  text-align: right;
}

/* ── CSS helpers ────────────────────────────────────────────────── */
.g-grad {
  background: linear-gradient(135deg, #a855f7, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.g-glass {
  backdrop-filter: blur(16px);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
}
.g-grad-border {
  border: 1px solid transparent;
  background: linear-gradient(#0f0a1e, #0f0a1e) padding-box, linear-gradient(135deg, #a855f7, #ec4899) border-box;
}

/* ── Metrics Strip ──────────────────────────────────────────────── */
.gp-metrics-strip {
  background: #0f0a1e;
  padding: 3.5rem 1.5rem;
}
.gp-metrics-inner {
  max-width: 1100px;
  margin: 0 auto;
}
.gp-metrics-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}
.gp-metric-chip {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  backdrop-filter: blur(16px);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 100px;
  padding: 0.875rem 2rem;
  min-width: 140px;
}
.gp-metric-num {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1.1;
}
.gp-metric-lbl {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
}

/* ── Widget Customization ───────────────────────────────────────── */
.gp-custom-section {
  background: #0f0a1e;
  padding: 5rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}
.gp-custom-inner {
  max-width: 760px;
  margin: 0 auto;
}
.gp-custom-card {
  padding: 2.5rem;
}
.gp-custom-h2 {
  font-family: 'Syne', sans-serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  margin: 0 0 1.25rem;
  line-height: 1.1;
}
.gp-custom-body {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  margin: 0 0 1.75rem;
}
.gp-custom-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}
.gp-custom-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
}
.gp-custom-bullet {
  background: linear-gradient(135deg, #a855f7, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 1.125rem;
  flex-shrink: 0;
}

/* ── Use Cases ──────────────────────────────────────────────────── */
.gp-usecases-section {
  background: #0f0a1e;
  padding: 5rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}
.gp-usecases-inner {
  max-width: 1100px;
  margin: 0 auto;
}
.gp-usecases-h2 {
  font-family: 'Syne', sans-serif;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800;
  color: #fff;
  text-align: center;
  margin: 0 0 2.5rem;
}
.gp-usecases-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}
.gp-usecase-card {
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.gp-uc-icon-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
}
.gp-uc-tag {
  display: inline-flex;
  align-items: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #a855f7;
  background: rgba(168, 85, 247, 0.12);
  border: 1px solid rgba(168, 85, 247, 0.25);
  border-radius: 100px;
  padding: 0.25rem 0.75rem;
  width: fit-content;
}
.gp-uc-body {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.65;
  margin: 0;
  flex: 1;
}

/* ── Social Proof ───────────────────────────────────────────────── */
.gp-social-section {
  background: #0f0a1e;
  padding: 5rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}
.gp-social-inner {
  max-width: 1100px;
  margin: 0 auto;
}
.gp-social-h2 {
  font-family: 'Syne', sans-serif;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800;
  color: #fff;
  text-align: center;
  margin: 0 0 2.5rem;
}
.gp-social-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}
.gp-quote-card {
  padding: 2rem;
  border-left: 3px solid #a855f7;
  border-radius: 0 16px 16px 0;
  margin: 0;
}
.gp-quote-text {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.0625rem;
  font-style: italic;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.65;
  margin: 0 0 1rem;
}
.gp-quote-attr {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}
@media (max-width: 768px) {
  .gp-usecases-grid { grid-template-columns: 1fr; }
  .gp-social-grid { grid-template-columns: 1fr; }
  .gp-metrics-row { flex-direction: column; align-items: center; }
}

/* ── Gradient orb illustration ──────────────────────────────────── */
.gp-orb-wrap { position: relative; width: 200px; height: 200px; margin: 2rem auto 0; flex-shrink: 0; }
.gp-orb { position: absolute; border-radius: 50%; filter: blur(30px); animation: orb-drift 6s ease-in-out infinite; }
.gp-orb-1 { width: 120px; height: 120px; background: #a855f7; top: 20%; left: 10%; opacity: 0.5; animation-delay: 0s; }
.gp-orb-2 { width: 90px; height: 90px; background: #ec4899; bottom: 15%; right: 10%; opacity: 0.45; animation-delay: 2s; }
.gp-orb-3 { width: 70px; height: 70px; background: #6366f1; top: 10%; right: 20%; opacity: 0.35; animation-delay: 4s; }
@keyframes orb-drift { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-12px) scale(1.05)} }
@media (prefers-reduced-motion: reduce) { .gp-orb { animation: none; } }

/* ── Live Widget Demo ───────────────────────────────────────────── */
.gp-widget-demo-section {
  background: #0f0a1e;
  padding: 6rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  position: relative;
  overflow: hidden;
}

.gp-widget-demo-inner {
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  position: relative;
  z-index: 1;
}

.gp-widget-demo-glow {
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, rgba(236, 72, 153, 0.1) 50%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.gp-widget-demo-h2 {
  font-family: 'Syne', sans-serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  text-align: center;
  margin: 0;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gp-widget-demo-sub {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.65);
  text-align: center;
  line-height: 1.65;
  max-width: 52ch;
  margin: 0;
}

.gp-widget-demo-widget {
  margin-top: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
}

/* ── Feature Spotlight ──────────────────────────────────────────── */
.gp-spotlight-section {
  background: #0f0a1e;
  padding: 5rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.gp-spotlight-inner {
  max-width: 1100px;
  margin: 0 auto;
}

.gp-spotlight-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;
}

.gp-spotlight-item {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
  align-items: center;
}

.gp-spotlight-icon {
  font-size: 3rem;
  line-height: 1;
}

.gp-spotlight-title {
  font-family: 'Syne', sans-serif;
  font-size: clamp(1.25rem, 2.5vw, 1.625rem);
  font-weight: 800;
  color: #fff;
  margin: 0;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gp-spotlight-desc {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.65;
  margin: 0;
  max-width: 28ch;
}

@media (max-width: 768px) {
  .gp-spotlight-grid { grid-template-columns: 1fr; }
}

/* ── Responsive ─────────────────────────────────────────────────── */
@media (max-width: 1024px) {
  .bento-grid {
    grid-template-columns: 1fr 1fr;
  }

  .bento-card--large,
  .bento-card--medium {
    grid-column: span 2;
    grid-template-columns: 1fr;
  }

  .timeline-steps {
    grid-template-columns: repeat(2, 1fr);
  }

  .timeline-line {
    display: none;
  }

  .specs-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .comp-row {
    grid-template-columns: 1.5fr 1fr 1fr 1fr;
  }

  .comp-cell {
    padding: 0.75rem 0.875rem;
    font-size: 0.8125rem;
  }
}

@media (max-width: 640px) {
  .bento-grid {
    grid-template-columns: 1fr;
  }

  .bento-card--large,
  .bento-card--medium,
  .bento-card--small {
    grid-column: span 1;
  }

  .timeline-steps {
    grid-template-columns: 1fr;
  }

  .hero-actions {
    flex-direction: column;
    width: 100%;
  }

  .btn-primary,
  .btn-outline {
    width: 100%;
    justify-content: center;
  }

  .comp-row {
    grid-template-columns: 1fr;
  }

  .comp-cell--prodigy,
  .comp-cell--alt {
    border-right: none;
    border-top: 1px solid rgba(124, 58, 237, 0.07);
    text-align: left;
  }

  .comp-cell--feature {
    font-weight: 700;
    background: rgba(124, 58, 237, 0.03);
    border-right: none;
  }

  .specs-grid {
    grid-template-columns: 1fr;
  }
}

/* ── Transaction Pipeline SVG ── */
.gp-pipeline-section { background: rgba(168,85,247,0.04); border-top: 1px solid rgba(168,85,247,0.15); border-bottom: 1px solid rgba(168,85,247,0.15); padding: 4rem 0; }
.gp-pipeline-inner { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
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
