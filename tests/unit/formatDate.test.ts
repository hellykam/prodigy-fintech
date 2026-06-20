import { describe, it, expect } from 'vitest'
import { formatDate, formatDateTime, formatRelative } from '../../packages/ui/src/utils/formatDate'

describe('formatDate', () => {
  it('formats ISO date as "18 Jun 2026" style', () => {
    const result = formatDate('2026-06-18T14:30:00Z')
    expect(result).toMatch(/\d{2}\s\w{3}\s\d{4}/)
    expect(result).toContain('2026')
  })

  it('does not throw on valid ISO string', () => {
    expect(() => formatDate('2026-01-01T00:00:00Z')).not.toThrow()
  })
})

describe('formatDateTime', () => {
  it('includes time in output', () => {
    const result = formatDateTime('2026-06-18T14:32:00Z')
    expect(result).toContain('2026')
    // Should include hours and minutes
    expect(result).toMatch(/\d{2}:\d{2}/)
  })
})

describe('formatRelative', () => {
  it('returns "just now" for recent timestamps', () => {
    const now = new Date().toISOString()
    expect(formatRelative(now)).toBe('just now')
  })

  it('does not throw for old timestamps', () => {
    expect(() => formatRelative('2020-01-01T00:00:00Z')).not.toThrow()
  })
})
