# Vixi Wallet — Bank Account Verification (BAV) / Bank as Validator (BaV) Panel

**Source:** Figma "Vixi wallet + presale CRM [shared]", Wallet+BAV page
**File key:** YHKGP7o2yXw4WnVIZFGOgl, node 5:73100
**Platform:** Web desktop (responsive; 1440px primary, variants at 1920, 1186, 900, 768, 460px)
**App:** Vixi / Risely — fintech wallet + blockchain validator portal

> **Scope note:** This document covers the **BAV/BaV panel** — a web-based dashboard for banks that operate as Vixichain validators. It is a separate product surface from the end-user mobile wallet and presale CRM. The Figma page is titled "Wallet+BAV" and carries the internal section heading **"Wallet + Bank as Validator's area"**. It shares a side-menu component with the desktop wallet view, but its primary audience is bank validator operators, not individual end-users.

---

## Table of Contents

1. [Global Layout & Shared Components](#1-global-layout--shared-components)
2. [Node Info (Dashboard)](#2-node-info-dashboard)
3. [Signed Transactions (Validator Dashboard)](#3-signed-transactions-validator-dashboard)
4. [Transaction Detail](#4-transaction-detail)
5. [Rules (Compliance Rules Table)](#5-rules-compliance-rules-table)
6. [Rule Details / Edit Rule](#6-rule-details--edit-rule)
7. [Settings (Fee Configuration)](#7-settings-fee-configuration)
8. [Version History (Vers.history)](#8-version-history-vershistory)
9. [Updates from Vixichain](#9-updates-from-vixichain)
10. [Node Notification Emails](#10-node-notification-emails)
11. [Filters & Tooltip States (Design Overlays)](#11-filters--tooltip-states-design-overlays)
12. [Side Menu Component](#12-side-menu-component)
13. [Design Tokens & Color Reference](#13-design-tokens--color-reference)

---

## 1. Global Layout & Shared Components

### Layout Shell

Every BAV panel page uses a three-zone horizontal layout at 1440px:

```
┌──────────┬────────────────────────────────┐
│ Side Menu│           Main Content         │
│ 240px    │           fill                 │
│          ├────────────────────────────────┤
│          │          Footer                │
└──────────┴────────────────────────────────┘
```

- **Outer padding:** 40px top/bottom, 80px left/right
- **Gap between sidebar and content:** 20px
- **Background:** #FFFFFF

### Top Bar (inside main content)

Each screen has a top bar row (height 53px) containing:

| Element | Details |
|---|---|
| Bank name | Large text (Onest Regular 28px, #000000). Example: "Bank of Georgia" or "Bank Name" |
| Account switcher | Dropdown showing connected bank account ("Main account") with bank logo thumbnail and down-arrow chevron |
| Bell icon | Notification button |
| Avatar | Circular avatar with initials (e.g. "AR") on blue gradient background; clicking expands account details |

### Footer

Appears at the bottom of every full-page frame.

| Element | Value |
|---|---|
| Vixi logo (chain variant) | Left-aligned |
| Wallet logo (new variant) | Left-aligned |
| QR/scan logo | Left-aligned |
| Social icons | Facebook, Twitter, YouTube, Behance (repeat), Instagram |
| App store badges | Apple App Store, Google Play (both black) |
| Copyright | "© 2025 All rights reserved to Vixichain" |
| Network toggle | "Mainnet" (label) + **"Switch to Testnet"** (blue bold link) |

### Earnings / Balance Card (in Side Menu)

A compact card in the side menu bottom section:

| Label | Value |
|---|---|
| "Earnings" | Section label (grey hint text) |
| VIXC amount | "6,531.78 VIXC" (medium weight) |
| USD equivalent | "$ 6,531.78 Total fees received" (hint grey) |

---

## 2. Node Info (Dashboard)

**Node ID:** #5:73207 (1440px reference frame), variants at #5:73298, #5:73437 (698px), #5:73527 (412px)
**Purpose:** Main BAV dashboard showing node health, uptime, technical details, and downtime logs.
**Entry point:** Default landing screen for BAV; accessible via "Node info" item in side menu (selected/highlighted state).

### Layout (top to bottom)

1. Top bar (bank name + account switcher + avatar)
2. Content area — two columns (wrap on narrow viewports):
   - **Left column:** Node Health card + Node Info card
   - **Right column:** Logs table card
3. Footer

### Node Health Card

| Element | Content |
|---|---|
| Title | "Node Health" |
| Status indicator | Green filled circle (●) beside title — indicates healthy state |
| Availability | "99.97%" (large, Onest Medium 20px) |
| Availability label | "Availability" (grey hint) |
| Uptime | "00 m 99d 12 h 35 m" (large, Onest Medium 20px) |
| Uptime label | "Uptime" (grey hint) |

**Card styling:** White background, 1px #F2F2F2 border, 16px border-radius, box-shadow 0 0 10px rgba(0,0,0,0.05)

### Node Info Card

**Section title:** "Node info"

| Field | Example Value |
|---|---|
| Node ID | 123434234 |
| Node Name | Bank of Georgia |
| IP Address | 192.158.1.38.0230.0202 |
| Geographic Location | Georgia |

**Design note (sticky note in Figma):** "Node info: Notification status if node is offline (no need to show 'online' status, it should be default)"

**User Story (from Figma sticky):** Accept criteria include: Node ID, Node Name, IP Address, Geographic Location display; real-time CPU/Memory/Disk/Network health metrics; uptime in current session and historical %; downtime logs with timestamps, duration, and potential reasons; alerts for node going offline, high resource usage; threshold-configurable performance alerts.

### Logs Table Card

**Section header:**
- Title: "Logs"
- Badge: "3 new" (grey hint)
- Action: "Mark as read" (blue text button)

**Table columns:**

| Column | Width | Notes |
|---|---|---|
| Time (UTC) | 180px | Shows date + time; blue dot indicates new/online event |
| Event | 90px | "Online" / "Offline" |
| Duration | 130px | e.g. "12 min", "1 d 14 h 12 min", "12 years" |
| Potential reasons | fill | Free text, can be long; shows "—" if none |

**Sample rows:**

| Time | Event | Duration | Potential Reasons |
|---|---|---|---|
| 2024-09-01 9:50:23 | Online | 12 min | Reasons text |
| 2024-09-01 9:50:23 | Offline | 1 d 14 h 12 min | Long text string (wraps) |
| 2024-09-01 9:50:23 | Online | 12 years | — |

### States

| State | Description |
|---|---|
| Default | Node online (green indicator), all metrics populated |
| Node offline | Separate notification banner (see §10 email) and status badge "Offline" (red pill, fills: #ED523D) |
| Rules badge | "3" badge (blue pill, fills: #006BD9) on Rules menu item |
| Offline badge | "Offline" badge (red pill, fills: #ED523D) on Node info menu item |

### Actions / Buttons

| Button | Behavior |
|---|---|
| Mark as read | Marks all new log entries as read |
| Collapse arrow | Collapses the side menu |
| Switch to Testnet | Toggles network environment; blue bold link |

### Navigation

Side menu "Node info" item is active (blue highlight, white text).

---

## 3. Signed Transactions (Validator Dashboard)

**Node ID:** #5:73760 (1440px), variants at #5:73732 (1920px), #5:73788 (1186px), #5:73816 (900px), #5:73844 (768px), #5:73872 (460px)
**Purpose:** Shows all transactions the bank-validator has signed or is pending to sign. Includes a dashboard summary panel and a paginated transaction table.
**Entry point:** Side menu → "Transactions" (under Validator section, selected state shows "Transactions" in white on blue).

### Layout (top to bottom)

1. Top bar (bank name + "Bank Name" placeholder + account switcher)
2. Content area — three columns (wrap):
   - **Earnings card** (312px fixed width, full-height)
   - **Transaction stats card** (fill)
   - **Risk scores card** (fill)
3. Transaction table section
4. Footer

### Earnings / Validator Dashboard Card

| Element | Content |
|---|---|
| Title | "Earnings" |
| VIXC balance | "6,531.78 VIXC" |
| Subtitle | "Total validated value" |
| Total processed value | "$ 593,727,343" |
| Total transactions | "2,344,340" |
| Confirmed % | "12%" (green) |
| Pending % | "12%" (amber/orange) |
| Rejected % | "12%" (red) |
| Cancelled % | "12%" (grey) |

### Risk Scores Card

| Element | Content |
|---|---|
| Title | "Risk scores" |
| Subtitle | "Of total processed clients" |
| Low risk | "123 Low" (green) — "14% of total" |
| Medium risk | "22 Medium" (amber) — "14% of total" |
| High risk | "0 High" (red) — "14% of total" |

### Transactions Table

**Section header:**
- Title: "Transactions (tx)"
- Search input: placeholder "Search by: tx hash, tx ID, sender, receiver" (width: fill, height: 40px)
- "Export" button (secondary style, blue text, outlined)

**Table columns (with sort/filter indicators):**

| Column | Filter | Sort | Notes |
|---|---|---|---|
| Tx hash | Yes | No | Shows truncated hash (e.g. "cc00*b008") + copy icon; ID below ("ID: 123") + copy icon; tx type below (grey hint) |
| Network | No | No | Direction label (e.g. "Vixichain → Ethereum", "Ethereum → Vixichain") |
| Sender | Yes | No | Risk level (colored), country, entity type (Individual/Business) |
| Receiver | Yes | No | Risk level (colored), country, entity type |
| Created | Yes | Yes | Date + time (UTC) |
| Signed | Yes | Yes | Date + time (UTC) — empty dash "—" if unsigned |
| Status | Yes | No | "Confirmed" (green), "Pending" (amber), "Rejected" (red) |
| Amount | Yes | Yes | "3,323,121.00 USD" (decimal in lighter grey, currency tag) |

**Sample table row:**

| Field | Value |
|---|---|
| Tx hash | cc00*b008 / ID: 123 / %tx type% |
| Network | Vixichain → Ethereum (Outbound) |
| Sender | Low Risk / France / Individual |
| Receiver | Medium Risk / Germany / Individual or — (if external) |
| Created | 2024-09-01 19:50, UTC |
| Signed | 2024-09-01 19:50, UTC |
| Status | Confirmed / Pending |
| Amount | 3,323,121.00 USD |

**Pagination:** "Page 2 of 5" with prev/next chevron buttons (outlined, 44px height)

**Design notes:**
- "Copy icon - copies" (copies tx hash / ID to clipboard)
- "Should work the same as in Admin" (re: filter/hover behavior)
- Table cells have adaptive min/max widths ("rezina" = rubber/fluid layout)
- Row limit selector: shows "50" (dropdown)

### States

| State | Description |
|---|---|
| Default | Table populated, pagination visible |
| Empty search | No rows — empty state similar to other tables |
| Loading | Loading state as in other tables |
| Outbound | Direction "Vixichain → Ethereum" |
| Inbound | Direction "Ethereum → Vixichain" |
| Internal | No bridge direction shown |

---

## 4. Transaction Detail

**Node ID:** Detail content shown in "Group 1171278861" (#5:73899) and separate detail page frame within "Signed transactions" screens
**Purpose:** Full detail view of a single transaction, accessible by clicking a row in the Signed Transactions table.
**Entry point:** Click any row in the Signed Transactions table.

**Design note (Figma):**
> "1. Should we show sender/receiver names and addresses? yes, chain address yes. 2. Show the page almost equal to Admin, excluding fields that are only for admins and Activity, notes. 3. Rules list: most of the time there will be single rule. List contains many, because it's possible."

### Layout (top to bottom)

1. Back navigation: ← back (bold text, arrow icon)
2. Transaction header
3. Transaction details section
4. Sender section
5. Receiver section
6. Fees section
7. Validation section

### Transaction Header

| Element | Content |
|---|---|
| Title | "%tx type% • 5.01 nUSD • **Low risk**" (bold, large, green for risk) |
| Status badge | "Confirmed" (green outline pill) |

### Transaction Details Section

**Section title:** "Transaction details"

| Field | Example Value | Notes |
|---|---|---|
| Updated | 2025-01-15 19:50:54 (UTC) | Date + time |
| Tx ID | 1735558532 | Copy icon |
| Tx hash | 33dhFqthZWw9jUgSnCv1RanVwBas7898swwrEmGYY | Vixichain hash |
| Type | %type% | Placeholder for tx type |
| Status | %status | Placeholder |
| Block | 123456789 | Block number |
| Confirmations | "Confirmations: 12390123" | Shown below block |

### Sender Section

**Section title:** "Sender"

| Field | Example | Notes |
|---|---|---|
| Name | Nelli or — | Shows "–" if unavailable |
| Last Name | Kam or — | |
| ID | 12323 | Internal user ID |
| Risk Score | Low (green) | Color-coded by risk |
| User type | %User type% | Individual / Business |
| Address | vixi357USYYA9emZpMrA6mMdbWcrxaqm | Vixichain address + copy icon |
| Country | – or Value, %risk colored% | Country of residence |
| TIN | 12314234 or "–" | Taxpayer Identification Number (tooltip: "Taxpayer Identification Number") |
| Network | Vixichain | |
| Asset | VIXC (full name of asset) | Coin icon + ticker |
| Amount | 5.00 / $ 0.2 | Token amount + USD equivalent |
| Contract | vixi35...Ghsd | Smart contract address |

### Receiver Section

**Section title:** "Receiver"

| Field | Example | Notes |
|---|---|---|
| Name | Adam or – | |
| Last Name | Jhons or – | |
| ID | (same pattern) | |
| Risk Score | (colored) | |
| Address | vixi357USYYA9emZpMrA6mMdbWcrxaqmdbWcrxaqm | + copy icon |
| Country | – (if external) | |
| TIN | — (if external) | |

### Fees Section

**Section title:** "Fees"

| Fee Type | Example Value | Notes |
|---|---|---|
| Validator fee | $ 0.1 | 0.01 VIXC shown below |
| Platform fee | $ 0.01 | |
| Bridge GAS fee | $ 0.1 or "–" if internal | Only for cross-chain |
| Total network fee | (sum) | |

### Validation Section

**Section title:** "Validation"

| Field | Example | Notes |
|---|---|---|
| Tx Risk Score | Medium | Color-coded |
| Validator | Bank Name | Name of the validating node |
| Validator ID | 134 | |
| Policy Version | v1.1 | |
| Rules triggered | Rule name and link (blue, linkable) • Score: 12 | Wrapping list of triggered rules |

**Rules triggered format:** Each triggered rule shows: rule name (blue link) + "Score: 12" (grey) on the same line. Multiple rules wrap.

### Column Tooltips (hover states documented in Figma overlay group)

| Column | Tooltip |
|---|---|
| Tx hash row 1 | "Vixichain transaction hash" |
| Tx hash row 2 | "Internal transaction ID" |
| Tx hash row 3 | "Transaction type" |
| Sender risk column | "Sender's risk level" |
| Receiver risk column | "Receiver's risk level" |
| Sender country | "Sender's country" |
| Receiver country | "Receiver's country" |
| Sender type | "Sender's type" |
| Receiver type | "Receiver's type" |

---

## 5. Rules (Compliance Rules Table)

**Node ID:** #5:79751 (primary 900px fixed height), variants at #5:88904, #5:89368, #5:79929
**Purpose:** Bank validator's compliance rule list — defines which transaction parameters the bank will automatically accept or decline.
**Entry point:** Side menu → "Rules" (selected state: blue highlight, white "Compliance" / "Rules" text).

### Layout (top to bottom)

1. Top bar
2. Tab bar (3 tabs)
3. Rules header row (title + version info + action buttons)
4. Search input
5. Rules table
6. Footer

### Tab Bar

Three tabs across the top of the content card:

| Tab | Active State | Badge |
|---|---|---|
| Rules | Blue filled | — (or unread indicator) |
| Version history | Grey/inactive | — |
| Updates from Vixichain | Grey/inactive | Badge showing count (e.g. "2") |

Active tab has blue/filled styling (fills: #CAE4F5 background); inactive tabs have no fill.

### Rules Header

| Element | Content |
|---|---|
| Section title | "Rules" |
| Version info | "v1 (updated 2024-09-01, 13:57 UTC)" |
| "Version history" link | Blue text link |
| "Create new rule" link | Blue text link |
| "Apply all changes" button | Primary button (blue gradient); greyed out / disabled until changes are made |
| Validation note | "Apply all changes to activate rule" (red text, shown when unsaved changes exist) |

### Search

- Input: "Rule name or description" placeholder (391px wide, 40px height, outlined)

### Rules Table Columns

| Column | Width | Filter | Sort |
|---|---|---|---|
| Rule name | 300px | No | Yes |
| Risk level | 103px | Yes | Yes |
| Client | 100px | No | Yes |
| Countries | 106px | Yes | Yes |
| Onboarding | 100px | No | Yes |
| Max Amt ($) | 100px | No | Yes |
| Type | 100px | No | Yes |
| Currencies | 100px | No | Yes |
| Action | 100px | No | Yes |

### Sample Rule Rows

**Row 1:**
| Rule name | Risk level | Client | Countries | Onboarding | Max Amt ($) | Type | Currencies | Action |
|---|---|---|---|---|---|---|---|---|
| Large outgoing (10k) / "Outgoing transactions larger of equal to 10k" | Medium (amber) | Individual | Georgia | Doc KYC | 1,000,000.00 | All | nUSD | Accept |

**Row 2:**
| Large outgoing (10k) / ... | High (red) | Business | 127 countries | Non-doc KYC | 1,000,000.00 | Out | 2 currencies | Decline |

**Row 3:**
| Large outgoing (10k) / ... | Low (green) | All | Georgia | Doc KYC | 1,000,000.00 | Int, Out | VIXI | Accept |

**Row 4:**
| Large outgoing (10k) / ... | All | All | Georgia | Doc KYC | 1,000,000.00 | Int, Out | VIXI | Accept |

**Row 5:**
| Large outgoing (10k) / ... | Medium, High (multi-colored) | All | Georgia | Doc KYC | 1,000,000.00 | Int, Out | VIXI | Accept |

### Copy / Labels (exact text)

- "Rules" (section title)
- "v1 (updated 2024-09-01, 13:57 UTC)" (version badge)
- "Version history" (blue link)
- "Create new rule" (blue link)
- "Apply all changes" (primary button)
- "Apply all changes to activate rule" (red error text)
- "Rule name or description" (search placeholder)
- "Rule name" | "Risk level" | "Client" | "Countries" | "Onboarding" | "Max Amt ($)" | "Type" | "Currencies" | "Action" (column headers)
- "Large outgoing (10k)" (rule name example)
- "Outgoing transactions larger of equal to 10k" (rule description example)
- "Accept" | "Decline" (action values)
- "Medium" | "High" | "Low" | "All" (risk level values, color-coded)
- "Individual" | "Business" | "All" (client type values)
- "Doc KYC" | "Non-doc KYC" (onboarding type values)

### States

| State | Description |
|---|---|
| Default | Rules listed, "Apply all changes" button disabled (opacity 40%) |
| Unsaved changes | "Apply all changes" button active (blue gradient); red warning text visible |
| Empty | No rules created yet |

### Design Notes

- "SoF" column referenced in one Settings screen with "No"/"Yes" values — Source of Funds flag, may be on Rule level
- "Apply all changes" triggers a modal confirmation (see §6 for modal buttons: "Cancel" + "Apply")

---

## 6. Rule Details / Edit Rule

**Node ID:** #5:79914, #5:89664
**Purpose:** Create or edit a single compliance rule. Split view: rule form on left, country selection table on right.
**Entry point:** Click "Create new rule" link or click a rule row in the Rules table.

### Layout (top to bottom)

1. Top bar (no side menu? — Rules menu item highlighted, text "Compliance")
2. ← back navigation (bold back arrow + "back" text)
3. Rule form (left, ~506px)
4. Country selection table (right, embedded in form)
5. Footer

### Rule Form Fields

**Form header:**

| Element | Content |
|---|---|
| Title | "Edit rule" (or "Create new rule") |
| Description | "You are creating the rule that will accept transactions made by Vixi clients that have the following setup. You as a Validator will be automatically signing transactions with this set of parameters. Edit it to align your policies." |
| "Save rule" button | Primary blue gradient |

**Fields:**

| Field | Type | Example Value | Notes |
|---|---|---|---|
| Rule name | Text input (editable display) | "Large outgoing (10k)" | Styled as a chip/label inside a frame |
| Description | Text input | "Outgoing transactions larger of equal to 10k" | |
| Rule action | Radio buttons | Accept / Decline | One selected |

**Transaction section:**

| Field | Type | Options |
|---|---|---|
| Type | Checkboxes | Inbound (?), Outbound (?), Internal (?) |
| Currency | Checkboxes | nUSD, VIXI |
| Max Amount ($) | Number input | "10,000.00" |

**Sender section:**

| Field | Type | Options |
|---|---|---|
| Risk level | Checkboxes | Low, Medium, High |
| Type | Checkboxes | Individual, Business |
| Sender Country of Residence | Searchable country table | See country table below |

**Receiver section:**

| Field | Type | Options |
|---|---|---|
| Risk level | Checkboxes | Low, Medium, High |
| Type | Checkboxes | Individual, Business |
| Receiver Country of Residence | Searchable country table | See country table below |

### Country Selection Table (appears in both Sender and Receiver sections)

- Search input: "Search" placeholder
- **Columns:** Country (with checkbox + sort), Code (with sort), Risk level (with sort + filter), toggle column (38×18px)
- **Risk level values per country:** Unacceptable, Low (green), Medium (amber), High (red)

**Sample country rows:**

| Country | Code | Risk level |
|---|---|---|
| Afghanistan | AF | Unacceptable |
| Aland Islands | AX | Low |
| Albania | AL | Medium |
| Algeria | DZ | Unacceptable |
| American Samoa | AS | Unacceptable |
| Andorra | AD | Medium |
| Angola | AO | High |
| Anguilla | AI | Medium |
| Antigua and Barbuda | AG | High |
| Antarctica | AQ | Medium |

*(Full world country list implied — alphabetical, scrollable)*

### Actions / Buttons

| Button | Behavior |
|---|---|
| Save rule | Saves rule; triggers "Apply all changes" reminder |
| Cancel (modal) | Dismisses confirmation modal |
| Apply (modal) | Applies all rule changes across the system |
| ← back | Returns to Rules table |

### Confirmation Modal (Apply all changes)

- **Trigger:** Clicking "Apply all changes" on the Rules page
- **Title:** "Apply all changes"
- **Buttons:** "Cancel" (outlined blue) + "Apply" (blue gradient primary) — both 240×52px
- **Background overlay:** rgba(0,0,0,0.3) scrim over full page

### Copy / Labels (exact text)

- "Edit rule" / "Create new rule"
- "Save rule"
- "You are creating the rule that will accept transactions made by Vixi clients that have the following setup. You as a Validator will be automatically signing transactions with this set of parameters. Edit it to align your policies."
- "Rule name"
- "Description"
- "Rule action"
- "Accept" | "Decline" (radio options)
- "Transaction"
- "Type" — "Inbound" | "Outbound" | "Internal" (checkboxes with ? tooltips)
- "Currency" — "nUSD" | "VIXI"
- "Max Amount ($)"
- "Sender" | "Receiver" (section headers)
- "Risk level" — "Low" | "Medium" | "High"
- "Type" — "Individual" | "Business"
- "Sender Country of Residence" | "Receiver Country of Residence"
- "Search"
- "Country" | "Code" | "Risk level" (country table headers)

### Design Notes

- The menu item active label is "Compliance" (not "Rules") on the Rule details screen — this appears to be a naming inconsistency in Figma; the side menu item references `Desk/Button/Primary` style with text "Compliance".
- The country selection table is embedded inline (not a modal), scroll within the form.

---

## 7. Settings (Fee Configuration)

**Node ID:** #5:88636 (primary), variants at #5:88704, #5:88737, #5:88793, #5:88860
**Purpose:** Allows the BAV bank to configure per-transaction-type validator fees.
**Entry point:** Side menu → "Settings" (selected state: blue highlight).

### Layout (top to bottom)

1. Top bar
2. Content card (full width)
3. Footer

### Content Card

**Header row:**
- Title: "Settings" (Onest Medium 20px)
- "Save" button: Primary blue gradient (disabled/opacity 40% until changed)

**Fees subsection:**

| Element | Content |
|---|---|
| Section label | "Fees" (Onest Medium 16px) |
| Last updated | "2024-09-01, 9:50:34 (UTC)" |
| Updated by | "romanov@bank.com" |

**Fee table:**

| Transaction Type | Fee ($) | Tooltip | Notes |
|---|---|---|---|
| Inbound | $ 0.01 (editable input) | "Inbound transactions: from external network to Vixichain" | Max $0.07 hint shown below input |
| Outbound | $ 0.01 (editable input) | "Outbound transactions: from Vixichain to external network" | Max $0.07 |
| Internal | $ 0.01 (editable input) | "Internal transactions: sending and receiving within Vixichain" | Max $0.07 |
| Card (soon) | $ 0 (disabled/greyed) | — | Coming soon, disabled input |

**Tooltip content (shown on ? hover):**

| Type | Tooltip |
|---|---|
| Inbound | "Inbound transactions: from external network to Vixichain" |
| Outbound | "Outbound transactions: from Vixichain to external network" |
| Internal | "Internal transactions: sending and receiving within Vixichain" |

**Testnet note (tooltip on "Fees" label):**
> "In TestNet single fee is used"

### Actions / Buttons

| Button | Behavior |
|---|---|
| Save | Saves fee configuration; button enabled only when values changed |
| Cancel | Cancels pending changes (outlined blue button) |

### Copy / Labels (exact text)

- "Settings" (page title)
- "Save"
- "Cancel"
- "Fees"
- "Transaction type" (table column)
- "Fee, $" (table column)
- "Inbound" | "Outbound" | "Internal" | "Card (soon)"
- "$ 0.01" (default fee example)
- "Max $0.07" (constraint hint)
- "In TestNet single fee is used" (tooltip)
- "Last updated" label
- "Inbound transactions: from external network to Vixichain"
- "Outbound transactions: from Vixichain to external network"
- "Internal transactions: sending and receiving within Vixichain"

### States

| State | Description |
|---|---|
| Default | Fees loaded, Save button disabled |
| Editing | Save button active (blue gradient) |
| Testnet | Single fee field shown (not per-type) per tooltip note |

---

## 8. Version History (Vers.history)

**Node ID:** #5:88628, #5:88630, #5:88632, #5:89105, #5:89232
**Purpose:** Audit trail of compliance rules versions — shows who changed rules, when, and allows restoring previous versions.
**Entry point:** Rules page → "Version history" tab or "Version history" link.

### Layout (top to bottom)

1. Top bar
2. Content card
3. Footer

### Content Card

**Header:**
- Tab bar: Rules | **Version history** (active) | Updates from Vixichain
- Title: "Version history"
- Subtitle: "New version is saved when you save changes to the rules"

**Table columns:**

| Column | Width | Notes |
|---|---|---|
| Version | 90px | v1, v2 … v10 |
| Time updated (UTC) | 130px | "2024-09-01, 13:57" |
| Who updated | 150px | "Alex Romanov" |
| Comment | fill | "—" or "View Comment" link (blue) |
| Actions | fill | "Restore this version" link (blue) |

**Sample rows:**

| Version | Time | Who updated | Comment | Actions |
|---|---|---|---|---|
| v10 "Current" | 2024-09-01, 13:57 | Alex Romanov | — | — (current) |
| v9 | ... | ... | View Comment | Restore this version |
| v8 | ... | ... | — | Restore this version |
| v7 | ... | ... | — | Restore this version |
| v6 through v1 | ... | ... | — | Restore this version |

### Actions / Buttons

| Button | Behavior |
|---|---|
| View Comment | Opens comment text for that version |
| Restore this version | Reverts rules to the selected version |

### Copy / Labels (exact text)

- "Version history" (tab + page title)
- "New version is saved when you save changes to the rules"
- "Version" | "Time updated (UTC)" | "Who updated" | "Comment" (column headers)
- "Current" (badge on latest version)
- "View Comment" (blue link)
- "Restore this version" (blue link)

---

## 9. Updates from Vixichain

**Node ID:** #5:89578, #5:89637
**Purpose:** Notifications feed of changes to default/system rules pushed by Vixichain — the bank validator can review what Vixichain changed in baseline compliance rules.
**Entry point:** Rules page → "Updates from Vixichain" tab (shows unread badge count, e.g. "(2)").

### Layout (top to bottom)

1. Top bar
2. Content card
3. Footer

### Content Card

**Header:**
- Tab bar: Rules | Version history | **Updates from Vixichain** (active, blue filled)
- Title: "Updates from Vixichain"
- Subtitle: "Notifications about default rules updates made by Vixi"

**Table columns:**

| Column | Width | Notes |
|---|---|---|
| Notification | 300px | Change description text |
| Time (UTC) | 180px | Date + time |

**Sample rows:**

| Notification | Time |
|---|---|
| "Changed %this parameter/field name% %here% from %this% to %that%" (bold/highlighted = new/unread) | 2024-09-01 9:50:23 |
| "Changed %this parameter/field name% %here% from %this% to %that%" (regular = read) | 2024-09-01 9:50:23 |
| Long text "…from %this% to %that%…" with "View" link (blue) at end | 2024-09-01 9:50:23 |

### States

| State | Description |
|---|---|
| With updates | Table populated; unread rows shown in bold/primary style |
| Empty | Icon + "No updates yet" (grey, centered, with an icon) |
| Badge | "(2)" appended to tab label when unread count > 0 |

### Copy / Labels (exact text)

- "Updates from Vixichain" (tab + title)
- "Notifications about default rules updates made by Vixi"
- "Notification" | "Time (UTC)" (column headers)
- "Changed %this parameter/field name% %here% from %this% to %that%" (notification template)
- "View" (blue link, shown when notification is long)
- "No updates yet" (empty state)

---

## 10. Node Notification Emails

**Node ID:** #5:73204 (Email instance on canvas)
**Purpose:** Transactional email template sent to BAV bank users when their validator node experiences issues (goes offline or has performance problems).
**Platform:** Email HTML (640px wide)

### Email Structure

| Section | Content |
|---|---|
| Header banner | Blue gradient (linear: #E8F5FF → #B3D2F3) with Vixi logo top-left; decorative crypto coin images |
| Body | Vixi logo; greeting; body text; CTA button; support text |
| Footer | Social icons (Twitter, LinkedIn, Facebook, Instagram, Discord); App store badges; Logo; Copyright + Unsubscribe |

### Email Header

- **Subject/heading:** "Issues Detected on Your Node" (Verdana Bold 28px, #000000)

### Email Body Copy

**Salutation:** "Dear [User's Name],"

**Body paragraph:**
> "We have detected issues affecting the performance of your node. Our team is already working on resolving them to ensure smooth operation. No action is required from your side at this time. You can log into your BAV panel to review the details if needed:"

**CTA Button:** "Login" (blue gradient, 240×52px, 12px radius)

**Support paragraph:**
> "Have questions? please use our support form [https://vixichain.org/contact-us/](https://vixichain.org/contact-us/) or send us an email directly to [support@vixichain.org](mailto:support@vixichain.org). Our Support Team will be happy to assist you and will reply shortly."

**Sign-off:**
> "Sincerely, The Vixichain Team"

### Email Footer

| Element | Content |
|---|---|
| Copyright | "Copyright © Vixichain. All rights reserved." |
| Unsubscribe | "Unsubscribe here" (blue bold link) |
| Social icons | Twitter, LinkedIn, Facebook, Instagram, Discord |
| App badges | Apple App Store (black), Google Play (black) |

### Email Trigger Conditions

Per the Node Info user story sticky:
- Node going offline
- High CPU usage
- High memory usage
- High disk usage
- Network connection issues

---

## 11. Filters & Tooltip States (Design Overlays)

**Node IDs:** Group #5:73899 ("Filters & Hovers"), Frame #5:73975 ("Search, empty state, loading")
**Purpose:** Design documentation showing filter dropdown states and column tooltip annotation (not a separate screen — overlaid on canvas for design reference).

### Transaction Table Filter Dropdowns

**Amount ($) filter:**
- Input "From" (placeholder "0.0000") and "To" (placeholder "0.0000")
- "Clear" button (outlined)

**Status filter dropdown:**
- Title: "Transaction Status"
- Options (each as a selectable row): Pending (amber), Confirmed (green), Declined (red), Failed (red), Cancelled (grey)

**Timestamp filter dropdown:**
- Title: "%Timestamp name%"
- Two date-time inputs: From / To
- "Clear" button

**Transaction type filter:**
- Title: "Transaction type"
- Options: Inbound, Outbound, Internal

**Sender / Receiver filter:**
- Title: "Sender" or "Receiver"
- Three inputs: Risk level (dropdown/select), Country (dropdown), Type (dropdown "Individual")
- "Clear" button

### Table Column Tooltips

| Column | Tooltip text |
|---|---|
| Tx hash row 1 | "Vixichain transaction hash" |
| Tx hash row 2 | "Internal transaction ID" |
| Tx hash row 3 | "Transaction type" |
| Sender risk cell | "Sender's risk level" |
| Sender country cell | "Sender's country" |
| Sender type cell | "Sender's type" |
| Receiver risk cell | "Receiver's risk level" |
| Receiver country cell | "Receiver's country" |
| Receiver type cell | "Receiver's type" |

### Design Notes from Figma

- "Pagination - see in components" (links to components page node 7444-71317)
- "Search, empty state, loading: as in other tables"
- "Should work the same as in Admin" (re: filter/hover behavior — see `03-admin-app.md`)
- "Copy icon - copies" (clicking hash/ID copies to clipboard)
- "Changes from prev. version: Added Earnings to the dashboard; Table cell sequence updates"
- "please check min/max of every cells: I have calculated them to be adaptive and with 'rezina'" (rezina = rubber/fluid)
- "As we have a mobile app now, for web we can have hor scroll (for now) — L/R paddings changed"

---

## 12. Side Menu Component

**Component ID:** 5:38151 ("type=full, version=BaV")
**Size:** 240×752px (standard) or 240×1120px (tall variant)
**Background:** #F0F9FF (light blue tint)
**Border:** 1px #DAF0FF
**Border-radius:** 16px
**Shadow:** 0 0 10px rgba(0,0,0,0.05)

### Menu Structure

**Section: Wallet**

| Icon | Label | State |
|---|---|---|
| icon/layout | Dashboard | Default idle |
| icon/transactions | Transactions | Default idle |
| icon/users | Members | Default idle |
| icon/address book | Address Book | Default idle |
| icon/Reward | Rewards (soon) | Disabled (opacity 30%) |

**Section: Validator**

| Icon | Label | Active State |
|---|---|---|
| icon/transactions signed | Transactions | Selected (blue background, white text) |
| icon/rules | Rules | Selected variant |
| info | Node info | Selected variant |
| settings | Settings | Selected variant |

**Menu item active style:** Blue background (#0166D5), white text (Desk/Button/Primary style)
**Menu item default style:** Transparent background, black text

**Status badges (on menu items):**
- "3" blue pill (#006BD9) on Rules item — unread rule updates count
- "Offline" red pill (#ED523D) on Node info item — when node is offline

### Bottom Earnings Card

Shown at bottom of side menu:
- Label: "Earnings" (grey hint)
- Token: VIXC icon + "6,531.78 VIXC" (medium weight)
- USD: "$ 6,531.78 Total fees received" (hint grey)

### Collapse Control

Arrow icon at bottom-right of side menu to collapse/expand the sidebar.

---

## 13. Design Tokens & Color Reference

### Typography (Onest font family throughout)

| Token | Style | Weight | Size | Usage |
|---|---|---|---|---|
| Desk/Title/Primary | SemiBold | 600 | 24px | Page titles, VIXC balance |
| Desk/Title/Secondary | Medium | 500 | 20px | Section titles, "Earnings" |
| Desk/Title/Tertiary | SemiBold | 600 | 14px | Column headers, rule names |
| Desk/Header/Secondary | Regular | 400 | 28px | Bank name in top bar |
| Desk/Button/Primary | SemiBold | 600 | 16px | CTA buttons (white text) |
| Desk/Button/Secondary | SemiBold | 600 | 14px | Secondary links, tab labels |
| Desk/Text/Primary | Regular | 400 | 16px | Body content |
| Desk/Text/Primary-Med | Medium | 500 | 16px | Emphasized body |
| Desk/Text/Secondary | Regular | 400 | 14px | Table cells, descriptions |
| Desk/Text/Secondary-Med | Medium | 500 | 14px | Mainnet label, semi-bold body |
| Desk/Text/Hint | Regular | 400 | 12px | Grey hints, timestamps |

### Colors

| Token / Usage | Hex |
|---|---|
| Primary blue | #0166D5 |
| Light blue (hover/active) | #0098FF |
| Button gradient | linear-gradient(90deg, #0166D5 0%, #0098FF 100%) |
| Background white | #FFFFFF |
| Background light blue | #F0F9FF |
| Background tint | #DAF0FF |
| Border grey | #F2F2F2 |
| Border dark grey | #E5E5E5 |
| Text primary | #000000 |
| Text grey (hint) | #808080 |
| Text light grey | #B2B2B2 |
| Text very light | #B3B3B3 |
| Green (success/low risk) | #00992B |
| Amber (pending/medium risk) | #D98A00 |
| Red (error/high risk/decline) | #FF6651 |
| Admin action (purple) | #636CF3 |
| Page section yellow | #FFEA74 (sticky note bg) |
| Amber sticky | #FDCD5D |

### Shadows

| Token | Value |
|---|---|
| Drop Shadow/10 | 0px 0px 10px 0px rgba(0,0,0,0.05) |
| Drop Shadow/20 | 0px 0px 20px 0px rgba(0,0,0,0.2) |
| Card shadow | 0px 0px 10px 0px rgba(49,44,75,0.1) |

### Risk Level Color Mapping

| Level | Color | Hex |
|---|---|---|
| Low | Green | #00992B |
| Medium | Amber | #D98A00 |
| High | Red | #FF6651 |
| Unacceptable | Grey | #808080 |
| All | Black | #000000 |

---

## Navigation Flow Summary

```
Side Menu
├── [Wallet section]
│   ├── Dashboard          → (wallet user screens, see 05-vixi-wallet-screens.md)
│   ├── Transactions       → (wallet tx list)
│   ├── Members            → (wallet members)
│   ├── Address Book       → (wallet address book)
│   └── Rewards (soon)     → disabled
│
└── [Validator section]
    ├── Transactions        → §3 Signed Transactions (Validator Dashboard)
    ├── Rules              → §5 Rules Table
    │   ├── [tab] Rules              → §5
    │   ├── [tab] Version history    → §8
    │   └── [tab] Updates from Vixi → §9
    ├── Node info           → §2 Node Info Dashboard
    └── Settings            → §7 Settings (Fee Config)

Rules Table
└── Row click / Create new rule → §6 Rule Details / Edit Rule
        └── Apply all changes → Confirmation modal → Return to Rules

Signed Transactions
└── Row click → §4 Transaction Detail
```

---

*Total lines read from source file: 13,582 (all lines)*
*Screens documented: 9 distinct screen types (Node Info, Signed Transactions, Transaction Detail, Rules, Rule Details/Edit, Settings, Version History, Updates from Vixichain, Email)*
*Responsive variants documented: 6 breakpoints (460, 768, 900, 1186, 1440, 1920px)*
*Figma source: YHKGP7o2yXw4WnVIZFGOgl, canvas node 5:73100 ("Wallet+BAV")*
