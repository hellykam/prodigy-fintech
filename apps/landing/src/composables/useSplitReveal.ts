import { onMounted, onUnmounted, type Ref } from 'vue'
import { gsap, ScrollTrigger } from '@/composables/useGSAP'

export interface SplitRevealOptions {
  /** Split by 'words' or 'chars' */
  type?: 'words' | 'chars' | 'lines'
  /** GSAP stagger between items */
  stagger?: number
  /** Y offset to animate from */
  y?: number
  /** Animation duration per item */
  duration?: number
  /** GSAP ease */
  ease?: string
  /** ScrollTrigger start position */
  start?: string
  /** Optional delay before animation starts */
  delay?: number
}

/**
 * Splits element text into words/chars, then reveals them via GSAP on scroll.
 * IMPORTANT: Only use on elements that contain only text — no child HTML elements.
 */
export function useSplitReveal(el: Ref<HTMLElement | null>, options: SplitRevealOptions = {}) {
  const {
    type = 'words',
    stagger = 0.06,
    y = 28,
    duration = 0.75,
    ease = 'power3.out',
    start = 'top 88%',
    delay = 0,
  } = options

  let ctx: gsap.Context | null = null
  const WORD_CLASS = `sr-word-${Math.random().toString(36).slice(2, 7)}`
  const CHAR_CLASS = `sr-char-${Math.random().toString(36).slice(2, 7)}`

  onMounted(() => {
    if (!el.value) return
    // Skip if user prefers reduced motion — text stays visible naturally via CSS
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const element = el.value
    const original = element.textContent || ''

    // Inject split spans
    if (type === 'words') {
      element.innerHTML = original
        .split(' ')
        .filter(w => w.length)
        .map(
          w => `<span class="${WORD_CLASS}" style="display:inline-block;overflow:hidden;vertical-align:bottom;">`
             + `<span class="${WORD_CLASS}-i" style="display:inline-block;">${w}</span></span>`
        )
        .join(' ')
    } else if (type === 'chars') {
      element.innerHTML = original
        .split('')
        .map(c =>
          c === ' '
            ? ' '
            : `<span class="${CHAR_CLASS}" style="display:inline-block;">${c}</span>`
        )
        .join('')
    } else {
      // lines — wrap whole element, slide from below
      element.style.overflow = 'hidden'
      element.style.display = 'block'
    }

    ctx = gsap.context(() => {
      const targets =
        type === 'words' ? element.querySelectorAll(`.${WORD_CLASS}-i`) :
        type === 'chars' ? element.querySelectorAll(`.${CHAR_CLASS}`) :
        [element]

      gsap.from(targets, {
        y,
        opacity: type === 'lines' ? 0 : 1,
        stagger,
        duration,
        ease,
        delay,
        scrollTrigger: {
          trigger: element,
          start,
          once: true,
        },
      })
    })
  })

  onUnmounted(() => {
    ctx?.revert()
    ScrollTrigger.getAll().forEach(t => t.kill())
  })
}

/**
 * Clip-path text reveal — text slides out from behind a mask on scroll.
 * Great for large hero headlines.
 */
export function useClipReveal(el: Ref<HTMLElement | null>, options: { direction?: 'up' | 'left'; duration?: number; delay?: number } = {}) {
  const { direction = 'up', duration = 1, delay = 0 } = options
  let ctx: gsap.Context | null = null

  onMounted(() => {
    if (!el.value) return
    const element = el.value

    // Skip if user prefers reduced motion — make content immediately visible
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(element, { clipPath: 'inset(0%)' })
      return
    }

    const fromClip = direction === 'up'
      ? 'inset(100% 0 0 0)'
      : 'inset(0 100% 0 0)'
    const toClip = 'inset(0% 0% 0% 0%)'

    ctx = gsap.context(() => {
      gsap.fromTo(element,
        { clipPath: fromClip, opacity: 1 },
        {
          clipPath: toClip,
          duration,
          ease: 'power4.out',
          delay,
          scrollTrigger: { trigger: element, start: 'top 85%', once: true },
        }
      )
    })
  })

  onUnmounted(() => ctx?.revert())
}

/**
 * Gradient sweep across text — a shimmering highlight moves L→R.
 * Adds a class that triggers the CSS animation.
 */
export function useGradientSweep(
  el: Ref<HTMLElement | null>,
  options: { color?: string; duration?: number; once?: boolean } = {}
) {
  const { color = '#34d399', duration = 1200, once = true } = options
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!el.value) return
    const element = el.value

    // Inject a ::after pseudo-element via a dynamic <style> tag approach using a data attr
    element.dataset.gradSweep = 'true'
    element.style.setProperty('--sweep-color', color)
    element.style.setProperty('--sweep-duration', `${duration}ms`)
    element.style.position = 'relative'
    element.style.display = 'inline-block'

    // Skip if user prefers reduced motion — show normally without animation
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            element.classList.add('grad-sweep-active')
            if (once) observer?.unobserve(entry.target)
          } else if (!once) {
            element.classList.remove('grad-sweep-active')
          }
        })
      },
      { threshold: 0.5 }
    )
    observer.observe(element)
  })

  onUnmounted(() => observer?.disconnect())
}
