/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./assets/css/**/*.{html,js}",
    "./assets/js/**/*.js",
  ],
  theme: {
    container: {
      padding: "10rem"
    },
  },
  plugins: [],
};
