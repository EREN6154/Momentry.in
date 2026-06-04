/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#A8D5E2", // Soft blue
        secondary: "#B4E7E1", // Soft teal
        tertiary: "#F5E6B3", // Soft yellow
        dark: "#5A6C7D", // Soft dark gray
        light: "#F9FAFB", // Very light gray
        premium: "#D4A574", // Premium rose gold
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
