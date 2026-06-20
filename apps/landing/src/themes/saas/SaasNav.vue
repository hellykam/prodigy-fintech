<template>
  <nav class="sn-nav" :class="{ 'sn-nav--scrolled': scrolled }" role="navigation" aria-label="Main navigation">
    <div class="sn-inner">
      <!-- Logo -->
      <RouterLink to="/saas" class="sn-logo" aria-label="Prodigy home">
        <span class="sn-logo-mark" aria-hidden="true">◈</span>
        <span class="sn-logo-name">Prodigy</span>
      </RouterLink>

      <!-- Center links (desktop) -->
      <ul class="sn-links" role="list">
        <li><RouterLink to="/saas/product" class="sn-link">Products</RouterLink></li>
        <li><RouterLink to="/saas" class="sn-link">Solutions</RouterLink></li>
        <li><RouterLink to="/saas/pricing" class="sn-link">Pricing</RouterLink></li>
        <li><RouterLink to="/saas/partners" class="sn-link">Partners</RouterLink></li>
        <li><RouterLink to="/saas/security" class="sn-link">Security</RouterLink></li>
        <li><RouterLink to="/saas/developers" class="sn-link">Developers</RouterLink></li>
        <li><RouterLink to="/saas/case-studies" class="sn-link">Case Studies</RouterLink></li>
      </ul>

      <!-- Right actions (desktop) -->
      <div class="sn-actions">
        <a href="http://localhost:5001" target="_blank" rel="noopener noreferrer" class="sn-login">Log In</a>
        <a href="http://localhost:5001" target="_blank" rel="noopener noreferrer" class="sn-cta">Sign Up Free →</a>
      </div>

      <!-- Hamburger (mobile) -->
      <button
        class="sn-hamburger"
        :class="{ open: menuOpen }"
        @click="menuOpen = !menuOpen"
        :aria-expanded="menuOpen"
        aria-controls="sn-mobile-menu"
        aria-label="Toggle menu"
      >
        <span class="sn-ham-bar" />
        <span class="sn-ham-bar" />
        <span class="sn-ham-bar" />
      </button>
    </div>

    <!-- Mobile menu -->
    <Transition name="mobile-nav-slide">
    <div v-if="menuOpen" id="sn-mobile-menu" class="sn-mobile">
      <RouterLink to="/saas/product" class="sn-mobile-link" @click="menuOpen = false">Products</RouterLink>
      <RouterLink to="/saas" class="sn-mobile-link" @click="menuOpen = false">Solutions</RouterLink>
      <RouterLink to="/saas/pricing" class="sn-mobile-link" @click="menuOpen = false">Pricing</RouterLink>
      <RouterLink to="/saas/partners" class="sn-mobile-link" @click="menuOpen = false">Partners</RouterLink>
      <RouterLink to="/saas/security" class="sn-mobile-link" @click="menuOpen = false">Security</RouterLink>
      <RouterLink to="/saas/developers" class="sn-mobile-link" @click="menuOpen = false">Developers</RouterLink>
      <RouterLink to="/saas/case-studies" class="sn-mobile-link" @click="menuOpen = false">Case Studies</RouterLink>
      <div class="sn-mobile-divider" />
      <a href="http://localhost:5001" target="_blank" rel="noopener noreferrer" class="sn-mobile-link" @click="menuOpen = false">Log In</a>
      <a href="http://localhost:5001" target="_blank" rel="noopener noreferrer" class="sn-mobile-cta" @click="menuOpen = false">Sign Up Free →</a>
    </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const menuOpen = ref(false)
const scrolled = ref(false)
function onScroll() { scrolled.value = window.scrollY > 20 }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.sn-nav {
  --bg: #ffffff;
  --ink: #0f0f23;
  --ink-mid: #4a4a6a;
  --accent: #4f46e5;
  --border: #e2e0f0;

  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  height: 4rem;
  transition: background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease;
}

.sn-nav--scrolled { background: rgba(255,255,255,0.9); backdrop-filter: blur(12px); box-shadow: 0 1px 12px rgba(0,0,0,0.06); }

.sn-inner {
  display: flex;
  align-items: center;
  height: 4rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  gap: 2rem;
}

/* Logo */
.sn-logo {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  text-decoration: none;
  flex-shrink: 0;
}

.sn-logo-mark {
  font-size: 1.25rem;
  color: var(--accent);
  line-height: 1;
}

.sn-logo-name {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--ink);
  letter-spacing: -0.01em;
}

/* Center links */
.sn-links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
  justify-content: center;
}

.sn-link {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--ink-mid);
  text-decoration: none;
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  transition: color 0.15s, background 0.15s;
  position: relative;
}

.sn-link::after {
  content: '';
  position: absolute;
  bottom: -2px; left: 0.75rem;
  width: calc(100% - 1.5rem); height: 1.5px;
  background: #6366f1;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.sn-link:hover::after,
.sn-link.router-link-active::after { transform: scaleX(1); }

.sn-link:hover,
.sn-link.router-link-active {
  color: var(--accent);
  background: #ede9fe;
}

/* Right actions */
.sn-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.sn-login {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--ink-mid);
  text-decoration: none;
  transition: color 0.15s;
}

.sn-login:hover {
  color: var(--accent);
}

.sn-cta {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: #ffffff;
  background: var(--accent);
  text-decoration: none;
  padding: 0.5rem 1.25rem;
  border-radius: 100px;
  transition: background 0.15s, transform 0.1s;
  white-space: nowrap;
}

.sn-cta:hover {
  background: #4338ca;
  transform: translateY(-1px);
}

/* Hamburger */
.sn-hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  margin-left: auto;
}

.sn-ham-bar {
  display: block;
  width: 20px;
  height: 2px;
  background: var(--ink);
  border-radius: 2px;
  transition: transform 0.2s, opacity 0.2s;
}

.sn-hamburger.open .sn-ham-bar:nth-child(1) {
  transform: translateY(6px) rotate(45deg);
}
.sn-hamburger.open .sn-ham-bar:nth-child(2) {
  opacity: 0;
}
.sn-hamburger.open .sn-ham-bar:nth-child(3) {
  transform: translateY(-6px) rotate(-45deg);
}

/* Mobile menu */
.sn-mobile {
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem 1rem;
  background: var(--bg);
  border-top: 1px solid var(--border);
}

.sn-mobile-link {
  font-family: 'Inter', sans-serif;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--ink-mid);
  text-decoration: none;
  padding: 0.75rem 0.5rem;
  border-bottom: 1px solid var(--border);
  transition: color 0.15s;
}

.sn-mobile-link:hover {
  color: var(--accent);
}

.sn-mobile-divider {
  height: 0.5rem;
}

.sn-mobile-cta {
  font-family: 'Inter', sans-serif;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #ffffff;
  background: var(--accent);
  text-decoration: none;
  padding: 0.75rem 1.25rem;
  border-radius: 100px;
  text-align: center;
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .sn-links,
  .sn-actions {
    display: none;
  }

  .sn-hamburger {
    display: flex;
  }

  .sn-nav {
    height: auto;
    min-height: 4rem;
  }
}

.mobile-nav-slide-enter-active { transition: opacity 0.2s ease, transform 0.25s cubic-bezier(0.4,0,0.2,1); }
.mobile-nav-slide-leave-active { transition: opacity 0.15s ease, transform 0.2s ease; }
.mobile-nav-slide-enter-from { opacity: 0; transform: translateY(-8px); }
.mobile-nav-slide-leave-to   { opacity: 0; transform: translateY(-4px); }

.sn-link:focus-visible,
.sn-cta:focus-visible,
.sn-hamburger:focus-visible {
  outline: 2px solid var(--accent, #4f46e5);
  outline-offset: 3px;
  border-radius: 3px;
}
</style>
