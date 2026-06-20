import Fastify from 'fastify'
import cors from '@fastify/cors'
import websocketPlugin from '@fastify/websocket'
import { healthRoute } from './routes/health.js'
import { marketRoutes } from './routes/market.js'
import { quotesRoutes } from './routes/quotes.js'
import { transactionsRoutes } from './routes/transactions.js'
import { kycRoutes } from './routes/kyc.js'
import { riskRoutes } from './routes/risk.js'
import { usersRoutes } from './routes/users.js'
import { ledgerRoutes } from './routes/ledger.js'
import { systemEventsRoutes } from './routes/system-events.js'
import { b2bRoutes } from './routes/b2b.js'
import { rewardsRoutes } from './routes/rewards.js'
import { liquidityRoutes } from './routes/liquidity.js'
import { feesRoutes } from './routes/fees.js'
import { authRoutes } from './routes/auth.js'
import { bankRoutes } from './routes/bank.js'
import { notificationsRoutes, setupNotificationSubscribers } from './routes/notifications.js'
import { demoRoutes } from './routes/demo.js'
import { beneficiariesRoutes } from './routes/beneficiaries.js'
import { safetyRoutes } from './routes/safety.js'
import { auditRoutes } from './routes/audit.js'
import { adminUsersRoutes } from './routes/admin-users.js'
import { eventBus } from './simulators/events.js'
import { initSimulators } from './simulators/index.js'
import { db } from './db.js'

const app = Fastify({ logger: process.env['NODE_ENV'] !== 'production' })

await app.register(cors, { origin: true })
await app.register(websocketPlugin)

// Routes
await app.register(healthRoute)
await app.register(marketRoutes)
await app.register(quotesRoutes)
await app.register(transactionsRoutes)
await app.register(kycRoutes)
await app.register(riskRoutes)
await app.register(usersRoutes)
await app.register(ledgerRoutes)
await app.register(systemEventsRoutes)
await app.register(b2bRoutes)
await app.register(rewardsRoutes)
await app.register(liquidityRoutes)
await app.register(feesRoutes)
await app.register(authRoutes)
await app.register(bankRoutes)
await app.register(notificationsRoutes)
await app.register(demoRoutes)
await app.register(beneficiariesRoutes)
await app.register(safetyRoutes)
await app.register(auditRoutes)
await app.register(adminUsersRoutes)

// Persist every system event to DB — runs regardless of WS connections
const wsClients = new Set<import('@fastify/websocket').SocketStream>()

eventBus.subscribe(async (event) => {
  await db.systemEvent.create({
    data: {
      id: event.id,
      correlationId: event.correlationId,
      eventName: event.eventName,
      entityType: event.entityType,
      entityId: event.entityId,
      source: event.source,
      target: event.target,
      status: event.status,
      payload: JSON.stringify(event.payload),
    },
  }).catch(() => { /* ignore duplicate id races */ })

  // Broadcast to all connected WebSocket clients
  // Enrich payload with userId when available (entityType=user or payload.userId)
  let userId: string | undefined
  if (event.entityType === 'user') {
    userId = event.entityId
  } else {
    try {
      const p = typeof event.payload === 'string' ? JSON.parse(event.payload) : event.payload
      if (p && typeof p.userId === 'string') userId = p.userId
    } catch { /* ignore */ }
  }
  const broadcastPayload = userId ? { ...event, userId } : event
  const msg = JSON.stringify(broadcastPayload)
  for (const socket of wsClients) {
    if (socket.socket.readyState === 1) socket.socket.send(msg)
  }
})

// Subscribe to key system events and create Notification records
setupNotificationSubscribers(eventBus.subscribe.bind(eventBus))

// WebSocket — clients subscribe for live system events
app.get('/ws', { websocket: true }, (socket) => {
  console.log('[ws] client connected')
  wsClients.add(socket)
  socket.socket.on('close', () => {
    console.log('[ws] client disconnected')
    wsClients.delete(socket)
  })
})

// Start simulators
await initSimulators()

const port = Number(process.env['API_PORT'] ?? 3000)

try {
  await app.listen({ port, host: '0.0.0.0' })
  console.log(`🚀 Prodigy API running at http://localhost:${port}`)
  console.log(`🔌 WebSocket at ws://localhost:${port}/ws`)
} catch (err) {
  app.log.error(err)
  process.exit(1)
}
