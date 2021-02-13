# svgo loader for webpack

## Install

```
$ npm i -D svgo @hyperbola/svgo-loader
```

`svgo` is a peer dependency of this package and must be explicitly installed and
added to your `package.json`.

## Usage

Upstream webpack documentation: [loaders][webpack-loaders].

`@hyperbola/svgo-loader` passes config from `webpack.config.js` directly to the
[`svgo`] library.

[webpack-loaders]: https://webpack.js.org/concepts/loaders/
[`svgo`]: https://github.com/svg/svgo

### With `asset` modules

```javascript
const svgToMiniDataURI = require("mini-svg-data-uri");

module.exports = {
  ...,
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: "asset",
        use: "@hyperbola/svgo-loader",
        generator: {
          dataUrl: (content) => {
            content = content.toString();
            return svgToMiniDataURI(content);
          },
        },
      },
    ]
  }
}
```

### Put the SVGO config into loader's `options`

```javascript
module.exports = {
  ...,
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: "asset",
        use: {
          loader: "@hyperbola/svgo-loader",
          options: {
            plugins: [
              { removeTitle: true },
              { convertColors: { shorthex: false } },
              { convertPathData: false },
            ],
          },
        },
      },
    ]
  }
}
```
