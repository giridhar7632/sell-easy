/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F4DE4D',
      },
      screens: {
        xl: '1440px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
