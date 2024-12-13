/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
export default {
  content: [],
  purge: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  darkMode: false,
  theme: {
    extend: {
    },
  },
  plugins: ['@tailwindcss/forms'],
}
