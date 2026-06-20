import type { Config } from 'tailwindcss'

// Shared design token preset. All apps extend this.
// Colors use CSS custom properties so themes can override at runtime.
const preset: Partial<Config> = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand — primary product color
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        // Surface — backgrounds
        surface: {
          DEFAULT: '#ffffff',
          subtle: '#f8fafc',
          muted: '#f1f5f9',
          elevated: '#ffffff',
          overlay: 'rgba(0,0,0,0.5)',
        },
        // Semantic
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
          900: '#14532d',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
          900: '#78350f',
        },
        danger: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
          900: '#7f1d1d',
        },
        info: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
      },
      boxShadow: {
        panel: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        card: '0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.07)',
        'side-panel': '4px 0 24px -4px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
}

export default preset
