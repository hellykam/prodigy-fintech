# Widget Embed Patterns — How Competitors Handle B2B Integration

*Researched: June 2026. Sources: coinify.com, moonpay.com/business, ramp.network, transak.com, banxa.com, docs.transak.com, docs.moonpay.com*

---

## Overview

Every major crypto on/off-ramp offers an embeddable widget for B2B partners. This document maps exactly how each competitor handles embed mechanics, customization, partner revenue, and event callbacks — and what Prodigy should do better.

---

## 1. Coinify Widget

### Embed Method
**JavaScript snippet — "one line of code"**

```html
<!-- Coinify's actual marketing claim: "Just copy and paste one line of code" -->
<script src="https://trade.coinify.com/widget/coinify.min.js"
        data-partner-id="YOUR_PARTNER_ID"
        data-currency="EUR">
</script>
```

The script injects an iframe into the page. The full UI is rendered inside the iframe on Coinify's domain.

### Configuration Options
From marketing materials and partner docs (partially gated):
- `partner-id` — partner identifier for revenue tracking
- `currency` — pre-selected fiat currency
- `crypto` — pre-selected cryptocurrency
- `target-address` — pre-fill wallet address
- Widget size/shape (height, width, border-radius)
- Color/theme customization (limited, via contract negotiation)

### B2B Customization
- Basic branding customization available
- Coinify branding present in widget (not truly white-label without contract)
- No documented self-serve theme API — customization via partner agreement

### Callbacks / Events
- REST API webhooks for transaction events
- No public documentation of in-page JavaScript events (postMessage)
- Partners cannot deeply integrate transaction lifecycle into their own UI state

### Revenue Model
- Revenue share agreed in contract
- Reported in merchant portal (`app.coinify.com`)
- No public documentation of real-time earnings visibility
- Partners cannot set their own markup (rate is set by Coinify)

### Rating: B2B Embed Quality
```
Simplicity:    ████████░░ 8/10
Flexibility:   ████░░░░░░ 4/10
White-label:   ████░░░░░░ 4/10
Partner tools: ███░░░░░░░ 3/10
```

**Summary**: Easy to get started, hard to customize deeply. Revenue visibility is opaque. The "one line of code" promise is real but the flexibility ceiling is low.

---

## 2. MoonPay Widget

### Embed Methods (Two Paths)

#### Path 1: Hosted Widget (iframe/script)
```html
<!-- Hosted widget — MoonPay-rendered UI inside your page -->
<script src="https://static.moonpay.com/web-sdk/v1/moonpay-web-sdk.min.js"></script>
<script>
  const moonpay = window.MoonPayWebSdk.init({
    flow: 'buy',
    environment: 'production',
    apiKey: 'pk_live_xxx',
    currencyCode: 'eth',
    baseCurrencyCode: 'eur',
    colorCode: '#7D00FF', // theming
    externalCustomerId: 'user_123'
  });
  moonpay.show();
</script>
```

#### Path 2: Headless / Platform API
- Partner builds their own full UI
- Calls MoonPay's REST API directly
- KYC is handled via **secure single-use iframe frames** embedded in partner's page
- Apple Pay, Google Pay triggered natively without leaving partner's interface
- Users connect their existing MoonPay account (persistent session across 500+ apps)

### Configuration Options
- `colorCode` — primary color theming
- `currencyCode` / `baseCurrencyCode` — pre-select assets
- `externalCustomerId` — link MoonPay user to partner's user record
- `walletAddress` — pre-fill destination
- `email` — pre-fill for returning users
- `language` — locale
- `showWalletAddressForm` — hide/show wallet input

### Callbacks / Events
From developer docs:
- `onLoginComplete` — user authenticated
- `onTransactionCreated` — transaction initiated
- `onTransactionComplete` — transaction confirmed
- `onClose` — widget dismissed
- Webhooks for server-side: `transaction_created`, `transaction_updated`, `transaction_completed`, `transaction_failed`

### Revenue Model
- Partners receive a **revenue share** on every transaction
- Viewable in Partner Dashboard
- Rate negotiated during onboarding
- Partners cannot self-serve change the rate

### Headless API Flow
```
1. Partner backend: create_session(userId) → sessionToken
2. Partner frontend: fetch_payment_methods(sessionToken) → available methods
3. Partner frontend: get_quote(amount, currency, asset) → rate + fee
4. Partner frontend: render_apple_pay or card_fields (secure frames)
5. User confirms → Partner calls create_transaction()
6. MoonPay fires webhook: transaction_created → processing → completed
```

### Rating: B2B Embed Quality
```
Simplicity:    ███████░░░ 7/10
Flexibility:   ████████░░ 8/10
White-label:   ███████░░░ 7/10
Partner tools: ██████░░░░ 6/10
```

**Summary**: Best in class for headless API. The dual-path (hosted vs headless) gives partners real choice. The `onTransaction*` callbacks enable deep UI integration. Revenue visibility exists but isn't real-time by default.

---

## 3. Ramp Network Widget

### Embed Method
**URL-parameter-based widget URL (iframe or redirect)**

```javascript
// Embed as iframe via constructed URL
const rampUrl = new URL('https://app.rampnetwork.com/');
rampUrl.searchParams.set('hostApiKey', 'YOUR_API_KEY');
rampUrl.searchParams.set('defaultFlow', 'ONRAMP');
rampUrl.searchParams.set('enabledFlows', 'ONRAMP,OFFRAMP,SWAP');
rampUrl.searchParams.set('swapAsset', 'ETH');
rampUrl.searchParams.set('fiatCurrency', 'EUR');
rampUrl.searchParams.set('fiatValue', '100');
rampUrl.searchParams.set('userAddress', '0xABC...');

// Or use their SDK:
const ramp = new RampInstantSDK({
  hostApiKey: 'YOUR_API_KEY',
  enabledFlows: ['ONRAMP', 'OFFRAMP', 'SWAP'],
  defaultFlow: 'ONRAMP',
  swapAsset: 'ETH',
  fiatCurrency: 'EUR',
});
ramp.show();
```

### Configuration Options
- `hostApiKey` — partner identifier
- `defaultFlow` — ONRAMP, OFFRAMP, or SWAP
- `enabledFlows` — which tabs to show
- `swapAsset` / `offrampAsset` — pre-select crypto
- `fiatCurrency` / `fiatValue` — pre-fill fiat amount
- `userAddress` — destination wallet (pre-fill)
- `hostLogoUrl` — partner logo in widget
- `hostAppName` — partner name shown to user
- UTM parameters and Amplitude `client`/`profile` IDs are passed automatically

### Callbacks / Events
Ramp uses `postMessage` for in-page events:
```javascript
ramp.on('PURCHASE_CREATED', (event) => {
  console.log('Purchase created:', event.purchase);
});
ramp.on('PURCHASE_SUCCESSFUL', (event) => {
  // update your UI
});
ramp.on('WIDGET_CLOSE', () => {
  // user closed widget
});
```

Ramp also passes `client` (Amplitude deviceId) and `profile` (sessionId) params for attribution tracking.

### Revenue Model
- Revenue share based on transaction volume
- Partner dashboard for tracking
- Self-serve partner fee configuration: not publicly documented (appears contract-based)

### Rating: B2B Embed Quality
```
Simplicity:    ████████░░ 8/10
Flexibility:   ██████░░░░ 6/10
White-label:   █████░░░░░ 5/10
Partner tools: ██████░░░░ 6/10
```

**Summary**: Clean URL-parameter approach is very easy. JavaScript SDK with event callbacks is solid. The Amplitude attribution integration is a nice detail. But white-labeling is limited and partner fee control is contract-gated.

---

## 4. Transak Widget

### Embed Methods (Three Paths)

#### Path 1: Widget (hosted UI via query params)
```javascript
import TransakSDK from '@transak/transak-sdk';

const transak = new TransakSDK({
  apiKey: 'YOUR_API_KEY',
  environment: 'PRODUCTION',
  defaultCryptoCurrency: 'ETH',
  walletAddress: '0xABC...',
  fiatCurrency: 'EUR',
  fiatAmount: 100,
  partnerOrderId: 'order_123',
  partnerCustomerId: 'user_456',
  themeColor: '1E3B8A',
  colorMode: 'DARK',
  network: 'ethereum',
});
transak.init();
```

#### Path 2: Whitelabel API (fully headless)
- Partner builds entire UI from scratch
- Transak provides pricing, payment processing, KYC infrastructure
- Full docs at `docs.transak.com`

#### Path 3: Mobile WebView
- Optimized for rendering in iOS/Android WebView
- Same query parameters as widget but with mobile-specific settings

### Configuration Options (Query Parameters)
Transak has the most comprehensive public parameter list:
- `apiKey`, `environment`
- `defaultCryptoCurrency`, `cryptoCurrencyList`
- `defaultFiatCurrency`, `fiatCurrency`, `fiatAmount`
- `walletAddress`, `network`
- `partnerOrderId`, `partnerCustomerId`
- `themeColor`, `colorMode` (LIGHT/DARK)
- `disableWalletAddressForm`
- `isAutoFillUserData` — pre-fill user data from auth reliance
- `isFeeCalculationHidden` — hide fee from user view
- `exchangeScreenTitle`, `headerLogoUrl`

### Auth Reliance (Key Feature)
```javascript
// Partner passes a JWT containing user data
// Transak trusts partner's authentication
const transak = new TransakSDK({
  apiKey: 'YOUR_API_KEY',
  accessToken: partnerJWT, // user's authenticated session
  // Transak skips login; user goes directly to transaction
});
```

### KYC Reliance via Sumsub
```javascript
// If partner already KYC'd user via Sumsub, share verification:
const transak = new TransakSDK({
  apiKey: 'YOUR_API_KEY',
  sumsub: {
    applicantId: sumsubApplicantId,
    accessToken: sumsubToken,
  },
  // Transak accepts Sumsub KYC — user skips re-verification
});
```

### Callbacks / Events
```javascript
transak.on(TransakSDK.EVENTS.TRANSAK_ORDER_CREATED, (data) => {
  console.log('Order created:', data.status);
});
transak.on(TransakSDK.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (data) => {
  // Transaction complete
});
transak.on(TransakSDK.EVENTS.TRANSAK_ORDER_FAILED, (data) => {
  console.error('Order failed:', data);
});
transak.on(TransakSDK.EVENTS.TRANSAK_WIDGET_CLOSE, () => {
  // Widget dismissed
});
```

**WebSockets** also available for real-time server-side status:
```javascript
// Server-side real-time tracking
const ws = new WebSocket('wss://api.transak.com/ws/orders/' + orderId);
ws.on('message', (data) => {
  const order = JSON.parse(data);
  console.log('Status update:', order.status);
});
```

### Partner Fee Configuration (Self-Serve)
```
Partner Dashboard → Partner Fees → Set markup % → Configure payout wallet/bank
```
No sales call required. Partners set their own spread on top of Transak's base rate. Payouts are automated on a schedule configurable in the dashboard.

### Rating: B2B Embed Quality
```
Simplicity:    ███████░░░ 7/10
Flexibility:   █████████░ 9/10
White-label:   █████████░ 9/10
Partner tools: ████████░░ 8/10
```

**Summary**: Industry leader in B2B partner experience. The KYC Reliance via Sumsub is uniquely powerful. Auth Reliance removes login friction entirely. Self-serve fee configuration eliminates the need for a sales call. WebSocket real-time events are best in class.

---

## 5. Banxa Widget

### Embed Method
**JavaScript SDK (async load)**

```javascript
// From live Banxa homepage:
!function(callback) {
  var b = document.createElement('script');
  b.type = "text/javascript";
  b.async = !0;
  b.src = "https://sdk.banxa.com/js/banxa-sdk-latest.js";
  var x = document.getElementsByTagName('script')[0];
  x.parentNode.insertBefore(b, x);
  if (callback) { b.addEventListener("load", function() { callback() }) }
}(yourOnLoadFunction);

// Initialize after load:
const production = new Banxa('buy');
```

### REST API Example
```python
import requests

url = "https://api.banxa.com/partner/v2/fiats/buy"
headers = {
    "Accept": "application/json",
    "x-api-key": "YOUR_API_KEY"
}
response = requests.get(url, headers=headers)
```

### SDK Options
- Web JS SDK (async load)
- iOS native SDK
- Android native SDK
- React Native SDK

### Configuration
- Widget type: buy / sell
- Fiat / crypto pre-selection (via API params)
- Flexible partner pricing (volume-based, negotiated)

### Compliance Coverage
- MiCA authorized (AFM Netherlands)
- FDIC-insured US banking via DART Bank
- Biometric Privacy available

### Rating: B2B Embed Quality
```
Simplicity:    ██████░░░░ 6/10
Flexibility:   ███████░░░ 7/10
White-label:   ███████░░░ 7/10
Partner tools: ███████░░░ 7/10
```

**Summary**: Banxa's mobile SDKs (iOS, Android, React Native) are a key differentiator. The Python API example suggests a developer-friendly REST approach. Less consumer brand recognition but solid B2B infrastructure.

---

## 6. Webhook / Callback Design Comparison

| Provider | In-page events | Server webhooks | Real-time (WS) | Webhook encryption |
|----------|---------------|-----------------|----------------|---------------------|
| Coinify | Minimal (postMessage suspected) | ✓ (REST) | ✗ | Unknown |
| MoonPay | ✓ (onTransaction* callbacks) | ✓ | ✗ | ✓ |
| Ramp Network | ✓ (PURCHASE_CREATED etc.) | ✓ | ✗ | ✓ |
| Transak | ✓ (TRANSAK_ORDER_* events) | ✓ | ✓ (WebSockets) | ✓ (documented) |
| Banxa | ✓ (async callback) | ✓ | Unknown | Unknown |

---

## 7. Revenue Share & Partner Portal Comparison

| Provider | Fee control | Real-time earnings | Self-serve | Payout config |
|----------|-------------|-------------------|-----------|---------------|
| Coinify | Contract-set | Not documented | ✗ | ✗ |
| MoonPay | Contract-set | Dashboard (delayed) | ✗ | ✗ |
| Ramp Network | Contract-set | Dashboard | ✗ | ✗ |
| Transak | **Self-serve markup** | Dashboard | **✓** | **✓ (in dashboard)** |
| Banxa | Volume-based (flexible) | Dashboard | ✓ | ✓ |

---

## 8. Prodigy Widget Design Recommendations

Based on this analysis, here's what the Prodigy widget should implement:

### Embed Options (all three, partner chooses)

**Option A: Drop-in script (like Coinify / MoonPay Hosted)**
```html
<script src="https://widget.prodigy.finance/v1/widget.js"
        data-partner-id="pk_live_xxx"
        data-theme="dark"
        data-primary-color="#FF6B35"
        data-crypto="BTC,ETH,USDC"
        data-fiat="EUR">
</script>
```

**Option B: SDK with full event callbacks (like Ramp/Transak)**
```javascript
import { ProdigyWidget } from '@prodigy/widget-sdk';

const widget = new ProdigyWidget({
  partnerId: 'pk_live_xxx',
  theme: { primaryColor: '#FF6B35', mode: 'dark' },
  defaultCrypto: 'ETH',
  defaultFiat: 'EUR',
  walletAddress: user.walletAddress,
  partnerUserId: user.id,
});

widget.on('QUOTE_SHOWN', ({ fiatAmount, cryptoAmount, fee, spread }) => {
  // Partner can log or display fee info in their own UI
});
widget.on('KYC_STATUS_CHANGED', ({ status, step, estimatedTime }) => {
  // Partner can show KYC progress in their own app
});
widget.on('TRANSACTION_CREATED', ({ orderId, status }) => {
  // Update partner's order management system
});
widget.on('TRANSACTION_COMPLETED', ({ orderId, txHash }) => {
  // Confirm delivery in partner's app
});
widget.on('TRANSACTION_FAILED', ({ orderId, reason }) => {
  // Show retry flow in partner's app
});

widget.show();
```

**Option C: Headless REST API (like MoonPay Platform / Transak Whitelabel)**
- Partner builds 100% of the UI
- Prodigy handles: pricing, KYC, payment rails, compliance
- Partner calls REST API for quotes, creates transactions
- Webhooks + WebSockets for status

### B2B Partner Portal Must-Haves

Based on competitive analysis, every competitor falls short on partner portal features. Prodigy's B2B portal should include:

1. **Real-time earnings dashboard**
   - Revenue today / this week / this month
   - Per-transaction earnings with full audit trail
   - Revenue by widget placement / UTM source
   - Graphs: volume trend, conversion rate, average order value

2. **Self-serve fee configuration**
   - Set markup % on top of Prodigy's base rate
   - Different markups per flow (buy vs. sell)
   - Preview effective rate before applying
   - Payout wallet/bank account configuration

3. **Widget configuration playground**
   - Live preview of widget with current settings
   - Theme editor (colors, font, border radius)
   - Toggle: which cryptos/fiats to show
   - Embed code generator (snippet / SDK / headless)

4. **Analytics**
   - Conversion funnel: quote → KYC → payment → completed
   - Drop-off analysis by step
   - KYC success rate
   - Payment method breakdown

5. **Webhook management**
   - Register endpoints
   - Test webhooks with sample payloads
   - View delivery log with retry capability

### Prodigy Webhook Events (Recommended Design)
```javascript
// Transaction lifecycle
"prodigy.transaction.quote_accepted"   // User confirmed quote
"prodigy.transaction.payment_received" // Fiat payment cleared
"prodigy.transaction.crypto_sent"      // Crypto broadcast
"prodigy.transaction.completed"        // On-chain confirmed
"prodigy.transaction.failed"           // Error with reason
"prodigy.transaction.refund_initiated" // Refund triggered

// KYC lifecycle
"prodigy.kyc.started"
"prodigy.kyc.auto_approved"
"prodigy.kyc.pending_manual_review"
"prodigy.kyc.approved"
"prodigy.kyc.rejected"                 // includes reason code
"prodigy.kyc.document_requested"       // what doc is needed

// Partner events
"prodigy.partner.revenue_earned"       // per-transaction payout credit
```

### KYC Reliance Design (for Prodigy's KYC Simulator)

Prodigy's KYC simulator should expose a reliance API that lets B2B partners reuse their KYC:

```javascript
// Partner has already KYC'd the user via Sumsub or their own system
// They pass a signed token to Prodigy's widget
const widget = new ProdigyWidget({
  partnerId: 'pk_live_xxx',
  kycReliance: {
    provider: 'sumsub', // or 'custom'
    applicantId: 'sumsub_applicant_123',
    accessToken: 'sumsub_access_token',
  },
  // Widget skips KYC entirely for this user
});
```

This directly addresses the industry gap where only Transak offers this feature.
