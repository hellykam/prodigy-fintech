<script setup lang="ts">
import { ref, onMounted } from 'vue'

export interface ReceiptRow {
  label: string
  value: string
  isFee?: boolean
}

const props = withDefaults(defineProps<{
  rows: ReceiptRow[]
  total: string
  stamp?: 'approved' | 'pending'
}>(), {
  stamp: undefined,
})

const mounted = ref(false)
const stampVisible = ref(false)

onMounted(() => {
  mounted.value = true
  // Small delay so the entrance CSS transition fires after mount
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      stampVisible.value = true
    })
  })
})
</script>

<template>
  <div class="receipt-card" :class="{ 'receipt-mounted': mounted }">
    <p class="receipt-header">TRANSACTION RECEIPT</p>
    <hr class="receipt-sep" aria-hidden="true" />

    <div class="receipt-rows" role="list">
      <div
        v-for="(row, i) in rows"
        :key="i"
        class="receipt-row"
        :class="{ 'receipt-row--fee': row.isFee }"
        role="listitem"
      >
        <span class="receipt-row-label">{{ row.label }}</span>
        <span class="receipt-row-value">{{ row.value }}</span>
      </div>
    </div>

    <div class="receipt-total" aria-label="Total">
      <span class="receipt-total-label">Total</span>
      <span class="receipt-total-value">{{ total }}</span>
    </div>

    <!-- Stamp overlay -->
    <div
      v-if="stamp"
      class="receipt-stamp"
      :class="[`stamp-${stamp}`, { 'stamp-visible': stampVisible }]"
      aria-label="Transaction status: {{ stamp }}"
    >
      {{ stamp === 'approved' ? 'APPROVED' : 'PENDING' }}
    </div>
  </div>
</template>

<style scoped>
.receipt-card {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  font-family: 'Space Mono', monospace;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
  position: relative;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.receipt-mounted {
  opacity: 1;
  transform: translateY(0);
}

.receipt-header {
  text-align: center;
  font-size: 0.75rem;
  font-variant: small-caps;
  letter-spacing: 0.15em;
  margin: 0 0 12px;
  color: #333;
}

.receipt-sep {
  border: none;
  border-top: 1px dashed #d0d0d0;
  margin: 0 0 8px;
}

.receipt-rows {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.receipt-row {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  font-size: 13px;
  color: #1a1a1a;
  border-bottom: 1px solid transparent;
}

.receipt-row--fee {
  color: #888;
}

.receipt-row-label {
  flex: 1;
}

.receipt-row-value {
  font-weight: 600;
}

.receipt-total {
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 15px;
  border-top: 2px solid #000;
  margin-top: 8px;
  padding-top: 12px;
}

.receipt-total-label {
  flex: 1;
}

.receipt-total-value {
  font-size: 15px;
}

/* Stamp */
.receipt-stamp {
  position: absolute;
  top: -12px;
  right: -12px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-align: center;
  transform: rotate(-15deg) scale(0);
  transition: transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.stamp-visible {
  transform: rotate(-15deg) scale(1);
}

.stamp-approved {
  border: 3px solid #16a34a;
  color: #16a34a;
}

.stamp-pending {
  border: 3px solid #d97706;
  color: #d97706;
}

@media (prefers-reduced-motion: reduce) {
  .receipt-card {
    opacity: 1;
    transform: none;
    transition: none;
  }
  .receipt-stamp {
    transform: rotate(-15deg) scale(1);
    transition: none;
  }
}
</style>
