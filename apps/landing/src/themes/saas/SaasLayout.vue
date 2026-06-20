<template>
  <div class="saas-layout">
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <SaasNav />
    <main id="main-content">
      <RouterView />
    </main>
    <SaasFooter />
  </div>
</template>

<script setup lang="ts">
import SaasNav from './SaasNav.vue'
import SaasFooter from './SaasFooter.vue'
</script>

<style scoped>
.saas-layout {
  --bg: #ffffff;
  --surface: #f8f7ff;
  --ink: #0f0f23;
  --ink-mid: #4a4a6a;
  --ink-muted: #8888a8;
  --accent: #4f46e5;
  --accent-light: #ede9fe;
  --accent-mid: #818cf8;
  --green: #22c55e;
  --green-light: #dcfce7;
  --border: #e2e0f0;
  --radius: 12px;

  min-height: 100vh;
  background: var(--bg);
  color: var(--ink);
  font-family: 'Inter', sans-serif;
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
