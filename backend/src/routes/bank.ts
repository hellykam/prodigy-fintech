import type { FastifyInstance } from 'fastify'
import { VIRTUAL_BANK } from '../simulators/bank.js'

export async function bankRoutes(app: FastifyInstance) {
  // Returns VIRTUAL_BANK config for display in consumer app
  app.get('/api/bank/config', async (_req, _reply) => {
    return VIRTUAL_BANK
  })
}
