<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { Mail, Inbox, AlertCircle } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import AppLayout from '@/components/AppLayout.vue'
import { EmptyState } from '@prodigy/ui'

const auth = useAuthStore()
const selectedId = ref<string | null>(null)
const activeTab = ref('All')

const typeToCategory: Record<string, string> = {
  kyc_accepted: 'KYC',
  kyc_rejected: 'KYC',
  transfer_in: 'Transfers',
  transfer_out: 'Transfers',
  transfer_between: 'Transfers',
  transfer_failed: 'Transfers',
  account_opened: 'Account',
}

const { data, isLoading, isError, error, refetch } = useQuery({
  queryKey: ['inbox', auth.user?.id],
  queryFn: async () => {
    const res = await fetch(`/api/notifications?channel=email&userId=${auth.user!.id}`)
    if (!res.ok) return { items: [] }
    return res.json()
  },
  enabled: computed(() => !!auth.user?.id),
})

const emails = computed(() => data.value?.items ?? [])
const selected = computed(() => emails.value.find((e: any) => e.id === selectedId.value))

const filteredNotifications = computed(() => {
  const all = emails.value
  if (activeTab.value === 'All') return all
  return all.filter((n: any) => typeToCategory[n.type] === activeTab.value)
})

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>

<template>
  <AppLayout>
    <div class="flex h-[calc(100vh-72px)] lg:h-screen overflow-hidden">
      <!-- Email list -->
      <div
        class="w-full lg:w-80 border-r border-slate-100 flex flex-col bg-white"
        :class="{ 'hidden lg:flex': !!selectedId }"
      >
        <div class="px-4 py-4 border-b border-slate-100">
          <h1 class="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <Inbox :size="20" /> Inbox
          </h1>
          <!-- Filter tabs: All | KYC | Transfers | Account -->
          <div class="flex gap-2 mt-3 overflow-x-auto pb-1">
            <button
              v-for="tab in ['All', 'KYC', 'Transfers', 'Account']"
              :key="tab"
              @click="activeTab = tab"
              :class="['h-8 px-4 rounded-full text-xs font-semibold transition whitespace-nowrap shrink-0',
                activeTab === tab ? 'bg-brand-600 text-white' : 'bg-white text-slate-500 hover:text-slate-700']"
            >
              {{ tab }}
            </button>
          </div>
        </div>
        <div class="flex-1 overflow-y-auto">
          <!-- Loading skeletons -->
          <div v-if="isLoading" class="p-3 space-y-2">
            <div v-for="i in 5" :key="i" class="flex items-start gap-3 p-3 rounded-xl">
              <div class="w-2 h-2 rounded-full bg-slate-100 mt-1.5 shrink-0 animate-pulse" />
              <div class="flex-1 space-y-2">
                <div class="h-3 bg-slate-100 rounded animate-pulse w-3/4" />
                <div class="h-2.5 bg-slate-100 rounded animate-pulse w-full" />
                <div class="h-2 bg-slate-100 rounded animate-pulse w-1/3" />
              </div>
            </div>
          </div>
          <!-- Error state -->
          <div v-else-if="isError" class="flex flex-col items-center py-10 px-4 text-center">
            <div class="w-10 h-10 rounded-full bg-danger-50 flex items-center justify-center mb-3">
              <AlertCircle class="w-5 h-5 text-danger-500" />
            </div>
            <p class="text-slate-700 font-medium text-sm mb-1">Couldn't load messages</p>
            <p class="text-slate-400 text-xs mb-3">{{ (error as Error)?.message || 'Something went wrong' }}</p>
            <button @click="refetch()" class="text-xs text-brand-600 font-medium hover:underline">Try again</button>
          </div>
          <!-- Empty state -->
          <div v-else-if="filteredNotifications.length === 0" class="p-6 text-center">
            <EmptyState
              title="Your inbox is empty"
              description="KYC confirmations and receipts appear here"
              icon="📬"
            />
          </div>
          <template v-else>
          <button
            v-for="email in filteredNotifications"
            :key="(email as any).id"
            @click="selectedId = (email as any).id"
            class="w-full text-left px-4 py-3 border-b border-slate-50 hover:bg-slate-50 transition"
            :class="{
              'bg-brand-50': (email as any).id === selectedId,
              'bg-white': (email as any).id !== selectedId,
            }"
          >
            <div
              :class="['flex items-start gap-3 rounded-xl p-1 -m-1', !(email as any).isRead ? 'border-l-2 border-brand-500 pl-2' : '']"
            >
              <div
                :class="[
                  'w-2 h-2 rounded-full mt-1.5 shrink-0',
                  (email as any).isRead ? 'bg-slate-200' : 'bg-brand-500',
                ]"
              />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-slate-900 truncate">{{ (email as any).title }}</p>
                <p class="text-xs text-slate-400 truncate">{{ (email as any).body }}</p>
                <p class="text-[10px] text-slate-300 mt-0.5">{{ formatDate((email as any).createdAt) }}</p>
              </div>
            </div>
          </button>
          </template>
        </div>
      </div>

      <!-- Email preview -->
      <div
        class="flex-1 flex flex-col bg-slate-50"
        :class="{ 'hidden lg:flex': !selectedId }"
      >
        <div v-if="!selected" class="flex-1 flex items-center justify-center text-slate-300">
          <div class="text-center">
            <Mail :size="48" class="mx-auto mb-3 opacity-20" />
            <p class="text-sm">Select a message</p>
          </div>
        </div>
        <div v-else class="flex-1 overflow-y-auto">
          <div class="max-w-2xl mx-auto p-6">
            <button
              @click="selectedId = null"
              class="lg:hidden mb-4 text-sm text-brand-600 hover:underline"
            >
              &larr; Back
            </button>
            <!-- Email chrome -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div class="bg-brand-600 px-6 py-4">
                <p class="text-xs text-brand-200 font-medium uppercase tracking-wider">Prodigy</p>
                <h2 class="text-white font-semibold text-lg mt-1">{{ (selected as any).title }}</h2>
                <p class="text-brand-200 text-xs mt-1">{{ formatDate((selected as any).createdAt) }}</p>
              </div>
              <div class="px-6 py-5">
                <p class="text-slate-700 text-sm leading-relaxed">{{ (selected as any).body }}</p>
                <div v-if="(selected as any).actionUrl" class="mt-6">
                  <RouterLink
                    :to="(selected as any).actionUrl"
                    class="inline-block bg-brand-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-brand-700 transition"
                  >
                    View Details
                  </RouterLink>
                </div>
                <p class="text-slate-400 text-xs mt-6 pt-4 border-t border-slate-100">
                  This is a simulated email from Prodigy Financial Services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>
