<template>
  <main>
    <!-- ── Section 1: Hero ──────────────────────────────────────────── -->
    <section class="sec-hero" aria-labelledby="sec-hero-heading">
      <div class="blob blob-1" aria-hidden="true" />
      <div class="blob blob-2" aria-hidden="true" />
      <div class="blob blob-3" aria-hidden="true" />

      <div class="sec-hero-inner">
        <h1 id="sec-hero-heading" class="sec-hero-h1">
          Security that doesn't read like an insurance policy.
        </h1>
        <p class="sec-hero-sub">
          KYC, risk scoring, audit logs — everything transparent, nothing hidden behind NDAs.
        </p>
        <div class="sec-hero-actions">
          <a
            href="http://localhost:5003"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-gradient"
          >
            Run the KYC simulator →
          </a>
          <a
            href="http://localhost:5003"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-ghost"
          >
            Read the audit docs →
          </a>
        </div>
      </div>
    </section>

    <!-- ── Section 2: KYC Flow ─────────────────────────────────────── -->
    <section class="kyc-section" aria-labelledby="kyc-heading">
      <div class="kyc-inner">
        <h2 id="kyc-heading" class="section-h2">Identity verification in 47 seconds.</h2>

        <div class="kyc-flow-svg" aria-label="Payment flow from user through verification stages">
          <PaymentFlowSvg theme="dark" />
        </div>

        <div class="kyc-steps-grid">
          <article class="glass-card kyc-step-card">
            <span class="step-num">01</span>
            <h3 class="kyc-step-title">Document Scan</h3>
            <p class="kyc-step-desc">
              Passport, national ID, or driver's licence scanned and cross-referenced against issuing authority
              records in real time.
            </p>
            <span class="time-badge">~18s</span>
          </article>

          <article class="glass-card kyc-step-card">
            <span class="step-num">02</span>
            <h3 class="kyc-step-title">Liveness Check</h3>
            <p class="kyc-step-desc">
              A short blink-and-smile sequence confirms the document holder is present and not a
              photograph or video replay.
            </p>
            <span class="time-badge">~12s</span>
          </article>

          <article class="glass-card kyc-step-card">
            <span class="step-num">03</span>
            <h3 class="kyc-step-title">Sanctions Screen</h3>
            <p class="kyc-step-desc">
              OFAC, EU, UN, and HMT watchlists checked simultaneously. Results logged with
              timestamp and screening version.
            </p>
            <span class="time-badge">~17s</span>
          </article>
        </div>
      </div>
    </section>

    <!-- ── Particle Field Section ────────────────────────────────────── -->
    <section class="gps-particle-section" aria-labelledby="gps-particle-heading">
      <div class="gps-particle-inner">
        <p class="gps-particle-label" id="gps-particle-heading">PROTECTED AT EVERY LAYER.</p>
        <div class="gps-particle-grid" aria-hidden="true">
          <span
            v-for="i in 20"
            :key="i"
            class="gps-particle-dot"
            :style="{ animationDelay: `${(i - 1) * 0.15}s` }"
          ></span>
        </div>
      </div>
    </section>

    <!-- ── Zero-Knowledge Principles ─────────────────────────────────── -->
    <section class="gps-zk-section" aria-labelledby="gps-zk-heading">
      <div class="gps-zk-inner">
        <h2 id="gps-zk-heading" class="section-h2" data-reveal="fade-up">Zero-knowledge principles.</h2>
        <div class="gps-zk-grid" ref="zkGrid" data-animate-stagger>
          <article class="glass-card gps-zk-card">
            <div class="gps-zk-icon" aria-hidden="true">🔐</div>
            <h3 class="gps-zk-title">We never store card data</h3>
            <p class="gps-zk-desc">PCI DSS tokenization ensures raw PANs never touch Prodigy infrastructure. Payment data is tokenized at the point of capture.</p>
          </article>
          <article class="glass-card gps-zk-card">
            <div class="gps-zk-icon" aria-hidden="true">🔑</div>
            <h3 class="gps-zk-title">PII is tokenized before storage</h3>
            <p class="gps-zk-desc">All personally identifiable information is tokenized before it reaches our databases. The token is what we store — never the plaintext.</p>
          </article>
          <article class="glass-card gps-zk-card">
            <div class="gps-zk-icon" aria-hidden="true">🛡️</div>
            <h3 class="gps-zk-title">Your users' data stays yours</h3>
            <p class="gps-zk-desc">We are a data processor, never a controller. Your users' data is yours. We have no marketing access, ever.</p>
          </article>
        </div>
      </div>
    </section>

    <!-- ── Shield Illustration ──────────────────────────────────── -->
    <section class="grd-shield-section" aria-labelledby="grd-shield-h" data-reveal="fade-up">
      <div class="grd-shield-inner">
        <div class="grd-shield-copy">
          <h2 id="grd-shield-h" class="section-h2">Layered defence, at every level.</h2>
          <p class="section-sub">Three concentric security layers. Infrastructure, compliance, and transaction controls. Each monitors the others.</p>
        </div>
        <div class="grd-shield-vis" aria-hidden="true">
          <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg"
               width="220" height="257" preserveAspectRatio="xMidYMid meet"
               aria-hidden="true" role="img" class="shield-svg">
            <path class="shield-outer" d="M60,8 L108,28 L108,72 C108,100 60,128 60,128 C60,128 12,100 12,72 L12,28 Z"
                  fill="rgba(168,85,247,0.05)" stroke="#a855f7" stroke-width="1.5" />
            <path class="shield-mid" d="M60,19.8 L97.8,36.8 L97.8,73.2 C97.8,97.5 60,121.7 60,121.7 C60,121.7 22.2,97.5 22.2,73.2 L22.2,36.8 Z"
                  fill="rgba(168,85,247,0.09)" stroke="#a855f7" stroke-width="1.5" />
            <path class="shield-inner-path" d="M60,31.6 L87.6,45.6 L87.6,74.4 C87.6,94.8 60,115.4 60,115.4 C60,115.4 32.4,94.8 32.4,74.4 L32.4,45.6 Z"
                  fill="rgba(168,85,247,0.15)" stroke="#a855f7" stroke-width="1.5" />
            <text x="60" y="84" text-anchor="middle" font-size="22" fill="#a855f7">🔒</text>
          </svg>
        </div>
      </div>
    </section>

    <!-- ── Section 3: Certifications ──────────────────────────────── -->
    <section class="certs-section" aria-labelledby="certs-heading">
      <div class="certs-inner">
        <h2 id="certs-heading" class="section-h2">Compliance badges.</h2>
        <p class="section-sub">
          These are demo compliance claims. Real certifications in production.
        </p>

        <div class="certs-grid">
          <article class="glass-card cert-card" v-for="cert in certifications" :key="cert.label">
            <span class="cert-icon" aria-hidden="true">{{ cert.icon }}</span>
            <p class="cert-label">{{ cert.label }}</p>
            <p class="cert-demo">(Demo)</p>
          </article>
        </div>
      </div>
    </section>

    <!-- ── Section 4: Audit Log Terminal ──────────────────────────── -->
    <section class="terminal-section" aria-labelledby="terminal-heading">
      <div class="terminal-inner">
        <h2 id="terminal-heading" class="section-h2">Every event. Every transaction. Logged.</h2>

        <div class="terminal-box" role="log" aria-label="Audit log terminal output" aria-live="off">
          <div class="terminal-topbar" aria-hidden="true">
            <span class="dot dot-red" />
            <span class="dot dot-yellow" />
            <span class="dot dot-green" />
            <span class="terminal-title">audit-log — live</span>
          </div>
          <div class="terminal-scroll-area" aria-hidden="true">
            <div class="terminal-lines">
              <!-- Lines doubled for seamless loop -->
              <p v-for="(line, i) in [...logLines, ...logLines]" :key="i" class="log-line">
                <span class="log-ts">{{ line.ts }}</span>
                <span class="log-event" :class="`event-${line.type}`">{{ line.event }}</span>
                <span class="log-detail">{{ line.detail }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Jurisdiction Callout ─────────────────────────────────────── -->
    <section class="gps-juris-section" aria-labelledby="gps-juris-heading">
      <div class="gps-juris-inner">
        <div class="glass-card gps-grad-border gps-juris-card" data-reveal="fade-up">
          <h2 id="gps-juris-heading" class="section-h2">40+ jurisdictions covered. One integration.</h2>
          <p class="gps-juris-body">Prodigy maintains regulatory registrations so your team doesn't have to.</p>
          <div class="gps-juris-chips" role="list" aria-label="Supported jurisdictions">
            <span class="gps-juris-chip" role="listitem">EU</span>
            <span class="gps-juris-chip" role="listitem">UK</span>
            <span class="gps-juris-chip" role="listitem">USA</span>
            <span class="gps-juris-chip" role="listitem">Singapore</span>
            <span class="gps-juris-chip" role="listitem">Australia</span>
            <span class="gps-juris-chip gps-chip-more" role="listitem">+ 35 more</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Security FAQ ──────────────────────────────────────────────── -->
    <section class="gps-faq-section" aria-labelledby="gps-faq-heading">
      <div class="gps-faq-inner">
        <h2 id="gps-faq-heading" class="section-h2" data-reveal="fade-up">Security questions.</h2>
        <div class="gps-faq-list">
          <details class="gps-faq-item">
            <summary class="gps-faq-summary">Where is data stored?</summary>
            <p class="gps-faq-answer">EU-West is the primary data region. Enterprise customers can configure custom data residency to meet local regulatory requirements.</p>
          </details>
          <details class="gps-faq-item">
            <summary class="gps-faq-summary">Do you store card numbers?</summary>
            <p class="gps-faq-answer">No. Prodigy uses PCI DSS tokenization. Primary Account Numbers (PANs) are never stored on Prodigy infrastructure.</p>
          </details>
          <details class="gps-faq-item">
            <summary class="gps-faq-summary">Can I bring my own KYC provider?</summary>
            <p class="gps-faq-answer">Enterprise tier supports BYO (bring your own) identity provider integration. Contact the sales team for implementation details.</p>
          </details>
          <details class="gps-faq-item">
            <summary class="gps-faq-summary">Is there a bug bounty programme?</summary>
            <p class="gps-faq-answer">Yes. Responsible disclosure and bug bounty details are available at security.prodigy.example.</p>
          </details>
        </div>
      </div>
    </section>

    <!-- ── Section 5: CTA ──────────────────────────────────────────── -->
    <section class="sec-cta" aria-labelledby="sec-cta-heading">
      <div class="blob blob-cta-1" aria-hidden="true" />
      <div class="blob blob-cta-2" aria-hidden="true" />
      <div class="sec-cta-inner">
        <h2 id="sec-cta-heading" class="sec-cta-h2">Test the KYC flow yourself.</h2>
        <a
          href="http://localhost:5003"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-gradient"
        >
          Open simulator →
        </a>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PaymentFlowSvg } from '@/components/shared'
import { useCardTiltAll } from '@/composables/useCardTilt'

const zkGrid = ref<HTMLElement | null>(null)
useCardTiltAll(zkGrid, '.gps-zk-card', { maxTilt: 6, glowColor: '#a855f7', glowIntensity: 0.35 })

const certifications = [
  { icon: '🇪🇺', label: 'MiCA' },
  { icon: '🇬🇧', label: 'FCA' },
  { icon: '💳', label: 'PCI DSS Level 1' },
  { icon: '🔒', label: 'ISO 27001' },
  { icon: '☁️', label: 'SOC 2' },
  { icon: '🛡️', label: 'GDPR' },
]

const logLines = [
  { ts: '[2026-06-18 14:22:01]', event: 'TX_INIT      ', type: 'init',    detail: 'user:anon@partner.app  amount:€850.00' },
  { ts: '[2026-06-18 14:22:03]', event: 'KYC_PASS     ', type: 'pass',    detail: 'doc:verified liveness:pass sanctions:clear' },
  { ts: '[2026-06-18 14:22:04]', event: 'RISK_SCORE   ', type: 'risk',    detail: 'score:12/100 checks:12/12' },
  { ts: '[2026-06-18 14:22:05]', event: 'QUOTE_LOCKED ', type: 'quote',   detail: 'BTC:€58,234 fee:€4.25 net:€845.75' },
  { ts: '[2026-06-18 14:22:06]', event: 'TX_SETTLED   ', type: 'settled', detail: 'txid:PRG-2891-XK partner:acme_001' },
  { ts: '[2026-06-18 14:22:07]', event: 'PAYOUT_QUEUED', type: 'payout',  detail: 'partner_share:€1.70 schedule:monthly' },
]
</script>

<style scoped>
/* ── Design tokens ──────────────────────────────────────────────── */
main {
  background: #0f0a1e;
  color: #fff;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* ── Shared utilities ───────────────────────────────────────────── */
.section-h2 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: 800;
  line-height: 1.15;
  margin: 0 0 1rem;
  text-align: center;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-sub {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  margin: 0 0 3rem;
  line-height: 1.65;
}

.glass-card {
  backdrop-filter: blur(16px);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
}

/* ── Blob ───────────────────────────────────────────────────────── */
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
  pointer-events: none;
}

/* ── Buttons ────────────────────────────────────────────────────── */
.btn-gradient {
  display: inline-flex;
  align-items: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 0.9375rem;
  color: #fff;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  border-radius: 100px;
  padding: 0.875rem 2rem;
  border: none;
  text-decoration: none;
  transition: opacity 0.15s, transform 0.15s;
  white-space: nowrap;
}

.btn-gradient:hover {
  opacity: 0.88;
  transform: translateY(-2px);
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 600;
  font-size: 0.9375rem;
  color: #fff;
  background: transparent;
  border-radius: 100px;
  padding: 0.875rem 2rem;
  border: 2px solid rgba(255, 255, 255, 0.35);
  text-decoration: none;
  transition: border-color 0.15s, background 0.15s;
  white-space: nowrap;
}

.btn-ghost:hover {
  border-color: rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.07);
}

/* ── Focus visible ──────────────────────────────────────────────── */
.btn-gradient:focus-visible,
.btn-ghost:focus-visible {
  outline: 2px solid #a855f7;
  outline-offset: 3px;
}

/* ── Section 1: Hero ────────────────────────────────────────────── */
.sec-hero {
  position: relative;
  overflow: hidden;
  padding: 7rem 1.5rem 6rem;
  text-align: center;
}

.blob-1 {
  width: 480px;
  height: 480px;
  background: #a855f7;
  top: -160px;
  left: -120px;
}

.blob-2 {
  width: 360px;
  height: 360px;
  background: #ec4899;
  top: 40%;
  right: -80px;
}

.blob-3 {
  width: 280px;
  height: 280px;
  background: #7c3aed;
  bottom: -100px;
  left: 40%;
}

.sec-hero-inner {
  position: relative;
  z-index: 1;
  max-width: 820px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
}

.sec-hero-h1 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(2.25rem, 5.5vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  margin: 0;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.sec-hero-sub {
  font-size: 1.0625rem;
  color: rgba(255, 255, 255, 0.75);
  max-width: 56ch;
  line-height: 1.65;
  margin: 0;
}

.sec-hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

/* ── Section 2: KYC Flow ────────────────────────────────────────── */
.kyc-section {
  padding: 5rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.kyc-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.kyc-flow-svg {
  width: 100%;
  max-width: 640px;
  margin: 0 auto 3rem;
}

.kyc-steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  width: 100%;
}

.kyc-step-card {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.step-num {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.kyc-step-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.0625rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.kyc-step-desc {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.65;
  margin: 0;
  flex: 1;
}

.time-badge {
  display: inline-flex;
  align-items: center;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  color: #a855f7;
  background: rgba(168, 85, 247, 0.12);
  border: 1px solid rgba(168, 85, 247, 0.25);
  border-radius: 100px;
  padding: 0.25rem 0.75rem;
  width: fit-content;
}

/* ── Section 3: Certifications ──────────────────────────────────── */
.certs-section {
  padding: 5rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.certs-inner {
  max-width: 1100px;
  margin: 0 auto;
}

.certs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.cert-card {
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
  text-align: center;
  transition: background 0.15s;
}

.cert-card:hover {
  background: rgba(255, 255, 255, 0.08);
}

.cert-icon {
  font-size: 2rem;
  line-height: 1;
}

.cert-label {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.cert-demo {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
  margin: 0;
}

/* ── Section 4: Terminal ────────────────────────────────────────── */
.terminal-section {
  padding: 5rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.terminal-inner {
  max-width: 860px;
  margin: 0 auto;
}

.terminal-box {
  background: #080510;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  margin-top: 2.5rem;
}

.terminal-topbar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.04);
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot-red    { background: #ff5f57; }
.dot-yellow { background: #febc2e; }
.dot-green  { background: #28c840; }

.terminal-title {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
  margin-left: 0.5rem;
}

.terminal-scroll-area {
  height: 240px;
  overflow: hidden;
  position: relative;
}

.terminal-lines {
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  animation: scroll-log 8s linear infinite;
}

@keyframes scroll-log {
  0%   { transform: translateY(0); }
  100% { transform: translateY(-50%); }
}

.log-line {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  line-height: 1.5;
  margin: 0;
  white-space: nowrap;
  display: flex;
  gap: 0.75rem;
}

.log-ts {
  color: rgba(255, 255, 255, 0.35);
  flex-shrink: 0;
}

.log-event {
  font-weight: 700;
  flex-shrink: 0;
}

.event-init    { color: #60a5fa; }
.event-pass    { color: #34d399; }
.event-risk    { color: #fbbf24; }
.event-quote   { color: #a78bfa; }
.event-settled { color: #34d399; }
.event-payout  { color: #f472b6; }

.log-detail {
  color: rgba(255, 255, 255, 0.6);
}

/* ── Section 5: CTA ─────────────────────────────────────────────── */
.sec-cta {
  position: relative;
  overflow: hidden;
  padding: 7rem 1.5rem;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.blob-cta-1 {
  width: 500px;
  height: 500px;
  background: #a855f7;
  top: -200px;
  left: -150px;
}

.blob-cta-2 {
  width: 400px;
  height: 400px;
  background: #ec4899;
  bottom: -160px;
  right: -100px;
}

.sec-cta-inner {
  position: relative;
  z-index: 1;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.sec-cta-h2 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(2rem, 4.5vw, 3.25rem);
  font-weight: 800;
  line-height: 1.1;
  margin: 0;
  color: #fff;
}

/* ── Responsive ─────────────────────────────────────────────────── */
@media (max-width: 900px) {
  .kyc-steps-grid {
    grid-template-columns: 1fr;
  }

  .certs-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .sec-hero-actions {
    flex-direction: column;
    width: 100%;
  }

  .btn-gradient,
  .btn-ghost {
    width: 100%;
    justify-content: center;
  }

  .certs-grid {
    grid-template-columns: 1fr 1fr;
  }

  .log-line {
    font-size: 0.7rem;
  }
}

/* ── Gradient border helper ─────────────────────────────────────── */
.gps-grad-border {
  border: 1px solid transparent !important;
  background: linear-gradient(rgba(15, 10, 30, 0.9), rgba(15, 10, 30, 0.9)) padding-box, linear-gradient(135deg, #a855f7, #ec4899) border-box !important;
}

/* ── Jurisdiction Callout ───────────────────────────────────────── */
.gps-juris-section {
  padding: 5rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}
.gps-juris-inner {
  max-width: 860px;
  margin: 0 auto;
}
.gps-juris-card {
  padding: 2.5rem;
}
.gps-juris-body {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  margin: 0 0 2rem;
  text-align: center;
}
.gps-juris-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  justify-content: center;
}
.gps-juris-chip {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.8125rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  background: rgba(168, 85, 247, 0.12);
  border: 1px solid rgba(168, 85, 247, 0.3);
  border-radius: 100px;
  padding: 0.3125rem 0.875rem;
}
.gps-chip-more {
  background: rgba(236, 72, 153, 0.12);
  border-color: rgba(236, 72, 153, 0.3);
  color: #ec4899;
}

/* ── Security FAQ ───────────────────────────────────────────────── */
.gps-faq-section {
  padding: 5rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}
.gps-faq-inner {
  max-width: 760px;
  margin: 0 auto;
}
.gps-faq-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
}
.gps-faq-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
.gps-faq-item:last-child {
  border-bottom: none;
}
.gps-faq-summary {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #fff;
  padding: 1.25rem 1.5rem;
  cursor: pointer;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.02);
  transition: background 0.15s;
}
.gps-faq-summary::-webkit-details-marker { display: none; }
.gps-faq-summary::after {
  content: '+';
  font-size: 1.25rem;
  color: #a855f7;
  flex-shrink: 0;
  transition: transform 0.15s;
}
.gps-faq-item[open] .gps-faq-summary::after {
  transform: rotate(45deg);
}
.gps-faq-summary:hover {
  background: rgba(168, 85, 247, 0.06);
}
.gps-faq-answer {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.7;
  padding: 0 1.5rem 1.25rem;
  margin: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

/* ── Particle Field ─────────────────────────────────────────────── */
.gps-particle-section {
  padding: 4rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  text-align: center;
}

.gps-particle-inner {
  max-width: 560px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.gps-particle-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  text-transform: uppercase;
}

.gps-particle-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 1rem;
  width: 240px;
  height: 192px;
}

.gps-particle-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  animation: particle-pulse 2s ease-in-out infinite;
  animation-delay: var(--delay, 0s);
  opacity: 0.3;
  transform: scale(0.8);
  justify-self: center;
  align-self: center;
}

@keyframes particle-pulse {
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50%       { opacity: 1;   transform: scale(1.2); }
}

@media (prefers-reduced-motion: reduce) {
  .gps-particle-dot { animation: none; opacity: 0.6; transform: scale(1); }
}

/* ── Zero-Knowledge Principles ──────────────────────────────────── */
.gps-zk-section {
  padding: 5rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.gps-zk-inner {
  max-width: 1100px;
  margin: 0 auto;
}

.gps-zk-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-top: 2.5rem;
}

.gps-zk-card {
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  box-shadow: 0 0 0 1px rgba(168, 85, 247, 0.2), 0 4px 24px rgba(168, 85, 247, 0.1);
  transition: box-shadow 0.2s;
}

.gps-zk-card:hover {
  box-shadow: 0 0 0 1px rgba(168, 85, 247, 0.4), 0 8px 32px rgba(168, 85, 247, 0.2);
}

.gps-zk-icon {
  font-size: 2rem;
  line-height: 1;
}

.gps-zk-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.0625rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  line-height: 1.3;
}

.gps-zk-desc {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.65;
  margin: 0;
  flex: 1;
}

@media (max-width: 768px) {
  .gps-zk-grid { grid-template-columns: 1fr; }
}

/* ── Reduced motion ─────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .terminal-lines {
    animation: none;
  }

  .btn-gradient:hover,
  .btn-ghost:hover {
    transform: none;
  }

  .shield-outer, .shield-mid, .shield-inner-path { animation: none; opacity: 1; }
}

/* ── Shield SVG ── */
.grd-shield-section { background: rgba(168,85,247,0.04); border-top: 1px solid rgba(168,85,247,0.15); border-bottom: 1px solid rgba(168,85,247,0.15); padding: 5rem 0; }
.grd-shield-inner { max-width: 1200px; margin: 0 auto; padding: 0 2rem; display: grid; grid-template-columns: 1fr auto; gap: 4rem; align-items: center; }
.grd-shield-copy { display: flex; flex-direction: column; gap: 1rem; }
.grd-shield-vis { display: flex; justify-content: center; align-items: center; }
.shield-outer { animation: shield-outer-anim 4s ease-in-out infinite; }
.shield-mid { animation: shield-mid-anim 3s ease-in-out 0.5s infinite; }
.shield-inner-path { animation: shield-inner-anim 2.5s ease-in-out 1s infinite; }
@keyframes shield-outer-anim { 0%,100%{opacity:0.3} 50%{opacity:0.7} }
@keyframes shield-mid-anim { 0%,100%{opacity:0.5} 50%{opacity:0.9} }
@keyframes shield-inner-anim { 0%,100%{opacity:0.7} 50%{opacity:1} }
@media (max-width: 700px) {
  .grd-shield-inner { grid-template-columns: 1fr; }
  .grd-shield-vis { padding-top: 1.5rem; }
}
</style>
