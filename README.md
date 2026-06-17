# Prodigy — Fintech Experiment Platform

> **A full-stack fintech sandbox — crypto accounts, wallets, compliance, and live system maps. Built to experiment, learn, and ship patterns.**

🚧 **Status: In Progress**

🌐 **[View Live Docs →](https://hellykam.github.io/prodigy-fintech/)**

---

## What Is This?

Prodigy is a personal fintech sandbox — a place to build and validate real-world fintech patterns in a controlled environment. It covers crypto wallet management, compliance and KYC workflows, double-entry accounting, and a live visual map of all system entities. Nothing is mocked for the sake of simplicity; if a pattern exists in production fintech, it's built properly here.

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | Vue 3 + TypeScript |
| Styling | Tailwind CSS (token-based, no arbitrary values) |
| Accessible Primitives | Reka UI (headless components) |
| Icons | Lucide Vue Next |
| Charts | Apache ECharts / vue-echarts |
| System Map | Vue Flow (live entity graph) |
| Component Library | shadcn-vue style — owned, lives in `packages/ui` |

---

## Architecture

This is a **monorepo** structured around a single core principle: the design system is a first-class package, not a folder.

```
prodigy-fintech/
├── apps/
│   └── web/               # Main Vue 3 application
├── packages/
│   └── ui/                # Design system — all shared components live here
├── docs/
│   ├── decisions/         # Architecture Decision Records (ADRs)
│   └── research/          # Notes, references, and explorations
└── .agents/
    └── guides/            # Rules and context for AI agents working on this repo
```

### `packages/ui`

The design system package. Every reusable component — buttons, inputs, cards, side panels, data tables — is authored here. Application code imports from `@prodigy/ui`; it never defines its own styled primitives.

### `apps/web`

The main application. Pages are thin orchestrators: they compose `packages/ui` components, wire up data, and own routing. No styling logic lives here beyond layout composition.

### `docs/`

All decisions are documented. `docs/decisions/` holds ADRs for anything architectural. `docs/research/` holds exploratory notes that preceded a decision.

---

## Key Design Rules

These rules are enforced by the AI agent workflow (see below) and act as the project's constitution. Every pull request is measured against them.

| Rule | Detail |
|---|---|
| **Design system only** | All UI via `packages/ui` components. No one-off styled `<div>`s anywhere in `apps/`. |
| **No hardcoded values** | No hex colors, no arbitrary Tailwind values (`w-[347px]`, `text-[#abc]`). Use design tokens exclusively. |
| **No modals** | Side panels only, each with its own URL. Modals break deep-linking and accessibility. |
| **Every entity has a URL** | Accounts, wallets, users, transactions — every entity is directly addressable via its own route. |
| **Double-entry ledger** | Money never moves via a simple balance mutation. Every movement is a pair of ledger entries (debit + credit). |
| **Event emission** | Every user action and system state change emits both a system event and an analytics event. No silent mutations. |

---

## Docs Navigation

| Resource | Description |
|---|---|
| [`.agents/guides/`](.agents/guides/) | Rules, stack context, and design system spec for AI agents |
| [`docs/decisions/`](docs/decisions/) | Architecture Decision Records |
| [`docs/research/`](docs/research/) | Research notes and explorations |

---

## Agent Workflow

AI agents working in this repository operate under strict rules defined in `.agents/guides/`. The workflow uses three deliberate roles:

- **`/analyst`** — Clarifies requirements, surfaces tradeoffs, proposes solutions. Does not write code.
- **`/builder`** — Implements with surgical precision: minimum code, design-system components only, tests included.
- **`/reviewer`** — Reviews in a fresh thread against the clean-code gate. Must reach 99%+ compliance before shipping.

The `clean-code-gate` skill enforces: design-system components only, no invented colors or values, every page has a URL, accessibility and keyboard support, responsive layouts, and readable code a future developer can rework. Agents do not ship below this threshold.

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Start the dev server
pnpm --filter web dev

# Build the design system
pnpm --filter @prodigy/ui build
```

> Requires Node 20+ and pnpm 9+.

---

## License

Personal experiment — not licensed for production use. Public for learning and reference.
