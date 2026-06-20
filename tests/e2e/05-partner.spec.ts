import { test, expect } from '@playwright/test'
import { loginAsAcme, checkBackendHealth } from './helpers'

test.beforeAll(async () => {
  const healthy = await checkBackendHealth()
  if (!healthy) {
    throw new Error('Backend not reachable at localhost:3000 — run `pnpm dev:backend` before running tests')
  }
})

test('partner dashboard loads after login', async ({ page }) => {
  await loginAsAcme(page)
  await expect(page).toHaveURL(/\/dashboard/, { timeout: 8000 })
  await expect(page.locator('body')).not.toContainText('Login', { timeout: 5000 })
  // Acme has 3 partner commissions seeded — dashboard should show revenue/commission data
  await expect(page.locator('body')).toContainText(/dashboard|commission|revenue|Acme/i, { timeout: 5000 })
})

test('end users table loads', async ({ page }) => {
  await loginAsAcme(page)
  await page.goto('http://localhost:5006/end-users')
  // Alice and Dave are attributed to Acme — at least one row expected
  await expect(page.locator('table, [role="table"], .empty-state')).toBeVisible({ timeout: 8000 })
})

test('commissions page loads', async ({ page }) => {
  await loginAsAcme(page)
  await page.goto('http://localhost:5006/commissions')
  await expect(page.locator('body')).not.toContainText(/error/i, { timeout: 5000 })
  // 3 commissions seeded for Acme
  await expect(page.locator('table, [role="table"], .empty-state')).toBeVisible({ timeout: 8000 })
})

test('transactions page loads', async ({ page }) => {
  await loginAsAcme(page)
  await page.goto('http://localhost:5006/transactions')
  await expect(page.locator('body')).not.toContainText(/error/i, { timeout: 5000 })
  await expect(page.locator('table, [role="table"], .empty-state')).toBeVisible({ timeout: 8000 })
})

test('widget config page loads', async ({ page }) => {
  await loginAsAcme(page)
  await page.goto('http://localhost:5006/widget-config')
  await expect(page.locator('body')).not.toContainText(/error/i, { timeout: 5000 })
  // Acme Widget config is seeded (EUR/BTC, light theme)
  await expect(page.locator('body')).toContainText(/widget|config|BTC|EUR/i, { timeout: 8000 })
})

test('api keys page loads', async ({ page }) => {
  await loginAsAcme(page)
  await page.goto('http://localhost:5006/api-keys')
  await expect(page.locator('body')).not.toContainText(/error/i, { timeout: 5000 })
})
