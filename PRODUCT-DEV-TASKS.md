# Prodigy — Product Developer Task List
_All pending work, ordered by priority. Updated 2026-06-18._
_Source of truth for spec details: `TASKS.md`, `LANDING-TASKS.md`_

---

## How to read this list

**Priority levels:**
- 🔴 CRITICAL — blocks the demo or breaks existing functionality
- 🟡 IMPORTANT — demo gap; investor will notice it missing
- 🟢 NICE — polishes the experience; do after 🔴 and 🟡

**Status:** TODO unless marked PARTIAL or DONE in the source task.

---

## BLOCK 0 — Emergency Fixes (why apps don't open at all)

These are root cause bugs. Do these before anything else — other tasks can't be verified until these are done.

### 🔴 FIX-001 — Delete all `.vue.js` artifact files
**All apps** | **30 min**
Every app has Vite compilation cache files checked into source. Each contains a `debugger;` statement that **pauses all code execution** in browser devtools. This is why pages appear to freeze or not open.
```bash
find apps -name "*.vue.js" -delete
# Then add to .gitignore: apps/**/*.vue.js
```
**31 files confirmed** — in admin (13), consumer (7+), partner (5+).
**Spec:** `TASKS.md` § FIX-001

---

### 🔴 FIX-002 — Partner Portal: Add Vite proxy to backend
**Partner** `localhost:5006` | **15 min**
`apps/partner/vite.config.ts` has **no proxy**. Every API call hits the Vite dev server and gets 404. This is why the **entire partner portal fails** — login, commissions, transactions, end users, all of it.

Add to partner `vite.config.ts`:
```ts
proxy: {
  '/api': 'http://localhost:3000',
  '/ws': { target: 'ws://localhost:3000', ws: true },
}
```
**Spec:** `TASKS.md` § FIX-002

---

### 🔴 FIX-003 — Partner: Remove hardcoded mock data from CommissionsView
**Partner** | **1h**
`CommissionsView.vue` has a `mockCommissions` array that overrides real API data. Remove it. Scope all queries to `authStore.user.attributedToB2BClientId`.
**Spec:** `TASKS.md` § FIX-003

---

### 🔴 FIX-004 — Admin: Add `/api/kyc/levels` + `/api/kyc/country-risk` backend routes
**Backend + Admin** | **2h**
`SettingsKycConfigView.vue` calls these routes which don't exist → page crashes/blank.
Add in-memory static data for 3 KYC levels + 13 countries with risk levels.
**Spec:** `TASKS.md` § FIX-004

---

### 🔴 FIX-005 — Admin Dashboard: Fix fail-only statuses + empty stat cards
**Admin** `localhost:5002/` | **2–3h**
Dashboard shows only `failed` status transactions. Seeded transactions likely all have `failed` status. Fix seed data + check API response shape mismatches.
**Spec:** `TASKS.md` § FIX-005

---

### 🔴 FIX-006 — Admin: Fix all pages that show empty/error
**Admin** | **4–6h** (depends on FIX-001 + FIX-004)
After deleting .vue.js artifacts, audit every admin page. For each blank/error page: check Network tab, fix either the missing backend route or the response shape mismatch.
Pages: `/rewards`, `/liquidity`, `/settings/fees`, `/settings/limits`, `/settings/kyc-config`, `/commissions`, `/widget-configs`, `/b2b-clients`
**Spec:** `TASKS.md` § FIX-006

---

### 🔴 FIX-007 — Partner: Fix all remaining pages
**Partner** | **3–4h** (depends on FIX-002 + FIX-003)
After proxy fix: audit and fix `/dashboard`, `/transactions`, `/commissions`, `/end-users`, `/widget-config`. Scope all data to logged-in partner's `b2bClientId`.
**Spec:** `TASKS.md` § FIX-007

---

### 🟡 FIX-008 — Port 5555: Build Custom Data Explorer App
**New App** `localhost:5555` | **8–10h**
Replace Prisma Studio at port 5555 with a beautiful branded data explorer. Dark navy theme, 6 sections (Users, Transactions, Ledger, KYC, B2B Clients, System Events), live WS updates, row expand, CSV export, Approve/Reject actions on KYC rows.
**Spec:** `TASKS.md` § FIX-008

---

## BLOCK 1 — Fix Broken Core (do first, nothing else works without these)

### 🔴 SF-001 — Sell flow: auth tokens + broken API calls
**App:** Consumer `localhost:5001/sell`
**Time estimate:** 2–4h
**What's broken:**
- `apiFetch()` in `useApi.ts` sends no `Authorization` header → all API calls that require auth fail silently
- `SellView.vue.js` artifact has a `debugger;` statement that pauses execution in devtools
- Holdings list is empty because `/api/users/:id` fails with 401

**What to do:**
1. Read `apps/consumer/src/stores/auth.ts` — find how the token is stored
2. Add auth header to `apiFetch()` in `apps/consumer/src/composables/useApi.ts`
3. Delete `apps/consumer/src/views/SellView.vue.js` and any other `*.vue.js` artifacts
4. Test: login as alice@demo.com → go to /sell → holdings should show BTC 0.3 + ETH 1.2
5. Full sell flow: select BTC → enter amount → quote appears → Confirm → transaction completes

**Spec:** `TASKS.md` § SF-001

---

### 🔴 T-005 (PARTIAL) — Send flow step 4 still "Coming Soon"
**App:** Consumer `localhost:5001/send`
**Time estimate:** 2–3h
**File:** `apps/consumer/src/views/SendView.vue` line 325

Step 4 in the Send flow is a placeholder. Same fix as the sell flow — POST to `/api/transactions`, show result, link to transaction detail.

**Spec:** `TASKS.md` § T-014a

---

## BLOCK 2 — Missing Pages (admin + consumer + partner)

### 🔴 T-012a — Admin Settings: Staff Users page
**App:** Admin `localhost:5002/settings/users`
**Time estimate:** 4–6h
SettingsView is "coming soon". Replace with:
- Staff users table (email, role, status, last login)
- Add User → SidePanel form
- Row click → SidePanel edit + Delete with confirm
**Spec:** `TASKS.md` § T-012a

---

### 🔴 T-012b — Admin Settings: Fees page
**App:** Admin `localhost:5002/settings/fees`
**Time estimate:** 5–7h
- FilterTabs: fiat-send | crypto-send | swap
- Fee table per type
- Row edit via SidePanel
- Daily Limits card
- Depends on T-011 (backend fees endpoints)
**Spec:** `TASKS.md` § T-012b

---

### 🟡 T-012c — Admin Rewards page
**App:** Admin `localhost:5002/rewards`
**Time estimate:** 3–4h
- Table: user, referral count, reward balance, status
- CSV export
- Depends on T-011 (backend `/api/rewards`)
**Spec:** `TASKS.md` § T-012c

---

### 🟡 T-012d — Admin Liquidity page
**App:** Admin `localhost:5002/liquidity`
**Time estimate:** 4–5h
- Provider cards: Bank Simulator + Market Simulator with balances
- Simulation buttons: Low Balance, Offline, Recovery, High Volume, Reset
- Cards update in real time via WS
- Depends on T-011 (backend `/api/liquidity`)
**Spec:** `TASKS.md` § T-012d

---

### 🟡 T-012e — Admin nav + router update
**Time estimate:** 1h
- Add Rewards + Liquidity to sidebar nav
- Add `/settings/users` + `/settings/fees` sub-routes
**Spec:** `TASKS.md` § T-012e

---

### 🟡 T-013 — Admin Customer Activity sub-page
**App:** Admin `localhost:5002/customers/:id/activity`
**Time estimate:** 3–4h
- Activity log per customer
- Add note → saves + appears without reload
- Breadcrumb navigation
**Spec:** `TASKS.md` § T-013

---

### 🟡 T-014b — Consumer Rewards screen
**App:** Consumer `localhost:5001/rewards`
**Time estimate:** 3–4h
- RewardsView.vue with referral code, invitees count, reward history table
- [Share invite] copies referral link
- Add to bottom nav + router
**Spec:** `TASKS.md` § T-014b

---

### 🟡 T-015 — Consumer Sign-up flow
**App:** Consumer `localhost:5001/signup`
**Time estimate:** 3–4h
- SignupView.vue: email + password + confirm
- POST /api/auth/register → auto-login → redirect to /kyc
- "Don't have an account?" link on LoginView
- Depends on T-011 (backend `/api/auth/register`)
**Spec:** `TASKS.md` § T-015

---

### 🟡 T-016a — Partner Login
**App:** Partner `localhost:5006`
**Time estimate:** 2–3h
- LoginView.vue if it doesn't exist
- Credentials: acme@partner.com / partner1234
- Auth guard: redirect unauthenticated → /login
**Spec:** `TASKS.md` § T-016a

---

### 🟡 T-016b — Partner End Users table
**App:** Partner `localhost:5006/end-users`
**Time estimate:** 2–3h
- Table: users attributed to this partner's B2B client
- Search + KYC status filter
**Spec:** `TASKS.md` § T-016b

---

### 🟡 T-016c — Partner Widget Config view
**App:** Partner `localhost:5006/widget-config`
**Time estimate:** 1–2h
- Read-only display of WidgetConfig for this partner
**Spec:** `TASKS.md` § T-016c

---

## BLOCK 3 — Backend Endpoints (unblocks Block 2)

### 🔴 T-011 — Backend: Missing API endpoints
**App:** Backend `localhost:3000`
**Time estimate:** 4–6h
**Endpoints to add:**
- `GET /api/rewards` — reward summary per user
- `GET /api/liquidity` — provider state (Bank + Market Sim)
- `POST /api/liquidity/simulate` — triggers WS event `LIQUIDITY_STATE_CHANGED`
- `GET /api/settings/fees?type=` — seeded fee config rows
- `PATCH /api/settings/fees/:id` — update fee
- `GET /api/settings/limits` — daily transaction limits
- `PATCH /api/settings/limits`
- `POST /api/auth/register` — create User + wallets → return token

**Spec:** `TASKS.md` § T-011

---

## BLOCK 4 — Sell Flow Polish (after SF-001)

### 🟡 SF-002 — Sell flow: desktop layout + visual polish
**App:** Consumer `localhost:5001/sell`
**Time estimate:** 4–6h
- Two-column layout on ≥1024px (asset picker left, quote card right)
- Fix step indicator: completed steps should be green (not red)
- Crypto icons in asset picker (₿, Ξ instead of just letters)
- CSS confetti on step 4 success
- All DS tokens, no raw `bg-red-*` Tailwind classes
**Spec:** `TASKS.md` § SF-002

---

### 🟡 SF-003 — Sell flow: onboarding + empty states
**App:** Consumer `localhost:5001/sell`
**Time estimate:** 3–4h
- KYC gate for unverified users
- Illustrated empty state ("Nothing to sell yet") for users with no crypto
- First-time onboarding tooltip (dismissible, localStorage)
- Large-amount warning (>80% of holding)
- Quote expiry overlay on step 2
**Spec:** `TASKS.md` § SF-003

---

### 🟢 SF-004 — Sell flow: tests
**App:** Consumer `localhost:5001`
**Time estimate:** 4–6h
- Vitest unit tests for useApi.ts (createQuote, acceptQuote, createTransaction)
- Vitest unit tests for SellView step logic (10 cases)
- Playwright e2e: happy path + empty state + quote expiry
**Spec:** `TASKS.md` § SF-004

---

## BLOCK 5 — KYC Upgrade (highest compliance value)

### 🟡 T-023 — Bank Entity: BIC, Multi-Currency, SWIFT Details
**Apps:** Backend + Consumer
**Time estimate:** 4–6h
- Add BIC, sortCode, accountNumber, dailyLimitEur to BankAccount model
- VirtualBank config object (bank name, BIC per currency)
- Consumer Home: bank card shows formatted IBAN + BIC + [Copy IBAN] button
- Prisma migration
**Spec:** `TASKS.md` § T-023

---

### 🟡 T-024 — KYC Level System (country risk routing)
**Apps:** Backend + Consumer + Sumsub Sim + Admin
**Time estimate:** 12–16h (split into Parts A–E)
- Part A: Backend — KYCLevel + CountryRisk models, kycEngine.ts, new routes
- Part B: Consumer — dynamic multi-step KYC form (2 steps for DE, 4 for TR, 7 for RU, blocked for IR)
- Part C: Sumsub Sim — show level badge + PEP flag + Upgrade button
- Part D: Admin — Settings > KYC Config (levels + country risk table)
- Part E: Admin KYC Queue — Level + Country Risk columns

**Most impactful for demo** — shows compliance depth.
**Spec:** `TASKS.md` § T-024

---

## BLOCK 6 — Notifications

### 🟡 T-025 — Backend: Notification model + CRUD + WS
**App:** Backend
**Time estimate:** 4–5h
- Prisma Notification model
- notificationService.ts with createNotification()
- Trigger notifications from KYC + transaction events
- REST endpoints (GET, mark-read, unread-count)
- User-scoped WS delivery
**Spec:** `TASKS.md` § T-025

---

### 🟡 T-026 — Consumer: Toast upgrade + Notification Center
**App:** Consumer
**Time estimate:** 5–7h
- Upgraded toast (title, urgency colors, action link, persist)
- Bell icon with unread badge in header
- Slide-in notification panel (grouped by date)
- Real-time WS updates
**Spec:** `TASKS.md` § T-026

---

### 🟡 T-027 — Consumer: Simulated Email Inbox
**App:** Consumer `localhost:5001/inbox`
**Time estimate:** 6–8h
- InboxView.vue at /inbox
- 6 email templates rendered in-browser (no SMTP needed)
- Transaction receipt template (full fee breakdown)
- KYC approved/rejected/manual-review emails
**Spec:** `TASKS.md` § T-027

---

### 🟡 T-028 — Admin: Notification bell
**App:** Admin `localhost:5002`
**Time estimate:** 3–4h
- Bell icon in admin header
- Urgency-grouped panel (critical first)
- "2 critical" label when error-urgency items unread
- Only receives admin-scoped WS events (userId=null)
**Spec:** `TASKS.md` § T-028

---

### 🟢 T-029 — Consumer: Notification Preferences
**App:** Consumer `/profile`
**Time estimate:** 2–3h
- Preference toggles in Profile page
- KYC row locked (regulatory)
- Persists to backend, affects toast + email behavior
**Spec:** `TASKS.md` § T-029

---

## BLOCK 7 — Real-time + System Map

### 🟡 T-019 — System Map: Bank + Exchange nodes
**App:** System Map `localhost:5004`
**Time estimate:** 2–3h
- Confirm market-simulator + bank-simulator nodes in Vue Flow
- Wire MARKET_ORDER_EXECUTED → animated pulse
- Wire BANK_ACCOUNT_CREATED → animated pulse
**Spec:** `TASKS.md` § T-019

---

### 🟡 T-021 — WebSocket real-time wiring audit
**Apps:** Admin + Consumer
**Time estimate:** 3–4h
- Verify admin Transactions, KYC Queue, Risk Queue, System Events all subscribe to correct WS event types
- Verify dashboard stat cards update in real time
- Create transaction in consumer → appears in admin within 2s without reload
**Spec:** `TASKS.md` § T-021

---

## BLOCK 8 — End-to-end Verification

### 🟡 T-017 — Landing: verify + wire demo links
**App:** Landing `localhost:5010`
**Time estimate:** 1–2h
- All 6 themes load, no 404
- CTAs point to correct localhost ports
- No broken images, no placeholder text
**Spec:** `TASKS.md` § T-017

---

### 🟢 T-022 — End-to-end demo flow test (RUNS LAST)
**Time estimate:** 2–3h
Full 12-step scenario from landing → signup → KYC → buy → admin → partner.
Only run after all other tasks complete.
**Spec:** `TASKS.md` § T-022

---

## BLOCK 9 — Design System Components (needed by Block 2)

### 🟡 T-020 — Missing packages/ui components
**Package:** `packages/ui`
**Time estimate:** 5–7h
Still needed (10 of 14 built):
1. `ConfirmPanel.vue` — SidePanel variant with reason textarea + approve/cancel
2. `InfoSection.vue` — titled group + optional Edit button
3. `FilterTabs.vue` — tab switcher that sets URL `?type=` param
4. `Breadcrumb.vue` — linked crumbs, last item plain text
5. `AdminShell.vue` — collapsible sidebar (240px ↔ 64px)
**Spec:** `TASKS.md` § T-020

---

## BLOCK 10 — Landing Pages

### Priority order (see `LANDING-TASKS.md` for full spec):

| ID | What | Priority | Est. |
|---|---|---|---|
| LD-001 | Create missing page files (15 files across 5 themes) | 🔴 | 6–8h |
| LD-002 | Fintech theme: Security/Developers/Case Studies + router | 🔴 | 3–4h |
| LD-011 | Custom SVG illustrations (6 components: IllFlow, IllKyc, IllWallet, etc.) | 🟡 | 6–8h |
| LD-012 | App screenshots as WebP → PhoneMockup / BrowserMockup | 🟡 | 2–3h |
| LD-003 | Home upgrades: stats bar, testimonials, trust logos, embed teaser (all 6 themes) | 🟡 | 8–10h |
| LD-013 | Swiss theme: full content depth pass | 🟡 | 5–6h |
| LD-014 | Crypto theme: glow effects, particle upgrade, terminal section | 🟡 | 4–5h |
| LD-015 | Bold theme: typography + asymmetric layout | 🟡 | 3–4h |
| LD-004 | Live data from backend (WS prices, tx count) | 🟡 | 3–4h |
| LD-005 | Pricing: interactive fee calculator (all 6 themes) | 🟡 | 4–5h |
| LD-006 | Partners: revenue calculator (all 6 themes) | 🟡 | 2–3h |
| LD-016 | Micro-animation pass (nav underlines, button lift, card stagger, marquee) | 🟡 | 4–5h |
| LD-007 | Animation system: fade-left, fade-right, scale-in, stagger | 🟢 | 2–3h |
| LD-008 | Theme picker `/` visual upgrade | 🟢 | 2–3h |
| LD-017 | Demo request form | 🟢 | 3–4h |
| LD-009 | Mobile responsiveness pass | 🟢 | 4–5h |
| LD-010 | Performance & a11y pass | 🟢 | 3–4h |

---

## Summary: what to build in what order

```
Day 1 — Emergency fixes (unblock everything)
  Morning: FIX-001 (delete .vue.js artifacts — 30 min, instant impact)
  Morning: FIX-002 (partner proxy — 15 min, entire partner portal unlocked)
  Afternoon: FIX-003 + FIX-005 (mock data removal + dashboard fix)

Day 2 — Admin pages working
  FIX-004 (KYC config backend routes)
  FIX-006 (audit + fix all admin blank pages)

Day 3 — Partner pages working + Sell flow
  FIX-007 (partner pages scoped data)
  SF-001 (sell flow auth token + .vue.js)

Day 4 — Fill feature gaps
  T-015 (signup flow)
  T-014b (consumer rewards)

Day 5 — Backend completeness
  Remaining T-011 endpoints (auth/register)
  T-016 partner improvements

Week 2 — Polish + KYC depth
  Day 1:  SF-002 + SF-003 (sell flow polish + onboarding)
  Day 2:  T-023 (bank entity enrichment)
  Day 3-4: T-024 Parts A+B (KYC level system)
  Day 5:  T-024 Parts C+D+E (sim + admin)

Week 3 — Notifications + real-time
  Day 1:  T-025 (notification backend)
  Day 2:  T-026 (consumer notification center)
  Day 3:  T-027 (email inbox)
  Day 4:  T-028 + T-029 (admin bell + preferences)
  Day 5:  T-021 (WS audit) + T-019 (system map)

Week 4 — Data Explorer + Landing + Tests
  Day 1-2: FIX-008 (db-viewer app at 5555)
  Day 3-4: LD-001 + LD-002 + LD-011 (landing pages + illustrations)
  Day 5:  LD-003 + LD-012 (home upgrades + screenshots)
  + SF-004 (sell tests) + T-022 (e2e demo flow)
```

---

## Quick reference: what's already DONE ✅

| Task | What |
|---|---|
| T-001 | System Map Vue Flow rebuild |
| T-002 | PriceSnapshot fix |
| T-003 | Backend B2B + partner routes |
| T-004 | Admin DS components + B2B Clients page |
| T-006 | Sumsub Sim KYC events |
| T-009 | Component inventory doc |
| T-010 | Admin spec doc |
| T-018 | Sumsub Sim real events |
| Landing | 6 themes × 4 pages (Home, Product, Pricing, Partners) |
| Landing | 8 shared components (BrowserMockup, CodeBlock, CoinFloat, etc.) |
| Landing | Swiss Security + Swiss Developers pages |
