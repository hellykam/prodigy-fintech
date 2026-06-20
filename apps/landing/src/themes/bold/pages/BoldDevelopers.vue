<template>
  <main class="bold-page">

    <!-- ── Hero ─────────────────────────────────────────────────── -->
    <section class="hero" aria-labelledby="dev-headline">
      <div class="iris-bar" aria-hidden="true" />
      <div class="section-inner hero-inner">
        <p class="eyebrow eyebrow--light">DEVELOPER DOCUMENTATION</p>
        <h1 id="dev-headline" class="hero-headline" ref="heroHeadlineRef">ONE SCRIPT TAG. HERE'S WHAT IT DOES.</h1>
        <p class="hero-sub">The complete integration guide, minus the parts where documentation usually lies. You'll be done before lunch.</p>
      </div>
    </section>

    <!-- ── Install. Configure. Ship. ──────────────────────────── -->
    <section class="ship-strip-section" aria-labelledby="ship-strip-h">
      <div class="section-inner">
        <h2 id="ship-strip-h" class="section-headline" data-reveal="fade-up">INSTALL. CONFIGURE. SHIP.</h2>
        <div class="ship-strip" data-animate-stagger>
          <div class="ship-step" data-reveal="fade-up">
            <div class="ship-num">01</div>
            <div class="ship-label">INSTALL</div>
            <p class="ship-detail">One npm package. One script tag. No build pipeline required.</p>
          </div>
          <div class="ship-arrow" aria-hidden="true">→</div>
          <div class="ship-step" data-reveal="fade-up">
            <div class="ship-num">02</div>
            <div class="ship-label">CONFIGURE</div>
            <p class="ship-detail">Set your client ID and partner share. Everything else resolves server-side.</p>
          </div>
          <div class="ship-arrow" aria-hidden="true">→</div>
          <div class="ship-step" data-reveal="fade-up">
            <div class="ship-num">03</div>
            <div class="ship-label">SHIP</div>
            <p class="ship-detail">Deploy. The widget is live. KYC and compliance included.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Quick Start ───────────────────────────────────────────── -->
    <section class="section" aria-labelledby="qs-h">
      <div class="section-inner">
        <p class="eyebrow">01 / QUICK START</p>
        <h2 id="qs-h" class="section-headline">THE ENTIRE INTEGRATION</h2>
        <p class="section-sub">This is not a simplified example. This is the actual code. Copy it. Change the values. You're done.</p>
        <div class="code-card">
          <div class="code-header">
            <span class="code-fname">embed.html</span>
            <button class="copy-btn" @click="handleCopy">{{ copied ? 'COPIED ✓' : 'COPY' }}</button>
          </div>
          <pre class="code-block"><code><span class="c">&lt;!-- Add this to your platform --&gt;</span>
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
<span class="t">&lt;div</span> <span class="a">id</span>=<span class="s">"prodigy-widget"</span><span class="t">&gt;&lt;/div&gt;</span></code></pre>
        </div>
        <div class="demo-links">
          <a href="http://localhost:5005" target="_blank" rel="noopener noreferrer" class="demo-pill">↗ Widget demo</a>
          <a href="http://localhost:5006" target="_blank" rel="noopener noreferrer" class="demo-pill">↗ Partner portal</a>
        </div>
      </div>
    </section>

    <!-- ── Config Reference ──────────────────────────────────────── -->
    <section class="section section--dark" aria-labelledby="config-h">
      <div class="section-inner">
        <p class="eyebrow eyebrow--light">02 / CONFIGURATION</p>
        <h2 id="config-h" class="section-headline section-headline--light">ALL DATA-* ATTRIBUTES</h2>
        <div class="table-wrap" role="table" aria-label="Configuration attributes">
          <div class="table-head" role="row">
            <span role="columnheader">Attribute</span>
            <span role="columnheader">Required</span>
            <span role="columnheader">Default</span>
            <span role="columnheader">Values</span>
          </div>
          <div v-for="attr in configAttrs" :key="attr.name" class="table-row" role="row">
            <span class="attr-name" role="cell">{{ attr.name }}</span>
            <span class="attr-req" :class="attr.required ? 'req-yes' : 'req-no'" role="cell">{{ attr.required ? 'Required' : 'Optional' }}</span>
            <span class="attr-default" role="cell">{{ attr.default }}</span>
            <span class="attr-values" role="cell">{{ attr.values }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Webhook Events ────────────────────────────────────────── -->
    <section class="section" aria-labelledby="wh-h">
      <div class="section-inner">
        <p class="eyebrow">03 / WEBHOOKS</p>
        <h2 id="wh-h" class="section-headline">EVENTS YOUR SERVER WILL RECEIVE</h2>
        <p class="section-sub">All events delivered over HTTPS with HMAC-SHA256 signature in <code class="ic">X-Prodigy-Signature</code>. Register your endpoint in the admin console.</p>
        <div class="table-wrap" role="table" aria-label="Webhook events">
          <div class="table-head" role="row">
            <span role="columnheader">Event</span>
            <span role="columnheader">When fired</span>
            <span role="columnheader">Key payload</span>
          </div>
          <div v-for="ev in webhookEvents" :key="ev.name" class="table-row" role="row">
            <span class="attr-name" role="cell">{{ ev.name }}</span>
            <span class="attr-values" role="cell">{{ ev.when }}</span>
            <span class="attr-values" role="cell">{{ ev.payload }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── API Endpoints ─────────────────────────────────────────── -->
    <section class="section section--dark" aria-labelledby="api-h">
      <div class="section-inner">
        <p class="eyebrow eyebrow--light">04 / API ENDPOINTS</p>
        <h2 id="api-h" class="section-headline section-headline--light">THE ENDPOINTS THAT MATTER</h2>
        <p class="section-sub section-sub--light">Base URL: <code class="ic ic--dark">https://api.prodigy.io/v2</code>. Requires <code class="ic ic--dark">Authorization: Bearer YOUR_API_KEY</code>.</p>
        <div class="endpoints">
          <div v-for="ep in endpoints" :key="ep.path" class="endpoint-card">
            <div class="ep-top">
              <span class="ep-method" :class="`method-${ep.method.toLowerCase()}`">{{ ep.method }}</span>
              <span class="ep-path">{{ ep.path }}</span>
            </div>
            <p class="ep-desc">{{ ep.desc }}</p>
            <pre class="ep-shape">{{ ep.shape }}</pre>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Webhook Events Reference ────────────────────────────── -->
    <section class="section section--dark" aria-labelledby="webhooks-h">
      <div class="section-inner">
        <p class="eyebrow eyebrow--light">WEBHOOKS</p>
        <h2 id="webhooks-h" class="section-headline section-headline--light">WEBHOOK EVENTS</h2>
        <div class="webhook-table" role="table" aria-label="Webhook events">
          <div class="wh-head" role="row">
            <span role="columnheader">Event</span>
            <span role="columnheader">Trigger</span>
            <span role="columnheader">Payload</span>
          </div>
          <div v-for="ev in webhookEventsRef" :key="ev.event" class="wh-row" role="row">
            <span class="wh-event" role="cell">{{ ev.event }}</span>
            <span class="wh-trigger" role="cell">{{ ev.trigger }}</span>
            <span class="wh-payload" role="cell">{{ ev.payload }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── SDK Config Reference ──────────────────────────────── -->
    <section class="section" aria-labelledby="sdk-config-h">
      <div class="section-inner">
        <p class="eyebrow">CONFIGURATION</p>
        <h2 id="sdk-config-h" class="section-headline">SDK CONFIGURATION</h2>
        <div class="sdk-grid">
          <div v-for="c in sdkConfig" :key="c.attr" class="sdk-card">
            <div class="sdk-attr">{{ c.attr }}</div>
            <div class="sdk-type-row">
              <span class="sdk-type">{{ c.type }}</span>
              <span v-if="c.required" class="sdk-req">required</span>
              <span v-else class="sdk-opt">optional · default {{ c.default }}</span>
            </div>
            <p class="sdk-desc">{{ c.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── SDK Cards ─────────────────────────────────────────────── -->
    <section class="sdk-cards-section" aria-labelledby="sdk-cards-headline">
      <div class="section-inner">
        <div class="section-header">
          <h2 id="sdk-cards-headline" class="section-headline" data-reveal="fade-up">6 SDKS. ZERO EXCUSES.</h2>
        </div>
        <div class="sdk-cards-grid" data-animate-stagger>
          <div class="sdk-pkg-card sdk-pkg-card--blue">
            <div class="sdk-pkg-name">@prodigy/react</div>
            <div class="sdk-pkg-runtime">React 18+, Next.js</div>
            <code class="sdk-pkg-install">npm i @prodigy/react</code>
          </div>
          <div class="sdk-pkg-card sdk-pkg-card--magenta">
            <div class="sdk-pkg-name">@prodigy/vue</div>
            <div class="sdk-pkg-runtime">Vue 3, Nuxt 3</div>
            <code class="sdk-pkg-install">npm i @prodigy/vue</code>
          </div>
          <div class="sdk-pkg-card sdk-pkg-card--lime">
            <div class="sdk-pkg-name">@prodigy/react-native</div>
            <div class="sdk-pkg-runtime">iOS + Android</div>
            <code class="sdk-pkg-install">npm i @prodigy/react-native</code>
          </div>
          <div class="sdk-pkg-card sdk-pkg-card--blue">
            <div class="sdk-pkg-name">prodigy-ios</div>
            <div class="sdk-pkg-runtime">Swift, SwiftUI</div>
            <code class="sdk-pkg-install">pod 'ProdigySDK'</code>
          </div>
          <div class="sdk-pkg-card sdk-pkg-card--magenta">
            <div class="sdk-pkg-name">prodigy-android</div>
            <div class="sdk-pkg-runtime">Kotlin</div>
            <code class="sdk-pkg-install">implementation 'io.prodigy:sdk'</code>
          </div>
          <div class="sdk-pkg-card sdk-pkg-card--lime">
            <div class="sdk-pkg-name">Vanilla JS</div>
            <div class="sdk-pkg-runtime">ES module, CDN</div>
            <code class="sdk-pkg-install">&lt;script src="cdn.prodigy.io/v2/embed.js"&gt;</code>
          </div>
        </div>
      </div>
    </section>

    <!-- ── SDK Stats ───────────────────────────────────────────── -->
    <div class="sdk-stats bold-sdk-stats" data-animate-stagger>
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
    <section class="section section--dark" aria-labelledby="api-explorer-h" data-reveal="fade-up">
      <div class="section-inner">
        <p class="eyebrow eyebrow--light">API EXPLORER</p>
        <h2 id="api-explorer-h" class="section-headline section-headline--light">THE API. EXPLORE IT.</h2>
        <div class="bold-api-wrap">
          <div class="bold-api-endpoints" role="tablist">
            <button
              v-for="ep in apiEndpoints"
              :key="ep.id"
              class="bold-api-ep-btn"
              :class="{ active: activeEp === ep.id }"
              role="tab"
              :aria-selected="activeEp === ep.id"
              @click="activeEp = ep.id"
            >
              <span class="bold-api-method" :class="`method-${ep.method.toLowerCase()}`">{{ ep.method }}</span>
              <span class="bold-api-path">{{ ep.path }}</span>
            </button>
          </div>
          <div class="bold-api-response" role="tabpanel" aria-live="polite">
            <div class="bold-api-response-header">
              <span class="bold-api-status">200 OK</span>
              <span class="bold-api-response-label">Response</span>
            </div>
            <pre class="bold-api-code">{{ currentEndpoint.response }}</pre>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Webhook Event Reference ──────────────────────────────── -->
    <section class="section" aria-labelledby="bold-webhook-ref-h" data-reveal="fade-up">
      <div class="section-inner">
        <p class="eyebrow">WEBHOOK EVENTS</p>
        <h2 id="bold-webhook-ref-h" class="section-headline">EVENTS YOUR SERVER RECEIVES</h2>
        <div class="bold-webhook-events" data-animate-stagger>
          <div v-for="ev in webhookEventsNew" :key="ev.name" class="bold-wh-row">
            <code class="bold-wh-name">{{ ev.name }}</code>
            <span class="bold-wh-desc">{{ ev.desc }}</span>
            <span class="bold-wh-payload">{{ ev.payload }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Rate Limits ─────────────────────────────────────────── -->
    <section class="section" aria-labelledby="bold-rate-h" data-reveal="fade-up">
      <div class="section-inner">
        <p class="eyebrow">RATE LIMITS</p>
        <h2 id="bold-rate-h" class="section-headline">LIMITS. (GENEROUS.)</h2>
        <div class="bold-rl-table-wrap">
          <table class="bold-rl-table" role="table">
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
                <td class="bold-rl-limit">{{ row.limit }}</td>
                <td>{{ row.window }}</td>
                <td class="bold-rl-note">{{ row.notes }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="bold-rl-footnote">Limits apply per API key. Contact support to request higher limits for production workloads.</p>
      </div>
    </section>

    <!-- ── Changelog ────────────────────────────────────────────── -->
    <section class="section section--dark" aria-labelledby="bold-changelog-h" data-reveal="fade-up">
      <div class="section-inner">
        <p class="eyebrow eyebrow--light">CHANGELOG</p>
        <h2 id="bold-changelog-h" class="section-headline section-headline--light">WHAT'S NEW.</h2>
        <div class="bold-changelog-list" data-animate-stagger>
          <div v-for="entry in changelog" :key="entry.version" class="bold-changelog-entry">
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

    <!-- ── Sandbox CTA ───────────────────────────────────────────── -->
    <section class="sandbox-cta-section" aria-labelledby="sandbox-cta-headline">
      <div class="sandbox-cta-inner">
        <h2 id="sandbox-cta-headline" class="sandbox-cta-headline" data-reveal="fade-up">SANDBOX. REAL FLOWS. FAKE MONEY. GO BREAK IT.</h2>
        <a href="http://localhost:5001" target="_blank" rel="noopener noreferrer" class="sandbox-cta-btn">OPEN SANDBOX</a>
      </div>
    </section>

    <!-- ── CTA ──────────────────────────────────────────────────── -->
    <section class="cta-section" aria-labelledby="cta-h">
      <div class="section-inner cta-inner">
        <div class="cta-content">
          <p class="eyebrow">Ready to integrate</p>
          <h2 id="cta-h" class="cta-headline">OPEN THE DEMO. SEE IT RUNNING.</h2>
          <p class="cta-sub">Widget is live. API is live. Audit trail is live. No mock server required.</p>
        </div>
        <div class="cta-actions">
          <a href="http://localhost:5005" target="_blank" rel="noopener noreferrer" class="btn-fill">WIDGET DEMO →</a>
          <a href="http://localhost:5006" target="_blank" rel="noopener noreferrer" class="btn-outline">PARTNER PORTAL →</a>
          <a href="http://localhost:5002" target="_blank" rel="noopener noreferrer" class="btn-outline">ADMIN CONSOLE →</a>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTypewriter } from '@/composables/useTypewriter'

const heroHeadlineRef = ref<HTMLElement | null>(null)
useTypewriter(heroHeadlineRef, { speed: 30, delay: 0, cursor: true })

const copied = ref(false)

function handleCopy() {
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

const configAttrs = [
  { name: 'data-client-id', required: true, default: '—', values: 'Your client ID from admin console' },
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

const webhookEventsRef = [
  { event: 'transaction.completed', trigger: 'TX settled', payload: '{ txId, amount, currency, partnerId, fee }' },
  { event: 'transaction.failed',    trigger: 'TX failed',  payload: '{ txId, reason, code }' },
  { event: 'kyc.passed',            trigger: 'User passed KYC', payload: '{ userId, sessionId, score }' },
  { event: 'kyc.flagged',           trigger: 'Manual review needed', payload: '{ userId, reason, documents[] }' },
  { event: 'partner.payout_queued', trigger: 'Monthly payout', payload: '{ partnerId, amount, period }' },
]

const sdkConfig = [
  { attr: 'data-b2b-client', type: 'string', required: true,  default: '—',     desc: 'Your Partner ID from the partner portal' },
  { attr: 'data-theme',      type: 'string', required: false, default: '"light"', desc: 'Widget visual theme: light / dark / crypto / gradient' },
  { attr: 'data-currencies', type: 'string', required: false, default: '"BTC,ETH"', desc: 'Comma-separated list of accepted assets' },
  { attr: 'data-on-complete', type: 'string', required: false, default: '—',     desc: 'Global JS function called after TX completes' },
]

// ── API Explorer ─────────────────────────────────────────────────
interface ApiEndpoint { id: string; method: 'GET' | 'POST' | 'DELETE'; path: string; response: string }
const apiEndpoints: ApiEndpoint[] = [
  { id: 'init', method: 'POST', path: '/v1/sessions', response: `{\n  "session_id": "ses_abc123",\n  "widget_url": "https://widget.prodigy.example",\n  "expires_at": "2025-06-17T10:30:00Z",\n  "status": "active"\n}` },
  { id: 'kyc',  method: 'GET',  path: '/v1/kyc/:user_id', response: `{\n  "user_id": "usr_xyz789",\n  "status": "approved",\n  "tier": 2,\n  "check_duration_ms": 44200,\n  "passed_at": "2025-06-17T09:12:31Z"\n}` },
  { id: 'tx',   method: 'POST', path: '/v1/transactions', response: `{\n  "tx_id": "tx_def456",\n  "amount_fiat": 250.00,\n  "currency": "EUR",\n  "crypto": "BTC",\n  "crypto_amount": 0.00429,\n  "fee": 1.25,\n  "status": "settled"\n}` },
  { id: 'fees', method: 'GET',  path: '/v1/fees/estimate', response: `{\n  "base_fee_pct": 0.50,\n  "partner_override": null,\n  "network_fee_est": "€0.40",\n  "total_fee_est": "€1.65",\n  "effective_rate": "0.66%"\n}` },
  { id: 'webhook', method: 'POST', path: '/v1/webhooks', response: `{\n  "webhook_id": "wh_ghi012",\n  "url": "https://yourapp.com/hooks",\n  "events": ["tx.settled", "kyc.approved"],\n  "secret": "whsec_...",\n  "active": true\n}` },
]
const activeEp = ref<string>('init')
const currentEndpoint = computed(() => apiEndpoints.find(e => e.id === activeEp.value) ?? apiEndpoints[0]!)

// ── Webhook Events New ────────────────────────────────────────────
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
  { method: 'GET', path: '/widget/quote', desc: 'Returns a live rate and full fee breakdown. Rates expire after 30 seconds.', shape: '{ rate, fee_platform, fee_network, fee_partner, amount_crypto, expires_at }' },
  { method: 'POST', path: '/widget/transaction', desc: 'Initiates a transaction after user confirmation. KYC triggered if not already passed.', shape: '{ transaction_id, status, kyc_required, estimated_settlement_ms }' },
  { method: 'GET', path: '/partner/revenue', desc: 'Aggregated partner revenue. Supports ?from=&to= date range filtering.', shape: '{ total_eur, transaction_count, period_from, period_to, items[] }' },
  { method: 'GET', path: '/admin/transactions', desc: 'Full transaction ledger with KYC status, risk scores, and outcome.', shape: '{ total, page, items[{ transaction_id, status, kyc_status, risk_score, amount_eur, outcome }] }' },
]
</script>

<style scoped>
.bold-page { background: #f5f5f0; color: #0a0a0a; }
.section-inner { max-width: 1440px; margin: 0 auto; padding: 5rem 1.5rem; }
.iris-bar { height: 4px; background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe, #667eea); background-size: 200% auto; animation: iris 5s linear infinite; will-change: background-position; }
@keyframes iris { 0% { background-position: 0% center; } 100% { background-position: -200% center; } }
.hero { background: #0a0a0a; }
.hero-inner { padding-top: 5rem; padding-bottom: 5rem; display: flex; flex-direction: column; gap: 1.5rem; }
.hero-headline { font-family: 'Bebas Neue', sans-serif; font-size: clamp(3rem, 7vw, 7rem); line-height: 0.92; letter-spacing: -0.01em; color: #f5f5f0; margin: 0; }
.hero-sub { font-family: 'Space Grotesk', sans-serif; font-size: 1.125rem; line-height: 1.65; color: rgba(245,245,240,0.7); max-width: 52ch; margin: 0; }
.eyebrow { font-family: 'Space Grotesk', sans-serif; font-size: 0.8125rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(10,10,10,0.5); margin: 0 0 1rem; }
.eyebrow--light { color: rgba(245,245,240,0.5); }
.section { border-bottom: 1px solid rgba(10,10,10,0.12); }
.section--dark { background: #0a0a0a; border-color: rgba(245,245,240,0.08); }
.section-headline { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.5rem, 5vw, 4.5rem); line-height: 0.95; letter-spacing: -0.01em; margin: 0 0 1.5rem; }
.section-headline--light { color: #f5f5f0; }
.section-sub { font-family: 'Space Grotesk', sans-serif; font-size: 1rem; line-height: 1.7; color: rgba(10,10,10,0.6); max-width: 58ch; margin: 0 0 2rem; }
.section-sub--light { color: rgba(245,245,240,0.65); }
.code-card { background: #0a0a0a; border: 1.5px solid rgba(245,245,240,0.15); margin-bottom: 2rem; }
.code-header { display: flex; justify-content: space-between; align-items: center; padding: 0.625rem 1rem; border-bottom: 1px solid rgba(245,245,240,0.1); }
.code-fname { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: rgba(245,245,240,0.4); letter-spacing: 0.06em; }
.copy-btn { font-family: 'Space Mono', monospace; font-size: 0.75rem; letter-spacing: 0.1em; background: none; border: 1px solid rgba(245,245,240,0.2); color: rgba(245,245,240,0.7); padding: 0.25rem 0.75rem; cursor: pointer; transition: border-color 0.15s; }
.copy-btn:hover { border-color: rgba(245,245,240,0.5); color: #f5f5f0; }
.code-block { margin: 0; padding: 1.5rem 1rem; overflow-x: auto; font-family: 'Space Mono', monospace; font-size: 0.8125rem; line-height: 1.8; }
.c { color: #4b5563; } .t { color: #93c5fd; } .a { color: #a5b4fc; } .s { color: #86efac; }
.demo-links { display: flex; gap: 0.75rem; flex-wrap: wrap; }
.demo-pill { font-family: 'Space Grotesk', sans-serif; font-size: 0.8125rem; font-weight: 500; letter-spacing: 0.06em; color: rgba(10,10,10,0.65); text-decoration: none; border: 1px solid rgba(10,10,10,0.3); padding: 0.375rem 0.875rem; transition: color 0.15s, border-color 0.15s; }
.demo-pill:hover { color: #0a0a0a; border-color: #0a0a0a; }
.ic { font-family: 'Space Mono', monospace; font-size: 0.875rem; background: rgba(10,10,10,0.06); padding: 0.1em 0.4em; }
.ic--dark { background: rgba(245,245,240,0.08); color: #f5f5f0; }
.table-wrap { border: 1px solid rgba(245,245,240,0.12); }
.table-head { display: grid; grid-template-columns: 14rem 7rem 7rem 1fr; background: rgba(245,245,240,0.06); font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(245,245,240,0.5); padding: 0.75rem 1rem; gap: 1rem; }
.table-row { display: grid; grid-template-columns: 14rem 7rem 7rem 1fr; padding: 0.875rem 1rem; gap: 1rem; border-top: 1px solid rgba(245,245,240,0.08); font-family: 'Space Grotesk', sans-serif; font-size: 0.875rem; align-items: start; transition: background 0.15s; }
.table-row:hover { background: rgba(245,245,240,0.04); }
.attr-name { font-family: 'Space Mono', monospace; font-size: 0.75rem; font-weight: 700; color: #f5f5f0; word-break: break-all; }
.attr-req { font-size: 0.75rem; }
.req-yes { color: #4ade80; font-weight: 700; }
.req-no { color: rgba(245,245,240,0.4); }
.attr-default { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: rgba(245,245,240,0.4); }
.attr-values { font-size: 0.8125rem; color: rgba(245,245,240,0.65); line-height: 1.5; word-break: break-word; }
.section .table-wrap { border-color: rgba(10,10,10,0.15); }
.section .table-head { background: rgba(10,10,10,0.04); color: rgba(10,10,10,0.5); }
.section .table-row { border-top-color: rgba(10,10,10,0.1); }
.section .table-row:hover { background: rgba(10,10,10,0.03); }
.section .attr-name { color: #0a0a0a; }
.section .req-yes { color: #166534; }
.section .attr-default { color: rgba(10,10,10,0.4); }
.section .attr-values { color: rgba(10,10,10,0.65); }
.endpoints { display: flex; flex-direction: column; gap: 0; border: 1px solid rgba(245,245,240,0.12); }
.endpoint-card { padding: 1.5rem; border-bottom: 1px solid rgba(245,245,240,0.08); transition: background 0.15s; }
.endpoint-card:last-child { border-bottom: none; }
.endpoint-card:hover { background: rgba(245,245,240,0.03); }
.ep-top { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.75rem; }
.ep-method { font-family: 'Space Mono', monospace; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em; padding: 0.2rem 0.625rem; border: 1.5px solid; }
.method-get { color: #4ade80; border-color: #4ade80; }
.method-post { color: #60a5fa; border-color: #60a5fa; }
.ep-path { font-family: 'Space Mono', monospace; font-size: 0.9rem; font-weight: 700; color: #f5f5f0; }
.ep-desc { font-family: 'Space Grotesk', sans-serif; font-size: 0.875rem; line-height: 1.65; color: rgba(245,245,240,0.65); margin: 0 0 1rem; }
.ep-shape { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: rgba(245,245,240,0.5); background: rgba(245,245,240,0.04); border: 1px solid rgba(245,245,240,0.08); padding: 0.75rem 1rem; margin: 0; overflow-x: auto; line-height: 1.6; white-space: pre-wrap; word-break: break-all; }
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
/* ── SDK Package Cards ─────────────────────────────────────── */
.sdk-cards-section {
  border-bottom: 1px solid rgba(10, 10, 10, 0.12);
}

.sdk-cards-section .section-header {
  border-bottom: 3px solid #0a0a0a;
  padding-bottom: 1.5rem;
  margin-bottom: 3rem;
}

.sdk-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border: 1.5px solid #0a0a0a;
}

.sdk-pkg-card {
  padding: 2rem 1.75rem;
  border-right: 1px solid rgba(10, 10, 10, 0.2);
  border-bottom: 1px solid rgba(10, 10, 10, 0.2);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sdk-pkg-card:nth-child(3n) { border-right: none; }
.sdk-pkg-card:nth-last-child(-n+3) { border-bottom: none; }

.sdk-pkg-card--blue    { border-top: 4px solid #2563eb; }
.sdk-pkg-card--magenta { border-top: 4px solid #e879f9; }
.sdk-pkg-card--lime    { border-top: 4px solid #a3e635; }

.sdk-pkg-name {
  font-family: 'Space Mono', monospace;
  font-size: clamp(0.875rem, 1.5vw, 1.0625rem);
  font-weight: 700;
  color: #0a0a0a;
  word-break: break-word;
}

.sdk-pkg-runtime {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8125rem;
  color: rgba(10, 10, 10, 0.5);
  letter-spacing: 0.04em;
}

.sdk-pkg-install {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  background: #0a0a0a;
  color: #4ade80;
  padding: 0.375rem 0.75rem;
  display: block;
  margin-top: 0.25rem;
  overflow-x: auto;
  white-space: nowrap;
}

/* ── Sandbox CTA ───────────────────────────────────────────── */
.sandbox-cta-section {
  background: #0a0a0a;
  border-top: 2px solid #0a0a0a;
}

.sandbox-cta-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 5rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.5rem;
}

.sandbox-cta-headline {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(2.5rem, 5vw, 5rem);
  line-height: 0.92;
  letter-spacing: 0.02em;
  color: #f5f5f0;
  margin: 0;
  max-width: 24ch;
}

.sandbox-cta-btn {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.375rem;
  letter-spacing: 0.12em;
  text-decoration: none;
  color: #0a0a0a;
  background: #f5f5f0;
  padding: 1rem 3rem;
  display: inline-block;
  border: 2px solid #f5f5f0;
  transition: background 0.15s, color 0.15s;
}

.sandbox-cta-btn:hover {
  background: transparent;
  color: #f5f5f0;
}

@media (max-width: 768px) {
  .sdk-cards-grid { grid-template-columns: repeat(2, 1fr); }
  .sdk-pkg-card:nth-child(3n) { border-right: 1px solid rgba(10,10,10,0.2); }
  .sdk-pkg-card:nth-child(2n) { border-right: none; }
  .sdk-pkg-card:nth-last-child(-n+3) { border-bottom: 1px solid rgba(10,10,10,0.2); }
  .sdk-pkg-card:nth-last-child(-n+2) { border-bottom: none; }
}

@media (max-width: 500px) {
  .sdk-cards-grid { grid-template-columns: 1fr; }
  .sdk-pkg-card { border-right: none !important; border-bottom: 1px solid rgba(10,10,10,0.2) !important; }
  .sdk-pkg-card:last-child { border-bottom: none !important; }
}

@media (max-width: 900px) {
  .table-head, .table-row { grid-template-columns: 12rem 6rem 1fr; }
  .table-head span:nth-child(3), .table-row span:nth-child(3) { display: none; }
  .cta-inner { grid-template-columns: 1fr; gap: 2.5rem; }
}
@media (max-width: 600px) {
  .table-head, .table-row { grid-template-columns: 1fr; }
  .table-head span:not(:first-child), .table-row span:not(:first-child) { display: none; }
}
@media (prefers-reduced-motion: reduce) { .iris-bar { animation: none; } }

/* ── Install. Configure. Ship. strip ──────────────────────── */
.ship-strip-section {
  background: #0a0a0a;
  border-bottom: 3px solid #f5f5f0;
}

.ship-strip {
  display: flex;
  align-items: center;
  gap: 0;
  margin-top: 2.5rem;
  flex-wrap: wrap;
}

.ship-step {
  flex: 1;
  min-width: 200px;
  background: rgba(255, 255, 255, 0.04);
  border: 2px solid rgba(255, 255, 255, 0.12);
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: border-color 0.2s, background 0.2s;
}

.ship-step:hover {
  border-color: #2563eb;
  background: rgba(37, 99, 235, 0.06);
}

.ship-num {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 5rem;
  line-height: 0.85;
  color: rgba(255, 255, 255, 0.08);
  letter-spacing: 0.02em;
  user-select: none;
}

.ship-label {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2rem;
  letter-spacing: 0.05em;
  color: #f5f5f0;
  line-height: 0.9;
}

.ship-detail {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(245, 245, 240, 0.6);
  margin: 0;
}

.ship-arrow {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2.5rem;
  color: #2563eb;
  padding: 0 1.25rem;
  flex-shrink: 0;
  animation: arrow-pulse 1.8s ease-in-out infinite;
  will-change: opacity;
}

@keyframes arrow-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

@media (prefers-reduced-motion: reduce) {
  .ship-arrow { animation: none; }
}

@media (max-width: 768px) {
  .ship-strip {
    flex-direction: column;
  }
  .ship-arrow {
    transform: rotate(90deg);
    padding: 0.5rem 0;
  }
  .ship-step {
    width: 100%;
  }
}
.webhook-table { border: 1px solid rgba(245,245,240,0.12); }
.wh-head { display: grid; grid-template-columns: 14rem 1fr 1fr; background: rgba(245,245,240,0.05); font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(245,245,240,0.5); padding: 0.75rem 1rem; gap: 1rem; }
.wh-row { display: grid; grid-template-columns: 14rem 1fr 1fr; padding: 0.875rem 1rem; gap: 1rem; border-top: 1px solid rgba(245,245,240,0.08); font-family: 'Space Grotesk', sans-serif; font-size: 0.875rem; align-items: start; transition: background 0.15s; }
.wh-row:hover { background: rgba(245,245,240,0.03); }
.wh-event { font-family: 'Space Mono', monospace; font-size: 0.8125rem; color: #f5f5f0; }
.wh-trigger { color: rgba(245,245,240,0.7); }
.wh-payload { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: rgba(245,245,240,0.45); word-break: break-all; }
@media (max-width: 900px) { .wh-head, .wh-row { grid-template-columns: 1fr; } .wh-head span:not(:first-child), .wh-row span:not(:first-child) { display: none; } }
.sdk-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0; border: 1.5px solid #0a0a0a; }
.sdk-card { padding: 1.75rem; border-right: 1px solid rgba(10,10,10,0.2); border-bottom: 1px solid rgba(10,10,10,0.2); display: flex; flex-direction: column; gap: 0.5rem; }
.sdk-card:nth-child(2n) { border-right: none; }
.sdk-card:nth-last-child(-n+2) { border-bottom: none; }
.sdk-attr { font-family: 'Space Mono', monospace; font-size: 0.875rem; font-weight: 700; color: #0a0a0a; }
.sdk-type-row { display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap; }
.sdk-type { font-family: 'Space Grotesk', sans-serif; font-size: 0.75rem; color: rgba(10,10,10,0.5); }
.sdk-req { font-family: 'Space Grotesk', sans-serif; font-size: 0.75rem; background: #0a0a0a; color: #f5f5f0; padding: 0.1rem 0.4rem; }
.sdk-opt { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: rgba(10,10,10,0.45); }
.sdk-desc { font-family: 'Space Grotesk', sans-serif; font-size: 0.875rem; line-height: 1.6; color: rgba(10,10,10,0.65); margin: 0; }
@media (max-width: 768px) { .sdk-grid { grid-template-columns: 1fr; } .sdk-card { border-right: none; border-bottom: 1px solid rgba(10,10,10,0.2); } .sdk-card:last-child { border-bottom: none; } }

/* ── SDK Stats ── */
.bold-sdk-stats {
  display: flex; flex-wrap: wrap; gap: 2rem;
  padding: 2rem 1.5rem; max-width: 1440px; margin: 0 auto;
  border-top: 2px solid #0a0a0a;
}
.sdk-stat-item { display: flex; flex-direction: column; gap: 0.25rem; }
.sdk-stat-val { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; font-weight: 400; color: #2563eb; line-height: 1; letter-spacing: 0.02em; }
.sdk-stat-label { font-family: 'Space Grotesk', sans-serif; font-size: 0.75rem; font-weight: 500; color: rgba(10,10,10,0.5); letter-spacing: 0.06em; text-transform: uppercase; }

/* ── API Explorer ── */
.bold-api-wrap {
  display: grid; grid-template-columns: 280px 1fr; gap: 0;
  border: 1.5px solid rgba(245,245,240,0.15); overflow: hidden;
}
.bold-api-endpoints { border-right: 1px solid rgba(245,245,240,0.12); }
.bold-api-ep-btn {
  display: flex; align-items: center; gap: 0.75rem;
  width: 100%; padding: 0.75rem 1rem;
  background: transparent; border: none; border-bottom: 1px solid rgba(245,245,240,0.1);
  cursor: pointer; text-align: left;
}
.bold-api-ep-btn:last-child { border-bottom: none; }
.bold-api-ep-btn.active { background: rgba(37,99,235,0.1); }
.bold-api-ep-btn:hover:not(.active) { background: rgba(37,99,235,0.05); }
.bold-api-method {
  font-family: 'Space Mono', monospace; font-size: 0.6875rem; font-weight: 700;
  padding: 0.2rem 0.4rem; flex-shrink: 0;
}
.bold-api-method.method-post { background: rgba(34,197,94,0.15); color: #4ade80; }
.bold-api-method.method-get  { background: rgba(96,165,250,0.15); color: #60a5fa; }
.bold-api-method.method-delete { background: rgba(239,68,68,0.15); color: #f87171; }
.bold-api-path { font-family: 'Space Mono', monospace; font-size: 0.8125rem; color: #f5f5f0; }
.bold-api-response { padding: 1rem; background: rgba(255,255,255,0.03); overflow: auto; }
.bold-api-response-header { display: flex; justify-content: space-between; margin-bottom: 0.75rem; }
.bold-api-status { font-family: 'Space Mono', monospace; font-size: 0.8125rem; color: #4ade80; font-weight: 700; }
.bold-api-response-label { font-size: 0.75rem; color: rgba(245,245,240,0.4); }
.bold-api-code { font-family: 'Space Mono', monospace; font-size: 0.8125rem; color: rgba(245,245,240,0.85); margin: 0; white-space: pre; }
@media (max-width: 640px) {
  .bold-api-wrap { grid-template-columns: 1fr; }
  .bold-api-endpoints { border-right: none; border-bottom: 1px solid rgba(245,245,240,0.12); }
}

/* ── Webhook Events Reference ── */
.bold-webhook-events { border: 1.5px solid #0a0a0a; }
.bold-wh-row {
  display: grid; grid-template-columns: 12rem 1fr 1fr;
  gap: 1rem; padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(10,10,10,0.12);
  align-items: start; transition: background 0.15s;
}
.bold-wh-row:last-child { border-bottom: none; }
.bold-wh-row:hover { background: rgba(10,10,10,0.04); }
.bold-wh-name { font-family: 'Space Mono', monospace; font-size: 0.75rem; font-weight: 700; color: #2563eb; }
.bold-wh-desc { font-size: 0.8125rem; color: rgba(10,10,10,0.75); }
.bold-wh-payload { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: rgba(10,10,10,0.45); line-height: 1.5; }
@media (max-width: 640px) {
  .bold-wh-row { grid-template-columns: 1fr; }
}

/* ── Rate Limits Table ── */
.bold-rl-table-wrap { overflow-x: auto; border: 1.5px solid #0a0a0a; margin-top: 1.5rem; }
.bold-rl-table { width: 100%; border-collapse: collapse; font-family: 'Space Grotesk', sans-serif; font-size: 0.875rem; }
.bold-rl-table th { text-align: left; padding: 0.75rem 1rem; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: rgba(10,10,10,0.5); border-bottom: 1.5px solid #0a0a0a; background: rgba(10,10,10,0.03); }
.bold-rl-table td { padding: 0.75rem 1rem; border-bottom: 1px solid rgba(10,10,10,0.12); color: #0a0a0a; vertical-align: top; }
.bold-rl-table tr:last-child td { border-bottom: none; }
.bold-rl-table code { font-family: 'Space Mono', monospace; font-size: 0.8125rem; color: #2563eb; }
.bold-rl-limit { font-family: 'Space Mono', monospace; font-weight: 700; color: #2563eb; }
.bold-rl-note { color: rgba(10,10,10,0.55); font-size: 0.8125rem; }
.bold-rl-footnote { font-family: 'Space Grotesk', sans-serif; font-size: 0.75rem; color: rgba(10,10,10,0.5); margin-top: 1rem; }

/* ── Changelog ── */
.bold-changelog-list { display: flex; flex-direction: column; gap: 0; border: 1px solid rgba(245,245,240,0.12); }
.bold-changelog-entry { padding: 1rem; border-bottom: 1px solid rgba(245,245,240,0.08); transition: background 0.15s; }
.bold-changelog-entry:last-child { border-bottom: none; }
.bold-changelog-entry:hover { background: rgba(245,245,240,0.04); }
.bold-changelog-entry .cl-meta { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.375rem; flex-wrap: wrap; }
.bold-changelog-entry .cl-version { font-family: 'Space Mono', monospace; font-size: 0.875rem; font-weight: 700; color: #f5f5f0; }
.bold-changelog-entry .cl-date { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: rgba(245,245,240,0.45); }
.bold-changelog-entry .cl-type { font-size: 0.6875rem; font-weight: 700; padding: 0.15rem 0.5rem; border-radius: 99px; text-transform: uppercase; letter-spacing: 0.06em; }
.bold-changelog-entry .cl-type--major { background: rgba(239,68,68,0.15); color: #f87171; }
.bold-changelog-entry .cl-type--minor { background: rgba(34,197,94,0.15); color: #4ade80; }
.bold-changelog-entry .cl-type--patch { background: rgba(100,116,139,0.15); color: rgba(245,245,240,0.5); }
.bold-changelog-entry .cl-desc { font-family: 'Space Grotesk', sans-serif; font-size: 0.875rem; color: rgba(245,245,240,0.65); margin: 0; }
</style>

