<template>
  <main class="ft-product">

    <!-- Page header -->
    <div class="ft-product__sysbar">
      <span>REF: PRD-010</span>
      <span>·</span>
      <span>TECHNICAL SPECIFICATIONS</span>
      <span>·</span>
      <span>REV 2026.06</span>
    </div>

    <hr class="ft-rule" />

    <section class="ft-product__hero">
      <div class="ft-product__section-label">DOCUMENT CLASS: TECHNICAL</div>
      <h1 class="ft-product__headline">TECHNICAL SPECIFICATIONS</h1>
      <p class="ft-product__intro">
        We document everything because we do not trust verbal agreements, and neither should you.
        The following specifications are maintained and versioned. Discrepancies between this
        document and system behavior are treated as bugs, not acceptable variance.
      </p>
    </section>

    <!-- SYSTEM_METRICS HEADER STRIP -->
    <div class="ft-product__metrics-strip">
      <div class="ft-product__metrics-item">
        <span class="ft-product__metrics-key">UPTIME_SLA</span>
        <span class="ft-product__metrics-val"><span ref="ftStat1">99.99</span>%</span>
      </div>
      <span class="ft-product__metrics-sep">|</span>
      <div class="ft-product__metrics-item">
        <span class="ft-product__metrics-key">API_LATENCY</span>
        <span class="ft-product__metrics-val">&lt;200ms</span>
      </div>
      <span class="ft-product__metrics-sep">|</span>
      <div class="ft-product__metrics-item">
        <span class="ft-product__metrics-key">KYC_PASS</span>
        <span class="ft-product__metrics-val"><span ref="ftStat2">94</span>%</span>
      </div>
      <span class="ft-product__metrics-sep">|</span>
      <div class="ft-product__metrics-item">
        <span class="ft-product__metrics-key">JURISDICTIONS</span>
        <span class="ft-product__metrics-val"><span ref="ftStat3">40</span>+</span>
      </div>
    </div>

    <hr class="ft-rule" />

    <!-- Widget Integration -->
    <section class="ft-product__module">
      <div class="ft-product__module-header">
        <span class="ft-product__module-id">MODULE 01</span>
        <span class="ft-product__module-name">WIDGET INTEGRATION</span>
        <span class="ft-ok">PRODUCTION</span>
      </div>
      <table class="ft-table">
        <thead>
          <tr>
            <th>PARAMETER</th>
            <th>VALUE / DESCRIPTION</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="ft-param">Method</td>
            <td><code class="ft-code">&lt;script src="https://widget.prodigy.io/v1/embed.js"&gt;&lt;/script&gt;</code></td>
          </tr>
          <tr>
            <td class="ft-param">Integration surface</td>
            <td>Any HTML page. No framework required. No build step required.</td>
          </tr>
          <tr>
            <td class="ft-param">Response time to render</td>
            <td class="ft-accent">&lt; 200ms P99 (CDN-served, global edge)</td>
          </tr>
          <tr>
            <td class="ft-param">Configuration</td>
            <td>Partner ID passed as data attribute. All other settings resolved server-side.</td>
          </tr>
          <tr>
            <td class="ft-param">Versioning</td>
            <td>Semantic versioning. Breaking changes require explicit opt-in via version pin.</td>
          </tr>
          <tr>
            <td class="ft-param">Browser support</td>
            <td>All evergreen browsers. Safari 15+. No IE. No polyfills required.</td>
          </tr>
          <tr>
            <td class="ft-param">Audit trail</td>
            <td>Every widget load, interaction, and transaction confirmation is logged to immutable ledger.</td>
          </tr>
        </tbody>
      </table>
    </section>

    <hr class="ft-rule" />

    <!-- KYC Engine -->
    <section class="ft-product__module">
      <div class="ft-product__module-header">
        <span class="ft-product__module-id">MODULE 02</span>
        <span class="ft-product__module-name">KYC ENGINE</span>
        <span class="ft-ok">PRODUCTION</span>
      </div>
      <table class="ft-table">
        <thead>
          <tr>
            <th>PARAMETER</th>
            <th>VALUE / DESCRIPTION</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="ft-param">Provider</td>
            <td>Sumsub. ISO 27001 certified. SOC 2 Type II compliant.</td>
          </tr>
          <tr>
            <td class="ft-param">Method</td>
            <td>Document verification + liveness check. Embedded in widget flow, no redirect.</td>
          </tr>
          <tr>
            <td class="ft-param">Response time</td>
            <td class="ft-accent">Automated decisions: &lt; 30 seconds. Manual review: &lt; 24 hours.</td>
          </tr>
          <tr>
            <td class="ft-param">Compliance scope</td>
            <td>EU: eIDAS, AMLD5. UK: FCA guidance. US: FinCEN BSA. AUS: AUSTRAC.</td>
          </tr>
          <tr>
            <td class="ft-param">Data residency</td>
            <td>Configurable per partner. EU-only available. Data not used for training.</td>
          </tr>
          <tr>
            <td class="ft-param">Re-verification</td>
            <td>Once verified, user does not re-verify unless risk score triggers re-check.</td>
          </tr>
          <tr>
            <td class="ft-param">Audit trail</td>
            <td>Full KYC decision log available in admin console and via API.</td>
          </tr>
        </tbody>
      </table>
    </section>

    <hr class="ft-rule" />

    <!-- Risk Assessment -->
    <section class="ft-product__module">
      <div class="ft-product__module-header">
        <span class="ft-product__module-id">MODULE 03</span>
        <span class="ft-product__module-name">RISK ASSESSMENT</span>
        <span class="ft-ok">PRODUCTION</span>
      </div>
      <table class="ft-table">
        <thead>
          <tr>
            <th>PARAMETER</th>
            <th>VALUE / DESCRIPTION</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="ft-param">Method</td>
            <td>Rule-based engine + ML scoring. Both run per transaction, in parallel.</td>
          </tr>
          <tr>
            <td class="ft-param">Response time</td>
            <td class="ft-accent">&lt; 50ms per risk evaluation</td>
          </tr>
          <tr>
            <td class="ft-param">Signals assessed</td>
            <td>Transaction amount, velocity, counterparty risk, wallet age, jurisdiction, device fingerprint.</td>
          </tr>
          <tr>
            <td class="ft-param">Compliance scope</td>
            <td>FATF Travel Rule. Chainalysis integration for on-chain wallet screening.</td>
          </tr>
          <tr>
            <td class="ft-param">Outcome actions</td>
            <td>ALLOW / FLAG / BLOCK / REVIEW. Partner configures thresholds per action.</td>
          </tr>
          <tr>
            <td class="ft-param">Explainability</td>
            <td>Every risk decision includes a reason code. Visible in admin console.</td>
          </tr>
          <tr>
            <td class="ft-param">Audit trail</td>
            <td>Immutable risk log per transaction. Exportable for regulatory reporting.</td>
          </tr>
        </tbody>
      </table>
    </section>

    <hr class="ft-rule" />

    <!-- Ledger System -->
    <section class="ft-product__module">
      <div class="ft-product__module-header">
        <span class="ft-product__module-id">MODULE 04</span>
        <span class="ft-product__module-name">LEDGER SYSTEM</span>
        <span class="ft-ok">PRODUCTION</span>
      </div>
      <table class="ft-table">
        <thead>
          <tr>
            <th>PARAMETER</th>
            <th>VALUE / DESCRIPTION</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="ft-param">Method</td>
            <td>Double-entry bookkeeping. Every credit has a corresponding debit.</td>
          </tr>
          <tr>
            <td class="ft-param">Response time</td>
            <td class="ft-accent">Ledger entries committed &lt; 100ms after transaction confirmation</td>
          </tr>
          <tr>
            <td class="ft-param">Precision</td>
            <td>18 decimal places. No rounding errors. No floating point arithmetic.</td>
          </tr>
          <tr>
            <td class="ft-param">Compliance scope</td>
            <td>GAAP-compatible. Full reconciliation reports available on demand.</td>
          </tr>
          <tr>
            <td class="ft-param">Access</td>
            <td>Real-time via admin console. Historical export via API (CSV, JSON).</td>
          </tr>
          <tr>
            <td class="ft-param">Immutability</td>
            <td>Entries are append-only. No deletion. Corrections via reversal entries.</td>
          </tr>
          <tr>
            <td class="ft-param">Audit trail</td>
            <td>Every entry includes actor, timestamp, transaction ID, and reason code.</td>
          </tr>
        </tbody>
      </table>
    </section>

    <hr class="ft-rule" />

    <!-- Admin Console -->
    <section class="ft-product__module">
      <div class="ft-product__module-header">
        <span class="ft-product__module-id">MODULE 05</span>
        <span class="ft-product__module-name">ADMIN CONSOLE</span>
        <span class="ft-ok">PRODUCTION</span>
      </div>
      <table class="ft-table">
        <thead>
          <tr>
            <th>PARAMETER</th>
            <th>VALUE / DESCRIPTION</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="ft-param">Method</td>
            <td>Web-based console. No app installation. Role-based access control.</td>
          </tr>
          <tr>
            <td class="ft-param">Response time</td>
            <td class="ft-accent">Real-time data updates. WebSocket-based event streaming.</td>
          </tr>
          <tr>
            <td class="ft-param">Visibility scope</td>
            <td>All transactions, all users, all risk scores, all KYC states, all ledger entries.</td>
          </tr>
          <tr>
            <td class="ft-param">Compliance scope</td>
            <td>Supports SAR (Suspicious Activity Report) workflow. Regulatory export included.</td>
          </tr>
          <tr>
            <td class="ft-param">Permissions</td>
            <td>Super Admin / Compliance Officer / Operations / Read-Only. All actions logged.</td>
          </tr>
          <tr>
            <td class="ft-param">Alerts</td>
            <td>Configurable thresholds. Email + webhook. No alert goes unlogged.</td>
          </tr>
          <tr>
            <td class="ft-param">Audit trail</td>
            <td>Every admin action is recorded. Who changed what, when, and why.</td>
          </tr>
        </tbody>
      </table>
    </section>

    <hr class="ft-rule" />

    <!-- Partner API -->
    <section class="ft-product__module">
      <div class="ft-product__module-header">
        <span class="ft-product__module-id">MODULE 06</span>
        <span class="ft-product__module-name">PARTNER API</span>
        <span class="ft-ok">PRODUCTION</span>
      </div>
      <table class="ft-table">
        <thead>
          <tr>
            <th>PARAMETER</th>
            <th>VALUE / DESCRIPTION</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="ft-param">Method</td>
            <td>REST API. JSON over HTTPS. Webhook subscriptions for async events.</td>
          </tr>
          <tr>
            <td class="ft-param">Response time</td>
            <td class="ft-accent">&lt; 100ms P95 for all read endpoints</td>
          </tr>
          <tr>
            <td class="ft-param">Authentication</td>
            <td>API key + HMAC signature per request. Key rotation supported without downtime.</td>
          </tr>
          <tr>
            <td class="ft-param">Compliance scope</td>
            <td>TLS 1.3 minimum. All data encrypted in transit and at rest (AES-256).</td>
          </tr>
          <tr>
            <td class="ft-param">Rate limits</td>
            <td>1,000 req/min default. Higher limits available by arrangement.</td>
          </tr>
          <tr>
            <td class="ft-param">Documentation</td>
            <td>OpenAPI 3.1 spec. Postman collection. Changelog maintained in-doc.</td>
          </tr>
          <tr>
            <td class="ft-param">Audit trail</td>
            <td>All API calls logged with partner ID, endpoint, status, and latency.</td>
          </tr>
        </tbody>
      </table>
    </section>

    <hr class="ft-rule" />

    <!-- System Monitor Dashboard -->
    <section class="ft-monitor ft-monitor--rel" aria-labelledby="monitor-h">
      <div class="fp-scanline" aria-hidden="true"></div>
      <div class="ft-monitor__header">
        <span id="monitor-h" class="ft-monitor__title">SYSTEM_MONITOR — DEMO</span>
        <span class="ft-monitor__badge">● LIVE SIMULATION</span>
      </div>
      <div class="ft-monitor__grid" data-animate-stagger>
        <div class="ft-monitor__panel">
          <p class="ft-monitor__panel-label">API_LATENCY</p>
          <p class="ft-monitor__panel-value">187ms</p>
          <p class="ft-monitor__panel-caption">p99 · rolling 5m</p>
        </div>
        <div class="ft-monitor__panel">
          <p class="ft-monitor__panel-label">KYC_PASS_RATE</p>
          <p class="ft-monitor__panel-value">93.1%</p>
          <p class="ft-monitor__panel-caption">last 30 days</p>
        </div>
        <div class="ft-monitor__panel">
          <p class="ft-monitor__panel-label">TX_VOLUME_24H</p>
          <p class="ft-monitor__panel-value">€248,470</p>
          <p class="ft-monitor__panel-caption">simulated data</p>
        </div>
        <div class="ft-monitor__panel">
          <p class="ft-monitor__panel-label">UPTIME</p>
          <p class="ft-monitor__panel-value">99.97%</p>
          <p class="ft-monitor__panel-caption">90-day SLA</p>
        </div>
      </div>
    </section>

    <!-- WIDGET_DEMO -->
    <section class="ft-product__widget-demo" aria-labelledby="widget-demo-h" data-reveal="fade-up">
      <hr class="ft-rule" />
      <div class="ft-product__widget-demo-inner">
        <div class="ft-product__widget-demo-copy">
          <div class="ft-product__section-label" id="widget-demo-h">&gt; WIDGET_DEMO.exe</div>
          <p class="ft-product__widget-demo-headline">WIDGET_DEMO</p>
          <p class="ft-product__widget-demo-sub">Full KYC flow. Real-time fee calculation. Sub-100ms response. No mock data.</p>
        </div>
        <div class="ft-product__widget-demo-frame">
          <WidgetDemo theme="fintech" />
        </div>
      </div>
      <hr class="ft-rule" />
    </section>

    <!-- TRANSACTION_PIPELINE -->
    <section class="ft-pipeline-section" aria-labelledby="pipeline-h" data-reveal="fade-up">
      <div class="ft-product__section-label" id="pipeline-h">TRANSACTION_PIPELINE</div>
      <div class="ft-pipeline-wrap">
        <svg viewBox="0 0 500 80" fill="none" xmlns="http://www.w3.org/2000/svg"
             width="100%" preserveAspectRatio="xMidYMid meet"
             aria-hidden="true" role="img" class="pipeline-svg">
          <defs>
            <marker id="ft-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#f59e0b" />
            </marker>
          </defs>
          <rect class="pipeline-box" x="0" y="22" width="80" height="36" ry="4" fill="rgba(245,158,11,0.04)" stroke="rgba(245,158,11,0.2)" stroke-width="1" />
          <rect class="pipeline-box" x="100" y="22" width="80" height="36" ry="4" fill="rgba(245,158,11,0.12)" stroke="#f59e0b" stroke-width="1.5" />
          <rect class="pipeline-box" x="200" y="22" width="80" height="36" ry="4" fill="rgba(245,158,11,0.12)" stroke="#f59e0b" stroke-width="1.5" />
          <rect class="pipeline-box" x="300" y="22" width="80" height="36" ry="4" fill="rgba(245,158,11,0.12)" stroke="#f59e0b" stroke-width="1.5" />
          <rect class="pipeline-box" x="400" y="22" width="80" height="36" ry="4" fill="rgba(245,158,11,0.04)" stroke="rgba(245,158,11,0.2)" stroke-width="1" />
          <text x="40" y="44" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.4)" font-family="Space Mono, monospace">Your App</text>
          <text x="140" y="44" text-anchor="middle" font-size="9" fill="#f59e0b" font-family="Space Mono, monospace">Prodigy SDK</text>
          <text x="240" y="44" text-anchor="middle" font-size="9" fill="#f59e0b" font-family="Space Mono, monospace">KYC Check</text>
          <text x="340" y="44" text-anchor="middle" font-size="9" fill="#f59e0b" font-family="Space Mono, monospace">Settlement</text>
          <text x="440" y="44" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.4)" font-family="Space Mono, monospace">Receipt</text>
          <line class="pipeline-arrow" x1="82" y1="40" x2="97" y2="40" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#ft-arrow)" stroke-dasharray="60" stroke-dashoffset="60" />
          <line class="pipeline-arrow" x1="182" y1="40" x2="197" y2="40" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#ft-arrow)" stroke-dasharray="60" stroke-dashoffset="60" />
          <line class="pipeline-arrow" x1="282" y1="40" x2="297" y2="40" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#ft-arrow)" stroke-dasharray="60" stroke-dashoffset="60" />
          <line class="pipeline-arrow" x1="382" y1="40" x2="397" y2="40" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#ft-arrow)" stroke-dasharray="60" stroke-dashoffset="60" />
        </svg>
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- METRICS_TABLE -->
    <section class="ft-product__metrics-table-section" aria-labelledby="metrics-table-h" data-reveal="fade-up">
      <div class="ft-product__section-label" id="metrics-table-h">PERFORMANCE_METRICS</div>
      <div class="ft-product__metrics-table-wrap">
        <table class="ft-product__metrics-table" aria-label="Platform performance metrics">
          <thead>
            <tr>
              <th>METRIC</th>
              <th>VALUE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody data-animate-stagger>
            <tr>
              <td class="ft-product__mt-key">API Response</td>
              <td class="ft-product__mt-val">&lt;200ms</td>
              <td class="ft-product__mt-status ft-product__mt-ok">✓ OPTIMAL</td>
            </tr>
            <tr>
              <td class="ft-product__mt-key">KYC Pass Rate</td>
              <td class="ft-product__mt-val">94.2%</td>
              <td class="ft-product__mt-status ft-product__mt-ok">✓ PASS</td>
            </tr>
            <tr>
              <td class="ft-product__mt-key">Settlement Speed</td>
              <td class="ft-product__mt-val">T+0</td>
              <td class="ft-product__mt-status ft-product__mt-ok">✓ INSTANT</td>
            </tr>
            <tr>
              <td class="ft-product__mt-key">Uptime SLA</td>
              <td class="ft-product__mt-val">99.99%</td>
              <td class="ft-product__mt-status ft-product__mt-ok">✓ LIVE</td>
            </tr>
            <tr>
              <td class="ft-product__mt-key">Fraud Block Rate</td>
              <td class="ft-product__mt-val">99.1%</td>
              <td class="ft-product__mt-status ft-product__mt-ok">✓ SECURED</td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr class="ft-rule" />
    </section>

    <!-- USE_CASES GRID -->
    <section class="ft-product__usecases" aria-labelledby="usecases-h">
      <div class="ft-product__section-label" id="usecases-h" data-reveal="fade-up">USE_CASES</div>
      <div class="ft-product__usecases-grid" data-animate-stagger ref="usecasesGridRef">
        <div class="ft-product__usecase-card">
          <span ref="usecaseTag1" class="ft-product__usecase-tag">NEOBANK</span>
          <p class="ft-product__usecase-body">Add crypto exposure without a new regulatory licence. KYC, AML, audit trail: all included.</p>
        </div>
        <div class="ft-product__usecase-card">
          <span ref="usecaseTag2" class="ft-product__usecase-tag">EXCHANGE</span>
          <p class="ft-product__usecase-body">Ship a compliant fiat on-ramp in hours. 136 assets, 45 chains, zero integration debt.</p>
        </div>
        <div class="ft-product__usecase-card">
          <span class="ft-product__usecase-tag">WEALTH_MANAGER</span>
          <p class="ft-product__usecase-body">Full audit trail per transaction. Export-ready for your compliance team.</p>
        </div>
      </div>
    </section>

    <!-- CTA after USE_CASES -->
    <div class="ft-product__inline-cta">
      <a href="http://localhost:5002" target="_blank" rel="noopener noreferrer" class="ft-btn ft-btn--ghost">VIEW_DOCS →</a>
      <a href="http://localhost:5001" target="_blank" rel="noopener noreferrer" class="ft-btn ft-btn--primary">REQUEST_SANDBOX →</a>
    </div>

    <hr class="ft-rule" />

    <!-- BUILD_VS_BUY_ANALYSIS -->
    <section class="ft-product__bvb" aria-labelledby="bvb-h" data-reveal="fade-up">
      <div ref="bvbHeading" class="ft-product__section-label" id="bvb-h" data-grad-sweep>COST_ANALYSIS: BUILD_VS_BUY</div>
      <pre class="ft-product__bvb-pre"><code><span class="ft-bvb-hdr">DIMENSION          IN-HOUSE          PRODIGY</span>
<span class="ft-bvb-rule">──────────────────────────────────────────────</span>
<span class="ft-bvb-key">time_to_deploy</span>     <span class="ft-bvb-bad">6-18 months</span>       <span class="ft-bvb-good">&lt;4 hours</span>
<span class="ft-bvb-key">compliance_cost</span>    <span class="ft-bvb-bad">$200K+ / year</span>     <span class="ft-bvb-good">$0 (included)</span>
<span class="ft-bvb-key">kyc_pass_rate</span>      <span class="ft-bvb-bad">~67% (industry)</span>   <span class="ft-bvb-good">94% (Prodigy)</span>
<span class="ft-bvb-key">maintenance</span>        <span class="ft-bvb-bad">ongoing headcount</span> <span class="ft-bvb-good">included</span></code></pre>
    </section>

    <!-- CTA after BUILD_VS_BUY -->
    <div class="ft-product__inline-cta">
      <a href="http://localhost:5001" target="_blank" rel="noopener noreferrer" class="ft-btn ft-btn--primary">START_FREE_TRIAL →</a>
      <a href="http://localhost:5001" target="_blank" rel="noopener noreferrer" class="ft-btn ft-btn--ghost">TALK_TO_SALES →</a>
    </div>

    <hr class="ft-rule" />

    <!-- SOCIAL_PROOF -->
    <section class="ft-product__social" aria-labelledby="social-h" data-reveal="fade-up">
      <div class="ft-product__section-label" id="social-h">CUSTOMER_SIGNALS</div>
      <div class="ft-product__quotes-grid" data-animate-stagger>
        <div class="ft-product__quote-card">
          <p class="ft-product__quote-text">"FEE_RECEIPT closed compliance sign-off in one afternoon."</p>
          <p class="ft-product__quote-attr">— Sarah K., CFO NordPay</p>
        </div>
        <div class="ft-product__quote-card">
          <p class="ft-product__quote-text">"INTEGRATION_TIME: 20 minutes. One engineer."</p>
          <p class="ft-product__quote-attr">— Marcus T., CTO SwapDeck</p>
        </div>
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- Before / After code comparison -->
    <section class="ft-compare-code" aria-labelledby="compare-code-h" data-reveal="fade-up">
      <div class="ft-compare-code__label" id="compare-code-h">INTEGRATION COMPLEXITY · BEFORE AND AFTER</div>
      <div class="ft-compare-code__panels">
        <div class="ft-compare-code__panel ft-compare-code__panel--before">
          <div class="ft-compare-code__panel-header">
            <span class="ft-compare-code__panel-title ft-compare-code__panel-title--before">BEFORE_PRODIGY</span>
          </div>
          <pre class="ft-compare-code__pre" aria-label="Before Prodigy complexity example"><code><span class="ft-cc-muted">// Step 1: Procure KYC vendor, negotiate contract (4–8 weeks)</span>
<span class="ft-cc-muted">// Step 2: Build identity verification flow, handle 12 edge cases</span>
<span class="ft-cc-muted">// Step 3: Implement risk scoring engine + threshold config</span>
<span class="ft-cc-muted">// Step 4: Build fee calculation + pre-confirm receipt UI</span>
<span class="ft-cc-muted">// Step 5: Set up double-entry ledger + audit trail</span>
<span class="ft-cc-muted">// Step 6: Build partner revenue tracking + invoicing</span>
<span class="ft-cc-muted">// Total estimated time: 3–6 months, 2–4 engineers</span></code></pre>
        </div>
        <div class="ft-compare-code__panel ft-compare-code__panel--after">
          <div class="ft-compare-code__panel-header">
            <span class="ft-compare-code__panel-title ft-compare-code__panel-title--after">AFTER_PRODIGY</span>
          </div>
          <pre class="ft-compare-code__pre" aria-label="After Prodigy embed code"><code><span class="ft-cc-tag">&lt;script</span>
  <span class="ft-cc-attr">src</span>=<span class="ft-cc-str">"https://cdn.prodigy.io/widget/v2/embed.js"</span>
  <span class="ft-cc-attr">data-client-id</span>=<span class="ft-cc-str">"YOUR_CLIENT_ID"</span><span class="ft-cc-tag">&gt;&lt;/script&gt;</span>
<span class="ft-cc-tag">&lt;div</span> <span class="ft-cc-attr">id</span>=<span class="ft-cc-str">"prodigy-widget"</span><span class="ft-cc-tag">&gt;&lt;/div&gt;</span></code></pre>
        </div>
      </div>
    </section>

    <hr class="ft-rule" />

    <!-- Footer note -->
    <div class="ft-product__closing">
      <p>
        Specifications are subject to version updates. All changes are communicated via changelog
        and API deprecation notices with a minimum 90-day notice period before breaking changes.
      </p>
      <div class="ft-product__closing-actions">
        <RouterLink to="/pricing" class="ft-btn ft-btn--ghost">VIEW FEE SCHEDULE →</RouterLink>
        <a href="http://localhost:5001" target="_blank" rel="noopener noreferrer" class="ft-btn ft-btn--primary">REQUEST DEMO ACCESS →</a>
      </div>
    </div>

    <hr class="ft-rule" />

  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCountUp } from '@/composables/useGSAP'
import { useTextScramble } from '@/composables/useTextScramble'
import { useClipReveal, useGradientSweep } from '@/composables/useSplitReveal'
import { useCardTiltAll } from '@/composables/useCardTilt'
import WidgetDemo from '@/components/shared/WidgetDemo.vue'

const usecasesGridRef = ref<HTMLElement | null>(null)
useCardTiltAll(usecasesGridRef, '.ft-product__usecase-card', { maxTilt: 4, scale: 1.02, glowColor: '#f59e0b', glowIntensity: 0.15 })

const ftStat1 = ref<HTMLElement | null>(null)
const ftStat2 = ref<HTMLElement | null>(null)
const ftStat3 = ref<HTMLElement | null>(null)

// Scramble before countup fires (same scroll trigger, scramble is faster)
useTextScramble(ftStat1, { trigger: 'visible', style: 'mono', duration: 600 })
useTextScramble(ftStat2, { trigger: 'visible', style: 'mono', duration: 600 })
useTextScramble(ftStat3, { trigger: 'visible', style: 'mono', duration: 600 })

useCountUp(ftStat1, 99.99, { suffix: '', decimals: 2, duration: 2.5 })
useCountUp(ftStat2, 94, { duration: 2 })
useCountUp(ftStat3, 40, { duration: 2 })

// USE_CASES clip-path reveal on card titles
const usecaseTag1 = ref<HTMLElement | null>(null)
const usecaseTag2 = ref<HTMLElement | null>(null)
useClipReveal(usecaseTag1, { direction: 'up', duration: 0.7, delay: 0 })
useClipReveal(usecaseTag2, { direction: 'up', duration: 0.7, delay: 0.15 })

// BUILD_VS_BUY gradient sweep
const bvbHeading = ref<HTMLElement | null>(null)
useGradientSweep(bvbHeading, { color: '#f59e0b', duration: 1200 })
</script>

<style scoped>
.ft-product {
  --bg: #fafaf8;
  --ink: #0a0a0a;
  --accent: #b85c00;
  --blue: #1a4480;
  --muted: rgba(10, 10, 10, 0.45);
  --font: 'Space Mono', monospace;

  background: var(--bg);
  color: var(--ink);
  font-family: var(--font);
}

.ft-rule {
  border: none;
  border-top: 1px solid var(--ink);
  margin: 0;
}

/* ─── Sysbar ─── */
.ft-product__sysbar {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.45rem 2rem;
  font-size: 0.68rem;
  letter-spacing: 0.07em;
  color: var(--muted);
}

/* ─── Hero ─── */
.ft-product__hero {
  padding: 2.5rem 2rem 2rem;
  max-width: 860px;
}

.ft-product__section-label {
  font-size: 0.68rem;
  color: var(--muted);
  letter-spacing: 0.09em;
  margin-bottom: 0.75rem;
}

.ft-product__headline {
  font-family: var(--font);
  font-size: clamp(1.4rem, 3vw, 2.2rem);
  font-weight: 700;
  letter-spacing: 0.04em;
  margin: 0 0 1rem;
}

.ft-product__intro {
  font-size: 0.82rem;
  line-height: 1.8;
  margin: 0;
  opacity: 0.72;
  max-width: 680px;
}

/* ─── Module sections ─── */
.ft-product__module {
  padding: 1.5rem 2rem;
}

.ft-product__module-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.ft-product__module-id {
  font-size: 0.65rem;
  color: var(--muted);
  letter-spacing: 0.1em;
}

.ft-product__module-name {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.ft-ok {
  font-size: 0.65rem;
  color: #1a7a1a;
  font-weight: 700;
  letter-spacing: 0.08em;
}

/* ─── Table ─── */
.ft-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font);
  font-size: 0.78rem;
}

.ft-table th {
  text-align: left;
  font-size: 0.63rem;
  letter-spacing: 0.1em;
  color: var(--muted);
  border-bottom: 1px solid var(--ink);
  padding: 0.35rem 0.8rem;
}

.ft-table td {
  padding: 0.5rem 0.8rem;
  border-bottom: 1px solid rgba(10, 10, 10, 0.1);
  vertical-align: top;
  line-height: 1.6;
}

.ft-table tbody tr:hover td {
  background: rgba(10, 10, 10, 0.025);
}

.ft-param {
  font-weight: 700;
  white-space: nowrap;
  font-size: 0.72rem;
  color: var(--ink);
  width: 200px;
  min-width: 160px;
}

.ft-accent {
  color: var(--accent);
}

.ft-code {
  font-family: var(--font);
  font-size: 0.72rem;
  background: rgba(10, 10, 10, 0.06);
  padding: 0.15rem 0.4rem;
  border: 1px solid rgba(10, 10, 10, 0.15);
  word-break: break-all;
}

/* ─── Buttons ─── */
.ft-btn {
  font-family: var(--font);
  font-size: 0.75rem;
  letter-spacing: 0.09em;
  font-weight: 700;
  text-decoration: none;
  padding: 0.55rem 1.2rem;
  border: 1px solid;
  border-radius: 0;
  display: inline-block;
  transition: background 0.15s, color 0.15s;
}

.ft-btn--primary {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--bg);
}

.ft-btn--primary:hover {
  background: var(--ink);
  border-color: var(--ink);
}

.ft-btn--ghost {
  background: transparent;
  border-color: var(--ink);
  color: var(--ink);
}

.ft-btn--ghost:hover {
  background: var(--ink);
  color: var(--bg);
}

/* ─── System Monitor ─── */
.ft-monitor {
  background: #0a0e1a;
  color: #f59e0b;
  font-family: 'Space Mono', monospace;
  padding: 2rem;
  border-bottom: 1px solid #f59e0b;
}
.ft-monitor--rel { position: relative; overflow: hidden; }
.fp-scanline { position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(to right, transparent, rgba(245,158,11,0.4), transparent); animation: scan-down 3s linear infinite; pointer-events: none; }
@keyframes scan-down { from { top: 0; } to { top: 100%; } }
@media (prefers-reduced-motion: reduce) { .fp-scanline { animation: none; } }

.ft-monitor__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.ft-monitor__title {
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #f59e0b;
}

.ft-monitor__badge {
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  color: rgba(245, 158, 11, 0.55);
}

.ft-monitor__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.ft-monitor__panel {
  padding: 1.5rem 1.25rem;
  border-right: 1px solid rgba(245, 158, 11, 0.3);
  border-top: 2px solid #f59e0b;
  background: #0a0e1a;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.ft-monitor__panel:last-child { border-right: none; }

.ft-monitor__panel-label {
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  color: rgba(245, 158, 11, 0.6);
  margin: 0;
}

.ft-monitor__panel-value {
  font-size: clamp(1.25rem, 2.5vw, 1.875rem);
  font-weight: 700;
  letter-spacing: -0.01em;
  color: #f59e0b;
  margin: 0;
  line-height: 1;
}

.ft-monitor__panel-caption {
  font-size: 0.65rem;
  letter-spacing: 0.07em;
  color: rgba(245, 158, 11, 0.45);
  margin: 0;
}

/* ─── Before/After Code ─── */
.ft-compare-code {
  padding: 1.5rem 2rem;
}

.ft-compare-code__label {
  font-size: 0.68rem;
  color: var(--muted);
  letter-spacing: 0.09em;
  margin-bottom: 1rem;
}

.ft-compare-code__panels {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border: 1px solid var(--ink);
}

.ft-compare-code__panel {
  display: flex;
  flex-direction: column;
}

.ft-compare-code__panel--before { border-right: 1px solid var(--ink); }

.ft-compare-code__panel-header {
  padding: 0.5rem 1rem;
  border-bottom: 1px solid var(--ink);
}

.ft-compare-code__panel-title {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.ft-compare-code__panel-title--before {
  color: rgba(239, 68, 68, 0.8);
}

.ft-compare-code__panel-title--after {
  color: #1a7a1a;
}

.ft-compare-code__pre {
  margin: 0;
  padding: 1.25rem 1rem;
  background: #0a0a0a;
  overflow-x: auto;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  line-height: 1.75;
  flex: 1;
}

.ft-cc-muted { color: #6b7280; }
.ft-cc-tag   { color: #93c5fd; }
.ft-cc-attr  { color: #a5b4fc; }
.ft-cc-str   { color: #f59e0b; }

/* ─── Closing ─── */
.ft-product__closing {
  padding: 2rem 2rem;
}

.ft-product__closing p {
  font-size: 0.78rem;
  line-height: 1.75;
  opacity: 0.65;
  margin: 0 0 1.5rem;
  max-width: 640px;
}

.ft-product__closing-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

/* ─── System Metrics Strip ─── */
.ft-product__metrics-strip {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1.25rem;
  padding: 0.75rem 2rem;
  background: #0e1318;
  border-bottom: 1px solid #f59e0b;
  font-family: 'IBM Plex Mono', monospace;
}

.ft-product__metrics-item {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.ft-product__metrics-key {
  font-size: 0.68rem;
  color: rgba(245, 158, 11, 0.5);
  letter-spacing: 0.07em;
}

.ft-product__metrics-val {
  font-size: 0.82rem;
  font-weight: 700;
  color: #f59e0b;
  letter-spacing: 0.04em;
}

.ft-product__metrics-sep {
  font-size: 0.75rem;
  color: rgba(245, 158, 11, 0.25);
}

/* ─── Use Cases Grid ─── */
.ft-product__usecases {
  padding: 1.5rem 2rem;
}

.ft-product__usecases-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border: 1px solid rgba(245, 158, 11, 0.3);
  background: #0a0d12;
  margin-top: 0.75rem;
}

.ft-product__usecase-card {
  padding: 1.25rem;
  border-right: 1px solid rgba(245, 158, 11, 0.2);
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.ft-product__usecase-card:last-child {
  border-right: none;
}

.ft-product__usecase-tag {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #f59e0b;
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.3);
  padding: 0.2rem 0.5rem;
  display: inline-block;
  width: fit-content;
}

.ft-product__usecase-body {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.78rem;
  line-height: 1.65;
  color: rgba(245, 158, 11, 0.7);
  margin: 0;
}

/* ─── Inline CTA ─── */
.ft-product__inline-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1.25rem 2rem;
  background: #0a0d12;
  border-top: 1px solid rgba(245, 158, 11, 0.15);
}

.ft-product__inline-cta .ft-btn--ghost {
  border-color: rgba(245, 158, 11, 0.5);
  color: #f59e0b;
}

.ft-product__inline-cta .ft-btn--ghost:hover {
  background: rgba(245, 158, 11, 0.1);
  border-color: #f59e0b;
  color: #f59e0b;
}

.ft-product__inline-cta .ft-btn--primary {
  background: #f59e0b;
  border-color: #f59e0b;
  color: #0a0d12;
}

.ft-product__inline-cta .ft-btn--primary:hover {
  background: #fbbf24;
  border-color: #fbbf24;
}

/* ─── Build vs Buy ─── */
.ft-product__bvb {
  padding: 1.5rem 2rem;
}

.ft-product__bvb-pre {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.8rem;
  line-height: 1.75;
  background: #0a0d12;
  border: 1px solid rgba(245, 158, 11, 0.3);
  padding: 1.25rem 1.5rem;
  overflow-x: auto;
  margin: 0.75rem 0 0;
  color: rgba(245, 158, 11, 0.7);
}

.ft-bvb-hdr { color: #f59e0b; font-weight: 700; letter-spacing: 0.06em; }
.ft-bvb-rule { color: rgba(245, 158, 11, 0.3); }
.ft-bvb-key { color: rgba(245, 158, 11, 0.6); }
.ft-bvb-bad { color: rgba(239, 68, 68, 0.75); }
.ft-bvb-good { color: #4ade80; font-weight: 700; }

/* ─── Social Proof ─── */
.ft-product__social {
  padding: 1.5rem 2rem;
}

.ft-product__quotes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 0.75rem;
}

.ft-product__quote-card {
  background: #0a0d12;
  border: 1px solid rgba(245, 158, 11, 0.2);
  border-left: 3px solid #f59e0b;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.ft-product__quote-text {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.82rem;
  line-height: 1.65;
  color: rgba(245, 158, 11, 0.85);
  margin: 0;
  font-style: italic;
}

.ft-product__quote-attr {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.68rem;
  color: rgba(245, 158, 11, 0.45);
  letter-spacing: 0.06em;
  margin: 0;
}

/* ─── Responsive ─── */
@media (max-width: 768px) {
  .ft-monitor__grid { grid-template-columns: repeat(2, 1fr); }
  .ft-monitor__panel:nth-child(2) { border-right: none; }
  .ft-monitor__panel:nth-child(n+3) { border-top: 1px solid rgba(245,158,11,0.3); border-left: none; }
  .ft-monitor__panel:last-child { border-right: none; }
  .ft-compare-code { padding-left: 1rem; padding-right: 1rem; }
  .ft-product__sysbar {
    padding: 0.4rem 1rem;
    font-size: 0.63rem;
  }

  .ft-product__hero,
  .ft-product__module,
  .ft-product__closing {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .ft-table th,
  .ft-table td {
    padding: 0.4rem 0.5rem;
    font-size: 0.72rem;
  }

  .ft-param {
    width: 130px;
    min-width: 110px;
  }
}

@media (max-width: 768px) {
  .ft-product__metrics-strip { padding: 0.6rem 1rem; }
  .ft-product__usecases, .ft-product__bvb, .ft-product__social { padding-left: 1rem; padding-right: 1rem; }
  .ft-product__usecases-grid { grid-template-columns: 1fr; }
  .ft-product__usecase-card { border-right: none; border-bottom: 1px solid rgba(245,158,11,0.2); }
  .ft-product__usecase-card:last-child { border-bottom: none; }
  .ft-product__quotes-grid { grid-template-columns: 1fr; }
  .ft-product__inline-cta { padding-left: 1rem; padding-right: 1rem; }
}

@media (max-width: 600px) {
  .ft-monitor__grid { grid-template-columns: 1fr; }
  .ft-monitor__panel { border-right: none; border-bottom: 1px solid rgba(245,158,11,0.2); border-top: 2px solid #f59e0b; }
  .ft-monitor__panel:last-child { border-bottom: none; }
  .ft-compare-code__panels { grid-template-columns: 1fr; }
  .ft-compare-code__panel--before { border-right: none; border-bottom: 1px solid var(--ink); }
}
@media (max-width: 480px) {
  .ft-product__module-header {
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .ft-code {
    font-size: 0.65rem;
  }
}

/* ── Animation helpers ─────────────────────────────────────────── */
.ft-product__usecase-tag { will-change: clip-path; }
[data-grad-sweep] { position: relative; display: inline-block; }

/* ── Widget Demo ──────────────────────────────────────────────── */
.ft-product__widget-demo {
  padding: 0;
}

.ft-product__widget-demo-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  align-items: center;
  min-height: 400px;
}

.ft-product__widget-demo-copy {
  padding: 2.5rem 2rem;
  background: #080b0f;
  border-right: 1px solid rgba(245, 158, 11, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  justify-content: center;
}

.ft-product__widget-demo-headline {
  font-family: 'IBM Plex Mono', monospace;
  font-size: clamp(1.2rem, 2.5vw, 1.75rem);
  font-weight: 700;
  letter-spacing: 0.06em;
  color: #f59e0b;
  margin: 0;
}

.ft-product__widget-demo-sub {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.82rem;
  line-height: 1.8;
  color: rgba(245, 158, 11, 0.65);
  margin: 0;
  max-width: 40ch;
}

.ft-product__widget-demo-frame {
  padding: 2rem;
  background: #0e1318;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* ── Metrics Table ────────────────────────────────────────────── */
.ft-product__metrics-table-section {
  padding: 1.5rem 2rem;
  background: #080b0f;
}

.ft-product__metrics-table-wrap {
  overflow-x: auto;
  margin-top: 0.75rem;
}

.ft-product__metrics-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.82rem;
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.ft-product__metrics-table th {
  text-align: left;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  color: rgba(245, 158, 11, 0.45);
  border-bottom: 1px solid rgba(245, 158, 11, 0.3);
  padding: 0.5rem 1rem;
  background: rgba(245, 158, 11, 0.04);
}

.ft-product__metrics-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(245, 158, 11, 0.12);
  vertical-align: middle;
}

.ft-product__metrics-table tbody tr:last-child td {
  border-bottom: none;
}

.ft-product__metrics-table tbody tr:hover td {
  background: rgba(245, 158, 11, 0.04);
}

.ft-product__mt-key {
  color: rgba(245, 158, 11, 0.7);
  font-weight: 700;
  font-size: 0.78rem;
}

.ft-product__mt-val {
  color: #f59e0b;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.04em;
}

.ft-product__mt-status {
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  font-weight: 700;
}

.ft-product__mt-ok {
  color: #4ade80;
}

@media (max-width: 768px) {
  .ft-product__widget-demo-inner {
    grid-template-columns: 1fr;
  }
  .ft-product__widget-demo-copy {
    border-right: none;
    border-bottom: 1px solid rgba(245, 158, 11, 0.2);
  }
  .ft-product__metrics-table-section {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* ── Transaction Pipeline SVG ── */
.ft-pipeline-section { padding: 2.5rem 2rem; }
.ft-pipeline-wrap { margin-top: 1.5rem; }
.pipeline-box:nth-child(1) { animation: box-pulse 3s ease-in-out 0s infinite; }
.pipeline-box:nth-child(2) { animation: box-pulse 3s ease-in-out 0.6s infinite; }
.pipeline-box:nth-child(3) { animation: box-pulse 3s ease-in-out 1.2s infinite; }
.pipeline-box:nth-child(4) { animation: box-pulse 3s ease-in-out 1.8s infinite; }
.pipeline-box:nth-child(5) { animation: box-pulse 3s ease-in-out 2.4s infinite; }
@keyframes box-pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
.pipeline-arrow:nth-child(1) { animation: arrow-draw 1s ease 0.3s forwards; }
.pipeline-arrow:nth-child(2) { animation: arrow-draw 1s ease 0.6s forwards; }
.pipeline-arrow:nth-child(3) { animation: arrow-draw 1s ease 0.9s forwards; }
.pipeline-arrow:nth-child(4) { animation: arrow-draw 1s ease 1.2s forwards; }
@keyframes arrow-draw { to { stroke-dashoffset: 0; } }
@media (prefers-reduced-motion: reduce) {
  .pipeline-box { animation: none; opacity: 1; }
  .pipeline-arrow { animation: none; stroke-dashoffset: 0; }
}
</style>
