# Landing Page — Visual Research & Upgrade Brief

> Analyst brief for builder. Covers pattern analysis of top crypto/fintech sites + design reference review.
> Source: competitor matrix, tier-1/tier-2 design refs, audience test results.
> Use this as the source of truth when building landing tasks L-001 → L-012.

---

## 1. What Top Crypto/Fintech Sites Do That We Don't

### Pattern A — Hero is a Product Demo, Not a Pitch

Sites: Ramp, MoonPay, Stripe, Fireblocks, Alchemy

The hero section IS the product. Not a headline + paragraph + button — the product UI itself floats in the hero, animated, interactive, or at minimum a high-fidelity mockup. Users see what they're buying in the first 2 seconds.

**Our gap:** Swiss hero has a static widget card. Crypto hero has a particle canvas but the receipt card is small. Neither theme puts actual product screenshots front and center.

**Fix:** Hero right column = large floating browser/phone frame showing the actual running app (Consumer buy flow or Admin dashboard), slightly tilted 3D, gentle float animation, glow behind it.

---

### Pattern B — Animated Stats Build Trust Instantly

Sites: Coinbase (300M+ users), MoonPay (35M accounts), Transak (600+ apps), AVVA (4.8M, $401K)

Large numbers — transactions processed, partners, countries — shown with animated count-up on scroll enter. Typography is massive (80–120px). They're placed immediately after the hero fold, before any feature copy.

**Our gap:** We have a StatsSection component but it's static text. No count-up animation, no visual weight.

**Fix:** Animated counters that tick up from 0 when they enter viewport. Numbers at 96px+. Stats: $2.4B simulated volume, 45K demo transactions, 12 partner integrations, 6 demo apps live.

---

### Pattern C — Floating Product Mockups as Visual Anchor

Sites: K76 Banking (image 107), NAMI Crypto (image 108), AVVA (image 113)

Large product UI mockups — card renders, phone screens, dashboard screenshots — float in sections, slightly rotated in 3D perspective, with subtle continuous float animation (translateY keyframe). They make abstract features concrete and show the product is real.

**Our gap:** Nothing like this exists. The widget card in the Swiss hero is a code mock, not a real screenshot.

**Fix:** Actual screenshots of localhost:5001 (buy flow) and localhost:5002 (admin dashboard) in browser/device frames. Used in hero, in feature sections, on Product page. Float animation: 6s ease-in-out infinite translateY(-8px → 0).

---

### Pattern D — Editorial Typography at Maximum Scale

Sites: Tier-1 refs (iridescent blob editorial), image 98 (OPEN DAY), image 95 (bold grid), image 84 (SYMBIOTIC)

Headline typography that commands the full viewport. Condensed sans at 100–160px. Letter-spacing tight. Some words in accent color. Words as design elements, not just copy.

**Our gap:** Swiss headline is good (Barlow Condensed) but not at maximum scale. Crypto headline is strong but the glitch effect is the only visual trick.

**Fix:** Hero headlines take up 60%+ of viewport height. Line by line animation on load (each word slides up with 80ms delay). Accent color on the value word only ("EXPLAINS", "TRANSPARENT", "YOURS").

---

### Pattern E — Receipt/Document as Visual Identity

Sites: LikeLouis (images 90, 92 — nutrition label as design), our Swiss theme (partially)

The receipt/document metaphor IS our brand differentiator. Fee transparency = show the receipt. The LikeLouis reference is brilliant: they made a nutrition label into the entire aesthetic. We should do the same with a fee receipt. Every section that talks about fees should show a receipt artifact.

**Our gap:** The Swiss receipt card exists but only on Pricing page. It's not threaded through the whole site as a visual system.

**Fix:** Receipt motif appears in: hero (floating receipt card), How It Works section (receipt stamps each step), Pricing page (full receipt animation), Footer (mini receipt with "total: no hidden fees"). It becomes our signature visual.

---

### Pattern F — Dark Gradient Hero for Crypto (image 112)

Dark purple-to-blue gradient background. Glowing UI elements floating over it. Currency icons. A swap widget in the hero. Bright accent colors against the dark.

**Our gap:** Crypto theme uses particle canvas (good) but background is flat #0a0a0a. No gradient, no depth, no glowing elements.

**Fix:** Three-layer background: radial gradient (deep purple center → black edges) + particle canvas (keep) + floating glowing UI cards. Add custom cursor (crosshair dot) on dark theme only.

---

### Pattern G — Scroll-Driven Section Transitions

Sites: Stripe, Fireblocks, Alchemy

Sections don't just fade in — they transform. Text slides in from left while image slides in from right. Background color transitions from white to dark as you scroll through features. Section pinning (content scrolls within a fixed frame). Progress indicator on side.

**Our gap:** useScrollReveal composable exists but only does basic opacity/translateY. No directional reveals, no section pinning, no background color transitions.

**Fix:** Scroll animation system using Intersection Observer: left/right/up directional reveals, staggered children (60ms delay each), scale-from-small for cards. For Product page: pinned feature showcase where scrolling cycles through 3–4 feature panels.

---

### Pattern H — Integration Code Block as Feature

Sites: Alchemy, Ramp, Transak, Stripe

A section showing the embed code — clean syntax highlighted, single copy action, 3–4 lines max. Positioned prominently on Product or Partners page. Often with a live preview side-by-side.

**Our gap:** The Partners page mentions embed but doesn't show a proper code block UI.

**Fix:** Dedicated "Embed in 3 lines" section on every theme's Partners page. Syntax-highlighted code block (CSS, no library needed), copy button, animation: code types itself in character by character on scroll enter.

---

### Pattern I — Trust Strip / Logo Wall

Sites: Every serious fintech site

A row of partner/client logos or technology logos (Sumsub, Visa, MasterCard, SEPA, PCI DSS, MiCA). Auto-scrolling marquee, or static grid. Signals ecosystem credibility.

**Our gap:** TrustStrip component exists but shows generic text. No real logos or certifications.

**Fix:** Add SVG icons for: Sumsub, Visa, Mastercard, SEPA, PCI DSS, MiCA, ISO 27001, SOC 2. Marquee animation, grayscale on idle → color on hover.

---

### Pattern J — Live Data Signals ("It's Really Working")

Sites: Transak, Ramp, Coinbase

A ticker or notification toast that shows simulated real-time activity: "A user in Berlin just completed a transaction — €340 → 0.0058 BTC". Auto-updates every few seconds. Makes the platform feel alive.

**Our gap:** TickerStrip exists but shows static crypto prices.

**Fix:** Add a "live activity" notification layer (bottom-left corner, crypto theme only) showing rotating fake transactions. Also: live price ticker connected to our Market Simulator WS feed (localhost:3000) — actual live data, not hardcoded.

---

## 2. Missing Pages (Every Theme Needs These)

Currently each theme has: Home, Product, Pricing, Partners (4 pages).

Missing:

| Page | URL Pattern | Purpose |
|---|---|---|
| Security | `/[theme]/security` | Compliance story, KYC, audit trail, certifications. Critical for compliance persona. |
| Developers / API | `/[theme]/developers` | Embed steps, SDK options, code block, API explorer preview. Critical for dev persona. |
| Case Studies | `/[theme]/case-studies` | 3 simulated client stories with metrics. Critical for BD/Sales persona. |

That's 12 new pages (3 pages × 4 active themes: swiss, crypto, fintech, bold).

---

## 3. Illustration System — What to Build

No image files needed. All illustrations built in Vue with CSS + SVG + Canvas.

### 3D Floating Coin Component (`CoinFloat.vue`)
- CSS `perspective` + `rotateY` + `rotateX` transforms
- Flat SVG face with currency symbol (BTC/ETH/EUR)
- Continuous rotation: `rotateY(0 → 360deg)` on 8s loop
- Drop shadow below coin
- Used in: Crypto hero, Crypto Product page, Crypto Pricing

### Receipt Artifact Component (`ReceiptCard.vue`)
- Pure HTML/CSS receipt — white card, dashed separators, monospaced rows
- Animated: slides up from bottom on enter, stamp appears with scale bounce
- "APPROVED" stamp: red circle, rotated 15deg, scale(0) → scale(1) on trigger
- Used in: All themes — hero, Pricing, Footer

### Glassmorphism UI Card (`GlassCard.vue`)
- `backdrop-filter: blur(20px)`, semi-transparent border, inner glow
- Content: mini app screenshot (transaction list or KYC status)
- Slight tilt: `rotate(-3deg)` with float animation
- Used in: Swiss hero right column, Fintech hero

### Animated Flow Diagram (`PaymentFlow.vue`)
- SVG path from "User" → "Widget" → "Risk Engine" → "Ledger"
- Animated dot travels the path: `stroke-dashoffset` animation
- Nodes pulse on dot arrival
- Used in: How It Works section (all themes), System Diagram section

### 3D Browser Frame (`BrowserMockup.vue`)
- Chrome-style browser bar (3 dots, URL bar, reload button) — pure CSS
- Iframe or static screenshot inside
- Tilted: `perspective(1200px) rotateY(-8deg) rotateX(4deg)`
- Float animation: `translateY(-12px → 0)` 6s ease-in-out infinite
- Used in: Hero right column (shows Consumer or Admin app)

### World Map Dots (`WorldMapSvg.vue`)
- SVG simplified world map with dot pattern
- Animated: dots appear sequentially (random delay) on section enter
- Accent dots on key cities (Frankfurt, London, Dubai, Singapore)
- Used in: Security page (global coverage), Swiss Partners page

---

## 4. Animation System Spec

All animations via Intersection Observer (no external library needed). Extend `useScrollReveal.ts`.

### Entry Animations
```
fade-up:     opacity: 0, translateY(24px) → 1, translateY(0)    400ms ease-out
fade-left:   opacity: 0, translateX(-32px) → 1, translateX(0)   400ms ease-out
fade-right:  opacity: 0, translateX(32px) → 1, translateX(0)    400ms ease-out
scale-in:    opacity: 0, scale(0.92) → 1, scale(1)              350ms ease-out
stagger:     each child delays +60ms from previous
```

### Continuous Animations (CSS keyframes)
```
float:       translateY(0) → translateY(-12px) → translateY(0)  6s ease-in-out infinite
pulse-glow:  box-shadow 0 → 0 24px rgba(accent, 0.4) → 0        2s ease-in-out infinite
spin-coin:   rotateY(0) → rotateY(360deg)                        8s linear infinite
count-up:    JS: requestAnimationFrame from 0 to target          800ms ease-out
ticker:      translateX(0) → translateX(-50%)                    30s linear infinite
```

### Scroll-Driven (CSS scroll-timeline where supported, Intersection Observer fallback)
- Pinned feature section: scrolls through 3 panels while layout stays fixed
- Background transition: white → dark navy on Pricing page scroll

---

## 5. Priority Order for Build

1. **Swiss** — audience winner, most business-critical, fixes first
2. **Crypto** — developer audience, needs biggest visual upgrade (WebGL, 3D)
3. **Fintech/Institutional** — already strong, targeted additions only
4. **Bold** — secondary, can reuse Swiss components with different styling

Each theme should be upgraded independently so they can be A/B tested.

---

## 6. Content Requirements per Page

### Home (all themes) — must add these sections:
- Animated stats bar (after hero)
- "Embed in 3 lines" teaser section (before footer)
- Live activity notification (crypto only)
- Testimonial quotes (3 simulated B2B clients)

### Product (all themes) — must add:
- Pinned scroll feature showcase (3 panels: Widget, KYC, Admin)
- Large floating browser mockup (actual app screenshot)
- Architecture diagram (PaymentFlow animation)

### Pricing (all themes) — must add:
- Interactive fee calculator (sliders for amount, currency, partner markup)
- Comparison table vs competitors (MoonPay, Ramp, Transak)
- Receipt animation (existing on Crypto, needed on Swiss/Fintech/Bold)

### Partners (all themes) — must add:
- Self-typing code block ("embed in 3 lines")
- Revenue calculator (partner markup → monthly earnings estimate)
- Logo wall (trust strip with real certification icons)

### Security (NEW, all themes):
- KYC flow diagram (Sumsub integration steps)
- Compliance certifications section (MiCA, FCA, PCI DSS)
- Audit trail section (ledger double-entry, every event logged)
- Data residency map

### Developers (NEW, all themes):
- Integration options tabs (Widget / Headless API / React SDK / WebView)
- Live code block per integration type (self-typing animation)
- Request/response example (dark terminal style)
- Sandbox access CTA

### Case Studies (NEW, all themes):
- 3 simulated client cards: neobank (65K users, €2.1M volume), crypto exchange (14 integrations), wealth manager (compliance focus)
- Each case study: challenge → solution → metrics
- Quote from simulated CTO/Head of Product
