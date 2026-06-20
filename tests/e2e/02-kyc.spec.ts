import { test, expect } from '@playwright/test'
import { checkBackendHealth } from './helpers'

test.beforeAll(async () => {
  const healthy = await checkBackendHealth()
  if (!healthy) {
    throw new Error('Backend not reachable at localhost:3000 — run `pnpm dev:backend` before running tests')
  }
})

async function signUpFreshUser(page: import('@playwright/test').Page, emailPrefix: string) {
  const email = `${emailPrefix}_${Date.now()}@demo.com`
  await page.goto('http://localhost:5001/signup')
  await page.fill('input[type="email"]', email)
  const pwFields = page.locator('input[type="password"]')
  await pwFields.first().fill('Test1234!')
  if ((await pwFields.count()) > 1) {
    await pwFields.nth(1).fill('Test1234!')
  }
  await page.click('button[type="submit"]')
  await page.waitForURL(/\/kyc/, { timeout: 8000 })
}

test('KYC - page renders after signup', async ({ page }) => {
  await signUpFreshUser(page, 'kyc_render')
  await expect(page).toHaveURL(/\/kyc/, { timeout: 5000 })
  // At least one form input should be visible
  await expect(page.locator('input, select, [role="combobox"]').first()).toBeVisible({ timeout: 5000 })
})

test('KYC - blocked country (Iran) shows blocked screen', async ({ page }) => {
  // Iran (IR) is seeded as isBlocked: true in CountryRisk
  await signUpFreshUser(page, 'kyc_ir')

  // Fill personal info step if it exists
  await page.fill('input[placeholder*="first" i], input[name*="first" i]', 'Test').catch(() => {})
  await page.fill('input[placeholder*="last" i], input[name*="last" i]', 'User').catch(() => {})
  await page.fill('input[type="date"], input[placeholder*="birth" i]', '1990-01-01').catch(() => {})
  await page.click('button:has-text("Continue"), button:has-text("Next")').catch(() => {})

  // Select Iran from the country picker
  const countrySelect = page.locator('select, [role="combobox"]').first()
  await countrySelect.selectOption({ label: 'Iran' }).catch(async () => {
    await countrySelect.selectOption({ value: 'IR' }).catch(() => {})
  })

  // Should show a blocked / unavailable message — not a submit button
  await expect(page.locator('body')).toContainText(
    /cannot provide|not available|blocked|regulatory|restricted/i,
    { timeout: 8000 },
  )
})

test('KYC - Germany (low risk) shows Basic level indicator', async ({ page }) => {
  // Germany is seeded as riskLevel: low, requiredLevel: basic-kyc-level
  await signUpFreshUser(page, 'kyc_de')

  await page.fill('input[placeholder*="first" i], input[name*="first" i]', 'Hans').catch(() => {})
  await page.fill('input[placeholder*="last" i], input[name*="last" i]', 'Müller').catch(() => {})
  await page.fill('input[type="date"], input[placeholder*="birth" i]', '1985-06-15').catch(() => {})
  await page.click('button:has-text("Continue"), button:has-text("Next")').catch(() => {})

  const countrySelect = page.locator('select, [role="combobox"]').first()
  await countrySelect.selectOption({ label: 'Germany' }).catch(async () => {
    await countrySelect.selectOption({ value: 'DE' }).catch(() => {})
  })

  // Basic KYC level badge/label should appear
  await expect(page.locator('body')).toContainText(/basic/i, { timeout: 5000 })
})

test('KYC - Russia (high risk) shows Enhanced level indicator', async ({ page }) => {
  // Russia is seeded as riskLevel: high, requiredLevel: enhanced-kyc-level
  await signUpFreshUser(page, 'kyc_ru')

  await page.fill('input[placeholder*="first" i], input[name*="first" i]', 'Ivan').catch(() => {})
  await page.fill('input[placeholder*="last" i], input[name*="last" i]', 'Petrov').catch(() => {})
  await page.fill('input[type="date"], input[placeholder*="birth" i]', '1980-03-20').catch(() => {})
  await page.click('button:has-text("Continue"), button:has-text("Next")').catch(() => {})

  const countrySelect = page.locator('select, [role="combobox"]').first()
  await countrySelect.selectOption({ label: 'Russia' }).catch(async () => {
    await countrySelect.selectOption({ value: 'RU' }).catch(() => {})
  })

  // Enhanced KYC level should be indicated
  await expect(page.locator('body')).toContainText(/enhanced/i, { timeout: 5000 })
})
