import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { db } from '../db.js'
import type { SystemEvent } from '@prodigy/types'

const ListNotificationsQuery = z.object({
  userId: z.string().optional(),
  channel: z.string().optional(),
  isRead: z
    .string()
    .optional()
    .transform((v) => (v === 'true' ? true : v === 'false' ? false : undefined)),
})

export async function notificationsRoutes(app: FastifyInstance) {
  // GET /api/notifications
  app.get('/api/notifications', async (req, reply) => {
    const parsed = ListNotificationsQuery.safeParse(req.query)
    if (!parsed.success) return reply.status(400).send({ error: 'invalid_query' })
    const { userId, channel, isRead } = parsed.data

    const where = {
      ...(userId ? { userId } : {}),
      ...(channel ? { channel } : {}),
      ...(isRead !== undefined ? { isRead } : {}),
    }

    const items = await db.notification.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    return { items }
  })

  // GET /api/notifications/unread-count
  app.get('/api/notifications/unread-count', async (req, reply) => {
    const { userId } = req.query as { userId?: string }
    if (!userId) return { count: 0 }
    const count = await db.notification.count({
      where: { userId, isRead: false },
    })
    return { count }
  })

  // POST /api/notifications/:id/read
  app.post<{ Params: { id: string } }>('/api/notifications/:id/read', async (req, reply) => {
    const notification = await db.notification.findUnique({ where: { id: req.params.id } })
    if (!notification) return reply.status(404).send({ error: 'not_found' })

    const updated = await db.notification.update({
      where: { id: req.params.id },
      data: { isRead: true, readAt: new Date() },
    })
    return updated
  })

  // POST /api/notifications/read-all
  const ReadAllBody = z.object({ userId: z.string() })

  app.post('/api/notifications/read-all', async (req, reply) => {
    const parsed = ReadAllBody.safeParse(req.body)
    if (!parsed.success) return reply.status(400).send({ error: 'invalid_input' })

    const { userId } = parsed.data
    const result = await db.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true, readAt: new Date() },
    })
    return { updated: result.count }
  })
}

// ---------------------------------------------------------------------------
// Notification subscribers — call once on server startup
// ---------------------------------------------------------------------------
export function setupNotificationSubscribers(
  subscribe: (fn: (event: SystemEvent) => void) => () => void,
): void {
  subscribe(async (event) => {
    const p = event.payload

    switch (event.eventName) {
      // 1. KYC approved
      case 'KYC_APPROVED': {
        const userId = typeof p['userId'] === 'string' ? p['userId'] : undefined
        if (!userId) break
        await db.notification.create({
          data: {
            userId,
            type: 'kyc_accepted',
            title: 'Identity verified',
            body: 'Your KYC has been approved. You can now buy, sell, and send.',
            channel: 'in_app',
            urgency: 'info',
          },
        }).catch(() => {})
        break
      }

      // 2. KYC rejected
      case 'KYC_REJECTED': {
        const userId = typeof p['userId'] === 'string' ? p['userId'] : undefined
        if (!userId) break
        await db.notification.create({
          data: {
            userId,
            type: 'kyc_rejected',
            title: 'Action required: KYC failed',
            body: 'Your identity verification failed. Please retry with clearer documents.',
            channel: 'in_app',
            urgency: 'error',
          },
        }).catch(() => {})
        break
      }

      // 3. Transaction completed
      case 'TRANSACTION_COMPLETED': {
        const userId = typeof p['userId'] === 'string' ? p['userId'] : undefined
        if (!userId) break
        const sourceAmount = p['sourceAmount']
        const sourceCurrency = p['sourceCurrency']
        const targetAmount = typeof p['targetAmount'] === 'number' ? p['targetAmount'].toFixed(6) : '?'
        const targetCurrency = p['targetCurrency']
        await db.notification.create({
          data: {
            userId,
            type: 'transfer_between',
            title: 'Transaction complete',
            body: `${sourceAmount} ${sourceCurrency} converted to ${targetAmount} ${targetCurrency}`,
            channel: 'in_app',
            urgency: 'info',
          },
        }).catch(() => {})
        break
      }

      // 4. Transaction failed — payload has no userId; look up via entityId (transactionId)
      case 'TRANSACTION_FAILED': {
        const txn = await db.transaction.findUnique({
          where: { id: event.entityId },
          select: { userId: true, sourceAmount: true, sourceCurrency: true },
        }).catch(() => null)
        if (!txn?.userId) break
        await db.notification.create({
          data: {
            userId: txn.userId,
            type: 'transfer_failed',
            title: 'Transaction failed',
            body: `Your transfer of ${txn.sourceAmount} ${txn.sourceCurrency} could not be processed.`,
            channel: 'in_app',
            urgency: 'warning',
          },
        }).catch(() => {})
        break
      }

      // 5. Bank account / wallet created
      case 'BANK_ACCOUNT_CREATED': {
        const userId = typeof p['userId'] === 'string' ? p['userId'] : undefined
        const currency = typeof p['currency'] === 'string' ? p['currency'] : 'account'
        if (!userId) break
        await db.notification.create({
          data: {
            userId,
            type: 'account_opened',
            title: `${currency} wallet ready`,
            body: `Your ${currency} account has been opened and is ready to use.`,
            channel: 'in_app',
            urgency: 'info',
          },
        }).catch(() => {})
        break
      }

      default:
        break
    }
  })
}
