import type { FastifyInstance } from 'fastify'
import { db } from '../db.js'
import { getBalance } from '../simulators/ledger.js'

export async function ledgerRoutes(app: FastifyInstance) {
  // Alias: GET /api/ledger → same as /api/ledger/entries
  app.get('/api/ledger', async (req) => {
    const query = req.query as Record<string, string>
    const entries = await db.ledgerEntry.findMany({
      where: query['transactionId'] ? { transactionId: query['transactionId'] } : undefined,
      orderBy: { createdAt: 'desc' },
      take: 200,
      include: { ledgerAccount: true },
    })
    return { entries }
  })

  app.get('/api/ledger/accounts', async () => {
    const accounts = await db.ledgerAccount.findMany({ orderBy: { createdAt: 'desc' } })
    return { accounts }
  })

  app.get<{ Params: { id: string } }>('/api/ledger/accounts/:id', async (req, reply) => {
    const account = await db.ledgerAccount.findUnique({
      where: { id: req.params.id },
      include: { entries: { orderBy: { createdAt: 'desc' } } },
    })
    if (!account) return reply.status(404).send({ error: 'not_found' })
    const balance = await getBalance(req.params.id)
    return { ...account, derivedBalance: balance }
  })

  app.get('/api/ledger/entries', async (req) => {
    const query = req.query as Record<string, string>
    const entries = await db.ledgerEntry.findMany({
      where: query['transactionId'] ? { transactionId: query['transactionId'] } : undefined,
      orderBy: { createdAt: 'desc' },
      take: 200,
      include: { ledgerAccount: true },
    })
    return { entries }
  })
}
