<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { useAuthStore } from '@/stores/auth'
import { apiFetch } from '@/composables/useApi'
import AppLayout from '@/components/AppLayout.vue'
import { Search, Plus, Trash2, Send, AlertCircle, User } from 'lucide-vue-next'

const auth = useAuthStore()
const router = useRouter()
const queryClient = useQueryClient()
const search = ref('')
const showAdd = ref(false)
const deleteConfirm = ref<string | null>(null)

// Form state
const newName = ref('')
const newEmail = ref('')
const newType = ref<'risely' | 'fiat_external' | 'crypto_external'>('risely')
const newIban = ref('')
const newWalletAddress = ref('')
const newCurrency = ref('EUR')

const { data, isLoading, isError, refetch } = useQuery({
  queryKey: ['beneficiaries', auth.user?.id],
  queryFn: () => apiFetch(`/beneficiaries?userId=${auth.user!.id}`),
  enabled: computed(() => !!auth.user?.id),
})

const beneficiaries = computed(() => {
  const items = data.value?.items ?? []
  if (!search.value) return items
  const q = search.value.toLowerCase()
  return items.filter((b: any) =>
    b.name?.toLowerCase().includes(q) || b.email?.toLowerCase().includes(q)
  )
})

const addMutation = useMutation({
  mutationFn: () => apiFetch('/beneficiaries', {
    method: 'POST',
    body: JSON.stringify({
      userId: auth.user!.id,
      name: newName.value.trim(),
      email: newEmail.value.trim() || undefined,
      type: newType.value,
      iban: newType.value === 'fiat_external' ? newIban.value.trim() : undefined,
      walletAddress: newType.value === 'crypto_external' ? newWalletAddress.value.trim() : undefined,
      currency: newCurrency.value,
    }),
  }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['beneficiaries', auth.user?.id] })
    showAdd.value = false
    newName.value = ''
    newEmail.value = ''
    newIban.value = ''
    newWalletAddress.value = ''
  },
})

const deleteMutation = useMutation({
  mutationFn: (id: string) => apiFetch(`/beneficiaries/${id}`, { method: 'DELETE' }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['beneficiaries', auth.user?.id] })
    deleteConfirm.value = null
  },
})

const typeLabel: Record<string, string> = {
  risely: 'Prodigy',
  fiat_external: 'Bank Transfer',
  crypto_external: 'Crypto',
}
const typeColor: Record<string, string> = {
  risely: 'bg-brand-50 text-brand-600',
  fiat_external: 'bg-success-50 text-success-600',
  crypto_external: 'bg-warning-50 text-warning-600',
}

function sendTo(b: any) {
  const params = new URLSearchParams()
  if (b.email) params.set('toEmail', b.email)
  if (b.iban) params.set('toIban', b.iban)
  if (b.walletAddress) params.set('toAddress', b.walletAddress)
  params.set('toName', b.name)
  params.set('currency', b.currency ?? 'EUR')
  router.push(`/send?${params}`)
}
</script>

<template>
  <AppLayout>
    <div class="px-4 pt-12 pb-6">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold text-slate-900">Beneficiaries</h1>
        <button
          @click="showAdd = !showAdd"
          class="flex items-center gap-1.5 h-9 px-3 bg-brand-600 text-white text-sm font-semibold rounded-xl hover:bg-brand-700 active:scale-[0.98] transition"
        >
          <Plus class="w-4 h-4" /> Add
        </button>
      </div>

      <!-- Add form -->
      <div v-if="showAdd" class="bg-white rounded-2xl p-4 mb-4 space-y-3">
        <h2 class="text-sm font-semibold text-slate-800">New beneficiary</h2>

        <div>
          <label class="text-xs text-slate-400 mb-1 block">Name *</label>
          <input v-model="newName" placeholder="Full name" class="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>

        <div>
          <label class="text-xs text-slate-400 mb-1 block">Type</label>
          <select v-model="newType" class="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white">
            <option value="risely">Prodigy user</option>
            <option value="fiat_external">Bank transfer (IBAN)</option>
            <option value="crypto_external">Crypto wallet</option>
          </select>
        </div>

        <div>
          <label class="text-xs text-slate-400 mb-1 block">Email</label>
          <input v-model="newEmail" type="email" placeholder="name@example.com" class="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>

        <div v-if="newType === 'fiat_external'">
          <label class="text-xs text-slate-400 mb-1 block">IBAN</label>
          <input v-model="newIban" placeholder="DE89..." class="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>

        <div v-if="newType === 'crypto_external'">
          <label class="text-xs text-slate-400 mb-1 block">Wallet address</label>
          <input v-model="newWalletAddress" placeholder="0x..." class="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>

        <div class="flex gap-2">
          <button
            @click="addMutation.mutate()"
            :disabled="!newName.trim() || addMutation.isPending.value"
            class="flex-1 h-10 bg-brand-600 text-white text-sm font-semibold rounded-xl disabled:opacity-50 hover:bg-brand-700 active:scale-[0.98] transition"
          >
            {{ addMutation.isPending.value ? 'Saving...' : 'Save beneficiary' }}
          </button>
          <button @click="showAdd = false" class="h-10 px-4 border border-slate-200 text-slate-600 text-sm rounded-xl hover:bg-slate-50 active:scale-[0.98] transition">
            Cancel
          </button>
        </div>
      </div>

      <!-- Search -->
      <div class="relative mb-4">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input v-model="search" placeholder="Search beneficiaries..." class="w-full pl-9 pr-4 py-2.5 border border-slate-100 bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="space-y-3">
        <div v-for="i in 4" :key="i" class="h-16 bg-slate-100 rounded-2xl animate-pulse" />
      </div>

      <!-- Error -->
      <div v-else-if="isError" class="flex flex-col items-center py-10 text-center">
        <AlertCircle class="w-8 h-8 text-danger-400 mb-2" />
        <button @click="refetch()" class="text-sm text-brand-600 hover:underline">Retry</button>
      </div>

      <!-- Empty -->
      <div v-else-if="beneficiaries.length === 0" class="text-center py-10">
        <User class="w-10 h-10 text-slate-300 mx-auto mb-3" />
        <p class="text-slate-500 text-sm font-medium">No beneficiaries yet</p>
        <p class="text-slate-400 text-xs mt-1">Add people you send money to frequently</p>
      </div>

      <!-- List -->
      <div v-else class="space-y-2">
        <div
          v-for="b in beneficiaries"
          :key="b.id"
          class="bg-white rounded-2xl p-4 flex items-center gap-3"
        >
          <!-- Avatar -->
          <div class="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-sm shrink-0">
            {{ b.name.charAt(0).toUpperCase() }}
          </div>

          <!-- Info -->
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-slate-900 text-sm">{{ b.name }}</p>
            <p class="text-xs text-slate-400 mt-0.5 truncate">{{ b.email ?? b.iban ?? b.walletAddress ?? '—' }}</p>
          </div>

          <!-- Type badge -->
          <span :class="['text-[10px] font-semibold px-2 py-0.5 rounded-full', typeColor[b.type]]">
            {{ typeLabel[b.type] }}
          </span>

          <!-- Actions -->
          <div class="flex gap-1.5 shrink-0">
            <button
              @click="sendTo(b)"
              class="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center hover:bg-brand-100 active:scale-95 transition"
              title="Send"
            >
              <Send class="w-3.5 h-3.5 text-brand-600" />
            </button>
            <button
              v-if="deleteConfirm !== b.id"
              @click="deleteConfirm = b.id"
              class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-danger-50 hover:text-danger-600 active:scale-95 transition"
            >
              <Trash2 class="w-3.5 h-3.5 text-slate-400" />
            </button>
            <div v-else class="flex gap-1 items-center">
              <button @click="deleteMutation.mutate(b.id)" class="text-xs text-danger-600 font-semibold px-2 hover:underline">Delete</button>
              <button @click="deleteConfirm = null" class="text-xs text-slate-400 hover:text-slate-600">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>
