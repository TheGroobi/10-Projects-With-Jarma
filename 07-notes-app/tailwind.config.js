/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'bg-main': 'rgba(30, 41, 59, 1)',
        'bg-secondary': 'rgba(51, 65, 85, 1)',
        'bg-secondaryHov': 'rgba(60, 75, 95, 1)',
        'brand': 'rgba(20, 184, 166, 1)',
        'brandHov': 'rgba(40, 200, 180, 1)',
        'text-gray': 'rgba(148, 163, 184, 1)',
        'text-white': 'rgba(248, 250, 252, 1)',
      },
      fontSize: {
        'clampHuge': 'clamp(2.5rem, 2.1250rem + 1.6667vw, 3rem)',
        'clampBig': 'clamp(1.5rem, 1.0000rem + 1.6667vw, 1.875rem)',
        'clampMedium': 'clamp(0.875rem, 0.2500rem + 1.6667vw, 1.125rem)',
      }
    }
  },
  plugins: []
};