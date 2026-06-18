# Risely [shared] — Mobile Prototypes

**Source:** Figma "Risely [shared]" (`o9Zj5gukNqAstKo8pUebcV`), `Mobile - Prototypes` page  
**Node:** `6:218439`  
**Purpose:** Full interactive prototype flows — all screens with states, needed for widget implementation

---

## Design Tokens (Prototypes-specific)

| Token | Value |
|---|---|
| Frame size (mobile) | 375×812px (some scroll frames: 375×1015px, 375×1032px, 375×849px) |
| Font | Gilroy (SemiBold 600 primary, ExtraBold 800 hero) |
| Background | `#FFFFFF` |
| Brand amber | `#FFB800` (token: `Main`) |
| Amber gradient | `linear-gradient(225deg, rgba(255,215,1,1) 2%, rgba(255,138,1,1) 100%)` (token: `Main grad`) |
| Top header gradient | `linear-gradient(23deg, rgba(255,213,105,1) 0%, rgba(255,235,182,1) 100%)` |
| Main black | `#121212` |
| Light gray BG | `#F4F6F9` (token: `Light gray`) |
| Borders | `#E7E9ED` (token: `Neutral/Gray/200`) |
| TabBar | frosted glass `rgba(255,255,255,0.75)` + `blur(25px)` |
| Error toast BG | `#FFDEDB` (token: `Additional/Error/50`) |
| Brand secondary light | `#FFEFC5` (token: `Brand/primary/50`) — disabled button bg |

### Key Reusable Components

| Component | ID | Notes |
|---|---|---|
| `Button / text` (Primary amber) | `7:4587` | Size=2xl, fill `#FFB800`, borderRadius 12px, height 52px |
| `Button / text` (Secondary gray) | `7:4627` | Size=2xl, white fill + `#E7E9ED` border |
| `Button / text` (Secondary color disabled) | `7:4593` | fill `#FFEFC5`, disabled state |
| `TabBar - mvp` | `6:69282` | frosted glass bottom nav |
| `HomeIndicator` | `1:1294` | 375×34px, at y:778 |
| `Version: Oct 10/Header` | `7:10376` | Logo header with status bar, 375×101px |
| `Main - top header` | `3:46746` | Gradient top section (amber) |
| `Alert & Notification & Toast` | `7:8291` | Toast component; Error variant: `#FFDEDB` fill |
| `Version: Oct 10/Sharing - System standard sharing popup` | `7:10012` | iOS share sheet |
| `Version: Oct 10/Convert form` | `7:11367` | Bottom drawer form (wallets/network/amount picker) |
| `iOS / Keyboards` | `7:7373` | Alphabetic + Numeric keyboard overlays |
| `Office use / Header figma` (XXL) | `7:7497` | Section divider in Figma canvas |

---

## 1. Onboarding (#7:11418)

28 screens covering the full signup flow.

### 1a. Marketing / Splash Screens

| Screen | Node | Description |
|---|---|---|
| Onboarding / 01 | `7:11419` | Marketing screen 2 (`onb marketing screen 2`) + bottom sheet with dots + CTA |
| Onboarding / 02 | `7:11781` | Marketing screen variant |
| Onboarding / 03 | `7:11554` | Marketing screen 3 |
| Onboarding / 04 | `7:11566` | Marketing screen 4 |
| Onboarding / 05 | `7:11641` | Marketing screen 5 |
| Onboarding / 6 | `7:11542` | Marketing screen 6 |

**Layout pattern (splash screens):**
- Full-screen marketing image (`onb marketing screen 2/3` component)
- Bottom sheet at y:522 (290px tall): padding `30px 20px 20px`, gap 20px, white background, borderRadius `20px 20px 0px 0px`
- Status bar overlay at top

### 1b. Email Registration Flow

| Screen | Node | Description |
|---|---|---|
| Email / 01 | `7:11464` | Email input with `Security Verification` panel + success toast (`Additional/Green/50`) |
| Email / 02 | `7:11533` | Email step 2 |
| Email / 03 | `7:11430` | Email verification — keyboard open, `Verification` bottom sheet (white, 20px radius) |
| Email / 04 | `7:11446` | 2 header variants (`Only Arrow` + `Version: 3`) + scrollable content |
| Email / 05 | `7:11474` | Marketing screen 2 + `Security Verification` panel |
| Email / 06 | `7:11505` | Step 6 |
| Email / 07 | `7:11483` | Marketing screen 2 + `Version: Oct 10/pop up` (bottom sheet popup) |
| Email / 08 | `7:11512` | Step 8 |
| Email / 09 | `7:11519` | Step 9 |

**Email verification bottom sheet (`Frame "Verification"`):**
```
padding: 30px 20px 20px
gap: 20px
fill: #FFFFFF
effect: boxShadow 0px 4px 34px rgba(0,0,0,0.1) + backdropFilter blur(10px)
borderRadius: 20px 20px 0px 0px
strokes: #F4F6F9
```
Contains: text fields + `Button / text` Primary + footnote link (underline style `ts2`, fill `#0850EA`)

### 1c. Sign In Flow

| Screen | Node | Description |
|---|---|---|
| Sign in / 01 | `7:11711` | Sign in landing |
| Sign in / 02 | `7:11671` | Email/password entry |
| Sign in / 03 | `7:11654` | Step 3 |
| Sign in / 04 | `7:11491` | Marketing screen 2 + `Version: Oct 10/pop up` popup + numeric keyboard |
| Sign in / 5 | `7:11694` | Step 5 |

**Pop-up bottom sheet (`Version: Oct 10/pop up`):**
```
padding: 30px 20px 20px
gap: 20px
alignment: center
```
Contains: icon area + text content + `Button / text` Primary CTA

### 1d. Google Auth Flows

| Screen | Node | Description |
|---|---|---|
| Google sign in / 01 | `7:11580` | Google sign in |
| Google sign in / 2 | `7:11610` | Step 2 |
| Google sign in / 03 | `7:11498` | Step 3 — marketing screen + pop up + keyboard |
| Google sign up / 01 | `7:11595` | Google sign up |
| Google sign up / 02 | `7:11625` | Step 2 |

### 1e. Referral & Privacy

| Screen | Node | Description |
|---|---|---|
| Referral / 01 | `7:11729` | Referral code entry screen |
| Referral / 02 | `7:11744` | Referral step 2 |
| Privacy Policy / 01 | `7:9372` | Privacy policy screen |

---

## 2. Key Screens (#7:56575)

Summary view of the main app states.

| Screen | Node | Description |
|---|---|---|
| KYC not approved / 01 | `7:8775` | Home screen with `Version: Oct 10/Main screen` gradient header (amber) + locked action area |
| KYC Approved / 01 | `7:8782` | Home screen — full access but balance $0 |
| Main screen / 01 | `7:8789` | Full home with "Latest Transactions" label + `temp btns small` filter button |
| Main screen Wallets / 02 | `7:8797` | Wallets tab active |
| Main screen Profile / 01 | `7:9175` | Profile tab active |
| Main screen Profile / 2 | `7:56646` | Profile tab variant 2 |
| Transactions main screen / 01 | `7:9312` | Transactions list |
| Transactions main screen / 02 | `7:9328` | Transactions with filter |
| Transactions main screen / 03 | `7:9343` | Transactions variant 3 |
| Notification Empty / 01 | `7:8843` | Empty notifications state |
| Notification / 01 | `7:8934` | Notifications with items |
| Email | `32:298032` | Email OTP screen |
| SMS | `32:298212` | SMS OTP screen |
| Description | `7:9215` | Descriptive/info screen |

**Main screen layout (`Version: Oct 10/Main screen` component `7:9508`):**
```
mode: column, height: 393px
fills: linear-gradient(225deg, rgba(255,235,57,1) 2%, rgba(255,158,45,1) 100%)
borderRadius: 0px 0px 30px 30px
```
Contains: `Version: Oct 10/Header` (logo + status bar) + balance area + action buttons row

**"Latest Transactions" header (`Frame 1171278135`):**
```
mode: row, padding: 20px 20px 4px
justify: space-between
```
- TEXT "Latest Transactions": Gilroy Medium 500, 16px, lineHeight 24px, `#121212`
- `temp btns small` component (`7:5118`): small filter chip, white fill + `#E7E9ED` border, 12px radius

---

## 3. KYC (#7:8855)

4 screens documenting the Sumsub-based KYC flow.

### 3a. Sumsub Imitation Frame (`7:8856`)

Size: 375×812px, fill `#1BEDBA` (bright teal — test/placeholder)

States listed:
- `approved`
- `rejected`
- `user didn't continue or needs input`

Text: "KYC process in sumsub" (Gilroy SemiBold, 44px) + "back" link (underline)

### 3b. KYC Approved / 01 (`7:8862`)

375×812px, white background

Structure:
- `Version: Oct 10/Header` at top (375×101px, white)
- Content area: padding `24px 20px 0px`, gap 24px — success state content
- `TabBar - mvp` (Property 1=1, version=just line)
- Button area at **y:726**, padding `0px 20px`:
  - `Button / text` Primary — text: **"Continue"** (Gilroy SemiBold 600, 20px)

### 3c. KYC Rejected / 01 (`7:8890`)

375×812px, white background

Structure:
- `Version: Oct 10/Header` at top
- Content area with rejection info
- `TabBar - mvp`
- No primary CTA (rejected state — no "try again" button visible at this depth)

### 3d. KYC in Progress / 01 (`7:8913`)

375×812px, white background

Structure:
- `Version: Oct 10/Header` at top
- Content area with in-progress state
- `TabBar - mvp`
- Button group at **y:656**, padding `0px 20px`, gap 12px:
  - `Button / text` Primary — text: **"Continue KYC"** (amber fill `#FFB800`)
  - `Button / text` Secondary gray — text: **"Do it later"** (white fill + `#E7E9ED` border)

---

## 4. Profile (#7:11796)

56 screens covering the entire Profile section and all security sub-pages.

### 4a. Main Profile Screens

| Screen | Node | Description |
|---|---|---|
| Profile / 01 | `7:12034` | Default profile — all tiles active |
| Profile / 02 | `7:12065` | Profile variant 2 |
| Profile / 03 | `7:12002` | Profile variant 3 |
| Profile / 4 | `7:12017` | Profile variant 4 |
| Profile waiting KYC / 01 | `7:12096` | Profile when KYC not yet started |
| Profile Pending request / 01 | `7:12127` | Profile with pending action |
| Profile all good / 01 | `7:12158` | Profile fully verified, all features enabled |
| Personal Info (KYC ok) / 01 | `7:12449` | Personal info with verified KYC |
| Personal Info (KYC not ok) / 01 | `7:12466` | Personal info with failed KYC |
| Personal Info / 02 | `7:12289` | Personal info edit |
| Banking ID / 01 | `7:12439` | Banking ID card |
| Banking ID / 02 | `7:11797` | Banking ID variant |
| About / 01 | `7:13105` | About screen |

### 4b. Transaction Upload Docs

| Screen | Node | Description |
|---|---|---|
| Transaction Send upload docs / 01 | `7:12189` | Upload docs for send |
| Transaction Send upload docs / 2 | `7:12221` | Upload docs step 2 |
| Transaction Swap upload docs / 01 | `7:12205` | Upload docs for swap |
| Transaction Swap upload docs / 02 | `7:12237` | Upload docs step 2 |

### 4c. Beneficiary List

| Screen | Node | Description |
|---|---|---|
| Beneficiary List Empty / 01 | `7:12319` | No beneficiaries yet |
| Beneficiary List / 01 | `7:12335` | List with items |
| Beneficiary List / 02 | `7:12348` | List variant |
| Beneficiary List / 03 | `7:12357` | List variant |
| Beneficiary List / 04 | `7:12392` | Add/edit state |
| Beneficiary List / 05 | `7:12409` | Step 5 |
| Beneficiary List / 06 | `7:12425` | Step 6 |
| Beneficiary List country / 01 | `7:12373` | Country selection overlay |

### 4d. Security Sub-pages

| Screen | Node | Description |
|---|---|---|
| Security / 01 | `7:12483` | Security settings main |
| Change password / 01 | `7:12506` | Change password step 1 |
| Change password / 2 | `7:12530` | Change password step 2 |
| Google Authenticator / 01 | `7:12700` | 2FA setup initial |
| Google Authenticator / 02 | `7:12856` | 2FA step 2 |
| Google Authenticator / 03 | `7:13002` | 2FA step 3 |
| Google Authenticator / 04 | `7:13024` | 2FA step 4 |
| Google Authenticator / 05 | `7:12556` | 2FA step 5 |
| Email 2FA / 01 | `7:12726` | Email verification step 1 |
| Email 2FA / 02 | `7:12880` | Email verification step 2 |
| Email 2FA / 03 | `7:12580` | Email verification step 3 |
| SMS 2FA / 01 | `7:12752` | SMS verification step 1 |
| SMS 2FA / 02 | `7:12928` | SMS verification step 2 |
| SMS 2FA / 03 | `7:12604` | SMS verification step 3 |
| MPIN / 01 | `7:12778` | MPIN setup step 1 |
| MPIN / 02 | `7:12904` | MPIN step 2 |
| MPIN / 03 | `7:12628` | MPIN step 3 |
| MPIN / 4 | `7:12652` | MPIN step 4 |
| MPIN / 5 | `7:12676` | MPIN step 5 |
| Change PIN / 01 | `7:12804` | Change PIN step 1 |
| Change PIN / 02 | `7:12952` | Change PIN step 2 |
| Change PIN / 3 | `7:12830` | Change PIN step 3 |
| Change PIN / 4 | `7:12976` | Change PIN step 4 |

### 4e. Transactions (from Profile context)

| Screen | Node | Description |
|---|---|---|
| Transaction profile / 01 | `7:13073` | Transaction list in profile |
| Transaction / 2 | `7:13079` | Transaction detail |
| Transaction / 3 | `7:13090` | Transaction detail variant |
| Transaction Empty / 01 | `7:12307` | Empty transactions |

### 4f. Invite

| Screen | Node | Description |
|---|---|---|
| Invite / 01 | `7:8948` | Invite friends screen |
| Invite / 2 | `7:8970` | Invite step 2 |

### 4g. WhatsApp Chat context (`7:11811`, `7:8985`)

Used to show how the invite/receive link looks when shared via WhatsApp — actual iMessage/WhatsApp screenshot used as reference.

---

## 5. Wallets (#7:13240)

11 screens covering wallet detail views.

| Screen | Node | Description |
|---|---|---|
| Main screen wallet / 01 | `7:13241` | Wallets tab main screen — all wallets list |
| EURO wallet / 01 | `7:13255` | EURO fiat wallet detail |
| EURO wallet / 02 | `7:13277` | EURO wallet variant |
| EURO wallet / 03 | `7:13709` | EURO wallet variant 3 |
| EURO wallet share / 01 | `7:13288` | EURO wallet with sharing option |
| EURO wallet blocked / 2 | `7:57364` | EURO wallet in blocked state |
| Crypto wallet / 01 | `7:13480` | Crypto wallet detail |
| Crypto wallet / 02 | `7:13504` | Crypto wallet variant |
| Crypto wallet / 3 | `7:13402` | Crypto wallet variant 3 |
| Crypto wallet Receive / 02 | `7:13429` | Crypto wallet in receive state |
| Crypto wallet Receive / 03 | `7:13454` | Crypto wallet receive variant |

---

## 6. Swap (#7:13737)

11 screens showing the complete swap flow.

**Canvas-level section header (amber `#FFB800`):** "Swap" — section label
**Note header (amber `#F6C851`):** Link to Lottie animation: https://www.figma.com/design/93zeJZd97zjhkVwveV7eIj/Risely-Mobile---Future-Versions?node-id=8-34456

### Swap Flow States

| Screen | Node | State | Key detail |
|---|---|---|---|
| Swap / 01 | `7:13759` | **Empty state** — no wallets selected | `Button / text` Secondary color (disabled `#FFEFC5` fill) at y:712, TabBar at bottom |
| Swap / 02 | `7:13810` | **From selected** | Main content at 0.4 opacity + `Convert form (Property 1=Swap convert from)` overlay at y:290, borderRadius `20px 20px 0px 0px` |
| Swap / 03 | `7:13827` | **From + search open** | Convert from + `iOS Keyboards` at 0.4 opacity; `Convert from + Search` drawer at y:70 (375×742px, white, 20px radius, blur shadow) |
| Swap / 04 | `7:13770` | **To selected** | `Convert form (Property 1=Convert to)` at y:222 |
| Swap / 05 | `7:13787` | **To + search open** | `Convert to + Search` drawer at y:70 |
| Swap / 06 | `7:13892` | **Amount entry** | Numeric keyboard (`Property 1=NumericKeyboard`) at y:476 |
| Swap / 07 | `7:13880` | **Insufficient balance** | `Alert & Notification & Toast` (Error: `#FFDEDB`) at y:52, padding `12px 8px`, borderRadius 12px; Button shows CTA with proper state |
| Swap / 08 | `7:13854` | **Review/Confirmation** | Primary amber button at bottom |
| Swap / 09 | `7:13867` | **Success** | Center-aligned content with gap 20px, padding bottom 40px |
| Swap / 10 | `7:13738` | **Overflow/scroll** (375×812) | Scrollable — amount field at y:766 |
| Swap / 11 | `7:13746` | **Overflow/scroll** (375×896) | Extended height + buttons area |

**`Convert form` bottom drawer layout:**
```
fills: #FFFFFF
strokes: #F4F6F9 (1px)
effect: boxShadow 0px 4px 34px rgba(0,0,0,0.1) + backdropFilter blur(10px)
borderRadius: 20px 20px 0px 0px
```
- Header row: `Frame 1171277139`, padding `20px 20px 12px`, gap 20px, bottom stroke `#F4F6F9`
- Content area: `Frame 1171277325`, padding `0px 0px 10px`, gap 40px, center-aligned

**`Convert from + Search` / `Convert to + Search` drawer:**
```
position: absolute y:70, 375×742px
fills: #FFFFFF
strokes: Light gray (#F4F6F9)
effect: boxShadow 0px 4px 34px rgba(0,0,0,0.1) + backdropFilter blur(10px)
borderRadius: 20px 20px 0px 0px
```
Contains keyboard at bottom (AlphabeticKeyboard `7:7374`).

---

## 7. Send (#7:13911)

41 screens across the full send flow (FIAT internal/external + Crypto).

Frame names in Figma lost their prefix text — all appear as `/ version (Antier1010) / NN`. Screens span steps 01–13 across multiple send sub-flows.

Key observations:
- Many screens use the numeric keyboard overlay (y:476, 375×336px, `#D1D3D9` fill + blur)
- Same `Convert form` pattern as Swap for wallet/network selection
- Standard Header + content + amber primary CTA + HomeIndicator pattern

---

## 8. Receive (#7:14633)

### 8a. FIAT Receive

| Screen | Node | Size | Description |
|---|---|---|---|
| FIAT Receive / 01 | `7:14742` | 375×1032px (scroll) | Full FIAT receive with account details |
| FIAT Receive / 02 | `7:14780` | 375×812px | FIAT receive + iOS system share sheet overlay |
| FIAT Receive / 03 | `7:14754` | 375×1032px | FIAT receive + "Copied" toast (black pill `#121212`, 10px radius) |

**FIAT "Copied" toast:**
```
Frame 1171277775, position: x:159, y:764
padding: 4px 8px, gap: 10px, borderRadius: 10px
fill: #121212
TEXT "Copied": Gilroy Medium 500, 12px, lineHeight 16px, white fill
```

### 8b. Crypto Receive

| Screen | Node | Size | Description |
|---|---|---|---|
| Crypto Receive / 01 | `7:14634` | 375×1015px (scroll) | Crypto receive with QR code |
| Crypto Receive / 02 | `7:14705` | 375×812px | Crypto + wallet selection drawer (`Property 1=Wallets` form at y:426) |
| Crypto Receive / 03 | `7:14650` | 375×1015px (scroll) | Crypto receive variant 3 |
| Crypto Receive / 04 | `7:14688` | 375×812px | Crypto + network selection drawer (`Property 1=Network` form at y:358) |
| Crypto Receive / 05 | `7:14722` | 375×812px | Crypto + network selection + keyboard open (y:476) |
| Crypto Receive / 06 | `7:14669` | 375×812px | Crypto + iOS system share sheet (`Sharing - System standard sharing popup`) |

**iOS Share Sheet component (`Version: Oct 10/Sharing - System standard sharing popup` `7:10012`):**
```
position: absolute y:156, 375×656px
Contains:
  - ShareSheet frame: 390×656px, fill rgba(250,250,250,0.93) + backdropFilter blur(40px), borderRadius 13px 13px 0 0
  - Logo icon: absolute x:23 y:23, 26×26px
```

**Design note (amber `#ECC2B5` header):** "Stage: Before KYC=OK" — links to breakpoints doc

**Design annotation:** "result we tested in WhatsApp this should look like that" + "Please Fix icon quality" — WhatsApp Chat frame shows how the share message renders in iMessage/WhatsApp.

---

## 9. App State: KYC In Progress (#3:48388)

*(Full data from session summary)*

All main tabs + Profile visible but locked behind KYC prompt.

### KYC In Progress Screens

| Screen | Description |
|---|---|
| Sumsub imitation (`#3:48572`) | `#1BEDBA` bg with states listed: approved, rejected, user didn't continue |
| Welcome prompt | "Welcome!" (SemiBold 600, 24px, 32px lineHeight) + KYC call-to-action copy |
| Home / KYC blocked | Main top header (amber gradient) + disabled action buttons + TabBar |
| Swap / KYC blocked | "Swap currencies between your Risely wallets" (ExtraBold 800, 32px, gradient text) + locked state |
| Wallets / KYC blocked | "All your Risely wallet details in one place" + 240×240px amber circle |
| Send / KYC blocked | "Send from All Your Risely wallets" + amber gradient ellipses visual |
| Profile / KYC pending | 6 active tile items + 5 at `opacity: 0.4` (disabled) |
| Personal Info | 7 `Field` components + 2 Secondary gray buttons |
| Security | `Security` component (`3:38415`) |

**KYC-blocked overlay pattern (used in Swap/Wallets/Send):**
```css
/* "If balance is 0" frame */
position: absolute;
y: 626 (or 661);
width: 375px;

/* Inner content */
text: "In order to access this feature, please complete the KYC process"
font: Gilroy SemiBold 600, 18px, lineHeight 20px, width 320px
button: Button Size=2xl Primary (amber #FFB800), borderRadius 12px
```

**Welcome screen copy:**
```
Title: "Welcome!"
Subtitle: "You have completed basic registration steps."
Heading: "It's time to get verified"
Body: "This step is crucial for preventing fraud and protecting your account. 
       It also guarantees you're in a safe and legal company."
Section label: "Additional information required"
CTA: Primary amber button
```

**Top header component (`Main - top header` `3:46746`):**
```
fill: linear-gradient(23deg, rgba(255,213,105,1) 0%, rgba(255,235,182,1) 100%)
borderRadius: 0px 0px 30px 30px
```

---

## 10. App State: Register — Before KYC (#3:49236)

Registration flow before any KYC is started.

| Screen/Frame | Node | Description |
|---|---|---|
| Finish | `3:49237` | Final registration complete screen |
| Next | `10:255469` | Next step in registration |
| State overview | `3:49238` | Frame listing all KYC states: approved, rejected, didn't continue, not started, "Login if KYC" |
| Registration screens | `3:49257`–`3:49355` | Main registration form steps |
| Phone Verif frame | `3:49435` | "Phone Verif" — same verification component as email, different text |
| Verif | `3:49650` | Code verification |
| with keyboard / without keyboard | `3:49620`, `3:49621` | Two keyboard states of verification |

**State overview frame (`3:49238`) labels:**
- `approved (normal state of the app)` → #3:49239
- `rejected` → #3:49240
- `user didn't continue or needs input` → #3:49241
- `not started` → #3:49242
- `Login if KYC` → #3:49243

**Note from design:** "Same component of verification just different text and fixed UI/text" — the Email and Phone verification screens reuse the same component with different copy.

**Keyboard note:** "Only if user closed the keyboard" → frame `3:49404` — special state for when keyboard is dismissed.

---

## 11. App State: KYC Passed → First Top-Up (#3:51421)

Flow that triggers after KYC is approved — first time using the app.

| Screen/Frame | Node | Description |
|---|---|---|
| SMS received - KYC OK | `3:51423` | iMessage notification showing KYC approval |
| Email received - KYC OK | `3:51430` | Email notification for KYC approval |
| Home screen (first visit) | `3:51435` | Main screen: `Main - top header` (amber gradient header) + action area |
| Wallets (first visit) | `3:51466` | Wallets tab: "All Your Risely wallets" (240×240px circle) + Receive CTA + "Share them with anyone to receive funds" copy + `Property 1=Receive` TabBar-style |
| Crypto Receive | `3:51513` | Receive crypto — wallet detail frame (`Frame 1171278151`) with Receive action + TabBar |
| iPhone 13 mini - 595 | `3:51542` | Home screen variant with `Headers mobile` |

**Wallets first-visit key content:**
```
"All Your Risely wallets" — inside 240×240px amber circle
"Share them with anyone to receive funds"
"All your Risely wallet details in one place"
CTA button: Property 1=Receive
```

**Notification copy patterns:**
- SMS: KYC approved confirmation
- Email: KYC approval email

---

## 12. Normal State of the App (#3:51765)

Full-featured app state after KYC complete and wallet funded.

| Screen/Frame | Node | Description |
|---|---|---|
| Referrals | `3:51766` | Referral program screen |
| TOPUP SMS received | `3:51773` | Push notification on topup |
| TOPUP Email received | `3:51780` | Email: subject template `%CUR% %NN% received go to the app` |
| Home screen | `3:51786`, `3:51807`, `3:51881`, `3:50633`, `3:50732` | Multiple home screen states |
| Main Wallet - Asset - Deep Dive | `3:51850` | Wallet detail expanded view |
| Profile | `3:51902` | Profile screen (normal, fully verified) |
| Delete account popup | `3:51908` | "popup tbd: are you sure to remove all your data from everywhere?" |
| Security | `3:51910` | Security screen |
| Banking ID | `3:51915` | Banking ID screen |
| Note | `3:51921` | "Check 'Transfers 2.0' prototype and design" — cross-reference to Transfers section |
| Support 1st | `3:48842` | Support screen (first visit) |
| Design decision | `10:259778` | "Decided to have only Zendesk chat for support" |
| Feature states | `3:50545`, `3:50546` | `not available` / `available` — feature gating states |
| Referrals variant | `3:50675` | Referral screen variant |
| SMS received (topup) | `3:50553` | SMS notification for top-up |
| "You earned $1" frame | `3:50591` | Referral success: "You earned $1" + "You already have $1 to spend on fees. The more people you invite, the lower your [fees]" |

**Email topup notification template:**
```
Subject: "%CUR% %NN% received go to the app"
→ e.g. "EUR 100 received go to the app"
```

**Support decision:** Only Zendesk chat — no custom support UI.

**Delete account modal copy:** "are you sure to remove all your data from everywhere?" — popup TBD.

---

## 13. Sections Not Fully Documented

| Section | Node | Reason |
|---|---|---|
| Ideation: Send & Address book - upgraded | `6:219513` | Canvas ideation only — not final prototype |
| Local Components for 10 oct | `7:9456` | Component library reference, not flow screens |
| Transfers | `3:44825` | 14000×21180px canvas — extremely large; note in Normal State references "Transfers 2.0" |
| Tooltips for send (general) | `3:46170` | Tooltip documentation only |
| Send (second section) | `3:46984` | Duplicate/extended send flows |
| Email to invite to Risely | `3:48125` | Email template designs only |

---

## 14. Component Cross-Reference

| Use case | Component ID | Notes |
|---|---|---|
| Primary CTA (amber) | `7:4587` | 52px height, `#FFB800` fill, 12px radius |
| Secondary CTA (gray) | `7:4627` | White fill, `#E7E9ED` border, same size |
| Disabled CTA | `7:4593` | `#FFEFC5` fill (brand secondary light) |
| Bottom nav | `6:69282` | `TabBar - mvp` — frosted glass |
| Top header (amber) | `3:46746` | `Main - top header` — gradient `23deg` |
| Logo header | `7:10376` | `Version: Oct 10/Header` — 375×101px, white |
| KYC blocked overlay | — | See Section 9 for CSS pattern |
| Error toast | `7:8312` | `#FFDEDB` fill, 12px radius, 12px 8px padding |
| Success toast | `7:8433` | `Additional/Green/50` (`#E5F3D6`) fill |
| "Copied" toast | — | Black pill `#121212`, 10px radius, inline position |
| iOS share sheet | `7:10012` | blur(40px) + `rgba(250,250,250,0.93)` |
| Wallet/network picker | `7:11367` | `Version: Oct 10/Convert form` bottom drawer |
| iOS keyboard (alpha) | `7:7374` | `#D1D3D9` + blur(54px) |
| iOS keyboard (numeric) | `7:7417` | Same style |
| HomeIndicator | `1:1294` / `7:7561` | 375×34px |
