# Risely [my file] — Send Transfer Flow Design

**Source:** Figma "Risely [my file]" (`Qwbr3pXZJjh72Fx7kJOmqP`), Prototypes page, section `#3:44194`
**Section name:** "Send - updates"
**Status:** "To discuss" (yellow `#FFEC85` header)

---

## 1. Overview

This section is a complete UX logic map for the Send + Receive + Request Payment flows. It covers every combination of:
- **Who is sending**: USER = BENEF (sending to self) vs USER ≠ BENEF (sending to someone else)
- **Where funds go**: within Risely vs outside Risely (FIAT or CRYPTO)
- **Recipient type**: Risely user vs non-Risely user
- **Currency/coin direction**: same currency/coin vs different

All scenarios are mapped as iPhone 13 mini wireframe sequences (375×812px per screen).

---

## 2. Receive + Request Payment

**Header color:** Yellow `#FFEC85` — "Updates after research"  
**Status tags:** "Request payment flow" / "Renamed to discuss"

### iPhone 159 — Receive Screen

A simplified receive screen with "Receive" header component.

**Content (below header nav):**
```
Frame 1171277694:
  - Fiat type selector (componentId 3:31733 = Fiat)
  - Amount input area
  - Wallet + address section

Bottom CTA area:
  [SHARE]          ← amber button (#FFB800), text "SHARE" uppercase
  Request payment  ← text link below, with an icon pill
  TabBar           ← MVP tab bar (1 line indicator)
```

### iPhone 160 — Request Payment Detail (1451px tall, scrollable)

A taller screen for the full request payment flow.

**Top section (Frame 1171277719):**
```
  Frame 1171277694 (Fiat selector — componentId 3:31741)
  Frame 1171277715 (wallet amount area)
```

**Middle section (Frame 1171277703):**
```
  Row header with labels
  Frame 1171277702 (detail fields — border 1px, radius 10px)
```

**Bottom section (Frame 1171277716):**
```
  Same structure: row header + detail fields
```

**Header:** "Receive" component (componentId `3:31523`)

---

## 3. USER = BENEF. & Send WITHIN Risely

**Master header:** `USER = BENEF. & in Risely & send within Risely` (Gilroy Bold 130px)

### 0.1 — Happy Path
> "Selected: beneficial, who is Risely user, one currency to **SAME** — within Risely — Happy path"

This is the baseline scenario: user sends to their own account or to another Risely user in the same currency. Screens are represented by the iPhones in Frame 1171277940 but not expanded at this fetch depth (happy path = standard flow).

**Global option (appears at this scope, amber radio):**
```
● Deduct the network fee from the sent amount
```

---

## 4. USER = BENEF. & Send OUTSIDE Risely

**Master header:** `USER = BENEF. for sure & send outside Risely` (Gilroy Bold 130px)

### 4.1 SENDING OUTSIDE: FIAT

#### Sub-section 1.1
> "Selected: beneficial, who is Risely user, one currency to SAME/ANOTHER: fee will appear anyway"

**Screen sequence (4 iPhones in a row):**

| Screen | Frame | Component | Content |
|---|---|---|---|
| iPhone 186 | `#3:44243` | `Property 1=Send within` header | Beneficiary selection list |
| iPhone 187 | `#3:44256` | `Property 1=Send within` header | Amount input (QWERTY keyboard) |
| iPhone 188 | `#3:44265` | `Property 1=Send within` header | Amount input (numeric keyboard) |
| iPhone 189 | `#3:44276` | `Property 1=Send from` header | Confirmation screen (20% opacity — not final) |

**Bottom sheet (Beneficiary drawer) — 2 variants:**
- `Beneficiary` at x:1943 — Size=Big, Type=Header+Search (componentId `3:31244`), with search + scrollable list + keyboard
- `Beneficiary` at x:2360 — same component, second variant

**Annotations:**
- `Changed to EXTERNAL` — design decision: beneficiary selection changed to external flow
- `Fee ???` — open question, fee logic TBD
- `Common final screen — need to discuss` — the Done/Confirmation screen is shared with other flows
- `From where it is different from happy path` + gray connector arrow — marks divergence from 0.1

**Currency labels:** EUR → EUR (same currency)  
**Person in Tile:** Risely user (with Risely logo on avatar)

---

#### Sub-section 1.2
> "Selected: beneficial, who is **NOT** Risely user, one currency to SAME/ANOTHER: fee will appear anyway"

**Screen sequence:**

| Screen | Frame | Content |
|---|---|---|
| iPhone 186 | `#3:44341` | Beneficiary list (no Risely logo on avatar) |
| iPhone 187 | `#3:44354` | Amount input (QWERTY) |
| iPhone 188 | `#3:44363` | Amount input (numpad) |
| iPhone 189 | `#3:44374` | Confirmation |

**Annotations:**
- `From where it is different from happy path` + connector — marks where this diverges
- `Fee ???` — still TBD
- Currency labels: EUR → USD (cross-currency case)

**Person in Tile:** No Risely logo (external recipient)

---

### 4.2 SENDING OUTSIDE: CRYPTO — within same network

#### Sub-section 2.1
> "Selected: beneficial, who is Risely user, one coin to **SAME**"

**Screen sequence:**

| Screen | Frame | Content |
|---|---|---|
| iPhone 186 | `#3:44416` | Beneficiary selection |
| iPhone 187 | `#3:44467` | Amount + coin detail |
| iPhone 188 | `#3:44476` | Amount (numpad) |
| iPhone 165 | `#3:44487` | List screen |
| iPhone 189 | `#3:44497` | Confirmation (60% opacity — not final) |

**Annotations:**
- `to Adrian's external ETH` — example recipient wallet label
- `List?` — open question: should there be a list view here?
- `Changed to EXTERNAL - discuss this with Alex` — major design decision flag
- `Fee ???` (at 40% opacity) — fee logic unresolved

**Beneficiary drawers:** 2 variants (Beneficiary + search list + keyboard)  
**Currency:** ETH

---

#### Sub-section 2.2
> "Selected: beneficial, who is Risely user, one coin to **ANOTHER**"

Cross-coin transfer (e.g., ETH → USDT).

| Screen | Frame | Content |
|---|---|---|
| iPhone 186 | `#3:44515` | Beneficiary list |
| iPhone 187 | `#3:44546` | Amount (QWERTY) |
| iPhone 188 | `#3:44555` | Amount (numpad) |
| iPhone 165 | `#3:44566` | List |
| iPhone 189 | `#3:44530` | Confirmation (20% opacity) |

**Annotations:**
- `to Adrian's external USDT` — cross-coin destination
- `Changed to EXTERNAL - discuss this with Alex`
- `Fee ???` (20% opacity)

---

#### Sub-section 2.3
> "Selected: beneficial, who is **NOT** Risely user, one coin to **SAME**"

**Key design note:**
> "If this benef. has this wallet type - it is auto selected / if not - show selector first and check flow for 'Add New Crypto Wallet'"

| Screen | Frame | Content |
|---|---|---|
| iPhone 186 | `#3:44613` | Beneficiary list |
| iPhone 187 | `#3:44639` | Amount |
| iPhone 188 | `#3:44648` | Amount (numpad) |
| iPhone 165 | `#3:44659` | List |

**Additional UI element:** `Wallets - Theirs` component (`#3:44627`) — displays the recipient's external wallet (ETH, no Risely logo), with Check=false, Risely account=false

**Label:** `to Bob's external ETH`

---

#### Sub-section 2.4
> "Selected: beneficial, who is **NOT** Risely user, one coin to **ANOTHER**"

Cross-coin, external recipient.

| Screen | Frame | Content |
|---|---|---|
| iPhone 186 | `#3:44671` | Beneficiary list |
| iPhone 187 | `#3:44687` | Amount |
| iPhone 188 | `#3:44696` | Amount (numpad) |
| iPhone 165 | `#3:44707` | List |
| iPhone 189 | `#3:44717` | Confirmation (20% opacity) |

**Design note:** Same rule — wallet auto-selected if exists, else show selector + "Add New Crypto Wallet" flow

**Label:** `to Bob's external USDT`

---

### 4.3 Add Wallet Sub-flows

Two additional design stubs at the bottom of the Crypto section:

| Sub-flow | Node | Notes |
|---|---|---|
| **For existing benef. — Add New Crypto Wallet** | `#I3:44741` | Gilroy Regular 80px header |
| **For existing benef. — Add New Fiat Wallet** | `#I3:44742` | Gilroy Regular 80px header |

These are stubs (not yet designed), linked from 2.3 and 2.4 for the case where a saved beneficiary doesn't yet have the required wallet type.

---

## 5. USER ≠ BENEF. — Sending to Someone Else

**Master header:** `USER ≠ BENEF. for sure` (Gilroy Bold 120px)

This covers the scenario where the user initiates a send to a third party (not their own accounts).

### Two entry points:

| | Label |
|---|---|
| Entry 1 | "1. Chosen 'Someone else →' + send + **upsell if not Risely user**" |
| Entry 2 | "1. Click 'New' beneficial + send + **upsell if not Risely user**" |

**Key open question:**
> "USER could be found? [pasting/searching scenarios]"

This refers to how the recipient is located: by pasting an address, by searching by name/email, or by QR scan.

### Screen groups (4 × 3 = 12 screen sequences):

The section (`#3:44201`) contains 4 frames (Frame 1171277936, Frame 1171277935, Frame 1171277933, Frame 1171277934), each with 3 `Figma header` stubs — meaning 12 distinct sub-scenarios covering the matrix of:
- Entry type (new beneficial vs paste)
- Recipient type (Risely user / external / unknown)
- Currency / network

*(Screens not yet designed at the time of this Figma snapshot — represented as header stubs only)*

---

## 6. Global Options

Two instances of an amber radio toggle appearing in the Send section:

```
● Deduct the network fee from the sent amount
```

Both appear at different positions (y:2889 and y:3755), suggesting this option is shown at two distinct stages of the send flow — likely at the "amount entry" step and the "confirmation" step.

**Component:** `Text lines / Take Network fee from sent amount` (`#3:31729`)  
**Visual:** Amber ellipse `#FFB800` with gray border + 12px Gilroy Medium text

---

## 7. Open Design Questions (from annotations)

| Question | Where | Context |
|---|---|---|
| `Fee ???` | Multiple screens | Fee calculation logic and display — all crypto/external flows |
| `Common final screen — need to discuss` | 1.1 FIAT | Shared Done/Confirmation screen UX |
| `Changed to EXTERNAL - discuss this with Alex` | 2.1, 2.2 | Beneficiary selection model changed |
| `List?` | 2.1 | Whether to show a list view at crypto beneficiary step |
| `From where it is different from happy path` | 1.1, 1.2 | Exact divergence point from the 0.1 happy path |
| `Request payment — Renamed to discuss` | Receive section | Screen naming / product scope |
| `If this benef. has this wallet type — it is auto selected, if not…` | 2.3, 2.4 | Auto-selection vs manual wallet selection logic |

---

## 8. Screen Components Used

| Component name | ID | Used for |
|---|---|---|
| `Headers mobile / Property 1=Receive` | `3:31523` | Receive + Request payment header |
| `Headers mobile / Property 1=Send within` | `3:31546` | Send within Risely screens |
| `Headers mobile / Property 1=Send from` | `3:31535` | Send from (confirmation) header |
| `Selects / Size=Big, Type=Header+Search` | `3:31244` | Beneficiary drawer header + search |
| `iOS / Keyboards / AlphabeticKeyboard, Suggestions=On` | `1:3164` | QWERTY keyboard |
| `iOS / Keyboards / NumericKeyboard, Suggestions=Off` | `1:3268` | Numeric keyboard |
| `iOS / Keyboards / AlphabeticKeyboard, Suggestions=Off` | `1:3226` | QWERTY no-suggest |
| `Person in Tile` | `2:3798` | Beneficiary row in list |
| `Wallets - Theirs / Currency=ETH Etherium` | `3:31661` | External wallet display |
| `Frame 1171277694 (Fiat)` | `3:31741` | Fiat selector |
| `Frame 1171277694 (Crypto)` | `3:31733` | Crypto selector |
| `Bottom buttons` | `1:3153` | CTA area (Submit / Cancel) |
| `button` | `3:32412` | Amber Send button |
| `TabBar - mvp` | `1:1211` | Bottom navigation |
| `Text lines / Take Network fee from sent amount` | `3:31729` | Fee deduction toggle |

---

## 9. Figma Links

| Node | URL |
|---|---|
| Send - updates section | [#3:44194](https://www.figma.com/design/Qwbr3pXZJjh72Fx7kJOmqP/Risely--my-file-?node-id=3-44194) |
| iPhone 159 (Receive/Share) | [#3:44747](https://www.figma.com/design/Qwbr3pXZJjh72Fx7kJOmqP/Risely--my-file-?node-id=3-44747) |
| iPhone 160 (Request Payment) | [#3:44770](https://www.figma.com/design/Qwbr3pXZJjh72Fx7kJOmqP/Risely--my-file-?node-id=3-44770) |
| Scenario 1.1 screens | [#3:44242](https://www.figma.com/design/Qwbr3pXZJjh72Fx7kJOmqP/Risely--my-file-?node-id=3-44242) |
| Scenario 1.2 screens | [#3:44340](https://www.figma.com/design/Qwbr3pXZJjh72Fx7kJOmqP/Risely--my-file-?node-id=3-44340) |
| Scenario 2.1 (Crypto same) | [#3:44415](https://www.figma.com/design/Qwbr3pXZJjh72Fx7kJOmqP/Risely--my-file-?node-id=3-44415) |
| Scenario 2.3 (NOT Risely, same coin) | [#3:44612](https://www.figma.com/design/Qwbr3pXZJjh72Fx7kJOmqP/Risely--my-file-?node-id=3-44612) |
| USER ≠ BENEF. section | [#3:44201](https://www.figma.com/design/Qwbr3pXZJjh72Fx7kJOmqP/Risely--my-file-?node-id=3-44201) |
