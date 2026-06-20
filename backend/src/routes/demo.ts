import type { FastifyInstance } from 'fastify'
import { db } from '../db.js'
import { eventBus, makeEvent } from '../simulators/events.js'
import { nanoid } from 'nanoid'

export async function demoRoutes(app: FastifyInstance) {
  app.post('/api/demo/reset', async (req, reply) => {
    if (process.env['NODE_ENV'] === 'production') {
      return reply.status(403).send({ error: 'Not available in production' })
    }

    // Reset KYC statuses for the 3 named demo users
    const users = await db.user.findMany({
      where: { email: { in: ['alice@demo.com', 'bob@demo.com', 'dave@demo.com'] } },
    })

    for (const user of users) {
      if (user.email === 'alice@demo.com') {
        await db.user.update({ where: { id: user.id }, data: { kycStatus: 'approved' } })
      } else if (user.email === 'bob@demo.com') {
        await db.user.update({ where: { id: user.id }, data: { kycStatus: 'pending' } })
      } else if (user.email === 'dave@demo.com') {
        await db.user.update({ where: { id: user.id }, data: { kycStatus: 'approved' } })
      }
    }

    // Reset KYC applicants for those users
    for (const user of users) {
      const applicant = await db.kYCApplicant.findFirst({ where: { userId: user.id } })
      if (!applicant) continue
      if (user.email === 'alice@demo.com') {
        await db.kYCApplicant.update({ where: { id: applicant.id }, data: { status: 'approved' } })
      } else if (user.email === 'bob@demo.com') {
        await db.kYCApplicant.update({ where: { id: applicant.id }, data: { status: 'pending' } })
      } else if (user.email === 'dave@demo.com') {
        await db.kYCApplicant.update({ where: { id: applicant.id }, data: { status: 'approved' } })
      }
    }

    // Delete transactions created beyond the first 5 seeded ones
    const allTx = await db.transaction.findMany({ orderBy: { createdAt: 'asc' } })
    if (allTx.length > 14) {
      // Keep the 14 seeded transactions, delete any added by demo runs
      const toDelete = allTx.slice(14).map(t => t.id)
      await db.transaction.deleteMany({ where: { id: { in: toDelete } } })
    }

    // Broadcast DEMO_RESET event to all WS clients
    eventBus.emit(
      makeEvent({
        id: `evt_${nanoid(10)}`,
        correlationId: `demo_reset_${nanoid(8)}`,
        eventName: 'DEMO_RESET',
        entityType: 'demo',
        entityId: 'reset',
        source: 'admin',
        target: 'all',
        status: 'completed',
        payload: { resetAt: new Date().toISOString() },
      }),
    )

    const resetAt = new Date().toISOString()
    return { ok: true, resetAt }
  })
}
