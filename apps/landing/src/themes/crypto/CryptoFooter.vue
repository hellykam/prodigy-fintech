<template>
  <footer class="footer" role="contentinfo">
    <!-- Visual flourish: neon glow bar -->
    <div class="footer-glow" aria-hidden="true" />

    <div class="footer-inner">
      <div class="footer-top">
        <!-- Brand column -->
        <div class="footer-brand">
          <RouterLink to="/crypto" class="logo-link" aria-label="Prodigy home">
            <span class="logo-mark" aria-hidden="true">◈</span>
            <span class="logo-name">PRODIGY</span>
          </RouterLink>
          <p class="tagline">Build fast. Ship real.</p>
        </div>

        <!-- Platform links -->
        <nav aria-label="Platform navigation">
          <p class="col-heading">Platform</p>
          <RouterLink to="/crypto/product" class="footer-link">Product</RouterLink>
          <RouterLink to="/crypto/pricing" class="footer-link">Pricing</RouterLink>
          <RouterLink to="/crypto/security" class="footer-link">Security</RouterLink>
          <RouterLink to="/crypto/developers" class="footer-link">Developers</RouterLink>
        </nav>

        <!-- Company links -->
        <nav aria-label="Company navigation">
          <p class="col-heading">Company</p>
          <RouterLink to="/crypto/partners" class="footer-link">Partners</RouterLink>
          <RouterLink to="/crypto/case-studies" class="footer-link">Case Studies</RouterLink>
          <a href="http://localhost:5005" target="_blank" rel="noopener noreferrer" class="footer-link">↗ Live Widget demo</a>
          <a href="http://localhost:5006" target="_blank" rel="noopener noreferrer" class="footer-link">↗ Partner portal</a>
        </nav>

        <!-- CTA column -->
        <div class="footer-cta">
          <p class="cta-label">// deploy now</p>
          <RouterLink to="/crypto/developers" class="cta-button">GET_API_KEYS →</RouterLink>
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
  background: #0a0d13;
  color: #c8fae8;
  font-family: 'IBM Plex Mono', monospace;
}

.footer-glow {
  height: 1px;
  width: 100%;
  background: linear-gradient(90deg, transparent, #00ffb2, transparent);
  opacity: 0.5;
}

.footer-inner {
  max-width: 1440px;
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
  gap: 0.625rem;
}

.logo-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #00ffb2;
}

.logo-mark {
  font-size: 1.25rem;
  color: #00ffb2;
}

.logo-name {
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 700;
  font-size: 1.125rem;
  letter-spacing: 0.12em;
  color: #00ffb2;
}

.tagline {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75rem;
  color: rgba(200, 250, 232, 0.5);
  letter-spacing: 0.06em;
  margin: 0;
  line-height: 1.6;
}

.col-heading {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(200, 250, 232, 0.35);
  margin: 0 0 0.5rem;
}

nav {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.footer-link {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  color: rgba(200, 250, 232, 0.55);
  text-decoration: none;
  transition: color 0.15s;
}

.footer-link:hover {
  color: #00ffb2;
}

.footer-cta {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.cta-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75rem;
  color: rgba(200, 250, 232, 0.35);
  letter-spacing: 0.08em;
  margin: 0;
}

.cta-button {
  display: inline-block;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: #0a0d13;
  background: #00ffb2;
  border: none;
  padding: 0.625rem 1.25rem;
  text-decoration: none;
  transition: background 0.15s, color 0.15s;
  width: fit-content;
}

.cta-button:hover {
  background: transparent;
  color: #00ffb2;
  outline: 1px solid #00ffb2;
}

/* Stats strip */
.footer-stats {
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
  padding: 1.5rem 0;
  border-top: 1px solid rgba(0, 255, 178, 0.15);
  border-bottom: 1px solid rgba(0, 255, 178, 0.15);
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
  color: #00ffb2;
}

.footer-stat-label {
  font-size: 0.75rem;
  color: rgba(200, 250, 232, 0.4);
  font-family: 'IBM Plex Mono', monospace;
  letter-spacing: 0.06em;
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
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75rem;
  color: rgba(200, 250, 232, 0.3);
  max-width: 600px;
  margin: 0;
  line-height: 1.6;
}

.footer-copy {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75rem;
  color: rgba(200, 250, 232, 0.3);
  white-space: nowrap;
  margin: 0;
}
</style>
