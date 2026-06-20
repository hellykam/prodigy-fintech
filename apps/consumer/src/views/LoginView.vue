<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Button } from '@prodigy/ui'
import { Eye, EyeOff, Zap, Loader2 } from 'lucide-vue-next'
import ToastContainer from '@/components/ToastContainer.vue'
import { useToast } from '@/composables/useToast'

const router = useRouter()
const auth = useAuthStore()
const toast = useToast()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const errorMsg = ref('')

// Per-field error state
const errors = ref({ email: '', password: '' })
// Track which fields have been blurred
const touched = ref({ email: false, password: false })

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateEmail() {
  if (!email.value) {
    errors.value.email = 'Email is required'
  } else if (!EMAIL_RE.test(email.value)) {
    errors.value.email = 'Enter a valid email address'
  } else {
    errors.value.email = ''
  }
}

function validatePassword() {
  if (!password.value) {
    errors.value.password = 'Password is required'
  } else if (password.value.length < 4) {
    errors.value.password = 'Password must be at least 4 characters'
  } else {
    errors.value.password = ''
  }
}

function onEmailBlur() {
  touched.value.email = true
  validateEmail()
}

function onPasswordBlur() {
  touched.value.password = true
  validatePassword()
}

const hasErrors = computed(() => !!errors.value.email || !!errors.value.password)

const demoUsers = [
  { label: 'Alice', sub: 'KYC Approved', email: 'alice@demo.com', password: '1234', color: 'bg-success-50 border-success-500 text-success-600' },
  { label: 'Bob', sub: 'KYC Pending', email: 'bob@demo.com', password: '1234', color: 'bg-warning-50 border-warning-500 text-warning-600' },
  { label: 'Carol', sub: 'KYC Rejected', email: 'carol@demo.com', password: '1234', color: 'bg-danger-50 border-danger-500 text-danger-600' },
]

function prefill(user: typeof demoUsers[0]) {
  email.value = user.email
  password.value = user.password
  // Clear errors when prefilling
  errors.value = { email: '', password: '' }
  errorMsg.value = ''
}

async function handleLogin() {
  // Touch all fields and validate before submit
  touched.value = { email: true, password: true }
  validateEmail()
  validatePassword()

  if (!email.value || !password.value) {
    return
  }
  if (hasErrors.value) return

  loading.value = true
  errorMsg.value = ''
  try {
    await auth.login(email.value, password.value)
    router.replace('/home')
  } catch (e: any) {
    errorMsg.value = 'Invalid email or password'
    toast.error('Invalid email or password')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-brand-600 to-brand-900 flex items-center justify-center p-4">
    <div class="w-full max-w-[390px]">
      <!-- Logo -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur rounded-2xl mb-4">
          <Zap :size="32" class="text-white" :stroke-width="2.5" />
        </div>
        <h1 class="text-3xl font-bold text-white tracking-tight">Prodigy</h1>
        <p class="text-brand-200 text-sm mt-1">Buy crypto in seconds</p>
      </div>

      <!-- Card -->
      <div class="bg-white rounded-3xl shadow-2xl p-6">
        <h2 class="text-xl font-semibold text-slate-900 mb-5">Sign in</h2>

        <!-- Network error banner -->
        <div v-if="errorMsg" class="mb-4 text-sm text-danger-700 bg-danger-50 border border-danger-200 rounded-xl px-4 py-3">
          {{ errorMsg }}
        </div>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
            <input
              v-model="email"
              type="email"
              placeholder="you@example.com"
              autocomplete="email"
              :class="['w-full h-12 px-4 rounded-xl border text-slate-900 placeholder-slate-400 bg-slate-50 focus:outline-none focus:ring-2 focus:border-transparent text-base transition',
                touched.email && errors.email
                  ? 'border-danger-500 ring-1 ring-danger-500 focus:ring-danger-500'
                  : 'border-slate-200 focus:ring-brand-500']"
              @blur="onEmailBlur"
            />
            <p v-if="touched.email && errors.email" class="mt-1 text-xs text-danger-600">{{ errors.email }}</p>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                autocomplete="current-password"
                :class="['w-full h-12 px-4 pr-12 rounded-xl border text-slate-900 placeholder-slate-400 bg-slate-50 focus:outline-none focus:ring-2 focus:border-transparent text-base transition',
                  touched.password && errors.password
                    ? 'border-danger-500 ring-1 ring-danger-500 focus:ring-danger-500'
                    : 'border-slate-200 focus:ring-brand-500']"
                @blur="onPasswordBlur"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <EyeOff v-if="showPassword" :size="18" />
                <Eye v-else :size="18" />
              </button>
            </div>
            <p v-if="touched.password && errors.password" class="mt-1 text-xs text-danger-600">{{ errors.password }}</p>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="loading || !email || !password"
            class="w-full h-12 bg-brand-600 hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition text-base flex items-center justify-center gap-2"
          >
            <Loader2 v-if="loading" class="w-4 h-4 animate-spin" />
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <!-- Sign up link -->
        <p class="text-sm text-slate-500 text-center mt-5">
          Don't have an account?
          <RouterLink to="/signup" class="text-brand-600 font-medium hover:underline">Sign up →</RouterLink>
        </p>

        <!-- Demo shortcuts -->
        <div class="mt-6">
          <p class="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Demo accounts</p>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="u in demoUsers"
              :key="u.email"
              @click="prefill(u)"
              :class="['border rounded-xl p-2.5 text-left transition hover:opacity-80 active:scale-95', u.color]"
            >
              <p class="font-semibold text-xs">{{ u.label }}</p>
              <p class="text-[10px] mt-0.5 opacity-80">{{ u.sub }}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
    <ToastContainer />
  </div>
</template>
