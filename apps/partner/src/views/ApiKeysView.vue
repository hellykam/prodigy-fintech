<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Key, Plus, Trash2, Copy, Check, ChevronDown } from 'lucide-vue-next'
import AppLayout from '../layouts/AppLayout.vue'
import { Card, Button, StatusPill } from '@prodigy/ui'

interface ApiKey {
  id: string
  name: string
  masked: string
  environment: 'live' | 'test'
  created: string
  lastUsed: string
  revokeConfirm: boolean
  revoked: boolean
}

const keys = reactive<ApiKey[]>([
  {
    id: 'key_1',
    name: 'Production Integration',
    masked: 'pk_live_••••••••2a3f',
    environment: 'live',
    created: '2026-01-15',
    lastUsed: '2026-06-17',
    revokeConfirm: false,
    revoked: false,
  },
  {
    id: 'key_2',
    name: 'Sandbox Testing',
    masked: 'pk_test_••••••••9b1e',
    environment: 'test',
    created: '2026-02-20',
    lastUsed: '2026-06-10',
    revokeConfirm: false,
    revoked: false,
  },
])

const showCreateForm = ref(false)
const newKeyName = ref('')
const newKeyEnv = ref<'live' | 'test'>('test')
const createdKey = ref<string | null>(null)
const copied = ref(false)

function requestRevoke(key: ApiKey) {
  key.revokeConfirm = true
}

function cancelRevoke(key: ApiKey) {
  key.revokeConfirm = false
}

function confirmRevoke(key: ApiKey) {
  key.revoked = true
  key.revokeConfirm = false
}

function createKey() {
  if (!newKeyName.value.trim()) return
  const suffix = Math.random().toString(36).slice(2, 10)
  createdKey.value = `pk_${newKeyEnv.value === 'live' ? 'live' : 'test'}_${suffix}`
  newKeyName.value = ''
  newKeyEnv.value = 'test'
  showCreateForm.value = false
}

async function copyKey(text: string) {
  await navigator.clipboard.writeText(text)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}

function dismissCreatedKey() {
  createdKey.value = null
}

const iframeSnippet = `<iframe
  src="https://widget.prodigy.finance/buy?partner=neobank"
  width="420"
  height="600"
  frameborder="0"
  allow="camera; microphone"
/>`.trim()

const sdkSnippet = `import { ProdigySDK } from '@prodigy/sdk'

const prodigy = new ProdigySDK({
  apiKey: 'pk_live_••••••••2a3f',
  partner: 'neobank',
})

await prodigy.openWidget({
  userId: 'user_123',
  currency: 'EUR',
})`.trim()
</script>

<template>
  <AppLayout>
    <div class="p-8">
      <!-- Header -->
      <div class="mb-6 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-slate-900">API Keys</h1>
          <p class="text-slate-500 text-sm mt-0.5">Manage your integration credentials</p>
        </div>
        <Button @click="showCreateForm = !showCreateForm">
          <Plus class="w-4 h-4" />
          Create new key
        </Button>
      </div>

      <!-- Create form -->
      <Card v-if="showCreateForm" class="mb-6 border-brand-200 bg-brand-50">
        <h2 class="text-sm font-semibold text-slate-800 mb-4">Create new API key</h2>
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-xs font-medium text-slate-600 mb-1">Key name</label>
            <input
              v-model="newKeyName"
              type="text"
              placeholder="e.g. Mobile App Integration"
              class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
            />
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-600 mb-1">Environment</label>
            <div class="relative">
              <select
                v-model="newKeyEnv"
                class="w-full appearance-none border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="test">Test</option>
                <option value="live">Live</option>
              </select>
              <ChevronDown class="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <Button :disabled="!newKeyName.trim()" @click="createKey">Confirm &amp; create</Button>
          <Button variant="ghost" @click="showCreateForm = false">Cancel</Button>
        </div>
      </Card>

      <!-- Newly created key reveal -->
      <div v-if="createdKey" class="mb-6 border border-success-200 bg-success-50 rounded-lg p-4">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-sm font-semibold text-success-900 mb-1">Key created successfully</p>
            <p class="text-xs text-success-700 mb-3">Copy this key now — it won't be shown again.</p>
            <div class="flex items-center gap-2">
              <code class="font-mono text-sm bg-white border border-success-200 rounded px-3 py-1.5 text-slate-900 select-all">
                {{ createdKey }}
              </code>
              <button
                class="flex items-center gap-1.5 text-xs text-success-700 hover:text-success-900 font-medium transition-colors"
                @click="copyKey(createdKey!)"
              >
                <component :is="copied ? Check : Copy" class="w-3.5 h-3.5" />
                {{ copied ? 'Copied' : 'Copy' }}
              </button>
            </div>
          </div>
          <button class="text-success-600 hover:text-success-900 transition-colors text-xs font-medium" @click="dismissCreatedKey">
            Dismiss
          </button>
        </div>
      </div>

      <!-- Keys table -->
      <Card class="p-0 overflow-hidden mb-8">
        <div class="px-5 py-4 border-b border-slate-100">
          <h2 class="text-sm font-semibold text-slate-700">Your API keys</h2>
        </div>
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-100">
              <th class="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-3">Name</th>
              <th class="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">Key</th>
              <th class="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">Environment</th>
              <th class="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">Created</th>
              <th class="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">Last Used</th>
              <th class="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="key in keys"
              :key="key.id"
              class="border-b border-slate-50 hover:bg-slate-50 transition-colors"
              :class="{ 'opacity-50': key.revoked }"
            >
              <td class="px-5 py-3">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded bg-slate-100 flex items-center justify-center">
                    <Key class="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <span class="text-slate-900 font-medium text-sm">{{ key.name }}</span>
                </div>
              </td>
              <td class="px-4 py-3">
                <code class="font-mono text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded">
                  {{ key.masked }}
                </code>
              </td>
              <td class="px-4 py-3">
                <span
                  class="text-xs font-medium px-2 py-0.5 rounded-full"
                  :class="key.environment === 'live' ? 'bg-success-50 text-success-600' : 'bg-slate-100 text-slate-600'"
                >
                  {{ key.environment }}
                </span>
              </td>
              <td class="px-4 py-3 text-slate-500 text-xs">{{ key.created }}</td>
              <td class="px-4 py-3 text-slate-500 text-xs">{{ key.lastUsed }}</td>
              <td class="px-4 py-3">
                <div v-if="key.revoked" class="flex items-center gap-2">
                  <StatusPill status="cancelled" />
                  <span class="text-xs text-slate-400">Key revoked</span>
                </div>
                <div v-else-if="!key.revokeConfirm">
                  <button
                    class="flex items-center gap-1.5 text-xs text-danger-600 hover:text-danger-700 font-medium transition-colors"
                    @click="requestRevoke(key)"
                  >
                    <Trash2 class="w-3.5 h-3.5" />
                    Revoke
                  </button>
                </div>
                <div v-else class="flex items-center gap-2">
                  <span class="text-xs text-slate-700">Are you sure?</span>
                  <button
                    class="text-xs bg-danger-600 text-white px-2 py-0.5 rounded font-medium hover:bg-danger-700 transition-colors"
                    @click="confirmRevoke(key)"
                  >
                    Yes, revoke
                  </button>
                  <button
                    class="text-xs text-slate-500 hover:text-slate-700 font-medium transition-colors"
                    @click="cancelRevoke(key)"
                  >
                    Cancel
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>

      <!-- Integration guide -->
      <div class="space-y-6">
        <h2 class="text-lg font-semibold text-slate-900">Integration Guide</h2>

        <!-- iFrame embed -->
        <Card class="p-5">
          <h3 class="text-sm font-semibold text-slate-800 mb-1">iFrame Embed</h3>
          <p class="text-xs text-slate-500 mb-3">
            Drop the Prodigy widget into any web page with a single iframe tag. No JavaScript required.
          </p>
          <div class="bg-slate-900 rounded-lg p-4 overflow-x-auto">
            <pre class="font-mono text-xs text-slate-200 whitespace-pre">{{ iframeSnippet }}</pre>
          </div>
        </Card>

        <!-- JS SDK -->
        <Card class="p-5">
          <h3 class="text-sm font-semibold text-slate-800 mb-1">JavaScript SDK</h3>
          <p class="text-xs text-slate-500 mb-3">
            Use the Prodigy JS SDK for programmatic control — open the widget on demand, pass user context, and handle events.
          </p>
          <div class="bg-slate-900 rounded-lg p-4 overflow-x-auto">
            <pre class="font-mono text-xs text-slate-200 whitespace-pre">{{ sdkSnippet }}</pre>
          </div>
          <div class="mt-4 grid grid-cols-3 gap-3">
            <div class="bg-slate-50 rounded-lg p-3 border border-slate-100">
              <p class="text-xs font-semibold text-slate-700 mb-0.5">Install</p>
              <code class="text-xs font-mono text-slate-500">npm i @prodigy/sdk</code>
            </div>
            <div class="bg-slate-50 rounded-lg p-3 border border-slate-100">
              <p class="text-xs font-semibold text-slate-700 mb-0.5">Version</p>
              <code class="text-xs font-mono text-slate-500">2.4.1</code>
            </div>
            <div class="bg-slate-50 rounded-lg p-3 border border-slate-100">
              <p class="text-xs font-semibold text-slate-700 mb-0.5">License</p>
              <code class="text-xs font-mono text-slate-500">MIT</code>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </AppLayout>
</template>
