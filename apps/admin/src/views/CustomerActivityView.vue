<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import AppLayout from '../layouts/AppLayout.vue'
import { PageHeader, StatusPill, Card, Button, Badge, Breadcrumb } from '@prodigy/ui'
import { apiFetch } from '../composables/useApi'
import { useWebSocket } from '../composables/useWebSocket'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface User {
  id: string
  email: string
  status: string
  kycStatus: string
  riskLevel: string
  createdAt: string
}

interface SystemEvent {
  id: string
  correlationId: string
  eventName: string
  entityType: string
  entityId: string
  source: string
  target: string
  status: string
  payload: string
  createdAt: string
}

interface SystemEventsResponse {
  events: SystemEvent[]
}

interface Note {
  id: string
  userId: string
  text: string
  createdBy: string
  createdAt: string
}

interface NotesResponse {
  notes: Note[]
}

interface NoteResponse {
  note: Note
}

// ---------------------------------------------------------------------------
// Route / router
// ---------------------------------------------------------------------------
const route = useRoute()
const router = useRouter()
const userId = computed(() => route.params['id'] as string)

const { connected } = useWebSocket()
const queryClient = useQueryClient()

// ---------------------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------------------
const { data: user, isLoading: userLoading } = useQuery({
  queryKey: computed(() => ['user-detail', userId.value]),
  queryFn: () => apiFetch<User>(`/api/users/${userId.value}`),
})

const { data: eventsData, isLoading: eventsLoading } = useQuery({
  queryKey: computed(() => ['system-events', userId.value]),
  queryFn: () =>
    apiFetch<SystemEventsResponse>(`/api/system-events?entityId=${userId.value}`),
})

const { data: notesData, isLoading: notesLoading } = useQuery({
  queryKey: computed(() => ['user-notes', userId.value]),
  queryFn: () => apiFetch<NotesResponse>(`/api/users/${userId.value}/notes`),
})

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------
function formatEventName(name: string): string {
  return name
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')
}

function eventBadgeVariant(
  status: string,
): 'success' | 'warning' | 'danger' | 'info' | 'default' {
  const s = status.toLowerCase()
  if (s === 'completed' || s === 'approved') return 'success'
  if (s === 'pending' || s === 'processing') return 'warning'
  if (s === 'failed' || s === 'rejected') return 'danger'
  return 'info'
}

function timeAgo(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime()
  const seconds = Math.floor(diff / 1000)
  if (seconds < 60) return `${seconds}s ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

function formatDate(ts: string): string {
  return new Date(ts).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
    timeZoneName: 'short',
  })
}

// ---------------------------------------------------------------------------
// Derived: sorted events
// ---------------------------------------------------------------------------
const systemEvents = computed(() =>
  [...(eventsData.value?.events ?? [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  ),
)

// ---------------------------------------------------------------------------
// CorrelationId chip navigation
// ---------------------------------------------------------------------------
function goToCorrelation(correlationId: string) {
  void router.push({ path: '/system-events', query: { correlationId } })
}

// ---------------------------------------------------------------------------
// Notes
// ---------------------------------------------------------------------------
const noteText = ref('')
const noteError = ref('')
const noteSavedMsg = ref(false)
let noteSavedTimer: ReturnType<typeof setTimeout> | null = null

function validateNote(): boolean {
  const trimmed = noteText.value.trim()
  if (trimmed.length === 0) {
    noteError.value = 'Note cannot be empty'
    return false
  }
  if (trimmed.length < 3) {
    noteError.value = 'At least 3 characters required'
    return false
  }
  if (noteText.value.length > 500) {
    noteError.value = 'Note must be under 500 characters'
    return false
  }
  noteError.value = ''
  return true
}

const { mutate: saveNote, isPending: savingNote } = useMutation({
  mutationFn: () =>
    apiFetch<NoteResponse>(`/api/users/${userId.value}/notes`, {
      method: 'POST',
      body: JSON.stringify({ text: noteText.value, createdBy: 'admin@prodigy.io' }),
    }),
  onSuccess: () => {
    noteText.value = ''
    noteError.value = ''
    void queryClient.invalidateQueries({ queryKey: ['user-notes', userId.value] })
    noteSavedMsg.value = true
    if (noteSavedTimer) clearTimeout(noteSavedTimer)
    noteSavedTimer = setTimeout(() => { noteSavedMsg.value = false }, 2000)
  },
})

function handleSaveNote() {
  if (!validateNote()) return
  saveNote()
}

const noteOverLimit = computed(() => noteText.value.length > 500)
const canSave = computed(
  () => noteText.value.trim().length >= 3 && !noteOverLimit.value && !savingNote.value,
)

// ---------------------------------------------------------------------------
// Breadcrumbs
// ---------------------------------------------------------------------------
const breadcrumbs = computed(() => [
  { label: 'Customers', href: '/customers' },
  { label: user.value?.email ?? userId.value, href: `/customers/${userId.value}` },
  { label: 'Activity' },
])
</script>

<template>
  <AppLayout :ws-connected="connected">
    <PageHeader
      :breadcrumbs="breadcrumbs"
      admin-email="admin@prodigy.io"
    />

    <div class="p-6">
      <!-- User summary card -->
      <div
        v-if="user"
        class="mb-6 flex items-center gap-4 rounded-lg border border-slate-200 bg-white px-5 py-4 shadow-sm"
      >
        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
          {{ user.email.charAt(0).toUpperCase() }}
        </div>
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-semibold text-slate-900">{{ user.email }}</p>
          <p class="text-xs text-slate-500">{{ user.id }}</p>
        </div>
        <div class="flex items-center gap-3">
          <div class="text-right">
            <p class="text-xs text-slate-400">KYC</p>
            <StatusPill :status="user.kycStatus" />
          </div>
          <div class="text-right">
            <p class="text-xs text-slate-400">Risk</p>
            <span
              class="text-sm font-medium"
              :class="{
                'text-success-600': user.riskLevel === 'low',
                'text-warning-600': user.riskLevel === 'medium',
                'text-danger-600': user.riskLevel === 'high',
                'text-slate-500': !['low', 'medium', 'high'].includes(user.riskLevel),
              }"
            >
              {{ user.riskLevel ?? '—' }}
            </span>
          </div>
        </div>
      </div>
      <!-- User summary skeleton -->
      <div
        v-else-if="userLoading"
        class="mb-6 h-16 animate-pulse rounded-lg border border-slate-200 bg-slate-100"
      />

      <!-- Two-column layout -->
      <div class="flex flex-col gap-6 lg:flex-row lg:items-start">

        <!-- LEFT: Activity Timeline -->
        <div class="min-w-0 flex-1">
          <div class="mb-3 flex items-center justify-between">
            <h2 class="text-base font-semibold text-slate-900">Activity Timeline</h2>
            <span v-if="!eventsLoading" class="text-xs text-slate-500">
              {{ systemEvents.length }} events
            </span>
          </div>

          <!-- Loading skeletons -->
          <div v-if="eventsLoading" class="space-y-2">
            <div
              v-for="i in 4"
              :key="i"
              class="h-14 animate-pulse rounded-lg border border-slate-200 bg-slate-100"
            />
          </div>

          <!-- Empty state -->
          <div
            v-else-if="systemEvents.length === 0"
            class="rounded-lg border border-slate-200 bg-white px-6 py-10 text-center shadow-sm"
          >
            <p class="text-sm text-slate-500">No activity yet for this user.</p>
          </div>

          <!-- Events list -->
          <div v-else class="space-y-2">
            <div
              v-for="event in systemEvents"
              :key="event.id"
              class="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm"
            >
              <div class="flex flex-wrap items-start gap-2">
                <!-- Status badge -->
                <Badge :variant="eventBadgeVariant(event.status)">
                  {{ formatEventName(event.eventName) }}
                </Badge>

                <!-- Source → Target -->
                <span class="text-xs text-slate-500">
                  {{ event.source }} → {{ event.target }}
                </span>

                <!-- Spacer -->
                <span class="flex-1" />

                <!-- Time ago -->
                <span
                  class="text-xs text-slate-400"
                  :title="formatDate(event.createdAt)"
                >
                  {{ timeAgo(event.createdAt) }}
                </span>
              </div>

              <!-- CorrelationId chip -->
              <div class="mt-2">
                <button
                  class="inline-flex items-center gap-1 rounded border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-xs text-slate-600 transition-colors hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  :title="`View correlation: ${event.correlationId}`"
                  @click="goToCorrelation(event.correlationId)"
                >
                  {{ event.correlationId.slice(0, 12) }}…
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT: Notes -->
        <div class="w-full lg:w-80 lg:flex-shrink-0">
          <Card>
            <h2 class="mb-4 text-base font-semibold text-slate-900">Notes</h2>

            <!-- Add note form -->
            <div class="space-y-2">
              <textarea
                v-model="noteText"
                rows="3"
                placeholder="Add a note about this customer..."
                :class="['w-full resize-none rounded-md border px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2',
                  noteOverLimit ? 'border-danger-500 ring-1 ring-danger-500 focus:ring-danger-500' : 'border-slate-300 focus:ring-brand-500']"
                @blur="validateNote"
              />
              <p class="text-xs text-slate-400 text-right">{{ noteText.length }}/500</p>
              <p v-if="noteError" class="mt-1 text-xs text-danger-600">{{ noteError }}</p>
              <Button
                variant="primary"
                size="sm"
                :loading="savingNote"
                :disabled="!canSave"
                class="w-full"
                @click="handleSaveNote"
              >
                {{ savingNote ? 'Saving…' : 'Save Note' }}
              </Button>
              <p v-if="noteSavedMsg" class="text-xs text-success-600 text-center">Note saved ✓</p>
            </div>

            <div class="mt-4 border-t border-slate-100 pt-4">
              <!-- Notes loading -->
              <template v-if="notesLoading">
                <div
                  v-for="i in 2"
                  :key="i"
                  class="mb-2 h-16 animate-pulse rounded-md bg-slate-100"
                />
              </template>

              <!-- Notes empty -->
              <template v-else-if="(notesData?.notes ?? []).length === 0">
                <p class="text-sm text-slate-400">No notes yet.</p>
              </template>

              <!-- Notes list (newest first) -->
              <template v-else>
                <div
                  v-for="note in [...(notesData?.notes ?? [])].reverse()"
                  :key="note.id"
                  class="mb-2 rounded-md border border-slate-200 p-3"
                >
                  <p class="text-sm text-slate-800">{{ note.text }}</p>
                  <p class="mt-1 text-xs text-slate-400">
                    {{ note.createdBy }} · {{ timeAgo(note.createdAt) }}
                  </p>
                </div>
              </template>
            </div>
          </Card>
        </div>

      </div>
    </div>
  </AppLayout>
</template>
