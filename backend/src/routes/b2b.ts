import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { db } from '../db.js'

const ListB2BClientsQuery = z.object({
  status: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50),
  offset: z.coerce.number().int().min(0).default(0),
})

const ListPartnerCommissionsQuery = z.object({
  b2bClientId: z.string().optional(),
  status: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50),
  offset: z.coerce.number().int().min(0).default(0),
})

const ListWidgetConfigsQuery = z.object({
  b2bClientId: z.string().optional(),
})

export async function b2bRoutes(app: FastifyInstance) {
  // GET /api/b2b-clients
  app.get('/api/b2b-clients', async (req, reply) => {
    const parsed = ListB2BClientsQuery.safeParse(req.query)
    if (!parsed.success) return reply.status(400).send({ error: 'invalid_query' })
    const { status, limit, offset } = parsed.data

    const where = status ? { status } : {}

    const [items, total] = await Promise.all([
      db.b2BClient.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
        include: {
          _count: { select: { widgetConfigs: true } },
        },
      }),
      db.b2BClient.count({ where }),
    ])

    return { items, total, limit, offset }
  })

  // GET /api/b2b-clients/:id
  app.get<{ Params: { id: string } }>('/api/b2b-clients/:id', async (req, reply) => {
    const client = await db.b2BClient.findUnique({
      where: { id: req.params.id },
      include: { widgetConfigs: true },
    })
    if (!client) return reply.status(404).send({ error: 'not_found' })
    return client
  })

  // GET /api/partner-commissions
  app.get('/api/partner-commissions', async (req, reply) => {
    const parsed = ListPartnerCommissionsQuery.safeParse(req.query)
    if (!parsed.success) return reply.status(400).send({ error: 'invalid_query' })
    const { b2bClientId, status, limit, offset } = parsed.data

    const where = {
      ...(b2bClientId ? { b2bClientId } : {}),
      ...(status ? { status } : {}),
    }

    const [items, total] = await Promise.all([
      db.partnerCommission.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
        include: {
          transaction: {
            select: {
              id: true,
              sourceCurrency: true,
              sourceAmount: true,
              targetCurrency: true,
              status: true,
            },
          },
        },
      }),
      db.partnerCommission.count({ where }),
    ])

    return { items, total, limit, offset }
  })

  // GET /api/widget-configs
  app.get('/api/widget-configs', async (req, reply) => {
    const parsed = ListWidgetConfigsQuery.safeParse(req.query)
    if (!parsed.success) return reply.status(400).send({ error: 'invalid_query' })
    const { b2bClientId } = parsed.data

    const where = b2bClientId ? { b2bClientId } : {}

    const items = await db.widgetConfig.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    return { items }
  })

  // GET /api/widget-configs/:id
  app.get<{ Params: { id: string } }>('/api/widget-configs/:id', async (req, reply) => {
    const config = await db.widgetConfig.findUnique({
      where: { id: req.params.id },
      include: { b2bClient: true },
    })
    if (!config) return reply.status(404).send({ error: 'not_found' })
    return config
  })
}
