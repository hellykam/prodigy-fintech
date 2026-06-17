# ADR 0001: Tech Stack Selection

Date: 2026-06-17
Status: Accepted

## Context

Building a local-first fintech/crypto demo in one week. Designer-led project.
Need agent team to generate code efficiently. Demo must run without Docker.

## Decision

Vue 3 + TypeScript + Vite + Tailwind + Reka UI on the frontend.
Node.js + Fastify + Prisma + SQLite on the backend.
No Docker, no Python, no Elasticsearch for the initial demo.

## Reasons

- Node.js is installed. Python 3.12 exists but is not the system default — adds env friction.
- Shared TypeScript types between FE and BE is a major correctness win for agents.
- SQLite + Prisma: zero server, zero Docker, single file, Prisma makes it production-upgradeable later.
- Vue 3: .vue SFCs are compact and designer-readable. Better agent output than React for this team.
- Reka UI + shadcn-vue pattern: components live in the project, fully ownable, not locked in node_modules.

## Consequences

- SQLite → Postgres is one line change in prisma/schema.prisma when ready.
- Python can be added for analytics/ML tasks post-demo if needed.
- Elasticsearch can be added via Docker Compose post-demo.
