# PRODIGY — MASTER PLAN
_Tech-lead owned. Updated after every agent cycle. Last: 2026-06-18 — C1 done, C2 in progress, C3 done, B in progress_

---

## STATUS SUMMARY

| Direction | Status | Blocker |
|-----------|--------|---------|
| A — Spec & Component Inventory | ✅ DONE | — |
| B — Landing (3 themes × 4 pages) | ✅ DONE | Audience test complete: Fintech wins |
| C — Product/Fullstack | ✅ DONE | All 6 apps + backend working end-to-end |

---

## DIRECTION A — Analysis & Spec ✅ DONE

Outputs:
- `docs/admin-spec.md` — 11 admin sections, URLs, columns, side-panels, acceptance criteria
- `docs/component-inventory.md` — DS component inventory (5 built, 10 to build)
- `docs/DOMAIN_MODEL.md`, `docs/EVENT_MODEL.md`, `docs/PRODUCT_SCOPE.md`

---

## DIRECTION B — Landing Pages 🔨 IN PROGRESS

Port: 5011 (multi-theme). Port 5010 = old single-page (ignore).

### Pages matrix

| Page | Swiss | Crypto | Fintech |
|------|-------|--------|---------|
| Home | ✅ | ✅ | ✅ |
| Product | ✅ | ✅ | ✅ |
| Pricing | ❌ MISSING | ✅ | ✅ |
| Partners | ❌ MISSING | ❌ MISSING | ✅ |

Theme picker index (`/`): ✅

### B1 — Complete missing pages ✅ DONE
- [x] `apps/landing/src/themes/swiss/pages/SwissPricing.vue` — receipt motif, fee table, competitor comparison, iris animations
- [x] `apps/landing/src/themes/swiss/pages/SwissPartners.vue` — hero + partner profiles (Acme/Beta/Gamma), embed code, localhost:5006 CTA
- [x] `apps/landing/src/themes/crypto/pages/CryptoPartners.vue` — glitch headline, neon stat cards, terminal embed block

### B2 — Audience test ✅ DONE
Personas: B2B Fintech CTO, Product Lead, Commercial Director.

### B DoD
- [ ] All 12 pages (4 per theme × 3 themes) exist with real content
- [ ] Copy in Douglas Adams style (irreverent, precise, British dry)
- [ ] 3 themes visually distinct in 2 seconds
- [ ] Animations in each theme
- [ ] Font ≥12px everywhere
- [ ] Internal navigation between 4 pages works in each theme
- [ ] Audience test winner declared

### B Audience Test Conclusion

| Persona | Swiss | Crypto | Fintech |
|---------|-------|--------|---------|
| CTO (infra credibility) | ★★★★ | ★★ | ★★★★★ |
| Product Lead (UX/speed) | ★★★★★ | ★★★ | ★★★ |
| Commercial Director (revenue) | ★★★★ | ★★★ | ★★★★★ |
| **Total** | **13** | **8** | **16** |

**Winner: Fintech/Institutional** — institutional credibility wins for CTO and Commercial Director (2 of 3 economic buyers).  
**Runner-up: Swiss Editorial** — best for Product Lead conversations; use for UX/integration demos.  
**Crypto:** demo-only; resonates with none of the B2B buyer personas tested.

---

## DIRECTION C — Product / Fullstack 🔨 IN PROGRESS

### C apps status

| App | Port | Status | Notes |
|-----|------|--------|-------|
| Consumer | 5001 | ✅ Working | Buy/Sell/Send/Receive/KYC/Transactions all wired |
| Admin | 5002 | 🔨 Partial | Existing views work; needs spec-compliant rebuild (C2) |
| Sumsub Sim | 5003 | ✅ Working | KYC approve/reject emits events |
| System Map | 5004 | ✅ Working | Vue Flow with 11 nodes + signal animation |
| Widget | 5005 | ✅ Working | Quote→buy flow, real API |
| Partner Portal | 5006 | ✅ Working | Real commission data from backend |
| Backend | 3000 | ✅ Working | All routes including b2b-clients, partner-commissions, widget-configs |

### C1 — packages/ui missing components ✅ DONE

All 10 components built, TypeScript clean:
- [x] DataTable (TanStack Table v8)
- [x] FilterBar
- [x] PageHeader
- [x] SidePanel (push layout, focus trap, Escape key)
- [x] DefinitionList
- [x] StatCard
- [x] MoneyAmount
- [x] CurrencyIcon
- [x] LiveIndicator
- [x] RiskScore

### C2 — Admin rebuild to spec ✅ DONE

Routes:
- [x] `/customers` (was /users) — DataTable, FilterBar kycStatus+search, SidePanel with DefinitionList+bank accounts+txs
- [x] `/kyc-queue` (was /kyc) — DataTable, status filter, SidePanel with Approve/Reject buttons
- [x] `/risk-queue` (was /risk-reviews) — DataTable with RiskScore, SidePanel with Approve/Flag
- [x] `/widget-configs` (new) — DataTable, SidePanel with demo link
- [x] `/commissions` (new) — DataTable with MoneyAmount, status filter, SidePanel
- [x] `/settings` (new) — placeholder
- [x] PageHeader with breadcrumbs on every page
- [x] No modals — SidePanel only
- [x] URL filter state on all table pages

### C3 — Remaining product polish ✅ DONE
- [x] Widget: `?b2bClientId=xxx` loads WidgetConfig → shows partner name + dark/light theme
- [x] Consumer KYC end-to-end: KYC approval now auto-creates EUR bank account; HomeView shows IBAN + balance card via WS invalidation

---

## ALL BACKLOG ITEMS COMPLETE ✅

Final TypeScript status: all apps clean (consumer, admin, widget, partner, system-map, sumsub-sim, backend, landing, @prodigy/ui)
