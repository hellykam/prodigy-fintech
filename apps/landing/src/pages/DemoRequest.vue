<script setup lang="ts">
import { ref, reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  company: '',
  role: '',
  volume: '',
  useCase: '',
})

const loading = ref(false)
const success = ref(false)

async function submit() {
  loading.value = true
  await new Promise(r => setTimeout(r, 1000))
  success.value = true
  loading.value = false
}
</script>

<template>
  <div class="demo-page">
    <!-- Success state -->
    <div v-if="success" class="demo-success" role="alert">
      <span class="success-icon" aria-hidden="true">✓</span>
      <h2 class="success-title">Request received</h2>
      <p class="success-sub">We'll be in touch within one business day.</p>
      <div class="success-next">
        <h3>WHAT HAPPENS NEXT</h3>
        <div class="success-step">1. You'll get a confirmation email with calendar links</div>
        <div class="success-step">2. We'll send a sandbox API key for you to explore before the call</div>
        <div class="success-step">3. Your 30-minute slot is yours — cancel any time, no pressure</div>
      </div>
      <a href="/" class="demo-back-link" style="margin-top: 2rem; display: inline-block;">← Back to home</a>
    </div>

    <!-- Form state -->
    <div v-else class="demo-inner">
      <!-- Left column: form -->
      <div class="demo-form-col">
        <div class="demo-header">
          <a href="/" class="demo-back-link">← Back to themes</a>
          <span class="demo-badge">◈ PRODIGY</span>
        </div>

        <h1 class="demo-headline">Request a demo</h1>
        <p class="demo-sub">We'll walk you through the integration in 30 minutes.</p>

        <form @submit.prevent="submit" aria-label="Demo request form">
          <div class="field-row">
            <div class="field">
              <label class="field-label" for="demo-name">Full name *</label>
              <input
                id="demo-name"
                v-model="form.name"
                required
                placeholder="Sarah Chen"
                autocomplete="name"
              />
            </div>
            <div class="field">
              <label class="field-label" for="demo-email">Work email *</label>
              <input
                id="demo-email"
                v-model="form.email"
                type="email"
                required
                placeholder="sarah@company.com"
                autocomplete="email"
              />
            </div>
          </div>

          <div class="field">
            <label class="field-label" for="demo-company">Company *</label>
            <input
              id="demo-company"
              v-model="form.company"
              required
              placeholder="Acme Financial"
              autocomplete="organization"
            />
          </div>

          <div class="field">
            <label class="field-label" for="demo-role">Your role</label>
            <select id="demo-role" v-model="form.role">
              <option value="">Select...</option>
              <option>CTO / VP Engineering</option>
              <option>Product Manager</option>
              <option>Founder / CEO</option>
              <option>Business Developer</option>
              <option>Developer / Architect</option>
            </select>
          </div>

          <div class="field">
            <label class="field-label" for="demo-volume">Expected monthly volume</label>
            <select id="demo-volume" v-model="form.volume">
              <option value="">Select...</option>
              <option>Under €100K</option>
              <option>€100K – €1M</option>
              <option>€1M – €10M</option>
              <option>Over €10M</option>
            </select>
          </div>

          <div class="field">
            <label class="field-label" for="demo-usecase">Use case</label>
            <textarea
              id="demo-usecase"
              v-model="form.useCase"
              rows="3"
              placeholder="Tell us about your integration..."
            />
          </div>

          <button
            type="submit"
            :disabled="loading || !form.name || !form.email || !form.company"
            class="demo-submit"
            :aria-busy="loading"
          >
            <span v-if="loading">Sending...</span>
            <span v-else>Request demo →</span>
          </button>
        </form>
      </div>

      <!-- Right column: info panel -->
      <aside class="demo-info-panel" aria-label="What you will see in the demo">
        <div class="info-label">◈ WHAT YOU'LL SEE</div>

        <div class="info-step">
          <div class="info-step-num">STEP 01</div>
          <div class="info-step-title">Live widget embed</div>
          <div class="info-step-desc">We embed the Prodigy widget in your prototype in real time. Takes 4 minutes.</div>
        </div>

        <div class="info-step">
          <div class="info-step-num">STEP 02</div>
          <div class="info-step-title">Full KYC flow</div>
          <div class="info-step-desc">Watch a complete identity verification run end to end. 47 seconds, 94% pass rate.</div>
        </div>

        <div class="info-step">
          <div class="info-step-num">STEP 03</div>
          <div class="info-step-title">Partner dashboard</div>
          <div class="info-step-desc">See every transaction, every fee, every KYC result. Your data. Your brand.</div>
        </div>

        <div class="info-divider" />

        <p class="info-quote">"Booked a demo on Monday. Went live on Thursday."</p>
        <p class="info-attr">— CTO, Series B Neobank (simulated)</p>

        <div class="info-divider" />

        <div class="info-stats">
          <div>
            <div class="info-stat-val">2,847</div>
            <div class="info-stat-label">demos completed</div>
          </div>
          <div>
            <div class="info-stat-val">47 min</div>
            <div class="info-stat-label">average session</div>
          </div>
          <div>
            <div class="info-stat-val">100%</div>
            <div class="info-stat-label">of attendees get a sandbox</div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.demo-page {
  min-height: 100vh;
  background: #0a0a0f;
  color: #fff;
  font-family: 'Space Grotesk', system-ui, sans-serif;
}

/* Two-column inner */
.demo-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 5rem 2rem;
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 5rem;
  align-items: start;
}

@media (max-width: 900px) {
  .demo-inner {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

/* Header */
.demo-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3rem;
}

.demo-back-link {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.875rem;
  text-decoration: none;
  transition: color 0.2s ease;
}

.demo-back-link:hover {
  color: #fff;
}

.demo-badge {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.5);
}

/* Headline */
.demo-headline {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  line-height: 1.1;
  margin: 0 0 0.75rem;
}

.demo-sub {
  color: rgba(255, 255, 255, 0.55);
  font-size: 1.0625rem;
  margin: 0 0 2.5rem;
}

/* Form fields */
.field {
  margin-bottom: 1.25rem;
}

.field-label {
  display: block;
  font-size: 0.8125rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.375rem;
}

.field input,
.field select,
.field textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  color: #fff;
  font-size: 0.9375rem;
  font-family: inherit;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
  -webkit-appearance: none;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.field input::placeholder,
.field textarea::placeholder {
  color: rgba(255, 255, 255, 0.25);
}

.field select option {
  background: #1a1a2e;
}

/* Two equal columns for name + email */
.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 600px) {
  .field-row {
    grid-template-columns: 1fr;
  }
}

/* Submit button */
.demo-submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.875rem 2rem;
  margin-top: 1.5rem;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  font-family: inherit;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.demo-submit:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.demo-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Info panel */
.demo-info-panel {
  position: sticky;
  top: 2rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
}

.info-label {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #a855f7;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
}

.info-step {
  margin-bottom: 1.25rem;
}

.info-step-num {
  font-size: 0.6875rem;
  font-weight: 700;
  color: #6366f1;
  margin-bottom: 0.25rem;
  font-family: 'IBM Plex Mono', monospace;
}

.info-step-title {
  font-size: 0.9375rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.info-step-desc {
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.5;
}

.info-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 1.5rem 0;
}

.info-quote {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
  font-style: italic;
  line-height: 1.6;
  margin: 0 0 0.5rem;
}

.info-attr {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
  margin: 0;
}

.info-stats {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.info-stat-val {
  font-size: 1.25rem;
  font-weight: 700;
  color: #a855f7;
  font-family: 'IBM Plex Mono', monospace;
}

.info-stat-label {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.45);
}

/* Success state */
.demo-success {
  text-align: center;
  padding: 4rem 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.success-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  display: block;
}

.success-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.75rem;
}

.success-sub {
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.0625rem;
  margin: 0 0 2rem;
}

.success-next {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: left;
}

.success-next h3 {
  font-size: 0.875rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 0 0 1rem;
}

.success-step {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  line-height: 1.5;
}

.success-step:last-child {
  border-bottom: none;
}
</style>
