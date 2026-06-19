# Risely [my file] — Mobile Prototypes Page

**Source:** Figma "Risely [my file]" (`Qwbr3pXZJjh72Fx7kJOmqP`), page `Mobile - Prototypes` (`#6:218439`)
**Purpose:** Full interactive prototype library for the Risely mobile app — Oct 10 version. 15 sections covering all flows, app states, and the upgraded ideation designs. Critical for widget implementation.

---

## 1. Page Overview

| Section | Node | Canvas size | Priority |
|---|---|---|---|
| Local Components for 10 oct | `#7:9456` | 20007×5242px | Component reference |
| Onboarding | `#7:11418` | 9047×6558px | Auth/sign-up flow |
| Key screens | `#7:56575` | 10776×7684px | Core UI states |
| Profile | `#7:11796` | 20007×12883px | Full profile section |
| Wallets | `#7:13240` | 20007×4679px | Wallet screens |
| Swap | `#7:13737` | 5145×4067px | Swap flow |
| Send | `#7:13911` | 6378×9024px | Send flow (4 sub-flows) |
| Receive | `#7:14633` | 5833×4990px | Receive flow |
| Transfers (deep) | `#3:44825` | 14000×21180px | Full transfer prototypes |
| Send v2 (deep) | `#3:46984` | 20000×19451px | Upgraded send prototypes |
| App state: KYC in progress | `#3:48388` | 5000×4000px | KYC waiting state |
| App state: Register - before KYC | `#3:49236` | 3017×15478px | Registration flow |
| App state: KYC passed → first topup | `#3:51421` | 8990×4000px | Post-KYC empty state |
| Normal state of the app | `#3:51765` | 14000×4568px | Active wallet state |
| 🟢 Ideation: Send & Address book - upgraded | `#6:219513` | ~9000px wide | **Widget priority** |

---

## 2. Design Tokens (page-wide)

| Token | Value |
|---|---|
| Frame size | 375×812px (iPhone 13 mini) |
| Brand amber | `#FFB800` ("Main") |
| Gradient (header) | `linear-gradient(225deg, rgba(255,235,57,1) 2%, rgba(255,158,45,1) 100%)` |
| Gradient (warm) | `linear-gradient(23deg, rgba(255,213,105,1) 0%, rgba(255,235,182,1) 100%)` |
| Gradient text ("Risely") | `linear-gradient(225deg, rgba(255,215,1,1) 2%, rgba(255,138,1,1) 100%)` |
| Main black | `#121212` |
| Light gray bg | `#F4F6F9` |
| Border gray | `#E7E9ED` |
| Tab bar bg | `rgba(255,255,255,0.75)` + `blur(25px)`, shadow `0px 4px 30px rgba(0,0,0,0.1)` |
| Bottom drawer bg | `#FFFFFF`, `borderRadius: 20px 20px 0px 0px`, shadow `0px 4px 34px rgba(0,0,0,0.1)`, `blur(10px)` |
| Keyboard overlay | `#D1D3D9`, `blur(54.37px)`, 375×336px at y:476 |
| Font | Gilroy |

---

## 3. Local Components for 10 oct (`#7:9456`)

Component showcase library documenting the Oct 10 version components. Not a flow — reference only.

### Key Components Showcased

| Component | ID / Key | Notes |
|---|---|---|
| `Version: Oct 10/Transaction` | `7:11077` | Transaction list row (multiple instances shown) |
| `Version: Oct 10/Header` | `7:10395` (Only Arrow) | 375×114px header |
| `Version: Oct 10/History upd` | `7:9462` | Transaction history list component |
| `Version: Oct 10/Sharing - System standard sharing popup` | `7:10012` | iOS share sheet: 375×656px, `rgba(250,250,250,0.93)` fill, `blur` |
| `Version: Oct 10/Button groups` | `7:10921` | Button group component |
| `Version: Oct 10/Get verified icon` | `7:9976` | 100×100px verification icon |
| `Version: Oct 10/Convert form` | `7:11367` | Bottom drawer: wallets / network / swap form |
| `Version: Oct 10/Tile for Text items` | `7:10991` | Profile menu tile row |
| `iOS / Keyboards` (AlphabeticKeyboard+Suggestions=On) | `7:7374` | Full-screen keyboard |
| `iOS / Keyboards` (NumericKeyboard+Suggestions=On) | `7:7417` | Numeric keyboard |
| `Button / text` | `6:37389` / `3:35527` | CTA button, primary amber |
| `temp btns small` | `7:5118` | Small action button |
| `user` avatar | `6:68793` | 58×58px user avatar |
| `_Badge base` | — | Badge component, padding `4px 8px` |
| `Nav=Home` / `Nav=Wallets` / `Nav=Profile` | `7:4740/4762/4784` | Tab bar nav states |

### Key Layout Details
- **ShareSheet** (390×656px, `rgba(250,250,250,0.93)`, `backdropFilter: blur`) at x:0, y:0 — iOS native share popup frame
- **Profile inner frame**: padding `24px 20px`, gap `16px`, border-bottom `#F4F6F9`
- **From/To selectors**: "From" label (14/18 Medium), "To" button (`Neutral/Gray/0`, border `#E7E9ED`, padding `12px 16px`)
- **Dropdown** input: `Input / Dropdown` frame (fill width), options frame (borderRadius `0px 0px 12px 12px`)
- **"Raise a Ticket"** — support entry component
- Transaction address style: `14/18 Medium`, color `#818991`, text `0x8b6C8fd93d6F4CeA42Bbb345D...`

---

## 4. Onboarding (`#7:11418`)

Canvas: 9047×6558px. Organized into 6 horizontal sub-flows with amber section headers.

### Sub-flow Map

| Sub-flow | Header label | x position | Screens |
|---|---|---|---|
| Sign up | "Sign up" | x:490 | 6 screens (01–06) |
| Email | "Email" | x:3377 | 9 screens (01–09) |
| Sign in | "Sign in" | x:0 | 5 screens (01–05) |
| When click referral code | "When click referral code" | x:1802 | 2 screens |
| Google sign up | "Google when you do not have account" | x:490 | 2 screens |
| Google sign in | "Google sign in" | x:492 | 3 screens |
| Privacy Policy / T&C | "Terms and conditions" | x:8456 | 1 long screen (375×5950) |

### Sign Up (Antier1010) — 6 screens

| Frame | Node | Position | Notes |
|---|---|---|---|
| Onboarding / 01 | `#7:11419` | x:490, y:1489 | 375×812px, column layout |
| Onboarding / 6 (PIN screen) | `#7:11542` | x:921, y:1489 | Has `Property 1=Send from` (header) + `Status Bar` |
| Onboarding / 03 | `#7:11554` | x:1362, y:1487 | Auto layout vertical |
| Onboarding / 04 | `#7:11566` | x:1803, y:1489 | With bottom dots indicator + `Version: Oct 10/Header` |
| Onboarding / 05 | `#7:11641` | x:2274, y:1489 | overflowScroll y, with AlphabeticKeyboard |
| Onboarding / 02 | `#7:11781` | x:7732, y:3083 | 375×812px |

### Email Sub-flow (9 screens)

| Frame | Node | x position | Key content |
|---|---|---|---|
| Email / 01 | `#7:11464` | x:3377 | Marketing screen + success toast (`#E5F3D6`) |
| Email / 02 | `#7:11533` | x:3848 | 375×812 |
| Email / 03 | `#7:11430` | x:4347 | overflowScroll y, AlphabeticKeyboard |
| Email / 04 | `#7:11446` | x:4858 | `#7:10232` marketing screen 2 |
| Email / 05 | `#7:11474` | x:5847 | 375×812 |
| Email / 06 | `#7:11505` | x:6326 | With marketing screen 3 + Security Verification |
| Email / 07 | `#7:11483` | x:6818 | With marketing screen 2 + Security Verification |
| Email / 08 | `#7:11512` | x:7357 | Marketing screen + Security Verification section |
| Email / 09 | `#7:11519` | x:7883 | Marketing screen + Security Verification section |

### Referral Code

- `Onboarding referral / version / 01` (`#7:11729`, x:1803, y:2790) — referral code entry screen
- `Onboarding referral / version / 02` (`#7:11744`, x:2271, y:2790)
- **Tooltip text**: "Enter a referral code from a Risely invite to receive signup rewards." — 16/24 Medium, `#121212`, white fill, borderRadius 20px

### Sign In (5 screens)

| Frame | x, y position | Key content |
|---|---|---|
| Sign in / 01 | x:4, y:4059 | Login form + error toast (`#FFDEDB`) |
| Sign in / 5 | x:490, y:4059 | Two Send from headers |
| Sign in / 02 | x:996, y:4059 | overflowScroll y, AlphabeticKeyboard |
| Sign in / 03 | x:1482, y:4059 | overflowScroll y |
| Sign in / 04 | x:2044, y:4059 | MPIN popup: `Version: Oct 10/pop up`, white fill, `blur(10px)`, `borderRadius: 20px 20px 0px 0px` |

### Google flows

- **Google sign up 01–02** (x:490, x:1075, y:2790) — image backgrounds (Google sign-in button states)
- **Google sign in 01–03** (x:971, x:1556, x:2044, y:5122) — similar pattern
- Screen `#7:11610` uses `Property 1=Send from` (header, componentId 1:116) + Google image bg

### Key Annotations

| Annotation | Position | Content |
|---|---|---|
| "How it should work" | x:921, y:2343 | Link to design doc (underlined, `#ECD6B5` fill) |
| "when OTP has sent to email will be notification about this" | x:3377, y:2484 | Salmon fill annotation |
| "See breakpoints here" | various | Link to breakpoints doc |
| Scroll indicator | x:8176 | "Scroll here on every page…" vertical text + line |

### Key Components Used

| Component | ID | Use |
|---|---|---|
| `Property 1=Only Arrow` (Version: Oct 10/Header) | `7:10395` | 375×114px header with back arrow |
| `Property 1=AlphabeticKeyboard, Suggestions=Off` | `7:7436` | Keyboard at y:522, 375×290px |
| `Property 1=NumericKeyboard, Suggestions=Off` | `7:7478` | PIN keyboard |
| `onb marketing screen 1/2/3` | `7:10231/10232` | Scrollable marketing fill, 375×620px |
| `Property 1=Large, Property 2=Success` | `7:8433` | Toast: `#E5F3D6` fill, borderRadius 12px |
| `Property 1=Large, Property 2=Error` | `7:8393` | Toast: `#FFDEDB` fill, borderRadius 12px |
| `Version: Oct 10/pop up` | `7:10151` | MPIN popup (Password difficulty=false) |

---

## 5. Key Screens (`#7:56575`)

Canvas: 10776×7684px. Shows all key app states side by side for comparison.

### Section Headers (amber)

| Label | x position | Coverage |
|---|---|---|
| "Main screen" | x:20 | Main dashboard |
| "Normal state of the app" | x:0 | Full normal state row |
| "After KYC approved & Balance <0" | x:4339 | Post-KYC empty state |
| "When KYC is not approved" | x:5248 | KYC rejected/pending |
| "Wallets" | x:3109 | Wallets tab |
| "Profile" | x:3609 | Profile page |
| "Successfully sent" | x:414 | Send success |
| "Successfully Swap" | x:884 | Swap success |
| "Failed Swap" | x:1306 | Swap failure |
| "Empty state" (Notifications) | x:6900 | Empty notifications |

### Key Frames

| Frame | Node | Size | Key details |
|---|---|---|---|
| Main screen / 01 | `#7:8789` | 375×1056px | Tall — `History upd` + `Nav=Home` at y:973 |
| Main screen Wallets / 02 | `#7:8797` | 375×812px | Wallets tab, `Nav=Wallets` |
| Main screen Profile / 01 | `#7:9175` | 375×1620px | overflowScroll y, `Nav=Profile` at y:1537 |
| KYC Approved / 01 | `#7:8782` | 375×812px | Post-KYC main screen |
| KYC not approved / 01 | `#7:8775` | 375×812px | No wallet access |
| Transactions / 01–03 | `#7:9312–9343` | 375×812px | Transaction list x3 with frosted overlay |
| Notification Empty / 01 | `#7:8843` | 375×812px | Empty state x:6903 |
| Notification / 01 | `#7:8934` | 375×849px | With notifications x:7455 |

### KYC Section (inner `#7:8855`, 2012×1206px)

| Frame | Node | Fill | Notes |
|---|---|---|---|
| Sumsub imitation | `#7:8856` | `#1BEDBA` (teal) | Fake Sumsub SDK screen |
| KYC Approved / 01 | `#7:8862` | `#FFFFFF` | Success state |
| KYC in process / 01 | `#7:8913` | `#FFFFFF` | Pending state |
| KYC Rejected / 01 | `#7:8890` | `#FFFFFF` | Rejected state |

### Notification Templates (x:7995–9907)

| Component | Size | Notes |
|---|---|---|
| `Email` frame | 1440×972px | Full email template with browser chrome (`#202124` top bar) |
| `SMS` frame | 355×hug | `rgba(245,245,245,0.5)` fill, `blur`, borderRadius 12px, padding 12px |
| Alert stack (4 types) | 334px wide | Informative `#EBECFF`, Success `#E5F3D6`, Error `#FFDEDB`, Warning `#FFEFC5` — all with shadow |

### Annotations

| Annotation | Content |
|---|---|
| "button opens 'receive' feature" (salmon) | KYC Approved CTA — opens Receive flow |
| "when KYC not approved, wallet is not available" (salmon) | Wallets tab blocked |
| "in chat the design remains the same as in the current version of the application" | Support/chat no redesign needed |
| "See breakpoints here" links | Multiple links to breakpoints doc |

---

## 6. Profile (`#7:11796`)

Canvas: 20007×12883px. Full profile flow including all sub-pages.

### Section Labels (amber headers, all at y:~1430)

Profile, Waiting KYC, Pending request, All good, Normal state, About us, Transactions, Beneficiary List, Verification center, Personal information, KYC completed, KYC not completed, Security, Face recognition, Google Authenticator, Change password, Email (auth), SMS (auth), MPIN, Change PIN, Send (upload docs), Swap (upload docs), Transaction / upload docs, Default, "PIN can not be the same", "PIN updated"

### Main Profile States

| Frame | Node | Size | Content |
|---|---|---|---|
| Profile / 01 | `#7:12034` | 375×1528px, overflow y | Full profile menu, `Nav=Profile` at y:1445 |
| Profile / 02 | `#7:12065` | 375×1772px, overflow y | Extended profile with intro section, `Nav=Profile` at y:1693 |
| Profile waiting KYC / 01 | `#7:12096` | 375×~1700px, overflow y | KYC waiting state, `Nav=Profile` at y:1697 |
| Profile Pending request / 01 | `#7:12127` | 375×overflow | Pending KYC state |
| Profile all good / 01 | `#7:12158` | 375×overflow | KYC verified state |
| Profile / 03 | `#7:12002` | 375×1421px | Scrollable with sections |
| Profile / 4 | `#7:12017` | 375×957px | Compact variant |
| Profile banking ID / 02 | `#7:11797` | 375×849px | Banking ID share state |
| WhatsApp Chat (banking ID share) | `#7:11811` | 375×812px | `#EFEFF4` fill — shows WhatsApp share result |

### Security Sub-sections

- Face recognition, Google Authenticator, Email OTP, SMS OTP, MPIN, Change PIN
- "PIN can not be the same" error state
- "PIN updated" success state
- "Change password" sub-flow

### Upload Docs Sub-sections

- `Transaction Send upload docs / version / 01` (`#7:12189`) — document upload during large send
- `Transaction Swap upload docs / version / 01` (`#7:12205`) — document upload during large swap
- Version 2 of each (screens 2)
- Annotation: "If new update" — update state indicator

### Key Component

- `Version: Oct 10/Tile for Text items` (`7:10991`) — profile menu row tile (row layout, padding `12px 20px`, fixed height, gap 8px)

---

## 7. Wallets (`#7:13240`)

Canvas: 20007×4679px. Main wallet screens + share flows.

### Screen Inventory

| Frame | Node | x Position | Size | Content |
|---|---|---|---|---|
| Main screen wallet / 01 | `#7:13241` | x:326 | 375×812px | Wallets tab home, `Nav=Wallets` at y:729 |
| My Wallets EURO wallet / 01 | `#7:13255` | x:268 | 375×812px | EUR wallet detail with history |
| My Wallets EURO wallet / 02 | `#7:13277` | x:699 | 375×812px | "intermediate state" watermark |
| My Wallets EURO wallet / 03 | `#7:13709` | x:1171 | 375×1032px, overflow | Long scrollable EUR detail |
| My Wallets EURO wallet share / 01 | `#7:13288` | x:2624 | 375×812px | With iOS share sheet |
| My Wallets crypto wallet / 3 | `#7:13402` | x:6364 | 375×812px | Crypto wallet detail |
| My Wallets crypto wallet Receive / 02 | `#7:13429` | x:6897 | 375×812px | With QR popup (`Version: Oct 10/pop up`, Property 1=Receive Wallet crypto QR) |
| My Wallets crypto wallet Receive / 03 | `#7:13454` | x:7361 | 375×812px | With iOS share sheet |
| My Wallets crypto wallet / 01 | `#7:13480` | x:7862 | 375×812px | Standard view |
| My Wallets crypto wallet / 02 | `#7:13504` | x:8347 | 375×812px | Another state |
| My Wallets EURO wallet blocked / 2 | `#7:57364` | x:6664 | 375×812px | Blocked wallet (Error Screens component) |
| Error Screens (Wallet is blocked) | `#7:57128` | x:6238 | 375×812px | `Error Screens / Type=Feature is blocked` |

### Navigation Annotations

```
EUR wallet action buttons:
  1. Receive → receive flow (see: Risely [shared] node 25-20892)
  2. Send → send flow (selected EUR)
  3. Swap → swap flow (selected EUR)

Crypto wallet action buttons:
  1. Send → send flow (selected ETH)
  2. Swap → swap flow (selected ETH)
```

- "Same as Receive screen, but without tab Fiat/Crypto" — annotation for Send QR screen
- "how long numbers should look like" → link to number display spec

### Share Result (WhatsApp)

- `WhatsApp Chat` frame (375×812, `#EFEFF4`) at x:2172 — mockup of EUR wallet address shared via WhatsApp
- `Media (2) 1` screenshot at x:3008 — actual WhatsApp result
- "This message should be pasted when user shares"
- "the result should look like this"

### Blocked Wallet State

`Error Screens` component (`6:68922`, `Type=Feature is blocked`):
- Decorative pattern background (opacity 0.6)
- Icon (212×212px)
- Heading + text
- CTA button: amber fill, borderRadius 12px

---

## 8. Swap (`#7:13737`)

Canvas: 5145×4067px. 11 screens showing the complete swap flow.

### Screen Flow

| Screen | Node | x, y | Size | State |
|---|---|---|---|---|
| Swap / 01 | `#7:13759` | x:0, y:1645 | 375×812 | Empty state (no keyboard) |
| Swap / 02 | `#7:13810` | x:599, y:1645 | 375×812 | `Convert form / Swap convert from` bottom drawer at y:290 |
| Swap / 03 | `#7:13827` | x:1102, y:1645 | 375×812 | `Convert from + Search` bottom drawer (375×742) |
| Swap / 04 | `#7:13770` | x:599, y:2701 | 375×812 | `Convert to` bottom drawer at y:222 |
| Swap / 05 | `#7:13787` | x:1102, y:2701 | 375×812 | `Convert to + Search` bottom drawer (375×742) |
| Swap / 06 | `#7:13892` | x:1726, y:1645 | 375×812 | NumericKeyboard (`Suggestions=On`) visible at y:476 |
| Swap / 07 | `#7:13880` | x:4712, y:1673 | 375×812 | **Insufficient balance** error — `Alert: Small/Error/Close=Yes` (`#FFDEDB`) |
| Swap / 08 | `#7:13854` | x:2265, y:1645 | 375×812 | Review/confirm screen |
| Swap / 09 | `#7:13867` | x:2751, y:1645 | 375×812 | Confirmation screen |
| Swap / 10 | `#7:13738` | x:3312, y:1645 | 375×812 | Success state |
| Swap / 11 | `#7:13746` | x:3785, y:1645 | 375×896 | Success with icon animation (taller) |

### Bottom Drawers

| Drawer | Component | Size | Notes |
|---|---|---|---|
| `Convert from` | `Property 1=Swap convert from` (`7:11391`) | 375×742 | From-currency selector, white fill, blur, `20px 20px 0px 0px` |
| `Convert from + Search` | Frame | 375×742 | Search enabled, same styling |
| `Convert to` | `Property 1=Convert to` (`7:11404`) | 375×742 | To-currency selector |
| `Convert to + Search` | Frame | 375×742 | Search enabled |

- "Empty state" label at x:39 — reference to screen 01

### Annotations

| Annotation | Fill | Content |
|---|---|---|
| "Insufficient balance" header | Amber | Labels screen 07 |
| "Icon animation: use code from Lottie from [link]" | `#F6C851` (yellow) | Success animation — link to Risely Future Versions Figma |
| Arrow connections | `#000000` | Flow arrows between screens |

---

## 9. Send (`#7:13911`)

Canvas: 6378×9024px. 4 parallel sub-flows (rows), each split into FIAT and Crypto.

### Sub-flow Structure

| Row | y position | Label | Screen count |
|---|---|---|---|
| Send / other wallet — FIAT | y:1701 | "FIAT" (150px watermark) | 13 screens (01–13) |
| Send / other wallet — Crypto | y:3499 | "Crypto" (150px watermark) | 11 screens (01–11) |
| Send / Risely client — FIAT | y:5832 | "FIAT" (150px watermark) | 10 screens (01–10) |
| Send / Risely client — Crypto | y:7613 | "Crypto" (150px watermark) | 11 screens (01–11) |

### Send / Other Wallet — FIAT (13 screens)

| Screen | Node | Size | Key content |
|---|---|---|---|
| / 01 | `#7:14277` | 375×1217px | Full form, inner scroll frame 375×1372 |
| / 02 | `#7:14255` | 375×812px | NumericKeyboard+Suggestions, inner scroll frame |
| / 03 | `#7:14234` | 375×1217px | Another form variant |
| / 04 | `#7:13912` | 375×1207px | Long scroll |
| / 09 | `#7:13933` | 375×906px | Shorter |
| / 10–11 | `#7:14118/14136` | 375×812px | Faded background (opacity 0.4) + new content |
| / 12 | `#7:14154` | 375×812px | Success/confirmation state |
| / 13 | `#7:14222` | 375×896px | Taller, with bottom indicator |

### Send / Other Wallet — Crypto (11 screens)

- Screens 01–02 (375×1149, 375×812): entry with `Convert form / Property 1=Wallets` bottom drawer (y:66, white fill, blur, `20px 20px 0px 0px`)
- Screen 02 special: `Convert from` bottom drawer visible (375×hug, white, blur, border `#F4F6F9`)
- Screens 04–05 (375×1159): long scrollable forms
- Screens 06–09 (375×898–812): form + review
- Screens 10–11 (375×812/896): success/confirmation

### Send / Risely Client — FIAT (10 screens)

- Screens 01–06 (375×967): main send form flow to a Risely user (FIAT)
- Screen 03 (`#7:14345`): **Insufficient balance** error state with `Alert: Small/Error/Close=Yes` (`#FFDEDB`)
- Screens 07–08 (375×812): faded variant + new layer
- Screens 09–10 (375×812/896): success states
- "Insufficient balance" section header (amber, x:5839)

### Send / Risely Client — Crypto (11 screens)

- Screens 01–06 (375×957 or 812): send-to-Risely crypto flow
- Screen 02 (`#7:14445`): with `Convert form / Property 1=Wallets` bottom (at y:426)
- Screen 04 (`#7:14380`): **Insufficient balance** error toast
- "Insufficient balance" section header (amber, x:5840)

### Key Annotations (amber + cream stickers)

| Annotation | Fill | Content |
|---|---|---|
| "Default" | Amber | Labels default state screen |
| "Insufficient balance" (×4) | Amber | One for each sub-flow error state |
| "link leading to the Fees page in the admin panel" | Salmon (`#ECC2B5`) | Link to admin fee config (4 instances, one per sub-flow) |
| "upload doc in case amount > limit from admin" | Cream (`#ECD6B5`) | Document upload requirement for large amounts |
| "Icon animation: use code from Lottie from [link]" | Yellow (`#F6C851`) | Success animation spec (4 instances, one per sub-flow) |

---

## 10. Receive (`#7:14633`)

Canvas: 5833×4990px. Two sub-flows (FIAT + Crypto) plus WhatsApp share test.

### FIAT Receive (y:1682, 3 screens)

| Frame | Node | x | Size | Content |
|---|---|---|---|---|
| Receive Fiat / 01 | `#7:14742` | x:766 | 375×1032px, overflow | Main receive screen with IBAN/account details |
| Receive Fiat / 02 | `#7:14780` | x:1328 | 375×812px | With iOS share sheet (`Version: Oct 10/Sharing`, y:156, 375×656) |
| Receive Fiat / 03 | `#7:14754` | x:1920 | 375×1032px | With "Copied" toast (`#121212` fill, borderRadius 10px): "Copied" |

### Crypto Receive (y:2866–2903, 6 screens)

| Frame | Node | x | Size | Content |
|---|---|---|---|---|
| Receive Crypto / 01 | `#7:14634` | x:766 | 375×1015px, overflow | Crypto address display |
| Receive Crypto / 02 | `#7:14705` | x:1322 | 375×812px | + Wallet selector (`Property 1=Wallets`) at y:426 |
| Receive Crypto / 03 | `#7:14650` | x:1782 | 375×1015px, overflow | Variant |
| Receive Crypto / 04 | `#7:14688` | x:2335 | 375×812px | + Network selector (`Property 1=Network`) at y:358 |
| Receive Crypto / 05 | `#7:14722` | x:2898 | 375×812px | + Wallet selector bottom + AlphabeticKeyboard (blur, `#D1D3D9`) |
| Receive Crypto / 06 | `#7:14669` | x:3369 | 375×812px | + iOS share sheet (`Version: Oct 10/Sharing`) |

### WhatsApp Share Test (x:2563–2065)

- `WhatsApp Chat` (375×812, `#EFEFF4`) — WhatsApp app UI mockup
- `Media (2) 1` (368×812) — screenshot of actual WhatsApp message result
- Connector from Receive Crypto /04 → WhatsApp Chat

**Annotations:**
- "result we tested in WhatsApp — this should look like that"
- "Please Fix icon quality" — icon quality issue flag
- `"text"` — label for message text field in share
- "See breakpoints here" → `https://www.figma.com/design/eGkFs1c5GmkUfEfh2vz5a0?node-id=1196-47696`

---

## 11. App State: KYC in Progress (`#3:48388`)

Shows all app screens when KYC has been submitted but not yet approved.

### Screens

| Frame | Node | x, y | Size | Content |
|---|---|---|---|---|
| Sumsub imitation | `#3:48553` | x:107, y:1218 | 375×812 | `#1BEDBA` teal — fake Sumsub with "KYC process in sumsub", outcomes listed: approved / rejected / user didn't continue |
| Main dashboard (KYC waiting) | `#3:48572` | x:1186, y:2396 | 375×812 | Amber gradient header `linear-gradient(23deg, rgba(255,213,105,1) 0%, rgba(255,235,182,1) 100%)`, `borderRadius: 0px 0px 30px 30px`, tab bar |
| Wallets tab (locked) | `#3:48635` | x:1573, y:2396 | 375×812 | "All Your Risely wallets" in 240×240 amber circle, `Main grad` fill, "If balance is 0" locked overlay |
| Send tab (locked) | `#3:48655` | x:1960, y:2396 | 375×812 | Decorative send graphic + "If balance is 0" KYC prompt overlay |
| Swap tab (locked) | `#3:48608` | x:2347, y:2396 | 375×812 | "Swap currencies between your Risely wallets" heading + decorative circles + KYC lock |
| Profile with Verification center | `#3:48688` | x:2923, y:2396 | 375×1134 | `Profile` component + `Verification center` (`State=KYC waiting`), tab bar |
| Profile sub-page (Personal info) | `#3:48705` | x:3340, y:2396 | 375×812 | Internal text header + Personal Info component |
| Security | `#3:48711` | x:3757, y:2396 | 375×1240 | Security component, tab bar |
| Onboarding step 1 | `#3:48718` | x:680, y:1218 | 375×812 | `Property 1=Onb icons` header + content + `TabBar-mvp` |
| Onboarding step 2 | `#3:48779` | x:1090, y:1218 | 375×812 | Onb icons + 2 CTA buttons (Primary + Secondary) |
| Onboarding step 3 | `#3:48753` | x:1500, y:1218 | 375×812 | Onb icons + `TabBar-mvp` |
| Onboarding step 4 | `#3:48809` | x:1925, y:1218 | 375×812 | Onb icons + 2 buttons |

### Locked State Copy

**"If balance is 0" overlay on Wallets/Send/Swap tabs:**
```
In order to access this feature, please complete the KYC process
[CTA button — 335px wide, borderRadius 12px, primary amber]
```

### Outcome Labels

- "approved" at x:680, y:2063 — above step 1 frame
- "rejected" at x:1508, y:2063 — above variant frame

---

## 12. App State: Register — Before KYC (`#3:49236`)

Canvas: 3017×15478px. Extremely tall — full registration flow from start to post-KYC.

### Vertical Section Headers (amber Figma headers)

| Label | y position | Content |
|---|---|---|
| "Signup / Login" | y:1178 | 457px tall header |
| "Email (if not google/apple)" | y:4132 | Email registration flow |
| "Phone" | y:7065 | Phone verification |
| "PIN & country" | y:9500 | PIN setup and country selection |

### Flow Entry

- "Start here" label (130px Gilroy Bold) at x:1988, y:1814
- "Login without keyboard" label at x:1380, y:2899

### Email Entry Screens (y:2053)

| State | x | Notes |
|---|---|---|
| Without keyboard (entered) | x:1988 | Inner scroll frame y:0, 375×812 |
| With keyboard (upfront) | x:2386 | Inner scroll frame y:-326 |
| Referral code field visible | x:830 | "Referral Code" label, tooltip shown |
- Label: "Typing email" (x:2396), "without keyboard" (x:1988)

**Referral tooltip** at x:830, y:2899: "Enter a referral code from a Risely invite to receive signup rewards." (white fill, borderRadius 20px, padding `20px 20px 40px`)

### Login Screens (y:2899)

| State | x | Notes |
|---|---|---|
| Login without keyboard | x:1562 | Form with some scroll |
| Without keyboard (full) | x:1988 | Standard email/password login |
| With keyboard | x:2386 | Keyboard pushed content up |

**Critical annotation:** "We should ask user to Login ONLY if he has logged out himself clicking 'logout' in the app. Now app logs us out every day. The bug is filed by Alin." — ExtraBold 32px at x:1562, y:3737

### OTP Verification (y:4456)

| State | x | Notes |
|---|---|---|
| Without keyboard (entered) | x:109 | Label: "without keyboard (entered)" |
| Without keyboard (not entered) | x:548 | Label: "without keyboard (not entered)" |
| With keyboard (scrolled) | x:1969 | Right-aligned layout |
| With keyboard (upfront) | x:2386 | Label: "Screen size with keyboard - upfront/default" |

- Note: "Only if user closed the keyboard" (at y:10050)
- Scroll indicator: vertical line + "Scroll here on every page…" rotated text

### "Verif" Email OTP Component (y:5335–6558)

- "Same component of verification just different text and fixed UI/text" — annotation
- Screen with "Empty" Security Verification + overlay at x:2387, y:5335
- Screen with "Filled" Security Verification + Send header + tab bar + buttons at x:2387, y:6253
- `Security Verification` component: `Property 1=Filled` (`1:3459`) / `Property 1=Empty` (`1:3401`)

### "Phone Verif" Component (y:8314)

- "Same component of verification just different text and fixed UI/text"
- `Frame` with "Empty" step at x:2386, y:8314
- `Frame` with "Filled" step + overlay at x:2386, y:9190
- Group "Phone Verif" label at x:1413, y:8383

### PIN & Country (y:9500)

- Empty state at x:2386, y:9500 — PIN entry screen, `Property 1=Empty` (Security Verification)
- Without keyboard at x:1999, y:9500
- Filled + keyboard at x:2386, y:10087 (with dimmed overlay + `Property 1=Filled`)
- Without keyboard (filled) at x:1999, y:10087 — shows bottom action bar

### Wrong Country Error

- "Wrong country" label at x:2002, y:12735
- `Account type` bottom drawer (`#3:49901`) at x:2386, y:13662:
  - White fill, `borderRadius: 20px 20px 0px 0px`, blur, border `Light gray`
  - Inner frame: `padding: 20px 20px 12px`, border-bottom `#F4F6F9`, gap 20px
  - Options list: padding `0px 0px 10px`, gap 40px

### KYC Outcome Screens (y:11822+)

| State | Position | Notes |
|---|---|---|
| KYC real screen screenshot | x:2386, y:11822 | Image fill (real Sumsub-like screen) |
| Same, text input variant | x:1999, y:11822 | Text entry variant |
| "Finish" label | x:1998, y:13953 | 130px Gilroy Bold |
| "Next" label | x:1998, y:14321 | 130px Gilroy Bold |
| "Login if KYC" final frame | x:1998, y:14573 | 375×812 with outcome branches |

**"Login if KYC" frame outcome text:**
```
Login if KYC
  - not started
  - user didn't continue or needs input
  - rejected
  - approved (normal state of the app)
```

### Key Components Used

| Component | ID | Notes |
|---|---|---|
| `Property 1=Onb with steps` | `1:185` | Header with step indicator |
| `Property 1=Filled` | `1:3459` | Security Verification filled state |
| `Property 1=Empty` | `1:3401` | Security Verification empty state |
| `Property 1=Send from` | `1:116` | Standard mobile header |
| `Office use / Comment (state=blue)` | `6:37614` | Blue annotation comment at x:1330 |

---

## 13. App State: KYC Passed → First Topup (`#3:51421`)

Shows all screens after KYC is approved but before the user has made a first deposit.

### Notification Screens (y:1218)

| Frame | Node | x | Content |
|---|---|---|---|
| SMS received — KYC OK | `#3:51423` | x:55 | `Notification` component (`3:43684`, Dark Mode=False, Type=Default): `rgba(245,245,245,0.5)`, `blur(40px)`, borderRadius 16px, iMessage logo (38×38) |
| Email received — KYC OK | `#3:51430` | x:472 | Screenshot-fill + frosted rectangles over sensitive content |

### Main App Screens (y:1218, continued)

| Frame | Node | x | Size | Content |
|---|---|---|---|---|
| Main dashboard (post-KYC, empty) | `#3:51435` | x:889 | 375×812 | Light gray bg (`#F4F6F9`), amber gradient header (23deg), `borderRadius: 0px 0px 30px 30px` |
| Wallets tab (with wallet cards) | `#3:51466` | x:1306 | 375×812 | 2 wallet cards in amber (`#FFEFC5`), 164×hug each, borderRadius 12px; "Share them with anyone to receive funds" (19px, centered) |
| Receive screen | `#3:51513` | x:1723 | 375×row | Receive header, overflow y, padding-bottom 200px |
| Send tab (empty) | `#3:51542` | x:2140 | 375×812 | Copy: "Your wallets have a zero balance. To fund your wallet, receive money from someone or transfer from your other bank accounts or crypto wallets." (18/20 SemiBold) |
| Swap tab (empty) | `#3:51575` | x:2557 | 375×812 | Same empty-state with amber decorative circles |
| Profile with Verification center | `#3:51602` | x:3424 | 375×1387 | Profile component + `Verification center (State=Security)`, tab bar at y:1297 |
| Profile sub-page | `#3:51623` | x:3841 | 375×812 | Personal Info component |
| Security | `#3:51629` | x:4258 | 375×812 | Security component |
| Banking ID | `#3:51635` | x:4675 | 375×812 | Banking ID component (`3:43885`, height 700) |
| Referrals | `#3:51641` | x:5092 | 375×812 | Referrals component (`3:50868`, Property 1=default) |

### After First Transaction (y:2316)

- `Frame` (375×column, x:889): Main screen with `History upd` component showing recent transactions
- `Frame` (375×812 overflow y, x:2967): Full transactions list, `#F4F6F9` bg

### "Open New Wallet (soon)" Button (`#3:51720`)

```
Size: 2xl, Hierarchy=Primary, Icon=Leading
Text: "Open New Wallet (soon)"  
Fill: #FFB800 (amber)
Opacity: 0.30 (disabled/coming soon)
Border radius: 12px
Position: x:2967, y:2048
```

### Wallet Deep Dive (y:2178)

- `Main Wallet - Asset - Deep Dive` (`#3:51721`, 375×812, x:2967):
  - Inner frame with history
  - "If balance is 0" overlay: "Your wallet has a zero balance…" + Receive CTA (335px, borderRadius 12px)

### Main - top header component (`3:46746`)

Applied amber gradient: `linear-gradient(23deg, rgba(255,213,105,1) 0%, rgba(255,235,182,1) 100%)`  
`borderRadius: 0px 0px 30px 30px`  
Padding bottom: 16px  
Inner: `Headers mobile / Property 1=Main` + balance row + action buttons row

---

## 14. Normal State of the App (`#3:51765`)

Canvas: 14000×4568px. Full-featured app with positive balance, showing all flows available.

### Sub-sections

| Header | Fill | Content |
|---|---|---|
| "Balance > 0, transfers are available" | Amber | Active state with history |
| "Referral & Rewards flow" | Amber | Referral program screens |

### Key Screens

| Frame | x | Notes |
|---|---|---|
| TOPUP SMS received | x:55 | `Notification` component: `rgba(245,245,245,0.5)`, `blur(40px)`, borderRadius 16px |
| TOPUP Email received | x:484 | Email template: "Email: %CUR% %NN% received → go to the app" |
| Main dashboard | x:913 | Amber gradient header + `History upd` + tab bar |
| Scrollable send list | x:1445 | Scroll-y overflow |
| Main Wallet — Asset — Deep Dive | x:1445, y:2303 | With `History upd` component |
| Profile | x:2319, y:~0 | Full profile page |
| Security | x:2736 | 375×1385px scroll |
| Banking ID | x:3153 | 375×812 |
| Support | x:4168 | 375×849, **Zendesk only** |

### Key Decision: Support

> **"Decided to have only Zendesk chat for support"** — 50px Gilroy, at x:4168, y:1352

### Referral States

| State | x position |
|---|---|
| "Waiting for KYC" | Referrals section |
| "KYC passed" | Next column |
| "Shared to noone yet" | Empty referral state |

### Notable Annotations

- "Open New Wallet (soon)" — amber button, opacity 0.3 (same pattern as KYC-passed state)
- "popup tbd: are you sure to remove all your data from everywhere?" — data deletion UX TBD
- "Check 'Transfers 2.0' prototype and design" — reference to Transfers section below

---

## 15. 🟢 Ideation: Send & Address Book — Upgraded (`#6:219513`)

**Widget priority section.** Complete redesigned send flow — WHO → WHAT → HOW MUCH → Review → Track.

### Stage Labels

| Label | x position | Step in flow |
|---|---|---|
| "Scenarios" | x:0 | Overview / intro |
| "Start" | x:2097 | Entry point |
| "WHO" | x:2536 | Recipient selection |
| "WHAT" | x:3133 | Currency/asset selection |
| "HOW MUCH" | x:3549 | Amount entry |
| "Review + Security check" | x:6507 | Confirmation + security |
| "Error states - tbd" | x:6923 | Error states (not yet designed) |
| "Notif: OK [animation]" | x:7787 | Success notification animation |
| "Track transaction" | x:8575 | Transaction tracking |

### Screen Inventory

| Screen | x | Size | Key content |
|---|---|---|---|
| `iPhone 13 mini - 7` (main) | x:2099 | 375×812 | `linear-gradient(225deg, rgba(255,235,57,1) 2%, rgba(255,158,45,1) 100%)` header + `TabBar - mvp` + History |
| `iPhone 13 mini - 158` (WHO) | x:2536 | 375×812 | `AlphabeticKeyboard` (`3:32929`), 375×336, `#D1D3D9`, blur 54.37px at y:476 |
| `iPhone 13 mini - 170` (WHAT) | x:3133 | 375×812 | Asset/currency selection |
| `iPhone 13 mini - 171` (HOW MUCH) | x:3549 | 375×812 | `NumericKeyboard` — amount entry |
| `iPhone 13 mini - 173` | x:3948 | 375×812 | — |
| `iPhone 13 mini - 195` | x:4354 | 375×812 | `Flow / Transfer / Continue` (`6:220107`) CTA button |
| `iPhone 13 mini - 197` | x:4760 | 375×scroll | Bottom padding 400px |
| `iPhone 13 mini - 71` (review) | x:6507 | 375×scroll | Review screen, `padding: 32px 20px 120px` |
| `Frame 1171277789` | x:6923 | — | With NumericKeyboard |
| `Frame 1171277906` | x:7339 | — | With NumericKeyboard |
| `iPhone 13 mini - 72` | x:7787 | 375×812 | Success notification animation |
| `iPhone 13 mini - 73` | x:8181 | 375×812 | Track transaction screen |
| `Frame 1171277791` | x:8575 | — | Transaction details card |
| `wip` frame | top | — | Work in progress marker |

### Bottom Drawers

| Drawer | x | Size | Notes |
|---|---|---|---|
| `Accounts to send from + Search` | x:5177 | 375×742 | Account selector, white fill, `borderRadius: 20px 20px 0px 0px`, blur + shadow |
| `Send to` variant 1 | x:5594 | 375×742 | Recipient selector |
| `Send to` variant 2 | x:6007 | 375×742 | Alternate recipient selector |
| `Terms - no` | x:6507, y:2607 | — | Terms decline scenario |

### Key Components

| Component | ID | Description |
|---|---|---|
| `Field` | `6:218610` | Address input field — fill `#F9F4E1` (warm cream = ideation-mode indicator) |
| `Input` | `6:218631` | Sub-component of Field |
| `Header / Transfers` | `3:32778` | Special header for transfer flow |
| `AlphabeticKeyboard` | `3:32929` | Full keyboard for address entry |
| `Flow / Transfer / Continue` | `6:220107` | Continue button — amber CTA |
| `TabBar - mvp` | `6:220475` | MVP tab bar |
| `History` | `6:220555` | Transaction history list |

### Annotation

- "to theirs Risely EUR wallet" — context: this flow is Risely-to-Risely send (R2R)
- "Error states - tbd" — not yet designed at time of freeze
- "Change text according to risely user or not" — contextual copy decision at WHO step

### Field Fill Color Note

`#F9F4E1` (warm cream/yellow) on the `Field` component signals this is an **ideation/new version** design, different from the built version (which uses standard `#F4F6F9` light gray).

---

## 16. Unretrieved Sections

Two sections were too large to fetch in detail (both would require depth=1 with large file):

| Section | Node | Size | Contents |
|---|---|---|---|
| Transfers (deep prototype) | `#3:44825` | 14000×21180px | Full Transfers 2.0 prototype — referenced in Normal state annotation |
| Send v2 (deep prototype) | `#3:46984` | 20000×19451px | Upgraded send flow — likely the production-ready version of the Ideation Send |

These are referenced in `Normal state of the app` with: "Check 'Transfers 2.0' prototype and design."

---

## 17. Component Cross-Reference

| Component | Used In | Notes |
|---|---|---|
| `Main - top header` (`3:46746`) | KYC-in-progress, KYC-passed, Normal state | Amber gradient, `borderRadius: 0px 0px 30px 30px` |
| `History upd` (`3:32624`) | All main screens | Transaction history list |
| `TabBar - mvp` (`1:1212`) | All app states | `rgba(255,255,255,0.75)` + blur(25px) |
| `Nav` (Home/Wallets/Profile) | Key screens, Wallets | `rgba(255,255,255,0.75)` + blur(25px), shadow |
| `Profile` (`3:38272`) | KYC-in-progress, KYC-passed | Profile page component |
| `Verification center` (`3:38354`) | Profile states | KYC status indicator |
| `Banking ID` (`3:43885`) | KYC-passed, Normal state | 700px height |
| `Referrals` (`3:50868`) | KYC-passed | Default state |
| `Version: Oct 10/Sharing` (`7:10012`) | Receive, Wallets, Profile | iOS share sheet 375×656 |
| `Version: Oct 10/Convert form` (`7:11367`) | Swap, Send, Receive | Bottom drawer (Wallets/Network/Swap variants) |
| `Alert & Notification & Toast` (`7:8291`) | Send, Swap | Error/Success toasts |
| `Error Screens` (`6:68922`) | Wallets | "Feature is blocked" state |
| `Notification` (`3:43684`) | KYC-passed, Normal | SMS notification component |
| `Security Verification` (`1:3400`) | Register-before-KYC | Filled/Empty states |
| `Property 1=Onb with steps` (`1:185`) | Register, KYC-passed | Header with step counter |

---

## 18. Widget Implementation Notes

| Pattern | Detail |
|---|---|
| Send flow structure | WHO → WHAT → HOW MUCH → Review → Track (from Ideation section) |
| Address entry keyboard | AlphabeticKeyboard, 375×336px, `#D1D3D9` fill, blur 54.37px, at y:476 |
| Amount entry keyboard | NumericKeyboard with Suggestions=On |
| Send destination drawers | "Send to" bottom drawers (375×742, white, borderRadius `20px 20px 0px 0px`) |
| Account selector drawer | "Accounts to send from + Search" (375×742, same styling) |
| Continue CTA | `Flow / Transfer / Continue` component (`6:220107`) |
| Field fill (ideation) | `#F9F4E1` — warm cream signals new design intent |
| Empty balance state | Amber decorative circles (`Main grad`, borderRadius 300px) + KYC/topup prompt |
| Locked feature state | "In order to access this feature, please complete the KYC process" + 335px CTA |
| "Open New Wallet (soon)" | Amber button, opacity 0.3 — disabled state pattern |
| Support | Zendesk chat only — no custom support UI needed |
| Registration loop | Login only on explicit logout — app should NOT log out daily (annotated bug) |
| Document upload trigger | Amount > admin-configured limit → show document upload screen |
| Success animation | Use Lottie code from Risely Future Versions Figma file |

---

## 19. Figma Links

| Resource | URL |
|---|---|
| This page | `https://www.figma.com/design/Qwbr3pXZJjh72Fx7kJOmqP/Risely--my-file-?node-id=6-218439` |
| Ideation section | `https://www.figma.com/design/Qwbr3pXZJjh72Fx7kJOmqP/Risely--my-file-?node-id=6-219513` |
| Onboarding "how it should work" | `https://www.figma.com/design/8txVm4IFpK7XL2C1mntZQW?node-id=25-21275` |
| Breakpoints doc (Receive) | `https://www.figma.com/design/eGkFs1c5GmkUfEfh2vz5a0?node-id=1196-47696` |
| Breakpoints doc (Wallets) | `https://www.figma.com/design/eGkFs1c5GmkUfEfh2vz5a0?node-id=1083-36837` |
| Send flow breakpoints | `https://www.figma.com/design/8txVm4IFpK7XL2C1mntZQW?node-id=25-20269` |
| Receive flow breakpoints | `https://www.figma.com/design/8txVm4IFpK7XL2C1mntZQW?node-id=25-20892` |
| Swap flow breakpoints | `https://www.figma.com/design/8txVm4IFpK7XL2C1mntZQW?node-id=25-20745` |
| Number display spec | `https://www.figma.com/design/8txVm4IFpK7XL2C1mntZQW?node-id=25-23654` |
| Admin fees page | `https://www.figma.com/design/TcTcMaaFMcRxCSSz1EDrsx/Risely?node-id=16134-145089` |
| Success icon animation (Lottie) | `https://www.figma.com/design/93zeJZd97zjhkVwveV7eIj/Risely-Mobile---Future-Versions?node-id=8-34456` |
