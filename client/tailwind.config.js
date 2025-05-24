/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#006da3',
        secondary: '#13b6f6',
        light: '#F6F5F4',
        lightYellow: '#F0E442',
        darkGray: '#545454',
        dark: '#040710',
        neutral: '#c2c2c2',
        white: '#F4F3F2',
      },
      fontWeight: {
        regular: 400,
        semibold: 700,
      },
      fontFamily: {
        primary: ['Poppins', 'sans-serif'],
        secondary: ['Oldenburg', 'serif'],
      },
      animation: {
        ping: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        'spin-slow': 'spin 2500ms linear infinite',
      },
      animationDelay: {
        300: '300ms',
        600: '600ms',
      },
    },
  },
  plugins: [],
};
