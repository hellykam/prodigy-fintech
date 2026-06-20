# Responsive rules

Every screen is responsive by default — not a follow-up pass.

## Principles
- Intrinsic, content-driven layout (flex/grid with min/max), not a fixed column grid.
- Define breakpoints once (in the design system / Tailwind config) and reuse them; no ad-hoc pixel widths.
- Tables: allow horizontal scroll when columns hit their min-width rather than crushing content.
- Forms: sections wrap; each field has a sensible min/max width.
- Full-screen flows: native scroll, no fixed heights that trap content.

## Check
Test each screen at mobile, tablet, and desktop widths before marking done.
