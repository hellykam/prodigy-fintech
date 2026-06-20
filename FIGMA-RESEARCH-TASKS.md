# Задачи из Figma Research
_Источник: 30 legacy Figma документов — Risely [shared], Risely [my file], VixiChain sprints, конкурентный анализ._
_Дата: 2026-06-19_

---

## Контекст

Figma документы покрывают два продуктовых поколения: **VixiChain** (криптокошелёк, sprints 1–9) и **Risely** (EU fintech + crypto, более зрелый продукт). В Risely — полноценный конкурентный анализ 14 приложений с "drunk test" оценками, детальные UX flows для каждого экрана, и список фич следующих версий.

**Что уже построено в Prodigy:** Buy, Sell, Send (базовый), Receive (базовый), KYC (5-step), Transactions (список), Rewards, Home, Profile, Inbox, весь Admin, весь Partner.

**Что в Figma но не в коде:** всё ниже.

---

# БЛОК A — CONSUMER: ПРОПУЩЕННЫЕ CORE ФИЧИ

---

## [ADDR-001] 🔴 Address Book / Beneficiary List

**Источник Figma:** `30-risely-myfile-features-next-versions.md § 4`, `25-risely-myfile-prototypes.md § 15`

Figma имеет полностью проработанное 4-ветвенное дерево выбора получателя:

```
Beneficials List
  ├── Risely Client, SAVED in beneficials → показать pre-filled форму
  ├── Risely Client, NOT saved → показать форму + "Сохранить?"
  ├── NOT Risely Client, SAVED → предложить "повторить транзакцию?"
  └── NOT Risely Client, NOT saved → полная форма + invite toggle
```

**Что построить:**

**Backend:**
```
GET  /api/beneficiaries?userId=        — список сохранённых получателей
POST /api/beneficiaries                — добавить нового
DELETE /api/beneficiaries/:id         — удалить
```

Prisma model:
```prisma
model Beneficiary {
  id          String   @id @default(cuid())
  userId      String
  name        String
  email       String?
  type        String   // "risely" | "fiat_external" | "crypto_external"
  iban        String?
  bic         String?
  walletAddress String?
  network     String?  // "ethereum" | "bitcoin"
  currency    String?
  isPersonal  Boolean  @default(true)
  createdAt   DateTime @default(now())
}
```

**Consumer UI:**

Страница `/beneficiaries` или drawer внутри Send flow:
- Список сохранённых: аватар + имя + тип (Risely / FIAT / Crypto)
- Поиск по имени или email
- "Add new beneficiary" кнопка
- Tap на beneficiary → открывает Send с pre-filled полями

**В Send flow:**
- На шаге выбора получателя — показывать список beneficiaries сверху
- "People from previous transactions" секция ниже (выводить из истории транзакций)
- "My accounts" секция (самому себе)

**Ключевое из Figma:** "Account + Amount first → then Beneficials list" — сначала выбрать откуда и что, потом кому. Это определяет тип операции (fiat или crypto) до выбора получателя.

**DoD:**
- [ ] Saved beneficiary открывает Send с pre-filled деталями
- [ ] Новый получатель сохраняется через toggle "Add to saved beneficiary?"
- [ ] Previous transactions recipients показываются в списке
- [ ] Search работает по имени и email

---

## [ADDR-002] 🟡 "Repeat Transaction" Shortcut

**Источник Figma:** `30-risely-myfile-features-next-versions.md § 4 Branch C`

Когда пользователь выбирает получателя которому уже отправлял — предложить повторить прошлую транзакцию.

```
"You've sent 0.01 BTC to Bob before — do the same?"
[Yes, same amount]  [No, enter new amount]
```

**Где показывать:**
- В Send flow при выборе получателя из beneficiaries
- В Transaction detail: кнопка "Repeat this transfer"

**Backend:** `GET /api/transactions?userId=&toAddress=&limit=1` — последняя транзакция с этим получателем.

**DoD:**
- [ ] В transaction detail есть кнопка "Repeat"
- [ ] При repeat — Send flow открывается с pre-filled суммой и получателем

---

## [SWAP-001] 🔴 Crypto-to-Crypto Swap

**Источник Figma:** `25-risely-myfile-prototypes.md § 8 (Swap section)`

Figma имеет полный 11-экранный swap flow:

```
Swap / 01 — пустое состояние
Swap / 02 — выбор "из" (from wallet drawer)
Swap / 03 — поиск в from drawer
Swap / 04 — выбор "в" (to drawer)
Swap / 05 — поиск в to drawer
Swap / 06 — ввод суммы (numeric keyboard)
Swap / 07 — Insufficient balance error (toast)
Swap / 08 — Review/confirm
Swap / 09 — Confirmation screen
Swap / 10 — Success state
Swap / 11 — Success с Lottie animation (тaller frame)
```

**Что отличает от Buy/Sell:** Swap — это конвертация BTC → ETH или ETH → USDT без участия фиата. Используются existing quote + market price endpoints.

**Backend:**
```
POST /api/quotes { sourceCurrency: 'BTC', targetCurrency: 'ETH', sourceAmount }
→ rate, fee, targetAmount, expiresAt
```

Уже работает! Просто нужен UI flow.

**Consumer UI — `/swap` страница:**
- **Step 1:** Выбрать FROM кошелёк (bottom drawer с поиском)
- **Step 2:** Выбрать TO валюту (bottom drawer с поиском)
- **Step 3:** Ввести сумму → live quote (debounce 500ms)
- **Step 4:** Review: курс, fee, получаю
- **Step 5:** Confirm → processing → success

**Bottom Drawer spec (из Figma):**
- 375×742px, white fill, `borderRadius: 20px 20px 0px 0px`
- Shadow: `0px 4px 34px rgba(0,0,0,0.1)` + `blur(10px)`
- Поиск вверху + scrollable список кошельков/валют

**Success animation:** Figma ссылается на Lottie файл. Использовать vue3-lottie + базовую checkmark анимацию.

**DoD:**
- [ ] From: показывает только кошельки с ненулевым балансом
- [ ] Quote обновляется при изменении суммы
- [ ] Insufficient balance → toast error, кнопка disabled
- [ ] Transaction создаётся, статус tracking работает
- [ ] Success screen с суммами (отдал / получил / курс)

---

## [SAFE-001] 🟡 Safety Tasks

**Источник Figma:** `30-risely-myfile-features-next-versions.md § 2 (Safety Tasks group)`, `25-risely-myfile-prototypes.md §14`

Figma определяет Safety Tasks как ключевую фичу. Показывается на Home (chip), в Profile, и в Burger Menu.

**5 задач безопасности (из Figma):**
1. **Biometrics** — включить Face ID / Touch ID
2. **Set MPIN** — установить 4-6 значный PIN
3. **Confirm email** — верифицировать email через OTP
4. **Confirm phone** — верифицировать телефон через OTP
5. **Enable 2FA** — Google Authenticator / TOTP

**UI в Consumer:**

Секция в Profile → "Security & Safety":
- Список из 5 задач с прогресс-индикатором `3/5 complete`
- Каждая задача: иконка + название + статус (done ✓ / not done →)
- На Home: маленький chip "⚠ 2 safety tasks pending" (из Figma — amber chip)

**Backend:**
```
GET  /api/users/:id/safety-status → { email: verified, phone: verified, mpin: set, biometrics: set, twofa: set }
POST /api/users/:id/verify-email  → send OTP
POST /api/users/:id/verify-phone  → send OTP
POST /api/users/:id/verify-otp   → { type: 'email'|'phone', code }
POST /api/users/:id/set-mpin     → { pin: '1234' }
```

**Симуляция для demo:**
- Verify email/phone: POST → wait 2s (симуляция OTP) → auto-verified
- MPIN: принять любые 4+ цифры
- Biometrics: фронтенд toggle, backend не нужен (localStorage)
- 2FA: skip для MVP (пометить "coming soon")

**DoD:**
- [ ] Safety tasks chip виден на Home когда есть незавершённые задачи
- [ ] Email verify flow работает (OTP симуляция)
- [ ] MPIN setup: ввести PIN → подтвердить → saved
- [ ] Прогресс 3/5 обновляется

---

## [ONBRD-001] 🔴 KYC Waiting State — Productive Onboarding

**Источник Figma:** `24-risely-myfile-research.md § 3`, `30-risely-myfile-features-next-versions.md § 5.1`, `25-risely-myfile-prototypes.md § 11`

**Критическая проблема из Figma (их слова):**
> "Pre-KYC = dead end. User arrives with no context. PIN asked too early — nothing to hide yet. Long wait with nothing to do."

**Что нужно сделать во время ожидания KYC (из Figma spec):**
```
While KYC is processing:
  - Safety tasks (biometrics, MPIN, email)
  - Organize your accounts (questionnaire)
  - "Which wallets do you want to use?" (pre-setup)
  - Add withdraw methods (beneficiaries)
  - Exploration mode (see market prices, features)
```

**Consumer UI:**

Когда `kycStatus = 'pending'` или `'in_progress'`:

Вместо "заблокированного" экрана — показывать **Onboarding Checklist**:
```
┌──────────────────────────────────────┐
│ ⏳ KYC is being reviewed...          │
│ Usually takes 24–48 hours            │
│                                      │
│ While you wait:                      │
│ ✓ Set up biometrics         Done     │
│ › Confirm your email     →           │
│ › Save your first beneficiary →      │
│ › Explore live rates     →           │
│                                      │
│ [Check KYC Status]  [Contact Support]│
└──────────────────────────────────────┘
```

Tabs Buy/Sell/Send: показывать disabled с tooltip "Complete KYC to unlock" — не прятать полностью.

**Figma annotation:** "we don't show the reason" — если страна blacklisted, показывать "We don't operate in your country yet" без объяснения почему.

**DoD:**
- [ ] KYC pending state — не пустой экран, а onboarding checklist
- [ ] Tabs заблокированы но видны (opacity 0.5, tooltip)
- [ ] "Check KYC Status" кнопка — делает refetch и показывает текущий статус
- [ ] Blocked country — "We don't operate in your country yet", без деталей

---

## [ONBRD-002] 🔴 Post-KYC First-Time Onboarding

**Источник Figma:** `28-risely-myfile-research-benchmarking.md § 5.1`, `25-risely-myfile-prototypes.md § 13`

**Что происходит сразу после KYC approved (из Figma spec):**

```
Email + In-App: "Welcome to Prodigy! 🎉"

Main screen:
  ├── Account: EUR (Lithuania) → [TRANSFER IN guide]
  ├── Wallets: BTC, ETH → [Open all →]
  ├── Transactions: "Here you will have your transactions"
  └── Primary CTA: "Make your first deposit →"

First-time Transfer IN flow (1-3 steps):
  1. Choose method: SEPA (within EU) or SWIFT
     (?) "SEPA = 1–2 business days, free; SWIFT = 3–5 days, fees apply"
  2. Open your bank app
  3. Copy REF NUMBER + IBAN
  4. Hit send
     → if they send USD: "Your USD will be auto-converted to EUR at market rate"
  5. Track: "We'll notify you when money arrives"
  
  [Share these instructions] button → iOS share sheet
```

**Consumer UI:**

После первого KYC approval и нулевого баланса:
- Home показывает **"Make your first deposit"** hero card (amber, full-width)
- Клик → `/deposit` страница с SEPA/SWIFT selector и step-by-step инструкцией
- Кнопка "Share instructions" → Web Share API / копирование текста с IBAN + REF

**DoD:**
- [ ] Post-KYC hero card виден только если balance = 0
- [ ] Deposit страница: SEPA vs SWIFT с объяснением разницы
- [ ] IBAN + REF prominently displayed, one-tap copy каждого
- [ ] Share instructions → системный share или копирование текста
- [ ] "Simulate deposit" кнопка (для demo)

---

## [RCPT-001] 🟡 Receive Fiat — REF NUMBER + Share

**Источник Figma:** `25-risely-myfile-prototypes.md § 10 (Receive FIAT)`, `28-risely-myfile-research-benchmarking.md § 3.1`

Текущий Receive показывает только crypto address/QR. Fiat receive (получить EUR на счёт) не реализован полностью.

**Figma spec для Fiat Receive:**
```
Screen "Receive Fiat":
  Header: "Receive EUR"
  
  [Copy IBAN]  → iban в clipboard + "Copied" toast
  IBAN: DE89PROD00001234567890
  
  [Copy REF NUMBER]  → ref в clipboard
  REF: REF-alice-001
  
  ────────────────────
  ☑ SEPA (within EU)    1–2 days, no fee
  ○ SWIFT (international) 3–5 days, ~€20
  
  ℹ️  When sending in USD: auto-converted to EUR at market rate
  
  [Share bank details]  ← Web Share API
  [Download as PDF]     ← PDF с реквизитами
```

**Web Share API:**
```ts
navigator.share({
  title: 'My Prodigy Bank Details',
  text: `Name: Alice Müller\nIBAN: DE89PROD...\nBIC: PRODDE77XXX\nREF: REF-alice-001\n\nFor SEPA/SWIFT transfers.`
})
```

**Если Share API недоступен:** fallback на copy to clipboard + toast.

**"Copied" toast (из Figma):** `#121212` dark fill, border-radius 10px, auto-dismiss 2s.

**DoD:**
- [ ] Отдельные Copy кнопки для IBAN и REF NUMBER
- [ ] SEPA/SWIFT selector с объяснением
- [ ] Предупреждение об auto-conversion (USD→EUR)
- [ ] Share button работает (Web Share API или clipboard fallback)

---

## [TRACK-001] 🟡 Transaction Tracking с Step Progress

**Источник Figma:** `30-risely-myfile-features-next-versions.md § 3`, `25-risely-myfile-prototypes.md § 15`

Figma: "Every transfer has a Tracking screen linked from transaction list". Текущий Transaction Detail показывает статус, но нет визуального прогресса.

**Добавить в Transaction Detail (Consumer):**

```
Transaction Status
━━━━━━━━━━━━━━━━━━━━━
✓ Transaction created      14:32
✓ Risk check passed        14:32
✓ Market order executed    14:33
⏳ Ledger posting...        
○ Completed

Progress bar: ▓▓▓▓▓░░ 71%
```

Данные из `GET /api/transactions/:id` → `{ status, riskCheck, marketExecution, ledger }` + system events.

**Для pending транзакций:** auto-refresh каждые 3s (useQuery refetchInterval).

**"Stuck" detection:** если транзакция в processing > 5 минут → показать "This is taking longer than expected" + "Contact Support" кнопка.

**DoD:**
- [ ] Transaction detail показывает step progress для всех статусов
- [ ] Pending transactions auto-refresh
- [ ] "Stuck" предупреждение после 5 минут
- [ ] WS event обновляет прогресс в реальном времени

---

## [ERR-001] 🟡 Error Screens — Account Blocked + Feature Blocked

**Источник Figma:** `20-risely-shared-mobile-screens.md § 10`

Figma Version 3 добавляет 5 error screen вариантов которых нет в коде:

| Вариант | Триггер | Copy |
|---|---|---|
| **Account Blocked** | Аккаунт заблокирован compliance | "Your account has been temporarily suspended. Contact support." |
| **Feature Blocked** (variant 1) | KYC не прошёл для этой фичи | "Complete KYC to unlock this feature" + CTA |
| **Feature Blocked** (variant 2) | KYC tier недостаточный | "Upgrade your KYC level to access this feature" |
| **Connection Lost** | WS/API недоступен | "Check your internet connection" + retry |
| **Something Went Wrong** | Непредвиденная ошибка | "We're looking into this. Try again in a moment." |

**Реализовать:**
- `apps/consumer/src/views/ErrorView.vue` — принимает `type` prop
- Декоративный pattern background (как в Figma — opacity 0.6)
- Large icon (212×212px Heroicon)
- Heading + text
- CTA button (amber, 12px radius)

**Где использовать:**
- Account Blocked: если `user.status === 'suspended'` → redirect на `/error/account-blocked`
- Feature Blocked: оборачивать Buy/Sell/Send routes
- Connection Lost: WS reconnect banner (уже в WS-002) → fullscreen overlay если offline > 30s
- Something Went Wrong: ErrorBoundary в App.vue

**DoD:**
- [ ] Все 5 вариантов отображаются корректно
- [ ] Account Blocked: suspended пользователь видит этот экран вместо dashboard
- [ ] Feature Blocked: KYC locked tab → клик → Feature Blocked screen
- [ ] Connection Lost: offline > 30s → overlay

---

## [UX-001] 🔴 "Done" Success Animation

**Источник Figma:** `25-risely-myfile-prototypes.md § 8 Swap annotation`, `28-risely-myfile-research-benchmarking.md § 3.1`

**Figma annotation:** "Icon animation: use code from Lottie from [link]". Исследование TBC Bank: "Animation + sound on Done screen".

Текущее состояние: Step 4 в Buy/Sell показывает статичный "Completed" текст.

**Добавить:**

Анимация на success state всех транзакций (Buy, Sell, Send, Swap):

```
┌──────────────────────────────┐
│                              │
│   [Animated checkmark] 🟢    │  ← Lottie или CSS animation
│                              │
│   Purchase Complete!         │
│   You received 0.00858 BTC   │
│                              │
│   [View Transaction]         │
│   [Back to Home]             │
└──────────────────────────────┘
```

**Анимация (без Lottie — чище):**
```css
@keyframes checkmark {
  0% { stroke-dashoffset: 100; opacity: 0; }
  50% { opacity: 1; }
  100% { stroke-dashoffset: 0; }
}
```
SVG checkmark с animate stroke. + scale bounce анимация circle.

**Звук (опционально):** `new Audio('/sounds/success.mp3').play()` — короткий 200ms tone. Volume 0.3.

**Конфетти:** для первой транзакции — `canvas-confetti` пакет, 1.5s burst.

**DoD:**
- [ ] Checkmark анимация при transition в step 4 (success)
- [ ] Анимация работает в Buy, Sell, Send, Swap
- [ ] Первая транзакция: конфетти 🎉

---

## [UX-002] 🟡 "Invite to Risely" Upsell в Send

**Источник Figma:** `30-risely-myfile-features-next-versions.md § 4 Branch D`

**Figma spec:** Когда отправляешь не Risely-пользователю — показать toggle:
> "Invite [name] to Risely to transfer with 0 fees"

Toggle в Send Confirmation screen:
```
─────────────────────────────────────
☐ Invite Bob to Risely for free transfers
  We'll send them an email with your referral
─────────────────────────────────────
```

Если toggle on → `POST /api/referrals/invite { fromUserId, toEmail, message }` → симуляция email.

**DoD:**
- [ ] Toggle показывается только если получатель не Risely user
- [ ] POST вызывается при confirm

---

## [UX-003] 🟡 Coming Soon Pattern

**Источник Figma:** `30-risely-myfile-features-next-versions.md § 2`

**Figma design note:** "We store here all what is not working and make it gray out with COMING SOON"

Фичи которые анонсированы но не построены — показывать в UI со специальным стилем:

```
[Recurring Buy]      → coming-soon chip
[Open New Wallet]    → opacity 0.3, disabled
[Cards]              → coming-soon chip
[MPIN / 2FA]         → coming-soon chip (после Safety Tasks MVP)
```

**CSS pattern:**
```css
.coming-soon {
  opacity: 0.4;
  pointer-events: none;
  position: relative;
}
.coming-soon::after {
  content: 'Soon';
  position: absolute;
  top: -6px; right: -6px;
  background: #FFB800;
  color: #000;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 100px;
}
```

**Где добавить:**
- Profile menu: "Cards" item → disabled with "Soon" badge
- Profile menu: "2FA" → disabled if not built
- Home: "Open New Wallet" button → disabled

**DoD:**
- [ ] Coming Soon items видны но недоступны
- [ ] "Soon" badge на каждом
- [ ] Клик ни на что не реагирует

---

# БЛОК B — CONSUMER: UX из КОНКУРЕНТНОГО АНАЛИЗА

---

## [BENCH-001] 🔴 Tap Feedback на всех интерактивных элементах

**Источник Figма:** `28-risely-myfile-research-benchmarking.md § 3.1`

**Исследование Credo и Wise:** "Feedback when clicking buttons and icons — haptic + visual. No silent taps."

**Без haptic API (браузер):** visual feedback достаточно.

**Добавить по всему Consumer и Partner:**
```css
/* Базовый tap feedback */
.tap-feedback {
  transition: transform 80ms ease, opacity 80ms ease;
}
.tap-feedback:active {
  transform: scale(0.97);
  opacity: 0.85;
}
```

Применить к: Button, всем `<button>`, всем кликабельным card, Tab item, Tx строкам.

**Для Mobile (если PWA):**
```ts
if ('vibrate' in navigator) {
  element.addEventListener('click', () => navigator.vibrate(10))
}
```

**DoD:**
- [ ] Каждый button имеет `active:scale-97` transition
- [ ] Tab items имеют subtle feedback
- [ ] Transaction rows имеют tap state

---

## [BENCH-002] 🟡 Transaction History — Grouping по месяцам

**Источник Figма:** `28-risely-myfile-research-benchmarking.md § 3.1`

**Из анализа конкурентов:** "Transactions by month grouping; show +/- direction; show balance after transaction"

Текущий список транзакций: просто хронологический список без группировки.

**Изменить на:**
```
June 2026
  ┌──────────────────────────────────┐
  │ Buy BTC  +0.00858 BTC  14 Jun   │
  │ Sell ETH  +€1,540  12 Jun       │
  │ Buy ETH  -€1,200  10 Jun        │
  └──────────────────────────────────┘
May 2026
  ┌──────────────────────────────────┐
  ...
  └──────────────────────────────────┘
```

- Заголовок месяца: `text-xs text-slate-400 uppercase tracking-wide`
- Direction: зелёный + для входящего, красный - для исходящего
- Сумма в EUR: показывать рядом с суммой в crypto

**DoD:**
- [ ] Транзакции сгруппированы по месяцам
- [ ] Каждая строка: иконка направления + asset + fiat эквивалент + дата
- [ ] Пустой месяц: не показывается

---

## [BENCH-003] 🟡 Dual-Label Inputs во всех формах

**Источник Figма:** `28-risely-myfile-research-benchmarking.md § 3.1`

**Tinkoff benchmark:** "Inputs with label inside AND outside — dual label pattern"

Сейчас: либо placeholder, либо label выше — не вместе.

**Стандарт для всех форм:**
```html
<div class="relative">
  <label class="absolute top-2 left-3 text-xs text-slate-400">Amount (EUR)</label>
  <input 
    class="pt-6 pb-2 px-3 w-full" 
    placeholder="0.00"
    type="number"
  />
</div>
```

Применить ко всем полям в: Buy form, Sell form, Send form, KYC form, Login, Signup.

**DoD:**
- [ ] Все input fields имеют persistent label сверху + placeholder внутри
- [ ] Label не исчезает при заполнении (не floating label — просто constant label выше)

---

## [BENCH-004] 🟡 Onboarding Task List (Wise pattern)

**Источник Figма:** `28-risely-myfile-research-benchmarking.md § 3.1`

**Wise benchmark:** "Tasks-based onboarding — task list post-KYC to guide first-time users step by step"

После первого KYC approval — показывать checklist задач на Home:

```
┌─────────────────────────────────┐
│ Get started with Prodigy  2/5  │
│ ▓▓▓▓▓▓░░░░ 40%                │
│                                 │
│ ✓ Create account                │
│ ✓ Complete KYC                  │
│ › Make your first deposit  →    │
│ › Buy your first crypto    →    │
│ › Set up safety features   →    │
└─────────────────────────────────┘
```

Исчезает когда все 5 задач выполнены (или через 30 дней).

**Прогресс хранить в:** localStorage или `GET /api/users/:id` extended с onboarding completion fields.

**DoD:**
- [ ] Checklist появляется на Home для новых пользователей
- [ ] Каждая задача ведёт на соответствующий экран
- [ ] Прогресс сохраняется между сессиями
- [ ] Скрывается после завершения всех задач

---

# БЛОК C — ADMIN: ПРОПУЩЕННЫЕ ФИЧИ

---

## [ADM-SUPP-001] 🟡 Client Support View

**Источник Figма:** `21-risely-shared-admin.md § 4g`

**Figma annotation:** "We should have 1 table with good filters & search"

Отдельная страница `/admin/support` для support агентов:

**Что видит support:**
- Таблица клиентов с поиском по email/name/ID
- Для каждого клиента: краткое KYC summary, последние транзакции, банковские реквизиты
- Кнопка "Request documents from client" → `POST /api/kyc/applicants/:id/request-docs`
- Кнопка "Send message to client" → создаёт уведомление в inbox пользователя

**Ограничения (из Figma):** "Which data is NOT available for support? Only address and DOB? How about system ID?"

**Решение:** Support видит всё КРОМЕ:
- Полный адрес (только страна)
- Дата рождения (только возраст)

Реализовать через `?supportView=true` query → backend маскирует поля.

**DoD:**
- [ ] `/admin/support` страница с таблицей клиентов
- [ ] DOB и адрес маскированы
- [ ] "Request documents" создаёт уведомление пользователю
- [ ] Быстрый переход на `/admin/customers/:id` из support view

---

## [ADM-ROLES-001] 🟡 Admin Roles / RBAC

**Источник Figма:** `21-risely-shared-admin.md § 4f`

**Figma design notes:** 
- "Need to see who is on which role"
- "Need to have 'Suspend role' & 'suspend users in this role'"
- "Sensitive info — on/off only" (для чувствительных данных)
- "Should be filtered by role"

**Три роли (минимум):**
| Роль | Доступ |
|---|---|
| **admin** | Всё |
| **compliance** | KYC Queue, Risk Queue, Customers (только просмотр), Transactions (только просмотр) |
| **support** | Support view (ограниченный), Customers (только просмотр) |

**Backend:**
```
GET  /api/admin/roles
POST /api/admin/roles
GET  /api/admin/users?role=
PATCH /api/admin/users/:id { role, status }  ← suspend/activate
```

**Prisma:**
```prisma
model AdminUser {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  role      String   // 'admin' | 'compliance' | 'support'
  status    String   // 'active' | 'suspended'
  createdAt DateTime @default(now())
}
```

**UI — `/admin/settings/roles`:**
- Таблица admin пользователей: email, роль, статус, последний вход
- Изменить роль → dropdown
- Suspend пользователя → confirmation modal
- "Sensitive info toggle" — скрывать/показывать sensitive данные для текущей сессии

**DoD:**
- [ ] 3 роли определены и назначаются
- [ ] Compliance не видит Settings/Fees страницы
- [ ] Support не видит Ledger/Liquidity/B2B страницы
- [ ] Suspend admin user работает

---

## [ADM-LIQ-001] 🟡 Liquidity — Expandable Multi-Level View

**Источник Figма:** `21-risely-shared-admin.md § 4b`

Текущая Liquidity страница показывает provider cards. Figma требует expandable двухуровневую таблицу.

**Структура (из Figma):**

**Секция 1 — Crypto Wallets:**
```
▼ Ethereum           2 tokens   $45,230   #42 pending TXs   Wallet: 0x...
  ├── USDC   Amount: 25,000   Value: $25,000   Pending: $12,300
  └── USDT   Amount: 20,000   Value: $20,230   Pending: $8,100

▼ Bitcoin           1 token   $18,500   #5 pending TXs
  └── BTC    Amount: 0.35    Value: $18,500   Pending: $2,000
```

**Секция 2 — FIAT Wallets (BaaS):**
```
▼ Narvi (Lithuania)    2 currencies   $52,000   Acc: LT...
  ├── EUR   Available: 45,000   Value: $45,000   Pending: 304,000 EUR
  └── USD   Available: 7,000    Value: $7,000    Pending: $12,000
```

**Секция 3 — Liquidity Providers:**
```
▼ B2C2              3 currencies   $120,000
  ├── EUR   Amount: 50,000   Value: $50,000
  ├── BTC   Amount: 0.5     Value: $25,000
  └── USDT  Amount: 45,000  Value: $45,000
```

**Filters:** сетка фильтров: по network, по token/currency, по provider.

**Backend:** `GET /api/liquidity/detailed` → расширить существующий endpoint.

**DoD:**
- [ ] Expand/collapse каждого провайдера
- [ ] Все 3 секции (Crypto, FIAT, Providers)
- [ ] Totals показываются на уровне провайдера
- [ ] Filter by network и currency работает

---

## [ADM-AUDIT-001] 🟡 Admin Action Audit Log

**Источник Figма:** `21-risely-shared-admin.md § 4f annotation: "Need to see who is on which role"`

Compliance requirement: кто из admin что делал и когда.

**Backend:**

Новая таблица `AdminActionLog`:
```prisma
model AdminActionLog {
  id          String   @id @default(cuid())
  adminId     String
  adminEmail  String
  action      String   // 'kyc_approve', 'kyc_reject', 'fee_update', 'user_suspend', etc.
  entityType  String   // 'kyc_applicant', 'user', 'fee_config', etc.
  entityId    String
  before      Json?    // предыдущее значение
  after       Json?    // новое значение
  createdAt   DateTime @default(now())
}
```

**Логировать автоматически:**
- KYC approve/reject
- Risk review decision
- Fee/limit changes
- User suspension
- B2B client changes

**UI — `/admin/audit-log`:**
- Таблица: дата, admin email, действие, entity, детали
- Filter по admin, по action type, по date range
- Detail view: before/after JSON diff

**DoD:**
- [ ] Все admin действия из списка выше логируются
- [ ] `/admin/audit-log` показывает лог
- [ ] Filter работает
- [ ] Before/after показываются для fee/limit изменений

---

# БЛОК D — CONSUMER: NOTIFICATION SYSTEM (из исследования)

---

## [NTF-001] 🔴 Обязательные Notification Types — 5 типов

**Источник Figма:** `24-risely-myfile-research.md § 5`

**Figma определяет 5 MANDATORY notification types:**

```
1. KYC:
   1a. KYC accepted → "Your identity has been verified ✓"
   1b. KYC rejected → "Action required: KYC verification failed"

2. Account opened:
   2a. First account → "Your EUR account is ready"
   2b. Next account → "New [currency] account opened"

3. Transfer IN:
   3a. Sharing initiated → "Someone is sending you [amount]"
   3b. Money received → "€500 received from external transfer"
   3c. Transfer stuck → "Your incoming transfer is taking longer than expected"

4. Transfer OUT:
   4a. Sent successfully → "€500 sent successfully"
   4b. On other side: accepted → "Your transfer was received by [name]"
   4c. On other side: rejected → "Transfer to [name] was rejected"
   4d. Transfer stuck → "Your transfer hasn't arrived yet"

5. Transfer BETWEEN:
   5a. Exchanged → "0.01 BTC converted to €580"
```

**Backend:** все эти events уже генерируются через `eventBus.emit()`. Нужно конвертировать их в Notification записи.

**В `backend/src/routes/notifications.ts`** добавить subscriber:
```ts
eventBus.on('KYC_APPROVED', (event) => {
  createNotification({
    userId: event.payload.userId,
    type: 'kyc_accepted',
    title: 'Identity verified ✓',
    body: 'Your KYC has been approved. You can now make transfers.',
    channel: 'in_app',
  })
})
// ... аналогично для всех 5 типов
```

**Consumer UI — InboxView:**
- Разбить по categories: KYC, Transfers, Account
- Unread count badge на bell иконке
- Mark as read при открытии

**DoD:**
- [ ] Все 5 типов notifications генерируются в backend
- [ ] Появляются в Consumer InboxView
- [ ] Bell icon показывает unread count
- [ ] WS event приходит в реальном времени

---

## [NTF-002] 🟡 In-App Notification Subtypes

**Источник Figما:** `24-risely-myfile-research.md § 5 (Notification Tech Types Taxonomy)`

**Figma taxonomy:**
```
In-App:
  Popup:
    - Blocking (не закрыть без действия)
    - Closable (X кнопка)
    - Auto-closable (исчезает через N секунд + check icon animation)
  Toaster:
    - in ui (внутри страницы)
    - covering (поверх контента)
  Tooltip:
    - shown by default
    - shown by click
  Hint near UI element:
    - near button
    - near input
    - near dropdown
```

**Что построить:**

**1. Blocking Popup** (для критических событий):
```vue
<!-- KYC rejected — нельзя закрыть без действия -->
<Modal :closable="false">
  <h2>KYC Verification Failed</h2>
  <p>Reason: Document not readable</p>
  <Button @click="goToKYC">Retry KYC</Button>
  <Button variant="ghost" @click="contactSupport">Contact Support</Button>
</Modal>
```

**2. Auto-closable Toast** (для успешных events):
```vue
<!-- Появляется, checkmark animation, исчезает через 3s -->
<Toast type="success" :duration="3000" :animated="true">
  0.00858 BTC received ✓
</Toast>
```

**3. Hint near элемент** (для подсказок):
```vue
<div class="relative">
  <Input name="referral" />
  <Hint side="bottom">
    Enter a referral code from a friend to receive €10 bonus
  </Hint>
</div>
```

**Где использовать каждый тип:**
| Событие | Тип |
|---|---|
| KYC rejected | Blocking Popup |
| Account suspended | Blocking Popup |
| Transaction completed | Auto-closable Toast |
| Deposit received | Auto-closable Toast |
| Referral code field | Hint (default shown) |
| IBAN copy button | Tooltip (on hover) |
| 2FA recommended | Closable Popup |

**DoD:**
- [ ] Blocking popup компонент (нельзя закрыть без действия)
- [ ] Auto-closable toast с checkmark animation
- [ ] Hint near element компонент
- [ ] Все события из таблицы выше используют правильный тип

---

# БЛОК E — WALLET VIEW

---

## [WALL-001] 🟡 Dedicated Wallets Tab / Page

**Источник Figма:** `20-risely-shared-mobile-screens.md § 4`, `25-risely-myfile-prototypes.md § 7`

**Figма имеет отдельный Wallets tab** с drill-down в каждый кошелёк:

```
Wallets tab:
  ┌────────────────────────────┐
  │ EUR Account                │
  │ €4,500.00     [IN][OUT]    │
  ├────────────────────────────┤
  │ Bitcoin (BTC)              │
  │ 0.05 BTC ≈ €2,917         [SEND][RECEIVE]│
  ├────────────────────────────┤
  │ Ethereum (ETH)             │
  │ 1.2 ETH ≈ €3,722          [SEND][RECEIVE]│
  └────────────────────────────┘
  
  [+ Open New Wallet]  ← coming soon, disabled
```

**Tap на wallet → Wallet Detail:**
```
Header: "Bitcoin Wallet"
Balance: 0.05 BTC / €2,917

Action buttons: [Send] [Receive] [Swap]

Recent transactions (этого кошелька):
  ─────────────────────────────
  Buy BTC  +0.00858  14 Jun   €500
  Sell BTC  -0.01   12 Jun   €582
  ─────────────────────────────
  [View all →]
```

**Текущее состояние:** Holdings видны на Home, но нет dedicated page с per-wallet action buttons и per-wallet transaction history.

**Consumer UI:**

Добавить в router: `/wallets` и `/wallets/:currency`

**`/wallets`:** список всех кошельков (fiat + crypto) с балансами
**`/wallets/:currency`:** per-wallet detail с action buttons и filtered transactions

**Filter transactions по wallet:** `GET /api/transactions?userId=&currency=BTC`

**"Share wallet address" button:** Web Share API с адресом + QR (для crypto).
**"Copy IBAN" button:** для fiat wallet.

**DoD:**
- [ ] `/wallets` список всех кошельков
- [ ] Tap → `/wallets/BTC` → detail с action buttons
- [ ] Per-wallet transaction history (filtered)
- [ ] Fiat wallet: Copy IBAN + Share
- [ ] Crypto wallet: QR + Copy address + Share

---

## [WALL-002] 🟡 "Balance Zero" Empty State — разные случаи

**Источник Figма:** `28-risely-myfile-research-benchmarking.md § 5.2`

**Figma различает два разных zero-balance состояния с разным copy:**

| Причина нуля | Copy |
|---|---|
| KYC approved, никогда не пополнял | "Your wallets are ready. Make your first deposit to start." |
| Потратил всё что было | "Your balance is 0. Transfer in to start trading again." |

Текущий код: один вариант empty state для всех случаев.

**Определить состояние:**
```ts
const isFirstTimeEmpty = computed(() => 
  user.kycStatus === 'approved' && 
  transactions.value.length === 0
)
const isSpentEmpty = computed(() =>
  user.kycStatus === 'approved' && 
  transactions.value.length > 0 && 
  totalBalance.value === 0
)
```

**DoD:**
- [ ] Два разных empty state с разным copy и CTA
- [ ] First-time: CTA "Make your first deposit"
- [ ] Spent: CTA "Transfer in"

---

# ИТОГОВАЯ ТАБЛИЦА ПРИОРИТЕТОВ

| ID | Фича | Приоритет | Источник |
|---|---|---|---|
| ONBRD-001 | KYC Waiting — productive state | 🔴 Critical | Research doc 24 |
| ONBRD-002 | Post-KYC first-time onboarding | 🔴 Critical | Research doc 28 |
| NTF-001 | 5 mandatory notification types | 🔴 Critical | Research doc 24 |
| UX-001 | Done success animation | 🔴 Critical | Benchmarking |
| ERR-001 | Error screens (5 variants) | 🔴 Critical | Figma V3 doc 20 |
| ADDR-001 | Address Book / Beneficiaries | 🔴 Critical | doc 30, 25 |
| SWAP-001 | Crypto-to-Crypto Swap | 🟡 High | doc 25 |
| RCPT-001 | Receive Fiat — REF + Share | 🟡 High | doc 25, benchmarking |
| TRACK-001 | Transaction step tracking | 🟡 High | doc 30 |
| WALL-001 | Dedicated Wallets tab/page | 🟡 High | doc 20, 25 |
| SAFE-001 | Safety Tasks | 🟡 High | doc 30 |
| BENCH-001 | Tap feedback everywhere | 🟡 High | Benchmarking |
| BENCH-002 | TX history grouped by month | 🟡 High | Benchmarking |
| NTF-002 | In-app notification subtypes | 🟡 High | Research doc 24 |
| ADM-SUPP-001 | Admin Client Support view | 🟡 High | doc 21 |
| ADM-LIQ-001 | Liquidity expandable view | 🟡 High | doc 21 |
| ADM-AUDIT-001 | Admin action audit log | 🟡 High | doc 21 |
| ADM-ROLES-001 | Admin RBAC | 🟡 Medium | doc 21 |
| ADDR-002 | Repeat Transaction shortcut | 🟡 Medium | doc 30 |
| UX-002 | Invite to Risely upsell | 🟡 Medium | doc 30 |
| UX-003 | Coming Soon pattern | 🟡 Medium | doc 30 |
| BENCH-003 | Dual-label inputs | 🟡 Medium | Benchmarking |
| BENCH-004 | Post-KYC task checklist | 🟡 Medium | Benchmarking |
| WALL-002 | Zero balance empty states | 🟢 Low | doc 28 |

---

## Топ-3 начать немедленно

**1. ONBRD-001 + ONBRD-002** — KYC waiting и post-KYC onboarding. Это самая большая дыра в пользовательском пути. Сейчас новый пользователь застревает в KYC без объяснений.

**2. NTF-001** — 5 mandatory notification types. Backend уже генерирует все события, нужно только подписаться и создавать Notification записи.

**3. SWAP-001** — Crypto swap. Backend уже работает (quotes), нужен только UI flow. Добавляет ключевой продуктовый функционал.
