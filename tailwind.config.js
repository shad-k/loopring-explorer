module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: ["./**/*.html", "./**/*.tsx"],
  theme: {
    extend: {
      colors: {
        indigo: {
          60: "#F6F8FF",
        },
      },
      boxShadow: {
        custom: "0px 14px 11px -5px #EBEFFF",
      },
    },
  },
  variants: {},
  plugins: [],
};
