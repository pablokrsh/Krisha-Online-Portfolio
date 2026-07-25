/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#081A0D',
          900: '#102F15',
          800: '#1A4322',
          700: '#2E5A37',
        },
        sage: {
          600: '#728C5A',
          500: '#8CA672',
          400: '#A9C08F',
        },
        lime: {
          300: '#EAF1B1',
          200: '#F3F7D2',
        },
        mint: {
          100: '#EBFADC',
          50: '#F7FFF1',
        },
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      borderRadius: {
        'sm': '12px',
        'md': '18px',
        'lg': '28px',
      },
      boxShadow: {
        'card': '0 15px 40px rgba(16,47,21,.15)',
        'card-hover': '0 25px 60px rgba(16,47,21,.25)',
        'avatar': '0 20px 50px rgba(16,47,21,.25)',
      },
      maxWidth: {
        'container': '1200px',
      },
    },
  },
  plugins: [],
}
