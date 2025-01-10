/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bug: "#de524e",
        feature: "#4ca772",
        support: "#33adff",
        technical: "#e3b740",
      }
    },
  },
  plugins: [],
}

