# Prodigy Fintech — Agent Workflow

## Before starting any task

1. Read `.agents/guides/README.md`
2. Read `.agents/guides/design-system.md`
3. Read `docs/PROJECT_CHARTER.md`
4. Read the relevant section of `docs/DOMAIN_MODEL.md` for the entities you will touch
5. Read `docs/EVENT_MODEL.md` if you will emit or consume events

## Task execution loop

```
READ rules → PLAN (one line per step) → BUILD → SELF-REVIEW → VERIFY
```

### BUILD rules
- Touch only files required by the task.
- Use only packages in `docs/TECH_STACK.md`.
- Use only components from `packages/ui`.
- Use only design tokens from `packages/ui/tailwind.config.ts`.
- Connect to real backend data where relevant (no hardcoded arrays in components).
- Emit system events for important backend actions.
- Emit analytics events for important user actions.
- Write tests alongside the feature, not after.

### SELF-REVIEW checklist (run before marking done)

Answer each with YES or explain the exception:

- [ ] Does it follow the approved stack?
- [ ] Is the code minimal and readable?
- [ ] Are shared components and tokens used (no invented values)?
- [ ] Is the backend connected where needed?
- [ ] Are system and analytics events emitted where needed?
- [ ] Do all tests pass?
- [ ] Does admin show this data if relevant?
- [ ] Does the system map receive events if relevant?
- [ ] Does every page/panel have its own URL?
- [ ] Is text never truncated with ellipsis?
- [ ] Are table cells top-aligned?
- [ ] Are inline icons inline elements?
- [ ] Is it keyboard accessible?

If any answer is NO and it is not an approved exception, fix it before marking done.

## Agent roles

### Builder
Writes product code. Follows all rules in PROJECT_CHARTER. Uses shared components.
Never ships a feature without tests. Never invents design values.

### Reviewer
Reviews code in a fresh context. Checks the SELF-REVIEW checklist independently.
Flags any violation. Does not approve if any checklist item fails without documented reason.

### Domain Analyst
Researches competitors, legacy designs, KYC/risk practices.
Writes findings into `docs/research/`. Does not write product code.

## Phase order

Do not start a later phase until the earlier phase acceptance criteria pass.

Phase 0 — Foundation (monorepo scaffold, shared packages, empty apps, tests run)
Phase 1 — Domain (Prisma schema, seed data, backend skeleton)
Phase 2 — Simulators (market, bank, KYC, risk, ledger, commission, events)
Phase 3 — Admin MVP
Phase 4 — Consumer App MVP
Phase 5 — Sumsub Simulator
Phase 6 — Widget MVP
Phase 7 — Partner Portal
Phase 8 — Live System Map
Phase 9 — Analytics Simulator
Phase 10 — Demo automation + presentation

## Parallel work rules

Agents working on different apps may work in parallel.
Agents must not edit shared packages (`packages/ui`, `packages/schemas`, `packages/types`) at the same time.
When a shared package change is needed, one agent does it, then others pull.

## Demo-first principle

This is a demo. When in doubt, fake it convincingly rather than over-engineer.
A realistic seed script beats a real external API integration.
A WebSocket broadcast from an in-process simulator beats a real message queue.
The goal is: a person watching the demo believes the system is real.
