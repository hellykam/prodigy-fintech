<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  value: number
  prefix?: string
  suffix?: string
  label: string
  duration?: number
}>(), {
  prefix: '',
  suffix: '',
  duration: 800,
})

const displayNum = ref(0)
let rafHandle: number | null = null
let observer: IntersectionObserver | null = null
const statRef = ref<HTMLElement | null>(null)
let triggered = false

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function trigger() {
  if (triggered) return
  triggered = true

  // Skip animation entirely for users who prefer reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    displayNum.value = props.value
    return
  }

  const start = performance.now()
  const dur = props.duration

  function step(now: number) {
    const elapsed = now - start
    const t = Math.min(elapsed / dur, 1)
    const progress = easeOut(t)
    displayNum.value = Math.round(props.value * progress)
    if (t < 1) {
      rafHandle = requestAnimationFrame(step)
    } else {
      displayNum.value = props.value
    }
  }

  rafHandle = requestAnimationFrame(step)
}

defineExpose({ trigger })

onMounted(() => {
  displayNum.value = 0

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        trigger()
        observer?.disconnect()
      }
    },
    { threshold: 0.3 }
  )

  if (statRef.value) observer.observe(statRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
  if (rafHandle !== null) cancelAnimationFrame(rafHandle)
})
</script>

<template>
  <div ref="statRef" class="counter-stat">
    <p class="stat-display" aria-live="polite">
      {{ prefix }}{{ displayNum }}{{ suffix }}
    </p>
    <p class="stat-label">{{ label }}</p>
  </div>
</template>

<style scoped>
.counter-stat {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-display {
  font-variant-numeric: tabular-nums;
  line-height: 1;
  margin: 0;
}

.stat-label {
  margin: 0;
  opacity: 0.65;
  font-size: 0.875rem;
}
</style>
