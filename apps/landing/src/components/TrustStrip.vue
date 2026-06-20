<template>
  <section class="trust" aria-labelledby="trust-label">
    <div class="trust-inner">
      <p id="trust-label" class="label trust-eyebrow">{{ copy.eyebrow }}</p>
      <div class="trust-grid">
        <div
          v-for="item in copy.items"
          :key="item.label"
          class="trust-item"
        >
          <span class="trust-bullet" aria-hidden="true">◈</span>
          <div>
            <p class="trust-label">{{ item.label }}</p>
            <p class="trust-detail">{{ item.detail }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { trust as copy } from '@/content/landingCopy'
</script>

<style scoped>
.trust {
  border-bottom: 1px solid var(--ink);
  background: #fafafa;
}

.trust-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem;
}

.trust-eyebrow {
  margin-bottom: 1.5rem;
}

.trust-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  border: 1px solid var(--line);
}

.trust-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1.25rem;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  position: relative;
  transition: background 0.18s;
}

/* Iridescent left-border accent, revealed on hover */
.trust-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: linear-gradient(
    180deg,
    #667eea 0%,
    #764ba2 15%,
    #f093fb 30%,
    #f5576c 45%,
    #4facfe 65%,
    #00f2fe 80%,
    #667eea 100%
  );
  background-size: auto 200%;
  animation: iris-shift-v 5s linear infinite;
  opacity: 0;
  transition: opacity 0.18s;
}

.trust-item:hover {
  background: #f7f7f7;
}

.trust-item:hover::before {
  opacity: 1;
}

@keyframes iris-shift-v {
  0%   { background-position: center 0%; }
  100% { background-position: center -200%; }
}

.trust-item:nth-child(4n) {
  border-right: none;
}

.trust-item:nth-last-child(-n+4) {
  border-bottom: none;
}

.trust-bullet {
  color: var(--ink-muted);
  font-size: 0.75rem;
  flex-shrink: 0;
  margin-top: 1px;
}

.trust-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin: 0 0 0.25rem;
}

.trust-detail {
  font-size: 0.8125rem;
  color: var(--ink-mid);
  margin: 0;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .trust-grid {
    grid-template-columns: 1fr;
  }

  .trust-item {
    border-right: none;
  }

  .trust-item:nth-last-child(-n+4) {
    border-bottom: 1px solid var(--line);
  }

  .trust-item:last-child {
    border-bottom: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .trust-item::before {
    animation: none;
  }
}
</style>
