/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkGrey: '#2B2C37',
        mainPurple: '#635FC7',
        mediumGrey: '#828FA3',
        veryDarkGrey: '#20212C',
        borderGrey: 'rgba(130, 143, 163, 0.25)',
        deleteRed: '#EA5555',
        mainPurpleHover: '#A8A4FF',
        redHover: '#FF9898',
        linesDark: '#3E3F4E',
        column: 'rgba(43, 44, 55, 0.13)',
        lightBlack: '#000112',
        lightGrey: '#F4F7FD',
        lightCheckbox: 'rgba(130, 143, 163, 0.25)',
        lightPurple: 'rgba(99, 95, 199, 0.10)',
      },
      fontFamily: {
        body: ['Plus Jakarta Sans'],
      },
      borderRadius: {
        menuLink: '0px 100px 100px 0px;',
      },
      boxShadow: {
        glow: '0px 10px 20px 0px rgba(54, 78, 126, 0.10)',
        lightTask: '0px 4px 6px 0px rgba(54, 78, 126, 0.10)',
        lightSettings: '0px 10px 20px 0px rgba(54, 78, 126, 0.25)',
      },
    },
  },
  plugins: [],
};
