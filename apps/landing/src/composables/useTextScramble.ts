import { onMounted, onUnmounted, type Ref } from 'vue'

// Characters used during scramble — mix of symbols + alphanumeric for techy feel
const CHARS_TECH  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*'
const CHARS_MONO  = '01█▓░▒ABCDEF0123456789'   // terminal/matrix feel
const CHARS_CLEAN = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

export type ScrambleStyle = 'tech' | 'mono' | 'clean'

export interface ScrambleOptions {
  /** When to trigger: 'mount' (immediately) | 'visible' (on scroll-in) */
  trigger?: 'mount' | 'visible'
  /** Total duration in ms */
  duration?: number
  /** Character set */
  style?: ScrambleStyle
  /** IntersectionObserver threshold */
  threshold?: number
  /** Extra delay before starting (ms) */
  delay?: number
}

function getChars(style: ScrambleStyle) {
  if (style === 'mono')  return CHARS_MONO
  if (style === 'clean') return CHARS_CLEAN
  return CHARS_TECH
}

function runScramble(target: string, el: HTMLElement, opts: Required<ScrambleOptions>) {
  const chars = getChars(opts.style)
  const totalFrames = Math.max(1, Math.ceil(opts.duration / 16))
  let iteration = 0
  let frameId = 0

  const loop = () => {
    el.textContent = target
      .split('')
      .map((char, i) => {
        if (char === ' ' || char === '\n') return char
        // Progress: each character resolves left-to-right
        if (i < (iteration / totalFrames) * target.length) return char
        return chars[Math.floor(Math.random() * chars.length)]
      })
      .join('')

    iteration++
    if (iteration <= totalFrames) {
      frameId = requestAnimationFrame(loop)
    } else {
      el.textContent = target
    }
    return frameId
  }

  setTimeout(() => { loop() }, opts.delay)
}

/**
 * Scrambles the text content of an element, resolving left-to-right.
 * Works on plain text nodes — do not use on elements with child HTML.
 */
export function useTextScramble(el: Ref<HTMLElement | null>, options: ScrambleOptions = {}) {
  const opts: Required<ScrambleOptions> = {
    trigger: 'visible',
    duration: 900,
    style: 'tech',
    threshold: 0.4,
    delay: 0,
    ...options,
  }

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!el.value) return
    // Skip if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const original = el.value.textContent || ''

    if (opts.trigger === 'mount') {
      runScramble(original, el.value, opts)
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && el.value) {
            runScramble(original, el.value, opts)
            observer?.unobserve(entry.target)
          }
        })
      },
      { threshold: opts.threshold }
    )
    observer.observe(el.value)
  })

  onUnmounted(() => observer?.disconnect())
}

/**
 * Scramble triggered programmatically — returns a `scramble(text?)` function.
 * Useful for hover effects.
 */
export function useHoverScramble(el: Ref<HTMLElement | null>, style: ScrambleStyle = 'tech') {
  const opts: Required<ScrambleOptions> = {
    trigger: 'mount', duration: 600, style, threshold: 0.3, delay: 0,
  }

  const scramble = (override?: string) => {
    if (!el.value) return
    const target = override ?? (el.value.textContent || '')
    runScramble(target, el.value, opts)
  }

  onMounted(() => {
    if (!el.value) return
    // Skip on touch-only devices (no hover support)
    if (window.matchMedia('(hover: none)').matches) return
    // Skip if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    el.value.addEventListener('mouseenter', () => scramble())
  })

  return { scramble }
}
