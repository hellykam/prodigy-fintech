<template>
  <div class="nf-page">
    <!-- Floating particles (CSS-only) -->
    <div class="nf-particles" aria-hidden="true">
      <span class="nf-particle nf-p1" />
      <span class="nf-particle nf-p2" />
      <span class="nf-particle nf-p3" />
      <span class="nf-particle nf-p4" />
      <span class="nf-particle nf-p5" />
    </div>

    <main class="nf-content">
      <p class="nf-eyebrow">ERROR</p>
      <div class="nf-number" aria-hidden="true">404</div>
      <h1 class="nf-headline">PAGE NOT FOUND.</h1>
      <p class="nf-sub">
        The page you're looking for doesn't exist,<br>
        was moved, or is on a different blockchain.
      </p>

      <div class="nf-actions">
        <RouterLink to="/" class="nf-btn nf-btn--primary">Go home →</RouterLink>
        <RouterLink to="/swiss" class="nf-btn nf-btn--ghost">Try a demo →</RouterLink>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
/* ── Page ── */
.nf-page {
  min-height: 100vh;
  background: #0a0a0f;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: 'Space Mono', monospace;
  position: relative;
  overflow: hidden;
}

/* ── Particles ── */
.nf-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.nf-particle {
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  animation: nf-float 6s ease-in-out infinite;
}

.nf-p1 {
  width: 6px; height: 6px;
  background: #6366f1;
  top: 20%; left: 15%;
  animation-delay: 0s;
  animation-duration: 7s;
}
.nf-p2 {
  width: 4px; height: 4px;
  background: #a855f7;
  top: 60%; left: 80%;
  animation-delay: 1.2s;
  animation-duration: 5.5s;
}
.nf-p3 {
  width: 8px; height: 8px;
  background: rgba(99, 102, 241, 0.5);
  top: 75%; left: 25%;
  animation-delay: 2.4s;
  animation-duration: 8s;
}
.nf-p4 {
  width: 4px; height: 4px;
  background: #ec4899;
  top: 30%; left: 70%;
  animation-delay: 0.8s;
  animation-duration: 6.5s;
}
.nf-p5 {
  width: 6px; height: 6px;
  background: rgba(168, 85, 247, 0.6);
  top: 85%; left: 60%;
  animation-delay: 3.5s;
  animation-duration: 7.5s;
}

@keyframes nf-float {
  0%   { opacity: 0; transform: translateY(0) scale(1); }
  20%  { opacity: 0.8; }
  50%  { opacity: 0.6; transform: translateY(-30px) scale(1.1); }
  80%  { opacity: 0.4; }
  100% { opacity: 0; transform: translateY(-60px) scale(0.8); }
}

/* ── Content ── */
.nf-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  padding: 2rem 1.5rem;
  max-width: 560px;
}

.nf-eyebrow {
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.35);
  margin: 0 0 1rem;
}

/* Giant gradient 404 */
.nf-number {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(7rem, 20vw, 12rem);
  font-weight: 900;
  line-height: 0.85;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.25rem;
  user-select: none;
}

.nf-headline {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  font-weight: 900;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #ffffff;
  margin: 0 0 1.25rem;
}

.nf-sub {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.45);
  line-height: 1.75;
  margin: 0 0 2.5rem;
  font-family: 'Inter', system-ui, sans-serif;
}

/* ── Action buttons ── */
.nf-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.nf-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-decoration: none;
  transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;
  font-family: 'Space Mono', monospace;
}
.nf-btn:hover {
  transform: translateY(-2px);
}

.nf-btn--primary {
  background: linear-gradient(135deg, #6366f1, #a855f7);
  color: #ffffff;
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.35);
}
.nf-btn--primary:hover {
  box-shadow: 0 8px 28px rgba(99, 102, 241, 0.5);
}

.nf-btn--ghost {
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.nf-btn--ghost:hover {
  border-color: rgba(255, 255, 255, 0.4);
  color: #ffffff;
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .nf-particle { animation: none; opacity: 0; }
}
</style>
