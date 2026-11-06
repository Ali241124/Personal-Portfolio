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
        surface: {
          base:    '#090D16',
          raised:  '#0F1626',
          card:    'rgba(18, 25, 40, 0.75)',
          overlay: '#192338',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          subtle:  'rgba(255, 255, 255, 0.04)',
          strong:  'rgba(99, 102, 241, 0.3)',
        },
        accent: {
          DEFAULT: '#6366F1',
          cyan:    '#06B6D4',
          indigo:  '#6366F1',
          dim:     '#4F46E5',
          glow:    'rgba(99, 102, 241, 0.15)',
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
          950: '#090D16',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
