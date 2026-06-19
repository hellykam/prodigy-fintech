# Risely [my file] — Research & Ideation: Competitor Benchmarking

**Source:** Figma "Risely [my file]" (`Qwbr3pXZJjh72Fx7kJOmqP`), `Research & Ideation` page (`#6:35779`)
**Sections covered:** Benchmarking (`#8:144415`), MIO product strategy (`#8:144268`), App state UX designs (`#8:143169`, `#8:143210`), Paysend deep-dive (`#8:144433`)
**Note:** The "how to fix legacy version" sections were excluded per design intent.

---

## 1. Page Overview — Research & Ideation Sections

| Section | Node | Fill | Purpose |
|---|---|---|---|
| Benchmarking | `#8:144415` | `#FFFFFF` | Competitor app screenshots with evaluations (37000px tall) |
| MIO | `#8:144268` | `#FBFBFB` | Risely product strategy canvas |
| App - Just After KYC | `#8:143169` | `#DBF0FF` (blue) | UX design for post-KYC app state |
| App - Balance > 0 | `#8:143210` | `#DBF0FF` (blue) | UX design for funded account state |
| App - Added cards | `#8:143262` | `#DBF0FF` (blue) | UX design for when cards are added |
| App - Added trading | `#8:143318` | `#DBF0FF` (blue) | UX design for trading-enabled state |
| Dribble Behance | `#8:144408` | `#F5FBFF` (light blue) | Visual UI inspiration screenshots |
| Research | `#10:251474` | `#F5F5F5` | Transaction flow ideation + design iterations |
| Address Book | `#8:143108` | — | Address book UX flows |
| Diagram AS IS | `#8:143809` | — | Current app flow diagram |
| Entities / Transfer IN OUT BETWEEN | `#8:143470` / `#8:143505` | — | Entity relationship + transfer taxonomy |

---

## 2. Competitor Benchmarking — All Apps Evaluated

The Benchmarking section organizes screenshots by app with blue sticky notes (`#80CAFF`) containing structured evaluations: **App name**, **✅ Pros**, **❌ Cons**, **Drunk test** (can user complete core actions impaired?).

---

### Paysend (`#8:144434`)

**State:** Onboarding  
**Screenshots:** 30+ screens (full onboarding + transfer flow)

| | |
|---|---|
| ✅ | Step-by-step flow; nice UI; empty states are valuable; hints throughout; keyboard behaviour is very good; almost no overlays; core action is always on main screen (e.g., confirm email); 2 simple buttons per screen; explanations of each action |
| ❌ | Too much text sometimes; some minor UI bugs |
| Drunk test | **Passed** |

**Annotation:** Green arrows (`#14AE5C`) highlight "auto" — automatic/smart input behaviour. Red arrows mark the one error state found.

---

### TBC Bank \[Ge\] (`#8:144415` group, y≈13734)

**State:** 1-year user  
**Screenshots:** 10–15 screens

| | |
|---|---|
| ✅ | Division between **immediate money and deposits**; transactions with **"+ show more"** pattern; **Transfer screen first** (not the selector first); **animation and sound on "Done"** screen; top-right corner **"Share details"** button |
| ❌ | Unnecessary "Ertguli" feature shown; each time you open app to make a transfer/pay taxes you need 2–4 extra clicks; duplications of sections in the menu (pros and cons) |
| Drunk test | **Passed** — actually transferred after 3 glasses of wine, no errors. Confirmation screen exists. |
| Note | User not interested in total balance, just when it's close to zero |

**Feature annotations on screenshots:**
- `card under the account` — card widget shown below the account balance
- `offers` — product/upsell offers section
- `most used feature is 3 clicks away` — critical UX issue
- `Add product` — CTA for adding new products/services
- `Loyalty` — loyalty rewards section

---

### BOG \[Ge\] (`#8:144415` group)

**State:** 6-year user

| | |
|---|---|
| ✅ | **Very clear how to make main actions** (transfer and copy account number) because there's a **tab icon**; primary actions visible at all times |
| ❌ | UI not polished; over-offering; sections not aligned; hard to understand cards vs accounts distinction; bugs |
| Drunk test | **Not passed** |

---

### Credo \[Ge\]

| | |
|---|---|
| ✅ | **Feedback when clicking** buttons and icons (haptic + visual); transfer flow has **very clear UI** |
| ❌ | Bugs; too many popups; animations between overlaying popups; unnecessary offers shown (wrong audience targeting) |
| Drunk test | **Not passed** |

---

### Kapitalbank \[uz\] (`#8:144415` group, y≈22388)

**State:** 3-month user

| | |
|---|---|
| ✅ | iOS notifications work; transfer screen is ok |
| ❌ | **No need to divide transfers/exchange/worldwide** — unnecessary complexity; not clear why cards/accounts don't show up |
| Drunk test | **Not passed** — each time unclear how to proceed |

**Annotation on screenshot:** `keyboard is not opening at once 🙃`

---

### Tinkoff \[ru\] (`#8:144415` group, y≈24602)

| | |
|---|---|
| ✅ | **Bold headers** (`big headers`); **blue action icons** stand out; lots of white space; many things on screen but cleaned up and organized; **inputs with label inside AND outside** (dual label pattern); **selector with tabs**; **connected card** widget; **search** functionality |
| ❌ | Overlays and animations switch context when user is entering an amount; no longer used for everyday life in 7 years |
| Drunk test | Don't remember |

**Feature annotations:**
- `big headers` — large, bold section headers
- `blue action icons` — color-coded interactive icons
- `inputs with label inside and label outside` — labels shown in field AND above it
- `selector with tabs` — tab-style selectors rather than dropdowns
- `connected card` — card linked to account displayed inline
- `search` — in-app search accessible

---

### Wirex (`#8:144818`)

| | |
|---|---|
| ✅ | (under review) |
| ❌ | (under review) |
| Drunk test | (TBD) |

**Screenshots:** ~18 screens covering wallet overview, exchange, transfers, card management (at y:67–1586)

---

### Payway \[uzb\]

| | |
|---|---|
| ✅ | **Shows full app + KYC together** — user sees the app first, then prompted to KYC; **some actions available WITHOUT KYC** (e.g., phone top-up after adding 1st card); **"Why" explained in KYC** screen — clear purpose stated; clear 1st page structure |
| ❌ | UI quality; language; icons |
| Drunk test | **Passed** |

---

### Humo transfers

| | |
|---|---|
| ✅ | **UI quality**; **Updates banner** (notification banner in app); **Transfer amount screen** (clean amount entry); **Saved transfers** (quick re-use of past recipients); **Empty states** done well; **font size and color** hierarchy |
| ❌ | Extra steps in flow; some typography issues |
| Drunk test | **Passed** |

---

### ZamZam

| | |
|---|---|
| ✅ | **Onboarding animation**; **buttons UI** (visual quality of button components) |
| ❌ | Dropdowns; links styling |
| Drunk test | **Passed** |

---

### Monbank

| | |
|---|---|
| ✅ | (under review) |
| ❌ | (under review) |
| Drunk test | **Passed** |

---

### Privat24

| | |
|---|---|
| ✅ | **Marketing video in App Store** — notable App Store listing strategy |
| ❌ | (under review) |
| Drunk test | **Passed** |

---

### Wise (`#8:145004`)

**Screenshots:** 60+ screens in 7 groups

**Screen groups with annotations:**
| Group | Annotation | What it shows |
|---|---|---|
| First column (x:2216) | `transaction` | Transaction history screen |
| | `send` | Send money flow |
| Mid section | `exchange` | Exchange/convert screen |
| | `account` | Account overview |
| Left column | `deposits` | Deposits/top-up screens |
| Right side | `feedback on tap` | Haptic/visual feedback pattern on each interaction |
| Far right (x:2144) | `tasks` | Task list / onboarding checklist |
| | `invite` | Invite friends / referral screen |
| Bottom row | `open` | Account/product opening flow |

| | |
|---|---|
| ✅ | Deep feature coverage; tasks-based onboarding; clear exchange flows; deposit/withdrawal screens; invite feature; tap feedback |
| ❌ | (under review) |
| Drunk test | (TBD) |

---

### Revolut (`#8:145092`, Made by Leo)

**Screenshots:** 100+ screens in 10 groups (largest competitor analysis)

**Feature annotation:** `native dropdown` — Revolut uses native OS dropdown selectors instead of custom-built ones

| | |
|---|---|
| ✅ | (deep review by Leo, Loom videos referenced) |
| ❌ | (under review) |
| Drunk test | (TBD) |

---

### Trusteeglobal

| | |
|---|---|
| Notes | Listed as "Waiting for Trusteeglobal — from Vlad" |
| Drunk test | (TBD) |

---

### OneZero (neobank)

| | |
|---|---|
| ✅ | (under review) |
| ❌ | (under review) |
| Drunk test | (TBD) |

---

### Hapoalim (Israeli bank)

| | |
|---|---|
| Notes | Linked from Alexander Panasenko. URL: bankhapoalim.com |
| Drunk test | (TBD) |

---

### Also recorded (not yet in STICKY evaluations)

From the text note in Benchmarking:
> "Apps recorded: BOG.mp4 Credo 2.mov Credo.mp4 Kapitalbank.mp4 pay way Paysend 2.mp4 Paysend.mp4 Sber 2.mp4 Sber.mp4 Taj Uz transf.mp4 TBC.mp4 Tinkoff.mp4 Wirex.mp4 Wise.mp4 Wise.png"

Additional by Leo (Loom recordings): Wirex and Revolut full walkthroughs

---

## 3. Extracted Best Features & Design Insights

### 3.1 Core UX Patterns Worth Borrowing

| Feature | Source | How to apply to Risely |
|---|---|---|
| **Feedback on tap** | Credo, Wise | Every button/icon press must have haptic + visual feedback. No silent taps. |
| **Transfer screen first, selector second** | TBC | Show the transfer screen directly; don't make user choose transfer type before seeing the UI |
| **"Done" animation + sound** | TBC | Add animation and subtle sound to the completed-transfer state |
| **"Share details" top right** | TBC | Single tap to share bank details (IBAN + REF) from account screen |
| **Divide immediate money from deposits** | TBC | Separate "available now" balance from locked/deposit funds |
| **Bold headers + white space** | Tinkoff | Big Gilroy Bold section headers, generous padding between sections |
| **Blue (or branded) action icons** | Tinkoff | Color-code primary action icons to make them stand out from informational content |
| **Dual-label inputs** | Tinkoff | Label both inside the field (placeholder) AND above it (persistent label) |
| **Saved transfers / beneficials** | Humo, Wise | Quick-access list of frequent recipients on the Send screen |
| **Empty states with value** | Paysend, Humo | Empty states should explain what belongs here + guide next action |
| **Onboarding tasks list** | Wise | Show a task list post-KYC to guide first-time users step by step |
| **Invite feature accessible** | Wise | Referral/invite visible within main app navigation, not buried |
| **Native OS dropdowns** | Revolut | Prefer native iOS/Android dropdowns over custom-built ones |
| **Transfer amount screen clean** | Humo | Dedicated amount entry screen with clear keyboard behaviour |
| **Core action always on main screen** | Paysend | The most important action (confirm, send) is always the primary CTA on current screen |
| **Actions available pre-KYC** | Payway | Allow at least one useful action (phone top-up, viewing rates) before KYC is complete |
| **"Why" explained in KYC** | Payway | KYC screen must explain WHY this step is required |
| **2 simple buttons per screen** | Paysend | Max 2 primary choices per screen — don't overload decision points |
| **Transactions by month grouping** | various | Group transaction history by month; show +/- direction; show balance after transaction |

---

### 3.2 Anti-Patterns to Avoid

| Anti-pattern | Source | Why bad |
|---|---|---|
| **Over-offering** | BOG, Credo | Showing products/services irrelevant to user type increases cognitive load and noise |
| **Transfers/exchange/worldwide split** | Kapitalbank | Dividing what is functionally one flow into 3 entry points confuses users |
| **Overlays + animations switching context** | Tinkoff, Credo | Context switches while entering amounts breaks user focus and causes errors |
| **Cards vs accounts unclear** | BOG | Users can't distinguish card balance from account balance — use clear visual hierarchy |
| **Too much text** | Paysend | Even with good UI, excessive text on a screen loses users |
| **Duplicate nav sections** | TBC | Showing the same feature in multiple nav locations confuses navigation mental model |
| **Extra steps in transfer flow** | Humo, Kapitalbank | Each extra click is a dropout risk — especially on mobile |
| **No confirmation screen** | various | BOG failed the "drunk test" — always require confirmation before executing transfers |

---

### 3.3 Drunk Test Results Summary

| App | Result | Key issue |
|---|---|---|
| Paysend | ✅ Pass | — |
| TBC Bank | ✅ Pass | Needs confirmation screen |
| Payway | ✅ Pass | — |
| Humo | ✅ Pass | — |
| ZamZam | ✅ Pass | — |
| Monbank | ✅ Pass | — |
| Privat24 | ✅ Pass | — |
| BOG | ❌ Fail | UI unclear, hard to find main actions |
| Credo | ❌ Fail | Too many animations/popups |
| Kapitalbank | ❌ Fail | Each time unclear how to proceed |
| Wirex | TBD | — |
| Wise | TBD | — |
| Revolut | TBD | — |

---

## 4. MIO — Risely Product Strategy Canvas (`#8:144268`)

This section is a FIRE (Features, Integrity, Resources, Education) product thinking canvas for Risely.

### 4.1 Core Features (numbered priority)

| # | Feature | Detail |
|---|---|---|
| 1 | Preps: Register → KYC → Open EUR account | Opening another account after first |
| 2 | Transfer: In / Out / Between | Core money movement; Next: Cards, Deposit |
| 3 | "Feel safe" | Track + be notified |
| 4 | Brand relationships | How Risely helps user save, earn, expand business. Next: Referral, payment link |

### 4.2 Target Audiences

1. **Crypto geeks** — already comfortable with crypto
2. **Immigrants / Emigrants** (non-crypto users) — most underserved, primary audience
3. **Digital Nomads** (freelancers, e-business owners) — payment flexibility needed
4. **Worldwide service providers** (business owners + their accountants) — cross-border complexity

**App usage context:**
> "When they need to receive, send — tbd" — user opens app reactively, not for browsing

### 4.3 User Problems Being Solved

From the `Description` annotation:
```
- All wallets/payment methods in different places
- Got blocked by some apps
- Hard to get paid from another country without having local bank account
  - Swifts are expensive and slow
  - Banks need payment proofs, have policies
    (ex: sent $1k from Georgia to Uzbekistan → Uz bank returned $950 without explanation)
- For non-crypto users: hard to use crypto ("you need to know how to use it/when/what/etc")
```

### 4.4 Value Propositions

1. **Transfer fiat & stable crypto** — safe and fast
2. **Save on lower %** → subscribe on currency rate alerts
3. **Pay online with safe digital cards**
4. **Single place for wallets of any currency** → get paid worldwide → setup money flows [shortcuts]

### 4.5 User → Risely Connection

```
EXTERNAL FORCES that influence user:
  - Wants $ ↔ ₿
  - Bank account in that country
  - Not being blocked (passport or business type)
  - Diversification — "all in one place"
  - Ads
```

User connects to Risely via:
- Uses for personal and business transfers (green connector)
- Exchange offers based on market, low %, diverse countries (purple connector)

### 4.6 System Architecture (Critical Circuit)

**Tech:** App—Transfers, Backend, App—other features, AdminApp: Support, Admin for Finances  
**Human:** Support (×2)  
**Partners:** BAS Providers, Sumsub (KYC), Card providers `[yellow — not yet finalized]`

### 4.7 Education Strategy

From `Levels of education` annotation:
```
- Ads, blog — correct expectations of the value
- Onboarding
- Demo account — perform anything, but fake
- Offers & suggestions based on user profile & behavior
- Community in Discord + support there
```

### 4.8 Axioms (Design Principles)

From the Resources and Integrity sections:
- **Less is more** — excess of resources is as bad as a shortage
- **Integrity** — elements complement and replace functions of each other; information passes through subsystems with minimal losses
- **Critical circuit** — the app's most important path is: App—Transfers → Backend → BAS Providers → Sumsub → Card providers
- **Topology** — diagram of resource movement; changes when a resource becomes scarce or redundant

---

## 5. App State UX Designs

### 5.1 App — Just After KYC (`#8:143169`)

**Trigger:** KYC approved. This is what the user sees first.

**Left column (purple `#9747FF` — Email + In-App notification):**
```
Email + In-App Notification:
  "Hurray, welcome to Risely"

CTA: "Open my EUR Account in EUR bank"
     (rounded button, ~304×127px)
```

**Center column 1 — What user has (white card):**
```
Accounts:
  EUR acc in Lithuania  [TRANSFER IN (first time flow)]
  "Means you have this currency account in this country,
   legally, but also REF"

Wallets:
  BTC          [Open all →]
  coin N       +
  coin N
  "Open stable coin's wallets in Risely"

Transactions:
  "Here you will have your transaction"
```

**Center column 2 — Secondary features (white card):**
```
Support
Notifications
Safety tasks
```

**Right side — First Time Transfer IN (flow spec):**
```
First time transferring IN: flow in 1-3 steps

To receive money to your EUR bank:
1. Understand what transfer you're going to make
   (local SEPA / SWIFT / Global) — selector — choose — 
   (?) icon to learn the difference + how long each takes
2. Open your bank app
3. Copy REF NUMBER and input it
4. Copy IBAN and add it to corresponding fields
5. Hit send!
   → if they send USD, we would have to auto-exchange to EUR
6. Track transaction — email + in-app notification when 
   money arrives (or was rejected)

"Share instruction with another person — kinda GET PAID"
[SHARE button]
```

**"Open new account" flow:**
```
→ Choose currency
→ Choose country where we open it
→ (fixed existing flow)
```

Note: "Just show them to the user 1 by 1 or all together (need to fix design)"

---

### 5.2 App — Balance > 0 (`#8:143210`)

**Trigger:** User has funded their account.

**Main screen structure:**
```
[Left side card — screenshot]

Total: $203   ← aggregated across all wallets/accounts

↑ Safety task   (chip, light purple)
↑ Notification / or track   (chip, light purple)

Accounts:
  EUR acc in Lithuania   [IN] [OUT] [BETWEEN]   $2
  USD in Germany         [IN] [OUT] [BETWEEN]   $200
  +   ← add new account

Wallets:
  Show by: con/network [toggle]
  BTC     Network     $1
  coin N  Network
  coin N  Network
  +   ← add new wallet

Transactions:
  "5 transactions + track them + see all"

Transfer:
  Balance > 0 → Transfer CTA

Transfer flow:
  From:       [Last used account]
  How:        [other fields & details]
  Beneficials [saved list]
  To:         [Last used option]
```

**"Balance = 0 (spent)" empty state:**
```
Transfer
  [Balance = 0 (spent)]
  "Since your total Risely budget is 0, you can't transfer anything"
```

**Burger menu (right side card, gray):**
```
Settings
Profile
Safety tasks
Logout / delete account
```

**Verification center** shown below burger (light gray section, 232×128px)

---

## 6. Paysend Deep-Dive (`#8:144433`)

Paysend has the most thoroughly annotated onboarding in the benchmarking section — 30+ screenshots with green connectors showing the happy path and red connectors marking problem states.

**What makes Paysend's onboarding excellent (designer notes):**

| Principle | How Paysend does it |
|---|---|
| Step-by-step | One decision per screen, no overloading |
| Empty states valuable | Every empty state explains what will be there and guides the user |
| Hints throughout | Contextual help text visible without needing to tap |
| Keyboard behaviour | Keyboard opens immediately on input screens, correct type per field |
| Almost no overlays | Content stays in place; sheets used sparingly |
| Core action on main screen | The primary task (e.g., confirm email) is always the first CTA |
| 2 simple buttons | Max two choices per screen |
| Explanations of each action | Every action labeled + described before user taps |
| `auto` annotation | Smart OTP auto-fill; system automatically completes where possible |

**Green arrow flow** (`#14AE5C`) traces the happy path through all 30+ screens — rare that one designer traces a full golden path this explicitly.

**Red arrows** mark a single error state at the end of the flow (screens at position x:2942) — the only confirmed problem in the otherwise clean flow.

---

## 7. Research Section — Design Ideation (`#10:251474`)

### 7.1 Transactions Ideation (`#10:251475`)

Sub-section: "transactions - ideation" (5415×4179px)

**Receive — Fiat external:**
```
Receive:
  - from what account
    - IBANs
    - total money on that account
    - BAS in EUR zone, 2 methods:
      - SEPA (within EU) — preferred
      - SWIFT
```

**Receive — Crypto:**
```
Network selector  [top]
  - deposit address + QR code
  - [Share] button (yellow rect, 241×45)
```

**"Transfer into Risely account from:"**
- Transfer in Risely to account
- If you transfer into Risely account from:
  - Europe → (details)
  - from outside EU → SWIFT, then you need: [sharing flow]

**Send:**
```
Asset internal/external:
  - internal: client ID, what to send (asset)
    - only Risely balances
    - doesn't matter if crypto or fiat
  - external: network, asset, amount, address
    - network
    - crypto account
```

**Frame "Request Payment - FIAT - FCBank User" (`#10:251884`, 645×1453)** — a designed wireframe for requesting FIAT payment

**Frame "Request Payment - Crypto - Other Wallet" (`#10:251476`, 375×845)** — a designed wireframe for requesting crypto payment

### 7.2 Start Here — Prototype Index (`#10:251920`)

A 1920×4499px white frame titled "Risely App Prototypes" that serves as the prototype navigation hub.

**UX Flow Updates:**
```
"Transfers only — variants" (V1)
"V1: Step by step"
```

**Feature categorization grid (process × screen type):**

| Category | Subcategories |
|---|---|
| PROCESSES | Transfers, Accounts, Safety, Entities, Notifications, Burger Menu |
| "SCREENS" | — |
| In App: Toaster | [variants listed as chips] |
| In App: Screen | [variants listed as chips] |
| Share | [variants] |
| Tech | [variants] |

**UI Fixes:**
- `verif. center` annotation pointing to a UI region
- Screenshots: `image 286` (1665×486), `image 288` (996×421), `image 289` (1172×407)

### 7.3 Section 3 — Screen Iterations (`#10:252051`)

Contains designed screens (375×812 each) comparing current Risely design vs ideation:

| Screen | Node | Notes |
|---|---|---|
| `Main` | `#10:252538` | Main homepage iteration |
| `My Wallets - Main Wallet` | `#10:252267` | Wallet list + main wallet detail |
| `My Wallets / EURO` (comparison image) | `#10:252456` | Screenshot comparison |
| `Crypto to Other User 7` | `#10:252457` | Crypto send flow iteration |
| `Main Wallet - Asset - Deep Dive` | `#10:252097` | Wallet asset detail iteration |
| iPhone 13 mini - 1 through 6 | various | Comparison screens |

Note: `"??? added verification center instead of wallets, coz wallets confuse with accounts"` — designer's decision to show Verification Center in primary nav instead of Wallets.

---

## 8. Consolidated Design Principles for Risely (from Competitor Research)

### Navigation & Information Architecture
- **Primary actions in 1 click** — send, receive must be reachable from main screen
- **No 3+ click paths** for most-used features (TBC anti-pattern noted: "most used feature is 3 clicks away")
- **Accounts ≠ Wallets** — users get confused; use distinct visual treatment and separate sections
- **Single navigation entry per feature** — avoid TBC's duplication pattern

### Transfer Flow
- **Amount-first** — show amount input before type selection where possible
- **Transfer IN = 1–3 steps** (Risely's own spec): method selector → IBAN copy → confirmation
- **REF NUMBER prominently shown** for incoming FIAT transfers
- **Auto-exchange disclosed** — if USD arrives in EUR account, show "will be converted" upfront
- **SEPA vs SWIFT** — call out the difference (time + cost) with a `(?)` hint; prefer SEPA

### Empty States
- Every empty state explains what will be here + what to do next (Paysend, Humo pattern)
- **"Balance = 0 (spent)"** ≠ **"KYC approved, $=0"** — different copy for different causes of zero balance

### Post-KYC Onboarding (Risely specific)
1. Email + in-app: "Hurray, welcome to Risely"
2. Show accounts + wallets + empty transactions
3. Primary CTA: "Open my EUR Account in EUR bank"
4. Secondary: "Transfer IN (first time flow)" with step-by-step guide
5. Shareable instruction card ("GET PAID" feature)

### Safety & Trust
- **Confirmation screen always** before executing transfers (drunk test requirement)
- **Animation + sound on Done** state (TBC benchmark)
- **Safety tasks chip** on homepage — visible but not blocking
- **Notification / track chip** — user can always check status of in-progress transfers

### Onboarding
- Show app first, KYC second (Payway pattern)
- Explain WHY KYC is required (Payway)
- Allow at least one action pre-KYC (Payway)
- Step-by-step, one decision per screen (Paysend pattern)
- Max 2 buttons per screen

### Visual Design
- Bold section headers (Gilroy Bold, large) — Tinkoff benchmark
- Blue / branded action icons to distinguish interactive from informational
- Dual-label inputs (placeholder inside + label above)
- Generous white space between sections
- Native OS dropdowns over custom implementations (Revolut)

---

## 9. Figma Links

| Section | URL |
|---|---|
| Full Research & Ideation page | [#6:35779](https://www.figma.com/design/Qwbr3pXZJjh72Fx7kJOmqP/Risely--my-file-?node-id=6-35779) |
| Benchmarking section | [#8:144415](https://www.figma.com/design/Qwbr3pXZJjh72Fx7kJOmqP/Risely--my-file-?node-id=8-144415) |
| MIO product canvas | [#8:144268](https://www.figma.com/design/Qwbr3pXZJjh72Fx7kJOmqP/Risely--my-file-?node-id=8-144268) |
| App - Just After KYC | [#8:143169](https://www.figma.com/design/Qwbr3pXZJjh72Fx7kJOmqP/Risely--my-file-?node-id=8-143169) |
| App - Balance > 0 | [#8:143210](https://www.figma.com/design/Qwbr3pXZJjh72Fx7kJOmqP/Risely--my-file-?node-id=8-143210) |
| Paysend deep-dive | [#8:144433](https://www.figma.com/design/Qwbr3pXZJjh72Fx7kJOmqP/Risely--my-file-?node-id=8-144433) |
| Research / ideation | [#10:251474](https://www.figma.com/design/Qwbr3pXZJjh72Fx7kJOmqP/Risely--my-file-?node-id=10-251474) |
