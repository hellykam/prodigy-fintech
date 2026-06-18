# Vixichain Wallet — Sprint 3: Rules Engine (BaV Portal)

**Source:** Figma "Vixichain Wallet" (vbGInZbVbXfOIS0D6SlNvY), Design (sprint 3), node 4444:70407
**Covers:** BaV Portal — Rules engine, Countries management, version history, create/edit/delete rule flows

---

## 1. Context: BaV Portal

Sprint 3 is exclusively the **Bank as Validator (BaV) Portal** — a separate web application within the Vixichain ecosystem for validated organizations.

- Design frame color-code: orange (`#FF842D`)
- Context label in Figma: `bav portal`
- Footer: `© 2025 All rights reserved to Vixichain` + **Mainnet | Switch to Testnet** toggle
- Header shows org name (e.g., "Quantum Solutions") + org avatar initials ("QS")
- Side menu: 240px, background `#F0F9FF`, border `#DAF0FF`

---

## 2. Rule Entity — Data Model

**Two rule types:**

| Type | Created by |
|---|---|
| `vixiRiskRule` | Platform (Vixichain sets defaults) |
| `bavRiskRule` | BaV organization (validators customize) |

**Risk Score entity:**

| Type | Created by |
|---|---|
| Score by VIXI | Platform-calculated risk score |
| Score by BaV | Validator-assigned risk score |

---

## 3. Rules Page — Main View

### Navigation Tabs
Three tabs on the Rules management page:
1. **Rules** (selected by default)
2. **Countries**
3. **Notifications**

### Rules Tab — Table

**Search field:** "Rule name or description" (placeholder)

**Action buttons:**
- Filter button (secondary, blue)
- **Create new rule** button (primary blue gradient — disabled until valid input)

**Table columns:**

| Column | Description |
|---|---|
| Rule name | Name of the rule (sortable) |
| Risk level | Low / Medium / High / All (sortable + filterable) |
| Client | Individual / Business / All (sortable) |
| Countries | Applicable countries (sortable + filterable) |
| Onboarding | Applies at onboarding? (sortable) |
| Max Amt ($) | Maximum transaction amount in USD (sortable) |
| Type | Transaction type (sortable) |
| Currencies | Applicable crypto currencies (sortable) |
| Action | Compliance action triggered (sortable) |
| SoF | Source of Funds required? (sortable) |

**Risk level color coding:**
- Low → `#00992B` (green)
- Medium → `#D98A00` (amber/orange)
- High → `#FF6651` (red)
- All → `#000000` (black)
- Multiple values displayed inline: e.g., `Medium, High` with each value color-coded

---

## 4. Create New Rule Flow

### Create Rule Screen

**Page title:** "Create new rule"

**Instructional text:**
> "You are creating the rule that will accept transactions made by Vixi clients that have the following setup. You as a Validator will be automatically signing transactions with this set of parameters. Edit it to align your policies."

**Form:** scrollable form, 506px wide

### Countries Sub-section (within rule form)

**Section heading:** "Country of Residence"

**Search:** search field with placeholder "Search"

**Countries table (within rule form):**

| Column | Notes |
|---|---|
| Country | Checkbox + country name (sortable) |
| Code | ISO country code (sortable) |
| Risk level | Low / Medium / High (sortable + filterable) |
| Risk score | Numeric score (sortable) |

Scrollable list with individual rows that can be checked/unchecked.

---

## 5. Edit Rule Flow

Interaction flow:
1. User selects a rule from the list
2. Context menu opens with options (3-dot or right-click)
3. User clicks **Edit rule**
4. Edit form opens — same layout as Create new rule form
5. Save / Cancel actions

---

## 6. Delete Rule Flow

Interaction flow:
1. User selects a rule from the list
2. Context menu opens
3. User clicks **Delete rule**
4. Confirmation dialog/modal appears (centered overlay, 560px wide)
5. Confirm → rule deleted / Cancel → return to list

---

## 7. Reset Rule to Default

Available from the rule context menu or rule details:
- Resets a `bavRiskRule` back to the corresponding `vixiRiskRule` default values
- Confirmation required before reset
- After reset: rule shows platform defaults

---

## 8. Update All Rules

Bulk action available at the page level:
- Label: "Update all rules"
- Updates all rules at once (likely applies a new default ruleset version)
- Confirmation required

---

## 9. Version History

Accessible from rule details or page-level action:
- Shows history of changes to a rule or the full ruleset
- Each version: timestamp, who changed it, what changed
- Ability to view a previous version

---

## 10. Rules Filter

Filter panel (opens as overlay):
- Filter by: Risk level, Client type, Countries, Currencies
- Applied filters shown as chips on the rules list
- "Clear all" to reset filters

---

## 11. Countries Tab

Separate tab within the Rules page for managing country risk settings.

### Countries List

**Search:** "Search country" interaction documented
**Filter:** "Filter country" interaction documented
**Edit:** "Edit countries list" — bulk edit mode

Countries table columns: `Country | Code | Risk level | Risk score`

### Edit Countries List
- Mass edit: change risk level or risk score for multiple countries at once
- Save / Cancel

---

## 12. Rule Details Page

**Page height:** 1402px (scrollable — much taller than standard 900px)
**Back button:** "← back" link returns to rules list

Contains full rule configuration including:
- Rule name + description
- All rule parameters (same fields as create form)
- Countries table sub-section
- Action buttons: Edit rule / Delete rule / Reset to default

**Hint tooltips:** appear on hover over specific fields (e.g., risk score calculation hints)

**Dropdown menus:** field-level dropdowns for parameter selection (e.g., transaction type, currency)

---

## 13. BaV Portal — Footer Notes

Footer on all BaV portal pages:
- Copyright: `© 2025 All rights reserved to Vixichain`
- **Mainnet** label with **"Switch to Testnet"** link (blue `#0166D5`)
- Logos: Vixichain, Chain-new, scan
- Social links: Facebook, Twitter, YouTube, Behance
