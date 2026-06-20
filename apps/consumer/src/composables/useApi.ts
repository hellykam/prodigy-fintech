// Thin API helpers used throughout the app

export interface MarketPrice {
  currency: string
  midPrice: number
  bid: number
  ask: number
  spreadPct: number
  updatedAt: string
}

export interface Quote {
  id: string
  sourceCurrency: string
  targetCurrency: string
  sourceAmount: number
  targetAmount: number
  rate: number
  spread: number
  platformFeeAmount: number
  partnerFeeAmount: number
  networkFeeAmount: number
  expiresAt: string
  status: string
}

export interface Transaction {
  id: string
  userId: string
  quoteId: string
  sourceCurrency: string
  targetCurrency: string
  sourceAmount: number
  targetAmount: number
  rate: number
  platformFeeAmount: number
  networkFeeAmount: number
  status: string
  createdAt: string
  updatedAt: string
  failureReason?: string
  events?: TransactionEvent[]
}

export interface TransactionEvent {
  status: string
  at: string
  note?: string
}

export async function apiFetch<T = any>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.message ?? `HTTP ${res.status}`)
  }
  return res.json()
}

export function fetchMarketPrices(): Promise<MarketPrice[]> {
  return apiFetch<{ prices: MarketPrice[] }>('/api/market/prices').then((r) => r.prices)
}

export function createQuote(payload: {
  sourceCurrency: string
  targetCurrency: string
  sourceAmount: number
  userId?: string
}): Promise<Quote> {
  return apiFetch<Quote>('/api/quotes', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function acceptQuote(id: string): Promise<{ ok: boolean }> {
  return apiFetch<{ ok: boolean }>(`/api/quotes/${id}/accept`, { method: 'POST' })
}

export function createTransaction(payload: {
  userId: string
  quoteId: string
}): Promise<Transaction> {
  return apiFetch<Transaction>('/api/transactions', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function fetchTransaction(id: string): Promise<Transaction> {
  return apiFetch<Transaction>(`/api/transactions/${id}`)
}

export function fetchTransactions(params: {
  userId: string
  status?: string
}): Promise<{ items: Transaction[]; total: number }> {
  const q = new URLSearchParams({ userId: params.userId })
  if (params.status) q.set('status', params.status)
  return apiFetch<{ items: Transaction[]; total: number }>(`/api/transactions?${q}`)
}

export interface LevelDecision {
  levelId: string
  levelName: string
  steps: string[]
  reason: string
  countryRisk: string
  isBlocked: false
}

export interface CountryRiskEntry {
  countryCode: string
  countryName: string
  riskLevel: string
  requiredLevel: string | null
  isBlocked: boolean
  isActive: boolean
}

export function createKycApplicant(payload: {
  userId: string
  firstName: string
  lastName: string
  dateOfBirth: string
  country: string
  documentType?: string
  countryCode?: string
}): Promise<{ id: string; status: string }> {
  return apiFetch<{ id: string; status: string }>('/api/kyc/applicants', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function determineLevelForCountry(payload: {
  userId: string
  countryCode: string
}): Promise<LevelDecision> {
  return apiFetch<LevelDecision>('/api/kyc/determine-level', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function fetchCountryRisk(): Promise<{ countries: CountryRiskEntry[] }> {
  return apiFetch<{ countries: CountryRiskEntry[] }>('/api/kyc/country-risk')
}

export function submitKycApplicant(id: string): Promise<{ ok: boolean }> {
  return apiFetch<{ ok: boolean }>(`/api/kyc/applicants/${id}/submit`, { method: 'POST' })
}

export function fetchUser(id: string): Promise<any> {
  return apiFetch<any>(`/api/users/${id}`)
}

export function registerUser(payload: { email: string; password: string }): Promise<{ user: any }> {
  return apiFetch<{ user: any }>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function fetchRewards(userId: string): Promise<{ items: RewardItem[] }> {
  return apiFetch<{ items: RewardItem[] }>(`/api/rewards?userId=${encodeURIComponent(userId)}`)
}

export interface RewardHistoryEntry {
  id: string
  type: string
  amount: number
  currency: string
  description: string
  createdAt: string
}

export interface RewardItem {
  userId: string
  referralCode: string
  verifiedReferrals: number
  rewardBalance: number
  currency: string
  status: string
  history: RewardHistoryEntry[]
}

export function sendCrypto(payload: {
  userId: string
  currency: string
  amount: number
  recipientAddress: string
}): Promise<{ id: string; status: string }> {
  return apiFetch<{ id: string; status: string }>('/api/transactions/send', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export interface SafetyStatus {
  emailVerified: boolean
  phoneVerified: boolean
  mpinSet: boolean
  biometrics: boolean
  twoFaEnabled: boolean
}

export function fetchSafetyStatus(userId: string): Promise<{ status: SafetyStatus }> {
  return apiFetch<{ status: SafetyStatus }>(`/api/users/${userId}/safety-status`)
}

export function sendVerifyEmail(userId: string): Promise<{ ok: boolean }> {
  return apiFetch<{ ok: boolean }>(`/api/users/${userId}/verify-email`, { method: 'POST' })
}

export function setMpin(userId: string, pin: string): Promise<{ ok: boolean }> {
  return apiFetch<{ ok: boolean }>(`/api/users/${userId}/set-mpin`, {
    method: 'POST',
    body: JSON.stringify({ pin }),
  })
}
