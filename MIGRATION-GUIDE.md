# Перенос проекта на новый ноутбук
# Migration Guide — Prodigy Fintech

**GitHub repo:** https://github.com/hellykam/prodigy-fintech  
**Подход:** GitHub + AirDrop для файлов с ключами  
**Итераций:** 3 + один шаг сейчас (на этом компьютере)

---

## ⚠️ СНАЧАЛА — на ЭТОМ компьютере (до переноса)

### Шаг A — Пушнуть всё в GitHub

Открой терминал в папке проекта и запусти:

```bash
cd "/Users/nellikam/Prodigy - fintech"
git add .
git commit -m "feat: full project push — all apps, docs, agents, task files"
git push origin main
```

Если спросит логин/пароль GitHub — нужен **Personal Access Token** (не пароль).  
Как получить: github.com → Settings → Developer settings → Personal access tokens → Generate new token (classic) → поставь галочку `repo` → Copy.

### Шаг B — AirDrop: эти файлы НЕ идут в GitHub (они с ключами)

Передай с этого Мака на новый через AirDrop (или USB) эти файлы:

| Файл на ЭТОМ маке | Куда положить на НОВОМ маке |
|---|---|
| `/Users/nellikam/.config/zed/settings.json` | `~/.config/zed/settings.json` |
| `/Users/nellikam/Prodigy - fintech/.env` | В папку проекта после клона |
| `/Users/nellikam/.claude/skills/` (вся папка) | `~/.claude/skills/` |
| `/Users/nellikam/.claude/projects/-Users-nellikam-Prodigy---fintech/memory/` | После клона — см. итерацию 3 |

**Zed settings.json содержит:** Anthropic API key + Figma API key — именно поэтому через AirDrop, не через GitHub.

---

## ИТЕРАЦИЯ 1 — Установить всё на новый ноут

**Что делать:** Открой Claude Code на новом ноуте, создай новый чат без папки проекта (просто в домашней директории), вставь этот промпт целиком:

---

```
I need to set up a new Mac for development. Please install all required tools step by step, confirming each step works before moving to the next.

My project stack:
- Node.js v24 (required: >=20)
- pnpm v10 (required: >=10)  
- Git (likely already installed on Mac)
- Homebrew (Mac package manager)

Please do the following in order:

1. Check if Homebrew is installed: run `brew --version`
   - If NOT installed: install it by running the official installer from brew.sh
   - If installed: run `brew update`

2. Check if Git is installed: run `git --version`
   - If NOT installed: run `brew install git`

3. Install nvm (Node Version Manager) — this lets us manage Node versions:
   Run: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash`
   Then reload shell: `source ~/.zshrc` (or `source ~/.bash_profile` if using bash)
   Verify: `nvm --version`

4. Install Node.js v24 via nvm:
   Run: `nvm install 24`
   Then: `nvm use 24`
   Then: `nvm alias default 24`
   Verify: `node --version` (should show v24.x.x)

5. Install pnpm v10:
   Run: `npm install -g pnpm@latest`
   Verify: `pnpm --version` (should show 10.x.x)

6. Check GitHub authentication:
   Run: `git config --global user.name` and `git config --global user.email`
   If empty, set them:
   `git config --global user.name "hellykam"`
   `git config --global user.email "YOUR_EMAIL_HERE"`

After each step, show me the output so I can confirm it worked before continuing.
When all done, run a final check: `node --version && pnpm --version && git --version && brew --version`
```

---

## ИТЕРАЦИЯ 2 — Настроить Zed

**Это делается вручную — не через Claude.** Claude здесь не нужен.

### Шаг 1 — Установить Zed
Скачай с zed.dev и установи как обычное Mac приложение.

### Шаг 2 — Скопировать settings.json
Ты уже перекинул файл через AirDrop (шаг B выше). Теперь:

1. Открой Finder → нажми `Cmd+Shift+G` → введи `~/.config/zed/`
2. Если папки `zed` нет — создай её
3. Положи туда `settings.json` который пришёл через AirDrop
4. Перезапусти Zed

**Что будет в настройках автоматически:**
- Anthropic API key (claude-sonnet-4-6)
- Figma MCP server с твоим ключом
- Тема Gruvbox Light / One Dark
- Keymap: Cursor style
- Agent mode: write profile, thinking enabled
- Tool permissions (delete = confirm, .env = confirm)

### Шаг 3 — Проверить что Zed работает
Открой Zed → `Cmd+,` → убедись что настройки открылись и нет ошибок.

### Шаг 4 — MCP сервер Figma
В Zed: `Cmd+Shift+P` → `agent: open configuration` → убедись что `mcp-server-figma` есть в списке.  
Если нет — он добавится автоматически из settings.json который ты скопировал.

---

## ИТЕРАЦИЯ 3 — Клонировать проект и запустить

**Что делать:** Открой Claude Code на новом ноуте в **домашней директории** (`/Users/ТВОЕ_ИМЯ/`), вставь этот промпт:

*(Замени `YOUR_MAC_USERNAME` на своё имя пользователя на новом маке — посмотри в терминале командой `whoami`)*

---

```
I need to clone my project from GitHub and get it fully running. 
My GitHub repo: https://github.com/hellykam/prodigy-fintech

Please do this step by step:

STEP 1 — Clone the repo:
```
cd ~
git clone https://github.com/hellykam/prodigy-fintech.git "Prodigy - fintech"
cd "Prodigy - fintech"
```
If git asks for credentials: username = hellykam, password = my GitHub Personal Access Token (I'll provide it if needed).

STEP 2 — Install all dependencies:
```
pnpm install
```
This will install everything for all 8 apps. May take 2-3 minutes.

STEP 3 — Set up the .env file:
Create a file called `.env` in the project root with this content:
```
DATABASE_URL="file:./prisma/dev.db"
API_PORT=3000
NODE_ENV=development
JWT_SECRET=dev-secret-change-in-prod
```

STEP 4 — Set up the database (Prisma):
```
cd backend
pnpm prisma generate
pnpm prisma migrate dev --name init
pnpm prisma db seed
cd ..
```
This creates the SQLite database and fills it with demo data (7 users, transactions, KYC records).

STEP 5 — Launch all apps:
Open 2 terminal windows:

Terminal 1 (backend):
```
cd backend
pnpm dev
```
Should say: "Server running on port 3000"

Terminal 2 (all frontend apps):
```
pnpm dev
```
(from project root)

STEP 6 — Verify everything works:
Check these URLs in browser:
- http://localhost:5001 → Consumer wallet (login: any email, password: 1234)
- http://localhost:5002 → Admin console (password: admin1234)  
- http://localhost:5003 → KYC Simulator
- http://localhost:5004 → System Map
- http://localhost:5005 → Widget
- http://localhost:5006 → Partner Portal (password: partner1234)
- http://localhost:5010 → Landing page (/, /gradient, /saas, /bold, /crypto)
- http://localhost:3000/api/health → Backend health check (should return JSON)

If anything fails, show me the error output and I'll fix it.

STEP 7 — Copy Claude agents/skills:
I have a folder of Claude skills that was transferred via AirDrop to ~/.claude/skills/
Please verify it exists:
```
ls ~/.claude/skills/
```
Should list: analyst, builder, clean-code-gate, responsive-page, reviewer, setup-project, update-feature-docs

Also copy the project memory if it was transferred:
The memory folder should be at: ~/.claude/projects/-Users-YOUR_MAC_USERNAME-Prodigy---fintech/memory/
If the username changed, the path will be different — let me know and we'll fix the path.
```

---

## Если что-то пойдёт не так — частые проблемы

### pnpm не найден после установки
```bash
source ~/.zshrc
# или перезапусти терминал
```

### git push требует пароль
Нужен Personal Access Token, не пароль от аккаунта.  
Создать: github.com → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate → поставь `repo` → скопируй.

### prisma migrate dev завис
```bash
cd backend
rm -f prisma/dev.db prisma/dev.db-journal
pnpm prisma migrate dev --name init
pnpm prisma db seed
```

### порты заняты (EADDRINUSE)
```bash
lsof -ti:3000 | xargs kill -9
lsof -ti:5001 | xargs kill -9
# и т.д. для нужного порта
```

### имя юзера на новом маке другое
Если на новом маке твоё имя `anna` вместо `nellikam` — пути `~/.claude/...` будут `/Users/anna/.claude/...`. Всё работает, просто учти при копировании папки memory.

---

## Итого что идёт через GitHub
Весь код, все 8 приложений, документация, агенты `.agents/`, задачи (`TASKS.md` и все остальные).

## Итого что идёт через AirDrop (не через GitHub)
- `~/.config/zed/settings.json` — ключи Anthropic + Figma
- `.env` — переменные окружения
- `~/.claude/skills/` — Claude скиллы (analyst, builder, и т.д.)
- `~/.claude/projects/.../memory/` — память Claude для этого проекта
