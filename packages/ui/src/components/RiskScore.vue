<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  score: number
  level?: 'low' | 'medium' | 'high' | 'critical'
}

const props = defineProps<Props>()

type RiskLevel = 'low' | 'medium' | 'high' | 'critical'

const derivedLevel = computed<RiskLevel>(() => {
  if (props.level) return props.level
  if (props.score <= 39) return 'low'
  if (props.score <= 69) return 'medium'
  if (props.score <= 89) return 'high'
  return 'critical'
})

const levelConfig = computed(() => {
  switch (derivedLevel.value) {
    case 'low':
      return { label: 'Low', barClass: 'bg-success-500', textClass: 'text-success-600' }
    case 'medium':
      return { label: 'Medium', barClass: 'bg-warning-500', textClass: 'text-warning-600' }
    case 'high':
      return { label: 'High', barClass: 'bg-danger-500', textClass: 'text-danger-600' }
    case 'critical':
      return { label: 'Critical', barClass: 'bg-danger-500', textClass: 'text-danger-900' }
  }
})

const clampedScore = computed(() => Math.max(0, Math.min(100, props.score)))
</script>

<template>
  <div class="flex items-center gap-3">
    <!-- Score number -->
    <span class="w-10 shrink-0 font-mono text-xl font-bold text-slate-900">
      {{ clampedScore }}
    </span>

    <!-- Bar + label -->
    <div class="flex min-w-0 flex-1 flex-col gap-1">
      <div class="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          class="h-full rounded-full transition-all duration-300"
          :class="levelConfig.barClass"
          :style="{ width: `${clampedScore}%` }"
          :aria-valuenow="clampedScore"
          :aria-valuemin="0"
          :aria-valuemax="100"
          role="progressbar"
          :aria-label="`Risk score: ${clampedScore}`"
        />
      </div>
      <span class="text-xs font-medium" :class="levelConfig.textClass">
        {{ levelConfig.label }}
      </span>
    </div>
  </div>
</template>
