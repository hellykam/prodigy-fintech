# KYC Flow + Bank Account — Full Spec

> Source of truth for T-023 and T-024.
> Based on: Sumsub standard flow, FATF country risk model, existing schema.prisma + kyc.ts + bank.ts.

---

## 1. What Already Exists (don't rebuild)

| Thing | Where | State |
|---|---|---|
| `KYCApplicant` model | schema.prisma | Has `levelName` field but it's always `'basic-kyc-level'` — hardcoded |
| `BankAccount` model | schema.prisma | Has IBAN, currency, balance — missing BIC, sort code, account number, daily limit |
| `createBankAccount()` | simulators/bank.ts | Works — generates IBAN, emits events. IBAN format is `DE{xx}PROD{18digits}` |
| `approveApplicant()` | simulators/kyc.ts | Calls `createBankAccount()` on first approval — good |
| Consumer KYC form | apps/consumer/src/views/KycView.vue | 3-step form: personal info → country/doc type → review. No liveness, no address, no source of funds |
| Sumsub Sim | apps/sumsub-sim | Approve/reject/manual-review buttons work, emit real WS events |

**Key gap:** `levelName` is set but never used to drive behavior. There are no KYC levels, no country risk rules, no enhanced flow steps.

---

## 2. KYC Level System — How Sumsub Actually Works

Sumsub uses named **verification levels**. Each level = a set of required steps. When a user starts KYC, their level is determined by:
1. **Country risk** (highest weight)
2. **Transaction amount** (if user wants to send >€X, must upgrade)
3. **Manual override** (admin can bump a user to a higher level)

### The Three Levels for Prodigy Demo

#### Level 1 — Basic (`basic-kyc-level`)
**Who:** Low-risk countries (EU/EEA, UK, US, CA, AU, SG, JP, CH, NO)
**Steps:**
1. Personal info (first name, last name, date of birth)
2. Country + document type selection
3. Document upload (simulated — user picks type, "uploads" it)
4. Auto-review: instant result (90% approve, 5% manual, 5% reject in sim)

**Unlocks:** Daily transaction limit €1,000 · Monthly limit €5,000

#### Level 2 — Standard (`standard-kyc-level`)
**Who:** Medium-risk countries (Turkey, UAE, South Africa, Mexico, Brazil, India, Thailand, Philippines) + anyone who wants to transact >€1,000
**Steps:**
1. Everything in Level 1 +
2. Selfie / liveness check (simulated — user clicks "Take selfie" button, sim auto-processes)
3. Face match result shown (always passes in sim unless Sumsub sim overrides)

**Unlocks:** Daily limit €10,000 · Monthly limit €50,000

#### Level 3 — Enhanced (`enhanced-kyc-level`)
**Who:** High-risk countries (Russia, Ukraine (flagged), Kazakhstan, Belarus, China, Vietnam) + PEP declarations + amounts >€10,000
**Steps:**
1. Everything in Level 2 +
2. Address proof (utility bill / bank statement — simulated upload)
3. Source of funds declaration (dropdown: employment / business income / investments / inheritance / other)
4. Source of funds amount range (€0–50K / €50K–200K / €200K+)
5. PEP declaration: "Are you or a close family member a Politically Exposed Person?"
6. If PEP=Yes → always goes to manual_review
7. Manual review by admin before approval

**Unlocks:** No daily limit · Monthly limit €500,000

#### Blocked Countries
**Who:** OFAC/EU sanctions list countries
**Countries for demo:** Iran, North Korea, Cuba, Syria, Myanmar
**Behavior:**
- When user selects blocked country: form shows error "We cannot provide services in your country of residence. This is required by regulatory law."
- No KYC applicant created
- `KYC_COUNTRY_BLOCKED` event emitted

---

## 3. Country Risk Classification

Stored as `CountryRisk` config in DB (admin-editable):

| Risk Level | Countries (examples) | Required Level | Blocked |
|---|---|---|---|
| `low` | DE, FR, GB, US, CA, AU, CH, SE, NO, DK, NL, BE, AT, IE, NZ, FI, PT, ES, IT, SG, JP | Level 1 | No |
| `medium` | TR, AE, ZA, MX, BR, IN, TH, PH, CO, PE, AR, ID | Level 2 | No |
| `high` | RU, UA, KZ, BY, CN, VN, PK, BD, NG, GH, KE | Level 3 | No |
| `blocked` | IR, KP, CU, SY, MM, YE, LY, SD | — | Yes |

**Admin can change these.** The list above is the default seed.

---

## 4. New DB Models Required

### `KYCLevel` (replaces hardcoded `'basic-kyc-level'`)
```prisma
model KYCLevel {
  id              String   @id  // e.g. 'basic-kyc-level'
  name            String   // "Basic", "Standard", "Enhanced"
  description     String
  dailyLimitEur   Float    // 1000, 10000, -1 (no limit)
  monthlyLimitEur Float    // 5000, 50000, 500000
  steps           String   // JSON array of step names
  isActive        Boolean  @default(true)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

### `CountryRisk`
```prisma
model CountryRisk {
  countryCode    String  @id   // ISO 3166-1 alpha-2
  countryName    String
  riskLevel      String        // 'low' | 'medium' | 'high' | 'blocked'
  requiredLevel  String?       // FK → KYCLevel.id (null if blocked)
  isActive       Boolean @default(true)
  updatedBy      String?
  updatedAt      DateTime @updatedAt
}
```

### `KYCApplicant` — add fields
```prisma
// Add to existing KYCApplicant:
levelName         String   @default("basic-kyc-level")  // ← already exists, keep
requiredSteps     String   @default("[]")               // JSON: ["personal_info", "document", "selfie"]
completedSteps    String   @default("[]")               // JSON: ["personal_info", "document"]
sourceOfFunds     String?                               // e.g. "employment"
sourceOfFundsRange String?                              // e.g. "50k_200k"
pepDeclaration    Boolean  @default(false)
addressProof      Boolean  @default(false)              // true = "uploaded"
selfieCompleted   Boolean  @default(false)
countryRisk       String?                               // risk level at time of submission
```

### `BankAccount` — add fields
```prisma
// Add to existing BankAccount:
bic              String   @default("PRODDE77XXX")
sortCode         String?                // GBP only: "12-34-56"
accountNumber    String?                // GBP only: "12345678"
accountType      String   @default("current")
dailyLimitEur    Float    @default(1000)
monthlyLimitEur  Float    @default(5000)
kycLevelId       String?               // which KYC level granted this account
swift            String?               // full SWIFT address for international wires
```

---

## 5. Virtual Bank Entity

Add `VirtualBank` as in-memory config (not DB) in `simulators/bank.ts`:

```ts
export const VIRTUAL_BANK = {
  name: 'Prodigy Bank Simulator',
  legalName: 'Prodigy Financial Services (Demo) B.V.',
  address: 'Strawinskylaan 3105, 1077 ZX Amsterdam, Netherlands',
  regulatoryRef: 'Demo only — not a real regulated entity',
  currencies: {
    EUR: {
      bic: 'PRODDE77XXX',                    // fake SWIFT/BIC
      ibanCountryPrefix: 'DE',
      sepaEnabled: true,
    },
    GBP: {
      bic: 'PRODGB22XXX',
      ibanCountryPrefix: 'GB',
      sortCodePrefix: '12-34',               // virtual sort code base
      fasterPaymentsEnabled: true,
    },
    USD: {
      bic: 'PRODUSD0XXX',
      ibanCountryPrefix: 'US',
      abaRoutingNumber: '021000021',         // fake ABA routing
      swiftEnabled: true,
    },
  },
}
```

### IBAN Generation Rules (update existing `generateIBAN()`):
- EUR: `DE{checkDigits}{bankCode:8digits}{accountNumber:10digits}` → `PRODDE77XXX` as BIC
- GBP: `GB{checkDigits}PROD{sortCode6digits}{accountNumber8digits}` → sort code `12-34-{random2}`
- USD: no IBAN (use routing + account number instead)

### SWIFT/BIC in `createBankAccount()`:
After creating bank account, include BIC in the `IBAN_ASSIGNED` event payload and in the returned object.

---

## 6. KYC Engine — `simulators/kycEngine.ts` (new file)

This is the rules engine that determines which level to apply when KYC starts.

```ts
interface LevelDecision {
  levelId: string
  steps: KYCStep[]
  reason: string
}

type KYCStep =
  | 'personal_info'
  | 'document_upload'
  | 'selfie'
  | 'address_proof'
  | 'source_of_funds'
  | 'pep_declaration'

async function determineLevel(userId: string, country: string): Promise<LevelDecision>
```

**Logic:**
1. Look up `CountryRisk` for the country code
2. If `riskLevel === 'blocked'` → throw `CountryBlockedError`
3. Get required `KYCLevel` from `CountryRisk.requiredLevel`
4. Check user's transaction history total → if >80% of current level's daily limit → suggest upgrade
5. Return `{ levelId, steps, reason }`

---

## 7. Consumer KYC Form — New Multi-Step Flow

Replace the current 3-step form with a dynamic flow based on determined level.

### Step Rendering Logic
```
Step 1: Personal Info          ← always required
Step 2: Country Selection      ← always required
  → if blocked country: show BlockedCountryScreen, stop
  → if not blocked: call determineLevel() → sets levelId + steps
Step 3: Document Type + Upload ← always required
Step 4: Selfie (if standard/enhanced level)
  → "Take selfie" button → simulated: 2s loading → "Matched ✓"
Step 5: Address Proof (if enhanced level)
  → upload button (simulated) → shows "utility_bill.pdf" as uploaded filename
Step 6: Source of Funds (if enhanced level)
  → dropdown: Employment / Business Income / Investments / Inheritance / Other
  → amount range: <€50K / €50K–€200K / €200K+
Step 7: PEP Declaration (if enhanced level)
  → "Are you or a close family member a Politically Exposed Person?" Yes/No
  → if Yes: "Your application will be manually reviewed" warning shown
Step 8: Review & Submit
  → Shows summary of all collected info
  → "Submit for verification" button
```

### UI Pattern
- Progress bar shows current step / total steps (total changes based on level)
- Level badge shown during form: "Basic Verification" / "Standard Verification" / "Enhanced Verification"
- Level explanation tooltip: "Why Enhanced? Your country of residence requires additional verification."

---

## 8. Sumsub Simulator — Level-Aware Controls

The Sumsub Sim at localhost:5003 should show the applicant's level and what steps were completed.

### Applicant Detail Panel upgrades:
- Show: KYC Level badge (Basic / Standard / Enhanced)
- Show: completed steps as checklist
- Show: PEP flag if declared
- Show: country risk level
- Actions: Approve / Reject / Manual Review (already exist)
- Add: "Upgrade to Enhanced" button — sets applicant's levelName to `enhanced-kyc-level`, sets additional required steps
- Add: "Flag as PEP" button — marks pepDeclaration=true, forces manual_review

---

## 9. Admin — KYC Configuration Page

**Route:** `/settings/kyc-config` (add to Settings section)

### Sub-section 1: KYC Levels
- Table: level ID, name, daily limit, monthly limit, steps list, status (active/inactive)
- Edit row → SidePanel: edit daily/monthly limits per level (steps are not editable in demo — too complex)

### Sub-section 2: Country Risk Rules
- FilterTabs: Low Risk | Medium Risk | High Risk | Blocked
- Table per tab: Country flag emoji, Country name, Country code, KYC Level required, Last updated by, Last updated at
- Row click → SidePanel: change risk level (dropdown: low/medium/high/blocked)
- Changes take effect immediately (no deploy needed)
- "Reset to defaults" button → reseeds from default list

### Sub-section 3: Flow Rules (read-only display for demo)
- Static table showing auto-upgrade triggers:
  - "Transaction >€1,000 → prompt Level 2 upgrade"
  - "Transaction >€10,000 → require Level 3 before proceeding"
  - "PEP declared → always manual review"
  - "Blocked country → reject at form entry"

---

## 10. Admin — KYC Queue Upgrades

Add to existing KYC Queue view (`/admin/kyc-queue`):

**New columns:**
- KYC Level (badge: Basic / Standard / Enhanced)
- Country + risk emoji (🟢 low / 🟡 medium / 🔴 high)
- Completed steps count (e.g. "4/5")
- PEP flag icon (red exclamation if pepDeclaration=true)

**FilterTabs:** All | Basic | Standard | Enhanced | PEP Flagged

**Detail Panel additions:**
- Completed steps list (checkmarks)
- Source of funds if Enhanced
- PEP declaration status
- Country risk classification

---

## 11. Event Model — New Events

```
KYC_LEVEL_DETERMINED     source: kyc-engine     → when level is assigned on submission
KYC_COUNTRY_BLOCKED      source: kyc-engine     → when blocked country selected
KYC_STEP_COMPLETED       source: consumer-app   → when each step is done (one event per step)
KYC_SELFIE_PASSED        source: kyc-simulator  → selfie matched
KYC_ADDRESS_VERIFIED     source: kyc-simulator  → address proof accepted
KYC_PEP_FLAGGED          source: kyc-simulator  → PEP declared, goes to manual review
KYC_LEVEL_UPGRADED       source: admin          → admin manually upgraded a user's level
IBAN_ASSIGNED (existing) → add BIC + accountType to payload
```

---

## 12. API Endpoints — New/Updated

### New:
- `GET /api/kyc/levels` — list all KYC levels with their steps and limits
- `GET /api/kyc/country-risk` — list all country risk rules
- `PATCH /api/kyc/country-risk/:code` — update risk level for a country (admin only)
- `POST /api/kyc/applicants/:id/upgrade-level` — body: `{ levelId }` — upgrade to higher level
- `GET /api/bank/config` — return `VIRTUAL_BANK` config (for display in consumer app)

### Updated:
- `POST /api/kyc/applicants` — now calls `determineLevel()`, sets `levelId` + `requiredSteps`
- `GET /api/kyc/applicants/:id` — now returns `completedSteps`, `countryRisk`, `levelName`
- `GET /api/bank/accounts/:userId` — now returns `bic`, `sortCode`, `accountNumber`, `dailyLimitEur`

---

## 13. Consumer App — IBAN Display (post-KYC)

After KYC approval, Home screen shows a bank account card:

```
┌─────────────────────────────────────────┐
│  Prodigy Bank Simulator                  │
│  DE29 PROD 0000 0000 0001 23   EUR       │
│  BIC: PRODDE77XXX                        │
│  Account type: Current                   │
│  Daily limit: €1,000                     │
│  ─────────────────────────────────────   │
│  Balance: €0.00                          │
│  [Copy IBAN]  [Share details]            │
└─────────────────────────────────────────┘
```

- "Copy IBAN" → copies formatted IBAN to clipboard
- "Share details" → opens a sheet with all bank details (for SEPA transfer instructions)
- Balance updates in real time via WS (`TRANSACTION_COMPLETED` events)
