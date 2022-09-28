/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: ["retro"],
  },
  content: ['./**/*.{html,ejs}',],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
