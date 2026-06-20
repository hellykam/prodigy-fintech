import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface AuthUser {
  id: string
  email: string
  status: string
  kycStatus: string
  attributedToB2BClientId?: string | null
}

const STORAGE_KEY = 'prodigy_partner_auth'

export const useAuthStore = defineStore('auth', () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  const user = ref<AuthUser | null>(stored ? (JSON.parse(stored) as AuthUser) : null)

  function setUser(u: AuthUser) {
    user.value = u
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
  }

  function clearUser() {
    user.value = null
    localStorage.removeItem(STORAGE_KEY)
  }

  return { user, setUser, clearUser }
})
