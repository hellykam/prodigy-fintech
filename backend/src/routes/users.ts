import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { db } from '../db.js'
import { eventBus, makeEvent } from '../simulators/events.js'
import { nanoid } from 'nanoid'

// ---------------------------------------------------------------------------
// In-memory notes store
// ---------------------------------------------------------------------------
interface Note {
  id: string
  userId: string
  text: string
  createdBy: string
  createdAt: string
}

const notesStore = new Map<string, Note[]>()

const LoginBody = z.object({
  email: z.string().email(),
  password: z.string(),
})

const ListQuery = z.object({
  kycStatus: z.string().optional(),
  status: z.string().optional(),
  b2bClientId: z.string().optional(),
  search: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50),
  offset: z.coerce.number().int().min(0).default(0),
})

const VALID_PASSWORDS = new Set(['1234', 'admin1234', 'partner1234'])

export async function usersRoutes(app: FastifyInstance) {
  app.post('/api/auth/login', async (req, reply) => {
    const parsed = LoginBody.safeParse(req.body)
    if (!parsed.success) return reply.status(400).send({ error: 'invalid_input' })

    const user = await db.user.findUnique({ where: { email: parsed.data.email } })
    if (!user || !VALID_PASSWORDS.has(parsed.data.password)) {
      return reply.status(401).send({ error: 'invalid_credentials' })
    }

    eventBus.emit(makeEvent({
      id: `evt_${nanoid(10)}`,
      correlationId: user.id,
      eventName: 'USER_LOGGED_IN',
      entityType: 'user',
      entityId: user.id,
      source: 'consumer-app',
      target: 'database',
      status: 'completed',
      payload: { email: user.email },
    }))

    const { passwordHash: _, ...safeUser } = user
    return { user: safeUser }
  })

  app.get('/api/users', async (req, reply) => {
    const parsed = ListQuery.safeParse(req.query)
    if (!parsed.success) return reply.status(400).send({ error: 'invalid_query' })
    const { kycStatus, status, b2bClientId, search, limit, offset } = parsed.data

    const where = {
      ...(kycStatus ? { kycStatus } : {}),
      ...(status ? { status } : {}),
      ...(b2bClientId ? { attributedToB2BClientId: b2bClientId } : {}),
      ...(search ? { email: { contains: search } } : {}),
    }

    const [items, total] = await Promise.all([
      db.user.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
        select: {
          id: true, email: true, status: true, kycStatus: true, riskLevel: true,
          attributedToB2BClientId: true, createdAt: true, updatedAt: true,
        },
      }),
      db.user.count({ where }),
    ])

    return { items, total, limit, offset }
  })

  app.get<{ Params: { id: string } }>('/api/users/:id', async (req, reply) => {
    const user = await db.user.findUnique({
      where: { id: req.params.id },
      include: {
        kycApplicants: true,
        bankAccounts: true,
        wallets: true,
        transactions: { orderBy: { createdAt: 'desc' }, take: 10 },
      },
    })
    if (!user) return reply.status(404).send({ error: 'not_found' })
    const { passwordHash: _, ...safeUser } = user
    return safeUser
  })

  // -------------------------------------------------------------------------
  // GET /api/users/:id/notes
  // -------------------------------------------------------------------------
  app.get<{ Params: { id: string } }>('/api/users/:id/notes', async (req, _reply) => {
    const notes = notesStore.get(req.params.id) ?? []
    return { notes }
  })

  // -------------------------------------------------------------------------
  // POST /api/users/:id/notes
  // -------------------------------------------------------------------------
  const NoteBody = z.object({
    text: z.string().min(1),
    createdBy: z.string().optional(),
  })

  app.post<{ Params: { id: string } }>('/api/users/:id/notes', async (req, reply) => {
    const parsed = NoteBody.safeParse(req.body)
    if (!parsed.success) return reply.status(400).send({ error: 'invalid_input' })

    const { text, createdBy = 'admin@prodigy.io' } = parsed.data
    const note: Note = {
      id: `note_${nanoid(10)}`,
      userId: req.params.id,
      text,
      createdBy,
      createdAt: new Date().toISOString(),
    }

    const existing = notesStore.get(req.params.id) ?? []
    existing.push(note)
    notesStore.set(req.params.id, existing)

    eventBus.emit(makeEvent({
      id: `evt_${nanoid(10)}`,
      correlationId: req.params.id,
      eventName: 'CUSTOMER_NOTE_ADDED',
      entityType: 'user',
      entityId: req.params.id,
      source: 'admin',
      target: 'database',
      status: 'completed',
      payload: { noteId: note.id, createdBy },
    }))

    return reply.status(201).send({ note })
  })

  // -------------------------------------------------------------------------
  // GET /api/customers/:id/activity
  // -------------------------------------------------------------------------
  app.get<{ Params: { id: string } }>('/api/customers/:id/activity', async (req, _reply) => {
    const userId = req.params.id

    // Fetch system events where entityId = userId OR payload contains userId
    const events = await db.systemEvent.findMany({
      where: {
        OR: [
          { entityId: userId },
          { payload: { contains: userId } },
        ],
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    })

    // Mix in any in-memory notes as synthetic events
    const userNotes = notesStore.get(userId) ?? []
    const noteEvents = userNotes.map((n) => ({
      id: n.id,
      eventName: 'NOTE_ADDED',
      source: 'admin',
      target: 'database',
      status: 'completed',
      payload: { noteId: n.id, text: n.text, createdBy: n.createdBy },
      createdAt: n.createdAt,
    }))

    const items = [
      ...events.map((e) => ({
        id: e.id,
        eventName: e.eventName,
        source: e.source,
        target: e.target,
        status: e.status,
        payload: e.payload,
        createdAt: e.createdAt,
      })),
      ...noteEvents,
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return { items }
  })

  // -------------------------------------------------------------------------
  // POST /api/customers/:id/notes
  // -------------------------------------------------------------------------
  const CustomerNoteBody = z.object({ note: z.string().min(1) })

  app.post<{ Params: { id: string } }>('/api/customers/:id/notes', async (req, reply) => {
    const parsed = CustomerNoteBody.safeParse(req.body)
    if (!parsed.success) return reply.status(400).send({ error: 'invalid_input' })

    const note: Note = {
      id: `note_${nanoid(10)}`,
      userId: req.params.id,
      text: parsed.data.note,
      createdBy: 'admin@prodigy.io',
      createdAt: new Date().toISOString(),
    }

    const existing = notesStore.get(req.params.id) ?? []
    existing.push(note)
    notesStore.set(req.params.id, existing)

    return reply.status(201).send({ id: note.id, note: note.text, createdAt: note.createdAt, userId: note.userId })
  })
}
