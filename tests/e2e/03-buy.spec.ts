import { test, expect } from '@playwright/test'
import { loginAsAlice, checkBackendHealth } from './helpers'

test.beforeAll(async () => {
  const healthy = await checkBackendHealth()
  if (!healthy) {
    throw new Error('Backend not reachable at localhost:3000 — run `pnpm dev:backend` before running tests')
  }
})

test('buy page loads after login', async ({ page }) => {
  await loginAsAlice(page)
  await page.goto('http://localhost:5001/buy')
  await expect(page).toHaveURL(/\/buy/, { timeout: 5000 })
  // Should have an amount input or currency selector
  await expect(
    page.locator('input[type="number"], input[placeholder*="amount" i], input[placeholder*="EUR" i]').first(),
  ).toBeVisible({ timeout: 8000 })
})

test('buy BTC with EUR - entering amount shows quote/fee', async ({ page }) => {
  await loginAsAlice(page)
  await page.goto('http://localhost:5001/buy')

  const amountInput = page.locator('input[type="number"], input[placeholder*="amount" i]').first()
  await amountInput.fill('100')

  // After entering amount, a quote with rate/fee breakdown should appear
  await expect(page.locator('body')).toContainText(/fee|rate|quote|BTC|you.ll receive/i, { timeout: 8000 })
})

test('fee receipt visible before confirm', async ({ page }) => {
  await loginAsAlice(page)
  await page.goto('http://localhost:5001/buy')

  const amountInput = page.locator('input[type="number"], input[placeholder*="amount" i]').first()
  await amountInput.fill('500')

  // Platform fee line must be shown before the user confirms
  await expect(page.locator('body')).toContainText(/platform fee|fee/i, { timeout: 8000 })
})

test('sell page loads', async ({ page }) => {
  await loginAsAlice(page)
  await page.goto('http://localhost:5001/sell')
  // Alice has BTC and ETH wallets seeded — sell page should render without error
  await expect(page.locator('body')).not.toContainText(/error|not found/i, { timeout: 5000 })
  await expect(page.locator('body')).toContainText(/sell|BTC|ETH|EUR/i, { timeout: 5000 })
})

test('transaction history page loads', async ({ page }) => {
  await loginAsAlice(page)
  await page.goto('http://localhost:5001/transactions')
  // Alice has 3 completed transactions seeded
  await expect(page.locator('body')).not.toContainText(/error/i, { timeout: 5000 })
  await expect(
    page.locator('table, [role="table"], [role="list"], .transaction'),
  ).toBeVisible({ timeout: 8000 })
})
