<script setup lang="ts">
import { ref } from 'vue'

interface DemoSection {
  number: number
  title: string
  duration: string
  steps: string[]
  links: { label: string; url: string }[]
}

const sections: DemoSection[] = [
  {
    number: 1,
    title: 'Consumer Onboarding',
    duration: '2 min',
    steps: [
      'Open the consumer app and register a new account.',
      'Walk through the KYC identity verification flow.',
      'Show the document upload step and selfie check.',
      'Confirm the account is pending approval.',
    ],
    links: [
      { label: 'Consumer App', url: 'http://localhost:5001' },
    ],
  },
  {
    number: 2,
    title: 'First Transaction',
    duration: '1.5 min',
    steps: [
      'Log in as alice@demo.com (password: 1234).',
      'Initiate a EUR → BTC buy order for €250.',
      'Accept the quote and confirm the transaction.',
      'Show the live system events firing in Admin.',
    ],
    links: [
      { label: 'Buy Flow', url: 'http://localhost:5001/buy' },
      { label: 'System Events (Admin)', url: 'http://localhost:5002' },
    ],
  },
  {
    number: 3,
    title: 'Admin Review',
    duration: '1.5 min',
    steps: [
      'Open the Admin panel and navigate to Transactions.',
      'Show the completed transaction details and ledger entries.',
      "Navigate to KYC Queue and open Bob's pending application.",
      "Approve Bob's KYC from the Admin queue.",
    ],
    links: [
      { label: 'Admin Panel', url: 'http://localhost:5002' },
    ],
  },
  {
    number: 4,
    title: 'Risk Scenario',
    duration: '1.5 min',
    steps: [
      'Open the Demo Controller in Admin (bottom-right button).',
      'Select scenario 3 — Risk Flagged Transaction.',
      'Run the scenario: Dave submits a €5 000 transaction.',
      'Show the Risk Queue — transaction is escalated for manual review.',
    ],
    links: [
      { label: 'Admin — Risk Queue', url: 'http://localhost:5002' },
    ],
  },
  {
    number: 5,
    title: 'Partner View',
    duration: '1.5 min',
    steps: [
      'Open the Partner portal (Acme Corp).',
      "Show commissions accrued from Alice's transactions.",
      'Navigate to the Widget Config tab and preview the embed.',
      'Summarise the B2B revenue split.',
    ],
    links: [
      { label: 'Partner Portal', url: 'http://localhost:5006' },
    ],
  },
]

const appLinks = [
  { label: 'Consumer', url: 'http://localhost:5001' },
  { label: 'Admin', url: 'http://localhost:5002' },
  { label: 'Widget Preview', url: 'http://localhost:5003' },
  { label: 'Landing', url: 'http://localhost:5004' },
  { label: 'Partner', url: 'http://localhost:5006' },
]

function openApp(url: string) {
  window.open(url, '_blank')
}

const activeSection = ref(1)

function setActive(num: number) {
  activeSection.value = num
  const el = document.getElementById(`section-${num}`)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const totalMinutes = sections.reduce((acc, s) => {
  return acc + parseFloat(s.duration)
}, 0)
</script>

<template>
  <div class="ds-page">
    <!-- Header -->
    <header class="ds-header">
      <div class="ds-header-logo">
        <span class="ds-logo-mark">◈</span>
        <span class="ds-logo-text">PRODIGY DEMO SCRIPT</span>
      </div>
      <div class="ds-header-meta">v3.4 · ~{{ totalMinutes }} min total</div>
    </header>

    <!-- Body: sidebar + main -->
    <div class="ds-body">
      <!-- Sidebar -->
      <nav class="ds-sidebar" aria-label="Demo sections">
        <div class="ds-sidebar-label">Sections</div>
        <a
          v-for="section in sections"
          :key="section.number"
          :href="`#section-${section.number}`"
          class="ds-nav-link"
          :class="{ active: activeSection === section.number }"
          @click.prevent="setActive(section.number)"
          :aria-current="activeSection === section.number ? 'location' : undefined"
        >
          <span class="ds-nav-num">{{ String(section.number).padStart(2, '0') }}</span>
          <span>{{ section.title }}</span>
          <span class="ds-nav-dur">{{ section.duration }}</span>
        </a>

        <div style="margin-top: 2rem; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 1.5rem;">
          <div class="ds-sidebar-label">Quick Open</div>
          <button
            v-for="app in appLinks"
            :key="app.url"
            type="button"
            class="ds-quick-btn"
            @click="openApp(app.url)"
          >
            {{ app.label }}
          </button>
        </div>

        <div style="margin-top: 1.5rem;">
          <a href="/" class="ds-back-link">← Back to themes</a>
        </div>
      </nav>

      <!-- Main content -->
      <main class="ds-main">
        <div
          v-for="section in sections"
          :key="section.number"
          :id="`section-${section.number}`"
          class="ds-section-card"
        >
          <div class="ds-section-header">
            <span class="ds-section-num">{{ String(section.number).padStart(2, '0') }}</span>
            <span class="ds-section-title">{{ section.title }}</span>
            <span class="ds-section-dur">{{ section.duration }}</span>
          </div>

          <div class="ds-steps">
            <div
              v-for="(step, i) in section.steps"
              :key="i"
              class="ds-step"
            >
              <span class="ds-step-bullet" aria-hidden="true" />
              <span class="ds-step-text">{{ step }}</span>
            </div>
          </div>

          <div v-if="section.links.length" class="ds-links">
            <a
              v-for="link in section.links"
              :key="link.url"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="ds-link"
            >
              {{ link.label }}
            </a>
          </div>
        </div>

        <!-- Total time footer -->
        <footer class="ds-total">
          <span class="ds-total-label">Total estimated time</span>
          <span class="ds-total-val">{{ totalMinutes }} min</span>
        </footer>
      </main>
    </div>
  </div>
</template>

<style scoped>
.ds-page {
  min-height: 100vh;
  background: #0a0a0f;
  color: #fff;
  font-family: 'Space Grotesk', system-ui, sans-serif;
}

/* Header */
.ds-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ds-header-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.ds-logo-mark {
  color: #6366f1;
  font-size: 1.25rem;
}

.ds-logo-text {
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.04em;
}

.ds-header-meta {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
  font-family: 'IBM Plex Mono', monospace;
}

/* Body layout */
.ds-body {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 0;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .ds-body {
    grid-template-columns: 1fr;
  }

  .ds-sidebar {
    position: static;
    height: auto;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
}

/* Sidebar */
.ds-sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  padding: 2rem 1.5rem;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
}

.ds-sidebar-label {
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.3);
  margin-bottom: 1rem;
}

.ds-nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.75rem;
  border-radius: 6px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
  transition: all 0.2s ease;
}

.ds-nav-link:hover,
.ds-nav-link.active {
  background: rgba(99, 102, 241, 0.12);
  color: #fff;
}

.ds-nav-num {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.6875rem;
  color: #6366f1;
  width: 20px;
  flex-shrink: 0;
}

.ds-nav-dur {
  font-size: 0.6875rem;
  color: rgba(255, 255, 255, 0.3);
  margin-left: auto;
}

.ds-quick-btn {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.25rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8125rem;
  font-family: inherit;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
}

.ds-quick-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
}

.ds-back-link {
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.35);
  text-decoration: none;
  transition: color 0.2s ease;
}

.ds-back-link:hover {
  color: rgba(255, 255, 255, 0.7);
}

/* Main content */
.ds-main {
  padding: 2rem 3rem;
}

@media (max-width: 768px) {
  .ds-main {
    padding: 2rem 1.5rem;
  }
}

.ds-section-card {
  margin-bottom: 2.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  overflow: hidden;
}

.ds-section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
}

.ds-section-num {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75rem;
  color: #6366f1;
  font-weight: 700;
}

.ds-section-title {
  font-size: 1.125rem;
  font-weight: 700;
  flex: 1;
}

.ds-section-dur {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
  padding: 0.25rem 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 99px;
}

.ds-steps {
  padding: 1.25rem 1.5rem;
}

.ds-step {
  display: flex;
  gap: 1rem;
  padding: 0.625rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  align-items: flex-start;
}

.ds-step:last-child {
  border-bottom: none;
}

.ds-step-bullet {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #6366f1;
  flex-shrink: 0;
  margin-top: 0.4rem;
}

.ds-step-text {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.5;
}

.ds-links {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  flex-wrap: wrap;
}

.ds-link {
  font-size: 0.8125rem;
  color: #a855f7;
  font-family: 'IBM Plex Mono', monospace;
  text-decoration: none;
  padding: 0.25rem 0.75rem;
  border: 1px solid rgba(168, 85, 247, 0.3);
  border-radius: 4px;
  transition: all 0.2s ease;
}

.ds-link:hover {
  background: rgba(168, 85, 247, 0.1);
  border-color: #a855f7;
}

/* Footer */
.ds-total {
  padding: 2rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.ds-total-label {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.4);
}

.ds-total-val {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 1.25rem;
  font-weight: 700;
  color: #6366f1;
}
</style>
