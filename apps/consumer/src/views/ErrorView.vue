<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppLayout from '@/components/AppLayout.vue'
import { WifiOff, ShieldAlert, Lock, ServerCrash } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

type ErrorType = 'account-blocked' | 'feature-blocked-kyc' | 'feature-blocked-tier' | 'connection-lost' | 'something-went-wrong'

const type = computed(() => (route.params.type as ErrorType) ?? 'something-went-wrong')

const config = computed(() => {
  const map: Record<ErrorType, {
    icon: unknown
    iconClass: string
    bgClass: string
    title: string
    body: string
    cta: string
    ctaAction: () => void
  }> = {
    'account-blocked': {
      icon: ShieldAlert,
      iconClass: 'text-danger-500',
      bgClass: 'bg-danger-50',
      title: 'Account Suspended',
      body: 'Your account has been temporarily suspended. Please contact support to resolve this.',
      cta: 'Contact Support',
      ctaAction: () => {},
    },
    'feature-blocked-kyc': {
      icon: Lock,
      iconClass: 'text-warning-500',
      bgClass: 'bg-warning-50',
      title: 'Complete KYC to unlock',
      body: 'This feature requires identity verification. Complete your KYC to get started.',
      cta: 'Complete KYC',
      ctaAction: () => router.push('/kyc'),
    },
    'feature-blocked-tier': {
      icon: Lock,
      iconClass: 'text-brand-500',
      bgClass: 'bg-brand-50',
      title: 'Upgrade required',
      body: 'This feature requires a higher KYC level. Upgrade your verification to access it.',
      cta: 'Upgrade KYC',
      ctaAction: () => router.push('/kyc'),
    },
    'connection-lost': {
      icon: WifiOff,
      iconClass: 'text-slate-500',
      bgClass: 'bg-slate-100',
      title: 'Connection lost',
      body: "Can't reach Prodigy servers. Check your internet connection and try again.",
      cta: 'Try again',
      ctaAction: () => window.location.reload(),
    },
    'something-went-wrong': {
      icon: ServerCrash,
      iconClass: 'text-slate-400',
      bgClass: 'bg-slate-100',
      title: 'Something went wrong',
      body: "We're looking into this. Please try again in a moment.",
      cta: 'Try again',
      ctaAction: () => router.go(-1),
    },
  }
  return map[type.value] ?? map['something-went-wrong']
})
</script>

<template>
  <AppLayout>
    <div class="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center relative">
      <!-- Decorative background pattern -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
        <div class="absolute -top-40 -right-40 w-80 h-80 rounded-full border-[40px] border-slate-900" />
        <div class="absolute -bottom-20 -left-20 w-60 h-60 rounded-full border-[30px] border-slate-900" />
      </div>

      <!-- Icon -->
      <div :class="['relative w-24 h-24 rounded-full flex items-center justify-center mb-6', config.bgClass]">
        <component :is="config.icon" :class="['w-12 h-12', config.iconClass]" />
      </div>

      <!-- Text -->
      <h1 class="text-2xl font-bold text-slate-900 mb-3">{{ config.title }}</h1>
      <p class="text-slate-500 text-sm leading-relaxed max-w-xs mb-8">{{ config.body }}</p>

      <!-- CTA -->
      <button
        @click="config.ctaAction()"
        class="h-12 px-8 bg-warning-400 text-slate-900 font-semibold rounded-xl text-sm hover:bg-warning-500 active:scale-[0.98] transition"
      >
        {{ config.cta }}
      </button>

      <!-- Back link -->
      <button
        @click="router.push('/home')"
        class="mt-4 text-sm text-slate-400 hover:text-slate-600 transition"
      >
        Back to Home
      </button>
    </div>
  </AppLayout>
</template>
