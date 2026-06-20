import { z } from 'zod'

export const TransactionTypeSchema = z.enum([
  'fiat_to_crypto',
  'crypto_to_fiat',
  'fiat_to_fiat',
  'crypto_to_crypto',
])

export const TransactionStatusSchema = z.enum([
  'created',
  'risk_checking',
  'manual_review',
  'approved',
  'rejected',
  'market_executing',
  'ledger_posting',
  'completed',
  'failed',
])

export const TransactionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  b2bClientId: z.string().nullable(),
  quoteId: z.string().nullable(),
  type: TransactionTypeSchema,
  sourceCurrency: z.string(),
  targetCurrency: z.string(),
  sourceAmount: z.number(),
  targetAmount: z.number(),
  status: TransactionStatusSchema,
  riskScore: z.number().nullable(),
  riskDecision: z.string().nullable(),
  failureReason: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export type Transaction = z.infer<typeof TransactionSchema>
export type TransactionStatus = z.infer<typeof TransactionStatusSchema>
