<template>
  <div class="crypto-layout">
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <CryptoNav />
    <main id="main-content" class="crypto-main">
      <RouterView />
    </main>
    <CryptoFooter />
  </div>
</template>

<script setup lang="ts">
import CryptoNav from './CryptoNav.vue'
import CryptoFooter from './CryptoFooter.vue'
import { RouterView } from 'vue-router'
</script>

<style scoped>
.crypto-layout {
  min-height: 100vh;
  background-color: #050510;
  color: #e8eaff;
}

.crypto-main {
  /* Push content below fixed nav */
  padding-top: 64px;
}

.skip-link {
  position: absolute;
  top: -40px; left: 0;
  background: #6366f1; color: #fff;
  padding: 0.5rem 1rem; font-size: 0.875rem; font-weight: 600;
  border-radius: 0 0 6px 0; text-decoration: none;
  z-index: 99999;
  transition: top 0.2s ease;
}
.skip-link:focus { top: 0; }
</style>
