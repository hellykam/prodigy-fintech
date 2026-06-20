<template>
  <main>
    <!-- ── Section 1: Hero ──────────────────────────────────────────── -->
    <section class="dev-hero" aria-labelledby="dev-hero-heading">
      <div class="blob blob-1" aria-hidden="true" />
      <div class="blob blob-2" aria-hidden="true" />
      <div class="blob blob-3" aria-hidden="true" />

      <div class="dev-hero-inner">
        <h1 id="dev-hero-heading" class="dev-hero-h1" ref="heroH">
          From zero to widget in 5 minutes.
        </h1>
        <div class="badge-row" role="list" aria-label="Integration methods">
          <span class="method-badge" role="listitem">REST API</span>
          <span class="method-badge" role="listitem">WebSocket</span>
          <span class="method-badge" role="listitem">HTML Embed</span>
        </div>
      </div>
    </section>

    <!-- ── Code Showcase Terminal ────────────────────────────────────── -->
    <section class="code-showcase-section" aria-labelledby="code-showcase-heading">
      <div class="code-showcase-inner">
        <h2 id="code-showcase-heading" class="section-h2" data-reveal="fade-up">Ship in your stack.</h2>
        <div class="code-showcase-tabs" role="tablist" aria-label="Framework selector">
          <button
            class="showcase-tab"
            :class="{ 'showcase-tab--active': showcaseTab === 'react' }"
            type="button"
            role="tab"
            :aria-selected="showcaseTab === 'react'"
            @click="showcaseTab = 'react'"
          >React</button>
          <button
            class="showcase-tab"
            :class="{ 'showcase-tab--active': showcaseTab === 'vue' }"
            type="button"
            role="tab"
            :aria-selected="showcaseTab === 'vue'"
            @click="showcaseTab = 'vue'"
          >Vue</button>
          <button
            class="showcase-tab"
            :class="{ 'showcase-tab--active': showcaseTab === 'vanilla' }"
            type="button"
            role="tab"
            :aria-selected="showcaseTab === 'vanilla'"
            @click="showcaseTab = 'vanilla'"
          >Vanilla</button>
        </div>
        <div class="code-terminal-wrap" ref="terminalCard">
          <div class="code-terminal glass-card">
            <div class="code-terminal-header" aria-hidden="true">
              <span class="term-dot term-dot--red"></span>
              <span class="term-dot term-dot--yellow"></span>
              <span class="term-dot term-dot--green"></span>
              <span class="term-filename">{{ showcaseFilename }}</span>
            </div>
            <div class="code-terminal-body" role="tabpanel">
              <pre class="code-pre" v-if="showcaseTab === 'react'">{{ showcaseReact }}</pre>
              <pre class="code-pre" v-else-if="showcaseTab === 'vue'">{{ showcaseVue }}</pre>
              <pre class="code-pre" v-else>{{ showcaseVanilla }}</pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Section 2: Quick Start ──────────────────────────────────── -->
    <section class="quickstart-section" aria-labelledby="quickstart-heading">
      <div class="quickstart-inner">
        <h2 id="quickstart-heading" class="section-h2">Quick start.</h2>

        <div class="tab-row" role="tablist" aria-label="Integration method tabs" data-animate-stagger>
          <button
            class="tab-btn"
            :class="{ active: activeTab === 'html' }"
            role="tab"
            :aria-selected="activeTab === 'html'"
            aria-controls="tab-panel-html"
            id="tab-html"
            @click="activeTab = 'html'"
          >
            HTML Embed
          </button>
          <button
            class="tab-btn"
            :class="{ active: activeTab === 'rest' }"
            role="tab"
            :aria-selected="activeTab === 'rest'"
            aria-controls="tab-panel-rest"
            id="tab-rest"
            @click="activeTab = 'rest'"
          >
            REST API
          </button>
          <button
            class="tab-btn"
            :class="{ active: activeTab === 'ws' }"
            role="tab"
            :aria-selected="activeTab === 'ws'"
            aria-controls="tab-panel-ws"
            id="tab-ws"
            @click="activeTab = 'ws'"
          >
            WebSocket
          </button>
        </div>

        <div
          v-if="activeTab === 'html'"
          id="tab-panel-html"
          role="tabpanel"
          aria-labelledby="tab-html"
          class="tab-panel"
        >
          <CodeBlock :code="htmlCode" language="html" :selfType="true" />
        </div>

        <div
          v-if="activeTab === 'rest'"
          id="tab-panel-rest"
          role="tabpanel"
          aria-labelledby="tab-rest"
          class="tab-panel"
        >
          <CodeBlock :code="restCode" language="bash" :selfType="true" />
        </div>

        <div
          v-if="activeTab === 'ws'"
          id="tab-panel-ws"
          role="tabpanel"
          aria-labelledby="tab-ws"
          class="tab-panel"
        >
          <CodeBlock :code="wsCode" language="js" :selfType="true" />
        </div>
      </div>
    </section>

    <!-- ── Section 3: API Endpoints Table ─────────────────────────── -->
    <section class="endpoints-section" aria-labelledby="endpoints-heading">
      <div class="endpoints-inner">
        <h2 id="endpoints-heading" class="section-h2">API endpoints.</h2>

        <div class="table-wrapper" role="region" aria-label="API endpoint reference" tabindex="0">
          <table class="endpoints-table">
            <thead>
              <tr>
                <th scope="col">Method</th>
                <th scope="col">Endpoint</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(ep, i) in endpoints" :key="i">
                <td>
                  <span class="method-badge-table" :class="`method-${ep.method.toLowerCase()}`">
                    {{ ep.method }}
                  </span>
                </td>
                <td class="endpoint-path">{{ ep.path }}</td>
                <td class="endpoint-desc">{{ ep.desc }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ── Section 4: SDK Config Options ──────────────────────────── -->
    <section class="sdk-section" aria-labelledby="sdk-heading">
      <div class="sdk-inner">
        <h2 id="sdk-heading" class="section-h2">SDK config options.</h2>

        <div class="sdk-grid" data-animate-stagger>
          <article class="glass-card sdk-card" v-for="opt in sdkOptions" :key="opt.attr">
            <code class="sdk-attr">{{ opt.attr }}</code>
            <p class="sdk-values">{{ opt.values }}</p>
            <p class="sdk-desc">{{ opt.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- ── Section 5: Rate Limits ────────────────────────────────── -->
    <section class="rate-limits-section" aria-labelledby="rate-limits-heading" data-reveal="fade-up">
      <div class="rate-limits-inner">
        <h2 id="rate-limits-heading" class="section-h2">Rate limits.</h2>
        <div class="rate-cards" data-animate-stagger>
          <article class="glass-card rate-card" v-for="limit in rateLimits" :key="limit.endpoint">
            <div class="rate-num">{{ limit.rate }}</div>
            <div class="rate-label">{{ limit.label }}</div>
            <code class="rate-endpoint">{{ limit.endpoint }}</code>
          </article>
        </div>
        <p class="rate-note">
          <span class="rate-note-badge">429</span>
          Exceeds limit → HTTP 429 + <code class="rate-code">Retry-After</code> header.
        </p>
      </div>
    </section>

    <!-- ── SDK Grid ──────────────────────────────────────────────────── -->
    <section class="gpd-sdk-section" aria-labelledby="gpd-sdk-heading">
      <div class="gpd-sdk-inner">
        <h2 id="gpd-sdk-heading" class="gpd-sdk-h2" data-reveal="fade-up">
          <span class="gpd-grad">Every platform. Every stack.</span>
        </h2>
        <div class="gpd-sdk-grid" data-animate-stagger>
          <article class="glass-card gpd-sdk-card">
            <span class="gpd-pkg-name">@prodigy/react</span>
            <span class="gpd-runtime">React 18+, Next.js</span>
            <code class="gpd-install">npm i @prodigy/react</code>
          </article>
          <article class="glass-card gpd-sdk-card">
            <span class="gpd-pkg-name">@prodigy/vue</span>
            <span class="gpd-runtime">Vue 3, Nuxt 3</span>
            <code class="gpd-install">npm i @prodigy/vue</code>
          </article>
          <article class="glass-card gpd-sdk-card">
            <span class="gpd-pkg-name">@prodigy/react-native</span>
            <span class="gpd-runtime">iOS + Android</span>
            <code class="gpd-install">npm i @prodigy/react-native</code>
          </article>
          <article class="glass-card gpd-sdk-card">
            <span class="gpd-pkg-name">prodigy-ios</span>
            <span class="gpd-runtime">Swift, SwiftUI</span>
            <code class="gpd-install">pod 'ProdigyiOS'</code>
          </article>
          <article class="glass-card gpd-sdk-card">
            <span class="gpd-pkg-name">prodigy-android</span>
            <span class="gpd-runtime">Kotlin, Jetpack</span>
            <code class="gpd-install">implementation 'io.prodigy:sdk'</code>
          </article>
          <article class="glass-card gpd-sdk-card">
            <span class="gpd-pkg-name">Vanilla JS</span>
            <span class="gpd-runtime">ES module, CDN</span>
            <code class="gpd-install">import 'prodigy-widget'</code>
          </article>
        </div>
      </div>
    </section>

    <!-- ── SDK Stats ───────────────────────────────────────────── -->
    <div class="gpd-sdk-stats-wrap" data-animate-stagger>
      <div class="gpd-sdk-stats-inner">
        <div class="gpd-stat-item">
          <span class="gpd-stat-val">2.1M+</span>
          <span class="gpd-stat-label">Weekly downloads</span>
        </div>
        <div class="gpd-stat-item">
          <span class="gpd-stat-val">4.9★</span>
          <span class="gpd-stat-label">npm rating</span>
        </div>
        <div class="gpd-stat-item">
          <span class="gpd-stat-val">MIT</span>
          <span class="gpd-stat-label">License</span>
        </div>
        <div class="gpd-stat-item">
          <span class="gpd-stat-val">v3.4.1</span>
          <span class="gpd-stat-label">Latest stable</span>
        </div>
      </div>
    </div>

    <!-- ── API Explorer ─────────────────────────────────────────── -->
    <section class="gpd-api-explorer-section" aria-labelledby="gpd-api-explorer-h" data-reveal="fade-up">
      <div class="gpd-api-inner">
        <h2 id="gpd-api-explorer-h" class="section-h2">API explorer.</h2>
        <div class="gpd-api-explorer-wrap">
          <div class="gpd-api-endpoints" role="tablist">
            <button
              v-for="ep in apiEndpoints"
              :key="ep.id"
              class="gpd-api-ep-btn"
              :class="{ active: activeEp === ep.id }"
              role="tab"
              :aria-selected="activeEp === ep.id"
              @click="activeEp = ep.id"
            >
              <span class="gpd-api-method" :class="`gpd-method-${ep.method.toLowerCase()}`">{{ ep.method }}</span>
              <span class="gpd-api-path">{{ ep.path }}</span>
            </button>
          </div>
          <div class="gpd-api-response" role="tabpanel" aria-live="polite">
            <div class="gpd-api-response-header">
              <span class="gpd-api-status">200 OK</span>
              <span class="gpd-api-response-label">Response</span>
            </div>
            <pre class="gpd-api-code">{{ currentEndpoint.response }}</pre>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Webhook Events Reference ─────────────────────────────── -->
    <section class="gpd-wh-section" aria-labelledby="gpd-wh-events-h" data-reveal="fade-up">
      <div class="gpd-api-inner">
        <h2 id="gpd-wh-events-h" class="section-h2">Webhook events.</h2>
        <div class="gpd-wh-events" data-animate-stagger>
          <div v-for="ev in webhookEventsNew" :key="ev.name" class="gpd-wh-row">
            <code class="gpd-wh-name">{{ ev.name }}</code>
            <span class="gpd-wh-desc">{{ ev.desc }}</span>
            <span class="gpd-wh-payload">{{ ev.payload }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Changelog ─────────────────────────────────────────────── -->
    <section class="gpd-changelog-section" aria-labelledby="gpd-changelog-h" data-reveal="fade-up">
      <div class="gpd-api-inner">
        <h2 id="gpd-changelog-h" class="section-h2">Latest updates.</h2>
        <div class="gpd-changelog-list" data-animate-stagger>
          <div v-for="entry in changelog" :key="entry.version" class="gpd-cl-entry glass-card">
            <div class="gpd-cl-meta">
              <span class="gpd-cl-version">{{ entry.version }}</span>
              <span class="gpd-cl-date">{{ entry.date }}</span>
              <span class="gpd-cl-type" :class="`gpd-cl-type--${entry.type}`">{{ entry.type }}</span>
            </div>
            <p class="gpd-cl-desc">{{ entry.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Sandbox Card ───────────────────────────────────────────────── -->
    <section class="gpd-sandbox-section" aria-labelledby="gpd-sandbox-heading">
      <div class="gpd-sandbox-inner">
        <div class="glass-card gpd-sandbox-card" data-reveal="fade-up">
          <h2 id="gpd-sandbox-heading" class="gpd-sandbox-h2">Full sandbox. Beautiful flows. Zero real money.</h2>
          <a
            href="http://localhost:5005"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-gradient gpd-sandbox-btn"
          >Open Sandbox →</a>
        </div>
      </div>
    </section>

    <!-- ── Section 6: CTA ──────────────────────────────────────────── -->
    <section class="dev-cta" aria-labelledby="dev-cta-heading">
      <div class="blob blob-cta-1" aria-hidden="true" />
      <div class="blob blob-cta-2" aria-hidden="true" />
      <div class="dev-cta-inner">
        <h2 id="dev-cta-heading" class="dev-cta-h2">Ready to build?</h2>
        <a
          href="http://localhost:5005"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-gradient"
        >
          Open the sandbox →
        </a>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { CodeBlock } from '@/components/shared'
import { useTypewriter } from '@/composables/useTypewriter'
import { useCardTilt } from '@/composables/useCardTilt'

// ── Typewriter on h1 ────────────────────────────────────────────
const heroH = ref<HTMLElement | null>(null)
useTypewriter(heroH, { speed: 28, delay: 100, cursor: true })

// ── Terminal card tilt ───────────────────────────────────────────
const terminalCard = ref<HTMLElement | null>(null)
useCardTilt(terminalCard, { maxTilt: 3, glowColor: '#a855f7', glowIntensity: 0.4 })

// ── Code showcase tab switcher ───────────────────────────────────
const showcaseTab = ref<'react' | 'vue' | 'vanilla'>('react')

const showcaseFilename = computed(() => {
  if (showcaseTab.value === 'react') return 'App.tsx'
  if (showcaseTab.value === 'vue') return 'App.vue'
  return 'main.js'
})

const showcaseReact = `import { ProdigyWidget } from '@prodigy/react'

export default function App() {
  return (
    <ProdigyWidget
      apiKey="pk_live_..."
      currency="BTC"
      onSuccess={(tx) => console.log(tx)}
    />
  )
}`

const showcaseVue = `<template>
  <ProdigyWidget
    api-key="pk_live_..."
    currency="BTC"
    @success="handleSuccess"
  />
</template>`

const showcaseVanilla = `import ProdigySdk from 'prodigy-vanilla'

ProdigySdk.mount('#widget', {
  apiKey: 'pk_live_...',
  currency: 'BTC'
})`

const activeTab = ref<'html' | 'rest' | 'ws'>('html')

const htmlCode = `<script src="https://widget.prodigy.demo/embed.js"><\/script>
<div
  id="prodigy-widget"
  data-b2b-client="YOUR_PARTNER_ID"
  data-theme="gradient"
></div>`

const restCode = `curl -X POST https://api.prodigy.demo/v1/quote \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"from":"EUR","to":"BTC","amount":850}'`

const wsCode = `const ws = new WebSocket('wss://ws.prodigy.demo/v1/stream')
ws.onopen = () => ws.send(JSON.stringify({
  type: 'SUBSCRIBE',
  channels: ['prices', 'transactions'],
  partnerId: 'YOUR_PARTNER_ID'
}))
ws.onmessage = ({ data }) => console.log(JSON.parse(data))`

const endpoints = [
  { method: 'GET',    path: '/v1/prices',            desc: 'Live BTC/ETH/SOL/USDC mid-prices' },
  { method: 'POST',   path: '/v1/quote',             desc: 'Lock a buy/sell quote (TTL 30s)' },
  { method: 'POST',   path: '/v1/transactions',      desc: 'Submit a transaction' },
  { method: 'GET',    path: '/v1/transactions/:id',  desc: 'Transaction status' },
  { method: 'GET',    path: '/v1/partner/balance',   desc: 'Current partner balance' },
  { method: 'POST',   path: '/v1/kyc/session',       desc: 'Start a KYC session' },
  { method: 'GET',    path: '/v1/kyc/:sessionId',    desc: 'KYC session status' },
  { method: 'GET',    path: '/v1/webhooks',          desc: 'List registered webhooks' },
  { method: 'POST',   path: '/v1/webhooks',          desc: 'Register a webhook' },
  { method: 'DELETE', path: '/v1/webhooks/:id',      desc: 'Remove a webhook' },
]

interface RateLimit { rate: string; label: string; endpoint: string }

const rateLimits: RateLimit[] = [
  { rate: '60/min', label: 'Quote Requests', endpoint: '/v1/quote' },
  { rate: '30/min', label: 'Transactions', endpoint: '/v1/transactions' },
  { rate: '120/min', label: 'Price Lookups', endpoint: '/v1/prices' },
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

const sdkOptions = [
  {
    attr: 'data-theme',
    values: '"light" | "dark" | "gradient" | "crypto"',
    desc: 'Visual appearance of the embedded widget.',
  },
  {
    attr: 'data-currencies',
    values: 'e.g. "BTC,ETH,SOL"',
    desc: 'Comma-separated list of assets shown to the user in the widget.',
  },
  {
    attr: 'data-on-complete',
    values: 'JS callback name',
    desc: 'Name of a global function called after a transaction completes. Receives the transaction object.',
  },
]
</script>

<style scoped>
/* ── Tokens ─────────────────────────────────────────────────────── */
main {
  background: #0f0a1e;
  color: #fff;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.section-h2 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: 800;
  line-height: 1.15;
  margin: 0 0 2.5rem;
  text-align: center;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.glass-card {
  backdrop-filter: blur(16px);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
}

/* ── Blobs ──────────────────────────────────────────────────────── */
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
}

.btn-gradient:hover {
  opacity: 0.88;
  transform: translateY(-2px);
}

.btn-gradient:focus-visible {
  outline: 2px solid #a855f7;
  outline-offset: 3px;
}

/* ── Section 1: Hero ────────────────────────────────────────────── */
.dev-hero {
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
  top: 30%;
  right: -80px;
}

.blob-3 {
  width: 300px;
  height: 300px;
  background: #3b82f6;
  bottom: -100px;
  left: 35%;
}

.dev-hero-inner {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.dev-hero-h1 {
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

.badge-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  justify-content: center;
}

.method-badge {
  font-family: 'Space Mono', monospace;
  font-size: 0.8125rem;
  font-weight: 700;
  color: #a855f7;
  background: rgba(168, 85, 247, 0.1);
  border: 1px solid rgba(168, 85, 247, 0.3);
  border-radius: 100px;
  padding: 0.375rem 1rem;
}

/* ── Section 2: Quick Start ─────────────────────────────────────── */
.quickstart-section {
  padding: 5rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.quickstart-inner {
  max-width: 860px;
  margin: 0 auto;
}

.tab-row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
  justify-content: center;
}

.tab-btn {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 100px;
  padding: 0.5rem 1.25rem;
  cursor: pointer;
  transition: all 0.15s;
}

.tab-btn:hover {
  color: #fff;
  border-color: rgba(168, 85, 247, 0.5);
}

.tab-btn.active {
  color: #fff;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  border-color: transparent;
}

.tab-btn:focus-visible {
  outline: 2px solid #a855f7;
  outline-offset: 2px;
}

.tab-panel {
  width: 100%;
}

/* ── Section 3: Endpoints Table ─────────────────────────────────── */
.endpoints-section {
  padding: 5rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.endpoints-inner {
  max-width: 1000px;
  margin: 0 auto;
}

.table-wrapper {
  overflow-x: auto;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
}

.table-wrapper:focus-visible {
  outline: 2px solid #a855f7;
  outline-offset: 2px;
}

.endpoints-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.endpoints-table thead tr {
  background: rgba(255, 255, 255, 0.06);
}

.endpoints-table th {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  padding: 0.875rem 1.25rem;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.endpoints-table tbody tr:nth-child(even) {
  background: rgba(255, 255, 255, 0.025);
}

.endpoints-table tbody tr:hover {
  background: rgba(168, 85, 247, 0.06);
}

.endpoints-table td {
  padding: 0.875rem 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  vertical-align: middle;
}

.endpoints-table tbody tr:last-child td {
  border-bottom: none;
}

.method-badge-table {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 6px;
  padding: 0.25rem 0.5rem;
  display: inline-block;
}

.method-get    { color: #34d399; background: rgba(52, 211, 153, 0.12); }
.method-post   { color: #60a5fa; background: rgba(96, 165, 250, 0.12); }
.method-delete { color: #f87171; background: rgba(248, 113, 113, 0.12); }

.endpoint-path {
  font-family: 'Space Mono', monospace;
  font-size: 0.8125rem;
  color: #a78bfa;
}

.endpoint-desc {
  color: rgba(255, 255, 255, 0.7);
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* ── Section 4: SDK Options ─────────────────────────────────────── */
.sdk-section {
  padding: 5rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.sdk-inner {
  max-width: 1000px;
  margin: 0 auto;
}

.sdk-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.sdk-card {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.sdk-attr {
  font-family: 'Space Mono', monospace;
  font-size: 0.875rem;
  color: #a855f7;
  background: rgba(168, 85, 247, 0.1);
  border-radius: 6px;
  padding: 0.25rem 0.5rem;
  display: inline-block;
  width: fit-content;
}

.sdk-values {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.45);
  margin: 0;
  line-height: 1.5;
}

.sdk-desc {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.65;
  margin: 0;
  flex: 1;
}

/* ── Section 5: Rate Limits ─────────────────────────────────────── */
.rate-limits-section {
  padding: 5rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.rate-limits-inner {
  max-width: 1000px;
  margin: 0 auto;
}

.rate-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-bottom: 1.75rem;
}

.rate-card {
  padding: 2rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
}

.rate-num {
  font-family: 'Space Mono', monospace;
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 700;
  line-height: 1;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.rate-label {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.9375rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
}

.rate-endpoint {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: #a78bfa;
  background: rgba(168, 85, 247, 0.1);
  border-radius: 6px;
  padding: 0.2rem 0.5rem;
  margin-top: 0.25rem;
}

.rate-note {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 0.875rem 1.25rem;
}

.rate-note-badge {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  color: #f87171;
  background: rgba(248, 113, 113, 0.12);
  border-radius: 6px;
  padding: 0.2rem 0.5rem;
  flex-shrink: 0;
}

.rate-code {
  font-family: 'Space Mono', monospace;
  font-size: 0.8125rem;
  color: #a78bfa;
  background: rgba(168, 85, 247, 0.1);
  border-radius: 4px;
  padding: 0.1rem 0.35rem;
}

@media (max-width: 900px) {
  .rate-cards { grid-template-columns: 1fr; }
}

/* ── SDK Grid ───────────────────────────────────────────────────── */
.gpd-grad {
  background: linear-gradient(135deg, #a855f7, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.gpd-sdk-section {
  padding: 5rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}
.gpd-sdk-inner {
  max-width: 1000px;
  margin: 0 auto;
}
.gpd-sdk-h2 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800;
  text-align: center;
  margin: 0 0 2.5rem;
}
.gpd-sdk-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}
.gpd-sdk-card {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.gpd-pkg-name {
  font-family: 'Space Mono', monospace;
  font-size: 0.9375rem;
  font-weight: 700;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.gpd-runtime {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.45);
  font-weight: 500;
}
.gpd-install {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.06);
  border-radius: 6px;
  padding: 0.375rem 0.625rem;
  display: block;
  margin-top: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
@media (max-width: 768px) {
  .gpd-sdk-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 480px) {
  .gpd-sdk-grid { grid-template-columns: 1fr; }
}

/* ── Sandbox Card ───────────────────────────────────────────────── */
.gpd-sandbox-section {
  padding: 3rem 1.5rem 5rem;
}
.gpd-sandbox-inner {
  max-width: 760px;
  margin: 0 auto;
}
.gpd-sandbox-card {
  padding: 3rem 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
  text-align: center;
}
.gpd-sandbox-h2 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  font-weight: 700;
  color: #fff;
  margin: 0;
  line-height: 1.3;
}
.gpd-sandbox-btn {
  font-size: 1rem;
}

/* ── Section 6: CTA ─────────────────────────────────────────────── */
.dev-cta {
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

.dev-cta-inner {
  position: relative;
  z-index: 1;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.dev-cta-h2 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(2rem, 4.5vw, 3.25rem);
  font-weight: 800;
  line-height: 1.1;
  margin: 0;
  color: #fff;
}

/* ── Responsive ─────────────────────────────────────────────────── */
@media (max-width: 900px) {
  .sdk-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .tab-row {
    gap: 0.375rem;
  }

  .endpoints-table th,
  .endpoints-table td {
    padding: 0.625rem 0.875rem;
    font-size: 0.8125rem;
  }
}

/* ── Animated gradient border on endpoints table ────────────────── */
.table-wrapper { position: relative; }
.table-wrapper::before { content: ''; position: absolute; inset: -1px; border-radius: inherit; background: linear-gradient(135deg, #a855f7, #ec4899, #6366f1); z-index: -1; animation: grad-border-spin 4s linear infinite; }
@keyframes grad-border-spin { from { filter: hue-rotate(0deg); } to { filter: hue-rotate(360deg); } }

/* ── Code Showcase ──────────────────────────────────────────────── */
.code-showcase-section {
  padding: 5rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.code-showcase-inner {
  max-width: 860px;
  margin: 0 auto;
}

.code-showcase-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.showcase-tab {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 100px;
  padding: 0.5rem 1.25rem;
  cursor: pointer;
  transition: all 0.15s;
}

.showcase-tab:hover {
  color: #fff;
  border-color: rgba(168, 85, 247, 0.5);
}

.showcase-tab:focus-visible {
  outline: 2px solid #a855f7;
  outline-offset: 2px;
}

.showcase-tab--active {
  color: #fff;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  border-color: transparent;
}

.code-terminal-wrap {
  width: 100%;
}

.code-terminal {
  overflow: hidden;
  box-shadow: 0 0 40px rgba(168, 85, 247, 0.2);
  border-color: rgba(168, 85, 247, 0.3) !important;
}

.code-terminal-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: rgba(255, 255, 255, 0.03);
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.term-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.term-dot--red    { background: #ff5f57; }
.term-dot--yellow { background: #febc2e; }
.term-dot--green  { background: #28c840; }

.term-filename {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
  margin-left: 0.5rem;
}

.code-terminal-body {
  padding: 1.5rem;
}

.code-pre {
  font-family: 'Space Mono', 'Courier New', monospace;
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
  white-space: pre;
  overflow-x: auto;
  line-height: 1.75;
}

/* ── Reduced motion ─────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .btn-gradient:hover {
    transform: none;
  }
  .table-wrapper::before { animation: none; }
}

/* ── SDK Stats ── */
.gpd-sdk-stats-wrap {
  padding: 2rem 1.5rem;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.gpd-sdk-stats-inner {
  max-width: 1000px; margin: 0 auto;
  display: flex; flex-wrap: wrap; gap: 2rem;
}
.gpd-stat-item { display: flex; flex-direction: column; gap: 0.25rem; }
.gpd-stat-val {
  font-family: 'Space Mono', monospace; font-size: 1.5rem; font-weight: 700; line-height: 1;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.gpd-stat-label {
  font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.75rem;
  color: rgba(255,255,255,0.45); letter-spacing: 0.04em;
}

/* ── API Explorer ── */
.gpd-api-explorer-section {
  padding: 5rem 1.5rem;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.gpd-api-inner { max-width: 1000px; margin: 0 auto; }
.gpd-api-explorer-wrap {
  display: grid; grid-template-columns: 280px 1fr; gap: 0;
  border: 1px solid rgba(168,85,247,0.3); border-radius: 12px; overflow: hidden;
}
.gpd-api-endpoints { border-right: 1px solid rgba(168,85,247,0.2); }
.gpd-api-ep-btn {
  display: flex; align-items: center; gap: 0.75rem;
  width: 100%; padding: 0.75rem 1rem;
  background: transparent; border: none; border-bottom: 1px solid rgba(168,85,247,0.15);
  cursor: pointer; text-align: left;
}
.gpd-api-ep-btn:last-child { border-bottom: none; }
.gpd-api-ep-btn.active { background: rgba(168,85,247,0.12); }
.gpd-api-ep-btn:hover:not(.active) { background: rgba(168,85,247,0.06); }
.gpd-api-method {
  font-family: 'Space Mono', monospace; font-size: 0.6875rem; font-weight: 700;
  padding: 0.2rem 0.4rem; border-radius: 4px; flex-shrink: 0;
}
.gpd-method-post { background: rgba(52,211,153,0.15); color: #34d399; }
.gpd-method-get  { background: rgba(96,165,250,0.15); color: #60a5fa; }
.gpd-method-delete { background: rgba(248,113,113,0.15); color: #f87171; }
.gpd-api-path { font-family: 'Space Mono', monospace; font-size: 0.8125rem; color: #a78bfa; }
.gpd-api-response { padding: 1rem; background: rgba(255,255,255,0.03); overflow: auto; }
.gpd-api-response-header { display: flex; justify-content: space-between; margin-bottom: 0.75rem; }
.gpd-api-status { font-family: 'Space Mono', monospace; font-size: 0.8125rem; color: #34d399; font-weight: 700; }
.gpd-api-response-label { font-size: 0.75rem; color: rgba(255,255,255,0.35); }
.gpd-api-code { font-family: 'Space Mono', monospace; font-size: 0.8125rem; color: rgba(255,255,255,0.8); margin: 0; white-space: pre; }
@media (max-width: 640px) {
  .gpd-api-explorer-wrap { grid-template-columns: 1fr; }
  .gpd-api-endpoints { border-right: none; border-bottom: 1px solid rgba(168,85,247,0.2); }
}

/* ── Webhook Events Reference ── */
.gpd-wh-section {
  padding: 5rem 1.5rem;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.gpd-wh-events {
  border: 1px solid rgba(168,85,247,0.25); border-radius: 12px; overflow: hidden;
}
.gpd-wh-row {
  display: grid; grid-template-columns: 12rem 1fr 1fr;
  gap: 1rem; padding: 0.75rem 1.25rem;
  border-bottom: 1px solid rgba(168,85,247,0.12);
  align-items: start; transition: background 0.15s;
}
.gpd-wh-row:last-child { border-bottom: none; }
.gpd-wh-row:hover { background: rgba(168,85,247,0.06); }
.gpd-wh-name {
  font-family: 'Space Mono', monospace; font-size: 0.8125rem; font-weight: 700;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.gpd-wh-desc { font-size: 0.875rem; color: rgba(255,255,255,0.75); }
.gpd-wh-payload { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: rgba(255,255,255,0.4); line-height: 1.5; }
@media (max-width: 640px) {
  .gpd-wh-row { grid-template-columns: 1fr; }
}

/* ── Changelog ── */
.gpd-changelog-section {
  padding: 5rem 1.5rem;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.gpd-changelog-list { display: flex; flex-direction: column; gap: 0.75rem; }
.gpd-cl-entry { padding: 1.25rem 1.5rem; }
.gpd-cl-meta { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; flex-wrap: wrap; }
.gpd-cl-version { font-family: 'Space Mono', monospace; font-size: 0.875rem; font-weight: 700; background: linear-gradient(135deg, #a855f7, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.gpd-cl-date { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: rgba(255,255,255,0.4); }
.gpd-cl-type { font-size: 0.6875rem; font-weight: 700; padding: 0.15rem 0.5rem; border-radius: 99px; text-transform: uppercase; letter-spacing: 0.06em; }
.gpd-cl-type--major { background: rgba(239,68,68,0.15); color: #f87171; }
.gpd-cl-type--minor { background: rgba(34,197,94,0.15); color: #4ade80; }
.gpd-cl-type--patch { background: rgba(168,85,247,0.15); color: #a78bfa; }
.gpd-cl-desc { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.875rem; color: rgba(255,255,255,0.65); margin: 0; line-height: 1.6; }
</style>
