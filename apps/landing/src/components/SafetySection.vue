<template>
  <section ref="el" id="safety" class="safety" aria-labelledby="safety-headline">
    <div class="safety-inner reveal" :class="{ 'is-visible': revealed }">

      <div class="safety-header">
        <p class="label">{{ copy.eyebrow }}</p>
        <h2 id="safety-headline" class="safety-headline">{{ copy.headline }}</h2>
      </div>

      <div class="safety-grid">
        <div
          v-for="point in copy.points"
          :key="point.stamp"
          class="safety-card"
        >
          <div class="card-stamp-row">
            <span class="stamp stamp-approved">{{ point.stamp }}</span>
          </div>
          <h3 class="card-title">{{ point.title }}</h3>
          <p class="card-detail">{{ point.detail }}</p>
        </div>
      </div>

      <!-- Disclaimer -->
      <div class="safety-disclaimer">
        <span class="label disclaimer-label">Note</span>
        <p class="disclaimer-text">{{ copy.disclaimer }}</p>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { safety as copy } from '@/content/landingCopy'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { el, revealed } = useScrollReveal()
</script>

<style scoped>
.safety {
  border-bottom: 1px solid var(--ink);
  background: #fafafa;
}

.safety-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.safety-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.safety-headline {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(2rem, 4.5vw, 4rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  max-width: 28ch;
  margin: 0;
}

.safety-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border: 1px solid var(--ink);
}

.safety-card {
  padding: 2rem;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.safety-card:nth-child(2n) {
  border-right: none;
}

.safety-card:nth-last-child(-n+2) {
  border-bottom: none;
}

.card-stamp-row {
  display: flex;
}

.stamp {
  display: inline-block;
  border: 1.5px solid currentColor;
  padding: 0.15em 0.5em;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.stamp-approved {
  color: var(--ink);
  border-color: var(--ink);
}

.card-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  margin: 0;
  line-height: 1.1;
}

.card-detail {
  font-size: 0.875rem;
  color: var(--ink-mid);
  line-height: 1.6;
  margin: 0;
}

/* Disclaimer */
.safety-disclaimer {
  border-top: 1px solid var(--line);
  padding-top: 1.5rem;
  display: flex;
  gap: 1.5rem;
  align-items: baseline;
}

.disclaimer-label {
  flex-shrink: 0;
}

.disclaimer-text {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: var(--ink-muted);
  letter-spacing: 0.03em;
  line-height: 1.7;
  margin: 0;
}

@media (max-width: 768px) {
  .safety-grid {
    grid-template-columns: 1fr;
  }

  .safety-card {
    border-right: none;
    border-bottom: 1px solid var(--line);
  }

  .safety-card:last-child {
    border-bottom: none;
  }

  .safety-disclaimer {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
