# Vixi Wallet — Onboarding & KYC Flow

**Source:** Figma "Vixi wallet + presale CRM [shared]", Wallet Onboarding + KYC page  
**File key:** YHKGP7o2yXw4WnVIZFGOgl, node 3:3  
**Platform:** Web app (browser-based desktop UI; form panels render at 375pt width centered on a background image)  
**Font family:** Onest (all weights)  
**Documented:** 2026-06-18  

---

## Table of Contents

1. [Design System & Tokens](#1-design-system--tokens)
2. [Component Library Overview](#2-component-library-overview)
3. [Screen A — Create Account (Step 1, Personal tab)](#3-screen-a--create-account-step-1-personal-tab)
4. [Screen B — Create Account (Step 1, Organization tab)](#4-screen-b--create-account-step-1-organization-tab)
5. [Screen C — Create Personal Account (Step 2)](#5-screen-c--create-personal-account-step-2)
6. [Screen D — Fill Organization Details (Step 2)](#6-screen-d--fill-organization-details-step-2)
7. [Screen E — Verify Your Email](#7-screen-e--verify-your-email)
8. [Screen F — Email Verified Success](#8-screen-f--email-verified-success)
9. [Screen G — Email Verification Failed](#9-screen-g--email-verification-failed)
10. [Screen H — Loading Skeleton](#10-screen-h--loading-skeleton)
11. [Screen I — Verify Your Identity (KYC Intro)](#11-screen-i--verify-your-identity-kyc-intro)
12. [Screen J — Sumsub KYC Widget](#12-screen-j--sumsub-kyc-widget)
13. [Screen K — KYC Under Review](#13-screen-k--kyc-under-review)
14. [Screen L — KYC Additional Information Needed](#14-screen-l--kyc-additional-information-needed)
15. [Screen M — KYC Rejected](#15-screen-m--kyc-rejected)
16. [Screen N — KYC Expired](#16-screen-n--kyc-expired)
17. [Screen O — Dashboard (Empty State / KYC Complete)](#17-screen-o--dashboard-empty-state--kyc-complete)
18. [Screen P — Log In](#18-screen-p--log-in)
19. [Screen Q — Forgot Password (Enter Email)](#19-screen-q--forgot-password-enter-email)
20. [Screen R — Check Your Email (Password Reset)](#20-screen-r--check-your-email-password-reset)
21. [Screen S — Create New Password](#21-screen-s--create-new-password)
22. [Screen T — Password Reset Success](#22-screen-t--password-reset-success)
23. [Screen U — Geo-restriction / Invite to Risely](#23-screen-u--geo-restriction--invite-to-risely)
24. [Email Templates](#24-email-templates)
25. [SMS / Push Notifications](#25-sms--push-notifications)
26. [Toast Notifications](#26-toast-notifications)
27. [Country Dropdown Component](#27-country-dropdown-component)
28. [Prototype Flow Map](#28-prototype-flow-map)

---

## 1. Design System & Tokens

### Color Fills

| Token | Value | Usage |
|---|---|---|
| `fill_IURK11` | `#B2B2B2` | Placeholder text color |
| `fill_XI86TK` | `#E5E5E5` | Default input border |
| `fill_O2BX7A` | Primary blue (brand) | Active/focused border, buttons, links, cursor |
| `fill_BV73OW` | Dark text | Primary body text, headings |
| `fill_LKML70` | White / surface | Form card background, input background |
| `fill_SMMCSO` | Light off-white | Form outer card background |
| `fill_NM525R` | Background image fill | Full-bleed background behind the form card |
| `fill_QCJD84` | Light badge fill | Annotation label background (canvas use only) |
| `fill_8CAYXZ` | Secondary grey text | Body secondary, footer text |
| `fill_LZML0R` | Selected tab / skeleton | Active tab pill background; loading skeleton rectangles |
| `fill_7D3HZH` | Unselected tab | Inactive tab label background; SVG placeholder |
| `fill_V95JQY` | Red / error | Inline field error text; error border stroke |
| `fill_AAJ5SZ` | Toast border | Toast notification border |
| `fill_529844` | Connector green | Figma prototype connector lines |

### Typography Scale

| Style | Font | Weight | Size | Usage |
|---|---|---|---|---|
| `Desk/Title/Primary` | Onest | SemiBold | 24px | Screen headings |
| `Desk/Title/Secondary` | Onest | Medium | 20px | Section sub-headings |
| `Desk/Text/Primary` | Onest | Regular | 16px | Body copy, input values |
| `Desk/Text/Secondary` | Onest | Regular | 14px | Supporting text, footer links |
| `Desk/Text/Hint` | Onest | Regular | 12px | Inline error, password hints |
| `Desk/Button/Primary` | Onest | SemiBold | 16px | Primary button label |
| `Desk/Button/Secondary` | Onest | Medium | 14px | Link-style buttons, tab labels |
| `v1/Button-Primary` | Onest | SemiBold | 16px | Primary button (v1 variant) |
| `style_TAXI7R` | Onest | Regular | 12px | Input field label/title |

### Effects

| Token | Usage |
|---|---|
| `effect_UIBNQI` | Toast card drop shadow |
| `effect_G9YFWS` | Dropdown panel drop shadow |
| `Drop Shadow/20` | Country dropdown shadow |
| `effect_PLCPKD` | Illustration element shadow |

### Spacing & Shape

- Form card: `borderRadius: 24px`, background `fill_SMMCSO`
- Input boxes: `borderRadius: 8px`, stroke `1px`
- Primary button: `borderRadius: 12px`
- Tab pill (active): `borderRadius: 12px`, fill `fill_LZML0R`
- Dropdown list items: `borderRadius: 8px`
- Toast card: `borderRadius: 16px`, stroke `1px fill_AAJ5SZ`
- Country flag avatars: `borderRadius: 60px`
- Text cursor: `RECTANGLE`, `borderRadius: 2px`, fill `fill_O2BX7A`, layout `2px × ~18px`

---

## 2. Component Library Overview

### Input Components (componentId references)

| ComponentId | Type | Properties |
|---|---|---|
| `5:35888` | Standard input (no eye icon, cursor visible) | `Mask: bool`, `Icon: bool` |
| `5:35875` | Password input (eye icon toggle) | `Mask: bool`, `Icon: bool` |
| `5:35880` | Input with trailing arrow icon | `Mask: bool`, `Icon: bool` |
| `5:35894` | Filled input with cursor blink state | `Mask: bool`, `Icon: bool` |
| `5:35916` | Input with inline error message | `Mask: bool`, `Icon: bool` |
| `5:35995` | Eye icon (password visibility toggle) | `visible: Icon` |
| `5:35997` | Eye-off icon (password hidden) | `visible: Icon` |
| `5:35999` | Question mark / tooltip icon | n/a |
| `5:23669` | Chevron/arrow icon (dropdown) | `visible: Icon` |

### Button Components

| ComponentId | Variant | Notes |
|---|---|---|
| `5:18078` | Primary filled | Full opacity — active state |
| `5:18080` | Primary filled | `opacity: 0.30` — disabled state |
| `5:18092` | Outline / ghost | Outline with `fill_O2BX7A` stroke |

**Disabled pattern:** Primary button rendered with `opacity: 0.30000001192092896` (30%) — no pointer events. Becomes full opacity (`5:18078`) when all required fields are valid.

### Other Components

| ComponentId | Name | Usage |
|---|---|---|
| `5:18015` | logo | Vixichain logo mark (SVG) |
| `5:36807` | back | Back arrow button (top-left of form) |
| `5:36568` | list item | Country dropdown row (flag + name) |
| `6:99274` | dropdown (country list) | Scrollable country list with `Scroll: bool` |
| `5:36251` | check email | Illustration component (envelope/mail graphic) |
| `5:18236` | Email (template) | Full email template component |

---

## 3. Screen A — Create Account (Step 1, Personal tab)

### Purpose
First step of new user registration. Collects credentials and invite code. Personal account tab is active by default.

### Entry Point
- Landing from marketing site or direct URL
- "Sign up" link from Log in screen

### Layout
- Full-bleed background (`fill_NM525R`) with centered white card
- Card: logo at top, fields + button group, bottom text
- Two-tab toggle: **Personal account** (active, `fill_LZML0R` background, `fill_O2BX7A` text) | **Organization account** (inactive, `fill_7D3HZH`, `fill_8CAYXZ` text)

### Fields

| Field | Label | Placeholder | Input type |
|---|---|---|---|
| Email | "Email" | "Email" (grey `fill_IURK11`) | Text, email format |
| Password | "Password" | "Password" (grey) | Password (masked), eye-toggle icon |
| Confirm Password | "Password" (second field) | "Password" (grey) | Password (masked), eye-toggle icon |
| Invite code | "Invite code" | "Invite code" (grey) | Text; `?` tooltip icon |

**Invite code tooltip text:** "Unique identifier provided by a service or platform to grant access to Vixichain Wallet"

**Password strength tooltip** (appears as inline dropdown under Password field when focused):
- At least 8 characters long
- At least one uppercase letter
- At least one lowercase letter (note: Figma copy reads "loweracese" — typo in design)
- At least one number
- At least one special character

Each rule shows a check-circle icon (`fill_O2BX7A` at 30% opacity = unchecked, full opacity = satisfied) plus hint text in `Desk/Text/Hint` / `fill_8CAYXZ`.

### Actions

| Element | Label | Behavior |
|---|---|---|
| Primary button | "Continue" | Disabled (30% opacity) until all fields valid; active state → POST registration → Step 2 |
| "Already have an account?" | Static text | n/a |
| "Log in" link | `fill_O2BX7A` | Navigates to Log in screen |
| Tab: "Organization account" | Toggle | Switches to Screen B (org form) |

### States

1. **All empty (default):** All fields placeholder grey, cursor on Email, "Continue" 30% opacity
2. **Email focused/filled:** Email field blue border (`fill_O2BX7A`), cursor blink `Rectangle 55`; email value `alex.romanov@vixichain.org`; Continue disabled
3. **Password filled (masked):** Password field shows `••••••••` (16 bullets), eye icon visible
4. **Password visible (eye toggled):** Shows `UnVnFyQd9WzzLuV` in plain text
5. **Invite code focused:** Invite code field has blue border, cursor visible
6. **Validation error:** Email field red border (`fill_V95JQY`), inline error text "This field is required" in `Desk/Text/Hint` / `fill_V95JQY`
7. **All fields valid:** "Continue" button full opacity (active)

### Navigation
- Continue → Screen C (Personal) or Screen D (Organization) based on active tab
- Back button (top-left, `componentId: 5:36807`) → previous screen / landing

### Copy
```
Title: Create account
Tab 1: Personal account
Tab 2: Organization account
Fields: Email / Password / Password / Invite code
Button: Continue
Footer: Already have an account? [Log in]
```

### Design Notes
- Form background uses two-tone layout: full-bleed gradient/image behind a `borderRadius: 24px` card
- The tab toggle is a segmented control inside the form, not a page-level nav
- The "Invite codes" section is called out with a canvas annotation badge label (canvas use only, not rendered in-app)
- Error color token `fill_V95JQY` appears on both the field border stroke and inline error text

---

## 4. Screen B — Create Account (Step 1, Organization tab)

### Purpose
Same as Screen A but with Organization account tab selected. The credential fields (Email, Password, Confirm Password, Invite code) are identical; only the tab highlight and button label for Step 2 differ.

### Layout
Identical to Screen A. Tab "Organization account" highlighted (`fill_LZML0R`), "Personal account" dimmed (`fill_7D3HZH`).

### Fields
Identical to Screen A (Email, Password, Password confirmation, Invite code).

### Actions

| Element | Label | Behavior |
|---|---|---|
| Primary button | "Continue" | Disabled; active when valid → Step 2 org form |
| Tab: "Personal account" | Toggle | Switches back to Screen A |

### Navigation
- Continue → Screen D (Fill organization details)

### Copy
Same as Screen A except tab selection state.

---

## 5. Screen C — Create Personal Account (Step 2)

### Purpose
Collects personal identity details after credentials are set. Required for KYC pre-fill and wallet creation.

### Entry Point
Screen A Continue (Personal tab active)

### Layout
Same card layout. Title changes to "Create account" (sub-form heading "Create account" retained; button becomes "Create personal account"). Back button top-left.

### Fields

| Field | Label | Placeholder / Example | Notes |
|---|---|---|---|
| First name | "First name" | Placeholder "First name" / Filled "Alex" | Required |
| Last name | "Last name" | Placeholder "Last name" / Filled "Romanov" | Required |
| Country | "Country" with `?` tooltip icon | Placeholder "Country" / Filled "Israel" (flag + text + cursor) | Dropdown; tooltip: "Add your country of residence that you can confirm by providing document" |
| Phone Code | (no label, part of Phone row) | Placeholder "Code" / Filled "972" | Small width input left of phone number |
| Phone number | "Phone" (row label) | Placeholder "Phone" / Filled "581234567" | Larger input to right of code |

**Phone row structure:** Label "Phone" above; two-column horizontal group: [Code input (small)] [Phone number input (wide)]

### Country Field Behavior
- Tappable → opens dropdown overlay (see Section 27)
- Typeahead search: user types into field, dropdown filters in real-time
  - "I" → shows: Iceland, India, Indonesia, Iran, Iraq, Ireland, Israel, Italy, Australia (unfiltered tail)
  - "Is" → shows: Israel, Iceland, ... (filtered)
  - "Israel" selected → field shows Israeli flag circle + "Israel" text + active border (`fill_O2BX7A`)
- Arrow icon (`componentId: 5:23669`) visible on right of field; cursor blink on typing state

### Actions

| Element | Label | Behavior |
|---|---|---|
| Primary button | "Create personal account" | Disabled until all fields valid; active → submit profile → Screen E |
| Back button | Icon | Returns to Screen A |
| "Already have an account? Log in" | Footer | Navigates to Log in |

### States
1. **All empty:** All placeholders grey, button 30% opacity disabled
2. **First name filled ("Alex"):** First name has blue border, cursor; Last name empty
3. **Last name focused:** Last name blue border, cursor; First name retains filled value
4. **Country typing ("I"):** Country field blue border, cursor after "I"; dropdown open with filtered list
5. **Country typing ("Is"):** Field shows "Is" + cursor; dropdown filtered to Israel-starting entries
6. **Country selected ("Israel"):** Flag icon (round) + "Israel" text in field, blue border; arrow icon visible
7. **Phone code filled ("972"):** Code field filled, border `fill_XI86TK` (not focused); Phone field `fill_IURK11` placeholder or filled "581234567"
8. **All filled + active cursor on phone number:** Blue border on phone number field, cursor blink; button active

### Navigation
- "Create personal account" → Screen E (Verify your email)

### Copy
```
Title: Create account
Fields: First name / Last name / Country / Phone
Button: Create personal account
Footer: Already have an account? [Log in]
Country tooltip: Add your country of residence that you can confirm by providing document
```

---

## 6. Screen D — Fill Organization Details (Step 2)

### Purpose
Collects organization-specific details for business accounts.

### Entry Point
Screen B Continue (Organization tab active)

### Layout
Same card layout as Screen C. Title "Fill organization details". Back button top-left.

### Fields

| Field | Label | Example Value |
|---|---|---|
| Organization name | "Organization name" | "Quantum Solutions" |
| Registration number | "Registration number" | "011586790" |
| Country | "Country" | Dropdown (same behavior as Screen C); filled "Israel" |

Note: Phone field is also visible in some state variants (shown with placeholder "Phone" in `fill_IURK11`). This may be an optional field or part of an extended org form.

### Actions

| Element | Label | Behavior |
|---|---|---|
| Primary button | "Create organization account" | Disabled until all valid; active → submit → Screen E |
| Back button | Icon | Returns to Screen B |
| "Already have an account? Log in" | Footer | Navigates to Log in |

### States
1. **Empty:** All placeholders, button disabled 30%
2. **Org name filled ("Quantum Solutions"):** Blue border on org name, cursor
3. **Reg number filled ("011586790"):** Reg number filled
4. **Country typing ("I" → "Is"):** Country field typeahead active
5. **Country selected ("Israel"):** Flag + text + active border
6. **All filled:** Button full opacity active

### Navigation
- "Create organization account" → Screen E (Verify your email)

### Copy
```
Title: Fill organization details
Fields: Organization name / Registration number / Country
Button: Create organization account
Footer: Already have an account? [Log in]
```

---

## 7. Screen E — Verify Your Email

### Purpose
Post-registration confirmation step. Instructs user to click the magic link sent to their email. No password is used — magic link is the primary authentication method.

### Entry Point
Screen C or Screen D submit → email sent by system

### Layout
Same card layout. Logo at top. Body text + check-email illustration + resend controls. Two separate "Bottom text" sections stacked vertically.

### Content

**Title:** "Verify your email"  
**Body:** "We just sent you a magic link to **alex.romanov@vixichain.org**\nPlease click the link to confirm your address."

- Email address rendered in bold (`boldWeight: 700`)
- Illustration: `check email` component (`componentId: 5:36251`) — envelope graphic with abstract shapes

**Bottom text block 1:**  
- "Don't see an email? Please check the spam folder."

**Bottom text block 2:**  
- "Still didn't see it? [Resend in 00:59]" — resend link with countdown timer
- "Wrong email? [Try again]"

### States

1. **Default (resend cooling down):** "Resend in 00:59" text at `opacity: 0.30` (disabled, not tappable). Countdown timer format `00:59`.
2. **Resend available:** "Resend" text full opacity, tappable — triggers new magic link send → toast appears.

### Toast Notification (overlaid on screen)
- Frame `layout_U93TVP`, `borderRadius: 16px`, border `fill_AAJ5SZ`, drop shadow `effect_UIBNQI`
- Content: `check-circle` SVG icon + "Magic link sent to your email" text (`Desk/Text/Secondary`)
- Default state: `opacity: 0` (hidden); becomes visible on resend trigger
- No dismiss button visible in design

### Navigation
- User clicks magic link in email → Screen F (Email verified success) or Screen G (failure)
- "Try again" → returns to Screen A / credential step to re-enter email

### Copy
```
Title: Verify your email
Body: We just sent you a magic link to [email]
      Please click the link to confirm your address.
Footer 1: Don't see an email? Please check the spam folder.
Footer 2: Still didn't see it? [Resend in 00:59]
Footer 3: Wrong email? [Try again]
Toast: Magic link sent to your email
```

---

## 8. Screen F — Email Verified Success

### Purpose
Shown after user clicks magic link in email and verification succeeds.

### Entry Point
Magic link click → server validates → redirects to this screen

### Layout
Same card layout. Check-email illustration. Text + "Continue" button.

### Content

**Title:** "Your email verified!"  
**Body:** "Thank you for confirming your email address. \nYou're almost there!"

**Button:** "Continue" (primary, full opacity, `componentId: 5:18078`)

### Navigation
- Continue → Screen H (Loading skeleton) → Screen I (Verify your identity / KYC intro)

### Copy
```
Title: Your email verified!
Body: Thank you for confirming your email address.
      You're almost there!
Button: Continue
```

---

## 9. Screen G — Email Verification Failed

### Purpose
Shown when magic link verification fails (expired, already used, or tampered).

### Entry Point
Magic link click → server returns error

### Layout
Same card layout. Check-email illustration. Text + "Check again" button.

### Content

**Title:** "Oops! Email verification unsuccessful"  
**Body:** "It looks like we couldn't verify your email. Please try again to ensure you can access all the features."

**Button:** "Check again" (primary, full opacity, `componentId: 5:18078`)

### Navigation
- "Check again" → triggers re-verification attempt or returns to Screen E

### Copy
```
Title: Oops! Email verification unsuccessful
Body: It looks like we couldn't verify your email.
      Please try again to ensure you can access all the features.
Button: Check again
```

---

## 10. Screen H — Loading Skeleton

### Purpose
Intermediate loading state between email verification and the KYC intro or dashboard. Shown while server-side state resolves.

### Layout
Three stacked rounded rectangles (`borderRadius: 20px`, fill `fill_LZML0R`) at varying widths — simulates text/content loading.  
Check-email illustration visible in background.  
No text, no buttons.

### Design Notes
- Skeleton rectangles use `fill_LZML0R` (light grey token, same as active tab background)
- Three rectangles at different widths create a multi-line skeleton effect

---

## 11. Screen I — Verify Your Identity (KYC Intro)

### Purpose
Intro screen before launching the Sumsub identity verification widget. Explains what is required and expected time.

### Entry Point
Screen F Continue → (loading) → this screen

### Layout
Same card layout. Check-email illustration. Two buttons side-by-side at bottom.

### Content

**Title:** "Verify your identity"  
**Body:** "Now, before creating a wallet, we need to know you a bit more to ensure the security of your account. This helps us protect your identity and maintain a safe platform."

**Hint text (secondary):** "Please be prepared to submit documents to verify your identity.\nIt should only take around 5 minutes."

**Buttons (horizontal pair):**
- "Take a tour" — outline button (`componentId: 5:18092`, stroke `fill_O2BX7A`, text `fill_O2BX7A`)
- "Get started" — primary filled button (`componentId: 5:18078`)

### Navigation
- "Get started" → Screen J (Sumsub widget)
- "Take a tour" → product tour / onboarding walkthrough (target screens not defined in this page)

### Copy
```
Title: Verify your identity
Body: Now, before creating a wallet, we need to know you a bit more to ensure
      the security of your account. This helps us protect your identity and
      maintain a safe platform.
Hint: Please be prepared to submit documents to verify your identity.
      It should only take around 5 minutes.
Button 1: Take a tour (outline)
Button 2: Get started (primary)
```

---

## 12. Screen J — Sumsub KYC Widget

### Purpose
Third-party KYC verification widget embedding. Sumsub SDK renders inside the app at this point.

### Implementation Note (from Figma developer annotation)
This is a placeholder for the Sumsub iframe/widget. Three possible exit states:
1. **KYC submitted → Under Review** → Screen K
2. **KYC requires more info** → Screen L
3. **KYC failed/rejected** → Screen M

No visual design for the Sumsub widget itself is defined in this file — it is rendered entirely by the Sumsub SDK.

---

## 13. Screen K — KYC Under Review

### Purpose
Shown when KYC documents have been submitted and are awaiting review by compliance team or automated system.

### Entry Point
Sumsub widget submission → KYC status = "under_review" | User logs back in while KYC pending

### Layout
Same card layout. Illustration component. Two buttons stacked.

### Content

**Title:** "Your identity documents are being reviewed"  
(No body text visible in this screen — title is self-explanatory)

**Buttons:**
- "Take a tour" — outline button
- (Possibly secondary action — exact second button label not captured; from context "Take a tour" is present)

### States
Two identical frames exist in the canvas (frame duplicates), confirming this screen appears in two places in the flow (e.g., fresh submission + re-login check).

### Email trigger
Triggers email template #2 (KYC Under Review email).

### Copy
```
Title: Your identity documents are being reviewed
Button: Take a tour (outline)
```

---

## 14. Screen L — KYC Additional Information Needed

### Purpose
Shown when Sumsub flags the submission as requiring additional documents or clarification.

### Entry Point
Sumsub webhook → status = "additional_info_required"

### Content
**Title:** "Additional Information Needed" (inferred from email template and canvas label)

**Buttons:**
- "Continue KYC" — primary, links back to Sumsub widget
- "Contact support" — outline or secondary button; links to support@vixichain.org or support form

### Email trigger
Triggers email template #4 (Additional Information Needed for KYC email).

### Copy
```
Title: Additional Information Needed
Button 1: Continue KYC (primary)
Button 2: Contact support (secondary)
```

---

## 15. Screen M — KYC Rejected

### Purpose
Shown when KYC documents are definitively rejected by compliance.

### Entry Point
Sumsub webhook → status = "rejected"

### Content
**Title:** "Your identity documents rejected"

**Button:** "Log out" — primary button; no re-submission path offered from this screen.

### Email trigger
Triggers email template #5 (KYC Rejected email). Support contact: `info@vixichain.org`.

### Copy
```
Title: Your identity documents rejected
Button: Log out (primary)
```

---

## 16. Screen N — KYC Expired

### Purpose
Shown when a KYC session or verification window has timed out and the user must restart.

### Entry Point
KYC session timeout or webhook status = "expired"

### Content
**Title:** "Your verification time has expired"

**Button:** "Get started" — primary button; relaunches Sumsub widget.

### Navigation
- "Get started" → Screen J (Sumsub widget restart)

### Copy
```
Title: Your verification time has expired
Button: Get started (primary)
```

---

## 17. Screen O — Dashboard (Empty State / KYC Complete)

### Purpose
Main wallet dashboard shown after KYC is approved. Empty state is shown when user has no transaction history.

### Entry Point
KYC approved → redirect to dashboard | Direct navigation after login (KYC already complete)

### Layout
Full dashboard UI with:
- Left sidebar navigation
- Main content area with balance and asset cards

### Content

**Balance display:** $0.00 (empty state)

**Asset cards:**
- nUSD (Vixichain stablecoin pegged to USD)
- VIXC (Vixichain native token)

**Primary tab:** "Receive" tab active, showing QR code for wallet address

**Empty state message:** "Your transaction list is empty"

**Welcome modal overlay:** "Welcome to Vixichain Wallet" / "Start exploring"

**Sidebar navigation** (left rail): Standard wallet navigation items (specific labels captured from canvas annotations but not detailed in this page's frames)

### Email trigger
Triggers email template #6 (KYC Complete: "Your KYC Process Is Complete" / "Go to your Wallet" CTA).

---

## 18. Screen P — Log In

### Purpose
Returning user authentication screen. Supports email + password login.

### Entry Point
- "Already have an account? Log in" link from Create account screens
- "Back to Log in" from password reset success

### Layout
Same card layout as Create account. Logo. Title "Log in". Two input fields. "Forgot password?" link. Button. Footer.

### Fields

| Field | Label | Placeholder / Example | Notes |
|---|---|---|---|
| Email | "Email" | Placeholder "Email" / Filled `alex.romanov@vixichain.org` | Required |
| Password | "Password" | Placeholder "Password" / Masked `••••••••••••••••` / Visible `UnVnFyQd9WzzLuV` | Required; eye-toggle icon |

### Actions

| Element | Label | Behavior |
|---|---|---|
| "Forgot password?" | Link text `fill_O2BX7A` | Navigates to Screen Q |
| Primary button | "Log in" | Disabled (30%) until both fields filled; active → authenticate |
| "Don't have an account?" | Static text | n/a |
| "Sign up" | Link `fill_O2BX7A` | Navigates to Screen A |

### States

1. **Empty / default:** Both fields placeholder grey, cursor on Email, button 30% disabled
2. **Email filled, focused:** Email blue border `fill_O2BX7A`, cursor; value `alex.romanov@vixichain.org`; Password still placeholder
3. **Email filled, password masked:** Email filled (border `fill_XI86TK` default), password `••••••••••••••••` with eye icon
4. **Password visible:** Password shows `UnVnFyQd9WzzLuV`, eye-off icon (`componentId: 5:35997`)
5. **Both filled, password cursor active:** Both filled, blue border on password field, cursor blinking, button full opacity active
6. **Auth error state:** Not explicitly designed in this file (network error toast would appear — see Section 26)

### Navigation
- "Log in" (active) → authenticate → dashboard or KYC screen depending on account state
- "Forgot password?" → Screen Q

### Copy
```
Title: Log in
Fields: Email / Password
Link: Forgot password?
Button: Log in
Footer: Don't have an account? [Sign up]
```

---

## 19. Screen Q — Forgot Password (Enter Email)

### Purpose
Allows user to trigger a password reset magic link via email.

### Entry Point
"Forgot password?" link from Screen P

### Layout
Same card layout. Back button top-left. No password field.

### Fields

| Field | Label | Example Value |
|---|---|---|
| Email | "Email" | `alex.romanov@vixichain.org` |

### Actions

| Element | Label | Behavior |
|---|---|---|
| Back button | Icon (`componentId: 5:36807`) | Returns to Screen P |
| Primary button | "Continue" | Disabled when empty; active when email filled → sends reset email → Screen R |

### States
1. Empty: Email placeholder, button 30% disabled
2. Email filled: Blue border, cursor, button active

### Navigation
- Continue → Screen R (Check your email)

### Copy
```
Title: (inferred) Forgot password / Reset password
Fields: Email
Button: Continue
```

---

## 20. Screen R — Check Your Email (Password Reset)

### Purpose
Confirmation screen after password reset link is sent. Identical UX pattern to Screen E (Verify your email) but with different copy.

### Entry Point
Screen Q Continue → reset email dispatched

### Layout
Same card layout. Check-email illustration.

### Content

**Title:** "Check your email"  
**Body:** "We just sent you a magic link to **alex.romanov@vixichain.org**\nPlease click the link to reset your password."

**Bottom text block:**
- "Don't see an email? Please check the spam folder."
- "Still didn't see it? [Resend in 00:59]" or "Still didn't see it? [Resend]" (active state)

### States
1. **Resend cooling down:** "Resend in 00:59" at 30% opacity
2. **Resend available:** "Resend" at full opacity; click → sends new link → "Magic link sent to your email" toast (opacity 0 by default, shown on trigger)

### Navigation
- Magic link click → Screen S (Create new password)

### Copy
```
Title: Check your email
Body: We just sent you a magic link to [email]
      Please click the link to reset your password.
Footer 1: Don't see an email? Please check the spam folder.
Footer 2: Still didn't see it? [Resend in 00:59]
Toast: Magic link sent to your email
```

---

## 21. Screen S — Create New Password

### Purpose
Allows user to set a new password after clicking the reset magic link.

### Entry Point
Password reset magic link click → server validates → this screen

### Layout
Same card layout. Fields for new password + confirm, with password strength tooltip.

### Fields

| Field | Label | Placeholder | Notes |
|---|---|---|---|
| New password | "Password" | "Password" | Eye-toggle; strength hints dropdown below |
| Confirm password | "Password confirmation" | "Password confirmation" | Mask only; no eye toggle |

**Password strength dropdown** (same rules as Screen A):
- At least 8 characters long
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

### Actions

| Element | Label | Behavior |
|---|---|---|
| Primary button | "Continue" | Disabled until passwords match and meet strength requirements |

### Navigation
- Continue → Screen T (Success)

---

## 22. Screen T — Password Reset Success

### Purpose
Confirms password has been successfully changed.

### Entry Point
Screen S Continue → password updated in DB

### Layout
Same card layout. Check-email illustration (reused). Outline "Back to Log in" button + title/body.

### Content

**Title:** "Success!"  
**Body:** "Your password has been updated and is secure. \nYou now can log in again."

**Button:** "Back to Log in" (outline style, `componentId: 5:18092`, text `fill_O2BX7A`)

### Navigation
- "Back to Log in" → Screen P (Log in)

### Copy
```
Title: Success!
Body: Your password has been updated and is secure.
      You now can log in again.
Button: Back to Log in (outline)
```

---

## 23. Screen U — Geo-restriction / Invite to Risely

### Purpose
Shown to users in unsupported / blacklisted countries. Captures email for waitlist and references the "Risely" brand (appears to be an alternate product name or waitlist landing).

### Entry Point
IP geolocation check on landing → blocked country detected

### Content

**Screen 1 — "Invite to Risely":**  
Body: "We're still not operating in your area..."

**Screen 2 — "Oops sorry!":**  
Check-email illustration visible. Body instructs user to check email.

### Design Notes
- "Risely" is used here instead of "Vixichain" / "Vixi" — this appears to be either:
  1. An earlier product name that was rebranded to Vixichain, or
  2. A separate waitlist/pre-launch app for restricted regions
- Two screens in this flow; full copy not fully captured in reads (canvas annotation level detail)

---

## 24. Email Templates

All emails share a consistent layout:
- **Banner:** Crypto coin imagery + Vixichain logo (positioned top-center)
- **Header:** Bold title (24px equivalent)
- **Body:** Regular text block
- **CTA Button:** Primary blue, `borderRadius: 12px`
- **Support block:** "Have questions? please use our support form [https://vixichain.org/contact-us/](https://vixichain.org/contact-us/) or send us an email directly to [support@vixichain.org](mailto:support@vixichain.org). Our Support Team will be happy to assist you and will reply shortly. Sincerely, The Vixichain Team"
- **Footer:** "Copyright © Vixichain. All rights reserved." + "Unsubscribe here" (link, `fill_O2BX7A`) + social icons row + App Store badge + Google Play badge + Vixichain logo

**Email sender:** `Vixichain <signin@auth.vixichain.com>`

---

### Email 1 — Welcome / Magic Link (Registration)

**Subject:** (implicit from email client mockup — welcome/verify email)  
**Sender:** `Vixichain <signin@auth.vixichain.com>`  
**Header:** (Welcome to Vixichain Wallet — derived from in-app email client frame label)

**Body:**
```
Hello Alex,

Please click the button below to verify your email address.
```

**CTA:** "Verify account"

**Support block:** Standard (links to vixichain.org/contact-us/ and support@vixichain.org)

---

### Email 2 — KYC Under Review

**Header:** (KYC Under Review)  
**Body:** Notification that documents are being reviewed  
**CTA:** "Check status"

---

### Email 3 — KYC Under Review (duplicate / re-notification)

Identical to Email 2. Second send for extended review periods.

---

### Email 4 — Additional Information Needed for KYC

**Header:** (Additional Information Needed)  
**Body:** Notification that more information is required  
**CTA:** "Continue KYC"

---

### Email 5 — KYC Rejected

**Header:** (KYC Rejected)  
**Body:** Notification that documents were rejected  
**No CTA button**  
**Support contact:** `info@vixichain.org` (different from standard support@)

---

### Email 6 — KYC Complete

**Header:** "Your KYC Process Is Complete"  
**Body:** Confirmation of successful verification  
**CTA:** "Go to your Wallet"

---

### Email 7 — Password Reset

**Subject:** "Your password reset link is here."  
**Sender:** `Vixichain <signin@auth.vixichain.com>`  
**Header:** "Reset password"

**Body:**
```
Hello Alex,

Someone has requested to reset your password. Please click the button bellow
to reset your password. 
```
(Note: "bellow" is a typo in the design — should be "below")

**CTA:** "Reset password"

**Support block:** Standard

---

## 25. SMS / Push Notifications

**Sender name:** Vixichain Wallet (shown as "Vixichain Wallet: KYC" in notification preview)

5 notification frames in canvas — one per KYC state:
1. KYC submitted / under review
2. KYC additional info required
3. KYC rejected
4. KYC expired
5. KYC complete / approved

Exact message copy not captured (SMS frames are image-based mockups, not text nodes).

---

## 26. Toast Notifications

Two toast types are designed:

### Success Toast
- Frame: `borderRadius: 16px`, border `fill_AAJ5SZ 1px`, shadow `effect_UIBNQI`
- Icon: `check-circle` SVG (left)
- Text: "Magic link sent to your email" — `Desk/Text/Secondary`, `fill_BV73OW`
- Default: `opacity: 0` (invisible); shown on resend trigger
- No explicit dismiss; implied auto-dismiss

### Error Toast
- Frame: `borderRadius: 16px`, border `fill_AAJ5SZ 1px`, shadow `effect_UIBNQI`
- Icon: `alert-triangle` SVG (`fills: fill_7D3HZH`)
- Text: "Network error" — `Desk/Text/Secondary`, `fill_BV73OW`
- Appears on network failure during any form submission

---

## 27. Country Dropdown Component

**ComponentId:** `6:99274`  
**Component property:** `Scroll: bool` — enables scrollbar indicator when list is long  

### Structure
- Dropdown panel: `borderRadius: 8px`, border `fill_XI86TK 1px`, shadow `Drop Shadow/20`
- Scrollbar indicator: `Rectangle 53`, `fills: fill_O2BX7A`, `borderRadius: 2px`, visible only when `Scroll: true`
- List items: `componentId: 5:36568`, `borderRadius: 8px`
  - Flag icon: `icons / Country` SVG, `borderRadius: 60px` (circular crop)
  - Country name: `Desk/Text/Primary`, `fill_BV73OW`

### Countries visible in design
**First alphabetical group** (A dropdown open state): Afghanistan, Albania, Algeria, Andorra, Angola, Antigua and Barbuda, Argentina, Armenia, Australia

**Filtered "I" group** (typed "I"): Iceland, India, Indonesia, Iran, Iraq, Ireland, Israel, Italy, Australia (scroll tail)

**Filtered "Is" group** (typed "Is"): Israel, Iceland, [others alphabetically matching]

### Typeahead behavior
- User types directly into Country field
- Dropdown opens or updates filter in real time
- Cursor blink visible in field while typing
- Selecting a list item: field fills with flag icon + country name, border becomes `fill_O2BX7A` (active/selected), dropdown closes

### Phone code auto-fill
- Selecting Israel → Phone Code field auto-fills "972"
- Country code mapping implied (implemented in app logic, not in Figma)

---

## 28. Prototype Flow Map

### Canvas-level section labels (annotation badges, `fill_QCJD84`)
These are design-time organisational labels, not rendered in the product:
- **"Invite codes"** — groups the Create account credential screens
- **"Dashboard"** — groups dashboard frames
- **"Auth / Login"** — groups log in / password reset frames

### Prototype flows table of contents (id 6:131990)
An in-canvas reference frame lists 4 built prototype flows:
1. Authorization / Log in
2. Dashboard
3. Send assets
4. Receive assets

**Note:** Address book and transaction list flows are not present in the prototype flows table or in any screen frames on this Figma page. Those features are either on a different Figma page, in a different file, or not yet designed at the time of this export.

### Full onboarding flow (linear path)

```
[Landing / Marketing site]
        ↓
[A] Create account (Step 1)
    ├── Personal tab → [C] Create personal account (Step 2)
    └── Organization tab → [D] Fill organization details (Step 2)
        ↓
[E] Verify your email
    ├── Magic link click success → [F] Email verified!
    │       ↓ Continue
    │   [H] Loading skeleton
    │       ↓
    │   [I] Verify your identity (KYC intro)
    │       ↓ Get started
    │   [J] Sumsub KYC widget
    │       ├── Submitted → [K] KYC Under Review
    │       ├── More info → [L] Additional Info Needed
    │       ├── Rejected → [M] KYC Rejected
    │       └── Expired → [N] KYC Expired → [J] restart
    │
    └── Magic link fail → [G] Email verification unsuccessful

[K] KYC approved (async) → [O] Dashboard (empty state)

[U] Geo-restriction (parallel entry for blocked countries)
```

### Returning user flow

```
[P] Log in
    ├── Valid credentials → check KYC state → [O] Dashboard or KYC screen
    └── Forgot password? → [Q] Enter email
            ↓
        [R] Check your email (password reset)
            ↓ magic link click
        [S] Create new password
            ↓
        [T] Success!
            ↓ Back to Log in
        [P] Log in
```

---

## Appendix A — Figma Node IDs (Key Screens)

| Screen | Figma Node ID |
|---|---|
| Create account (Personal, empty) | `6:132003` (illustrative; many duplicates for each state) |
| Create account (Personal, "Invite codes" group label) | `6:132261` |
| Create personal account (step 2, empty) | `6:132030` area |
| Fill organization details (org name filled) | `6:131408` |
| Verify your email (resend cooldown) | `6:131701` |
| Your email verified! | `6:131647` |
| Oops! Email verification unsuccessful | `6:131659` |
| Loading skeleton | `6:131671` |
| Verify your identity (KYC intro) | `6:131686` |
| Check your email (password reset, cooldown) | `6:131747` |
| Success! (password reset) | `6:131768` |
| Log in (all states) | `6:131779`, `6:131798`, `6:131816`, `6:131834`, `6:131852` |
| Email template — reset password | `6:131919` |
| Error toast | `6:131920` |
| Prototype flows table of contents | `6:131990` |

---

## Appendix B — Text Copy Master List

### Field Labels
- Email
- Password
- Invite code
- First name
- Last name
- Country
- Phone
- Code (phone country code)
- Organization name
- Registration number
- Password confirmation
- Title (placeholder label in some variants)

### Button Labels
- Continue
- Create personal account
- Create organization account
- Create account
- Log in
- Sign up
- Verify account (email CTA)
- Get started
- Take a tour
- Continue KYC
- Contact support
- Check status
- Go to your Wallet
- Reset password (email CTA)
- Back to Log in
- Check again
- Resend / Resend in 00:59
- Try again
- Log out

### Error / Validation Messages
- "This field is required" (inline, `fill_V95JQY`, `Desk/Text/Hint`)

### Password Strength Rules
- At least 8 characters long
- At least one uppercase letter
- At least one lowercase letter (typo in design: "loweracese")
- At least one number
- At least one special character

### Placeholder Copy
- Email / Password / First name / Last name / Country / Code / Phone / Invite code / Password confirmation

### Support & Legal
- "Have questions? please use our support form https://vixichain.org/contact-us/ or send us an email directly to support@vixichain.org. Our Support Team will be happy to assist you and will reply shortly. Sincerely, The Vixichain Team"
- "Copyright © Vixichain. All rights reserved."
- "Unsubscribe here"

---

*Document generated from full sequential read of Figma export file `mcp-mcp-server-figma-get_figma_data-1781759105375.txt` (43,752 lines). All screen states, copy, component IDs, and design tokens extracted directly from the Figma node tree.*
