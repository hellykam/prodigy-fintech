<template>
  <div class="grad-layout">
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <GradNav />
    <main id="main-content">
      <RouterView />
    </main>
    <GradFooter />
  </div>
</template>

<script setup lang="ts">
import GradNav from './GradNav.vue'
import GradFooter from './GradFooter.vue'
</script>

<style scoped>
.grad-layout {
  --violet: #7c3aed;
  --purple: #9333ea;
  --pink: #ec4899;
  --lavender: #a78bfa;
  --teal: #14b8a6;
  --green: #22c55e;
  --red: #ef4444;
  --amber: #f59e0b;
  --bg: #fafafa;
  --surface: #f3f0ff;
  --white: #ffffff;
  --ink: #0f0e1a;
  --ink-mid: #4b4a6e;
  --ink-muted: #8b89b0;
  --border: rgba(124, 58, 237, 0.12);
  --radius-card: 20px;
  --radius-pill: 100px;
  --grad-hero: linear-gradient(135deg, #7c3aed 0%, #9333ea 35%, #ec4899 70%, #f59e0b 100%);
  --grad-soft: linear-gradient(160deg, #f3f0ff 0%, #fce7f3 50%, #ecfdf5 100%);

  min-height: 100vh;
  background: var(--bg);
  color: var(--ink);
  font-family: 'Plus Jakarta Sans', sans-serif;
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
