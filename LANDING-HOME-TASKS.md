# Landing Homepage Enhancement Tasks

**For:** Website developer  
**Context:** 5 theme homepages at localhost:5010 (/, /gradient, /saas, /bold, /crypto). Each already has a solid foundation — Three.js 3D backgrounds, animation composables (GSAP, scroll reveal, split reveal, text scramble, typewriter, magnetic button, card tilt), and shared components (BrowserMockup, WidgetDemo, CounterStat, PaymentFlowSvg, TrustLogoStrip, LiveActivityToast, etc.).  
**Goal:** Elevate each homepage to best-in-class territory. Better first impression, more scroll depth, world-class animations. Art direction: 20 years of experience looking at this, knowing what moves people.

---

## ANIMATION INFRASTRUCTURE (required first, used across all themes)

### ANIM-001 — Scroll-driven progress bar
**File:** `apps/landing/src/App.vue` or each theme Layout  
Add a 2px top-edge progress bar that fills as the user scrolls the page. Color matches the theme accent. Implemented with `window.scrollY / (document.body.scrollHeight - window.innerHeight)` on a `<div>` with `position:fixed; top:0; left:0; height:2px; z-index:9999`. Use `will-change: width` for GPU compositing.

### ANIM-002 — `useParallax` composable
**File:** `apps/landing/src/composables/useParallax.ts`  
Create a new composable that accepts `(elementRef, speed = 0.3)` and applies `transform: translateY(Xpx)` based on scroll position relative to the element. Returns `{ style }` for `:style` binding. Used in hero sections to give depth to background blobs and floating cards.

```ts
export function useParallax(el: Ref<HTMLElement | null>, speed = 0.3) {
  const style = ref<CSSProperties>({})
  // IntersectionObserver + requestAnimationFrame pattern
  // translateY = (scrollY - elementTop) * speed
}
```

### ANIM-003 — `useCountOnEnter` composable improvement  
**File:** Already exists as CounterStat component. Enhancement: Add a `once` flag (default true) and an `easing: 'ease-out-expo' | 'ease-out-quart'` option. Ease-out-expo makes numbers feel more alive — fast start, slow finish.

### ANIM-004 — Staggered card entrance
**File:** `apps/landing/src/composables/useStaggerReveal.ts`  
New composable: accepts `(containerRef, childSelector, options)`. On first intersection of container, applies GSAP stagger to all matching children: `gsap.fromTo(children, { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, ease: 'power3.out', duration: 0.6 })`.

---

## SWISS THEME — localhost:5010/

**Art direction:** Swiss International Typographic Style. Helvetica energy. Grid-strict. Black, white, one accent (iris blue `#0ea5e9`). Every element earns its place. No decoration — all function. Reference: SBB timetables, Massimo Vignelli NYC Subway map, Müller-Brockmann poster grid.

**Current section count:** 13 sections. Target: 18 sections.

**File:** `apps/landing/src/themes/swiss/pages/SwissHome.vue`

---

### SW-001 — Hero: Animated headline with letter spacing breath
**Current:** Static headline `CRYPTO / THAT / EXPLAINS / ITSELF.` with clip reveal.  
**Enhancement:**
- On load, each word starts at `letter-spacing: 0.3em` and animate to `letter-spacing: -0.02em` using GSAP timeline, stagger 0.15s per word, duration 0.8s, ease `expo.out`.
- Behind the headline, draw a thin 1px grid of horizontal lines (CSS `repeating-linear-gradient`) that slowly reveals top-to-bottom via `clip-path: inset(0 0 100% 0)` → `inset(0 0 0% 0)`, duration 1.2s delay 0.3s.
- The `SwissFloatingPlanes` 3D background should parallax at `useParallax(hero, 0.2)` — moves up slowly as user scrolls down, creating depth.

### SW-002 — NEW SECTION: "The Problem" — Before/After split
**Insert after:** Animated Stats Row (currently at line 110)  
**Design:** Full-width 2-column split with a crisp 1px vertical dividing line (the Swiss "axis").
- Left column — dark background (`#0f0f0f`): Title `"The old way"`. Below: a bulleted list with typewriter effect (use `useTypewriter`) listing: `⊘ 6-month compliance integration`, `⊘ 3 vendors for KYC, FX, ledger`, `⊘ Your team debugging midnight settlement failures`, `⊘ Month-end CSV reconciliation`.
- Right column — white background: Title `"Prodigy"` with iris accent. Same list but with checkmarks: `✓ One afternoon to integrate`, `✓ KYC, ledger, partner revenue — one API`, `✓ Realtime admin console`, `✓ Revenue posts per transaction`.
- Animation: When section enters viewport (`useScrollReveal`), the dividing line "draws" from top to bottom (height 0 → 100% via CSS transition). Then left column slides in from left, right column from right, `gsap.from({ x: -40 })` and `gsap.from({ x: 40 })`, stagger 0.1s per list item.

### SW-003 — NEW SECTION: "6 Live Apps" product grid
**Insert after:** SW-002  
**Design:** Section headline: `"One integration. Six live apps. Try them now."` Syne Bold 48px.  
Below: 3-column grid of 6 cards, each with:
- App number (`01` — `06`) in monospace small caps
- App name (`Consumer`, `Admin`, `KYC Simulator`, `System Map`, `Widget`, `Partner Portal`)
- One-line description
- A port badge: `localhost:5001` in monospace
- Hover: card lifts `translateY(-4px)`, left border becomes 3px iris accent. Use `useCardTilt` with `maxTilt: 3, glowColor: '#0ea5e9'`.
- Card is `<a href="http://localhost:500X">` — real clickable links.

**Cards:**
1. Consumer · `5001` · "Wallet, send, receive, KYC — the full user journey"
2. Admin · `5002` · "Transaction monitoring, KYC review, fee configuration"  
3. KYC Simulator · `5003` · "Test identity verification without real documents"
4. System Map · `5004` · "Architecture diagram of the running system"
5. Widget · `5005` · "Embeddable crypto on-ramp — one script tag"
6. Partner Portal · `5006` · "Commission tracking and API key management"

### SW-004 — Hero right side: Replace BrowserMockup with live-data version
**Current:** BrowserMockup with hardcoded `style=""` inline HTML.  
**Enhancement:** Replace the hardcoded numbers with `useBackendData()` composable (already exists — reads from `localhost:3000`). If backend unreachable, show same fallback numbers. Add a `● LIVE` pulsing green dot indicator in the browser's URL bar area. Numbers should count up on first render using `animateMetric` pattern (already used in GradHome).

### SW-005 — NEW SECTION: "The Compliance Promise" — horizontal rule design
**Insert before:** Testimonials  
**Design:** Full-width dark section (`#0f0f0f`). A single bold statement in the center, massive type (clamp 3rem → 6rem), white, Syne ExtraBold:  
`"Every fee visible before confirm. Every decision logged. Every transaction reconcilable."`  
- The text is centered, max-width 900px.
- Each sentence is on its own line.
- On scroll-enter: `useSplitReveal` per sentence, `type: 'lines'`, stagger 0.2s, `y: 60`, duration 1.0s, ease `power4.out`.
- Below the text: a thin white horizontal rule (1px) that draws left-to-right (`scaleX: 0 → 1`, transform-origin left).

---

## GRADIENT THEME — localhost:5010/gradient

**Art direction:** Gen-Z bold energy. Figma/Linear meets Stripe 2024. Aurora mesh gradients, frosted glass, motion that feels alive. Purple-to-pink-to-amber gradient is the soul. Every scroll should reveal something surprising. Reference: Figma homepage, Linear landing, Vercel dark mode.

**Current section count:** 14 sections. Target: 18 sections.

**File:** `apps/landing/src/themes/gradient/pages/GradHome.vue`

---

### GR-001 — Hero: Floating cards get GSAP physics
**Current:** Cards positioned with CSS `rotate(-2deg)` / `rotate(3deg)` — static.  
**Enhancement:**
- Wrap the `.cards-cluster` in a ref and apply independent GSAP float animations to each card:
  - Wallet card: `gsap.to('.wallet-card', { y: '-=12', duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut' })`
  - Income card: same but `duration: 2.5, delay: 0.5`
  - Outcome card: `duration: 3.2, delay: 1`
  - Suggestions card: `duration: 2.8, delay: 0.8`
- On hero enter: cards fly in from `{ opacity: 0, y: 60, scale: 0.92 }` with `stagger: 0.12`.
- Mouse parallax on the entire `.cards-cluster`: bind `mousemove` on the hero section, map mouse position to `rotateX/rotateY ±8deg` on the cluster using GSAP `quickTo` for smooth 60fps tracking.

### GR-002 — NEW SECTION: "Revenue calculator" — interactive slider
**Insert after:** How it works (3-step cards)  
**Design:** Dark section (`#0f0a1e`). Title: `"Calculate your revenue share"`. Subtitle: `"Move the sliders. Watch the money."`.  
Three sliders:
1. **Monthly transactions** — 100 → 10,000 (default 500)
2. **Average transaction size** — $50 → $5,000 (default $200)
3. **Your platform fee** — 0.1% → 2.0% (default 0.5%)

Live calculation output (large number, updates on slider input):
- **Monthly platform fee revenue:** `transactions × avg_size × fee_rate`
- **Per-transaction partner revenue:** `avg_size × fee_rate / 100`
- Animated number update: on each slider change, GSAP animate the number from current to new value in 0.4s, `ease: power2.out`.

Sliders: style as custom range inputs with a gradient thumb (violet → pink). The track fill should update via CSS custom property.

Use `useRevenueCalc.ts` (already exists!) — wire it in.

### GR-003 — NEW SECTION: "Build vs Buy" — animated comparison
**Insert after:** Revenue calculator  
**Design:** Light section with aurora glow background. 3-column comparison:
- Column 1: `"Build it yourself"` — estimated cost breakdown with red X marks. Items animate in one by one with a typewriter effect: `"$120k engineering"`, `"6-month timeline"`, `"3 compliance vendors"`, `"Ongoing maintenance"`, `"Total: ~$180k/year"`. Final total in red.
- Column 2: `"Prodigy"` — green checkmarks, cost items. Items reveal with green flash animation (`background: rgba(34,197,94,0.15)` brief highlight). `"One script tag"`, `"One afternoon"`, `"Built-in KYC + AML"`, `"Revenue share model"`, `"Total: $0 upfront"`. In violet.
- Divider between columns: animated gradient border that pulses.

### GR-004 — Hero: Add morph background animation  
**Current:** Three static mesh blobs (`.mesh-blob-1/2/3`).  
**Enhancement:** Add CSS `@keyframes blob-morph` — animate `border-radius` from `60% 40% 30% 70% / 60% 30% 70% 40%` through 4 keyframes back to start. Apply to each blob with different durations (8s, 12s, 10s) and delays. This creates organic, breathing shapes without JS.

---

## SAAS THEME — localhost:5010/saas

**Art direction:** Enterprise B2B software. Think Stripe, Vercel, Linear. Dark hero, then bright white sections. Strict grid, subtle shadows, no flashy color. The credibility comes from restraint. Every element says "this is serious software." Reference: Stripe Payments page 2024, Linear.app homepage, Vercel dashboard.

**Current section count:** 14 sections. Target: 19 sections.

**File:** `apps/landing/src/themes/saas/pages/SaasHome.vue`

---

### SA-001 — Hero browser mockup: Animate the dashboard
**Current:** Browser mockup with static HTML — numbers don't move, table doesn't change.  
**Enhancement:** Make the dashboard "live":
- Every 3 seconds, one table row briefly highlights (`background: rgba(79,70,229,0.08)` → normal, 0.6s transition).
- The `$2.4B` volume counter inside the mockup increments by a random small amount (€840 → €841 → €842) every 4 seconds.
- The three stat cards' `↑12.4%` delta randomly oscillates ±0.1% on a 5s interval.
- The `● LIVE` dot (add one to the URL bar) pulses with CSS animation.
- All changes use `transition: all 0.3s ease`.

### SA-002 — NEW SECTION: "Integration speed" — code reveal
**Insert after:** Feature Tabs section  
**Design:** Dark section (`#0f172a`). Left: text content. Right: animated code block.  
Left side:
- Eyebrow: `DEVELOPER EXPERIENCE`
- Headline: `"Ship crypto in 5 minutes, not 5 months"`
- 3 time comparison rows with animated counters:
  - `Traditional integration → 4-6 months`
  - `Typical fintech vendor → 3-4 weeks`  
  - `Prodigy → 1 afternoon` (highlighted in green)
- CTA: `"Read the docs →"`

Right side: `<CodeBlock>` (already imported) showing the install + init code. Enhancement: add line-by-line reveal animation — each line appears sequentially with a 120ms delay, like a typewriter but per-line. Use `useTypewriter` composable per line, or GSAP `stagger` on `.code-line` elements after splitting by newline.

### SA-003 — NEW SECTION: "What your compliance team asks for"
**Insert after:** Integration speed section  
**Design:** Light surface section. Headline: `"Built for the questions you'll get asked."`. Subtitle: `"Before you ship, your compliance team has a checklist. Prodigy checks every box."`.  
Format: Accordion FAQ — 6 items. Each question is an `<details>`/`<summary>` styled element. On open: content slides down with CSS `max-height` transition. Icon rotates 180° on open.

Questions:
1. `"Do users see fees before they confirm?"` → "Yes. Every fee is disclosed at amount-entry and at confirmation. MIFID-aligned."
2. `"Where is identity data stored?"` → "Inside the KYC widget. Your platform never touches raw documents."
3. `"Can I export transaction data for regulators?"` → "One-click export for any date range, in the format regulators expect."
4. `"What happens when a transaction is flagged?"` → "Automated AML check runs. If flagged, enters a manual review queue visible in your admin console."
5. `"Is there an audit trail?"` → "Every action — KYC decision, fee change, transaction — logged with timestamp, actor, and outcome."
6. `"Who sees what in the admin?"` → "Role-based access: operations sees everything, partners see their data only, compliance gets the export."

Animation: On page load, items start `opacity: 0`. First scroll to section triggers stagger reveal (GSAP, `y: 20 → 0`, stagger 0.07s).

### SA-004 — NEW SECTION: "Uptime & reliability"
**Insert after:** Product Metrics  
**Design:** Dark section (`#0f172a`). Display a 90-day uptime grid — 90 small colored squares (green = up, one or two grey = maintenance). Below: three big KPI numbers with `CounterStat`:
- `99.99% uptime` / `< 200ms P99` / `< 2s settlement`
- Add a subtle animated line chart below the grid (SVG, 12 data points, uses GSAP to draw the path `stroke-dashoffset` from length → 0 on viewport enter).

### SA-005 — Hero email form UX enhancement
**Current:** Email form is just input + button, no interaction feedback.  
**Enhancement:**
- On submit: button shows a loading spinner for 1.2s, then transitions to `"Demo sent →"` with a green checkmark, button stays green for 2s.
- If email field is empty on submit: `shake` animation on the input (GSAP `gsap.fromTo(input, { x: -8 }, { x: 0, ease: 'elastic.out(1,0.3)', duration: 0.4 })` 3 times).
- Form border color transitions to `--accent` on focus.

---

## BOLD THEME — localhost:5010/bold

**Art direction:** Editorial brutalism. New York Magazine meets Bloomberg Terminal. High contrast. Impact-weight sans-serif headings. Black, white, electric yellow `#FFE500`. Sections that feel like full-bleed magazine spreads. Animation: heavy, decisive — nothing subtle. Think physical weight landing. Reference: The Verge old design, Bloomberg Terminal UI, Cargo Collective 2023 portfolios.

**Current section count:** 16 sections. Target: 20 sections.

**File:** `apps/landing/src/themes/bold/pages/BoldHome.vue`

---

### BO-001 — Hero: Add scramble text effect on headline
**Current:** Two-panel hero — black left panel (live activity) + grid paper right panel (headline).  
**Enhancement:**
- Use `useTextScramble` (already exists) on the right panel headline.
- On page load, the headline scrambles for 800ms then resolves to its final text.
- Add a blinking cursor character (`|`) that continues blinking for 2s after text resolves, then fades out.
- The `BoldPolyhedron` 3D background: add mouse tracking — on `mousemove` over the right panel, `BoldPolyhedron` subtly rotates toward the cursor. Pass `mouseX, mouseY` as props.

### BO-002 — NEW SECTION: "Real numbers" — giant stat wall
**Insert after:** Comparison section (currently after Stats Grid)  
**Design:** Full-bleed black section. No padding top. Four massive statistics displayed in a 2x2 grid. Each stat takes up ~1/4 of the screen:
- `€2.4B` / `Volume processed` / (in electric yellow)
- `47s` / `Average KYC completion` / (in white)
- `0.5%` / `Platform fee. Flat. Always.` / (in yellow)
- `99.97%` / `Settlement success rate` / (in white)

Typography: stat value in Impact or Anton, `font-size: clamp(5rem, 12vw, 10rem)`, label in `Inter` 14px uppercase letter-spaced. The numbers count up with `CounterStat` when in viewport. Between stats: 1px white dividing lines.

### BO-003 — Alternating feature sections: Add interactive element per section
**Current:** 3 alternating sections (Feature 01/02/03) with text + mockup placeholder card.  
**Enhancement:** Replace the generic mockup card in each feature section with a specific interactive element:
- **Feature 01 (Embed):** A live `<CodeBlock>` showing embed code with a "Copy" button that flashes `"Copied!"` on click.
- **Feature 02 (KYC):** An animated KYC status timeline: 5 steps (Identity submitted → Documents reviewed → AML check → Approved → Active) with a progress dot that animates across steps on viewport enter. Each step label types in sequentially.
- **Feature 03 (Revenue):** A mini bar chart (SVG) showing 30 days of commission earnings. Bars animate height from 0 on viewport enter. Hovering a bar shows a tooltip with `"€XX.XX commission"`.

### BO-004 — NEW SECTION: "The audit trail" — terminal UI
**Insert after:** PaymentFlowSvg section  
**Design:** Dark section (`#0a0a0a`), yellow accent. Title: `"EVERY ACTION. LOGGED."` in Impact/Anton.  
A terminal-style log display — a monospaced scrolling list of log entries. Entries appear one by one (typewriter, 150ms interval) from bottom up:

```
[09:14:02] KYC approved — user USR-2847 — doc: Passport — 47s
[09:14:05] Transaction TXN-8831 created — €240.00 EUR → BTC
[09:14:07] AML check PASS — risk score: LOW — counterparty: clean
[09:14:09] Market executed — 0.00312 BTC @ €76,923
[09:14:11] Ledger updated — net: €238.80 — fee: €1.20
[09:14:11] Partner commission posted — €0.48 → NordPay
[09:14:11] Transaction complete — user notified
```

After all entries load, new entries keep appearing every 4s (cycle through a longer list). Background is `#0a0a0a`. Text: green for approved/complete, yellow for fees, white for actions. Monospace font (`Space Mono`).

### BO-005 — CTA section: Make it bold in the literal sense
**Current:** Standard dark CTA with headline and two buttons.  
**Enhancement:**
- Background: `#FFE500` (electric yellow) — the entire CTA section is yellow. Text is `#000000` (black). A total visual shock after dark sections.
- Headline in Impact 72px: `"START TODAY."`
- Subtext: `"No contract. No minimum. One script tag."` in 18px.
- Single button: `"Open the demo"` — black background, white text, bold 700. On hover: invert to white background, black text.
- Add the same left-panel / right-panel split from the hero: left is yellow with text, right is black with a quoted testimonial in white.

---

## CRYPTO THEME — localhost:5010/crypto

**Art direction:** Dark technical excellence. This is for builders who live in terminals. Matrix green + electric purple. Everything should feel like it's interfacing with a live blockchain. References: Etherscan.io redesign (if it had a good design team), Ledger.com, 1inch.io, Uniswap dark mode.

**Current section count:** 17 sections. Already the richest page. Target: 20 sections.

**File:** `apps/landing/src/themes/crypto/pages/CryptoHome.vue`

---

### CR-001 — Hero: CoinFloat cluster — add real-time price animation
**Current:** `CoinFloat` cluster with static prices.  
**Enhancement:**
- Each coin price (BTC, ETH, USDC etc.) should "tick" every 2–3s — a small random change of ±0.08%, shown as a number that briefly highlights green (up) or red (down).
- On price change: number transitions with a quick scale pulse: `gsap.fromTo(priceEl, { scale: 1.15, color: changeColor }, { scale: 1, color: 'white', duration: 0.4 })`.
- Add one more coin: SOL or USDT.

### CR-002 — NEW SECTION: "Multi-chain status board"
**Insert after:** System Status section  
**Design:** Dark terminal-style section. Title: `"NETWORK STATUS"` in monospace.  
Display a live-looking status table:

| Network | Status | Block | TPS | Latency |
|---|---|---|---|---|
| Ethereum | ● LIVE | #21,847,229 | 14.2 | 12ms |
| BNB Chain | ● LIVE | #44,219,881 | 87.1 | 3ms |
| Polygon | ● LIVE | #66,112,447 | 128.4 | 2ms |
| Bitcoin | ● LIVE | #891,442 | 3.7 | 10min |

Every 3s: one row's block number increments, TPS fluctuates ±5, latency fluctuates ±2ms. These are simulated. Note "(simulated)" in a small disclaimer.

Use CSS `font-family: 'Space Mono', monospace`. Green dots pulse. Each row has `border-bottom: 1px solid rgba(255,255,255,0.07)`.

### CR-003 — Feature hex grid: Add hover tooltip with real content
**Current:** Hex grid with feature titles only.  
**Enhancement:**
- Each hex becomes interactive. On hover: a tooltip/popover slides up (translateY: 10px → 0, opacity 0 → 1, 0.2s) showing 2-3 lines of description for that feature.
- On click: same hex zooms slightly (`scale: 1.05`), color shifts from outline to filled.
- Tab/keyboard accessible (`:focus-visible` styles matching hover state).

### CR-004 — NEW SECTION: "Transaction fee anatomy" — animated breakdown
**Insert after:** Partner revenue section  
**Design:** Dark section. Title: `"Where does the fee go?"`. Show a fee breakdown for a sample €200 transaction:

```
Transaction: €200.00

├── Platform fee (0.5%):           €1.00
│   ├── Partner share (40%):        €0.40 → NordPay
│   └── Prodigy operating (60%):    €0.60
│
├── Network gas fee:               €0.08 (shown to user)
│
└── User receives:                 €198.92 equivalent in BTC
```

Animation: Each line appears sequentially (typewriter, 100ms per line). The numbers "fill in" last with a count-up effect. The tree lines (`├──`, `│`) draw in with CSS `clip-path` left-to-right.

After the tree: a simple visual breakdown bar — a horizontal pill showing the percentage split between user, partner, and Prodigy portion. The bar fills left-to-right on enter, with labeled segments.

### CR-005 — Live network terminal: Add keyboard feel
**Current:** Terminal simulation already exists (line 482–587).  
**Enhancement:**
- Add a `>` input line at the bottom that is focusable.
- On focus, the cursor blinks.
- Accept 3 commands: `status`, `txlist`, `fees`. Each command "runs" (shows a loading `...` for 400ms) then outputs 3-4 relevant lines.
- Other input: shows `"command not found: [input]"`.
- This makes the section interactive — users feel like they're touching the system.

---

## CROSS-THEME IMPROVEMENTS (apply to all 5)

### ALL-001 — Section transitions: No hard cuts
Every section transition (where background color changes) should use an overlapping or diagonal clip. Add `clip-path: polygon(0 0, 100% 0, 100% calc(100% - 4rem), 0 100%)` to sections that transition from dark to light, or vice versa. This creates a subtle diagonal seam instead of a hard horizontal cut. Not applicable to every section — only where dark and light sections are adjacent.

### ALL-002 — Reduced motion support
All GSAP animations and CSS keyframe animations must respect `prefers-reduced-motion: reduce`. In each composable that uses GSAP, check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` and skip the animation (set final state immediately). For CSS animations in `<style scoped>`, add:
```css
@media (prefers-reduced-motion: reduce) {
  .marquee-track { animation: none; }
  .ticker-track { animation: none; }
  /* etc */
}
```

### ALL-003 — Image/section lazy loading
For sections not visible on first load, add `loading="lazy"` to any images and use `IntersectionObserver` for section content that can defer rendering. Currently some themes load all section content eagerly.

### ALL-004 — Mobile hero: Reduce complexity on < 768px
On mobile, floating card clusters (Gradient hero), dual-panel hero (Bold), and complex Three.js backgrounds may be slow. On mobile:
- Gradient: stack cards vertically instead of absolute-positioned cluster. Remove CSS `rotate()` transforms.
- Bold: Switch to single-panel layout (right panel below left).
- Three.js backgrounds: They already render on mobile, but add `pixelRatio: Math.min(window.devicePixelRatio, 1.5)` to WebGL renderers to cap resolution on low-end devices.

---

## PRIORITY ORDER

**Day 1:** ANIM-001, ANIM-004, GR-001 (floating card GSAP), SA-001 (live dashboard mockup), SW-001 (hero letter-spacing)  
**Day 2:** SW-002, SW-003, GR-002, SA-002, BO-001  
**Day 3:** BO-002, BO-003, CR-001, CR-002, ALL-001  
**Day 4:** GR-003, SA-003, BO-004, CR-004, ALL-002  
**Day 5:** SW-004, SW-005, SA-004, SA-005, BO-005, CR-003, CR-005, ALL-003, ALL-004

Total new sections: 17 across 5 themes. Total animation enhancements: 10 existing sections upgraded.

---

## ACCEPTANCE — what "done" looks like per theme

**Swiss:** Homepage feels like a Vignelli poster. Minimal but every element has weight. The Before/After split section should feel like turning a page. The 6-app grid should make a product manager want to click everything.

**Gradient:** Feels like a Figma or Linear homepage. Floating cards move independently and respond to mouse. The revenue calculator is the kind of interactive section that gets screenshotted and shared. Scroll is fluid, colorful, fun.

**SaaS:** The browser mockup in the hero looks alive — numbers change, rows highlight. The compliance FAQ answers questions before a sales call is needed. Feels like Stripe took fintech seriously.

**Bold:** Visual shock on every section transition. The yellow CTA is a gut-punch in a good way. The audit trail terminal feels like actual logs running. The stat wall makes numbers feel massive and real.

**Crypto:** The network status board should make a blockchain developer lean forward. The fee anatomy section is a teaching moment. The terminal accepts commands — users play with it. Dark, technical, alive.
