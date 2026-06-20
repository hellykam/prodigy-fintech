<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { RouterLink, RouterView } from 'vue-router'

const route = useRoute()
const wsConnected = ref(false)
let ws: WebSocket | null = null

onMounted(() => {
  const proto = location.protocol === 'https:' ? 'wss' : 'ws'
  ws = new WebSocket(`${proto}://${location.host}/ws`)
  ws.onopen = () => { wsConnected.value = true }
  ws.onclose = () => { wsConnected.value = false }
})
onUnmounted(() => ws?.close())

const nav = [
  { label: 'USERS', path: '/users' },
  { label: 'TRANSACTIONS', path: '/transactions' },
  { label: 'LEDGER', path: '/ledger' },
  { label: 'KYC', path: '/kyc' },
  { label: 'B2B CLIENTS', path: '/b2b' },
  { label: 'SYSTEM EVENTS', path: '/events' },
]
</script>

<template>
  <div style="display:flex;height:100vh;overflow:hidden">
    <!-- Sidebar -->
    <aside style="width:200px;background:#0D1117;border-right:1px solid #1E2A3B;display:flex;flex-direction:column;flex-shrink:0">
      <div style="padding:20px 16px;border-bottom:1px solid #1E2A3B">
        <div style="font-size:11px;letter-spacing:2px;color:#6366F1;font-weight:700">PRODIGY</div>
        <div style="font-size:10px;color:#475569;margin-top:2px">DATA EXPLORER</div>
      </div>

      <!-- WS status -->
      <div style="padding:8px 16px;display:flex;align-items:center;gap:6px;font-size:10px;color:#475569">
        <div :style="`width:6px;height:6px;border-radius:50%;background:${wsConnected ? '#34D399' : '#F87171'}`"></div>
        {{ wsConnected ? 'LIVE' : 'OFFLINE' }}
      </div>

      <nav style="flex:1;padding:8px 0">
        <RouterLink
          v-for="item in nav"
          :key="item.path"
          :to="item.path"
          style="display:block;padding:10px 16px;font-size:11px;letter-spacing:1px;text-decoration:none;transition:all 0.15s"
          :style="{
            color: route.path === item.path ? '#6366F1' : '#64748B',
            background: route.path === item.path ? '#1E2A3B' : 'transparent',
            borderLeft: route.path === item.path ? '2px solid #6366F1' : '2px solid transparent',
          }"
        >{{ item.label }}</RouterLink>
      </nav>
    </aside>

    <!-- Content -->
    <main style="flex:1;overflow:auto;background:#0B0F1A">
      <RouterView />
    </main>
  </div>
</template>
