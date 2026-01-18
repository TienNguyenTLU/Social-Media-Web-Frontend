import { Poppins } from "next/font/google";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content : [
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#E63946",
        secondary: "#FB8500",
        "background-light": "#FFF7ED",
        "background-dark": "#0f0f11",
        "surface-light": "#FFFFFF",
        "surface-dark": "#2D0F0F"
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};