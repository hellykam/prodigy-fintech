# Risely [my file] — Sprints / DRs / Demos / QA Page

**Source:** Figma "Risely [my file]" (`Qwbr3pXZJjh72Fx7kJOmqP`), `Sprints/DRs/Demos/QA` page
**Initial node:** `6:215439`
**File key:** `Qwbr3pXZJjh72Fx7kJOmqP`
**Purpose:** Sprint tracking / design review file. Each section shows a feature across versions (V1 → Antier build → Dev build → Oct 10 update → Sprint N target), with annotations marking what to fix, improve, or question.

---

## 1. File Overview

### Pages in This File

| Page | Purpose |
|---|---|
| `Sprints/DRs/Demos/QA` | Sprint tracking: versions + annotations per feature |
| `Research & Ideation` | KYC flows, notifications, user journey maps |
| `Drafts` | Work-in-progress designs |

### How the Sprint Sections Work

Each section on the Sprints page follows the same horizontal layout pattern:

```
[Black sidebar label] → [Old version] → [Antier build] → [Dev build] → [Oct 10 update] → [Sprint N target] → [Sprint N+1] → [ClickUp link + sprint tickets]
```

Column headers use orange note stickers (`#FFF1D0` fill, `#FEA932` border):
- `"Old version"` / `"Version 1"` — original V1 design
- `"Current version from Antier"` — what Antier built (~Sep 24)
- `"Current version from Developer"` — what was actually deployed
- `"Version Oct 10"` / `"New version"` — Oct 10 updated design
- `"Sprint 2"` / `"Sprint 3"` — sprint-specific targets

### Annotation Color System

| Component | Fill | Border | Meaning |
|---|---|---|---|
| `Office use / Comment` `state=yellow` | `#FFF5E9` | `#FF9601` 1px | Improvement needed |
| `Office use / Comment` `state=blue` | `#EBECFF` | `#263AB1` 1px | Design question / decision |
| `Office use / Note` | `#FFF1D0` | `#FEA932` 2px | Sprint / version label |
| `Office use / Link` (green) | `#C0EBBB` | `#04AE04` 2px | ClickUp ticket link |
| `Office use / Link` (blue) | `#BBC6EB` | `#047EAE` 2px | Secondary ClickUp link |
| `header figma small` | `#ECC2B5` | `#E2E2E2` | Link to admin panel staging |

---

## 2. Section Inventory

All sprint sections confirmed in the Sprints page:

| Node | Section Name | Sprint |
|---|---|---|
| `#8:229728` | Main screen | Sprint 1–3 |
| `#8:227596` | Send Fiat / external wallet | Sprint 2 |
| `#8:227805` | Personal info | Sprint 2 |
| `#8:227872` | Security | Sprint 2–3 |
| `#8:227932` | Banking ID | Sprint 2–3 |
| `#8:228489` | Verification center | Sprint 2 |
| `#8:229066` | Profile Page UI Changes | Sprint 2–3 |
| `#8:228619` | Transactions List + Filters | Sprint 2 |
| `#8:229151` | Send crypto / external wallet | Sprint 2–3 |
| `#8:229804` | Receive Crypto — external → Risely | Sprint 2–3 |
| `#8:69346` | Oct 10 comparison (large) | — |
| `#8:74506` | Notifications | — |

---

## 3. Main Screen (`#8:229728`)

**Sprint coverage:** Sprint 1 & 2, Version Oct 10, Sprint 3

### Evolution Timeline

| Version | Frame | Notes |
|---|---|---|
| Version 1 | Original design | Baseline |
| Sprint 1 & 2 | `Main` component `8:227585` in frame `8:227747` | 375×812px |
| Version Oct 10 | Updated design | Amber header gradient updated |
| Sprint 3 | Additional refinements | — |

### Main Screen Design Spec (Sprint 1&2 target)

**Container frame:** `8:227747`, 375×812px

| Element | Value |
|---|---|
| Header background | `linear-gradient(225deg, rgba(255,235,57,1) 2%, rgba(255,158,45,1) 100%)` |
| Header height | ~270px |
| Header border radius | `0px 0px 30px 30px` |
| Balance amount | `$20,570.80` — Gilroy Medium 500, 50px, fill `#110D03` |
| "Total Balance" label | Gilroy Regular 400, 14px, lineHeight 18px |
| Action buttons row | y:270 — Receive / Send / Deposit / Withdraw |
| History section | `History upd` component `8:47336` |
| `Transaction Line` | component `8:226941` |
| Bottom nav | `Nav=Home` frosted glass component at y:728 |

**Nav bar spec (from `Nav` `8:47420`):**
- Fill: `rgba(255,255,255,0.75)` (`Materials/Chrome`)
- Backdrop filter: `blur(25px)`
- Box shadow: `0px 4px 30px 0px rgba(0,0,0,0.1)`

### Sprint Tickets (from ClickUp links)

| Ticket | Action |
|---|---|
| `86c0jmup6` | Remove "Topup" button |
| `86c0jmumg` | Rename "Deposit" → "Receive" |
| `86c0jmumh` | Rename "Transfer" → "Send" |
| `86c0jmukw` | Remove "Cards" from bottom navigation |
| `86c0jmuq3` | Adjust font sizes |
| `86c0jmun3` | Adjust padding |
| `86c0jmung` | Adjust colors |
| `86c0jmukx` | Hide marketing carousel |

---

## 4. Send Fiat / External Wallet (`#8:227596`)

**Sprint:** 2
**ClickUp:** "Send FIAT Assets from Risely Wallet to External Wallet"

### Screens

| Frame | Node | Size | Description |
|---|---|---|---|
| `"Send/other wallet Fiat" / version (Antier1010) / 04` | `8:227749` | 375×1234px | Scrollable form — uses `Headers` (`8:223632`) + `Send Content` (`8:224525`) |
| `"Send/other wallet Fiat" / version (Antier1010) / 09` | `8:227766` | 375×906px | Compact state |
| `iPhone 13 mini - 350` | `8:227783` | 375×812px | Future version target — uses `Headers mobile` (`8:225451`) + `Field` (`8:225579`) |
| Error messages spec | `8:227802` | 430×791px | Error state definitions |

### Form Fields

| Field | Required | Notes |
|---|---|---|
| Account Holder Name | Yes (*) | — |
| IBAN | Yes (*) | — |
| Receiver Email | No | — |
| Currency | Pre-selected EUR | Cannot change — "we have only euro" |

**Annotation:** "PLEASE MAKE FONT MEDIUM BLACK in every field" — font weight must be medium+dark across all input fields.

### Amount Validation Error Messages

4 error message templates defined in spec frame `8:227802`:

| State | Title | Copy pattern |
|---|---|---|
| Exceeds max limit | ⚠ Amount Exceeds Maximum Limit | "You cannot send more than [MAX LIMIT]. Please enter an amount within the allowed range." |
| Below min limit | ⚠ Amount Below Minimum Limit | "You must send at least [MIN LIMIT]. Please enter a higher amount." |
| Insufficient funds | ⚠ Insufficient Funds | "The amount you've entered exceeds your available balance of [AVAILABLE BALANCE]. Please enter a lower amount or top up your account." |
| Combined (limit + balance) | ⚠ Amount Exceeds Limit / ⚠ Amount Below Limit | Two-state combined message when both limit and balance rules conflict |

### Future Versions

Link: `https://www.figma.com/design/93zeJZd97zjhkVwveV7eIj/Risely-Mobile---Future-Versions?node-id=8-33217`

---

## 5. Personal Info (`#8:227805`)

**Sprint:** 2
**ClickUp:** `86c0e7m87` — "Personal info - UI updates"

### Screens

| Frame | Node | Size | KYC State |
|---|---|---|---|
| `Profile Personal inf / version (Antier1010) / 2` | `8:227814` | 375×966px | Default |
| `Profile Personal inf KYC ok / version (Antier1010) / 01` | `8:227835` | 375×966px | KYC approved — amber header "KYC completed" |
| `Profile Personal inf KYC not Ok / version (Antier1010) / 01` | `8:227852` | 375×966px | KYC rejected — amber header "KYC not completed" |

### Key Annotation

- **"flag should be here"** — at y:572, the phone number field is missing a country flag selector. Flag must be shown in the phone input field.

---

## 6. Security (`#8:227872`)

**Sprint:** 2 & 3
**ClickUp:** `86c0ep3ua` — "Security - upd UI (all states)"

### Screens

| Frame | Node | Size | Sprint |
|---|---|---|---|
| `Profile Security / version (Antier1010) / 2` | `8:227883` | 375×1279px | Sprint 2 target |
| `Profile Security / version (Antier1010) / 3` | `8:227908` | 375×1279px | Sprint 3 target |

### Annotation

- Yellow improvement comment (`#FFF5E9`/`#FF9601`) on Sprint 3 version (`8:227931`): improvement notes on the security screen — 533×108px region.

### Version Columns

| Column label | Column |
|---|---|
| "Version 1" | x:502 |
| "Current version from Antier" | x:1407 |
| "Current version from Developer" | x:1410 (y:356) |
| "Version Oct 10" | x:2251 |
| "Sprint 2" | x:716 |
| "Sprint 3" | x:2465 |

---

## 7. Banking ID (`#8:227932`)

**Sprint:** 2 & 3
**ClickUp:** `86c0ep3wb` — "Banking ID - upd UI"

### Version Columns

| Label | Notes |
|---|---|
| "Old version" | V1 design — PDF icon + "My bank ID" label + lorem ipsum placeholder + amber "Download document" button |
| "New version" | Updated design with document image area |
| "Current version from Antier" | x:1430 — two screenshots |
| "Current version from Developer" | x:1433 (y:356) |
| "Version Oct 10" | Oct 10 redesign |
| "Sprint 2" | x:1106 |
| "Sprint 3" | x:2622 |

### Old Version Screen (`8:227973`, 375×845px)

Layout:
- Logo header (`Header` component `8:47287`)
- Page title "Banking ID" — Gilroy Medium 500, 20px, fill `#121212`
- Large document area: PDF icon (100×100px) at y:308
- "My bank ID" title — Gilroy Light 300, 18px, centered
- Lorem ipsum placeholder text — Gilroy Medium 500, 14px, 18px lineHeight, centered
- Amber CTA button: `"Download document"` — fill `#FFB800`, borderRadius 20px, padding `12px 68px`, with file icon + label Gilroy Light 300, 16px, fill `#121212`
- Bottom nav

### New Version Screen (`8:227949`, 375×845px)

| Element | Detail |
|---|---|
| Page header area | Same logo header pattern |
| Document display area | 375×544px, fill `#F6F5F0` (warm off-white), image `327×471px` padded 24px from edges |
| CTA area | padding `10px 20px 0px`, gap 10px |
| Primary button | `Button / text` component (`6:37205`) — fill `#FFB800`, stroke `#FFB800`, borderRadius 12px |
| Secondary button | `Button / text` component (`6:37429`) — fill `#FFFFFF`, stroke `#E7E9ED`, borderRadius 12px, height 52px |

### Antier Version (`8:227963`, 375×812px)

Uses `Headers` component (`8:223632`) + page name header (`8:223652`). Document area 470px tall (fill `#F6F5F0`), button area at y:636.

**Annotation on Antier version:** `"should be today's"` — the date displayed in the document should be the current date, not a hardcoded date.

---

## 8. Verification Center (`#8:228489`)

**Sprint:** 2 (Next version), Version Oct 10
**ClickUp:** `86c0e7m7b` — "Verification Center UI Changes"

### Version Columns

| Label | x position |
|---|---|
| "OLD Version" | 452 |
| "Current version from Antier" | 994 |
| "Next version (Sprint 2)" | 1632 |
| "Current version from Developer" | 997 (y:354) |
| "Version Oct 10" | 2523 |

### Old Version Screen (`8:228521`, 375×1088px)

| Element | Detail |
|---|---|
| Page title | "Verification center" — Gilroy Medium 500, 20px |
| Alert banner | 375×210px, fill `#F4F6F9` ("Light gray"), border-top and bottom 1px `#E7E9ED` |
| Alert text | "Additional information is required to verify your account" — Gilroy Medium 500, 14px, 18px lineHeight |
| KYC steps area | Verification step list with progress indicators |
| Account type widget | Row of account type options at y:172 in banner |

### Sprint 2 Target Version (`8:228504`, 375×1421px)

Uses components from `Version: Oct 10` set:
- `Version: Oct 10/Account type` (`8:226380`) — account type selector
- `Version: Oct 10/Verification center` (`8:226435`) — verification status widget
- `Version: Oct 10/Information` (`8:226507`, `8:226514`, `8:226718`) — information row components

**Tile component used:** `Version: Oct 10/Tile for Text items` (`8:228520`) — 375×60px, fill `#FFFFFF`, top border 1px `#E7E9ED`, height 60px, padding `12px 20px`.

### Progress Bar Component

Component: `Progress bar` (`7:8044`), property `Number: true`
Display text: `"3/4"` — shows completed steps out of total

### Key Annotation

`"this should disappear when status=approved"` — a UI element (the alert banner or progress area) must be conditionally hidden once KYC is fully approved.

### Staging Links

- `header figma small` at y:614 → links to admin panel staging: "Take a look what states can be here"

---

## 9. Profile Page UI Changes (`#8:229066`)

**Sprint:** 2 & 3
**ClickUp:** `86c0e7m83` — "Profile Page UI Changes"

### Sprint 2 — Work Scope

From design annotation text block (`8:229079`):

| Item | Status |
|---|---|
| Personal Information — upd UI | Sprint 2 |
| Security — upd UI | Sprint 2 |
| Transactions — depends on what Antier will show | Sprint 2 |
| Beneficiaries — leave as is | No change |
| Banking ID — upd UI | Sprint 2 |
| Referral and Rewards — new UI | Sprint 2 |
| About — upd styles | Sprint 2 |
| Logout — no changes | No change |
| Terms and conditions — text styles | Sprint 2 |

### Profile Main Screen (`8:229090`, 375×1557px)

Frame name: "My Wallets - Main Wallet" (new profile page layout)

| Element | Node/Component | Detail |
|---|---|---|
| Logo header | `Headers` (`8:223632`) | Status bar + logo row |
| Profile header | `Headers` `Property 1=Profile header` (`8:223641`) | Profile avatar + name area |
| Verification center widget | `Version: Oct 10/Verification center` (`8:226412`) | Props: `Verification center: true` — tap opens verif center |
| Menu tiles | 8× `Version: Oct 10/Tile for Text items` (`8:226479`–`8:226486`) | Rows: Personal Info, Security, Transactions, Beneficiaries, Banking ID, Referral, About, Logout |
| Preferences section | `Frame "Preferences"` | Language + currency settings area |
| Coming soon section | `Frame "Coming soon"` | padding-bottom 120px |
| Tab bar | `Nav=Profile` (`8:47444`) | Frosted glass at y:1428 |

**Design annotations on Version 1:**
- `"mute items that are not working yet"` — at y:1144: visually disable/grey-out menu items that aren't functional
- `"add lang and curr here"` — at y:958: add Language and Currency settings to Preferences section
- `"OPEN btn - opens verif.center / add notification if possible when verif.center has smth new/"` — the verification center widget should navigate to Verification Center, and ideally show a notification badge when there's new content

### Version Column Structure

| Label | x position |
|---|---|
| "Version 1" | 534 |
| "version from Antier (24Sep)" | 1328 |
| "Current version from Developer" | 1331 (y:356) |
| "Version Oct 10" | 2171 |
| "Sprint 2" | 748 |
| "Sprint 3" | 2385 |

### Oct 10 Profile Component

`Profile` component (`8:227015`) — 375px wide, y-scrollable. Structure:
1. Logo header → status bar + logo row
2. Profile header → avatar + name + balance
3. Verification center row (conditional)
4. Menu section — 8 tile rows (`Version: Oct 10/Tile for Text items` `Checkbox=Off` `8:226480`)
5. Preferences section
6. Coming soon section (bottom-padded)
7. Nav=Profile (absolute at y:1428)

---

## 10. Transactions List + Filters (`#8:228619`)

**Sprint:** 2 (Next version)
**ClickUp:**
- `86c0ep54j` — "Transactions List - + Filters [depends on Antier's build]"
- `86c0ezgv3` — "Statuses change + in transactions"

### Version Columns

| Label | x / notes |
|---|---|
| "OLD Version" | x:452 — old design |
| "Antier made 24Sep" | x:994 — 3 screenshots (marked "not final version") |
| "Next version (Sprint 2)" | x:1632 |
| "Version Oct 10" | x:2367 |
| Yellow improvement comment | x:2966 — 464×272px improvement note |

### Screens

| Frame | Node | Size | Notes |
|---|---|---|---|
| `Transactions` (tab view) | `8:228733` | 375×849px | Tab switcher: "All" / "Currency" toggle (chip group), `History` component (`8:226757`), `Main nav` + `Header` |
| `Transactions` (filtered, blocked) | `8:228761` | 375×849px | Overlay: `rgba(255,255,255,0.8)` + `blur(5px)` rectangle at y:100 |
| `Filters` (bottom sheet) | `8:228651` | 375×915px | Bottom drawer: blur, `borderRadius: 20px 20px 0 0` |
| `Notification / version (Antier1010) / 12` | `8:228636` | 375×849px | Antier version — `History upd` component at y:181 |
| `Transaction profile / version (Antier1010) / 01` | `8:228849` | 375×849px | Oct 10 design using `Headers` + `Version: Oct 10/Header` (`8:226919`) + `Transaction History` (`8:226931`) |

### Tab Switcher

Component: `Frame 1171277116` — padding `2px`, gap `1px`, fill `Light gray` (#F4F6F9), borderRadius 20px. Two groups side-by-side (165×46px each) for "All Transactions" / "Currency filter".

### Filters Bottom Sheet (`8:228651`)

- 375×915px, fill `#FFFFFF`, stroke `Light gray` 1px
- Effect: `boxShadow: 0px 4px 34px 0px rgba(0,0,0,0.1)`, `backdropFilter: blur(10px)`
- Border radius: `20px 20px 0px 0px`
- Content: `Frame 1171278419` — padding `0px 20px 40px`, gap 24px
- Filter groups: 5 filter category frames
- Footer: padding row + HomeIndicator

### Transaction Detail (Oct 10)

Uses `Version: Oct 10/Filter` component (`8:226954`) — 375×817px, white, blur shadow.

**Staging links:**
- Link to admin panel state "Before KYC=OK" → `TcTcMaaFMcRxCSSz1EDrsx?node-id=15870-144258`
- "How it should work" → `8txVm4IFpK7XL2C1mntZQW?node-id=25-23556`

**Annotation on Antier version:** `"This should be default state"` — the empty/unfiltered list should be the default view when opening My Transactions.

---

## 11. Send Crypto / External Wallet (`#8:229151`)

**Sprint:** 2 & 3
**ClickUp:** `86c0jmum0` — "Send Crypto Assets from Risely Wallet to External Wallet"

### Version Columns

| Label | x position |
|---|---|
| "Version 1" | 501 |
| "Current version from Antier" | 1663 |
| "Current version from Developer" | 1670 (y:527) |
| "Version Oct 10" | 2347 |
| "Sprint 2" | 703 |
| "Sprint 3" | 2561 |

### Screens

| Frame | Node | Size | Notes |
|---|---|---|---|
| `Request Payment - Crypto - FCBank User` | `8:229158` | 375×1320px | Version 1 — balance `$7,577,432` visible, full send form |
| `iPhone 13 mini - 477` | `8:229265` | 375×812px | Intermediate version — "Convert from + Search" bottom drawer |
| `"Send/other wallet Crypto" / version (Antier1010) / 05` | `8:229301` | 375×1227px, y-scroll | Antier implementation |

### Convert Form Bottom Drawer

Two instances:
- `Version: Oct 10/Convert form` `Type=Your Risely Wallet` (`8:227100`) — at x:2757, y:1053
- `Version: Oct 10/Convert form` `Type=Network` (`8:227111`) — at x:3136, y:985

Both: fill `#FFFFFF`, stroke `Light gray`, blur shadow, borderRadius `20px 20px 0 0`

### Design Notes

- **Network pre-selection:** "Network is pre-selected depending from selected wallet and Network can be selected for USDT wallet (Alex, confirm pls)"
- **Fee currency:** "Fee always in $"
- **Empty state:** Recipient address field starts empty
- Antier screenshots annotated: "check headers" + "colors" — header style and color palette need fixing
- **Typography spec:** "Typography 18/20: use defined style from common style file" → links to design system
- **Button spec:** "Button: use defined buttons from components" → links to `TcTcMaaFMcRxCSSz1EDrsx?node-id=19016-92745`

### Staging Link

`header figma small` at y:1400 → "link leading to the Fees page in the admin panel (crypto/fiat)"

**Future versions:** `https://www.figma.com/design/93zeJZd97zjhkVwveV7eIj/Risely-Mobile---Future-Versions?node-id=8-33217`

---

## 12. Receive Crypto from External Wallet (`#8:229804`)

**Full name:** "Receive Crypto Assets from External Wallet to Risely User Wallet"
**Sprint:** 2 & 3
**ClickUp:** `86c0jmunp` — "Receive Crypto Assets from External Wallet to Risely User Wallet"

### Version Columns

| Label | x position |
|---|---|
| "Version 1" | 719 |
| "Current version from Antier" | 1772 |
| "Current version from Developer" | 1772 (y:434) |
| "Version Oct 10" | 2499 |
| "Sprint 2" | 933 |
| "Sprint 3" | 2713 |

### Screens

| Frame | Node | Size | Notes |
|---|---|---|---|
| `Request Payment - Crypto - FCBank User` | `8:229819` | 375×1320px | Receive / request payment screen — balance hidden from share view |
| `Receive Crypto / version (Antier1010) / 01` | `8:230061` | 375×1015px, y-scroll | Antier implementation |
| `Sharing - System standard sharing popup` | `8:229816` | 375×656px | iOS share sheet overlay |
| `Convert from` (bottom drawer) | `8:229865` | hug height | Wallet/network selector |
| `Tapped` | `8:229880` | 375×99px | Expanded row state on tap |
| `WhatsApp Chat` | `8:229889` | 375×812px | WhatsApp test result — shows how share looks in chat |

### iOS Share Sheet Spec (`8:229817`)

| Property | Value |
|---|---|
| Component | `ShareSheet` `Dark Mode=False` (`3:33372`) |
| Size | 390×656px |
| Fill | `rgba(250, 250, 250, 0.93)` |
| Backdrop filter | `blur(40px)` |
| Border radius | `13px 13px 0px 0px` |
| Logo | `logo` component (`8:46929`) at x:19, y:20, 34×34px |

### Convert From Drawer (`8:229865`)

- Fill `#FFFFFF`, stroke `Light gray` 1px
- Effect: `boxShadow: 0px 4px 34px 0px rgba(0,0,0,0.1)`, `backdropFilter: blur(10px)`
- Border radius: `20px 20px 0px 0px`

### Design Notes

- **Balance hidden in share:** "we have hide balance from here assuming that user would not want anyone to know it" — the balance is intentionally not visible when a user shares their payment request.
- **WhatsApp test result:** "result we tested in WhatsApp — this should look like that" — share result was tested and confirmed looks correct.
- **Icon quality:** "Please Fix icon quality" — the Risely logo shown in the share sheet needs higher resolution.
- **Row tap target:** "click on all line" — the entire wallet/network row must be tappable, not just a chevron icon.
- **Improvement comment** (`8:230075`): 533×272px yellow improvement annotation on Oct 10 version.

### Network Selector (Sprint 3 area)

Ethereum network icon component: `Networks` `Property 1=ETH` (`8:225021`) — 28×28px, fill `#121212`, borderRadius 31px. Overlaid on wallet address row.

---

## 13. Key Component Cross-Reference

| Component | ID | Used in |
|---|---|---|
| `Office use / Section Label` | `8:223537` | All sprint section sidebars |
| `Office use / Note` | `8:68219` | Version/sprint labels (orange sticker) |
| `Office use / Comment` `state=yellow` | `8:68198` | Improvement annotations |
| `Office use / Link` | `8:223555` | ClickUp ticket links |
| `Headers` `Property 1=Logo header` | `8:223632` | Top logo bar |
| `Headers` `Property 1=Page name header` | `8:223652` | Back-arrow + page title bar |
| `Headers mobile` `Property 1=Main` | `6:69249` | Mobile header with status bar |
| `Button / text` primary | `6:37205` | Amber fill `#FFB800`, 12px radius |
| `Button / text` secondary gray | `6:37429` | White fill, `#E7E9ED` border, 12px radius |
| `Nav=Home` | `8:47420` | Bottom tab bar, frosted glass |
| `Nav=Profile` | `8:47444` | Profile tab bar variant |
| `HomeIndicator` | `7:7561` | iOS home indicator, 34px |
| `ShareSheet` | `3:33371` | iOS native share sheet |
| `Version: Oct 10/Convert form` | `8:227099` | Send/Receive crypto wallet selector |
| `Version: Oct 10/Tile for Text items` | `8:226479` | Profile menu rows, 60px height |
| `Version: Oct 10/Verification center` | `8:226394` | Verification status widget |
| `Version: Oct 10/Account type` | `8:226380` | Account type selector in profile |
| `Version: Oct 10/Information` | `8:226506` | Information rows in verif center |
| `Transaction History` | `8:226931` | Oct 10 transactions list |
| `History upd` | `8:47336` | Updated history list component |
| `Progress bar` | `7:8003` | KYC step progress ("3/4") |
| `header figma small` | `2:3896` | Staging admin panel link badges |

---

## 14. Design Tokens (from This File)

| Token | Value | Use |
|---|---|---|
| `Main` | `#FFB800` | Amber primary (buttons, accents) |
| `Main black` | `#121212` | Primary text |
| `Light gray` | `#F4F6F9` | Page backgrounds, dividers |
| `Gray` | `#E7E9ED` | Borders, strokes |
| `Materials/Chrome` | `rgba(255,255,255,0.75)` | Nav bar frosted glass fill |
| Backdrop filter (nav) | `blur(25px)` | Nav bar blur |
| Nav shadow | `0px 4px 30px 0px rgba(0,0,0,0.1)` | Tab bar elevation |
| Convert drawer shadow | `0px 4px 34px 0px rgba(0,0,0,0.1)` + `blur(10px)` | Bottom sheet elevation |
| iOS share sheet fill | `rgba(250,250,250,0.93)` | Native share sheet bg |
| iOS share sheet blur | `blur(40px)` | Native share sheet backdrop |
| `Neutral/Gray/0` | `#FFFFFF` | Card fills |
| `Neutral/Gray/100` / `200` | `#E7E9ED` | Card borders |

---

## 15. Figma Links

| Resource | URL |
|---|---|
| Risely [my file] | `https://www.figma.com/design/Qwbr3pXZJjh72Fx7kJOmqP/` |
| Future Versions file | `https://www.figma.com/design/93zeJZd97zjhkVwveV7eIj/Risely-Mobile---Future-Versions?node-id=8-33217` |
| Admin panel (fees) | `https://www.figma.com/design/TcTcMaaFMcRxCSSz1EDrsx?node-id=19016-92745` |
| Admin panel (KYC states) | `https://www.figma.com/design/TcTcMaaFMcRxCSSz1EDrsx?node-id=15870-144258` |
| "How it should work" (transactions) | `https://www.figma.com/design/8txVm4IFpK7XL2C1mntZQW?node-id=25-23556` |
