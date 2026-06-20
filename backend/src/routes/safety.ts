import type { FastifyInstance } from 'fastify'

export async function safetyRoutes(fastify: FastifyInstance) {
  const prisma = (fastify as any).prisma

  // GET /api/users/:id/safety-status
  fastify.get('/api/users/:id/safety-status', async (req, reply) => {
    const { id } = req.params as any
    let status = await prisma.safetyStatus.findUnique({ where: { userId: id } })
    if (!status) {
      // Create default record
      status = await prisma.safetyStatus.create({
        data: { userId: id },
      })
    }
    return { status }
  })

  // POST /api/users/:id/set-mpin  { pin: '1234' }
  fastify.post('/api/users/:id/set-mpin', async (req, reply) => {
    const { id } = req.params as any
    const { pin } = req.body as any
    if (!pin || pin.length < 4) return reply.status(400).send({ error: 'PIN must be at least 4 digits' })
    await prisma.safetyStatus.upsert({
      where: { userId: id },
      update: { mpinSet: true },
      create: { userId: id, mpinSet: true },
    })
    return { ok: true }
  })

  // POST /api/users/:id/verify-email
  fastify.post('/api/users/:id/verify-email', async (req, reply) => {
    const { id } = req.params as any
    // Simulate: after 2s, mark verified (in demo we auto-verify)
    await new Promise(r => setTimeout(r, 1500))
    await prisma.safetyStatus.upsert({
      where: { userId: id },
      update: { emailVerified: true },
      create: { userId: id, emailVerified: true },
    })
    return { ok: true, message: 'Email verified' }
  })

  // POST /api/users/:id/verify-phone
  fastify.post('/api/users/:id/verify-phone', async (req, reply) => {
    const { id } = req.params as any
    await new Promise(r => setTimeout(r, 1500))
    await prisma.safetyStatus.upsert({
      where: { userId: id },
      update: { phoneVerified: true },
      create: { userId: id, phoneVerified: true },
    })
    return { ok: true, message: 'Phone verified' }
  })

  // POST /api/deposit/simulate  { userId, amount, currency }
  fastify.post('/api/deposit/simulate', async (req, reply) => {
    const { userId, amount = 500, currency = 'EUR' } = req.body as any
    if (!userId) return reply.status(400).send({ error: 'userId required' })

    // Add balance to EUR wallet
    const wallet = await prisma.wallet.findFirst({ where: { userId, currency } })
    if (!wallet) return reply.status(404).send({ error: 'Wallet not found' })

    await prisma.wallet.update({
      where: { id: wallet.id },
      data: { balance: { increment: amount } },
    })

    // Create a system event
    const eventBus = (fastify as any).eventBus
    if (eventBus?.emit) {
      eventBus.emit('DEPOSIT_RECEIVED', {
        eventName: 'DEPOSIT_RECEIVED',
        payload: { userId, amount, currency },
      })
    }

    return { ok: true, amount, currency }
  })
}
