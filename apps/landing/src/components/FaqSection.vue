<template>
  <section ref="el" id="faq" class="faq" aria-labelledby="faq-headline">
    <div class="faq-inner reveal" :class="{ 'is-visible': revealed }">

      <div class="faq-header">
        <p class="label">{{ copy.eyebrow }}</p>
        <h2 id="faq-headline" class="faq-headline">Questions &amp; terms.</h2>
      </div>

      <!-- Native accordion — accessible, no JS needed -->
      <div class="faq-list">
        <details
          v-for="(item, i) in copy.items"
          :key="i"
          class="faq-item"
          :open="i === 0"
        >
          <summary class="faq-question">
            <span class="q-n font-mono label">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="q-text">{{ item.q }}</span>
            <span class="q-toggle" aria-hidden="true">+</span>
          </summary>
          <div class="faq-answer">
            <p>{{ item.a }}</p>
          </div>
        </details>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { faq as copy } from '@/content/landingCopy'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { el, revealed } = useScrollReveal()
</script>

<style scoped>
.faq {
  border-bottom: 1px solid var(--ink);
  background: var(--paper);
}

.faq-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 5rem 1.5rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 5rem;
  align-items: start;
}

.faq-header {
  position: sticky;
  top: 5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.faq-headline {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  margin: 0;
}

.faq-list {
  display: flex;
  flex-direction: column;
}

.faq-item {
  border-bottom: 1px solid var(--line);
}

.faq-item:first-child {
  border-top: 1px solid var(--line);
}

.faq-question {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding: 1.25rem 0;
  cursor: pointer;
  list-style: none;
  user-select: none;
  transition: color 0.15s;
}

/* Remove default marker */
.faq-question::-webkit-details-marker { display: none; }
.faq-question::marker { display: none; }

.faq-question:hover {
  color: var(--ink-mid);
}

.q-n {
  color: var(--ink-muted);
  flex-shrink: 0;
  width: 1.5rem;
}

.q-text {
  font-size: 1rem;
  font-weight: 600;
  flex: 1;
  line-height: 1.4;
}

.q-toggle {
  font-family: 'Space Mono', monospace;
  font-size: 1.125rem;
  color: var(--ink-mid);
  flex-shrink: 0;
  transition: transform 0.2s;
}

details[open] .q-toggle {
  transform: rotate(45deg);
}

.faq-answer {
  padding: 0 0 1.5rem 2.5rem;
}

.faq-answer p {
  font-size: 0.9375rem;
  color: var(--ink-mid);
  line-height: 1.65;
  margin: 0;
  max-width: 60ch;
}

@media (max-width: 768px) {
  .faq-inner {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .faq-header {
    position: static;
  }
}
</style>
