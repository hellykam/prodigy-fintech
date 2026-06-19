# Risely [my file] — Features for Next Versions

**Source:** Figma "Risely [my file]" (`Qwbr3pXZJjh72Fx7kJOmqP`), Research & Ideation page (`#6:35779`)
**Header node:** `#8:80254` — "Office use / Header figma" (28613px wide, amber gradient strip)
**Header text:** **"Features for next versions"**

---

## 1. Sections Covered

| Section | Node | Fill | Purpose |
|---|---|---|---|
| Address Book | `#8:143108` | `#FFFCF1` (yellow) | Beneficiary + send flow decision tree |
| Entities | `#8:143470` | `#FBF7FF` (light purple) | Screen inventory + feature matrix |
| Transfer IN OUT BETWEEN | `#8:143505` | `#FBF7FF` (light purple) | Transfer flow architecture |
| Login & KYC | `#8:143376` | `#FFFCF1` (yellow) | Full login/signup/KYC UX map |

---

## 2. Entities — Feature Matrix (`#8:143470`)

A diagram using color-coded shape-with-text nodes to categorize every screen/feature by status.

### Color Legend

| Color | Meaning |
|---|---|
| Blue `#BDE3FF` | **Core screens** — MVP, must build |
| Purple `#E4CCFF` | **Future features** — planned, not MVP |
| Pink `#FFCCFC` | **Marketing/promotion screens** |
| Dark `#1E1E1E` | **Primary flows** (TRANSFERS screen) |
| Gray `#E6E6E6` | **"COMING SOON"** — exists in Burger Menu, grayed out |
| Blue oval `#0D99FF` | **Safety tasks** sub-list |

### Core Screens (Blue `#BDE3FF`)

| Screen | Notes |
|---|---|
| **Accounts list** | Main accounts overview |
| **Beneficials (saved IBANs)** | Address book / saved recipients |
| **Account transactions details + action buttons** | Per-account transaction detail with CTAs |
| **1 transaction tracking + help + action buttons** | Single transaction tracking with support CTAs |
| **All transactions + filters** | Global transactions list; search is optional for MVP |
| **Wallet transactions details, balances, action buttons** | Per-wallet detail screen |

### Primary Flow (Dark `#1E1E1E`)

**TRANSFERS Screen** — a tall dark rectangle representing the main transfers entry point, connected by arrows to Account transactions detail and Wallet transactions detail.

### Future Features (Purple `#E4CCFF`)

| Feature | Notes |
|---|---|
| **Confirmation popup** | ok / not ok / error states |
| **Share account/wallet's details (flow)** | Share IBAN, crypto address |
| **Notification in-app, email, SMS** | Multi-channel notification system |

### Marketing Screen (Pink `#FFCCFC`)

- **Marketing-sh screen** — promotional/upsell screen for features

### Burger Menu Full (Gray — "COMING SOON")

Contains ALL features not yet active. Design pattern: show them grayed out with "COMING SOON" label.

```
Burger Menu Full:
  Settings
  Profile
  Safety tasks
  Logout / delete account
```

> **Design note:** "we store here all what is not working and make it gray out with COMING SOON"

**Verification center** — sub-item within Burger Menu (232×128px)

### Safety Tasks Group (Blue oval `#0D99FF`)

Accessible from Burger Menu:

1. **Biometrics** — set up Face ID / fingerprint
2. **Set MPIN** — set mobile PIN
3. **Confirm email** — email verification
4. **Confirm phone** — phone verification
5. **OTP** — one-time password setup

### Additional sections (Gray `#E6E6E6`)

**Notifications, support tickets & chat, safety tasks** — labeled "Communication and help during onboarding process"

**Login, signup, OTP** — auth screens group

**"Repeat transfer"** connector — arrow showing the repeat-a-past-transaction flow path

### Screenshots attached

- 2 screenshots of current burger menu implementation (175×315px each)
- 1 screenshot of safety tasks screen (IMG_3514, 188×407px)

---

## 3. Transfer IN OUT BETWEEN — Architecture (`#8:143505`)

A flow diagram showing the three core transfer types and their sub-flows.

### Three Primary Flows

All three displayed as large dark ovals (`#1E1E1E`):

```
Transfer OUT        ← x:48 y:49 (384×104px)
Transfer BETWEEN    ← x:48 y:516 (384×96px)
Transfer IN         ← x:48 y:894 (384×96px)
```

---

### Transfer OUT

**Flow diagram (gray boxes = screens/steps):**

```
Transfer OUT
  │
  ├─→ [2 main inputs/dropdowns + extra fields]
  │     - "Usual" variant (standard flow)
  │     │
  │     └─→ [Confirmation screen]
  │               │
  │               └─→ [Tracking Transaction screen]
  │                     - "with a link to account"
  │                     - notification "Notification OK" (purple)
  │
  ├─→ "Onboarding pre-action edu feature" — first time CTA
  │
  ├─→ [Open New Account]
  │     - currency
  │     - country + explanation
  │
  └─→ [Blocker / error / interrupted action]
        - by user OR by app
        - what to do
```

**First time variant:**
- `First time` label (Inter Bold 40px) marks the path for users who've never transferred
- Connects to Transfer IN's IBAN marketing screen

**Transaction list connections:**
```
List of transactions in:
  - all transactions
  - account's transactions
```

Both the Tracking screen and the accounts-level list pull from the same transaction data.

---

### Transfer IN

**"Usual" path:**
```
[QR code / copy IBAN + REF NUMBER — flow]
(same thing in accounts section)
```

**"First time" path (pink `#FFCCFC`):**
```
Transfer IN / iBAN Marketing-sh screen
  - step by step to copy ref number
  - If USD to your EUR account → auto conversion
```

Screenshot attached: mobile screen showing IBAN copy interface (87×179px)

---

### Transfer BETWEEN

Between Risely accounts (internal). Connects to:
- Same Confirmation screen
- Notification OK

---

### Error / Blocker Handling (Pink `#FFC7C2`)

> "Blocker, error, interrupted action by user or app — and what to do"

This node appears as a separate sub-section, connecting from all three transfer flows. It covers:
- User cancels mid-flow
- App blocks the action
- Technical error states

---

## 4. Address Book — Beneficiary Selection Decision Tree (`#8:143108`)

A comprehensive flow diagram for the Send flow, starting from account selection through to final confirmation.

### Entry Point

```
[Account + Amount]
  "as we can't send crypto to banks, it's easy to select
   from accounts first to define what user is sending"
  │
  └─→ [Beneficials list]
        - Name or email list of beneficials
        - "add beneficial" button
        - My accounts
        - People from previous transactions
```

### 4 Recipient Branches

```
                    ┌─────────────────────────────────────────────────────┐
                    │           BENEFICIALS LIST                           │
                    └──────────┬────────────────────────────────┬──────────┘
                    ┌──────────▼──────────┐          ┌──────────▼──────────┐
                    │   RISELY CLIENT      │          │  NOT RISELY CLIENT   │
                    └──────────┬──────────┘          └──────────┬──────────┘
               ┌───────────────┼────────────────┐         ┌─────┴────────────┐
     ┌─────────▼──────┐  ┌────▼────────────┐    │  ┌──────▼────┐  ┌────────▼───────┐
     │ SAVED in benef │  │ NOT saved in    │    │  │ SAVED in  │  │ NOT saved in   │
     └────────┬───────┘  │ Benef.          │    │  │ Benef.    │  │ Benef.         │
              │           └────────┬────────┘    │  └─────┬─────┘  └───────┬────────┘
```

---

#### Branch A: Risely Client, Saved in Beneficials

```
→ Show pre-filled form
   Toggles/checkboxes:
     □ Add to saved beneficiary?
→ [Confirm transfer screen — Send]
→ MPIN
→ Done
```

---

#### Branch B: Risely Client, NOT Saved in Beneficials

```
→ Show pre-filled form
   Toggles/checkboxes:
     □ Add to saved beneficiary?
     □ Personal or Business?

OPEN QUESTION (red connector):
  "if 1 risely user can have both personal AND business under 1 email??"
  "if 1 user's email = ONLY personal OR ONLY business??"

→ [Confirm transfer screen — Send]
→ MPIN
```

---

#### Branch C: NOT Risely Client, Saved in Beneficials

```
→ "SUGGEST to re-do that transaction?"
  "you've sent crypto to that person, wanna do the same now? y/n"
  label: "transaction to user with this email exists"

Account that was chosen is: [Blue node #0D99FF]
  ├─→ crypto → Fields:
  │     - Network
  │     - Asset they receive (currency)
  │     - Address (e.g. "USDT in Ethereum network")
  │     Gray oval `#757575`
  │
  └─→ fiat → [SEPA or SWIFT — pre-selected]
              [Personal or business: default = business]
              Gray oval `#757575`
                ├─→ personal → [???] (pink `#FFC7C2` — not yet designed)
                └─→ business → Full form fields
```

**Full form fields for business fiat (from `#8:143141`):**
```
Sort Code           Routing              Reference
Beneficiary Name:   [David Dvir]
Beneficiary Bank:   [Barclays]          Bank Country: [Ukraine]
Beneficiary Email:  [david.dvir@vixigroup.com]
Beneficiary Country: [Ukraine]          Upload document
IBAN/Account number: [1212123213424123]
Beneficiary Address
☑ Take Network fee from sent amount

Currency to receive:  [Choose Currency (find) — US Dollar]
Network fee:          12 USD
Amount:               10,000$            MAX
SWIFT/BIC:            BCLYUK123456323
Conversion Rate:      1ETH ≈ $2000
Receive amount:       10,000 USD
Value ≈:              10,000 USD

Sort Code: 0001123002    Routing: 0001123002
Beneficiary Bank: Barclays    Bank Country: Ukraine
Bank address      Address
```

---

#### Branch D: NOT Risely Client, NOT Saved in Beneficials

```
label: "never transferred to user with this email before"

IF CRYPTO: "we show all fields from start" →
  [Fields: Network, Asset, Address]

IF FIAT:
  → SEPA or SWIFT (pre-selected)
  → personal or business
  → full business form (same as Branch C)

→ Confirm transfer screen — Send
→ MPIN

Toggle: □ "Invite to Risely to have 0 fees in transfer"
```

---

### Key Open Question (Red connectors)

```
"if 1 risely user can have both personal and business under 1 email??"
"if 1 user's email = ONLY personal OR ONLY business??"
```

These are flagged as unresolved with red connectors (`#F24822`) — critical business logic questions.

---

## 5. Login & KYC — Full UX Map (`#8:143376`)

A complete flow diagram for both new users (not logged in) and returning users (logged in).

### 5.1 Not Logged-in User / First Timer

```
"HELLO" screen (pink #FFCCFC)
  - Marketing screen
  - Features of current version, what to expect
  - CTAs: LOGIN / SIGNUP

[Sign Up / In button]  ← dark oval
  │
  ├─→ Signup: Country + Email
  │     │
  │     ├─→ Blacklisted → "Sorry we don't operate in your country"
  │     │                  (we don't show the reason)
  │     │
  │     └─→ OK → [Before KYC stage] (yellow node)
  │                   │
  │                   ├─→ "Pass KYC first" + why to do it
  │                   │
  │                   ├─→ App on this stage (blue section):
  │                   │     - "Here you will have...Accounts, coins, wallets"
  │                   │     - "You should make KYC now, without it we can't do anything"
  │                   │     - Safety tasks / Support + Notifications / VERIFICATION CENTER
  │                   │     - Burger: Logout / Safety / About
  │                   │     - [Make KYC] button
  │                   │
  │                   └─→ [KYC stage] (yellow node)
  │                             │
  │                             ├─→ Interrupted → loop (continue later)
  │                             │
  │                             ├─→ Not Passed (red connector) →
  │                             │     "Btn CONTINUE KYC + contact support (chat/whatsapp)"
  │                             │     (pink #FFC7C2)
  │                             │
  │                             └─→ Passed (green — this is rare/positive path) →
  │                                   [While user waits KYC in Sumsub] (yellow)
  │                                         │
  │                                         ├─→ "Your KYC status btn: CHECK"
  │                                         │
  │                                         ├─→ In the meantime (blue section):
  │                                         │     - Safety tasks
  │                                         │     - Organize your accounts
  │                                         │     - Questionnaire + pre-creation of accounts/wallets
  │                                         │       "you will have EUR in Spain by default"
  │                                         │     - Which wallets do you have / want to use
  │                                         │     - Organize your wallets
  │                                         │     - Add withdraw methods (yours + people you'd share to)
  │                                         │
  │                                         ├─→ Check KYC status → App on this stage (blue):
  │                                         │     - Shows accounts + wallets placeholder
  │                                         │     - Safety tasks / Support+Notif / VERIFICATION CENTER
  │                                         │     - Burger: Logout/Safety/About
  │                                         │     - "Organize your wallets while we are waiting for KYC [Beneficiary]"
  │                                         │     - [Check KYC status] + [Support] buttons
  │                                         │
  │                                         └─→ Email + In-App Notification (purple `#9747FF`)
  │                                               → KYC approved notification
```

---

### 5.2 Logged-in User (Returning)

```
"Nice to see you again" screen (pink #FFCCFC)
  - Marketing screen
  - Features, what's new, current version capabilities
  - CTAs: MPIN / Biometrics

[MPI / Biometrics button] ← dark oval
  │
  ├─→ MPIN/Biometrics OK →
  │     [Login back]
  │       → "start from the place where left" (resume app state)
  │         → [Uses app))) We show updates]
  │
  ├─→ If user logged out himself → same path
  │
  └─→ NOT OK → [???] (pink — not yet designed)
```

---

### 5.3 App States During KYC Process

**Two "App on this stage" sections (blue `#DBF0FF`):**

**App on this stage — KYC submitted, awaiting:**
```
Col 1: "Here you will have..." (placeholder card)
Col 2: VERIFICATION CENTER
Col 3: Support + Notifications
Col 4: Burger: Logout / Safety / About

CTA: [Check KYC status] (dark button)
     [Support] (dark button)
```

**App on this stage — AFTER KYC (with full access):**
```
Col 1: "Here you will have...Accounts, coins, wallets"
       KYC wait copy: "You should make KYC now, 
        without it we can't do anything for you. 
        Let's wait for KYC status - we will notify you"
Col 2: VERIFICATION CENTER
Col 3: Support + Notifications
Col 4: Burger: Logout / Safety / About

CTA: [Check KYC status] (dark button)
```

---

### 5.4 Known Bugs / Fix Notes (from annotations)

| Location | Bug to fix |
|---|---|
| Login re-login (Android) | "Fix bugs: scroll, font color, but with re-login on Android (instead of signup)" |
| MPIN screen (both flows) | "Fix bugs: scroll, font color; Keyboard should open itself when MPIN is requested" |
| Login re-login | "Fix bugs: scroll, font color; Keyboard should open itself when MPIN is requested" |

**Structural change:**
> "Hide future functions — App is restructured"

---

### 5.5 KYC Stage Content Detail

**Before KYC node (yellow `#FFCD29`):**
```
Full description / what to expect before KYC
```

**KYC node (yellow `#FFCD29`):**
```
The KYC form itself (Sumsub SDK)
```

**While user waits KYC in Sumsub node (yellow `#FFCD29`, wide):**
```
This is the "in-between" state — KYC submitted, results pending.
Key design: don't leave user with nothing to do.
Show: safety tasks + wallet organization + pre-setup wizard.
```

---

### 5.6 Screenshots in Section

4 app screenshots are embedded (thumbnail size ~75×163px each):
- 2 screenshots of current login/HELLO screen (for first timer)
- 2 screenshots of current re-login screen (for returning user)

These show the existing Antier/Dev builds being annotated.

---

## 6. Key Design Principles (from these sections)

| Principle | Source | Detail |
|---|---|---|
| **Account first, then recipient** | Address Book | Select source account before selecting beneficiary — this defines the asset type (crypto vs fiat) |
| **"Invite to Risely" upsell at payment time** | Address Book | When sending to a non-Risely user, show toggle to invite them |
| **Repeat transaction suggestion** | Address Book | If user has sent to this person before, surface a "do the same?" shortcut |
| **Coming Soon pattern** | Entities | Unbuilt features exist in the UI but are grayed out with "COMING SOON" label |
| **Never leave KYC as a dead end** | Login & KYC | While KYC is pending, give users productive tasks (safety tasks, wallet setup, questionnaire) |
| **Marketing screen before action** | Login & KYC | First-time login and returning user both see a marketing screen that sets context |
| **Auto-select wallet type** | Send flow | If beneficiary already has the correct wallet, skip the wallet-selection step |
| **Transfer IN = educational screen** | Transfer IN OUT BETWEEN | First-time Transfer IN shows a step-by-step "marketing" screen, not just a form |
| **USD→EUR auto-conversion disclosure** | Transfer IN | If user sends USD to a EUR account, show auto-conversion at time of transfer setup |
| **All transfers tracked** | Transfer IN OUT BETWEEN | Every transfer has a "Tracking screen" linked from transaction list |

---

## 7. Figma Links

| Section | URL |
|---|---|
| "Features for next versions" header | [#8:80254](https://www.figma.com/design/Qwbr3pXZJjh72Fx7kJOmqP/Risely--my-file-?node-id=8-80254) |
| Address Book | [#8:143108](https://www.figma.com/design/Qwbr3pXZJjh72Fx7kJOmqP/Risely--my-file-?node-id=8-143108) |
| Entities | [#8:143470](https://www.figma.com/design/Qwbr3pXZJjh72Fx7kJOmqP/Risely--my-file-?node-id=8-143470) |
| Transfer IN OUT BETWEEN | [#8:143505](https://www.figma.com/design/Qwbr3pXZJjh72Fx7kJOmqP/Risely--my-file-?node-id=8-143505) |
| Login & KYC | [#8:143376](https://www.figma.com/design/Qwbr3pXZJjh72Fx7kJOmqP/Risely--my-file-?node-id=8-143376) |
