const svgo = require("svgo");

module.exports = function svgoLoader(source) {
  this.cacheable(true);
  const callback = this.callback;

  const options = Object.assign(Object.create(null), this.getOptions(), {
    path: this.resourcePath,
  });

  let result;
  try {
    result = svgo.optimize(source, options);
  } catch (error) {
    if (error instanceof Error) {
      callback(error);
      return;
    }
    callback(new Error(error));
    return;
  }

  if ("error" in result) {
    const error = result.error;
    if (error instanceof Error) {
      callback(error);
      return;
    }
    callback(new Error(error));
    return;
  }

  callback(null, result.data);
  return;
};
