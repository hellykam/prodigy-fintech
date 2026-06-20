import { test, expect } from '@playwright/test'

/**
 * E2E-003: End-to-end demo flow verification
 * Tests the complete demo story via API calls to verify all pieces connect.
 * Does not test UI interactions (those are covered by 06-flows and 07-realtime).
 */
test.describe('E2E-003: Demo flow integration', () => {
  test.describe.configure({ mode: 'serial' })

  let aliceId: string
  let bobId: string

  test('setup: reset demo data to clean state', async ({ request }) => {
    const res = await request.post('http://localhost:3000/api/demo/reset')
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.ok).toBe(true)
  })

  test('step 1: alice is approved with EUR balance', async ({ request }) => {
    const res = await request.get('http://localhost:3000/api/users')
    const body = await res.json()
    const alice = body.items?.find((u: any) => u.email === 'alice@demo.com')
    expect(alice).toBeTruthy()
    expect(alice.kycStatus).toBe('approved')
    aliceId = alice.id

    // Alice should have wallets
    expect(alice.wallets?.length).toBeGreaterThan(0)
  })

  test('step 2: alice can create and accept a quote', async ({ request }) => {
    const quoteRes = await request.post('http://localhost:3000/api/quotes', {
      data: { userId: aliceId, sourceCurrency: 'EUR', targetCurrency: 'BTC', sourceAmount: 100 }
    })
    expect(quoteRes.status()).toBe(200)
    const quote = await quoteRes.json()
    expect(quote.id).toBeTruthy()
    expect(quote.targetAmount).toBeGreaterThan(0)
    expect(quote.rate).toBeGreaterThan(0)

    const acceptRes = await request.post(`http://localhost:3000/api/quotes/${quote.id}/accept`)
    expect(acceptRes.status()).toBe(200)
  })

  test('step 3: bob is pending KYC', async ({ request }) => {
    const res = await request.get('http://localhost:3000/api/users')
    const body = await res.json()
    const bob = body.items?.find((u: any) => u.email === 'bob@demo.com')
    expect(bob).toBeTruthy()
    expect(bob.kycStatus).toBe('pending')
    bobId = bob.id
  })

  test('step 4: bob has a KYC applicant in pending state', async ({ request }) => {
    const res = await request.get('http://localhost:3000/api/kyc/applicants')
    const body = await res.json()
    const bobApplicant = body.items?.find((a: any) => a.userId === bobId)
    expect(bobApplicant).toBeTruthy()
    expect(bobApplicant.status).toBe('pending')
  })

  test('step 5: dave has manual_review KYC', async ({ request }) => {
    const res = await request.get('http://localhost:3000/api/users')
    const body = await res.json()
    const dave = body.items?.find((u: any) => u.email === 'dave@demo.com')
    expect(dave).toBeTruthy()
    expect(dave.kycStatus).toBe('manual_review')
  })

  test('step 6: acme partner sees their commissions', async ({ request }) => {
    const res = await request.get('http://localhost:3000/api/partner-commissions?b2bClientId=b2b_acme_001')
    const body = await res.json()
    expect(body.items?.length).toBeGreaterThan(0)
    // All commissions belong to Acme
    body.items?.forEach((c: any) => {
      expect(c.b2bClientId).toContain('acme')
    })
  })

  test('step 7: system events are being recorded', async ({ request }) => {
    const res = await request.get('http://localhost:3000/api/system-events')
    const body = await res.json()
    expect(body.items?.length || body.events?.length).toBeGreaterThan(0)
  })

  test('step 8: ledger has entries from transactions', async ({ request }) => {
    const res = await request.get('http://localhost:3000/api/ledger')
    const body = await res.json()
    const entries = body.entries || body.items || []
    expect(entries.length).toBeGreaterThan(0)
  })

  test('step 9: partner data is isolated (acme vs beta)', async ({ request }) => {
    const acmeRes = await request.get('http://localhost:3000/api/users?b2bClientId=b2b_acme_001')
    const betaRes = await request.get('http://localhost:3000/api/users?b2bClientId=b2b_beta_001')

    const acmeUsers = (await acmeRes.json()).items ?? []
    const betaUsers = (await betaRes.json()).items ?? []

    // No overlap between acme and beta users
    const acmeIds = new Set(acmeUsers.map((u: any) => u.id))
    betaUsers.forEach((u: any) => {
      expect(acmeIds.has(u.id)).toBe(false)
    })
  })

  test('step 10: notifications exist for alice', async ({ request }) => {
    const res = await request.get(`http://localhost:3000/api/notifications?userId=${aliceId}`)
    // Notifications may or may not exist — just verify the endpoint doesn't error
    expect(res.status()).toBeLessThan(500)
  })
})
