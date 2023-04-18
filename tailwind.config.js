/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "hover-rgba": "rgba(0,0,0,0.10)",
        "basic": "#D9D9D9",
        primary: "#77A4E8",
      },
      animation: {
        grow: "grow 0.2s",
      },
      keyframes: {
        grow: {
          "0%": { opacity: 0, scale: 0 },
          "100%": { opacity: 1, scale: 1 },
        },
      },
    },
  },
  plugins: [],
};
