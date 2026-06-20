<template>
  <Teleport to="body">
    <div v-if="active" class="ac-wrap" aria-hidden="true">
      <div class="ac-dot" :style="dotStyle" />
      <div class="ac-ring" :style="ringStyle" :class="{ hovering: isHovering, clicking: isClicking }" />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

const active = ref(false)
const isHovering = ref(false)
const isClicking = ref(false)

const mouse = reactive({ x: -100, y: -100 })
const ring  = reactive({ x: -100, y: -100 })

let rafId = 0

function lerp(a: number, b: number, n: number) {
  return a + (b - a) * n
}

function tick() {
  ring.x = lerp(ring.x, mouse.x, 0.12)
  ring.y = lerp(ring.y, mouse.y, 0.12)
  rafId = requestAnimationFrame(tick)
}

const dotStyle = computed(() => ({
  transform: `translate(${mouse.x}px, ${mouse.y}px)`,
}))
const ringStyle = computed(() => ({
  transform: `translate(${ring.x}px, ${ring.y}px)`,
}))

function onMouseMove(e: MouseEvent) {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

function onMouseOver(e: MouseEvent) {
  const el = (e.target as Element)?.closest('a, button, [role="button"], label, input, textarea, select, [tabindex="0"], .magnetic, .card-tilt')
  isHovering.value = !!el
}

function onMouseDown() { isClicking.value = true }
function onMouseUp()   { isClicking.value = false }

onMounted(() => {
  // Don't activate on touch-only devices or reduced-motion
  if (window.matchMedia('(hover: none)').matches) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  active.value = true
  document.documentElement.classList.add('custom-cursor')

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseover', onMouseOver)
  document.addEventListener('mousedown', onMouseDown)
  document.addEventListener('mouseup',   onMouseUp)
  tick()
})

onUnmounted(() => {
  document.documentElement.classList.remove('custom-cursor')
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseover', onMouseOver)
  document.removeEventListener('mousedown', onMouseDown)
  document.removeEventListener('mouseup',   onMouseUp)
  cancelAnimationFrame(rafId)
})
</script>

<style>
/* Global: hide default cursor when custom cursor is active */
.custom-cursor,
.custom-cursor * {
  cursor: none !important;
}
</style>

<style scoped>
.ac-wrap {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 99999;
  /* Don't block interactions */
}

/* Inner dot — snaps to cursor exactly */
.ac-dot {
  position: fixed;
  top: -3px;
  left: -3px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #fff;
  mix-blend-mode: difference;
  pointer-events: none;
  will-change: transform;
  transition: width 0.2s ease, height 0.2s ease, top 0.2s ease, left 0.2s ease;
}

/* Outer ring — lags behind */
.ac-ring {
  position: fixed;
  top: -16px;
  left: -16px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.5);
  mix-blend-mode: difference;
  pointer-events: none;
  will-change: transform;
  transition:
    width 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    height 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    top 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    left 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    border-color 0.2s ease,
    background 0.2s ease;
}

/* Hovering interactive element */
.ac-ring.hovering {
  top: -28px;
  left: -28px;
  width: 56px;
  height: 56px;
  border-color: rgba(255, 255, 255, 0.9);
  background: rgba(255, 255, 255, 0.08);
}

/* Clicking */
.ac-ring.clicking {
  top: -12px;
  left: -12px;
  width: 24px;
  height: 24px;
  background: rgba(255, 255, 255, 0.2);
}

@media (prefers-reduced-motion: reduce) {
  .ac-wrap { display: none; }
}
</style>
