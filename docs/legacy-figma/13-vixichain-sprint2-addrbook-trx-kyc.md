# Vixichain Wallet — Sprint 2: Address Book, Transactions, KYC

**Source:** Figma "Vixichain Wallet" (vbGInZbVbXfOIS0D6SlNvY), Design (sprint 2), node 2297:14542
**Covers:** Address book, Transaction flows + filters, KYC states, Verification Center, Send with KYT, Blacklist countries, Dashboard onboarding

---

## 1. Address Book

### Address Book List
- Full-page section in the wallet app
- Shows saved contacts (name + wallet address)
- Supports search
- Empty state when no contacts saved

### Add Contact
Flow:
1. User clicks "+ Add contact"
2. Form: **Name** + **Wallet address**
3. Validation: address format check
4. Save → contact appears in list

### Edit Contact
- Available from contact detail view
- Can edit name and/or address

### Delete Contact
- Confirmation dialog before deletion
- Contact removed from list

### Send to Contact
Address book is integrated into the Send flow:
1. User opens Send
2. In "Recipient address" field → user can type address OR click "Choose from address book"
3. Address book list opens as overlay/modal
4. User selects contact → address pre-fills in Send form
5. Contact name displayed alongside address for confirmation

### Address Book States
- Default (list with contacts)
- Empty (no contacts saved)
- Search results
- Search — no results

---

## 2. Transaction Flows

### Send Flow — with KYT (Know Your Transaction)

When a transaction triggers compliance review:

1. User fills Send form and clicks "Send"
2. **KYT check fires** (automatic backend check)
3. If flagged: transaction enters **"Review"** state
4. User sees pending/review status on transaction
5. Admin reviews transaction in compliance panel
6. Resolution: approved → transaction proceeds / rejected → transaction blocked

Label in design: `Send (flow with KYT)`

### Send Flow — with Comment

Send form includes optional **Comment/Memo** field:
- Label: `Comment` or `Memo`
- Optional — not required for submission
- Visible in transaction details for both sender and recipient

### Transaction Confirmation Screen
Before submitting a send:
- Shows: amount, recipient address, network, fee, estimated time
- Confirm / Cancel buttons

### Send Completed State
After successful submission:
- Success state with transaction ID
- Link to transaction details
- Returns to Dashboard

### Transaction Filter

Transaction list supports filtering:
- Filter panel opens as overlay/sidebar
- Filter options include: date range, type, status, coin/asset
- Applied filters shown as chips/tags on the list
- "Clear all" to reset

### All Transaction Statuses

Full list of transaction statuses shown in design:
| Status | Meaning |
|---|---|
| Pending | Transaction submitted, waiting for network confirmation |
| Processing | Transaction being processed |
| Completed | Transaction confirmed on blockchain |
| Failed | Transaction failed |
| Rejected | Transaction rejected by compliance/admin |
| On Review | Transaction under compliance review (KYT triggered) |
| Cancelled | Transaction cancelled by user or admin |

### Transaction Details (User View)
- All transaction metadata visible
- For bridge transactions: source chain + destination chain shown
- For KYT-flagged transactions: note that it's under review

---

## 3. Receive Flow — States

### Receive (Copy Address)
1. User opens Receive
2. Wallet address shown as text + QR code
3. **Copy address** button → copies to clipboard → toast confirmation

### Receive (Save QR)
1. User clicks **Save QR** button
2. QR code image saved to device
3. Toast confirmation

---

## 4. KYC Flow — States

**Note:** "Here user will be redirected to Sumsub widget" — KYC is handled entirely by Sumsub SDK embedded in the wallet.

### KYC Approved
Flow: User uploaded all requested documents → Sumsub reviews → Approved
- User notified in-app + email
- KYC badge updated on profile
- New features unlocked (higher transaction limits, etc.)

### KYC Rejected
Flow: User uploaded all documents → Sumsub reviews → Rejected
- User notified: rejection reason displayed
- User can re-submit documents (re-upload flow)
- Note: "Reupload docs" flow available — see `11-vixichain-wallet-architecture.md §5`

### KYC Partial Upload
Flow: User uploaded **some but not all** requested documents
- Label in design: `User uploaded requested documents partly`
- State shown in Sumsub widget: documents pending / action required
- User prompted to complete remaining uploads

### KYC Timeout
Flow: User **did not finish KYC in time**
- Label: `User didn't finish KYC in time`
- KYC session expires
- User must restart the KYC process
- Note displayed: session expired, please try again

---

## 5. Verification Center

### Verification Level Screen
Shows user's current verification level and what's needed to upgrade:

| Level | Requirements | Benefits |
|---|---|---|
| Level 1 | Email + phone verified | Basic wallet access |
| Level 2 | KYC (Sumsub) approved | Full transaction limits |
| (Higher) | TBD by compliance | Additional features |

### Verification Center Page
- Dashboard-style view of all verification steps
- Status per step: completed / pending / required
- Action button per step (e.g., "Start KYC", "Verify phone")
- Progress indicator

---

## 6. Blacklist Countries — Geo-Restriction Flow

When user is in a restricted country:

**Copy text shown:**
> "We're still not operating in your area and will update you as soon as we can provide services in your region"

Flow:
1. User opens wallet from restricted country
2. Geo-check fires on app open
3. User sees restriction screen with the message above
4. No access to wallet functionality
5. Email capture option: user can leave email to be notified when region is supported

---

## 7. Dashboard Onboarding

First-time user experience after account creation + KYC:

Label in design: `Dashboard onboarding`

Steps shown:
- Welcome state / intro
- Prompts to complete profile, verify identity, receive first funds
- Onboarding checklist or progress steps on dashboard

---

## 8. Privacy & Security Screen

Separate page in wallet settings:
- Password change
- Two-factor authentication settings
- Active sessions management
- (SMS verification integrated here)

### SMS Verification
- SMS OTP sent to registered phone number
- Required for: certain security actions, 2FA setup
- Input: 6-digit code
- Resend option with timer

---

## 9. Accounts Management

Screen for managing multiple accounts (personal + org):
- List of all accounts
- Switch active account
- Account-level settings

---

## 10. Dashboard Empty State

Screens for a newly created wallet with no assets:
- Total balance shows `0.00`
- Receive tab in transaction widget open by default (see Sprint 1)
- Onboarding prompt to make first deposit
- Transaction list shows empty state

---

## 11. Email & Notification Triggers (Sprint 2)

| Event | Email | In-App Notification |
|---|---|---|
| Send completed | Yes — transaction confirmation | Yes |
| Receive completed | Yes — deposit confirmation | Yes |
| KYC approved | Yes | Yes |
| KYC rejected | Yes | Yes |
| KYC action required | Yes | Yes |
