/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        assistant: ['Assistant', 'sans-serif'],
      },
      colors: {
        nature: {
          green: '#80b066',    // Updated to 400
          brown: '#8B6548',    // Updated to 400
          cream: '#FAF9F6',    // Cream White
          beige: '#EDE6DB',    // Light Beige
          forest: '#3E6538',   // Updated to 500
          gray: '#F1F1F1',     // Light Gray
          charcoal: '#333333', // Dark Charcoal
          'green-light': '#99c485',
          'green-dark': '#679c47',
          'brown-light': '#a47e64',
          'brown-dark': '#724c2c',
        },
        gradient: {
          start: '#80b066',    // Updated to 400
          middle: '#8B6548',   // Updated to 400
          end: '#3E6538',      // Updated to 500
        },
      },
      fontSize: {
        'display': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h1': ['2.25rem', { lineHeight: '1.3', fontWeight: '700' }],
        'h2': ['1.8rem', { lineHeight: '1.4', fontWeight: '700' }],
        'h3': ['1.5rem', { lineHeight: '1.5', fontWeight: '600' }],
        'h4': ['1.25rem', { lineHeight: '1.5', fontWeight: '600' }],
        'body': ['1.2rem', { lineHeight: '1.6', fontWeight: '400' }],
        'small': ['1rem', { lineHeight: '1.5', fontWeight: '400' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      gridTemplateColumns: {
        'fluid': 'repeat(auto-fit, minmax(min(100%, 20rem), 1fr))',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      textShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.1)',
        'md': '0 2px 4px rgba(0, 0, 0, 0.12)',
        'lg': '0 4px 8px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}