<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  useVueTable,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  type ColumnDef,
} from '@tanstack/vue-table'
import EmptyState from './EmptyState.vue'
import LiveIndicator from './LiveIndicator.vue'

interface Column {
  key: string
  header: string
  align?: 'left' | 'right'
  width?: string
}

interface ColumnMeta {
  align?: 'left' | 'right'
  width?: string
}

interface Props {
  columns: Column[]
  data: Record<string, unknown>[]
  loading?: boolean
  rowKey?: string
  onRowClick?: (row: Record<string, unknown>) => void
  rowHref?: (row: Record<string, unknown>) => string
  emptyTitle?: string
  emptyDescription?: string
  liveUpdate?: boolean
  newItemCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  rowKey: 'id',
  emptyTitle: 'No results',
  emptyDescription: 'No records match your current filters.',
  liveUpdate: false,
  newItemCount: 0,
})

const sorting = ref<SortingState>([])

const tableColumns = computed<ColumnDef<Record<string, unknown>, unknown>[]>(() =>
  props.columns.map((col) => ({
    id: col.key,
    accessorKey: col.key,
    header: col.header,
    enableSorting: true,
    meta: { align: col.align ?? 'left', width: col.width } satisfies ColumnMeta,
  })),
)

const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return tableColumns.value
  },
  state: {
    get sorting() {
      return sorting.value
    },
  },
  onSortingChange: (updater) => {
    sorting.value = typeof updater === 'function' ? updater(sorting.value) : updater
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
})

function getColMeta(columnDef: ColumnDef<Record<string, unknown>, unknown>): ColumnMeta {
  return (columnDef.meta as ColumnMeta | undefined) ?? {}
}

function getRowKey(row: Record<string, unknown>): string {
  const key = row[props.rowKey]
  if (key !== undefined && key !== null) return String(key)
  return Math.random().toString(36).slice(2)
}

function handleRowClick(row: Record<string, unknown>) {
  props.onRowClick?.(row)
}

function getHeaderLabel(header: unknown): string {
  if (typeof header === 'string') return header
  return ''
}

function skeletonWidth(rowIdx: number, colKey: string): string {
  const pct = 50 + ((rowIdx * 13 + colKey.length * 7) % 40)
  return `${pct}%`
}
</script>

<template>
  <div class="w-full">
    <!-- Live update banner -->
    <div
      v-if="liveUpdate && newItemCount && newItemCount > 0"
      class="mb-2 flex items-center justify-between rounded-lg border border-info-500 bg-info-50 px-4 py-2"
    >
      <span class="text-xs font-medium text-info-600">
        {{ newItemCount }} new {{ newItemCount === 1 ? 'item' : 'items' }} available
      </span>
      <LiveIndicator :active="true" />
    </div>

    <!-- Live indicator without new items -->
    <div v-else-if="liveUpdate" class="mb-2 flex justify-end">
      <LiveIndicator :active="true" />
    </div>

    <!-- Loading state: skeleton rows -->
    <template v-if="loading">
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b border-slate-200 bg-slate-50">
            <th
              v-for="col in columns"
              :key="col.key"
              class="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500"
              :style="col.width ? { width: col.width } : {}"
              :class="col.align === 'right' ? 'text-right' : 'text-left'"
            >
              {{ col.header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in 8" :key="i" class="border-b border-slate-100">
            <td
              v-for="col in columns"
              :key="col.key"
              class="px-4 py-3 align-top"
            >
              <div
                class="h-4 animate-pulse rounded bg-slate-200"
                :style="{ width: skeletonWidth(i, col.key) }"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </template>

    <!-- Empty state -->
    <template v-else-if="data.length === 0">
      <EmptyState
        :title="emptyTitle ?? 'No results'"
        :description="emptyDescription"
      />
    </template>

    <!-- Populated table -->
    <template v-else>
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b border-slate-200 bg-slate-50">
            <th
              v-for="header in table.getFlatHeaders()"
              :key="header.id"
              class="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500"
              :style="getColMeta(header.column.columnDef).width ? { width: getColMeta(header.column.columnDef).width } : {}"
              :class="[
                getColMeta(header.column.columnDef).align === 'right' ? 'text-right' : 'text-left',
                header.column.getCanSort() ? 'cursor-pointer select-none hover:text-slate-700' : '',
              ]"
              :tabindex="header.column.getCanSort() ? 0 : undefined"
              :aria-sort="
                header.column.getIsSorted() === 'asc'
                  ? 'ascending'
                  : header.column.getIsSorted() === 'desc'
                    ? 'descending'
                    : 'none'
              "
              @click="header.column.getCanSort() ? header.column.toggleSorting() : undefined"
              @keydown.enter="header.column.getCanSort() ? header.column.toggleSorting() : undefined"
              @keydown.space.prevent="header.column.getCanSort() ? header.column.toggleSorting() : undefined"
            >
              <span class="inline-flex items-center gap-1">
                {{ getHeaderLabel(header.column.columnDef.header) }}
                <template v-if="header.column.getCanSort()">
                  <!-- Ascending -->
                  <svg
                    v-if="header.column.getIsSorted() === 'asc'"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                    class="text-brand-600"
                  >
                    <path d="M6 3l4 5H2l4-5z" fill="currentColor" />
                  </svg>
                  <!-- Descending -->
                  <svg
                    v-else-if="header.column.getIsSorted() === 'desc'"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                    class="text-brand-600"
                  >
                    <path d="M6 9L2 4h8L6 9z" fill="currentColor" />
                  </svg>
                  <!-- Unsorted -->
                  <svg
                    v-else
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                    class="text-slate-300"
                  >
                    <path d="M6 2l3 3.5H3L6 2zM6 10L3 6.5h6L6 10z" fill="currentColor" />
                  </svg>
                </template>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in table.getRowModel().rows"
            :key="getRowKey(row.original)"
            class="border-b border-slate-100 transition-colors"
            :class="[onRowClick ?? rowHref ? 'cursor-pointer hover:bg-slate-50' : '']"
            :tabindex="onRowClick ? 0 : undefined"
            @click="onRowClick ? handleRowClick(row.original) : undefined"
            @keydown.enter="onRowClick ? handleRowClick(row.original) : undefined"
            @keydown.space.prevent="onRowClick ? handleRowClick(row.original) : undefined"
          >
            <td
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              class="px-4 py-3 align-top text-sm text-slate-900"
              :class="
                getColMeta(cell.column.columnDef).align === 'right' ? 'text-right' : 'text-left'
              "
            >
              <!-- Custom slot per column key -->
              <slot
                v-if="$slots[cell.column.id]"
                :name="cell.column.id"
                :value="cell.getValue()"
                :row="row.original"
              />
              <!-- Default cell rendering -->
              <template v-else>
                {{
                  cell.getValue() !== null && cell.getValue() !== undefined
                    ? String(cell.getValue())
                    : '—'
                }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>
