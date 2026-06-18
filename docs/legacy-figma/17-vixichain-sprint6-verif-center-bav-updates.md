# Vixichain Wallet — Sprint 6: Verification Center + BaV Updates

**Source:** Figma "Vixichain Wallet" (vbGInZbVbXfOIS0D6SlNvY), +Design (sprint 6), node 6433:91979
**Covers:** Wallet Verification Center, BaV Portal rule/version history/notification updates, Settings updates, side menu behavior

---

## 1. Critical Product Decision (from design annotation)

Large sticky note at the top of this sprint canvas:

> **"FOR NOW (jan 29) Decided to HIDE countries from BaVs (edit in wallet section), but keep in the rule"**

**Impact:** BaV validators can no longer edit the countries list directly in their wallet section. Countries still exist as a field inside rules — they are visible in the rule — but the edit capability was removed from BaVs.

---

## 2. Wallet — Verification Center

Section: **"Wallet / Verification center"**

Updated verification center page in the wallet. Single scrollable page layout (1440×auto, taller than 900px).

Content (see Sprint 2 doc `13-...` for base spec — this is an update/refinement of that):
- Verification steps list with status indicators
- Action buttons per step
- Updated to reflect final design

---

## 3. BaV Portal — Rule Updates

Section: **"BaV Portal - updates"**

### 3a. Rules List — Menu & Tabs Update

Section label: **"Rules [menu, tabs]"**

The Rules list page was updated:
- New tab layout
- Updated context menu
- `Menu for Bav` — updated BaV-specific side menu component

### 3b. Rule Table Update

Section label: **"Rule table"**

Minor updates to the rules table layout.

### 3c. Create & Edit Rule — Updated

Section label: **"Create & Edit rule — updated"**

The Create/Edit rule form was redesigned.

**Designer note (yellow sticky):**
> "Same for admin, but in admin = view only (vixi can only view BaV's rules)"

**Implication:** Vixichain admin users can view BaV rules but cannot edit them. The rule editor is exclusive to BaV validators.

Two updated `Rule details` screen iterations.

---

## 4. BaV Portal — Version History Updates

Section label: **"Vers.history, Appliying version: leaving comment"**

New interactions added to Version History:

### Adding a Comment
When applying a previous version of a rule:
- User can optionally leave a comment explaining why they are reverting
- Comment field appears in the apply-version dialog

### Viewing Comments in Version History
- Version history list now shows comments alongside each version entry
- Click a version to expand and view the full comment

---

## 5. Updates from Vixichain (New Feature)

Section label: **"Updates from Vixichain (notif from vixi)"**
Screens: **"Updates from Vixichain"** (2 iterations)

New section in the BaV portal: when Vixichain pushes ruleset updates or changes to BaV validators, this screen shows them.

**Designer note:**
> "Rules: Notification status about that new notif in 'Updates from Vixichain'"

- BaV validators see a notification badge/indicator when new updates arrive from Vixichain
- Updates page lists all incoming rule changes
- BaV can review and acknowledge

---

## 6. Settings — Updated

Section label: **"Settings"**
5 screen iterations (multiple states including modal dialogs).

Settings page updated this sprint. Modal dialogs (centered, 560px wide overlay) appear for:
- Confirmation actions within settings
- Delete/reset confirmations

---

## 7. Side Menu — BaV Portal Behavior Notes

Two notes related to side menu behavior (yellow stickies):

1. **"How menu works for screens with big height"** — side menu behavior on tall content pages
2. **"Scroll menu when height is small"** — when the viewport height is small (e.g., short screens), the side menu itself becomes scrollable

**Side menu component updated:** `Menu side wallet` (type=full, version=BaV)
- Standard height: 752px
- Tall variant: 1120px (scrollable)
- Background: `#F0F9FF`, border: `#DAF0FF`

---

## 8. User Menu (Top Right Corner)

**"User menu"** component updated:
- `Menu Right Corner` — Version=New, Menus=Profile
- Appears at top-right of the wallet header
- Contains profile actions

---

## 9. Additional Design Notes

**Node info notification:**
> "Node info: Notification status if node is offline (no need to show 'online' status, it should be default)"

→ For the node status indicator: only show status when the node is **offline**. Online is the default/assumed state and does not need to be displayed.

**Large amounts:**
> "State when amount is big"

→ The UI has a specific state for when transaction amounts are large numbers (overflow/truncation handling).
