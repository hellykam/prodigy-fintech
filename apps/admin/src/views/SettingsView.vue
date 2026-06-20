<script setup lang="ts">
import { ref, computed } from 'vue'
import AppLayout from '../layouts/AppLayout.vue'
import { PageHeader, DataTable, StatusPill, SidePanel, Button, Badge } from '@prodigy/ui'
import { useWebSocket } from '../composables/useWebSocket'

const { connected } = useWebSocket()

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface StaffUser {
  id: string
  email: string
  role: string
  status: string
  lastLogin: string
}

// ---------------------------------------------------------------------------
// Demo data (no backend needed)
// ---------------------------------------------------------------------------
const staffUsers = ref<StaffUser[]>([
  { id: '1', email: 'admin@prodigy.com', role: 'Super Admin', status: 'active', lastLogin: '2026-06-17' },
  { id: '2', email: 'compliance@prodigy.com', role: 'Compliance', status: 'active', lastLogin: '2026-06-16' },
  { id: '3', email: 'support@prodigy.com', role: 'Support', status: 'active', lastLogin: '2026-06-14' },
])

// ---------------------------------------------------------------------------
// Table
// ---------------------------------------------------------------------------
const tableColumns = [
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' },
  { key: 'status', header: 'Status' },
  { key: 'lastLogin', header: 'Last Login' },
  { key: '_actions', header: '' },
]

const tableData = computed(() =>
  staffUsers.value.map((u) => ({ ...u, _raw: u })),
)

function roleBadgeVariant(role: string): 'default' | 'info' | 'warning' | 'danger' | 'success' | 'neutral' {
  if (role === 'Super Admin') return 'danger'
  if (role === 'Compliance') return 'warning'
  if (role === 'Support') return 'info'
  return 'neutral'
}

// ---------------------------------------------------------------------------
// Delete (local only)
// ---------------------------------------------------------------------------
function deactivateUser(id: string) {
  const idx = staffUsers.value.findIndex(u => u.id === id)
  if (idx === -1) return
  const existing = staffUsers.value[idx]
  if (!existing) return
  staffUsers.value[idx] = {
    id: existing.id,
    email: existing.email,
    role: existing.role,
    lastLogin: existing.lastLogin,
    status: 'deactivated',
  }
}

// ---------------------------------------------------------------------------
// Add User side panel
// ---------------------------------------------------------------------------
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const addPanelOpen = ref(false)
const newName = ref('')
const newEmail = ref('')
const newRole = ref('')
const addSuccess = ref(false)
const addFieldErrors = ref<{ email?: string; role?: string }>({})

function openAddPanel() {
  newName.value = ''
  newEmail.value = ''
  newRole.value = ''
  addSuccess.value = false
  addFieldErrors.value = {}
  addPanelOpen.value = true
}

function closeAddPanel() {
  addPanelOpen.value = false
}

function validateAddEmail(): boolean {
  const v = newEmail.value.trim()
  if (!v) { addFieldErrors.value = { ...addFieldErrors.value, email: 'Email is required' }; return false }
  if (!EMAIL_RE.test(v)) { addFieldErrors.value = { ...addFieldErrors.value, email: 'Enter a valid email address' }; return false }
  const { email: _e, ...rest } = addFieldErrors.value
  addFieldErrors.value = rest
  return true
}

function validateAddRole(): boolean {
  if (!newRole.value) { addFieldErrors.value = { ...addFieldErrors.value, role: 'Role is required' }; return false }
  const { role: _r, ...rest } = addFieldErrors.value
  addFieldErrors.value = rest
  return true
}

const addFormValid = computed(
  () => Object.keys(addFieldErrors.value).length === 0 && newEmail.value.trim() !== '' && newRole.value !== '',
)

function submitAddUser() {
  const emailOk = validateAddEmail()
  const roleOk = validateAddRole()
  if (!emailOk || !roleOk) return
  const newId = String(Date.now())
  staffUsers.value.push({
    id: newId,
    email: newEmail.value.trim(),
    role: newRole.value,
    status: 'active',
    lastLogin: '—',
  })
  addSuccess.value = true
  setTimeout(() => {
    addPanelOpen.value = false
  }, 1200)
}

// ---------------------------------------------------------------------------
// Confirm deactivate
// ---------------------------------------------------------------------------
const confirmUserId = ref<string | null>(null)

function requestDeactivate(id: string, event: Event) {
  event.stopPropagation()
  confirmUserId.value = id
}

function cancelDeactivate() {
  confirmUserId.value = null
}

function confirmDeactivate() {
  if (confirmUserId.value) {
    deactivateUser(confirmUserId.value)
    confirmUserId.value = null
  }
}
</script>

<template>
  <AppLayout :ws-connected="connected">
    <PageHeader
      :breadcrumbs="[{ label: 'Admin', href: '/' }, { label: 'Settings' }]"
      admin-email="admin@prodigy.com"
    />

    <div class="flex h-[calc(100vh-3.5rem)] overflow-hidden">
      <div class="flex-1 overflow-y-auto p-6">
        <!-- Header -->
        <div class="mb-6 flex items-center justify-between">
          <div>
            <h1 class="text-xl font-semibold text-slate-900">Staff Users</h1>
            <p class="mt-0.5 text-sm text-slate-500">{{ staffUsers.length }} staff members</p>
          </div>
          <Button variant="primary" size="sm" @click="openAddPanel">
            + Add User
          </Button>
        </div>

        <!-- Staff table -->
        <div class="rounded-lg border border-slate-200 bg-white shadow-sm overflow-x-auto">
          <DataTable
            :columns="tableColumns"
            :data="tableData"
            row-key="id"
            empty-title="No staff users"
            empty-description="No staff accounts have been added yet."
          >
            <template #role="{ value }">
              <Badge :variant="roleBadgeVariant(String(value ?? ''))">{{ value }}</Badge>
            </template>
            <template #status="{ value }">
              <StatusPill :status="String(value ?? '')" />
            </template>
            <template #lastLogin="{ value }">
              <span class="text-xs text-slate-500">{{ value }}</span>
            </template>
            <template #_actions="{ row }">
              <div class="flex justify-end">
                <Button
                  v-if="row['status'] === 'active'"
                  variant="ghost"
                  size="sm"
                  class="text-danger-600 hover:text-danger-700 hover:bg-danger-50"
                  @click="requestDeactivate(String(row['id']), $event)"
                >
                  Deactivate
                </Button>
                <span v-else class="text-xs text-slate-400 italic">Deactivated</span>
              </div>
            </template>
          </DataTable>
        </div>
      </div>

      <!-- Add User side panel -->
      <SidePanel
        :open="addPanelOpen"
        title="Add Staff User"
        @close="closeAddPanel"
      >
        <div class="space-y-4">
          <div v-if="addSuccess" class="rounded-md bg-success-50 border border-success-200 px-4 py-3 text-sm text-success-700">
            User added successfully!
          </div>

          <div v-else class="space-y-4">
            <div>
              <label class="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
              <input
                v-model="newName"
                type="text"
                placeholder="Jane Smith"
                class="h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-700 mb-1">Email Address <span class="text-danger-500">*</span></label>
              <input
                v-model="newEmail"
                type="email"
                placeholder="jane@prodigy.com"
                :class="['h-9 w-full rounded-md border px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2',
                  addFieldErrors.email ? 'border-danger-500 ring-1 ring-danger-500 focus:ring-danger-500' : 'border-slate-300 focus:ring-brand-500']"
                @blur="validateAddEmail"
              />
              <p v-if="addFieldErrors.email" class="mt-1 text-xs text-danger-600">{{ addFieldErrors.email }}</p>
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-700 mb-1">Role <span class="text-danger-500">*</span></label>
              <select
                v-model="newRole"
                :class="['h-9 w-full rounded-md border px-3 text-sm text-slate-700 focus:outline-none focus:ring-2',
                  addFieldErrors.role ? 'border-danger-500 ring-1 ring-danger-500 focus:ring-danger-500' : 'border-slate-300 focus:ring-brand-500']"
                @blur="validateAddRole"
              >
                <option value="" disabled>Select a role…</option>
                <option value="Super Admin">Super Admin</option>
                <option value="Compliance">Compliance</option>
                <option value="Support">Support</option>
              </select>
              <p v-if="addFieldErrors.role" class="mt-1 text-xs text-danger-600">{{ addFieldErrors.role }}</p>
            </div>
          </div>
        </div>

        <template #footer>
          <div v-if="!addSuccess" class="flex items-center gap-3">
            <Button variant="primary" size="sm" :disabled="!addFormValid" @click="submitAddUser">Add User</Button>
            <Button variant="ghost" size="sm" @click="closeAddPanel">Cancel</Button>
          </div>
        </template>
      </SidePanel>
    </div>

    <!-- Confirm deactivate dialog -->
    <Teleport to="body">
      <div
        v-if="confirmUserId"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        @click.self="cancelDeactivate"
      >
        <div class="bg-white rounded-xl border border-slate-200 shadow-xl p-6 w-full max-w-sm mx-4">
          <h3 class="text-base font-semibold text-slate-900 mb-2">Deactivate User?</h3>
          <p class="text-sm text-slate-500 mb-5">
            This will set the user's status to deactivated. They will no longer be able to log in.
          </p>
          <div class="flex items-center gap-3">
            <Button variant="destructive" size="sm" @click="confirmDeactivate">Deactivate</Button>
            <Button variant="ghost" size="sm" @click="cancelDeactivate">Cancel</Button>
          </div>
        </div>
      </div>
    </Teleport>
  </AppLayout>
</template>
