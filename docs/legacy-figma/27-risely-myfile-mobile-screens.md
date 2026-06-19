# Risely [my file] — Mobile - Screens Page

**Source:** Figma "Risely [my file]" (`Qwbr3pXZJjh72Fx7kJOmqP`), `Mobile - Screens` page (`#6:215439`)
**Purpose:** Component-level screen library for the Risely mobile app, organized into versioned sections (V1 → V3) plus a Legacy set. Distinct from the Prototypes page — this page stores polished, reusable screen components rather than prototype flows.

---

## 1. Page Structure

The page has 4 versioned sections plus an "App Screens" overview header at the top.

| Section | Node | Canvas size | Label |
|---|---|---|---|
| App Screens (overview) | `#40:305747` | — | White XXL 4-column header (`V1 / V2 / V3 / Legacy`) |
| Current - Version 1 | `#77:125157` | 10100 × 10000 | "Version 1 / Phased Approach" |
| Version 2 | `#77:125491` | 13000 × 10000 | "Version 2 / Phased Approach" |
| Version 3 | `#77:125701` | 18000 × 10000 | "Version 3 / Phased Approach" |
| Legacy | `#77:125948` | 10005 × 10000 | "Legacy / Phased Approach" |

**Section decoration:** Each versioned section uses an `Office use / Section Label` component (343 × 10000 px, `#000000` fill, `borderRadius: 80px 0px 0px 80px`) on the left edge as a vertical label strip.

**Sub-section headers:** Gray `#BDBDD1` header bars (Gilroy SemiBold 30px, `#121212`) separate screen groups within each section.

---

## 2. Version 1 — "Current" (Node `#77:125157`)

Version 1 is the production-referenced design. It has 4 main groups arranged vertically:

1. **Main** — 5 primary tab screens + Profile and Wallet sub-pages
2. **Transactions** — Receive, Send, Swap flows
3. **Confirmation, Sent, Transaction screens**
4. **Signup, KYC**

---

### 2.1 Group: Main

**5 primary tab screens (row layout):**

#### Homepage [Main] — `Main` component

| Property | Value |
|---|---|
| Node | `#77:123837` |
| Component key | `abccdde8` |
| Variant | `Version=Default` |
| Size | 375 × 812 |
| Fill | `#FFFFFF` |

**Inner structure:**
- `Headers` (`#77:123906`, `Property 1=Balance > 0`) — amber gradient header, `borderRadius: 0px 0px 30px 30px`
  - Gradient: `linear-gradient(225deg, rgba(255,235,57,1) 2%, rgba(255,158,45,1) 100%)`
  - Second gradient (overlay): `linear-gradient(-46deg, rgba(240,244,255,1) 0%, rgba(248,250,255,1) 100%)`
  - "Total Balance" label (Gilroy Regular 14px, 18px line-height, `#110D03`)
  - Balance text: `$0.00` (Gilroy Medium 500, 50px, `#110D03`)
  - Notification bell icon at x:321, y:63 (36×36 frame, `borderRadius: 10px`)
  - Logo "LOGO 1" at x:18, y:67 (118×31)
  - Action row (30% opacity): 3 action columns at x:70, y:270 (row gap 20px)
- `Transaction History` (`#40:299859`, `latest transactions=true`) — scrollable (overflow x,y)
- `Nav=Home` (`#6:72430`) at y:728 (absolute position)
  - Fill: `rgba(255,255,255,0.75)`, `backdrop-filter: blur(25px)`
  - Shadow: `0px 4px 30px 0px rgba(0,0,0,0.1)`
  - Contains: Tab Bar Buttons + `Home Indicator` (`#6:72525`, iPhone Portrait Light)
- `Main nav` (`#3:8439`) at y:1031 (absolute) — legacy bottom nav

---

#### My Wallets — `My Wallets` component

| Property | Value |
|---|---|
| Node | `#77:124020` |
| Component key | `4311f160` |
| Size | 375 × 812 |

**Inner structure:**
- `Headers` (`#77:123955`, `Logo header`) — logo + spacer
- `Headers` (`#77:123924`, `Wallets All`) — "Wallets All" section title
- Wallets list (fill `#FEFEFE`)
- `Nav=Wallets` (`#6:72442`, key `093118eb`)

---

#### Profile — `Profile` component

| Property | Value |
|---|---|
| Node | `#77:124097` |
| Component key | `732bcd01` |
| Size | 375 × overflow (y scroll) |

**Inner structure:**
- `Headers` (`#77:123955`, `Logo header`)
- `Headers` (`#77:123964`, `Profile header`)
- `Version: Oct 10 / Verification center` (`#8:226412`, `State=Only`) — verification status banner
- 8× `Version: Oct 10 / Tile for Text items` (`#8:226480`, `Checkbox=Off`) — menu tiles (375×60 each)
  - Properties: `Badge=true`, `check selector=true`, `Icon L=true`
- Preferences section
- "Coming soon" section
- `Nav=Profile` (`#6:72454`, key `d4032b8b`) at y:1428 (absolute)

---

#### Notifications — `Notifications` component

| Property | Value |
|---|---|
| Node | `#77:124449` |
| Component key | `b4a21c50` |
| Size | 375 × 849 |

**Inner structure:**
- `Headers` (`#77:123955`, `Logo header`)
- `Headers` (`#77:123975`, `Page name header`) — "Notifications" title
- 6× `Notification item` (`#40:300002`, key `e578c1e3`) — row layout, padding 20px, 375×hug each

---

#### Support (Contuct us) — `Contuct us` component

| Property | Value |
|---|---|
| Node | `#77:124460` |
| Component key | `ce356218` |
| Size | 375 × hug |
| Note | Typo in original Figma: "Contuct" = "Contact" |

**Inner structure:**
- Amber status bar fill `#FEB800`
- Screenshot image fill (375×771) — full-screen screenshot of support screen
- `Home Indicator`

---

### 2.2 Profile Sub-pages (second row)

These are individual sub-page component instances arranged in a horizontal row:

| Screen | Node | Key | Size | Notes |
|---|---|---|---|---|
| Verification centre | `77:124465` | `e77ed6b4` | 375 × hug | `State=Only` variant |
| Personal Information | `77:124510` | `da22252a` | 375 × hug | |
| Security | `77:124526` | `cb6de59f` | 375 × hug | |
| Transactions All | `77:124548` | `24220ed6` | 375 × 849 | |
| Beneficiary List | `77:124553` | `d68f0f7f` | 375 × 849 | `justifyContent: center` |
| Banking ID | `77:124565` | `1ff15291` | 375 × 849 | |
| Referral and Rewards - developed | `77:124575` | `b993bab5` | 375 × 849 | |
| About - developed | `77:124582` | `61a0aa9e` | 375 × 849 | |

---

### 2.3 Wallet Sub-pages (third row)

| Screen | Node | Key | Size |
|---|---|---|---|
| My Wallets / EURO | `77:124589` | `e68148d0` | 375 × 812 |
| My Wallets / ETH | `77:124595` | `12f40758` | 375 × 812 |

---

### 2.4 Group: Transactions

Contains 3 sub-groups (Receive, Send, Swap):

**Receive sub-group:**
- Row layout (gap 20px)
- Two sub-columns: Frame `1171278595` and Frame `1171278594`

**Send sub-group:**
- 4 sub-columns: Frame `1171278596`, `1171278597`, `1171278599`, `1171278598`

**Swap sub-group** (`#77:125228`):
- Header: "Swap" (gray figma sub-header)
- `Swap` component (`#77:124751`, `Version=V1`, 375×812)
  - Sub-label: "Selected State"
  - Component set: `#77:124750` (key `20d93f54`, name `Swap`)
  - Inner: `Frame 1171278334` (375×812 full screen) + `Group 1171277717` (footer group at y:712)

---

### 2.5 Group: Confirmation, Sent, Transaction screens (examples)

Three frames showing confirmation and result states:

| Frame | Width | Gap | Purpose |
|---|---|---|---|
| `1171278609` | 1167px | 21px | Confirmation screens row |
| `1171278600` | 137×124 | — | Small supplemental element |
| `1171278610` | 1170px | 30px | Sent / Transaction result screens row |

---

### 2.6 Group: Signup, KYC (`#77:125319`)

Row layout, gap 100px. 7 sub-frames:

#### Invitation code

| Property | Value |
|---|---|
| Component | `Invite code` (`#56:316542`, key `c1fd0e70`) |
| Size | 375 × 812 |

**Structure:**
- `onb marketing screen 1` (`#8:46936`, key `e95aceca`) — 375 × 620 background illustration
- Bottom sheet (padding 20px, fills `#F1F5F9`, gap 16px) — sliding input panel
- `Status Bar` (`#1:225`, `Dark Mode=NO`)
- `Notch` (`#1:611`, `Visible=NO`)
- `Indicator` (`#1:728`, `Type=None`) and `Time / Light` (`#1:742`, `Color=Clear`)

---

#### Signup

| Property | Value |
|---|---|
| Component | `Signup` (`#56:316553`, key `c5860d0c`) |
| Size | 375 × 812 |

**Structure:**
- `onb marketing screen 1` (`#8:46936`) — same marketing background
- Bottom sheet (padding 12px 20px 32px, gap 16px, `#FFFFFF` fill, `Light gray` (`#F4F6F9`) top border stroke)
- `Headers mobile` (`#6:69154`, `Property 1=Send from`) at y:0 — amber gradient header with status bar
  - Component set: `#6:69138` (key `c57a7980`, name `Headers mobile`)
- `TabBar - mvp` (`#1:1212`, `Property 1=1, version=just line`) at y:778 — bottom tab bar
  - Shadow: `0px 4px 30px 0px rgba(0,0,0,0.1)`

---

#### Email, Phone, MPIN

| Property | Value |
|---|---|
| Content | `Office use / Comment` annotation (`state=blue`) |
| Purpose | Placeholder — screens not yet designed as components |

---

#### KYC

| Property | Value |
|---|---|
| Content | `Office use / Comment` annotation (`state=blue`) |
| Purpose | Placeholder — KYC form screens TBD |

---

#### KYC in progress

Custom 375×812 frame (no component wrapper — direct frame):

**Structure:**
- `Main nav` (`#3:8439`) at y:1031 (absolute) — bottom nav
- `Group 1171277042` — header group at y:0:
  - `Rectangle 41984` (375×370) — dual gradient fill:
    - `linear-gradient(225deg, rgba(255,235,57,1) 2%, rgba(255,158,45,1) 100%)`
    - `linear-gradient(-46deg, rgba(240,244,255,1) 0%, rgba(248,250,255,1) 100%)`
    - `borderRadius: 0px 0px 30px 30px`
  - Notification bell frame at x:321, y:63 (36×36)
  - Logo frame "LOGO 1" at x:18, y:67 (118×31)
  - Status bar frame
- `$0.00` balance text (Gilroy Medium 50px, `#110D03`) at x:67, y:153 (250×59)
- "Total Balance" subtitle (Gilroy Regular 14px, 18px line-height, `#110D03`) at x:151, y:134
- SVG icon group at x:177, y:231 (20×20)
- Action buttons row at x:70, y:270 — **30% opacity** (wallets not yet active):
  - 3 `Frame 1171277247` columns (row gap 20px)
- **CTA card** at x:20, y:394 (335×hug, column layout, gap 14px):
  - Icon group (99.21×100)
  - Title: **"Get verified"** (Gilroy Bold 26px, `#121212`)
  - Body: "This step is crucial for preventing fraud and protecting your account. It also guarantees you're in a safe and legal company." (Gilroy Medium 16px, 20px line-height, `#121212`)
  - Button group (`Frame 1171277210`, column center, gap 80px)
- `Nav=Home` (`#6:72430`) at y:728 (absolute)

---

#### KYC not approved

| Property | Value |
|---|---|
| Content | `Office use / Comment` annotation (`state=blue`) |
| Purpose | Placeholder — rejected state screen TBD |

---

#### KYC approved. $=0

Custom 375×812 frame:

**Structure:** Identical to "KYC in progress" except:
- Action buttons row at y:270 — **100% opacity** (wallets now active, 2 of 3 at 20% opacity indicating empty)
- **CTA card** at x:20, y:428 (335×hug, column layout, gap 14px):
  - Title: **"Top up your wallets"** (Gilroy Bold 26px)
  - Body: "Your EUR and Crypto wallets are ready! To start using the app, please top up your wallets." (Gilroy Medium 16px, 20px line-height)
  - Button group (`Frame 1171277210`, column stretch, gap 80px)

---

## 3. Version 2 — Additions

**Marker:** Green `#00A11B` label: "Items that were added or changed comparing to prev.version"
**Also has:** Red Fix comment attached to the green additions label

Version 2 contains all Version 1 content plus two new groups:

### 3.1 Error Screens (new in V2)

Green `#00A11B` sub-header: "Error Screens"

| Variant | Node | Key | Size |
|---|---|---|---|
| `Type=Account Blocked` | `6:68837` | `df9b6a46` | 375 × 812 |
| `Type=Feature is blocked` | `6:68922` | `984c8f0d` | 375 × 812 |
| `Type=Feature is blocked` (×2) | `6:68922` | `984c8f0d` | 375 × 812 |
| `Type=Connection Lost` | `6:69023` | `74f81435` | 375 × 812 |
| `Type=Something Went Wrong` | `6:69007` | `f1eda697` | 375 × 812 |

All are instances of the `Error Screens` component set (`#6:68836`).

### 3.2 Notifications — TBD marker (new in V2)

Label: **"Notifications full flow: tbd"**
- Header fill: `Brand/primary/700` = `#815D00` (dark amber)
- Explicitly marked as not yet designed

---

## 4. Version 3 — Additions

**Marker:** Same green `#00A11B` additions label as V2

Version 3 contains all V2 content plus:
- Additional frame group (`Frame 1171278593`, row layout, gap 100px) — exact screen content not expanded
- "Notifications full flow: tbd" label still present (notifications still TBD in V3)

---

## 5. Legacy

- Same screen group structure as Version 1 (Main, Transactions, Confirmation, Signup/KYC)
- No green-label additions
- No `Office use / Section Label` decorators
- Appears to be the original Antier/contractor-built screen designs (pre-redesign)
- Canvas: 10005 × 10000px

---

## 6. Component Registry

All screens are 375px wide (iPhone-size). All use `#FFFFFF` fill unless noted.

### Screen Components

| Component | Node | Key | Size | Variants |
|---|---|---|---|---|
| `Main` | `77:123837` | `abccdde8` | 375 × 812 | `Version=Default` |
| `My Wallets` | `77:124020` | `4311f160` | 375 × 812 | — |
| `Profile` | `77:124097` | `732bcd01` | 375 × overflow | — |
| `Notifications` | `77:124449` | `b4a21c50` | 375 × 849 | — |
| `Contuct us` (support) | `77:124460` | `ce356218` | 375 × hug | — |
| `Verification centre` | `77:124465` | `e77ed6b4` | 375 × hug | `State=Only` |
| `Personal Information` | `77:124510` | `da22252a` | 375 × hug | — |
| `Security` | `77:124526` | `cb6de59f` | 375 × hug | — |
| `Transactions All` | `77:124548` | `24220ed6` | 375 × 849 | — |
| `Beneficiary List` | `77:124553` | `d68f0f7f` | 375 × 849 | — |
| `Banking ID` | `77:124565` | `1ff15291` | 375 × 849 | — |
| `Referral and Rewards - developed` | `77:124575` | `b993bab5` | 375 × 849 | — |
| `About - developed` | `77:124582` | `61a0aa9e` | 375 × 849 | — |
| `My Wallets / EURO` | `77:124589` | `e68148d0` | 375 × 812 | — |
| `My Wallets / ETH` | `77:124595` | `12f40758` | 375 × 812 | — |
| `Swap` | `77:124750` (set) | `20d93f54` | 375 × 812 | `Version=V1` |
| `Invite code` | `56:316542` | `c1fd0e70` | 375 × 812 | — |
| `Signup` | `56:316553` | `c5860d0c` | 375 × 812 | — |

### Error / System State Components

| Component | Node | Key | Variant |
|---|---|---|---|
| `Error Screens` — Account Blocked | `6:68837` | `df9b6a46` | `Type=Account Blocked` |
| `Error Screens` — Feature is blocked | `6:68922` | `984c8f0d` | `Type=Feature is blocked` |
| `Error Screens` — Connection Lost | `6:69023` | `74f81435` | `Type=Connection Lost` |
| `Error Screens` — Something Went Wrong | `6:69007` | `f1eda697` | `Type=Something Went Wrong` |

Component set: `Error Screens` (`#6:68836`)

### Shared UI Components

| Component | Node | Key | Notes |
|---|---|---|---|
| `Nav` (set) | `6:72429` | `48bf6635` | Variants: `Home`, `Wallets`, `Profile` |
| `Nav=Home` | `6:72430` | `4bd42dea` | `rgba(255,255,255,0.75)` + blur(25px) |
| `Nav=Wallets` | `6:72442` | `093118eb` | Same glass style |
| `Nav=Profile` | `6:72454` | `d4032b8b` | At y:1428 in Profile screen |
| `Transaction History` | `40:299859` | `1b77d9f9` | `latest transactions=true`, overflow scroll |
| `Notification item` | `40:300002` | `e578c1e3` | Row, padding 20px, 375×hug |
| `Home Indicator` (set) | `6:72512` | `530ba45d` | `Device=iPhone, Orientation=Portrait, Mode=Light` |
| `Headers mobile` (set) | `6:69138` | `c57a7980` | Variants include `Send from`, etc. |
| `onb marketing screen 1` | `8:46936` | `e95aceca` | 375×620 background for onboarding |
| `Version: Oct 10 / Tile for Text items` | `8:226480` | `830ea47f` | 375×60, `Checkbox=Off` |
| `Version: Oct 10 / Verification center` | `8:226412` | `4a1fafa0` | Padding 20px, gap 16px |
| `TabBar - mvp` (set) | `1:1211` | `423722ce` | `Property 1=1, version=just line` |
| `Status Bar` (set) | `1:224` | `038c500c` | `Dark Mode=NO` |

---

## 7. Design Tokens (from this page)

| Token | Value | Usage |
|---|---|---|
| Amber gradient (main) | `linear-gradient(225deg, rgba(255,235,57,1) 2%, rgba(255,158,45,1) 100%)` | Homepage header, status bars |
| Blue gradient (overlay) | `linear-gradient(-46deg, rgba(240,244,255,1) 0%, rgba(248,250,255,1) 100%)` | Header overlay in KYC screens |
| Nav glass | `rgba(255,255,255,0.75)` + `backdrop-filter: blur(25px)` | Bottom nav bar |
| Nav shadow | `0px 4px 30px 0px rgba(0,0,0,0.1)` | Bottom nav bar |
| Header radius | `0px 0px 30px 30px` | Amber gradient header bottom corners |
| `Main black` | `#121212` | Primary text |
| `Light gray` | `#F4F6F9` | Page background, dividers |
| `Brand/primary/700` | `#815D00` | "Notifications TBD" marker color |
| Sub-header gray | `#BDBDD1` | Figma group sub-header fill |
| Section label fill | `#000000` | Section label sidebar strip |
| V2 additions green | `#00A11B` | "Items added/changed" annotation labels |
| Balance text | `#110D03` | Total balance amount + subtitle |
| Amber status bar | `#FEB800` | Support screen status bar |
| Error/additions red | `#F24822` | Fix comment on V2 additions label |

---

## 8. Key Design Notes

### Version progression logic
- **V1 (Current):** Base screen set. Swap and Receive/Send transaction screens. Signup/KYC states.
- **V2:** Adds Error Screens (5 variants) and marks Notifications as TBD.
- **V3:** Further additions (not fully documented — frame `1171278593`). Notifications still TBD.
- **Legacy:** Pre-redesign screens from Antier contractor build. Reference only.

### Signup/KYC state machine
The "Signup, KYC" group encodes 7 app states in sequence:
1. Invitation code → 2. Signup → 3. Email/Phone/MPIN (TBD) → 4. KYC form (TBD) → 5. KYC in progress → 6. KYC not approved (TBD) → 7. KYC approved ($=0)

States 3, 4, 6 are annotation placeholders — screens not yet componentized.

### Action button opacity in KYC states
- **KYC in progress:** Action button row at 30% opacity — wallet actions unavailable
- **KYC approved $=0:** Action buttons visible but 2/3 at 20% opacity — wallets exist but empty

### Notifications gap
Both V2 and V3 have explicit "Notifications full flow: tbd" markers (`#815D00` dark amber header). The `Notifications` main screen exists in V1 (showing 6 notification items), but the full notification flow (settings, detail screens) was never designed.

### "Contuct us" typo
The Support screen component is named `Contuct us` in Figma (misspelling of "Contact us"). This appears in the component name and should be noted when referencing it in code or future Figma files.

### Cross-page relationship
| This page | Mobile - Prototypes page (`#6:218439`) |
|---|---|
| Individual screen components | Assembled into flow prototypes |
| `Main` (`#77:123837`) | Used in `Key screens` section and many flows |
| `My Wallets` (`#77:124020`) | Used in Wallets section |
| `Signup` + `Invite code` | Used in Onboarding sub-flows |
| Error Screens (V2) | Referenced in App State sections |

---

## 9. Figma Links

| Section | URL |
|---|---|
| Full page | [Mobile - Screens](https://www.figma.com/design/Qwbr3pXZJjh72Fx7kJOmqP/Risely--my-file-?node-id=6-215439) |
| Version 1 | [#77:125157](https://www.figma.com/design/Qwbr3pXZJjh72Fx7kJOmqP/Risely--my-file-?node-id=77-125157) |
| Version 2 | [#77:125491](https://www.figma.com/design/Qwbr3pXZJjh72Fx7kJOmqP/Risely--my-file-?node-id=77-125491) |
| Version 3 | [#77:125701](https://www.figma.com/design/Qwbr3pXZJjh72Fx7kJOmqP/Risely--my-file-?node-id=77-125701) |
| Legacy | [#77:125948](https://www.figma.com/design/Qwbr3pXZJjh72Fx7kJOmqP/Risely--my-file-?node-id=77-125948) |
| Main screen component | [#77:123837](https://www.figma.com/design/Qwbr3pXZJjh72Fx7kJOmqP/Risely--my-file-?node-id=77-123837) |
| Error Screens set | [#6:68836](https://www.figma.com/design/Qwbr3pXZJjh72Fx7kJOmqP/Risely--my-file-?node-id=6-68836) |
| Nav component set | [#6:72429](https://www.figma.com/design/Qwbr3pXZJjh72Fx7kJOmqP/Risely--my-file-?node-id=6-72429) |
