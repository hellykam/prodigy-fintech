<script setup lang="ts">
import { ref } from 'vue'
import { Card } from '@prodigy/ui'
import WidgetView from './WidgetView.vue'

type WidgetTheme = 'light' | 'dark' | 'brand'
const widgetTheme = ref<WidgetTheme>('brand')

const themeButtons: { label: string; value: WidgetTheme }[] = [
  { label: 'Brand', value: 'brand' },
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
]
</script>

<template>
  <div class="min-h-screen bg-slate-100 flex flex-col">

    <!-- Top Nav -->
    <nav class="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div class="w-7 h-7 bg-brand-600 rounded-lg flex items-center justify-center">
            <span class="text-white text-xs font-bold">P</span>
          </div>
          <span class="font-semibold text-slate-900 text-sm">Prodigy Widget SDK</span>
        </div>
        <div class="flex items-center gap-6">
          <a href="#" class="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium">Documentation</a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener"
            class="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium"
          >GitHub</a>
        </div>
      </div>
    </nav>

    <!-- Hero + Widget Section -->
    <div class="flex-1 max-w-7xl mx-auto w-full px-6 py-16">
      <div class="grid lg:grid-cols-2 gap-12 items-center">

        <!-- Left — Prose -->
        <div class="space-y-8">
          <div class="space-y-4">
            <div class="inline-flex items-center gap-2 bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-brand-100">
              <span class="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"></span>
              Live sandbox demo
              <span class="inline-flex items-center gap-1 bg-success-500 text-white text-2xs font-bold px-1.5 py-0.5 rounded">
                <span class="w-1 h-1 rounded-full bg-white animate-pulse"></span>
                LIVE
              </span>
            </div>
            <h1 class="text-2xl font-bold text-slate-900 leading-tight">
              Embed in<br />
              <span class="text-brand-600">minutes</span>
            </h1>
            <p class="text-lg text-slate-500 leading-relaxed max-w-md">
              Add a fully-functional crypto purchase flow to any website with 3&nbsp;lines of code.
            </p>
          </div>

          <!-- Feature Bullets -->
          <ul class="space-y-3">
            <li
              v-for="feature in [
                'Real-time prices',
                'KYC-verified users',
                'Compliance built-in',
                'White-label ready',
              ]"
              :key="feature"
              class="flex items-center gap-3 text-slate-700"
            >
              <span class="w-5 h-5 rounded-full bg-success-50 flex items-center justify-center shrink-0">
                <svg class="w-3 h-3 text-success-600" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <span class="text-sm font-medium">{{ feature }}</span>
            </li>
          </ul>

          <!-- Code Snippet -->
          <div class="rounded-xl overflow-hidden border border-slate-800">
            <div class="bg-slate-800 px-4 py-2.5 flex items-center gap-2 border-b border-slate-700">
              <div class="flex gap-1.5">
                <span class="w-3 h-3 rounded-full bg-danger-500 opacity-80"></span>
                <span class="w-3 h-3 rounded-full bg-warning-500 opacity-80"></span>
                <span class="w-3 h-3 rounded-full bg-success-500 opacity-80"></span>
              </div>
              <span class="text-slate-400 text-xs ml-2 font-mono">index.html</span>
            </div>
            <div class="bg-slate-900 px-5 py-4">
              <pre class="text-sm font-mono leading-relaxed"><span class="text-slate-500">&lt;!-- Paste this wherever you want the widget --&gt;</span>
<span class="text-brand-400">&lt;iframe</span>
  <span class="text-success-400">src</span><span class="text-white">=</span><span class="text-warning-400">"https://widget.prodigy.finance"</span>
  <span class="text-success-400">width</span><span class="text-white">=</span><span class="text-warning-400">"390"</span>
  <span class="text-success-400">height</span><span class="text-white">=</span><span class="text-warning-400">"520"</span>
<span class="text-brand-400">/&gt;</span></pre>
            </div>
          </div>
        </div>

        <!-- Right — Widget Preview -->
        <div class="flex flex-col items-center gap-3">
          <!-- Theme toggle -->
          <div class="flex items-center gap-2 mb-4" role="group" aria-label="Widget theme selector">
            <span class="text-xs text-slate-500 font-medium mr-1">Theme:</span>
            <button
              v-for="btn in themeButtons"
              :key="btn.value"
              class="px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all"
              :class="widgetTheme === btn.value
                ? btn.value === 'dark'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : btn.value === 'light'
                    ? 'bg-white text-slate-900 border-slate-300 shadow-sm'
                    : 'bg-brand-600 text-white border-brand-600'
                : 'bg-transparent text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700'"
              @click="widgetTheme = btn.value"
              :aria-pressed="widgetTheme === btn.value"
            >{{ btn.label }}</button>
          </div>

          <!-- Device mockup wrapper -->
          <div class="relative">
            <!-- Glow effect -->
            <div class="absolute -inset-4 bg-brand-500/5 rounded-3xl blur-xl"></div>
            <!-- Mockup border -->
            <div
              class="relative rounded-[28px] p-3 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.18)] border transition-colors duration-300"
              :class="widgetTheme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200/80'"
            >
              <div
                class="rounded-[20px] p-4 overflow-hidden transition-colors duration-300"
                :class="widgetTheme === 'dark' ? 'bg-slate-800' : widgetTheme === 'light' ? 'bg-slate-50' : 'bg-slate-100'"
              >
                <WidgetView :data-theme-override="widgetTheme" />
              </div>
            </div>
          </div>
          <div class="flex items-center gap-1.5 text-xs text-slate-400 font-medium tracking-wide">
            <span class="w-1.5 h-1.5 rounded-full bg-success-500 animate-pulse flex-shrink-0"></span>
            Live demo — connected to Prodigy sandbox
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="max-w-7xl mx-auto w-full px-6 pb-16">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card
          v-for="stat in [
            { value: '€2.4M', label: 'Processed', sub: 'Total volume this month' },
            { value: '12', label: 'Partners', sub: 'Active integrations' },
            { value: '99.9%', label: 'Uptime', sub: 'Over the last 90 days' },
          ]"
          :key="stat.value"
          class="text-center py-6 px-4"
        >
          <p class="text-2xl font-bold text-slate-900">{{ stat.value }}</p>
          <p class="text-sm font-semibold text-brand-600 mt-1">{{ stat.label }}</p>
          <p class="text-xs text-slate-400 mt-1">{{ stat.sub }}</p>
        </Card>
      </div>
    </div>

    <!-- Footer -->
    <footer class="border-t border-slate-200 bg-white">
      <div class="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <div class="w-5 h-5 bg-brand-600 rounded flex items-center justify-center">
            <span class="text-white text-2xs font-bold">P</span>
          </div>
          <span class="text-sm text-slate-500">© 2026 Prodigy Finance. All rights reserved.</span>
        </div>
        <div class="flex items-center gap-6">
          <a href="#" class="text-xs text-slate-400 hover:text-slate-600 transition-colors">Privacy</a>
          <a href="#" class="text-xs text-slate-400 hover:text-slate-600 transition-colors">Terms</a>
          <a href="#" class="text-xs text-slate-400 hover:text-slate-600 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  </div>
</template>
