import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { nanoid } from 'nanoid'
import { db } from '../db.js'
import { eventBus, makeEvent } from '../simulators/events.js'
import { runMarketAndSettle } from '../simulators/transactions.js'

const DecisionBody = z.object({
  decision: z.enum(['approved', 'rejected']),
  decisionReason: z.string().optional(),
  assignedTo: z.string().optional(),
})

export async function riskRoutes(app: FastifyInstance) {
  app.get('/api/risk-reviews', async (req) => {
    const query = req.query as Record<string, string>
    const reviews = await db.riskReview.findMany({
      where: query['status'] ? { status: query['status'] } : undefined,
      orderBy: { createdAt: 'desc' },
      include: {
        transaction: { include: { user: { select: { email: true } } } },
      },
    })
    return { reviews }
  })

  app.get<{ Params: { id: string } }>('/api/risk-reviews/:id', async (req, reply) => {
    const review = await db.riskReview.findUnique({
      where: { id: req.params.id },
      include: {
        transaction: {
          include: {
            user: { select: { email: true, kycStatus: true, riskLevel: true } },
            ledgerEntries: true,
          },
        },
      },
    })
    if (!review) return reply.status(404).send({ error: 'not_found' })
    return review
  })

  app.post<{ Params: { id: string } }>('/api/risk-reviews/:id/decide', async (req, reply) => {
    const parsed = DecisionBody.safeParse(req.body)
    if (!parsed.success) return reply.status(400).send({ error: 'invalid_input', details: parsed.error.issues })

    const review = await db.riskReview.findUnique({ where: { id: req.params.id } })
    if (!review) return reply.status(404).send({ error: 'not_found' })
    if (review.status !== 'open') return reply.status(422).send({ error: 'review_already_decided' })

    const { decision, decisionReason, assignedTo } = parsed.data

    await db.riskReview.update({
      where: { id: req.params.id },
      data: { status: decision, decision, decisionReason: decisionReason ?? null, assignedTo: assignedTo ?? null },
    })

    const correlationId = review.transactionId

    if (decision === 'approved') {
      await db.transaction.update({ where: { id: review.transactionId }, data: { status: 'approved' } })

      eventBus.emit(makeEvent({
        id: `evt_${nanoid(10)}`,
        correlationId,
        eventName: 'MANUAL_REVIEW_APPROVED',
        entityType: 'riskReview',
        entityId: review.id,
        source: 'admin',
        target: 'market-simulator',
        status: 'processing',
        payload: { transactionId: review.transactionId, decisionReason },
      }))

      setImmediate(() => runMarketAndSettle(review.transactionId, correlationId).catch(console.error))
    } else {
      await db.transaction.update({
        where: { id: review.transactionId },
        data: { status: 'rejected', failureReason: decisionReason ?? 'manual_review_rejected' },
      })

      eventBus.emit(makeEvent({
        id: `evt_${nanoid(10)}`,
        correlationId,
        eventName: 'MANUAL_REVIEW_REJECTED',
        entityType: 'riskReview',
        entityId: review.id,
        source: 'admin',
        target: 'consumer-app',
        status: 'rejected',
        payload: { transactionId: review.transactionId, decisionReason },
      }))
    }

    return { ok: true, decision }
  })
}
