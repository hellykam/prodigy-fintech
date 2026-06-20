<template>
  <div class="fc-wrap" :data-fc-theme="theme" aria-label="Partner revenue calculator">

    <!-- Partner type tabs -->
    <div class="fc-tabs" role="tablist" aria-label="Partner type">
      <button
        v-for="t in partnerTypes"
        :key="t.id"
        class="fc-tab"
        :class="{ active: selected === t.id }"
        role="tab"
        :aria-selected="selected === t.id"
        @click="selected = t.id"
      >{{ t.label }}</button>
    </div>

    <!-- Volume slider -->
    <div class="fc-slider-wrap">
      <div class="fc-slider-header">
        <span class="fc-slider-label">Monthly transaction volume</span>
        <span class="fc-vol-display" aria-live="polite">{{ formatEur(volume) }}</span>
      </div>
      <input
        type="range"
        class="fc-slider"
        :min="sliderMin"
        :max="sliderMax"
        :step="sliderStep"
        :value="rawSlider"
        @input="onSlider"
        :aria-label="`Volume: ${formatEur(volume)}`"
        :aria-valuemin="sliderMin"
        :aria-valuemax="sliderMax"
        :aria-valuenow="rawSlider"
      />
      <div class="fc-slider-ticks" aria-hidden="true">
        <span>€10k</span>
        <span>€100k</span>
        <span>€500k</span>
        <span>€1M</span>
        <span>€5M</span>
      </div>
    </div>

    <!-- Results grid -->
    <div class="fc-results" aria-live="polite" aria-label="Revenue breakdown">
      <div class="fc-result-row" v-for="row in breakdown" :key="row.label">
        <span class="fc-result-label">{{ row.label }}</span>
        <span class="fc-result-value" :class="row.highlight ? 'highlight' : ''">{{ row.value }}</span>
      </div>
    </div>

    <!-- Monthly payout highlight -->
    <div class="fc-payout">
      <div class="fc-payout-label">Estimated monthly partner revenue</div>
      <div class="fc-payout-value" aria-live="polite">{{ formatEur(partnerShare) }}</div>
      <div class="fc-payout-rate" aria-live="polite">at {{ currentType.rateLabel }} revenue share</div>
    </div>

    <p class="fc-disclaimer">
      This is a simulation based on demo pricing. Actual rates are set in your partner agreement.
      No real money moves in this demo.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = withDefaults(defineProps<{
  theme?: 'swiss' | 'crypto' | 'bold' | 'fintech' | 'saas' | 'gradient'
}>(), { theme: 'saas' })

// Slider is logarithmic: map 0–100 to €10k–€5M
const sliderMin = 0
const sliderMax = 100
const sliderStep = 1
const rawSlider = ref(40) // default ~€100k

// Logarithmic volume: 10_000 to 5_000_000
const volume = computed(() => {
  const t = rawSlider.value / 100
  return Math.round(10_000 * Math.pow(500, t) / 1000) * 1000
})

function onSlider(e: Event) {
  rawSlider.value = Number((e.target as HTMLInputElement).value)
}

interface PartnerType { id: string; label: string; rate: number; rateLabel: string }
const partnerTypes: PartnerType[] = [
  { id: 'tech',     label: 'Technology',  rate: 0.20, rateLabel: '20%' },
  { id: 'referral', label: 'Referral',    rate: 0.15, rateLabel: '15%' },
  { id: 'white',    label: 'White-label', rate: 0.25, rateLabel: '25%' },
]
const selected = ref<string>('tech')
const currentType = computed<PartnerType>(() => partnerTypes.find(t => t.id === selected.value) ?? partnerTypes[0]!)

// Platform fee = 0.5% of volume
const platformFee = computed(() => volume.value * 0.005)
const partnerShare = computed(() => platformFee.value * currentType.value.rate)
const networkFees  = computed(() => volume.value * 0.0004)
const netPayout    = computed(() => partnerShare.value - networkFees.value * 0.1) // small pass-through

const breakdown = computed(() => [
  { label: 'Gross transaction volume',         value: formatEur(volume.value),      highlight: false },
  { label: 'Platform fee collected (0.50%)',   value: formatEur(platformFee.value), highlight: false },
  { label: `Partner share (${currentType.value.rateLabel} of fee)`, value: formatEur(partnerShare.value), highlight: true },
  { label: 'Network pass-through (est.)',      value: `−${formatEur(networkFees.value * 0.1)}`, highlight: false },
  { label: 'Estimated net monthly payout',     value: formatEur(netPayout.value),   highlight: true },
])

function formatEur(n: number): string {
  if (n >= 1_000_000) return `€${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000)     return `€${(n / 1_000).toFixed(n >= 100_000 ? 0 : 1)}k`
  return `€${n.toFixed(2)}`
}
</script>

<style scoped>
/* ── Base ─────────────────────────────────────────────────────────── */
.fc-wrap {
  --fc-bg:      #ffffff;
  --fc-border:  #e2e8f0;
  --fc-text:    #0f172a;
  --fc-sub:     #64748b;
  --fc-accent:  #4f46e5;
  --fc-hl:      #4f46e5;
  --fc-radius:  12px;
  --fc-font:    inherit;
  --fc-mono:    'IBM Plex Mono', monospace;

  background: var(--fc-bg);
  border: 1px solid var(--fc-border);
  border-radius: var(--fc-radius);
  padding: 1.75rem;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 4px 24px rgba(0,0,0,0.06);
}

/* ── Theme overrides ──────────────────────────────────────────────── */
[data-fc-theme="swiss"] {
  --fc-bg: #ffffff; --fc-border: #111; --fc-text: #0a0a0a; --fc-sub: #666;
  --fc-accent: #34d399; --fc-hl: #34d399; --fc-radius: 2px;
}
[data-fc-theme="crypto"] {
  --fc-bg: #0c1117; --fc-border: rgba(0,255,178,0.2); --fc-text: #e2e8f0;
  --fc-sub: rgba(255,255,255,0.4); --fc-accent: #00ffb2; --fc-hl: #00ffb2;
  --fc-radius: 8px;
}
[data-fc-theme="bold"] {
  --fc-bg: #111; --fc-border: rgba(255,255,255,0.1); --fc-text: #fff;
  --fc-sub: rgba(255,255,255,0.5); --fc-accent: #2563eb; --fc-hl: #e11d48;
  --fc-radius: 0;
}
[data-fc-theme="fintech"] {
  --fc-bg: #0e1318; --fc-border: rgba(245,158,11,0.2); --fc-text: rgba(255,255,255,0.9);
  --fc-sub: rgba(245,158,11,0.5); --fc-accent: #f59e0b; --fc-hl: #f59e0b;
  --fc-radius: 2px; --fc-font: 'IBM Plex Mono', monospace;
}
[data-fc-theme="gradient"] {
  --fc-bg: rgba(255,255,255,0.06); --fc-border: rgba(168,85,247,0.3);
  --fc-text: #fff; --fc-sub: rgba(255,255,255,0.5); --fc-accent: #a855f7;
  --fc-hl: #ec4899; --fc-radius: 16px;
}

/* ── Tabs ─────────────────────────────────────────────────────────── */
.fc-tabs {
  display: flex; gap: 0.375rem; margin-bottom: 1.5rem;
}
.fc-tab {
  flex: 1; padding: 0.5rem 0.75rem;
  font-family: var(--fc-font); font-size: 0.8125rem; font-weight: 600;
  border: 1px solid var(--fc-border); border-radius: calc(var(--fc-radius) * 0.6);
  background: transparent; color: var(--fc-sub); cursor: pointer;
  transition: all 0.2s ease;
}
.fc-tab:hover  { color: var(--fc-text); border-color: var(--fc-accent); }
.fc-tab.active { background: var(--fc-accent); color: #fff; border-color: var(--fc-accent); }
[data-fc-theme="fintech"] .fc-tab.active,
[data-fc-theme="crypto"]  .fc-tab.active { color: #000; }

/* ── Slider ───────────────────────────────────────────────────────── */
.fc-slider-wrap { margin-bottom: 1.5rem; }
.fc-slider-header {
  display: flex; justify-content: space-between; align-items: baseline;
  margin-bottom: 0.625rem;
}
.fc-slider-label { font-size: 0.8125rem; color: var(--fc-sub); font-family: var(--fc-font); }
.fc-vol-display  {
  font-family: var(--fc-mono); font-size: 1.125rem; font-weight: 700;
  color: var(--fc-accent); transition: color 0.2s ease;
}
.fc-slider {
  -webkit-appearance: none; appearance: none;
  width: 100%; height: 4px; border-radius: 99px;
  background: var(--fc-border); outline: none; cursor: pointer;
  accent-color: var(--fc-accent);
}
.fc-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px; height: 18px; border-radius: 50%;
  background: var(--fc-accent); border: 2px solid var(--fc-bg);
  box-shadow: 0 0 0 3px rgba(0,0,0,0.08);
  cursor: pointer;
}
.fc-slider-ticks {
  display: flex; justify-content: space-between;
  font-family: var(--fc-mono); font-size: 0.6875rem; color: var(--fc-sub);
  margin-top: 0.375rem;
}

/* ── Results ──────────────────────────────────────────────────────── */
.fc-results {
  border: 1px solid var(--fc-border);
  border-radius: calc(var(--fc-radius) * 0.6);
  overflow: hidden; margin-bottom: 1.25rem;
}
.fc-result-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 0.5625rem 0.875rem;
  border-bottom: 1px solid var(--fc-border);
  font-size: 0.8125rem; font-family: var(--fc-font);
}
.fc-result-row:last-child { border-bottom: none; }
.fc-result-label { color: var(--fc-sub); }
.fc-result-value { font-family: var(--fc-mono); font-weight: 600; color: var(--fc-text); }
.fc-result-value.highlight { color: var(--fc-hl); }

/* ── Payout highlight ─────────────────────────────────────────────── */
.fc-payout {
  background: rgba(0,0,0,0.03);
  border: 1px solid var(--fc-accent);
  border-radius: calc(var(--fc-radius) * 0.6);
  padding: 1rem 1.25rem; margin-bottom: 1rem;
  text-align: center;
}
[data-fc-theme="crypto"] .fc-payout,
[data-fc-theme="bold"]   .fc-payout,
[data-fc-theme="fintech"].fc-payout,
[data-fc-theme="gradient"].fc-payout { background: rgba(255,255,255,0.04); }
.fc-payout-label { font-size: 0.75rem; color: var(--fc-sub); font-family: var(--fc-font); margin-bottom: 0.375rem; }
.fc-payout-value {
  font-family: var(--fc-mono); font-size: 2rem; font-weight: 700;
  color: var(--fc-accent); line-height: 1;
  transition: all 0.25s ease;
}
.fc-payout-rate { font-size: 0.75rem; color: var(--fc-sub); margin-top: 0.25rem; }

/* ── Disclaimer ───────────────────────────────────────────────────── */
.fc-disclaimer {
  font-size: 0.6875rem; color: var(--fc-sub); line-height: 1.5;
  font-family: var(--fc-font); text-align: center; margin: 0;
}

/* ── Responsive ───────────────────────────────────────────────────── */
@media (max-width: 480px) {
  .fc-wrap { padding: 1.25rem; }
  .fc-payout-value { font-size: 1.5rem; }
}
</style>
