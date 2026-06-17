# Admin Panel Architecture — VIXI / Risely

> **Source:** Parsed from the FigJam board "Admin Velmie + Risely diagram".
> Board title: *"Making Velmie Admin the way it works for vixi/Risely"*.
> This document captures all confirmed features, entity structures, table columns, form fields, flows, and logic from that board.
> It is intended as an engineering reference for building the new admin panel.
> Items marked TBD, "ask PO", or "discuss later" on the board are intentionally omitted.

---

## Table of Contents

1. [Navigation Structure](#1-navigation-structure)
2. [Dashboard](#2-dashboard)
3. [Clients](#3-clients)
   - [All Clients Table](#all-clients-table)
   - [Client Detail Page](#client-detail-page)
   - [KYC Requests](#kyc-requests)
   - [Expiring Docs](#expiring-docs)
   - [Client Groups](#client-groups)
4. [Transactions](#4-transactions)
   - [Sub-tables / Tabs](#sub-tables--tabs)
   - [All Transactions — Columns](#all-transactions--columns)
   - [Search, Filter, and Sort](#search-filter-and-sort)
   - [Create Transaction (Manual)](#create-transaction-manual)
   - [Transaction Entity Page](#transaction-entity-page)
   - [Transaction Flow](#transaction-flow)
5. [Wallets (Accounts)](#5-wallets-accounts)
   - [All Wallets Table](#all-wallets-table)
   - [Wallet Entity Page](#wallet-entity-page)
   - [Wallet Actions](#wallet-actions)
   - [Wallet Admin Config](#wallet-admin-config)
6. [Cards](#6-cards)
   - [All Cards Table](#all-cards-table)
   - [Card Entity Page](#card-entity-page)
   - [Card Holders](#card-holders)
   - [Clearing Logs](#clearing-logs)
   - [Card & Wallet Type Settings](#card--wallet-type-settings)
7. [Reports](#7-reports)
8. [Settings](#8-settings)
   - [System Config](#system-config)
   - [Fees](#fees)
   - [Exchange Rates](#exchange-rates)
   - [Currencies](#currencies)
   - [Security](#security)
   - [API](#api)
   - [Connectors](#connectors)
   - [Logs](#logs)
   - [Tiers / KYC](#tiers--kyc)
   - [Staff Role Permissions](#staff-role-permissions)
   - [Staff Users](#staff-users)
   - [Referral Program & Rewards](#referral-program--rewards)
9. [Liquidity](#9-liquidity)
10. [Communication](#10-communication)

---

## 1. Navigation Structure

The admin panel has a persistent left sidebar. Top-level sections:

| # | Label | Notes |
|---|-------|-------|
| 1 | Dashboard | Overview and summary |
| 2 | Clients | Includes KYC Requests sub-section |
| 3 | Transactions | Multiple sub-tables (tabs) |
| 4 | Wallets | Labeled "Accounts" internally |
| 5 | Cards | All issued cards |
| 6 | Reports | Per-user and system-level reports |
| 7 | Settings | Config, fees, connectors, staff, etc. |
| 8 | Liquidity | Company-level financial health |
| 9 | Communication | News, legal docs, helpdesk, notifications |

---

## 2. Dashboard

The dashboard provides a financial summary and quick-access entry points for the logged-in admin.

**Balance Summary:**
- Total balance aggregated across all accounts, displayed in EUR (e.g. `€18,549.97`)
- Sub-breakdown by account type, each showing its IBAN:
  - EUR Account
  - GBP Account
  - USD Account
  - CHF Account

**My Cards:**
- Horizontal list of cards; each card shows its last 4 digits

**Recent Activity Table:**

| Column | Notes |
|--------|-------|
| Description | Transaction description |
| Debit / Credit | Amount |
| Date | Timestamp |
| Status | e.g. "Executed" |
| Account | Currency flag + account name |

- Dropdown filter on Recent Activity (e.g. filter by Report, Accounts)

**Actions & Counters:**
- **Transfers** — primary action button
- **Pending tasks counter** — e.g. "#53 tasks"

---

## 3. Clients

### All Clients Table

| Column | Notes |
|--------|-------|
| Verification status | From Sumsub |
| Internal ID | Platform-assigned ID |
| Updated | Timestamp of last update |
| Last transaction | Timestamp + link to transaction |
| Request docs | Compliance action — triggers Verification Center workflow |
| Doc status | `expired` / `requested` / `OK` |
| Client group | With tooltip showing group description |
| Last note | Preview of most recent internal note |
| Total balance | Aggregated in USD |
| # Wallets | Count of wallets |
| # Transactions | Count of transactions |
| Pending? | Status indicator for pending actions |
| Risk score | Client-level risk score |

---

### Client Detail Page

**Information sections:**

- Personal info
- All transactions (table filtered to this client)
- All rewards
- All wallets
- Documents: view, request, upload
- Internal docs
- Risk score
- CSV export
- Security: auto-logout toggle, login history, devices list

**Admin actions available on this page:**

| Action | Description |
|--------|-------------|
| Assign to admin user | Assigns this client to a specific admin |
| Create transaction | Opens create-transaction form pre-filled with this client |
| Close KYC request | Closes any open KYC request for this client |
| New wallet | Creates a new wallet assigned to this client |
| New card | Creates a new card assigned to this client |
| Block amount | Places a hold/block on a wallet balance |
| Activity log | Full audit log for this client *(nice-to-have)* |

---

### KYC Requests

Sub-section under Clients.

- Displays Sumsub verification status per request
- Review process flow (view docs, accept/reject)
- Assign request to an admin user
- Clicking a client name navigates to that client's detail page
- Button to test Sumsub connection

---

### Expiring Docs

Separate table/view listing documents that are expiring soon. Enables proactive compliance action before docs expire.

---

### Client Groups

Formerly called "User Groups". Used for segmentation of clients.

- Each group entry shows:
  - Total users in the group
  - Link to All Clients table pre-filtered to that group
- Tooltip on the group name shows the group description (also surfaced in All Clients table)

---

## 4. Transactions

### Sub-tables / Tabs

The Transactions section is split into 11 tabs. Tab 1 is the primary view.

| Tab | Name | Notes |
|-----|------|-------|
| 1 | All Transactions | All transaction types in one view |
| 2 | Manual Transactions | Admin-created transactions only |
| 3 | Transfer Requests | Client-initiated transfer requests |
| 4 | Fiat Transactions | Standard fiat movements |
| 5 | Fiat Transactions (Swaps) | Fiat-to-fiat swaps |
| 6 | Crypto Transactions | Standard crypto movements |
| 7 | Crypto Swaps | Crypto-to-crypto or crypto-to-fiat swaps |
| 8 | Card Transactions | Transactions originating from cards |
| 9 | Outgoing Wire Transfer | SEPA / wire outbound |
| 10 | Interests | Interest credits |
| 11 | Revenue | Platform fees collected |

---

### All Transactions — Columns

| Column | Notes |
|--------|-------|
| ID | Internal ID / external ID / BAAS provider ID |
| Type | Manual (includes admin name) or auto (system-generated) |
| Currency + network | Currency code + BAAS provider or crypto network |
| Amount (exact) | Amount in the transaction's native currency |
| Amount (USD) | Equivalent amount in USD |
| Exchange rate | Currency-to-currency rate; supports any pair |
| Fee | Platform fee + provider fee, broken out |
| Rewards | Rewards used for fee reduction, or rewards received |
| From | Client name + REF ID, Card, Wallet (with wallet type) |
| To | Client name + REF ID, Card, Wallet (with wallet type) |
| Description | Free-text transaction description |
| Status | Current transaction status |
| Created | Creation timestamp |
| Updated | Last-updated timestamp |
| View | Link/button to transaction entity page |
| Risk score | Transaction-level risk score + client-level risk score |

---

### Search, Filter, and Sort

All search, filter, and sort operations must be **server-side** (not limited to the current page).

**Search by:**
- Internal ID
- External ID
- BAAS ID
- IBAN
- Crypto address
- Client name
- Client ID

**Filter by:**
- Transaction type
- Status
- Provider
- Network
- BAAS
- Date range (start + end timestamps)

**Sort by:**
- Created / Updated timestamps
- Amount in native currency
- Amount in USD
- Transaction type
- Docs request status
- Risk score

**Export:**
- CSV export of filtered/sorted results (subject to staff permissions)

---

### Create Transaction (Manual)

Admin-initiated transaction types available from the create form:

| Type | Description |
|------|-------------|
| Debit wallet | Admin manually debits a selected client wallet |
| Credit wallet | Admin manually credits a selected client wallet |
| A2A (wallet → wallet) | Transfer between two wallets; same or different clients |
| A2A (client → client) | Transfer between two clients |
| Outgoing wire transfer | Client wallet → external bank account |
| Outgoing crypto transfer | Client wallet → external crypto address/network |

---

### Transaction Entity Page

Single transaction detail view. Contains all columns from the All Transactions table, expanded, plus:

- Client info (linked to client detail page)
- Wallet info (linked to wallet entity page)
- Fees breakdown (platform fee + provider fee itemised)
- Rewards applied (amount + rule used)
- Compliance docs request status
- Maturity dates (where applicable, e.g. interest transactions)

---

### Transaction Flow

```
          ┌─────────────────────────────────┐
          │        Transaction Created      │
          └────────────┬────────────────────┘
                       │
          ┌────────────▼────────────────────┐
          │         KYT Check               │  (both IN and OUT directions)
          └────────────┬────────────────────┘
                       │
         ┌─────────────▼──────────────┐
         │  Compliance intercept?     │
         │  (docs request triggered)  │
         └──────┬─────────────┬───────┘
                │ No          │ Yes
                │             ▼
                │      ┌──────────────────┐
                │      │ Compliance flow   │
                │      └──────┬───────────┘
                │             │
                │     ┌───────▼────────┐
                │     │  Rejected?     │
                │     └───┬───────┬────┘
                │         │ Yes   │ No
                │         ▼       │
                │   [Terminal     │
                │    status]      │
                │                 │
                ▼                 ▼
          ┌─────────────────────────────┐
          │  Fee deducted + Reward      │
          │  credited (on IN direction) │
          └─────────────────────────────┘
```

**Transaction types in the flow:**
- Transfer request (client-initiated)
- Manual (admin-created)
- Swap — fiat
- Swap — crypto
- Card transaction
- Interest credit
- Revenue (platform fee)

**Directions:**
- `IN` — incoming to client wallet
- `OUT` — outgoing from client wallet

KYT checks apply to **both** directions. Fee and reward credits apply on `IN`.

---

## 5. Wallets (Accounts)

> Internally referred to as "Accounts". The sidebar label is "Wallets".

### All Wallets Table

| Column | Notes |
|--------|-------|
| Blocked balance | Amount currently blocked/held |
| BAAS or network | Provider or crypto network |
| Status | Wallet status (active, blocked, etc.) |
| Client link | Navigates to client detail page |
| Wallet provider link | Navigates to provider connector in Settings |
| IDs | Copy icon for quick clipboard copy |

- CSV export available
- Search and filter capabilities (fields to be specified during build)

---

### Wallet Entity Page

**Information displayed:**

| Field | Notes |
|-------|-------|
| Client name | Linked to client detail page |
| Client group | Group label |
| Latest notes | Preview of most recent internal note (linked) |
| Wallet type | Type label |
| Total balance | Available balance + blocked balance |
| Linked transactions | Table of transactions filtered to this wallet |
| Violations / alerts | Any compliance or system alerts on this wallet |

---

### Wallet Actions

Available from the wallet entity page and from the client detail page:

| Action | Description |
|--------|-------------|
| Edit | Edit wallet details |
| Block | Block the wallet |
| Turn off | Deactivate the wallet |
| Create transaction | Opens create-transaction form with wallet pre-filled |
| Block amount | Place a hold on a specific amount |
| Debit wallet | Manually debit this wallet |
| Credit wallet | Manually credit this wallet |
| A2A transfer | Initiate an account-to-account transfer from this wallet |

---

### Wallet Admin Config

- **Wallet types** — define and manage available wallet types
- **Limits & fees** — link from wallet type to the fee and limits configuration in Settings

---

## 6. Cards

### All Cards Table

Contains all issued cards across the platform. The original board had separate "All Cards" and "Card Holds" views — these are **merged** into a single table (Card Holds appeared to be the same data with additional columns).

- Link to **Cards provider** setting (in Settings → Connectors)
- Link to **Card types** setting (in Settings)
- CSV export

---

### Card Entity Page

| Field | Notes |
|-------|-------|
| Client info | Linked; opens in new tab |
| Last used date | Date of most recent transaction |
| Linked transactions | Table filtered to this card |

**Actions:**
- Suspend card
- Edit card

---

### Card Holders

Separate view for card holders. May be merged with the All Cards table.

---

### Clearing Logs

Separate log table for card clearing events.

---

### Card & Wallet Type Settings

Located under Settings:

- **Card types** setup table — define card types and link to provider connectors
- **Wallet types** setup table — define wallet types and link to provider connectors

---

## 7. Reports

### Per-User Reports

Accessible from an individual client's detail page:

- Specific Account Report
- All Transactions Report
- Balances Report

### System-Level Reports

Accessible from the top-level Reports section:

| Report | Scope |
|--------|-------|
| All Transactions | All transactions across all clients |
| Balances | All account balances |
| Maturity Dates | Expiration / maturity dates |
| Outgoing Wire Transfer | All outbound wires |
| All Cards | All issued cards |
| Manual Transactions | Admin-created transactions only |
| Interests | All interest transactions |
| Revenue | Platform fee revenue |
| System Overview | Top-level platform summary |

---

## 8. Settings

### System Config

| Setting | Notes |
|---------|-------|
| Timezone | Platform-wide timezone |
| Module toggles | Enable/disable feature modules |
| Languages | Manage language files / translation strings |

---

### Fees

Single fees table with setup, table, and entity views.

**Fee types:**

| Fee Type | Notes |
|----------|-------|
| A2A transfer (wallet-to-wallet) | Includes swaps between wallets |
| Card top-up (different currency) | Cross-currency card funding |
| Outgoing wire transfer | SEPA / wire out |
| Incoming wire transfer | SEPA / wire in |
| Outgoing crypto | Withdrawal to crypto network |
| Incoming crypto | Deposit from crypto network |
| Integrated service fees | Platform fees for third-party integrations |

**Entity view links to:**
- Provider connector (in Connectors)
- Service / agreement record

---

### Exchange Rates

Single exchange rates table. Supports bidirectional rates (e.g. `1 EUR = 1.20 USD` and `1 USD = 0.94 EUR` are stored as separate entries).

**Rate types:**

| Rate Type |
|-----------|
| A2A transfer (wallet-to-wallet, including swaps) |
| Card top-up (cross-currency) |
| Outgoing wire transfer |
| Incoming wire transfer |
| Outgoing crypto |
| Incoming crypto |
| Crypto ↔ fiat |

**Entity view links to:**
- Provider connector
- Transactions table filtered to that rate/currency pair

---

### Currencies

- Fiat currencies — list and setup per currency
- Crypto currencies — list and setup per currency
- Per-currency setup view with configuration fields

---

### Security

**Client security settings:**

| Setting | Notes |
|---------|-------|
| Login security | Rules governing client login |
| Auto-logout | Trigger by email or session timeout |

**Staff security settings:**

| Setting | Notes |
|---------|-------|
| MPIN / passcode | Staff passcode policy |
| IP address restriction | Office VPN whitelist; configurable per individual admin |
| Auto-logout | Session timeout for staff |
| 2FA enforcement | View staff without 2FA enabled; send push notification to non-compliant users |

---

### API

Section for managing API credentials. Enables creation and revocation of API keys for external integrations.

---

### Connectors

External service integrations managed from a single section.

| Connector | Type |
|-----------|------|
| Sumsub | KYC / KYT provider |
| Zendesk | Helpdesk |
| BAAS providers | Banking-as-a-Service |
| Liquidity providers | e.g. B2C2 |
| Vixi wallet | Internal wallet provider |
| Cards provider | Card issuing provider |
| Crypto wallets provider | Custodial/non-custodial crypto provider |

**Per-connector information shown:**

| Field | Notes |
|-------|-------|
| Last used | Timestamp of last successful call |
| Last changed | Timestamp of last configuration change |
| Access / edit log | Link to audit log for this connector |
| Test connection | Button to verify connectivity |
| Connection status | Alert / indicator if connector is down |

---

### Logs

| Log | Notes |
|-----|-------|
| Transaction Log | Moved to Transactions section |
| Information Log | General platform information events |
| Event Log | System-level events |
| Access Log | Who accessed what |
| Edit Log | Who changed what (field-level audit) |
| Client Signup / Login Log | Auth events for client accounts |

---

### Tiers / KYC

- Tier definitions mapped to compliance requirements
- Countries list (driven by the active user base)
- Link to Sumsub connector for verification level configuration

---

### Staff Role Permissions

Manage roles (previously labelled "Admin Class" — renamed to **Role**).

- Each role shows:
  - Total staff count in that role
  - Link to Staff Users table filtered to that role
- Granular permission configuration per role

---

### Staff Users

Table of all admin / staff users.

| Column | Notes |
|--------|-------|
| Role | Assigned role |
| Blocked | Whether the account is blocked |

- Separate view for blocked staff users

---

### Referral Program & Rewards

**Constraints:** Only 1 active program at a time. Table + create/edit form as described below.

---

**Program List — table columns:**

| Column | Notes |
|--------|-------|
| ID | Program identifier |
| Name | Program name |
| Start Date | Program start date |
| End Date | Program end date |
| Actions | View / Edit |

---

**Create / Edit Program — form fields:**

| Field | Required | Notes |
|-------|----------|-------|
| Program Name | Yes | Internal and display name |
| Date From | Yes | Program start date |
| Date To | Yes | Program end date |
| Reward Amount | Yes | Numeric amount with currency (e.g. EUR) |
| Description | Yes | Shown to referred user in copy/referral form |
| Referrer reward | — | Paid in main currency, credited to default account |

**Program Conditions (checkboxes):**
- Referred user registers via unique referral link
- Referred user has KYC level 1

**Payout Settings:**

| Field | Type | Example |
|-------|------|---------|
| Payout Period | Dropdown | Monthly |
| Payout Day | Dropdown | Day of month (e.g. 3) |

**Statuses:**
- `Active`
- `Inactive` / `Expired` (determined by date range)

**Actions:** Create / Save / Cancel

---

**Rewards Table (separate from program list):**

| Column | Notes |
|--------|-------|
| Program Name | Name of the referral program |
| Client link | Link to client detail page |
| Transaction link | Link to filtered transactions table |

---

## 9. Liquidity

Purpose: Company-level financial health check — confirms sufficient funds per account/currency.

**Information displayed:**

| Item | Notes |
|------|-------|
| Revenue accounts | List of company revenue accounts |
| Account types & totals | Balance per account type |
| All generated revenues | Cumulative revenue figures |
| Revenue account balance | Current balance of each revenue account |
| Currency overview | Balance summary per currency |
| General reports / system overview | Link to system-level reports |
| Total pending transactions | Per currency; linked to All Transactions filtered to pending |

**Actions:**
- **Push funds & update** — manual reconciliation trigger to refresh balances

---

## 10. Communication

Manages all outbound and inbound communication channels — both with clients and with staff.

**Communication directions:**
- Client-facing (to/from clients)
- Staff-facing (system emails for internal events, e.g. document expiring soon)

### Sub-sections

| Sub-section | Description |
|-------------|-------------|
| News | Content management for in-app news; table view |
| Legal Docs | Table + entity + versioning; links to clients who signed + transactions where doc was checked |
| Helpdesk | Zendesk integration; links to dialogues; filterable by status (closed, assigned, etc.) |
| Banners | Setup banners linking to in-app articles or external URLs |
| Email | Setup + table (merged incoming/outgoing); filterable by type and status; entity view |
| SMS | Setup + table + entity view |
| Push | Setup + table + entity view |

---

## 11. Global UX Requirements (Admin-wide)

These requirements apply to **every** page, form, table, and entity in the admin. Captured from the "General important issues to fix" section of the Risely & Velmie Figma file.

### 11.1 Every Page / Form Must Have

- **CSV export** — downloadable export of the current view
- **Links to related/connected objects** — e.g. from a transaction, links to the client, wallet, card involved
- **Right-click to open in new tab** — any linked item must support right-click → open in new tab

### 11.2 Every Table Must Have

| Requirement | Detail |
|---|---|
| Search | Full-text search across all relevant fields |
| Filters | All data fields filterable; active filters reflected in the URL |
| Sorting | Column-level sorting |
| Horizontal scroll | Never truncate columns — horizontal scroll instead |
| CSV export | Export the currently filtered/sorted view with all columns |
| Row → entity page | Clicking a row opens the entity's detail page |
| Status column | Every table shows status per row |
| Timestamps | Created/updated timestamps visible per row |
| Multi-value cells | A single cell may contain more than one data point |
| FE search in dropdowns | Every dropdown/filter must have a front-end search input |

### 11.3 Right-Click Behavior

Right-clicking any of the following must offer "Open in new tab":
- Table rows
- Entity references (client name, wallet ID, card number, etc.)
- Any linked text in entity detail pages

---

*End of document. For board legend reference: solid-fill items are new features being built; light/transparent items existed in the old Velmie demo; dashed-border items are unconfirmed/planned; items labelled "NICE to have" are lower priority.*
