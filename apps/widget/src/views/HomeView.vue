<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { AlertCircle } from 'lucide-vue-next'
import { apiFetch } from '../composables/useApi'

interface B2BClient {
  id: string
  name: string
  status: string
  commissionSharePercent: number
}

const router = useRouter()
const clients = ref<B2BClient[]>([])
const isLoading = ref(true)
const isError = ref(false)
const error = ref<Error | null>(null)

async function fetchClients() {
  isLoading.value = true
  isError.value = false
  error.value = null
  try {
    const result = await apiFetch<{ items: B2BClient[] }>('/b2b-clients')
    clients.value = result.items
  } catch (e) {
    isError.value = true
    error.value = e instanceof Error ? e : new Error('Failed to load clients')
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchClients)

function openWidget(clientId: string) {
  router.push({ path: '/widget', query: { b2bClientId: clientId } })
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex items-start justify-center px-4 py-12">
    <div class="w-full max-w-[560px]">

      <!-- Header -->
      <div class="text-center mb-10">
        <div class="w-12 h-12 bg-brand-600 rounded-xl flex items-center justify-center mx-auto mb-4">
          <span class="text-white text-xl font-bold">P</span>
        </div>
        <h1 class="text-2xl font-bold text-slate-900 mb-2">Prodigy Widget</h1>
        <p class="text-sm text-slate-500">Select a B2B partner to open their widget</p>
      </div>

      <!-- Loading skeleton -->
      <div v-if="isLoading" class="space-y-3">
        <div v-for="i in 4" :key="i" class="h-14 bg-slate-100 rounded-xl animate-pulse" />
      </div>

      <!-- Error state -->
      <div v-else-if="isError" class="flex flex-col items-center py-8 text-center">
        <div class="w-10 h-10 rounded-full bg-danger-50 flex items-center justify-center mb-3">
          <AlertCircle class="w-5 h-5 text-danger-500" />
        </div>
        <p class="text-slate-700 text-sm font-medium mb-1">Something went wrong</p>
        <p class="text-slate-400 text-xs mb-3">{{ error?.message }}</p>
        <button @click="fetchClients()" class="text-xs text-brand-600 font-medium hover:underline">Try again</button>
      </div>

      <!-- Client list -->
      <ul v-else-if="clients.length" class="flex flex-col gap-3 list-none m-0 p-0">
        <li
          v-for="client in clients"
          :key="client.id"
          class="bg-white border border-slate-200 rounded-xl px-5 py-4 flex items-center justify-between gap-4"
        >
          <div class="flex flex-col gap-1 min-w-0">
            <span class="text-sm font-semibold text-slate-900">{{ client.name }}</span>
            <span class="text-xs text-slate-400 font-mono">ID: {{ client.id }}</span>
            <span
              class="text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full w-fit"
              :class="client.status === 'active'
                ? 'bg-success-50 text-success-700'
                : 'bg-slate-100 text-slate-500'"
            >{{ client.status }}</span>
          </div>
          <button
            class="shrink-0 bg-brand-600 hover:bg-brand-700 text-white border-none rounded-lg px-[18px] py-2 text-sm font-semibold cursor-pointer transition-colors whitespace-nowrap"
            @click="openWidget(client.id)"
          >
            Open Widget →
          </button>
        </li>
      </ul>

      <!-- Empty state -->
      <div v-else class="text-center py-10">
        <p class="text-slate-400 text-sm">No B2B clients found.</p>
      </div>

    </div>
  </div>
</template>
