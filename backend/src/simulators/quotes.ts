import { nanoid } from 'nanoid'
import { db } from '../db.js'
import { eventBus, makeEvent } from './events.js'
import { getPrice } from './market.js'

const QUOTE_TTL_SECONDS = 30
const PLATFORM_FEE_PCT = 0.015
const NETWORK_FEE_EUR = 0.5

export interface QuoteRequest {
  userId?: string
  b2bClientId?: string
  sourceCurrency: string
  targetCurrency: string
  sourceAmount: number
}

export async function createQuote(req: QuoteRequest) {
  const correlationId = `quote_${nanoid(8)}`

  const isBuy = !['EUR', 'USD', 'GBP'].includes(req.targetCurrency)
  const cryptoCurrency = isBuy ? req.targetCurrency : req.sourceCurrency

  const priceSnap = getPrice(cryptoCurrency)
  if (!priceSnap) throw new Error(`No price available for ${cryptoCurrency}`)

  const rate = isBuy ? priceSnap.ask : priceSnap.bid

  const platformFeeAmount = req.sourceAmount * PLATFORM_FEE_PCT

  let partnerFeeAmount = 0
  if (req.b2bClientId) {
    const client = await db.b2BClient.findUnique({ where: { id: req.b2bClientId } })
    if (client) {
      partnerFeeAmount = req.sourceAmount * (client.commissionSharePercent / 100)
    }
  }

  const networkFeeAmount = NETWORK_FEE_EUR
  const totalFees = platformFeeAmount + partnerFeeAmount + networkFeeAmount
  const effectiveSourceAmount = req.sourceAmount - totalFees
  const targetAmount = isBuy ? effectiveSourceAmount / rate : effectiveSourceAmount * rate

  const expiresAt = new Date(Date.now() + QUOTE_TTL_SECONDS * 1000)

  const quote = await db.quote.create({
    data: {
      userId: req.userId ?? null,
      b2bClientId: req.b2bClientId ?? null,
      sourceCurrency: req.sourceCurrency,
      targetCurrency: req.targetCurrency,
      sourceAmount: req.sourceAmount,
      targetAmount: Math.max(0, targetAmount),
      rate,
      spread: priceSnap.spreadPct,
      platformFeeAmount,
      partnerFeeAmount,
      networkFeeAmount,
      expiresAt,
      status: 'offered',
    },
  })

  eventBus.emit(makeEvent({
    id: `evt_${nanoid(10)}`,
    correlationId,
    eventName: 'QUOTE_CREATED',
    entityType: 'quote',
    entityId: quote.id,
    source: 'market-simulator',
    target: 'consumer-app',
    status: 'completed',
    payload: {
      sourceCurrency: req.sourceCurrency,
      targetCurrency: req.targetCurrency,
      sourceAmount: req.sourceAmount,
      targetAmount: quote.targetAmount,
      rate,
      expiresAt: expiresAt.toISOString(),
    },
  }))

  return { ...quote, expiresAt: quote.expiresAt.toISOString() }
}

export async function acceptQuote(quoteId: string): Promise<{ ok: boolean; reason?: string }> {
  const quote = await db.quote.findUnique({ where: { id: quoteId } })
  if (!quote) return { ok: false, reason: 'not_found' }
  if (quote.status !== 'offered') return { ok: false, reason: `quote_${quote.status}` }
  if (new Date() > quote.expiresAt) {
    await db.quote.update({ where: { id: quoteId }, data: { status: 'expired' } })
    return { ok: false, reason: 'quote_expired' }
  }

  await db.quote.update({ where: { id: quoteId }, data: { status: 'accepted' } })

  eventBus.emit(makeEvent({
    id: `evt_${nanoid(10)}`,
    correlationId: quoteId,
    eventName: 'QUOTE_ACCEPTED',
    entityType: 'quote',
    entityId: quoteId,
    source: 'consumer-app',
    target: 'market-simulator',
    status: 'processing',
    payload: {},
  }))

  return { ok: true }
}

async function expireStaleQuotes() {
  await db.quote.updateMany({
    where: { status: 'offered', expiresAt: { lt: new Date() } },
    data: { status: 'expired' },
  })
}

export function initQuotes() {
  setInterval(expireStaleQuotes, 10_000)
  console.log('[quotes] simulator ready — TTL 30s, sweep every 10s')
}
