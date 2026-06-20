<script setup lang="ts">
import { ref, computed } from 'vue'
import { CodeBlock } from '@/components/shared'
import { useClipReveal, useGradientSweep } from '@/composables/useSplitReveal'
import { useMagneticButton } from '@/composables/useMagneticButton'
import { useTypewriter } from '@/composables/useTypewriter'
import { useCardTiltAll } from '@/composables/useCardTilt'

// ── WOW Animations ───────────────────────────────────────────────
const heroH = ref<HTMLElement | null>(null)
const heroSub = ref<HTMLElement | null>(null)
const qsH = ref<HTMLElement | null>(null)
const sdkH = ref<HTMLElement | null>(null)
const sandboxBtn = ref<HTMLElement | null>(null)
const quickstartContainer = ref<HTMLElement | null>(null)

useClipReveal(heroSub, { direction: 'up', duration: 0.9, delay: 0.3 })
useClipReveal(qsH, { direction: 'up', duration: 0.85 })
useClipReveal(sdkH, { direction: 'up', duration: 0.85 })
useGradientSweep(heroH, { color: '#6366f1', duration: 1100 })
useMagneticButton(sandboxBtn, { strength: 0.3, returnDuration: 500 })
useTypewriter(sdkH, { speed: 30, delay: 0, cursor: true })
useCardTiltAll(quickstartContainer, '.quickstart-card', { maxTilt: 5, scale: 1.02, glowColor: '#6366f1', glowIntensity: 0.15 })

// ── Language selector ─────────────────────────────────────────────
const activeLang = ref<string>('react')

const languages = [
  { key: 'react', label: 'React' },
  { key: 'vue', label: 'Vue' },
  { key: 'reactnative', label: 'React Native' },
  { key: 'ios', label: 'iOS' },
  { key: 'android', label: 'Android' },
  { key: 'vanilla', label: 'Vanilla JS' },
]

const reactCode = `import { ProdigyWidget } from '@prodigy/react'

export default function App() {
  return (
    <ProdigyWidget
      apiKey="pk_live_..."
      currency="BTC"
      onSuccess={(tx) => console.log(tx)}
    />
  )
}`

const vueCode = `<template>\n  <ProdigyWidget\n    api-key="pk_live_..."\n    currency="BTC"\n    @success="handleSuccess"\n  />\n<\/template>`

const reactNativeCode = `import { ProdigyWidget } from '@prodigy/react-native'

export default function App() {
  return (
    <ProdigyWidget
      apiKey="pk_live_..."
      currency="BTC"
      onSuccess={(tx) => console.log(tx)}
    />
  )
}`

const iosCode = `import ProdigySDK

let widget = ProdigyWidget(apiKey: "pk_live_...", currency: "BTC")
widget.onSuccess = { tx in print(tx) }
view.addSubview(widget)`

const androidCode = `val widget = ProdigyWidget(context, apiKey = "pk_live_...", currency = "BTC")
widget.onSuccess = { tx -> Log.d("Prodigy", tx.toString()) }
layout.addView(widget)`

const vanillaCode = `import ProdigySdk from 'prodigy-vanilla'

ProdigySdk.mount('#widget', {
  apiKey: 'pk_live_...',
  currency: 'BTC'
})`

type TabKey = 'widget' | 'rest' | 'ws'
const activeTab = ref<TabKey>('widget')

const tabs: { key: TabKey; label: string }[] = [
  { key: 'widget', label: 'Widget (HTML)' },
  { key: 'rest',   label: 'REST API' },
  { key: 'ws',     label: 'WebSocket' },
]

const widgetCode = `<!-- Install: no npm needed -->
<script src="https://widget.prodigy.demo/embed.js"><\/script>

<div
  id="prodigy-widget"
  data-b2b-client="YOUR_PARTNER_ID"
  data-theme="light"
  data-currencies="BTC,ETH,USDC"
></div>`

const restCode = `# Get a live quote
curl -X POST https://api.prodigy.demo/v1/quote \\
  -H "Authorization: Bearer sk_live_YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"from":"EUR","to":"BTC","amount":1000}'

# Response
{ "quoteId": "q_8f3k2", "rate": 58234, "fee": 5.00, "ttl": 30 }`

const wsCode = `// Subscribe to live price updates
const ws = new WebSocket('wss://ws.prodigy.demo/v1/stream')

ws.send(JSON.stringify({
  type: 'SUBSCRIBE',
  channels: ['prices'],
  partnerId: 'YOUR_PARTNER_ID'
}))

ws.onmessage = ({ data }) => {
  const { BTC, ETH, SOL } = JSON.parse(data).prices
  updatePriceUI({ BTC, ETH, SOL })
}`

const endpoints = [
  { method: 'GET',    path: '/v1/prices',           desc: 'Live BTC/ETH/SOL/USDC prices' },
  { method: 'POST',   path: '/v1/quote',             desc: 'Lock a price quote (30s TTL)' },
  { method: 'POST',   path: '/v1/transactions',      desc: 'Submit a transaction' },
  { method: 'GET',    path: '/v1/transactions/:id',  desc: 'Poll transaction status' },
  { method: 'GET',    path: '/v1/partner/stats',     desc: 'Volume, revenue, active users' },
  { method: 'POST',   path: '/v1/kyc/session',       desc: 'Initiate KYC session' },
  { method: 'GET',    path: '/v1/kyc/:id',           desc: 'KYC session result' },
  { method: 'GET',    path: '/v1/webhooks',          desc: 'List registered endpoints' },
  { method: 'POST',   path: '/v1/webhooks',          desc: 'Register a webhook' },
  { method: 'DELETE', path: '/v1/webhooks/:id',      desc: 'Remove a webhook' },
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

const rateLimitsTable = [
  { group: '/v1/sessions',     limit: '200 req',   window: 'per minute', notes: 'Per partner API key' },
  { group: '/v1/kyc',          limit: '60 req',    window: 'per minute', notes: 'Includes polling' },
  { group: '/v1/transactions', limit: '500 req',   window: 'per minute', notes: 'Burst up to 1k/min' },
  { group: '/v1/fees',         limit: '1,000 req', window: 'per minute', notes: 'Read-only, generous' },
  { group: '/v1/webhooks',     limit: '30 req',    window: 'per minute', notes: 'Config changes only' },
  { group: 'Global',           limit: '5,000 req', window: 'per minute', notes: 'Across all endpoints' },
]

const sdkAttrs = [
  { attr: 'data-b2b-client', type: 'string', def: 'required',  desc: 'Your Partner ID' },
  { attr: 'data-theme',      type: 'string', def: '"light"',   desc: 'Visual theme: light / dark / crypto' },
  { attr: 'data-currencies', type: 'string', def: '"BTC,ETH"', desc: 'Comma-separated asset list' },
  { attr: 'data-on-complete',type: 'string', def: '—',         desc: 'Global function name on TX complete' },
  { attr: 'data-locale',     type: 'string', def: '"en-EU"',   desc: 'UI language and number format' },
  { attr: 'data-amount',     type: 'number', def: '—',         desc: 'Pre-fill send amount' },
]
</script>

<template>
  <main class="sd-page">

    <!-- ═══ Section 1: Hero ══════════════════════════════════════ -->
    <section class="sd-hero" aria-labelledby="sd-hero-heading">
      <div class="sd-accent-bar" aria-hidden="true" />
      <div class="sd-inner">
        <div class="sd-hero-body">
          <h1 id="sd-hero-heading" class="sd-h1" ref="heroH" data-grad-sweep>
            Build your first integration<br class="sd-break"> in an afternoon.
          </h1>
          <p class="sd-sub" ref="heroSub">
            REST API, WebSocket feed, or drop-in HTML widget. All documented. All sandboxed.
          </p>
          <div class="sd-badges" aria-label="Integration types">
            <span class="sd-badge">REST API</span>
            <span class="sd-badge">WebSocket</span>
            <span class="sd-badge">Widget SDK</span>
            <span class="sd-badge">Webhooks</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Section 1b: Quickstart Steps ═══════════════════════════ -->
    <section class="sd-qs-steps-section" aria-labelledby="sd-qs-steps-heading">
      <div class="sd-inner">
        <h2 id="sd-qs-steps-heading" class="sd-section-title" data-reveal="fade-up">Three lines. Fully live.</h2>
        <div class="sd-qs-grid" ref="quickstartContainer" data-animate-stagger>
          <div class="quickstart-card sd-qs-card">
            <div class="sd-qs-step-num" aria-label="Step 1">1</div>
            <h3 class="sd-qs-card-title">Install</h3>
            <pre class="sd-qs-code">npm install @prodigy/react</pre>
            <span class="sd-qs-check" aria-hidden="true">✓</span>
          </div>
          <div class="quickstart-card sd-qs-card">
            <div class="sd-qs-step-num" aria-label="Step 2">2</div>
            <h3 class="sd-qs-card-title">Initialize</h3>
            <pre class="sd-qs-code">ProdigySdk.init({ key: 'pk_live_...' })</pre>
            <span class="sd-qs-check" aria-hidden="true">✓</span>
          </div>
          <div class="quickstart-card sd-qs-card">
            <div class="sd-qs-step-num" aria-label="Step 3">3</div>
            <h3 class="sd-qs-card-title">Embed</h3>
            <pre class="sd-qs-code">&lt;ProdigyWidget currency="BTC" /&gt;</pre>
            <span class="sd-qs-check" aria-hidden="true">✓</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Section 1c: Language Selector + Code ═════════════════════ -->
    <section class="sd-lang-section" aria-labelledby="sd-lang-heading">
      <div class="sd-inner">
        <h2 id="sd-lang-heading" class="sd-section-title" data-reveal="fade-up">Pick your stack</h2>
        <div class="sd-lang-pills" role="tablist" aria-label="Language selector">
          <button
            v-for="lang in languages"
            :key="lang.key"
            class="sd-lang-pill"
            :class="{ 'sd-lang-pill--active': activeLang === lang.key }"
            type="button"
            role="tab"
            :aria-selected="activeLang === lang.key"
            @click="activeLang = lang.key"
          >{{ lang.label }}</button>
        </div>
        <div class="sd-lang-code-wrap" role="tabpanel">
          <CodeBlock v-if="activeLang === 'react'" :code="reactCode" language="js" />
          <CodeBlock v-else-if="activeLang === 'vue'" :code="vueCode" language="html" />
          <CodeBlock v-else-if="activeLang === 'reactnative'" :code="reactNativeCode" language="js" />
          <CodeBlock v-else-if="activeLang === 'ios'" :code="iosCode" language="js" />
          <CodeBlock v-else-if="activeLang === 'android'" :code="androidCode" language="js" />
          <CodeBlock v-else-if="activeLang === 'vanilla'" :code="vanillaCode" language="js" />
        </div>
      </div>
    </section>

    <!-- ═══ Section 2: Quick Start ═══════════════════════════════ -->
    <section class="sd-quickstart" aria-labelledby="sd-qs-heading">
      <div class="sd-inner">
        <h2 id="sd-qs-heading" class="sd-section-title" ref="qsH" data-reveal="fade-up">Quick Start</h2>

        <!-- Tab pills -->
        <div class="sd-tab-pills" role="tablist" aria-label="Integration method">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            class="sd-tab-pill"
            :class="{ 'sd-tab-pill--active': activeTab === tab.key }"
            type="button"
            role="tab"
            :aria-selected="activeTab === tab.key"
            :aria-controls="`sd-panel-${tab.key}`"
            :id="`sd-tab-${tab.key}`"
            @click="activeTab = tab.key"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Blinking cursor decoration -->
        <span class="sd-cursor" aria-hidden="true">|</span>

        <!-- Tab panels -->
        <div
          id="sd-panel-widget"
          role="tabpanel"
          aria-labelledby="sd-tab-widget"
          v-show="activeTab === 'widget'"
        >
          <CodeBlock :code="widgetCode" language="html" />
        </div>
        <div
          id="sd-panel-rest"
          role="tabpanel"
          aria-labelledby="sd-tab-rest"
          v-show="activeTab === 'rest'"
        >
          <CodeBlock :code="restCode" language="bash" />
        </div>
        <div
          id="sd-panel-ws"
          role="tabpanel"
          aria-labelledby="sd-tab-ws"
          v-show="activeTab === 'ws'"
        >
          <CodeBlock :code="wsCode" language="js" />
        </div>
      </div>
    </section>

    <!-- ═══ Section 3: API Reference Table ═══════════════════════ -->
    <section class="sd-api-ref" aria-labelledby="sd-api-heading">
      <div class="sd-inner">
        <h2 id="sd-api-heading" class="sd-section-title">API Reference</h2>
        <div class="sd-table-wrap" role="region" aria-label="API endpoints table" tabindex="0" data-reveal="fade-up">
          <table class="sd-table">
            <thead>
              <tr>
                <th scope="col">Method</th>
                <th scope="col">Path</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(ep, i) in endpoints"
                :key="ep.path + ep.method"
                :class="{ 'sd-row-alt': i % 2 === 1 }"
              >
                <td>
                  <span
                    class="sd-method-badge"
                    :class="`sd-method-badge--${ep.method.toLowerCase()}`"
                  >{{ ep.method }}</span>
                </td>
                <td class="sd-path">{{ ep.path }}</td>
                <td class="sd-desc">{{ ep.desc }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ═══ Section 4: SDK Config Reference ══════════════════════ -->
    <section class="sd-sdk-ref" aria-labelledby="sd-sdk-heading">
      <div class="sd-inner">
        <h2 id="sd-sdk-heading" class="sd-section-title">SDK Config Reference</h2>
        <div class="sd-sdk-grid" data-animate-stagger>
          <article
            v-for="attr in sdkAttrs"
            :key="attr.attr"
            class="sd-sdk-card"
          >
            <code class="sd-sdk-attr">{{ attr.attr }}</code>
            <dl class="sd-sdk-dl">
              <div class="sd-sdk-row">
                <dt class="sd-sdk-dt">Type</dt>
                <dd class="sd-sdk-dd">{{ attr.type }}</dd>
              </div>
              <div class="sd-sdk-row">
                <dt class="sd-sdk-dt">Default</dt>
                <dd class="sd-sdk-dd">{{ attr.def }}</dd>
              </div>
            </dl>
            <p class="sd-sdk-desc">{{ attr.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- ═══ SDK Grid ═════════════════════════════════════════════ -->
    <section class="sd-sdk-grid-section" aria-labelledby="sd-sdk-grid-heading">
      <div class="sd-inner">
        <h2 id="sd-sdk-grid-heading" class="sd-section-title" ref="sdkH" data-reveal="fade-up">SDKs and libraries</h2>
        <div class="sd-sdk-lib-grid" data-animate-stagger>
          <div class="sd-sdk-lib-card">
            <div class="sd-sdk-lib-name">@prodigy/react</div>
            <div class="sd-sdk-lib-compat">React 18+, Next.js 14+</div>
            <code class="sd-sdk-lib-install">npm install @prodigy/react</code>
          </div>
          <div class="sd-sdk-lib-card">
            <div class="sd-sdk-lib-name">@prodigy/vue</div>
            <div class="sd-sdk-lib-compat">Vue 3, Nuxt 3</div>
            <code class="sd-sdk-lib-install">npm install @prodigy/vue</code>
          </div>
          <div class="sd-sdk-lib-card">
            <div class="sd-sdk-lib-name">@prodigy/react-native</div>
            <div class="sd-sdk-lib-compat">iOS + Android</div>
            <code class="sd-sdk-lib-install">npm install @prodigy/react-native</code>
          </div>
          <div class="sd-sdk-lib-card">
            <div class="sd-sdk-lib-name">prodigy-ios</div>
            <div class="sd-sdk-lib-compat">Swift, SwiftUI</div>
            <code class="sd-sdk-lib-install">pod 'ProdigySDK'</code>
          </div>
          <div class="sd-sdk-lib-card">
            <div class="sd-sdk-lib-name">prodigy-android</div>
            <div class="sd-sdk-lib-compat">Kotlin, Jetpack Compose</div>
            <code class="sd-sdk-lib-install">implementation 'io.prodigy:sdk:2.1.0'</code>
          </div>
          <div class="sd-sdk-lib-card">
            <div class="sd-sdk-lib-name">Vanilla JS</div>
            <div class="sd-sdk-lib-compat">ES module, CDN</div>
            <code class="sd-sdk-lib-install">&lt;script src="cdn.prodigy.example/widget.js"&gt;</code>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ SDK Stats ═══════════════════════════════════════════ -->
    <div class="sd-sdk-stats-row" data-animate-stagger>
      <div class="sd-inner">
        <div class="sd-sdk-stats-inner">
          <div class="sd-sdk-stat-item">
            <span class="sd-sdk-stat-val">2.1M+</span>
            <span class="sd-sdk-stat-label">Weekly downloads</span>
          </div>
          <div class="sd-sdk-stat-item">
            <span class="sd-sdk-stat-val">4.9★</span>
            <span class="sd-sdk-stat-label">npm rating</span>
          </div>
          <div class="sd-sdk-stat-item">
            <span class="sd-sdk-stat-val">MIT</span>
            <span class="sd-sdk-stat-label">License</span>
          </div>
          <div class="sd-sdk-stat-item">
            <span class="sd-sdk-stat-val">v3.4.1</span>
            <span class="sd-sdk-stat-label">Latest stable</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══ API Explorer ════════════════════════════════════════ -->
    <section class="sd-api-explorer-section" aria-labelledby="sd-api-explorer-h" data-reveal="fade-up">
      <div class="sd-inner">
        <h2 id="sd-api-explorer-h" class="sd-section-title">Explore the API.</h2>
        <div class="sd-api-explorer-wrap">
          <div class="sd-api-endpoints" role="tablist">
            <button
              v-for="ep in apiEndpoints"
              :key="ep.id"
              class="sd-api-ep-btn"
              :class="{ active: activeEp === ep.id }"
              role="tab"
              :aria-selected="activeEp === ep.id"
              @click="activeEp = ep.id"
            >
              <span class="sd-api-method" :class="`sd-method-${ep.method.toLowerCase()}`">{{ ep.method }}</span>
              <span class="sd-api-path">{{ ep.path }}</span>
            </button>
          </div>
          <div class="sd-api-response" role="tabpanel" aria-live="polite">
            <div class="sd-api-response-header">
              <span class="sd-api-status">200 OK</span>
              <span class="sd-api-response-label">Response</span>
            </div>
            <pre class="sd-api-code">{{ currentEndpoint.response }}</pre>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Webhook Events Reference ════════════════════════════ -->
    <section class="sd-wh-events-section" aria-labelledby="sd-wh-events-h" data-reveal="fade-up">
      <div class="sd-inner">
        <h2 id="sd-wh-events-h" class="sd-section-title">Webhook events.</h2>
        <div class="sd-wh-events" data-animate-stagger>
          <div v-for="ev in webhookEventsNew" :key="ev.name" class="sd-wh-ev-row">
            <code class="sd-wh-ev-name">{{ ev.name }}</code>
            <span class="sd-wh-ev-desc">{{ ev.desc }}</span>
            <span class="sd-wh-ev-payload">{{ ev.payload }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Sandbox &amp; Community ═════════════════════════════════ -->
    <section class="sd-sandbox-section" aria-labelledby="sd-sandbox-heading">
      <div class="sd-inner">
        <h2 id="sd-sandbox-heading" class="sd-section-title" data-reveal="fade-up">Get started &amp; get help</h2>
        <div class="sd-sandbox-grid" data-animate-stagger>
          <div class="sd-sandbox-card">
            <div class="sd-sandbox-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#4f46e5" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="22" height="22" rx="4"/>
                <path d="M9 14l3 3 7-7"/>
              </svg>
            </div>
            <h3 class="sd-sandbox-name">Sandbox</h3>
            <p class="sd-sandbox-desc">Full test environment. Pre-loaded KYC identities. Webhook inspector. No real money.</p>
            <a href="http://localhost:5005" target="_blank" rel="noopener noreferrer" class="sd-sandbox-cta" ref="sandboxBtn">Open Sandbox →</a>
          </div>
          <div class="sd-sandbox-card">
            <div class="sd-sandbox-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#4f46e5" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 20c0-7 3-12 10-12s10 5 10 12"/>
                <circle cx="14" cy="11" r="3"/>
              </svg>
            </div>
            <h3 class="sd-sandbox-name">Community</h3>
            <p class="sd-sandbox-desc">Developer Discord. GitHub for SDKs. Office hours every Thursday.</p>
            <a href="#" class="sd-sandbox-cta">Join Discord →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Rate Limits ════════════════════════════════════════ -->
    <section class="sd-rate-limits-section" aria-labelledby="sd-rate-h" data-reveal="fade-up">
      <div class="sd-inner">
        <h2 id="sd-rate-h" class="sd-section-title">Rate limits.</h2>
        <div class="sd-rl-table-wrap">
          <table class="sd-rl-table" role="table">
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
                <td class="sd-rl-limit">{{ row.limit }}</td>
                <td>{{ row.window }}</td>
                <td class="sd-rl-note">{{ row.notes }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="sd-rl-footnote">Limits apply per API key. Contact support to request higher limits for production workloads.</p>
      </div>
    </section>

    <!-- ═══ Changelog ══════════════════════════════════════════ -->
    <section class="sd-changelog-section" aria-labelledby="sd-changelog-h" data-reveal="fade-up">
      <div class="sd-inner">
        <h2 id="sd-changelog-h" class="sd-section-title">What's new.</h2>
        <div class="sd-changelog-list" data-animate-stagger>
          <div v-for="entry in changelog" :key="entry.version" class="sd-cl-entry">
            <div class="sd-cl-meta">
              <span class="sd-cl-version">{{ entry.version }}</span>
              <span class="sd-cl-date">{{ entry.date }}</span>
              <span class="sd-cl-type" :class="`sd-cl-type--${entry.type}`">{{ entry.type }}</span>
            </div>
            <p class="sd-cl-desc">{{ entry.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Section 5: CTA ════════════════════════════════════════ -->
    <section class="sd-cta" aria-labelledby="sd-cta-heading">
      <div class="sd-cta-inner">
        <h2 id="sd-cta-heading" class="sd-cta-title">
          Open the sandbox. No API key needed.
        </h2>
        <a
          href="http://localhost:5005"
          target="_blank"
          rel="noopener noreferrer"
          class="sd-cta-btn"
        >Launch Sandbox →</a>
      </div>
    </section>

  </main>
</template>

<style scoped>
/* ─── Variables ──────────────────────────────────────────────── */
.sd-page {
  --accent: #4f46e5;
  --accent-light: #eef2ff;
  --ink: #0f172a;
  --ink-mid: #334155;
  --ink-muted: #64748b;
  --border: #e2e8f0;
  --surface: #f8fafc;
  --radius: 12px;

  background: #fff;
  color: var(--ink-mid);
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
}

/* ─── Shared inner ───────────────────────────────────────────── */
.sd-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
}

.sd-section-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.375rem, 2.5vw, 1.875rem);
  font-weight: 700;
  color: var(--ink);
  margin: 0 0 1.75rem;
}

/* ─── Hero ───────────────────────────────────────────────────── */
.sd-hero {
  background: #fff;
  padding-bottom: 4rem;
}

.sd-accent-bar {
  height: 4px;
  background: var(--accent);
}

.sd-hero-body {
  padding-top: 3.5rem;
}

.sd-h1 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2rem, 4.5vw, 3.25rem);
  font-weight: 700;
  line-height: 1.15;
  color: var(--ink);
  margin: 0 0 1.125rem;
  letter-spacing: -0.02em;
}

.sd-break {
  display: block;
}

.sd-sub {
  font-size: 1.0625rem;
  line-height: 1.7;
  color: var(--ink-muted);
  margin: 0 0 2rem;
  max-width: 56ch;
}

.sd-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
}

.sd-badge {
  display: inline-flex;
  align-items: center;
  background: var(--accent-light);
  color: var(--accent);
  font-size: 0.8125rem;
  font-weight: 600;
  padding: 0.3125rem 0.875rem;
  border-radius: 100px;
  border: 1px solid #c7d2fe;
}

/* ─── Quick Start ────────────────────────────────────────────── */
.sd-quickstart {
  background: var(--surface);
  padding: 4rem 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.sd-tab-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.sd-tab-pill {
  display: inline-flex;
  align-items: center;
  padding: 0.4375rem 1.125rem;
  border-radius: 100px;
  border: 1px solid var(--border);
  background: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--ink-muted);
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}

.sd-tab-pill:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.sd-tab-pill:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.sd-tab-pill--active {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}

/* ─── API Reference ──────────────────────────────────────────── */
.sd-api-ref {
  padding: 4rem 0;
}

.sd-table-wrap {
  overflow-x: auto;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.sd-table {
  width: 100%;
  min-width: 560px;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.sd-table thead tr {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
}

.sd-table th {
  text-align: left;
  padding: 0.875rem 1.25rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-muted);
  white-space: nowrap;
}

.sd-table td {
  padding: 0.875rem 1.25rem;
  vertical-align: top;
  border-bottom: 1px solid var(--border);
  color: var(--ink-mid);
}

.sd-table tbody tr:last-child td {
  border-bottom: none;
}

.sd-row-alt {
  background: var(--surface);
}

.sd-method-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.625rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 700;
  font-family: 'Inter', monospace;
  letter-spacing: 0.04em;
  white-space: nowrap;
  background: var(--accent-light);
  color: var(--accent);
}

.sd-method-badge--post   { background: #dcfce7; color: #15803d; }
.sd-method-badge--delete { background: #fee2e2; color: #b91c1c; }

.sd-path {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 0.8125rem;
  color: var(--ink);
  white-space: nowrap;
}

.sd-desc {
  color: var(--ink-muted);
  line-height: 1.5;
}

/* ─── SDK Config Reference ───────────────────────────────────── */
.sd-sdk-ref {
  background: var(--surface);
  padding: 4rem 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.sd-sdk-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.sd-sdk-card {
  background: #fff;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.sd-sdk-attr {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--accent);
  background: var(--accent-light);
  padding: 0.25rem 0.625rem;
  border-radius: 4px;
  align-self: flex-start;
}

.sd-sdk-dl {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  margin: 0;
}

.sd-sdk-row {
  display: flex;
  gap: 0.5rem;
  align-items: baseline;
}

.sd-sdk-dt {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--ink-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  min-width: 3.5rem;
  flex-shrink: 0;
}

.sd-sdk-dd {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 0.8rem;
  color: var(--ink-mid);
  margin: 0;
}

.sd-sdk-desc {
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--ink-muted);
  margin: 0;
}

/* ─── CTA ────────────────────────────────────────────────────── */
.sd-cta {
  background: #0f172a;
  padding: 5rem 2rem;
  text-align: center;
}

.sd-cta-inner {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
}

.sd-cta-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 700;
  color: #fff;
  margin: 0;
  line-height: 1.2;
}

.sd-cta-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.875rem 2rem;
  background: var(--accent);
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 100px;
  text-decoration: none;
  transition: background 0.15s, transform 0.15s;
}

.sd-cta-btn:hover {
  background: #4338ca;
  transform: translateY(-1px);
}

.sd-cta-btn:focus-visible {
  outline: 2px solid #818cf8;
  outline-offset: 3px;
}

/* ─── Blinking cursor ─────────────────────────────────────────── */
.sd-cursor { color: #4f46e5; animation: cursor-blink 1s step-end infinite; font-weight: 300; margin-left: 1px; display: inline-block; margin-bottom: 1rem; }
@keyframes cursor-blink { 0%,100%{opacity:1} 50%{opacity:0} }
@media (prefers-reduced-motion: reduce) { .sd-cursor { animation: none; } }

/* ─── Responsive ─────────────────────────────────────────────── */
@media (max-width: 900px) {
  .sd-sdk-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .sd-break {
    display: inline;
  }
}

@media (max-width: 600px) {
  .sd-inner {
    padding: 0 1.25rem;
  }

  .sd-hero-body {
    padding-top: 2.5rem;
  }

  .sd-sdk-grid {
    grid-template-columns: 1fr;
  }

  .sd-quickstart,
  .sd-api-ref,
  .sd-sdk-ref {
    padding: 2.5rem 0;
  }

  .sd-cta {
    padding: 3.5rem 1.25rem;
  }
}

@media (max-width: 375px) {
  .sd-inner {
    padding: 0 1rem;
  }

  .sd-tab-pills {
    gap: 0.375rem;
  }

  .sd-tab-pill {
    font-size: 0.8125rem;
    padding: 0.375rem 0.875rem;
  }
}

/* ═══ SDK Library Grid ══════════════════════════════════ */
.sd-sdk-grid-section {
  background: var(--surface);
  padding: 4rem 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.sd-sdk-lib-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.sd-sdk-lib-card {
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: box-shadow 0.2s, border-color 0.2s;
}

.sd-sdk-lib-card:hover {
  border-color: var(--accent);
  box-shadow: 0 4px 16px rgba(79, 70, 229, 0.12);
}

.sd-sdk-lib-name {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--ink);
}

.sd-sdk-lib-compat {
  font-family: 'Inter', sans-serif;
  font-size: 0.8125rem;
  color: var(--ink-muted);
}

.sd-sdk-lib-install {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 0.8rem;
  color: var(--accent);
  background: var(--accent-light);
  padding: 0.375rem 0.625rem;
  border-radius: 6px;
  display: block;
  margin-top: 0.25rem;
  word-break: break-all;
}

/* ═══ Sandbox & Community ═══════════════════════════════ */
.sd-sandbox-section {
  padding: 4rem 0;
  border-bottom: 1px solid var(--border);
}

.sd-sandbox-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
}

.sd-sandbox-card {
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sd-sandbox-icon {
  width: 2.75rem;
  height: 2.75rem;
  background: var(--accent-light);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sd-sandbox-name {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--ink);
  margin: 0;
}

.sd-sandbox-desc {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  line-height: 1.65;
  color: var(--ink-muted);
  margin: 0;
  flex: 1;
}

.sd-sandbox-cta {
  display: inline-flex;
  align-items: center;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--accent);
  text-decoration: none;
  margin-top: auto;
}

.sd-sandbox-cta:hover {
  text-decoration: underline;
}

@media (max-width: 900px) {
  .sd-sdk-lib-grid { grid-template-columns: repeat(2, 1fr); }
  .sd-sandbox-grid { grid-template-columns: 1fr; }
}

@media (max-width: 600px) {
  .sd-sdk-lib-grid { grid-template-columns: 1fr; }
}

/* ═══ Rate Limits Table ═════════════════════════════════════ */
.sd-rate-limits-section {
  padding: 4rem 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.sd-rl-table-wrap {
  overflow-x: auto; border: 1px solid var(--border);
  border-radius: var(--radius); margin-top: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}
.sd-rl-table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
.sd-rl-table th {
  text-align: left; padding: 0.75rem 1rem;
  font-family: 'Inter', sans-serif; font-size: 0.75rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.06em; color: var(--ink-muted);
  border-bottom: 1px solid var(--border); background: var(--surface);
}
.sd-rl-table td { padding: 0.75rem 1rem; border-bottom: 1px solid var(--border); color: var(--ink-mid); vertical-align: top; }
.sd-rl-table tr:last-child td { border-bottom: none; }
.sd-rl-table code { font-family: 'JetBrains Mono', 'Courier New', monospace; font-size: 0.8125rem; color: var(--accent); }
.sd-rl-limit { font-family: 'JetBrains Mono', 'Courier New', monospace; font-weight: 700; color: var(--accent); }
.sd-rl-note { color: var(--ink-muted); font-size: 0.8125rem; }
.sd-rl-footnote { font-family: 'Inter', sans-serif; font-size: 0.75rem; color: var(--ink-muted); margin-top: 1rem; }

/* ═══ Changelog ════════════════════════════════════════════ */
.sd-changelog-section {
  padding: 4rem 0;
  border-bottom: 1px solid var(--border);
  background: var(--surface);
}
.sd-changelog-list {
  border: 1px solid var(--border); border-radius: var(--radius);
  overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}
.sd-cl-entry { padding: 1rem 1.25rem; border-bottom: 1px solid var(--border); transition: background 0.15s; }
.sd-cl-entry:last-child { border-bottom: none; }
.sd-cl-entry:hover { background: #fff; }
.sd-cl-meta { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.375rem; flex-wrap: wrap; }
.sd-cl-version { font-family: 'JetBrains Mono', 'Courier New', monospace; font-size: 0.875rem; font-weight: 700; color: var(--ink); }
.sd-cl-date { font-family: 'JetBrains Mono', 'Courier New', monospace; font-size: 0.75rem; color: var(--ink-muted); }
.sd-cl-type { font-size: 0.6875rem; font-weight: 700; padding: 0.15rem 0.5rem; border-radius: 99px; text-transform: uppercase; letter-spacing: 0.06em; }
.sd-cl-type--major { background: rgba(239,68,68,0.12); color: #dc2626; }
.sd-cl-type--minor { background: rgba(34,197,94,0.12); color: #16a34a; }
.sd-cl-type--patch { background: rgba(100,116,139,0.12); color: #64748b; }
.sd-cl-desc { font-size: 0.875rem; color: var(--ink-muted); margin: 0; line-height: 1.6; }

/* ═══ Quickstart Steps ══════════════════════════════════════ */
.sd-qs-steps-section {
  background: var(--surface);
  padding: 4rem 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.sd-qs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.sd-qs-card {
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.75rem;
  box-shadow: 0 2px 16px rgba(79, 70, 229, 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  position: relative;
  overflow: hidden;
}

.sd-qs-step-num {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9375rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sd-qs-card-title {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--ink);
  margin: 0;
}

.sd-qs-code {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 0.8125rem;
  background: var(--accent-light);
  color: var(--accent);
  padding: 0.625rem 0.875rem;
  border-radius: 8px;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-all;
  flex: 1;
  line-height: 1.6;
}

.sd-qs-check {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: #dcfce7;
  color: #15803d;
  font-size: 0.75rem;
  font-weight: 700;
  align-self: flex-end;
}

@media (max-width: 768px) {
  .sd-qs-grid { grid-template-columns: 1fr; }
}

/* ═══ Language Selector ═════════════════════════════════════ */
.sd-lang-section {
  padding: 4rem 0;
  border-top: 1px solid var(--border);
}

.sd-lang-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.75rem;
  justify-content: center;
}

.sd-lang-pill {
  display: inline-flex;
  align-items: center;
  padding: 0.4375rem 1.125rem;
  border-radius: 100px;
  border: 1px solid var(--border);
  background: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--ink-muted);
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}

.sd-lang-pill:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.sd-lang-pill:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.sd-lang-pill--active {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}

.sd-lang-code-wrap {
  max-width: 760px;
  margin: 0 auto;
}

/* ═══ SDK Stats ═════════════════════════════════════════════════ */
.sd-sdk-stats-row {
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 1.5rem 0;
}
.sd-sdk-stats-inner {
  display: flex; flex-wrap: wrap; gap: 2rem;
}
.sd-sdk-stat-item { display: flex; flex-direction: column; gap: 0.25rem; }
.sd-sdk-stat-val {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 1.5rem; font-weight: 700; color: var(--accent); line-height: 1;
}
.sd-sdk-stat-label {
  font-family: 'Inter', sans-serif; font-size: 0.75rem;
  color: var(--ink-muted); letter-spacing: 0.04em;
}

/* ═══ API Explorer ══════════════════════════════════════════════ */
.sd-api-explorer-section {
  padding: 4rem 0;
  border-bottom: 1px solid var(--border);
}
.sd-api-explorer-wrap {
  display: grid; grid-template-columns: 280px 1fr; gap: 0;
  border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}
.sd-api-endpoints { border-right: 1px solid var(--border); }
.sd-api-ep-btn {
  display: flex; align-items: center; gap: 0.75rem;
  width: 100%; padding: 0.75rem 1rem;
  background: transparent; border: none; border-bottom: 1px solid var(--border);
  cursor: pointer; text-align: left;
}
.sd-api-ep-btn:last-child { border-bottom: none; }
.sd-api-ep-btn.active { background: rgba(99,102,241,0.08); }
.sd-api-ep-btn:hover:not(.active) { background: rgba(99,102,241,0.04); }
.sd-api-method {
  font-family: 'JetBrains Mono', 'Courier New', monospace; font-size: 0.6875rem; font-weight: 700;
  padding: 0.2rem 0.4rem; border-radius: 3px; flex-shrink: 0;
}
.sd-method-post { background: #dcfce7; color: #15803d; }
.sd-method-get  { background: #dbeafe; color: #1d4ed8; }
.sd-method-delete { background: #fee2e2; color: #b91c1c; }
.sd-api-path { font-family: 'JetBrains Mono', 'Courier New', monospace; font-size: 0.8125rem; color: var(--ink); }
.sd-api-response { padding: 1rem; background: var(--surface); overflow: auto; }
.sd-api-response-header { display: flex; justify-content: space-between; margin-bottom: 0.75rem; }
.sd-api-status { font-family: 'JetBrains Mono', 'Courier New', monospace; font-size: 0.8125rem; color: #15803d; font-weight: 700; }
.sd-api-response-label { font-size: 0.75rem; color: var(--ink-muted); }
.sd-api-code { font-family: 'JetBrains Mono', 'Courier New', monospace; font-size: 0.8125rem; color: var(--ink-mid); margin: 0; white-space: pre; }
@media (max-width: 640px) {
  .sd-api-explorer-wrap { grid-template-columns: 1fr; }
  .sd-api-endpoints { border-right: none; border-bottom: 1px solid var(--border); }
}

/* ═══ Webhook Events Reference ══════════════════════════════════ */
.sd-wh-events-section {
  padding: 4rem 0;
  border-bottom: 1px solid var(--border);
}
.sd-wh-events {
  border: 1px solid var(--border); border-radius: var(--radius);
  overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}
.sd-wh-ev-row {
  display: grid; grid-template-columns: 12rem 1fr 1fr;
  gap: 1rem; padding: 0.75rem 1.25rem;
  border-bottom: 1px solid var(--border);
  align-items: start; transition: background 0.15s;
}
.sd-wh-ev-row:last-child { border-bottom: none; }
.sd-wh-ev-row:hover { background: var(--surface); }
.sd-wh-ev-name { font-family: 'JetBrains Mono', 'Courier New', monospace; font-size: 0.8125rem; font-weight: 600; color: var(--accent); }
.sd-wh-ev-desc { font-size: 0.875rem; color: var(--ink-mid); }
.sd-wh-ev-payload { font-family: 'JetBrains Mono', 'Courier New', monospace; font-size: 0.75rem; color: var(--ink-muted); line-height: 1.5; }
@media (max-width: 640px) {
  .sd-wh-ev-row { grid-template-columns: 1fr; }
}
</style>
