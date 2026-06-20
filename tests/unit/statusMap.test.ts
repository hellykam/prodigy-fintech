import { describe, it, expect } from 'vitest'
import { getStatus, STATUS_MAP } from '../../packages/ui/src/utils/statusMap'

describe('STATUS_MAP', () => {
  it('maps completed → Completed, success variant', () => {
    const result = getStatus('completed')
    expect(result.label).toBe('Completed')
    expect(result.variant).toBe('success')
  })

  it('maps pending → Pending, warning variant', () => {
    const result = getStatus('pending')
    expect(result.label).toBe('Pending')
    expect(result.variant).toBe('warning')
  })

  it('maps manual_review → Manual Review, warning variant', () => {
    const result = getStatus('manual_review')
    expect(result.label).toBe('Manual Review')
    expect(result.variant).toBe('warning')
  })

  it('maps approved → Approved, success variant', () => {
    const result = getStatus('approved')
    expect(result.label).toBe('Approved')
    expect(result.variant).toBe('success')
  })

  it('maps failed → Failed, danger variant', () => {
    const result = getStatus('failed')
    expect(result.label).toBe('Failed')
    expect(result.variant).toBe('danger')
  })

  it('returns neutral for unknown status without throwing', () => {
    const result = getStatus('some_unknown_status_xyz')
    expect(result.variant).toBe('neutral')
    expect(result.label).toBe('some_unknown_status_xyz')
  })

  it('STATUS_MAP has at least 15 entries', () => {
    expect(Object.keys(STATUS_MAP).length).toBeGreaterThanOrEqual(15)
  })
})
