/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
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
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
        'rubik-italic': ['Rubik Italic', 'sans-serif'],
      },
      height: {
        '100dvh': '100dvh',
        '98vh': '98vh',
      },
      animation: {
        'slide-right': 'slideRight 0.8s linear both',
        'slide-left': 'slideLeft 0.7s linear both',
        'slide-down': 'slideDown 0.5s linear both',
        'slide-up': 'slideUp 0.5s linear both',
        'open-navmenu': 'openNavMenu 0.55s linear both',
        'close-navmenu': 'closeNavMenu 0.7s linear both',
      },
      keyframes: {
        slideRight: {
          '0%': { left: '0px' },
          '100%': { left: '38%' },
        },
        slideLeft: {
          '0%': { left: '38%' },
          '100%': { left: '0px' },
        },
        slideDown: {
          '0%': { bottom: '0px' },
          '100%': { bottom: '-90px' },
        },
        slideUp: {
          '0%': { bottom: '-90px' },
          '100%': { bottom: '0px' },
        },
        openNavMenu: {
          '0%': {
            zIndex: '991',
            left: '-100%',
          },
          '100%': {
            zIndex: '991',
            left: '0',
          },
        },
        closeNavMenu: {
          '0%': {
            left: '0',
            zIndex: '991',
          },
          '100%': {
            left: '-100%',
            zIndex: '1',
            display: 'none',
          },
        },
      },
    },
  },
  plugins: [
    require('autoprefixer'),
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-custom::-webkit-scrollbar': {
          width: '4px',
        },
        '.scrollbar-custom::-webkit-scrollbar-thumb': {
          borderRadius: '5px',
          backgroundColor: 'rgba(42, 37, 43, 0.23)',
        },
        '.custom-h-full': {
          '@supports (height: 100dvh)': {
            height: '100dvh',
          },
          '@supports not (height: 100dvh)': {
            height: '98vh',
          },
        },
      }, ['responsive']);
    },
  ],
};

// @type {import('tailwindcss').Config} 
// module.exports = {
//   content: [
//     // Example content paths...
//     './public/**/*.html',
//     './src/**/*.{js,jsx,ts,tsx,vue}',
//   ],

//   theme: {
//     extend: {
//       colors: {
//         'custom-pink': '#FCB6D8',
//         'custom-white': '#FBFAFA',
//         'custom-black': '#2A252B',
//         'custom-blue': '#4DA8D5',
//         'custom-brown': '#BF795E',
//         'custom-gray': '#2a252b3a',
//       },
//       backgroundColor: {
//         'custom-pink': '#FCB6D8',
//         'custom-white': '#FBFAFA',
//         'custom-black': '#2A252B',
//         'custom-blue': '#4DA8D5',
//         'custom-brown': '#BF795E',
//         'custom-gray': '#2a252bc0',
//       },
//       animation: {
//         'slide-right': 'slideRight 0.8s linear both',
//         'slide-left': 'slideLeft 0.7s linear both',
//         'slide-down': 'slideDown 0.5s linear both',
//         'slide-up': 'slideUp 0.5s linear both',
//       },
//       keyframes: {
//         slideRight: {
//           '0%': { left: 0 },
//           '100%': { left: '38%' },
//         },
//         slideLeft: {
//           '0%': { left: '38%' },
//           '100%': { left: 0 },
//         },
//         slideDown: {
//           '0%': { bottom: '0px' },
//           '100%': { bottom: '-90px' },
//         },
//         slideUp: {
//           '0%': { bottom: '-90px' },
//           '100%': { bottom: '0px' },
//         },
//       }
//     },
//   },
//   plugins: [
//     require('tailwindcss'),
//     require('autoprefixer'),
//     function ({ addUtilities }) {
//       addUtilities({
//         '.nth-child-4': {
//           '&:nth-child(4)': {
//             // استایل‌ها برای اولین عنصر
//           },
//         },
//         '.nth-child-7': {
//           '&:nth-child(7)': {
//             // استایل‌ها برای دومین عنصر
//           },
//         },
//         '.nth-child-8': {
//           '&:nth-child(8)': {
//             // استایل‌ها برای سومین عنصر
//           },
//         },
//         // اضافه کردن مقادیر بیشتر بر حسب نیاز
//       }, ['responsive']);
//     },
//   ],
// }