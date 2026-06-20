<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import DbTable from '@/components/DbTable.vue'

const { data, isLoading, error } = useQuery({
  queryKey: ['db-events'],
  queryFn: async () => {
    const r = await fetch('/api/system-events?limit=100')
    if (!r.ok) throw new Error('Failed')
    return r.json()
  },
  refetchInterval: 2000,
})

// Also listen to WebSocket for live appending
const liveCount = ref(0)
let ws: WebSocket | null = null
onMounted(() => {
  const proto = location.protocol === 'https:' ? 'wss' : 'ws'
  ws = new WebSocket(`${proto}://${location.host}/ws`)
  ws.onmessage = () => { liveCount.value++ }
})
onUnmounted(() => ws?.close())
</script>
<template>
  <div>
    <div style="padding:16px 24px 0;display:flex;align-items:center;gap:8px">
      <div style="width:6px;height:6px;border-radius:50%;background:#34D399;animation:pulse 1.5s infinite"></div>
      <span style="font-size:11px;color:#34D399;letter-spacing:1px">LIVE — {{ liveCount }} new events</span>
    </div>
    <DbTable
      title="System Events"
      :rows="data?.items ?? []"
      :is-loading="isLoading"
      :error="error?.message"
      :columns="[
        { key: 'id', label: 'ID', width: '160px' },
        { key: 'eventName', label: 'Event', width: '220px' },
        { key: 'source', label: 'Source' },
        { key: 'target', label: 'Target' },
        { key: 'status', label: 'Status', type: 'status' },
        { key: 'entityType', label: 'Entity' },
        { key: 'createdAt', label: 'Time', type: 'date' },
      ]"
    />
  </div>
</template>
<style>
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
</style>
