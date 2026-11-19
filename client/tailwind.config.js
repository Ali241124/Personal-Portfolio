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
        violet: { DEFAULT: '#8b5cf6', dim: '#6d28d9', dark: '#4c1d95' },
        cyan:   { DEFAULT: '#22d3ee', dim: '#0891b2' },
        bg:     { DEFAULT: '#0a0a12', secondary: '#0f0f1a' },
        surface: { DEFAULT: '#12121f', high: '#1a1a2e', hover: '#1e1e35' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
      }
    },
  },
  plugins: [],
}
