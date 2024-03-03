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
      }
    }
  },
  plugins: []
};