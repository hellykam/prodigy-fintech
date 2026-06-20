# Prodigy — Demo Readiness Tasks
_Задачи для превращения в единый организм, готовый к демо._
_Дата: 2026-06-18_

---

## Что значит "единый организм"

Четыре условия:

1. **Любой экран** — три состояния всегда: skeleton пока грузится, empty state если нет данных, error state если упало
2. **Любое действие** — немедленный feedback, финальный результат, путь назад
3. **Любое событие** — если что-то произошло в одном приложении, остальные знают об этом в реальном времени
4. **Любой сбой** — backend упал, WS отключился, API вернул 500 — пользователь видит человеческое сообщение, не белый экран

---

# БЛОК A — РЕАЛЬНОЕ ВРЕМЯ (WebSocket)
_Самое важное для демо. Без этого невозможно показать "живую" систему._

---

## [WS-001] 🔴 Admin: исправить WebSocket (не singleton)

**Файл:** `apps/admin/src/composables/useWebSocket.ts`

**Проблема:** Каждый компонент который вызывает `useWebSocket()` создаёт **новый** WebSocket соединение. При открытом Dashboard + Transactions + KYC Queue = 3 отдельных WS соединения к backend. Это приводит к дублированию событий, лишней нагрузке, и рассинхронизации.

**Consumer WS сделан правильно** — singleton с `Set<Handler>`. Admin нужно переписать по той же схеме.

**Исправить `apps/admin/src/composables/useWebSocket.ts`:**
```ts
import { onUnmounted } from 'vue'
import type { SystemEvent } from '@prodigy/types'

type Handler = (event: SystemEvent) => void

let sharedWs: WebSocket | null = null
const handlers = new Set<Handler>()
let reconnectTimer: ReturnType<typeof setTimeout> | null = null
export const wsConnected = { value: false }  // simple reactive flag

function connect() {
  if (sharedWs && (sharedWs.readyState === WebSocket.OPEN || sharedWs.readyState === WebSocket.CONNECTING)) return
  const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:'
  sharedWs = new WebSocket(`${protocol}//${location.host}/ws`)
  sharedWs.onopen = () => { wsConnected.value = true }
  sharedWs.onmessage = (e) => {
    try { const ev = JSON.parse(e.data) as SystemEvent; handlers.forEach(h => h(ev)) } catch {}
  }
  sharedWs.onclose = () => {
    wsConnected.value = false
    sharedWs = null
    reconnectTimer = setTimeout(connect, 2000)
  }
  sharedWs.onerror = () => sharedWs?.close()
}

export function useWebSocket(handler?: Handler) {
  if (handler) {
    handlers.add(handler)
    connect()
    onUnmounted(() => handlers.delete(handler))
  }
  return { connected: wsConnected }
}
```

Каждый view передаёт свой handler. Singleton переиспользуется.

**DoD:**
- [ ] Открыть DevTools → Network → WS вкладка: ровно 1 соединение при любом количестве открытых admin страниц
- [ ] Все views получают события через одно соединение
- [ ] При закрытии последней страницы которая использует WS — соединение не рвётся (другие страницы могут ещё подписаться)

---

## [WS-002] 🔴 Все приложения: WS reconnect индикатор

**Файлы:** AppLayout.vue во всех приложениях

Когда backend упал или WS отключился — пользователь не видит ничего. Данные перестают обновляться в реальном времени, но нет никакого сигнала.

**Добавить в каждый AppLayout:**

Маленькая строка в самом верху (не в nav, а над ним):
```
┌─────────────────────────────────────────────────────┐
│ ⚠️  Reconnecting to server...  (spinner)            │  ← amber, 32px tall
└─────────────────────────────────────────────────────┘
```

Показывается только когда `connected === false`. Скрывается через 500ms после восстановления соединения (плавное fade).

Когда соединение восстанавливается: кратковременный зелёный flash "✓ Connected" на 2 секунды.

**Partner app:** добавить такой же WS composable (сейчас вообще нет WS).

**DoD:**
- [ ] Остановить backend (Ctrl+C) → amber bar появляется в admin, consumer, sumsub-sim в течение 3s
- [ ] Запустить backend снова → bar исчезает, зелёный flash "Connected"
- [ ] Partner app тоже показывает reconnect bar

---

## [WS-003] 🔴 Кросс-приложение: проверить что все события доходят

**Тест-сценарий:** открыть все 5 приложений одновременно и выполнить одно действие.

**Шаг 1:** Открыть в 5 вкладках:
- Consumer `localhost:5001` (залогинен alice@demo.com)
- Admin `localhost:5002`
- Sumsub Sim `localhost:5003`
- System Map `localhost:5004`
- Partner `localhost:5006`

**Шаг 2:** В Consumer создать транзакцию (buy EUR→BTC).

**Ожидаемое поведение:**
| Приложение | Что должно произойти |
|---|---|
| Consumer | Step 3 → processing → Step 4 → completed |
| Admin | Transactions table — новая строка появляется ≤ 2s |
| Admin | Dashboard "Total Volume" increment |
| System Map | Анимация пульсации по пути: consumer → risk-engine → market-simulator → ledger |
| Partner | Commissions — новая pending commission строка (если alice привязана к B2B client) |

**Шаг 3:** В Sumsub Sim: approve новый KYC applicant.

| Приложение | Что должно произойти |
|---|---|
| Consumer `/kyc` | Статус меняется на "Approved" без reload |
| Admin KYC Queue | Строка меняет статус на "approved" без reload |
| Admin Dashboard | "Pending KYC" count уменьшается |
| System Map | Пульсация: sumsub-simulator → database |

**Зафиксировать:** для каждого события — работает или нет. Сломанные — исправить.

**DoD:** Все события из таблицы выше работают с задержкой ≤ 2s.

---

## [WS-004] 🟡 Оптимизация: WS события только нужному получателю

Сейчас все события broadcast всем. Consumer Alice видит события Bob'а.

В каждый WS event добавить `userId` поле (если применимо).
Consumer: фильтровать входящие события по `event.payload.userId === authStore.user?.id`.
Admin: показывать все события (без фильтра — это и нужно).

Spec: `TASKS.md § BE-007`

---

# БЛОК B — СОСТОЯНИЯ ЭКРАНОВ

---

## [STA-001] 🔴 Аудит и фикс: loading states во всех views

**Паттерн:** каждый view который делает API запрос должен показывать skeleton пока данные грузятся. Белый экран недопустим.

**Скелетон паттерн (использовать везде одинаковый):**
```vue
<!-- Для таблиц: -->
<template v-if="isLoading">
  <tr v-for="i in 8" :key="i">
    <td v-for="j in colCount" :key="j">
      <div class="h-4 bg-slate-100 rounded animate-pulse" :style="`width: ${60 + (i*j*17 % 40)}%`" />
    </td>
  </tr>
</template>

<!-- Для stat cards: -->
<div v-if="isLoading" class="h-8 w-24 bg-slate-100 rounded animate-pulse" />

<!-- Для detail panels: -->
<div v-if="isLoading" class="space-y-3">
  <div v-for="i in 6" :key="i" class="h-4 bg-slate-100 rounded animate-pulse" :style="`width: ${50 + i*8}%`" />
</div>
```

**Views где нужно добавить/исправить:**

| Файл | Что добавить |
|---|---|
| `admin/DashboardView.vue` | Stat cards — skeleton numbers вместо "—" |
| `admin/CustomersView.vue` | 8 skeleton rows в таблице |
| `admin/KycQueueView.vue` | 8 skeleton rows |
| `admin/RiskQueueView.vue` | 8 skeleton rows |
| `admin/LedgerView.vue` | 8 skeleton rows |
| `admin/RewardsView.vue` | 8 skeleton rows |
| `admin/LiquidityView.vue` | Provider card skeletons |
| `admin/SettingsFeesView.vue` | 5 skeleton rows |
| `admin/B2bClientsView.vue` | 4 skeleton rows |
| `admin/WidgetConfigsView.vue` | 4 skeleton rows |
| `partner/DashboardView.vue` | Stat cards + table skeletons |
| `partner/CommissionsView.vue` | 8 skeleton rows |
| `partner/EndUsersView.vue` | 8 skeleton rows |
| `consumer/HomeView.vue` | Balance card skeleton, holdings skeleton |
| `consumer/TransactionsView.vue` | 5 skeleton rows |

**DoD:** Открыть любую страницу с включённым throttling (Chrome DevTools → Network → Slow 3G) — видны skeleton анимации, не белый экран.

---

## [STA-002] 🔴 Аудит и фикс: empty states во всех views

Когда данных нет — нужен EmptyState компонент (не пустая таблица, не null).

**Формула EmptyState:**
- SVG иллюстрация (или Heroicon large)
- Заголовок: "Нет [X]" — конкретно
- Подзаголовок: что нужно сделать чтобы данные появились
- CTA кнопка (если применимо)

**Views без empty state или с плохим:**

| View | Нет данных | CTA |
|---|---|---|
| `admin/CustomersView.vue` | "No customers yet" | — |
| `admin/TransactionsView.vue` | "No transactions yet" | — |
| `admin/KycQueueView.vue` | "No pending applications" | — |
| `admin/RiskQueueView.vue` | "No open reviews. All clear." | — |
| `admin/LedgerView.vue` | "No ledger entries" | — |
| `admin/RewardsView.vue` | "No rewards data" | — |
| `admin/CommissionsView.vue` | "No commissions yet" | — |
| `admin/SystemEventsView.vue` | "No events yet. Waiting for activity…" (+ пульсирующий dot) | — |
| `partner/TransactionsView.vue` | "No transactions from your users yet" | — |
| `partner/CommissionsView.vue` | "No commissions earned yet" | "View transactions" |
| `partner/EndUsersView.vue` | "No users attributed to your account" | — |
| `consumer/TransactionsView.vue` | "No transactions yet" | "Buy crypto →" |
| `consumer/SellView.vue` | "Nothing to sell yet" | "Buy crypto →" |
| `consumer/RewardsView.vue` | "No rewards yet" | "Invite friends →" |

**DoD:** Залогиниться как новый пользователь без данных → каждая страница показывает EmptyState, не пустую таблицу.

---

## [STA-003] 🔴 Аудит и фикс: error states во всех views

Когда API вернул ошибку или недоступен — нужно показать человеческое сообщение.

**Паттерн для каждого view:**
```vue
<div v-if="isError" class="flex flex-col items-center py-16 text-center">
  <div class="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
    <AlertCircle class="w-6 h-6 text-red-500" />
  </div>
  <p class="text-slate-700 font-medium mb-1">Couldn't load data</p>
  <p class="text-slate-400 text-sm mb-4">{{ error?.message || 'Something went wrong' }}</p>
  <button @click="refetch()" class="text-sm text-brand-600 font-medium hover:underline">
    Try again
  </button>
</div>
```

`useQuery` возвращает `isError` и `error` — использовать их.

**Добавить во все views** где сейчас `v-if="isLoading"` но нет `v-else-if="isError"`.

**DoD:** Остановить backend → каждая страница показывает "Couldn't load data" с кнопкой retry. Запустить backend → retry работает.

---

## [STA-004] 🔴 Форма валидация: единообразие во всех формах

**Текущее состояние:** в одних формах ошибки под полем, в других toast, в третьих ничего.

**Стандарт для всех форм (consumer + admin + partner):**

1. **Inline ошибки:** красный текст под каждым полем, `text-xs text-danger-600`
2. **Состояние поля при ошибке:** `border-danger-500 ring-1 ring-danger-500`
3. **Submit кнопка:** `disabled` пока есть validation errors
4. **Network ошибка:** toast (не только в поле) + поле остаётся заполненным
5. **Success:** toast + redirect или очистка формы

**Формы которые нужно проверить:**

| Форма | Что проверить |
|---|---|
| Consumer Login | Email format, пустые поля, wrong credentials |
| Consumer Signup | Email format, password match, min length, email taken |
| Consumer KYC | Required fields, date format, document upload |
| Consumer Send | Valid address, sufficient balance, amount > 0 |
| Admin Add Note | Max length, empty submit |
| Admin Fee edit | Rate range 0–100%, valid number |
| Admin Limits edit | Positive number, monthlyMax > dailyMax |
| Partner Login | Empty fields, wrong credentials |

**DoD:** Попробовать отправить каждую форму с пустыми полями → ошибки под полями. Попробовать с неправильными данными → конкретное сообщение.

---

## [STA-005] 🟡 Оптимистичные обновления (instant feedback)

Для действий где пользователь долго ждёт — добавить optimistic UI.

**Где применить:**

**Admin KYC approve:**
- Сейчас: click → waiting spinner → request → WS event → row updates (может занять 2–3s)
- После: click → строка немедленно меняет статус на "approved" (optimistic) → если request failed → revert + error toast

**Admin Risk review decision:**
- Та же логика: строка немедленно меняет статус, revert при ошибке

**Consumer Buy/Sell [Confirm] кнопка:**
- Кнопка становится `disabled` + spinner немедленно при клике (не после await)
- Предотвращает двойной сабмит

**Partner API key revoke:**
- Ключ немедленно показывается как revoked → request делается в фоне

**DoD:** Каждое из перечисленных действий даёт визуальный feedback менее чем за 100ms после клика.

---

## [STA-006] 🟡 404 страницы во всех приложениях

Сейчас ни в одном роутере нет catch-all роута. Если перейти по несуществующему URL — белый экран.

**Добавить в каждый роутер (`apps/*/src/router/index.ts`):**
```ts
{ path: '/:pathMatch(.*)*', component: () => import('@/views/NotFoundView.vue') }
```

**Создать `NotFoundView.vue` в каждом приложении:**
- Большой "404" текст
- "Page not found"
- Кнопка "Go home" → `/`
- Соответствует стилю приложения (admin стиль для admin, consumer стиль для consumer)

**DoD:** `localhost:5002/this-does-not-exist` → NotFound страница, не белый экран.

---

## [STA-007] 🟡 Breadcrumbs и back navigation везде

**Текущая проблема:** в детальных панелях нет явного способа вернуться. На мобильном Consumer нет back кнопки на некоторых страницах.

**Admin — добавить breadcrumbs:**

| URL | Breadcrumb |
|---|---|
| `/customers/:id` | Customers › user@email.com |
| `/customers/:id/activity` | Customers › user@email.com › Activity |
| `/transactions/:id` | Transactions › TX-xxxx |
| `/kyc-queue/:id` | KYC Queue › applicant name |
| `/risk-queue/:id` | Risk Queue › TX-xxxx |
| `/settings/fees` | Settings › Fees |
| `/settings/limits` | Settings › Limits |
| `/settings/kyc-config` | Settings › KYC Config |

Использовать `Breadcrumb` компонент из `packages/ui` (нужен [UI-001]).

**Consumer — проверить back кнопки:**
- Buy: все шаги имеют back кнопку ✓ (проверить)
- Sell: все шаги имеют back кнопку ✓ (проверить)
- Send: все шаги имеют back кнопку (проверить, step 4 — нет)
- Transaction detail: back к `/transactions`
- KYC: back к home (если не в процессе)
- Profile: close кнопка

**DoD:** Любую страницу можно покинуть не через nav, а через breadcrumb / back кнопку.

---

# БЛОК C — ДЕМО СЦЕНАРИИ

---

## [DEM-001] 🔴 Demo Controller: расширить до 5 сценариев

**Файлы:**
- `apps/admin/src/composables/useDemo.ts`
- `apps/admin/src/components/DemoController.vue`

Сейчас есть 1 сценарий: "Buy transaction". Нужно 5 полных сценариев.

**Добавить выбор сценария в DemoController UI:**
```
┌────────────────────────────────┐
│  🎬 Demo Mode                  │
│  ─────────────────────────────│
│  Scenario:                     │
│  ○ Buy Flow (EUR → BTC)        │
│  ○ KYC Approval                │
│  ○ Risk Review                 │
│  ○ Partner Commission          │
│  ○ Full Journey (4 min)        │
│  ─────────────────────────────│
│  [▶ Run]  [↺ Reset]            │
└────────────────────────────────┘
```

**Сценарий 1 — Buy Flow** (уже есть, проверить что работает):
- Fetch user alice → Create quote → Accept → Submit TX → Risk check → Market exec → Ledger → Complete

**Сценарий 2 — KYC Approval:**
```
Step 1: Create KYC applicant for bob@demo.com
Step 2: Submit for review (status: pending)
Step 3: [wait 2s — "Compliance team reviewing..."]
Step 4: POST /api/kyc/:id/approve → status: approved
Step 5: Consumer app receives KYC_APPROVED event [verify]
Step 6: Admin KYC Queue updates [verify]
```

**Сценарий 3 — Risk Flagged Transaction:**
```
Step 1: Fetch user dave@demo.com (high-risk profile)
Step 2: Create quote EUR→BTC, large amount (€5000)
Step 3: Submit transaction
Step 4: Risk engine flags → status: manual_review
Step 5: Risk review appears in Admin Risk Queue [verify]
Step 6: Admin approves → transaction completes [verify]
```

**Сценарий 4 — Partner Commission:**
```
Step 1: Create transaction attributed to Acme (b2bClientId)
Step 2: Transaction completes
Step 3: PartnerCommission record created
Step 4: Partner Portal commissions table updates [verify]
Step 5: Admin Commissions page updates [verify]
```

**Сценарий 5 — Full Journey (автоматически запускает 1→2→3→4 с паузами):**
- 4 минуты, показывает весь продукт
- Между сценариями пауза 3s с заголовком "Next: [scenario name]"
- Идеально для демонстрации без участия человека

**DoD:**
- [ ] Все 5 сценариев доступны в dropdown
- [ ] Каждый сценарий проходит до конца без ошибок
- [ ] Шаги показываются в реальном времени с деталями
- [ ] Failed шаг → красная иконка + detail с сообщением об ошибке
- [ ] Reset возвращает всё в начальное состояние

---

## [DEM-002] 🔴 Demo Reset: кнопка сброса данных

**Файл:** `backend/src/routes/` → новый `demo.ts`

Для демо критически важно сбросить состояние в начало после того как всё показали.

**Добавить endpoint:**
```
POST /api/demo/reset
```

Что делает:
1. Удаляет все транзакции созданные после seed (или: удаляет все транзакции где amount != seeded amount)
2. Сбрасывает KYC applicants bob@demo.com и dave@demo.com в `pending`
3. Сбрасывает liquidity state в initial values
4. Очищает partner commissions созданные после seed
5. Возвращает `{ ok: true, resetAt: timestamp }`

Защита: работает только если `NODE_ENV !== 'production'`.

**В DemoController добавить кнопку [Reset All Data]:**
- Confirmation modal: "This will reset all demo data. Are you sure?"
- После: все открытые views получают WS событие `DEMO_RESET` → queryClient.invalidateQueries()
- Toast: "Demo data reset ✓"

**Backend broadcast после reset:**
```ts
eventBus.emit('DEMO_RESET', { at: new Date().toISOString() })
```

**Все приложения:** подписаться на `DEMO_RESET` → `queryClient.invalidateQueries()` (или `refetch()`)

**DoD:**
- [ ] `POST /api/demo/reset` → данные возвращаются в seed состояние
- [ ] После reset все вкладки обновляют данные без reload
- [ ] DemoController показывает "Reset complete ✓"

---

## [DEM-003] 🔴 Demo Data: реалистичные имена, суммы, даты

**Файл:** `backend/src/seed/index.ts`

Текущие seed данные выглядят как тест (alice@demo.com, bob@demo.com, UUID строки). Для демо нужна убедительность.

**Пользователи (обновить email остаётся, изменить display данные):**
```
alice@demo.com → Alice Müller, DE, approved KYC, verified 2026-01-15
bob@demo.com   → Bob Nakamura, JP, pending KYC
dave@demo.com  → Dave Okonkwo, NG (high risk country), manual_review KYC
```

**Транзакции — реалистичные суммы и даты:**
```
TX-001: alice, EUR→BTC, €500, rate: 58,234/BTC, received 0.00858 BTC, completed, 2026-06-10 09:14
TX-002: alice, ETH→EUR, 0.5 ETH, rate: €3,102, received €1,540.50, completed, 2026-06-12 14:32
TX-003: alice, EUR→ETH, €1,200, rate: €3,089, received 0.3884 ETH, completed, 2026-06-15 11:05
TX-004: dave, EUR→BTC, €5,000, risk_review, 2026-06-17 08:47 (для risk demo)
TX-005: bob, EUR→BTC, €200, pending, 2026-06-17 14:15
```

**Partner commissions — реалистичные:**
```
Acme Corp: TX-001 → €2.50 (0.5%), settled
Acme Corp: TX-003 → €6.00 (0.5%), settled
Beta Exchange: TX-002 → €3.85 (0.25%), pending
```

**Ledger entries:** соответствуют транзакциям выше (double-entry корректный).

**DoD:** Открыть admin transactions → видны реальные имена, суммы, даты. Выглядит как production система.

---

## [DEM-004] 🟡 System Map: интеграция с Demo Controller

**Файлы:** `apps/system-map/src/views/SystemMapView.vue`

Сейчас System Map реагирует на WS события но не связан с Demo Controller.

**Добавить:**

1. **"Demo Mode" badge** в правом верхнем углу System Map
   - Когда admin запускает сценарий → System Map получает WS event `DEMO_STARTED { scenario }`
   - Показывает badge: "▶ Running: Buy Flow"
   - Все ноды готовы к анимации

2. **Прогресс шагов Demo в System Map:**
   - Каждый шаг из useDemo.ts → WS event → соответствующий node подсвечивается
   - "fetch-user" → consumer-app node glow
   - "create-quote" → backend node glow
   - "accept-quote" → backend → risk-engine glow
   - "submit-tx" → risk-engine → market-simulator glow + pulse animation
   - "ledger-posting" → ledger → database glow

3. **Pulse trail:** каждое событие оставляет затухающий след на пройденных edges (opacity 1 → 0 за 3s)

**DoD:** Запустить Buy Flow в Admin Demo Controller → System Map показывает живую визуализацию каждого шага.

---

## [DEM-005] 🟡 Demo Script в Landing

**Файл:** новый `apps/landing/src/pages/DemoScript.vue` или секция на `/swiss`

Страница "How the demo works" — для человека который будет показывать демо.

Формат: numbered steps с кликабельными ссылками:

```
PRODIGY DEMO SCRIPT — 8 минут

1. Consumer Onboarding [2 мин]
   Open: localhost:5001
   Sign up as: demo@example.com (или используй alice@demo.com)
   Complete KYC form
   → Open sumsub-sim (5003) → Approve the applicant
   → Watch: Consumer KYC status updates live

2. First Transaction [1.5 мин]
   Buy 0.01 BTC for €500
   → Watch: System Map (5004) shows animated flow
   → Watch: Admin (5002) Transactions — new row appears

3. Admin Review [1.5 мин]
   Open: localhost:5002
   → KYC Queue: approved applicant visible
   → Transactions: completed transaction
   → Ledger: double-entry entries
   → Dashboard: volume updated

4. Risk Scenario [1.5 мин]
   Run Demo Controller → Risk Review scenario
   → Risk Queue: flagged transaction appears
   → Approve it → transaction completes

5. Partner View [1.5 мин]
   Open: localhost:5006 (acme@partner.com)
   → Commissions: earned from alice's transaction
   → End Users: alice visible

[ Open Consumer ]  [ Open Admin ]  [ Open Sumsub ]  [ Open System Map ]  [ Open Partner ]
← все ссылки открывают в новой вкладке
```

Это страница только для внутреннего использования — добавить в `/swiss` theme или отдельный hidden route.

---

# БЛОК D — ВИЗУАЛЬНАЯ ЦЕЛОСТНОСТЬ

---

## [VIS-001] 🔴 Design token аудит: нет сырых цветов

**Файлы:** все `*.vue` файлы во всех приложениях.

```bash
# Найти все hardcoded цвета которые bypass DS tokens:
grep -rn "bg-red-\|bg-blue-\|bg-green-\|text-red-\|text-blue-\|text-green-\|border-red-\|bg-gray-\|text-gray-" \
  apps/admin/src/views/ apps/consumer/src/views/ apps/partner/src/views/ \
  --include="*.vue" | grep -v ".vue.js"
```

Для каждого найденного — заменить на DS токен:
```
bg-red-*    → bg-danger-* или bg-rose-* (в зависимости от контекста)
bg-green-*  → bg-success-*
bg-blue-*   → bg-brand-* или bg-info-*
text-gray-* → text-slate-*
bg-gray-*   → bg-slate-* или bg-surface-*
```

**Исключения:** landing themes (они намеренно используют свою цветовую схему).

**DoD:** `grep -rn "bg-red-\|bg-blue-\|bg-green-" apps/admin apps/consumer apps/partner` — 0 результатов.

---

## [VIS-002] 🔴 Типографика: единая шкала во всех admin/consumer views

**Проверить и унифицировать:**

| Элемент | Класс |
|---|---|
| Page title (H1) | `text-2xl font-bold text-slate-900` |
| Section title (H2) | `text-base font-semibold text-slate-800` |
| Table header | `text-xs font-medium text-slate-500 uppercase tracking-wide` |
| Table cell | `text-sm text-slate-700` |
| Label / caption | `text-xs text-slate-500` |
| Primary value | `text-sm font-semibold text-slate-900` |
| Meta / timestamp | `text-xs text-slate-400` |
| Error text | `text-xs text-danger-600` |
| Success text | `text-xs text-success-600` |

Пройтись по admin и consumer views, исправить несоответствия.

**DoD:** Все page titles одного размера. Все table headers одного стиля. Никаких случайных `text-lg` или `text-xl` в ячейках таблицы.

---

## [VIS-003] 🔴 StatusPill: консистентные статусы везде

`StatusPill` компонент используется в разных местах с разными строками для одного статуса.

**Создать единый map в `packages/ui/src/utils/statusMap.ts`:**
```ts
export const STATUS_MAP: Record<string, { label: string; variant: string }> = {
  // Transaction statuses
  completed:        { label: 'Completed',     variant: 'success' },
  pending:          { label: 'Pending',        variant: 'warning' },
  processing:       { label: 'Processing',     variant: 'info' },
  failed:           { label: 'Failed',         variant: 'danger' },
  rejected:         { label: 'Rejected',       variant: 'danger' },
  manual_review:    { label: 'Manual Review',  variant: 'warning' },
  risk_review:      { label: 'Risk Review',    variant: 'warning' },
  // KYC statuses
  not_started:      { label: 'Not Started',    variant: 'neutral' },
  in_progress:      { label: 'In Progress',    variant: 'info' },
  approved:         { label: 'Approved',       variant: 'success' },
  // User statuses
  active:           { label: 'Active',         variant: 'success' },
  suspended:        { label: 'Suspended',      variant: 'danger' },
  // Commission statuses
  settled:          { label: 'Settled',        variant: 'success' },
  // Provider statuses
  operational:      { label: 'Operational',    variant: 'success' },
  degraded:         { label: 'Degraded',       variant: 'warning' },
  offline:          { label: 'Offline',        variant: 'danger' },
}
```

`StatusPill` принимает raw status string → ищет в map → отображает правильный label и цвет.

Если статус не в map → показывает raw string с neutral стилем (не крашится).

**DoD:** Везде где используется StatusPill — одинаковый label для одного статуса. `completed` везде = "Completed" зелёный.

---

## [VIS-004] 🟡 Анимации: единая система transitions

Сейчас в каждом файле свои `slide-enter-active` стили. Вынести в единый CSS файл.

**`packages/ui/src/styles/transitions.css`** (или глобальный CSS):
```css
/* Page transition */
.page-enter-active, .page-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.page-enter-from { opacity: 0; transform: translateY(8px); }
.page-leave-to { opacity: 0; transform: translateY(-8px); }

/* Slide right (detail panels) */
.slide-right-enter-active, .slide-right-leave-active { transition: all 0.2s ease; }
.slide-right-enter-from { opacity: 0; transform: translateX(16px); }
.slide-right-leave-to { opacity: 0; transform: translateX(16px); }

/* Fade */
.fade-enter-active, .fade-leave-active { transition: opacity 0.15s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
```

Добавить `<Transition name="page">` вокруг `<RouterView>` в каждом AppLayout.

**DoD:** Навигация между страницами в admin и consumer — плавный fade, не резкое переключение.

---

## [VIS-005] 🟡 Money formatting: единая утилита

Сейчас в разных местах разное форматирование чисел:
- `€500.00` vs `€500` vs `500 EUR` vs `€ 500,00`

Создать `packages/ui/src/utils/formatMoney.ts`:
```ts
export function formatMoney(amount: number, currency: string, locale = 'en-DE'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: currency === 'BTC' ? 8 : currency === 'ETH' ? 6 : 2,
  }).format(amount)
}

export function formatCrypto(amount: number, currency: string): string {
  const decimals = currency === 'BTC' ? 8 : currency === 'ETH' ? 6 : 2
  return `${amount.toFixed(decimals)} ${currency}`
}
```

Заменить все inline форматирования во всех views.

**DoD:** Суммы выглядят одинаково везде — `€500.00` в consumer, `€500.00` в admin, `€500.00` в partner.

---

## [VIS-006] 🟡 Timestamp formatting: единая утилита

Даты и время отображаются по-разному в разных частях.

```ts
// packages/ui/src/utils/formatDate.ts
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(iso))
  // → "18 Jun 2026"
}

export function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  }).format(new Date(iso))
  // → "18 Jun 2026, 14:32"
}

export function formatRelative(iso: string): string {
  // "2 minutes ago", "Yesterday", "3 days ago"
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  const diff = Date.now() - new Date(iso).getTime()
  if (diff < 60000) return 'just now'
  if (diff < 3600000) return rtf.format(-Math.floor(diff / 60000), 'minute')
  if (diff < 86400000) return rtf.format(-Math.floor(diff / 3600000), 'hour')
  return rtf.format(-Math.floor(diff / 86400000), 'day')
}
```

**DoD:** Даты везде в формате "18 Jun 2026". Относительное время ("2 minutes ago") для событий в real-time feed.

---

# БЛОК E — ИНТЕГРАЦИОННАЯ ЦЕЛОСТНОСТЬ

---

## [INT-001] 🔴 Seed: проверить связность данных

**Файл:** `backend/src/seed/index.ts`

Данные должны быть связаны правильно:

```
alice@demo.com
  ├── wallets: EUR (balance: 1000), BTC (balance: 0.3), ETH (balance: 1.2)
  ├── bankAccount: IBAN DE29PROD..., BIC PRODDE77XXX
  ├── kycApplicant: status=approved, country=DE, levelId=basic-kyc-level
  ├── transactions: TX-001 (EUR→BTC completed), TX-002 (ETH→EUR completed), TX-003 (EUR→ETH completed)
  └── ledgerAccounts: alice-EUR, alice-BTC, alice-ETH

bob@demo.com (Acme partner user)
  ├── wallets: EUR (balance: 500)
  ├── attributedToB2BClientId: b2b_acme_001
  ├── kycApplicant: status=pending
  └── transactions: TX-005 (EUR→BTC pending)

dave@demo.com (high-risk)
  ├── wallets: EUR (balance: 5000), BTC (balance: 0.15)
  ├── kycApplicant: status=manual_review, country=NG (Nigeria), levelId=enhanced-kyc-level
  └── transactions: TX-004 (EUR→BTC risk_review)

b2b_acme_001 (Acme Corp)
  ├── credentials: acme@partner.com / partner1234
  ├── widgetConfig: id=wc_acme_001, allowedCrypto=BTC
  └── commissions: from TX-001 (€2.50), from TX-003 (€6.00)

b2b_beta_001 (Beta Exchange)
  ├── credentials: beta@partner.com / partner1234
  ├── widgetConfig: id=wc_beta_001, allowedCrypto=ETH,USDT
  └── commissions: from TX-002 (€3.85)
```

Проверить что:
- `GET /api/users/alice_id` → wallets корректные балансы
- `GET /api/transactions?userId=alice_id` → 3 транзакции
- `GET /api/kyc/applicants?userId=alice_id` → approved applicant
- `GET /api/partner-commissions?b2bClientId=b2b_acme_001` → 2 commission записи
- `GET /api/ledger?userId=alice_id` → 6 ledger entries (по 2 на каждую транзакцию)

**DoD:** Все API вызовы выше возвращают правильно связанные данные.

---

## [INT-002] 🔴 Transaction lifecycle: end-to-end проверка

Полный цикл транзакции должен работать и генерировать правильные побочные эффекты.

**Тест:** создать транзакцию и проверить ВСЁ что должно появиться:

```
POST /api/quotes { userId: alice_id, sourceCurrency: 'EUR', targetCurrency: 'BTC', sourceAmount: 500 }
  → quote.id, quote.rate, quote.expiresAt

POST /api/quotes/:id/accept
  → { ok: true }

POST /api/transactions { userId: alice_id, quoteId: quote.id }
  → tx.id, tx.status = 'created'

[wait for processing]

GET /api/transactions/:id
  → tx.status = 'completed'

VERIFY ALL SIDE EFFECTS:
  ✓ GET /api/users/alice_id → wallets[EUR].balance уменьшился на 500
  ✓ GET /api/users/alice_id → wallets[BTC].balance увеличился на quote.targetAmount
  ✓ GET /api/ledger?txId=tx.id → 2 ledger entries (debit EUR, credit BTC)
  ✓ GET /api/system-events → TRANSACTION_COMPLETED event есть
  ✓ GET /api/partner-commissions?b2bClientId=b2b_acme_001 → новая commission (если alice в Acme)
  ✓ WS event TRANSACTION_COMPLETED получен в consumer и admin
```

**DoD:** Все 7 side effects происходят за одну транзакцию.

---

## [INT-003] 🔴 KYC lifecycle: end-to-end проверка

```
POST /api/kyc/applicants { userId: bob_id, firstName: 'Bob', ... }
  → applicant.id, status='in_progress'

POST /api/kyc/applicants/:id/submit
  → status='pending'

VERIFY:
  ✓ GET /api/kyc/applicants → bob в списке со status='pending'
  ✓ Admin KYC Queue → строка bob появилась
  ✓ WS event KYC_SUBMITTED получен

POST /api/kyc/:id/approve (через sumsub-sim или напрямую)

VERIFY:
  ✓ GET /api/kyc/applicants/:id → status='approved'
  ✓ GET /api/users/bob_id → kycStatus='approved'
  ✓ GET /api/bank → bob получил bankAccount с IBAN
  ✓ Consumer /kyc → статус обновился без reload
  ✓ WS event KYC_APPROVED получен с userId + iban
```

**DoD:** Полный KYC cycle работает без ручного вмешательства.

---

## [INT-004] 🟡 Partner isolation: данные изолированы по b2bClientId

**Тест:** залогиниться как два разных партнёра, убедиться что данные изолированы.

```
Login: acme@partner.com / partner1234
  GET /api/transactions?b2bClientId=b2b_acme_001 → только Acme транзакции ✓
  GET /api/partner-commissions?b2bClientId=b2b_acme_001 → только Acme commission ✓
  GET /api/users?b2bClientId=b2b_acme_001 → только Acme users ✓
  GET /api/widget-configs?b2bClientId=b2b_acme_001 → только Acme widget ✓

Login: beta@partner.com / partner1234
  Все те же запросы → другие данные (Beta, не Acme)

ПОПЫТКА ВЗЛОМА:
  acme@partner.com пытается GET /api/transactions?b2bClientId=b2b_beta_001
  → должен получить 403 или пустой массив (не Beta данные)
```

**DoD:** Полная изоляция партнёрских данных. Acme не видит Beta и наоборот.

---

## [INT-005] 🟡 Консистентность данных между Admin и Partner

Одни и те же транзакции должны отображаться одинаково в Admin и Partner.

```
Транзакция TX-001 (alice, EUR→BTC, €500):
  Admin /transactions → status: "Completed", amount: "€500.00", user: "alice@demo.com"
  Partner /transactions → status: "Completed", amount: "€500.00"
  Consumer /transactions → status: "Completed", amount: "€500.00"
  
Одинаковые: статус, сумма, дата, ID
```

Проверить что все 3 приложения показывают одинаковые данные из одного источника.

---

# БЛОК F — ПРОИЗВОДИТЕЛЬНОСТЬ ДЕМО

---

## [PERF-001] 🟡 Время загрузки первого экрана < 2s

**Условие:** бекенд запущен локально, одно обновление страницы.

**Измерить:** Chrome DevTools → Performance → record page load.

**Цели:**
- Admin Dashboard: первые данные видны < 1.5s
- Consumer Home: balance виден < 1.5s
- Partner Dashboard: данные видны < 1.5s

**Если медленнее:** проверить:
1. `refetchInterval` — не слишком частые запросы при mount?
2. Параллельные запросы (используется ли `Promise.all` или все sequential)?
3. Bundle size — `vite build` → есть ли chunk > 500KB?

---

## [PERF-002] 🟡 queryClient: правильный stale time

Сейчас каждый `useQuery` с дефолтным stale time = 0 → refetch при каждом focus окна. Во время демо это может вызывать мигание.

**Добавить глобальные defaults в каждом `main.ts`:**
```ts
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,        // 30 секунд — не рефетчить при каждом клике
      gcTime: 5 * 60 * 1000,   // 5 минут в кэше
      retry: 1,                 // одна попытка при ошибке
      refetchOnWindowFocus: false, // не рефетчить при переключении вкладок
    }
  }
})
```

**Исключение:** views с `refetchInterval` (например Dashboard, System Events) — оставить как есть.

---

## [PERF-003] 🟡 WS: не накапливать бесконечно events

**Admin `useWebSocket`:** `events.value = [event, ...events.value].slice(0, 200)` — уже есть cap. ✓

**Consumer:** проверить что нет memory leak в handlers Set — handlers должны удаляться в `onUnmounted`.

**System Map:** event list ограничить 50 событиями в правой панели.

---

# БЛОК G — СКВОЗНЫЕ PLAYWRIGHT ТЕСТЫ

---

## [TEST-001] 🟡 E2E: Consumer — Buy flow

**Файл:** `tests/consumer-buy.spec.ts`

```ts
test('consumer buy flow — happy path', async ({ page }) => {
  await page.goto('http://localhost:5001/login')
  await page.fill('[name="email"]', 'alice@demo.com')
  await page.fill('[name="password"]', '1234')
  await page.click('[type="submit"]')
  await page.waitForURL('**/home')

  await page.goto('http://localhost:5001/buy')
  await page.click('[data-currency="EUR"]')  // or whatever the select is
  await page.fill('[data-testid="amount-input"]', '500')
  await page.waitForSelector('[data-testid="quote-card"]')
  await page.click('[data-testid="buy-cta"]')
  await page.waitForSelector('text=Confirm Purchase')
  await page.click('button:has-text("Confirm")')
  await page.waitForSelector('text=Purchase Complete', { timeout: 15000 })
  await expect(page.locator('[data-testid="result-amount"]')).toContainText('BTC')
})
```

---

## [TEST-002] 🟡 E2E: Sell flow

`tests/consumer-sell.spec.ts` — аналогично buy, но sell flow.

---

## [TEST-003] 🟡 E2E: KYC → Admin real-time update

```ts
test('KYC approval updates admin in real time', async ({ browser }) => {
  const consumerCtx = await browser.newContext()
  const adminCtx = await browser.newContext()
  const consumerPage = await consumerCtx.newPage()
  const adminPage = await adminCtx.newPage()

  // Login in both
  await loginAsAlice(consumerPage)
  await loginAsAdmin(adminPage)

  // Submit KYC in consumer
  await consumerPage.goto('http://localhost:5001/kyc')
  await fillKycForm(consumerPage)
  await consumerPage.click('[data-testid="kyc-submit"]')
  await consumerPage.waitForSelector('text=Under Review')

  // Verify admin KYC queue updates within 3s
  await adminPage.goto('http://localhost:5002/kyc-queue')
  await adminPage.waitForSelector('text=alice@demo.com', { timeout: 3000 })

  // Approve in admin
  await adminPage.click('text=alice@demo.com')
  await adminPage.click('[data-testid="approve-btn"]')

  // Verify consumer gets update within 3s
  await consumerPage.waitForSelector('text=Approved', { timeout: 3000 })
})
```

---

## [TEST-004] 🟡 E2E: Partner sees commission after transaction

```ts
test('partner sees commission after consumer transaction', async ({ browser }) => {
  // Login as alice in consumer
  // Login as acme@partner.com in partner
  // Consumer: complete a transaction
  // Partner /commissions: new row appears within 5s
})
```

---

## [TEST-005] 🟢 E2E: Demo reset clears data

```ts
test('demo reset returns data to seed state', async ({ request }) => {
  // Create some transactions
  // POST /api/demo/reset
  // Verify transactions count = seed count
  // Verify KYC statuses = seed statuses
})
```

---

## [TEST-006] 🟢 Unit: API error handling

```ts
// consumer/src/composables/useApi.test.ts

describe('apiFetch error handling', () => {
  it('returns human-readable message on 401')
  it('calls auth.logout() on 401')
  it('returns human-readable message on 500')
  it('returns network error message when fetch fails')
  it('includes Authorization header when token present')
  it('does not include Authorization header when no token')
})
```

---

## [TEST-007] 🟢 Unit: Status formatting

```ts
// packages/ui/src/utils/statusMap.test.ts
describe('STATUS_MAP', () => {
  it('maps completed → Completed, success variant')
  it('maps manual_review → Manual Review, warning variant')
  it('returns neutral for unknown status (does not throw)')
})
```

---

# ИТОГОВЫЙ ЧЕКЛИСТ ДЛЯ ПРИЁМКИ ДЕМО

Перед тем как считать систему готовой к демо — пройти этот список:

### Backend
- [ ] `curl localhost:3000/health` → `{ ok: true }`
- [ ] Все 12+ endpoints возвращают данные (не 404, не 500)
- [ ] Seed data: alice (approved KYC), bob (pending), dave (manual review, high-risk)
- [ ] Transactions: mix of completed/pending/failed
- [ ] Commission records для обоих партнёров

### Consumer (5001)
- [ ] Login работает: alice@demo.com / 1234
- [ ] Home: balance cards показывают EUR + crypto holdings
- [ ] Home: bank card с IBAN + BIC (для alice — approved)
- [ ] Buy flow: полный цикл EUR→BTC без ошибок
- [ ] Sell flow: полный цикл BTC→EUR без ошибок
- [ ] Send flow: все 4 шага работают
- [ ] KYC form: submitится и показывает pending
- [ ] Transactions: список + детали открываются
- [ ] Profile: logout работает
- [ ] Signup: новый пользователь создаётся и логинится
- [ ] Все экраны: loading skeleton при загрузке
- [ ] Все экраны: empty state если нет данных
- [ ] Desktop: двухколоночный layout для buy/sell

### Admin (5002)
- [ ] Dashboard: все 4 stat cards показывают ненулевые числа
- [ ] Dashboard: recent transactions таблица не пустая
- [ ] Customers: таблица с пользователями, search работает
- [ ] Transactions: таблица, detail panel открывается
- [ ] KYC Queue: applicants видны, approve/reject работают
- [ ] Risk Queue: dave@demo.com транзакция видна
- [ ] Ledger: записи из транзакций alice
- [ ] Rewards: данные alice и dave
- [ ] Liquidity: 2 provider cards, simulation кнопки работают
- [ ] Settings/Fees: 3 таба, edit сохраняется
- [ ] Settings/Limits: таблица + edit
- [ ] Settings/KYC Config: levels + country risk
- [ ] B2B Clients: Acme и Beta видны
- [ ] System Events: live feed обновляется
- [ ] Demo Controller: все 5 сценариев запускаются
- [ ] Notification bell работает
- [ ] WS: 1 соединение (не множество)

### Sumsub Sim (5003)
- [ ] Список applicants: alice + bob видны
- [ ] Approve → consumer KYC обновляется ≤ 2s
- [ ] Reject с причиной → consumer видит причину
- [ ] Manual Review → попадает в admin KYC Queue

### System Map (5004)
- [ ] Все 11 нод видны
- [ ] WS соединён (индикатор зелёный)
- [ ] Транзакция → видна анимация по нодам
- [ ] Event inspector: последние события справа

### Widget (5005)
- [ ] Виджет загружается
- [ ] Buy flow: quote → confirm → transaction создаётся

### Partner (5006)
- [ ] Login: acme@partner.com / partner1234
- [ ] Dashboard: данные только Acme
- [ ] Transactions: только Acme транзакции
- [ ] Commissions: commission rows от alice транзакций
- [ ] End Users: bob@demo.com (Acme пользователь)
- [ ] Widget Config: Acme конфиг
- [ ] Beta partner: видит только Beta данные

### Landing (5010)
- [ ] Все 6 тем открываются без 404
- [ ] CTA кнопки ведут на правильные порты
- [ ] Живые цены в ticker (если бекенд запущен)
- [ ] Мобильный (375px): нет горизонтального overflow

### Global
- [ ] Все приложения: WS reconnect bar работает (тест: stop backend, start backend)
- [ ] Все приложения: error state показывается при недоступном API
- [ ] Demo reset: `POST /api/demo/reset` → данные возвращаются в seed состояние
- [ ] `.vue.js` артефактов нет: `find apps -name "*.vue.js"` → пусто

---

# ПРИОРИТЕТ ВЫПОЛНЕНИЯ

```
День 1 (4h): WS-001 + WS-002 + STA-003 + FIX-001
  → WS singleton в admin
  → Reconnect индикатор
  → Error states базовые
  → Удалить .vue.js файлы

День 2 (6h): STA-001 + STA-002 + STA-006
  → Loading skeletons во все views
  → Empty states во все views
  → 404 страницы

День 3 (4h): INT-001 + INT-002 + INT-003
  → Seed данные связаны правильно
  → Transaction lifecycle end-to-end
  → KYC lifecycle end-to-end

День 4 (6h): DEM-001 + DEM-002 + DEM-003
  → Demo Controller 5 сценариев
  → Demo Reset endpoint
  → Реалистичные seed данные

День 5 (4h): VIS-001 + VIS-003 + VIS-005 + VIS-006
  → Нет сырых цветов
  → StatusPill map
  → Money + date formatting

День 6 (4h): STA-004 + STA-005 + STA-007
  → Форма валидация консистентна
  → Optimistic updates
  → Breadcrumbs + back navigation

День 7 (4h): WS-003 + INT-004 + INT-005
  → Кросс-приложение real-time тест
  → Partner isolation
  → Data consistency

День 8 (6h): DEM-004 + DEM-005
  → System Map интеграция с Demo Controller
  → Demo Script страница

День 9–10 (8h): TEST-001 → TEST-005
  → Playwright E2E тесты

День 11 (2h): PERF-001 + PERF-002
  → Время загрузки
  → queryClient stale time

ИТОГО: ~48 часов чтобы система стала единым организмом
```
