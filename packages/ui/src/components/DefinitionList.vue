<script setup lang="ts">
import MoneyAmount from './MoneyAmount.vue'
import StatusPill from './StatusPill.vue'

interface DLItem {
  label: string
  value?: string | number | null
  type?: 'text' | 'money' | 'status' | 'link' | 'badge'
  currency?: string
  href?: string
  subtext?: string
}

interface Props {
  items: DLItem[]
  columns?: 1 | 2
}

const props = withDefaults(defineProps<Props>(), {
  columns: 1,
})

function isEmpty(val: string | number | null | undefined): boolean {
  return val === null || val === undefined || val === ''
}

function stringVal(val: string | number | null | undefined): string {
  if (val === null || val === undefined) return '—'
  return String(val)
}
</script>

<template>
  <dl
    class="grid gap-x-6 gap-y-4"
    :class="props.columns === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'"
  >
    <div v-for="item in items" :key="item.label" class="flex flex-col gap-0.5">
      <!-- Label -->
      <dt class="text-xs font-medium uppercase tracking-wide text-slate-500">
        {{ item.label }}
      </dt>

      <!-- Value -->
      <dd class="text-sm text-slate-900">
        <!-- null / undefined / empty -->
        <template v-if="isEmpty(item.value)">
          <span class="text-slate-400">—</span>
        </template>

        <!-- type=money -->
        <template v-else-if="item.type === 'money' && item.currency">
          <MoneyAmount :amount="item.value!" :currency="item.currency" size="sm" />
        </template>

        <!-- type=status -->
        <template v-else-if="item.type === 'status'">
          <StatusPill :status="stringVal(item.value)" />
        </template>

        <!-- type=link -->
        <template v-else-if="item.type === 'link' && item.href">
          <a
            :href="item.href"
            class="text-brand-600 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ stringVal(item.value) }}
          </a>
        </template>

        <!-- default: text -->
        <template v-else>
          {{ stringVal(item.value) }}
        </template>

        <!-- Subtext -->
        <span
          v-if="item.subtext"
          class="mt-0.5 block text-xs text-slate-400"
        >
          {{ item.subtext }}
        </span>
      </dd>
    </div>
  </dl>
</template>
