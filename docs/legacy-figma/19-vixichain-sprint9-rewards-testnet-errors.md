# Vixichain — Sprint 9: Rewards, Testnet Banner, Error Pages (Romanov's team)

**Source:** Figma "Vixichain Wallet" (vbGInZbVbXfOIS0D6SlNvY), +DDD sprint 9, node 9074:66084
**Team:** Romanov's team (DDD)
**Covers:** Rewards feature (Wallet + Admin + Explorer), Testnet banner component, Error pages, BaV rule update (Non-document KYC removed), Explorer updates with tokenomics

---

## 1. Testnet Banner (Global Component)

New component added to all apps: **`Testnet banner`**

- Full-width banner at the top of the page
- Fill: blue gradient (same as primary button — `linear-gradient(90deg, #0166D5, #0098FF)`)
- Added to: Wallet, Explorer (1440px + 375px), Admin, BaV Portal

**Testnet/Mainnet variants:**
- TestNet only (opacity 0.4 — muted)
- Mainnet active
- Both TestNet + MainNet

---

## 2. Rewards Feature

Sections: **"Rewards reflection"**, **"Rewards in Wallet, Admin & Explorer"**

Timeline annotation:
- "Added Rewards & other updates - march 15+"
- "Later / April - ok"

### Wallet — Rewards Page

Frame: **"Wallet - Rewards"** (1440×900)

New page in the Wallet app showing user rewards.

### Admin — Rewards Page

Frame: **"Rewards"** (admin panel, 1880px wide — uses `Menu side admin` at 240px)

New section in the Admin panel for managing/viewing rewards.

### Explorer — Rewards

Explorer updated with three variants depending on tokenomics display settings:

| Variant | Testnet/Mainnet |
|---|---|
| Explorer - updates - just with rewards | TestNet + MainNet |
| Explorer - updates - without tokenomics | TestNet only |
| Explorer - updates - with tokenomics - mainnet | TestNet + MainNet |

---

## 3. VIXC Token Supply Data

From design annotation (balance card):
> "2.9b VIXC Total Supply (minted): / 5`b VIXC Total Supply (max):"

- **Minted supply:** 2.9 billion VIXC
- **Max supply:** 5 billion VIXC

---

## 4. Explorer — Balance Card Component

New component: **`explorer data card`**
- Dimensions: 342×auto, padding 12px 16px, gap 24px
- Border: `#F2F2F2`, shadow, borderRadius 16px
- Shows token/blockchain statistics on the Explorer homepage

---

## 5. Explorer — Updated Breakpoints

New Explorer breakpoints added in this sprint:

| Frame | Width |
|---|---|
| Explorer public (desktop) | 2000px |
| 375 Explorer public (mobile) | 375px |

Both include the Testnet banner component.

---

## 6. BaV Portal — Rule Update

Section: **"BaV Portal - updates"**

**Critical rule change:**
Section label: **"Create & Edit rule — updated: Non-document KYC removed as a feature"**

The **Non-document KYC** option was removed from the rule creation/editing interface. This was a KYC verification method that didn't require document uploads.

**Implication:** Only standard document-based KYC (via Sumsub) is available. The rule form no longer has a non-document KYC toggle/option.

Two updated `Rule details` screen iterations.

---

## 7. Error Pages

Section label: **"Error pages"**
Two `Error` screen designs (1440×900):
- Standard error page (e.g., 404, 500)
- Layout: centered content with icon + message + footer

---

## 8. Admin — Referrals

Frame: **"Referrals"** (1880px wide, admin panel layout)

New section in the Admin panel: Referrals management page.

---

## 9. Summary: What Changed in Sprint 9

| Change | Impact |
|---|---|
| Testnet banner | All apps show testnet indicator when on testnet |
| Rewards pages | New feature in Wallet, Admin, Explorer |
| Non-document KYC removed from rules | BaV rule form simplified |
| Error pages | Standard error screens added |
| Admin referrals | New admin section |
| VIXC supply displayed | Explorer shows 2.9b minted / 5b max |
