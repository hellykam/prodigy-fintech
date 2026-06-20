import { z } from 'zod'

export const SystemEventStatusSchema = z.enum([
  'processing', 'waiting', 'completed', 'failed', 'rejected'
])

export const SystemEventSchema = z.object({
  id: z.string(),
  correlationId: z.string(),
  eventName: z.string(),
  entityType: z.string(),
  entityId: z.string(),
  source: z.string(),
  target: z.string(),
  status: SystemEventStatusSchema,
  payload: z.record(z.unknown()),
  createdAt: z.string().datetime(),
})

export type SystemEvent = z.infer<typeof SystemEventSchema>
