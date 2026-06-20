import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ThemeIndex from '../src/pages/ThemeIndex.vue'
import SwissNav from '../src/themes/swiss/SwissNav.vue'
import SwissHome from '../src/themes/swiss/pages/SwissHome.vue'
import SwissPricing from '../src/themes/swiss/pages/SwissPricing.vue'
import CryptoHome from '../src/themes/crypto/pages/CryptoHome.vue'
import CryptoPartners from '../src/themes/crypto/pages/CryptoPartners.vue'
import FintechHome from '../src/themes/fintech/pages/FintechHome.vue'
import FintechPartners from '../src/themes/fintech/pages/FintechPartners.vue'

const stubs = {
  RouterLink: { template: '<a><slot /></a>' },
  RouterView: { template: '<div />' },
}

describe('Theme picker (ThemeIndex)', () => {
  it('mounts without errors', () => {
    const w = mount(ThemeIndex, { global: { stubs } })
    expect(w.exists()).toBe(true)
  })

  it('has exactly one h1', () => {
    const w = mount(ThemeIndex, { global: { stubs } })
    expect(w.findAll('h1')).toHaveLength(1)
  })

  it('displays all three theme names', () => {
    const w = mount(ThemeIndex, { global: { stubs } })
    const text = w.text()
    expect(text).toContain('Swiss Editorial')
    expect(text).toContain('Crypto')
    expect(text).toContain('Institutional')
  })

  it('has three theme card CTAs', () => {
    const w = mount(ThemeIndex, { global: { stubs } })
    expect(w.findAll('.card-cta').length).toBe(3)
  })
})

describe('Swiss theme', () => {
  it('SwissNav has main navigation with aria-label', () => {
    const w = mount(SwissNav, { global: { stubs } })
    expect(w.find('nav[aria-label="Main navigation"]').exists()).toBe(true)
  })

  it('SwissNav has at least 3 navigation links', () => {
    const w = mount(SwissNav, { global: { stubs } })
    const links = w.find('nav[aria-label="Main navigation"]').findAll('a')
    expect(links.length).toBeGreaterThanOrEqual(3)
  })

  it('SwissHome mounts and has exactly one h1', () => {
    const w = mount(SwissHome, { global: { stubs } })
    expect(w.findAll('h1')).toHaveLength(1)
  })

  it('SwissPricing mounts and shows fee rate content', () => {
    const w = mount(SwissPricing, { global: { stubs } })
    expect(w.text()).toContain('%')
  })
})

describe('Crypto theme', () => {
  it('CryptoHome mounts without errors', () => {
    const w = mount(CryptoHome, { global: { stubs } })
    expect(w.exists()).toBe(true)
  })

  it('CryptoHome has exactly one h1', () => {
    const w = mount(CryptoHome, { global: { stubs } })
    expect(w.findAll('h1')).toHaveLength(1)
  })

  it('CryptoPartners mounts and contains partner copy', () => {
    const w = mount(CryptoPartners, { global: { stubs } })
    expect(w.text().toLowerCase()).toMatch(/embed|partner|revenue/)
  })
})

describe('Fintech theme', () => {
  it('FintechHome mounts without errors', () => {
    const w = mount(FintechHome, { global: { stubs } })
    expect(w.exists()).toBe(true)
  })

  it('FintechHome has exactly one h1', () => {
    const w = mount(FintechHome, { global: { stubs } })
    expect(w.findAll('h1')).toHaveLength(1)
  })

  it('FintechPartners mounts and contains embed copy', () => {
    const w = mount(FintechPartners, { global: { stubs } })
    expect(w.text().toLowerCase()).toMatch(/embed|partner|integration/)
  })
})

describe('Accessibility', () => {
  it('ThemeIndex has no img without alt text', () => {
    const w = mount(ThemeIndex, { global: { stubs } })
    w.findAll('img').forEach(img => {
      expect(img.attributes('alt')).toBeDefined()
      expect(img.attributes('alt')).not.toBe('')
    })
  })

  it('all three themes have distinct h1 content', () => {
    const swiss = mount(SwissHome, { global: { stubs } }).find('h1').text()
    const crypto = mount(CryptoHome, { global: { stubs } }).find('h1').text()
    const fintech = mount(FintechHome, { global: { stubs } }).find('h1').text()
    expect(swiss).not.toBe(crypto)
    expect(swiss).not.toBe(fintech)
    expect(crypto).not.toBe(fintech)
  })
})
