/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'bg-light': '#334155',
        'bg-main': '#1E293B',
        'text-main': '#F8FAFC',
        'text-secondary': '#94A3B8',
        'text-invert': 'rgba(30, 41, 59, 1)',
        'ingredients': '#3D3E33',
        'directions': '#1C3C55',
      },
      height: {
        '43': '43rem',
      }
    }
  },
  plugins: []
};