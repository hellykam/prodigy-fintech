<template>
  <main>

    <!-- ── Hero ─────────────────────────────────────────────────── -->
    <section class="hero" aria-labelledby="dev-headline">
      <!-- Decorative circuit-node diagram -->
      <svg class="circuit-bg" viewBox="0 0 220 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <!-- Lines -->
        <line x1="40" y1="70" x2="110" y2="30" stroke="#34d399" stroke-width="1" stroke-dasharray="4 4" opacity="0.35" class="circuit-line"/>
        <line x1="110" y1="30" x2="180" y2="70" stroke="#34d399" stroke-width="1" stroke-dasharray="4 4" opacity="0.35" class="circuit-line"/>
        <line x1="40" y1="70" x2="110" y2="110" stroke="#34d399" stroke-width="1" stroke-dasharray="4 4" opacity="0.35" class="circuit-line"/>
        <line x1="110" y1="110" x2="180" y2="70" stroke="#34d399" stroke-width="1" stroke-dasharray="4 4" opacity="0.35" class="circuit-line"/>
        <line x1="110" y1="30" x2="110" y2="110" stroke="#34d399" stroke-width="1" stroke-dasharray="2 6" opacity="0.2" class="circuit-line"/>
        <!-- Nodes -->
        <circle cx="40" cy="70" r="5" fill="#34d399" opacity="0.7" class="circuit-node circuit-node--1"/>
        <circle cx="110" cy="30" r="7" fill="#34d399" opacity="0.9" class="circuit-node circuit-node--2"/>
        <circle cx="180" cy="70" r="5" fill="#34d399" opacity="0.7" class="circuit-node circuit-node--3"/>
        <circle cx="110" cy="110" r="4" fill="#34d399" opacity="0.5" class="circuit-node circuit-node--1"/>
        <!-- Outer rings -->
        <circle cx="110" cy="30" r="14" stroke="#34d399" stroke-width="0.75" opacity="0.25" class="circuit-ring"/>
        <circle cx="40" cy="70" r="10" stroke="#34d399" stroke-width="0.75" opacity="0.2" class="circuit-ring"/>
      </svg>
      <div class="section-inner hero-inner">
        <p class="label eyebrow">DEVELOPER DOCUMENTATION</p>
        <h1 id="dev-headline" class="hero-headline">
          <span class="line" ref="heroTwRef">ONE SCRIPT TAG.</span>
          <span class="line iris-text">HERE'S WHAT IT DOES.</span>
        </h1>
        <p class="hero-sub">
          The complete integration guide, minus the parts where documentation usually lies. You'll be done before lunch.
        </p>
      </div>
    </section>

    <!-- ── Quick Start ───────────────────────────────────────────── -->
    <section class="quickstart-section" aria-labelledby="qs-h">
      <div class="section-inner">
        <div class="section-header">
          <p class="label eyebrow">01 / Quick Start</p>
          <h2 id="qs-h" class="section-headline">THE ENTIRE INTEGRATION</h2>
        </div>
        <p class="section-intro">This is not a simplified example. This is the actual code. Copy it. Paste it. Change the attribute values. You're done.</p>

        <div class="code-card" role="region" aria-label="Embed code example" data-reveal="fade-up">
          <div class="code-header">
            <span class="code-label font-mono">embed.html</span>
            <button class="copy-btn font-mono" @click="handleCopy" aria-label="Copy embed code">
              {{ copied ? 'COPIED ✓' : 'COPY' }}
            </button>
          </div>
          <pre class="code-block" aria-label="Script embed code"><code><span class="c">&lt;!-- Add this to your platform --&gt;</span>
<span class="t">&lt;script</span>
  <span class="a">src</span>=<span class="s">"https://cdn.prodigy.io/widget/v2/embed.js"</span>
  <span class="a">data-client-id</span>=<span class="s">"YOUR_CLIENT_ID"</span>
  <span class="a">data-currency</span>=<span class="s">"BTC"</span>
  <span class="a">data-partner-share</span>=<span class="s">"0.002"</span>
  <span class="a">data-theme</span>=<span class="s">"light"</span>
  <span class="a">data-locale</span>=<span class="s">"en"</span>
  <span class="a">data-container</span>=<span class="s">"#prodigy-widget"</span>
  <span class="a">async</span>
<span class="t">&gt;&lt;/script&gt;</span>

<span class="c">&lt;!-- Widget mounts here --&gt;</span>
<span class="t">&lt;div</span> <span class="a">id</span>=<span class="s">"prodigy-widget"</span><span class="t">&gt;&lt;/div&gt;</span><span class="cursor-blink" aria-hidden="true"></span></code></pre>
        </div>

        <div class="demo-links">
          <a href="http://localhost:5005" target="_blank" rel="noopener noreferrer" class="demo-pill">↗ Live widget demo (localhost:5005)</a>
          <a href="http://localhost:5006" target="_blank" rel="noopener noreferrer" class="demo-pill">↗ Partner portal (localhost:5006)</a>
        </div>
      </div>
    </section>

    <!-- ── Config Reference ──────────────────────────────────────── -->
    <section class="config-section" aria-labelledby="config-h">
      <div class="section-inner">
        <div class="section-header">
          <p class="label eyebrow">02 / Configuration</p>
          <h2 id="config-h" class="section-headline">ALL DATA-* ATTRIBUTES</h2>
        </div>
        <div class="config-table" role="table" aria-label="Configuration attributes" data-animate-stagger>
          <div class="config-head" role="row">
            <span role="columnheader">Attribute</span>
            <span role="columnheader">Required</span>
            <span role="columnheader">Default</span>
            <span role="columnheader">Values</span>
          </div>
          <div v-for="attr in configAttrs" :key="attr.name" class="config-row" role="row">
            <span class="font-mono attr-name" role="cell">{{ attr.name }}</span>
            <span class="attr-req" role="cell" :class="attr.required ? 'required' : 'optional'">{{ attr.required ? 'Required' : 'Optional' }}</span>
            <span class="font-mono attr-default" role="cell">{{ attr.default }}</span>
            <span class="attr-values" role="cell">{{ attr.values }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Webhook Events ────────────────────────────────────────── -->
    <section class="webhook-section" aria-labelledby="wh-h">
      <div class="section-inner">
        <div class="section-header">
          <p class="label eyebrow">03 / Webhooks</p>
          <h2 id="wh-h" class="section-headline">EVENTS YOUR SERVER WILL RECEIVE</h2>
        </div>
        <p class="section-intro">Register your webhook endpoint in the admin console. All events are delivered over HTTPS with an HMAC-SHA256 signature in the <code class="inline-code">X-Prodigy-Signature</code> header.</p>
        <div class="webhook-table" role="table" aria-label="Webhook events" data-animate-stagger>
          <div class="webhook-head" role="row">
            <span role="columnheader">Event</span>
            <span role="columnheader">When fired</span>
            <span role="columnheader">Key payload fields</span>
          </div>
          <div v-for="ev in webhookEvents" :key="ev.name" class="webhook-row" role="row">
            <span class="font-mono event-name" role="cell">{{ ev.name }}</span>
            <span class="event-when" role="cell">{{ ev.when }}</span>
            <span class="font-mono event-payload" role="cell">{{ ev.payload }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── API Endpoints ─────────────────────────────────────────── -->
    <section class="api-section" aria-labelledby="api-h">
      <div class="section-inner">
        <div class="section-header">
          <p class="label eyebrow">04 / API Endpoints</p>
          <h2 id="api-h" class="section-headline">THE ENDPOINTS THAT MATTER</h2>
        </div>
        <p class="section-intro">Base URL: <code class="inline-code">https://api.prodigy.io/v2</code>. All requests require <code class="inline-code">Authorization: Bearer YOUR_API_KEY</code>.</p>
        <div class="endpoints-list" data-reveal="fade-up">
          <div v-for="ep in endpoints" :key="ep.path" class="endpoint-card">
            <div class="ep-header">
              <span class="ep-method font-mono" :class="`method-${ep.method.toLowerCase()}`">{{ ep.method }}</span>
              <span class="ep-path font-mono">{{ ep.path }}</span>
            </div>
            <p class="ep-desc">{{ ep.desc }}</p>
            <div class="ep-response">
              <p class="label" style="margin-bottom:0.5rem;font-size:0.7rem">Response shape</p>
              <code class="font-mono ep-shape">{{ ep.shape }}</code>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── SDK Grid ─────────────────────────────────────────────── -->
    <section class="sdk-section" aria-labelledby="sdk-h">
      <div class="section-inner">
        <p class="label eyebrow" data-reveal="fade-up">SDKS &amp; LIBRARIES</p>
        <h2 id="sdk-h" class="section-headline" data-reveal="fade-up">SDKS &amp; LIBRARIES</h2>
        <div class="sdk-grid" data-animate-stagger>
          <article class="sdk-card">
            <p class="sdk-name">@prodigy/react</p>
            <p class="sdk-runtime">React 18+, Next.js 14+</p>
            <code class="sdk-install">npm install @prodigy/react</code>
          </article>
          <article class="sdk-card">
            <p class="sdk-name">@prodigy/vue</p>
            <p class="sdk-runtime">Vue 3, Nuxt 3</p>
            <code class="sdk-install">npm install @prodigy/vue</code>
          </article>
          <article class="sdk-card">
            <p class="sdk-name">@prodigy/react-native</p>
            <p class="sdk-runtime">iOS + Android</p>
            <code class="sdk-install">npm install @prodigy/react-native</code>
          </article>
          <article class="sdk-card">
            <p class="sdk-name">prodigy-ios</p>
            <p class="sdk-runtime">Swift, SwiftUI</p>
            <code class="sdk-install">pod 'ProdigySDK'</code>
          </article>
          <article class="sdk-card">
            <p class="sdk-name">prodigy-android</p>
            <p class="sdk-runtime">Kotlin, Jetpack Compose</p>
            <code class="sdk-install">implementation 'io.prodigy:sdk:2.1.0'</code>
          </article>
          <article class="sdk-card">
            <p class="sdk-name">Vanilla JS</p>
            <p class="sdk-runtime">ES module, UMD</p>
            <code class="sdk-install">&lt;script src="https://cdn.prodigy.example/widget.js"&gt;</code>
          </article>
        </div>
      </div>
    </section>

    <!-- ── SDK Stats ───────────────────────────────────────────── -->
    <div class="sdk-stats" data-animate-stagger>
      <div class="sdk-stat-item">
        <span class="sdk-stat-val">2.1M+</span>
        <span class="sdk-stat-label">Weekly downloads</span>
      </div>
      <div class="sdk-stat-item">
        <span class="sdk-stat-val">4.9★</span>
        <span class="sdk-stat-label">npm rating</span>
      </div>
      <div class="sdk-stat-item">
        <span class="sdk-stat-val">MIT</span>
        <span class="sdk-stat-label">License</span>
      </div>
      <div class="sdk-stat-item">
        <span class="sdk-stat-val">v3.4.1</span>
        <span class="sdk-stat-label">Latest stable</span>
      </div>
    </div>

    <!-- ── API Explorer ─────────────────────────────────────────── -->
    <section class="api-explorer" aria-labelledby="api-explorer-h" data-reveal="fade-up">
      <div class="api-inner">
        <h2 id="api-explorer-h" class="api-headline section-headline">API REFERENCE.</h2>
        <div class="api-explorer-wrap">
          <div class="api-endpoints" role="tablist">
            <button
              v-for="ep in apiEndpoints"
              :key="ep.id"
              class="api-ep-btn"
              :class="{ active: activeEp === ep.id }"
              role="tab"
              :aria-selected="activeEp === ep.id"
              @click="activeEp = ep.id"
            >
              <span class="api-method" :class="`method-${ep.method.toLowerCase()}`">{{ ep.method }}</span>
              <span class="api-path">{{ ep.path }}</span>
            </button>
          </div>
          <div class="api-response" role="tabpanel" aria-live="polite">
            <div class="api-response-header">
              <span class="api-status">200 OK</span>
              <span class="api-response-label">Response</span>
            </div>
            <pre class="api-code">{{ currentEndpoint.response }}</pre>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Webhook Event Reference ──────────────────────────────── -->
    <section class="webhook-ref-section" aria-labelledby="webhook-ref-h" data-reveal="fade-up">
      <div class="section-inner">
        <div class="section-header">
          <p class="label eyebrow">WEBHOOK EVENTS</p>
          <h2 id="webhook-ref-h" class="section-headline">EVENTS YOUR SERVER RECEIVES</h2>
        </div>
        <div class="webhook-events" data-animate-stagger>
          <div v-for="ev in webhookEventsNew" :key="ev.name" class="webhook-event-row">
            <code class="webhook-name">{{ ev.name }}</code>
            <span class="webhook-desc">{{ ev.desc }}</span>
            <span class="webhook-payload">{{ ev.payload }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Sandbox Section ──────────────────────────────────────── -->
    <section class="sandbox-section" aria-labelledby="sandbox-h">
      <div class="section-inner">
        <p class="label eyebrow" data-reveal="fade-up">SANDBOX</p>
        <h2 id="sandbox-h" class="section-headline" data-reveal="fade-up">SANDBOX ENVIRONMENT</h2>
        <p class="sandbox-intro">Full sandbox. Real KYC flows. No real money. Test every edge case before you touch production.</p>
        <ul class="sandbox-list" data-reveal="fade-up">
          <li class="sandbox-item"><span class="sandbox-bullet" aria-hidden="true">◈</span>Separate API keys per environment</li>
          <li class="sandbox-item"><span class="sandbox-bullet" aria-hidden="true">◈</span>Pre-loaded test identities (pass / fail / pending states)</li>
          <li class="sandbox-item"><span class="sandbox-bullet" aria-hidden="true">◈</span>Webhook replay and inspection tool</li>
        </ul>
        <a href="http://localhost:5005" target="_blank" rel="noopener noreferrer" class="sandbox-cta">OPEN SANDBOX →</a>
      </div>
    </section>

    <!-- ── Rate Limits ─────────────────────────────────────────── -->
    <section class="rate-limits" aria-labelledby="rate-h" data-reveal="fade-up">
      <div class="rl-inner">
        <h2 id="rate-h" class="rl-headline section-headline">RATE LIMITS.</h2>
        <div class="rl-table-wrap">
          <table class="rl-table" role="table">
            <thead>
              <tr>
                <th scope="col">Endpoint group</th>
                <th scope="col">Limit</th>
                <th scope="col">Window</th>
                <th scope="col">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in rateLimitsTable" :key="row.group">
                <td><code>{{ row.group }}</code></td>
                <td class="rl-limit">{{ row.limit }}</td>
                <td>{{ row.window }}</td>
                <td class="rl-note">{{ row.notes }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="rl-footnote">Limits apply per API key. Contact support to request higher limits for production workloads.</p>
      </div>
    </section>

    <!-- ── Changelog ────────────────────────────────────────────── -->
    <section class="changelog" aria-labelledby="changelog-h" data-reveal="fade-up">
      <div class="changelog-inner">
        <h2 id="changelog-h" class="changelog-headline section-headline">CHANGELOG.</h2>
        <div class="changelog-list" data-animate-stagger>
          <div v-for="entry in changelog" :key="entry.version" class="changelog-entry">
            <div class="cl-meta">
              <span class="cl-version">{{ entry.version }}</span>
              <span class="cl-date">{{ entry.date }}</span>
              <span class="cl-type" :class="`cl-type--${entry.type}`">{{ entry.type }}</span>
            </div>
            <p class="cl-desc">{{ entry.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CTA ──────────────────────────────────────────────────── -->
    <section class="cta-dark" aria-labelledby="cta-h">
      <div class="cta-iris-bar iris-stripe" aria-hidden="true" />
      <div class="section-inner cta-inner">
        <div class="cta-content">
          <p class="label" style="color:rgba(255,255,255,0.65)">Ready to integrate</p>
          <h2 id="cta-h" class="cta-headline">OPEN THE DEMO. SEE IT RUNNING.</h2>
          <p class="cta-micro">The widget is live. The API is live. The audit trail is live. No mock server required.</p>
        </div>
        <div class="cta-actions">
          <a href="http://localhost:5005" target="_blank" rel="noopener noreferrer" class="cta-btn cta-btn--primary">Widget demo →</a>
          <a href="http://localhost:5006" target="_blank" rel="noopener noreferrer" class="cta-btn cta-btn--secondary">Partner portal →</a>
          <a href="http://localhost:5002" target="_blank" rel="noopener noreferrer" class="cta-btn cta-btn--secondary">Admin console →</a>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTypewriter } from '@/composables/useTypewriter'

const copied = ref(false)
const heroTwRef = ref<HTMLElement | null>(null)
useTypewriter(heroTwRef, { speed: 28, delay: 300, cursor: true })

function handleCopy() {
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

const configAttrs = [
  { name: 'data-client-id', required: true, default: '—', values: 'Your client ID from the admin console' },
  { name: 'data-currency', required: false, default: 'BTC', values: 'BTC · ETH · USDT · SOL' },
  { name: 'data-partner-share', required: false, default: '0.002', values: '0.001 – 0.005 (0.1%–0.5%)' },
  { name: 'data-theme', required: false, default: 'light', values: 'light · dark · auto' },
  { name: 'data-locale', required: false, default: 'en', values: 'en · de · fr' },
  { name: 'data-container', required: false, default: '#prodigy-widget', values: 'Any valid CSS selector' },
]

const webhookEvents = [
  { name: 'transaction.initiated', when: 'User confirms amount, before KYC', payload: '{ transaction_id, amount_eur, currency, partner_id }' },
  { name: 'kyc.started', when: 'KYC flow opens for first-time user', payload: '{ transaction_id, kyc_session_id }' },
  { name: 'kyc.completed', when: 'KYC result returned', payload: '{ transaction_id, kyc_status, risk_score }' },
  { name: 'transaction.settled', when: 'Crypto lands in destination wallet', payload: '{ transaction_id, amount_crypto, fee_breakdown, outcome }' },
  { name: 'partner.commission_posted', when: 'Partner share credited to portal', payload: '{ transaction_id, partner_id, commission_eur, cumulative_eur }' },
]

// ── API Explorer ─────────────────────────────────────────────────
interface ApiEndpoint { id: string; method: 'GET' | 'POST' | 'DELETE'; path: string; response: string }
const apiEndpoints: ApiEndpoint[] = [
  {
    id: 'init',
    method: 'POST',
    path: '/v1/sessions',
    response: `{\n  "session_id": "ses_abc123",\n  "widget_url": "https://widget.prodigy.example",\n  "expires_at": "2025-06-17T10:30:00Z",\n  "status": "active"\n}`,
  },
  {
    id: 'kyc',
    method: 'GET',
    path: '/v1/kyc/:user_id',
    response: `{\n  "user_id": "usr_xyz789",\n  "status": "approved",\n  "tier": 2,\n  "check_duration_ms": 44200,\n  "passed_at": "2025-06-17T09:12:31Z"\n}`,
  },
  {
    id: 'tx',
    method: 'POST',
    path: '/v1/transactions',
    response: `{\n  "tx_id": "tx_def456",\n  "amount_fiat": 250.00,\n  "currency": "EUR",\n  "crypto": "BTC",\n  "crypto_amount": 0.00429,\n  "fee": 1.25,\n  "status": "settled"\n}`,
  },
  {
    id: 'fees',
    method: 'GET',
    path: '/v1/fees/estimate',
    response: `{\n  "base_fee_pct": 0.50,\n  "partner_override": null,\n  "network_fee_est": "€0.40",\n  "total_fee_est": "€1.65",\n  "effective_rate": "0.66%"\n}`,
  },
  {
    id: 'webhook',
    method: 'POST',
    path: '/v1/webhooks',
    response: `{\n  "webhook_id": "wh_ghi012",\n  "url": "https://yourapp.com/hooks",\n  "events": ["tx.settled", "kyc.approved"],\n  "secret": "whsec_...",\n  "active": true\n}`,
  },
]
const activeEp = ref<string>('init')
const currentEndpoint = computed(() => apiEndpoints.find(e => e.id === activeEp.value) ?? apiEndpoints[0]!)

// ── Webhook Events ────────────────────────────────────────────────
const webhookEventsNew = [
  { name: 'kyc.approved',     desc: 'Identity verified',      payload: '{ user_id, tier, duration_ms }' },
  { name: 'kyc.failed',       desc: 'Verification failed',    payload: '{ user_id, reason, retry_at }' },
  { name: 'tx.initiated',     desc: 'Transaction started',    payload: '{ tx_id, amount, currency }' },
  { name: 'tx.settled',       desc: 'Funds settled',          payload: '{ tx_id, crypto_amount, fee }' },
  { name: 'partner.earned',   desc: 'Revenue share credited', payload: '{ partner_id, amount, period }' },
  { name: 'compliance.alert', desc: 'AML flag raised',        payload: '{ alert_id, severity, tx_id }' },
]

const changelog = [
  { version: 'v3.4.1', date: '2025-06-10', type: 'patch',  desc: 'Fixed edge case in KYC status polling when user disconnects mid-flow.' },
  { version: 'v3.4.0', date: '2025-05-28', type: 'minor',  desc: 'Added webhook retry configuration. Partners can now set retry window 1–72h.' },
  { version: 'v3.3.0', date: '2025-05-12', type: 'minor',  desc: 'React Native SDK now supports biometric KYC passthrough for iOS 16+.' },
  { version: 'v3.2.1', date: '2025-04-30', type: 'patch',  desc: 'Performance: widget bundle reduced by 18% via tree-shaking improvements.' },
  { version: 'v3.2.0', date: '2025-04-14', type: 'minor',  desc: 'New /v1/fees/estimate endpoint. Returns real-time fee breakdown before transaction.' },
  { version: 'v3.1.0', date: '2025-03-25', type: 'major',  desc: 'MiCA readiness update: added Article 45 disclosure support and audit trail export.' },
]

const rateLimitsTable = [
  { group: '/v1/sessions',     limit: '200 req',   window: 'per minute', notes: 'Per partner API key' },
  { group: '/v1/kyc',          limit: '60 req',    window: 'per minute', notes: 'Includes polling' },
  { group: '/v1/transactions', limit: '500 req',   window: 'per minute', notes: 'Burst up to 1k/min' },
  { group: '/v1/fees',         limit: '1,000 req', window: 'per minute', notes: 'Read-only, generous' },
  { group: '/v1/webhooks',     limit: '30 req',    window: 'per minute', notes: 'Config changes only' },
  { group: 'Global',           limit: '5,000 req', window: 'per minute', notes: 'Across all endpoints' },
]

const endpoints = [
  {
    method: 'GET',
    path: '/widget/quote',
    desc: 'Returns a live rate and full fee breakdown for a given amount and currency pair. Rates expire after 30 seconds.',
    shape: '{ rate, fee_platform, fee_network, fee_partner, amount_crypto, expires_at }',
  },
  {
    method: 'POST',
    path: '/widget/transaction',
    desc: 'Initiates a transaction after user confirmation. Returns a transaction ID and initial status. KYC will be triggered if not already passed.',
    shape: '{ transaction_id, status, kyc_required, estimated_settlement_ms }',
  },
  {
    method: 'GET',
    path: '/partner/revenue',
    desc: 'Returns aggregated partner revenue for the authenticated partner. Supports date range filtering via ?from=&to= query params.',
    shape: '{ total_eur, transaction_count, period_from, period_to, items[] }',
  },
  {
    method: 'GET',
    path: '/admin/transactions',
    desc: 'Returns the full transaction ledger with KYC status, risk scores, and outcome for all transactions under the authenticated account.',
    shape: '{ total, page, items[{ transaction_id, status, kyc_status, risk_score, amount_eur, outcome }] }',
  },
]
</script>

<style scoped>
.section-inner { max-width: 1440px; margin: 0 auto; padding: 5rem 1.5rem; }

/* ── Circuit diagram ── */
.circuit-bg {
  position: absolute; right: 3vw; top: 50%; transform: translateY(-50%);
  width: clamp(140px, 18vw, 220px); opacity: 0.55; pointer-events: none;
  z-index: 0;
}
.circuit-node { animation: node-pulse 2.5s ease-in-out infinite; }
.circuit-node--1 { animation-delay: 0s; }
.circuit-node--2 { animation-delay: 0.8s; }
.circuit-node--3 { animation-delay: 1.6s; }
@keyframes node-pulse {
  0%, 100% { opacity: 0.55; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.25); }
}
.circuit-ring { animation: ring-fade 3s ease-in-out infinite; }
@keyframes ring-fade { 0%,100%{opacity:0.2} 50%{opacity:0.5} }

.hero { border-bottom: 1px solid var(--ink); position: relative; overflow: hidden; }
.hero-inner { display: flex; flex-direction: column; gap: 2rem; padding-top: 6rem; padding-bottom: 6rem; position: relative; z-index: 1; }
.hero-headline { display: flex; flex-direction: column; margin: 0; }
.line {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: 900; line-height: 0.92;
  letter-spacing: -0.02em; text-transform: uppercase;
}
.hero-sub { font-size: 1.125rem; line-height: 1.6; color: var(--ink-mid); max-width: 48ch; margin: 0; }

.section-header { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2.5rem; }
.section-headline { font-family: 'Barlow Condensed', sans-serif; font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 900; line-height: 1; letter-spacing: -0.02em; text-transform: uppercase; margin: 0; }
.section-intro { font-size: 1rem; line-height: 1.7; color: var(--ink-mid); max-width: 60ch; margin: 0 0 2.5rem; }

/* Code card */
.quickstart-section { border-bottom: 1px solid var(--ink); background: #fafafa; }
.code-card { border: 1px solid var(--ink); background: #0a0a0a; margin-bottom: 2rem; }
.code-header { display: flex; justify-content: space-between; align-items: center; padding: 0.625rem 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); }
.code-label { font-size: 0.75rem; letter-spacing: 0.08em; color: rgba(255,255,255,0.5); }
.copy-btn {
  font-size: 0.75rem; letter-spacing: 0.1em; background: none; border: 1px solid rgba(255,255,255,0.2);
  color: rgba(255,255,255,0.7); padding: 0.25rem 0.75rem; cursor: pointer; transition: border-color 0.15s, color 0.15s;
}
.copy-btn:hover { border-color: rgba(255,255,255,0.6); color: #fff; }
.code-block { margin: 0; padding: 1.5rem 1rem; overflow-x: auto; font-family: 'Space Mono', monospace; font-size: 0.8125rem; line-height: 1.8; }
.c { color: #6b7280; }
.t { color: #93c5fd; }
.a { color: #a5b4fc; }
.s { color: #86efac; }
.inline-code { font-family: 'Space Mono', monospace; font-size: 0.8125rem; background: #f0f0f0; padding: 0.1em 0.4em; }

.demo-links { display: flex; gap: 0.75rem; flex-wrap: wrap; }
.demo-pill {
  font-family: 'Space Mono', monospace; font-size: 0.75rem; letter-spacing: 0.06em;
  color: var(--ink-mid); text-decoration: none; border: 1px solid var(--ink-mid); padding: 0.375rem 0.875rem;
  transition: color 0.15s, border-color 0.15s;
}
.demo-pill:hover { color: var(--ink); border-color: var(--ink); }

/* Config table */
.config-section { border-bottom: 1px solid var(--ink); }
.config-table { border: 1px solid var(--line); }
.config-head {
  display: grid; grid-template-columns: 14rem 7rem 8rem 1fr;
  background: var(--ink); color: var(--paper);
  font-family: 'Space Mono', monospace; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;
  padding: 0.75rem 1rem; gap: 1rem;
}
.config-row {
  display: grid; grid-template-columns: 14rem 7rem 8rem 1fr;
  padding: 0.75rem 1rem; gap: 1rem; border-top: 1px solid var(--line);
  font-family: 'Space Mono', monospace; font-size: 0.8125rem; align-items: start;
  transition: background 0.15s;
}
.config-row:hover { background: #f5f5f5; }
.attr-name { font-size: 0.75rem; font-weight: 700; }
.attr-req { font-size: 0.75rem; }
.required { color: #1a7a3c; font-weight: 700; }
.optional { color: var(--ink-muted); }
.attr-default { font-size: 0.75rem; color: var(--ink-muted); }
.attr-values { font-size: 0.8125rem; color: var(--ink-mid); line-height: 1.5; }

/* Webhook */
.webhook-section { border-bottom: 1px solid var(--ink); background: #fafafa; }
.webhook-table { border: 1px solid var(--line); }
.webhook-head {
  display: grid; grid-template-columns: 16rem 1fr 1fr;
  background: var(--ink); color: var(--paper);
  font-family: 'Space Mono', monospace; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;
  padding: 0.75rem 1rem; gap: 1rem;
}
.webhook-row {
  display: grid; grid-template-columns: 16rem 1fr 1fr;
  padding: 0.875rem 1rem; gap: 1rem; border-top: 1px solid var(--line);
  align-items: start; transition: background 0.15s;
}
.webhook-row:hover { background: #f0f0f0; }
.event-name { font-size: 0.75rem; font-weight: 700; color: var(--ink); }
.event-when { font-family: 'Space Mono', monospace; font-size: 0.8125rem; color: var(--ink-mid); line-height: 1.5; }
.event-payload { font-size: 0.75rem; color: var(--ink-muted); line-height: 1.6; word-break: break-all; }

/* API */
.api-section { border-bottom: 1px solid var(--ink); }
.endpoints-list { display: flex; flex-direction: column; gap: 0; border: 1px solid var(--line); }
.endpoint-card { padding: 1.5rem; border-bottom: 1px solid var(--line); transition: background 0.15s; }
.endpoint-card:last-child { border-bottom: none; }
.endpoint-card:hover { background: #fafafa; }
.ep-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.75rem; }
.ep-method { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em; padding: 0.2rem 0.625rem; border: 1.5px solid; }
.method-get { color: #1a7a3c; border-color: #1a7a3c; }
.method-post { color: #1e40af; border-color: #1e40af; }
.ep-path { font-size: 0.9rem; font-weight: 700; color: var(--ink); }
.ep-desc { font-family: 'Space Mono', monospace; font-size: 0.8125rem; line-height: 1.65; color: var(--ink-mid); margin: 0 0 1rem; max-width: 56ch; }
.ep-response { background: #f5f5f5; padding: 0.75rem 1rem; border-left: 2px solid var(--line); }
.ep-shape { font-size: 0.75rem; color: var(--ink-mid); word-break: break-all; line-height: 1.6; display: block; }

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

/* ── Blinking cursor ── */
.cursor-blink {
  display: inline-block; width: 2px; height: 1em;
  background: #86efac; animation: blink 1s step-end infinite;
  margin-left: 1px; vertical-align: text-bottom;
}
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

.font-mono { font-family: 'Space Mono', monospace; }
.label { font-family: 'Space Mono', monospace; font-size: 0.8125rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--ink-mid); }
.eyebrow { margin: 0; }
.iris-text { background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe, #667eea); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: iris-shift 5s linear infinite; }
.iris-stripe { animation: iris-shift 5s linear infinite; }

@media (max-width: 900px) {
  .config-head, .config-row { grid-template-columns: 12rem 6rem 1fr; }
  .config-head span:nth-child(3), .config-row span:nth-child(3) { display: none; }
  .webhook-head, .webhook-row { grid-template-columns: 14rem 1fr; }
  .webhook-head span:last-child, .webhook-row span:last-child { display: none; }
  .cta-inner { grid-template-columns: 1fr; gap: 2.5rem; }
}

@media (max-width: 600px) {
  .config-head, .config-row { grid-template-columns: 1fr; }
  .config-head span:not(:first-child), .config-row span:not(:first-child) { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .cta-iris-bar, .iris-text { animation: none; }
  .cursor-blink { animation: none; opacity: 1; }
}

/* ── New: SDK Grid ── */
.sdk-section { border-bottom: 1px solid var(--ink); background: #fafafa; }
.section-headline {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 900;
  line-height: 1; letter-spacing: -0.02em; text-transform: uppercase; margin: 0.75rem 0 0;
}
.sdk-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  border: 1px solid #e5e7eb; margin-top: 2.5rem;
}
.sdk-card {
  padding: 1.75rem 1.5rem; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb;
  display: flex; flex-direction: column; gap: 0.5rem;
  background: var(--paper); transition: background 0.15s;
}
.sdk-card:hover { background: #f5f5f5; }
.sdk-card:nth-child(3n) { border-right: none; }
.sdk-card:nth-last-child(-n+3) { border-bottom: none; }
.sdk-name {
  font-family: 'Space Mono', monospace; font-size: 0.875rem;
  font-weight: 700; color: var(--ink); margin: 0;
}
.sdk-runtime {
  font-family: 'Space Mono', monospace; font-size: 0.75rem;
  color: var(--ink-muted); margin: 0;
}
.sdk-install {
  display: block; font-family: 'Space Mono', monospace;
  font-size: 0.75rem; color: #34d399; background: #0a0a0a;
  padding: 0.375rem 0.625rem; margin-top: 0.25rem;
  word-break: break-all; line-height: 1.5;
}

/* ── New: Sandbox ── */
.sandbox-section { border-bottom: 1px solid var(--ink); background: var(--paper); }
.sandbox-intro {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.0625rem; line-height: 1.65; color: var(--ink-mid);
  max-width: 52ch; margin: 1.5rem 0 2rem;
}
.sandbox-list {
  list-style: none; margin: 0 0 2rem; padding: 0;
  display: flex; flex-direction: column;
  border: 1px solid #e5e7eb;
}
.sandbox-item {
  display: flex; align-items: flex-start; gap: 0.875rem;
  font-family: 'Space Mono', monospace; font-size: 0.8125rem;
  line-height: 1.6; padding: 0.875rem 1.25rem;
  border-bottom: 1px solid #e5e7eb; color: var(--ink-mid);
}
.sandbox-item:last-child { border-bottom: none; }
.sandbox-bullet { color: #34d399; flex-shrink: 0; font-size: 0.75rem; margin-top: 2px; }
.sandbox-cta {
  display: inline-block;
  font-family: 'Space Mono', monospace; font-size: 0.8125rem;
  font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--paper); background: var(--ink);
  text-decoration: none; padding: 0.875rem 1.75rem;
  border: 1.5px solid var(--ink); transition: background 0.15s, color 0.15s;
}
.sandbox-cta:hover { background: var(--paper); color: var(--ink); }

@media (max-width: 900px) {
  .sdk-grid { grid-template-columns: repeat(2, 1fr); }
  .sdk-card:nth-child(3n) { border-right: 1px solid #e5e7eb; }
  .sdk-card:nth-child(2n) { border-right: none; }
  .sdk-card:nth-last-child(-n+3) { border-bottom: 1px solid #e5e7eb; }
  .sdk-card:nth-last-child(-n+2) { border-bottom: none; }
}
@media (max-width: 600px) {
  .sdk-grid { grid-template-columns: 1fr; }
  .sdk-card { border-right: none; border-bottom: 1px solid #e5e7eb; }
  .sdk-card:last-child { border-bottom: none; }
  .sdk-card:nth-last-child(-n+2) { border-bottom: 1px solid #e5e7eb; }
}

/* ── SDK Stats ── */
.sdk-stats {
  display: flex; flex-wrap: wrap; gap: 2rem; padding: 2rem 1.5rem;
  max-width: 1440px; margin: 0 auto;
  border-top: 1px solid var(--ink); border-bottom: 1px solid var(--ink);
}
.sdk-stat-item { display: flex; flex-direction: column; gap: 0.25rem; }
.sdk-stat-val { font-family: 'Space Mono', monospace; font-size: 1.5rem; font-weight: 700; color: #34d399; line-height: 1; }
.sdk-stat-label { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: var(--ink-muted); letter-spacing: 0.06em; text-transform: uppercase; }

/* ── API Explorer ── */
.api-explorer { border-bottom: 1px solid var(--ink); }
.api-inner { max-width: 1440px; margin: 0 auto; padding: 5rem 1.5rem; }
.api-headline { margin-bottom: 2rem; }
.api-explorer-wrap {
  display: grid; grid-template-columns: 280px 1fr; gap: 0;
  border: 1px solid var(--ink); overflow: hidden;
}
.api-endpoints { border-right: 1px solid var(--ink); }
.api-ep-btn {
  display: flex; align-items: center; gap: 0.75rem;
  width: 100%; padding: 0.75rem 1rem;
  background: transparent; border: none; border-bottom: 1px solid var(--ink);
  cursor: pointer; text-align: left;
}
.api-ep-btn:last-child { border-bottom: none; }
.api-ep-btn.active { background: rgba(52,211,153,0.08); }
.api-ep-btn:hover:not(.active) { background: rgba(52,211,153,0.04); }
.api-method {
  font-family: 'Space Mono', monospace; font-size: 0.6875rem; font-weight: 700;
  padding: 0.2rem 0.4rem; flex-shrink: 0;
}
.method-post { background: rgba(34,197,94,0.15); color: #16a34a; }
.method-get  { background: rgba(59,130,246,0.15); color: #2563eb; }
.method-delete { background: rgba(239,68,68,0.15); color: #dc2626; }
.api-path { font-family: 'Space Mono', monospace; font-size: 0.8125rem; color: var(--ink); }
.api-response { padding: 1rem; background: #f8fafc; overflow: auto; }
.api-response-header { display: flex; justify-content: space-between; margin-bottom: 0.75rem; }
.api-status { font-family: 'Space Mono', monospace; font-size: 0.8125rem; color: #16a34a; font-weight: 700; }
.api-response-label { font-size: 0.75rem; color: var(--ink-muted); }
.api-code { font-family: 'Space Mono', monospace; font-size: 0.8125rem; color: var(--ink); margin: 0; white-space: pre; }
@media (max-width: 640px) {
  .api-explorer-wrap { grid-template-columns: 1fr; }
  .api-endpoints { border-right: none; border-bottom: 1px solid var(--ink); }
}

/* ── Rate Limits ── */
.rate-limits { border-bottom: 1px solid var(--ink); }
.rl-inner { max-width: 900px; margin: 0 auto; padding: 4rem 2rem; }
.rl-headline { margin-bottom: 1.5rem; }
.rl-table-wrap { overflow-x: auto; border: 1px solid var(--ink); margin-top: 1.5rem; }
.rl-table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
.rl-table th { text-align: left; padding: 0.75rem 1rem; font-family: 'Space Mono', monospace; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--ink-muted); border-bottom: 1px solid var(--ink); background: #f5f5f5; }
.rl-table td { padding: 0.75rem 1rem; border-bottom: 1px solid var(--line); color: var(--ink); vertical-align: top; }
.rl-table tr:last-child td { border-bottom: none; }
.rl-table td:hover { background: #fafafa; }
.rl-table code { font-family: 'Space Mono', monospace; font-size: 0.8125rem; color: #34d399; }
.rl-limit { font-family: 'Space Mono', monospace; font-weight: 700; color: #34d399; }
.rl-note { color: var(--ink-muted); font-size: 0.8125rem; }
.rl-footnote { font-size: 0.75rem; color: var(--ink-muted); margin-top: 1rem; }

/* ── Changelog ── */
.changelog { border-bottom: 1px solid var(--ink); background: #fafafa; }
.changelog-inner { max-width: 800px; margin: 0 auto; padding: 4rem 2rem; }
.changelog-headline { margin-bottom: 1.5rem; }
.changelog-list { display: flex; flex-direction: column; gap: 0; }
.changelog-entry { padding: 1rem 0; border-bottom: 1px solid var(--line); }
.changelog-entry:last-child { border-bottom: none; }
.cl-meta { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.375rem; flex-wrap: wrap; }
.cl-version { font-family: 'Space Mono', monospace; font-size: 0.875rem; font-weight: 700; color: var(--ink); }
.cl-date { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: var(--ink-muted); }
.cl-type { font-size: 0.6875rem; font-weight: 700; padding: 0.15rem 0.5rem; border-radius: 99px; text-transform: uppercase; letter-spacing: 0.06em; }
.cl-type--major { background: rgba(239,68,68,0.15); color: #dc2626; }
.cl-type--minor { background: rgba(34,197,94,0.15); color: #16a34a; }
.cl-type--patch { background: rgba(100,116,139,0.15); color: #64748b; }
.cl-desc { font-family: 'Space Mono', monospace; font-size: 0.875rem; color: var(--ink-muted); margin: 0; }

/* ── Webhook Events Reference ── */
.webhook-ref-section { border-bottom: 1px solid var(--ink); background: #fafafa; }
.webhook-events { border: 1px solid var(--line); }
.webhook-event-row {
  display: grid; grid-template-columns: 12rem 1fr 1fr;
  gap: 1rem; padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--line);
  align-items: start;
  transition: background 0.15s;
}
.webhook-event-row:last-child { border-bottom: none; }
.webhook-event-row:hover { background: #f0f0f0; }
.webhook-name { font-family: 'Space Mono', monospace; font-size: 0.75rem; font-weight: 700; color: #34d399; }
.webhook-desc { font-size: 0.8125rem; color: var(--ink); }
.webhook-payload { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: var(--ink-muted); line-height: 1.5; }
@media (max-width: 640px) {
  .webhook-event-row { grid-template-columns: 1fr; }
}
</style>
