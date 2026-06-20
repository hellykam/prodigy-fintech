# Landing — Developer Tasks
_Separate from product app tasks. Only for: `apps/landing/`_
_Research basis: `docs/research/landing-visual-research.md`_
_Updated: 2026-06-18_

---

## State of Play

### Shared components — ALL BUILT ✅
`apps/landing/src/components/shared/`:
BrowserMockup, CodeBlock, CoinFloat, CounterStat, LiveActivityToast, PaymentFlowSvg, PhoneMockup, ReceiptCard, TrustLogoStrip

### Pages per theme — current state

| Theme | Home | Product | Pricing | Partners | Security | Developers | Case Studies |
|---|---|---|---|---|---|---|---|
| Swiss `/swiss` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ file missing |
| Crypto `/crypto` | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Bold `/bold` | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Fintech `/fintech` | ✅ | ✅ | ✅ | ✅ | ❌ no route | ❌ no route | ❌ no route |
| SaaS `/saas` | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Gradient `/gradient` | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |

Routes for Security/Developers/Case Studies already added to `router/index.ts` for Swiss, Crypto, Bold, SaaS, Gradient — but the **Vue files don't exist yet** (router will 404). Swiss Security + Swiss Developers are the only ones that have actual files.

### Home page content depth — what's missing everywhere

Every theme's Home is missing: animated stats, fee calculator, testimonials, trust logo strip, "Embed in 3 lines" code section. These are identical content sections reused across all themes with different styling.

---

## Priority Order

**Do in this order:**
1. LD-001 — missing page files (routes already wired, just files needed)
2. LD-002 — Fintech theme Security/Developers/Case Studies (needs routes too)
3. LD-003 — Home upgrades for all themes (high visual impact, same content reused)
4. LD-004 — Live data from backend
5. LD-005 — Pricing page calculator
6. LD-006 — Theme picker `/` page upgrade
7. LD-007 — Animation system
8. LD-008 — Mobile pass
9. LD-009 — Performance & a11y

---

## LD-001 Create Missing Page Files (routes already wired, files don't exist)
**Status: TODO**
**Impact: Critical — routes 404 without the files**

### What to create:

**Swiss:** `SwissCaseStudies.vue` only (Security + Developers already done)

**Crypto** (copy Swiss styling adapted to dark theme):
- `CryptoCaseStudies.vue`
- `CryptoSecurity.vue`
- `CryptoDevelopers.vue`

**Bold** (copy Swiss content, Bold's black/white editorial styling):
- `BoldCaseStudies.vue`
- `BoldSecurity.vue`
- `BoldDevelopers.vue`

**SaaS** (copy Swiss content, clean light SaaS styling):
- `SaasCaseStudies.vue`
- `SaasSecurity.vue`
- `SaasDevelopers.vue`

**Gradient** (copy Swiss content, soft mesh/gradient styling):
- `GradCaseStudies.vue`
- `GradSecurity.vue`
- `GradDevelopers.vue`

### Content spec for each page type (same across all themes):

**Case Studies** — 3 simulated client stories:
1. **NordPay** (fictional neobank, Berlin) — 65K users, €2.1M volume, 0 regulatory incidents. Quote: "The receipt motif sold it to our compliance director before the API docs landed." — CTO, NordPay
2. **SwapDeck** (fictional crypto exchange, London) — 3-day integration, 98.3% fee satisfaction. Quote: "Three lines of HTML. That's it." — Head of Product, SwapDeck
3. **Meridian Wealth** (fictional wealth manager, Zurich) — 100% KYC audit trail, ISO 27001 aligned. Compliance team uses admin panel directly.

**Security** — 5 sections:
1. Hero headline + sub
2. KYC architecture: 3-step flow diagram (use `PaymentFlowSvg`)
3. Certifications: 6 badges (MiCA, FCA, PCI DSS Level 1, ISO 27001, SOC 2, GDPR) — note: "(Demo — not a real license)"
4. Audit trail: scrolling fake log terminal (CSS animation, no JS needed — just CSS marquee on a pre block)
5. CTA: "Run the KYC simulator yourself" → localhost:5003

**Developers** — 5 sections:
1. Hero
2. Quick start: HTML embed code block (reuse `CodeBlock` shared component)
3. Integration options: 3 tabs (Widget / REST API / WebSocket) — each tab has a `CodeBlock` with relevant code
4. API endpoints table: 10 key endpoints, method + URL + description columns
5. CTA: "Open the live sandbox" → localhost:5005

### Adapting styles across themes:
- Dark theme (Crypto): inherit dark bg `#050510`, neon accents, monospaced fonts
- Bold: black/white halves, condensed typography, red/iris accents
- SaaS: white bg, blue accents, card-based layout
- Gradient: white/soft mesh bg, purple gradient accents

**DoD:**
- [ ] `pnpm dev:landing` — navigating to every route in the router returns a rendered page (no 404, no blank)
- [ ] All 6 themes have Security, Developers, Case Studies pages with real content
- [ ] All 3 client stories fully written with metrics and quotes
- [ ] CodeBlock components used for all code examples (no raw `<pre>` without the component)
- [ ] vue-tsc clean

---

## LD-002 Fintech Theme — Add Security/Developers/Case Studies + Router
**Status: TODO**
**Why separate from LD-001:** Fintech theme has NO routes for these pages. Both router registration AND file creation needed.

**Add to `router/index.ts`** under `/fintech`:
```ts
{ path: 'security', component: () => import('@/themes/fintech/pages/FintechSecurity.vue') },
{ path: 'developers', component: () => import('@/themes/fintech/pages/FintechDevelopers.vue') },
{ path: 'case-studies', component: () => import('@/themes/fintech/pages/FintechCaseStudies.vue') },
```

**Add links to `FintechNav.vue`** (or wherever Fintech navigation lives).

**Create 3 files** — same content as LD-001 but in Bloomberg/institutional style:
- Dense monospace typography, amber accent, dark rows
- Certifications as a spec table (not cards)
- API endpoints formatted like a technical reference document
- Case studies formatted as data rows with metrics in columns

**DoD:**
- [ ] `/fintech/security`, `/fintech/developers`, `/fintech/case-studies` all render
- [ ] Nav links present in Fintech theme

---

## LD-003 Home Page Upgrades — All Themes
**Status: TODO**
**Same content sections, adapted per theme. Build once with Swiss, then adapt.**

### Section A: Animated Stats Bar
Add after the hero section on every Home page.

4 stats (use `CounterStat` shared component):
- **$2.4B** — Simulated Transaction Volume
- **45,000+** — Demo Transactions Run
- **93.1%** — First-Pass KYC Rate
- **47s** — Average KYC Completion

Trigger: count up from 0 when section enters viewport (IntersectionObserver, already in `CounterStat`).

Typography sizing: 80px on desktop / 48px on mobile. All caps labels below.

Styling per theme:
- Swiss: 96px Barlow Condensed, thin bottom border rule
- Crypto: neon green numbers on dark bg, monospaced labels
- Bold: massive Barlow Condensed black, red/iris accent on the €2.4B
- Fintech: amber numbers, monospaced, Bloomberg-style `SOURCE: PRODIGY_SIM` caption below each
- SaaS/Gradient: blue numbers, clean sans-serif

### Section B: Testimonials (3 quotes)
Add after How It Works section.

Quotes (same content all themes):
1. "The fee receipt closed the deal with our compliance director. She'd never seen anything like it." — Sarah K., CFO at NordPay (fictional)
2. "Our devs were done before lunch. Three lines of HTML, no SDK, no headaches." — Marcus T., CTO at SwapDeck (fictional)
3. "Every transaction has an audit trail. That's the only thing our legal team cared about." — Ingrid M., Head of Compliance at Meridian Wealth (fictional)

Layout: 3 cards in a row. On mobile: horizontal snap scroll.

Each card: quote in large italic, name + role below, letter-mark avatar (initials in circle, no photos).

### Section C: Trust Logo Strip
Add above footer on every Home page.

Label: "Built on regulated infrastructure"

Logos (SVG inline, all custom-drawn CSS shapes or minimal SVGs — no external image files):
- Sumsub (text mark)
- Visa (blue wordmark)
- Mastercard (two overlapping circles)
- SEPA (euro mark)
- MiCA (text + EU flag)
- PCI DSS (text mark)
- ISO 27001 (text mark)
- SOC 2 (text mark)

Use `TrustLogoStrip` shared component (already built).

### Section D: "Embed in 3 Lines" Teaser
Add before footer on every Home page.

Left: "Integrate in an afternoon. Not a sprint." heading + 2-line subtext + "See full integration →" link to `/[theme]/developers`

Right: `CodeBlock` shared component with this HTML:
```html
<script src="https://widget.prodigy.demo/embed.js"></script>
<div
  id="prodigy-widget"
  data-b2b-client="acme_001"
></div>
```

### Section E: Add BrowserMockup to Hero (Swiss + Bold)
Swiss and Bold heroes currently have a static widget card or no right-column visual.

Replace/supplement with `BrowserMockup` component:
- Props: `tiltDeg=-8`, `float=true`
- Content slot: screenshot image of Consumer app buy step (`src/assets/screens/consumer-buy.webp`)
- **Screenshot to take:** run `pnpm dev:consumer`, navigate to the buy confirmation page, take a screenshot, save as WebP 800×600

For Crypto: keep existing receipt card but wrap it in glassmorphism container (`backdrop-filter: blur(16px)`, semi-transparent border).

**DoD for LD-003:**
- [ ] All 6 theme Home pages have animated stats counter — fires on enter viewport
- [ ] Testimonials section with 3 cards on all 6 themes
- [ ] TrustLogoStrip on all 6 themes
- [ ] "Embed in 3 Lines" CodeBlock section on all 6 themes
- [ ] Swiss + Bold hero has BrowserMockup with float animation
- [ ] Stats counter reaches exact target value (no floating point errors)
- [ ] Mobile: stats 2×2 grid, testimonials snap-scroll, code block horizontal scrollable
- [ ] 0 console errors

---

## LD-004 Live Data — Connect Landing to Backend
**Status: TODO**
**New composable:** `apps/landing/src/composables/useBackendData.ts`

### What to connect:

**1. Live BTC/ETH prices in header ticker** (all themes that have a ticker):
- Subscribe to `ws://localhost:3000/ws`
- Listen for `PRICE_UPDATE` events
- Update TickerStrip in nav/header with live prices
- Fallback: if WS unavailable, show static prices (BTC €58,234, ETH €3,102) — no error shown

**2. Real transaction count in stats bar:**
- `GET http://localhost:3000/api/transactions` on mount
- Read `{ total }` from response
- Replace hardcoded "45,000+" with real number from API
- If API offline: use 45000 as fallback — CounterStat still counts up

**3. Crypto theme: LiveActivityToast with real events:**
- Subscribe to WS `TRANSACTION_COMPLETED` events
- Each event → create toast with real data: "User converted €{amount} → {crypto}"
- Fallback: cycle through 5 hardcoded messages if WS disconnected

### Composable API:
```ts
const { prices, txCount, connected } = useBackendData()
// prices: Ref<{ BTC: number, ETH: number }>
// txCount: Ref<number>
// connected: Ref<boolean>
```

**Rules:**
- Graceful fallback always — landing must render without backend running
- No loading spinners — show fallback values immediately, update when data arrives
- Single WS connection shared across all composable instances (singleton pattern)
- Auto-reconnect on disconnect (exponential backoff, max 30s)

**DoD:**
- [ ] Opening landing with backend running → ticker shows live prices that update
- [ ] Stats bar shows real tx count from API (or 45000 fallback)
- [ ] Crypto LiveActivityToast fires on real TRANSACTION_COMPLETED events
- [ ] With backend offline: everything renders, no errors, uses static values
- [ ] `connected` ref is false when backend offline (no UI indicator needed — just for internal logic)

---

## LD-005 Pricing Page — Interactive Fee Calculator
**Status: TODO**
**Add to:** Swiss Pricing, Crypto Pricing (both exist). Add same to Bold/SaaS/Gradient/Fintech Pricing.

### Calculator spec:
**Inputs:**
- Slider: send amount €100 → €10,000 (step €50)
- Dropdown: currency pair (EUR→BTC / EUR→ETH / EUR→USDT / EUR→USD)
- Slider: partner markup 0% → 2% (step 0.1%)

**Formula (hardcoded, no API call):**
```
platform_fee  = amount × 0.005
partner_earn  = amount × markup_percent / 100
network_fee   = 2.40  (flat, EUR)
total_fees    = platform_fee + partner_earn + network_fee
they_receive  = amount - total_fees
```

**Output — live-updating receipt card:**
- Uses `ReceiptCard` shared component
- All values update as sliders move (no submit button — instant update)

**Placement:** Above the existing fee breakdown tables, full section with heading "See exactly what you pay."

**DoD:**
- [ ] Sliders update receipt in real time (no lag, no debounce needed — it's just math)
- [ ] Calculator present on all 6 theme Pricing pages
- [ ] Values never go negative (network_fee capped if amount < €3)
- [ ] Mobile: sliders work on touch

---

## LD-006 Partners Page — Revenue Calculator
**Status: TODO**
**Add to:** all 6 theme Partners pages.

### Calculator spec:
**Inputs:**
- Slider: monthly transaction volume €10K → €5M
- Slider: partner markup 0.1% → 2.0%

**Formula:**
```
monthly_earn = volume × markup_percent / 100
```

**Output:** Large animated number updating live. Example: "Your estimated monthly earn: **€4,800**"

**Placement:** Below the embed code section on Partners page.

**DoD:**
- [ ] Revenue calculator on all 6 Partners pages
- [ ] Number updates instantly as sliders move
- [ ] Mobile: sliders work on touch

---

## LD-007 Animation System Upgrade
**Status: TODO**
**File:** `apps/landing/src/composables/useScrollReveal.ts`

Add to existing composable:

**New animation types** (via `data-animate` attribute):
```
data-animate="fade-left"    — slide in from left (translateX -40px → 0)
data-animate="fade-right"   — slide in from right (translateX +40px → 0)
data-animate="scale-in"     — scale from 0.88 → 1 + opacity
data-animate="slide-up-hard" — translateY 100% → 0, no opacity change (for large headlines)
```

**Stagger support:**
Add `data-animate-stagger` on a parent element → each direct child gets +60ms delay automatically.
Example use: testimonial card row, stats bar, step cards.

**Do NOT add:**
- No GSAP, no ScrollMagic, no external animation libraries
- Pinned scroll sections are a stretch goal — skip if they'd take >1 day

**DoD:**
- [ ] `fade-left` and `fade-right` work in Chrome + Safari
- [ ] Stagger: 3 testimonial cards appear 60ms apart
- [ ] No IntersectionObserver memory leak (disconnect on unmount)
- [ ] All existing `fade-up` animations still work

---

## LD-008 Theme Picker `/` — Upgrade
**Status: TODO**
**File:** `apps/landing/src/pages/ThemeIndex.vue`

Current state: likely a simple list of links. Needs to be a visual showcase.

### New design:
- 6 cards in a responsive grid (3×2 on desktop, 2×3 on tablet, 1×6 on mobile)
- Each card:
  - Theme name (large, in theme's own font/style)
  - Audience label: "For B2B Sales", "For Developers", "For Compliance Teams", "For Editorial Brands", "For SaaS Products", "Soft Gradient"
  - Short description: 1 sentence
  - Color preview strip (the theme's accent color as a bar across top of card)
  - Hover: card border glows, slight scale(1.02)
  - Click: navigate to `/[theme]`
- Heading: "6 VISUAL DIRECTIONS — ONE PRODUCT"
- Sub: "Each theme targets a different buyer persona. Pick one. Come back and try another."

**DoD:**
- [ ] All 6 themes have a card
- [ ] Each card links to correct base route
- [ ] Hover animation works
- [ ] Renders without errors on mobile

---

## LD-009 Mobile Responsiveness Pass
**Status: TODO — run after LD-001 through LD-006 are done**

For every page across all 6 themes:

| Element | Mobile behavior |
|---|---|
| Hero | 1-column, mockup below headline |
| BrowserMockup | No 3D tilt, no float animation |
| Stats bar | 2×2 grid |
| Testimonials | Horizontal snap scroll |
| Calculator sliders | Touch-friendly (min 44px touch target) |
| Code blocks | Horizontal scroll inside block |
| CoinFloat | Hidden at <768px (hide with CSS) |
| Nav | Hamburger toggle (`v-show`, no animation library needed) |
| TrustLogoStrip | Static 2-row grid (no marquee on mobile) |
| LiveActivityToast | `display: none` on mobile |

**Test matrix:**
- [ ] 375px: all 6 theme Home pages — no horizontal overflow (`overflow-x: hidden` on body)
- [ ] 375px: all nav menus open/close without JS errors
- [ ] 768px: 2-column layouts work
- [ ] No text truncation anywhere (all text wraps)

---

## LD-010 Performance & Accessibility Pass
**Status: TODO — runs last**

- [ ] `pnpm build:landing` — zero TypeScript errors, zero unused imports
- [ ] No `console.log` in production build
- [ ] All app screenshots saved as WebP (<80KB each)
- [ ] `CoinFloat` has `will-change: transform` (GPU compositing)
- [ ] Particle canvas (Crypto) pauses on `document.visibilitychange` hidden
- [ ] All decorative sections have `aria-hidden="true"`
- [ ] All interactive elements have `aria-label`
- [ ] Font loading: `font-display: swap` on all `@font-face` rules
- [ ] External links: `rel="noopener noreferrer"` on all `target="_blank"`
- [ ] Lighthouse Desktop score ≥ 90 on `/swiss`
- [ ] Lighthouse Mobile score ≥ 80 on `/swiss`

---

## LD-011 Illustrations & SVG Artwork — Custom Visual Library
**Status: TODO**
**Why:** Every page feels text-heavy. Top fintech landing pages (Wise, Stripe, Revolut) use custom SVG illustrations to explain flows, not just text. Currently zero custom illustrations.
**Path:** `apps/landing/src/assets/illustrations/`

### Illustrations to create (SVG inline components):

**1. `IllFlow.vue` — the core "how it works" flow**
Full-width SVG diagram showing the Prodigy transaction lifecycle:
```
[User] ──→ [Prodigy Widget] ──→ [KYC Check] ──→ [Exchange] ──→ [Wallet]
  ↑                                                               │
  └──────────────────────── [EUR Balance] ◄──────────────────────┘
```
Style per theme: Swiss = thin lines + circles, Crypto = glowing paths with particle dots, Fintech = connector arrows with data labels, Bold = thick strokes + high contrast.

Animation: on enter-viewport, paths are drawn via `stroke-dasharray/stroke-dashoffset` CSS animation (left to right, each segment 400ms apart).

**2. `IllKyc.vue` — KYC funnel diagram**
Three stacked horizontal bars (like a funnel):
- Bar 1 (widest): "Submit documents" — all applicants
- Bar 2 (medium): "Auto-approved 93.1%" — green fill
- Bar 3 (narrowest): "Manual review 6.9%" — amber fill
Numbers count up on enter-viewport.

**3. `IllWallet.vue` — a stylized open wallet**
Simple, geometric: rectangular wallet shape with:
- Euro symbol on left
- Bitcoin/crypto coin on right
- Arrow flowing between them (animated loop)
Pure SVG, no external assets.

**4. `IllReceipt.vue` — a stylized transaction receipt**
Paper receipt shape (slight tilt, -3deg) with:
- Lines representing text (grey bars)
- Fee row highlighted in green
- Checkmark at bottom
Used in Pricing pages and the "transparent fees" section.

**5. `IllBuilding.vue` — B2B building/institution icon**
Abstract skyscraper shape for the Partners/B2B sections.
Simplified: 3 rectangles of varying heights, small windows as dots.

**6. `IllShield.vue` — security shield with circuit pattern**
Shield outline with a circuit board pattern inside (small dots + connecting lines).
Used in Security pages.

### How to build:
- Each illustration is a Vue component with `props: { theme: 'light' | 'dark', animated: boolean }`
- All paths use `currentColor` + Tailwind CSS for fill/stroke — theme-adaptive
- `animated=true` adds viewport-triggered CSS animations via `useScrollReveal`
- No external SVG libraries — hand-craft paths

**DoD:**
- [ ] All 6 illustrations created as Vue components
- [ ] IllFlow SVG path animation works in Chrome + Safari
- [ ] IllKyc funnel numbers count up on enter-viewport
- [ ] All illustrations support `theme="dark"` for Crypto theme
- [ ] No SVG warnings in browser console
- [ ] Each illustration uses ≤ 15 SVG elements (keep DOM lean)

---

## LD-012 Hero Visuals — App Screenshots & Mockup Photos
**Status: TODO**
**Why:** Every hero section either has a floating coin animation or nothing. Real product pages (Linear, Notion, Stripe) show actual screenshots of the product. This makes it real.

### Screenshots to capture + save as WebP:
Run each app, navigate to the target screen, take screenshot, save to `apps/landing/src/assets/screens/`:

| Filename | App + URL | What to show |
|---|---|---|
| `consumer-home.webp` | localhost:5001/home | Balance card + holdings + BTC/ETH tiles |
| `consumer-buy.webp` | localhost:5001/buy | Step 2 — quote card (€/BTC) filled in |
| `consumer-sell.webp` | localhost:5001/sell | Step 1 — BTC selected, quote showing |
| `consumer-kyc.webp` | localhost:5001/kyc | KYC form step 2 with document upload |
| `admin-dashboard.webp` | localhost:5002/ | Stats cards + recent transaction table |
| `admin-kyc.webp` | localhost:5002/kyc-queue | KYC queue with status pills |
| `system-map.webp` | localhost:5004/ | Vue Flow diagram with active animation |
| `sumsub-sim.webp` | localhost:5003/ | Applicant list with approve/reject buttons |

**Usage in landing:**
- Consumer app screenshots → PhoneMockup component (mobile frame)
- Admin screenshots → BrowserMockup component (desktop frame with 3 dots)
- System map → full-width on Developers page
- Sumsub sim → on the Security page "Run the KYC sim" section

**Capture spec:**
- Resolution: 1280×800 for desktop, 390×844 for mobile (use Chrome DevTools device emulation)
- Format: WebP, quality 85, max 120KB each
- State: must show real data (not empty state) — use alice@demo.com logged in

**DoD:**
- [ ] All 8 screenshots captured and saved as WebP
- [ ] Each file < 120KB
- [ ] Screenshots show real data (not empty/loading states)
- [ ] PhoneMockup used for consumer screenshots on all 6 theme home pages
- [ ] BrowserMockup used for admin screenshots on Developers page
- [ ] No broken `<img>` tags anywhere

---

## LD-013 Swiss Theme — Full Content Depth Pass
**Status: TODO**
**Why:** Swiss theme is the main "enterprise / B2B sales" theme. It's the most complete but still thin. Sections feel like first drafts.
**Target:** Should feel like a real Wise or Stripe-tier landing page.

### Home page — add/improve:

**Section: Live Market Ticker**
Add to top of page (below nav, above hero) — thin bar, full width:
```
BTC  €58,234.21  ▲ 2.3%   ETH  €3,102.40  ▼ 0.8%   USDT  €0.9998  ─ 0.0%
```
Live from WS (`useBackendData` composable from LD-004).
Scrolling marquee on mobile.

**Section: How It Works — visual upgrade**
Current: 3 text steps. Replace with `IllFlow.vue` (from LD-011) + 3 labeled steps below it with icons (Heroicons: `DocumentCheckIcon`, `ArrowsRightLeftIcon`, `BanknotesIcon`).

**Section: Integration teaser**
Code block + right side: a checklist of what you DON'T need:
```
✕ No custom KYC infrastructure
✕ No FX liquidity agreements
✕ No compliance certification
✕ No banking relationships
✓ Just 3 lines of HTML
```

**Section: Pricing teaser**
"Transparent by design" → show a mini receipt card (use `ReceiptCard` shared component) with a real example:
€500 → BTC | Fee €2.50 (0.5%) | Network €0.80 | You receive: 0.00852 BTC
CTA: "See full pricing →" → /swiss/pricing

**Product page — add:**
- Feature: "Audit trail on every transaction" — shows a fake scrolling log terminal
- Feature: "Multi-currency liquidity" — shows IllWallet.vue with EUR/BTC/ETH
- Feature: "Configurable risk engine" — shows risk score dial SVG

**Case Studies page:**
Add a fourth case study (partner example): **Compass Capital** (wealth management, Geneva). 
Metrics: 400+ HNW clients, €12M AUM in crypto, 100% audit trail, ISO 27001 aligned.
Quote: "We couldn't offer crypto exposure without compromising compliance. Prodigy solved both."

**DoD:**
- [ ] Live ticker visible on Swiss Home
- [ ] IllFlow SVG diagram replaces the 3-step text list
- [ ] Integration teaser section with "what you don't need" checklist
- [ ] Pricing mini-receipt section
- [ ] Product page has 3 feature deep-dives with illustrations
- [ ] Case Studies page has 4 stories
- [ ] All links work (no dead hrefs)

---

## LD-014 Crypto Theme — Dark Glow Visual Upgrade
**Status: TODO**
**Why:** Crypto theme is supposed to be the "defi / developer" look. Currently the dark bg exists but sections feel flat — no glow, no depth, no 3D feel.

### Visual upgrades:

**Hero:**
- Add `IllFlow.vue` with `theme="dark"` — paths glow in neon green
- Add floating grid background (CSS: `background-image: linear-gradient(...)` — 1px grid lines at 10% opacity)
- Hero numbers (BTC price): use monospaced font (`font-mono`), neon green, and add a blinking cursor after the last digit

**"Live Network" section (new):**
A full-width section showing animated activity:
- Fake transaction feed: new rows slide in from top every 2s (CSS animation, no real data)
  ```
  23:14:02  0x7f3a...b910  EUR → BTC  €500  ✓
  23:14:00  0x2c8d...0012  ETH → EUR  1.2 ETH  ✓
  23:13:58  0xab01...3329  EUR → ETH  €1200  processing
  ```
- Stat: "247 transactions in the last hour" (static)
- Background: very dark, terminal-like (`bg-zinc-950` with `border border-zinc-800`)

**Glow effects:**
- Add `box-shadow: 0 0 60px rgba(0, 255, 120, 0.15)` to the hero CTA button (neon green glow)
- Feature cards: on hover, add border glow (`box-shadow: 0 0 0 1px #00ff7820, 0 0 20px rgba(0,255,120,0.1)`)
- Section dividers: thin horizontal line that glows neon green on enter-viewport

**Particle system upgrade:**
- Increase particle count from current to ~80
- Add connection lines between nearby particles (standard particle.js visual)
- Implement in pure Canvas2D (no library) — particles have velocity, bounce off edges, connect if within 120px

**Mobile: particle canvas pauses when tab is hidden** (add `visibilitychange` listener).

**DoD:**
- [ ] Grid background visible in hero section
- [ ] IllFlow with dark theme + glow paths
- [ ] "Live Network" terminal section
- [ ] CTA button has neon glow
- [ ] Feature cards glow on hover
- [ ] Particle count ≈ 80 with connection lines
- [ ] Canvas pauses on tab hidden
- [ ] 0 console errors

---

## LD-015 Bold Theme — Typography & Layout Upgrade
**Status: TODO**
**Why:** Bold theme is supposed to be the "editorial / agency" look — big type, strong grid, contrasts. Currently it has the right colors but the typography isn't bold enough and layout is too similar to Swiss.

### Changes:

**Typography scale upgrade:**
- Hero headline: 96px (6xl) on desktop, 56px on mobile. `font-black` (weight 900). Condensed (`tracking-tighter`).
- Section numbers: large faded numerals (like a magazine) — "01 / The product" — in 120px, opacity 10%
- Quote callouts: 2xl italic, left border 6px thick, red/iris accent

**Layout — alternating asymmetric sections:**
Current: all sections are centered columns. Change to alternating:
- Odd sections: content 60% left + visual 40% right
- Even sections: visual 40% left + content 60% right
- This creates the editorial "grid break" feel (like Linear's marketing page)

**Color:** 
- Add one new accent color: deep iris purple (`#5B47E0`) for secondary elements
- Red stays primary, iris is secondary
- Black/white remain the backbone

**New section: "Built for teams who ship"**
3 feature cards in a horizontal row, each with:
- Large Heroicon (40×40, filled)
- Headline in Barlow Condensed Bold
- 2-sentence description
- Background: alternating white/black cards

**DoD:**
- [ ] Hero headline 96px on desktop
- [ ] Section numbers visible as faded bg numerals
- [ ] Alternating layout on product-style sections
- [ ] "Built for teams who ship" card row
- [ ] No layout breaks at 768px

---

## LD-016 All Themes — Micro-Animation Pass
**Status: TODO — runs after LD-007 animation system**
**Why:** Static pages feel unfinished. Micro-animations on interactive elements signal quality (Stripe is a master class).

### Micro-animations to add everywhere:

**1. Nav link hover underline:**
Animated underline from left to right on hover:
```css
.nav-link::after { content: ''; width: 0; transition: width 0.2s }
.nav-link:hover::after { width: 100% }
```

**2. CTA button hover state:**
On primary buttons: on hover, background shifts 3px up and box-shadow appears (`translateY(-3px) + shadow`). Feels like lifting.

**3. Card enter animations:**
Cards fade + slide up on enter-viewport (use `data-animate="fade-up"` + stagger from LD-007).

**4. Pricing card "popular" highlight:**
The recommended plan card has a pulsing border (2px solid + keyframe that oscillates opacity 0.4 → 1 → 0.4 every 2s).

**5. Stats counter (CounterStat) easing:**
Currently probably linear. Change to `easeOutExpo` — starts fast, decelerates to the final value. Feels premium.
```ts
function easeOutExpo(t: number) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t) }
```

**6. Code block — typing animation:**
On enter-viewport, the code in `CodeBlock` types itself character by character (CSS animation with `steps(N)` where N = character count). Speed: ~40ms/char. Cursor blinks after.

**7. Logo strip — infinite marquee scroll:**
`TrustLogoStrip` should scroll horizontally on an infinite loop. CSS only:
```css
@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
```
Pause on hover.

**8. Mobile: touch feedback:**
All tappable elements: `active:scale-95` transition (150ms). Already done on CTA buttons but not on cards, nav links, or secondary buttons.

**DoD:**
- [ ] Nav underline hover on all 6 themes
- [ ] CTA button lift effect on all 6 themes
- [ ] Cards stagger-animate into view
- [ ] Pricing popular card has pulsing border
- [ ] CounterStat uses easeOutExpo
- [ ] CodeBlock types on enter-viewport
- [ ] TrustLogoStrip scrolls on infinite loop, pauses on hover
- [ ] Mobile touch: `active:scale-95` on all cards
- [ ] All animations respect `prefers-reduced-motion` (disable if set)

---

## LD-017 Landing — Contact/Demo Request Form
**Status: TODO**
**Why:** Current CTAs say "Try the demo" → localhost:5001. Real landing pages have a "Request a demo" form for B2B prospects. For demo purposes, this form just needs to look real and show a success state (no real email needed).

### Where:
Add `/demo-request` route (shared across all themes — single page).
Add "Request a demo" CTA to the nav of all 6 themes (right side, secondary button).

### Form fields:
- Full name (required)
- Work email (required, format validation)
- Company (required)
- Role: dropdown [Head of Product / CTO / Compliance / Developer / Other]
- Monthly transaction volume: [<€10K / €10K–€100K / €100K–€1M / >€1M]
- Use case: textarea (optional, "Tell us about your integration goals")
- [Submit] → fake 1s loading → success state

### Success state:
- Green checkmark animation
- "We'll be in touch within one business day."
- "In the meantime, explore the live sandbox" → link to consumer app

**DoD:**
- [ ] "Request a demo" link in nav of all 6 themes
- [ ] `/demo-request` page renders
- [ ] All required field validation shows inline errors
- [ ] Submit shows 1s loading then success state
- [ ] Success state has "explore sandbox" link
- [ ] No network calls (everything client-side)

---

## Done Log

- ✅ All 6 themes have 4 base pages (Home, Product, Pricing, Partners)
- ✅ 8 shared components built (BrowserMockup, CodeBlock, CoinFloat, CounterStat, LiveActivityToast, PaymentFlowSvg, PhoneMockup, ReceiptCard, TrustLogoStrip)
- ✅ Router wired for Security/Developers/Case Studies on Swiss, Crypto, Bold, SaaS, Gradient
- ✅ Swiss Security page built
- ✅ Swiss Developers page built
- ✅ Bold Home upgraded with more content
- ✅ Crypto Home upgraded (stats bar, lifecycle section, live ticker)
