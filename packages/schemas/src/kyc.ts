import { z } from 'zod'

export const KYCApplicantStatusSchema = z.enum([
  'not_started', 'pending', 'approved', 'rejected', 'manual_review'
])

export const KYCApplicantSchema = z.object({
  id: z.string(),
  userId: z.string(),
  status: KYCApplicantStatusSchema,
  levelName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.string(),
  country: z.string(),
  documentType: z.string().nullable(),
  documentStatus: z.string().nullable(),
  rejectionReason: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export type KYCApplicant = z.infer<typeof KYCApplicantSchema>
