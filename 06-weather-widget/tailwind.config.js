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
        'clampBig': 'clamp(1rem, 0.2357rem + 3.3970vw, 3rem)',
        'clampMediumLg': 'clamp(0.75rem, 0.2723rem + 2.1231vw, 2rem)',
        'clampMediumSm': 'clamp(0.5rem, 0.1178rem + 1.6985vw, 1.5rem)',
        'clampSmall': 'clamp(0.25rem, 0.3089rem + 0.8493vw, 1rem)',
      }
    }
  },
  plugins: []
};