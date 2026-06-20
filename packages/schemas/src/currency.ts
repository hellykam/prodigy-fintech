import { z } from 'zod'

export const CurrencyTypeSchema = z.enum(['fiat', 'crypto'])

export const CurrencySchema = z.object({
  code: z.string().min(2).max(10),
  type: CurrencyTypeSchema,
  name: z.string(),
  symbol: z.string(),
  decimals: z.number().int().min(0).max(18),
  isActive: z.boolean(),
})

export type Currency = z.infer<typeof CurrencySchema>
