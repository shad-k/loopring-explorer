const colors = require("tailwindcss/colors");
module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: ["./**/*.html", "./**/*.tsx"],
  theme: {
    colors: {
      ...colors,
      loopring: {
        DEFAULT: "#1c42ff",
      },
    },
  },
  variants: {},
  plugins: [],
};
