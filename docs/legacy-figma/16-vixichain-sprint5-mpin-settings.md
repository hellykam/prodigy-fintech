# Vixichain Wallet — Sprint 5: MPIN & Settings

**Source:** Figma "Vixichain Wallet" (vbGInZbVbXfOIS0D6SlNvY), Design (sprint 5), node 5799:67160
**Covers:** MPIN setup/entry/change/reset, Settings page, Password flows (create/reset/change), Transaction confirmation with MPIN

---

## 1. Settings Page

Section label: **"Settings"** (white banner — top-level page section)

Settings page in the wallet. Contains multiple setting groups accessible from this page.

---

## 2. MPIN

MPIN = Mobile PIN — a numeric PIN used for quick authentication within the wallet (alternative to full password re-entry).

### Create MPIN

Section label: **"create mpin"**

Flow — 5 steps:
1. User navigates to Settings → Security
2. **Create MPIN screen** — prompted to set up MPIN
3. Enter 4–6 digit PIN (keypad UI)
4. **Confirm MPIN** — re-enter PIN for verification
5. MPIN created → success state

Screen iterations: 5 (covers each step of creation flow)

### Enter MPIN

Section label: **"enter mpin"**

Flow — used for authentication when:
- Logging into the wallet
- Confirming a transaction
- Accessing sensitive settings

Multiple iterations documented:
- Enter MPIN screen (default)
- Wrong MPIN entered (error state)
- MPIN locked (too many failed attempts)

Also documented: **Enter MPIN within Send flow** (see §4 below).

### Change MPIN

Screen: **"Change MPIN"**

Flow:
1. Settings → Security → Change MPIN
2. Enter current MPIN
3. Enter new MPIN
4. Confirm new MPIN
5. Success

**Change MPIN Email:**
- Dedicated screen for MPIN change confirmation via email
- Email sent to registered address with confirmation link

### Reset MPIN

Section label: **"create mpin"** (second occurrence, further down)
Screens: **"Reset MPIN"** (2 iterations)

Flow — when user forgot their MPIN:
1. User clicks "Forgot MPIN"
2. Email sent for verification
3. User confirms via email
4. Set new MPIN (same Create MPIN flow)

---

## 3. Password Flows

### Create Password

Section label: **"create password"**

Full flow for setting/creating a wallet password. Highly detailed — many screen states documented (section banner spans full width of `15300px` indicating large number of screens).

### Password on Login

Section label: **"Password request on Login flow"**

When user logs in with password (not MPIN):
- Password entry screen
- Show/hide password toggle
- "Forgot password" link

Also documented: **Login screen** (`Log in` frame, 1440×900) — the password-based login screen.

### Reset Password

Section label: **"Reset password"**
Many screen states (section spans `15300px`).

Flow:
1. "Forgot password" link
2. Enter registered email
3. Email sent with reset link
4. Click link → create new password
5. Password confirmed → redirect to login

### Change Password

Section label: **"Change password"**
Many screen states (section spans `15300px`).

Flow:
1. Settings → Security → Change password
2. Enter current password
3. Enter new password
4. Confirm new password
5. Success

---

## 4. Send with MPIN (Transaction Confirmation)

Section label: **"enter mpin"** (second occurrence, within Send flow area)
Screens: **"Send"** (4 iterations with MPIN entry)

When user initiates a Send transaction, MPIN is requested to confirm:
1. User fills Send form → clicks "Confirm"
2. **MPIN confirmation screen** appears (Enter MPIN)
3. User enters MPIN → transaction submitted
4. Success / Error

Flow variations:
- MPIN entered correctly → proceed to send
- MPIN wrong → error state (try again)
- MPIN locked → user must reset MPIN

**Designer notes** (Office use / Comment badges, blue border):
- Comments about MPIN behavior in the Send flow visible in design
- Additional flow note at MPIN lock state

---

## 5. Private Key (Moved from Sprint 4)

Sprint 4 noted: "Show private key. Muted because check 'Settings' in sprint 5"

The private key export/view feature is part of the Settings flow. No separate label for it was found in this sprint's top-level sections, but it is expected to be within the Settings page section.

---

## 6. Flow Diagrams

Sprint 5 includes **connector lines** showing flow transitions between screens (unique to this sprint — other sprints don't use connector lines):
- Gray connectors: standard flow paths
- Purple connectors: alternative/special paths
- These connect: Login → Enter MPIN, Reset MPIN → Create MPIN, Change MPIN → Email confirm

---

## 7. Summary: Security Features

| Feature | Entry point | How authenticated |
|---|---|---|
| Wallet login | Login page | Password OR MPIN |
| Send transaction | Send → Confirm | MPIN |
| Change password | Settings → Security | Current password |
| Change MPIN | Settings → Security | Current MPIN + email confirm |
| Reset MPIN | "Forgot MPIN" | Email verification |
| Reset password | "Forgot password" | Email verification |
| Show private key | Settings → Security | (Private key entry, likely password) |
