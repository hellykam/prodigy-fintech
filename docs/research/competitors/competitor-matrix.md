# Competitor Matrix — On-Ramp/Off-Ramp Market

*Last updated: June 2026*

---

## 1. Feature Matrix

| Feature | Coinify | MoonPay | Ramp Network | Transak | Banxa |
|---------|---------|---------|--------------|---------|-------|
| **Scale** | 2.5M traders, 60K+ B2B | 35M accounts | 8M customers | Millions via 600+ apps | Unknown |
| **Countries** | 170+ | 180 | 150+ | Global | Global |
| **Crypto supported** | 40+ | 80+ | 100+ | 136+ assets, 45+ chains | Wide range |
| **Fiat currencies** | EUR, GBP, DKK, etc. | 40+ | 40+ | Multiple | Multiple |
| **On-ramp (buy)** | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Off-ramp (sell)** | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Crypto-to-crypto swap** | ✗ | ✓ | ✓ (1,200+ pairs) | ✗ (via API) | ✗ |
| **Merchant acceptance** | ✓ (Payment Solutions) | ✗ | ✗ | ✗ | ✗ |
| **OTC / large orders** | ✓ (Coinify+, €50K+) | ✓ (Institutional) | ✗ | ✗ | ✗ |
| **NFT checkout** | ✗ | ✗ | ✗ | ✓ | ✗ |
| **Virtual accounts / IBANs** | ✗ | ✓ (Virtual Accounts) | ✗ | ✓ | ✗ |
| **Mobile app** | ✗ | ✓ (4.4/4.5 stars) | ✓ | ✗ | ✗ |
| **Widget embed** | ✓ (JS snippet) | ✓ (Hosted) | ✓ (URL params/SDK) | ✓ (Widget) | ✓ (JS SDK) |
| **Headless / API** | ✓ (REST) | ✓ (Platform API) | ✓ | ✓ (Whitelabel) | ✓ (REST) |
| **Mobile WebView SDK** | ✗ (not documented) | ✓ | ✓ | ✓ | ✓ (iOS, Android, React Native) |
| **React / native SDK** | ✗ | ✓ | ✓ | ✓ | ✓ |

---

## 2. KYC & Compliance Matrix

| Feature | Coinify | MoonPay | Ramp Network | Transak | Banxa |
|---------|---------|---------|--------------|---------|-------|
| **KYC ownership** | Coinify | MoonPay | Ramp | Transak | Banxa |
| **KYC reuse across partners** | ✗ | ✓ (existing accounts) | ✓ (single verification) | ✓ (KYC Reliance via Sumsub) | ✗ |
| **Auth Reliance** | ✗ | ✗ | ✗ | ✓ | ✗ |
| **Sandbox environment** | ✓ (gated) | ✓ | ✓ | ✓ (immediate on signup) | ✓ |
| **MiCA licensed** | ✓ | ✓ | ✓ | ✗ (in progress) | ✓ (AFM Netherlands) |
| **FCA registered** | ✗ (UK blocked for retail) | ✓ | ✓ | ✓ | ✗ |
| **US licensed** | ✗ | ✓ (47 states) | ✓ (FinCEN) | ✓ (NMLS) | ✓ (FinCEN) |
| **SOC 2 / ISO** | ✗ (not mentioned) | ✓ (PCI DSS 4.0.1) | ✗ (not mentioned) | ✓ (ISO 27001, SOC 2 Type II) | ✗ (not mentioned) |

---

## 3. B2B / Partner Experience Matrix

| Feature | Coinify | MoonPay | Ramp Network | Transak | Banxa |
|---------|---------|---------|--------------|---------|-------|
| **Integration model** | 1 line JS snippet | Hosted widget + Headless API | URL params + SDK | Widget + Whitelabel API + WebView | JS SDK + REST API |
| **Partner dashboard** | ✓ (basic, payments view) | ✓ | ✓ | ✓ (full: fees, payouts, analytics) | ✓ |
| **Partner fee control** | ✗ (contract-based) | ✗ (contract-based) | ✗ (contract-based) | ✓ (self-serve in dashboard) | ✓ (flexible, volume-based) |
| **Revenue share visibility** | ✗ (not documented) | ✓ (inferred) | ✓ (inferred) | ✓ (payout config in dashboard) | ✓ |
| **Webhooks** | ✓ (REST) | ✓ | ✓ | ✓ (+ WebSockets) | ✓ |
| **Real-time events (WebSocket)** | ✗ | ✗ | ✗ | ✓ | ✗ |
| **Sandbox before KYB approval** | ✗ | ✗ | ✗ | ✓ | ✓ |
| **White-label (zero provider branding)** | ✓ (positioning) | Limited | Limited | ✓ (Whitelabel API) | ✓ |
| **KYC Reliance / bring-your-own KYC** | ✗ | ✗ | ✗ | ✓ (Sumsub) | ✗ |
| **Dedicated partner support** | ✓ ("real people ready to help") | ✓ | ✓ | ✓ | ✓ |

---

## 4. Payment Methods Matrix

| Method | Coinify | MoonPay | Ramp Network | Transak | Banxa |
|--------|---------|---------|--------------|---------|-------|
| Card (Visa/MC) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Bank transfer / SEPA | ✓ | ✓ | ✓ | ✓ | ✓ |
| Apple Pay | ✗ | ✓ | ✓ | ✓ | ✓ |
| Google Pay | ✗ | ✓ | ✓ | ✓ | ✓ |
| PayPal | ✗ | ✓ (US) | ✗ | ✗ | ✗ |
| PIX (Brazil) | ✗ | ✗ | ✓ | ✗ | ✗ |
| 3D Secure | ✓ (required) | ✓ | ✓ | ✓ | ✓ |

---

## 5. Fee Transparency Matrix

| Dimension | Coinify | MoonPay | Ramp Network | Transak |
|-----------|---------|---------|--------------|---------|
| Fee visible pre-login | ✗ | Partial | ✓ | Partial |
| Fee breakdown shown | ✗ | ✗ | ✓ | ✗ |
| "No hidden fees" positioning | ✗ | ✗ | ✓ (brand promise) | ✗ |
| Public fee page | ✗ (login required) | Partial | ✓ | ✓ |

---

## 6. Industry-Wide Top 5 User Pain Points

These pain points appear across **all** competitors, confirmed by reviews and support documentation:

### Pain Point 1: Fee Opacity
**What happens**: Users don't know the total cost (spread + processing fee) until they're at the final confirmation step — or sometimes until after the transaction.

**User voice**: *"I bought cryptocurrency for €100. Why is it valued less in my wallet?"* (Coinify help desk headline)

**Prodigy solution**: Show the complete fee breakdown — spread %, fixed fee, and total cost — **in the quote widget before any account creation**. Treat fee transparency as a brand differentiator.

---

### Pain Point 2: KYC Black Box
**What happens**: Identity verification fails or enters manual review with no timeline, no status updates, and no explanation. Users are left in limbo — sometimes with money already charged.

**User voice**: *"I uploaded my ID days ago, still says 'under review.' I have money sitting there."*

**Prodigy solution**: Live KYC status screen showing: current step, estimated time, what's needed next. If manual review is triggered, show a countdown estimate and allow user to check status without contacting support.

---

### Pain Point 3: Transaction Status Silence
**What happens**: After initiating a transaction (especially bank transfers), users have no visibility into what's happening. They don't know if it's processing, delayed, or failed until they check their wallet or contact support.

**User voice**: *"MoonPay sends you an email when each step of the transaction is complete. You're never wondering what the status is."* (This review is POSITIVE — it highlights how rare good status communication is.)

**Prodigy solution**: Real-time transaction status tracking with push + email notifications at every state change. Display a visual timeline: Submitted → Payment Received → Processing → Crypto Sent → Confirmed.

---

### Pain Point 4: Support Inadequacy During Critical Moments
**What happens**: When a compliance hold is triggered, a transaction fails, or an account is suspended, users hit an email-only support queue with 1–5 day response times. This is catastrophic when money is stuck.

**User voice**: *"I opened a ticket 4 days ago about a failed transaction and heard nothing."*

**Prodigy solution**: Priority in-app support for active compliance holds and failed transactions. Users should see a clear action path: what document is needed, where to upload it, and an estimated resolution time.

---

### Pain Point 5: Discovery Shock — Limits and Restrictions
**What happens**: Users discover they're limited (e.g., UK residents blocked from retail trading, low transaction limits before Level 2 KYC) mid-flow or after signup. No proactive communication.

**User voice**: *"I'm in the UK and I can't trade" / "I wanted to buy €500 but my limit was €150 until I complete more verification."*

**Prodigy solution**: Geo-detect on widget load and communicate restrictions upfront. Show transaction limits clearly in the quote screen ("Your current limit: €500/day. Increase it by completing Level 2 verification →").

---

## 7. What Prodigy Should Do Better Than All Competitors

| Area | Current Industry Standard | Prodigy Target |
|------|--------------------------|----------------|
| **Fee display** | Hidden until confirmation or post-purchase | Full breakdown in the quote widget, pre-auth, including spread % + fixed fee |
| **KYC experience** | Black box, "we'll email you" | Real-time progress bar with step labels and time estimates |
| **Transaction tracking** | Email after completion (at best) | Live status timeline inside the widget, + email + push at each step |
| **Partner revenue visibility** | Aggregate reporting, delayed | Real-time earnings per transaction, per day, per widget, with graphs |
| **Partner fee control** | Sales-call-gated | Self-serve in the B2B portal — set markup, configure payouts |
| **KYC reuse** | Re-verify per provider | Prodigy KYC simulator should accept Sumsub / shared KYC |
| **Widget SDK choice** | One method (snippet or URL params) | Widget, headless API, React component, mobile WebView — all supported |
| **Support during holds** | Ticket queue | Priority escalation with estimated resolution time, direct action path |
| **Mobile-first widget** | Desktop-first, mobile as afterthought | Designed mobile-first, feels native in WebView |
| **Geo/limit disclosure** | Discovered mid-flow | Detected pre-load; shown in first step of widget |
