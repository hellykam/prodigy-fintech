<script setup lang="ts">
import { computed } from 'vue'
import { Handle, Position } from '@vue-flow/core'
import type { NodeProps } from '@vue-flow/core'

// Use NodeProps as the base so Vue Flow's NodeTypesObject check passes
interface NodeData {
  label: string
  icon: string
  nodeId: string
  status?: string
  lastEvent?: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<NodeProps<NodeData>>()

type NodeStatus = 'idle' | 'processing' | 'waiting' | 'completed' | 'failed' | 'rejected'

const status = computed<NodeStatus>(() => (props.data?.status as NodeStatus) ?? 'idle')

const borderClass = computed(() => {
  switch (status.value) {
    case 'processing': return 'border-yellow-400 shadow-[0_0_12px_2px_rgba(250,204,21,0.4)]'
    case 'waiting':    return 'border-amber-400 shadow-[0_0_14px_3px_rgba(251,191,36,0.5)]'
    case 'completed':  return 'border-green-400 shadow-[0_0_12px_2px_rgba(74,222,128,0.4)]'
    case 'failed':     return 'border-red-500 shadow-[0_0_12px_2px_rgba(239,68,68,0.5)]'
    case 'rejected':   return 'border-red-500 shadow-[0_0_14px_3px_rgba(239,68,68,0.6)]'
    default:           return 'border-slate-600'
  }
})

const dotClass = computed(() => {
  switch (status.value) {
    case 'processing': return 'bg-yellow-400 animate-pulse'
    case 'waiting':    return 'bg-amber-400 animate-pulse'
    case 'completed':  return 'bg-green-400'
    case 'failed':
    case 'rejected':   return 'bg-red-500'
    default:           return 'bg-slate-600'
  }
})

const badgeClass = computed(() => {
  switch (status.value) {
    case 'processing': return 'bg-yellow-900/80 text-yellow-300'
    case 'waiting':    return 'bg-amber-900/80 text-amber-300'
    case 'completed':  return 'bg-green-900/80 text-green-300'
    case 'failed':
    case 'rejected':   return 'bg-red-900/80 text-red-300'
    default:           return ''
  }
})

const badgeLabel = computed(() => {
  switch (status.value) {
    case 'processing': return 'processing'
    case 'waiting':    return 'waiting'
    case 'completed':  return 'done'
    case 'failed':     return 'failed'
    case 'rejected':   return 'rejected'
    default:           return ''
  }
})
</script>

<template>
  <div
    :class="[
      'relative flex flex-col items-center gap-1 px-3 py-2.5 rounded-xl border-2 bg-slate-900 text-white min-w-[120px] transition-all duration-500 select-none',
      borderClass,
    ]"
  >
    <!-- Target handle (top) -->
    <Handle type="target" :position="Position.Top" class="!bg-slate-600 !border-slate-500 !w-2 !h-2" />

    <!-- Status dot + icon row -->
    <div class="flex items-center gap-2">
      <span :class="['w-2 h-2 rounded-full flex-shrink-0', dotClass]" />
      <span class="text-lg leading-none">{{ data?.icon ?? '' }}</span>
    </div>

    <!-- Label -->
    <p class="text-xs font-semibold text-slate-200 text-center leading-tight">{{ data?.label ?? '' }}</p>

    <!-- Status badge -->
    <span
      v-if="status !== 'idle' && badgeClass"
      :class="['text-[10px] font-mono px-1.5 py-0.5 rounded-full', badgeClass]"
    >
      {{ badgeLabel }}
    </span>

    <!-- Source handle (bottom) -->
    <Handle type="source" :position="Position.Bottom" class="!bg-slate-600 !border-slate-500 !w-2 !h-2" />
  </div>
</template>
