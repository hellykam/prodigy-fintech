# Vixi Email Templates — Design Reference

**Source:** Figma "Vixi wallet + presale CRM [shared]", Emails page
**File key:** YHKGP7o2yXw4WnVIZFGOgl, node 3:4
**Note:** This page contains the email shell/template component and design tokens only. Specific email copy is documented in the relevant feature docs (onboarding `04`, wallet screens `05`, invites/rewards `09`).

---

## 1. Template Structure

All Vixi emails share the same structural shell (640px fixed width):

```
┌─────────────────────────────┐  ← 640px
│  Logo (header area)          │  ← gradient or solid bg, height 91px
├─────────────────────────────┤
│  Header text                 │  ← Verdana Bold 28px / 36px line-height
│                              │
│  Body text                   │  ← Verdana Regular 14px / 20px
│                              │
│  [CTA Button]  240×52px      │  ← Primary gradient button, border-radius 12px
│                              │
│  Footer text (support info)  │  ← Verdana Regular 12px, grey
├─────────────────────────────┤
│  Footer bar (175px tall)     │  ← #F0F9FF (light) or dark bg
│  Logo  |  Social icons       │
│  App Store + Google Play     │
│  Copyright  |  Unsubscribe   │
│  Legal disclaimer            │
└─────────────────────────────┘
```

---

## 2. Two Themes

### Light Theme (Vixichain)
- Background: white `#FFFFFF`
- Header gradient: `linear-gradient(68deg, #E8F5FF 0%, #B3D2F3 97%)`
- Text: `#000000`
- Footer bar: `#F0F9FF`
- Footer text: `#000000`
- Social icon bg: `#CAE4F5`
- Copyright: `Copyright © Vixichain. All rights reserved.`

### Dark Theme (Vixiwallet)
- Background: dark
- Text: light
- Footer text: `#B2B2B2`
- Social icon bg: white `#FFFFFF`
- Copyright: `© Vixiwallet`

---

## 3. Typography

| Element | Font | Weight | Size | Line-height |
|---|---|---|---|---|
| Header | Verdana | Bold 700 | 28px | 36px |
| Body | Verdana | Regular 400 | 14px | 20px |
| Footer text | Verdana | Regular 400 | 12px | 18px |
| Footer legal | Verdana | Regular 400 | 12px | — |
| CTA button | Onest | SemiBold 600 | 16px | — |
| Secondary button | Onest | SemiBold 600 | 14px | — |

---

## 4. CTA Button Variants

| Label | Style | Use case |
|---|---|---|
| `Reset password` | Primary (blue gradient) | Password reset email |
| `See transaction details` | Primary (blue gradient) | Transaction notification |
| `Create Wallet` | Primary (blue gradient) | Onboarding/signup |
| `Verify account` | Primary (blue gradient) | Email verification |
| `[generic Button]` | Primary (blue gradient) | Placeholder / other |

**Primary button style:**
- Fill: `linear-gradient(90deg, #0166D5 0%, #0098FF 100%)`
- Size: 240×52px, border-radius 12px, padding 8px 24px
- Text: white `#FFFFFF`, Onest SemiBold 16px

---

## 5. Footer — Fixed Content

### Support block (both themes)

```
Have questions? please use our support form https://vixichain.org/contact-us/
or send us an email directly to support@vixichain.org.
Our Support Team will be happy to assist you and will reply shortly.

Sincerely,
The Vixichain Team
```

### Footer bar

- Logo (Vixichain or Vixiwallet)
- Social icons × 5 (X/Twitter, Telegram, Instagram, LinkedIn, Discord — exact order TBD from icon assets)
- App Store badge (Apple, Black, EN)
- Google Play badge (Black, EN)
- `Copyright © Vixichain. All rights reserved.` / `© Vixiwallet`
- `Unsubscribe here` — link, Verdana Bold 12px, `#0166D5`

### Legal disclaimer (full text)

> The blockchain technology and ecosystem services provided by UAB Vixi Tech, a Lithuanian-registered entity licensed as a Virtual Asset Service Provider (VASP), operate under their respective jurisdictions and comply with all relevant regulations. The issuance and management of VIXC tokens and NFTs (Non-Fungible Stable Tokens) are conducted by Vixi Markets LTD, a British Virgin Islands (BVI)-based entity.
>
> Please note that this email is for informational purposes only and does not constitute financial, investment, or legal advice. We strongly encourage you to conduct your own due diligence and consult with appropriate advisors before engaging with Vixichain's blockchain ecosystem or purchasing VIXC tokens or NFTs. Digital asset markets involve risks, including market volatility, regulatory uncertainties, and potential loss of value. By participating, you acknowledge and accept these risks.

---

## 6. Legal Entities Referenced

| Entity | Jurisdiction | Role |
|---|---|---|
| UAB Vixi Tech | Lithuania | VASP licensed; blockchain technology & ecosystem services |
| Vixi Markets LTD | British Virgin Islands (BVI) | VIXC token & NFT issuance and management |

---

## 7. Email Inbox Preview Component

The Figma page includes a mock inbox component (Gmail-style) showing how emails appear in:
- **Inbox** view — subject line visible
- **Promotions** tab — category badge visible

Fields shown: From name, From email, To, Subject, Timestamp.
