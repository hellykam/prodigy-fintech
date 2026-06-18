# Vixichain Wallet — Architecture & Navigation Overview

**Source:** Figma "Vixichain Wallet" (vbGInZbVbXfOIS0D6SlNvY), Overview page, node 4871:63582
**Note:** This page is a diagram/flow page showing navigation architecture and product decisions. Screen-level detail is in files 04–10.

---

## 1. Wallet Portal — Navigation Sections

All sections of the Vixichain Wallet app (mobile + desktop):

| Section | Notes |
|---|---|
| Dashboard | Quick access: Receive, Send, Deposit, Withdraw |
| Transactions | Transaction list + detail |
| Address Book | Saved recipient addresses |
| Verif. Center [DID] | Identity verification center |
| Support | In-app support access |
| Security & Settings | MPIN, seed phrase, security options |
| Notifications | Push/in-app notification history |
| Accounts Management | Multi-account management |
| Members | Organization member management |
| Organizations (my) | User's own orgs |
| Bank as Validator (BaV) | Validator dashboard — separate portal |
| Rules | Compliance rules engine |

---

## 2. Dashboard — Quick Action Buttons (User Story)

**User Story:** As a wallet user, I wish to have quick access to Receive, Send, Deposit, and Withdraw buttons so that I can easily manage cryptocurrency transactions on Vixichain and other bridged blockchains.

### Receive Button
- Displays QR code and alphanumeric Vixichain wallet address
- Copy-to-clipboard functionality
- Network-specific addresses for bridged blockchains (dropdown to select network)

### Send Button
- Form fields: recipient Vixichain address, amount (crypto + fiat equivalent), optional memo
- Dropdown to select network (multi-network)
- Real-time fee calculation

### Deposit Button
- Network selection dropdown for bridged blockchains (ETH, BSC, etc.)
- Instructions + network fees + estimated transaction times
- Unique wallet address or QR code per selected network
- Status updates: pending, confirmed — with blockchain explorer links
- Validates deposits per blockchain to prevent incompatible transactions

### Withdraw Button
- Input fields: withdrawal address, amount (crypto + fiat), optional memo
- Network selection dropdown
- Estimated fees + processing times
- Withdrawal confirmation with secure authentication (PIN, password, or biometrics)
- Address validation — must match selected blockchain network

### Security Requirements
- Secure authentication required for: sending crypto, withdrawing to bridged blockchains
- Validate all inputs: incorrect blockchain addresses, exceeding available balance

### Stretch Features (not yet implemented)
- Analytics & portfolio insights: total deposits/withdrawals/sends/receives over time, fiat equivalents
- Favorites & recents: save frequently used addresses
- Custom fee selection: slow / standard / fast speeds
- Cross-chain swaps: convert between Vixichain and bridged blockchains directly in wallet

---

## 3. Bridge Feature — Status: TODO

Bridge (deposit) and Bridge (withdraw) frames exist in the diagram but are marked with a yellow **"todo"** note in Figma. The Bridge feature was planned but not implemented at time of design freeze.

---

## 4. Compliance — Blocking Types

Four types of compliance blocks are defined in the system:

| Block Type | Description |
|---|---|
| **→ Blocking wallet** | Full wallet block — no transactions in or out |
| **→ Turn off trx type/feature** | Disable specific transaction types (e.g., disable bridge, disable withdraw) |
| **→ Blocking client** | Block the client account |
| **→ Freeze amount** | Freeze a specific amount in the wallet |

**Trigger:** Initiated by compliance findings from Sanctions list / AML / Travel rules, or by compliance officer decision. See `08-vixi-admin-compliance.md` for blocking flows.

---

## 5. Compliance — KYC2 / Manual Document Upload

Manual document upload flow for KYC level 2:

- **Primary path:** Sumsub handles this automatically
- **MVP fallback:** Manual upload through Support — "through support = yes + manual upload to admin as MVP"
- **Latest priority:** Manual request via admin — "Manual request - latest stage/priority"
- Note: `also add manual upload of a doc` — admin must be able to manually upload documents for clients

---

## 6. Compliance — Transaction Creation / BaV Rules Corner Case

**Corner case:** If a transaction is under review/delayed for 3+ days and the BaV (Bank as Validator) changes their rules during that period:
- Use the **version of BaV rules that were active on the date the transaction was created**
- It is **OK not to re-assign a new validator** in this case
- The validation timestamp is bound to the transaction creation date, not the review date

---

## 7. Transaction Types and Statuses

A "Tx types and Statuses" frame exists in the Overview diagram. Transaction types include those tied to:
- Internal Vixichain transfers
- Bridge deposits (incoming from external chains)
- Bridge withdrawals (outgoing to external chains)
- BaV-signed transactions

See `05-vixi-wallet-screens.md` for full transaction type/status table. See `08-vixi-admin-compliance.md` for admin-side transaction states.

---

## 8. Compliance — Score Calculation

Note in Figma: "Continue discussing with compliance from this place how the score is calculated — Osnat has doc"

The risk/compliance score calculation methodology was not finalized in design — requires separate compliance spec document from Osnat.

---

## 9. Design Tokens (from Components page)

**Font:** Onest — Google font, Open Font License (https://fonts.google.com/specimen/Onest)

### Typography Scale

| Token | Platform | Size | Weight | Use |
|---|---|---|---|---|
| D-Header | Desktop | 28px | Regular 400 | Section headers |
| D-Title-Primary | Desktop | 24px | SemiBold 600 | Page titles |
| D-Title-Secondary | Desktop | 20px | Medium 500 | Sub-titles |
| D-Title-Tertiary | Desktop | 14px | SemiBold 600 | Card titles |
| D-Text-Primary | Desktop | 16px | Regular 400 | Body text |
| D-Text-Primary-Med | Desktop | 16px | Medium 500 | Emphasized body |
| D-Text-Secondary | Desktop | 14px | Regular 400 | Secondary text |
| D-Text-Hint | Desktop | 12px | Regular 400 | Hints, captions |
| D-Button-Primary | Desktop | 16px | SemiBold 600 | Primary buttons |
| D-Button-Secondary | Desktop | 14px | SemiBold 600 | Secondary buttons |
| M-Header | Mobile | 20px | Regular 400 | Section headers |
| M-Title-Primary | Mobile | 20px | SemiBold 600 | Page titles |
| M-Title-Secondary | Mobile | 16px | Medium 500 | Sub-titles |
| M-Title-Tertiary | Mobile | 14px | SemiBold 600 | Card titles |
| M-Text-Primary | Mobile | 14px | Regular 400 | Body text |
| M-Text-Primary-Med | Mobile | 14px | Medium 500 | Emphasized body |
| M-Text-Secondary | Mobile | 14px | Regular 400 | Secondary text |
| M-Text-Hint | Mobile | 12px | Regular 400 | Hints, captions |
| M-Button-Primary | Mobile | 14px | SemiBold 600 | Primary buttons |
| M-Button-Secondary | Mobile | 12px | SemiBold 600 | Secondary buttons |

### Breakpoints

| Name | Range |
|---|---|
| sm (Mobile) | < 768px |
| md (Tablet vertical) | 768–992px |
| lg (Tablet horizontal) | 992–1280px |
| xl (Desktop) | 1280–1536px |
| 2xl (Desktop wide) | > 1536px |

### Spacing Scale
`4px / 8px / 10px / 12px / 16px / 24px / 40px`

### Border Radius
`8px / 12px / 16px / 24px`

### Color Palette

| Color | Hex | Use |
|---|---|---|
| Primary purple | `#6146FF` | Brand primary |
| Purple dark 1 | `#5337F4` | Hover states |
| Purple dark 2 | `#462AE8` | Active states |
| Brand secondary | `#EBECFF` | Light backgrounds |
| Primary blue | `#0166D5` | Links, CTAs |
| Blue button gradient | `linear-gradient(90deg, #0166D5, #0098FF)` | Primary button fill |
| Success | `#00992B` | Positive states |
| Danger | `#E23131` | Error states |
| Warning | `#FF9000` | Warning states |
| Gray 1 | `#808080` | Placeholder text |
| Gray 2 | `#B2B2B2` | Disabled / hint |
| Gray 3 | `#E5E5E5` | Borders |
| Background light | `#F0F9FF` | Card backgrounds |
| Background alt | `#F2F3FD` | Page bg sections |

---

## 10. Transaction Tables — Variants & Columns

### Column Set (all transaction tables)
`Time | Coin | Amount | Type | From | To | TxHash | Status`

### Table Variants

| Variant | Filters | Tooltips |
|---|---|---|
| ALL | All possible filters | Fee tooltip |
| Wallet | Filters | Fee tooltip |
| Validator | No filters | Fee tooltip |
| Explorer (private) | No filters | Fee tooltip |
| Explorer (public) | No filters | Fee tooltip + Sender/Receiver/Validator tooltip |
| Admin | All possible filters | Fee tooltip |

### BaV Column Constraint
Validator name column: **max 16 characters**

### Mobile Transaction Detail
"Design for mobile to be done — scroll menu / tabs / or smth. For MVP lets keep as is" — no special mobile layout designed for transaction detail page.

---

## 11. KYC States (from Wireframes)

Four explicit KYC states confirmed:

| State | Description |
|---|---|
| `pending verification` | KYC submitted, awaiting review |
| `action required` | KYC needs additional info from user |
| `approved` | KYC passed |
| `rejected` | KYC failed — user cannot proceed |

---

## 13. Wallet Navigation — Sprint Coverage

| Sprint | Coverage | Doc file |
|---|---|---|
| Sprint 1 | Core wallet — dashboard, send/receive | `12-vixichain-sprint1-interactions.md` |
| Sprint 2 | Address book, transactions, KYC | `13-vixichain-sprint2-addrbook-trx-kyc.md` |
| Sprint 3 | Rules engine (BaV portal) | `14-vixichain-sprint3-rules-bav.md` |
| Sprint 4 | Bridge, mobile accounts, notifications | `15-vixichain-sprint4-bridge-mobile-accounts-notif.md` |
| Sprint 5 | MPIN, settings | `16-vixichain-sprint5-mpin-settings.md` |
| Sprint 6 | Verification center, BaV updates | `17-vixichain-sprint6-verif-center-bav-updates.md` |
| Sprint 7 | Explorer, footer, various updates | `18-vixichain-sprint7-explorer-footer-updates.md` |
| Sprint 8 | Pre-sale, airdrop, invites — **skip** | — |
| Sprint 9 | Rewards, testnet banner, error pages (DDD) | `19-vixichain-sprint9-rewards-testnet-errors.md` |

---

## 14. Transaction Widget — Component Specs

From "Design ALL" master page:

- **Dimensions:** 506×372px
- **Background:** `#F0F9FF`
- **Border:** `#ECEDF0`, 1px
- **Shadow:** `0px 0px 10px 0px rgba(0, 0, 0, 0.05)`
- **Border radius:** 16px
- **Padding:** 32px 24px

Primary action button: 240×52px, border radius 12px, primary blue gradient.

---

## 15. Transaction List — Additional Column Notes

From "Design ALL" Russian annotation:
- Transaction table should have **two time columns** (date + time separately, or relative + absolute)
- Address cells should have a **copy icon** for clipboard copy

---

## 16. Notifications Dropdown

- Width: 528px, Height: 400px
- Position: top-right (x:780, y:88 from screen edge)
- Two variants: Default (unread notifications) / Variant2 (read/empty)
- Background: `#FFFFFF`, border: `#F2F2F2`, shadow: Drop Shadow/20, border radius 8px
