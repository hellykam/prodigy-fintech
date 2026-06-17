# Prodigy Fintech — Project Charter

## What we are building

A local-first crypto fintech demo project. It fakes real systems convincingly enough that a demo audience believes it is a real product.

## Six apps

1. **Admin** — internal operations dashboard
2. **Consumer** — mobile-first web app for end users
3. **Widget** — embeddable iframe for B2B partners
4. **Partner Portal** — B2B client revenue dashboard
5. **Sumsub Simulator** — single-screen KYC approve/reject tool
6. **System Map** — live animated diagram of all system components and event flow

Plus one **backend API** with built-in simulators.

## Non-negotiable rules

### Code quality
- Minimum code that solves the problem. No speculative features.
- Readable by a non-engineer. Clear naming, small functions, minimal CSS.
- DRY. No copy-pasted logic.
- TypeScript strict mode everywhere.
- Shared types between frontend and backend via `packages/schemas` and `packages/types`.

### Data integrity
- All money movements use double-entry ledger entries. No direct balance mutation.
- Postgres (SQLite for demo) is the source of truth.
- Balances are derived from ledger entries, never stored directly.

### Events
- Every important backend action emits a system event.
- Every important user action emits an analytics event.
- The live system map is driven by real system events.
- Every system event has a `correlationId` to trace a full transaction chain.

### UI
- Use shared components from `packages/ui` only. No one-off styled components.
- Use design tokens only. No invented colors, spacing, or typography.
- Every page, side panel, and entity detail has its own URL.
- All UI is keyboard accessible.
- Mobile-responsive from day one.

### Admin UX (absolute rules, never break)
- Only three page types: Dashboard, Full-width table/list, Entity detail.
- No tabs.
- No modal dialogs. Use side panels that push content.
- All data aligns top-left. Numbers align top-right.
- Never truncate text with ellipsis.
- Table cells align top. Complex cells are top-aligned too.
- Inline icons after labels are always inline elements, never block.

### Testing
- Tests are not optional. Every feature ships with tests.
- Playwright for E2E flows.
- Vitest for unit and component tests.
- MSW for frontend API mocking.

### What "done" means
A task is done only when:
1. Code is minimal and readable.
2. UI uses shared components and tokens.
3. Backend and database are connected where relevant.
4. System and analytics events are emitted where relevant.
5. Tests pass.
6. Admin visibility exists where relevant.
7. Docs are updated if entities or events changed.

## Demo goal

All six apps run locally. A presenter can:
1. Open the consumer app and complete a transaction.
2. Watch the system map animate the event flow in real time.
3. Open admin and see the transaction, KYC status, and risk decision.
4. Use the Sumsub simulator to approve/reject a KYC.
5. Show the widget embedded in a demo page.
6. Show the partner portal with revenue data.

## Constraints
- Free tools only. No paid services.
- No Docker for the core demo (not installed). Simulators run inside the Node process.
- SQLite for the demo database (Prisma makes this production-upgradeable later).
- All faking is done in TypeScript simulators, not in UI components.
