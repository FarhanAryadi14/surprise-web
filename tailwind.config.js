/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: '#FFE5EC',
          rose: '#FFB3C6',
          lavender: '#E8DFF5',
          purple: '#D0BEE5',
          peach: '#FFE8D6',
          gold: '#FCE181',
          cream: '#FFF9F5',
        },
        romantic: {
          dark: '#2D1B2D',
          accent: '#FF6B8B',
          glow: '#FF8DA1',
        }
      },
      fontFamily: {
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
        handwriting: ['Caveat', 'Dancing Script', 'cursive'],
      },
      animation: {
        'flicker': 'flicker 1.5s infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1', transform: 'scale(1) rotate(-1deg)' },
          '50%': { opacity: '0.85', transform: 'scale(0.96) rotate(1deg)' },
          '75%': { opacity: '0.9', transform: 'scale(1.03) rotate(-0.5deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}
