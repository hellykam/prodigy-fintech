import type { FastifyInstance } from 'fastify'

export async function beneficiariesRoutes(fastify: FastifyInstance) {
  const prisma = (fastify as any).prisma

  // GET /api/beneficiaries?userId=
  fastify.get('/api/beneficiaries', async (req, reply) => {
    const { userId } = req.query as any
    if (!userId) return reply.status(400).send({ error: 'userId required' })
    const items = await prisma.beneficiary.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })
    return { items }
  })

  // POST /api/beneficiaries
  fastify.post('/api/beneficiaries', async (req, reply) => {
    const body = req.body as any
    if (!body.userId || !body.name || !body.type) {
      return reply.status(400).send({ error: 'userId, name, type required' })
    }
    const item = await prisma.beneficiary.create({ data: body })
    return { item }
  })

  // DELETE /api/beneficiaries/:id
  fastify.delete('/api/beneficiaries/:id', async (req, reply) => {
    const { id } = req.params as any
    await prisma.beneficiary.delete({ where: { id } })
    return { ok: true }
  })
}
