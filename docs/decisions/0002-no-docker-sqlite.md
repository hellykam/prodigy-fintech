# ADR 0002: No Docker, SQLite for Demo

Date: 2026-06-17
Status: Accepted

## Context

Docker is not installed. Demo is in 7 days. Installing and configuring Docker Desktop,
Postgres container, and Elasticsearch container would consume 1-2 days minimum.

## Decision

- Use SQLite via Prisma for the database. No server required.
- All simulators run inside the Fastify process as TypeScript modules.
- No external services needed to run the demo.

## Trade-offs

Accepted for demo:
- SQLite has lower concurrent write performance than Postgres. Fine for single-user demo.
- No Elasticsearch means search is SQLite FTS or simple LIKE. Acceptable for demo.
- In-process simulators mean a crash restarts everything. Acceptable for demo.

Post-demo upgrade path:
- Change `provider = "sqlite"` to `provider = "postgresql"` in Prisma schema.
- Run `prisma migrate reset` with Postgres connection string.
- Extract simulators to separate processes or Docker containers.
