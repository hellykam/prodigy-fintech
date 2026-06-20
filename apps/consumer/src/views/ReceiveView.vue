<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import AppLayout from '@/components/AppLayout.vue'
import { ChevronLeft, Copy, Check, AlertTriangle, Download, Share2 } from 'lucide-vue-next'
import * as QRCode from 'qrcode'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

type Tab = 'crypto' | 'fiat'
const activeTab = ref<Tab>('crypto')

interface CurrencyInfo {
  symbol: 'BTC' | 'ETH' | 'USDT'
  name: string
  network: string
  address: string
  color: string
  bgColor: string
}

const currencies: CurrencyInfo[] = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    network: 'Bitcoin',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    color: 'text-warning-600',
    bgColor: 'bg-warning-100',
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    network: 'Ethereum (ERC-20)',
    address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    color: 'text-info-600',
    bgColor: 'bg-info-100',
  },
  {
    symbol: 'USDT',
    name: 'Tether',
    network: 'Ethereum (ERC-20)',
    address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    color: 'text-success-600',
    bgColor: 'bg-success-100',
  },
]

const selected = ref<CurrencyInfo | null>(null)
const copied = ref(false)
const qrCanvas = ref<HTMLCanvasElement>()

// Fiat copy state
const copiedIban = ref(false)
const copiedRef = ref(false)
const copiedShare = ref(false)

const userId = computed(() => auth.user?.id ?? '')
const fiatIban = 'DE89PROD00001234567890'
const fiatRef = computed(() => `REF-${userId.value.slice(-8) || '00000000'}`)

async function copyIban() {
  await navigator.clipboard.writeText(fiatIban)
  copiedIban.value = true
  setTimeout(() => { copiedIban.value = false }, 2000)
}

async function copyRef() {
  await navigator.clipboard.writeText(fiatRef.value)
  copiedRef.value = true
  setTimeout(() => { copiedRef.value = false }, 2000)
}

async function shareDetails() {
  const text = `Prodigy Bank Details\n\nIBAN: ${fiatIban}\nReference: ${fiatRef.value}\n\nSEPA (within EU): 1–2 business days, no fee\nSWIFT (international): 3–5 business days, ~€20 fee`
  if (navigator.share) {
    await navigator.share({ title: 'My Prodigy Bank Details', text })
  } else {
    await navigator.clipboard.writeText(text)
    copiedShare.value = true
    setTimeout(() => { copiedShare.value = false }, 2000)
  }
}

// QR value: prefer wallet address matching selection, then IBAN, then fallback
function getQrValue(c: CurrencyInfo): string {
  const matchingWallet = auth.user?.wallets?.find((w) => w.currency === c.symbol)
  if (matchingWallet?.address) return matchingWallet.address
  return auth.user?.bankAccounts?.[0]?.iban ?? auth.user?.wallets?.[0]?.address ?? c.address
}

async function renderQR(c: CurrencyInfo) {
  // Wait for DOM to update before accessing canvas
  await new Promise((r) => requestAnimationFrame(r))
  if (qrCanvas.value) {
    await QRCode.toCanvas(qrCanvas.value, getQrValue(c), { width: 200, margin: 2 })
  }
}

function selectCurrency(c: CurrencyInfo) {
  selected.value = c
  copied.value = false
  renderQR(c)
}

// Re-render QR if canvas ref becomes available (after transition)
watch(qrCanvas, (canvas) => {
  if (canvas && selected.value) {
    QRCode.toCanvas(canvas, getQrValue(selected.value), { width: 200, margin: 2 })
  }
})

function goBack() {
  if (selected.value) {
    selected.value = null
  } else {
    router.back()
  }
}

async function copyAddress() {
  if (!selected.value) return
  try {
    await navigator.clipboard.writeText(selected.value.address)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {
    // clipboard not available
  }
}

function saveQR() {
  const url = qrCanvas.value?.toDataURL('image/png')
  if (!url) return
  const a = document.createElement('a')
  a.href = url
  a.download = 'prodigy-qr.png'
  a.click()
}
</script>

<template>
  <AppLayout>
    <div class="px-4 pt-10 pb-6">
      <!-- Back button -->
      <button
        @click="goBack"
        class="flex items-center gap-1 text-slate-500 hover:text-slate-700 mb-5 -ml-1"
      >
        <ChevronLeft :size="20" />
        <span class="text-sm">Back</span>
      </button>

      <!-- Tab selector -->
      <div class="flex gap-1 bg-slate-100 rounded-xl p-1 mb-6">
        <button
          @click="activeTab = 'crypto'; selected = null"
          :class="['flex-1 h-9 rounded-lg text-sm font-semibold transition', activeTab === 'crypto' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700']"
        >
          Crypto
        </button>
        <button
          @click="activeTab = 'fiat'"
          :class="['flex-1 h-9 rounded-lg text-sm font-semibold transition', activeTab === 'fiat' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700']"
        >
          Fiat (EUR)
        </button>
      </div>

      <!-- ===== Crypto Tab ===== -->
      <div v-if="activeTab === 'crypto'">
        <!-- Currency List -->
        <Transition name="slide" mode="out-in">
          <div v-if="!selected" key="list">
            <h1 class="text-2xl font-bold text-slate-900 mb-2">Receive Crypto</h1>
            <p class="text-slate-500 text-sm mb-6">Select a currency to get your deposit address</p>

            <div class="space-y-3">
              <button
                v-for="c in currencies"
                :key="c.symbol"
                @click="selectCurrency(c)"
                class="w-full bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-slate-100 active:scale-[0.98] transition hover:shadow-md text-left"
              >
                <div :class="['w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shrink-0', c.bgColor, c.color]">
                  {{ c.symbol.charAt(0) }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-slate-900">{{ c.name }}</p>
                  <p class="text-slate-400 text-xs mt-0.5">{{ c.symbol }} · {{ c.network }}</p>
                </div>
                <ChevronLeft :size="18" class="text-slate-300 rotate-180 shrink-0" />
              </button>
            </div>
          </div>

          <!-- Detail View -->
          <div v-else key="detail">
            <!-- Currency badge -->
            <div class="flex items-center gap-3 mb-6">
              <div :class="['w-12 h-12 rounded-full flex items-center justify-center font-bold shrink-0', selected.bgColor, selected.color]">
                {{ selected.symbol.charAt(0) }}
              </div>
              <div>
                <h1 class="text-2xl font-bold text-slate-900">{{ selected.name }}</h1>
                <p class="text-slate-400 text-sm">{{ selected.network }}</p>
              </div>
            </div>

            <!-- QR code -->
            <div class="bg-white rounded-2xl p-6 mb-4 shadow-sm border border-slate-100 flex flex-col items-center">
              <canvas ref="qrCanvas" class="rounded-lg mb-3" />
              <p class="text-xs text-slate-400 text-center mb-3">Scan to get the deposit address</p>
              <button
                @click="saveQR"
                class="flex items-center gap-1.5 text-xs text-brand-600 font-medium hover:text-brand-700 transition"
              >
                <Download :size="14" />
                Save QR
              </button>
            </div>

            <!-- Address box -->
            <div class="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-slate-100">
              <p class="text-xs text-slate-500 mb-2 font-medium">Wallet Address</p>
              <div class="flex items-center gap-3">
                <p class="font-mono text-xs text-slate-700 break-all flex-1 leading-relaxed">
                  {{ selected.address }}
                </p>
                <button
                  @click="copyAddress"
                  :class="[
                    'shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition active:scale-90',
                    copied ? 'bg-success-100 text-success-600' : 'bg-brand-50 text-brand-600 hover:bg-brand-100'
                  ]"
                  :title="copied ? 'Copied!' : 'Copy address'"
                >
                  <Transition name="fade" mode="out-in">
                    <Check v-if="copied" :size="18" />
                    <Copy v-else :size="18" />
                  </Transition>
                </button>
              </div>
              <Transition name="fade">
                <p v-if="copied" class="text-success-600 text-xs font-medium mt-2">Copied!</p>
              </Transition>
            </div>

            <!-- Network warning -->
            <div class="bg-warning-50 border border-warning-200 rounded-2xl p-4 flex gap-3">
              <AlertTriangle :size="18" class="text-warning-500 shrink-0 mt-0.5" />
              <p class="text-warning-700 text-sm leading-relaxed">
                Only send <strong>{{ selected.symbol }}</strong> on the
                <strong>{{ selected.network }}</strong> network to this address.
                Sending other assets may result in permanent loss.
              </p>
            </div>
          </div>
        </Transition>
      </div>

      <!-- ===== Fiat Tab ===== -->
      <div v-else class="space-y-4">
        <h2 class="text-base font-semibold text-slate-900">Receive EUR</h2>

        <!-- Copy IBAN -->
        <div class="bg-white rounded-2xl p-4">
          <div class="flex justify-between items-center">
            <div>
              <p class="text-xs text-slate-400 mb-0.5">IBAN</p>
              <p class="font-mono text-sm font-semibold text-slate-900">{{ fiatIban }}</p>
            </div>
            <button @click="copyIban()" class="text-brand-600 text-xs font-medium flex items-center gap-1 active:opacity-70 transition">
              <Check v-if="copiedIban" class="w-3.5 h-3.5" />
              <Copy v-else class="w-3.5 h-3.5" />
              {{ copiedIban ? 'Copied!' : 'Copy' }}
            </button>
          </div>
        </div>

        <!-- Copy REF -->
        <div class="bg-warning-50 border border-warning-200 rounded-2xl p-4">
          <div class="flex justify-between items-center">
            <div>
              <p class="text-xs text-warning-600 font-medium mb-0.5">Reference number (required)</p>
              <p class="font-mono text-sm font-bold text-slate-900">{{ fiatRef }}</p>
            </div>
            <button @click="copyRef()" class="text-warning-700 text-xs font-medium flex items-center gap-1 active:opacity-70 transition">
              <Check v-if="copiedRef" class="w-3.5 h-3.5" />
              <Copy v-else class="w-3.5 h-3.5" />
              {{ copiedRef ? 'Copied!' : 'Copy' }}
            </button>
          </div>
        </div>

        <!-- SEPA/SWIFT -->
        <div class="bg-white rounded-2xl p-4 space-y-2">
          <div class="flex items-center justify-between py-2">
            <div>
              <p class="text-sm font-medium text-slate-900">SEPA (within EU)</p>
              <p class="text-xs text-slate-400">1–2 business days · No fee</p>
            </div>
            <div class="w-4 h-4 rounded-full border-2 border-brand-500 bg-brand-500" />
          </div>
          <div class="flex items-center justify-between py-2 border-t border-slate-100">
            <div>
              <p class="text-sm font-medium text-slate-900">SWIFT (international)</p>
              <p class="text-xs text-slate-400">3–5 business days · ~€20 fee</p>
            </div>
            <div class="w-4 h-4 rounded-full border-2 border-slate-300" />
          </div>
        </div>

        <!-- Share -->
        <button @click="shareDetails()" class="w-full h-12 border border-slate-200 text-slate-700 font-semibold rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-50 active:scale-[0.98] transition">
          <Share2 class="w-4 h-4" />
          {{ copiedShare ? 'Copied to clipboard!' : 'Share bank details' }}
        </button>
      </div>
    </div>
  </AppLayout>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
