<template>
  <main>
    <!-- Hero -->
    <section class="page-hero" aria-labelledby="product-headline">
      <div class="section-inner">
        <div class="section-header">
          <p class="label eyebrow">02 / Product</p>
          <h1 id="product-headline" class="page-headline" ref="h1">
            EIGHT MODULES.<br />ONE AFTERNOON.
          </h1>
          <p class="page-sub">The full crypto operating stack, assembled in the order that makes sense to a sane person. Which, remarkably, includes you.</p>
          <div class="receipt-anim" aria-hidden="true">
            <svg viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="receipt-svg">
              <!-- Receipt body -->
              <rect x="10" y="10" width="140" height="160" stroke="#0a0a0a" stroke-width="1.5" class="receipt-body" />
              <!-- Zigzag bottom -->
              <polyline points="10,170 20,180 30,170 40,180 50,170 60,180 70,170 80,180 90,170 100,180 110,170 120,180 130,170 140,180 150,170" stroke="#0a0a0a" stroke-width="1.5" class="receipt-zigzag" fill="none"/>
              <!-- Lines -->
              <line x1="24" y1="40" x2="136" y2="40" stroke="#0a0a0a" stroke-width="1" class="receipt-line" stroke-dasharray="112" stroke-dashoffset="112"/>
              <line x1="24" y1="65" x2="136" y2="65" stroke="#0a0a0a" stroke-width="1" class="receipt-line" stroke-dasharray="112" stroke-dashoffset="112"/>
              <line x1="24" y1="90" x2="136" y2="90" stroke="#0a0a0a" stroke-width="1" class="receipt-line" stroke-dasharray="112" stroke-dashoffset="112"/>
              <line x1="24" y1="115" x2="100" y2="115" stroke="#0a0a0a" stroke-width="1" class="receipt-line receipt-line--total" stroke-dasharray="76" stroke-dashoffset="76"/>
              <!-- Checkmark -->
              <polyline points="55,140 70,155 105,125" stroke="#34d399" stroke-width="2.5" class="receipt-check" stroke-dasharray="60" stroke-dashoffset="60" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Live Widget Demo -->
    <section class="widget-demo-section" aria-labelledby="widget-demo-h" data-reveal="fade-up">
      <div class="section-inner widget-demo-inner">
        <div class="widget-demo-copy">
          <p class="label eyebrow">LIVE WIDGET DEMO</p>
          <h2 id="widget-demo-h" class="section-headline">WHAT YOUR USERS ACTUALLY SEE.</h2>
          <p class="widget-demo-sub">The full buy flow, verified, receipted, and branded. No redirects. No surprises.</p>
          <ul class="widget-demo-bullets">
            <li><span class="wdb-bullet" aria-hidden="true">◈</span>KYC runs inside the widget — users never leave your product</li>
            <li><span class="wdb-bullet" aria-hidden="true">◈</span>Full fee breakdown shown before confirmation</li>
            <li><span class="wdb-bullet" aria-hidden="true">◈</span>Receipt issued immediately on settlement</li>
          </ul>
        </div>
        <div class="widget-demo-frame">
          <WidgetDemo theme="swiss" />
        </div>
      </div>
    </section>

    <!-- Modules grid -->
    <section class="modules-section" aria-labelledby="modules-h">
      <div class="section-inner">
        <p id="modules-h" class="label" style="margin-bottom: 2rem">The eight modules</p>
        <div class="modules-grid" ref="modulesGridRef" data-animate-stagger>
          <article v-for="mod in modules" :key="mod.id" class="module-card">
            <div class="module-id iris-text" aria-hidden="true">{{ mod.id }}</div>
            <h3 class="module-name">{{ mod.name }}</h3>
            <p class="module-desc">{{ mod.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="how-section" ref="howSectionRef" aria-labelledby="how-h">
      <div class="iris-bar iris-stripe" aria-hidden="true" />
      <div class="section-inner">
        <div class="section-header">
          <p class="label eyebrow">How it works</p>
          <h2 id="how-h" class="section-headline">FOUR STEPS. NO FOOTNOTES.</h2>
        </div>
        <div class="steps-grid">
          <div v-for="step in steps" :key="step.id" class="step-card">
            <div class="step-id font-mono">{{ step.id }}</div>
            <div class="step-title">{{ step.title }}</div>
            <p class="step-desc">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Payment Flow Visualization -->
    <section class="section section--dark" aria-labelledby="flow-h" data-reveal="fade-up">
      <div class="section-inner">
        <p class="eyebrow eyebrow--light">ARCHITECTURE</p>
        <h2 id="flow-h" class="section-headline section-headline--light" ref="h2r">
          WHAT HAPPENS WHEN SOMEONE CLICKS BUY.
        </h2>
        <p class="section-sub section-sub--light">Seven milliseconds. Six systems. One receipt.</p>
        <PaymentFlowSvg theme="dark" />

        <!-- Transaction Pipeline SVG -->
        <div class="pipeline-wrap" data-reveal="fade-up">
          <svg viewBox="0 0 500 80" fill="none" xmlns="http://www.w3.org/2000/svg"
               width="100%" preserveAspectRatio="xMidYMid meet"
               aria-hidden="true" role="img" class="pipeline-svg">
            <defs>
              <marker id="sw-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#34d399" />
              </marker>
            </defs>
            <!-- Boxes -->
            <rect class="pipeline-box" x="0" y="22" width="80" height="36" ry="4" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.25)" stroke-width="1" />
            <rect class="pipeline-box" x="100" y="22" width="80" height="36" ry="4" fill="rgba(52,211,153,0.12)" stroke="#34d399" stroke-width="1.5" />
            <rect class="pipeline-box" x="200" y="22" width="80" height="36" ry="4" fill="rgba(52,211,153,0.12)" stroke="#34d399" stroke-width="1.5" />
            <rect class="pipeline-box" x="300" y="22" width="80" height="36" ry="4" fill="rgba(52,211,153,0.12)" stroke="#34d399" stroke-width="1.5" />
            <rect class="pipeline-box" x="400" y="22" width="80" height="36" ry="4" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.25)" stroke-width="1" />
            <!-- Labels -->
            <text x="40" y="44" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.55)" font-family="Space Mono, monospace">Your App</text>
            <text x="140" y="44" text-anchor="middle" font-size="9" fill="#34d399" font-family="Space Mono, monospace">Prodigy SDK</text>
            <text x="240" y="44" text-anchor="middle" font-size="9" fill="#34d399" font-family="Space Mono, monospace">KYC Check</text>
            <text x="340" y="44" text-anchor="middle" font-size="9" fill="#34d399" font-family="Space Mono, monospace">Settlement</text>
            <text x="440" y="44" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.55)" font-family="Space Mono, monospace">Receipt</text>
            <!-- Arrows -->
            <line class="pipeline-arrow" x1="82" y1="40" x2="97" y2="40" stroke="#34d399" stroke-width="1.5" marker-end="url(#sw-arrow)" stroke-dasharray="60" stroke-dashoffset="60" />
            <line class="pipeline-arrow" x1="182" y1="40" x2="197" y2="40" stroke="#34d399" stroke-width="1.5" marker-end="url(#sw-arrow)" stroke-dasharray="60" stroke-dashoffset="60" />
            <line class="pipeline-arrow" x1="282" y1="40" x2="297" y2="40" stroke="#34d399" stroke-width="1.5" marker-end="url(#sw-arrow)" stroke-dasharray="60" stroke-dashoffset="60" />
            <line class="pipeline-arrow" x1="382" y1="40" x2="397" y2="40" stroke="#34d399" stroke-width="1.5" marker-end="url(#sw-arrow)" stroke-dasharray="60" stroke-dashoffset="60" />
          </svg>
        </div>
      </div>
    </section>

    <!-- Comparison Table -->
    <section class="section section--white" aria-labelledby="compare-h">
      <div class="section-inner">
        <p class="label eyebrow">FEATURE COMPARISON</p>
        <h2 id="compare-h" class="section-headline">WITHOUT VS WITH.</h2>
        <div class="compare-table-wrap" data-reveal="fade-up">
          <table class="compare-table" aria-label="Feature comparison: Without Prodigy vs With Prodigy">
            <thead>
              <tr>
                <th class="compare-th compare-th--feature">Feature</th>
                <th class="compare-th compare-th--without">Without Prodigy</th>
                <th class="compare-th compare-th--with">With Prodigy</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in comparisonRows" :key="row.feature" class="compare-row">
                <td class="compare-td compare-td--feature">{{ row.feature }}</td>
                <td class="compare-td compare-td--without">{{ row.without }}</td>
                <td class="compare-td compare-td--with">{{ row.with }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Technical Specs Cards -->
    <section class="section section--light" aria-labelledby="specs-h">
      <div class="section-inner">
        <p class="label eyebrow">TECHNICAL SPECIFICATIONS</p>
        <h2 id="specs-h" class="section-headline">BUILT TO ENTERPRISE STANDARD.</h2>
        <div class="specs-grid" data-animate-stagger>
          <article v-for="spec in techSpecs" :key="spec.title" class="spec-card">
            <p class="spec-title">{{ spec.title }}</p>
            <p class="spec-value">{{ spec.value }}</p>
            <p class="spec-detail">{{ spec.detail }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Architecture: Payment Flow -->
    <section class="section section--dark" aria-labelledby="arch-flow-h" data-reveal="fade-up">
      <div class="section-inner">
        <p class="eyebrow eyebrow--light">ARCHITECTURE</p>
        <h2 id="arch-flow-h" class="section-headline section-headline--light">
          WHAT HAPPENS WHEN SOMEONE CLICKS BUY.
        </h2>
        <p class="section-sub section-sub--light">Seven milliseconds. Six systems. One receipt.</p>
        <PaymentFlowSvg theme="dark" />
      </div>
    </section>

    <!-- Integration Trade-Off Comparison -->
    <section class="section section--white" aria-labelledby="tradeoff-h">
      <div class="section-inner">
        <p class="label eyebrow">FEATURE COMPARISON</p>
        <h2 id="tradeoff-h" class="section-headline">THE INTEGRATION TRADE-OFF</h2>
        <div class="compare-table-wrap">
          <table class="compare-table" aria-label="Integration trade-off: Without Prodigy vs With Prodigy">
            <thead>
              <tr>
                <th class="compare-th compare-th--feature">Feature</th>
                <th class="compare-th compare-th--without">Without Prodigy</th>
                <th class="compare-th compare-th--with">With Prodigy</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in tradeoffRows" :key="row.feature" class="compare-row">
                <td class="compare-td compare-td--feature">{{ row.feature }}</td>
                <td class="compare-td compare-td--without">{{ row.without }}</td>
                <td class="compare-td compare-td--with">{{ row.with }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Technical Specs Card Grid -->
    <section class="section section--specs" aria-labelledby="specs-new-h">
      <div class="section-inner">
        <p class="label eyebrow">TECHNICAL SPECIFICATIONS</p>
        <h2 id="specs-new-h" class="section-headline">BUILT TO ENTERPRISE STANDARD.</h2>
        <div class="specs-card-grid" data-animate-stagger>
          <article v-for="spec in enterpriseSpecs" :key="spec.label" class="spec-card-new">
            <p class="spec-card-eyebrow">{{ spec.label }}</p>
            <p class="spec-card-value">{{ spec.value }}</p>
            <p class="spec-card-desc">{{ spec.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Metrics Strip -->
    <section class="section section--metrics" aria-labelledby="metrics-strip-h">
      <div class="section-inner">
        <div class="metrics-strip" data-animate-stagger>
          <div class="ms-cell">
            <p class="ms-value"><span ref="swissStat1">50</span>+</p>
            <p class="ms-label">COUNTRIES</p>
          </div>
          <div class="ms-cell">
            <p class="ms-value">&lt;1 AFTERNOON</p>
            <p class="ms-label">INTEGRATION TIME</p>
          </div>
          <div class="ms-cell">
            <p class="ms-value"><span ref="swissStat2">94</span>%</p>
            <p class="ms-label">KYC PASS RATE</p>
          </div>
          <div class="ms-cell">
            <p class="ms-value">$<span ref="swissStat3">2</span>B+</p>
            <p class="ms-label">PROCESSED</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Use Cases -->
    <section class="section section--white" aria-labelledby="usecases-h">
      <div class="section-inner">
        <p class="label eyebrow" data-reveal="fade-up">WHO USES PRODIGY</p>
        <h2 id="usecases-h" class="section-headline" data-reveal="fade-up">WHO USES PRODIGY</h2>
        <div class="usecases-grid" data-animate-stagger>
          <article class="usecase-card">
            <span class="usecase-tag">NEOBANKS</span>
            <h3 class="usecase-title">Neobanks</h3>
            <p class="usecase-body">Offer crypto without a new licence. Compliance included.</p>
          </article>
          <article class="usecase-card">
            <span class="usecase-tag">CRYPTO EXCHANGES</span>
            <h3 class="usecase-title">Crypto Exchanges</h3>
            <p class="usecase-body">Add a compliant fiat on-ramp in days, not months.</p>
          </article>
          <article class="usecase-card">
            <span class="usecase-tag">WEALTH MANAGERS</span>
            <h3 class="usecase-title">Wealth Managers</h3>
            <p class="usecase-body">Crypto exposure with a full KYC audit trail your legal team can export.</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Build vs Buy Table -->
    <section class="section section--light" aria-labelledby="buildbuy-h">
      <div class="section-inner">
        <p class="label eyebrow" data-reveal="fade-up">BUILD VS BUY</p>
        <h2 id="buildbuy-h" class="section-headline" ref="h3r" data-reveal="fade-up">WHY NOT BUILD IN-HOUSE?</h2>
        <div class="bvb-table-wrap" data-reveal="fade-up">
          <table class="bvb-table" aria-label="Build vs buy comparison">
            <thead>
              <tr>
                <th class="bvb-th bvb-th--feature"></th>
                <th class="bvb-th bvb-th--inhouse">In-house</th>
                <th class="bvb-th bvb-th--prodigy">Prodigy</th>
              </tr>
            </thead>
            <tbody>
              <tr class="bvb-row">
                <td class="bvb-td bvb-td--feature">Time to deploy</td>
                <td class="bvb-td bvb-td--inhouse">6–18 months</td>
                <td class="bvb-td bvb-td--prodigy">1 afternoon</td>
              </tr>
              <tr class="bvb-row">
                <td class="bvb-td bvb-td--feature">Compliance overhead</td>
                <td class="bvb-td bvb-td--inhouse">Ongoing, high</td>
                <td class="bvb-td bvb-td--prodigy">Zero</td>
              </tr>
              <tr class="bvb-row">
                <td class="bvb-td bvb-td--feature">Maintenance</td>
                <td class="bvb-td bvb-td--inhouse">Dedicated team</td>
                <td class="bvb-td bvb-td--prodigy">Included</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-strip" aria-label="Next steps">
      <div class="section-inner cta-inner">
        <div class="cta-left">
          <p class="label" style="margin-bottom: 0.75rem">Explore further</p>
          <p class="cta-copy">Fees are transparent. Partners earn per transaction. The compliance team does not call you at 2 a.m.</p>
        </div>
        <div class="cta-actions" ref="ctaContainer">
          <RouterLink to="/swiss/pricing" class="cta-btn cta-btn--primary">See the fee structure →</RouterLink>
          <a href="http://localhost:5004" target="_blank" rel="noopener noreferrer" class="cta-btn cta-btn--secondary">See it live in the System Map →</a>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PaymentFlowSvg from '@/components/shared/PaymentFlowSvg.vue'
import WidgetDemo from '@/components/shared/WidgetDemo.vue'
import { useCountUp, gsap, ScrollTrigger } from '@/composables/useGSAP'
import { useClipReveal } from '@/composables/useSplitReveal'
import { useMagneticAll } from '@/composables/useMagneticButton'
import { useCardTiltAll } from '@/composables/useCardTilt'

const swissStat1 = ref<HTMLElement | null>(null)
const swissStat2 = ref<HTMLElement | null>(null)
const swissStat3 = ref<HTMLElement | null>(null)

useCountUp(swissStat1, 50, { duration: 2 })
useCountUp(swissStat2, 94, { duration: 2.5 })
useCountUp(swissStat3, 2, { duration: 2 })

// ── WOW Animations ───────────────────────────────────────────────
const h1 = ref<HTMLElement | null>(null)
const h2r = ref<HTMLElement | null>(null)
const h3r = ref<HTMLElement | null>(null)
const ctaContainer = ref<HTMLElement | null>(null)
const modulesGridRef = ref<HTMLElement | null>(null)
const howSectionRef = ref<HTMLElement | null>(null)

useClipReveal(h1, { direction: 'up', duration: 0.85 })
useClipReveal(h2r, { direction: 'up', duration: 0.85, delay: 0.1 })
useClipReveal(h3r, { direction: 'left', duration: 0.85, delay: 0.1 })
useMagneticAll(ctaContainer, '.cta-btn', { strength: 0.25, returnDuration: 600 })
useCardTiltAll(modulesGridRef, '.module-card', { maxTilt: 5, scale: 1.03, glowColor: '#34d399', glowIntensity: 0.15 })

onMounted(() => {
  if (!howSectionRef.value) return
  const stepCards = howSectionRef.value.querySelectorAll('.step-card')
  if (!stepCards.length) return

  gsap.set(stepCards, { opacity: 0, y: 32 })

  ScrollTrigger.create({
    trigger: howSectionRef.value,
    start: 'top 80%',
    onEnter: () => {
      gsap.to(stepCards, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
      })
    },
    once: true,
  })
})

const modules = [
  {
    id: '01',
    name: 'Embeddable Widget',
    desc: 'One script tag. The KYC, risk, fee logic, and ledger are already inside. You do not need to understand them. You just need to put them somewhere.',
  },
  {
    id: '02',
    name: 'KYC Simulator',
    desc: 'Identity verification that tells users what it found, not just what it decided. Powered by Sumsub in production.',
  },
  {
    id: '03',
    name: 'Risk Engine',
    desc: 'Automated scoring with configurable thresholds. When it flags something interesting, it creates a task rather than silently declining and hoping no one notices.',
  },
  {
    id: '04',
    name: 'Admin Console',
    desc: 'Every transaction, every KYC status, every risk decision. Visible to your ops team, in real time, formatted like humans are expected to read it.',
  },
  {
    id: '05',
    name: 'Partner Portal',
    desc: 'Revenue earned per transaction, total commissions, date ranges. Everything your finance team was going to ask for next quarter, available now.',
  },
  {
    id: '06',
    name: 'Market Simulator',
    desc: 'Realistic EUR/crypto pricing without real market exposure. Useful for demos, testing, and impressing investors.',
  },
  {
    id: '07',
    name: 'Ledger & Fees',
    desc: 'Double-entry accounting for every trade. No mystery math. No "where did the money go" conversations.',
  },
  {
    id: '08',
    name: 'Live System Map',
    desc: 'Watch the entire transaction flow animate in real time. Widget → Backend → KYC → Risk → Ledger → Admin. All connected. All visible.',
  },
]

interface ComparisonRow {
  feature: string
  without: string
  with: string
}

const comparisonRows: ComparisonRow[] = [
  { feature: 'KYC', without: 'Build in-house (6–12 weeks)', with: 'Included, runs in widget' },
  { feature: 'Risk scoring', without: 'Manual review queue', with: '12 automated checks, <400ms' },
  { feature: 'Fee transparency', without: 'Custom UI required', with: 'Receipt built-in, pre-confirm' },
  { feature: 'Audit trail', without: 'Custom logging', with: 'Immutable log, per-transaction' },
  { feature: 'Partner revenue', without: 'Manual invoicing', with: 'Auto-calculated, portal access' },
  { feature: 'Compliance updates', without: "Your team's responsibility", with: 'Handled, no code changes' },
  { feature: 'Integration time', without: '3–6 months', with: '1 afternoon' },
]

interface TechSpec {
  title: string
  value: string
  detail: string
}

const techSpecs: TechSpec[] = [
  { title: 'UPTIME', value: '99.97% SLA', detail: 'Monitored 24/7. Status page at status.prodigy.demo.' },
  { title: 'LATENCY', value: '<200ms (p99)', detail: 'Quote time. Settlement in <3s. Global edge nodes.' },
  { title: 'DATA HOSTING', value: 'EU-only', detail: 'Frankfurt. GDPR-aligned. AML data: 5yr retention.' },
  { title: 'SECURITY', value: 'ISO 27001 aligned', detail: 'Pen tested annually. SOC 2 in progress.' },
]

interface TradeoffRow {
  feature: string
  without: string
  with: string
}

const tradeoffRows: TradeoffRow[] = [
  { feature: 'KYC', without: 'Build in-house (6–12 weeks)', with: 'Included, runs inside the widget' },
  { feature: 'Risk scoring', without: 'Manual review queue', with: '12 automated checks, <400ms' },
  { feature: 'Fee transparency', without: 'Custom UI required', with: 'Receipt built-in, shown pre-confirm' },
  { feature: 'Audit trail', without: 'Custom logging', with: 'Immutable log, per-transaction' },
  { feature: 'Partner revenue', without: 'Manual invoicing', with: 'Auto-calculated, portal access' },
  { feature: 'Integration time', without: '3–6 months', with: '1 afternoon' },
]

interface EnterpriseSpec {
  label: string
  value: string
  desc: string
}

const enterpriseSpecs: EnterpriseSpec[] = [
  { label: 'UPTIME', value: '99.97% SLA', desc: 'Monitored 24/7. Status page at status.prodigy.demo.' },
  { label: 'LATENCY', value: '<200ms quote (p99)', desc: '<3s settlement. Global edge nodes.' },
  { label: 'DATA HOSTING', value: 'EU-only (Frankfurt)', desc: 'GDPR-aligned. AML data 5yr retention.' },
  { label: 'SECURITY', value: 'ISO 27001 aligned', desc: 'Pen tested annually. SOC 2 in progress.' },
]

const steps = [
  {
    id: 'Step 01',
    title: 'EMBED',
    desc: 'Add one script tag to your site. Configure your fee percentage and partner share in the admin console. Takes less time than reading this sentence will.',
  },
  {
    id: 'Step 02',
    title: 'KYC',
    desc: 'Your users verify identity once. The widget handles the flow, the Sumsub integration, and the rejection messaging (which, unlike most systems, actually tells you why).',
  },
  {
    id: 'Step 03',
    title: 'TRADE',
    desc: 'User sees full fee breakdown before confirming. Exchange rate. Platform fee. Partner share. Network fee. The receipt tells no lies.',
  },
  {
    id: 'Step 04',
    title: 'SETTLE',
    desc: 'Ledger posts. Admin sees it. Partner portal updates. You earn the share. The compliance team does not call you at 2 a.m.',
  },
]
</script>

<style scoped>
/* ── Layout ── */
.section-inner { max-width: 1440px; margin: 0 auto; padding: 5rem 1.5rem; }

/* ── Hero ── */
.page-hero { border-bottom: 1px solid var(--ink); background: var(--paper); }
.section-header { display: flex; flex-direction: column; gap: 1rem; }
.eyebrow { margin: 0; }
.page-headline {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(3.5rem, 9vw, 8rem);
  font-weight: 900; line-height: 0.92;
  letter-spacing: -0.02em; text-transform: uppercase;
  margin: 0;
}
.page-sub {
  font-size: 1.125rem; line-height: 1.6;
  color: var(--ink-mid); max-width: 48ch; margin: 0;
}

/* ── Modules ── */
.modules-section { border-bottom: 1px solid var(--ink); background: #fafafa; }
.modules-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 1px solid var(--ink);
}
.module-card {
  padding: 1.75rem 1.5rem;
  border-right: 1px solid var(--ink);
  border-bottom: 1px solid var(--ink);
  display: flex; flex-direction: column; gap: 0.75rem;
  transition: background 0.15s;
}
.module-card:hover { background: #f0f0f0; }
.module-card:nth-child(4n) { border-right: none; }
.module-card:nth-last-child(-n+4) { border-bottom: none; }
.module-id {
  font-family: 'Space Mono', monospace;
  font-size: 1.5rem; font-weight: 700;
  letter-spacing: -0.02em; line-height: 1;
}
.module-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.25rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.01em;
  line-height: 1.1; margin: 0;
}
.module-desc {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem; color: var(--ink-mid);
  line-height: 1.65; margin: 0;
}

/* ── How it works ── */
.how-section { border-bottom: 1px solid var(--ink); background: var(--paper); }
.iris-bar { height: 4px; background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe, #667eea); background-size: 200% auto; }
.section-headline {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(2rem, 4.5vw, 3.75rem);
  font-weight: 900; line-height: 1;
  letter-spacing: -0.02em; text-transform: uppercase;
  max-width: 28ch; margin: 0;
}
.steps-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 3rem;
  border: 1px solid var(--ink);
}
.step-card {
  padding: 2rem 1.5rem;
  border-right: 1px solid var(--ink);
  display: flex; flex-direction: column; gap: 0.875rem;
}
.step-card:last-child { border-right: none; }
.step-id {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem; letter-spacing: 0.15em;
  text-transform: uppercase; color: var(--ink-muted);
}
.step-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 2rem; font-weight: 900;
  text-transform: uppercase; letter-spacing: -0.01em;
  line-height: 1;
}
.step-desc {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem; color: var(--ink-mid);
  line-height: 1.65; margin: 0;
}

/* ── Dark / White section variants ── */
.section--dark { background: #0a0a0a; border-bottom: 1px solid #222; }
.section--white { background: #fff; border-bottom: 1px solid var(--ink); }
.section--specs { background: #f5f5f5; border-bottom: 1px solid var(--ink); }
.eyebrow--light { color: rgba(255,255,255,0.55); }
.section-headline--light { color: #fff; }
.section-sub--light { color: rgba(255,255,255,0.7); font-size: 1.125rem; line-height: 1.6; margin: 0.75rem 0 2.5rem; }
.section-sub { font-size: 1.125rem; line-height: 1.6; color: var(--ink-mid); margin: 0.75rem 0 2.5rem; }

/* ── Comparison table ── */
.compare-table-wrap { overflow-x: auto; margin-top: 2.5rem; }
.compare-table { width: 100%; border-collapse: collapse; }
.compare-th {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;
  padding: 0.875rem 1.25rem; text-align: left;
  border: 1px solid var(--ink); background: #fafafa;
}
.compare-th--feature { width: 20%; }
.compare-th--without { width: 40%; }
.compare-th--with { width: 40%; color: #34d399; }
.compare-row { border: 1px solid var(--ink); }
.compare-td {
  padding: 0.875rem 1.25rem; border: 1px solid rgba(0,0,0,0.1);
  vertical-align: top; line-height: 1.55;
}
.compare-td--feature {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.01em; border-color: var(--ink);
}
.compare-td--without {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem; color: var(--ink-mid);
}
.compare-td--with {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem; color: var(--ink);
}

/* ── Specs card grid ── */
.specs-card-grid {
  display: grid; grid-template-columns: repeat(2, 1fr);
  gap: 0; border: 1px solid var(--ink); margin-top: 2.5rem;
}
.spec-card-new {
  padding: 2rem 1.75rem; border-right: 1px solid var(--ink); border-bottom: 1px solid var(--ink);
  display: flex; flex-direction: column; gap: 0.5rem; background: #fff;
}
.spec-card-new:nth-child(2n) { border-right: none; }
.spec-card-new:nth-last-child(-n+2) { border-bottom: none; }
.spec-card-eyebrow {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--ink-muted); margin: 0;
}
.spec-card-value {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(1.5rem, 3vw, 2.25rem); font-weight: 900;
  line-height: 1; letter-spacing: -0.01em; text-transform: uppercase; margin: 0;
}
.spec-card-desc {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.875rem; color: var(--ink-mid); line-height: 1.55; margin: 0;
}

/* ── CTA strip ── */
.cta-strip { border-bottom: 1px solid var(--ink); background: var(--ink); color: var(--paper); }
.cta-inner {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem; align-items: center;
}
.cta-left { display: flex; flex-direction: column; }
.cta-copy {
  font-size: 1rem; line-height: 1.6;
  color: rgba(255,255,255,0.75); margin: 0;
}
.cta-actions { display: flex; flex-direction: column; gap: 0.875rem; }
.cta-btn {
  display: block; font-family: 'Space Mono', monospace;
  font-size: 0.8125rem; font-weight: 700;
  letter-spacing: 0.08em; text-transform: uppercase;
  text-decoration: none; padding: 0.875rem 1.5rem;
  text-align: center; border: 1.5px solid var(--paper);
  transition: background 0.15s, color 0.15s;
}
.cta-btn--primary { background: var(--paper); color: var(--ink); }
.cta-btn--primary:hover { background: transparent; color: var(--paper); }
.cta-btn--secondary { background: transparent; color: rgba(255,255,255,0.85); border-color: rgba(255,255,255,0.4); }
.cta-btn--secondary:hover { border-color: var(--paper); color: var(--paper); }

/* ── Receipt animation ── */
.receipt-anim { display: flex; justify-content: center; padding: 2rem 0; }
.receipt-svg { width: 120px; }
.receipt-line { animation: draw-line 0.4s ease forwards; }
.receipt-line:nth-child(3) { animation-delay: 0.3s; }
.receipt-line:nth-child(4) { animation-delay: 0.6s; }
.receipt-line:nth-child(5) { animation-delay: 0.9s; }
.receipt-line--total { animation-delay: 1.2s; }
.receipt-check { animation: draw-check 0.5s ease forwards 1.5s; }
@keyframes draw-line { to { stroke-dashoffset: 0; } }
@keyframes draw-check { to { stroke-dashoffset: 0; } }

/* ── Utilities ── */
.font-mono { font-family: 'Space Mono', monospace; }
.label { font-family: 'Space Mono', monospace; font-size: 0.8125rem; font-weight: 400; letter-spacing: 0.15em; text-transform: uppercase; color: var(--ink-mid); }
.iris-text {
  background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe, #667eea);
  background-size: 200% auto;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: iris-shift 5s linear infinite;
  will-change: background-position;
}
.iris-stripe { animation: iris-shift 5s linear infinite; will-change: background-position; }
@keyframes iris-shift { 0% { background-position: 0% center; } 100% { background-position: -200% center; } }

/* ── Responsive ── */
@media (max-width: 1100px) {
  .modules-grid { grid-template-columns: repeat(2, 1fr); }
  .module-card:nth-child(4n) { border-right: 1px solid var(--ink); }
  .module-card:nth-child(2n) { border-right: none; }
  .module-card:nth-last-child(-n+4) { border-bottom: 1px solid var(--ink); }
  .module-card:nth-last-child(-n+2) { border-bottom: none; }
}
@media (max-width: 900px) {
  .steps-grid { grid-template-columns: repeat(2, 1fr); }
  .step-card:nth-child(2n) { border-right: none; }
  .step-card:nth-child(odd):not(:nth-child(2n)) { border-bottom: 1px solid var(--ink); }
  .step-card:nth-child(even):not(:last-child) { border-bottom: 1px solid var(--ink); }
  .cta-inner { grid-template-columns: 1fr; gap: 2.5rem; }
}
@media (max-width: 700px) {
  .specs-card-grid { grid-template-columns: 1fr; }
  .spec-card-new { border-right: none; border-bottom: 1px solid var(--ink); }
  .spec-card-new:last-child { border-bottom: none; }
  .spec-card-new:nth-last-child(-n+2) { border-bottom: 1px solid var(--ink); }
}
@media (max-width: 600px) {
  .modules-grid { grid-template-columns: 1fr; }
  .module-card { border-right: none; border-bottom: 1px solid var(--ink); }
  .module-card:last-child { border-bottom: none; }
  .steps-grid { grid-template-columns: 1fr; }
  .step-card { border-right: none; border-bottom: 1px solid var(--ink); }
  .step-card:last-child { border-bottom: none; }
}
/* ── Transaction Pipeline SVG ── */
.pipeline-wrap { margin-top: 3rem; }
.pipeline-box:nth-child(1) { animation: box-pulse 3s ease-in-out 0s infinite; }
.pipeline-box:nth-child(2) { animation: box-pulse 3s ease-in-out 0.6s infinite; }
.pipeline-box:nth-child(3) { animation: box-pulse 3s ease-in-out 1.2s infinite; }
.pipeline-box:nth-child(4) { animation: box-pulse 3s ease-in-out 1.8s infinite; }
.pipeline-box:nth-child(5) { animation: box-pulse 3s ease-in-out 2.4s infinite; }
@keyframes box-pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
.pipeline-arrow:nth-child(1) { animation: arrow-draw 1s ease 0.3s forwards; }
.pipeline-arrow:nth-child(2) { animation: arrow-draw 1s ease 0.6s forwards; }
.pipeline-arrow:nth-child(3) { animation: arrow-draw 1s ease 0.9s forwards; }
.pipeline-arrow:nth-child(4) { animation: arrow-draw 1s ease 1.2s forwards; }
@keyframes arrow-draw { to { stroke-dashoffset: 0; } }

@media (prefers-reduced-motion: reduce) {
  .iris-text, .iris-stripe { animation: none; }
  .receipt-line, .receipt-check { animation: none; stroke-dashoffset: 0; }
  .pipeline-box { animation: none; opacity: 1; }
  .pipeline-arrow { animation: none; stroke-dashoffset: 0; }
}

/* ── Widget Demo Section ── */
.widget-demo-section { border-bottom: 1px solid var(--ink); background: #fafafa; }
.widget-demo-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
}
.widget-demo-copy { display: flex; flex-direction: column; gap: 1.25rem; }
.widget-demo-sub {
  font-size: 1.0625rem; line-height: 1.65;
  color: var(--ink-mid); max-width: 44ch; margin: 0;
}
.widget-demo-bullets {
  list-style: none; margin: 0; padding: 0;
  display: flex; flex-direction: column; gap: 0.75rem;
  border-left: 2px solid #34d399; padding-left: 1.25rem;
}
.widget-demo-bullets li {
  font-family: 'Space Mono', monospace;
  font-size: 0.8125rem; line-height: 1.6;
  color: var(--ink-mid);
  display: flex; gap: 0.625rem; align-items: flex-start;
}
.wdb-bullet { color: #34d399; flex-shrink: 0; font-size: 0.75rem; margin-top: 2px; }
.widget-demo-frame { display: flex; justify-content: center; align-items: center; }

@media (max-width: 900px) {
  .widget-demo-inner { grid-template-columns: 1fr; gap: 2.5rem; }
}

/* ── New: Metrics Strip ── */
.section--metrics { background: var(--paper); border-bottom: 1px solid var(--ink); }
.metrics-strip {
  display: grid; grid-template-columns: repeat(4, 1fr);
  border: 1px solid #e5e7eb;
}
.ms-cell {
  padding: 2rem 1.5rem;
  border-right: 1px solid #e5e7eb;
  display: flex; flex-direction: column; gap: 0.4rem;
}
.ms-cell:last-child { border-right: none; }
.ms-value {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(2rem, 3.5vw, 2.75rem); font-weight: 900;
  line-height: 1; letter-spacing: -0.01em; text-transform: uppercase;
  margin: 0;
}
.ms-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--ink-muted); margin: 0;
}

/* ── New: Use Cases ── */
.usecases-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  border: 1px solid #e5e7eb; margin-top: 2.5rem;
}
.usecase-card {
  background: #0a0a0a; padding: 2rem 1.75rem;
  border-right: 1px solid #222;
  display: flex; flex-direction: column; gap: 1rem;
}
.usecase-card:last-child { border-right: none; }
.usecase-tag {
  display: inline-block;
  font-family: 'Space Mono', monospace; font-size: 0.625rem;
  letter-spacing: 0.12em; text-transform: uppercase;
  background: #34d399; color: #0a0a0a;
  padding: 0.2em 0.625em; align-self: flex-start;
}
.usecase-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.5rem; font-weight: 900; text-transform: uppercase;
  letter-spacing: -0.01em; line-height: 1; margin: 0;
  color: #fff;
}
.usecase-body {
  font-family: 'Space Mono', monospace;
  font-size: 0.8125rem; line-height: 1.65; margin: 0;
  color: rgba(255,255,255,0.7);
}

/* ── New: Build vs Buy ── */
.bvb-table-wrap { overflow-x: auto; margin-top: 2.5rem; }
.bvb-table { width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb; }
.bvb-th {
  font-family: 'Space Mono', monospace; font-size: 0.75rem;
  letter-spacing: 0.1em; text-transform: uppercase;
  padding: 0.875rem 1.25rem; text-align: left;
  border: 1px solid #e5e7eb; background: #fafafa;
}
.bvb-th--inhouse { color: #ef4444; }
.bvb-th--prodigy { color: #34d399; }
.bvb-row { border: 1px solid #e5e7eb; }
.bvb-td {
  padding: 0.875rem 1.25rem;
  border: 1px solid #e5e7eb;
  font-family: 'Space Mono', monospace; font-size: 0.8125rem;
  line-height: 1.5;
}
.bvb-td--feature {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.01em; color: var(--ink);
}
.bvb-td--inhouse { color: #ef4444; }
.bvb-td--prodigy { color: #34d399; font-weight: 700; }

@media (max-width: 900px) {
  .metrics-strip { grid-template-columns: repeat(2, 1fr); }
  .ms-cell:nth-child(2) { border-right: none; }
  .ms-cell:nth-child(1), .ms-cell:nth-child(2) { border-bottom: 1px solid #e5e7eb; }
  .usecases-grid { grid-template-columns: 1fr; }
  .usecase-card { border-right: none; border-bottom: 1px solid #222; }
  .usecase-card:last-child { border-bottom: none; }
}
@media (max-width: 600px) {
  .metrics-strip { grid-template-columns: 1fr; }
  .ms-cell { border-right: none; border-bottom: 1px solid #e5e7eb; }
  .ms-cell:last-child { border-bottom: none; }
  .ms-cell:nth-child(2) { border-right: none; }
}
</style>
