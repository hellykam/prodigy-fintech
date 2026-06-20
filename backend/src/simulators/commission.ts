import { nanoid } from 'nanoid'
import { db } from '../db.js'
import { eventBus, makeEvent } from './events.js'

export async function accrueCommission(
  transactionId: string,
  b2bClientId: string,
  amount: number,
  currency: string,
  correlationId: string,
) {
  const commission = await db.partnerCommission.create({
    data: { b2bClientId, transactionId, amount, currency, status: 'accrued' },
  })

  eventBus.emit(makeEvent({
    id: `evt_${nanoid(10)}`,
    correlationId,
    eventName: 'PARTNER_COMMISSION_ACCRUED',
    entityType: 'partnerCommission',
    entityId: commission.id,
    source: 'ledger',
    target: 'partner-portal',
    status: 'completed',
    payload: { b2bClientId, transactionId, amount, currency },
  }))

  return commission
}

export function initCommission() {
  console.log('[commission] simulator ready')
}
