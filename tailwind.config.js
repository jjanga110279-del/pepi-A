/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#9c3f00",
        secondary: "#fafafa",
      },
      fontFamily: {
        logo: ["Plus Jakarta Sans", "Pretendard Variable", "sans-serif"],
        serif: ["Pretendard Variable", "Pretendard", "serif"],
        sans: ["Pretendard Variable", "Pretendard", "sans-serif"],
        hei: ["Pretendard Variable", "Pretendard", "sans-serif"],
      },
    },
  },
  plugins: [],
}
