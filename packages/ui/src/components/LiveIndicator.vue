<script setup lang="ts">
interface Props {
  active?: boolean
  label?: string
}

withDefaults(defineProps<Props>(), {
  active: true,
  label: 'Live',
})
</script>

<template>
  <span class="inline-flex items-center gap-1.5">
    <!-- Active: pulsing green dot -->
    <span v-if="active" class="relative flex h-2 w-2" aria-hidden="true">
      <span
        class="absolute inline-flex h-full w-full animate-ping rounded-full bg-success-500 opacity-75"
      />
      <span class="relative inline-flex h-2 w-2 rounded-full bg-success-500" />
    </span>

    <!-- Inactive: static grey dot -->
    <span v-else class="h-2 w-2 rounded-full bg-slate-300" aria-hidden="true" />

    <span
      class="text-xs font-medium"
      :class="active ? 'text-success-600' : 'text-slate-400'"
    >
      {{ active ? label : 'Reconnecting…' }}
    </span>
  </span>
</template>
