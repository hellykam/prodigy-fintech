# Prodigy Fintech — Tech Stack

## Decision date: 2026-06-17
## Decision owner: CTO

---

## Frontend (all six apps)

| Package | Version | Purpose |
|---------|---------|---------|
| Vue 3 | latest | UI framework |
| TypeScript | ~5.x | Type safety |
| Vite | latest | Build tool |
| Tailwind CSS | v3 | Utility-first styling with tokens |
| Reka UI | latest | Headless accessible Vue primitives |
| Pinia | latest | State management |
| Vue Router | v4 | Routing, URL-per-panel |
| @tanstack/vue-query | v5 | Server state, caching |
| @tanstack/vue-table | v8 | Headless table primitives |
| @vue-flow/core | latest | Live system map / node diagrams |
| vue-echarts + echarts | latest | Charts (price, volume, revenue) |
| lucide-vue-next | latest | Icons |
| msw | v2 | Frontend API mocking for demo |

## Backend

| Package | Version | Purpose |
|---------|---------|---------|
| Node.js | v20 (installed) | Runtime |
| TypeScript | ~5.x | Type safety |
| Fastify | v4 | HTTP server |
| Prisma | latest | ORM + migrations |
| SQLite | bundled | Database (zero server for demo) |
| Zod | latest | Schema validation, shared with FE |
| ws | latest | WebSocket for live events |
| @fastify/websocket | latest | Fastify WebSocket plugin |

## Simulators (run inside backend process, no Docker)

- `market.ts` — live price feed, bid/ask spread, order execution
- `bank.ts` — IBAN creation, fiat movements, 3 platform accounts
- `kyc.ts` — applicant lifecycle, webhook events
- `risk.ts` — transaction scoring engine, manual review queue
- `ledger.ts` — double-entry posting engine
- `commission.ts` — partner revenue share
- `events.ts` — in-memory event bus + WebSocket broadcast

## Shared packages

| Package | Purpose |
|---------|---------|
| `packages/ui` | Vue components + Tailwind config + tokens |
| `packages/schemas` | Zod schemas shared between FE and BE |
| `packages/types` | TypeScript types shared between FE and BE |

## Testing

| Package | Purpose |
|---------|---------|
| Vitest | Unit and component tests |
| Playwright | E2E browser tests |
| MSW | API mocking |
| @axe-core/playwright | Accessibility checks in E2E |

## Tooling

| Tool | Version | Purpose |
|------|---------|---------|
| pnpm | 10.33.0 (installed) | Package manager + workspaces |
| ESLint | latest | Linting |
| Prettier | latest | Formatting |
| vue-tsc | latest | TypeScript checking for Vue SFCs |

## Explicitly excluded

| Excluded | Reason |
|---------|--------|
| Docker | Not installed; adds setup risk for demo week |
| Elasticsearch | Overkill for demo; SQLite FTS is enough |
| Python / FastAPI | Node = same language as FE; shared types; faster agent output |
| Postgres (for now) | SQLite is Prisma-compatible; zero server; upgradeable later |
| Turborepo | pnpm workspaces is enough; add later if builds slow down |
| Storybook | UI playground page in packages/ui instead |
| Redis | Not needed |
| MUI / shadcn React | Vue project; use Reka UI + shadcn-vue pattern |

## Upgrade path (post-demo)

- SQLite → Postgres: change one line in `prisma/schema.prisma`
- Add Docker Compose for Postgres + Elasticsearch when ready
- Add Turborepo when build times become an issue
