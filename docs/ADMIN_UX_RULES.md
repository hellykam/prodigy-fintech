# Prodigy Fintech — Admin UX Rules

These rules are absolute. Do not break them without explicit written approval.

## Page types (only three exist)

### 1. Dashboard page
- Overview metrics at the top
- Live event feed
- Quick action links to table pages
- No tabs

### 2. Full-width table/list page
- Full viewport width table
- Filter bar at top
- Bulk actions if needed
- Row click → entity detail page (URL change, not modal)
- No tabs
- No side panels for list-level actions — use separate pages

### 3. Entity detail page
- All key data and settings at the top
- Related tables below (one after another, not tabbed)
- Side panel for secondary actions (e.g. add note, change status) — pushed content, never overlay
- No tabs anywhere on this page

## Side panel rules

- Side panel PUSHES content left. It does not overlay.
- Side panel has its own URL (query param or sub-route).
- Closing the side panel returns to the parent URL.
- Side panel width: fixed 480px or 560px (token-defined).
- No modals. No popups. No drawers that overlay content.

## Table rules

- Tables always full viewport width.
- No horizontal scroll on desktop.
- Text in cells: left-aligned, top-aligned.
- Numbers in cells: right-aligned, top-aligned.
- Complex cells (multi-line, with icons): top-aligned.
- Inline icons after labels: always `display: inline` or `inline-flex`, never `display: block`.
- Never truncate cell text with ellipsis.
- All columns visible by default (no hidden columns by default).
- Row height: auto — grows with content. Never clips content.

## Typography rules

- Never use `truncate`, `line-clamp`, `overflow-hidden` on text.
- All data shows in full.
- If a value is very long, it wraps. It does not get cut off.
- Exception: only if user explicitly requests it for a specific field.

## Navigation rules

- Every page has a unique URL.
- Every entity detail has a unique URL (e.g. `/admin/customers/usr_001`).
- Every side panel has a URL (e.g. `/admin/customers/usr_001?panel=add-note`).
- Browser back button always works correctly.
- Deep links always work (share a URL and it opens the right view).

## Live data rules

- Admin tables auto-refresh for: transactions, KYC queue, risk review queue, system events.
- WebSocket used for real-time push (new transaction, KYC status change, risk alert).
- Visual indicator when new rows arrive (subtle pulse or "N new items" banner).

## Density and spacing

- Use comfortable density by default (not ultra-compact).
- Consistent padding from design tokens.
- No zebra striping on tables (use hover state instead).
- Status pills use the StatusPill component, never raw colored divs.

## Empty states

- Every table/list has an empty state (EmptyState component).
- Empty state has: icon, title, description, action button if relevant.
- Never show a blank table with just column headers.
