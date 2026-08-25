/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'haq-bone': '#F9F7F2',
        'haq-ink': '#1A1A1A',
        'haq-orange': '#F26522',
        'haq-red': '#BE1E2D',
        'haq-gold': '#FFD200',
        'haq-gold-dark': '#DAA520',
        'haq-cream': '#FFF8E7',
        'haq-brown': '#7A3E26',
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
