# Vixichain Wallet — Sprint 4: Bridge, Mobile, Accounts, Notifications

**Source:** Figma "Vixichain Wallet" (vbGInZbVbXfOIS0D6SlNvY), Design (sprint 4), node 4959:28006
**Covers:** Mobile wallet app (375×812), Bridge (deposit/withdraw), Accounts management, Desktop error states, Notifications, Sign up flows

---

## 1. Mobile Wallet App

Section label: **"User wallet (mobile app)"** (orange `#FF842D`)

All mobile screens are 375×812px. Mobile background colors:
- `#FFFFFF` (white) — most screens
- `#F0F9FF` (light blue-tinted) — receive flow, some auth screens

### Mobile Bottom Tapbar
- Component name: `tapbar`
- Dimensions: 375×69px, anchored at y:743 (bottom of screen above home indicator)
- Bottom navigation for main mobile sections

### Mobile Dashboard
Multiple states documented:
- **Default** — standard dashboard with balance
- **Skeleton / loading** — skeleton placeholders while loading
- **Empty** — empty state (new wallet, no assets)
- With **notification dropdown** open
- With **account dropdown** open (user menu)
- With **modal dialogs** (centered overlays)

### Mobile Accounts Screen
Multiple iterations showing:
- Accounts list (all user accounts)
- Active account indicator
- Context **menu** (dropdown popup) for account actions
- With **keyboard open** (bottom sheet with keyboard visible)
- Rename flow with keyboard input

### Mobile Transactions List
Multiple states:
- Default list view
- Empty state (no transactions)
- **Search** state (keyboard visible)
- **Filter** state

### Mobile Transaction Details
`tx details` frame — 375×882px (taller than standard 812 for scrollable content)

### Mobile Receive
- QR code screen
- Copy/share address action sheet
- Network selector visible
- Camera integration: shows `IMG_8386` (real photo used in mockup)
- "Vixichain Wallet Address" label next to QR

### Mobile Send
Multiple states:
- Default empty form
- Amount entered
- **Coin dropdown** open (menu popup)
- **Address dropdown** open (address book)
- With keyboard open
- Confirmation screen

### Mobile Auth Screens

**Log in:**
- Email + password form
- With keyboard

**Sign up (personal):**
- Multiple steps (many frame iterations)
- Country selector dropdown (scrollable, 327×210px)
- With keyboard
- Back button on step screens
- Separate screens per step

**Sign up (org):**
- Similar multi-step flow to personal
- Organisation-specific fields

**Forgot password:**
- Email entry screen

---

## 2. Accounts Management (Desktop)

Section label: **"Accounts management"** (orange `#FF842D`)
All desktop flows are 1440×900px.

### Switch Accounts
- Dropdown from header (account selector)
- Lists all accounts: personal + organizations
- Click to switch active account

### Rename Account
- Modal or inline edit
- Text input for new account name
- Save / Cancel

### Create Account (additional)
- Available from accounts management
- Creates a new personal wallet account

### Remove Account
- Confirmation dialog required
- Account removed from user's account list

### Show Private Key
**Status: Muted / Deferred**
> "Show private key. Muted because check 'Settings' in sprint 5"

The private key export/view flow was designed in Sprint 4 but is muted (opacity: 0.4) — it was moved to Sprint 5 Settings. See `16-vixichain-sprint5-mpin-settings.md`.

Mobile private key screens (`private key` frames) are still visible but also deferred:
- Enter password to reveal private key
- Private key display with copy
- Confirmation step

---

## 3. Desktop Send — Error States

**Error toast component:**
- Absolute positioned overlay (top-right of screen)
- Background: `#FFFFFF`, border: `#ECEDF0`, shadow
- Appears on send errors

Multiple Send screen states with error toasts documented:
- Network error
- Insufficient balance
- Invalid address

---

## 4. Errors Collection

Section label: **"Errors"**
Dedicated section collecting all error states/toasts for consistency.

---

## 5. Bridge — Deposit & Withdraw

Section label: **"Bridge (deposit)"** and **"Bridge (withdraw)"** (orange `#FF842D`, inside a grouped section)

Russian labels in Figma (design annotations):
- `депозит - мне в викси (ресив)` = "deposit — to me in vixi (receive)" — Bridge deposit = receiving bridged assets into Vixichain
- `витдруо - из викси (сенд)` = "withdraw — from vixi (send)" — Bridge withdraw = sending assets out of Vixichain

Both are 1440×900 desktop screens. Many screen iterations (12+ per direction).

**Bridge flow states documented (deposit and withdraw each):**
- Select network (external blockchain)
- Enter amount
- Confirmation
- Processing / pending
- Success
- Failed
- Various network-specific screens

**Email templates** included in the bridge group:
- Deposit confirmation email
- Withdraw confirmation email
- Multiple variations

**Note:** Bridge feature may not be fully implemented (see Sprint 1 notes about Bridge being "todo"). The design exists but implementation status unknown.

---

## 6. Notifications (Desktop)

Section label: **"Notifications"** (yellow banner)

Desktop notifications center:
- Accessible from Dashboard header bell icon
- Full-page notifications list view
- Individual notification items

---

## 7. Info Screens (Profile/Onboarding)

Three variants of the info/profile page:

### Info Personal
Multiple states of personal user profile:
- View mode
- Edit mode
- Various field states

### Info Business
Business account profile / details page

### Info Validator
Validator-specific profile/info page (for BaV validator accounts)

---

## 8. Compliance Note

Sticky note in Figma (amber background):
> "If bank changes rules or list of countries - admin don't receive notification but can see the changes in the details"

**Implication:** When a BaV organization updates their rules or country list, the Vixichain admin is **not** notified automatically. The admin can see the changes by viewing the rule/country details directly.

---

## 9. Early Access Screen

Section label: **"Early Access"** (orange, muted)

A separate screen for early access users — likely part of presale/invite flow. Not detailed here as it is adjacent to the pre-sale section (skipped per project scope).

---

## 10. Design Notes

- Sidebar gradient note confirmed: `Start color #F2F2F2 / End color #FAFAFA` (same as documented in Sprint 1)
- Mobile tapbar: fixed at bottom (y:743), height 69px
- Status bar: uses `Status Bar - iPhone` component, 375×50px
- Entity diagram cards added for two new entities (blue `#0166D5` and purple `#9747FF` headers) — related to bridge entity model
