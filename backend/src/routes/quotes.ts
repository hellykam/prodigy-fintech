import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { db } from '../db.js'
import { createQuote, acceptQuote } from '../simulators/quotes.js'

const CreateQuoteBody = z.object({
  userId: z.string().optional(),
  b2bClientId: z.string().optional(),
  sourceCurrency: z.string(),
  targetCurrency: z.string(),
  sourceAmount: z.number().positive(),
})

export async function quotesRoutes(app: FastifyInstance) {
  app.post('/api/quotes', async (req, reply) => {
    const parsed = CreateQuoteBody.safeParse(req.body)
    if (!parsed.success) return reply.status(400).send({ error: 'invalid_input', details: parsed.error.issues })

    try {
      const quote = await createQuote(parsed.data)
      return reply.status(201).send(quote)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'unknown_error'
      return reply.status(422).send({ error: message })
    }
  })

  app.get<{ Params: { id: string } }>('/api/quotes/:id', async (req, reply) => {
    const quote = await db.quote.findUnique({ where: { id: req.params.id } })
    if (!quote) return reply.status(404).send({ error: 'not_found' })
    return quote
  })

  app.post<{ Params: { id: string } }>('/api/quotes/:id/accept', async (req, reply) => {
    const result = await acceptQuote(req.params.id)
    if (!result.ok) return reply.status(422).send({ error: result.reason })
    return { ok: true }
  })
}
