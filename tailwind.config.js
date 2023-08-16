/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        bold: ['axiforma-bold'],
        black: ['axiforma-black'],
        medium: ['axiforma-medium'],
        semibold: ['axiforma-semibold'],
        regular: ['axiforma-regular']
      }
    },
  },
  plugins: [],
}
