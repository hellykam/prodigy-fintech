# Prodigy Fintech — Test Strategy

## Principle

Tests are written alongside the feature. Not after. Not "when we have time."

## Test types

### Unit tests (Vitest)

Use for logic that does not need a browser:
- Fee calculation
- Quote expiry
- Risk scoring rules
- IBAN generation
- Ledger balance validation (sum of debits = sum of credits)
- Partner commission calculation
- Market price simulation logic
- Analytics funnel calculation

### Integration tests (Vitest + Prisma test database)

Use for:
- API endpoint request/response
- Database writes and reads
- Transaction lifecycle state machine
- KYC approval → bank account creation
- KYC rejection → blocks conversion
- Manual review workflow
- Ledger posting correctness
- Widget config resolution by client ID
- Partner revenue share calculation

### Playwright E2E tests

The ten required flows for demo readiness:

1. Consumer signs up → submits KYC → Sumsub simulator approves → bank account created → balances visible
2. Consumer requests quote → completes fiat-to-crypto conversion → appears in transaction history
3. High-risk transaction → risk engine creates manual review → visible in admin queue
4. Admin approves manual review → transaction completes → ledger entries created
5. Admin rejects manual review → transaction fails → consumer sees failure
6. Widget loads with B2B config → transaction attributed to partner → visible in partner portal
7. Partner portal shows correct revenue data → matches admin view
8. System map receives events → animated signal flows correctly for full transaction
9. Rejected KYC user → cannot start conversion → sees correct error state
10. Quote expires → user cannot submit stale quote → must request new quote

### Accessibility tests

Every critical screen must pass:
- Keyboard navigation (Tab, Enter, Escape, Arrow keys)
- Visible focus states
- Semantic HTML (buttons are `<button>`, links are `<a>`)
- Form labels (every input has a label)
- Table accessibility (`<th>`, `scope`, `caption`)
- No keyboard traps
- Role-based Playwright selectors (getByRole, getByLabel, getByText)

## Definition of passing

A feature passes when ALL of:
1. Unit tests pass
2. Integration tests pass (if applicable)
3. Relevant Playwright tests pass
4. Accessibility checks pass
5. TypeScript compiles with zero errors
6. ESLint passes with zero errors
7. Admin shows the data (if relevant)
8. System/analytics events are emitted (if relevant)

## Test commands

```bash
# All tests
pnpm test

# Frontend only
pnpm test:frontend

# Backend only
pnpm test:backend

# E2E only
pnpm test:e2e

# Type check
pnpm typecheck

# Lint
pnpm lint
```

## MSW rules

- MSW is used in the frontend for development and Vitest tests.
- MSW handlers live in `packages/schemas/src/mocks/handlers/`.
- MSW mirrors the real Fastify routes exactly (same path, same response shape).
- When a real backend endpoint is added, the MSW handler is updated to match.

## Playwright rules

- Use `getByRole`, `getByLabel`, `getByText` — never CSS selectors.
- No arbitrary `page.waitForTimeout()` — use `waitFor` conditions.
- No animation-timing assertions.
- All demo users are seeded before E2E tests run.
- Database resets to known state before each E2E test suite.
- Tests run headless in CI, headed locally for debugging.
