# Coding rules

How code is written here. Goal: minimal, DRY, and readable enough that a non-author can rework it.

## Structure
- Small, single-responsibility functions and components. If a file is hard to scan, split it.
- Imports: group external, then internal; no deep relative chains — use the configured path alias.
- No dead code. Remove only what your change orphaned (Surgical, see CLAUDE.md §3).

## Data & mocks
- Mock/fixture data lives in one place (e.g. `src/mocks/` or `src/shared/db/`), never inlined ad hoc across components.
- No fictional URLs, no invented IDs. Reuse the shared fixtures so screens stay consistent.

## URLs & state
- Every screen, tab, sidebar, and popup has its own URL (deep-linkable). Use the project's URL-state helper, not local-only state, for anything a user might bookmark or refresh.

## Accessibility (from day one)
- Semantic HTML; real `<button>`/`<a>`, not clickable `<div>`s.
- `aria-label` on icon-only controls; visible focus; full keyboard operation.
- Build with future voice control in mind: meaningful labels and predictable focus order.

## Forms
- Required fields marked, submit disabled until valid. No silent failures.

## Naming
- Descriptive kebab-case identifiers on meaningful elements (className/test-id) so screens are inspectable and testable.

## Tests
- The builder writes tests with the feature: unit for logic, end-to-end for the main flow and key states. Don't mark work done with red or missing tests.
