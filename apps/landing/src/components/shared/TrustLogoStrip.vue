<script setup lang="ts">
export interface Logo {
  name: string
  svgContent?: string
  initials?: string
  url?: string
}

const props = withDefaults(defineProps<{
  logos?: Logo[]
  marquee?: boolean
  label?: string
}>(), {
  logos: () => [
    { name: 'Sumsub',    initials: 'Su' },
    { name: 'Visa',      initials: 'Vi' },
    { name: 'Mastercard',initials: 'Mc' },
    { name: 'SEPA',      initials: 'SE' },
    { name: 'PCI DSS',   initials: 'PC' },
    { name: 'ISO 27001', initials: 'IS' },
    { name: 'SOC 2',     initials: 'SO' },
    { name: 'MiCA',      initials: 'Mi' },
  ],
  marquee: false,
  label: undefined,
})

// For marquee: duplicate list for seamless loop
const displayLogos = props.marquee ? [...props.logos, ...props.logos] : props.logos
</script>

<template>
  <div class="trust-logo-strip" :class="{ 'strip-marquee': marquee }">
    <p v-if="label" class="trust-strip-label">{{ label }}</p>
    <!-- Marquee mode -->
    <div v-if="marquee" class="marquee-outer" aria-label="Partner and compliance logos">
      <div class="marquee-track" aria-hidden="true">
        <a
          v-for="(logo, i) in displayLogos"
          :key="i"
          :href="logo.url ?? undefined"
          :target="logo.url ? '_blank' : undefined"
          :rel="logo.url ? 'noopener noreferrer' : undefined"
          class="logo-item"
          :aria-label="logo.name"
          :tabindex="i >= logos.length ? -1 : 0"
        >
          <span v-if="logo.svgContent" class="logo-svg" v-html="logo.svgContent" />
          <span v-else class="logo-initials">{{ logo.initials ?? logo.name.slice(0, 2).toUpperCase() }}</span>
        </a>
      </div>
    </div>

    <!-- Static mode -->
    <div v-else class="static-track" role="list" aria-label="Partner and compliance logos">
      <a
        v-for="(logo, i) in logos"
        :key="i"
        :href="logo.url ?? undefined"
        :target="logo.url ? '_blank' : undefined"
        :rel="logo.url ? 'noopener noreferrer' : undefined"
        class="logo-item"
        :aria-label="logo.name"
        role="listitem"
      >
        <span v-if="logo.svgContent" class="logo-svg" v-html="logo.svgContent" />
        <span v-else class="logo-initials">{{ logo.initials ?? logo.name.slice(0, 2).toUpperCase() }}</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.trust-strip-label {
  font-size: 0.8125rem;
  text-align: center;
  opacity: 0.65;
  margin: 0 0 1rem;
  letter-spacing: 0.04em;
}

.trust-logo-strip {
  width: 100%;
}

/* ── Static layout ── */
.static-track {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
}

/* ── Marquee layout ── */
.marquee-outer {
  overflow: hidden;
}

.marquee-track {
  display: flex;
  gap: 40px;
  width: max-content;
  animation: marquee 30s linear infinite;
}

.marquee-outer:hover .marquee-track {
  animation-play-state: paused;
}

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

/* ── Logo item ── */
.logo-item {
  width: 80px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  text-decoration: none;
  filter: grayscale(100%);
  opacity: 0.5;
  transition: filter 0.25s, opacity 0.25s;
}

.logo-item:hover,
.logo-item:focus-visible {
  filter: grayscale(0%);
  opacity: 1;
}

.logo-item:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
  border-radius: 2px;
}

.logo-initials {
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.05em;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  padding: 4px 10px;
  color: #444;
  font-family: 'Space Mono', monospace;
  white-space: nowrap;
}

.logo-svg {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  max-height: 100%;
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
}
</style>
