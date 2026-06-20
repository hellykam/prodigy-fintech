<script setup lang="ts">
interface Props {
  title: string
  description?: string
  icon?: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 text-center">
    <div v-if="icon" class="text-4xl mb-4">{{ icon }}</div>
    <h3 class="text-sm font-semibold text-slate-900 mb-1">{{ title }}</h3>
    <p v-if="description" class="text-sm text-slate-500 max-w-sm">{{ description }}</p>
    <div v-if="$slots.action" class="mt-4">
      <slot name="action" />
    </div>
  </div>
</template>
