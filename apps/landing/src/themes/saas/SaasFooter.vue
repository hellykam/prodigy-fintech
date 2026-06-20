<template>
  <footer class="footer" role="contentinfo">
    <!-- SaaS: very subtle border-top only, no extra element -->

    <div class="footer-inner">
      <div class="footer-top">
        <!-- Brand column -->
        <div class="footer-brand">
          <RouterLink to="/saas" class="logo-link" aria-label="Prodigy home">
            <span class="logo-mark" aria-hidden="true">◈</span>
            <span class="logo-name">PRODIGY</span>
          </RouterLink>
          <p class="tagline">Crypto on-ramp for modern products.</p>
        </div>

        <!-- Platform links -->
        <nav aria-label="Platform navigation">
          <p class="col-heading">Platform</p>
          <RouterLink to="/saas/product" class="footer-link">Product</RouterLink>
          <RouterLink to="/saas/pricing" class="footer-link">Pricing</RouterLink>
          <RouterLink to="/saas/security" class="footer-link">Security</RouterLink>
          <RouterLink to="/saas/developers" class="footer-link">Developers</RouterLink>
        </nav>

        <!-- Company links -->
        <nav aria-label="Company navigation">
          <p class="col-heading">Company</p>
          <RouterLink to="/saas/partners" class="footer-link">Partners</RouterLink>
          <RouterLink to="/saas/case-studies" class="footer-link">Case Studies</RouterLink>
          <a href="http://localhost:5005" target="_blank" rel="noopener noreferrer" class="footer-link">↗ Live Widget demo</a>
          <a href="http://localhost:5006" target="_blank" rel="noopener noreferrer" class="footer-link">↗ Partner portal</a>
        </nav>

        <!-- CTA column -->
        <div class="footer-cta">
          <p class="cta-label">Get started today</p>
          <RouterLink to="/saas/developers" class="cta-button">Start for free →</RouterLink>
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
  color: #0f0f23;
  border-top: 1px solid #e2e0f0;
  font-family: 'Inter', sans-serif;
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem 1.5rem;
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
  gap: 0.4rem;
  text-decoration: none;
  color: #0f0f23;
}

.logo-mark {
  font-size: 1.25rem;
  color: #6366f1;
}

.logo-name {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.tagline {
  font-size: 0.875rem;
  color: #4a4a6a;
  line-height: 1.6;
  margin: 0;
  max-width: 28ch;
}

.col-heading {
  font-size: 0.875rem;
  font-weight: 700;
  color: #0f0f23;
  margin: 0 0 0.625rem;
  letter-spacing: 0.01em;
}

nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-link {
  font-size: 0.875rem;
  color: #4a4a6a;
  text-decoration: none;
  transition: color 0.15s;
}

.footer-link:hover {
  color: #6366f1;
}

.footer-cta {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.cta-label {
  font-size: 0.875rem;
  font-weight: 700;
  color: #0f0f23;
  margin: 0;
}

.cta-button {
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #ffffff;
  background: #6366f1;
  border-radius: 8px;
  padding: 0.625rem 1.25rem;
  text-decoration: none;
  transition: background 0.15s;
  width: fit-content;
}

.cta-button:hover {
  background: #4f46e5;
}

/* Stats strip */
.footer-stats {
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
  padding: 1.5rem 0;
  border-top: 1px solid #e2e0f0;
  border-bottom: 1px solid #e2e0f0;
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
  color: #6366f1;
}

.footer-stat-label {
  font-size: 0.75rem;
  color: #8888a8;
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
  font-size: 0.75rem;
  color: #8888a8;
  max-width: 600px;
  margin: 0;
  line-height: 1.6;
}

.footer-copy {
  font-size: 0.75rem;
  color: #8888a8;
  white-space: nowrap;
  margin: 0;
}
</style>
