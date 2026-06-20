import type { FastifyInstance } from 'fastify'
import { db } from '../db.js'

export async function auditRoutes(fastify: FastifyInstance) {
  fastify.get('/api/audit-log', async (req, reply) => {
    const { limit = '50', adminEmail, action, page = '1' } = req.query as Record<string, string>
    const where: Record<string, unknown> = {}
    if (adminEmail) where['adminEmail'] = { contains: adminEmail }
    if (action) where['action'] = action

    const skip = (parseInt(page) - 1) * parseInt(limit)
    const [items, total] = await Promise.all([
      db.adminActionLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: parseInt(limit),
        skip,
      }),
      db.adminActionLog.count({ where }),
    ])
    return reply.send({ items, total })
  })
}

export async function createAuditLog(entry: {
  adminEmail: string
  action: string
  entityType: string
  entityId: string
  before?: unknown
  after?: unknown
}) {
  try {
    await db.adminActionLog.create({
      data: {
        adminEmail: entry.adminEmail,
        action: entry.action,
        entityType: entry.entityType,
        entityId: entry.entityId,
        before: entry.before != null ? JSON.stringify(entry.before) : null,
        after: entry.after != null ? JSON.stringify(entry.after) : null,
      },
    })
  } catch {
    // Silent — don't crash on audit failure
  }
}
