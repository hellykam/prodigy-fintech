<script setup lang="ts">
import { computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { RouterLink } from 'vue-router'
import { TrendingUp, ArrowLeftRight, CheckCircle, Clock, DollarSign, CalendarClock, AlertCircle } from 'lucide-vue-next'
import AppLayout from '../layouts/AppLayout.vue'
import { apiFetch } from '../composables/useApi'
import { useAuthStore } from '../stores/auth'
import { StatusPill, Card, Button } from '@prodigy/ui'

interface Transaction {
  id: string
  status: string
  sourceAmount: number
  sourceCurrency: string
  targetAmount: number
  targetCurrency: string
  createdAt: string
  user?: { email: string }
}

interface PartnerCommission {
  id: string
  amount: number
  currency: string
  status: string
  transactionId: string
  createdAt: string
}

const auth = useAuthStore()
const b2bClientId = computed(() => auth.user?.attributedToB2BClientId)

const { data: txData, isPending: txPending, isError: txError, error: txErrorObj, refetch: refetchTx } = useQuery({
  queryKey: ['partner-transactions', b2bClientId],
  queryFn: () => apiFetch<{ items: Transaction[] }>(`/transactions?b2bClientId=${b2bClientId.value}&limit=50`),
  enabled: computed(() => !!b2bClientId.value),
})

const { data: commData } = useQuery({
  queryKey: ['partner-commissions-summary', b2bClientId],
  queryFn: () => apiFetch<{ items: PartnerCommission[] }>(`/partner-commissions?b2bClientId=${b2bClientId.value}`),
  enabled: computed(() => !!b2bClientId.value),
})

const transactions = computed(() => txData.value?.items ?? [])
const commissions = computed(() => commData.value?.items ?? [])

const totalVolume = computed(() =>
  transactions.value
    .filter((t) => t.status === 'completed')
    .reduce((sum, t) => sum + t.sourceAmount, 0),
)

const totalCount = computed(() => transactions.value.length)
const completedCount = computed(() => transactions.value.filter((t) => t.status === 'completed').length)
const pendingCount = computed(() =>
  transactions.value.filter((t) => ['pending', 'processing', 'created', 'risk_checking', 'market_executing', 'ledger_posting'].includes(t.status)).length,
)

const totalCommissions = computed(() =>
  commissions.value.reduce((sum, c) => sum + c.amount, 0),
)

// Revenue this month — sum of commissions created in current calendar month
const revenueThisMonth = computed(() => {
  const now = new Date()
  return commissions.value
    .filter((c) => {
      const d = new Date(c.createdAt)
      return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
    })
    .reduce((sum, c) => sum + c.amount, 0)
})

const recentTransactions = computed(() =>
  [...transactions.value].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5),
)

const recentCommissions = computed(() =>
  [...commissions.value].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3),
)

// Bar chart: last 7 transactions sorted by date
const chartTransactions = computed(() =>
  [...transactions.value]
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .slice(-7),
)

const maxAmount = computed(() =>
  Math.max(...chartTransactions.value.map((t) => t.sourceAmount), 1),
)

// Revenue bar chart: last 7 days commission totals
interface DayBar { label: string; amount: number }
const last7Days = computed<DayBar[]>(() => {
  const days: DayBar[] = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const label = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
    const key = d.toISOString().slice(0, 10)
    const amount = commissions.value
      .filter((c) => c.createdAt.slice(0, 10) === key)
      .reduce((sum, c) => sum + c.amount, 0)
    days.push({ label, amount })
  }
  return days
})

const maxDayAmount = computed(() =>
  Math.max(...last7Days.value.map((d) => d.amount), 1),
)

function formatCurrency(amount: number, currency = 'EUR') {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency }).format(amount)
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

const today = new Date().toLocaleDateString('en-GB', {
  weekday: 'long',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
})

const kpiCards = computed(() => [
  {
    label: 'Total Volume',
    value: formatCurrency(totalVolume.value),
    icon: TrendingUp,
    iconBg: 'bg-brand-50',
    iconColor: 'text-brand-600',
    border: 'border-l-4 border-l-brand-500',
  },
  {
    label: 'Total Transactions',
    value: totalCount.value.toString(),
    icon: ArrowLeftRight,
    iconBg: 'bg-info-50',
    iconColor: 'text-info-600',
    border: 'border-l-4 border-l-info-500',
  },
  {
    label: 'Completed',
    value: completedCount.value.toString(),
    icon: CheckCircle,
    iconBg: 'bg-success-50',
    iconColor: 'text-success-600',
    border: 'border-l-4 border-l-success-500',
  },
  {
    label: 'Pending / Processing',
    value: pendingCount.value.toString(),
    icon: Clock,
    iconBg: 'bg-warning-50',
    iconColor: 'text-warning-600',
    border: 'border-l-4 border-l-warning-500',
  },
])
</script>

<template>
  <AppLayout>
    <div class="p-8">
      <!-- Header -->
      <div class="mb-8 flex items-start justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-slate-900">Welcome back, {{ auth.user?.email ?? 'Partner' }}</h1>
          <p class="text-slate-500 text-sm mt-0.5">{{ today }}</p>
        </div>
        <!-- Next payout info -->
        <div class="flex items-center gap-2 text-sm text-slate-500">
          <CalendarClock class="w-4 h-4 text-slate-400 flex-shrink-0" />
          <span>Next settlement: <span class="font-medium text-slate-700">Friday, 20 Jun 2026</span></span>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="txPending">
        <!-- KPI card skeletons -->
        <div class="grid grid-cols-2 xl:grid-cols-6 gap-4 mb-8">
          <div v-for="i in 6" :key="i" class="bg-white rounded-xl p-4 border border-slate-100 flex items-start gap-4">
            <div class="w-10 h-10 bg-slate-100 rounded-lg animate-pulse shrink-0" />
            <div class="flex-1 space-y-2">
              <div class="h-2.5 bg-slate-100 rounded animate-pulse w-3/4" />
              <div class="h-5 bg-slate-100 rounded animate-pulse w-1/2" />
            </div>
          </div>
        </div>
        <!-- Table skeleton -->
        <div class="bg-white rounded-xl border border-slate-100 overflow-hidden">
          <div class="h-12 bg-slate-50 border-b border-slate-100" />
          <div v-for="i in 8" :key="i" class="flex gap-4 px-5 py-3 border-b border-slate-50">
            <div class="h-4 bg-slate-100 rounded animate-pulse w-20" />
            <div class="h-4 bg-slate-100 rounded animate-pulse w-24" />
            <div class="h-4 bg-slate-100 rounded animate-pulse w-16" />
            <div class="h-4 bg-slate-100 rounded animate-pulse w-32 ml-auto" />
          </div>
        </div>
      </div>

      <!-- Error state -->
      <div v-else-if="txError" class="flex flex-col items-center py-20 text-center">
        <div class="w-12 h-12 rounded-full bg-danger-50 flex items-center justify-center mb-4">
          <AlertCircle class="w-6 h-6 text-danger-500" />
        </div>
        <p class="text-slate-700 font-medium mb-1">Couldn't load data</p>
        <p class="text-slate-400 text-sm mb-4">{{ (txErrorObj as Error)?.message || 'Something went wrong' }}</p>
        <button @click="refetchTx()" class="text-sm text-brand-600 font-medium hover:underline">Try again</button>
      </div>

      <template v-else>
        <!-- KPI Cards -->
        <div class="grid grid-cols-2 xl:grid-cols-6 gap-4 mb-8">
          <Card
            v-for="kpi in kpiCards"
            :key="kpi.label"
            class="flex items-start gap-4 overflow-hidden"
            :class="kpi.border"
          >
            <div :class="['w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', kpi.iconBg]">
              <component :is="kpi.icon" :class="['w-5 h-5', kpi.iconColor]" />
            </div>
            <div>
              <p class="text-xs text-slate-500 font-medium uppercase tracking-wide">{{ kpi.label }}</p>
              <p class="text-xl font-bold text-slate-900 mt-0.5">{{ kpi.value }}</p>
            </div>
          </Card>

          <!-- Commissions KPI — accent -->
          <Card class="flex items-start gap-4 bg-success-50 border-success-200 border-l-4 border-l-success-500 overflow-hidden">
            <div class="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <DollarSign class="w-5 h-5 text-success-600" />
            </div>
            <div>
              <p class="text-xs text-success-700 font-medium uppercase tracking-wide">Commissions Earned</p>
              <p class="text-xl font-bold text-success-900 mt-0.5">{{ formatCurrency(totalCommissions) }}</p>
            </div>
          </Card>

          <!-- Revenue This Month -->
          <Card class="flex items-start gap-4 border-l-4 border-l-brand-500 overflow-hidden">
            <div class="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
              <CalendarClock class="w-5 h-5 text-brand-600" />
            </div>
            <div>
              <p class="text-xs text-slate-500 font-medium uppercase tracking-wide">Revenue This Month</p>
              <p class="text-xl font-bold text-slate-900 mt-0.5">{{ formatCurrency(revenueThisMonth) }}</p>
            </div>
          </Card>
        </div>

        <!-- Bottom section: charts + commissions -->
        <div class="grid grid-cols-3 gap-6 mb-6">
          <!-- Charts column -->
          <div class="col-span-2 flex flex-col gap-4">
            <!-- Volume Chart — last 7 transactions -->
            <Card class="p-5">
              <h2 class="text-sm font-semibold text-slate-700 mb-4">Volume — Last 7 Transactions</h2>
              <div v-if="chartTransactions.length === 0" class="flex items-center justify-center h-32 text-slate-400 text-sm">
                No transaction data
              </div>
              <div v-else class="flex items-end gap-2 h-32">
                <div
                  v-for="tx in chartTransactions"
                  :key="tx.id"
                  class="flex-1 flex flex-col items-center gap-1.5 group"
                >
                  <div class="relative w-full flex items-end justify-center h-28">
                    <div
                      class="w-full rounded-t transition-colors cursor-default"
                      :class="tx.status === 'completed' ? 'bg-brand-500 group-hover:bg-brand-600' : 'bg-warning-400 group-hover:bg-warning-500'"
                      :style="{ height: Math.max(4, (tx.sourceAmount / maxAmount) * 100) + '%' }"
                      :title="formatCurrency(tx.sourceAmount, tx.sourceCurrency)"
                    />
                  </div>
                  <span class="text-2xs text-slate-400 text-center truncate w-full px-0.5">
                    {{ tx.id.slice(-4) }}
                  </span>
                </div>
              </div>
            </Card>

            <!-- Revenue bar chart — last 7 days commissions -->
            <Card class="p-5">
              <h2 class="text-sm font-semibold text-slate-700 mb-4">Revenue — Last 7 Days</h2>
              <div class="flex items-end gap-1 h-12">
                <div
                  v-for="day in last7Days"
                  :key="day.label"
                  class="flex-1 bg-brand-500 rounded-t min-h-[2px] transition-all"
                  :style="{ height: `${Math.max(2, (day.amount / maxDayAmount) * 100)}%` }"
                  :title="`${day.label}: ${formatCurrency(day.amount)}`"
                />
              </div>
              <div class="flex gap-1 mt-1.5">
                <span
                  v-for="day in last7Days"
                  :key="day.label + '-label'"
                  class="flex-1 text-center text-slate-400 truncate"
                  style="font-size: 9px;"
                >{{ day.label }}</span>
              </div>
            </Card>
          </div>

          <!-- Recent Commissions -->
          <Card class="p-5">
            <h2 class="text-sm font-semibold text-slate-700 mb-4">Recent Commissions</h2>
            <div class="space-y-3">
              <div
                v-for="comm in recentCommissions"
                :key="comm.id"
                class="flex items-center justify-between"
              >
                <div>
                  <p class="text-xs font-mono text-slate-500">{{ comm.id }}</p>
                  <p class="text-xs text-slate-400">{{ formatDate(comm.createdAt) }}</p>
                </div>
                <div class="text-right">
                  <p class="text-sm font-semibold text-slate-900">{{ formatCurrency(comm.amount, comm.currency) }}</p>
                  <span
                    class="text-xs font-medium px-1.5 py-0.5 rounded-full"
                    :class="comm.status === 'settled' ? 'bg-success-50 text-success-600' : 'bg-warning-50 text-warning-600'"
                  >
                    {{ comm.status }}
                  </span>
                </div>
              </div>
            </div>
            <RouterLink to="/commissions" class="block mt-4 text-xs text-brand-600 hover:text-brand-700 font-medium">
              View all →
            </RouterLink>
          </Card>
        </div>

        <!-- Recent Transactions Table -->
        <Card class="p-0 overflow-hidden">
          <div class="px-5 py-4 flex items-center justify-between border-b border-slate-100">
            <h2 class="text-sm font-semibold text-slate-700">Recent Transactions</h2>
            <RouterLink to="/transactions">
              <Button variant="outline" size="sm">View all</Button>
            </RouterLink>
          </div>

          <div v-if="recentTransactions.length === 0" class="px-5 py-10 text-center text-slate-400 text-sm">
            No transactions yet
          </div>

          <table v-else class="w-full text-sm">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-100">
                <th class="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-2.5">ID</th>
                <th class="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-2.5">Amount</th>
                <th class="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-2.5">Status</th>
                <th class="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-2.5">User</th>
                <th class="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-2.5">Date</th>
              </tr>
            </thead>
            <TransitionGroup name="card-list" tag="tbody">
              <tr
                v-for="tx in recentTransactions"
                :key="tx.id"
                class="border-b border-slate-50 hover:bg-slate-50 transition-colors"
              >
                <td class="px-5 py-3">
                  <span class="font-mono text-xs text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                    {{ tx.id.slice(0, 8) }}
                  </span>
                </td>
                <td class="px-4 py-3 font-medium text-slate-900">
                  {{ formatCurrency(tx.sourceAmount, tx.sourceCurrency) }}
                </td>
                <td class="px-4 py-3">
                  <StatusPill :status="tx.status" />
                </td>
                <td class="px-4 py-3 text-slate-500 text-xs">{{ tx.user?.email ?? '—' }}</td>
                <td class="px-4 py-3 text-slate-500 text-xs">{{ formatDate(tx.createdAt) }}</td>
              </tr>
            </TransitionGroup>
          </table>
        </Card>
      </template>
    </div>
  </AppLayout>
</template>

<style>
.card-list-enter-active { transition: all 0.3s ease-out; }
.card-list-enter-from { opacity: 0; transform: translateY(-8px); }
.card-list-leave-active { transition: none; position: absolute; }
</style>
