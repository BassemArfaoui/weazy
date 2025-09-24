/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const messageUtility = {
        '.user-msg': {
          backgroundColor: 'rgb(239, 68, 68)', // bg-red-500
          color: '#000000', // text-white
          borderRadius: '0.375rem', // rounded-md
          padding: '1rem',
          margin: '0.5rem 0',
          display: 'inline-block',
        },
      };
      addUtilities(messageUtility, ['responsive', 'hover']);
    },
  ],
};