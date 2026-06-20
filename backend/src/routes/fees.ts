import type { FastifyInstance } from 'fastify'
import { z } from 'zod'

// ── Types ─────────────────────────────────────────────────────────────────────

interface FeeProfile {
  id: string
  type: string
  name: string
  rate: number
  flatFee: number
  minFee: number
  maxFee: number
  currency: string
  status: string
}

interface Limit {
  id: string
  name: string
  type: string
  currency: string
  perTransactionMax: number
  dailyMax: number
  monthlyMax: number
  status: string
}

// ── Process-level seed data ───────────────────────────────────────────────────

const FEE_PROFILES: FeeProfile[] = [
  { id: 'fee-001', type: 'fiat-send', name: 'Standard EUR Send', rate: 0.005, flatFee: 0.50, minFee: 0.50, maxFee: 25.00, currency: 'EUR', status: 'active' },
  { id: 'fee-002', type: 'fiat-send', name: 'GBP Send', rate: 0.005, flatFee: 0.45, minFee: 0.45, maxFee: 22.00, currency: 'GBP', status: 'active' },
  { id: 'fee-003', type: 'crypto-send', name: 'BTC Withdrawal', rate: 0, flatFee: 0.0005, minFee: 0.0005, maxFee: 0.0005, currency: 'BTC', status: 'active' },
  { id: 'fee-004', type: 'crypto-send', name: 'ETH Withdrawal', rate: 0, flatFee: 0.002, minFee: 0.002, maxFee: 0.002, currency: 'ETH', status: 'active' },
  { id: 'fee-005', type: 'swap', name: 'EUR→BTC Swap', rate: 0.015, flatFee: 0.50, minFee: 1.00, maxFee: 50.00, currency: 'EUR', status: 'active' },
  { id: 'fee-006', type: 'swap', name: 'EUR→ETH Swap', rate: 0.015, flatFee: 0.50, minFee: 1.00, maxFee: 50.00, currency: 'EUR', status: 'active' },
]

const LIMITS: Limit[] = [
  { id: 'lim-001', name: 'Daily send limit', type: 'fiat-send', currency: 'EUR', perTransactionMax: 5000, dailyMax: 10000, monthlyMax: 50000, status: 'active' },
  { id: 'lim-002', name: 'Daily crypto withdrawal', type: 'crypto-send', currency: 'BTC', perTransactionMax: 1.0, dailyMax: 5.0, monthlyMax: 20.0, status: 'active' },
  { id: 'lim-003', name: 'KYC-required threshold', type: 'swap', currency: 'EUR', perTransactionMax: 1000, dailyMax: 5000, monthlyMax: 25000, status: 'active' },
]

// ── Zod schemas ───────────────────────────────────────────────────────────────

const FeesQuery = z.object({
  type: z.enum(['fiat-send', 'crypto-send', 'swap']).optional(),
})

const PatchFeeBody = z.object({
  rate: z.number().min(0).optional(),
  flatFee: z.number().min(0).optional(),
  status: z.string().optional(),
})

const PatchLimitBody = z.object({
  perTransactionMax: z.number().positive().optional(),
  dailyMax: z.number().positive().optional(),
  monthlyMax: z.number().positive().optional(),
  status: z.string().optional(),
})

// ── Routes ────────────────────────────────────────────────────────────────────

export async function feesRoutes(app: FastifyInstance) {
  // GET /api/settings/fees?type=
  app.get('/api/settings/fees', async (req, reply) => {
    const parsed = FeesQuery.safeParse(req.query)
    if (!parsed.success) return reply.status(400).send({ error: 'invalid_query' })
    const { type } = parsed.data

    const items = type ? FEE_PROFILES.filter((f) => f.type === type) : FEE_PROFILES
    return { items }
  })

  // PATCH /api/settings/fees/:id
  app.patch<{ Params: { id: string } }>('/api/settings/fees/:id', async (req, reply) => {
    const fee = FEE_PROFILES.find((f) => f.id === req.params.id)
    if (!fee) return reply.status(404).send({ error: 'not_found' })

    const parsed = PatchFeeBody.safeParse(req.body)
    if (!parsed.success) return reply.status(400).send({ error: 'invalid_input' })

    const { rate, flatFee, status } = parsed.data
    if (rate !== undefined) fee.rate = rate
    if (flatFee !== undefined) fee.flatFee = flatFee
    if (status !== undefined) fee.status = status

    return fee
  })

  // GET /api/settings/limits
  app.get('/api/settings/limits', async (_req, _reply) => {
    return { items: LIMITS }
  })

  // PATCH /api/settings/limits/:id
  app.patch<{ Params: { id: string } }>('/api/settings/limits/:id', async (req, reply) => {
    const limit = LIMITS.find((l) => l.id === req.params.id)
    if (!limit) return reply.status(404).send({ error: 'not_found' })

    const parsed = PatchLimitBody.safeParse(req.body)
    if (!parsed.success) return reply.status(400).send({ error: 'invalid_input' })

    const { perTransactionMax, dailyMax, monthlyMax, status } = parsed.data
    if (perTransactionMax !== undefined) limit.perTransactionMax = perTransactionMax
    if (dailyMax !== undefined) limit.dailyMax = dailyMax
    if (monthlyMax !== undefined) limit.monthlyMax = monthlyMax
    if (status !== undefined) limit.status = status

    return limit
  })
}
