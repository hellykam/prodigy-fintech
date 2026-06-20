import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface AuthUser {
  id: string
  email: string
  status: string
  kycStatus: string
  riskLevel: string
  firstName?: string
  lastName?: string
  wallets?: Wallet[]
  bankAccounts?: BankAccount[]
}

export interface Wallet {
  id: string
  currency: string
  balance: number
  address?: string
}

export interface BankAccount {
  id: string
  iban: string
  accountHolderName: string
  currency: string
  balance: number
}

const STORAGE_KEY = 'prodigy_consumer_auth'

export const useAuthStore = defineStore('auth', () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  const user = ref<AuthUser | null>(stored ? JSON.parse(stored) : null)

  const isLoggedIn = computed(() => !!user.value)

  async function login(email: string, password: string): Promise<void> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data.message ?? 'Invalid credentials')
    }

    const data = await res.json()
    user.value = data.user
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data.user))
  }

  function logout() {
    user.value = null
    localStorage.removeItem(STORAGE_KEY)
  }

  function updateUser(updates: Partial<AuthUser>) {
    if (user.value) {
      user.value = { ...user.value, ...updates }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user.value))
    }
  }

  function setUser(u: AuthUser) {
    user.value = u
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
  }

  return { user, isLoggedIn, login, logout, updateUser, setUser }
})
