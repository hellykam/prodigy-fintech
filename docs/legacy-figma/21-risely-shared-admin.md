# Risely [shared] — Admin Panel

**Source:** Figma "Risely [shared]" (`o9Zj5gukNqAstKo8pUebcV`), `Admin` page
**Node:** `3:133651`
**Canvas size:** ~21155px wide
**Purpose:** Admin panel for Risely operations team (internal use)

---

## 1. Design Tokens

| Token | Value |
|---|---|
| Brand accent | `#FFB800` (amber/gold) — "Main" color |
| Sidebar background | `#121212` (near-black) |
| Sub-section header text | `#FEBA10` (amber) on `#0E0E0E` background |
| Section strip color | `#FFB800` — 12px top gradient strip on each section |
| Font | Gilroy (same as mobile app) |
| Improvement annotation | fill `#FFF5E9`, border `#FF9601` — orange |
| Fix annotation | fill `#FFE4EE`, border `#FF714E` — red |
| Yellow section header (Start here) | fill `#F6C851` |
| Reference screens (competitor) | `Figma header` component, fill `#A074DE` (purple), opacity 0.4 |
| Design intent header | `Figma header` component, fill `#910C0C` (dark red) |

---

## 2. Admin Layout

**Dashboard frame:** 1440px wide, `fills=#FFFFFF`, row layout:

| Column | Component | Width | Notes |
|---|---|---|---|
| Sidebar | `Admin Sidebar Menu` (Open=On / Open=Off) | 242px (inner frame) | `#121212` dark bg, padding 16px 16px 0px, gap 6px |
| Main content | Full height fill | fill | column layout |

**Main content layout:**
- Top bar: padding `20px 40px`, space-between — breadcrumb + user info
- Content area: padding `20px 40px 120px`, gap `20px`

**Sidebar states:** `Open=On` (expanded, menu items visible) / `Open=Off` (collapsed)

---

## 3. "Start here" — Design System Guidelines

This section documents design rules that apply to all admin screens.

### 3a. Menu (Sidebar)

- Component: `Admin Sidebar Menu` (`6:36156`)
- Background: `#121212`
- Padding: `16px 16px 0px`, gap `6px`
- Inner menu frame: 242px fixed width

### 3b. Breadcrumbs

Navigation breadcrumb trail appears in the top bar of every admin page.

### 3c. Breakpoints / Responsiveness

Design notes exist for responsive behavior — details in annotation comments.

### 3d. Font

Annotation note: improvement needed for font choices. Gilroy is primary.

### 3e. Table Template

**Framework: Ant Design** → [ant.design/components/table](https://ant.design/components/table)

All admin tables use Ant Design table components. This is the standard table implementation.

### 3f. URLS with ID + Links

Admin panel URLs include entity IDs in path. Example annotation shows "system menu" → how navigation and deep-link URLs are structured. Two screenshots included in design as reference.

### 3g. Deleting / Blocking Entity

**Component:** `Modal Popup / Delete` (`6:125683`)
- Size: 460px wide
- Padding: 24px
- Border radius: 20px
- Background: `#FFFFFF`

Standard delete/block confirmation modal used across the admin panel.

### 3h. Timestamps

Annotation documents standard timestamp display format (detail in comment).

### 3i. Every Entity / Page

Annotation defining the standard structure for every entity-type admin page (list view + detail view).

### 3j. Info Card Components

Two card component sizes documented:
- 611×982px — small info card
- 2467×1650px — wide/large info card

---

## 4. Admin Screens

### 4a. Dashboard

**Frame:** `Dashboard` (`#6:127301`), 1440px wide

Standard admin home screen. Sidebar + main content area with:
- Breadcrumb/header bar (top)
- Content area with gap 20px and bottom padding 120px

### 4b. Liquidity

**Frame:** `Liquidity` (`#6:127659`), 1440px wide

Financial liquidity monitoring page. Three sub-sections:

#### Crypto Wallets

Two-level expandable list:
- **Level 1 (Network/Wallet):** Ethereum, Tron, Bitcoin, etc.
- **Level 2 (Token):** USDC, USDT, BTC, TRX, etc.

| Level | Columns |
|---|---|
| Network/Wallet | Token count, Total value ($), Pending TX count, GAS token amount, GAS token value ($), Wallet Address, GAS Address |
| Token | Symbol, Amount, $ Value, Pending TX count, Pending TX Amount, Pending TX Value ($) |

Filters: Network and/or Token Symbol (Multi-Input Filter)
Totals: SUM of Total Value ($) shown at both levels

#### FIAT Wallets (BaaS)

Two-level expandable list:
- **Level 1 (BaaS/Wallet):** Narvi, Bancor, etc.
- **Level 2 (Currency):** EUR, USD, GBP, etc.

| Level | Columns |
|---|---|
| BaaS/Wallet | Currency count, Total value ($), Pending TX count, Account Number |
| Currency | Symbol, Available Amount, Value ($), Pending TX Count, Pending TX Amount, Pending TX Value ($) |

Example data: "1kEUR, Value $1.2K USD, Pending TX Count #100, Pending TX Amount 304k EUR, Pending TX Value $310k USD"

Filters: BaaS/Wallet and/or Currency Symbol (Multi-Input Filter)

#### Liquidity Providers (B2C2, etc.)

Two-level expandable list:
- **Level 1 (Provider):** B2C2, etc.
- **Level 2 (Currency):** EUR, USD, GBP, USDT, USDC, BTC, etc.

| Level | Columns |
|---|---|
| Provider | Currency count, Total value ($) |
| Currency | Symbol, Amount, Value ($) |

Filters: Provider Name and/or Currency Symbol (Multi-Input Filter)

**Design note:** "We don't show client's details here"
**BaaS expansion label:** "2nd level is table inside 1 line + collapses bottom: totals in $"

### 4c. Transactions (2 sections)

**Nodes:** `#6:129271` (Frame 1171278522) + `#6:131062` (Frame 1171278523)

Two large sections with dark red `Figma header` (`#910C0C`) annotation headers, each containing:
- Multiple screen groups (some at opacity 0.4 = reference/competitor analysis)
- Actual admin screen frames (1440px wide)
- Complex layouts with many sub-groups suggesting rich transaction management UI

Based on frame structure, these cover the full transaction management flow:
- Transaction list (table with filters)
- Transaction detail

### 4d. Settings / Entity Sections

**Nodes:** `#6:132822` (Frame 1171278530) + `#6:132833` (Frame 1171278521) + `#6:132997` (Frame 1171278529)

Three additional sections containing:
- Blue annotation notes (`#EBECFF/#263AB1`) — design questions/decisions
- Dark sub-headers on `#0E0E0E` background
- Mix of active (full opacity) and reference (semi-transparent) screens

### 4e. Transaction Fee Settings

**Node:** `#6:133013` (Frame 1171278518), 1440px wide

Confirmed frame names inside:
- `System setting>Transaction fee` (1440×1008px, 2 iterations — likely view + edit states)
- `Crypt transaction More details` — transaction detail side panel
- `Save changes` modals (898px wide for large form, 460px for confirmation)

**Note:** Reference competitor screens at opacity 0.4 shown for comparison.

### 4f. Users / Roles Management

**Node:** `#6:133624` (Frame 1171277773)

Confirmed screens:
- `Table` (1440px) × 2 — user list views
- `Client` (1440px) — client detail view
- `Save changes` modal (460px)
- `Modal Popup / Delete` — remove user/role

Design annotations (in reference area at opacity 0.4):
- "Need to see who is on which role"
- "Need to have 'Suspend role' & 'suspend users in this role'"
- "Sensitive info — on/off only" (for sensitive data visibility control)
- "Where are all roles?"

**Connector note:** "should be filtered by role" — indicates role-based filtering requirement on user tables.

### 4g. Client Support

**Node:** `#6:133861` (Frame 1171278525)

Sub-section 1 — **Client Support** screens:

Confirmed frames:
- `Client support` (1440×673px) × 2 iterations
- `Entity` (1440×920px) — entity detail view for support agents
- Annotation: **"We should have 1 table with good filters & search"**

Open design questions (from annotations):
- "Which data is not available for support? Only address and DOB? How about system ID? Link to client's page?"
- "Ask documents" — ability for support to request documents from clients

Sub-section 2 — **Reference screenshot** (at opacity 0.5):
- Annotation: "A bit not readable, not ok for mvp — no need to change" — existing implementation screenshot shown for reference, flagged as readable issue but deferred from MVP scope.

### 4h. Current Version (Screenshots Reference)

**Node:** `#6:133007` (Frame 1171278527)

Header: **"Current version"** (Gilroy SemiBold 600, 90px, `#FEBA10` color, letterSpacing -0.04em, on `#0E0E0E` background)

Contains screenshots of the already-implemented admin panel (1649px wide container, full-page screenshots). Used as reference for what is already built vs. what is being designed.

---

## 5. Modal Components

| Component | Node | Size | Padding | Border radius | Use |
|---|---|---|---|---|---|
| `Modal Popup / Delete` | `6:125683` | 460px wide | 24px | 20px | Entity deletion/block confirmation |
| `Modal Popup / Delete` | `6:74812` | 460px wide | 24px | 20px | Second delete modal variant (Users section) |
| Save changes (small) | — | 460px wide | 24px | 20px | Confirmation of save action |
| Save changes (large) | — | 898px wide | 24px | 20px | Multi-field form save confirmation |

---

## 6. Annotation Color Coding System

| Color | Type | Meaning |
|---|---|---|
| `#FFF5E9` fill / `#FF9601` border | Improvement | "state=yellow" — feature improvement needed |
| `#FFE4EE` fill / `#FF714E` border | Fix | "state=red" — something broken/to fix |
| `#EBECFF` fill / `#263AB1` border | Comment | "state=blue" — general design comment/question |
| `#F6C851` (yellow header) | Section label | Start Here section labels |
| `#910C0C` (dark red) | Figma header | Design intent header for a major section |
| `#A074DE` (purple) | Figma header | Competitor reference screen (opacity 0.4) |

---

## 7. Screen Inventory Summary

| Screen | Frame name | Width | Status |
|---|---|---|---|
| Dashboard | `Dashboard` | 1440px | Designed |
| Liquidity | `Liquidity` | 1440px | Designed (detailed requirements) |
| Transactions (list + detail) | `Table`, `Frame` | 1440px | Designed (2 sections) |
| System setting — Transaction fee | `System setting>Transaction fee` | 1440px | Designed (reference competitor + own design) |
| Crypto transaction more details | `Crypt transaction More details` | ~490px panel | Designed (side panel) |
| Users/Roles list | `Table`, `Client` | 1440px | Designed with open Qs |
| Client support | `Client support` | 1440px | Designed (2 iterations) |
| Entity detail | `Entity` | 1440px | Designed |
| Current version reference | (screenshots) | 1649px+ | Reference only |
