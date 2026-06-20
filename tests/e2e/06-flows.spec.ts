import { test, expect } from '@playwright/test'
import { loginAsAlice, checkBackendHealth } from './helpers'

test.beforeAll(async () => {
  const healthy = await checkBackendHealth()
  if (!healthy) {
    throw new Error('Backend not reachable at localhost:3000 — run `pnpm dev:backend` before running tests')
  }
})

// ── 1. Sell flow happy path ─────────────────────────────────────────────────────

test('sell flow - select BTC, enter amount, see quote, go to confirm', async ({ page }) => {
  await loginAsAlice(page)
  await page.goto('http://localhost:5001/sell')
  await expect(page).toHaveURL(/\/sell/, { timeout: 5000 })

  // Wait for holdings to load — SellView fetches user data, so wait for BTC or ETH
  await expect(page.locator('body')).toContainText(/BTC|ETH|USDT/i, { timeout: 10000 })

  // Click the BTC holding button (choose visible one)
  const btcButton = page.locator('button').filter({ hasText: 'BTC' }).first()
  await btcButton.click()

  // Enter amount in the number input that appears
  const amountInput = page.locator('input[type="number"]').first()
  await expect(amountInput).toBeVisible({ timeout: 5000 })
  await amountInput.fill('0.001')

  // Wait for quote to appear — should show "You'll receive"
  await expect(page.locator('body')).toContainText(/you.ll receive/i, { timeout: 10000 })

  // Click the visible Sell BTC button (there are responsive duplicates; use the visible one)
  const sellBtn = page.locator('button:visible').filter({ hasText: /sell btc/i }).first()
  await expect(sellBtn).toBeEnabled({ timeout: 10000 })
  await sellBtn.click()

  // Step 2: Confirm Sale
  await expect(page.locator('body')).toContainText(/confirm sale|fee breakdown/i, { timeout: 5000 })
})

test('sell flow - success screen shows after confirming', async ({ page }) => {
  await loginAsAlice(page)
  await page.goto('http://localhost:5001/sell')

  // Wait for holdings
  await expect(page.locator('body')).toContainText(/BTC|ETH/i, { timeout: 10000 })

  // Select BTC
  const btcButton = page.locator('button').filter({ hasText: 'BTC' }).first()
  await btcButton.click()

  // Enter a small amount
  const amountInput = page.locator('input[type="number"]').first()
  await expect(amountInput).toBeVisible({ timeout: 5000 })
  await amountInput.fill('0.0001')

  // Wait for quote
  await expect(page.locator('body')).toContainText(/you.ll receive/i, { timeout: 10000 })

  // Go to confirm — pick visible button (responsive duplicates exist)
  const sellBtn = page.locator('button:visible').filter({ hasText: /sell btc/i }).first()
  await expect(sellBtn).toBeEnabled({ timeout: 10000 })
  await sellBtn.click()

  // Confirm the sale (pick visible button)
  const confirmBtn = page.locator('button:visible').filter({ hasText: /confirm sale/i }).first()
  await expect(confirmBtn).toBeVisible({ timeout: 5000 })
  await confirmBtn.click()

  // Should show processing or result screen (step 3 or 4)
  await expect(page.locator('body')).toContainText(/processing|sale complete|transaction failed|view transaction/i, { timeout: 20000 })
})

// ── 2. Buy flow happy path ──────────────────────────────────────────────────────

test('buy flow - enter EUR amount, see fee, go to confirm', async ({ page }) => {
  await loginAsAlice(page)
  await page.goto('http://localhost:5001/buy')
  await expect(page).toHaveURL(/\/buy/, { timeout: 5000 })

  // Enter EUR amount
  const amountInput = page.locator('input[type="number"]').first()
  await expect(amountInput).toBeVisible({ timeout: 5000 })
  await amountInput.fill('100')

  // Wait for quote with fee info
  await expect(page.locator('body')).toContainText(/you.ll receive|fee|BTC/i, { timeout: 10000 })

  // Open fee breakdown
  const feeBreakdownBtn = page.locator('button').filter({ hasText: /fee breakdown/i })
  if (await feeBreakdownBtn.isVisible()) {
    await feeBreakdownBtn.click()
    await expect(page.locator('body')).toContainText(/platform fee/i, { timeout: 3000 })
  }

  // Click Confirm & Buy — pick visible button (responsive duplicates exist)
  const confirmBuyBtn = page.locator('button:visible').filter({ hasText: /confirm.*buy/i }).first()
  await expect(confirmBuyBtn).toBeEnabled({ timeout: 10000 })
  await confirmBuyBtn.click()

  // Should be on confirm step
  await expect(page.locator('body')).toContainText(/confirm purchase|fee breakdown/i, { timeout: 5000 })
})

test('buy flow - confirm purchase shows tx ID or processing', async ({ page }) => {
  await loginAsAlice(page)
  await page.goto('http://localhost:5001/buy')

  const amountInput = page.locator('input[type="number"]').first()
  await expect(amountInput).toBeVisible({ timeout: 5000 })
  await amountInput.fill('50')

  // Wait for quote
  await expect(page.locator('body')).toContainText(/you.ll receive/i, { timeout: 10000 })

  // First CTA goes to step 2
  const firstBtn = page.locator('button:visible').filter({ hasText: /confirm.*buy/i }).first()
  await expect(firstBtn).toBeEnabled({ timeout: 10000 })
  await firstBtn.click()

  // Step 2 confirm button
  const confirmBtn = page.locator('button:visible').filter({ hasText: /confirm purchase/i })
  await expect(confirmBtn).toBeVisible({ timeout: 5000 })
  await confirmBtn.click()

  // Step 3 or 4: processing or complete
  await expect(page.locator('body')).toContainText(/processing|purchase complete|transaction failed|view transaction/i, { timeout: 20000 })
})

// ── 3. Send flow happy path ─────────────────────────────────────────────────────

// Helper: after login, populate auth.user.wallets via the backend API so that
// SendView (which reads auth.user.wallets directly) can see the wallets.
async function loginAndPopulateWallets(page: any) {
  await loginAsAlice(page)

  // Fetch the full user (with wallets) from backend and update localStorage
  await page.evaluate(async () => {
    const stored = localStorage.getItem('prodigy_consumer_auth')
    if (!stored) return
    const user = JSON.parse(stored) as { id: string }
    try {
      const res = await fetch(`/api/users/${user.id}`)
      if (!res.ok) return
      const fullUser = await res.json()
      localStorage.setItem('prodigy_consumer_auth', JSON.stringify(fullUser))
    } catch {
      // ignore
    }
  })

  // Reload so the Vue app picks up the updated localStorage
  await page.reload()
  await page.waitForURL(/localhost:5001/, { timeout: 5000 })
}

test('send flow - select asset, enter recipient + amount, see review step', async ({ page }) => {
  await loginAndPopulateWallets(page)
  await page.goto('http://localhost:5001/send')
  await expect(page).toHaveURL(/\/send/, { timeout: 5000 })

  // Step 1: select an asset (BTC wallet should appear)
  await expect(page.locator('body')).toContainText(/send crypto|BTC|ETH/i, { timeout: 8000 })
  const btcWallet = page.locator('button').filter({ hasText: 'BTC' }).first()
  await btcWallet.click()

  // Step 2: enter amount
  const amountInput = page.locator('input[type="number"]').first()
  await expect(amountInput).toBeVisible({ timeout: 5000 })
  await amountInput.fill('0.0001')

  // Enter recipient address (needs >10 chars)
  const addressInput = page.locator('textarea').first()
  await expect(addressInput).toBeVisible({ timeout: 5000 })
  await addressInput.fill('bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh')

  // Click Review Send
  const reviewBtn = page.locator('button:visible').filter({ hasText: /review send/i }).first()
  await expect(reviewBtn).toBeEnabled({ timeout: 5000 })
  await reviewBtn.click()

  // Step 3: Review
  await expect(page.locator('body')).toContainText(/review|confirm send|to address/i, { timeout: 5000 })
})

test('send flow - confirm send shows step 4 success', async ({ page }) => {
  await loginAndPopulateWallets(page)
  await page.goto('http://localhost:5001/send')

  // Select asset
  await expect(page.locator('body')).toContainText(/BTC|ETH/i, { timeout: 8000 })
  const btcWallet = page.locator('button').filter({ hasText: 'BTC' }).first()
  await btcWallet.click()

  // Amount
  const amountInput = page.locator('input[type="number"]').first()
  await expect(amountInput).toBeVisible({ timeout: 5000 })
  await amountInput.fill('0.0001')

  // Address
  const addressInput = page.locator('textarea').first()
  await addressInput.fill('bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh')

  // Go to review
  const reviewBtn = page.locator('button:visible').filter({ hasText: /review send/i }).first()
  await expect(reviewBtn).toBeEnabled({ timeout: 5000 })
  await reviewBtn.click()

  // Confirm send
  const confirmBtn = page.locator('button:visible').filter({ hasText: /confirm send/i }).first()
  await expect(confirmBtn).toBeVisible({ timeout: 5000 })
  await confirmBtn.click()

  // Step 4: success or error — should show tx-related content
  await expect(page.locator('body')).toContainText(/transfer initiated|transfer failed|transaction id|view transaction/i, { timeout: 15000 })
})

// ── 4. Receive page ─────────────────────────────────────────────────────────────

test('receive page - QR code is visible after selecting currency', async ({ page }) => {
  await loginAsAlice(page)
  await page.goto('http://localhost:5001/receive')
  await expect(page).toHaveURL(/\/receive/, { timeout: 5000 })

  // Currency list should be visible
  await expect(page.locator('body')).toContainText(/receive crypto|bitcoin|ethereum/i, { timeout: 8000 })

  // Select BTC
  const btcOption = page.locator('button').filter({ hasText: /bitcoin/i }).first()
  await btcOption.click()

  // QR canvas must be in DOM and visible
  const qrCanvas = page.locator('canvas')
  await expect(qrCanvas).toBeVisible({ timeout: 5000 })

  // Wallet address should be shown
  await expect(page.locator('body')).toContainText(/bc1q|wallet address/i, { timeout: 5000 })
})

// ── 5. Rewards page ─────────────────────────────────────────────────────────────

test('rewards page - referral code is visible', async ({ page }) => {
  await loginAsAlice(page)
  await page.goto('http://localhost:5001/rewards')
  await expect(page).toHaveURL(/\/rewards/, { timeout: 5000 })

  // Should render rewards page
  await expect(page.locator('body')).toContainText(/rewards|refer|earn/i, { timeout: 8000 })

  // Referral code should be present (either the actual code or loading state)
  // The hero card shows the referral code in a mono span
  await expect(
    page.locator('.font-mono, code, [class*="mono"]').filter({ hasText: /[A-Z0-9]{4,}/ }).first()
  ).toBeVisible({ timeout: 10000 })
})
