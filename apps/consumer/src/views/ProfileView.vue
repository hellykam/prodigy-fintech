<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuery, useMutation } from '@tanstack/vue-query'
import { useAuthStore } from '@/stores/auth'
import { fetchUser, fetchSafetyStatus, sendVerifyEmail, setMpin } from '@/composables/useApi'
import { StatusPill, Card } from '@prodigy/ui'
import AppLayout from '@/components/AppLayout.vue'
import { LogOut, Shield, CreditCard, ChevronRight, User, Lock, RefreshCw, Fingerprint, Mail, Key, Loader2 } from 'lucide-vue-next'

// Notification preferences
const NOTIF_KEY = 'notification_prefs'

interface NotifPrefs {
  transactionConfirmations: boolean
  promotionalOffers: boolean
  weeklyAccountSummary: boolean
}

function loadPrefs(): NotifPrefs {
  try {
    const stored = localStorage.getItem(NOTIF_KEY)
    if (stored) return JSON.parse(stored)
  } catch {}
  return { transactionConfirmations: true, promotionalOffers: false, weeklyAccountSummary: false }
}

const notifPrefs = ref<NotifPrefs>(loadPrefs())

function savePrefs() {
  localStorage.setItem(NOTIF_KEY, JSON.stringify(notifPrefs.value))
}

function togglePref(key: keyof NotifPrefs) {
  notifPrefs.value[key] = !notifPrefs.value[key]
  savePrefs()
}

const auth = useAuthStore()
const router = useRouter()

const { data: fullUser } = useQuery({
  queryKey: ['user', auth.user?.id],
  queryFn: () => fetchUser(auth.user!.id),
  enabled: computed(() => !!auth.user?.id),
})

const initials = computed(() => {
  const email = auth.user?.email ?? ''
  const localPart = email.split('@')[0] ?? ''
  const parts = localPart.split('.')
  const p0 = parts[0] ?? ''
  const p1 = parts[1] ?? ''
  if (parts.length >= 2 && p0.length > 0 && p1.length > 0) return (p0[0]! + p1[0]!).toUpperCase()
  return email.slice(0, 2).toUpperCase()
})

const displayName = computed(() => {
  const u = fullUser.value ?? auth.user
  if (u?.firstName && u?.lastName) return `${u.firstName} ${u.lastName}`
  const email = auth.user?.email ?? ''
  const name = (email.split('@')[0] ?? '')
  return name.charAt(0).toUpperCase() + name.slice(1)
})

const bankAccount = computed(() => {
  return fullUser.value?.bankAccounts?.[0] ?? null
})

function handleLogout() {
  auth.logout()
  router.replace('/login')
}

function goToKyc() {
  router.push('/kyc')
}

// ── Security & Safety ──────────────────────────────────────────────────────

const { data: safetyData, refetch: refetchSafety } = useQuery({
  queryKey: ['safety-status', auth.user?.id],
  queryFn: () => fetchSafetyStatus(auth.user!.id),
  enabled: computed(() => !!auth.user?.id),
})

const safety = computed(() => safetyData.value?.status ?? {
  emailVerified: false,
  phoneVerified: false,
  mpinSet: false,
  biometrics: false,
  twoFaEnabled: false,
})

const completedCount = computed(() =>
  [safety.value.emailVerified, safety.value.phoneVerified, safety.value.mpinSet, safety.value.biometrics].filter(Boolean).length
)

const verifyEmailMutation = useMutation({
  mutationFn: () => sendVerifyEmail(auth.user!.id),
  onSuccess: () => refetchSafety(),
})

const showMpinSetup = ref(false)
const mpinValue = ref('')
const mpinConfirm = ref('')
const mpinError = ref('')

const setMpinMutation = useMutation({
  mutationFn: (pin: string) => setMpin(auth.user!.id, pin),
  onSuccess: () => {
    showMpinSetup.value = false
    mpinValue.value = ''
    mpinConfirm.value = ''
    refetchSafety()
  },
})

function submitMpin() {
  mpinError.value = ''
  if (mpinValue.value.length < 4) { mpinError.value = 'PIN must be at least 4 digits'; return }
  if (mpinValue.value !== mpinConfirm.value) { mpinError.value = 'PINs do not match'; return }
  setMpinMutation.mutate(mpinValue.value)
}

const biometricsEnabled = ref(localStorage.getItem('biometrics_enabled') === 'true')
function toggleBiometrics() {
  biometricsEnabled.value = !biometricsEnabled.value
  localStorage.setItem('biometrics_enabled', String(biometricsEnabled.value))
}
</script>

<template>
  <AppLayout>
    <div class="px-4 pt-12 pb-6">
      <!-- Header -->
      <div class="flex items-center gap-4 mb-7">
        <div class="w-16 h-16 rounded-full bg-brand-600 flex items-center justify-center text-white text-xl font-bold shrink-0">
          {{ initials }}
        </div>
        <div>
          <h1 class="text-xl font-bold text-slate-900">{{ displayName }}</h1>
          <p class="text-slate-400 text-sm">{{ auth.user?.email }}</p>
        </div>
      </div>

      <!-- KYC Status Card -->
      <div
        @click="goToKyc"
        class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-3 flex items-center gap-3 cursor-pointer hover:shadow-md active:scale-[0.98] transition"
      >
        <div class="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center shrink-0">
          <Shield :size="20" class="text-brand-600" />
        </div>
        <div class="flex-1">
          <p class="text-sm font-semibold text-slate-900">Identity Verification</p>
          <p class="text-xs text-slate-400 mt-0.5">KYC Status</p>
        </div>
        <div class="flex items-center gap-2">
          <StatusPill :status="auth.user?.kycStatus ?? 'not_started'" />
          <ChevronRight :size="16" class="text-slate-300" />
        </div>
      </div>

      <!-- Bank Account -->
      <div v-if="bankAccount" class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-3 flex items-center gap-3">
        <div class="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
          <CreditCard :size="20" class="text-slate-600" />
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold text-slate-900">Bank Account</p>
          <p class="text-xs text-slate-400 font-mono mt-0.5 truncate">{{ bankAccount.iban }}</p>
        </div>
        <div class="text-right shrink-0">
          <p class="text-sm font-semibold text-slate-900">€{{ bankAccount.balance?.toLocaleString('en-EU', { minimumFractionDigits: 2 }) }}</p>
          <p class="text-xs text-slate-400">{{ bankAccount.currency }}</p>
        </div>
      </div>

      <!-- Account info -->
      <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-6">
        <h3 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Account</h3>
        <div class="space-y-3">
          <div class="flex justify-between text-sm py-1">
            <span class="text-slate-500">Email</span>
            <span class="font-medium text-slate-900">{{ auth.user?.email }}</span>
          </div>
          <div class="flex justify-between text-sm py-1">
            <span class="text-slate-500">Account Status</span>
            <StatusPill :status="auth.user?.status ?? 'active'" />
          </div>
          <div class="flex justify-between text-sm py-1">
            <span class="text-slate-500">Risk Level</span>
            <span class="font-medium text-slate-900 capitalize">{{ auth.user?.riskLevel ?? 'low' }}</span>
          </div>
        </div>
      </div>

      <!-- Notification Preferences -->
      <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-6">
        <h3 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Notification Preferences</h3>
        <div class="space-y-4">

          <!-- KYC status updates — always on, locked -->
          <div class="flex items-center justify-between">
            <div class="flex-1 min-w-0 pr-3">
              <p class="text-sm font-medium text-slate-900">KYC status updates</p>
              <div class="flex items-center gap-1 mt-0.5">
                <Lock :size="11" class="text-slate-400 shrink-0" />
                <p class="text-xs text-slate-400">Required</p>
              </div>
            </div>
            <!-- Locked toggle: always on, not interactive -->
            <div
              class="relative w-11 h-6 rounded-full bg-brand-600 opacity-50 cursor-not-allowed shrink-0"
              title="This notification is required by regulation"
            >
              <span class="absolute right-0.5 top-0.5 w-5 h-5 rounded-full bg-white shadow-sm" />
            </div>
          </div>

          <!-- Transaction confirmations -->
          <div class="flex items-center justify-between">
            <div class="flex-1 min-w-0 pr-3">
              <p class="text-sm font-medium text-slate-900">Transaction confirmations</p>
              <p class="text-xs text-slate-400 mt-0.5">Get notified when a transaction completes</p>
            </div>
            <button
              @click="togglePref('transactionConfirmations')"
              :class="[
                'relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none shrink-0',
                notifPrefs.transactionConfirmations ? 'bg-brand-600' : 'bg-slate-200'
              ]"
              :aria-checked="notifPrefs.transactionConfirmations"
              role="switch"
            >
              <span
                :class="[
                  'absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200',
                  notifPrefs.transactionConfirmations ? 'translate-x-5' : 'translate-x-0.5'
                ]"
              />
            </button>
          </div>

          <!-- Promotional offers -->
          <div class="flex items-center justify-between">
            <div class="flex-1 min-w-0 pr-3">
              <p class="text-sm font-medium text-slate-900">Promotional offers</p>
              <p class="text-xs text-slate-400 mt-0.5">Deals, rewards and limited offers</p>
            </div>
            <button
              @click="togglePref('promotionalOffers')"
              :class="[
                'relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none shrink-0',
                notifPrefs.promotionalOffers ? 'bg-brand-600' : 'bg-slate-200'
              ]"
              :aria-checked="notifPrefs.promotionalOffers"
              role="switch"
            >
              <span
                :class="[
                  'absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200',
                  notifPrefs.promotionalOffers ? 'translate-x-5' : 'translate-x-0.5'
                ]"
              />
            </button>
          </div>

          <!-- Weekly account summary -->
          <div class="flex items-center justify-between">
            <div class="flex-1 min-w-0 pr-3">
              <p class="text-sm font-medium text-slate-900">Weekly account summary</p>
              <p class="text-xs text-slate-400 mt-0.5">Weekly digest of your account activity</p>
            </div>
            <button
              @click="togglePref('weeklyAccountSummary')"
              :class="[
                'relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none shrink-0',
                notifPrefs.weeklyAccountSummary ? 'bg-brand-600' : 'bg-slate-200'
              ]"
              :aria-checked="notifPrefs.weeklyAccountSummary"
              role="switch"
            >
              <span
                :class="[
                  'absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200',
                  notifPrefs.weeklyAccountSummary ? 'translate-x-5' : 'translate-x-0.5'
                ]"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- Security & Safety -->
      <div class="mb-6">
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-base font-semibold text-slate-900">Security & Safety</h2>
          <span class="text-xs font-medium text-slate-400">{{ completedCount }}/4 complete</span>
        </div>

        <!-- Progress bar -->
        <div class="h-1.5 bg-slate-100 rounded-full mb-4">
          <div
            class="h-1.5 bg-success-500 rounded-full transition-all duration-500"
            :style="{ width: `${(completedCount / 4) * 100}%` }"
          />
        </div>

        <div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
          <!-- Email verification -->
          <div class="flex items-center gap-3 p-4 border-b border-slate-50">
            <div :class="['w-8 h-8 rounded-full flex items-center justify-center', safety.emailVerified ? 'bg-success-50' : 'bg-slate-100']">
              <Mail :class="['w-4 h-4', safety.emailVerified ? 'text-success-500' : 'text-slate-400']" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-slate-900">Confirm email</p>
              <p class="text-xs text-slate-400 mt-0.5">{{ safety.emailVerified ? 'Verified ✓' : auth.user?.email }}</p>
            </div>
            <button
              v-if="!safety.emailVerified"
              @click="verifyEmailMutation.mutate()"
              :disabled="verifyEmailMutation.isPending.value"
              class="text-xs font-semibold text-brand-600 hover:underline disabled:opacity-50 flex items-center gap-1"
            >
              <Loader2 v-if="verifyEmailMutation.isPending.value" class="w-3 h-3 animate-spin" />
              {{ verifyEmailMutation.isPending.value ? 'Verifying...' : 'Verify' }}
            </button>
            <span v-else class="text-success-500 text-sm">✓</span>
          </div>

          <!-- MPIN -->
          <div class="flex items-center gap-3 p-4 border-b border-slate-50">
            <div :class="['w-8 h-8 rounded-full flex items-center justify-center', safety.mpinSet ? 'bg-success-50' : 'bg-slate-100']">
              <Key :class="['w-4 h-4', safety.mpinSet ? 'text-success-500' : 'text-slate-400']" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-slate-900">Set MPIN</p>
              <p class="text-xs text-slate-400 mt-0.5">{{ safety.mpinSet ? 'PIN set ✓' : '4–6 digit security PIN' }}</p>
            </div>
            <button
              v-if="!safety.mpinSet"
              @click="showMpinSetup = !showMpinSetup"
              class="text-xs font-semibold text-brand-600 hover:underline"
            >
              Set PIN
            </button>
            <span v-else class="text-success-500 text-sm">✓</span>
          </div>

          <!-- MPIN setup form (inline) -->
          <div v-if="showMpinSetup" class="px-4 pb-4 space-y-3 bg-slate-50">
            <input
              v-model="mpinValue"
              type="password"
              inputmode="numeric"
              maxlength="6"
              placeholder="Enter PIN (4–6 digits)"
              class="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
            />
            <input
              v-model="mpinConfirm"
              type="password"
              inputmode="numeric"
              maxlength="6"
              placeholder="Confirm PIN"
              class="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
            />
            <p v-if="mpinError" class="text-xs text-danger-600">{{ mpinError }}</p>
            <button
              @click="submitMpin"
              :disabled="setMpinMutation.isPending.value"
              class="w-full h-9 bg-brand-600 text-white text-sm font-semibold rounded-xl hover:bg-brand-700 disabled:opacity-50 transition"
            >
              {{ setMpinMutation.isPending.value ? 'Saving...' : 'Save PIN' }}
            </button>
          </div>

          <!-- Biometrics (localStorage only) -->
          <div class="flex items-center gap-3 p-4 border-b border-slate-50">
            <div :class="['w-8 h-8 rounded-full flex items-center justify-center', biometricsEnabled ? 'bg-success-50' : 'bg-slate-100']">
              <Fingerprint :class="['w-4 h-4', biometricsEnabled ? 'text-success-500' : 'text-slate-400']" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-slate-900">Biometrics</p>
              <p class="text-xs text-slate-400 mt-0.5">Face ID / Touch ID</p>
            </div>
            <button
              @click="toggleBiometrics"
              :class="['w-10 h-5 rounded-full transition-colors relative', biometricsEnabled ? 'bg-success-500' : 'bg-slate-200']"
              role="switch"
              :aria-checked="biometricsEnabled"
            >
              <span :class="['absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform', biometricsEnabled ? 'translate-x-5' : 'translate-x-0.5']" />
            </button>
          </div>

          <!-- 2FA — Coming Soon -->
          <div class="flex items-center gap-3 p-4 opacity-40">
            <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
              <Shield class="w-4 h-4 text-slate-400" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-slate-900">Two-Factor Auth</p>
              <p class="text-xs text-slate-400 mt-0.5">Google Authenticator</p>
            </div>
            <span class="text-[10px] font-semibold bg-warning-400 text-slate-900 px-2 py-0.5 rounded-full">Soon</span>
          </div>
        </div>
      </div>

      <!-- Coming Soon Features -->
      <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-6">
        <h3 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Coming Soon</h3>
        <div class="divide-y divide-slate-50">
          <!-- Cards -->
          <div class="flex items-center gap-3 py-3 opacity-40 pointer-events-none">
            <CreditCard class="w-5 h-5 text-slate-400 shrink-0" />
            <span class="text-sm text-slate-600 flex-1">Cards</span>
            <span class="text-[10px] font-semibold bg-warning-400 text-slate-900 px-2 py-0.5 rounded-full">Soon</span>
          </div>
          <!-- Recurring Buy -->
          <div class="flex items-center gap-3 py-3 opacity-40 pointer-events-none">
            <RefreshCw class="w-5 h-5 text-slate-400 shrink-0" />
            <span class="text-sm text-slate-600 flex-1">Recurring Buy</span>
            <span class="text-[10px] font-semibold bg-warning-400 text-slate-900 px-2 py-0.5 rounded-full">Soon</span>
          </div>
        </div>
      </div>

      <!-- Sign out -->
      <button
        @click="handleLogout"
        class="w-full h-12 border border-danger-200 text-danger-600 font-semibold rounded-2xl hover:bg-danger-50 transition flex items-center justify-center gap-2"
      >
        <LogOut :size="18" />
        Sign Out
      </button>
    </div>
  </AppLayout>
</template>
