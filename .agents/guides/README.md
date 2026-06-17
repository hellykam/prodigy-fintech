# Prodigy Fintech — Agent Guide Index

This folder contains rules every agent must read before doing any work.

## Required reading order

1. This file
2. `design-system.md` — UI rules, tokens, components
3. `/docs/PROJECT_CHARTER.md` — non-negotiable rules
4. `/docs/TECH_STACK.md` — stack decisions
5. `/docs/AGENT_WORKFLOW.md` — how to work
6. `/docs/DOMAIN_MODEL.md` — entities
7. `/docs/EVENT_MODEL.md` — events

## Hard stops

- Do not install packages not in TECH_STACK.md without flagging it first.
- Do not create new colors, spacing values, or typography outside the design tokens.
- Do not create modal dialogs in the admin app — use side panels.
- Do not write raw SQL.
- Do not build isolated screens disconnected from backend data.
- Do not truncate text with ellipsis unless explicitly requested.
- Every page, side panel, and entity detail must have its own URL.
- Money changes only through double-entry ledger entries.
- Every important action must emit a system event AND an analytics event.
