# Risely Mobile Wallet App — Design Reference

**Source:** Figma file "Risely & Velmie [copy for Alex]", Mobile page  
**Scope:** "To Be" (proposed redesign) is the authoritative reference. "As Is" screenshots are included for historical context only.  
**Platform:** iOS — iPhone X (375 × 812 pt)  
**Backend:** Velmie (BaaS)

This document is a dense engineering reference. It covers screen inventory, component inventory, navigation structure, flow steps, and open design questions. Use it as the single source of truth when implementing or reviewing any Risely mobile screen.

---

## Table of Contents

1. [App Overview](#1-app-overview)
2. [Bottom Navigation](#2-bottom-navigation)
3. [Screen Inventory — To Be](#3-screen-inventory--to-be)
   - [3.1 Home / Dashboard — Account Tab](#31-home--dashboard--account-tab)
   - [3.2 Home / Dashboard — Cards Tab](#32-home--dashboard--cards-tab)
   - [3.3 Transactions Screen](#33-transactions-screen)
   - [3.4 Profile / Settings Screen](#34-profile--settings-screen)
   - [3.5 Account Details Screen](#35-account-details-screen)
   - [3.6 Send Flow](#36-send-flow)
   - [3.7 Receive Flow](#37-receive-flow)
   - [3.8 Swap / Buy / Sell Flow](#38-swap--buy--sell-flow)
   - [3.9 All Actions Bottom Sheet](#39-all-actions-bottom-sheet)
   - [3.10 Crypto Currency Item](#310-crypto-currency-item)
   - [3.11 KYC / Verification Screen](#311-kyc--verification-screen)
4. [As Is Screens Reference](#4-as-is-screens-reference)
5. [Quick Action Buttons — Component Detail](#5-quick-action-buttons--component-detail)
6. [Component Inventory](#6-component-inventory)
7. [Page Title Component Variants](#7-page-title-component-variants)
8. [Navbar Component Variants](#8-navbar-component-variants)
9. [Open Design Questions](#9-open-design-questions)

---

## 1. App Overview

| Property | Value |
|---|---|
| App name | Risely |
| Platform | iOS |
| Frame size | 375 × 812 pt (iPhone X) |
| Backend | Velmie (BaaS) |
| Wallet types | Fiat wallets, crypto wallets |
| Card types | Virtual card, physical card |
| Identity verification | KYC via Sumsub (required for full functionality) |

Risely is a mobile wallet app connecting to the Velmie backend. Users can hold fiat and crypto balances, send/receive money, swap currencies, and manage virtual/physical bank cards. KYC must be completed before most financial operations are available.

---

## 2. Bottom Navigation

Four persistent tabs rendered in the Tabs bar at the bottom of every main screen.

| Position | Tab | Destination |
|---|---|---|
| 1 | Home | Wallet / accounts dashboard |
| 2 | Transactions | All transactions list |
| 3 | Cards | Bank cards ("Coming soon" in this version) |
| 4 | Profile | User settings |

---

## 3. Screen Inventory — To Be

### 3.1 Home / Dashboard — Account Tab

The primary landing screen. Shows the user's selected wallet, quick actions, recent activity, and promotional content.

**Screen structure (top to bottom):**

| # | Layer | Notes |
|---|---|---|
| 1 | Status bar | iOS system status bar |
| 2 | Navbar | Logo header (Risely branding, centered) |
| 3 | Account type tabs | Personal / Business switcher |
| 4 | Account Card | Balance and info for the selected wallet/account |
| 5 | QAB group | Receive / Send / Swap (3 buttons in a row) |
| 6 | Spacer | — |
| 7 | Last Transaction | Most recent transaction; empty state if none |
| 8 | Spacer | — |
| 9 | New Feature Banner | Swipeable gallery of feature announcement banners |
| 10 | Referral Program Banner | Promotes referral program |
| 11 | Spacer | — |
| 12 | Net Worth | Total portfolio value display |
| 13 | Spacer | — |
| 14 | Tabs bar | Bottom 4-tab navigation |
| 15 | Home indicator | iOS home bar |

**Net Worth component states:**

| State | Description |
|---|---|
| `Cash 0` | No fiat balance; prompt user to add money |
| `Cash >0 Crypto >0` | Breakdown of fiat + crypto in a combined view |

**Dashboard states:**

| # | State | Description |
|---|---|---|
| 1 | Default | Account Card active, Last Transaction empty, banners visible |
| 2 | With transactions | Last Transaction filled with the most recent transaction |
| 3 | KYC passed, no requests, no banners | Clean state — no action banners, no feature banners |
| 4 | Full wallet list | Scrollable list of all wallets (fiat + crypto combined) |

> **Open question:** "Have all wallets in a single list? (fiat and crypto) And as a list?" — not finalized. See [Section 9](#9-open-design-questions), item 3.

---

### 3.2 Home / Dashboard — Cards Tab

Shows the user's payment cards and card-specific transaction history.

**Screen structure (top to bottom):**

| # | Layer | Notes |
|---|---|---|
| 1 | Status bar | — |
| 2 | Page title | — |
| 3 | Spacer | — |
| 4 | Bank Cards component | Horizontal scrollable card carousel (virtual/physical cards) |
| 5 | QAB group | Same Receive / Send / Swap row as wallet view |
| 6 | Spacer | — |
| 7 | Card Last Transactions List | Transactions filtered to the selected card |
| 8 | Tabs bar | — |
| 9 | Home indicator | — |

**Card display:** Shows last 4 digits of card number and card type indicator (Visa / Mastercard).

**Cards tab states:**

| # | State | Description |
|---|---|---|
| 1 | Coming soon | Tab visible but disabled; shows "Cards coming soon" label |
| 2 | Active (no cards) | Empty state |
| 3 | Active (with cards) | Card carousel + card transactions list |

---

### 3.3 Transactions Screen

Full transaction history for the user across all wallets.

**Screen structure (top to bottom):**

| # | Layer | Notes |
|---|---|---|
| 1 | Status bar | — |
| 2 | Navbar | — |
| 3 | Transaction list | Scrollable; grouped by date |
| 4 | Tabs bar | — |
| 5 | Home indicator | — |

**Transaction list states:**

| # | State |
|---|---|
| 1 | Empty state |
| 2 | Filled — grouped transactions |
| 3 | With search / filter active |

**Transaction item fields:** Description, amount (debit/credit), date, status.

---

### 3.4 Profile / Settings Screen

User settings, account management, and support access.

**Screen structure (top to bottom):**

| # | Layer | Notes |
|---|---|---|
| 1 | Status bar | — |
| 2 | Navbar | Back arrow on sub-screens; title on main screen |
| 3 | Spacer | — |
| 4 | Top action button | e.g. Edit Profile |
| 5 | Spacer | — |
| 6 | Section title + Settings section (repeated) | Multiple grouped list rows |
| 7 | Logout | At bottom of all sections |
| 8 | Tabs bar | — |
| 9 | Home indicator | — |

**Profile section layouts — two variations:**

*Variation A (compact):*

| Section | Item count |
|---|---|
| Section 1 | 1 item (full-width card) |
| Section 2 | 2 items |
| Section 3 | Multiple sub-sections, multiple items each |
| Logout | Bottom |

*Variation B (expanded):*

| Section | Item count |
|---|---|
| Section 1 | 1 item |
| Section 2 | 1 item |
| Section 3 | Multiple items |
| Section 4 | Multiple items |
| Section 5 | Multiple items |
| Section 6 | Multiple items |

**Specific profile items identified:**

| Item | Behaviour / Notes |
|---|---|
| Currency switcher | UI equivalent to Change Language; shows a list of all world currencies with signs or letter codes |
| Help / Helpdesk | Should lead directly to helpdesk (no intermediate screen) |
| Terms & Privacy Policy | Shown as in-app content in the design; linked to website in the live app |
| Delete account | Requires compliance + legal sign-off before flow can be finalized |
| Logout from all devices | Linked to "Logout from Device" feature in Velmie backend |
| Security settings | Separate grouped section |

**Removed:** Invoices section is not present in this version.

---

### 3.5 Account Details Screen

Displays bank account details so the user can share them to receive money.

**Screen structure (top to bottom):**

| # | Layer | Notes |
|---|---|---|
| 1 | Status bar | — |
| 2 | Navbar | Back arrow (left) + right-aligned content |
| 3 | Page title | — |
| 4 | Spacer | — |
| 5 | Account details component | Static display of account fields (see below) |
| 6 | Spacer | — |
| 7 | CTA button | Share / Copy All / etc. |
| 8 | Spacer | — |
| 9 | Home indicator | — |

**Account details component fields (each with a copy button):**

- Account name
- IBAN / account number
- BIC / SWIFT
- Bank name
- Account holder name

**Banking ID document:** A generated document proving the user holds this account — distinct from a statement. Both the statement and the Banking ID document are required. The UI for the Banking ID is similar to the statement UI but represents a different document.

---

### 3.6 Send Flow

Allows the user to send funds to another Risely user (internal transfer) or to an external recipient (wire transfer or crypto network).

**Entry points:**
- Home → QAB "Send" (if no wallet is pre-selected, user is prompted to select one)
- From a specific wallet screen (wallet pre-selected)

---

#### Sub-flow A: Send to Risely User (internal transfer)

| Step | Screen | Description |
|---|---|---|
| 1 | Select wallet | Pre-filled if entered from a wallet screen |
| 2 | Enter recipient + amount | Username / phone / email + amount |
| 3 | Confirm | Review summary before submitting |
| 4 | Success | Confirmation screen |

**Step 2 screen structure:**

| # | Layer | Notes |
|---|---|---|
| 1 | Status bar | — |
| 2 | Navbar | Back arrow |
| 3 | Page title | Includes hint text |
| 4 | Spacer | — |
| 5 | Wallet selector | Dropdown showing all wallets (from wallet) |
| 6 | Spacer | — |
| 7 | Amount input | `_Input field base` — amount with fee display |
| 8 | Spacer | — |
| 9 | Fee display row | Shows calculated fee |
| 10 | Spacer | — |
| 11 | Dropdown field | Recipient selector |
| 12 | Spacer | — |
| 13 | Amount input (second) | Secondary amount field |
| 14 | Bottom container + CTA | Disabled until inputs are valid; enabled when ready |
| 15 | iOS keyboard | Shown while editing |

---

#### Sub-flow B: Send to External (wire transfer / crypto network)

The UI adapts based on the wallet type selected:

| Wallet type | Fields shown |
|---|---|
| Bank wallet | Bank transfer fields: IBAN, BIC, beneficiary name |
| Crypto wallet | Crypto fields: network selector, wallet address |

**External send screen structure:**

| # | Layer | Notes |
|---|---|---|
| 1 | Status bar | — |
| 2 | Navbar | Back arrow + "All actions" text (right) |
| 3 | Page title | Includes hint text |
| 4 | Spacer | — |
| 5 | Wallet selector | From wallet dropdown |
| 6 | Amount input + fee | Amount field with fee inline |
| 7 | Fee row | Explicit fee display row |
| 8 | External address field | IBAN (bank) or crypto address |
| 9 | Memo / description field | — |
| 10 | Bottom container + CTA | Disabled / enabled state |

> **Design note:** Wallet selector UI was flagged for redesign. The intent is to allow selection of any wallet — fiat or crypto — in a single selector ("select ANY to ANY").

---

### 3.7 Receive Flow

Allows the user to receive funds from another Risely user or from an external source.

**Entry points:**
- Home → QAB "Receive"
- From a specific wallet screen

#### Sub-flow A: Receive from Risely User

- Shows the user's Risely profile link and/or QR code for scanning
- Alternatively provides a shareable link

#### Sub-flow B: Receive from External (bank / crypto)

- Routes to the Account Details screen (see [3.5](#35-account-details-screen))
- Displays IBAN (for fiat) or crypto address to share

**Receive screen structure:**

| # | Layer | Notes |
|---|---|---|
| 1 | Status bar | — |
| 2 | Navbar | — |
| 3 | Page title | — |
| 4 | Spacer | — |
| 5 | Content area | Varies by wallet type (QR code vs. account details) |

> **Design note on Add Wallet / Add Account flow:** "Flow is ok, just we need to have crypto there too."

---

### 3.8 Swap / Buy / Sell Flow

**Status: TBA.** Placeholder screens exist but the full flow is not yet designed. Implementation should wait until the swap/exchange provider and wallet infrastructure are confirmed.

**What exists in the design:**
- 4 placeholder screens labeled "TBA"
- Buy/Sell component — amount input UI with currency pair
- Success screen: "Swap executed successfully" with pin icon
- Processing text: "Will be processed in a minute"

**Swap input screen structure:**

| # | Layer | Notes |
|---|---|---|
| 1 | Status bar | — |
| 2 | Navbar | Back arrow; optionally "All actions" on right |
| 3 | Page title | Includes hint text |
| 4 | Spacer | — |
| 5 | Buy/Sell component | From/to currency selectors, amount input, exchange rate display |
| 6 | Spacer | Fills remaining height |
| 7 | CTA button | Disabled / enabled state |
| 8 | iOS keyboard | Shown while editing |

**Swap component variants:**

| Variant | Structure |
|---|---|
| Swap A | Source dropdown + amount field + fee row + destination dropdown + destination amount |
| Swap B | Simplified / single-step (details TBA) |

---

### 3.9 All Actions Bottom Sheet

A contextual bottom sheet giving access to all available wallet actions.

**Triggered by:** Main action button or "All actions" button in navbar.

**Structure:**

| Element | Description |
|---|---|
| Background | Frosted / blurred full-screen overlay |
| Sheet | Slides up from the bottom |
| Close handle | At top of sheet |
| Action list | Icon + label per action |
| Actions | Receive, Send, Swap (and potentially more) |

**States:**

| State | Behaviour |
|---|---|
| Wallet not selected | Shows generic actions; tapping Send or Receive may prompt wallet selection |
| Wallet selected | Actions are pre-contextualized to the selected wallet |

---

### 3.10 Crypto Currency Item

A list row representing a single crypto asset.

**Fields displayed:**

| Field | Notes |
|---|---|
| Coin icon | Crypto icon component (BTC, ETH, etc.) |
| Currency name | Full name or ticker |
| Balance in crypto | Native amount |
| Balance in fiat equivalent | Converted value |
| Price change indicator | Tappable; opens tooltip |

**Tooltip:** Dark-themed, arrow-pointed. Design question noted: "Can we add currency switcher here?" — a currency conversion display may be added.

---

### 3.11 KYC / Verification Screen

Prompts unverified users to complete identity verification via Sumsub.

**Screen structure:**

| # | Layer |
|---|---|
| 1 | Status bar |
| 2 | Navbar |
| 3 | Illustration / content area |
| 4 | CTA button |

**States:**

| State | Description |
|---|---|
| Initial | Prompt to start KYC |
| In progress / Pending | Waiting for review result |

> Full KYC / KYT / Compliance flow is TBA and not detailed in this file.

---

## 4. As Is Screens Reference

Screenshots of the existing Velmie mobile app — the starting point for the redesign. Documented for historical context; do not use as implementation reference.

| Screen | Notes |
|---|---|
| Screen 01 | Login / Dashboard |
| Screen 03 | Transactions / main flow + bottom sheet detail |
| Screen 07 | — |
| Screen 09 | — |
| Screen 10 | Home — two variants shown side by side (design note: "why are they different?") |
| Screen 13 | — |
| Screen 14 | Fix needed (noted in design) |
| Screen 15 | — |
| Screen 16 | — |
| Screen 19 | — |
| Screen 20 / 30 | Settings — two versions |
| Screen 23 | — |
| Screen 24–28 | Various screens |
| Screen 29 | — |

**As Is navigation labels:**

| Label | Status |
|---|---|
| Dashboard | Active |
| Actions | Active |
| Transactions | Active |
| Settings | Active |
| Home | Active |
| Profile | Active |
| Cards | Active |
| Trading | Amber / different status — likely a Velmie feature not in use, or future scope |

---

## 5. Quick Action Buttons — Component Detail

Three buttons rendered as a horizontal row on the Home and Cards screens.

| Button | Icon | Label |
|---|---|---|
| Receive | Plus icon | Receive |
| Send | Right arrow | Send |
| Swap | Repeat / loop icon | Swap |

All three buttons use the same base component (`Quick action button base`). The Swap button uses the primary brand color for its label text; Receive and Send use Primary/700.

---

## 6. Component Inventory

All components identified in the design. Each maps to a distinct reusable element.

| Component | Purpose |
|---|---|
| Statusbar | iOS system status bar |
| Navbar | Top navigation bar (multiple variants — see Section 8) |
| Tabs | Account type switcher (Personal / Business) |
| Account Card | Displays wallet / account balance and info |
| QAB group | Quick action buttons row (Receive / Send / Swap) |
| Quick action button base | Single action button: icon + label |
| Last Transaction | Latest transaction row or empty state |
| New Feature Banner | Promotional / feature announcement banner |
| Referral Program Banner | Referral CTA banner |
| Net Worth | Total portfolio value display |
| Tabs bar | Bottom 4-tab navigation |
| Home indicator | iOS home bar |
| Bank Cards | Horizontal scrollable card carousel |
| Card Last Transactions List | Transaction list filtered to a selected card |
| Buy/Sell component | Swap / exchange amount input with currency pair |
| _Input field base | Text input (variants: with fee, filled) |
| Dropdown field | Select / dropdown input |
| Page Title | Screen title (5 variants — see Section 7) |
| Account details | Static IBAN / account info display with copy buttons |
| Crypto Currency Item | Single crypto asset row in a list |
| Dialog | Modal dialog with selectable options |
| All actions icon | Pin / success icon (used on Swap success screen) |
| iPhone X Keyboard | iOS keyboard overlay for form screens |
| Spacer | Layout spacing component (multiple sizes) |
| Arrow (navigation) | Screen-to-screen flow indicator (Figma only) |
| Tooltip | Info tooltip with directional arrow |

---

## 7. Page Title Component Variants

Named variants from the design file. Each combination of flags is a distinct component variant.

| Variant flags | Description |
|---|---|
| `Left Icon=No, Left Text=Yes, Middle=No, Right=No, Hint text=No, Date=No` | Plain title only |
| `Left Icon=No, Left Text=Yes, Middle=No, Right=No, Hint text=Yes, Hint text icon=Yes` | Title + hint text with icon |
| `Left Icon=No, Left Text=Yes, Middle=No, Right=Yes, Hint text=Yes, Date=Yes` | Title + right content + date |
| `Left Icon=No, Left Text=Yes, Middle=No, Right=No, Hint text=Yes, Date=No` | Title + hint text, no date |

---

## 8. Navbar Component Variants

Named variants from the design file.

| Variant | Left | Middle | Right | Used on |
|---|---|---|---|---|
| `Left=Avatar, Middle=No, Right=Notifications` | Avatar / logo | — | Notification bell | Home screen |
| `Left=Avatar, Middle=No, Right=No` | Avatar / logo | — | — | Profile screen |
| `Left=Arrow, Middle=No, Right=No` | Back arrow | — | — | Sub-screen (back only) |
| `Left=Arrow, Middle=No, Right=Text` | Back arrow | — | Action text (e.g. "All actions") | Sub-screen with right action |
| Logo header | Risely logo (centered) | — | — | Home screen (alternate) |

---

## 9. Open Design Questions

Decisions that were unresolved in the Figma file. Each requires a product or technical decision before the relevant screen can be finalized.

| # | Question | Affected screens |
|---|---|---|
| 1 | Currency switcher — can users switch the display currency globally? | Net Worth, Crypto Currency Item, all balance displays |
| 2 | Should all amounts be shown in a user-selected currency alongside the native currency? | All balance and transaction screens |
| 3 | Should all wallets (fiat and crypto) be shown in a single combined list? | Home / Dashboard — Account Tab |
| 4 | Should the Profile "Help" item link directly to the helpdesk with no intermediate screen? | Profile / Settings |
| 5 | Cards coming soon — once a card provider is selected, what should the "new card" confirmation popup show? | Cards Tab |
| 6 | Terms & Privacy Policy: in-app display (as designed) or link to website (as in current live app)? | Profile / Settings |
| 7 | Delete account: what is the compliance and legal flow? | Profile / Settings |
| 8 | Is "Logout" in the app the same as "Logout from Device" in Velmie? | Profile / Settings |
| 9 | Invoices: confirmed removed from this version — no invoice flow required. | — |
| 10 | Swap / Buy / Sell: full flow is TBA pending provider and wallet infrastructure confirmation. | Swap flow, All Actions sheet |
