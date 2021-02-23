# svgo loader for webpack

[![GitHub Actions](https://github.com/lopopolo/svgo-loader/workflows/CI/badge.svg)][gh-actions-ci]
[![NPM](https://img.shields.io/npm/v/@hyperbola/svgo-loader)][npm-package]

`@hyperbola/svgo-loader` is a zero-dependency, evergreen replacement for
[`svgo-loader`]. `@hyperbola/svgo-loader` only supports the latest webpack@5
release.

[gh-actions-ci]: https://github.com/lopopolo/avgo-loader/actions
[npm-package]: https://www.npmjs.com/package/@hyperbola/svgo-loader
[`svgo-loader`]: https://www.npmjs.com/package/svgo-loader

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

### With SVGO configuration

Pass configuration to SVGO by including it into the loader's `options`:

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
              "removeTitle",
              { name: "convertColors", params: { shorthex: false } },
              { name: "convertPathData", active: false },
            ],
          },
        },
      },
    ]
  }
}
```
