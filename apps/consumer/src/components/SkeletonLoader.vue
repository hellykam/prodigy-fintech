<script setup lang="ts">
interface Props {
  lines?: number
  height?: string
}

withDefaults(defineProps<Props>(), {
  lines: 3,
  height: 'h-4',
})
</script>

<template>
  <div class="space-y-3 animate-pulse">
    <div
      v-for="i in lines"
      :key="i"
      :class="[height, i === lines && lines > 1 ? 'w-2/3' : 'w-full']"
      class="bg-slate-200 rounded-md"
    />
  </div>
</template>
