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
        darkBug: "#BA3B37FF",
        feature: "#4ca772",
        darkFeature: "#328354FF",
        support: "#33adff",
        darkSupport: "#1C87D1FF",
        technical: "#e3b740",
        darkTechnical: "#c39417",
      }
    },
  },
  plugins: [],
}

