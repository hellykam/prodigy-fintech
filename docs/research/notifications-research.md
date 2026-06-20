# Notifications — Market Research & Best Practices

> Basis for NF-001 → NF-008 tasks.

---

## 1. What Top Apps Do

### Revolut — gold standard for consumer fintech
- Every transaction → instant in-app notification + push (if permitted)
- **Notification center**: swipeable list, grouped by "Today / Yesterday / This week"
- Icon per category: 💸 payment, 🔐 security alert, ✅ account, 📋 statement
- Tap → deep link to the relevant screen (transaction detail, security settings)
- Unread count badge on bell icon, disappears when center opened
- Long-press item → "Mark as read" / "Delete"
- Preference center: user toggles each category on/off independently
- Email: weekly spending summary, security alerts, statement ready
- **Key insight:** the notification center IS the activity feed — not a separate concept

### Wise — best-in-class for transactional email
- Email on every transfer state: submitted → processing → completed → failed
- Each email contains: sender, recipient, full fee breakdown, exchange rate used, reference number, estimated arrival
- In-app: "Activity" tab = transactions + notifications merged into one timeline
- Each transaction has a status timeline inside it (Submitted → Payment received → Processing → Sent → Confirmed)
- Security email on: new device login, password change, 2FA change
- Compliance: KYC document request, verification result, what to do if rejected
- **Key insight:** Wise email receipts are so detailed that compliance teams use them as audit evidence

### Coinbase — crypto-specific patterns
- Email on every trade confirmation (looks like a receipt: asset, amount, price, fees, total)
- Price alerts: user sets target price, gets notified when hit
- Push: "Your Bitcoin purchase of $500 is complete"
- Admin view: real-time order fill notifications
- **Key insight:** showing the fee in the notification (not just "purchase complete") builds trust

### MoonPay — on-ramp/off-ramp specific
- Email at each state: order created, payment received, crypto sent, completed
- KYC emails: "Your documents are under review" / "Your identity has been verified" / "Verification failed — here's why"
- Simple format, no clutter — single CTA per email
- **Key insight:** KYC rejection email with specific reason is critical — reduces support tickets

### Stripe — B2B operational notifications
- Email on: failed webhook, payment dispute opened, payout completed, chargeback
- Dashboard notifications: "3 disputes need your attention" grouped by urgency
- Digest mode: daily/weekly summary instead of per-event emails
- Developer: webhook delivery failures come with retry status
- **Key insight:** operational alerts for admins need urgency levels (info / warning / critical)

### N26 — minimalist approach
- Push only for card spend (instant)
- No notification center — transaction list IS the feed
- Weekly digest email, not per-transaction
- **Key insight:** less can be more. For a demo though, more is better.

---

## 2. Notification Types by Persona

### Consumer
| Event | In-app toast | Notification center | Email |
|---|---|---|---|
| Signup welcome | — | — | ✅ "Welcome to Prodigy" |
| KYC submitted | ✅ | ✅ | ✅ "We're reviewing your documents" |
| KYC approved | ✅ | ✅ | ✅ "You're verified! Here's your IBAN" |
| KYC rejected | ✅ | ✅ | ✅ "Verification failed — reason + what to do" |
| KYC manual review | ✅ | ✅ | ✅ "Under manual review, 1–3 days" |
| Transaction created | ✅ | ✅ | — |
| Transaction completed | ✅ | ✅ | ✅ Full receipt with fees |
| Transaction failed | ✅ | ✅ | ✅ "Failed — reason + what to do" |
| Reward earned | — | ✅ | — |
| Referral signed up | — | ✅ | — |
| Security: new login | — | ✅ | ✅ "New device sign-in" |

### Admin
| Event | In-app alert | Notification bell |
|---|---|---|
| New KYC manual review | ✅ | ✅ with count |
| New risk review opened | ✅ | ✅ with count |
| High-risk transaction flagged | ✅ | ✅ |
| Transaction approved (by other admin) | — | ✅ |
| Partner commission threshold reached | — | ✅ |
| System event: provider offline | ✅ | ✅ |

### Partner
| Event | In-app | Email |
|---|---|---|
| New transaction attributed | ✅ | weekly digest |
| Commission accrued | — | weekly digest |
| Payout scheduled | ✅ | ✅ |
| Widget config change approved | ✅ | ✅ |

---

## 3. Email Design Patterns

### Best-in-class email structure (Wise/Stripe model):
```
[Logo]
[Headline — large, 1 sentence]
[Key info card — amount, asset, status]
[Detail table — all fields with values]
[Single CTA button]
[Footer — support link, unsubscribe, legal]
```

### For our demo — email simulation approach:
We don't run real SMTP (no Sendgrid/SES). Instead:
- Build an **Email Preview Panel** inside the Consumer app: `/emails` route (or modal)
- Each triggered event creates a simulated email record
- User can open it and see a pixel-perfect rendered email template
- "Inbox" shows subject lines — click → full email view
- This makes the email story 100% demoable without any external service
- Emails stored in `Notification` table with `channel: 'email'`

### Email templates needed (HTML/CSS, rendered in browser):
1. **Welcome** — brand header, "Your account is ready", IBAN card (after KYC)
2. **KYC Approved** — green checkmark, "You're verified", your IBAN + BIC
3. **KYC Rejected** — reason field, "Here's what to do next", resubmit CTA
4. **Transaction Receipt** — full fee breakdown table, transaction ID, timestamp
5. **Transaction Failed** — reason, retry CTA
6. **Security Alert** — device info, "Not you? Secure your account" CTA
7. **Admin: Manual Review Needed** — applicant info, "Review now" CTA

---

## 4. Real-time Delivery Architecture

### What we have:
- WebSocket at `ws://localhost:3000/ws` — single connection per client
- Events broadcast to all connected clients
- Consumer already subscribes to `KYC_APPROVED`, `KYC_REJECTED` in KycView

### What we need:
- User-scoped WS events: only send to the specific user's connections (not broadcast to all)
- `Notification` model in DB: persists notifications so they survive page refresh
- `GET /api/notifications` — fetch user's notification history
- `POST /api/notifications/:id/read` — mark as read
- `POST /api/notifications/read-all`
- WS event `NOTIFICATION_CREATED` with notification payload — triggers bell badge update

### User-scoped delivery pattern:
Since we use a single WS for all events, include `userId` in every event payload.
Consumer app: filter incoming WS events by `event.payload.userId === currentUser.id`

---

## 5. Notification Preference Center

Best practice (Revolut/Coinbase model): separate preferences page.

Categories user can toggle:
- **Transaction alerts** — on/off (default: on)
- **KYC & security** — always on, cannot toggle (regulatory)
- **Rewards & referrals** — on/off (default: on)
- **Marketing** — off by default (GDPR)

Store as `notificationPrefs` JSON on User model.

For demo: add to Consumer Profile page → "Notifications" section with toggles.

---

## 6. Push Notifications (Web Push API)

Optional but impressive for demo. Implemented via:
- `navigator.serviceWorker` + `PushManager.subscribe()`
- VAPID key pair generated once, stored in backend env
- Service worker file: `public/sw.js` in Consumer app
- Request permission at the right moment: after first transaction completes (not on signup — too early)
- Backend: `POST /push-subscription` stores subscription endpoint per user
- On event: backend calls Web Push API to deliver notification

### Push notification copy:
```
"Your Bitcoin purchase is complete ✅"
  0.00852 BTC · Receipt in your app

"Identity verified 🎉"
  Your IBAN is ready: DE29 PROD...

"KYC documents under review 🔍"
  Estimated time: 1–3 business days
```

For demo: implement Web Push but don't block on it. If browser blocks permissions, in-app handles it.

---

## 7. Key UX Rules (from research)

1. **Toast ≠ Notification Center** — toast is ephemeral (3–5s), notification center is persistent. Both needed.
2. **Deep links always** — every notification taps/clicks to the relevant screen. Never dump user at home.
3. **Urgency levels** — info (grey) / success (green) / warning (amber) / error (red). Different visual weight.
4. **Action required vs FYI** — "KYC rejected — resubmit →" (action) vs "Transaction completed" (FYI). Different CTA.
5. **Group by date** — "Today", "Yesterday", "Last 7 days". Never paginate with offsets for notifications.
6. **Unread count cap** — show "9+" not "47". Don't alarm users.
7. **Mark all read** — one tap, always visible.
8. **Empty state** — "No notifications yet. When something happens, you'll see it here." Not a blank screen.
9. **Mobile: bottom of screen** — on mobile, notification center slides up from bottom (bottom sheet), not from side. Easier thumb reach.
10. **Admin: urgency badge** — "3 critical" vs "12 info". Admin bell is operational, not transactional.
