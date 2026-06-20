<template>
  <div class="ti-page">
    <!-- Radial glow backdrop -->
    <div class="ti-radial-glow" aria-hidden="true" />

    <!-- Header bar -->
    <header class="ti-header">
      <span class="ti-logo-mark" aria-hidden="true">◈</span>
      <span class="ti-logo-name">PRODIGY</span>
      <span class="ti-logo-sub">Demo Suite</span>
    </header>

    <main class="ti-main">
      <!-- Hero -->
      <div class="ti-hero">
        <p class="ti-eyebrow">PRODIGY DEMO · 6 THEMES · 42 PAGES</p>
        <h1 class="ti-headline">Choose your version.</h1>
        <p class="ti-sub">Six different visual identities. Same infrastructure. Pick the one that matches your brand.</p>
      </div>

      <!-- Compact quick-nav picker -->
      <ThemePicker
        :currentTheme="currentTheme"
        @select="handleThemeSelect"
        class="ti-picker"
      />

      <!-- 6-card grid -->
      <div class="themes-grid">

        <!-- Swiss -->
        <RouterLink to="/swiss" class="theme-card theme-card--swiss">
          <div class="tc-preview" aria-hidden="true" />
          <div class="tc-info">
            <span class="tc-tag">Swiss</span>
            <h2 class="tc-name">Institutional</h2>
            <p class="tc-desc">Clean precision. White space. Mint green.</p>
            <span class="tc-arrow">→</span>
          </div>
        </RouterLink>

        <!-- Crypto -->
        <RouterLink to="/crypto" class="theme-card theme-card--crypto">
          <div class="tc-preview" aria-hidden="true" />
          <div class="tc-info">
            <span class="tc-tag">Crypto</span>
            <h2 class="tc-name">Builder</h2>
            <p class="tc-desc">Dark mode. Neon terminal. Ship fast.</p>
            <span class="tc-arrow">→</span>
          </div>
        </RouterLink>

        <!-- Bold -->
        <RouterLink to="/bold" class="theme-card theme-card--bold">
          <div class="tc-preview" aria-hidden="true" />
          <div class="tc-info">
            <span class="tc-tag">Bold</span>
            <h2 class="tc-name">Aggressive</h2>
            <p class="tc-desc">Black. Big. Provocative. Electric blue.</p>
            <span class="tc-arrow">→</span>
          </div>
        </RouterLink>

        <!-- Fintech -->
        <RouterLink to="/fintech" class="theme-card theme-card--fintech">
          <div class="tc-preview" aria-hidden="true" />
          <div class="tc-info">
            <span class="tc-tag">Fintech</span>
            <h2 class="tc-name">Data-heavy</h2>
            <p class="tc-desc">Terminal amber. Numbers. Enterprise.</p>
            <span class="tc-arrow">→</span>
          </div>
        </RouterLink>

        <!-- SaaS -->
        <RouterLink to="/saas" class="theme-card theme-card--saas">
          <div class="tc-preview" aria-hidden="true" />
          <div class="tc-info">
            <span class="tc-tag">SaaS</span>
            <h2 class="tc-name">PLG</h2>
            <p class="tc-desc">Clean white. Indigo. Stripe vibes.</p>
            <span class="tc-arrow">→</span>
          </div>
        </RouterLink>

        <!-- Gradient -->
        <RouterLink to="/gradient" class="theme-card theme-card--gradient">
          <div class="tc-preview" aria-hidden="true" />
          <div class="tc-info">
            <span class="tc-tag">Gradient</span>
            <h2 class="tc-name">Consumer</h2>
            <p class="tc-desc">Dark glass. Purple→pink. Beautiful.</p>
            <span class="tc-arrow">→</span>
          </div>
        </RouterLink>

      </div>

      <footer class="ti-footer-note">
        <p>Demo data. No real money. All themes run the same product at the same API.</p>
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute, RouterLink } from 'vue-router'
import { computed } from 'vue'
import ThemePicker from '../components/ThemePicker.vue'

const router = useRouter()
const route = useRoute()

const currentTheme = computed(() => {
  const seg = route.path.split('/')[1]
  return seg || ''
})

function handleThemeSelect(themeId: string): void {
  router.push(`/${themeId}`)
}
</script>

<style scoped>
/* ── Page shell ── */
.ti-page {
  min-height: 100vh;
  background: #0a0a0f;
  color: #ffffff;
  font-family: 'Space Mono', monospace;
  position: relative;
  overflow: hidden;
}

/* Radial glow in center */
.ti-radial-glow {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 600px;
  background: radial-gradient(ellipse at center, rgba(99, 102, 241, 0.12) 0%, rgba(168, 85, 247, 0.06) 40%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

/* ── Header ── */
.ti-header {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  max-width: 1200px;
  margin: 0 auto;
}
.ti-logo-mark {
  font-size: 1.25rem;
  color: #6366f1;
}
.ti-logo-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: 1.125rem;
  letter-spacing: 0.1em;
}
.ti-logo-sub {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.35);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-left: 0.25rem;
}

/* ── Main ── */
.ti-main {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem 2rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* ── Hero ── */
.ti-hero {
  text-align: center;
  max-width: 640px;
  margin-bottom: 3rem;
}
.ti-eyebrow {
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
  margin: 0 0 1.25rem;
}
.ti-headline {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  margin: 0 0 1.25rem;
  background: linear-gradient(135deg, #ffffff 40%, rgba(255, 255, 255, 0.6));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.ti-sub {
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.7;
  margin: 0;
  font-family: 'Inter', system-ui, sans-serif;
}

/* ── Compact picker ── */
.ti-picker {
  width: 100%;
  margin-bottom: 3rem;
}

/* ── Grid ── */
.themes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
}

/* ── Card base ── */
.theme-card {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}
.theme-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.25);
}

/* ── Preview block ── */
.tc-preview {
  width: 100%;
  height: 80px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}

/* Fake content lines via ::after on the card, dots via inner el */
.tc-preview::after {
  content: '';
  position: absolute;
  bottom: 14px;
  left: 14px;
  right: 14px;
  height: 5px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  box-shadow:
    0 -9px 0 0 rgba(255, 255, 255, 0.07),
    0 -18px 0 0 rgba(255, 255, 255, 0.05);
}

/* ── Swiss ── */
.theme-card--swiss .tc-preview {
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
}
.theme-card--swiss .tc-preview::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #34d399;
}
.theme-card--swiss .tc-preview::after {
  background: rgba(0, 0, 0, 0.1);
  box-shadow: 0 -9px 0 0 rgba(0, 0, 0, 0.07), 0 -18px 0 0 rgba(0, 0, 0, 0.05);
}
.theme-card--swiss:hover {
  box-shadow: 0 16px 48px rgba(52, 211, 153, 0.2);
}

/* ── Crypto ── */
.theme-card--crypto .tc-preview {
  background: #0c1117;
}
.theme-card--crypto .tc-preview::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #00ffb2;
  box-shadow: 0 0 8px rgba(0, 255, 178, 0.6);
}
.theme-card--crypto:hover {
  box-shadow: 0 16px 48px rgba(0, 255, 178, 0.15), 0 0 30px rgba(0, 255, 178, 0.06);
}

/* ── Bold ── */
.theme-card--bold .tc-preview {
  background: #111111;
}
.theme-card--bold .tc-preview::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #2563eb;
}
.theme-card--bold:hover {
  box-shadow: 0 16px 48px rgba(37, 99, 235, 0.25);
}

/* ── Fintech ── */
.theme-card--fintech .tc-preview {
  background: #0e1318;
}
.theme-card--fintech .tc-preview::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #f59e0b;
}
.theme-card--fintech:hover {
  box-shadow: 0 16px 48px rgba(245, 158, 11, 0.2);
}

/* ── SaaS ── */
.theme-card--saas .tc-preview {
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
}
.theme-card--saas .tc-preview::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #6366f1;
}
.theme-card--saas .tc-preview::after {
  background: rgba(0, 0, 0, 0.1);
  box-shadow: 0 -9px 0 0 rgba(0, 0, 0, 0.07), 0 -18px 0 0 rgba(0, 0, 0, 0.05);
}
.theme-card--saas:hover {
  box-shadow: 0 16px 48px rgba(99, 102, 241, 0.25);
}

/* ── Gradient ── */
.theme-card--gradient .tc-preview {
  background: #0f0a1e;
}
.theme-card--gradient .tc-preview::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #a855f7, #ec4899);
}
.theme-card--gradient:hover {
  box-shadow: 0 16px 48px rgba(168, 85, 247, 0.25), 0 0 30px rgba(236, 72, 153, 0.1);
}

/* ── Info block ── */
.tc-info {
  padding: 1rem 1.125rem 1.125rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  flex: 1;
}
.tc-tag {
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
}
.tc-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.5rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.01em;
  color: #ffffff;
  margin: 0;
  line-height: 1;
}
.tc-desc {
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.55;
  margin: 0.1rem 0 0;
  flex: 1;
  font-family: 'Inter', system-ui, sans-serif;
}
.tc-arrow {
  display: inline-block;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.3);
  margin-top: 0.5rem;
  transition: color 0.2s ease, transform 0.2s ease;
}
.theme-card:hover .tc-arrow {
  color: rgba(255, 255, 255, 0.85);
  transform: translateX(3px);
}

/* Arrow accent colors per theme */
.theme-card--swiss:hover .tc-arrow  { color: #34d399; }
.theme-card--crypto:hover .tc-arrow { color: #00ffb2; }
.theme-card--bold:hover .tc-arrow   { color: #2563eb; }
.theme-card--fintech:hover .tc-arrow { color: #f59e0b; }
.theme-card--saas:hover .tc-arrow   { color: #6366f1; }
.theme-card--gradient:hover .tc-arrow {
  background: linear-gradient(90deg, #a855f7, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Footer note ── */
.ti-footer-note {
  margin-top: 3.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 1.5rem;
  text-align: center;
}
.ti-footer-note p {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 0.04em;
  margin: 0;
  font-family: 'Inter', system-ui, sans-serif;
}

/* ── Responsive ── */
@media (max-width: 700px) {
  .themes-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 480px) {
  .themes-grid { grid-template-columns: 1fr; }
  .ti-main { padding: 3rem 1.25rem 3rem; }
}
</style>
