# Product — Developer Tasks
_Only for: `backend/`, `apps/admin/`, `apps/consumer/`, `apps/partner/`, `apps/sumsub-sim/`, `packages/ui/`_
_Do NOT put landing tasks here. Landing tasks → `LANDING-TASKS.md`_
_Updated: 2026-06-18_

---

## State of Play

### What's confirmed done (verified in source files)

**Backend (`backend/src/routes/`):**
- ✅ auth.ts — `POST /api/auth/register`, `POST /api/auth/login`
- ✅ b2b.ts — B2B clients + widget configs
- ✅ fees.ts — `GET/PATCH /api/settings/fees`
- ✅ liquidity.ts — `GET /api/liquidity`, `POST /api/liquidity/simulate`
- ✅ rewards.ts — `GET /api/rewards`
- ✅ kyc.ts — create/submit/approve/reject/manual-review
- ✅ risk.ts, ledger.ts, transactions.ts, users.ts, system-events.ts, market.ts, quotes.ts

**DB Schema (schema.prisma):**
- ✅ KYCLevel model added
- ✅ CountryRisk model added
- ✅ All original models intact

**Admin (`apps/admin/src/views/`):**
- ✅ LiquidityView.vue — real implementation (provider cards, simulation buttons)
- ✅ RewardsView.vue — real implementation (data table from API)
- ✅ SettingsFeesView.vue — real implementation (fee config per type)
- ✅ SettingsLimitsView.vue
- ✅ CustomerActivityView.vue — EXISTS but has "Coming Soon" placeholder
- ✅ All original views + detail panels

**Admin nav/router:**
- ✅ Rewards, Liquidity in sidebar
- ✅ `/settings/fees`, `/settings/limits` routes
- ✅ `/customers/:id/activity` route

**Consumer (`apps/consumer/src/views/`):**
- ✅ SignupView.vue — registration form
- ✅ RewardsView.vue — referral + reward balance
- ✅ SendView.vue — step 4 now shows Confirmation (not "Coming Soon")
- ✅ KycView.vue — 3-step form (basic only — dynamic levels NOT implemented yet)

**Partner (`apps/partner/src/views/`):**
- ✅ LoginView.vue
- ✅ EndUsersView.vue
- ✅ WidgetConfigView.vue

**`packages/ui/src/components/`:**
- ✅ All 20 components built including: AdminShell, Breadcrumb, ConfirmPanel, FilterTabs, InfoSection (the 5 that were missing from earlier audit)

---

## What's Still Missing

**Verified by file inspection:**

| Area | Gap |
|---|---|
| Admin | CustomerActivityView is a placeholder ("Coming Soon") |
| Admin | No `/settings/kyc-config` page (T-024 Part D) |
| Admin | KYC Queue missing Level / Country Risk / PEP columns (T-024 Part E) |
| Admin | Staff Users settings page missing (only Fees + Limits under Settings) |
| Backend | `kycEngine.ts` — determineLevel() logic not built |
| Backend | KYCLevel / CountryRisk tables not seeded |
| Backend | BankAccount missing: bic, sortCode, accountNumber, limits (T-023) |
| Backend | No `VIRTUAL_BANK` config with real BIC codes |
| Consumer | KYC form is still static 3-step (no dynamic level routing) |
| Sumsub Sim | No level-aware controls (KYC level badge, completed steps, PEP flag) |
| Cross-app | WS real-time wiring not audited |
| Cross-app | E2E demo flow not tested end-to-end |

---

## Priority Order

1. **PT-001** — Customer Activity (quick win, just remove placeholder)
2. **PT-002** — Staff Users settings page
3. **PT-003** — Bank entity enrichment (BIC, VIRTUAL_BANK)
4. **PT-004** — KYC Engine backend (determineLevel, seeds)
5. **PT-005** — Consumer KYC dynamic form
6. **PT-006** — Admin: KYC Config page + KYC Queue columns
7. **PT-007** — Sumsub Sim level-aware controls
8. **PT-008** — WS real-time audit
9. **PT-009** — E2E demo flow test

---

## PT-001 Admin — Fix Customer Activity Placeholder
**Status: TODO**
**File:** `apps/admin/src/views/CustomerActivityView.vue`
**Why:** Route and nav link exist. File exists. But content = "Coming Soon". Quick fix.

**What to build:**
- Breadcrumb: `Customers › [user email] › Activity` — email from `GET /api/users/:id`
- Activity feed: list of SystemEvents filtered by `userId`
  - Endpoint: `GET /api/system-events?entityId=:userId` (or filter on frontend from full list)
  - Columns: Event name (badge), Description, Created at, Correlation ID (link to System Map)
- Add Note section:
  - Textarea (min 3 chars) + `[Save Note]` button
  - `POST /api/users/:id/notes` — body: `{ note: string, adminEmail: string }`
  - After save: note appears at top of activity feed
  - If the endpoint doesn't exist: add it to `backend/src/routes/users.ts`

**DoD:**
- [ ] `/admin/customers/:id/activity` shows real system events for that user
- [ ] "Add note" form saves and the note appears in the feed
- [ ] Breadcrumb links work (clicking "Customers" goes back to list)
- [ ] No "coming soon" text visible

---

## PT-002 Admin — Settings: Staff Users Page
**Status: TODO**
**Route:** `/settings/users`
**Why:** Settings has Fees + Limits but no Staff Users management. Admin team needs to manage who has access.

**Add to admin router** under `/settings`:
```ts
{ path: '/settings/users', component: () => import('../views/SettingsUsersView.vue') }
```

**Add to admin Settings nav** (sub-nav alongside Fees / Limits): "Users"

**Create `SettingsUsersView.vue`:**

Staff users table:
- Columns: Email, Role (badge: admin / compliance / support), Status (StatusPill: active/suspended), Last Login (relative time), Actions
- Data from: `GET /api/users?role=admin,compliance,support` — or if no role filter exists, add `?isStaff=true` and handle it backend

`[Add User]` button (top right) → SidePanel:
- Form: email, role (dropdown: Admin / Compliance Officer / Support), status (Active / Suspended)
- `[Save]` → `POST /api/staff` (add endpoint if missing) → row appears
- Validation: valid email required

Click row → edit SidePanel:
- Pre-filled form
- `[Save Changes]` → `PATCH /api/staff/:id`
- `[Delete User]` → ConfirmPanel: "Are you sure? This user will lose access immediately." with reason textarea

**Backend — add if missing:**
- `GET /api/staff` — list staff users (users with role != 'user')
- `POST /api/staff` — create staff user (email, role, status)
- `PATCH /api/staff/:id` — update role/status
- `DELETE /api/staff/:id` — deactivate (don't hard delete — set status=suspended)

**DoD:**
- [ ] `/settings/users` shows seeded admin users (alice@prodigy.com, etc.)
- [ ] Add User form creates and shows new user in table
- [ ] Edit SidePanel pre-fills and saves
- [ ] Delete ConfirmPanel requires reason, then suspends user (row shows suspended status)
- [ ] No modal anywhere (SidePanel only)

---

## PT-003 Bank Entity Enrichment — BIC, Multi-Currency, SWIFT Details
**Status: TODO**
**Spec:** `docs/kyc-bank-spec.md` §5

**Why:** BankAccount has no BIC code, no sort code (GBP), no limits. After KYC approval, consumer app can't show real bank details to the user.

### Backend changes:

**1. Add `VIRTUAL_BANK` config to `backend/src/simulators/bank.ts`:**
```ts
export const VIRTUAL_BANK = {
  name: 'Prodigy Bank Simulator',
  legalName: 'Prodigy Financial Services (Demo) B.V.',
  address: 'Strawinskylaan 3105, 1077 ZX Amsterdam, Netherlands',
  regulatoryRef: 'Demo only — not a real regulated entity',
  currencies: {
    EUR: { bic: 'PRODDE77XXX', ibanCountryPrefix: 'DE', sepaEnabled: true },
    GBP: { bic: 'PRODGB22XXX', ibanCountryPrefix: 'GB', sortCodePrefix: '12-34', fasterPaymentsEnabled: true },
    USD: { bic: 'PRODUSD0XXX', abaRoutingNumber: '021000021', swiftEnabled: true },
  },
}
```

**2. Update `generateIBAN(currency)` in bank.ts:**
- EUR: `DE{2-digit check}PROD{16 random digits}` → BIC: `PRODDE77XXX`
- GBP: `GB{2-digit check}PROD{6-digit sort code}{8-digit account}` → BIC: `PRODGB22XXX`, sortCode: `12-34-{2 random}`
- USD: return `{ routingNumber: '021000021', accountNumber: '{10 random digits}' }` — no IBAN

**3. Prisma migration — add fields to `BankAccount`:**
```prisma
bic              String  @default("PRODDE77XXX")
sortCode         String?         // GBP: "12-34-56"
accountNumber    String?         // GBP: "12345678"
accountType      String  @default("current")
dailyLimitEur    Float   @default(1000)
monthlyLimitEur  Float   @default(5000)
kycLevelId       String?
```
Run migration: `pnpm --filter backend prisma migrate dev --name add-bank-enrichment`

**4. Update `createBankAccount()` in bank.ts:**
- Compute and store `bic`, `sortCode`, `accountNumber`, `kycLevelId`
- Include all new fields in the `IBAN_ASSIGNED` WS event payload

**5. New route: `GET /api/bank/config`** → returns `VIRTUAL_BANK` object

**6. Update `GET /api/users/:id`** — include bankAccounts with new fields

### Consumer app changes:
**`apps/consumer/src/views/HomeView.vue` — bank card section:**

After KYC approval, show a proper bank account card:
```
┌──────────────────────────────────────────┐
│  Prodigy Bank Simulator                   │
│  DE29 PROD 0000 1234 5678 90   [EUR]      │
│  BIC / SWIFT: PRODDE77XXX                 │
│  Account type: Current                    │
│  Daily limit: €1,000                      │
│  Balance: €0.00               [updated]   │
│                                           │
│  [Copy IBAN]   [Copy BIC]                 │
└──────────────────────────────────────────┘
```

- Format IBAN in groups of 4 (DE29 PROD 0000 1234 5678 90)
- [Copy IBAN] → `navigator.clipboard.writeText(iban.replace(/\s/g, ''))` → toast "IBAN copied"
- [Copy BIC] → copies BIC code → toast "BIC copied"
- Balance updates live via WS (`BANK_BALANCE_UPDATED` or `TRANSACTION_COMPLETED` events)
- Daily limit shown with progress bar if user has any transactions today

**DoD:**
- [ ] After KYC approval, bank card shows formatted IBAN + BIC
- [ ] [Copy IBAN] works
- [ ] `GET /api/bank/config` returns VIRTUAL_BANK object
- [ ] Prisma migration runs on fresh DB
- [ ] `pnpm prisma studio` shows new fields on BankAccount records
- [ ] vue-tsc clean

---

## PT-004 Backend — KYC Engine (Level Routing by Country Risk)
**Status: TODO**
**Spec:** `docs/kyc-bank-spec.md` §2, §3, §6
**Why:** KYCLevel and CountryRisk models are in the schema but nothing uses them. `levelName` is still hardcoded to `'basic-kyc-level'`.

### Add new fields to `KYCApplicant` (Prisma migration):
```prisma
requiredSteps      String  @default("[]")      // JSON array of step names
completedSteps     String  @default("[]")      // JSON array of completed steps
sourceOfFunds      String?                     // "employment"|"business"|"investments"|"inheritance"|"other"
sourceOfFundsRange String?                     // "<50k"|"50k-200k"|">200k"
pepDeclaration     Boolean @default(false)
addressProof       Boolean @default(false)
selfieCompleted    Boolean @default(false)
countryRisk        String?                     // "low"|"medium"|"high" at time of submission
```

### Seed `KYCLevel` table in `backend/src/seed/index.ts`:
```ts
await db.kYCLevel.createMany({ skipDuplicates: true, data: [
  {
    id: 'basic-kyc-level',
    name: 'Basic',
    description: 'Standard verification for low-risk countries',
    dailyLimitEur: 1000,
    monthlyLimitEur: 5000,
    steps: JSON.stringify(['personal_info', 'document_upload']),
  },
  {
    id: 'standard-kyc-level',
    name: 'Standard',
    description: 'Enhanced verification for medium-risk countries',
    dailyLimitEur: 10000,
    monthlyLimitEur: 50000,
    steps: JSON.stringify(['personal_info', 'document_upload', 'selfie']),
  },
  {
    id: 'enhanced-kyc-level',
    name: 'Enhanced',
    description: 'Full due diligence for high-risk countries',
    dailyLimitEur: -1,
    monthlyLimitEur: 500000,
    steps: JSON.stringify(['personal_info', 'document_upload', 'selfie', 'address_proof', 'source_of_funds', 'pep_declaration']),
  },
]})
```

### Seed `CountryRisk` table:
Low risk (required: basic): DE, FR, GB, US, CA, AU, CH, SE, NO, DK, NL, BE, AT, IE, NZ, FI, PT, ES, IT, SG, JP
Medium risk (required: standard): TR, AE, ZA, MX, BR, IN, TH, PH, CO, PE, AR, ID
High risk (required: enhanced): RU, UA, KZ, BY, CN, VN, PK, BD, NG, GH, KE
Blocked (requiredLevelId: null): IR, KP, CU, SY, MM, YE, LY, SD

### Create `backend/src/simulators/kycEngine.ts`:
```ts
export interface LevelDecision {
  levelId: string
  steps: string[]
  countryRisk: 'low' | 'medium' | 'high'
  blocked: false
}

export interface BlockedDecision {
  blocked: true
  reason: string
}

export async function determineLevel(countryCode: string): Promise<LevelDecision | BlockedDecision>
```

Logic:
1. `await db.countryRisk.findUnique({ where: { countryCode } })`
2. If not found → treat as `low` (default to basic)
3. If `riskLevel === 'blocked'` → return `{ blocked: true, reason: 'Country not supported for regulatory reasons' }`
4. Get `requiredLevelId` → fetch `KYCLevel` → return `{ levelId, steps: JSON.parse(level.steps), countryRisk: rule.riskLevel, blocked: false }`

### Update `createApplicant()` in `kyc.ts`:
```ts
// Before creating applicant:
const decision = await determineLevel(input.country)
if (decision.blocked) {
  eventBus.emit(makeEvent({ eventName: 'KYC_COUNTRY_BLOCKED', ... }))
  throw new CountryBlockedError(decision.reason)
}
// Create applicant with:
levelName: decision.levelId,
requiredSteps: JSON.stringify(decision.steps),
countryRisk: decision.countryRisk,
```

### New/updated routes in `routes/kyc.ts`:
- `GET /api/kyc/levels` → `db.kYCLevel.findMany({ where: { isActive: true } })`
- `GET /api/kyc/country-risk` → all CountryRisk records (filter: `?riskLevel=low|medium|high|blocked`)
- `PATCH /api/kyc/country-risk/:code` → body `{ riskLevel, requiredLevelId? }` → update record
- `POST /api/kyc/country-risk/check` → body `{ countryCode }` → returns `determineLevel()` result (used by consumer KYC form before creating applicant)
- `POST /api/kyc/applicants/:id/upgrade-level` → body `{ levelId }` → only upward, update `levelName` + `requiredSteps`

### Update `approveApplicant()`:
- Look up `KYCLevel` for the applicant's `levelName`
- Pass `dailyLimitEur` + `monthlyLimitEur` to `createBankAccount()`

**DoD:**
- [ ] `determineLevel('DE')` returns `{ levelId: 'basic-kyc-level', steps: ['personal_info','document_upload'], countryRisk: 'low', blocked: false }`
- [ ] `determineLevel('TR')` returns standard level with selfie step
- [ ] `determineLevel('RU')` returns enhanced level with all 6 steps
- [ ] `determineLevel('IR')` returns `{ blocked: true, reason: '...' }`
- [ ] `POST /api/kyc/country-risk/check` with `{ countryCode: 'IR' }` returns `{ blocked: true }`
- [ ] Creating a KYC applicant for country=RU now stores `levelName: 'enhanced-kyc-level'`
- [ ] `GET /api/kyc/levels` returns 3 levels
- [ ] `PATCH /api/kyc/country-risk/TR` with `{ riskLevel: 'high', requiredLevelId: 'enhanced-kyc-level' }` persists
- [ ] Approved enhanced-level user gets bank account with `dailyLimitEur: -1`
- [ ] Prisma migration runs cleanly

---

## PT-005 Consumer — Dynamic KYC Form (Level-Aware)
**Status: TODO — depends on PT-004**
**File:** `apps/consumer/src/views/KycView.vue`
**Spec:** `docs/kyc-bank-spec.md` §7

**Full rewrite of the KYC form.** Current form is 3 static steps. New form has dynamic step count based on country risk level.

### Step flow:
```
Step 1: Personal Info
  Fields: first name, last name, date of birth
  Validation: all required, DOB valid date, must be 18+

Step 2: Country Selection
  Field: country dropdown (all countries — not just the current 20)
  On select → call POST /api/kyc/country-risk/check { countryCode }
  → if blocked: show BlockedCountryScreen (stop, no further steps)
  → if not blocked: receive { levelId, steps, countryRisk }
  → show Level Badge: "Basic Verification" / "Standard Verification" / "Enhanced Verification"
  → show explanation: "Your country requires [Level Name] verification" with tooltip explaining why

Step 3: Document Type
  Dropdown: Passport / National ID / Driver's License (existing, keep)

Step 4: Document Upload  ← always shown
  Large drop zone (fake): "Upload the front of your [document type]"
  Click or drag → shows progress bar (1.5s CSS animation) → shows "Document uploaded ✓"
  No real file upload — purely simulated

Step 5: Selfie / Liveness  ← only if level = standard or enhanced
  Button: "Take selfie" (camera icon)
  Click → 2s loading spinner → "Face matched ✓" (always succeeds in sim)
  selfieCompleted = true

Step 6: Address Proof  ← only if level = enhanced
  Drop zone: "Upload proof of address — utility bill or bank statement (max 3 months old)"
  Simulated: same fake upload flow → "Address document uploaded ✓"

Step 7: Source of Funds  ← only if level = enhanced
  Dropdown required: Employment / Business Income / Investments / Inheritance / Other
  Amount range required: Less than €50,000 / €50,000–€200,000 / More than €200,000

Step 8: PEP Declaration  ← only if level = enhanced
  Large toggle or radio: "Are you or any close family member a Politically Exposed Person?"
  If YES → show callout: "Your application will require manual review by our compliance team (1–3 business days)"

Step 9: Review & Submit
  Summary: all collected info in read-only rows
  [Submit for verification] button
  → POST /api/kyc/applicants (with all fields including sourceOfFunds, pepDeclaration etc.)
  → POST /api/kyc/applicants/:id/submit
  → If pepDeclaration=true → backend auto-sets status=manual_review
```

### Progress bar:
`Step X of N` where N changes based on level (basic=5, standard=6, enhanced=9).

### Countries list:
Add ALL countries (use ISO 3166-1 standard list — ~195 entries). Blocked countries appear in the list but selecting them triggers BlockedCountryScreen.

### BlockedCountryScreen:
- Red banner: "We cannot provide services to residents of [country]."
- Sub: "This is required by international regulatory law."
- "Go back" link to re-select country
- No submit button

**DoD:**
- [ ] User selecting Germany (DE): sees 5 steps (personal info + country + doc type + doc upload + review)
- [ ] User selecting Turkey (TR): sees selfie step added (6 steps)
- [ ] User selecting Russia (RU): sees all 9 steps including PEP declaration
- [ ] User selecting Iran (IR): sees BlockedCountryScreen, cannot proceed
- [ ] PEP=Yes shown after submit → admin KYC queue shows `manual_review` status for that applicant
- [ ] Source of funds saved on KYCApplicant record
- [ ] Progress bar shows correct step X of N for each level
- [ ] Country dropdown has 100+ countries (not just 20)
- [ ] vue-tsc clean

---

## PT-006 Admin — KYC Config Page + KYC Queue Upgrades
**Status: TODO — depends on PT-004**

### Part A: Settings > KYC Configuration (`/settings/kyc-config`)

**Add route to admin router:**
```ts
{ path: '/settings/kyc-config', component: () => import('../views/SettingsKycConfigView.vue') }
```

**Add to admin Settings nav** sub-items: alongside Fees / Limits / Users → add "KYC Config"

**Create `SettingsKycConfigView.vue`** with 2 sub-sections:

**Sub-section 1: KYC Levels** (table, read-only except limits):
- Columns: Level name (badge), Daily limit, Monthly limit, Steps included, Status
- Edit row → SidePanel: editable fields = Daily limit (number input, EUR), Monthly limit
- Save → `PATCH /api/kyc/levels/:id` with `{ dailyLimitEur, monthlyLimitEur }`
- Steps column: comma-separated list of step names (read-only in demo)

**Sub-section 2: Country Risk Rules** (table with FilterTabs):
- FilterTabs: Low Risk | Medium Risk | High Risk | Blocked
- Per tab: table of countries (flag emoji, name, code, Required Level badge, Updated by, Updated at)
- Click row → SidePanel: change risk level (dropdown: Low / Medium / High / Blocked) + required level dropdown (populated from KYC Levels list)
- Save → `PATCH /api/kyc/country-risk/:code`
- `[Reset to defaults]` button → ConfirmPanel → re-seeds all CountryRisk from defaults

### Part B: KYC Queue Column Additions

**File:** `apps/admin/src/views/KycQueueView.vue`

**Add columns to existing DataTable:**
- **Level** — Badge: Basic (neutral) / Standard (info) / Enhanced (warning)
- **Country Risk** — emoji + text: 🟢 Low / 🟡 Medium / 🔴 High
- **PEP** — if `pepDeclaration=true`: ⚠️ red badge "PEP"

**FilterTabs upgrade** (above the table):
- Current: likely just "All" or no tabs
- New: All | Basic | Standard | Enhanced | PEP Flagged

**Detail Panel additions** (KycDetailPanel.vue):
- Show KYC Level badge
- Show completed steps checklist (from `completedSteps` field)
- Show source of funds (if enhanced)
- Show PEP declaration status
- Show country risk level

**DoD:**
- [ ] `/settings/kyc-config` loads with both sub-sections
- [ ] Editing daily limit on "Standard" level saves and shows new value
- [ ] Changing Turkey from Medium → High risk persists (check with `GET /api/kyc/country-risk?riskLevel=high`)
- [ ] KYC Queue shows Level + Country Risk + PEP columns
- [ ] FilterTab "Enhanced" shows only enhanced-level applicants
- [ ] FilterTab "PEP Flagged" shows only applicants with pepDeclaration=true
- [ ] KYC detail panel shows completed steps

---

## PT-007 Sumsub Simulator — Level-Aware Controls
**Status: TODO — depends on PT-004**
**Files:** `apps/sumsub-sim/src/views/ApplicantDetailPanel.vue` (or similar)

**Add to applicant detail view:**

**Display (from API data):**
- KYC Level badge: Basic (grey) / Standard (blue) / Enhanced (orange)
- Country risk indicator: 🟢 / 🟡 / 🔴 + country code
- PEP flag: if `pepDeclaration=true` → red "⚠️ PEP DECLARED" banner
- Completed steps checklist: each step in `requiredSteps` with ✓ if in `completedSteps`, ○ if not

**New action buttons** (in addition to existing Approve/Reject/Manual Review):
- `[Upgrade to Enhanced]` → calls `POST /api/kyc/applicants/:id/upgrade-level` with `{ levelId: 'enhanced-kyc-level' }` → refreshes panel → shows new steps
- `[Flag as PEP]` → PATCH applicant `pepDeclaration=true` + triggers manual_review → shows PEP banner → admin KYC queue updates

**Confirmation on actions:** all 5 buttons show a confirmation toast ("KYC approved for [user email]") after successful action.

**DoD:**
- [ ] Applicant for Germany shows "Basic" badge + 2-item steps checklist
- [ ] Applicant for Russia shows "Enhanced" badge + 6-item steps checklist
- [ ] PEP badge appears for applicants with pepDeclaration=true
- [ ] [Upgrade to Enhanced] changes level badge and adds new steps to checklist
- [ ] [Flag as PEP] sets PEP banner + status → manual_review (visible in admin)
- [ ] All 5 action buttons show toast confirmation

---

## PT-008 WebSocket Audit — All Live Tables
**Status: TODO**
**Why:** Admin tables claim to be "live" but they may not subscribe to the right event types. This task verifies each table actually updates without a page reload.

### Tables to test (open in one tab, trigger action in another):

| Table | Trigger action | Expected update |
|---|---|---|
| Admin Transactions | Create transaction in Consumer app | New row appears at top |
| Admin KYC Queue | Approve KYC in Sumsub Sim | Row status changes |
| Admin Risk Queue | Create high-risk transaction | New row appears |
| Admin System Events | Any WS event | New row prepends |
| Admin Liquidity | POST /api/liquidity/simulate | Provider cards update |
| Admin Dashboard stats | KYC approval | "Pending KYC" count decrements |
| Consumer Home balance | POST /api/transactions complete | Balance updates |

### For each broken one:
- Find the component's `useWebSocket()` call
- Check what event names it listens to
- Add missing event subscriptions
- Verify update is reflected in the UI state (Pinia store or local ref)

**DoD:**
- [ ] All 7 scenarios above verified: action → UI updates within 3s without page reload
- [ ] Zero WS connection errors in browser console during the full test
- [ ] Consumer Home balance updates after a Buy transaction completes

---

## PT-009 E2E Demo Flow — 12-Step Verification
**Status: TODO — run last, after PT-001 through PT-008**
**Why:** This is the final gate before showing the demo to anyone. Proves the full scenario works.

### Full scenario (run in this order, all browsers open simultaneously):

1. Open `localhost:5010` (Landing) → click "Open the demo" → opens Consumer app
2. Consumer: click "Sign up" → register `newuser@demo.com` / `demo1234` → redirect to KYC
3. Consumer KYC: select country Germany → Basic level shown → complete 5 steps → submit
4. Open `localhost:5003` (Sumsub Sim) → find the new applicant → click Approve
5. Consumer app: KYC status updates to "Approved" within 3s (no refresh) → Home shows bank card with IBAN
6. Consumer: go to Buy → EUR→BTC €500 → get quote → confirm → transaction completes
7. Open `localhost:5004` (System Map) → verify animated flow shows consumer→risk-engine→market-simulator→ledger
8. Open `localhost:5002` (Admin) → Transactions → new transaction appears → status = completed
9. Admin → Ledger → double-entry entries visible for the transaction
10. Admin → KYC Queue → newuser's entry shows "Approved" status
11. Open `localhost:5006` (Partner Portal) → Commissions → new commission row visible for the Acme partner
12. Admin → Dashboard → stats updated: Total Transactions +1, correct revenue

### Repeat with high-risk user:
- Sign up `riskuser@demo.com`, select country Russia → Enhanced level → complete all 9 steps including PEP=No
- Sumsub Sim: approve → bank account created with unlimited limits
- Buy €15,000 → transaction goes to Risk Queue (high amount) → Admin approves → completes

**DoD:**
- [ ] All 12 steps complete without errors or "Coming Soon" pages
- [ ] High-risk user flow works (enhanced KYC + risk queue)
- [ ] No console errors in any app during the full scenario
- [ ] System Map shows animated pulses for the buy transaction

---

## PT-010 System Map — Edge Animation Verification + Correlation Highlight
**Status: TODO (partial — animation exists, highlight needs testing)**
**File:** `apps/system-map/src/views/SystemMapView.vue`
**Why:** `animateEdge()` and `handleNewEvent()` are implemented. Edge `animated` flag toggles on WS events and resets after 1500ms. BUT: correlation highlighting (clicking correlationId to highlight the full chain) needs verification. And edge color per status needs checking against all real event statuses.

### Verify:
1. Run the full buy transaction flow → confirm 5+ edges pulse in sequence (consumer→risk, risk→market, market→ledger, ledger→db, bank→consumer)
2. Click a `correlationId` in the event inspector → confirm all edges in that chain highlight simultaneously
3. Edge colors match statuses: `processing`=yellow, `completed`=green, `rejected`=red, `waiting`=amber

### Fix if broken:

**Edge color map** — check `edgeColorStyle()` covers all real event statuses from backend:
```ts
// Make sure these all map:
'processing' → yellow stroke
'completed'  → green stroke
'waiting'    → amber stroke
'rejected'   → red stroke
'failed'     → red stroke  ← may be missing
'cancelled'  → grey stroke ← may be missing
```

**Correlation highlight** — when `selectedCorrelationId` is set, edges whose source OR target matches any event in that correlation chain should be highlighted (thicker stroke or different color). Currently `isHighlighted()` only checks the event list sidebar — may not affect edges.

If correlation edge highlighting isn't implemented: add it.
```ts
// In template, add to each edge:
:class="{ 'edge-highlighted': isEdgeInCorrelation(edge) }"

// New function:
function isEdgeInCorrelation(edge) {
  if (!selectedCorrelationId.value) return false
  return localEvents.value
    .filter(e => e.correlationId === selectedCorrelationId.value)
    .some(e => e.source === edge.source && e.target === edge.target)
}
```

**DoD:**
- [ ] Run buy flow → at least 4 distinct edges animate in sequence (different colors per status)
- [ ] Clicking correlationId in inspector highlights that chain's edges on the graph
- [ ] `failed` and `cancelled` statuses have distinct edge colors
- [ ] No console errors during the animation

---

## PT-011 Widget App — Functional Verification
**Status: TODO**
**App:** `apps/widget/` (localhost:5005)
**Why:** Widget has 3 views (HomeView, WidgetDemoView, WidgetView) but we've never verified it works end-to-end. It's shown in demo as the B2B partner embed.

### What to verify and fix:

**`/` — HomeView:** Shows list of available B2B clients to test with. Check:
- Fetches from `GET /api/b2b-clients` and shows client names + IDs
- Each client has a link/button: "Open widget for [name]" → navigates to `/widget?b2bClientId=xxx`

**`/widget?b2bClientId=xxx` — WidgetView:** The actual embed. Check:
- Loads WidgetConfig for the given `b2bClientId` (`GET /api/widget-configs?b2bClientId=xxx`)
- Displays partner name, allowed currencies, theme mode
- Shows the buy/sell/swap form
- Gets a live price quote from `GET /api/quotes` with correct b2bClientId
- Quote shows fee breakdown: platform fee + partner fee + network fee
- Partner fee = quote's `partnerFeeAmount` (not hardcoded)
- Confirm button → `POST /api/transactions` with the quote → shows transaction result

**`/widget/demo` — WidgetDemoView:** Embedded preview (shown inside a fake browser frame). Check:
- Renders the widget inside a simulated browser chrome
- Used for demos — should look like a real embed

### Fix anything broken:
- If WidgetView shows hardcoded fees: wire to real quote API
- If partner name is hardcoded: load from WidgetConfig API response
- If Confirm doesn't actually create a transaction: fix the POST call
- If theme mode (dark/light) from WidgetConfig isn't applied: implement `data-theme` attribute toggle

**DoD:**
- [ ] `localhost:5005` loads → shows Acme Corp and Beta Co as selectable clients
- [ ] Opening `/widget?b2bClientId=acme_001` shows "Acme Corp" header, correct allowed currencies
- [ ] Entering €500 EUR → BTC fetches a real quote from backend (not hardcoded)
- [ ] Fee breakdown in the widget matches `GET /api/quotes` response (correct partner share)
- [ ] Confirm → transaction created in DB → visible in admin Transactions within 2s
- [ ] Dark theme widget config → widget renders in dark mode
- [ ] WidgetDemoView renders the widget inside a browser frame

---

## PT-012 Playwright E2E Tests — Core Flows
**Status: TODO — runs after PT-009 manual verification passes**
**Location:** `tests/e2e/` (directory exists, zero test files — only `.gitkeep`)
**Config:** `playwright.config.ts` — already configured (Chromium + Mobile Chrome, baseURL: localhost:5001)
**Why:** Manual E2E verification (PT-009) is one-time. Playwright tests run on every code change and catch regressions. These are the 5 most critical flows.

### Tests to write:

**`tests/e2e/01-auth.spec.ts` — Authentication:**
```ts
test('consumer login', ...)     // login with alice@demo.com, verify home screen loads
test('consumer signup', ...)    // register new email, verify redirect to /kyc
test('partner login', ...)      // login with acme@partner.com, verify dashboard loads
test('wrong password', ...)     // verify error message shown, no redirect
```

**`tests/e2e/02-kyc.spec.ts` — KYC Flow:**
```ts
test('basic KYC - Germany', ...)     // select DE, complete 5 steps, submit, verify status=pending
test('blocked country - Iran', ...)  // select IR, verify blocked screen appears, no submit button
test('standard KYC - Turkey', ...)   // select TR, verify selfie step appears
```

**`tests/e2e/03-buy.spec.ts` — Buy Transaction:**
```ts
test('buy BTC with EUR - alice', ...)  // login as alice, go to buy, enter 500, get quote, confirm, verify transaction appears in list
test('fee receipt visible', ...)       // confirm fee breakdown (platform fee, partner fee, network fee) all shown before confirm
```

**`tests/e2e/04-admin.spec.ts` — Admin Core:**
```ts
test('admin login', ...)                  // login redirect, verify dashboard loads
test('customer list loads', ...)          // navigate to /customers, verify table has rows
test('transaction detail', ...)           // click first transaction, verify side panel opens with correct data
test('kyc queue shows pending', ...)      // navigate to /kyc-queue, verify at least one pending row
```

**`tests/e2e/05-partner.spec.ts` — Partner Portal:**
```ts
test('partner sees only own data', ...)   // login as acme@partner.com, verify commissions only show acme transactions
test('end users table loads', ...)        // navigate to /end-users, verify table has rows
```

### Playwright helpers to add (`tests/e2e/helpers.ts`):
```ts
export async function loginAsAlice(page: Page)    // fills login form with alice@demo.com / 1234
export async function loginAsAdmin(page: Page)    // fills admin login
export async function loginAsAcme(page: Page)     // fills partner login
```

### Setup:
- Before all tests: ensure backend is running (tests should fail clearly if backend is offline, not with obscure errors)
- Add to `package.json`: `"test:e2e": "playwright test"` and `"test:e2e:ui": "playwright test --ui"`

**DoD:**
- [ ] `pnpm test:e2e` runs all 5 spec files without errors (assuming backend + all apps running)
- [ ] `tests/e2e/helpers.ts` exported and used in all specs
- [ ] Each spec file has at least 2 passing tests
- [ ] Mobile Chrome project runs auth + buy specs (the most critical flows)
- [ ] Test output shows clear failure message if backend is offline ("Backend not reachable at localhost:3000")

---

## Done Log (verified in source files)

- ✅ T-001: System Map rebuilt with Vue Flow (11 nodes, bank-simulator + market-simulator both present)
- ✅ T-019: System Map edge animations — `animateEdge()` implemented, fires on WS events, resets after 1500ms
- ✅ T-002: PriceSnapshot fix
- ✅ T-003: Backend B2B routes
- ✅ T-004: Admin DS components + B2B Clients page
- ✅ T-006/T-018: Sumsub Sim real KYC events
- ✅ T-011: Backend rewards, liquidity, fees, limits, auth/register routes
- ✅ T-012: Admin Liquidity, Rewards, SettingsFees, SettingsLimits pages
- ✅ T-013: CustomerActivityView exists (has placeholder — fix in PT-001)
- ✅ T-014: Consumer Send step 4 completion + Rewards screen
- ✅ T-015: Consumer Signup flow
- ✅ T-016: Partner Login, End Users, Widget Config view
- ✅ T-020: All 20 packages/ui components (AdminShell, Breadcrumb, ConfirmPanel, FilterTabs, InfoSection included)
- ✅ Schema: KYCLevel + CountryRisk models added to schema.prisma
- ✅ Admin: SettingsKycConfigView.vue built (real implementation, not placeholder)
- ✅ Admin: `/settings/kyc-config` route registered + nav link added
