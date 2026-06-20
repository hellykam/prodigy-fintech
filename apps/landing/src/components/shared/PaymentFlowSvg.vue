<script setup lang="ts">
import { computed } from 'vue'

// Respect prefers-reduced-motion for SVG SMIL animations (CSS `animation: none`
// does not stop SMIL <animate>/<animateMotion> elements — we must check via JS).
const reducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const props = withDefaults(defineProps<{
  theme?: 'light' | 'dark'
  speed?: number
}>(), {
  theme: 'light',
  speed: 1,
})

const nodes = [
  { x: 30,  label: 'User' },
  { x: 150, label: 'Widget' },
  { x: 270, label: 'Risk' },
  { x: 390, label: 'Ledger' },
  { x: 510, label: 'Partner' },
]

const r = 24

// Build a single path joining all node centres at y=60
const pathD = computed(() => {
  return nodes.map((n, i) => `${i === 0 ? 'M' : 'L'} ${n.x} 60`).join(' ')
})

const motionDur = computed(() => `${3 / props.speed}s`)

// Theme colours
const nodeFill    = computed(() => props.theme === 'dark' ? '#1e293b' : '#f1f5f9')
const nodeStroke  = computed(() => props.theme === 'dark' ? '#38bdf8' : '#475569')
const lineStroke  = computed(() => props.theme === 'dark' ? '#38bdf8' : '#64748b')
const textFill    = computed(() => props.theme === 'dark' ? '#e2e8f0' : '#1e293b')
const dotFill     = computed(() => props.theme === 'dark' ? '#38bdf8' : '#3b82f6')
const ringStroke  = computed(() => props.theme === 'dark' ? '#38bdf8' : '#3b82f6')
</script>

<template>
  <svg
    viewBox="0 0 600 120"
    xmlns="http://www.w3.org/2000/svg"
    class="payment-flow-svg"
    role="img"
    aria-label="Payment flow: User → Widget → Risk Engine → Ledger → Partner"
  >
    <defs>
      <!-- The flow path used by animateMotion -->
      <path :id="`flow-path-${theme}`" :d="pathD" fill="none" />
    </defs>

    <!-- Connecting lines (stroke-dasharray for dashed look) -->
    <line
      v-for="(node, i) in nodes.slice(0, -1)"
      :key="`line-${i}`"
      :x1="node.x + r"
      y1="60"
      :x2="nodes[i + 1]!.x - r"
      y2="60"
      :stroke="lineStroke"
      stroke-width="1.5"
      stroke-dasharray="4 3"
      opacity="0.6"
    />

    <!-- Node circles + pulse rings -->
    <g v-for="(node, i) in nodes" :key="`node-${i}`">
      <!-- Pulse ring -->
      <circle
        :cx="node.x"
        cy="60"
        :r="r + 4"
        fill="none"
        :stroke="ringStroke"
        stroke-width="1"
        opacity="0"
      >
        <animate
          attributeName="r"
          :values="`${r};${r + 12};${r + 12}`"
          :dur="motionDur"
          :begin="`${(i / nodes.length) * (3 / speed)}s`"
          :repeatCount="reducedMotion ? '0' : 'indefinite'"
        />
        <animate
          attributeName="opacity"
          values="0.6;0;0"
          :dur="motionDur"
          :begin="`${(i / nodes.length) * (3 / speed)}s`"
          :repeatCount="reducedMotion ? '0' : 'indefinite'"
        />
      </circle>

      <!-- Node body -->
      <circle
        :cx="node.x"
        cy="60"
        :r="r"
        :fill="nodeFill"
        :stroke="nodeStroke"
        stroke-width="1.5"
      />

      <!-- Node label below -->
      <text
        :x="node.x"
        y="98"
        text-anchor="middle"
        :fill="textFill"
        font-family="'Space Mono', monospace"
        font-size="9"
        font-weight="600"
      >
        {{ node.label }}
      </text>
    </g>

    <!-- Animated dot travelling along flow path -->
    <circle :r="5" :fill="dotFill" v-if="!reducedMotion">
      <animateMotion :dur="motionDur" repeatCount="indefinite" rotate="auto">
        <mpath :href="`#flow-path-${theme}`" />
      </animateMotion>
    </circle>
  </svg>
</template>

<style scoped>
.payment-flow-svg {
  width: 100%;
  height: auto;
  display: block;
}

/* SMIL animations are suppressed via JS (reducedMotion flag) because
   CSS `animation: none` does not stop SVG <animate>/<animateMotion> elements. */
</style>
