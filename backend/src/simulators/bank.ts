import { nanoid } from 'nanoid'
import { db } from '../db.js'
import { eventBus, makeEvent } from './events.js'

export const VIRTUAL_BANK = {
  name: 'Prodigy Bank Simulator',
  legalName: 'Prodigy Financial Services (Demo) B.V.',
  address: 'Strawinskylaan 3105, 1077 ZX Amsterdam, Netherlands',
  regulatoryRef: 'Demo only — not a real regulated entity',
  currencies: {
    EUR: {
      bic: 'PRODDE77XXX',
      ibanCountryPrefix: 'DE',
      sepaEnabled: true,
    },
    GBP: {
      bic: 'PRODGB22XXX',
      ibanCountryPrefix: 'GB',
      sortCodePrefix: '12-34',
      fasterPaymentsEnabled: true,
    },
    USD: {
      bic: 'PRODUSD0XXX',
      ibanCountryPrefix: 'US',
      abaRoutingNumber: '021000021',
      swiftEnabled: true,
    },
  },
} as const

export const PLATFORM_IBANS = {
  EUR: 'GB29PROD00000000000001',
  USD: 'GB29PROD00000000000002',
  GBP: 'GB29PROD00000000000003',
}

export function generateIBAN(currency: string): string {
  if (currency === 'GBP') {
    const check = String(Math.floor(10 + Math.random() * 90))
    const sortSuffix = String(Math.floor(10 + Math.random() * 90))
    const account = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('')
    return `GB${check}PROD1234${sortSuffix}${account}`
  }
  // EUR (DE format) and all others
  const check = String(Math.floor(10 + Math.random() * 90))
  const bankCode = 'PROD0000'
  const account = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('')
  return `DE${check}${bankCode}${account}`
}

export async function createBankAccount(userId: string, currency: string, correlationId: string) {
  const iban = generateIBAN(currency)
  const currencyConfig = VIRTUAL_BANK.currencies[currency as keyof typeof VIRTUAL_BANK.currencies]
  const bic = currencyConfig?.bic ?? 'PRODDE77XXX'

  const account = await db.bankAccount.create({
    data: {
      userId,
      iban,
      currency,
      balance: 0,
      status: 'active',
      bic,
      sortCode: currency === 'GBP' ? `12-34-${String(Math.floor(10 + Math.random() * 90))}` : null,
      accountType: 'current',
      dailyLimitEur: 1000,
      monthlyLimitEur: 5000,
    },
  })

  eventBus.emit(makeEvent({
    id: `evt_${nanoid(10)}`,
    correlationId,
    eventName: 'BANK_ACCOUNT_CREATED',
    entityType: 'bankAccount',
    entityId: account.id,
    source: 'bank-simulator',
    target: 'database',
    status: 'completed',
    payload: { userId, currency, bic, accountType: 'current' },
  }))

  eventBus.emit(makeEvent({
    id: `evt_${nanoid(10)}`,
    correlationId,
    eventName: 'IBAN_ASSIGNED',
    entityType: 'bankAccount',
    entityId: account.id,
    source: 'bank-simulator',
    target: 'consumer-app',
    status: 'completed',
    payload: { iban, currency, bic, accountType: 'current' },
  }))

  return { id: account.id, iban, bic }
}

export async function debitAccount(iban: string, amount: number, correlationId: string) {
  await db.bankAccount.update({ where: { iban }, data: { balance: { decrement: amount } } })
  eventBus.emit(makeEvent({
    id: `evt_${nanoid(10)}`,
    correlationId,
    eventName: 'TRANSACTION_CREATED',
    entityType: 'bankAccount',
    entityId: iban,
    source: 'bank-simulator',
    target: 'ledger',
    status: 'processing',
    payload: { iban, amount, direction: 'debit' },
  }))
}

export async function creditAccount(iban: string, amount: number, correlationId: string) {
  await db.bankAccount.update({ where: { iban }, data: { balance: { increment: amount } } })
  eventBus.emit(makeEvent({
    id: `evt_${nanoid(10)}`,
    correlationId,
    eventName: 'TRANSACTION_COMPLETED',
    entityType: 'bankAccount',
    entityId: iban,
    source: 'bank-simulator',
    target: 'consumer-app',
    status: 'completed',
    payload: { iban, amount, direction: 'credit' },
  }))
}

export function initBank() {
  console.log('[bank] simulator ready')
}
