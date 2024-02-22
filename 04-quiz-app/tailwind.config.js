/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      'display': ['Inter, sans-serif']
    },
    extend: {
      colors: {
        'text': '#1E293B',
        'bgSecondary': '#F1F5F9',
        'stroke': '#CBD5E1',
        'text2': '#64748B'
      },
      spacing: {

      }
    }
  },
  plugins: []
};