import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { db } from '../db.js'

const ListRewardsQuery = z.object({
  userId: z.string().optional(),
})

/**
 * Deterministic reward data derived from userId.
 * No Reward model exists in schema — we fabricate consistent data per user.
 */
function deriveReferralCode(userId: string): string {
  const suffix = userId.slice(0, 4).toUpperCase()
  return `PRODIGY-${suffix}`
}

function deriveRewardData(userId: string, email: string, createdAt: Date) {
  // Use char codes of userId for deterministic but varied values
  const seed = userId.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const verifiedReferrals = seed % 5           // 0–4
  const rewardBalance = verifiedReferrals * 10 + 5  // signup bonus always included

  const signupDate = new Date(createdAt)
  const referralDate = new Date(signupDate.getTime() + 1000 * 60 * 60 * 24 * 7) // +7 days

  const history: Array<{
    id: string
    type: string
    amount: number
    currency: string
    description: string
    createdAt: string
  }> = [
    {
      id: `rwd_${userId.slice(0, 8)}_signup`,
      type: 'signup_bonus',
      amount: 5.00,
      currency: 'EUR',
      description: 'Welcome bonus',
      createdAt: signupDate.toISOString(),
    },
  ]

  for (let i = 0; i < verifiedReferrals; i++) {
    const refDate = new Date(referralDate.getTime() + i * 1000 * 60 * 60 * 24 * 3)
    history.push({
      id: `rwd_${userId.slice(0, 8)}_ref${i}`,
      type: 'referral_bonus',
      amount: 10.00,
      currency: 'EUR',
      description: `Referral reward — user${seed + i}@demo.com joined`,
      createdAt: refDate.toISOString(),
    })
  }

  // Most recent first
  history.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return {
    userId,
    referralCode: deriveReferralCode(userId),
    verifiedReferrals,
    rewardBalance,
    currency: 'EUR',
    status: 'active',
    history,
  }
}

export async function rewardsRoutes(app: FastifyInstance) {
  // GET /api/rewards?userId=
  app.get('/api/rewards', async (req, reply) => {
    const parsed = ListRewardsQuery.safeParse(req.query)
    if (!parsed.success) return reply.status(400).send({ error: 'invalid_query' })
    const { userId } = parsed.data

    if (userId) {
      const user = await db.user.findUnique({
        where: { id: userId },
        select: { id: true, email: true, createdAt: true },
      })
      if (!user) return reply.status(404).send({ error: 'not_found' })
      return { items: [deriveRewardData(user.id, user.email, user.createdAt)] }
    }

    // Return rewards for all users
    const users = await db.user.findMany({
      select: { id: true, email: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    })

    const items = users.map((u) => deriveRewardData(u.id, u.email, u.createdAt))
    return { items }
  })
}
