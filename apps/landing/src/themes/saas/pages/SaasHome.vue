<template>
  <main class="sh-home">

    <!-- ═══ Section 1: Hero ═══════════════════════════════════════════ -->
    <section class="sh-hero" aria-labelledby="sh-hero-heading">
      <SaasVantaHalo />
      <div class="sh-hero-inner">

        <!-- Left column -->
        <div class="sh-hero-left">
          <div class="sh-eyebrow" aria-label="Five-star reviewed">
            <span class="sh-stars" aria-hidden="true">★★★★★</span>
            5-Star Reviewed by enterprise builders
          </div>

          <h1 id="sh-hero-heading" class="sh-h1" ref="heroTitle">
            Crypto That<br>
            <span class="sh-accent-text">Explains Itself.</span>
          </h1>

          <p class="sh-sub" ref="heroSub">
            Give your platform crypto in an afternoon. Transparent fees, built-in KYC, and a dashboard that shows exactly what happened — so your compliance team stops asking questions.
          </p>

          <!-- Email row -->
          <form class="sh-email-row" @submit.prevent="handleEmailSubmit" novalidate>
            <input
              v-model="email"
              type="email"
              class="sh-email-input"
              placeholder="your work email"
              aria-label="Work email address"
              autocomplete="email"
            />
            <button type="submit" class="sh-email-btn">Get Started Free</button>
          </form>

          <!-- Microcopy -->
          <div class="sh-microcopy" aria-label="Benefits">
            <span class="sh-micro-item">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="7" stroke="#4f46e5" stroke-width="1.5"/>
                <path d="M5 8l2 2 4-4" stroke="#4f46e5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              No credit card required
            </span>
            <span class="sh-micro-item">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="7" stroke="#4f46e5" stroke-width="1.5"/>
                <path d="M5 8l2 2 4-4" stroke="#4f46e5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Instant setup
            </span>
            <span class="sh-micro-item">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="7" stroke="#4f46e5" stroke-width="1.5"/>
                <path d="M5 8l2 2 4-4" stroke="#4f46e5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Free demo environment
            </span>
          </div>

          <a
            href="http://localhost:5001"
            target="_blank"
            rel="noopener noreferrer"
            class="sh-demo-link"
            ref="ctaBtn"
          >Get a live demo →</a>
        </div>

        <!-- Right column: CSS browser mockup -->
        <div class="sh-hero-right" aria-hidden="true">
          <div class="sh-browser">
            <div class="sh-browser-bar">
              <span class="sh-dot sh-dot--red" />
              <span class="sh-dot sh-dot--yellow" />
              <span class="sh-dot sh-dot--green" />
              <div class="sh-url-bar">app.prodigy.demo/dashboard</div>
            </div>
            <div class="sh-browser-content">
              <div class="sh-sidebar">
                <div class="sh-sidebar-item sh-sidebar-item--active" />
                <div class="sh-sidebar-item" />
                <div class="sh-sidebar-item" />
                <div class="sh-sidebar-item" />
                <div class="sh-sidebar-item" />
              </div>
              <div class="sh-dashboard">
                <!-- Stat cards -->
                <div class="sh-stat-cards">
                  <div class="sh-stat-card">
                    <div class="sh-stat-label">VOLUME TODAY</div>
                    <div class="sh-stat-value">$2.4B</div>
                    <div class="sh-stat-delta sh-delta-up">↑12.4%</div>
                  </div>
                  <div class="sh-stat-card">
                    <div class="sh-stat-label">ACTIVE CLIENTS</div>
                    <div class="sh-stat-value">847</div>
                    <div class="sh-stat-delta sh-delta-up">↑3 this week</div>
                  </div>
                  <div class="sh-stat-card">
                    <div class="sh-stat-label">SETTLEMENTS</div>
                    <div class="sh-stat-value">99.9%</div>
                    <div class="sh-stat-delta">All systems settled</div>
                  </div>
                </div>
                <!-- Mini table -->
                <div class="sh-mini-table">
                  <div class="sh-mini-table-head">
                    <span>Partner</span><span>Amount</span><span>Status</span>
                  </div>
                  <div class="sh-mini-row">
                    <span>NeoBank</span><span>$48,200</span>
                    <span class="sh-badge-green">Settled</span>
                  </div>
                  <div class="sh-mini-row">
                    <span>CryptoEx</span><span>$31,750</span>
                    <span class="sh-badge-green">Settled</span>
                  </div>
                  <div class="sh-mini-row">
                    <span>WalletApp</span><span>$19,400</span>
                    <span class="sh-badge-green">Settled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Partner strip -->
      <div class="sh-partner-strip" aria-label="Trusted by">
        <span class="sh-partner-label">Trusted by builders at →</span>
        <div class="sh-partner-logos">
          <span class="sh-partner-name">FinCo</span>
          <span class="sh-partner-dot" aria-hidden="true">·</span>
          <span class="sh-partner-name">NeoBank</span>
          <span class="sh-partner-dot" aria-hidden="true">·</span>
          <span class="sh-partner-name">CryptoEx</span>
          <span class="sh-partner-dot" aria-hidden="true">·</span>
          <span class="sh-partner-name">PayPlatform</span>
          <span class="sh-partner-dot" aria-hidden="true">·</span>
          <span class="sh-partner-name">WalletApp</span>
        </div>
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

    <!-- ═══ Section 1b: Counter Stats Row ══════════════════════════════ -->
    <section class="sh-stats-row-section" aria-label="Key metrics">
      <div class="sh-section-inner">
        <div class="sh-stats-row">
          <div class="sh-stats-row-item">
            <CounterStat :value="99.99" suffix="%" label="Uptime SLA" />
          </div>
          <div class="sh-stats-row-item">
            <CounterStat :value="2" suffix="s" label="Settlement Time" />
          </div>
          <div class="sh-stats-row-item">
            <CounterStat :value="200" suffix="+" label="Companies" />
          </div>
          <div class="sh-stats-row-item">
            <CounterStat :value="0.03" suffix="%" label="Fee" />
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Section 2: Feature Tabs ═══════════════════════════════════ -->
    <section class="sh-tabs-section" aria-labelledby="sh-tabs-heading">
      <div class="sh-section-inner">
        <h2 id="sh-tabs-heading" class="sh-section-heading" ref="sec1h" data-grad-sweep>
          Simplify Crypto Dev <span class="sh-accent-text">Like Never Before</span>
        </h2>

        <!-- Tab bar -->
        <div class="sh-tab-bar" role="tablist" aria-label="Feature categories">
          <button
            v-for="(tab, i) in tabs"
            :key="tab.id"
            class="sh-tab"
            :class="{ active: activeTab === i }"
            @click="activeTab = i"
            role="tab"
            :aria-selected="activeTab === i"
            :id="`tab-${tab.id}`"
            :aria-controls="`tabpanel-${tab.id}`"
          >{{ tab.label }}</button>
        </div>

        <!-- Tab panels -->
        <div
          v-for="(tab, i) in tabs"
          :key="tab.id"
          class="sh-tab-panel"
          :class="{ active: activeTab === i }"
          role="tabpanel"
          :id="`tabpanel-${tab.id}`"
          :aria-labelledby="`tab-${tab.id}`"
          :hidden="activeTab !== i"
        >
          <div class="sh-tab-content">
            <div class="sh-tab-left">
              <h3 class="sh-tab-feature-title">{{ tab.title }}</h3>
              <p class="sh-tab-feature-desc">{{ tab.desc }}</p>
              <ul class="sh-tab-bullets" role="list">
                <li v-for="bullet in tab.bullets" :key="bullet" class="sh-tab-bullet">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <circle cx="8" cy="8" r="7" fill="#ede9fe"/>
                    <path d="M5 8l2 2 4-4" stroke="#4f46e5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  {{ bullet }}
                </li>
              </ul>
              <a href="#" class="sh-tab-cta">Explore {{ tab.label }} →</a>
            </div>
            <div class="sh-tab-right" aria-hidden="true">
              <div class="sh-mockup-card">
                <div class="sh-mockup-header">
                  <div class="sh-mockup-dot" />
                  <div class="sh-mockup-dot" />
                  <div class="sh-mockup-dot" />
                  <span class="sh-mockup-title">{{ tab.mockupTitle }}</span>
                </div>
                <div class="sh-mockup-body">
                  <div class="sh-mockup-line sh-mockup-line--full" />
                  <div class="sh-mockup-line sh-mockup-line--75 sh-mockup-line--accent" />
                  <div class="sh-mockup-line sh-mockup-line--50" />
                  <div class="sh-mockup-line sh-mockup-line--full" />
                  <div class="sh-mockup-line sh-mockup-line--60 sh-mockup-line--accent" />
                  <div class="sh-mockup-line sh-mockup-line--80" />
                  <div class="sh-mockup-bars">
                    <div class="sh-m-bar" style="height: 40%;" />
                    <div class="sh-m-bar sh-m-bar--accent" style="height: 70%;" />
                    <div class="sh-m-bar" style="height: 55%;" />
                    <div class="sh-m-bar sh-m-bar--accent" style="height: 85%;" />
                    <div class="sh-m-bar" style="height: 60%;" />
                    <div class="sh-m-bar" style="height: 45%;" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Widget Preview Section ═══════════════════════════════════ -->
    <section class="sh-widget-preview-section" data-reveal="fade-up" aria-labelledby="sh-widget-preview-h">
      <div class="sh-widget-preview-inner">
        <div class="sh-widget-preview-text">
          <h2 id="sh-widget-preview-h" class="sh-section-heading" style="text-align:left">See it before you commit.</h2>
          <p class="sh-widget-preview-sub">Live demo, no sign-up. The complete on-ramp widget — exactly what your users will experience.</p>
        </div>
        <WidgetDemo theme="saas" />
      </div>
    </section>

    <!-- ═══ Section 3: Numbered Feature List ═══════════════════════════ -->
    <section class="sh-features-section" aria-labelledby="sh-features-heading">
      <div class="sh-section-inner">
        <div class="sh-features-header">
          <h2 id="sh-features-heading" class="sh-section-heading" ref="sec2h" data-grad-sweep>
            Everything You Need <span class="sh-accent-text">in One Toolkit</span>
          </h2>
          <p class="sh-features-sub">Build faster, deploy smarter, and maintain better</p>
        </div>

        <div class="sh-features-list" role="list">
          <div
            v-for="(feature, i) in features"
            :key="feature.title"
            class="sh-feature-row"
            role="listitem"
          >
            <!-- Number + line -->
            <div class="sh-feature-number-col" aria-hidden="true">
              <div class="sh-feature-number">{{ String(i + 1).padStart(2, '0') }}</div>
              <div v-if="i < features.length - 1" class="sh-feature-line" />
            </div>

            <!-- Text -->
            <div class="sh-feature-text">
              <h3 class="sh-feature-title">{{ feature.title }}</h3>
              <p class="sh-feature-desc">{{ feature.desc }}</p>
            </div>

            <!-- Card mockup -->
            <div class="sh-feature-card" aria-hidden="true">
              <div class="sh-fcard-header">{{ feature.cardLabel }}</div>
              <div class="sh-fcard-body">
                <component :is="feature.cardSlot" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Section 3a: Feature Cards ═══════════════════════════════════ -->
    <section class="sh-feature-cards-section" aria-labelledby="sh-feature-cards-heading">
      <div class="sh-section-inner">
        <h2 id="sh-feature-cards-heading" class="sh-section-heading">
          Core <span class="sh-accent-text">Capabilities</span>
        </h2>
        <div class="sh-fcard-grid">

          <!-- Card 1: KYC -->
          <article class="sh-cap-card">
            <div class="sh-cap-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
            </div>
            <h3 class="sh-cap-title">KYC in seconds</h3>
            <p class="sh-cap-desc">Built-in identity verification that runs invisibly for returning users. First-time users complete in under 60 seconds — no separate flow, no drop-off.</p>
          </article>

          <!-- Card 2: Real-time settlement -->
          <article class="sh-cap-card">
            <div class="sh-cap-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
            <h3 class="sh-cap-title">Real-time settlement</h3>
            <p class="sh-cap-desc">Transactions settle in under 2 seconds. Ledger updated instantly. Every movement is visible in the admin console before the confirmation screen clears.</p>
          </article>

          <!-- Card 3: Partner revenue -->
          <article class="sh-cap-card">
            <div class="sh-cap-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"/>
                <line x1="12" y1="20" x2="12" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
            </div>
            <h3 class="sh-cap-title">Partner revenue</h3>
            <p class="sh-cap-desc">Set your platform fee and partner share in the admin console. Revenue posts to the partner portal per transaction — no spreadsheets, no month-end reconciliation.</p>
          </article>

        </div>
      </div>
    </section>

    <!-- ═══ Section 3b: Testimonials ═══════════════════════════════════ -->
    <section class="sh-testimonials-section" aria-labelledby="sh-testimonials-heading">
      <div class="sh-section-inner">
        <div class="sh-testimonials-header">
          <p class="sh-testimonials-eyebrow">FEEDBACK</p>
          <h2 id="sh-testimonials-heading" class="sh-section-heading">What teams say after shipping it.</h2>
        </div>
        <div class="sh-testimonials-grid">
          <blockquote
            v-for="(q, i) in quotes"
            :key="i"
            class="sh-quote-card"
          >
            <span class="sh-quote-mark" aria-hidden="true">"</span>
            <p class="sh-quote-text">{{ q.text }}</p>
            <footer class="sh-quote-footer">
              <span class="sh-role-badge">{{ q.role }}</span>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>

    <!-- ═══ Section 3c: Product Metrics ═══════════════════════════════ -->
    <section class="sh-metrics-section" aria-labelledby="sh-metrics-heading">
      <div class="sh-section-inner">
        <h2 id="sh-metrics-heading" class="sh-sr-only">Product metrics</h2>
        <div class="sh-metrics-grid">
          <div v-for="m in metrics" :key="m.stat" class="sh-metric-card">
            <div class="sh-metric-accent" aria-hidden="true" />
            <CounterStat
              :value="m.stat"
              :prefix="m.prefix"
              :suffix="m.suffix"
              :label="m.label"
              accent-color="var(--accent)"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Section 4: Compatibility ═══════════════════════════════════ -->
    <section class="sh-compat-section" aria-labelledby="sh-compat-heading">
      <div class="sh-section-inner">
        <h2 id="sh-compat-heading" class="sh-section-heading">
          Compatible with <span class="sh-accent-text">your stack</span>
        </h2>

        <div class="sh-compat-cards">

          <div class="sh-compat-card">
            <div class="sh-compat-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
              </svg>
            </div>
            <span class="sh-compat-label">REST API</span>
          </div>

          <div class="sh-compat-card">
            <div class="sh-compat-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
            <span class="sh-compat-label">Webhooks</span>
          </div>

          <div class="sh-compat-card">
            <div class="sh-compat-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="3"/>
                <path d="M3 9h18M9 21V9"/>
              </svg>
            </div>
            <span class="sh-compat-label">SDK</span>
          </div>

          <div class="sh-compat-card">
            <div class="sh-compat-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <span class="sh-compat-label">KYC Built-in</span>
          </div>

        </div>

        <a href="#" class="sh-compat-explore">Explore the full API →</a>
      </div>
    </section>

    <!-- ═══ Section 4b: Trust Logo Strip ══════════════════════════════ -->
    <section class="sh-trust-section" aria-label="Trusted infrastructure">
      <div class="sh-section-inner">
        <p class="sh-trust-caption">Trusted infrastructure</p>
        <TrustLogoStrip :marquee="false" />
      </div>
    </section>

    <!-- ═══ Section 4c: Code Example ══════════════════════════════════ -->
    <section class="saas-code-section" aria-labelledby="sh-code-heading">
      <div class="sh-section-inner">
        <h2 id="sh-code-heading" class="sh-section-heading">Integrate in 5 minutes</h2>
        <p class="saas-code-sub">Three lines of JavaScript. No backend changes required.</p>
        <CodeBlock :code="code" language="js" />
      </div>
    </section>

    <!-- ═══ Partners Say ═══════════════════════════════════════════════ -->
    <section class="sh-partners-say" aria-labelledby="sh-partners-heading" data-reveal="fade-up">
      <div class="sh-section-inner">
        <p class="sh-testimonials-eyebrow">Social proof · Simulated companies · Genuine results</p>
        <h2 id="sh-partners-heading" class="sh-section-heading">Loved by builders.</h2>
        <div class="sh-partners-grid" ref="partnersGrid" data-animate-stagger>
          <figure class="sh-partner-card" v-for="t in partnerTestimonials" :key="t.badge">
            <blockquote class="sh-partner-quote">{{ t.quote }}</blockquote>
            <figcaption class="sh-partner-footer">
              <span class="sh-partner-role">{{ t.role }}</span>
              <span class="sh-partner-company">{{ t.company }}</span>
            </figcaption>
            <span class="sh-partner-badge">{{ t.badge }}</span>
          </figure>
        </div>
      </div>
    </section>

    <!-- ═══ Section 5: CTA ════════════════════════════════════════════ -->
    <section class="sh-cta-section" aria-labelledby="sh-cta-heading">
      <div class="sh-cta-inner">
        <h2 id="sh-cta-heading" class="sh-cta-heading">Start building today.</h2>
        <p class="sh-cta-sub">
          From signup to first live transaction in under a day. The demo is free. The integration is one script tag.
        </p>
        <div class="sh-cta-buttons">
          <a
            href="http://localhost:5001"
            target="_blank"
            rel="noopener noreferrer"
            class="sh-cta-btn sh-cta-btn--primary"
          >Get Demo →</a>
          <RouterLink to="/saas/product" class="sh-cta-btn sh-cta-btn--ghost">
            Explore Products
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Live activity toast (fixed-position, self-contained) -->
    <LiveActivityToast />

  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { CounterStat, TrustLogoStrip, CodeBlock, LiveActivityToast } from '@/components/shared'
import SaasVantaHalo from '@/components/three/SaasVantaHalo.vue'
import { useClipReveal, useGradientSweep } from '@/composables/useSplitReveal'
import { useMagneticButton } from '@/composables/useMagneticButton'
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

onMounted(() => {
  activityTimer = setInterval(() => {
    const next = allActivity[activityIdx.value % allActivity.length]!
    visibleActivity.value = [{ ...next, id: Date.now(), time: 'just now' }, ...visibleActivity.value.slice(0, 3)]
    activityIdx.value++
  }, 3500)
})
onUnmounted(() => clearInterval(activityTimer))

// ── Partners testimonials ─────────────────────────────────────────
const partnersGrid = ref<HTMLElement | null>(null)
useCardTiltAll(partnersGrid, '.sh-partner-card', { maxTilt: 5, scale: 1.02, glowColor: '#6366f1', glowIntensity: 0.15 })

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

// ── WOW Animations ───────────────────────────────────────────────
const heroTitle = ref<HTMLElement | null>(null)
const heroSub = ref<HTMLElement | null>(null)
const ctaBtn = ref<HTMLElement | null>(null)
const sec1h = ref<HTMLElement | null>(null)
const sec2h = ref<HTMLElement | null>(null)

useClipReveal(heroTitle, { direction: 'up', duration: 0.9, delay: 0.1 })
useClipReveal(heroSub, { direction: 'up', duration: 0.9, delay: 0.4 })
useMagneticButton(ctaBtn, { strength: 0.3, returnDuration: 500 })
useGradientSweep(sec1h, { color: '#6366f1', duration: 1100 })
useGradientSweep(sec2h, { color: '#6366f1', duration: 1100 })

const code = `// Install Prodigy widget
npm install @prodigy/widget

// Initialize in your app
import { ProdigyWidget } from '@prodigy/widget'

const widget = new ProdigyWidget({
  partnerId: 'your-partner-id',
  theme: 'light',
  onComplete: (tx) => console.log('Transaction:', tx)
})

widget.mount('#checkout-container')`

const email = ref('')

function handleEmailSubmit() {
  if (email.value) {
    window.open('http://localhost:5001', '_blank', 'noopener,noreferrer')
  }
}

const activeTab = ref(0)

const tabs = [
  {
    id: 'sdk',
    label: 'Comprehensive SDK',
    title: 'Drop-In SDK for Any Stack',
    desc: 'Our SDK works with React, Vue, Angular, and vanilla JS. One import, full widget lifecycle managed for you.',
    bullets: [
      'React, Vue, Angular adapters included',
      'TypeScript definitions out of the box',
      'SSR-compatible rendering',
      'Automatic token refresh handling',
    ],
    mockupTitle: 'SDK Console',
  },
  {
    id: 'contracts',
    label: 'Smart Contract Libraries',
    title: 'Pre-Audited Contract Libraries',
    desc: 'Battle-tested smart contracts for ERC-20 transfers, multi-chain swaps, and fee distribution — already audited so you don\'t have to.',
    bullets: [
      'Multi-chain: ETH, BNB, Polygon, Solana',
      'Audited by leading security firms',
      'Configurable fee hooks per contract',
      'On-chain settlement proofs',
    ],
    mockupTitle: 'Contract Registry',
  },
  {
    id: 'api',
    label: 'Seamless API Integration',
    title: 'REST + Webhooks, Fully Documented',
    desc: 'OpenAPI 3.1 spec, auto-generated SDKs, real-time webhooks for every transaction event. Your backend stays in sync.',
    bullets: [
      'OpenAPI 3.1 with live playground',
      'Idempotent endpoints for safe retries',
      'Webhook signing with HMAC-SHA256',
      'Under 200ms P99 response time',
    ],
    mockupTitle: 'API Explorer',
  },
  {
    id: 'security',
    label: 'Robust Security',
    title: 'Compliance Ready Out of the Box',
    desc: 'KYC, AML transaction monitoring, SOC 2 Type II ready, and a full audit trail for every movement. Compliance stops being your problem.',
    bullets: [
      'Sumsub KYC integrated end-to-end',
      'AML scoring on every transaction',
      'SOC 2 Type II attestation ready',
      'Complete double-entry audit trail',
    ],
    mockupTitle: 'Security Dashboard',
  },
]

const quotes = [
  {
    text: 'We went from 6 months of KYC integration to 3 lines of code. Prodigy is the infrastructure layer we never had to build.',
    role: 'Sarah K., Head of Product, NordPay',
  },
  {
    text: 'Our conversion rate jumped 34% after switching. The widget just works — no edge cases, no compliance headaches.',
    role: 'Marcus T., CTO, SwapDeck',
  },
  {
    text: 'We launched in 3 new markets in Q3 because Prodigy handles all the local compliance. It\'s transformative.',
    role: 'Ingrid M., CEO, Meridian Wealth',
  },
]

const metrics = [
  { stat: 2.4,   prefix: '€', suffix: 'B',  label: 'Volume processed (demo data)' },
  { stat: 99.97, prefix: '',  suffix: '%',  label: 'Uptime SLA' },
  { stat: 200,   prefix: '<', suffix: 'ms', label: 'Quote latency (p99)' },
  { stat: 47,    prefix: '',  suffix: 's',  label: 'Average KYC completion' },
]

const features = [
  {
    title: 'No-Code Widget Integration',
    desc: 'Embed crypto in one script tag. No backend engineers, no 3-day sprint, no spreadsheet.',
    cardLabel: 'EMBED',
    cardSlot: 'FeatureCard1',
  },
  {
    title: 'Real-Time Analytics',
    desc: 'Monitor every transaction, every commission, every KYC status as it happens.',
    cardLabel: 'ANALYTICS',
    cardSlot: 'FeatureCard2',
  },
  {
    title: 'Configurable Fee Engine',
    desc: 'Set platform fees and partner shares in the admin console. Users see every number before they confirm.',
    cardLabel: 'FEE ENGINE',
    cardSlot: 'FeatureCard3',
  },
  {
    title: 'Developer Sandbox',
    desc: 'Test your entire integration in a safe environment with simulated transactions.',
    cardLabel: 'SANDBOX',
    cardSlot: 'FeatureCard4',
  },
]
</script>

<style scoped>
/* ─── Variables ───────────────────────────────────────────── */
.sh-home {
  --bg: #ffffff;
  --surface: #f8f7ff;
  --ink: #0f0f23;
  --ink-mid: #4a4a6a;
  --ink-muted: #8888a8;
  --accent: #4f46e5;
  --accent-light: #ede9fe;
  --accent-mid: #818cf8;
  --green: #22c55e;
  --green-light: #dcfce7;
  --border: #e2e0f0;
  --radius: 12px;

  background: var(--bg);
  color: var(--ink);
  font-family: 'Inter', sans-serif;
}

.sh-accent-text {
  color: var(--accent);
}

/* ─── Shared section shell ────────────────────────────────── */
.sh-section-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.sh-section-heading {
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 700;
  line-height: 1.15;
  color: var(--ink);
  text-align: center;
  margin: 0 0 1.5rem;
}

/* ═══ Hero ════════════════════════════════════════════════════ */
.sh-hero {
  padding: 5rem 0 0;
  overflow: hidden;
  position: relative;
  background: #0f172a;
}

.sh-hero-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 55fr 45fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

/* Eyebrow */
.sh-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8125rem;
  color: var(--ink-mid);
  background: var(--accent-light);
  padding: 0.3125rem 0.75rem;
  border-radius: 100px;
  margin-bottom: 1.25rem;
}

.sh-stars {
  color: #f59e0b;
  font-size: 0.75rem;
  letter-spacing: -0.03em;
}

/* Headline */
.sh-h1 {
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(2.5rem, 5vw, 3.75rem);
  font-weight: 700;
  line-height: 1.1;
  color: var(--ink);
  letter-spacing: -0.02em;
  margin: 0 0 1.25rem;
}

/* Sub */
.sh-sub {
  font-size: 1rem;
  line-height: 1.65;
  color: var(--ink-mid);
  max-width: 45ch;
  margin: 0 0 1.75rem;
}

/* Email row */
.sh-email-row {
  display: flex;
  gap: 0;
  height: 2.875rem;
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--border);
  max-width: 30rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 16px rgba(79, 70, 229, 0.08);
}

.sh-email-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 0 1rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.9375rem;
  color: var(--ink);
  background: var(--bg);
  min-width: 0;
}

.sh-email-input::placeholder {
  color: var(--ink-muted);
}

.sh-email-btn {
  flex-shrink: 0;
  padding: 0 1.25rem;
  background: var(--accent);
  color: #ffffff;
  border: none;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
  white-space: nowrap;
}

.sh-email-btn:hover {
  background: #4338ca;
}

/* Microcopy */
.sh-microcopy {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.sh-micro-item {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8125rem;
  color: var(--ink-mid);
}

.sh-demo-link {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--accent);
  text-decoration: none;
  transition: text-decoration 0.1s;
}

.sh-demo-link:hover {
  text-decoration: underline;
}

/* Browser frame */
.sh-browser {
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: 0 8px 40px rgba(79, 70, 229, 0.15);
  overflow: hidden;
  background: #ffffff;
}

.sh-browser-bar {
  background: #f5f5f5;
  height: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.75rem;
  border-bottom: 1px solid var(--border);
}

.sh-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.sh-dot--red { background: #ff5f57; }
.sh-dot--yellow { background: #febc2e; }
.sh-dot--green { background: #28c840; }

.sh-url-bar {
  flex: 1;
  background: #ffffff;
  border-radius: 4px;
  height: 1.25rem;
  padding: 0 0.5rem;
  font-size: 0.625rem;
  color: #888888;
  line-height: 1.25rem;
  font-family: 'Inter', monospace;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sh-browser-content {
  display: flex;
  min-height: 260px;
}

.sh-sidebar {
  width: 80px;
  flex-shrink: 0;
  background: #f8f7ff;
  border-right: 1px solid var(--border);
  padding: 1rem 0.625rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sh-sidebar-item {
  height: 0.625rem;
  border-radius: 4px;
  background: var(--border);
}

.sh-sidebar-item--active {
  background: var(--accent-mid);
}

.sh-dashboard {
  flex: 1;
  padding: 0.875rem;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  min-width: 0;
}

.sh-stat-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.sh-stat-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.625rem;
}

.sh-stat-label {
  font-size: 0.5rem;
  font-family: 'Inter', sans-serif;
  color: var(--ink-muted);
  letter-spacing: 0.05em;
  margin-bottom: 0.2rem;
}

.sh-stat-value {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.2;
}

.sh-stat-delta {
  font-size: 0.5rem;
  color: var(--ink-muted);
  margin-top: 0.1rem;
}

.sh-delta-up {
  color: var(--green);
}

.sh-mini-table {
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
}

.sh-mini-table-head {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 0.5rem;
  padding: 0.375rem 0.625rem;
  background: #f8f7ff;
  color: var(--ink-muted);
  font-weight: 600;
  letter-spacing: 0.04em;
  border-bottom: 1px solid var(--border);
}

.sh-mini-row {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 0.5rem;
  padding: 0.375rem 0.625rem;
  color: var(--ink);
  border-bottom: 1px solid var(--border);
  align-items: center;
}

.sh-mini-row:last-child {
  border-bottom: none;
}

.sh-badge-green {
  background: var(--green-light);
  color: #15803d;
  padding: 0.1rem 0.375rem;
  border-radius: 100px;
  font-size: 0.5rem;
  font-weight: 600;
  white-space: nowrap;
}

/* ─── Hero text overrides for dark Vanta background ─── */
.sh-hero .sh-eyebrow {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.85);
}

.sh-hero .sh-h1 {
  color: #ffffff;
}

.sh-hero .sh-sub {
  color: rgba(255, 255, 255, 0.7);
}

.sh-hero .sh-email-row {
  border-color: rgba(255, 255, 255, 0.2);
  background: transparent;
}

.sh-hero .sh-email-input {
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
}

.sh-hero .sh-email-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.sh-hero .sh-micro-item {
  color: rgba(255, 255, 255, 0.65);
}

.sh-hero .sh-demo-link {
  color: #a5b4fc;
}

/* Partner strip */
.sh-partner-strip {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem 2rem;
  padding: 2.25rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 3rem;
  position: relative;
  z-index: 1;
  background: rgba(15, 23, 42, 0.7);
}

.sh-partner-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.55);
}

.sh-partner-logos {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.sh-partner-name {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.45);
}

.sh-partner-dot {
  color: rgba(255, 255, 255, 0.2);
}

/* ═══ Tabs Section ════════════════════════════════════════════ */
.sh-tabs-section {
  background: var(--surface);
  padding: 5rem 0;
}

.sh-tab-bar {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0;
  border-bottom: 1px solid var(--border);
  margin-bottom: 2.5rem;
}

.sh-tab {
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  padding: 0.75rem 1.25rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--ink-mid);
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
  margin-bottom: -1px;
  white-space: nowrap;
}

.sh-tab:hover {
  color: var(--accent);
}

.sh-tab.active {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

.sh-tab-panel {
  display: none;
}

.sh-tab-panel.active {
  display: block;
}

.sh-tab-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.sh-tab-feature-title {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--ink);
  margin: 0 0 0.75rem;
}

.sh-tab-feature-desc {
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--ink-mid);
  margin: 0 0 1.25rem;
}

.sh-tab-bullets {
  list-style: none;
  margin: 0 0 1.5rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.sh-tab-bullet {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-size: 0.9rem;
  color: var(--ink);
}

.sh-tab-cta {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--accent);
  text-decoration: none;
}

.sh-tab-cta:hover {
  text-decoration: underline;
}

/* Mockup card (tab) */
.sh-mockup-card {
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: 0 2px 16px rgba(79, 70, 229, 0.10);
  overflow: hidden;
}

.sh-mockup-header {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border);
  background: #f8f7ff;
}

.sh-mockup-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--border);
}

.sh-mockup-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--ink-mid);
  margin-left: 0.25rem;
}

.sh-mockup-body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.sh-mockup-line {
  height: 0.625rem;
  border-radius: 4px;
  background: var(--border);
}

.sh-mockup-line--full { width: 100%; }
.sh-mockup-line--75 { width: 75%; }
.sh-mockup-line--60 { width: 60%; }
.sh-mockup-line--50 { width: 50%; }
.sh-mockup-line--80 { width: 80%; }
.sh-mockup-line--accent { background: var(--accent-light); }

.sh-mockup-bars {
  display: flex;
  align-items: flex-end;
  gap: 0.375rem;
  height: 4rem;
  margin-top: 0.25rem;
}

.sh-m-bar {
  flex: 1;
  border-radius: 3px 3px 0 0;
  background: var(--border);
}

.sh-m-bar--accent {
  background: var(--accent-mid);
}

/* ═══ Features Numbered List ══════════════════════════════════ */
.sh-features-section {
  background: var(--bg);
  padding: 5rem 0;
}

.sh-features-header {
  text-align: center;
  margin-bottom: 3.5rem;
}

.sh-features-sub {
  font-size: 1rem;
  color: var(--ink-mid);
  margin: 0;
}

.sh-features-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.sh-feature-row {
  display: grid;
  grid-template-columns: 3rem 1fr 1fr;
  gap: 2.5rem;
  align-items: start;
  padding: 2.5rem 0;
  border-bottom: 1px solid var(--border);
}

.sh-feature-row:last-child {
  border-bottom: none;
}

/* Number + line */
.sh-feature-number-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0.25rem;
}

.sh-feature-number {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: var(--accent-light);
  color: var(--accent);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sh-feature-line {
  flex: 1;
  width: 1px;
  background: repeating-linear-gradient(
    to bottom,
    var(--border) 0px,
    var(--border) 4px,
    transparent 4px,
    transparent 8px
  );
  min-height: 3rem;
  margin-top: 0.5rem;
}

.sh-feature-text {
  padding-top: 0.25rem;
}

.sh-feature-title {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--ink);
  margin: 0 0 0.625rem;
}

.sh-feature-desc {
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--ink-mid);
  margin: 0;
  max-width: 40ch;
}

/* Feature card mockups */
.sh-feature-card {
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: 0 2px 16px rgba(79, 70, 229, 0.10);
  overflow: hidden;
}

.sh-fcard-header {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  padding: 0.5rem 0.875rem;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  color: var(--ink-muted);
}

.sh-fcard-body {
  padding: 0.875rem;
}

/* ═══ Testimonials ════════════════════════════════════════════ */
.sh-testimonials-section {
  background: var(--bg);
  padding: 5rem 0;
  border-top: 1px solid var(--border);
}
.sh-testimonials-header {
  text-align: center;
  margin-bottom: 3rem;
}
.sh-testimonials-eyebrow {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0 0 0.625rem;
}
.sh-testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
.sh-quote-card {
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: 0 2px 16px rgba(79, 70, 229, 0.08);
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0;
  position: relative;
}
.sh-quote-mark {
  font-family: Georgia, serif;
  font-size: 3rem;
  line-height: 1;
  color: var(--accent);
  opacity: 0.15;
  position: absolute;
  top: 1rem;
  left: 1.5rem;
  user-select: none;
}
.sh-quote-text {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  line-height: 1.65;
  color: var(--ink);
  margin: 0;
  padding-top: 1.5rem;
}
.sh-quote-footer {
  margin-top: auto;
}
.sh-role-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 100px;
  background: var(--accent-light);
  color: var(--accent);
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
}

/* ═══ Product Metrics ═════════════════════════════════════════ */
.sh-metrics-section {
  background: var(--surface);
  padding: 4rem 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.sh-sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; overflow: hidden;
  clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}
.sh-metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}
.sh-metric-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(79,70,229,0.08);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  overflow: hidden;
  position: relative;
}
.sh-metric-accent {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: var(--accent);
}
.sh-metric-stat {
  font-family: 'DM Sans', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.1;
  color: var(--accent);
  margin-top: 0.5rem;
}
.sh-metric-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: var(--ink-mid);
  line-height: 1.4;
}
.sh-metric-trend {
  display: inline-flex;
  align-items: center;
  padding: 0.175rem 0.625rem;
  border-radius: 100px;
  background: #dcfce7;
  color: #15803d;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  margin-top: 0.5rem;
  align-self: flex-start;
}

/* ═══ Compatibility ═══════════════════════════════════════════ */
.sh-compat-section {
  background: var(--bg);
  padding: 5rem 0;
  border-top: 1px solid var(--border);
}

.sh-compat-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.sh-compat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.875rem;
  padding: 2rem 1rem;
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: 0 2px 16px rgba(79, 70, 229, 0.10);
  transition: box-shadow 0.2s, border-color 0.2s;
}

.sh-compat-card:hover {
  border-color: var(--accent-mid);
  box-shadow: 0 4px 24px rgba(79, 70, 229, 0.15);
}

.sh-compat-icon {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sh-compat-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--ink);
}

.sh-compat-explore {
  display: block;
  text-align: center;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--accent);
  text-decoration: none;
}

.sh-compat-explore:hover {
  text-decoration: underline;
}

/* ═══ Trust Section ═══════════════════════════════════════════ */
.sh-trust-section {
  background: var(--bg);
  padding: 3rem 0;
  border-top: 1px solid var(--border);
}

/* ═══ Code Section ════════════════════════════════════════════ */
.saas-code-section {
  background: var(--surface);
  padding: 5rem 0;
  border-top: 1px solid var(--border);
}

.saas-code-sub {
  text-align: center;
  font-size: 1rem;
  color: var(--ink-mid);
  margin: 0 0 2rem;
}

/* ═══ CTA Section ═════════════════════════════════════════════ */
.sh-cta-section {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  padding: 5rem 0;
}

.sh-cta-inner {
  max-width: 700px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
}

.sh-cta-heading {
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  color: #ffffff;
  line-height: 1.1;
  margin: 0 0 1rem;
}

.sh-cta-sub {
  font-size: 1rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 2rem;
  max-width: 50ch;
  margin-left: auto;
  margin-right: auto;
}

.sh-cta-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.sh-cta-btn {
  display: inline-flex;
  align-items: center;
  font-family: 'Inter', sans-serif;
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
  padding: 0.75rem 1.75rem;
  border-radius: 100px;
  transition: transform 0.15s, opacity 0.15s;
}

.sh-cta-btn:hover {
  transform: translateY(-1px);
  opacity: 0.9;
}

.sh-cta-btn--primary {
  background: #ffffff;
  color: var(--accent);
  border: 2px solid #ffffff;
}

.sh-cta-btn--ghost {
  background: transparent;
  color: #ffffff;
  border: 2px solid rgba(255, 255, 255, 0.6);
}

/* ═══ Counter Stats Row ══════════════════════════════════════ */
.sh-stats-row-section {
  background: #faf5ff;
  padding: 3rem 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.sh-stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.sh-stats-row-item {
  background: #ffffff;
  border-radius: var(--radius);
  box-shadow: 0 2px 12px rgba(79, 70, 229, 0.06);
  padding: 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid rgba(79, 70, 229, 0.08);
}

.sh-stats-row-item :deep(.stat-display) {
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 700;
  color: var(--accent);
  line-height: 1.1;
}

.sh-stats-row-item :deep(.stat-label) {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: var(--ink-mid);
}

/* ═══ Trust caption ═══════════════════════════════════════════ */
.sh-trust-caption {
  font-family: 'Inter', sans-serif;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-muted);
  text-align: center;
  margin: 0 0 1.25rem;
}

/* ═══ Feature Cards Section ═══════════════════════════════════ */
.sh-feature-cards-section {
  background: var(--surface);
  padding: 5rem 0;
  border-top: 1px solid var(--border);
}

.sh-fcard-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 0.5rem;
}

.sh-cap-card {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.06);
  padding: 2rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid var(--border);
  transition: box-shadow 0.2s, transform 0.2s;
}

.sh-cap-card:hover {
  box-shadow: 0 8px 32px rgba(79, 70, 229, 0.12);
  transform: translateY(-3px);
}

.sh-cap-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--accent-light);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sh-cap-title {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--ink);
  margin: 0;
}

.sh-cap-desc {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  line-height: 1.65;
  color: var(--ink-mid);
  margin: 0;
  flex: 1;
}

/* ─── Responsive ──────────────────────────────────────────── */
@media (max-width: 900px) {
  .sh-testimonials-grid { grid-template-columns: 1fr; }
  .sh-metrics-grid { grid-template-columns: repeat(2, 1fr); }
  .sh-stats-row { grid-template-columns: repeat(2, 1fr); }
  .sh-fcard-grid { grid-template-columns: 1fr; }
  .sh-hero-inner {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .sh-hero-right {
    max-width: 520px;
  }

  .sh-tab-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .sh-feature-row {
    grid-template-columns: 3rem 1fr;
  }

  .sh-feature-card {
    grid-column: 2;
    margin-top: -0.5rem;
  }

  .sh-compat-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .sh-metrics-grid { grid-template-columns: 1fr 1fr; gap: 0.875rem; }
  .sh-metric-stat { font-size: 2rem; }
  .sh-stats-row { grid-template-columns: 1fr 1fr; gap: 0.75rem; }
  .sh-hero {
    padding-top: 3rem;
  }

  .sh-email-row {
    flex-direction: column;
    height: auto;
    border-radius: var(--radius);
    overflow: visible;
    border: none;
    gap: 0.75rem;
    box-shadow: none;
  }

  .sh-email-input {
    border: 1px solid var(--border);
    border-radius: var(--radius);
    height: 2.875rem;
    padding: 0 1rem;
  }

  .sh-email-btn {
    border-radius: var(--radius);
    padding: 0.75rem 1.25rem;
    height: 2.875rem;
    width: 100%;
  }

  .sh-stat-cards {
    grid-template-columns: 1fr;
    gap: 0.375rem;
  }

  .sh-tab-bar {
    overflow-x: auto;
    justify-content: flex-start;
    -webkit-overflow-scrolling: touch;
  }

  .sh-feature-row {
    grid-template-columns: 2.5rem 1fr;
    gap: 1.25rem;
  }

  .sh-feature-card {
    grid-column: 1 / -1;
    margin-top: 0;
  }

  .sh-compat-cards {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 375px) {
  .sh-section-inner {
    padding: 0 1rem;
  }

  .sh-stats-row {
    grid-template-columns: 1fr;
  }

  .sh-metrics-grid {
    grid-template-columns: 1fr;
  }

  .sh-compat-cards {
    grid-template-columns: 1fr;
  }
}

/* ── Widget Preview Section ── */
.sh-widget-preview-section {
  padding: 5rem 0;
  background: var(--surface);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.sh-widget-preview-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 4rem;
  align-items: center;
}
.sh-widget-preview-text h2 { margin-bottom: 1rem; }
.sh-widget-preview-sub {
  font-size: 1rem;
  line-height: 1.65;
  color: var(--ink-mid);
  margin: 0;
  max-width: 42ch;
}
@media (max-width: 768px) {
  .sh-widget-preview-inner { grid-template-columns: 1fr; }
}

/* ── SaaS Partners Say ── */
.sh-partners-say {
  background: #fff;
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
  padding: 5rem 0;
}
.sh-partners-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
}
.sh-partner-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.75rem 1.5rem 1.5rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(99,102,241,0.04);
  transition: box-shadow 0.2s, transform 0.2s;
}
.sh-partner-card:hover {
  box-shadow: 0 4px 20px rgba(99,102,241,0.12), 0 1px 3px rgba(0,0,0,0.06);
}
.sh-partner-quote {
  font-size: 0.9375rem;
  line-height: 1.65;
  color: #374151;
  margin: 0;
  flex: 1;
}
.sh-partner-footer {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}
.sh-partner-role {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #111827;
}
.sh-partner-company {
  font-size: 0.75rem;
  color: #9ca3af;
}
.sh-partner-badge {
  display: inline-block;
  align-self: flex-start;
  background: #6366f1;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.75rem;
  border-radius: 99px;
  letter-spacing: 0.03em;
}
@media (max-width: 768px) {
  .sh-partners-grid { grid-template-columns: 1fr; }
}

/* ── Feature Marquee Strip ── */
.marquee-wrap {
  overflow: hidden;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
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
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #475569;
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
  border: 1px solid var(--border);
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 2px 12px rgba(99,102,241,0.06);
}
.activity-header { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; }
.activity-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--accent);
  animation: act-pulse 1.5s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes act-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.8)} }
.activity-label { font-size: 0.75rem; font-weight: 600; color: var(--accent); text-transform: uppercase; letter-spacing: 0.06em; }
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
