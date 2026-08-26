/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'haq-green-dark': '#0F5132',
        'haq-green': '#16A34A',
        'haq-green-light': '#E8F5E9',
        'haq-sage': '#F4F8F4',
        'haq-pine': '#0C1E15',
        'haq-white': '#FFFFFF',
        'haq-cream': '#F4F8F4',
        'haq-soft': '#EBF3EC',
        'haq-dark': '#0C1E15',
        'haq-charcoal': '#0C1E15',
        'haq-ink': '#11261B',
        'haq-deep-black': '#0C1E15',
        'haq-bone': '#F4F8F4',
        'haq-red': '#0F5132',
        'haq-gold': '#C89B3C',
        'haq-yellow': '#C89B3C',
        'haq-text-primary': '#11261B',
        'haq-text-secondary': '#52665A',
        'haq-border': '#D8E5DA',
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', '"Be Vietnam Pro"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"Be Vietnam Pro"', '"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Plus Jakarta Sans"', 'ui-monospace', 'monospace'],
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
