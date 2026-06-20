# Prodigy Fintech Demo

Local-first crypto fintech demo. Six apps + backend, all fake data, all convincingly real.

## Apps

| App | URL | Description |
|-----|-----|-------------|
| Consumer | http://localhost:5001 | Mobile-first end-user web app |
| Admin | http://localhost:5002 | Internal operations dashboard |
| Sumsub Simulator | http://localhost:5003 | KYC approve/reject tool |
| System Map | http://localhost:5004 | Live animated system diagram |
| Widget | http://localhost:5005 | Embeddable iframe |
| Partner Portal | http://localhost:5006 | B2B client revenue dashboard |
| Backend API | http://localhost:3000 | Fastify + Prisma + SQLite |

## Quick start

```bash
# Install dependencies
pnpm install

# Reset and seed database
pnpm db:reset

# Start everything
pnpm dev
```

## Individual apps

```bash
pnpm dev:backend
pnpm dev:admin
pnpm dev:consumer
pnpm dev:widget
pnpm dev:partner
pnpm dev:sumsub
pnpm dev:sysmap
```

## Tests

```bash
pnpm test          # unit tests (all packages)
pnpm test:e2e      # Playwright E2E tests
pnpm typecheck     # TypeScript checks
pnpm lint          # ESLint
```

## Demo credentials

| Role | Email | Password |
|------|-------|----------|
| Consumer (approved KYC) | alice@demo.com | 1234 |
| Consumer (pending KYC) | bob@demo.com | 1234 |
| Consumer (rejected KYC) | carol@demo.com | 1234 |
| Admin | admin@prodigy.com | admin1234 |
| Partner (Acme Corp) | acme@partner.com | partner1234 |
