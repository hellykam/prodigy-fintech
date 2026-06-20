import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { nanoid } from 'nanoid'
import { eventBus, makeEvent } from '../simulators/events.js'

// ── Types ─────────────────────────────────────────────────────────────────────

interface ProviderBalance {
  currency: string
  available: number
  pending: number
  actual: number
}

interface LiquidityProvider {
  id: string
  name: string
  type: string
  status: string
  balances: ProviderBalance[]
  lastUpdated: string
}

// ── Initial state (used for reset) ───────────────────────────────────────────

const INITIAL_STATE: LiquidityProvider[] = [
  {
    id: 'bank-simulator',
    name: 'Prodigy Bank Simulator',
    type: 'bank',
    status: 'operational',
    balances: [
      { currency: 'EUR', available: 500000, pending: 12500, actual: 487500 },
      { currency: 'GBP', available: 250000, pending: 5000, actual: 245000 },
    ],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'market-simulator',
    name: 'Market Simulator',
    type: 'exchange',
    status: 'operational',
    balances: [
      { currency: 'BTC', available: 10.5, pending: 0.2, actual: 10.3 },
      { currency: 'ETH', available: 150.0, pending: 3.5, actual: 146.5 },
      { currency: 'USDT', available: 250000, pending: 1500, actual: 248500 },
    ],
    lastUpdated: new Date().toISOString(),
  },
]

// ── Process-level singleton state (deep clone so mutations don't touch INITIAL_STATE) ──

function deepClone<T>(val: T): T {
  return JSON.parse(JSON.stringify(val))
}

let liquidityState: LiquidityProvider[] = deepClone(INITIAL_STATE)

function now(): string {
  return new Date().toISOString()
}

function getProvider(id: string): LiquidityProvider | undefined {
  return liquidityState.find((p) => p.id === id)
}

function getBalance(provider: LiquidityProvider, currency: string): ProviderBalance | undefined {
  return provider.balances.find((b) => b.currency === currency)
}

// ── Zod schemas ───────────────────────────────────────────────────────────────

const SimulateBody = z.object({
  action: z.enum(['low_balance', 'offline', 'recovery', 'high_volume', 'reset']),
})

// ── Emit helper ───────────────────────────────────────────────────────────────

function emitLiquidityChanged(correlationId: string) {
  eventBus.emit(
    makeEvent({
      id: `evt_${nanoid(10)}`,
      correlationId,
      eventName: 'LIQUIDITY_STATE_CHANGED',
      entityType: 'liquidityProvider',
      entityId: 'all',
      source: 'bank-simulator',
      target: 'admin',
      status: 'completed',
      payload: { providers: deepClone(liquidityState) },
    }),
  )
}

// ── Routes ────────────────────────────────────────────────────────────────────

export async function liquidityRoutes(app: FastifyInstance) {
  // GET /api/liquidity
  app.get('/api/liquidity', async (_req, _reply) => {
    return { providers: liquidityState }
  })

  // POST /api/liquidity/simulate
  app.post('/api/liquidity/simulate', async (req, reply) => {
    const parsed = SimulateBody.safeParse(req.body)
    if (!parsed.success) return reply.status(400).send({ error: 'invalid_input' })
    const { action } = parsed.data

    const correlationId = `sim_${nanoid(8)}`

    switch (action) {
      case 'low_balance': {
        const bank = getProvider('bank-simulator')
        if (bank) {
          const eur = getBalance(bank, 'EUR')
          if (eur) {
            eur.available = 1000
            eur.actual = eur.available - eur.pending
          }
          bank.lastUpdated = now()
        }
        break
      }
      case 'offline': {
        const market = getProvider('market-simulator')
        if (market) {
          market.status = 'offline'
          market.lastUpdated = now()
        }
        break
      }
      case 'recovery': {
        const initial = deepClone(INITIAL_STATE)
        liquidityState = initial.map((p) => ({ ...p, lastUpdated: now() }))
        break
      }
      case 'high_volume': {
        const bank = getProvider('bank-simulator')
        if (bank) {
          const eur = getBalance(bank, 'EUR')
          if (eur) {
            eur.pending = 95000
            eur.available = 450000
            eur.actual = eur.available - eur.pending
          }
          bank.lastUpdated = now()
        }
        break
      }
      case 'reset': {
        liquidityState = deepClone(INITIAL_STATE).map((p) => ({ ...p, lastUpdated: now() }))
        break
      }
    }

    emitLiquidityChanged(correlationId)
    return { ok: true, providers: liquidityState }
  })
}
