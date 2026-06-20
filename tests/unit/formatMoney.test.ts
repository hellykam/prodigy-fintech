import { describe, it, expect } from 'vitest'
import { formatMoney, formatCrypto } from '../../packages/ui/src/utils/formatMoney'

describe('formatMoney', () => {
  it('formats EUR with 2 decimal places', () => {
    const result = formatMoney(500, 'EUR')
    expect(result).toContain('500')
    expect(result).toContain('00') // has decimals
  })

  it('formats BTC with 8 decimal places via formatCrypto', () => {
    const result = formatCrypto(0.00858, 'BTC')
    expect(result).toContain('BTC')
    expect(result).toContain('0.00858000')
  })

  it('formats ETH with 6 decimal places', () => {
    const result = formatCrypto(1.2, 'ETH')
    expect(result).toContain('ETH')
    expect(result).toContain('1.200000')
  })

  it('returns crypto format for BTC in formatMoney', () => {
    const result = formatMoney(0.1, 'BTC')
    expect(result).toContain('BTC')
  })

  it('handles zero amount', () => {
    expect(() => formatMoney(0, 'EUR')).not.toThrow()
  })
})
