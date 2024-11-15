/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#006da3",
        secondary:"#13b6f6",
        light: "#F6F5F4",
        darkGray:"#545454",
        dark: "#040710",
        neutral: "#c2c2c2",
        white:"#F4F3F2"
      },
      fontWeight: {
        regular: 400,
        semibold:700
      }
    },
  },
  plugins: [],
}

