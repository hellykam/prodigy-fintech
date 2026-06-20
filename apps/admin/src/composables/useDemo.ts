import { ref } from 'vue'
import { apiFetch } from './useApi'

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export type StepStatus = 'pending' | 'running' | 'done' | 'failed'

export type DemoStep = {
  id: string
  label: string
  status: StepStatus
  detail?: string
}

export type ScenarioName =
  | 'buy-flow'
  | 'kyc-approval'
  | 'risk-flagged'
  | 'partner-commission'
  | 'full-journey'

export interface ScenarioDefinition {
  name: ScenarioName
  title: string
  description: string
}

export const scenarios: ScenarioDefinition[] = [
  {
    name: 'buy-flow',
    title: '1. Buy Flow',
    description: 'Full EUR → BTC purchase through all backend services.',
  },
  {
    name: 'kyc-approval',
    title: '2. KYC Approval',
    description: 'Submit and approve Bob\'s KYC application.',
  },
  {
    name: 'risk-flagged',
    title: '3. Risk Flagged Transaction',
    description: 'Dave\'s large transaction triggers risk review.',
  },
  {
    name: 'partner-commission',
    title: '4. Partner Commission',
    description: 'Alice transacts; Acme Corp earns commission.',
  },
  {
    name: 'full-journey',
    title: '5. Full Journey (8 min)',
    description: 'Runs scenarios 1, 2, and 3 back-to-back.',
  },
]

// ── Step definitions per scenario ────────────────────────────────────────────

const BUY_FLOW_STEPS: DemoStep[] = [
  { id: 'fetch-user', label: 'Fetch demo user (alice)', status: 'pending' },
  { id: 'create-quote', label: 'Create quote EUR → BTC', status: 'pending' },
  { id: 'accept-quote', label: 'Accept quote', status: 'pending' },
  { id: 'submit-tx', label: 'Submit transaction', status: 'pending' },
  { id: 'risk-scoring', label: 'Risk scoring', status: 'pending' },
  { id: 'market-execution', label: 'Market execution', status: 'pending' },
  { id: 'ledger-posting', label: 'Ledger posting', status: 'pending' },
  { id: 'poll-completion', label: 'Polling for completion', status: 'pending' },
]

const KYC_APPROVAL_STEPS: DemoStep[] = [
  { id: 'fetch-bob', label: 'Fetch user bob@demo.com', status: 'pending' },
  { id: 'check-applicant', label: 'Check KYC applicant', status: 'pending' },
  { id: 'review-wait', label: 'Compliance team reviewing…', status: 'pending' },
  { id: 'approve-kyc', label: 'Approve KYC applicant', status: 'pending' },
]

const RISK_FLAGGED_STEPS: DemoStep[] = [
  { id: 'fetch-dave', label: 'Fetch user dave@demo.com', status: 'pending' },
  { id: 'create-quote-dave', label: 'Create quote EUR → BTC €5000', status: 'pending' },
  { id: 'accept-quote-dave', label: 'Accept quote', status: 'pending' },
  { id: 'submit-tx-dave', label: 'Submit transaction', status: 'pending' },
  { id: 'risk-flag', label: 'Risk engine flagging transaction…', status: 'pending' },
  { id: 'check-status', label: 'Check transaction risk status', status: 'pending' },
]

const PARTNER_COMMISSION_STEPS: DemoStep[] = [
  { id: 'fetch-alice', label: 'Fetch user alice@demo.com', status: 'pending' },
  { id: 'create-quote-alice', label: 'Create quote EUR → ETH €500', status: 'pending' },
  { id: 'accept-quote-alice', label: 'Accept quote', status: 'pending' },
  { id: 'submit-tx-alice', label: 'Submit transaction (attr. Acme Corp)', status: 'pending' },
  { id: 'commission-wait', label: 'Awaiting commission accrual…', status: 'pending' },
  { id: 'fetch-commission', label: 'Fetch partner commissions (Acme)', status: 'pending' },
]

const FULL_JOURNEY_STEPS: DemoStep[] = [
  ...BUY_FLOW_STEPS.map(s => ({ ...s, id: `fj-${s.id}` })),
  { id: 'fj-pause-1', label: '— Next: KYC Approval —', status: 'pending' },
  ...KYC_APPROVAL_STEPS.map(s => ({ ...s, id: `fj-kyc-${s.id}` })),
  { id: 'fj-pause-2', label: '— Next: Risk Review —', status: 'pending' },
  ...RISK_FLAGGED_STEPS.map(s => ({ ...s, id: `fj-risk-${s.id}` })),
  { id: 'fj-pause-3', label: '— Journey Complete —', status: 'pending' },
]

// ── Interfaces ────────────────────────────────────────────────────────────────

interface User { id: string; email: string; kycStatus?: string; attributedToB2BClientId?: string | null }
interface UsersResponse { items: User[]; total: number }
interface Quote { id: string; rate: number; targetAmount: number }
interface Transaction { id: string; status: string }
interface KYCApplicant { id: string; status: string }
interface KYCApplicantsResponse { applicants: KYCApplicant[] }
interface PartnerCommission { id: string; amount: number; currency: string; status: string }
interface PartnerCommissionsResponse { items: PartnerCommission[]; total: number }

// ── Composable ────────────────────────────────────────────────────────────────

export function useDemo() {
  const selectedScenario = ref<ScenarioName>('buy-flow')
  const steps = ref<DemoStep[]>(BUY_FLOW_STEPS.map(s => ({ ...s })))
  const isRunning = ref(false)
  const lastResetAt = ref<string | null>(null)

  function getInitialSteps(name: ScenarioName): DemoStep[] {
    switch (name) {
      case 'buy-flow': return BUY_FLOW_STEPS.map(s => ({ ...s }))
      case 'kyc-approval': return KYC_APPROVAL_STEPS.map(s => ({ ...s }))
      case 'risk-flagged': return RISK_FLAGGED_STEPS.map(s => ({ ...s }))
      case 'partner-commission': return PARTNER_COMMISSION_STEPS.map(s => ({ ...s }))
      case 'full-journey': return FULL_JOURNEY_STEPS.map(s => ({ ...s }))
    }
  }

  function setStep(id: string, patch: Partial<DemoStep>) {
    const idx = steps.value.findIndex(s => s.id === id)
    if (idx === -1) return
    const cur = steps.value[idx]
    if (!cur) return
    steps.value[idx] = { ...cur, ...patch }
  }

  function markFailed(id: string, detail?: string) {
    setStep(id, { status: 'failed', detail })
  }

  // ── Scenario runners ─────────────────────────────────────────────────────

  async function runBuyFlow(prefix = ''): Promise<void> {
    const fid = (id: string) => prefix ? `${prefix}${id}` : id

    setStep(fid('fetch-user'), { status: 'running' })
    const { items } = await apiFetch<UsersResponse>('/api/users?limit=50')
    const user = items.find(u => u.email === 'alice@demo.com') ?? items[0]
    if (!user) throw new Error('No users found')
    setStep(fid('fetch-user'), { status: 'done', detail: user.email })

    setStep(fid('create-quote'), { status: 'running' })
    const quote = await apiFetch<Quote>('/api/quotes', {
      method: 'POST',
      body: JSON.stringify({ userId: user.id, sourceCurrency: 'EUR', targetCurrency: 'BTC', sourceAmount: 250 }),
    })
    setStep(fid('create-quote'), { status: 'done', detail: `€250 → ${quote.targetAmount} BTC @ ${quote.rate}` })

    setStep(fid('accept-quote'), { status: 'running' })
    await apiFetch(`/api/quotes/${quote.id}/accept`, { method: 'POST' })
    setStep(fid('accept-quote'), { status: 'done', detail: 'Quote locked' })

    setStep(fid('submit-tx'), { status: 'running' })
    const tx = await apiFetch<Transaction>('/api/transactions', {
      method: 'POST',
      body: JSON.stringify({ userId: user.id, quoteId: quote.id }),
    })
    setStep(fid('submit-tx'), { status: 'done', detail: `TX #${tx.id.slice(0, 8)}` })

    setStep(fid('risk-scoring'), { status: 'running', detail: 'Risk engine evaluating...' })
    await sleep(1500)
    setStep(fid('risk-scoring'), { status: 'done', detail: 'Risk engine approved' })

    setStep(fid('market-execution'), { status: 'running', detail: 'Executing on market...' })
    await sleep(1500)
    setStep(fid('market-execution'), { status: 'done', detail: 'Order filled' })

    setStep(fid('ledger-posting'), { status: 'running', detail: 'Recording entries...' })
    await sleep(1000)
    setStep(fid('ledger-posting'), { status: 'done', detail: 'Double-entry posted' })

    setStep(fid('poll-completion'), { status: 'running' })
    const maxAttempts = 30
    let attempts = 0
    let finalStatus = ''
    while (attempts < maxAttempts) {
      await sleep(1000)
      const polled = await apiFetch<Transaction>(`/api/transactions/${tx.id}`)
      finalStatus = polled.status
      if (finalStatus === 'completed' || finalStatus === 'failed') break
      attempts++
    }
    if (finalStatus === 'completed') {
      setStep(fid('poll-completion'), { status: 'done', detail: 'Status: completed' })
    } else {
      setStep(fid('poll-completion'), { status: 'failed', detail: `Status: ${finalStatus}` })
      throw new Error(`Transaction ended with status: ${finalStatus}`)
    }
  }

  async function runKycApproval(prefix = ''): Promise<void> {
    const fid = (id: string) => prefix ? `${prefix}${id}` : id

    setStep(fid('fetch-bob'), { status: 'running' })
    const { items } = await apiFetch<UsersResponse>('/api/users?limit=50')
    const bob = items.find(u => u.email === 'bob@demo.com')
    if (!bob) throw new Error('bob@demo.com not found')
    setStep(fid('fetch-bob'), { status: 'done', detail: bob.email })

    setStep(fid('check-applicant'), { status: 'running' })
    const { applicants } = await apiFetch<KYCApplicantsResponse>('/api/kyc/applicants')
    let applicant = applicants.find(a => {
      // applicants include user; we match via a second call if needed — use what we have
      return false // will create if not found via GET
    })

    // Try to find by looking up applicants for bob
    const { applicants: bobApplicants } = await apiFetch<KYCApplicantsResponse>(`/api/kyc/applicants?userId=${bob.id}`)
    applicant = bobApplicants[0]

    if (!applicant) {
      // Create a new applicant for bob
      const created = await apiFetch<KYCApplicant>('/api/kyc/applicants', {
        method: 'POST',
        body: JSON.stringify({
          userId: bob.id,
          firstName: 'Bob',
          lastName: 'Nakamura',
          dateOfBirth: '1985-03-22',
          country: 'DE',
          countryCode: 'DE',
          documentType: 'ID_CARD',
        }),
      })
      applicant = created
    }
    setStep(fid('check-applicant'), { status: 'done', detail: `Applicant #${applicant.id.slice(0, 8)} — ${applicant.status}` })

    setStep(fid('review-wait'), { status: 'running', detail: 'Compliance team reviewing...' })
    await sleep(2000)
    setStep(fid('review-wait'), { status: 'done', detail: 'Review complete' })

    setStep(fid('approve-kyc'), { status: 'running' })
    const approved = await apiFetch<KYCApplicant>(`/api/kyc/applicants/${applicant.id}/approve`, {
      method: 'POST',
      body: JSON.stringify({ reviewedBy: 'admin@prodigy.com' }),
    })
    setStep(fid('approve-kyc'), { status: 'done', detail: `Status: ${approved.status}` })
  }

  async function runRiskFlagged(prefix = ''): Promise<void> {
    const fid = (id: string) => prefix ? `${prefix}${id}` : id

    setStep(fid('fetch-dave'), { status: 'running' })
    const { items } = await apiFetch<UsersResponse>('/api/users?limit=50')
    const dave = items.find(u => u.email === 'dave@demo.com')
    if (!dave) throw new Error('dave@demo.com not found')
    setStep(fid('fetch-dave'), { status: 'done', detail: dave.email })

    setStep(fid('create-quote-dave'), { status: 'running' })
    const quote = await apiFetch<Quote>('/api/quotes', {
      method: 'POST',
      body: JSON.stringify({ userId: dave.id, sourceCurrency: 'EUR', targetCurrency: 'BTC', sourceAmount: 5000 }),
    })
    setStep(fid('create-quote-dave'), { status: 'done', detail: `€5000 → ${quote.targetAmount} BTC` })

    setStep(fid('accept-quote-dave'), { status: 'running' })
    await apiFetch(`/api/quotes/${quote.id}/accept`, { method: 'POST' })
    setStep(fid('accept-quote-dave'), { status: 'done', detail: 'Quote locked' })

    setStep(fid('submit-tx-dave'), { status: 'running' })
    const tx = await apiFetch<Transaction>('/api/transactions', {
      method: 'POST',
      body: JSON.stringify({ userId: dave.id, quoteId: quote.id }),
    })
    setStep(fid('submit-tx-dave'), { status: 'done', detail: `TX #${tx.id.slice(0, 8)}` })

    setStep(fid('risk-flag'), { status: 'running', detail: 'Risk engine flagging transaction...' })
    await sleep(1500)
    setStep(fid('risk-flag'), { status: 'done', detail: 'High risk score — escalated' })

    setStep(fid('check-status'), { status: 'running' })
    const polled = await apiFetch<Transaction>(`/api/transactions/${tx.id}`)
    setStep(fid('check-status'), {
      status: 'done',
      detail: `Status: ${polled.status} (risk score: high)`,
    })
  }

  async function runPartnerCommission(): Promise<void> {
    setStep('fetch-alice', { status: 'running' })
    const { items } = await apiFetch<UsersResponse>('/api/users?limit=50')
    const alice = items.find(u => u.email === 'alice@demo.com')
    if (!alice) throw new Error('alice@demo.com not found')
    setStep('fetch-alice', { status: 'done', detail: alice.email })

    setStep('create-quote-alice', { status: 'running' })
    const quote = await apiFetch<Quote>('/api/quotes', {
      method: 'POST',
      body: JSON.stringify({ userId: alice.id, sourceCurrency: 'EUR', targetCurrency: 'ETH', sourceAmount: 500 }),
    })
    setStep('create-quote-alice', { status: 'done', detail: `€500 → ${quote.targetAmount} ETH` })

    setStep('accept-quote-alice', { status: 'running' })
    await apiFetch(`/api/quotes/${quote.id}/accept`, { method: 'POST' })
    setStep('accept-quote-alice', { status: 'done', detail: 'Quote locked' })

    setStep('submit-tx-alice', { status: 'running' })
    const tx = await apiFetch<Transaction>('/api/transactions', {
      method: 'POST',
      body: JSON.stringify({ userId: alice.id, quoteId: quote.id }),
    })
    setStep('submit-tx-alice', { status: 'done', detail: `TX #${tx.id.slice(0, 8)} — attr. Acme Corp` })

    setStep('commission-wait', { status: 'running', detail: 'Awaiting commission accrual...' })
    await sleep(1000)
    setStep('commission-wait', { status: 'done', detail: 'Commission accrued' })

    setStep('fetch-commission', { status: 'running' })
    const commissions = await apiFetch<PartnerCommissionsResponse>(
      `/api/partner-commissions?b2bClientId=${alice.attributedToB2BClientId ?? ''}`,
    )
    const count = commissions.total ?? commissions.items.length
    setStep('fetch-commission', { status: 'done', detail: `${count} commissions found for Acme Corp` })
  }

  async function runFullJourney(): Promise<void> {
    // Buy Flow
    await runBuyFlow('fj-')

    // Pause 1
    setStep('fj-pause-1', { status: 'running', detail: 'Next: KYC Approval' })
    await sleep(3000)
    setStep('fj-pause-1', { status: 'done' })

    // KYC Approval
    await runKycApproval('fj-kyc-')

    // Pause 2
    setStep('fj-pause-2', { status: 'running', detail: 'Next: Risk Review' })
    await sleep(3000)
    setStep('fj-pause-2', { status: 'done' })

    // Risk Flagged
    await runRiskFlagged('fj-risk-')

    // Pause 3
    setStep('fj-pause-3', { status: 'running', detail: 'Journey complete!' })
    await sleep(1000)
    setStep('fj-pause-3', { status: 'done' })
  }

  // ── Main run function ─────────────────────────────────────────────────────

  async function runScenario(name: ScenarioName): Promise<void> {
    isRunning.value = true
    steps.value = getInitialSteps(name)

    try {
      switch (name) {
        case 'buy-flow':
          await runBuyFlow()
          break
        case 'kyc-approval':
          await runKycApproval()
          break
        case 'risk-flagged':
          await runRiskFlagged()
          break
        case 'partner-commission':
          await runPartnerCommission()
          break
        case 'full-journey':
          await runFullJourney()
          break
      }
    } catch (err) {
      // Mark currently-running step as failed
      const runningIdx = steps.value.findIndex(s => s.status === 'running')
      if (runningIdx !== -1) {
        const cur = steps.value[runningIdx]
        if (cur) markFailed(cur.id, err instanceof Error ? err.message : 'Unknown error')
      }
    } finally {
      isRunning.value = false
    }
  }

  async function resetDemo(): Promise<void> {
    const res = await apiFetch<{ ok: boolean; resetAt: string }>('/api/demo/reset', { method: 'POST' })
    if (res.ok) {
      lastResetAt.value = res.resetAt
      steps.value = getInitialSteps(selectedScenario.value)
    }
  }

  function selectScenario(name: ScenarioName) {
    if (isRunning.value) return
    selectedScenario.value = name
    steps.value = getInitialSteps(name)
  }

  // Legacy: keep for backward-compat if other parts use it
  const running = isRunning
  const done = ref(false)
  const failed = ref(false)
  const transactionId = ref<string | null>(null)

  async function runDemo(): Promise<void> {
    await runScenario('buy-flow')
  }

  function reset() {
    steps.value = getInitialSteps(selectedScenario.value)
    isRunning.value = false
  }

  return {
    // New API
    selectedScenario,
    scenarios,
    steps,
    isRunning,
    lastResetAt,
    runScenario,
    resetDemo,
    selectScenario,
    // Legacy API (buy-flow compat)
    running,
    done,
    failed,
    transactionId,
    runDemo,
    reset,
  }
}
