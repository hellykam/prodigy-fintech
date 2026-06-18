# Vixi Wallet — Core Screens

**Source:** Figma "Vixi wallet + presale CRM [shared]", Wallet page
**File key:** YHKGP7o2yXw4WnVIZFGOgl, node 4:620
**Platform:** Responsive web app — primary mobile breakpoint 375px; also 460px, 688px, 1186px, 1440px
**Note:** Figma canvas labelled "iOS mobile (iPhone X, 375×812pt)" but actual frames are a React/web responsive layout.
**Excludes:** Onboarding flows (signup, KYC, login, forgot password, email verification) — covered in `04-vixi-wallet-onboarding.md`

---

## Table of Contents

1. [Dashboard — Main (1440px)](#1-dashboard--main-1440px)
2. [Dashboard — Mobile (375px)](#2-dashboard--mobile-375px)
3. [Send — Inline Form (empty state)](#3-send--inline-form-empty-state)
4. [Send — Confirmation Summary Card](#4-send--confirmation-summary-card)
5. [Send — Confirm Transaction Modal](#5-send--confirm-transaction-modal)
6. [Send — MPIN Entry](#6-send--mpin-entry)
7. [Send — Exchange Rate Ticker](#7-send--exchange-rate-ticker)
8. [Receive — Inline Form](#8-receive--inline-form)
9. [Toast — Transaction Success](#9-toast--transaction-success)
10. [Rewards Balance Card](#10-rewards-balance-card)
11. [Transactions Page](#11-transactions-page)
12. [Transaction Detail — Send/Receive](#12-transaction-detail--sendreceive)
13. [Transaction Detail — Bridge (Withdraw VIXC to Ethereum)](#13-transaction-detail--bridge-withdraw-vixc-to-ethereum)
14. [Transaction Detail — Bridge (Deposit VIXC from Ethereum)](#14-transaction-detail--bridge-deposit-vixc-from-ethereum)
15. [Email Notification — Transaction](#15-email-notification--transaction)
16. [Notifications Page](#16-notifications-page)
17. [User Menu Dropdown](#17-user-menu-dropdown)
18. [Verification Center Page](#18-verification-center-page)
19. [Settings & Security Page](#19-settings--security-page)
20. [MPIN — Create Flow](#20-mpin--create-flow)
21. [MPIN — Confirm Flow](#21-mpin--confirm-flow)
22. [Seed Phrase Export Modal](#22-seed-phrase-export-modal)
23. [Password — Re-login Screen](#23-password--re-login-screen)
24. [Password — Expired Screen](#24-password--expired-screen)
25. [Create New Account Modal](#25-create-new-account-modal)
26. [Organizations — List (empty state)](#26-organizations--list-empty-state)
27. [Organizations — Create Modal](#27-organizations--create-modal)
28. [Organizations — Org Detail Page](#28-organizations--org-detail-page)
29. [Organizations — Invite Member Modal](#29-organizations--invite-member-modal)
30. [Organizations — User Role Modal](#30-organizations--user-role-modal)
31. [Address Book — Paste Existing Address](#31-address-book--paste-existing-address)
32. [Address Book — Paste New Address + Save](#32-address-book--paste-new-address--save)
33. [Address Book — Paste New Address + Skip Save](#33-address-book--paste-new-address--skip-save)
34. [Address Book — Choose from Book (dropdown)](#34-address-book--choose-from-book-dropdown)
35. [Address Book — Missing Address State](#35-address-book--missing-address-state)
36. [Address Book — Send Flow from Book](#36-address-book--send-flow-from-book)
37. [404 Error Page](#37-404-error-page)
38. [Maintenance Page](#38-maintenance-page)
39. [Testnet Banner](#39-testnet-banner)

---

## Design Tokens (Reference)

| Token | Value |
|---|---|
| Font family | Onest |
| Primary blue | #0166D5 |
| Gradient button | 90deg, #0166D5 → #0098FF |
| Page background | #FBFBFF |
| Card background | #F0F9FF |
| Error red | #E53935 (approx) |
| Confirmed green | #00C853 (approx) |
| Pending amber | #FFB300 (approx) |

| Text style | Size | Weight |
|---|---|---|
| Desk/Header/Primary | 32px | Regular |
| Desk/Header/Secondary | 28px | Regular |
| Desk/Title/Primary | 24px | SemiBold |
| Desk/Title/Secondary | 20px | Medium |
| Desk/Text/Primary | 16px | Regular |
| Desk/Text/Secondary | 14px | Regular |
| Desk/Text/Hint | 12px | Regular |
| Desk/Button/Primary | 16px | SemiBold |
| Desk/Button/Secondary | 14px | SemiBold |

---

## 1. Dashboard — Main (1440px)

**Node ID:** 6:140343 (Dashboard section)
**Purpose:** Primary authenticated landing screen; shows balance summary, quick send/receive, assets, trust score, recent transactions.
**Entry point:** After login / after email verification; default authenticated route.

### Layout (top to bottom)

Left sidebar (fixed, ~240px wide):
- Vixi logo (top)
- Navigation links (icon + label)
- Invite friend widget (bottom of sidebar)

Main content area (right of sidebar):
- Top bar: greeting, account switcher, notification bell, avatar
- Row 1: Total Balance card + Trust Score card
- Row 2: Assets card + Send/Receive widget
- Row 3: Rewards Balance card
- Row 4: Recent Transactions table (with "See all" link)

### Fields / Data displayed

| Field | Value/Format | Notes |
|---|---|---|
| Greeting | "Good morning, Alex" | Personalised; time-of-day variant |
| Account switcher | "Main account / 133dhF...rEmGYY" | Truncated address; dropdown to switch account |
| Total Balance | "$6,531.78" | USD equivalent of all holdings |
| Balance delta | "+10.5% • $593.727387" | 24h change; positive = green |
| Trust Score value | "353" | Integer 0–1000+ |
| Trust Score delta | "+105 • Updated 3w ago" | Relative delta since last recalc |
| Assets — VIXC | 564.19987654 VIXC / $247.648734 / +10.5% | 8dp for VIXC |
| Assets — nUSD | 64.1998 nUSD / $64.199876 | Stablecoin, 1:1 USD |
| Recent Tx — columns | Tx Hash, Sender, Receiver, Updated, Status, Amount | |
| Recent Tx — sample row | cc00*b008 / ID: 123 / 2024-09-01 19:50 UTC / Confirmed / 12.0000 VIXC | |
| Recent Tx — amounts | 12.0000 / 249.9999 / 3,323,121.0000 VIXC | Examples only |

### Actions / Buttons

| Button/Action | Behavior | Notes |
|---|---|---|
| Notification bell | Opens notifications page | Badge shows unread count |
| Avatar (AR) | Opens user menu dropdown | Initials in blue gradient circle |
| Account switcher dropdown | Switches active account | Also shows "Create new account" option |
| "See all" (transactions) | Navigates to full Transactions page | |
| Send tab | Shows Send form in widget | Default active tab |
| Receive tab | Shows Receive form in widget | |
| Sidebar: Dashboard | Active (current) | |
| Sidebar: Transactions | Navigates to Transactions page | |
| Sidebar: Organizations | Navigates to Organizations page | |
| Sidebar: Address Book | Navigates to Address Book page | (implicit; separate page) |
| Sidebar: Rewards | Disabled ("soon" badge) | Not yet active |
| Invite friend widget CTA | Initiates invite flow | Copy: "Invite a friend and get XX.XXXX VIXC" |

### States

- **Default:** All cards populated; Send tab active in widget; Recent transactions showing rows.
- **Empty transactions:** Widget shows "Your transaction list is empty" with icon.
- **Loading:** Not explicitly shown in Figma; assume skeleton placeholders.

### Navigation

Login → **Dashboard (Main)** → Transactions page / Notifications / Settings / Verification center / Organizations

### Copy / Labels (exact text)

- "Good morning, Alex"
- "Main account"
- "Total Balance"
- "Trust Score"
- "Assets"
- "Rewards Balance"
- "Recent Transactions"
- "See all"
- "Your transaction list is empty"
- "Invite a friend and get XX.XXXX VIXC"
- Sidebar labels: "Dashboard", "Transactions", "Organizations", "Address Book", "Rewards"

### Design Notes / Annotations

- Avatar uses initials "AR" (Alex Romanov) in a blue gradient circle.
- Trust Score sparkline chart is decorative but present.
- VIXC amounts use 8 decimal places; nUSD uses 4–6 decimal places.
- Balance delta colour: green for positive, red for negative.
- "Rewards" nav item has a "soon" badge and is non-interactive.
- The account address in the switcher is truncated: first 6 chars + "..." + last 6 chars.
- Figma annotation: "Why renaming these? To fit-in Bridge in the 'same' UI later" — send/receive tabs may be extended for bridge flows.

---

## 2. Dashboard — Mobile (375px)

**Node ID:** Within 6:140343 (responsive variant)
**Purpose:** Same as Dashboard Main but collapsed for 375px viewport.
**Entry point:** Same as Desktop.

### Layout

- Sidebar collapses to icon-only strip (left edge, ~56px)
- Icons: layout/home, transactions, address book, rewards
- Expand icon (chevron right) to open full sidebar
- Top bar remains: greeting, notifications, avatar
- Cards stack vertically (full width)

### Design Notes / Annotations

- No labels shown in collapsed sidebar; icons only.
- Tap expand icon to open full sidebar overlay.
- All cards and widget functionality identical to desktop; layout reflows to single column.

---

## 3. Send — Inline Form (empty state)

**Node ID:** Within 6:140343 (Dashboard widget, Send tab)
**Purpose:** Quick-send initiation from dashboard widget.
**Entry point:** Dashboard → Send tab (default).

### Layout

- Tab bar: "Send" (active, blue underline) | "Receive"
- Amount row: input field (left) + MAX button + token selector (right)
- Recipient row: text input full width
- Network row: network selector full width
- Continue button (full width, bottom)

### Fields / Data displayed

| Field | Value/Format | Notes |
|---|---|---|
| Amount input | "0.00" placeholder | Numeric; accepts decimals |
| Token selector | "nUSD" with dropdown arrow | Switches between nUSD / VIXC |
| Recipient address | "Vixichain Wallet Address" placeholder | Vixichain address format |
| Network selector | "Vixichain" | Fixed to Vixichain for send; Bridge is separate |

### Actions / Buttons

| Button/Action | Behavior | Notes |
|---|---|---|
| MAX button | Fills amount with available balance | Inline, right of amount input |
| Token selector | Dropdown to choose nUSD or VIXC | |
| Recipient field | Opens address book dropdown if contacts exist | See Address Book section |
| Network selector | Dropdown (Vixichain only for standard send) | |
| Continue | Advances to Confirmation Summary | Disabled at 30% opacity until amount + recipient filled |

### States

- **Disabled Continue:** Amount = 0.00 or recipient empty → Continue button at 30% opacity.
- **Enabled Continue:** Valid amount + valid address → full opacity.

### Copy / Labels (exact text)

- "Send"
- "Receive"
- "0.00"
- "MAX"
- "nUSD"
- "Vixichain Wallet Address"
- "Vixichain"
- "Continue"

---

## 4. Send — Confirmation Summary Card

**Node ID:** Within 6:140343 (Dashboard widget, after Continue)
**Purpose:** Pre-authorisation summary allowing user to review full transaction details before MPIN entry.
**Entry point:** Send form → Continue.

### Layout

- Card replaces Send form in widget (same position)
- Header: "[amount] [token] on VixiChain"
- Breakdown rows
- Note field (optional)
- Available balance display
- Action buttons (Send / Cancel)

### Fields / Data displayed

| Field | Value/Format | Notes |
|---|---|---|
| Header | "Sending 10,000.0000 nUSD on VixiChain" | Amount + token + network |
| You send exactly | "100.0000" | Amount pre-fee |
| From address | "33dhFqthZWw9jUgSnCv1RanVwBwwrEmGYY on VixiChain" | Full sender address + network |
| Recipient address | Destination address | Full Vixichain or 0x address |
| Validator | "Bank Of America" (logo shown) | Auto-selected or user-selected |
| Fee | "100.000000 VIXC ($0.01) • Est. time 10 mins" | Validator fee + time estimate |
| Recipient gets | "$1000.00 to Ethereum" | USD equivalent at destination |
| Available balance | "564.199876 VIXC / 0.0000 nUSD" | Current wallet balance |
| Total fee | "150.00 VIXC" | Sum of all fees |
| Total | "100.0000 nUSD" (bold) | Final deduction from wallet |
| Note (Optional) | Text field, empty | Optional memo for transaction |

### Actions / Buttons

| Button/Action | Behavior | Notes |
|---|---|---|
| Send | Advances to MPIN entry | Blue gradient button |
| Cancel transaction | Cancels and returns to Send form | Red text |

### Copy / Labels (exact text)

- "Sending 10,000.0000 nUSD on VixiChain"
- "You send exactly:"
- "From address:"
- "on VixiChain"
- "Recipient address:"
- "Validator:"
- "Fee:"
- "Est. time 10 mins"
- "Recipient gets:"
- "to Ethereum"
- "Note (Optional)"
- "Available balance:"
- "Total fee:"
- "Total:"
- "Send"
- "Cancel transaction"

---

## 5. Send — Confirm Transaction Modal

**Node ID:** Within 6:140343 (modal overlay, after MPIN)
**Purpose:** Final confirmation modal showing full transaction breakdown before broadcast.
**Entry point:** MPIN entry → correct PIN → modal appears.

### Layout

- Modal centred on screen
- Header: "Confirm transaction"
- Amount display (large, bold)
- Detail rows with icons
- Confirm / Cancel buttons

### Fields / Data displayed

| Field | Value/Format | Notes |
|---|---|---|
| Title | "Confirm transaction" | |
| Amount | "10,000.0000 nUSD" (bold) | |
| Receiver address | "0x91fc8ec…" | Truncated Ethereum address |
| Network | "Vixichain" | |
| Coin | "nUSD / Digital Dollar" (with token icon) | |
| Amount | "10,000.0000 nUSD / $54.00" | Token amount + USD equivalent |
| Validator | "Bank Of Georgia" (logo shown) | |
| Validator fee | "50.00000000 VIXC / $007.50" | |
| Platform fee | (shown; amount in design) | Separate line item |
| Total network fee | "100.00000000 VIXC / $015.00" | Validator + platform fees combined |

### Actions / Buttons

| Button/Action | Behavior | Notes |
|---|---|---|
| Confirm | Broadcasts transaction | Blue gradient button |
| Cancel | Closes modal, returns to summary | Secondary / text button |

### Copy / Labels (exact text)

- "Confirm transaction"
- "Receiver address:"
- "Network:"
- "Coin:"
- "Digital Dollar"
- "Amount:"
- "Validator:"
- "Validator fee:"
- "Platform fee:"
- "Total network fee:"

---

## 6. Send — MPIN Entry

**Node ID:** Within 6:140343 (overlay / step in send flow)
**Purpose:** Authorise transaction with 4-digit MPIN. Acts as second-factor for every outbound transaction.
**Entry point:** Confirmation Summary → Send button.

### Layout

- Overlay/modal centred
- Title + subtitle
- 4 PIN input boxes (horizontal)
- Forgot MPIN link (below boxes)
- Error text (shown only on failure)

### Fields / Data displayed

| Field | Value/Format | Notes |
|---|---|---|
| PIN boxes | 4 × single-digit inputs | Active = blue border; filled = obscured dot; error = red border |

### States

| State | Visual |
|---|---|
| Default / active | Current box has blue border; previous boxes show filled dot |
| Error | All boxes red border; "Invalid MPIN" text appears in red |
| Entry in progress | Example: 1, 2, 3, [4th box active with blue border] |

### Actions / Buttons

| Button/Action | Behavior | Notes |
|---|---|---|
| PIN input (4 boxes) | Sequential digit entry | |
| Forgot your MPIN? | Link — initiates MPIN reset flow | Leads to Settings or email-based reset |

### Security Rule (from Figma annotation, verbatim)

> "There should be 5 attempts at entering MPIN, if user fails on fifth attempt session should be terminated with a message notifying user that he was logged out due to multiple MPIN input failures. Extending this functionality will involve sending a security email notifying user of MPIN input failure and explanation on how to reset it."

### Copy / Labels (exact text)

- "Enter your MPIN"
- "Enter your MPIN that you set during sign up"
- "Forgot you MPIN?" *(typo in Figma — "you" should be "your")*
- "Invalid MPIN"

---

## 7. Send — Exchange Rate Ticker

**Node ID:** Within 6:140343 (shown during send/confirm flow)
**Purpose:** Live exchange rate display so user can calculate VIXC ↔ USD equivalent before confirming.
**Entry point:** Displayed in send/confirm context.

### Fields / Data displayed

| Field | Value/Format | Notes |
|---|---|---|
| Exchange rate | "0.0000001 VIXC = $1.00" | VIXC : USD peg |
| Refresh note | "Exchange rate is updated every 10 seconds" | |
| Countdown | "8s" (visual timer) | Counts down to next refresh |

### Copy / Labels (exact text)

- "0.0000001 VIXC = $1.00"
- "Exchange rate is updated every 10 seconds"

---

## 8. Receive — Inline Form

**Node ID:** Within 6:140343 (Dashboard widget, Receive tab)
**Purpose:** Display user's Vixichain receive address and QR code for incoming transfers.
**Entry point:** Dashboard → Receive tab.

### Layout

- Tab bar: "Send" | "Receive" (active, blue underline)
- "Receive to" label
- Address display row (address text + copy icon)
- QR code (80×80px)
- Informational text
- Save QR button

### Fields / Data displayed

| Field | Value/Format | Notes |
|---|---|---|
| Receive address | "33dhFqthZWw9jUgSnCv1RanVwBwwrEmGYY" | Full Vixichain address |
| QR code | 80×80px image | Encodes receive address |

### Actions / Buttons

| Button/Action | Behavior | Notes |
|---|---|---|
| Copy icon (address) | Copies address to clipboard | |
| Save QR button | Downloads/saves QR code image | |

### Copy / Labels (exact text)

- "Receive to"
- "33dhFqthZWw9jUgSnCv1RanVwBwwrEmGYY"
- "You can receive nUSD and VIXC tokens on Vixichain to this address. Learn more"
- "Save QR"

### Design Notes / Annotations

- "Learn more" is a bold inline link.
- QR code is static (does not rotate).

---

## 9. Toast — Transaction Success

**Node ID:** Within 6:140343
**Purpose:** Non-blocking success notification after transaction broadcast.
**Entry point:** Successful transaction submission.

### Layout

- Toast notification, top-right corner
- Icon (checkmark / success icon)
- Single line message

### Copy / Labels (exact text)

- "Transaction completed successfully"

### Design Notes / Annotations

- Position: top-right of viewport.
- Auto-dismisses (duration not specified in Figma).

---

## 10. Rewards Balance Card

**Node ID:** Within 6:140343 (Dashboard, below Send/Receive widget)
**Purpose:** Show user's accumulated rewards and their locked/unlocked status.
**Entry point:** Dashboard (always visible).

### Fields / Data displayed

| Field | Value/Format | Notes |
|---|---|---|
| Card title | "Rewards Balance" | |
| Total rewards | "330.0000 VIXC" | 4dp |
| USD equivalent | "$150.12345" | |
| Lock status | "Locked until MainNet release" | Chip/badge |
| Pre-sale rewards | "12.0000 VIXC" label "Claimed" | Breakdown row |
| Airdrop rewards | "249.0000 VIXC" label "Airdrop" | Breakdown row |
| Invites rewards | (value shown in design) | Breakdown row |

### Design Notes / Annotations

- All reward amounts are locked and non-transferable until MainNet.
- "Claimed" likely refers to pre-sale token claim event.

---

## 11. Transactions Page

**Node ID:** 6:140345 (Transactions section)
**Purpose:** Full paginated transaction history with filtering and detail access.
**Entry point:** Sidebar → Transactions; Dashboard "See all".

### Layout (1440px)

- Page header: "Transactions"
- Filter/search bar (top)
- Table: full width, columns below
- Pagination controls (bottom)

### Fields / Data displayed (table columns)

| Column | Format | Notes |
|---|---|---|
| Time | "9:50 PM", "9:27 PM", "8:59 AM", "8:10 PM" | Local time display |
| Type | "Send" / "Receive" / "Bridge" | Bridge removed from user-facing display per product decision (see annotation) |
| Amount | "-10,000.0076 nUSD", "+6,839.008712 VIXC", "+278.827927 nUSD", "-1,000,000.0087 nUSD" | Negative = outgoing; positive = incoming |
| Status | "Completed" (green), "Pending" (amber) | Colour-coded |
| Detail action | Row click or expand | Opens transaction detail |

### Design Notes / Annotations

- Figma annotation: "Due to recent changes in Bridge, Panasenco decided that trx types that we show user are: Send and Receive" — Bridge type is hidden from the user-facing table but the underlying data/flow still exists.
- Bridge transactions may still appear as Send/Receive from user perspective.

---

## 12. Transaction Detail — Send/Receive

**Node ID:** Within 6:140345
**Purpose:** Full detail view for a standard Send or Receive transaction.
**Entry point:** Transactions table → row click.

### Fields / Data displayed

| Field | Value/Format | Notes |
|---|---|---|
| Receiver address | Vixichain or Ethereum address | Full address |
| Network | "Vixichain" | |
| Coin | Icon + "nUSD / Digital Dollar" or "VIXC" | |
| Amount | "10,000.0000 nUSD / $54.00" | Token + USD equivalent |
| Validator | Logo + name ("Bank Of Georgia") | |
| Validator fee | "50.00000000 VIXC / $007.50" | |
| Platform fee | (shown) | Separate line item |
| Total network fee | "100.00000000 VIXC / $015.00" | |
| Status | "Completed" / "Pending" / "Failed" | |

---

## 13. Transaction Detail — Bridge (Withdraw VIXC to Ethereum)

**Node ID:** Within 6:140345 (annotated "Bridge (withdraw VIXC to Ethereum)" node 5:114989)
**Purpose:** Detail screen for Bridge withdraw — moving VIXC from Vixichain to Ethereum.
**Entry point:** Transactions table → Bridge withdraw row.

### Fields / Data displayed

| Field | Value/Format | Notes |
|---|---|---|
| Bridge GAS fee | (field shown as "Bridge GAS fee") | Ethereum gas cost for bridge operation |
| Destination address | "0xBbdF53b634F75F0BA16932961831D870" | Ethereum 0x address |
| Amount | "50.0000 nUSD" | |
| Status | In progress / Completed / Failed | 3 states shown in Figma |

### States

| State | Email body (exact) |
|---|---|
| In progress | "Hello Alex, You withdraw **50.0000 nUSD** to **0xBbdF53b634F75F0BA16932961831D870**. Your transaction is now in progress." |
| Completed | "Hello Alex, You witdraw **50.0000 nUSD** to **0xBbdF53b634F75F0BA16932961831D870**. Your transaction completed successfully." *(note: "witdraw" typo in Figma)* |
| Failed | "Hello Alex, You withdraw **50.0000 nUSD** to **0xBbdF53b634F75F0BA16932961831D870**. Your transaction failed. See details to get more info." |

---

## 14. Transaction Detail — Bridge (Deposit VIXC from Ethereum)

**Node ID:** Within 6:140345 (annotated "Bridge (deposit VIXC from Ethereum)" node 5:114987)
**Purpose:** Detail screen for Bridge deposit — moving VIXC from Ethereum back to Vixichain.
**Entry point:** Transactions table → Bridge deposit row.

### Fields / Data displayed

Same structure as Withdraw; destination address is Vixichain address (0x format used as example).

### States

| State | Email body (exact) |
|---|---|
| In progress | "Hello Alex, You deposit **50.0000 nUSD** to **0xBbdF53b634F75F0BA16932961831D870**. Your transaction is now in progress." |
| Failed | "Hello Alex, You deposit **50.0000 nUSD** to **0xBbdF53b634F75F0BA16932961831D870**. Your transaction failed. See details to get more info." |

---

## 15. Email Notification — Transaction

**Node ID:** Within 6:140345 (email template frames)
**Purpose:** Transactional email sent to user on send/receive/bridge events.
**Entry point:** Transaction broadcast (system-triggered).

### Email variants (exact body text)

| Trigger | Subject (implied) | Body |
|---|---|---|
| Send — in progress | "10,000 nUSD sending to Nelly" | "Hello Alex, You're sending **20,000.00 nUSD** to **Nelly** (33dhFqthZWw9jUgSnCv1RanVwBwwrEmGY). Your transaction is now in progress." |
| Send — success | — | "Hello Alex, You sent **20,000.00 nUSD** to **Nelly** (33dhFqthZWw9jUgSnCv1RanVwBwwrEmGY). Your transaction is sent successfully." |
| Send — failed | "nUSD sending failed" | "Hello Alex, You sent **20,000.00 nUSD** to **33dhFqthZWw9jUgSnCv1RanVwBwwrEmGYY**. Your transaction failed. See details to get more info." |
| Receive — success | — | "Hello Alex, You sent **20,000.00 nUSD** to **33dhFqthZWw9jUgSnCv1RanVwBwwrEmGYY**. Your transaction is sent successfully." |
| Bridge withdraw — in progress | — | "Hello Alex, You withdraw **50.0000 nUSD** to **0xBbdF53b634F75F0BA16932961831D870**. Your transaction is now in progress." |
| Bridge withdraw — completed | — | "Hello Alex, You witdraw **50.0000 nUSD** to **0xBbdF53b634F75F0BA16932961831D870**. Your transaction completed successfully." |
| Bridge withdraw — failed | — | "Hello Alex, You withdraw **50.0000 nUSD** to **0xBbdF53b634F75F0BA16932961831D870**. Your transaction failed. See details to get more info." |
| Bridge deposit — in progress | — | "Hello Alex, You deposit **50.0000 nUSD** to **0xBbdF53b634F75F0BA16932961831D870**. Your transaction is now in progress." |
| Bridge deposit — failed | — | "Hello Alex, You deposit **50.0000 nUSD** to **0xBbdF53b634F75F0BA16932961831D870**. Your transaction failed. See details to get more info." |

### Design Notes / Annotations

- Email subject line shown in notification list: "10,000 nUSD sending to Nelly" uses bold inline formatting.
- "witdraw" (line 48851) is a typo in the Figma copy — flag for content review before production.
- Address in the Send in-progress variant is truncated by 1 character vs the full address (33dhFqthZWw9jUgSnCv1RanVwBwwrEmGY vs ...EmGYY) — use full address in implementation.

---

## 16. Notifications Page

**Node ID:** Within 6:140351 (Misc section)
**Purpose:** Centralised notification centre showing all system and transaction notifications.
**Entry point:** Top bar notification bell icon.

### Layout

- Page header: "Notifications" + "Mark all as read" button (top right)
- Tab bar: "General notifications" | "Verification center"
- Unread indicator: green dot on tab with unread items
- Table: Notification (left, full width) | Time UTC (right, fixed)

### Fields / Data displayed

| Field | Value/Format | Notes |
|---|---|---|
| Unread notification | Bold text + green dot | "80,000 nUSD received from Nelly" |
| Read notification | Normal weight text | "10,000 nUSD sent to Nelly" |
| Timestamp | "2024-09-01, 9:50:23" | UTC |

### Sample notifications (exact text)

- "**80,000 nUSD** received from **Nelly**" (unread, bold)
- "10,000 nUSD sent to Nelly"
- "762 nUSD received from vixi2R...HC824yr"
- "10,000 nUSD received from Alex Romanov"
- "10,000 nUSD sent to Alex Romanov"

### Actions / Buttons

| Button/Action | Behavior | Notes |
|---|---|---|
| Mark all as read | Clears unread dots on all notifications | |
| General notifications tab | Shows transaction + system notifications | Default active |
| Verification center tab | Shows KYC/verification status notifications | |

### Copy / Labels (exact text)

- "Notifications"
- "Mark all as read"
- "General notifications"
- "Verification center"

---

## 17. User Menu Dropdown

**Node ID:** Within 6:140347 (Settings & User info section)
**Purpose:** Quick-access user context menu.
**Entry point:** Top bar avatar click.

### Layout

- Dropdown panel below avatar
- User info block (top)
- Divider
- Menu items (list)

### Fields / Data displayed

| Field | Value/Format | Notes |
|---|---|---|
| User name | "Alex Romanov" | |
| Email | "alex.romanov@vixichain.org" | |
| Verified badge | Green outline badge | "Verified" text |
| Account address | "33dhFqthZWw9jUgSnCv1RanVwBwwrEmGYY" | Full address displayed |

### Actions / Buttons

| Button/Action | Behavior | Notes |
|---|---|---|
| Verification center | Navigates to Verification Center page | |
| Settings & Security | Navigates to Settings & Security page | |
| Support | Opens support channel (link/chat) | |
| Log out | Ends session, returns to login | Red colour text |

### Copy / Labels (exact text)

- "Alex Romanov"
- "alex.romanov@vixichain.org"
- "Verified"
- "33dhFqthZWw9jUgSnCv1RanVwBwwrEmGYY"
- "Verification center"
- "Settings & Security"
- "Support"
- "Log out"

---

## 18. Verification Center Page

**Node ID:** Within 6:140347
**Purpose:** Read-only display of user's KYC-verified personal information.
**Entry point:** User menu → Verification center.

### Layout

- Back navigation (top left)
- Page header: "Verification center" + "Verified" badge (inline)
- Section: "Personal Information"
- Read-only field rows
- Note at bottom

### Fields / Data displayed

| Field | Value/Format | Notes |
|---|---|---|
| Name | "Neli Kamaeva" | Read-only |
| Phone number | "+380954201293" | Read-only |
| Email | "nelly@mail.com" | Read-only |
| Country | "Ukraine" | Read-only |

### Copy / Labels (exact text)

- "Verification center"
- "Verified"
- "Personal Information"
- "Name"
- "Phone number"
- "Email"
- "Country"
- "Need to update your info? contact support"

### Design Notes / Annotations

- "contact support" is a link within the note text.
- All fields are read-only; edits require contacting support.

---

## 19. Settings & Security Page

**Node ID:** Within 6:140347
**Purpose:** User security settings — password, MPIN, and seed phrase management.
**Entry point:** User menu → Settings & Security.

### Layout

- Page header: "Settings & Security"
- Section: "Login"
- Section: "Transaction confirmation"
- Section: "Seed phrase"

### Fields / Data displayed

| Section | Field | Value/State | Notes |
|---|---|---|---|
| Login | Password | "Expires in 6 mo" | Expiry indicator |
| Transaction confirmation | MPIN | Toggle: ON | Can be enabled/disabled |
| Seed phrase | Export link | "Export seed phrase" | Link |
| Seed phrase | Warning | "You haven't backed up your seed phrase yet. Tap here to secure your wallet." | Red warning text |
| Seed phrase | Description | Full description text (see copy below) | |

### Actions / Buttons

| Button/Action | Behavior | Notes |
|---|---|---|
| Change (Password) | Opens password change flow | |
| Change (MPIN) | Opens MPIN change flow | |
| MPIN toggle | Enables/disables MPIN for transactions | |
| "Export seed phrase" link | Opens Seed Phrase Export Modal | |
| Warning tap area | Same as Export link | "Tap here to secure your wallet" |

### Copy / Labels (exact text)

- "Settings & Security"
- "Login"
- "Password"
- "Expires in 6 mo"
- "Change"
- "Transaction confirmation"
- "MPIN"
- "Seed phrase"
- "Export seed phrase"
- "You haven't backed up your seed phrase yet. Tap here to secure your wallet." *(red warning)*
- "Securely back up your seed phrase to ensure access to your wallet anytime. Never share it with anyone. Sharing your seed phrase could result in the loss of all your funds."

---

## 20. MPIN — Create Flow

**Node ID:** Within 6:140347
**Purpose:** First-time MPIN creation during onboarding (referenced from Settings for change flow).
**Entry point:** Sign-up flow / Settings → Change MPIN.

### Layout

- Title + subtitle
- 4 PIN input boxes (horizontal)

### Copy / Labels (exact text)

- "Create MPIN"
- "Your MPIN will be used to authorize transactions"

### Design Notes / Annotations

- 4 boxes, sequential entry, same visual style as MPIN Entry (blue active border, filled dot for entered).

---

## 21. MPIN — Confirm Flow

**Node ID:** Within 6:140347
**Purpose:** Re-entry confirmation step after initial MPIN creation to verify match.
**Entry point:** Create MPIN → after 4 digits entered.

### Layout

- Title + subtitle
- 4 PIN input boxes (horizontal)
- "Start over" link (below boxes)

### Copy / Labels (exact text)

- "Confirm MPIN"
- "Your MPIN will be used to log in to your wallet and authorize transactions"
- "Start over"

### Design Notes / Annotations

- "Start over" clears both Create and Confirm inputs, returns to Create step.

---

## 22. Seed Phrase Export Modal

**Node ID:** Within 6:140347
**Purpose:** Gate seed phrase reveal behind password re-entry; user accepts responsibility.
**Entry point:** Settings & Security → Export seed phrase.

### Layout

- Modal centred
- Password field
- Responsibility disclaimer
- CTA button

### Fields / Data displayed

| Field | Value/Format | Notes |
|---|---|---|
| Password field | Empty, password type | Placeholder: "Enter your password to see seed phrase." |

### Actions / Buttons

| Button/Action | Behavior | Notes |
|---|---|---|
| Show seed phrase | Reveals 12/24-word seed phrase (next screen) | Enabled after password entered |

### Copy / Labels (exact text)

- "Enter your password to see seed phrase."
- "By continuing, you accept full responsibility for safeguarding your seed phrase."
- "Show seed phrase"

---

## 23. Password — Re-login Screen

**Node ID:** Within 6:140347
**Purpose:** Password entry for session re-authentication (not first login — see onboarding doc).
**Entry point:** Session expiry / manual log-out + log-in.

### Fields / Data displayed

| Field | Value/Format | Notes |
|---|---|---|
| Password field | Filled example: "UnVnFyQd9WzzLuV" | Obscured; shown as filled state |

### Actions / Buttons

| Button/Action | Behavior | Notes |
|---|---|---|
| Forgot password? | Initiates reset flow | Link |
| Sign up link | "Don't have an account? Sign up" | Footer link |
| Submit / Log in | Authenticates session | Primary button |

### Copy / Labels (exact text)

- "Forgot password?"
- "Don't have an account? Sign up"

---

## 24. Password — Expired Screen

**Node ID:** Within 6:140347
**Purpose:** Force password rotation when password passes expiry threshold (6 months per Settings display).
**Entry point:** Login attempt with expired password.

### Fields / Data displayed

| Field | Value/Format | Notes |
|---|---|---|
| New Password | Empty | |
| Confirm New Password | "Re-enter your new password" placeholder | |

### Password Requirements (exact list from Figma)

- At least 8 characters long
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

### Copy / Labels (exact text)

- "Your password has expired. To continue using your wallet, please update your password now"
- "New Password"
- "Confirm New Password"
- "Re-enter your new password"

---

## 25. Create New Account Modal

**Node ID:** Within 6:140347
**Purpose:** Allow user to create an additional Vixichain account within the same wallet.
**Entry point:** Account switcher dropdown → "Create new account".

### Layout

- Modal centred
- Title + subtitle
- Account name text input
- Create button

### Fields / Data displayed

| Field | Value/Format | Notes |
|---|---|---|
| Account name | Text input, empty | User-defined label |

### Copy / Labels (exact text)

- "Create new Vixichain account"
- "Use multiple accounts to better manage your finances"
- "Account name"
- "Create account"

---

## 26. Organizations — List (empty state)

**Node ID:** Within 6:140347
**Purpose:** Organisation management hub; empty state shown when user has no orgs.
**Entry point:** Sidebar → Organizations.

### Copy / Labels (exact text)

- "My organizations"
- "You don't have any organizations. You can create new organization or join existing one via invite."
- "Create new organization"

---

## 27. Organizations — Create Modal

**Node ID:** Within 6:140347
**Purpose:** Create a new organisation entity.
**Entry point:** Organizations list → "Create new organization".

### Fields / Data displayed

| Field | Value/Format | Notes |
|---|---|---|
| Organization name | Text input, empty | |
| Registration number | "011586790" (example) | |
| Country | "Israel" (example, dropdown) | |

### Actions / Buttons

| Button/Action | Behavior | Notes |
|---|---|---|
| Create organization | Submits form | Blue primary button |

### Copy / Labels (exact text)

- "Create new organization"
- "Organization name"
- "Registration number"
- "Country"
- "Create organization"

---

## 28. Organizations — Org Detail Page

**Node ID:** Within 6:140347
**Purpose:** Organisation detail — balance, members list, actions.
**Entry point:** Organizations list → org row.

### Fields / Data displayed

| Field | Value/Format | Notes |
|---|---|---|
| Org name | "Quantum Solutions" | |
| Org avatar | "QS" initials | |
| Balance | "$0" | |
| nUSD balance | "0 nUSD" | |
| Members list | Name + Role | Roles: Owner, Admin, Auditor, User |

### Sample members

| Name | Role |
|---|---|
| Alex Romanov | Owner |
| Alexandra Shelenkova | Admin |
| Jane Cooper | Auditor |
| Leslie Alexander | User |
| Robert Fox | User |
| Theresa Webb | User |

### Actions / Buttons

| Button/Action | Behavior | Notes |
|---|---|---|
| Invite member | Opens Invite Member Modal | Button in members section |
| Member row click | Opens User Role Modal | |

---

## 29. Organizations — Invite Member Modal

**Node ID:** Within 6:140347
**Purpose:** Invite a new member to organisation via email.
**Entry point:** Org Detail → Invite member.

### Fields / Data displayed

| Field | Value/Format | Notes |
|---|---|---|
| Email | Text input, email type | Invitee's email address |

### Copy / Labels (exact text)

- "Email"
- "Send invite"

---

## 30. Organizations — User Role Modal

**Node ID:** Within 6:140347
**Purpose:** View and change a member's role within the organisation.
**Entry point:** Org Detail → member row.

### Fields / Data displayed

| Field | Value/Format | Notes |
|---|---|---|
| Role dropdown | "User" (current value, example) | Options: Owner, Admin, Auditor, User |

### Copy / Labels (exact text)

- "Save changes"

---

## 31. Address Book — Paste Existing Address

**Node ID:** Within 6:140349 (Address Book section)
**Purpose:** User pastes an address that already exists in their address book; system recognises and auto-fills contact name.
**Entry point:** Send form → Recipient field → paste known address.

### Behaviour

- User pastes address into recipient input
- System matches against address book
- Contact name + validator info populates automatically
- "Save this address to your Address book" prompt does NOT appear (address already saved)

---

## 32. Address Book — Paste New Address + Save

**Node ID:** Within 6:140349
**Purpose:** User pastes an unknown address and chooses to save it to their address book.
**Entry point:** Send form → Recipient field → paste new address → "Save this address" prompt → Save.

### Behaviour

- User pastes address
- Validator info and fee estimate resolve
- Prompt appears: "Save this address to your Address book"
- User taps Save → contact saved; name input field appears for labelling
- Example contact: Name "Anthony", address vixi2REsAjPdBCLBcpvvvHEFZHC824yr

### Fields / Data displayed

| Field | Value/Format | Notes |
|---|---|---|
| Address | "vixi2REsAjPdBCLBcpvvvHEFZHC824yr" | Vixichain format |
| Display abbreviation | "A.S." | Auto-generated from name initials |
| Validator | "Bank Of Georgia" (logo) | Auto-resolved from network |
| Fee | "80.00 VIXC • Est. time 20 mins" | |

### Copy / Labels (exact text)

- "Save this address to your Address book"

---

## 33. Address Book — Paste New Address + Skip Save

**Node ID:** Within 6:140349
**Purpose:** User pastes an unknown address and dismisses the save prompt; proceeds to send without saving.
**Entry point:** Send form → Recipient field → paste new address → "Save this address" prompt → Dismiss.

### Behaviour

- Same as above but user dismisses prompt
- Address used for this transaction only; not persisted

---

## 34. Address Book — Choose from Book (dropdown)

**Node ID:** Within 6:140349
**Purpose:** Address book dropdown auto-opens when user focuses recipient field and contacts exist.
**Entry point:** Send form → Recipient field focus (when address book is non-empty).

### Key UX Rule (from Figma annotation, verbatim)

> "Address book dropdown should open if user has addresses in the book and turns address input into focus state"

### Variants

1. **Choose by address** — user types/scans partial address, filters dropdown list
2. **Choose by name** — user types contact name, filters dropdown list

### Fields / Data displayed (dropdown row)

| Field | Value/Format | Notes |
|---|---|---|
| Contact name | "Anthony" | |
| Address | "vixi2REsAjPdBCLBcpvvvHEFZHC824yr" | Truncated in row |
| Display avatar | "A.S." initials | |
| Validator | "Bank Of Georgia" (logo) | |
| Fee estimate | "Fee 80.00 VIXC • Est. time 20 mins" | Pre-resolved |

---

## 35. Address Book — Missing Address State

**Node ID:** Within 6:140349
**Purpose:** Empty state for address book when no contacts have been saved.
**Entry point:** Send form → Recipient field focus (address book empty).

### Behaviour

- Dropdown does not appear (no contacts)
- Recipient field behaves as plain text input

---

## 36. Address Book — Send Flow from Book

**Node ID:** Within 6:140349
**Purpose:** Complete send transaction flow initiated via address book contact selection.
**Entry point:** Send form → Recipient field → address book dropdown → select contact.

### Behaviour

1. User selects contact from dropdown
2. Recipient field auto-fills with full address
3. Validator + fee estimate pre-populated
4. User enters amount
5. Continue → Confirmation Summary (same as standard send)

---

## 37. 404 Error Page

**Node ID:** Within 6:140351 (Misc section)
**Purpose:** Displayed when user navigates to a non-existent route.
**Entry point:** Any invalid URL.

### Layout

- Vixi logo (top)
- Illustration (centred)
- Error message text
- Back button

### Copy / Labels (exact text)

- "The page you are looking for can't be found."
- "Back"

---

## 38. Maintenance Page

**Node ID:** Within 6:140351 (Misc section)
**Purpose:** Full-screen maintenance notice when system is down.
**Entry point:** System-triggered redirect during maintenance window.

### Copy / Labels (exact text)

- "The system is under maintenance. We will be back soon!"
- "Back"

---

## 39. Testnet Banner

**Node ID:** Within 6:140343 (Dashboard, conditional)
**Purpose:** Prominent banner warning users they are on TestNet, not MainNet.
**Entry point:** Dashboard when network = TestNet.

### Fields / Data displayed

| Field | Value/Format | Notes |
|---|---|---|
| Banner heading | "TestNet" | Unbounded Bold, 24px |
| Sub-text | "For TestNet use only" | |
| Network toggle | "Testnet • Switch to Mainnet" or "Mainnet • Switch to Testnet" | Bidirectional switch |

### Copy / Labels (exact text)

- "TestNet"
- "For TestNet use only"
- "Mainnet • Switch to Testnet"
- "Testnet • Switch to Mainnet"

### Design Notes / Annotations

- "TestNet" uses Unbounded font (distinct from Onest body font) at Bold 24px.
- Banner is only shown when active network is TestNet.

---

## Appendix: Screens Not Fully Read

The Figma source file is 58,669 lines. The following content areas may contain additional screen variants not captured above:

- Additional responsive breakpoints (1186px, 688px, 460px) for all screens — layout reflow only, no new content expected
- Full address book page (dedicated page vs. inline dropdown)
- Rewards detail/breakdown page (if separate from dashboard card)
- Support page/chat flow
- Any admin-only or org-owner-only screens

---

## Appendix: Key Data & Constants

| Constant | Value |
|---|---|
| Exchange rate | 0.0000001 VIXC = $1.00 |
| Rate refresh interval | 10 seconds |
| MPIN digits | 4 |
| MPIN max attempts | 5 (then session terminated) |
| Password expiry | 6 months |
| TestNet heading font | Unbounded Bold 24px |
| Vixichain address example | 33dhFqthZWw9jUgSnCv1RanVwBwwrEmGYY |
| Ethereum address example | 0xBbdF53b634F75F0BA16932961831D870 |
| Trust Score example | 353 (+105 delta, updated 3w ago) |
| Org registration number example | 011586790 |
| Org country example | Israel |
