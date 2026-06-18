# Vixi — Invites, Rewards & Dashboard

**Source:** Figma "Vixi wallet + presale CRM [shared]", Marketing + IT sprint page  
**File key:** YHKGP7o2yXw4WnVIZFGOgl, node 5:23515  
**Scope:** Invites, Rewards, Explorer reward updates, Dashboard only (presale/airdrop screens excluded)

---

## Table of Contents

1. [Invite Code Email (DevNet Early Access)](#1-invite-code-email-devnet-early-access)
2. [Wallet / Signup — Create Account with Invite Code](#2-wallet--signup--create-account-with-invite-code)
3. [Email Verification Flow](#3-email-verification-flow)
4. [Dashboard — Wallet Home (TestNet, no rewards yet)](#4-dashboard--wallet-home-testnet-no-rewards-yet)
5. [Dashboard — Wallet Home (After Reward Transactions)](#5-dashboard--wallet-home-after-reward-transactions)
6. [Rewards Balance Card (Dashboard widget)](#6-rewards-balance-card-dashboard-widget)
7. [Wallet — Rewards Page (Dedicated tab)](#7-wallet--rewards-page-dedicated-tab)
8. [Invite a Friend — Sidebar Widget](#8-invite-a-friend--sidebar-widget)
9. [Invite a Friend — Campaign Email](#9-invite-a-friend--campaign-email)
10. [Invite a Friend — Logic Flow](#10-invite-a-friend--logic-flow)
11. [Admin — Rewards Table](#11-admin--rewards-table)
12. [Admin — Invite Codes / Referrals Table](#12-admin--invite-codes--referrals-table)
13. [Explorer — Reward Distribution Stats (Desktop)](#13-explorer--reward-distribution-stats-desktop)
14. [Explorer — Reward Distribution Table (Public)](#14-explorer--reward-distribution-table-public)
15. [Explorer — Reward Distribution (Mobile)](#15-explorer--reward-distribution-mobile)

---

## 1. Invite Code Email (DevNet Early Access)

**Node ID:** #5:38243 / #5:38246  
**Purpose:** Transactional email sent to users who applied via the website questionnaire; delivers a unique invite code granting access to Vixichain DevNet wallet signup.  
**Platform / breakpoint:** Email client (desktop layout, 646px wide frame)

### Layout

- Banner with crypto coin imagery + Vixichain logo
- Body copy section with invite code highlighted
- CTA button (full-width, primary gradient)
- Footer with social icons (Twitter/X, LinkedIn, YouTube, Facebook, Telegram), app-store badges, logo, legal disclaimer, unsubscribe link

### Fields / Data

- Email subject (implied): "Welcome to Vixichain Early Access!"
- Recipient salutation: "Hi [Recipient's Name],"
- Invite code block: `INVITE CODE: %inviteCode%` (bold)
- Expiry line: "Your access code is valid until: `%ExperationTime%`"
- Dynamic variables: `%inviteCode%`, `%ExperationTime%`

### Actions / Buttons

- "Signup to Devnet" — primary CTA button (Desk/Button/Primary style, opens wallet signup URL)
- Support links: `https://vixichain.org/contact-us/`, `support@vixichain.org`
- "Unsubscribe here" link in footer

### Copy / Labels (exact text)

```
Header: "Welcome to Vixichain Early Access!"

Body:
Hi [Recipient's Name],

Thank you for signing up for Vixichain Devnet Early Access. Please find your access code below:

INVITE CODE: %inviteCode%
Your access code is valid until: %ExperationTime%

[Button: Signup to Devnet]

Have questions? please use our support form https://vixichain.org/contact-us/ or send us an email directly to support@vixichain.org. Our Support Team will be happy to assist you and will reply shortly.

Sincerely,
The Vixichain Team

Copyright © Vixichain. All rights reserved.
```

### Design Notes

- Email sender address renders as `signin@auth.vixichain.com`
- Social icons row appears in footer: 6 icons (Facebook, Twitter/X, YouTube, Behance, etc.)
- Apple App Store + Google Play Store badges in footer
- Legal disclaimer (Figma node #I5:38326;8433:210661) includes full VASP/BVI entity disclaimers
- Email is part of the DevNet onboarding flow triggered after a user submits the website questionnaire

---

## 2. Wallet / Signup — Create Account with Invite Code

**Node ID:** #5:38248 / #5:38251  
**Purpose:** Desktop signup screen where users create their Vixichain wallet account; invite code field is pre-filled from the email link.  
**Platform / breakpoint:** Desktop, 1440×900px

### Layout

- Full-bleed background image (`vixi-wallet-bg-login`)
- Centered form card (680px wide, dark fill, 24px border-radius)
- Vixichain logo top-left of form
- Fields stacked vertically with "Create account" heading
- CTA button full-width at bottom of fields
- "Already have an account? Login" link below CTA

### Fields / Data

| Field | Label | Placeholder / Pre-fill |
|-------|-------|------------------------|
| Email | "Email address" | `alex.romanov@vixichain.org` |
| Password | "Password" | `••••••••` (with eye-toggle icon) |
| Confirm password | (unlabelled in node) | (same pattern) |
| Invite code | "Invite code" | `F7G0LH` (pre-filled, with `?` tooltip icon) |

### Actions / Buttons

- "Continue" button (primary gradient)
- "Login" link (secondary text link)

### States

- Invite code field has a label "Invite code" + question-mark icon (tooltip on hover implied)
- Invite code field is visually distinct from standard input style (separate frame structure)
- DevNet variant (node #5:38248): invite code required, no KYC, no account type selector
- TestNet variant (node #5:41997): adds "Personal account / Organization account" toggle selector at top of form

### Navigation

- Submitting form → "Check Your Inbox!" screen (magic link email verification)

### Copy / Labels (exact text)

```
Heading: "Create account"
Invite code label: "Invite code"
Invite code prefill: "F7G0LH"
Footer link: "Already have an account? Login"
```

### Design Notes

- DevNet signup does not include KYC or account type selection (hidden per Figma comment: "Individual/Org/Validator selector is hidden because it was already selected in Questionnaire on the website")
- TestNet signup (node #5:42022) adds account type toggle: "Personal account" | "Organization account"
- Invite code was later turned off for Validators (Figma comment: "Invite-code is turned off. Validator is invited manually")

---

## 3. Email Verification Flow

**Node IDs:** #5:42022 (Check inbox screen), #5:42047 (Email in client), #5:42084 (No KYC confirmation)  
**Purpose:** Two-step post-signup flow: (1) user shown "Check Your Inbox" screen, (2) user clicks magic link in email, (3) user lands on "Email Verified" confirmation.  
**Platform / breakpoint:** Desktop, 1440×900px

### Layout — Check Your Inbox (node #5:42022)

- Form card centered on background
- Animated "check email" illustration (200×200px)
- Heading + description text
- Resend timer and "Wrong email? Try again" links
- Toast notification: "Magic link sent to your email" (top-right, with check-circle icon)

### Fields / Data

- Email displayed as bold inline text: `alex.romanov@vixichain.org`

### Copy / Labels (exact text)

```
Heading: "Check Your Inbox!"
Body: "A magic link has been sent to alex.romanov@vixichain.org. Just click the link to verify your email to continue."
Secondary: "Didn't receive the email? Check your spam folder just in case."
Resend: "Still no email? You can resend in 00:59."
Wrong email: "Wrong email? Try again"
Toast: "Magic link sent to your email"
```

### Layout — Email Verified / No KYC (node #5:42084)

```
Heading: "Your Email is Verified! 🎉"
Subheading: "You can now access the Test Net without KYC."
Body: "For now, KYC is not required, but when the Main Net launches, you'll need to sign up and complete a KYC process to keep accessing your account. ✅ You're all set"
Button: "Get started"
```

### Verification Email Content (node #5:42052)

```
Subject (email client): "Welcome to Vixichain Wallet"
Header: "Verify Your Account"
Body: "Hi [Recipient's Name], One last step: Please click the button below to verify your account."
Button: "Verify Account"
```

---

## 4. Dashboard — Wallet Home (TestNet, no rewards yet)

**Node ID:** #5:42125 / #5:42301  
**Purpose:** Main wallet dashboard shown to a user who has just signed up; no reward transactions have been distributed yet. Shows zero rewards balance.  
**Platform / breakpoint:** Desktop, 1440px (full-page layout, TestNet banner at top)

### Layout

- Full-width "TestNet" banner (persistent top bar in yellow/amber)
- Left sidebar (collapsible, ~240px wide):
  - Logo
  - Navigation items (see below)
  - "Invite a friend" widget at bottom
  - Collapse arrow
- Top header bar: "Welcome, Alex" greeting + "Main account" avatar (initials "AR") + account switcher + notification bell
- Main content area:
  - Dashboard / Top section: two summary cards side-by-side
  - Transaction widget (Send / Receive tabs)
  - Recent Transactions table below

### Sidebar Navigation

| Item | Icon | State |
|------|------|-------|
| Dashboard | icon/layout | Active (selected, highlighted) |
| Transactions | icon/transactions | Default |
| Organizations | icon/organisation | Default |
| Address Book | icon/address-book | Default |
| Rewards | icon/Reward | Dimmed / disabled (30% opacity, "soon" tooltip) |

### Fields / Data — Balance Cards

**Card 1 — Balance:**
- "Balance" label
- VIXC token icon
- `100.0000 VIXC`
- `$ 100.0000`
- "For TestNet use only" disclaimer

**Card 1 — Trust Score (right side of same card):**
- "Trust Score" label + external link icon
- `353` (large value)
- `+105` delta (green)
- "Updated 3w ago"

**Card 2 — Rewards Balance (locked, zero state):**
- "Rewards Balance" label + lock icon
- `0 VIXC` with question-mark tooltip
- `$ 0`
- "Locked until MainNet release"
- Breakdown rows (all zero):
  - `0 VIXC` — Invites
  - `0 VIXC` — Pre-sale
  - `0 VIXC` — Airdrop

### Actions / Buttons

- Send tab (active, blue underline indicator)
- Receive tab
- "You send exactly" → amount input with `100.0000` / MAX button / nUSD token selector
- "Recepient's address on VixiChain" input
- "Vixichain" network badge + dropdown arrow
- Submit transaction button (bottom of Send form)

### Recent Transactions Table

**Columns:** Tx Hash (filter icon) | Sender | Receiver | Updated (sort+filter) | Status (filter) | Amount (sort+filter)

**Sample row:**
- Tx hash: `cc00*b008` + copy icon / ID: 123 + copy icon / `%tx type%`
- Sender: `cc00*b008` / "You or Anna S. or "–""
- Receiver: `cc00*b008` / "You or Anna S. or "–""
- Updated: `2024-09-01` / `19:50, UTC`
- Status: `Confirmed` (green)
- Amount: `3,323,121.0000 VIXC`

### Navigation

- Sidebar links navigate to respective pages
- "Main account" header button opens account switcher
- Bell icon for notifications

### Copy / Labels (exact text)

```
Header greeting: "Welcome, Alex"
Account label: "Main account"
Balance label: "Balance"
Balance disclaimer: "For TestNet use only"
Trust Score label: "Trust Score"
Rewards card heading: "Rewards Balance"
Lock notice: "Locked until MainNet release"
Campaign columns: "Claimed" | "Campaign"
Send tab: "Send"
Receive tab: "Receive" (implied)
Recent transactions heading: "Recent transactions"
Table: "You send exactly" / "Recepient's address on VixiChain" / "Vixichain Wallet Address"
Receive instruction: "You can receive nUSD and VIXC tokens on Vixichain to this address Learn more"
Receive address example: "33dhFqthZWw9jUgSnCv1RanVwBwwrEmGYY"
Footer: "© 2025 All rights reserved to Vixichain" | "Switch to Mainnet"
```

### Design Notes

- "Rewards (soon)" sidebar item is shown at ~30% opacity with a tooltip bubble containing "Soon"
- TestNet banner appears persistently at top in a yellow/amber color
- The "Rewards" menu item uses `icon/Reward` (distinct from address-book icon used in earlier states)
- In later iterations the "Invite a Friend" widget has `InviteFriend: false` as a component property (hidden on the Rewards page variant)

---

## 5. Dashboard — Wallet Home (After Reward Transactions)

**Node ID:** #5:42334 / #5:42361  
**Purpose:** Dashboard state after the user has received reward transactions (e.g., airdrop or invite rewards distributed). Rewards Balance card shows non-zero values.  
**Platform / breakpoint:** Desktop, 1440px

### Layout

Same as screen 4 above. Key difference: Rewards Balance card now shows populated values.

### Fields / Data — Rewards Balance Card (populated state)

- "Rewards Balance" label + lock icon
- `330.0000 VIXC` (total locked) with question-mark tooltip
- `$ 290.1234` USD equivalent
- "Locked until MainNet release"
- Campaign breakdown:
  - `12.0000 VIXC` — Pre-sale
  - `300.0000 VIXC` — Airdrop
  - `12.0000 VIXC` — Invites

### Copy / Labels (exact text)

Tooltip text on Rewards Balance (node #5:42574):
```
"Total balance of purchased pre-sale tokens, tokens earned as rewards during the airdrop, and tokens earned by inviting friends. Locked until the MainNet release.

You will receive all your rewards automatically via transactions, and we will notify you by email.

You have %amount% VIXC from %campaign name%, %amount% VIXC from %campaign name%, %amount% VIXC from %campaign name%, we have transferred it to you %timstamp%. Please review your transactions to make sure or search by your wallet in Explorer"
```

### Design Notes

- The rewards card carries a "Card Rewards Balance will be moved to 'Rewards' page after pre-sale and Airdrop rewards will be transferred to users" Figma annotation (design team note, not a UI label)
- The populated state uses template `EL-9b3c9bb8` ("Dashboard / Card 1 & 3") while the zero state uses `EL-33d61412` — these are distinct component variants
- Transaction toast: "Transaction completed successfully" / "Receive 100.0000 VIXC" (bottom-left toast notification)

---

## 6. Rewards Balance Card (Dashboard widget)

**Node ID:** #I5:42152;8021:123195 (populated), #I5:42316;8021:123337 (zero)  
**Purpose:** Reusable card component embedded in the Dashboard / Top area; summarises locked reward balance per campaign before MainNet release.  
**Platform / breakpoint:** Desktop (embedded in 1440px dashboard)

### Layout

Two-column card:
- Left column: token icon + total VIXC amount + USD value + "Locked until MainNet release"
- Right column: per-campaign breakdown table (rows of amount + campaign name)

### Fields / Data

| State | Total | Invites | Pre-sale | Airdrop |
|-------|-------|---------|----------|---------|
| Zero | 0 VIXC / $0 | 0 VIXC | 0 VIXC | 0 VIXC |
| Populated | 330.0000 VIXC / $290.1234 | 12.0000 VIXC | 12.0000 VIXC | 300.0000 VIXC |

### Copy / Labels (exact text)

```
Card heading: "Rewards Balance"
Lock icon (decorative)
Breakdown header row: "Claimed" | "Campaign"
Row labels: "Invites" | "Pre-sale" | "Airdrop"
Footer: "Locked until MainNet release"
```

### Design Notes

- Lock icon (`icon/Lock`) appears inline with the heading
- Question-mark icon (`question`) appears next to the VIXC amount; implies a tooltip explaining the locked state
- Component variants: `EL-81b9f1b9` (zero state with 0 VIXC), `EL-fa831d60` (partial/alternative layout)
- This card does NOT appear on the dedicated "Rewards" page — it is dashboard-only

---

## 7. Wallet — Rewards Page (Dedicated tab)

**Node ID:** #5:59645 ("Wallet - Rewards")  
**Purpose:** Dedicated Rewards page within the wallet; accessible from the sidebar once the Rewards nav item becomes active. Shows full reward breakdown and reward transaction history.  
**Platform / breakpoint:** Desktop, 1440px (full-page layout)

### Layout

- Standard wallet shell (TestNet banner + sidebar + top header)
- Sidebar: "Rewards" menu item is now the active/selected item (icon/Reward highlighted)
- Sidebar does NOT show "Invite a Friend" widget on this page (`InviteFriend: false`)
- Header greeting changes to: "Good morning, Alex"
- Main content:
  - "assets" card (full-width, 183px height): Rewards Balance summary
  - "Reward Transactions" heading
  - Full-width transactions table

### Fields / Data — Assets Card

- "Rewards Balance" label + lock icon
- `0 VIXC` / `$ 0`
- "Locked until MainNet release"
- Campaign breakdown:
  - `00.0000 VIXC` — Invites
  - `00.0000 VIXC` — Pre-sale
  - `00.0000 VIXC` — Airdrop

### Fields / Data — Reward Transactions Table

**Columns:** Tx Hash (filter) | Sender | Receiver | Updated (sort+filter) | Status (filter) | Amount (sort+filter)

**Sample row:**
- Tx hash: `cc00*b008` / ID: 123
- Sender: `cc00*b008` / "You or Anna S. or "–""
- Receiver: `cc00*b008` / "You or Anna S. or "–""
- Updated: `2024-09-01` / `19:50, UTC`
- Status: `Confirmed`
- Amount: `3,323,121.0000 VIXC`

### Copy / Labels (exact text)

```
Header greeting: "Good morning, Alex"
Assets card heading: "Rewards Balance"
Lock notice: "Locked until MainNet release"
Campaign labels: "Invites" | "Pre-sale" | "Airdrop"
Table heading: "Reward Transactions"
```

### Design Notes

- This page is the dedicated rewards view; the Rewards Balance card from the Dashboard is replicated here but without campaign breakdown rows in some variants (campaign rows shown in others as `00.0000 VIXC`)
- The "Invite a Friend" widget is intentionally hidden on this page
- Sidebar nav shows Rewards as active (icon/Reward + selected style)

---

## 8. Invite a Friend — Sidebar Widget

**Node ID:** #5:42141 / #I5:42308;7943:183056  
**Purpose:** Sidebar widget promoting the Invite a Friend feature; appears in the bottom section of the wallet's left navigation panel.  
**Platform / breakpoint:** Desktop (sidebar section within 1440px dashboard)

### Layout

- Appears in the lower "Frame 228" section of the sidebar (below main nav items, above collapse arrow)
- Contains: invite icon + text label + invite link input field with copy icon

### Fields / Data

- Icon: `invite-friend` (custom SVG illustration)
- Text label: "Invite a friend \nand get XX.XXXX VIXC"
- Input field: shows invite link placeholder `link/name-wall`
- Copy icon at right of input field (`icon/copy`)

### Actions / Buttons

- Copy icon copies the personal invite link to clipboard

### Copy / Labels (exact text)

```
Widget text: "Invite a friend 
and get XX.XXXX VIXC"
Input placeholder: "link/name-wall"
```

### Design Notes

- The invite-friend icon is a custom SVG element used consistently across all dashboard screen iterations (node template `EL-154ea565`)
- The reward amount ("XX.XXXX VIXC") is a placeholder — exact amount to be set by marketing/product
- The widget is hidden (set via component property `InviteFriend: false`) on the dedicated Rewards page variant
- The invite link format `link/name-wall` suggests a personalized URL with the user's wallet name

---

## 9. Invite a Friend — Campaign Email

**Node ID:** #5:42292 / #I5:42292;2025:24829  
**Purpose:** Email sent to existing wallet users who are selected to participate in the "Invite a Friend" campaign; contains a personal invite link to share.  
**Platform / breakpoint:** Email client

### Layout

Same template structure as the Early Access invite email: banner, body, CTA button, footer with social icons.

### Fields / Data

- Recipient salutation: "Hey [name]"
- Dynamic variable: `[link/name-wall]` (personal invite URL)
- Campaign rules: max X invites per user (number TBD), reward amount TBD

### Copy / Labels (exact text)

```
Subject: (not shown in Figma node)
Header: "Invite a Friend to Receive more Tokens!"

Body:
Hey [name]

We've got great news for you! We are launching the "Invite a Friend" campaign for credible community members. If you are receiving this email it means you have been selected. Congrats!

Next Step:
1. Invite a friend to create a testnet wallet
2. Your friend creates a wallet
3. You receive your reward

For every friend you invite, you will receive X amount of VIXC tokens (number to be decided). To ensure fair participation, each user can only invite a maximum of X friends.

Copy and share the unique link below with your friend:

[link/name-wall]

[Support footer text]
```

### Design Notes

- Note in Figma (#5:42548): "This is basic usual invite-a-friend. This can be repeated multiple times (inviting other people). Invite-referral logic we will have in mainnet"
- Timing annotation: "After Airdrop finished and rewards transferred to all users, when Invite a Friend feature tested/finished"
- The invite email is triggered after the airdrop campaign concludes — it is not sent during the airdrop period

---

## 10. Invite a Friend — Logic Flow

**Node IDs:** #5:42270–#5:42283 (flow diagram in canvas)  
**Purpose:** Internal Figma flow diagram documenting the "Invite a Friend" campaign logic; not a UI screen but captures business rules.  
**Platform / breakpoint:** Canvas / diagram (no breakpoint)

### Flow Steps

1. Kate (existing wallet user) receives the invite-a-friend email
2. Kate shares her unique invite link (`link/name-wall`) with Bob
3. Bob signs up using Kate's invite link
   - For TestNet: KYC = n/a
   - For MainNet: KYC = verified required
4. Kate automatically receives X amount of VIXC tokens (reward for inviter)
5. Bob automatically receives X/Y amount of VIXC tokens (welcome reward for invited user)

### Backend Requirements (from Figma annotations)

- Backend shows invite results in: Admin / Invites section
- Reward transactions sent automatically by backend
- Status should appear as "claimed" in the explorer/wallet
- Reflected in: Admin / Rewards + Explorer / Rewards

### Design Notes

- Annotation #5:42285: "This is basic usual invite-a-friend. This can be repeated multiple times (inviting other people). Invite-referral logic we will have in mainnet"
- Users triggered in this flow:
  - Signed up (invited user)
  - Received airdrop trx (invited user)
- Each user persona annotated as: `%campaign name% user` combining pre-sale + airdrop + invited states

---

## 11. Admin — Rewards Table

**Node ID:** #5:59521 ("Rewards" admin panel frame, width 1880px)  
**Purpose:** Admin panel page for managing and reviewing reward distributions; accessible by admin users under the "Rewards" section.  
**Platform / breakpoint:** Desktop, 1880×749px (admin layout)

### Layout

- Left sidebar: Admin navigation (240px)
  - General section: Dashboard, Clients (Individual), [Orgs], [Compliance items], Invite codes, Referrals, **Rewards** (active)
  - Compliance section
  - Setup section
  - Soon section (dimmed)
- Right content area:
  - Admin header bar (admin user: `alexandra.shelekova@vixichain.org`, "Sa Sha")
  - "Rewards" heading + "Total: 2" count badge
  - Search bar + Export CSV button(s)
  - Full rewards table

### Fields / Data — Admin Rewards Table

**Columns:** User | campaign | rewards Earned | pending balance | claimed balance | Tx ID, hash | Wallet | Updated, utc (sortable)

**Sample rows:**

| User | Campaign | Rewards Earned | Pending | Claimed | Tx ID, hash | Wallet | Updated |
|------|----------|---------------|---------|---------|-------------|--------|---------|
| Bob Marley (indiv.) 🇬🇧 / ID: 34398 / bobmarley@gmail.com | Airdrop | 50.00 VIXC | 10.00 VIXC | 40.00 VIXC | ID: 1234 / cc00*b008 | cc00*b008 | 2024-09-01, 9:50:34 |
| Bob Marley (org) 🇬🇧 / ID: 34398 / bobmarley@gmail.com | Pre-sale | 200.00 VIXC | 0.00 VIXC | 150.00 VIXC | ID: 1234 / cc00*b008 | cc00*b008 | 2024-09-01, 9:50:34 |
| Bob Marley 🇬🇧 / ID: 34398 / bobmarley@gmail.com | %campaign name% | 200.00 VIXC | 0.00 VIXC | 150.00 VIXC | 2 (link to trx table) | cc00*b008 | 2024-09-01, 9:50:34 |

### Actions / Buttons

- Search by user ID or email
- "Export CSV" button (appears twice — may be for different export scopes)
- Sort by "Updated, utc" column
- Tx ID links to transaction table

### Copy / Labels (exact text)

```
Section heading: "Rewards"
Count badge: "Total: 2"
Search placeholder: "Search by user ID or email"
Button: "Export CSV"
Column headers: "User" | "campaign" | "rewards Earned" | "pending balance" | "claimed balance" | "Tx ID, hash" | "Wallet" | "Updated, utc"
```

### Design Notes

- Admin panel header user is "Sa Sha" (alexandra.shelekova@vixichain.org) — appears to be a test admin account
- The admin rewards table uses the same "Diagrams / Table template" component as other admin list screens
- "2 (link to trx table)" cell value in the third row suggests the Tx ID column links to a filtered transactions view

---

## 12. Admin — Invite Codes / Referrals Table

**Node ID:** Part of admin panel (within "Rewards reflection - sprint 9/10" section, lines ~20262–20421)  
**Purpose:** Admin table tracking invite code usage and referral stats per user.  
**Platform / breakpoint:** Desktop (admin layout)

### Layout

Same admin shell as above. Navigation shows "Invite codes" and "Referrals" as separate sub-items under General.

### Fields / Data — Invite Codes Table

**Columns:** User | Invite link | Invited clients | Invited Orgs | Invited total (sortable) | rewards total | Updated, utc (sortable)

**Sample row:**

| User | Invite link | Invited clients | Invited Orgs | Invited total | Rewards total | Updated |
|------|-------------|----------------|--------------|---------------|---------------|---------|
| Bob Marley 🇬🇧 / ID: 34398 / bobmarley@gmail.com | SVYKGK | 12 | 12 | 24 | 12.00 VIXC | 2024-09-01, 9:50:34 |

### Copy / Labels (exact text)

```
Search placeholder: "Search by user ID, or email"
Button: "Export CSV"
Column headers: "User" | "Invite link" | "Invited clients" | "Invited Orgs" | "Invited total" | "rewards total" | "Updated, utc"
Invite code sample: "SVYKGK"
```

---

## 13. Explorer — Reward Distribution Stats (Desktop)

**Node IDs:** #5:59727 / #5:59993 / #5:60271 / #5:60338 / #5:60436 / #5:60753  
**Purpose:** Public Explorer section showing aggregate reward distribution statistics for all campaigns. Multiple versions exist for different sprint stages.  
**Platform / breakpoint:** Desktop (Explorer public page, 1440px+)

### Layout

- Explorer page with standard header ("Explorer Header" component)
- "Reward Distribution Stats" heading section (Desk/Title/Primary)
- Summary stat cards
- Per-campaign breakdown card
- "Reward Distribution" data table below stats

### Fields / Data — Summary Cards

- Total Reward Pool: **2000 VIXC**
- Claimed: **400 VIXC**
- "More campaigns can be added" annotation (brand secondary color — internal Figma note)

### Fields / Data — Per-Campaign Breakdown

| Campaign | Pool | Claimed |
|----------|------|---------|
| Vixi Pre-sale (wallet: cc00*b008) | 1000 VIXC | 200 VIXC |
| Vixi Airdrop | 421 VIXC | — |
| Vixi Invites (wallet: cc00*b008) | — | — |

### Copy / Labels (exact text)

```
Section heading: "Reward Distribution Stats"
Table heading: "Reward Distribution"
Campaign names: "Vixi Pre-sale" | "Vixi Airdrop" | "Vixi Invites"
```

### Design Notes

- "Reward Distribution Stats" appears as a reusable element (`template=EL-20fef44f`) used across multiple explorer iterations
- The component is used in at least 6 different explorer page variants (sprint 9/10 updates)
- Explorer section label from Elements data (line 9210): "Reward Distribution Stats" uses `Desk/Title/Primary` text style

---

## 14. Explorer — Reward Distribution Table (Public)

**Node IDs:** #5:59781 / related explorer table nodes  
**Purpose:** Public-facing table in the Explorer showing individual reward distribution transactions.  
**Platform / breakpoint:** Desktop (Explorer, 1440px)

### Layout

- Part of the Explorer page below the Reward Distribution Stats cards
- Standard Explorer shell: public ledger header, stats row, then this table

### Fields / Data — Table

**Columns:** Wallet address | Campaign | Amount

**Sample data:**
- `31.` VIXC — Pre-sale campaign row
- `121.` VIXC — Airdrop campaign row
- `300.` VIXC — (campaign)
- `55.` VIXC — (campaign)

**Date group headers:**
- "2 Feb 2025"
- "1 Feb 2025"
- "31 Jan 2025"

### Copy / Labels (exact text)

```
Table heading: "Reward Distribution"
Search: "Search by full wallet address"
Column headers: "Wallet address" | "Campaign" | "Amount"
```

### Design Notes

- This is the public explorer view — no authentication required
- Campaign filter labels: "Pre-sale" and "Airdrop" are visible to the public as campaign names
- Pagination: "Page 2 of 5" with left/right arrow buttons (from wider Explorer data)

---

## 15. Explorer — Reward Distribution (Mobile)

**Node IDs:** From ELEMENTS section (lines ~9356–9383, 10343–10349)  
**Purpose:** Mobile version of the Explorer's Reward Distribution page.  
**Platform / breakpoint:** Mobile, 375px wide

### Layout

- Full-width mobile layout
- "Reward Distribution" as page heading (Mob/Title/Primary equivalent)
- Descriptive text below heading
- Search field
- Table rows grouped by date

### Fields / Data

- Page title: "Reward Distribution"
- Description: "Detailed overview of all reward distribution transactions, including those from **Presale** and **Airdrop** campaigns."
- Search: "Search by full wallet address"
- Same column headers as desktop but compressed: "Wallet" | "Amount, Campaign"
- Date group rows: "2 Feb 2025", "1 Feb 2025", "31 Jan 2025"
- Sample amounts: 31. VIXC, 121. VIXC, 300. VIXC, 55. VIXC
- Campaign labels inline with amounts: "Pre-sale" | "Airdrop"

### Copy / Labels (exact text)

```
Heading: "Reward Distribution"
Description: "Detailed overview of all reward distribution transactions, including those from Presale and Airdrop campaigns."
Search: "Search by full wallet address"
Column headers (mobile compressed): "Wallet" | "Amount, Campaign"
```

### Design Notes

- The Invites campaign name "Vixi Invites: cc00*b008" appears in the campaign selector (from ELEMENTS line 9362) — all three campaign types are represented in the public explorer even if Invites rows may be sparse in TestNet
- Mobile and desktop share the same data model; mobile compresses Sender/Receiver into abbreviated wallet addresses

---

## Coverage Report

**Total file lines:** 24,848  
**Lines read:** All 24,848 lines were scanned (via grep patterns for in-scope terms across the full file, plus targeted offset reads for specific sections)

**Sections included:**
- DevNet invite code email template (lines ~12752–12788)
- Wallet signup with invite code (lines ~12790–12849)
- Email verification flow (lines ~13794–13942)
- Dashboard with Rewards Balance card — zero state (lines ~14030–14200)
- Dashboard with Rewards Balance card — populated state (lines ~14864–14981)
- Rewards Balance card component analysis (lines ~14090–14145)
- Wallet — Rewards page (lines ~20603–20795)
- Invite a Friend sidebar widget (lines ~14060–14070)
- Invite a Friend campaign email (lines ~14560–14591)
- Invite a Friend flow diagram (lines ~14528–14548)
- Admin — Rewards table (lines ~20425–20598)
- Admin — Invite codes table (lines ~20380–20421)
- Explorer Reward Distribution Stats (lines ~21039, 21644, 22261, 22627, 22961, 24317)
- Explorer Reward Distribution table / desktop (lines ~10050, 21096)
- Explorer Reward Distribution / mobile (lines ~9356–9383, 10343–10349)

**Sections skipped (per scope filter):**
- Pre-sale screens: "Pre-sale: in progress" (#5:38329), "Pre-sale Closed - Mar 6" (#5:38337), Pre-sale timer/website sections (~12920–13717)
- Airdrop screens: "Wallet of Airdrop user before/after reward trx" (documented only insofar as Dashboard state differs, e.g. #5:42300, #5:42864 — the wallet UI itself is the same component; airdrop-specific logic flows were excluded)
- Pre-sale CRM and admin pages (covered in doc 08)
- Testnet Announcement email to pre-sale users (#5:38326) — skipped as presale-specific
- Testnet Launch email ("Great News! Vixichain TestNet is Now Live" #5:42120) — skipped as presale-specific marketing
- Airdrop reward claim email ("Claim Your VIXC Airdrop Campaign Reward!" #5:42298) — skipped as airdrop-specific
- WordPress marketing pages, presale-era screens

**Design system references used throughout:**
- Typography: Onest font family, `Desk/Title/Primary`, `Desk/Title/Secondary`, `Desk/Text/Primary`, `Desk/Button/Primary`
- Colors: `Button/Primary` (gradient), `Brand/secondary/50` (comment cards), `fill_00fe988f` (action blue), `fill_2fa63609` (secondary text)
- Components: `Dashboard / Card 1 & 3`, `Dashboard / Transaction widget`, `Menu side wallet`, `Office use / Comment`, `Table Lines`, `Table / header item`
