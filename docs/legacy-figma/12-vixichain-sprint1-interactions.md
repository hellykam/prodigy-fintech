# Vixichain Wallet — Sprint 1: Interaction Specs & New Screens

**Source:** Figma "Vixichain Wallet" (vbGInZbVbXfOIS0D6SlNvY), Design (sprint 1), node 27:2
**Covers:** Dashboard, Transactions, Widgets, Organizations, Auth flows, Interaction rules
**Note:** Core screen layouts are in `05-vixi-wallet-screens.md` and `04-vixi-wallet-onboarding.md`. This file documents interaction rules, micro-specs, and organization management flows added in Sprint 1.

---

## 1. Dashboard — Interaction Rules

### Time-Based Greeting
Header text changes dynamically based on time of day:

| Time Range | Greeting |
|---|---|
| 4:00am – 12:00pm | `Good morning, [firstname]` |
| 12:00pm – 6:00pm | `Good afternoon, [firstname]` |
| 6:00pm – 12:00am | `Good evening, [firstname]` |
| 12:00am – 4:00am | `Good night, [firstname]` |

**Long name handling:** Name max 2 lines. If longer, truncate with `...` at the end.

### Dashboard Empty State (New Wallet)
When wallet has no assets:
- Dashboard shows empty state
- **Receive tab in the transaction widget opens by default**
- User's first action should be to receive/deposit funds

### Notification Bell
- Click on notification → opens transaction details screen

### Balance + Widget Section
- Max width of balance + transaction widget section = **1260px**

### Sidebar Background Gradient
- Start color: `#F2F2F2`
- End color: `#FAFAFA`

---

## 2. Transaction Widget — Interaction Rules

### Fullscreen Mode
- "Fullscreen" icon appears **only on mouse-enter** into widget area
- "Fullscreen" icon has hover and pressed states
- **Tooltip** "Open in fullscreen" appears on hover after **2 seconds**
- Receive widget does **not** have fullscreen mode (no fullscreen icon)

### Widget Variants
| Widget | Has Fullscreen | Notes |
|---|---|---|
| Send | Yes | Opens send form expanded |
| Receive | No | Shows QR code + address |
| Bridge | Yes | User can switch direction |

### Transaction Widget Dropdown Menu
3-dot context menu on transaction widget (hover state) — contains actions for the selected transaction.

---

## 3. Bridge Widget Rules

- User can **switch the direction** of bridge by pressing the swap button between left (from) and right (to) fields
- **Vixichain network field does not have a dropdown** — it is fixed (Vixichain is always one side)
- External blockchain network field does have a dropdown

---

## 4. Transactions List — Interaction Rules

- Click on transaction row → opens transaction details screen
- "i" icon (info) appears next to timestamp **only on hover**
- Transactions table has search functionality with a "no results" empty state

---

## 5. Responsive Layout Rules

### Dashboard Breakpoints

| Name | Dimensions |
|---|---|
| Mobile SM | 375×812 |
| Tablet Vertical MD | 768×992 |
| Tablet Horizontal LG | 992×768 |
| Desktop XL | 1280×832 |
| Desktop 2XL | 1536×980 |
| Desktop 2XL wide | 1920×1080 |

### Side Menu
- Min width: **200px**, Max width: **240px**
- **Compact side menu view appears only on vertical tablets** (768px breakpoint)
- On smaller screens: Coin column is removed from transaction table; Amount column shows token icon next to the amount instead

---

## 6. Receive Flow — Full Steps

1. **Dashboard** → user clicks Receive button
2. **Receive widget** opens — shows:
   - QR code
   - Wallet address (alphanumeric string)
   - Copy address button
   - Save QR button
   - Network selector (for bridged chains)
3. User presses **"Copy address"** → address copied to clipboard → returns to Dashboard
4. User presses **"Save QR"** → QR saved to device → returns to Dashboard
5. After deposit arrives: user **receives email** (deposit confirmation) + in-app **notification**
6. Click on notification → opens transaction details

---

## 7. Send Flow — States

Send widget and full-page form states:
1. Dashboard — hover into widget area → fullscreen icon appears
2. User clicks fullscreen → Send expanded/full page
3. User enters **amount** (with coin/fiat equivalent)
4. User opens **coin dropdown** → selects coin
5. User selects coin → amount validated against balance
6. **Confirmation screen** — shows: to address, amount, fee, network
7. **Success/Error** state
8. On success: email notification sent + in-app notification

Additional Send states:
- Empty form (default)
- Amount entered
- Coin dropdown open
- Coin selected
- Address entered
- Confirmation modal
- Error (insufficient balance, invalid address)
- Success (transaction submitted)

---

## 8. Organizations — Management Flows

### Create Organization
Multi-step form:
1. **Step 1:** Organization name
2. **Step 2:** Organization details
3. **Step 3:** Confirmation

After creation → user lands on **Organization Dashboard**.

### Organization List
- Shows all organizations the user belongs to
- Two states: list with orgs / empty list

### Organization Dashboard
- Separate dashboard view for the org account (similar to personal dashboard)

### Invite Member Flow

1. Admin opens **Organization Members** page
2. Admin clicks **Invite member**
3. Admin enters **email address** of invitee
4. Validation:
   - If email field empty → error state
   - If email belongs to existing user → different confirmation flow
5. **Invite sent** → invited user receives email with invite link
6. Invited user clicks link → lands on **Create account** (invite codes flow)
7. After user accepts invite → they appear in members list
8. Admin can see invite status

### Remove Member
- Admin selects member → **Remove member** confirmation dialog
- Member removed from organization

### Assign Role
- Admin selects member → **Assign role** modal
- Role options: (defined by admin permissions system, see `03-admin-app.md`)

### Switch Accounts
- User can switch between personal account and organization accounts
- Accessible from the account menu/header dropdown
- Shows list of accounts: personal + all org memberships

---

## 9. Auth — Invite Codes Registration Flow

When user registers via invite code:
1. Invite code entry screen (before standard create account)
2. **Create account flow** (multiple steps):
   - Email input
   - Password creation
   - Verify email
   - Personal details
   - (Various steps per KYC level)
3. After verification → lands on Dashboard

Full Create account step count: ~10–15 screen states documented in Sprint 1.

### Verify Email Flow
1. User completes registration form
2. Verification email sent
3. **Verify email screen** — waiting for confirmation
4. User clicks link in email → success state
5. Continue to Dashboard

---

## 10. Transaction Details Screen

Accessible from:
- Click on any transaction in the transaction list
- Click on notification in the notification bell dropdown

Two screen variants documented:
1. Standard transaction details (1440px)
2. Transaction details with sidebar layout
