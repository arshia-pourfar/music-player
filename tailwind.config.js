/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-pink': '#FCB6D8',
        'custom-white': '#FBFAFA',
        'custom-black': '#2A252B',
        'custom-blue': '#4DA8D5',
        'custom-brown': '#BF795E',
        'custom-gray': '#2a252b3a',
      },
      backgroundColor: {
        'custom-pink': '#FCB6D8',
        'custom-white': '#FBFAFA',
        'custom-black': '#2A252B',
        'custom-blue': '#4DA8D5',
        'custom-brown': '#BF795E',
        'custom-gray': '#2a252bc0',
      },
      animation: {
        'slide-right': 'slideRight 0.8s linear both',
        'slide-left': 'slideLeft 0.8s linear both',
      },
      keyframes: {
        slideRight: {
          '0%': { left: 0 },
          '100%': { left: '38%' },
        },
        slideLeft: {
          '0%': { left: '38%' },
          '100%': { left: 0 },
        }
      }
    },
  },
  plugins: [],
}