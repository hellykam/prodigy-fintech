<template>
  <section ref="el" class="embed" aria-labelledby="embed-headline">
    <div class="embed-inner reveal" :class="{ 'is-visible': revealed }">

      <!-- Header -->
      <div class="embed-header">
        <p class="label">{{ copy.eyebrow }}</p>
        <h2 id="embed-headline" class="embed-headline">{{ copy.headline }}</h2>
        <p class="embed-sub">{{ copy.subheadline }}</p>
      </div>

      <!-- Code block -->
      <div class="code-wrap">
        <div class="code-top-bar">
          <span class="label">{{ copy.embedStory.label }}</span>
          <button
            class="copy-btn"
            :class="{ 'copy-btn--done': copied }"
            @click="copyCode"
            :aria-label="copied ? 'Code copied' : 'Copy embed code'"
          >
            <span class="copy-icon" aria-hidden="true">{{ copied ? '✓' : '⊕' }}</span>
            {{ copied ? 'Copied' : 'Copy' }}
          </button>
        </div>
        <div class="code-block" role="region" aria-label="Widget embed code">
          <span class="code-prompt" aria-hidden="true">html</span>
          <pre class="code-text"><code>{{ copy.embedStory.code }}</code></pre>
        </div>
        <p class="code-note">{{ copy.embedStory.note }}</p>
      </div>

      <!-- 3-column breakdown -->
      <div class="embed-cols">
        <div class="embed-col">
          <h3 class="col-headline">{{ copy.whiteLabel.headline }}</h3>
          <p class="col-detail">{{ copy.whiteLabel.detail }}</p>
        </div>

        <div class="embed-col embed-col--mid">
          <h3 class="col-headline">{{ copy.plugAndPlay.headline }}</h3>
          <ul class="plug-list">
            <li v-for="point in copy.plugAndPlay.points" :key="point" class="plug-item">
              <span class="plug-arrow" aria-hidden="true">→</span>
              <span>{{ point }}</span>
            </li>
          </ul>
        </div>

        <div class="embed-col">
          <h3 class="col-headline">{{ copy.revenueAngle.headline }}</h3>
          <p class="col-detail">{{ copy.revenueAngle.detail }}</p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { coinifyInspired as copy } from '@/content/landingCopy'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { el, revealed } = useScrollReveal()

const copied = ref(false)

function copyCode() {
  navigator.clipboard.writeText(copy.embedStory.code).then(() => {
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  })
}
</script>

<style scoped>
.embed {
  border-bottom: 1px solid var(--ink);
  background: var(--ink);
  color: var(--paper);
  position: relative;
}

/* Iridescent top accent bar */
.embed::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(
    90deg,
    #667eea 0%, #764ba2 15%, #f093fb 30%,
    #f5576c 45%, #4facfe 65%, #00f2fe 80%, #667eea 100%
  );
  background-size: 200% auto;
  animation: iris-shift 5s linear infinite;
}

@keyframes iris-shift {
  0%   { background-position: 0% center; }
  100% { background-position: -200% center; }
}

.embed-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
}

/* Header */
.embed-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 56ch;
}

.embed-header .label {
  color: rgba(255, 255, 255, 0.65);
}

.embed-headline {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: var(--paper);
  margin: 0;
}

.embed-sub {
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.65;
  margin: 0;
  max-width: 52ch;
}

/* Code block */
.code-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.code-top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.code-top-bar .label {
  color: rgba(255, 255, 255, 0.65);
}

.copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--paper);
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 0.3rem 0.7rem;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}

.copy-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.5);
}

.copy-btn--done {
  border-color: #a9fe52;
  color: #a9fe52;
}

.copy-icon {
  font-size: 0.875rem;
}

.code-block {
  background: #141414;
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 1.5rem;
  position: relative;
  overflow-x: auto;
}

.code-prompt {
  position: absolute;
  top: 0.75rem;
  right: 1rem;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.2);
  text-transform: uppercase;
  pointer-events: none;
}

.code-text {
  font-family: 'Space Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.7;
  color: #e8e8e8;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-all;
}

.code-note {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.65);
  letter-spacing: 0.03em;
  line-height: 1.6;
  margin: 0;
}

/* 3-column grid */
.embed-cols {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.embed-col {
  padding: 2rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.embed-col + .embed-col {
  padding-left: 2.5rem;
  border-left: 1px solid rgba(255, 255, 255, 0.12);
}

.col-headline {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.375rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  color: var(--paper);
  margin: 0;
  line-height: 1.1;
}

.col-detail {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.65;
  margin: 0;
}

.plug-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.plug-item {
  display: flex;
  align-items: baseline;
  gap: 0.625rem;
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.5;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.plug-item:last-child {
  border-bottom: none;
}

.plug-arrow {
  color: rgba(255, 255, 255, 0.3);
  flex-shrink: 0;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
}

@media (max-width: 900px) {
  .embed-cols {
    grid-template-columns: 1fr;
    border-top: 1px solid rgba(255, 255, 255, 0.12);
  }

  .embed-col + .embed-col {
    padding-left: 0;
    padding-top: 1.5rem;
    border-left: none;
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    margin-top: 1.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .embed::before {
    animation: none;
    background-position: 0 center;
  }
}
</style>
