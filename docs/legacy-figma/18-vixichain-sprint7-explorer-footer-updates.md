# Vixichain Wallet — Sprint 7: Explorer, Footer, & Updates

**Source:** Figma "Vixichain Wallet" (vbGInZbVbXfOIS0D6SlNvY), +Design (sprint 7), node 6754:197974
**Covers:** Vixiscan block explorer, footer updates, transaction table breakpoints, trust score, SoF hidden, node info, BaV updates

---

## 1. Explorer (Vixiscan)

Sections: **"Explorer"**, **"Explorer - vixiscan"**, **"Explorer public"**

The public blockchain explorer (Vixiscan) was designed in this sprint. It's a separate web application accessible without a wallet account.

### Explorer Breakpoints

Full responsive design across all breakpoints:

| Frame name | Width |
|---|---|
| 1440+ | 1440px (desktop) |
| 1200 Explorer public | 1200px |
| 900 Explorer public | 900px |
| 768 Explorer public | 768px |
| 430 Explorer public | 430px |
| 375 Explorer public | 375px (mobile) |

### Explorer Dashboard
- `Explorer Dashboard` — homepage of the block explorer
- Shows blockchain overview: recent blocks, recent transactions, network stats

### Explorer Public Tables

**Public transaction table** (`Public table`):
- Lists all blockchain transactions
- Columns mirror the wallet transaction table
- Note: "changed to VIXC, because thats more logical here" — ticker symbol shown as **VIXC** (not VIXI or another name)

**Transaction detail table** (`Trx detail table`):
- Full transaction detail view in the explorer
- Mobile transaction detail: horizontal scroll — note: "As we have mobile app, we can have here hor scroll, but all transaction details, all functionality should be available"

### Explorer Table States
- Default (populated)
- Search state (active search)
- Nothing found (empty search result)
- Empty state (no transactions)
- Error state & loader when API is down — **deferred to next sprints** (per design annotation)

### Signed Transactions Section
`Signed transactions` — dedicated view for validator-signed transactions at all breakpoints:
- 1920px
- 1440px
- 1186px
- 900px (web)
- 768px (web)
- 460px (web)

Note: "Should work the same as in Admin" — the explorer signed transactions table mirrors the admin panel version.

### Updating Tables — Column Sequence
Section: **"Updating tables to have equal cel sequence"**

A design pass to standardize column order across all transaction tables (wallet, admin, explorer) for consistency.

Cell components documented:
- `Cel Sender Wallet`
- `Cel Receiver Wallet`
- `Trx Hash ID Type`
- `Table / header item`

Note: "Copy icon - copies" — transaction hash and addresses have copy-to-clipboard icons.

---

## 2. Footers — Wallet & Explorer

Section: **"Footers: Wallet & Explorer + Net switcher"**

Footer design updated for both Wallet and Explorer apps.

**Network switcher** in footer: "Mainnet | Switch to Testnet" (already documented in Sprint 3 BaV portal). Confirmed for Wallet + Explorer in this sprint.

Designer note: "Add footer to admin too" — admin panel should also get the footer component added.

**Testnet note:**
> "Testnet - Wallet, Explorer, Validators, Admin"

All four apps need testnet mode support: Wallet, Explorer, Validators (BaV portal), Admin.

---

## 3. Transaction Table — Breakpoints

Section: **"Wallet / Transactions table - updates"**

Transaction list at wallet breakpoints:
| Frame | Width |
|---|---|
| Transactions 1440+ web | 1440px+ |
| Transactions 900 web | 900px |
| Transactions 768 web | 768px |
| Transactions 460 web | 460px |

Also: `Between breakpoints` — behavior of the table in-between defined breakpoints.

**Filters & Hovers** section:
- Filter panel interactions
- Hover/tooltip states on table rows and columns

---

## 4. Source of Funds (SoF) — Hidden

Section: **"SoF = hidden"**

Three contexts where SoF is hidden from the UI:

| Context | Frame |
|---|---|
| Validator view | `SoF = hidden. Validator` |
| Wallet — Create transaction | `SoF = hidden. Wallet - Create transaction` |
| Wallet — Transaction detail | `SoF = hidden. Wallet - Trx detail` |

The SoF (Source of Funds) field is hidden in these views — it exists in the data model but is not displayed to validators or regular wallet users.

---

## 5. Wallet Dashboard — Trust Score & Updates

Section: **"Wallet / Dashboard: trust score & trx table"** and **"Wallet / Dashboard: trust score & other updates"**

Dashboard updated with:
- **Trust score** now visible on the dashboard
- Transaction table updates integrated

Dashboard at all breakpoints:
- `Dashborad 1440` — 1440px
- `Dashborad 1186` — 1186px
- `Dashborad 688` — 688px
- `Dashborad 460` — 460px
- `Dashborad 375` — 375px (mobile)

---

## 6. Transaction Detail — Updates

Section: **"Wallet / Transaction Detail - updates"** and **"Wallet / Transaction Details - updates"**

Two transaction detail type variations documented:
- `Transaction Detail Type: Send, Internal`
- `Transaction Detail Type: Receive, Internal`

Updates to transaction detail page layout/content.

Note: "User inputed address that he has in address book" — when user sends to an address saved in address book, the contact name is shown in transaction detail.

---

## 7. Wallet Transaction Creation — Updates

Section: **"Wallet / Transaction Creation - updates"** (from annotation text)

Updates to the Send/Create transaction flow.

---

## 8. Node Info

Sections: **"Node info"**, **"Node info: logs"**

Node status/info page for BaV validator portal:
- `Node online` — online state (default, no indicator needed)
- `Node offline` — offline state shows notification/alert
- `Node info: logs` — logs section on the node info page

**Note (from Sprint 6):** "Node info: Notification status if node is offline (no need to show 'online' status, it should be default)" — only show status indicator when offline.

---

## 9. BaV Portal — Updates

Section: **"BaV Portal - updates"** (continued from Sprint 6)

- `Rules` — updated rules list
- `Rule details` — updated rule detail page
- `Admin Clients (user-org) table` — client/organization table in admin

---

## 10. Currency Ticker

Design annotation: **"changed to VIXC, because thats more logical here"**

The native token ticker is **VIXC** (not VIXI). Used in the public explorer tables.

---

## 11. Bug Notes

**"Bug with footer & Scroll"** — documented bug: footer and scroll interaction issue. Likely a z-index or overflow issue with the sticky footer.

---

## 12. Implemented Section

**"Implemented"** frame — contains reference screenshots of already-implemented screens (used by the design team to track completion status).
