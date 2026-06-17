# Prodigy Fintech — Product Scope

## Six applications

### 1. Admin (apps/admin)

Internal operations dashboard. Desktop-first.

Page types (strictly only these three):
1. Dashboard — overview metrics, live event feed
2. Full-width table/list — customers, transactions, KYC queue, risk queue, ledger entries, system events
3. Entity detail — customer, transaction, KYC applicant, B2B client, widget config

Key sections:
- Dashboard
- Customers (end users)
- Transactions
- KYC Review Queue
- Risk / Manual Review Queue
- B2B Clients
- Widget Configs
- Ledger Entries
- Partner Commissions
- System Events
- Analytics Overview

### 2. Consumer App (apps/consumer)

Mobile-first web app. Screens:
- Onboarding (anonymous demo transaction)
- Sign up (2 demo emails + password 1234)
- KYC submission
- KYC status (pending / approved / rejected)
- Balances (fiat + crypto)
- Convert (crypto↔fiat, fiat↔fiat, crypto↔crypto)
- Transaction history
- Rewards / referral

### 3. Widget (apps/widget)

Embeddable iframe. Configurable per B2B client.
- Quote flow
- Sign up / continue flow
- KYC status
- Conversion flow
- "Copy one line of code" embed instructions
- Configurable: theme, allowed currencies, fees, limits, redirect URL

### 4. Partner Portal (apps/partner)

B2B client self-service. Desktop-first.
- Login (separate demo credentials)
- Dashboard: revenue earned, fees paid, transaction count
- Transactions table (only their attributed transactions)
- End users table
- Widget config (read-only summary)
- Payout history

### 5. Sumsub Simulator (apps/sumsub-sim)

Single page:
- List of KYC applicants
- Select applicant to see details
- Actions: Approve / Reject / Request manual review
- Emits webhook-style events to the backend
- Admin and consumer app react in real time

### 6. System Map (apps/system-map)

Vue Flow diagram:
- Nodes: Consumer App, Widget, Admin, Partner Portal, KYC Simulator, Risk Engine, Market Simulator, Bank Simulator, Ledger, Database
- Animated signal/pulse moves along edges as events fire
- Event inspector panel (right side): shows last N events
- Replay last transaction flow
- Node status: idle / processing / waiting-admin / rejected / completed
- Color-coded paths: normal / manual-review / rejected / completed

## Backend simulators

All run inside the Fastify process. No Docker. No external services.

| Simulator | What it fakes |
|-----------|--------------|
| Market | Live BTC/ETH/USDT prices, bid/ask, slippage, order execution, failures |
| Bank | IBAN creation, 3 platform accounts, fiat movements, settlements |
| KYC | Applicant lifecycle, webhook events |
| Risk Engine | Scoring rules, manual review queue, auto-approve/reject |
| Ledger | Double-entry posting, balance derivation |
| Commission | Partner revenue share calculation |
| Analytics | Event capture, session tracking, funnel calculation |
| System Events | Event bus, WebSocket broadcast to admin + system map |

## Demo credentials

| Role | Email | Password |
|------|-------|----------|
| Consumer (approved KYC) | alice@demo.com | 1234 |
| Consumer (pending KYC) | bob@demo.com | 1234 |
| Consumer (rejected KYC) | carol@demo.com | 1234 |
| Consumer (high risk) | dave@demo.com | 1234 |
| Admin | admin@prodigy.com | admin1234 |
| Partner (Acme Corp) | acme@partner.com | partner1234 |
| Partner (Beta Inc) | beta@partner.com | partner1234 |

## B2B demo clients

1. Acme Corp — 15% commission share, EUR/BTC widget
2. Beta Inc — 10% commission share, USD/ETH/USDT widget
3. Gamma Exchange — 20% commission share, multi-currency widget
