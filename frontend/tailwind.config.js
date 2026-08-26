/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'haq-cream': '#F5F1E8',
        'haq-soft': '#ECE7DC',
        'haq-white': '#FFFFFF',
        'haq-dark': '#191919',
        'haq-charcoal': '#191919',
        'haq-ink': '#191919',
        'haq-deep-black': '#191919',
        'haq-bone': '#F5F1E8',
        'haq-red': '#C92332',
        'haq-gold': '#D9A900',
        'haq-yellow': '#D9A900',
        'haq-text-primary': '#191919',
        'haq-text-secondary': '#666666',
        'haq-border': '#DED8CC',
      },
      fontFamily: {
        heading: ['"Manrope"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        'site': '1400px',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        ticker: 'ticker 40s linear infinite',
      },
    },
  },
  plugins: [],
}
