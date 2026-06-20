<template>
  <div class="theme-picker" role="radiogroup" aria-label="Choose landing page theme">
    <button
      v-for="theme in themes"
      :key="theme.id"
      class="theme-card"
      :class="{ active: currentTheme === theme.id }"
      @click="$emit('select', theme.id)"
      :aria-checked="currentTheme === theme.id"
      role="radio"
    >
      <div class="theme-preview" :style="theme.previewStyle">
        <div class="theme-preview-content" v-html="theme.previewHtml" />
      </div>
      <div class="theme-card-footer">
        <span
          class="theme-accent-dot"
          :style="{ background: theme.accent }"
          aria-hidden="true"
        />
        <span class="theme-name">{{ theme.name }}</span>
        <span class="theme-active-badge" v-if="currentTheme === theme.id">ACTIVE</span>
      </div>
      <p class="theme-desc">{{ theme.desc }}</p>
    </button>
  </div>
</template>

<script setup lang="ts">
interface Theme {
  id: string
  name: string
  desc: string
  previewStyle: Record<string, string>
  previewHtml: string
}

defineProps<{
  currentTheme: string
}>()

defineEmits<{
  (e: 'select', themeId: string): void
}>()

interface ThemeConfig extends Theme {
  accent: string
}

const themes: ThemeConfig[] = [
  {
    id: 'swiss',
    name: 'Swiss',
    desc: 'Clean precision. Mint green.',
    accent: '#34d399',
    previewStyle: { background: '#ffffff', borderBottom: '1px solid #e5e7eb' },
    previewHtml:
      '<div style="padding:12px"><div style="height:3px;background:#34d399;margin-bottom:8px;border-radius:1px"></div><div style="font-size:10px;font-weight:600;color:#111;letter-spacing:-0.01em">Prodigy</div><div style="margin-top:6px;height:4px;width:55%;background:#e5e7eb;border-radius:2px"></div></div>',
  },
  {
    id: 'crypto',
    name: 'Crypto',
    desc: 'Dark mode. Neon terminal.',
    accent: '#00ffb2',
    previewStyle: { background: '#0c1117' },
    previewHtml:
      '<div style="padding:12px"><div style="height:3px;background:#00ffb2;margin-bottom:8px;border-radius:1px;box-shadow:0 0 6px rgba(0,255,178,0.6)"></div><div style="font-size:9px;color:#00ffb2;font-family:monospace">BTC/EUR</div><div style="margin-top:5px;height:4px;width:60%;background:rgba(0,255,178,0.2);border-radius:2px"></div></div>',
  },
  {
    id: 'bold',
    name: 'Bold',
    desc: 'Black. Big. Electric blue.',
    accent: '#2563eb',
    previewStyle: { background: '#111111' },
    previewHtml:
      '<div style="padding:12px"><div style="height:3px;background:#2563eb;margin-bottom:8px;border-radius:1px"></div><div style="font-size:14px;font-weight:900;color:#fff;letter-spacing:-0.02em;line-height:1">PRODIGY</div><div style="margin-top:6px;height:4px;width:40%;background:rgba(37,99,235,0.3);border-radius:2px"></div></div>',
  },
  {
    id: 'fintech',
    name: 'Fintech',
    desc: 'Terminal amber. Enterprise.',
    accent: '#f59e0b',
    previewStyle: { background: '#0e1318' },
    previewHtml:
      '<div style="padding:12px;font-family:monospace"><div style="height:3px;background:#f59e0b;margin-bottom:8px;border-radius:1px"></div><div style="font-size:8px;color:#f59e0b">SETTLE RATE</div><div style="margin-top:4px;height:4px;width:70%;background:rgba(245,158,11,0.25);border-radius:2px"></div></div>',
  },
  {
    id: 'saas',
    name: 'SaaS',
    desc: 'Clean white. Indigo.',
    accent: '#6366f1',
    previewStyle: { background: '#ffffff', borderBottom: '1px solid #e5e7eb' },
    previewHtml:
      '<div style="padding:12px"><div style="height:3px;background:#6366f1;margin-bottom:8px;border-radius:1px"></div><div style="font-size:10px;font-weight:700;color:#6366f1">Prodigy</div><div style="margin-top:6px;height:4px;width:50%;background:#e0e7ff;border-radius:2px"></div></div>',
  },
  {
    id: 'gradient',
    name: 'Gradient',
    desc: 'Dark glass. Purple→pink.',
    accent: '#a855f7',
    previewStyle: { background: '#0f0a1e' },
    previewHtml:
      '<div style="padding:12px"><div style="height:3px;background:linear-gradient(90deg,#a855f7,#ec4899);margin-bottom:8px;border-radius:1px"></div><div style="font-size:9px;color:#c084fc;font-weight:700">PRODIGY</div><div style="margin-top:5px;height:4px;width:65%;background:rgba(168,85,247,0.2);border-radius:2px"></div></div>',
  },
]
</script>

<style scoped>
/* ── Container ── */
.theme-picker {
  display: flex;
  flex-direction: row;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
  /* hide scrollbar on webkit while keeping functionality */
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.15) transparent;
}

.theme-picker::-webkit-scrollbar {
  height: 4px;
}
.theme-picker::-webkit-scrollbar-track {
  background: transparent;
}
.theme-picker::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
}

/* ── Card ── */
.theme-card {
  flex-shrink: 0;
  width: 140px;
  height: 180px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  overflow: hidden;
  padding: 0;
  transition: transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
  text-align: left;
}

.theme-card:hover:not(.active) {
  transform: translateY(-3px);
  border-color: rgba(255, 255, 255, 0.35);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.theme-card.active {
  border: 2px solid #0ea5e9;
  box-shadow: 0 4px 16px rgba(14, 165, 233, 0.25);
}

/* ── Preview area ── */
.theme-preview {
  width: 100%;
  height: 90px;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;
}

.theme-preview-content {
  width: 100%;
  height: 100%;
}

/* ── Accent dot ── */
.theme-accent-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.theme-card:hover .theme-accent-dot,
.theme-card.active .theme-accent-dot {
  transform: scale(1.3);
  box-shadow: 0 0 6px currentColor;
}

/* ── Footer: name + badge ── */
.theme-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px 0;
  gap: 5px;
}

.theme-name {
  font-size: 11px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;
}

.theme-active-badge {
  font-size: 8px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: #0ea5e9;
  color: #ffffff;
  padding: 2px 5px;
  border-radius: 3px;
  white-space: nowrap;
}

/* ── Description ── */
.theme-desc {
  font-size: 9px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.4;
  margin: 4px 8px 8px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* ── Mobile: ensure horizontal scroll works well ── */
@media (max-width: 768px) {
  .theme-picker {
    gap: 10px;
  }

  .theme-card {
    width: 130px;
    height: 170px;
  }
}
</style>
