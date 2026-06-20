<script setup lang="ts">
import { cn } from '../lib/utils'

interface Props {
  class?: string
}

const props = defineProps<Props>()
</script>

<template>
  <div :class="cn('bg-white rounded-lg border border-slate-200 shadow-panel p-4', props.class)">
    <slot />
  </div>
</template>
