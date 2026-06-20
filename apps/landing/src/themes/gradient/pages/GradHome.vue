<template>
  <main>
    <!-- ── Section 1: Hero ──────────────────────────────────────────── -->
    <section class="hero" aria-labelledby="hero-heading">
      <GradientParticleSphere />
      <!-- Mesh blobs -->
      <div class="mesh-blob mesh-blob-1" aria-hidden="true" />
      <div class="mesh-blob mesh-blob-2" aria-hidden="true" />
      <div class="mesh-blob mesh-blob-3" aria-hidden="true" />

      <div class="hero-inner" ref="heroSection">
        <!-- Left column -->
        <div class="hero-left">
          <div class="eyebrow-badge" role="note">
            <span aria-hidden="true">✦</span> Crypto that makes sense
          </div>

          <h1 id="hero-heading" class="hero-h1" ref="heroTitle">
            Your Platform.<br />
            Their Crypto.<br />
            Everyone Gets Paid.
          </h1>

          <p class="hero-sub" ref="heroSub">
            Embed a crypto widget with transparent fees and built-in KYC in less time than it takes to schedule the meeting where someone explains why it's complicated.
          </p>

          <div class="hero-actions">
            <a
              href="http://localhost:5001"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary-white"
            >
              Get Started Free →
            </a>
            <a
              href="http://localhost:5001"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-ghost"
            >
              Watch Demo
            </a>
          </div>

          <div class="social-proof" aria-label="Social proof">
            <div class="avatar-row" aria-hidden="true">
              <span class="avatar">JL</span>
              <span class="avatar">MR</span>
              <span class="avatar">TS</span>
              <span class="avatar">AK</span>
              <span class="avatar">+</span>
            </div>
            <p class="social-proof-text">Join 247 teams who stopped building it themselves</p>
          </div>
        </div>

        <!-- Right column: floating cards -->
        <div class="hero-right" aria-hidden="true">
          <div class="cards-cluster">
            <!-- Wallet card -->
            <div class="float-card wallet-card">
              <p class="card-label">Wallet Balance</p>
              <p class="wallet-amount">3,800.54 <span class="currency">USDC</span></p>
              <div class="balance-bar">
                <div class="balance-fill" />
              </div>
              <p class="balance-note">Available to withdraw</p>
            </div>

            <!-- Income card -->
            <div class="mini-card income-card">
              <span class="mini-arrow">↓</span>
              <div>
                <p class="mini-label">Income</p>
                <p class="mini-amount">280.54 USDC</p>
              </div>
            </div>

            <!-- Outcome card -->
            <div class="mini-card outcome-card">
              <span class="mini-arrow">↑</span>
              <div>
                <p class="mini-label">Fee</p>
                <p class="mini-amount">14.99 USDC</p>
              </div>
            </div>

            <!-- Suggestions card -->
            <div class="float-card suggestions-card">
              <div class="suggestions-header">
                <p class="suggestions-title">Suggestions</p>
                <span class="toggle-pill">All</span>
              </div>
              <ul class="suggestions-list">
                <li><span class="sug-icon" aria-hidden="true">✦</span> Fee: 0.5% — shown before confirm</li>
                <li><span class="sug-icon" aria-hidden="true">✦</span> KYC: approved in 47s</li>
                <li><span class="sug-icon" aria-hidden="true">✦</span> Partner share: posted instantly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Live activity toast: bottom-right of hero -->
      <div class="grad-toast-anchor" aria-live="polite" aria-label="Live activity">
        <LiveActivityToast scheme="dark" :interval-ms="3000" />
      </div>
    </section>

    <!-- Feature marquee strip -->
    <div class="marquee-wrap" aria-hidden="true">
      <div class="marquee-track">
        <span class="marquee-pill" v-for="(item, i) in [...marqueeItems, ...marqueeItems]" :key="i">{{ item }}</span>
      </div>
    </div>

    <!-- Live activity feed -->
    <div class="activity-feed" aria-label="Recent activity (simulated)" aria-live="polite">
      <div class="activity-header">
        <span class="activity-dot" aria-hidden="true" />
        <span class="activity-label">Live activity</span>
      </div>
      <TransitionGroup name="activity-slide" tag="ul" class="activity-list">
        <li v-for="item in visibleActivity" :key="item.id" class="activity-item">
          <span class="activity-flag">{{ item.flag }}</span>
          <span class="activity-text">{{ item.text }}</span>
          <span class="activity-time">{{ item.time }}</span>
        </li>
      </TransitionGroup>
      <p class="activity-disclaimer">Simulated activity for demonstration purposes</p>
    </div>

    <!-- ── Section 2: Social proof / partner logos ─────────────────── -->
    <section class="partners-strip" aria-labelledby="partners-strip-heading">
      <p id="partners-strip-heading" class="partners-label">Trusted by fintech builders</p>
      <div class="partner-badges" role="list">
        <span class="partner-badge" role="listitem">FinCo Plus</span>
        <span class="partner-badge" role="listitem">NeoBank App</span>
        <span class="partner-badge" role="listitem">CryptoFlow</span>
        <span class="partner-badge" role="listitem">PayOS</span>
        <span class="partner-badge" role="listitem">WalletKit</span>
      </div>
    </section>

    <!-- ── Section 3: Why section ──────────────────────────────────── -->
    <section class="why-section" aria-labelledby="why-heading">
      <div class="why-inner">
        <h2 id="why-heading" class="why-h2" ref="sec1h" data-grad-sweep>
          Why Prodigy?<br />
          Because Finance Isn't a Guessing Game.
        </h2>

        <div class="why-tabs" role="tablist" aria-label="Audience selector">
          <button
            class="tab-pill"
            :class="{ active: activeTab === 'builders' }"
            role="tab"
            :aria-selected="activeTab === 'builders'"
            aria-controls="tab-builders"
            @click="activeTab = 'builders'"
          >
            For B2B Builders
          </button>
          <button
            class="tab-pill"
            :class="{ active: activeTab === 'compliance' }"
            role="tab"
            :aria-selected="activeTab === 'compliance'"
            aria-controls="tab-compliance"
            @click="activeTab = 'compliance'"
          >
            For Compliance Teams
          </button>
        </div>

        <div class="why-grid">
          <!-- Left: feature list -->
          <ul
            id="tab-builders"
            v-if="activeTab === 'builders'"
            class="feature-list"
            role="tabpanel"
          >
            <li class="feature-row">
              <div class="feature-icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                  <circle cx="12" cy="12" r="8"/>
                  <path d="M12 8v4l3 3"/>
                </svg>
              </div>
              <div class="feature-text">
                <p class="feature-name">Fee Transparency</p>
                <p class="feature-desc">Every fee is shown to the user before they confirm. No hidden charges, no surprises, no chargebacks.</p>
              </div>
            </li>
            <li class="feature-row">
              <div class="feature-icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <div class="feature-text">
                <p class="feature-name">KYC Built-In</p>
                <p class="feature-desc">Verification that doesn't slow the user down. Average approval in under 60 seconds.</p>
              </div>
            </li>
            <li class="feature-row">
              <div class="feature-icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                  <line x1="18" y1="20" x2="18" y2="10"/>
                  <line x1="12" y1="20" x2="12" y2="4"/>
                  <line x1="6" y1="20" x2="6" y2="14"/>
                </svg>
              </div>
              <div class="feature-text">
                <p class="feature-name">Real-Time Ledger</p>
                <p class="feature-desc">Every transaction posted instantly. Your admin console shows what happened and why.</p>
              </div>
            </li>
            <li class="feature-row">
              <div class="feature-icon feature-icon--teal" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                  <circle cx="8" cy="12" r="4"/>
                  <circle cx="16" cy="12" r="4"/>
                </svg>
              </div>
              <div class="feature-text">
                <p class="feature-name">Partner Revenue</p>
                <p class="feature-desc">Set your platform fee. Set a partner share. The portal tracks it automatically. No spreadsheets.</p>
              </div>
            </li>
          </ul>

          <ul
            id="tab-compliance"
            v-if="activeTab === 'compliance'"
            class="feature-list"
            role="tabpanel"
          >
            <li class="feature-row">
              <div class="feature-icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div class="feature-text">
                <p class="feature-name">Audit Trail</p>
                <p class="feature-desc">Every action is logged with a timestamp. Compliance questions become a search query, not an investigation.</p>
              </div>
            </li>
            <li class="feature-row">
              <div class="feature-icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                  <path d="M9 11l3 3L22 4"/>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                </svg>
              </div>
              <div class="feature-text">
                <p class="feature-name">KYC Approval Records</p>
                <p class="feature-desc">Each verification attempt stored with pass/fail status, document type, and elapsed time.</p>
              </div>
            </li>
            <li class="feature-row">
              <div class="feature-icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <div class="feature-text">
                <p class="feature-name">Risk Flagging</p>
                <p class="feature-desc">Automated risk-score checks on every transaction. Flags held for human review with full context.</p>
              </div>
            </li>
            <li class="feature-row">
              <div class="feature-icon feature-icon--teal" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
              </div>
              <div class="feature-text">
                <p class="feature-name">Exportable Reports</p>
                <p class="feature-desc">One-click exports for any date range. The format regulators expect, not the format convenient for us.</p>
              </div>
            </li>
          </ul>

          <!-- Right: KYC mockup card -->
          <div class="kyc-mockup" aria-hidden="true">
            <div class="kyc-card">
              <div class="kyc-header">
                <div class="kyc-avatar">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div class="kyc-user">
                  <p class="kyc-name">Alex Martin</p>
                  <p class="kyc-id">ID: USR-2847</p>
                </div>
                <span class="kyc-badge">APPROVED</span>
              </div>
              <div class="kyc-rows">
                <div class="kyc-row">
                  <span class="kyc-key">Document</span>
                  <span class="kyc-val">Passport</span>
                </div>
                <div class="kyc-row">
                  <span class="kyc-key">Verified</span>
                  <span class="kyc-val kyc-val--green">47s</span>
                </div>
                <div class="kyc-row">
                  <span class="kyc-key">Risk Score</span>
                  <span class="kyc-val kyc-val--green">Low</span>
                </div>
                <div class="kyc-row">
                  <span class="kyc-key">Timestamp</span>
                  <span class="kyc-val">2026-06-18 09:14</span>
                </div>
              </div>
              <div class="kyc-status-bar">
                <span class="kyc-status-dot" aria-hidden="true" />
                <span class="kyc-status-text">Identity verified — transaction cleared</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Section 4: How it works ─────────────────────────────────── -->
    <section class="how-section" aria-labelledby="how-heading">
      <div class="how-inner">
        <h2 id="how-heading" class="how-h2">Up and running <em>today</em>.</h2>

        <div class="steps-row">
          <article class="step-card">
            <div class="step-icon" aria-hidden="true">🔌</div>
            <p class="step-number">STEP 01</p>
            <h3 class="step-title">Embed</h3>
            <p class="step-desc">One script tag. Your brand, your currencies, your fees. A determined developer has it live before lunch.</p>
            <RouterLink to="/gradient/product" class="step-link">Learn more →</RouterLink>
          </article>

          <article class="step-card">
            <div class="step-icon" aria-hidden="true">⚡</div>
            <p class="step-number">STEP 02</p>
            <h3 class="step-title">Configure</h3>
            <p class="step-desc">Set platform fee and partner share in the admin console. These numbers appear to the user before confirmation. No others.</p>
            <RouterLink to="/gradient/pricing" class="step-link">Learn more →</RouterLink>
          </article>

          <article class="step-card">
            <div class="step-icon" aria-hidden="true">📈</div>
            <p class="step-number">STEP 03</p>
            <h3 class="step-title">Earn</h3>
            <p class="step-desc">The partner portal tracks every transaction and commission. No pivot tables. No Friday CSV exports.</p>
            <RouterLink to="/gradient/partners" class="step-link">Learn more →</RouterLink>
          </article>
        </div>
      </div>
    </section>

    <!-- ── Widget Preview ────────────────────────────────────────── -->
    <section class="grad-widget-preview-section" data-reveal="fade-up" aria-labelledby="grad-widget-preview-h">
      <div class="grad-widget-preview-inner">
        <div class="grad-widget-preview-text">
          <h2 id="grad-widget-preview-h" class="how-h2">Try the widget. Right here.</h2>
          <p class="grad-widget-preview-sub">Three steps, beautifully designed, completely branded. This is what crypto on-ramps should feel like.</p>
        </div>
        <WidgetDemo theme="gradient" />
      </div>
    </section>

    <!-- ── Section 5: Under the hood stepper ────────────────────── -->
    <section class="stepper-section" aria-labelledby="stepper-heading">
      <div class="stepper-inner">
        <p class="eyebrow-label" aria-hidden="true">THE FLOW</p>
        <h2 id="stepper-heading" class="stepper-h2" ref="feat1">
          What happens when a user hits "Confirm"
        </h2>
        <p class="stepper-sub">
          Not a black box. A 7-step journey you can watch in the admin console in real time.
        </p>

        <ol class="step-list" aria-label="Transaction flow steps">
          <li
            v-for="(step, idx) in transactionSteps"
            :key="idx"
            class="step-item"
            :class="{ 'step-visible': visibleSteps.has(idx) }"
            :ref="(el) => setStepRef(el as Element | null, idx)"
          >
            <div class="step-num-circle" aria-hidden="true">{{ idx + 1 }}</div>
            <div class="step-content">
              <h3 class="step-item-title">{{ step.title }}</h3>
              <p class="step-item-desc">{{ step.desc }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- ── Section 6: Trust & compliance ─────────────────────────── -->
    <section class="trust-section" aria-labelledby="trust-heading">
      <div class="trust-inner">
        <p class="eyebrow-label" aria-hidden="true">TRUST</p>
        <h2 id="trust-heading" class="trust-h2" ref="sec2h" data-grad-sweep>
          Built for teams who have to answer for it.
        </h2>
        <p class="trust-sub">
          Every Prodigy integration ships with the things your compliance team will ask for before anyone goes live.
        </p>

        <div class="trust-grid">
          <article v-for="item in trustItems" :key="item.title" class="trust-card">
            <div class="trust-icon-wrap" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="item.iconPath" />
            </div>
            <h3 class="trust-item-title">{{ item.title }}</h3>
            <p class="trust-item-desc">{{ item.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- ── Section 7: Live metrics ────────────────────────────────── -->
    <section class="metrics-section" aria-labelledby="metrics-heading">
      <div class="metrics-inner">
        <p class="eyebrow-label eyebrow-label--light" aria-hidden="true">LIVE METRICS (DEMO DATA)</p>
        <h2 id="metrics-heading" class="metrics-h2">The numbers that matter.</h2>
        <p class="metrics-sub">
          These are what a moderately busy integration looks like. Yours would be different. Probably better.
        </p>

        <div class="metrics-grid">
          <article
            v-for="(stat, idx) in metricStats"
            :key="idx"
            class="metric-card"
            :ref="(el) => setMetricRef(el as Element | null, idx)"
          >
            <div class="metric-top">
              <span class="metric-value" :aria-label="stat.label + ': ' + stat.display">
                {{ stat.prefix }}{{ metricDisplayValues[idx] }}{{ stat.suffix }}
              </span>
              <span class="trend-badge" aria-label="Trend: up 12.4 percent vs last period">↑ 12.4% vs last period</span>
            </div>
            <p class="metric-label">{{ stat.label }}</p>
            <p class="metric-context">{{ stat.context }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- ── Section 7b: Counter Stats Row ────────────────────────────── -->
    <section class="grad-stats-section" aria-label="Platform statistics">
      <div class="grad-stats-inner">
        <div class="grad-stats-grid">
          <div class="grad-stat-item">
            <CounterStat :value="4.2" prefix="$" suffix="B+" label="Volume" />
          </div>
          <div class="grad-stat-item">
            <CounterStat :value="47" suffix="ms" label="Speed" />
          </div>
          <div class="grad-stat-item">
            <CounterStat :value="3" label="Chains" />
          </div>
          <div class="grad-stat-item">
            <CounterStat :value="99.99" suffix="%" label="Uptime" />
          </div>
        </div>
      </div>
    </section>

    <!-- ── Section 7c: Payment Flow SVG ──────────────────────────────── -->
    <section class="grad-flow-section" aria-label="Payment flow visualization">
      <div class="grad-flow-inner">
        <p class="eyebrow-label eyebrow-label--light" aria-hidden="true">THE FLOW</p>
        <h2 class="grad-flow-h2">From confirm to settled — in one breath.</h2>
        <PaymentFlowSvg theme="dark" />
      </div>
    </section>

    <!-- ── Section 7d: Trust Logo Strip ──────────────────────────────── -->
    <section class="grad-trust-section" aria-label="Trusted companies">
      <div class="grad-trust-wrapper">
        <TrustLogoStrip :marquee="true" />
      </div>
    </section>

    <!-- ── Testimonials ──────────────────────────────────────────────── -->
    <section class="grad-testimonials" aria-label="Customer testimonials">
      <div class="grad-testimonials-inner">
        <p class="eyebrow-label" aria-hidden="true">WHAT THEY SAID</p>
        <h2 class="grad-testimonials-h2">Trusted by builders who ship.</h2>
        <div class="grad-testimonials-row">
          <div class="t-card">
            <p class="t-quote">"We went from 6 months of KYC integration to 3 lines of code. Prodigy is the infrastructure layer we never had to build."</p>
            <div class="t-author">
              <div class="t-avatar" aria-hidden="true">SK</div>
              <span class="t-name">Sarah K., Head of Product, NordPay</span>
            </div>
          </div>
          <div class="t-card">
            <p class="t-quote">"Our conversion rate jumped 34% after switching. The widget just works — no edge cases, no compliance headaches."</p>
            <div class="t-author">
              <div class="t-avatar" aria-hidden="true">MT</div>
              <span class="t-name">Marcus T., CTO, SwapDeck</span>
            </div>
          </div>
          <div class="t-card">
            <p class="t-quote">"We launched in 3 new markets in Q3 because Prodigy handles all the local compliance. It's transformative."</p>
            <div class="t-author">
              <div class="t-avatar" aria-hidden="true">IM</div>
              <span class="t-name">Ingrid M., CEO, Meridian Wealth</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Embed section ──────────────────────────────────────────────── -->
    <section class="grad-embed-section" aria-label="Embed code">
      <div class="grad-embed-inner">
        <div class="grad-embed-grid">
          <div class="grad-embed-left">
            <h2 class="grad-embed-h2">
              <span class="grad-embed-gradient">Integrate</span> in an afternoon. Not a sprint.
            </h2>
            <p class="grad-embed-sub">
              One script tag. Your brand, your currencies, your fees. A determined developer has it live before lunch.
            </p>
            <RouterLink to="./developers" class="grad-embed-link">Developer docs →</RouterLink>
          </div>
          <div class="grad-embed-right">
            <CodeBlock :code="embedCode" language="html" />
          </div>
        </div>
      </div>
    </section>

    <!-- ── Partners Say ─────────────────────────────────────────────── -->
    <section class="grad-partners-say" aria-labelledby="grad-partners-h" data-reveal="fade-up">
      <div class="grad-partners-inner">
        <p class="grad-partners-eyebrow">Social proof · Simulated companies · Genuine results</p>
        <h2 id="grad-partners-h" class="grad-partners-h2">Stories from our partners.</h2>
        <div class="grad-partners-grid" ref="partnersGrid" data-animate-stagger>
          <figure class="grad-partner-card" v-for="t in partnerTestimonials" :key="t.badge">
            <blockquote class="grad-partner-quote">{{ t.quote }}</blockquote>
            <figcaption class="grad-partner-attr">
              <span class="grad-partner-role">{{ t.role }}</span>
              <span class="grad-partner-company">{{ t.company }}</span>
            </figcaption>
            <span class="grad-partner-badge">{{ t.badge }}</span>
          </figure>
        </div>
      </div>
    </section>

    <!-- ── Section 8: CTA ──────────────────────────────────────────── -->
    <section class="cta-section" aria-labelledby="cta-heading">
      <div class="mesh-blob cta-blob-1" aria-hidden="true" />
      <div class="mesh-blob cta-blob-2" aria-hidden="true" />
      <div class="cta-inner">
        <h2 id="cta-heading" class="cta-h2">
          The demo is free. The integration is one script tag. The rest is your revenue.
        </h2>
        <p class="cta-sub">
          No contracts. No minimums. No pricing fog. Start with the demo, go live when you're ready.
        </p>
        <div class="cta-actions">
          <a
            href="http://localhost:5001"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary-white"
          >
            Open Live Demo →
          </a>
          <a
            href="http://localhost:5002"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-ghost"
          >
            Talk to a Human
          </a>
        </div>
        <p class="cta-hint">→ localhost:5001 for the full experience</p>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { TrustLogoStrip, LiveActivityToast, CounterStat, PaymentFlowSvg } from '@/components/shared'
import { CodeBlock } from '@/components/shared'
import GradientParticleSphere from '@/components/three/GradientParticleSphere.vue'
import { useSplitReveal, useClipReveal, useGradientSweep } from '@/composables/useSplitReveal'
import { useMagneticAll } from '@/composables/useMagneticButton'
import { useHoverScramble } from '@/composables/useTextScramble'
import { useCardTiltAll } from '@/composables/useCardTilt'
import WidgetDemo from '@/components/shared/WidgetDemo.vue'

// ── Marquee ───────────────────────────────────────────────────────
const marqueeItems = ['⚡ 47s KYC', '🌍 50+ countries', '🔒 PCI DSS', '📊 Real-time dashboard', '🏦 Built-in KYC', '💸 0.5% flat fee', '🛡 AML screening', '⚙ One SDK', '📱 Mobile-ready', '🔌 REST + webhooks', '✅ No compliance headache', '🚀 One afternoon']

// ── Live activity feed ────────────────────────────────────────────
interface ActivityItem { id: number; flag: string; text: string; time: string }
const allActivity: ActivityItem[] = [
  { id: 1,  flag: '🇩🇪', text: 'NeoBank user bought 0.0031 BTC', time: 'just now' },
  { id: 2,  flag: '🇬🇧', text: 'Exchange partner earned €4.20 fee', time: '8s ago' },
  { id: 3,  flag: '🇳🇱', text: 'KYC approved in 44s', time: '15s ago' },
  { id: 4,  flag: '🇨🇭', text: 'Wealth platform settled €2,400', time: '22s ago' },
  { id: 5,  flag: '🇫🇷', text: 'SDK initialized — first transaction', time: '31s ago' },
  { id: 6,  flag: '🇸🇪', text: 'Partner portal payout: €249', time: '44s ago' },
  { id: 7,  flag: '🇦🇹', text: 'AML check passed automatically', time: '58s ago' },
  { id: 8,  flag: '🇮🇪', text: 'White-label widget deployed', time: '1m ago' },
]
const visibleActivity = ref<ActivityItem[]>(allActivity.slice(0, 4))
const activityIdx = ref(4)
let activityTimer: ReturnType<typeof setInterval>

// ── Partners testimonials ─────────────────────────────────────────
const partnersGrid = ref<HTMLElement | null>(null)
useCardTiltAll(partnersGrid, '.grad-partner-card', { maxTilt: 7, scale: 1.025, glowColor: '#a855f7', glowIntensity: 0.25 })

const partnerTestimonials = [
  {
    quote: 'We embedded Prodigy on a Thursday. The compliance team signed off on Friday. That has never happened before.',
    role: 'CTO · Series B Neobank',
    company: 'NordPay, Berlin (simulated)',
    badge: '47s avg KYC',
  },
  {
    quote: 'Our KYC drop-off went from 23% to 6% in a single sprint. We stopped losing customers at the most critical moment.',
    role: 'Head of Product · Crypto Exchange',
    company: 'SwapDeck, London (simulated)',
    badge: '3× volume growth',
  },
  {
    quote: 'First fintech partner to give us a compliance audit trail that actually reconciles. We renewed before the trial period ended.',
    role: 'Head of Compliance · Wealth Platform',
    company: 'Meridian Wealth, Zurich (simulated)',
    badge: '0 audit flags',
  },
]

// ── Animation refs ─────────────────────────────────────────────
const heroTitle = ref<HTMLElement | null>(null)
const heroSub = ref<HTMLElement | null>(null)
const heroSection = ref<HTMLElement | null>(null)
const sec1h = ref<HTMLElement | null>(null)
const sec2h = ref<HTMLElement | null>(null)
const feat1 = ref<HTMLElement | null>(null)

// Hero h1 has <br /> only — safe for word split
useSplitReveal(heroTitle, { type: 'words', stagger: 0.1, y: 30, duration: 0.9, ease: 'back.out(1.7)', delay: 0.2 })
useClipReveal(heroSub, { direction: 'up', duration: 1.0, delay: 0.6 })
useMagneticAll(heroSection, 'a, button', { strength: 0.4, returnDuration: 500 })
useGradientSweep(sec1h, { color: '#a855f7', duration: 1200 })
useGradientSweep(sec2h, { color: '#ec4899', duration: 1200 })
useHoverScramble(feat1, 'clean')

const embedCode = `<script src="https://widget.prodigy.demo/embed.js"><\/script>
<div
  id="prodigy-widget"
  data-b2b-client="acme_001"
></div>`

const activeTab = ref<'builders' | 'compliance'>('builders')

/* ── Transaction steps ──────────────────────────────────────────── */
const transactionSteps = [
  {
    title: 'Widget loads',
    desc: 'Your app serves one script tag. The widget initialises, fetches live rates, and displays them within 200ms. No CDN required.',
  },
  {
    title: 'User enters amount',
    desc: 'The widget shows the send amount, receive amount, and every fee — before the user has confirmed anything. This is the whole point.',
  },
  {
    title: 'User presses Confirm',
    desc: 'The fee breakdown is shown one more time. Still no surprises. The user sees exactly what they approved.',
  },
  {
    title: 'KYC runs',
    desc: 'Identity check happens inside the widget, invisibly to the user if they\'ve already passed. First-time users see a 47-second flow. Status updates live.',
  },
  {
    title: 'Risk assessed',
    desc: '12 automated checks: counterparty screening, velocity monitoring, pattern analysis. Manual override available in the admin console.',
  },
  {
    title: 'Transaction executes',
    desc: 'Ledger updated. Partner share allocated. Admin console notified. All of this before the confirmation screen clears.',
  },
  {
    title: 'Partner earns',
    desc: 'Revenue posts to the partner portal immediately. Visible to the operations team. No CSV. No month-end batch. No ambiguity.',
  },
]

/* ── Trust items ────────────────────────────────────────────────── */
const trustItems = [
  {
    title: 'Pre-confirm fee disclosure',
    desc: 'Every fee visible to the user before they touch the confirm button. MIFID-aligned. Screenshot-able. The compliance team\'s favourite feature.',
    iconPath: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  },
  {
    title: 'Built-in KYC',
    desc: 'Identity verification runs inside the widget. Your platform never touches raw identity data. We hold nothing we don\'t need, for as long as we need it.',
    iconPath: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>',
  },
  {
    title: 'Immutable audit trail',
    desc: 'Every transaction, every KYC decision, every risk flag is logged with timestamp and outcome. Exportable. Queryable. Ready for your regulator.',
    iconPath: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
  },
  {
    title: 'Risk monitoring',
    desc: 'Automated counterparty checks and velocity alerts. Manual review queue when the algorithm needs human judgment.',
    iconPath: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  },
  {
    title: 'Role-based admin access',
    desc: 'Your operations team sees everything. Your partner sees only their data. Your compliance officer gets the export. No shared spreadsheets.',
    iconPath: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  },
  {
    title: 'GDPR-aware data handling',
    desc: 'We collect what we need, retain it as long as required, and nothing beyond that. Data processing agreements available.',
    iconPath: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  },
]

/* ── Step scroll-reveal ─────────────────────────────────────────── */
const visibleSteps = ref<Set<number>>(new Set())
const stepRefs: (HTMLElement | null)[] = []
let stepObserver: IntersectionObserver | null = null

function setStepRef(el: Element | null, idx: number) {
  stepRefs[idx] = el as HTMLElement | null
}

/* ── Metric counter animation ───────────────────────────────────── */
interface MetricStat {
  prefix: string
  numericTarget: number
  suffix: string
  display: string
  label: string
  context: string
}

const metricStats: MetricStat[] = [
  { prefix: '€', numericTarget: 2.4, suffix: 'B', display: '2.4B', label: 'Volume Processed', context: 'Total transaction volume through the demo environment' },
  { prefix: '', numericTarget: 99.97, suffix: '%', display: '99.97%', label: 'Uptime SLA', context: 'Or we talk about it in the incident post-mortem' },
  { prefix: '<', numericTarget: 200, suffix: 'ms', display: '200ms', label: 'Quote Latency', context: 'From widget load to live rate display, p99' },
  { prefix: '', numericTarget: 247, suffix: '', display: '247', label: 'Partner Integrations', context: 'Teams who stopped building this themselves' },
]

const metricDisplayValues = ref<string[]>(metricStats.map(() => '0'))
const metricRefs: (HTMLElement | null)[] = []
const metricAnimated = ref<boolean[]>(metricStats.map(() => false))
let metricObserver: IntersectionObserver | null = null
const rafIds: number[] = []

function setMetricRef(el: Element | null, idx: number) {
  metricRefs[idx] = el as HTMLElement | null
}

function animateMetric(idx: number) {
  const stat = metricStats[idx]
  if (!stat) return
  // Capture in non-nullable local so the closure can access it without TS narrowing issues
  const s = stat
  const duration = 1400
  const start = performance.now()

  function tick(now: number) {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    // ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3)
    const current = s.numericTarget * eased

    if (s.numericTarget === 2.4) {
      metricDisplayValues.value[idx] = current.toFixed(1)
    } else if (s.numericTarget === 99.97) {
      metricDisplayValues.value[idx] = current.toFixed(2)
    } else {
      metricDisplayValues.value[idx] = Math.round(current).toString()
    }

    if (progress < 1) {
      rafIds[idx] = requestAnimationFrame(tick)
    } else {
      // Set final value
      if (s.numericTarget === 2.4) {
        metricDisplayValues.value[idx] = '2.4'
      } else if (s.numericTarget === 99.97) {
        metricDisplayValues.value[idx] = '99.97'
      } else {
        metricDisplayValues.value[idx] = s.numericTarget.toString()
      }
    }
  }

  rafIds[idx] = requestAnimationFrame(tick)
}

onMounted(() => {
  // Step reveal observer
  stepObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const idx = stepRefs.indexOf(entry.target as HTMLElement)
        if (entry.isIntersecting && idx !== -1) {
          visibleSteps.value = new Set([...visibleSteps.value, idx])
        }
      })
    },
    { threshold: 0.15 },
  )
  stepRefs.forEach((el) => {
    if (el) stepObserver!.observe(el)
  })

  // Metric counter observer
  metricObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const idx = metricRefs.indexOf(entry.target as HTMLElement)
        if (entry.isIntersecting && idx !== -1 && !metricAnimated.value[idx]) {
          metricAnimated.value[idx] = true
          animateMetric(idx)
          metricObserver!.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.3 },
  )
  metricRefs.forEach((el) => {
    if (el) metricObserver!.observe(el)
  })

  activityTimer = setInterval(() => {
    const next = allActivity[activityIdx.value % allActivity.length]!
    visibleActivity.value = [{ ...next, id: Date.now(), time: 'just now' }, ...visibleActivity.value.slice(0, 3)]
    activityIdx.value++
  }, 3500)
})

onUnmounted(() => {
  stepObserver?.disconnect()
  metricObserver?.disconnect()
  rafIds.forEach((id) => cancelAnimationFrame(id))
  clearInterval(activityTimer)
})
</script>

<style scoped>
/* ── CSS variables ──────────────────────────────────────────────── */
.hero,
.partners-strip,
.why-section,
.how-section,
.stepper-section,
.trust-section,
.metrics-section,
.cta-section {
  --violet: #7c3aed;
  --purple: #9333ea;
  --pink: #ec4899;
  --lavender: #a78bfa;
  --teal: #14b8a6;
  --green: #22c55e;
  --red: #ef4444;
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
  --grad-hero: linear-gradient(135deg, #7c3aed 0%, #9333ea 35%, #ec4899 70%, #f59e0b 100%);
  --grad-soft: linear-gradient(160deg, #f3f0ff 0%, #fce7f3 50%, #ecfdf5 100%);
}

/* ── Shared button styles ───────────────────────────────────────── */
.btn-primary-white {
  display: inline-flex;
  align-items: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 0.9375rem;
  color: #7c3aed;
  background: #ffffff;
  border-radius: 100px;
  padding: 0.875rem 2rem;
  border: none;
  text-decoration: none;
  transition: opacity 0.15s, transform 0.15s;
  white-space: nowrap;
}

.btn-primary-white:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 600;
  font-size: 0.9375rem;
  color: #ffffff;
  background: transparent;
  border-radius: 100px;
  padding: 0.875rem 2rem;
  border: 2px solid rgba(255, 255, 255, 0.5);
  text-decoration: none;
  transition: border-color 0.15s, background 0.15s;
  white-space: nowrap;
}

.btn-ghost:hover {
  border-color: rgba(255, 255, 255, 0.9);
  background: rgba(255, 255, 255, 0.1);
}

/* ── Hero ───────────────────────────────────────────────────────── */
.hero {
  position: relative;
  background: var(--grad-hero);
  overflow: hidden;
  min-height: 620px;
  display: flex;
  align-items: center;
}

.mesh-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  pointer-events: none;
}

.mesh-blob-1 {
  width: 400px;
  height: 400px;
  background: #7c3aed;
  top: -100px;
  left: -100px;
}

.mesh-blob-2 {
  width: 300px;
  height: 300px;
  background: #ec4899;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}

.mesh-blob-3 {
  width: 250px;
  height: 250px;
  background: #f59e0b;
  bottom: -80px;
  left: 40%;
}

.hero-inner {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 5rem 1.5rem;
  display: grid;
  grid-template-columns: 55fr 45fr;
  gap: 3rem;
  align-items: center;
  width: 100%;
}

.hero-left {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.eyebrow-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  background: rgba(255, 255, 255, 0.95);
  color: #7c3aed;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.8125rem;
  font-weight: 600;
  border-radius: 100px;
  padding: 0.375rem 1rem;
  width: fit-content;
}

.hero-h1 {
  font-family: 'Syne', sans-serif;
  font-size: clamp(2.75rem, 6vw, 4.5rem);
  font-weight: 800;
  color: #ffffff;
  line-height: 1.05;
  margin: 0;
}

.hero-sub {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.85);
  max-width: 44ch;
  line-height: 1.65;
  margin: 0;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.social-proof {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  flex-wrap: wrap;
}

.avatar-row {
  display: flex;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1));
  border: 2px solid rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.6875rem;
  font-weight: 700;
  color: white;
  margin-right: -8px;
}

.avatar:last-child {
  margin-right: 0;
  background: rgba(255, 255, 255, 0.25);
}

.social-proof-text {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

/* ── Hero right: floating cards ─────────────────────────────────── */
.hero-right {
  display: flex;
  justify-content: center;
  align-items: center;
}

.cards-cluster {
  position: relative;
  width: 340px;
  height: 420px;
  flex-shrink: 0;
}

.float-card {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  padding: 1rem 1.25rem;
  position: absolute;
}

.wallet-card {
  width: 240px;
  top: 20px;
  left: 30px;
  transform: rotate(-2deg);
  z-index: 3;
}

.card-label {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  color: #8b89b0;
  margin: 0 0 0.25rem;
}

.wallet-amount {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  color: #0f0e1a;
  margin: 0 0 0.75rem;
}

.currency {
  font-size: 0.875rem;
  font-weight: 600;
  color: #7c3aed;
}

.balance-bar {
  height: 6px;
  background: rgba(124, 58, 237, 0.15);
  border-radius: 100px;
  overflow: hidden;
  margin-bottom: 0.375rem;
}

.balance-fill {
  height: 100%;
  width: 73%;
  background: linear-gradient(90deg, #7c3aed, #a78bfa);
  border-radius: 100px;
}

.balance-note {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.75rem;
  color: #8b89b0;
  margin: 0;
}

.mini-card {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 0.625rem;
  border-radius: 16px;
  padding: 0.75rem 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.income-card {
  background: #22c55e;
  color: white;
  bottom: 140px;
  right: 0;
  transform: rotate(3deg);
  z-index: 4;
  min-width: 140px;
}

.outcome-card {
  background: #ef4444;
  color: white;
  bottom: 60px;
  right: 10px;
  transform: rotate(-1deg);
  z-index: 4;
  min-width: 140px;
}

.mini-arrow {
  font-size: 1.125rem;
  font-weight: 700;
  opacity: 0.9;
}

.mini-label {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  opacity: 0.85;
  margin: 0;
}

.mini-amount {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.9375rem;
  font-weight: 700;
  margin: 0;
}

.suggestions-card {
  width: 230px;
  bottom: 0;
  left: 10px;
  transform: rotate(2deg);
  z-index: 2;
}

.suggestions-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.suggestions-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.8125rem;
  font-weight: 700;
  color: #0f0e1a;
  margin: 0;
}

.toggle-pill {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  color: #7c3aed;
  background: rgba(124, 58, 237, 0.1);
  padding: 0.125rem 0.625rem;
  border-radius: 100px;
}

.suggestions-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3125rem;
}

.suggestions-list li {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.75rem;
  color: #4b4a6e;
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.sug-icon {
  color: #7c3aed;
  font-size: 0.625rem;
}

/* ── Partners strip ─────────────────────────────────────────────── */
.partners-strip {
  background: #ffffff;
  padding: 2.5rem 1.5rem;
  text-align: center;
}

.partners-label {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: #8b89b0;
  margin: 0 0 1.25rem;
}

.partner-badges {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.partner-badge {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: #4b4a6e;
  padding: 0.5rem 1.25rem;
  border-radius: 100px;
  border: 1.5px solid transparent;
  background:
    linear-gradient(#ffffff, #ffffff) padding-box,
    linear-gradient(135deg, #7c3aed, #ec4899) border-box;
}

/* ── Why section ────────────────────────────────────────────────── */
.why-section {
  background: var(--grad-soft);
  padding: 5rem 1.5rem;
}

.why-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.why-h2 {
  font-family: 'Syne', sans-serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: #0f0e1a;
  line-height: 1.15;
  margin: 0 0 2rem;
  text-align: center;
}

.why-tabs {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 3rem;
}

.tab-pill {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: #4b4a6e;
  background: rgba(255, 255, 255, 0.7);
  border: 1.5px solid rgba(124, 58, 237, 0.2);
  border-radius: 100px;
  padding: 0.5rem 1.25rem;
  cursor: pointer;
  transition: all 0.15s;
}

.tab-pill.active {
  color: #ffffff;
  background: #7c3aed;
  border-color: #7c3aed;
}

.tab-pill:hover:not(.active) {
  border-color: #7c3aed;
  color: #7c3aed;
}

.why-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.feature-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.feature-row {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.feature-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #7c3aed, #ec4899);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.feature-icon--teal {
  background: linear-gradient(135deg, #14b8a6, #22c55e);
}

.feature-text {
  flex: 1;
}

.feature-name {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.0625rem;
  font-weight: 600;
  color: #0f0e1a;
  margin: 0 0 0.25rem;
}

.feature-desc {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.875rem;
  color: #4b4a6e;
  line-height: 1.6;
  margin: 0;
}

/* KYC mockup card */
.kyc-mockup {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.kyc-card {
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 8px 40px rgba(124, 58, 237, 0.12);
  padding: 1.5rem;
  max-width: 340px;
  width: 100%;
  border: 1px solid rgba(124, 58, 237, 0.08);
}

.kyc-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.kyc-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #f3f0ff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.kyc-user {
  flex: 1;
}

.kyc-name {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.9375rem;
  font-weight: 700;
  color: #0f0e1a;
  margin: 0;
}

.kyc-id {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.75rem;
  color: #8b89b0;
  margin: 0;
}

.kyc-badge {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  color: #22c55e;
  background: rgba(34, 197, 94, 0.1);
  padding: 0.25rem 0.625rem;
  border-radius: 100px;
  letter-spacing: 0.04em;
}

.kyc-rows {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid rgba(124, 58, 237, 0.1);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.kyc-row {
  display: flex;
  justify-content: space-between;
  padding: 0.625rem 0.875rem;
  border-bottom: 1px solid rgba(124, 58, 237, 0.08);
}

.kyc-row:last-child {
  border-bottom: none;
}

.kyc-key {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.8125rem;
  color: #8b89b0;
  font-weight: 500;
}

.kyc-val {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.8125rem;
  color: #0f0e1a;
  font-weight: 600;
}

.kyc-val--green {
  color: #22c55e;
}

.kyc-status-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(34, 197, 94, 0.08);
  border-radius: 10px;
  padding: 0.625rem 0.875rem;
}

.kyc-status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  flex-shrink: 0;
}

.kyc-status-text {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.8125rem;
  color: #22c55e;
  font-weight: 600;
}

/* ── How section ────────────────────────────────────────────────── */
.how-section {
  background: #ffffff;
  padding: 5rem 1.5rem;
}

.how-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.how-h2 {
  font-family: 'Syne', sans-serif;
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 700;
  color: #0f0e1a;
  text-align: center;
  margin: 0 0 3rem;
}

.how-h2 em {
  font-style: italic;
  color: #7c3aed;
}

.steps-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.step-card {
  background: rgba(255, 255, 255, 0.92);
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(124, 58, 237, 0.08);
  padding: 1.75rem;
  border: 1px solid rgba(124, 58, 237, 0.1);
  border-top: 3px solid transparent;
  background-image:
    linear-gradient(#ffffff, #ffffff),
    linear-gradient(135deg, #7c3aed, #ec4899);
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.step-icon {
  font-size: 2rem;
  line-height: 1;
}

.step-number {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #a78bfa;
  margin: 0;
}

.step-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  color: #0f0e1a;
  margin: 0;
}

.step-desc {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.875rem;
  color: #4b4a6e;
  line-height: 1.65;
  margin: 0;
  flex: 1;
}

.step-link {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: #7c3aed;
  text-decoration: none;
  margin-top: auto;
  transition: opacity 0.15s;
}

.step-link:hover {
  opacity: 0.75;
}

/* ── Testimonials ───────────────────────────────────────────────── */
.grad-testimonials {
  background: #0f0a1e;
  padding: 5rem 1.5rem;
}

.grad-testimonials-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.grad-testimonials-h2 {
  font-family: 'Syne', sans-serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: #ffffff;
  line-height: 1.15;
  margin: 0 0 3rem;
  text-align: center;
}

.grad-testimonials-row {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 0.5rem;
}

.t-card {
  backdrop-filter: blur(16px);
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  min-width: clamp(260px, 30vw, 380px);
  flex: 1;
  scroll-snap-align: start;
}

.t-quote {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  font-style: italic;
  line-height: 1.7;
  color: rgba(255,255,255,0.85);
  margin: 0;
  flex: 1;
}

.t-author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.t-avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: linear-gradient(135deg,#a855f7,#ec4899);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
}

.t-name {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.8125rem;
  color: rgba(255,255,255,0.6);
  line-height: 1.4;
}

/* ── Embed section ──────────────────────────────────────────────── */
.grad-embed-section {
  background: #0f0a1e;
  padding: 5rem 1.5rem;
  border-top: 1px solid rgba(124, 58, 237, 0.15);
}

.grad-embed-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.grad-embed-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.grad-embed-left {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.grad-embed-h2 {
  font-family: 'Syne', sans-serif;
  font-size: clamp(1.75rem, 3.5vw, 2.75rem);
  font-weight: 800;
  color: #ffffff;
  line-height: 1.15;
  margin: 0;
}

.grad-embed-gradient {
  background: linear-gradient(135deg, #a78bfa, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.grad-embed-sub {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  color: rgba(255,255,255,0.7);
  line-height: 1.65;
  margin: 0;
  max-width: 40ch;
}

.grad-embed-link {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.9375rem;
  font-weight: 700;
  color: #a78bfa;
  text-decoration: none;
  align-self: flex-start;
  transition: opacity 0.15s;
}

.grad-embed-link:hover {
  opacity: 0.75;
}

@media (max-width: 768px) {
  .grad-embed-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

/* ── CTA section ────────────────────────────────────────────────── */
.cta-section {
  position: relative;
  background: var(--grad-hero);
  overflow: hidden;
  padding: 6rem 1.5rem;
  text-align: center;
}

.cta-blob-1 {
  width: 500px;
  height: 500px;
  background: #7c3aed;
  top: -200px;
  left: -150px;
}

.cta-blob-2 {
  width: 400px;
  height: 400px;
  background: #ec4899;
  bottom: -150px;
  right: -100px;
}

.cta-inner {
  position: relative;
  z-index: 1;
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.cta-h2 {
  font-family: 'Syne', sans-serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  color: #ffffff;
  line-height: 1.1;
  margin: 0;
}

.cta-sub {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 50ch;
  line-height: 1.65;
  margin: 0;
}

.cta-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.cta-hint {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}

/* ── Stepper section ────────────────────────────────────────────── */
.stepper-section {
  background: #ffffff;
  padding: 5rem 1.5rem;
}

.stepper-inner {
  max-width: 780px;
  margin: 0 auto;
}

.eyebrow-label {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #7c3aed;
  margin: 0 0 0.75rem;
  text-align: center;
}

.eyebrow-label--light {
  color: rgba(255, 255, 255, 0.65);
}

.stepper-h2 {
  font-family: 'Syne', sans-serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: #0f0e1a;
  line-height: 1.15;
  margin: 0 0 1rem;
  text-align: center;
}

.stepper-sub {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  color: #4b4a6e;
  line-height: 1.65;
  text-align: center;
  max-width: 56ch;
  margin: 0 auto 3rem;
}

.step-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.step-item {
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(124, 58, 237, 0.07);
  border: 1px solid rgba(124, 58, 237, 0.09);
  padding: 1.5rem;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.step-item.step-visible {
  opacity: 1;
  transform: none;
}

.step-num-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7c3aed, #ec4899);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.9375rem;
  font-weight: 800;
  color: #ffffff;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-item-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #0f0e1a;
  margin: 0 0 0.375rem;
}

.step-item-desc {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.875rem;
  color: #4b4a6e;
  line-height: 1.65;
  margin: 0;
}

/* ── Trust section ──────────────────────────────────────────────── */
.trust-section {
  background: linear-gradient(160deg, #f3f0ff 0%, #fce7f3 50%, #ecfdf5 100%);
  padding: 5rem 1.5rem;
}

.trust-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.trust-h2 {
  font-family: 'Syne', sans-serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: #0f0e1a;
  line-height: 1.15;
  margin: 0 0 1rem;
  text-align: center;
}

.trust-sub {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  color: #4b4a6e;
  line-height: 1.65;
  text-align: center;
  margin: 0 auto 3rem;
  max-width: 60ch;
}

.trust-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.trust-card {
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(124, 58, 237, 0.07);
  border: 1px solid rgba(124, 58, 237, 0.09);
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.trust-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: linear-gradient(135deg, #7c3aed, #ec4899);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.trust-item-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.0625rem;
  font-weight: 700;
  color: #0f0e1a;
  margin: 0;
}

.trust-item-desc {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.875rem;
  color: #4b4a6e;
  line-height: 1.65;
  margin: 0;
}

/* ── Metrics section ────────────────────────────────────────────── */
.metrics-section {
  background: linear-gradient(135deg, #7c3aed 0%, #9333ea 35%, #ec4899 70%, #f59e0b 100%);
  padding: 5rem 1.5rem;
}

.metrics-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.metrics-h2 {
  font-family: 'Syne', sans-serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 1rem;
  text-align: center;
}

.metrics-sub {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.65;
  text-align: center;
  margin: 0 auto 3rem;
  max-width: 56ch;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

.metric-card {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.metric-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.metric-value {
  font-family: 'Syne', sans-serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  background: linear-gradient(135deg, #7c3aed, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.trend-badge {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.8125rem;
  font-weight: 700;
  color: #22c55e;
  background: rgba(34, 197, 94, 0.12);
  border: 1px solid rgba(34, 197, 94, 0.25);
  border-radius: 100px;
  padding: 0.25rem 0.75rem;
  white-space: nowrap;
  flex-shrink: 0;
  margin-top: 0.5rem;
}

.metric-label {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #0f0e1a;
  margin: 0;
}

.metric-context {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.875rem;
  color: #4b4a6e;
  line-height: 1.55;
  margin: 0;
}

/* ── Live toast anchor ──────────────────────────────────────────── */
.grad-toast-anchor {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  z-index: 10;
}

/* ── Trust section ──────────────────────────────────────────────── */
.grad-trust-section {
  background: #0f0a1e;
  padding: 3rem 1.5rem;
}

.grad-trust-wrapper {
  max-width: 1280px;
  margin: 0 auto;
}

.grad-trust-wrapper :deep(.trust-strip) {
  filter: invert(1) brightness(2);
}

/* ── Gradient Counter Stats ─────────────────────────────────────── */
.grad-stats-section {
  background: linear-gradient(135deg, #1a0533 0%, #2d1057 50%, #1a0d3b 100%);
  padding: 4rem 1.5rem;
  border-top: 1px solid rgba(124, 58, 237, 0.2);
}

.grad-stats-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.grad-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

.grad-stat-item {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  backdrop-filter: blur(8px);
  transition: background 0.2s, border-color 0.2s;
}

.grad-stat-item:hover {
  background: rgba(255, 255, 255, 0.09);
  border-color: rgba(167, 139, 250, 0.4);
}

.grad-stat-item :deep(.stat-display) {
  font-family: 'Syne', sans-serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  background: linear-gradient(135deg, #a78bfa, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
}

.grad-stat-item :deep(.stat-label) {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.65);
  opacity: 1;
}

/* ── Payment Flow Section ───────────────────────────────────────── */
.grad-flow-section {
  background: #0f0a1e;
  padding: 5rem 1.5rem;
  border-top: 1px solid rgba(124, 58, 237, 0.15);
}

.grad-flow-inner {
  max-width: 860px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.grad-flow-h2 {
  font-family: 'Syne', sans-serif;
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 700;
  color: #ffffff;
  text-align: center;
  margin: 0;
  line-height: 1.15;
}

/* ── Responsive ─────────────────────────────────────────────────── */
@media (max-width: 1024px) {
  .hero-inner {
    grid-template-columns: 1fr;
  }

  .hero-right {
    display: none;
  }

  .why-grid {
    grid-template-columns: 1fr;
  }

  .steps-row {
    grid-template-columns: 1fr;
  }

  .trust-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .metrics-grid {
    grid-template-columns: 1fr;
  }

  .grad-stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .hero {
    min-height: auto;
  }

  .grad-stats-grid {
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }

  .hero-inner {
    padding: 3rem 1.25rem;
  }

  .hero-actions {
    flex-direction: column;
  }

  .btn-primary-white,
  .btn-ghost {
    width: 100%;
    justify-content: center;
  }

  .cta-actions {
    flex-direction: column;
    width: 100%;
  }

  .why-tabs {
    flex-wrap: wrap;
  }

  .trust-grid {
    grid-template-columns: 1fr;
  }

  .metrics-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 375px) {
  .grad-stats-grid {
    grid-template-columns: 1fr;
  }

  .grad-toast-anchor {
    display: none;
  }

  .why-section {
    padding: 3rem 1rem;
  }
}

/* ── Widget Preview Section ── */
.grad-widget-preview-section {
  padding: 5rem 0;
  background: rgba(255, 255, 255, 0.02);
}
.grad-widget-preview-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 4rem;
  align-items: center;
}
.grad-widget-preview-text h2 { margin-bottom: 1rem; }
.grad-widget-preview-sub {
  font-size: 1.0625rem;
  line-height: 1.65;
  max-width: 42ch;
  margin: 0;
  opacity: 0.8;
}
@media (max-width: 768px) {
  .grad-widget-preview-inner { grid-template-columns: 1fr; }
}

/* ── Gradient Partners Say ── */
.grad-partners-say {
  padding: clamp(4rem, 8vw, 6rem) 0;
}
.grad-partners-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 2rem);
}
.grad-partners-eyebrow {
  font-size: 0.8125rem;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.45);
  margin: 0 0 0.5rem;
  text-align: center;
}
.grad-partners-h2 {
  font-size: clamp(1.75rem, 3.5vw, 2.75rem);
  font-weight: 700;
  text-align: center;
  margin: 0 0 2.5rem;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.grad-partners-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(1rem, 2vw, 1.5rem);
}
.grad-partner-card {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(168, 85, 247, 0.2);
  border-radius: 16px;
  padding: 1.75rem 1.5rem 1.5rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
.grad-partner-quote {
  font-size: 0.9375rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  flex: 1;
}
.grad-partner-attr {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}
.grad-partner-role {
  font-size: 0.8125rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
}
.grad-partner-company {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.45);
}
.grad-partner-badge {
  display: inline-block;
  align-self: flex-start;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.75rem;
  border-radius: 99px;
  letter-spacing: 0.03em;
}
@media (max-width: 768px) {
  .grad-partners-grid { grid-template-columns: 1fr; }
}

/* ── Feature Marquee Strip ── */
.marquee-wrap {
  overflow: hidden;
  border-top: 1px solid rgba(124, 58, 237, 0.15);
  border-bottom: 1px solid rgba(124, 58, 237, 0.15);
  padding: 0.875rem 0;
  background: var(--bg);
}
.marquee-track {
  display: flex;
  gap: 1.5rem;
  width: max-content;
  animation: marquee-scroll 40s linear infinite;
}
.marquee-pill {
  white-space: nowrap;
  font-size: 0.8125rem;
  font-weight: 500;
  padding: 0.375rem 0.875rem;
  border-radius: 99px;
  border: 1px solid rgba(168,85,247,0.2);
  background: rgba(168,85,247,0.08);
  color: rgba(255,255,255,0.8);
  font-family: 'Inter', sans-serif;
}
@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@media (prefers-reduced-motion: reduce) {
  .marquee-track { animation: none; }
}

/* ── Live Activity Feed ── */
.activity-feed {
  max-width: 360px;
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid rgba(124, 58, 237, 0.2);
  border-radius: 12px;
  background: rgba(124, 58, 237, 0.06);
}
.activity-header { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; }
.activity-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: #a855f7;
  animation: act-pulse 1.5s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes act-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.8)} }
.activity-label { font-size: 0.75rem; font-weight: 600; color: #a855f7; text-transform: uppercase; letter-spacing: 0.06em; }
.activity-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem; position: relative; min-height: 6rem; }
.activity-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.8125rem; }
.activity-flag { font-size: 1rem; flex-shrink: 0; }
.activity-text { color: var(--ink-mid); flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.activity-time { font-size: 0.6875rem; color: var(--ink-muted); white-space: nowrap; flex-shrink: 0; }
.activity-disclaimer { font-size: 0.6875rem; color: var(--ink-muted); margin-top: 0.5rem; font-style: italic; }
.activity-slide-enter-active { transition: all 0.4s ease; }
.activity-slide-enter-from { opacity: 0; transform: translateY(-8px); }
.activity-slide-leave-active { transition: all 0.3s ease; position: absolute; }
.activity-slide-leave-to { opacity: 0; transform: translateY(8px); }
</style>
