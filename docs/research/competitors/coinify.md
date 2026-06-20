# Coinify — Deep Dive Research

*Researched: June 2026. Sources: coinify.com, help.coinify.com, developer.coinify.com, public knowledge of user complaints.*

---

## 1. Product Overview

Coinify is a Danish crypto-fiat on/off-ramp infrastructure company headquartered in Copenhagen. They claim **#1 in Europe** for this category. Their tagline: "Accept the future of finance with crypto payments and trade."

### Scale
| Metric | Value |
|--------|-------|
| Businesses signed up | 60,000+ |
| Registered traders | 2.5M+ |
| Countries supported (trade) | 170+ |
| Global PSPs integrated | 65 |
| Core product offering | B2B widget + merchant payments |

### Product Lines

**1. Trade Solutions** — The core on/off-ramp widget  
An embeddable widget for exchanges, wallets, NFT marketplaces, DeFi apps, DEXs, and dApps. Partners embed it with "one line of code." Handles fiat → crypto (buy) and crypto → fiat (sell) for their end users.

**2. Payment Solutions** — Merchant crypto acceptance  
For businesses (Balenciaga, Philipp Plein, etc.) to accept crypto as payment, settled in local fiat. Plug-and-play with e-commerce integrations.

**3. Corporate Trading** — B2B crypto desk  
For businesses that want to trade crypto on their own balance sheet.

**4. Coinify+ OTC Broker** — High-ticket trades  
"A real human helping your customers with orders above €50,000." White-glove OTC brokerage for large trades.

**5. Pay By Link** — Shareable payment links  
Accept crypto anywhere without integration.

---

## 2. Supported Currencies & Cryptos

- **Fiat currencies**: EUR, GBP, DKK, SEK, NOK, CHF, USD (varies by payment method and region)
- **Crypto (buy/trade)**: 40+ currencies — BTC, ETH, LTC, XRP, and a range of altcoins. Exact list at `/supported-crypto-trade`
- **Crypto (payments/merchant)**: Different set, listed at `/supported-crypto-merchants`
- **Conversion types**: Fiat → Crypto (on-ramp), Crypto → Fiat (off-ramp), crypto payments (acceptance only, not swap)
- No fiat-to-fiat conversion; no crypto-to-crypto swap in the widget

---

## 3. B2B Widget Product

### Integration Method
> "Just copy and paste one line of code."

The Coinify Trade Widget is deployed via a **JavaScript snippet** — one script tag that renders the widget as an iframe. Partners:
1. Complete KYB (Know Your Business verification)
2. Sign a contract
3. Add one line of code to their site/app
4. Customize appearance as desired

### What the Widget Covers
- Full fiat-crypto transaction UI
- KYC/identity verification of end users (Coinify owns this)
- Payment processing (card, bank transfer)
- Compliance, anti-fraud, chargebacks
- Liquidity sourcing
- Customer support for end users

### API Alternative
Coinify also offers REST APIs for partners who need deeper control:
- **Coinify Trading API** — programmatic trade execution
- **Coinify Payments API** — merchant crypto acceptance
- Custom e-commerce plugins available

### Customization
Based on the developer page ("Big, small, squared or circled. Doesn't matter. We'll make it fit to how your business runs"), customization is available but the specifics are gated behind the KYB/contract process. Public marketing shows:
- Widget size/shape customization
- Branding/color adjustments
- Pre-selecting currencies

### Partner Dashboard
Coinify has a merchant portal at `app.coinify.com`. From the site navigation, it includes:
- Transaction/payment history overview
- Account management
- Separate login for merchant vs. trader accounts

The dashboard is described as: *"Simple dashboard overview of your payments. Keep track of everything going in and out."*

No public details on real-time revenue share visibility, partner analytics, or earnings breakdown.

---

## 4. KYC Flow

Based on help desk article categories, Coinify uses a **tiered KYC** system:

| Level | What's Required | Notes |
|-------|-----------------|-------|
| Basic | Email + password signup | No verification for browsing |
| Level 1 | Identity document upload + selfie | Required before any trade |
| Level 2 | Additional verification questions | Travel Rule compliance |
| Corporate | KYB documents | For corporate accounts |
| Enhanced | Source of Funds (PSOF), Source of Coins | For larger transactions |

**KYC provider**: Not publicly disclosed. They have their own verification flow within the widget.

**KYC pain points** (from help desk article existence):
- Automatic KYC often fails → manual review required (with no clear timeline)
- Travel Rule triggers additional questions mid-flow
- Source of Funds declarations can block transactions unexpectedly
- Politically Exposed Persons (PEPs) face stricter review

**UK restriction** (confirmed from live site):
> "Due to regulatory requirements from the authorities, trading for our UK friends across the channel is currently only available to businesses and not individuals. We apologize for any inconvenience."

---

## 5. Fees & Limits

From help desk categories, fees are documented at `/trade?targetPage=fees` (login required to see exact rates).

**What is publicly known:**
- Fee structure is **percentage-based spread** on transactions
- Typical market range: 2.5–5% depending on payment method, amount, region
- Card transactions typically carry higher fees than bank transfers
- Administrative fees exist separately (e.g., for refunds)
- Help desk article: *"I bought cryptocurrency for €100. Why is it valued less in my wallet?"* — indicating users regularly discover hidden spread fees post-purchase

**Transaction limits:**
- Limits exist (exact values gated behind login)
- Corporate accounts have higher limits
- Coinify+ OTC starts at €50,000+

**Fee transparency problem**: Fees are not visible without logging in. The quote widget does show a final amount before confirmation, but the breakdown of spread vs. fixed fee is not prominently displayed.

---

## 6. Payment Methods

| Method | Available |
|--------|-----------|
| Credit/Debit Card (Visa, Mastercard) | Yes |
| 3D Secure required | Yes ("My card is not 3D Secure" FAQ exists) |
| Bank Transfer (SEPA/local) | Yes |
| Apple Pay / Google Pay | Not mentioned on main site |
| PayPal | Not mentioned |
| PIX/local methods | Limited |

---

## 7. User Complaints — Top 10

*Synthesized from help desk article structure, known industry complaints about Coinify, and general on-ramp complaint patterns.*

1. **"My KYC failed and I don't know why"**  
   Automatic verification fails silently. Manual review kicks in with no ETA communicated. Users are left in limbo — money charged, no crypto received.

2. **"I paid but haven't received my crypto"**  
   Card charged but transaction pending. Help desk article exists specifically for this. Users panic seeing a debit without any crypto delivery.

3. **"The fees are way higher than advertised"**  
   The total cost (spread + fixed fee) only becomes clear at confirmation. Users feel deceived when they get significantly less crypto than expected for their €100.

4. **"Bank transfer is taking too long"**  
   Processing time for bank-funded trades can be multiple days. No proactive status updates. Users don't know if it's processing, failed, or stuck.

5. **"I can't find my reference text"**  
   Bank transfers require a specific reference code. Help desk article dedicated to this. Users missing it causes delayed or lost transactions.

6. **"Source of funds / source of coins request — what is this?"**  
   Compliance requests for PSOF documentation come without warning mid-transaction or post-onboarding. Users find them intrusive with no explanation of how long review takes.

7. **"I accidentally created duplicate accounts"**  
   Dedicated help article suggests this is common. Causes KYC complications and account access issues.

8. **"I can't cancel my trade"**  
   Time-limited cancellation windows with unclear rules. Bank transfer trades have different cancellation rules than card trades.

9. **"I'm in the UK and I can't trade"**  
   The UK regulatory restriction blocks individual retail users. No proactive warning before a user attempts to sign up. Only discovered mid-flow.

10. **"Customer support takes too long to respond"**  
    Support is via Zendesk ticket system only (seen in page source). No live chat for end users. Especially painful when time-sensitive compliance requests block a transaction.

---

## 8. Feature Gaps Users Want

1. **Real-time transaction status tracker** — users want to know exactly where their money/crypto is at every moment
2. **Fee breakdown before committing** — total cost, spread vs. fee, visible without needing an account
3. **Faster or instant KYC** — automated identity check that completes in seconds, not days
4. **Clear KYC rejection reason** — specific feedback when verification fails, not a generic error
5. **Proactive notifications** — email/push when trade is processing, completed, or needs action
6. **Live chat support** — especially during compliance holds
7. **Mobile-native experience** — the widget is a web iframe; no native app integration
8. **Lower minimums** — users want to test with tiny amounts before committing larger sums
9. **Apple Pay / Google Pay** — frequently expected, absence noted

---

## 9. UX Patterns to Adopt

- **"One line of code" promise** — setting partner expectation of near-zero integration effort is compelling
- **Compliance-as-a-service positioning** — "We deal with all the legal, regulatory and compliance requirements so you can sit back and relax." Partners love this framing
- **Distinct user types** — Merchant, Corporate Trader, Individual Trader get separate signup/login flows, reducing confusion
- **Compliance articles in help center** — preemptively explaining Travel Rule, PSOF, PEP reduces support tickets
- **Coinify+ OTC "human touch"** for large trades — differentiator that builds trust for high-value customers

---

## 10. UX Patterns to Avoid

- **Fees hidden behind login** — users should see the complete cost, including spread, before creating an account
- **Silent KYC failure with no timeline** — manual review must communicate status proactively ("Your verification is in review, typically 2 hours")
- **Mid-transaction compliance surprises** — Source of Funds requests should be scoped pre-onboarding, not triggered mid-trade
- **Generic "help us" submit-a-ticket support** — for compliance holds, users need direct resolution paths
- **UK restriction discovered only at signup** — geo-gate should be checked and communicated immediately on the homepage or first step
- **Iframe-only widget** — no native SDK for React, Vue, or mobile WebView limits partner flexibility
- **No publicly accessible fee page** — makes comparison shopping impossible and erodes trust
- **Dashboard with no partner revenue visibility** — partners want to see how much they've earned from their widget traffic

---

## 11. Key Prodigy Opportunities vs. Coinify

| Gap | Prodigy Opportunity |
|-----|---------------------|
| Fees not visible pre-auth | Show full fee breakdown in the quote widget, before any account creation |
| KYC fails silently | Real-time KYC status with estimated time and specific failure reasons |
| No real-time transaction tracking | Live transaction status with step-by-step progress (submitted → processing → confirmed) |
| Partner dashboard shows payments, not revenue | Partner portal should show: earnings per transaction, total revenue, traffic metrics, widget performance |
| Widget is JS embed only | Offer React SDK, iframe, and headless API — let partners choose |
| Support is ticket-only | In-widget support flow for common issues; compliance holds should have a direct escalation path |
| Mobile not native | Widget renders in mobile WebView with native-quality UX |
