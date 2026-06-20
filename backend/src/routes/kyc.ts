import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { db } from '../db.js'
import {
  createApplicant,
  submitApplicant,
  approveApplicant,
  rejectApplicant,
  requestManualReview,
} from '../simulators/kyc.js'
import { determineLevel, CountryBlockedError } from '../simulators/kycEngine.js'
import { eventBus, makeEvent } from '../simulators/events.js'
import { nanoid } from 'nanoid'

const CreateApplicantBody = z.object({
  userId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.string(),
  country: z.string(),
  documentType: z.string().optional(),
  countryCode: z.string().optional(),
})

const ReviewBody = z.object({
  reviewedBy: z.string().default('admin@prodigy.com'),
  reason: z.string().optional(),
})

const UpdateCountryRiskBody = z.object({
  riskLevel: z.enum(['low', 'medium', 'high', 'blocked']),
  requiredLevel: z.string().optional(),
})

const UpgradeLevelBody = z.object({
  levelId: z.string(),
})

const PatchApplicantBody = z.object({
  pepDeclaration: z.boolean().optional(),
  status: z.string().optional(),
})

const DetermineLevelBody = z.object({
  userId: z.string(),
  countryCode: z.string(),
})

export async function kycRoutes(app: FastifyInstance) {
  // ── Existing applicant routes ──────────────────────────────────────────

  app.get('/api/kyc/applicants', async (req) => {
    const query = req.query as Record<string, string>
    const items = await db.kYCApplicant.findMany({
      where: query['status'] ? { status: query['status'] } : undefined,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { email: true } } },
    })
    return { items }
  })

  app.get<{ Params: { id: string } }>('/api/kyc/applicants/:id', async (req, reply) => {
    const applicant = await db.kYCApplicant.findUnique({
      where: { id: req.params.id },
      include: { user: { select: { email: true, kycStatus: true } } },
    })
    if (!applicant) return reply.status(404).send({ error: 'not_found' })
    return applicant
  })

  app.post('/api/kyc/applicants', async (req, reply) => {
    const parsed = CreateApplicantBody.safeParse(req.body)
    if (!parsed.success) return reply.status(400).send({ error: 'invalid_input', details: parsed.error.issues })

    const correlationId = `kyc_${nanoid(8)}`
    const countryCode = parsed.data.countryCode ?? parsed.data.country

    // Check country and determine level before creating the applicant
    let levelDecision
    try {
      levelDecision = await determineLevel(parsed.data.userId, countryCode, correlationId)
    } catch (err) {
      if (err instanceof CountryBlockedError) {
        return reply.status(403).send({
          error: 'country_blocked',
          message: err.message,
          countryCode,
        })
      }
      throw err
    }

    const applicant = await createApplicant(
      {
        userId: parsed.data.userId,
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        dateOfBirth: parsed.data.dateOfBirth,
        country: parsed.data.country,
        documentType: parsed.data.documentType,
      },
      correlationId,
    )

    // Update the applicant with level info
    const updated = await db.kYCApplicant.update({
      where: { id: applicant.id },
      data: {
        levelName: levelDecision.levelId,
        requiredSteps: JSON.stringify(levelDecision.steps),
        countryRisk: levelDecision.countryRisk,
      },
    })

    return reply.status(201).send({ ...updated, levelDecision })
  })

  app.post<{ Params: { id: string } }>('/api/kyc/applicants/:id/submit', async (req, reply) => {
    try {
      const applicant = await submitApplicant(req.params.id, `kyc_${nanoid(8)}`)
      return applicant
    } catch {
      return reply.status(404).send({ error: 'not_found' })
    }
  })

  app.post<{ Params: { id: string } }>('/api/kyc/applicants/:id/approve', async (req, reply) => {
    const parsed = ReviewBody.safeParse(req.body)
    if (!parsed.success) return reply.status(400).send({ error: 'invalid_input' })
    try {
      const applicant = await approveApplicant(req.params.id, parsed.data.reviewedBy, `kyc_${nanoid(8)}`)
      return applicant
    } catch {
      return reply.status(404).send({ error: 'not_found' })
    }
  })

  app.post<{ Params: { id: string } }>('/api/kyc/applicants/:id/reject', async (req, reply) => {
    const parsed = ReviewBody.safeParse(req.body)
    if (!parsed.success) return reply.status(400).send({ error: 'invalid_input' })
    try {
      const applicant = await rejectApplicant(
        req.params.id,
        parsed.data.reason ?? 'document_rejected',
        parsed.data.reviewedBy,
        `kyc_${nanoid(8)}`,
      )
      return applicant
    } catch {
      return reply.status(404).send({ error: 'not_found' })
    }
  })

  app.post<{ Params: { id: string } }>('/api/kyc/applicants/:id/manual-review', async (req, reply) => {
    try {
      const applicant = await requestManualReview(req.params.id, `kyc_${nanoid(8)}`)
      return applicant
    } catch {
      return reply.status(404).send({ error: 'not_found' })
    }
  })

  // ── Patch applicant (pepDeclaration, status) ──────────────────────────

  app.patch<{ Params: { id: string } }>('/api/kyc/applicants/:id', async (req, reply) => {
    const parsed = PatchApplicantBody.safeParse(req.body)
    if (!parsed.success) return reply.status(400).send({ error: 'invalid_input', details: parsed.error.issues })

    const applicant = await db.kYCApplicant.findUnique({ where: { id: req.params.id } })
    if (!applicant) return reply.status(404).send({ error: 'not_found' })

    const updateData: Record<string, unknown> = {}
    if (parsed.data.pepDeclaration !== undefined) updateData['pepDeclaration'] = parsed.data.pepDeclaration
    if (parsed.data.status !== undefined) updateData['status'] = parsed.data.status

    const updated = await db.kYCApplicant.update({
      where: { id: req.params.id },
      data: updateData,
    })

    if (parsed.data.pepDeclaration === true) {
      const correlationId = `kyc_${nanoid(8)}`
      eventBus.emit(
        makeEvent({
          id: `evt_${nanoid(10)}`,
          correlationId,
          eventName: 'KYC_PEP_FLAGGED',
          entityType: 'kycApplicant',
          entityId: req.params.id,
          source: 'admin',
          target: 'compliance',
          status: 'completed',
          payload: { applicantId: req.params.id, pepDeclaration: true },
        }),
      )
    }

    return updated
  })

  // ── KYC Level routes ───────────────────────────────────────────────────

  app.get('/api/kyc/levels', async () => {
    const levels = await db.kYCLevel.findMany({
      where: { isActive: true },
      orderBy: { dailyLimitEur: 'asc' },
    })
    return { levels }
  })

  app.post<{ Params: { id: string } }>('/api/kyc/applicants/:id/upgrade-level', async (req, reply) => {
    const parsed = UpgradeLevelBody.safeParse(req.body)
    if (!parsed.success) return reply.status(400).send({ error: 'invalid_input', details: parsed.error.issues })

    const level = await db.kYCLevel.findUnique({ where: { id: parsed.data.levelId } })
    if (!level) return reply.status(404).send({ error: 'level_not_found' })

    const applicant = await db.kYCApplicant.findUnique({ where: { id: req.params.id } })
    if (!applicant) return reply.status(404).send({ error: 'not_found' })

    const updated = await db.kYCApplicant.update({
      where: { id: req.params.id },
      data: {
        levelName: level.id,
        requiredSteps: level.steps,
      },
    })

    const correlationId = `kyc_${nanoid(8)}`
    eventBus.emit(
      makeEvent({
        id: `evt_${nanoid(10)}`,
        correlationId,
        eventName: 'KYC_LEVEL_UPGRADED',
        entityType: 'kycApplicant',
        entityId: req.params.id,
        source: 'admin',
        target: 'consumer-app',
        status: 'completed',
        payload: { applicantId: req.params.id, levelId: level.id, levelName: level.name },
      }),
    )

    return updated
  })

  // ── Country Risk routes ────────────────────────────────────────────────

  app.get('/api/kyc/country-risk', async (req) => {
    const query = req.query as Record<string, string>
    const countries = await db.countryRisk.findMany({
      where: query['riskLevel'] ? { riskLevel: query['riskLevel'] } : undefined,
      orderBy: { countryCode: 'asc' },
    })
    return { countries }
  })

  app.patch<{ Params: { code: string } }>('/api/kyc/country-risk/:code', async (req, reply) => {
    const parsed = UpdateCountryRiskBody.safeParse(req.body)
    if (!parsed.success) return reply.status(400).send({ error: 'invalid_input', details: parsed.error.issues })

    const existing = await db.countryRisk.findUnique({ where: { countryCode: req.params.code } })
    if (!existing) return reply.status(404).send({ error: 'not_found' })

    const isBlocked = parsed.data.riskLevel === 'blocked'
    const updated = await db.countryRisk.update({
      where: { countryCode: req.params.code },
      data: {
        riskLevel: parsed.data.riskLevel,
        requiredLevel: isBlocked ? null : (parsed.data.requiredLevel ?? existing.requiredLevel),
        isBlocked,
        updatedBy: 'admin',
      },
    })

    const correlationId = `kyc_${nanoid(8)}`
    eventBus.emit(
      makeEvent({
        id: `evt_${nanoid(10)}`,
        correlationId,
        eventName: 'COUNTRY_RISK_UPDATED',
        entityType: 'countryRisk',
        entityId: req.params.code,
        source: 'admin',
        target: 'kyc-engine',
        status: 'completed',
        payload: {
          countryCode: req.params.code,
          riskLevel: parsed.data.riskLevel,
          isBlocked,
        },
      }),
    )

    return updated
  })

  // ── Determine Level endpoint ───────────────────────────────────────────

  app.post('/api/kyc/determine-level', async (req, reply) => {
    const parsed = DetermineLevelBody.safeParse(req.body)
    if (!parsed.success) return reply.status(400).send({ error: 'invalid_input', details: parsed.error.issues })

    const correlationId = `kyc_${nanoid(8)}`
    try {
      const decision = await determineLevel(parsed.data.userId, parsed.data.countryCode, correlationId)
      return decision
    } catch (err) {
      if (err instanceof CountryBlockedError) {
        return reply.status(403).send({
          error: 'country_blocked',
          message: err.message,
          countryCode: parsed.data.countryCode,
          isBlocked: true,
        })
      }
      throw err
    }
  })
}
