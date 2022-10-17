/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: ["retro", "autumn"],
  },
  content: ['./**/*.{html,ejs}',],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
