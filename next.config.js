module.exports = {
  assetPrefix: "./",
  trailingSlash: true,
  exportTrailingSlash: true,
  exportPathMap: function () {
    return {
      "/": {
        page: "/",
      },
    };
  },
};
