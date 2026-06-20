<script setup lang="ts">
import { ref } from 'vue'
import { Loader2, CheckCircle, XCircle, X, Play, RotateCcw } from 'lucide-vue-next'
import { useDemo } from '../composables/useDemo'
import type { DemoStep, ScenarioName } from '../composables/useDemo'

const expanded = ref(false)

const {
  selectedScenario,
  scenarios,
  steps,
  isRunning,
  lastResetAt,
  runScenario,
  resetDemo,
  selectScenario,
} = useDemo()

const confirmingReset = ref(false)

function toggle() {
  expanded.value = !expanded.value
}

function close() {
  expanded.value = false
}

async function handleRun() {
  await runScenario(selectedScenario.value)
}

function handleSelectScenario(name: ScenarioName) {
  selectScenario(name)
}

function promptReset() {
  confirmingReset.value = true
}

function cancelReset() {
  confirmingReset.value = false
}

async function confirmReset() {
  confirmingReset.value = false
  await resetDemo()
}

function stepIcon(step: DemoStep) {
  return step.status
}

const allPending = () => steps.value.every(s => s.status === 'pending')
const anyProgress = () => steps.value.some(s => s.status !== 'pending')
const isDone = () => steps.value.length > 0 && steps.value.every(s => s.status === 'done')
const hasFailed = () => steps.value.some(s => s.status === 'failed')
</script>

<template>
  <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
    <!-- Expanded panel -->
    <Transition name="demo-panel">
      <div
        v-if="expanded"
        class="w-84 bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden"
        style="width: 22rem"
      >
        <!-- Header -->
        <div class="flex items-start justify-between px-4 py-3.5 border-b border-slate-700/60">
          <div>
            <p class="text-sm font-semibold text-white leading-tight">Demo Mode</p>
            <p class="text-xs text-slate-400 mt-0.5">
              {{ scenarios.find(s => s.name === selectedScenario)?.description ?? 'Select a scenario' }}
            </p>
          </div>
          <button
            type="button"
            class="text-slate-400 hover:text-white transition-colors -mt-0.5 -mr-1 p-1 rounded"
            @click="close"
            aria-label="Close demo panel"
          >
            <X class="w-4 h-4" />
          </button>
        </div>

        <!-- Scenario selector -->
        <div class="px-4 pt-3 pb-1">
          <p class="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">Scenario</p>
          <div class="space-y-1">
            <label
              v-for="sc in scenarios"
              :key="sc.name"
              class="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="radio"
                :value="sc.name"
                :checked="selectedScenario === sc.name"
                :disabled="isRunning"
                class="accent-brand-500 w-3 h-3 cursor-pointer"
                @change="handleSelectScenario(sc.name as ScenarioName)"
              />
              <span
                class="text-xs leading-tight"
                :class="selectedScenario === sc.name ? 'text-white font-medium' : 'text-slate-400 group-hover:text-slate-300'"
              >{{ sc.title }}</span>
            </label>
          </div>
        </div>

        <!-- Body -->
        <div class="px-4 py-3 space-y-3">

          <!-- Step list (once in progress) -->
          <template v-if="anyProgress() || isRunning">
            <ul class="space-y-2">
              <li
                v-for="step in steps"
                :key="step.id"
                class="flex items-start gap-2.5"
              >
                <span class="flex-shrink-0 mt-0.5">
                  <Loader2
                    v-if="step.status === 'running'"
                    class="w-4 h-4 text-brand-400 animate-spin"
                  />
                  <CheckCircle
                    v-else-if="step.status === 'done'"
                    class="w-4 h-4 text-success-400"
                  />
                  <XCircle
                    v-else-if="step.status === 'failed'"
                    class="w-4 h-4 text-danger-400"
                  />
                  <span
                    v-else
                    class="inline-block w-4 h-4 text-center leading-4 text-slate-600 text-xs select-none"
                  >○</span>
                </span>
                <div class="min-w-0 flex-1">
                  <p
                    class="text-xs font-medium leading-tight"
                    :class="{
                      'text-white': step.status === 'running',
                      'text-slate-300': step.status === 'done',
                      'text-danger-400': step.status === 'failed',
                      'text-slate-500': step.status === 'pending',
                    }"
                  >{{ step.label }}</p>
                  <p v-if="step.detail" class="text-xs text-slate-400 mt-0.5 truncate">{{ step.detail }}</p>
                </div>
              </li>
            </ul>
          </template>

          <!-- Done banner -->
          <div
            v-if="isDone()"
            class="rounded-lg bg-success-900/30 border border-success-700/40 px-3 py-2"
          >
            <p class="text-xs font-semibold text-success-400">Scenario complete!</p>
          </div>

          <!-- Error banner -->
          <div
            v-if="hasFailed() && !isDone()"
            class="rounded-lg bg-danger-900/30 border border-danger-700/40 px-3 py-2"
          >
            <p class="text-xs font-semibold text-danger-400">Step failed — check detail above.</p>
          </div>

          <!-- Last reset timestamp -->
          <p v-if="lastResetAt" class="text-[10px] text-slate-500 text-right">
            Reset at {{ new Date(lastResetAt).toLocaleTimeString() }}
          </p>

          <!-- Actions -->
          <div class="flex gap-2">
            <!-- Reset confirm flow -->
            <template v-if="confirmingReset">
              <p class="text-xs text-slate-300 flex-1 leading-tight">Reset all demo data?</p>
              <button
                type="button"
                class="h-8 px-3 text-xs font-medium rounded-lg bg-danger-600 hover:bg-danger-700 text-white transition-colors"
                @click="confirmReset"
              >Yes</button>
              <button
                type="button"
                class="h-8 px-3 text-xs font-medium rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors"
                @click="cancelReset"
              >Cancel</button>
            </template>

            <template v-else>
              <button
                type="button"
                :disabled="isRunning"
                class="flex-1 inline-flex items-center justify-center gap-1.5 h-9 px-4 text-sm font-medium rounded-lg bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors"
                @click="handleRun"
              >
                <Loader2 v-if="isRunning" class="w-4 h-4 animate-spin" />
                <Play v-else class="w-4 h-4" />
                {{ isRunning ? 'Running…' : 'Run' }}
              </button>
              <button
                type="button"
                :disabled="isRunning"
                class="inline-flex items-center justify-center gap-1 h-9 px-3 text-sm font-medium rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-200 transition-colors"
                title="Reset demo data"
                @click="promptReset"
              >
                <RotateCcw class="w-4 h-4" />
                Reset
              </button>
            </template>
          </div>

        </div>
      </div>
    </Transition>

    <!-- Floating trigger button -->
    <button
      type="button"
      class="w-14 h-14 rounded-full bg-brand-600 hover:bg-brand-700 shadow-xl flex flex-col items-center justify-center gap-0.5 transition-colors text-white"
      :title="expanded ? 'Close Demo Mode' : 'Open Demo Mode'"
      @click="toggle"
    >
      <span class="text-lg leading-none" aria-hidden="true">🎬</span>
      <span class="text-[10px] font-semibold leading-none tracking-wide">Demo</span>
    </button>
  </div>
</template>

<style scoped>
.demo-panel-enter-active,
.demo-panel-leave-active {
  transition: all 0.2s ease;
}
.demo-panel-enter-from,
.demo-panel-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}
</style>
