/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Dark surfaces — 4-level depth system
        surface: {
          base:    '#080B10', // page background
          raised:  '#0D1219', // section backgrounds
          card:    '#111821', // card background
          overlay: '#16202C', // modals/tooltips
        },
        // Borders
        border: {
          DEFAULT: '#1D2935',
          subtle:  '#151E28',
          strong:  '#243040',
        },
        // Text
        content: {
          primary:   '#F3F5F7',
          secondary: '#9AA6B2',
          muted:     '#5C6B7A',
        },
        // Accent — teal only
        teal: {
          DEFAULT: '#2DD4BF',
          dim:     '#1A8A7A',
          glow:    'rgba(45,212,191,0.12)',
          ring:    'rgba(45,212,191,0.25)',
        },
        // Legacy compat
        accent: {
          teal: '#2DD4BF',
          blue: '#2563eb',
        },
        primary: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        sans:  ['Inter', 'system-ui', 'sans-serif'],
        mono:  ['"Fira Code"', 'ui-monospace', 'monospace'],
        serif: ['Inter', 'sans-serif'], // override – no Playfair
      },
      animation: {
        'fade-up':     'fadeUp 0.6s ease both',
        'grid-drift':  'gridDrift 20s linear infinite',
        'orb-drift':   'orbDrift 12s ease-in-out infinite',
        'particle':    'particleDrift 15s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gridDrift: {
          '0%':   { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '60px 60px' },
        },
        orbDrift: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '50%':      { transform: 'translate(30px,-20px) scale(1.05)' },
        },
        particleDrift: {
          '0%':   { transform: 'translateY(100vh)', opacity: '0' },
          '10%':  { opacity: '1' },
          '90%':  { opacity: '0.5' },
          '100%': { transform: 'translateY(-20px)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
