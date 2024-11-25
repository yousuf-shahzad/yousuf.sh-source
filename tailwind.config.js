/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-bg': '#F4F4F4',
        'brand-text': '#1A1A1A',
        'brand-accent': '#000000',
        'brand-secondary': '#E0E0E0'
      }
    },
    letterSpacing: {
      '1': '0em',
      '2': '0.025em',
      '3': '0.05em',
      '4': '0.1em',
      '5': '0.25em'
    },
  },
  plugins: [],
}