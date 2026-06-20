import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { nanoid } from 'nanoid'
import { db } from '../db.js'
import { eventBus, makeEvent } from '../simulators/events.js'

// ── NOTE ──────────────────────────────────────────────────────────────────────
// POST /api/auth/login is already handled in routes/users.ts.
// This file adds POST /api/auth/register only.
// ─────────────────────────────────────────────────────────────────────────────

const RegisterBody = z.object({
  email: z.string().email(),
  password: z.string().min(4),
})

function generateWalletAddress(currency: string, userId: string, index: number): string {
  const seed = `${currency}-${userId}-${index}`
  const hash = seed.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  if (currency === 'BTC') {
    return `bc1q${hash.toString(16).padStart(38, '0').slice(0, 38)}`
  }
  if (currency === 'ETH') {
    return `0x${hash.toString(16).padStart(40, '0').slice(0, 40)}`
  }
  // USDT (ERC-20 — same format as ETH)
  return `0x${(hash + 1).toString(16).padStart(40, '0').slice(0, 40)}`
}

export async function authRoutes(app: FastifyInstance) {
  // POST /api/auth/register
  app.post('/api/auth/register', async (req, reply) => {
    const parsed = RegisterBody.safeParse(req.body)
    if (!parsed.success) return reply.status(400).send({ error: 'invalid_input', details: parsed.error.flatten() })

    const { email, password } = parsed.data

    // Check uniqueness
    const existing = await db.user.findUnique({ where: { email } })
    if (existing) return reply.status(409).send({ error: 'email_already_exists' })

    // Create user — store password as-is (demo only, no real hashing needed)
    const user = await db.user.create({
      data: {
        email,
        passwordHash: password,
        status: 'active',
        kycStatus: 'not_started',
      },
    })

    const correlationId = user.id

    // Create 3 wallets (BTC, ETH, USDT)
    const walletCurrencies = ['BTC', 'ETH', 'USDT'] as const
    const wallets = await Promise.all(
      walletCurrencies.map((currency, i) =>
        db.wallet.create({
          data: {
            userId: user.id,
            currency,
            address: generateWalletAddress(currency, user.id, i),
            balance: 0,
            status: 'active',
          },
        }),
      ),
    )

    // Emit registration event
    eventBus.emit(
      makeEvent({
        id: `evt_${nanoid(10)}`,
        correlationId,
        eventName: 'USER_SIGNED_UP',
        entityType: 'user',
        entityId: user.id,
        source: 'consumer-app',
        target: 'database',
        status: 'completed',
        payload: { email: user.email },
      }),
    )

    const { passwordHash: _, ...safeUser } = user
    return reply.status(201).send({
      user: {
        ...safeUser,
        wallets,
      },
    })
  })
}
