/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Barlow Condensed', 'Impact', 'Arial Narrow', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'JetBrains Mono', 'Courier New', 'monospace'],
      },
      colors: {
        paper: '#ffffff',
        ink: '#0a0a0a',
        'ink-mid': '#3d3d3d',
        'ink-muted': '#8a8a8a',
        'ink-faint': '#e8e8e8',
        line: '#d0d0d0',
      },
      fontSize: {
        '2xs': '0.625rem',
        hero: 'clamp(3.5rem, 8vw, 7rem)',
        display: 'clamp(5rem, 12vw, 10rem)',
      },
      letterSpacing: {
        tightest: '-0.04em',
        tight2: '-0.02em',
        widest2: '0.2em',
        receipt: '0.05em',
      },
      borderWidth: {
        DEFAULT: '1px',
        '0.5': '0.5px',
      },
      animation: {
        'ticker': 'ticker 28s linear infinite',
        'iris': 'iris 6s linear infinite',
        'fade-in': 'fade-in 0.4s ease forwards',
        'stamp': 'stamp 0.3s cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards',
        'print': 'print 0.5s ease forwards',
        'signal': 'signal 2s ease-in-out infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        iris: {
          '0%': { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        stamp: {
          '0%': { transform: 'scale(1.4) rotate(-8deg)', opacity: '0' },
          '60%': { transform: 'scale(0.95) rotate(1deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        print: {
          '0%': { opacity: '0', transform: 'translateY(-2px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        signal: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
