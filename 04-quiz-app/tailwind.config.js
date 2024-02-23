/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      'display': ['Inter, sans-serif']
    },
    extend: {
      'colors': {
        'text': '#1E293B',
        'bgSecondary': '#F1F5F9',
        'stroke': '#CBD5E1',
        'text2': '#64748B'
      },
      'spacing': {
        '94': '23.5rem'
      },
      'animation': {
        'text':'text 5s ease infinite',
      },
      'keyframes': {
          'text': {
              '0%, 100%': {
                 'background-size':'200% 200%',
                  'background-position': 'left center'
              },
              '50%': {
                 'background-size':'200% 200%',
                  'background-position': 'right center'
              }
          },
      }
    }
  },
  plugins: []
};