import { z } from 'zod'

export const QuoteStatusSchema = z.enum(['requested', 'offered', 'accepted', 'expired', 'cancelled'])

export const QuoteSchema = z.object({
  id: z.string(),
  userId: z.string().nullable(),
  b2bClientId: z.string().nullable(),
  sourceCurrency: z.string(),
  targetCurrency: z.string(),
  sourceAmount: z.number(),
  targetAmount: z.number(),
  rate: z.number(),
  spread: z.number(),
  platformFeeAmount: z.number(),
  partnerFeeAmount: z.number(),
  networkFeeAmount: z.number(),
  expiresAt: z.string().datetime(),
  status: QuoteStatusSchema,
  createdAt: z.string().datetime(),
})

export type Quote = z.infer<typeof QuoteSchema>
