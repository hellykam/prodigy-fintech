<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { registerUser } from '@/composables/useApi'
import { Eye, EyeOff, Zap, Loader2 } from 'lucide-vue-next'
import ToastContainer from '@/components/ToastContainer.vue'
import { useToast } from '@/composables/useToast'

const router = useRouter()
const auth = useAuthStore()
const toast = useToast()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirm = ref(false)
const loading = ref(false)
const errorMsg = ref('')

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const errors = ref({ email: '', password: '', confirmPassword: '' })
const touched = ref({ email: false, password: false, confirmPassword: false })

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
  } else if (password.value.length < 6) {
    errors.value.password = 'Password must be at least 6 characters'
  } else {
    errors.value.password = ''
  }
  // Re-validate confirm when password changes
  if (touched.value.confirmPassword) validateConfirmPassword()
}

function validateConfirmPassword() {
  if (!confirmPassword.value) {
    errors.value.confirmPassword = 'Please confirm your password'
  } else if (confirmPassword.value !== password.value) {
    errors.value.confirmPassword = 'Passwords do not match'
  } else {
    errors.value.confirmPassword = ''
  }
}

function onEmailBlur() { touched.value.email = true; validateEmail() }
function onPasswordBlur() { touched.value.password = true; validatePassword() }
function onConfirmBlur() { touched.value.confirmPassword = true; validateConfirmPassword() }

const hasErrors = computed(
  () => !!errors.value.email || !!errors.value.password || !!errors.value.confirmPassword
)

async function handleSignup() {
  errorMsg.value = ''
  touched.value = { email: true, password: true, confirmPassword: true }
  validateEmail()
  validatePassword()
  validateConfirmPassword()

  if (hasErrors.value) return

  loading.value = true
  try {
    const res = await registerUser({ email: email.value, password: password.value })
    auth.setUser(res.user)
    router.replace('/kyc')
  } catch (e: any) {
    const msg = e.message ?? 'Registration failed'
    if (msg.includes('409') || msg.toLowerCase().includes('already') || msg.toLowerCase().includes('taken') || msg.toLowerCase().includes('exists') || msg.toLowerCase().includes('email_taken')) {
      errorMsg.value = 'An account with this email already exists'
    } else {
      errorMsg.value = msg
    }
    toast.error(errorMsg.value)
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
        <h2 class="text-xl font-semibold text-slate-900 mb-5">Create account</h2>

        <!-- Network error banner -->
        <div v-if="errorMsg" class="mb-4 text-sm text-danger-700 bg-danger-50 border border-danger-200 rounded-xl px-4 py-3">
          {{ errorMsg }}
        </div>

        <form @submit.prevent="handleSignup" class="space-y-4">
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
                autocomplete="new-password"
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

          <!-- Confirm Password -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
            <div class="relative">
              <input
                v-model="confirmPassword"
                :type="showConfirm ? 'text' : 'password'"
                placeholder="••••••••"
                autocomplete="new-password"
                :class="['w-full h-12 px-4 pr-12 rounded-xl border text-slate-900 placeholder-slate-400 bg-slate-50 focus:outline-none focus:ring-2 focus:border-transparent text-base transition',
                  touched.confirmPassword && errors.confirmPassword
                    ? 'border-danger-500 ring-1 ring-danger-500 focus:ring-danger-500'
                    : 'border-slate-200 focus:ring-brand-500']"
                @blur="onConfirmBlur"
              />
              <button
                type="button"
                @click="showConfirm = !showConfirm"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <EyeOff v-if="showConfirm" :size="18" />
                <Eye v-else :size="18" />
              </button>
            </div>
            <p v-if="touched.confirmPassword && errors.confirmPassword" class="mt-1 text-xs text-danger-600">{{ errors.confirmPassword }}</p>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="loading || hasErrors"
            class="w-full h-12 bg-brand-600 hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition text-base flex items-center justify-center gap-2"
          >
            <Loader2 v-if="loading" class="w-4 h-4 animate-spin" />
            {{ loading ? 'Creating account...' : 'Create Account' }}
          </button>
        </form>

        <!-- Login link -->
        <p class="text-sm text-slate-500 text-center mt-5">
          Already have an account?
          <RouterLink to="/login" class="text-brand-600 font-medium hover:underline">Sign in →</RouterLink>
        </p>
      </div>
    </div>
    <ToastContainer />
  </div>
</template>
