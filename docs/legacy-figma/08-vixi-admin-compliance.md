# Vixi Admin + Compliance Panel

**Source:** Figma "Vixi wallet + presale CRM [shared]", Admin + Compliance page
**File key:** YHKGP7o2yXw4WnVIZFGOgl, node 1:30
**Platform:** Desktop web
**Note:** This documents the Vixi-specific admin panel. It is a different product from the Risely/Velmie admin panel documented in `03-admin-app.md`. Do not conflate the two.

---

## Table of Contents

1. [Global Layout & Navigation](#1-global-layout--navigation)
2. [Transactions List](#2-transactions-list)
3. [Transaction Detail](#3-transaction-detail)
4. [Confirm Approve / Confirm Reject Modals](#4-confirm-approve--confirm-reject-modals)
5. [Confirm Ignore Rule Modal](#5-confirm-ignore-rule-modal)
6. [Clients: Individual List](#6-clients-individual-list)
7. [Client Detail: Individual](#7-client-detail-individual)
8. [Clients: Orgs / BaVs List](#8-clients-orgs--bavs-list)
9. [Org / BaV Detail](#9-org--bav-detail)
10. [Members (User–Org) List](#10-members-user-org-list)
11. [Member Detail](#11-member-detail)
12. [Wallets List](#12-wallets-list)
13. [Wallet Detail](#13-wallet-detail)
14. [Referrals](#14-referrals)
15. [Rewards](#15-rewards)
16. [Invite Codes (devnet)](#16-invite-codes-devnet)
17. [Invites & Referrals (testnet / mainnet)](#17-invites--referrals-testnetmainnet)
18. [Fees](#18-fees)
19. [Admin Users](#19-admin-users)
20. [System Logs](#20-system-logs)
21. [Validators List](#21-validators-list)
22. [Validator Detail](#22-validator-detail)
23. [Validator Versions](#23-validator-versions)
24. [Countries](#24-countries)
25. [Rules](#25-rules)
26. [Compliance Section (canvas-level diagrams)](#26-compliance-section-canvas-level-diagrams)
27. [Blocking Flows](#27-blocking-flows)
28. [Source of Funds (SoF) Flow](#28-source-of-funds-sof-flow)
29. [TIN (Tax Identification Number) Flow](#29-tin-tax-identification-number-flow)

---

## Design System Reference

| Token | Value | Use |
|---|---|---|
| Admin/Action | `#636CF3` | All clickable links, action text |
| Active nav bg | `#0166D5` | Currently selected sidebar item |
| Button gradient | `linear-gradient(90deg, #0166D5 0%, #0098FF 100%)` | Primary action buttons |
| Admin action gradient | `linear-gradient(90deg, #6146FF 0%, #647AEF 100%)` | Approve / Admin-specific actions |
| Background | `#F2F3FD` (sidebar), `#FFFFFF` (content) | Layout regions |
| Risk Low | `#00992B` | Low risk (0–20) |
| Risk Medium / Pending | `#D98A00` | Medium risk, pending states |
| Risk High / Rejected | `#FF6651` | High / Unacceptable risk, rejected |
| Risk Confirmed / success | green-ish `#00992B` | Confirmed/approved status |
| Font | Onest — Regular 400, Medium 500, SemiBold 600, Bold 700 | All UI text |

---

## 1. Global Layout & Navigation

**Node ID:** `#7:9934` (Admin / Trx table instance), sidebar component `Menu side admin`
**Purpose:** Persistent shell wrapping every admin screen. Left sidebar for navigation; right area for content. Top header shows logged-in admin user.

### Layout

Two-column shell:
- **Left sidebar** — fixed width, dark background (`#F2F3FD`), Vixi logo at top, sectioned menu list, scrollable
- **Right content** — fills remaining width, white background, top header bar, page content below

### Top Header

| Element | Value |
|---|---|
| Admin email | `alexandra.shelekova@vixichain.org` |
| Admin display name | `Sa Sha` |
| Icons | Notification bell, avatar |

### Sidebar Navigation Sections

#### General
- Dashboard *(active = highlighted `#0166D5`)*
- Transactions
- Clients: Individual
- Clients: Orgs, BaVs
- Members
- Wallets
- Referrals
- Rewards

#### Compliance
- Invite Codes (devnet)
- Invites & Referrals (testnet/mainnet)
- Fees
- Rules *(or Countries)*
- SoF / Documents

#### Setup
- Validators
- Countries
- Fees
- Admin Users

#### Soon
- *(2 placeholder items — not yet implemented)*

### Design Notes
- Figma note at canvas top: "Here we have just a preview of pages. [All admin details - in drafts]" — links to a separate more detailed Figma draft file.
- Sidebar menu items labelled "Dashbroard" (sic) in Figma — these are template placeholders; actual label text lives in a separate text layer per item.

---

## 2. Transactions List

**Node ID:** `#I7:9934;6:144334` (inner frame "Platform=Admin")
**Purpose:** Master list of all transactions on the Vixi network, with filtering, search, CSV export. Default view. Shows pending count.
**Route (if visible):** `/admin/transactions` (implied)

### Page Header

| Element | Value |
|---|---|
| Title | `Transactions. Pending: 2` |
| Subtitle | `Total: 3, total $15.04` |

### Actions / Buttons

| Button | Style | Action |
|---|---|---|
| Search input | Placeholder: `Search by internal tx ID, tx hash, client/org/bank name and ID` | Free text search |
| Filters | Secondary button | Opens filter panel |
| Export CSV | Secondary button | Downloads CSV export |

### Table Columns (header row)

| Column | Features |
|---|---|
| Tx hash, ID | Filterable |
| Network | Filterable |
| Sender | — |
| Receiver | — |
| Validator | — |
| SoF | Filterable |
| Tx Risk | Filterable |
| Created | Sortable + Filterable |
| Updated | Sortable + Filterable |
| Confirmed | Sortable + Filterable |
| Status | Filterable |
| Substatus | Filterable (width 120px) |
| Assets | Filterable (width 88px) |
| Amount | Sortable + Filterable (right-aligned, width 230px) |

### Table Row Example (data cells)

| Cell | Example Value |
|---|---|
| Tx hash | `cc00*b008` + copy icon |
| ID | `ID: 123` + copy icon |
| Tx type | `%tx type%` (placeholder, in muted/secondary color) |
| Network | `Vixichain → Ethereum` |
| Sender wallet | `cc00*b008` + copy icon |
| Sender risk | `Low` (color-coded) |
| Sender name | `Anna Fullname or "–"` (Admin/Action color = clickable link) |
| Sender Sumsub | `Sumsub: 123244` |
| Receiver wallet | `cc00*b008` + copy icon |
| Receiver risk | `Low` |
| Receiver name | `Anna Fullname or "–"` (clickable) |
| Receiver Sumsub | `Sumsub: 123244` |
| Validator | `Waterfall Illands bank, Inc` (clickable, wraps) |
| SoF | `Approved` |
| Tx risk | `Low` |
| Created | `2024-09-01` / `19:50, UTC` |
| Updated | `2024-09-01` / `19:50, UTC` |
| Confirmed | `2024-09-01` / `19:50, UTC` |
| Status | `Confirmed` |
| Substatus | `Pending SoF` (example) |
| Assets | `VIXC` / `nUSD` (stacked) |
| Amount | `5.12345678 nUSD` + `5.00005678 nUSD` / `$ 5.21` + `$ 5.21` + ` →` arrow |

### States
- Pagination visible at bottom
- Highlighted / Pending rows possible

---

## 3. Transaction Detail

**Node ID:** `#6:144221` (Component "Admin / Trx detail")
**Purpose:** Full detail view of a single transaction. Two-column layout with left metadata panel and right sidebar for activity/notes/documents.

### Page Header

| Element | Value |
|---|---|
| Breadcrumb/title | `Transactions / %type% $%amount% %status%, %risk% Risk` |
| Export CSV | Secondary button |
| Ask support to contact client | Secondary button |
| Approve Tx | Primary gradient button (green/approve) |
| Reject Tx | Danger button (red/reject) |

### Layout — Left Panel (main content)

#### Transaction Info (top data fields)

Unnamed group of data fields covering the core transaction:

| Field Name | Notes |
|---|---|
| (tx hash) | Copy icon |
| (internal ID) | Copy icon |
| (tx type / network) | Multi-value: type + copy + secondary |
| (status / substatus) | Multi-value row |
| (created / updated / confirmed timestamps) | |
| (asset + amount) | |

#### Sender Section

Sub-section header: **Sender**

| Field Name | Notes |
|---|---|
| (wallet address) | Copy icon |
| (wallet ID) | Copy icon |
| (wallet address 2) | Copy icon |
| (KYC status) | |
| (country) | |
| (risk score) | |
| (Sumsub ID) | Copy icon |
| (name / display name) | Copy icon |
| (email) | |
| (phone) | |
| (org membership) | Multi-value |
| (DID) | Copy icon |

#### Receiver Section

Sub-section header: **Receiver**

Same fields as Sender section (wallet address, ID, KYC status, country, name, email, phone, risk score, Sumsub ID, DID).

#### Fees Section

Data fields for fee breakdown per transaction.

#### Validation Section

Data fields showing validator name, rule version, rules triggered.

#### Activity Timeline

Chronological log of status changes and admin actions on this transaction.

#### Internal Notes

Free-text note panel for compliance team use; not visible to client.

#### Review Documents (SoF)

Document list with file names, statuses (pending / approved / rejected), and action buttons.

### Actions / Buttons (in detail view)

| Button | Description |
|---|---|
| Approve Tx | Triggers Confirm Approve modal |
| Reject Tx | Triggers Confirm Reject modal |
| Ignore Rule | Triggers Confirm Ignore Rule modal |
| Export CSV | Downloads transaction data |
| Ask support to contact client | Sends a support task |
| Compl.requested — change Tx Risk | Opens dropdown to change risk score + reason text |

### States

| State | Description |
|---|---|
| Pending SoF | Substatus shown; awaiting document upload from client |
| Pending review | Compliance is reviewing |
| Approved | Green status |
| Rejected | Red status |
| Failed | Error state |

### Design Notes

- Figma note: "Admin / Trx detail" component is referenced in the TIN section — shows where TIN is visible to admins (blurred content highlighting).
- "Compl.requested - open dropdown to change + reason text" — compliance officer can override the automated risk score.
- "Admin / Client detail" — link from transaction to related client detail page.

---

## 4. Confirm Approve / Confirm Reject Modals

**Purpose:** Confirmation dialogs before final approval or rejection of a transaction.

### Confirm Approve Modal

| Element | Value |
|---|---|
| Title | `Approve Tx` (or similar) |
| Body | Summary of the tx being approved |
| Primary button | `Approve` |
| Cancel | `Cancel` / close |

### Confirm Reject Modal

| Element | Value |
|---|---|
| Title | `Reject Tx` |
| Reason field | Text input for rejection reason |
| Primary button | `Reject` |
| Cancel | `Cancel` |

---

## 5. Confirm Ignore Rule Modal

**Purpose:** When compliance wants to override/ignore a triggered compliance rule.

| Element | Value |
|---|---|
| Title | Confirm ignoring the rule |
| Reason input | Placeholder: `Reason` |
| Confirm | `Approve` / Confirm button |
| Cancel | Close/cancel |

---

## 6. Clients: Individual List

**Node ID:** `#7:10481`
**Purpose:** Lists all individual (non-business) wallet clients. Searchable, filterable table.

### Page Header

| Element | Value |
|---|---|
| Title | `Clients: Individual` |
| Tabs | `Clients` (active) / `Members` |

### Actions / Buttons

| Button | Placeholder/value |
|---|---|
| Search | `Search by client/user/org/bank name and ID, email, phone` |
| Filters | Opens filter panel |

### Table Columns

The individual clients table includes:

| Column | Notes |
|---|---|
| ID | Internal client ID |
| Name / wallet address | Clickable link → Client detail |
| KYC status | — |
| Risk score | Color-coded |
| Country | — |
| Created | Timestamp |
| Updated | Timestamp |
| Status | Active / Blocked / etc. |

### States

- Empty state when no clients match filter
- Pagination at bottom

---

## 7. Client Detail: Individual

**Node ID:** Referenced in Compliance section as `Admin / Client detail`
**Purpose:** Full profile for one individual client. Multi-section layout.

### Page Header

| Element | Value |
|---|---|
| Breadcrumb | `Clients / [Client Name]` |

### Sections

#### Personal Info

Data fields:
- Name, surname
- Email
- Phone
- Date of birth
- Country of residence / nationality
- Address
- DID (Decentralized Identity)
- Risk score
- Created / Updated timestamps

#### KYC

| Field | Notes |
|---|---|
| KYC status | `KYC Approved` / `KYC Rejected` / `In Review` / `Not started` |
| Sumsub applicant ID | Clickable link to Sumsub external |
| Alert (if rejected) | `Account status disabled automatically` — `Account status disabled due to Name Surname KYC Rejected. See details in sumsub` |

#### Documents

List of uploaded compliance documents with statuses. Admin can request re-upload, approve, or reject.

Actions available:
- `Request` — sends re-upload notification to client
- `Approve` — approves a document
- `Reject` — rejects with reason
- `Confirms Request re-upload` — confirmation button after requesting

Modals:
- **Confirm sending notification to the client** — Title field: `Internal reason?`
- Success alert: `%object name% Accepted` / `Thank you for the update`
- Rejection alert: `%object name% Rejected` / `Please, re-%action%`

#### Available Features

| Element | Notes |
|---|---|
| Section title | `No Available features` (empty state) or list of toggles |
| Example toggle | `Wire Transfer ????????` |
| Confirm disabling modal | Title: `Confirm disabling %tx type%` |
| After disable (wallet view) | `Send` tab disabled (opacity 0.3), `Receive` still active |

#### Wallets

Title: `In all wallets on behalf of org/bank`

Table with wallet rows showing:
- Wallet address
- Type (individual / business / bav)
- Value USD
- Assets (VIXC, nUSD)
- Risk score
- DID
- Creation time / Last login time / Last login IP
- Actions: `Block wallet`, `Block amount`

Balance examples: `+$ 2,243,222.12 –$ 2,243,222.12`

#### Transactions

Filtered view of this client's transactions (links to Transactions list with pre-applied client filter).

#### Org Membership

Linked organisations/BaVs the client belongs to.

---

## 8. Clients: Orgs / BaVs List

**Node ID:** `#7:10737`
**Purpose:** Lists all registered Organisations (businesses) and BaVs (Banks as Validators). Searchable table.

### Page Header

| Element | Value |
|---|---|
| Title | `Clients: Orgs, BaVs` |
| Tabs | `Clients` / `Members` (active on members side) |

### Table Columns

| Column | Notes |
|---|---|
| Name, ID | Clickable link |
| Type | Business / BaV |
| members | Member count |
| KYC status | — |
| Risk | — |
| Country | — |
| Created | — |
| Updated | — |
| Status | — |

### Example Row

- `members` column shows `0` for no members
- `0` value in members cell

---

## 9. Org / BaV Detail

**Node ID:** `#6:143948`
**Purpose:** Detail page for a single Organisation or BaV.

### Page Header

| Element | Value |
|---|---|
| Breadcrumb | `Clients / Paralang Inc. - bank` |
| Secondary action | `View as Validator` (text link, navigates to Validator detail) |

### Sections

#### Company Info

Data fields:
- Company name
- Registration number
- Country
- Legal address
- Type: `Bank` / `Organization`
- KYC / KYB status
- Risk score
- Sumsub ID
- Created / Updated

#### Members

Sub-section title: **Members**

Table of members who belong to this org.

#### Documents

Same document review flow as individual clients.

#### Legal Owner of the Business

| Field | Notes |
|---|---|
| Label | `Legal owner of the business` |
| KYC status of owner | `KYC Rejected` example |
| Alert | `Account status disabled due to Name Surname KYC Rejected. See details in sumsub` |

---

## 10. Members (User–Org) List

**Node ID:** `#6:144044`
**Purpose:** Lists all users who are members of any organisation. Cross-org view.

### Page Header

| Element | Value |
|---|---|
| Title | `Members` |
| Annotation | `Filter by: Org/bank name, Role? Created from/to, Updated from/to\| Sort default by: updated` |

### Actions / Buttons

| Element | Value |
|---|---|
| Search | `Search by client/user/org/bank name and ID, email, phone` |

### Tabs

`Clients` / `Members` (Members tab is active)

---

## 11. Member Detail

**Node ID:** `#6:144135`
**Purpose:** Detail page for a single org member (user with role in an org).

### Page Header

| Element | Value |
|---|---|
| Breadcrumb | `Clients[Members] / Nelli Kam - member` |

### Sections

#### Personal Info

Data fields:
- Full name
- Email
- Role: `member`
- DID: `???` (placeholder — TBD)
- Sumsub ID
- Status
- Org/Bank linked

#### Membership Info

| Field | Notes |
|---|---|
| Invited | Date of invitation |
| Accepted invite | Date accepted |

#### Available Features

Empty state: `No Available features`

#### Wallets

Sub-title: `In all wallets on behalf of org/bank`

Shows org wallets this member has access to. Balance: `+$ 2,243,222.12 –$ 2,243,222.12`

---

## 12. Wallets List

**Node ID:** `#7:7251` (Wallets table)
**Purpose:** Global list of all wallets on the platform across all client types.

### Page Header

| Element | Value |
|---|---|
| Label | `Wallets` |
| Active nav item | `Wallets (Accounts)` |

### Filters / Tabs

| Tab | |
|---|---|
| Individual | |
| Business | |
| BaV | |

### Table Columns

| Column | Notes |
|---|---|
| Address | Wallet address (width 340px) |
| Value, $ | Total USD value |
| Blocked, $ | Frozen/blocked USD amount |
| Assets | Asset types (width 160px) |
| Net | Net value (136px) |

---

## 13. Wallet Detail

**Purpose:** Side panel or detail view for a single wallet. Accessible from client detail or wallets list.

### Data Fields (Wallet detail panel)

| Field | Example |
|---|---|
| Address (on Vixichain) | `vixi56vQegGYWWee3YEXPzmnE98zGyhsr` |
| Type | `individual` / `business` / `bav` |
| Value USD | `1,000.12` |
| Assets | `VIXC:0.12345678, NUSD:1000.00` |
| Risk score | `0-100` |
| DID | `Nelli Kam, vixi*zQjrS` |
| Creation time | `2024-09-01, 9:50:34 (UTC)` |
| Last login time | `2024-09-01, 9:50:34 (UTC)` |
| Last login IP | `176.230.190.207` |

### Actions / Buttons

| Button | Effect |
|---|---|
| Block wallet | Opens Block Wallet confirmation |
| Block amount / Freeze amount | Opens Freeze Amount sub-panel |

### Sub-panel: Block / Activate / Freeze Amount

Contains amount input and asset selector. After freezing:

- Wallet entry shows: `100 nUSD was frozen by Mihaela. when (date)` + ability to Unfreeze
- `Freeze another amount (not priority)` — secondary link
- `Download report of the balance` — linked text (Admin/Action color)

Insufficient balance state:
- Title: `Insufficient balance`
- Body: `There is not enough nUSD on client's balance.`

Client-facing wallet after freeze:
- Shows `$ 20 freezed` (hint text, red)
- Shows `20.00 nUSD freezed` (hint text, red)
- Email notification sent to client: `Account Balance Freeze` — "Dear [Client's Name], Please be advised that we have frozen %Amount% %ASSET% from your account balance as of %Date%. This action may be due to regulatory standards and internal compliance policies. Our support team is available to provide further details…"

---

## 14. Referrals

**Node ID:** `#7:16618` / `#7:16625`
**Purpose:** Admin view of individual client referral performance. Shows per-client referral stats.

### Page Header

| Element | Value |
|---|---|
| Title | `Referrals` |
| Total count | `Total: 1` |

### Table Columns

| Column | Notes |
|---|---|
| Invite link | The client's unique referral link |
| Invited clients | Number of individual clients referred |
| Invited Orgs | Number of orgs referred |
| Invited total | Total invited |
| Rewards total | Total VIXC rewards earned from referrals |

### Example Row

| Col | Value |
|---|---|
| Invited total | `24` |
| Rewards total | `12.00 VIXC` |

---

## 15. Rewards

**Node ID:** `#7:16680` / `#7:16687`
**Purpose:** Admin view of reward campaigns and per-client reward balances.

### Page Header

| Element | Value |
|---|---|
| Title | `Rewards` |
| Total count | `Total: 2` |

### Table Columns

| Column | Notes |
|---|---|
| Client | Name + type (indiv./org) + country flag |
| Campaign | Campaign name |
| Rewards earned | Total VIXC earned |
| Pending balance | Unclaimed VIXC |
| Claimed balance | Already-claimed VIXC |

### Example Rows

| Row | Campaign | Earned | Pending | Claimed |
|---|---|---|---|---|
| `Bob Marley(indiv.) 🇬🇧` | `Airdrop` | `50.00 VIXC` | `10.00 VIXC` | `40.00 VIXC` |
| `Bob Marley(org) 🇬🇧` | `Pre-sale` | — | — | — |
| (row 3) | `%campaign name%` | — | — | — |

Last column: `2 (link to trx table)` — clickable link to filtered transaction list.

---

## 16. Invite Codes (devnet)

**Node ID:** `#7:16811`
**Purpose:** Lists invite codes used during devnet phase for controlled access.

### Page Header

| Element | Value |
|---|---|
| Title | `Invite codes (devnet)` |

### Design Notes

- Devnet-specific feature; replaced by Invites & Referrals on testnet/mainnet.

---

## 17. Invites & Referrals (testnet/mainnet)

**Node ID:** `#7:16909`
**Purpose:** Production-ready invite and referral management for testnet and mainnet.

### Page Header

| Element | Value |
|---|---|
| Title | `Invites & Referrals  (testnet/mainnet)` |

---

## 18. Fees

**Node ID:** `#7:17006` / `#7:17013`
**Purpose:** Configure and view transaction fees per validator. Three sub-sections: BaV fees, VIXIS (Vixi's own) fees, and default fee for all validators.

### Page Header

| Element | Value |
|---|---|
| Title | `Fees` |
| Summary | `Default: $ 0.1  Total: 3, total $15.04` |

### Actions / Buttons

| Button | Value |
|---|---|
| Search | `Search by validator name and ID` |

### Table Columns

| Column | Notes |
|---|---|
| Fee owner/type | Validator name + ID + email (multi-line, Admin/Action color) |
| Fee | Fee value |

### Example Rows

| Owner | |
|---|---|
| `Waterfall Illands bank, Inc` / id / email | |
| `Vixichain` / id / email | |

### Sub-section: BaV's Fee

**Header:** `BaV's fee`
**Sub-page title:** `%BAV NAME% — Fee`

| Field | Value |
|---|---|
| Fee, $ (max $0.07) | Input field, example: `$ 0.04` |
| Edited by | `email / edited of the user that has edited it last` |

### Sub-section: VIXIS

**Header:** `VIXIS`

Two sub-pages:
- **Create fee** — creation form with `Create` button
- **Edit fee** — edit form

### Sub-section: Default Fee for All Validators

**Header:** `Default fee for all BaVs that we have setup for them`
**Sub-page title:** `Default fee for all validators`

| Field | Value |
|---|---|
| Fee type | `Default for all validators` |

### Transaction Direction Definitions (annotation text)

- `Inbound transactions: from external network to Vixichain`
- `Outbound transactions: from Vixichain to external network`
- `Internal transactions: sending and receiving within Vixichain`

---

## 19. Admin Users

**Node ID:** `#7:17226` / `#7:17233`
**Purpose:** Manage admin panel user accounts — create, view, and edit admin users with role-based permissions.

### Page Header

| Element | Value |
|---|---|
| Title | `Admin users` |

### Actions / Buttons

| Element | Value |
|---|---|
| Search | `Search by user & ID, email` |

### Table Columns

| Column | Notes |
|---|---|
| Name | — |
| ID | — |
| Email | — |
| Role | e.g., `Auditor` |
| Created | — |
| Updated | — |

### Create / Edit Admin User Form

**Sub-page title:** `Create new admin user / Edit admin user`

| Field | Placeholder/Example |
|---|---|
| Name | `Name` |
| Email | `Email` |
| Role | Dropdown, default: `Admin` |
| Department | Dropdown, example: `Finance` |
| Permissions | Radio/select: `View & Edit` / `View` / `No access` |

**Button:** `Create`

---

## 20. System Logs

**Node ID:** `#7:17380` / `#7:17387`
**Purpose:** Technical audit log of all system events across wallet, security, blockchain, and system categories.

### Page Header

| Element | Value |
|---|---|
| Title | `System` |

### Table Columns

| Column | Notes |
|---|---|
| Log in | Login event indicator |
| Level | Log level (DEBUG / INFO / ERROR / etc.) |
| IP address | Client IP |
| TX HASH | Related transaction hash |
| Handled | `Auto` / admin user who handled it |

### Log Categories (shown as table row groups or tabs)

| Category | |
|---|---|
| `Wallet` | |
| `Security` | |
| `Blockchain` | |
| `System` | |
| `Seed Export` | |
| `Login Attempt` | |
| `TxFailure` | |

### Log Detail Panel

Shown as a side panel or expand-row when a log entry is clicked.

| Field | Example Value |
|---|---|
| `log_level` | (value) |
| `event_type` | `Wallet, Security, Blockchain, System Seed Export, Login Attempt, TxFailure` |
| `user_id` | `56789` |
| `wallet_id` | `0xabc123...xyz or –` |
| `ip_address` | `192.168.1.100  or –` |
| `transaction_hash` | `0x987abc...def  or –` |
| `status` | `Success` |
| `handled_by` | `Auto, Admin_John` |
| `Event type` | (value) |
| `DEBUG` | `TX Hash: 0x12345abc...789efg\nUser ID: 0349*23908\nStatus: Active` |

---

## 21. Validators List

**Node ID:** `#7:19274`
**Purpose:** Lists all validators (banks/BaVs) registered on the Vixichain network.

### Page Header

| Element | Value |
|---|---|
| Title | `Validators` |

### Actions / Buttons

| Element | Value |
|---|---|
| Search | `Search by Validator Name, ID, Country` |

### Table Columns

| Column | Notes |
|---|---|
| Name, ID | Validator name + internal ID (Admin/Action color = clickable) |
| Verification status | KYC/KYB status |
| Status | Operational status |
| Current Version | Version number of active rule set |
| Node | Node status indicator |
| Country | Jurisdiction |

### Pagination

`Page 2 of 5` — 25 items per page

---

## 22. Validator Detail

**Node ID:** `#7:19430`
**Purpose:** Detail page for a single validator with performance metrics, node status, and linked data.

### Page Header

| Element | Value |
|---|---|
| Title | `Validator / Paralang Inc.` |
| Secondary action | `View as Client` (text link, navigates to this org's client detail) |

### Info Section

| Field | Example Value |
|---|---|
| Internal ID | `123434234` |
| Last active (last login) | Date + `By %user or member ID%` |
| Verification status | `KYC Approved` |

### Validator Section

Sub-section title: **Validator**

| Field | Example Value |
|---|---|
| Node | `Status of the node [Online🟢/Offline🔴]` + `Logs` (secondary link) |
| Availability | `99.97%` |
| Uptime | `00 m 99d 12 h 35 m` |
| IP Address | `192.158.1.38.0230.0202 (normal IP address here)` |
| Country | `Georgia` |
| Created rules | `4` (clickable) + `12.2` (version?) + `View all` (link) |
| Fee | `$0.04` (clickable) |
| Fee, rules group 1 | `$0.04 (link to fees section)  -  (mainNet)` |
| Earned | `$123.43` + `Total validator's fee` (secondary text) |

### Transactions Sub-section

| Field | Example Value |
|---|---|
| Signed transactions | `24` + `Last 2024-09-01, 13:57 UTC` |
| Pending | — |
| Cancelled | — |
| Total processed value | — |

### Tabs / Sub-pages within Validator detail

| Tab | Navigates to |
|---|---|
| Transactions | Filtered transaction list for this validator |
| Processed clients by type | Chart/table |
| Processed clients by risk | Chart/table |
| Logs | System logs filtered to this validator |

### Design Notes

- Figma note: `FOR NOW: Decided to HIDE countries from BaVs, but this can appear later`

---

## 23. Validator Versions

**Node ID:** `#7:20113`
**Purpose:** History of all rule set versions for a validator (or all validators). Admins can filter to one validator's history. Read-only view.

### Page Header

| Element | Value |
|---|---|
| Title | `Versions` |
| Last updated | `Updated: 2025-01-29 06:22:39` |

### Actions / Buttons

| Element | Value |
|---|---|
| Search | `Search by Validator Name, ID, updated by (email/name?)` |

### Table Columns

| Column | Notes |
|---|---|
| Version | Version identifier (Admin/Action color = clickable) |
| State | `Current` / previous / archived |
| Rules total | Number of rules in this version |
| Rules updated | Number of rules changed from prior version |
| Countries | Vixi countries version reference |
| Comment | Free-text change comment |

### Example Rows

| Version | State | Notes |
|---|---|---|
| `v3` | current | |
| `v1` | — | |
| `Vixi version: 4` | — | Vixi platform version reference |
| `v14` | — | |

### Version Detail Panel

**Title:** `TrustBank 🇬🇧 / v3 (current)`

| Field | Example Value |
|---|---|
| Version | `v3` + `Current` (secondary) |
| Validator | `TrustBank 🇬🇧` / `ID: 34398` |
| Rules total | `20` |
| Rules updated | `5` |
| Countries | `Vixi version: 52` |
| Updated by | Date `2024-09-01, 9:50:34 (UTC)` |
| Comment | Long free-text comment block |

### Design Notes

- Figma annotation: "User can filter table to see all version history of 1 validator"
- Side panel used to view comments: "This sidebar - is to view the comment. If we can view the comment differently - lets do it"
- "Yes, version first. Why? Because after filtering by validator, we will look on numbers and it's state. This page supposed to be more technical like logs."

---

## 24. Countries

**Node ID:** `#7:20294`
**Purpose:** Manage country risk level assignments used by compliance rules. Shows Vixi's default country risk table; validator-specific country overrides are hidden from BaVs for now.

### Page Header

| Element | Value |
|---|---|
| Title | `Countries` |
| Last updated | `Updated: 2025-01-29 06:22:39\nUpdated by: Name Surname` |

### Filter / Selector

| Element | Value |
|---|---|
| Version selector | `Vixi` / `Version: 52, upd: 2025-02-07 12:46:57` |
| Search | `Search by country` |
| Button | `Remove all changes` |

### Table Columns

| Column | Notes |
|---|---|
| Name | Country name |
| Code | ISO 2-letter code |
| Risk level | Dropdown (Low / Medium / High / Unacceptable) |
| Risk score | Numeric input (editable inline) |

### Example Row

| Name | Code | Risk level | Score |
|---|---|---|---|
| `Aland Islands` | `AX` | `Low (0-20)` | `10` |

### Design Notes

- Figma annotation: "No changes for the table, just the dropdowns (and validator's dropdown is disabled for now, and dropdown to see our versions is enabled)"
- Validator-specific country settings: hidden from BaVs currently, may be exposed later.
- Countries table structure: `Vixi / version / Vixi's countries` | `Validator / version / Countries setup (now should be hidden)`

---

## 25. Rules

**Node ID:** `#7:20387`
**Purpose:** Master list of all compliance rules across all validators and versions. Read-only overview for admins. Rule detail shows the full configuration.

### Page Header

| Element | Value |
|---|---|
| Title | `Rules` |

### Actions / Buttons

| Element | Value |
|---|---|
| Search | `Search by Rule name, Validator name, ID` |

### Table Columns

| Column | Notes |
|---|---|
| Rule name | Rule identifier string |
| Rule ID | Internal rule ID |
| Rule version | Version this rule belongs to |
| Clients | Client types this rule applies to (e.g., `Indiv, Business`) |
| Maximum amt, $ | Transaction amount ceiling |
| Sender Risk | Risk level filter for sender |
| Receiver Risk | Risk level filter for receiver |
| Currencies | Applicable currencies |
| Accepting | Whether rule accepts or declines (`Accepting`) |
| Transactions | Direction(s): `Int`, `Out, Int` etc. |
| Updated, UTC | Last updated timestamp |

### Rule Detail Panel

**Breadcrumb:** `%Validator name% / %version% / %Group of Rules Name% / %Rule name%`

| Field | Example Value |
|---|---|
| Rule name | `Large outgoing (10k)` |
| Description | `Outgoing transactions larger of equal to 10k` |
| Rule action | `Accept` / `Decline` (radio) |
| **Transaction section** | |
| Direction | Checkboxes: `Inbound` / `Outbound` / `Internal` |
| Currency | `VIXI` |
| Max Amount ($) | `10,000.00` |
| Sender Country of Residence | Multi-select country list |
| Receiver Country of Residence | Multi-select country list |
| Sender risk level | Risk level select |
| Receiver risk level | Risk level select |
| Sender type | Client type select |
| Receiver type | Client type select |
| Source of Funds Verification | `Yes` / `No` |
| TIN | Enabled / Disabled |

### Design Notes (from Figma annotations)

Key changes already implemented:
1. Removed numbers from "Low (0-20)" label
2. Added "Sender risk level" and "Receiver risk level" instead of "Client risk level"
3. Same for Receiver type
4. Decided to hide (from BaV) ability to change countries for now
5. Feb 10: SoF disabled/hidden
6. Feb 20?: Non-Document KYC was removed/disabled
7. Divided sender and receiver fields

Fee logic note: `this rule approved trx -> rule is in that Validator -> take fee from that validator's settings`

Admin view is read-only: "Should this be a view mode for admins, isnt it?"

Rule ordering note: "Rule names first. Why? Because after filtering by validator, we will look on rule names and details, not on Validator's name and it's state"

---

## 26. Compliance Section (canvas-level diagrams)

**Node ID:** `#7:96308`
**Purpose:** Canvas-level planning area (not a UI screen) documenting the overall compliance architecture and unresolved open questions. Not rendered in the product UI.

### Topics Covered

#### SoF (Source of Funds)

- `Docs — on transaction creation`
- `TIN`

#### KYC 2 (Post-initial KYC)

- `After initial #1 KYC = ✅`
- `Request more docs (bills)` / `Docs expired`
- Open questions: where user uploads (Verif.Center or Support chat?), whether docs go to Sumsub (no), review flow in Admin
- Decision: `through support = yes + manual upload to admin as mvp`
- Annotation: "If expired - request should be automatic"
- Annotation: "Client receives Notifications: email, in-app in notif.center with a link to Verification center [DID in his profile]"

#### Manual Onboarding

- `Be able to onboard manually — upload docs, etc`
- `Sumsub does this now — Manual request - latest stage/priority`

#### Score Calculation

- `Continue discussing with compliance from this place — how the score is calculated - Osnat has doc`
- `also add manual upload of a doc`

---

## 27. Blocking Flows

**Node ID:** `#7:96332`
**Purpose:** Documents the three types of blocking available to admins: Blocking a Wallet, Blocking a Client, and Freezing an Amount. These are compliance actions, not features clients can trigger.

### → Blocking Wallet

**Meaning:** Wallet is completely inaccessible to the user. Funds can be transferred via support. Time limit: 1 or 3 weeks (TBD).

**Admin action:** From client's Wallets section, click Block Wallet → confirmation.

**Client impact (multi-wallet user):**
- Blocked wallet shows as `Inactive` in wallet switcher
- Alert: `Contact support`
- Other wallets remain accessible

**Client impact (single-wallet user):**
- After login, sees screen: `[update this text] Your wallet was Inactive`
- Button: `Create new wallet`
- TBD: can user create new wallet? (marked `?????`)

**Admin wallet list view shows:**
- Wallet rows: `Main account` / `Second account` (Inactive) / `Third account`
- `Create account` button
- `Delete` button (red/danger)

### → Blocking Client

**Meaning:** Complete account block. User cannot do anything; platform does not expect client to return.

**Admin action:** From client detail page, toggle to Block → confirmation modal.

**Confirm blocking client** modal:
- Title: `Confirm blocking client`
- Primary button: `Block`

**Confirm reactivating client** modal:
- Title: `Confirm reactivating client`

**Client impact (after block):**
- Login screen: `Your access has been denied`

### → Turn Off Tx Type / Feature

**Meaning:** Admin disables specific transaction types for a client (Send, Receive, Bridge, etc.).

**Admin action:** Toggle in Available Features section of client detail.

**Confirm disabling %tx type%** modal:
- Title: `Confirm disabling %tx type%`

**Client wallet impact:**
- Disabled feature: button grayed out (opacity 0.3) or tab disappears / is locked
- Example: `Send` dimmed (opacity 0.3), `Receive` normal

### → Freeze Amount

**Meaning:** Specific monetary amount is frozen within a wallet. Funds remain in the wallet but cannot be used. Currently no unfreeze UI (TBD with compliance).

**Admin action:** From wallet detail → click `Block / Freeze amount` → Freeze Amount panel opens.

**Freeze Amount panel:**
- Amount input
- Asset selector
- Insufficient balance state: `Insufficient balance` / `There is not enough nUSD on client's balance.` / `Download report of the balance`

**After freeze:**
- Admin sees: `100 nUSD was frozen by Mihaela. when (date) +ability to Unfreeze`
- Link: `Freeze another amount (not priority)`
- Client notification email: **Subject:** `Account Balance Freeze` / **Body:** `Dear [Client's Name], Please be advised that we have frozen %Amount% %ASSET% from your account balance as of %Date%. This action may be due to regulatory standards and internal compliance policies. Our support team is available…`
- Client wallet display: `• $ 20 freezed` / `20.00 nUSD freezed` (red hint text)

---

## 28. Source of Funds (SoF) Flow

**Node IDs:** `#7:96665` (Initial docs request), `#7:96814` (Tx detail — rejected with SoF), `#7:96914` (Tx detail — confirmed)
**Purpose:** Documents the end-to-end SoF document collection and review flow triggered during transaction creation.

### Trigger Conditions

SoF is requested when **in one of the rules that triggered (Vixi rule or BaV rule)**:
- `Source of Funds Verification = Yes`

Rules are set up:
- In admin portal (admin sets the rule)
- In BaV's wallet in compliance section

TIN also triggered by: `In Validator's settings in Admin`

### Flow: Client Side (Wallet)

1. Client creates a transaction
2. Tx appears in admin with status `Pending` (= in review)
3. If rule requires SoF → client must upload documents + enter TIN during tx creation
4. Confirm transaction screen shows:
   - `Confirm transaction`
   - Amount: `10,000.0000 nUSD`
   - Receiver address
   - Exchange rate: `0.0000001 VIXC = $ 1.00` updated every `8s`
   - `Exchange rate is updated every 10 seconds`
5. Validator display in dropdown: `Fee 100.000000 VIXC ($ 0.01) • Est. time 10 mins • Source of Funds • TIN`

**Validator selection note:** List of validators is generated based on rules that will work for this client (amount, asset, network, client risk, tx risk). Only validators whose rules approve this tx are shown.

### Flow: Admin Side (Compliance Review)

**Transaction detail — Documents section:**

| Element | Value |
|---|---|
| Section title | `Documents` |
| Document list | `file1.pdf` (Admin/Action color = clickable) |
| Status options | In review / Approved / Rejected |

**Admin action: Approve document**
- Button: `Approve`
- Success toast: `%object name% Accepted` / `Thank you for the update`

**Admin action: Reject document**
- Button: `Reject`
- Rejection alert: `%object name% Rejected` / `Please, re-%action%`
- Sends notification to client

**Admin action: Request re-upload**
- Button: `Confirms Request re-upload` (after clicking Request)
- **Confirm sending notification to the client** modal:
  - Field: `Internal reason?` (internal only, not sent to client)
- Client receives notification

### Client: Document Re-upload

After rejection:
- Client sees: `Your file.pdf was rejected with a note "Dear Bob, please resubmit the invoice, it is not readable"\n\nPlease re-upload your source of funds\nDeadline for resubmition: 3 days`
- Link: `Cancel transaction`
- If deadline missed (3 days — TBD): `Since the requested documents were not uploaded, the transaction is no longer valid.` + button `Remove/cancel it`
- After resubmit: validator selection prompt `Please select new validator`

### Transaction Statuses Shown to Client

| Status | Display |
|---|---|
| Pending | `Pending` (orange) |
| Pending re-submit SoF | `Pending, Re-submit SoF` (orange) |
| Confirmed | `Confirmed` (green) |
| Rejected | `Rejected` (red) |

Success notification: `10,000 nUSD sent to Nelly`

### Verification Center (Client Docs Portal)

**State: In review**
- Alert: `Thank you for the update` / `Your file is in review`

**State: Rejected**
- Text: `Your file.pdf was rejected with a note "Dear Bob, please resubmit the invoice, it is not readable". Please re-upload your %doc name%`

**Expiry:**
- `%Alert text, for example: Your %Document% expired%. Please, %action%`
- `Update info` button
- Annotation: "If expired - request should be automatic"

### Additional Information Needed (Admin request to client)

- Email subject: `Additional Information Needed`
- Body: `Dear [User's First Name], %text of the note% Thank you for your understanding and your interest in Vixichain.`
- Button on client side: `Update info`

### Admin Document Request (from Client Detail → Docs section)

- Placeholder field: `Please upload proof of residence`
- Button: `Request`
- After click: **Confirm sending notification to the client** modal with `Internal reason?` field

---

## 29. TIN (Tax Identification Number) Flow

**Node ID:** `#7:100186`
**Purpose:** Documents the Tax Identification Number collection flow, triggered per validator's settings.

### Trigger

When `BaV / Settings: Checkbox: on` (TIN checkbox enabled in validator settings), client is prompted to provide TIN during transaction creation.

### Logic Summary

```
BaV / Settings: Checkbox: on
  → Client's wallet: TIN requested

If TIN is saved in user settings:
  → pre-filled, client can edit

If TIN is NOT saved in user settings:
  → client enters TIN during tx flow
  → after tx Send clicked, TIN saved to Verif.Center
  → TIN in Verif.Center (editable later)
```

**Validation note:** "From what we know, we cannot / should not validate TIN Enter your TIN (Taxpayer Identification Number). We just request it, limit amount of digits in the field to 300 and allow any numbers, characters to be entered."

### Flow Steps (annotated in Figma)

| Step | Description |
|---|---|
| 0 | User selects BaV with TIN required |
| 1 | TIN entry field shown in tx flow |
| 2 | Link to Verif.Center (opens in new tab) |
| 3 | After first tx with TIN, TIN saved to Verif.Center with ability to edit |
| 4 | BaV appearance in Select Validator dropdown with TIN indicator |

### TIN Entry Screen

- Title: `Enter your TIN`
- Placeholder: `Enter your TIN` (field)
- Example entered value: `12132432433`
- Edit link (in Verif.Center): `Edit`

### Validator Dropdown Display

When TIN (and SoF) required, validator row shows:
- `Fee 100.000000 VIXC ($ 0.01) • Est. time 10 mins • Source of Funds • TIN`

When TIN added to BaV settings:
- `Fee, $*` (asterisk indicates TIN required)
- Note for `When Deposit from/to external network`

### TIN in Admin View (Transaction Detail)

**Location:** `Admin / Trx detail` — TIN field visible in transaction data (content blurred in design to highlight it).
- Label: `Content is blurred to highlight where TIN is also can be changed`

**Location:** `Admin / Client detail` — TIN field visible in client profile data.

### TIN in BaV View (Signed Transaction)

Transaction header shows: `%tx type% • 5.01 nUSD • Low risk` (bold) + `Confirmed`
- Receiver address visible
- `Rules triggered` label + rule names listed

### Notes / Edge Cases

- `Verification center should be opened in a new tab`
- `No other extra actions or states. User makes trx, we save TIN after he clicked Send (it doesnt matter what happens to trx next)`
- `Changes: 1. Feb 10: SoF disabled/hidden` (SoF temporarily disabled as of that date)
- MPIN confirmation: If user has MPIN toggle = on in settings, MPIN is asked before confirming tx
  - Screen: `Enter your MPIN` / `Enter your MPIN that you set during sign up`
  - Numpad: `1`, `2`, `3`, `4`
  - Link: `Forgot you MPIN?`

---

*End of document. All screens are based on a preview/draft state of the Vixi Admin + Compliance panel. Full admin details referenced in a separate Figma draft: `https://www.figma.com/design/vbGInZbVbXfOIS0D6SlNvY/Vixichain-Wallet?node-id=5882-130249`*
