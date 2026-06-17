# ADR 0004: Admin Page Types

Date: 2026-06-17
Status: Accepted

## Decision

Admin app has exactly three page types. No exceptions without explicit approval.

1. Dashboard page
2. Full-width table/list page
3. Entity detail page

No tabs. No modals. Side panels push content and have URLs.

## Why

- Tabs fragment information and break deep-linking.
- Modals break browser history and keyboard flow.
- Three consistent page types means agents never have to decide layout — they just choose the type.
- Side panels with URLs = shareable, bookmarkable, browser-back-button-compatible.
