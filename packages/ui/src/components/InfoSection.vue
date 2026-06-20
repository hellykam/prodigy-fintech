<script setup lang="ts">
interface Props {
  title: string
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  loading: false,
})
</script>

<template>
  <div class="rounded-lg border border-slate-200 bg-white shadow-card overflow-hidden">
    <!-- Header -->
    <div class="flex items-center justify-between px-5 py-4 border-b border-slate-200">
      <h3 class="text-xs font-semibold text-slate-700 uppercase tracking-wide">{{ title }}</h3>
      <div v-if="$slots.actions" class="flex items-center gap-2">
        <slot name="actions" />
      </div>
    </div>

    <!-- Body -->
    <div class="px-5 py-5">
      <!-- Loading skeleton -->
      <template v-if="loading">
        <div class="space-y-4">
          <div class="space-y-1.5">
            <div class="h-3 w-24 animate-pulse rounded bg-slate-200" />
            <div class="h-4 w-48 animate-pulse rounded bg-slate-200" />
          </div>
          <div class="space-y-1.5">
            <div class="h-3 w-20 animate-pulse rounded bg-slate-200" />
            <div class="h-4 w-36 animate-pulse rounded bg-slate-200" />
          </div>
        </div>
      </template>

      <!-- Default slot content -->
      <template v-else>
        <slot />
      </template>
    </div>
  </div>
</template>
