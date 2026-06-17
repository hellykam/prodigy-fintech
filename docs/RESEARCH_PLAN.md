# Prodigy Fintech — Research Plan

## Purpose

Inform feature decisions before building. Research outputs go into `docs/research/`.

## Research tracks

### Track 1: Legacy Figma (separate chat/session)

Goal: Extract all admin and consumer app features from the existing Figma.
Label everything found as "legacy-figma".
Do not copy the design — only the feature list and UX patterns.

Deliverable: `docs/research/legacy-figma/feature-inventory.md`

### Track 2: Coinify competitor analysis

URL: https://www.coinify.com/

Goal: Understand their widget embedding model, B2B onboarding, fee structure,
conversion flow, and what they do well vs poorly.

Deliverables:
- `docs/research/competitors/coinify.md`
- Widget embed pattern analysis
- B2B partner flow analysis
- Fee display patterns
- KYC flow patterns

### Track 3: KYC / AML best practices

Goal: Understand what a real KYC/AML flow looks like so our simulator is convincing.

Topics:
- Sumsub API flows (webhook events, applicant statuses, document types)
- FATF Travel Rule (originator/beneficiary info for crypto transfers)
- Transaction monitoring rules (velocity, amount thresholds, sanctioned wallets)
- Risk scoring approaches (rules-based vs ML hybrid)
- Manual review queue UX patterns

Deliverable: `docs/research/kyc-risk/best-practices.md`

### Track 4: Widget / embed patterns

Goal: Understand how financial widgets are embedded across the industry.

Examples: Coinify, MoonPay, Ramp Network, Transak, Banxa

Topics:
- Embed code patterns (script tag vs iframe)
- Customization API (colors, currencies, fees, callbacks)
- Authentication handoff
- Webhook/callback design
- White-label approaches

Deliverable: `docs/research/widget-patterns/embed-patterns.md`

### Track 5: Admin dashboard patterns for fintech

Goal: Collect reference patterns for fintech admin UX.

Topics:
- Transaction monitoring UIs (Chainalysis, Elliptic style)
- KYC review queue patterns
- Risk case management
- Ledger/balance display
- Live event feeds

Deliverable: `docs/research/admin-patterns/fintech-admin.md`

## Research status

| Track | Status | Owner |
|-------|--------|-------|
| Legacy Figma | Not started (separate chat) | - |
| Coinify | Not started | - |
| KYC/AML | Not started | - |
| Widget patterns | Not started | - |
| Admin patterns | Not started | - |
