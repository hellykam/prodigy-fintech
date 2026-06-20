<template>
  <div class="swiss-layout">
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <SwissNav />
    <main id="main-content">
      <RouterView />
    </main>
    <SwissFooter />
  </div>
</template>

<script setup lang="ts">
import SwissNav from './SwissNav.vue'
import SwissFooter from './SwissFooter.vue'
</script>

<style scoped>
.swiss-layout {
  min-height: 100vh;
  background: var(--paper);
  color: var(--ink);
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
