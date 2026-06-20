import type { FastifyInstance } from 'fastify'

export async function adminUsersRoutes(fastify: FastifyInstance) {
  const prisma = (fastify as any).prisma

  // Seed default admin users if none exist
  async function ensureAdminUsers() {
    const count = await prisma.adminUser.count()
    if (count === 0) {
      await prisma.adminUser.createMany({
        data: [
          { email: 'admin@prodigy.com', name: 'Super Admin', role: 'admin' },
          { email: 'compliance@prodigy.com', name: 'Compliance Officer', role: 'compliance' },
          { email: 'support@prodigy.com', name: 'Support Agent', role: 'support' },
        ],
      })
    }
  }
  await ensureAdminUsers()

  fastify.get('/api/admin/users', async (req) => {
    const { role } = req.query as any
    const where = role ? { role } : {}
    const items = await prisma.adminUser.findMany({ where, orderBy: { createdAt: 'desc' } })
    return { items }
  })

  fastify.post('/api/admin/users', async (req, reply) => {
    const { email, name, role = 'support' } = req.body as any
    if (!email || !name) return reply.status(400).send({ error: 'email and name required' })
    const item = await prisma.adminUser.create({ data: { email, name, role } })
    return { item }
  })

  fastify.patch('/api/admin/users/:id', async (req, reply) => {
    const { id } = req.params as any
    const updates = req.body as any
    const item = await prisma.adminUser.update({
      where: { id },
      data: updates,
    })
    return { item }
  })

  fastify.delete('/api/admin/users/:id', async (req) => {
    const { id } = req.params as any
    await prisma.adminUser.delete({ where: { id } })
    return { ok: true }
  })
}
