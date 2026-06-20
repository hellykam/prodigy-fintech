<template>
  <nav class="crypto-nav" :class="{ scrolled: isScrolled }">
    <div class="nav-inner">
      <router-link to="/crypto" class="nav-logo" aria-label="Prodigy home">
        <span class="logo-diamond" aria-hidden="true">◈</span>
        <span class="logo-text">PRODIGY</span>
      </router-link>

      <ul class="nav-links" role="list">
        <li><router-link to="/crypto/product" class="nav-link">Product</router-link></li>
        <li><router-link to="/crypto/pricing" class="nav-link">Pricing</router-link></li>
        <li><router-link to="/crypto/partners" class="nav-link">Partners</router-link></li>
        <li><router-link to="/crypto/security" class="nav-link">Security</router-link></li>
        <li><router-link to="/crypto/developers" class="nav-link">Developers</router-link></li>
        <li><router-link to="/crypto/case-studies" class="nav-link">Case Studies</router-link></li>
      </ul>

      <a
        href="http://localhost:5001"
        target="_blank"
        rel="noopener noreferrer"
        class="nav-cta"
      >
        Open Demo →
      </a>

      <button
        class="hamburger"
        :class="{ open: menuOpen }"
        @click="menuOpen = !menuOpen"
        :aria-expanded="menuOpen"
        aria-controls="mobile-menu"
        aria-label="Toggle navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <div
      id="mobile-menu"
      class="mobile-menu"
      :class="{ open: menuOpen }"
      role="dialog"
      aria-label="Mobile navigation"
    >
      <ul role="list">
        <li>
          <router-link to="/crypto/product" class="mobile-link" @click="menuOpen = false">
            Product
          </router-link>
        </li>
        <li>
          <router-link to="/crypto/pricing" class="mobile-link" @click="menuOpen = false">
            Pricing
          </router-link>
        </li>
        <li>
          <router-link to="/crypto/partners" class="mobile-link" @click="menuOpen = false">
            Partners
          </router-link>
        </li>
        <li>
          <router-link to="/crypto/security" class="mobile-link" @click="menuOpen = false">
            Security
          </router-link>
        </li>
        <li>
          <router-link to="/crypto/developers" class="mobile-link" @click="menuOpen = false">
            Developers
          </router-link>
        </li>
        <li>
          <router-link to="/crypto/case-studies" class="mobile-link" @click="menuOpen = false">
            Case Studies
          </router-link>
        </li>
        <li>
          <a
            href="http://localhost:5001"
            target="_blank"
            rel="noopener noreferrer"
            class="mobile-cta"
            @click="menuOpen = false"
          >
            Open Demo →
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const menuOpen = ref(false)
const isScrolled = ref(false)

function onScroll() {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
:root {
  --bg: #050510;
  --cyan: #00f5ff;
  --purple: #a855f7;
  --text: #e8eaff;
  --white: #ffffff;
}

.crypto-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(5, 5, 16, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid transparent;
  transition: background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s;
}

.crypto-nav.scrolled {
  background: rgba(10,13,19,0.85);
  backdrop-filter: blur(12px);
  border-bottom-color: rgba(0,255,178,0.15);
}

.nav-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: clamp(0.75rem, 2vw, 1rem) clamp(1rem, 4vw, 2rem);
  display: flex;
  align-items: center;
  gap: clamp(1rem, 3vw, 2rem);
}

/* Logo */
.nav-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  flex-shrink: 0;
}

.logo-diamond {
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  color: #00f5ff;
  text-shadow: 0 0 12px rgba(0, 245, 255, 0.8);
  line-height: 1;
}

.logo-text {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #00f5ff;
  text-shadow: 0 0 12px rgba(0, 245, 255, 0.5);
}

/* Desktop links */
.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: clamp(1rem, 3vw, 2rem);
  margin-left: auto;
}

.nav-link {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(0.85rem, 1.5vw, 1rem);
  font-weight: 500;
  letter-spacing: 0.08em;
  color: #e8eaff;
  text-decoration: none;
  text-transform: uppercase;
  transition: color 0.2s;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1.5px;
  background: #00ffb2;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #00f5ff;
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  transform: scaleX(1);
}

/* CTA button */
.nav-cta {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(0.85rem, 1.5vw, 1rem);
  font-weight: 600;
  letter-spacing: 0.06em;
  color: #050510;
  background: #00f5ff;
  padding: 0.5rem 1.25rem;
  border-radius: 3px;
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
  transition: background 0.2s, box-shadow 0.2s;
}

.nav-cta:hover {
  background: #ffffff;
  box-shadow: 0 0 20px rgba(0, 245, 255, 0.5);
}

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 2.5rem;
  height: 2.5rem;
  background: transparent;
  border: 1px solid rgba(0, 245, 255, 0.3);
  border-radius: 3px;
  cursor: pointer;
  flex-shrink: 0;
  margin-left: auto;
}

.hamburger span {
  display: block;
  width: 18px;
  height: 1.5px;
  background: #00f5ff;
  transition: transform 0.25s, opacity 0.25s;
  transform-origin: center;
}

.hamburger.open span:nth-child(1) {
  transform: translateY(6.5px) rotate(45deg);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
}

.hamburger.open span:nth-child(3) {
  transform: translateY(-6.5px) rotate(-45deg);
}

/* Mobile menu */
.mobile-menu {
  display: none;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.3s ease;
  background: rgba(5, 5, 16, 0.98);
  border-top: 1px solid rgba(0, 245, 255, 0.1);
}

.mobile-menu.open {
  max-height: 400px;
}

.mobile-menu ul {
  list-style: none;
  margin: 0;
  padding: 1rem clamp(1rem, 4vw, 2rem) 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.mobile-link {
  display: block;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: #e8eaff;
  text-decoration: none;
  text-transform: uppercase;
  padding: 0.6rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: color 0.2s;
}

.mobile-link:hover,
.mobile-link.router-link-active {
  color: #00f5ff;
}

.mobile-cta {
  display: inline-block;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: #050510;
  background: #00f5ff;
  padding: 0.6rem 1.5rem;
  border-radius: 3px;
  text-decoration: none;
  margin-top: 0.75rem;
  transition: background 0.2s;
}

.mobile-cta:hover {
  background: #ffffff;
}

@media (max-width: 768px) {
  .nav-links,
  .nav-cta {
    display: none;
  }

  .hamburger {
    display: flex;
  }

  .mobile-menu {
    display: block;
  }
}

.nav-link:focus-visible,
.nav-cta:focus-visible,
.hamburger:focus-visible {
  outline: 2px solid #00f5ff;
  outline-offset: 3px;
  border-radius: 3px;
}
</style>
