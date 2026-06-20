<template>
  <footer class="footer" role="contentinfo">
    <!-- Visual flourish: bold electric-blue divider -->
    <div class="footer-divider" aria-hidden="true" />

    <div class="footer-inner">
      <div class="footer-top">
        <!-- Brand column -->
        <div class="footer-brand">
          <RouterLink to="/bold" class="logo-link" aria-label="Prodigy home">
            <span class="logo-mark" aria-hidden="true">◈</span>
            <span class="logo-name">PRODIGY</span>
          </RouterLink>
          <p class="tagline">Your crypto infrastructure. Done.</p>
        </div>

        <!-- Platform links -->
        <nav aria-label="Platform navigation">
          <p class="col-heading">Platform</p>
          <RouterLink to="/bold/product" class="footer-link">Product</RouterLink>
          <RouterLink to="/bold/pricing" class="footer-link">Pricing</RouterLink>
          <RouterLink to="/bold/security" class="footer-link">Security</RouterLink>
          <RouterLink to="/bold/developers" class="footer-link">Developers</RouterLink>
        </nav>

        <!-- Company links -->
        <nav aria-label="Company navigation">
          <p class="col-heading">Company</p>
          <RouterLink to="/bold/partners" class="footer-link">Partners</RouterLink>
          <RouterLink to="/bold/case-studies" class="footer-link">Case Studies</RouterLink>
          <a href="http://localhost:5005" target="_blank" rel="noopener noreferrer" class="footer-link">↗ Live Widget demo</a>
          <a href="http://localhost:5006" target="_blank" rel="noopener noreferrer" class="footer-link">↗ Partner portal</a>
        </nav>

        <!-- CTA column -->
        <div class="footer-cta">
          <p class="cta-label">Start building</p>
          <RouterLink to="/bold/developers" class="cta-button">GET API KEYS →</RouterLink>
        </div>
      </div>

      <!-- Stats strip -->
      <div class="footer-stats" aria-label="Platform statistics">
        <div class="footer-stat">
          <span class="footer-stat-val">2,847</span>
          <span class="footer-stat-label">INTEGRATIONS SHIPPED</span>
        </div>
        <div class="footer-stat">
          <span class="footer-stat-val">€2B+</span>
          <span class="footer-stat-label">SIMULATED VOLUME</span>
        </div>
        <div class="footer-stat">
          <span class="footer-stat-val">99.99%</span>
          <span class="footer-stat-label">UPTIME SLA</span>
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
  background: #111111;
  color: #f5f5f0;
}

.footer-divider {
  height: 2px;
  width: 100%;
  background: #2563eb;
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
  gap: 0.75rem;
}

.logo-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #f5f5f0;
}

.logo-mark {
  font-size: 1.125rem;
  color: #2563eb;
}

.logo-name {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.5rem;
  letter-spacing: 0.15em;
}

.tagline {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8125rem;
  color: rgba(245, 245, 240, 0.55);
  letter-spacing: 0.03em;
  margin: 0;
  max-width: 32ch;
  line-height: 1.5;
}

.col-heading {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 0.875rem;
  letter-spacing: 0.14em;
  color: rgba(245, 245, 240, 0.4);
  margin: 0 0 0.5rem;
  text-transform: uppercase;
}

nav {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.footer-link {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8125rem;
  letter-spacing: 0.04em;
  color: rgba(245, 245, 240, 0.65);
  text-decoration: none;
  transition: color 0.15s;
}

.footer-link:hover {
  color: #2563eb;
}

.footer-cta {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.cta-label {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 0.875rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(245, 245, 240, 0.4);
  margin: 0;
}

.cta-button {
  display: inline-block;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #f5f5f0;
  background: #2563eb;
  border: 2px solid #2563eb;
  padding: 0.6rem 1.25rem;
  text-decoration: none;
  transition: background 0.15s, color 0.15s;
  width: fit-content;
}

.cta-button:hover {
  background: transparent;
  color: #2563eb;
}

/* Stats strip */
.footer-stats {
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
  padding: 1.5rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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
  color: #2563eb;
}

.footer-stat-label {
  font-size: 0.75rem;
  color: rgba(245, 245, 240, 0.4);
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 0.1em;
  text-transform: uppercase;
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
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  color: rgba(245, 245, 240, 0.35);
  max-width: 600px;
  margin: 0;
  line-height: 1.6;
}

.footer-copy {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  color: rgba(245, 245, 240, 0.35);
  white-space: nowrap;
  margin: 0;
}
</style>
