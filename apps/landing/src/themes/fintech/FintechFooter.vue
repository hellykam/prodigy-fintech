<template>
  <footer class="footer" role="contentinfo">
    <!-- Visual flourish: terminal header line -->
    <div class="footer-terminal-header" aria-hidden="true">
      <span class="terminal-prompt">&gt; [FOOTER.SYS]</span>
    </div>

    <div class="footer-inner">
      <div class="footer-top">
        <!-- Brand column -->
        <div class="footer-brand">
          <RouterLink to="/fintech" class="logo-link" aria-label="Prodigy home">
            <span class="logo-mark" aria-hidden="true">◈</span>
            <span class="logo-name">PRODIGY</span>
          </RouterLink>
          <p class="tagline">The on-ramp stack for serious platforms.</p>
        </div>

        <!-- Platform links -->
        <nav aria-label="Platform navigation">
          <p class="col-heading">Platform</p>
          <RouterLink to="/fintech/product" class="footer-link">Product</RouterLink>
          <RouterLink to="/fintech/pricing" class="footer-link">Pricing</RouterLink>
          <RouterLink to="/fintech/security" class="footer-link">Security</RouterLink>
          <RouterLink to="/fintech/developers" class="footer-link">Developers</RouterLink>
        </nav>

        <!-- Company links -->
        <nav aria-label="Company navigation">
          <p class="col-heading">Company</p>
          <RouterLink to="/fintech/partners" class="footer-link">Partners</RouterLink>
          <RouterLink to="/fintech/case-studies" class="footer-link">Case Studies</RouterLink>
          <a href="http://localhost:5005" target="_blank" rel="noopener noreferrer" class="footer-link">↗ Live Widget demo</a>
          <a href="http://localhost:5006" target="_blank" rel="noopener noreferrer" class="footer-link">↗ Partner portal</a>
        </nav>

        <!-- CTA column -->
        <div class="footer-cta">
          <p class="cta-label">$ init integration</p>
          <RouterLink to="/fintech/developers" class="cta-button">GET API KEYS →</RouterLink>
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
  background: #080b0f;
  color: #d4b896;
  font-family: 'IBM Plex Mono', monospace;
  border-top: 1px solid rgba(245, 158, 11, 0.2);
}

.footer-terminal-header {
  padding: 0.875rem 1.5rem 0;
  max-width: 1440px;
  margin: 0 auto;
}

.terminal-prompt {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75rem;
  color: #f59e0b;
  letter-spacing: 0.1em;
}

.footer-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 1.5rem 1.5rem 2rem;
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
  color: #f59e0b;
}

.logo-mark {
  font-size: 1.125rem;
  color: #f59e0b;
}

.logo-name {
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.14em;
  color: #f59e0b;
}

.tagline {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75rem;
  color: rgba(212, 184, 150, 0.5);
  letter-spacing: 0.04em;
  margin: 0;
  line-height: 1.6;
  max-width: 30ch;
}

.col-heading {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(245, 158, 11, 0.5);
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
  color: rgba(212, 184, 150, 0.6);
  text-decoration: none;
  transition: color 0.15s;
}

.footer-link:hover {
  color: #f59e0b;
}

.footer-cta {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.cta-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75rem;
  color: rgba(245, 158, 11, 0.5);
  letter-spacing: 0.06em;
  margin: 0;
}

.cta-button {
  display: inline-block;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: #080b0f;
  background: #f59e0b;
  border: 1px solid #f59e0b;
  padding: 0.625rem 1.25rem;
  text-decoration: none;
  transition: background 0.15s, color 0.15s;
  width: fit-content;
}

.cta-button:hover {
  background: transparent;
  color: #f59e0b;
}

/* Stats strip */
.footer-stats {
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
  padding: 1.5rem 0;
  border-top: 1px solid rgba(245, 158, 11, 0.2);
  border-bottom: 1px solid rgba(245, 158, 11, 0.2);
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
  color: #f59e0b;
}

.footer-stat-label {
  font-size: 0.75rem;
  color: rgba(212, 184, 150, 0.45);
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
  color: rgba(212, 184, 150, 0.35);
  max-width: 600px;
  margin: 0;
  line-height: 1.6;
}

.footer-copy {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75rem;
  color: rgba(212, 184, 150, 0.35);
  white-space: nowrap;
  margin: 0;
}
</style>
