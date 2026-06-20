<template>
  <footer class="footer" role="contentinfo">
    <!-- Visual flourish: animated gradient bar -->
    <div class="footer-gradient-bar" aria-hidden="true" />

    <div class="footer-inner">
      <div class="footer-top">
        <!-- Brand column -->
        <div class="footer-brand">
          <RouterLink to="/gradient" class="logo-link" aria-label="Prodigy home">
            <span class="logo-icon" aria-hidden="true">◈</span>
            <span class="logo-text">PRODIGY</span>
          </RouterLink>
          <p class="tagline">Beautiful crypto. Everywhere.</p>
        </div>

        <!-- Platform links -->
        <nav aria-label="Platform navigation">
          <p class="col-heading">Platform</p>
          <RouterLink to="/gradient/product" class="footer-link">Product</RouterLink>
          <RouterLink to="/gradient/pricing" class="footer-link">Pricing</RouterLink>
          <RouterLink to="/gradient/security" class="footer-link">Security</RouterLink>
          <RouterLink to="/gradient/developers" class="footer-link">Developers</RouterLink>
        </nav>

        <!-- Company links -->
        <nav aria-label="Company navigation">
          <p class="col-heading">Company</p>
          <RouterLink to="/gradient/partners" class="footer-link">Partners</RouterLink>
          <RouterLink to="/gradient/case-studies" class="footer-link">Case Studies</RouterLink>
          <a href="http://localhost:5005" target="_blank" rel="noopener noreferrer" class="footer-link">↗ Live Widget demo</a>
          <a href="http://localhost:5006" target="_blank" rel="noopener noreferrer" class="footer-link">↗ Partner portal</a>
        </nav>

        <!-- CTA column -->
        <div class="footer-cta">
          <p class="cta-label">Launch your integration</p>
          <RouterLink to="/gradient/developers" class="cta-button">Get started →</RouterLink>
        </div>
      </div>

      <!-- Stats strip -->
      <div class="footer-stats" aria-label="Platform statistics">
        <div class="footer-stat">
          <span class="footer-stat-val">2,847</span>
          <span class="footer-stat-label">integrations shipped</span>
        </div>
        <div class="footer-stat">
          <span class="footer-stat-val">€2B+</span>
          <span class="footer-stat-label">simulated volume</span>
        </div>
        <div class="footer-stat">
          <span class="footer-stat-val">99.99%</span>
          <span class="footer-stat-label">uptime SLA</span>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="footer-bottom">
        <p class="footer-disclaimer">Prodigy is a demonstration product. No real money moves, no real KYC, all data is simulated.</p>
        <p class="footer-copy">© 2026 Prodigy · Demo build</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>

<style scoped>
.footer {
  background: #0f0a1e;
  color: #e8e0ff;
}

.footer-gradient-bar {
  height: 4px;
  width: 100%;
  background: linear-gradient(90deg, #a855f7, #ec4899, #a855f7);
  background-size: 200% 100%;
  animation: gradient-shift 3s linear infinite;
}

@keyframes gradient-shift {
  0% { background-position: 0% 0%; }
  100% { background-position: 200% 0%; }
}

.footer-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 3rem 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.footer-top {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
  gap: 3rem;
}

@media (max-width: 900px) {
  .footer-top { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 560px) {
  .footer-top { grid-template-columns: 1fr; }
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.logo-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.logo-icon {
  font-size: 1.25rem;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo-text {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.125rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.tagline {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.8125rem;
  color: rgba(232, 224, 255, 0.55);
  line-height: 1.6;
  margin: 0;
}

.col-heading {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(232, 224, 255, 0.4);
  margin: 0 0 0.5rem;
}

nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-link {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(232, 224, 255, 0.6);
  text-decoration: none;
  transition: color 0.15s;
}

.footer-link:hover {
  color: #c084fc;
}

.footer-cta {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.cta-label {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(232, 224, 255, 0.4);
  margin: 0;
}

.cta-button {
  display: inline-block;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  border-radius: 10px;
  padding: 0.625rem 1.25rem;
  text-decoration: none;
  transition: opacity 0.15s;
  width: fit-content;
  /* frosted-glass feel via backdrop */
  backdrop-filter: blur(8px);
}

.cta-button:hover {
  opacity: 0.85;
}

/* Stats strip */
.footer-stats {
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
  padding: 1.5rem 0;
  border-top: 1px solid rgba(168, 85, 247, 0.2);
  border-bottom: 1px solid rgba(168, 85, 247, 0.2);
}

.footer-stat {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.footer-stat-val {
  font-family: monospace;
  font-size: 1.375rem;
  font-weight: 700;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-stat-label {
  font-size: 0.75rem;
  color: rgba(232, 224, 255, 0.4);
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Bottom bar */
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding-top: 1.5rem;
}

.footer-disclaimer {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.75rem;
  color: rgba(232, 224, 255, 0.35);
  max-width: 600px;
  margin: 0;
  line-height: 1.6;
}

.footer-copy {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.75rem;
  color: rgba(232, 224, 255, 0.35);
  white-space: nowrap;
  margin: 0;
}
</style>
