module.exports = {
  content: ["./**/*.{html,js,ts}", "!./node_modules/**/*"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
