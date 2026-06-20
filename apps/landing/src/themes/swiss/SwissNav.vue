<template>
  <header class="nav" :class="{ 'nav--scrolled': scrolled }" role="banner">
    <div class="nav-inner">
      <RouterLink to="/swiss" class="logo" aria-label="Prodigy home">
        <span class="logo-mark" aria-hidden="true">◈</span>
        <span class="logo-name">PRODIGY</span>
      </RouterLink>

      <nav class="nav-links" aria-label="Main navigation">
        <RouterLink to="/swiss/product" class="nav-link">Product</RouterLink>
        <RouterLink to="/swiss/pricing" class="nav-link">Pricing</RouterLink>
        <RouterLink to="/swiss/partners" class="nav-link">Partners</RouterLink>
        <RouterLink to="/swiss/security" class="nav-link">Security</RouterLink>
        <RouterLink to="/swiss/developers" class="nav-link">Developers</RouterLink>
        <RouterLink to="/swiss/case-studies" class="nav-link">Case Studies</RouterLink>
      </nav>

      <a href="http://localhost:5001" target="_blank" rel="noopener noreferrer" class="nav-cta">
        Open demo →
      </a>

      <button
        class="hamburger"
        :aria-expanded="open"
        aria-controls="mobile-nav"
        @click="open = !open"
      >
        <span class="sr-only">{{ open ? 'Close' : 'Open' }} menu</span>
        <span class="bar" />
        <span class="bar" />
        <span class="bar" :class="{ hidden: open }" />
      </button>
    </div>

    <Transition name="mobile-nav-slide">
    <nav v-if="open" id="mobile-nav" class="mobile-nav" aria-label="Mobile navigation">
      <RouterLink to="/swiss/product" class="mobile-link" @click="open = false">Product</RouterLink>
      <RouterLink to="/swiss/pricing" class="mobile-link" @click="open = false">Pricing</RouterLink>
      <RouterLink to="/swiss/partners" class="mobile-link" @click="open = false">Partners</RouterLink>
      <RouterLink to="/swiss/security" class="mobile-link" @click="open = false">Security</RouterLink>
      <RouterLink to="/swiss/developers" class="mobile-link" @click="open = false">Developers</RouterLink>
      <RouterLink to="/swiss/case-studies" class="mobile-link" @click="open = false">Case Studies</RouterLink>
      <a href="http://localhost:5001" target="_blank" rel="noopener noreferrer" class="mobile-link mobile-link--cta" @click="open = false">
        Open demo →
      </a>
    </nav>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
const open = ref(false)
const scrolled = ref(false)
function onScroll() { scrolled.value = window.scrollY > 20 }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--paper);
  border-bottom: 1px solid var(--ink);
  transition: background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease;
}

.nav--scrolled { background: rgba(255,255,255,0.85); backdrop-filter: blur(12px); box-shadow: 0 1px 0 #e5e7eb; }

.nav-inner {
  display: flex;
  align-items: center;
  gap: 2rem;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 3.25rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--ink);
  flex-shrink: 0;
}

.logo-mark { font-size: 1.25rem; }

.logo-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: 1.125rem;
  letter-spacing: 0.1em;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.75rem;
  margin-left: auto;
}

.nav-link {
  font-family: 'Space Mono', monospace;
  font-size: 0.8125rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-mid);
  text-decoration: none;
  transition: color 0.15s;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px; left: 0;
  width: 100%; height: 1.5px;
  background: #34d399;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-link:hover::after,
.nav-link.router-link-active::after { transform: scaleX(1); }

.nav-link:hover,
.nav-link.router-link-active { color: var(--ink); }

.nav-cta {
  flex-shrink: 0;
  font-family: 'Space Mono', monospace;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--paper);
  background: var(--ink);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 1px solid var(--ink);
  transition: background 0.15s, color 0.15s;
}

.nav-cta:hover { background: var(--paper); color: var(--ink); }

.hamburger {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  margin-left: auto;
}

.bar {
  display: block;
  width: 20px;
  height: 1.5px;
  background: var(--ink);
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--line);
  padding: 1rem 1.5rem;
  gap: 0.75rem;
}

.mobile-link {
  font-family: 'Space Mono', monospace;
  font-size: 0.8125rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-mid);
  text-decoration: none;
}

.mobile-link--cta {
  color: var(--ink);
  font-weight: 700;
  margin-top: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--line);
}

@media (max-width: 768px) {
  .nav-links, .nav-cta { display: none; }
  .hamburger { display: flex; }
}

.mobile-nav-slide-enter-active { transition: opacity 0.2s ease, transform 0.25s cubic-bezier(0.4,0,0.2,1); }
.mobile-nav-slide-leave-active { transition: opacity 0.15s ease, transform 0.2s ease; }
.mobile-nav-slide-enter-from { opacity: 0; transform: translateY(-8px); }
.mobile-nav-slide-leave-to   { opacity: 0; transform: translateY(-4px); }

.nav-link:focus-visible,
.nav-cta:focus-visible,
.hamburger:focus-visible {
  outline: 2px solid #34d399;
  outline-offset: 3px;
  border-radius: 3px;
}
</style>
