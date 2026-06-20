<script setup lang="ts">
import { useRouter } from 'vue-router'
import AppLayout from '../layouts/AppLayout.vue'
const router = useRouter()
</script>
<template>
  <AppLayout>
    <div class="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <p class="text-8xl font-black text-slate-100 leading-none mb-4">404</p>
      <h1 class="text-2xl font-bold text-slate-900 mb-2">Page not found</h1>
      <p class="text-slate-500 mb-8">The page you're looking for doesn't exist.</p>
      <button @click="router.push('/')" class="px-5 py-2.5 bg-brand-600 text-white rounded-xl font-semibold text-sm hover:bg-brand-700 transition">
        Go Home
      </button>
    </div>
  </AppLayout>
</template>
