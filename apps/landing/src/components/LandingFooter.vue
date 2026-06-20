<template>
  <footer class="footer" role="contentinfo">
    <div class="footer-inner">

      <div class="footer-top">
        <!-- Brand -->
        <div class="footer-brand">
          <a href="#" class="logo-link" aria-label="Prodigy home">
            <span class="logo-mark" aria-hidden="true">◈</span>
            <span class="logo-name">PRODIGY</span>
          </a>
          <p class="tagline">{{ copy.tagline }}</p>
        </div>

        <!-- Nav -->
        <nav class="footer-nav" aria-label="Footer navigation">
          <a
            v-for="link in copy.links"
            :key="link.label"
            :href="link.href"
            class="footer-link"
          >{{ link.label }}</a>
        </nav>

        <!-- Live demos -->
        <nav class="footer-demos" aria-label="Live demo applications">
          <p class="demos-label">Live demos</p>
          <a
            v-for="demo in copy.demos"
            :key="demo.label"
            :href="demo.href"
            target="_blank"
            rel="noopener"
            class="footer-link footer-link--demo"
          >↗ {{ demo.label }}</a>
        </nav>
      </div>

      <div class="footer-bottom">
        <p class="footer-note">{{ copy.note }}</p>
        <p class="footer-year font-mono">© 2026 Prodigy</p>
      </div>

    </div>
  </footer>
</template>

<script setup lang="ts">
import { footer as copy } from '@/content/landingCopy'
</script>

<style scoped>
.footer {
  background: var(--paper);
  border-top: 1px solid var(--ink);
}

.footer-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.logo-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--ink);
}

.logo-mark {
  font-size: 1.125rem;
}

.logo-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: 1rem;
  letter-spacing: 0.1em;
}

.tagline {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: var(--ink-mid);
  letter-spacing: 0.06em;
  margin: 0;
}

.footer-nav {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.footer-link {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-mid);
  text-decoration: none;
  transition: color 0.15s;
}

.footer-link:hover {
  color: var(--ink);
}

.footer-demos {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.demos-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-mid);
  margin: 0 0 0.25rem;
}

.footer-link--demo {
  color: var(--ink-mid);
}

.footer-bottom {
  border-top: 1px solid var(--line);
  padding-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 2rem;
  flex-wrap: wrap;
}

.footer-note {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: var(--ink-muted);
  letter-spacing: 0.04em;
  line-height: 1.7;
  margin: 0;
  max-width: 64ch;
}

.footer-year {
  font-size: 0.75rem;
  color: var(--ink-muted);
  letter-spacing: 0.06em;
  margin: 0;
  flex-shrink: 0;
}

@media (max-width: 600px) {
  .footer-top {
    flex-direction: column;
  }

  .footer-nav {
    gap: 1rem;
  }
}
</style>
