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
        serif: ["Liberation Serif", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "Noto Sans KR", "sans-serif"],
        hei: ["WenQuanYi Zen Hei", "sans-serif"],
      },
    },
  },
  plugins: [],
}
