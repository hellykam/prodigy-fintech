<template>
  <section ref="el" id="how-it-works" class="how" aria-labelledby="how-headline">
    <div class="how-inner reveal" :class="{ 'is-visible': revealed }">
      <div class="how-header">
        <p class="label">{{ copy.eyebrow }}</p>
        <h2 id="how-headline" class="how-headline">{{ copy.headline }}</h2>
      </div>

      <!-- Numbered receipt steps -->
      <ol class="steps-list">
        <li
          v-for="(step, i) in copy.steps"
          :key="step.n"
          class="step-row"
        >
          <!-- Signal line segment -->
          <div class="step-signal" aria-hidden="true">
            <div class="signal-line" />
            <div class="signal-node" :class="{ 'signal-node--active': activeStep >= i }" />
            <div v-if="i < copy.steps.length - 1" class="signal-line signal-line--bottom" />
          </div>

          <div class="step-content">
            <span class="step-n font-mono label">{{ step.n }}</span>
            <div>
              <p class="step-title">{{ step.title }}</p>
              <p class="step-detail">{{ step.detail }}</p>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { howItWorks as copy } from '@/content/landingCopy'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { el, revealed } = useScrollReveal()

const activeStep = ref(-1)
let timer: ReturnType<typeof setInterval>

onMounted(() => {
  let i = 0
  timer = setInterval(() => {
    activeStep.value = i
    i = i < copy.steps.length - 1 ? i + 1 : 0
    if (i === 0) activeStep.value = -1
  }, 900)
})

onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
.how {
  border-bottom: 1px solid var(--ink);
  background: #fafafa;
}

.how-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 5rem 1.5rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  align-items: start;
}

.how-header {
  position: sticky;
  top: 5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.how-headline {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  margin: 0;
}

/* Steps */
.steps-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.step-row {
  display: grid;
  grid-template-columns: 2rem 1fr;
  gap: 1rem;
  border-bottom: 1px solid var(--line);
  padding: 1.5rem 0;
}

.step-row:first-child {
  border-top: 1px solid var(--line);
}

/* Signal column */
.step-signal {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4px;
}

.signal-line {
  width: 1px;
  flex: 1;
  background: var(--line);
  min-height: 12px;
}

.signal-line--bottom {
  flex: 1;
}

.signal-node {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--line);
  border: 1.5px solid var(--ink-muted);
  flex-shrink: 0;
  transition: background 0.3s, border-color 0.3s;
}

.signal-node--active {
  background: var(--ink);
  border-color: var(--ink);
}

/* Step content */
.step-content {
  display: flex;
  gap: 1.25rem;
  align-items: baseline;
}

.step-n {
  flex-shrink: 0;
  color: var(--ink-muted);
  width: 1.5rem;
}

.step-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.375rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  margin: 0 0 0.25rem;
  line-height: 1.1;
}

.step-detail {
  font-size: 0.875rem;
  color: var(--ink-mid);
  line-height: 1.5;
  margin: 0;
}

@media (max-width: 768px) {
  .how-inner {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .how-header {
    position: static;
  }
}
</style>
