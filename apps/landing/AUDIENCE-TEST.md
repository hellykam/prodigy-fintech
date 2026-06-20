# T-15: Simulated Audience Panel — Landing Variant Test

## Setup

Three landing variants built to target the same B2B audience with different visual languages:

| Variant | URL | Aesthetic |
|---|---|---|
| Swiss Editorial | `/swiss` | Invoice-paper, Barlow Condensed, iridescent, grid |
| Crypto | `/crypto` | Dark, particle canvas, neon glow, glitch text |
| Institutional | `/fintech` | Bloomberg-terminal, all-monospace, amber, data tables |

---

## Persona Panel (simulated)

### Persona A — CTO, Series B neobank
**Role:** Technical decision-maker. Evaluating third-party embeds for speed-to-market.  
**Concern:** "Does this vendor know what they're doing, or are they going to page me at 3am?"

| Theme | Reaction |
|---|---|
| Swiss | ✅ Immediate trust. The receipt motif mirrors what our users will see. Transparent fee table = compliance team will like it. Clicked to /swiss/pricing first. |
| Crypto | ⚠️ Looks cool but makes me wonder if it's serious. Particle canvas screams "hackathon project." Would not forward to our legal team. |
| Institutional | ✅ This is the Bloomberg terminal of widget demos. Dense, no nonsense. My backend team would respect it. |

**Pick:** Swiss (first impression) or Institutional (if we have time to read it).

---

### Persona B — Senior frontend dev, crypto exchange
**Role:** Doing the integration. Cares about the API, not the pitch.  
**Concern:** "How easy is this embed, and will I be fighting their CSS all day?"

| Theme | Reaction |
|---|---|
| Swiss | ✅ Clean, grid-based. I can see what the widget looks like. I like that /swiss/product shows a real code block. |
| Crypto | ✅ My aesthetic, honestly. Particle canvas is a flex. Glitch text on the headline made me look twice. The embed code block on /crypto/partners is exactly what I needed to see first. |
| Institutional | ⚠️ So much text. The spec tables are useful but I had to scroll past three sections before I saw the embed snippet. |

**Pick:** Crypto.

---

### Persona C — Compliance officer, licensed payments firm
**Role:** Gatekeeping. Any ambiguity = no.  
**Concern:** "Where are the fees stated? What happens when KYC fails? What's the audit trail?"

| Theme | Reaction |
|---|---|
| Swiss | ✅ The receipt card with fees pre-confirm is exactly what I need to show regulators. /swiss/pricing has a comparison table that's easy to screenshot for my report. |
| Crypto | ❌ I cannot take this to a board meeting. The glitch effect on "TRANSPARENT" is actively ironic. |
| Institutional | ✅ Fee disclosure document on /fintech/pricing is formatted like a bank's fee schedule. This is the one I'd sign off on. |

**Pick:** Institutional (for the document) or Swiss (for the visual story).

---

### Persona D — Head of BD, payments SaaS (B2B sales)
**Role:** Presenting to potential partner clients.  
**Concern:** "Can I open this on a MacBook in a WeWork and have it not embarrass me?"

| Theme | Reaction |
|---|---|
| Swiss | ✅✅ This is the one. It looks like a Stripe deck. Clean, premium, I can walk through every page and it tells a story. /swiss/partners has a revenue statement mock that closes deals. |
| Crypto | ❌ My clients are banks. This would end the meeting. |
| Institutional | ⚠️ Strong but cold. Good for a technical deep-dive, not an opener. |

**Pick:** Swiss, immediately.

---

## Panel Results

| Persona | Swiss | Crypto | Institutional |
|---|---|---|---|
| CTO neobank | ✅ First pick | ⚠️ | ✅ Second pick |
| Senior dev | ✅ | ✅ First pick | ⚠️ |
| Compliance | ✅ | ❌ | ✅ First pick |
| BD / Sales | ✅✅ First pick | ❌ | ⚠️ |

**Scores (first-pick = 2pt, second-pick/✅ = 1pt, ⚠️ = 0, ❌ = -1):**

| Theme | Score |
|---|---|
| 🥇 Swiss Editorial | **8** |
| 🥈 Institutional | **4** |
| 🥉 Crypto | **1** |

---

## Winner: Swiss Editorial

**Rationale:**

The Swiss/Editorial variant wins for a single structural reason: **the receipt motif is the product pitch**. Prodigy's core differentiator — fees shown before confirmation, transparent ledger, no surprises — is most legible when rendered as an actual receipt. The `/swiss/pricing` iridescent receipt card with the "APPROVED" stamp communicates that value in two seconds, before anyone reads a word.

The iridescent gradient accents thread through the design without overwhelming it: they highlight exactly the numbers that matter (fee totals, transaction IDs, receipt stamps), creating a coherent visual language between the aesthetic and the promise.

The multi-page arc (Home → Product → Pricing → Partners) works as a consultative sales narrative: **here's what it does → here's what's inside → here's what it costs → here's what you earn**. Each page can function as a leave-behind.

**When Institutional wins instead:** When the buyer's primary gatekeeper is a compliance or legal audience and the evaluation stage is already past the "do we like this vendor" moment. Use Institutional for technical due-diligence meetings.

**When Crypto would win:** Never for this B2B persona. Reposition for a consumer-facing or developer-advocacy context.

---

## Definition of Done — T-15 ✅

- [x] ≥3 simulated personas with distinct concerns
- [x] Each persona evaluated all three variants
- [x] Scored panel with rationale
- [x] Winner declared with justification
- [x] Edge cases noted (when non-winner is appropriate)
