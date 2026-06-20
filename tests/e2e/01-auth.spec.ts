import { test, expect } from '@playwright/test'
import { loginAsAlice, loginAsAdmin, loginAsAcme, checkBackendHealth } from './helpers'

test.beforeAll(async () => {
  const healthy = await checkBackendHealth()
  if (!healthy) {
    throw new Error('Backend not reachable at localhost:3000 — run `pnpm dev:backend` before running tests')
  }
})

test('consumer - alice can log in', async ({ page }) => {
  await loginAsAlice(page)
  // Router redirects / → /home; after login should land on /home
  await expect(page).toHaveURL(/\/home/, { timeout: 8000 })
  await expect(page.locator('body')).not.toContainText('Login', { timeout: 5000 })
})

test('consumer - wrong password shows error', async ({ page }) => {
  await page.goto('http://localhost:5001/login')
  await page.fill('input[type="email"]', 'alice@demo.com')
  await page.fill('input[type="password"]', 'wrongpassword')
  await page.click('button[type="submit"]')
  // Should remain on /login and display an error message
  await expect(page).toHaveURL(/\/login/, { timeout: 5000 })
  await expect(page.locator('body')).toContainText(/error|invalid|incorrect|wrong/i, { timeout: 5000 })
})

test('consumer - unauthenticated redirect to login', async ({ page }) => {
  // The router guard redirects unauthenticated requests to /login
  await page.goto('http://localhost:5001/home')
  await expect(page).toHaveURL(/\/login/, { timeout: 5000 })
})

test('consumer - signup page renders', async ({ page }) => {
  await page.goto('http://localhost:5001/signup')
  await expect(page).toHaveURL(/\/signup/, { timeout: 5000 })
  await expect(page.locator('input[type="email"], input[name="email"]')).toBeVisible({ timeout: 5000 })
})

test('consumer - signup with new email navigates to KYC', async ({ page }) => {
  const email = `test_${Date.now()}@demo.com`
  await page.goto('http://localhost:5001/signup')
  await page.fill('input[type="email"]', email)
  const pwFields = page.locator('input[type="password"]')
  await pwFields.first().fill('Test1234!')
  if ((await pwFields.count()) > 1) {
    await pwFields.nth(1).fill('Test1234!')
  }
  await page.click('button[type="submit"]')
  await expect(page).toHaveURL(/\/kyc/, { timeout: 8000 })
})

test('partner - acme can log in', async ({ page }) => {
  await loginAsAcme(page)
  await expect(page).toHaveURL(/\/dashboard/, { timeout: 8000 })
  await expect(page.locator('body')).not.toContainText('Login', { timeout: 5000 })
})

test('partner - wrong password shows error', async ({ page }) => {
  await page.goto('http://localhost:5006/login')
  await page.fill('input[type="email"]', 'acme@partner.com')
  await page.fill('input[type="password"]', 'wrongpass')
  await page.click('button[type="submit"]')
  await expect(page).toHaveURL(/\/login/, { timeout: 5000 })
  await expect(page.locator('body')).toContainText(/error|invalid|incorrect|wrong/i, { timeout: 5000 })
})

test('admin - dashboard loads', async ({ page }) => {
  await loginAsAdmin(page)
  // Admin router has no auth guard — dashboard loads directly
  await expect(page).toHaveURL(/localhost:5002/, { timeout: 5000 })
  await expect(page.locator('body')).toContainText(/dashboard|transaction|kyc/i, { timeout: 8000 })
})
