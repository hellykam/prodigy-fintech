import { onMounted, onUnmounted, ref, computed, type Ref } from 'vue'

export type RevealType = 'fade-up' | 'fade-left' | 'fade-right' | 'scale-in' | 'slide-up-hard'

// ── useScrollReveal ───────────────────────────────────────────────
export function useScrollReveal(options?: {
  type?: RevealType
  threshold?: number
  staggerChildren?: boolean
  staggerDelay?: number
}) {
  const type            = options?.type            ?? 'fade-up'
  const threshold       = options?.threshold       ?? 0.15
  const staggerChildren = options?.staggerChildren ?? false
  const staggerDelay    = options?.staggerDelay    ?? 80

  const isVisible:  Ref<boolean>            = ref(false)
  const revealRef:  Ref<HTMLElement | null> = ref(null)

  // Legacy alias kept for backward compatibility
  const revealed = isVisible
  const el       = revealRef

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const target = revealRef.value
    if (!target) return

    // Set data attributes so CSS handles the animation
    target.setAttribute('data-reveal', type)
    if (staggerChildren) {
      target.setAttribute('data-stagger', String(staggerDelay))
    }

    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          target.classList.add('reveal-active', 'is-visible')
          isVisible.value = true
          observer?.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(target)
  })

  onUnmounted(() => observer?.disconnect())

  return { revealRef, isVisible, el, revealed }
}

// ── useScrollStagger ──────────────────────────────────────────────
// Applies staggered transition-delay to each direct child when the
// parent element enters the viewport.
export function useScrollStagger(options?: {
  baseDelay?: number
  stepDelay?: number
  threshold?: number
}) {
  const baseDelay = options?.baseDelay ?? 0
  const stepDelay = options?.stepDelay ?? 80
  const threshold = options?.threshold ?? 0.15

  const staggerRef: Ref<HTMLElement | null> = ref(null)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const el = staggerRef.value
    if (!el) return

    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          const children = Array.from(el.children) as HTMLElement[]
          children.forEach((child, i) => {
            child.style.transitionDelay = `${baseDelay + i * stepDelay}ms`
          })
          observer?.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
  })

  onUnmounted(() => observer?.disconnect())

  return { staggerRef }
}

// ── useScrollPin ──────────────────────────────────────────────────
// Pins a container while scrolling through panelCount virtual panels.
// On mobile (≤768px) does nothing — panels stack naturally.
export function useScrollPin(panelCount: number, options?: {
  panelScrollLength?: number
}) {
  const panelScrollLength = options?.panelScrollLength ?? 600

  const containerRef: Ref<HTMLElement | null> = ref(null)
  const activePanelIndex: Ref<number>         = ref(0)
  const pinnedStyle = { position: 'sticky' as const, top: '0px' }

  function onScroll() {
    const el = containerRef.value
    if (!el) return

    // Skip on mobile
    if (window.matchMedia('(max-width: 768px)').matches) return

    const rect       = el.getBoundingClientRect()
    const scrolled   = -rect.top            // px scrolled past the top of container
    const totalRange = panelCount * panelScrollLength

    if (scrolled < 0 || scrolled > totalRange) return

    const progress = scrolled / totalRange
    const idx      = Math.min(
      Math.floor(progress * panelCount),
      panelCount - 1
    )
    activePanelIndex.value = idx
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })

  return { containerRef, activePanelIndex, pinnedStyle }
}

// ── initStaggerObserver ───────────────────────────────────────────
// Watches all [data-animate-stagger] elements on the page and adds
// .stagger-revealed class when they enter the viewport.
export function initStaggerObserver(): void {
  if (typeof window === 'undefined') return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('stagger-revealed')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15 }
  )

  // Observe all existing elements
  document.querySelectorAll('[data-animate-stagger]').forEach((el) => {
    observer.observe(el)
  })

  // Also observe any elements added later via MutationObserver
  const mo = new MutationObserver((mutations) => {
    mutations.forEach((m) => {
      m.addedNodes.forEach((node) => {
        if (node instanceof Element) {
          if (node.hasAttribute('data-animate-stagger')) observer.observe(node)
          node.querySelectorAll('[data-animate-stagger]').forEach((el) => observer.observe(el))
        }
      })
    })
  })
  mo.observe(document.body, { childList: true, subtree: true })
}

// ── useScrollBg ───────────────────────────────────────────────────
// Interpolates background colour as element scrolls through viewport.
export function useScrollBg(from: string, to: string) {
  const bgRef: Ref<HTMLElement | null>  = ref(null)
  const currentBg: Ref<string>          = ref(from)

  function parseColor(hex: string): [number, number, number] {
    const clean = hex.replace('#', '')
    if (clean.length === 3) {
      const r = parseInt(clean[0]! + clean[0]!, 16)
      const g = parseInt(clean[1]! + clean[1]!, 16)
      const b = parseInt(clean[2]! + clean[2]!, 16)
      return [r, g, b]
    }
    const r = parseInt(clean.slice(0, 2), 16)
    const g = parseInt(clean.slice(2, 4), 16)
    const b = parseInt(clean.slice(4, 6), 16)
    return [r, g, b]
  }

  function lerp(a: number, b: number, t: number): number {
    return Math.round(a + (b - a) * t)
  }

  function interpolate(t: number): string {
    const [r1, g1, b1] = parseColor(from)
    const [r2, g2, b2] = parseColor(to)
    return `rgb(${lerp(r1, r2, t)}, ${lerp(g1, g2, t)}, ${lerp(b1, b2, t)})`
  }

  function onScroll() {
    const el = bgRef.value
    if (!el) return

    const rect = el.getBoundingClientRect()
    const vh   = window.innerHeight

    // 0 when top of el is at bottom of viewport
    // 1 when bottom of el is at top of viewport
    const t = Math.min(Math.max((vh - rect.top) / (vh + rect.height), 0), 1)
    currentBg.value = interpolate(t)
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // initial value
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })

  return { bgRef, currentBg }
}
