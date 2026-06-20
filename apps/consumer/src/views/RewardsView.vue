<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { useAuthStore } from '@/stores/auth'
import { fetchRewards } from '@/composables/useApi'
import type { RewardItem } from '@/composables/useApi'
import AppLayout from '@/components/AppLayout.vue'
import { Copy, Check, Gift, Users, Star, Zap, AlertCircle } from 'lucide-vue-next'

const auth = useAuthStore()
const copied = ref(false)

const { data, isLoading, isError, error, refetch } = useQuery({
  queryKey: ['rewards', auth.user?.id],
  queryFn: () => fetchRewards(auth.user!.id),
  enabled: computed(() => !!auth.user?.id),
})

const reward = computed<RewardItem | null>(() => data.value?.items?.[0] ?? null)

const referralCode = computed(() => reward.value?.referralCode ?? '—')
const rewardBalance = computed(() => reward.value?.rewardBalance ?? 0)
const verifiedReferrals = computed(() => reward.value?.verifiedReferrals ?? 0)
const history = computed(() => reward.value?.history ?? [])

const totalEarned = computed(() =>
  history.value.reduce((sum, h) => sum + h.amount, 0)
)

async function copyCode() {
  if (!reward.value?.referralCode) return
  try {
    const inviteLink = `https://prodigy.finance/ref/${reward.value.referralCode}`
    await navigator.clipboard.writeText(inviteLink)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {
    // clipboard not available
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

function badgeClass(type: string) {
  if (type === 'bonus') return 'bg-success-50 text-success-600'
  return 'bg-brand-50 text-brand-600'
}

const steps = [
  { icon: Gift, title: 'Share your code', description: 'Share your unique referral code with friends' },
  { icon: Users, title: 'Friend signs up', description: 'They register and complete KYC' },
  { icon: Star, title: 'You both earn €10', description: 'Reward credited automatically' },
]
</script>

<template>
  <AppLayout>
    <div class="px-4 pt-12 pb-6">
      <!-- Header -->
      <div class="mb-5">
        <h1 class="text-2xl font-bold text-slate-900">Rewards</h1>
        <p class="text-slate-500 text-sm mt-0.5">Refer friends and earn together</p>
      </div>

      <!-- Loading skeleton -->
      <template v-if="isLoading">
        <div class="skeleton h-44 rounded-2xl mb-4" />
        <div class="grid grid-cols-2 gap-3 mb-4">
          <div class="skeleton h-20 rounded-2xl" />
          <div class="skeleton h-20 rounded-2xl" />
        </div>
        <div class="skeleton h-40 rounded-2xl mb-4" />
        <div class="skeleton h-32 rounded-2xl" />
      </template>

      <!-- Error state -->
      <div v-else-if="isError" class="flex flex-col items-center py-16 text-center">
        <div class="w-12 h-12 rounded-full bg-danger-50 flex items-center justify-center mb-4">
          <AlertCircle class="w-6 h-6 text-danger-500" />
        </div>
        <p class="text-slate-700 font-medium mb-1">Couldn't load data</p>
        <p class="text-slate-400 text-sm mb-4">{{ (error as Error)?.message || 'Something went wrong' }}</p>
        <button @click="refetch()" class="text-sm text-brand-600 font-medium hover:underline">Try again</button>
      </div>

      <template v-else>
        <!-- Hero card -->
        <div class="relative rounded-2xl overflow-hidden mb-4 bg-gradient-to-br from-brand-600 to-brand-800 p-5 shadow-lg">
          <div class="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
          <div class="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/10" />

          <div class="relative">
            <div class="flex items-center gap-2 mb-3">
              <Gift :size="20" class="text-brand-200" />
              <h2 class="text-lg font-bold text-white">Refer &amp; Earn</h2>
            </div>

            <!-- Referral code row -->
            <div class="flex items-center gap-3 bg-white/15 rounded-xl px-4 py-3 mb-3">
              <span class="font-mono text-xl font-bold text-white tracking-widest flex-1">
                {{ referralCode }}
              </span>
              <button
                @click="copyCode"
                :class="[
                  'shrink-0 flex items-center gap-1.5 px-3 h-9 rounded-lg text-xs font-semibold transition active:scale-90',
                  copied ? 'bg-success-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                ]"
                :title="copied ? 'Copied!' : 'Copy invite link'"
              >
                <Check v-if="copied" :size="14" />
                <Copy v-else :size="14" />
                <span>{{ copied ? 'Copied!' : 'Copy invite link' }}</span>
              </button>
            </div>
            <Transition name="fade">
              <p v-if="copied" class="text-success-300 text-xs font-medium mb-2">Copied to clipboard!</p>
            </Transition>

            <!-- Balance + friends -->
            <p class="text-brand-100 text-sm font-semibold">
              €{{ rewardBalance.toFixed(2) }} reward balance
            </p>
            <p class="text-brand-200 text-xs mt-0.5">
              {{ verifiedReferrals }} friend{{ verifiedReferrals === 1 ? '' : 's' }} joined
            </p>
          </div>
        </div>

        <!-- Stats row -->
        <div class="grid grid-cols-2 gap-3 mb-4">
          <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <p class="text-xs text-slate-400 font-medium mb-1">Verified Referrals</p>
            <p class="text-2xl font-bold text-slate-900">{{ verifiedReferrals }}</p>
          </div>
          <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <p class="text-xs text-slate-400 font-medium mb-1">Total Earned</p>
            <p class="text-2xl font-bold text-slate-900">€{{ totalEarned.toFixed(2) }}</p>
          </div>
        </div>

        <!-- How it works -->
        <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-4">
          <h3 class="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">How it works</h3>
          <div class="space-y-3">
            <div
              v-for="(step, idx) in steps"
              :key="idx"
              class="flex items-start gap-3"
            >
              <div class="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                <component :is="step.icon" :size="18" class="text-brand-600" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-slate-900">{{ step.title }}</p>
                <p class="text-xs text-slate-400 mt-0.5">{{ step.description }}</p>
              </div>
              <span class="text-xs font-bold text-slate-300 shrink-0 mt-1">{{ idx + 1 }}</span>
            </div>
          </div>
        </div>

        <!-- History -->
        <div>
          <h3 class="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">History</h3>

          <!-- Empty state -->
          <div v-if="history.length === 0" class="bg-white rounded-2xl p-8 text-center shadow-sm border border-slate-100">
            <Zap :size="32" class="text-slate-200 mx-auto mb-3" />
            <p class="text-slate-400 text-sm">No rewards yet — share your code to get started</p>
          </div>

          <!-- History list -->
          <div v-else class="space-y-2">
            <div
              v-for="entry in history"
              :key="entry.id"
              class="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-slate-100"
            >
              <span
                :class="['px-2 py-1 rounded-lg text-xs font-semibold capitalize shrink-0', badgeClass(entry.type)]"
              >
                {{ entry.type }}
              </span>
              <p class="flex-1 text-sm text-slate-700 min-w-0 truncate">{{ entry.description }}</p>
              <div class="text-right shrink-0">
                <p class="text-sm font-bold text-success-600">+€{{ entry.amount.toFixed(2) }}</p>
                <p class="text-xs text-slate-400 mt-0.5">{{ formatDate(entry.createdAt) }}</p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </AppLayout>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
