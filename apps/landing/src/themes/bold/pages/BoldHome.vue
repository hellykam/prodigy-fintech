<template>
  <main>

    <!-- ── LiveActivityToast (fixed-position, self-contained) ─────── -->
    <LiveActivityToast />

    <!-- ── Section 1: Hero ─────────────────────────────────────────── -->
    <section class="hero" aria-labelledby="bold-hero-headline">
      <BoldPolyhedron />
      <div class="hero-split">

        <!-- Left: Black with blob -->
        <div class="hero-left" aria-hidden="false">
          <span class="deco-mark deco-mark--tl" aria-hidden="true">◈</span>
          <span class="plus-mark plus-1" aria-hidden="true">+</span>
          <span class="plus-mark plus-2" aria-hidden="true">+</span>
          <span class="plus-mark plus-3" aria-hidden="true">+</span>
          <div class="blob" aria-hidden="true" />
        </div>

        <!-- Right: Grid paper with headline -->
        <div class="hero-right" ref="heroSection">
          <div class="iris-bar" aria-hidden="true" />
          <div class="hero-content">
            <h1 id="bold-hero-headline" class="hero-headline" ref="heroTitle">
              <span class="hl">MONEY</span>
              <span class="hl">MOVES.</span>
              <span class="hl">YOURS</span>
              <span class="hl">TOO.</span>
            </h1>
            <p class="hero-sub" ref="heroSub">
              Embed transparent crypto in an afternoon. Fees stated before anyone presses anything.
            </p>
            <a
              href="http://localhost:5001"
              target="_blank"
              rel="noopener noreferrer"
              class="hero-cta"
            >
              GET STARTED
            </a>
            <div class="price-strip" aria-label="Live crypto prices (simulated)">
              <span
                v-for="p in prices"
                :key="p.sym"
                class="price-chip"
                :class="p.dir === 'up' ? 'chip-up' : 'chip-down'"
              >
                <span class="chip-sym">{{ p.sym }}</span>
                <span class="chip-val">{{ p.val }}</span>
                <span aria-hidden="true">{{ p.dir === 'up' ? '▲' : '▼' }}</span>
              </span>
            </div>
          </div>
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

    <!-- ── CounterStat Row ─────────────────────────────────────────── -->
    <section class="counter-stats-section" aria-labelledby="counter-stats-label">
      <h2 id="counter-stats-label" class="sr-only">Platform statistics</h2>
      <div class="counter-stats-inner">
        <CounterStat :value="2" prefix="$" suffix="B+" label="VOLUME PROCESSED" />
        <CounterStat :value="47" suffix="MS" label="AVG SETTLEMENT" />
        <CounterStat :value="0" suffix="%" label="PLATFORM FEE" />
        <CounterStat :value="200" suffix="+" label="FINTECHS USING PRODIGY" />
      </div>
    </section>

    <!-- ── Section 2: Problem Statement ───────────────────────────── -->
    <section class="problem" aria-labelledby="problem-headline">
      <div class="section-inner">
        <div class="problem-grid">
          <div class="problem-number" aria-hidden="true">01</div>
          <div class="problem-content">
            <h2 id="problem-headline" class="problem-headline">
              CRYPTO WIDGETS THAT EXPLAIN THEMSELVES WITH THE CONFIDENCE OF A VENDING MACHINE THAT RECENTLY BECAME A BANK.
            </h2>
            <p class="problem-body">
              Most crypto widgets arrive with hidden fees formatted like legal documents, KYC flows that black-box everything, and partner dashboards that tell you activity but never revenue. The widget does something. Finance gets a CSV. Compliance asks questions. Nobody wins.
            </p>
            <div class="receipt-illustration" aria-label="Illustration of a confusing receipt" role="img">
              <svg
                class="receipt-svg"
                viewBox="0 0 200 160"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <!-- Receipt body -->
                <rect x="30" y="10" width="140" height="110" stroke="#0a0a0a" stroke-width="1.5" fill="none"/>
                <!-- Zigzag bottom -->
                <polyline points="30,120 40,130 50,120 60,130 70,120 80,130 90,120 100,130 110,120 120,130 130,120 140,130 150,120 160,130 170,120" stroke="#0a0a0a" stroke-width="1.5" fill="none"/>
                <!-- Receipt lines -->
                <line x1="44" y1="32" x2="156" y2="32" stroke="#0a0a0a" stroke-width="1" stroke-dasharray="3,3"/>
                <line x1="44" y1="52" x2="156" y2="52" stroke="#0a0a0a" stroke-width="1" stroke-dasharray="3,3"/>
                <line x1="44" y1="72" x2="156" y2="72" stroke="#0a0a0a" stroke-width="1" stroke-dasharray="3,3"/>
                <line x1="44" y1="92" x2="156" y2="92" stroke="#0a0a0a" stroke-width="1" stroke-dasharray="3,3"/>
                <!-- Question mark -->
                <text x="88" y="65" font-family="Space Grotesk, sans-serif" font-size="28" font-weight="700" fill="#0a0a0a" opacity="0.15">?</text>
                <!-- TOTAL label -->
                <text x="44" y="78" font-family="Space Grotesk, sans-serif" font-size="8" fill="#0a0a0a" opacity="0.5">TOTAL FEE</text>
                <text x="120" y="78" font-family="Space Grotesk, sans-serif" font-size="8" fill="#0a0a0a" opacity="0.5">???</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Section 3: How It Works ─────────────────────────────────── -->
    <section class="how" aria-labelledby="how-headline">
      <div class="how-inner">
        <div class="how-header">
          <h2 id="how-headline" class="how-title" ref="feat1">HOW IT WORKS</h2>
        </div>
        <div class="how-cards">
          <div
            v-for="step in steps"
            :key="step.n"
            class="step-card"
          >
            <div class="step-iris-bar" aria-hidden="true" />
            <div class="step-number" aria-hidden="true">{{ step.n }}</div>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-detail">{{ step.detail }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Widget Preview ─────────────────────────────────────────── -->
    <section class="widget-preview-section" data-reveal="fade-up" aria-labelledby="bold-widget-preview-h">
      <div class="widget-preview-inner">
        <div class="widget-preview-text">
          <h2 id="bold-widget-preview-h" class="how-title">THE WIDGET.</h2>
          <p class="widget-preview-sub">See exactly what your users see. Three steps. No friction. No drop-off.</p>
        </div>
        <WidgetDemo theme="bold" />
      </div>
    </section>

    <!-- ── Section 3b: KYC Strip ─────────────────────────────────── -->
    <section class="kyc-strip" aria-labelledby="kyc-headline">
      <div class="kyc-inner">

        <!-- Left: quote -->
        <div class="kyc-left">
          <blockquote class="kyc-quote">
            "KYC THAT RUNS IN 47 SECONDS. SILENTLY. INSIDE YOUR WIDGET. EVERY CHECK LOGGED. 93.1% FIRST-TIME PASS RATE."
          </blockquote>
          <p class="kyc-attribution">— WHAT YOUR COMPLIANCE TEAM WANTS TO HEAR</p>
        </div>

        <!-- Right: terminal -->
        <div class="kyc-terminal" aria-label="KYC status terminal illustration" role="img">
          <div class="kyc-terminal-header">◈ KYC_STATUS.check</div>
          <div class="kyc-terminal-rule" aria-hidden="true">━━━━━━━━━━━━━━━━━━━━━━━━</div>
          <div class="kyc-terminal-row"><span class="kyc-key">USER_REF</span><span class="kyc-sep">:</span><span class="kyc-val">anon@partner.app</span></div>
          <div class="kyc-terminal-row">
            <span class="kyc-key">SCAN</span><span class="kyc-sep">:</span>
            <span class="kyc-bar-wrap" aria-hidden="true"><span class="kyc-bar kyc-bar--1" /></span>
            <span class="kyc-done">DONE</span>
          </div>
          <div class="kyc-terminal-row">
            <span class="kyc-key">MATCH</span><span class="kyc-sep">:</span>
            <span class="kyc-bar-wrap" aria-hidden="true"><span class="kyc-bar kyc-bar--2" /></span>
            <span class="kyc-done">DONE</span>
          </div>
          <div class="kyc-terminal-row"><span class="kyc-key">SANCTIONS</span><span class="kyc-sep">:</span><span class="kyc-done">CLEAR</span></div>
          <div class="kyc-terminal-row"><span class="kyc-key">RISK_SCORE</span><span class="kyc-sep">:</span><span class="kyc-val">12 / 100 <span class="kyc-low">(LOW)</span></span></div>
          <div class="kyc-terminal-rule" aria-hidden="true">━━━━━━━━━━━━━━━━━━━━━━━━</div>
          <div class="kyc-terminal-row"><span class="kyc-key">STATUS</span><span class="kyc-sep">:</span><span class="kyc-approved">✓ APPROVED</span></div>
          <div class="kyc-terminal-row"><span class="kyc-key">ELAPSED</span><span class="kyc-sep">:</span><span class="kyc-val">47 seconds</span></div>
        </div>

      </div>
    </section>

    <!-- ── Section 3c: Fee Calculator ──────────────────────────────── -->
    <section class="fee-calc" aria-labelledby="fee-calc-headline">
      <div class="fee-calc-inner">
        <h2 id="fee-calc-headline" class="fee-calc-title">CALCULATE YOUR FEE</h2>
        <div class="fee-calc-body">
          <div class="fee-inputs">
            <label class="fee-field">
              <span class="fee-field-label">TRANSACTION AMOUNT (€)</span>
              <input
                v-model.number="calcAmount"
                type="number"
                min="1"
                max="1000000"
                class="fee-input"
                aria-label="Transaction amount in euros"
              />
            </label>
            <label class="fee-field">
              <span class="fee-field-label">PARTNER SHARE ({{ calcPartnerShare.toFixed(2) }}%)</span>
              <input
                v-model.number="calcPartnerShare"
                type="range"
                min="0"
                max="1"
                step="0.01"
                class="fee-slider"
                aria-label="Partner share percentage"
              />
            </label>
          </div>
          <div class="fee-breakdown" aria-label="Fee breakdown">
            <div class="fee-row">
              <span class="fee-row-label">Platform fee (0.5%)</span>
              <span class="fee-row-val fee-row-val--muted">−€{{ calcPlatformFee.toFixed(2) }}</span>
            </div>
            <div class="fee-row">
              <span class="fee-row-label">Network fee (0.2%)</span>
              <span class="fee-row-val fee-row-val--muted">−€{{ calcNetworkFee.toFixed(2) }}</span>
            </div>
            <div class="fee-row fee-row--divider" aria-hidden="true" />
            <div class="fee-row">
              <span class="fee-row-label fee-row-label--earn">YOUR PLATFORM EARNS</span>
              <span class="fee-row-val fee-row-val--earn">+€{{ calcPartnerEarns.toFixed(2) }}</span>
            </div>
            <div class="fee-row">
              <span class="fee-row-label">User receives</span>
              <span class="fee-row-val">€{{ calcUserReceives.toFixed(2) }}</span>
            </div>
          </div>
        </div>
        <div class="fee-calc-cta">
          <a
            href="http://localhost:5001"
            target="_blank"
            rel="noopener noreferrer"
            class="fee-cta-btn"
          >
            OPEN THE DEMO →
          </a>
        </div>
      </div>
    </section>

    <!-- ── Section 4: Stats Grid ───────────────────────────────────── -->
    <section class="stats" aria-labelledby="stats-headline" ref="statSection">
      <h2 id="stats-headline" class="sr-only">Platform statistics</h2>
      <div class="stats-grid">
        <div v-for="s in stats" :key="s.num" class="stat-cell">
          <div class="stat-num" data-grad-sweep>{{ s.num }}</div>
          <div class="stat-lbl">{{ s.label }}</div>
        </div>
      </div>
    </section>

    <!-- ── Section 4b: Comparison ────────────────────────────────── -->
    <section class="compare" aria-labelledby="compare-headline">
      <div class="compare-inner">
        <div class="compare-header">
          <h2 id="compare-headline" class="compare-title" ref="feat2">WE BROUGHT THE PARTS THAT TAKE THREE MONTHS TO BUILD.</h2>
        </div>
        <div class="compare-cols">

          <!-- Without -->
          <div class="compare-col compare-col--without">
            <div class="compare-col-accent compare-col-accent--red" aria-hidden="true" />
            <h3 class="compare-col-head">WITHOUT</h3>
            <ul class="compare-list">
              <li class="compare-row"><span class="compare-item-label">KYC</span><span class="compare-item-val compare-val--bad">Outsourced</span></li>
              <li class="compare-row"><span class="compare-item-label">Fees</span><span class="compare-item-val compare-val--bad">Hidden</span></li>
              <li class="compare-row"><span class="compare-item-label">Partner split</span><span class="compare-item-val compare-val--bad">No</span></li>
              <li class="compare-row"><span class="compare-item-label">Reporting</span><span class="compare-item-val compare-val--bad">Month-end CSV</span></li>
              <li class="compare-row compare-row--footer"><span class="compare-item-label">Build time</span><span class="compare-item-val compare-val--bad">3 months</span></li>
            </ul>
          </div>

          <!-- Prodigy -->
          <div class="compare-col compare-col--prodigy">
            <div class="compare-col-accent compare-col-accent--iris" aria-hidden="true" />
            <h3 class="compare-col-head">PRODIGY</h3>
            <ul class="compare-list">
              <li class="compare-row"><span class="compare-item-label">KYC</span><span class="compare-item-val compare-val--good">Built-in</span></li>
              <li class="compare-row"><span class="compare-item-label">Fees</span><span class="compare-item-val compare-val--good">Pre-confirm</span></li>
              <li class="compare-row"><span class="compare-item-label">Partner split</span><span class="compare-item-val compare-val--good">Configured in admin</span></li>
              <li class="compare-row"><span class="compare-item-label">Reporting</span><span class="compare-item-val compare-val--good">Real-time portal</span></li>
              <li class="compare-row compare-row--footer"><span class="compare-item-label">Build time</span><span class="compare-item-val compare-val--good">1 afternoon</span></li>
            </ul>
          </div>

          <!-- Build yourself -->
          <div class="compare-col compare-col--diy">
            <div class="compare-col-accent compare-col-accent--amber" aria-hidden="true" />
            <h3 class="compare-col-head">BUILD YOURSELF</h3>
            <ul class="compare-list">
              <li class="compare-row"><span class="compare-item-label">KYC</span><span class="compare-item-val compare-val--warn">From scratch</span></li>
              <li class="compare-row"><span class="compare-item-label">Fees</span><span class="compare-item-val compare-val--warn">Custom</span></li>
              <li class="compare-row"><span class="compare-item-label">Partner split</span><span class="compare-item-val compare-val--warn">Maybe later</span></li>
              <li class="compare-row"><span class="compare-item-label">Reporting</span><span class="compare-item-val compare-val--warn">Dashboard: Q3 maybe</span></li>
              <li class="compare-row compare-row--footer"><span class="compare-item-label">Build time</span><span class="compare-item-val compare-val--warn">Ask your CTO</span></li>
            </ul>
          </div>

        </div>
      </div>
    </section>

    <!-- ── Alternating Feature Sections ─────────────────────────── -->
    <section class="alt-features" aria-labelledby="alt-features-headline">
      <div class="alt-features-inner">
        <h2 id="alt-features-headline" class="sr-only">Key features</h2>

        <!-- Feature 01: 60/40 left-heavy -->
        <div class="alt-feature alt-feature--ltr">
          <div class="alt-section-num" aria-hidden="true">01</div>
          <div class="alt-left">
            <p class="alt-eyebrow">FEE TRANSPARENCY</p>
            <h3 class="alt-title">EVERY FEE. BEFORE THEY PRESS ANYTHING.</h3>
            <p class="alt-body">Platform fee. Network fee. What arrives on the other end. All visible before the user touches confirm. Not in footnotes. Not in a post-transaction email. On the screen, in numbers, before the decision is made.</p>
            <a href="http://localhost:5001" target="_blank" rel="noopener noreferrer" class="alt-cta">See it live →</a>
          </div>
          <div class="alt-right">
            <div class="alt-receipt-mock" aria-label="Fee receipt illustration">
              <div class="arm-header">FEE RECEIPT</div>
              <div class="arm-row"><span>You send</span><span>€1,000.00</span></div>
              <div class="arm-row muted"><span>Platform fee (0.5%)</span><span>−€5.00</span></div>
              <div class="arm-row muted"><span>Network fee (0.2%)</span><span>−€2.00</span></div>
              <div class="arm-divider"></div>
              <div class="arm-row total"><span>They receive</span><span>€993.00</span></div>
              <div class="arm-note">◈ Shown before confirm. No surprises.</div>
            </div>
          </div>
        </div>

        <!-- Feature 02: 40/60 right-heavy -->
        <div class="alt-feature alt-feature--rtl">
          <div class="alt-section-num" aria-hidden="true">02</div>
          <div class="alt-left">
            <div class="alt-kyc-terminal" aria-label="KYC status illustration">
              <div class="akt-row"><span class="akt-key">STATUS</span><span class="akt-val akt-green">✓ APPROVED</span></div>
              <div class="akt-row"><span class="akt-key">ID SCAN</span><span class="akt-bar"><span class="akt-bar-fill"></span></span></div>
              <div class="akt-row"><span class="akt-key">FACE MATCH</span><span class="akt-bar"><span class="akt-bar-fill" style="transition-delay:0.3s"></span></span></div>
              <div class="akt-row"><span class="akt-key">SANCTIONS</span><span class="akt-val akt-green">CLEAR</span></div>
              <div class="akt-row"><span class="akt-key">ELAPSED</span><span class="akt-val">47 seconds</span></div>
            </div>
          </div>
          <div class="alt-right">
            <p class="alt-eyebrow">KYC ENGINE</p>
            <h3 class="alt-title">IDENTITY CHECK. INSIDE YOUR WIDGET. INVISIBLE TO YOUR USERS.</h3>
            <p class="alt-body">Your users never leave your platform. KYC runs inside the widget — document scan, face match, sanctions check — in 47 seconds on average. 93.1% first-time pass rate. Every check logged with timestamp.</p>
            <RouterLink to="/bold/security" class="alt-cta">Read the compliance docs →</RouterLink>
          </div>
        </div>

        <!-- Feature 03: 60/40 left-heavy -->
        <div class="alt-feature alt-feature--ltr">
          <div class="alt-section-num" aria-hidden="true">03</div>
          <div class="alt-left">
            <p class="alt-eyebrow">PARTNER REVENUE</p>
            <h3 class="alt-title">YOUR PLATFORM EARNS. EVERY TRANSACTION. NO SPREADSHEETS.</h3>
            <p class="alt-body">Configure your revenue share in admin. Prodigy posts your commission against every transaction — in real time, in a portal, with full audit trail. The thing your finance team has been asking about for six months already exists.</p>
            <RouterLink to="/bold/pricing" class="alt-cta">See revenue model →</RouterLink>
          </div>
          <div class="alt-right">
            <div class="alt-revenue-mock" aria-label="Revenue stats illustration">
              <div class="arm-header">PARTNER_REVENUE.live</div>
              <div class="arm-row"><span>Transactions today</span><span class="arm-green">248</span></div>
              <div class="arm-row"><span>Your earnings</span><span class="arm-green">+€124.80</span></div>
              <div class="arm-row muted"><span>Rate</span><span>0.2% per tx</span></div>
              <div class="arm-row muted"><span>Avg tx size</span><span>€504.84</span></div>
              <div class="arm-divider"></div>
              <div class="arm-row total"><span>STATUS</span><span class="arm-green">● LIVE</span></div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ── PaymentFlowSvg ──────────────────────────────────────────── -->
    <section class="flow-section" aria-labelledby="flow-headline">
      <div class="flow-inner">
        <p class="eyebrow eyebrow--light">THE ARCHITECTURE</p>
        <h2 id="flow-headline" class="flow-headline">EVERY TRANSACTION. EVERY STEP. AUDITABLE.</h2>
        <PaymentFlowSvg theme="dark" :speed="1.2" />
      </div>
    </section>

    <!-- ── TrustLogoStrip ──────────────────────────────────────────── -->
    <section class="trust-section" aria-labelledby="trust-headline">
      <div class="trust-inner">
        <p class="eyebrow">COMPLIANCE</p>
        <h2 id="trust-headline" class="trust-headline">AUDITED. CERTIFIED. TRUSTED.</h2>
        <TrustLogoStrip :marquee="true" />
      </div>
    </section>

    <!-- ── Testimonials ──────────────────────────────────────────────── -->
    <section class="testimonials" aria-label="Customer testimonials">
      <div class="testimonials-inner">
        <h2 class="testimonials-title">WHAT THEY SAID.</h2>
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

    <!-- ── Embed section ──────────────────────────────────────────────── -->
    <section class="embed-section" aria-label="Embed code">
      <div class="embed-inner">
        <div class="embed-grid">
          <div class="embed-left">
            <h2 class="embed-title">THREE LINES. THAT'S IT.</h2>
            <p class="embed-sub">
              Integrate in an afternoon. Not a sprint. One script tag, your brand, live today.
            </p>
            <RouterLink to="./developers" class="embed-link">Developer docs →</RouterLink>
          </div>
          <div class="embed-right">
            <CodeBlock :code="embedCode" language="html" />
          </div>
        </div>
      </div>
    </section>

    <!-- ── Social Proof / Partners ──────────────────────────────── -->
    <section class="bold-partners-say" aria-label="What partners say" data-reveal="fade-up">
      <div class="bold-partners-inner">
        <p class="eyebrow">Social proof · Simulated companies · Genuine results</p>
        <h2 class="bold-partners-heading">DON'T TAKE OUR WORD FOR IT.</h2>
        <div class="bold-partners-grid" ref="partnersGrid" data-animate-stagger>
          <figure class="bold-partner-card" v-for="t in partnerTestimonials" :key="t.badge">
            <blockquote class="bold-partner-quote">{{ t.quote }}</blockquote>
            <figcaption class="bold-partner-attr">
              <span class="bold-partner-role">{{ t.role }}</span>
              <span class="bold-partner-company">{{ t.company }}</span>
            </figcaption>
            <span class="bold-partner-badge">{{ t.badge }}</span>
          </figure>
        </div>
      </div>
    </section>

    <!-- ── Section 5: Dark CTA ─────────────────────────────────────── -->
    <section class="cta-dark" aria-labelledby="bold-cta-headline">
      <div class="cta-inner">
        <h2 id="bold-cta-headline" class="cta-headline">
          OPEN THE DEMO. SEE THE FULL FLOW.
        </h2>
        <div class="cta-actions">
          <a
            href="http://localhost:5001"
            target="_blank"
            rel="noopener noreferrer"
            class="cta-btn cta-btn--fill"
          >
            OPEN DEMO
          </a>
          <RouterLink to="/bold/product" class="cta-btn cta-btn--ghost">
            SEE PRODUCT
          </RouterLink>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import BoldPolyhedron from '@/components/three/BoldPolyhedron.vue'
import CounterStat from '../../../components/shared/CounterStat.vue'
import PaymentFlowSvg from '../../../components/shared/PaymentFlowSvg.vue'
import TrustLogoStrip from '../../../components/shared/TrustLogoStrip.vue'
import LiveActivityToast from '../../../components/shared/LiveActivityToast.vue'
import CodeBlock from '@/components/shared/CodeBlock.vue'
import { useClipReveal, useGradientSweep } from '@/composables/useSplitReveal'
import { useMagneticAll } from '@/composables/useMagneticButton'
import { useHoverScramble } from '@/composables/useTextScramble'
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
useCardTiltAll(partnersGrid, '.bold-partner-card', { maxTilt: 6, scale: 1.02, glowColor: '#2563eb', glowIntensity: 0.2 })

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

// ── Animation refs ─────────────────────────────────────────────
const heroTitle = ref<HTMLElement | null>(null)
const heroSub = ref<HTMLElement | null>(null)
const heroSection = ref<HTMLElement | null>(null)
const feat1 = ref<HTMLElement | null>(null)
const feat2 = ref<HTMLElement | null>(null)
const statSection = ref<HTMLElement | null>(null)

// Hero h1 has child spans — use clip reveal instead of split chars
useClipReveal(heroTitle, { direction: 'up', duration: 0.7 })
useClipReveal(heroSub, { direction: 'left', duration: 0.8, delay: 0.5 })
useMagneticAll(heroSection, 'a, button', { strength: 0.5, returnDuration: 400 })
useHoverScramble(feat1, 'tech')
useHoverScramble(feat2, 'tech')
useGradientSweep(statSection, { color: '#2563eb', duration: 1000 })

const embedCode = `<script src="https://widget.prodigy.demo/embed.js"><\/script>
<div
  id="prodigy-widget"
  data-b2b-client="acme_001"
></div>`

// KYC bar animation via IntersectionObserver
let kycObserver: IntersectionObserver | null = null
onMounted(() => {
  const kycEl = document.querySelector('.kyc-strip')
  if (kycEl) {
    kycObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('kyc-visible')
            kycObserver?.unobserve(e.target)
          }
        })
      },
      { threshold: 0.25 }
    )
    kycObserver.observe(kycEl)
  }
})

const steps = [
  { n: '01', title: 'EMBED', detail: 'One script tag, your brand, live today.' },
  { n: '02', title: 'FEES SHOWN', detail: 'Every amount visible before confirm, no surprises.' },
  { n: '03', title: 'TRACK IT', detail: 'Partner portal shows every transaction, every commission.' },
]

const stats = [
  { num: '€0.5%', label: 'Platform fee. Stated before confirm.' },
  { num: '99.97%', label: 'Uptime. Or we talk about it.' },
  { num: '<200ms', label: 'Quote latency. Or we also talk about it.' },
  { num: '1 script', label: 'Integration. Not 12 microservices.' },
]

interface Price { sym: string; val: string; dir: 'up' | 'down' }
const basePrices = [
  { sym: 'BTC', base: 58234 },
  { sym: 'ETH', base: 3102 },
  { sym: 'SOL', base: 147 },
  { sym: 'USDT', base: 0.92 },
]
const prices = ref<Price[]>(
  basePrices.map(p => ({ sym: p.sym, val: `€${p.base.toLocaleString('en')}`, dir: 'up' as const }))
)

// ── Fee calculator ─────────────────────────────────────────────
const calcAmount = ref(1000)
const calcPartnerShare = ref(0.2)
const calcPlatformFee = computed(() => calcAmount.value * 0.005)
const calcNetworkFee = computed(() => calcAmount.value * 0.002)
const calcPartnerEarns = computed(() => calcAmount.value * calcPartnerShare.value / 100)
const calcUserReceives = computed(() => calcAmount.value - calcPlatformFee.value - calcNetworkFee.value)

let priceTimer: ReturnType<typeof setInterval>
onMounted(() => {
  priceTimer = setInterval(() => {
    prices.value = basePrices.map((p, i) => {
      const prev = parseFloat(prices.value[i]!.val.replace(/[^0-9.]/g, ''))
      const next = +(p.base + (Math.random() - 0.48) * p.base * 0.003).toFixed(p.base < 10 ? 4 : 0)
      return {
        sym: p.sym,
        val: `€${next.toLocaleString('en')}`,
        dir: next >= prev ? 'up' : 'down',
      }
    })
  }, 2800)

  activityTimer = setInterval(() => {
    const next = allActivity[activityIdx.value % allActivity.length]!
    visibleActivity.value = [{ ...next, id: Date.now(), time: 'just now' }, ...visibleActivity.value.slice(0, 3)]
    activityIdx.value++
  }, 3500)
})
onUnmounted(() => {
  clearInterval(priceTimer)
  clearInterval(activityTimer)
  kycObserver?.disconnect()
})
</script>

<style scoped>
/* ── Custom properties ─────────────────────────────────────── */
.hero, .problem, .how, .stats, .cta-dark {
  --ink: #0a0a0a;
  --paper: #f5f5f0;
  --grid: rgba(0, 0, 0, 0.07);
}

/* ── Utilities ─────────────────────────────────────────────── */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* ── Grid paper ────────────────────────────────────────────── */
.grid-paper {
  background-color: var(--paper);
  background-image:
    linear-gradient(var(--grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: 24px 24px;
}

/* ── Section 1: Hero ───────────────────────────────────────── */
.hero {
  border-bottom: 3px solid var(--ink);
  position: relative;
  overflow: hidden;
}

.hero-split {
  display: grid;
  grid-template-columns: 40% 60%;
  min-height: calc(100vh - 3.5rem);
  position: relative;
  z-index: 1;
}

.hero-left {
  background: var(--ink);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.deco-mark {
  position: absolute;
  font-size: 1rem;
  opacity: 0.4;
  font-family: 'Space Grotesk', sans-serif;
  color: #f5f5f0;
}

.deco-mark--tl {
  top: 1.25rem;
  left: 1.25rem;
}

.plus-mark {
  position: absolute;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  opacity: 0.4;
  color: #f5f5f0;
}

.plus-1 { top: 2rem; right: 2.5rem; }
.plus-2 { bottom: 3rem; left: 2rem; }
.plus-3 { bottom: 6rem; right: 4rem; }

.blob {
  width: clamp(200px, 32vw, 340px);
  height: clamp(200px, 32vw, 340px);
  background: linear-gradient(
    135deg,
    #ff6bcb 0%,
    #a78bfa 25%,
    #38bdf8 50%,
    #34d399 75%,
    #fbbf24 100%
  );
  border-radius: 60% 40% 55% 45% / 50% 60% 40% 55%;
  animation: blob-morph 6s ease-in-out infinite;
  position: relative;
  z-index: 1;
}

@keyframes blob-morph {
  0%, 100% { border-radius: 60% 40% 55% 45% / 50% 60% 40% 55%; }
  25%       { border-radius: 45% 55% 40% 60% / 60% 40% 55% 45%; }
  50%       { border-radius: 55% 45% 60% 40% / 40% 55% 45% 60%; }
  75%       { border-radius: 40% 60% 45% 55% / 55% 45% 60% 40%; }
}

.hero-right {
  display: flex;
  flex-direction: column;
  background-color: var(--paper);
  background-image:
    linear-gradient(var(--grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: 24px 24px;
  position: relative;
  border-left: 3px solid var(--ink);
}

.iris-bar {
  height: 3px;
  width: 100%;
  background: linear-gradient(90deg, #ff6bcb, #a78bfa, #38bdf8, #34d399, #fbbf24, #ff6bcb);
  background-size: 200% auto;
  animation: iris-flow 5s linear infinite;
  flex-shrink: 0;
  will-change: background-position;
}

@keyframes iris-flow {
  0%   { background-position: 0% center; }
  100% { background-position: -200% center; }
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 3.5rem 3rem 3.5rem 2.5rem;
  justify-content: center;
  flex: 1;
}

.hero-headline {
  display: flex;
  flex-direction: column;
  margin: 0;
  gap: 0;
}

.hl {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(5rem, 12vw, 6rem);
  letter-spacing: 0.02em;
  line-height: 0.88;
  color: var(--ink);
  display: block;
}

@media (min-width: 900px) {
  .hl {
    font-size: 96px;
    font-weight: 900;
  }
}

.hero-sub {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(10, 10, 10, 0.7);
  max-width: 40ch;
  margin: 0;
}

.hero-cta {
  display: inline-block;
  align-self: flex-start;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.25rem;
  letter-spacing: 0.1em;
  color: #f5f5f0;
  background: var(--ink);
  text-decoration: none;
  padding: 0.75rem 2.5rem;
  border: 2px solid var(--ink);
  transition: background 0.15s, color 0.15s;
}

.hero-cta:hover {
  background: transparent;
  color: var(--ink);
}

.price-strip {
  display: flex;
  gap: 0.625rem;
  flex-wrap: wrap;
}

.price-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  padding: 0.25rem 0.625rem;
  border: 1px solid rgba(10, 10, 10, 0.2);
}

.chip-sym { font-weight: 700; color: var(--ink); }
.chip-up  { color: #166534; }
.chip-down { color: #991b1b; }

/* ── Section 2: Problem ────────────────────────────────────── */
.problem {
  background-color: var(--paper);
  background-image:
    linear-gradient(var(--grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: 24px 24px;
  border-bottom: 3px solid var(--ink);
}

.section-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 5rem 1.5rem;
}

.problem-grid {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 3rem;
  align-items: start;
}

.problem-number {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 6rem;
  color: var(--ink);
  opacity: 0.08;
  line-height: 1;
  letter-spacing: 0.02em;
  user-select: none;
}

.problem-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.problem-headline {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  letter-spacing: 0.02em;
  line-height: 0.9;
  color: var(--ink);
  margin: 0;
  max-width: 26ch;
}

.problem-body {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: rgba(10, 10, 10, 0.65);
  max-width: 52ch;
  margin: 0;
}

.receipt-illustration {
  display: flex;
  align-items: flex-start;
}

.receipt-svg {
  width: 160px;
  height: auto;
  opacity: 0.8;
}

/* ── Section 3: How It Works ───────────────────────────────── */
.how {
  background-color: var(--paper);
  background-image:
    linear-gradient(var(--grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: 24px 24px;
  border-bottom: 3px solid var(--ink);
  border-top: 3px solid var(--ink);
}

.how-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.how-header {
  border-bottom: 3px solid var(--ink);
  padding-bottom: 1.5rem;
}

.how-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(2rem, 4vw, 3.5rem);
  letter-spacing: 0.02em;
  line-height: 0.9;
  color: var(--ink);
  margin: 0;
}

.how-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border: 1px solid var(--ink);
}

.step-card {
  border-right: 1px solid var(--ink);
  padding: 2rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  position: relative;
  background-color: var(--paper);
  background-image:
    linear-gradient(var(--grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: 24px 24px;
}

.step-card:last-child {
  border-right: none;
}

.step-iris-bar {
  height: 3px;
  background: linear-gradient(90deg, #ff6bcb, #a78bfa, #38bdf8, #34d399, #fbbf24);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.step-number {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 4rem;
  color: var(--ink);
  opacity: 0.15;
  line-height: 1;
  letter-spacing: 0.02em;
  margin-top: 0.75rem;
  user-select: none;
}

.step-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2rem;
  letter-spacing: 0.02em;
  line-height: 0.9;
  color: var(--ink);
  margin: 0;
}

.step-detail {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.875rem;
  line-height: 1.6;
  color: rgba(10, 10, 10, 0.65);
  margin: 0;
}

/* ── Section 4: Stats Grid ─────────────────────────────────── */
.stats {
  background: var(--ink);
  border-bottom: 3px solid var(--ink);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  max-width: 1440px;
  margin: 0 auto;
}

.stat-cell {
  padding: 4rem 2rem;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.stat-cell:last-child {
  border-right: none;
}

.stat-num {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 4rem;
  letter-spacing: 0.02em;
  line-height: 0.9;
  color: #f5f5f0;
}

.stat-lbl {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  color: rgba(245, 245, 240, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.stat-label {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.5;
}

/* ── Testimonials ──────────────────────────────────────────── */
.testimonials {
  background: #f5f5f0;
  border-top: 2px solid #0a0a0a;
}

.testimonials-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 5rem 1.5rem;
}

.testimonials-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  letter-spacing: 0.02em;
  line-height: 0.9;
  color: #0a0a0a;
  margin: 0 0 2.5rem;
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
  border: 1.5px solid #0a0a0a;
  padding: 2rem;
  border-top: 3px solid transparent;
  border-image: linear-gradient(90deg,#ff6bcb,#a78bfa,#38bdf8,#34d399,#fbbf24) 1;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  min-width: clamp(260px, 30vw, 360px);
  flex: 1;
  scroll-snap-align: start;
  background: #f5f5f0;
}

.t-quote {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  font-style: italic;
  line-height: 1.7;
  color: #0a0a0a;
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
  background: #0a0a0a;
  color: #f5f5f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1rem;
  flex-shrink: 0;
}

.t-name {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #0a0a0a;
  line-height: 1.4;
}

/* ── Embed section ─────────────────────────────────────────── */
.embed-section {
  background: #0a0a0a;
  border-top: 3px solid #0a0a0a;
  border-bottom: 3px solid #0a0a0a;
}

.embed-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 5rem 1.5rem;
}

.embed-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.embed-left {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.embed-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(2rem, 4vw, 3.5rem);
  letter-spacing: 0.02em;
  line-height: 0.9;
  color: #f5f5f0;
  margin: 0;
}

.embed-sub {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: rgba(245,245,240,0.65);
  margin: 0;
  max-width: 40ch;
}

.embed-link {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  color: #f5f5f0;
  text-decoration: none;
  padding: 0.625rem 1.5rem;
  border: 1.5px solid rgba(245,245,240,0.4);
  display: inline-block;
  align-self: flex-start;
  transition: border-color 0.15s, background 0.15s;
}

.embed-link:hover {
  border-color: #f5f5f0;
  background: rgba(245,245,240,0.05);
}

@media (max-width: 768px) {
  .embed-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

/* ── Section 5: Dark CTA ───────────────────────────────────── */
.cta-dark {
  background: var(--ink);
  color: #f5f5f0;
}

.cta-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 6rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  text-align: center;
}

.cta-headline {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(3rem, 6vw, 5rem);
  letter-spacing: 0.02em;
  line-height: 0.9;
  color: #f5f5f0;
  margin: 0;
  max-width: 22ch;
}

.cta-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.cta-btn {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.25rem;
  letter-spacing: 0.1em;
  text-decoration: none;
  padding: 0.875rem 2.5rem;
  display: inline-block;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}

.cta-btn--fill {
  background: #f5f5f0;
  color: var(--ink);
  border: 2px solid #f5f5f0;
}

.cta-btn--fill:hover {
  background: transparent;
  color: #f5f5f0;
}

.cta-btn--ghost {
  background: transparent;
  color: rgba(245, 245, 240, 0.8);
  border: 2px solid rgba(245, 245, 240, 0.4);
}

.cta-btn--ghost:hover {
  color: #f5f5f0;
  border-color: #f5f5f0;
}

/* ── KYC Strip ──────────────────────────────────────────────── */
.kyc-strip {
  background: var(--ink);
  border-top: 3px solid var(--ink);
  border-bottom: 3px solid var(--ink);
}
.kyc-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 5rem 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}
.kyc-quote {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(2rem, 4vw, 3.5rem);
  letter-spacing: 0.02em;
  line-height: 0.95;
  color: #f5f5f0;
  margin: 0 0 1.25rem;
  quotes: none;
}
.kyc-attribution {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  color: rgba(245,245,240,0.5);
  margin: 0;
}
.kyc-terminal {
  background: #0d0d0d;
  border: 1px solid rgba(245,245,240,0.85);
  padding: 1.25rem 1.5rem;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  line-height: 1.8;
  color: rgba(245,245,240,0.85);
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}
.kyc-terminal-header {
  font-size: 0.8125rem;
  font-weight: 700;
  color: #f5f5f0;
  margin-bottom: 0.25rem;
  letter-spacing: 0.06em;
}
.kyc-terminal-rule {
  color: rgba(245,245,240,0.3);
  font-size: 0.6875rem;
  margin: 0.25rem 0;
  letter-spacing: -0.02em;
}
.kyc-terminal-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.kyc-key {
  color: rgba(245,245,240,0.55);
  min-width: 7.5rem;
  flex-shrink: 0;
  letter-spacing: 0.04em;
}
.kyc-sep { color: rgba(245,245,240,0.4); }
.kyc-val { color: rgba(245,245,240,0.85); }
.kyc-low { color: #34d399; }
.kyc-done { color: #34d399; font-weight: 700; }
.kyc-approved { color: #34d399; font-weight: 700; font-size: 0.8125rem; }
.kyc-bar-wrap {
  display: inline-flex;
  align-items: center;
  width: 7rem;
  height: 0.625rem;
  background: rgba(245,245,240,0.1);
  border-radius: 2px;
  overflow: hidden;
}
.kyc-bar {
  display: block;
  height: 100%;
  background: #34d399;
  border-radius: 2px;
  width: 0%;
  transition: width 0.8s ease-out;
}
.kyc-bar--1 { transition-delay: 0.3s; }
.kyc-bar--2 { transition-delay: 0.7s; }
/* Animate bars when section enters viewport — triggered by class on parent */
.kyc-strip.kyc-visible .kyc-bar { width: 100%; }

/* ── Feature Comparison ──────────────────────────────────────── */
.compare {
  background-color: var(--paper);
  background-image:
    linear-gradient(var(--grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: 24px 24px;
  border-top: 3px solid var(--ink);
  border-bottom: 3px solid var(--ink);
}
.compare-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 5rem 1.5rem;
}
.compare-header {
  border-bottom: 3px solid var(--ink);
  padding-bottom: 1.5rem;
  margin-bottom: 2.5rem;
}
.compare-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(2rem, 4vw, 3rem);
  letter-spacing: 0.02em;
  line-height: 0.95;
  color: var(--ink);
  margin: 0;
  max-width: 28ch;
}
.compare-cols {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border: 1px solid var(--ink);
}
.compare-col {
  border-right: 1px solid var(--ink);
  display: flex;
  flex-direction: column;
  position: relative;
}
.compare-col:last-child { border-right: none; }
.compare-col--prodigy {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
  z-index: 1;
  border-top: none;
}
.compare-col-accent {
  height: 4px;
  width: 100%;
}
.compare-col-accent--red { background: #dc2626; }
.compare-col-accent--iris {
  background: linear-gradient(90deg, #ff6bcb, #a78bfa, #38bdf8, #34d399, #fbbf24, #ff6bcb);
  background-size: 200% auto;
  animation: iris-flow 5s linear infinite;
}
.compare-col-accent--amber { background: #d97706; }
.compare-col-head {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.5rem;
  letter-spacing: 0.06em;
  color: var(--ink);
  margin: 0;
  padding: 1.25rem 1.5rem 0.875rem;
  border-bottom: 1px solid var(--ink);
}
.compare-list {
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.compare-row {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  padding: 0.875rem 1.5rem;
  border-bottom: 1px solid rgba(0,0,0,0.08);
}
.compare-row--footer {
  margin-top: auto;
  border-top: 1px solid var(--ink);
  border-bottom: none;
  background: rgba(0,0,0,0.03);
}
.compare-item-label {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(10,10,10,0.55);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.compare-item-val {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.4;
}
.compare-val--bad { color: #dc2626; }
.compare-val--good { color: #166534; }
.compare-val--warn { color: #92400e; }

/* ── Fee Calculator ────────────────────────────────────────── */
.fee-calc {
  background: var(--ink);
  border-top: 3px solid var(--ink);
  border-bottom: 3px solid var(--ink);
}

.fee-calc-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.fee-calc-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(3rem, 6vw, 5rem);
  letter-spacing: 0.02em;
  line-height: 0.9;
  color: #f5f5f0;
  margin: 0;
}

.fee-calc-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.fee-inputs {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.fee-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.fee-field-label {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: rgba(245, 245, 240, 0.5);
}

.fee-input {
  font-family: 'Space Grotesk', monospace;
  font-size: 1.5rem;
  font-weight: 600;
  color: #f5f5f0;
  background: #111;
  border: 1px solid rgba(245, 245, 240, 0.2);
  padding: 0.75rem 1rem;
  width: 100%;
  outline: none;
  appearance: none;
  -moz-appearance: textfield;
}

.fee-input::-webkit-inner-spin-button,
.fee-input::-webkit-outer-spin-button {
  appearance: none;
}

.fee-input:focus {
  border-color: rgba(245, 245, 240, 0.6);
}

.fee-slider {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: 2px;
  background: rgba(245, 245, 240, 0.2);
  outline: none;
  cursor: pointer;
}

.fee-slider::-webkit-slider-thumb {
  appearance: none;
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  background: #34d399;
  cursor: pointer;
  border: none;
}

.fee-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: #34d399;
  cursor: pointer;
  border: none;
  border-radius: 0;
}

.fee-breakdown {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid rgba(245, 245, 240, 0.15);
  background: #0d0d0d;
  padding: 1.5rem;
}

.fee-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0.625rem 0;
  border-bottom: 1px solid rgba(245, 245, 240, 0.07);
}

.fee-row:last-child {
  border-bottom: none;
}

.fee-row--divider {
  border-bottom: 1px solid rgba(245, 245, 240, 0.25);
  padding: 0;
  height: 0;
}

.fee-row-label {
  font-family: 'Space Grotesk', monospace;
  font-size: 0.8125rem;
  color: rgba(245, 245, 240, 0.65);
  letter-spacing: 0.02em;
}

.fee-row-label--earn {
  color: #34d399;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.fee-row-val {
  font-family: 'Space Grotesk', monospace;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #f5f5f0;
}

.fee-row-val--muted {
  color: rgba(245, 245, 240, 0.4);
  font-weight: 400;
}

.fee-row-val--earn {
  color: #34d399;
  font-weight: 700;
  font-size: 1.125rem;
}

.fee-calc-cta {
  display: flex;
}

.fee-cta-btn {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.25rem;
  letter-spacing: 0.1em;
  color: var(--ink);
  background: #f5f5f0;
  text-decoration: none;
  padding: 0.875rem 2.5rem;
  border: 2px solid #f5f5f0;
  display: inline-block;
  transition: background 0.15s, color 0.15s;
}

.fee-cta-btn:hover {
  background: transparent;
  color: #f5f5f0;
}

/* ── Alternating Feature Sections ─────────────────────────── */
.alt-features {
  border-top: 3px solid var(--ink);
  border-bottom: 3px solid var(--ink);
  background-color: var(--paper);
  background-image:
    linear-gradient(var(--grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: 24px 24px;
}

.alt-features-inner {
  max-width: 1440px;
  margin: 0 auto;
}

.alt-feature {
  display: grid;
  gap: 0;
  border-bottom: 3px solid var(--ink);
  position: relative;
  overflow: hidden;
}

.alt-feature:last-child { border-bottom: none; }

/* 60/40 left-heavy */
.alt-feature--ltr {
  grid-template-columns: 6fr 4fr;
}

/* 40/60 right-heavy */
.alt-feature--rtl {
  grid-template-columns: 4fr 6fr;
}

/* Section number watermark */
.alt-section-num {
  position: absolute;
  top: -0.1em;
  left: 1rem;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 120px;
  font-weight: 900;
  color: var(--ink);
  opacity: 0.06;
  line-height: 1;
  letter-spacing: 0.02em;
  user-select: none;
  pointer-events: none;
  z-index: 0;
}

.alt-left, .alt-right {
  padding: 4rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.alt-feature--ltr .alt-left  { border-right: 3px solid var(--ink); }
.alt-feature--rtl .alt-right { border-left: 3px solid var(--ink); }

/* On RTL, swap visual order */
.alt-feature--rtl .alt-left  { order: -1; }

.alt-eyebrow {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(10, 10, 10, 0.45);
  margin: 0;
}

.alt-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(2rem, 4vw, 3.25rem);
  letter-spacing: 0.02em;
  line-height: 0.92;
  color: var(--ink);
  margin: 0;
}

.alt-body {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: rgba(10, 10, 10, 0.65);
  margin: 0;
  max-width: 46ch;
}

.alt-cta {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--ink);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  border-bottom: 2px solid var(--ink);
  padding-bottom: 1px;
  align-self: flex-start;
  transition: opacity 0.15s;
}
.alt-cta:hover { opacity: 0.6; }

/* Receipt mock */
.alt-receipt-mock, .alt-revenue-mock {
  background: #fff;
  border: 1.5px solid var(--ink);
  font-family: 'Space Mono', monospace;
  font-size: 0.8125rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.arm-header {
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
  color: var(--ink);
}

.arm-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0.3rem 0;
  border-bottom: 1px solid rgba(10,10,10,0.08);
  color: var(--ink);
}
.arm-row.muted { color: rgba(10,10,10,0.5); font-size: 0.75rem; }
.arm-row.total { font-weight: 700; border-bottom: none; border-top: 2px solid var(--ink); padding-top: 0.5rem; }
.arm-divider { border-top: 2px solid var(--ink); margin: 0.25rem 0; }
.arm-note { font-size: 0.7rem; color: #166534; margin-top: 0.5rem; }
.arm-green { color: #166534; font-weight: 700; }

/* KYC terminal */
.alt-kyc-terminal {
  background: #0d0d0d;
  border: 1.5px solid rgba(245,245,240,0.85);
  font-family: 'Space Mono', monospace;
  font-size: 0.8125rem;
  padding: 1.25rem 1.5rem;
  color: rgba(245,245,240,0.85);
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.akt-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.akt-key {
  font-size: 0.75rem;
  color: rgba(245,245,240,0.4);
  letter-spacing: 0.06em;
  min-width: 7rem;
  flex-shrink: 0;
}

.akt-val { font-size: 0.8rem; color: rgba(245,245,240,0.85); }
.akt-green { color: #34d399; font-weight: 700; }

.akt-bar {
  flex: 1;
  height: 6px;
  background: rgba(245,245,240,0.12);
  border-radius: 2px;
  overflow: hidden;
}
.akt-bar-fill {
  display: block;
  height: 100%;
  width: 100%;
  background: #34d399;
  border-radius: 2px;
  transition: width 0.8s ease-out;
}

@media (max-width: 900px) {
  .alt-feature--ltr,
  .alt-feature--rtl { grid-template-columns: 1fr; }
  .alt-feature--ltr .alt-left  { border-right: none; border-bottom: 3px solid var(--ink); }
  .alt-feature--rtl .alt-right { border-left: none; border-top: 3px solid var(--ink); }
  .alt-feature--rtl .alt-left  { order: 0; }
  .alt-section-num { font-size: 80px; }
  .alt-left, .alt-right { padding: 2.5rem 1.5rem; }
}

/* ── CounterStat Row ───────────────────────────────────────── */
.counter-stats-section {
  background: #0a0a0a;
  padding: 48px 32px;
  border-bottom: 3px solid rgba(255, 255, 255, 0.08);
}

.counter-stats-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}

.counter-stats-inner :deep(.stat-display) {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 48px;
  font-weight: 900;
  color: #fff;
  letter-spacing: -0.02em;
  line-height: 1;
}

.counter-stats-inner :deep(.stat-label) {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 11px;
  color: #888;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-top: 4px;
  opacity: 1;
}

/* ── PaymentFlowSvg ────────────────────────────────────────── */
.flow-section {
  background: #0a0a0a;
  border-top: 3px solid rgba(255, 255, 255, 0.06);
  border-bottom: 3px solid rgba(255, 255, 255, 0.06);
}

.flow-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.flow-headline {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(2rem, 4vw, 3.5rem);
  letter-spacing: 0.02em;
  line-height: 0.95;
  color: #f5f5f0;
  margin: 0;
}

/* ── TrustLogoStrip ────────────────────────────────────────── */
.trust-section {
  background: #f5f5f0;
  border-bottom: 3px solid #0a0a0a;
}

.trust-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.trust-headline {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(2rem, 4vw, 3rem);
  letter-spacing: 0.02em;
  line-height: 0.95;
  color: #0a0a0a;
  margin: 0;
}

/* ── Eyebrow (shared, for flow/trust sections) ─────────────── */
.eyebrow {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(10, 10, 10, 0.5);
  margin: 0;
}

.eyebrow--light {
  color: rgba(245, 245, 240, 0.5);
}

/* ── Responsive ────────────────────────────────────────────── */
@media (max-width: 768px) {
  .counter-stats-inner { grid-template-columns: repeat(2, 1fr); }
  .section-inner { padding: 3.5rem 1rem; }
  .how-inner { padding: 3.5rem 1rem; }
  .compare-inner { padding: 3.5rem 1rem; }
  .fee-calc-inner { padding: 3.5rem 1rem; }
  .cta-inner { padding: 3.5rem 1rem; }
  .flow-inner { padding: 3.5rem 1rem; }
  .trust-inner { padding: 3rem 1rem; }
}

@media (max-width: 480px) {
  .counter-stats-inner { grid-template-columns: 1fr 1fr; gap: 16px; }
  .hero-content { padding: 2rem 1rem; }
  .counter-stats-section { padding: 32px 16px; }
}

@media (max-width: 375px) {
  .counter-stats-inner { grid-template-columns: 1fr; }
  .hero-content { gap: 1.5rem; }
}

@media (max-width: 900px) {
  .fee-calc-body { grid-template-columns: 1fr; }
  .kyc-inner { grid-template-columns: 1fr; gap: 2.5rem; }
  .kyc-key { min-width: 6rem; }
  .compare-cols { grid-template-columns: 1fr; }
  .compare-col { border-right: none; border-bottom: 1px solid var(--ink); }
  .compare-col:last-child { border-bottom: none; }
  .compare-col--prodigy { transform: none; box-shadow: none; }
  .hero-split {
    grid-template-columns: 1fr;
    min-height: auto;
  }

  .hero-left {
    min-height: 40vh;
    border-bottom: 3px solid var(--ink);
    border-left: none;
  }

  .hero-right {
    border-left: none;
  }

  .hero-content {
    padding: 2.5rem 1.5rem;
  }

  .problem-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .problem-number {
    font-size: 4rem;
  }

  .how-cards {
    grid-template-columns: 1fr;
  }

  .step-card {
    border-right: none;
    border-bottom: 1px solid var(--ink);
  }

  .step-card:last-child {
    border-bottom: none;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .stat-cell:nth-child(2n) {
    border-right: none;
  }

  .stat-cell {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .stat-cell:nth-last-child(-n+2) {
    border-bottom: none;
  }
}

@media (max-width: 500px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .stat-cell {
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .stat-cell:last-child {
    border-bottom: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .blob { animation: none; }
  .iris-bar { animation: none; }
  .step-iris-bar { background: #a78bfa; }
  .compare-col-accent--iris { animation: none; }
  .kyc-bar { transition: none; width: 100%; }
  .fee-slider { transition: none; }
}

/* ── Widget Preview Section ── */
.widget-preview-section {
  padding: 5rem 0;
  background-color: var(--paper);
  background-image:
    linear-gradient(var(--grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: 24px 24px;
  border-top: 3px solid var(--ink);
  border-bottom: 3px solid var(--ink);
}
.widget-preview-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 4rem;
  align-items: center;
}
.widget-preview-text h2 { margin-bottom: 1rem; }
.widget-preview-sub {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: rgba(10, 10, 10, 0.65);
  margin: 0;
  max-width: 40ch;
}
@media (max-width: 768px) {
  .widget-preview-inner { grid-template-columns: 1fr; }
}

/* ── Bold Partners Say ── */
.bold-partners-say {
  background-color: var(--paper);
  background-image:
    linear-gradient(var(--grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: 24px 24px;
  border-top: 3px solid var(--ink);
  border-bottom: 3px solid var(--ink);
}
.bold-partners-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 5rem 1.5rem;
}
.bold-partners-heading {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  letter-spacing: 0.02em;
  line-height: 0.9;
  color: var(--ink);
  margin: 0.5rem 0 2.5rem;
}
.bold-partners-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
.bold-partner-card {
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem 1.5rem 1.5rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.bold-partner-quote {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9375rem;
  font-style: italic;
  line-height: 1.7;
  color: rgba(245, 245, 240, 0.85);
  margin: 0;
  flex: 1;
}
.bold-partner-attr {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}
.bold-partner-role {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8125rem;
  font-weight: 700;
  color: rgba(245, 245, 240, 0.9);
}
.bold-partner-company {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  color: rgba(245, 245, 240, 0.5);
}
.bold-partner-badge {
  display: inline-block;
  align-self: flex-start;
  background: #2563eb;
  color: #fff;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.625rem;
  border-radius: 99px;
  letter-spacing: 0.04em;
}
@media (max-width: 768px) {
  .bold-partners-grid { grid-template-columns: 1fr; }
}

/* ── Feature Marquee Strip ── */
.marquee-wrap {
  overflow: hidden;
  border-top: 3px solid var(--ink);
  border-bottom: 3px solid var(--ink);
  padding: 0.875rem 0;
  background: #1a1a1a;
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
  border: 1px solid rgba(255,255,255,0.15);
  background: #1a1a1a;
  color: #fff;
  font-family: 'Space Grotesk', sans-serif;
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
  border: 2px solid var(--ink);
  border-radius: 0;
  background: #fff;
}
.activity-header { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; }
.activity-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: #2563eb;
  animation: act-pulse 1.5s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes act-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.8)} }
.activity-label { font-family: 'Space Grotesk', sans-serif; font-size: 0.75rem; font-weight: 700; color: #2563eb; text-transform: uppercase; letter-spacing: 0.06em; }
.activity-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem; position: relative; min-height: 6rem; }
.activity-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.8125rem; }
.activity-flag { font-size: 1rem; flex-shrink: 0; }
.activity-text { color: #333; flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-family: 'Space Grotesk', sans-serif; }
.activity-time { font-size: 0.6875rem; color: #888; white-space: nowrap; flex-shrink: 0; }
.activity-disclaimer { font-size: 0.6875rem; color: #999; margin-top: 0.5rem; font-style: italic; }
.activity-slide-enter-active { transition: all 0.4s ease; }
.activity-slide-enter-from { opacity: 0; transform: translateY(-8px); }
.activity-slide-leave-active { transition: all 0.3s ease; position: absolute; }
.activity-slide-leave-to { opacity: 0; transform: translateY(8px); }
</style>
