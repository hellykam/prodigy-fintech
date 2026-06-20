<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  title: string
  columns: { key: string; label: string; width?: string; type?: 'status'|'debit'|'credit'|'date'|'json' }[]
  rows: Record<string, any>[]
  isLoading?: boolean
  error?: string | null
}>()

const search = ref('')
const expandedId = ref<string | null>(null)
const sortKey = ref('')
const sortAsc = ref(true)

const filtered = computed(() => {
  let r = props.rows
  if (search.value) {
    const q = search.value.toLowerCase()
    r = r.filter(row => JSON.stringify(row).toLowerCase().includes(q))
  }
  if (sortKey.value) {
    r = [...r].sort((a, b) => {
      const v1 = a[sortKey.value], v2 = b[sortKey.value]
      const cmp = String(v1) < String(v2) ? -1 : String(v1) > String(v2) ? 1 : 0
      return sortAsc.value ? cmp : -cmp
    })
  }
  return r
})

function sort(key: string) {
  if (sortKey.value === key) sortAsc.value = !sortAsc.value
  else { sortKey.value = key; sortAsc.value = true }
}

function exportCsv() {
  const headers = props.columns.map(c => c.label).join(',')
  const rows = filtered.value.map(r => props.columns.map(c => `"${String(r[c.key] ?? '').replace(/"/g, '""')}"`).join(','))
  const blob = new Blob([headers + '\n' + rows.join('\n')], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${props.title.toLowerCase().replace(/\s+/g,'_')}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

function statusColor(v: string) {
  if (['completed','approved','settled','active'].includes(v)) return '#34D399'
  if (['pending','manual_review'].includes(v)) return '#FBBF24'
  if (['failed','rejected','cancelled'].includes(v)) return '#F87171'
  return '#94A3B8'
}

function formatDate(v: string) {
  if (!v) return '—'
  return new Date(v).toLocaleString('en-GB', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' })
}
</script>

<template>
  <div style="padding:24px">
    <!-- Header -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
      <h1 style="font-size:13px;letter-spacing:2px;color:#6366F1;font-weight:700">{{ title.toUpperCase() }}</h1>
      <div style="display:flex;gap:10px;align-items:center">
        <span style="font-size:11px;color:#475569">{{ filtered.length }} rows</span>
        <input
          v-model="search"
          placeholder="Search..."
          style="background:#0D1117;border:1px solid #1E2A3B;color:#E2E8F0;padding:6px 12px;border-radius:6px;font-size:12px;font-family:inherit;outline:none;width:200px"
        />
        <button @click="exportCsv" style="background:#1E2A3B;color:#6366F1;border:1px solid #6366F1;padding:6px 14px;border-radius:6px;font-size:11px;cursor:pointer;font-family:inherit;letter-spacing:1px">
          CSV ↓
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" style="color:#475569;font-size:12px;text-align:center;padding:40px">Loading...</div>

    <!-- Error -->
    <div v-else-if="error" style="color:#F87171;font-size:12px;padding:20px;background:#1E0F0F;border-radius:8px;border:1px solid #7F1D1D">{{ error }}</div>

    <!-- Table -->
    <div v-else style="overflow:auto">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead>
          <tr style="border-bottom:1px solid #1E2A3B">
            <th v-for="col in columns" :key="col.key"
              @click="sort(col.key)"
              :style="`text-align:left;padding:10px 12px;color:#475569;font-size:10px;letter-spacing:1.5px;cursor:pointer;user-select:none;white-space:nowrap;width:${col.width??'auto'}`">
              {{ col.label.toUpperCase() }}
              <span v-if="sortKey === col.key">{{ sortAsc ? ' ↑' : ' ↓' }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="row in filtered" :key="row.id">
            <tr
              @click="expandedId = expandedId === row.id ? null : row.id"
              style="cursor:pointer;transition:background 0.1s;border-bottom:1px solid #0F1623"
              :style="{ background: expandedId === row.id ? '#1E2A3B' : 'transparent' }"
              onmouseover="this.style.background='#141B27'" onmouseout="this.style.background=expandedId===this._id?'#1E2A3B':'transparent'">
              <td v-for="col in columns" :key="col.key" style="padding:10px 12px;vertical-align:middle">
                <!-- Status -->
                <span v-if="col.type === 'status'" :style="`font-size:10px;letter-spacing:1px;padding:3px 8px;border-radius:4px;background:${statusColor(row[col.key])}22;color:${statusColor(row[col.key])}`">
                  {{ String(row[col.key] ?? '').toUpperCase() }}
                </span>
                <!-- Debit (red) -->
                <span v-else-if="col.type === 'debit'" style="color:#F87171;font-family:monospace">
                  {{ row[col.key] != null ? `−${Number(row[col.key]).toFixed(4)}` : '—' }}
                </span>
                <!-- Credit (green) -->
                <span v-else-if="col.type === 'credit'" style="color:#34D399;font-family:monospace">
                  {{ row[col.key] != null ? `+${Number(row[col.key]).toFixed(4)}` : '—' }}
                </span>
                <!-- Date -->
                <span v-else-if="col.type === 'date'" style="color:#64748B;font-size:11px">{{ formatDate(row[col.key]) }}</span>
                <!-- Default -->
                <span v-else style="color:#CBD5E1">{{ row[col.key] ?? '—' }}</span>
              </td>
            </tr>
            <!-- Expanded JSON -->
            <tr v-if="expandedId === row.id">
              <td :colspan="columns.length" style="padding:0;background:#0D1117">
                <pre style="padding:16px 20px;font-size:11px;color:#94A3B8;overflow:auto;border-bottom:1px solid #1E2A3B;max-height:300px">{{ JSON.stringify(row, null, 2) }}</pre>
              </td>
            </tr>
          </template>
          <tr v-if="filtered.length === 0">
            <td :colspan="columns.length" style="text-align:center;color:#334155;padding:40px;font-size:12px">No data</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
