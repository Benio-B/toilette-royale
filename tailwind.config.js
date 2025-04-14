/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'confetti': 'confetti 2s ease-out forwards',
      },
      keyframes: {
        confetti: {
          '0%': {
            transform: 'scale(0)',
            opacity: 1,
          },
          '100%': {
            transform: 'scale(2)',
            opacity: 0,
          },
        },
      },
    },
  },
  plugins: [],
};