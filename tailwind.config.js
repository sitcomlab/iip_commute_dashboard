/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        screens: {
          '2xl': '1920px',
        },
      },
      borderRadius: {
        KD: '3rem',
      },
      colors: {
        primary: {
          DEFAULT: '#005b79',
          light: '#f1f5fd',
        },
        secondary: {
          DEFAULT: '#aab315',
        },
        climate: {
          DEFAULT: '#14b3d9',
          light: '#ecf8fb',
        },
        mobility: {
          DEFAULT: '#34c17b',
          light: '#f5fcf8',
        },
        energy: {
          DEFAULT: '#f28443',
          light: '#fdf2ec',
        },
        buildings: {
          DEFAULT: '#6060d6',
          light: '#f2f2fa',
        },
      },
    },
  },
}
