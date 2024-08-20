/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'smooth-expanding-20px': {
          '0%': { width: '0px', height: '0px' },
          '100%': { width: '21px', height: '21px' },
        },
        'smooth-shrinking-20px': {
          '0%': { width: '21px', height: '21px' },
          '100%': { width: '0px', height: '0px' },
        },
        'smooth-expanding-10px': {
          '0%': { width: '0px', height: '0px' },
          '100%': { width: '10px', height: '10px' },
        },
        'smooth-shrinking-10px': {
          '0%': { width: '10px', height: '10px' },
          '100%': { width: '0px', height: '0px' },
        },
      },
      animation: {
        'expand-20px': 'smooth-expanding-20px 0.1s forwards',
        'shrink-20px': 'smooth-shrinking-20px 0.1s forwards',
        'expand-10px': 'smooth-expanding-10px 0.1s forwards',
        'shrink-10px': 'smooth-shrinking-10px 0.1s forwards',
      },
    },
  },
  plugins: [],
}

