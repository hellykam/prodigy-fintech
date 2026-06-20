<template>
  <main class="ft-dev">

    <!-- System header bar -->
    <div class="ft-sysbar">
      <span>PRODIGY INFRASTRUCTURE SERVICES</span>
      <span class="ft-sysbar-dot">·</span>
      <span>API REFERENCE · DEVELOPER DOCS</span>
      <span class="ft-sysbar-dot">·</span>
      <span class="ft-status">API STATUS: <em>OPERATIONAL</em></span>
    </div>

    <hr class="ft-rule" />

    <!-- Hero -->
    <section class="ft-hero">
      <div class="ft-hero-label">REF: DEV-001 · INTEGRATION GUIDE</div>
      <h1 class="ft-headline">API-FIRST INFRASTRUCTURE<br />FOR FINANCIAL INSTITUTIONS.</h1>
      <p class="ft-subhead">
        One script tag. One API key. Full compliance stack included. The integration guide below is the complete specification — not a simplified overview.
      </p>
      <div class="ft-hero-links">
        <a href="http://localhost:5005" target="_blank" rel="noopener noreferrer" class="ft-pill">↗ Widget demo (localhost:5005)</a>
        <a href="http://localhost:5006" target="_blank" rel="noopener noreferrer" class="ft-pill">↗ Partner portal (localhost:5006)</a>
        <a href="http://localhost:5002" target="_blank" rel="noopener noreferrer" class="ft-pill">↗ Admin console (localhost:5002)</a>
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- Quick start code -->
    <section class="ft-section" data-reveal="fade-up">
      <div ref="quickStartLabel" class="ft-section-label">01 / QUICK START · EMBED CODE</div>
      <p class="ft-body-text">
        This is the complete integration. Copy the script tag, set your attributes, drop the container div. You are done.
      </p>
      <div class="ft-code-card" role="region" aria-label="Embed code">
        <div class="ft-code-header">
          <span class="ft-code-fname">embed.html<span class="fd-cursor" aria-hidden="true">█</span></span>
          <button class="ft-copy-btn" @click="handleCopy" :aria-label="copied ? 'Copied' : 'Copy code'">
            {{ copied ? 'COPIED ✓' : 'COPY' }}
          </button>
        </div>
        <pre class="ft-code-block" aria-label="Script embed code"><code><span class="c">&lt;!-- Add to your platform --&gt;</span>
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
<span class="t">&lt;div</span> <span class="a">id</span>=<span class="s">"prodigy-widget"</span><span class="t">&gt;&lt;/div&gt;</span></code></pre>
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- Config attributes -->
    <section class="ft-section">
      <div class="ft-section-label">02 / CONFIGURATION · ALL DATA-* ATTRIBUTES</div>
      <div class="ft-table-wrap">
        <table class="ft-table">
          <thead>
            <tr>
              <th>ATTRIBUTE</th>
              <th>REQUIRED</th>
              <th>DEFAULT</th>
              <th>ACCEPTED VALUES</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="attr in configAttrs" :key="attr.name">
              <td class="ft-field">{{ attr.name }}</td>
              <td :class="attr.required ? 'ft-ok' : 'ft-muted'">{{ attr.required ? 'Required' : 'Optional' }}</td>
              <td class="ft-mono">{{ attr.default }}</td>
              <td>{{ attr.values }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- API endpoints -->
    <section class="ft-section">
      <div class="ft-section-label">03 / API ENDPOINTS · BASE URL: https://api.prodigy.io/v2</div>
      <p class="ft-body-text">
        All requests require <code class="ft-ic">Authorization: Bearer YOUR_API_KEY</code>. Rate limit: 1,000 req/min per API key. All responses are JSON.
      </p>
      <div class="ft-table-wrap">
        <table class="ft-table">
          <thead>
            <tr>
              <th>ENDPOINT</th>
              <th>METHOD</th>
              <th>AUTH</th>
              <th>RATE LIMIT</th>
              <th>RESPONSE</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ep in endpoints" :key="ep.path">
              <td class="ft-field">{{ ep.path }}</td>
              <td :class="`ft-method ft-method--${ep.method.toLowerCase()}`">{{ ep.method }}</td>
              <td class="ft-mono ft-muted">Bearer token</td>
              <td class="ft-mono">{{ ep.rateLimit }}</td>
              <td class="ft-mono ft-muted">{{ ep.response }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- Webhook events -->
    <section class="ft-section">
      <div class="ft-section-label">04 / WEBHOOKS · EVENTS AND PAYLOADS</div>
      <p class="ft-body-text">
        Register your HTTPS endpoint in the admin console. All events include an <code class="ft-ic">X-Prodigy-Signature</code> HMAC-SHA256 header. Replay window: 5 minutes.
      </p>
      <div class="ft-table-wrap">
        <table class="ft-table">
          <thead>
            <tr>
              <th>EVENT</th>
              <th>TRIGGER</th>
              <th>KEY PAYLOAD FIELDS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ev in webhookEvents" :key="ev.name">
              <td class="ft-field">{{ ev.name }}</td>
              <td>{{ ev.when }}</td>
              <td class="ft-mono ft-muted">{{ ev.payload }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- Webhook config guide -->
    <section class="ft-section">
      <div class="ft-section-label">05 / WEBHOOK CONFIGURATION · STEP BY STEP</div>
      <div class="ft-steps">
        <div v-for="step in webhookSteps" :key="step.num" class="ft-step">
          <span class="ft-step-num">{{ step.num }}</span>
          <div class="ft-step-body">
            <p class="ft-step-title">{{ step.title }}</p>
            <p class="ft-step-desc">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- SDK_MATRIX -->
    <section class="ft-section ft-section--dark fdev-sdk" aria-labelledby="sdk-h">
      <div ref="sdkHeading" class="ft-webhook-title" id="sdk-h">SDK_COVERAGE</div>
      <div class="ft-table-wrap" data-animate-stagger>
        <table class="ft-table ft-table--dark fdev-sdk-table" aria-label="SDK coverage matrix">
          <thead>
            <tr>
              <th>SDK</th>
              <th>RUNTIME</th>
              <th>INSTALL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="ft-field--amber">@prodigy/react</td>
              <td class="ft-muted-light">React 18+, Next.js 14+</td>
              <td class="ft-mono--amber">npm i @prodigy/react</td>
            </tr>
            <tr>
              <td class="ft-field--amber">@prodigy/vue</td>
              <td class="ft-muted-light">Vue 3, Nuxt 3</td>
              <td class="ft-mono--amber">npm i @prodigy/vue</td>
            </tr>
            <tr>
              <td class="ft-field--amber">@prodigy/react-native</td>
              <td class="ft-muted-light">iOS + Android</td>
              <td class="ft-mono--amber">npm i @prodigy/react-native</td>
            </tr>
            <tr>
              <td class="ft-field--amber">prodigy-ios</td>
              <td class="ft-muted-light">Swift, SwiftUI</td>
              <td class="ft-mono--amber">pod 'ProdigySDK'</td>
            </tr>
            <tr>
              <td class="ft-field--amber">prodigy-android</td>
              <td class="ft-muted-light">Kotlin, Jetpack</td>
              <td class="ft-mono--amber">impl 'io.prodigy:sdk:2.1.0'</td>
            </tr>
            <tr>
              <td class="ft-field--amber">Vanilla JS</td>
              <td class="ft-muted-light">ES module, UMD</td>
              <td class="ft-mono--amber">&lt;script src="cdn.prodigy.example/widget.js"&gt;</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <hr class="ft-rule ft-rule--dark" />

    <!-- SANDBOX_SECTION -->
    <section class="ft-section ft-section--dark fdev-sandbox" aria-labelledby="sandbox-h" data-reveal="fade-up">
      <div class="ft-webhook-title" id="sandbox-h">SANDBOX_ENVIRONMENT</div>
      <pre class="fdev-sandbox__pre"><code><span class="fdev-sb-k">ENVIRONMENT</span><span class="fdev-sb-sep">:</span>        <span class="fdev-sb-v">SANDBOX</span>
<span class="fdev-sb-k">STATUS</span><span class="fdev-sb-sep">:</span>             <span class="fdev-sb-ok">ACTIVE</span>
<span class="fdev-sb-k">TEST_IDENTITIES</span><span class="fdev-sb-sep">:</span>    <span class="fdev-sb-muted">pass / fail / review / pending</span>
<span class="fdev-sb-k">REAL_MONEY</span><span class="fdev-sb-sep">:</span>         <span class="fdev-sb-no">false</span>
<span class="fdev-sb-k">WEBHOOK_REPLAY</span><span class="fdev-sb-sep">:</span>     <span class="fdev-sb-v">available</span></code></pre>
      <div class="fdev-sandbox__cta">
        <a href="http://localhost:5001" target="_blank" rel="noopener noreferrer" class="fdev-sandbox__btn">OPEN_SANDBOX →</a>
      </div>
    </section>

    <hr class="ft-rule ft-rule--dark" />

    <!-- Webhook Events Reference -->
    <section class="ft-section ft-section--dark" aria-labelledby="webhook-ref-h">
      <div class="ft-webhook-title" id="webhook-ref-h">WEBHOOK_EVENTS</div>
      <p class="ft-body-text ft-body-text--light">
        All events are delivered via HTTP POST. Include <code class="ft-ic ft-ic--dark">X-Prodigy-Signature</code> for verification. Replay window: 5 minutes.
      </p>
      <div class="ft-table-wrap" data-animate-stagger>
        <table class="ft-table ft-table--dark" aria-label="Webhook event reference">
          <thead>
            <tr>
              <th>EVENT</th>
              <th>TRIGGER</th>
              <th>PAYLOAD</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ev in webhookRefEvents" :key="ev.event">
              <td class="ft-field ft-field--amber">{{ ev.event }}</td>
              <td class="ft-muted-light">{{ ev.trigger }}</td>
              <td class="ft-mono ft-mono--amber">{{ ev.payload }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <hr class="ft-rule ft-rule--dark" />

    <!-- Rate Limits -->
    <section class="ft-section ft-section--dark" aria-labelledby="rate-limits-h">
      <div class="ft-webhook-title" id="rate-limits-h" ref="rateLimitsHeadingRef">RATE_LIMITS</div>
      <div class="ft-rate-grid" data-animate-stagger>
        <div v-for="rl in rateLimits" :key="rl.label" class="ft-rate-card">
          <p class="ft-rate-card__label">{{ rl.label }}</p>
          <p class="ft-rate-card__value">{{ rl.value }}</p>
        </div>
      </div>
      <p class="ft-rate-note">Exceeds limit → HTTP 429 with <code class="ft-ic ft-ic--dark">Retry-After</code> header.</p>
    </section>

    <hr class="ft-rule ft-rule--dark" />

    <!-- TERMINAL SESSION -->
    <section class="ft-section ft-section--dark fdev-terminal" aria-labelledby="terminal-h" data-reveal="fade-up">
      <div class="ft-webhook-title" id="terminal-h">TERMINAL_SESSION</div>
      <p class="ft-body-text ft-body-text--light">Live integration flow. Watch it run.</p>
      <div class="terminal-block" ref="terminalRef" aria-label="Terminal session demo">
        <div class="terminal-block__header" aria-hidden="true">
          <span class="terminal-block__dot terminal-block__dot--red"></span>
          <span class="terminal-block__dot terminal-block__dot--yellow"></span>
          <span class="terminal-block__dot terminal-block__dot--green"></span>
          <span class="terminal-block__title">prodigy-cli</span>
        </div>
        <div class="terminal-block__body">
          <span class="tw-line">$ prodigy init --env=production</span>
          <span class="tw-line">✓ SDK initialized</span>
          <span class="tw-line">$ prodigy kyc start --user-id=usr_abc123</span>
          <span class="tw-line">&gt; Scanning document...</span>
          <span class="tw-line">&gt; Liveness check: PASS (0.97 confidence)</span>
          <span class="tw-line">✓ KYC complete in 44s</span>
        </div>
      </div>
    </section>

    <hr class="ft-rule ft-rule--dark" />

    <!-- SDK Stats -->
    <section class="ft-section ft-section--dark" aria-label="SDK statistics" data-animate-stagger>
      <div class="ft-sdk-stats">
        <div class="ft-stat-item">
          <span class="ft-stat-val">2.1M+</span>
          <span class="ft-stat-label">Weekly downloads</span>
        </div>
        <div class="ft-stat-item">
          <span class="ft-stat-val">4.9★</span>
          <span class="ft-stat-label">npm rating</span>
        </div>
        <div class="ft-stat-item">
          <span class="ft-stat-val">MIT</span>
          <span class="ft-stat-label">License</span>
        </div>
        <div class="ft-stat-item">
          <span class="ft-stat-val">v3.4.1</span>
          <span class="ft-stat-label">Latest stable</span>
        </div>
      </div>
    </section>

    <hr class="ft-rule ft-rule--dark" />

    <!-- API Explorer -->
    <section class="ft-section ft-section--dark" aria-labelledby="ft-api-explorer-h" data-reveal="fade-up">
      <div class="ft-webhook-title" id="ft-api-explorer-h">&gt; ENDPOINT_EXPLORER</div>
      <div class="ft-api-explorer-wrap">
        <div class="ft-api-endpoints" role="tablist">
          <button
            v-for="ep in apiEndpoints"
            :key="ep.id"
            class="ft-api-ep-btn"
            :class="{ active: activeEp === ep.id }"
            role="tab"
            :aria-selected="activeEp === ep.id"
            @click="activeEp = ep.id"
          >
            <span class="ft-api-method" :class="`ft-method-${ep.method.toLowerCase()}`">{{ ep.method }}</span>
            <span class="ft-api-path">{{ ep.path }}</span>
          </button>
        </div>
        <div class="ft-api-response" role="tabpanel" aria-live="polite">
          <div class="ft-api-response-header">
            <span class="ft-api-status">200 OK</span>
            <span class="ft-api-response-label">Response</span>
          </div>
          <pre class="ft-api-code">{{ currentEndpoint.response }}</pre>
        </div>
      </div>
    </section>

    <hr class="ft-rule ft-rule--dark" />

    <!-- Webhook Events Reference -->
    <section class="ft-section ft-section--dark" aria-labelledby="ft-wh-events-h" data-reveal="fade-up">
      <div class="ft-webhook-title" id="ft-wh-events-h">WEBHOOK_EVENT_REFERENCE</div>
      <div class="ft-wh-events" data-animate-stagger>
        <div v-for="ev in webhookEventsNew" :key="ev.name" class="ft-wh-ev-row">
          <code class="ft-wh-ev-name">{{ ev.name }}</code>
          <span class="ft-wh-ev-desc">{{ ev.desc }}</span>
          <span class="ft-wh-ev-payload">{{ ev.payload }}</span>
        </div>
      </div>
    </section>

    <hr class="ft-rule ft-rule--dark" />

    <hr class="ft-rule ft-rule--dark" />

    <!-- Changelog -->
    <section class="ft-section ft-section--dark" aria-labelledby="ft-changelog-h" data-reveal="fade-up">
      <div class="ft-webhook-title" id="ft-changelog-h">&gt; CHANGELOG.log</div>
      <div class="ft-changelog-list" data-animate-stagger>
        <div v-for="entry in changelog" :key="entry.version" class="ft-cl-entry">
          <div class="ft-cl-meta">
            <span class="ft-cl-version">{{ entry.version }}</span>
            <span class="ft-cl-date">{{ entry.date }}</span>
            <span class="ft-cl-type" :class="`ft-cl-type--${entry.type}`">{{ entry.type }}</span>
          </div>
          <p class="ft-cl-desc">{{ entry.desc }}</p>
        </div>
      </div>
    </section>

    <hr class="ft-rule ft-rule--dark" />

    <!-- CTA -->
    <section class="ft-cta">
      <div class="ft-cta-label">NEXT STEP · OPEN THE DEMO ENVIRONMENT</div>
      <p class="ft-cta-body">
        The widget is live. The API is live. The audit trail is populated. No mock server required.
      </p>
      <div class="ft-cta-actions">
        <a href="http://localhost:5005" target="_blank" rel="noopener noreferrer" class="ft-btn ft-btn--primary ft-btn--lg">OPEN WIDGET DEMO →</a>
        <a href="http://localhost:5006" target="_blank" rel="noopener noreferrer" class="ft-btn ft-btn--ghost">PARTNER PORTAL →</a>
        <a href="http://localhost:5002" target="_blank" rel="noopener noreferrer" class="ft-btn ft-btn--ghost">ADMIN CONSOLE →</a>
      </div>
    </section>

    <hr class="ft-rule" />

    <div class="ft-footer">
      <span>PRODIGY INFRASTRUCTURE SERVICES</span>
      <span>·</span>
      <RouterLink to="/fintech/security" class="ft-footer-link">SECURITY DOCS</RouterLink>
      <span>·</span>
      <RouterLink to="/fintech/case-studies" class="ft-footer-link">CASE STUDIES</RouterLink>
    </div>

  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTextScramble } from '@/composables/useTextScramble'
import { useClipReveal } from '@/composables/useSplitReveal'
import { useTypewriter, useTypewriterLines } from '@/composables/useTypewriter'

// ── Animation refs ────────────────────────────────────────────────
const sdkHeading = ref<HTMLElement | null>(null)
const quickStartLabel = ref<HTMLElement | null>(null)
const rateLimitsHeadingRef = ref<HTMLElement | null>(null)
const terminalRef = ref<HTMLElement | null>(null)

// SDK_COVERAGE heading — scramble with mono style on scroll
useTextScramble(sdkHeading, { trigger: 'visible', style: 'mono', duration: 700 })
// Quick-start code heading — clip-path reveal
useClipReveal(quickStartLabel, { direction: 'left', duration: 0.8, delay: 0 })
// Rate limits heading — typewriter
useTypewriter(rateLimitsHeadingRef, { speed: 25, delay: 100, cursor: true })
// Terminal session — typewriter lines (reads text from .tw-line children)
useTypewriterLines(terminalRef, { speed: 30, lineDelay: 600 })

const copied = ref(false)

function handleCopy(): void {
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

interface ConfigAttr {
  name: string
  required: boolean
  default: string
  values: string
}

const configAttrs: ConfigAttr[] = [
  { name: 'data-client-id',      required: true,  default: '—',               values: 'Your client ID from the admin console' },
  { name: 'data-currency',       required: false, default: 'BTC',             values: 'BTC · ETH · USDT · SOL' },
  { name: 'data-partner-share',  required: false, default: '0.002',           values: '0.001 – 0.005 (0.1%–0.5%)' },
  { name: 'data-theme',          required: false, default: 'light',           values: 'light · dark · auto' },
  { name: 'data-locale',         required: false, default: 'en',              values: 'en · de · fr' },
  { name: 'data-container',      required: false, default: '#prodigy-widget', values: 'Any valid CSS selector' },
]

interface Endpoint {
  path: string
  method: string
  rateLimit: string
  response: string
}

const endpoints: Endpoint[] = [
  { path: '/widget/quote',       method: 'GET',  rateLimit: '1000/min', response: '{ rate, fee_platform, fee_network, fee_partner, amount_crypto, expires_at }' },
  { path: '/widget/transaction', method: 'POST', rateLimit: '100/min',  response: '{ transaction_id, status, kyc_required, estimated_settlement_ms }' },
  { path: '/partner/revenue',    method: 'GET',  rateLimit: '1000/min', response: '{ total_eur, transaction_count, period_from, period_to, items[] }' },
  { path: '/admin/transactions', method: 'GET',  rateLimit: '100/min',  response: '{ total, page, items[{ transaction_id, status, kyc_status, risk_score, amount_eur, outcome }] }' },
]

interface WebhookEvent {
  name: string
  when: string
  payload: string
}

const webhookEvents: WebhookEvent[] = [
  { name: 'transaction.initiated',       when: 'User confirms amount, before KYC',     payload: '{ transaction_id, amount_eur, currency, partner_id }' },
  { name: 'kyc.started',                 when: 'KYC flow opens for first-time user',   payload: '{ transaction_id, kyc_session_id }' },
  { name: 'kyc.completed',               when: 'KYC result returned',                  payload: '{ transaction_id, kyc_status, risk_score }' },
  { name: 'transaction.settled',         when: 'Crypto lands in destination wallet',   payload: '{ transaction_id, amount_crypto, fee_breakdown, outcome }' },
  { name: 'partner.commission_posted',   when: 'Partner share credited to portal',     payload: '{ transaction_id, partner_id, commission_eur, cumulative_eur }' },
]

interface WebhookStep {
  num: string
  title: string
  desc: string
}

interface WebhookRefEvent {
  event: string
  trigger: string
  payload: string
}

const webhookRefEvents: WebhookRefEvent[] = [
  { event: 'transaction.completed', trigger: 'TX settled', payload: '{ txId, amount, currency, partnerId, fee }' },
  { event: 'transaction.failed',    trigger: 'TX failed',  payload: '{ txId, reason, code }' },
  { event: 'kyc.passed',            trigger: 'User passed KYC', payload: '{ userId, sessionId, score }' },
  { event: 'kyc.flagged',           trigger: 'Manual review needed', payload: '{ userId, reason, documents[] }' },
  { event: 'partner.payout_queued', trigger: 'Monthly payout queued', payload: '{ partnerId, amount, period }' },
]

interface RateLimit {
  label: string
  value: string
}

const rateLimits: RateLimit[] = [
  { label: 'Quotes', value: '60 / min' },
  { label: 'Transactions', value: '30 / min' },
  { label: 'Prices', value: '120 / min' },
]

// ── API Explorer ─────────────────────────────────────────────────
interface ApiEndpoint { id: string; method: 'GET' | 'POST' | 'DELETE'; path: string; response: string }
const apiEndpoints: ApiEndpoint[] = [
  { id: 'init', method: 'POST', path: '/v1/sessions', response: `{\n  "session_id": "ses_abc123",\n  "widget_url": "https://widget.prodigy.example",\n  "expires_at": "2025-06-17T10:30:00Z",\n  "status": "active"\n}` },
  { id: 'kyc',  method: 'GET',  path: '/v1/kyc/:user_id', response: `{\n  "user_id": "usr_xyz789",\n  "status": "approved",\n  "tier": 2,\n  "check_duration_ms": 44200,\n  "passed_at": "2025-06-17T09:12:31Z"\n}` },
  { id: 'tx',   method: 'POST', path: '/v1/transactions', response: `{\n  "tx_id": "tx_def456",\n  "amount_fiat": 250.00,\n  "currency": "EUR",\n  "crypto": "BTC",\n  "crypto_amount": 0.00429,\n  "fee": 1.25,\n  "status": "settled"\n}` },
  { id: 'fees', method: 'GET',  path: '/v1/fees/estimate', response: `{\n  "base_fee_pct": 0.50,\n  "partner_override": null,\n  "network_fee_est": "€0.40",\n  "total_fee_est": "€1.65",\n  "effective_rate": "0.66%"\n}` },
  { id: 'hook', method: 'POST', path: '/v1/webhooks', response: `{\n  "webhook_id": "wh_ghi012",\n  "url": "https://yourapp.com/hooks",\n  "events": ["tx.settled", "kyc.approved"],\n  "secret": "whsec_...",\n  "active": true\n}` },
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

const webhookSteps: WebhookStep[] = [
  { num: '01', title: 'Expose an HTTPS endpoint',     desc: 'Your server must accept POST requests at a publicly reachable HTTPS URL. HTTP endpoints are rejected.' },
  { num: '02', title: 'Register in admin console',    desc: 'Navigate to Settings → Webhooks in the admin console. Enter your endpoint URL and select the events to subscribe to.' },
  { num: '03', title: 'Verify the signature',         desc: 'Every delivery includes X-Prodigy-Signature: sha256=<hmac>. Compute HMAC-SHA256 of the raw request body using your webhook secret. Reject requests where signatures do not match.' },
  { num: '04', title: 'Return 2xx within 10 seconds', desc: 'Return any 2xx status code within 10 seconds to acknowledge receipt. Failed deliveries are retried with exponential backoff for up to 24 hours.' },
]
</script>

<style scoped>
.ft-dev {
  --bg: #fafaf8;
  --ink: #0a0a0a;
  --accent: #b85c00;
  --ok: #1a7a1a;
  --muted: rgba(10,10,10,0.45);
  --font: 'Space Mono', monospace;

  background: var(--bg);
  color: var(--ink);
  font-family: var(--font);
}

.ft-rule { border: none; border-top: 1px solid var(--ink); margin: 0; }

/* Sysbar */
.ft-sysbar {
  display: flex; align-items: center; gap: 0.6rem;
  padding: 0.45rem 2rem; font-size: 0.7rem; letter-spacing: 0.07em;
}
.ft-sysbar-dot { opacity: 0.4; }
.ft-status em { font-style: normal; color: var(--ok); font-weight: 700; }

/* Hero */
.ft-hero { padding: 3rem 2rem 2.5rem; max-width: 860px; }
.ft-hero-label { font-size: 0.7rem; color: var(--muted); letter-spacing: 0.08em; margin-bottom: 1rem; }
.ft-headline {
  font-family: var(--font);
  font-size: clamp(1.4rem, 3.5vw, 2.25rem);
  font-weight: 700; line-height: 1.2;
  letter-spacing: 0.02em; margin: 0 0 1.25rem;
}
.ft-subhead { font-size: 0.85rem; line-height: 1.75; opacity: 0.7; margin: 0 0 2rem; max-width: 60ch; }
.ft-hero-links { display: flex; flex-wrap: wrap; gap: 0.75rem; }
.ft-pill {
  font-size: 0.72rem; letter-spacing: 0.06em;
  color: var(--muted); text-decoration: none;
  border: 1px solid rgba(10,10,10,0.25); padding: 0.35rem 0.75rem;
  transition: color 0.15s, border-color 0.15s;
}
.ft-pill:hover { color: var(--ink); border-color: var(--ink); }

/* Sections */
.ft-section { padding: 1.5rem 2rem; }
.ft-section-label { font-size: 0.68rem; color: var(--muted); letter-spacing: 0.09em; margin-bottom: 0.75rem; }
.ft-body-text { font-size: 0.8rem; line-height: 1.75; opacity: 0.75; margin: 0 0 1.25rem; max-width: 72ch; }

/* Code card */
.ft-code-card { border: 1px solid var(--ink); background: #0a0a0a; }
.ft-code-header { display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 1rem; border-bottom: 1px solid rgba(255,255,255,0.08); }
.ft-code-fname { font-size: 0.72rem; letter-spacing: 0.07em; color: rgba(255,255,255,0.4); }
.ft-copy-btn {
  font-size: 0.72rem; letter-spacing: 0.1em; background: none;
  border: 1px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.7);
  padding: 0.2rem 0.7rem; cursor: pointer; font-family: inherit;
  transition: border-color 0.15s, color 0.15s;
}
.ft-copy-btn:hover { border-color: rgba(255,255,255,0.6); color: #fff; }
.ft-code-block {
  margin: 0; padding: 1.5rem 1rem; overflow-x: auto;
  font-family: var(--font); font-size: 0.8125rem; line-height: 1.8;
}
.c { color: #6b7280; }
.t { color: #93c5fd; }
.a { color: #a5b4fc; }
.s { color: #86efac; }
.ft-ic {
  font-family: var(--font); font-size: 0.8rem;
  background: rgba(10,10,10,0.07); padding: 0.1em 0.4em;
  border: 1px solid rgba(10,10,10,0.12);
}

/* Tables */
.ft-table-wrap { overflow-x: auto; }
.ft-table {
  width: 100%; border-collapse: collapse; font-size: 0.78rem;
}
.ft-table th {
  text-align: left; font-size: 0.65rem; letter-spacing: 0.1em;
  color: var(--muted); border-bottom: 1px solid var(--ink);
  padding: 0.4rem 0.8rem; white-space: nowrap;
}
.ft-table td {
  padding: 0.55rem 0.8rem; border-bottom: 1px solid rgba(10,10,10,0.1);
  vertical-align: top; line-height: 1.5;
}
.ft-table tbody tr:hover td { background: rgba(10,10,10,0.03); }
.ft-field { font-weight: 700; font-size: 0.75rem; }
.ft-ok { color: var(--ok); font-weight: 700; }
.ft-muted { color: var(--muted); }
.ft-mono { font-family: var(--font); font-size: 0.75rem; }
.ft-method { font-weight: 700; font-size: 0.7rem; letter-spacing: 0.06em; padding: 0.1em 0.4em; border: 1px solid; display: inline-block; }
.ft-method--get { color: var(--ok); border-color: var(--ok); }
.ft-method--post { color: #1a4480; border-color: #1a4480; }

/* Steps */
.ft-steps { display: flex; flex-direction: column; border: 1px solid rgba(10,10,10,0.15); }
.ft-step {
  display: grid; grid-template-columns: 3.5rem 1fr;
  gap: 1rem; padding: 1.25rem;
  border-bottom: 1px solid rgba(10,10,10,0.1);
  align-items: start;
}
.ft-step:last-child { border-bottom: none; }
.ft-step:hover { background: rgba(10,10,10,0.02); }
.ft-step-num { font-size: 0.68rem; color: var(--muted); letter-spacing: 0.06em; padding-top: 2px; }
.ft-step-title { font-size: 0.78rem; font-weight: 700; margin: 0 0 0.4rem; letter-spacing: 0.03em; }
.ft-step-desc { font-size: 0.78rem; line-height: 1.65; color: var(--ink); opacity: 0.7; margin: 0; }

/* Buttons */
.ft-btn {
  font-family: var(--font); font-size: 0.75rem; letter-spacing: 0.09em; font-weight: 700;
  text-decoration: none; padding: 0.55rem 1.2rem; border: 1px solid; display: inline-block;
  transition: background 0.15s, color 0.15s;
}
.ft-btn--primary { background: var(--accent); border-color: var(--accent); color: var(--bg); }
.ft-btn--primary:hover { background: var(--ink); border-color: var(--ink); }
.ft-btn--ghost { background: transparent; border-color: var(--ink); color: var(--ink); }
.ft-btn--ghost:hover { background: var(--ink); color: var(--bg); }
.ft-btn--lg { font-size: 0.8rem; padding: 0.7rem 1.6rem; }

/* Dark sections */
.ft-section--dark {
  background: #0a0e1a;
  color: #f59e0b;
  padding: 1.5rem 2rem;
}

.ft-rule--dark {
  border: none;
  border-top: 1px solid rgba(245, 158, 11, 0.25);
  margin: 0;
  background: #0a0e1a;
}

.ft-webhook-title {
  font-family: 'Space Mono', monospace;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #f59e0b;
  margin-bottom: 0.75rem;
}

.ft-body-text--light {
  color: rgba(245, 158, 11, 0.6);
}

.ft-ic--dark {
  background: rgba(245, 158, 11, 0.1);
  border-color: rgba(245, 158, 11, 0.3);
  color: #f59e0b;
  font-family: 'Space Mono', monospace;
  font-size: 0.78rem;
  padding: 0.1em 0.4em;
}

.ft-table--dark th {
  color: rgba(245, 158, 11, 0.5);
  border-bottom: 1px solid rgba(245, 158, 11, 0.4);
}

.ft-table--dark td {
  border-bottom: 1px solid rgba(245, 158, 11, 0.12);
}

.ft-table--dark tbody tr:hover td {
  background: rgba(245, 158, 11, 0.04);
}

.ft-field--amber {
  color: #f59e0b;
  font-weight: 700;
  font-size: 0.75rem;
}

.ft-muted-light {
  color: rgba(245, 158, 11, 0.55);
  font-size: 0.78rem;
}

.ft-mono--amber {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: rgba(245, 158, 11, 0.75);
}

/* Rate limits */
.ft-rate-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border: 1px solid rgba(245, 158, 11, 0.35);
  margin-top: 1rem;
}

.ft-rate-card {
  padding: 1.25rem 1rem;
  border-right: 1px solid rgba(245, 158, 11, 0.35);
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.ft-rate-card:last-child { border-right: none; }

.ft-rate-card__label {
  font-family: 'Space Mono', monospace;
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  color: rgba(245, 158, 11, 0.5);
  margin: 0;
  text-transform: uppercase;
}

.ft-rate-card__value {
  font-family: 'Space Mono', monospace;
  font-size: 1.25rem;
  font-weight: 700;
  color: #f59e0b;
  margin: 0;
  line-height: 1;
}

.ft-rate-note {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: rgba(245, 158, 11, 0.6);
  margin: 1rem 0 0;
  line-height: 1.6;
}

/* CTA */
.ft-cta { padding: 2.5rem 2rem; }
.ft-cta-label { font-size: 0.68rem; color: var(--muted); letter-spacing: 0.09em; margin-bottom: 1rem; }
.ft-cta-body { font-size: 0.82rem; line-height: 1.75; margin: 0 0 1.5rem; opacity: 0.75; }
.ft-cta-actions { display: flex; flex-wrap: wrap; gap: 1rem; }

/* Footer */
.ft-footer {
  display: flex; flex-wrap: wrap; align-items: center; gap: 0.6rem;
  padding: 0.6rem 2rem; font-size: 0.68rem; letter-spacing: 0.07em; color: var(--muted);
}
.ft-footer-link { color: var(--muted); text-decoration: underline; text-underline-offset: 2px; }
.ft-footer-link:hover { color: var(--accent); }

/* Responsive */
@media (max-width: 900px) {
  .ft-table th:nth-child(4), .ft-table td:nth-child(4) { display: none; }
}

@media (max-width: 768px) {
  .ft-section--dark { padding-left: 1rem; padding-right: 1rem; }
  .ft-rate-grid { grid-template-columns: 1fr; }
  .ft-rate-card { border-right: none; border-bottom: 1px solid rgba(245,158,11,0.25); }
  .ft-rate-card:last-child { border-bottom: none; }
  .ft-hero, .ft-section, .ft-cta, .ft-footer { padding-left: 1rem; padding-right: 1rem; }
  .ft-sysbar { padding: 0.4rem 1rem; flex-wrap: wrap; }
  .ft-step { grid-template-columns: 2.5rem 1fr; }
}

@media (max-width: 600px) {
  .ft-table th:nth-child(3), .ft-table td:nth-child(3) { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .ft-btn { transition: none; }
}

/* ── Animation helpers ─────────────────────────────────────────── */
.ft-section-label { will-change: clip-path; }

/* ── Terminal Session ──────────────────────────────────────────── */
.fdev-terminal {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.terminal-block {
  margin-top: 1rem;
  background: #050810;
  border: 1px solid rgba(245, 158, 11, 0.3);
  font-family: 'IBM Plex Mono', monospace;
  max-width: 640px;
}

.terminal-block__header {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.875rem;
  border-bottom: 1px solid rgba(245, 158, 11, 0.2);
  background: rgba(245, 158, 11, 0.04);
}

.terminal-block__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.terminal-block__dot--red { background: #ff5f56; }
.terminal-block__dot--yellow { background: #ffbd2e; }
.terminal-block__dot--green { background: #27c93f; }

.terminal-block__title {
  font-size: 0.68rem;
  color: rgba(245, 158, 11, 0.4);
  letter-spacing: 0.06em;
  margin-left: 0.5rem;
}

.terminal-block__body {
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  min-height: 160px;
}

.tw-line {
  display: block;
  font-size: 0.82rem;
  line-height: 1.75;
  color: #f59e0b;
  white-space: pre;
}

.tw-line:empty::after {
  content: ' ';
}

/* ─── SDK Matrix ─── */
.fdev-sdk-table td {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75rem;
  vertical-align: middle;
}

/* ─── Sandbox Section ─── */
.fdev-sandbox__pre {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.82rem;
  line-height: 1.85;
  background: rgba(10, 14, 26, 0.6);
  border: 1px solid rgba(245, 158, 11, 0.25);
  padding: 1.25rem 1.5rem;
  overflow-x: auto;
  margin: 0.75rem 0 1.25rem;
  color: rgba(245, 158, 11, 0.6);
}

.fdev-sb-k { color: rgba(245, 158, 11, 0.55); font-weight: 700; }
.fdev-sb-sep { color: rgba(245, 158, 11, 0.3); }
.fdev-sb-v { color: #f59e0b; font-weight: 700; }
.fdev-sb-ok { color: #4ade80; font-weight: 700; }
.fdev-sb-no { color: rgba(239, 68, 68, 0.7); }
.fdev-sb-muted { color: rgba(245, 158, 11, 0.45); }

.fdev-sandbox__cta {
  margin-top: 0.25rem;
}

.fdev-sandbox__btn {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-decoration: none;
  padding: 0.55rem 1.25rem;
  background: #f59e0b;
  border: 1px solid #f59e0b;
  color: #0a0d12;
  display: inline-block;
  transition: background 0.15s, border-color 0.15s;
}

.fdev-sandbox__btn:hover {
  background: #fbbf24;
  border-color: #fbbf24;
}

/* ─── Amber Cursor ─── */
.fd-cursor { color: #f59e0b; animation: amber-blink 1s step-end infinite; font-family: 'IBM Plex Mono', monospace; }
@keyframes amber-blink { 0%,100%{opacity:1} 50%{opacity:0} }
@media (prefers-reduced-motion: reduce) { .fd-cursor { animation: none; } }

/* ── SDK Stats ── */
.ft-sdk-stats {
  display: flex; flex-wrap: wrap; gap: 2rem;
}
.ft-stat-item { display: flex; flex-direction: column; gap: 0.2rem; }
.ft-stat-val { font-family: 'IBM Plex Mono', monospace; font-size: 1.375rem; font-weight: 700; color: #f59e0b; line-height: 1; }
.ft-stat-label { font-family: 'Space Mono', monospace; font-size: 0.68rem; color: rgba(245,158,11,0.45); letter-spacing: 0.08em; text-transform: uppercase; }

/* ── API Explorer ── */
.ft-api-explorer-wrap {
  display: grid; grid-template-columns: 260px 1fr; gap: 0;
  border: 1px solid rgba(245,158,11,0.3); overflow: hidden; margin-top: 0.75rem;
}
.ft-api-endpoints { border-right: 1px solid rgba(245,158,11,0.2); }
.ft-api-ep-btn {
  display: flex; align-items: center; gap: 0.75rem;
  width: 100%; padding: 0.65rem 0.875rem;
  background: transparent; border: none; border-bottom: 1px solid rgba(245,158,11,0.12);
  cursor: pointer; text-align: left; font-family: 'IBM Plex Mono', monospace;
}
.ft-api-ep-btn:last-child { border-bottom: none; }
.ft-api-ep-btn.active { background: rgba(245,158,11,0.07); }
.ft-api-ep-btn:hover:not(.active) { background: rgba(245,158,11,0.03); }
.ft-api-method {
  font-family: 'IBM Plex Mono', monospace; font-size: 0.6875rem; font-weight: 700;
  padding: 0.2rem 0.4rem; flex-shrink: 0;
}
.ft-method-post { background: rgba(34,197,94,0.15); color: #4ade80; }
.ft-method-get  { background: rgba(59,130,246,0.15); color: #60a5fa; }
.ft-method-delete { background: rgba(239,68,68,0.15); color: #f87171; }
.ft-api-path { font-family: 'IBM Plex Mono', monospace; font-size: 0.78rem; color: rgba(245,158,11,0.75); }
.ft-api-response { padding: 1rem; background: rgba(255,255,255,0.02); overflow: auto; }
.ft-api-response-header { display: flex; justify-content: space-between; margin-bottom: 0.75rem; }
.ft-api-status { font-family: 'IBM Plex Mono', monospace; font-size: 0.8125rem; color: #4ade80; font-weight: 700; }
.ft-api-response-label { font-size: 0.75rem; color: rgba(245,158,11,0.4); }
.ft-api-code { font-family: 'IBM Plex Mono', monospace; font-size: 0.8125rem; color: rgba(245,158,11,0.85); margin: 0; white-space: pre; }
@media (max-width: 640px) {
  .ft-api-explorer-wrap { grid-template-columns: 1fr; }
  .ft-api-endpoints { border-right: none; border-bottom: 1px solid rgba(245,158,11,0.2); }
}

/* ── Webhook Events Reference ── */
.ft-wh-events { border: 1px solid rgba(245,158,11,0.25); margin-top: 0.75rem; }
.ft-wh-ev-row {
  display: grid; grid-template-columns: 11rem 1fr 1fr;
  gap: 1rem; padding: 0.65rem 0.875rem;
  border-bottom: 1px solid rgba(245,158,11,0.1);
  align-items: start; transition: background 0.15s;
}
.ft-wh-ev-row:last-child { border-bottom: none; }
.ft-wh-ev-row:hover { background: rgba(245,158,11,0.04); }
.ft-wh-ev-name { font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; font-weight: 700; color: #f59e0b; }
.ft-wh-ev-desc { font-family: 'Space Mono', monospace; font-size: 0.78rem; color: rgba(245,158,11,0.7); }
.ft-wh-ev-payload { font-family: 'IBM Plex Mono', monospace; font-size: 0.72rem; color: rgba(245,158,11,0.4); line-height: 1.5; }
@media (max-width: 640px) {
  .ft-wh-ev-row { grid-template-columns: 1fr; }
}

/* ── Changelog ── */
.ft-changelog-list { border: 1px solid rgba(245,158,11,0.25); margin-top: 0.75rem; }
.ft-cl-entry { padding: 0.875rem 1rem; border-bottom: 1px solid rgba(245,158,11,0.1); transition: background 0.15s; }
.ft-cl-entry:last-child { border-bottom: none; }
.ft-cl-entry:hover { background: rgba(245,158,11,0.04); }
.ft-cl-meta { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.375rem; flex-wrap: wrap; }
.ft-cl-version { font-family: 'IBM Plex Mono', monospace; font-size: 0.875rem; font-weight: 700; color: #f59e0b; }
.ft-cl-date { font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; color: rgba(245,158,11,0.45); }
.ft-cl-type { font-size: 0.6875rem; font-weight: 700; padding: 0.15rem 0.5rem; border-radius: 99px; text-transform: uppercase; letter-spacing: 0.06em; }
.ft-cl-type--major { background: rgba(239,68,68,0.15); color: #f87171; }
.ft-cl-type--minor { background: rgba(34,197,94,0.15); color: #4ade80; }
.ft-cl-type--patch { background: rgba(100,116,139,0.15); color: rgba(245,158,11,0.45); }
.ft-cl-desc { font-family: 'IBM Plex Mono', monospace; font-size: 0.8125rem; color: rgba(245,158,11,0.65); margin: 0; line-height: 1.55; }
</style>
