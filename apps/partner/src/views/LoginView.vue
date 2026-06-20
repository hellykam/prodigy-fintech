<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button, Card } from '@prodigy/ui'
import { apiFetch } from '../composables/useApi'
import { useAuthStore } from '../stores/auth'

interface LoginResponse {
  user: {
    id: string
    email: string
    status: string
    kycStatus: string
    attributedToB2BClientId?: string | null
  }
}

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMsg = ref('')
const fieldErrors = ref<{ email?: string; password?: string }>({})

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateEmail(): boolean {
  if (!email.value.trim()) {
    fieldErrors.value = { ...fieldErrors.value, email: 'Enter a valid email address' }
    return false
  }
  if (!EMAIL_RE.test(email.value.trim())) {
    fieldErrors.value = { ...fieldErrors.value, email: 'Enter a valid email address' }
    return false
  }
  const { email: _e, ...rest } = fieldErrors.value
  fieldErrors.value = rest
  return true
}

function validatePassword(): boolean {
  if (!password.value) {
    fieldErrors.value = { ...fieldErrors.value, password: 'Password is required' }
    return false
  }
  const { password: _p, ...rest } = fieldErrors.value
  fieldErrors.value = rest
  return true
}

async function handleSubmit() {
  const emailOk = validateEmail()
  const passOk = validatePassword()
  if (!emailOk || !passOk) return

  isLoading.value = true
  errorMsg.value = ''

  try {
    const data = await apiFetch<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: email.value, password: password.value }),
    })
    authStore.setUser(data.user)
    await router.push('/dashboard')
  } catch (err: unknown) {
    const status = (err as { status?: number })?.status
    if (status === 401) {
      errorMsg.value = 'Invalid email or password.'
    } else {
      errorMsg.value = 'Invalid email or password.'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-surface-subtle flex items-start justify-center pt-20 px-4">
    <div class="w-full max-w-sm">
      <!-- Logo mark -->
      <div class="flex items-center gap-2.5 mb-8">
        <div class="w-9 h-9 rounded-lg bg-brand-600 flex items-center justify-center">
          <span class="text-white font-bold text-base">P</span>
        </div>
        <div>
          <p class="text-slate-900 font-semibold text-sm leading-tight">Prodigy Partner</p>
          <p class="text-slate-500 text-xs">Sign in to your account</p>
        </div>
      </div>

      <Card class="shadow-md">
        <form class="p-6 space-y-5" @submit.prevent="handleSubmit">
          <div>
            <label for="email" class="block text-xs font-medium text-slate-700 mb-1.5">
              Email
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              autocomplete="email"
              placeholder="acme@partner.com"
              :class="['w-full rounded-md border px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors',
                fieldErrors.email ? 'border-danger-500 ring-1 ring-danger-500 focus:ring-danger-500' : 'border-slate-300 focus:border-brand-500 focus:ring-brand-500/20']"
              :disabled="isLoading"
              @blur="validateEmail"
            />
            <p v-if="fieldErrors.email" class="mt-1 text-xs text-danger-600">{{ fieldErrors.email }}</p>
          </div>

          <div>
            <label for="password" class="block text-xs font-medium text-slate-700 mb-1.5">
              Password
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              autocomplete="current-password"
              placeholder="partner1234"
              :class="['w-full rounded-md border px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors',
                fieldErrors.password ? 'border-danger-500 ring-1 ring-danger-500 focus:ring-danger-500' : 'border-slate-300 focus:border-brand-500 focus:ring-brand-500/20']"
              :disabled="isLoading"
              @blur="validatePassword"
            />
            <p v-if="fieldErrors.password" class="mt-1 text-xs text-danger-600">{{ fieldErrors.password }}</p>
          </div>

          <div
            v-if="errorMsg"
            role="alert"
            class="rounded-md border border-danger-200 bg-danger-50 px-4 py-3 text-xs text-danger-700 font-medium"
          >
            {{ errorMsg }}
          </div>

          <Button
            type="submit"
            class="w-full"
            :disabled="isLoading"
          >
            <span v-if="isLoading" class="flex items-center justify-center gap-2">
              <span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Signing in…
            </span>
            <span v-else>Sign in</span>
          </Button>
        </form>
      </Card>

      <p class="mt-4 text-center text-xs text-slate-400">
        Demo credentials: acme@partner.com / partner1234
      </p>
    </div>
  </div>
</template>
