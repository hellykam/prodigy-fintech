# Landing Variants — TASKS
_Updated: 2026-06-18_

---

## INFRASTRUCTURE

### T-01 Add vue-router + route config
**Status:** TODO  
**DoD:** `npm ls vue-router` shows it installed; `router/index.ts` has all 13 routes; app boots without console errors; navigating to `/swiss`, `/crypto`, `/fintech` renders distinct layouts.

### T-02 Theme index page `/`
**Status:** TODO  
**DoD:** `/` shows 3 cards (Swiss, Crypto, Fintech) each linking to their home; looks polished; Playwright screenshot attached.

---

## SWISS THEME (`/swiss/*`)

### T-03 Swiss Home page
**Status:** TODO  
**DoD:** Refactored from existing single-page landing into `/swiss` route; has proper Header with router-link nav to /product, /pricing, /partners; hero + stats + trust visible above fold; screenshot attached.

### T-04 Swiss Product page (`/swiss/product`)
**Status:** TODO  
**DoD:** Shows 8 modules with full benefit copy; how-it-works steps; system diagram callout; no placeholder text; screenshot attached.

### T-05 Swiss Pricing page (`/swiss/pricing`)
**Status:** TODO  
**DoD:** Live animated receipt widget; fee breakdown table; DA-style copy; "no hidden fees" promise with specific numbers; screenshot attached.

### T-06 Swiss Partners page (`/swiss/partners`)
**Status:** TODO  
**DoD:** Partner revenue statement card; 4-step embed flow; callouts for admin visibility + earnings tracking; screenshot attached.

---

## CRYPTO THEME (`/crypto/*`)

### T-07 Crypto Home page
**Status:** TODO  
**DoD:** Dark background (#050510); animated particle canvas (stars/nodes); 3D CSS floating crypto receipt; glitch text effect on headline; neon color accents; distinct from Swiss in <2 seconds; screenshot attached.

### T-08 Crypto Product page (`/crypto/product`)
**Status:** TODO  
**DoD:** Dark card grid with glow borders; animated data flow visualization; copy in DA style; screenshot attached.

### T-09 Crypto Pricing page (`/crypto/pricing`)
**Status:** TODO  
**DoD:** Dark terminal-style receipt; animated numbers counting up to fee amounts; "no fog" messaging; screenshot attached.

### T-10 Crypto Partners page (`/crypto/partners`)
**Status:** TODO  
**DoD:** Neon revenue dashboard mockup; animated earnings counter; dark card layout; screenshot attached.

---

## FINTECH THEME (`/fintech/*`)

### T-11 Fintech Home page
**Status:** TODO  
**DoD:** Light background, Courier/monospace typography, Bloomberg-terminal density; data tables above fold; amber accent color; typing animation on headline; clearly institutional; distinct from both other themes; screenshot attached.

### T-12 Fintech Product page (`/fintech/product`)
**Status:** TODO  
**DoD:** Dense feature table (not cards); spec-sheet aesthetic; all features listed with technical details; screenshot attached.

### T-13 Fintech Pricing page (`/fintech/pricing`)
**Status:** TODO  
**DoD:** Fee schedule as formatted data table; BPS notation; comparison vs competitors (Coinify); screenshot attached.

### T-14 Fintech Partners page (`/fintech/partners`)
**Status:** TODO  
**DoD:** Integration spec table; SLA commitments; revenue share formula; looks like a term sheet; screenshot attached.

---

## MARKETING / AUDIENCE TEST

### T-15 Simulated audience panel + winner declaration
**Status:** TODO  
**DoD:** Written analysis of which theme performs best for B2B fintech buyer persona; specific reasons; variant recommendation.

---

## DONE LOG
_(items move here with screenshot evidence)_

---

---

# VISUAL UPGRADE TASKS — Phase 2
_Research basis: docs/research/landing-visual-research.md_
_Priority: Swiss first (audience winner), Crypto second (dev audience), then Fintech/Bold_

---

## L-001 Shared Component Library — Illustrations & Animations
**Status: TODO**
**Location:** `apps/landing/src/components/`
**Why:** All 5 themes need the same core visual atoms. Build once, use everywhere. No per-theme duplication.

### Components to create:

#### `BrowserMockup.vue`
- Chrome-style top bar (3 dots, URL input, reload icon) — pure CSS, no images
- Slot for content (iframe or static screenshot inside)
- Props: `src?`, `tiltDeg?: number` (default −8deg), `float?: boolean`
- CSS 3D tilt: `perspective(1200px) rotateY(-8deg) rotateX(4deg)`
- Float animation when `float=true`: `translateY(0 → -12px → 0)` 6s ease-in-out infinite
- Drop shadow underneath (not behind — creates depth illusion)
- Used in: hero sections (all themes), Product pages

#### `PhoneMockup.vue`
- Minimal phone frame (rounded rect, notch, home indicator bar) — pure CSS
- Slot for content
- Props: `tiltDeg?`, `float?: boolean`
- Used in: Consumer flow sections

#### `ReceiptCard.vue`
- Pure HTML/CSS receipt: white card, monospaced rows, dashed separator
- Props: `rows: {label, value, isFee?: boolean}[]`, `total`, `stamp?: 'approved'|'pending'`
- Stamp: absolute-positioned red circle, `rotate(−15deg)`, scale(0) → scale(1) with bounce (cubic-bezier) triggered by prop or on mount
- Animation: card slides up from `translateY(40px)` + `opacity: 0` on mount (400ms)
- Used in: Swiss hero, Swiss Pricing, Crypto Pricing, Bold hero, all Footer sections

#### `CoinFloat.vue`
- CSS 3D coin: two faces (front/back) with `backface-visibility: hidden`
- Front face: flat colored circle + currency SVG (BTC/ETH/EUR/USDT)
- Continuous Y-rotation: `rotateY(0 → 360deg)` 8s linear infinite
- Pause on hover
- Props: `currency: 'BTC'|'ETH'|'EUR'|'USDT'`, `size: 'sm'|'md'|'lg'`, `color?`
- Used in: Crypto hero (3 coins floating), Crypto Product page

#### `PaymentFlowSvg.vue`
- SVG path: User → Widget → Risk Engine → Ledger → Partner
- Animated dot travels path: `stroke-dashoffset` + `stroke-dasharray` CSS animation
- Nodes: circles with icon labels, pulse on dot arrival (scale 1 → 1.2 → 1)
- Props: `speed?: number`, `theme: 'light'|'dark'`
- Used in: How It Works sections (all themes), Product pages

#### `CounterStat.vue`
- Props: `value: number`, `prefix?: string` (€, $), `suffix?: string` (B, K, M, +), `label: string`, `duration?: number` (ms, default 800)
- On mount or when triggered by Intersection Observer: counts from 0 to `value` using `requestAnimationFrame`
- Easing: ease-out (fast start, slows at end)
- Typography: inherits parent size — caller decides the font-size

#### `TrustLogoStrip.vue`
- Props: `logos: {name, svgPath, url?}[]`, `marquee?: boolean` (auto-scroll)
- SVG logos inline (no external images): Visa, Mastercard, SEPA, Sumsub, PCI DSS, MiCA, ISO 27001, SOC 2
- Marquee: duplicates list, `translateX(0 → -50%)` 30s linear infinite
- Grayscale + 60% opacity idle → full color on hover (individual)
- Used in: all theme Home pages (after stats), Partners pages

#### `CodeBlock.vue`
- Props: `code: string`, `language: 'html'|'js'|'bash'`, `selfType?: boolean` (character-by-character animation), `copyable?: boolean`
- Syntax highlighting: pure CSS classes (keyword/string/comment colors), no external library
- When `selfType=true`: characters appear one by one, 20ms delay each, on enter viewport
- Copy button: copies to clipboard, shows "Copied!" for 2s
- Dark terminal styling (dark bg, monospace, colored tokens)
- Used in: Partners pages, Developers pages

#### `LiveActivityToast.vue`
- Simulated real-time activity notifications (bottom-left corner)
- Data: rotating array of fake transactions ("Lena K. in Berlin converted €340 → 0.0058 BTC")
- New toast every 4–8s (random), slides up from bottom, fades out after 5s
- Max 2 toasts visible at once
- Mobile: hidden (too distracting on small screens)
- Used in: Crypto Home only

**DoD for L-001:**
- [ ] All 8 components render without errors in all themes
- [ ] BrowserMockup float animation plays at 60fps (no layout thrash — use `transform` only)
- [ ] CoinFloat spins continuously without repaints
- [ ] CounterStat reaches target value exactly (no floating point drift)
- [ ] CodeBlock self-type works correctly for multi-line code
- [ ] TrustLogoStrip marquee loops seamlessly (no gap or jump)
- [ ] vue-tsc clean

---

## L-002 Animation System Upgrade — `useScrollReveal.ts`
**Status: TODO**
**Location:** `apps/landing/src/composables/useScrollReveal.ts`
**Why:** Current composable only does basic opacity+translateY. Need directional reveals, stagger, scroll-linked background transitions.

### Extend the composable with:

#### Entry animation variants (new data-animate attribute values):
```
data-animate="fade-up"     — opacity 0 + translateY(24px) → visible (current, keep)
data-animate="fade-left"   — opacity 0 + translateX(-40px) → visible
data-animate="fade-right"  — opacity 0 + translateX(40px) → visible
data-animate="scale-in"    — opacity 0 + scale(0.88) → visible
data-animate="slide-up-hard" — translateY(100%) → translateY(0), no opacity change
```

#### Stagger support:
- `data-animate-stagger` on parent → each direct child gets increasing delay (+60ms per child)
- First child: 0ms, second: 60ms, third: 120ms, etc.

#### Pinned scroll section:
- New composable `useScrollPin(el, panelCount)` — pins `el` while user scrolls through `panelCount` virtual scroll lengths
- Inside pinned section: panel index advances based on scroll progress
- Used in: Product pages (cycles through 3 feature panels without page scroll)

#### Scroll-progress background:
- New composable `useScrollBg(el, {from, to})` — interpolates background-color between two values based on element scroll progress
- Used in: Swiss Pricing page (white → #f0f0f0 → ivory as receipt section scrolls into view)

**DoD for L-002:**
- [ ] All 4 data-animate variants work in Chrome and Safari
- [ ] Stagger: 5 cards in a row each fade in 60ms apart
- [ ] Pinned scroll: Product page cycles 3 panels while scroll happens — works on mobile too (fallback: just shows all 3 stacked)
- [ ] No IntersectionObserver leak (disconnect on component unmount)
- [ ] 0 layout shifts (CLS = 0) — all animations use transform + opacity only

---

## L-003 Swiss Theme — Deep Content & Visual Upgrade
**Status: TODO**
**Priority: #1**
**Location:** `apps/landing/src/themes/swiss/`
**Why:** Swiss won the audience test (score 8/10). It's the demo-closer theme. Every section needs more visual depth.

### Swiss Home (`/swiss`) — expand existing sections:

**Hero (replace static right column):**
- Replace the static widget card with `BrowserMockup.vue` showing a screenshot of localhost:5001 buy flow
- BrowserMockup: `tiltDeg=-8`, `float=true`, drop shadow underneath
- Screenshot: take a screenshot of the Consumer app (buy confirmation step) and save as `src/assets/screens/consumer-buy.webp` (800×600, WebP)
- Add subtle iridescent radial gradient behind the mockup (existing iris-orb: make it larger, 600px)

**Animated stats bar (add after hero, before How It Works):**
- 4 stats in a row:
  - `$2.4B` — Simulated Volume
  - `45K` — Demo Transactions
  - `93.1%` — First-Pass KYC Rate
  - `47s` — Avg. KYC Time
- Use `CounterStat.vue`, triggered on enter viewport
- Typography: 96px Barlow Condensed, uppercase
- Thin border-bottom rule separates from next section

**How It Works — add visual:**
- Step 1: embed icon (code `</>` in square) — CSS icon, no images
- Step 2: KYC shield icon — CSS shape
- Step 3: receipt icon — CSS
- Step 4: graph/arrow icon — CSS
- Each icon: 48×48, iridescent stroke on hover

**Testimonials section (add new, after How It Works):**
- 3 testimonial cards in a row (or horizontal scroll on mobile)
- Simulated quotes from: CFO at a neobank, CTO at a crypto exchange, Head of Compliance at a wealth manager
- Each card: quote in large italic, name + company + role, small company letter-mark avatar
- Scroll reveal: `fade-up` stagger

**"Embed in 3 Lines" teaser section (add before footer):**
- Left: heading "Embed in Three Lines" + subtext + CTA → /swiss/partners
- Right: `CodeBlock.vue` showing:
  ```html
  <script src="https://widget.prodigy.demo/embed.js"></script>
  <div id="prodigy-widget" data-b2b-client="acme_001"></div>
  ```
- `selfType=true` triggers on enter viewport

**Trust logo strip (add above footer):**
- `TrustLogoStrip.vue` with: Sumsub, Visa, Mastercard, SEPA, MiCA, PCI DSS, ISO 27001, SOC 2
- Label above: "Built on regulated infrastructure"
- `marquee=false` (static grid, Swiss aesthetic)

### Swiss Product page (`/swiss/product`) — expand:

**Pinned feature showcase (new section):**
- 3 panels cycling while user scrolls (use `useScrollPin`)
- Panel 1 — Widget: left=copy about embed, right=BrowserMockup of widget at localhost:5005
- Panel 2 — Admin: left=copy about admin dashboard, right=BrowserMockup of admin at localhost:5002
- Panel 3 — Partner Portal: left=copy about revenue tracking, right=BrowserMockup of partner portal at localhost:5006

**Payment flow animation:**
- `PaymentFlowSvg.vue` with `theme='light'`
- Section heading: "Every transaction is verified at 5 checkpoints"

### Swiss Pricing page (`/swiss/pricing`) — expand:

**Interactive fee calculator (new, above receipt section):**
- Slider: send amount (€100 → €10,000, step €50)
- Dropdown: currency pair (EUR→BTC, EUR→ETH, EUR→USDT)
- Dropdown: partner markup (0% → 2%, step 0.1%)
- Output: live-updating fee breakdown (platform fee, partner earn, network fee, total received)
- Right side: ReceiptCard that updates as sliders move
- No backend needed — formula is hardcoded: `platform = amount × 0.005`, `partner = amount × markup`, `network = 2.40 EUR flat`

**Competitor comparison table (new):**
- Rows: Fee shown pre-login, Fee breakdown visible, Flat fee disclosed, No spread hidden
- Columns: Prodigy (green checkmarks), MoonPay (partial), Ramp (partial), Transak (partial)
- Prodigy column: highlighted with iridescent border

### Swiss Partners page (`/swiss/partners`) — expand:

**Revenue calculator:**
- Slider: monthly transaction volume (€10K → €5M)
- Slider: markup % (0.1% → 2%)
- Output: "Your estimated monthly earn: €X,XXX"
- Simple formula displayed
- CTA: "Set up your markup in the Partner Portal →"

**Code block (improve existing):**
- Use `CodeBlock.vue` with `selfType=true`, `copyable=true`
- Show full integration snippet (3 lines)

**DoD for L-003:**
- [ ] Swiss Home has BrowserMockup in hero (float animation plays)
- [ ] Animated stats count up on enter
- [ ] 3 testimonial cards visible
- [ ] "Embed in 3 Lines" code block self-types on scroll
- [ ] Product page has pinned 3-panel section (or graceful stacked fallback)
- [ ] Pricing calculator updates receipt in real time as sliders move
- [ ] Competitor table shows correctly on mobile
- [ ] Revenue calculator on Partners page works
- [ ] All sections have scroll-reveal entry animations
- [ ] 0 console errors

---

## L-004 Crypto Theme — Full Visual Upgrade
**Status: TODO**
**Priority: #2**
**Location:** `apps/landing/src/themes/crypto/`
**Why:** Developer audience chose Crypto. It needs to feel genuinely impressive — not a particle canvas and some CSS glows, but actual 3D, motion, and live data.

### Crypto Home (`/crypto`) — upgrade existing:

**Hero background (upgrade):**
- Currently: flat #050510 + particle canvas
- Add: deep radial gradient behind canvas: `radial-gradient(ellipse 80% 60% at 50% 40%, #1a0533 0%, #050510 70%)`
- Add scanlines overlay (existing `div.scanlines` is there, make it more visible: 1px lines, 3% opacity)
- Add floating coin cluster: 3 × `CoinFloat.vue` (BTC, ETH, USDT) positioned top-right, different sizes, different rotation speeds

**Hero right column (replace receipt card with 3D setup):**
- Keep receipt card but mount it inside a `GlassCard` wrapper (frosted glass: `backdrop-filter: blur(16px)`, border: 1px rgba(255,255,255,0.12))
- Behind the glass card: neon glow blob (CSS `filter: blur(80px)`, 200×200, purple/cyan, float animation)
- Receipt card values: connect to Market Simulator WebSocket (ws://localhost:3000/ws) to show real BTC price. Update "Exchange rate" row live.

**Stats bar (upgrade existing — builder added static one):**
- Connect `CounterStat.vue` with dark styling (neon green numbers)
- Add WS connection: replace "45,231 transactions" with real count from `GET /api/transactions` count

**Transaction lifecycle (existing section — upgrade):**
- Currently: terminal text list with active step cycling
- Add: SVG connector line running left of all steps, dot travels down it as active step advances
- Each step arrival: neon flash on the dot (box-shadow pulse, 200ms)

**New section: Live System Pulse (after lifecycle)**
- Embedded miniature version of the System Map — not a full iframe, but a simplified `PaymentFlowSvg.vue` with dark theme
- Pulsing dots travel between nodes in real time (or simulated at 3s interval)
- Label: "This is actually running. Right now."
- CTA: "Open System Map →" → localhost:5004

**`LiveActivityToast.vue` (add):**
- Simulated transactions, bottom-left, auto-rotating every 5–8s
- 5 hardcoded messages rotating:
  - "anon@acme.app converted €500 → 0.0086 BTC"
  - "KYC approved in 41s for new user"
  - "Risk check: score 18/100 — cleared automatically"
  - "Partner Acme earned €1.00 on last transaction"
  - "Ledger: double-entry posted — no discrepancy"

### Crypto Product page (`/crypto/product`) — upgrade:

**Modules section (upgrade card grid):**
- Each module card: dark bg, neon border on hover (box-shadow inset), glow on hover
- Add icon per module: custom CSS icons (no image files), neon stroke
- Add "view in demo" link per module → relevant localhost URL

**Architecture diagram section (new):**
- `PaymentFlowSvg.vue` dark theme, full width
- Heading: "THE STACK. NO BLACK BOXES."

### Crypto Pricing page (`/crypto/pricing`) — upgrade:

**Interactive fee calculator (same as Swiss but dark):**
- Same sliders as Swiss, but dark terminal styling
- Receipt card: dark, monospaced, neon accent on fee rows
- Values animate with CSS number flip (each digit rolls up on change)

### Crypto Partners page (`/crypto/partners`) — upgrade:

**"API first" code block section:**
- Show 3 tabs: Widget / REST API / WebSocket
- Each tab: different `CodeBlock.vue` with relevant code
- Tab switching swaps code with a fade transition

**DoD for L-004:**
- [ ] Hero has radial gradient + scanlines + 3 floating coins
- [ ] Receipt card glass wrapper with glow behind it
- [ ] Stats connect to real API count (or at minimum live WS counter)
- [ ] Transaction lifecycle has SVG connector line with traveling dot
- [ ] Live System Pulse section shows animated flow
- [ ] LiveActivityToast appears and rotates every 5–8s (hidden on mobile)
- [ ] Product page cards have neon hover glow
- [ ] Pricing calculator works dark theme, digit-flip animation on change
- [ ] Partners page has 3-tab code block

---

## L-005 Fintech/Institutional Theme — Targeted Additions
**Status: TODO**
**Priority: #3**
**Location:** `apps/landing/src/themes/fintech/`
**Why:** Compliance persona already likes it. Add what makes it unbeatable for due-diligence meetings.

### Fintech Home — add:

**Animated terminal stats (upgrade stats section):**
- Bloomberg-style: amber numbers on dark background, monospaced
- Each stat has a label in smaller text above and a "SOURCE: PRODIGY_SIM" caption below
- Count-up animation on enter with `CounterStat.vue`

**Data comparison table (new section):**
- "How we compare" — same competitor table as Swiss Pricing but styled as a dense data table
- Header row: dark bg, amber text
- Feature rows with checkmarks (✓ in amber, ✗ in muted)

### Fintech Product — add:

**Technical spec sheet section:**
- Two-column layout: left=feature name, right=technical detail
- Rendered as a proper HTML definition list (`<dl>`) for semantics
- Items: API latency (<200ms p99), KYC throughput (300 checks/min), WS events (<50ms delivery), Ledger consistency (double-entry, atomic), Data retention (7 years)

**Architecture diagram (terminal style):**
- `PaymentFlowSvg.vue` with `theme='light'` but amber accent dots
- Heading: "SYSTEM ARCHITECTURE — SPECIFICATION v2.4"

### Fintech Pricing — upgrade:

**Fee schedule as bank document:**
- Table headings styled as banking document (border-top thick rule, column headers in small-caps)
- Add: "Effective date: 2026-07-01" and "Document ref: PRD-FEE-001"
- BPS notation alongside percentage: "50bps (0.50%)"

**DoD for L-005:**
- [ ] Fintech Home stats count up with amber styling
- [ ] Comparison table renders on all viewports
- [ ] Product page has technical spec sheet section
- [ ] Pricing page has bank-document styling with BPS notation

---

## L-006 New Pages — Security, Developers, Case Studies (all themes)
**Status: TODO**
**Location:** Add to each theme's `pages/` folder + register in router
**Why:** Currently 4 pages per theme. These 3 new pages are required for serious B2B evaluation. Missing = lost deal.

### Routes to add (router/index.ts):
```
/[theme]/security      → [Theme]Security.vue
/[theme]/developers    → [Theme]Developers.vue
/[theme]/case-studies  → [Theme]CaseStudies.vue
```
Add to each theme's nav header.

---

### Security Page (`[Theme]Security.vue`)

**Section 1 — Header:**
- Headline: "BUILT FOR REGULATED ENVIRONMENTS" (Swiss: editorial; Crypto: glitch; Fintech: monospaced)
- Sub: Prodigy runs on infrastructure designed to satisfy MiCA, FCA, and internal compliance teams.

**Section 2 — Compliance certifications:**
- 6 cards: MiCA (EU), FCA (UK), PCI DSS Level 1, ISO 27001, SOC 2 Type II, GDPR
- Each card: badge icon (CSS shape), certification name, issuing body, "Demo simulation — not a real license"
- Swiss: white cards with iridescent border; Crypto: dark cards with neon glow; Fintech: table rows

**Section 3 — KYC flow diagram:**
- `PaymentFlowSvg.vue` showing: Applicant → Document Scan → Database Match → Sanctions Check → Risk Score → Decision
- Each node: labeled, color-coded (green=pass, amber=manual, red=fail)
- Label: "Every identity check runs through 4 automated layers before a human ever sees it."

**Section 4 — Audit trail:**
- Animated terminal showing a scrolling list of system events (fake log):
  ```
  2026-06-17 14:23:01.441  KYC_APPROVED     usr_alice  score=12  elapsed=47s
  2026-06-17 14:23:01.882  LEDGER_POSTED    txn_7821   amount=€500  entries=2
  2026-06-17 14:23:02.111  RISK_CLEARED     txn_7821   auto=true
  ```
- Auto-scrolls (new lines appear at bottom, old ones scroll up)
- Link: "See it live in the System Map →" → localhost:5004

**Section 5 — Data residency:**
- `WorldMapSvg.vue` (simplified SVG world map with dots)
- Highlighted: Frankfurt (EU data center), London (UK), Singapore (APAC)
- Label: "Your data stays in the region you configure."

**Section 6 — CTA:**
- "Run the KYC simulator yourself" → localhost:5003 (Sumsub Sim)

---

### Developers Page (`[Theme]Developers.vue`)

**Section 1 — Integration options (4 tabs):**
- Tab 1 — JS Widget: `CodeBlock.vue` with HTML snippet + `selfType=true`
- Tab 2 — REST API: `CodeBlock.vue` with curl example (quote request + response)
- Tab 3 — WebSocket: `CodeBlock.vue` showing WS subscribe + event handling
- Tab 4 — React SDK: `CodeBlock.vue` with `<ProdigyWidget>` component usage
- Each tab: left=code block, right=description + "what you get" bullet list

**Section 2 — API endpoints preview:**
- Table: Method | Endpoint | Description | Auth Required
- Rows: 10 key endpoints (transactions, quotes, kyc, risk, ledger, users, b2b, commissions, widget-configs, system-events)
- Styled as: Swiss=light table, Crypto=dark terminal, Fintech=spec sheet

**Section 3 — Sandbox setup:**
- 3-step numbered flow: "1. Get access → 2. Set b2bClientId → 3. Hit the endpoint"
- Each step: number large, title, description, optional code line
- CTA: "Open the live sandbox" → localhost:5005 (Widget)

**Section 4 — WS event types:**
- Scrollable list of all event types: TRANSACTION_CREATED, KYC_APPROVED, RISK_REVIEW_OPENED, LEDGER_POSTED, etc.
- Each: event name (monospaced), brief description, example payload (collapsed by default, expand on click)
- Connected to actual backend event model

---

### Case Studies Page (`[Theme]CaseStudies.vue`)

**3 simulated client stories:**

**Case 1 — NordPay (fictional neobank, Berlin)**
- Challenge: "We needed crypto in 6 weeks. Our compliance team would not sign off on anything opaque."
- Solution: Prodigy widget with full KYC + transparent fee receipt. Compliance team approved after seeing the audit trail.
- Metrics: 65,000 users onboarded in 90 days · €2.1M transaction volume · 0 regulatory incidents
- Quote: "The receipt motif sold it to our compliance director before the API docs landed." — CTO, NordPay
- Logo: simple letter-mark "NP" in circle

**Case 2 — SwapDeck (fictional crypto exchange, London)**
- Challenge: "We built our own on-ramp. It took 14 months and we still had hidden fee complaints."
- Solution: Replaced custom on-ramp with Prodigy widget in 3 days. Fee receipt shown pre-confirm.
- Metrics: 14 integrations active · 98.3% fee satisfaction rate · €800K dev cost saved
- Quote: "Three lines of HTML. That's it." — Head of Product, SwapDeck

**Case 3 — Meridian Wealth (fictional wealth manager, Zurich)**
- Challenge: "Our institutional clients demanded KYC reuse and audit trails before every meeting."
- Solution: Prodigy KYC + ledger with 7-year event retention. Compliance team uses the admin panel directly.
- Metrics: 100% KYC audit trail coverage · ISO 27001 aligned · Zero compliance escalations

**Layout:**
- Swiss: editorial card grid, large quote typography
- Crypto: dark cards with neon border, metrics in large numbers
- Fintech: table format with data columns

---

**DoD for L-006:**
- [ ] 3 new routes per theme added and registered in router (9 new pages total)
- [ ] All themes' nav headers link to Security, Developers, Case Studies
- [ ] Security: audit trail terminal auto-scrolls, KYC diagram animates
- [ ] Security: WorldMapSvg shows 3 data center dots
- [ ] Developers: tab switching works, code blocks self-type on first reveal
- [ ] Developers: WS events list is expandable per item
- [ ] Case Studies: all 3 simulated clients fully written with metrics
- [ ] All pages mobile-responsive (375px)
- [ ] vue-tsc clean

---

## L-007 Live Data — Connect Landing to Real Backend
**Status: TODO**
**Location:** New composable `apps/landing/src/composables/useBackendData.ts`
**Why:** The landing currently has all hardcoded values. Our backend is running at localhost:3000 with real data. Connecting it makes the demo viscerally real.

### Connect these data points:

**Market prices (ws://localhost:3000/ws):**
- Subscribe to `PRICE_UPDATE` WS events
- Update TickerStrip in all theme headers with live BTC/ETH prices
- Fallback: if WS unavailable (backend not running), show last known static values — no error

**Transaction count (GET /api/transactions):**
- On page mount, fetch total transaction count
- Show in stats bar as: "XX,XXX demo transactions processed"
- CounterStat counts up to this number, not a hardcoded value

**Live transaction toasts (Crypto theme only):**
- Subscribe to WS `TRANSACTION_COMPLETED` events
- Each event: create a `LiveActivityToast` with real user/amount from event payload
- Fallback: rotate hardcoded messages if WS disconnected

### Composable API:
```ts
const { prices, txCount, connected } = useBackendData()
```
- `connected: Ref<boolean>` — true if WS is live
- Graceful degradation: everything still renders if backend is offline — just with static fallback values
- No loading spinners — landing must be instant

**DoD for L-007:**
- [ ] BTC/ETH prices in header update within 3s of backend market tick
- [ ] Stats bar shows real tx count from API on page load
- [ ] Crypto LiveActivityToast shows real TRANSACTION_COMPLETED events when available
- [ ] All values gracefully fallback to statics when backend offline
- [ ] `useBackendData` exported from composables/index.ts and usable in any theme

---

## L-008 Mobile — All Themes Fully Responsive
**Status: TODO**
**Priority: Parallel with L-003/L-004**
**Breakpoints:** 375px (iPhone SE), 768px (tablet), 1024px (laptop), 1440px (desktop)
**Why:** Demo is shown on MacBook but potential partners will share the URL. Must not embarrass.

### Rules (apply to every theme):
- Hero: 1-column on mobile (mockup goes below headline, reduced to 90vw width)
- BrowserMockup: remove 3D tilt on mobile (`rotateY/X = 0`, `float=false`)
- Stats bar: 2×2 grid on mobile (not 4-column row)
- Testimonials: horizontal scroll (snap) on mobile
- Pinned scroll sections: disabled on mobile — show all 3 panels stacked
- Code blocks: horizontally scrollable on mobile
- LiveActivityToast: hidden on mobile (too distracting on small screen)
- Nav: hamburger menu on mobile (simple `v-show` toggle, not a full drawer)
- CoinFloat: smaller on mobile, hidden if viewport < 768px
- Footer: stacked single column

### Test matrix:
- [ ] 375px: all 5 themes' Home page render without horizontal overflow
- [ ] 375px: all nav menus open and close without JS errors
- [ ] 768px: 2-column layouts kick in correctly
- [ ] 1024px: full desktop layout (no intermediate awkward state)
- [ ] Lighthouse mobile score ≥ 85 (performance matters for demo)

---

## L-009 Bold Theme — Upgrade to Match Swiss Depth
**Status: TODO**
**Priority: #4 (after Swiss/Crypto/Fintech)**
**Location:** `apps/landing/src/themes/bold/`
**Why:** Bold has unique editorial aesthetic (black/white halves, iridescent bar). It's the "Tempo-editorial" variant. Needs content parity with Swiss.

### Bold Home (already updated by builder — verify and extend):
- Check: Does it have animated stats? → If not, add `CounterStat.vue` in the existing `metrics` section
- Add: Testimonials section (reuse content from Swiss, different layout — large blockquote style)
- Add: BrowserMockup in hero (replace or supplement existing widget card)
- The KYC terminal section is already there (good) — add `PaymentFlowSvg.vue` below it

### Bold Product, Pricing, Partners:
- Product: add pinned scroll section (same as Swiss, bold styling)
- Pricing: add interactive fee calculator (same logic as Swiss, bold styling)
- Partners: add revenue calculator + code block

**DoD for L-009:**
- [ ] Bold Home has animated stats counter
- [ ] BrowserMockup in hero (floating)
- [ ] Product has pinned scroll feature section
- [ ] Pricing has fee calculator
- [ ] Partners has revenue calculator

---

## L-010 Theme Picker Page — Make It a Demo Closer
**Status: TODO**
**Location:** `apps/landing/src/pages/ThemeIndex.vue`
**Why:** `/` is the first page someone visits. Currently likely a simple list. Should be a visual showcase.

### Redesign:
- 5 full-height preview cards (one per theme) in a horizontal scroll layout
- Each card: theme name, short audience label ("For B2B sales", "For developers", "For compliance teams"), theme-colored preview thumbnail (CSS mockup, not a real screenshot)
- Hover: card expands slightly, shows 2-line description
- Click: navigates to `/[theme]`
- Active indicator: animated border around card on hover
- Heading above: "PRODIGY DEMO — 5 VISUAL DIRECTIONS"
- Sub: "Each theme targets a different buyer persona. Open one, come back and try another."

**DoD for L-010:**
- [ ] 5 cards visible (or horizontal scroll on mobile)
- [ ] Each card links to correct theme
- [ ] Hover animation works
- [ ] Page renders instantly (no async loads on mount)
- [ ] Mobile: cards stack vertically (no horizontal scroll at 375px)

---

## L-011 SaaS & Gradient Themes — Minimal Upgrade
**Status: TODO**
**Priority: Last**
**Location:** `apps/landing/src/themes/saas/`, `apps/landing/src/themes/gradient/`
**Why:** These themes exist but weren't in the audience test. They need content parity at minimum — not a deep visual upgrade.

### Both themes:
- Add animated stats bar (reuse `CounterStat.vue`)
- Add testimonials section (same content as Swiss, different style)
- Add trust logo strip (`TrustLogoStrip.vue`)
- Add "Embed in 3 Lines" code block section
- Add Security + Developers + Case Studies pages (copy content from Swiss, adjust styling)

**DoD for L-011:**
- [ ] SaaS and Gradient themes both have stats, testimonials, trust strip, code block
- [ ] Both have Security/Developers/Case Studies pages registered in router and linked from nav

---

## L-012 Performance & Polish Pass
**Status: TODO — runs last, after L-001 through L-011**
**Why:** Visual upgrades often introduce performance issues. This task fixes them before demo day.

### Checks:
- [ ] `pnpm build:landing` — zero TypeScript errors, zero unused imports
- [ ] Lighthouse Desktop score ≥ 90 on Swiss Home
- [ ] Lighthouse Mobile score ≥ 80 on Swiss Home
- [ ] No layout shifts (CLS = 0) — all animations use `transform` only
- [ ] All images served as WebP (not PNG/JPG)
- [ ] BrowserMockup screenshots compressed to <80KB (WebP, 800×600)
- [ ] CoinFloat GPU composited (add `will-change: transform` only on the spinning element)
- [ ] Particle canvas pauses when tab is hidden (`document.addEventListener('visibilitychange')`)
- [ ] All external links have `rel="noopener noreferrer"`
- [ ] No `console.log` statements in production build
- [ ] All components have `aria-label` on decorative sections (`aria-hidden="true"`)
- [ ] Font loading: use `font-display: swap` in CSS @font-face
