<template>
  <header class="header" role="banner">
    <div class="header-inner">
      <!-- Logo -->
      <a href="#" class="logo" aria-label="Prodigy home">
        <span class="logo-mark" aria-hidden="true">◈</span>
        <span class="logo-name">PRODIGY</span>
      </a>

      <!-- Nav -->
      <nav class="nav" aria-label="Main navigation">
        <a href="#solution" class="nav-link">Product</a>
        <a href="#how-it-works" class="nav-link">How it works</a>
        <a href="#safety" class="nav-link">Safety</a>
        <a href="#partner" class="nav-link">Partners</a>
        <a href="#faq" class="nav-link">FAQ</a>
      </nav>

      <!-- Demo app links -->
      <div class="header-demos" aria-label="Live demo apps">
        <a href="http://localhost:5001" target="_blank" rel="noopener noreferrer" class="demo-link">Consumer</a>
        <a href="http://localhost:5002" target="_blank" rel="noopener noreferrer" class="demo-link">Admin</a>
        <a href="http://localhost:5003" target="_blank" rel="noopener noreferrer" class="demo-link">KYC</a>
        <a href="http://localhost:5004" target="_blank" rel="noopener noreferrer" class="demo-link">System Map</a>
        <a href="http://localhost:5005" target="_blank" rel="noopener noreferrer" class="demo-link">Widget</a>
        <a href="http://localhost:5006" target="_blank" rel="noopener noreferrer" class="demo-link">Partner</a>
      </div>

      <!-- CTA -->
      <div class="header-cta">
        <a href="http://localhost:5001" target="_blank" rel="noopener noreferrer" class="btn-primary">Open demo →</a>
      </div>

      <!-- Mobile menu toggle -->
      <button
        class="menu-toggle"
        :aria-expanded="menuOpen"
        aria-controls="mobile-nav"
        @click="menuOpen = !menuOpen"
      >
        <span class="sr-only">{{ menuOpen ? 'Close menu' : 'Open menu' }}</span>
        <span class="menu-bar" />
        <span class="menu-bar" />
        <span class="menu-bar" :class="{ hidden: menuOpen }" />
      </button>
    </div>

    <!-- Mobile nav -->
    <nav
      v-if="menuOpen"
      id="mobile-nav"
      class="mobile-nav"
      aria-label="Mobile navigation"
    >
      <a href="#solution" class="mobile-link" @click="menuOpen = false">Product</a>
      <a href="#how-it-works" class="mobile-link" @click="menuOpen = false">How it works</a>
      <a href="#safety" class="mobile-link" @click="menuOpen = false">Safety</a>
      <a href="#partner" class="mobile-link" @click="menuOpen = false">Partners</a>
      <a href="#faq" class="mobile-link" @click="menuOpen = false">FAQ</a>
      <div class="mobile-demos" @click="menuOpen = false">
        <a href="http://localhost:5001" target="_blank" rel="noopener noreferrer" class="mobile-link">↗ Consumer App</a>
        <a href="http://localhost:5002" target="_blank" rel="noopener noreferrer" class="mobile-link">↗ Admin Portal</a>
        <a href="http://localhost:5003" target="_blank" rel="noopener noreferrer" class="mobile-link">↗ KYC / Sumsub</a>
        <a href="http://localhost:5004" target="_blank" rel="noopener noreferrer" class="mobile-link">↗ System Map</a>
        <a href="http://localhost:5005" target="_blank" rel="noopener noreferrer" class="mobile-link">↗ Embed Widget</a>
        <a href="http://localhost:5006" target="_blank" rel="noopener noreferrer" class="mobile-link">↗ Partner Portal</a>
      </div>
      <a href="http://localhost:5001" target="_blank" rel="noopener noreferrer" class="mobile-link mobile-link--cta">Open demo →</a>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const menuOpen = ref(false)
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--paper);
  border-bottom: 1px solid var(--ink);
}

.header-inner {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 0 1.5rem;
  height: 3.25rem;
  max-width: 1440px;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--ink);
  flex-shrink: 0;
}

.logo-mark {
  font-size: 1.25rem;
  line-height: 1;
}

.logo-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: 1.125rem;
  letter-spacing: 0.1em;
}

.nav {
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
}

.nav-link:hover {
  color: var(--ink);
}

.header-cta {
  flex-shrink: 0;
}

.header-demos {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.demo-link {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-muted);
  text-decoration: none;
  border: 1px solid var(--line);
  padding: 0.25rem 0.5rem;
  transition: color 0.15s, border-color 0.15s;
}

.demo-link:hover {
  color: var(--ink);
  border-color: var(--ink);
}

.mobile-demos {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem 0;
  border-top: 1px dashed var(--line);
  border-bottom: 1px dashed var(--line);
}

.btn-primary {
  display: inline-block;
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

.btn-primary:hover {
  background: var(--paper);
  color: var(--ink);
}

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  margin-left: auto;
}

.menu-bar {
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
  font-size: 0.75rem;
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

@media (max-width: 1100px) {
  .header-demos {
    display: none;
  }
}

@media (max-width: 768px) {
  .nav,
  .header-cta {
    display: none;
  }

  .menu-toggle {
    display: flex;
  }
}

/* Remove orphaned demo-link styles (links moved to footer) */
</style>
