import { nanoid } from 'nanoid'
import { db } from '../db.js'
import { eventBus, makeEvent } from './events.js'

const RULES = {
  HIGH_AMOUNT_EUR: 5_000,
  VELOCITY_WINDOW_HOURS: 24,
  VELOCITY_MAX_TXN: 3,
  NEW_USER_DAYS: 7,
}

const THRESHOLD_AUTO_REJECT = 70
const THRESHOLD_MANUAL_REVIEW = 40

export interface RiskResult {
  score: number
  reasons: string[]
  decision: 'approved' | 'manual_review' | 'rejected'
}

export async function scoreTransaction(
  transactionId: string,
  userId: string,
  sourceAmount: number,
  sourceCurrency: string,
  correlationId: string,
): Promise<RiskResult> {
  eventBus.emit(makeEvent({
    id: `evt_${nanoid(10)}`,
    correlationId,
    eventName: 'TRANSACTION_RISK_CHECK_STARTED',
    entityType: 'transaction',
    entityId: transactionId,
    source: 'risk-engine',
    target: 'database',
    status: 'processing',
    payload: { userId, sourceAmount, sourceCurrency },
  }))

  const user = await db.user.findUniqueOrThrow({ where: { id: userId } })
  const reasons: string[] = []
  let score = 0

  const amountInEur =
    sourceCurrency === 'EUR' ? sourceAmount
    : sourceCurrency === 'USD' ? sourceAmount * 0.92
    : sourceCurrency === 'GBP' ? sourceAmount * 1.17
    : sourceAmount

  if (amountInEur >= RULES.HIGH_AMOUNT_EUR) {
    score += 25
    reasons.push('high_amount')
  }

  const windowStart = new Date(Date.now() - RULES.VELOCITY_WINDOW_HOURS * 3_600_000)
  const recentCount = await db.transaction.count({
    where: { userId, createdAt: { gte: windowStart }, id: { not: transactionId } },
  })
  if (recentCount >= RULES.VELOCITY_MAX_TXN) {
    score += 20
    reasons.push('velocity_exceeded')
  }

  const userAgeDays = (Date.now() - user.createdAt.getTime()) / 86_400_000
  if (userAgeDays < RULES.NEW_USER_DAYS) {
    score += 10
    reasons.push('new_user')
  }

  if (user.riskLevel === 'high') {
    score += 30
    reasons.push('high_risk_user_profile')
  } else if (user.riskLevel === 'medium') {
    score += 10
    reasons.push('medium_risk_user_profile')
  }

  if (user.kycStatus !== 'approved') {
    score += 15
    reasons.push('kyc_not_approved')
  }

  score = Math.min(100, score)

  const decision: RiskResult['decision'] =
    score >= THRESHOLD_AUTO_REJECT ? 'rejected'
    : score >= THRESHOLD_MANUAL_REVIEW ? 'manual_review'
    : 'approved'

  const eventName =
    decision === 'approved' ? 'TRANSACTION_RISK_APPROVED' as const
    : decision === 'manual_review' ? 'TRANSACTION_RISK_REVIEW_REQUIRED' as const
    : 'TRANSACTION_RISK_REJECTED' as const

  const status =
    decision === 'approved' ? 'completed' as const
    : decision === 'manual_review' ? 'waiting' as const
    : 'rejected' as const

  eventBus.emit(makeEvent({
    id: `evt_${nanoid(10)}`,
    correlationId,
    eventName,
    entityType: 'transaction',
    entityId: transactionId,
    source: 'risk-engine',
    target: decision === 'approved' ? 'market-simulator' : 'admin',
    status,
    payload: { score, reasons, decision, userId },
  }))

  return { score, reasons, decision }
}

export async function createManualReview(
  transactionId: string,
  userId: string,
  score: number,
  reasons: string[],
  correlationId: string,
) {
  const review = await db.riskReview.create({
    data: { transactionId, userId, riskScore: score, riskReasons: reasons.join(','), status: 'open' },
  })

  eventBus.emit(makeEvent({
    id: `evt_${nanoid(10)}`,
    correlationId,
    eventName: 'MANUAL_REVIEW_CREATED',
    entityType: 'riskReview',
    entityId: review.id,
    source: 'risk-engine',
    target: 'admin',
    status: 'waiting',
    payload: { transactionId, userId, score, reasons },
  }))

  return review
}

export function initRisk() {
  console.log('[risk] simulator ready')
}
