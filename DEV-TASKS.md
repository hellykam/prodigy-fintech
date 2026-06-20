# Prodigy — Полный список задач для разработчика
_Версия: 2026-06-18. Все приложения. Все задачи._

---

## Легенда

| Метка | Значение |
|---|---|
| 🔴 | Критично — блокирует демо или ломает существующее |
| 🟡 | Важно — инвестор это заметит |
| 🟢 | Полировка — делать после 🔴 и 🟡 |
| ✅ | Готово |
| ⚡ | Быстро (< 1h) |

**Приложения:**
- `5001` — Consumer (пользователь)
- `5002` — Admin (внутренний)
- `5003` — Sumsub Simulator (KYC)
- `5004` — System Map (визуализация)
- `5005` — Widget (B2B embed)
- `5006` — Partner Portal
- `5010` — Landing
- `5555` — DB Viewer (новое)
- `3000` — Backend API

---

# ЧАСТЬ 1 — ЭКСТРЕННЫЕ ФИКСЫ
_Делать первыми. Без них ничего нельзя тестировать._

---

## [FIX-001] 🔴 ⚡ Удалить все `.vue.js` артефакты
**Все приложения** | **30 мин**

Vite компилирует `.vue` файлы и кэширует результат как `.vue.js`. Эти файлы попали в git. Каждый содержит `debugger;` — браузер паузит выполнение до рендера компонента. Именно поэтому страницы "зависают" или не открываются.

```bash
find apps -name "*.vue.js" -delete
echo 'apps/**/*.vue.js' >> .gitignore
```

**Подтверждено 20+ файлов:**
- `apps/admin/src/` — 13 файлов (App, AppLayout, 11 view)
- `apps/consumer/src/views/` — SellView, BuyView, HomeView, KycView, LoginView, ProfileView, Transactions*
- `apps/partner/src/views/` — ApiKeysView, CommissionsView, DashboardView, HomeView, TransactionsView

**DoD:** `find apps -name "*.vue.js"` — пустой вывод. `.gitignore` обновлён.

---

## [FIX-002] 🔴 ⚡ Partner: добавить Vite proxy на backend
**`apps/partner/vite.config.ts`** | **15 мин**

`apiFetch` в партнёре шлёт запросы на `/api/...` которые уходят на `localhost:5006` (Vite dev server) → 404. У admin есть proxy, у partner — нет.

Добавить в `apps/partner/vite.config.ts`:
```ts
server: {
  port: 5006,
  proxy: {
    '/api': 'http://localhost:3000',
    '/ws': { target: 'ws://localhost:3000', ws: true },
  },
},
```

**DoD:** Login `acme@partner.com / partner1234` работает. Network tab показывает `/api/auth/login` → 200.

---

## [FIX-003] 🔴 ⚡ Partner CommissionsView: удалить mock данные
**`apps/partner/src/views/CommissionsView.vue`** | **30 мин**

Файл содержит захардкоженный `mockCommissions` массив. Удалить его. `useQuery` должен использовать реальный endpoint `GET /api/partner-commissions?b2bClientId=`.

Проверить: `authStore.user.attributedToB2BClientId` заполняется после логина. Если нет — исправить ответ `POST /api/auth/login` в backend.

**DoD:** Commissions показывает реальные данные. `mockCommissions` удалён.

---

## [FIX-004] 🔴 Admin Dashboard: исправить seed данные (все транзакции = failed)
**`backend/src/seed/index.ts`** | **1–2h**

Сейчас все транзакции в seed имеют `status: 'failed'`. Dashboard показывает только красные строки.

Исправить в `seed/index.ts`:
- tx1: `EUR→BTC`, status=`completed`, alice@demo.com
- tx2: `ETH→EUR`, status=`completed`, alice@demo.com  
- tx3: `EUR→ETH`, status=`completed`, dave@demo.com
- tx4: `EUR→BTC`, status=`pending`, bob@demo.com (в процессе)
- tx5: `BTC→EUR`, status=`failed`, dave@demo.com (failed with reason: "Risk check failed")

После изменения: `pnpm --filter backend prisma db seed`

**DoD:** Admin Dashboard показывает статус mix: completed + pending + failed строки. Stat cards показывают ненулевые числа.

---

## [FIX-005] 🔴 Admin SettingsKycConfigView: добавить backend роуты
**`backend/src/routes/kyc.ts`** | **2h**

`SettingsKycConfigView.vue` вызывает `/api/kyc/levels` и `/api/kyc/country-risk` — этих роутов нет → страница крашится.

Добавить в `kyc.ts` (in-memory, static):
```
GET /api/kyc/levels              → 3 level объекта
GET /api/kyc/country-risk        → 13 стран с riskLevel
GET /api/kyc/country-risk?riskLevel=low|medium|high|blocked → filtered
PATCH /api/kyc/country-risk/:code → { riskLevel, requiredLevel } → обновляет in-memory
```

Данные (3 уровня + 13 стран) — см. `TASKS.md § FIX-004`.

**DoD:** `/settings/kyc-config` в admin открывается, показывает таблицы.

---

# ЧАСТЬ 2 — BACKEND
_Все endpoint задачи. Большинство frontend задач зависят от этого._

---

## [BE-001] 🔴 Проверить и починить все существующие роуты

Роуты есть (`fees.ts`, `rewards.ts`, `liquidity.ts`, `auth.ts`, `bank.ts`), но некоторые могут возвращать неправильную форму данных. Пройтись по каждому:

```bash
# Проверочные curl команды:
curl localhost:3000/api/rewards | jq .
curl localhost:3000/api/liquidity | jq .
curl localhost:3000/api/settings/fees | jq .
curl localhost:3000/api/settings/limits | jq .
curl localhost:3000/api/partner-commissions | jq .
curl localhost:3000/api/transactions | jq '.items[0]'
curl localhost:3000/api/kyc/applicants | jq '.items[0]'
curl localhost:3000/api/users | jq '.items[0]'
```

Для каждого: сравнить возвращаемую форму с тем что ожидает frontend view. Если не совпадает — исправить backend response или frontend interface.

**DoD:** Все 12+ endpoints возвращают данные в форме которую ожидает frontend.

---

## [BE-002] 🔴 `POST /api/auth/register` — регистрация пользователя
**`backend/src/routes/auth.ts`**

Проверить что роут существует и работает. Если нет — добавить:
- Body: `{ email, password }`
- Создаёт `User` с `status: 'active'`, `kycStatus: 'not_started'`
- Создаёт 3 кошелька: EUR (balance: 1000), BTC (balance: 0), ETH (balance: 0)
- Возвращает: `{ token, user: { id, email, status, kycStatus } }`
- Ошибка если email занят: `{ error: 'email_taken' }`

**DoD:** `POST /api/auth/register { email: "test@test.com", password: "123456" }` → 201 с token.

---

## [BE-003] 🟡 `GET /api/transactions` — добавить фильтр по `b2bClientId`
**`backend/src/routes/transactions.ts`**

Partner Portal нужно видеть только транзакции своих клиентов. Добавить query param:
- `?b2bClientId=b2b_acme_001` → фильтровать по полю на транзакции или через user.attributedToB2BClientId

**DoD:** `GET /api/transactions?b2bClientId=b2b_acme_001` возвращает только Acme транзакции.

---

## [BE-004] 🟡 `GET /api/users` — добавить фильтр по `b2bClientId`
**`backend/src/routes/users.ts`**

Аналогично транзакциям. Partner `/end-users` нужно показывать только своих пользователей.

**DoD:** `GET /api/users?b2bClientId=b2b_acme_001` → пользователи Acme только.

---

## [BE-005] 🟡 Seed: добавить больше данных
**`backend/src/seed/index.ts`**

Текущий seed: 3 users (alice, bob, dave), 2 B2B clients, 5 transactions.
Для убедительного демо нужно больше:

- **Users:** добавить 5–8 пользователей с разными KYC статусами: 2 = pending, 1 = rejected, 2 = manual_review, 3 = approved
- **Transactions:** 15–20 транзакций с разными статусами и парами валют
- **Partner commissions:** хотя бы 10 commission записей для Acme, 5 для Beta
- **KYC applicants:** по одному на каждого user, с разными статусами
- **System events:** 20+ событий разных типов

**DoD:** Admin Dashboard показывает ненулевые числа во всех stat cards. Таблицы не пустые.

---

## [BE-006] 🟡 `GET /api/customers/:id/activity` — активность пользователя
**Добавить в `backend/src/routes/users.ts`**

Нужно для Admin Customer Activity страницы.
- Возвращает: system events + kyc events отфильтрованные по `userId`
- Форма: `{ items: [{ id, eventName, payload, createdAt, note }] }`

`POST /api/customers/:id/notes`
- Body: `{ note: string }`
- Сохраняет заметку к пользователю (in-memory OK для демо)
- Возвращает добавленную заметку

**DoD:** `GET /api/customers/user_alice/activity` → список событий alice.

---

## [BE-007] 🟢 WebSocket: user-scoped события
**`backend/src/index.ts` или WS handler**

Все WS события сейчас broadcast всем клиентам. Добавить `userId` в payload каждого события где это применимо. Frontend будет фильтровать по `userId`.

```ts
// В каждом emit: добавлять userId если применимо
eventBus.emit('TRANSACTION_COMPLETED', {
  ...existingPayload,
  userId: transaction.userId,  // ← добавить
})
```

**DoD:** Consumer app получает только свои WS события. Admin получает все (userId=null для admin событий).

---

# ЧАСТЬ 3 — CONSUMER APP (localhost:5001)
_Приложение для конечного пользователя._

---

## [CON-001] 🔴 Добавить auth token в `apiFetch`
**`apps/consumer/src/composables/useApi.ts`**

`apiFetch` не шлёт `Authorization` заголовок. Все защищённые роуты возвращают 401 молча.

1. Прочитать `apps/consumer/src/stores/auth.ts` — найти как хранится token
2. Добавить в `apiFetch`:
```ts
const auth = useAuthStore()
if (auth.token) headers['Authorization'] = `Bearer ${auth.token}`
```
3. При 401 → `auth.logout()` + redirect `/login`

**DoD:** `GET /api/users/:id` работает для залогиненного пользователя. Holdings на `/sell` показывают реальный баланс.

---

## [CON-002] 🔴 `/sell` — полная проверка и фикс flow
**`apps/consumer/src/views/SellView.vue`**

После [FIX-001] и [CON-001]: протестировать весь flow:
1. Login alice@demo.com → `/sell` → показывает BTC 0.3 + ETH 1.2
2. Выбрать BTC → ввести 0.01 → появляется quote
3. "Sell BTC" → step 2 (confirm)
4. "Confirm Sale" → step 3 (processing) → step 4 (result)

Исправить любые ошибки по ходу. Проверить:
- Работает ли `acceptQuote` → `createTransaction` sequence?
- Правильно ли показывается результат на step 4?
- Ссылка "View Transaction" ведёт на правильную транзакцию?

**DoD:** Полный sell flow работает от начала до конца без ошибок.

---

## [CON-003] 🔴 `/send` — завершить step 4 (Coming Soon)
**`apps/consumer/src/views/SendView.vue` line ~325**

Step 4 показывает "Coming Soon" placeholder. Заменить на:
- `POST /api/transactions` с данными из quote
- Показать: transaction ID, статус, ссылка "View transaction"
- Error state: сообщение + кнопка retry

**DoD:** Send flow шаг 4 показывает подтверждение, не "Coming Soon".

---

## [CON-004] 🟡 `/signup` — проверить что работает
**`apps/consumer/src/views/SignupView.vue`** (файл уже существует)

Файл есть, но нужно проверить:
1. Форма сабмитит `POST /api/auth/register`?
2. После успеха: авто-логин + redirect `/kyc`?
3. Ошибки валидации показываются (email занят, пароль мало символов)?
4. На LoginView есть ссылка "Don't have an account? Sign up"?

**DoD:** Регистрация нового аккаунта работает полностью.

---

## [CON-005] 🟡 `/rewards` — проверить что работает
**`apps/consumer/src/views/RewardsView.vue`** (файл уже существует)

Файл есть. Проверить:
1. Загружает данные из `GET /api/rewards?userId=:id`?
2. Показывает referral code, количество приглашённых, историю?
3. Кнопка [Share invite] копирует ссылку в clipboard?
4. Есть в bottom nav и router?

Если что-то не работает — починить.

**DoD:** `/rewards` показывает реальные данные alice. Copy button работает.

---

## [CON-006] 🟡 `/receive` — заменить QR placeholder
**`apps/consumer/src/views/ReceiveView.vue`**

Файл имеет `<!-- QR code placeholder -->` комментарий — нет реального QR кода.

Добавить QR код через `qrcode` npm библиотеку (или `qrcode.vue`):
- Генерировать из IBAN/wallet address пользователя
- Показывать под IBAN
- Кнопка "Save QR" → `canvas.toDataURL()` → download link

**DoD:** `/receive` показывает сканируемый QR код содержащий IBAN.

---

## [CON-007] 🟡 Home: bank card после KYC
**`apps/consumer/src/views/HomeView.vue`**

После KYC approval, bank card должен показывать:
- Имя банка: "Prodigy Bank Simulator"
- IBAN форматированный группами по 4: `DE29 PROD 0001 2345 6789`
- BIC код: `PRODDE77XXX`
- Лимит: `Daily limit: €1,000`
- Кнопка [Copy IBAN] → clipboard

Данные из `GET /api/users/:id` → `bankAccounts[0]`

**DoD:** Approved пользователь видит bank card с IBAN, BIC, limit, copy button.

---

## [CON-008] 🟡 Consumer: desktop layout
**`apps/consumer/src/components/AppLayout.vue`**

Consumer app сейчас: `max-w-sm mx-auto` контейнер — на desktop выглядит как узкая мобильная полоска.

На ≥1024px:
- Левая панель (320px): боковая навигация вертикально (не bottom nav)
- Правая область (fill): контент страницы
- Bottom nav скрывать на desktop

Боковая nav на desktop:
- Prodigy logo + название вверху
- Ссылки вертикально: Home, Buy, Sell, Send, Receive, Transactions, Rewards
- Аватар + email внизу → logout

**DoD:** На 1280px: sidebar слева, контент справа. На 375px: bottom nav как сейчас.

---

## [CON-009] 🟡 Buy flow: desktop layout
**`apps/consumer/src/views/BuyView.vue`**

Аналогично Sell flow (SF-002): на ≥1024px двухколоночный layout.
- Step 1: слева валютный выбор + amount, справа live quote card
- Step 2: слева edit/back, справа confirmation card
- Step 3–4: centred, max-w-lg

**DoD:** Buy flow на desktop выглядит как реальное приложение, не как мобильный экран.

---

## [CON-010] 🟡 Sell flow: desktop layout + polish
**`apps/consumer/src/views/SellView.vue`**

Spec: `TASKS.md § SF-002`

- Desktop двухколоночный layout (step 1 + 2)
- Fix step indicator: completed = зелёный (сейчас красный)
- Crypto иконки в asset picker (₿, Ξ вместо первой буквы)
- CSS confetti на step 4 success
- Заменить `bg-red-*` на DS токены

**DoD:** Sell на desktop в 2 колонки. Completed шаги зелёные.

---

## [CON-011] 🟡 Sell flow: onboarding + empty states
Spec: `TASKS.md § SF-003`

- KYC gate для непроверенных пользователей
- Illustrated empty state ("Nothing to sell yet") если нет крипто
- Onboarding tooltip (localStorage, dismissible)
- Предупреждение если продаёшь >80% баланса
- Overlay когда quote истёк на step 2

---

## [CON-012] 🟡 `/inbox` — симулированный email inbox
Spec: `TASKS.md § T-027`

- InboxView.vue: список писем слева, HTML template справа
- 6 email templates: Welcome, KYC Approved, KYC Rejected, Manual Review, Transaction Receipt, Transaction Failed
- Данные из `GET /api/notifications?channel=email&userId=`
- Envelope иконка в bottom nav с unread badge

---

## [CON-013] 🟡 Notification Center: bell + panel
Spec: `TASKS.md § T-026`

- Bell в header с unread badge (cap "9+")
- Slide-in panel: группировка по дате
- Реальные данные из `GET /api/notifications?userId=`
- WS real-time updates

---

## [CON-014] 🟢 Notification Preferences в Profile
Spec: `TASKS.md § T-029`

- Toggle список в `/profile`
- KYC row locked (regulatory)

---

## [CON-015] 🟢 Sell/Buy/Send flow: тесты
Spec: `TASKS.md § SF-004`

- Vitest unit: useApi.ts (quote, accept, transaction)
- Vitest unit: SellView step transitions (10 кейсов)
- Playwright e2e: happy path sell flow

---

# ЧАСТЬ 4 — ADMIN APP (localhost:5002)
_Внутренний инструмент: управление, мониторинг, compliance._

---

## [ADM-001] 🔴 Dashboard: починить stat cards
**`apps/admin/src/views/DashboardView.vue`**

После [FIX-004] seed fix: проверить каждую stat card.

Также: проверить что `GET /api/risk-reviews` существует. Если нет — alias на `/api/risk-queue` или добавить роут.

Stat cards должны показывать:
- Total Transactions: реальное число (не 0)
- Pending KYC: count of `status='pending'` applicants
- Risk Reviews: count of open risk reviews
- Total Volume: сумма completed транзакций в EUR

**DoD:** Все 4 stat cards показывают ненулевые числа. Recent transactions table не пустая.

---

## [ADM-002] 🔴 `/rewards` — проверить и починить
**`apps/admin/src/views/RewardsView.vue`**

Backend `GET /api/rewards` существует и возвращает данные. Проверить:
1. Таблица показывает данные (userId, referralCode, verifiedReferrals, rewardBalance)?
2. Нет ли shape mismatch (frontend ожидает что-то чего нет в response)?
3. FilterBar поиск работает?
4. CSV export работает?

Исправить что не работает.

**DoD:** `/rewards` показывает таблицу с данными alice и dave.

---

## [ADM-003] 🔴 `/liquidity` — проверить и починить
**`apps/admin/src/views/LiquidityView.vue`**

Backend `GET /api/liquidity` существует. Проверить:
1. Provider cards рендерятся (Bank Simulator + Market Simulator)?
2. Simulation buttons делают `POST /api/liquidity/simulate`?
3. После simulate: карточки обновляются (WS или refetch)?
4. StatusPill показывает правильный статус?

**DoD:** Provider cards видны. Кнопка "Simulate Low Balance" меняет состояние карточки.

---

## [ADM-004] 🔴 `/settings/fees` — проверить и починить
**`apps/admin/src/views/SettingsFeesView.vue`**

Backend `GET /api/settings/fees?type=` существует.

Проверить:
1. FilterTabs компонент есть в `packages/ui`? Если нет — заменить простыми `<button>` tab переключателями
2. При переключении таба запрос меняется (`?type=fiat-send` etc)?
3. Таблица с fee rows показывается?
4. Row click → SidePanel edit работает?
5. `PATCH /api/settings/fees/:id` сохраняет изменения?

**DoD:** Страница открывается, 3 таба работают, fee rows показываются, edit сохраняется.

---

## [ADM-005] 🔴 `/settings/limits` — проверить и починить
**`apps/admin/src/views/SettingsLimitsView.vue`**

Backend `GET /api/settings/limits` существует.

Проверить что таблица показывает limit rows. Edit работает через SidePanel + PATCH.

**DoD:** Страница показывает 3 limit rows (daily send, crypto withdrawal, kyc threshold).

---

## [ADM-006] 🔴 `/settings/kyc-config` — после [FIX-005]
После добавления backend роутов в [FIX-005]: проверить что view корректно рендерит:
- KYC Levels таблица (3 строки)
- Country Risk таблица с FilterTabs (Low / Medium / High / Blocked)
- PATCH на country risk работает, данные обновляются без reload

---

## [ADM-007] 🟡 `/customers` — Customer detail panel
**`apps/admin/src/views/UserDetailPanel.vue`**

Проверить что detail panel:
1. Открывается при клике на row
2. Показывает правильные данные (email, status, KYC status, wallets)
3. Approve/Reject KYC кнопки работают (если есть)
4. Ссылка "Activity" ведёт на `/customers/:id/activity`

---

## [ADM-008] 🟡 `/customers/:id/activity` — Customer Activity
**`apps/admin/src/views/CustomerActivityView.vue`** (файл существует)

Проверить что работает:
1. Загружает события из `GET /api/customers/:id/activity` (нужен [BE-006])
2. Add Note форма сохраняет через `POST /api/customers/:id/notes`
3. Breadcrumb: Customers › email › Activity
4. Новая заметка появляется в таблице без reload

---

## [ADM-009] 🟡 `/kyc-queue` — KYC Queue detail panel
**`apps/admin/src/views/KycDetailPanel.vue`**

Проверить KycDetailPanel:
1. Показывает данные applicant (имя, страна, документ, дата)
2. Approve button → `POST /api/kyc/:id/approve` → строка в таблице обновляется без reload
3. Reject button → ввод причины → confirm → `POST /api/kyc/:id/reject`
4. WS: после approve в sumsub-sim → admin KYC queue обновляется в реальном времени

---

## [ADM-010] 🟡 `/risk-queue` — Risk Review detail panel
**`apps/admin/src/views/RiskReviewDetailPanel.vue`**

Аналогично KYC panel. Проверить:
1. Risk review detail показывает транзакцию + risk score
2. Approve/Reject работают
3. После решения: строка убирается из очереди

---

## [ADM-011] 🟡 `/transactions` — Transaction detail panel
**`apps/admin/src/views/TransactionDetailPanel.vue`**

Проверить:
1. Detail panel открывается при клике
2. Показывает все поля: sourceCurrency, targetCurrency, rate, fees, status, userId
3. Статус timeline (если есть)
4. Ссылка на пользователя

---

## [ADM-012] 🟡 `/commissions` (admin) — Partner commissions overview
**`apps/admin/src/views/CommissionsView.vue`**

Все комиссии всех партнёров в одном месте. Проверить:
- Показывает commission rows с b2bClientId, transactionId, amount, status
- Filter by partner (dropdown)

---

## [ADM-013] 🟡 `/settings/users` — Staff Users (Settings view)
**`apps/admin/src/views/SettingsView.vue`** — сейчас "coming soon"

Заменить placeholder на Staff Users page:
- Таблица: email | role | status | last login
- [Add User] → SidePanel форма
- Row click → SidePanel edit + [Delete User] с confirm
- Данные из `GET /api/users?role=admin` (или создать отдельный endpoint)

---

## [ADM-014] 🟡 Admin: Notification bell
Spec: `TASKS.md § T-028`

- Bell в header с urgency badge
- Panel: grouped by urgency (critical first)
- Только admin-scoped события (userId=null в WS payload)

---

## [ADM-015] 🟡 Real-time wiring audit
**Все admin views**

Spec: `TASKS.md § T-021`

Для каждой таблицы проверить что она подписана на правильные WS события:
- Transactions: `TRANSACTION_*` events
- KYC Queue: `KYC_*` events
- Risk Queue: `RISK_*` events
- System Events: все события
- Dashboard stat cards: соответствующие события

**DoD:** Создание транзакции в consumer → появляется в admin Transactions за 2s без reload.

---

## [ADM-016] 🟢 Admin: collapsible sidebar
**`apps/admin/src/layouts/AppLayout.vue`**

Sidebar сейчас фиксированной ширины. Добавить toggle: 240px (expanded) ↔ 64px (collapsed, только иконки).

---

# ЧАСТЬ 5 — PARTNER PORTAL (localhost:5006)
_После [FIX-002] (proxy) большинство должно заработать само._

---

## [PAR-001] 🔴 Dashboard — убрать mock данные, использовать API
**`apps/partner/src/views/DashboardView.vue`**

После [FIX-002]: проверить что dashboard загружает:
- Транзакции из `GET /api/transactions?b2bClientId=` (нужен [BE-003])
- Комиссии из `GET /api/partner-commissions?b2bClientId=`
- Stat cards: total volume, commission earned, active users, pending payouts

Удалить `mockCommissions` если они есть.

---

## [PAR-002] 🔴 Transactions — реальные данные с фильтрацией
**`apps/partner/src/views/TransactionsView.vue`**

После [FIX-002]: проверить что показывает только транзакции этого партнёра.
Фильтрация по статусу. Expand row → детали транзакции.

---

## [PAR-003] 🔴 Commissions — реальные данные
**`apps/partner/src/views/CommissionsView.vue`**

После [FIX-002] и [FIX-003]: commission rows из API. Status filter. Commission status: pending / settled.

---

## [PAR-004] 🟡 End Users — реальные данные
**`apps/partner/src/views/EndUsersView.vue`** (файл существует)

Загружает из `GET /api/users?b2bClientId=` (нужен [BE-004]).
- Таблица: email, kycStatus (StatusPill), createdAt
- Search by email
- Row click → detail panel (id, status, wallets count)

---

## [PAR-005] 🟡 Widget Config — проверить что работает
**`apps/partner/src/views/WidgetConfigView.vue`** (файл существует)

Загружает из `GET /api/widget-configs?b2bClientId=`. Read-only display.
Проверить что правильно отображает: allowedCurrencies, theme, webhookUrl, redirectUrl.

---

## [PAR-006] 🟡 API Keys — visual only (mock OK)
**`apps/partner/src/views/ApiKeysView.vue`**

Mock данные OK для демо (нет реального key management). Проверить:
- Revoke button работает (меняет локальный state)
- Revoked ключ показывается с visual strikethrough
- [Generate new key] показывает modal с фейковым ключом

---

## [PAR-007] 🟡 Partner Dashboard: revenue stats + charts
**`apps/partner/src/views/DashboardView.vue`**

Добавить выше transaction table:
- 3 stat cards: Total Commissions Earned (EUR), Pending Payout (EUR), Active End Users (count)
- Mini bar chart (CSS только, no Chart.js): последние 7 дней commission по дням
- "Next payout: Friday 20 Jun" — статическая строка

---

# ЧАСТЬ 6 — SUMSUB SIMULATOR (localhost:5003)
_KYC management симулятор._

---

## [SIM-001] 🟡 Applicant list: добавить данные
**`apps/sumsub-sim/src/views/ApplicantsView.vue`**

Проверить что список загружает `GET /api/kyc/applicants`. Должны быть applicants для alice, bob, dave.
Если пустой — проверить что seed создаёт KYC applicants.

---

## [SIM-002] 🟡 Applicant detail: KYC level badge + country risk
**`apps/sumsub-sim/src/views/ApplicantDetailPanel.vue`**

Добавить (часть T-024):
- KYC Level badge: Basic / Standard / Enhanced
- Country Risk badge: 🟢 Low / 🟡 Medium / 🔴 High
- PEP flag: ⚠️ "PEP DECLARED" если pepDeclaration=true
- [Upgrade to Enhanced] кнопка → `POST /api/kyc/applicants/:id/upgrade-level`
- [Flag as PEP] кнопка → PATCH applicant

---

## [SIM-003] 🟡 Действия работают (approve/reject/manual-review)

Проверить что:
1. Approve → `POST /api/kyc/:id/approve` → WS event → Consumer KYC status обновляется
2. Reject → с причиной → WS event → Consumer видит rejected
3. Manual Review → WS event → попадает в Admin KYC Queue

---

# ЧАСТЬ 7 — SYSTEM MAP (localhost:5004)
_Визуализация потока событий в реальном времени._

---

## [MAP-001] 🟡 Проверить все 11 нод
**`apps/system-map/src/views/SystemMapView.vue`**

Ноды должны быть:
consumer-app, widget, admin, partner-portal, sumsub-simulator, risk-engine, market-simulator, bank-simulator, ledger, database, backend

Проверить что все есть. Если каких-то нет — добавить.

---

## [MAP-002] 🟡 bank-simulator + market-simulator ноды анимируются

При получении `MARKET_ORDER_EXECUTED` → анимация pulse на market-simulator → ledger edge.
При получении `BANK_ACCOUNT_CREATED` → анимация pulse на bank-simulator → database edge.

---

## [MAP-003] 🟡 Event Inspector: correlationId группировка

Right-side panel показывает последние 20 событий.
Клик на correlationId → highlights весь chain на диаграмме.

---

# ЧАСТЬ 8 — WIDGET (localhost:5005)
_Embeddable B2B виджет._

---

## [WID-001] 🟡 Проверить что Widget demo работает
**`apps/widget/src/views/WidgetDemoView.vue`**

Открыть `localhost:5005`. Проверить:
1. Widget загружается без ошибок
2. Можно выбрать валюты (EUR→BTC)
3. Quote появляется
4. Transaction создаётся при confirm
5. Нет console errors

---

## [WID-002] 🟡 Widget: theme customization preview

Demo page должна показывать preview с разными темами:
- Кнопки: Light / Dark / Custom
- Custom: color picker → применяется к виджету

---

# ЧАСТЬ 9 — DATA EXPLORER (localhost:5555)
_Красивый branded инструмент вместо Prisma Studio._

---

## [DB-001] 🟡 Создать новое приложение `apps/db-viewer`
Spec: `TASKS.md § FIX-008`

Новое Vue приложение, порт 5555, тёмная тема (navy).

**6 разделов:**
1. Users — все пользователи + KYC статусы + баланс кошельков
2. Transactions — все транзакции + статусы + суммы
3. Ledger — double-entry записи (дебит красным, кредит зелёным)
4. KYC Applicants — с кнопками Approve/Reject прямо в таблице
5. B2B Clients — клиенты + widget configs count
6. System Events — live feed, newest first

**Общие фичи:**
- Live WS badge "Connected" / "Disconnected"
- Search (client-side, instant)
- Row click → expand full JSON в `<pre>`
- CSV export
- Sortable columns

**Стилистика:**
- Background: `#0B0F1A`
- Accent: `#6366F1` (indigo)
- Debit: `#F87171` (red), Credit: `#34D399` (green)
- Monospace headers, uppercase

**Добавить скрипт в `package.json`:**
```json
"dev:db": "pnpm --filter db-viewer dev"
```

---

# ЧАСТЬ 10 — LANDING (localhost:5010)
_6 тем, маркетинговый сайт._

---

## [LND-001] 🔴 Создать недостающие страницы (файлы)

Routes уже зарегистрированы, файлов нет → 404.

**Что создать (15 файлов):**

| Тема | Файлы |
|---|---|
| Swiss | `SwissCaseStudies.vue` |
| Crypto | `CryptoCaseStudies.vue`, `CryptoSecurity.vue`, `CryptoDevelopers.vue` |
| Bold | `BoldCaseStudies.vue`, `BoldSecurity.vue`, `BoldDevelopers.vue` |
| SaaS | `SaasCaseStudies.vue`, `SaasSecurity.vue`, `SaasDevelopers.vue` |
| Gradient | `GradCaseStudies.vue`, `GradSecurity.vue`, `GradDevelopers.vue` |

Контент (одинаковый для всех тем, адаптировать стилистику):
- **Security:** KYC flow diagram, 6 certification badges (MiCA, FCA, PCI DSS, ISO 27001, SOC 2, GDPR), fake audit log terminal
- **Developers:** Quick start code block, 3 integration tabs (Widget/REST/WS), 10 API endpoints table
- **Case Studies:** 3 истории клиентов (NordPay, SwapDeck, Meridian Wealth) с метриками

**DoD:** Все routes в router.ts возвращают реальную страницу.

---

## [LND-002] 🔴 Fintech theme: добавить Security/Developers/CaseStudies + routes

`FintechLayout.vue` — нет роутов для этих страниц. Добавить в router.ts + создать 3 файла в Bloomberg-стиле (dense, monospace, amber accent).

---

## [LND-003] 🟡 Custom SVG иллюстрации (6 компонентов)
Spec: `LANDING-TASKS.md § LD-011`

1. `IllFlow.vue` — transaction lifecycle flow (анимация stroke-dashoffset при enter viewport)
2. `IllKyc.vue` — KYC funnel diagram с числами
3. `IllWallet.vue` — wallet с EUR/BTC arrow
4. `IllReceipt.vue` — стилизованный чек с fee highlight
5. `IllBuilding.vue` — B2B building иконка
6. `IllShield.vue` — security shield с circuit pattern

---

## [LND-004] 🟡 App screenshots → WebP в PhoneMockup / BrowserMockup
Spec: `LANDING-TASKS.md § LD-012`

Сделать 8 скриншотов реальных приложений → сохранить в `apps/landing/src/assets/screens/`:
- `consumer-home.webp`, `consumer-buy.webp`, `consumer-sell.webp`, `consumer-kyc.webp`
- `admin-dashboard.webp`, `admin-kyc.webp`, `system-map.webp`, `sumsub-sim.webp`

Формат: WebP, quality 85, max 120KB, реальные данные.

---

## [LND-005] 🟡 Home pages upgrade: stats, testimonials, trust logos
Spec: `LANDING-TASKS.md § LD-003`

Добавить на все 6 Home pages:
- **Animated stats bar:** $2.4B / 45,000+ / 93.1% / 47s (CounterStat, IntersectionObserver)
- **3 testimonials:** Sarah K. (NordPay), Marcus T. (SwapDeck), Ingrid M. (Meridian)
- **TrustLogoStrip:** "Built on regulated infrastructure" — 8 лого
- **"Embed in 3 lines" секция:** CodeBlock + "what you don't need" список

---

## [LND-006] 🟡 Live data от backend
Spec: `LANDING-TASKS.md § LD-004`

Composable `useBackendData.ts`:
- WS subscription: live BTC/ETH prices в header ticker
- `GET /api/transactions`: реальный tx count в stats bar
- Graceful fallback если backend offline

---

## [LND-007] 🟡 Pricing: interactive fee calculator
Spec: `LANDING-TASKS.md § LD-005`

На всех 6 Pricing pages:
- Slider: сумма €100–€10,000
- Dropdown: EUR→BTC / EUR→ETH / EUR→USDT
- Slider: partner markup 0%–2%
- Live receipt card (ReceiptCard компонент): моментальное обновление

---

## [LND-008] 🟡 Partners: revenue calculator
Spec: `LANDING-TASKS.md § LD-006`

На всех 6 Partners pages:
- Slider: monthly volume €10K–€5M
- Slider: markup 0.1%–2.0%
- Live число: "Your estimated monthly earn: €X,XXX"

---

## [LND-009] 🟡 Swiss theme: content depth pass
Spec: `LANDING-TASKS.md § LD-013`

- Live market ticker (BTC / ETH / USDT) в шапке
- IllFlow SVG вместо 3 текстовых шагов
- Integration checklist: ✕ No custom KYC / ✕ No FX agreements / ✓ Just 3 lines of HTML
- Pricing mini-receipt секция
- Product page: 3 feature deep-dives с иллюстрациями

---

## [LND-010] 🟡 Crypto theme: dark glow upgrade
Spec: `LANDING-TASKS.md § LD-014`

- CSS grid background в hero
- IllFlow с dark theme + neon glow paths
- "Live Network" terminal секция (fake tx feed, CSS animation)
- Neon glow на CTA кнопке
- Particle upgrade: 80 частиц + connection lines

---

## [LND-011] 🟡 Bold theme: typography upgrade
Spec: `LANDING-TASKS.md § LD-015`

- Hero headline: 96px, font-black
- Magazine section numbers (120px, opacity 10%)
- Alternating asymmetric sections (60/40, 40/60)

---

## [LND-012] 🟡 Micro-animations everywhere
Spec: `LANDING-TASKS.md § LD-016`

- Nav underline hover (CSS ::after)
- CTA button lift (translateY -3px + shadow)
- Card stagger (data-animate-stagger)
- Pricing card pulse border
- CounterStat: easeOutExpo easing
- CodeBlock: typing animation on enter viewport
- TrustLogoStrip: infinite CSS marquee, pause on hover
- `prefers-reduced-motion` support

---

## [LND-013] 🟢 Animation system: расширить useScrollReveal
Spec: `LANDING-TASKS.md § LD-007`

- `data-animate="fade-left"` / `fade-right"` / `scale-in"` / `slide-up-hard"`
- `data-animate-stagger` на parent → children получают +60ms delay

---

## [LND-014] 🟢 Theme picker `/` — visual upgrade
Spec: `LANDING-TASKS.md § LD-008`

6 карточек в grid, каждая: тема в своём шрифте, audience label, color strip, hover glow, click → theme.

---

## [LND-015] 🟢 Demo request form
Spec: `LANDING-TASKS.md § LD-017`

`/demo-request` route. Форма: name, work email, company, role dropdown, volume dropdown, use case textarea.
Submit → 1s fake loading → success state. No backend.

---

## [LND-016] 🟢 Mobile responsiveness pass
Spec: `LANDING-TASKS.md § LD-009`

Все 6 тем, 375px и 768px breakpoints.
- Stats: 2×2 grid
- Testimonials: horizontal snap scroll
- CoinFloat: hidden <768px
- Nav: hamburger

---

## [LND-017] 🟢 Performance & a11y
Spec: `LANDING-TASKS.md § LD-010`

- `pnpm build:landing` zero TS errors
- WebP images < 80KB
- `will-change: transform` на CoinFloat
- Canvas pauses on tab hidden
- `aria-hidden` на decorative elements
- Lighthouse Desktop ≥ 90

---

# ЧАСТЬ 11 — ДИЗАЙН СИСТЕМА (packages/ui)

---

## [UI-001] 🟡 Создать недостающие компоненты

Из 14 запланированных собрано 10. Нужно ещё 5:

**`ConfirmPanel.vue`**
- SidePanel вариант для approve/reject flows
- Props: `title`, `entity` (read-only info), `requiresReason: boolean`
- Slots: entity summary, actions
- Reason textarea (если requiresReason=true)
- Кнопки: action (красная/зелёная) + cancel

**`InfoSection.vue`**
- Группа полей с заголовком
- Props: `title`, `editable: boolean`
- Default slot: DefinitionList
- Edit кнопка → emit('edit')
- Actions slot справа от заголовка

**`FilterTabs.vue`**
- Tab switcher который ставит `?type=` в URL
- Props: `tabs: [{ label, value }]`, `queryKey: string`
- Active tab читается из `useRoute().query[queryKey]`
- Клик → `router.replace({ query: { ...route.query, [queryKey]: value } })`

**`Breadcrumb.vue`**
- Props: `items: [{ label, href? }]`
- Последний item — plain text
- Остальные — `<RouterLink>`
- Разделитель: `/` или `›`

**`AdminShell.vue`**
- Layout компонент для admin
- Collapsible sidebar: 240px ↔ 64px (toggle кнопка)
- Sidebar slot + content slot
- Accordion groups не закрываются автоматически

**Для каждого:**
- Vitest unit test
- Export из `packages/ui/src/index.ts`
- TypeScript props typed

---

# ЧАСТЬ 12 — NOTIFICATIONS BACKEND
_Все notification задачи зависят от этого._

---

## [NTF-001] 🟡 Prisma: добавить Notification модель
Spec: `TASKS.md § T-025`

```prisma
model Notification {
  id        String   @id @default(cuid())
  userId    String?
  channel   String   @default("in_app")   // 'in_app' | 'email'
  type      String
  title     String
  body      String
  actionUrl String?
  urgency   String   @default("info")     // 'info'|'success'|'warning'|'error'
  isRead    Boolean  @default(false)
  readAt    DateTime?
  metadata  String   @default("{}")       // JSON
  createdAt DateTime @default(now())
}
```

Migration + `notificationService.ts` + REST endpoints + trigger от KYC/transaction events.

---

# ЧАСТЬ 13 — СКВОЗНЫЕ ЗАДАЧИ

---

## [E2E-001] 🟡 KYC Level System (country risk routing)
Spec: `TASKS.md § T-024` — большая задача, разделить на части

**Part A — Backend (3–4h):**
- KYCLevel + CountryRisk Prisma models
- `kycEngine.ts` — `determineLevel(country)` функция
- Seed: 3 levels + 22 low + 12 medium + 11 high + 8 blocked countries
- Routes: `/api/kyc/levels`, `/api/kyc/country-risk`, `/api/kyc/applicants/:id/upgrade-level`

**Part B — Consumer KYC form (4–6h):**
- Динамический шаг-поток: 2 шага для DE, 4 для TR, 7 для RU
- Страна IR → "We cannot provide services in your country"
- PEP=Yes → авто-manual_review
- Progress bar: "Step X of N" (N = по уровню)

**Part C — Sumsub Sim (2h):** Level badge + country risk + Upgrade + Flag PEP
**Part D — Admin Settings > KYC Config (3h):** Levels table + Country risk table с FilterTabs
**Part E — Admin KYC Queue (1h):** Колонки Level + Country Risk

---

## [E2E-002] 🟡 Bank Entity Enrichment (BIC, SWIFT)
Spec: `TASKS.md § T-023`

- `bic`, `sortCode`, `accountNumber`, `dailyLimitEur` на BankAccount модели
- VirtualBank config объект
- Consumer Home: bank card с форматированным IBAN + BIC + [Copy IBAN]
- `IBAN_ASSIGNED` WS event включает bic, bankName, dailyLimitEur

---

## [E2E-003] 🟢 End-to-end demo flow test (ПОСЛЕДНИЙ)
Spec: `TASKS.md § T-022`

12 шагов: Landing → Signup → KYC → Approve → Buy → System Map → Admin → Partner
Запускать только когда все остальные задачи готовы.

---

# ИТОГОВЫЙ СЧЁТ ЗАДАЧ

| Часть | Задач | Оценка |
|---|---|---|
| Экстренные фиксы | 5 | 6h |
| Backend | 7 | 10h |
| Consumer | 15 | 30h |
| Admin | 16 | 28h |
| Partner | 7 | 12h |
| Sumsub Sim | 3 | 4h |
| System Map | 3 | 4h |
| Widget | 2 | 3h |
| DB Viewer (новое) | 1 | 10h |
| Landing | 17 | 55h |
| Design System | 1 (5 компонентов) | 8h |
| Notifications | 1 (backend) | 5h |
| Сквозные | 3 | 20h |
| **Итого** | **~80** | **~195h** |

---

# ПОРЯДОК ВЫПОЛНЕНИЯ

```
SPRINT 0 — Разблокировка (Day 1, ~4h)
  FIX-001  delete .vue.js artifacts             30m
  FIX-002  partner vite proxy                   15m
  FIX-003  partner mock data remove             30m
  FIX-004  seed data fix                         2h
  FIX-005  kyc/levels + kyc/country-risk routes  1h

SPRINT 1 — Всё работает (Days 2–4, ~20h)
  BE-001   verify all existing routes
  ADM-001  dashboard stat cards
  ADM-002  /rewards
  ADM-003  /liquidity
  ADM-004  /settings/fees
  ADM-005  /settings/limits
  ADM-006  /settings/kyc-config
  PAR-001  partner dashboard real data
  PAR-002  partner transactions
  PAR-003  partner commissions
  CON-001  consumer auth token in apiFetch
  CON-002  /sell full flow working
  CON-003  /send step 4

SPRINT 2 — Фичи (Days 5–8, ~35h)
  BE-002   /api/auth/register
  BE-003   transactions b2bClientId filter
  BE-004   users b2bClientId filter
  BE-005   seed more data
  CON-004  /signup verify
  CON-005  /rewards verify
  CON-006  /receive QR code
  CON-007  home bank card
  PAR-004  end users table
  PAR-005  widget config view
  ADM-008  customer activity
  ADM-009  kyc queue actions
  ADM-010  risk queue actions
  SIM-001  applicants list data
  MAP-001  all 11 nodes
  MAP-002  bank/market node animations

SPRINT 3 — Полировка продукта (Days 9–12, ~40h)
  CON-008  consumer desktop layout
  CON-009  buy desktop layout
  CON-010  sell desktop layout
  CON-011  sell onboarding + empty states
  ADM-014  admin notification bell
  ADM-015  real-time wiring audit
  E2E-002  bank entity enrichment
  UI-001   missing DS components
  WID-001  widget demo check
  DB-001   db-viewer app

SPRINT 4 — KYC + Notifications (Days 13–18, ~40h)
  E2E-001  KYC level system (Parts A–E)
  NTF-001  notification backend
  CON-013  consumer notification center
  CON-012  email inbox
  ADM-014  admin notification bell

SPRINT 5 — Landing (Days 19–25, ~55h)
  LND-001  missing page files
  LND-002  fintech theme routes
  LND-003  SVG illustrations
  LND-004  app screenshots WebP
  LND-005  home upgrades (stats/testimonials/trust)
  LND-006  live data from backend
  LND-007  fee calculator
  LND-008  revenue calculator
  LND-009  swiss depth pass
  LND-010  crypto glow
  LND-011  bold typography
  LND-012  micro-animations
  LND-013  animation system
  LND-014  theme picker
  LND-015  demo request form
  LND-016  mobile pass
  LND-017  performance

FINAL — Demo verification
  CON-015  sell flow tests
  E2E-003  end-to-end demo flow
```

---

# DONE ✅

| Что | Статус |
|---|---|
| System Map Vue Flow rebuild | ✅ |
| PriceSnapshot bid/ask fix | ✅ |
| Backend B2B + partner routes | ✅ |
| Admin DS components (10/14) | ✅ |
| Admin B2B Clients page | ✅ |
| Sumsub Sim KYC events (approve/reject/manual) | ✅ |
| Component inventory doc | ✅ |
| Admin spec doc | ✅ |
| Backend fees.ts, rewards.ts, liquidity.ts registered | ✅ |
| Backend auth.ts, bank.ts registered | ✅ |
| Partner LoginView exists | ✅ |
| Consumer SignupView exists (needs verification) | ✅ |
| Consumer RewardsView exists (needs verification) | ✅ |
| Landing: 6 themes × 4 pages | ✅ |
| Landing: 8 shared components | ✅ |
| Landing: Swiss Security + Swiss Developers | ✅ |
| Landing: Bold Home upgraded | ✅ |
| Landing: Crypto Home upgraded | ✅ |
