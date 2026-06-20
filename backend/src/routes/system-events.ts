import type { FastifyInstance } from 'fastify'
import { db } from '../db.js'

export async function systemEventsRoutes(app: FastifyInstance) {
  app.get('/api/system-events', async (req) => {
    const query = req.query as Record<string, string>
    const where: Record<string, string> = {}
    if (query['correlationId']) where['correlationId'] = query['correlationId']
    if (query['entityId']) where['entityId'] = query['entityId']
    const events = await db.systemEvent.findMany({
      where: Object.keys(where).length > 0 ? where : undefined,
      orderBy: { createdAt: 'desc' },
      take: 200,
    })
    return { events }
  })
}
