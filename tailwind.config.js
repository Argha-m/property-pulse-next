/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      gridTemplateColumns: {
        "70/30": "70% 28%",
      },
    },
    container: {
      center: true, // Centers the container
      padding: {
        DEFAULT: "1rem", // Default padding
        sm: "2rem", // Padding for small screens and up
        lg: "4rem", // Padding for large screens and up
      },
    },
  },
  plugins: [],
};
