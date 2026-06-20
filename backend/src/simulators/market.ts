import { nanoid } from 'nanoid'
import { eventBus, makeEvent } from './events.js'

const BASE_PRICES: Record<string, number> = {
  BTC: 65_000,
  ETH: 3_200,
  USDT: 0.92,
}

const SPREAD_PCT = 0.5

export interface PriceSnapshot {
  currency: string
  midPrice: number
  bid: number
  ask: number
  spreadPct: number
  updatedAt: string
}

export interface OrderResult {
  success: boolean
  executedPrice: number
  executedAmount: number
  failureReason?: string
}

const prices = new Map<string, PriceSnapshot>()

function randomWalk(current: number): number {
  const delta = current * 0.003 * (Math.random() * 2 - 1)
  return Math.max(0.01, current + delta)
}

function makeSnapshot(currency: string, mid: number): PriceSnapshot {
  const half = mid * (SPREAD_PCT / 100) * 0.5
  return {
    currency,
    midPrice: mid,
    bid: mid - half,
    ask: mid + half,
    spreadPct: SPREAD_PCT,
    updatedAt: new Date().toISOString(),
  }
}

function tick() {
  for (const [currency, snap] of prices) {
    const updated = makeSnapshot(currency, randomWalk(snap.midPrice))
    prices.set(currency, updated)

    eventBus.emit(makeEvent({
      id: `evt_${nanoid(10)}`,
      correlationId: `mkt_${nanoid(8)}`,
      eventName: 'MARKET_PRICE_UPDATED',
      entityType: 'currency',
      entityId: currency,
      source: 'market-simulator',
      target: 'consumer-app',
      status: 'completed',
      payload: { currency, midPrice: updated.midPrice, bid: updated.bid, ask: updated.ask },
    }))
  }
}

export function getPrice(currency: string): PriceSnapshot | null {
  return prices.get(currency) ?? null
}

export function getAllPrices(): PriceSnapshot[] {
  return Array.from(prices.values())
}

// side='buy': sourceAmount is fiat → returns crypto; side='sell': sourceAmount is crypto → returns fiat
export function executeOrder(
  currency: string,
  sourceAmount: number,
  side: 'buy' | 'sell',
): OrderResult {
  const snap = prices.get(currency)
  if (!snap) {
    return { success: false, executedPrice: 0, executedAmount: 0, failureReason: 'unknown_currency' }
  }
  if (Math.random() < 0.05) {
    return { success: false, executedPrice: 0, executedAmount: 0, failureReason: 'market_unavailable' }
  }
  const executedPrice = side === 'buy' ? snap.ask : snap.bid
  const executedAmount = side === 'buy' ? sourceAmount / executedPrice : sourceAmount * executedPrice
  return { success: true, executedPrice, executedAmount }
}

let priceInterval: ReturnType<typeof setInterval> | null = null

export function initMarket() {
  for (const [currency, base] of Object.entries(BASE_PRICES)) {
    prices.set(currency, makeSnapshot(currency, base))
  }
  priceInterval = setInterval(tick, 3_000)
  console.log('[market] started — BTC/ETH/USDT ticking every 3s')
}

export function stopMarket() {
  if (priceInterval) clearInterval(priceInterval)
}
