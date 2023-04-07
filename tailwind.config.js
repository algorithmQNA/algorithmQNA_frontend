/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'hover-rgba':'rgba(0,0,0,0.10)',
        'basic-border':'#D9D9D9'
      }
    },
  },
  plugins: [],
}

