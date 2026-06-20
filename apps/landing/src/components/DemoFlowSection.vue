<template>
  <section ref="el" id="demo" class="demo" aria-labelledby="demo-headline">
    <div class="demo-inner reveal" :class="{ 'is-visible': revealed }">

      <div class="demo-header">
        <p class="label">{{ copy.eyebrow }}</p>
        <h2 id="demo-headline" class="demo-headline">{{ copy.headline }}</h2>
      </div>

      <div class="flows-grid">
        <div
          v-for="flow in copy.flows"
          :key="flow.id"
          class="flow-card"
          :class="`flow-card--${flow.outcome.toLowerCase()}`"
        >
          <div class="flow-card-head">
            <span class="flow-id font-mono label">{{ flow.id }}</span>
            <h3 class="flow-name">{{ flow.name }}</h3>
            <span class="flow-stamp stamp" :class="stampClass(flow.outcome)">{{ flow.outcome }}</span>
          </div>

          <ol class="flow-steps">
            <li
              v-for="(step, i) in flow.steps"
              :key="i"
              class="flow-step"
            >
              <span class="step-dot-small" aria-hidden="true" />
              <span>{{ step }}</span>
            </li>
          </ol>

          <!-- Signal line at bottom -->
          <div class="flow-signal" aria-hidden="true">
            <div class="signal-bar" :class="`signal-bar--${flow.outcome.toLowerCase()}`" />
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { demoFlows as copy } from '@/content/landingCopy'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { el, revealed } = useScrollReveal()

function stampClass(outcome: string) {
  if (outcome === 'APPROVED') return 'stamp-approved'
  if (outcome === 'REJECTED') return 'stamp-rejected'
  return 'stamp-review'
}
</script>

<style scoped>
.demo {
  border-bottom: 1px solid var(--ink);
  background: #fafafa;
}

.demo-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.demo-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.demo-headline {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(2rem, 4.5vw, 4rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  margin: 0;
}

.flows-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border: 1px solid var(--ink);
}

.flow-card {
  padding: 1.75rem;
  border-right: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  background: var(--paper);
}

.flow-card:last-child {
  border-right: none;
}

.flow-card-head {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.flow-id {
  color: var(--ink-muted);
}

.flow-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  margin: 0;
  line-height: 1.1;
}

.flow-stamp {
  align-self: flex-start;
  margin-top: 0.25rem;
}

/* Flow steps */
.flow-steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
  flex: 1;
}

.flow-step {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--ink-faint);
  color: var(--ink-mid);
}

.flow-step:last-child {
  border-bottom: none;
}

.step-dot-small {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--line);
  flex-shrink: 0;
}

/* Signal bar at bottom */
.flow-signal {
  margin-top: auto;
}

.signal-bar {
  height: 3px;
  border-radius: 1.5px;
}

.signal-bar--approved {
  background: var(--ink);
}

.signal-bar--review {
  background: #b06000;
}

.signal-bar--rejected {
  background: #c44;
}

/* Stamps */
.stamp {
  display: inline-block;
  border: 1.5px solid currentColor;
  padding: 0.125em 0.45em;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.stamp-approved {
  color: var(--ink);
  border-color: var(--ink);
}

.stamp-review {
  color: #b06000;
  border-color: #b06000;
}

.stamp-rejected {
  color: #c44;
  border-color: #c44;
}

@media (max-width: 900px) {
  .flows-grid {
    grid-template-columns: 1fr;
  }

  .flow-card {
    border-right: none;
    border-bottom: 1px solid var(--line);
  }

  .flow-card:last-child {
    border-bottom: none;
  }
}
</style>
