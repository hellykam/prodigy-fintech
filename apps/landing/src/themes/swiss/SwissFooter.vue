<template>
  <footer class="footer" role="contentinfo">
    <!-- Visual flourish: mint stripe -->
    <div class="footer-rule iris-stripe" aria-hidden="true" />

    <div class="footer-inner">
      <div class="footer-top">
        <!-- Brand column -->
        <div class="footer-brand">
          <RouterLink to="/swiss" class="logo-link" aria-label="Prodigy home">
            <span aria-hidden="true">◈</span>
            <span class="logo-name">PRODIGY</span>
          </RouterLink>
          <p class="tagline">Crypto rails. Explained precisely.</p>
        </div>

        <!-- Platform links -->
        <nav aria-label="Platform navigation">
          <p class="col-heading">Platform</p>
          <RouterLink to="/swiss/product" class="footer-link">Product</RouterLink>
          <RouterLink to="/swiss/pricing" class="footer-link">Pricing</RouterLink>
          <RouterLink to="/swiss/security" class="footer-link">Security</RouterLink>
          <RouterLink to="/swiss/developers" class="footer-link">Developers</RouterLink>
        </nav>

        <!-- Company links -->
        <nav aria-label="Company navigation">
          <p class="col-heading">Company</p>
          <RouterLink to="/swiss/partners" class="footer-link">Partners</RouterLink>
          <RouterLink to="/swiss/case-studies" class="footer-link">Case Studies</RouterLink>
          <a href="http://localhost:5005" target="_blank" rel="noopener noreferrer" class="footer-link">↗ Live Widget demo</a>
          <a href="http://localhost:5006" target="_blank" rel="noopener noreferrer" class="footer-link">↗ Partner portal</a>
        </nav>

        <!-- CTA column -->
        <div class="footer-cta">
          <p class="cta-label">Ready to integrate?</p>
          <RouterLink to="/swiss/developers" class="cta-button">Get API keys →</RouterLink>
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
  background: #ffffff;
  color: #111111;
}

.footer-rule.iris-stripe {
  height: 3px;
  width: 100%;
  background: #34d399;
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
  gap: 0.5rem;
}

.logo-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #111111;
  font-family: 'Space Mono', monospace;
  font-size: 1rem;
}

.logo-name {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  letter-spacing: 0.1em;
}

.tagline {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: #555555;
  letter-spacing: 0.06em;
  margin: 0;
  line-height: 1.6;
}

.col-heading {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #555555;
  margin: 0 0 0.5rem;
}

nav {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.footer-link {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: #333333;
  text-decoration: none;
  transition: color 0.15s;
}

.footer-link:hover {
  color: #34d399;
}

.footer-cta {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.cta-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #555555;
  margin: 0;
}

.cta-button {
  display: inline-block;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #111111;
  border: 1px solid #111111;
  padding: 0.5rem 1rem;
  text-decoration: none;
  transition: background 0.15s, color 0.15s;
  width: fit-content;
}

.cta-button:hover {
  background: #34d399;
  border-color: #34d399;
  color: #111111;
}

/* Stats strip */
.footer-stats {
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
  padding: 1.5rem 0;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
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
  color: #34d399;
}

.footer-stat-label {
  font-size: 0.75rem;
  color: #777777;
  font-family: 'Space Mono', monospace;
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
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: #777777;
  max-width: 600px;
  margin: 0;
  line-height: 1.6;
}

.footer-copy {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: #777777;
  white-space: nowrap;
  margin: 0;
}
</style>
