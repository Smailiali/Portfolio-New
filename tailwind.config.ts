import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#111111',
        'surface-2': '#1a1a1a',
        accent: '#00e5ff',
        'accent-dim': '#00b8cc',
        amber: '#ffb300',
        'text-primary': '#e8e8e8',
        'text-secondary': '#888888',
        'text-muted': '#444444',
        border: '#222222',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
        sans: ['Satoshi', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'fluid-xl': 'clamp(2.5rem, 8vw, 6rem)',
        'fluid-lg': 'clamp(1.75rem, 4vw, 3rem)',
        'fluid-md': 'clamp(1.25rem, 2.5vw, 1.75rem)',
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan-line': 'scanLine 8s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 8px #00e5ff40' },
          '50%': { boxShadow: '0 0 20px #00e5ff80, 0 0 40px #00e5ff30' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(0, 229, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 229, 255, 0.03) 1px, transparent 1px)`,
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
    },
  },
  plugins: [],
}
export default config
