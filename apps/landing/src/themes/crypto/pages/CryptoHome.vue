<template>
  <div class="home">

    <!-- Live activity toast (self-contained, fixed-positioned) -->
    <LiveActivityToast />

    <!-- ── Section 1: Hero ──────────────────────────────────────── -->
    <section class="hero" aria-label="Hero">
      <CryptoNodeNetwork />
      <canvas ref="canvasEl" class="particle-canvas" aria-hidden="true"></canvas>
      <div class="grid-dots" aria-hidden="true"></div>
      <div class="scanlines" aria-hidden="true"></div>
      <div class="hero-radial-overlay" aria-hidden="true"></div>

      <div ref="heroSection" class="hero-inner">
        <div class="hero-content">
          <p class="hero-eyebrow">CRYPTO INFRASTRUCTURE · B2B · EMBED ONCE</p>
          <h1 ref="heroTitle" class="hero-headline glitch" data-text="THE CRYPTO PAYMENT OS">
            THE CRYPTO<br />PAYMENT OS
          </h1>
          <p class="hero-sub">
            Embed once. KYC, risk engine, ledger, and full fee transparency shipped with it.
            Your users see exactly what they pay. Every time.
          </p>
          <div class="hero-actions">
            <a
              href="http://localhost:5001"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-outlined-cyan"
            >
              Start building →
            </a>
            <router-link to="/crypto/product" class="btn-ghost">
              See live demo
            </router-link>
          </div>

          <!-- Live ticker -->
          <div class="ticker-wrap" aria-label="Live market ticker" aria-live="off">
            <div class="ticker-track">
              <span class="ticker-item">BTC €58,234 <span class="up">▲</span></span>
              <span class="ticker-sep">·</span>
              <span class="ticker-item">ETH €3,102 <span class="up">▲</span></span>
              <span class="ticker-sep">·</span>
              <span class="ticker-item">SOL €148 <span class="up">▲</span></span>
              <span class="ticker-sep">·</span>
              <span class="ticker-item">KYC: <span class="status-ok">approved</span></span>
              <span class="ticker-sep">·</span>
              <span class="ticker-item">Fee: <span class="status-ok">visible</span></span>
              <span class="ticker-sep">·</span>
              <span class="ticker-item">Risk: <span class="status-ok">clear</span></span>
              <span class="ticker-sep">·</span>
              <span class="ticker-item">USDT €0.9214 <span class="down">▼</span></span>
              <span class="ticker-sep">·</span>
              <!-- duplicate for seamless loop -->
              <span class="ticker-item">BTC €58,234 <span class="up">▲</span></span>
              <span class="ticker-sep">·</span>
              <span class="ticker-item">ETH €3,102 <span class="up">▲</span></span>
              <span class="ticker-sep">·</span>
              <span class="ticker-item">SOL €148 <span class="up">▲</span></span>
              <span class="ticker-sep">·</span>
              <span class="ticker-item">KYC: <span class="status-ok">approved</span></span>
              <span class="ticker-sep">·</span>
              <span class="ticker-item">Fee: <span class="status-ok">visible</span></span>
              <span class="ticker-sep">·</span>
              <span class="ticker-item">Risk: <span class="status-ok">clear</span></span>
              <span class="ticker-sep">·</span>
              <span class="ticker-item">USDT €0.9214 <span class="down">▼</span></span>
              <span class="ticker-sep">·</span>
            </div>
          </div>
        </div>

        <!-- Pulsing receipt card -->
        <div class="receipt-wrap" aria-label="Live fee receipt preview">

          <!-- Live price chips -->
          <div class="live-price-chips" aria-label="Live crypto prices">
            <div class="live-chip">
              <span class="chip-sym">BTC</span>
              <span class="chip-val">€{{ Math.round(liveP.BTC).toLocaleString('de-DE') }}</span>
            </div>
            <div class="live-chip">
              <span class="chip-sym">ETH</span>
              <span class="chip-val">€{{ Math.round(liveP.ETH).toLocaleString('de-DE') }}</span>
            </div>
            <div class="live-chip">
              <span class="chip-sym">SOL</span>
              <span class="chip-val">€{{ Math.round(liveP.SOL).toLocaleString('de-DE') }}</span>
            </div>
          </div>

          <div class="receipt-card-wrap" style="position: relative;">
            <!-- CoinFloat cluster -->
            <div class="coin-cluster" aria-hidden="true">
              <CoinFloat currency="BTC" size="lg" style="position:absolute; top:10%; right:15%; animation-delay:0s" />
              <CoinFloat currency="ETH" size="md" style="position:absolute; top:35%; right:5%; animation-delay:1.2s" />
              <CoinFloat currency="USDT" size="sm" style="position:absolute; top:60%; right:20%; animation-delay:2.5s" />
              <CoinFloat currency="EUR" size="sm" style="position:absolute; top:20%; right:30%; animation-delay:0.8s" />
            </div>

          <div class="receipt-card">
            <div class="receipt-header">
              <span class="receipt-label">FEE RECEIPT</span>
              <span class="receipt-status">LIVE</span>
            </div>
            <div class="receipt-row">
              <span>You send</span>
              <span class="val">1,000.00 EUR</span>
            </div>
            <div class="receipt-row">
              <span>Platform fee</span>
              <span class="val fee">−5.00 EUR</span>
            </div>
            <div class="receipt-row">
              <span>Network fee</span>
              <span class="val fee">−2.40 EUR</span>
            </div>
            <div class="receipt-divider" aria-hidden="true"></div>
            <div class="receipt-row total">
              <span>They receive</span>
              <span class="val">992.60 EUR</span>
            </div>
            <div class="receipt-footer">
              <span>◈ No hidden fees. No surprise math.</span>
            </div>
          </div>
          </div><!-- /.receipt-card-wrap -->
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

    <!-- ── Section 2: Stats counter ─────────────────────────────── -->
    <section class="stats-bar" aria-label="Key metrics">
      <div class="stats-inner">
        <CounterStat :value="4" prefix="$" suffix="B+" label="Crypto Processed" :duration="1200" />
        <CounterStat :value="2" prefix="< " suffix="s" label="Settlement" :duration="800" />
        <CounterStat :value="9999" prefix="" suffix="%" label="Uptime" :duration="1400" />
        <CounterStat :value="3" prefix="" suffix="" label="Chains" :duration="600" />
      </div>
    </section>

    <!-- ── Payment Flow ──────────────────────────────────────────── -->
    <section class="payment-flow-section" aria-label="Payment flow diagram">
      <div class="section-inner">
        <p class="section-eyebrow">HOW IT SETTLES</p>
        <h2 class="section-heading">From user to ledger in 2 seconds</h2>
        <div class="payment-flow-card">
          <PaymentFlowSvg theme="dark" :speed="1.5" />
          <p class="payment-flow-caption">
            Every transaction: quoted → risk-checked → settled → logged
          </p>
        </div>
      </div>
    </section>

    <!-- ── System Status ─────────────────────────────────────────── -->
    <section class="system-status-section" aria-label="System status">
      <div class="section-inner">
        <p class="section-eyebrow">SYSTEM_STATUS.live</p>
        <div class="status-panels" role="list">
          <div
            v-for="panel in systemStatusPanels"
            :key="panel.id"
            class="status-panel"
            role="listitem"
          >
            <div class="status-dot-wrap">
              <span class="status-dot" aria-hidden="true"></span>
              <span class="status-id">{{ panel.id }}</span>
            </div>
            <span class="status-state">{{ panel.state }}</span>
            <span class="status-metric">{{ panel.metric }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Section 3: Transaction lifecycle ─────────────────────── -->
    <section class="lifecycle-section" aria-label="Transaction lifecycle">
      <div class="section-inner">
        <p class="section-eyebrow">WATCH IT HAPPEN</p>
        <h2 class="section-heading">TRANSACTION_LIFECYCLE.exe</h2>
        <p class="lifecycle-desc">
          Every transaction is a 7-step verified journey. Nothing hides between steps.
        </p>

        <div class="lifecycle-terminal" role="list" aria-label="Transaction steps">
          <div
            v-for="(step, idx) in txSteps"
            :key="step.id"
            class="lifecycle-step"
            :class="{
              'step-done': idx < activeStep,
              'step-active': idx === activeStep,
              'step-pending': idx > activeStep,
            }"
            role="listitem"
            :aria-current="idx === activeStep ? 'step' : undefined"
          >
            <div class="step-left">
              <span class="step-num">{{ String(idx + 1).padStart(2, '0') }}</span>
              <span class="step-dot">
                <span v-if="idx < activeStep">✓</span>
                <span v-else-if="idx === activeStep" class="pulse-dot">●</span>
                <span v-else>○</span>
              </span>
            </div>
            <div class="step-middle">
              <span class="step-id">{{ step.id }}</span>
              <span class="step-desc">{{ step.desc }}</span>
              <span class="step-status" v-if="idx < activeStep">→ DONE</span>
              <span class="step-status active-status" v-else-if="idx === activeStep">
                → PROCESSING<span class="blink-dots">...</span>
              </span>
              <span class="step-status dim-status" v-else>→ WAITING</span>
            </div>
            <div class="step-right">
              <span class="step-badge">{{ step.badge }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Widget Preview ────────────────────────────────────────────── -->
    <section class="widget-preview-section" data-reveal="fade-up" aria-labelledby="widget-preview-h">
      <div class="widget-preview-inner">
        <div class="widget-preview-text">
          <h2 id="widget-preview-h" class="section-heading">// LIVE DEMO</h2>
          <p class="widget-preview-sub">Watch the full KYC-to-receipt flow. Your users never leave your page. Your brand stays front and center.</p>
        </div>
        <WidgetDemo theme="crypto" />
      </div>
    </section>

    <!-- ── Section 4: Problem + comparison ──────────────────────── -->
    <section class="problem-section" aria-label="The problem">
      <div class="section-inner">
        <div class="problem-card">
          <p class="problem-eyebrow">THE CURRENT SITUATION</p>
          <blockquote class="problem-quote">
            "The other guys hide fees in a cloud of regulatory fog.
            We show you everything. Yes, even the bad bits."
          </blockquote>
          <p class="problem-body">
            Users abandon 60% of crypto transactions when the fee appears at the final step.
            That's not a conversion problem. That's a honesty problem.
            Prodigy shows the full fee breakdown before the user lifts a finger —
            not as a legal disclaimer, but as a feature.
          </p>
        </div>

        <!-- Before / After comparison -->
        <div class="compare-grid" aria-label="Before and after comparison">
          <div class="compare-header compare-before">
            <span>WITHOUT US</span>
          </div>
          <div class="compare-header compare-after">
            <span>WITH PRODIGY</span>
          </div>

          <div class="compare-row">
            <div class="compare-cell before">
              <span class="compare-label">Fees</span>
              <span class="compare-text">Hidden until post-confirmation</span>
            </div>
            <div class="compare-cell after">
              <span class="compare-label">Fees</span>
              <span class="compare-text">Shown before user touches anything</span>
            </div>
          </div>

          <div class="compare-row">
            <div class="compare-cell before">
              <span class="compare-label">KYC</span>
              <span class="compare-text">Outsourced, unexplained failures</span>
            </div>
            <div class="compare-cell after">
              <span class="compare-label">KYC</span>
              <span class="compare-text">Built-in, status shown in real time</span>
            </div>
          </div>

          <div class="compare-row">
            <div class="compare-cell before">
              <span class="compare-label">Dashboard</span>
              <span class="compare-text">Shows payments, not revenue</span>
            </div>
            <div class="compare-cell after">
              <span class="compare-label">Dashboard</span>
              <span class="compare-text">Shows revenue, commissions, risk flags</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Section 5: Feature hex grid ──────────────────────────── -->
    <section class="features-section" aria-label="Included features">
      <div class="section-inner">
        <p class="section-eyebrow">INSIDE THE EMBED</p>
        <h2 ref="feat1Title" class="section-heading">WHAT_SHIPPED.list</h2>

        <div class="hex-grid" role="list">
          <div
            v-for="feat in hexFeatures"
            :key="feat.name"
            class="hex-cell"
            role="listitem"
          >
            <span class="hex-icon" aria-hidden="true">{{ feat.icon }}</span>
            <h3 class="hex-name">{{ feat.name }}</h3>
            <p class="hex-note">{{ feat.note }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Section 6: KYC & Security deep dive ──────────────────── -->
    <section class="kyc-section" aria-label="KYC and security">
      <div class="section-inner kyc-inner">
        <div class="kyc-left">
          <div class="kyc-card" ref="kycCardEl">
            <div class="kyc-row kyc-meta">
              <span class="kyc-key">USER:</span>
              <span class="kyc-val">anon@partner.app</span>
            </div>
            <div class="kyc-row">
              <span class="kyc-key">STATUS:</span>
              <span class="kyc-val kyc-checking">CHECKING <span class="blink-dots">→→→</span></span>
            </div>
            <div class="kyc-bar-row">
              <span class="kyc-key">ID SCAN:</span>
              <div class="kyc-bar-wrap">
                <div
                  class="kyc-bar"
                  :style="{ width: kycBarsVisible ? '100%' : '0%' }"
                ></div>
              </div>
              <span class="kyc-pct">100%</span>
            </div>
            <div class="kyc-bar-row">
              <span class="kyc-key">FACE MATCH:</span>
              <div class="kyc-bar-wrap">
                <div
                  class="kyc-bar"
                  :style="{ width: kycBarsVisible ? '100%' : '0%', transitionDelay: '0.3s' }"
                ></div>
              </div>
              <span class="kyc-pct">100%</span>
            </div>
            <div class="kyc-row">
              <span class="kyc-key">SANCTIONS:</span>
              <span class="kyc-val status-ok">CLEAR</span>
            </div>
            <div class="kyc-row">
              <span class="kyc-key">RISK SCORE:</span>
              <span class="kyc-val"><span class="status-ok">12/100</span> <span class="kyc-dim">(LOW)</span></span>
            </div>
            <div class="kyc-row kyc-result">
              <span class="kyc-key">RESULT:</span>
              <span class="kyc-val kyc-approved">✓ APPROVED in 47s</span>
            </div>
          </div>
        </div>

        <div class="kyc-right">
          <p class="section-eyebrow">COMPLIANCE THAT DOESN'T HIDE</p>
          <h2 ref="feat2Title" class="section-heading kyc-heading">TRUST_LAYER.sh</h2>
          <ul class="kyc-bullets" aria-label="Trust points">
            <li v-for="point in trustPoints" :key="point" class="kyc-bullet">
              {{ point }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ── Section 7: Partner revenue ───────────────────────────── -->
    <section class="revenue-section" aria-label="Partner revenue" ref="revenueSectionEl">
      <div class="section-inner">
        <p class="section-eyebrow">FOR BUILDERS WHO EARN</p>
        <h2 class="section-heading">REVENUE_SHARE.config</h2>

        <div class="revenue-layout">
          <div class="revenue-card">
            <div class="rev-row">
              <span class="rev-key">TRANSACTIONS:</span>
              <span class="rev-val" ref="txCountEl">0</span>
            </div>
            <div class="rev-row">
              <span class="rev-key">PARTNER PAYOUT:</span>
              <span class="rev-val cyan-val" ref="payoutEl">€0.00</span>
            </div>
            <div class="rev-row rev-dim">
              <span class="rev-key">RATE:</span>
              <span class="rev-val">0.2% per tx</span>
            </div>
            <div class="rev-row rev-dim">
              <span class="rev-key">AVG TX SIZE:</span>
              <span class="rev-val">€504.84</span>
            </div>
            <div class="rev-divider"></div>
            <div class="rev-row">
              <span class="rev-key">STATUS:</span>
              <span class="rev-val status-ok">● LIVE</span>
            </div>
          </div>

          <div class="embed-block" aria-label="Embed code">
            <div class="embed-header">
              <span class="embed-label">embed.html</span>
              <span class="embed-tag">ONE TAG</span>
            </div>
            <pre class="embed-code"><code><span class="code-tag">&lt;script</span>
  <span class="code-attr">src</span>=<span class="code-str">"https://widget.prodigy.demo/embed.js"</span>
  <span class="code-attr">data-client-id</span>=<span class="code-str">"YOUR_ID"</span>
  <span class="code-attr">data-partner-share</span>=<span class="code-str">"0.002"</span>
<span class="code-tag">&gt;&lt;/script&gt;</span></code></pre>
            <p class="embed-note">One tag. The widget brings the rest.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Testimonials ─────────────────────────────────────────── -->
    <section class="testimonials" aria-label="Customer testimonials">
      <div class="section-inner">
        <p class="section-eyebrow">SIGNAL_RECEIVED.log</p>
        <h2 class="section-heading">WHAT_THEY_SAID.txt</h2>
        <div class="testimonials-row">
          <div class="t-card">
            <p class="t-quote">"We went from 6 months of KYC integration to 3 lines of code. Prodigy is the infrastructure layer we never had to build."</p>
            <div class="t-author">
              <div class="t-avatar" aria-hidden="true">SK</div>
              <span class="t-name">Sarah K., Head of Product, NordPay</span>
            </div>
          </div>
          <div class="t-card">
            <p class="t-quote">"Our conversion rate jumped 34% after switching. The widget just works — no edge cases, no compliance headaches."</p>
            <div class="t-author">
              <div class="t-avatar" aria-hidden="true">MT</div>
              <span class="t-name">Marcus T., CTO, SwapDeck</span>
            </div>
          </div>
          <div class="t-card">
            <p class="t-quote">"We launched in 3 new markets in Q3 because Prodigy handles all the local compliance. It's transformative."</p>
            <div class="t-author">
              <div class="t-avatar" aria-hidden="true">IM</div>
              <span class="t-name">Ingrid M., CEO, Meridian Wealth</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Live Network terminal ─────────────────────────────────── -->
    <section class="live-network-section" aria-label="Live network activity">
      <div class="section-inner">
        <p class="section-eyebrow">NETWORK_ACTIVITY.stream</p>
        <h2 class="section-heading">LIVE_FEED.exe</h2>
        <div class="network-terminal" aria-live="off" aria-label="Simulated live transaction feed">
          <div class="terminal-header">
            <span class="term-dot term-dot--red" aria-hidden="true"></span>
            <span class="term-dot term-dot--yellow" aria-hidden="true"></span>
            <span class="term-dot term-dot--green" aria-hidden="true"></span>
            <span class="term-title">prodigy-ledger — live stream</span>
          </div>
          <div class="terminal-body">
            <div class="terminal-feed">
              <div class="feed-line">
                <span class="feed-ts">18:42:01.334</span>
                <span class="feed-tag feed-tag--ok">SETTLED</span>
                <span class="feed-msg">tx_8f3a2c · BTC → EUR · €1,240.00 · fee: €6.20 · partner: +€2.48</span>
              </div>
              <div class="feed-line">
                <span class="feed-ts">18:42:00.891</span>
                <span class="feed-tag feed-tag--kyc">KYC_PASS</span>
                <span class="feed-msg">user_af91b · doc: PASSPORT · score: 98.4% · elapsed: 43s</span>
              </div>
              <div class="feed-line">
                <span class="feed-ts">18:41:59.120</span>
                <span class="feed-tag feed-tag--ok">SETTLED</span>
                <span class="feed-msg">tx_2d91fa · ETH → USD · €3,802.50 · fee: €19.01 · partner: +€7.60</span>
              </div>
              <div class="feed-line">
                <span class="feed-ts">18:41:58.003</span>
                <span class="feed-tag feed-tag--risk">RISK_OK</span>
                <span class="feed-msg">tx_cc4e11 · 12 checks · velocity: normal · counterparty: clear</span>
              </div>
              <div class="feed-line">
                <span class="feed-ts">18:41:57.441</span>
                <span class="feed-tag feed-tag--ok">SETTLED</span>
                <span class="feed-msg">tx_4b7f22 · SOL → EUR · €148.30 · fee: €0.74 · partner: +€0.30</span>
              </div>
              <div class="feed-line">
                <span class="feed-ts">18:41:56.809</span>
                <span class="feed-tag feed-tag--kyc">KYC_PASS</span>
                <span class="feed-msg">user_bc33d · doc: ID_CARD · score: 96.1% · elapsed: 51s</span>
              </div>
              <div class="feed-line">
                <span class="feed-ts">18:41:55.204</span>
                <span class="feed-tag feed-tag--ok">SETTLED</span>
                <span class="feed-msg">tx_9e8a01 · BTC → GBP · €8,904.00 · fee: €44.52 · partner: +€17.81</span>
              </div>
              <div class="feed-line">
                <span class="feed-ts">18:41:54.001</span>
                <span class="feed-tag feed-tag--risk">RISK_OK</span>
                <span class="feed-msg">tx_77c3bb · 12 checks · velocity: normal · counterparty: clear</span>
              </div>
              <!-- Duplicate for seamless loop -->
              <div class="feed-line">
                <span class="feed-ts">18:42:01.334</span>
                <span class="feed-tag feed-tag--ok">SETTLED</span>
                <span class="feed-msg">tx_8f3a2c · BTC → EUR · €1,240.00 · fee: €6.20 · partner: +€2.48</span>
              </div>
              <div class="feed-line">
                <span class="feed-ts">18:42:00.891</span>
                <span class="feed-tag feed-tag--kyc">KYC_PASS</span>
                <span class="feed-msg">user_af91b · doc: PASSPORT · score: 98.4% · elapsed: 43s</span>
              </div>
              <div class="feed-line">
                <span class="feed-ts">18:41:59.120</span>
                <span class="feed-tag feed-tag--ok">SETTLED</span>
                <span class="feed-msg">tx_2d91fa · ETH → USD · €3,802.50 · fee: €19.01 · partner: +€7.60</span>
              </div>
              <div class="feed-line">
                <span class="feed-ts">18:41:58.003</span>
                <span class="feed-tag feed-tag--risk">RISK_OK</span>
                <span class="feed-msg">tx_cc4e11 · 12 checks · velocity: normal · counterparty: clear</span>
              </div>
              <div class="feed-line">
                <span class="feed-ts">18:41:57.441</span>
                <span class="feed-tag feed-tag--ok">SETTLED</span>
                <span class="feed-msg">tx_4b7f22 · SOL → EUR · €148.30 · fee: €0.74 · partner: +€0.30</span>
              </div>
              <div class="feed-line">
                <span class="feed-ts">18:41:56.809</span>
                <span class="feed-tag feed-tag--kyc">KYC_PASS</span>
                <span class="feed-msg">user_bc33d · doc: ID_CARD · score: 96.1% · elapsed: 51s</span>
              </div>
              <div class="feed-line">
                <span class="feed-ts">18:41:55.204</span>
                <span class="feed-tag feed-tag--ok">SETTLED</span>
                <span class="feed-msg">tx_9e8a01 · BTC → GBP · €8,904.00 · fee: €44.52 · partner: +€17.81</span>
              </div>
              <div class="feed-line">
                <span class="feed-ts">18:41:54.001</span>
                <span class="feed-tag feed-tag--risk">RISK_OK</span>
                <span class="feed-msg">tx_77c3bb · 12 checks · velocity: normal · counterparty: clear</span>
              </div>
            </div>
          </div>
          <div class="terminal-footer">
            <span class="feed-live-dot" aria-hidden="true"></span>
            <span class="terminal-footer-label">LIVE · All transactions demo-only · No real money</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Trust logos ────────────────────────────────────────────── -->
    <div class="crypto-trust-wrapper">
      <TrustLogoStrip label="Built on regulated infrastructure" />
    </div>

    <!-- ── Social Proof / Partners ──────────────────────────────── -->
    <section class="crypto-partners-say" aria-labelledby="crypto-partners-h" data-reveal="fade-up">
      <div class="section-inner">
        <p class="section-eyebrow">Social proof · Simulated companies · Genuine results</p>
        <h2 id="crypto-partners-h" class="section-heading">// SIGNAL_FROM_THE_FIELD</h2>
        <div class="crypto-partners-grid" ref="partnersGrid" data-animate-stagger>
          <figure class="crypto-partner-card" v-for="t in partnerTestimonials" :key="t.badge">
            <blockquote class="crypto-partner-quote">{{ t.quote }}</blockquote>
            <figcaption class="crypto-partner-attr">
              <span class="crypto-partner-role">{{ t.role }}</span>
              <span class="crypto-partner-company">{{ t.company }}</span>
            </figcaption>
            <span class="crypto-partner-badge">{{ t.badge }}</span>
          </figure>
        </div>
      </div>
    </section>

    <!-- ── Section 8: Final CTA ──────────────────────────────────── -->
    <section class="cta-section" aria-label="Call to action">
      <div class="section-inner cta-inner">
        <h2 class="cta-heading">READY WHEN YOU ARE.</h2>
        <p class="cta-sub">
          One script tag. No sales call. No 47-step onboarding.
          Open the demo and see a full transaction flow in under two minutes.
        </p>
        <div class="cta-actions">
          <a
            href="http://localhost:5001"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary btn-large"
          >
            Open the demo. It won't bite. →
          </a>
          <router-link to="/crypto/product" class="btn-ghost btn-large">
            Explore the modules
          </router-link>
        </div>
        <div class="cta-badges" aria-label="Environment notes">
          <span class="badge-pill">◈ No real money</span>
          <span class="badge-pill">Demo environment</span>
          <span class="badge-pill">Localhost only</span>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useBackendData } from '@/composables/useBackendData'
import CryptoNodeNetwork from '@/components/three/CryptoNodeNetwork.vue'
import CoinFloat from '../../../components/shared/CoinFloat.vue'
import CounterStat from '../../../components/shared/CounterStat.vue'
import PaymentFlowSvg from '../../../components/shared/PaymentFlowSvg.vue'
import LiveActivityToast from '../../../components/shared/LiveActivityToast.vue'
import TrustLogoStrip from '@/components/shared/TrustLogoStrip.vue'
import { useHoverScramble } from '@/composables/useTextScramble'
import { useMagneticAll } from '@/composables/useMagneticButton'
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

// ── Partners testimonials ─────────────────────────────────────────
const partnersGrid = ref<HTMLElement | null>(null)
useCardTiltAll(partnersGrid, '.crypto-partner-card', { maxTilt: 5, scale: 1.02, glowColor: '#00ffb2', glowIntensity: 0.15 })

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

// ── Animation refs ────────────────────────────────────────────────
const heroTitle = ref<HTMLElement | null>(null)
const heroSection = ref<HTMLElement | null>(null)
const feat1Title = ref<HTMLElement | null>(null)
const feat2Title = ref<HTMLElement | null>(null)

// Hover scramble on feature section headings
useHoverScramble(feat1Title, 'tech')
useHoverScramble(feat2Title, 'tech')

// Magnetic CTAs in hero
useMagneticAll(heroSection, 'a, button', { strength: 0.4, returnDuration: 500 })

// ── Live prices ──────────────────────────────────────────────────
const { prices: livePrices } = useBackendData()

// Map MarketPrice[] → keyed lookup for template usage
interface PriceMap { BTC: number; ETH: number; SOL: number; [k: string]: number }
const liveP = computed<PriceMap>(() => {
  const map: PriceMap = { BTC: 58234, ETH: 3102, SOL: 148 }
  for (const p of livePrices.value) {
    map[p.currency] = p.midPrice
  }
  return map
})

// ── Types ────────────────────────────────────────────────────────
interface Particle {
  x: number
  y: number
  vx: number
  vy: number
}

interface TxStep {
  id: string
  desc: string
  badge: string
}

interface HexFeature {
  icon: string
  name: string
  note: string
}

// ── Particle canvas ──────────────────────────────────────────────
const canvasEl = ref<HTMLCanvasElement | null>(null)
let animFrame: number | null = null
let mouseX = 0
let mouseY = 0

function onMouseMove(e: MouseEvent) {
  mouseX = e.clientX
  mouseY = e.clientY
}

function initCanvas(): (() => void) | undefined {
  const cvs = canvasEl.value
  if (!cvs) return
  // Capture as non-null for use inside closures
  const canvas: HTMLCanvasElement = cvs
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const context: CanvasRenderingContext2D = ctx

  let W = canvas.offsetWidth
  let H = canvas.offsetHeight
  canvas.width = W
  canvas.height = H

  const NODE_COUNT = 80
  const MAX_DIST = 150
  const REPEL_RADIUS = 100
  const REPEL_FORCE = 2.5

  const particles: Particle[] = Array.from({ length: NODE_COUNT }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
  }))

  function resize() {
    W = canvas.offsetWidth
    H = canvas.offsetHeight
    canvas.width = W
    canvas.height = H
  }

  let ro: ResizeObserver | null = null
  try {
    if (typeof window !== 'undefined' && window.ResizeObserver) {
      ro = new ResizeObserver(resize)
      ro.observe(cvs)
    }
  } catch (_) {
    // ResizeObserver not available
  }

  function draw() {
    context.clearRect(0, 0, W, H)

    const rect = canvas.getBoundingClientRect()
    const localMouseX = mouseX - rect.left
    const localMouseY = mouseY - rect.top

    for (const p of particles) {
      // Mouse repulsion
      const dx = p.x - localMouseX
      const dy = p.y - localMouseY
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < REPEL_RADIUS && dist > 0) {
        const force = (REPEL_RADIUS - dist) / REPEL_RADIUS
        p.vx += (dx / dist) * force * REPEL_FORCE * 0.02
        p.vy += (dy / dist) * force * REPEL_FORCE * 0.02
      }

      // Dampen velocity
      p.vx *= 0.99
      p.vy *= 0.99

      // Clamp speed
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
      if (speed > 1.2) {
        p.vx = (p.vx / speed) * 1.2
        p.vy = (p.vy / speed) * 1.2
      }

      p.x += p.vx
      p.y += p.vy
      if (p.x < 0 || p.x > W) p.vx *= -1
      if (p.y < 0 || p.y > H) p.vy *= -1
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const pi = particles[i]!
        const pj = particles[j]!
        const ex = pi.x - pj.x
        const ey = pi.y - pj.y
        const edist = Math.sqrt(ex * ex + ey * ey)
        if (edist < MAX_DIST) {
          const alpha = (1 - edist / MAX_DIST) * 0.25
          context.strokeStyle = `rgba(0, 245, 255, ${alpha})`
          context.lineWidth = 0.8
          context.beginPath()
          context.moveTo(pi.x, pi.y)
          context.lineTo(pj.x, pj.y)
          context.stroke()
        }
      }
    }

    for (const p of particles) {
      context.fillStyle = 'rgba(0, 245, 255, 0.5)'
      context.beginPath()
      context.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
      context.fill()
    }

    animFrame = requestAnimationFrame(draw)
  }

  draw()

  return () => {
    ro?.disconnect()
  }
}

let cleanupCanvas: (() => void) | undefined

// Stats are now handled by <CounterStat> components

// ── Transaction lifecycle ────────────────────────────────────────
const activeStep = ref(0)
let lifecycleInterval: ReturnType<typeof setInterval> | null = null

const txSteps: TxStep[] = [
  { id: 'INIT', desc: 'User opens widget, selects BTC, enters amount', badge: '0ms' },
  { id: 'QUOTE', desc: 'Real-time rate fetched — fee shown: €5.00 platform + €2.40 network', badge: '42ms' },
  { id: 'CONFIRM', desc: 'User sees full receipt before pressing anything', badge: '0ms' },
  { id: 'KYC', desc: 'Identity check runs silently (< 47s on average)', badge: '47s' },
  { id: 'RISK', desc: 'Counterparty check · velocity flag · pattern review', badge: '120ms' },
  { id: 'EXECUTE', desc: 'Transaction posted to ledger, partner share allocated', badge: '201ms' },
  { id: 'SETTLED', desc: 'Admin console updates, partner portal posts commission', badge: '201 OK' },
]

function startLifecycle() {
  lifecycleInterval = setInterval(() => {
    if (activeStep.value < txSteps.length - 1) {
      activeStep.value++
    } else {
      // pause then restart
      clearInterval(lifecycleInterval!)
      lifecycleInterval = null
      setTimeout(() => {
        activeStep.value = 0
        startLifecycle()
      }, 7000)
    }
  }, 800)
}

// ── KYC bars ─────────────────────────────────────────────────────
const kycCardEl = ref<HTMLElement | null>(null)
const kycBarsVisible = ref(false)
let kycObserver: IntersectionObserver | null = null

function initKycObserver() {
  if (!kycCardEl.value) return
  kycObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        kycBarsVisible.value = true
        kycObserver?.disconnect()
      }
    },
    { threshold: 0.4 }
  )
  kycObserver.observe(kycCardEl.value)
}

// ── Revenue counter ───────────────────────────────────────────────
const revenueSectionEl = ref<HTMLElement | null>(null)
const txCountEl = ref<HTMLElement | null>(null)
const payoutEl = ref<HTMLElement | null>(null)
let revenueObserver: IntersectionObserver | null = null
let revenueAnimated = false

const TX_TARGET = 248
const PAYOUT_TARGET = 249.6

function animateRevenue() {
  const duration = 1800
  const start = performance.now()
  function step(now: number) {
    const progress = Math.min((now - start) / duration, 1)
    const ease = 1 - Math.pow(1 - progress, 3)
    if (txCountEl.value) txCountEl.value.textContent = String(Math.round(TX_TARGET * ease))
    if (payoutEl.value) payoutEl.value.textContent = `€${(PAYOUT_TARGET * ease).toFixed(2)}`
    if (progress < 1) requestAnimationFrame(step)
    else {
      if (txCountEl.value) txCountEl.value.textContent = String(TX_TARGET)
      if (payoutEl.value) payoutEl.value.textContent = `€${PAYOUT_TARGET.toFixed(2)}`
    }
  }
  requestAnimationFrame(step)
}

function initRevenueObserver() {
  if (!revenueSectionEl.value) return
  revenueObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting && !revenueAnimated) {
        revenueAnimated = true
        animateRevenue()
      }
    },
    { threshold: 0.3 }
  )
  revenueObserver.observe(revenueSectionEl.value)
}

// ── Lifecycle hooks ───────────────────────────────────────────────
onMounted(() => {
  cleanupCanvas = initCanvas() ?? undefined
  window.addEventListener('mousemove', onMouseMove)
  startLifecycle()
  initKycObserver()
  initRevenueObserver()

  // Glitch-active fires twice, 3s apart
  const glitch = () => {
    heroTitle.value?.classList.add('glitch-active')
    setTimeout(() => heroTitle.value?.classList.remove('glitch-active'), 500)
  }
  setTimeout(glitch, 1500)
  setTimeout(glitch, 4500)

  activityTimer = setInterval(() => {
    const next = allActivity[activityIdx.value % allActivity.length]!
    visibleActivity.value = [{ ...next, id: Date.now(), time: 'just now' }, ...visibleActivity.value.slice(0, 3)]
    activityIdx.value++
  }, 3500)
})

onUnmounted(() => {
  if (animFrame !== null) cancelAnimationFrame(animFrame)
  cleanupCanvas?.()
  window.removeEventListener('mousemove', onMouseMove)
  if (lifecycleInterval !== null) clearInterval(lifecycleInterval)
  kycObserver?.disconnect()
  revenueObserver?.disconnect()
  clearInterval(activityTimer)
})

// ── Static data ───────────────────────────────────────────────────
const hexFeatures: HexFeature[] = [
  { icon: '◈', name: 'Widget Core', note: 'configurable currencies, branded, responsive' },
  { icon: '⬡', name: 'KYC Engine', note: 'live identity check, status visible to user' },
  { icon: '◊', name: 'Risk Layer', note: 'velocity check, counterparty screen, manual override' },
  { icon: '▣', name: 'Fee Ledger', note: 'every fee on-chain, shown pre-confirm' },
  { icon: '⚡', name: 'Partner API', note: 'revenue split configured by admin, posted per tx' },
  { icon: '⬟', name: 'Admin Console', note: 'full visibility: KYC queue, risk flags, all transactions' },
]

// ── System status panels ─────────────────────────────────────────
const systemStatusPanels = [
  { id: '● API', state: 'ONLINE', metric: '< 50ms' },
  { id: '● KYC', state: 'OPERATIONAL', metric: '93.1% pass' },
  { id: '● LEDGER', state: 'SYNCED', metric: 'Real-time' },
  { id: '● RISK', state: 'ACTIVE', metric: '12 checks/tx' },
]

const trustPoints: string[] = [
  'KYC happens inside the widget — your users never leave your platform',
  'Every check logged with timestamp and outcome',
  'Manual review queue visible in admin console',
  'GDPR-compliant data handling — we hold nothing we don\'t need',
]
</script>

<style scoped>
/* ── Tokens ──────────────────────────────────────────────────── */
.home {
  --bg: #050510;
  --cyan: #00f5ff;
  --purple: #a855f7;
  --red-dim: rgba(255, 80, 80, 0.7);
  --text: #e8eaff;
  --white: #ffffff;
  --card-bg: rgba(255, 255, 255, 0.03);
  --card-bg-solid: #0a0a1a;
  --card-border: rgba(0, 245, 255, 0.15);
  --glow-cyan: 0 0 20px rgba(0, 245, 255, 0.3);
  --glow-cyan-strong: 0 0 40px rgba(0, 245, 255, 0.6);
  --glow-purple: 0 0 20px rgba(168, 85, 247, 0.3);

  background: var(--bg);
  color: var(--text);
  font-family: 'Barlow Condensed', sans-serif;
}

/* ── Shared ──────────────────────────────────────────────────── */
.section-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 2rem);
}

.section-eyebrow {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.25em;
  color: var(--cyan);
  margin: 0 0 0.75rem;
  text-align: center;
}

.section-heading {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--white);
  text-align: center;
  margin: 0 0 clamp(2rem, 5vw, 3.5rem);
}

/* ── Status colors ───────────────────────────────────────────── */
.status-ok { color: var(--cyan); }
.up { color: var(--cyan); }
.down { color: var(--red-dim); }

/* ── Buttons ─────────────────────────────────────────────────── */
.btn-primary {
  display: inline-block;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(0.9rem, 1.5vw, 1.1rem);
  font-weight: 600;
  letter-spacing: 0.06em;
  color: #050510;
  background: var(--cyan);
  padding: 0.75rem 1.75rem;
  border-radius: 3px;
  text-decoration: none;
  transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
}
.btn-primary:hover {
  background: var(--white);
  box-shadow: 0 0 24px rgba(0, 245, 255, 0.5), 0 0 60px rgba(0, 245, 255, 0.2), 0 8px 20px rgba(0,0,0,0.3);
  transform: translateY(-2px);
}

/* Neon glow at rest on the primary CTA */
.cta-section .btn-primary,
.hero-actions .btn-outlined-cyan {
  box-shadow: 0 0 12px rgba(0, 245, 255, 0.25), 0 0 30px rgba(0, 245, 255, 0.08);
}
.cta-section .btn-primary:hover,
.hero-actions .btn-outlined-cyan:hover {
  box-shadow: 0 0 24px rgba(0, 245, 255, 0.6), 0 0 60px rgba(0, 245, 255, 0.2), 0 8px 20px rgba(0,0,0,0.3);
}
.btn-primary.btn-large {
  font-size: clamp(1rem, 2vw, 1.2rem);
  padding: 1rem 2.5rem;
}

.btn-ghost {
  display: inline-block;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(0.9rem, 1.5vw, 1.1rem);
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--cyan);
  padding: 0.75rem 1.75rem;
  border: 1px solid rgba(0, 245, 255, 0.4);
  border-radius: 3px;
  text-decoration: none;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
}
.btn-ghost:hover {
  border-color: var(--cyan);
  box-shadow: var(--glow-cyan);
  transform: translateY(-1px);
}
.btn-ghost.btn-large {
  font-size: clamp(1rem, 2vw, 1.2rem);
  padding: 1rem 2.5rem;
}

/* Outlined cyan — hero CTA */
.btn-outlined-cyan {
  display: inline-block;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(0.9rem, 1.5vw, 1.1rem);
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--cyan);
  padding: 0.75rem 1.75rem;
  border: 1.5px solid var(--cyan);
  border-radius: 3px;
  text-decoration: none;
  background: rgba(0, 245, 255, 0.05);
  transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
}
.btn-outlined-cyan:hover {
  background: rgba(0, 245, 255, 0.12);
  box-shadow: var(--glow-cyan);
  transform: translateY(-1px);
}

/* ── Hero ────────────────────────────────────────────────────── */
.hero {
  position: relative;
  min-height: clamp(700px, 92vh, 960px);
  display: flex;
  align-items: center;
  overflow: hidden;
  background: radial-gradient(ellipse at 60% 50%, rgba(0, 200, 255, 0.15) 0%, transparent 60%),
              radial-gradient(ellipse at 30% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
              #0a0a0f;
}

.hero-radial-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(ellipse at 60% 50%, rgba(0, 200, 255, 0.15) 0%, transparent 60%),
              radial-gradient(ellipse at 30% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%);
  z-index: 1;
}

.particle-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.grid-dots {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0, 245, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 245, 255, 0.04) 1px, transparent 1px),
    radial-gradient(rgba(0, 245, 255, 0.07) 1px, transparent 1px);
  background-size: 64px 64px, 64px 64px, 32px 32px;
  pointer-events: none;
}

/* Scan-line overlay */
.scanlines {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 245, 255, 0.015) 2px,
    rgba(0, 245, 255, 0.015) 4px
  );
  animation: scanlines 8s linear infinite;
}

@keyframes scanlines {
  from { background-position-y: 0; }
  to { background-position-y: 100px; }
}

.hero-inner {
  position: relative;
  z-index: 2;
  max-width: 1280px;
  margin: 0 auto;
  padding: clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 2rem);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2rem, 5vw, 4rem);
  align-items: center;
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 2.5vw, 1.5rem);
}

.hero-eyebrow {
  font-family: 'Space Mono', monospace;
  font-size: clamp(0.7rem, 1.2vw, 0.85rem);
  letter-spacing: 0.25em;
  color: var(--cyan);
  margin: 0;
}

.hero-headline {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(2rem, 5vw, 3.75rem);
  font-weight: 800;
  line-height: 1.0;
  letter-spacing: -0.01em;
  color: var(--white);
  margin: 0;
}

/* Glitch */
@keyframes glitch {
  0%, 85%, 100% {
    text-shadow: none;
    clip-path: none;
    transform: translate(0);
  }
  20% {
    text-shadow: -2px 0 #00f5ff, 2px 0 #a855f7;
    clip-path: inset(20% 0 60% 0);
    transform: translate(-2px);
  }
  40% {
    text-shadow: 2px 0 #a855f7;
    clip-path: inset(60% 0 20% 0);
    transform: translate(2px);
  }
  60% {
    text-shadow: none;
    transform: translate(0);
    clip-path: none;
  }
}
.glitch { animation: glitch 4s infinite; }
.glitch-active {
  animation: glitch 0.5s linear !important;
}

.hero-sub {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  font-weight: 400;
  line-height: 1.55;
  color: rgba(232, 234, 255, 0.75);
  margin: 0;
  max-width: 42ch;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

/* Ticker */
.ticker-wrap {
  overflow: hidden;
  border: 1px solid rgba(0, 245, 255, 0.12);
  border-radius: 3px;
  background: rgba(0, 245, 255, 0.03);
  padding: 0.45rem 0;
  margin-top: 0.25rem;
}

.ticker-track {
  display: inline-flex;
  gap: 0.75rem;
  white-space: nowrap;
  animation: ticker-scroll 20s linear infinite;
}

@keyframes ticker-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.ticker-item {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: rgba(232, 234, 255, 0.65);
  letter-spacing: 0.05em;
}

.ticker-sep {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: rgba(0, 245, 255, 0.3);
}

/* Receipt card */
.receipt-wrap {
  perspective: 1000px;
  display: flex;
  justify-content: center;
}

.receipt-card {
  background: rgba(5, 5, 16, 0.9);
  border: 1px solid rgba(0, 245, 255, 0.3);
  border-radius: 8px;
  padding: clamp(1.25rem, 3vw, 2rem);
  width: 100%;
  max-width: 340px;
  transform: rotateY(-6deg) rotateX(3deg);
  transition: transform 0.4s ease;
  animation: float 6s ease-in-out infinite, glow-pulse 2s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: rotateY(-6deg) rotateX(3deg) translateY(0); }
  50% { transform: rotateY(-6deg) rotateX(3deg) translateY(-10px); }
}

@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(0, 245, 255, 0.3), 0 0 60px rgba(0, 245, 255, 0.08); }
  50% { box-shadow: 0 0 40px rgba(0, 245, 255, 0.6), 0 0 80px rgba(0, 245, 255, 0.15); }
}

.receipt-card:hover {
  transform: rotateY(0deg) rotateX(0deg) translateY(-4px);
  animation: glow-pulse 2s ease-in-out infinite;
}

.receipt-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(0, 245, 255, 0.15);
}

.receipt-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  color: rgba(232, 234, 255, 0.5);
}

.receipt-status {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: var(--cyan);
  border: 1px solid rgba(0, 245, 255, 0.4);
  padding: 0.2rem 0.5rem;
  border-radius: 2px;
  animation: pulse-status 2s ease-in-out infinite;
}

@keyframes pulse-status {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.receipt-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  font-family: 'Space Mono', monospace;
  font-size: clamp(0.75rem, 1.2vw, 0.8rem);
  color: rgba(232, 234, 255, 0.7);
}
.receipt-row .val { color: var(--text); }
.receipt-row .val.fee { color: rgba(168, 85, 247, 0.9); }
.receipt-row.total { font-weight: 700; color: var(--white); padding-top: 0.75rem; }
.receipt-row.total .val { color: var(--cyan); text-shadow: 0 0 8px rgba(0, 245, 255, 0.5); }

.receipt-divider {
  height: 1px;
  background: rgba(0, 245, 255, 0.15);
  margin: 0.25rem 0;
}

.receipt-footer {
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(0, 245, 255, 0.1);
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: rgba(232, 234, 255, 0.35);
  text-align: center;
}

/* ── Stats bar ───────────────────────────────────────────────── */
.stats-bar {
  padding: clamp(2rem, 5vw, 3rem) 0;
  border-top: 1px solid rgba(0, 245, 255, 0.08);
  border-bottom: 1px solid rgba(0, 245, 255, 0.08);
  background: rgba(0, 245, 255, 0.02);
}

.stats-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 2rem);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(1rem, 3vw, 2rem);
}

/* Style CounterStat children inside stats bar */
.stats-inner :deep(.counter-stat) {
  align-items: center;
  padding: clamp(1rem, 2.5vw, 1.5rem);
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 6px;
  box-shadow: var(--glow-cyan);
  text-align: center;
}

.stats-inner :deep(.stat-display) {
  font-family: 'Space Mono', monospace;
  font-size: clamp(1.2rem, 2.5vw, 1.75rem);
  font-weight: 700;
  color: var(--cyan);
  letter-spacing: -0.02em;
  text-shadow: 0 0 12px rgba(0, 245, 255, 0.5);
}

.stats-inner :deep(.stat-label) {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(0.75rem, 1.2vw, 0.85rem);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(232, 234, 255, 0.55);
  opacity: 1;
}

/* ── Payment flow section ────────────────────────────────────── */
.payment-flow-section {
  padding: clamp(4rem, 8vw, 6rem) 0;
  border-top: 1px solid rgba(0, 245, 255, 0.08);
}

.payment-flow-card {
  max-width: 700px;
  margin: 0 auto;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 10px;
  padding: clamp(1.5rem, 4vw, 2.5rem);
  box-shadow: var(--glow-cyan);
}

.payment-flow-caption {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: rgba(232, 234, 255, 0.4);
  text-align: center;
  margin: 1rem 0 0;
}

/* ── Transaction lifecycle ───────────────────────────────────── */
.lifecycle-section {
  padding: clamp(4rem, 8vw, 7rem) 0;
  background: rgba(0, 245, 255, 0.01);
}

.lifecycle-desc {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(1rem, 1.8vw, 1.15rem);
  color: rgba(232, 234, 255, 0.6);
  text-align: center;
  margin: -2rem 0 2.5rem;
  max-width: 60ch;
  margin-left: auto;
  margin-right: auto;
}

.lifecycle-terminal {
  max-width: 800px;
  margin: 0 auto;
  background: var(--card-bg-solid);
  border: 1px solid rgba(0, 245, 255, 0.15);
  border-radius: 8px;
  overflow: hidden;
}

.lifecycle-step {
  display: grid;
  grid-template-columns: 80px 1fr auto;
  align-items: start;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid rgba(0, 245, 255, 0.06);
  transition: background 0.3s, border-left-color 0.3s;
  border-left: 3px solid transparent;
}
.lifecycle-step:last-child { border-bottom: none; }

.step-done {
  border-left-color: rgba(0, 245, 255, 0.2);
  background: rgba(0, 245, 255, 0.02);
}
.step-active {
  border-left-color: var(--cyan);
  background: rgba(0, 245, 255, 0.05);
}
.step-pending {
  opacity: 0.4;
}

.step-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.step-num {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: rgba(0, 245, 255, 0.4);
  letter-spacing: 0.1em;
}

.step-dot {
  font-family: 'Space Mono', monospace;
  font-size: 0.9rem;
  color: var(--cyan);
  min-width: 1rem;
  text-align: center;
}

.pulse-dot {
  display: inline-block;
  animation: pulse-dot 1s ease-in-out infinite;
  color: var(--cyan);
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.8); }
}

.step-middle {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.step-id {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--cyan);
  letter-spacing: 0.1em;
}

.step-desc {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.9rem;
  color: rgba(232, 234, 255, 0.7);
  line-height: 1.4;
}

.step-status {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: rgba(0, 245, 255, 0.5);
}

.active-status {
  color: var(--cyan);
}

.dim-status {
  color: rgba(232, 234, 255, 0.25);
}

.blink-dots {
  animation: blink 1.2s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.step-right {
  display: flex;
  align-items: flex-start;
  padding-top: 0.15rem;
}

.step-badge {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: var(--purple);
  background: rgba(168, 85, 247, 0.1);
  border: 1px solid rgba(168, 85, 247, 0.2);
  border-radius: 3px;
  padding: 0.2rem 0.5rem;
  white-space: nowrap;
}

/* ── Problem section ─────────────────────────────────────────── */
.problem-section {
  padding: clamp(4rem, 8vw, 7rem) 0;
}

.problem-card {
  max-width: 800px;
  margin: 0 auto clamp(2.5rem, 5vw, 4rem);
  padding: clamp(2rem, 5vw, 3.5rem);
  background: var(--card-bg);
  border: 1px solid rgba(168, 85, 247, 0.2);
  border-radius: 8px;
  box-shadow: var(--glow-purple);
  text-align: center;
}

.problem-eyebrow {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.25em;
  color: var(--purple);
  margin: 0 0 1.25rem;
}

.problem-quote {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  font-weight: 600;
  font-style: normal;
  line-height: 1.35;
  color: var(--white);
  margin: 0 0 1.5rem;
  border-left: 3px solid var(--purple);
  padding-left: 1.25rem;
  text-align: left;
}

.problem-body {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(0.95rem, 1.5vw, 1.1rem);
  line-height: 1.65;
  color: rgba(232, 234, 255, 0.65);
  margin: 0;
  text-align: left;
}

/* Before / After comparison */
.compare-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  max-width: 900px;
  margin: 0 auto;
  border: 1px solid rgba(0, 245, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.compare-header {
  padding: 0.75rem 1.25rem;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  font-weight: 700;
  text-align: center;
}

.compare-before {
  background: rgba(255, 60, 60, 0.05);
  border-top: 3px solid rgba(255, 80, 80, 0.4);
  color: rgba(255, 100, 100, 0.8);
  border-right: 1px solid rgba(0, 245, 255, 0.08);
}

.compare-after {
  background: rgba(0, 245, 255, 0.03);
  border-top: 3px solid rgba(0, 245, 255, 0.5);
  color: var(--cyan);
}

.compare-row {
  display: contents;
}

.compare-cell {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem 1.25rem;
  border-top: 1px solid rgba(0, 245, 255, 0.06);
}

.compare-cell.before {
  background: rgba(255, 60, 60, 0.03);
  border-right: 1px solid rgba(0, 245, 255, 0.08);
}

.compare-cell.after {
  background: rgba(0, 245, 255, 0.02);
}

.compare-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: rgba(232, 234, 255, 0.4);
  text-transform: uppercase;
}

.compare-text {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  line-height: 1.45;
}

.compare-cell.before .compare-text { color: rgba(255, 130, 130, 0.75); }
.compare-cell.after .compare-text { color: rgba(232, 234, 255, 0.85); }

/* ── Feature hex grid ────────────────────────────────────────── */
.features-section {
  padding: clamp(4rem, 8vw, 7rem) 0;
  background: rgba(168, 85, 247, 0.02);
}

.hex-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(1rem, 2vw, 1.5rem);
}

/* Offset every other row for honeycomb feel */
.hex-cell:nth-child(4),
.hex-cell:nth-child(5),
.hex-cell:nth-child(6) {
  margin-top: 0;
}

/* Row 2 cells offset by half a cell */
@media (min-width: 700px) {
  .hex-grid {
    grid-template-columns: repeat(3, 1fr);
    column-gap: clamp(1rem, 2vw, 1.5rem);
  }

  .hex-cell:nth-child(4) { margin-left: 0; }
}

.hex-cell {
  background: var(--card-bg-solid);
  border: 1px solid rgba(0, 245, 255, 0.12);
  border-radius: 8px;
  padding: clamp(1.25rem, 3vw, 2rem);
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.2s;
}
.hex-cell:hover {
  border-color: rgba(0, 245, 255, 0.4);
  box-shadow: var(--glow-cyan);
  transform: translateY(-4px);
}

.hex-icon {
  font-family: 'Space Mono', monospace;
  font-size: 1.4rem;
  color: var(--cyan);
  text-shadow: 0 0 10px rgba(0, 245, 255, 0.5);
  line-height: 1;
}

.hex-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(0.95rem, 1.5vw, 1.1rem);
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--white);
  margin: 0;
}

.hex-note {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(0.8rem, 1.2vw, 0.9rem);
  line-height: 1.5;
  color: rgba(232, 234, 255, 0.5);
  margin: 0;
}

/* ── KYC section ─────────────────────────────────────────────── */
.kyc-section {
  padding: clamp(4rem, 8vw, 7rem) 0;
}

.kyc-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2rem, 5vw, 5rem);
  align-items: center;
}

/* KYC terminal card */
.kyc-card {
  background: var(--card-bg-solid);
  border: 1px solid rgba(0, 245, 255, 0.15);
  border-radius: 8px;
  padding: clamp(1.25rem, 3vw, 2rem);
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.kyc-row {
  display: flex;
  gap: 0.75rem;
  align-items: baseline;
  flex-wrap: wrap;
}

.kyc-meta {
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(0, 245, 255, 0.1);
  margin-bottom: 0.25rem;
}

.kyc-key {
  font-size: 0.75rem;
  color: rgba(232, 234, 255, 0.35);
  letter-spacing: 0.08em;
  white-space: nowrap;
}

.kyc-val {
  font-size: 0.8rem;
  color: rgba(232, 234, 255, 0.8);
}

.kyc-checking { color: var(--cyan); }
.kyc-approved { color: var(--cyan); text-shadow: 0 0 8px rgba(0, 245, 255, 0.5); }
.kyc-dim { color: rgba(232, 234, 255, 0.4); }

.kyc-bar-row {
  display: grid;
  grid-template-columns: 110px 1fr 40px;
  align-items: center;
  gap: 0.5rem;
}

.kyc-bar-wrap {
  background: rgba(0, 245, 255, 0.08);
  border-radius: 2px;
  height: 6px;
  overflow: hidden;
}

.kyc-bar {
  height: 100%;
  background: var(--cyan);
  box-shadow: 0 0 6px rgba(0, 245, 255, 0.5);
  border-radius: 2px;
  transition: width 1.2s cubic-bezier(0.25, 1, 0.5, 1);
}

.kyc-pct {
  font-size: 0.75rem;
  color: var(--cyan);
  text-align: right;
}

.kyc-result {
  margin-top: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(0, 245, 255, 0.1);
}

/* KYC right */
.kyc-right {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.kyc-heading {
  text-align: left;
  margin-bottom: 1.5rem;
}

.kyc-bullets {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.kyc-bullet {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(0.95rem, 1.5vw, 1.05rem);
  line-height: 1.5;
  color: rgba(232, 234, 255, 0.7);
  padding-left: 1.25rem;
  border-left: 2px solid rgba(0, 245, 255, 0.35);
  transition: border-left-color 0.2s;
}
.kyc-bullet:hover {
  border-left-color: var(--cyan);
  color: rgba(232, 234, 255, 0.95);
}

/* ── Revenue section ─────────────────────────────────────────── */
.revenue-section {
  padding: clamp(4rem, 8vw, 7rem) 0;
  background: rgba(0, 245, 255, 0.01);
}

.revenue-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2rem, 4vw, 4rem);
  align-items: start;
}

.revenue-card {
  background: var(--card-bg-solid);
  border: 1px solid rgba(0, 245, 255, 0.15);
  border-radius: 8px;
  padding: clamp(1.25rem, 3vw, 2rem);
  font-family: 'Space Mono', monospace;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.rev-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.rev-key {
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: rgba(232, 234, 255, 0.4);
  white-space: nowrap;
}

.rev-val {
  font-size: 0.9rem;
  color: rgba(232, 234, 255, 0.85);
  text-align: right;
}

.cyan-val {
  color: var(--cyan);
  text-shadow: 0 0 8px rgba(0, 245, 255, 0.4);
  font-size: 1.1rem;
}

.rev-dim { opacity: 0.55; }

.rev-divider {
  height: 1px;
  background: rgba(0, 245, 255, 0.1);
  margin: 0.25rem 0;
}

/* Embed code block */
.embed-block {
  background: var(--card-bg-solid);
  border: 1px solid rgba(168, 85, 247, 0.2);
  border-radius: 8px;
  overflow: hidden;
}

.embed-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 1rem;
  background: rgba(168, 85, 247, 0.08);
  border-bottom: 1px solid rgba(168, 85, 247, 0.15);
}

.embed-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: rgba(232, 234, 255, 0.4);
  letter-spacing: 0.08em;
}

.embed-tag {
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  color: var(--purple);
  border: 1px solid rgba(168, 85, 247, 0.3);
  padding: 0.15rem 0.4rem;
  border-radius: 2px;
}

.embed-code {
  margin: 0;
  padding: clamp(1rem, 2.5vw, 1.5rem);
  font-family: 'Space Mono', monospace;
  font-size: clamp(0.75rem, 1.1vw, 0.82rem);
  line-height: 1.7;
  overflow-x: auto;
}

.code-tag { color: var(--cyan); }
.code-attr { color: rgba(168, 85, 247, 0.9); }
.code-str { color: rgba(232, 234, 255, 0.65); }

.embed-note {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.9rem;
  color: rgba(232, 234, 255, 0.4);
  text-align: center;
  padding: 0.75rem 1rem;
  border-top: 1px solid rgba(168, 85, 247, 0.1);
  margin: 0;
  letter-spacing: 0.04em;
}

/* ── Testimonials ────────────────────────────────────────────── */
.testimonials {
  background: #050510;
  padding: clamp(4rem, 8vw, 6rem) 0;
}

.testimonials-row {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 0.5rem;
}

.t-card {
  border: 1px solid rgba(0,245,255,0.2);
  background: rgba(0,245,255,0.03);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  min-width: clamp(260px, 30vw, 360px);
  flex: 1;
  scroll-snap-align: start;
}

.t-quote {
  font-family: 'Space Mono', monospace;
  font-size: 0.875rem;
  color: rgba(0,245,255,0.8);
  font-style: italic;
  line-height: 1.7;
  margin: 0;
  flex: 1;
}

.t-author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.t-avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: rgba(0,245,255,0.15);
  border: 1px solid rgba(0,245,255,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: #00f5ff;
  flex-shrink: 0;
}

.t-name {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: rgba(0,245,255,0.6);
  line-height: 1.4;
}

/* ── Trust wrapper ───────────────────────────────────────────── */
.crypto-trust-wrapper :deep(.trust-strip) {
  background: rgba(0, 245, 255, 0.03);
  border-top: 1px solid rgba(0, 245, 255, 0.1);
  border-bottom: 1px solid rgba(0, 245, 255, 0.1);
}
.crypto-trust-wrapper :deep(.trust-label) {
  color: rgba(0, 245, 255, 0.5);
}
.crypto-trust-wrapper :deep(.trust-logo-text) {
  color: rgba(0, 245, 255, 0.4);
}

/* ── Live Network section ────────────────────────────────────── */
.live-network-section {
  padding: clamp(4rem, 8vw, 6rem) 0;
  border-top: 1px solid rgba(0, 245, 255, 0.08);
  background: rgba(0, 245, 255, 0.01);
}

.network-terminal {
  max-width: 900px;
  margin: 0 auto;
  background: #050510;
  border: 1px solid rgba(0, 245, 255, 0.2);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 40px rgba(0, 245, 255, 0.08);
}

.terminal-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: rgba(0, 245, 255, 0.04);
  border-bottom: 1px solid rgba(0, 245, 255, 0.1);
}

.term-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
.term-dot--red    { background: #ff5f57; }
.term-dot--yellow { background: #ffbd2e; }
.term-dot--green  { background: #28c840; }

.term-title {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: rgba(232, 234, 255, 0.4);
  letter-spacing: 0.06em;
  margin-left: 0.5rem;
}

.terminal-body {
  height: 260px;
  overflow: hidden;
  position: relative;
}

/* Fade masks */
.terminal-body::before,
.terminal-body::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 40px;
  z-index: 2;
  pointer-events: none;
}
.terminal-body::before {
  top: 0;
  background: linear-gradient(to bottom, #050510, transparent);
}
.terminal-body::after {
  bottom: 0;
  background: linear-gradient(to top, #050510, transparent);
}

.terminal-feed {
  display: flex;
  flex-direction: column;
  animation: feed-scroll 18s linear infinite;
  will-change: transform;
}

@keyframes feed-scroll {
  0%   { transform: translateY(0); }
  100% { transform: translateY(-50%); }
}

.terminal-feed:hover { animation-play-state: paused; }

.feed-line {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  padding: 0.5rem 1.25rem;
  border-bottom: 1px solid rgba(0, 245, 255, 0.04);
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  flex-wrap: wrap;
}

.feed-ts {
  color: rgba(232, 234, 255, 0.3);
  white-space: nowrap;
  flex-shrink: 0;
}

.feed-tag {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 0.1rem 0.4rem;
  border-radius: 2px;
  white-space: nowrap;
  flex-shrink: 0;
}
.feed-tag--ok   { background: rgba(0, 245, 255, 0.12); color: var(--cyan); }
.feed-tag--kyc  { background: rgba(168, 85, 247, 0.15); color: var(--purple); }
.feed-tag--risk { background: rgba(251, 191, 36, 0.12); color: #fbbf24; }

.feed-msg {
  color: rgba(232, 234, 255, 0.65);
  line-height: 1.4;
}

.terminal-footer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.25rem;
  border-top: 1px solid rgba(0, 245, 255, 0.1);
  background: rgba(0, 245, 255, 0.02);
}

.feed-live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--cyan);
  box-shadow: 0 0 6px rgba(0, 245, 255, 0.8);
  animation: status-pulse 2s ease-in-out infinite;
  flex-shrink: 0;
}

.terminal-footer-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  color: rgba(232, 234, 255, 0.3);
}

/* ── CTA section ─────────────────────────────────────────────── */
.cta-section {
  padding: clamp(5rem, 10vw, 8rem) 0;
  border-top: 1px solid rgba(0, 245, 255, 0.08);
}

.cta-inner {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(1rem, 2.5vw, 1.5rem);
}

.cta-heading {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  letter-spacing: 0.05em;
  color: var(--white);
  margin: 0;
  text-shadow: 0 0 40px rgba(0, 245, 255, 0.2);
}

.cta-sub {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  line-height: 1.6;
  color: rgba(232, 234, 255, 0.6);
  max-width: 50ch;
  margin: 0;
}

.cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-top: 0.5rem;
}

.cta-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 0.25rem;
}

.badge-pill {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: rgba(232, 234, 255, 0.4);
  border: 1px solid rgba(232, 234, 255, 0.1);
  border-radius: 100px;
  padding: 0.3rem 0.75rem;
}

/* ── Live price chips ────────────────────────────────────────── */
.live-price-chips {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 0.75rem;
}
.live-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(0, 245, 255, 0.06);
  border: 1px solid rgba(0, 245, 255, 0.2);
  border-radius: 3px;
  padding: 0.25rem 0.625rem;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
}
.chip-sym {
  font-weight: 700;
  color: var(--cyan);
  letter-spacing: 0.06em;
}
.chip-val {
  color: rgba(232, 234, 255, 0.8);
}

/* ── Coin cluster ────────────────────────────────────────────── */
.receipt-card-wrap { position: relative; display: flex; justify-content: center; }
.coin-cluster {
  position: absolute;
  right: -60px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 3;
}
.coin {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 900;
  color: #050510;
  animation: coin-float 3s ease-in-out var(--delay, 0s) infinite;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  user-select: none;
  will-change: transform;
}
.coin-btc { background: linear-gradient(135deg, #f59e0b, #fbbf24); }
.coin-eth { background: linear-gradient(135deg, #a78bfa, #7c3aed); }
.coin-sol { background: linear-gradient(135deg, #34d399, #14b8a6); }
@keyframes coin-float {
  0%, 100% { transform: translateY(0) rotate(-3deg); }
  50% { transform: translateY(-12px) rotate(3deg); }
}

/* ── System status ───────────────────────────────────────────── */
.system-status-section {
  padding: clamp(2rem, 4vw, 3rem) 0;
  border-top: 1px solid rgba(0, 245, 255, 0.08);
  border-bottom: 1px solid rgba(0, 245, 255, 0.08);
  background: rgba(0, 245, 255, 0.01);
}
.status-panels {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(0.75rem, 2vw, 1.25rem);
  margin-top: 1.5rem;
}
.status-panel {
  background: #0a0a1a;
  border: 1px solid rgba(0, 245, 255, 0.12);
  border-radius: 6px;
  padding: clamp(1rem, 2.5vw, 1.5rem);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.status-dot-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.status-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--cyan);
  box-shadow: 0 0 6px rgba(0, 245, 255, 0.6);
  animation: status-pulse 2s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes status-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
.status-id {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--cyan);
  letter-spacing: 0.08em;
}
.status-state {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--white);
}
.status-metric {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: rgba(232, 234, 255, 0.45);
  letter-spacing: 0.04em;
}

/* ── Responsive ──────────────────────────────────────────────── */
@media (max-width: 600px) {
  canvas { display: none; }
}

@media (max-width: 1024px) {
  .kyc-inner {
    grid-template-columns: 1fr;
  }
  .kyc-heading {
    text-align: center;
  }
  .kyc-right .section-eyebrow {
    text-align: center;
  }
  .revenue-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .status-panels { grid-template-columns: repeat(2, 1fr); }
  .coin-cluster { display: none; }
  .hero-inner {
    grid-template-columns: 1fr;
  }
  .receipt-wrap {
    display: none;
  }
  .stats-inner {
    grid-template-columns: repeat(2, 1fr);
  }
  .compare-grid {
    grid-template-columns: 1fr;
  }
  .compare-header.compare-before {
    border-right: none;
    border-bottom: 1px solid rgba(0, 245, 255, 0.08);
  }
  .compare-row {
    display: flex;
    flex-direction: column;
  }
  .compare-cell.before {
    border-right: none;
    border-bottom: 1px solid rgba(0, 245, 255, 0.06);
  }
  .hex-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .lifecycle-step {
    grid-template-columns: 60px 1fr;
  }
  .step-right {
    display: none;
  }
}

@media (max-width: 480px) {
  .status-panels { grid-template-columns: 1fr 1fr; }
  .stats-inner {
    grid-template-columns: 1fr 1fr;
  }
  .hero-actions {
    flex-direction: column;
  }
  .hex-grid {
    grid-template-columns: 1fr;
  }
  .lifecycle-step {
    grid-template-columns: 50px 1fr;
  }
  .cta-actions {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 375px) {
  .stats-inner {
    grid-template-columns: 1fr;
  }
  .status-panels { grid-template-columns: 1fr; }
  .section-inner { padding: 0 1rem; }
}

@media (prefers-reduced-motion: reduce) {
  .coin,
  .status-dot,
  .blink-dots,
  .iris-text,
  .iris-stripe,
  .ticker-inner,
  .terminal-feed,
  .feed-live-dot {
    animation: none !important;
    will-change: auto;
  }
  .receipt-card {
    animation: none !important;
    transform: none !important;
  }
}

/* ── Widget Preview Section ── */
.widget-preview-section {
  padding: 5rem 0;
  border-top: 1px solid rgba(0, 245, 255, 0.08);
  border-bottom: 1px solid rgba(0, 245, 255, 0.08);
  background: rgba(0, 245, 255, 0.01);
}
.widget-preview-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 2rem);
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 4rem;
  align-items: center;
}
.widget-preview-text h2 { margin-bottom: 1rem; text-align: left; }
.widget-preview-sub {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  line-height: 1.55;
  color: rgba(232, 234, 255, 0.75);
  margin: 0;
  max-width: 42ch;
}
@media (max-width: 768px) {
  .widget-preview-inner { grid-template-columns: 1fr; }
}

/* ── Crypto Partners Say ── */
.crypto-partners-say {
  padding: clamp(4rem, 8vw, 6rem) 0;
  border-top: 1px solid rgba(0, 245, 255, 0.08);
  border-bottom: 1px solid rgba(0, 245, 255, 0.08);
}
.crypto-partners-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(1rem, 2vw, 1.5rem);
  margin-top: 2rem;
}
.crypto-partner-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(0, 255, 178, 0.15);
  border-radius: 8px;
  padding: 1.75rem 1.5rem 1.5rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.crypto-partner-quote {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  line-height: 1.65;
  color: rgba(0, 245, 255, 0.8);
  margin: 0;
  flex: 1;
}
.crypto-partner-attr {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}
.crypto-partner-role {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  color: rgba(232, 234, 255, 0.85);
  letter-spacing: 0.04em;
}
.crypto-partner-company {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: rgba(232, 234, 255, 0.4);
}
.crypto-partner-badge {
  display: inline-block;
  align-self: flex-start;
  background: rgba(0, 255, 178, 0.15);
  border: 1px solid rgba(0, 255, 178, 0.3);
  color: #00ffb2;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.625rem;
  border-radius: 99px;
  letter-spacing: 0.04em;
}
@media (max-width: 768px) {
  .crypto-partners-grid { grid-template-columns: 1fr; }
}

/* ── Feature Marquee Strip ── */
.marquee-wrap {
  overflow: hidden;
  border-top: 1px solid rgba(0, 255, 178, 0.15);
  border-bottom: 1px solid rgba(0, 255, 178, 0.15);
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
  border: 1px solid rgba(0, 255, 178, 0.25);
  background: rgba(0, 255, 178, 0.08);
  color: #00ffb2;
  font-family: 'Space Mono', monospace;
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
  border: 1px solid rgba(0, 255, 178, 0.18);
  border-radius: 8px;
  background: rgba(0, 255, 178, 0.04);
}
.activity-header { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; }
.activity-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: #00ffb2;
  animation: act-pulse 1.5s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes act-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.8)} }
.activity-label { font-family: 'Space Mono', monospace; font-size: 0.75rem; font-weight: 600; color: #00ffb2; text-transform: uppercase; letter-spacing: 0.06em; }
.activity-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem; position: relative; min-height: 6rem; }
.activity-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.8125rem; }
.activity-flag { font-size: 1rem; flex-shrink: 0; }
.activity-text { color: var(--text); flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-family: 'Space Mono', monospace; }
.activity-time { font-size: 0.6875rem; color: rgba(232,234,255,0.4); white-space: nowrap; flex-shrink: 0; font-family: 'Space Mono', monospace; }
.activity-disclaimer { font-size: 0.6875rem; color: rgba(232,234,255,0.35); margin-top: 0.5rem; font-style: italic; }
.activity-slide-enter-active { transition: all 0.4s ease; }
.activity-slide-enter-from { opacity: 0; transform: translateY(-8px); }
.activity-slide-leave-active { transition: all 0.3s ease; position: absolute; }
.activity-slide-leave-to { opacity: 0; transform: translateY(8px); }
</style>
