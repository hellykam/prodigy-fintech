<template>
  <section ref="el" id="solution" class="solution" aria-labelledby="solution-headline">
    <div class="solution-inner reveal" :class="{ 'is-visible': revealed }">

      <div class="solution-header">
        <p class="label">{{ copy.eyebrow }}</p>
        <h2 id="solution-headline" class="solution-headline">{{ copy.headline }}</h2>
        <p class="solution-sub">{{ copy.subheadline }}</p>
      </div>

      <!-- Module grid — ledger card style -->
      <div class="modules-grid">
        <div
          v-for="mod in copy.modules"
          :key="mod.id"
          class="module-card"
        >
          <div class="module-id label">{{ mod.id }}</div>
          <div class="module-body">
            <p class="module-name">{{ mod.name }}</p>
            <p class="module-benefit">{{ mod.benefit }}</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { solution as copy } from '@/content/landingCopy'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { el, revealed } = useScrollReveal()
</script>

<style scoped>
.solution {
  border-bottom: 1px solid var(--ink);
  background: #fafafa;
}

.solution-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.solution-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 48ch;
}

.solution-headline {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  margin: 0;
}

.solution-sub {
  font-size: 1rem;
  color: var(--ink-mid);
  line-height: 1.6;
  margin: 0;
}

/* Module grid */
.modules-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 1px solid var(--ink);
}

.module-card {
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: background 0.15s;
}

.module-card:hover {
  background: #efefef;
}

/* Remove right border from last in each row */
.module-card:nth-child(4n) {
  border-right: none;
}

/* Remove bottom border from last row */
.module-card:nth-last-child(-n+4) {
  border-bottom: none;
}

.module-id {
  background: var(--iris);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: iris-shift 5s linear infinite;
}

@keyframes iris-shift {
  0%   { background-position: 0% center; }
  100% { background-position: -200% center; }
}

@media (prefers-reduced-motion: reduce) {
  .module-id {
    background: linear-gradient(90deg, #667eea, #4facfe);
    background-size: auto;
    -webkit-background-clip: text;
    background-clip: text;
  }
}

.module-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.375rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  margin: 0;
  line-height: 1.1;
}

.module-benefit {
  font-size: 0.8125rem;
  color: var(--ink-mid);
  line-height: 1.5;
  margin: 0;
}

@media (max-width: 1024px) {
  .modules-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .module-card:nth-child(4n) {
    border-right: 1px solid var(--line);
  }

  .module-card:nth-child(2n) {
    border-right: none;
  }

  .module-card:nth-last-child(-n+4) {
    border-bottom: 1px solid var(--line);
  }

  .module-card:nth-last-child(-n+2) {
    border-bottom: none;
  }
}

@media (max-width: 600px) {
  .modules-grid {
    grid-template-columns: 1fr;
  }

  .module-card {
    border-right: none;
    border-bottom: 1px solid var(--line);
  }

  .module-card:last-child {
    border-bottom: none;
  }
}
</style>
