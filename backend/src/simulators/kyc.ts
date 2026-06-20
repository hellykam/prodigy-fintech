import { nanoid } from 'nanoid'
import { db } from '../db.js'
import { eventBus, makeEvent } from './events.js'
import { createBankAccount } from './bank.js'

export interface CreateApplicantInput {
  userId: string
  firstName: string
  lastName: string
  dateOfBirth: string
  country: string
  documentType?: string
}

export async function createApplicant(input: CreateApplicantInput, correlationId: string) {
  const applicant = await db.kYCApplicant.create({
    data: {
      userId: input.userId,
      status: 'not_started',
      levelName: 'basic-kyc-level',
      firstName: input.firstName,
      lastName: input.lastName,
      dateOfBirth: input.dateOfBirth,
      country: input.country,
      documentType: input.documentType ?? null,
    },
  })

  eventBus.emit(makeEvent({
    id: `evt_${nanoid(10)}`,
    correlationId,
    eventName: 'KYC_APPLICANT_CREATED',
    entityType: 'kycApplicant',
    entityId: applicant.id,
    source: 'kyc-simulator',
    target: 'database',
    status: 'completed',
    payload: { userId: input.userId },
  }))

  return applicant
}

export async function submitApplicant(applicantId: string, correlationId: string) {
  const applicant = await db.kYCApplicant.update({
    where: { id: applicantId },
    data: { status: 'pending', documentStatus: 'submitted' },
  })

  await db.user.update({ where: { id: applicant.userId }, data: { kycStatus: 'pending' } })

  eventBus.emit(makeEvent({
    id: `evt_${nanoid(10)}`,
    correlationId,
    eventName: 'KYC_SUBMITTED',
    entityType: 'kycApplicant',
    entityId: applicantId,
    source: 'consumer-app',
    target: 'kyc-simulator',
    status: 'processing',
    payload: { userId: applicant.userId },
  }))

  return applicant
}

export async function approveApplicant(applicantId: string, reviewedBy: string, correlationId: string) {
  const applicant = await db.kYCApplicant.update({
    where: { id: applicantId },
    data: { status: 'approved', documentStatus: 'approved', reviewedBy, reviewedAt: new Date() },
  })

  await db.user.update({ where: { id: applicant.userId }, data: { kycStatus: 'approved' } })

  // Provision a EUR bank account on first approval if none exists
  const existing = await db.bankAccount.findFirst({ where: { userId: applicant.userId, currency: 'EUR' } })
  if (!existing) {
    await createBankAccount(applicant.userId, 'EUR', correlationId)
  }

  eventBus.emit(makeEvent({
    id: `evt_${nanoid(10)}`,
    correlationId,
    eventName: 'KYC_APPROVED',
    entityType: 'kycApplicant',
    entityId: applicantId,
    source: 'kyc-simulator',
    target: 'consumer-app',
    status: 'completed',
    payload: { userId: applicant.userId, reviewedBy },
  }))

  return applicant
}

export async function rejectApplicant(
  applicantId: string,
  reason: string,
  reviewedBy: string,
  correlationId: string,
) {
  const applicant = await db.kYCApplicant.update({
    where: { id: applicantId },
    data: {
      status: 'rejected',
      documentStatus: 'rejected',
      rejectionReason: reason,
      reviewedBy,
      reviewedAt: new Date(),
    },
  })

  await db.user.update({ where: { id: applicant.userId }, data: { kycStatus: 'rejected' } })

  eventBus.emit(makeEvent({
    id: `evt_${nanoid(10)}`,
    correlationId,
    eventName: 'KYC_REJECTED',
    entityType: 'kycApplicant',
    entityId: applicantId,
    source: 'kyc-simulator',
    target: 'consumer-app',
    status: 'rejected',
    payload: { userId: applicant.userId, reason, reviewedBy },
  }))

  return applicant
}

export async function requestManualReview(applicantId: string, correlationId: string) {
  const applicant = await db.kYCApplicant.update({
    where: { id: applicantId },
    data: { status: 'manual_review' },
  })

  await db.user.update({ where: { id: applicant.userId }, data: { kycStatus: 'manual_review' } })

  eventBus.emit(makeEvent({
    id: `evt_${nanoid(10)}`,
    correlationId,
    eventName: 'KYC_MANUAL_REVIEW_REQUESTED',
    entityType: 'kycApplicant',
    entityId: applicantId,
    source: 'kyc-simulator',
    target: 'admin',
    status: 'waiting',
    payload: { userId: applicant.userId },
  }))

  return applicant
}

export function initKyc() {
  console.log('[kyc] simulator ready')
}
