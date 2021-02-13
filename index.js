const Svgo = require("svgo");

module.exports = function svgoLoader(source) {
  this.cacheable(true);
  const callback = this.async();

  const options = Object.assign({}, {}, this.getOptions());

  // See upstream's support for loading external configuration:
  // https://github.com/svg/svgo/blob/07ca9764f71fb946adc23f4ea9f19070d335305d/lib/svgo/coa.js#L179-L200
  if (options.hasOwnProperty("externalConfig")) {
    callback(new Error("`externalConfig` is unsupported`"));
    return;
  }

  const svgo = new Svgo(options);

  svgo.optimize(source, { path: this.resourcePath }).then(
    (result) => {
      callback(null, result.data);
    },
    (error) => {
      if (error instanceof Error) {
        return callback(error, "");
      }
      return callback(new Error(error), "");
    }
  );
};
