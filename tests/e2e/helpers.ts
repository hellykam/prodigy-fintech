import { type Page } from '@playwright/test'

// Seed credentials (from backend/src/seed/index.ts — passwordHash field is the raw password)
// alice@demo.com / 1234
// admin@prodigy.com / admin1234
// acme@partner.com / partner1234

export async function loginAsAlice(page: Page) {
  await page.goto('http://localhost:5001/login')
  await page.fill('input[type="email"], input[name="email"], [data-testid="email"]', 'alice@demo.com')
  await page.fill('input[type="password"], [data-testid="password"]', '1234')
  await page.click('button[type="submit"], [data-testid="submit"]')
  await page.waitForURL('**/home', { timeout: 8000 }).catch(() => {})
}

export async function loginAsAdmin(page: Page) {
  await page.goto('http://localhost:5002/')
  // Admin router has no /login route — it goes straight to dashboard
  // If the app redirects to login, handle it
  await page.waitForURL(/localhost:5002/, { timeout: 5000 }).catch(() => {})
}

export async function loginAsAcme(page: Page) {
  await page.goto('http://localhost:5006/login')
  await page.fill('input[type="email"], input[name="email"]', 'acme@partner.com')
  await page.fill('input[type="password"]', 'partner1234')
  await page.click('button[type="submit"]')
  await page.waitForURL('**/dashboard', { timeout: 8000 }).catch(() => {})
}

export async function checkBackendHealth(): Promise<boolean> {
  try {
    const res = await fetch('http://localhost:3000/health')
    return res.ok
  } catch {
    return false
  }
}
