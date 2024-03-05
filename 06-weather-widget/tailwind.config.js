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
        'clampBig': 'clamp(2rem, 0.5882rem + 6.2745vw, 3rem)',
        'clampMediumLg': 'clamp(1.25rem, 0.3676rem + 3.9216vw, 1.875rem)',
        'clampMedium': 'clamp(1rem, 0.2941rem + 3.1373vw, 1.5rem)',
        'clampMediumSm': 'clamp(0.75rem, 0.3971rem + 1.5686vw, 1rem)',
        'clampSmall': 'clamp(1rem, 1.5294rem + -2.3529vw, 0.625rem)',
      }
    }
  },
  plugins: []
};