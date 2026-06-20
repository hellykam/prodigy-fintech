/**
 * Phase 1 seed — full demo dataset.
 * Safe to re-run: clears all data first, then creates fresh.
 * Use `pnpm db:reset` (drops DB + re-seeds) or `pnpm db:seed` (clears + re-seeds).
 */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ─── Helpers ────────────────────────────────────────────────────────────────

function daysAgo(n: number): Date {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d
}

// ─── Clear (reverse dependency order) ───────────────────────────────────────

async function clearAll() {
  await prisma.notification.deleteMany()
  await prisma.systemEvent.deleteMany()
  await prisma.analyticsEvent.deleteMany()
  await prisma.partnerCommission.deleteMany()
  await prisma.ledgerEntry.deleteMany()
  await prisma.ledgerAccount.deleteMany()
  await prisma.riskReview.deleteMany()
  await prisma.transaction.deleteMany()
  await prisma.quote.deleteMany()
  await prisma.wallet.deleteMany()
  await prisma.bankAccount.deleteMany()
  await prisma.kYCApplicant.deleteMany()
  await prisma.widgetConfig.deleteMany()
  await prisma.beneficiary.deleteMany()
  await prisma.safetyStatus.deleteMany()
  await prisma.user.deleteMany()
  await prisma.b2BClient.deleteMany()
  await prisma.currency.deleteMany()
  await prisma.countryRisk.deleteMany()
  await prisma.kYCLevel.deleteMany()
}

// ─── Seed ───────────────────────────────────────────────────────────────────

async function seed() {
  console.log('🌱 Seeding database...')
  await clearAll()
  console.log('  ✓ Cleared existing data')

  // ── KYC Levels ──────────────────────────────────────────────────────────
  const kycLevels = [
    {
      id: 'basic-kyc-level',
      name: 'Basic',
      description: 'Standard verification for low-risk countries.',
      dailyLimitEur: 1000,
      monthlyLimitEur: 5000,
      steps: JSON.stringify(['personal_info', 'document_upload']),
      isActive: true,
    },
    {
      id: 'standard-kyc-level',
      name: 'Standard',
      description: 'Enhanced verification including selfie/liveness check.',
      dailyLimitEur: 10000,
      monthlyLimitEur: 50000,
      steps: JSON.stringify(['personal_info', 'document_upload', 'selfie']),
      isActive: true,
    },
    {
      id: 'enhanced-kyc-level',
      name: 'Enhanced',
      description: 'Full verification including address proof and source of funds.',
      dailyLimitEur: -1,
      monthlyLimitEur: 500000,
      steps: JSON.stringify([
        'personal_info',
        'document_upload',
        'selfie',
        'address_proof',
        'source_of_funds',
        'pep_declaration',
      ]),
      isActive: true,
    },
  ]
  for (const level of kycLevels) {
    await prisma.kYCLevel.upsert({ where: { id: level.id }, update: level, create: level })
  }
  console.log(`  ✓ KYC Levels (${kycLevels.length})`)

  // ── Country Risk ─────────────────────────────────────────────────────────
  const countries = [
    // Low risk
    { countryCode: 'DE', countryName: 'Germany', riskLevel: 'low', requiredLevel: 'basic-kyc-level', isBlocked: false },
    { countryCode: 'FR', countryName: 'France', riskLevel: 'low', requiredLevel: 'basic-kyc-level', isBlocked: false },
    { countryCode: 'GB', countryName: 'United Kingdom', riskLevel: 'low', requiredLevel: 'basic-kyc-level', isBlocked: false },
    { countryCode: 'US', countryName: 'United States', riskLevel: 'low', requiredLevel: 'basic-kyc-level', isBlocked: false },
    { countryCode: 'CA', countryName: 'Canada', riskLevel: 'low', requiredLevel: 'basic-kyc-level', isBlocked: false },
    { countryCode: 'AU', countryName: 'Australia', riskLevel: 'low', requiredLevel: 'basic-kyc-level', isBlocked: false },
    { countryCode: 'CH', countryName: 'Switzerland', riskLevel: 'low', requiredLevel: 'basic-kyc-level', isBlocked: false },
    { countryCode: 'SE', countryName: 'Sweden', riskLevel: 'low', requiredLevel: 'basic-kyc-level', isBlocked: false },
    { countryCode: 'NO', countryName: 'Norway', riskLevel: 'low', requiredLevel: 'basic-kyc-level', isBlocked: false },
    { countryCode: 'DK', countryName: 'Denmark', riskLevel: 'low', requiredLevel: 'basic-kyc-level', isBlocked: false },
    { countryCode: 'NL', countryName: 'Netherlands', riskLevel: 'low', requiredLevel: 'basic-kyc-level', isBlocked: false },
    { countryCode: 'BE', countryName: 'Belgium', riskLevel: 'low', requiredLevel: 'basic-kyc-level', isBlocked: false },
    { countryCode: 'AT', countryName: 'Austria', riskLevel: 'low', requiredLevel: 'basic-kyc-level', isBlocked: false },
    { countryCode: 'IE', countryName: 'Ireland', riskLevel: 'low', requiredLevel: 'basic-kyc-level', isBlocked: false },
    { countryCode: 'NZ', countryName: 'New Zealand', riskLevel: 'low', requiredLevel: 'basic-kyc-level', isBlocked: false },
    { countryCode: 'FI', countryName: 'Finland', riskLevel: 'low', requiredLevel: 'basic-kyc-level', isBlocked: false },
    { countryCode: 'PT', countryName: 'Portugal', riskLevel: 'low', requiredLevel: 'basic-kyc-level', isBlocked: false },
    { countryCode: 'ES', countryName: 'Spain', riskLevel: 'low', requiredLevel: 'basic-kyc-level', isBlocked: false },
    { countryCode: 'IT', countryName: 'Italy', riskLevel: 'low', requiredLevel: 'basic-kyc-level', isBlocked: false },
    { countryCode: 'SG', countryName: 'Singapore', riskLevel: 'low', requiredLevel: 'basic-kyc-level', isBlocked: false },
    { countryCode: 'JP', countryName: 'Japan', riskLevel: 'low', requiredLevel: 'basic-kyc-level', isBlocked: false },
    { countryCode: 'PL', countryName: 'Poland', riskLevel: 'low', requiredLevel: 'basic-kyc-level', isBlocked: false },
    // Medium risk
    { countryCode: 'TR', countryName: 'Turkey', riskLevel: 'medium', requiredLevel: 'standard-kyc-level', isBlocked: false },
    { countryCode: 'AE', countryName: 'United Arab Emirates', riskLevel: 'medium', requiredLevel: 'standard-kyc-level', isBlocked: false },
    { countryCode: 'ZA', countryName: 'South Africa', riskLevel: 'medium', requiredLevel: 'standard-kyc-level', isBlocked: false },
    { countryCode: 'MX', countryName: 'Mexico', riskLevel: 'medium', requiredLevel: 'standard-kyc-level', isBlocked: false },
    { countryCode: 'BR', countryName: 'Brazil', riskLevel: 'medium', requiredLevel: 'standard-kyc-level', isBlocked: false },
    { countryCode: 'IN', countryName: 'India', riskLevel: 'medium', requiredLevel: 'standard-kyc-level', isBlocked: false },
    { countryCode: 'TH', countryName: 'Thailand', riskLevel: 'medium', requiredLevel: 'standard-kyc-level', isBlocked: false },
    { countryCode: 'PH', countryName: 'Philippines', riskLevel: 'medium', requiredLevel: 'standard-kyc-level', isBlocked: false },
    { countryCode: 'CO', countryName: 'Colombia', riskLevel: 'medium', requiredLevel: 'standard-kyc-level', isBlocked: false },
    { countryCode: 'AR', countryName: 'Argentina', riskLevel: 'medium', requiredLevel: 'standard-kyc-level', isBlocked: false },
    { countryCode: 'ID', countryName: 'Indonesia', riskLevel: 'medium', requiredLevel: 'standard-kyc-level', isBlocked: false },
    // High risk
    { countryCode: 'RU', countryName: 'Russia', riskLevel: 'high', requiredLevel: 'enhanced-kyc-level', isBlocked: false },
    { countryCode: 'UA', countryName: 'Ukraine', riskLevel: 'high', requiredLevel: 'enhanced-kyc-level', isBlocked: false },
    { countryCode: 'KZ', countryName: 'Kazakhstan', riskLevel: 'high', requiredLevel: 'enhanced-kyc-level', isBlocked: false },
    { countryCode: 'BY', countryName: 'Belarus', riskLevel: 'high', requiredLevel: 'enhanced-kyc-level', isBlocked: false },
    { countryCode: 'CN', countryName: 'China', riskLevel: 'high', requiredLevel: 'enhanced-kyc-level', isBlocked: false },
    { countryCode: 'VN', countryName: 'Vietnam', riskLevel: 'high', requiredLevel: 'enhanced-kyc-level', isBlocked: false },
    { countryCode: 'PK', countryName: 'Pakistan', riskLevel: 'high', requiredLevel: 'enhanced-kyc-level', isBlocked: false },
    { countryCode: 'NG', countryName: 'Nigeria', riskLevel: 'high', requiredLevel: 'enhanced-kyc-level', isBlocked: false },
    // Blocked
    { countryCode: 'IR', countryName: 'Iran', riskLevel: 'blocked', requiredLevel: null, isBlocked: true },
    { countryCode: 'KP', countryName: 'North Korea', riskLevel: 'blocked', requiredLevel: null, isBlocked: true },
    { countryCode: 'CU', countryName: 'Cuba', riskLevel: 'blocked', requiredLevel: null, isBlocked: true },
    { countryCode: 'SY', countryName: 'Syria', riskLevel: 'blocked', requiredLevel: null, isBlocked: true },
    { countryCode: 'MM', countryName: 'Myanmar', riskLevel: 'blocked', requiredLevel: null, isBlocked: true },
  ]
  for (const c of countries) {
    await prisma.countryRisk.upsert({
      where: { countryCode: c.countryCode },
      update: c,
      create: c,
    })
  }
  console.log(`  ✓ Country Risk (${countries.length})`)

  // ── Currencies ──────────────────────────────────────────────────────────
  await prisma.currency.createMany({
    data: [
      { code: 'EUR', type: 'fiat', name: 'Euro', symbol: '€', decimals: 2, isActive: true },
      { code: 'USD', type: 'fiat', name: 'US Dollar', symbol: '$', decimals: 2, isActive: true },
      {
        code: 'GBP',
        type: 'fiat',
        name: 'British Pound',
        symbol: '£',
        decimals: 2,
        isActive: true,
      },
      { code: 'BTC', type: 'crypto', name: 'Bitcoin', symbol: '₿', decimals: 8, isActive: true },
      { code: 'ETH', type: 'crypto', name: 'Ethereum', symbol: 'Ξ', decimals: 18, isActive: true },
      { code: 'USDT', type: 'crypto', name: 'Tether', symbol: '₮', decimals: 6, isActive: true },
    ],
  })
  console.log('  ✓ Currencies (6)')

  // ── B2B Clients ─────────────────────────────────────────────────────────
  const acme = await prisma.b2BClient.create({
    data: {
      name: 'Acme Corp',
      status: 'active',
      commissionSharePercent: 15,
      platformFeePercent: 2.5,
    },
  })
  const beta = await prisma.b2BClient.create({
    data: {
      name: 'Beta Inc',
      status: 'active',
      commissionSharePercent: 10,
      platformFeePercent: 2.0,
    },
  })
  const gamma = await prisma.b2BClient.create({
    data: {
      name: 'Gamma Exchange',
      status: 'active',
      commissionSharePercent: 20,
      platformFeePercent: 3.0,
    },
  })
  console.log('  ✓ B2B Clients (3)')

  // ── Widget Configs ──────────────────────────────────────────────────────
  await prisma.widgetConfig.create({
    data: {
      b2bClientId: acme.id,
      name: 'Acme Widget',
      allowedFiatCurrencies: 'EUR',
      allowedCryptoCurrencies: 'BTC',
      defaultFiatCurrency: 'EUR',
      defaultCryptoCurrency: 'BTC',
      themeMode: 'light',
    },
  })
  await prisma.widgetConfig.create({
    data: {
      b2bClientId: beta.id,
      name: 'Beta Widget',
      allowedFiatCurrencies: 'USD',
      allowedCryptoCurrencies: 'ETH,USDT',
      defaultFiatCurrency: 'USD',
      defaultCryptoCurrency: 'ETH',
      themeMode: 'dark',
    },
  })
  await prisma.widgetConfig.create({
    data: {
      b2bClientId: gamma.id,
      name: 'Gamma Widget',
      allowedFiatCurrencies: 'EUR,USD,GBP',
      allowedCryptoCurrencies: 'BTC,ETH,USDT',
      defaultFiatCurrency: 'EUR',
      defaultCryptoCurrency: 'BTC',
      themeMode: 'light',
    },
  })
  console.log('  ✓ Widget Configs (3)')

  // ── Users ────────────────────────────────────────────────────────────────
  const alice = await prisma.user.create({
    data: {
      email: 'alice@demo.com',
      passwordHash: '1234',
      status: 'active',
      kycStatus: 'approved',
      riskLevel: 'low',
      attributedToB2BClientId: acme.id,
      createdAt: daysAgo(30),
    },
  })
  const bob = await prisma.user.create({
    data: {
      email: 'bob@demo.com',
      passwordHash: '1234',
      status: 'active',
      kycStatus: 'pending',
      riskLevel: 'low',
      attributedToB2BClientId: acme.id,
      createdAt: daysAgo(14),
    },
  })
  const carol = await prisma.user.create({
    data: {
      email: 'carol@demo.com',
      passwordHash: '1234',
      status: 'active',
      kycStatus: 'rejected',
      riskLevel: 'low',
      createdAt: daysAgo(20),
    },
  })
  const dave = await prisma.user.create({
    data: {
      email: 'dave@demo.com',
      passwordHash: '1234',
      status: 'active',
      kycStatus: 'manual_review',
      riskLevel: 'high',
      attributedToB2BClientId: beta.id,
      createdAt: daysAgo(25),
    },
  })
  await prisma.user.create({
    data: {
      email: 'admin@prodigy.com',
      passwordHash: 'admin1234',
      status: 'active',
      kycStatus: 'approved',
      riskLevel: 'low',
      createdAt: daysAgo(90),
    },
  })
  await prisma.user.create({
    data: {
      email: 'acme@partner.com',
      passwordHash: 'partner1234',
      status: 'active',
      kycStatus: 'approved',
      riskLevel: 'low',
      attributedToB2BClientId: acme.id,
      createdAt: daysAgo(60),
    },
  })
  await prisma.user.create({
    data: {
      email: 'beta@partner.com',
      passwordHash: 'partner1234',
      status: 'active',
      kycStatus: 'approved',
      riskLevel: 'low',
      attributedToB2BClientId: beta.id,
      createdAt: daysAgo(55),
    },
  })
  console.log('  ✓ Users (7)')

  // ── KYC Applicants ───────────────────────────────────────────────────────
  await prisma.kYCApplicant.create({
    data: {
      userId: alice.id,
      status: 'approved',
      levelName: 'basic-kyc-level',
      firstName: 'Alice',
      lastName: 'Müller',
      dateOfBirth: '1990-01-15',
      country: 'GB',
      documentType: 'PASSPORT',
      documentStatus: 'approved',
      reviewedAt: daysAgo(28),
    },
  })
  await prisma.kYCApplicant.create({
    data: {
      userId: bob.id,
      status: 'pending',
      levelName: 'basic-kyc-level',
      firstName: 'Bob',
      lastName: 'Nakamura',
      dateOfBirth: '1985-03-22',
      country: 'DE',
      documentType: 'ID_CARD',
      documentStatus: 'pending',
    },
  })
  await prisma.kYCApplicant.create({
    data: {
      userId: carol.id,
      status: 'rejected',
      levelName: 'basic-kyc-level',
      firstName: 'Carol',
      lastName: 'Brown',
      dateOfBirth: '1992-07-10',
      country: 'NG',
      documentType: 'PASSPORT',
      documentStatus: 'rejected',
      rejectionReason: 'Document verification failed',
      reviewedAt: daysAgo(18),
    },
  })
  await prisma.kYCApplicant.create({
    data: {
      userId: dave.id,
      status: 'manual_review',
      levelName: 'enhanced-kyc-level',
      firstName: 'Dave',
      lastName: 'Okonkwo',
      dateOfBirth: '1988-11-05',
      country: 'RU',
      documentType: 'PASSPORT',
      documentStatus: 'manual_review',
    },
  })
  console.log('  ✓ KYC Applicants (4)')

  // ── Bank Accounts (approved KYC users only) ──────────────────────────────
  await prisma.bankAccount.create({
    data: {
      userId: alice.id,
      iban: 'DE89PROD00001234567890',
      currency: 'EUR',
      balance: 5000,
      status: 'active',
      providerName: 'Prodigy Bank Simulator',
      bic: 'PRODDE77XXX',
      accountType: 'current',
      dailyLimitEur: 1000,
      monthlyLimitEur: 5000,
    },
  })
  await prisma.bankAccount.create({
    data: {
      userId: dave.id,
      iban: 'DE89PROD00009876543210',
      currency: 'EUR',
      balance: 12000,
      status: 'active',
      providerName: 'Prodigy Bank Simulator',
      bic: 'PRODDE77XXX',
      accountType: 'current',
      dailyLimitEur: 10000,
      monthlyLimitEur: 50000,
    },
  })
  console.log('  ✓ Bank Accounts (2)')

  // ── Wallets ──────────────────────────────────────────────────────────────
  await prisma.wallet.create({
    data: {
      userId: alice.id,
      currency: 'BTC',
      address: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
      balance: 0.05,
    },
  })
  await prisma.wallet.create({
    data: {
      userId: alice.id,
      currency: 'ETH',
      address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      balance: 1.2,
    },
  })
  await prisma.wallet.create({
    data: {
      userId: dave.id,
      currency: 'BTC',
      address: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf6xyz',
      balance: 0.3,
    },
  })
  console.log('  ✓ Wallets (3)')

  // ── Ledger Accounts ──────────────────────────────────────────────────────
  const laCreate = (
    ownerType: string,
    ownerId: string,
    currency: string,
    accountType: string,
    name: string,
  ) => prisma.ledgerAccount.create({ data: { ownerType, ownerId, currency, accountType, name } })

  const [
    platformEurAsset,
    ,
    ,
    platformBtcAsset,
    platformEthAsset,
    aliceEurAsset,
    aliceBtcAsset,
    aliceEthAsset,
    daveEurAsset,
    daveBtcAsset,
  ] = await Promise.all([
    laCreate('platform', 'platform', 'EUR', 'asset', 'Platform EUR Operating'),
    laCreate('platform', 'platform', 'EUR', 'revenue', 'Platform EUR Revenue'),
    laCreate('platform', 'platform', 'EUR', 'liability', 'Customer Safeguarding EUR'),
    laCreate('platform', 'platform', 'BTC', 'asset', 'Platform BTC Liquidity'),
    laCreate('platform', 'platform', 'ETH', 'asset', 'Platform ETH Liquidity'),
    laCreate('user', alice.id, 'EUR', 'asset', 'Alice EUR Balance'),
    laCreate('user', alice.id, 'BTC', 'asset', 'Alice BTC Balance'),
    laCreate('user', alice.id, 'ETH', 'asset', 'Alice ETH Balance'),
    laCreate('user', dave.id, 'EUR', 'asset', 'Dave EUR Balance'),
    laCreate('user', dave.id, 'BTC', 'asset', 'Dave BTC Balance'),
  ])
  console.log('  ✓ Ledger Accounts (10)')

  // ── Transactions ─────────────────────────────────────────────────────────
  const tx1 = await prisma.transaction.create({
    data: {
      userId: alice.id,
      b2bClientId: acme.id,
      type: 'fiat_to_crypto',
      sourceCurrency: 'EUR',
      targetCurrency: 'BTC',
      sourceAmount: 500,
      targetAmount: 0.00858, // rate ~58234
      status: 'completed',
      riskScore: 15,
      riskDecision: 'approved',
      createdAt: daysAgo(10),
      updatedAt: daysAgo(10),
    },
  })
  const tx2 = await prisma.transaction.create({
    data: {
      userId: alice.id,
      b2bClientId: acme.id,
      type: 'crypto_to_fiat',
      sourceCurrency: 'ETH',
      targetCurrency: 'EUR',
      sourceAmount: 0.5,
      targetAmount: 1200,
      status: 'completed',
      riskScore: 22,
      riskDecision: 'approved',
      createdAt: daysAgo(7),
      updatedAt: daysAgo(7),
    },
  })
  const tx3 = await prisma.transaction.create({
    data: {
      userId: alice.id,
      b2bClientId: acme.id,
      type: 'fiat_to_crypto',
      sourceCurrency: 'EUR',
      targetCurrency: 'ETH',
      sourceAmount: 1200,
      targetAmount: 0.49,
      status: 'completed',
      riskScore: 18,
      riskDecision: 'approved',
      createdAt: daysAgo(3),
      updatedAt: daysAgo(3),
    },
  })
  const tx4 = await prisma.transaction.create({
    data: {
      userId: dave.id,
      b2bClientId: beta.id,
      type: 'fiat_to_crypto',
      sourceCurrency: 'EUR',
      targetCurrency: 'BTC',
      sourceAmount: 5000,
      targetAmount: 0.0858,
      status: 'manual_review',
      riskScore: 78,
      riskDecision: 'manual_review',
      createdAt: daysAgo(1),
      updatedAt: daysAgo(1),
    },
  })
  // TX-005: bob EUR→BTC €200 pending
  const txBob = await prisma.transaction.create({
    data: {
      userId: bob.id,
      type: 'fiat_to_crypto',
      sourceCurrency: 'EUR',
      targetCurrency: 'BTC',
      sourceAmount: 200,
      targetAmount: 0.00343,
      status: 'pending',
      riskScore: 12,
      riskDecision: 'pending',
      createdAt: daysAgo(0),
      updatedAt: daysAgo(0),
    },
  })
  void txBob // seeded but no ledger entries yet (pending)
  console.log('  ✓ Transactions (5)')

  // ── Ledger Entries (simplified double-entry, 4 entries per completed tx) ─
  const leCreate = (
    txId: string | null,
    accountId: string,
    direction: string,
    amount: number,
    currency: string,
    desc: string,
  ) =>
    prisma.ledgerEntry.create({
      data: {
        transactionId: txId,
        ledgerAccountId: accountId,
        direction,
        amount,
        currency,
        description: desc,
      },
    })

  // tx1: EUR 500 → BTC 0.00858
  await Promise.all([
    leCreate(tx1.id, aliceEurAsset.id, 'debit', 500, 'EUR', 'EUR source — conversion out'),
    leCreate(tx1.id, platformEurAsset.id, 'credit', 500, 'EUR', 'EUR received from user'),
    leCreate(tx1.id, platformBtcAsset.id, 'debit', 0.00858, 'BTC', 'BTC liquidity reduction'),
    leCreate(tx1.id, aliceBtcAsset.id, 'credit', 0.00858, 'BTC', 'BTC credited to user'),
  ])

  // tx2: ETH 0.5 → EUR 1200
  await Promise.all([
    leCreate(tx2.id, aliceEthAsset.id, 'debit', 0.5, 'ETH', 'ETH source — conversion out'),
    leCreate(tx2.id, platformEthAsset.id, 'credit', 0.5, 'ETH', 'ETH received from user'),
    leCreate(tx2.id, platformEurAsset.id, 'debit', 1200, 'EUR', 'EUR liquidity reduction'),
    leCreate(tx2.id, aliceEurAsset.id, 'credit', 1200, 'EUR', 'EUR credited to user'),
  ])

  // tx3: EUR 1200 → ETH 0.49
  await Promise.all([
    leCreate(tx3.id, aliceEurAsset.id, 'debit', 1200, 'EUR', 'EUR source — conversion out'),
    leCreate(tx3.id, platformEurAsset.id, 'credit', 1200, 'EUR', 'EUR received from user'),
    leCreate(tx3.id, platformEthAsset.id, 'debit', 0.49, 'ETH', 'ETH liquidity reduction'),
    leCreate(tx3.id, aliceEthAsset.id, 'credit', 0.49, 'ETH', 'ETH credited to user'),
  ])
  console.log('  ✓ Ledger Entries (12)')

  // ── Risk Review ──────────────────────────────────────────────────────────
  await prisma.riskReview.create({
    data: {
      transactionId: tx4.id,
      userId: dave.id,
      riskScore: 78,
      riskReasons: JSON.stringify([
        'High risk country (RU)',
        'Large transaction amount €5000',
        'User risk level: high',
      ]),
      status: 'open',
    },
  })
  console.log('  ✓ Risk Reviews (1)')

  // ── Partner Commissions (Acme Corp — 15% of source amount) ──────────────
  await prisma.partnerCommission.create({
    data: {
      b2bClientId: acme.id,
      transactionId: tx1.id,
      amount: 500 * 0.15,
      currency: 'EUR',
      status: 'accrued',
    },
  })
  await prisma.partnerCommission.create({
    data: {
      b2bClientId: acme.id,
      transactionId: tx2.id,
      amount: 0.5 * 0.15,
      currency: 'ETH',
      status: 'accrued',
    },
  })
  await prisma.partnerCommission.create({
    data: {
      b2bClientId: acme.id,
      transactionId: tx3.id,
      amount: 200 * 0.15,
      currency: 'EUR',
      status: 'accrued',
    },
  })
  console.log('  ✓ Partner Commissions (3)')

  // ── System Events ────────────────────────────────────────────────────────
  const evCreate = (
    correlationId: string,
    eventName: string,
    entityType: string,
    entityId: string,
    source: string,
    target: string,
    status: string,
    payload: object,
    createdAt: Date,
  ) =>
    prisma.systemEvent.create({
      data: {
        correlationId,
        eventName,
        entityType,
        entityId,
        source,
        target,
        status,
        payload: JSON.stringify(payload),
        createdAt,
      },
    })

  await evCreate(
    `corr-${tx1.id}`,
    'TRANSACTION_CREATED',
    'transaction',
    tx1.id,
    'consumer-app',
    'backend',
    'completed',
    { transactionId: tx1.id },
    daysAgo(10),
  )
  await evCreate(
    `corr-${tx1.id}`,
    'TRANSACTION_RISK_APPROVED',
    'transaction',
    tx1.id,
    'risk-engine',
    'backend',
    'completed',
    { riskScore: 15 },
    daysAgo(10),
  )
  await evCreate(
    `corr-${tx1.id}`,
    'TRANSACTION_COMPLETED',
    'transaction',
    tx1.id,
    'ledger',
    'backend',
    'completed',
    { transactionId: tx1.id },
    daysAgo(10),
  )

  await evCreate(
    `corr-${tx2.id}`,
    'TRANSACTION_CREATED',
    'transaction',
    tx2.id,
    'consumer-app',
    'backend',
    'completed',
    { transactionId: tx2.id },
    daysAgo(7),
  )
  await evCreate(
    `corr-${tx2.id}`,
    'TRANSACTION_COMPLETED',
    'transaction',
    tx2.id,
    'ledger',
    'backend',
    'completed',
    { transactionId: tx2.id },
    daysAgo(7),
  )

  await evCreate(
    `corr-${tx3.id}`,
    'TRANSACTION_CREATED',
    'transaction',
    tx3.id,
    'consumer-app',
    'backend',
    'completed',
    { transactionId: tx3.id },
    daysAgo(3),
  )
  await evCreate(
    `corr-${tx3.id}`,
    'TRANSACTION_COMPLETED',
    'transaction',
    tx3.id,
    'ledger',
    'backend',
    'completed',
    { transactionId: tx3.id },
    daysAgo(3),
  )

  await evCreate(
    `corr-${tx4.id}`,
    'TRANSACTION_CREATED',
    'transaction',
    tx4.id,
    'consumer-app',
    'backend',
    'processing',
    { transactionId: tx4.id },
    daysAgo(1),
  )
  await evCreate(
    `corr-${tx4.id}`,
    'MANUAL_REVIEW_CREATED',
    'transaction',
    tx4.id,
    'risk-engine',
    'admin',
    'waiting',
    { riskScore: 78 },
    daysAgo(1),
  )

  await evCreate(
    `corr-kyc-${alice.id}`,
    'KYC_APPROVED',
    'user',
    alice.id,
    'kyc-simulator',
    'backend',
    'completed',
    { userId: alice.id },
    daysAgo(28),
  )
  await evCreate(
    `corr-kyc-${bob.id}`,
    'KYC_SUBMITTED',
    'user',
    bob.id,
    'consumer-app',
    'kyc-simulator',
    'processing',
    { userId: bob.id },
    daysAgo(14),
  )

  console.log('  ✓ System Events (11)')


  // ── Additional Users (BE-005) ────────────────────────────────────────────
  const eve = await prisma.user.create({
    data: {
      email: 'eve@demo.com',
      passwordHash: '1234',
      status: 'active',
      kycStatus: 'approved',
      riskLevel: 'low',
      attributedToB2BClientId: acme.id,
      createdAt: daysAgo(22),
    },
  })
  const frank = await prisma.user.create({
    data: {
      email: 'frank@demo.com',
      passwordHash: '1234',
      status: 'active',
      kycStatus: 'manual_review',
      riskLevel: 'medium',
      attributedToB2BClientId: acme.id,
      createdAt: daysAgo(18),
    },
  })
  const grace = await prisma.user.create({
    data: {
      email: 'grace@demo.com',
      passwordHash: '1234',
      status: 'active',
      kycStatus: 'pending',
      riskLevel: 'low',
      attributedToB2BClientId: beta.id,
      createdAt: daysAgo(15),
    },
  })
  const henry = await prisma.user.create({
    data: {
      email: 'henry@demo.com',
      passwordHash: '1234',
      status: 'active',
      kycStatus: 'rejected',
      riskLevel: 'high',
      attributedToB2BClientId: beta.id,
      createdAt: daysAgo(12),
    },
  })
  console.log('  ✓ Additional Users (4)')

  // ── Wallets for new users ─────────────────────────────────────────────────
  const walletAddresses = [
    'bc1qnew1eve0000eur00000000000000000000000001',
    'bc1qnew2eve0000btc00000000000000000000000002',
    '0xEve0000000000000000000000000000000000000E',
    'bc1qnew3frank000eur00000000000000000000000003',
    'bc1qnew4frank000btc00000000000000000000000004',
    '0xFrank00000000000000000000000000000000000F',
    'bc1qnew5grace000eur00000000000000000000000005',
    'bc1qnew6grace000btc00000000000000000000000006',
    '0xGrace0000000000000000000000000000000000G0',
    'bc1qnew7henry000eur00000000000000000000000007',
    'bc1qnew8henry000btc00000000000000000000000008',
    '0xHenry0000000000000000000000000000000000H0',
  ]
  const newUserWallets: { userId: string; currency: string; address: string; balance: number }[] = [
    { userId: eve.id, currency: 'EUR', address: walletAddresses[0]!, balance: 2340.5 },
    { userId: eve.id, currency: 'BTC', address: walletAddresses[1]!, balance: 0.12 },
    { userId: eve.id, currency: 'ETH', address: walletAddresses[2]!, balance: 0.85 },
    { userId: frank.id, currency: 'EUR', address: walletAddresses[3]!, balance: 4100.0 },
    { userId: frank.id, currency: 'BTC', address: walletAddresses[4]!, balance: 0.045 },
    { userId: frank.id, currency: 'ETH', address: walletAddresses[5]!, balance: 1.3 },
    { userId: grace.id, currency: 'EUR', address: walletAddresses[6]!, balance: 950.75 },
    { userId: grace.id, currency: 'BTC', address: walletAddresses[7]!, balance: 0.008 },
    { userId: grace.id, currency: 'ETH', address: walletAddresses[8]!, balance: 0.22 },
    { userId: henry.id, currency: 'EUR', address: walletAddresses[9]!, balance: 3600.0 },
    { userId: henry.id, currency: 'BTC', address: walletAddresses[10]!, balance: 0.31 },
    { userId: henry.id, currency: 'ETH', address: walletAddresses[11]!, balance: 1.75 },
  ]
  for (const w of newUserWallets) {
    await prisma.wallet.create({ data: w })
  }
  console.log('  ✓ Additional Wallets (12)')

  // ── Additional Transactions (BE-005) ─────────────────────────────────────
  const tx5 = await prisma.transaction.create({
    data: {
      userId: eve.id,
      b2bClientId: acme.id,
      type: 'fiat_to_crypto',
      sourceCurrency: 'EUR',
      targetCurrency: 'BTC',
      sourceAmount: 800,
      targetAmount: 0.008,
      status: 'completed',
      riskScore: 12,
      riskDecision: 'approved',
      createdAt: daysAgo(20),
      updatedAt: daysAgo(20),
    },
  })
  const tx6 = await prisma.transaction.create({
    data: {
      userId: eve.id,
      b2bClientId: acme.id,
      type: 'fiat_to_crypto',
      sourceCurrency: 'EUR',
      targetCurrency: 'ETH',
      sourceAmount: 300,
      targetAmount: 0.12,
      status: 'completed',
      riskScore: 10,
      riskDecision: 'approved',
      createdAt: daysAgo(17),
      updatedAt: daysAgo(17),
    },
  })
  const tx7 = await prisma.transaction.create({
    data: {
      userId: frank.id,
      b2bClientId: acme.id,
      type: 'crypto_to_fiat',
      sourceCurrency: 'BTC',
      targetCurrency: 'EUR',
      sourceAmount: 0.02,
      targetAmount: 1800,
      status: 'completed',
      riskScore: 35,
      riskDecision: 'approved',
      createdAt: daysAgo(15),
      updatedAt: daysAgo(15),
    },
  })
  const tx8 = await prisma.transaction.create({
    data: {
      userId: frank.id,
      b2bClientId: acme.id,
      type: 'crypto_to_fiat',
      sourceCurrency: 'ETH',
      targetCurrency: 'EUR',
      sourceAmount: 0.4,
      targetAmount: 950,
      status: 'completed',
      riskScore: 28,
      riskDecision: 'approved',
      createdAt: daysAgo(12),
      updatedAt: daysAgo(12),
    },
  })
  const tx9 = await prisma.transaction.create({
    data: {
      userId: alice.id,
      b2bClientId: acme.id,
      type: 'fiat_to_crypto',
      sourceCurrency: 'EUR',
      targetCurrency: 'BTC',
      sourceAmount: 1200,
      targetAmount: 0.012,
      status: 'completed',
      riskScore: 18,
      riskDecision: 'approved',
      createdAt: daysAgo(9),
      updatedAt: daysAgo(9),
    },
  })
  const tx10 = await prisma.transaction.create({
    data: {
      userId: dave.id,
      b2bClientId: beta.id,
      type: 'crypto_to_fiat',
      sourceCurrency: 'BTC',
      targetCurrency: 'EUR',
      sourceAmount: 0.05,
      targetAmount: 4500,
      status: 'completed',
      riskScore: 55,
      riskDecision: 'approved',
      createdAt: daysAgo(8),
      updatedAt: daysAgo(8),
    },
  })
  // Pending transactions
  const tx11 = await prisma.transaction.create({
    data: {
      userId: eve.id,
      b2bClientId: acme.id,
      type: 'fiat_to_crypto',
      sourceCurrency: 'EUR',
      targetCurrency: 'ETH',
      sourceAmount: 500,
      targetAmount: 0.2,
      status: 'pending',
      riskScore: 20,
      riskDecision: 'pending',
      createdAt: daysAgo(2),
      updatedAt: daysAgo(2),
    },
  })
  const tx12 = await prisma.transaction.create({
    data: {
      userId: alice.id,
      b2bClientId: acme.id,
      type: 'fiat_to_crypto',
      sourceCurrency: 'EUR',
      targetCurrency: 'BTC',
      sourceAmount: 750,
      targetAmount: 0.0075,
      status: 'pending',
      riskScore: 15,
      riskDecision: 'pending',
      createdAt: daysAgo(1),
      updatedAt: daysAgo(1),
    },
  })
  // Failed transactions
  const tx13 = await prisma.transaction.create({
    data: {
      userId: frank.id,
      b2bClientId: acme.id,
      type: 'fiat_to_crypto',
      sourceCurrency: 'EUR',
      targetCurrency: 'BTC',
      sourceAmount: 2000,
      targetAmount: 0.02,
      status: 'failed',
      riskScore: 85,
      riskDecision: 'rejected',
      failureReason: 'Risk threshold exceeded',
      createdAt: daysAgo(5),
      updatedAt: daysAgo(5),
    },
  })
  const tx14 = await prisma.transaction.create({
    data: {
      userId: dave.id,
      b2bClientId: beta.id,
      type: 'fiat_to_crypto',
      sourceCurrency: 'EUR',
      targetCurrency: 'ETH',
      sourceAmount: 3000,
      targetAmount: 1.2,
      status: 'failed',
      riskScore: 90,
      riskDecision: 'rejected',
      failureReason: 'Compliance check failed',
      createdAt: daysAgo(4),
      updatedAt: daysAgo(4),
    },
  })
  console.log('  ✓ Additional Transactions (10)')

  // ── Additional Partner Commissions (BE-005) ────────────────────────────────
  const additionalCommissions = [
    { b2bClientId: acme.id, transactionId: tx5.id, amount: 800 * 0.15, currency: 'EUR', status: 'accrued' },
    { b2bClientId: acme.id, transactionId: tx6.id, amount: 300 * 0.15, currency: 'EUR', status: 'settled' },
    { b2bClientId: acme.id, transactionId: tx7.id, amount: 0.02 * 0.15, currency: 'BTC', status: 'settled' },
    { b2bClientId: acme.id, transactionId: tx8.id, amount: 0.4 * 0.15, currency: 'ETH', status: 'accrued' },
    { b2bClientId: acme.id, transactionId: tx9.id, amount: 1200 * 0.15, currency: 'EUR', status: 'settled' },
    { b2bClientId: beta.id, transactionId: tx10.id, amount: 0.05 * 0.10, currency: 'BTC', status: 'accrued' },
    { b2bClientId: beta.id, transactionId: tx4.id, amount: 5000 * 0.10, currency: 'EUR', status: 'pending' },
    { b2bClientId: acme.id, transactionId: tx5.id, amount: 800 * 0.025, currency: 'EUR', status: 'settled' },
  ]
  for (const c of additionalCommissions) {
    await prisma.partnerCommission.create({ data: c })
  }
  console.log('  ✓ Additional Partner Commissions (8)')

  // ── Additional System Events (BE-005) ─────────────────────────────────────
  const additionalEvents = [
    { correlationId: `corr-${tx5.id}`, eventName: 'TRANSACTION_CREATED', entityType: 'transaction', entityId: tx5.id, source: 'consumer-app', target: 'backend', status: 'completed', payload: { transactionId: tx5.id }, createdAt: daysAgo(20) },
    { correlationId: `corr-${tx5.id}`, eventName: 'TRANSACTION_COMPLETED', entityType: 'transaction', entityId: tx5.id, source: 'ledger', target: 'backend', status: 'completed', payload: { transactionId: tx5.id }, createdAt: daysAgo(20) },
    { correlationId: `corr-kyc-${eve.id}`, eventName: 'KYC_SUBMITTED', entityType: 'user', entityId: eve.id, source: 'consumer-app', target: 'kyc-simulator', status: 'completed', payload: { userId: eve.id }, createdAt: daysAgo(22) },
    { correlationId: `corr-kyc-${eve.id}`, eventName: 'KYC_APPROVED', entityType: 'user', entityId: eve.id, source: 'kyc-simulator', target: 'backend', status: 'completed', payload: { userId: eve.id }, createdAt: daysAgo(21) },
    { correlationId: `corr-kyc-${frank.id}`, eventName: 'KYC_SUBMITTED', entityType: 'user', entityId: frank.id, source: 'consumer-app', target: 'kyc-simulator', status: 'processing', payload: { userId: frank.id }, createdAt: daysAgo(18) },
    { correlationId: `corr-kyc-${grace.id}`, eventName: 'KYC_SUBMITTED', entityType: 'user', entityId: grace.id, source: 'consumer-app', target: 'kyc-simulator', status: 'processing', payload: { userId: grace.id }, createdAt: daysAgo(15) },
    { correlationId: `corr-kyc-${carol.id}`, eventName: 'KYC_REJECTED', entityType: 'user', entityId: carol.id, source: 'kyc-simulator', target: 'backend', status: 'completed', payload: { userId: carol.id, reason: 'Document verification failed' }, createdAt: daysAgo(18) },
    { correlationId: `corr-market-1`, eventName: 'MARKET_PRICE_UPDATED', entityType: 'market', entityId: 'BTC', source: 'market-feed', target: 'backend', status: 'completed', payload: { currency: 'BTC', price: 98000 }, createdAt: daysAgo(1) },
    { correlationId: `corr-market-2`, eventName: 'MARKET_PRICE_UPDATED', entityType: 'market', entityId: 'ETH', source: 'market-feed', target: 'backend', status: 'completed', payload: { currency: 'ETH', price: 2450 }, createdAt: daysAgo(1) },
    { correlationId: `corr-bank-${alice.id}`, eventName: 'BANK_ACCOUNT_CREATED', entityType: 'user', entityId: alice.id, source: 'bank-simulator', target: 'backend', status: 'completed', payload: { userId: alice.id }, createdAt: daysAgo(29) },
    { correlationId: `corr-tx11`, eventName: 'TRANSACTION_CREATED', entityType: 'transaction', entityId: tx11.id, source: 'consumer-app', target: 'backend', status: 'processing', payload: { transactionId: tx11.id }, createdAt: daysAgo(2) },
    { correlationId: `corr-tx12`, eventName: 'TRANSACTION_CREATED', entityType: 'transaction', entityId: tx12.id, source: 'consumer-app', target: 'backend', status: 'processing', payload: { transactionId: tx12.id }, createdAt: daysAgo(1) },
    { correlationId: `corr-tx13`, eventName: 'TRANSACTION_CREATED', entityType: 'transaction', entityId: tx13.id, source: 'consumer-app', target: 'risk-engine', status: 'failed', payload: { transactionId: tx13.id }, createdAt: daysAgo(5) },
    { correlationId: `corr-market-3`, eventName: 'MARKET_PRICE_UPDATED', entityType: 'market', entityId: 'BTC', source: 'market-feed', target: 'backend', status: 'completed', payload: { currency: 'BTC', price: 97500 }, createdAt: daysAgo(2) },
    { correlationId: `corr-kyc-${henry.id}`, eventName: 'KYC_REJECTED', entityType: 'user', entityId: henry.id, source: 'kyc-simulator', target: 'backend', status: 'completed', payload: { userId: henry.id, reason: 'High risk profile' }, createdAt: daysAgo(10) },
  ]
  for (const e of additionalEvents) {
    await evCreate(e.correlationId, e.eventName, e.entityType, e.entityId, e.source, e.target, e.status, e.payload, e.createdAt)
  }
  console.log('  ✓ Additional System Events (15)')

  // ── Additional KYC Applicants (BE-005) ────────────────────────────────────
  await prisma.kYCApplicant.create({
    data: {
      userId: eve.id,
      status: 'approved',
      levelName: 'basic-kyc-level',
      firstName: 'Eve',
      lastName: 'Davis',
      dateOfBirth: '1993-04-20',
      country: 'FR',
      documentType: 'PASSPORT',
      documentStatus: 'approved',
      reviewedAt: daysAgo(21),
    },
  })
  await prisma.kYCApplicant.create({
    data: {
      userId: frank.id,
      status: 'manual_review',
      levelName: 'standard-kyc-level',
      firstName: 'Frank',
      lastName: 'Miller',
      dateOfBirth: '1987-09-12',
      country: 'TR',
      documentType: 'ID_CARD',
      documentStatus: 'manual_review',
    },
  })
  await prisma.kYCApplicant.create({
    data: {
      userId: grace.id,
      status: 'pending',
      levelName: 'basic-kyc-level',
      firstName: 'Grace',
      lastName: 'Taylor',
      dateOfBirth: '1995-02-28',
      country: 'DE',
      documentType: 'PASSPORT',
      documentStatus: 'pending',
    },
  })
  console.log('  ✓ Additional KYC Applicants (3)')

  // ── Notifications for Alice (NTF-001) ─────────────────────────────────────
  await prisma.notification.createMany({
    data: [
      {
        userId: alice.id,
        channel: 'in_app',
        type: 'kyc_approved',
        title: 'Identity Verified',
        body: 'Your KYC has been approved. You can now buy and sell crypto.',
        urgency: 'success',
        actionUrl: '/kyc',
        isRead: false,
      },
      {
        userId: alice.id,
        channel: 'in_app',
        type: 'transaction_completed',
        title: 'Transaction Complete',
        body: 'You received 0.00858 BTC for €500.',
        urgency: 'info',
        actionUrl: '/transactions',
        isRead: true,
      },
      {
        userId: alice.id,
        channel: 'email',
        type: 'kyc_approved',
        title: 'Your account is verified',
        body: 'Congratulations! Your Prodigy identity verification is complete.',
        urgency: 'success',
        isRead: false,
      },
      {
        userId: alice.id,
        channel: 'in_app',
        type: 'welcome',
        title: 'Welcome to Prodigy',
        body: 'Buy, sell, and send crypto in seconds.',
        urgency: 'info',
        isRead: true,
      },
      {
        userId: alice.id,
        channel: 'email',
        type: 'transaction_receipt',
        title: 'Transaction Receipt #tx1',
        body: 'Your purchase of 0.00858 BTC for €500 is complete. Platform fee: €12.50.',
        urgency: 'info',
        isRead: false,
      },
    ],
  })
  console.log('  ✓ Notifications for Alice (5)')

  // ── Beneficiaries ────────────────────────────────────────────────────────────
  await prisma.beneficiary.createMany({
    data: [
      {
        userId: alice.id,
        name: 'Bob Nakamura',
        email: 'bob@demo.com',
        type: 'risely',
        currency: 'EUR',
        isPersonal: false,
      },
      {
        userId: alice.id,
        name: 'External EUR Account',
        type: 'fiat_external',
        iban: 'DE89370400440532013000',
        bic: 'COBADEFFXXX',
        currency: 'EUR',
        isPersonal: false,
      },
    ],
  })
  console.log('  ✓ Beneficiaries (2)')

  // ── Summary ──────────────────────────────────────────────────────────────
  const counts = await Promise.all([
    prisma.kYCLevel.count(),
    prisma.countryRisk.count(),
    prisma.currency.count(),
    prisma.b2BClient.count(),
    prisma.widgetConfig.count(),
    prisma.user.count(),
    prisma.kYCApplicant.count(),
    prisma.bankAccount.count(),
    prisma.wallet.count(),
    prisma.ledgerAccount.count(),
    prisma.transaction.count(),
    prisma.ledgerEntry.count(),
    prisma.riskReview.count(),
    prisma.partnerCommission.count(),
    prisma.systemEvent.count(),
    prisma.notification.count(),
  ])

  console.log('\n📊 Seed summary:')
  const labels = [
    'KYC Levels',
    'Country Risk',
    'Currencies',
    'B2B Clients',
    'Widget Configs',
    'Users',
    'KYC Applicants',
    'Bank Accounts',
    'Wallets',
    'Ledger Accounts',
    'Transactions',
    'Ledger Entries',
    'Risk Reviews',
    'Partner Commissions',
    'System Events',
    'Notifications',
  ]
  labels.forEach((label, i) => console.log(`   ${label}: ${counts[i]}`))
  console.log('\n✅ Seed complete')
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
