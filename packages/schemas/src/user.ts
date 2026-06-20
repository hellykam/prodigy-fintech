import { z } from 'zod'

export const UserStatusSchema = z.enum(['active', 'suspended', 'banned'])
export const KYCStatusSchema = z.enum(['not_started', 'pending', 'approved', 'rejected', 'manual_review'])
export const RiskLevelSchema = z.enum(['low', 'medium', 'high'])

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  status: UserStatusSchema,
  kycStatus: KYCStatusSchema,
  riskLevel: RiskLevelSchema,
  createdAt: z.string().datetime(),
})

export type User = z.infer<typeof UserSchema>
export type UserStatus = z.infer<typeof UserStatusSchema>
export type KYCStatus = z.infer<typeof KYCStatusSchema>
