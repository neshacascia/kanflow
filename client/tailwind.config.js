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
        borderGrey: 'rgba(130, 143, 163, 0.25)',
        deleteRed: '#EA5555',
      },
      fontFamily: {
        body: ['Plus Jakarta Sans'],
      },
      boxShadow: {
        task: '0px 4px 6px 0px rgba(54, 78, 126, 0.10)',
        settings: '0px 5px 5px 0px rgba(54, 78, 126, 0.15)',
      },
    },
  },
  plugins: [],
};
