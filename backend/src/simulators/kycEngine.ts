import { nanoid } from 'nanoid'
import { db } from '../db.js'
import { eventBus, makeEvent } from './events.js'

export class CountryBlockedError extends Error {
  constructor(public countryCode: string) {
    super(`Services not available in ${countryCode}`)
  }
}

export interface LevelDecision {
  levelId: string
  levelName: string
  steps: string[]
  reason: string
  countryRisk: string
  isBlocked: false
}

export interface BlockedDecision {
  isBlocked: true
  countryCode: string
  reason: string
}

export async function determineLevel(
  userId: string,
  countryCode: string,
  correlationId: string,
): Promise<LevelDecision> {
  const countryRisk = await db.countryRisk.findUnique({ where: { countryCode } })

  if (!countryRisk) {
    // Unknown country → treat as medium risk / standard level
    const level = await db.kYCLevel.findUnique({ where: { id: 'standard-kyc-level' } })
    return {
      levelId: 'standard-kyc-level',
      levelName: level?.name ?? 'Standard',
      steps: JSON.parse(level?.steps ?? '[]') as string[],
      reason: 'Unknown country — defaulting to standard verification',
      countryRisk: 'medium',
      isBlocked: false,
    }
  }

  if (countryRisk.isBlocked) {
    eventBus.emit(
      makeEvent({
        id: `evt_${nanoid(10)}`,
        correlationId,
        eventName: 'KYC_COUNTRY_BLOCKED',
        entityType: 'kycApplicant',
        entityId: userId,
        source: 'kyc-engine',
        target: 'consumer-app',
        status: 'rejected',
        payload: { countryCode, userId },
      }),
    )
    throw new CountryBlockedError(countryCode)
  }

  const levelId = countryRisk.requiredLevel ?? 'basic-kyc-level'
  const level = await db.kYCLevel.findUnique({ where: { id: levelId } })

  if (!level) throw new Error(`KYC level not found: ${levelId}`)

  eventBus.emit(
    makeEvent({
      id: `evt_${nanoid(10)}`,
      correlationId,
      eventName: 'KYC_LEVEL_DETERMINED',
      entityType: 'kycApplicant',
      entityId: userId,
      source: 'kyc-engine',
      target: 'consumer-app',
      status: 'completed',
      payload: { userId, levelId, countryRisk: countryRisk.riskLevel },
    }),
  )

  return {
    levelId: level.id,
    levelName: level.name,
    steps: JSON.parse(level.steps) as string[],
    reason: `${countryRisk.riskLevel} risk country — ${level.name} verification required`,
    countryRisk: countryRisk.riskLevel,
    isBlocked: false,
  }
}
