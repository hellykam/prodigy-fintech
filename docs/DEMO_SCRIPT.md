# Prodigy Fintech — Demo Script

## Setup (before demo)

1. `pnpm dev` — starts all apps and backend
2. Open six browser tabs/windows:
   - Tab 1: Consumer App (http://localhost:5001)
   - Tab 2: Admin (http://localhost:5002)
   - Tab 3: Sumsub Simulator (http://localhost:5003)
   - Tab 4: System Map (http://localhost:5004)
   - Tab 5: Widget demo page (http://localhost:5005)
   - Tab 6: Partner Portal (http://localhost:5006)
3. Log in to Consumer App as bob@demo.com / 1234 (pending KYC)
4. Log in to Admin as admin@prodigy.com / admin1234
5. Log in to Partner Portal as acme@partner.com / partner1234

## Demo flow (10 minutes)

### Scene 1: The widget (2 min)
- Show Tab 5 (widget demo page)
- Show the "copy embed code" button
- Show the widget loading with Acme Corp config
- Start a quote flow in the widget

### Scene 2: The system map reacts (1 min)
- Switch to Tab 4 (system map)
- Watch the signal animate: widget → backend → quote-engine
- Show the event inspector panel

### Scene 3: Consumer app KYC (2 min)
- Switch to Tab 1 (consumer app, logged in as bob)
- Submit KYC (pre-filled form)
- Show KYC pending state
- Switch to Tab 3 (Sumsub Simulator)
- Approve the KYC
- Watch Tab 2 (Admin) auto-update
- Watch Tab 1 (Consumer) show "Bank account created"
- Watch Tab 4 (System Map) animate KYC → bank simulator → ledger

### Scene 4: A transaction and risk review (3 min)
- In Consumer App, start a fiat-to-crypto conversion
- Enter a large amount to trigger manual review
- Watch Tab 2 (Admin) show new Risk Review task
- Watch Tab 4 (System Map) show "waiting" state at admin node
- In Admin, open the risk review, approve it
- Watch transaction complete in Consumer App
- Watch Partner Portal update with new commission

### Scene 5: Admin overview (2 min)
- Show Admin dashboard
- Click into Customers table
- Open a customer entity page
- Show transaction history, ledger entries, KYC status
- Open a transaction entity page — show the full event chain

## Key points to make

- "Everything is connected — one action in the consumer app creates events visible in admin, system map, and partner portal simultaneously."
- "The system map shows exactly where in the flow a transaction is stuck — great for debugging and ops."
- "The ledger means every dollar is always accounted for — nothing can be lost or doubled."
- "B2B partners get their own branded widget and revenue dashboard — this is the commercial model."
