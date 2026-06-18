# Risely [shared] — Mobile App Screens

**Source:** Figma "Risely [shared]" (`o9Zj5gukNqAstKo8pUebcV`), `Mobile - Screens` page
**Node:** `6:215439`
**Versions documented:** Version 1 (Current), Version 3 (latest), Version 2 / Legacy noted where different

---

## 1. Design Tokens

| Token | Value |
|---|---|
| Font | **Gilroy** SemiBold 600 (not Onest — different from Vixichain) |
| Frame size (mobile) | 375×812px |
| Background | `#FFFFFF` |
| Border / divider | `#E7E9ED` (Neutral/Gray/100 and 200) |
| Brand primary | `#815D00` (amber/gold) |
| Brand secondary / accent | `#EBECFF` (light lavender) |
| Text dark | `#110D03` |
| Balance amount text | Gilroy Medium 500, 50px, `#110D03` |
| HomeIndicator height | 34px |

### Bottom Navigation Bar (frosted glass)

Component: `Nav` (componentSet `6:72429`)

| Property | Value |
|---|---|
| Background | `rgba(255,255,255,0.75)` — `Materials/Chrome` token |
| Backdrop filter | `blur(25px)` |
| Box shadow | `0px 4px 30px 0px rgba(0,0,0,0.1)` |
| Position | `y: 728`, `width: 375` (absolute, fixed to bottom) |
| Nav variants | `Nav=Home`, `Nav=Wallets`, `Nav=Profile` |

---

## 2. Canvas Structure (Version 1 vs Version 3)

| Version | Node | Canvas size | Notes |
|---|---|---|---|
| Current — Version 1 | `77:125157` | 10100×10000px | Baseline design |
| Version 2 | `77:125491` | 13000×10000px | Intermediate iteration |
| Version 3 | `77:125701` | 18000×10000px | Latest; green section labels mark what changed vs V1 |
| Legacy | `77:125948` | — | Oldest version |

Both Version 1 and Version 3 have the same 5 main tab screens but Version 3 adds Error Screens and marks Notifications as TBD.

---

## 3. Main Tab Screens (5 Tabs)

| Tab | Nav component | Notes |
|---|---|---|
| Home (Dashboard) | `Nav=Home` | Balance + action buttons + transaction list |
| Wallets | `Nav=Wallets` | Wallet list; tap wallet → wallet detail sub-screen |
| Profile | `Nav=Profile` | Profile page → many sub-pages |
| Notifications | — | 375×849px (slightly taller than 812px frame) |
| Support | — | Component named `Contuct us` (typo preserved from design) |

### Homepage — Layout

| Element | Position / Size | Notes |
|---|---|---|
| Status bar | top, height 44px | iOS |
| Logo header | below status bar | `Property 1=Logo header` component |
| "Total Balance" label | y:134, 88×18px, centered | Gilroy Regular 400, 14px, lineHeight 18px |
| Balance amount | y:153, 250×59px, x:67 centered | Gilroy Medium 500, 50px, `$0.00` placeholder |
| Action buttons row | y:270 | Receive / Send / Deposit / Withdraw; opacity varies by KYC state |
| Transaction list area | y:394–428 | `Transaction History` component (scrollable) |
| Bottom nav | y:728 | Frosted glass `Nav=Home` |
| HomeIndicator | y:778, 375×34px | iOS home indicator |

### Homepage — KYC States

| State | Action buttons | Notes |
|---|---|---|
| KYC in progress | opacity 0.3 (disabled) | Balance shows $0.00 |
| KYC approved, $=0 | opacity 1.0 (enabled) | Balance still $0.00, buttons active |

---

## 4. Wallets Sub-Screens

Two wallet type sub-screens accessible from the Wallets tab:

| Screen | Component | Size |
|---|---|---|
| Fiat Wallet Selected | `My Wallets / EURO` (`77:124589`) | 375×812px |
| Crypto Wallet Selected | `My Wallets / ETH` (`77:124595`) | 375×812px |

Both wallet sub-screens share the same structure:
- Logo header (`Property 1=Logo header`)
- Page Wallet header (`Property 1=Page Wallet header`), 375×70px
- Wallet single header (`Property 1=Wallet single`), padding 20px, border-bottom 1px `#E7E9ED` — shows balance for that wallet
- Transaction History (scrollable, `latest transactions: true` — shows recent transactions only)
- HomeIndicator

---

## 5. Profile Sub-Pages

Accessible by tapping items in the Profile main tab. All are 375px wide, white background.

### 5a. Verification Centre
**Component:** `77:124465` — `Verification centre`

| Section | Layout | Notes |
|---|---|---|
| Logo header | at top | |
| Page name header | with back arrow + menu icon | |
| Account type | padding 0px 20px, gap 12px | 2 row items (`Frame 1171277335`, `Frame 1171277705`) |
| Verification center steps | padding 20px 20px 32px, gap 12px | Progress list of verification steps |
| Documents section | `Version: Oct 10/Documents profile` component | appears twice (2 document groups) |
| Information sections | 4× `Version: Oct 10/Information` groups | Each has a tile header + 1–5 information lines |
| Last info section | padding 0px 0px 120px | bottom padding for scroll clearance |
| HomeIndicator | 375×34px | |

**Tile components used:**
- `Version: Oct 10/Tile for Text items` — `Property 1=Open` (chevron right, badge dot)
- `Version: Oct 10/Special Text Lines - For information` — repeated info rows
- `Version: Oct 10/Special Text Lines - For information` — `Property 1=No Data Available` variant

### 5b. Personal Info
**Component:** `77:124510` — `Personal Information`

- Page name header + back arrow
- Content area: padding 20px 20px **120px** (bottom clearance), gap 20px
- HomeIndicator

### 5c. Security
**Component:** `77:124526` — `Security`

- Logo header
- Page name header + back arrow
- Content area: padding **0px 20px**, gap 20px
- HomeIndicator

### 5d. All Transactions
**Component:** `77:124548` — `Transactions All` (375×**849**px)

- Logo header
- Page name header with back arrow + **Filter icon** (`icon-old/Filter New`)
- `Transaction History` component (scrollable, `latest transactions: false` — shows all transactions)
- 6 `Transaction Line` items in view
- HomeIndicator

### 5e. Beneficiary List
**Component:** `77:124553` — `Beneficiary List` (375×**849**px)

- Logo header + Page name header with back
- Content area: padding 20px 20px 36px, items center-aligned
- `Office use / Note` design annotation at position x:53, y:434, 270×auto, fill `#FFF1D0`, border `#FEA932` 2px, borderRadius 12px — design note about beneficiary feature
- Add-beneficiary action at bottom (`Frame 1171278568`)
- HomeIndicator

### 5f. Banking ID
**Component:** `77:124565` — `Banking ID` (375×**849**px)

- Logo header + Page name header with back
- Background fill: **`#F6F5F0`** (warm off-white — likely behind a card/document visual)
- Content card overlay at bottom with padding 20px
- HomeIndicator

### 5g. Referral
**Component:** `77:124575` — `Referral and Rewards - developed` (375×**849**px)

- Logo header + Page name header with back
- `Referral` component (`Property 1=default, Version=Old`) — old version, marked as **developed**
- `Office use / Note` design annotation at x:66, y:357, 246px wide (orange border)
- HomeIndicator
- **Status:** Developed

### 5h. About
**Component:** `77:124582` — `About - developed` (375×**849**px)

- Logo header + Page name header with back
- Contains a **screenshot image** (crop of an existing screen) — used as design reference
- `Office use / Note` annotation
- HomeIndicator
- **Status:** Developed

---

## 6. Transactions — Receive

Component set: `Receive` (`77:124602`)

| Variant | Component | Layout |
|---|---|---|
| Fiat Wallet | `Property 1=Fiat, Version=V1` (`77:124603`) | 375px wide, y-scroll |
| Crypto Wallet | `Property 1=Crypto, Version=V1` (`77:124608`) | 375px wide, y-scroll |

Both scroll vertically (overflowScroll y). The fiat variant has padding-bottom 80px; crypto has 40px.

---

## 7. Transactions — Send

Component set: `Send` (`77:124797`)

### Send Fiat — External

| Sub-flow | Components | Status |
|---|---|---|
| **2-step flow** (developed) | `Send Fiat External - Step 1 - developed` + `Send Fiat External - Step 2 - developed` | Developed |
| **1-step flow** (requested) | `Send Fiat External - requested` | Requested but not built |

Both step screens: 375×812px, y-scroll.

**Note from design:** The 2-step flow is what was built; the 1-step flow was later requested. Two separate design options exist side by side in the canvas.

### Send — Additional Groups (nodes #77:125253, #77:125267, #77:125281)

Three more Send groups exist in Version 1 at the same level (likely: Fiat Internal, Crypto External, Crypto Internal). Full component names not fetched — same pattern as Fiat External.

---

## 8. Transactions — Confirmation & States

Component set: `Transaction` (`77:125010`)

The confirmation flow renders as a **modal overlay** on top of the calling screen (not a full-page navigation):

| Layer | Style |
|---|---|
| Background (below overlay) | Main screen (blurred through overlay) |
| Overlay rectangle | y:100, height:655, fill `rgba(255,255,255,0.8)`, backdropFilter `blur(5px)` |
| Content frame | y:0, width:376, padding-bottom 40px |
| HomeIndicator | y:778 |

### Transaction States

| State | Component | Description |
|---|---|---|
| Confirmation | `Property 1=Confirmation - developed` (`77:125011`) | Review details before confirming |
| Confirmed | `Property 1=Confirmed - developed` (`77:125027`) | Submitted; awaiting blockchain confirmation |
| Completed | `Property 1=Completed - developed` (`77:125033`) | Transaction completed successfully |

All three are 375×812px, white background.

---

## 9. Signup / KYC Flow

### Signup Steps

| Screen | Component | Size | Notes |
|---|---|---|---|
| Invitation code | `Invite code` (`56:316542`) | 375×812px | Signup requires an invite code — access is gated |
| Signup form | `Signup` (`56:316553`) | 375×812px | Mobile `Headers mobile` nav, page indicator dots at y:778 |
| Email, Phone, MPIN | — | 375px | Design annotation note only — screens defined elsewhere or TBD |
| KYC | — | 375px | Design annotation note only |

### Post-Signup Homepage States

| State | Actions visible | Notes |
|---|---|---|
| KYC in progress | Disabled (opacity 0.3) | User sees main screen but can't transact yet |
| KYC not approved | — | Design annotation only; final screens TBD |
| KYC approved, $=0 | Enabled | Full access; balance at $0 until funded |

**Design comment format:** Annotation notes use component `Office use / Comment` (`6:37614`) — fill `#EBECFF` (Brand/secondary/50), border `#263AB1` 1px, borderRadius 8px. Used in Email/Phone/MPIN, KYC, KYC not approved sections as placeholder/note.

---

## 10. Error Screens (Version 3 only)

Component set: `Error Screens` (`6:68836`) — added in Version 3 (not in Version 1)

| Variant | Component ID |
|---|---|
| Account Blocked | `6:68837` |
| Feature is blocked | `6:68922` (×2 instances) |
| Connection Lost | `6:69023` |
| Something Went Wrong | `6:69007` |

All are 375×812px, white background. The "Account Blocked" screen appears once; "Feature is blocked" appears twice (likely with slightly different copy/context).

---

## 11. Notifications

- Version 1: `Notifications` screen exists (375×849px, slightly taller than standard 812px — contains HomeIndicator 34px at y:815)
- Version 3: Header annotation: **"Notifications full flow: tbd"** — header uses `#815D00` (Brand primary/amber) fill, meaning it's flagged as a known gap

---

## 12. Admin Page (separate canvas page)

**Admin page node:** `3:133651` — not yet documented. Contains admin panel UI.

---

## 13. File Structure Summary

| Canvas page | Node | Status |
|---|---|---|
| `cover` | `3:12061` | Skip |
| `Mobile - Screens` | `6:215439` | **Documented in this file** |
| `Mobile - Prototypes` | `6:218439` | Skip (flow arrows only) |
| `Admin` | `3:133651` | Document next → `21-risely-shared-admin.md` |
| `Research & Ideation` | `6:35779` | Check after Admin |

---

## 14. Key Differences: Version 1 vs Version 3

| Feature | Version 1 | Version 3 |
|---|---|---|
| Main 5 tab screens | Yes | Yes (same, version labeled `Version=Version2` on Main component) |
| Profile sub-pages | Yes (8 screens) | Yes |
| Error Screens | No | Yes (5 variants) |
| Notifications flow | Basic screen | Marked TBD |
| Signup flow | Yes | Yes |
| Canvas size | 10100×10000px | 18000×10000px |
