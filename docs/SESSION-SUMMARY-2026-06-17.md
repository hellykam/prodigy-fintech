# SESSION SUMMARY — Prodigy Fintech
**Date:** 2026-06-17
**For continuation in a new chat. Paste this entire document at the start.**

---

## Project identity

- **Name:** Prodigy Fintech (crypto exchange demo)
- **Goal:** Demo-ready in ~1 week. Fully faked, convincingly real.
- **Owner:** Designer, not a developer — agents do all code.
- **Root path:** `/Users/nellikam/Prodigy - fintech` ← space in path, always quote it
- **Permissions:** Agents have full permission to write files, run commands, install packages, no check-ins needed.

---

## Environment (confirmed working)

| Tool | Version | Status |
|------|---------|--------|
| Node | v20.20.2 | ✅ |
| pnpm | 10.33.0 | ✅ |
| Python 3.12 | 3.12.13 | ✅ (not used in project) |
| uv | 0.11.21 | ✅ (not used in project) |
| psql | 16.14 | ✅ (not used — SQLite instead) |
| git | 2.32.0 | ✅ |
| Docker | — | ❌ not installed, not needed |

---

## Stack (locked, do not change)

```
Frontend (all 6 apps):
  Vue 3.4 + TypeScript 5.4 + Vite 5
  Tailwind CSS v3 (NOT v4)
  Radix Vue / Reka UI (headless primitives)
  Pinia 2 + Vue Router 4
  TanStack Query v5 + TanStack Table v8
  Lucide Vue Next
  @vue-flow/core (system-map app only)
  vue-echarts + echarts (system-map + admin)
  MSW v2 (frontend API mocking)

Backend (single Fastify process, NO Docker):
  Node.js + TypeScript
  Fastify 4
  Prisma 5 + SQLite (file: backend/prisma/dev.db)
  Zod 3
  WebSocket (ws) via @fastify/websocket

Shared packages:
  @prodigy/ui      → packages/ui
  @prodigy/schemas → packages/schemas
  @prodigy/types   → packages/types

Testing:
  Vitest 1 (unit + component)
  Playwright (E2E, root-level config)
  MSW (frontend mocking)

Tooling:
  pnpm workspaces (NO Turborepo)
  Prettier + ESLint
  TypeScript strict
```

---

## What was completed this session

### ✅ Phase 0 — Full monorepo scaffold (DONE, verified working)

All verified: `pnpm install` (398 packages), `pnpm typecheck` (exit 0), backend `/health` endpoint responds, `pnpm db:reset` works.

**Structure created:**
```
/Users/nellikam/Prodigy - fintech/
  .agents/guides/           ← agent rules (DO NOT overwrite)
    README.md
    design-system.md
    build/design-system.md
  docs/                     ← project docs (DO NOT overwrite)
    PROJECT_CHARTER.md
    TECH_STACK.md
    AGENT_WORKFLOW.md
    PRODUCT_SCOPE.md
    DOMAIN_MODEL.md
    EVENT_MODEL.md
    ADMIN_UX_RULES.md
    TEST_STRATEGY.md
    RESEARCH_PLAN.md
    DEMO_SCRIPT.md
    decisions/ (5 ADRs)
    research/
      competitors/          ← 5 research files (DONE)
  apps/
    admin/                  → port 5002, @prodigy/admin
    consumer/               → port 5001, @prodigy/consumer (mobile-first)
    widget/                 → port 5005, @prodigy/widget
    partner/                → port 5006, @prodigy/partner
    sumsub-sim/             → port 5003, @prodigy/sumsub-sim
    system-map/             → port 5004, @prodigy/system-map
  backend/                  → port 3000, @prodigy/backend
    prisma/schema.prisma    ← full schema (all models)
    prisma/dev.db           ← SQLite database (seeded)
    src/
      index.ts              ← Fastify server + WebSocket
      db.ts                 ← Prisma client
      routes/health.ts
      simulators/events.ts  ← in-process event bus
      simulators/index.ts   ← registry (empty, Phase 2)
      seed/index.ts         ← full seed script
  packages/
    ui/
      tailwind.preset.ts    ← design tokens (colors, fonts, shadows)
      src/styles/globals.css
      src/lib/utils.ts      ← cn() helper
      src/components/
        Button.vue
        Badge.vue
        StatusPill.vue      ← maps all statuses to colors
        Card.vue
        EmptyState.vue
      src/index.ts
    schemas/
      src/ (user, transaction, kyc, quote, currency, events Zod schemas)
    types/
      src/ (api, system-map NodeName/EventName, demo credentials)
  tests/e2e/               ← Playwright target dir (empty)
  package.json             ← root scripts
  pnpm-workspace.yaml
  tsconfig.base.json
  playwright.config.ts
  README.md
```

### ✅ Phase 1 — Prisma schema + seed data (DONE)

**Seed verified:** 69 records across 13 tables.

| Entity | Count | Notes |
|--------|-------|-------|
| Currencies | 6 | EUR, USD, GBP, BTC, ETH, USDT |
| B2B Clients | 3 | Acme Corp (15%), Beta Inc (10%), Gamma Exchange (20%) |
| Widget Configs | 3 | One per B2B client |
| Users | 7 | alice, bob, carol, dave, admin, acme-partner, beta-partner |
| KYC Applicants | 4 | Alice=approved, Bob=pending, Carol=rejected, Dave=approved |
| Bank Accounts | 2 | Alice (€5k), Dave (€12k) + 3 platform accounts |
| Wallets | 3 | Alice BTC+ETH, Dave BTC |
| Ledger Accounts | 10 | Platform + user accounts |
| Transactions | 4 | 3 completed (Alice), 1 manual_review (Dave) |
| Ledger Entries | 12 | Simplified double-entry per transaction |
| Risk Reviews | 1 | Dave's manual_review transaction (open) |
| Partner Commissions | 3 | Acme Corp (Alice's transactions) |
| System Events | 11 | KYC, transaction lifecycle events |

**Demo credentials (all seeded):**

| Role | Email | Password |
|------|-------|----------|
| Consumer (approved KYC) | alice@demo.com | 1234 |
| Consumer (pending KYC) | bob@demo.com | 1234 |
| Consumer (rejected KYC) | carol@demo.com | 1234 |
| Consumer (high risk) | dave@demo.com | 1234 |
| Admin | admin@prodigy.com | admin1234 |
| Partner Acme | acme@partner.com | partner1234 |
| Partner Beta | beta@partner.com | partner1234 |

### ✅ Research — Competitors (DONE)

5 files in `docs/research/competitors/`:
- `coinify.md` — full Coinify deep dive
- `moonpay.md` — MoonPay analysis
- `ramp-transak.md` — Ramp + Transak combined
- `competitor-matrix.md` — full feature comparison matrix
- `widget-embed-patterns.md` — B2B embed patterns

**Top 5 industry pain points Prodigy must solve better:**
1. **Fee opacity** — competitors hide fees behind login; Prodigy shows full breakdown pre-auth
2. **KYC black box** — no progress updates; Prodigy shows real-time step + time estimate
3. **Transaction silence** — no status after submit; Prodigy has live timeline + WebSocket updates
4. **Support failure during holds** — Prodigy has admin manual review with direct action
5. **Discovery shock (geo/limits)** — detect eligibility on widget load, show in step 1 before user invests time

**Biggest B2B differentiator to build:** Transak is the only competitor with self-serve fee config in partner dashboard. Prodigy should match this. Transak also has KYC Reliance (bring your own Sumsub token) — only one in market.

---

## What is NOT done yet — full backlog

### 🔴 Phase 2 — Backend simulators (NEXT PRIORITY)

Nothing built yet. The `backend/src/simulators/` folder has only `events.ts` (event bus) and `index.ts` (empty registry).

Need to build in `backend/src/simulators/`:
- `market.ts` — live BTC/ETH/USDT prices, bid/ask, spread, order execution, failure modes
- `bank.ts` — IBAN creation, fiat movements, 3 platform accounts, settlement events
- `kyc.ts` — applicant lifecycle, status transitions, webhook-style events
- `risk.ts` — scoring engine (rules: velocity, amount threshold, new user, high risk country, sanctioned wallet), auto-approve / manual-review / auto-reject
- `ledger.ts` — double-entry posting engine for every transaction step
- `commission.ts` — partner revenue share on transaction complete
- `quotes.ts` — rate calculation, spread, fee breakdown, expiry

All simulators emit system events via `eventBus.emit()` defined in `simulators/events.ts`.

### 🔴 Phase 3 — Admin app (NOT started)

Empty `HomeView.vue` placeholder only. Need to build:
- Shell layout (sidebar nav + content area)
- Dashboard page
- Customers table (full-width)
- Customer entity detail page
- Transactions table + detail
- KYC Review Queue (table)
- Risk/Manual Review Queue (table + detail)
- B2B Clients table + detail
- Widget Config page
- Ledger Entries table
- System Events table
- Live WebSocket updates throughout

**Admin UX absolute rules (from `docs/ADMIN_UX_RULES.md`):**
- Only 3 page types: Dashboard / Full-width table / Entity detail
- No tabs anywhere
- No modals — side panels only (push content, have URL)
- All text: top-left aligned, never truncated with ellipsis
- All numbers: top-right aligned
- Inline icons always `display: inline` / `inline-flex`, never `block`
- Every page/panel has its own URL

### 🔴 Phase 4 — Consumer App (NOT started)

Mobile-first. Empty placeholder only. Screens needed:
- Onboarding + anonymous demo quote
- Sign up (email + password 1234)
- KYC submission form
- KYC status screen (pending/approved/rejected)
- Balances (fiat + crypto)
- Convert screen (with live quote, fee breakdown visible BEFORE confirmation)
- Transaction history
- Rewards/referral screen

### 🔴 Phase 5 — Sumsub Simulator (NOT started)

Single page:
- List of KYC applicants
- Applicant details panel
- Approve / Reject / Request manual review actions
- Emits events via backend API → WebSocket → admin + consumer react

### 🔴 Phase 6 — Widget (NOT started)

Embeddable iframe:
- Config loader by B2B client ID
- Quote flow
- Signup/continue flow
- KYC status integration
- Conversion flow
- "Copy embed code" demo page

### 🔴 Phase 7 — Partner Portal (NOT started)

Desktop-first:
- Login with partner credentials
- Dashboard: revenue, fees paid, transaction count
- Transactions table (partner-scoped only)
- End users table
- Widget config read-only summary

### 🔴 Phase 8 — System Map (NOT started)

Vue Flow diagram:
- 10 nodes: consumer-app, widget, admin, partner-portal, sumsub-simulator, risk-engine, market-simulator, bank-simulator, ledger, database
- Animated signal on edges as events fire
- Event inspector panel (right side)
- Replay last transaction flow
- Node status badges: idle / processing / waiting / rejected / completed

### 🔴 Phase 9 — Analytics simulator (NOT started)

PostHog-style fake:
- Event capture (page_viewed, quote_requested, form_error, rage_click, etc.)
- Session tracking
- Funnel calculation
- Admin analytics table

---

## How to start the project

```bash
cd "/Users/nellikam/Prodigy - fintech"

# First time only
pnpm install
pnpm db:reset   # creates + seeds SQLite database

# Start everything
pnpm dev        # starts all 6 apps + backend in parallel

# Or individually
pnpm dev:backend   # http://localhost:3000
pnpm dev:admin     # http://localhost:5002
pnpm dev:consumer  # http://localhost:5001
pnpm dev:widget    # http://localhost:5005
pnpm dev:partner   # http://localhost:5006
pnpm dev:sumsub    # http://localhost:5003
pnpm dev:sysmap    # http://localhost:5004
```

---

## Key architectural decisions (do not revisit)

1. **No Docker** — all simulators run inside the Fastify Node process
2. **SQLite** (not Postgres) — zero server, `pnpm db:reset` is instant, Prisma upgrades to Postgres with 1 line later
3. **Node.js backend** (not Python) — shared TypeScript types between FE+BE
4. **No Turborepo** — pnpm workspaces `--parallel -r` is enough
5. **Shared tokens in `packages/ui/tailwind.preset.ts`** — all apps extend this preset, no invented colors
6. **Double-entry ledger** — all money through `LedgerEntry`, never direct balance mutation
7. **Every action emits a SystemEvent** — correlationId ties a full transaction chain together
8. **Every page/panel has a URL** — no stateful modals

---

## Agent rules (read `.agents/guides/` in full before coding)

- Use only components from `packages/ui` — never one-off styled divs
- Use only design tokens — never hardcoded hex, `text-[#xxx]`, `mt-[13px]`
- No modals in admin — side panels only
- No `truncate`, `line-clamp`, `overflow-hidden` on text without approval
- Inline icons: always `inline-flex`, never `block`
- Backend connects to real DB — no hardcoded arrays in components
- Every feature emits system events + analytics events
- Tests alongside features, not after

---

## Recommended next prompt for new chat

```
Continue building the Prodigy Fintech demo project.

Project root: /Users/nellikam/Prodigy - fintech

Read these files before doing anything:
1. .agents/guides/README.md
2. .agents/guides/design-system.md
3. docs/PROJECT_CHARTER.md
4. docs/TECH_STACK.md
5. docs/AGENT_WORKFLOW.md
6. docs/DOMAIN_MODEL.md
7. docs/EVENT_MODEL.md

Phase 0 (scaffold) and Phase 1 (Prisma schema + seed) are complete and verified.
Research is complete in docs/research/competitors/.

Start Phase 2: Backend Simulators.
Build all simulator modules in backend/src/simulators/:
- market.ts (live prices, bid/ask, order execution)
- bank.ts (IBAN, fiat movements, 3 platform accounts)
- kyc.ts (applicant lifecycle, webhook events)
- risk.ts (scoring engine, manual review, auto decisions)
- ledger.ts (double-entry posting)
- commission.ts (partner revenue share)
- quotes.ts (rate + fee calculation, expiry)

After Phase 2, move immediately to Phase 3 (Admin app) in parallel with
Phase 4 (Consumer app), using separate agents for each.

Full permissions: write files, run commands, install packages, use agent team.
No check-ins needed.
```
