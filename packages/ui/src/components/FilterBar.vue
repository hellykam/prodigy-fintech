<script setup lang="ts">
import { computed } from 'vue'

interface FilterOption {
  label: string
  value: string
}

interface Filter {
  key: string
  label: string
  type: 'text' | 'select' | 'date-range'
  options?: FilterOption[]
  placeholder?: string
}

interface Props {
  filters: Filter[]
  modelValue: Record<string, string>
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: Record<string, string>]
  reset: []
}>()

function updateFilter(key: string, value: string) {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}

function removeFilter(key: string) {
  const next = { ...props.modelValue }
  delete next[key]
  emit('update:modelValue', next)
}

function reset() {
  emit('update:modelValue', {})
  emit('reset')
}

// Active chips: filters with non-empty values (for select/date-range)
const activeChips = computed(() => {
  return props.filters
    .filter((f) => {
      if (f.type === 'text') return false // search text not shown as chip
      const val = props.modelValue[f.key]
      return val !== undefined && val !== ''
    })
    .map((f) => {
      const val = props.modelValue[f.key] ?? ''
      const optionLabel =
        f.type === 'select'
          ? (f.options?.find((o) => o.value === val)?.label ?? val)
          : val
      return { key: f.key, label: f.label, value: optionLabel }
    })
})

const hasActiveFilters = computed(
  () => Object.values(props.modelValue).some((v) => v !== ''),
)

// Separate text (search) filter from the rest
const textFilter = computed(() => props.filters.find((f) => f.type === 'text'))
const otherFilters = computed(() => props.filters.filter((f) => f.type !== 'text'))
</script>

<template>
  <div class="flex flex-col gap-3">
    <!-- Filter row -->
    <div class="flex flex-wrap items-center gap-2">
      <!-- Search input (always first) -->
      <div v-if="textFilter" class="relative min-w-0 flex-1">
        <svg
          class="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="7" cy="7" r="4.5" stroke="currentColor" stroke-width="1.5" />
          <path d="M10.5 10.5l2.5 2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        </svg>
        <input
          type="search"
          class="h-9 w-full min-w-48 rounded-lg border border-slate-300 bg-white py-0 pl-8 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-0"
          :placeholder="textFilter.placeholder ?? 'Search…'"
          :value="modelValue[textFilter.key] ?? ''"
          @input="updateFilter(textFilter.key, ($event.target as HTMLInputElement).value)"
        />
      </div>

      <!-- Select / date-range filters -->
      <template v-for="filter in otherFilters" :key="filter.key">
        <select
          v-if="filter.type === 'select'"
          class="h-9 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
          :value="modelValue[filter.key] ?? ''"
          :aria-label="filter.label"
          @change="updateFilter(filter.key, ($event.target as HTMLSelectElement).value)"
        >
          <option value="">{{ filter.label }}</option>
          <option
            v-for="opt in filter.options"
            :key="opt.value"
            :value="opt.value"
          >
            {{ opt.label }}
          </option>
        </select>

        <!-- Date range: two date inputs -->
        <template v-else-if="filter.type === 'date-range'">
          <input
            type="date"
            class="h-9 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
            :aria-label="`${filter.label} from`"
            :value="modelValue[`${filter.key}_from`] ?? ''"
            @change="updateFilter(`${filter.key}_from`, ($event.target as HTMLInputElement).value)"
          />
          <input
            type="date"
            class="h-9 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
            :aria-label="`${filter.label} to`"
            :value="modelValue[`${filter.key}_to`] ?? ''"
            @change="updateFilter(`${filter.key}_to`, ($event.target as HTMLInputElement).value)"
          />
        </template>
      </template>

      <!-- Reset button -->
      <button
        v-if="hasActiveFilters"
        type="button"
        class="h-9 rounded-lg px-3 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        @click="reset"
      >
        Reset
      </button>
    </div>

    <!-- Active filter chips -->
    <div v-if="activeChips.length > 0" class="flex flex-wrap gap-2">
      <span
        v-for="chip in activeChips"
        :key="chip.key"
        class="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs text-slate-700"
      >
        <span class="font-medium text-slate-500">{{ chip.label }}:</span>
        {{ chip.value }}
        <button
          type="button"
          class="ml-0.5 flex h-4 w-4 items-center justify-center rounded-full text-slate-400 hover:bg-slate-200 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          :aria-label="`Remove ${chip.label} filter`"
          @click="removeFilter(chip.key)"
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
            <path d="M6 2L2 6M2 2l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </button>
      </span>
    </div>
  </div>
</template>
