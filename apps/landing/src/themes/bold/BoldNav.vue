<template>
  <header class="nav" :class="{ 'nav--scrolled': scrolled }" role="banner">
    <div class="nav-inner">
      <RouterLink to="/bold" class="logo" aria-label="Prodigy home">
        <span class="logo-mark" aria-hidden="true">◈</span>
        <span class="logo-name">PRODIGY</span>
      </RouterLink>

      <nav class="nav-links" aria-label="Main navigation">
        <RouterLink to="/bold/product" class="nav-link">PRODUCT</RouterLink>
        <span class="nav-sep" aria-hidden="true">·</span>
        <RouterLink to="/bold/pricing" class="nav-link">PRICING</RouterLink>
        <span class="nav-sep" aria-hidden="true">·</span>
        <RouterLink to="/bold/partners" class="nav-link">PARTNERS</RouterLink>
        <span class="nav-sep" aria-hidden="true">·</span>
        <RouterLink to="/bold/security" class="nav-link">SECURITY</RouterLink>
        <span class="nav-sep" aria-hidden="true">·</span>
        <RouterLink to="/bold/developers" class="nav-link">DEVELOPERS</RouterLink>
        <span class="nav-sep" aria-hidden="true">·</span>
        <RouterLink to="/bold/case-studies" class="nav-link">CASE STUDIES</RouterLink>
      </nav>

      <a
        href="http://localhost:5001"
        target="_blank"
        rel="noopener noreferrer"
        class="nav-cta"
        aria-label="Open demo application"
      >
        OPEN DEMO →
      </a>

      <button
        class="hamburger"
        :aria-expanded="open"
        aria-controls="bold-mobile-nav"
        aria-label="Toggle navigation menu"
        @click="open = !open"
      >
        <span class="bar" />
        <span class="bar" />
        <span class="bar" :class="{ hidden: open }" />
      </button>
    </div>

    <Transition name="mobile-nav-slide">
    <nav
      v-if="open"
      id="bold-mobile-nav"
      class="mobile-nav"
      aria-label="Mobile navigation"
    >
      <RouterLink to="/bold/product" class="mobile-link" @click="open = false">PRODUCT</RouterLink>
      <RouterLink to="/bold/pricing" class="mobile-link" @click="open = false">PRICING</RouterLink>
      <RouterLink to="/bold/partners" class="mobile-link" @click="open = false">PARTNERS</RouterLink>
      <RouterLink to="/bold/security" class="mobile-link" @click="open = false">SECURITY</RouterLink>
      <RouterLink to="/bold/developers" class="mobile-link" @click="open = false">DEVELOPERS</RouterLink>
      <RouterLink to="/bold/case-studies" class="mobile-link" @click="open = false">CASE STUDIES</RouterLink>
      <a
        href="http://localhost:5001"
        target="_blank"
        rel="noopener noreferrer"
        class="mobile-link mobile-link--cta"
        @click="open = false"
      >
        OPEN DEMO →
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
:root {
  --ink: #0a0a0a;
  --paper: #f5f5f0;
}

.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #0a0a0a;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease;
}

.nav--scrolled { background: rgba(0,0,0,0.9); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,255,255,0.08); }

.nav-inner {
  display: flex;
  align-items: center;
  gap: 2rem;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 3.5rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #f5f5f0;
  flex-shrink: 0;
}

.logo-mark {
  font-size: 1.125rem;
  color: #f5f5f0;
}

.logo-name {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.25rem;
  letter-spacing: 0.15em;
  color: #f5f5f0;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0 auto;
}

.nav-link {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.65);
  text-decoration: none;
  transition: color 0.15s;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px; left: 0;
  width: 100%; height: 1.5px;
  background: #2563eb;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-link:hover::after,
.nav-link.router-link-active::after { transform: scaleX(1); }

.nav-link:hover,
.nav-link.router-link-active {
  color: #f5f5f0;
}

.nav-sep {
  color: rgba(255, 255, 255, 0.25);
  font-size: 0.875rem;
  user-select: none;
}

.nav-cta {
  flex-shrink: 0;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: #f5f5f0;
  background: transparent;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: border-color 0.15s, color 0.15s;
}

.nav-cta:hover {
  border-color: rgba(255, 255, 255, 0.8);
  color: #ffffff;
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
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
  background: #f5f5f0;
  transition: opacity 0.15s;
}

.bar.hidden {
  opacity: 0;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1rem 1.5rem;
  gap: 0.875rem;
  background: #0a0a0a;
}

.mobile-link {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.15s;
}

.mobile-link:hover {
  color: #f5f5f0;
}

.mobile-link--cta {
  color: #f5f5f0;
  font-weight: 600;
  margin-top: 0.5rem;
  padding-top: 0.875rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .nav-links,
  .nav-cta {
    display: none;
  }

  .hamburger {
    display: flex;
  }
}

.mobile-nav-slide-enter-active { transition: opacity 0.2s ease, transform 0.25s cubic-bezier(0.4,0,0.2,1); }
.mobile-nav-slide-leave-active { transition: opacity 0.15s ease, transform 0.2s ease; }
.mobile-nav-slide-enter-from { opacity: 0; transform: translateY(-8px); }
.mobile-nav-slide-leave-to   { opacity: 0; transform: translateY(-4px); }

.nav-link:focus-visible,
.nav-cta:focus-visible,
.hamburger:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 3px;
  border-radius: 3px;
}
</style>
