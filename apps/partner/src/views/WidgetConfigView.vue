<script setup lang="ts">
import { computed, ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { Sliders, ExternalLink, Copy, Check } from 'lucide-vue-next'
import AppLayout from '../layouts/AppLayout.vue'
import { apiFetch } from '../composables/useApi'
import { useAuthStore } from '../stores/auth'
import { InfoSection, DefinitionList, Button, Badge } from '@prodigy/ui'

interface WidgetConfig {
  id: string
  b2bClientId: string
  name: string
  status: string
  allowedFiatCurrencies: string
  allowedCryptoCurrencies: string
  defaultFiatCurrency: string
  defaultCryptoCurrency: string
  themeMode: string
  primaryColorToken: string
  redirectUrl?: string | null
  webhookUrl?: string | null
  createdAt: string
  updatedAt: string
}

interface WidgetConfigsResponse {
  items: WidgetConfig[]
}

const authStore = useAuthStore()
const b2bClientId = computed(() => authStore.user?.attributedToB2BClientId ?? null)

const { data, isPending } = useQuery({
  queryKey: ['widget-config', b2bClientId],
  queryFn: async () => {
    if (!b2bClientId.value) return null
    return apiFetch<WidgetConfigsResponse>(`/widget-configs?b2bClientId=${b2bClientId.value}`)
  },
  enabled: computed(() => !!b2bClientId.value),
})

const config = computed(() => data.value?.items?.[0] ?? null)

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

const definitionItems = computed(() => {
  const c = config.value
  if (!c) return []
  return [
    { label: 'Config Name', value: c.name },
    { label: 'Primary Color Token', value: c.primaryColorToken },
    { label: 'Default Fiat Currency', value: c.defaultFiatCurrency },
    { label: 'Default Crypto Currency', value: c.defaultCryptoCurrency },
    { label: 'Allowed Fiat Currencies', value: c.allowedFiatCurrencies },
    { label: 'Allowed Crypto Currencies', value: c.allowedCryptoCurrencies },
    { label: 'Status', value: c.status, type: 'status' as const },
    { label: 'Created At', value: formatDate(c.createdAt) },
  ]
})

const previewUrl = computed(() =>
  b2bClientId.value ? `http://localhost:5005?b2bClientId=${b2bClientId.value}` : 'http://localhost:5005',
)

const copiedWebhook = ref(false)
const copiedRedirect = ref(false)

async function copyToClipboard(text: string, target: 'webhook' | 'redirect') {
  await navigator.clipboard.writeText(text)
  if (target === 'webhook') {
    copiedWebhook.value = true
    setTimeout(() => (copiedWebhook.value = false), 2000)
  } else {
    copiedRedirect.value = true
    setTimeout(() => (copiedRedirect.value = false), 2000)
  }
}
</script>

<template>
  <AppLayout>
    <div class="p-8 max-w-2xl">
      <!-- Header -->
      <div class="mb-6 flex items-center gap-3">
        <div class="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
          <Sliders class="w-5 h-5 text-brand-600" />
        </div>
        <div>
          <h1 class="text-xl font-semibold text-slate-900">Widget Config</h1>
          <p class="text-slate-500 text-sm mt-0.5">Your partner widget configuration (read-only)</p>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="isPending" class="flex items-center justify-center py-20">
        <div class="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>

      <!-- No b2bClientId -->
      <div
        v-else-if="!b2bClientId"
        class="rounded-lg border border-warning-200 bg-warning-50 px-5 py-4 text-sm text-warning-700"
      >
        No B2B client associated with your account. Please contact support.
      </div>

      <!-- No config found -->
      <div
        v-else-if="!config"
        class="rounded-lg border border-slate-200 bg-white px-5 py-10 text-center text-slate-500 text-sm"
      >
        No widget configuration found for your account.
      </div>

      <!-- Config display -->
      <template v-else>
        <InfoSection title="Widget Configuration" class="mb-6">
          <!-- Theme mode badge inline -->
          <div class="mb-5 flex items-center gap-2">
            <span class="text-xs font-medium uppercase tracking-wide text-slate-500">Theme Mode</span>
            <Badge
              :variant="config.themeMode === 'dark' ? 'neutral' : 'default'"
            >
              {{ config.themeMode }}
            </Badge>
          </div>

          <DefinitionList :items="definitionItems" :columns="2" />

          <!-- Webhook URL -->
          <div v-if="config.webhookUrl" class="mt-5 border-t border-slate-100 pt-4">
            <p class="text-xs font-medium uppercase tracking-wide text-slate-500 mb-2">Webhook URL</p>
            <div class="flex items-center gap-2">
              <code class="flex-1 font-mono text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 truncate">
                {{ config.webhookUrl }}
              </code>
              <button
                class="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-medium transition-colors flex-shrink-0"
                :title="copiedWebhook ? 'Copied!' : 'Copy webhook URL'"
                @click="copyToClipboard(config.webhookUrl!, 'webhook')"
              >
                <component :is="copiedWebhook ? Check : Copy" class="w-3.5 h-3.5" />
                {{ copiedWebhook ? 'Copied' : 'Copy' }}
              </button>
            </div>
          </div>

          <!-- Redirect URL -->
          <div v-if="config.redirectUrl" class="mt-4">
            <p class="text-xs font-medium uppercase tracking-wide text-slate-500 mb-2">Redirect URL</p>
            <div class="flex items-center gap-2">
              <code class="flex-1 font-mono text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 truncate">
                {{ config.redirectUrl }}
              </code>
              <button
                class="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-medium transition-colors flex-shrink-0"
                :title="copiedRedirect ? 'Copied!' : 'Copy redirect URL'"
                @click="copyToClipboard(config.redirectUrl!, 'redirect')"
              >
                <component :is="copiedRedirect ? Check : Copy" class="w-3.5 h-3.5" />
                {{ copiedRedirect ? 'Copied' : 'Copy' }}
              </button>
            </div>
          </div>
        </InfoSection>

        <!-- Preview section -->
        <div class="rounded-lg border border-slate-200 bg-white px-5 py-5">
          <h3 class="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-3">Preview</h3>
          <p class="text-sm text-slate-500 mb-4">
            Open the widget in a new tab to preview the end-user experience.
          </p>
          <a
            :href="previewUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="sm">
              <ExternalLink class="w-3.5 h-3.5 mr-1.5" />
              Open Widget Preview →
            </Button>
          </a>
        </div>
      </template>
    </div>
  </AppLayout>
</template>
