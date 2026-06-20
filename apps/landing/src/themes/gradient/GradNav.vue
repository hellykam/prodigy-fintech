<template>
  <header class="nav" :class="{ 'nav--scrolled': scrolled }" role="banner">
    <div class="nav-inner">
      <RouterLink to="/gradient" class="logo" aria-label="Prodigy home">
        <span class="logo-mark" aria-hidden="true">◈</span>
        <span class="logo-name">Prodigy</span>
      </RouterLink>

      <nav class="nav-links" aria-label="Main navigation">
        <RouterLink to="/gradient/product" class="nav-link">Product</RouterLink>
        <span class="nav-sep" aria-hidden="true">·</span>
        <RouterLink to="/gradient/pricing" class="nav-link">Pricing</RouterLink>
        <span class="nav-sep" aria-hidden="true">·</span>
        <RouterLink to="/gradient/partners" class="nav-link">Partners</RouterLink>
        <span class="nav-sep" aria-hidden="true">·</span>
        <RouterLink to="/gradient/security" class="nav-link">Security</RouterLink>
        <span class="nav-sep" aria-hidden="true">·</span>
        <RouterLink to="/gradient/developers" class="nav-link">Developers</RouterLink>
        <span class="nav-sep" aria-hidden="true">·</span>
        <RouterLink to="/gradient/case-studies" class="nav-link">Case Studies</RouterLink>
      </nav>

      <a
        href="http://localhost:5001"
        target="_blank"
        rel="noopener noreferrer"
        class="nav-cta"
        aria-label="Get started free"
      >
        Get Started Free →
      </a>

      <button
        class="hamburger"
        :aria-expanded="open"
        aria-controls="grad-mobile-nav"
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
      id="grad-mobile-nav"
      class="mobile-nav"
      aria-label="Mobile navigation"
    >
      <RouterLink to="/gradient/product" class="mobile-link" @click="open = false">Product</RouterLink>
      <RouterLink to="/gradient/pricing" class="mobile-link" @click="open = false">Pricing</RouterLink>
      <RouterLink to="/gradient/partners" class="mobile-link" @click="open = false">Partners</RouterLink>
      <RouterLink to="/gradient/security" class="mobile-link" @click="open = false">Security</RouterLink>
      <RouterLink to="/gradient/developers" class="mobile-link" @click="open = false">Developers</RouterLink>
      <RouterLink to="/gradient/case-studies" class="mobile-link" @click="open = false">Case Studies</RouterLink>
      <a
        href="http://localhost:5001"
        target="_blank"
        rel="noopener noreferrer"
        class="mobile-link mobile-link--cta"
        @click="open = false"
      >
        Get Started Free →
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
--violet: #7c3aed;
--pink: #ec4899;
--border: rgba(124, 58, 237, 0.12);
--ink: #0f0e1a;
--ink-mid: #4b4a6e;
--radius-pill: 100px;

.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #ffffff;
  border-bottom: 1px solid rgba(124, 58, 237, 0.12);
  transition: background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease;
}

.nav--scrolled { background: rgba(15,10,30,0.85); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(168,85,247,0.15); }

.nav-inner {
  display: flex;
  align-items: center;
  gap: 2rem;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 3.75rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  text-decoration: none;
  flex-shrink: 0;
}

.logo-mark {
  font-size: 1.125rem;
  color: #7c3aed;
}

.logo-name {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  color: #7c3aed;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin: 0 auto;
}

.nav-link {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: #4b4a6e;
  text-decoration: none;
  transition: color 0.15s;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px; left: 0;
  width: 100%; height: 1.5px;
  background: #a855f7;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-link:hover::after,
.nav-link.router-link-active::after { transform: scaleX(1); }

.nav-link:hover,
.nav-link.router-link-active {
  color: #7c3aed;
}

.nav-sep {
  color: rgba(75, 74, 110, 0.3);
  font-size: 0.875rem;
  user-select: none;
}

.nav-cta {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(135deg, #7c3aed, #ec4899);
  text-decoration: none;
  padding: 0.5rem 1.25rem;
  border-radius: 100px;
  border: none;
  transition: opacity 0.15s, transform 0.15s;
  white-space: nowrap;
}

.nav-cta:hover {
  opacity: 0.9;
  transform: translateY(-1px);
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
  height: 2px;
  background: #7c3aed;
  border-radius: 2px;
  transition: opacity 0.15s;
}

.bar.hidden {
  opacity: 0;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(124, 58, 237, 0.12);
  padding: 1rem 1.5rem;
  gap: 0.875rem;
  background: #ffffff;
}

.mobile-link {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.9375rem;
  font-weight: 500;
  color: #4b4a6e;
  text-decoration: none;
  transition: color 0.15s;
}

.mobile-link:hover {
  color: #7c3aed;
}

.mobile-link--cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background: linear-gradient(135deg, #7c3aed, #ec4899);
  font-weight: 700;
  margin-top: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 100px;
  text-align: center;
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
  outline: 2px solid #7c3aed;
  outline-offset: 3px;
  border-radius: 3px;
}
</style>
