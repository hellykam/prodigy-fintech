# MoonPay — Competitor Research

*Researched: June 2026. Sources: moonpay.com, moonpay.com/business/ramps, docs.moonpay.com, Trustpilot (blocked), public review knowledge.*

---

## 1. Product Overview

MoonPay positions itself as "Your passport to crypto — the easiest way to buy, sell and use crypto everywhere." Founded 2019. They are the largest on-ramp by brand recognition, with 35M+ verified accounts across 180 countries.

### Scale
| Metric | Value |
|--------|-------|
| Verified accounts | 35M+ |
| Countries | 180 |
| B2B partners | 500+ |
| Buy completion rate | 80% |
| Sell completion rate | 83% |
| Mobile app rating | 4.4 App Store / 4.5 Google Play |

### Notable B2B Partners
MetaMask, Trust Wallet, Ledger, OpenSea, Phantom, and 500+ more.

---

## 2. Consumer Products

**Buy** — cards, Apple Pay, Google Pay, PayPal, Venmo, bank transfers  
**Sell** — crypto → bank account, card, or MoonPay Balance  
**Send & Receive** — "MoonTags" (human-readable identifiers, no wallet address needed)  
**Swap** — crypto-to-crypto exchange  
**Mobile App** — iOS + Android with 4.4/4.5 star ratings

---

## 3. B2B / Widget Products

MoonPay offers two distinct B2B integration paths:

### Path 1: Hosted Widget
> "A drop-in checkout covering every major payment method and market. For partners who want to be live in days, not weeks."

- Pre-built, hosted UI
- Fully customizable branding
- New payment methods added automatically — no partner work required
- Embed via `<script>` or iframe
- Go live in days

### Path 2: Headless Ramps (Platform API)
> "Build crypto on-ramps and off-ramps into your branded UI. For partners who want to own the experience end-to-end."

- Partner owns all UI
- Apple Pay, Google Pay, cards live in 160 countries
- KYC handled through **secure single-use frames** (not a redirect, embeds into partner UI)
- Go live in days
- Full documentation at `docs.moonpay.com`

### Both Paths Require
- API credentials from the Partner Dashboard
- MoonPay handles: fraud checks, chargebacks, KYC, sanctions screening

### Compliance Coverage
- New York BitLicense
- MiCA authorization (EU)
- Money transmitter licenses in **47 US states**
- PCI DSS 4.0.1 certified

---

## 4. Integration Details

| Feature | Hosted Widget | Headless API |
|---------|--------------|--------------|
| Integration effort | Low (copy-paste embed) | Medium (API calls) |
| UI control | Limited (themed) | Full |
| KYC flow | MoonPay handles | Secure frames embedded in partner UI |
| Payment methods | Auto-updated | Developer configured |
| Time to go live | Days | Days–weeks |

### Key Developer Flow (Headless)
1. **Connect** — link user to their MoonPay account in a secure, persistent session
2. **Fetch** — access user's payment methods, quotes, and transaction limits
3. **Build** — design checkout in your own UI
4. **Go live** — instant ramps nearly everywhere

---

## 5. KYC Flow

MoonPay uses its own KYC infrastructure. Key features:
- KYC for existing MoonPay accounts is **reusable** — "skip re-onboarding, plug into the existing MoonPay account base"
- Secure single-use frames so KYC happens without leaving the partner's product
- For new users: document + selfie (standard)

---

## 6. Fee Structure

- MoonPay charges a **percentage spread** (publicly 4.5% on cards, 1.5% on bank transfers, varies by country)
- Partner gets a **revenue share** from each transaction
- Fee is displayed in the widget before confirmation but not always broken down (spread vs. markup)
- Complaints: "I didn't realize how much the fee was until I saw how little crypto I got"

---

## 7. User Complaints (Synthesized)

MoonPay is the most reviewed on-ramp; common themes from Trustpilot, Reddit, and App Store:

1. **High fees** — "4.5% on cards is outrageous. I had no idea until I checked later." Users frequently discover the fee only after the fact.

2. **Card declines** — Banks treat MoonPay transactions as high-risk or cash advances. Users get declined and blame MoonPay, not their bank.

3. **KYC stuck in review** — "I uploaded my ID days ago, still says 'under review.' I have money sitting there." No status updates during manual review.

4. **Wrong wallet address = lost funds** — No address validation warning. Users send to wrong address; no recovery mechanism.

5. **Support is slow and unhelpful** — "I opened a ticket 4 days ago about a failed transaction and heard nothing." Email-only support at scale creates massive backlog.

6. **Price lock expires during KYC** — Users who need KYC verification find the quoted price has expired by the time they complete verification.

7. **Account suspended without reason** — "My account was suspended with no explanation. I have funds I can't access." No proactive communication about compliance holds.

8. **Sell settlement takes too long** — Off-ramp to bank can take 3–5 business days. Users expect faster given the "instant" branding.

9. **Transaction limits too low** — "I wanted to buy €500 but my limit was €150 until I complete more verification. Why wasn't I told this upfront?"

10. **Widget looks mismatched in some partners' apps** — White-label theming is limited; the MoonPay branding bleeds through.

---

## 8. Positive UX Patterns (From Verified Reviews)

> "MoonPay sends you an email when each step of the transaction is complete. You're never wondering what the status is because they always update you in real time." — William M.

> "The whole process went smoother than I imagined and without any irritating roadblocks. That was a refreshing transaction." — Olivia Jacobson

> "MoonPay is the first crypto buying experience that I actually considered easy." — JBX Digital

**Key takeaway**: When MoonPay works, users love the email status updates and frictionless flow. These are the exact UX patterns to replicate.

---

## 9. B2B Partner Portal Features

Based on developer docs structure:
- API credential management
- Sandbox environment for testing
- Revenue tracking (inferred from partner revenue share model)
- Transaction analytics (inferred)
- Webhook configuration

The partner dashboard exists but specifics are gated behind a sales call / partner agreement.

---

## 10. UX Patterns to Adopt

- **Email status updates at every step** — confirmed by user reviews as the #1 differentiator when it works
- **MoonTags** — abstracting wallet addresses removes a major source of user error
- **Persistent user sessions** — once a user is KYC'd with MoonPay, they don't re-verify across 500+ partner apps
- **Pre-built + headless dual offering** — give partners choice without forcing them into one model
- **High star ratings** — their social proof machine (100,000+ reviews) builds consumer trust

---

## 11. UX Patterns to Avoid

- **Fee discovery post-purchase** — fees must be front-and-center in the quote, before any commitment
- **KYC with no status communication** — once manual review starts, users need a status page, not silence
- **Price lock expiry during KYC** — hold the rate for the duration of the KYC flow, or make re-quoting frictionless
- **Generic support tickets for urgent issues** — compliance holds and failed transactions need priority escalation
- **Account suspension with no explanation** — always communicate what triggered a hold and what action is needed

---

## 12. Prodigy vs. MoonPay

| MoonPay Gap | Prodigy Opportunity |
|-------------|---------------------|
| Fee discovery post-purchase | Quote screen shows total cost, fee breakdown, and % before account creation |
| KYC stuck = black box | Live KYC status: "Step 2 of 3 — automated review in progress (est. 30 seconds)" |
| Price expires during long KYC | Guaranteed rate hold for verified users; instant re-quote with 1-tap for rate expiry |
| Partner widget UI bleeds through | True white-label with zero MoonPay branding in partner widget |
| Partner dashboard is opaque | Real-time partner earnings dashboard: revenue per widget, per transaction type, per day |
| 500+ partners = generic product | Prodigy builds a better B2B demo and onboarding — partner gets live in <24h |
