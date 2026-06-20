# Prodigy Demo — Backlog

_Self-managed cycle: Analyst → Builder → Reviewer. Updated live._

---

## T-001 System Map — Rebuild with Vue Flow  
**Status: DONE ✅**  
**App:** system-map (localhost:5004)  
**Why:** Spec says Vue Flow diagram with animated signals. Currently custom SVG pipeline, not Vue Flow. `@vue-flow/core` is installed.  
**DoD (measurable):**
- [ ] Vue Flow canvas renders with all 10 nodes: consumer-app, widget, admin, partner-portal, sumsub-simulator, risk-engine, market-simulator, bank-simulator, ledger, database
- [ ] Edges connect nodes per EVENT_MODEL source→target pairs
- [ ] Each incoming WS event animates a pulse/particle from source node to target node
- [ ] Node color reflects last seen status: processing=yellow, waiting=amber, completed=green, failed/rejected=red, idle=slate
- [ ] Right-side event inspector panel shows last 20 events with correlationId grouping
- [ ] Clicking a correlationId highlights the full chain on the diagram
- [ ] Zero console errors; vue-tsc clean

---

## T-002 Fix PriceSnapshot in system-map  
**Status: DONE** _(fixed earlier: bidEur→bid, askEur→ask in system-map)_

---

## T-003 Backend — Add missing routes  
**Status: DONE ✅**  
**Why:** Partner Portal, Admin B2B pages, Widget config pages all need backend data. Currently only health/market/quotes/transactions/kyc/risk/users/ledger/system-events routes exist.  
**Routes to add:**
- `GET /api/b2b-clients` → list B2BClient records from DB
- `GET /api/b2b-clients/:id` → single B2BClient with widgetConfigs
- `GET /api/partner-commissions?b2bClientId=` → PartnerCommission records
- `GET /api/widget-configs` → list WidgetConfig records
**DoD:** Each curl returns real data from the seeded database (not 404).

---

## T-004 Admin — Convert views to DS components + add B2B Clients page  
**Status: DONE ✅** (LedgerView emerald→success tokens fixed; B2BClientsView built + routed + in nav)  
**Why:** User says admin uses raw HTML, not design-system components. Spec: use Button, Card, StatusPill, Badge from @prodigy/ui. No hardcoded colors.  
**DoD:** Every admin view imports and uses @prodigy/ui components where applicable. No hardcoded Tailwind color classes that duplicate DS tokens. vue-tsc clean.

---

## T-005 Consumer — End-to-end flow verification  
**Status: PARTIAL ✅**  
**DoD:**
- [x] Login with bob@demo.com / 1234 works
- [x] Home screen shows balance + holdings
- [x] Buy flow (EUR→BTC): quote → accept → complete
- [x] Sell flow (BTC→EUR): quote → accept → complete
- [x] /receive shows address + copy button works
- [ ] /send: step 4 is STILL "Coming Soon" (line 325 in SendView.vue — builder did not fix this)
- [x] /kyc shows form + WS status updates live
- [x] /transactions shows list; clicking item opens detail
- [x] /profile shows logout button

---

## T-006 Sumsub Sim — KYC action buttons & real events  
**Status: DONE ✅** _(confirmed by builder: approve/reject/manual-review all emit real WS events)_  
**DoD:**
- [x] Approving an applicant fires KYC_APPROVED event visible in System Map and Admin
- [x] Rejecting fires KYC_REJECTED
- [x] Flag for manual review fires KYC_MANUAL_REVIEW_REQUESTED
- [x] After approve: Admin KYC queue updates in real time (no page reload needed)
- [x] After approve: Consumer app KYC status updates (WS event received)

---

## T-007 Port 5555 clarification  
**Status: RESOLVED — NOT A NEW APP**  
Prisma Studio runs on 5555 (`pnpm --filter backend prisma studio`). It's a DB browser, not an app for demo. The real admin app is at 5002. No action needed.

---

## T-008 Add Exchange/Bank status to System Map  
**Status: TODO** — T-001 is DONE (Vue Flow + 11 nodes). Verify bank-simulator + market-simulator are among the 11 nodes and animate on their events.
Market Simulator and Bank Simulator already emit events (MARKET_ORDER_EXECUTED, BANK_ACCOUNT_CREATED). They just need to be visible nodes in the map.

---

## T-009 Analyst — Admin Component Inventory
**Status: DONE**
**Output:** `docs/component-inventory.md`
**Why:** Chat 3 (builder) needs a canonical list of UI components with states before building any admin screen.
**DoD (measurable):**
- [x] Every reusable UI component listed with all its states/variants
- [x] Each component shows which screens use it
- [x] Components tied to packages/ui — nothing invented outside DS
- [x] File exists at docs/component-inventory.md and is ≥ 500 words of structured content

---

## T-010 Analyst — Admin Spec (source of truth for Chat 3)
**Status: DONE**
**Output:** `docs/admin-spec.md`
**Why:** Chat 3 builds the admin app. It needs a complete spec covering every section: navigation, screens, data, states, acceptance criteria. No guessing allowed.
**DoD (measurable):**
- [x] Every sidebar section covered: Dashboard, Customers, Transactions, KYC Queue, Risk Queue, B2B Clients, Widget Configs, Ledger Entries, Partner Commissions, System Events, Settings
- [x] Each section has: purpose, URL pattern, page type (Dashboard/Table/Entity), all columns/fields, all states (empty/loading/error), all actions, acceptance criteria
- [x] Component references match docs/component-inventory.md
- [x] Spec is self-contained — dev can build without asking questions
- [x] Scope decisions documented (what is in/out vs legacy Risely)

---

---

## T-011 Backend — Missing API endpoints (Rewards, Liquidity, Fees, Auth)
**Status: TODO**
**App:** backend (localhost:3000)
**Why:** Admin Rewards, Liquidity, Settings/Fees pages and Consumer sign-up all need backend endpoints that don't exist yet.
**Endpoints to add:**
- `GET /api/rewards` — reward summary per user (computed from referral + commission data; seed static rows for demo users)
- `GET /api/liquidity` — simulated provider state (Bank Simulator + Market Simulator balances, in-memory)
- `POST /api/liquidity/simulate` — body: `{ action: 'low_balance'|'offline'|'recovery'|'high_volume'|'reset' }` — mutates in-memory state, broadcasts WS event `LIQUIDITY_STATE_CHANGED`
- `GET /api/settings/fees?type=fiat-send|crypto-send|swap` — seeded fee config rows
- `PATCH /api/settings/fees/:id` — update fee record (in-memory or DB)
- `GET /api/settings/limits` — daily transaction limits
- `PATCH /api/settings/limits` — update limits (in-memory OK for demo)
- `POST /api/auth/register` — consumer sign-up: `{ email, password }` → creates User + seeded wallets
**DoD:**
- [ ] All endpoints return real or seeded data (no 404)
- [ ] `POST /api/liquidity/simulate` changes state and broadcasts WS event
- [ ] `POST /api/auth/register` creates a new User in DB and returns token
- [ ] `GET /api/settings/fees` returns at least 5 fee rows per type
- [ ] curl test passes for every endpoint

---

## T-012 Admin — Add missing pages: Rewards, Liquidity, Settings (Users + Fees)
**Status: TODO**
**App:** admin (localhost:5002)
**Spec:** `docs/admin-spec.md` §10, §11, §13
**Why:** SettingsView is a "coming soon" placeholder. Rewards and Liquidity are in the spec but not in the router or nav.
**Sub-tasks:**

### T-012a Settings > Staff Users (`/settings/users`)
- Replace SettingsView with a routed sub-layout: `/settings` → redirect to `/settings/users`
- Staff Users table: columns from spec §13.1 (email, role, status, last login)
- `[Add User]` button → SidePanel with form (email, role, status)
- Click row → SidePanel edit (prefills form, adds [Delete User] button)
- Delete ConfirmPanel: reason required
- Data from `GET /api/users?role=admin` (or filtered staff users)

### T-012b Settings > Fees (`/settings/fees`)
- FilterTabs: fiat-send | crypto-send | swap (updates `?type=` URL param)
- Table per type — all columns from spec §13.2
- Row click → SidePanel edit with fee fields (% fee toggle, fixed fee toggle, limits, doc threshold)
- Daily Limits card below table + `[Edit Limits]` SidePanel
- Data from `GET /api/settings/fees?type=` (T-011 must be done first)
- Save → `PATCH /api/settings/fees/:id` → row updates without reload

### T-012c Rewards page (`/rewards`)
- Full-width table: columns from spec §10
- Data from `GET /api/rewards` (T-011)
- Customer ID links to `/customers/:id`
- FilterBar: search, date range
- CSV export

### T-012d Liquidity Management (`/liquidity`)
- Provider cards: Bank Simulator + Market Simulator
- Each card: name, StatusPill (online|degraded|offline), currency balance table (Available/Pending/Actual), total USD, pending tx count
- Summary row: total available, total pending, delta
- Demo simulation controls panel: 5 buttons (Simulate Low Balance, Simulate Offline, Recovery, High Volume, Reset)
- Buttons → `POST /api/liquidity/simulate` → WS event → cards update without reload
- Data from `GET /api/liquidity`

### T-012e Add to admin nav + router
- Add Rewards, Liquidity to sidebar nav (AppLayout.vue)
- Add Settings sub-routes `/settings/users`, `/settings/fees` to router
- Update `/settings` redirect

**DoD:**
- [ ] `/settings/users` shows staff list with Add/Edit/Delete working
- [ ] `/settings/fees` shows fee tables for all 3 types; edit saves and reflects in table
- [ ] `/rewards` shows reward table with real data from API
- [ ] `/liquidity` shows provider cards; Simulate buttons change card state without reload; WS updates visible
- [ ] All 4 pages appear in admin sidebar
- [ ] No "coming soon" placeholders remain in admin
- [ ] vue-tsc clean

---

## T-013 Admin — Customer Activity sub-page
**Status: TODO**
**App:** admin (localhost:5002)
**Spec:** `docs/admin-spec.md` §2.2 (customer detail → activity)
**Why:** Legacy Figma §6 shows a dedicated Activity page per client with audit log + notes + internal docs. Not yet in admin router.
**Sub-tasks:**
- Add route `/customers/:id/activity` → `CustomerActivityView.vue`
- Breadcrumb: `Customers › [email] › Activity`
- Add Note section: textarea + [Save Note] button → `POST /api/customers/:id/notes`
- Activity table: Event | Notes | Created | Made by admin email
- Data from `GET /api/customers/:id/activity` (or filter system events by userId)
- "Activity" link on Customer detail page header

**DoD:**
- [ ] `/customers/:id/activity` loads and shows events for correct customer
- [ ] Adding a note saves and appears in table without reload
- [ ] Breadcrumb links work (Customers → customer page → activity)

---

## T-014 Consumer — Complete Send flow + add Rewards screen
**Status: TODO**
**App:** consumer (localhost:5001)
**Why:** SendView step 4 = "Coming Soon" placeholder. No Rewards/Referral screen in router.
**Sub-tasks:**

### T-014a Send flow step 4 — broadcast & confirmation
- Replace "Coming Soon" with: POST to `/api/transactions` with quote → show transaction created state → link to transaction detail
- Show: transaction ID, status, "View transaction" link
- On error: show error message with [Try Again]

### T-014b Rewards / Referral screen (`/rewards`)
- New `RewardsView.vue`
- Show: referral code (generate from userId), signed-up invitees count, active invitees, reward balance
- Reward history table: month | earned | redeemed | balance
- `[Share invite]` button → copies referral link to clipboard
- Data from `GET /api/rewards?userId=:id`
- Add to consumer bottom nav + router

**DoD:**
- [ ] SendView step 4 completes a transaction and shows confirmation (not "Coming Soon")
- [ ] `/rewards` page shows user's referral data
- [ ] Referral code copy button works
- [ ] Reward history table shows at least 3 months for alice@demo.com

---

## T-015 Consumer — Sign-up flow
**Status: TODO**
**App:** consumer (localhost:5001)
**Why:** Only login exists. Demo needs to show a new user signing up and going through KYC.
**Screens to add:**
- `SignupView.vue` → `/signup` (public route)
- Form: email, password, confirm password
- Submit → `POST /api/auth/register` → auto-login → redirect to `/kyc`
- Show on LoginView: "Don't have an account? Sign up" link → `/signup`
- Error states: email already taken, password mismatch, weak password

**DoD:**
- [ ] `/signup` form submits and creates account in DB
- [ ] After signup, user is logged in and redirected to `/kyc`
- [ ] Login screen has link to signup
- [ ] Using new account: alice2@demo.com + password → full KYC flow works

---

## T-016 Partner Portal — Missing screens + auth
**Status: TODO**
**App:** partner (localhost:5006)
**Why:** Partner portal has Dashboard/Transactions/Commissions/API Keys. Missing: login, end users table, widget config view.
**Sub-tasks:**

### T-016a Partner Login
- Check if auth exists in partner app — if not, add `LoginView.vue` → `/login`
- Credentials: acme@partner.com / partner1234 and beta@partner.com / partner1234
- On login → redirect to `/dashboard`
- Guards: redirect unauthenticated to `/login`

### T-016b End Users table (`/end-users`)
- Table: users attributed to this B2B client
- Columns: ID (link to partner-scoped user view), email, KYC status, created, total transactions count
- Data: `GET /api/users?b2bClientId=:id` (scoped to logged-in partner)
- FilterBar: search by email/ID, filter by KYC status

### T-016c Widget Config view (`/widget-config`)
- Read-only display of the partner's WidgetConfig
- Shows: name, status, allowed currencies, theme, fee profile, redirect URL
- `GET /api/widget-configs?b2bClientId=:id`
- No edit — read only for partner

### T-016d Add to partner nav
- Add End Users + Widget Config to partner sidebar

**DoD:**
- [ ] Login redirects unauthenticated users to `/login`
- [ ] acme@partner.com can log in and sees only Acme data
- [ ] `/end-users` shows users attributed to logged-in partner
- [ ] `/widget-config` shows correct widget config for partner
- [ ] vue-tsc clean

---

## T-017 Landing page — Verify & wire demo links
**Status: TODO**
**App:** landing (localhost:5010)
**Why:** Landing exists with 3 themes (Swiss, Crypto, Fintech) but not in PRODUCT_SCOPE.md or session summary. Need to verify it works and links demo correctly.
**What to check/fix:**
- `pnpm dev:landing` starts successfully on port 5010
- All 3 themes load and are navigable
- CTAs ("Try the demo", "Get started") link to consumer app at localhost:5001
- B2B/Partner CTAs link to partner portal at localhost:5006
- No broken links, no placeholder text like "lorem ipsum"
- Mobile responsive (375px breakpoint)
- Zero console errors

**DoD:**
- [ ] `pnpm dev:landing` starts without errors
- [ ] All 3 theme home pages render correctly
- [ ] CTA links point to correct demo apps
- [ ] No broken images or missing assets
- [ ] Mobile layout works

---

## T-018 Sumsub Simulator — Wire real KYC events (unblocks T-006)
**Status: DONE ✅** _(confirmed — see T-006)_
**App:** sumsub-sim (localhost:5003)
**Why:** T-006: action buttons don't fire real backend events. Admin KYC queue doesn't update in real time after simulator actions.
**What to fix:**
- Approve button → `POST /api/kyc/:id/approve` → backend fires KYC_APPROVED event → WS broadcast → admin KYC queue row updates
- Reject button → `POST /api/kyc/:id/reject` with reason → fires KYC_REJECTED → consumer KYC screen updates
- Manual Review button → `POST /api/kyc/:id/manual-review` → fires KYC_MANUAL_REVIEW_REQUESTED → appears in admin KYC queue
- Simulator shows confirmation toast after each action
- Admin KYC queue updates without page reload (LiveIndicator pulses)
- Consumer app `/kyc` updates status without page reload

**DoD:**
- [ ] Approve in sim → within 2s admin KYC queue row shows Approved status
- [ ] Reject in sim → consumer /kyc shows "Rejected" status + rejection reason
- [ ] Manual Review → row appears in admin KYC Queue with status=manual_review
- [ ] All 3 actions show toast confirmation in simulator
- [ ] Zero console errors in all 3 apps during flow

---

## T-019 System Map — Unblock T-008: add Exchange/Bank nodes
**Status: TODO** _(was BLOCKED on T-001 which is now DONE)_
**App:** system-map (localhost:5004)
**Why:** Market Simulator and Bank Simulator emit events but their nodes aren't wired in the Vue Flow diagram.
**What to add:**
- Confirm `market-simulator` and `bank-simulator` nodes exist in the diagram
- Edges: consumer-app → bank-simulator (fiat deposit/withdraw), market-simulator → ledger (market order)
- Incoming MARKET_ORDER_EXECUTED event animates pulse on market-simulator → ledger edge
- Incoming BANK_ACCOUNT_CREATED event animates pulse on bank-simulator → database edge
- Node status updates when events arrive

**DoD:**
- [ ] market-simulator and bank-simulator nodes visible in Vue Flow canvas
- [ ] MARKET_ORDER_EXECUTED event triggers animated pulse on correct edge
- [ ] Node color changes on status update (processing/completed)
- [ ] Zero console errors

---

## T-020 Design System — Build missing packages/ui components
**Status: PARTIAL ✅** — 10/14 built. 5 still missing.
**Package:** packages/ui
**Why:** `docs/component-inventory.md` lists 14 components needed for admin. Builder built 10, 5 remain.
**Built ✅:** DataTable, FilterBar, SidePanel, DefinitionList, StatCard, MoneyAmount, CurrencyIcon, LiveIndicator, RiskScore, PageHeader
**Still needed:**
1. `ConfirmPanel.vue` — SidePanel variant for approve/reject flows: read-only entity info + reason textarea + action/cancel buttons
2. `InfoSection.vue` — titled group of DefinitionList + optional Edit button + actions slot
3. `FilterTabs.vue` — tab switcher that sets URL query param (NOT page tabs, used in Settings > Fees)
4. `Breadcrumb.vue` — items with href; last item plain text; all prior = `<a>`
5. `AdminShell.vue` — collapsible sidebar (240px/64px) + content area; accordion groups don't auto-close

**DoD:**
- [ ] Each component has Vitest unit test (renders, key states)
- [ ] DataTable: clicking row fires onRowClick; right-click works; loading shows 8 skeleton rows
- [ ] SidePanel: does NOT overlay (uses CSS push, not absolute/fixed over content)
- [ ] All components use only DS tokens (no hardcoded colors)
- [ ] vue-tsc clean on packages/ui

---

## T-021 Cross-app — WebSocket real-time wiring audit
**Status: TODO**
**Why:** Admin tables that should be live (Transactions, KYC Queue, Risk Queue, System Events) may not be subscribed to correct WS event types. Need to verify and fix.
**Tables to audit:**
- Transactions table: subscribes to `TRANSACTION_*` events → new/updated rows appear
- KYC Queue: subscribes to `KYC_*` events → row status updates
- Risk Queue: subscribes to `RISK_*` events → new reviews appear
- System Events: subscribes to ALL events → everything prepends
- Liquidity page: subscribes to `LIQUIDITY_STATE_CHANGED` → provider cards update
- Dashboard stat cards: subscribes to relevant events → counts increment

**DoD:**
- [ ] Create a transaction in consumer app → appears in admin Transactions within 2s without reload
- [ ] Approve KYC in sim → admin KYC Queue updates within 2s
- [ ] Trigger risk review → admin Risk Queue gets new row within 2s
- [ ] Dashboard pending KYC count updates in real time
- [ ] Zero WS connection errors in console

---

## T-022 End-to-end demo flow test
**Status: TODO** _(last task — runs after all above are done)_
**Why:** Full demo scenario must work start to finish. This is the final verification before a demo presentation.
**Scenario to validate:**
1. Open Landing (localhost:5010) → click "Try demo" → consumer app opens
2. Sign up new user → KYC form submitted → status = pending
3. Open Sumsub Sim (localhost:5003) → approve the new user
4. Admin KYC Queue (localhost:5002) → shows approved in real time
5. Consumer app: KYC status → approved. Home shows EUR balance.
6. Consumer: Buy flow (EUR → BTC): get quote → accept → complete
7. System Map (localhost:5004): shows animated flow (consumer → risk-engine → market-simulator → ledger)
8. Admin Transactions: new transaction appears, status = completed
9. Admin Ledger: double-entry entries visible
10. Partner Portal (localhost:5006): Acme commissions table shows new commission row
11. Admin Risk Queue: (if dave@demo.com used) manual review appears
12. Admin: approve risk review → transaction completes

**DoD:**
- [ ] All 12 steps complete without errors
- [ ] No "coming soon" placeholders encountered in the flow
- [ ] No console errors in any app during full scenario
- [ ] System Map shows animated pulses for each step

---

---

## T-023 Bank Entity Enrichment — BIC, Multi-Currency, SWIFT Details
**Status: TODO**
**Spec:** `docs/kyc-bank-spec.md` §5, §4 (BankAccount fields), §13 (consumer display)
**Why:** BankAccount exists but has no BIC, no GBP sort code, no account limits, no virtual bank identity. Post-KYC IBAN card on consumer app shows no banking details beyond IBAN.

### Backend changes:

**1. Add `VirtualBank` config to `simulators/bank.ts`:**
- Object with name, legalName, address, per-currency BIC, ibanCountryPrefix, sepaEnabled, sortCodePrefix, abaRoutingNumber
- Export as `VIRTUAL_BANK` — used everywhere IBANs are returned to show bank identity

**2. Update `generateIBAN()` in bank.ts:**
- EUR: `DE{2-digit check}{18 digits}` — BIC `PRODDE77XXX`
- GBP: `GB{2-digit check}PROD{6-digit sort code}{8-digit account number}` — BIC `PRODGB22XXX`
- USD: no IBAN — return `{ routingNumber: '021000021', accountNumber: '{random 10 digits}' }` — BIC `PRODUSD0XXX`

**3. Update `createBankAccount()` in bank.ts:**
- Compute and store `bic`, `sortCode` (GBP only), `accountNumber` (GBP only), `kycLevelId`
- Daily/monthly limits come from the `KYCLevel` (set in T-024) — default: 1000/5000 EUR

**4. Prisma migration — add to BankAccount model:**
```
bic             String   @default("PRODDE77XXX")
sortCode        String?
accountNumber   String?
accountType     String   @default("current")
dailyLimitEur   Float    @default(1000)
monthlyLimitEur Float    @default(5000)
kycLevelId      String?
```

**5. Update `IBAN_ASSIGNED` WS event payload:**
```json
{
  "iban": "DE29PROD...",
  "bic": "PRODDE77XXX",
  "currency": "EUR",
  "accountType": "current",
  "dailyLimitEur": 1000,
  "bankName": "Prodigy Bank Simulator"
}
```

**6. New route: `GET /api/bank/config`**
- Returns `VIRTUAL_BANK` object — used by consumer app to display bank identity

**7. Update `GET /api/users/:id`** — include bankAccounts with bic, sortCode, accountNumber, limits

### Consumer app changes (`apps/consumer/src/views/HomeView.vue`):
- Bank account card after KYC approval shows:
  - Bank name + "Prodigy Bank Simulator" label
  - Formatted IBAN (groups of 4: `DE29 PROD 0000 1234 5678 90`)
  - BIC code
  - Daily limit (from account data)
  - [Copy IBAN] button → navigator.clipboard.writeText
  - Balance (existing, keep)

**DoD:**
- [ ] `generateIBAN('EUR')` returns valid DE-format IBAN with PRODDE77XXX BIC
- [ ] `generateIBAN('GBP')` returns valid GB-format IBAN with sort code
- [ ] `IBAN_ASSIGNED` WS event includes bic, bankName, dailyLimitEur
- [ ] Consumer Home shows bank card with formatted IBAN + BIC after KYC approval
- [ ] [Copy IBAN] copies correct string to clipboard
- [ ] `GET /api/bank/config` returns VIRTUAL_BANK object
- [ ] Prisma migration runs without errors
- [ ] vue-tsc clean

---

## T-024 KYC Level System — Configurable Flow by Country Risk
**Status: TODO**
**Spec:** `docs/kyc-bank-spec.md` — full document
**Why:** KYC level is hardcoded as `'basic-kyc-level'` everywhere. There is no concept of enhanced due diligence, no country risk routing, no selfie/liveness or source-of-funds steps. This is the biggest KYC gap for a compliance demo.

### Part A — Backend: new models + engine

**1. Prisma migration — add new models:**
```prisma
model KYCLevel {
  id              String   @id   // 'basic-kyc-level' | 'standard-kyc-level' | 'enhanced-kyc-level'
  name            String
  description     String
  dailyLimitEur   Float
  monthlyLimitEur Float
  steps           String        // JSON: ["personal_info","document_upload","selfie",...]
  isActive        Boolean  @default(true)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model CountryRisk {
  countryCode    String   @id
  countryName    String
  riskLevel      String         // 'low'|'medium'|'high'|'blocked'
  requiredLevelId String?       // FK → KYCLevel.id
  isActive       Boolean  @default(true)
  updatedBy      String?
  updatedAt      DateTime @updatedAt
}
```

**2. Add fields to existing `KYCApplicant`:**
```
requiredSteps     String   @default("[]")
completedSteps    String   @default("[]")
sourceOfFunds     String?
sourceOfFundsRange String?
pepDeclaration    Boolean  @default(false)
addressProof      Boolean  @default(false)
selfieCompleted   Boolean  @default(false)
countryRisk       String?
```

**3. Seed `KYCLevel` table (in `seed/index.ts`):**
- `basic-kyc-level`: dailyLimit=1000, monthlyLimit=5000, steps=["personal_info","document_upload"]
- `standard-kyc-level`: dailyLimit=10000, monthlyLimit=50000, steps=["personal_info","document_upload","selfie"]
- `enhanced-kyc-level`: dailyLimit=-1, monthlyLimit=500000, steps=["personal_info","document_upload","selfie","address_proof","source_of_funds","pep_declaration"]

**4. Seed `CountryRisk` table (in `seed/index.ts`):**
- Low (Level 1): DE, FR, GB, US, CA, AU, CH, SE, NO, DK, NL, BE, AT, IE, NZ, FI, PT, ES, IT, SG, JP (22 countries)
- Medium (Level 2): TR, AE, ZA, MX, BR, IN, TH, PH, CO, PE, AR, ID (12 countries)
- High (Level 3): RU, UA, KZ, BY, CN, VN, PK, BD, NG, GH, KE (11 countries)
- Blocked: IR, KP, CU, SY, MM, YE, LY, SD (8 countries)

**5. New `simulators/kycEngine.ts`:**
```ts
export async function determineLevel(country: string): Promise<{
  levelId: string
  steps: string[]
  countryRisk: string
  blocked: boolean
  blockReason?: string
}>
```
- Looks up `CountryRisk` by country code
- Returns blocked=true for blocked countries
- Returns appropriate levelId + steps array

**6. Update `createApplicant()` in `simulators/kyc.ts`:**
- Call `determineLevel(country)` before saving
- If blocked → emit `KYC_COUNTRY_BLOCKED` event, throw `CountryBlockedError`
- Save `levelName`, `requiredSteps`, `countryRisk` on the applicant
- Emit new `KYC_LEVEL_DETERMINED` event with levelId and steps

**7. Update `approveApplicant()`:**
- When approving, look up the level's `dailyLimitEur` + `monthlyLimitEur`
- Pass them to `createBankAccount()` so they're stored on the account

**8. New routes (add to `routes/kyc.ts`):**
- `GET /api/kyc/levels` → all KYCLevel records
- `GET /api/kyc/country-risk` → all CountryRisk records (with optional `?riskLevel=` filter)
- `PATCH /api/kyc/country-risk/:code` → body `{ riskLevel, requiredLevelId }` → update risk for country

**9. New route: `POST /api/kyc/applicants/:id/upgrade-level`:**
- Body: `{ levelId: string }`
- Only upgrades (can't downgrade) — validates levelId is higher than current
- Updates `levelName`, `requiredSteps`, emits `KYC_LEVEL_UPGRADED` event

### Part B — Consumer App: dynamic KYC form

**Update `apps/consumer/src/views/KycView.vue` — complete rewrite:**

The form now has a dynamic step count determined by the level returned from the backend.

```
Step 1: Personal Info        — first name, last name, date of birth (always)
Step 2: Country Selection    — country dropdown (always)
  → On country select: POST /api/kyc/check-country { country }
  → If blocked: show BlockedCountryScreen (red banner, explanation, no further steps)
  → If not blocked: receive { levelId, steps, countryRisk }
  → Show level badge: "Basic Verification" / "Standard Verification" / "Enhanced Verification"
  → Show level explanation: "Your country of residence requires [level name] verification."
Step 3: Document Type        — passport / national ID / driver's license (always)
Step 4: Document Upload      — simulated: large drop zone, "Upload your [document type]" label
  → User clicks "Upload" → simulated progress bar (2s) → "Document uploaded ✓"
Step 5: Selfie / Liveness    — only if level >= standard
  → Button: "Take selfie" (camera icon)
  → Click → 2s loading animation → "Face matched ✓" (always succeeds in sim)
  → selfieCompleted = true sent to backend
Step 6: Address Proof        — only if level = enhanced
  → Drop zone: "Upload proof of address (utility bill or bank statement, ≤3 months old)"
  → Simulated upload → "Address document uploaded ✓"
Step 7: Source of Funds      — only if level = enhanced
  → Dropdown: Employment / Business Income / Investments / Inheritance / Other
  → Amount range: Less than €50,000 / €50,000–€200,000 / More than €200,000
Step 8: PEP Declaration      — only if level = enhanced
  → Large yes/no toggle: "Are you or any close family member a Politically Exposed Person?"
  → If YES → info callout: "Your application will require manual review. This typically takes 1–3 business days."
  → pepDeclaration saved
Step 9: Review & Submit      — summary of all submitted info (all steps collapsed, editable via back)
  → [Submit for verification] button
  → POST /api/kyc/applicants (with all collected fields)
  → POST /api/kyc/applicants/:id/submit
```

**Progress bar:** shows Step X of N (N = total steps based on level, not hardcoded 3)

**Add route: `GET /api/kyc/check-country`** (or inline in `POST /api/kyc/applicants` — simpler)
- Actually: add `POST /api/kyc/country-risk/check` → body `{ countryCode }` → returns `{ blocked, levelId, steps, countryRisk }`

### Part C — Sumsub Simulator upgrades

**`apps/sumsub-sim/src/views/ApplicantDetailPanel.vue` additions:**
- Show KYC Level badge (Basic / Standard / Enhanced) — read from `applicant.levelName`
- Show completed steps checklist: personal_info ✓ / document_upload ✓ / selfie ✓ / address_proof □ / etc.
- Show: Country Risk badge (🟢 Low / 🟡 Medium / 🔴 High)
- Show: PEP flag (if `pepDeclaration=true` → red "PEP DECLARED" badge)
- Add button: **[Upgrade to Enhanced]** → `POST /api/kyc/applicants/:id/upgrade-level` `{ levelId: 'enhanced-kyc-level' }`
- Add button: **[Flag as PEP]** → PATCH applicant `pepDeclaration=true`, trigger manual_review

### Part D — Admin: Settings > KYC Configuration (`/settings/kyc-config`)

Add route to admin router and nav (under Settings section).

**Sub-section 1: KYC Levels (read-only display for demo)**
- Table: Level name | Daily limit | Monthly limit | Steps included | Status
- Edit row → SidePanel: change daily/monthly limits only (steps are system-defined)

**Sub-section 2: Country Risk Rules**
- FilterTabs: Low Risk | Medium Risk | High Risk | Blocked
- Table columns: Flag emoji, Country name, Country code, Required KYC Level, Updated by, Updated at
- Row click → SidePanel: change risk level (dropdown: Low / Medium / High / Blocked) + required level
- [Reset to defaults] button → re-seeds CountryRisk from default list, shows ConfirmPanel first

**Sub-section 3: Auto-Upgrade Rules (read-only)**
- Static table, no editing:
  - Transaction amount >€1,000 → prompt Level 2 upgrade
  - Transaction amount >€10,000 → require Level 3 before proceeding
  - PEP declared → always manual review (cannot be changed)
  - Blocked country → reject at form entry (cannot be changed)

Add "KYC Config" to admin Settings sidebar nav.

### Part E — Admin KYC Queue column additions
- Add column: **Level** (badge: Basic/Standard/Enhanced)
- Add column: **Country Risk** (🟢🟡🔴 emoji + country code)
- Add column: **PEP** (⚠️ icon if pepDeclaration=true)
- FilterTabs upgrade: All | Basic | Standard | Enhanced | PEP

**DoD for T-024:**
- [ ] `KYCLevel` and `CountryRisk` tables seeded with full lists
- [ ] `determineLevel('RU')` returns enhanced level, `determineLevel('DE')` returns basic
- [ ] `determineLevel('IR')` returns blocked=true
- [ ] Consumer KYC form for a DE user shows 2 steps (personal_info + document_upload)
- [ ] Consumer KYC form for a TR user shows selfie step (standard level)
- [ ] Consumer KYC form for a RU user shows selfie + address + source_of_funds + PEP steps
- [ ] Selecting 'IR' (Iran) in country dropdown shows "We cannot provide services in your country" — no further steps
- [ ] PEP=Yes → after submission, applicant status = `manual_review` automatically
- [ ] Sumsub Sim shows KYC Level badge + completed steps checklist on applicant detail
- [ ] [Upgrade to Enhanced] button in Sumsub Sim works
- [ ] Admin `/settings/kyc-config` loads with both sub-sections
- [ ] Country risk update in admin takes effect immediately (next KYC submission for that country uses new level)
- [ ] KYC Queue table shows Level + Country Risk columns
- [ ] `GET /api/kyc/levels` returns all 3 levels
- [ ] `PATCH /api/kyc/country-risk/TR` body `{ riskLevel: 'high' }` persists and is returned in next GET
- [ ] Bank account created on approval uses correct daily/monthly limits from the level
- [ ] vue-tsc clean across all apps
- [ ] Prisma migration runs without errors on fresh DB

---

## FIX-001 — Delete all `.vue.js` artifact files (ALL APPS)
**Status: TODO**
**Priority: CRITICAL — must be first**
**Why:** Vite compilation cache files got committed into source. Each file contains a `debugger;` statement that **pauses execution** in browser devtools. This is why pages appear to "freeze" or not open — devtools catches the debugger before the component renders.

**Files to delete (confirmed):**
```bash
# Admin (13 files)
apps/admin/src/App.vue.js
apps/admin/src/layouts/AppLayout.vue.js
apps/admin/src/views/KycView.vue.js
apps/admin/src/views/LedgerView.vue.js
apps/admin/src/views/RiskReviewsView.vue.js
apps/admin/src/views/UsersView.vue.js
apps/admin/src/views/UserDetailPanel.vue.js
apps/admin/src/views/DashboardView.vue.js
apps/admin/src/views/RiskReviewDetailPanel.vue.js
apps/admin/src/views/TransactionDetailPanel.vue.js
apps/admin/src/views/SystemEventsView.vue.js
apps/admin/src/views/TransactionsView.vue.js
apps/admin/src/views/KycDetailPanel.vue.js

# Consumer
apps/consumer/src/views/SellView.vue.js
apps/consumer/src/views/BuyView.vue.js
apps/consumer/src/views/HomeView.vue.js
apps/consumer/src/views/KycView.vue.js
apps/consumer/src/views/LoginView.vue.js
apps/consumer/src/views/ProfileView.vue.js
apps/consumer/src/views/TransactionsView.vue.js
apps/consumer/src/views/TransactionDetailView.vue.js

# Partner (check for any)
apps/partner/src/views/ApiKeysView.vue.js
apps/partner/src/views/CommissionsView.vue.js
apps/partner/src/views/DashboardView.vue.js
apps/partner/src/views/HomeView.vue.js
apps/partner/src/views/TransactionsView.vue.js
```

**Command:**
```bash
find apps -name "*.vue.js" -delete
```

**Also add to `.gitignore`:**
```
apps/**/*.vue.js
```

**DoD:**
- [ ] `find apps -name "*.vue.js"` returns nothing
- [ ] `.gitignore` has `apps/**/*.vue.js` entry
- [ ] `pnpm dev:admin` — no debugger pause in browser
- [ ] `pnpm dev:consumer` — no debugger pause in browser

---

## FIX-002 — Partner Portal: Add Vite Proxy (ALL partner API calls fail)
**Status: TODO**
**Priority: CRITICAL — no API calls work in partner without this**
**App:** partner (localhost:5006)

**Root cause:** `apps/partner/vite.config.ts` has **no proxy** for `/api`. The partner `apiFetch` calls `/api/auth/login`, `/api/transactions`, etc. Without a proxy, these hit `localhost:5006` (the Vite dev server) and get 404.

Compare:
- Admin vite.config.ts: has `proxy: { '/api': 'http://localhost:3000' }` ✅
- Partner vite.config.ts: **no proxy** ❌ → every API call 404s silently

**Fix: add proxy to `apps/partner/vite.config.ts`:**
```ts
server: {
  port: 5006,
  proxy: {
    '/api': 'http://localhost:3000',
    '/ws': { target: 'ws://localhost:3000', ws: true },
  },
},
```

**After this fix:** Login, Transactions, Commissions, End Users, Widget Config should all work (they call real endpoints that exist in backend).

**Also fix error message in apiFetch:** Currently throws `new Error(\`${res.status}\`)` — change to include the error body message so errors are debuggable.

**DoD:**
- [ ] `apps/partner/vite.config.ts` has proxy block matching admin's config
- [ ] `pnpm dev:partner` — login with acme@partner.com / partner1234 works
- [ ] Partner Dashboard loads with real transaction data (not mock)
- [ ] Partner Commissions shows real commission rows (not hardcoded mock array)
- [ ] Network tab shows `/api/...` calls returning 200 not 404

---

## FIX-003 — Partner Commissions: Remove hardcoded mock data
**Status: TODO**
**App:** partner (localhost:5006)
**Depends on:** FIX-002 (proxy must work first)
**File:** `apps/partner/src/views/CommissionsView.vue`

`CommissionsView.vue` has a hardcoded `mockCommissions` array at the top of the file. The view uses it as fallback AND shows it even when the real API returns data.

**Fix:**
1. Remove the `mockCommissions` array entirely
2. Ensure `useQuery` calls `GET /api/partner-commissions?b2bClientId={id}` with the logged-in partner's `attributedToB2BClientId`
3. Read `authStore.user.attributedToB2BClientId` — check that it's populated after login
4. If login response doesn't include `attributedToB2BClientId`, check `backend/src/routes/auth.ts` — the login handler must return it

**Check backend auth login response:** Does `POST /api/auth/login` return `attributedToB2BClientId` for partner users? If not, add it to the response.

**DoD:**
- [ ] `mockCommissions` array deleted from CommissionsView.vue
- [ ] Logging in as acme@partner.com shows only Acme's commissions (from real API)
- [ ] Logging in as beta@partner.com shows only Beta's commissions
- [ ] If no commissions: shows EmptyState component (not blank page)
- [ ] Commission status filter works

---

## FIX-004 — Admin: Add missing backend routes for KYC Config page
**Status: TODO**
**App:** backend (localhost:3000) → Admin (localhost:5002)
**File:** `backend/src/routes/kyc.ts`

`SettingsKycConfigView.vue` calls:
- `GET /api/kyc/levels` — **does not exist** → page shows error/blank
- `GET /api/kyc/country-risk?riskLevel=` — **does not exist** → page shows error/blank
- `PATCH /api/kyc/country-risk/:code` — **does not exist**

These are a subset of the full T-024 KYC Level system. Build the backend stubs needed to make the Admin page load, without the full T-024 frontend work.

**Add to `backend/src/routes/kyc.ts`** (or a new `kyc-config.ts`):

```ts
// In-memory KYC levels (static for now)
const KYC_LEVELS = [
  { id: 'basic-kyc-level', name: 'Basic Verification', description: 'Standard document check', dailyLimitEur: 1000, monthlyLimitEur: 5000, steps: ['personal_info', 'document_upload'], active: true },
  { id: 'standard-kyc-level', name: 'Standard Verification', description: 'Documents + selfie', dailyLimitEur: 10000, monthlyLimitEur: 50000, steps: ['personal_info', 'document_upload', 'selfie'], active: true },
  { id: 'enhanced-kyc-level', name: 'Enhanced Verification', description: 'Full EDD', dailyLimitEur: -1, monthlyLimitEur: 500000, steps: ['personal_info', 'document_upload', 'selfie', 'address_proof', 'source_of_funds', 'pep_declaration'], active: true },
]

// In-memory country risk (15 countries, enough to show the UI)
const COUNTRY_RISK = [
  { countryCode: 'DE', countryName: 'Germany', riskLevel: 'low', requiredLevel: 'basic-kyc-level' },
  { countryCode: 'GB', countryName: 'United Kingdom', riskLevel: 'low', requiredLevel: 'basic-kyc-level' },
  { countryCode: 'FR', countryName: 'France', riskLevel: 'low', requiredLevel: 'basic-kyc-level' },
  { countryCode: 'US', countryName: 'United States', riskLevel: 'low', requiredLevel: 'basic-kyc-level' },
  { countryCode: 'TR', countryName: 'Turkey', riskLevel: 'medium', requiredLevel: 'standard-kyc-level' },
  { countryCode: 'AE', countryName: 'UAE', riskLevel: 'medium', requiredLevel: 'standard-kyc-level' },
  { countryCode: 'ZA', countryName: 'South Africa', riskLevel: 'medium', requiredLevel: 'standard-kyc-level' },
  { countryCode: 'RU', countryName: 'Russia', riskLevel: 'high', requiredLevel: 'enhanced-kyc-level' },
  { countryCode: 'CN', countryName: 'China', riskLevel: 'high', requiredLevel: 'enhanced-kyc-level' },
  { countryCode: 'NG', countryName: 'Nigeria', riskLevel: 'high', requiredLevel: 'enhanced-kyc-level' },
  { countryCode: 'IR', countryName: 'Iran', riskLevel: 'blocked', requiredLevel: null },
  { countryCode: 'KP', countryName: 'North Korea', riskLevel: 'blocked', requiredLevel: null },
  { countryCode: 'SY', countryName: 'Syria', riskLevel: 'blocked', requiredLevel: null },
]

// GET /api/kyc/levels
// GET /api/kyc/country-risk?riskLevel=low|medium|high|blocked
// PATCH /api/kyc/country-risk/:code → body { riskLevel, requiredLevel }
```

**DoD:**
- [ ] `GET /api/kyc/levels` returns 3 level objects
- [ ] `GET /api/kyc/country-risk` returns 13 entries
- [ ] `GET /api/kyc/country-risk?riskLevel=high` returns only high-risk countries
- [ ] `PATCH /api/kyc/country-risk/TR` body `{ riskLevel: 'high' }` → updates in memory
- [ ] Admin `/settings/kyc-config` page loads without error state
- [ ] Country risk table shows filtered results when FilterTabs changed

---

## FIX-005 — Admin Dashboard: Fix fail statuses + empty stat cards
**Status: TODO**
**App:** admin (localhost:5002)
**File:** `apps/admin/src/views/DashboardView.vue`
**Depends on:** FIX-001 (delete .vue.js files)

Dashboard calls `/api/risk-reviews` — need to verify this route exists. Also check:
1. Does `GET /api/risk-reviews` exist? (separate from `/api/risk-queue`) — check `backend/src/routes/risk.ts`
2. Dashboard stat cards show "failed" as the only transaction status because the seeded transactions may all have `status: 'failed'` — check and fix seed data

**What to check and fix:**
- `GET /api/risk-reviews` — if it doesn't exist, add it (returns risk review records with status/count)
- Seeded transactions: ensure alice has at least 2 `completed` transactions, not just failed ones
- Stat cards: "Total Volume" should show non-zero number
- Recent transactions table: should show mix of statuses (completed, pending, failed) — not only failed
- If stat cards show 0/empty but API works: check the response shape — `{ total, items }` vs `{ data }` etc.
- Dashboard should not crash if one endpoint 404s — add `onError` fallback so other cards still render

**Seed data check:**
```bash
# Check what's in the DB
curl localhost:3000/api/transactions | jq '.items[].status'
```
If all `failed` — update `backend/src/seed/index.ts` to mark at least tx1 and tx2 as `completed`.

**DoD:**
- [ ] Admin Dashboard loads without any fail-status-only data
- [ ] "Total Transactions" stat card shows correct non-zero number
- [ ] "KYC Pending" stat shows count of pending applications
- [ ] Recent transactions table shows at least 3 rows with mixed statuses
- [ ] Stat cards don't crash if one API call fails (graceful degradation)
- [ ] No `console.error` from the Dashboard view

---

## FIX-006 — Admin: Fix all remaining pages that show empty/error
**Status: TODO**
**App:** admin (localhost:5002)
**Depends on:** FIX-001, FIX-004

Pages to verify + fix one by one. For each: open the page, check Network tab for failing API calls, check console for errors.

### Pages to audit + fix:

**`/rewards`** — calls `GET /api/rewards` (✅ exists in backend, returns computed data)
- If empty: check that DB has users with IDs. Seed has alice + dave — should return data.
- If shape mismatch: check `RewardsView.vue` expects `{ items: [...] }` — backend returns `{ items }` ✅

**`/liquidity`** — calls `GET /api/liquidity` (✅ exists in backend, in-memory state)
- Should show Bank Simulator + Market Simulator provider cards
- Simulation buttons: POST `/api/liquidity/simulate` with action body
- If broken: check that `LiquidityView.vue` renders the provider cards correctly

**`/settings/fees`** — calls `GET /api/settings/fees?type=` (✅ exists in backend)
- Check FilterTabs: does `FilterTabs` component exist in `packages/ui`? If not, it's why the page is blank
- Fallback: if FilterTabs missing, use plain tab buttons for now

**`/settings/limits`** — calls `GET /api/settings/limits` (✅ exists)
- Should just render the limits table — straightforward

**`/settings/kyc-config`** — calls `GET /api/kyc/levels` (❌ must do FIX-004 first)
- After FIX-004: should render the levels table + country risk table

**`/commissions` (admin)** — calls `GET /api/partner-commissions` — check if this differs from partner portal's commissions endpoint

**`/widget-configs`** — calls `GET /api/widget-configs` (T-003 is done — should work)
- If empty: seed data should have 2 widget configs. Check.

**`/b2b-clients`** — calls `GET /api/b2b-clients` (T-003 is done — should work)
- If empty: seed data should have 2 B2B clients.

**For every broken page, the fix pattern is:**
1. Open devtools Network tab
2. Find the failing request
3. Is it 404? → Backend route missing → add it
4. Is it 200 but page empty? → Response shape mismatch → fix the frontend parsing
5. Is it component error? → Missing DS component → stub it with basic HTML

**DoD:**
- [ ] `/rewards` shows reward table with alice + dave data
- [ ] `/liquidity` shows 2 provider cards (Bank + Market Simulator)
- [ ] `/liquidity` Simulate buttons change card state (POST works)
- [ ] `/settings/fees` shows fee table for all 3 types
- [ ] `/settings/limits` shows limits table
- [ ] `/settings/kyc-config` shows levels + country risk (after FIX-004)
- [ ] `/commissions` shows real commission rows
- [ ] `/widget-configs` shows 2 widget config rows
- [ ] `/b2b-clients` shows 2 B2B client rows
- [ ] No page shows blank white screen or "error" text

---

## FIX-007 — Partner Portal: Fix all remaining pages
**Status: TODO**
**App:** partner (localhost:5006)
**Depends on:** FIX-002, FIX-003

### Pages to fix:

**`/dashboard`**
- Calls `/api/transactions?b2bClientId=` and `/api/partner-commissions?b2bClientId=`
- Currently uses `mockCommissions` array — remove it
- After FIX-002 (proxy): real data should flow
- Fix: scope ALL queries to `authStore.user.attributedToB2BClientId`

**`/transactions`**
- Calls `GET /api/transactions?b2bClientId=` — check if this filter is supported in backend
- If not: add `?b2bClientId=` filter to `/api/transactions` in `backend/src/routes/transactions.ts`
- Show transaction list with correct partner-scoped data

**`/commissions`** (after FIX-003)
- Remove mock array → real data
- Filter by partner's b2bClientId

**`/end-users`**
- Calls `GET /api/users?attributedToB2BClientId=` or similar
- Check backend `users.ts` — does it support this filter?
- If not: add `?b2bClientId=` filter to `GET /api/users`

**`/widget-config`**
- Calls `GET /api/widget-configs?b2bClientId=`
- Backend `b2b.ts` (T-003) should support this
- Display widget config fields (read-only)

**`/api-keys`**
- Currently 100% hardcoded mock data — that's OK for demo (no real key management needed)
- Visual fix: revoked keys should show strikethrough or grey out properly

**DoD:**
- [ ] Login as acme@partner.com — all pages load with Acme-scoped data
- [ ] Login as beta@partner.com — all pages load with Beta-scoped data (different data)
- [ ] No mock arrays remain in any view files
- [ ] `/end-users` shows users attributed to the logged-in partner
- [ ] `/widget-config` shows correct widget config
- [ ] `/transactions` shows only that partner's transactions
- [ ] `/commissions` shows only that partner's commissions

---

## FIX-008 — Port 5555: Build Custom Data Explorer App
**Status: TODO**
**App:** NEW — `apps/db-viewer` (localhost:5555)
**Why:** Port 5555 currently runs Prisma Studio — a raw developer tool. For demo purposes, need a beautiful branded data explorer at this port that shows database content in a visually polished way with the same design system as the admin app. Prisma Studio will no longer run at this port.

### What to build:

**New Vue app:** `apps/db-viewer/`
- Copy vite config pattern from admin (port 5555, proxy to localhost:3000)
- Same design system (`@prodigy/ui` components)
- Dark theme (navy/slate — "database" feel, distinct from admin's light theme)
- No auth guard — accessible without login for demo

**Sidebar navigation (6 sections):**
1. **Users** — all users + KYC status + wallet balances
2. **Transactions** — all transactions + status + amounts
3. **Ledger Entries** — double-entry rows with debit/credit visualization
4. **KYC Applicants** — all KYC records + status + documents
5. **B2B Clients** — clients + widget configs
6. **System Events** — live event stream

**Layout pattern:**
Each section = full-width table with:
- Live WS badge ("Live" dot) — updates row count in real time
- Search input (client-side filter)
- Sortable columns (click header → toggle asc/desc)
- Row click → inline expansion (show full JSON of the record in a `<pre>` block styled as code)
- Export CSV button (generates CSV from current table data)

**Header:**
- Logo: "Prodigy DB" in monospace font
- Connection status: green dot "Connected to localhost:3000" / red dot "Disconnected"
- Live event counter: "247 events this session"

**Users table columns:**
ID (truncated) | Email | Status | KYC Status | Wallets | Created At

**Transactions table columns:**
ID | User | From | To | Amount | Fee | Status (StatusPill) | Created At

**Ledger Entries columns:**
ID | TX ID | Account | Type (debit/credit — color coded red/green) | Amount | Currency | Created At

**KYC Applicants columns:**
ID | User | Status (StatusPill) | Document Type | Country | Created At | Actions (Approve/Reject buttons — calls backend directly)

**B2B Clients columns:**
ID | Name | Status | Contact Email | Widget Configs count | Commissions count

**System Events — live view:**
Newest on top, auto-updates via WS.
Columns: Time | Event Name | Entity ID | Payload preview (first 80 chars)
Click → expand full payload as formatted JSON.

**Data sources:**
All from existing backend endpoints:
- `GET /api/users`
- `GET /api/transactions`
- `GET /api/ledger`
- `GET /api/kyc/applicants`
- `GET /api/b2b-clients`
- `GET /api/system-events`
- WS `ws://localhost:3000/ws` for live updates

**Styling:**
- Background: `#0B0F1A` (dark navy)
- Surface: `#131929` (slightly lighter)
- Text: `#E2E8F0` (slate-200)
- Accent: `#6366F1` (indigo)
- Debit amounts: `#F87171` (red)
- Credit amounts: `#34D399` (green)
- Table row hover: `rgba(99, 102, 241, 0.08)`
- Headers: monospace font (`font-mono`), uppercase, small (`text-xs`)

**Add to `package.json` scripts:**
```json
"dev:db": "pnpm --filter db-viewer dev"
```

**DoD:**
- [ ] `pnpm dev:db` starts at localhost:5555 without errors
- [ ] All 6 sections load with real data from backend
- [ ] Users table shows alice, bob, dave with KYC status badges
- [ ] Transactions table shows all seeded transactions
- [ ] Ledger entries show debit in red, credit in green
- [ ] KYC Applicants: clicking Approve calls backend + row updates without reload
- [ ] System Events section auto-updates when any event fires
- [ ] Row click expands formatted JSON
- [ ] Search filters table rows (client-side, instant)
- [ ] Export CSV downloads correct data
- [ ] Connection status shows green when backend is running
- [ ] 0 console errors
- [ ] vue-tsc clean

---

## SF-001 Sell Flow — Fix Core: Auth, API, Error Handling
**Status: TODO**
**App:** consumer (localhost:5001)
**Priority: HIGH — blocks demo**
**Root causes identified:**
1. `apiFetch()` in `useApi.ts` sends **no auth token** — all authenticated routes return 401 silently. The function has no `Authorization` header.
2. `SellView.vue.js` artifact contains a `debugger;` statement — this pauses execution in browser devtools. Must be deleted.
3. `acceptQuote` + `createTransaction` are called sequentially in `executeSell()` — if either fails, the error is caught but step goes to 4 (result) without showing a useful message.
4. Holdings may show 0 if `GET /api/users/:id` fails due to missing auth.

**Fixes:**

### 1. Add auth token to apiFetch (`apps/consumer/src/composables/useApi.ts`)
Read token from `useAuthStore()` inside `apiFetch` and include in every request:
```ts
import { useAuthStore } from '@/stores/auth'

async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const auth = useAuthStore()
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (auth.token) headers['Authorization'] = `Bearer ${auth.token}`
  const res = await fetch(url, { headers, ...options, headers: { ...headers, ...(options?.headers ?? {}) } })
  // ...rest unchanged
}
```
Check that `useAuthStore` exposes `token` (or `user.token`) — read the store file first and adapt accordingly.

### 2. Delete `SellView.vue.js`
```bash
rm apps/consumer/src/views/SellView.vue.js
```
Also delete any other `*.vue.js` artifacts in the views directory (these are stale Vite compilation outputs that don't belong in source).

### 3. Improve error display in executeSell()
- If `acceptQuote` throws → show specific message "Quote could not be accepted — it may have expired. Please try again."
- If `createTransaction` throws → show specific message from API error
- Retry button from step 4 (error) goes back to step 1, not step 2 (quote may be expired)

### 4. Add network error + 401 handling
In `apiFetch`:
- HTTP 401 → throw `new Error('Session expired — please log in again')` and call `auth.logout()` + `router.push('/login')`
- HTTP 0 / no response → throw `new Error('Cannot connect to server')`
- Display these errors via toast in addition to the step 4 error state

### 5. Verify backend auth middleware
Check `backend/src/routes/quotes.ts` and `backend/src/routes/transactions.ts`:
- If they require JWT verification — ensure the Consumer app sends valid token (token from `POST /api/auth/login` response)
- If they don't require auth — document this and skip token sending for those routes

**DoD:**
- [ ] `SellView.vue.js` deleted, no other `*.vue.js` in source
- [ ] `GET /api/users/:id` returns data when called from consumer (auth header sent)
- [ ] Holdings list shows alice's BTC 0.3 and ETH 1.2 on `/sell`
- [ ] Entering an amount triggers quote fetch and shows the quote card within 2s
- [ ] Clicking "Sell BTC" → step 2 (confirm) loads correctly
- [ ] Clicking "Confirm Sale" → step 3 (processing) → step 4 (result) within 10s
- [ ] Transaction visible in `/transactions` after completion
- [ ] Network error shows human-readable message (not "HTTP 500" or blank)
- [ ] vue-tsc clean

---

## SF-002 Sell Flow — Desktop Layout + Visual Polish
**Status: TODO**
**App:** consumer (localhost:5001)
**Depends on:** SF-001 (fix core first)
**Why:** Current layout is `px-4` narrow column — on 1280px desktop it looks like a phone screenshot embedded in a webpage. No visual hierarchy. Steps indicator uses `bg-danger-500` (red) for completed steps which looks like errors.

### Desktop layout (≥1024px breakpoint)

**Step 1 — two-column:**
```
Left (480px, scrollable)    │  Right (fill, sticky top-24)
─────────────────────────   │  ────────────────────────────
Title: "Sell Crypto"        │  Live Quote Card
Asset picker (3 cards)      │    ┌──────────────────────┐
Amount input field          │    │ Selling: 0.3 BTC     │
[MAX] button                │    │ Receiving: €18,240   │
                            │    │ ──────────────────── │
                            │    │ Exchange rate: ...   │
                            │    │ Platform fee: ...    │
                            │    │ Network fee: ...     │
                            │    │ ──────────────────── │
                            │    │ [Sell BTC] btn       │
                            │    └──────────────────────┘
                            │    Timer: ⏱ 28s
```

**Step 2 — two-column:**
```
Left                        │  Right
─────────────────           │  ─────────────────────
← Edit                      │  Confirmation card
                            │  (the gradient red card)
                            │  Full fee table below
                            │
                            │  [Confirm Sale] button
                            │  Timer warning
```

**Step 3 — centered full width, max-w-lg centered:**
- Large spinner → progress steps vertically
- Live status updates as steps complete

**Step 4 — centered, max-w-md:**
- Success: large checkmark SVG (animated path stroke)
- Amount received shown large
- Action buttons stacked

### Visual fixes (mobile + desktop)

1. **Step indicator**: completed step circles should be `bg-success-500` (green), NOT `bg-danger-500` (red). Red = error, green = done.

2. **Asset picker cards**: add crypto icon (BTC = ₿ in amber circle, ETH = Ξ in indigo circle) instead of just the first letter

3. **Quote card**: add a pulsing green dot next to the rate ("Live rate") to communicate it's real-time

4. **Confirm button**: on hover, show a brief confirmation animation (1 quick pulse on click, not just `active:scale-95`)

5. **Step 3 progress steps**: animate each step appearing with `opacity: 0 → 1 + translateY(8px → 0)` with 200ms delay between steps

6. **Step 4 success**: 1-second CSS confetti burst (use a small CSS `@keyframes` animation with colored dots expanding and fading — no JS library)

7. **Color consistency**: all sell-flow accent color should be `danger-500` (red) consistently. Currently mixes `bg-red-50` (raw Tailwind) with `bg-danger-50` (DS token). Use DS tokens only.

**DoD:**
- [ ] On 1280px desktop: two-column layout for step 1 and step 2
- [ ] Step indicator: completed = green circle, active = red circle, pending = grey
- [ ] Asset cards show crypto icon (₿, Ξ, $T) in colored circle
- [ ] Live rate dot on quote card
- [ ] Step 3 progress steps animate in sequence
- [ ] Step 4 success has CSS confetti animation
- [ ] No raw `bg-red-*` Tailwind classes in the file (all DS tokens)
- [ ] 375px mobile: all buttons ≥ 44px tall, nothing overflows horizontally
- [ ] vue-tsc clean

---

## SF-003 Sell Flow — Onboarding + Empty States + UX Feedback
**Status: TODO**
**App:** consumer (localhost:5001)
**Depends on:** SF-001
**Why:** User with no crypto gets a blank "No holdings" message. No first-run guidance. Errors don't tell the user what to do. No KYC gate.

### A. KYC gate
If user's KYC status is NOT `approved`:
- Show a full-page empty state instead of the asset picker
- Message: "Complete identity verification to start selling"
- CTA button → `/kyc`
- Show current KYC status badge (pending / under_review / rejected)

Check `auth.user.kycStatus` (or fetch from `fullUser.value.kycApplicants?.[0]?.status`).

### B. Empty holdings state (KYC approved, but no crypto)
Current: plain grey text + link. Replace with:
- Centered illustration (SVG inline — a simple wallet icon with a + mark, CSS-drawn)
- Headline: "Nothing to sell yet"
- Sub: "Buy crypto first, then come back here to convert it back to EUR."
- Large "Buy Crypto →" CTA button → `/buy`
- Smaller "See your balance" link → `/home`

### C. Onboarding tooltip (first-time sell)
Track in localStorage: `prodigy_sell_onboarding_seen`.

If NOT seen: show a dismissible tooltip bar below the page title on step 1:
```
ℹ️  Select a crypto asset you hold, enter how much to sell,  
    and we'll show you the live EUR amount you'll receive.  
    Rates are locked for 30 seconds.              [Got it]
```
On "Got it": set localStorage flag, dismiss with fade animation.

### D. Large amount warning
If amount > 80% of holding balance:
- Show amber callout below the amount input:
  "You're selling most of your [BTC]. Are you sure?"
- Don't block — just inform

### E. Quote expiry UX
When quote expires (countdown hits 0) on step 2:
- Currently: shows "Go back" text link. Not prominent enough.
- Replace: modal-style overlay inside the card with red background:
  "Quote expired. Prices change every 30 seconds."
  [Get New Quote] button (large, fills card width) → goes to step 1 and auto-fetches

### F. Post-sale deep link
On step 4 (success): add a "See in your balance" button (secondary) that goes to `/home` and scrolls to the holdings section (via URL hash `/home#holdings`).

**DoD:**
- [ ] Unverified KYC user sees gate screen with CTA to /kyc
- [ ] KYC-approved user with no crypto sees illustrated empty state
- [ ] First-time sell user sees onboarding tooltip
- [ ] Second visit: onboarding tooltip not shown
- [ ] Selling >80% shows amber warning
- [ ] Quote expiry on step 2 shows prominent overlay with "Get New Quote"
- [ ] Step 4 success has "See in your balance" button
- [ ] All states render without JS errors

---

## SF-004 Sell Flow — Tests
**Status: TODO**
**App:** consumer (localhost:5001)
**Depends on:** SF-001, SF-002, SF-003
**Framework:** Vitest (unit) + Playwright (e2e, `playwright.config.ts` exists at root)

### A. Unit tests — `useApi.ts` (`apps/consumer/src/composables/useApi.test.ts`)
```ts
// Mock fetch globally
describe('createQuote', () => {
  it('sends POST to /api/quotes with correct payload')
  it('throws with message from API error response')
  it('includes Authorization header when token is set in auth store')
})
describe('acceptQuote', () => {
  it('sends POST to /api/quotes/:id/accept')
})
describe('createTransaction', () => {
  it('sends POST to /api/transactions with userId + quoteId')
  it('returns transaction with id and status')
})
```

### B. Unit tests — SellView step logic (`apps/consumer/src/views/SellView.test.ts`)
Mount the component with mocked deps (vitest mock for useApi, useAuthStore):
```ts
describe('SellView', () => {
  it('renders asset list when user has holdings')
  it('shows empty state when user has no crypto holdings')
  it('shows KYC gate when user KYC status is not approved')
  it('step advances to 2 after confirmSell() when quote exists')
  it('step advances to 3 then 4 after executeSell()')
  it('shows error message when createTransaction throws')
  it('MAX button sets amount to full holding balance')
  it('amount error shown when amount exceeds balance')
  it('quote timer counts down and clears quote at 0')
})
```

### C. E2E test — Playwright (`tests/sell-flow.spec.ts`)
```ts
test('sell flow — full happy path', async ({ page }) => {
  // Login as alice@demo.com
  await page.goto('http://localhost:5001/login')
  await page.fill('[placeholder="Email"]', 'alice@demo.com')
  await page.fill('[placeholder="Password"]', '1234')
  await page.click('button[type=submit]')
  await page.waitForURL('**/home')

  // Navigate to sell
  await page.goto('http://localhost:5001/sell')
  
  // Step 1: select BTC, enter amount
  await page.click('[data-currency="BTC"]') // asset picker card
  await page.fill('[data-testid="amount-input"]', '0.01')
  await page.waitForSelector('[data-testid="quote-card"]') // quote appears
  await page.click('[data-testid="sell-cta"]')
  
  // Step 2: confirm
  await page.waitForSelector('text=Confirm Sale')
  await page.click('button:has-text("Confirm Sale")')
  
  // Step 3: processing
  await page.waitForSelector('text=Processing')
  
  // Step 4: result
  await page.waitForSelector('text=Sale Complete', { timeout: 15000 })
  await expect(page.locator('[data-testid="result-amount"]')).toContainText('€')
})

test('sell flow — empty state for user with no crypto', async ({ page }) => {
  // Login as a user with no crypto holdings
  // Verify "Nothing to sell yet" empty state renders
})

test('sell flow — quote expiry shows refresh prompt', async ({ page }) => {
  // Mock quote with 1s expiry, verify overlay appears
})
```

**Add `data-testid` attributes** to key elements in SellView.vue:
- Amount input: `data-testid="amount-input"`
- Quote card: `data-testid="quote-card"`
- Sell CTA button: `data-testid="sell-cta"`
- Result amount display: `data-testid="result-amount"`
- Asset buttons: `data-currency="{currency}"`

**DoD:**
- [ ] `pnpm test --filter consumer` runs all unit tests, 0 failures
- [ ] All 10 unit test cases pass
- [ ] Playwright e2e happy path test passes against running dev server
- [ ] Empty state e2e test passes
- [ ] `pnpm test` from root exits 0
- [ ] No `console.error` in test output
- [ ] vue-tsc clean

---

## T-025 Notifications — Backend: Model + CRUD + User-scoped WS
**Status: TODO**
**App:** backend (localhost:3000)
**Research:** `docs/research/notifications-research.md`
**Why:** No `Notification` model exists. All WS events broadcast to all clients indiscriminately. Notification center on consumer/admin needs a persistent store.

### Part A — Prisma: add `Notification` model

```prisma
model Notification {
  id          String   @id @default(cuid())
  userId      String?                         // null = admin/system-wide
  channel     String   @default("in_app")     // 'in_app' | 'email'
  type        String                           // 'kyc_approved' | 'transaction_completed' | ...
  title       String
  body        String
  actionUrl   String?                          // deep link route: '/transactions/tx_123'
  urgency     String   @default("info")        // 'info' | 'success' | 'warning' | 'error'
  isRead      Boolean  @default(false)
  readAt      DateTime?
  metadata    String   @default("{}")          // JSON: extra fields per type
  createdAt   DateTime @default(now())

  user        User?    @relation(fields: [userId], references: [id])
}
```

Run `prisma migrate dev --name add_notification`.

### Part B — `services/notificationService.ts`

```ts
export async function createNotification(params: {
  userId?: string
  channel?: 'in_app' | 'email'
  type: string
  title: string
  body: string
  actionUrl?: string
  urgency?: 'info' | 'success' | 'warning' | 'error'
  metadata?: Record<string, unknown>
}): Promise<Notification>
```

- Inserts record into DB
- After insert: emits WS event `NOTIFICATION_CREATED` with `{ userId, notification }` payload — user-scoped

### Part C — Trigger notifications from existing event flows

Add `createNotification()` calls inside existing handlers:

| Existing event | New notification to create |
|---|---|
| `KYC_APPROVED` | userId=applicant.userId, type='kyc_approved', title='Identity verified', body='Your account is verified. Your IBAN is ready.', urgency='success', actionUrl='/home', channel='in_app' + 'email' |
| `KYC_REJECTED` | type='kyc_rejected', title='Verification unsuccessful', body=reason, urgency='error', actionUrl='/kyc', channel='in_app' + 'email' |
| `KYC_MANUAL_REVIEW_REQUESTED` | type='kyc_manual_review', title='Documents under review', body='1–3 business days', urgency='info', actionUrl='/kyc', channel='in_app' + 'email' |
| `TRANSACTION_COMPLETED` | type='transaction_completed', title='Transaction complete', body='Your {fromCurrency}→{toCurrency} exchange is done', urgency='success', actionUrl='/transactions/{id}', channel='in_app' + 'email' |
| `TRANSACTION_FAILED` | type='transaction_failed', title='Transaction failed', body=reason, urgency='error', actionUrl='/transactions/{id}', channel='in_app' + 'email' |
| `RISK_REVIEW_OPENED` (admin) | userId=null, type='risk_review', title='Risk review opened', body='Transaction {id} flagged for manual review', urgency='warning', actionUrl='/risk-queue', channel='in_app' |
| `KYC_MANUAL_REVIEW_REQUESTED` (admin) | userId=null, type='kyc_manual_review_admin', title='KYC review needed', body='{name} requires manual review', urgency='warning', actionUrl='/kyc-queue', channel='in_app' |

### Part D — REST endpoints (add to routes)

```
GET  /api/notifications            ?userId= &channel= &isRead= (filter params)
POST /api/notifications/:id/read   → set isRead=true, readAt=now()
POST /api/notifications/read-all   body: { userId }
GET  /api/notifications/unread-count ?userId=
```

### Part E — User-scoped WS delivery

In the existing WS broadcast function, add `userId` to every `NOTIFICATION_CREATED` event payload.
Consumer app must filter: only show `NOTIFICATION_CREATED` events where `event.payload.userId === currentUser.id` (or `userId === null` for admin-global events).

**DoD:**
- [ ] Prisma migration runs without errors
- [ ] `POST /api/kyc/:id/approve` now also creates a `Notification` row with channel='in_app'+'email'
- [ ] `GET /api/notifications?userId=user_alice` returns correct notifications for alice
- [ ] `POST /api/notifications/:id/read` sets isRead=true and returns 200
- [ ] `GET /api/notifications/unread-count?userId=user_alice` returns `{ count: N }`
- [ ] WS `NOTIFICATION_CREATED` event fires within 200ms of the triggering event
- [ ] WS payload includes `userId` field (null for admin-scoped notifications)
- [ ] vue-tsc clean, no TS errors

---

## T-026 Notifications — Consumer: Toast Upgrade + Notification Center
**Status: TODO**
**App:** consumer (localhost:5001)
**Depends on:** T-025 (backend endpoints + WS events)
**Research:** `docs/research/notifications-research.md` §7 (UX rules)

### Part A — Upgrade existing Toast system

The current toast in Consumer is minimal (no title, no urgency levels, no action link, no persist).

**Extend `useToast` composable / `Toast.vue` component:**
- Add `title?: string` prop — displayed above body in bold
- Add `urgency: 'info' | 'success' | 'warning' | 'error'` prop — controls border color:
  - info → `border-slate-500`
  - success → `border-emerald-500`
  - warning → `border-amber-500`
  - error → `border-rose-500`
- Add `actionLabel?: string` + `actionUrl?: string` props — shows a text link inside toast
- Add `persist?: boolean` prop — if true, toast stays until user clicks X (no auto-dismiss)
- Auto-dismiss after 4s (default), 6s if `urgency='error'`
- Max 3 toasts visible at once; queue the rest
- Toast appears from bottom-right on desktop, bottom-center on mobile

### Part B — Notification Center (bell + panel)

**1. Bell icon in Consumer header (`AppLayout.vue` or `NavBar.vue`):**
- Bell icon (Heroicon `bell`)
- Red badge with unread count (cap display at "9+")
- Badge hidden when count = 0
- Click → opens notification panel (slide-in from right on desktop; bottom sheet on mobile)

**2. `NotificationPanel.vue` component:**
- Sticky header: "Notifications" + "Mark all read" button (top-right)
- Empty state: "No notifications yet. When something happens, you'll see it here."
- Grouped by date: "Today", "Yesterday", "Last 7 days", "Older"
- Each notification item:
  - Urgency color indicator (left border or icon dot)
  - `title` (bold if unread, normal if read)
  - `body` (1 line, ellipsis if longer)
  - Relative time (e.g. "2 minutes ago", "Yesterday")
  - If `actionUrl`: entire row is a router-link to that route; clicking closes the panel
  - Unread items: slightly highlighted background (`bg-slate-900/60`)
  - Read items: normal background
- "Mark all read" → `POST /api/notifications/read-all` → all items lose highlight

**3. Real-time updates via WS:**
- Subscribe to `NOTIFICATION_CREATED` WS events
- Filter by `event.payload.userId === currentUser.id`
- On match: increment unread count badge, prepend to panel list, show toast simultaneously

**4. Data loading:**
- On mount: `GET /api/notifications?userId={id}&channel=in_app`
- Merge with any new WS notifications received before mount completes (dedupe by id)
- `GET /api/notifications/unread-count?userId={id}` → seed the badge number

**DoD:**
- [ ] Bell icon appears in consumer header
- [ ] Unread badge shows correct count (0 → hidden, 1–9 → number, 10+ → "9+")
- [ ] Notification panel opens/closes on bell click (close also on outside click)
- [ ] KYC_APPROVED event → toast appears AND notification panel gets new item within 2s
- [ ] Clicking a notification item with actionUrl navigates to correct route and closes panel
- [ ] "Mark all read" makes all items lose the highlighted style
- [ ] Empty state shows when no notifications
- [ ] Toast urgency colors match: success=green border, error=red border, warning=amber border
- [ ] Toast persists when `persist=true` (KYC approval toast should be seen)
- [ ] Mobile: panel is a bottom sheet (slides up from bottom)
- [ ] vue-tsc clean

---

## T-027 Notifications — Consumer: Simulated Email Inbox
**Status: TODO**
**App:** consumer (localhost:5001)
**Depends on:** T-025 (notifications with channel='email' in DB)
**Research:** `docs/research/notifications-research.md` §3 (email design patterns)

### Rationale
We have no real SMTP. Instead: build an in-app "inbox" that renders pixel-perfect HTML email templates. Makes the email story 100% demoable without Sendgrid/SES.

### Part A — Inbox view (`/inbox`)

**`InboxView.vue`** — add to consumer router + bottom nav (envelope icon):

Left panel (320px on desktop, full-width on mobile):
- List of email notifications: subject + sender ("Prodigy Team") + relative time
- Unread indicator (blue dot on left)
- Click → opens email in right panel

Right panel (fills remaining width):
- Renders the email template for selected notification
- If nothing selected → placeholder "Select an email to read it"

Mobile: full-screen list → tap → full-screen email view (back button in header)

**Data:** `GET /api/notifications?userId={id}&channel=email` — only email-channel notifications.

### Part B — Email templates (rendered in browser as HTML+CSS)

Build `apps/consumer/src/components/emails/` directory with one `.vue` file per template.

Each template has:
- Prodigy logo (SVG inline — wave mark + wordmark)
- Body content specific to notification type
- Footer: "Support · Unsubscribe · Legal" (links are no-ops)
- Max-width 600px, centered

**Templates to build:**

**`EmailWelcome.vue`** (type='welcome'):
- Headline: "Welcome to Prodigy"
- Body: "Your account has been created. Complete identity verification to unlock your IBAN and start exchanging."
- CTA button → `/kyc`

**`EmailKycApproved.vue`** (type='kyc_approved'):
- Green checkmark icon (CSS circle)
- Headline: "Your identity has been verified"
- Body: "You now have full access to your account. Your IBAN has been assigned."
- IBAN info card: shows `metadata.iban`, `metadata.bic`
- CTA → `/home`

**`EmailKycRejected.vue`** (type='kyc_rejected'):
- Red X icon
- Headline: "Verification unsuccessful"
- Reason box (amber bg): `metadata.reason`
- "What to do next" section: "Update your documents and resubmit — most resubmissions are approved within 24 hours."
- CTA → `/kyc`

**`EmailKycManualReview.vue`** (type='kyc_manual_review'):
- Clock icon
- Headline: "Documents under review"
- Body: "Our compliance team is reviewing your documents. This typically takes 1–3 business days."
- No CTA (nothing for user to do)

**`EmailTransactionReceipt.vue`** (type='transaction_completed'):
- Headline: "Transaction complete"
- Receipt card — table with rows:
  - You sent: `metadata.fromAmount` `metadata.fromCurrency`
  - You received: `metadata.toAmount` `metadata.toCurrency`
  - Exchange rate: `metadata.rate`
  - Platform fee: `metadata.fee`
  - Transaction ID: `metadata.transactionId`
  - Timestamp: `metadata.completedAt` formatted as "18 Jun 2026, 14:32 UTC"
- CTA → `/transactions/{transactionId}`

**`EmailTransactionFailed.vue`** (type='transaction_failed'):
- Red background header
- Headline: "Transaction failed"
- Reason: `metadata.reason`
- "Try again" CTA → `/home`

**Template dispatch component:** `EmailRenderer.vue` — receives `notification` prop, renders correct template based on `notification.type`. Used by InboxView.

**DoD:**
- [ ] `/inbox` route works and shows email list on left, template on right
- [ ] KYC approval flow → email notification appears in inbox
- [ ] Transaction completion → transaction receipt email appears in inbox
- [ ] Each email template renders with all metadata fields correctly filled in
- [ ] Receipt table shows correct amounts, rate, fee, transaction ID
- [ ] Inbox unread indicator (blue dot) visible, disappears on open
- [ ] Mobile: list view → tap → full email view with back button
- [ ] Bottom nav has envelope icon + unread count badge
- [ ] vue-tsc clean

---

## T-028 Notifications — Admin: Operational Bell + Urgency Panel
**Status: TODO**
**App:** admin (localhost:5002)
**Depends on:** T-025 (WS events with userId=null for admin-scoped notifications)
**Research:** `docs/research/notifications-research.md` §2 (Admin notification types)

### What to build

**1. Bell icon in Admin header (`AppLayout.vue`):**
- Bell icon with urgency-aware badge:
  - If any `urgency='error'` or `urgency='warning'` unread → badge is amber with count
  - If all unread are `urgency='info'` or `urgency='success'` → badge is slate with count
  - No unread → no badge
- "X critical" label next to bell if urgency=error items exist (e.g. "2 critical")

**2. `AdminNotificationPanel.vue`:**
- Grouped by urgency (not by date — admin cares about urgency first):
  - "Critical" section (urgency=error) — red left border
  - "Warnings" section (urgency=warning) — amber left border
  - "Info" section (urgency=info|success) — slate left border
- Each item: type icon + title + body + relative time + "Review →" link if actionUrl exists
- "Mark all read" button top-right
- Empty: "All clear. No pending notifications."

**3. Real-time delivery:**
- Subscribe to `NOTIFICATION_CREATED` WS events where `event.payload.userId === null` (admin-scoped)
- On receive: increment badge, prepend to panel

**4. Data loading:**
- `GET /api/notifications?channel=in_app` (no userId filter = admin notifications)
- `GET /api/notifications/unread-count` (no userId = admin unread count)

**DoD:**
- [ ] Admin bell appears in header
- [ ] Approving KYC in sumsub-sim → admin sees no new notification (that's a consumer notification)
- [ ] Triggering risk review → admin bell badge increments within 2s
- [ ] KYC manual review request → admin bell badge increments within 2s
- [ ] Clicking "Review →" navigates to `/kyc-queue` or `/risk-queue`
- [ ] "Mark all read" clears badge
- [ ] Urgency grouping: critical items appear first
- [ ] "2 critical" label visible next to bell when error-urgency items unread
- [ ] vue-tsc clean

---

## T-029 Notifications — Consumer: Preference Center
**Status: TODO**
**App:** consumer (localhost:5001)
**Depends on:** T-025, T-026
**Research:** `docs/research/notifications-research.md` §5

### Where to add
Consumer Profile page (`/profile`) → add "Notification Preferences" section.

### Preference categories + defaults

| Category | Default | Can toggle? |
|---|---|---|
| Transaction alerts (in-app) | ON | Yes |
| Transaction receipts (email) | ON | Yes |
| KYC & security updates | ON | **No — regulatory, always on** |
| Rewards & referrals | ON | Yes |
| Marketing | OFF | Yes |

**UI:** toggle switch rows — each row: label + description + Toggle component.
Non-toggleable rows show a lock icon and "Required by regulation" tooltip instead of toggle.

**Persistence:** `PATCH /api/users/:id` with `{ notificationPrefs: { transactions: true, transactionEmails: true, rewards: true, marketing: false } }`

Store as JSON on User model — add `notificationPrefs String @default("{}")` to Prisma schema.

**Behavior:**
- When `transactions=false`: do not show transaction toasts (still create DB record, just don't toast)
- When `transactionEmails=false`: do not create email-channel notification for TRANSACTION_COMPLETED
- When `rewards=false`: no reward notifications

**DoD:**
- [ ] Preference section visible on `/profile`
- [ ] Toggles save on change (no submit button — immediate PATCH)
- [ ] Turning off "Transaction alerts" → next transaction does NOT show toast
- [ ] KYC & security row is non-interactive with lock icon
- [ ] Preferences survive page refresh (loaded from API on mount)
- [ ] Prisma migration for `notificationPrefs` runs without errors
- [ ] vue-tsc clean

---

## Blocked / Notes
- T-023 should run before T-024 (bank model changes are simpler, needed by T-024 approve flow)
- T-024 Part A (backend) must be done before Parts B–D (frontend)
- T-012 depends on T-011 (backend endpoints)
- T-014a depends on T-011 (`POST /api/auth/register`)
- T-019 unblocked (T-001 is DONE)
- T-022 runs last — depends on T-011 through T-021
- T-025 (backend) must be done before T-026, T-027, T-028, T-029
- T-026 must be done before T-027 (inbox reuses upgraded toast) and T-029 (preference center acts on toast behavior)
- T-028 (admin bell) is independent of T-026/T-027 — can run in parallel with consumer notification work
- Landing app (localhost:5010) is a bonus app — 5 themes total (Swiss, Crypto, Fintech, Bold, SaaS, Gradient)
- Landing visual tasks are tracked in `LANDING-TASKS.md` (LD-001 → LD-010)
- `pnpm prisma studio` at 5555 = DB browser; not referenced in demo script
- Scope decisions confirmed by owner: Rewards IN (read-only), Liquidity IN (simulated), Fees IN (full config page), Marketing OUT
- Notification scope: Web Push (service worker) is a stretch goal — skip if core NF tasks not done first
