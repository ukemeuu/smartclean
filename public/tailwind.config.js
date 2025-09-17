/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f9fb",
          100: "#d8f1f6",
          200: "#b5e4ed",
          300: "#82cfdf",
          400: "#4cb3c9",
          500: "#0e7490",
          600: "#0c5d74",
          700: "#0d4f61",
          800: "#0f4050",
          900: "#0e3442",
        },
        accent: "#F59E0B",
      },
    },
  },
  plugins: [],
};
