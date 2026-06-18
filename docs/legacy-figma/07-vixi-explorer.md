# Vixi Explorer — Blockchain Explorer

**Source:** Figma "Vixi wallet + presale CRM [shared]", Explorer page
**File key:** YHKGP7o2yXw4WnVIZFGOgl, node 5:67623
**Canvas:** `[CANVAS] "Explorer" #5:67623`

---

## Table of Contents

1. [Explorer Public — 1440 Desktop (Default)](#1-explorer-public--1440-desktop-default)
2. [Table: Additional States — Search, Empty, Error](#2-table-additional-states--search-empty-error)
3. [Table: Breakpoints — Section Label](#3-table-breakpoints--section-label)
4. [Transaction Detail — Desktop 1440 (Side Panel)](#4-transaction-detail--desktop-1440-side-panel)
5. [Explorer Public — 375 Mobile (Transaction List)](#5-explorer-public--375-mobile-transaction-list)
6. [Explorer Public — 375 Mobile (Transaction Detail)](#6-explorer-public--375-mobile-transaction-detail)
7. [Explorer Public — 1920 Wide Desktop](#7-explorer-public--1920-wide-desktop)
8. [Explorer Public — 1200 Breakpoint](#8-explorer-public--1200-breakpoint)
9. [Explorer Public — 900 Breakpoint](#9-explorer-public--900-breakpoint)
10. [Explorer Public — 768 Breakpoint](#10-explorer-public--768-breakpoint)
11. [Explorer Public — 430 Mobile Breakpoint](#11-explorer-public--430-mobile-breakpoint)
12. [Dashboard Rewards Variant — Explorer Dashboard with Rewards=On](#12-dashboard-rewards-variant--explorer-dashboard-with-rewardson)
13. [Explorer Public — Testnet Mainnet Variant (Full Tokenomics)](#13-explorer-public--testnet--mainnet-variant-full-tokenomics)
14. [Explorer Public — Testnet Banner Variant](#14-explorer-public--testnet-banner-variant)
15. [Reward Distribution Stats Panel](#15-reward-distribution-stats-panel)
16. [Reward Distribution Transactions Table](#16-reward-distribution-transactions-table)
17. [Shared Components: Header, Footer, Pagination](#17-shared-components-header-footer-pagination)
18. [Design Notes & Annotations](#18-design-notes--annotations)

---

## 1. Explorer Public — 1440 Desktop (Default)

**Node ID:** `#5:67657`
**Purpose:** Primary public-facing blockchain explorer screen. Unauthenticated visitors can browse live Vixichain transactions. No wallet login required.
**Platform / breakpoint:** Desktop — fixed width 1440 px, white background (`#FFFFFF`)

### Layout

Top-to-bottom column layout, horizontal padding 80 px both sides:
1. **Header** (navigation bar)
2. **Dashboard** (summary stat cards, wrapping row)
3. **Transactions table card** (search + table + pagination)
4. **Spacer frame** (`#5:67662`) — top padding 48 px, left 16 px
5. **Footer**

### Fields / Data Displayed

#### Dashboard Stat Cards (`#5:67660` — `Explorer Dashboard` instance, `Rewards=Off`)

Four cards in a horizontally-wrapping row, each card in a white bordered box with `border-radius: 16px`, subtle box shadow:

| Card | Metric Label | Example Value |
|------|-------------|---------------|
| VIXC Price | Price • +10.5% last week | 1 VIXC = $2.1998 |
| Total Transactions | Total transactions | 1,234,234 |
| Total Value Processed | Total value processed | $304,949,949,400 |
| Total Wallets | Total Wallets | 1234 |
| Avg. Transaction Fee | Avg. transaction fee (24h) | $0.05 |

- VIXC price card shows a VIXC token icon (dark circle with Vixi logo), the price as `Desk/Title/Secondary` (Onest Medium 20px), and a hint row with "Price • +10.5% last week" in green (`#00992B`).
- Other cards show a large value (Title/Secondary) with a hint label below.

#### Transactions Table Card (`#5:67661` — `Explorer Tables` instance, `Type=Public, Mobile=Off`)

Container: white card, `border-radius: 16px`, 1px border `#E5E5E5`, box shadow, padding 24px 12px.

**Header row (above table):**
- Title: **"Transactions"** (`Desk/Title/Secondary`)
- Subtitle: **"Public view of Vixichain ledger,"** (`Desk/Text/Secondary`, gray `#808080`)
- **Search input** (placeholder: `Search by transaction hash or ID`) — full-width text input, 44px height, 1px border `#E5E5E5`, radius 8px

**Column headers** (table header row, `Product=Explorer (public), Row=Off`):

| Column | Label | Notes |
|--------|-------|-------|
| 1 | Tx hash | First column, no sort/filter |
| 2 | Network | No info icon |
| 3 | Sender | Has info (ⓘ) tooltip |
| 4 | Receiver | Has info (ⓘ) tooltip |
| 5 | Validator | Has info (ⓘ) tooltip |
| 6 | Created | Has sort arrow icon (sortable) |
| 7 | Confirmed | No sort |
| 8 | Status | No sort |
| 9 | Fee | Has info (ⓘ) tooltip; right-aligned, fixed width 88px |
| 10 | Amount | Right-aligned |

**Table rows** (`Product=Explorer (public), Row=On`):

Each data row contains:

| Cell | Content | Notes |
|------|---------|-------|
| Tx Hash / ID / Type | Truncated hash `cc00***b008` with copy icon; `ID: 123` with copy icon; `%tx type%` (placeholder for actual type) | Hash is abbreviated with `***` in the middle |
| Network | `Vixichain → Ethereum` | Direction arrow |
| Sender | `***` (three stars) | Hidden from public view per design note |
| Receiver | `***` (three stars) | Hidden from public view per design note |
| Validator | Validator avatar (round 20px image) + name, e.g., `Waterfall Illands bank, Inc` / `JustBank` / `HelloBank` | Shows institution name |
| Created | `2024-09-01` / `19:50, UTC` | Date on first line, time on second |
| Confirmed | `2024-09-01` / `19:50, UTC` | Same format as Created |
| Status | `Pending` (amber `#D98A00`) / `Rejected` (red `#FF6651`) / `Confirmed` (green `#00992B`) | Text only, no badge pill in this view |
| Fee | `0.02 VIXC` / `$ 0.2` | VIXC on first line, USD equivalent hint below |
| Amount | `***` | Hidden; the column content for public view is masked |

Three sample rows are shown in the default frame — Pending, Rejected, Confirmed statuses.

**Tooltip overlays (absolute positioned):**
- `"Excluding bridge fees"` — appears near the Fee column header (positioned at x:969, y:114 within table)
- `"Hidden from public view"` — appears near Sender/Receiver columns (positioned at x:335, y:36 within table)

### Search & Filters

- Single search input: placeholder `"Search by transaction hash or ID"`
- Design note: search by `transaction ID` or `transaction Hash`
- No filter controls visible in default state
- Default sort: **Created time** (descending) per annotation

### Actions

- **Copy icon** on Tx hash and ID fields — copies value to clipboard
- **Pagination** component (`#I5:67661;7444:75731`) — positioned below the table rows:
  - First-page button (double-left arrow icon)
  - Previous button (left arrow)
  - Page indicator: **"Page 2 of 5"** (blue `#0166D5` text)
  - Next button (right arrow)
  - Last-page button (double-right arrow)
  - Direct page input: numeric input showing `10` (page jump field)

### States

| State | Behaviour |
|-------|-----------|
| Default (loaded) | Three rows shown: Pending, Rejected, Confirmed |
| Sender / Receiver cells | Always `***` in public view (unauthenticated) |
| Amount cell | Always `***` in public view |
| Fee column | Shows VIXC + USD value; tooltip clarifies "Excluding bridge fees" |

### Navigation

- Header **"Log in"** button (primary blue gradient) → navigates to wallet sign-in / onboarding
- Clicking a table row → opens **Transaction Detail** panel / page (see Screen 4)
- Footer network switcher

### Copy / Labels

- Page title/header (Figma internal): `"Explorer [vixiscan]"`
- Search placeholder: `"Search by transaction hash or ID"`
- Table section title: `"Transactions"`
- Table section subtitle: `"Public view of Vixichain ledger,"`
- Tooltip 1: `"Excluding bridge fees"`
- Tooltip 2: `"Hidden from public view"`
- Footer copyright: `"© 2025 All rights reserved to Vixichain"`
- Footer network: `"Mainnet"` / `"Switch to Testnet"` (blue link)
- Header CTA: `"Log in"` (shown as "Sign up" in some breakpoints — see Screen 5)

### Design Notes

- Same CSS as internal wallet transaction table (hover states, fonts, paddings)
- Statuses displayed: **only Pending, Rejected, and Confirmed** (no Draft, Processing, etc.)
- Sender, Receiver, Amount: always masked `***` for unauthenticated public users
- Validator fee column: **do not show** in public view (design note node `#5:67755`)
- Bridge GAS fee: show `"–"` if transaction type is internal

---

## 2. Table: Additional States — Search, Empty, Error

**Node ID:** `#5:67671` (parent container), contains three sub-frames
**Purpose:** Documents three edge-case table states that appear within the same full Explorer layout.
**Platform / breakpoint:** Desktop 1440 px; height is fixed at 800px to clip below-fold content

### Layout

Same full-page Explorer layout (header + dashboard + table card). Three variants:

### State A — Search Active (`#5:67675`)

**Header row:** Displays "Search state" label (Figma annotation)
- Search input is **filled** (state=`Focus Filled, type=text`), showing active query
- Table renders results for the search query
- Dashboard stat cards remain visible above the table

### State B — Empty State (`#5:67698`)

**Header row:** "Empty state" label (Figma annotation)
- Search input is filled (indicating a search was run)
- Table body: **no rows**
- Empty state message below the table headers:
  - **"No transactions found, adjust your request and try again"** (`Desk/Text/Secondary`, gray, right-aligned)

### State C — Error State (`#5:67714`)

**Header row:** "Error state & loader when API is down - next sprints" (Figma annotation — marked as future sprint)
- Full-page error card (`#5:67726`), 512px wide, centered, padded 24px 40px 40px, border radius 24px, 1px border
- Error card content:
  - **Title:** `"Oops! Even the things we love can have hiccups sometimes."`
  - **Body line 1:** `"Something went wrong. Our system is experiencing temporary issues, but we're already working on a fix!"`
  - **What's going on?**
    - `"Some features may not work as expected."`
    - `"Our engineers are already working to resolve the issue."`
  - **What can you do?**
    - `"Relax! your funds are safe."`
    - `"Refresh the page after a few minutes."`
    - `"Check our Telegram or Twitter for real-time updates."` (Telegram and Twitter are blue links)
  - **Error code:** `"Error code: 109209"`
  - **Button:** Primary blue gradient CTA (label not specified in this frame — likely "Try again" or "Refresh")

### Design Notes

- Error & loader state is explicitly annotated as **"next sprints"** — not in MVP
- Empty state search input remains in the Filled state (the user had typed something)

---

## 3. Table: Breakpoints — Section Label

**Node ID:** `#5:67736`
**Purpose:** Internal Figma section header yellow banner with the text `"Table: breakpoints"`. Not rendered in production; used as a Figma canvas divider.

---

## 4. Transaction Detail — Desktop 1440 (Side Panel)

**Node ID:** `#5:67738` (contains both list and detail), detail panel at `#I5:67752`
**Purpose:** Full transaction detail view for a selected transaction. Shown as a right-side detail panel (or possibly a sub-page — the node structure suggests it is inlined in the same 1440px container at the `Trx detail table` breakpoint variant).
**Platform / breakpoint:** Desktop 1440 px

### Layout

The transaction detail renders as a structured data-field panel. The selected transaction ID is shown at the top, followed by three data sections:

1. **Transaction header** — hash + status badge
2. **Transaction details** section
3. **Validation** section
4. **Fees** section

### Fields / Data Displayed

**Transaction Header:**
- Large hash: `33dh*mGYY` (abbreviated, `Desk/Header/Secondary` — Onest Regular 28px)
- Status badge: `"Confirmed"` in a green-bordered pill (`border: 1px solid #00992B`, radius 8px, green text)

**Transaction Details section** (label: `"Transaction details"`, `Desk/Title/Secondary`):

| Field Label | Example Value | Notes |
|-------------|---------------|-------|
| Amount | `***` (masked) + VIXC token icon | Amount masked for public view |
| Network | `Vixichain → Ethereum` | Bridge direction |
| Type | `Inbound` | Transaction direction type |
| Tx hash | `33dhFqthZWw9jUgSnCv1RanVwBas7898swwrEmGYY` | Full untruncated hash |
| Block | `–` | Block number (dash if unknown) |
| Note | `–` | Optional memo field |

**Validation section** (label: `"Validation"`, `Desk/Title/Tertiary` — Onest SemiBold 14px):

| Field Label | Example Value | Notes |
|-------------|---------------|-------|
| Sender | `***` | Masked in public view |
| Receiver | `***` | Masked in public view |
| Validator | `***` | Masked in public view |
| Tx Created | `2024-09-01` / `19:50:54 (UTC)` | Date + time, two-line format |
| Tx Confirmed | `2024-09-01` / `19:50:54 (UTC)` | Same format |

**Fees section** (label: `"Fees"`, `Desk/Title/Tertiary`):

| Field Label | Example Value | Notes |
|-------------|---------------|-------|
| Validator fee | `***` | Hidden from public view (design note) |
| Platform fee | `$ 0.1` / `0.01 VIXC` | USD + VIXC amount |
| Bridge GAS fee | `$ 0.1` / `0.01 VIXC` | Shows `"–"` if internal tx |
| Total network fee | `$ 0.1` / `0.01 VIXC` | Sum of applicable fees |

### States

| State | Behaviour |
|-------|-----------|
| Confirmed | Green bordered badge |
| Pending | Amber text status (inferred from list) |
| Rejected | Red text status (inferred from list) |
| Public / unauthenticated | Sender, Receiver, Validator, Amount all `***` |

### Design Notes

- **Validator fee is hidden** in public view and in "not my transactions" context (annotation: `"In public view and in Not my transactions: dont show Validator's fee"`)
- **Bridge GAS fee rule:** if transaction type = internal, show `"–"` instead of a value
- Field labels use `Desk/Text/Primary` (16px Onest Regular, gray `#808080`) with fixed width 140px
- Values use `Desk/Text/Primary` (16px, black)
- Two-column layout: label left, value right

---

## 5. Explorer Public — 375 Mobile (Transaction List)

**Node ID:** `#5:67758`
**Purpose:** Mobile-optimised transaction list. Same data as desktop but displayed as a vertically-scrolling card list.
**Platform / breakpoint:** Mobile — fixed width 375px (but frame is 500px in Figma; rendered at 375)

### Layout

1. **Header** — logo left, "Sign up" button right (primary blue gradient)
2. **Dashboard stat cards** (wrapping, horizontal scroll implied)
3. **Transactions section** — card list grouped by date
4. **Pagination** (smaller on mobile per annotation)
5. **Footer**

### Fields / Data Displayed

#### Mobile Dashboard Stat Cards

Same four metric cards as desktop; at mobile the `Explorer Dashboard (Type=Public, Mobile=On)` component variant is used. Cards stack/wrap as available width allows.

#### Mobile Transaction List Card

Transactions are grouped under **date dividers**:
- Date header: `"31 Jan, 2025"` (`Mob/Text/Hint` — Onest Regular 12px)

Each transaction row (inside the date group) is separated by a bottom border:

| Element | Content | Notes |
|---------|---------|-------|
| Tx Hash (top-left) | `cc00*b008` (truncated) | Bold (`Mob/Title/Secondary` — Onest Medium 16px) |
| Created time (top-right) | `created 12:22` | Hint gray |
| Network (below hash) | `Vixichain → Ethereum` | `Mob/Text/Primary` (14px) |
| Amount (right) | `***` | Masked for public view |
| Fee (bottom-left) | `Fee: $3.3030` / `Fee: $30.3030` | Hint gray |
| Status (bottom-right) | `Pending` (amber) / `Confirmed 12:25` (green) / `Rejected` (red) | Color-coded status |

Multiple rows shown across two date groups (`31 Jan, 2025`).

### Actions

- Tapping a row → navigates to Transaction Detail (Screen 6)
- Pagination: smaller version of the desktop pagination (annotation: "make pagination smaller")

### States

| Status | Color |
|--------|-------|
| Pending | Amber `#D98A00` |
| Confirmed | Green `#00992B` — shown as `"Confirmed 12:25"` (timestamp included) |
| Rejected | Red `#FF6651` |

### Design Notes (from annotation `#5:67669`)

For this MVP mobile version:
- Only horizontal scroll for the table (not present on mobile — mobile uses card list instead)
- Make pagination smaller

---

## 6. Explorer Public — 375 Mobile (Transaction Detail)

**Node ID:** `#5:67765`
**Purpose:** Mobile transaction detail view opened after tapping a transaction in the list.
**Platform / breakpoint:** Mobile — fixed width 375px

### Layout

1. **Header** (logo + sign-up button)
2. **Detail panel** full-width card
3. **Footer**

### Fields / Data Displayed

Same field structure as the desktop Transaction Detail (Screen 4), adapted for mobile:

**Header:**
- Transaction hash: `33dh*mGYY` (abbreviated)
- Status badge: `"Confirmed"` (green bordered pill)

**Section: Transaction details**

| Field | Example Value |
|-------|---------------|
| Amount | `***` (masked) |
| Network | `Vixichain → Ethereum` |
| Type | `Inbound` |
| Tx hash | `33dhFqthZWw9jUgSnCv1RanVwBas7898swwrEmGYY` |
| Block | `–` |
| Note | `–` |

**Section: Validation**

| Field | Example Value |
|-------|---------------|
| Sender | `***` |
| Receiver | `***` |
| Validator | `***` |
| Tx Created | `2024-09-01` / `19:50:54 (UTC)` |
| Tx Confirmed | `2024-09-01` / `19:50:54 (UTC)` |

**Section: Fees**

| Field | Example Value |
|-------|---------------|
| Validator fee | `***` (hidden in public view) |
| Platform fee | `$ 0.1` / `0.01 VIXC` |
| Bridge GAS fee | `$ 0.1` / `0.01 VIXC` |
| Total network fee | `$ 0.1` / `0.01 VIXC` |

### Design Notes

- Same visibility rules as desktop: Validator fee hidden, Sender/Receiver/Amount masked
- Fields are stacked in a single column on mobile

---

## 7. Explorer Public — 1920 Wide Desktop

**Node ID:** `#5:67776`
**Purpose:** Wide desktop layout — same content as 1440, adapted for 1920px width.
**Platform / breakpoint:** Desktop — fixed width 1920px

### Layout

Identical section structure to Screen 1 (header → dashboard → table → footer). Padding likely 80px horizontal as per shared layout. Dashboard cards and table content are the same.

**Notable difference:** A single additional stat card variant appears at node `#5:67790` (280×80px standalone balance card) that shows a `+0% last week` hint — appears to be a component exploration frame separate from the main screen.

### Fields / Data Displayed

Same as Screen 1. Example values are identical:
- VIXC = $2.1998, +10.5% last week
- Total transactions: 1,234,234
- Total value processed: $304,949,949,400 (shown as $304,949,400 in some variants)
- Total Wallets: 1234
- Avg. transaction fee (24h): $0.05

Table rows and pagination identical to Screen 1.

---

## 8. Explorer Public — 1200 Breakpoint

**Node ID:** `#5:67799`
**Purpose:** 1200px breakpoint responsive variant of the main explorer.
**Platform / breakpoint:** Breakpoint — fixed width 1200px

### Layout

Same as 1440 desktop. All sections present. Content: identical to Screen 1.

A design note annotation (`#5:67820`) for this section reads:
> "this is ok for test net, but doesn't look good so here are basic ways how cards are restructured"

This implies the card wrapping behaviour at 1200px needs design review.

### Fields / Data Displayed

Same as Screen 1 — full dashboard stats, full table with 3 sample rows (Pending, Rejected, Confirmed).

---

## 9. Explorer Public — 900 Breakpoint

**Node ID:** `#5:67808`
**Purpose:** 900px breakpoint responsive variant.
**Platform / breakpoint:** Breakpoint — fixed width 900px

### Layout

Same as 1440. Dashboard cards begin wrapping to additional rows. Table columns remain but may compress.

### Fields / Data Displayed

Same as Screen 1.

---

## 10. Explorer Public — 768 Breakpoint

**Node ID:** `#5:67821`
**Purpose:** 768px (tablet landscape) breakpoint.
**Platform / breakpoint:** Tablet — fixed width 768px

### Layout

Same section ordering as desktop. Card grid wraps further.

### Fields / Data Displayed

Same as Screen 1.

---

## 11. Explorer Public — 430 Mobile Breakpoint

**Node ID:** `#5:67828`
**Purpose:** 430–500px mobile breakpoint variant (Figma width set to 500px but represents 430px target).
**Platform / breakpoint:** Mobile — width ~430px

### Layout

- Header with logo and "Sign up"
- Dashboard cards stacked vertically (one or two per row)
- Two notable card sub-frames:
  - `#5:67842` — balance card with `justifyContent: flex-end`, full-width
  - `#5:67858` — balance card, includes `"Avg. transaction fee (24h)"` at 14px hint
- Transactions table uses mobile card list format (same as Screen 5)
- Pagination at bottom
- Footer

### Fields / Data Displayed

Same metric values as Screen 1. At this breakpoint, cards restructure significantly (referenced in note from Screen 8's annotation).

---

## 12. Dashboard Rewards Variant — Explorer Dashboard with Rewards=On

**Node ID:** `#5:67866` (standalone frame, 1558px wide), contains instances `#5:67867` through `#5:67900`
**Purpose:** Shows the Explorer Dashboard component in multiple wrapping/size configurations when the `Rewards=On` variant is active. This adds a **Total Rewards** stat card to the dashboard.
**Platform / breakpoint:** Desktop — multiple widths (1464, 1230, 995, 737, 532, 484, 258 px) showing wrapping behaviour

### Additional Stat Card When Rewards=On

A fifth card appears in the dashboard:

| Metric Label | Example Value |
|-------------|---------------|
| Total rewards | 234,343.05 VIXC |
| "Reward" | Blue link text `#0166D5` (label is just "Reward" or "Rewards") |

The standalone 1230px custom frame (`#5:67868`) shows the card row with:
- 1 VIXC = $2.1998
- Price • +10.5% last week
- Total transactions: 1,234,234
- Total value processed: $949,949,400
- Total Wallets: 1234
- Avg. transaction fee (24h): $0.05
- **Total rewards: $234,343.05** with "Reward" in blue

### Design Notes

- Rewards stat card only visible when rewards feature is enabled (`Rewards=On`)
- The six wrapping configurations document exactly how the dashboard re-flows at each width step

---

## 13. Explorer Public — Testnet / Mainnet Variant (Full Tokenomics)

**Node ID:** `#5:99497` (`Explorer public` at 2000px wide, Testnet enabled)
**Purpose:** Extended Explorer screen showing full **VIXC tokenomics** and **Vixichain network stats** plus a **Fees section**. This is a more data-rich version of the dashboard, seemingly for the Testnet build or a "next sprint" version.
**Platform / breakpoint:** Desktop — centered container 2000px outer, inner content width standard

### Layout

1. **Testnet banner** (full-width blue gradient banner with "TestNet" text in Unbounded Bold 24px white)
2. **Header** (logo + VIXC price inline + "Log in" button)
3. **Tokenomics / Supply section**
4. **On Vixichain network stats card**
5. **Fees card**
6. **Transactions table** (standard public table)
7. **Footer**

### Fields / Data Displayed

#### Testnet Header Extension

The header for this variant includes an inline balance display:
- `1 VIXC = $2.1998` — price
- `Total rewards: 234,343.05 VIXC` (shown when Rewards=On)

#### Tokenomics / Supply Section (`#5:99513`)

A large card with `border-radius: 16px`, padding `16px 16px 40px`:

**Total Supply row:**
- `"2.9b VIXC Total Supply (minted): / 5'b VIXC Total Supply (max):"` (Title/Secondary)
- `"Updated 2h ago"` (hint gray)

**Public holdings:**
- Header: `"Public holdings - total:"`

Breakdown rows (each shows percentage + VIXC amount + wallet address link):

| Category | Percentage | Example Amount | Wallet |
|----------|-----------|----------------|--------|
| Total Circulating Supply | XX.00% | 2.9billion VIXC • $2.9billion | — |
| on wallets | XX.00% | 2.9billion VIXC • $2.9billion (excluding our wallets below) | — |
| on bridge & CDEX | XX.00% | 2.9billion VIXC • $2.9billion | — |
| on Ethereum | XX.00% | 2.9billion VIXC • $2.9billion | — |
| on Tron | XX.00% | 2.9billion VIXC • $2.9billion | — |

**Vixichain holdings:**
- Header: `"Vixichain holdings: - total 1234"`
- Distribution table:

| Allocation Category | Percentage | Amount | Wallet Address |
|--------------------|-----------|--------|----------------|
| Public Sale | 30.49% | 12,000 VIXC • $12,000 | cc00*b008 |
| Company Reserves | 18.00% | 12,000 VIXC • $12,000 | cc00*b008 |
| Private Sale | 12.00% | 12,000 VIXC • $12,000 | cc00*b008 |
| Airdrops & Rewards | 10.66% | 12,000 VIXC • $12,000 | cc00*b008 |
| Core Team | 10.00% | 12,000 VIXC • $12,000 | cc00*b008 |
| Launchpad & Collaborations | 8.50% | 12,000 VIXC • $12,000 | cc00*b008 |
| Liquidity Pool | 5.00% | 12,000 VIXC • $12,000 | cc00*b008 |
| Boards of Advisors | 3.30% | 12,000 VIXC • $12,000 | cc00*b008 |
| Validators Strategic Sale | 2.05% | 12,000 VIXC • $12,000 | cc00*b008 |

Wallet addresses are shown as blue links (`#0166D5`).

#### On Vixichain Card

**Title:** `"On Vixichain"` (`Desk/Title/Secondary`)

| Metric | Value |
|--------|-------|
| Total transactions | 1,234,234 |
| Total Wallets | 1234 |
| Total value processed | $949,949,400 |
| Transactions (24h) | 122 |
| Avg. TPS (24h) | 12 |
| Current block | 123456789 |

#### Fees Card

**Title:** `"Fees"` (`Desk/Title/Secondary`)

| Metric | Value |
|--------|-------|
| Avg. Tx fee (24h) | $0.05 |
| Network fee | $0.075 |
| Avg. BaV fee | $0.075 |
| Total BaVs | 12 |
| Platform fees burned | XX.00% • 12,000 VIXC • $12,000 |
| Deflationary Mechanism | (label with question marks — TBD) |

Platform fees burned label: `"Platform fees burned | Deflationary Mechanism ??? ??????"` — placeholder / not yet defined

### Copy / Labels

- Testnet banner: `"TestNet"` (Unbounded Bold 24px white on blue gradient)
- Header note (Figma): `"Header → Create new user"` (annotation only)

---

## 14. Explorer Public — Testnet Banner Variant

**Node ID:** `#5:99764`
**Purpose:** Same data-rich Testnet screen as Screen 13 but using the `Testnet banner` component at the very top, plus slightly different header layout.
**Platform / breakpoint:** Desktop — 2000px outer container, centered inner content

### Layout Difference from Screen 13

- Full-width `Testnet banner` (blue gradient, "TestNet" text) sits **above** the main header
- Header shows VIXC price inline + Total rewards stat directly in the nav bar area
- Same tokenomics, On Vixichain, Fees, and Transactions table sections below
- Ends with Reward Distribution Stats and Reward Distribution Transactions table (see Screens 15–16)

### Additional Header Bar Content (Testnet variant)

Inline in the Explorer Header:
- VIXC token icon
- `1 VIXC = $2.1998` (medium weight)
- `Total rewards` label in blue `#0166D5`
- `234,343.05 VIXC`
- `"Log in"` button (primary blue gradient)

---

## 15. Reward Distribution Stats Panel

**Node ID:** `#5:99706` (title text), `#5:99707` (dashboard row)
**Purpose:** Summary cards showing total reward pool and claimed amounts broken down by reward category.
**Platform / breakpoint:** Desktop — appears below the main transactions table in the Testnet screen

### Layout

Section header: `"Reward Distribution Stats"` (`Desk/Title/Primary` — Onest SemiBold 24px)

A horizontal row of cards:

**Card 1 — Total**
- `Total Reward Pool: 2000 VIXC`
- `Claimed: 400 VIXC`

**Card 2 — Pre-sale**
- Category label: `"Pre-sale"` + contract address `"Vixi Pre-sale: cc00*b008"` (hint)
- `Total Reward Pool: 1000 VIXC`
- `Claimed: 200 VIXC`

**Card 3 — Airdrop**
- Category label: `"Airdrop"` + contract address `"Vixi Airdrop: cc00*b008"` (hint)
- `Total Reward Pool: 1000 VIXC` (shown as 421 VIXC in alternate value)
- `Claimed: 421 VIXC`

**Card 4 — Invites**
- Category label: `"Invites"` + contract address `"Vixi Invites: cc00*b008"` (hint)
- `Total Reward Pool: 1000 VIXC`
- `Claimed: 200 VIXC`

Each card uses white background, `border-radius: 16px`, 1px border, box shadow. Inner stats are two-column mini-cards.

---

## 16. Reward Distribution Transactions Table

**Node ID:** `#5:99760` (instance `Type=Rewards, Mobile=Off`), `#I5:99760` — in the Testnet screen
**Purpose:** A separate transactions table below the Reward Distribution Stats, showing all reward distribution events (from Presale and Airdrop campaigns).
**Platform / breakpoint:** Desktop — same 1440/1920 context

### Layout

Same card wrapper as the main Transactions table (white, `border-radius: 16px`, 1px border, shadow).

**Table header:**
- Title: `"Reward Distribution"` (`Desk/Title/Secondary`)
- Subtitle: `"Detailed overview of all reward distribution transactions, including those from Presale and Airdrop campaigns."` (gray, with Presale and Airdrop as blue links)
- **Search input** — placeholder: `"Search by full wallet address"`

### Column Headers

| Column | Label |
|--------|-------|
| 1 | Tx hash (copied from main table) |
| 2 | Wallet address |
| 3 | Campaign |
| 4 | Updated (date) |
| 5 | Amount |

### Table Rows (sample data)

| Tx Hash | Wallet Address | Campaign | Updated | Amount |
|---------|----------------|----------|---------|--------|
| cc00*b008 | cc00*b008 | Pre-sale | 2024-09-01 19:50, UTC | 31.0000 VIXC |
| cc00*b008 | cc00*b008 | Airdrop | 2024-09-01 19:50, UTC | 121.0000 VIXC |
| cc00*b008 | cc00*b008 | Airdrop | 2024-09-01 19:50, UTC | 300.0000 VIXC |
| cc00*b008 | cc00*b008 | Pre-sale | 2024-09-01 19:50, UTC | 55.0000 VIXC |

Amount format: integer part (right-aligned, `Desk/Text/Secondary`) + `.0000` decimal (gray, fixed width 40px) + `VIXC` token label (hint, fixed width 36px).

### Actions

- Pagination (same component as main table)
- Pagination jump input field

---

## 17. Shared Components: Header, Footer, Pagination

### Explorer Header

**Component set:** `Explorer Header` (`5:58669`)
**Variants:**
- `state=Signup` (`5:58670`) — used for public explorer
- `state=Default-Idle` — used with Testnet inline price bar

**Default public header layout (row, space-between, padding 24px 0px 16px, wrap, gap 12px):**
- Left: Vixiscan logo SVG (194.4 × 48 px full desktop / 94 × 24 px mobile)
- Right: Primary **"Log in"** button (blue gradient, height 40px, radius 8px, label "Log in" or "Sign up")

**Testnet header extension:**
- Inline price row: VIXC token icon + `1 VIXC = $2.1998` + Price hint
- When Rewards=On: `Total rewards` label (blue) + `234,343.05 VIXC`

### Footer

**Component:** `footer` (`5:23542`), variants `Product=Scan` and `Product=Wallet`
**Layout:** Row, padding 24px 40px (desktop) / 24px 16px (mobile), space-between, wraps, gap 40px.

Left side:
- Vixiscan logo (SVG)
- Vixichain logo
- Social media icons: Facebook, Twitter, YouTube, Behance (28×28px each)

Right side:
- Copyright: `"© 2025 All rights reserved to Vixichain"` (gray hint 12px)
- Network switcher: `"Mainnet"` plain text + `"Switch to Testnet"` blue bold link

**Note on network switcher:** When already on Testnet, the same component shows `"Testnet"` (plain) + `"Switch to Mainnet"` (blue). The Figma element `EL-09c6b1fe` shows `"Switch to Testnet"` variant in blue small bold for the in-page compact version.

### Pagination

**Component:** `Pagination` (`5:58695`)
**Layout:** Row, gap 8px, height 44px

Elements (left to right):
1. First-page button (double-left icon `icon/pagination`)
2. Previous button (left arrow `icon/arrow`)
3. Page indicator text: `"Page 2 of 5"` (blue `#0166D5`, Onest SemiBold 14px)
4. Right arrow icon between page number sections
5. Next button (right arrow)
6. Last-page button (double-right icon)
7. Page jump input (numeric, e.g., `10`, with down arrow icon) — height 44px, bordered, radius 8px

On mobile: pagination is made smaller (per design note).

---

## 18. Design Notes & Annotations

All annotations are extracted verbatim from Figma note frames (yellow background `#FDCD5D` fill).

### From `#5:67665` (main table notes)

```
Notes

filters: -

default sort by: created time

Statuses that we show here: only pending, rejected and confirmed.

Table should have same css as internal wallet table (hovers states, font, paddings, etc)

Button leads to this page
```

### From `#5:67668` (hover / tooltip notes)

```
Hovers - same
+ Fee tooltip
+ Sender, receiver, validator tooltip
```

### From `#5:67667` (search input example)

Search input placeholder in Figma is annotated as: `"Search by transaction ID, transaction Hash"`

### From `#5:67669` (mobile table notes)

```
For mobile table for this version:
  - only hor scroll
  - make pagination smaller
```

### From `#5:67755` (public view note)

```
In public view and in Not my transactions:
don't show Validator's fee
```

### From `#5:67756` (status note)

```
Statuses that we show here: only pending, rejected and confirmed.
```

### From `#5:67757` (Bridge GAS fee rule)

```
Bridge GAS fee:
if Trx type = internal
then "–"
```

### From `#5:67820` (breakpoint card note)

```
this is ok for test net, but doesn't look good
so here are basic ways how cards are restructured
```

### From Note `#5:67754` (public view fee note)

```
In public view and in Not my transactions:
don't show Validator's fee

Statuses that we show here: only pending, rejected and confirmed.

Bridge GAS fee:
if Trx type = internal
then "–"
```

### From `#5:107690d1` annotation on 900px section

```
L/R paddings changed
```
(Yellow annotation sticky note `#5:67820` area — indicates padding changes at 900px breakpoint)

---

## Sprint Planning Context

Figma section headers indicate three planning buckets:

| Header Label | Node |
|--------------|------|
| MVP version | `#5:101046` |
| Next sprint | `#5:101055` |
| +2 sprints | `#5:101060` |

The error/API-down state and loading skeleton are explicitly labelled **"Error state & loader when API is down - next sprints"** — not included in MVP.

The full Tokenomics / supply section (Screen 13) and Reward Distribution Stats / Transactions (Screens 15–16) appear only in the Testnet/extended variant screens, not in the MVP 1440 screen.

---

## Reading Summary

- **Lines read:** 7,754 (all lines via sequential chunks + targeted grep extraction)
- **Screens found:** 14 distinct canvas frames (plus annotation/note frames and component-set exploration frames):
  1. Explorer public 1440 (default)
  2. Table: additional states (search / empty / error)
  3. Table: breakpoints section label
  4. Transaction detail panel (1440)
  5. 375 Mobile transaction list
  6. 375 Mobile transaction detail
  7. 1920 wide desktop
  8. 1200 breakpoint
  9. 900 breakpoint
  10. 768 breakpoint
  11. 430 mobile breakpoint
  12. Rewards=On dashboard variant
  13. Testnet tokenomics screen (2000px)
  14. Testnet banner variant with Reward Distribution

- **Skipped / excluded:** Internal Figma planning headers (`Office use / Header figma` instances labelling "Explorer [vixiscan]", "MVP version", "Next sprint", "+2 sprints"); component set explorer frames for button/icon/arrow wrapping tests; the `balance` standalone card frame `#5:67790` (isolated component exploration).
