/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'bg-main': 'rgba(30, 41, 59, 1)',
        'bg-secondary': 'rgba(51, 65, 85, 1)',
        'text-gray': 'rgba(148, 163, 184, 1)',
        'text-white': 'rgba(248, 250, 252, 1)',
      },
      fontSize: {
        'clampBig': 'clamp(2rem, 0.3333rem + 2.2222vw, 3rem)',
        'clampBigSmall': 'clamp(1rem, -0.8000rem + 6.4000vw, 2rem)',
        'clampMedium': 'clamp(0.75rem, 0.3333rem + 0.5556vw, 1rem)',
        'clampMediumSmall': 'clamp(0.5rem, 0.0500rem + 1.6000vw, 0.75rem)',
        'clampSmall': 'clamp(0.6125rem, 0.1750rem + 0.5833vw, 0.875rem)',
        'clampSmallSmall': 'clamp(0.375rem, -0.0525rem + 1.5200vw, 0.6125rem)',
      },
      screens: {
        '3xl': '1400px',
      }
    }
  },
  plugins: []
};