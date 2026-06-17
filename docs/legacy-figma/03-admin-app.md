# Risely Admin Panel — Design Reference

**Source:** Figma "Risely & Velmie [copy for Alex]", Admin page
**File key:** WqPkVMqaa56CCZElzEYMkY
**Design version note:** Updated design created Aug 2024. Old design (similar to what is in prod) is preserved alongside. Design is not pixel-perfect; treat as a spec reference, not a strict visual guide.
**Table template:** [Ant Design](https://ant.design/components/table) — FE must use the clean Ant component; no custom CSS overrides. Figma uses its own component for illustration only.
**UX rules (global):** See `01-architecture.md §11` for CSV export, right-click behavior, and table requirements — not repeated here.

---

## Table of Contents

1. [Navigation & Sidebar](#1-navigation--sidebar)
2. [Global / System UX Notes](#2-global--system-ux-notes)
3. [Dashboard](#3-dashboard)
4. [Clients — List Table](#4-clients--list-table)
5. [Client Detail Page](#5-client-detail-page)
6. [Client — Activity Sub-page](#6-client--activity-sub-page)
7. [Client — Page States by Account Status](#7-client--page-states-by-account-status)
8. [Client — Processes & Flows](#8-client--processes--flows)
9. [All Transactions — List Table](#9-all-transactions--list-table)
10. [Transaction Detail Page](#10-transaction-detail-page)
11. [Compliance — KYT (Sub-menu under Compliance)](#11-compliance--kyt)
12. [Compliance — KYC (Sub-menu under Compliance)](#12-compliance--kyc)
13. [Rewards — Admin Table](#13-rewards--admin-table)
14. [Marketing — Referral Programs](#14-marketing--referral-programs)
15. [Settings — Fees](#15-settings--fees)
16. [Settings — Users](#16-settings--users)
17. [Settings — Roles](#17-settings--roles)
18. [Dashboard / Liquidity Management](#18-dashboard--liquidity-management)
19. [Activity & Logs (Sidebar)](#19-activity--logs-sidebar)
20. [Open Questions & Design Notes](#20-open-questions--design-notes)

---

## 1. Navigation & Sidebar

### 1.1 Sidebar Menu Structure

The admin sidebar is a collapsible vertical nav. It has two states: **Open** (text + icon) and **Collapsed** (icon only). Groups that have sub-items use an expandable tile with a Chevron Up/Down icon. When one group is expanded, the others do NOT auto-close (see §2).

**Top-level menu items (in order):**

| Menu Item | Type | Sub-items |
|---|---|---|
| Dashboard | Flat link | — |
| Clients | Flat link | — |
| Transactions | Flat link | — |
| Compliance | Expandable | KYT, KYC |
| Rewards | Flat link | — |
| Marketing | Expandable | Content, Banner |
| Activity | Expandable | Logs |
| Setting | Expandable | Fees, Users, Roles |

**Design note — sidebar behavior:**
- Do not close a group when another is selected.
- Remove unnecessary yellow highlight on selected group header.

### 1.2 Header Bar (Top of each screen)

- **Left:** Breadcrumb trail (e.g., `Clients › KW123456, Kristin Watson`)
  - Each previous breadcrumb level must be a clickable link.
  - Remove unnecessary breadcrumb levels (keep path lean).
- **Right:** Logged-in admin name (e.g., "Alex") + timestamp: `Admin, Last Login 12-12-2023 21:00:00 UTC`

---

## 2. Global / System UX Notes

*(See also `01-architecture.md §11` for table-level rules.)*

### 2.1 Sidebar accordion
Do not collapse an already-open section when opening another.

### 2.2 Timestamps
Every entity and every change must have a timestamp. Format shown: `13 Aug 2024 | 14:50 UTC` (inline) or `13/08/24, 14:52 UTC` (table cells).

### 2.3 Delete / Block confirmation modal
Generic modal pattern for destructive actions:

- **Title:** "Are you sure you want to %action% this %entity%?"
- **Body:** "Please confirm your action, this action cannot be undone."
- **Textarea:** "Reason to remove user" (required text field)
- **Buttons:** [Delete] [Cancel] or [Block] [Cancel] or [Make active] [Cancel]

### 2.4 Info Card (data-card) component
Used on all entity detail pages. Rules:
- Field name displayed above value (label on top).
- Do NOT stretch cards — follow design spacing.
- Font: black, 12px for field names, 16px for values.
- States:
  - **Empty (null/no data):** show `—`
  - **Zero:** show `0` (data exists but is zero)
  - **Value as link:** render as a clickable hyperlink (e.g., client Risely ID `AK484934`)
  - **Long text:** do NOT truncate/ellipsis — allow full wrap (e.g., long addresses)
  - **With subtext:** show sub-text below value (e.g., `Updated on 13 Aug 2024 | 14:50 UTC by Vlad`)
  - **Flipped with button:** value on left, action button on right (e.g., `1.00000008 ETH ≈ $20.00` + `[Freeze amount]`)
  - **With links:** value is a list of clickable doc names

### 2.5 Entity pages (direct links + IDs)
- Every entity page must have a direct URL containing its ID.
- Ctrl+click or right-click → open in new tab.
- Filter state must be preserved in the URL.

### 2.6 Role-based visibility (sensitive data)
Two role cases affect what is visible across all screens:

| Role | IBAN/Wallet address |
|---|---|
| Support | Partial only (`*2606`, `bc1q*pye6`) |
| Compliance | Full address |

---

## 3. Dashboard

**Screen / view name:** Dashboard
**Purpose:** High-level KPIs about clients, transactions, fees, and liquidity.

### 3.1 Clients Block

**Section: Account Status**

| Status | % | Count (example) |
|---|---|---|
| Active | 90% | 40,333 |
| Suspended | 1% | 4,333 |
| Blocked | 3% | 1,000 |
| In-Verif. | 6% | 100 |

**Section: Verification Status**

| Status | % | Count (example) |
|---|---|---|
| Pending | 3% | 25 |
| In-Process | 1% | 25 |
| Verified | 90% | 25 |
| Rejected | 6% | 25 |

**Section: Client Distribution**

| Type | % | Count (example) |
|---|---|---|
| Individual | 90% | 40,000 |
| Business | 1% | 400 |

**Section: Acquisition**

| Period | Count | Change |
|---|---|---|
| Last 7 days | 34 | +12% |
| Last 30 days | 5,434 | +12% |
| Avg per month | 334,123 | +12% |

**Section: Value $**

| Metric | Value (example) |
|---|---|
| Total Value | $3,434,595,434.11 |
| AVG Business Account Value | $4,595,434.11 |
| AVG Individual Account Value | $5,434.11 |

### 3.2 Transactions Block

**Section: Total transactions**

| Metric | Value (example) |
|---|---|
| Total | 3,434,344,344 |
| Fiat split | 20% |
| Crypto split | 80% |

**Current Month sub-section:**

| Period | Count | Fiat | Crypto |
|---|---|---|---|
| Current Month | 4,344,344 (+12%) | 20% | 80% |
| Past Month | 344 | 20% | 80% |

**Section: AVG # of transactions**

| Period | Count |
|---|---|
| Last 30 days | 34 |
| Last 60 days | 5,434 |
| Last 90 days | 334,123 |

**Section: AVG $**

| Period | Value |
|---|---|
| Last 30 days | $3,434,595,434.11 |
| Last 60 days | $3,434,595,434.11 |
| Last 90 days | $333,434,595,434,114.02 |

### 3.3 Fees Block

**Section: Current Month (e.g., September 2024)**

Columns: Expenses | Income | Delta

| Provider | Expenses | Income | Delta | % |
|---|---|---|---|---|
| Total | $12,122,444.00 | $12,122,444,444,444… | $234,434,434… | 4333% |
| Narvi | 1,000.00 EUR (≈$1,000) | 1,000.00 EUR (≈$1,000) | $4 | 0.232% |
| Ethereum | 1,000.0000023 ETH (≈$1,000) | 1,000.0000023 ETH (≈$1,000) | $0 | 0% |
| Tron | 1,000.0000023 TRX (≈$1,000) | 1,000.0000023 TRX (≈$1,000) | –$43,232,323.33 | 250% |

**Section: Previous months (last 30/60/90 days totals)**

| Period | Expenses | Income | Delta | % |
|---|---|---|---|---|
| Last 30 days | $3,000 | $6,000 | $6,000 | 33% |
| Last 60 days | $3,000 | $6,000 | $6,000 | 33% |
| Last 90 days | $5,000 | $2,000 | –$3,000 | 250% |

### 3.4 Liquidity Management Block

Shows total available balance in USD: e.g., **$ 403,404,044.00**

**Currencies shown (example data):**

| Currency | Amount | USD equiv |
|---|---|---|
| USDT | 1.00000008 | $4.142,44 |
| USDC | 43,234,123.00000008 | $4.142,44 |
| BTC | 1.00000008 | $4.142,44 |
| ETH | 1.00000008 | $4.142,44 |
| TRX | 1.00000008 | $4.142,44 |
| BNB | 1.00000008 | $4.142,44 |
| EUR | 3,434,555,434.44 | $3,434,595,434.11 |

### 3.5 Dashboard Actions

| Action | Behavior |
|---|---|
| CSV | Export dashboard/liquidity data |
| Click on Liquidity | Opens full Liquidity Management screen (available to 2 people only) |

### 3.6 Design Notes

- **Open question:** Who has access to the stats about Clients and Transactions blocks?
- Liquidity Management full version is confirmed by business; limited "current" version is available.

---

## 4. Clients — List Table

**Screen / view name:** Clients
**Breadcrumb:** `Clients`
**Purpose:** Master list of all clients in every lifecycle state (registered, KYC in progress, approved, rejected, blocked, closed). Contains all types simultaneously.

### 4.1 Filters / Search Bar

| Filter | Type | Options |
|---|---|---|
| Search | Text | By Risely ID, Name, Email, Phone |
| User Type | Dropdown | Individual, Business |
| Country | Dropdown | Country list |
| Account Status | Dropdown | See status list below |
| Verification Status | Dropdown | See status list below |
| Risk score | Dropdown | All, specific ranges |
| Sort by | Dropdown | Created (default) |
| Created from | Date picker | — |
| Created to | Date picker | — |

### 4.2 Table Columns

| Column | Type | Notes |
|---|---|---|
| Risely ID | Link | Clickable → opens client detail. Shown as `{ts3}KW123456{/ts3}` (linked). Pinned 1st col |
| Name | Text | Full name |
| Email | Text | Email address |
| Country | Text | Country of residence |
| Type | Badge | Individual / Business |
| Account Status | Badge | See statuses below |
| Verification Status | Badge | See statuses below |
| Account Value, $ | Number | Total balance in USD |
| TX's Under Review | Number | Count of transactions currently under compliance review |
| Created | Datetime | `13/08/24, 14:52 UTC` |
| Updated | Datetime | `13/08/24, 14:52 UTC` |

**Pinned columns:** 1st (Risely ID) and last column.
**Pagination:** 50 per page. Total shown (e.g., Total: 980). Pages: 1, 2, 3, … 8, 9, 10.

### 4.3 Account Status Values

- Registration
- Active
- Blocked (+ reason stored)
- Close request (+ "user requested to close due to: [input]")
- Close in progress (X days left) (+ reason from user)
- Closed
- Suspended
- Put on hold

### 4.4 Verification Status Values

- Pending
- Submitted (also shown as "Submited" in some rows — likely typo)
- In-Process
- Approved
- Rejected

### 4.5 Actions / Buttons

| Action | Location | Behavior |
|---|---|---|
| CSV | Top bar | Downloads client data — all fields visible in table + all detail-page fields. Applies to all filtered results (not just current page). |
| Filter | Top bar | Opens/collapses filter bar |
| Click row | Table row | Opens client detail page |

### 4.6 Design Notes

- Table contains ALL clients regardless of lifecycle stage.
- Default sort: by Last transaction (newest first).
- No approve/reject buttons on the list — admin must navigate to client page first.
- FE note from designer: "After discussion with FE (Artur), we can do filtering and sorting in the columns, and we have filters above just for the fields that are not in the table."
- Roles restrictions (apply to both table and detail page):
  - Support role: must NOT see full IBAN/Wallet address
  - Compliance role: can see full IBAN/Wallet address

---

## 5. Client Detail Page

**Screen / view name:** Client detail (e.g., "Kristin Watson")
**Breadcrumb:** `Clients › KW123456, Kristin Watson`
**URL pattern:** Contains client Risely ID.
**Purpose:** Full view of a single client — personal info, KYC status, wallets, transactions, rewards, risk score.

### 5.1 Header Area

- **Client name** (large): e.g., Kristin Watson
- **Risely ID:** e.g., `KW123456`
- **Account status badge:** shows current status (Active / Blocked / Registration / Close request / etc.)
- **Assign client to** [button]: opens assign popup
- **CSV** [button]: downloads all client data
- **Risk Score card:**
  - Label: "Client's Risk Score"
  - Level label: Low / Medium / High / Unacceptable
  - Numeric score: e.g., 22 of 100
  - Color coding: Low = green, Medium = yellow/orange, High = red, Unacceptable = dark red
- **User assigned to:** e.g., "Mihaela-Ionela Iaciu" with [Re-assign] link

#### Risk Score Levels

| Level | Example Score |
|---|---|
| Low | 4 of 100 |
| Medium | 22 of 100 |
| High | 30 of 100 |
| Unacceptable | 99 of 100 |

#### Assign Client Popup

**Title:** Assign client to

| Field | Type | Notes |
|---|---|---|
| Client Name | Read-only | e.g., Kristin Watson |
| Risely ID | Read-only | e.g., KW123456 |
| Select colleague | Dropdown | "Select your colleague" placeholder; search inside dropdown |
| Reason | Textarea | Text area |

**Buttons:** [Assign] [Cancel]

### 5.2 Personal Info Section

**Last Updated:** `13 Aug 2024 | 14:50 UTC by Vlad`
**[Edit] button** → puts section into edit mode

| Field | Value (example) |
|---|---|
| Name | Kristin Watson |
| Email | iva838@outlook.com |
| (sub) Email verified | Verified on 13 Aug 2024 | 14:50 UTC |
| Phone number | +35796792082 |
| (sub) Phone verified | Verified on 13 Aug 2024 | 14:50 UTC |
| DOB, gender | 29/12/1980, Female |
| Country of residence | USA |
| Residence Address | 400 E Park St, New York Mills, Minnesota (MN), 56567 |
| Account type | Individual |
| Signed up | 13 Aug 2024 | 14:50 UTC |
| Current status | Active (with timestamp + "Updated by Vlad" subtext) |

**When status = Blocked:** additional field shown:
- **Reason:** Text from reason field in popup where we blocked the user

**"See full history" link** → opens status history.

#### Personal Info Edit Mode

Editable fields (required marked with *):
- Name *
- Country of residence *
- Residence Address *
- Email (read-only, shown for reference)
- Phone (read-only, shown for reference)

Non-editable in the form: Email, Phone, DOB, gender, Account type, Signed up.

**Save changes popup:**

| Field | Notes |
|---|---|
| Changed fields listed | e.g., "You have changed: Name, Country, Address" |
| Client Name | Read-only display |
| Risely ID | Read-only display |
| Reason to change | Textarea (required) |

**Buttons:** [Save] [Cancel]

#### Block / Activate Account Buttons

Shown at bottom of Personal Info section:
- When account is Active: **[Block Account]** button
- When account is Blocked: **[Activate Account]** button

**Block App Access popup:**

| Field | Notes |
|---|---|
| Name | Read-only |
| Risely ID | Read-only |
| Reason | Textarea (required) |

Confirmation: "Please confirm your action."
**Buttons:** [Block] [Cancel]

**Activate App Access popup:**
Same structure with button labeled **[Make active]**.

#### Notes / Internal Links Field (in Personal Info)

Appears for certain statuses (Registration, Blocked, Close request):
- **Label:** "For notes and external links"
- **Textarea:** multi-line, supports link text (example: `link1 / link 2 / normal text area that expands itself`)

### 5.3 Available Features (Feature Toggles)

Section shows which features are ON/OFF for this client. Located in Personal Info card.

| Feature Group | Sub-feature |
|---|---|
| Fiat | Withdraw |
| Fiat | Deposit |
| Crypto | Withdraw |
| Crypto | Deposit |
| Swap | — |

**Toggle OFF popup — Turn %feature name% OFF:**

| Field | Notes |
|---|---|
| Name | Read-only |
| Risely ID | Read-only |
| Reason | Textarea (required) |

Confirmation: "Please confirm your action."
**Buttons:** [Turn OFF] [Cancel]

**Toggle ON popup** — same structure, button: [Turn ON]

**Feature blocked state** (when feature is disabled at platform level, not per-client):
- Message: "%Feature% is blocked"
- Sub-text: "Please contact support, and we'll help you resolve this issue."
- **[Support]** button

### 5.4 KYC (Sumsub) Section

| Field | Value (example) |
|---|---|
| Status | Approved / Pending / Submitted / Rejected |
| Updated | 13 Aug 2024, 14:50 UTC |
| Updated by | Valentine@email.c |
| Sumsub Client ID | 19483 (clickable link) |
| Docs from Sumsub | Doc1.pdf, Doc2 long name example like this.pdf (downloadable links) |

### 5.5 Rewards Section

| Field | Value (example) |
|---|---|
| Referral code | 1234 |
| Signed up invitees | 123 |
| Active invitees | 21 |
| Registration Reward | $21.00 |
| Transactions Reward | $2.42 |
| (sub) Spent | $2.42 |
| Invited by | AK484934 (clickable Risely ID link) |

*When client has no referral activity (e.g., Registration status):* all reward fields show `—`.

### 5.6 Wallets Balances Section

**Aggregated Total Balance:** e.g., `$4,434,930.43`

Each wallet card shows:
- Currency amount (e.g., `15.00 EUR`)
- USD equivalent (e.g., `≈ $20.00`)
- **[Freeze amount]** button (or **[Wallet blocked]** + **[Edit]** if already blocked)

Example wallets shown:
- 15.00 EUR ≈ $20.00
- 20.43 USD ≈ $20.00
- 20.12 CAD ≈ $20.00
- 1.00000008 ETH ≈ $20.00
- 1.00000008 USDT ≈ $20.00
- 134 434 343 121.00000008 %CUR% ≈ $20.00
- Plus generic %CUR% entries

**Actions on wallet cards (when account is in Close-request state):**
- [Block amount]
- [Close a wallet]

### 5.7 Wallets Details Table

**[CSV]** button

| Column | Notes |
|---|---|
| Currency | e.g., EUR, USD, CAD, ETH, USDT, BTC, BNB |
| IBAN\Wallet | Masked for Support role (`*2606`, `bc1q*pye6`), full for Compliance |
| Provider / Network | e.g., Narvi, BAAS2, BAAS3, Ethereum, Bitcoin, Binance |
| Active | Balance in native currency |
| Active, $ | USD equivalent |
| Blocked | Blocked balance in native currency |
| Blocked, $ | USD equivalent |
| TX's Under Review | Count |
| Last transaction | Datetime |

**Example rows:**

| Currency | IBAN\Wallet | Provider | Active | Active, $ | Blocked | Blocked, $ | TXs | Last TX |
|---|---|---|---|---|---|---|---|---|
| EUR | *2606 | Narvi | 14.00 EUR | $NN.NN | 0.00 EUR | $NN.NN | 1 | 13/08/24, 14:52 UTC |
| CAD | *3394 | BAAS2 | 1.00000008 %CUR% | $NN.NN | 0.00 EUR | $NN.NN | 1 | 13/08/24, 14:52 UTC |
| USD | *3394 | BAAS3 | 14.00 EUR | $NN.NN | 0.00 EUR | $NN.NN | 1 | 13/08/24, 14:52 UTC |
| ETH | bc1q*pye6 | Ethereum | 1.00000008 %CUR% | $NN.NN | 0.00 EUR | $NN.NN | 1 | 13/08/24, 14:52 UTC |
| USDT | bc1q*pye6 | Ethereum / TRC-20 | 1.00000008 %CUR% | $NN.NN | 0.00 EUR | $NN.NN | 4 | 13/08/24, 14:52 UTC |
| BTC | bc1q*pye6 | Bitcoin | 1.00000008 %CUR% | $NN.NN | 0.00 EUR | $NN.NN | 0 | — |
| BNB | bc1q*pye6 | Binance | 1.00000008 %CUR% | $NN.NN | 0.00 EUR | $NN.NN | 0 | — |

**Note:** Changes to wallets must also appear in the wallets table.

#### Wallets Details Table (Compliance / Blocking view — extended columns)

When viewed with Compliance role or in "Block amount" context, the table has additional columns:

| Column | Notes |
|---|---|
| Currency | — |
| IBAN\Wallet | Full address visible to Compliance |
| Provider / Network | — |
| Total Balance | — |
| Total Balance, $ | — |
| Active | — |
| Active, $ | — |
| Blocked | — |
| Blocked, $ | — |
| Blocked Transactions | Count |
| Last transaction | Datetime |

Example rows use full addresses: `FR0439r019430r293404392606`, `198234ru9fjq0243urf09283u9ejfv9r8ug348ug`

### 5.8 Transactions Table (within Client page)

Same structure as All Transactions table (see §9), but pre-filtered to this client.
**Default sort:** Created, newest first.
**Note:** Table has horizontal scroll.

Filters available:
- Search: by internal transaction ID, external transaction ID, Risely User ID
- Type (dropdown)
- Network / Provider (dropdown)
- Status (dropdown)
- Sort by: Status
- Created from (date)
- Created to (date)
- Tabs: All | Fiat | Crypto
- Unassigned count button (e.g., `Unassigned (3)`)

**[Filter]** and **[CSV]** buttons.

### 5.9 Referrals Table (within Client page)

| Column | Notes |
|---|---|
| Referred Risely ID | Link (e.g., LO123456, GN123456, QI123456, XV123456, OS123456) |
| Email | e.g., lo1vfdm@irir.com |
| Reward Type | Account Verified / Transactions |
| Reward Amount | e.g., $1.00, $0.02 |
| Internal Transaction ID | Link (e.g., `5f62ce1d53056dc2d3e5edcf8375c9b090595bb59aab5`) or `—` |
| Created | `13/08/24, 14:52 UTC` |

Filters: Search by Risely ID, Internal Transaction ID; Type dropdown; Sort by Created.
**[Filter]** and **[CSV]** buttons.
Default sort: Created, newest first.

### 5.10 Rewards per Month Table (within Client page)

| Column | Notes |
|---|---|
| Month | e.g., August 2024, July 2024, etc. |
| Signed up # | Count |
| Verified # | Count |
| Total Reward Earned | e.g., 24 USD |
| Account Verification Rewards | e.g., 12 USD |
| Redeemed Rewards | e.g., 12 USD |
| (sub) Transaction Rewards | e.g., 23 USD |
| Reward balance | e.g., 1 USD |

Months shown: August through December (12+ months of history).
**[CSV]** button.
Default sort: Created, newest first.

### 5.11 Links to Related Entities

- Invited By: links to referring client's page
- Referrals table: each Referred Risely ID links to that client's page
- Transactions table: each Internal Transaction ID links to transaction detail
- KYC Sumsub Client ID: links to Sumsub
- Docs from Sumsub: links / downloads PDF files

---

## 6. Client — Activity Sub-page

**Screen / view name:** Client / Activity
**Breadcrumb:** `Clients › KW123456, Kristin Watson › Activity`
**Purpose:** Full audit log of events, notes, and changes for this client.

### 6.1 Activity Header

Same header as client page: name, Risely ID, status badge, [Assign client to], [CSV].

### 6.2 Add Note Area

- **Label:** "For notes and external links"
- **Textarea:** multi-line, supports links (placeholder: `link1 / link 2 / normal text area that expands itself`)
- **[Save note]** button

### 6.3 Internal Docs Section

- **Label:** "Internal docs"
- **Upload area:** "Upload Documents" — pdf, jpg, screenshot, max 10 Mb
- **Uploaded files list:**
  - File name (link): e.g., "Doc 1"
  - File info: `200 KB — Uploaded Dec 17 2024, 19:39 UTC by vlad@email.com`

**Note:** Only Compliance role can see internal docs.

### 6.4 Activity Table

| Column | Notes |
|---|---|
| Event | Event description (e.g., "ETH Wallet blocked", "Transactions", "—") |
| Notes | Free text note. Can be multi-line: "This note was saved by someone…" |
| Created | `13/08/24, 14:52 UTC` |
| Made by | Email of admin who made the action (e.g., `lo1vfdm@irir.com`) |

**Example activity entries:**
- "ETH Wallet blocked — Reason: 123"
- "Transactions — $0.02"
- (blank events with timestamps)

Filters: Search by email; Type dropdown; Sort by Created.
**[Filter]** and **[CSV]** buttons.
Pagination: 10 per page, Total: 980.

---

## 7. Client — Page States by Account Status

The client detail page renders differently based on Account Status.

### 7.1 Status = Active

Full page shown with all sections enabled. Block Account button visible.

### 7.2 Status = Registration (KYC not done yet)

- Personal Info section visible, with Status = Registration.
- Note area visible.
- KYC (Sumsub) section shows `{Pending, Submitted}`.
- Rewards section: all fields show `—`.
- No wallet data (no wallets created yet).

### 7.3 Status = Blocked + Rejected KYC

- Personal Info shows status = Blocked.
- Reason field shows: "Text from reason field in popup where we blocked the user."
- KYC status = Rejected.
- [Activate Account] button shown instead of [Block Account].

### 7.4 Status = Close Request → Close

- Header shows status badge: "Close request".
- Available Features section visible.
- Wallets show [Block amount] and [Close a wallet] buttons.
- Notes area visible.
- Full KYC, Rewards, Wallets shown.

### 7.5 Status = Closed

- Account is fully closed.

---

## 8. Client — Processes & Flows

### 8.1 Freeze Amount in a Wallet

Triggered from wallet card [Freeze amount] button.

**Modal: Freeze Amount (step 1)**

| Field | Notes |
|---|---|
| Name | Read-only (e.g., Kristin Watson) |
| Risely ID | Read-only (e.g., KW123456) |
| Wallet dropdown | Select currency (e.g., ETH) |
| Available balance | e.g., 1.00000008 ETH ≈ $20.00 |
| Block wallet toggle | Checkbox: "Block wallet" (entire wallet) |
| Amount to freeze | Number input (e.g., 12.00000000 ETH) |
| Insufficient balance error | "There is not enough ETH on client's balance. Download a receipt pdf with." |
| Download report of balance | Link/button |
| Reason | Textarea (required) |

Confirmation: "Please confirm your action."
**Buttons:** [Freeze Amount] [Cancel]

**Compliance context note:** "Old transaction - request from regulator - block an amount... choose amount to freeze + show $... show to regulator where amount was sent... no blocking of amount... but blocking BTC wallet manually."

### 8.2 Block Entire ETH Wallet

**Modal: Block ETH Wallet**

| Field | Notes |
|---|---|
| Name | Read-only |
| Risely ID | Read-only |
| Wallet | Dropdown: ETH |
| Reason | Textarea (required) |

Confirmation: "Please confirm your action."
**Buttons:** [Block Entire ETH Wallet] [Cancel]

**Blocked state display:**
- Wallet card shows: "Blocked on 13 Aug 2024 | 14:50 UTC by Valentine. Reason: 123"
- [Unblock] button

### 8.3 Activate ETH Wallet

**Modal: Activate ETH Wallet**

| Field | Notes |
|---|---|
| Name | Read-only |
| Risely ID | Read-only |
| Wallet | Dropdown: ETH |
| Reason | Textarea (required) |

**Buttons:** [Activate ETH Wallet] [Cancel]

---

## 9. All Transactions — List Table

**Screen / view name:** Transactions
**Breadcrumb:** `Transactions`
**Purpose:** Global list of all transactions across all clients.

### 9.1 Filters / Search Bar

| Filter | Type | Options |
|---|---|---|
| Search | Text | By internal transaction ID, external transaction ID, Risely User ID |
| Type | Dropdown | — |
| Network / Provider | Dropdown | (typo in Figma: "Provdier") |
| Status | Dropdown | — |
| Sort by | Dropdown | Status (default shown) |
| Created from | Date picker | — |
| Created to | Date picker | — |
| Tabs | Toggle | All / Fiat / Crypto |

**Special button:** `Unassigned (3)` — shown only when there are Non_reference transactions. Clicking this filters the table to status = Non_reference.
If there are no Non_reference transactions, this button is hidden.

**[Filter]** and **[CSV]** buttons.

### 9.2 Table Columns

| Column | Type | Notes |
|---|---|---|
| Internal transaction ID | Link + copy icon | e.g., `cc00e****b7008` (masked for Support role) |
| Type | Text | Internal / Send / Receive / Swap |
| Currency | Text | e.g., EUR, ETH, USD |
| Amount | Number | e.g., 15.00, 5.00000002 |
| Amount, $ | Number | USD equivalent |
| Exchange | Text | Rate info for swaps: e.g., `N.NNNNNNNN %CUR% = N.NNNNNNNN %CUR%` / `Rate: 1.00 EUR = 1.01 USD As of Jul 26, 07:57 UTC` |
| Provider/Network | Text | e.g., Risely, Ethereum, BAAS Provider 2, B2C2 |
| Network Fee | Number | e.g., `0.00000008 ETH`, `$1.00` |
| Risely Fee | Number | e.g., `$1.00`, `0` |
| Supporting docs request | Badge/Text | Requested / Uploaded / — / Rewards used |
| From | Link | Wallet/IBAN or Risely ID link |
| To | Link | Wallet/IBAN or Risely ID link |
| Status | Badge | See statuses below |
| Manual | Boolean | True / False |
| Created | Datetime | `13/08/24, 14:52 UTC` |

### 9.3 Transaction Status Values

- **Processing**
- **In review** (from `13/08/24, 14:52 UTC`)
- **Confirmed** (from `13/08/24, 14:52 UTC`)
- **Approved**
- **Requested**
- **Rejected** (from `13/08/24, 14:52 UTC`)
- **Non_reference** (special — unassigned incoming transfers with no reference ID; shown with [Assign] button in the row)

### 9.4 Transaction Type Values

- **Internal** — Risely-to-Risely internal transfer
- **Send** — outgoing transfer to external
- **Receive** — incoming from external
- **Swap** — currency exchange

### 9.5 Supporting Docs Request Values

- `Requested` — docs have been requested
- `Uploaded` — docs have been provided
- `Rewards used` — reward credits applied
- `—` — no docs involved

### 9.6 From / To Cell Examples

**Fiat (SEPA):**
- From: `LT29NWBK60161331926819 RefID: LS184958`
- To: `GB29NWBK60161331926819`

**Crypto (ETH):**
- From: `0x42d5c2418858e0f06fb19d46c7724ea19cf7f4d9c5891c5be5a85540e4b4c1ec`
- To: `0xf4fe77758c0f12977fc99e0310c44af916b9b16d9cd07064a564a3c4e89aa3d6`

**Internal (Risely to Risely):**
- From: `{ts3}KW123456{/ts3}` (Risely ID link)
- To: `{ts3}OP123456{/ts3}` (Risely ID link)

**Non_reference:**
- To: `IE29AIBK93115212345678`
- From: unmatched
- Special: row shows [Assign] button

**Swap:**
- Currency column: `EUR / USD` (both currencies)
- Amount column: `15.00 / 16.00`

### 9.7 Pagination

10 per page. Total: e.g., 980. Pages: 1, 2, 3, ..., 8, 9, 10.

### 9.8 Unassigned (Non_reference) Flow

When a transaction has no reference ID (incoming transfer no one claimed):
1. User contacts Support
2. User provides proof of payment: IBAN, date, amount
3. Support goes to Admin and uses "Assign" to link the transaction to a client

**Assign popup:**

| Field | Notes |
|---|---|
| Amount | e.g., 1493.20 EUR |
| Name | Read-only |
| Risely ID | Read-only |
| Transaction Reference ID | Text input (required) |

**Buttons:** [Save] [Cancel]

### 9.9 Design Notes

- Role restrictions:
  - Support: must NOT see full IBAN/Wallet address in From/To columns
  - Compliance: full address visible
- `Manual = true` means made manually in wallets; `Manual = false` means made by API.
- Save filters for each table (persist filter state after user navigates away and returns).

---

## 10. Transaction Detail Page

**Screen / view name:** Transaction detail
**Breadcrumb:** `Transactions › 8592109b-69d5-11ef-bf11-42010acb7008`
**Title format:** Transaction type + currency (e.g., "Swap ETH to EUR", "Receive, 10 EUR")

### 10.1 Transaction Header

| Field | Notes |
|---|---|
| Status + date | e.g., "Confirmed 17/12/2024" or "Non_reference" |
| Action buttons | [Assign] (for Non_reference) / [Activity] / [CSV] |

### 10.2 Transaction Info Card

| Field | Value (example) |
|---|---|
| Internal transaction ID | 8592109b-69d5-11ef-bf11-42010acb7008 |
| External transaction ID (BaaS or Hash) | 71VA9S9RB6ACIWJY or `—` |
| Amount | 10.00 EUR, ≈$2,5343.33 |
| Type | Receive / Send / Swap / Internal |
| Provider | Narvi / Ethereum / B2C2 / Risely |
| Created | Dec 17 2024 19:39 UTC |
| Status | In review / Confirmed / Processing / Approved / Rejected / Non_reference |
| Status updated | Dec 17 2024 19:39 UTC |

### 10.3 Risk Scores Card

| Score | Label | Example |
|---|---|---|
| Client's Risk Score | "Client's Risk Score, Sumsub ID: 19483" | 4 of 100 (Low) |
| TX Risk Score (KYT) | "TX Risk Score (KYT), Sumsub ID: 19483" | 4 of 100 (Low) |

**When Non_reference (unassigned):** Risk scores cannot be shown. Message: "Risk Score can not be shown — This transaction should be assigned first."

### 10.4 Supporting Documents Section

- **Upload area:** "Upload Documents" — pdf, jpg, screenshot, max 10 Mb
- **[Request supporting docs]** button
- Uploaded docs shown with: date, "Requested documents", by (admin name)
- **Notes / internal links textarea:** "Input any useful info about this client"

### 10.5 From (Sender) Panel

| Field | Value (example — Fiat receive) |
|---|---|
| Name | Company name or individual name |
| Risely ID | `—` (external sender has no Risely ID) |
| Wallet Name | External |
| IBAN / Wallet | FR34343434300023810002660 |
| Reference ID | `—` |
| Network / BAAS | Narvi, SEPA |
| Amount | `—` |
| Currency | EUR |
| Sender SWIFT/BIC | BCLYUK123456323 |
| Bank | Barclays; Sort Code: 0001123002; Routing: 0001123002 |

### 10.6 To (Recipient) Panel

| Field | Value (example — Fiat receive) |
|---|---|
| Name | Kristin Watson |
| Risely ID | KW123456 (link) |
| Wallet Name | Risely EUR Wallet |
| IBAN / Wallet | LT943400023810002660 |
| Reference ID | KW123456 |
| Network / BAAS | Narvi, SEPA |
| Amount | 10 |
| Currency | EUR |
| SWIFT/BIC | `—` |
| Bank | `—` |
| Invite to join Risely | `—` / "Sent" / "Sent to [email]" |

### 10.7 Exchange Section (Swap transactions)

| Field | Value (example — Swap ETH to EUR) |
|---|---|
| Exchanged | `10.00000002 ETH = 46,414.21 EUR` |
| Rate | `1.00000000 ETH = 5,414.22 EUR` |
| Date | Jul 26, 07:57 UTC |

### 10.8 Fees Section

| Field | Value (example) |
|---|---|
| Network Fee | $19,00 / $0 |
| Risely Fee | $1,00 / $0 |
| Rewards user spent | $0,20 / $0 |
| Fee user paid total | $19,80 / $0 |
| Fee Risely earned | $0,80 / $0 |
| Network Fee Total | `—` |
| Fee Risely paid | `—` |
| Fee Client paid | `—` |

### 10.9 Transaction Status Actions

**For status = "In review":**
- **[Approve]** button → Approve Transaction popup
- **[Reject]** button → Reject Transaction popup

**Approve Transaction popup:**

| Field | Notes |
|---|---|
| Amount | e.g., 5.00000002 ETH |
| Name | Read-only |
| Risely ID | Read-only |
| Internal transaction ID | Read-only |
| Reason for Rejection | Textarea |

Confirmation: "Please confirm your action. Once approved, this action cannot be undone."
**Buttons:** [Approve] [Cancel]

**Reject Transaction popup:**

| Field | Notes |
|---|---|
| Amount | e.g., 5.00000002 ETH |
| Name | Read-only |
| Risely ID | Read-only |
| Internal transaction ID | Read-only |
| Reason for Rejection | Textarea (required) |

Confirmation: "Please confirm your action. Once rejected, the client will be notified, and this action cannot be undone."
**Buttons:** [Reject] [Cancel]

### 10.10 Transaction Statuses — Explanation

| # | Status | Who sets it | Notes |
|---|---|---|---|
| 1 | Pending | Client (request created) | — |
| 2a | Processing — Approved | Auto | — |
| 2b | Processing — Compliance review | Compliance team | Client sees "Processing" |
| 3.1 | Completed (Confirmed) | Auto after approval | — |
| 3.2 | Rejected | Compliance | Client notified; reason must be provided |
| 3.3 | Dispute | Compliance | Not shown to client in app |
| — | Non_reference | System | Incoming without reference ID |
| — | In review | KYT / Sumsub alert | — |

**Client ↔ Admin status mapping:**

| Client sees (in App) | Admin sees (in Admin) |
|---|---|
| In review | In review |
| In review | In review |
| In review | In review |
| Approved | Approved |
| Approved | Approved |
| Confirmed | Confirmed |
| Confirmed | Confirmed |
| Docs Requested | — |
| Rejected | Rejected |

**Notification SLA:** Client has 2 business days to reply to Compliance request. After 2 business days, reminder every 24h for 5 total business days (3 reminders). If still no reply → transaction rejected.

**Note on supporting docs request flow:**
- Support (not Compliance) communicates with client
- "Docs requested by Support by email — not in Admin. ONLY SUPPORT communicates with client."
- Compliance can: Request Document, Resubmit Docs, Reject Docs, Approve Docs.

### 10.11 Final States

If transaction is in a final state (Rejected or Approved/Confirmed):
- Page becomes read-only static snapshot.
- No more docs, no more notes — just a screenshot of the data at finalization.

### 10.12 Design Notes

- GAZ fee (gas fee for crypto) — behavior TBD.
- "Notes from compliance call on FREEZING":
  - Blocking is NOT used for money, only for accounts.
  - Freeze exact transaction if problem found.
  - If frozen → wait, then either reject or confirm.
  - SUMSUB alert → instant freeze → then Admin: Rejected or Approved.
- Reference for updated transaction status diagram is in the Figma file (drawio link).

---

## 11. Compliance — KYT

**Screen / view name:** KYT (Know Your Transaction — Sumsub-powered)
**Breadcrumb:** `Transactions › [transaction ID]`
**Purpose:** Shows Sumsub KYT alert data attached to a specific transaction.
**Note:** KYT is a sub-item under "Compliance" in the sidebar (expandable).

### 11.1 What KYT shows on Transaction Detail

- Client's Risk Score (from Sumsub)
- TX Risk Score (KYT, from Sumsub)
- Both shown as score / 100 with level label (Low/Medium/High/Unacceptable)

**KYT Statuses from Sumsub:**
- no alerts
- alert + notif from Sumsub
- manually in Sumsub AND buttons in Admin
- Processing → Compliance check

**Buttons (when KYT is active):**
- Reject Docs
- Resubmit Docs
- Request Document
- Approve Docs

**Note:** Blockchain analysis runs asynchronously — "Blockchain is thinking."

---

## 12. Compliance — KYC

**Screen / view name:** KYC
**Note:** KYC is a sub-item under "Compliance" in the sidebar.
**Purpose:** Shows the KYC status from Sumsub for a client.

The KYC section appears on the Client Detail Page (§5.4). There is no separate KYC list screen shown in the Figma data — KYC status is surfaced per-client.

**Design notes from Figma for KYC screen (planning notes):**
- Show status from Sumsub
- Process of review
- Assign client to admin user
- Btn to test connection to Sumsub
- View doc
- Click client → link to client page

**Expiring Docs** (mentioned as planned feature):
- Column draft: current columns + verification status from Sumsub, ID, Updated, last transaction (link), request docs, expired docs/requested docs/docs are ok statuses, client "group" + tooltip, last note preview, total balance $, #wallets, #transactions, pending status, risk score.

---

## 13. Rewards — Admin Table

**Screen / view name:** Rewards
**Breadcrumb:** `Rewards`
**Purpose:** View all clients' referral and rewards activity.

### 13.1 Tab: Rewards Active

**Filters:**
| Filter | Notes |
|---|---|
| Search | By Risely ID, email |
| Status | Dropdown |
| Updated from | Date |
| Updated to | Date |
| Sort by | Status |

**[Filter]** and **[CSV]** buttons.

### 13.2 Table Columns

| Column | Notes |
|---|---|
| Risely ID (inviter) | Link (e.g., KW123456) |
| Name | e.g., Kristin Watson |
| Referral code | e.g., 1234, 2344, 9584, 4800 |
| Signed up # | Count (e.g., 12, 43 434) |
| Verified # | Count (e.g., 10, 102) |
| Total Reward Earned | e.g., 24 USD |
| Account Verification Rewards | e.g., 12 USD |
| Transaction Rewards | e.g., 12 USD |
| Redeemed Rewards | e.g., 23 USD |
| Reward balance | e.g., 1 USD |
| Updated | `31 Jul 2024 09:16 UTC` |

**Pagination:** 10 per page, Total: 980.

### 13.3 In-App Rewards View (for reference)

The admin panel shows what the client sees in the app:
- **Title:** "Referral and Rewards" / "Invite and get $N"
- **Copy:** "Invite friends, earn rewards, and enjoy exclusive benefits!"
- **Risely ID shown:** `AP4568769458`
- **After installing:** "your friend should enter your Risely ID as the referral code during signup"
- **[Share invite]** button

**Your Rewards section (in app):**
- $1.00 — Earned from invites
- $12.11 — Redeemed Rewards
- 10 — Active invitees
- 12 — Signed up

**Reward History (in app):**
- Monthly totals shown: August 2024 (43,341.00 $), July 2024 (6,431.00 $), June (341.00 $), May (41.00 $), April (5.00 $)

**States:**
- If rewards are NOT active: program section not shown
- If rewards ARE active: full referral section shown

---

## 14. Marketing — Referral Programs

**Screen / view name:** Referral Programs (under Marketing)
**Breadcrumb:** `Marketing` (expandable → Content, Banner)
**Purpose:** Create and manage referral reward programs.

### 14.1 Referral Programs List

**Table columns:**

| Column | Notes |
|---|---|
| ID # | e.g., 1–10 |
| Name | e.g., Program, Program 2, Program nc, Program 3 |
| Start Date | e.g., 26/09/2024 |
| End Date | e.g., 26/12/2024 |
| Actions | [View] [Edit] |

**Filters:**
- Date From / Date To
- All Statuses (dropdown)

**[Add Program]** button.

Pagination: shows count at bottom.

### 14.2 Create New Program Form

**Title:** "Create a new program"

| Field | Type | Required | Notes |
|---|---|---|---|
| Program Name | Text | Yes (*) | — |
| Date Range (From) | Date picker | Yes (*) | — |
| Date Range (To) | Date picker | Yes (*) | — |
| Type | Tabs | — | Referral Programs / News & Documents |
| Reward Amount | Number | Yes (marked with styled *) | e.g., 0.00 |
| Currency | — | — | EUR (shown) |
| Referrer requirement 1 | Checkbox | — | "Referrer should register via unique referral link" |
| Referrer requirement 2 | Checkbox | — | "Referrer should have Level 1 KYC tier" |
| Payout Period | Dropdown | Yes (*) | Monthly |
| Payout Day | Number | Yes (*) | e.g., 3 |

**Program Conditions text (auto-generated):**
"To be eligible for your reward, it is necessary for your friends to successfully complete the following steps prior to the conclusion of the program on [End Date]: - Enroll using the designated link provided by you, - Complete the verification process to confirm their identity."

**Buttons:** [Create] [Cancel]

**Also references:** Payment Method Settings (link/section)

### 14.3 Edit Program Form (Program Details)

Same as create but pre-filled. Uses [Save] [Cancel].

| Field | Example value |
|---|---|
| Program Name * | Referral program [Name] |
| Date Range | 26/09/2024 to 26/12/2024 |
| Reward Amount * | 50.00 EUR |
| Referrer requirement | "Referred-user registers via unique referral link" |
| Referrer requirement 2 | "Referred-user has KYC level1" |
| Payout Period | Monthly |
| Payout Day | 3 |

**Status badge:** Active

---

## 15. Settings — Fees

**Screen / view name:** Fees
**Breadcrumb:** `Fees`
**Purpose:** Configure fee structures for Fiat Send, Crypto Send, and Swap transactions per currency/provider.

### 15.1 Fee Table — Fiat, Send

**Tabs:** Fiat, Send | Crypto, Send | Swap

**Filters:** Currency (dropdown), Sort by: Updated.
**[Filter]** and **[CSV]** buttons.

#### Table Columns

| Column | Notes |
|---|---|
| Curr. | Currency (e.g., EUR) |
| Provider / Network | e.g., Narvi |
| External Fee, % | Percentage (e.g., 12) |
| Take Fee From (Min) | Minimum amount from which % fee applies |
| Take Fee Until (Max) | Maximum amount until which % fee applies (Unlimited) |
| External Fee, fixed | Fixed fee amount |
| External Limit, Min Amount | Minimum transaction limit |
| External Limit, Max Amount | Maximum transaction limit |
| Risely Fee, % | Risely platform fee percentage |
| Take Fee From (Min) | — |
| Take Fee Until (Max) | — |
| Risely Fee, fixed | Fixed Risely fee |
| Risely Limit, Min Amount | — |
| Risely Limit, Max Amount | — |
| Limit for Doc Verification | Threshold above which document verification is required |
| Updated | Datetime |

**Example row (EUR, Narvi):**
- External Fee %: 12
- Take Fee From: 1.00000008 %CUR%
- Take Fee Until: Unlimited
- External Fee, fixed: 1.00000008 %CUR%
- External Limit Min: 1.00000008 %CUR%
- External Limit Max: 1.00000008 %CUR%
- Risely Fee %: 12
- Risely Take Fee From: 1.00000008 %CUR%
- Risely Take Fee Until: Unlimited
- etc.
- Updated: 13/08/24, 14:52 UTC

### 15.2 Fee Table — Crypto, Send

Same column structure but "Curr." becomes "Token":

| Column | Notes |
|---|---|
| Token | e.g., EUR, USDT, USDC, BTC, BNB |
| Provider / Network | e.g., Narvi, Bitcoin, Binance |
| External Fee, % | — |
| % works From | Replaces "Take Fee From" |
| % works To | Replaces "Take Fee Until" |
| External Fee, fixed | — |
| External Limit, Min Amount | — |
| External Limit, Max Amount | — |
| Risely Fee, % | — |
| % works From | — |
| % works To | — |
| Risely Fee, fixed | — |
| Risely Limit, Min Amount | — |
| Risely Limit, Max Amount | — |
| Limit for Doc Verification | — |
| Updated | Datetime |

**Tokens shown:** EUR, USDT, USDC, BTC, BNB (with their networks: Narvi, Bitcoin, Binance).

### 15.3 Fee Table — Swap

| Column | Notes |
|---|---|
| From | Source currency (e.g., EUR, ETH, USDT, BTC, BNB) |
| To | Target currency |
| Platform Fee, % | e.g., 2 |
| Min, $ | e.g., 12.00 |
| Max, $ | e.g., 12.00 |
| Updated | Datetime |

**Example pairs shown:**
EUR→USD, EUR→ETH, EUR→USDT, EUR→BTC, EUR→BNB, ETH→EUR, ETH→USDT, ETH→BTC, ETH→BNB, USDT→EUR, USDT→ETH, USDT→BTC, USDT→BNB, BTC→EUR, BNB→EUR, AND SO ON.

### 15.4 Daily Transactions Limit Section

| Type | Client Type | Limit | Currency |
|---|---|---|---|
| Fiat | Individual | 5,000 | USD |
| Fiat | Business | 5,000 | USD |
| Crypto | Individual | 5,000 | USD |
| Crypto | Business | 5,000 | USD |

### 15.5 Swap Fees (Single-fee Quick View)

| Field | Example |
|---|---|
| From | EUR |
| To | ETH |
| Min | 12 |
| Max | 12 |

- **Last updated:** 13/08/24, 14:52 UTC
- **Updated by:** Vlad (admin)
- **[Save]** [Cancel] buttons

### 15.6 Individual Fee Edit Panels

For each currency/network combination, an edit panel is available:

**Example: Crypto: ETH, Ethereum**

**External Send, B2C:**
- Use % Fee toggle
- Percentage: "% of sending amount" — input field (e.g., 12)
- Take Fee From (Min): input
- Take Fee Until (Max): input
- Use Fixed Fee toggle
- Fixed External fee: input
- Limits to Send (Withdraw):
  - Min: input
  - Max: input

**Internal Send, Risely:**
- Same structure (% fee and fixed fee)
- Limits to Send (Withdraw): Min / Max inputs

**Limit for Doc Verification:** Input field

- **Last updated:** 13/08/24, 14:52 UTC
- **Updated by:** Vlad (admin)
- **[Save]** [Cancel]

Same panel exists for **Fiat: EUR, Narvi**.

---

## 16. Settings — Users

**Screen / view name:** Users
**Breadcrumb:** `Users`
**Purpose:** Manage admin staff accounts.

### 16.1 Users List

**[Add User]** button.

**Filters:**
- Search: by name, email, user ID
- Status: dropdown
- Role: dropdown
- Sort by: Last Login

**[Filter]** and **[CSV]** buttons.

### 16.2 Users Table Columns

| Column | Notes |
|---|---|
| First Name | e.g., Oleksii |
| Last Name | e.g., Borets |
| Email | e.g., emailexample@mail.com |
| User ID | Masked: e.g., cc00e****b7008 |
| Role | e.g., Devs, Super Admin, Finance, Compliance, Support |
| IP | e.g., 192.168.XXX. |
| Status | Active / Invited / Blocked |
| Last Login | `31 Jul 2024 09:16 UTC` or `—` |

**Example user statuses:** Active, Invited, Blocked.
**Example roles:** Devs, Super Admin, Finance, Compliance, Support.

**Click row** → opens Add/Edit User form.

### 16.3 Add or Edit User Form

**[Delete user]** button (on edit)

| Field | Type | Notes |
|---|---|---|
| First Name | Text | Required |
| Last Name | Text | Required |
| Email | Text | Required |
| Role | Dropdown | e.g., Devteam |
| Status | Dropdown | Active (default) |
| Reason to edit user | Textarea | Required for edits |

- Status: Active
- Last updated: 13/08/24, 14:52 UTC
- Updated by: Vlad (admin)
- User ID: cc00eb7008

**[Save]** [Cancel]

### 16.4 Delete User Confirmation Modal

- **Title:** "Are you sure you want to delete this user?"
- **Textarea:** "Reason to remove user" / "Write a reason"
- **Confirmation:** "Please confirm your action, this action cannot be undone."
- **Buttons:** [Delete] [Cancel]

---

## 17. Settings — Roles

**Screen / view name:** Roles
**Breadcrumb:** `Roles`
**Purpose:** Define role-based access control for admin users.

### 17.1 Roles List

**[New Role]** button.

### 17.2 Roles Table Columns

| Column | Notes |
|---|---|
| Role Name | e.g., Admin, Devs, Compliance, Support, Super Admin, Finance |
| Role ID | Link (masked: cc00e****b7008) |
| Signed up # | Count of users |
| Role ID (duplicate?) | Count column |
| Status | ENABLED |
| Updated | `31 Jul 2024 09:16 UTC` |

**Example roles:**
- Admin
- Devs
- Compliance
- Support
- Super Admin
- Finance

### 17.3 Add or Update Role Form

**Screen:** Add or Update Role
**Title:** Role
- Last Updated on 13 Aug 2024 | 14:50 UTC by user
- **[View users under this role]** link
- **[Cancel]** [Save]

| Field | Notes |
|---|---|
| Role Name | Text input (e.g., "Dev team") |

### 17.4 Permissions Matrix

**Columns:** Permission | View | Edit | CSV

**Sections and rows:**

**Dashboard:**
- Clients
- Transactions
- Fees
- Liquidity Management

**Clients:**
- Table
- Page:
  - Personal Info
  - Client's Risk Score
  - Transactions
  - Wallets Balances
  - Wallets Details
  - KYC (Sumsub)
  - Rewards
  - Rewards per month
- Activity:
  - Internal docs (Compliance's)

**Transactions:**
- Table
- Page:
  - From & To & Rewards
  - Buttons to change status
  - Risk scores
  - Supporting documents (Client's)
  - Internal notes
- Activity:
  - Internal docs (Compliance's)

**Rewards:**
- Table
- Page

**Liquidity Management**

**Fee:**
- Table
- Page

**Roles:**
- Table
- Page

**Users:**
- Table
- Page

**Logs:**
- Table
- Page

### 17.5 Sensitive Info Permissions

**Sub-section: Sensitive info**

| Permission | Options |
|---|---|
| IBAN/Wallet details | View Full / View limited (*0000 or 0000*0000) / Hidden |
| Show Freeze Amount button | Toggle |
| Wallet Amounts | Toggle |
| Assign NON_REF transactions | Toggle |
| Transaction ID | Toggle |
| Residence Address | Toggle |
| Phone | Toggle |
| Available features, allow usage (toggle on/off) | Toggle |
| KYC / Sumsub — View fetched info (documents, tags and reasons) | Toggle |
| Internal docs (for compliance) | Toggle |
| Under client or under transaction | Toggle |

**List of sensitive data (from design notes):**

Client fields:
- IBAN/Wallet (personal, from/to) — full or partial
- Residence Address (on/off)
- Phone (on/off)
- KYC / Sumsub (docs + tags and reasons text)
- Wallet Freeze amount button
- Amounts on wallets
- Available features toggles

Transaction fields:
- Assign (when refID = empty) — button
- Transaction ID
- Transaction Activity — Internal docs

---

## 18. Dashboard / Liquidity Management

**Screen / view name:** Liquidity Management
**Purpose:** Full view of platform liquidity across all BaaS providers and crypto networks.

### 18.1 Header

- **Title:** Liquidity Management
- **[CSV]** button
- Access restricted (available only to ~2 people per design note)

### 18.2 Provider/Network Cards

Each provider (Narvi, Ethereum, Tron, Bitcoin, Binance, B2C2) has its own card.

**Card structure for Fiat providers (e.g., Narvi):**
- Currency/Token count: 4
- Wallet / Account Number: `LT29NWBK60161331926819`
- Pending Tx's count
- Currency Balance, $ (total in USD)
- Currency Balance (by token):

| Token | Available | Pending | Actual |
|---|---|---|---|
| EUR | 44,123,323,231,231,000.00 | 123,323,231,231,000.00 | = 122,000,000,000.00 |
| CAD | 1,323,231,231,000.00 | 123,323,231,231,000.00 | = –122,000,000,000.00 |
| USD | 12,23,323,231,231,000.00 | 123,323,231,231,000.00 | = 122,000,000,000.00 |
| GBP | 123,323,231,231,000.00 | 123,323,231,231,000.00 | = 0.00 |
| Totals | 200,000.00 | 200,000.00 | = 0.00 |

**Pending Tx count badges:** (e.g., 100, 5, 1, 4343, 4445)

**Card structure for Crypto providers (e.g., Ethereum):**
- Currency/Token count: 4
- Wallet / Account Number: `0x42d5c2418858e0f06fb19d46c7724ea19cf7f4d9c5891c5be5a85540e4b4c1ec`
- GAS: ETH
- GAS Wallet: `0x42d5c2418858e0f06fb19d46c7724ea19cf7f4d9c5891c5be5a85540e4b4c1ec`
- GAS Token Amount: 1,000.00000000 ETH
- GAS Token Value, $: $1,000,000,000.00
- Pending Tx's count
- Currency Balance, $ (total in USD)
- Currency Balance (by token):

| Token | Available | Pending | Actual |
|---|---|---|---|
| ETH | 0.523,323,231,231,000 | 0.123,323,231,231,000 | = 122,000,000,000.00 |
| USDT | 1,323,231,231,000.00 | 123,323,231,231,000.00 | = –122,000,000,000.00 |
| Totals | 123,323,231,231,000.00 | ? | = 0.00 |

Providers shown: Narvi, Ethereum, Tron, Bitcoin, Binance (and generic CUR placeholder)

### 18.3 Summary Row

| Metric | Value |
|---|---|
| Available Total SUM, $ | 400,000,000 |
| Delta, $ | $ 50,000,000 |
| Provider/Network | Listed |
| Available Total SUM, $ | $ 400,000,000 |
| Total SUM (Actual), $ | $ 450,000,000 |
| Total Pending Tx's value, $ | $ 50,000,000 |
| Total pending Tx's | 312 |

### 18.4 Liquidity Providers Table (B2C2 section)

**[CSV]** button

**B2C2 card:**
- Currency/Token count: 6
- Total, $: $1,323,231,231,000.00
- Swap Daily Liabilities: $2,323,231,231,000.00
- DELTA: = –$1,323,231,231,000.00

**Balance table (B2C2):**

| Token | Balance |
|---|---|
| USDT | 1,323,231,231,000.00 |
| EUR | 1,323,231,231,000.00 |
| CUR | 1,323,231,231,000.00 |
| CUR | 1,323,231,231,000.00 |
| CUR | 1,323,231,231,000.00 |

---

## 19. Activity & Logs (Sidebar)

### 19.1 Activity (Expandable Section)

**Sub-item:** Logs

Activity section is expandable in the sidebar with sub-item "Logs".

### 19.2 Logs Screen

**Purpose:** System-level audit log.
**Note:** Detailed screen data not fully captured in Figma (listed as TBD). The screen follows the general table pattern with:
- Columns: TBD
- Search, filter, sort, CSV per global rules

---

## 20. Open Questions & Design Notes

### 20.1 Client Page

1. **"Remove/close my account" request flow:**
   - Close btn → BE swaps all wallets to FIAT → user can withdraw
   - Client status changes: Close request → Close (after 7d auto-email countdown)
   - Counter in system, then client loses access; status: Closed
   - Multi-step process: request under review → support/account receives → communication + managing

2. **Rejected account:** Error text shown in App when status = Rejected — full rejection flow to be designed.

3. **Change phone / email by user:** Flow for both user and support team to be defined.

### 20.2 Transactions Page

1. **GAZ fee (gas fee):** Behavior not fully defined.

2. **"Notes from compliance call on FREEZING":**
   - Blocking is NOT used for money, only for accounts.
   - Freeze exact transaction if it has a problem.
   - If frozen: stays and waits → then reject or confirm.
   - SUMSUB alert: instantly freeze → then (in Admin) Rejected or Approved.

3. **Status diagram:** Updated diagram exists (linked in Figma via drawio URL).

4. **Who sends notifications:** Support team (not Compliance).

5. **What happens to Unassigned (Non_reference) transactions and funds if not assigned?** — Open question.

### 20.3 Rewards

1. **Rewards per month table:** May need logic re-discussion.

### 20.4 Marketing / Communications

- **Communication** is mentioned as a sidebar section (between client and staff/admin) but specific screens not yet designed in this Figma file.
- **Banner** section: "Banner linking in-app article, external link" — specifics TBD.
- **Content** section: TBD.

### 20.5 General

- Responsiveness: screens were made responsive but moved to a Drafts file to keep this file fast. Ask designer for breakpoint specs when starting work on a page.
- Font differences between sections are acknowledged and accepted ("Font is different: that's ok").
- This Figma file references Velmie admin demo: `https://demo.velmie.com/auth/old/sign-in` (Login: admin@velmie.com / Password: Demoadmin1!) as a reference for what currently exists.
- The design uses the Risely Design System file (DS-Risely): `https://www.figma.com/design/eGkFs1c5GmkUfEfh2vz5a0/DS-Risely`
- **Velmie admin panels referenced for future mapping:** Clients, Transactions, System Settings, Settings, Liquidity sections.
- **Preferred transaction table:** Single table for all transactions with horizontal scroll. If not feasible, separate Fiat/Crypto with tabs combining manual/requests on 1 page.
