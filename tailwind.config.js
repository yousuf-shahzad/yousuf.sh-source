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
    zIndex: {
      '0': 0,
      '10': 10,
      '20': 20,
      '30': 30,
      '40': 40,
      '50': 50,
      'auto': 'auto',
      '60': 60,
      '70': 70,
      '80': 80,
      '90': 90,
      '100': 100  
    },
  },
  plugins: [],
}