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
        primary: {
          50: '#f5faff',
          100: '#e0f5ff',
          200: '#b3e6ff',
          300: '#80d4ff',
          400: '#4dc2ff',
          500: '#1ab0ff', // accent-blue
          600: '#008fcc',
          700: '#006699',
          800: '#004366',
          900: '#002133',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        accent: {
          blue: '#00d4ff',
          purple: '#7c3aed',
          teal: '#14b8a6',
        },
      },
    },
  },
  plugins: [],
}

