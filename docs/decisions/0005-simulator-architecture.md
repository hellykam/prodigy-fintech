# ADR 0005: In-Process Simulator Architecture

Date: 2026-06-17
Status: Accepted

## Decision

All backend simulators run as TypeScript modules inside the Fastify process.
No Docker. No separate services. No message queues.

## Architecture

```
Fastify process
├── HTTP routes
├── WebSocket server
├── Simulator registry
│   ├── market.ts (setInterval: price updates every 5s)
│   ├── bank.ts (triggered: IBAN creation, settlement)
│   ├── kyc.ts (triggered: status transitions, webhooks)
│   ├── risk.ts (triggered: score transaction, queue review)
│   ├── ledger.ts (triggered: post entries for each transaction step)
│   ├── commission.ts (triggered: calculate on transaction complete)
│   └── events.ts (event bus: broadcast to WebSocket subscribers)
└── Prisma client
```

## Event bus design

```typescript
// Simple in-process pub/sub
events.emit('TRANSACTION_CREATED', { ... })
events.on('TRANSACTION_CREATED', riskEngine.check)
events.on('TRANSACTION_RISK_APPROVED', marketSimulator.execute)
// etc.
```

## WebSocket broadcast

All system events are also broadcast over WebSocket to connected clients.
Admin and system-map subscribe to the WebSocket feed.

## Trade-offs

- Single process = single point of failure. Acceptable for demo.
- No message durability (if server restarts, in-flight events are lost). Acceptable.
- All system events are persisted to SQLite — replaying is possible from DB.
