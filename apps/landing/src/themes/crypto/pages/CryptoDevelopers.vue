<template>
  <div class="crypto-page">

    <!-- ── Hero ─────────────────────────────────────────────────── -->
    <section class="hero" aria-labelledby="dev-headline">
      <div class="grid-dots" aria-hidden="true" />
      <!-- Node constellation decoration -->
      <svg class="constellation-bg" viewBox="0 0 260 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <!-- Lines -->
        <line x1="50" y1="40" x2="130" y2="20" stroke="#00ffb2" stroke-width="1" stroke-dasharray="200" stroke-dashoffset="200" class="cline cline--1"/>
        <line x1="130" y1="20" x2="210" y2="60" stroke="#00ffb2" stroke-width="1" stroke-dasharray="200" stroke-dashoffset="200" class="cline cline--2"/>
        <line x1="50" y1="40" x2="90" y2="120" stroke="#00ffb2" stroke-width="1" stroke-dasharray="150" stroke-dashoffset="150" class="cline cline--3"/>
        <line x1="90" y1="120" x2="210" y2="60" stroke="#00ffb2" stroke-width="1" stroke-dasharray="200" stroke-dashoffset="200" class="cline cline--4"/>
        <line x1="130" y1="20" x2="90" y2="120" stroke="#00ffb2" stroke-width="1" stroke-dasharray="150" stroke-dashoffset="150" class="cline cline--5"/>
        <line x1="210" y1="60" x2="170" y2="150" stroke="#00ffb2" stroke-width="1" stroke-dasharray="150" stroke-dashoffset="150" class="cline cline--6"/>
        <!-- Nodes: 5 nodes -->
        <circle cx="50" cy="40" r="5" fill="#00ffb2" class="cnode cnode--1" opacity="0.8"/>
        <circle cx="130" cy="20" r="7" fill="#00ffb2" class="cnode cnode--2" opacity="0.9"/>
        <circle cx="210" cy="60" r="5" fill="#00ffb2" class="cnode cnode--3" opacity="0.75"/>
        <circle cx="90" cy="120" r="4" fill="#00ffb2" class="cnode cnode--4" opacity="0.65"/>
        <circle cx="170" cy="150" r="4.5" fill="#00ffb2" class="cnode cnode--5" opacity="0.7"/>
        <!-- Outer rings on primary node -->
        <circle cx="130" cy="20" r="14" stroke="#00ffb2" stroke-width="0.75" opacity="0.2" class="cring"/>
        <circle cx="130" cy="20" r="22" stroke="#00ffb2" stroke-width="0.5" opacity="0.1" class="cring-2"/>
      </svg>
      <div class="section-inner">
        <p class="eyebrow">DEVELOPER DOCUMENTATION</p>
        <h1 id="dev-headline" class="hero-headline">
          <span ref="heroHeadlineRef">ONE SCRIPT TAG.</span><br /><span class="cyan">HERE'S WHAT IT DOES.</span>
        </h1>
        <div class="hero-neon-line" aria-hidden="true"></div>
        <p class="hero-sub">The complete integration guide, minus the parts where documentation usually lies. You'll be done before lunch.</p>
        <div class="hero-links">
          <a href="http://localhost:5005" target="_blank" rel="noopener noreferrer" class="hero-link">↗ Widget demo</a>
          <a href="http://localhost:5006" target="_blank" rel="noopener noreferrer" class="hero-link">↗ Partner portal</a>
          <a href="http://localhost:5002" target="_blank" rel="noopener noreferrer" class="hero-link">↗ Admin console</a>
        </div>
      </div>
    </section>

    <!-- ── Quick Start ───────────────────────────────────────────── -->
    <section class="section-dark" aria-labelledby="qs-h">
      <div class="section-inner">
        <p class="eyebrow">01 / QUICK START</p>
        <h2 id="qs-h" class="section-headline">THE ENTIRE INTEGRATION</h2>
        <p class="section-sub">This is not a simplified example. This is the actual code. Copy it. Change the attribute values. You're done.</p>

        <div class="code-card" role="region" aria-label="Embed code" data-reveal="fade-up">
          <div class="code-header">
            <span class="code-fname">embed.html</span>
            <button class="copy-btn" @click="handleCopy" aria-label="Copy code">
              {{ copied ? 'COPIED ✓' : 'COPY' }}
            </button>
          </div>
          <pre class="code-block"><code><span class="c">&lt;!-- Add this to your platform --&gt;</span>
<span class="t">&lt;script</span>
  <span class="a">src</span>=<span class="s">"https://cdn.prodigy.io/widget/v2/embed.js"</span>
  <span class="a">data-client-id</span>=<span class="s">"YOUR_CLIENT_ID"</span>
  <span class="a">data-currency</span>=<span class="s">"BTC"</span>
  <span class="a">data-partner-share</span>=<span class="s">"0.002"</span>
  <span class="a">data-theme</span>=<span class="s">"dark"</span>
  <span class="a">data-locale</span>=<span class="s">"en"</span>
  <span class="a">data-container</span>=<span class="s">"#prodigy-widget"</span>
  <span class="a">async</span>
<span class="t">&gt;&lt;/script&gt;</span>

<span class="c">&lt;!-- Widget mounts here --&gt;</span>
<span class="t">&lt;div</span> <span class="a">id</span>=<span class="s">"prodigy-widget"</span><span class="t">&gt;&lt;/div&gt;</span></code></pre>
          <div class="cd-term-cursor" aria-hidden="true"></div>
        </div>
      </div>
    </section>

    <!-- ── Config Reference ──────────────────────────────────────── -->
    <section class="section-mid" aria-labelledby="config-h">
      <div class="section-inner">
        <p class="eyebrow">02 / CONFIGURATION</p>
        <h2 id="config-h" class="section-headline">ALL <span class="cyan">DATA-*</span> ATTRIBUTES</h2>
        <div class="config-table" role="table" aria-label="Configuration attributes" data-animate-stagger>
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
    <section class="section-dark" aria-labelledby="wh-h">
      <div class="section-inner">
        <p class="eyebrow">03 / WEBHOOKS</p>
        <h2 id="wh-h" class="section-headline">EVENTS YOUR <span class="purple">SERVER WILL RECEIVE</span></h2>
        <p class="section-sub">Register your webhook endpoint in the admin console. All events delivered over HTTPS with HMAC-SHA256 signature in <code class="ic">X-Prodigy-Signature</code>.</p>
        <div class="webhook-table" role="table" aria-label="Webhook events" data-animate-stagger>
          <div class="table-head" role="row">
            <span role="columnheader">Event</span>
            <span role="columnheader">When fired</span>
            <span role="columnheader">Key payload</span>
          </div>
          <div v-for="ev in webhookEvents" :key="ev.name" class="table-row" role="row">
            <span class="ev-name" role="cell">{{ ev.name }}</span>
            <span class="ev-when" role="cell">{{ ev.when }}</span>
            <span class="ev-payload" role="cell">{{ ev.payload }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── API Endpoints ─────────────────────────────────────────── -->
    <section class="section-mid" aria-labelledby="api-h">
      <div class="section-inner">
        <p class="eyebrow">04 / API ENDPOINTS</p>
        <h2 id="api-h" class="section-headline">THE ENDPOINTS <span class="cyan">THAT MATTER</span></h2>
        <p class="section-sub">Base URL: <code class="ic">https://api.prodigy.io/v2</code>. All requests require <code class="ic">Authorization: Bearer YOUR_API_KEY</code>.</p>
        <div class="endpoints" data-animate-stagger>
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

    <!-- ── Live Event Stream ────────────────────────────────────── -->
    <section class="section-dark" aria-labelledby="stream-h">
      <div class="section-inner">
        <p class="eyebrow">05 / REAL-TIME EVENTS</p>
        <h2 id="stream-h" class="section-headline">LIVE <span class="cyan">EVENT STREAM</span></h2>
        <p class="section-sub">Every state change in the widget emits a WebSocket event. Here's what a real session looks like, frame by frame.</p>
        <div class="terminal-card" role="region" aria-label="Live event stream terminal">
          <div class="terminal-header">
            <span class="terminal-dot" style="background:#ff5f57" aria-hidden="true"></span>
            <span class="terminal-dot" style="background:#febc2e" aria-hidden="true"></span>
            <span class="terminal-dot" style="background:#28c840" aria-hidden="true"></span>
            <span class="terminal-title">wss://events.prodigy.io/stream</span>
          </div>
          <div class="terminal-body" aria-live="polite">
            <div class="stream-viewport">
              <div class="stream-scroll">
                <div v-for="line in streamLines" :key="line" class="stream-line">{{ line }}</div>
                <!-- duplicate for seamless loop -->
                <div v-for="line in streamLines" :key="'b-' + line" class="stream-line" aria-hidden="true">{{ line }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Error Codes ───────────────────────────────────────────── -->
    <section class="section-mid" aria-labelledby="errors-h">
      <div class="section-inner">
        <p class="eyebrow">06 / ERROR HANDLING</p>
        <h2 id="errors-h" class="section-headline">API <span class="cyan">ERROR CODES</span></h2>
        <p class="section-sub">All errors return a machine-readable <code class="ic">error_code</code> field alongside the HTTP status. Parse the code, not the message.</p>
        <div class="error-table" role="table" aria-label="API error codes" data-reveal="fade-up">
          <div class="err-head" role="row">
            <span role="columnheader">Error Code</span>
            <span role="columnheader">HTTP</span>
            <span role="columnheader">Meaning &amp; Resolution</span>
          </div>
          <div v-for="err in errorCodes" :key="err.code" class="err-row" role="row">
            <span class="err-code" role="cell">{{ err.code }}</span>
            <span class="err-http" :class="err.http >= 500 ? 'http-5xx' : err.http >= 400 ? 'http-4xx' : ''" role="cell">{{ err.http }}</span>
            <span class="err-desc" role="cell">{{ err.desc }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Rate Limits ───────────────────────────────────────────── -->
    <section class="section-dark" aria-labelledby="rate-h">
      <div class="section-inner">
        <p class="eyebrow">07 / RATE LIMITS</p>
        <h2 id="rate-h" class="section-headline">LIMITS PER <span class="cyan">API KEY</span></h2>
        <p class="section-sub">Limits apply per partner API key, per rolling 60-second window. Exceeding a limit returns <code class="ic">HTTP 429</code> with a <code class="ic">Retry-After</code> header.</p>
        <div class="rate-cards" data-reveal="fade-up">
          <div v-for="r in rateLimits" :key="r.label" class="rate-card">
            <div class="rate-n cyan">{{ r.rate }}</div>
            <div class="rate-endpoint">{{ r.endpoint }}</div>
            <div class="rate-label">{{ r.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Sandbox & Community ───────────────────────────────────── -->
    <section class="section-mid" aria-labelledby="sandbox-h">
      <div class="section-inner">
        <p class="eyebrow">08 / SANDBOX &amp; COMMUNITY</p>
        <h2 id="sandbox-h" class="section-headline">TEST IT. <span class="cyan">THEN SHIP IT.</span></h2>
        <div class="sb-comm-grid">
          <div class="sb-card">
            <div class="sb-card-icon" aria-hidden="true">⬡</div>
            <h3 class="sb-card-title">SANDBOX</h3>
            <p class="sb-card-desc">Full test environment. Pre-loaded identities (pass / fail / pending). No real money. Webhook replay.</p>
            <a href="http://localhost:5005" target="_blank" rel="noopener noreferrer" class="sb-card-btn">OPEN SANDBOX →</a>
          </div>
          <div class="sb-card">
            <div class="sb-card-icon" aria-hidden="true">◈</div>
            <h3 class="sb-card-title">COMMUNITY</h3>
            <p class="sb-card-desc">Discord server for API questions. GitHub for open-source SDKs. Office hours every Thursday.</p>
            <a href="#community" class="sb-card-btn">JOIN DISCORD →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- ── SDK Stats ───────────────────────────────────────────── -->
    <div class="sdk-stats section-mid" data-animate-stagger>
      <div class="section-inner sdk-stats-inner">
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
    </div>

    <!-- ── API Explorer ─────────────────────────────────────────── -->
    <section class="section-dark" aria-labelledby="api-explorer-h" data-reveal="fade-up">
      <div class="section-inner">
        <p class="eyebrow">// API_EXPLORER</p>
        <h2 id="api-explorer-h" class="section-headline">// <span class="cyan">API_EXPLORER</span></h2>
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
    <section class="section-mid" aria-labelledby="webhook-ref-h" data-reveal="fade-up">
      <div class="section-inner">
        <p class="eyebrow">WEBHOOK EVENTS</p>
        <h2 id="webhook-ref-h" class="section-headline">EVENTS YOUR <span class="purple">SERVER RECEIVES</span></h2>
        <div class="crypto-webhook-events" data-animate-stagger>
          <div v-for="ev in webhookEventsNew" :key="ev.name" class="crypto-wh-row">
            <code class="crypto-wh-name">{{ ev.name }}</code>
            <span class="crypto-wh-desc">{{ ev.desc }}</span>
            <span class="crypto-wh-payload">{{ ev.payload }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Changelog ────────────────────────────────────────────── -->
    <section class="section-mid changelog-section" aria-labelledby="changelog-h" data-reveal="fade-up">
      <div class="section-inner">
        <p class="eyebrow">// CHANGELOG</p>
        <h2 id="changelog-h" class="section-headline">// <span class="cyan">CHANGELOG</span></h2>
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
    <section class="cta-section" aria-labelledby="cta-h">
      <div class="section-inner cta-inner">
        <h2 id="cta-h" class="cta-headline">OPEN THE DEMO.<br /><span class="cyan">SEE IT RUNNING.</span></h2>
        <p class="cta-sub">The widget is live. The API is live. The audit trail is live. No mock server required.</p>
        <div class="cta-btns">
          <a href="http://localhost:5005" target="_blank" rel="noopener noreferrer" class="btn-primary">Widget Demo →</a>
          <a href="http://localhost:5006" target="_blank" rel="noopener noreferrer" class="btn-ghost">Partner Portal →</a>
          <a href="http://localhost:5002" target="_blank" rel="noopener noreferrer" class="btn-ghost">Admin Console →</a>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTypewriter } from '@/composables/useTypewriter'

const copied = ref(false)
const heroHeadlineRef = ref<HTMLElement | null>(null)
useTypewriter(heroHeadlineRef, { speed: 22, delay: 200, cursor: true })

onMounted(() => {
  // Animate constellation lines on mount
  const lines = document.querySelectorAll<SVGLineElement>('.constellation-bg .cline')
  lines.forEach((line, i) => {
    setTimeout(() => {
      line.style.transition = 'stroke-dashoffset 0.7s ease'
      line.style.strokeDashoffset = '0'
    }, i * 150 + 400)
  })
})

function handleCopy() {
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

const configAttrs = [
  { name: 'data-client-id', required: true, default: '—', values: 'Your client ID from the admin console' },
  { name: 'data-currency', required: false, default: 'BTC', values: 'BTC · ETH · USDT · SOL' },
  { name: 'data-partner-share', required: false, default: '0.002', values: '0.001 – 0.005 (0.1%–0.5%)' },
  { name: 'data-theme', required: false, default: 'dark', values: 'light · dark · auto' },
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

const endpoints = [
  {
    method: 'GET',
    path: '/widget/quote',
    desc: 'Returns a live rate and full fee breakdown. Rates expire after 30 seconds.',
    shape: '{ rate, fee_platform, fee_network, fee_partner, amount_crypto, expires_at }',
  },
  {
    method: 'POST',
    path: '/widget/transaction',
    desc: 'Initiates a transaction after user confirmation. KYC triggered if not already passed.',
    shape: '{ transaction_id, status, kyc_required, estimated_settlement_ms }',
  },
  {
    method: 'GET',
    path: '/partner/revenue',
    desc: 'Aggregated partner revenue. Supports ?from=&to= date range filtering.',
    shape: '{ total_eur, transaction_count, period_from, period_to, items[] }',
  },
  {
    method: 'GET',
    path: '/admin/transactions',
    desc: 'Full transaction ledger with KYC status, risk scores, and outcome for all transactions.',
    shape: '{ total, page, items[{ transaction_id, status, kyc_status, risk_score, amount_eur, outcome }] }',
  },
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

const streamLines = [
  '→ PRICE_UPDATE     BTC  €58,234  +0.14%  2026-06-18T14:22:01Z',
  '→ PRICE_UPDATE     ETH  €3,102   -0.08%  2026-06-18T14:22:02Z',
  '→ TX_INIT          user:anon@partner  amount:€850  pair:EUR→BTC',
  '→ KYC_SESSION      sessionId:kyc_8f3k  status:INITIATED',
  '→ KYC_PASS         score:94  checks:12/12  duration:47s',
  '→ QUOTE_LOCKED     rate:58234  fee:€4.25  ttl:30s',
  '→ TX_SETTLED       txId:PRG-2891-XK  net:€845.75',
  '→ PARTNER_PAYOUT   share:€1.70  partnerId:acme_001',
]

const errorCodes = [
  { code: 'ERR_QUOTE_EXPIRED',    http: 410, desc: 'Quote TTL exceeded (30s) — fetch a new quote and resubmit' },
  { code: 'ERR_KYC_REQUIRED',     http: 403, desc: 'User must complete KYC before this transaction type' },
  { code: 'ERR_AMOUNT_TOO_LOW',   http: 422, desc: 'Amount below minimum threshold (€10)' },
  { code: 'ERR_AMOUNT_TOO_HIGH',  http: 422, desc: 'Amount above limit for unverified user tier' },
  { code: 'ERR_PARTNER_INACTIVE', http: 401, desc: 'Partner ID suspended — contact support' },
  { code: 'ERR_CURRENCY_PAIR',    http: 400, desc: 'Unsupported currency pair for this partner config' },
  { code: 'ERR_NETWORK_FEE',      http: 503, desc: 'Network fee unavailable — safe to retry in 2s' },
]

const changelog = [
  { version: 'v3.4.1', date: '2025-06-10', type: 'patch',  desc: 'Fixed edge case in KYC status polling when user disconnects mid-flow.' },
  { version: 'v3.4.0', date: '2025-05-28', type: 'minor',  desc: 'Added webhook retry configuration. Partners can now set retry window 1–72h.' },
  { version: 'v3.3.0', date: '2025-05-12', type: 'minor',  desc: 'React Native SDK now supports biometric KYC passthrough for iOS 16+.' },
  { version: 'v3.2.1', date: '2025-04-30', type: 'patch',  desc: 'Performance: widget bundle reduced by 18% via tree-shaking improvements.' },
  { version: 'v3.2.0', date: '2025-04-14', type: 'minor',  desc: 'New /v1/fees/estimate endpoint. Returns real-time fee breakdown before transaction.' },
  { version: 'v3.1.0', date: '2025-03-25', type: 'major',  desc: 'MiCA readiness update: added Article 45 disclosure support and audit trail export.' },
]

const rateLimits = [
  { rate: '60/min',  endpoint: '/v1/quote',        label: 'Quote requests' },
  { rate: '30/min',  endpoint: '/v1/transactions',  label: 'Transaction submissions' },
  { rate: '120/min', endpoint: '/v1/prices',        label: 'Price lookups' },
  { rate: '1 conn',  endpoint: 'wss://ws',          label: 'WebSocket (per key)' },
]
</script>

<style scoped>
.crypto-page {
  background: #050510;
  color: #e8eaff;
  min-height: 100vh;
}

.section-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 5rem clamp(1rem, 4vw, 2rem);
}

.grid-dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(0,245,255,0.06) 1px, transparent 1px);
  background-size: 28px 28px;
  pointer-events: none;
}

/* ── Constellation ── */
.constellation-bg {
  position: absolute; right: 2vw; top: 50%; transform: translateY(-50%);
  width: clamp(160px, 22vw, 260px); opacity: 0.6; pointer-events: none; z-index: 0;
}
.cnode { animation: cnode-pulse 2.5s ease-in-out infinite; }
.cnode--1 { animation-delay: 0s; }
.cnode--2 { animation-delay: 0.5s; }
.cnode--3 { animation-delay: 1s; }
.cnode--4 { animation-delay: 1.5s; }
.cnode--5 { animation-delay: 2s; }
@keyframes cnode-pulse {
  0%, 100% { opacity: 0.7; transform: scale(1); filter: drop-shadow(0 0 0 transparent); }
  50% { opacity: 1; transform: scale(1.3); filter: drop-shadow(0 0 6px #00ffb2); }
}
.cring { animation: cring-anim 3s ease-in-out infinite; }
.cring-2 { animation: cring-anim 3s ease-in-out infinite 1s; }
@keyframes cring-anim { 0%,100%{opacity:0.15} 50%{opacity:0.4} }

/* ── Neon cursor line ── */
.hero-neon-line {
  width: clamp(60px, 15vw, 120px); height: 2px;
  background: #00ffb2;
  box-shadow: 0 0 8px #00ffb2, 0 0 16px rgba(0,255,178,0.4);
  margin: 0.5rem 0 1rem;
  animation: neon-blink-line 1.2s step-end infinite;
}
@keyframes neon-blink-line { 0%,100%{opacity:1} 50%{opacity:0.15} }

.hero {
  position: relative;
  border-bottom: 1px solid rgba(0,245,255,0.12);
  overflow: hidden;
  padding: 2rem 0;
}
.hero .section-inner { position: relative; z-index: 1; }
.eyebrow { font-family: 'Space Mono', monospace; font-size: 0.75rem; letter-spacing: 0.2em; color: #00f5ff; text-transform: uppercase; margin: 0 0 1.5rem; }
.hero-headline { font-family: 'Space Mono', monospace; font-size: clamp(1.75rem, 4vw, 3rem); font-weight: 700; line-height: 1.1; margin: 0 0 0.25rem; text-transform: uppercase; }
.hero-sub { font-family: 'Space Mono', monospace; font-size: 0.9rem; line-height: 1.75; color: rgba(232,234,255,0.7); max-width: 52ch; margin: 0 0 2rem; }
.hero-links { display: flex; gap: 1rem; flex-wrap: wrap; }
.hero-link { font-family: 'Space Mono', monospace; font-size: 0.75rem; letter-spacing: 0.08em; color: rgba(232,234,255,0.65); text-decoration: none; border: 1px solid rgba(232,234,255,0.2); padding: 0.375rem 0.875rem; transition: border-color 0.2s, color 0.2s; }
.hero-link:hover { border-color: #00f5ff; color: #00f5ff; }

.cyan { color: #00f5ff; text-shadow: 0 0 16px rgba(0,245,255,0.4); }
.purple { color: #a855f7; }

.section-dark { border-bottom: 1px solid rgba(0,245,255,0.08); }
.section-mid { background: rgba(255,255,255,0.02); border-bottom: 1px solid rgba(0,245,255,0.08); }
.section-headline { font-family: 'Space Mono', monospace; font-size: clamp(1.25rem, 3vw, 2.25rem); font-weight: 700; line-height: 1.15; text-transform: uppercase; margin: 0 0 1.5rem; }
.section-sub { font-family: 'Space Mono', monospace; font-size: 0.8125rem; line-height: 1.75; color: rgba(232,234,255,0.65); max-width: 56ch; margin: 0 0 2rem; }
.ic { font-family: 'Space Mono', monospace; font-size: 0.8125rem; background: rgba(0,245,255,0.08); color: #00f5ff; padding: 0.1em 0.4em; }

/* Code */
.code-card { background: #02020f; border: 1px solid rgba(0,245,255,0.2); }
.code-header { display: flex; justify-content: space-between; align-items: center; padding: 0.625rem 1rem; border-bottom: 1px solid rgba(0,245,255,0.1); }
.code-fname { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: rgba(232,234,255,0.4); letter-spacing: 0.06em; }
.copy-btn { font-family: 'Space Mono', monospace; font-size: 0.75rem; letter-spacing: 0.1em; background: none; border: 1px solid rgba(0,245,255,0.3); color: #00f5ff; padding: 0.25rem 0.75rem; cursor: pointer; transition: border-color 0.2s; }
.copy-btn:hover { border-color: #00f5ff; }
.code-block { margin: 0; padding: 1.5rem 1rem; overflow-x: auto; font-family: 'Space Mono', monospace; font-size: 0.8125rem; line-height: 1.8; }
.c { color: #4b5563; }
.t { color: #93c5fd; }
.a { color: #a5b4fc; }
.s { color: #86efac; }

/* Tables */
.config-table, .webhook-table { border: 1px solid rgba(0,245,255,0.15); }
.table-head {
  display: grid; grid-template-columns: 14rem 7rem 7rem 1fr;
  background: rgba(0,245,255,0.06);
  font-family: 'Space Mono', monospace; font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase; color: #00f5ff;
  padding: 0.75rem 1rem; gap: 1rem;
}
.webhook-table .table-head { grid-template-columns: 16rem 1fr 1fr; }
.table-row {
  display: grid; grid-template-columns: 14rem 7rem 7rem 1fr;
  padding: 0.875rem 1rem; gap: 1rem; border-top: 1px solid rgba(0,245,255,0.08);
  font-family: 'Space Mono', monospace; font-size: 0.8125rem; align-items: start;
  transition: background 0.15s;
}
.webhook-table .table-row { grid-template-columns: 16rem 1fr 1fr; }
.table-row:hover { background: rgba(0,245,255,0.03); }
.attr-name, .ev-name { font-size: 0.75rem; font-weight: 700; color: #00f5ff; word-break: break-all; }
.attr-req { font-size: 0.75rem; }
.req-yes { color: #4ade80; font-weight: 700; }
.req-no { color: rgba(232,234,255,0.4); }
.attr-default { font-size: 0.75rem; color: rgba(232,234,255,0.4); }
.attr-values, .ev-when, .ev-payload { font-size: 0.8125rem; color: rgba(232,234,255,0.65); line-height: 1.55; word-break: break-word; }

/* Endpoints */
.endpoints { display: flex; flex-direction: column; gap: 0; border: 1px solid rgba(0,245,255,0.15); }
.endpoint-card { padding: 1.5rem; border-bottom: 1px solid rgba(0,245,255,0.08); transition: background 0.15s; }
.endpoint-card:last-child { border-bottom: none; }
.endpoint-card:hover { background: rgba(0,245,255,0.02); }
.ep-top { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.75rem; }
.ep-method { font-family: 'Space Mono', monospace; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em; padding: 0.2rem 0.625rem; border: 1.5px solid; }
.method-get { color: #4ade80; border-color: #4ade80; }
.method-post { color: #60a5fa; border-color: #60a5fa; }
.ep-path { font-family: 'Space Mono', monospace; font-size: 0.9rem; font-weight: 700; color: #e8eaff; }
.ep-desc { font-family: 'Space Mono', monospace; font-size: 0.8125rem; line-height: 1.65; color: rgba(232,234,255,0.65); margin: 0 0 1rem; }
.ep-shape { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: rgba(0,245,255,0.7); background: rgba(0,245,255,0.04); border: 1px solid rgba(0,245,255,0.1); padding: 0.75rem 1rem; margin: 0; overflow-x: auto; line-height: 1.6; word-break: break-all; white-space: pre-wrap; }

/* Terminal / stream */
.terminal-card { background: #02020f; border: 1px solid rgba(0,245,255,0.2); overflow: hidden; }
.terminal-header { display: flex; align-items: center; gap: 0.5rem; padding: 0.625rem 1rem; border-bottom: 1px solid rgba(0,245,255,0.1); }
.terminal-dot { width: 12px; height: 12px; border-radius: 50%; }
.terminal-title { font-family: 'Space Mono', monospace; font-size: 0.7rem; color: rgba(232,234,255,0.35); margin-left: 0.5rem; letter-spacing: 0.08em; }
.terminal-body { padding: 0; }
.stream-viewport { height: 220px; overflow: hidden; }
.stream-scroll { display: flex; flex-direction: column; animation: stream-scroll-up 12s linear infinite; }
@keyframes stream-scroll-up { 0% { transform: translateY(0); } 100% { transform: translateY(-50%); } }

/* Stream lines */
.stream-line { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: rgba(0,245,255,0.7); line-height: 1.9; padding: 0 1rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; animation: stream-in 0.3s ease forwards; opacity: 0; transform: translateX(-8px); }
.stream-line:nth-child(1) { animation-delay: 0.1s; }
.stream-line:nth-child(2) { animation-delay: 0.2s; }
.stream-line:nth-child(3) { animation-delay: 0.3s; }
.stream-line:nth-child(4) { animation-delay: 0.4s; }
.stream-line:nth-child(5) { animation-delay: 0.5s; }
.stream-line:nth-child(6) { animation-delay: 0.6s; }
.stream-line:nth-child(7) { animation-delay: 0.7s; }
.stream-line:nth-child(8) { animation-delay: 0.8s; }
@keyframes stream-in { to { opacity: 1; transform: translateX(0); } }

/* Error table */
.error-table { border: 1px solid rgba(0,245,255,0.15); }
.err-head { display: grid; grid-template-columns: 16rem 5rem 1fr; background: rgba(0,245,255,0.06); font-family: 'Space Mono', monospace; font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase; color: #00f5ff; padding: 0.75rem 1rem; gap: 1rem; }
.err-row { display: grid; grid-template-columns: 16rem 5rem 1fr; padding: 0.875rem 1rem; gap: 1rem; border-top: 1px solid rgba(0,245,255,0.08); font-family: 'Space Mono', monospace; font-size: 0.8125rem; align-items: start; transition: background 0.15s; }
.err-row:hover { background: rgba(0,245,255,0.03); }
.err-code { font-size: 0.75rem; font-weight: 700; color: #00f5ff; word-break: break-all; }
.err-http { font-size: 0.75rem; font-weight: 700; }
.http-4xx { color: #f59e0b; }
.http-5xx { color: #ef4444; }
.err-desc { font-size: 0.8125rem; color: rgba(232,234,255,0.65); line-height: 1.55; }

/* Rate cards */
.rate-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
.rate-card { background: rgba(0,245,255,0.03); border: 1px solid rgba(0,245,255,0.15); padding: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; }
.rate-n { font-family: 'Space Mono', monospace; font-size: clamp(1.25rem, 2.5vw, 1.75rem); font-weight: 700; line-height: 1; }
.rate-endpoint { font-family: 'Space Mono', monospace; font-size: 0.7rem; color: rgba(232,234,255,0.4); word-break: break-all; }
.rate-label { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: rgba(232,234,255,0.6); letter-spacing: 0.05em; }

/* Terminal cursor */
.cd-term-cursor { display: inline-block; width: 8px; height: 1rem; background: #00ffb2; animation: term-blink 1s step-end infinite; margin-left: 2px; vertical-align: middle; }
@keyframes term-blink { 0%,100%{opacity:1} 50%{opacity:0} }

/* CTA */
.cta-section { background: linear-gradient(135deg, rgba(0,245,255,0.05), rgba(168,85,247,0.05)); border-top: 1px solid rgba(0,245,255,0.12); }
.cta-inner { display: flex; flex-direction: column; gap: 1.5rem; }
.cta-headline { font-family: 'Space Mono', monospace; font-size: clamp(1.5rem, 3.5vw, 2.75rem); font-weight: 700; text-transform: uppercase; margin: 0; line-height: 1.1; }
.cta-sub { font-family: 'Space Mono', monospace; font-size: 0.8125rem; color: rgba(232,234,255,0.65); line-height: 1.75; margin: 0; max-width: 52ch; }
.cta-btns { display: flex; gap: 1rem; flex-wrap: wrap; }
.btn-primary { font-family: 'Space Mono', monospace; font-size: 0.8125rem; font-weight: 700; letter-spacing: 0.06em; color: #050510; background: #00f5ff; text-decoration: none; padding: 0.875rem 1.75rem; transition: background 0.2s, box-shadow 0.2s; display: inline-block; }
.btn-primary:hover { background: #fff; box-shadow: 0 0 24px rgba(0,245,255,0.4); }
.btn-ghost { font-family: 'Space Mono', monospace; font-size: 0.8125rem; font-weight: 700; letter-spacing: 0.06em; color: #00f5ff; text-decoration: none; padding: 0.875rem 1.75rem; border: 1px solid rgba(0,245,255,0.4); transition: border-color 0.2s, color 0.2s; display: inline-block; }
.btn-ghost:hover { border-color: #00f5ff; color: #fff; }

@media (max-width: 900px) {
  .table-head, .table-row { grid-template-columns: 12rem 6rem 1fr; }
  .table-head span:nth-child(3), .table-row span:nth-child(3) { display: none; }
  .webhook-table .table-head, .webhook-table .table-row { grid-template-columns: 14rem 1fr; }
  .webhook-table .table-head span:last-child, .webhook-table .table-row span:last-child { display: none; }
}

@media (max-width: 600px) {
  .table-head, .table-row { grid-template-columns: 1fr; }
  .table-head span:not(:first-child), .table-row span:not(:first-child) { display: none; }
}

@media (max-width: 900px) {
  .rate-cards { grid-template-columns: repeat(2, 1fr); }
  .err-head, .err-row { grid-template-columns: 12rem 5rem 1fr; }
}

@media (max-width: 600px) {
  .rate-cards { grid-template-columns: 1fr; }
  .err-head, .err-row { grid-template-columns: 1fr; }
  .err-head span:not(:first-child), .err-row span:not(:first-child) { display: none; }
}

/* ── Sandbox & Community ─────────────────────────────────────── */
.sb-comm-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(1rem, 2vw, 1.5rem);
  margin-top: clamp(1.5rem, 3vw, 2.5rem);
}

.sb-card {
  background: rgba(0, 245, 255, 0.03);
  border: 1px solid rgba(0, 245, 255, 0.15);
  padding: clamp(1.5rem, 3vw, 2.5rem);
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  transition: border-color 0.25s, box-shadow 0.25s;
}

.sb-card:hover {
  border-color: rgba(0, 245, 255, 0.4);
  box-shadow: 0 0 20px rgba(0, 245, 255, 0.1);
}

.sb-card-icon {
  font-size: 1.75rem;
  color: #00f5ff;
  text-shadow: 0 0 10px rgba(0, 245, 255, 0.5);
  line-height: 1;
}

.sb-card-title {
  font-family: 'Space Mono', monospace;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #00f5ff;
  margin: 0;
}

.sb-card-desc {
  font-family: 'Space Mono', monospace;
  font-size: 0.8125rem;
  line-height: 1.75;
  color: rgba(232, 234, 255, 0.65);
  margin: 0;
  flex: 1;
}

.sb-card-btn {
  display: inline-block;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #050510;
  background: #00f5ff;
  padding: 0.625rem 1.25rem;
  text-decoration: none;
  border: none;
  transition: background 0.2s, box-shadow 0.2s;
  align-self: flex-start;
}

.sb-card-btn:hover {
  background: #ffffff;
  box-shadow: 0 0 16px rgba(0, 245, 255, 0.4);
}

@media (max-width: 600px) {
  .sb-comm-grid { grid-template-columns: 1fr; }
}

@media (prefers-reduced-motion: reduce) {
  .btn-primary, .btn-ghost { transition: none; }
  .cd-term-cursor { animation: none; opacity: 1; }
  .stream-line { animation: none; opacity: 1; transform: none; }
  .stream-scroll { animation: none; }
}

/* ── SDK Stats ── */
.sdk-stats-inner { display: flex; flex-wrap: wrap; gap: 2rem; padding-top: 2rem; padding-bottom: 2rem; }
.sdk-stat-item { display: flex; flex-direction: column; gap: 0.25rem; }
.sdk-stat-val { font-family: 'Space Mono', monospace; font-size: 1.5rem; font-weight: 700; color: #00f5ff; line-height: 1; text-shadow: 0 0 12px rgba(0,245,255,0.4); }
.sdk-stat-label { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: rgba(232,234,255,0.45); letter-spacing: 0.06em; text-transform: uppercase; }

/* ── API Explorer ── */
.api-explorer-wrap {
  display: grid; grid-template-columns: 280px 1fr; gap: 0;
  border: 1px solid rgba(0,245,255,0.2); overflow: hidden;
}
.api-endpoints { border-right: 1px solid rgba(0,245,255,0.15); }
.api-ep-btn {
  display: flex; align-items: center; gap: 0.75rem;
  width: 100%; padding: 0.75rem 1rem;
  background: transparent; border: none; border-bottom: 1px solid rgba(0,245,255,0.1);
  cursor: pointer; text-align: left;
}
.api-ep-btn:last-child { border-bottom: none; }
.api-ep-btn.active { background: rgba(0,245,255,0.07); }
.api-ep-btn:hover:not(.active) { background: rgba(0,245,255,0.03); }
.api-method {
  font-family: 'Space Mono', monospace; font-size: 0.6875rem; font-weight: 700;
  padding: 0.2rem 0.4rem; flex-shrink: 0;
}
.method-post { background: rgba(34,197,94,0.15); color: #4ade80; }
.method-get  { background: rgba(59,130,246,0.15); color: #60a5fa; }
.method-delete { background: rgba(239,68,68,0.15); color: #f87171; }
.api-path { font-family: 'Space Mono', monospace; font-size: 0.8125rem; color: rgba(232,234,255,0.8); }
.api-response { padding: 1rem; background: rgba(255,255,255,0.03); overflow: auto; }
.api-response-header { display: flex; justify-content: space-between; margin-bottom: 0.75rem; }
.api-status { font-family: 'Space Mono', monospace; font-size: 0.8125rem; color: #4ade80; font-weight: 700; }
.api-response-label { font-size: 0.75rem; color: rgba(232,234,255,0.4); }
.api-code { font-family: 'Space Mono', monospace; font-size: 0.8125rem; color: rgba(0,245,255,0.85); margin: 0; white-space: pre; }
@media (max-width: 640px) {
  .api-explorer-wrap { grid-template-columns: 1fr; }
  .api-endpoints { border-right: none; border-bottom: 1px solid rgba(0,245,255,0.15); }
}

/* ── Webhook Events Reference ── */
.crypto-webhook-events { border: 1px solid rgba(0,245,255,0.15); }
.crypto-wh-row {
  display: grid; grid-template-columns: 12rem 1fr 1fr;
  gap: 1rem; padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(0,245,255,0.08);
  align-items: start; transition: background 0.15s;
}
.crypto-wh-row:last-child { border-bottom: none; }
.crypto-wh-row:hover { background: rgba(0,245,255,0.03); }
.crypto-wh-name { font-family: 'Space Mono', monospace; font-size: 0.75rem; font-weight: 700; color: #00f5ff; }
.crypto-wh-desc { font-size: 0.8125rem; color: rgba(232,234,255,0.75); }
.crypto-wh-payload { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: rgba(232,234,255,0.4); line-height: 1.5; }
@media (max-width: 640px) {
  .crypto-wh-row { grid-template-columns: 1fr; }
}

/* ── Changelog ── */
.changelog-section { }
.changelog-list { display: flex; flex-direction: column; gap: 0; border: 1px solid rgba(0,245,255,0.15); }
.changelog-entry { padding: 1rem; border-bottom: 1px solid rgba(0,245,255,0.08); transition: background 0.15s; }
.changelog-entry:last-child { border-bottom: none; }
.changelog-entry:hover { background: rgba(0,245,255,0.03); }
.cl-meta { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.375rem; flex-wrap: wrap; }
.cl-version { font-family: 'Space Mono', monospace; font-size: 0.875rem; font-weight: 700; color: #00f5ff; }
.cl-date { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: rgba(232,234,255,0.4); }
.cl-type { font-size: 0.6875rem; font-weight: 700; padding: 0.15rem 0.5rem; border-radius: 99px; text-transform: uppercase; letter-spacing: 0.06em; }
.cl-type--major { background: rgba(239,68,68,0.15); color: #f87171; }
.cl-type--minor { background: rgba(34,197,94,0.15); color: #4ade80; }
.cl-type--patch { background: rgba(100,116,139,0.15); color: rgba(232,234,255,0.4); }
.cl-desc { font-family: 'Space Mono', monospace; font-size: 0.875rem; color: rgba(232,234,255,0.65); margin: 0; }
</style>
