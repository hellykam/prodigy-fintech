<template>
  <nav class="ft-nav" :class="{ 'ft-nav--scrolled': scrolled }">
    <div class="ft-nav__inner">
      <div class="ft-nav__brand">
        <RouterLink to="/fintech" class="ft-nav__logo">◈ PRODIGY</RouterLink>
      </div>

      <div class="ft-nav__meta">
        SYSTEM: ONLINE · BUILD: 2026.06 · ENVIRONMENT: DEMO
      </div>

      <div class="ft-nav__links">
        <RouterLink to="/fintech/product" class="ft-nav__link">PRODUCT</RouterLink>
        <RouterLink to="/fintech/pricing" class="ft-nav__link">PRICING</RouterLink>
        <RouterLink to="/fintech/partners" class="ft-nav__link">PARTNERS</RouterLink>
        <RouterLink to="/fintech/security" class="ft-nav__link">SECURITY</RouterLink>
        <RouterLink to="/fintech/developers" class="ft-nav__link">DEVELOPERS</RouterLink>
        <RouterLink to="/fintech/case-studies" class="ft-nav__link">CASE STUDIES</RouterLink>
        <a
          href="http://localhost:5001"
          target="_blank"
          rel="noopener noreferrer"
          class="ft-nav__cta"
        >OPEN DEMO →</a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
const scrolled = ref(false)
function onScroll() { scrolled.value = window.scrollY > 20 }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.ft-nav {
  --bg: #fafaf8;
  --ink: #0a0a0a;
  --accent: #b85c00;
  --font: 'Space Mono', monospace;

  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--bg);
  border-bottom: 1px solid var(--ink);
  font-family: var(--font);
  transition: background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease;
}

.ft-nav--scrolled { background: rgba(8,11,15,0.9); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(245,158,11,0.15); }

.ft-nav__inner {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1rem;
  padding: 0.6rem 2rem;
}

.ft-nav__logo {
  font-family: var(--font);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--ink);
  text-decoration: none;
  letter-spacing: 0.08em;
  white-space: nowrap;
}

.ft-nav__logo:hover {
  color: var(--accent);
}

.ft-nav__meta {
  text-align: center;
  font-family: var(--font);
  font-size: 0.7rem;
  color: var(--ink);
  opacity: 0.55;
  letter-spacing: 0.06em;
}

.ft-nav__links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.ft-nav__link {
  font-family: var(--font);
  font-size: 0.75rem;
  color: var(--ink);
  text-decoration: none;
  letter-spacing: 0.08em;
  transition: color 0.15s;
  position: relative;
}

.ft-nav__link::after {
  content: '';
  position: absolute;
  bottom: -2px; left: 0;
  width: 100%; height: 1.5px;
  background: #f59e0b;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.ft-nav__link:hover::after,
.ft-nav__link.router-link-active::after { transform: scaleX(1); }

.ft-nav__link:hover,
.ft-nav__link.router-link-active {
  color: var(--accent);
}

.ft-nav__cta {
  font-family: var(--font);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--bg);
  background: var(--accent);
  text-decoration: none;
  letter-spacing: 0.08em;
  padding: 0.35rem 0.8rem;
  border: 1px solid var(--accent);
  border-radius: 0;
  white-space: nowrap;
  transition: background 0.15s, color 0.15s;
}

.ft-nav__cta:hover {
  background: var(--ink);
  border-color: var(--ink);
  color: var(--bg);
}

@media (max-width: 1100px) {
  .ft-nav__inner {
    grid-template-columns: auto 1fr auto;
  }

  .ft-nav__meta {
    display: none;
  }

  .ft-nav__links {
    gap: 1rem;
    justify-content: flex-end;
  }
}

@media (max-width: 768px) {
  .ft-nav__inner {
    grid-template-columns: 1fr auto;
    padding: 0.5rem 1rem;
    gap: 0.5rem;
  }

  .ft-nav__links {
    gap: 0.75rem;
  }

  .ft-nav__link {
    display: none;
  }
}

@media (max-width: 480px) {
  .ft-nav__cta {
    font-size: 0.7rem;
    padding: 0.3rem 0.6rem;
  }
}

.ft-nav__link:focus-visible,
.ft-nav__cta:focus-visible {
  outline: 2px solid #f59e0b;
  outline-offset: 3px;
  border-radius: 3px;
}
</style>
