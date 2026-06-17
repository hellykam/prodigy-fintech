# Prodigy Fintech — Event Model

All system events are emitted by the backend and broadcast over WebSocket to:
- Admin app (live updates)
- System map (animated signal flow)

Every event has a `correlationId` to trace a full transaction chain.

## Event shape

```typescript
interface SystemEvent {
  id: string
  correlationId: string  // ties all events in one flow together
  eventName: EventName
  entityType: string
  entityId: string
  source: NodeName
  target: NodeName
  status: 'processing' | 'waiting' | 'completed' | 'failed' | 'rejected'
  payload: Record<string, unknown>
  createdAt: string
}
```

## Node names (for source/target)

consumer-app, widget, admin, partner-portal, sumsub-simulator,
risk-engine, market-simulator, bank-simulator, ledger, database, kyc-simulator

## Full event list

### User events
- USER_SIGNED_UP
- USER_LOGGED_IN

### Widget events
- WIDGET_LOADED
- WIDGET_CONFIG_RESOLVED

### Quote events
- QUOTE_REQUESTED
- QUOTE_CREATED
- QUOTE_ACCEPTED
- QUOTE_EXPIRED

### KYC events
- KYC_APPLICANT_CREATED
- KYC_SUBMITTED
- KYC_APPROVED
- KYC_REJECTED
- KYC_MANUAL_REVIEW_REQUESTED

### Bank events
- BANK_ACCOUNT_CREATED
- IBAN_ASSIGNED

### Transaction events
- TRANSACTION_CREATED
- TRANSACTION_RISK_CHECK_STARTED
- TRANSACTION_RISK_APPROVED
- TRANSACTION_RISK_REVIEW_REQUIRED
- TRANSACTION_RISK_REJECTED
- MANUAL_REVIEW_CREATED
- MANUAL_REVIEW_APPROVED
- MANUAL_REVIEW_REJECTED
- MARKET_ORDER_REQUESTED
- MARKET_ORDER_EXECUTED
- MARKET_ORDER_FAILED
- LEDGER_POSTING_STARTED
- LEDGER_POSTED
- LEDGER_POSTING_FAILED
- PARTNER_COMMISSION_ACCRUED
- TRANSACTION_COMPLETED
- TRANSACTION_FAILED

### Market events
- MARKET_PRICE_UPDATED

### Admin events
- ADMIN_VIEWED_TASK
- ADMIN_CHANGED_WIDGET_CONFIG
- ADMIN_APPROVED_MANUAL_REVIEW
- ADMIN_REJECTED_MANUAL_REVIEW
- ADMIN_APPROVED_KYC (via sumsub simulator)
- ADMIN_REJECTED_KYC (via sumsub simulator)

## Example event

```json
{
  "id": "evt_abc123",
  "correlationId": "txn_xyz789",
  "eventName": "TRANSACTION_RISK_REVIEW_REQUIRED",
  "entityType": "transaction",
  "entityId": "txn_xyz789",
  "source": "risk-engine",
  "target": "admin",
  "status": "waiting",
  "payload": {
    "riskScore": 78,
    "reasons": ["new_user_high_amount", "velocity_check_failed"],
    "userId": "usr_001",
    "amount": 5000,
    "currency": "EUR"
  },
  "createdAt": "2026-06-17T10:30:00.000Z"
}
```

## System map animation rules

- Signal animates from `source` node to `target` node
- `processing` → yellow pulse
- `waiting` → amber pulse, target node glows
- `completed` → green flash, edge turns green
- `failed` → red flash, edge turns red
- `rejected` → red flash on target node
- correlationId groups all events in one flow — clicking any event shows the full chain
