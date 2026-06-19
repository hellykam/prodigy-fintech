# Risely [my file] — Admin Panel Page

**Source:** Figma "Risely [my file]" (`Qwbr3pXZJjh72Fx7kJOmqP`), page `Admin` (`#3:133651`)
**Status:** NOT documented in prior passes. Entirely new.
**Purpose:** Full admin back-office design for Risely — compliance, client management, liquidity, transactions, roles, support, marketing.

---

## 1. Page Overview

| Section | Node | Key content |
|---|---|---|
| Start here (design system notes) | `#6:126990` | Sidebar menu, breadcrumbs, fonts, table template, URL patterns, delete modal, timestamps |
| Dashboard | `#6:127255` + `#6:127644` | Main admin dashboard (dark sidebar + content area, 1440px) |
| Dashboard / Liquidity | `#6:127649` | Liquidity management — CRYPTO + FIAT + Providers; full Nelli specs |
| Clients | `#6:129271` | Client table, client page, activity timeline, page-type variants by KYC status |
| Transactions | `#6:131062` | Transactions table, transaction detail (×5 states), approve/reject popups, doc upload |
| Compliance: crutch made by Antier | `#6:132822` | Screenshots of current compliance module + critique notes |
| Referrals | `#6:132833` | Referrals table + mobile preview (active vs not-active states) |
| Marketing | `#6:132997` | Marketing module screenshots — only table component update needed |
| Activity | `#6:133007` | Activity table + popup UI screenshots (current version) |
| System Settings / Fees | `#6:133013` | Fees table, "Save changes" popups, crypto transaction detail, fee settings screens |
| Roles / Admin Users | `#6:133624` | Role tables, delete modal, "suspend role" requirement, sensitive-info flag |
| Support | `#6:133861` | Client support view, "1 table + filters" requirement, data-access question |

---

## 2. Design System Notes ("Start here" — `#6:126990`)

### 2.1 Sidebar Menu

Component: `Admin Sidebar Menu` (`#6:36156`)

| Variant | ID | Width | Fill |
|---|---|---|---|
| Open=On | `6:36157` | 242px inner frame, padding `16px 16px 0px 16px`, gap 6px, padding-bottom 40px | `#121212` dark |
| Open=Off | `6:36169` | 242px, fixed height 788px, padding-bottom 90px | `#121212` dark |

- Annotation: **"Breadcrumbs"** — breadcrumb component must accompany all admin pages
- Yellow comment (`Improve/20` `#FFF5E9`, `Improve/100` `#FF9601` border) — note about sidebar behavior

### 2.2 Table Template

> **"Table template: [Ant.des](https://ant.design/components/table)"** (underlined link)

- Red Fix comment (`Fix/20` `#FFE4EE`, `Fix/100` `#FF714E` border) — issue flag on current table
- Yellow Improve comment — improvement suggestion
- Minimum table requirements (from various sections):
  - Search + filters
  - Clickable rows
  - Ability to copy cell content
  - Statuses shown as text
  - Hide/show columns ("hide col with 'b...'")

### 2.3 URL Pattern ("URLS with ID + Links")

Frame `#6:127012` (1078×667px):
- Diagram showing URL structure with "system menu" label
- Two image screenshots of URL patterns
- Red connector arrows illustrating navigation flow
- "system menu" label text at x:268, y:403

### 2.4 Delete / Block Entity

`Modal Popup / Delete` component (`#6:125683`, key: `d2191ada`):
- Size: 460×hug, `padding: 24px`, borderRadius 20px, white fill
- Inner `Frame 1171278359`: `padding: 0px, gap: 20px, alignItems: stretch`

### 2.5 Timestamps

- Annotation: must include "created" and "terminal state" timestamps on every entity

### 2.6 Every Entity Page

- Annotation: standard per-entity page structure required across all admin sections

### 2.7 Info Card Components

- `Frame 1171278581` (611×982, white) — compact info card
- `Frame 1171277797` (2467×1650, white) — expanded/full info card reference

### 2.8 Breakpoints / Responsiveness

- Yellow Improve comment on breakpoint handling requirements

### 2.9 Font

- Yellow Improve comment on admin font (implied: Mulish or Gilroy, matching app)

---

## 3. Dashboard (`#6:127255` + `#6:127644`)

### Active Design

`Dashboard` frame (`#6:127301`, 1440×hug, white fill):

| Component | Details |
|---|---|
| `Sidebar Navigation` | `Admin Sidebar Menu, Open=On`, padding `16px 16px 158px`, fill `#121212`, height fixed |
| Main content area | `Frame 1171278313`: column, alignItems center, fill/fill sizing |

**Right-side annotations (yellow Improve stickers):**
- `# of transactions` label — shows where transaction count KPI should appear
- `image 509` (113×85) — screenshot reference for KPI card design
- `image 516` (114×58) — screenshot reference for transaction count element

**Dimmed old version** (`Group 1171277721`, opacity 0.4):
- 3 dashboard variants side by side (1288px, 1440px, 1619px widths)
- Purple "Figma header" labels on each variant (indicating old/WIP)

---

## 4. Dashboard / Liquidity (`#6:127649`)

### Header

> **"Liquidity Management — version confirmed by business — full"** (amber `#F6C851` header)

### Active Design

`Liquidity` frame (`#6:127659`, 1440×hug, white, padding-bottom 200px):
- `Frame 1171278310` — top header bar (row, padding `20px 40px`, space-between)
- `Frame 1171278398` — main content column (padding `0px 40px`, gap 24px)
- `Frame 1171278407` — bottom section (padding `60px 40px 30px`)

### Liquidity Spec (from Nelli's written annotation `#6:128590`)

**CRYPTO liquidity — two-level expandable table:**

| Level | Content |
|---|---|
| Level 1: Network/Wallet | Token count, Total value ($), Pending TX count, GAS token amount, GAS token value ($), Wallet Address, GAS Address |
| Level 2: Token (expanded) | Symbol, Amount, $ Value, Pending TX count, Pending TX Amount, Pending TX Value ($) |
| Filters | Network AND/OR Token Symbol (Multi-Input) |
| Totals | SUM of Total Value ($) on both levels |

**FIAT liquidity — two-level expandable table:**

| Level | Content |
|---|---|
| Level 1: BaaS/Wallet (Narvi, Bancor, etc.) | Currency count (e.g., 1 = just EUR), Total value ($), Pending TX count, Account Number |
| Level 2: Currency (EUR, USD, GBP...) | Symbol, Available Amount, Value ($), Pending TX Count (#100), Pending TX Amount (304k EUR), Pending TX Value ($) (310k USD) |
| Filters | BaaS/Wallet AND/OR Currency Symbol (Multi-Input) |
| Totals | SUM Total Value ($) on both levels |

**Liquidity Providers — two-level expandable table:**

| Level | Content |
|---|---|
| Level 1: Provider (B2C2, etc.) | Currency count, Total value ($) |
| Level 2: Currency | Symbol, Amount, Value ($) |
| Filters | Provider Name AND/OR Currency Symbol (Multi-Input) |
| Totals | SUM Total Value ($) on both levels |

### Network Tiles Component

`Network Tiles` (`#6:40669`), within a scrollable frame (375×280, overflow y, padding-bottom 100px):

| Tile | ID | Check state |
|---|---|---|
| Ethereum | `6:40670` | ✓ selected |
| Tron | `6:40678` | unchecked |
| Bitcoin | `6:40686` | unchecked |
| Binance | `6:40694` | unchecked |

Each tile: row layout, padding 16px, alignItems center, gap 8px, fill white, border `#E7E9ED` bottom 1px

### Table Structure Notes

- "1st level" + "2nd level" (expandable rows with $sum columns)
- "2nd level is table inside 1 line + collapses bottom: totals in $"
- "We don't show client's details here"
- BaaS/Wallet structure: Narvi → EUR, USD CA, GBP; columns: Total value ($) = SUM(available $), Account Number

### Dimmed Drafts (`Group 1171277777`, opacity 0.2 — "Liquidity drafts")

- `Table` frame (1440×2601px) at x:1541 — earlier Liquidity table design
- Sidebar Navigation visible inside (dark fill, `#6:128412`)
- 3 sections labeled: "Network" + "BAAS" (purple `fill_702a0572` headers)
- "Make a diagram to show: btc liq. / cur total / red area to fulfill" (Naravi, EUR, CUR, B2C2 rows)
- "Nelli" text notes with detailed spec (same content as above but earlier draft)

---

## 5. Clients (`#6:129271`)

### Opened Questions

Red `Figma header` ("Opened questions", `#910C0C` fill, white text, 60px Bold)  
3 yellow Improve comments (`Improve/20`, `#FF9601` border)

### Client List (Table)

`Clients` frame (`#6:129281`, 1440×hug, white, at y:186):
- Standard admin layout: Sidebar Navigation (left) + content (right)
- Section label: **"Table"** (amber header)

**Table column annotations:**
- "Filter Country: selector/dropdown"
- "add column: updated"
- "Name should be first column"
- "Hide UID column from here and from Client's page"
- "Rename to: Country of Residence" (for country column)
- "Rename statuses" (status column)
- "change to button" (action column)
- "remove from here" (field removal)
- "Created from [date] to [date]" — date range filter
- "Risely ID (short, external use) for nelly: NK123456" — external-facing short ID
- "System ID — long, only internal use" — internal UUID
- "WHERE FROM THIS NATIONALITY COMES? phone? documents? selected country?" — open question about nationality data source
- "Which verification is it? ours? sumsumb? how to change that status?" — open question
- "why do we have empty data for mandatory fields?" — data completeness bug

**"Update table component for every table" spec:**
```
Min version:
  - search
  - filters
  - clickable lines
  - ability to copy from there
  - statuses = text
  - hide col with "b..."
```

**Note on KYC-verification tab:**
> "this is only people who applied to verification, its the same tab that is inside 'all users/KYC'"
> "Move these into the 1st and verification tab table and remove 2nd tab"

### Client Detail Page

`Client` frame (`#6:129355`, 1440×hug, white):
- Full page with Sidebar Navigation + content
- Sub-view: `Client - Activity = history = timeline` (`#6:129601`, 1440×hug)

`Entity` frame (`#6:130763`, 1440×3090, white) — full client entity page:
- `Sidebar Navigation` (left, padding `16px 16px 158px`, fill dark)
- `Frame 1171277077` (content, 1166px wide at x:274)
- `Frame 1171277052` (card, padding 24px, gap 20px, at x:862)

Small entity preview `#6:130951` (1440×887, white)

### Page Types by Client Status

| Status | Label |
|---|---|
| Active | `[Client status = Active - check f...]` |
| Registration / KYC pending | `Client status = Registration [KYC no...]` |
| Blocked + Rejected | `Client status = Blocked + Rejected` |
| Close request | `Close request` frame (1452×1075) |

### UI & States Section

- Header: **"UI & states"** (dark bg `#0E0E0E`, amber `#FEBA10` text)
- Contains UI element variations for the client page

### Processes & Flows Section

- Header: **"Processes & Flows"** (dark bg, amber text)
- `Group 1171277793` (2908×1727) — flow diagram
- `Frame 1171278554` / `Frame 1171278555` (1440×hug) — specific flow screens
- `Group 1171277794` (1787×3350) — additional flow variants

### Sidebar Menu Page Links (purple `fill_702a0572` "Figma header" labels)

- "Client's page"
- "Client Directory"
- "Client Directory + Client Verification = Client [...]"
- "Client Verification"
- Annotation: "Have here selected only the child (in all menu behaviour)"

---

## 6. Transactions (`#6:131062`)

### Opened Questions

Red `Figma header` ("Opened questions", same `#910C0C`)

### Transactions Table

`Transactions` frame (`#6:131081`, 1440px inner, at y:186):
- `Table line Transaction` component (`#6:131153`, key: `2fdf614c`) — reusable row component
  - Layout: row, fixed at x:784, y:28, width 1559
  - Fill: white, border-bottom `#E7E9ED` 1px
- `Frame 1171278536` (376px wide at x:2020) — action buttons column (gap 16px)

### Transaction Detail Pages (5 variants)

| Frame | x | Width | Notes |
|---|---|---|---|
| `Transaction` | x:0 | 1440×hug | State 1 |
| `Transaction` | x:1790 | 1440×hug | State 2 — connector arrows link back to table |
| `Transaction` | x:1740 | 1440×hug | State 3 (in large group) |
| `Transaction` | x:3480 | 1440×hug | State 4 |
| `Transaction` | x:5220 | 1440×hug | State 5 |
| `Transaction` | x:6960 | 1440×hug | State 6 |
| `Transaction = No reference` | x:0 | 1440×hug | No-reference variant |

**Connectors (gray `#A8A8A8`, 3px):**
- "Back to main" (×2) — from detail back to table
- "Opens activity screen" — from table row to activity
- Blue comment annotations at decision points

### Approve / Reject Popups

`Approve Transaction` (`#6:132035`, 460×hug, borderRadius 20px, white, padding 24px, gap 10px)
`Reject Transaction` (`#6:132050`, 460×hug, borderRadius 20px, white, padding 24px, gap 10px)

### Comparison — Mobile App Transactions

- **"Same transactions in Risely app (for context)"** — 1691px wide row of mobile screenshots
- Blue comment: context note for developers

### Document Upload

- **"Receive/upload received docs from client"** — `Frame 1171278540` (row, gap 20px)
- **"Activity tab / docs related to this transaction, uploaded by compliance, those should be only internal"** — `Frame 1171278543` (row, gap 20px)
- Note: compliance-uploaded docs must not be visible to clients

### Old Version (opacity 0.4)

`Group 1171277784` (3649×5226px):
- Purple "Figma header" labels (two at 1641px and 1924px): earlier transaction designs
- Screenshot references (1920×1120, 1920×1120, 1637×578, 1641×466)
- "ADD timestamps: created / terminal state" — annotation with arrows
- `Group 1171277783` (1739×2076) — additional old screens

---

## 7. Compliance: Crutch Made by Antier (`#6:132822`)

**Section header:** "Compliance: crutch made by Antier" (600px Gilroy SemiBold, `#101828`)

### Current Version

Dark header (`#0E0E0E`), amber label `#FEBA10`: "Current version"

4 screenshots of the existing Antier-built compliance module:
- `image 536` (1644×1119)
- `image 537` (1647×1118)
- `image 538` (1650×1116)
- `image 539` (1646×1117)

### Blue Comment (`Brand/secondary/50`, `#263AB1` border)

Context note explaining that the current compliance UI was built by Antier as a quick implementation ("crutch"), not to spec. Needs redesign.

---

## 8. Referrals (`#6:132833`)

### Active Design

`Table` frame (`#6:132837`, 1440×hug, white) — Referrals admin table

**Contextual mobile previews (375px frames):**
- "If Not active then in the app:" → `My Wallets - Main Wallet` frame 1 (375×1346, white)
- "If active, then in the app:" → `My Wallets - Main Wallet` frame 2 (375×1346, white)
- `Referrals` frame (375×hug, `Light gray` `#F4F6F9`) — referrals tab in app

`Frame 1171277075` (200×552, borderRadius 12px, border `#E7E9ED` 1px) — small info/actions card

**Purple labels** (showing alternate sidebar sections linked):
- Two purple "Figma header" labels (1250px wide + 390px wide at x:2056–3306)

### Deprecated

`Group 1171277779` right side: "Old version: was not found" (amber `#FEBA10`, opacity 0.4) — prior referrals design was not found / unavailable

---

## 9. Marketing: Only Update Table Component (`#6:132997`)

**Section header:** "Marketing: only update table component"

### Decision

> The marketing admin module only needs the **table component updated** — no full redesign required.

"Current version" (amber `#FEBA10` on dark `#0E0E0E`):
- `image 532` (1644×1119)
- `image 533` (1651×1116)
- `image 534` (1652×1126)
- `image 535` (610×379) — smaller UI detail

---

## 10. Activity: Table Component & Popup UI (`#6:133007`)

**Section header:** "Activity: table component & popup UI"

"Current version" (amber `#FEBA10` on dark `#0E0E0E`):
- `image 530` (1649×1115) — activity table full view
- `image 531` (1916×1120) — activity entry popup/detail

---

## 11. System Settings / Transaction Fees (`#6:133013`)

### Active Design

`Table` frame (`#6:133017`, 1440×hug, white, at y:194) — settings/fees table

**"Save changes" popups (×3 variants):**

| Frame | Size | Position |
|---|---|---|
| `Save changes` | 898×hug, borderRadius 20px | x:2261, y:194 (full form) |
| `Save changes` | 898×hug, borderRadius 20px | x:2261, y:1291 (shorter form) |
| `Save changes` | 460×hug, borderRadius 20px | x:2261, y:2364 (compact) |

### Dimmed Old Version (`Group 1171277733`, opacity 0.4, 7067×3215px)

- `Crypt transaction More details` frame (`#6:133264`, 490×844) — crypto transaction detail popup
- `System setting>Transaction fee` frame ×2 (`#6:133334`, `#6:133402`, 1440×1008 each) — fee configuration screens
- `Frame 1171278301` (at x:5047, y:539) — action area
- 3 screenshots (`image 84` 519×520, `image 85` 514×662, `image 86` 359×493) — existing fee UI
- `Group 1171277732` (3100×2536) — earlier design group

---

## 12. Roles / Admin Users (`#6:133624`)

### Active Design

Two `Table` frames side-by-side (each 1440×hug, white):
- Table 1 at x:0, y:179 — users/roles list
- Table 2 at x:1490, y:179 — alternate view or filter state

`Client` frame (`#6:133699`, 1440×hug, white, at y:1135) — admin user / role detail page

`Save changes` popup (`#6:133811`, 460×hug, borderRadius 20px, at x:2980, y:179)

`Modal Popup / Delete` component (`6:74812`, key `7d079aa0`, 460×hug, borderRadius 20px, at x:3471, y:179)

Connector: "should be filtered by role" (`#6:133837`, gray `#B3B3B3` 4px) — notes that admin user tables should be filtered by their assigned role

### Requirements (from dimmed old version, `Group 1171277759`, opacity 0.4)

| Requirement | Source |
|---|---|
| "Need to see who is on which role" (78.75px Bold) | Large annotation |
| "Need to have 'Suspend role' & 'suspend users in this role'" (78.75px Bold) | Large annotation |
| "Sensitive info: on/off only" | Access control annotation |
| "Where are all roles?" | Open question at arrow target |

- Screenshot: existing roles UI (1415×701, 1476×1009)
- "?" annotation at x:1481 (78.75px Bold) — unclear where current roles are in the system
- Arrow SVGs pointing from annotation to screenshot
- Blue comment (`Brand/secondary/50`, `#263AB1`) with additional context

---

## 13. Support / Client Support (`#6:133861`)

### Frame 1: Support Agent View (`#6:133862`)

Contains `Group 1171277772` (opacity 0.4, 5193×4012px):

**"We should have 1 table with good filters & search"** (26px Bold, white text in teal Figma header)

`Client support` frames ×4 (1440×673 each):
- Variant 1 at x:2036, y:2431
- Variant 2 at x:2036, y:3161
- `image 69` (1390×700) — screenshot reference at x:3506, y:2431
- `image 70` (1390×692) — screenshot reference at x:3506, y:3161

`Entity` frame (`#6:134188`, 1440×920, white, at x:0, y:1424) — entity detail in support context

`field` group (at x:1456, y:1585) — field component

**Open question annotation:**
> "Which data is not available for support? Only address and DOB? How about system ID? Link to client's page?"

- "Ask documents" annotation (at x:4353, y:3055) — support agent can request docs from client
- SVG connector arrows showing flow from support table to document request
- `Group 1171277717` (1440×848, at y:300) — additional view

### Frame 2: Current Version (`#6:134350`)

`Group 1171277760` (4936×1239, opacity 0.5):
- "A bit not readable, not ok for mvp - no need to change" (60px Bold) — explicit decision: don't fix current support UI for MVP
- `image 76` (1438×939) — current support module screenshot

---

## 14. Component Inventory

| Component | ID | Key | Notes |
|---|---|---|---|
| `Admin Sidebar Menu` (Open=On) | `6:36157` | `601885fc` | Dark sidebar, gap 6px, padding `16px 16px 40px` |
| `Admin Sidebar Menu` (Open=Off) | `6:36169` | `b6f35ad5` | Fixed height 788px, padding-bottom 90px |
| `Modal Popup / Delete` (v1) | `6:125683` | `d2191ada` | 460×hug, borderRadius 20px, padding 24px |
| `Modal Popup / Delete` (v2) | `6:74812` | `7d079aa0` | Used in Roles section |
| `Table line Transaction` | `6:131153` | `2fdf614c` | Row component, width 1559, border-bottom `#E7E9ED` |
| `Network Tiles` (Ethereum) | `6:40670` | `9ed28ceb` | 375px row, Check=true |
| `Network Tiles` (Tron) | `6:40678` | `e3f3680d` | Check=false |
| `Network Tiles` (Bitcoin) | `6:40686` | `a090b545` | Check=false |
| `Network Tiles` (Binance) | `6:40694` | `48763b92` | Check=false |
| `Office use / Comment` (yellow) | `6:37600` | `9c2ff1af` | `#FFF5E9` fill, `#FF9601` border |
| `Office use / Comment` (blue) | `6:37614` | `a55b58c5` | `#EBECFF` fill, `#263AB1` border |
| `Office use / Comment` (red) | `6:37607` | `beb4793a` | `#FFE4EE` fill, `#FF714E` border |
| `Office use / Link` | `6:70854` | `2fdf614c` | `#1052FF` fill, `Brand Colors/Primary Brand` border, borderRadius 12px |

---

## 15. Key Design Decisions & Annotations Summary

| Decision | Context | Section |
|---|---|---|
| Ant Design table as the table template | `https://ant.design/components/table` | Start here |
| Compliance is an Antier "crutch" — needs redesign | Current version screenshots only | Compliance |
| Marketing admin: only update table component | Explicit annotation | Marketing |
| Activity admin: table component + popup only | Current version screenshots | Activity |
| Support: "a bit not readable, not ok for mvp — no need to change" | Explicit decision, opacity 0.5 | Support |
| Referrals: "Old version: was not found" | No prior design to build from | Referrals |
| Liquidity: two-level expandable tables for CRYPTO, FIAT, Providers | Full spec from Nelli | Liquidity |
| Compliance-uploaded docs must be internal only | Annotation in Transactions | Transactions |
| Admin roles: must support "Suspend role" + "Suspend users in this role" | Large annotation | Roles |
| Short Risely ID (external): format NK123456 | Annotation in Clients table | Clients |
| System ID: long UUID, internal only | Annotation in Clients table | Clients |
| Nationality data source unknown | Open question in Clients | Clients |
| Support: unclear which fields hidden from support agents | Open question | Support |

---

## 16. Figma Links

| Resource | URL |
|---|---|
| This page | `https://www.figma.com/design/Qwbr3pXZJjh72Fx7kJOmqP/Risely--my-file-?node-id=3-133651` |
| Dashboard | `https://www.figma.com/design/Qwbr3pXZJjh72Fx7kJOmqP/Risely--my-file-?node-id=6-127301` |
| Liquidity | `https://www.figma.com/design/Qwbr3pXZJjh72Fx7kJOmqP/Risely--my-file-?node-id=6-127649` |
| Clients | `https://www.figma.com/design/Qwbr3pXZJjh72Fx7kJOmqP/Risely--my-file-?node-id=6-129271` |
| Transactions | `https://www.figma.com/design/Qwbr3pXZJjh72Fx7kJOmqP/Risely--my-file-?node-id=6-131062` |
| Roles | `https://www.figma.com/design/Qwbr3pXZJjh72Fx7kJOmqP/Risely--my-file-?node-id=6-133624` |
| Support | `https://www.figma.com/design/Qwbr3pXZJjh72Fx7kJOmqP/Risely--my-file-?node-id=6-133861` |
| Ant Design Table | `https://ant.design/components/table` |
