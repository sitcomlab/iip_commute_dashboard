/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#005B79',
          50: '#E9F5FF',
          100: '#C0E5FF',
          200: '#6FC9FF',
          300: '#1DB3FF',
          400: '#0090CB',
          500: '#005B79',
          600: '#005065',
          700: '#004350',
          800: '#00353C',
          900: '#002427',
        },
        secondary: {
          DEFAULT: '#AAB315',
          50: '#D5ED65',
          100: '#D3EB57',
          200: '#D0E83C',
          300: '#CFE520',
          400: '#BFCE18',
          500: '#AAB315',
          600: '#8B8E11',
          700: '#6A6A0C',
          800: '#454408',
          900: '#211F04',
        },
      },
    },
  },
  plugins: [],
}
