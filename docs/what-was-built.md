# Prodigy Demo — What Was Built

> Verified state as of 2026-06-18. Cross-checked against actual source files, not builder claims.

---

## Apps at a Glance

| App | Port | Status |
|---|---|---|
| Backend API | 3000 | Core routes done; rewards/liquidity/fees/auth missing |
| Consumer | 5001 | Buy/Sell/KYC/Transactions done; Send step 4 = "Coming Soon"; no Signup, no Rewards |
| Admin | 5002 | 10 pages done; Settings = placeholder; no Rewards page, no Liquidity page |
| Sumsub Sim | 5003 | Fully working — approve/reject/manual-review all fire real WS events |
| System Map | 5004 | Vue Flow with 11 nodes + animated signals + event inspector |
| Widget | 5005 | Accepts ?b2bClientId=xxx, loads WidgetConfig, dark/light theme |
| Partner Portal | 5006 | Dashboard/Transactions/Commissions/API Keys; no Login, no End Users, no Widget Config view |
| Landing | 5010 | 12 pages × 3 themes (Swiss, Crypto, Fintech); CTAs not yet verified |

---

## Backend (localhost:3000)

**Routes confirmed working:**
- `GET /api/users` — list users with KYC status + balances
- `GET /api/users/:id` — customer detail
- `GET /api/transactions` — all transactions (filterable)
- `GET /api/transactions/:id` — transaction detail
- `GET /api/kyc` / `GET /api/kyc/:id` — KYC queue and detail
- `POST /api/kyc/:id/approve|reject|manual-review` — triggers WS events
- `GET /api/risk-reviews` / `GET /api/risk-reviews/:id`
- `GET /api/b2b-clients` / `GET /api/b2b-clients/:id`
- `GET /api/partner-commissions?b2bClientId=`
- `GET /api/widget-configs`
- `GET /api/ledger`
- `GET /api/system-events`
- `GET /api/market/prices` — live BTC/ETH prices via Market Simulator
- `GET /api/quotes` / `POST /api/quotes`
- KYC approval auto-provisions EUR bank account (IBAN assigned, `BANK_ACCOUNT_CREATED` event emitted)

**WebSocket:** single WS connection on ws://localhost:3000/ws, broadcasts all domain events to all connected clients.

**Missing routes (next sprint):**
- `GET/PATCH /api/settings/fees`
- `GET/PATCH /api/settings/limits`
- `GET /api/rewards`
- `GET /api/liquidity` + `POST /api/liquidity/simulate`
- `POST /api/auth/register`

---

## @prodigy/ui — Design System Components

**Built (15 total):**

| Component | Purpose |
|---|---|
| Button | primary / secondary / ghost / destructive; sm/md/lg; loading state |
| Badge | semantic color variants (success/warning/error/info/neutral) |
| StatusPill | maps 20+ status strings to colors (single source of truth) |
| Card | header/body/footer slots; loading skeleton; empty state |
| EmptyState | no-results vs truly-empty, optional action button |
| DataTable | TanStack Table v8 wrapper; sort; row click; loading skeleton; "N new" banner |
| FilterBar | search + dropdowns + date range + active filter chips + URL persistence |
| SidePanel | pushes content left (480px/560px); own URL param; NOT an overlay |
| DefinitionList | label-above-value pairs; null→—; wraps, never truncates |
| StatCard | KPI card: label, value, delta, deltaDirection |
| MoneyAmount | amount + currency; right-aligned; 8dp for crypto |
| CurrencyIcon | currency code → icon + color; fallback = letters in circle |
| LiveIndicator | green pulsing dot + "Live" label |
| RiskScore | score/100 + level label + color bar |
| PageHeader | breadcrumbs left, actions right, admin info |

**Still needed (5 missing):**
- `ConfirmPanel` — SidePanel for approve/reject flows with reason textarea
- `InfoSection` — titled group of DefinitionList + optional Edit button
- `FilterTabs` — tab switcher that sets URL `?type=` param (used in Settings > Fees)
- `Breadcrumb` — nav trail; last item = plain text, prior = `<a>`
- `AdminShell` — collapsible sidebar layout (240px ↔ 64px)

---

## Admin (localhost:5002)

**Pages built:**

| Route | View | State |
|---|---|---|
| `/` | Dashboard | Stat cards + recent system events |
| `/customers` | CustomersView | DataTable + KYC status filter |
| `/customers/:id` | UserDetailPanel | SidePanel with bank accounts + recent transactions |
| `/transactions` | TransactionsView | DataTable + filter |
| `/transactions/:id` | TransactionDetailPanel | SidePanel with Approve/Reject |
| `/kyc-queue` | KycQueueView | DataTable, live updates |
| `/kyc-queue/:id` | KycDetailPanel | SidePanel + Approve/Reject hitting real API |
| `/risk-queue` | RiskQueueView | DataTable + RiskScore column |
| `/risk-queue/:id` | RiskReviewDetailPanel | SidePanel + Approve/Flag |
| `/b2b-clients` | B2bClientsView | DataTable |
| `/widget-configs` | WidgetConfigsView | DataTable |
| `/commissions` | CommissionsView | DataTable + MoneyAmount columns |
| `/ledger` | LedgerView | DataTable |
| `/system-events` | SystemEventsView | Live DataTable |
| `/settings` | SettingsView | **PLACEHOLDER — "System settings coming soon."** |

**Nav links (sidebar):** Dashboard, Customers, Transactions, KYC Queue, Risk Queue, B2B Clients, Widget Configs, Commissions, Ledger, System Events, Settings.

**Missing pages (next sprint):**
- `/rewards` — RewardsView (read-only referral/reward table)
- `/liquidity` — LiquidityView (provider cards + simulation controls)
- `/settings/users` — Staff Users (replace placeholder)
- `/settings/fees` — Fee configuration with edit panels
- `/customers/:id/activity` — Customer Activity sub-page
- Nav links for Rewards and Liquidity not yet added

---

## Consumer App (localhost:5001)

**Pages built:**

| Route | View | State |
|---|---|---|
| `/login` | LoginView | Working |
| `/home` | HomeView | Balance + holdings; bank account card appears after KYC |
| `/buy` | BuyView | EUR→BTC quote → accept → complete |
| `/sell` | SellView | BTC→EUR quote → accept → complete |
| `/send` | SendView | Steps 1–3 work; **step 4 = "Coming Soon" (line 325)** |
| `/receive` | ReceiveView | Address + copy button |
| `/transactions` | TransactionsView | List |
| `/transactions/:id` | TransactionDetailView | Detail |
| `/kyc` | KycView | 3-step form → submit → WS status updates live |
| `/profile` | ProfileView | Logout button |

**Missing (next sprint):**
- `/signup` — SignupView (registration flow → auto-login → redirect to /kyc)
- `/rewards` — RewardsView (referral code, reward balance, history table)
- Send step 4 completion (POST /api/transactions → confirmation screen)

---

## Sumsub Simulator (localhost:5003)

**Fully working.** All three actions emit real WebSocket events:
- **Approve** → `KYC_APPROVED` → admin KYC queue updates; consumer /kyc shows approved
- **Reject** → `KYC_REJECTED` → consumer /kyc shows rejected + reason
- **Manual Review** → `KYC_MANUAL_REVIEW_REQUESTED` → appears in admin KYC queue

---

## System Map (localhost:5004)

**Built with Vue Flow.** 11 nodes wired:
- consumer-app, widget, admin, partner-portal, sumsub-simulator, risk-engine, market-simulator, bank-simulator, ledger, database + 1 more
- Animated signals on each incoming WS event (source → target pulse)
- Right-side event inspector: last 20 events with correlationId grouping
- Clicking correlationId highlights the full chain on the diagram

**Verify:** confirm bank-simulator and market-simulator nodes are present and animate on `MARKET_ORDER_EXECUTED` / `BANK_ACCOUNT_CREATED` events (T-019).

---

## Widget (localhost:5005)

- Accepts `?b2bClientId=xxx`, loads matching WidgetConfig from API
- Shows partner name + buy/sell/swap form
- Dark/light theme toggle

---

## Partner Portal (localhost:5006)

**Pages built:**

| Route | View | State |
|---|---|---|
| `/dashboard` | DashboardView | Working |
| `/transactions` | TransactionsView | Real data |
| `/commissions` | CommissionsView | Real commission data |
| `/api-keys` | ApiKeysView | Working |

**Missing (next sprint):**
- No login/auth guard — anyone can access all pages
- `/end-users` — users attributed to this B2B client
- `/widget-config` — read-only view of partner's WidgetConfig
- No payout history

---

## Landing (localhost:5010)

- 3 themes: Swiss Editorial, Crypto Dark, Fintech/Institutional
- 12 pages total (4 pages × 3 themes)
- TypeScript clean
- **Verify:** CTAs link to correct demo app URLs (T-017)

---

## What's Done vs. What Remains

**Done:**
- All core backend routes and WS infrastructure
- All primary admin list views + most entity detail panels
- Consumer buy/sell/receive/kyc/transactions flows
- Sumsub KYC simulation (real WS events)
- System Map (Vue Flow, animated)
- Widget with partner config
- Landing (3 themes)
- 15/20 planned @prodigy/ui components

**Remaining (see TASKS.md T-011 → T-022):**
- Backend: rewards, liquidity, fees, limits, auth/register endpoints
- Admin: Rewards page, Liquidity page, Settings (real impl), Customer Activity
- Consumer: Send completion, Sign-up, Rewards screen
- Partner: Login, End Users, Widget Config view
- Design system: 5 more components (ConfirmPanel, InfoSection, FilterTabs, Breadcrumb, AdminShell)
- WS audit across all live tables
- E2E demo flow test (12 steps)
