<template>
  <div class="wd-wrap" :data-wd-theme="theme" aria-label="Live widget demo" role="img">
    <!-- Browser chrome -->
    <div class="wd-browser">
      <div class="wd-chrome">
        <span class="wd-dot wd-dot--r" />
        <span class="wd-dot wd-dot--y" />
        <span class="wd-dot wd-dot--g" />
        <span class="wd-url">prodigy.example/widget</span>
      </div>

      <!-- Widget body -->
      <div class="wd-body">

        <!-- Step 1 — Amount -->
        <Transition name="wd-fade">
          <div v-if="step === 1" class="wd-step">
            <p class="wd-eyebrow">YOU SEND</p>
            <div class="wd-input-row">
              <span class="wd-amount">€250.00</span>
              <span class="wd-ccy">EUR</span>
            </div>
            <div class="wd-divider" />
            <p class="wd-eyebrow wd-eyebrow--mt">YOU RECEIVE</p>
            <div class="wd-receive">
              <span class="wd-crypto-amt">0.00429</span>
              <span class="wd-ccy">BTC</span>
            </div>
            <div class="wd-rate-row">
              <span class="wd-rate">1 BTC = €58,234</span>
              <span class="wd-fee">Fee: €1.25</span>
            </div>
            <button class="wd-btn" tabindex="-1">Continue →</button>
          </div>
        </Transition>

        <!-- Step 2 — KYC -->
        <Transition name="wd-fade">
          <div v-if="step === 2" class="wd-step wd-step--kyc">
            <div class="wd-kyc-icon">◈</div>
            <p class="wd-kyc-title">Verifying identity</p>
            <div class="wd-progress-track">
              <div class="wd-progress-fill" :style="{ width: kycProgress + '%' }" />
            </div>
            <p class="wd-kyc-sub">{{ kycProgress < 100 ? `${Math.round(kycProgress)}%` : 'Complete' }}</p>
            <div class="wd-kyc-checks">
              <span class="wd-check-item" :class="{ done: kycProgress >= 30 }">◉ ID scan</span>
              <span class="wd-check-item" :class="{ done: kycProgress >= 65 }">◎ Liveness</span>
              <span class="wd-check-item" :class="{ done: kycProgress >= 95 }">◈ Sanctions</span>
            </div>
          </div>
        </Transition>

        <!-- Step 3 — Success -->
        <Transition name="wd-fade">
          <div v-if="step === 3" class="wd-step wd-step--success">
            <div class="wd-checkmark">
              <svg viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" class="wd-circle" />
                <polyline points="11,20 17,27 29,14" class="wd-tick" />
              </svg>
            </div>
            <p class="wd-success-title">Transaction confirmed</p>
            <div class="wd-receipt">
              <div class="wd-rrow"><span>Amount sent</span><span>€250.00</span></div>
              <div class="wd-rrow"><span>Network fee</span><span>€1.25</span></div>
              <div class="wd-rrow"><span>KYC check</span><span class="wd-pass">PASS</span></div>
              <div class="wd-rrow wd-rrow--total"><span>BTC received</span><span>0.00429 BTC</span></div>
            </div>
            <p class="wd-audit">Audit trail logged · Immutable</p>
          </div>
        </Transition>

      </div>

      <!-- Step indicator -->
      <div class="wd-steps-row" aria-hidden="true">
        <span class="wd-step-dot" :class="{ active: step === 1, done: step > 1 }" />
        <span class="wd-step-line" :class="{ done: step > 1 }" />
        <span class="wd-step-dot" :class="{ active: step === 2, done: step > 2 }" />
        <span class="wd-step-line" :class="{ done: step > 2 }" />
        <span class="wd-step-dot" :class="{ active: step === 3 }" />
      </div>
    </div>

    <!-- Live badge -->
    <div class="wd-live-badge" aria-hidden="true">
      <span class="wd-live-dot" />
      <span>LIVE DEMO</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = withDefaults(defineProps<{
  theme?: 'swiss' | 'crypto' | 'bold' | 'fintech' | 'saas' | 'gradient'
}>(), { theme: 'saas' })

const step = ref(1)
const kycProgress = ref(0)

let stepTimer: ReturnType<typeof setTimeout>
let kycTimer: ReturnType<typeof setInterval>

function startKYC() {
  kycProgress.value = 0
  kycTimer = setInterval(() => {
    kycProgress.value = Math.min(100, kycProgress.value + 2.5)
    if (kycProgress.value >= 100) {
      clearInterval(kycTimer)
      stepTimer = setTimeout(() => { step.value = 3 }, 400)
    }
  }, 50)
}

function cycle() {
  if (step.value === 1) {
    stepTimer = setTimeout(() => { step.value = 2; startKYC() }, 2800)
  } else if (step.value === 3) {
    stepTimer = setTimeout(() => {
      step.value = 1
      stepTimer = setTimeout(cycle, 100)
    }, 3200)
  }
}

watch(step, (s) => { if (s === 1) setTimeout(cycle, 100) })

onMounted(() => { setTimeout(cycle, 600) })
onUnmounted(() => { clearTimeout(stepTimer); clearInterval(kycTimer) })
</script>

<style scoped>
/* ── Base ─────────────────────────────────────────────────────────── */
.wd-wrap {
  position: relative;
  display: inline-block;
  /* Theme CSS variables — overridden per theme below */
  --wd-bg: #ffffff;
  --wd-chrome-bg: #f1f5f9;
  --wd-border: #e2e8f0;
  --wd-text: #0f172a;
  --wd-sub: #64748b;
  --wd-accent: #4f46e5;
  --wd-accent-rgb: 79, 70, 229;
  --wd-success: #22c55e;
  --wd-font: 'Space Grotesk', sans-serif;
  --wd-mono: 'IBM Plex Mono', monospace;
  --wd-radius: 16px;
  --wd-shadow: 0 24px 64px rgba(0,0,0,0.12);
}

/* ── Theme overrides ──────────────────────────────────────────────── */
[data-wd-theme="swiss"] {
  --wd-bg: #ffffff;
  --wd-chrome-bg: #0a0a0a;
  --wd-border: #e5e7eb;
  --wd-text: #0a0a0a;
  --wd-sub: #6b7280;
  --wd-accent: #34d399;
  --wd-accent-rgb: 52, 211, 153;
  --wd-font: 'IBM Plex Mono', monospace;
  --wd-radius: 4px;
  --wd-shadow: 0 20px 60px rgba(0,0,0,0.08);
}
[data-wd-theme="crypto"] {
  --wd-bg: #0c1117;
  --wd-chrome-bg: #090e13;
  --wd-border: rgba(0,255,178,0.15);
  --wd-text: #e2e8f0;
  --wd-sub: rgba(255,255,255,0.5);
  --wd-accent: #00ffb2;
  --wd-accent-rgb: 0, 255, 178;
  --wd-success: #00ffb2;
  --wd-font: 'IBM Plex Mono', monospace;
  --wd-radius: 8px;
  --wd-shadow: 0 0 60px rgba(0,255,178,0.08), 0 24px 64px rgba(0,0,0,0.4);
}
[data-wd-theme="bold"] {
  --wd-bg: #111111;
  --wd-chrome-bg: #000000;
  --wd-border: rgba(255,255,255,0.12);
  --wd-text: #ffffff;
  --wd-sub: rgba(255,255,255,0.55);
  --wd-accent: #2563eb;
  --wd-accent-rgb: 37, 99, 235;
  --wd-success: #4ade80;
  --wd-radius: 0px;
  --wd-shadow: 0 0 0 2px #2563eb, 0 24px 64px rgba(0,0,0,0.6);
}
[data-wd-theme="fintech"] {
  --wd-bg: #0e1318;
  --wd-chrome-bg: #080b0f;
  --wd-border: rgba(245,158,11,0.2);
  --wd-text: rgba(255,255,255,0.9);
  --wd-sub: rgba(245,158,11,0.5);
  --wd-accent: #f59e0b;
  --wd-accent-rgb: 245, 158, 11;
  --wd-success: #4ade80;
  --wd-font: 'IBM Plex Mono', monospace;
  --wd-radius: 2px;
  --wd-shadow: 0 0 0 1px rgba(245,158,11,0.2), 0 24px 64px rgba(0,0,0,0.5);
}
[data-wd-theme="gradient"] {
  --wd-bg: rgba(255,255,255,0.05);
  --wd-chrome-bg: rgba(0,0,0,0.4);
  --wd-border: rgba(168,85,247,0.25);
  --wd-text: #ffffff;
  --wd-sub: rgba(255,255,255,0.55);
  --wd-accent: #a855f7;
  --wd-accent-rgb: 168, 85, 247;
  --wd-success: #a855f7;
  --wd-radius: 16px;
  --wd-shadow: 0 0 0 1px rgba(168,85,247,0.3), 0 24px 80px rgba(168,85,247,0.15);
}

/* ── Browser shell ────────────────────────────────────────────────── */
.wd-browser {
  width: 320px;
  border-radius: var(--wd-radius);
  background: var(--wd-bg);
  border: 1px solid var(--wd-border);
  box-shadow: var(--wd-shadow);
  overflow: hidden;
  backdrop-filter: blur(12px);
}
.wd-chrome {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.625rem 0.875rem;
  background: var(--wd-chrome-bg);
  border-bottom: 1px solid var(--wd-border);
}
.wd-dot { width: 8px; height: 8px; border-radius: 50%; }
.wd-dot--r { background: #ef4444; }
.wd-dot--y { background: #f59e0b; }
.wd-dot--g { background: #22c55e; }
.wd-url {
  font-family: var(--wd-mono);
  font-size: 0.6875rem;
  color: rgba(255,255,255,0.3);
  margin-left: 0.5rem;
}

/* ── Widget body ──────────────────────────────────────────────────── */
.wd-body {
  position: relative;
  min-height: 240px;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.wd-step { width: 100%; }

/* Step 1 — amount */
.wd-eyebrow {
  font-family: var(--wd-font);
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--wd-sub);
  margin: 0 0 0.375rem;
  text-transform: uppercase;
}
.wd-eyebrow--mt { margin-top: 0.875rem; }
.wd-input-row, .wd-receive {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}
.wd-amount {
  font-family: var(--wd-font);
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--wd-text);
}
.wd-crypto-amt {
  font-family: var(--wd-font);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--wd-accent);
}
.wd-ccy {
  font-family: var(--wd-font);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--wd-sub);
}
.wd-divider {
  height: 1px;
  background: var(--wd-border);
  margin: 0.75rem 0;
}
.wd-rate-row {
  display: flex;
  justify-content: space-between;
  margin-top: 0.375rem;
}
.wd-rate, .wd-fee {
  font-family: var(--wd-mono);
  font-size: 0.75rem;
  color: var(--wd-sub);
}
.wd-btn {
  display: block;
  width: 100%;
  margin-top: 1rem;
  padding: 0.625rem;
  border-radius: calc(var(--wd-radius) * 0.5);
  background: var(--wd-accent);
  color: #fff;
  font-family: var(--wd-font);
  font-size: 0.875rem;
  font-weight: 600;
  border: none;
  cursor: default;
  text-align: center;
}
[data-wd-theme="fintech"] .wd-btn,
[data-wd-theme="crypto"] .wd-btn { color: #000; }

/* Step 2 — KYC */
.wd-step--kyc { text-align: center; }
.wd-kyc-icon {
  font-size: 2rem;
  color: var(--wd-accent);
  animation: kyc-spin 4s linear infinite;
  display: block;
  margin-bottom: 0.75rem;
}
@keyframes kyc-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.wd-kyc-title {
  font-family: var(--wd-font);
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--wd-text);
  margin: 0 0 0.875rem;
}
.wd-progress-track {
  height: 4px;
  background: rgba(var(--wd-accent-rgb), 0.15);
  border-radius: 99px;
  overflow: hidden;
  margin-bottom: 0.375rem;
}
.wd-progress-fill {
  height: 100%;
  background: var(--wd-accent);
  border-radius: 99px;
  transition: width 0.05s linear;
}
.wd-kyc-sub {
  font-family: var(--wd-mono);
  font-size: 0.75rem;
  color: var(--wd-accent);
  margin: 0 0 1rem;
}
.wd-kyc-checks {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.wd-check-item {
  font-family: var(--wd-mono);
  font-size: 0.6875rem;
  color: var(--wd-sub);
  transition: color 0.3s ease;
}
.wd-check-item.done { color: var(--wd-success); }

/* Step 3 — Success */
.wd-step--success { text-align: center; }
.wd-checkmark { width: 48px; height: 48px; margin: 0 auto 0.75rem; }
.wd-circle {
  stroke: var(--wd-success);
  stroke-width: 2;
  fill: none;
  stroke-dasharray: 113;
  stroke-dashoffset: 0;
  animation: circle-draw 0.5s ease forwards;
}
.wd-tick {
  stroke: var(--wd-success);
  stroke-width: 2.5;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 30;
  stroke-dashoffset: 0;
  animation: tick-draw 0.4s ease 0.4s both;
}
@keyframes circle-draw { from { stroke-dashoffset: 113; } to { stroke-dashoffset: 0; } }
@keyframes tick-draw   { from { stroke-dashoffset: 30; }  to { stroke-dashoffset: 0; }  }
.wd-success-title {
  font-family: var(--wd-font);
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--wd-text);
  margin: 0 0 0.875rem;
}
.wd-receipt {
  text-align: left;
  border: 1px solid var(--wd-border);
  border-radius: calc(var(--wd-radius) * 0.5);
  overflow: hidden;
  margin-bottom: 0.5rem;
}
.wd-rrow {
  display: flex;
  justify-content: space-between;
  padding: 0.375rem 0.75rem;
  font-family: var(--wd-mono);
  font-size: 0.75rem;
  color: var(--wd-sub);
  border-bottom: 1px solid var(--wd-border);
}
.wd-rrow:last-child { border-bottom: none; }
.wd-rrow--total {
  font-weight: 700;
  color: var(--wd-text);
  background: rgba(var(--wd-accent-rgb), 0.06);
}
.wd-pass { color: var(--wd-success); font-weight: 700; }
.wd-audit {
  font-family: var(--wd-mono);
  font-size: 0.6875rem;
  color: var(--wd-sub);
  margin: 0;
}

/* ── Step indicator ───────────────────────────────────────────────── */
.wd-steps-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  padding: 0.625rem 1.25rem;
  background: rgba(var(--wd-accent-rgb), 0.04);
  border-top: 1px solid var(--wd-border);
}
.wd-step-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--wd-border);
  transition: background 0.4s ease, transform 0.3s ease;
  flex-shrink: 0;
}
.wd-step-dot.active { background: var(--wd-accent); transform: scale(1.3); }
.wd-step-dot.done   { background: rgba(var(--wd-accent-rgb), 0.4); }
.wd-step-line {
  flex: 1;
  height: 1px;
  background: var(--wd-border);
  max-width: 40px;
  transition: background 0.5s ease;
}
.wd-step-line.done { background: rgba(var(--wd-accent-rgb), 0.5); }

/* ── Live badge ───────────────────────────────────────────────────── */
.wd-live-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.625rem;
  border-radius: 99px;
  background: rgba(var(--wd-accent-rgb), 0.1);
  border: 1px solid rgba(var(--wd-accent-rgb), 0.25);
  font-family: var(--wd-mono);
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--wd-accent);
  margin-top: 0.75rem;
  letter-spacing: 0.06em;
}
.wd-live-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--wd-accent);
  animation: live-pulse 1.5s ease-in-out infinite;
}
@keyframes live-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.8)} }

/* ── Transition ───────────────────────────────────────────────────── */
.wd-fade-enter-active, .wd-fade-leave-active { transition: opacity 0.35s ease, transform 0.35s ease; position: absolute; width: calc(100% - 2.5rem); }
.wd-fade-enter-from  { opacity: 0; transform: translateY(12px); }
.wd-fade-leave-to    { opacity: 0; transform: translateY(-12px); }
.wd-fade-enter-to, .wd-fade-leave-from { opacity: 1; transform: translateY(0); }

/* ── Reduced motion ───────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .wd-kyc-icon { animation: none; }
  .wd-live-dot { animation: none; }
  .wd-fade-enter-active, .wd-fade-leave-active { transition: opacity 0.2s ease; }
  .wd-circle, .wd-tick { animation: none; stroke-dashoffset: 0; }
}

/* ── Responsive ───────────────────────────────────────────────────── */
@media (max-width: 400px) {
  .wd-browser { width: 280px; }
  .wd-amount  { font-size: 1.5rem; }
}
</style>
