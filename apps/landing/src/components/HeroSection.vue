<template>
  <section class="hero" aria-labelledby="hero-headline">
    <div class="hero-inner">

      <!-- Left: editorial headline -->
      <div class="hero-left">
        <!-- Live price ticker -->
        <div class="price-strip" aria-label="Live crypto prices (simulated)">
          <span
            v-for="p in prices"
            :key="p.sym"
            class="price-chip"
            :class="p.dir === 'up' ? 'price-up' : 'price-down'"
          >
            <span class="price-sym">{{ p.sym }}</span>
            <span class="price-val">{{ p.val }}</span>
            <span class="price-dir" aria-hidden="true">{{ p.dir === 'up' ? '▲' : '▼' }}</span>
          </span>
        </div>

        <p class="label hero-eyebrow">{{ copy.eyebrow }}</p>

        <h1 id="hero-headline" class="hero-headline">
          <span v-for="line in copy.headline" :key="line" class="headline-line">{{ line }}</span>
          <span class="headline-line iris-text">{{ copy.headlineAccent }}</span>
        </h1>

        <p class="hero-sub">{{ copy.subheadline }}</p>

        <div class="hero-ctas">
          <a href="http://localhost:5001" target="_blank" rel="noopener noreferrer" class="cta-primary">{{ copy.cta }} →</a>
          <a href="#how-it-works" class="cta-secondary">{{ copy.ctaSecondary }}</a>
        </div>

        <div class="demo-pills" aria-label="Live demo apps">
          <a href="http://localhost:5001" target="_blank" rel="noopener noreferrer" class="demo-pill">↗ Consumer</a>
          <a href="http://localhost:5002" target="_blank" rel="noopener noreferrer" class="demo-pill">↗ Admin</a>
          <a href="http://localhost:5003" target="_blank" rel="noopener noreferrer" class="demo-pill">↗ KYC</a>
          <a href="http://localhost:5004" target="_blank" rel="noopener noreferrer" class="demo-pill">↗ System Map</a>
          <a href="http://localhost:5005" target="_blank" rel="noopener noreferrer" class="demo-pill">↗ Widget</a>
          <a href="http://localhost:5006" target="_blank" rel="noopener noreferrer" class="demo-pill">↗ Partner</a>
        </div>

        <p class="hero-micro">{{ copy.microcopy }}</p>
      </div>

      <!-- Right: receipt panel + orb -->
      <div class="hero-right" aria-label="Demo widget preview">
        <!-- Iridescent orb — purely decorative -->
        <div class="iris-orb" aria-hidden="true" />

        <!-- Grid dots pattern -->
        <div class="grid-dots" aria-hidden="true" />

        <!-- Animated receipt widget -->
        <div class="receipt-card widget-receipt" aria-live="polite">
          <div class="receipt-header">
            <span class="receipt-brand">◈ PRODIGY WIDGET</span>
            <span class="label">DEMO</span>
          </div>

          <hr class="receipt-rule" />

          <div class="receipt-section">
            <div class="receipt-row-pair">
              <span class="receipt-pair-label">Converting</span>
              <span class="receipt-pair-value">EUR → BTC</span>
            </div>
            <div class="receipt-row-pair">
              <span class="receipt-pair-label">Amount</span>
              <span class="receipt-pair-value">€500.00</span>
            </div>
            <div class="receipt-row-pair">
              <span class="receipt-pair-label">Rate</span>
              <span class="receipt-pair-value">€58,234 / BTC</span>
            </div>
          </div>

          <hr class="receipt-rule" />

          <div class="receipt-section">
            <div class="status-row">
              <span class="status-icon" :class="kycStatusClass" aria-hidden="true">{{ kycIcon }}</span>
              <span class="status-label">{{ kycLabel }}</span>
            </div>
            <div class="status-row">
              <span class="status-icon" :class="riskStatusClass" aria-hidden="true">{{ riskIcon }}</span>
              <span class="status-label">{{ riskLabel }}</span>
            </div>
          </div>

          <hr class="receipt-rule" />

          <Transition name="fee-reveal">
            <div v-if="showFees" class="receipt-section">
              <div class="receipt-row-pair muted">
                <span>Platform fee (0.50%)</span>
                <span>€2.50</span>
              </div>
              <div class="receipt-row-pair muted">
                <span>Partner share (0.20%)</span>
                <span>€1.00</span>
              </div>
              <div class="receipt-row-pair muted">
                <span>Network fee</span>
                <span>€0.80</span>
              </div>
              <hr class="receipt-rule" />
              <div class="receipt-row-pair bold">
                <span>You receive</span>
                <span class="iris-text">0.00852 BTC</span>
              </div>
            </div>
          </Transition>

          <div class="receipt-cta-row">
            <button class="receipt-btn" :class="{ 'receipt-btn--complete': step === 'complete' }" disabled>
              {{ receiptBtnLabel }}
            </button>
          </div>

          <div class="step-dots" aria-hidden="true">
            <span
              v-for="(s, i) in steps"
              :key="s"
              class="step-dot"
              :class="{ active: i <= stepIndex }"
            />
          </div>
        </div>

        <!-- Admin echo — appears on complete -->
        <Transition name="admin-echo">
          <div v-if="step === 'complete'" class="admin-echo">
            <span class="label" style="color: rgba(255,255,255,0.65)">ADMIN CONSOLE</span>
            <div class="admin-event">
              <span class="admin-dot" aria-hidden="true" />
              <span>TXN-8841 posted · 0.00852 BTC · Partner share €1.00</span>
            </div>
          </div>
        </Transition>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { hero as copy } from '@/content/landingCopy'

type Step = 'quote' | 'kyc-checking' | 'kyc-approved' | 'risk' | 'fees' | 'complete'
const steps: Step[] = ['quote', 'kyc-checking', 'kyc-approved', 'risk', 'fees', 'complete']
const step = ref<Step>('quote')
const stepIndex = computed(() => steps.indexOf(step.value))

let timer: ReturnType<typeof setInterval>
onMounted(() => {
  let i = 0
  timer = setInterval(() => {
    i = (i + 1) % steps.length
    step.value = steps[i]!
  }, 1800)
})
onUnmounted(() => clearInterval(timer))

const kycIcon = computed(() => step.value === 'quote' ? '○' : step.value === 'kyc-checking' ? '◌' : '●')
const kycLabel = computed(() => step.value === 'quote' ? 'KYC: Pending' : step.value === 'kyc-checking' ? 'KYC: Checking...' : 'KYC: Verified')
const kycStatusClass = computed(() => step.value === 'kyc-checking' ? 'status-checking' : ['kyc-approved','risk','fees','complete'].includes(step.value) ? 'status-ok' : '')
const riskIcon = computed(() => ['quote','kyc-checking','kyc-approved'].includes(step.value) ? '○' : '●')
const riskLabel = computed(() => ['quote','kyc-checking','kyc-approved'].includes(step.value) ? 'Risk: Pending' : 'Risk: Clear')
const riskStatusClass = computed(() => ['risk','fees','complete'].includes(step.value) ? 'status-ok' : '')
const showFees = computed(() => ['fees','complete'].includes(step.value))
const receiptBtnLabel = computed(() => step.value === 'complete' ? '✓ Transaction complete' : step.value === 'fees' ? 'Confirm transaction →' : 'Checking...')

// Simulated live prices
interface Price { sym: string; val: string; dir: 'up' | 'down' }
const basePrices = [
  { sym: 'BTC', base: 58234 },
  { sym: 'ETH', base: 3102 },
  { sym: 'SOL', base: 147 },
]

function randPrice(base: number) {
  const delta = (Math.random() - 0.48) * base * 0.003
  return Math.round(base + delta)
}

const prices = ref<Price[]>(basePrices.map(p => ({
  sym: p.sym,
  val: `€${p.base.toLocaleString('en')}`,
  dir: 'up',
})))

let priceTimer: ReturnType<typeof setInterval>
onMounted(() => {
  priceTimer = setInterval(() => {
    prices.value = basePrices.map((p, i) => {
      const prev = parseInt(prices.value[i]!.val.replace(/[^0-9]/g, ''))
      const next = randPrice(p.base)
      return { sym: p.sym, val: `€${next.toLocaleString('en')}`, dir: next >= prev ? 'up' : 'down' }
    })
  }, 2800)
})
onUnmounted(() => clearInterval(priceTimer))
</script>

<style scoped>
.hero {
  border-bottom: 1px solid var(--ink);
  overflow: hidden;
}

.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1440px;
  margin: 0 auto;
  min-height: calc(100vh - 3.25rem);
}

/* ── Left ── */
.hero-left {
  padding: 3.5rem 3rem 3.5rem 1.5rem;
  border-right: 1px solid var(--ink);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
}

/* Live price strip */
.price-strip {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.price-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  border: 1px solid var(--line);
  padding: 0.25rem 0.625rem;
  letter-spacing: 0.02em;
  transition: border-color 0.3s;
}

.price-sym {
  font-weight: 700;
  color: var(--ink);
}

.price-val {
  color: var(--ink-mid);
}

.price-dir {
  font-size: 0.75rem;
}

.price-up .price-dir { color: #1a7a3c; }
.price-down .price-dir { color: #c44; }

.hero-eyebrow {
  margin: 0;
}

.hero-headline {
  display: flex;
  flex-direction: column;
  margin: 0;
}

.headline-line {
  font-family: 'Barlow Condensed', Impact, 'Arial Narrow', sans-serif;
  font-size: clamp(4.5rem, 11vw, 9.5rem);
  font-weight: 900;
  line-height: 0.92;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  display: block;
}

.hero-sub {
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--ink-mid);
  max-width: 34ch;
  margin: 0;
}

.hero-ctas {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.cta-primary {
  display: inline-block;
  font-family: 'Space Mono', monospace;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--paper);
  background: var(--ink);
  text-decoration: none;
  padding: 0.875rem 1.75rem;
  border: 1.5px solid var(--ink);
  transition: background 0.15s, color 0.15s;
}

.cta-primary:hover { background: var(--paper); color: var(--ink); }

.cta-secondary {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-mid);
  text-decoration: none;
  border-bottom: 1px solid var(--ink-mid);
  padding-bottom: 1px;
  transition: color 0.15s, border-color 0.15s;
}

.cta-secondary:hover { color: var(--ink); border-color: var(--ink); }

.hero-micro {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  color: var(--ink-mid);
  margin: 0;
}

.demo-pills {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.demo-pill {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-mid);
  text-decoration: none;
  border: 1px solid var(--ink-mid);
  padding: 0.25rem 0.625rem;
  transition: color 0.15s, border-color 0.15s, background 0.15s;
}

.demo-pill:hover {
  color: var(--ink);
  border-color: var(--ink);
  background: var(--ink-faint, rgba(0,0,0,0.03));
}

/* ── Right ── */
.hero-right {
  padding: 3rem 1.5rem 3rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  position: relative;
  background: #fafafa;
  overflow: hidden;
}

/* Iridescent orb */
.iris-orb {
  position: absolute;
  top: -80px;
  right: -80px;
  width: 340px;
  height: 340px;
  border-radius: 60% 40% 55% 45% / 50% 60% 40% 50%;
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 20%,
    #f093fb 40%,
    #f5576c 60%,
    #4facfe 80%,
    #00f2fe 100%
  );
  background-size: 200% 200%;
  opacity: 0.12;
  animation: orb-float 8s ease-in-out infinite, orb-iris 10s linear infinite;
  pointer-events: none;
  filter: blur(40px);
}

@keyframes orb-float {
  0%, 100% { transform: translate(0, 0) scale(1); border-radius: 60% 40% 55% 45% / 50% 60% 40% 50%; }
  33%       { transform: translate(-20px, 15px) scale(1.05); border-radius: 45% 55% 40% 60% / 60% 40% 55% 45%; }
  66%       { transform: translate(15px, -10px) scale(0.97); border-radius: 55% 45% 60% 40% / 40% 55% 45% 60%; }
}

@keyframes orb-iris {
  0%   { background-position: 0% 0%; }
  100% { background-position: 200% 200%; }
}

/* Grid dots background */
@keyframes grid-pulse {
  0%, 100% { opacity: 0.3; }
  50%       { opacity: 0.6; }
}

.grid-dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, var(--line) 1px, transparent 1px);
  background-size: 24px 24px;
  opacity: 0.3;
  pointer-events: none;
  animation: grid-pulse 6s ease-in-out infinite;
}

/* Widget receipt */
.widget-receipt {
  background: var(--paper);
  border: 1.5px solid var(--ink);
  padding: 1.25rem;
  max-width: 360px;
  font-family: 'Space Mono', monospace;
  font-size: 0.8125rem;
  position: relative;
  z-index: 1;
}

.widget-receipt::before {
  content: '';
  position: absolute;
  top: -4px;
  left: 0;
  right: 0;
  height: 4px;
  background: repeating-linear-gradient(
    90deg,
    var(--ink) 0px, var(--ink) 5px,
    transparent 5px, transparent 10px
  );
}

.receipt-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.receipt-brand {
  font-weight: 700;
  letter-spacing: 0.04em;
}

.receipt-rule {
  border: none;
  border-top: 1px dashed var(--line);
  margin: 0.625rem 0;
}

.receipt-section {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.receipt-row-pair {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.receipt-pair-label { color: var(--ink-muted); }
.receipt-row-pair.muted { color: var(--ink-muted); }
.receipt-row-pair.bold { font-weight: 700; }

.status-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-icon {
  font-size: 0.875rem;
  color: var(--ink-muted);
  transition: color 0.3s;
}

.status-icon.status-ok { color: var(--ink); }
.status-icon.status-checking {
  animation: blink 0.9s ease-in-out infinite;
}

@keyframes blink {
  0%, 100% { opacity: 0.3; }
  50%       { opacity: 1; }
}

.receipt-cta-row { margin-top: 0.875rem; }

.receipt-btn {
  width: 100%;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.625rem;
  border: 1.5px solid var(--line);
  background: none;
  color: var(--ink-muted);
  cursor: not-allowed;
  transition: border-color 0.3s, color 0.3s;
}

.receipt-btn--complete { border-color: var(--ink); color: var(--ink); }

.step-dots {
  display: flex;
  gap: 4px;
  justify-content: center;
  margin-top: 0.875rem;
}

.step-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--line);
  transition: background 0.3s;
}

.step-dot.active { background: var(--ink); }

/* Admin echo */
.admin-echo {
  background: var(--ink);
  color: var(--paper);
  padding: 0.875rem 1rem;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  z-index: 1;
}

.admin-event {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.03em;
}

.admin-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #a9fe52;
  flex-shrink: 0;
  animation: dot-pulse 1.5s ease-in-out infinite;
}

@keyframes dot-pulse {
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 1; }
}

/* Transitions */
.fee-reveal-enter-active { transition: opacity 0.4s ease, transform 0.4s ease; }
.fee-reveal-enter-from   { opacity: 0; transform: translateY(-4px); }
.admin-echo-enter-active { transition: opacity 0.5s ease, transform 0.5s ease; }
.admin-echo-enter-from   { opacity: 0; transform: translateY(8px); }

/* Responsive */
@media (max-width: 900px) {
  .hero-inner {
    grid-template-columns: 1fr;
    min-height: auto;
  }

  .hero-left {
    border-right: none;
    border-bottom: 1px solid var(--ink);
    padding: 3rem 1.5rem;
  }

  .hero-right {
    padding: 2.5rem 1.5rem;
    align-items: center;
  }

  .iris-orb {
    width: 220px;
    height: 220px;
    top: -40px;
    right: -40px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .iris-orb { animation: none; }
  .admin-dot { animation: none; }
  .status-icon.status-checking { animation: none; }
  .grid-dots { animation: none; opacity: 0.4; }
}
</style>
