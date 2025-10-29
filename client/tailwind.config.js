/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#faf7f5',
          100: '#f5ede7',
          200: '#e8d5c4',
          300: '#dbbda1',
          400: '#c18d5b',
          500: '#a76f3f',
          600: '#8b5a33',
          700: '#6f4728',
          800: '#4a2f1c',
          900: '#2d1d11',
        },
        cream: {
          50: '#fefdfb',
          100: '#fdfaf5',
          200: '#faf5eb',
          300: '#f5ede0',
          400: '#ebe0cc',
          500: '#d4c4a8',
          600: '#b8a68a',
          700: '#9c896c',
          800: '#6d6049',
          900: '#453d2f',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
