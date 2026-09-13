/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pengu: {
          50: '#fff5f8',
          100: '#ffeaf2',
          200: '#ffd4e5',
          300: '#ffb3d1',
          400: '#ff80b3',
          500: '#ff4d94',
          600: '#e62e7b',
          700: '#c2185b',
          800: '#9e144a',
          900: '#831441',
        },
        pastel: {
          purple: '#E8D5C4',
          lavender: '#E5D9F2',
          pink: '#F5E6E8',
          mint: '#D5ECC2',
          yellow: '#FFF5E4',
          sky: '#D0E8F2'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Outfit', 'sans-serif'],
        handwriting: ['Dancing Script', 'Caveat', 'cursive'],
        serif: ['Playfair Display', 'serif']
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        sparkle: {
          '0%, 100%': { transform: 'scale(0) rotate(0deg)', opacity: '0' },
          '50%': { transform: 'scale(1) rotate(180deg)', opacity: '1' },
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2s ease-in-out infinite',
        sparkle: 'sparkle 1.5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
