/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "hover-rgba": "rgba(0,0,0,0.10)",
        basic: "#D9D9D9",
        primary: "#A377ED",
        secondary: "#FA7D39",
        border: "#EEEEEE",
        "box-bg": "#F8F8F8",
        "gradient-bg":
          "linear-gradient(270.12deg, #A377ED 4.16%, #7791ED 95.69%)",
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
