import { onMounted, onUnmounted, type Ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

/**
 * Animates a number from 0 to `target` when the element enters the viewport.
 * Attach to any element that displays a numeric metric.
 */
export function useCountUp(
  el: Ref<HTMLElement | null>,
  target: number,
  options: { duration?: number; prefix?: string; suffix?: string; decimals?: number } = {}
) {
  const { duration = 2, prefix = '', suffix = '', decimals = 0 } = options
  let tween: gsap.core.Tween | null = null

  onMounted(() => {
    if (!el.value) return
    const obj = { val: 0 }
    tween = gsap.to(obj, {
      val: target,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el.value,
        start: 'top 85%',
        once: true,
      },
      onUpdate() {
        if (el.value)
          el.value.textContent = prefix + obj.val.toFixed(decimals) + suffix
      },
    })
  })

  onUnmounted(() => {
    tween?.kill()
  })
}

/**
 * Stagger-reveals a list of children when the container enters the viewport.
 */
export function useGSAPStagger(container: Ref<HTMLElement | null>, selector = ':scope > *') {
  let ctx: gsap.Context | null = null

  onMounted(() => {
    if (!container.value) return
    ctx = gsap.context(() => {
      gsap.from(container.value!.querySelectorAll(selector), {
        opacity: 0,
        y: 24,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container.value,
          start: 'top 80%',
          once: true,
        },
      })
    })
  })

  onUnmounted(() => ctx?.revert())
}
