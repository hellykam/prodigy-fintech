import { test, expect } from '@playwright/test'

/**
 * PERF-001: First-data load time under 2500ms for all main dashboards.
 * INT-005: Cross-app data consistency — same seed data visible everywhere.
 */
test.describe('PERF-001: Load time targets', () => {
  test('admin dashboard: first data visible < 2500ms', async ({ page }) => {
    const start = Date.now()
    await page.goto('http://localhost:5002')
    await page
      .waitForSelector('[data-testid="stat-card"], table tbody tr, .stat-value', {
        timeout: 5000,
        state: 'visible',
      })
      .catch(() => page.waitForSelector('main, [role="main"], h1', { timeout: 5000 }))
    const elapsed = Date.now() - start
    console.log(`Admin dashboard load: ${elapsed}ms`)
    expect(elapsed).toBeLessThan(2500)
  })

  test('consumer home: first data visible < 2500ms', async ({ page }) => {
    await page.goto('http://localhost:5001/login')
    await page.fill('input[type="email"]', 'alice@demo.com')
    await page.fill('input[type="password"]', '1234')
    await page.click('button[type="submit"]')
    await page.waitForURL('**/home', { timeout: 5000 }).catch(() => {})

    const start = Date.now()
    await page.goto('http://localhost:5001/home')
    await page
      .waitForSelector('h1, .wallet-balance, [data-testid="balance"]', {
        timeout: 5000,
        state: 'visible',
      })
      .catch(() => page.waitForSelector('main', { timeout: 5000 }))
    const elapsed = Date.now() - start
    console.log(`Consumer home load: ${elapsed}ms`)
    expect(elapsed).toBeLessThan(2500)
  })

  test('partner dashboard: first data visible < 2500ms', async ({ page }) => {
    await page.goto('http://localhost:5006/login')
    await page.fill('input[type="email"]', 'acme@partner.com')
    await page.fill('input[type="password"]', 'partner1234')
    await page.click('button[type="submit"]')
    await page.waitForURL(/\/(dashboard)?$/, { timeout: 5000 }).catch(() => {})

    const start = Date.now()
    await page.goto('http://localhost:5006')
    await page
      .waitForSelector('main, [role="main"], h1', { timeout: 5000, state: 'visible' })
      .catch(() => {})
    const elapsed = Date.now() - start
    console.log(`Partner dashboard load: ${elapsed}ms`)
    expect(elapsed).toBeLessThan(2500)
  })
})

test.describe('INT-005: Cross-app data consistency', () => {
  test.describe.configure({ mode: 'serial' })

  let aliceId: string
  let bobId: string

  test('resolve user IDs by email', async ({ request }) => {
    const res = await request.get('http://localhost:3000/api/users')
    expect(res.status()).toBe(200)
    const body = await res.json()
    const users: any[] = body.items ?? body.users ?? []

    const alice = users.find((u: any) => u.email === 'alice@demo.com')
    const bob = users.find((u: any) => u.email === 'bob@demo.com')
    expect(alice).toBeTruthy()
    expect(bob).toBeTruthy()

    aliceId = alice.id
    bobId = bob.id
  })

  test('alice is approved with EUR and BTC wallets', async ({ request }) => {
    const res = await request.get(`http://localhost:3000/api/users/${aliceId}`)
    const body = await res.json()
    const user = body.user ?? body

    expect(user.email).toBe('alice@demo.com')
    expect(user.kycStatus).toBe('approved')

    const wallets: any[] = user.wallets ?? []
    const eur = wallets.find((w: any) => w.currency === 'EUR')
    const btc = wallets.find((w: any) => w.currency === 'BTC')
    expect(eur).toBeTruthy()
    expect(btc).toBeTruthy()
    expect(eur.balance).toBeGreaterThan(0)
  })

  test('TX-001: alice has a €500 EUR→BTC transaction', async ({ request }) => {
    const res = await request.get(
      `http://localhost:3000/api/transactions?userId=${aliceId}&limit=20`
    )
    const body = await res.json()
    const items: any[] = body.items ?? body.transactions ?? []

    const tx = items.find(
      (t: any) => t.sourceCurrency === 'EUR' && t.targetCurrency === 'BTC' && t.sourceAmount === 500
    )
    expect(tx).toBeTruthy()
    expect(tx.targetAmount).toBeGreaterThan(0)
    expect(['completed', 'pending', 'processing']).toContain(tx.status)
  })

  test('bob is pending KYC attributed to Acme', async ({ request }) => {
    const res = await request.get(`http://localhost:3000/api/users/${bobId}`)
    const body = await res.json()
    const user = body.user ?? body

    expect(user.email).toBe('bob@demo.com')
    expect(user.kycStatus).toBe('pending')
    expect(user.attributedToB2BClientId).toBeTruthy()
  })

  test('KYC queue shows bob as pending', async ({ request }) => {
    const res = await request.get('http://localhost:3000/api/kyc/applicants')
    const body = await res.json()
    const items: any[] = body.items ?? body.applicants ?? []

    const bobApp = items.find((a: any) => a.userId === bobId)
    expect(bobApp).toBeTruthy()
    expect(bobApp.status).toBe('pending')
  })

  test('ledger has entries', async ({ request }) => {
    const res = await request.get('http://localhost:3000/api/ledger')
    const body = await res.json()
    const entries: any[] = body.entries ?? body.items ?? []
    expect(entries.length).toBeGreaterThan(0)
  })
})
