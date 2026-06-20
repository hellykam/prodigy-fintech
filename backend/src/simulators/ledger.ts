import { nanoid } from 'nanoid'
import { db } from '../db.js'
import { eventBus, makeEvent } from './events.js'

export interface LedgerPostingEntry {
  ledgerAccountId: string
  direction: 'debit' | 'credit'
  amount: number
  currency: string
  description: string
}

export async function findOrCreateAccount(
  ownerType: string,
  ownerId: string,
  currency: string,
  accountType: string,
  name: string,
): Promise<string> {
  const existing = await db.ledgerAccount.findFirst({
    where: { ownerType, ownerId, currency, accountType },
  })
  if (existing) return existing.id

  const created = await db.ledgerAccount.create({
    data: { ownerType, ownerId, currency, accountType, name },
  })
  return created.id
}

export async function post(
  transactionId: string,
  entries: LedgerPostingEntry[],
  correlationId: string,
): Promise<void> {
  eventBus.emit(makeEvent({
    id: `evt_${nanoid(10)}`,
    correlationId,
    eventName: 'LEDGER_POSTING_STARTED',
    entityType: 'transaction',
    entityId: transactionId,
    source: 'ledger',
    target: 'database',
    status: 'processing',
    payload: { entryCount: entries.length },
  }))

  await db.ledgerEntry.createMany({
    data: entries.map((e) => ({
      transactionId,
      ledgerAccountId: e.ledgerAccountId,
      direction: e.direction,
      amount: e.amount,
      currency: e.currency,
      description: e.description,
    })),
  })

  eventBus.emit(makeEvent({
    id: `evt_${nanoid(10)}`,
    correlationId,
    eventName: 'LEDGER_POSTED',
    entityType: 'transaction',
    entityId: transactionId,
    source: 'ledger',
    target: 'database',
    status: 'completed',
    payload: { entryCount: entries.length },
  }))
}

export async function getBalance(ledgerAccountId: string): Promise<number> {
  const entries = await db.ledgerEntry.findMany({ where: { ledgerAccountId } })
  return entries.reduce((sum, e) => {
    return e.direction === 'debit' ? sum + e.amount : sum - e.amount
  }, 0)
}

export function initLedger() {
  console.log('[ledger] simulator ready')
}
