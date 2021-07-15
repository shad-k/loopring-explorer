module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: ["./**/*.html", "./**/*.tsx"],
  theme: {
    extend: {
      colors: {
        loopring: {
          blue: "#256BE5",
          darkBlue: "#084BE8",
          lightBlue: "#5076B7",
          gray: "#656567",
        },
        indigo: {
          60: "#F6F8FF",
        },
      },
      boxShadow: {
        custom: "0px 14px 11px -5px #EBEFFF",
      },
      minHeight: {
        table: "500px",
      },
    },
  },
  variants: {},
  plugins: [],
};
