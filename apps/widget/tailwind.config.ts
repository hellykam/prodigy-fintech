import type { Config } from 'tailwindcss'
import uiPreset from '@prodigy/ui/tailwind.preset'

export default {
  presets: [uiPreset],
  content: [
    './index.html',
    './src/**/*.{vue,ts,tsx}',
    '../../packages/ui/src/**/*.{vue,ts,tsx}',
  ],
} satisfies Config
