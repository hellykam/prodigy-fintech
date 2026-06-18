# Risely [my file] — Research & Ideation Page

**Source:** Figma "Risely [my file]" (`Qwbr3pXZJjh72Fx7kJOmqP`), `Research & Ideation` page
**Purpose:** UX critique of the existing Antier/Dev builds, KYC flow analysis, and notification system planning.

---

## 1. Page Structure

| Section | Node | Fill | Border | Contents |
|---|---|---|---|---|
| User journey map | `#8:143607` | `#FFFFFF` | `#F24822` red 2px | Image of UX journey map |
| Before KYC | `#8:143865` | `#F4F4F4` | `#B3B3B3` gray 2px | Screenshots + critique of pre-KYC onboarding |
| "KYC": Personal Account | `#8:143908` | `#F4F4F4` | `#B3B3B3` gray 2px | KYC form critique (Phone → Account type → Personal info → Sumsub) |
| Notifications - to be | `#8:144125` | `#EFE3FF` | `#9747FF` purple 2px | Notification taxonomy + mandatory notification spec |

---

## 2. User Journey Map (`#8:143607`)

A screenshot of a user journey map (973×431px image). Shows the overall user flow from onboarding through key app milestones. Status widget attached (Figma Widget — "Status Dropdown"). The section fill is `#FDE4DE` (light salmon), border `#F24822` (red).

---

## 3. Before KYC Analysis (`#8:143865`)

### What This Section Is

Screenshots of the actual pre-KYC onboarding flow (as built by Antier / deployed) arranged horizontally (216.75×480px per screenshot). Designer annotations appear below each screenshot group identifying UX issues.

### Screen Count

7 screenshots across the pre-KYC flow:
- x:26, x:304, x:562, x:800, x:1283, x:1550 + additional row

### Issues Found

| Screenshot position | Issue identified |
|---|---|
| x:26 (first screen) | **"No onboarding before to understand what is this app for"** — user arrives at the app with no context about what Risely does |
| x:562 (MPIN/PIN screen) | **"PIN is pointless on this stage / nothing to hide yet / What is 'MPIN'? Why 'M?'"** — asking for a PIN before the user has any assets is premature. The name "MPIN" is confusing |
| x:1058 | **"Long wait"** — KYC waiting time is too long with nothing for the user to do |
| x:1058 | **"Not asked about: email / phone for OTP / face/finger"** — missing auth factor setup during onboarding |
| x:1283 | **"Scroll / Login is not needed here"** — login screen shown unnecessarily in this flow step |

### Flagged as "Unnecessary Feature" (pink `#FFC7C2` stickers)

- At x:562 — scroll + MPIN screen
- At x:1283 — scroll + login screen

### Recommended Redesign (x:1550)

From the "From here should be:" annotation block:

```
From here should be:
  - onboarding
  - light version
  - description how KYC is important / what it is
  - KYC → while waiting:
      - make onboarding
      - add cards
      - add accounts
      - prepare wallets
```

**Implication for widget/product:** The pre-KYC state should not be a dead-end. During KYC processing, the user should be guided through lightweight onboarding tasks.

---

## 4. KYC Flow UX Critique (`#8:143908`)

### Overview

Full KYC personal account flow reviewed screen by screen across 4 sub-flows:

| Sub-flow | Label | Screens |
|---|---|---|
| Phone | `Phone` | 2 screens (x:64, x:320) |
| Account type | `Account type` | 5 screens + 1 wide composite |
| Personal info | `Personal info` | 7+ screens |
| Sumsub integration | `Sumsumb` | 9+ screens |

### Global Issue (header annotation)

> "Not clear how many steps, next/prev, how to fix an error, no confidence if data is saved, huge problem with patterns"

Applies to the entire KYC form flow. Critical usability failures:
1. No step indicator (user doesn't know how many steps remain)
2. No previous-step navigation
3. No clear error recovery path
4. No indication if data is auto-saved
5. Inconsistent UI patterns across screens

### Phone Sub-flow Issues

| Annotation | Issue |
|---|---|
| "Why India / Difference loc/country? / Why popup" | Country defaulted to India (wrong for EU users), inconsistent country detection, unexpected popup behavior |

### Account Type Sub-flow Issues

| Annotation | Issue |
|---|---|
| "Scroll problem" | Scroll behavior broken in account type selection |
| "Sign?" | Missing or unclear signature/consent step |
| "Select is ok, other selects are not ok and scroll" | Native `<select>` works but custom dropdowns are broken + scroll issue |
| "Unnecessary feature" (pink sticker at x:1323) | A feature in this step is unnecessary at this stage |
| "Toaster is not necessary, text label is enough" | Toaster notification overengineered — static text label suffices |

**User profile node** (blue `#0D99FF` box at x:1305): "User profile" decision point — branches to Personal or Business KYC paths.

### Personal Info Sub-flow Issues

| Annotation | Issue |
|---|---|
| "Name of sender" | Sender name display issue |
| "OTP can be pasted by system / no need to copy it" | OTP should use iOS/Android system paste — no manual copy needed |
| "Pasting didn't work" | System paste is broken |

### Sumsub Integration Issues

| Annotation | Issue |
|---|---|
| "Hyper logo banner" | Sumsub SDK shows its own logo/branding in a distracting banner |
| "Duplicated request / It's not possible to transfer user's data to Sumsub?" | User fills personal info in Risely form AND again in Sumsub SDK — data should be pre-populated |
| "Select" | Sumsub's date select widget has issues |
| "Wheel data input is not the best solution" | Wheel/scroll date picker is bad UX (Sumsub default) |
| "Keyboard opened but scroll didn't work" | Keyboard opens but body scroll is broken |

### KYC Drop-off / Incomplete Flow

Sub-section: **"KYC: Left unfinished"** (`#8:144024`, fill `#FFF7F6`, border `#FFC7C2`)

If a user abandons the KYC flow mid-way:

```
From where do I proceed?
How many steps left?
Which step I couldn't fill?
```

Annotation "If dropped/cancelled" — the app must show the user's position in the KYC flow and allow resumption.

### Notification Decision Points

Two purple boxes at the KYC completion branch:
- **"Notification KYC: Y"** (`#9747FF`) — notification sent on KYC accepted
- **"NotificationKYC: N"** (`#9747FF`) — notification sent on KYC rejected

**"Possible further actions (what user should/can do?)"** (pink box `#FFC7C2`) — post-KYC state (accepted or rejected) must explain what the user can do next.

### Critical Issue

"Critical" red label (`#F24822`) at x:355 — marks the most severe issue in the KYC check-status flow.

### Note

Large annotation: **"NOT FINISHED FLOW HERE"** — the post-rejection/acceptance flow branching is incomplete in this research document. Follow-up needed.

**Related screens sub-section** (`#8:144044`) shows 2 app screenshots of the in-app KYC status checking screens.

---

## 5. Notifications — To Be (`#8:144125`)

### Notification Tech Types Taxonomy

```
Tech Types:
  - SMS
  - Email
  - in-App:
      - Popup:
          - Blocking
          - Closable
          - Auto-closable
              - check icon anim.
      - Toaster:
          - in ui
          - covering
      - Tooltip:
          - shown by default
          - shown by click
      - Hint near:
          - UI element (button, input, dropdown)
```

### Mandatory Notifications — Complete List

From annotation `#8:144127`:

```
Mandatory Notifications:
  1. Fill in KYC
      1. accepted
      2. rejected
  2. Account opened
      1. first - auto
      2. next one
  3. Transfer IN
      1. sharing
      2. receiving money
          1. accepted
          2. rejected
      - stuck
          1. tracking
  4. Transfer OUT
      1. sent
      2. on other side:
          1. accepted
          2. rejected
          3. stuck
  5. Transfer BETWEEN
      1. exchanged
```

**Note:** A "Scope Todo" widget (`#8:144128`) is attached — indicating this list was under active review at time of design freeze.

---

## 6. Key Takeaways for Widget / Product Implementation

| Finding | Implication |
|---|---|
| Pre-KYC = dead end in current build | Widget should show onboarding/prep tasks during KYC wait |
| MPIN asked too early | Delay MPIN setup to post-KYC or first transaction |
| No step indicator in KYC form | Show `current step / total steps` throughout KYC |
| Sumsub data duplication | Pre-populate Sumsub SDK with data already collected |
| OTP paste broken | Must support system OTP autofill (iOS/Android) |
| KYC resumption unclear | App must show KYC progress on re-entry |
| 5 mandatory notification types | All 5 must be implemented (KYC, account, transfer in/out/between) |
| Notification subtypes | In-app: blocking popup / closable popup / auto-close / toaster / tooltip / hint |
