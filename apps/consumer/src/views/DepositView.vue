<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQueryClient } from '@tanstack/vue-query'
import { useAuthStore } from '@/stores/auth'
import { apiFetch } from '@/composables/useApi'
import AppLayout from '@/components/AppLayout.vue'
import { Copy, Check, Share2, Loader2, ArrowLeft } from 'lucide-vue-next'

const auth = useAuthStore()
const router = useRouter()
const queryClient = useQueryClient()

type Method = 'SEPA' | 'SWIFT'
const method = ref<Method>('SEPA')
const copiedField = ref<string | null>(null)
const simulating = ref(false)
const simDone = ref(false)

// Mock bank details (in real app from backend)
const bankDetails = computed(() => ({
  name: auth.user?.name ?? 'Account Holder',
  iban: 'DE89 PROD 0000 1234 5678 90',
  bic: 'PRODDE77XXX',
  bank: 'Prodigy Finance GmbH',
  ref: `REF-${auth.user?.id?.slice(-8) ?? '00000000'}`,
}))

async function copyField(field: string, value: string) {
  await navigator.clipboard.writeText(value)
  copiedField.value = field
  setTimeout(() => { copiedField.value = null }, 2000)
}

async function shareInstructions() {
  const d = bankDetails.value
  const text = `Prodigy Bank Details\n\nAccount holder: ${d.name}\nIBAN: ${d.iban}\nBIC: ${d.bic}\nBank: ${d.bank}\nReference: ${d.ref}\n\n${method.value === 'SEPA' ? 'SEPA transfer (1–2 business days, no fee)' : 'SWIFT transfer (3–5 days, fees apply)'}`

  if (navigator.share) {
    await navigator.share({ title: 'My Prodigy Bank Details', text })
  } else {
    await navigator.clipboard.writeText(text)
    copiedField.value = 'share'
    setTimeout(() => { copiedField.value = null }, 2000)
  }
}

async function simulateDeposit() {
  simulating.value = true
  try {
    await apiFetch('/deposit/simulate', {
      method: 'POST',
      body: JSON.stringify({ userId: auth.user?.id, amount: 500, currency: 'EUR' }),
    })
    queryClient.invalidateQueries({ queryKey: ['user', auth.user?.id] })
    queryClient.invalidateQueries({ queryKey: ['transactions', auth.user?.id] })
    simDone.value = true
    setTimeout(() => router.push('/home'), 2000)
  } finally {
    simulating.value = false
  }
}
</script>

<template>
  <AppLayout>
    <div class="px-4 pt-12 pb-8 max-w-md mx-auto">
      <!-- Back -->
      <button @click="router.go(-1)" class="flex items-center gap-1.5 text-brand-600 text-sm font-medium mb-6 active:opacity-70 transition">
        <ArrowLeft class="w-4 h-4" /> Back
      </button>

      <h1 class="text-2xl font-bold text-slate-900 mb-1">Deposit Funds</h1>
      <p class="text-slate-400 text-sm mb-6">Transfer money to your Prodigy account via bank transfer</p>

      <!-- Method selector -->
      <div class="grid grid-cols-2 gap-2 mb-6">
        <button
          @click="method = 'SEPA'"
          :class="['rounded-xl p-3 border-2 text-left transition', method === 'SEPA' ? 'border-brand-500 bg-brand-50' : 'border-slate-200 bg-white hover:border-slate-300']"
        >
          <p class="font-semibold text-slate-900 text-sm">SEPA</p>
          <p class="text-xs text-slate-400 mt-0.5">1–2 days · No fee</p>
        </button>
        <button
          @click="method = 'SWIFT'"
          :class="['rounded-xl p-3 border-2 text-left transition', method === 'SWIFT' ? 'border-brand-500 bg-brand-50' : 'border-slate-200 bg-white hover:border-slate-300']"
        >
          <p class="font-semibold text-slate-900 text-sm">SWIFT</p>
          <p class="text-xs text-slate-400 mt-0.5">3–5 days · Fees apply</p>
        </button>
      </div>

      <!-- Bank details card -->
      <div class="bg-white rounded-2xl p-5 mb-4 space-y-4">
        <h2 class="text-sm font-semibold text-slate-700">Your bank details</h2>

        <!-- IBAN -->
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs text-slate-400 mb-0.5">IBAN</p>
            <p class="font-mono text-sm font-semibold text-slate-900">{{ bankDetails.iban }}</p>
          </div>
          <button
            @click="copyField('iban', bankDetails.iban)"
            class="flex items-center gap-1.5 text-xs font-medium text-brand-600 hover:text-brand-700 active:opacity-70 transition"
          >
            <component :is="copiedField === 'iban' ? Check : Copy" class="w-3.5 h-3.5" />
            {{ copiedField === 'iban' ? 'Copied!' : 'Copy' }}
          </button>
        </div>

        <!-- BIC -->
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs text-slate-400 mb-0.5">BIC / SWIFT</p>
            <p class="font-mono text-sm font-semibold text-slate-900">{{ bankDetails.bic }}</p>
          </div>
          <button
            @click="copyField('bic', bankDetails.bic)"
            class="flex items-center gap-1.5 text-xs font-medium text-brand-600 hover:text-brand-700 active:opacity-70 transition"
          >
            <component :is="copiedField === 'bic' ? Check : Copy" class="w-3.5 h-3.5" />
            {{ copiedField === 'bic' ? 'Copied!' : 'Copy' }}
          </button>
        </div>

        <!-- REF NUMBER -->
        <div class="flex items-center justify-between bg-warning-50 rounded-xl p-3">
          <div>
            <p class="text-xs text-warning-600 font-medium mb-0.5">Reference number ⚠ Required</p>
            <p class="font-mono text-sm font-bold text-slate-900">{{ bankDetails.ref }}</p>
          </div>
          <button
            @click="copyField('ref', bankDetails.ref)"
            class="flex items-center gap-1.5 text-xs font-medium text-warning-700 hover:text-warning-900 active:opacity-70 transition"
          >
            <component :is="copiedField === 'ref' ? Check : Copy" class="w-3.5 h-3.5" />
            {{ copiedField === 'ref' ? 'Copied!' : 'Copy' }}
          </button>
        </div>

        <!-- Bank name -->
        <div>
          <p class="text-xs text-slate-400 mb-0.5">Bank name</p>
          <p class="text-sm text-slate-700">{{ bankDetails.bank }}</p>
        </div>
      </div>

      <!-- USD auto-conversion notice -->
      <div v-if="method === 'SWIFT'" class="bg-info-50 border border-info-200 rounded-xl p-3 mb-4">
        <p class="text-xs text-info-700">
          <span class="font-semibold">Sending in USD?</span> Your USD will be automatically converted to EUR at the market rate at the time of arrival.
        </p>
      </div>

      <!-- Share button -->
      <button
        @click="shareInstructions"
        class="w-full h-12 border border-slate-200 text-slate-700 font-semibold rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-50 active:scale-[0.98] transition mb-3"
      >
        <Share2 class="w-4 h-4" />
        {{ copiedField === 'share' ? 'Copied to clipboard!' : 'Share bank details' }}
      </button>

      <!-- Demo: Simulate deposit -->
      <div class="border-t border-slate-100 mt-6 pt-6">
        <p class="text-xs text-slate-400 text-center mb-3">For demo purposes</p>
        <button
          @click="simulateDeposit"
          :disabled="simulating || simDone"
          class="w-full h-12 bg-success-500 text-white font-semibold rounded-2xl flex items-center justify-center gap-2 hover:bg-success-600 active:scale-[0.98] transition disabled:opacity-50"
        >
          <Loader2 v-if="simulating" class="w-4 h-4 animate-spin" />
          <Check v-else-if="simDone" class="w-4 h-4" />
          {{ simDone ? 'Deposit credited! Redirecting...' : simulating ? 'Processing...' : '⚡ Simulate €500 deposit' }}
        </button>
      </div>
    </div>
  </AppLayout>
</template>
