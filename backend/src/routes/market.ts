import type { FastifyInstance } from 'fastify'
import { getAllPrices, getPrice } from '../simulators/market.js'

export async function marketRoutes(app: FastifyInstance) {
  app.get('/api/market/prices', async () => {
    return { prices: getAllPrices() }
  })

  app.get<{ Params: { currency: string } }>('/api/market/prices/:currency', async (req, reply) => {
    const snap = getPrice(req.params.currency.toUpperCase())
    if (!snap) return reply.status(404).send({ error: 'currency_not_found' })
    return snap
  })
}
