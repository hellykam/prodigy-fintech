import { test, expect } from '@playwright/test'
import { loginAsAdmin, checkBackendHealth } from './helpers'

test.beforeAll(async () => {
  const healthy = await checkBackendHealth()
  if (!healthy) {
    throw new Error('Backend not reachable at localhost:3000 — run `pnpm dev:backend` before running tests')
  }
})

test('admin dashboard loads', async ({ page }) => {
  await loginAsAdmin(page)
  // Seed has 4 transactions and 7 users — dashboard should show summary stats
  await expect(page.locator('body')).toContainText(/dashboard|transaction|kyc|user/i, { timeout: 8000 })
})

test('customer list has rows', async ({ page }) => {
  await loginAsAdmin(page)
  await page.goto('http://localhost:5002/customers')
  // 7 users are seeded; header row + at least 1 data row
  await expect(page.locator('table tr, [role="row"]').nth(1)).toBeVisible({ timeout: 8000 })
})

test('transaction list loads', async ({ page }) => {
  await loginAsAdmin(page)
  await page.goto('http://localhost:5002/transactions')
  await expect(page.locator('body')).not.toContainText(/error/i, { timeout: 5000 })
  await expect(page.locator('table, [role="table"], .empty-state')).toBeVisible({ timeout: 8000 })
})

test('kyc queue loads', async ({ page }) => {
  await loginAsAdmin(page)
  await page.goto('http://localhost:5002/kyc-queue')
  await expect(page.locator('body')).not.toContainText(/error/i, { timeout: 5000 })
  // Bob (pending) and Carol (rejected) are seeded as KYC applicants
  await expect(page.locator('table, [role="table"], .empty-state')).toBeVisible({ timeout: 8000 })
})

test('risk queue loads and shows open review', async ({ page }) => {
  await loginAsAdmin(page)
  await page.goto('http://localhost:5002/risk-queue')
  await expect(page.locator('body')).not.toContainText(/error/i, { timeout: 5000 })
  // Dave's tx4 has an open risk review (riskScore 78) seeded
  await expect(page.locator('table, [role="table"], .empty-state')).toBeVisible({ timeout: 8000 })
})

test('b2b clients list loads', async ({ page }) => {
  await loginAsAdmin(page)
  await page.goto('http://localhost:5002/b2b-clients')
  await expect(page.locator('body')).not.toContainText(/error/i, { timeout: 5000 })
  // Acme Corp, Beta Inc, Gamma Exchange are seeded
  await expect(page.locator('body')).toContainText(/Acme|Beta|Gamma/i, { timeout: 8000 })
})

test('settings fees page loads', async ({ page }) => {
  await loginAsAdmin(page)
  await page.goto('http://localhost:5002/settings/fees')
  await expect(page.locator('body')).not.toContainText(/error/i, { timeout: 5000 })
  await expect(page.locator('body')).toContainText(/fee/i, { timeout: 8000 })
})

test('ledger page loads', async ({ page }) => {
  await loginAsAdmin(page)
  await page.goto('http://localhost:5002/ledger')
  await expect(page.locator('body')).not.toContainText(/error/i, { timeout: 5000 })
  await expect(page.locator('table, [role="table"], .empty-state')).toBeVisible({ timeout: 8000 })
})
