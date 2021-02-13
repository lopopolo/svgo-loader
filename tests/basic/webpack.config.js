module.exports = {
  mode: "production",
  context: __dirname,
  entry: "./entry",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: "asset/resource",
        use: {
          loader: "../../index.js",
          options: {
            plugins: [
              { removeTitle: true },
              { convertColors: { shorthex: false } },
              { convertPathData: false },
            ],
          },
        },
      },
    ],
  },
};
