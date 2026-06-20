import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { nanoid } from 'nanoid'
import { db } from '../db.js'
import { eventBus, makeEvent } from '../simulators/events.js'
import { processTransaction } from '../simulators/transactions.js'

const CreateTransactionBody = z.object({
  userId: z.string(),
  quoteId: z.string(),
  b2bClientId: z.string().optional(),
})

const SendCryptoBody = z.object({
  userId: z.string(),
  currency: z.string(),
  amount: z.number().positive(),
  recipientAddress: z.string().min(10),
})

const ListQuery = z.object({
  userId: z.string().optional(),
  status: z.string().optional(),
  b2bClientId: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50),
  offset: z.coerce.number().int().min(0).default(0),
})

export async function transactionsRoutes(app: FastifyInstance) {
  app.post('/api/transactions', async (req, reply) => {
    const parsed = CreateTransactionBody.safeParse(req.body)
    if (!parsed.success) return reply.status(400).send({ error: 'invalid_input', details: parsed.error.issues })

    const { userId, quoteId, b2bClientId } = parsed.data

    const quote = await db.quote.findUnique({ where: { id: quoteId } })
    if (!quote) return reply.status(404).send({ error: 'quote_not_found' })
    if (quote.status !== 'accepted') return reply.status(422).send({ error: 'quote_not_accepted' })

    const isBuy = ['BTC', 'ETH', 'USDT'].includes(quote.targetCurrency)
    const type = isBuy ? 'fiat_to_crypto' : 'crypto_to_fiat'

    const txn = await db.transaction.create({
      data: {
        userId,
        b2bClientId: b2bClientId ?? null,
        quoteId,
        type,
        sourceCurrency: quote.sourceCurrency,
        targetCurrency: quote.targetCurrency,
        sourceAmount: quote.sourceAmount,
        targetAmount: quote.targetAmount,
        status: 'created',
      },
    })

    eventBus.emit(makeEvent({
      id: `evt_${nanoid(10)}`,
      correlationId: txn.id,
      eventName: 'TRANSACTION_CREATED',
      entityType: 'transaction',
      entityId: txn.id,
      source: 'consumer-app',
      target: 'risk-engine',
      status: 'processing',
      payload: { userId, sourceCurrency: txn.sourceCurrency, sourceAmount: txn.sourceAmount },
    }))

    setImmediate(() => processTransaction(txn.id).catch(console.error))

    return reply.status(201).send(txn)
  })

  app.get('/api/transactions', async (req, reply) => {
    const parsed = ListQuery.safeParse(req.query)
    if (!parsed.success) return reply.status(400).send({ error: 'invalid_query' })
    const { userId, status, b2bClientId, limit, offset } = parsed.data

    const [items, total] = await Promise.all([
      db.transaction.findMany({
        where: {
          ...(userId ? { userId } : {}),
          ...(status ? { status } : {}),
          ...(b2bClientId ? { b2bClientId } : {}),
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
        include: { user: { select: { email: true } }, riskReviews: true },
      }),
      db.transaction.count({
        where: {
          ...(userId ? { userId } : {}),
          ...(status ? { status } : {}),
          ...(b2bClientId ? { b2bClientId } : {}),
        },
      }),
    ])

    return { items, total, limit, offset }
  })

  app.post('/api/transactions/send', async (req, reply) => {
    const parsed = SendCryptoBody.safeParse(req.body)
    if (!parsed.success) return reply.status(400).send({ error: 'invalid_input', details: parsed.error.issues })
    const { userId, currency, amount, recipientAddress } = parsed.data

    const txn = await db.transaction.create({
      data: {
        userId,
        type: 'crypto_send',
        sourceCurrency: currency,
        targetCurrency: currency,
        sourceAmount: amount,
        targetAmount: amount,
        status: 'processing',
      },
    })

    eventBus.emit(makeEvent({
      id: `evt_${nanoid(10)}`,
      correlationId: txn.id,
      eventName: 'TRANSACTION_CREATED',
      entityType: 'transaction',
      entityId: txn.id,
      source: 'consumer-app',
      target: 'bank-simulator',
      status: 'processing',
      payload: { userId, currency, amount, recipientAddress },
    }))

    // Simulate completion after a short delay
    setTimeout(async () => {
      await db.transaction.update({ where: { id: txn.id }, data: { status: 'completed' } })
      eventBus.emit(makeEvent({
        id: `evt_${nanoid(10)}`,
        correlationId: txn.id,
        eventName: 'TRANSACTION_COMPLETED',
        entityType: 'transaction',
        entityId: txn.id,
        source: 'bank-simulator',
        target: 'consumer-app',
        status: 'completed',
        payload: { userId, currency, amount },
      }))
    }, 1500)

    return reply.status(201).send(txn)
  })

  app.get<{ Params: { id: string } }>('/api/transactions/:id', async (req, reply) => {
    const txn = await db.transaction.findUnique({
      where: { id: req.params.id },
      include: {
        user: { select: { email: true, kycStatus: true } },
        quote: true,
        riskReviews: true,
        ledgerEntries: true,
        partnerCommissions: true,
      },
    })
    if (!txn) return reply.status(404).send({ error: 'not_found' })
    return txn
  })
}
