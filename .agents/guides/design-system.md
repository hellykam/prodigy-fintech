# Prodigy Fintech — Design System

> Status: SKELETON — tokens and components will be defined as packages/ui is built.
> Until this file is updated with real tokens, agents must not invent values.

## Technology

- Vue 3 + TypeScript
- Tailwind CSS (utility-first, token-based)
- Reka UI (headless accessible primitives for Vue)
- shadcn-vue style: components live in `packages/ui/src/components/`, are copied/owned by the project, not locked in a node_modules black box
- Lucide Vue Next for icons
- Apache ECharts (vue-echarts) for charts
- Vue Flow (@vue-flow/core) for the live system map

## Token philosophy

All visual values come from Tailwind config tokens defined in `packages/ui/tailwind.config.ts`.

No hardcoded hex colors. No arbitrary Tailwind values like `text-[#ff0000]`.
No invented spacing like `mt-[13px]`.
No shadow or border-radius values outside the token set.

## Color palette (to be defined)

Tokens will be defined before any UI is built. Categories:
- `brand` — primary product color
- `surface` — backgrounds (page, card, panel, overlay)
- `border` — dividers, input borders
- `text` — primary, secondary, disabled, inverse
- `semantic` — success, warning, error, info
- `crypto` — accent colors for BTC, ETH, USDT etc. (sparingly)

## Typography (to be defined)

Font family, scale (xs through 4xl), weight, line-height — all via tokens.
No arbitrary font sizes.

## Spacing (to be defined)

Use Tailwind's default spacing scale unless overridden in config.
No arbitrary pixel values.

## Component inventory (to be built in packages/ui)

### Primitives
- Button (variant: primary, secondary, ghost, destructive; size: sm, md, lg)
- Input
- Select
- Textarea
- Checkbox
- Switch
- Badge (variant: default, success, warning, error, info, neutral)
- Tooltip

### Layout
- PageHeader (title, breadcrumb, actions slot)
- SidePanel (pushes content, has URL, close via route change)
- Card
- EmptyState
- Divider

### Data display
- StatusPill (maps status string to semantic color)
- MoneyAmount (currency + amount, right-aligned, correct decimals)
- CurrencyPair (e.g. BTC → EUR)
- EntityHeader (avatar/icon, name, status, meta info)
- DefinitionList (label + value pairs, no truncation)
- InlineIconLabel (icon + text, always inline — never block)
- DataTable (TanStack Table wrapper, full-width, top-aligned cells)

### Crypto-specific
- CryptoIcon (maps currency code to icon, fallback to code letters)
- RiskScore (numeric score + color band)
- LedgerEntry (debit/credit display)
- TransactionStatus (maps all transaction statuses to pills)
- KYCStatus

## Rules agents must follow

1. Use only components from `packages/ui`. Do not create one-off styled divs.
2. If a needed component does not exist yet, add it to `packages/ui` first, then use it.
3. Text aligns top-left. Numbers align top-right. Both in tables too.
4. Never truncate text with ellipsis unless the user explicitly requests it.
5. No modals in admin. Use SidePanel which pushes the main content.
6. All interactive elements must be keyboard accessible.
7. Inline elements (icons next to labels) must be `display: inline` or `inline-flex`, never `block`.
8. Do not use Tailwind `truncate`, `line-clamp`, or `overflow-hidden` on text without explicit approval.
