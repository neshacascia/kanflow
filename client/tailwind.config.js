/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        darkGrey: '#2B2C37',
        mainPurple: '#635FC7',
        mediumGrey: '#828FA3',
        veryDarkGrey: '#20212C',
      },
      fontFamily: {
        body: ['Plus Jakarta Sans'],
      },
    },
  },
  plugins: [],
};
