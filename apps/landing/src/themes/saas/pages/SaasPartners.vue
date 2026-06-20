<template>
  <main class="spar-partners">

    <!-- ═══ Section 1: Hero ════════════════════════════════════════ -->
    <section class="spar-hero" aria-labelledby="spar-hero-heading">
      <div class="spar-hero-inner">
        <div class="spar-hero-eyebrow">Partner Program</div>
        <h1 id="spar-hero-heading" class="spar-h1" ref="heroH">
          One Script Tag. <span class="spar-accent">Unlimited Revenue Sharing.</span>
        </h1>
        <p class="spar-hero-sub">
          Embed the Prodigy widget in your platform. Set your partner fee in the admin console. Earn on every transaction — automatically, transparently, in real time.
        </p>
        <div class="spar-hero-actions">
          <a
            href="http://localhost:5006"
            target="_blank"
            rel="noopener noreferrer"
            class="spar-btn spar-btn--primary"
          >Open Partner Portal →</a>
          <a
            href="http://localhost:5002"
            target="_blank"
            rel="noopener noreferrer"
            class="spar-btn spar-btn--ghost"
          >Admin Console</a>
        </div>
      </div>
    </section>

    <!-- ═══ Section 2: Integration Card ═══════════════════════════ -->
    <section class="spar-embed-section" aria-labelledby="spar-embed-heading">
      <div class="spar-section-inner">
        <h2 id="spar-embed-heading" class="spar-section-heading">
          The Entire Integration
        </h2>

        <!-- Browser frame embed mockup -->
        <div class="spar-browser" aria-label="Integration code example">
          <div class="spar-browser-bar" aria-hidden="true">
            <span class="spar-dot spar-dot--red" />
            <span class="spar-dot spar-dot--yellow" />
            <span class="spar-dot spar-dot--green" />
            <div class="spar-url-bar">your-platform.com/index.html</div>
          </div>
          <div class="spar-browser-content">
            <pre class="spar-code-block" aria-label="Script embed code" data-reveal="fade-up"><code><span class="spar-code-comment">&lt;!-- Add this one tag to your platform --&gt;</span>
<span class="spar-code-tag">&lt;script</span>
  <span class="spar-code-attr">src</span>=<span class="spar-code-str">"https://cdn.prodigy.io/widget/v2/embed.js"</span>
  <span class="spar-code-attr">data-partner</span>=<span class="spar-code-str">"YOUR_PARTNER_ID"</span>
  <span class="spar-code-attr">data-container</span>=<span class="spar-code-str">"#prodigy-widget"</span>
  <span class="spar-code-attr">async</span>
<span class="spar-code-tag">&gt;&lt;/script&gt;</span></code></pre>
          </div>
        </div>

        <p class="spar-embed-caption">That is the entire integration.</p>
        <p class="spar-embed-sub">
          Partner shares are configured in the admin console. Tracked per transaction. Shown to every user before they confirm. Settled automatically.
        </p>
      </div>
    </section>

    <!-- ═══ FeeCalculator ═══════════════════════════════════════════ -->
    <section class="saas-fee-section" aria-labelledby="saas-fee-h" data-reveal="fade-up">
      <div class="saas-fee-inner">
        <div class="saas-fee-left">
          <p class="saas-fee-eyebrow">Revenue potential</p>
          <h2 id="saas-fee-h" class="saas-fee-headline">See your revenue potential.</h2>
          <ul class="saas-fee-bullets">
            <li>Set your own fee layer on top of platform rates</li>
            <li>Earn 15–25% of all platform fees generated</li>
            <li>Paid monthly via partner portal</li>
            <li>Volume discounts kick in automatically</li>
          </ul>
        </div>
        <div class="saas-fee-right">
          <FeeCalculator theme="saas" />
        </div>
      </div>
    </section>

    <!-- ═══ Revenue Calculator ════════════════════════════════════ -->
    <section class="rc-section" aria-labelledby="rc-heading" data-reveal="fade-right">
      <div class="rc-inner">
        <h2 id="rc-heading" class="rc-headline">Revenue Calculator</h2>
        <p class="rc-sub">Drag the sliders. See what Prodigy pays you every month.</p>
        <div class="rc-controls">
          <div class="rc-field">
            <label for="rc-vol" class="rc-label">Monthly Volume</label>
            <input id="rc-vol" v-model.number="rcVolume" type="range" min="10000" max="5000000" step="10000" class="rc-slider" />
            <span class="rc-val">€{{ rcVolume.toLocaleString('de-DE') }}</span>
          </div>
          <div class="rc-field">
            <label for="rc-markup" class="rc-label">Your Markup</label>
            <input id="rc-markup" v-model.number="rcMarkup" type="range" min="0.1" max="2" step="0.1" class="rc-slider" />
            <span class="rc-val">{{ rcMarkup.toFixed(1) }}%</span>
          </div>
        </div>
        <div class="rc-result" aria-live="polite" aria-label="Revenue estimate">
          <span class="rc-result-label">Your estimated monthly earn</span>
          <span class="rc-result-num">€{{ rcMonthlyEarn.toLocaleString('de-DE', {minimumFractionDigits:2,maximumFractionDigits:2}) }}</span>
        </div>
      </div>
    </section>

    <!-- ═══ Section 3: Revenue Breakdown ══════════════════════════ -->
    <section class="spar-revenue-section" aria-labelledby="spar-revenue-heading">
      <div class="spar-section-inner">
        <h2 id="spar-revenue-heading" class="spar-section-heading">
          How It <span class="spar-accent">Works</span>
        </h2>
        <p class="spar-section-sub">Three steps from embed to earnings.</p>

        <div class="spar-revenue-cards" data-animate-stagger>

          <div class="spar-revenue-card">
            <div class="spar-revenue-step" aria-hidden="true">01</div>
            <div class="spar-revenue-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#4f46e5" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <rect x="4" y="4" width="20" height="20" rx="3"/>
                <path d="M4 10h20M10 4v20"/>
              </svg>
            </div>
            <h3 class="spar-revenue-title">EMBED</h3>
            <p class="spar-revenue-desc">
              Drop the script tag into your platform. The widget renders fully — crypto exchange UI, KYC flow, fee disclosure — all handled by Prodigy.
            </p>
            <div class="spar-revenue-badge">Your platform serves crypto</div>
          </div>

          <div class="spar-revenue-arrow" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#818cf8" stroke-width="1.5" stroke-linecap="round">
              <path d="M6 16h20M18 8l8 8-8 8"/>
            </svg>
          </div>

          <div class="spar-revenue-card">
            <div class="spar-revenue-step" aria-hidden="true">02</div>
            <div class="spar-revenue-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#4f46e5" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="14" cy="10" r="5"/>
                <path d="M6 24c0-4.4 3.6-8 8-8s8 3.6 8 8"/>
                <path d="M19 4l2 2-2 2"/>
              </svg>
            </div>
            <h3 class="spar-revenue-title">CONFIGURE</h3>
            <p class="spar-revenue-desc">
              Set your partner fee percentage in the admin console. Choose between 0.10% and 0.50%. Changes take effect immediately on the next transaction.
            </p>
            <div class="spar-revenue-badge">Set in the admin console</div>
          </div>

          <div class="spar-revenue-arrow" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#818cf8" stroke-width="1.5" stroke-linecap="round">
              <path d="M6 16h20M18 8l8 8-8 8"/>
            </svg>
          </div>

          <div class="spar-revenue-card">
            <div class="spar-revenue-step" aria-hidden="true">03</div>
            <div class="spar-revenue-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#4f46e5" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="6" width="22" height="16" rx="3"/>
                <path d="M3 11h22"/>
                <circle cx="9" cy="17" r="2"/>
                <path d="M14 16h8"/>
              </svg>
            </div>
            <h3 class="spar-revenue-title">EARN</h3>
            <p class="spar-revenue-desc">
              Every transaction credits your partner account automatically. View your earnings in real time in the partner portal. No spreadsheets, no invoices.
            </p>
            <div class="spar-revenue-badge spar-revenue-badge--green">Every transaction credits your account</div>
          </div>

        </div>
      </div>
    </section>

    <!-- ═══ Section 4: Dashboard Preview ══════════════════════════ -->
    <section class="spar-dashboard-section" aria-labelledby="spar-dashboard-heading">
      <div class="spar-section-inner">
        <h2 id="spar-dashboard-heading" class="spar-section-heading">
          The Partner Portal
        </h2>
        <p class="spar-section-sub">Real-time earnings, transaction history, and fee configuration — all in one place.</p>

        <!-- Dashboard CSS mockup -->
        <div class="spar-dashboard" aria-hidden="true">
          <div class="spar-dash-sidebar">
            <div class="spar-dash-logo">◈ Prodigy</div>
            <div class="spar-dash-nav">
              <div class="spar-dash-nav-item spar-dash-nav-item--active">Dashboard</div>
              <div class="spar-dash-nav-item">Transactions</div>
              <div class="spar-dash-nav-item">Earnings</div>
              <div class="spar-dash-nav-item">Settings</div>
            </div>
          </div>
          <div class="spar-dash-main">
            <div class="spar-dash-topbar">
              <span class="spar-dash-page-title">Partner Dashboard</span>
              <div class="spar-dash-meta">Partner ID: PPT-8842</div>
            </div>
            <div class="spar-dash-body">
              <div class="spar-dash-stats">
                <div class="spar-dash-stat">
                  <div class="spar-dash-stat-label">TOTAL EARNINGS</div>
                  <div class="spar-dash-stat-value spar-dash-stat-value--green">$14,820.40</div>
                  <div class="spar-dash-stat-delta">↑ 18.2% this month</div>
                </div>
                <div class="spar-dash-stat">
                  <div class="spar-dash-stat-label">TRANSACTIONS</div>
                  <div class="spar-dash-stat-value">1,284</div>
                  <div class="spar-dash-stat-delta">Last 30 days</div>
                </div>
                <div class="spar-dash-stat">
                  <div class="spar-dash-stat-label">PARTNER RATE</div>
                  <div class="spar-dash-stat-value spar-dash-stat-value--accent">0.35%</div>
                  <div class="spar-dash-stat-delta">Per transaction</div>
                </div>
              </div>

              <div class="spar-dash-table-wrap">
                <div class="spar-dash-table-header">Recent Transactions</div>
                <div class="spar-dash-table">
                  <div class="spar-dash-table-row spar-dash-table-row--head">
                    <span>Date</span><span>User</span><span>Volume</span><span>Your Earn</span><span>Status</span>
                  </div>
                  <div class="spar-dash-table-row">
                    <span>Jun 18</span><span>U-4421</span><span>$4,200</span>
                    <span class="spar-dash-green">+$14.70</span>
                    <span class="spar-dash-badge">Settled</span>
                  </div>
                  <div class="spar-dash-table-row">
                    <span>Jun 18</span><span>U-3387</span><span>$8,900</span>
                    <span class="spar-dash-green">+$31.15</span>
                    <span class="spar-dash-badge">Settled</span>
                  </div>
                  <div class="spar-dash-table-row">
                    <span>Jun 17</span><span>U-2291</span><span>$1,500</span>
                    <span class="spar-dash-green">+$5.25</span>
                    <span class="spar-dash-badge">Settled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="spar-dashboard-cta">
          <a
            href="http://localhost:5006"
            target="_blank"
            rel="noopener noreferrer"
            class="spar-btn spar-btn--primary"
          >Open Partner Portal →</a>
          <a
            href="http://localhost:5002"
            target="_blank"
            rel="noopener noreferrer"
            class="spar-btn spar-btn--ghost"
          >Admin Console →</a>
        </div>
      </div>
    </section>

    <!-- ═══ A: PARTNER TYPES ══════════════════════════════════════ -->
    <section class="spar-types-section" aria-labelledby="spar-types-heading" data-reveal="fade-up">
      <div class="spar-section-inner">
        <h2 id="spar-types-heading" class="spar-section-heading" ref="typesH" data-reveal="fade-up">
          Which partnership <span class="spar-accent">fits you?</span>
        </h2>
        <div class="spar-types-grid" data-animate-stagger ref="saasTypesGrid">
          <div class="spar-type-card">
            <div class="spar-type-icon" aria-hidden="true">🔗</div>
            <h3 class="spar-type-name">Technology Partner</h3>
            <p class="spar-type-desc">Embed Prodigy in your product. Earn 20% of every transaction your users make. Sandbox access, co-marketing budget, dedicated partner manager included.</p>
          </div>
          <div class="spar-type-card">
            <div class="spar-type-icon" aria-hidden="true">📣</div>
            <h3 class="spar-type-name">Referral Partner</h3>
            <p class="spar-type-desc">Send qualified leads. Earn 15% of their first-year transaction revenue. No integration required.</p>
          </div>
          <div class="spar-type-card">
            <div class="spar-type-icon" aria-hidden="true">🏷️</div>
            <h3 class="spar-type-name">White-label Reseller</h3>
            <p class="spar-type-desc">Sell Prodigy under your brand. Full brand rights, custom margin, enterprise support.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ B: PARTNER ECONOMICS TABLE ════════════════════════════ -->
    <section class="spar-econ-section" aria-labelledby="spar-econ-heading">
      <div class="spar-section-inner">
        <h2 id="spar-econ-heading" class="spar-section-heading" ref="econH" data-reveal="fade-up">Partner economics</h2>
        <div class="spar-econ-wrapper" data-reveal="fade-up">
          <table class="spar-econ-table" aria-label="Partner economics comparison">
            <thead>
              <tr>
                <th scope="col" class="spar-econ-th spar-econ-th--label"></th>
                <th scope="col" class="spar-econ-th">Technology</th>
                <th scope="col" class="spar-econ-th">Referral</th>
                <th scope="col" class="spar-econ-th">White-label</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="spar-econ-label">Revenue share</td>
                <td class="spar-econ-cell">20%</td>
                <td class="spar-econ-cell">15% (year 1)</td>
                <td class="spar-econ-cell">Custom</td>
              </tr>
              <tr class="spar-econ-row-alt">
                <td class="spar-econ-label">Attribution window</td>
                <td class="spar-econ-cell">12 months</td>
                <td class="spar-econ-cell">30 days</td>
                <td class="spar-econ-cell">N/A</td>
              </tr>
              <tr>
                <td class="spar-econ-label">Payout cycle</td>
                <td class="spar-econ-cell">Monthly</td>
                <td class="spar-econ-cell">Monthly</td>
                <td class="spar-econ-cell">Negotiated</td>
              </tr>
              <tr class="spar-econ-row-alt">
                <td class="spar-econ-label">API access</td>
                <td class="spar-econ-cell">Full</td>
                <td class="spar-econ-cell">Read-only</td>
                <td class="spar-econ-cell">Full</td>
              </tr>
              <tr>
                <td class="spar-econ-label">Co-marketing</td>
                <td class="spar-econ-cell">✓</td>
                <td class="spar-econ-cell">Co-branded</td>
                <td class="spar-econ-cell">Custom</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ═══ C: PARTNER QUOTE ═══════════════════════════════════════ -->
    <section class="spar-pquote-section" aria-labelledby="spar-pquote-heading" data-reveal="fade-up">
      <div class="spar-section-inner">
        <h2 id="spar-pquote-heading" class="sr-only">Partner testimonial</h2>
        <figure class="spar-pquote-card">
          <div class="spar-pquote-avatar" aria-hidden="true">N</div>
          <div class="spar-pquote-body">
            <blockquote class="spar-pquote-text">"Onboarding was three Slack messages. We were live in six hours. Revenue came in day one."</blockquote>
            <figcaption class="spar-pquote-attr">
              <span class="spar-pquote-name">NordPay</span>
              <span class="spar-pquote-role">Berlin · Technology Partner</span>
            </figcaption>
          </div>
        </figure>
      </div>
    </section>

    <!-- ═══ D: REVENUE EXAMPLE ════════════════════════════════════ -->
    <section class="spar-revex-section" aria-labelledby="spar-revex-heading" data-reveal="fade-up">
      <div class="spar-section-inner">
        <h2 id="spar-revex-heading" class="sr-only">Revenue example</h2>
        <div class="spar-revex-box">
          <div class="spar-revex-eyebrow">Example calculation</div>
          <p class="spar-revex-text">500 users/month × €200 avg transaction = <strong>€100K volume</strong>.</p>
          <p class="spar-revex-text">At 20% revenue share of Prodigy's 0.5% fee = <strong>€100/month</strong> per integration partner.</p>
          <p class="spar-revex-note">Scales linearly with your user base.</p>
        </div>
      </div>
    </section>

    <!-- ═══ E: APPLY CTA SECTION ══════════════════════════════════ -->
    <section class="spar-apply-section" aria-labelledby="spar-apply-heading" data-reveal="fade-up">
      <div class="spar-apply-inner">
        <h2 id="spar-apply-heading" class="spar-apply-heading">Ready to start earning?</h2>
        <p class="spar-apply-sub">Join 847 partners already on the Prodigy network. Start earning your share of every transaction.</p>
        <div class="spar-apply-actions">
          <a href="mailto:partners@prodigy.example" class="spar-btn spar-btn--primary" ref="applyBtn">Apply for partnership →</a>
          <a href="mailto:partners@prodigy.example" class="spar-btn spar-btn--ghost">Talk to a partner manager</a>
        </div>
        <p class="spar-apply-note">(Demo — partners@prodigy.example)</p>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useClipReveal } from '@/composables/useSplitReveal'
import { useMagneticButton } from '@/composables/useMagneticButton'
import { useCardTiltAll } from '@/composables/useCardTilt'
import FeeCalculator from '@/components/shared/FeeCalculator.vue'

const rcVolume = ref(100000)
const rcMarkup = ref(0.5)
const rcMonthlyEarn = computed(() => rcVolume.value * rcMarkup.value / 100)

// ── WOW Animations ───────────────────────────────────────────────
const heroH = ref<HTMLElement | null>(null)
const typesH = ref<HTMLElement | null>(null)
const econH = ref<HTMLElement | null>(null)
const applyBtn = ref<HTMLElement | null>(null)
const saasTypesGrid = ref<HTMLElement | null>(null)

useClipReveal(heroH, { direction: 'up', duration: 0.9, delay: 0.1 })
useClipReveal(typesH, { direction: 'up', duration: 0.85 })
useClipReveal(econH, { direction: 'up', duration: 0.85, delay: 0.1 })
useMagneticButton(applyBtn, { strength: 0.3, returnDuration: 500 })
useCardTiltAll(saasTypesGrid, '.spar-type-card', { maxTilt: 5, scale: 1.02, glowColor: '#6366f1', glowIntensity: 0.18 })
</script>

<style scoped>
.spar-partners {
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

.spar-accent { color: var(--accent); }

/* Shared */
.spar-section-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
}

.spar-section-heading {
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 700;
  line-height: 1.15;
  color: var(--ink);
  text-align: center;
  margin: 0 0 0.75rem;
}

.spar-section-sub {
  text-align: center;
  font-size: 1rem;
  color: var(--ink-mid);
  margin: 0 0 2.5rem;
}

.spar-btn {
  display: inline-flex;
  align-items: center;
  font-family: 'Inter', sans-serif;
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
  padding: 0.75rem 1.75rem;
  border-radius: 100px;
  transition: transform 0.15s;
  border: 2px solid transparent;
}

.spar-btn--primary {
  background: var(--accent);
  color: #ffffff;
  border-color: var(--accent);
}

.spar-btn--primary:hover {
  background: #4338ca;
  border-color: #4338ca;
  transform: translateY(-1px);
}

.spar-btn--ghost {
  background: transparent;
  color: var(--accent);
  border-color: var(--accent);
}

.spar-btn--ghost:hover {
  background: var(--accent-light);
  transform: translateY(-1px);
}

/* ═══ Hero ════════════════════════════════════════════════════ */
.spar-hero {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  padding: 5.5rem 0;
}

.spar-hero-inner {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
}

.spar-hero-eyebrow {
  display: inline-block;
  font-size: 0.8125rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.15);
  padding: 0.3rem 0.875rem;
  border-radius: 100px;
  margin-bottom: 1.25rem;
  letter-spacing: 0.03em;
}

.spar-h1 {
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(2.25rem, 4.5vw, 3.25rem);
  font-weight: 700;
  line-height: 1.15;
  color: #ffffff;
  letter-spacing: -0.02em;
  margin: 0 0 1.25rem;
}

.spar-hero .spar-accent {
  color: #c4b5fd;
}

.spar-hero-sub {
  font-size: 1rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.85);
  max-width: 52ch;
  margin: 0 auto 2rem;
}

.spar-hero-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.spar-hero .spar-btn--primary {
  background: #ffffff;
  color: var(--accent);
  border-color: #ffffff;
}

.spar-hero .spar-btn--ghost {
  background: transparent;
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.6);
}

.spar-hero .spar-btn--ghost:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* ═══ Embed Section ═══════════════════════════════════════════ */
.spar-embed-section {
  padding: 5rem 0;
  text-align: center;
}

.spar-browser {
  max-width: 640px;
  margin: 0 auto 1.5rem;
  border: 1px solid var(--border);
  border-radius: 10px;
  box-shadow: 0 8px 40px rgba(79, 70, 229, 0.15);
  overflow: hidden;
  text-align: left;
}

.spar-browser-bar {
  background: #f5f5f5;
  height: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.75rem;
  border-bottom: 1px solid var(--border);
}

.spar-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.spar-dot--red { background: #ff5f57; }
.spar-dot--yellow { background: #febc2e; }
.spar-dot--green { background: #28c840; }

.spar-url-bar {
  flex: 1;
  background: #ffffff;
  border-radius: 4px;
  height: 1.25rem;
  padding: 0 0.5rem;
  font-size: 0.625rem;
  color: #888;
  line-height: 1.25rem;
  font-family: 'Inter', monospace;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.spar-browser-content {
  background: #1e1e2e;
  padding: 1.5rem;
}

.spar-code-block {
  margin: 0;
  font-family: 'SF Mono', 'Fira Code', 'Fira Mono', monospace;
  font-size: 0.8125rem;
  line-height: 1.7;
  color: #cdd6f4;
  white-space: pre;
  overflow-x: auto;
}

.spar-code-comment { color: #6c7086; }
.spar-code-tag { color: #89b4fa; }
.spar-code-attr { color: #a6e3a1; }
.spar-code-str { color: #f38ba8; }

.spar-embed-caption {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--ink);
  margin: 0 0 0.625rem;
}

.spar-embed-sub {
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--ink-mid);
  max-width: 52ch;
  margin: 0 auto;
}

/* ═══ Revenue Cards ═══════════════════════════════════════════ */
.spar-revenue-section {
  background: var(--surface);
  padding: 5rem 0;
}

.spar-revenue-cards {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  gap: 1rem;
  align-items: center;
}

.spar-revenue-card {
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.75rem;
  box-shadow: 0 2px 16px rgba(79, 70, 229, 0.10);
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  height: 100%;
}

.spar-revenue-step {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent-light);
  line-height: 1;
}

.spar-revenue-icon {
  width: 3rem;
  height: 3rem;
  background: var(--accent-light);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spar-revenue-title {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--ink);
  letter-spacing: 0.04em;
  margin: 0;
}

.spar-revenue-desc {
  font-size: 0.875rem;
  line-height: 1.65;
  color: var(--ink-mid);
  margin: 0;
  flex: 1;
}

.spar-revenue-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--accent);
  background: var(--accent-light);
  padding: 0.25rem 0.625rem;
  border-radius: 100px;
  align-self: flex-start;
}

.spar-revenue-badge--green {
  color: #15803d;
  background: var(--green-light);
}

.spar-revenue-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ═══ Dashboard Preview ═══════════════════════════════════════ */
.spar-dashboard-section {
  padding: 5rem 0;
}

.spar-dashboard {
  display: flex;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: 0 8px 40px rgba(79, 70, 229, 0.15);
  margin-bottom: 2rem;
  min-height: 340px;
}

.spar-dash-sidebar {
  width: 180px;
  flex-shrink: 0;
  background: #1e1e2e;
  padding: 1.25rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.spar-dash-logo {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9375rem;
  font-weight: 700;
  color: #ffffff;
}

.spar-dash-nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.spar-dash-nav-item {
  font-family: 'Inter', sans-serif;
  font-size: 0.8125rem;
  color: #6c7086;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  cursor: default;
}

.spar-dash-nav-item--active {
  background: rgba(79, 70, 229, 0.3);
  color: #c4b5fd;
  font-weight: 600;
}

.spar-dash-main {
  flex: 1;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.spar-dash-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1.25rem;
  border-bottom: 1px solid var(--border);
  background: #fafafe;
}

.spar-dash-page-title {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--ink);
}

.spar-dash-meta {
  font-size: 0.75rem;
  color: var(--ink-muted);
}

.spar-dash-body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.spar-dash-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.875rem;
}

.spar-dash-stat {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 0.875rem 1rem;
}

.spar-dash-stat-label {
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--ink-muted);
  margin-bottom: 0.25rem;
}

.spar-dash-stat-value {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.2;
}

.spar-dash-stat-value--green { color: #16a34a; }
.spar-dash-stat-value--accent { color: var(--accent); }

.spar-dash-stat-delta {
  font-size: 0.625rem;
  color: var(--ink-muted);
  margin-top: 0.125rem;
}

.spar-dash-table-wrap {
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
}

.spar-dash-table-header {
  padding: 0.625rem 1rem;
  background: var(--surface);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--ink-mid);
  border-bottom: 1px solid var(--border);
}

.spar-dash-table {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
}

.spar-dash-table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  align-items: center;
  border-bottom: 1px solid var(--border);
  color: var(--ink);
}

.spar-dash-table-row:last-child {
  border-bottom: none;
}

.spar-dash-table-row--head {
  background: #fafafe;
  color: var(--ink-muted);
  font-weight: 600;
  font-size: 0.6875rem;
  letter-spacing: 0.03em;
}

.spar-dash-green {
  color: #16a34a;
  font-weight: 600;
}

.spar-dash-badge {
  background: var(--green-light);
  color: #15803d;
  padding: 0.1875rem 0.5rem;
  border-radius: 100px;
  font-size: 0.6875rem;
  font-weight: 600;
  display: inline-block;
}

.spar-dashboard-cta {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

/* ─── Responsive ────────────────────────────────────────── */
@media (max-width: 900px) {
  .spar-revenue-cards {
    grid-template-columns: 1fr;
  }

  .spar-revenue-arrow {
    transform: rotate(90deg);
  }

  .spar-dash-sidebar {
    width: 140px;
  }

  .spar-dash-stats {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .spar-hero {
    padding: 3.5rem 0;
  }

  .spar-dash-sidebar {
    display: none;
  }

  .spar-dash-table-row {
    grid-template-columns: 1fr 1fr 1fr;
  }

  .spar-dash-table-row > span:nth-child(2),
  .spar-dash-table-row > span:nth-child(3) {
    display: none;
  }

  .spar-hero-actions {
    flex-direction: column;
    align-items: center;
  }
}

/* ═══ Fee Calculator section ══════════════════════════════════ */
.saas-fee-section { padding: 5rem 0; background: var(--surface); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.saas-fee-inner { max-width: 1100px; margin: 0 auto; padding: 0 2rem; display: grid; grid-template-columns: 1fr 1.4fr; gap: 3.5rem; align-items: start; }
.saas-fee-left { display: flex; flex-direction: column; gap: 1rem; }
.saas-fee-eyebrow { font-size: 0.8125rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent); margin: 0; }
.saas-fee-headline { font-family: 'DM Sans', sans-serif; font-size: clamp(1.5rem, 3vw, 2.25rem); font-weight: 700; line-height: 1.2; color: var(--ink); margin: 0; }
.saas-fee-bullets { list-style: none; margin: 0.5rem 0 0; padding: 0; display: flex; flex-direction: column; gap: 0.625rem; }
.saas-fee-bullets li { font-family: 'Inter', sans-serif; font-size: 0.9375rem; line-height: 1.6; color: var(--ink-mid); padding-left: 1.5rem; position: relative; }
.saas-fee-bullets li::before { content: '✓'; position: absolute; left: 0; color: var(--accent); font-weight: 700; }
.saas-fee-right { min-width: 0; }
@media (max-width: 900px) { .saas-fee-inner { grid-template-columns: 1fr; gap: 2.5rem; } }

/* ── Revenue Calculator ── */
.rc-section { background: #f8fafc; border-top: 1px solid #e2e8f0; }
.rc-inner { max-width: 1200px; margin: 0 auto; padding: 5rem 1.5rem; }
.rc-headline { font-family: 'Space Grotesk', sans-serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; color: #0f172a; margin: 0 0 0.5rem; }
.rc-sub { font-family: 'Inter', sans-serif; font-size: 1rem; color: #64748b; margin: 0 0 3rem; }
.rc-controls { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2.5rem; }
.rc-field { display: flex; flex-direction: column; gap: 0.5rem; }
.rc-label { font-family: 'Inter', sans-serif; font-size: 0.8125rem; font-weight: 500; color: #64748b; }
.rc-slider { width: 100%; accent-color: #4f46e5; }
.rc-val { font-family: 'Space Grotesk', sans-serif; font-size: 0.875rem; font-weight: 600; color: #0f172a; }
.rc-result { background: linear-gradient(135deg, #4f46e5, #6366f1); border-radius: 12px; padding: 2rem; display: flex; flex-direction: column; gap: 0.5rem; }
.rc-result-label { font-family: 'Inter', sans-serif; font-size: 0.8125rem; color: rgba(255,255,255,0.7); }
.rc-result-num { font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 700; color: #fff; line-height: 1; }
@media (max-width: 768px) { .rc-controls { grid-template-columns: 1fr; } }

/* ═══ Partner Types ══════════════════════════════════════ */
.spar-types-section {
  padding: 5rem 0;
  background: var(--surface);
}

.spar-types-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.spar-type-card {
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.75rem;
  box-shadow: 0 2px 16px rgba(79, 70, 229, 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.spar-type-icon {
  font-size: 1.5rem;
  line-height: 1;
}

.spar-type-name {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--ink);
  margin: 0;
}

.spar-type-desc {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  line-height: 1.65;
  color: var(--ink-mid);
  margin: 0;
}

/* ═══ Partner Economics Table ════════════════════════════ */
.spar-econ-section {
  padding: 5rem 0;
}

.spar-econ-wrapper {
  overflow-x: auto;
  border-radius: var(--radius);
  box-shadow: 0 2px 16px rgba(79, 70, 229, 0.10);
}

.spar-econ-table {
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
  font-family: 'Inter', sans-serif;
  min-width: 560px;
}

.spar-econ-th {
  padding: 1rem 1.5rem;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9375rem;
  font-weight: 700;
  color: #ffffff;
  background: var(--accent);
  text-align: center;
  border-bottom: 2px solid var(--border);
}

.spar-econ-th--label {
  background: #4338ca;
  text-align: left;
  width: 30%;
}

.spar-econ-label {
  padding: 0.875rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--ink);
  border-bottom: 1px solid var(--border);
}

.spar-econ-cell {
  padding: 0.875rem 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  color: var(--ink-mid);
  border-bottom: 1px solid var(--border);
}

.spar-econ-row-alt .spar-econ-label,
.spar-econ-row-alt .spar-econ-cell {
  background: var(--surface);
}

.spar-econ-table tr:last-child td {
  border-bottom: none;
}

/* ═══ Partner Quote ══════════════════════════════════════ */
.spar-pquote-section {
  padding: 4rem 0;
  background: var(--surface);
}

.spar-pquote-card {
  background: #ffffff;
  border: 1px solid var(--border);
  border-left: 4px solid var(--accent);
  border-radius: var(--radius);
  padding: 2rem 2.5rem;
  box-shadow: 0 2px 16px rgba(79, 70, 229, 0.08);
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin: 0;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
}

.spar-pquote-avatar {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  background: var(--accent);
  color: #ffffff;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 1.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.spar-pquote-body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.spar-pquote-text {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  line-height: 1.65;
  color: var(--ink);
  font-style: italic;
  margin: 0;
}

.spar-pquote-attr {
  display: flex;
  gap: 0.5rem;
  align-items: baseline;
}

.spar-pquote-name {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--ink);
}

.spar-pquote-role {
  font-family: 'Inter', sans-serif;
  font-size: 0.8125rem;
  color: var(--ink-muted);
}

/* ═══ Revenue Example ════════════════════════════════════ */
.spar-revex-section {
  padding: 3rem 0;
}

.spar-revex-box {
  max-width: 720px;
  margin: 0 auto;
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 2rem 2.5rem;
  box-shadow: 0 2px 16px rgba(79, 70, 229, 0.08);
}

.spar-revex-eyebrow {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.75rem;
}

.spar-revex-text {
  font-family: 'Inter', sans-serif;
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--ink);
  margin: 0 0 0.5rem;
}

.spar-revex-note {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: var(--ink-muted);
  margin: 0;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border);
}

/* ═══ Apply CTA ══════════════════════════════════════════ */
.spar-apply-section {
  background: #0f172a;
  padding: 5rem 2rem;
  text-align: center;
}

.spar-apply-inner {
  max-width: 600px;
  margin: 0 auto;
}

.spar-apply-heading {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 0.75rem;
}

.spar-apply-sub {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 2rem;
}

.spar-apply-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
}

.spar-apply-section .spar-btn--primary {
  background: var(--accent);
  color: #ffffff;
  border-color: var(--accent);
}

.spar-apply-section .spar-btn--ghost {
  background: transparent;
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.5);
}

.spar-apply-note {
  font-family: 'Inter', sans-serif;
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.35);
  font-style: italic;
  margin: 0;
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
  .spar-types-grid { grid-template-columns: 1fr; }
  .spar-pquote-card { flex-direction: column; gap: 1rem; }
}

@media (max-width: 640px) {
  .spar-apply-actions { flex-direction: column; align-items: center; }
}
</style>
