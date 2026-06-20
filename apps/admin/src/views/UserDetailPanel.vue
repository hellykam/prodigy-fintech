<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { X } from 'lucide-vue-next'
import { StatusPill, Badge, Button, Breadcrumb } from '@prodigy/ui'
import { apiFetch } from '../composables/useApi'

interface KycApplicant {
  id: string
  status: string
  level: string
  firstName: string
  lastName: string
  dateOfBirth: string
  country: string
  documentStatus: string
}

interface Wallet {
  id: string
  currency: string
  address: string
  balance: number
}

interface BankAccount {
  id: string
  iban: string
  currency: string
  balance: number
}

interface Transaction {
  id: string
  sourceCurrency: string
  sourceAmount: number
  targetCurrency: string
  targetAmount: number
  status: string
  createdAt: string
}

interface UserDetail {
  id: string
  email: string
  status: string
  kycStatus: string
  riskLevel: string
  createdAt: string
  kycApplicants: KycApplicant[]
  wallets: Wallet[]
  bankAccounts: BankAccount[]
  transactions: Transaction[]
}

const router = useRouter()
const route = useRoute()
const queryClient = useQueryClient()

const userId = computed(() => route.params.id as string)

const { data: user, isLoading } = useQuery({
  queryKey: computed(() => ['user', userId.value]),
  queryFn: () => apiFetch<UserDetail>(`/api/users/${userId.value}`),
  enabled: computed(() => !!userId.value),
})

function close() {
  router.push('/customers')
}

// KYC approve/reject
const kycActionError = ref('')
const kycActionSuccess = ref('')

const approveMutation = useMutation({
  mutationFn: (kycId: string) =>
    apiFetch<{ ok: boolean }>(`/api/kyc/applicants/${kycId}/approve`, { method: 'POST' }),
  onSuccess: () => {
    kycActionSuccess.value = 'KYC approved.'
    kycActionError.value = ''
    queryClient.invalidateQueries({ queryKey: ['user', userId.value] })
    queryClient.invalidateQueries({ queryKey: ['users'] })
  },
  onError: (err: Error) => {
    kycActionError.value = err.message
    kycActionSuccess.value = ''
  },
})

const rejectMutation = useMutation({
  mutationFn: (kycId: string) =>
    apiFetch<{ ok: boolean }>(`/api/kyc/applicants/${kycId}/reject`, { method: 'POST' }),
  onSuccess: () => {
    kycActionSuccess.value = 'KYC rejected.'
    kycActionError.value = ''
    queryClient.invalidateQueries({ queryKey: ['user', userId.value] })
    queryClient.invalidateQueries({ queryKey: ['users'] })
  },
  onError: (err: Error) => {
    kycActionError.value = err.message
    kycActionSuccess.value = ''
  },
})

function formatDate(ts: string) {
  return new Date(ts).toLocaleDateString()
}

function formatDateTime(ts: string) {
  return new Date(ts).toLocaleString()
}

function riskVariant(level: string): 'success' | 'warning' | 'danger' | 'neutral' {
  if (level === 'low') return 'success'
  if (level === 'medium') return 'warning'
  if (level === 'high') return 'danger'
  return 'neutral'
}

const latestKyc = computed(() => user.value?.kycApplicants?.[0] ?? null)
</script>

<template>
  <aside
    class="w-[480px] flex-shrink-0 bg-white border-l border-slate-200 shadow-side-panel flex flex-col overflow-hidden transition-transform duration-200 ease-in-out"
  >
    <!-- Header -->
    <div class="flex items-center justify-between px-5 py-4 border-b border-slate-200 flex-shrink-0">
      <h2 class="text-base font-semibold text-slate-900">User Detail</h2>
      <button
        class="inline-flex items-center justify-center w-8 h-8 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        @click="close"
      >
        <X class="inline-flex w-4 h-4" />
      </button>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="flex-1 flex items-center justify-center text-sm text-slate-400">
      Loading...
    </div>

    <!-- Content -->
    <div v-else-if="user" class="flex-1 overflow-y-auto">
      <!-- Breadcrumb -->
      <div class="px-5 pt-4">
        <Breadcrumb :items="[{ label: 'Customers', href: '/customers' }, { label: user?.email || '...' }]" />
      </div>
      <!-- User header -->
      <div class="px-5 py-4 border-b border-slate-100">
        <div class="text-sm font-semibold text-slate-900 mb-2">{{ user.email }}</div>
        <div class="flex flex-wrap gap-2">
          <StatusPill :status="user.status" />
          <StatusPill :status="user.kycStatus" />
          <Badge :variant="riskVariant(user.riskLevel)">Risk: {{ user.riskLevel }}</Badge>
        </div>
        <div class="mt-2 text-xs text-slate-400">Joined {{ formatDate(user.createdAt) }}</div>
      </div>

      <!-- KYC Section -->
      <div class="px-5 py-4 border-b border-slate-100">
        <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">KYC</h3>
        <div v-if="latestKyc">
          <div class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-4">
            <div class="text-slate-500">Status</div>
            <div><StatusPill :status="latestKyc.status" /></div>
            <div class="text-slate-500">Level</div>
            <div class="text-slate-800">{{ latestKyc.level }}</div>
            <div class="text-slate-500">Name</div>
            <div class="text-slate-800">{{ latestKyc.firstName }} {{ latestKyc.lastName }}</div>
            <div class="text-slate-500">DOB</div>
            <div class="text-slate-800">{{ latestKyc.dateOfBirth }}</div>
            <div class="text-slate-500">Country</div>
            <div class="text-slate-800">{{ latestKyc.country }}</div>
            <div class="text-slate-500">Document</div>
            <div><StatusPill :status="latestKyc.documentStatus" /></div>
          </div>
          <!-- Approve / Reject buttons (only when pending or manual_review) -->
          <div
            v-if="latestKyc.status === 'pending' || latestKyc.status === 'manual_review'"
            class="flex gap-2 flex-wrap"
          >
            <Button
              variant="primary"
              size="sm"
              :loading="approveMutation.isPending.value"
              :disabled="rejectMutation.isPending.value"
              @click="approveMutation.mutate(latestKyc.id)"
            >
              Approve KYC
            </Button>
            <Button
              variant="destructive"
              size="sm"
              :loading="rejectMutation.isPending.value"
              :disabled="approveMutation.isPending.value"
              @click="rejectMutation.mutate(latestKyc.id)"
            >
              Reject KYC
            </Button>
          </div>
          <p v-if="kycActionSuccess" class="mt-2 text-xs text-success-600">{{ kycActionSuccess }}</p>
          <p v-if="kycActionError" class="mt-2 text-xs text-danger-600">{{ kycActionError }}</p>
        </div>
        <div v-else class="text-sm text-slate-400">No KYC applicant on file</div>
      </div>

      <!-- Wallets -->
      <div class="px-5 py-4 border-b border-slate-100">
        <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Wallets</h3>
        <div v-if="user.wallets.length > 0" class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-slate-100">
                <th class="py-1.5 text-left text-xs font-medium text-slate-400 align-top">Currency</th>
                <th class="py-1.5 text-left text-xs font-medium text-slate-400 align-top">Address</th>
                <th class="py-1.5 text-right text-xs font-medium text-slate-400 align-top">Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="wallet in user.wallets" :key="wallet.id" class="border-b border-slate-50">
                <td class="py-2 align-top text-slate-700 font-medium">{{ wallet.currency }}</td>
                <td class="py-2 align-top font-mono text-xs text-slate-500">{{ wallet.address }}</td>
                <td class="py-2 align-top text-right text-slate-700">{{ wallet.balance }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="text-sm text-slate-400">No wallets</div>
      </div>

      <!-- Bank Accounts -->
      <div class="px-5 py-4 border-b border-slate-100">
        <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Bank Accounts</h3>
        <div v-if="user.bankAccounts.length > 0" class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-slate-100">
                <th class="py-1.5 text-left text-xs font-medium text-slate-400 align-top">IBAN</th>
                <th class="py-1.5 text-left text-xs font-medium text-slate-400 align-top">Currency</th>
                <th class="py-1.5 text-right text-xs font-medium text-slate-400 align-top">Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="acct in user.bankAccounts" :key="acct.id" class="border-b border-slate-50">
                <td class="py-2 align-top font-mono text-xs text-slate-500">{{ acct.iban }}</td>
                <td class="py-2 align-top text-slate-700">{{ acct.currency }}</td>
                <td class="py-2 align-top text-right text-slate-700">{{ acct.balance }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="text-sm text-slate-400">No bank accounts</div>
      </div>

      <!-- Recent Transactions -->
      <div class="px-5 py-4 border-b border-slate-100">
        <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Recent Transactions</h3>
        <div v-if="user.transactions.length > 0" class="space-y-2">
          <div
            v-for="tx in user.transactions.slice(0, 5)"
            :key="tx.id"
            class="flex items-start justify-between rounded-md border border-slate-100 px-3 py-2 hover:bg-slate-50 cursor-pointer transition-colors"
            @click="$router.push(`/transactions/${tx.id}`)"
          >
            <div>
              <span class="font-mono text-xs text-slate-600">{{ tx.id.slice(0, 8) }}</span>
              <div class="text-xs text-slate-500 mt-0.5">
                {{ tx.sourceAmount }} {{ tx.sourceCurrency }} → {{ tx.targetAmount }} {{ tx.targetCurrency }}
              </div>
            </div>
            <div class="flex flex-col items-end gap-1">
              <StatusPill :status="tx.status" />
              <span class="text-xs text-slate-400">{{ formatDateTime(tx.createdAt) }}</span>
            </div>
          </div>
        </div>
        <div v-else class="text-sm text-slate-400">No transactions</div>
      </div>

      <!-- View Activity link -->
      <div class="px-5 py-4">
        <Button
          variant="outline"
          size="sm"
          class="w-full"
          @click="$router.push(`/customers/${userId}/activity`)"
        >
          View Full Activity →
        </Button>
      </div>
    </div>
  </aside>
</template>
